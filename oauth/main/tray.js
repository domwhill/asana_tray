const electron = require("electron");
const path = require('path')
const url = require('url')

function getTasks(client, project_gid){

      client.tasks.getTasksForProject(project_gid, {param: "value", param: "value", opt_pretty: true})
          .then((TasksForProj) => {

        console.log("tasks for project");
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
          return tasks;
        })
}

function buildTray(client){
    const iconPath = path.join(__dirname, 'tag.png')
    tray = new Tray(iconPath)
    var project_gid = "1137023841060961";

    var tasks = getTasks(client, project_gid);
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
  }
