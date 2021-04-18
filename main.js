
const asana = require('asana');
const loadIniFile = require('read-ini-file')
const path = require('path')

const asanaClass = document.querySelector('.asanaClass');
const displayedTask = document.querySelector('.displayedTask');
const list = document.querySelector('.output ul');
displayedTask.textContent = 'test content';
list.innerHTML = '';

const fixture = path.join(__dirname, 'asana_credentials.ini')
const credentials = loadIniFile.sync(fixture)
console.log(credentials.test)

var personalAccessToken = credentials.personal_access_token;
//https://app.asana.com/0/1137023841060961/overview
var project_gid = credentials.project_gid;
var client = asana.Client.create().useAccessToken(personalAccessToken);

document.body.style.fontFamily = 'sans-serif';
document.body.style.boxShadow = '3px 3px 6px black';

client.tasks.getTasksForProject('1137023841060961', {param: "value", param: "value", opt_pretty: true})
    .then((result) => {
        console.log(result.data[0].name);
        console.log(result.data.length);
        let content = "";
        let i=0;
        do {
          i = i+1;
          console.log(result.data[i] + "\n");
          content =  result.data[i].name;
          console.log(content);
          displayedTask.textContent = content;
          let listItem = document.createElement('li');
          listItem.textContent = content;
          list.appendChild(listItem);
        } while (i < result.data.length -1)
    });
