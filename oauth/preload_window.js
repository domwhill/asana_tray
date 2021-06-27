  const Store = require('electron-store');
  const schema = {gid: { type:
                    'string',
                     maximum: 100,
                     minimum: 1,
                     default:["1137023841060961","1121178260222489"]}}
  const window.store = new Store(schema);
  window.ipcRenderer = require('electron').ipcRenderer;
