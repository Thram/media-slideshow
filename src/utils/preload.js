import { countBy, pickBy, keys } from 'lodash';
import downscale from 'downscale';
import { Enum } from './tools';

const MAX_LOADING = 5;
const STATUS = Enum('queued', 'loading', 'loaded', 'error');
const status = {};
const queue = {};
const loaded = {};

const loadingCount = () => countBy(status).loading || 0;
const queuedCount = () => countBy(status).queued || 0;
const isLoaded = key => status[key] === STATUS.loaded;
const isLoading = key => status[key] === STATUS.loading;

const getQueuedImages = () => pickBy(status, s => s === STATUS.queued);

const loader = {
  loadImage: (key, source) =>
    new Promise((resolve, reject) => {
      const preloader = document.createElement('img');
      preloader.onload = () => resolve(loader.onLoad(key, source));
      preloader.onerror = e => reject(loader.onError(key, e));
      preloader.src = source || key;
    }),
  checkQueue: async () => {
    const next = keys(getQueuedImages())[0];
    if (next) {
      const options = queue[next];
      try {
        const url = await loader.load(options);
        options.resolve(url);
      } catch (e) {
        options.reject(options.source, e);
      }
    }
  },
  onLoad: (key, source) => {
    status[key] = STATUS.loaded;
    loaded[key] = source || `file://${key}`;
    if (queuedCount() > 0) loader.checkQueue();
    return loaded[key];
  },

  onError: (key, source, error) => {
    status[key] = STATUS.error;
    if (queuedCount() > 0) loader.checkQueue();
    return { source, error };
  },

  load: ({ source, resample }) =>
    new Promise(async (resolve, reject) => {
      status[source] = STATUS.loading;
      if (resample) {
        try {
          const dataURL = await downscale(source, resample.width, resample.height);
          loader.loadImage(source, dataURL).then(resolve, reject);
        } catch (e) {
          reject(loader.onError(source, e));
        }
      } else {
        loader.loadImage(source).then(resolve, reject);
      }
    }),
};

export default (source, resample) =>
  new Promise(async (resolve, reject) => {
    if (isLoaded(source)) {
      resolve(resample ? loaded[source] : source);
    } else if (!isLoading(source)) {
      if (loadingCount() < MAX_LOADING) {
        try {
          const url = await loader.load({ source, resample });
          resolve(url);
        } catch (e) {
          reject(source, e);
        }
      } else {
        status[source] = STATUS.queued;
        queue[source] = {
          source,
          resample,
          resolve,
          reject,
        };
      }
    }
  });
