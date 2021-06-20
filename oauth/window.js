      const fs = require('fs')
      const projectGids = require('./project_gids.json');

      const allProjects = document.querySelector('.allProjects');
      const projectFieldSubmit = document.querySelector('.projectFieldSubmit');
      const projectField = document.querySelector('.projectField');
      const list = document.querySelector('.output ul');
      allProjects.textContent = 'test content';
      list.innerHTML = '';

      var gids = projectGids.gid;
      console.log(gids)

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

      function addProject() {
        let addedProj = projectField.value;
        gids.push(addedProj);
        console.log(gids);
        projectField.textContent = addedProj + ' ';
        console.log(projectField.textContent);
        var gid_json = {"gids": gids};
        console.log("gid_json")
        console.log(gid_json)
        writeList(gids)
        fs.writeFileSync('../project_gids_bkup.json', JSON.stringify(gid_json));
      }

      writeList(gids)

      projectFieldSubmit.addEventListener('click', addProject);

