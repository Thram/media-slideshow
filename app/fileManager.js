import glob from 'glob';
import { extname } from 'path';
import { tools } from '../src/utils';

const MEDIA_TYPES = tools.Enum('audio', 'video', 'image');

const PATTERNS = {
  [MEDIA_TYPES.image]: /\.(jpe?g|png|gif|svg|webp)$/i,
  [MEDIA_TYPES.video]: /\.(mp4|webm|ogv)$/i,
  [MEDIA_TYPES.audio]: /\.(mp3|ogg|wav|flac)$/i,
};

const EXTENSIONS = {
  [MEDIA_TYPES.image]: 'jpg,jpeg,png,gif,svg,webp',
  [MEDIA_TYPES.video]: 'mp4,webm,ogv',
  [MEDIA_TYPES.audio]: 'mp3,ogg,wav,flac',
};

const ALL_MEDIA = `${EXTENSIONS.image},${EXTENSIONS.video},${EXTENSIONS.audio}`;

const isType = type => path => PATTERNS[type].test(extname(path));

const validators = {
  isImage: isType(MEDIA_TYPES.image),
  isVideo: isType(MEDIA_TYPES.video),
  isAudio: isType(MEDIA_TYPES.audio),
};

const getType = (path) => {
  const ext = extname(path);
  if (PATTERNS[MEDIA_TYPES.image].test(ext)) return MEDIA_TYPES.image;
  if (PATTERNS[MEDIA_TYPES.video].test(ext)) return MEDIA_TYPES.video;
  if (PATTERNS[MEDIA_TYPES.audio].test(ext)) return MEDIA_TYPES.audio;
  throw new Error(`Extension "${ext}" not supported.`);
};

const scanDirectory = (path, options) =>
  new Promise((resolve, reject) =>
    glob(
      `${path}/**/*.{${ALL_MEDIA}}`,
      options,
      (error, files) => (error ? reject(error) : resolve(files)),
    ));

export { MEDIA_TYPES, scanDirectory, getType, validators };
export default {
  MEDIA_TYPES,
  scanDirectory,
  getType,
  validators,
};
