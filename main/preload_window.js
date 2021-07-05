  const { contextBridge, ipcRenderer} = require('electron')
  const Store = require('electron-store');
  const schema = {gid: {
                default:["1137023841060961","1121178260222489"]}}


  const store = new Store({schema});


  function get_gid_store() {

   return store.get('gid')
  }



contextBridge.exposeInMainWorld(
    'api',
    {
        getgid: () => ({
            data: store.get('gid'),
            other_data: store.get('gid'),
        }),
        get_gid: () => ipcRenderer.send('do-a-thing')
    }
)