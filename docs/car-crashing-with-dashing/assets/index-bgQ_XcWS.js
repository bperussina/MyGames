var Xp=n=>{throw TypeError(n)};var Br=(n,e,t)=>e.has(n)?Xp("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);function $p(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in n)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Yp(n=document.body){const e=document.createElement("canvas");e.style.display="block",n.appendChild(e);const t=e.getContext("2d");function i(){e.width=window.innerWidth,e.height=window.innerHeight}return i(),window.addEventListener("resize",i),{canvas:e,ctx:t,resize:i}}function bd(n,e="#1a1a2e"){n.fillStyle=e,n.fillRect(0,0,n.canvas.width,n.canvas.height)}const qp=new Set(["arrowup","arrowdown","arrowleft","arrowright"," ","w","a","s","d","x","e","r","l","b"]);class jp{constructor(e=window){this.keys=new Set,this.pointer={x:0,y:0,down:!1},document.addEventListener("keydown",t=>{const i=t.key.toLowerCase();this.keys.add(i),qp.has(i)&&t.preventDefault()}),document.addEventListener("keyup",t=>{this.keys.delete(t.key.toLowerCase())}),e.addEventListener("pointermove",t=>{this.pointer.x=t.clientX,this.pointer.y=t.clientY}),e.addEventListener("pointerdown",t=>{this.pointer.x=t.clientX,this.pointer.y=t.clientY,this.pointer.down=!0,e.focus&&e.focus()}),e.addEventListener("pointerup",()=>{this.pointer.down=!1})}isDown(e){return this.keys.has(e.toLowerCase())}isPressed(...e){return e.some(t=>this.isDown(t))}}function Zp(n){let e=0,t=performance.now();function i(r){const s=(r-t)/1e3;t=r,n(s),e=requestAnimationFrame(i)}return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)}function sc(n,e,t,i,r={}){const{color:s="#ffffff",size:o=24,align:a="center",baseline:c="middle",font:l="sans-serif"}=r;n.fillStyle=s,n.font=`${o}px ${l}`,n.textAlign=a,n.textBaseline=c,n.fillText(e,t,i)}const Ed=.18;function Kp(){var e;return(((e=navigator.getGamepads)==null?void 0:e.call(navigator))??[]).find(t=>t==null?void 0:t.connected)??null}function Jp(n){var i,r,s,o;let e=0,t=0;if(n){const a=n.axes[0]??0,c=n.axes[1]??0;Math.abs(a)>Ed&&(e+=a),Math.abs(c)>Ed&&(t-=c),(i=n.buttons[14])!=null&&i.pressed&&(e-=1),(r=n.buttons[15])!=null&&r.pressed&&(e+=1),(s=n.buttons[12])!=null&&s.pressed&&(t+=1),(o=n.buttons[13])!=null&&o.pressed&&(t-=1)}return{mx:e,mz:t}}function Qp(n){let e=0,t=0;return n.isPressed("w","arrowup")&&(t+=1),n.isPressed("s","arrowdown")&&(t-=1),n.isPressed("a","arrowleft")&&(e-=1),n.isPressed("d","arrowright")&&(e+=1),{mx:e,mz:t}}function em(n){let e=0,t=0,i=0,r=0;return n.isPressed("w","arrowup")&&(e=1),n.isPressed("s")&&(t=1),n.isPressed("arrowdown")&&(i=1),n.isPressed("a","arrowleft")&&(r-=1),n.isPressed("d","arrowright")&&(r+=1),r=Math.max(-1,Math.min(1,r)),{throttle:e,brake:t,reverse:i,steer:r}}function tm(n){var a,c,l,d,u,h;let e=0,t=0,i=0;if(!n)return{throttle:e,brake:t,reverse:0,steer:i};(a=n.buttons[2])!=null&&a.pressed&&(e=1),(c=n.buttons[1])!=null&&c.pressed&&(t=1);let r=0,s=0;return(l=n.buttons[4])!=null&&l.pressed&&(r=1),(((d=n.buttons[6])==null?void 0:d.value)??((u=n.buttons[6])!=null&&u.pressed?1:0))>.08&&(r=1),(h=n.buttons[5])!=null&&h.pressed&&(s=1),i=s-r,{throttle:e,brake:t,reverse:0,steer:i}}const Rl=[{id:"a",label:"A",index:0},{id:"b",label:"B",index:1},{id:"x",label:"X",index:2},{id:"y",label:"Y",index:3},{id:"lb",label:"LB",index:4},{id:"rb",label:"RB",index:5},{id:"lt",label:"LT",index:6},{id:"rt",label:"RT",index:7},{id:"view",label:"View",index:8},{id:"menu",label:"Menu",index:9},{id:"ls",label:"Left stick press",index:10},{id:"rs",label:"Right stick press",index:11},{id:"dpadUp",label:"D-pad Up",index:12},{id:"dpadDown",label:"D-pad Down",index:13},{id:"dpadLeft",label:"D-pad Left",index:14},{id:"dpadRight",label:"D-pad Right",index:15},{id:"xbox",label:"Xbox",index:16}];function nm(n,e,t={}){var s;const i=[];if(!n)return{fired:i,prevPressed:t};const r={...t};for(const o of Rl){const a=!!((s=n.buttons[o.index])!=null&&s.pressed),c=t[o.id]??!1;if(r[o.id]=a,a&&!c){const l=(e[o.id]??"").trim();l&&i.push({id:o.id,action:l})}}return{fired:i,prevPressed:r}}const Hh="ccwd-button-labels";function Pl(){try{return JSON.parse(localStorage.getItem(Hh)??"{}")}catch{return{}}}function im(n){try{localStorage.setItem(Hh,JSON.stringify(n))}catch{}}let Bt=null,es=null;function Gh(n){if(es=n,Bt)return Bt;Bt=document.createElement("div"),Bt.id="controller-map",Bt.innerHTML=`
    <div class="cm-header">
      <h1>Xbox controller — write what each button does</h1>
      <p>Leave a line blank and that button won't do anything.</p>
    </div>
    <div class="cm-body">
      <div class="cm-pad-wrap">
        <svg class="cm-svg" viewBox="0 0 520 320" aria-hidden="true">
          <ellipse cx="260" cy="160" rx="230" ry="130" fill="#2d2d2d" stroke="#111" stroke-width="4"/>
          <rect x="70" y="95" width="95" height="130" rx="45" fill="#1a1a1a" stroke="#444" stroke-width="3"/>
          <rect x="355" y="95" width="95" height="130" rx="45" fill="#1a1a1a" stroke="#444" stroke-width="3"/>
          <circle cx="115" cy="160" r="32" fill="#111" stroke="#555" stroke-width="2"/>
          <circle cx="405" cy="160" r="32" fill="#111" stroke="#555" stroke-width="2"/>
          <circle cx="330" cy="115" r="16" fill="#107c10"/>
          <circle cx="360" cy="145" r="16" fill="#d13438"/>
          <circle cx="300" cy="145" r="16" fill="#0078d4"/>
          <circle cx="330" cy="175" r="16" fill="#ffba00"/>
          <rect x="175" y="55" width="50" height="28" rx="8" fill="#333" stroke="#666"/>
          <rect x="295" y="55" width="50" height="28" rx="8" fill="#333" stroke="#666"/>
          <circle cx="260" cy="200" r="18" fill="#333" stroke="#888"/>
          <text x="260" y="205" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Xbox</text>
        </svg>
      </div>
      <div class="cm-fields" id="cm-fields"></div>
    </div>
    <button type="button" class="cm-done" id="cm-done">Done — back to green world</button>
  `,document.body.appendChild(Bt);const e=Bt.querySelector("#cm-fields"),t=Pl();for(const i of Rl){const r=document.createElement("div");r.className="cm-row",r.innerHTML=`
      <span class="cm-line"></span>
      <label class="cm-label">${i.label}</label>
      <input type="text" class="cm-input" data-id="${i.id}" placeholder="(blank = does nothing)" value="${rm(t[i.id]??"")}" />
    `,e.appendChild(r)}return Bt.querySelector("#cm-done").addEventListener("click",()=>{const i={};Bt.querySelectorAll(".cm-input").forEach(r=>{i[r.dataset.id]=r.value}),im(i),sm(),es==null||es()}),Bt}function rm(n){return String(n).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Vh(){Gh(es),Bt.style.display="flex"}function sm(){Bt&&(Bt.style.display="none")}function oc(){return(Bt==null?void 0:Bt.style.display)==="flex"}const om={x:"Gas",b:"Brake",lb:"Turn left",lt:"Turn left",rb:"Turn right",menu:"Change controls"},am={a:"chip-a",b:"chip-b",x:"chip-x",y:"chip-y",lb:"chip-bump",rb:"chip-bump",lt:"chip-trigger",rt:"chip-trigger",view:"chip-misc",menu:"chip-misc",ls:"chip-misc",rs:"chip-misc",dpadUp:"chip-dpad",dpadDown:"chip-dpad",dpadLeft:"chip-dpad",dpadRight:"chip-dpad",xbox:"chip-misc"};function Li(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function cm(n,e){const t=(n[e]??"").trim();return t||(om[e]??"").trim()}function lm(n,e){return`<span class="pc-key" title="${Li(e)}"><span class="pc-key-letter">${Li(n)}</span><span class="pc-key-word">${Li(e)}</span></span>`}function dm(n,e){return`<span class="pad-chip ${am[n.id]??"chip-misc"}" title="${Li(n.label)} button — ${Li(e)}"><span class="pad-chip-mark">${Li(n.label)}</span><span class="pad-chip-word">${Li(e)}</span></span>`}function Vo(n,{driving:e=!1}={}){if(!n)return;const t=n.querySelector("#controls-body");if(!t)return;const i=Pl(),r=e?[{key:"W",word:"Gas"},{key:"↑",word:"Gas"},{key:"S",word:"Brake"},{key:"↓",word:"Reverse"},{key:"A",word:"Left"},{key:"←",word:"Left"},{key:"D",word:"Right"},{key:"→",word:"Right"},{key:"E",word:"Exit car"}]:[{key:"W",word:"Forward"},{key:"↑",word:"Forward"},{key:"A",word:"Left"},{key:"←",word:"Left"},{key:"S",word:"Back"},{key:"↓",word:"Back"},{key:"D",word:"Right"},{key:"→",word:"Right"}],s=['<span class="pad-chip chip-stick" title="Left stick — move"><span class="pad-chip-mark">Stick</span><span class="pad-chip-word">Move</span></span>'];for(const o of Rl){const a=cm(i,o.id);a&&s.push(dm(o,a))}t.innerHTML=`
    <p class="controls-mini-hint">${e?"Driving — ↓ reverse then W for speed burst · drag mouse to look":"Walking"} — iPad: use arrows bottom-left · Garage on left</p>
    <div class="controls-mini-block">
      <span class="controls-mini-label">Keyboard</span>
      <div class="pc-keys">${r.map(({key:o,word:a})=>lm(o,a)).join("")}</div>
    </div>
    <div class="controls-mini-block">
      <span class="controls-mini-label">Xbox</span>
      <div class="pad-chips">${s.join("")}</div>
    </div>
  `}function Di(n,e,t={}){if(!n)return;if(!e){n.hidden=!0;return}const i=t.driving?"1":"0";(n.hidden||n.dataset.driving!==i)&&(Vo(n,t),n.dataset.driving=i),n.hidden=!1}function um(n){const e=n.width??1.88,t=n.length??4.55;return{hw:e*.5+.06,hd:t*.5+.08,width:e,length:t}}function hm(n,e,t){const i=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n));return{halfX:e*i+t*r,halfZ:e*r+t*i}}function fm(n,e,t,i,r){return n+t>r.minX&&n-t<r.maxX&&e+i>r.minZ&&e-i<r.maxZ}function pm(n){return n<=1.5?"Ultra-slim — slips through the tightest alleys":n<=1.65?"Slim — fits narrow alleys":n<=1.85?"Average — most city gaps":n<=2?"Wide — tight alleys are tricky":"Extra wide — needs open roads"}function mm(n){return n>66?"#22c55e":n>33?"#eab308":"#ef4444"}function zr(n,e){const t=mm(e);return`<div class="dmg-row"><span class="dmg-label">${n}</span>
    <div class="dmg-track"><div class="dmg-fill" style="width:${e}%;background:${t}"></div></div>
    <span class="dmg-pct">${Math.round(e)}%</span></div>`}function Ll(n,e){if(!n||!(e!=null&&e.partHealth))return;const t=e.partHealth,i=Math.round((t.wheel_fl+t.wheel_fr+t.wheel_rl+t.wheel_rr)/4),r=e.collisionWidth??1.88;n.innerHTML=`
    <p class="dmg-title">Vehicle damage</p>
    <p class="dmg-width">${r.toFixed(2)}m wide · ${pm(r)}</p>
    ${zr("Engine",t.engine)}
    ${zr("Body",t.body)}
    ${zr("Hood",t.hood)}
    ${zr("Glass",t.windshield)}
    ${zr("Wheels",i)}
  `}function Dl(n,e){n&&(e?n.removeAttribute("hidden"):n.setAttribute("hidden",""))}function gm(){return matchMedia("(pointer: coarse)").matches||"ontouchstart"in window}const _m=()=>({mx:0,mz:0}),xm=()=>({throttle:0,brake:0,reverse:0,steer:0});function ym(){if(!gm())return{readMove:_m,readDrive:xm,setDriving:()=>{},setVisible:()=>{},onExit:()=>{}};const n=document.createElement("div");n.id="touch-pad",n.innerHTML=`
    <button type="button" class="touch-btn touch-up" data-mz="1" aria-label="Forward">▲</button>
    <button type="button" class="touch-btn touch-left" data-mx="-1" aria-label="Left">◀</button>
    <button type="button" class="touch-btn touch-right" data-mx="1" aria-label="Right">▶</button>
    <button type="button" class="touch-btn touch-down" data-mz="-1" aria-label="Back">▼</button>
    <button type="button" class="touch-btn touch-exit" id="touch-exit" hidden aria-label="Exit car">Exit</button>
  `,document.body.appendChild(n);const e={mx:0,mz:0};let t=!1;const i=n.querySelector("#touch-exit");function r(o){const a=c=>{if(!c){e.mx=0,e.mz=0;return}if(t){const l=Number(o.dataset.mz||0),d=Number(o.dataset.mx||0);e.mz=l,e.mx=d}else e.mx=Number(o.dataset.mx||0),e.mz=Number(o.dataset.mz||0)};o.addEventListener("pointerdown",c=>{c.preventDefault(),o.setPointerCapture(c.pointerId),a(!0)}),o.addEventListener("pointerup",()=>a(!1)),o.addEventListener("pointercancel",()=>a(!1))}n.querySelectorAll(".touch-btn[data-mx], .touch-btn[data-mz]").forEach(r);let s=null;return i.addEventListener("pointerdown",o=>{o.preventDefault(),s==null||s()}),{readMove(){return t?{mx:0,mz:0}:{...e}},readDrive(){return t?{throttle:e.mz>0?1:0,reverse:e.mz<0?1:0,brake:0,steer:e.mx}:{throttle:0,brake:0,reverse:0,steer:0}},setDriving(o){t=o,e.mx=0,e.mz=0,i.hidden=!o},setVisible(o){n.hidden=!o},onExit(o){s=o}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Il="170",vm=0,Td=1,Sm=2,Wh=1,Xh=2,Fn=3,pi=0,$t=1,wn=2,li=0,gr=1,wd=2,Cd=3,Ad=4,Mm=5,wi=100,bm=101,Em=102,Tm=103,wm=104,Cm=200,Am=201,Rm=202,Pm=203,ac=204,cc=205,Lm=206,Dm=207,Im=208,Um=209,Nm=210,km=211,Om=212,Fm=213,Bm=214,lc=0,dc=1,uc=2,br=3,hc=4,fc=5,pc=6,mc=7,Ul=0,zm=1,Hm=2,di=0,$h=1,Gm=2,Vm=3,Wm=4,Xm=5,$m=6,Ym=7,Yh=300,Er=301,Tr=302,gc=303,_c=304,Wo=306,xc=1e3,Ii=1001,yc=1002,Sn=1003,qm=1004,Ms=1005,An=1006,ea=1007,Ui=1008,Xn=1009,qh=1010,jh=1011,fs=1012,Nl=1013,ki=1014,zn=1015,_s=1016,kl=1017,Ol=1018,wr=1020,Zh=35902,Kh=1021,Jh=1022,vn=1023,Qh=1024,ef=1025,_r=1026,Cr=1027,tf=1028,Fl=1029,nf=1030,Bl=1031,zl=1033,lo=33776,uo=33777,ho=33778,fo=33779,vc=35840,Sc=35841,Mc=35842,bc=35843,Ec=36196,Tc=37492,wc=37496,Cc=37808,Ac=37809,Rc=37810,Pc=37811,Lc=37812,Dc=37813,Ic=37814,Uc=37815,Nc=37816,kc=37817,Oc=37818,Fc=37819,Bc=37820,zc=37821,po=36492,Hc=36494,Gc=36495,rf=36283,Vc=36284,Wc=36285,Xc=36286,jm=3200,Zm=3201,Hl=0,Km=1,oi="",Qt="srgb",Dr="srgb-linear",Xo="linear",at="srgb",Wi=7680,Rd=519,Jm=512,Qm=513,e0=514,sf=515,t0=516,n0=517,i0=518,r0=519,$c=35044,Pd="300 es",Hn=2e3,Ro=2001;class Ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mo=Math.PI/180,Yc=180/Math.PI;function ui(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]).toLowerCase()}function en(n,e,t){return Math.max(e,Math.min(t,n))}function s0(n,e){return(n%e+e)%e}function ta(n,e,t){return(1-t)*n+t*e}function Cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ct(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(en(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e,t,i,r,s,o,a,c,l){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],d=i[4],u=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],f=r[6],w=r[1],T=r[4],x=r[7],R=r[2],y=r[5],E=r[8];return s[0]=o*_+a*w+c*R,s[3]=o*m+a*T+c*y,s[6]=o*f+a*x+c*E,s[1]=l*_+d*w+u*R,s[4]=l*m+d*T+u*y,s[7]=l*f+d*x+u*E,s[2]=h*_+p*w+g*R,s[5]=h*m+p*T+g*y,s[8]=h*f+p*x+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8];return t*o*d-t*a*l-i*s*d+i*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],u=d*o-a*l,h=a*c-d*s,p=l*s-o*c,g=t*u+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*l-d*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(d*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const na=new Fe;function of(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Po(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function o0(){const n=Po("canvas");return n.style.display="block",n}const Ld={};function ts(n){n in Ld||(Ld[n]=!0,console.warn(n))}function a0(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function c0(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function l0(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ze={enabled:!0,workingColorSpace:Dr,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===at&&(n.r=Gn(n.r),n.g=Gn(n.g),n.b=Gn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===at&&(n.r=xr(n.r),n.g=xr(n.g),n.b=xr(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===oi?Xo:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Gn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function xr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Dd=[.64,.33,.3,.6,.15,.06],Id=[.2126,.7152,.0722],Ud=[.3127,.329],Nd=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kd=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze.define({[Dr]:{primaries:Dd,whitePoint:Ud,transfer:Xo,toXYZ:Nd,fromXYZ:kd,luminanceCoefficients:Id,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:Dd,whitePoint:Ud,transfer:at,toXYZ:Nd,fromXYZ:kd,luminanceCoefficients:Id,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}});let Xi;class d0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Xi===void 0&&(Xi=Po("canvas")),Xi.width=e.width,Xi.height=e.height;const i=Xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Xi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Po("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Gn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gn(t[i]/255)*255):t[i]=Gn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let u0=0;class af{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ia(r[o].image)):s.push(ia(r[o]))}else s=ia(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?d0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let h0=0;class Yt extends Ir{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,i=Ii,r=Ii,s=An,o=Ui,a=vn,c=Xn,l=Yt.DEFAULT_ANISOTROPY,d=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=ui(),this.name="",this.source=new af(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xc:e.x=e.x-Math.floor(e.x);break;case Ii:e.x=e.x<0?0:1;break;case yc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xc:e.y=e.y-Math.floor(e.y);break;case Ii:e.y=e.y<0?0:1;break;case yc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Yh;Yt.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,i=0,r=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],u=c[8],h=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,x=(p+1)/2,R=(f+1)/2,y=(d+h)/4,E=(u+_)/4,A=(g+m)/4;return T>x&&T>R?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=y/i,s=E/i):x>R?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=y/r,s=A/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=E/s,r=A/s),this.set(i,r,s,t),this}let w=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-_)/w,this.z=(h-d)/w,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class f0 extends Ir{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Yt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new af(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Oi extends f0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class cf extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class p0 extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ur{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],d=i[r+2],u=i[r+3];const h=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=u;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==h||l!==p||d!==g){let m=1-a;const f=c*h+l*p+d*g+u*_,w=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const R=Math.sqrt(T),y=Math.atan2(R,f*w);m=Math.sin(m*y)/R,a=Math.sin(a*y)/R}const x=a*w;if(c=c*m+h*x,l=l*m+p*x,d=d*m+g*x,u=u*m+_*x,m===1-a){const R=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=R,l*=R,d*=R,u*=R}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],d=i[r+3],u=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+d*u+c*p-l*h,e[t+1]=c*g+d*h+l*u-a*p,e[t+2]=l*g+d*p+a*h-c*u,e[t+3]=d*g-a*u-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),d=a(r/2),u=a(s/2),h=c(i/2),p=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=h*d*u+l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u-h*p*g;break;case"YXZ":this._x=h*d*u+l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u+h*p*g;break;case"ZXY":this._x=h*d*u-l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u-h*p*g;break;case"ZYX":this._x=h*d*u-l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u+h*p*g;break;case"YZX":this._x=h*d*u+l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u-h*p*g;break;case"XZY":this._x=h*d*u-l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],d=t[6],u=t[10],h=i+a+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(d-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(en(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+o*a+r*l-s*c,this._y=r*d+o*c+s*a-i*l,this._z=s*d+o*l+i*c-r*a,this._w=o*d-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,a),u=Math.sin((1-t)*d)/l,h=Math.sin(t*d)/l;return this._w=o*u+this._w*h,this._x=i*u+this._x*h,this._y=r*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Od.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Od.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),d=2*(a*t-s*r),u=2*(s*i-o*t);return this.x=t+c*l+o*u-a*d,this.y=i+c*d+a*l-s*u,this.z=r+c*u+s*d-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ra.copy(this).projectOnVector(e),this.sub(ra)}reflect(e){return this.sub(ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(en(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ra=new L,Od=new Ur;class xs{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,gn):gn.fromBufferAttribute(s,o),gn.applyMatrix4(e.matrixWorld),this.expandByPoint(gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),bs.copy(i.boundingBox)),bs.applyMatrix4(e.matrixWorld),this.union(bs)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gn),gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),Es.subVectors(this.max,Hr),$i.subVectors(e.a,Hr),Yi.subVectors(e.b,Hr),qi.subVectors(e.c,Hr),jn.subVectors(Yi,$i),Zn.subVectors(qi,Yi),yi.subVectors($i,qi);let t=[0,-jn.z,jn.y,0,-Zn.z,Zn.y,0,-yi.z,yi.y,jn.z,0,-jn.x,Zn.z,0,-Zn.x,yi.z,0,-yi.x,-jn.y,jn.x,0,-Zn.y,Zn.x,0,-yi.y,yi.x,0];return!sa(t,$i,Yi,qi,Es)||(t=[1,0,0,0,1,0,0,0,1],!sa(t,$i,Yi,qi,Es))?!1:(Ts.crossVectors(jn,Zn),t=[Ts.x,Ts.y,Ts.z],sa(t,$i,Yi,qi,Es))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(In),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const In=[new L,new L,new L,new L,new L,new L,new L,new L],gn=new L,bs=new xs,$i=new L,Yi=new L,qi=new L,jn=new L,Zn=new L,yi=new L,Hr=new L,Es=new L,Ts=new L,vi=new L;function sa(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){vi.fromArray(n,s);const a=r.x*Math.abs(vi.x)+r.y*Math.abs(vi.y)+r.z*Math.abs(vi.z),c=e.dot(vi),l=t.dot(vi),d=i.dot(vi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const m0=new xs,Gr=new L,oa=new L;class $o{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):m0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gr.subVectors(e,this.center);const t=Gr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Gr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gr.copy(e.center).add(oa)),this.expandByPoint(Gr.copy(e.center).sub(oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Un=new L,aa=new L,ws=new L,Kn=new L,ca=new L,Cs=new L,la=new L;class Gl{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){aa.copy(e).add(t).multiplyScalar(.5),ws.copy(t).sub(e).normalize(),Kn.copy(this.origin).sub(aa);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ws),a=Kn.dot(this.direction),c=-Kn.dot(ws),l=Kn.lengthSq(),d=Math.abs(1-o*o);let u,h,p,g;if(d>0)if(u=o*c-a,h=o*a-c,g=s*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,p=u*(u+o*h+2*a)+h*(o*u+h+2*c)+l}else h=s,u=Math.max(0,-(o*h+a)),p=-u*u+h*(h+2*c)+l;else h=-s,u=Math.max(0,-(o*h+a)),p=-u*u+h*(h+2*c)+l;else h<=-g?(u=Math.max(0,-(-o*s+a)),h=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+h*(h+2*c)+l):h<=g?(u=0,h=Math.min(Math.max(-s,-c),s),p=h*(h+2*c)+l):(u=Math.max(0,-(o*s+a)),h=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+h*(h+2*c)+l);else h=o>0?-s:s,u=Math.max(0,-(o*h+a)),p=-u*u+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(aa).addScaledVector(ws,h),p}intersectSphere(e,t){Un.subVectors(e.center,this.origin);const i=Un.dot(this.direction),r=Un.dot(Un)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),d>=0?(s=(e.min.y-h.y)*d,o=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,o=(e.min.y-h.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-h.z)*u,c=(e.max.z-h.z)*u):(a=(e.max.z-h.z)*u,c=(e.min.z-h.z)*u),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,i,r,s){ca.subVectors(t,e),Cs.subVectors(i,e),la.crossVectors(ca,Cs);let o=this.direction.dot(la),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kn.subVectors(this.origin,e);const c=a*this.direction.dot(Cs.crossVectors(Kn,Cs));if(c<0)return null;const l=a*this.direction.dot(ca.cross(Kn));if(l<0||c+l>o)return null;const d=-a*Kn.dot(la);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,t,i,r,s,o,a,c,l,d,u,h,p,g,_,m){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,d,u,h,p,g,_,m)}set(e,t,i,r,s,o,a,c,l,d,u,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=d,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ji.setFromMatrixColumn(e,0).length(),s=1/ji.setFromMatrixColumn(e,1).length(),o=1/ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const h=o*d,p=o*u,g=a*d,_=a*u;t[0]=c*d,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=h-_*l,t[9]=-a*c,t[2]=_-h*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const h=c*d,p=c*u,g=l*d,_=l*u;t[0]=h+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*d,t[9]=-a,t[2]=p*a-g,t[6]=_+h*a,t[10]=o*c}else if(e.order==="ZXY"){const h=c*d,p=c*u,g=l*d,_=l*u;t[0]=h-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*d,t[9]=_-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const h=o*d,p=o*u,g=a*d,_=a*u;t[0]=c*d,t[4]=g*l-p,t[8]=h*l+_,t[1]=c*u,t[5]=_*l+h,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const h=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*d,t[4]=_-h*u,t[8]=g*u+p,t[1]=u,t[5]=o*d,t[9]=-a*d,t[2]=-l*d,t[6]=p*u+g,t[10]=h-_*u}else if(e.order==="XZY"){const h=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*d,t[4]=-u,t[8]=l*d,t[1]=h*u+_,t[5]=o*d,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*d,t[10]=_*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(g0,e,_0)}lookAt(e,t,i){const r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),Jn.crossVectors(i,nn),Jn.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),Jn.crossVectors(i,nn)),Jn.normalize(),As.crossVectors(nn,Jn),r[0]=Jn.x,r[4]=As.x,r[8]=nn.x,r[1]=Jn.y,r[5]=As.y,r[9]=nn.y,r[2]=Jn.z,r[6]=As.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],d=i[1],u=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],w=i[3],T=i[7],x=i[11],R=i[15],y=r[0],E=r[4],A=r[8],v=r[12],M=r[1],P=r[5],B=r[9],F=r[13],k=r[2],H=r[6],O=r[10],$=r[14],W=r[3],te=r[7],se=r[11],ve=r[15];return s[0]=o*y+a*M+c*k+l*W,s[4]=o*E+a*P+c*H+l*te,s[8]=o*A+a*B+c*O+l*se,s[12]=o*v+a*F+c*$+l*ve,s[1]=d*y+u*M+h*k+p*W,s[5]=d*E+u*P+h*H+p*te,s[9]=d*A+u*B+h*O+p*se,s[13]=d*v+u*F+h*$+p*ve,s[2]=g*y+_*M+m*k+f*W,s[6]=g*E+_*P+m*H+f*te,s[10]=g*A+_*B+m*O+f*se,s[14]=g*v+_*F+m*$+f*ve,s[3]=w*y+T*M+x*k+R*W,s[7]=w*E+T*P+x*H+R*te,s[11]=w*A+T*B+x*O+R*se,s[15]=w*v+T*F+x*$+R*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],d=e[2],u=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*c*u-r*l*u-s*a*h+i*l*h+r*a*p-i*c*p)+_*(+t*c*p-t*l*h+s*o*h-r*o*p+r*l*d-s*c*d)+m*(+t*l*u-t*a*p-s*o*u+i*o*p+s*a*d-i*l*d)+f*(-r*a*d-t*c*u+t*a*h+r*o*u-i*o*h+i*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],u=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],w=u*m*l-_*h*l+_*c*p-a*m*p-u*c*f+a*h*f,T=g*h*l-d*m*l-g*c*p+o*m*p+d*c*f-o*h*f,x=d*_*l-g*u*l+g*a*p-o*_*p-d*a*f+o*u*f,R=g*u*c-d*_*c-g*a*h+o*_*h+d*a*m-o*u*m,y=t*w+i*T+r*x+s*R;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/y;return e[0]=w*E,e[1]=(_*h*s-u*m*s-_*r*p+i*m*p+u*r*f-i*h*f)*E,e[2]=(a*m*s-_*c*s+_*r*l-i*m*l-a*r*f+i*c*f)*E,e[3]=(u*c*s-a*h*s-u*r*l+i*h*l+a*r*p-i*c*p)*E,e[4]=T*E,e[5]=(d*m*s-g*h*s+g*r*p-t*m*p-d*r*f+t*h*f)*E,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*f-t*c*f)*E,e[7]=(o*h*s-d*c*s+d*r*l-t*h*l-o*r*p+t*c*p)*E,e[8]=x*E,e[9]=(g*u*s-d*_*s-g*i*p+t*_*p+d*i*f-t*u*f)*E,e[10]=(o*_*s-g*a*s+g*i*l-t*_*l-o*i*f+t*a*f)*E,e[11]=(d*a*s-o*u*s-d*i*l+t*u*l+o*i*p-t*a*p)*E,e[12]=R*E,e[13]=(d*_*r-g*u*r+g*i*h-t*_*h-d*i*m+t*u*m)*E,e[14]=(g*a*r-o*_*r-g*i*c+t*_*c+o*i*m-t*a*m)*E,e[15]=(o*u*r-d*a*r+d*i*c-t*u*c-o*i*h+t*a*h)*E,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,d=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,d*a+i,d*c-r*o,0,l*c-r*a,d*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,d=o+o,u=a+a,h=s*l,p=s*d,g=s*u,_=o*d,m=o*u,f=a*u,w=c*l,T=c*d,x=c*u,R=i.x,y=i.y,E=i.z;return r[0]=(1-(_+f))*R,r[1]=(p+x)*R,r[2]=(g-T)*R,r[3]=0,r[4]=(p-x)*y,r[5]=(1-(h+f))*y,r[6]=(m+w)*y,r[7]=0,r[8]=(g+T)*E,r[9]=(m-w)*E,r[10]=(1-(h+_))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ji.set(r[0],r[1],r[2]).length();const o=ji.set(r[4],r[5],r[6]).length(),a=ji.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],_n.copy(this);const l=1/s,d=1/o,u=1/a;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=d,_n.elements[5]*=d,_n.elements[6]*=d,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Hn){const c=this.elements,l=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),h=(i+r)/(i-r);let p,g;if(a===Hn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ro)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Hn){const c=this.elements,l=1/(t-e),d=1/(i-r),u=1/(o-s),h=(t+e)*l,p=(i+r)*d;let g,_;if(a===Hn)g=(o+s)*u,_=-2*u;else if(a===Ro)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ji=new L,_n=new pt,g0=new L(0,0,0),_0=new L(1,1,1),Jn=new L,As=new L,nn=new L,Fd=new pt,Bd=new Ur;class bn{constructor(e=0,t=0,i=0,r=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],d=r[9],u=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(en(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-en(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(en(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-en(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(en(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-en(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Fd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bd.setFromEuler(this),this.setFromQuaternion(Bd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class Vl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let x0=0;const zd=new L,Zi=new Ur,Nn=new pt,Rs=new L,Vr=new L,y0=new L,v0=new Ur,Hd=new L(1,0,0),Gd=new L(0,1,0),Vd=new L(0,0,1),Wd={type:"added"},S0={type:"removed"},Ki={type:"childadded",child:null},da={type:"childremoved",child:null};class Pt extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new L,t=new bn,i=new Ur,r=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new Fe}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(Hd,e)}rotateY(e){return this.rotateOnAxis(Gd,e)}rotateZ(e){return this.rotateOnAxis(Vd,e)}translateOnAxis(e,t){return zd.copy(e).applyQuaternion(this.quaternion),this.position.add(zd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hd,e)}translateY(e){return this.translateOnAxis(Gd,e)}translateZ(e){return this.translateOnAxis(Vd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rs.copy(e):Rs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Vr,Rs,this.up):Nn.lookAt(Rs,Vr,this.up),this.quaternion.setFromRotationMatrix(Nn),r&&(Nn.extractRotation(r.matrixWorld),Zi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wd),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(S0),da.child=e,this.dispatchEvent(da),da.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wd),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,y0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,v0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),d=o(e.images),u=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Pt.DEFAULT_UP=new L(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new L,kn=new L,ua=new L,On=new L,Ji=new L,Qi=new L,Xd=new L,ha=new L,fa=new L,pa=new L,ma=new lt,ga=new lt,_a=new lt;class on{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),xn.subVectors(e,t),r.cross(xn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){xn.subVectors(r,t),kn.subVectors(i,t),ua.subVectors(e,t);const o=xn.dot(xn),a=xn.dot(kn),c=xn.dot(ua),l=kn.dot(kn),d=kn.dot(ua),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const h=1/u,p=(l*c-a*d)*h,g=(o*d-a*c)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,On)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,On.x),c.addScaledVector(o,On.y),c.addScaledVector(a,On.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return ma.setScalar(0),ga.setScalar(0),_a.setScalar(0),ma.fromBufferAttribute(e,t),ga.fromBufferAttribute(e,i),_a.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ma,s.x),o.addScaledVector(ga,s.y),o.addScaledVector(_a,s.z),o}static isFrontFacing(e,t,i,r){return xn.subVectors(i,t),kn.subVectors(e,t),xn.cross(kn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),xn.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return on.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ji.subVectors(r,i),Qi.subVectors(s,i),ha.subVectors(e,i);const c=Ji.dot(ha),l=Qi.dot(ha);if(c<=0&&l<=0)return t.copy(i);fa.subVectors(e,r);const d=Ji.dot(fa),u=Qi.dot(fa);if(d>=0&&u<=d)return t.copy(r);const h=c*u-d*l;if(h<=0&&c>=0&&d<=0)return o=c/(c-d),t.copy(i).addScaledVector(Ji,o);pa.subVectors(e,s);const p=Ji.dot(pa),g=Qi.dot(pa);if(g>=0&&p<=g)return t.copy(s);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Qi,a);const m=d*g-p*u;if(m<=0&&u-d>=0&&p-g>=0)return Xd.subVectors(s,r),a=(u-d)/(u-d+(p-g)),t.copy(r).addScaledVector(Xd,a);const f=1/(m+_+h);return o=_*f,a=h*f,t.copy(i).addScaledVector(Ji,o).addScaledVector(Qi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const lf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function xa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Re{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ze.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Ze.workingColorSpace){if(e=s0(e,1),t=en(t,0,1),i=en(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=xa(o,s,e+1/3),this.g=xa(o,s,e),this.b=xa(o,s,e-1/3)}return Ze.toWorkingColorSpace(this,r),this}setStyle(e,t=Qt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){const i=lf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gn(e.r),this.g=Gn(e.g),this.b=Gn(e.b),this}copyLinearToSRGB(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return Ze.fromWorkingColorSpace(Ft.copy(this),e),Math.round(en(Ft.r*255,0,255))*65536+Math.round(en(Ft.g*255,0,255))*256+Math.round(en(Ft.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(Ft.copy(this),t);const i=Ft.r,r=Ft.g,s=Ft.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=d<=.5?u/(o+a):u/(2-o-a),o){case i:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-i)/u+2;break;case s:c=(i-r)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Qt){Ze.fromWorkingColorSpace(Ft.copy(this),e);const t=Ft.r,i=Ft.g,r=Ft.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(Ps);const i=ta(Qn.h,Ps.h,t),r=ta(Qn.s,Ps.s,t),s=ta(Qn.l,Ps.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Re;Re.NAMES=lf;let M0=0;class _i extends Ir{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=ui(),this.name="",this.blending=gr,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ac,this.blendDst=cc,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gr&&(i.blending=this.blending),this.side!==pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ac&&(i.blendSrc=this.blendSrc),this.blendDst!==cc&&(i.blendDst=this.blendDst),this.blendEquation!==wi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==br&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Yo extends _i{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new L,Ls=new Ue;class fn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=$c,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ls.fromBufferAttribute(this,t),Ls.applyMatrix3(e),this.setXY(t,Ls.x,Ls.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Cn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$c&&(e.usage=this.usage),e}}class df extends fn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class uf extends fn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Mt extends fn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let b0=0;const un=new pt,ya=new Pt,er=new L,rn=new xs,Wr=new xs,It=new L;class Zt extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(of(e)?uf:df)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Fe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,i){return un.makeTranslation(e,t,i),this.applyMatrix4(un),this}scale(e,t,i){return un.makeScale(e,t,i),this.applyMatrix4(un),this}lookAt(e){return ya.lookAt(e),ya.updateMatrix(),this.applyMatrix4(ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Mt(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $o);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Wr.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(rn.min,Wr.min),rn.expandByPoint(It),It.addVectors(rn.max,Wr.max),rn.expandByPoint(It)):(rn.expandByPoint(Wr.min),rn.expandByPoint(Wr.max))}rn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)It.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(It));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)It.fromBufferAttribute(a,l),c&&(er.fromBufferAttribute(e,l),It.add(er)),r=Math.max(r,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let A=0;A<i.count;A++)a[A]=new L,c[A]=new L;const l=new L,d=new L,u=new L,h=new Ue,p=new Ue,g=new Ue,_=new L,m=new L;function f(A,v,M){l.fromBufferAttribute(i,A),d.fromBufferAttribute(i,v),u.fromBufferAttribute(i,M),h.fromBufferAttribute(s,A),p.fromBufferAttribute(s,v),g.fromBufferAttribute(s,M),d.sub(l),u.sub(l),p.sub(h),g.sub(h);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(P),a[A].add(_),a[v].add(_),a[M].add(_),c[A].add(m),c[v].add(m),c[M].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let A=0,v=w.length;A<v;++A){const M=w[A],P=M.start,B=M.count;for(let F=P,k=P+B;F<k;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const T=new L,x=new L,R=new L,y=new L;function E(A){R.fromBufferAttribute(r,A),y.copy(R);const v=a[A];T.copy(v),T.sub(R.multiplyScalar(R.dot(v))).normalize(),x.crossVectors(y,v);const P=x.dot(c[A])<0?-1:1;o.setXYZW(A,T.x,T.y,T.z,P)}for(let A=0,v=w.length;A<v;++A){const M=w[A],P=M.start,B=M.count;for(let F=P,k=P+B;F<k;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new L,s=new L,o=new L,a=new L,c=new L,l=new L,d=new L,u=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),d.subVectors(o,s),u.subVectors(r,s),d.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(d),c.add(d),l.add(d),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),d.subVectors(o,s),u.subVectors(r,s),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(a,c){const l=a.array,d=a.itemSize,u=a.normalized,h=new l.constructor(c.length*d);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*d;for(let f=0;f<d;f++)h[g++]=l[p++]}return new fn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let d=0,u=l.length;d<u;d++){const h=l[d],p=e(h,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let u=0,h=l.length;u<h;u++){const p=l[u];d.push(p.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],u=s[l];for(let h=0,p=u.length;h<p;h++)d.push(u[h].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,d=o.length;l<d;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $d=new pt,Si=new Gl,Ds=new $o,Yd=new L,Is=new L,Us=new L,Ns=new L,va=new L,ks=new L,qd=new L,Os=new L;class ne extends Pt{constructor(e=new Zt,t=new Yo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ks.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=a[c],u=s[c];d!==0&&(va.fromBufferAttribute(u,e),o?ks.addScaledVector(va,d):ks.addScaledVector(va.sub(t),d))}t.add(ks)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ds.copy(i.boundingSphere),Ds.applyMatrix4(s),Si.copy(e.ray).recast(e.near),!(Ds.containsPoint(Si.origin)===!1&&(Si.intersectSphere(Ds,Yd)===null||Si.origin.distanceToSquared(Yd)>(e.far-e.near)**2))&&($d.copy(s).invert(),Si.copy(e.ray).applyMatrix4($d),!(i.boundingBox!==null&&Si.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Si)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=w,R=T;x<R;x+=3){const y=a.getX(x),E=a.getX(x+1),A=a.getX(x+2);r=Fs(this,f,e,i,l,d,u,y,E,A),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=a.getX(m),T=a.getX(m+1),x=a.getX(m+2);r=Fs(this,o,e,i,l,d,u,w,T,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=w,R=T;x<R;x+=3){const y=x,E=x+1,A=x+2;r=Fs(this,f,e,i,l,d,u,y,E,A),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=m,T=m+1,x=m+2;r=Fs(this,o,e,i,l,d,u,w,T,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function E0(n,e,t,i,r,s,o,a){let c;if(e.side===$t?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===pi,a),c===null)return null;Os.copy(a),Os.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Os);return l<t.near||l>t.far?null:{distance:l,point:Os.clone(),object:n}}function Fs(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Is),n.getVertexPosition(c,Us),n.getVertexPosition(l,Ns);const d=E0(n,e,t,i,Is,Us,Ns,qd);if(d){const u=new L;on.getBarycoord(qd,Is,Us,Ns,u),r&&(d.uv=on.getInterpolatedAttribute(r,a,c,l,u,new Ue)),s&&(d.uv1=on.getInterpolatedAttribute(s,a,c,l,u,new Ue)),o&&(d.normal=on.getInterpolatedAttribute(o,a,c,l,u,new L),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new L,materialIndex:0};on.getNormal(Is,Us,Ns,h.normal),d.face=h,d.barycoord=u}return d}class Ve extends Zt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],d=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(d,3)),this.setAttribute("uv",new Mt(u,2));function g(_,m,f,w,T,x,R,y,E,A,v){const M=x/E,P=R/A,B=x/2,F=R/2,k=y/2,H=E+1,O=A+1;let $=0,W=0;const te=new L;for(let se=0;se<O;se++){const ve=se*P-F;for(let Ne=0;Ne<H;Ne++){const rt=Ne*M-B;te[_]=rt*w,te[m]=ve*T,te[f]=k,l.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[f]=y>0?1:-1,d.push(te.x,te.y,te.z),u.push(Ne/E),u.push(1-se/A),$+=1}}for(let se=0;se<A;se++)for(let ve=0;ve<E;ve++){const Ne=h+ve+H*se,rt=h+ve+H*(se+1),Y=h+(ve+1)+H*(se+1),J=h+(ve+1)+H*se;c.push(Ne,rt,J),c.push(rt,Y,J),W+=6}a.addGroup(p,W,v),p+=W,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ve(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ar(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Wt(n){const e={};for(let t=0;t<n.length;t++){const i=Ar(n[t]);for(const r in i)e[r]=i[r]}return e}function T0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function hf(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const w0={clone:Ar,merge:Wt};var C0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,A0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends _i{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=C0,this.fragmentShader=A0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ar(e.uniforms),this.uniformsGroups=T0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ff extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Hn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new L,jd=new Ue,Zd=new Ue;class sn extends ff{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yc*2*Math.atan(Math.tan(mo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ei.x,ei.y).multiplyScalar(-e/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ei.x,ei.y).multiplyScalar(-e/ei.z)}getViewSize(e,t){return this.getViewBounds(e,jd,Zd),t.subVectors(Zd,jd)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(mo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const tr=-90,nr=1;class R0 extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new sn(tr,nr,e,t);r.layers=this.layers,this.add(r);const s=new sn(tr,nr,e,t);s.layers=this.layers,this.add(s);const o=new sn(tr,nr,e,t);o.layers=this.layers,this.add(o);const a=new sn(tr,nr,e,t);a.layers=this.layers,this.add(a);const c=new sn(tr,nr,e,t);c.layers=this.layers,this.add(c);const l=new sn(tr,nr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ro)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,d),e.setRenderTarget(u,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class pf extends Yt{constructor(e,t,i,r,s,o,a,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:Er,super(e,t,i,r,s,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class P0 extends Oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new pf(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:An}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ve(5,5,5),s=new mi({name:"CubemapFromEquirect",uniforms:Ar(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:li});s.uniforms.tEquirect.value=t;const o=new ne(r,s),a=t.minFilter;return t.minFilter===Ui&&(t.minFilter=An),new R0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Sa=new L,L0=new L,D0=new Fe;class ri{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Sa.subVectors(i,t).cross(L0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Sa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||D0.getNormalMatrix(e),r=this.coplanarPoint(Sa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new $o,Bs=new L;class Wl{constructor(e=new ri,t=new ri,i=new ri,r=new ri,s=new ri,o=new ri){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Hn){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],d=r[5],u=r[6],h=r[7],p=r[8],g=r[9],_=r[10],m=r[11],f=r[12],w=r[13],T=r[14],x=r[15];if(i[0].setComponents(c-s,h-l,m-p,x-f).normalize(),i[1].setComponents(c+s,h+l,m+p,x+f).normalize(),i[2].setComponents(c+o,h+d,m+g,x+w).normalize(),i[3].setComponents(c-o,h-d,m-g,x-w).normalize(),i[4].setComponents(c-a,h-u,m-_,x-T).normalize(),t===Hn)i[5].setComponents(c+a,h+u,m+_,x+T).normalize();else if(t===Ro)i[5].setComponents(a,u,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Bs.x=r.normal.x>0?e.max.x:e.min.x,Bs.y=r.normal.y>0?e.max.y:e.min.y,Bs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function mf(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function I0(n){const e=new WeakMap;function t(a,c){const l=a.array,d=a.usage,u=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,d),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const d=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,d);else{u.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<u.length;p++){const g=u[h],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,u[h]=_)}u.length=h+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];n.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Vn extends Zt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,d=c+1,u=e/a,h=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<d;f++){const w=f*h-o;for(let T=0;T<l;T++){const x=T*u-s;g.push(x,-w,0),_.push(0,0,1),m.push(T/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let w=0;w<a;w++){const T=w+l*f,x=w+l*(f+1),R=w+1+l*(f+1),y=w+1+l*f;p.push(T,x,y),p.push(x,R,y)}this.setIndex(p),this.setAttribute("position",new Mt(g,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.width,e.height,e.widthSegments,e.heightSegments)}}var U0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,k0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,O0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,F0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,z0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,H0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,V0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,W0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,X0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Y0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,q0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ng=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ig=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ag=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_g=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ag=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Dg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ig=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ug=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Og=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$g=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,i_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,s_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,o_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,a_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,l_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,g_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,__=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,x_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,y_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,v_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,S_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,b_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,C_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,R_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,L_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,D_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const I_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,z_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,H_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,G_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,V_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Y_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,q_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,J_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ex=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ox=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ax=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ux=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:U0,alphahash_pars_fragment:N0,alphamap_fragment:k0,alphamap_pars_fragment:O0,alphatest_fragment:F0,alphatest_pars_fragment:B0,aomap_fragment:z0,aomap_pars_fragment:H0,batching_pars_vertex:G0,batching_vertex:V0,begin_vertex:W0,beginnormal_vertex:X0,bsdfs:$0,iridescence_fragment:Y0,bumpmap_pars_fragment:q0,clipping_planes_fragment:j0,clipping_planes_pars_fragment:Z0,clipping_planes_pars_vertex:K0,clipping_planes_vertex:J0,color_fragment:Q0,color_pars_fragment:eg,color_pars_vertex:tg,color_vertex:ng,common:ig,cube_uv_reflection_fragment:rg,defaultnormal_vertex:sg,displacementmap_pars_vertex:og,displacementmap_vertex:ag,emissivemap_fragment:cg,emissivemap_pars_fragment:lg,colorspace_fragment:dg,colorspace_pars_fragment:ug,envmap_fragment:hg,envmap_common_pars_fragment:fg,envmap_pars_fragment:pg,envmap_pars_vertex:mg,envmap_physical_pars_fragment:wg,envmap_vertex:gg,fog_vertex:_g,fog_pars_vertex:xg,fog_fragment:yg,fog_pars_fragment:vg,gradientmap_pars_fragment:Sg,lightmap_pars_fragment:Mg,lights_lambert_fragment:bg,lights_lambert_pars_fragment:Eg,lights_pars_begin:Tg,lights_toon_fragment:Cg,lights_toon_pars_fragment:Ag,lights_phong_fragment:Rg,lights_phong_pars_fragment:Pg,lights_physical_fragment:Lg,lights_physical_pars_fragment:Dg,lights_fragment_begin:Ig,lights_fragment_maps:Ug,lights_fragment_end:Ng,logdepthbuf_fragment:kg,logdepthbuf_pars_fragment:Og,logdepthbuf_pars_vertex:Fg,logdepthbuf_vertex:Bg,map_fragment:zg,map_pars_fragment:Hg,map_particle_fragment:Gg,map_particle_pars_fragment:Vg,metalnessmap_fragment:Wg,metalnessmap_pars_fragment:Xg,morphinstance_vertex:$g,morphcolor_vertex:Yg,morphnormal_vertex:qg,morphtarget_pars_vertex:jg,morphtarget_vertex:Zg,normal_fragment_begin:Kg,normal_fragment_maps:Jg,normal_pars_fragment:Qg,normal_pars_vertex:e_,normal_vertex:t_,normalmap_pars_fragment:n_,clearcoat_normal_fragment_begin:i_,clearcoat_normal_fragment_maps:r_,clearcoat_pars_fragment:s_,iridescence_pars_fragment:o_,opaque_fragment:a_,packing:c_,premultiplied_alpha_fragment:l_,project_vertex:d_,dithering_fragment:u_,dithering_pars_fragment:h_,roughnessmap_fragment:f_,roughnessmap_pars_fragment:p_,shadowmap_pars_fragment:m_,shadowmap_pars_vertex:g_,shadowmap_vertex:__,shadowmask_pars_fragment:x_,skinbase_vertex:y_,skinning_pars_vertex:v_,skinning_vertex:S_,skinnormal_vertex:M_,specularmap_fragment:b_,specularmap_pars_fragment:E_,tonemapping_fragment:T_,tonemapping_pars_fragment:w_,transmission_fragment:C_,transmission_pars_fragment:A_,uv_pars_fragment:R_,uv_pars_vertex:P_,uv_vertex:L_,worldpos_vertex:D_,background_vert:I_,background_frag:U_,backgroundCube_vert:N_,backgroundCube_frag:k_,cube_vert:O_,cube_frag:F_,depth_vert:B_,depth_frag:z_,distanceRGBA_vert:H_,distanceRGBA_frag:G_,equirect_vert:V_,equirect_frag:W_,linedashed_vert:X_,linedashed_frag:$_,meshbasic_vert:Y_,meshbasic_frag:q_,meshlambert_vert:j_,meshlambert_frag:Z_,meshmatcap_vert:K_,meshmatcap_frag:J_,meshnormal_vert:Q_,meshnormal_frag:ex,meshphong_vert:tx,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:rx,meshtoon_vert:sx,meshtoon_frag:ox,points_vert:ax,points_frag:cx,shadow_vert:lx,shadow_frag:dx,sprite_vert:ux,sprite_frag:hx},ie={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Tn={basic:{uniforms:Wt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Wt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Re(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Wt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Wt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Wt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Re(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Wt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Wt([ie.points,ie.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Wt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Wt([ie.common,ie.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Wt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Wt([ie.sprite,ie.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Wt([ie.common,ie.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Wt([ie.lights,ie.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Tn.physical={uniforms:Wt([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const zs={r:0,b:0,g:0},bi=new bn,fx=new pt;function px(n,e,t,i,r,s,o){const a=new Re(0);let c=s===!0?0:1,l,d,u=null,h=0,p=null;function g(w){let T=w.isScene===!0?w.background:null;return T&&T.isTexture&&(T=(w.backgroundBlurriness>0?t:e).get(T)),T}function _(w){let T=!1;const x=g(w);x===null?f(a,c):x&&x.isColor&&(f(x,1),T=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,T){const x=g(T);x&&(x.isCubeTexture||x.mapping===Wo)?(d===void 0&&(d=new ne(new Ve(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:Ar(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,y,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),bi.copy(T.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(bi)),d.material.toneMapped=Ze.getTransfer(x.colorSpace)!==at,(u!==x||h!==x.version||p!==n.toneMapping)&&(d.material.needsUpdate=!0,u=x,h=x.version,p=n.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ne(new Vn(2,2),new mi({name:"BackgroundMaterial",uniforms:Ar(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(x.colorSpace)!==at,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||h!==x.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,h=x.version,p=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function f(w,T){w.getRGB(zs,hf(n)),i.buffers.color.setClear(zs.r,zs.g,zs.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),c=T,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,f(a,c)},render:_,addToRenderList:m}}function mx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(M,P,B,F,k){let H=!1;const O=u(F,B,P);s!==O&&(s=O,l(s.object)),H=p(M,F,B,k),H&&g(M,F,B,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,x(M,P,B,F),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function d(M){return n.deleteVertexArray(M)}function u(M,P,B){const F=B.wireframe===!0;let k=i[M.id];k===void 0&&(k={},i[M.id]=k);let H=k[P.id];H===void 0&&(H={},k[P.id]=H);let O=H[F];return O===void 0&&(O=h(c()),H[F]=O),O}function h(M){const P=[],B=[],F=[];for(let k=0;k<t;k++)P[k]=0,B[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:F,object:M,attributes:{},index:null}}function p(M,P,B,F){const k=s.attributes,H=P.attributes;let O=0;const $=B.getAttributes();for(const W in $)if($[W].location>=0){const se=k[W];let ve=H[W];if(ve===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor)),se===void 0||se.attribute!==ve||ve&&se.data!==ve.data)return!0;O++}return s.attributesNum!==O||s.index!==F}function g(M,P,B,F){const k={},H=P.attributes;let O=0;const $=B.getAttributes();for(const W in $)if($[W].location>=0){let se=H[W];se===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(se=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(se=M.instanceColor));const ve={};ve.attribute=se,se&&se.data&&(ve.data=se.data),k[W]=ve,O++}s.attributes=k,s.attributesNum=O,s.index=F}function _(){const M=s.newAttributes;for(let P=0,B=M.length;P<B;P++)M[P]=0}function m(M){f(M,0)}function f(M,P){const B=s.newAttributes,F=s.enabledAttributes,k=s.attributeDivisors;B[M]=1,F[M]===0&&(n.enableVertexAttribArray(M),F[M]=1),k[M]!==P&&(n.vertexAttribDivisor(M,P),k[M]=P)}function w(){const M=s.newAttributes,P=s.enabledAttributes;for(let B=0,F=P.length;B<F;B++)P[B]!==M[B]&&(n.disableVertexAttribArray(B),P[B]=0)}function T(M,P,B,F,k,H,O){O===!0?n.vertexAttribIPointer(M,P,B,k,H):n.vertexAttribPointer(M,P,B,F,k,H)}function x(M,P,B,F){_();const k=F.attributes,H=B.getAttributes(),O=P.defaultAttributeValues;for(const $ in H){const W=H[$];if(W.location>=0){let te=k[$];if(te===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(te=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(te=M.instanceColor)),te!==void 0){const se=te.normalized,ve=te.itemSize,Ne=e.get(te);if(Ne===void 0)continue;const rt=Ne.buffer,Y=Ne.type,J=Ne.bytesPerElement,xe=Y===n.INT||Y===n.UNSIGNED_INT||te.gpuType===Nl;if(te.isInterleavedBufferAttribute){const re=te.data,Ce=re.stride,De=te.offset;if(re.isInstancedInterleavedBuffer){for(let Ge=0;Ge<W.locationSize;Ge++)f(W.location+Ge,re.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ge=0;Ge<W.locationSize;Ge++)m(W.location+Ge);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let Ge=0;Ge<W.locationSize;Ge++)T(W.location+Ge,ve/W.locationSize,Y,se,Ce*J,(De+ve/W.locationSize*Ge)*J,xe)}else{if(te.isInstancedBufferAttribute){for(let re=0;re<W.locationSize;re++)f(W.location+re,te.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let re=0;re<W.locationSize;re++)m(W.location+re);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let re=0;re<W.locationSize;re++)T(W.location+re,ve/W.locationSize,Y,se,ve*J,ve/W.locationSize*re*J,xe)}}else if(O!==void 0){const se=O[$];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(W.location,se);break;case 3:n.vertexAttrib3fv(W.location,se);break;case 4:n.vertexAttrib4fv(W.location,se);break;default:n.vertexAttrib1fv(W.location,se)}}}}w()}function R(){A();for(const M in i){const P=i[M];for(const B in P){const F=P[B];for(const k in F)d(F[k].object),delete F[k];delete P[B]}delete i[M]}}function y(M){if(i[M.id]===void 0)return;const P=i[M.id];for(const B in P){const F=P[B];for(const k in F)d(F[k].object),delete F[k];delete P[B]}delete i[M.id]}function E(M){for(const P in i){const B=i[P];if(B[M.id]===void 0)continue;const F=B[M.id];for(const k in F)d(F[k].object),delete F[k];delete B[M.id]}}function A(){v(),o=!0,s!==r&&(s=r,l(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:A,resetDefaultState:v,dispose:R,releaseStatesOfGeometry:y,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function gx(n,e,t){let i;function r(l){i=l}function s(l,d){n.drawArrays(i,l,d),t.update(d,i,1)}function o(l,d,u){u!==0&&(n.drawArraysInstanced(i,l,d,u),t.update(d,i,u))}function a(l,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,u);let p=0;for(let g=0;g<u;g++)p+=d[g];t.update(p,i,1)}function c(l,d,u,h){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],d[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*h[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function _x(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(E){return!(E!==vn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const A=E===_s&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Xn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==zn&&!A)}function c(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const u=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,y=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:R,maxSamples:y}}function xx(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new ri,a=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||i!==0||r;return r=h,i=u.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?d(null):l();else{const w=s?0:i,T=w*4;let x=f.clippingState||null;c.value=x,x=d(g,h,T,p);for(let R=0;R!==T;++R)x[R]=t[R];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,w=h.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,x=p;T!==_;++T,x+=4)o.copy(u[T]).applyMatrix4(w,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function yx(n){let e=new WeakMap;function t(o,a){return a===gc?o.mapping=Er:a===_c&&(o.mapping=Tr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===gc||a===_c)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new P0(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class gf extends ff{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const dr=4,Kd=[.125,.215,.35,.446,.526,.582],Ci=20,Ma=new gf,Jd=new Re;let ba=null,Ea=0,Ta=0,wa=!1;const Ti=(1+Math.sqrt(5))/2,ir=1/Ti,Qd=[new L(-Ti,ir,0),new L(Ti,ir,0),new L(-ir,0,Ti),new L(ir,0,Ti),new L(0,Ti,-ir),new L(0,Ti,ir),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class qc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){ba=this._renderer.getRenderTarget(),Ea=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ba,Ea,Ta),this._renderer.xr.enabled=wa,e.scissorTest=!1,Hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Er||e.mapping===Tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ba=this._renderer.getRenderTarget(),Ea=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:An,minFilter:An,generateMipmaps:!1,type:_s,format:vn,colorSpace:Dr,depthBuffer:!1},r=eu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eu(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vx(s)),this._blurMaterial=Sx(s,e,t)}return r}_compileMaterial(e){const t=new ne(this._lodPlanes[0],e);this._renderer.compile(t,Ma)}_sceneToCubeUV(e,t,i,r){const a=new sn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(Jd),d.toneMapping=di,d.autoClear=!1;const p=new Yo({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),g=new ne(new Ve,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Jd),_=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):w===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const T=this._cubeSize;Hs(r,w*T,f>2?T:0,T,T),d.setRenderTarget(r),_&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Er||e.mapping===Tr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=nu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ne(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Hs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Ma)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Qd[(r-s-1)%Qd.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new ne(this._lodPlanes[r],l),h=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ci-1),_=s/g,m=isFinite(s)?1+Math.floor(d*_):Ci;m>Ci&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ci}`);const f=[];let w=0;for(let E=0;E<Ci;++E){const A=E/_,v=Math.exp(-A*A/2);f.push(v),E===0?w+=v:E<m&&(w+=2*v)}for(let E=0;E<f.length;E++)f[E]=f[E]/w;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-i;const x=this._sizeLods[r],R=3*x*(r>T-dr?r-T+dr:0),y=4*(this._cubeSize-x);Hs(t,R,y,3*x,2*x),c.setRenderTarget(t),c.render(u,Ma)}}function vx(n){const e=[],t=[],i=[];let r=n;const s=n-dr+1+Kd.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>n-dr?c=Kd[o-n+dr-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),d=-l,u=1+l,h=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,g=6,_=3,m=2,f=1,w=new Float32Array(_*g*p),T=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let y=0;y<p;y++){const E=y%3*2/3-1,A=y>2?0:-1,v=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];w.set(v,_*g*y),T.set(h,m*g*y);const M=[y,y,y,y,y,y];x.set(M,f*g*y)}const R=new Zt;R.setAttribute("position",new fn(w,_)),R.setAttribute("uv",new fn(T,m)),R.setAttribute("faceIndex",new fn(x,f)),e.push(R),r>dr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function eu(n,e,t){const i=new Oi(n,e,t);return i.texture.mapping=Wo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Sx(n,e,t){const i=new Float32Array(Ci),r=new L(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:Ci,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function tu(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function nu(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Xl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Mx(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===gc||c===_c,d=c===Er||c===Tr;if(l||d){let u=e.get(a);const h=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new qc(n)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||d&&p&&r(p)?(t===null&&(t=new qc(n)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let c=0;const l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function bx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ts("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Ex(n,e,t,i){const r={},s=new WeakMap;function o(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(u,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function c(u){const h=u.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],n.ARRAY_BUFFER)}}function l(u){const h=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const w=p.array;_=p.version;for(let T=0,x=w.length;T<x;T+=3){const R=w[T+0],y=w[T+1],E=w[T+2];h.push(R,y,y,E,E,R)}}else if(g!==void 0){const w=g.array;_=g.version;for(let T=0,x=w.length/3-1;T<x;T+=3){const R=T+0,y=T+1,E=T+2;h.push(R,y,y,E,E,R)}}else return;const m=new(of(h)?uf:df)(h,1);m.version=_;const f=s.get(u);f&&e.remove(f),s.set(u,m)}function d(u){const h=s.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:d}}function Tx(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function c(h,p){n.drawElements(i,p,s,h*o),t.update(p,i,1)}function l(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*o,g),t.update(p,i,g))}function d(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function u(h,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,_,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*_[w];t.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function wx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Cx(n,e,t){const i=new WeakMap,r=new lt;function s(o,a,c){const l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(a);if(h===void 0||h.count!==u){let M=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let R=a.attributes.position.count*x,y=1;R>e.maxTextureSize&&(y=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const E=new Float32Array(R*y*4*u),A=new cf(E,R,y,u);A.type=zn,A.needsUpdate=!0;const v=x*4;for(let P=0;P<u;P++){const B=f[P],F=w[P],k=T[P],H=R*y*4*P;for(let O=0;O<B.count;O++){const $=O*v;g===!0&&(r.fromBufferAttribute(B,O),E[H+$+0]=r.x,E[H+$+1]=r.y,E[H+$+2]=r.z,E[H+$+3]=0),_===!0&&(r.fromBufferAttribute(F,O),E[H+$+4]=r.x,E[H+$+5]=r.y,E[H+$+6]=r.z,E[H+$+7]=0),m===!0&&(r.fromBufferAttribute(k,O),E[H+$+8]=r.x,E[H+$+9]=r.y,E[H+$+10]=r.z,E[H+$+11]=k.itemSize===4?r.w:1)}}h={count:u,texture:A,size:new Ue(R,y)},i.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Ax(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==l&&(e.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return u}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class _f extends Yt{constructor(e,t,i,r,s,o,a,c,l,d=_r){if(d!==_r&&d!==Cr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===_r&&(i=ki),i===void 0&&d===Cr&&(i=wr),super(null,r,s,o,a,c,d,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Sn,this.minFilter=c!==void 0?c:Sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const xf=new Yt,iu=new _f(1,1),yf=new cf,vf=new p0,Sf=new pf,ru=[],su=[],ou=new Float32Array(16),au=new Float32Array(9),cu=new Float32Array(4);function Nr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ru[r];if(s===void 0&&(s=new Float32Array(r),ru[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Dt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function qo(n,e){let t=su[e];t===void 0&&(t=new Int32Array(e),su[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Rx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Px(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),Dt(t,e)}}function Lx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),Dt(t,e)}}function Dx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),Dt(t,e)}}function Ix(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;cu.set(i),n.uniformMatrix2fv(this.addr,!1,cu),Dt(t,i)}}function Ux(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;au.set(i),n.uniformMatrix3fv(this.addr,!1,au),Dt(t,i)}}function Nx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;ou.set(i),n.uniformMatrix4fv(this.addr,!1,ou),Dt(t,i)}}function kx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ox(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),Dt(t,e)}}function Fx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),Dt(t,e)}}function Bx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),Dt(t,e)}}function zx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Hx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),Dt(t,e)}}function Gx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),Dt(t,e)}}function Vx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),Dt(t,e)}}function Wx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(iu.compareFunction=sf,s=iu):s=xf,t.setTexture2D(e||s,r)}function Xx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||vf,r)}function $x(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Sf,r)}function Yx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||yf,r)}function qx(n){switch(n){case 5126:return Rx;case 35664:return Px;case 35665:return Lx;case 35666:return Dx;case 35674:return Ix;case 35675:return Ux;case 35676:return Nx;case 5124:case 35670:return kx;case 35667:case 35671:return Ox;case 35668:case 35672:return Fx;case 35669:case 35673:return Bx;case 5125:return zx;case 36294:return Hx;case 36295:return Gx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Wx;case 35679:case 36299:case 36307:return Xx;case 35680:case 36300:case 36308:case 36293:return $x;case 36289:case 36303:case 36311:case 36292:return Yx}}function jx(n,e){n.uniform1fv(this.addr,e)}function Zx(n,e){const t=Nr(e,this.size,2);n.uniform2fv(this.addr,t)}function Kx(n,e){const t=Nr(e,this.size,3);n.uniform3fv(this.addr,t)}function Jx(n,e){const t=Nr(e,this.size,4);n.uniform4fv(this.addr,t)}function Qx(n,e){const t=Nr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ey(n,e){const t=Nr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ty(n,e){const t=Nr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ny(n,e){n.uniform1iv(this.addr,e)}function iy(n,e){n.uniform2iv(this.addr,e)}function ry(n,e){n.uniform3iv(this.addr,e)}function sy(n,e){n.uniform4iv(this.addr,e)}function oy(n,e){n.uniform1uiv(this.addr,e)}function ay(n,e){n.uniform2uiv(this.addr,e)}function cy(n,e){n.uniform3uiv(this.addr,e)}function ly(n,e){n.uniform4uiv(this.addr,e)}function dy(n,e,t){const i=this.cache,r=e.length,s=qo(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||xf,s[o])}function uy(n,e,t){const i=this.cache,r=e.length,s=qo(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||vf,s[o])}function hy(n,e,t){const i=this.cache,r=e.length,s=qo(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Sf,s[o])}function fy(n,e,t){const i=this.cache,r=e.length,s=qo(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||yf,s[o])}function py(n){switch(n){case 5126:return jx;case 35664:return Zx;case 35665:return Kx;case 35666:return Jx;case 35674:return Qx;case 35675:return ey;case 35676:return ty;case 5124:case 35670:return ny;case 35667:case 35671:return iy;case 35668:case 35672:return ry;case 35669:case 35673:return sy;case 5125:return oy;case 36294:return ay;case 36295:return cy;case 36296:return ly;case 35678:case 36198:case 36298:case 36306:case 35682:return dy;case 35679:case 36299:case 36307:return uy;case 35680:case 36300:case 36308:case 36293:return hy;case 36289:case 36303:case 36311:case 36292:return fy}}class my{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=qx(t.type)}}class gy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=py(t.type)}}class _y{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Ca=/(\w+)(\])?(\[|\.)?/g;function lu(n,e){n.seq.push(e),n.map[e.id]=e}function xy(n,e,t){const i=n.name,r=i.length;for(Ca.lastIndex=0;;){const s=Ca.exec(i),o=Ca.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){lu(t,l===void 0?new my(a,n,e):new gy(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new _y(a),lu(t,u)),t=u}}}class go{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);xy(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function du(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const yy=37297;let vy=0;function Sy(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const uu=new Fe;function My(n){Ze._getMatrix(uu,Ze.workingColorSpace,n);const e=`mat3( ${uu.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(n)){case Xo:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function hu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Sy(n.getShaderSource(e),o)}else return r}function by(n,e){const t=My(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ey(n,e){let t;switch(e){case $h:t="Linear";break;case Gm:t="Reinhard";break;case Vm:t="Cineon";break;case Wm:t="ACESFilmic";break;case $m:t="AgX";break;case Ym:t="Neutral";break;case Xm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gs=new L;function Ty(){Ze.getLuminanceCoefficients(Gs);const n=Gs.x.toFixed(4),e=Gs.y.toFixed(4),t=Gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ns).join(`
`)}function Cy(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ay(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function ns(n){return n!==""}function fu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ry=/^[ \t]*#include +<([\w\d./]+)>/gm;function jc(n){return n.replace(Ry,Ly)}const Py=new Map;function Ly(n,e){let t=He[e];if(t===void 0){const i=Py.get(e);if(i!==void 0)t=He[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return jc(t)}const Dy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mu(n){return n.replace(Dy,Iy)}function Iy(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function gu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Uy(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Wh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Xh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Fn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ny(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Er:case Tr:e="ENVMAP_TYPE_CUBE";break;case Wo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ky(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Tr:e="ENVMAP_MODE_REFRACTION";break}return e}function Oy(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ul:e="ENVMAP_BLENDING_MULTIPLY";break;case zm:e="ENVMAP_BLENDING_MIX";break;case Hm:e="ENVMAP_BLENDING_ADD";break}return e}function Fy(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function By(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Uy(t),l=Ny(t),d=ky(t),u=Oy(t),h=Fy(t),p=wy(t),g=Cy(s),_=r.createProgram();let m,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ns).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ns).join(`
`),f.length>0&&(f+=`
`)):(m=[gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ns).join(`
`),f=[gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==di?"#define TONE_MAPPING":"",t.toneMapping!==di?He.tonemapping_pars_fragment:"",t.toneMapping!==di?Ey("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,by("linearToOutputTexel",t.outputColorSpace),Ty(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ns).join(`
`)),o=jc(o),o=fu(o,t),o=pu(o,t),a=jc(a),a=fu(a,t),a=pu(a,t),o=mu(o),a=mu(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Pd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=w+m+o,x=w+f+a,R=du(r,r.VERTEX_SHADER,T),y=du(r,r.FRAGMENT_SHADER,x);r.attachShader(_,R),r.attachShader(_,y),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function E(P){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(R).trim(),k=r.getShaderInfoLog(y).trim();let H=!0,O=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,R,y);else{const $=hu(r,R,"vertex"),W=hu(r,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+$+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||k==="")&&(O=!1);O&&(P.diagnostics={runnable:H,programLog:B,vertexShader:{log:F,prefix:m},fragmentShader:{log:k,prefix:f}})}r.deleteShader(R),r.deleteShader(y),A=new go(r,_),v=Ay(r,_)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let v;this.getAttributes=function(){return v===void 0&&E(this),v};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,yy)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=y,this}let zy=0;class Hy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Gy(e),t.set(e,i)),i}}class Gy{constructor(e){this.id=zy++,this.code=e,this.usedTimes=0}}function Vy(n,e,t,i,r,s,o){const a=new Vl,c=new Hy,l=new Set,d=[],u=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,M,P,B,F){const k=B.fog,H=F.geometry,O=v.isMeshStandardMaterial?B.environment:null,$=(v.isMeshStandardMaterial?t:e).get(v.envMap||O),W=$&&$.mapping===Wo?$.image.height:null,te=g[v.type];v.precision!==null&&(p=r.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const se=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ve=se!==void 0?se.length:0;let Ne=0;H.morphAttributes.position!==void 0&&(Ne=1),H.morphAttributes.normal!==void 0&&(Ne=2),H.morphAttributes.color!==void 0&&(Ne=3);let rt,Y,J,xe;if(te){const st=Tn[te];rt=st.vertexShader,Y=st.fragmentShader}else rt=v.vertexShader,Y=v.fragmentShader,c.update(v),J=c.getVertexShaderID(v),xe=c.getFragmentShaderID(v);const re=n.getRenderTarget(),Ce=n.state.buffers.depth.getReversed(),De=F.isInstancedMesh===!0,Ge=F.isBatchedMesh===!0,Qe=!!v.map,Be=!!v.matcap,bt=!!$,N=!!v.aoMap,ln=!!v.lightMap,Xe=!!v.bumpMap,$e=!!v.normalMap,Ae=!!v.displacementMap,mt=!!v.emissiveMap,we=!!v.metalnessMap,C=!!v.roughnessMap,S=v.anisotropy>0,z=v.clearcoat>0,j=v.dispersion>0,K=v.iridescence>0,q=v.sheen>0,Ee=v.transmission>0,ae=S&&!!v.anisotropyMap,he=z&&!!v.clearcoatMap,qe=z&&!!v.clearcoatNormalMap,Q=z&&!!v.clearcoatRoughnessMap,pe=K&&!!v.iridescenceMap,Pe=K&&!!v.iridescenceThicknessMap,Le=q&&!!v.sheenColorMap,me=q&&!!v.sheenRoughnessMap,Ye=!!v.specularMap,ze=!!v.specularColorMap,dt=!!v.specularIntensityMap,D=Ee&&!!v.transmissionMap,oe=Ee&&!!v.thicknessMap,X=!!v.gradientMap,Z=!!v.alphaMap,de=v.alphaTest>0,ce=!!v.alphaHash,ke=!!v.extensions;let vt=di;v.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(vt=n.toneMapping);const kt={shaderID:te,shaderType:v.type,shaderName:v.name,vertexShader:rt,fragmentShader:Y,defines:v.defines,customVertexShaderID:J,customFragmentShaderID:xe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:Ge,batchingColor:Ge&&F._colorsTexture!==null,instancing:De,instancingColor:De&&F.instanceColor!==null,instancingMorph:De&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Dr,alphaToCoverage:!!v.alphaToCoverage,map:Qe,matcap:Be,envMap:bt,envMapMode:bt&&$.mapping,envMapCubeUVHeight:W,aoMap:N,lightMap:ln,bumpMap:Xe,normalMap:$e,displacementMap:h&&Ae,emissiveMap:mt,normalMapObjectSpace:$e&&v.normalMapType===Km,normalMapTangentSpace:$e&&v.normalMapType===Hl,metalnessMap:we,roughnessMap:C,anisotropy:S,anisotropyMap:ae,clearcoat:z,clearcoatMap:he,clearcoatNormalMap:qe,clearcoatRoughnessMap:Q,dispersion:j,iridescence:K,iridescenceMap:pe,iridescenceThicknessMap:Pe,sheen:q,sheenColorMap:Le,sheenRoughnessMap:me,specularMap:Ye,specularColorMap:ze,specularIntensityMap:dt,transmission:Ee,transmissionMap:D,thicknessMap:oe,gradientMap:X,opaque:v.transparent===!1&&v.blending===gr&&v.alphaToCoverage===!1,alphaMap:Z,alphaTest:de,alphaHash:ce,combine:v.combine,mapUv:Qe&&_(v.map.channel),aoMapUv:N&&_(v.aoMap.channel),lightMapUv:ln&&_(v.lightMap.channel),bumpMapUv:Xe&&_(v.bumpMap.channel),normalMapUv:$e&&_(v.normalMap.channel),displacementMapUv:Ae&&_(v.displacementMap.channel),emissiveMapUv:mt&&_(v.emissiveMap.channel),metalnessMapUv:we&&_(v.metalnessMap.channel),roughnessMapUv:C&&_(v.roughnessMap.channel),anisotropyMapUv:ae&&_(v.anisotropyMap.channel),clearcoatMapUv:he&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:qe&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(v.sheenRoughnessMap.channel),specularMapUv:Ye&&_(v.specularMap.channel),specularColorMapUv:ze&&_(v.specularColorMap.channel),specularIntensityMapUv:dt&&_(v.specularIntensityMap.channel),transmissionMapUv:D&&_(v.transmissionMap.channel),thicknessMapUv:oe&&_(v.thicknessMap.channel),alphaMapUv:Z&&_(v.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&($e||S),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!H.attributes.uv&&(Qe||Z),fog:!!k,useFog:v.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ce,skinning:F.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ne,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:vt,decodeVideoTexture:Qe&&v.map.isVideoTexture===!0&&Ze.getTransfer(v.map.colorSpace)===at,decodeVideoTextureEmissive:mt&&v.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(v.emissiveMap.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===wn,flipSided:v.side===$t,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ke&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&v.extensions.multiDraw===!0||Ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return kt.vertexUv1s=l.has(1),kt.vertexUv2s=l.has(2),kt.vertexUv3s=l.has(3),l.clear(),kt}function f(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)M.push(P),M.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(w(M,v),T(M,v),M.push(n.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function w(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function T(v,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),v.push(a.mask)}function x(v){const M=g[v.type];let P;if(M){const B=Tn[M];P=w0.clone(B.uniforms)}else P=v.uniforms;return P}function R(v,M){let P;for(let B=0,F=d.length;B<F;B++){const k=d[B];if(k.cacheKey===M){P=k,++P.usedTimes;break}}return P===void 0&&(P=new By(n,M,v,s),d.push(P)),P}function y(v){if(--v.usedTimes===0){const M=d.indexOf(v);d[M]=d[d.length-1],d.pop(),v.destroy()}}function E(v){c.remove(v)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:R,releaseProgram:y,releaseShaderCache:E,programs:d,dispose:A}}function Wy(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Xy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function _u(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function xu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u,h,p,g,_,m){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:h,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[e]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,h,p,g,_,m){const f=o(u,h,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(u,h,p,g,_,m){const f=o(u,h,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(u,h){t.length>1&&t.sort(u||Xy),i.length>1&&i.sort(h||_u),r.length>1&&r.sort(h||_u)}function d(){for(let u=e,h=n.length;u<h;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:d,sort:l}}function $y(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new xu,n.set(i,[o])):r>=s.length?(o=new xu,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Yy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Re};break;case"SpotLight":t={position:new L,direction:new L,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function qy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let jy=0;function Zy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Ky(n){const e=new Yy,t=qy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new L);const r=new L,s=new pt,o=new pt;function a(l){let d=0,u=0,h=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,w=0,T=0,x=0,R=0,y=0,E=0;l.sort(Zy);for(let v=0,M=l.length;v<M;v++){const P=l[v],B=P.color,F=P.intensity,k=P.distance,H=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=B.r*F,u+=B.g*F,h+=B.b*F;else if(P.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(P.sh.coefficients[O],F);E++}else if(P.isDirectionalLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,W=t.get(P);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,i.directionalShadow[p]=W,i.directionalShadowMap[p]=H,i.directionalShadowMatrix[p]=P.shadow.matrix,w++}i.directional[p]=O,p++}else if(P.isSpotLight){const O=e.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(B).multiplyScalar(F),O.distance=k,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,i.spot[_]=O;const $=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,$.updateMatrices(P),P.castShadow&&y++),i.spotLightMatrix[_]=$.matrix,P.castShadow){const W=t.get(P);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,i.spotShadow[_]=W,i.spotShadowMap[_]=H,x++}_++}else if(P.isRectAreaLight){const O=e.get(P);O.color.copy(B).multiplyScalar(F),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=O,m++}else if(P.isPointLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),O.distance=P.distance,O.decay=P.decay,P.castShadow){const $=P.shadow,W=t.get(P);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,W.shadowCameraNear=$.camera.near,W.shadowCameraFar=$.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=H,i.pointShadowMatrix[g]=P.shadow.matrix,T++}i.point[g]=O,g++}else if(P.isHemisphereLight){const O=e.get(P);O.skyColor.copy(P.color).multiplyScalar(F),O.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[f]=O,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const A=i.hash;(A.directionalLength!==p||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==f||A.numDirectionalShadows!==w||A.numPointShadows!==T||A.numSpotShadows!==x||A.numSpotMaps!==R||A.numLightProbes!==E)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=x+R-y,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=E,A.directionalLength=p,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=f,A.numDirectionalShadows=w,A.numPointShadows=T,A.numSpotShadows=x,A.numSpotMaps=R,A.numLightProbes=E,i.version=jy++)}function c(l,d){let u=0,h=0,p=0,g=0,_=0;const m=d.matrixWorldInverse;for(let f=0,w=l.length;f<w;f++){const T=l[f];if(T.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),u++}else if(T.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(T.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const x=i.point[h];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),h++}else if(T.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function yu(n){const e=new Ky(n),t=[],i=[];function r(d){l.camera=d,t.length=0,i.length=0}function s(d){t.push(d)}function o(d){i.push(d)}function a(){e.setup(t)}function c(d){e.setupView(t,d)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Jy(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new yu(n),e.set(r,[a])):s>=o.length?(a=new yu(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class Qy extends _i{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=jm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ev extends _i{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function iv(n,e,t){let i=new Wl;const r=new Ue,s=new Ue,o=new lt,a=new Qy({depthPacking:Zm}),c=new ev,l={},d=t.maxTextureSize,u={[pi]:$t,[$t]:pi,[wn]:wn},h=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:tv,fragmentShader:nv}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Zt;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ne(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wh;let f=this.type;this.render=function(y,E,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const v=n.getRenderTarget(),M=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),B=n.state;B.setBlending(li),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=f!==Fn&&this.type===Fn,k=f===Fn&&this.type!==Fn;for(let H=0,O=y.length;H<O;H++){const $=y[H],W=$.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const te=W.getFrameExtents();if(r.multiply(te),s.copy(W.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/te.x),r.x=s.x*te.x,W.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/te.y),r.y=s.y*te.y,W.mapSize.y=s.y)),W.map===null||F===!0||k===!0){const ve=this.type!==Fn?{minFilter:Sn,magFilter:Sn}:{};W.map!==null&&W.map.dispose(),W.map=new Oi(r.x,r.y,ve),W.map.texture.name=$.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();const se=W.getViewportCount();for(let ve=0;ve<se;ve++){const Ne=W.getViewport(ve);o.set(s.x*Ne.x,s.y*Ne.y,s.x*Ne.z,s.y*Ne.w),B.viewport(o),W.updateMatrices($,ve),i=W.getFrustum(),x(E,A,W.camera,$,this.type)}W.isPointLightShadow!==!0&&this.type===Fn&&w(W,A),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(v,M,P)};function w(y,E){const A=e.update(_);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Oi(r.x,r.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(E,null,A,h,_,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(E,null,A,p,_,null)}function T(y,E,A,v){let M=null;const P=A.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(P!==void 0)M=P;else if(M=A.isPointLight===!0?c:a,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const B=M.uuid,F=E.uuid;let k=l[B];k===void 0&&(k={},l[B]=k);let H=k[F];H===void 0&&(H=M.clone(),k[F]=H,E.addEventListener("dispose",R)),M=H}if(M.visible=E.visible,M.wireframe=E.wireframe,v===Fn?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:u[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,A.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=n.properties.get(M);B.light=A}return M}function x(y,E,A,v,M){if(y.visible===!1)return;if(y.layers.test(E.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===Fn)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,y.matrixWorld);const F=e.update(y),k=y.material;if(Array.isArray(k)){const H=F.groups;for(let O=0,$=H.length;O<$;O++){const W=H[O],te=k[W.materialIndex];if(te&&te.visible){const se=T(y,te,v,M);y.onBeforeShadow(n,y,E,A,F,se,W),n.renderBufferDirect(A,null,F,se,y,W),y.onAfterShadow(n,y,E,A,F,se,W)}}}else if(k.visible){const H=T(y,k,v,M);y.onBeforeShadow(n,y,E,A,F,H,null),n.renderBufferDirect(A,null,F,H,y,null),y.onAfterShadow(n,y,E,A,F,H,null)}}const B=y.children;for(let F=0,k=B.length;F<k;F++)x(B[F],E,A,v,M)}function R(y){y.target.removeEventListener("dispose",R);for(const A in l){const v=l[A],M=y.target.uuid;M in v&&(v[M].dispose(),delete v[M])}}}const rv={[lc]:dc,[uc]:pc,[hc]:mc,[br]:fc,[dc]:lc,[pc]:uc,[mc]:hc,[fc]:br};function sv(n,e){function t(){let D=!1;const oe=new lt;let X=null;const Z=new lt(0,0,0,0);return{setMask:function(de){X!==de&&!D&&(n.colorMask(de,de,de,de),X=de)},setLocked:function(de){D=de},setClear:function(de,ce,ke,vt,kt){kt===!0&&(de*=vt,ce*=vt,ke*=vt),oe.set(de,ce,ke,vt),Z.equals(oe)===!1&&(n.clearColor(de,ce,ke,vt),Z.copy(oe))},reset:function(){D=!1,X=null,Z.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,X=null,Z=null,de=null;return{setReversed:function(ce){if(oe!==ce){const ke=e.get("EXT_clip_control");oe?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT);const vt=de;de=null,this.setClear(vt)}oe=ce},getReversed:function(){return oe},setTest:function(ce){ce?re(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(ce){X!==ce&&!D&&(n.depthMask(ce),X=ce)},setFunc:function(ce){if(oe&&(ce=rv[ce]),Z!==ce){switch(ce){case lc:n.depthFunc(n.NEVER);break;case dc:n.depthFunc(n.ALWAYS);break;case uc:n.depthFunc(n.LESS);break;case br:n.depthFunc(n.LEQUAL);break;case hc:n.depthFunc(n.EQUAL);break;case fc:n.depthFunc(n.GEQUAL);break;case pc:n.depthFunc(n.GREATER);break;case mc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=ce}},setLocked:function(ce){D=ce},setClear:function(ce){de!==ce&&(oe&&(ce=1-ce),n.clearDepth(ce),de=ce)},reset:function(){D=!1,X=null,Z=null,de=null,oe=!1}}}function r(){let D=!1,oe=null,X=null,Z=null,de=null,ce=null,ke=null,vt=null,kt=null;return{setTest:function(st){D||(st?re(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(st){oe!==st&&!D&&(n.stencilMask(st),oe=st)},setFunc:function(st,pn,Ln){(X!==st||Z!==pn||de!==Ln)&&(n.stencilFunc(st,pn,Ln),X=st,Z=pn,de=Ln)},setOp:function(st,pn,Ln){(ce!==st||ke!==pn||vt!==Ln)&&(n.stencilOp(st,pn,Ln),ce=st,ke=pn,vt=Ln)},setLocked:function(st){D=st},setClear:function(st){kt!==st&&(n.clearStencil(st),kt=st)},reset:function(){D=!1,oe=null,X=null,Z=null,de=null,ce=null,ke=null,vt=null,kt=null}}}const s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let d={},u={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,T=null,x=null,R=null,y=null,E=new Re(0,0,0),A=0,v=!1,M=null,P=null,B=null,F=null,k=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,$=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(W)[1]),O=$>=1):W.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),O=$>=2);let te=null,se={};const ve=n.getParameter(n.SCISSOR_BOX),Ne=n.getParameter(n.VIEWPORT),rt=new lt().fromArray(ve),Y=new lt().fromArray(Ne);function J(D,oe,X,Z){const de=new Uint8Array(4),ce=n.createTexture();n.bindTexture(D,ce),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<X;ke++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,de):n.texImage2D(oe+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,de);return ce}const xe={};xe[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),xe[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xe[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(n.DEPTH_TEST),o.setFunc(br),Xe(!1),$e(Td),re(n.CULL_FACE),N(li);function re(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function Ce(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function De(D,oe){return u[D]!==oe?(n.bindFramebuffer(D,oe),u[D]=oe,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ge(D,oe){let X=p,Z=!1;if(D){X=h.get(oe),X===void 0&&(X=[],h.set(oe,X));const de=D.textures;if(X.length!==de.length||X[0]!==n.COLOR_ATTACHMENT0){for(let ce=0,ke=de.length;ce<ke;ce++)X[ce]=n.COLOR_ATTACHMENT0+ce;X.length=de.length,Z=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,Z=!0);Z&&n.drawBuffers(X)}function Qe(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const Be={[wi]:n.FUNC_ADD,[bm]:n.FUNC_SUBTRACT,[Em]:n.FUNC_REVERSE_SUBTRACT};Be[Tm]=n.MIN,Be[wm]=n.MAX;const bt={[Cm]:n.ZERO,[Am]:n.ONE,[Rm]:n.SRC_COLOR,[ac]:n.SRC_ALPHA,[Nm]:n.SRC_ALPHA_SATURATE,[Im]:n.DST_COLOR,[Lm]:n.DST_ALPHA,[Pm]:n.ONE_MINUS_SRC_COLOR,[cc]:n.ONE_MINUS_SRC_ALPHA,[Um]:n.ONE_MINUS_DST_COLOR,[Dm]:n.ONE_MINUS_DST_ALPHA,[km]:n.CONSTANT_COLOR,[Om]:n.ONE_MINUS_CONSTANT_COLOR,[Fm]:n.CONSTANT_ALPHA,[Bm]:n.ONE_MINUS_CONSTANT_ALPHA};function N(D,oe,X,Z,de,ce,ke,vt,kt,st){if(D===li){_===!0&&(Ce(n.BLEND),_=!1);return}if(_===!1&&(re(n.BLEND),_=!0),D!==Mm){if(D!==m||st!==v){if((f!==wi||x!==wi)&&(n.blendEquation(n.FUNC_ADD),f=wi,x=wi),st)switch(D){case gr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wd:n.blendFunc(n.ONE,n.ONE);break;case Cd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ad:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case gr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wd:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Cd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ad:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,T=null,R=null,y=null,E.set(0,0,0),A=0,m=D,v=st}return}de=de||oe,ce=ce||X,ke=ke||Z,(oe!==f||de!==x)&&(n.blendEquationSeparate(Be[oe],Be[de]),f=oe,x=de),(X!==w||Z!==T||ce!==R||ke!==y)&&(n.blendFuncSeparate(bt[X],bt[Z],bt[ce],bt[ke]),w=X,T=Z,R=ce,y=ke),(vt.equals(E)===!1||kt!==A)&&(n.blendColor(vt.r,vt.g,vt.b,kt),E.copy(vt),A=kt),m=D,v=!1}function ln(D,oe){D.side===wn?Ce(n.CULL_FACE):re(n.CULL_FACE);let X=D.side===$t;oe&&(X=!X),Xe(X),D.blending===gr&&D.transparent===!1?N(li):N(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const Z=D.stencilWrite;a.setTest(Z),Z&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),mt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(D){M!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),M=D)}function $e(D){D!==vm?(re(n.CULL_FACE),D!==P&&(D===Td?n.cullFace(n.BACK):D===Sm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),P=D}function Ae(D){D!==B&&(O&&n.lineWidth(D),B=D)}function mt(D,oe,X){D?(re(n.POLYGON_OFFSET_FILL),(F!==oe||k!==X)&&(n.polygonOffset(oe,X),F=oe,k=X)):Ce(n.POLYGON_OFFSET_FILL)}function we(D){D?re(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function C(D){D===void 0&&(D=n.TEXTURE0+H-1),te!==D&&(n.activeTexture(D),te=D)}function S(D,oe,X){X===void 0&&(te===null?X=n.TEXTURE0+H-1:X=te);let Z=se[X];Z===void 0&&(Z={type:void 0,texture:void 0},se[X]=Z),(Z.type!==D||Z.texture!==oe)&&(te!==X&&(n.activeTexture(X),te=X),n.bindTexture(D,oe||xe[D]),Z.type=D,Z.texture=oe)}function z(){const D=se[te];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ee(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function qe(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pe(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(D){rt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),rt.copy(D))}function me(D){Y.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Y.copy(D))}function Ye(D,oe){let X=l.get(oe);X===void 0&&(X=new WeakMap,l.set(oe,X));let Z=X.get(D);Z===void 0&&(Z=n.getUniformBlockIndex(oe,D.name),X.set(D,Z))}function ze(D,oe){const Z=l.get(oe).get(D);c.get(oe)!==Z&&(n.uniformBlockBinding(oe,Z,D.__bindingPointIndex),c.set(oe,Z))}function dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},te=null,se={},u={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,T=null,x=null,R=null,y=null,E=new Re(0,0,0),A=0,v=!1,M=null,P=null,B=null,F=null,k=null,rt.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Ce,bindFramebuffer:De,drawBuffers:Ge,useProgram:Qe,setBlending:N,setMaterial:ln,setFlipSided:Xe,setCullFace:$e,setLineWidth:Ae,setPolygonOffset:mt,setScissorTest:we,activeTexture:C,bindTexture:S,unbindTexture:z,compressedTexImage2D:j,compressedTexImage3D:K,texImage2D:pe,texImage3D:Pe,updateUBOMapping:Ye,uniformBlockBinding:ze,texStorage2D:qe,texStorage3D:Q,texSubImage2D:q,texSubImage3D:Ee,compressedTexSubImage2D:ae,compressedTexSubImage3D:he,scissor:Le,viewport:me,reset:dt}}function vu(n,e,t,i){const r=ov(i);switch(t){case Kh:return n*e;case Qh:return n*e;case ef:return n*e*2;case tf:return n*e/r.components*r.byteLength;case Fl:return n*e/r.components*r.byteLength;case nf:return n*e*2/r.components*r.byteLength;case Bl:return n*e*2/r.components*r.byteLength;case Jh:return n*e*3/r.components*r.byteLength;case vn:return n*e*4/r.components*r.byteLength;case zl:return n*e*4/r.components*r.byteLength;case lo:case uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ho:case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sc:case bc:return Math.max(n,16)*Math.max(e,8)/4;case vc:case Mc:return Math.max(n,8)*Math.max(e,8)/2;case Ec:case Tc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case wc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Rc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Lc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Uc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Nc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case kc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Oc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Bc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case zc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case po:case Hc:case Gc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case rf:case Vc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Wc:case Xc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ov(n){switch(n){case Xn:case qh:return{byteLength:1,components:1};case fs:case jh:case _s:return{byteLength:2,components:1};case kl:case Ol:return{byteLength:2,components:4};case ki:case Nl:case zn:return{byteLength:4,components:1};case Zh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function av(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ue,d=new WeakMap;let u;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,S){return p?new OffscreenCanvas(C,S):Po("canvas")}function _(C,S,z){let j=1;const K=we(C);if((K.width>z||K.height>z)&&(j=z/Math.max(K.width,K.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const q=Math.floor(j*K.width),Ee=Math.floor(j*K.height);u===void 0&&(u=g(q,Ee));const ae=S?g(q,Ee):u;return ae.width=q,ae.height=Ee,ae.getContext("2d").drawImage(C,0,0,q,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+Ee+")."),ae}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function m(C){return C.generateMipmaps}function f(C){n.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(C,S,z,j,K=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let q=S;if(S===n.RED&&(z===n.FLOAT&&(q=n.R32F),z===n.HALF_FLOAT&&(q=n.R16F),z===n.UNSIGNED_BYTE&&(q=n.R8)),S===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.R8UI),z===n.UNSIGNED_SHORT&&(q=n.R16UI),z===n.UNSIGNED_INT&&(q=n.R32UI),z===n.BYTE&&(q=n.R8I),z===n.SHORT&&(q=n.R16I),z===n.INT&&(q=n.R32I)),S===n.RG&&(z===n.FLOAT&&(q=n.RG32F),z===n.HALF_FLOAT&&(q=n.RG16F),z===n.UNSIGNED_BYTE&&(q=n.RG8)),S===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RG8UI),z===n.UNSIGNED_SHORT&&(q=n.RG16UI),z===n.UNSIGNED_INT&&(q=n.RG32UI),z===n.BYTE&&(q=n.RG8I),z===n.SHORT&&(q=n.RG16I),z===n.INT&&(q=n.RG32I)),S===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGB8UI),z===n.UNSIGNED_SHORT&&(q=n.RGB16UI),z===n.UNSIGNED_INT&&(q=n.RGB32UI),z===n.BYTE&&(q=n.RGB8I),z===n.SHORT&&(q=n.RGB16I),z===n.INT&&(q=n.RGB32I)),S===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),z===n.UNSIGNED_INT&&(q=n.RGBA32UI),z===n.BYTE&&(q=n.RGBA8I),z===n.SHORT&&(q=n.RGBA16I),z===n.INT&&(q=n.RGBA32I)),S===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),S===n.RGBA){const Ee=K?Xo:Ze.getTransfer(j);z===n.FLOAT&&(q=n.RGBA32F),z===n.HALF_FLOAT&&(q=n.RGBA16F),z===n.UNSIGNED_BYTE&&(q=Ee===at?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(C,S){let z;return C?S===null||S===ki||S===wr?z=n.DEPTH24_STENCIL8:S===zn?z=n.DEPTH32F_STENCIL8:S===fs&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ki||S===wr?z=n.DEPTH_COMPONENT24:S===zn?z=n.DEPTH_COMPONENT32F:S===fs&&(z=n.DEPTH_COMPONENT16),z}function R(C,S){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Sn&&C.minFilter!==An?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function y(C){const S=C.target;S.removeEventListener("dispose",y),A(S),S.isVideoTexture&&d.delete(S)}function E(C){const S=C.target;S.removeEventListener("dispose",E),M(S)}function A(C){const S=i.get(C);if(S.__webglInit===void 0)return;const z=C.source,j=h.get(z);if(j){const K=j[S.__cacheKey];K.usedTimes--,K.usedTimes===0&&v(C),Object.keys(j).length===0&&h.delete(z)}i.remove(C)}function v(C){const S=i.get(C);n.deleteTexture(S.__webglTexture);const z=C.source,j=h.get(z);delete j[S.__cacheKey],o.memory.textures--}function M(C){const S=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let K=0;K<S.__webglFramebuffer[j].length;K++)n.deleteFramebuffer(S.__webglFramebuffer[j][K]);else n.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)n.deleteFramebuffer(S.__webglFramebuffer[j]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=C.textures;for(let j=0,K=z.length;j<K;j++){const q=i.get(z[j]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(z[j])}i.remove(C)}let P=0;function B(){P=0}function F(){const C=P;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),P+=1,C}function k(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function H(C,S){const z=i.get(C);if(C.isVideoTexture&&Ae(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,C,S);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+S)}function O(C,S){const z=i.get(C);if(C.version>0&&z.__version!==C.version){Y(z,C,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+S)}function $(C,S){const z=i.get(C);if(C.version>0&&z.__version!==C.version){Y(z,C,S);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+S)}function W(C,S){const z=i.get(C);if(C.version>0&&z.__version!==C.version){J(z,C,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+S)}const te={[xc]:n.REPEAT,[Ii]:n.CLAMP_TO_EDGE,[yc]:n.MIRRORED_REPEAT},se={[Sn]:n.NEAREST,[qm]:n.NEAREST_MIPMAP_NEAREST,[Ms]:n.NEAREST_MIPMAP_LINEAR,[An]:n.LINEAR,[ea]:n.LINEAR_MIPMAP_NEAREST,[Ui]:n.LINEAR_MIPMAP_LINEAR},ve={[Jm]:n.NEVER,[r0]:n.ALWAYS,[Qm]:n.LESS,[sf]:n.LEQUAL,[e0]:n.EQUAL,[i0]:n.GEQUAL,[t0]:n.GREATER,[n0]:n.NOTEQUAL};function Ne(C,S){if(S.type===zn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===An||S.magFilter===ea||S.magFilter===Ms||S.magFilter===Ui||S.minFilter===An||S.minFilter===ea||S.minFilter===Ms||S.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,te[S.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,te[S.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,te[S.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,se[S.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,se[S.minFilter]),S.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,ve[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Sn||S.minFilter!==Ms&&S.minFilter!==Ui||S.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function rt(C,S){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",y));const j=S.source;let K=h.get(j);K===void 0&&(K={},h.set(j,K));const q=k(S);if(q!==C.__cacheKey){K[q]===void 0&&(K[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),K[q].usedTimes++;const Ee=K[C.__cacheKey];Ee!==void 0&&(K[C.__cacheKey].usedTimes--,Ee.usedTimes===0&&v(S)),C.__cacheKey=q,C.__webglTexture=K[q].texture}return z}function Y(C,S,z){let j=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=n.TEXTURE_3D);const K=rt(C,S),q=S.source;t.bindTexture(j,C.__webglTexture,n.TEXTURE0+z);const Ee=i.get(q);if(q.version!==Ee.__version||K===!0){t.activeTexture(n.TEXTURE0+z);const ae=Ze.getPrimaries(Ze.workingColorSpace),he=S.colorSpace===oi?null:Ze.getPrimaries(S.colorSpace),qe=S.colorSpace===oi||ae===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let Q=_(S.image,!1,r.maxTextureSize);Q=mt(S,Q);const pe=s.convert(S.format,S.colorSpace),Pe=s.convert(S.type);let Le=T(S.internalFormat,pe,Pe,S.colorSpace,S.isVideoTexture);Ne(j,S);let me;const Ye=S.mipmaps,ze=S.isVideoTexture!==!0,dt=Ee.__version===void 0||K===!0,D=q.dataReady,oe=R(S,Q);if(S.isDepthTexture)Le=x(S.format===Cr,S.type),dt&&(ze?t.texStorage2D(n.TEXTURE_2D,1,Le,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,Le,Q.width,Q.height,0,pe,Pe,null));else if(S.isDataTexture)if(Ye.length>0){ze&&dt&&t.texStorage2D(n.TEXTURE_2D,oe,Le,Ye[0].width,Ye[0].height);for(let X=0,Z=Ye.length;X<Z;X++)me=Ye[X],ze?D&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,me.width,me.height,pe,Pe,me.data):t.texImage2D(n.TEXTURE_2D,X,Le,me.width,me.height,0,pe,Pe,me.data);S.generateMipmaps=!1}else ze?(dt&&t.texStorage2D(n.TEXTURE_2D,oe,Le,Q.width,Q.height),D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Q.width,Q.height,pe,Pe,Q.data)):t.texImage2D(n.TEXTURE_2D,0,Le,Q.width,Q.height,0,pe,Pe,Q.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ze&&dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,Le,Ye[0].width,Ye[0].height,Q.depth);for(let X=0,Z=Ye.length;X<Z;X++)if(me=Ye[X],S.format!==vn)if(pe!==null)if(ze){if(D)if(S.layerUpdates.size>0){const de=vu(me.width,me.height,S.format,S.type);for(const ce of S.layerUpdates){const ke=me.data.subarray(ce*de/me.data.BYTES_PER_ELEMENT,(ce+1)*de/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,ce,me.width,me.height,1,pe,ke)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,Q.depth,pe,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Le,me.width,me.height,Q.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,Q.depth,pe,Pe,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,X,Le,me.width,me.height,Q.depth,0,pe,Pe,me.data)}else{ze&&dt&&t.texStorage2D(n.TEXTURE_2D,oe,Le,Ye[0].width,Ye[0].height);for(let X=0,Z=Ye.length;X<Z;X++)me=Ye[X],S.format!==vn?pe!==null?ze?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,X,Le,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?D&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,me.width,me.height,pe,Pe,me.data):t.texImage2D(n.TEXTURE_2D,X,Le,me.width,me.height,0,pe,Pe,me.data)}else if(S.isDataArrayTexture)if(ze){if(dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,Le,Q.width,Q.height,Q.depth),D)if(S.layerUpdates.size>0){const X=vu(Q.width,Q.height,S.format,S.type);for(const Z of S.layerUpdates){const de=Q.data.subarray(Z*X/Q.data.BYTES_PER_ELEMENT,(Z+1)*X/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,pe,Pe,de)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pe,Pe,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,Q.width,Q.height,Q.depth,0,pe,Pe,Q.data);else if(S.isData3DTexture)ze?(dt&&t.texStorage3D(n.TEXTURE_3D,oe,Le,Q.width,Q.height,Q.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pe,Pe,Q.data)):t.texImage3D(n.TEXTURE_3D,0,Le,Q.width,Q.height,Q.depth,0,pe,Pe,Q.data);else if(S.isFramebufferTexture){if(dt)if(ze)t.texStorage2D(n.TEXTURE_2D,oe,Le,Q.width,Q.height);else{let X=Q.width,Z=Q.height;for(let de=0;de<oe;de++)t.texImage2D(n.TEXTURE_2D,de,Le,X,Z,0,pe,Pe,null),X>>=1,Z>>=1}}else if(Ye.length>0){if(ze&&dt){const X=we(Ye[0]);t.texStorage2D(n.TEXTURE_2D,oe,Le,X.width,X.height)}for(let X=0,Z=Ye.length;X<Z;X++)me=Ye[X],ze?D&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,pe,Pe,me):t.texImage2D(n.TEXTURE_2D,X,Le,pe,Pe,me);S.generateMipmaps=!1}else if(ze){if(dt){const X=we(Q);t.texStorage2D(n.TEXTURE_2D,oe,Le,X.width,X.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Pe,Q)}else t.texImage2D(n.TEXTURE_2D,0,Le,pe,Pe,Q);m(S)&&f(j),Ee.__version=q.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function J(C,S,z){if(S.image.length!==6)return;const j=rt(C,S),K=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+z);const q=i.get(K);if(K.version!==q.__version||j===!0){t.activeTexture(n.TEXTURE0+z);const Ee=Ze.getPrimaries(Ze.workingColorSpace),ae=S.colorSpace===oi?null:Ze.getPrimaries(S.colorSpace),he=S.colorSpace===oi||Ee===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const qe=S.isCompressedTexture||S.image[0].isCompressedTexture,Q=S.image[0]&&S.image[0].isDataTexture,pe=[];for(let Z=0;Z<6;Z++)!qe&&!Q?pe[Z]=_(S.image[Z],!0,r.maxCubemapSize):pe[Z]=Q?S.image[Z].image:S.image[Z],pe[Z]=mt(S,pe[Z]);const Pe=pe[0],Le=s.convert(S.format,S.colorSpace),me=s.convert(S.type),Ye=T(S.internalFormat,Le,me,S.colorSpace),ze=S.isVideoTexture!==!0,dt=q.__version===void 0||j===!0,D=K.dataReady;let oe=R(S,Pe);Ne(n.TEXTURE_CUBE_MAP,S);let X;if(qe){ze&&dt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,oe,Ye,Pe.width,Pe.height);for(let Z=0;Z<6;Z++){X=pe[Z].mipmaps;for(let de=0;de<X.length;de++){const ce=X[de];S.format!==vn?Le!==null?ze?D&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de,0,0,ce.width,ce.height,Le,ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de,Ye,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de,0,0,ce.width,ce.height,Le,me,ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de,Ye,ce.width,ce.height,0,Le,me,ce.data)}}}else{if(X=S.mipmaps,ze&&dt){X.length>0&&oe++;const Z=we(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,oe,Ye,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){ze?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,pe[Z].width,pe[Z].height,Le,me,pe[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ye,pe[Z].width,pe[Z].height,0,Le,me,pe[Z].data);for(let de=0;de<X.length;de++){const ke=X[de].image[Z].image;ze?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de+1,0,0,ke.width,ke.height,Le,me,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de+1,Ye,ke.width,ke.height,0,Le,me,ke.data)}}else{ze?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Le,me,pe[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ye,Le,me,pe[Z]);for(let de=0;de<X.length;de++){const ce=X[de];ze?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de+1,0,0,Le,me,ce.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,de+1,Ye,Le,me,ce.image[Z])}}}m(S)&&f(n.TEXTURE_CUBE_MAP),q.__version=K.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function xe(C,S,z,j,K,q){const Ee=s.convert(z.format,z.colorSpace),ae=s.convert(z.type),he=T(z.internalFormat,Ee,ae,z.colorSpace),qe=i.get(S),Q=i.get(z);if(Q.__renderTarget=S,!qe.__hasExternalTextures){const pe=Math.max(1,S.width>>q),Pe=Math.max(1,S.height>>q);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,q,he,pe,Pe,S.depth,0,Ee,ae,null):t.texImage2D(K,q,he,pe,Pe,0,Ee,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),$e(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,K,Q.__webglTexture,0,Xe(S)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,K,Q.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(C,S,z){if(n.bindRenderbuffer(n.RENDERBUFFER,C),S.depthBuffer){const j=S.depthTexture,K=j&&j.isDepthTexture?j.type:null,q=x(S.stencilBuffer,K),Ee=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=Xe(S);$e(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,q,S.width,S.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,q,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,q,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,C)}else{const j=S.textures;for(let K=0;K<j.length;K++){const q=j[K],Ee=s.convert(q.format,q.colorSpace),ae=s.convert(q.type),he=T(q.internalFormat,Ee,ae,q.colorSpace),qe=Xe(S);z&&$e(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,qe,he,S.width,S.height):$e(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,qe,he,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,he,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);const K=j.__webglTexture,q=Xe(S);if(S.depthTexture.format===_r)$e(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(S.depthTexture.format===Cr)$e(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function De(C){const S=i.get(C),z=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const K=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",K)};j.addEventListener("dispose",K),S.__depthDisposeCallback=K}S.__boundDepthTexture=j}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Ce(S.__webglFramebuffer,C)}else if(z){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=n.createRenderbuffer(),re(S.__webglDepthbuffer[j],C,!1);else{const K=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=S.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),re(S.__webglDepthbuffer,C,!1);else{const j=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,K)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ge(C,S,z){const j=i.get(C);S!==void 0&&xe(j.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&De(C)}function Qe(C){const S=C.texture,z=i.get(C),j=i.get(S);C.addEventListener("dispose",E);const K=C.textures,q=C.isWebGLCubeRenderTarget===!0,Ee=K.length>1;if(Ee||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=S.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[ae]=[];for(let he=0;he<S.mipmaps.length;he++)z.__webglFramebuffer[ae][he]=n.createFramebuffer()}else z.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let ae=0;ae<S.mipmaps.length;ae++)z.__webglFramebuffer[ae]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let ae=0,he=K.length;ae<he;ae++){const qe=i.get(K[ae]);qe.__webglTexture===void 0&&(qe.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&$e(C)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ae=0;ae<K.length;ae++){const he=K[ae];z.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ae]);const qe=s.convert(he.format,he.colorSpace),Q=s.convert(he.type),pe=T(he.internalFormat,qe,Q,he.colorSpace,C.isXRRenderTarget===!0),Pe=Xe(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,pe,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,z.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),re(z.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),Ne(n.TEXTURE_CUBE_MAP,S);for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)xe(z.__webglFramebuffer[ae][he],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,he);else xe(z.__webglFramebuffer[ae],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(S)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ae=0,he=K.length;ae<he;ae++){const qe=K[ae],Q=i.get(qe);t.bindTexture(n.TEXTURE_2D,Q.__webglTexture),Ne(n.TEXTURE_2D,qe),xe(z.__webglFramebuffer,C,qe,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,0),m(qe)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ae=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,j.__webglTexture),Ne(ae,S),S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)xe(z.__webglFramebuffer[he],C,S,n.COLOR_ATTACHMENT0,ae,he);else xe(z.__webglFramebuffer,C,S,n.COLOR_ATTACHMENT0,ae,0);m(S)&&f(ae),t.unbindTexture()}C.depthBuffer&&De(C)}function Be(C){const S=C.textures;for(let z=0,j=S.length;z<j;z++){const K=S[z];if(m(K)){const q=w(C),Ee=i.get(K).__webglTexture;t.bindTexture(q,Ee),f(q),t.unbindTexture()}}}const bt=[],N=[];function ln(C){if(C.samples>0){if($e(C)===!1){const S=C.textures,z=C.width,j=C.height;let K=n.COLOR_BUFFER_BIT;const q=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(C),ae=S.length>1;if(ae)for(let he=0;he<S.length;he++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let he=0;he<S.length;he++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[he]);const qe=i.get(S[he]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,qe,0)}n.blitFramebuffer(0,0,z,j,0,0,z,j,K,n.NEAREST),c===!0&&(bt.length=0,N.length=0,bt.push(n.COLOR_ATTACHMENT0+he),C.depthBuffer&&C.resolveDepthBuffer===!1&&(bt.push(q),N.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let he=0;he<S.length;he++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[he]);const qe=i.get(S[he]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,qe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const S=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function Xe(C){return Math.min(r.maxSamples,C.samples)}function $e(C){const S=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ae(C){const S=o.render.frame;d.get(C)!==S&&(d.set(C,S),C.update())}function mt(C,S){const z=C.colorSpace,j=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Dr&&z!==oi&&(Ze.getTransfer(z)===at?(j!==vn||K!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function we(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=B,this.setTexture2D=H,this.setTexture2DArray=O,this.setTexture3D=$,this.setTextureCube=W,this.rebindTextures=Ge,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=Be,this.updateMultisampleRenderTarget=ln,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=$e}function cv(n,e){function t(i,r=oi){let s;const o=Ze.getTransfer(r);if(i===Xn)return n.UNSIGNED_BYTE;if(i===kl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ol)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Zh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===qh)return n.BYTE;if(i===jh)return n.SHORT;if(i===fs)return n.UNSIGNED_SHORT;if(i===Nl)return n.INT;if(i===ki)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===_s)return n.HALF_FLOAT;if(i===Kh)return n.ALPHA;if(i===Jh)return n.RGB;if(i===vn)return n.RGBA;if(i===Qh)return n.LUMINANCE;if(i===ef)return n.LUMINANCE_ALPHA;if(i===_r)return n.DEPTH_COMPONENT;if(i===Cr)return n.DEPTH_STENCIL;if(i===tf)return n.RED;if(i===Fl)return n.RED_INTEGER;if(i===nf)return n.RG;if(i===Bl)return n.RG_INTEGER;if(i===zl)return n.RGBA_INTEGER;if(i===lo||i===uo||i===ho||i===fo)if(o===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===lo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ho)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===lo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===uo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ho)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vc||i===Sc||i===Mc||i===bc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===vc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Sc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===bc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ec||i===Tc||i===wc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ec||i===Tc)return o===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===wc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Cc||i===Ac||i===Rc||i===Pc||i===Lc||i===Dc||i===Ic||i===Uc||i===Nc||i===kc||i===Oc||i===Fc||i===Bc||i===zc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Cc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ac)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Rc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Lc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Dc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ic)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Uc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Nc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===kc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Oc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===zc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===po||i===Hc||i===Gc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===po)return o===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Hc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Gc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===rf||i===Vc||i===Wc||i===Xc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===po)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Vc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Wc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===wr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class lv extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class We extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dv={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new We,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new We,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new We,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=d.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dv)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new We;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const uv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class fv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Yt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new mi({vertexShader:uv,fragmentShader:hv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ne(new Vn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pv extends Ir{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,d=null,u=null,h=null,p=null,g=null;const _=new fv,m=t.getContextAttributes();let f=null,w=null;const T=[],x=[],R=new Ue;let y=null;const E=new sn;E.viewport=new lt;const A=new sn;A.viewport=new lt;const v=[E,A],M=new lv;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let J=T[Y];return J===void 0&&(J=new Aa,T[Y]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Y){let J=T[Y];return J===void 0&&(J=new Aa,T[Y]=J),J.getGripSpace()},this.getHand=function(Y){let J=T[Y];return J===void 0&&(J=new Aa,T[Y]=J),J.getHandSpace()};function F(Y){const J=x.indexOf(Y.inputSource);if(J===-1)return;const xe=T[J];xe!==void 0&&(xe.update(Y.inputSource,Y.frame,l||o),xe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",H);for(let Y=0;Y<T.length;Y++){const J=x[Y];J!==null&&(x[Y]=null,T[Y].disconnect(J))}P=null,B=null,_.reset(),e.setRenderTarget(f),p=null,h=null,u=null,r=null,w=null,rt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",k),r.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Oi(p.framebufferWidth,p.framebufferHeight,{format:vn,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,xe=null,re=null;m.depth&&(re=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=m.stencil?Cr:_r,xe=m.stencil?wr:ki);const Ce={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:s};u=new XRWebGLBinding(r,t),h=u.createProjectionLayer(Ce),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),w=new Oi(h.textureWidth,h.textureHeight,{format:vn,type:Xn,depthTexture:new _f(h.textureWidth,h.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),rt.setContext(r),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function H(Y){for(let J=0;J<Y.removed.length;J++){const xe=Y.removed[J],re=x.indexOf(xe);re>=0&&(x[re]=null,T[re].disconnect(xe))}for(let J=0;J<Y.added.length;J++){const xe=Y.added[J];let re=x.indexOf(xe);if(re===-1){for(let De=0;De<T.length;De++)if(De>=x.length){x.push(xe),re=De;break}else if(x[De]===null){x[De]=xe,re=De;break}if(re===-1)break}const Ce=T[re];Ce&&Ce.connect(xe)}}const O=new L,$=new L;function W(Y,J,xe){O.setFromMatrixPosition(J.matrixWorld),$.setFromMatrixPosition(xe.matrixWorld);const re=O.distanceTo($),Ce=J.projectionMatrix.elements,De=xe.projectionMatrix.elements,Ge=Ce[14]/(Ce[10]-1),Qe=Ce[14]/(Ce[10]+1),Be=(Ce[9]+1)/Ce[5],bt=(Ce[9]-1)/Ce[5],N=(Ce[8]-1)/Ce[0],ln=(De[8]+1)/De[0],Xe=Ge*N,$e=Ge*ln,Ae=re/(-N+ln),mt=Ae*-N;if(J.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(mt),Y.translateZ(Ae),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ce[10]===-1)Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const we=Ge+Ae,C=Qe+Ae,S=Xe-mt,z=$e+(re-mt),j=Be*Qe/C*we,K=bt*Qe/C*we;Y.projectionMatrix.makePerspective(S,z,j,K,we,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function te(Y,J){J===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(J.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let J=Y.near,xe=Y.far;_.texture!==null&&(_.depthNear>0&&(J=_.depthNear),_.depthFar>0&&(xe=_.depthFar)),M.near=A.near=E.near=J,M.far=A.far=E.far=xe,(P!==M.near||B!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,B=M.far),E.layers.mask=Y.layers.mask|2,A.layers.mask=Y.layers.mask|4,M.layers.mask=E.layers.mask|A.layers.mask;const re=Y.parent,Ce=M.cameras;te(M,re);for(let De=0;De<Ce.length;De++)te(Ce[De],re);Ce.length===2?W(M,E,A):M.projectionMatrix.copy(E.projectionMatrix),se(Y,M,re)};function se(Y,J,xe){xe===null?Y.matrix.copy(J.matrixWorld):(Y.matrix.copy(xe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(J.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Yc*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(Y){c=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let ve=null;function Ne(Y,J){if(d=J.getViewerPose(l||o),g=J,d!==null){const xe=d.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let re=!1;xe.length!==M.cameras.length&&(M.cameras.length=0,re=!0);for(let De=0;De<xe.length;De++){const Ge=xe[De];let Qe=null;if(p!==null)Qe=p.getViewport(Ge);else{const bt=u.getViewSubImage(h,Ge);Qe=bt.viewport,De===0&&(e.setRenderTargetTextures(w,bt.colorTexture,h.ignoreDepthValues?void 0:bt.depthStencilTexture),e.setRenderTarget(w))}let Be=v[De];Be===void 0&&(Be=new sn,Be.layers.enable(De),Be.viewport=new lt,v[De]=Be),Be.matrix.fromArray(Ge.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Ge.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),De===0&&(M.matrix.copy(Be.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),re===!0&&M.cameras.push(Be)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const De=u.getDepthInformation(xe[0]);De&&De.isValid&&De.texture&&_.init(e,De,r.renderState)}}for(let xe=0;xe<T.length;xe++){const re=x[xe],Ce=T[xe];re!==null&&Ce!==void 0&&Ce.update(re,J,l||o)}ve&&ve(Y,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const rt=new mf;rt.setAnimationLoop(Ne),this.setAnimationLoop=function(Y){ve=Y},this.dispose=function(){}}}const Ei=new bn,mv=new pt;function gv(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,hf(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,w,T,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,w,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===$t&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===$t&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const w=e.get(f),T=w.envMap,x=w.envMapRotation;T&&(m.envMap.value=T,Ei.copy(x),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),m.envMapRotation.value.setFromMatrix4(mv.makeRotationFromEuler(Ei)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,w,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=T*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===$t&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const w=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function _v(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,T){const x=T.program;i.uniformBlockBinding(w,x)}function l(w,T){let x=r[w.id];x===void 0&&(g(w),x=d(w),r[w.id]=x,w.addEventListener("dispose",m));const R=T.program;i.updateUBOMapping(w,R);const y=e.render.frame;s[w.id]!==y&&(h(w),s[w.id]=y)}function d(w){const T=u();w.__bindingPointIndex=T;const x=n.createBuffer(),R=w.__size,y=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,R,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,x),x}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(w){const T=r[w.id],x=w.uniforms,R=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let y=0,E=x.length;y<E;y++){const A=Array.isArray(x[y])?x[y]:[x[y]];for(let v=0,M=A.length;v<M;v++){const P=A[v];if(p(P,y,v,R)===!0){const B=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let H=0;H<F.length;H++){const O=F[H],$=_(O);typeof O=="number"||typeof O=="boolean"?(P.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,B+k,P.__data)):O.isMatrix3?(P.__data[0]=O.elements[0],P.__data[1]=O.elements[1],P.__data[2]=O.elements[2],P.__data[3]=0,P.__data[4]=O.elements[3],P.__data[5]=O.elements[4],P.__data[6]=O.elements[5],P.__data[7]=0,P.__data[8]=O.elements[6],P.__data[9]=O.elements[7],P.__data[10]=O.elements[8],P.__data[11]=0):(O.toArray(P.__data,k),k+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,T,x,R){const y=w.value,E=T+"_"+x;if(R[E]===void 0)return typeof y=="number"||typeof y=="boolean"?R[E]=y:R[E]=y.clone(),!0;{const A=R[E];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return R[E]=y,!0}else if(A.equals(y)===!1)return A.copy(y),!0}return!1}function g(w){const T=w.uniforms;let x=0;const R=16;for(let E=0,A=T.length;E<A;E++){const v=Array.isArray(T[E])?T[E]:[T[E]];for(let M=0,P=v.length;M<P;M++){const B=v[M],F=Array.isArray(B.value)?B.value:[B.value];for(let k=0,H=F.length;k<H;k++){const O=F[k],$=_(O),W=x%R,te=W%$.boundary,se=W+te;x+=te,se!==0&&R-se<$.storage&&(x+=R-se),B.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=$.storage}}}const y=x%R;return y>0&&(x+=R-y),w.__size=x,w.__cache={},this}function _(w){const T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){const T=w.target;T.removeEventListener("dispose",m);const x=o.indexOf(T.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function f(){for(const w in r)n.deleteBuffer(r[w]);o=[],r={},s={}}return{bind:c,update:l,dispose:f}}class xv{constructor(e={}){const{canvas:t=o0(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const w=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qt,this.toneMapping=di,this.toneMappingExposure=1;const x=this;let R=!1,y=0,E=0,A=null,v=-1,M=null;const P=new lt,B=new lt;let F=null;const k=new Re(0);let H=0,O=t.width,$=t.height,W=1,te=null,se=null;const ve=new lt(0,0,O,$),Ne=new lt(0,0,O,$);let rt=!1;const Y=new Wl;let J=!1,xe=!1;const re=new pt,Ce=new pt,De=new L,Ge=new lt,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function bt(){return A===null?W:1}let N=i;function ln(b,I){return t.getContext(b,I)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Il}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",ce,!1),N===null){const I="webgl2";if(N=ln(I,b),N===null)throw ln(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Xe,$e,Ae,mt,we,C,S,z,j,K,q,Ee,ae,he,qe,Q,pe,Pe,Le,me,Ye,ze,dt,D;function oe(){Xe=new bx(N),Xe.init(),ze=new cv(N,Xe),$e=new _x(N,Xe,e,ze),Ae=new sv(N,Xe),$e.reverseDepthBuffer&&h&&Ae.buffers.depth.setReversed(!0),mt=new wx(N),we=new Wy,C=new av(N,Xe,Ae,we,$e,ze,mt),S=new yx(x),z=new Mx(x),j=new I0(N),dt=new mx(N,j),K=new Ex(N,j,mt,dt),q=new Ax(N,K,j,mt),Le=new Cx(N,$e,C),Q=new xx(we),Ee=new Vy(x,S,z,Xe,$e,dt,Q),ae=new gv(x,we),he=new $y,qe=new Jy(Xe),Pe=new px(x,S,z,Ae,q,p,c),pe=new iv(x,q,$e),D=new _v(N,mt,$e,Ae),me=new gx(N,Xe,mt),Ye=new Tx(N,Xe,mt),mt.programs=Ee.programs,x.capabilities=$e,x.extensions=Xe,x.properties=we,x.renderLists=he,x.shadowMap=pe,x.state=Ae,x.info=mt}oe();const X=new pv(x,N);this.xr=X,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const b=Xe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Xe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(b){b!==void 0&&(W=b,this.setSize(O,$,!1))},this.getSize=function(b){return b.set(O,$)},this.setSize=function(b,I,G=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=b,$=I,t.width=Math.floor(b*W),t.height=Math.floor(I*W),G===!0&&(t.style.width=b+"px",t.style.height=I+"px"),this.setViewport(0,0,b,I)},this.getDrawingBufferSize=function(b){return b.set(O*W,$*W).floor()},this.setDrawingBufferSize=function(b,I,G){O=b,$=I,W=G,t.width=Math.floor(b*G),t.height=Math.floor(I*G),this.setViewport(0,0,b,I)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(ve)},this.setViewport=function(b,I,G,V){b.isVector4?ve.set(b.x,b.y,b.z,b.w):ve.set(b,I,G,V),Ae.viewport(P.copy(ve).multiplyScalar(W).round())},this.getScissor=function(b){return b.copy(Ne)},this.setScissor=function(b,I,G,V){b.isVector4?Ne.set(b.x,b.y,b.z,b.w):Ne.set(b,I,G,V),Ae.scissor(B.copy(Ne).multiplyScalar(W).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(b){Ae.setScissorTest(rt=b)},this.setOpaqueSort=function(b){te=b},this.setTransparentSort=function(b){se=b},this.getClearColor=function(b){return b.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(b=!0,I=!0,G=!0){let V=0;if(b){let U=!1;if(A!==null){const ee=A.texture.format;U=ee===zl||ee===Bl||ee===Fl}if(U){const ee=A.texture.type,le=ee===Xn||ee===ki||ee===fs||ee===wr||ee===kl||ee===Ol,Se=Pe.getClearColor(),Me=Pe.getClearAlpha(),Ie=Se.r,Oe=Se.g,be=Se.b;le?(g[0]=Ie,g[1]=Oe,g[2]=be,g[3]=Me,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Ie,_[1]=Oe,_[2]=be,_[3]=Me,N.clearBufferiv(N.COLOR,0,_))}else V|=N.COLOR_BUFFER_BIT}I&&(V|=N.DEPTH_BUFFER_BIT),G&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),he.dispose(),qe.dispose(),we.dispose(),S.dispose(),z.dispose(),q.dispose(),dt.dispose(),D.dispose(),Ee.dispose(),X.dispose(),X.removeEventListener("sessionstart",md),X.removeEventListener("sessionend",gd),xi.stop()};function Z(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const b=mt.autoReset,I=pe.enabled,G=pe.autoUpdate,V=pe.needsUpdate,U=pe.type;oe(),mt.autoReset=b,pe.enabled=I,pe.autoUpdate=G,pe.needsUpdate=V,pe.type=U}function ce(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ke(b){const I=b.target;I.removeEventListener("dispose",ke),vt(I)}function vt(b){kt(b),we.remove(b)}function kt(b){const I=we.get(b).programs;I!==void 0&&(I.forEach(function(G){Ee.releaseProgram(G)}),b.isShaderMaterial&&Ee.releaseShaderCache(b))}this.renderBufferDirect=function(b,I,G,V,U,ee){I===null&&(I=Qe);const le=U.isMesh&&U.matrixWorld.determinant()<0,Se=Gp(b,I,G,V,U);Ae.setMaterial(V,le);let Me=G.index,Ie=1;if(V.wireframe===!0){if(Me=K.getWireframeAttribute(G),Me===void 0)return;Ie=2}const Oe=G.drawRange,be=G.attributes.position;let Ke=Oe.start*Ie,ut=(Oe.start+Oe.count)*Ie;ee!==null&&(Ke=Math.max(Ke,ee.start*Ie),ut=Math.min(ut,(ee.start+ee.count)*Ie)),Me!==null?(Ke=Math.max(Ke,0),ut=Math.min(ut,Me.count)):be!=null&&(Ke=Math.max(Ke,0),ut=Math.min(ut,be.count));const gt=ut-Ke;if(gt<0||gt===1/0)return;dt.setup(U,V,Se,G,Me);let Kt,et=me;if(Me!==null&&(Kt=j.get(Me),et=Ye,et.setIndex(Kt)),U.isMesh)V.wireframe===!0?(Ae.setLineWidth(V.wireframeLinewidth*bt()),et.setMode(N.LINES)):et.setMode(N.TRIANGLES);else if(U.isLine){let Te=V.linewidth;Te===void 0&&(Te=1),Ae.setLineWidth(Te*bt()),U.isLineSegments?et.setMode(N.LINES):U.isLineLoop?et.setMode(N.LINE_LOOP):et.setMode(N.LINE_STRIP)}else U.isPoints?et.setMode(N.POINTS):U.isSprite&&et.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)et.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Xe.get("WEBGL_multi_draw"))et.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Te=U._multiDrawStarts,Dn=U._multiDrawCounts,tt=U._multiDrawCount,mn=Me?j.get(Me).bytesPerElement:1,Vi=we.get(V).currentProgram.getUniforms();for(let tn=0;tn<tt;tn++)Vi.setValue(N,"_gl_DrawID",tn),et.render(Te[tn]/mn,Dn[tn])}else if(U.isInstancedMesh)et.renderInstances(Ke,gt,U.count);else if(G.isInstancedBufferGeometry){const Te=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Dn=Math.min(G.instanceCount,Te);et.renderInstances(Ke,gt,Dn)}else et.render(Ke,gt)};function st(b,I,G){b.transparent===!0&&b.side===wn&&b.forceSinglePass===!1?(b.side=$t,b.needsUpdate=!0,Ss(b,I,G),b.side=pi,b.needsUpdate=!0,Ss(b,I,G),b.side=wn):Ss(b,I,G)}this.compile=function(b,I,G=null){G===null&&(G=b),f=qe.get(G),f.init(I),T.push(f),G.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),b!==G&&b.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const V=new Set;return b.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ee=U.material;if(ee)if(Array.isArray(ee))for(let le=0;le<ee.length;le++){const Se=ee[le];st(Se,G,U),V.add(Se)}else st(ee,G,U),V.add(ee)}),T.pop(),f=null,V},this.compileAsync=function(b,I,G=null){const V=this.compile(b,I,G);return new Promise(U=>{function ee(){if(V.forEach(function(le){we.get(le).currentProgram.isReady()&&V.delete(le)}),V.size===0){U(b);return}setTimeout(ee,10)}Xe.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let pn=null;function Ln(b){pn&&pn(b)}function md(){xi.stop()}function gd(){xi.start()}const xi=new mf;xi.setAnimationLoop(Ln),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(b){pn=b,X.setAnimationLoop(b),b===null?xi.stop():xi.start()},X.addEventListener("sessionstart",md),X.addEventListener("sessionend",gd),this.render=function(b,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(I),I=X.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,I,A),f=qe.get(b,T.length),f.init(I),T.push(f),Ce.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Y.setFromProjectionMatrix(Ce),xe=this.localClippingEnabled,J=Q.init(this.clippingPlanes,xe),m=he.get(b,w.length),m.init(),w.push(m),X.enabled===!0&&X.isPresenting===!0){const ee=x.xr.getDepthSensingMesh();ee!==null&&Qo(ee,I,-1/0,x.sortObjects)}Qo(b,I,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(te,se),Be=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Be&&Pe.addToRenderList(m,b),this.info.render.frame++,J===!0&&Q.beginShadows();const G=f.state.shadowsArray;pe.render(G,b,I),J===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=m.opaque,U=m.transmissive;if(f.setupLights(),I.isArrayCamera){const ee=I.cameras;if(U.length>0)for(let le=0,Se=ee.length;le<Se;le++){const Me=ee[le];xd(V,U,b,Me)}Be&&Pe.render(b);for(let le=0,Se=ee.length;le<Se;le++){const Me=ee[le];_d(m,b,Me,Me.viewport)}}else U.length>0&&xd(V,U,b,I),Be&&Pe.render(b),_d(m,b,I);A!==null&&(C.updateMultisampleRenderTarget(A),C.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,I),dt.resetDefaultState(),v=-1,M=null,T.pop(),T.length>0?(f=T[T.length-1],J===!0&&Q.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Qo(b,I,G,V){if(b.visible===!1)return;if(b.layers.test(I.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(I);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){V&&Ge.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ce);const le=q.update(b),Se=b.material;Se.visible&&m.push(b,le,Se,G,Ge.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){const le=q.update(b),Se=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ge.copy(b.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Ge.copy(le.boundingSphere.center)),Ge.applyMatrix4(b.matrixWorld).applyMatrix4(Ce)),Array.isArray(Se)){const Me=le.groups;for(let Ie=0,Oe=Me.length;Ie<Oe;Ie++){const be=Me[Ie],Ke=Se[be.materialIndex];Ke&&Ke.visible&&m.push(b,le,Ke,G,Ge.z,be)}}else Se.visible&&m.push(b,le,Se,G,Ge.z,null)}}const ee=b.children;for(let le=0,Se=ee.length;le<Se;le++)Qo(ee[le],I,G,V)}function _d(b,I,G,V){const U=b.opaque,ee=b.transmissive,le=b.transparent;f.setupLightsView(G),J===!0&&Q.setGlobalState(x.clippingPlanes,G),V&&Ae.viewport(P.copy(V)),U.length>0&&vs(U,I,G),ee.length>0&&vs(ee,I,G),le.length>0&&vs(le,I,G),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function xd(b,I,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[V.id]===void 0&&(f.state.transmissionRenderTarget[V.id]=new Oi(1,1,{generateMipmaps:!0,type:Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float")?_s:Xn,minFilter:Ui,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const ee=f.state.transmissionRenderTarget[V.id],le=V.viewport||P;ee.setSize(le.z,le.w);const Se=x.getRenderTarget();x.setRenderTarget(ee),x.getClearColor(k),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),Be&&Pe.render(G);const Me=x.toneMapping;x.toneMapping=di;const Ie=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),f.setupLightsView(V),J===!0&&Q.setGlobalState(x.clippingPlanes,V),vs(b,G,V),C.updateMultisampleRenderTarget(ee),C.updateRenderTargetMipmap(ee),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let be=0,Ke=I.length;be<Ke;be++){const ut=I[be],gt=ut.object,Kt=ut.geometry,et=ut.material,Te=ut.group;if(et.side===wn&&gt.layers.test(V.layers)){const Dn=et.side;et.side=$t,et.needsUpdate=!0,yd(gt,G,V,Kt,et,Te),et.side=Dn,et.needsUpdate=!0,Oe=!0}}Oe===!0&&(C.updateMultisampleRenderTarget(ee),C.updateRenderTargetMipmap(ee))}x.setRenderTarget(Se),x.setClearColor(k,H),Ie!==void 0&&(V.viewport=Ie),x.toneMapping=Me}function vs(b,I,G){const V=I.isScene===!0?I.overrideMaterial:null;for(let U=0,ee=b.length;U<ee;U++){const le=b[U],Se=le.object,Me=le.geometry,Ie=V===null?le.material:V,Oe=le.group;Se.layers.test(G.layers)&&yd(Se,I,G,Me,Ie,Oe)}}function yd(b,I,G,V,U,ee){b.onBeforeRender(x,I,G,V,U,ee),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),U.onBeforeRender(x,I,G,V,b,ee),U.transparent===!0&&U.side===wn&&U.forceSinglePass===!1?(U.side=$t,U.needsUpdate=!0,x.renderBufferDirect(G,I,V,U,b,ee),U.side=pi,U.needsUpdate=!0,x.renderBufferDirect(G,I,V,U,b,ee),U.side=wn):x.renderBufferDirect(G,I,V,U,b,ee),b.onAfterRender(x,I,G,V,U,ee)}function Ss(b,I,G){I.isScene!==!0&&(I=Qe);const V=we.get(b),U=f.state.lights,ee=f.state.shadowsArray,le=U.state.version,Se=Ee.getParameters(b,U.state,ee,I,G),Me=Ee.getProgramCacheKey(Se);let Ie=V.programs;V.environment=b.isMeshStandardMaterial?I.environment:null,V.fog=I.fog,V.envMap=(b.isMeshStandardMaterial?z:S).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?I.environmentRotation:b.envMapRotation,Ie===void 0&&(b.addEventListener("dispose",ke),Ie=new Map,V.programs=Ie);let Oe=Ie.get(Me);if(Oe!==void 0){if(V.currentProgram===Oe&&V.lightsStateVersion===le)return Sd(b,Se),Oe}else Se.uniforms=Ee.getUniforms(b),b.onBeforeCompile(Se,x),Oe=Ee.acquireProgram(Se,Me),Ie.set(Me,Oe),V.uniforms=Se.uniforms;const be=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(be.clippingPlanes=Q.uniform),Sd(b,Se),V.needsLights=Wp(b),V.lightsStateVersion=le,V.needsLights&&(be.ambientLightColor.value=U.state.ambient,be.lightProbe.value=U.state.probe,be.directionalLights.value=U.state.directional,be.directionalLightShadows.value=U.state.directionalShadow,be.spotLights.value=U.state.spot,be.spotLightShadows.value=U.state.spotShadow,be.rectAreaLights.value=U.state.rectArea,be.ltc_1.value=U.state.rectAreaLTC1,be.ltc_2.value=U.state.rectAreaLTC2,be.pointLights.value=U.state.point,be.pointLightShadows.value=U.state.pointShadow,be.hemisphereLights.value=U.state.hemi,be.directionalShadowMap.value=U.state.directionalShadowMap,be.directionalShadowMatrix.value=U.state.directionalShadowMatrix,be.spotShadowMap.value=U.state.spotShadowMap,be.spotLightMatrix.value=U.state.spotLightMatrix,be.spotLightMap.value=U.state.spotLightMap,be.pointShadowMap.value=U.state.pointShadowMap,be.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=Oe,V.uniformsList=null,Oe}function vd(b){if(b.uniformsList===null){const I=b.currentProgram.getUniforms();b.uniformsList=go.seqWithValue(I.seq,b.uniforms)}return b.uniformsList}function Sd(b,I){const G=we.get(b);G.outputColorSpace=I.outputColorSpace,G.batching=I.batching,G.batchingColor=I.batchingColor,G.instancing=I.instancing,G.instancingColor=I.instancingColor,G.instancingMorph=I.instancingMorph,G.skinning=I.skinning,G.morphTargets=I.morphTargets,G.morphNormals=I.morphNormals,G.morphColors=I.morphColors,G.morphTargetsCount=I.morphTargetsCount,G.numClippingPlanes=I.numClippingPlanes,G.numIntersection=I.numClipIntersection,G.vertexAlphas=I.vertexAlphas,G.vertexTangents=I.vertexTangents,G.toneMapping=I.toneMapping}function Gp(b,I,G,V,U){I.isScene!==!0&&(I=Qe),C.resetTextureUnits();const ee=I.fog,le=V.isMeshStandardMaterial?I.environment:null,Se=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Dr,Me=(V.isMeshStandardMaterial?z:S).get(V.envMap||le),Ie=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Oe=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),be=!!G.morphAttributes.position,Ke=!!G.morphAttributes.normal,ut=!!G.morphAttributes.color;let gt=di;V.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(gt=x.toneMapping);const Kt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,et=Kt!==void 0?Kt.length:0,Te=we.get(V),Dn=f.state.lights;if(J===!0&&(xe===!0||b!==M)){const dn=b===M&&V.id===v;Q.setState(V,b,dn)}let tt=!1;V.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Dn.state.version||Te.outputColorSpace!==Se||U.isBatchedMesh&&Te.batching===!1||!U.isBatchedMesh&&Te.batching===!0||U.isBatchedMesh&&Te.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Te.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Te.instancing===!1||!U.isInstancedMesh&&Te.instancing===!0||U.isSkinnedMesh&&Te.skinning===!1||!U.isSkinnedMesh&&Te.skinning===!0||U.isInstancedMesh&&Te.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Te.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Te.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Te.instancingMorph===!1&&U.morphTexture!==null||Te.envMap!==Me||V.fog===!0&&Te.fog!==ee||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Q.numPlanes||Te.numIntersection!==Q.numIntersection)||Te.vertexAlphas!==Ie||Te.vertexTangents!==Oe||Te.morphTargets!==be||Te.morphNormals!==Ke||Te.morphColors!==ut||Te.toneMapping!==gt||Te.morphTargetsCount!==et)&&(tt=!0):(tt=!0,Te.__version=V.version);let mn=Te.currentProgram;tt===!0&&(mn=Ss(V,I,U));let Vi=!1,tn=!1,Or=!1;const _t=mn.getUniforms(),En=Te.uniforms;if(Ae.useProgram(mn.program)&&(Vi=!0,tn=!0,Or=!0),V.id!==v&&(v=V.id,tn=!0),Vi||M!==b){Ae.buffers.depth.getReversed()?(re.copy(b.projectionMatrix),c0(re),l0(re),_t.setValue(N,"projectionMatrix",re)):_t.setValue(N,"projectionMatrix",b.projectionMatrix),_t.setValue(N,"viewMatrix",b.matrixWorldInverse);const Yn=_t.map.cameraPosition;Yn!==void 0&&Yn.setValue(N,De.setFromMatrixPosition(b.matrixWorld)),$e.logarithmicDepthBuffer&&_t.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&_t.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,tn=!0,Or=!0)}if(U.isSkinnedMesh){_t.setOptional(N,U,"bindMatrix"),_t.setOptional(N,U,"bindMatrixInverse");const dn=U.skeleton;dn&&(dn.boneTexture===null&&dn.computeBoneTexture(),_t.setValue(N,"boneTexture",dn.boneTexture,C))}U.isBatchedMesh&&(_t.setOptional(N,U,"batchingTexture"),_t.setValue(N,"batchingTexture",U._matricesTexture,C),_t.setOptional(N,U,"batchingIdTexture"),_t.setValue(N,"batchingIdTexture",U._indirectTexture,C),_t.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&_t.setValue(N,"batchingColorTexture",U._colorsTexture,C));const Fr=G.morphAttributes;if((Fr.position!==void 0||Fr.normal!==void 0||Fr.color!==void 0)&&Le.update(U,G,mn),(tn||Te.receiveShadow!==U.receiveShadow)&&(Te.receiveShadow=U.receiveShadow,_t.setValue(N,"receiveShadow",U.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(En.envMap.value=Me,En.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&I.environment!==null&&(En.envMapIntensity.value=I.environmentIntensity),tn&&(_t.setValue(N,"toneMappingExposure",x.toneMappingExposure),Te.needsLights&&Vp(En,Or),ee&&V.fog===!0&&ae.refreshFogUniforms(En,ee),ae.refreshMaterialUniforms(En,V,W,$,f.state.transmissionRenderTarget[b.id]),go.upload(N,vd(Te),En,C)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(go.upload(N,vd(Te),En,C),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&_t.setValue(N,"center",U.center),_t.setValue(N,"modelViewMatrix",U.modelViewMatrix),_t.setValue(N,"normalMatrix",U.normalMatrix),_t.setValue(N,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const dn=V.uniformsGroups;for(let Yn=0,qn=dn.length;Yn<qn;Yn++){const Md=dn[Yn];D.update(Md,mn),D.bind(Md,mn)}}return mn}function Vp(b,I){b.ambientLightColor.needsUpdate=I,b.lightProbe.needsUpdate=I,b.directionalLights.needsUpdate=I,b.directionalLightShadows.needsUpdate=I,b.pointLights.needsUpdate=I,b.pointLightShadows.needsUpdate=I,b.spotLights.needsUpdate=I,b.spotLightShadows.needsUpdate=I,b.rectAreaLights.needsUpdate=I,b.hemisphereLights.needsUpdate=I}function Wp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,I,G){we.get(b.texture).__webglTexture=I,we.get(b.depthTexture).__webglTexture=G;const V=we.get(b);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||Xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,I){const G=we.get(b);G.__webglFramebuffer=I,G.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(b,I=0,G=0){A=b,y=I,E=G;let V=!0,U=null,ee=!1,le=!1;if(b){const Me=we.get(b);if(Me.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(N.FRAMEBUFFER,null),V=!1;else if(Me.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(Me.__hasExternalTextures)C.rebindTextures(b,we.get(b.texture).__webglTexture,we.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const be=b.depthTexture;if(Me.__boundDepthTexture!==be){if(be!==null&&we.has(be)&&(b.width!==be.image.width||b.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}const Ie=b.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(le=!0);const Oe=we.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Oe[I])?U=Oe[I][G]:U=Oe[I],ee=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?U=we.get(b).__webglMultisampledFramebuffer:Array.isArray(Oe)?U=Oe[G]:U=Oe,P.copy(b.viewport),B.copy(b.scissor),F=b.scissorTest}else P.copy(ve).multiplyScalar(W).floor(),B.copy(Ne).multiplyScalar(W).floor(),F=rt;if(Ae.bindFramebuffer(N.FRAMEBUFFER,U)&&V&&Ae.drawBuffers(b,U),Ae.viewport(P),Ae.scissor(B),Ae.setScissorTest(F),ee){const Me=we.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,Me.__webglTexture,G)}else if(le){const Me=we.get(b.texture),Ie=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Me.__webglTexture,G||0,Ie)}v=-1},this.readRenderTargetPixels=function(b,I,G,V,U,ee,le){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=we.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(Se=Se[le]),Se){Ae.bindFramebuffer(N.FRAMEBUFFER,Se);try{const Me=b.texture,Ie=Me.format,Oe=Me.type;if(!$e.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=b.width-V&&G>=0&&G<=b.height-U&&N.readPixels(I,G,V,U,ze.convert(Ie),ze.convert(Oe),ee)}finally{const Me=A!==null?we.get(A).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(b,I,G,V,U,ee,le){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=we.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(Se=Se[le]),Se){const Me=b.texture,Ie=Me.format,Oe=Me.type;if(!$e.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=b.width-V&&G>=0&&G<=b.height-U){Ae.bindFramebuffer(N.FRAMEBUFFER,Se);const be=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,be),N.bufferData(N.PIXEL_PACK_BUFFER,ee.byteLength,N.STREAM_READ),N.readPixels(I,G,V,U,ze.convert(Ie),ze.convert(Oe),0);const Ke=A!==null?we.get(A).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,Ke);const ut=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await a0(N,ut,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,be),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ee),N.deleteBuffer(be),N.deleteSync(ut),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,I=null,G=0){b.isTexture!==!0&&(ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,b=arguments[1]);const V=Math.pow(2,-G),U=Math.floor(b.image.width*V),ee=Math.floor(b.image.height*V),le=I!==null?I.x:0,Se=I!==null?I.y:0;C.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,le,Se,U,ee),Ae.unbindTexture()},this.copyTextureToTexture=function(b,I,G=null,V=null,U=0){b.isTexture!==!0&&(ts("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,b=arguments[1],I=arguments[2],U=arguments[3]||0,G=null);let ee,le,Se,Me,Ie,Oe,be,Ke,ut;const gt=b.isCompressedTexture?b.mipmaps[U]:b.image;G!==null?(ee=G.max.x-G.min.x,le=G.max.y-G.min.y,Se=G.isBox3?G.max.z-G.min.z:1,Me=G.min.x,Ie=G.min.y,Oe=G.isBox3?G.min.z:0):(ee=gt.width,le=gt.height,Se=gt.depth||1,Me=0,Ie=0,Oe=0),V!==null?(be=V.x,Ke=V.y,ut=V.z):(be=0,Ke=0,ut=0);const Kt=ze.convert(I.format),et=ze.convert(I.type);let Te;I.isData3DTexture?(C.setTexture3D(I,0),Te=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(C.setTexture2DArray(I,0),Te=N.TEXTURE_2D_ARRAY):(C.setTexture2D(I,0),Te=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const Dn=N.getParameter(N.UNPACK_ROW_LENGTH),tt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),mn=N.getParameter(N.UNPACK_SKIP_PIXELS),Vi=N.getParameter(N.UNPACK_SKIP_ROWS),tn=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,gt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,gt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Me),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ie),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Oe);const Or=b.isDataArrayTexture||b.isData3DTexture,_t=I.isDataArrayTexture||I.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const En=we.get(b),Fr=we.get(I),dn=we.get(En.__renderTarget),Yn=we.get(Fr.__renderTarget);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,dn.__webglFramebuffer),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let qn=0;qn<Se;qn++)Or&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(b).__webglTexture,U,Oe+qn),b.isDepthTexture?(_t&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(I).__webglTexture,U,ut+qn),N.blitFramebuffer(Me,Ie,ee,le,be,Ke,ee,le,N.DEPTH_BUFFER_BIT,N.NEAREST)):_t?N.copyTexSubImage3D(Te,U,be,Ke,ut+qn,Me,Ie,ee,le):N.copyTexSubImage2D(Te,U,be,Ke,ut+qn,Me,Ie,ee,le);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _t?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(Te,U,be,Ke,ut,ee,le,Se,Kt,et,gt.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Te,U,be,Ke,ut,ee,le,Se,Kt,gt.data):N.texSubImage3D(Te,U,be,Ke,ut,ee,le,Se,Kt,et,gt):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,be,Ke,ee,le,Kt,et,gt.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,be,Ke,gt.width,gt.height,Kt,gt.data):N.texSubImage2D(N.TEXTURE_2D,U,be,Ke,ee,le,Kt,et,gt);N.pixelStorei(N.UNPACK_ROW_LENGTH,Dn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,tt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,mn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Vi),N.pixelStorei(N.UNPACK_SKIP_IMAGES,tn),U===0&&I.generateMipmaps&&N.generateMipmap(Te),Ae.unbindTexture()},this.copyTextureToTexture3D=function(b,I,G=null,V=null,U=0){return b.isTexture!==!0&&(ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,V=arguments[1]||null,b=arguments[2],I=arguments[3],U=arguments[4]||0),ts('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,I,G,V,U)},this.initRenderTarget=function(b){we.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),Ae.unbindTexture()},this.resetState=function(){y=0,E=0,A=null,Ae.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}class $l{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Re(e),this.near=t,this.far=i}clone(){return new $l(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Mf extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class yv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$c,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new L;class Lo{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Cn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new fn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Lo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bf extends _i{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let rr;const Xr=new L,sr=new L,or=new L,ar=new Ue,$r=new Ue,Ef=new pt,Vs=new L,Yr=new L,Ws=new L,Su=new Ue,Ra=new Ue,Mu=new Ue;class vv extends Pt{constructor(e=new bf){if(super(),this.isSprite=!0,this.type="Sprite",rr===void 0){rr=new Zt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new yv(t,5);rr.setIndex([0,1,2,0,2,3]),rr.setAttribute("position",new Lo(i,3,0,!1)),rr.setAttribute("uv",new Lo(i,2,3,!1))}this.geometry=rr,this.material=e,this.center=new Ue(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),sr.setFromMatrixScale(this.matrixWorld),Ef.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),or.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&sr.multiplyScalar(-or.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;Xs(Vs.set(-.5,-.5,0),or,o,sr,r,s),Xs(Yr.set(.5,-.5,0),or,o,sr,r,s),Xs(Ws.set(.5,.5,0),or,o,sr,r,s),Su.set(0,0),Ra.set(1,0),Mu.set(1,1);let a=e.ray.intersectTriangle(Vs,Yr,Ws,!1,Xr);if(a===null&&(Xs(Yr.set(-.5,.5,0),or,o,sr,r,s),Ra.set(0,1),a=e.ray.intersectTriangle(Vs,Ws,Yr,!1,Xr),a===null))return;const c=e.ray.origin.distanceTo(Xr);c<e.near||c>e.far||t.push({distance:c,point:Xr.clone(),uv:on.getInterpolation(Xr,Vs,Yr,Ws,Su,Ra,Mu,new Ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Xs(n,e,t,i,r,s){ar.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?($r.x=s*ar.x-r*ar.y,$r.y=r*ar.x+s*ar.y):$r.copy(ar),n.copy(e),n.x+=$r.x,n.y+=$r.y,n.applyMatrix4(Ef)}class Yl extends _i{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Do=new L,Io=new L,bu=new pt,qr=new Gl,$s=new $o,Pa=new L,Eu=new L;class Tf extends Pt{constructor(e=new Zt,t=new Yl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Do.fromBufferAttribute(t,r-1),Io.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Do.distanceTo(Io);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$s.copy(i.boundingSphere),$s.applyMatrix4(r),$s.radius+=s,e.ray.intersectsSphere($s)===!1)return;bu.copy(r).invert(),qr.copy(e.ray).applyMatrix4(bu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=d.getX(_),w=d.getX(_+1),T=Ys(this,e,qr,c,f,w);T&&t.push(T)}if(this.isLineLoop){const _=d.getX(g-1),m=d.getX(p),f=Ys(this,e,qr,c,_,m);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=Ys(this,e,qr,c,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=Ys(this,e,qr,c,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ys(n,e,t,i,r,s){const o=n.geometry.attributes.position;if(Do.fromBufferAttribute(o,r),Io.fromBufferAttribute(o,s),t.distanceSqToSegment(Do,Io,Pa,Eu)>i)return;Pa.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Pa);if(!(c<e.near||c>e.far))return{distance:c,point:Eu.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const Tu=new L,wu=new L;class Sv extends Tf{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Tu.fromBufferAttribute(t,r),wu.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Tu.distanceTo(wu);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mv extends Yt{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qt extends Zt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const d=[],u=[],h=[],p=[];let g=0;const _=[],m=i/2;let f=0;w(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new Mt(u,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(p,2));function w(){const x=new L,R=new L;let y=0;const E=(t-e)/i;for(let A=0;A<=s;A++){const v=[],M=A/s,P=M*(t-e)+e;for(let B=0;B<=r;B++){const F=B/r,k=F*c+a,H=Math.sin(k),O=Math.cos(k);R.x=P*H,R.y=-M*i+m,R.z=P*O,u.push(R.x,R.y,R.z),x.set(H,E,O).normalize(),h.push(x.x,x.y,x.z),p.push(F,1-M),v.push(g++)}_.push(v)}for(let A=0;A<r;A++)for(let v=0;v<s;v++){const M=_[v][A],P=_[v+1][A],B=_[v+1][A+1],F=_[v][A+1];(e>0||v!==0)&&(d.push(M,P,F),y+=3),(t>0||v!==s-1)&&(d.push(P,B,F),y+=3)}l.addGroup(f,y,0),f+=y}function T(x){const R=g,y=new Ue,E=new L;let A=0;const v=x===!0?e:t,M=x===!0?1:-1;for(let B=1;B<=r;B++)u.push(0,m*M,0),h.push(0,M,0),p.push(.5,.5),g++;const P=g;for(let B=0;B<=r;B++){const k=B/r*c+a,H=Math.cos(k),O=Math.sin(k);E.x=v*O,E.y=m*M,E.z=v*H,u.push(E.x,E.y,E.z),h.push(0,M,0),y.x=H*.5+.5,y.y=O*.5*M+.5,p.push(y.x,y.y),g++}for(let B=0;B<r;B++){const F=R+B,k=P+B;x===!0?d.push(k,k+1,F):d.push(k+1,k,F),A+=3}l.addGroup(f,A,x===!0?1:2),f+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ql extends qt{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new ql(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const qs=new L,js=new L,La=new L,Zs=new on;class bv extends Zt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(mo*t),o=e.getIndex(),a=e.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],d=["a","b","c"],u=new Array(3),h={},p=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:f}=Zs;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),f.fromBufferAttribute(a,l[2]),Zs.getNormal(La),u[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let w=0;w<3;w++){const T=(w+1)%3,x=u[w],R=u[T],y=Zs[d[w]],E=Zs[d[T]],A=`${x}_${R}`,v=`${R}_${x}`;v in h&&h[v]?(La.dot(h[v].normal)<=s&&(p.push(y.x,y.y,y.z),p.push(E.x,E.y,E.z)),h[v]=null):A in h||(h[A]={index0:l[w],index1:l[T],normal:La.clone()})}}for(const g in h)if(h[g]){const{index0:_,index1:m}=h[g];qs.fromBufferAttribute(a,_),js.fromBufferAttribute(a,m),p.push(qs.x,qs.y,qs.z),p.push(js.x,js.y,js.z)}this.setAttribute("position",new Mt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class jl extends Zt{constructor(e=.5,t=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],c=[],l=[],d=[];let u=e;const h=(t-e)/r,p=new L,g=new Ue;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const f=s+m/i*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let _=0;_<r;_++){const m=_*(i+1);for(let f=0;f<i;f++){const w=f+m,T=w,x=w+i+1,R=w+i+2,y=w+1;a.push(T,x,y),a.push(x,R,y)}}this.setIndex(a),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Bi extends Zt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const d=[],u=new L,h=new L,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const w=[],T=f/i;let x=0;f===0&&o===0?x=.5/t:f===i&&c===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const y=R/t;u.x=-e*Math.cos(r+y*s)*Math.sin(o+T*a),u.y=e*Math.cos(o+T*a),u.z=e*Math.sin(r+y*s)*Math.sin(o+T*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),_.push(h.x,h.y,h.z),m.push(y+x,1-T),w.push(l++)}d.push(w)}for(let f=0;f<i;f++)for(let w=0;w<t;w++){const T=d[f][w+1],x=d[f][w],R=d[f+1][w],y=d[f+1][w+1];(f!==0||o>0)&&p.push(T,x,y),(f!==i-1||c<Math.PI)&&p.push(x,R,y)}this.setIndex(p),this.setAttribute("position",new Mt(g,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class jo extends Zt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],c=[],l=[],d=new L,u=new L,h=new L;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),h.subVectors(u,d).normalize(),c.push(h.x,h.y,h.z),l.push(g/r),l.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,f=(r+1)*(p-1)+g,w=(r+1)*p+g;o.push(_,m,w),o.push(m,f,w)}this.setIndex(o),this.setAttribute("position",new Mt(a,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class At extends _i{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hl,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cn extends _i{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hl,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zl extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ev extends Zl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Da=new pt,Cu=new L,Au=new L;class wf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wl,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Cu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cu),Au.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Au),t.updateMatrixWorld(),Da.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Da)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ru=new pt,jr=new L,Ia=new L;class Tv extends wf{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ue(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),jr.setFromMatrixPosition(e.matrixWorld),i.position.copy(jr),Ia.copy(i.position),Ia.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ia),i.updateMatrixWorld(),r.makeTranslation(-jr.x,-jr.y,-jr.z),Ru.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ru)}}class wv extends Zl{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Tv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Cv extends wf{constructor(){super(new gf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ua extends Zl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Cv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Pu=new pt;class Av{constructor(e,t,i=0,r=1/0){this.ray=new Gl(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Vl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Pu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pu),this}intersectObject(e,t=!0,i=[]){return Zc(e,this,i,t),i.sort(Lu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Zc(e[r],this,i,t);return i.sort(Lu),i}}function Lu(n,e){return n.distance-e.distance}function Zc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Zc(s[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Il}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Il);const _o={yaw:0,pitch:.12};let Ks=!1,Na=0,ka=0;const Du=.004,Rv=-.35,Pv=.55;function Iu(){return _o}function Lv(n){n&&(n.addEventListener("mousedown",e=>{e.button===0&&e.target===n&&(Ks=!0,Na=e.clientX,ka=e.clientY,e.preventDefault())}),window.addEventListener("mousemove",e=>{if(!Ks)return;const t=e.clientX-Na,i=e.clientY-ka;Na=e.clientX,ka=e.clientY,_o.yaw-=t*Du,_o.pitch=Math.max(Rv,Math.min(Pv,_o.pitch-i*Du))}),window.addEventListener("mouseup",e=>{e.button===0&&(Ks=!1)}),window.addEventListener("blur",()=>{Ks=!1}))}const wt=108;function Dv(n){return new At({color:new Re().setHSL(n,.15,.35+Math.random()*.15),roughness:.75,metalness:.08})}function Iv(){return new At({color:8961006,emissive:2241348,emissiveIntensity:.35,roughness:.2,metalness:.4})}function Js(n,e,t,i=0){const r=new We;r.name="city-gateway";const s=new At({color:9147032,roughness:.82,metalness:.12}),o=new At({color:12963284,roughness:.55,metalness:.25}),a=32,c=7,l=42,d=8;for(const g of[-l/2+c/2,l/2-c/2]){const _=new ne(new Ve(c,a,d),s);_.position.set(g,a/2,0),_.castShadow=!0,r.add(_);const m=new ne(new Ve(c+1.2,2.5,d+1),o);m.position.set(g,a+1.2,0),r.add(m)}const u=new ne(new Ve(l,5,d+1.5),s);u.position.set(0,a-1.5,0),u.castShadow=!0,r.add(u);const h=new ne(new Ve(l+6,4,d+2),o);h.position.set(0,a+3,0),r.add(h);const p=new ne(new Ve(l*.55,3.5,.4),new At({color:2278750,emissive:1332013,emissiveIntensity:.35}));p.position.set(0,a+3,d/2+.3),r.add(p),e||(r.rotation.y=Math.PI/2),r.position.set(i,0,t),n.add(r)}function Uv(n,e){const t=new At({color:5722958,roughness:.88,metalness:.05}),i=new At({color:16498468,roughness:.5,emissive:4333574,emissiveIntensity:.15}),r=[{cx:-52,cz:12,gap:1.72,len:28,axis:"x",label:"Ultra-tight"},{cx:48,cz:-38,gap:2.05,len:24,axis:"x",label:"Narrow"},{cx:-18,cz:-58,gap:2.45,len:22,axis:"z",label:"Tight"},{cx:62,cz:48,gap:2.85,len:26,axis:"z",label:"Medium"},{cx:-72,cz:-28,gap:1.72,len:20,axis:"x",label:"Ultra-tight"},{cx:28,cz:68,gap:2.05,len:22,axis:"z",label:"Narrow"}];for(const s of r){const c=s.gap*.5,l=s.len*.5;if(s.axis==="x"){for(const u of[-1,1]){const h=s.cx+u*(c+.55),p=new ne(new Ve(1.1,5.5,s.len),t);p.position.set(h,5.5/2,s.cz),p.castShadow=!0,n.add(p),e.push({minX:h-1.1/2,maxX:h+1.1/2,minZ:s.cz-l,maxZ:s.cz+l,alley:!0})}const d=new ne(new Ve(s.gap*.85,.35,.12),i);d.position.set(s.cx,5.5+.6,s.cz-l+1.2),n.add(d)}else{for(const u of[-1,1]){const h=s.cz+u*(c+.55),p=new ne(new Ve(s.len,5.5,1.1),t);p.position.set(s.cx,5.5/2,h),p.castShadow=!0,n.add(p),e.push({minX:s.cx-l,maxX:s.cx+l,minZ:h-1.1/2,maxZ:h+1.1/2,alley:!0})}const d=new ne(new Ve(.12,.35,s.gap*.85),i);d.position.set(s.cx-l+1.2,5.5+.6,s.cz),n.add(d)}}}function Nv(n){const e=new We;e.name="city";const t=[],i=new ne(new Vn(wt*2,wt*2),new At({color:"#2e3238",roughness:.78,metalness:.18}));i.rotation.x=-Math.PI/2,i.position.y=.04,i.receiveShadow=!0,e.add(i);const r=new ne(new jl(wt-4,wt,64),new At({color:"#6b7280",roughness:.85}));r.rotation.x=-Math.PI/2,r.position.y=.03,e.add(r);for(let u=-5;u<=5;u++){const h=new ne(new Vn(wt*2,.35),new At({color:"#d4d4d8"}));h.rotation.x=-Math.PI/2,h.position.set(0,.02,u*18),e.add(h);const p=h.clone();p.rotation.z=Math.PI/2,p.position.set(u*18,.02,0),e.add(p)}const o=(u=>{let h=u;return()=>(h=(h*16807+0)%2147483647,(h-1)/2147483646)})(42);for(let u=-5;u<=5;u++)for(let h=-5;h<=5;h++){if(u===0&&h===0)continue;const p=u*20+(o()-.5)*5,g=h*20+(o()-.5)*5;if(Math.abs(p)<10&&Math.abs(g)<10||Math.abs(p)>wt-18||Math.abs(g)>wt-18)continue;const _=8+o()*8,m=8+o()*8,f=8+o()*28,w=.55+o()*.12,T=new ne(new Ve(_,f,m),Dv(w));T.position.set(p,f/2,g),T.castShadow=!0,T.receiveShadow=!0,e.add(T);const x=new ne(new Ve(_+1.2,.22,m+1.2),new At({color:"#6b7280",roughness:.85}));x.position.set(p,.11,g),x.receiveShadow=!0,e.add(x);const R=Math.floor(f/2.5),y=Math.floor(_/2.2);for(let E=0;E<R;E++)for(let A=0;A<y;A++){if(o()>.72)continue;const v=new ne(new Vn(1.1,1.4),Iv());v.position.set(p-_/2+1.2+A*2.2,1.5+E*2.5,g+m/2+.06),e.add(v)}t.push({minX:p-_/2,maxX:p+_/2,minZ:g-m/2,maxZ:g+m/2,mesh:T})}const a=wt-22,c=wt-22;Js(e,!0,a,0),Js(e,!0,-a,0),Js(e,!1,0,c),Js(e,!1,0,-c),Uv(e,t),n.add(e);function l(u,h,p=0,g=1.15,_=2.25){const{halfX:m,halfZ:f}=hm(p,g,_);if(Math.abs(u)+m>wt||Math.abs(h)+f>wt)return{kind:"wall"};for(const w of t)if(fm(u,h,m,f,w))return{kind:"building",collider:w,alley:w.alley===!0};return null}function d(u,h){return Math.abs(u)<=wt&&Math.abs(h)<=wt}return{group:e,colliders:t,checkCarCollision:l,isInCity:d,worldHalf:wt}}const xt=96,Qs=4,Kc=6;function Oa(n,e){return Math.abs(n)<wt+Kc&&Math.abs(e)<wt+Kc}function kv(n,e){const t=n*xt,i=t+xt,r=e*xt,s=r+xt,o=wt+Kc;return t>=-o&&i<=o&&r>=-o&&s<=o}function Ov(n,e){return(n*73856093^e*19349663)>>>0}function Fv(n){let e=n;return()=>(e=e*1664525+1013904223>>>0,e/4294967295)}function Bv(){const n=new We,e=new ne(new qt(.18,.28,2.2,8),new At({color:4863264,roughness:.9}));e.position.y=1.1,e.castShadow=!0;const t=new ne(new ql(1.4+Math.random()*.8,3.5+Math.random(),8),new At({color:2976562,roughness:.88}));return t.position.y=3.2,t.castShadow=!0,n.add(e,t),n}function zv(){const n=new ne(new Bi(.55+Math.random()*.35,8,8),new At({color:3832382,roughness:.92}));return n.scale.y=.65,n.position.y=.35,n.castShadow=!0,n}function Hv(n,e,t){const i=new We,r=n*xt+xt*.5,s=e*xt+xt*.5,o=(t()-.5)*xt*.6,a=(t()-.5)*xt*.6,c=8+t()*14,l=new ne(new Bi(c,12,10),new At({color:4165444,roughness:.95}));return l.scale.y=.22+t()*.15,l.position.set(r+o,c*l.scale.y*.35,s+a),l.receiveShadow=!0,l.castShadow=!0,i.add(l),i}function Gv(n,e){const t=new We;t.name=`chunk_${n}_${e}`;const i=Fv(Ov(n,e)),r=n*xt,s=e*xt,o=[4037442,4565066,3575610,4894032],a=new ne(new Vn(xt,xt,12,12),new At({color:o[Math.abs(n+e)%o.length],roughness:.94,metalness:.02}));a.rotation.x=-Math.PI/2;const c=a.geometry.attributes.position;for(let u=0;u<c.count;u++){const h=c.getX(u)+r+xt*.5,p=c.getZ(u)+s+xt*.5,g=Math.sin(h*.04)*Math.cos(p*.035)*.35,_=Math.sin(h*.12+p*.08)*.15;c.setY(u,g+_)}c.needsUpdate=!0,a.geometry.computeVertexNormals(),a.position.set(r+xt*.5,-.12,s+xt*.5),a.receiveShadow=!0,t.add(a);const l=4+Math.floor(i()*8);for(let u=0;u<l;u++){const h=r+i()*xt,p=s+i()*xt;if(Oa(h,p))continue;const g=Bv();g.position.set(h,0,p),g.rotation.y=i()*Math.PI*2,t.add(g)}const d=6+Math.floor(i()*10);for(let u=0;u<d;u++){const h=r+i()*xt,p=s+i()*xt;if(Oa(h,p))continue;const g=zv();g.position.set(h,0,p),t.add(g)}if(i()>.45){const u=Hv(n,e,i),h=u.children[0];h&&!Oa(h.position.x,h.position.z)&&t.add(u)}return t}function Vv(n){const e=new We;e.name="countryside",n.add(e);const t=new Map;function i(o,a){return`${o},${a}`}function r(o){const a=t.get(o);a&&(e.remove(a),a.traverse(c=>{var l;c.isMesh&&((l=c.geometry)==null||l.dispose(),c.material&&!Array.isArray(c.material)&&c.material.dispose())}),t.delete(o))}function s(o,a){const c=Math.floor(o/xt),l=Math.floor(a/xt),d=new Set;for(let u=-Qs;u<=Qs;u++)for(let h=-Qs;h<=Qs;h++){const p=c+u,g=l+h;if(kv(p,g))continue;const _=i(p,g);if(d.add(_),!t.has(_)){const m=Gv(p,g);t.set(_,m),e.add(m)}}for(const u of t.keys())d.has(u)||r(u)}return{group:e,update:s}}class Wv extends Mf{constructor(){super();const e=new Ve;e.deleteAttribute("uv");const t=new At({side:$t}),i=new At,r=new wv(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new ne(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new ne(e,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new ne(e,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new ne(e,i);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new ne(e,i);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const d=new ne(e,i);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const u=new ne(e,i);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const h=new ne(e,cr(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const p=new ne(e,cr(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new ne(e,cr(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new ne(e,cr(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const m=new ne(e,cr(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const f=new ne(e,cr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function cr(n){const e=new Yo;return e.color.setScalar(n),e}function Xv(n=document.body){const e=new xv({antialias:!0});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(window.innerWidth,window.innerHeight),e.shadowMap.enabled=!0,e.shadowMap.type=Xh,e.toneMapping=$h,e.toneMappingExposure=1.15,e.outputColorSpace=Qt,e.domElement.id="world-canvas",e.domElement.style.display="none",e.domElement.style.position="fixed",e.domElement.style.inset="0",n.appendChild(e.domElement);const t=new Mf;t.background=new Re("#8fd498"),t.fog=new $l("#a8dcb0",100,420);const i=new qc(e),r=i.fromScene(new Wv,.04).texture;t.environment=r,i.dispose();const s=new sn(52,window.innerWidth/window.innerHeight,.1,800),o=new Ev("#e8f4ff","#4a5a48",.72);t.add(o);const a=new Ua("#fffef5",1.15);a.position.set(30,48,18),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-120,a.shadow.camera.right=120,a.shadow.camera.top=120,a.shadow.camera.bottom=-120,a.shadow.bias=-15e-5,a.shadow.normalBias=.02,t.add(a);const c=new Ua("#c8d8f0",.28);c.position.set(-22,18,-14),t.add(c);const l=new Ua("#fff8e8",.18);l.position.set(-10,8,30),t.add(l);const d=Nv(t),u=Vv(t);u.update(0,0);const h={x:0,z:0,lookY:1.05};let p=0;const g=14,_=9;function m(){const A=window.innerWidth,v=window.innerHeight;s.aspect=A/v,s.updateProjectionMatrix(),e.setSize(A,v)}window.addEventListener("resize",m);function f(A,v,M=0){const P=Iu(),B=M+p+P.yaw,F=P.pitch,k=Math.cos(F)*g,H=A-Math.sin(B)*k,O=v-Math.cos(B)*k,$=_+Math.sin(F)*g*.45;s.position.set(H,$,O),s.lookAt(A,1.2+F*1.5,v)}function w(A,v,M,P=0){h.x+=(A-h.x)*.14,h.z+=(v-h.z)*.14,h.lookY+=(1.05-h.lookY)*.1;const B=Iu(),F=9.5,k=4.6,H=M+B.yaw,O=B.pitch,$=Math.cos(O)*F,W=P>0?(Math.random()-.5)*P*.28:0,te=P>0?(Math.random()-.5)*P*.2:0,se=h.x-Math.sin(H)*$+W,ve=h.z-Math.cos(H)*$+W*.4,Ne=k+Math.sin(O)*F*.32+te;s.position.set(se,Ne,ve),s.lookAt(h.x,h.lookY+te*.25,h.z)}function T(){e.domElement.style.display="block"}function x(){e.domElement.style.display="none"}function R(){e.render(t,s)}function y(A,v){return{x:Math.max(-5e5,Math.min(5e5,A)),z:Math.max(-5e5,Math.min(5e5,v))}}function E(A,v){u.update(A,v);const M=d.isInCity(A,v);t.background.set(M?"#87a8c4":"#8fd498"),t.fog&&(t.fog.color.set(M?"#9eb4c8":"#a8dcb0"),t.fog.near=M?80:100,t.fog.far=M?280:420)}return{scene:t,camera:s,renderer:e,city:d,countryside:u,envTex:r,show:T,hide:x,resize:m,render:R,updateCamera:f,updateDrivingCamera:w,updateWorld:E,clampPosition:y,worldHalf:d.worldHalf}}const Jc=15251594,$v=3900150,Uu=1981066,Nu=1516884;function Uo(n,e=.55){return new At({color:n,roughness:e,metalness:.05})}function Qc(n,e,t){const i=new qt(e,e*.95,n,10);i.translate(0,-n/2,0);const r=new ne(i,Uo(t));return r.castShadow=!0,r}function el(n,e){const t=new ne(new Bi(n,10,10),Uo(e));return t.castShadow=!0,t}function eo(n,e,t,i,r){const s=new We,o=Qc(n,e,r[0]);s.add(o);const a=new We;a.position.y=-n;const c=Qc(t,i,r[1]);a.add(c);const l=el(i*.85,Jc);return l.position.y=-t,a.add(l),s.add(a),{root:s,knee:a}}function Yv(n){const e=new Re(n);return e.multiplyScalar(.75),e.getHex()}function Cf(n=0,e=0,t=$v){const i=Yv(t),r=new We,s=new ne(new qt(.42,.48,1.35,14),Uo(t));s.position.y=1.35,s.castShadow=!0,r.add(s);const o=Qc(.22,.14,Jc);o.position.y=2.05,r.add(o);const a=new ne(new Bi(.38,16,16),Uo(Jc,.48));a.position.y=2.45,a.castShadow=!0,r.add(a);const c=1.95,l=.72,d=.48,u=.28,h=eo(.42,.13,.38,.11,[t,i]);h.root.position.set(-d,c,0),r.add(h.root);const p=el(.14,t);p.position.set(-d,c,0),r.add(p);const g=eo(.42,.13,.38,.11,[i,t]);g.root.position.set(d,c,0),r.add(g.root);const _=el(.14,t);_.position.set(d,c,0),r.add(_);const m=eo(.48,.15,.44,.13,[Nu,Uu]);m.root.position.set(-u,l,0),r.add(m.root);const f=eo(.48,.15,.44,.13,[Uu,Nu]);return f.root.position.set(u,l,0),r.add(f.root),r.position.set(n,0,e),{x:n,z:e,facing:0,walkPhase:0,isMoving:!1,inVehicle:null,dead:!1,mesh:r,limbs:{armL:h,armR:g,legL:m,legR:f}}}function qv(n,e,t,i){const r=Math.hypot(e,t);n.isMoving=r>.01,n.isMoving&&(n.facing=Math.atan2(-e,-t),n.walkPhase+=i*10.5)}function gi(n){const{mesh:e,limbs:t,walkPhase:i,isMoving:r,facing:s}=n;if(n.dead){e.position.set(n.x,.12,n.z),e.rotation.y=s;return}e.position.set(n.x,0,n.z),e.rotation.y=s;const o=r?Math.sin(i):0,a=o*.55,c=o*.42,l=r?.35+Math.max(0,Math.sin(i+.5))*.9:.15,d=r?.35+Math.max(0,Math.sin(i+Math.PI+.5))*.9:.15,u=r?.25+Math.abs(Math.sin(i+Math.PI))*.45:.1,h=r?.25+Math.abs(Math.sin(i))*.45:.1;t.legL.root.rotation.x=a,t.legR.root.rotation.x=-a,t.legL.knee.rotation.x=l,t.legR.knee.rotation.x=d,t.armL.root.rotation.x=-c,t.armR.root.rotation.x=c,t.armL.knee.rotation.x=-u,t.armR.knee.rotation.x=-h;const p=r?Math.abs(Math.sin(i*2))*.06:0;e.position.y=p}function jv(n,e){n.add(e.mesh)}const ku=[{id:"cybertruck",name:"Tesla Cybertruck",year:2024,maker:"Tesla",style:"cybertruck",color:12107204},{id:"model-t",name:"Ford Model T",year:1908,maker:"Ford",style:"vintage",color:1710618},{id:"model-a",name:"Ford Model A",year:1927,maker:"Ford",style:"vintage",color:2969622},{id:"beetle",name:"Volkswagen Beetle",year:1938,maker:"Volkswagen",style:"compact",color:4886745},{id:"jeep-willys",name:"Willys Jeep",year:1941,maker:"Willys",style:"suv",color:4873530},{id:"cadillac-62",name:"Cadillac Series 62",year:1948,maker:"Cadillac",style:"sedan",color:1842204},{id:"mg-td",name:"MG TD",year:1949,maker:"MG",style:"sports",color:9109504},{id:"citroen-2cv",name:"Citroën 2CV",year:1949,maker:"Citroën",style:"compact",color:7048739},{id:"chevy-bel-air",name:"Chevrolet Bel Air",year:1955,maker:"Chevrolet",style:"sedan",color:2003199},{id:"ford-thunderbird",name:"Ford Thunderbird",year:1955,maker:"Ford",style:"sports",color:16777215},{id:"mercedes-300sl",name:"Mercedes-Benz 300 SL",year:1954,maker:"Mercedes-Benz",style:"sports",color:12632256},{id:"mini-cooper",name:"Mini Cooper",year:1959,maker:"Austin",style:"compact",color:11674146},{id:"jaguar-e-type",name:"Jaguar E-Type",year:1961,maker:"Jaguar",style:"sports",color:25600},{id:"vw-bus",name:"Volkswagen Type 2 Bus",year:1962,maker:"Volkswagen",style:"van",color:14329120},{id:"porsche-911",name:"Porsche 911",year:1964,maker:"Porsche",style:"sports",color:9127187},{id:"ford-mustang",name:"Ford Mustang",year:1964,maker:"Ford",style:"sports",color:13369344},{id:"lamborghini-miura",name:"Lamborghini Miura",year:1966,maker:"Lamborghini",style:"sports",color:16766720},{id:"camaro",name:"Chevrolet Camaro",year:1966,maker:"Chevrolet",style:"sports",color:16747520},{id:"corvette-stingray",name:"Chevrolet Corvette Stingray",year:1968,maker:"Chevrolet",style:"sports",color:128},{id:"datsun-240z",name:"Datsun 240Z",year:1969,maker:"Datsun",style:"sports",color:12092939},{id:"citroen-ds",name:"Citroën DS",year:1955,maker:"Citroën",style:"sedan",color:3100495},{id:"lancia-stratos",name:"Lancia Stratos",year:1973,maker:"Lancia",style:"sports",color:16777215},{id:"ferrari-308",name:"Ferrari 308 GTB",year:1975,maker:"Ferrari",style:"sports",color:16711680},{id:"bmw-2002",name:"BMW 2002",year:1968,maker:"BMW",style:"sedan",color:1710638},{id:"delorean",name:"DeLorean DMC-12",year:1981,maker:"DeLorean",style:"sports",color:12632256},{id:"honda-civic",name:"Honda Civic",year:1972,maker:"Honda",style:"compact",color:4620980},{id:"toyota-corolla",name:"Toyota Corolla",year:1966,maker:"Toyota",style:"compact",color:13882323},{id:"land-cruiser",name:"Toyota Land Cruiser",year:1951,maker:"Toyota",style:"suv",color:5597999},{id:"range-rover",name:"Range Rover Classic",year:1970,maker:"Land Rover",style:"suv",color:3050327},{id:"mercedes-g",name:"Mercedes-Benz G-Class",year:1979,maker:"Mercedes-Benz",style:"suv",color:0},{id:"bmw-m3-e30",name:"BMW M3 E30",year:1986,maker:"BMW",style:"sports",color:205},{id:"mazda-miata",name:"Mazda MX-5 Miata",year:1989,maker:"Mazda",style:"sports",color:14423100},{id:"honda-nsx",name:"Honda NSX",year:1990,maker:"Honda",style:"sports",color:16711680},{id:"mclaren-f1",name:"McLaren F1",year:1992,maker:"McLaren",style:"sports",color:16766720},{id:"subaru-impreza",name:"Subaru Impreza WRX",year:1992,maker:"Subaru",style:"sedan",color:139},{id:"toyota-supra",name:"Toyota Supra MK4",year:1993,maker:"Toyota",style:"sports",color:16753920},{id:"dodge-viper",name:"Dodge Viper",year:1992,maker:"Dodge",style:"sports",color:9109504},{id:"hummer-h1",name:"Hummer H1",year:1992,maker:"AM General",style:"suv",color:4017967},{id:"ford-f150",name:"Ford F-150",year:1975,maker:"Ford",style:"truck",color:1722154},{id:"chevy-silverado",name:"Chevrolet Silverado",year:1998,maker:"Chevrolet",style:"truck",color:3100495},{id:"dodge-ram",name:"Ram 1500",year:1981,maker:"Ram",style:"truck",color:0},{id:"tesla-roadster",name:"Tesla Roadster",year:2008,maker:"Tesla",style:"sports",color:11674146},{id:"tesla-model-s",name:"Tesla Model S",year:2012,maker:"Tesla",style:"sedan",color:1842204},{id:"tesla-model-3",name:"Tesla Model 3",year:2017,maker:"Tesla",style:"sedan",color:3100495},{id:"tesla-model-x",name:"Tesla Model X",year:2015,maker:"Tesla",style:"suv",color:1644912},{id:"tesla-model-y",name:"Tesla Model Y",year:2020,maker:"Tesla",style:"suv",color:4620980},{id:"rivian-r1t",name:"Rivian R1T",year:2021,maker:"Rivian",style:"truck",color:5597999},{id:"lucid-air",name:"Lucid Air",year:2021,maker:"Lucid",style:"sedan",color:15263976},{id:"bugatti-chiron",name:"Bugatti Chiron",year:2016,maker:"Bugatti",style:"sports",color:139},{id:"koenigsegg-jesko",name:"Koenigsegg Jesko",year:2019,maker:"Koenigsegg",style:"sports",color:16777215},{id:"porsche-taycan",name:"Porsche Taycan",year:2019,maker:"Porsche",style:"sports",color:3100495},{id:"ford-gt",name:"Ford GT",year:2005,maker:"Ford",style:"sports",color:255},{id:"rolls-phantom",name:"Rolls-Royce Phantom",year:2003,maker:"Rolls-Royce",style:"sedan",color:1710618},{id:"bentley-continental",name:"Bentley Continental GT",year:2003,maker:"Bentley",style:"sports",color:25600},{id:"aston-db5",name:"Aston Martin DB5",year:1963,maker:"Aston Martin",style:"sports",color:12632256},{id:"lamborghini-aventador",name:"Lamborghini Aventador",year:2011,maker:"Lamborghini",style:"sports",color:16729344},{id:"ferrari-laferrari",name:"Ferrari LaFerrari",year:2013,maker:"Ferrari",style:"sports",color:16711680},{id:"pagani-huayra",name:"Pagani Huayra",year:2011,maker:"Pagani",style:"sports",color:7372944},{id:"jeep-wrangler",name:"Jeep Wrangler",year:1986,maker:"Jeep",style:"suv",color:9419919},{id:"ford-bronco",name:"Ford Bronco",year:1966,maker:"Ford",style:"suv",color:13468991},{id:"toyota-hilux",name:"Toyota Hilux",year:1968,maker:"Toyota",style:"truck",color:16777215},{id:"nissan-gtr",name:"Nissan GT-R",year:2007,maker:"Nissan",style:"sports",color:12632256},{id:"audi-quattro",name:"Audi Quattro",year:1980,maker:"Audi",style:"sports",color:16777215},{id:"volvo-240",name:"Volvo 240",year:1974,maker:"Volvo",style:"sedan",color:9139029},{id:"saab-900",name:"Saab 900 Turbo",year:1978,maker:"Saab",style:"sedan",color:3100495},{id:"peugeot-205",name:"Peugeot 205 GTI",year:1984,maker:"Peugeot",style:"compact",color:16711680},{id:"fiat-500",name:"Fiat 500",year:1957,maker:"Fiat",style:"compact",color:8900331},{id:"alfa-giulia",name:"Alfa Romeo Giulia",year:1962,maker:"Alfa Romeo",style:"sedan",color:9109504},{id:"maserati-ghibli",name:"Maserati Ghibli",year:1967,maker:"Maserati",style:"sports",color:1710618},{id:"plymouth-barracuda",name:"Plymouth Barracuda",year:1964,maker:"Plymouth",style:"sports",color:4915330},{id:"dodge-charger",name:"Dodge Charger",year:1966,maker:"Dodge",style:"sedan",color:0},{id:"chevy-impala",name:"Chevrolet Impala",year:1958,maker:"Chevrolet",style:"sedan",color:16777215},{id:"cadillac-escalade",name:"Cadillac Escalade",year:1999,maker:"Cadillac",style:"suv",color:1710618},{id:"lincoln-navigator",name:"Lincoln Navigator",year:1997,maker:"Lincoln",style:"suv",color:3092271},{id:"toyota-prius",name:"Toyota Prius",year:1997,maker:"Toyota",style:"compact",color:4620980},{id:"honda-accord",name:"Honda Accord",year:1976,maker:"Honda",style:"sedan",color:6908265},{id:"hyundai-ioniq5",name:"Hyundai Ioniq 5",year:2021,maker:"Hyundai",style:"suv",color:13882323},{id:"kia-ev6",name:"Kia EV6",year:2021,maker:"Kia",style:"suv",color:3100495},{id:"ford-mach-e",name:"Ford Mustang Mach-E",year:2020,maker:"Ford",style:"suv",color:9109504},{id:"chevy-bolt",name:"Chevrolet Bolt EV",year:2016,maker:"Chevrolet",style:"compact",color:4286945},{id:"bmw-i4",name:"BMW i4",year:2021,maker:"BMW",style:"sedan",color:1710638},{id:"mercedes-eqs",name:"Mercedes-Benz EQS",year:2021,maker:"Mercedes-Benz",style:"sedan",color:0},{id:"genesis-gv80",name:"Genesis GV80",year:2020,maker:"Genesis",style:"suv",color:3100495},{id:"polestar-2",name:"Polestar 2",year:2020,maker:"Polestar",style:"sedan",color:7372944},{id:"vinfast-vf8",name:"VinFast VF8",year:2022,maker:"VinFast",style:"suv",color:4620980},{id:"byd-han",name:"BYD Han",year:2020,maker:"BYD",style:"sedan",color:1710618},{id:"nio-et7",name:"NIO ET7",year:2021,maker:"NIO",style:"sedan",color:3100495},{id:"xpeng-p7",name:"XPeng P7",year:2020,maker:"XPeng",style:"sedan",color:7833753},{id:"renault-5-ev",name:"Renault 5 E-Tech",year:2024,maker:"Renault",style:"compact",color:16766720},{id:"vw-id4",name:"Volkswagen ID.4",year:2020,maker:"Volkswagen",style:"suv",color:3050327},{id:"skoda-enyaq",name:"Škoda Enyaq",year:2020,maker:"Škoda",style:"suv",color:5597999},{id:"seat-leon",name:"SEAT León",year:1999,maker:"SEAT",style:"compact",color:16737095},{id:"opel-gt",name:"Opel GT",year:1968,maker:"Opel",style:"sports",color:16766720},{id:"triumph-spitfire",name:"Triumph Spitfire",year:1962,maker:"Triumph",style:"sports",color:25600},{id:"lotus-elise",name:"Lotus Elise",year:1996,maker:"Lotus",style:"sports",color:16766720},{id:"caterham-7",name:"Caterham Seven",year:1973,maker:"Caterham",style:"sports",color:16776960},{id:"shelby-cobra",name:"Shelby Cobra",year:1962,maker:"Shelby",style:"sports",color:255},{id:"ford-gt40",name:"Ford GT40",year:1964,maker:"Ford",style:"sports",color:255},{id:"porsche-917",name:"Porsche 917",year:1969,maker:"Porsche",style:"sports",color:16766720},{id:"ferrari-250gto",name:"Ferrari 250 GTO",year:1962,maker:"Ferrari",style:"sports",color:16711680},{id:"bugatti-type57",name:"Bugatti Type 57",year:1934,maker:"Bugatti",style:"vintage",color:1710618},{id:"rolls-silver-ghost",name:"Rolls-Royce Silver Ghost",year:1906,maker:"Rolls-Royce",style:"vintage",color:3100495},{id:"packard-eight",name:"Packard Eight",year:1924,maker:"Packard",style:"vintage",color:1710618},{id:"tucker-48",name:"Tucker 48",year:1948,maker:"Tucker",style:"sedan",color:9109504},{id:"studebaker-avanti",name:"Studebaker Avanti",year:1962,maker:"Studebaker",style:"sports",color:9127187},{id:"amc-gremlin",name:"AMC Gremlin",year:1970,maker:"AMC",style:"compact",color:2263842},{id:"pontiac-firebird",name:"Pontiac Firebird",year:1967,maker:"Pontiac",style:"sports",color:16729344},{id:"buick-riviera",name:"Buick Riviera",year:1963,maker:"Buick",style:"sedan",color:128},{id:"oldsmobile-442",name:"Oldsmobile 442",year:1964,maker:"Oldsmobile",style:"sedan",color:9109504},{id:"isuzu-trooper",name:"Isuzu Trooper",year:1981,maker:"Isuzu",style:"suv",color:5597999},{id:"mitsubishi-pajero",name:"Mitsubishi Pajero",year:1981,maker:"Mitsubishi",style:"suv",color:9127187},{id:"suzuki-jimny",name:"Suzuki Jimny",year:1970,maker:"Suzuki",style:"suv",color:3050327},{id:"daihatsu-copen",name:"Daihatsu Copen",year:2002,maker:"Daihatsu",style:"compact",color:16738740},{id:"proton-saga",name:"Proton Saga",year:1985,maker:"Proton",style:"compact",color:12632256},{id:"tata-nano",name:"Tata Nano",year:2008,maker:"Tata",style:"compact",color:16766720},{id:"mahindra-thar",name:"Mahindra Thar",year:2010,maker:"Mahindra",style:"suv",color:9109504},{id:"lada-niva",name:"Lada Niva",year:1977,maker:"Lada",style:"suv",color:3050327},{id:"uaz-469",name:"UAZ-469",year:1972,maker:"UAZ",style:"suv",color:5597999},{id:"zastava-yugo",name:"Zastava Yugo",year:1980,maker:"Zastava",style:"compact",color:16711680},{id:"trabant",name:"Trabant 601",year:1964,maker:"Trabant",style:"compact",color:8900331},{id:"wartburg-353",name:"Wartburg 353",year:1966,maker:"Wartburg",style:"sedan",color:9127187},{id:"skoda-favorit",name:"Škoda Favorit",year:1987,maker:"Škoda",style:"compact",color:13882323},{id:"dacia-logan",name:"Dacia Logan",year:2004,maker:"Dacia",style:"sedan",color:4620980},{id:"geely-coolray",name:"Geely Coolray",year:2019,maker:"Geely",style:"suv",color:1710618},{id:"great-wall-haval",name:"Haval H6",year:2011,maker:"Haval",style:"suv",color:3100495},{id:"chery-tiggo",name:"Chery Tiggo",year:2005,maker:"Chery",style:"suv",color:7372944}];let Nt=null,to=null;function Ou(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function Zv(n){to=n;const e=document.createElement("button");e.type="button",e.id="garage-box",e.className="garage-box",e.title="Open car garage",e.innerHTML=`
    <img src="./cybertruck.svg" alt="Tesla Cybertruck" width="120" height="72" />
    <span class="garage-label">GARAGE</span>
  `,e.addEventListener("click",()=>Kl()),document.body.appendChild(e),Nt=document.createElement("div"),Nt.id="car-garage",Nt.innerHTML=`
    <div class="garage-panel">
      <header class="garage-header">
        <h1>Every car in the world</h1>
        <p>Click a car to spawn it — you jump into the driver seat.</p>
        <input type="search" class="garage-search" id="garage-search" placeholder="Search cars..." />
      </header>
      <div class="garage-grid" id="garage-grid"></div>
      <button type="button" class="garage-close" id="garage-close">Close</button>
    </div>
  `,document.body.appendChild(Nt);const t=Nt.querySelector("#garage-grid");for(const i of ku){const r=document.createElement("button");r.type="button",r.className="garage-car",r.dataset.id=i.id,r.dataset.search=`${i.name} ${i.maker} ${i.year}`.toLowerCase(),r.innerHTML=`
      <span class="garage-car-year">${i.year}</span>
      <span class="garage-car-name">${Ou(i.name)}</span>
      <span class="garage-car-maker">${Ou(i.maker)}</span>
    `,r.addEventListener("click",()=>{const s=ku.find(o=>o.id===i.id);s&&(Fu(),to==null||to(s))}),t.appendChild(r)}return Nt.querySelector("#garage-close").addEventListener("click",Fu),Nt.querySelector("#garage-search").addEventListener("input",i=>{const r=i.target.value.trim().toLowerCase();t.querySelectorAll(".garage-car").forEach(s=>{s.hidden=r.length>0&&!s.dataset.search.includes(r)})}),{box:e,overlay:Nt}}function Kl(){Nt&&(Nt.style.display="flex",Nt.querySelector("#garage-search").value="",Nt.querySelectorAll(".garage-car").forEach(n=>{n.hidden=!1}))}function Fu(){Nt&&(Nt.style.display="none")}function tl(){return(Nt==null?void 0:Nt.style.display)==="flex"}function ai(n){const e=document.getElementById("garage-box");e&&(e.hidden=!n)}const Bu={sedan:{length:4.55,width:1.88,ride:.52,cabinH:.82,cabinLen:1.85,hoodLen:1.55,wheelR:.36,wheelX:.86,wheelZ:1.36,grille:!0,chromeTrim:!0},sports:{length:4.15,width:1.92,ride:.38,cabinH:.52,cabinLen:1.42,hoodLen:1.62,wheelR:.34,wheelX:.9,wheelZ:1.22,low:!0,spoiler:!0,wideHips:!0},suv:{length:4.65,width:2.02,ride:.72,cabinH:.98,cabinLen:2.55,hoodLen:1.15,wheelR:.4,wheelX:.92,wheelZ:1.48,roofRails:!0,upright:!0},truck:{length:5.4,width:2.05,ride:.78,cabinH:.82,cabinLen:1.55,hoodLen:1.05,wheelR:.42,wheelX:.96,wheelZ:1.38,bedLen:2.45,bed:!0},compact:{length:3.35,width:1.62,ride:.46,cabinH:.68,cabinLen:1.65,hoodLen:.85,wheelR:.32,wheelX:.72,wheelZ:1.05},vintage:{length:3.85,width:1.72,ride:.68,cabinH:.62,cabinLen:1.45,hoodLen:1.1,wheelR:.36,wheelX:.78,wheelZ:1.2,fenders:!0,tall:!0},van:{length:4.55,width:1.92,ride:.95,cabinH:1.38,cabinLen:3.2,hoodLen:.55,wheelR:.37,wheelX:.88,wheelZ:1.38,flatFront:!0},cybertruck:{bodyShape:"cybertruck"}},Kv={cybertruck:{bodyShape:"cybertruck"},beetle:{bodyShape:"round",length:3.25,width:1.58,ride:.5,roundH:1.02},"citroen-2cv":{bodyShape:"round",length:3.45,width:1.48,ride:.48,roundH:.95,softTop:!0},"fiat-500":{bodyShape:"round",length:2.95,width:1.42,ride:.42,roundH:.88},"vw-bus":{bodyShape:"flat-van",length:4.55,width:1.88,ride:1.05,splitWindshield:!0},"porsche-911":{bodyShape:"911",length:4.35,width:1.9,ride:.4,rearHump:!0,roundLights:!0},"ford-mustang":{bodyShape:"fastback",length:4.55,width:1.92,hoodLen:1.75,fastback:!0,scoop:!0},"dodge-charger":{bodyShape:"fastback",length:4.85,width:1.98,hoodLen:1.7,fastback:!0,muscle:!0},"chevy-camaro":{bodyShape:"fastback",length:4.45,width:1.9,hoodLen:1.65,fastback:!0},camaro:{bodyShape:"fastback",length:4.45,width:1.9,hoodLen:1.65,fastback:!0},delorean:{bodyShape:"wedge",stainless:!0,length:4.2,width:1.85,ride:.42,gullwing:!0},"lamborghini-aventador":{bodyShape:"supercar",length:4.55,width:2.05,ride:.32,scissor:!0,wide:!0},"lamborghini-miura":{bodyShape:"supercar",length:4.35,width:1.92,ride:.34},"ferrari-308":{bodyShape:"supercar",length:4.25,width:1.88,ride:.35,roundLights:!0},"bugatti-chiron":{bodyShape:"supercar",length:4.55,width:2.08,ride:.3,wide:!0,horseshoe:!0},"jeep-wrangler":{bodyShape:"box-suv",length:4.2,width:1.88,ride:.82,spare:!0,roundLights:!0,upright:!0},"mercedes-g":{bodyShape:"box-suv",length:4.55,width:1.95,ride:.88,boxy:!0,spare:!1},"hummer-h1":{bodyShape:"box-suv",length:4.85,width:2.15,ride:.95,wide:!0,military:!0},"model-t":{bodyShape:"vintage-tall",length:3.35,width:1.55,ride:.82,tall:!0,spoked:!0},"rolls-silver-ghost":{bodyShape:"vintage-tall",length:4.85,width:1.82,ride:.95,tall:!0,longHood:!0},"tesla-model-s":{bodyShape:"ev-sedan",length:4.75,width:1.92,ride:.48,smooth:!0,noGrille:!0},"tesla-model-3":{bodyShape:"ev-sedan",length:4.55,width:1.85,ride:.45,smooth:!0,noGrille:!0},"tesla-model-x":{bodyShape:"ev-suv",length:4.75,width:2,ride:.72,falcon:!0,noGrille:!0},"tesla-model-y":{bodyShape:"ev-suv",length:4.65,width:1.92,ride:.68,smooth:!0,noGrille:!0},"tesla-roadster":{bodyShape:"supercar",length:4,width:1.88,ride:.34,smooth:!0,noGrille:!0},"rivian-r1t":{bodyShape:"ev-truck",length:5.35,width:2.05,ride:.82,bed:!0,roundLights:!0},"ford-f150":{bodyShape:"truck",length:5.55,width:2.08,ride:.82,bedLen:2.55,chromeGrille:!0},"dodge-ram":{bodyShape:"truck",length:5.65,width:2.1,ride:.85,bedLen:2.6,tallGrille:!0},"mercedes-300sl":{bodyShape:"gullwing",length:4.35,width:1.82,ride:.42,gullwing:!0},"jaguar-e-type":{bodyShape:"fastback",length:4.45,width:1.78,hoodLen:1.85,longNose:!0},"vw-id4":{bodyShape:"ev-suv",length:4.55,width:1.92,ride:.7,smooth:!0},"renault-5-ev":{bodyShape:"round",length:3.55,width:1.65,ride:.48,roundH:.82,retro:!0},"mini-cooper":{bodyShape:"round",length:3.55,width:1.62,ride:.44,roundH:.72},"ford-gt":{bodyShape:"supercar",length:4.35,width:1.95,ride:.33,stripe:!0},"ford-gt40":{bodyShape:"supercar",length:4.15,width:1.92,ride:.32,stripe:!0},"aston-db5":{bodyShape:"fastback",length:4.45,width:1.82,hoodLen:1.55,elegant:!0},"rolls-phantom":{bodyShape:"luxury-sedan",length:5.35,width:2,ride:.58,tall:!0,longHood:!0},"cadillac-escalade":{bodyShape:"luxury-suv",length:5.05,width:2.05,ride:.78,chromeGrille:!0},trabant:{bodyShape:"round",length:3.25,width:1.48,ride:.46,roundH:.78,twoStroke:!0},"toyota-prius":{bodyShape:"hybrid",length:4.35,width:1.78,ride:.5,wedgeRear:!0},"hyundai-ioniq5":{bodyShape:"ev-suv",length:4.55,width:1.92,ride:.68,pixelLights:!0,retro:!0}};function Af(n){const e=n.style??"sedan",t={...Bu[e]??Bu.sedan},i=Kv[n.id]??{},r={...t,...i,id:n.id,name:n.name,style:e,color:n.color??(e==="sedan"?13219990:12107204),year:n.year??2e3,maker:n.maker??""};return r.bodyShape||(r.bodyShape=e),r}function hi(n){return new cn({color:n,flatShading:!0})}function it(n=1710618){return new cn({color:n,flatShading:!0})}function ys(){return new cn({color:14540253,flatShading:!0})}function Jv(){return new cn({color:1315860,flatShading:!0})}function Qv(){return new cn({color:9357544,flatShading:!0,transparent:!0,opacity:.62,side:wn,depthWrite:!1})}function nl(){return new cn({color:16777164,emissive:16772761,emissiveIntensity:.55,flatShading:!0})}function eS(){return new cn({color:16724787,emissive:16716049,emissiveIntensity:.65,flatShading:!0})}function tS(){return new cn({color:1118481,flatShading:!0})}function il(n=12107204){return new cn({color:n,flatShading:!0})}function _e(n,e,t,i){const r=new ne(new Ve(n,e,t),i);return r.castShadow=!0,r.receiveShadow=!0,r}function zu(n,e,t,i=8){const r=new ne(new qt(n,n,e,i),t);return r.castShadow=!0,r.receiveShadow=!0,r}const nS=new Yl({color:1118481});function iS(n){return n.userData.skipBlockEdges=!0,n}function rS(n,e=12){if(!(n!=null&&n.geometry)||n.userData.hasBlockEdges||n.userData.skipBlockEdges)return n;const t=new bv(n.geometry,e),i=new Sv(t,nS);return i.renderOrder=1,n.add(i),n.userData.hasBlockEdges=!0,n}function Jl(n){n.traverse(e=>{e.isMesh&&e.geometry&&!e.userData.skipBlockEdges&&rS(e)})}function Rf(n){return new cn({color:n,flatShading:!0})}function yn(n,e,t,i,r={}){const s=new We;i&&sS(s,i,r);const o=_e(n,e,t,Qv());iS(o),o.renderOrder=2,s.add(o);const a=.05,c=it(1315860),l=_e(n+a*2,a,t+a,c);l.position.y=e/2+a/2;const d=l.clone();d.position.y=-e/2-a/2;const u=_e(a,e,t,c);u.position.x=-n/2-a/2;const h=u.clone();return h.position.x=n/2+a/2,s.add(l,d,u,h),s}function sS(n,e,t={}){return n.userData.carPart=e,t.detachable!==!1&&(n.userData.detachable=!0),n}const Fa=it(2762016),oS=it(1316896),Hu=it(13421772);function aS(n,e={x:.32,y:.78,z:.05}){const t=new We;t.name="cockpit";const i=new ne(new Ve(1.45,.38,.55),oS);i.position.set(.05,e.y+.08,e.z+.42),i.rotation.x=-.35,t.add(i);const r=new ne(new Ve(.42,.18,.06),new cn({color:660768,emissive:2245734,emissiveIntensity:.35,flatShading:!0}));r.position.set(.12,e.y+.22,e.z+.52),r.rotation.x=-.35,t.add(r);const s=new We,o=new ne(new jo(.17,.028,8,16),Hu);o.rotation.x=Math.PI/2;const a=new ne(new Ve(.3,.025,.04),Hu);s.add(o,a),s.position.set(e.x,e.y+.02,e.z+.28),s.rotation.x=-.55,t.add(s);const c=new ne(new Ve(.42,.12,.42),Fa);c.position.set(e.x,e.y-.08,e.z);const l=new ne(new Ve(.4,.45,.1),Fa);l.position.set(e.x,e.y+.12,e.z-.16),l.rotation.x=-.2;const d=new ne(new Ve(.22,.18,.08),Fa);return d.position.set(e.x,e.y+.38,e.z-.18),t.add(c,l,d),n.add(t),Jl(t),t}function cS(n,e={x:.32,y:.78,z:.05}){const t=new We;t.name="engine",t.userData.carPart="engine",t.userData.detachable=!0;const i=it(3816002),r=new ne(new Ve(.72,.42,.85),i);r.position.y=.21,r.castShadow=!0;const s=new ne(new Ve(.55,.22,.48),it(2763314));s.position.set(0,.48,.12);const o=new ne(new Ve(.62,.08,.35),it(5592416));o.position.set(0,.38,-.22);for(const a of[-.18,.18]){const c=new ne(new qt(.06,.06,.2,8),it(4868693));c.position.set(a,.52,.05),t.add(c)}return t.add(r,s,o),t.position.set(.02,e.y-.42,e.z+.55),n.add(t),Jl(t),t}function lS(n){const e=n.userData.wheels??[];for(const t of e)t.userData.baseY=t.position.y,t.userData.baseX=t.position.x,t.userData.steerable=String(t.userData.carPart??"").includes("_f")}function dS(n,e){e&&n.traverse(t=>{if(!t.isMesh||!t.material)return;const i=Array.isArray(t.material)?t.material:[t.material];for(const r of i)r.isMeshLambertMaterial&&(r.envMap=null,r.needsUpdate=!0)})}function ft(n,e,t={}){return n.userData.carPart=e,t.detachable!==!1&&(n.userData.detachable=!0),t.dentPanel&&(n.userData.dentPanel=t.dentPanel===!0?"front":t.dentPanel),n}function uS(n){let e=0;n.traverse(t=>{var r;if(t===n||((r=t.userData)==null?void 0:r.carPart)!=null||t.isLineSegments||t.type==="LineSegments"||!t.isMesh&&!t.isGroup||t.isGroup&&t.children.length===0)return;let i=`panel_${e++}`;if(t.name==="engine")i="engine";else if(t.name==="cockpit")i="cockpit";else if(t.name==="cracks")return;ft(t,i)})}function No(n,e={x:.32,y:.78,z:.05}){if(n.userData.driverSeat=e,!n.userData.wheels){const t=[];n.traverse(i=>{var r;(r=i.userData)!=null&&r.isWheel&&t.push(i)}),n.userData.wheels=t}return aS(n,e),cS(n,e),lS(n),uS(n),Jl(n),n}function hS(n,e){return dS(n,e),n}function Ql(n=.36){const e=new We;e.userData.isWheel=!0;const t=zu(n,.3,Jv(),8);t.rotation.z=Math.PI/2;const i=zu(n*.55,.22,it(5592405),8);return i.rotation.z=Math.PI/2,e.add(t,i),e}function rl(n,e){const t=[],i=e.wheelR??.36,r=e.wheelX??.86,s=e.wheelZ??1.36;for(const[o,a,c]of[[-r,s,"wheel_fl"],[r,s,"wheel_fr"],[-r,-s,"wheel_rl"],[r,-s,"wheel_rr"]]){const l=Ql(i);l.position.set(o,i,a),l.userData.carPart=c,l.userData.detachable=!0,n.add(l),t.push(l)}n.userData.wheels=t}function yr(n,e,t,i,r,s,o){const a=_e(e,t,i,tS());a.position.set(r,s,o),n.add(a)}function sl(n,e,t,i){const r=e.ride+.1,s=e.width*.44;for(const o of[-s,s]){const a=new We,c=_e(.32,.24,.16,it()),l=_e(.28,.18,.08,nl());l.position.z=.08,a.add(c,l),a.position.set(o,r,t),n.add(ft(a,"headlight"));const d=new We;d.add(_e(.34,.2,.14,it(3342336)));const u=_e(.28,.16,.06,eS());u.position.z=.07,d.add(u),d.position.set(o,r+.04,i),n.add(ft(d,"taillight"))}if(e.pixelLights)for(const o of[-e.width*.18,e.width*.18]){const a=_e(.12,.12,.08,nl());a.position.set(o,r-.04,t),n.add(a)}}function ol(n,e,t,i){const r=(s,o)=>{const a=o==="bumper_front",c=ft(_e(e.width*.98,.22,.28,it(2236962)),o,{dentPanel:a});return c.position.set(0,e.ride*.28,s),c};n.add(r(t+.06,"bumper_front"),r(i-.06,"bumper_rear"))}function al(n,e,t){if(e.noGrille){const r=_e(e.width*.68,.1,.12,it(1118481));r.position.set(0,e.ride*.36,t),n.add(r);return}const i=ft(_e(e.width*.52,.42,.14,it(657930)),"grille");i.position.set(0,e.ride*.4,t),n.add(i);for(let r=-2;r<=2;r++){const s=_e(.05,.36,.06,ys());s.position.set(r*e.width*.1,e.ride*.4,t+.02),n.add(s)}}function cl(n,e,t){for(const[i,r]of[[-e.width*.52,"mirror_l"],[e.width*.52,"mirror_r"]]){const s=_e(.06,.05,.1,it());s.position.set(i*.92,e.ride+e.cabinH*.56,t+e.cabinLen*.18),n.add(s);const o=ft(_e(.16,.12,.1,it()),r);o.position.set(i,e.ride+e.cabinH*.58,t+e.cabinLen*.22),n.add(o)}}function fS(n,e,t){const i=e.width*.5;for(const r of[-i*.88,i*.88]){const s=_e(.14,.04,.06,ys());s.position.set(r,e.ride+e.cabinH*.28,t+e.cabinLen*.05),n.add(s)}}function ll(n,e,t,i){const r=e.width,s=e.ride,o=e.cabinH??.82,a=e.cabinLen??1.85,c=r*.5,l=o*.36,d=o*.46,u=t,h=a*.74,p=s+l+d*.5+.02,g=_e(r*.86,.12,a*.9,it(1710618));g.position.set(0,s+.06,t),n.add(g);for(const[x,R,y]of[[-c,"door_l","window_l"],[c,"door_r","window_r"]]){const E=_e(.14,l,a*.88,i);E.position.set(x*.9,s+l*.5,t),n.add(E);const A=ft(_e(.12,l+d*.15,a*.44,i),R);A.position.set(x,s+l*.55,t),n.add(A);const v=yn(.1,d,h,y);v.position.set(x*.97,p,u),n.add(v);const M=_e(.1,o*.62,.14,i);M.position.set(x*.9,s+o*.38,t+a*.38),n.add(M);const P=M.clone();P.position.z=t-a*.38,n.add(P)}const _=_e(r*.88,.05,a*.82,ys());_.position.set(0,s+l+.02,t),n.add(_);const m=_e(r*.84,.16,a*.9,i);m.position.set(0,s+o*.72,t),n.add(m);const f=e.upright?-.34:-.42,w=yn(r*.72,o*.52,.12,"windshield");w.position.set(0,s+o*.5,t+a*.34),w.rotation.x=f,n.add(w);const T=yn(r*.66,o*.4,.1,"rear_glass");T.position.set(0,s+o*.48,t-a*.36),T.rotation.x=.38,n.add(T);for(const x of[-r*.22,r*.22]){const R=yn(.08,o*.28,.1,null);R.position.set(x,s+o*.52,t+a*.42),R.rotation.y=x<0?.42:-.42,n.add(R)}fS(n,e,t)}function Pf(n){return n.length*.5-.12}function Lf(n){return-n.length*.5+.12}function pS(n,e){const t=hi(e.color),i=e.length,r=e.width,s=e.ride,o=e.hoodLen??i*.34,a=e.cabinLen??i*.4,c=Math.max(.5,i-o-a-.12),l=e.cabinH??.82,d=.44,u=.4,h=(c-o)*.5,p=Pf(e),g=Lf(e),_=_e(r,.26,i*.92,it(1710618));_.position.set(0,s*.38,0),n.add(_);const m=i*.5-o*.5-.06,f=ft(_e(r*.96,d,o,t),"hood",{dentPanel:!0});f.position.set(0,s+d*.5+.06,m),n.add(f);for(const x of[-1,1]){const R=_e(.18,d*.75,o*.82,t);R.position.set(x*r*.49,s+d*.42,m),n.add(R)}ll(n,e,h,t);const w=-i*.5+c*.5+.1,T=_e(r*.92,u,c,t);return T.position.set(0,s+u*.5+.06,w),n.add(T),yr(n,r*.94,.05,.08,0,s+.04,m-o*.5-.02),yr(n,r*.94,.05,.08,0,s+l*.12,h+a*.5+.02),yr(n,r*.94,.05,.08,0,s+.04,w+c*.5+.02),al(n,e,p),sl(n,e,p+.04,g),ol(n,e,p+.1,g-.1),cl(n,e,h*.25),rl(n,e),No(n,{x:r*.17,y:s+.42,z:.02})}function mS(n,e,t){const i=e.roundH??.9,r=e.cabinZ??-.05,s=[{w:.92,h:.22,d:.88,y:.18},{w:.98,h:.28,d:.95,y:.38},{w:1,h:.32,d:1,y:.58},{w:.95,h:.28,d:.92,y:.78},{w:.82,h:.22,d:.78,y:.95}];for(const c of s){const l=_e(e.width*c.w,i*c.h,e.length*c.d*.55,t);l.position.set(0,e.ride+i*c.y,r),n.add(l)}const o=ft(_e(e.width*.88,i*.2,e.hoodLen??.85,t),"hood",{dentPanel:!0});o.position.set(0,e.ride+i*.22,e.length*.32),n.add(o);const a=_e(e.width*.86,i*.18,.65,t);a.position.set(0,e.ride+i*.2,-e.length*.32),n.add(a)}function gS(n){var t;const e=n.bodyShape??n.style;return e==="sedan"||e==="ev-sedan"||e==="luxury-sedan"||e==="hybrid"||e==="compact"&&!((t=n.bodyShape)!=null&&t.includes("round"))}function _S(n){if(gS(n)&&n.bodyShape!=="round"&&n.bodyShape!=="fastback"&&n.bodyShape!=="supercar")return pS(new We,n);const e=new We,t=hi(n.color),i=hi(n.color),r=n.length,s=n.width,o=n.ride,a=n.cabinH??.72,c=n.cabinLen??2,l=n.hoodLen??1.2,d=n.cabinZ??-.08,u=Pf(n),h=Lf(n);if(n.bodyShape==="round")return mS(e,n,t),ll(e,n,d,t),al(e,n,u),sl(e,n,u+.04,h),ol(e,n,u+.1,h-.1),cl(e,n,d*.2),rl(e,n),No(e,{x:s*.15,y:o+.42,z:0});const p=_e(s,.28,r*.9,it(1710618));p.position.set(0,o*.4,0),e.add(p);const g=r*.5-l*.5-.1,_=ft(_e(s*.96,.2,l,t),"hood",{dentPanel:!0});_.position.set(0,o+.12,g),e.add(_);for(const x of[-1,1]){const R=_e(.22,.38,l*.78,t);R.position.set(x*s*.48,o+.18,g),e.add(R)}const m=_e(s*.24,a*.5,c*.85,t);if(m.position.set(0,o+a*.34,d),e.add(m),yr(e,s*.94,.05,.08,0,o+.08,g-l*.5-.02),yr(e,s*.94,.05,.08,0,o+a*.3,d+c*.5+.02),n.fastback||n.bodyShape==="fastback"||n.bodyShape==="supercar"||n.bodyShape==="gullwing"){const x=ft(_e(s*.9,a*.52,1.05,t),"trunk");x.position.set(0,o+a*.42,-r*.5+.7),x.rotation.x=-.5,e.add(x)}else if(n.bodyShape!=="truck"&&n.bodyShape!=="ev-truck"&&!n.bed&&n.bodyShape!=="flat-van"){const x=Math.max(.55,r-l-c-.3),R=-r*.5+x*.5+.14,y=_e(s*.92,.22,x,t);y.position.set(0,o+.14,R),e.add(y),yr(e,s*.94,.05,.08,0,o+.08,R+x*.5+.02)}if(n.bodyShape==="supercar"||n.low){const x=ft(_e(s*.92,.16,l*.92,t),"front_panel",{dentPanel:!0});if(x.position.set(0,o+.06,g+.06),e.add(x),n.wide)for(const R of[-1,1]){const y=_e(.24,.24,.95,t);y.position.set(R*s*.48,o+.22,-r*.22),e.add(y)}}if(n.rearHump||n.bodyShape==="911"){const x=_e(s*.9,.32,.88,t);x.position.set(0,o+.42,-r*.32),e.add(x)}if(n.bodyShape==="wedge"||n.stainless){const x=n.stainless?il(n.color):t,R=_e(s*.92,o*.74,r*.88,x);R.position.set(0,o*.5,0),e.add(R)}if(n.bodyShape==="box-suv"||n.upright||n.style==="suv"||n.bodyShape==="ev-suv"||n.bodyShape==="luxury-suv"){const x=_e(s*.22,a*.65,c*1.05,t);x.position.set(0,o+a*.4,d),e.add(x);const R=a*.55;for(const[A,v]of[[-s*.5,"window_l"],[s*.5,"window_r"]]){const M=yn(.12,R,c*.88,v);M.position.set(A*.97,o+a*.48,d),e.add(ft(M,v))}const y=_e(s*.88,.2,c*.95,t);y.position.set(0,o+a*.82,d),e.add(y);const E=yn(s*.76,a*.42,.12,"windshield");E.position.set(0,o+a*.55,d+c*.38),E.rotation.x=-.32,e.add(ft(E,"windshield"))}if(n.bed||n.bodyShape==="truck"||n.bodyShape==="ev-truck"){const x=n.bedLen??2.4,R=-r*.5+x*.5+.22,y=_e(s*.94,.24,x,i);y.position.set(0,o*.56,R),e.add(y);for(const A of[-s*.46,s*.46]){const v=_e(.14,.54,x,t);v.position.set(A,o+.4,R),e.add(v)}const E=_e(s*.92,.54,.14,t);E.position.set(0,o+.4,R-x*.5-.05),e.add(E)}if(n.bodyShape==="flat-van"||n.style==="van"){const x=_e(s*.94,a*.45,r*.82,t);x.position.set(0,o+a*.28,-.05),e.add(x);const R=ft(_e(s*.92,.2,r*.8,t),"body",{dentPanel:!0});R.position.set(0,o+a*.78,-.05),e.add(R);for(const[y,E]of[[-s*.5,"window_l"],[s*.5,"window_r"]]){const A=yn(.12,a*.72,r*.62,E);A.position.set(y*.97,o+a*.52,-.05),e.add(ft(A,E))}if(n.splitWindshield)for(const[y,E]of[[-s*.2,.14],[s*.2,-.14]]){const A=yn(s*.34,a*.48,.12,"windshield");A.position.set(y,o+a*.56,u-.16),A.rotation.y=E,e.add(ft(A,"windshield"))}else{const y=yn(s*.7,a*.5,.12,"windshield");y.position.set(0,o+a*.54,u-.12),y.rotation.x=-.2,e.add(ft(y,"windshield"))}}if(n.spare){const x=Ql(.32);x.position.set(0,o+.5,h-.14),e.add(x)}if(n.bodyShape==="box-suv"||n.upright||n.style==="suv"||n.bodyShape==="ev-suv"||n.bodyShape==="luxury-suv"||n.bodyShape==="flat-van"||n.style==="van"||ll(e,n,d,t),al(e,n,u),sl(e,n,u+.04,h),ol(e,n,u+.1,h-.1),cl(e,n,d*.3),n.scoop){const x=_e(.42,.12,.46,it());x.position.set(0,o+.24,g-l*.15),e.add(x)}if(n.spoiler||n.bodyShape==="supercar"){const x=ft(_e(s*.78,.12,.34,t),"spoiler");x.position.set(0,o+a*.56,h+.14),e.add(x)}if(n.stripe){const x=_e(.18,.06,r*.52,hi(16777215));x.position.set(0,o+.26,0),e.add(x)}if(n.roofRails)for(const x of[-s*.44,s*.44]){const R=_e(.06,.06,c*.88,ys());R.position.set(x,o+a+.05,d),e.add(R)}if(n.bodyShape==="vintage-tall"||n.tall){const x=_e(s*.9,a*.78,c*.95,t);x.position.set(0,o+a*.5,d),e.add(x)}rl(e,n);const w=o+(n.low?.34:.42),T=n.bodyShape==="truck"||n.bed?.35:.02;return No(e,{x:s*.17,y:w+.38,z:T})}function xS(n){const e=new We,t=il(n.color),i=il(10133672),r=_e(2.28,.42,5.05,i);r.position.set(0,.48,0),e.add(r);const s=_e(2.28*.96,.55,5.05*.96,t);s.position.set(0,.78,.05),e.add(s);const o=ft(_e(2.12,.28,1.55,t),"hood",{dentPanel:!0});o.position.set(0,.98,1.55),o.rotation.x=-.08,e.add(o);const a=ft(_e(2.22,.72,.22,t),"front_panel",{dentPanel:!0});a.position.set(0,.72,2.42),e.add(a);const c=ft(_e(2.05,.1,.08,nl()),"headlight");c.position.set(0,.62,2.52),e.add(c);const l=ft(_e(2.24,.18,.2,it()),"bumper_front",{dentPanel:!0});l.position.set(0,.22,2.58),e.add(l);const d=_e(2.02,.52,2.05,t);d.position.set(0,1.42,-.15),d.rotation.x=-.32,e.add(d);const u=_e(2.02,.48,1.85,t);u.position.set(0,1.55,-1.55),u.rotation.x=.28,e.add(u);for(const m of[-1.1,1.1]){const f=ft(_e(.12,.95,3.35,i),m<0?"door_l":"door_r");f.position.set(m,1.05,-.35),f.rotation.y=m<0?.12:-.12,e.add(f)}const h=yn(1.75,.32,1.15,"windshield");h.position.set(0,1.12,.55),h.rotation.x=-.42,e.add(ft(h,"windshield"));for(const[m,f]of[[-1.02,"window_l"],[1.02,"window_r"]]){const w=yn(.1,.55,1.8,f);w.position.set(m,1.05,-.2),e.add(ft(w,f))}const p=_e(2.12,.18,2.15,i);p.position.set(0,.52,-1.75),e.add(p);for(const m of[-1.08,1.08]){const f=_e(.14,.42,2.15,t);f.position.set(m,.78,-1.75),e.add(f)}const g=[[-1.02,1.48,"wheel_fl"],[1.02,1.48,"wheel_fr"],[-1.02,-1.48,"wheel_rl"],[1.02,-1.48,"wheel_rr"]],_=[];for(const[m,f,w]of g){const T=Ql(.4);T.position.set(m,.38,f),T.userData.carPart=w,T.userData.detachable=!0,e.add(T),_.push(T)}return e.userData.wheels=_,No(e,{x:.28,y:.88,z:.12})}function yS(n){const e=Af(n),t=e.bodyShape==="cybertruck"?xS(e):_S(e);return t.userData.carId=n.id,t.userData.carName=n.name,t}const vS=5,Mn=28,Bn=38,Gu=30,Df=18;function Zo(){return{engine:100,body:100,hood:100,windshield:100,wheel_fl:100,wheel_fr:100,wheel_rl:100,wheel_rr:100}}function SS(n,e){let t=null;return n.traverse(i=>{var r;((r=i.userData)==null?void 0:r.carPart)===e&&!i.userData.detached&&(t=i)}),t}function MS(n,e,t){n.partHealth||(n.partHealth=Zo());const i=n.partHealth,s={headlight:"body",grille:"body",bumper_front:"body",hood:"hood",windshield:"windshield",door_l:"body",door_r:"body",trunk:"body",rear_glass:"windshield",taillight:"body",bumper_rear:"body",mirror_l:"body",mirror_r:"body",engine:"engine",cockpit:"body",wheel_fl:"wheel_fl",wheel_fr:"wheel_fr",wheel_rl:"wheel_rl",wheel_rr:"wheel_rr"}[e]??"body";i[s]!=null&&(i[s]=Math.max(0,i[s]-t)),(e==="hood"||e==="bumper_front"||e==="grille")&&(i.engine=Math.max(0,i.engine-t*.45))}function ed(n){return Math.abs(n)>=Mn}function If(n){return ed(n)?Math.min(1,(Math.abs(n)-Mn)/(52-Mn)):0}function bS(n){var t;const e=((t=n==null?void 0:n.geometry)==null?void 0:t.parameters)??{};return{width:e.width??2,height:e.height??.6,depth:e.depth??1.2}}function td(n){const e={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let t=0;t<n.length;t+=3)e.minX=Math.min(e.minX,n[t]),e.maxX=Math.max(e.maxX,n[t]),e.minY=Math.min(e.minY,n[t+1]),e.maxY=Math.max(e.maxY,n[t+1]),e.minZ=Math.min(e.minZ,n[t+2]),e.maxZ=Math.max(e.maxZ,n[t+2]);return e}function ES(n,e,t){const i=Math.max(0,Math.min(1,(t-n)/(e-n)));return i*i*(3-2*i)}function TS(n){if(n.userData.dentDense)return;const e=n.geometry,t=e==null?void 0:e.parameters;if(!(t!=null&&t.width))return;const{width:i,height:r,depth:s}=t,o=Math.max(10,Math.ceil(i*14)),a=Math.max(10,Math.ceil(r*14)),c=Math.max(5,Math.ceil(s*12)),l=new Ve(i,r,s,o,a,c);n.geometry.dispose(),n.geometry=l,n.userData.dentOriginal=null,n.userData.dentColorOriginal=null,n.userData.dentDense=!0}function wS(n){const e=[];if(n.traverse(s=>{s.isMesh&&s.userData.dentPanel==="front"&&e.push(s)}),!e.length)return null;n.updateWorldMatrix(!0,!0);const t=new L;let i=e[0],r=-1/0;for(const s of e)s.getWorldPosition(t),n.worldToLocal(t),t.z>r&&(r=t.z,i=s);return i}function ko(n){const e=[];return n.traverse(t=>{var i,r,s;t!==n&&(!((i=t.userData)!=null&&i.detachable)||t.userData.detached||(s=(r=t.parent)==null?void 0:r.userData)!=null&&s.detachable||e.push(t))}),e}function Uf(n){return ko(n).length}function Nf(n){var a;if(!(n!=null&&n.mesh))return!1;const e=Uf(n.mesh);if(e===0)return!0;n.initialPartCount||(n.initialPartCount=e);const t=e/n.initialPartCount,i=n.partHealth??Zo(),s=(((a=n.mesh.userData.wheels)==null?void 0:a.filter(c=>!c.userData.detached).length)??0)===0&&!SS(n.mesh,"hood"),o=i.body<=0&&i.engine<=0&&i.hood<=0;return t<=.22||t<=.35&&o||s&&t<=.4}const CS=new Set(["taillight","bumper_rear","trunk","spoiler","rear_glass"]),AS=new Set(["headlight","grille","front_panel","bumper_front","hood","windshield"]);function RS(n){return(n.speed??0)>=0?"front":"rear"}function Ba(n,e,t){const i=n.userData.carPart??"";if(t==="front"&&AS.has(i)||t==="rear"&&CS.has(i))return!0;if(i.startsWith("wheel_")){const s=i.includes("_r");return t==="rear"?s:!s}const r=new L;return n.getWorldPosition(r),e.worldToLocal(r),t==="front"?r.z>.05:t==="rear"?r.z<-.05:Math.abs(r.x)>Math.abs(r.z)*.35}function kf(n){const e=n.userData.carPart??"";return e==="windshield"||e==="rear_glass"||e.includes("window")}const ur={headlight:100,grille:85,front_panel:82,bumper_front:78,hood:72,windshield:65,mirror_l:50,mirror_r:50,door_l:40,door_r:40,window_l:38,window_r:38,bumper_rear:20,taillight:18,spoiler:15,trunk:22,rear_glass:24,engine:28,cockpit:10};function Vu(n){const e=n.userData.carPart??"";return ur[e]!=null?ur[e]:e.startsWith("wheel_")?35:e.startsWith("panel_")?14:12}function Wu(n,e){const t=n.userData.carPart??"";return t.startsWith("wheel_")?Bn-4:kf(n)?Mn-10:t==="engine"?Bn+6:ur[t]!=null&&ur[t]>=70?Df:ur[t]!=null&&ur[t]>=35?Mn-6:Mn+2-e*8}function PS(n,e=.5){if(!n||n.userData.shattered)return;n.userData.shattered=!0;const t=new Yo({color:16777215,transparent:!0,opacity:.85,depthWrite:!1}),i=new We;i.name="cracks";const r=10+Math.floor(e*16);for(let s=0;s<r;s++){const o=new ne(new Vn(.15+Math.random()*.55,.012+Math.random()*.02),t);o.position.set((Math.random()-.5)*1.4,(Math.random()-.5)*.9,.03+Math.random()*.02),o.rotation.z=Math.random()*Math.PI,i.add(o)}n.add(i),n.material&&!Array.isArray(n.material)&&(n.material=n.material.clone(),n.material.opacity=Math.min(n.material.opacity??.4,.35),n.material.transmission=.25,n.material.needsUpdate=!0)}function LS(n,e=1){!n||n.userData.hung||n.userData.detached||(n.userData.hung=!0,n.rotation.y=e*(.55+Math.random()*.35),n.position.x+=e*.08)}function DS(n,e,t,i,r,s,o,a){var m;if(!(t!=null&&t.geometry))return;const l=td(nd(t)).maxZ,d=.28+s*.42,u=5+Math.floor(s*4),h=new Re(((m=e.spec)==null?void 0:m.color)??12107204),p=new L(0,0,1).applyAxisAngle(new L(0,1,0),e.rotY),g=new L,_=Math.abs(o);for(let f=0;f<u;f++)for(let w=0;w<u;w++){const T=(f/(u-1)-.5)*2,x=(w/(u-1)-.5)*2,R=Math.hypot(T,x);if(R>1)continue;const y=1-R;if(y<.25&&Math.random()>s*.85)continue;g.set(i+T*d,r+x*d*.85,l),t.localToWorld(g);const E=.1+Math.random()*.14,A=.08+Math.random()*.12,v=.09+Math.random()*.13,M=Rf(h.clone().lerp(new Re(5592405),.15+Math.random()*.25)),P=new ne(new Ve(E,A,v),M);P.position.copy(g),P.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),n.add(P);const B=p.clone().multiplyScalar(2+_*.05*y).add(new L((Math.random()-.5)*3,1.5+Math.random()*3,(Math.random()-.5)*2));a.push({mesh:P,vel:B,life:5+Math.random()*2,bounce:.28,spin:new L((Math.random()-.5)*10,(Math.random()-.5)*10,(Math.random()-.5)*10)})}}function IS(n,e,t,i){var c,l;const r=nd(n),s=(l=(c=n.geometry)==null?void 0:c.attributes)==null?void 0:l.position;if(!r||!s)return;const o=.25+i*.4,a=td(r).minZ;for(let d=0;d<s.count;d++){const u=r[d*3],h=r[d*3+1];r[d*3+2];const p=Math.hypot(u-e,h-t);if(p>o)continue;1-p/o>.55+i*.25&&s.setXYZ(d,e+(u-e)*.15,t+(h-t)*.15,a-.02)}s.needsUpdate=!0,n.geometry.computeVertexNormals()}function US(n,e,t,i){const r=Math.abs(t);if(r<Df)return;const s=n.mesh,o=If(t),a=RS(n),c=ko(s);for(const u of c)!kf(u)||!Ba(u,s,a)||r>=Mn-10&&PS(u,o);let l=r>=Bn+8?8:r>=Bn?6:r>=Gu?4:r>=Mn?2:1;const d=c.filter(u=>Ba(u,s,a)).sort((u,h)=>Vu(h)-Vu(u));for(const u of d){if(l<=0)break;if(u.userData.detached||u.userData.hung||r<Wu(u,o))continue;const h=u.userData.carPart??"";if((h==="door_l"||h==="door_r")&&r<Bn&&Math.random()<.55){LS(u,h==="door_l"?-1:1),l--;continue}xo(n,e,u,t,i),l--}if(r>=Gu){const u=c.filter(h=>!h.userData.detached&&!Ba(h,s,a));for(const h of u){if(l<=0)break;r<Wu(h,o)+4||Math.random()>.35+o*.25||(xo(n,e,h,t,i),l--)}}if(r>=Bn&&NS(n,e,t,i,1+Math.floor(o*3)),r>=Bn+12)for(const u of ko(s))Math.random()<.12+o*.18&&xo(n,e,u,t,i)}function NS(n,e,t,i,r){const s=ko(n.mesh);for(let o=0;o<r&&s.length;o++){const a=Math.floor(Math.random()*s.length);xo(n,e,s[a],t,i),s.splice(a,1)}}function nd(n){var t,i;if(n.userData.dentOriginal)return n.userData.dentOriginal;const e=(i=(t=n.geometry)==null?void 0:t.attributes)==null?void 0:i.position;return e?(n.userData.dentOriginal=Float32Array.from(e.array),n.userData.dentOriginal):null}function kS(n){var r,s,o;const e=(s=(r=n.geometry)==null?void 0:r.attributes)==null?void 0:s.position;if(!e||n.geometry.attributes.color)return;const t=new Re(((o=n.material)==null?void 0:o.color)??11184810),i=new Float32Array(e.count*3);for(let a=0;a<e.count;a++)i[a*3]=t.r,i[a*3+1]=t.g,i[a*3+2]=t.b;n.geometry.setAttribute("color",new fn(i,3)),n.material&&(n.material=n.material.clone(),n.material.vertexColors=!0)}function OS(n){var r,s;const e=n.userData.dentOriginal,t=(s=(r=n.geometry)==null?void 0:r.attributes)==null?void 0:s.position;if(!e||!t)return;t.array.set(e),t.needsUpdate=!0;const i=n.geometry.attributes.color;i&&n.userData.dentColorOriginal&&(i.array.set(n.userData.dentColorOriginal),i.needsUpdate=!0),n.geometry.computeVertexNormals()}function FS(n,e,t,i,r){var A,v,M;TS(n);const s=nd(n),o=(v=(A=n.geometry)==null?void 0:A.attributes)==null?void 0:v.position;if(!s||!o)return;kS(n);const a=n.geometry.attributes.color;a&&!n.userData.dentColorOriginal&&(n.userData.dentColorOriginal=Float32Array.from(a.array));const c=td(s),l=c.minZ,d=c.maxZ,u=Math.max(d-l,.02),{width:h,height:p}=bS(n),g=Math.min(h,p),_=g*(r?.26+i*.2:.14+i*.08),m=_*1.25,f=r?3.2+i*1.4:2,w=r?u*(1.25+i*1.6)+g*.06*i:u*(.4+i*.28),T=r?u*(.45+i*.55):u*.08,x=new Re(3816002),R=new Re(6044200),y=new Re(1710624),E=new Re(((M=n.material)==null?void 0:M.color)??11184810);for(let P=0;P<o.count;P++){const B=s[P*3],F=s[P*3+1],k=s[P*3+2],H=B-e,O=F-t,$=Math.hypot(H,O);if($>m){o.setXYZ(P,B,F,k),a&&n.userData.dentColorOriginal&&a.setXYZ(P,n.userData.dentColorOriginal[P*3],n.userData.dentColorOriginal[P*3+1],n.userData.dentColorOriginal[P*3+2]);continue}const te=(1-$/m)**f,se=ES(l,d,k),ve=Math.abs($-_*.88),Ne=r?Math.exp(-(ve*ve)*90)*.38:0,rt=.12+.88*se,Y=r?te*(1-se)*.72:te*(1-se)*.25,J=te*w*rt+Ne*w*se+Y*w,xe=te*(r?.62+i*.28:.22)*(.35+.65*se),re=B-H/($+1e-4)*xe,Ce=F-O/($+1e-4)*xe,De=l-T*te,Ge=Math.min(k,Math.max(De,k-J));if(o.setXYZ(P,re,Ce,Ge),a){const Qe=J/(w+.001),Be=E.clone();Qe>.35&&Be.lerp(R,(Qe-.35)*1.6),Qe>.58&&Be.lerp(x,(Qe-.58)*2.2),Qe>.78&&Be.lerp(y,(Qe-.78)*3.5),a.setXYZ(P,Be.r,Be.g,Be.b)}}o.needsUpdate=!0,a&&(a.needsUpdate=!0),n.geometry.computeVertexNormals()}function BS(n,e){OS(n);for(const t of e)t.panel===n&&FS(n,t.hitX,t.hitY,t.severity,t.scoop)}function id(n){const e=new L(0,.75,2.1);return n.mesh.localToWorld(e),e}function zS(n,e){const t=id(e);return n.worldToLocal(t),{x:t.x,y:t.y}}function HS(n,e,t,i){var a;const r=((a=e.spec)==null?void 0:a.color)??12107204,s=id(e),o=new Re(r);for(let c=0;c<t;c++){const l=o.clone().lerp(new Re(16777215),.1+Math.random()*.35),d=Rf(l),u=new ne(new Ve(.04+Math.random()*.08,.012+Math.random()*.016,.05+Math.random()*.06),d);u.position.copy(s),u.position.x+=(Math.random()-.5)*.55,u.position.y+=(Math.random()-.5)*.4,u.position.z+=(Math.random()-.5)*.3,u.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),n.add(u);const h=new L((Math.random()-.5)*4,1.8+Math.random()*3.5,(Math.random()-.2)*4);h.applyAxisAngle(new L(0,1,0),e.rotY),i.push({mesh:u,vel:h,life:.9+Math.random()*.6,bounce:.32})}}function GS(n,e,t,i){const r=new At({color:16755268,emissive:16737792,emissiveIntensity:2,metalness:.8,roughness:.3});for(let s=0;s<t;s++){const o=new ne(new Bi(.025+Math.random()*.03,6,6),r);o.position.copy(e),n.add(o),i.push({mesh:o,vel:new L((Math.random()-.5)*8,2+Math.random()*6,(Math.random()-.5)*8),life:.15+Math.random()*.2,sparkle:!0})}}function xo(n,e,t,i,r){if(!(t!=null&&t.parent)||t.userData.detached)return;const s=new L,o=new Ur,a=new L;t.updateWorldMatrix(!0,!1),t.matrixWorld.decompose(s,o,a),t.parent.remove(t),t.traverse(h=>{h.userData&&(h.userData.detached=!0)}),e.add(t),t.position.copy(s),t.quaternion.copy(o),t.scale.copy(a);const c=Math.abs(i),l=t.userData.carPart??"";MS(n,l,12+c*.35);const u=new L(0,0,1).applyAxisAngle(new L(0,1,0),n.rotY).clone().multiplyScalar(1.5+c*.045).add(new L((Math.random()-.5)*2,1.2+Math.random()*2.5,(Math.random()-.5)*1.5));l.startsWith("wheel_")&&(u.y+=1.5,u.multiplyScalar(1.2)),r.push({mesh:t,vel:u,life:6,isPart:!0,bounce:.32,spin:new L((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8)})}function VS(n,e,t,i){const r=Math.abs(t);if(r<vS)return;const s=id(n),o=Math.min(18,3+Math.floor(r*.28));if(HS(e,n,o,i),r>=Mn){const a=If(t),c=!0,l=wS(n.mesh);if(l){const{x:d,y:u}=zS(l,n),h={panel:l,hitX:d,hitY:u,severity:a,scoop:c};n.dents||(n.dents=[]),n.dents.push(h),BS(l,n.dents),IS(l,d,u,a),DS(e,n,l,d,u,a,t,i),n.damage=(n.damage??0)+35+a*40,n.partHealth||(n.partHealth=Zo()),n.partHealth.body=Math.max(0,n.partHealth.body-15-a*35),n.partHealth.engine=Math.max(0,n.partHealth.engine-a*20)}r>=Bn&&GS(e,s,8+Math.floor(a*8),i)}US(n,e,t,i)}function rd(n,e){var t,i;for(let r=n.length-1;r>=0;r--){const s=n[r];s.life-=e,s.vel.y-=16*e,s.mesh.position.addScaledVector(s.vel,e),!s.sparkle&&s.mesh.position.y<.04&&(s.mesh.position.y=.04,s.vel.y<0&&(s.vel.y=-s.vel.y*(s.bounce??.3)),s.vel.x*=.72,s.vel.z*=.72),s.spin&&(s.mesh.rotation.x+=s.spin.x*e,s.mesh.rotation.y+=s.spin.y*e,s.mesh.rotation.z+=s.spin.z*e),s.sparkle&&((t=s.mesh.material)==null?void 0:t.emissiveIntensity)>0&&(s.mesh.material.emissiveIntensity=Math.max(0,s.mesh.material.emissiveIntensity-e*8)),s.life<=0&&((i=s.mesh.parent)==null||i.remove(s.mesh),n.splice(r,1))}}const Xu=52,WS=22,XS=32,$S=48,YS=42,qS=2.4,jS=8,ZS=.38,KS=28,JS=.9,QS=26,$u=38;function eM(n,e,t,i=0,r=null){const s=Af(n),o=um(s),a=yS(n);return hS(a,r),a.position.set(e,0,t),a.rotation.y=i,{spec:n,profile:s,collisionHw:o.hw,collisionHd:o.hd,collisionWidth:o.width,collisionLength:o.length,mesh:a,x:e,z:t,rotY:i,speed:0,steer:0,damage:0,partHealth:Zo(),dents:[],prevX:e,prevZ:t,reverseCharge:0,knockTilt:0,wheelSpin:0,suspensionT:0,bodyRoll:0,debris:[],initialPartCount:Uf(a)}}function tM(n,e){n.add(e.mesh)}function Of(n,e){e!=null&&e.mesh&&n.remove(e.mesh)}function nM(n,e){const t=e.mesh.userData.driverSeat??{x:.35,y:.78,z:.05};e.mesh.attach(n.mesh),n.mesh.position.set(t.x,t.y,t.z),n.mesh.rotation.set(0,0,0),n.mesh.scale.setScalar(.42),n.mesh.visible=!0,n.inVehicle=e}function Ff(n,e){const t=e.mesh.parent,i=e.x-Math.sin(e.rotY)*2.5,r=e.z-Math.cos(e.rotY)*2.5;t&&t.attach(n.mesh),n.mesh.scale.setScalar(1),n.x=i,n.z=r,n.mesh.visible=!0,n.inVehicle=null,iM(n)}function iM(n){n.mesh.position.set(n.x,n.mesh.position.y,n.z)}function rM(n,e){const t=n.mesh.userData.wheels??[],i=n.speed,r=i*e*2.6;n.wheelSpin=(n.wheelSpin??0)+r,n.suspensionT=(n.suspensionT??0)+e*(6+Math.abs(i)*.5);const s=Math.abs(i)*.004;t.forEach((o,a)=>{if(o.userData.detached)return;const c=o.userData.baseY??o.position.y;o.position.y=c+Math.sin(n.suspensionT+a*1.7)*s,o.rotation.x=n.wheelSpin,o.userData.steerable&&(o.rotation.y=-n.steer*.42)})}function Bf(n){n.mesh.position.x=n.x,n.mesh.position.z=n.z,n.mesh.rotation.y=n.rotY}function sM(n,e,t){if(!(n!=null&&n.mesh))return;let i=0,r=0,s=0;if(n.bodyRoll+=(-n.steer*.08*Math.min(1,Math.abs(n.speed)/18)-n.bodyRoll)*Math.min(1,t*6),r=n.bodyRoll,(n.knockTilt??0)>.01)i=-n.knockTilt,n.knockTilt*=Math.exp(-7*t);else{n.knockTilt=0;const o=Math.abs(n.speed);if(o>=$u){const a=e*.012,c=Math.min(1,(o-$u)/12);s=Math.abs(Math.sin(a*5))*.12*c,i=Math.sin(a*4)*.07*c,r=Math.cos(a*3.2)*.09*c}}n.mesh.position.y=s,n.mesh.rotation.x=i,n.mesh.rotation.z=r}function oM(n,e){const t=Math.abs(e),i=Math.min(1,Math.max(0,(t-Mn)/(52-Mn))),r=t>=Bn,s=r?.52:.26+i*.18,o=t*s;n.speed=-Math.sign(n.speed||1)*o;const a=r?1.25:.45+i*.4;return n.x-=Math.sin(n.rotY)*a,n.z-=Math.cos(n.rotY)*a,n.knockTilt=r?.48:.18+i*.26,n.prevX=n.x,n.prevZ=n.z,{huge:r,severity:i}}function aM(n,e,t,i){const{throttle:r,brake:s,steer:o,reverse:a=0}=e;n.prevX=n.x,n.prevZ=n.z,n.steer+=(o*qS-n.steer)*Math.min(1,t*8);const c=.85+Math.abs(n.speed)*.05;n.rotY-=n.steer*t*c;const l=Math.abs(o)<=ZS&&r>0&&a<=0;if(s>0)n.speed-=s*YS*t;else if(a>0)n.speed-=a*KS*t,n.speed=Math.max(n.speed,-14),n.speed<-3&&(n.reverseCharge=Math.min(1,(n.reverseCharge??0)+JS*t));else if(r>0){const m=n.superDashOn?n.superAccelMult??1.6:1;if((n.reverseCharge??0)>.12&&n.speed<2.5)n.speed+=n.reverseCharge*QS*m,n.reverseCharge=0;else{const f=l?$S*(1+Math.min(Math.abs(n.speed)/28,1.2)):XS*.75;n.speed+=r*f*m*t}}a<=0&&r<=0&&(n.reverseCharge=Math.max(0,(n.reverseCharge??0)-.2*t)),r<=0&&s<=0&&a<=0&&(Math.abs(n.speed)<.4?n.speed=0:n.speed-=Math.sign(n.speed)*jS*t);const u=n.superDashOn?n.superMaxSpeed??92:l?Xu:WS;n.speed=Math.max(-Xu*.3,Math.min(u,n.speed));const h=Math.sin(n.rotY)*n.speed*t,p=Math.cos(n.rotY)*n.speed*t,g=i(n.x+h,n.z+p);n.x=g.x,n.z=g.z,Bf(n),rM(n,t);const _=Math.abs(g.x-(n.prevX+h))>.05||Math.abs(g.z-(n.prevZ+p))>.05;return{impactSpeed:Math.abs(n.speed),charging:l,wallHit:_}}function cM(n,e,t,i=null){const s=n.x+Math.sin(n.facing)*4,o=n.z+Math.cos(n.facing)*4,a=t(s,o);return eM(e,a.x,a.z,n.facing,i)}class lM{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return dM(e).buffer}}function dM(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t.set(s,i),i+=r.byteLength}return t}function zf(n){return new uM(n).unpack()}function Hf(n){const e=new hM,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class uM{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let i=0,r="",s,o;for(;i<e;)s=t[i],s<160?(o=s,i++):(s^192)<32?(o=(s&31)<<6|t[i+1]&63,i+=2):(s^224)<16?(o=(s&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(o=(s&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),r+=String.fromCodePoint(o);return this.index+=e,r}unpack_array(e){const t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){const t={};for(let i=0;i<e;i++){const r=this.unpack();t[r]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,r=e&8388607|8388608;return(t===0?1:-1)*r*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,r=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(r-20)+t*2**(r-52);return(i===0?1:-1)*o}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class hM{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const i=r=>{if(r<t){const s=this.pack(e[r]);return s instanceof Promise?s.then(()=>i(r+1)):i(r+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),r=e/2**i-1,s=Math.floor(r*2**52),o=2**32,a=t<<31|i+1023<<20|s/o&1048575,c=s%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const r=s=>{if(s<t.length){const o=t[s];if(e.hasOwnProperty(o)){this.pack(o);const a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>r(s+1))}return r(s+1)}};return r(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new lM,this._textEncoder=new TextEncoder}}let Gf=!0,Vf=!0;function is(n,e,t){const i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function zi(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){sd("Unable to polyfill events");return}const r=n.RTCPeerConnection.prototype,s=r.addEventListener;r.addEventListener=function(a,c){if(a!==e)return s.apply(this,arguments);const l=d=>{const u=t(d);u&&(c.handleEvent?c.handleEvent(u):c(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),s.apply(this,[a,l])};const o=r.removeEventListener;r.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);const l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(r,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function fM(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Gf=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function pM(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Vf=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function sd(){if(typeof window=="object"){if(Gf)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function od(n,e){Vf&&console.warn(n+" is deprecated, please use "+e+" instead.")}function mM(n){const e={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){const i=t.userAgentData.brands.find(r=>r.brand==="Chromium");if(i){const r=parseInt(i.version,10);if(r>=90)return{browser:"chrome",version:r}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(is(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(is(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(is(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=is(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function Yu(n){return Object.prototype.toString.call(n)==="[object Object]"}function Wf(n){return Yu(n)?Object.keys(n).reduce(function(e,t){const i=Yu(n[t]),r=i?Wf(n[t]):n[t],s=i&&!Object.keys(r).length;return r===void 0||s?e:Object.assign(e,{[t]:r})},{}):n}function dl(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?dl(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(r=>{dl(n,n.get(r),t)})}))}function qu(n,e,t){const i=t?"outbound-rtp":"inbound-rtp",r=new Map;if(e===null)return r;const s=[];return n.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&s.push(o)}),s.forEach(o=>{n.forEach(a=>{a.type===i&&a.trackId===o.id&&dl(n,a,r)})}),r}const ju=sd;function Xf(n,e){if(e.version>=64)return;const t=n&&n.navigator;if(!t.mediaDevices)return;const i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;const c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const d=typeof a[l]=="object"?a[l]:{ideal:a[l]};d.exact!==void 0&&typeof d.exact=="number"&&(d.min=d.max=d.exact);const u=function(h,p){return h?h+p.charAt(0).toUpperCase()+p.slice(1):p==="deviceId"?"sourceId":p};if(d.ideal!==void 0){c.optional=c.optional||[];let h={};typeof d.ideal=="number"?(h[u("min",l)]=d.ideal,c.optional.push(h),h={},h[u("max",l)]=d.ideal,c.optional.push(h)):(h[u("",l)]=d.ideal,c.optional.push(h))}d.exact!==void 0&&typeof d.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[u("",l)]=d.exact):["min","max"].forEach(h=>{d[h]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[u(h,l)]=d[h])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},r=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){const l=function(d,u,h){u in d&&!(h in d)&&(d[h]=d[u],delete d[u])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const d=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!d)){delete a.video.facingMode;let u;if(l.exact==="environment"||l.ideal==="environment"?u=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(h=>{h=h.filter(g=>g.kind==="videoinput");let p=h.find(g=>u.some(_=>g.label.toLowerCase().includes(_)));return!p&&h.length&&u.includes("back")&&(p=h[h.length-1]),p&&(a.video.deviceId=l.exact?{exact:p.deviceId}:{ideal:p.deviceId}),a.video=i(a.video),ju("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return ju("chrome: "+JSON.stringify(a)),c(a)},s=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){r(a,d=>{t.webkitGetUserMedia(d,c,u=>{l&&l(s(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){const a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return r(c,l=>a(l).then(d=>{if(l.audio&&!d.getAudioTracks().length||l.video&&!d.getVideoTracks().length)throw d.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return d},d=>Promise.reject(s(d))))}}}function $f(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Yf(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=r=>{r.stream.addEventListener("addtrack",s=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):o={track:s.track};const a=new Event("track");a.track=s.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[r.stream],this.dispatchEvent(a)}),r.stream.getTracks().forEach(s=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.id):o={track:s};const a=new Event("track");a.track=s,a.receiver=o,a.transceiver={receiver:o},a.streams=[r.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else zi(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function qf(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){const e=function(r,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=r.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:r}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const r=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,c){let l=r.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};const s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){s.apply(this,arguments);const c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],t.apply(this,[s]),s.getTracks().forEach(o=>{this._senders.push(e(this,o))})};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],i.apply(this,[s]),s.getTracks().forEach(o=>{const a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){const e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function jf(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){const i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){const o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});const r=n.RTCPeerConnection.prototype.addTrack;r&&(n.RTCPeerConnection.prototype.addTrack=function(){const o=r.apply(this,arguments);return o._pc=this,o}),n.RTCRtpSender.prototype.getStats=function(){const o=this;return this._pc.getStats().then(a=>qu(a,o.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){const i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){const s=i.apply(this,[]);return s.forEach(o=>o._pc=this),s}),zi(n,"track",r=>(r.receiver._pc=r.srcElement,r)),n.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(o=>qu(o,s.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;const t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){const r=arguments[0];let s,o,a;return this.getSenders().forEach(c=>{c.track===r&&(s?a=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===r&&(o?a=!0:o=c),c.track===r)),a||s&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function Zf(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(u=>u.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const a=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};const r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{const c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),r.apply(this,arguments)}}function Kf(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return Zf(n);const t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){const d=t.apply(this);return this._reverseStreams=this._reverseStreams||{},d.map(u=>this._reverseStreams[u.id])};const i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(d){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},d.getTracks().forEach(u=>{if(this.getSenders().find(p=>p.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[d.id]){const u=new n.MediaStream(d.getTracks());this._streams[d.id]=u,this._reverseStreams[u.id]=d,d=u}i.apply(this,[d])};const r=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(d){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},r.apply(this,[this._streams[d.id]||d]),delete this._reverseStreams[this._streams[d.id]?this._streams[d.id].id:d.id],delete this._streams[d.id]},n.RTCPeerConnection.prototype.addTrack=function(d,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const h=[].slice.call(arguments,1);if(h.length!==1||!h[0].getTracks().find(_=>_===d))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===d))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const g=this._streams[u.id];if(g)g.addTrack(d),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const _=new n.MediaStream([d]);this._streams[u.id]=_,this._reverseStreams[_.id]=u,this.addStream(_)}return this.getSenders().find(_=>_.track===d)};function s(l,d){let u=d.sdp;return Object.keys(l._reverseStreams||[]).forEach(h=>{const p=l._reverseStreams[h],g=l._streams[p.id];u=u.replace(new RegExp(g.id,"g"),p.id)}),new RTCSessionDescription({type:d.type,sdp:u})}function o(l,d){let u=d.sdp;return Object.keys(l._reverseStreams||[]).forEach(h=>{const p=l._reverseStreams[h],g=l._streams[p.id];u=u.replace(new RegExp(p.id,"g"),g.id)}),new RTCSessionDescription({type:d.type,sdp:u})}["createOffer","createAnswer"].forEach(function(l){const d=n.RTCPeerConnection.prototype[l],u={[l](){const h=arguments;return arguments.length&&typeof arguments[0]=="function"?d.apply(this,[g=>{const _=s(this,g);h[0].apply(null,[_])},g=>{h[1]&&h[1].apply(null,g)},arguments[2]]):d.apply(this,arguments).then(g=>s(this,g))}};n.RTCPeerConnection.prototype[l]=u[l]});const a=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:s(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!d._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(d._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let h;Object.keys(this._streams).forEach(p=>{this._streams[p].getTracks().find(_=>d.track===_)&&(h=this._streams[p])}),h&&(h.getTracks().length===1?this.removeStream(this._reverseStreams[h.id]):h.removeTrack(d.track),this.dispatchEvent(new Event("negotiationneeded")))}}function ul(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]})}function Jf(n,e){e.version>102||zi(n,"negotiationneeded",t=>{const i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}const Zu=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:Jf,shimAddTrackRemoveTrack:Kf,shimAddTrackRemoveTrackWithNative:Zf,shimGetSendersWithDtmf:qf,shimGetUserMedia:Xf,shimMediaStream:$f,shimOnTrack:Yf,shimPeerConnection:ul,shimSenderReceiverGetStats:jf},Symbol.toStringTag,{value:"Module"}));function Qf(n,e){const t=n&&n.navigator;if(!t.mediaDevices)return;const i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(r,s,o){od("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(r).then(s,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const r=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},s=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),r(o.audio,"autoGainControl","mozAutoGainControl"),r(o.audio,"noiseSuppression","mozNoiseSuppression")),s(o)},i&&i.prototype.getSettings){const o=i.prototype.getSettings;i.prototype.getSettings=function(){const a=o.apply(this,arguments);return r(a,"mozAutoGainControl","autoGainControl"),r(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){const o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),r(a,"autoGainControl","mozAutoGainControl"),r(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function gM(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const r=new DOMException("getDisplayMedia without video constraints is undefined");return r.name="NotFoundError",r.code=8,Promise.reject(r)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function ep(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function hl(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]}))}function tp(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){const[s,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[s||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((d,u)=>{c.set(u,Object.assign({},d,{type:t[d.type]||d.type}))})}return c}).then(o,a)}}function np(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;const e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){const r=e.apply(this,[]);return r.forEach(s=>s._pc=this),r});const t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){const r=t.apply(this,arguments);return r._pc=this,r}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function ip(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;const e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i}),zi(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function rp(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){od("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function sp(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function op(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let r=arguments[1]&&arguments[1].sendEncodings;r===void 0&&(r=[]),r=[...r];const s=r.length>0;s&&r.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const o=t.apply(this,arguments);if(s){const{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=r,a.sendEncodings=r,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function ap(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;const t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){const r=t.apply(this,arguments);return"encodings"in r||(r.encodings=[].concat(this.sendEncodings||[{}])),r})}function cp(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function lp(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}const Ku=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:op,shimCreateAnswer:lp,shimCreateOffer:cp,shimGetDisplayMedia:gM,shimGetParameters:ap,shimGetStats:tp,shimGetUserMedia:Qf,shimOnTrack:ep,shimPeerConnection:hl,shimRTCDataChannel:sp,shimReceiverGetStats:ip,shimRemoveStream:rp,shimSenderGetStats:np},Symbol.toStringTag,{value:"Module"}));function dp(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(r=>e.call(this,r,i)),i.getVideoTracks().forEach(r=>e.call(this,r,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...r){return r&&r.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);const r=t.getTracks();this.getSenders().forEach(s=>{r.includes(s.track)&&this.removeTrack(s)})})}}function up(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(r=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(r))return;this._remoteStreams.push(r);const s=new Event("addstream");s.stream=r,this.dispatchEvent(s)})})}});const e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(r){r.streams.forEach(s=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(s)>=0)return;i._remoteStreams.push(s);const o=new Event("addstream");o.stream=s,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function hp(n){if(typeof n!="object"||!n.RTCPeerConnection)return;const e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,r=e.setLocalDescription,s=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,d){const u=arguments.length>=2?arguments[2]:arguments[0],h=t.apply(this,[u]);return d?(h.then(l,d),Promise.resolve()):h},e.createAnswer=function(l,d){const u=arguments.length>=2?arguments[2]:arguments[0],h=i.apply(this,[u]);return d?(h.then(l,d),Promise.resolve()):h};let a=function(c,l,d){const u=r.apply(this,[c]);return d?(u.then(l,d),Promise.resolve()):u};e.setLocalDescription=a,a=function(c,l,d){const u=s.apply(this,[c]);return d?(u.then(l,d),Promise.resolve()):u},e.setRemoteDescription=a,a=function(c,l,d){const u=o.apply(this,[c]);return d?(u.then(l,d),Promise.resolve()):u},e.addIceCandidate=a}function fp(n){const e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=r=>i(pp(r))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=(function(i,r,s){e.mediaDevices.getUserMedia(i).then(r,s)}).bind(e))}function pp(n){return n&&n.video!==void 0?Object.assign({},n,{video:Wf(n.video)}):n}function mp(n){if(!n.RTCPeerConnection)return;const e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,r){if(i&&i.iceServers){const s=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?(od("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,s.push(a)):s.push(i.iceServers[o])}i.iceServers=s}return new e(i,r)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function gp(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function _p(n){const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const r=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveAudio===!0&&!r&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const s=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function xp(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}const Ju=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:xp,shimCallbacksAPI:hp,shimConstraints:pp,shimCreateOfferLegacy:_p,shimGetUserMedia:fp,shimLocalStreamsAPI:dp,shimRTCIceServerUrls:mp,shimRemoteStreamsAPI:up,shimTrackEventTransceiver:gp},Symbol.toStringTag,{value:"Module"}));function _M(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var za={exports:{}},Qu;function xM(){return Qu||(Qu=1,(function(n){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
`).map(i=>i.trim())},e.splitSections=function(t){return t.split(`
m=`).map((r,s)=>(s>0?"m="+r:r).trim()+`\r
`)},e.getDescription=function(t){const i=e.splitSections(t);return i&&i[0]},e.getMediaSections=function(t){const i=e.splitSections(t);return i.shift(),i},e.matchPrefix=function(t,i){return e.splitLines(t).filter(r=>r.indexOf(i)===0)},e.parseCandidate=function(t){let i;t.indexOf("a=candidate:")===0?i=t.substring(12).split(" "):i=t.substring(10).split(" ");const r={foundation:i[0],component:{1:"rtp",2:"rtcp"}[i[1]]||i[1],protocol:i[2].toLowerCase(),priority:parseInt(i[3],10),ip:i[4],address:i[4],port:parseInt(i[5],10),type:i[7]};for(let s=8;s<i.length;s+=2)switch(i[s]){case"raddr":r.relatedAddress=i[s+1];break;case"rport":r.relatedPort=parseInt(i[s+1],10);break;case"tcptype":r.tcpType=i[s+1];break;case"ufrag":r.ufrag=i[s+1],r.usernameFragment=i[s+1];break;default:r[i[s]]===void 0&&(r[i[s]]=i[s+1]);break}return r},e.writeCandidate=function(t){const i=[];i.push(t.foundation);const r=t.component;r==="rtp"?i.push(1):r==="rtcp"?i.push(2):i.push(r),i.push(t.protocol.toUpperCase()),i.push(t.priority),i.push(t.address||t.ip),i.push(t.port);const s=t.type;return i.push("typ"),i.push(s),s!=="host"&&t.relatedAddress&&t.relatedPort!==void 0&&(i.push("raddr"),i.push(t.relatedAddress),i.push("rport"),i.push(t.relatedPort)),t.tcpType&&t.protocol.toLowerCase()==="tcp"&&(i.push("tcptype"),i.push(t.tcpType)),(t.usernameFragment||t.ufrag)&&(i.push("ufrag"),i.push(t.usernameFragment||t.ufrag)),"candidate:"+i.join(" ")},e.parseIceOptions=function(t){return t.substring(14).split(" ")},e.parseRtpMap=function(t){let i=t.substring(9).split(" ");const r={payloadType:parseInt(i.shift(),10)};return i=i[0].split("/"),r.name=i[0],r.clockRate=parseInt(i[1],10),r.channels=i.length===3?parseInt(i[2],10):1,r.numChannels=r.channels,r},e.writeRtpMap=function(t){let i=t.payloadType;t.preferredPayloadType!==void 0&&(i=t.preferredPayloadType);const r=t.channels||t.numChannels||1;return"a=rtpmap:"+i+" "+t.name+"/"+t.clockRate+(r!==1?"/"+r:"")+`\r
`},e.parseExtmap=function(t){const i=t.substring(9).split(" ");return{id:parseInt(i[0],10),direction:i[0].indexOf("/")>0?i[0].split("/")[1]:"sendrecv",uri:i[1],attributes:i.slice(2).join(" ")}},e.writeExtmap=function(t){return"a=extmap:"+(t.id||t.preferredId)+(t.direction&&t.direction!=="sendrecv"?"/"+t.direction:"")+" "+t.uri+(t.attributes?" "+t.attributes:"")+`\r
`},e.parseFmtp=function(t){const i={};let r;const s=t.substring(t.indexOf(" ")+1).split(";");for(let o=0;o<s.length;o++)r=s[o].trim().split("="),i[r[0].trim()]=r[1];return i},e.writeFmtp=function(t){let i="",r=t.payloadType;if(t.preferredPayloadType!==void 0&&(r=t.preferredPayloadType),t.parameters&&Object.keys(t.parameters).length){const s=[];Object.keys(t.parameters).forEach(o=>{t.parameters[o]!==void 0?s.push(o+"="+t.parameters[o]):s.push(o)}),i+="a=fmtp:"+r+" "+s.join(";")+`\r
`}return i},e.parseRtcpFb=function(t){const i=t.substring(t.indexOf(" ")+1).split(" ");return{type:i.shift(),parameter:i.join(" ")}},e.writeRtcpFb=function(t){let i="",r=t.payloadType;return t.preferredPayloadType!==void 0&&(r=t.preferredPayloadType),t.rtcpFeedback&&t.rtcpFeedback.length&&t.rtcpFeedback.forEach(s=>{i+="a=rtcp-fb:"+r+" "+s.type+(s.parameter&&s.parameter.length?" "+s.parameter:"")+`\r
`}),i},e.parseSsrcMedia=function(t){const i=t.indexOf(" "),r={ssrc:parseInt(t.substring(7,i),10)},s=t.indexOf(":",i);return s>-1?(r.attribute=t.substring(i+1,s),r.value=t.substring(s+1)):r.attribute=t.substring(i+1),r},e.parseSsrcGroup=function(t){const i=t.substring(13).split(" ");return{semantics:i.shift(),ssrcs:i.map(r=>parseInt(r,10))}},e.getMid=function(t){const i=e.matchPrefix(t,"a=mid:")[0];if(i)return i.substring(6)},e.parseFingerprint=function(t){const i=t.substring(14).split(" ");return{algorithm:i[0].toLowerCase(),value:i[1].toUpperCase()}},e.getDtlsParameters=function(t,i){return{role:"auto",fingerprints:e.matchPrefix(t+i,"a=fingerprint:").map(e.parseFingerprint)}},e.writeDtlsParameters=function(t,i){let r="a=setup:"+i+`\r
`;return t.fingerprints.forEach(s=>{r+="a=fingerprint:"+s.algorithm+" "+s.value+`\r
`}),r},e.parseCryptoLine=function(t){const i=t.substring(9).split(" ");return{tag:parseInt(i[0],10),cryptoSuite:i[1],keyParams:i[2],sessionParams:i.slice(3)}},e.writeCryptoLine=function(t){return"a=crypto:"+t.tag+" "+t.cryptoSuite+" "+(typeof t.keyParams=="object"?e.writeCryptoKeyParams(t.keyParams):t.keyParams)+(t.sessionParams?" "+t.sessionParams.join(" "):"")+`\r
`},e.parseCryptoKeyParams=function(t){if(t.indexOf("inline:")!==0)return null;const i=t.substring(7).split("|");return{keyMethod:"inline",keySalt:i[0],lifeTime:i[1],mkiValue:i[2]?i[2].split(":")[0]:void 0,mkiLength:i[2]?i[2].split(":")[1]:void 0}},e.writeCryptoKeyParams=function(t){return t.keyMethod+":"+t.keySalt+(t.lifeTime?"|"+t.lifeTime:"")+(t.mkiValue&&t.mkiLength?"|"+t.mkiValue+":"+t.mkiLength:"")},e.getCryptoParameters=function(t,i){return e.matchPrefix(t+i,"a=crypto:").map(e.parseCryptoLine)},e.getIceParameters=function(t,i){const r=e.matchPrefix(t+i,"a=ice-ufrag:")[0],s=e.matchPrefix(t+i,"a=ice-pwd:")[0];return r&&s?{usernameFragment:r.substring(12),password:s.substring(10)}:null},e.writeIceParameters=function(t){let i="a=ice-ufrag:"+t.usernameFragment+`\r
a=ice-pwd:`+t.password+`\r
`;return t.iceLite&&(i+=`a=ice-lite\r
`),i},e.parseRtpParameters=function(t){const i={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},s=e.splitLines(t)[0].split(" ");i.profile=s[2];for(let a=3;a<s.length;a++){const c=s[a],l=e.matchPrefix(t,"a=rtpmap:"+c+" ")[0];if(l){const d=e.parseRtpMap(l),u=e.matchPrefix(t,"a=fmtp:"+c+" ");switch(d.parameters=u.length?e.parseFmtp(u[0]):{},d.rtcpFeedback=e.matchPrefix(t,"a=rtcp-fb:"+c+" ").map(e.parseRtcpFb),i.codecs.push(d),d.name.toUpperCase()){case"RED":case"ULPFEC":i.fecMechanisms.push(d.name.toUpperCase());break}}}e.matchPrefix(t,"a=extmap:").forEach(a=>{i.headerExtensions.push(e.parseExtmap(a))});const o=e.matchPrefix(t,"a=rtcp-fb:* ").map(e.parseRtcpFb);return i.codecs.forEach(a=>{o.forEach(c=>{a.rtcpFeedback.find(d=>d.type===c.type&&d.parameter===c.parameter)||a.rtcpFeedback.push(c)})}),i},e.writeRtpDescription=function(t,i){let r="";r+="m="+t+" ",r+=i.codecs.length>0?"9":"0",r+=" "+(i.profile||"UDP/TLS/RTP/SAVPF")+" ",r+=i.codecs.map(o=>o.preferredPayloadType!==void 0?o.preferredPayloadType:o.payloadType).join(" ")+`\r
`,r+=`c=IN IP4 0.0.0.0\r
`,r+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,i.codecs.forEach(o=>{r+=e.writeRtpMap(o),r+=e.writeFmtp(o),r+=e.writeRtcpFb(o)});let s=0;return i.codecs.forEach(o=>{o.maxptime>s&&(s=o.maxptime)}),s>0&&(r+="a=maxptime:"+s+`\r
`),i.headerExtensions&&i.headerExtensions.forEach(o=>{r+=e.writeExtmap(o)}),r},e.parseRtpEncodingParameters=function(t){const i=[],r=e.parseRtpParameters(t),s=r.fecMechanisms.indexOf("RED")!==-1,o=r.fecMechanisms.indexOf("ULPFEC")!==-1,a=e.matchPrefix(t,"a=ssrc:").map(h=>e.parseSsrcMedia(h)).filter(h=>h.attribute==="cname"),c=a.length>0&&a[0].ssrc;let l;const d=e.matchPrefix(t,"a=ssrc-group:FID").map(h=>h.substring(17).split(" ").map(g=>parseInt(g,10)));d.length>0&&d[0].length>1&&d[0][0]===c&&(l=d[0][1]),r.codecs.forEach(h=>{if(h.name.toUpperCase()==="RTX"&&h.parameters.apt){let p={ssrc:c,codecPayloadType:parseInt(h.parameters.apt,10)};c&&l&&(p.rtx={ssrc:l}),i.push(p),s&&(p=JSON.parse(JSON.stringify(p)),p.fec={ssrc:c,mechanism:o?"red+ulpfec":"red"},i.push(p))}}),i.length===0&&c&&i.push({ssrc:c});let u=e.matchPrefix(t,"b=");return u.length&&(u[0].indexOf("b=TIAS:")===0?u=parseInt(u[0].substring(7),10):u[0].indexOf("b=AS:")===0?u=parseInt(u[0].substring(5),10)*1e3*.95-2e3*8:u=void 0,i.forEach(h=>{h.maxBitrate=u})),i},e.parseRtcpParameters=function(t){const i={},r=e.matchPrefix(t,"a=ssrc:").map(a=>e.parseSsrcMedia(a)).filter(a=>a.attribute==="cname")[0];r&&(i.cname=r.value,i.ssrc=r.ssrc);const s=e.matchPrefix(t,"a=rtcp-rsize");i.reducedSize=s.length>0,i.compound=s.length===0;const o=e.matchPrefix(t,"a=rtcp-mux");return i.mux=o.length>0,i},e.writeRtcpParameters=function(t){let i="";return t.reducedSize&&(i+=`a=rtcp-rsize\r
`),t.mux&&(i+=`a=rtcp-mux\r
`),t.ssrc!==void 0&&t.cname&&(i+="a=ssrc:"+t.ssrc+" cname:"+t.cname+`\r
`),i},e.parseMsid=function(t){let i;const r=e.matchPrefix(t,"a=msid:");if(r.length===1)return i=r[0].substring(7).split(" "),{stream:i[0],track:i[1]};const s=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="msid");if(s.length>0)return i=s[0].value.split(" "),{stream:i[0],track:i[1]}},e.parseSctpDescription=function(t){const i=e.parseMLine(t),r=e.matchPrefix(t,"a=max-message-size:");let s;r.length>0&&(s=parseInt(r[0].substring(19),10)),isNaN(s)&&(s=65536);const o=e.matchPrefix(t,"a=sctp-port:");if(o.length>0)return{port:parseInt(o[0].substring(12),10),protocol:i.fmt,maxMessageSize:s};const a=e.matchPrefix(t,"a=sctpmap:");if(a.length>0){const c=a[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:s}}},e.writeSctpDescription=function(t,i){let r=[];return t.protocol!=="DTLS/SCTP"?r=["m="+t.kind+" 9 "+t.protocol+" "+i.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+i.port+`\r
`]:r=["m="+t.kind+" 9 "+t.protocol+" "+i.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+i.port+" "+i.protocol+` 65535\r
`],i.maxMessageSize!==void 0&&r.push("a=max-message-size:"+i.maxMessageSize+`\r
`),r.join("")},e.generateSessionId=function(){return Math.random().toString().substr(2,22)},e.writeSessionBoilerplate=function(t,i,r){let s;const o=i!==void 0?i:2;return t?s=t:s=e.generateSessionId(),`v=0\r
o=`+(r||"thisisadapterortc")+" "+s+" "+o+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},e.getDirection=function(t,i){const r=e.splitLines(t);for(let s=0;s<r.length;s++)switch(r[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[s].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const r=e.splitLines(t)[0].substring(2).split(" ");return{kind:r[0],port:parseInt(r[1],10),protocol:r[2],fmt:r.slice(3).join(" ")}},e.parseOLine=function(t){const r=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:r[0],sessionId:r[1],sessionVersion:parseInt(r[2],10),netType:r[3],addressType:r[4],address:r[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const i=e.splitLines(t);for(let r=0;r<i.length;r++)if(i[r].length<2||i[r].charAt(1)!=="=")return!1;return!0},n.exports=e})(za)),za.exports}var yp=xM();const vr=_M(yp),yM=$p({__proto__:null,default:vr},[yp]);function yo(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;const e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const r=new e(i),s=vr.parseCandidate(i.candidate);for(const o in s)o in r||Object.defineProperty(r,o,{value:s[o]});return r.toJSON=function(){return{candidate:r.candidate,sdpMid:r.sdpMid,sdpMLineIndex:r.sdpMLineIndex,usernameFragment:r.usernameFragment}},r}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,zi(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function fl(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||zi(n,"icecandidate",e=>{if(e.candidate){const t=vr.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function vo(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});const t=function(a){if(!a||!a.sdp)return!1;const c=vr.splitSections(a.sdp);return c.shift(),c.some(l=>{const d=vr.parseMLine(l);return d&&d.kind==="application"&&d.protocol.indexOf("SCTP")!==-1})},i=function(a){const c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},r=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);const d=vr.matchPrefix(a.sdp,"a=max-message-size:");return d.length>0?l=parseInt(d[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=i(arguments[0]),l=r(c),d=s(arguments[0],c);let u;l===0&&d===0?u=Number.POSITIVE_INFINITY:l===0||d===0?u=Math.max(l,d):u=Math.min(l,d);const h={};Object.defineProperty(h,"maxMessageSize",{get(){return u}}),this._sctp=h}return o.apply(this,arguments)}}function So(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(r,s){const o=r.send;r.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(r.readyState==="open"&&s.sctp&&l>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return o.apply(r,arguments)}}const i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){const s=i.apply(this,arguments);return t(s,this),s},zi(n,"datachannel",r=>(t(r.channel,r.target),r))}function pl(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;const e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=r=>{const s=r.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const o=new Event("connectionstatechange",r);s.dispatchEvent(o)}return r},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function ml(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(r){if(r&&r.sdp&&r.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=r.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&r instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:r.type,sdp:s}):r.sdp=s}return t.apply(this,arguments)}}function Mo(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function bo(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let r=arguments[0]||{};if(typeof r!="object"||r.type&&r.sdp)return t.apply(this,arguments);if(r={type:r.type,sdp:r.sdp},!r.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":r.type="offer";break;default:r.type="answer";break}return r.sdp||r.type!=="offer"&&r.type!=="answer"?t.apply(this,[r]):(r.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}const vM=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:ml,shimAddIceCandidateNullOrEmpty:Mo,shimConnectionState:pl,shimMaxMessageSize:vo,shimParameterlessSetLocalDescription:bo,shimRTCIceCandidate:yo,shimRTCIceCandidateRelayProtocol:fl,shimSendThrowTypeError:So},Symbol.toStringTag,{value:"Module"}));function SM({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=sd,i=mM(n),r={browserDetails:i,commonShim:vM,extractVersion:is,disableLog:fM,disableWarnings:pM,sdp:yM};switch(i.browser){case"chrome":if(!Zu||!ul||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),r;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),r;t("adapter.js shimming chrome."),r.browserShim=Zu,Mo(n,i),bo(n),Xf(n,i),$f(n),ul(n,i),Yf(n,i),Kf(n,i),qf(n),jf(n,i),Jf(n,i),yo(n),fl(n),pl(n),vo(n,i),So(n,i),ml(n,i);break;case"firefox":if(!Ku||!hl||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),r;t("adapter.js shimming firefox."),r.browserShim=Ku,Mo(n,i),bo(n),Qf(n,i),hl(n,i),tp(n,i),ep(n),rp(n),np(n),ip(n),sp(n),op(n,i),ap(n,i),cp(n,i),lp(n,i),yo(n),pl(n),vo(n,i),So(n,i);break;case"safari":if(!Ju||!e.shimSafari)return t("Safari shim is not included in this adapter release."),r;t("adapter.js shimming safari."),r.browserShim=Ju,Mo(n,i),bo(n),mp(n),_p(n),hp(n),dp(n),up(n),gp(n),fp(n),xp(n),yo(n),fl(n),vo(n,i),So(n,i),ml(n,i);break;default:t("Unsupported browser!");break}return r}const eh=SM({window:typeof window>"u"?void 0:window});function Hi(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}class vp{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],i=e.byteLength,r=Math.ceil(i/this.chunkedMTU);let s=0,o=0;for(;o<i;){const a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:s,data:c,total:r};t.push(l),o=a,s++}return this._dataCount++,t}}}function MM(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.byteLength;return t}const Ha=eh.default||eh,Zr=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){const n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return Ha.browserDetails.browser}getVersion(){return Ha.browserDetails.version||0}isUnifiedPlanSupported(){const n=this.getBrowser(),e=Ha.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},bM=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),Sp=()=>Math.random().toString(36).slice(2),th={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class EM extends vp{noop(){}blobToArrayBuffer(e,t){const i=new FileReader;return i.onload=function(r){r.target&&t(r.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=th,this.browser=Zr.getBrowser(),this.browserVersion=Zr.getVersion(),this.pack=Hf,this.unpack=zf,this.supports=(function(){const t={browser:Zr.isBrowserSupported(),webRTC:Zr.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(th),t.audioVideo=!0;let r;try{r=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!r.ordered;try{r.binaryType="blob",t.binaryBlob=!Zr.isIOS}catch{}}catch{}finally{r&&r.close()}}catch{}finally{i&&i.close()}return t})(),this.validateId=bM,this.randomToken=Sp}}const Jt=new EM,TM="PeerJS: ";class wM{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const i=[TM,...t];for(const r in i)i[r]instanceof Error&&(i[r]="("+i[r].name+") "+i[r].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var ge=new wM,ad={},CM=Object.prototype.hasOwnProperty,jt="~";function ps(){}Object.create&&(ps.prototype=Object.create(null),new ps().__proto__||(jt=!1));function AM(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function Mp(n,e,t,i,r){if(typeof t!="function")throw new TypeError("The listener must be a function");var s=new AM(t,i||n,r),o=jt?jt+e:e;return n._events[o]?n._events[o].fn?n._events[o]=[n._events[o],s]:n._events[o].push(s):(n._events[o]=s,n._eventsCount++),n}function Eo(n,e){--n._eventsCount===0?n._events=new ps:delete n._events[e]}function Gt(){this._events=new ps,this._eventsCount=0}Gt.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)CM.call(t,i)&&e.push(jt?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Gt.prototype.listeners=function(e){var t=jt?jt+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,s=i.length,o=new Array(s);r<s;r++)o[r]=i[r].fn;return o};Gt.prototype.listenerCount=function(e){var t=jt?jt+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Gt.prototype.emit=function(e,t,i,r,s,o){var a=jt?jt+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,d,u;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,r),!0;case 5:return c.fn.call(c.context,t,i,r,s),!0;case 6:return c.fn.call(c.context,t,i,r,s,o),!0}for(u=1,d=new Array(l-1);u<l;u++)d[u-1]=arguments[u];c.fn.apply(c.context,d)}else{var h=c.length,p;for(u=0;u<h;u++)switch(c[u].once&&this.removeListener(e,c[u].fn,void 0,!0),l){case 1:c[u].fn.call(c[u].context);break;case 2:c[u].fn.call(c[u].context,t);break;case 3:c[u].fn.call(c[u].context,t,i);break;case 4:c[u].fn.call(c[u].context,t,i,r);break;default:if(!d)for(p=1,d=new Array(l-1);p<l;p++)d[p-1]=arguments[p];c[u].fn.apply(c[u].context,d)}}return!0};Gt.prototype.on=function(e,t,i){return Mp(this,e,t,i,!1)};Gt.prototype.once=function(e,t,i){return Mp(this,e,t,i,!0)};Gt.prototype.removeListener=function(e,t,i,r){var s=jt?jt+e:e;if(!this._events[s])return this;if(!t)return Eo(this,s),this;var o=this._events[s];if(o.fn)o.fn===t&&(!r||o.once)&&(!i||o.context===i)&&Eo(this,s);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||r&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[s]=c.length===1?c[0]:c:Eo(this,s)}return this};Gt.prototype.removeAllListeners=function(e){var t;return e?(t=jt?jt+e:e,this._events[t]&&Eo(this,t)):(this._events=new ps,this._eventsCount=0),this};Gt.prototype.off=Gt.prototype.removeListener;Gt.prototype.addListener=Gt.prototype.on;Gt.prefixed=jt;Gt.EventEmitter=Gt;ad=Gt;var Gi={};Hi(Gi,"ConnectionType",()=>fi);Hi(Gi,"PeerErrorType",()=>Ct);Hi(Gi,"BaseConnectionErrorType",()=>gl);Hi(Gi,"DataConnectionErrorType",()=>cd);Hi(Gi,"SerializationType",()=>Ko);Hi(Gi,"SocketEventType",()=>ci);Hi(Gi,"ServerMessageType",()=>zt);var fi=(function(n){return n.Data="data",n.Media="media",n})({}),Ct=(function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n})({}),gl=(function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n})({}),cd=(function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n})({}),Ko=(function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n})({}),ci=(function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n})({}),zt=(function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n})({});const bp="1.5.5";class RM extends ad.EventEmitter{constructor(e,t,i,r,s,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];const a=e?"wss://":"ws://";this._baseUrl=a+t+":"+i+r+"peerjs?key="+s}start(e,t){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+bp),this._disconnected=!1,this._socket.onmessage=r=>{let s;try{s=JSON.parse(r.data),ge.log("Server message received:",s)}catch{ge.log("Invalid server message",r.data);return}this.emit(ci.Message,s)},this._socket.onclose=r=>{this._disconnected||(ge.log("Socket closed.",r),this._cleanup(),this._disconnected=!0,this.emit(ci.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),ge.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){ge.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:zt.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(ci.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class Ep{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===fi.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const i=this.connection,r={ordered:!!e.reliable},s=t.createDataChannel(i.label,r);i._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){ge.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,i=this.connection.connectionId,r=this.connection.type,s=this.connection.provider;ge.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(ge.log(`Received ICE candidates for ${t}:`,o.candidate),s.socket.send({type:zt.Candidate,payload:{candidate:o.candidate,type:r,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":ge.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(gl.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":ge.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(gl.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":ge.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},ge.log("Listening for data channel"),e.ondatachannel=o=>{ge.log("Received data channel");const a=o.channel;s.getConnection(t,i)._initializeDataChannel(a)},ge.log("Listening for remote stream"),e.ontrack=o=>{ge.log("Received remote stream");const a=o.streams[0],c=s.getConnection(t,i);if(c.type===fi.Media){const l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){ge.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let i=!1;const r=this.connection.dataChannel;r&&(i=!!r.readyState&&r.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);ge.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),ge.log("Set localDescription:",i,`for:${this.connection.peer}`);let r={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===fi.Data){const s=this.connection;r={...r,label:s.label,reliable:s.reliable,serialization:s.serialization}}t.socket.send({type:zt.Offer,payload:r,dst:this.connection.peer})}catch(r){r!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Ct.WebRTC,r),ge.log("Failed to setLocalDescription, ",r))}}catch(i){t.emitError(Ct.WebRTC,i),ge.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createAnswer();ge.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),ge.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:zt.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(r){t.emitError(Ct.WebRTC,r),ge.log("Failed to setLocalDescription, ",r)}}catch(i){t.emitError(Ct.WebRTC,i),ge.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const i=this.connection.peerConnection,r=this.connection.provider;ge.log("Setting remote description",t);const s=this;try{await i.setRemoteDescription(t),ge.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(o){r.emitError(Ct.WebRTC,o),ge.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){ge.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),ge.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Ct.WebRTC,t),ge.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(ge.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return ge.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){ge.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class Tp extends ad.EventEmitter{emitError(e,t){ge.error("Error:",t),this.emit("error",new PM(`${e}`,t))}}class PM extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class wp extends Tp{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}}var Tl;const us=class us extends wp{get type(){return fi.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||us.ID_PREFIX+Jt.randomToken(),this._negotiator=new Ep(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{ge.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{ge.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){ge.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,i=e.payload;switch(e.type){case zt.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case zt.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:ge.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){ge.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const r of i)this.handleMessage(r);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};Tl=new WeakMap,Br(us,Tl,us.ID_PREFIX="mc_");let Oo=us;class LM{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:i,port:r,path:s,key:o}=this._options,a=new URL(`${t}://${i}:${r}${s}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",bp),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){ge.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==Jt.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===Jt.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw ge.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var wl,Cl;const Pi=class Pi extends wp{get type(){return fi.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||Pi.ID_PREFIX+Sp(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Ep(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{ge.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{ge.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{ge.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(cd.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case zt.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case zt.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:ge.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};wl=new WeakMap,Cl=new WeakMap,Br(Pi,wl,Pi.ID_PREFIX="dc_"),Br(Pi,Cl,Pi.MAX_BUFFERED_AMOUNT=8388608);let Fo=Pi;class ld extends Fo{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Fo.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return ge.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Ga extends ld{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new vp,this.serialization=Ko.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=zf(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];const r=MM(i.data);this._handleDataMessage({data:r})}}_send(e,t){const i=Hf(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);ge.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const i of t)this.send(i,!0)}}class DM extends ld{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Ko.None}}class IM extends ld{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=Jt.chunkedMTU){this.emitError(cd.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Ko.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var Al;const hs=class hs extends Tp{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:DM,json:IM,binary:Ga,"binary-utf8":Ga,default:Ga},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:Jt.CLOUD_HOST,port:Jt.CLOUD_PORT,path:"/",key:hs.DEFAULT_KEY,token:Jt.randomToken(),config:Jt.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Jt.CLOUD_HOST?this._options.secure=Jt.isSecure():this._options.host==Jt.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&ge.setLogFunction(this._options.logFunction),ge.logLevel=this._options.debug||0,this._api=new LM(t),this._socket=this._createServerConnection(),!Jt.supports.audioVideo&&!Jt.supports.data){this._delayedAbort(Ct.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!Jt.validateId(i)){this._delayedAbort(Ct.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(r=>this._initialize(r)).catch(r=>this._abort(Ct.ServerError,r))}_createServerConnection(){const e=new RM(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(ci.Message,t=>{this._handleMessage(t)}),e.on(ci.Error,t=>{this._abort(Ct.SocketError,t)}),e.on(ci.Disconnected,()=>{this.disconnected||(this.emitError(Ct.Network,"Lost connection to server."),this.disconnect())}),e.on(ci.Close,()=>{this.disconnected||this._abort(Ct.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,i=e.payload,r=e.src;switch(t){case zt.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case zt.Error:this._abort(Ct.ServerError,i.msg);break;case zt.IdTaken:this._abort(Ct.UnavailableID,`ID "${this.id}" is taken`);break;case zt.InvalidKey:this._abort(Ct.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case zt.Leave:ge.log(`Received leave message from ${r}`),this._cleanupPeer(r),this._connections.delete(r);break;case zt.Expire:this.emitError(Ct.PeerUnavailable,`Could not connect to peer ${r}`);break;case zt.Offer:{const s=i.connectionId;let o=this.getConnection(r,s);if(o&&(o.close(),ge.warn(`Offer received for existing Connection ID:${s}`)),i.type===fi.Media){const c=new Oo(r,this,{connectionId:s,_payload:i,metadata:i.metadata});o=c,this._addConnection(r,o),this.emit("call",c)}else if(i.type===fi.Data){const c=new this._serializers[i.serialization](r,this,{connectionId:s,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(r,o),this.emit("connection",c)}else{ge.warn(`Received malformed connection type:${i.type}`);return}const a=this._getMessages(s);for(const c of a)o.handleMessage(c);break}default:{if(!i){ge.warn(`You received a malformed message from ${r} of type ${t}`);return}const s=i.connectionId,o=this.getConnection(r,s);o&&o.peerConnection?o.handleMessage(e):s?this._storeMessage(s,e):ge.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){ge.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Ct.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){ge.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Ct.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){ge.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const r=new Oo(e,this,{...i,_stream:t});return this._addConnection(e,r),r}_addConnection(e,t){ge.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const i=this._connections.get(e);if(!i)return null;for(const r of i)if(r.connectionId===t)return r;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){ge.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(ge.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const i of t)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;ge.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)ge.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)ge.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Ct.ServerError,t))}};Al=new WeakMap,Br(hs,Al,hs.DEFAULT_KEY="peerjs");let _l=hs;var nh=_l;const UM="ccwd-",ih="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",NM="https://bperussina.github.io/MyGames/car-crashing-with-dashing/index.html",kM={host:"0.peerjs.com",port:443,path:"/",secure:!0,debug:0},OM={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:global.stun.twilio.com:3478"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}]},Va=12,FM=2e3,rh=15e3;function BM(n=6){let e="";for(let t=0;t<n;t++)e+=ih[Math.floor(Math.random()*ih.length)];return e}function Cp(n){const e=new URL(NM);return e.searchParams.set("room",n.toUpperCase()),e.toString()}function sh(n){return`${UM}${n.toUpperCase()}`}function zM(n){return new Promise(e=>setTimeout(e,n))}function oh(n=void 0){return{...kM,...n?{id:n}:{},config:OM}}function ah(){let n=null,e=null,t=null,i=null,r=new Map,s=null,o=null,a=null;function c(y){o==null||o(y)}function l(){for(const[,y]of r)try{y.close()}catch{}if(r.clear(),n){try{n.destroy()}catch{}n=null}}function d(y,E=null){const A=JSON.stringify(y);for(const[,v]of r)v!==E&&v.open&&v.send(A)}function u(y){r.set(y.peer,y),a==null||a(r.size+(e==="host"?1:0)),y.on("data",E=>{try{const A=typeof E=="string"?JSON.parse(E):E;s==null||s(A,y.peer)}catch{}}),y.on("close",()=>{r.delete(y.peer),a==null||a(r.size+(e==="host"?1:0)),s==null||s({t:"leave",id:y.peer})})}function h(y){return new Promise((E,A)=>{const v=setTimeout(()=>{A(Object.assign(new Error("timeout"),{type:"network"}))},rh);y.once("open",M=>{clearTimeout(v),E(M)}),y.once("error",M=>{clearTimeout(v),A(M)})})}function p(y){return t=y.toUpperCase(),e="host",i=sh(t),c("Opening your room (works on any internet)…"),new Promise((E,A)=>{l(),n=new nh(i,oh(i)),n.on("connection",v=>{v.on("open",()=>{u(v),v.send(JSON.stringify({t:"welcome",host:i,code:t})),s==null||s({t:"join",id:v.peer})})}),h(n).then(()=>{c(`Room ${t} ready — share your link!`),E({code:t,link:Cp(t),role:"host",id:i})}).catch(v=>{c(f(v,"host")),l(),A(v)})})}function g(y){t=y.toUpperCase(),e="client";const E=sh(t);return new Promise((A,v)=>{l(),n=new nh(oh()),h(n).then(M=>{i=M;const P=n.connect(E,{reliable:!0}),B=setTimeout(()=>{v(Object.assign(new Error("connect failed"),{type:"peer-unavailable"}))},rh);P.on("open",()=>{clearTimeout(B),u(P),c("You're in the game!"),A({code:t,role:"client",id:i})}),P.on("error",()=>{clearTimeout(B),v(Object.assign(new Error("connect failed"),{type:"peer-unavailable"}))})}).catch(M=>{v(M)})})}function _(y){const E=(y==null?void 0:y.type)??"";return E==="peer-unavailable"||E==="network"||E==="disconnected"}async function m(y){t=y.toUpperCase(),e="client",c(`Joining ${t}…`);let E=null;for(let A=1;A<=Va;A++)try{return A>1&&c(`Still connecting… (${A}/${Va}) — ask host to keep the game open`),await g(y)}catch(v){if(E=v,l(),A<Va&&_(v)){await zM(FM);continue}throw c(f(v,"join")),v}throw c(f(E,"join")),E}function f(y,E){const A=(y==null?void 0:y.type)??"";return A==="peer-unavailable"?E==="join"?"Room not open yet — ask host to tap Generate Code and keep the game open.":"That room code is taken — tap Generate Code again.":A==="unavailable-id"?"That room code is taken — tap Generate Code again.":A==="network"||A==="disconnected"?"Internet hiccup — check Wi‑Fi or data and try again.":A==="browser-incompatible"?"Try Chrome, Safari, or Edge for multiplayer.":E==="join"?"Could not connect — make sure the host shared the link and left the game open.":`Could not open room (${A||"error"}) — try again.`}function w(y){if(e==="host")d(y);else{const E=r.values().next().value;E!=null&&E.open&&E.send(JSON.stringify(y))}}function T(y){if(e==="host")s==null||s(y,i);else{const E=r.values().next().value;E!=null&&E.open&&E.send(JSON.stringify(y))}}function x(y,E){e==="host"&&d(E,r.get(y))}function R(){l(),e=null,t=null,i=null}return{host:p,join:m,send:w,sendToHost:T,relay:x,close:R,get role(){return e},get code(){return t},get id(){return i},set onMessage(y){s=y},set onStatus(y){o=y},set onPeerCount(y){a=y}}}const Jo="ccwd-player-name",ch="ccwd-host-room";let nt=null,je=null,no=null,ti=new Map;function si(){if(!nt)return"Player";const n=nt.querySelector("#player-name"),e=n==null?void 0:n.value.trim();if(e)return e;try{return localStorage.getItem(Jo)||"Player"}catch{return"Player"}}function lh(n){try{localStorage.setItem(Jo,n)}catch{}}function HM(n){no=n,nt=document.createElement("div"),nt.id="multiplayer-lobby",nt.innerHTML=`
    <div class="lobby-panel">
      <button type="button" class="lobby-x" id="lobby-x" aria-label="Close">✕</button>

      <h1 class="lobby-title">MULTIPLAYER</h1>
      <p class="lobby-sub">Play with family — any internet, anywhere.</p>

      <label class="lobby-label" for="player-name">Your name</label>
      <input type="text" class="lobby-name-input" id="player-name" placeholder="Type your name" maxlength="24" autocomplete="nickname" />

      <div class="lobby-people-box">
        <p class="lobby-label">People in the lobby</p>
        <ul class="lobby-people-list" id="lobby-people-list"></ul>
      </div>

      <button type="button" class="lobby-btn lobby-btn-host" id="btn-generate">Generate Code</button>

      <div class="lobby-host-info" id="host-info" hidden>
        <p class="lobby-label">Your room code</p>
        <p class="lobby-code" id="room-code"></p>
        <p class="lobby-label">Share this link (opens the real game — any phone or Wi‑Fi)</p>
        <div class="lobby-link-row">
          <input type="text" class="lobby-link" id="share-link" readonly />
          <button type="button" class="lobby-copy" id="btn-copy">Copy</button>
        </div>
      </div>

      <div class="lobby-divider">or join a friend</div>

      <div class="lobby-join-row">
        <input type="text" class="lobby-code-input" id="join-code" placeholder="Enter code" maxlength="8" autocomplete="off" />
        <button type="button" class="lobby-btn lobby-btn-join" id="btn-join">Join Code</button>
      </div>

      <button type="button" class="lobby-btn lobby-btn-go" id="btn-enter" hidden>Enter World</button>

      <p class="lobby-status" id="lobby-status"></p>
    </div>
  `,document.body.appendChild(nt);const e=nt.querySelector("#lobby-status"),t=nt.querySelector("#host-info"),i=nt.querySelector("#room-code"),r=nt.querySelector("#share-link"),s=nt.querySelector("#player-name"),o=nt.querySelector("#lobby-people-list"),a=nt.querySelector("#btn-enter");try{const R=localStorage.getItem(Jo);R&&(s.value=R)}catch{}function c(R){e&&(e.textContent=R)}function l(R){if(o){if(o.innerHTML="",!R.length){const y=document.createElement("li");y.className="lobby-person empty",y.textContent="Nobody here yet",o.appendChild(y);return}for(const y of R){const E=document.createElement("li");E.className="lobby-person",E.textContent=y.you?`${y.name} (you)`:y.name,o.appendChild(E)}}}function d(){return[{id:"local",name:si(),you:!0}]}function u(){if(!(je!=null&&je.id))return d();const R=[{id:je.id,name:si(),you:!0}];for(const[y,E]of ti)R.push({id:y,name:E,you:!1});return R}function h(){(je==null?void 0:je.role)==="host"?l(u()):(je==null?void 0:je.role)==="client"||l(d())}function p(){if((je==null?void 0:je.role)!=="host")return;const R=u();l(R),je.send({t:"roster",people:R})}function g(R){je=R,ti.clear(),je.onMessage=(y,E)=>{if(je.role==="host"&&(y.t==="hello"&&E&&(ti.set(E,y.name||"Player"),p(),c(`${y.name||"Someone"} joined the lobby`)),y.t==="setName"&&E&&(ti.set(E,y.name||"Player"),p()),y.t==="leave")){const A=E||y.id;A&&(ti.delete(A),p(),c("Someone left the lobby"))}y.t==="roster"&&Array.isArray(y.people)&&l(y.people)},je.onPeerCount=()=>h()}function _(){const R=si();if(lh(R),!je){h();return}je.role==="host"?p():je.role==="client"&&je.send({t:"setName",name:R})}function m(){a.hidden=!1}s.addEventListener("input",()=>{_()}),nt.querySelector("#btn-generate").addEventListener("click",async()=>{try{je&&je.close(),ti.clear();const R=ah();R.onStatus=c,g(R);const y=BM(),E=await R.host(y);i.textContent=E.code,r.value=E.link,t.hidden=!1;try{sessionStorage.setItem(ch,E.code)}catch{}history.replaceState(null,"",`?room=${encodeURIComponent(E.code)}`),_(),m(),c("Share the link — friends appear in the lobby when they join.")}catch{c("Could not create room — try again.")}}),nt.querySelector("#btn-copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(r.value),c("Link copied! Send it to your family.")}catch{r.select(),c("Select the link and copy it.")}}),nt.querySelector("#btn-join").addEventListener("click",()=>f()),nt.querySelector("#join-code").addEventListener("keydown",R=>{R.key==="Enter"&&f()});async function f({fromLink:R=!1}={}){const y=nt.querySelector("#join-code").value.trim();if(!y){c("Type a room code first.");return}try{je&&je.close(),ti.clear();const E=ah();E.onStatus=c,g(E),await E.join(y),E.send({t:"hello",name:si()}),m(),c("You're in the game!"),R&&setTimeout(()=>w(),500)}catch{}}function w(){je&&(lh(si()),Wa(),no==null||no({room:je,isHost:je.role==="host",playerName:si()}))}a.addEventListener("click",w);function T(){je&&je.close(),je=null,ti.clear(),a.hidden=!0,t.hidden=!0;try{sessionStorage.removeItem(ch)}catch{}Wa(),h()}nt.querySelector("#lobby-x").addEventListener("click",T);const x=new URLSearchParams(window.location.search).get("room");return x&&(nt.querySelector("#join-code").value=x),Wa(),h(),nt}function Wa(){nt&&nt.classList.remove("open")}function Ap(){if(nt){nt.classList.add("open");const n=nt.querySelector("#player-name");if(n)try{const t=localStorage.getItem(Jo);t&&!n.value&&(n.value=t)}catch{}const e=nt.querySelector("#lobby-people-list");if(e&&!je){si(),e.innerHTML="";const t=document.createElement("li");t.className="lobby-person",t.textContent=`${si()} (you)`,e.appendChild(t)}}}function dh(){return(nt==null?void 0:nt.classList.contains("open"))??!1}const uh=[15680580,16347926,15381256,2278750,440020,11032055,15485081];function GM(n){const e=new Map;let t=0;function i(){const p=uh[t%uh.length];return t+=1,p}function r(p){if(e.has(p))return e.get(p);const g=i(),_=Cf(0,0,g);_.mesh.userData.remoteId=p,n.add(_.mesh);const m={player:_,target:{x:0,z:0,facing:0,walkPhase:0,isMoving:!1}};return e.set(p,m),m}function s(p,g){const _=r(p);Object.assign(_.target,g);const m=_.player;m.x=g.x,m.z=g.z,m.facing=g.facing??0,m.walkPhase=g.walkPhase??0,m.isMoving=!!g.isMoving,gi(m)}function o(p){const g=e.get(p);g&&(n.remove(g.player.mesh),e.delete(p))}function a(p){const g=Math.min(1,p*12);for(const[,_]of e){const m=_.player,f=_.target;m.x+=(f.x-m.x)*g,m.z+=(f.z-m.z)*g,m.facing+=(f.facing-m.facing)*g,m.walkPhase=f.walkPhase,m.isMoving=f.isMoving,gi(m)}}function c(){for(const p of[...e.keys()])o(p)}function l(p){for(const[g,_]of e)p(g,_.player,_.target)}function d(p,g,{minSpeed:_,cooldownSec:m,onShred:f}){const w=e.get(p);if(!w||(w.shredCooldown=w.shredCooldown??0,w.shredCooldown>0)||Math.abs(g.speed)<_)return!1;const x=g.x-w.player.x,R=g.z-w.player.z;return Math.hypot(x,R)>3.8?!1:(w.shredCooldown=m,f==null||f(p,w.player),!0)}function u(p,g,_){const m=e.get(p);return!m||(m.shredCooldown=m.shredCooldown??0,m.shredCooldown>0)?!1:(m.shredCooldown=g,_==null||_(p,m.player),!0)}function h(p){for(const[,g]of e)g.shredCooldown>0&&(g.shredCooldown=Math.max(0,g.shredCooldown-p))}return{applyPose:s,remove:o,lerpAll:a,clear:c,count:()=>e.size,forEach:l,tryShred:d,tryGunHit:u,tickCooldowns:h}}const Rp="ccwd-design-sketch",hr=28,Pp=[{name:"Stainless",hex:"#b8bdc4"},{name:"Black",hex:"#1a1a1a"},{name:"White",hex:"#ffffff"},{name:"Gray",hex:"#6b7280"},{name:"Red",hex:"#dc2626"},{name:"Blue",hex:"#2563eb"},{name:"Green",hex:"#16a34a"},{name:"Yellow",hex:"#eab308"}];let Rt=null,Et=null,ht=null,ms=!1,Kr="draw",To=Pp[0].hex,io=!1,Ni=null;function wo(){if(Et)try{localStorage.setItem(Rp,Et.toDataURL("image/png"))}catch{}}function VM(){if(!(!Et||!ht))try{const n=localStorage.getItem(Rp);if(!n)return;const e=new Image;e.onload=()=>{ht.drawImage(e,0,0,Et.width,Et.height)},e.src=n}catch{}}function Lp(){if(!Et||!ht)return;const n=Math.min(window.devicePixelRatio||1,2),e=window.innerWidth,t=window.innerHeight;Et.width=Math.floor(e*n),Et.height=Math.floor(t*n),Et.style.width=`${e}px`,Et.style.height=`${t}px`,ht.setTransform(n,0,0,n,0,0),ht.fillStyle="#ffffff",ht.fillRect(0,0,e,t),VM()}function hh(n){return Math.round(n/hr)*hr}function fh(n,e){const t=Et.getBoundingClientRect();return{x:n-t.left,y:e-t.top}}function WM(n,e){const t=hh(n),i=hh(e);ht.fillStyle=To,ht.fillRect(t,i,hr,hr),ht.strokeStyle="rgba(0,0,0,0.12)",ht.lineWidth=1,ht.strokeRect(t+.5,i+.5,hr-1,hr-1)}function ph(){wo(),Dp(),Ni==null||Ni()}function mh(){return ms}function Dp(){Rt&&(ms=!1,Rt.hidden=!0)}function XM(){Rt&&(ms=!0,Rt.hidden=!1,Lp())}function $M(){return new URLSearchParams(window.location.search).has("draw")}function YM(n,e){Ni=n,Rt=document.createElement("div"),Rt.id="draw-paper",Rt.innerHTML=`
    <canvas id="draw-paper-canvas" aria-label="Design paper"></canvas>
    <div class="draw-toolbar">
      <p class="draw-title">Draw your Cybertruck</p>
      <div class="draw-tools">
        <button type="button" class="draw-tool active" data-tool="draw">Draw</button>
        <button type="button" class="draw-tool" data-tool="cube">Cubes</button>
        <button type="button" class="draw-tool" data-tool="erase">Eraser</button>
      </div>
      <div class="draw-colors" id="draw-colors"></div>
      <button type="button" class="draw-clear" id="draw-clear">Clear paper</button>
    </div>
    <div class="draw-footer">
      <p class="draw-hint">Type <strong>undo</strong> and press Enter to play the game</p>
      <input type="text" class="draw-undo-input" id="draw-undo-input" placeholder="undo" autocomplete="off" />
      <div class="draw-footer-actions">
        <button type="button" class="draw-play-btn" id="draw-play-btn">Play game</button>
        <button type="button" class="draw-multi-btn" id="draw-multi-btn">Multiplayer</button>
      </div>
    </div>
  `,document.body.appendChild(Rt),Et=Rt.querySelector("#draw-paper-canvas"),ht=Et.getContext("2d");const t=Rt.querySelector("#draw-colors");for(const c of Pp){const l=document.createElement("button");l.type="button",l.className="draw-swatch",l.style.background=c.hex,l.title=c.name,l.dataset.color=c.hex,c.hex===To&&l.classList.add("active"),l.addEventListener("click",()=>{To=c.hex,t.querySelectorAll(".draw-swatch").forEach(d=>d.classList.remove("active")),l.classList.add("active"),Kr==="erase"&&i("draw")}),t.appendChild(l)}function i(c){Kr=c,Rt.querySelectorAll(".draw-tool").forEach(l=>{l.classList.toggle("active",l.dataset.tool===c)})}Rt.querySelectorAll(".draw-tool").forEach(c=>{c.addEventListener("click",()=>i(c.dataset.tool))}),Rt.querySelector("#draw-clear").addEventListener("click",()=>{ht.fillStyle="#ffffff",ht.fillRect(0,0,Et.width,Et.height),wo()}),Rt.querySelector("#draw-play-btn").addEventListener("click",ph),Rt.querySelector("#draw-multi-btn").addEventListener("click",()=>{ms=!1,Rt.hidden=!0,e?e():Ni==null||Ni()});const r=Rt.querySelector("#draw-undo-input");r.addEventListener("keydown",c=>{c.key==="Enter"&&r.value.trim().toLowerCase()==="undo"&&ph()});function s(c){if(c.target.closest(".draw-toolbar, .draw-footer"))return;c.preventDefault(),io=!0;const l=fh(c.clientX,c.clientY);Kr==="cube"?(WM(l.x,l.y),wo()):Kr==="erase"?(ht.strokeStyle="#ffffff",ht.lineWidth=20,ht.lineCap="round",ht.beginPath(),ht.moveTo(l.x,l.y)):(ht.strokeStyle=To,ht.lineWidth=4,ht.lineCap="round",ht.beginPath(),ht.moveTo(l.x,l.y)),Et.setPointerCapture(c.pointerId)}function o(c){if(!io)return;const l=fh(c.clientX,c.clientY);Kr!=="cube"&&(ht.lineTo(l.x,l.y),ht.stroke())}function a(c){if(io){io=!1,wo();try{Et.releasePointerCapture(c.pointerId)}catch{}}}return Et.addEventListener("pointerdown",s),Et.addEventListener("pointermove",o),Et.addEventListener("pointerup",a),Et.addEventListener("pointercancel",a),window.addEventListener("resize",()=>{ms&&Lp()}),Rt.hidden=!0,Rt}const gh="ccwd-build",xl="ccwd-show-update",qM="MEGA UPDATE",jM="The game just got way bigger.",ZM=[{icon:"🪟",title:"Real windows & glass",desc:"Big blue side windows, windshield, rear glass, mirrors, and chrome trim."},{icon:"💥",title:"Parts fly off",desc:"Headlights, hood, doors, and wheels break loose in crashes."},{icon:"🏙️",title:"Huge city + countryside",desc:"Drive through the city gates into infinite green hills."},{icon:"📊",title:"Damage HUD",desc:"Live bars for engine, body, hood, glass, and wheels."},{icon:"🖱️",title:"Mouse-look driving",desc:"Look around while you drive and smash buildings."},{icon:"🔄",title:"Auto-updates",desc:"Reload and you always get the newest version — like right now."}];let rs=null;function _h(n){return`ccwd-seen-${n}`}async function KM(){const n=await fetch(`./version.json?_=${Date.now()}`,{cache:"no-store"});return n.ok?n.json():null}function xh(){const n=new URL(location.href);n.searchParams.has("__v")&&(n.searchParams.delete("__v"),history.replaceState(null,"",n.pathname+n.search+n.hash))}function JM(n){const e=document.createElement("div");return e.id="update-splash",e.innerHTML=`
    <div class="update-bg"></div>
    <div class="update-rays"></div>
    <div class="update-panel">
      <p class="update-eyebrow">NEW VERSION LOADED</p>
      <h1 class="update-headline">${qM}</h1>
      <p class="update-tagline">${jM}</p>
      <p class="update-version">Build <strong>${n}</strong></p>
      <ul class="update-features">
        ${ZM.map(t=>`
          <li>
            <span class="update-feature-icon">${t.icon}</span>
            <span class="update-feature-text">
              <strong>${t.title}</strong>
              <span>${t.desc}</span>
            </span>
          </li>`).join("")}
      </ul>
      <button type="button" class="update-play-btn" id="update-splash-dismiss">LET'S GO!</button>
    </div>
  `,e}function QM(n){return new Promise(e=>{const t=n.querySelector("#update-splash-dismiss"),i=()=>{n.classList.add("update-splash-out"),setTimeout(()=>{n.remove(),rs=null,e()},420)};t.addEventListener("click",i,{once:!0});const r=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),window.removeEventListener("keydown",r),i())};window.addEventListener("keydown",r)})}async function eb(){if(location.hostname==="localhost"||location.hostname==="127.0.0.1")return;let n;try{n=await KM()}catch{return}const e=n==null?void 0:n.v;if(!e)return;const t=localStorage.getItem(xl)==="1",i=localStorage.getItem(_h(e))==="1";if(!t&&i){localStorage.setItem(gh,e),xh();return}localStorage.removeItem(xl),localStorage.setItem(gh,e),localStorage.setItem(_h(e),"1"),xh(),rs=JM(e),document.body.appendChild(rs),requestAnimationFrame(()=>rs.classList.add("update-splash-in")),await QM(rs)}function tb(){localStorage.setItem(xl,"1")}const nb=10,ib=.5,yh=2.4,rb=2.2,sb=92,ob=1.6,ab=[[24,18],[-30,22],[45,-35],[-50,40],[12,-55],[-65,-20],[70,55],[-15,75],[88,-12],[-40,-70]];function cb(){const n=document.createElement("canvas");n.width=256,n.height=72;const e=n.getContext("2d");e.fillStyle="rgba(15,23,42,0.55)",e.beginPath(),e.roundRect(8,8,240,56,10),e.fill(),e.fillStyle="#ffffff",e.font="bold 34px system-ui,sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("Dashing",128,38);const t=new Mv(n);t.colorSpace=Qt;const i=new bf({map:t,transparent:!0,depthTest:!1}),r=new vv(i);return r.scale.set(3.6,1,1),r.renderOrder=10,r}function vh(){const n=new We,e=new ne(new qt(1.15,1.15,.18,28),new cn({color:2450411,emissive:1920728,emissiveIntensity:.45,flatShading:!0}));e.position.y=.1,n.add(e);const t=new ne(new jo(1.28,.08,8,28),new cn({color:6333946,flatShading:!0}));t.rotation.x=Math.PI/2,t.position.y=.18,n.add(t);const i=cb();return i.position.y=rb,n.add(i),n}function lb(n){let e=n>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function db(n,{getPlayerId:e,isHost:t,send:i,relay:r}){const s=new We;s.name="dash-pickups",n.add(s);let o=[],a={},c=!1,l=0,d=!1;function u(){return(e==null?void 0:e())??"local"}function h(){i==null||i({t:"dashState",pickups:o.map(k=>({id:k.id,x:k.x,z:k.z,active:k.active})),scores:a})}function p(k=Date.now()){for(o=[],a={},c=!1,d=!1;s.children.length;)s.remove(s.children[0]);const H=lb(k);d=!0;for(let O=0;O<nb;O++){if(H()>=ib)continue;const[$,W]=ab[O],te=vh();te.position.set($,0,W),s.add(te),o.push({id:O,x:$,z:W,active:!0,mesh:te,bob:H()*Math.PI*2,pending:!1})}t!=null&&t()&&h()}function g(){return o.length>0}function _(k){if(k!=null&&k.pickups){for(d=k.pickups.length>0,a={...k.scores??{}};s.children.length;)s.remove(s.children[0]);o=k.pickups.map(H=>{const O=H.active?vh():null;return O&&(O.position.set(H.x,0,H.z),s.add(O)),{id:H.id,x:H.x,z:H.z,active:H.active,mesh:O,bob:0,pending:!1}})}}function m(k){if(!k.active)return;k.active=!1,k.mesh&&(s.remove(k.mesh),k.mesh=null);const H=u();a[H]=(a[H]??0)+1,B==null||B("Dashing +1!"),t!=null&&t()?h():i==null||i({t:"dashCollect",pickupId:k.id,playerId:H})}function f(k){if(!(t!=null&&t()))return;const H=o.find(O=>O.id===k.pickupId&&O.active);H&&(H.active=!1,H.mesh&&(s.remove(H.mesh),H.mesh=null),a[k.playerId]=(a[k.playerId]??0)+1,h())}function w(k){t!=null&&t()&&(k.playerId&&(a[k.playerId]=0),h())}function T(k=null){const H=k??u();a[H]=0,H===u()&&(c=!1),t!=null&&t()?h():i==null||i({t:"dashScoreReset",playerId:H})}function x(k){k.t==="dashState"&&_(k),k.t==="dashCollect"&&f(k),k.t==="dashScoreReset"&&w(k)}function R(){return{...a}}function y(){const k=Object.entries(a);if(!k.length)return[];const H=Math.max(...k.map(([,O])=>O));return H<=0?[]:k.filter(([,O])=>O===H).map(([O])=>O)}function E(){return y().includes(u())}function A(){return E()?(c=!c,c):!1}function v(k){c=!!k}function M(){return c}function P(k,H){l+=k;for(const O of o)!O.active||!O.mesh||(O.mesh.position.y=Math.sin(l*2.8+O.bob)*.12,O.mesh.children[0].rotation.y+=k*1.6);if(!(!H||!d))for(const O of o){if(!O.active)continue;const $=H.x-O.x,W=H.z-O.z;if($*$+W*W<=yh*yh){if(O.pending)break;(t==null?void 0:t())??!0?m(O):(O.pending=!0,i==null||i({t:"dashCollect",pickupId:O.id,playerId:u()}));break}}}let B=null;function F(k){B=k}return{group:s,reset:p,update:P,getScores:R,getLeaderIds:y,isLocalLeader:E,isSuperDashOn:M,toggleSuperDash:A,setSuperDash:v,handleMessage:x,setToast:F,syncState:h,resetPlayerScore:T,isSessionActive:g,SUPER_MAX_SPEED:sb,SUPER_ACCEL_MULT:ob}}const ub={wood:{label:"Wood",color:9136404,costMult:1},metal:{label:"Metal",color:9741240,costMult:3},obsidian:{label:"Obsidian",color:1973067,costMult:8},diamond:{label:"Diamond",color:6809849,costMult:16,adminOnly:!0},plasma:{label:"Plasma",color:11032055,costMult:24,adminOnly:!0},inferno:{label:"Inferno",color:16347926,costMult:40,adminOnly:!0}},Ip={mini_gun:{label:"Mini Gun",baseCost:50,shredBonus:1},saw_blade:{label:"Saw Blade",baseCost:65,shredBonus:1.15},chainsaw:{label:"Chainsaw",baseCost:80,shredBonus:1.3}},hb=["wood","metal","obsidian"],fb=["diamond","plasma","inferno"];function pb(n,e){const t=Ip[n],i=ub[e];return{id:`${n}_${e}`,type:n,material:e,name:`${i.label} ${t.label}`,cost:Math.round(t.baseCost*i.costMult),color:i.color,shredBonus:t.shredBonus*(i.costMult>=16?1.5:i.costMult>=8?1.25:1),adminOnly:!!i.adminOnly,tier:i.adminOnly?"premium":"basic"}}const Up=[];for(const n of Object.keys(Ip))for(const e of[...hb,...fb])Up.push(pb(n,e));const dd=Up;function ni(n){return dd.find(e=>e.id===n)??null}function mb(){return dd.filter(n=>n.tier==="basic")}function Sh(){return dd}const Co=[{id:"neon_lime",name:"Neon Lime",color:8702998,accent:1332013,cost:350},{id:"hot_pink",name:"Hot Pink",color:15485081,accent:8591427,cost:350},{id:"gold_rush",name:"Gold Rush",color:16436245,accent:8736014,cost:500},{id:"ice_blue",name:"Ice Blue",color:3718648,accent:805486,cost:400},{id:"lava_orange",name:"Lava Orange",color:15357964,accent:4396039,cost:450},{id:"galaxy_purple",name:"Galaxy Purple",color:8141549,accent:3018853,cost:550},{id:"stealth_black",name:"Stealth Black",color:1976635,accent:132631,cost:600},{id:"candy_red",name:"Candy Red",color:15680580,accent:8330525,cost:400},{id:"mint_cream",name:"Mint Cream",color:10090212,accent:1265226,cost:350},{id:"sunset_gradient",name:"Sunset Burst",color:16347926,accent:14362487,cost:750}];function Np(n){return Co.find(e=>e.id===n)??null}function gb(n,e){const t=Np(e);return t?{...n,color:t.color,skinId:t.id,skinAccent:t.accent}:n}const Mh="ccwd-loadout-";function Xa(){return{coins:0,ownedWeapons:[],ownedSkins:[],equippedWeapon:null,equippedSkin:null}}function _b(n){let e=Xa(),t=`${Mh}local`;function i(){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function r(){t=`${Mh}${(n==null?void 0:n())??"local"}`;try{const y=localStorage.getItem(t);y&&(e={...Xa(),...JSON.parse(y)})}catch{e=Xa()}}function s(){r()}function o(){return e.coins}function a(y){return!y||y<=0?0:(e.coins+=y,i(),e.coins)}function c(y){return e.coins>=y}function l(y){return c(y)?(e.coins-=y,i(),!0):!1}function d(y){return e.ownedWeapons.includes(y)}function u(y){return e.ownedSkins.includes(y)}function h(y){const E=ni(y);if(!E)return{ok:!1,reason:"invalid"};if(d(y))return g(y),{ok:!0,weapon:E,alreadyOwned:!0};if(e.ownedWeapons=e.ownedWeapons.filter(A=>{const v=ni(A);return(v==null?void 0:v.type)!==E.type}),e.equippedWeapon){const A=ni(e.equippedWeapon);(A==null?void 0:A.type)===E.type&&(e.equippedWeapon=null)}return l(E.cost)?(e.ownedWeapons.push(y),e.equippedWeapon=y,i(),{ok:!0,weapon:E}):{ok:!1,reason:"insufficient"}}function p(y){const E=Np(y);return!E||u(y)?{ok:!1,reason:"already_owned"}:l(E.cost)?(e.ownedSkins.push(y),i(),{ok:!0,skin:E}):{ok:!1,reason:"insufficient"}}function g(y){return y&&!d(y)?!1:(e.equippedWeapon=y,i(),!0)}function _(y){return y&&!u(y)?!1:(e.equippedSkin=y,i(),!0)}function m(){return e.equippedWeapon?ni(e.equippedWeapon):null}function f(){return e.equippedSkin}function w(){return[...e.ownedWeapons]}function T(){return[...e.ownedSkins]}function x(y){return e.ownedWeapons.some(E=>{var A;return((A=ni(E))==null?void 0:A.type)===y})}function R(y){const E=e.ownedWeapons.find(A=>{var v;return((v=ni(A))==null?void 0:v.type)===y});return E?ni(E):null}return r(),{reloadForPlayer:s,getCoins:o,addCoins:a,canAfford:c,spendCoins:l,ownsWeapon:d,ownsSkin:u,buyWeapon:h,buySkin:p,equipWeapon:g,equipSkin:_,getEquippedWeapon:m,getEquippedSkinId:f,getOwnedWeapons:w,getOwnedSkins:T,ownsWeaponType:x,getOwnedWeaponOfType:R}}const bh=[{radius:wt+24,coins:18},{radius:wt+38,coins:24},{radius:wt+52,coins:32}],Eh=28;function xb(){const n=[];for(let e=0;e<Eh;e++){const t=e/Eh*Math.PI*2+.18,i=bh[e%bh.length];n.push({x:Math.cos(t)*i.radius,z:Math.sin(t)*i.radius,coins:i.coins})}return n}const yb=xb();function vb(){const n=new We;n.name="shred-target";const e=new ne(new qt(.14,.18,2.6,8),it(7029795));e.position.y=1.3,e.castShadow=!0,n.add(e);const t=new We;t.position.y=2.55;const i=new ne(new Ve(2.4,2.4,.12),it(16317180));t.add(i);const r=[{r:1.05,color:14427686,z:.07},{r:.72,color:16777215,z:.08},{r:.38,color:14427686,z:.09},{r:.14,color:16777215,z:.1}];for(const s of r){const o=new ne(new qt(s.r,s.r,.08,24),hi(s.color));o.rotation.x=Math.PI/2,o.position.z=s.z,t.add(o)}return n.add(t),n.userData.board=t,n}function Sb(n){const e=new We;e.name="shred-targets",n.add(e);let t=[],i=null;const r=[];function s(){r.length=0;for(const _ of t)_.alive&&_.mesh.traverse(m=>{m.isMesh&&(m.userData.shredTarget=_,r.push(m))})}function o(){a();for(const _ of yb){const m=vb();m.position.set(_.x,0,_.z),m.rotation.y=Math.atan2(-_.x,-_.z),e.add(m),t.push({mesh:m,x:_.x,z:_.z,health:50,maxHealth:50,coinValue:_.coins,alive:!0,hitCooldown:0,wobble:0})}s()}function a(){for(const _ of t)_.mesh.parent&&e.remove(_.mesh);t=[],r.length=0}function c(){o()}function l(_){i=_}function d(_){return _.alive?(_.alive=!1,e.remove(_.mesh),s(),i==null||i(_),!0):!1}function u(_,m){return _!=null&&_.alive?(_.health-=m,_.wobble=1,_.health<=0?d(_):!1):!1}function h(_){const m=_.intersectObjects(r,!1);return m.length?m[0].object.userData.shredTarget??null:null}function p(_){for(const m of t)_(m)}function g(_){for(const m of t)if(m.alive&&(m.hitCooldown=Math.max(0,m.hitCooldown-_),m.wobble>0)){m.wobble=Math.max(0,m.wobble-_*5);const f=m.mesh.userData.board;f&&(f.rotation.z=Math.sin(m.wobble*18)*m.wobble*.35)}}return o(),{reset:c,update:g,setOnDestroyed:l,damageTarget:u,raycast:h,forEachTarget:p,count:()=>t.filter(_=>_.alive).length}}const Mb=150;function $a(n,e=1.1){const t=new We,i=new ne(new Ve(.38,.32,.55),hi(n));i.position.y=.12,t.add(i);const r=new ne(new Ve(.1,.12,e),it(6583435));r.position.set(0,.08,e*.45),t.add(r);const s=new ne(new Ve(.14,.08,e*.92),it(13358561));return s.position.set(0,.08,e*.45),s.name="chain",t.add(s),t}function bb(n){const e=new We;e.name="weapon-mini_gun";const t=new ne(new Ve(.55,.22,.55),it(3359061));t.position.set(0,.12,0),e.add(t);const i=new ne(new Ve(.62,.42,.75),hi(n));i.position.set(0,.42,.35),e.add(i);const r=new We;r.name="barrels";for(const o of[-.12,0,.12]){const a=new ne(new qt(.06,.06,.85,8),ys());a.rotation.x=Math.PI/2,a.position.set(o,.42,.95),r.add(a)}e.add(r);const s=new ne(new Ve(.72,.28,.35),it(1976635));return s.position.set(0,.55,.55),e.add(s),e}function Eb(n){const e=new We;e.name="weapon-saw_blade";const t=new ne(new Ve(1.35,.18,.35),it(3359061));t.position.set(0,.12,.15),e.add(t);const i=new ne(new qt(.18,.18,.2,10),it(4674921));i.rotation.x=Math.PI/2,i.position.set(0,.28,.55),e.add(i);const r=new ne(new qt(.78,.78,.1,10),hi(n));r.rotation.x=Math.PI/2,r.position.set(0,.28,.55),r.name="blade",e.add(r);const s=new ne(new qt(.88,.88,.05,8),it(14870768));return s.rotation.x=Math.PI/2,s.position.set(0,.28,.55),s.name="teeth",e.add(s),e}function Tb(n){const e=new We;e.name="weapon-chainsaw";const t=$a(n,1.15);t.name="chainsaw-left",t.rotation.y=Math.PI/2,e.add(t);const i=$a(n,1.15);i.name="chainsaw-right",i.rotation.y=-Math.PI/2,e.add(i);const r=$a(n,1.05);return r.name="chainsaw-rear",r.rotation.y=Math.PI,e.add(r),e}function wb(n){if(!(n!=null&&n.mesh))return;const e=n.mesh.getObjectByName("car-weapons");e&&n.mesh.remove(e),n.equippedWeapon=null}function ud(n,e){var o,a,c;if(wb(n),!e||!(n!=null&&n.mesh))return null;const t=ni(e);if(!t)return null;const i=n.collisionHw??.94,r=n.collisionHd??2.25,s=new We;if(s.name="car-weapons",t.type==="mini_gun"){const l=bb(t.color);l.position.set(0,.62,r*.72),s.add(l)}else if(t.type==="saw_blade"){const l=Eb(t.color);l.position.set(0,.18,r*.88),s.add(l)}else if(t.type==="chainsaw"){const l=Tb(t.color);(o=l.children.find(d=>d.name==="chainsaw-left"))==null||o.position.set(-i*.92,.35,-r*.05),(a=l.children.find(d=>d.name==="chainsaw-right"))==null||a.position.set(i*.92,.35,-r*.05),(c=l.children.find(d=>d.name==="chainsaw-rear"))==null||c.position.set(0,.35,-r*.82),s.add(l)}return n.mesh.add(s),n.equippedWeapon=t,t}function Cb(n){var e;return((e=n==null?void 0:n.equippedWeapon)==null?void 0:e.shredBonus)??1}function Ab(n,e,t=!1){var o,a,c,l,d;const i=(o=n==null?void 0:n.mesh)==null?void 0:o.getObjectByName("car-weapons");if(!i||!n.equippedWeapon)return;const r=Math.abs(n.speed),s=n.equippedWeapon;if(s.type==="mini_gun"){const u=(a=i.getObjectByName("weapon-mini_gun"))==null?void 0:a.getObjectByName("barrels");u&&(u.rotation.z+=e*(t?28:4+r*.08))}else if(s.type==="saw_blade"){const u=i.getObjectByName("weapon-saw_blade"),h=e*(6+r*.35);(c=u==null?void 0:u.getObjectByName("blade"))==null||c.rotateZ(h),(l=u==null?void 0:u.getObjectByName("teeth"))==null||l.rotateZ(h*1.1)}else if(s.type==="chainsaw"){const u=i.getObjectByName("weapon-chainsaw"),h=e*(8+r*.25);for(const p of["chainsaw-left","chainsaw-right","chainsaw-rear"])(d=u==null?void 0:u.getObjectByName(p))==null||d.traverse(g=>{g.name==="chain"&&(g.rotation.y+=h)})}}function Ya(n,e,t){const i=e-n.x,r=t-n.z,s=Math.cos(n.rotY),o=Math.sin(n.rotY),a=i*s-r*o,c=i*o+r*s,l=n.collisionHw??.94,d=n.collisionHd??2.25;return c>d*.25&&Math.abs(a)<l*.85?"front":c<-d*.35&&Math.abs(a)<l*.9?"rear":a<-l*.45&&Math.abs(c)<d*.75?"left":a>l*.45&&Math.abs(c)<d*.75?"right":"body"}const lr=new Av,qa=new Ue,ii=[],Rb=.09,ja=8,Za=6,Pb=.35;let ss=!1,ro=0,so=!1,yl=!1,vl=0,Sl=0,Th=0,wh=0,Ka=!1;function Lb(n){n&&(n.addEventListener("pointerdown",e=>{e.button===0&&(so=!0,yl=!1,Th=e.clientX,wh=e.clientY,vl=e.clientX,Sl=e.clientY,ss=!0)}),n.addEventListener("pointermove",e=>{so&&(vl=e.clientX,Sl=e.clientY,Math.hypot(e.clientX-Th,e.clientY-wh)>10&&(yl=!0,ss=!1))}),n.addEventListener("pointerup",e=>{e.button===0&&(ss=!1,so=!1)}),n.addEventListener("pointerleave",()=>{ss=!1,so=!1}))}function Db(){return ss&&!yl}function Ib(n,e){const{vehicle:t,camera:i,renderer:r,scene:s,shredTargets:o,remotePlayers:a,onTargetHit:c,onPlayerShred:l}=e;if(ro=Math.max(0,ro-n),kb(s,n),!(t!=null&&t.equippedWeapon))return{firing:!1};const d=t.equippedWeapon;if(d.type==="mini_gun"&&Db()&&ro<=0){ro=Rb,Ka=!0;const u=Ub({vehicle:t,camera:i,renderer:r,shredTargets:o,remotePlayers:a,scene:s,weapon:d,onPlayerShred:l});return u!=null&&u.coins&&(c==null||c(u.coins,u.kind)),{firing:!0}}return Ka=!1,(d.type==="saw_blade"||d.type==="chainsaw")&&Nb(t,d,o,a,c,l),{firing:Ka}}function Ub({vehicle:n,camera:e,renderer:t,shredTargets:i,remotePlayers:r,scene:s,weapon:o,onPlayerShred:a}){var p,g;const c=t.domElement.getBoundingClientRect();qa.x=(vl-c.left)/c.width*2-1,qa.y=-((Sl-c.top)/c.height)*2+1,lr.setFromCamera(qa,e);const l=(p=i==null?void 0:i.raycast)==null?void 0:p.call(i,lr),d=o.shredBonus??1;if(l){const _=14*d,m=l.coinValue,f=i.damageTarget(l,_);return Ch(s,n,l.mesh.position),f?{coins:Math.round(m*d),kind:"target"}:{coins:Math.round(4*d),kind:"chip"}}const u=new ri(new L(0,1,0),0),h=new L;return lr.ray.intersectPlane(u,h)&&Ch(s,n,h),(g=r==null?void 0:r.forEach)==null||g.call(r,(_,m)=>{const f=new L(m.x,1,m.z);if(lr.ray.origin.distanceTo(f)>55)return;const T=f.clone().sub(lr.ray.origin).normalize();lr.ray.direction.dot(T)>.985&&r.tryGunHit(_,1.5,()=>a==null?void 0:a(_))}),null}function Nb(n,e,t,i,r,s){var c,l,d;const o=Math.abs(n.speed),a=e.shredBonus??1;(c=t==null?void 0:t.forEachTarget)==null||c.call(t,u=>{if(!u.alive||u.hitCooldown>0||Math.hypot(n.x-u.x,n.z-u.z)>3.5)return;const p=Ya(n,u.x,u.z);let g=!1;if(e.type==="saw_blade"&&p==="front"&&o>=ja&&(g=!0),e.type==="chainsaw"&&(p==="left"||p==="right"||p==="rear")&&o>=Za&&(g=!0),!g)return;const _=o*.85*a;u.hitCooldown=Pb;const m=u.coinValue;t.damageTarget(u,_)&&(r==null||r(Math.round(m*a),"shred"))}),e.type==="saw_blade"&&o>=ja&&((l=i==null?void 0:i.forEach)==null||l.call(i,(u,h)=>{Ya(n,h.x,h.z)==="front"&&i.tryShred(u,n,{minSpeed:ja,cooldownSec:4,onShred:()=>s==null?void 0:s(u)})})),e.type==="chainsaw"&&o>=Za&&((d=i==null?void 0:i.forEach)==null||d.call(i,(u,h)=>{const p=Ya(n,h.x,h.z);p!=="left"&&p!=="right"&&p!=="rear"||i.tryShred(u,n,{minSpeed:Za,cooldownSec:4,onShred:()=>s==null?void 0:s(u)})}))}function Ch(n,e,t){var c,l;const i=new L(e.x,.9,e.z),r=(l=(c=e.mesh)==null?void 0:c.getObjectByName("car-weapons"))==null?void 0:l.getObjectByName("weapon-mini_gun");r&&r.getWorldPosition(i);const s=new Zt().setFromPoints([i,t.clone()]),o=new Yl({color:16498468,transparent:!0,opacity:.9}),a=new Tf(s,o);n.add(a),ii.push({mesh:a,life:.08})}function kb(n,e){for(let t=ii.length-1;t>=0;t--)ii[t].life-=e,ii[t].life<=0&&(n.remove(ii[t].mesh),ii[t].mesh.geometry.dispose(),ii[t].mesh.material.dispose(),ii.splice(t,1))}function Ob(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function Fb(n,{onEquip:e,onClose:t,getCoinsText:i,onPurchaseFail:r}){let s=null,o=!1;s=document.createElement("div"),s.id="kill-shop",s.className="shop-overlay",s.innerHTML=`
    <div class="shop-panel">
      <header class="shop-header">
        <h1>Kill Shop</h1>
        <p>One weapon per type (mini gun, saw, or chainsaw). Hold click to shoot targets with a mini gun.</p>
        <p class="shop-coins" id="kill-shop-coins">Coins: 0</p>
      </header>
      <div class="shop-tabs">
        <button type="button" class="shop-tab active" data-tab="buy">Buy</button>
        <button type="button" class="shop-tab" data-tab="equip">Equip</button>
      </div>
      <div class="shop-grid" id="kill-shop-grid"></div>
      <button type="button" class="shop-close" id="kill-shop-close">Close</button>
    </div>
  `,document.body.appendChild(s);const a=s.querySelector("#kill-shop-grid"),c=s.querySelector("#kill-shop-coins");let l="buy";function d(){var f,w;if(!a)return;a.innerHTML="",c.textContent=(i==null?void 0:i())??`Coins: ${n.getCoins()}`;const _=mb(),m=l==="buy"?_:_.filter(T=>n.ownsWeapon(T.id));if(l==="equip"&&m.length===0){a.innerHTML='<p class="shop-empty">Buy a weapon first!</p>';return}for(const T of m){const x=n.ownsWeapon(T.id),R=((f=n.getEquippedWeapon())==null?void 0:f.id)===T.id,y=document.createElement("button");y.type="button",y.className="shop-item",R&&y.classList.add("equipped");const E=(w=n.getOwnedWeaponOfType)==null?void 0:w.call(n,T.type);y.innerHTML=`
        <span class="shop-item-swatch" style="background:#${T.color.toString(16).padStart(6,"0")}"></span>
        <span class="shop-item-name">${Ob(T.name)}</span>
        <span class="shop-item-meta">${l==="buy"?`${T.cost} coins${E&&E.id!==T.id?" · replaces":""}`:R?"Equipped":"Owned"}</span>
      `,y.addEventListener("click",()=>{var A;if(l==="buy"){if(x){n.equipWeapon(T.id),e==null||e(T.id),d();return}const v=n.buyWeapon(T.id);v.ok?e==null||e(((A=v.weapon)==null?void 0:A.id)??T.id):v.reason==="insufficient"&&(r==null||r("insufficient"))}else n.equipWeapon(T.id),e==null||e(T.id);d()}),a.appendChild(y)}}s.querySelectorAll(".shop-tab").forEach(_=>{_.addEventListener("click",()=>{l=_.dataset.tab,s.querySelectorAll(".shop-tab").forEach(m=>m.classList.toggle("active",m===_)),d()})}),s.querySelector("#kill-shop-close").addEventListener("click",()=>h());function u(){o=!0,s.style.display="flex",d()}function h(){o=!1,s.style.display="none",t==null||t()}function p(){return o}function g(){o&&d()}return{showKillShop:u,hideKillShop:h,isKillShopVisible:p,refreshKillShop:g}}function Ah(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function Bb(n,{onEquipWeapon:e,onEquipSkin:t,onClose:i,getCoinsText:r,onPurchaseFail:s}){let o=null,a=!1;o=document.createElement("div"),o.id="admin-shop",o.className="shop-overlay",o.innerHTML=`
    <div class="shop-panel admin-shop-panel">
      <header class="shop-header">
        <h1>Admin Shop</h1>
        <p>Owner only — car skins and expanded weapons.</p>
        <p class="shop-coins" id="admin-shop-coins">Coins: 0</p>
      </header>
      <div class="shop-tabs">
        <button type="button" class="shop-tab active" data-tab="skins">Skins</button>
        <button type="button" class="shop-tab" data-tab="weapons">Weapons</button>
        <button type="button" class="shop-tab" data-tab="equip">Equip</button>
      </div>
      <div class="shop-grid" id="admin-shop-grid"></div>
      <button type="button" class="shop-close" id="admin-shop-close">Close</button>
    </div>
  `,document.body.appendChild(o);const c=o.querySelector("#admin-shop-grid"),l=o.querySelector("#admin-shop-coins");let d="skins";function u(w){const T=w?Co:Co.filter(x=>n.ownsSkin(x.id));if(!w&&T.length===0){c.innerHTML='<p class="shop-empty">Buy a skin in the Skins tab!</p>';return}for(const x of T){const R=n.ownsSkin(x.id),y=n.getEquippedSkinId()===x.id,E=document.createElement("button");E.type="button",E.className="shop-item",y&&E.classList.add("equipped"),E.innerHTML=`
        <span class="shop-item-swatch" style="background:#${x.color.toString(16).padStart(6,"0")}"></span>
        <span class="shop-item-name">${Ah(x.name)}</span>
        <span class="shop-item-meta">${w?`${x.cost} coins`:y?"Equipped":"Owned"}</span>
      `,E.addEventListener("click",()=>{if(w)if(R)n.equipSkin(x.id),t==null||t(x.id);else{const A=n.buySkin(x.id);A.ok?(n.equipSkin(x.id),t==null||t(x.id)):A.reason==="insufficient"&&(s==null||s("insufficient"))}else n.equipSkin(x.id),t==null||t(x.id);p()}),c.appendChild(E)}}function h(w){var R;const T=Sh(),x=w?T:T.filter(y=>n.ownsWeapon(y.id));if(!w&&x.length===0){c.innerHTML='<p class="shop-empty">Buy weapons in the Weapons tab!</p>';return}for(const y of x){const E=n.ownsWeapon(y.id),A=((R=n.getEquippedWeapon())==null?void 0:R.id)===y.id,v=document.createElement("button");v.type="button",v.className="shop-item",A&&v.classList.add("equipped"),y.tier==="premium"&&v.classList.add("premium"),v.innerHTML=`
        <span class="shop-item-swatch" style="background:#${y.color.toString(16).padStart(6,"0")}"></span>
        <span class="shop-item-name">${Ah(y.name)}</span>
        <span class="shop-item-meta">${w?`${y.cost} coins`:A?"Equipped":"Owned"}${y.tier==="premium"?" ★":""}</span>
      `,v.addEventListener("click",()=>{var M;if(w)if(E)n.equipWeapon(y.id),e==null||e(y.id);else{const P=n.buyWeapon(y.id);P.ok?e==null||e(((M=P.weapon)==null?void 0:M.id)??y.id):P.reason==="insufficient"&&(s==null||s("insufficient"))}else n.equipWeapon(y.id),e==null||e(y.id);p()}),c.appendChild(v)}}function p(){if(c){if(c.innerHTML="",l.textContent=(r==null?void 0:r())??`Coins: ${n.getCoins()}`,d==="skins")u(!0);else if(d==="weapons")h(!0);else if(d==="equip"){const w=Co.filter(x=>n.ownsSkin(x.id)),T=Sh().filter(x=>n.ownsWeapon(x.id));if(w.length===0&&T.length===0){c.innerHTML='<p class="shop-empty">Buy skins or weapons first!</p>';return}w.length&&u(!1),T.length&&h(!1)}}}o.querySelectorAll(".shop-tab").forEach(w=>{w.addEventListener("click",()=>{d=w.dataset.tab,o.querySelectorAll(".shop-tab").forEach(T=>T.classList.toggle("active",T===w)),p()})}),o.querySelector("#admin-shop-close").addEventListener("click",()=>_());function g(){a=!0,o.style.display="flex",p()}function _(){a=!1,o.style.display="none",i==null||i()}function m(){return a}function f(){a&&p()}return{showAdminShop:g,hideAdminShop:_,isAdminShopVisible:m,refreshAdminShop:f}}const Ja="ccwd-build";function zb(){const n=location.hostname;if(n==="localhost"||n==="127.0.0.1")return;const e=async()=>{try{const t=await fetch(`./version.json?_=${Date.now()}`,{cache:"no-store"});if(!t.ok)return;const{v:i}=await t.json();if(!i)return;const r=localStorage.getItem(Ja);if(r&&r!==i){tb(),localStorage.setItem(Ja,i),location.reload();return}r||localStorage.setItem(Ja,i)}catch{}};e(),setInterval(e,180*1e3)}eb().then(()=>{zb()});const Hb=5,Rh=7,Gb=.05,Vb=0,Wb=0,Ph=5,Xb=new URLSearchParams(window.location.search).has("teleport"),{canvas:Xt,ctx:ue}=Yp();Xt.id="title-canvas";Xt.style.position="fixed";Xt.style.inset="0";Xt.style.zIndex="1";const hn=new jp(document.body),an=ym();an.onExit(()=>Fp());const Je=Xv(),ye=Cf(0,0);jv(Je.scene,ye);const Sr=GM(Je.scene);let Ut=$M()?"drawPaper":"title",Jr=Xb?1.8:0,Qr=0,oo=0,Qa=0,cs=!1,ls=!1,ao=!1,Ml=0,ot=null,Fi=!1,ec=0,fr=1,tc=!1,nc=!1,ic=!1,fe=null,Ht=!1,Mr=0,Lh=0,os=0,Rr=[],Ai=0,Dh=!1,Ih={},as=0;const ds=document.getElementById("action-toast"),Rn=document.getElementById("controls-hud"),Pr=document.getElementById("damage-hud"),Ri=document.getElementById("room-banner"),pr=document.getElementById("super-dash-btn"),co=document.getElementById("dash-score-hud"),Bo=document.getElementById("death-overlay"),zo=document.getElementById("death-timer"),mr=document.getElementById("non-dying-btn"),rc=document.getElementById("coin-hud"),Ho=document.getElementById("kill-shop-btn"),Go=document.getElementById("admin-shop-btn");let Wn=!1;function $b(){return(ot==null?void 0:ot.id)??"local"}const Pn=_b($b),gs=Sb(Je.scene);function hd(){return`Coins: ${Pn.getCoins()}`}function kp(n,e){!n||n<=0||(Pn.addCoins(n),pd(),Jb(),eE(),e&&St(e))}gs.setOnDestroyed(()=>{});let Uh={firing:!1};function Yb(n,e){if(!n||n<=0)return;const t=e==="shred"?`+${n} coins — shredded!`:e==="target"?`+${n} coins — target destroyed!`:`+${n} coins — hit!`;kp(n,t)}function qb(){const n=Math.round(Mb*Cb(fe));kp(n,`+${n} coins — player shredded!`)}const jb=Fb(Pn,{getCoinsText:hd,onEquip:n=>{fe&&ud(fe,n);const e=Pn.getEquippedWeapon();(e==null?void 0:e.type)==="mini_gun"?St("Mini gun mounted — hold click to shoot!"):(e==null?void 0:e.type)==="saw_blade"?St("Saw blade mounted — ram targets head-on!"):(e==null?void 0:e.type)==="chainsaw"?St("Chainsaws mounted on sides & back — sideswipe to shred!"):St("Weapon equipped on your car!")},onClose:()=>kr(),onPurchaseFail:()=>St("Not enough coins!")}),Zb=Bb(Pn,{getCoinsText:hd,onEquipWeapon:n=>{fe&&ud(fe,n);const e=Pn.getEquippedWeapon();(e==null?void 0:e.type)==="mini_gun"?St("Mini gun mounted — hold click to shoot!"):(e==null?void 0:e.type)==="saw_blade"?St("Saw blade mounted — ram targets head-on!"):(e==null?void 0:e.type)==="chainsaw"?St("Chainsaws mounted on sides & back — sideswipe to shred!"):St("Weapon equipped on your car!")},onEquipSkin:()=>{St("Skin equipped — spawn a car from the garage to apply it!")},onClose:()=>kr(),onPurchaseFail:()=>St("Not enough coins!")}),{showKillShop:Kb,isKillShopVisible:bl,refreshKillShop:Jb}=jb,{showAdminShop:Qb,isAdminShopVisible:El,refreshAdminShop:eE}=Zb;function $n(){return Fi||!ot}Gh(()=>Vo(Rn,{driving:Ht}));Zv(rE);YM(()=>Nh(),()=>Nh(!0));function Nh(n=!1){Ut="title",Xt.style.display="block",Dp(),n&&Ap()}Ut==="drawPaper"&&(Xt.style.display="none",XM());HM(({room:n,isHost:e})=>{ot=n,Fi=e,$n()||(Wn=!1),Pn.reloadForPlayer(),ye.x=0,ye.z=0,gi(ye),tE(n),Ut="world",Hp(),zp(Bp(n.code??"solo")),Ao(),gs.reset(),St("You're in the game!")});function tE(n){n.onMessage=(e,t)=>{e.t==="pose"&&e.id&&e.id!==n.id&&(n.role==="host"&&n.relay(t,e),Sr.applyPose(e.id,e)),e.t==="join"&&e.id&&(Sr.applyPose(e.id,{x:0,z:4,facing:0,walkPhase:0,isMoving:!1}),fr+=1,Ao(),St("Someone joined!"),Fi&&yt.syncState()),e.t==="leave"&&e.id&&(Sr.remove(e.id),fr=Math.max(1,fr-1),Ao()),(e.t==="dashState"||e.t==="dashCollect")&&(yt.handleMessage(e),Lr()),e.t==="dashScoreReset"&&(yt.handleMessage(e),Lr())},n.onPeerCount=e=>{fr=e,Ao()}}function Ao(){if(!(!Ri||!(ot!=null&&ot.code)))if(Fi){const n=Cp(ot.code);Ri.innerHTML=`Room <strong>${ot.code}</strong> · ${fr} player(s) · <a href="${n}" target="_blank" rel="noopener">Share link</a>`,Ri.hidden=!1}else Ri.textContent=`Room ${ot.code} · ${fr} player(s)`,Ri.hidden=!1}function nE(){ot!=null&&ot.id&&ot.send({t:"pose",id:ot.id,x:ye.x,z:ye.z,facing:ye.facing,walkPhase:ye.walkPhase,isMoving:ye.isMoving})}function iE(n){const e=$n()?Pn.getEquippedSkinId():null;return e?gb(n,e):n}function rE(n){var e;fe&&(Of(Je.scene,fe),fe=null,Ht=!1,ye.inVehicle=null,ye.mesh.visible=!0),fe=cM(ye,iE(n),Je.clampPosition,Je.envTex),tM(Je.scene,fe),ud(fe,((e=Pn.getEquippedWeapon())==null?void 0:e.id)??null),Ht=!0,an.setDriving(!0),nM(ye,fe),Vo(Rn,{driving:!0}),Dl(Pr,!0),Ll(Pr,fe)}function sE(n){if(!(!fe||Mr>0)){if(VS(fe,Je.scene,n,Rr),Ll(Pr,fe),Nf(fe)&&!Wn){Op();return}if(ed(n)){oM(fe,n);const e=Math.abs(n)>=38;os=e?.5:.22,Mr=e?.55:.4}else Math.abs(n)>5&&(fe.speed*=.55,Mr=.12)}}function Op(){if(!ye.dead){if(ye.dead=!0,Ai=Ph,Ht&&fe){const n=fe.x,e=fe.z,t=fe.rotY;Ff(ye,fe),ye.x=n,ye.z=e,ye.facing=t,fe.speed=0,Ht=!1,an.setDriving(!1),yt.setSuperDash(!1),fe.superDashOn=!1}yt.resetPlayerScore(),Lr(),ye.mesh.rotation.x=-Math.PI/2,gi(ye),Di(Rn,!1),Dl(Pr,!1),ai(!1),Lr(),Bo&&(Bo.hidden=!1),zo&&(zo.textContent=`Respawning in ${Ph}...`),St("Your car was destroyed!")}}function oE(){var n;ye.dead=!1,Ai=0,fe&&(Of(Je.scene,fe),fe=null);for(const e of Rr)(n=e.mesh.parent)==null||n.remove(e.mesh);Rr.length=0,ye.x=Vb,ye.z=Wb,ye.facing=0,ye.mesh.rotation.set(0,0,0),ye.mesh.visible=!0,ye.inVehicle=null,gi(ye),Ht=!1,an.setDriving(!1),Bo&&(Bo.hidden=!0),ai(!0),Kl(),Di(Rn,!0,{driving:!1}),Je.updateCamera(ye.x,ye.z,ye.facing),St("Respawned at spawn!")}function aE(n){Ai=Math.max(0,Ai-n),zo&&(zo.textContent=Ai>0?`Respawning in ${Math.ceil(Ai)}...`:"Respawning..."),rd(Rr,n),Je.updateWorld(ye.x,ye.z),Je.updateCamera(ye.x,ye.z,ye.facing),Ai<=0&&oE()}function Fp(){!fe||!Ht||(Ff(ye,fe),Ht=!1,an.setDriving(!1),gi(ye),Je.updateCamera(ye.x,ye.z,ye.facing),Vo(Rn,{driving:!1}),Dl(Pr,!1),St("Exited vehicle"))}function cE(){return em(hn)}function kh(n,e){return{throttle:Math.max(n.throttle??0,e.throttle??0),brake:Math.max(n.brake??0,e.brake??0),reverse:Math.max(n.reverse??0,e.reverse??0),steer:Math.abs(n.steer)>Math.abs(e.steer)?n.steer:e.steer}}function Oh(n){var i,r;if(!n||Ut!=="world"||oc()||tl())return;const{fired:e,prevPressed:t}=nm(n,Pl(),Ih);Ih=t;for(const s of e)St(s.action);(i=n.buttons[9])!=null&&i.pressed&&!tc&&(tc=!0,Vh()),(r=n==null?void 0:n.buttons[9])!=null&&r.pressed||(tc=!1)}function lE(n,e){const t=Math.max(0,Math.min(1,(e-n.topY)/(n.bottomY-n.topY)));return n.topW*2+(n.bottomW-n.topW*2)*t}function dE(n,e,t){const i=e*.56,r=lE(t,i),s=Math.min(r*.82,n*.78,420),o=s*.34;return{x:t.cx-s/2,y:i-o/2,w:s,h:o,cx:t.cx,cy:i}}function uE(n){const t=n.h*.72,i=n.w*.92,r=n.cy+n.h/2+14+t/2;return{x:n.cx-i/2,y:r-t/2,w:i,h:t,cx:n.cx,cy:r}}function hE(n,e){const t=Xt.getBoundingClientRect(),i=Xt.width/t.width,r=Xt.height/t.height;return{x:(n-t.left)*i,y:(e-t.top)*r}}function Fh(n,e,t){return n>=t.x&&n<=t.x+t.w&&e>=t.y&&e<=t.y+t.h}function fE(n,e,t){const i=e*.22,r=44,s="car crashing with ",o="dashing";ue.save(),ue.globalAlpha=t,ue.font=`800 ${r}px system-ui, sans-serif`,ue.textBaseline="middle";const a=ue.measureText(s+o).width;let c=n/2-a/2;ue.textAlign="left",ue.fillStyle="#14532d",ue.fillText(s,c,i),c+=ue.measureText(s).width,ue.fillText(o,c,i);const l=ue.measureText(o).width,d=i+r*.38;ue.strokeStyle="#14532d",ue.lineWidth=4,ue.beginPath(),ue.moveTo(c,d),ue.lineTo(c+l,d),ue.stroke(),ue.restore()}function Bh(n,e,t,i,r,s){const o=1+Math.sin(i)*.04+(r?.05:0)+(s?-.03:0),a=n.w*o,c=n.h*o,l=n.cx-a/2,d=n.cy-c/2,u=c*.28;ue.save(),ue.shadowColor="rgba(0,0,0,0.45)",ue.shadowBlur=24,ue.shadowOffsetY=8;const h=ue.createLinearGradient(l,d,l,d+c);h.addColorStop(0,s?t.pressedTop:t.top),h.addColorStop(1,s?t.pressedBottom:t.bottom),ue.fillStyle=h,ue.beginPath(),ue.roundRect(l,d,a,c,u),ue.fill(),ue.shadowBlur=0,ue.shadowOffsetY=0,ue.strokeStyle=t.stroke,ue.lineWidth=5,ue.stroke(),sc(ue,e,n.cx,n.cy,{size:Math.floor(c*.38),color:t.text}),ue.restore()}function pE(){Ut="comingSoon",Ml=Hb,ot=null,Fi=!1,Pn.reloadForPlayer(),ye.x=0,ye.z=0,gi(ye),Hp(),zp(Bp(String(Date.now()))),gs.reset()}function mE(n,e){const t=hE(hn.pointer.x,hn.pointer.y);cs=Fh(t.x,t.y,n),ls=Fh(t.x,t.y,e),Xt.style.cursor=cs||ls?"pointer":"default",hn.pointer.down&&!ao&&(cs?(pE(),ao=!0):ls&&(Ap(),ao=!0)),hn.pointer.down||(ao=!1)}function zh(n,e,t=1){const i=n/2,r=e*.42,s=e,o=n*.08*t,a=n*.92;return{cx:i,topY:r,bottomY:s,topW:o,bottomW:a}}function gE(n,e,t){if(t<=0)return zh(n,e,t);const i=zh(n,e,t),{cx:r,topY:s,bottomY:o,topW:a,bottomW:c}=i;ue.save(),ue.globalAlpha=Math.min(1,t);const l=ue.createLinearGradient(0,s,0,o);return l.addColorStop(0,"#334155"),l.addColorStop(1,"#1e293b"),ue.fillStyle=l,ue.beginPath(),ue.moveTo(r-a,s),ue.lineTo(r+a,s),ue.lineTo(r+c/2,o),ue.lineTo(r-c/2,o),ue.closePath(),ue.fill(),ue.strokeStyle="rgba(250,204,21,0.85)",ue.lineWidth=3,ue.setLineDash([18,16]),ue.beginPath(),ue.moveTo(r,s),ue.lineTo(r,o),ue.stroke(),ue.setLineDash([]),ue.fillStyle="rgba(15,23,42,0.35)",ue.fillRect(0,e*.72,n,e*.28),ue.restore(),i}function St(n){as=2,ds&&(ds.textContent=n,ds.classList.add("show"))}function Bp(n){let e=0;for(let t=0;t<n.length;t++)e=(e<<5)-e+n.charCodeAt(t)|0;return Math.abs(e)||1}const yt=db(Je.scene,{getPlayerId:()=>(ot==null?void 0:ot.id)??"local",isHost:()=>!ot||Fi,send:n=>{ot&&(Fi&&n.t==="dashState"?ot.send(n):n.t==="dashCollect"||n.t==="dashScoreReset"?ot.sendToHost(n):ot.send(n))}});yt.setToast(St);function zp(n){yt.reset(n),yt.isSessionActive()&&St("Blue Dashing circles spawned — collect them!")}function fd(){if(!mr)return;$n()||(Wn=!1);const n=$n()&&(Ut==="world"||Ut==="comingSoon")&&!ye.dead;mr.hidden=!n,mr.classList.toggle("active",Wn),mr.textContent=Wn?"NON-DYING":"DYING ON"}mr&&mr.addEventListener("click",()=>{$n()&&(Wn=!Wn,fd(),St(Wn?"Non-dying ON — drive with no parts!":"Dying ON — destroyed car kills you"))});function pd(){if(!rc)return;const n=(Ut==="world"||Ut==="comingSoon")&&!ye.dead;rc.hidden=!n,rc.textContent=hd()}function kr(){const n=(Ut==="world"||Ut==="comingSoon")&&!ye.dead,e=bl()||El();Ho&&(Ho.hidden=!n||$n()||e),Go&&(Go.hidden=!n||!$n()||e)}Ho&&Ho.addEventListener("click",()=>{$n()||(Kb(),kr())});Go&&Go.addEventListener("click",()=>{$n()&&(Qb(),kr())});function Lr(){const n=yt.isLocalLeader()&&Ht&&yt.isSessionActive();if(pr&&(pr.hidden=!n,pr.classList.toggle("active",yt.isSuperDashOn()),pr.textContent=yt.isSuperDashOn()?"NORMAL SPEED":"SUPER DASH"),co)if(Ut==="world"&&yt.isSessionActive()){const e=yt.getScores(),t=e[(ot==null?void 0:ot.id)??"local"]??0,i=yt.getLeaderIds(),r=i.length?Math.max(...i.map(s=>e[s]??0)):0;co.hidden=!1,co.textContent=`Dashing: ${t}${n?" ★ LEADING":""} · Best: ${r}`}else co.hidden=!0;n?fe&&(fe.superDashOn=yt.isSuperDashOn(),fe.superMaxSpeed=yt.SUPER_MAX_SPEED,fe.superAccelMult=yt.SUPER_ACCEL_MULT):(yt.setSuperDash(!1),fe&&(fe.superDashOn=!1))}pr&&pr.addEventListener("click",()=>{if(!yt.isLocalLeader()||!Ht||!fe)return;const n=yt.toggleSuperDash();fe.superDashOn=n,fe.superMaxSpeed=yt.SUPER_MAX_SPEED,fe.superAccelMult=yt.SUPER_ACCEL_MULT,St(n?"Super dash ON!":"Normal speed"),Lr()});function Hp(){Xt.style.display="none",Je.show(),Dh||(Lv(Je.renderer.domElement),Lb(Je.renderer.domElement),Dh=!0),ai(!0),Kl(),an.setVisible(!0),an.setDriving(Ht),Di(Rn,!0,{driving:Ht}),fd(),pd(),kr()}function _E(n){if(ye.dead){aE(n);return}const e=Kp();let{mx:t,mz:i}=Jp(e);const r=Qp(hn),s=an.readMove();t+=r.mx+s.mx,i+=r.mz+s.mz;const o=Math.hypot(t,i);if(o>1&&(t/=o,i/=o),Mr>0&&(Mr=Math.max(0,Mr-n)),os>0&&(os=Math.max(0,os-n*2.8)),Lh+=n,Ht&&fe){const d=tm(e),u=cE(),h=an.readDrive(),p=kh(kh(d,u),h),{impactSpeed:g,wallHit:_}=aM(fe,p,n,Je.clampPosition);if(Je.city.checkCarCollision(fe.x,fe.z,fe.rotY,fe.collisionHw??1.15,fe.collisionHd??2.25)||_){const f=g;sE(f),ed(f)||(fe.x=fe.prevX,fe.z=fe.prevZ),Bf(fe)}if(sM(fe,Lh,n),rd(Rr,n),gs.update(n),Uh=Ib(n,{vehicle:fe,camera:Je.camera,renderer:Je.renderer,scene:Je.scene,shredTargets:gs,remotePlayers:Sr,onTargetHit:Yb,onPlayerShred:qb}),Ab(fe,n,Uh.firing),Sr.tickCooldowns(n),Ll(Pr,fe),Nf(fe)&&!Wn){Op();return}Je.updateWorld(fe.x,fe.z),Je.updateDrivingCamera(fe.x,fe.z,fe.rotY,os),Oh(e),hn.isPressed("e")&&!ic&&(ic=!0,Fp()),hn.isPressed("e")||(ic=!1);return}qv(ye,t,i,n);const a=ye.x+t*Rh*n,c=ye.z+i*Rh*n,l=Je.clampPosition(a,c);ye.x=l.x,ye.z=l.z,gi(ye),Je.updateWorld(ye.x,ye.z),Je.updateCamera(ye.x,ye.z,ye.facing),Sr.lerpAll(n),ec+=n,ec>=Gb&&(ec=0,nE()),Oh(e),hn.isPressed("m")&&!nc&&(nc=!0,Vh()),hn.isPressed("m")||(nc=!1)}function xE(n){const{width:e,height:t}=Xt;if(!((oc()||tl()||dh()||mh()||bl()||El())&&(Di(Rn,!1),oc()||mh()))){if(as>0&&(as=Math.max(0,as-n),as===0&&ds&&ds.classList.remove("show")),Jr>0){Jr=Math.max(0,Jr-n);const i=Jr>.35?1-(1.8-Jr)/1.45:0;Xt.style.display="block",Je.hide(),ai(!1),an.setVisible(!1),bd(ue,i>.2?"#e0f2fe":"#22c55e"),i>.05&&(ue.fillStyle=`rgba(255,255,255,${i*.75})`,ue.fillRect(0,0,e,t)),sc(ue,"TELEPORTING...",e/2,t*.38,{color:"#0f172a",size:36});return}if(Ut==="drawPaper"){Xt.style.display="none",Je.hide(),ai(!1),an.setVisible(!1);return}if(Ut==="title"){Xt.style.display="block",Je.hide(),ai(!1),an.setVisible(!1),Di(Rn,!1),Ri&&(Ri.hidden=!0),Qr=Math.min(1,Qr+n*1.2),oo=Math.min(1,oo+n*.55),Qa+=n*4,bd(ue,"#22c55e");const i=gE(e,t,oo),r=dE(e,t,i),s=uE(r);if(ue.globalAlpha=Qr,fE(e,t,Qr),sc(ue,"The best game ever — realism incoming.",e/2,t*.3,{color:"#166534",size:18}),ue.globalAlpha=1,!dh()){mE(r,s);const o=Math.min(1,.35+oo*.65)*Qr;ue.globalAlpha=o,Bh(r,"PLAY",{top:"#fde047",bottom:"#facc15",pressedTop:"#facc15",pressedBottom:"#eab308",stroke:"#854d0e",text:"#422006"},Qa,cs,hn.pointer.down&&cs),Bh(s,"MULTIPLAYER",{top:"#4ade80",bottom:"#22c55e",pressedTop:"#22c55e",pressedBottom:"#16a34a",stroke:"#14532d",text:"#14532d"},Qa+.5,ls,hn.pointer.down&&ls),ue.globalAlpha=1}return}(Ut==="comingSoon"||Ut==="world")&&(Je.renderer.domElement.style.boxShadow="",yt.update(n,Ht?fe:null),rd(Rr,n),Lr(),fd(),pd(),kr(),!tl()&&!bl()&&!El()&&_E(n),Ut==="comingSoon"?(Ml-=n,Ml<=0&&(Ut="world"),Di(Rn,!0,{driving:Ht}),ai(!0),an.setVisible(!1)):(ai(!0),Di(Rn,!0,{driving:Ht})),Je.render())}}window.addEventListener("gamepadconnected",()=>{});Zp(xE);
