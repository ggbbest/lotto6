readme.txt

express -e lotto

pm2 stop <app_name>
pm2 restart <app_name>
pm2 delete lotto

cd /home/dev/www/lotto.c4ei.net
pm2 start node server.js --name lotto

yarn add dotenv
yarn add cors

