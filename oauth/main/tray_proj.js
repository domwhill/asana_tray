const electron = require('electron')
const path = require('path')
const url = require('url');

function getTray(client, project_gids){
      var promises = [];
      let template = []
      for (var p_gid of project_gids) {
          let promise = new Promise( function(resolve, reject){
          console.log("p_gid" + p_gid);
          tasks = client.tasks.getTasksForProject(p_gid, {param: "value", param: "value", opt_pretty: true})
          .then((TasksForProj) => {
          var tasks = [];
          let content = "";
          let task = {};
          let i=0;
          do {
            i = i+1;
            content =  TasksForProj.data[i].name;
            // this appears to be the only way to construct asana task urls: https://forum.asana.com/t/get-task-url/46063
            let task_url = "https://app.asana.com/0/" + p_gid + "/" + TasksForProj.data[i].gid;
            task = {label: content , click: function () {
                  electron.shell.openExternal(task_url);
                }};
            tasks.push(task)

          } while (i < TasksForProj.data.length -1)
            //console.log(tasks);
            return tasks;
          }).then( tasks => {
          let subtemplate = {
            label: p_gid,
            submenu: tasks,
          }
          console.log("====FINISHED LOOP====");
          //console.log("tasks" + tasks);
          //console.log("subtemplate = ", subtemplate);
          template.push(subtemplate)
          //console.log("template = " + template);
          resolve(subtemplate);
          });
        });
        console.log("========template========= " + template);
        promises.push(promise)
      };
      console.log(promises);
      let output_promise = Promise.all(promises);
      console.log("getTray template\n" + template);
      resolve(template);
      return output_promise;
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
          //console.log(tasks);
          resolve(tasks);
        });
      });
      return promise;
}

async function AsyncGetTasks(client, project_gid) {
  try {
    console.log("get tray")
    const project_gids=["1137023841060961","1121178260222489"];
    let template = []
    let promises = [];
    for (let p_gid of project_gids) {
      var tasks = await getTasks(client, p_gid);
      let subtemplate = {
            label: p_gid,
            submenu: tasks,
          }
      template.push(subtemplate);
      promises.push(template);
    }
    var p = Promise.all(promises)
    return p;
  } catch (err) {
    console.log("Still waiting for tasks");
  }
}


async function AsyncGetTray(client, project_gid) {
  try {
    console.log("get tray")
    const project_gids=["1137023841060961","1121178260222489"];
    var template = await getTray(client, project_gids);
    console.log("received tray");
    console.log("l109 template asyn fct = " + template);
    return template;
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


    let template = AsyncGetTasks(client, project_gid).then((template) => {

    //console.log("l 128 template main");
    //console.log(template[0]);

    const contextMenu = electron.Menu.buildFromTemplate(template[0])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Tray App')
    tray.setIgnoreDoubleClickEvents(true)

    console.log(contextMenu);
    return tray;
    });
    return subtray;
  }

  module.exports = {getTray, buildTray};
