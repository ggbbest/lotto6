readme.txt

express -e lotto

pm2 stop <app_name>
pm2 restart <app_name>
pm2 delete lotto

cd /home/dev/www/lotto.c4ei.net
pm2 start node server.js --name lotto

yarn add dotenv
yarn add cors


/home/dev/www/lotto.c4ei.net/views/index.ejs
        <!-- 번호별 컬러값: clr1: 1~10, clr2: 11~20, clr3: 21~30, clr4: 31~40, clr5: 41~45  -->
        <!-- <div class="bx_winner winner">
          <strong class="tit">당첨번호</strong>
          <div class="list">
            <div class="clr clr1"><span>8</span></div>
            <div class="clr clr2"><span>11</span></div>
            <div class="clr clr2"><span>15</span></div>
            <div class="clr clr2"><span>16</span></div>
            <div class="clr clr2"><span>17</span></div>
            <div class="clr clr4"><span>37</span></div>
            <div class="plus clr clr4"><span>36</span></div>
          </div>
        </div>         -->
