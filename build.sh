# exit on error
set -o errexit
npm install
npm run sequelize db:migrate
npm start