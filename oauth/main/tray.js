const electron = require('electron')
const path = require('path')
const url = require('url');

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
          console.log(tasks);
          resolve(tasks);
        });
      });
      return promise;
}

async function AsyncGetTasks(client, project_gid) {
  try {
    var tasks = await getTasks(client, project_gid);
    //var tasks = await promiseA;
    console.log("found tasks")
    console.log(tasks)
    return tasks;
  } catch (err) {
    console.log("Still waiting for tasks");
  }
}

// todo: sort out asynchronous running of getTaskss then building the tray.

function buildTray(client){
    console.log("dir = " + __dirname);
    const iconPath = path.join(__dirname, '../tag.png');
    tray = new electron.Tray(iconPath)
    var project_gid = "1137023841060961";


    //let promise = GetTasks(client, project_gid);
    let subtray = AsyncGetTasks(client, project_gid).then((tasks) => {

    console.log("then statement tasks");
    console.log(tasks);

    let template = [{
      label: 'tasks',
      submenu: tasks,
    }]
    console.log(tasks)
    console.log(template)

    const contextMenu = electron.Menu.buildFromTemplate(template)
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Tray App')
    tray.setIgnoreDoubleClickEvents(true)

    console.log(contextMenu);
    return tray;
    });
    return subtray;
  }

  module.exports = {getTasks, buildTray};
