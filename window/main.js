      const fs = require('fs')
      const projectGids = require('./project_gids.json');

      const allProjects = document.querySelector('.allProjects');
      const projectFieldSubmit = document.querySelector('.projectFieldSubmit');
      const projectField = document.querySelector('.projectField');
      const list = document.querySelector('.output ul');
      displayedTask.textContent = 'test content';
      list.innerHTML = '';

      var gids = projectGids.gid;
      console.log(gids)

      function getGidStr(){
      var gid_str = '';
      let i=0;
      list.innerHTML = '';
      do {
        i =i+1;
        //console.log(gids);
        gid_str += gids[i] + '\n';
        let listItem = document.createElement('li');
        listItem.textContent = gids[i];
        list.appendChild(listItem);
      } while (i < gids.length-1)
      }

      function addProject() {
        let addedProj = projectField.value;
        gids.push(addedProj);
        console.log(gids);
        projectField.textContent += addedProj + ' ';
        var gid_json = {"gids":gids};
        console.log(gid_json)
        fs.writeFileSync('./project_gids.json', JSON.stringify(gid_json));
      }

      getGidStr()

      projectFieldSubmit.addEventListener('click', addProject);
