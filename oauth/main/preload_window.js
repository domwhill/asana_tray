  const { contextBridge, ipcRenderer} = require('electron')
  const Store = require('electron-store');
  const schema = {gid: { type:
                    'string',
                     maximum: 100,
                     minimum: 1,
                     default:["1137023841060961","1121178260222489"]}}
  const store = new Store(schema);



  function get_gid(){
   console.log(window.store.get('gid'))
   return window.store.get('gid')
  }


contextBridge.exposeInMainWorld(
    'api',
    {
        getgid: () => store.get('gid')
    }
)