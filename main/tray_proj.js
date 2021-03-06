const electron = require('electron')
const path = require('path')
const url = require('url');
const pgid = require('../project_gids.json')
const window = require('./add_project_window.js')
function getProjectName(client, project_gid){
      let promise = new Promise( function(resolve, reject){
      client.projects.findById(project_gid).then((proj) => {
        resolve(proj.name)
        })
      })
      return promise;
}

function getTasks(client, project_gid){
      let promise = new Promise( function(resolve, reject){
      tasks = client.tasks.getTasksForProject(project_gid, {param: "value", param: "value", opt_pretty: true})
          .then((TasksForProj) => {
        console.log("function getTasks getting tasks for project");
        var tasks = [];
        let content = "";
        let task = {};
        let i=0;
        do {
          i = i+1;
          content =  TasksForProj.data[i].name;
          // this appears to be the only way to construct asana task urls: https://forum.asana.com/t/get-task-url/46063
          let task_url = "https://app.asana.com/0/" + project_gid + "/" + TasksForProj.data[i].gid;
          task = {label: content , click: function () {
                electron.shell.openExternal(task_url);
              }};
          tasks.push(task)

        } while (i < TasksForProj.data.length -1)
          resolve(tasks);
        });
      });
      return promise;
}

async function AsyncGetTasks(client, project_gids) {
  try {
    console.log("get tray")
    console.log(project_gids)
    //const project_gids = ["1137023841060961","1121178260222489"];
    let template = []
    let promises = [];
    for (let p_gid of project_gids) {
      var project_name = await getProjectName(client, p_gid);
      var tasks = await getTasks(client, p_gid);
      let subtemplate = {
            label: project_name,
            submenu: tasks,
          }
      template.push(subtemplate);
      promises.push(template);
    }
    template.push({label: "Edit projects" ,
                   click: window.createWindow
                   });
    var p = Promise.all(promises)
    return p;
  } catch (err) {
    console.log("Still waiting for tasks");
  }
}


function buildTray(client){
    console.log("dir = " + __dirname);
    const iconPath = path.join(__dirname, '../tag.png');
    tray = new electron.Tray(iconPath)
    var project_gids = pgid.gid;
    console.log(" --->");
    console.log(project_gids)

    let template = AsyncGetTasks(client, project_gids).then((template) => {

    const contextMenu = electron.Menu.buildFromTemplate(template[0])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Tray App')
    tray.setIgnoreDoubleClickEvents(true)
    return tray;
    });
    return subtray;
  }

  module.exports = {buildTray};
