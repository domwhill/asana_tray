/** Oauth info
see: https://github.com/Asana/node-asana/blob/master/examples/oauth/webserver/oauth_webserver.js

 * Usage:
 *
 *   export ASANA_CLIENT_ID=...
 *   export ASANA_CLIENT_SECRET=...
 *   node oauth_script.js
 */
const electron = require("electron");
var Asana = require('asana');
const path = require('path')
const url = require('url')
const etray = require("./main/tray")
const envVariables = require('./env-variables.json');

// Create a client, getting parameters from the environment.

// Configure the way we want to use Oauth. This autodetects that we are
// in a Node process, so uses the `NativeFlow` by default.

// When `authorize` is called it will prompt us to perform the authorization
// in a browser and copy in the code we got. It will then exchange that for
// a token.
console.log("clientid = " + envVariables.ASANA_CLIENT_ID);
var client = Asana.Client.create({
  clientId: envVariables.ASANA_CLIENT_ID,//process.env['ASANA_CLIENT_ID'],
  clientSecret: envVariables.ASANA_CLIENT_SECRET//process.env['ASANA_CLIENT_SECRET']
});

client.useOauth();
client.authorize().then(function() {
  console.log("afater promise call");
  //https://stackoverflow.com/questions/21518381/proper-way-to-wait-for-one-function-to-finish-before-continuing


  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;
  const Menu = electron.Menu
  const Tray = electron.Tray
  var project_gid = "1137023841060961";
  var tasks = [];
  var TaskForProj = client.tasks.getTasksForProject(project_gid, {param: "value", param: "value", opt_pretty: true})
  var res = TaskForProj.then((result) => { return result.data[1].name;})
  console.log("res");
  console.log(res);
  var desiredtasks
  const iconPath = path.join(__dirname, 'tag.png')

    app.on('ready', function(){
    tray = new Tray(iconPath)


    client.tasks.getTasksForProject(project_gid, {param: "value", param: "value", opt_pretty: true})
        .then((result) => {

      console.log("tasks for project");
      let tray = null
      let win;
      let content = "";
      let task = {};
      let i=0;
      do {
        i = i+1;
        content =  result.data[i].name;
        // this appears to be the only way to construct asana task urls: https://forum.asana.com/t/get-task-url/46063
        let task_url = "https://app.asana.com/0/" + project_gid + "/" + result.data[i].gid;
        task = {label: content , click: function () {
              electron.shell.openExternal(task_url);
            }};
        tasks.push(task)

      } while (i < result.data.length -1)
        return tasks;
      }).then((tasks) => {
        console.log("then statement tasks");
        console.log(tasks);

        let template = [{
          label: 'tasks',
          submenu: tasks,
        }]
        console.log(tasks)
        console.log(template)

      const contextMenu = Menu.buildFromTemplate(template)
      tray.setContextMenu(contextMenu)
      tray.setToolTip('Tray App')
      tray.setIgnoreDoubleClickEvents(true)

      console.log(contextMenu);
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
    }
  });
});
/** find all projects
client.projects.findAll({"workspace":123456789})
	.then(function(response) {
 		console.log(response);
 	})
**/
