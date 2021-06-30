  const { contextBridge, ipcRenderer} = require('electron')
  const Store = require('electron-store');



  function get_gid_store() {
    const schema = {gid: { type:
                      'string',
                       maximum: 100,
                       minimum: 1,
                       default:["1137023841060961","1121178260222489"]}}

    const store = new Store(schema);
   console.log(window.store.get('gid'))
   return window.store.get('gid')
  }



contextBridge.exposeInMainWorld(
    'api',
    {
        getgid: () => ({
            data: get_gid_store
        }),
        get_gid: () => ipcRenderer.send('do-a-thing')
    }
)