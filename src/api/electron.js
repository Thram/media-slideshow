import { remote } from 'electron';
import { flatten } from 'lodash';

const { directoryDialog } = remote.require('./app/windowsManager');
const { scanDirectory, getType, MEDIA_TYPES } = remote.require('./app/fileManager');

const selectDirectory = async () => {
  const dirPaths = await directoryDialog();
  return dirPaths && flatten(await Promise.all(dirPaths.map(scanDirectory)));
};

export { MEDIA_TYPES, selectDirectory, getType };
export default { MEDIA_TYPES, selectDirectory, getType };
