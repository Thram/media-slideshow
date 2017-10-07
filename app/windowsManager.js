import { dialog } from 'electron';
import { omit } from 'lodash';

let windows = {};
const register = (key, window) => {
  windows[key] = window;
};

const get = key => windows[key];

const remove = (key) => {
  windows = omit(windows, [key]);
};

const directoryDialog = () =>
  new Promise((resolve) => {
    dialog.showOpenDialog(
      windows.main,
      {
        properties: ['openDirectory', 'multiSelections'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
          { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
          { name: 'Custom File Type', extensions: ['as'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      },
      resolve,
    );
  });

export { get, register, remove, directoryDialog };
export default {
  get,
  register,
  remove,
  directoryDialog,
};
