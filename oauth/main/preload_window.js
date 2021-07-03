  const { contextBridge, ipcRenderer} = require('electron')
  const Store = require('electron-store');



  function get_gid_store() {
      const schema = {gid: {
                    default:["1137023841060961","1121178260222489"]}}


    const store = new Store({schema});
   return store.get('gid')
  }



contextBridge.exposeInMainWorld(
    'api',
    {
        getgid: () => ({
            data: get_gid_store,
            other_data: ["1137023841060961","1121178260222489"]
        }),
        get_gid: () => ipcRenderer.send('do-a-thing')
    }
)