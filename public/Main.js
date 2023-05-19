const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');


function createWindow() {

  /*
 * 넓이 1920에 높이 1080의 FHD 풀스크린 앱을 실행시킵니다.
 * */
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'assets/icons/log-place-icon.png'),

  });

  /*
  * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
  * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
  * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
  * */
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  console.log(startUrl)

  /*
  * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
  * */
  win.loadURL(startUrl);



  win.webContents.on('did-finish-load', () => {

    fs.readFile(path.join(__dirname, '../build/data.json'), "utf-8", (err, data) => {

      win.webContents.send('json', data);

    })

  })

  ipcMain.on('return-json', (event, arg) => {

    if (arg != undefined && arg != 'route') {

      fs.writeFile(path.join(__dirname, '../build/data.json'), JSON.stringify(arg), "utf-8", (err) => {

        if (err) {
          console.log(err)
        } else {
          event.reply('from', JSON.stringify(arg))
        }
      })
    }

  })

  ipcMain.on('route', (event, arg) => {

    fs.readFile(path.join(__dirname, '../build/data.json'), "utf-8", (err, data) => {

      event.reply('from', data)

    })

  })

}


app.on('ready', createWindow);

