const { app, BrowserWindow } = require('electron');

function createWindow() {
  console.log("Creating window...");
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile("out/index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  console.log("App is ready");
  createWindow();
});

app.on('window-all-closed', () => {
  console.log("All windows closed");
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  console.log("App activated");
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
