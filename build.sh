# exit on error
set -o errexit
yarn
yarn sequelize db:migrate
yarn dev