(this.webpackJsonplotto=this.webpackJsonplotto||[]).push([[0],{25:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),r=n(19),a=n.n(r),i=n(7),u=n(3),j=(n(25),n(20)),l=n.n(j),o=n(0),b=function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){l.a.get("https://lotto.c4ei.net/api/week").then((function(e){return s(e)}))}),[]),n?Object(o.jsxs)("h1",{children:[" ",n.data[0].yyyyw," Lotto 6/45 "]}):Object(o.jsx)("h1",{children:" Lotto 6/45 "})},d=function(e){var t=e.games,n=e.hits,c=e.money,s=n?"".concat(n,"\uac1c \ub9de\uc74c"):"0\uac1c \ub9de\uc74c";return Object(o.jsxs)("section",{className:"results",children:[Object(o.jsx)("h3",{className:"info",children:t?s:"..."}),Object(o.jsxs)("div",{className:"games",children:[Object(o.jsx)("span",{children:"\uac8c\uc784 \uc218:"}),Object(o.jsx)("span",{children:t})]}),Object(o.jsxs)("div",{className:"wallet",children:[Object(o.jsx)("span",{children:"\ubca0\ud305 \uae08\uc561:"}),Object(o.jsxs)("span",{children:[1*t," c4ei"]})]}),Object(o.jsxs)("div",{className:"money",children:[Object(o.jsx)("span",{children:"\ub2f9\ucca8\uae08\uc561:"}),Object(o.jsxs)("span",{children:[c," c4ei"]})]})]})},O=function(e){var t=e.number,n=e.add;return Object(o.jsx)("div",{className:"number",onClick:n.bind(undefined,t),children:t})},m=function(e){var t=e.numbers,n=e.add,c=t.map((function(e){return Object(o.jsx)(O,{number:e,add:n},e)}));return Object(o.jsxs)("div",{className:"coupon",children:[c,Object(o.jsx)("div",{className:"number"})]})},h=function(e){var t=e.start;return 6===e.playerNumbers.length?Object(o.jsx)("button",{className:"start",onClick:t,children:"\ucd94\ucca8"}):Object(o.jsx)("button",{className:"off",disabled:!0,children:"\ucd94\ucca8"})},f=function(e){var t=e.number;return Object(o.jsx)("div",{className:"ball",children:t})},x=function(e){var t=e.drawedNumbers,n=t.map((function(e){return Object(o.jsx)(f,{number:e},e)})),c=t.length?n:"6\uac1c\uc758 \uc22b\uc790\ub97c \uc120\ud0dd\ud558\uc138\uc694.";return Object(o.jsx)("div",{className:"display",children:c})},v=function(e){var t=e.reset;return Object(o.jsx)("button",{className:"reset",onClick:t,children:"Reset"})},p=function(){var e=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],t=5,n=50,s=5e3,r=3e6,a=Object(c.useState)([]),j=Object(u.a)(a,2),l=j[0],O=j[1],f=Object(c.useState)([]),p=Object(u.a)(f,2),N=p[0],y=p[1],g=Object(c.useState)(0),w=Object(u.a)(g,2),E=w[0],S=w[1],k=Object(c.useState)(0),L=Object(u.a)(k,2),A=L[0],M=L[1],T=Object(c.useState)(0),W=Object(u.a)(T,2),C=W[0],R=W[1];return Object(o.jsxs)("div",{className:"app",children:[Object(o.jsx)(b,{}),Object(o.jsxs)("main",{children:[Object(o.jsx)(x,{drawedNumbers:N}),Object(o.jsx)(m,{numbers:e,add:function(e,t){if(l.length<6&&!l.includes(e)){var n=Object(i.a)(l);n.push(e),O(n),t.target.classList.toggle("selected")}if(l.includes(e)){var c=Object(i.a)(l);c=c.filter((function(t){return t!==e})),O(c),t.target.classList.toggle("selected")}}}),Object(o.jsx)(d,{games:E,hits:A,money:C}),Object(o.jsxs)("section",{className:"controls",children:[Object(o.jsx)(v,{reset:function(){Object(i.a)(document.querySelectorAll(".selected")).forEach((function(e){return e.classList.remove("selected")})),O([]),y([]),S(0),M(0),R(0)}}),Object(o.jsx)(h,{playerNumbers:l,start:function(){if(6===l.length){for(var c=[].concat(e),a=[],i=0;i<6;i++){var u=Math.floor(Math.random()*c.length);a.push(c[u]),c.splice(u,1)}var j=l[0]+","+l[1]+","+l[2]+","+l[3]+","+l[4]+","+l[5],o="insert into `lotto` (`yyyy`,`wk`,`yyyymmdd`,`chips`,`addr`,`sendTr` ,`numb_tot`,`numb1`,`numb2`,`numb3`,`numb4`,`numb5`,`numb6`)";o+=" select YEAR(NOW()), WEEK(NOW()), DATE_FORMAT(NOW(), '%Y%m%d'), ",o=(o+=" 1 chips, '' addr, '' sendTr ")+" ,'"+j+"',"+j+" ",o+=" from dual ",console.log(o),y(a),S((function(e){return e+1})),function(e,c){var a=[];e.forEach((function(e){for(var t=0;t<6;t++)e===c[t]&&a.push(e)}));var i=a.length;M(i),3===i?R((function(e){return e+t})):4===i?R((function(e){return e+n})):5===i?R((function(e){return e+s})):6===i&&R((function(e){return e+r}))}(l,a)}}})]})]})]})};a.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(p,{})}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.c98c98f5.chunk.js.map