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
const etray = require("./main/tray_proj")
const tokenStore = require('./token-store.json');
const envVariables = require('./env-variables.json');
const fs = require('fs')

// Create a client, getting parameters from the environment.

// Configure the way we want to use Oauth. This autodetects that we are
// in a Node process, so uses the `NativeFlow` by default.

// When `authorize` is called it will prompt us to perform the authorization
// in a browser and copy in the code we got. It will then exchange that for
// a token.

function createClient() {
  return Asana.Client.create({
    clientId: envVariables.ASANA_CLIENT_ID,
    clientSecret: envVariables.ASANA_CLIENT_SECRET
  });
}

function refreshToken(client) {
  console.log("No token found go to auth url:");
  client.useOauth();
  client.authorize().then(function() {
  console.log("authorized refresh_token: ");
  console.log(client.dispatcher.authenticator.credentials);
  var jsonVariable = {'token': client.dispatcher.authenticator.credentials};
  fs.writeFileSync('./token-store.json', JSON.stringify(jsonVariable));
});
}


function getClient() {
  var client = createClient();
  var token = tokenStore.token;
  if (token) {
    // Here's where we direct the client to use Oauth with the credentials
    // we have acquired.
    console.log("attempting to authenticate with: " + token);
    client.useOauth({ credentials: token });
    client.users.me().then(function(me) {
      console.log('Hello ' + me.name);
      return client
    }).catch(function(err) {
      console.log('Error fetching user: ' + err);
      refreshToken(client);
    });
  } else {
    // Otherwise redirect to authorization.
      console.log("No token found go to auth url:");
      client.useOauth();
      client.authorize().then(function() {
      console.log("authorized refresh_token: ");
      console.log(client.dispatcher.authenticator.credentials);
      var jsonVariable = {'token': client.dispatcher.authenticator.credentials};
      fs.writeFileSync('./token-store.json', JSON.stringify(jsonVariable));
      return client;
    });
  }
  return client
}

function authorizeAsana(){
  let promise = new Promise(function(resolve, reject) {
              var client = getClient();
              resolve(client)
  });
  return promise
}


async function showTray() {
  let win;
  try {
    //var client = 0;
    var client = await authorizeAsana();
    return etray.buildTray(client);
  } catch (err) {
    console.log("app not authorised yet");
  }
}

app.on('ready', showTray);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
  }
});
