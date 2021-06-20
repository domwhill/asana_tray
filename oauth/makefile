#
# https://www.electronjs.org/docs/tutorial/quick-start
start:
	browserify window.js -o bundle.js;
	electron main.js

build:
	npm init -y;\
	npm i -D electron;\
	npm i asana keytar axios jwt-decode

run:
	npm install --save-dev @electron-forge/cli;\
	npx electron-forge import;
	npm run make

create_executable:
	npm run make
