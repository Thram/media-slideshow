import electron, { app, Menu, BrowserWindow } from 'electron';
import log from 'electron-log';
import menuTemplate from './menu';
import { remove, register } from './windowsManager';

log.info('App starting...');

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: Math.round(width * 0.9),
    height: Math.round(height * 0.9),
    webSecurity: false,
  });
  if (process.env.NODE_ENV === 'development') mainWindow.webContents.openDevTools();

  const url = `file://${__dirname}/../release/index.html`;
  mainWindow.loadURL(url);
  mainWindow.on('closed', () => remove('main', mainWindow));
  register('main', mainWindow);
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});
