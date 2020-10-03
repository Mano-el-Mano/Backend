#!/bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
echo INSERTPASSWORD | sudo -S -u postgres psql -f "${SCRIPTPATH}/populate_db.sql"