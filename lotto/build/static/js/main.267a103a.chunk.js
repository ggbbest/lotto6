(this.webpackJsonplotto=this.webpackJsonplotto||[]).push([[0],{25:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),r=n(20),a=n.n(r),i=n(8),o=n(3),u=(n(25),n(7)),l=n.n(u),j=n(0),b=function(){var e=Object(c.useState)(""),t=Object(o.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){l.a.get("https://lotto.c4ei.net/api/week").then((function(e){return s(e)}))}),[]),n?Object(j.jsxs)("h1",{children:[" ",n.data[0].yyyyw," Lotto 6/45 "]}):Object(j.jsx)("h1",{children:" Lotto 6/45 "})},d=function(e){var t=e.games,n=e.hits,c=e.money,s=n?"".concat(n,"\uac1c \ub9de\uc74c"):"0\uac1c \ub9de\uc74c";return Object(j.jsxs)("section",{className:"results",children:[Object(j.jsx)("h3",{className:"info",children:t?s:"..."}),Object(j.jsxs)("div",{className:"games",children:[Object(j.jsx)("span",{children:"\uac8c\uc784 \uc218:"}),Object(j.jsx)("span",{children:t})]}),Object(j.jsxs)("div",{className:"wallet",children:[Object(j.jsx)("span",{children:"\ubca0\ud305 \uae08\uc561:"}),Object(j.jsxs)("span",{children:[1*t," c4ei"]})]}),Object(j.jsxs)("div",{className:"money",children:[Object(j.jsx)("span",{children:"\ub2f9\ucca8\uae08\uc561:"}),Object(j.jsxs)("span",{children:[c," c4ei"]})]})]})},h=function(e){var t=e.number,n=e.add;return Object(j.jsx)("div",{className:"number",onClick:n.bind(undefined,t),children:t})},O=function(e){var t=e.numbers,n=e.add,c=t.map((function(e){return Object(j.jsx)(h,{number:e,add:n},e)}));return Object(j.jsxs)("div",{className:"coupon",children:[c,Object(j.jsx)("div",{className:"number"})]})},m=function(e){var t=e.start;return 6===e.playerNumbers.length?Object(j.jsx)("button",{className:"start",onClick:t,children:" \ucd94\ucca8 "}):Object(j.jsx)("button",{className:"off",disabled:!0,children:" \ucd94\ucca8 "})},f=function(e){var t=e.number;return Object(j.jsx)("div",{className:"ball",children:t})},x=function(e){var t=e.drawedNumbers,n=t.map((function(e){return Object(j.jsx)(f,{number:e},e)})),c=t.length?n:"6\uac1c\uc758 \uc22b\uc790\ub97c \uc120\ud0dd\ud558\uc138\uc694.";return Object(j.jsx)("div",{className:"display",children:c})},p=function(e){var t=e.reset;return Object(j.jsx)("button",{className:"reset",onClick:t,children:"Reset"})},v=function(){var e=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],t=5,n=50,s=5e3,r=3e6,a=Object(c.useState)([]),u=Object(o.a)(a,2),h=u[0],f=u[1],v=Object(c.useState)([]),g=Object(o.a)(v,2),N=g[0],y=g[1],S=Object(c.useState)(0),w=Object(o.a)(S,2),k=w[0],L=w[1],E=Object(c.useState)(0),C=Object(o.a)(E,2),M=C[0],A=C[1],J=Object(c.useState)(0),_=Object(o.a)(J,2),q=_[0],B=_[1];return Object(j.jsxs)("div",{className:"app",children:[Object(j.jsx)(b,{}),Object(j.jsxs)("main",{children:[Object(j.jsx)(x,{drawedNumbers:N}),Object(j.jsx)(O,{numbers:e,add:function(e,t){if(h.length<6&&!h.includes(e)){var n=Object(i.a)(h);n.push(e),f(n),t.target.classList.toggle("selected")}if(h.includes(e)){var c=Object(i.a)(h);c=c.filter((function(t){return t!==e})),f(c),t.target.classList.toggle("selected")}}}),Object(j.jsx)(d,{games:k,hits:M,money:q}),Object(j.jsxs)("section",{className:"controls",children:[Object(j.jsx)(p,{reset:function(){Object(i.a)(document.querySelectorAll(".selected")).forEach((function(e){return e.classList.remove("selected")})),f([]),y([]),L(0),A(0),B(0)}}),Object(j.jsx)(m,{playerNumbers:h,start:function(){if(6===h.length){for(var c=[].concat(e),a=[],i=0;i<6;i++){var o=Math.floor(Math.random()*c.length);a.push(c[o]),c.splice(o,1)}!function(){var e=h[0]+","+h[1]+","+h[2]+","+h[3]+","+h[4]+","+h[5];console.log("#### App 70 #### "+e+" : numb_tot ");var t={chips:"1",numb_tot:e,num1:h[0],num2:h[1],num3:h[2],num4:h[3],num5:h[4],num6:h[5]};l.a.post("https://lotto.c4ei.net/api/setLotto",t).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)}))}(),y(a),L((function(e){return e+1})),function(e,c){var a=[];e.forEach((function(e){for(var t=0;t<6;t++)e===c[t]&&a.push(e)}));var i=a.length;A(i),3===i?B((function(e){return e+t})):4===i?B((function(e){return e+n})):5===i?B((function(e){return e+s})):6===i&&B((function(e){return e+r}))}(h,a)}}})]})]})]})};a.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(v,{})}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.267a103a.chunk.js.map