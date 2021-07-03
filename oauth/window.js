      //const fs = require('fs')
      //const fs = require('browserify-fs')
      //const Store = require('electron-store');
      /*const schema = {gid: { type:
                        'string',
                         maximum: 100,
                         minimum: 1,
                         default:["1137023841060961","1121178260222489"]}}
      const store = new Store(schema);
        */
      //const projectGids = require('./project_gids.json');
      //const store = new Store(schema);


      const allProjects = document.querySelector('.allProjects');
      const projectFieldSubmit = document.querySelector('.projectFieldSubmit');
      const projectField = document.querySelector('.projectField');
      const list = document.querySelector('.output ul');
      allProjects.textContent = 'test content';
      list.innerHTML = '';
      //https://stackoverflow.com/questions/44391448/electron-require-is-not-defined/57049268#57049268
      console.log(window)
      var gid_bridge = window.api.getgid()
      //var gids = projectGids.gid;
      console.log("gid bridge:");
      console.log(gid_bridge);
      var gids = gid_bridge.data()
      console.log("gids = " + gids);
      function writeList(in_gid){
      var gid_str = '';
      let i=0;
      list.innerHTML = '';
      do {
            i =i+1;
            console.log(in_gid[i]);
            gid_str += in_gid[i] + '\n';
            let listItem = document.createElement('li');
            listItem.textContent = in_gid[i];
            list.appendChild(listItem);
      } while (i < in_gid.length -1)
      }

      function addProject(addedProj) {
        //let addedProj = projectField.value;
        gids.push(addedProj);
        console.log(gids);
        projectField.textContent = addedProj + ' ';
        console.log(projectField.textContent);
        var gid_json = {"gids": gids};
        console.log("gid_json")
        console.log(gid_json)
        writeList(gids)

        store.set('gid', gids)
      }

      writeList(gids)

      projectFieldSubmit.addEventListener('click', addProject(projectField.value));

