/** Oauth info
see: https://github.com/Asana/node-asana/blob/master/examples/oauth/webserver/oauth_webserver.js

 * Usage:
 *
 *   export ASANA_CLIENT_ID=...
 *   export ASANA_CLIENT_SECRET=...
 *   node oauth_script.js
 */
const {app} = require("electron");
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
client.authorize().then(()=> { etray.buildTray(client);
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

/** find all projects
client.projects.findAll({"workspace":123456789})
	.then(function(response) {
 		console.log(response);
 	})
**/
