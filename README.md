# si-backend

setup linter

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

## TO RUN PROJECT

```
first allow scripts to be run cd to {project}/db/pg(scripts) and 
```bash
chmod 775 create-user.sh create-db.sh populate-db.sh
``` 

to create database first run ``create-db.sh`` and ``create-user.sh`` then ``npm start`` and the project will create the database. If you want to populate the database with some initial data run ``populate-db.sh``.
# Backend
