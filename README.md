# si-backend

This project is for an assignment in a system integration course. Where we are suppose to interact a RESTful service and a SOAP service. To achieve this we have decided on creating a web application where users can create and see others posts.

## To run project

prerequisites: node.js and npm

install dependencies
```bash
npm i
```

configure user access to scripts 
```bash
cd {project}/db/pg/scripts
chmod 775 create-user.sh create-db.sh populate-db.sh
``` 

to create database first run ``create-db.sh`` and ``create-user.sh`` then ``npm start`` and the project will create the database on initialization. If you want to populate the database with some initial data run ``populate-db.sh``. No further configuration should be needed


## To setup linter

install eslint plugin

install prettier plugin (disable it after installation)

``settings.json`` 
```json
{
    "javascript.updateImportsOnFileMove.enabled": "always",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.enable": true,
    "eslint.lintTask.enable": true,
    "eslint.validate": [
        "javascript",
    ],
    "eslint.probe": [
        "javascript", 
    ],
    "eslint.workingDirectories": [{ "mode": "auto" }],
    "eslint.alwaysShowStatus": true,
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
}
