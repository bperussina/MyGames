var Xh=n=>{throw TypeError(n)};var cr=(n,e,t)=>e.has(n)?Xh("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);function $h(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in n)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Yh(n=document.body){const e=document.createElement("canvas");e.style.display="block",n.appendChild(e);const t=e.getContext("2d");function i(){e.width=window.innerWidth,e.height=window.innerHeight}return i(),window.addEventListener("resize",i),{canvas:e,ctx:t,resize:i}}function Zc(n,e="#1a1a2e"){n.fillStyle=e,n.fillRect(0,0,n.canvas.width,n.canvas.height)}const qh=new Set(["arrowup","arrowdown","arrowleft","arrowright"," ","w","a","s","d","x","e","r","l","b"]);class jh{constructor(e=window){this.keys=new Set,this.pointer={x:0,y:0,down:!1},document.addEventListener("keydown",t=>{const i=t.key.toLowerCase();this.keys.add(i),qh.has(i)&&t.preventDefault()}),document.addEventListener("keyup",t=>{this.keys.delete(t.key.toLowerCase())}),e.addEventListener("pointermove",t=>{this.pointer.x=t.clientX,this.pointer.y=t.clientY}),e.addEventListener("pointerdown",t=>{this.pointer.x=t.clientX,this.pointer.y=t.clientY,this.pointer.down=!0,e.focus&&e.focus()}),e.addEventListener("pointerup",()=>{this.pointer.down=!1})}isDown(e){return this.keys.has(e.toLowerCase())}isPressed(...e){return e.some(t=>this.isDown(t))}}function Zh(n){let e=0,t=performance.now();function i(r){const s=(r-t)/1e3;t=r,n(s),e=requestAnimationFrame(i)}return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)}function bs(n,e,t,i,r={}){const{color:s="#ffffff",size:o=24,align:a="center",baseline:c="middle",font:l="sans-serif"}=r;n.fillStyle=s,n.font=`${o}px ${l}`,n.textAlign=a,n.textBaseline=c,n.fillText(e,t,i)}const Kc=.18;function Kh(){var e;return(((e=navigator.getGamepads)==null?void 0:e.call(navigator))??[]).find(t=>t==null?void 0:t.connected)??null}function Jh(n){var i,r,s,o;let e=0,t=0;if(n){const a=n.axes[0]??0,c=n.axes[1]??0;Math.abs(a)>Kc&&(e+=a),Math.abs(c)>Kc&&(t-=c),(i=n.buttons[14])!=null&&i.pressed&&(e-=1),(r=n.buttons[15])!=null&&r.pressed&&(e+=1),(s=n.buttons[12])!=null&&s.pressed&&(t+=1),(o=n.buttons[13])!=null&&o.pressed&&(t-=1)}return{mx:e,mz:t}}function Qh(n){let e=0,t=0;return n.isPressed("w","arrowup")&&(t+=1),n.isPressed("s","arrowdown")&&(t-=1),n.isPressed("a","arrowleft")&&(e-=1),n.isPressed("d","arrowright")&&(e+=1),{mx:e,mz:t}}function ef(n){let e=0,t=0,i=0,r=0;return n.isPressed("w","arrowup")&&(e=1),n.isPressed("s")&&(t=1),n.isPressed("arrowdown")&&(i=1),n.isPressed("a","arrowleft")&&(r-=1),n.isPressed("d","arrowright")&&(r+=1),r=Math.max(-1,Math.min(1,r)),{throttle:e,brake:t,reverse:i,steer:r}}function tf(n){var a,c,l,d,u,h;let e=0,t=0,i=0;if(!n)return{throttle:e,brake:t,reverse:0,steer:i};(a=n.buttons[2])!=null&&a.pressed&&(e=1),(c=n.buttons[1])!=null&&c.pressed&&(t=1);let r=0,s=0;return(l=n.buttons[4])!=null&&l.pressed&&(r=1),(((d=n.buttons[6])==null?void 0:d.value)??((u=n.buttons[6])!=null&&u.pressed?1:0))>.08&&(r=1),(h=n.buttons[5])!=null&&h.pressed&&(s=1),i=s-r,{throttle:e,brake:t,reverse:0,steer:i}}const hc=[{id:"a",label:"A",index:0},{id:"b",label:"B",index:1},{id:"x",label:"X",index:2},{id:"y",label:"Y",index:3},{id:"lb",label:"LB",index:4},{id:"rb",label:"RB",index:5},{id:"lt",label:"LT",index:6},{id:"rt",label:"RT",index:7},{id:"view",label:"View",index:8},{id:"menu",label:"Menu",index:9},{id:"ls",label:"Left stick press",index:10},{id:"rs",label:"Right stick press",index:11},{id:"dpadUp",label:"D-pad Up",index:12},{id:"dpadDown",label:"D-pad Down",index:13},{id:"dpadLeft",label:"D-pad Left",index:14},{id:"dpadRight",label:"D-pad Right",index:15},{id:"xbox",label:"Xbox",index:16}];function nf(n,e,t={}){var s;const i=[];if(!n)return{fired:i,prevPressed:t};const r={...t};for(const o of hc){const a=!!((s=n.buttons[o.index])!=null&&s.pressed),c=t[o.id]??!1;if(r[o.id]=a,a&&!c){const l=(e[o.id]??"").trim();l&&i.push({id:o.id,action:l})}}return{fired:i,prevPressed:r}}const tu="ccwd-button-labels";function fc(){try{return JSON.parse(localStorage.getItem(tu)??"{}")}catch{return{}}}function rf(n){try{localStorage.setItem(tu,JSON.stringify(n))}catch{}}let It=null,xr=null;function nu(n){if(xr=n,It)return It;It=document.createElement("div"),It.id="controller-map",It.innerHTML=`
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
  `,document.body.appendChild(It);const e=It.querySelector("#cm-fields"),t=fc();for(const i of hc){const r=document.createElement("div");r.className="cm-row",r.innerHTML=`
      <span class="cm-line"></span>
      <label class="cm-label">${i.label}</label>
      <input type="text" class="cm-input" data-id="${i.id}" placeholder="(blank = does nothing)" value="${sf(t[i.id]??"")}" />
    `,e.appendChild(r)}return It.querySelector("#cm-done").addEventListener("click",()=>{const i={};It.querySelectorAll(".cm-input").forEach(r=>{i[r.dataset.id]=r.value}),rf(i),of(),xr==null||xr()}),It}function sf(n){return String(n).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function iu(){nu(xr),It.style.display="flex"}function of(){It&&(It.style.display="none")}function Qo(){return(It==null?void 0:It.style.display)==="flex"}const af={x:"Gas",b:"Brake",lb:"Turn left",lt:"Turn left",rb:"Turn right",menu:"Change controls"},cf={a:"chip-a",b:"chip-b",x:"chip-x",y:"chip-y",lb:"chip-bump",rb:"chip-bump",lt:"chip-trigger",rt:"chip-trigger",view:"chip-misc",menu:"chip-misc",ls:"chip-misc",rs:"chip-misc",dpadUp:"chip-dpad",dpadDown:"chip-dpad",dpadLeft:"chip-dpad",dpadRight:"chip-dpad",xbox:"chip-misc"};function pi(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function lf(n,e){const t=(n[e]??"").trim();return t||(af[e]??"").trim()}function df(n,e){return`<span class="pc-key" title="${pi(e)}"><span class="pc-key-letter">${pi(n)}</span><span class="pc-key-word">${pi(e)}</span></span>`}function uf(n,e){return`<span class="pad-chip ${cf[n.id]??"chip-misc"}" title="${pi(n.label)} button — ${pi(e)}"><span class="pad-chip-mark">${pi(n.label)}</span><span class="pad-chip-word">${pi(e)}</span></span>`}function qs(n,{driving:e=!1}={}){if(!n)return;const t=n.querySelector("#controls-body");if(!t)return;const i=fc(),r=e?[{key:"W",word:"Gas"},{key:"↑",word:"Gas"},{key:"S",word:"Brake"},{key:"↓",word:"Reverse"},{key:"A",word:"Left"},{key:"←",word:"Left"},{key:"D",word:"Right"},{key:"→",word:"Right"},{key:"E",word:"Exit car"}]:[{key:"W",word:"Forward"},{key:"↑",word:"Forward"},{key:"A",word:"Left"},{key:"←",word:"Left"},{key:"S",word:"Back"},{key:"↓",word:"Back"},{key:"D",word:"Right"},{key:"→",word:"Right"}],s=['<span class="pad-chip chip-stick" title="Left stick — move"><span class="pad-chip-mark">Stick</span><span class="pad-chip-word">Move</span></span>'];for(const o of hc){const a=lf(i,o.id);a&&s.push(uf(o,a))}t.innerHTML=`
    <p class="controls-mini-hint">${e?"Driving — ↓ reverse then W for speed burst · drag mouse to look":"Walking"} — iPad: use arrows bottom-left · Garage on left</p>
    <div class="controls-mini-block">
      <span class="controls-mini-label">Keyboard</span>
      <div class="pc-keys">${r.map(({key:o,word:a})=>df(o,a)).join("")}</div>
    </div>
    <div class="controls-mini-block">
      <span class="controls-mini-label">Xbox</span>
      <div class="pad-chips">${s.join("")}</div>
    </div>
  `}function yr(n,e,t={}){if(!n)return;if(!e){n.hidden=!0;return}const i=t.driving?"1":"0";(n.hidden||n.dataset.driving!==i)&&(qs(n,t),n.dataset.driving=i),n.hidden=!1}function hf(n){return n>66?"#22c55e":n>33?"#eab308":"#ef4444"}function lr(n,e){const t=hf(e);return`<div class="dmg-row"><span class="dmg-label">${n}</span>
    <div class="dmg-track"><div class="dmg-fill" style="width:${e}%;background:${t}"></div></div>
    <span class="dmg-pct">${Math.round(e)}%</span></div>`}function pc(n,e){if(!n||!(e!=null&&e.partHealth))return;const t=e.partHealth,i=Math.round((t.wheel_fl+t.wheel_fr+t.wheel_rl+t.wheel_rr)/4);n.innerHTML=`
    <p class="dmg-title">Vehicle damage</p>
    ${lr("Engine",t.engine)}
    ${lr("Body",t.body)}
    ${lr("Hood",t.hood)}
    ${lr("Glass",t.windshield)}
    ${lr("Wheels",i)}
  `}function ru(n,e){n&&(e?n.removeAttribute("hidden"):n.setAttribute("hidden",""))}function ff(){return matchMedia("(pointer: coarse)").matches||"ontouchstart"in window}const pf=()=>({mx:0,mz:0}),mf=()=>({throttle:0,brake:0,reverse:0,steer:0});function gf(){if(!ff())return{readMove:pf,readDrive:mf,setDriving:()=>{},setVisible:()=>{},onExit:()=>{}};const n=document.createElement("div");n.id="touch-pad",n.innerHTML=`
    <button type="button" class="touch-btn touch-up" data-mz="1" aria-label="Forward">▲</button>
    <button type="button" class="touch-btn touch-left" data-mx="-1" aria-label="Left">◀</button>
    <button type="button" class="touch-btn touch-right" data-mx="1" aria-label="Right">▶</button>
    <button type="button" class="touch-btn touch-down" data-mz="-1" aria-label="Back">▼</button>
    <button type="button" class="touch-btn touch-exit" id="touch-exit" hidden aria-label="Exit car">Exit</button>
  `,document.body.appendChild(n);const e={mx:0,mz:0};let t=!1;const i=n.querySelector("#touch-exit");function r(o){const a=c=>{if(!c){e.mx=0,e.mz=0;return}if(t){const l=Number(o.dataset.mz||0),d=Number(o.dataset.mx||0);e.mz=l,e.mx=d}else e.mx=Number(o.dataset.mx||0),e.mz=Number(o.dataset.mz||0)};o.addEventListener("pointerdown",c=>{c.preventDefault(),o.setPointerCapture(c.pointerId),a(!0)}),o.addEventListener("pointerup",()=>a(!1)),o.addEventListener("pointercancel",()=>a(!1))}n.querySelectorAll(".touch-btn[data-mx], .touch-btn[data-mz]").forEach(r);let s=null;return i.addEventListener("pointerdown",o=>{o.preventDefault(),s==null||s()}),{readMove(){return t?{mx:0,mz:0}:{...e}},readDrive(){return t?{throttle:e.mz>0?1:0,reverse:e.mz<0?1:0,brake:0,steer:e.mx}:{throttle:0,brake:0,reverse:0,steer:0}},setDriving(o){t=o,e.mx=0,e.mz=0,i.hidden=!o},setVisible(o){n.hidden=!o},onExit(o){s=o}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mc="170",_f=0,Jc=1,vf=2,su=1,ou=2,An=3,Qn=0,Ot=1,Rn=2,Zn=0,Wi=1,Qc=2,el=3,tl=4,xf=5,di=100,yf=101,Sf=102,Mf=103,bf=104,Ef=200,Tf=201,Cf=202,wf=203,ea=204,ta=205,Af=206,Rf=207,Pf=208,Lf=209,Df=210,If=211,Uf=212,Nf=213,Ff=214,na=0,ia=1,ra=2,ji=3,sa=4,oa=5,aa=6,ca=7,au=0,kf=1,Of=2,Kn=0,Bf=1,zf=2,Hf=3,cu=4,Gf=5,Vf=6,Wf=7,lu=300,Zi=301,Ki=302,la=303,da=304,js=306,ua=1e3,mi=1001,ha=1002,hn=1003,Xf=1004,Wr=1005,vn=1006,io=1007,gi=1008,Un=1009,du=1010,uu=1011,Ir=1012,gc=1013,vi=1014,Pn=1015,Or=1016,_c=1017,vc=1018,Ji=1020,hu=35902,fu=1021,pu=1022,dn=1023,mu=1024,gu=1025,Xi=1026,Qi=1027,_u=1028,xc=1029,vu=1030,yc=1031,Sc=1033,Es=33776,Ts=33777,Cs=33778,ws=33779,fa=35840,pa=35841,ma=35842,ga=35843,_a=36196,va=37492,xa=37496,ya=37808,Sa=37809,Ma=37810,ba=37811,Ea=37812,Ta=37813,Ca=37814,wa=37815,Aa=37816,Ra=37817,Pa=37818,La=37819,Da=37820,Ia=37821,As=36492,Ua=36494,Na=36495,xu=36283,Fa=36284,ka=36285,Oa=36286,$f=3200,Yf=3201,yu=0,qf=1,Yn="",qt="srgb",nr="srgb-linear",Zs="linear",it="srgb",Ti=7680,nl=519,jf=512,Zf=513,Kf=514,Su=515,Jf=516,Qf=517,ep=518,tp=519,il=35044,rl="300 es",Ln=2e3,Vs=2001;class ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ro=Math.PI/180,Ba=180/Math.PI;function Br(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Vt(n,e,t){return Math.max(e,Math.min(t,n))}function np(n,e){return(n%e+e)%e}function so(n,e,t){return(1-t)*n+t*e}function dr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ht(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,t=0){Ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,i,r,s,o,a,c,l){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],d=i[4],u=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],f=r[6],w=r[1],T=r[4],v=r[7],P=r[2],b=r[5],E=r[8];return s[0]=o*_+a*w+c*P,s[3]=o*m+a*T+c*b,s[6]=o*f+a*v+c*E,s[1]=l*_+d*w+u*P,s[4]=l*m+d*T+u*b,s[7]=l*f+d*v+u*E,s[2]=h*_+p*w+g*P,s[5]=h*m+p*T+g*b,s[8]=h*f+p*v+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8];return t*o*d-t*a*l-i*s*d+i*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],u=d*o-a*l,h=a*c-d*s,p=l*s-o*c,g=t*u+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*l-d*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(d*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(oo.makeScale(e,t)),this}rotate(e){return this.premultiply(oo.makeRotation(-e)),this}translate(e,t){return this.premultiply(oo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const oo=new Ne;function Mu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ws(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ip(){const n=Ws("canvas");return n.style.display="block",n}const sl={};function Sr(n){n in sl||(sl[n]=!0,console.warn(n))}function rp(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function sp(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function op(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:nr,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===it&&(n.r=Dn(n.r),n.g=Dn(n.g),n.b=Dn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===it&&(n.r=$i(n.r),n.g=$i(n.g),n.b=$i(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Yn?Zs:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Dn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function $i(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const ol=[.64,.33,.3,.6,.15,.06],al=[.2126,.7152,.0722],cl=[.3127,.329],ll=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dl=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[nr]:{primaries:ol,whitePoint:cl,transfer:Zs,toXYZ:ll,fromXYZ:dl,luminanceCoefficients:al,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:ol,whitePoint:cl,transfer:it,toXYZ:ll,fromXYZ:dl,luminanceCoefficients:al,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}});let Ci;class ap{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ci===void 0&&(Ci=Ws("canvas")),Ci.width=e.width,Ci.height=e.height;const i=Ci.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ci}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ws("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Dn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Dn(t[i]/255)*255):t[i]=Dn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let cp=0;class bu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Br(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ao(r[o].image)):s.push(ao(r[o]))}else s=ao(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ao(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ap.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lp=0;class Wt extends ir{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=mi,r=mi,s=vn,o=gi,a=dn,c=Un,l=Wt.DEFAULT_ANISOTROPY,d=Yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=Br(),this.name="",this.source=new bu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case ha:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case ha:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=lu;Wt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,i=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],u=c[8],h=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,v=(p+1)/2,P=(f+1)/2,b=(d+h)/4,E=(u+_)/4,R=(g+m)/4;return T>v&&T>P?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=b/i,s=E/i):v>P?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=b/r,s=R/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=E/s,r=R/s),this.set(i,r,s,t),this}let w=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-_)/w,this.z=(h-d)/w,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dp extends ir{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Wt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new bu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xi extends dp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Eu extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class up extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],d=i[r+2],u=i[r+3];const h=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=u;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==h||l!==p||d!==g){let m=1-a;const f=c*h+l*p+d*g+u*_,w=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const P=Math.sqrt(T),b=Math.atan2(P,f*w);m=Math.sin(m*b)/P,a=Math.sin(a*b)/P}const v=a*w;if(c=c*m+h*v,l=l*m+p*v,d=d*m+g*v,u=u*m+_*v,m===1-a){const P=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=P,l*=P,d*=P,u*=P}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],d=i[r+3],u=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+d*u+c*p-l*h,e[t+1]=c*g+d*h+l*u-a*p,e[t+2]=l*g+d*p+a*h-c*u,e[t+3]=d*g-a*u-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),d=a(r/2),u=a(s/2),h=c(i/2),p=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=h*d*u+l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u-h*p*g;break;case"YXZ":this._x=h*d*u+l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u+h*p*g;break;case"ZXY":this._x=h*d*u-l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u-h*p*g;break;case"ZYX":this._x=h*d*u-l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u+h*p*g;break;case"YZX":this._x=h*d*u+l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u-h*p*g;break;case"XZY":this._x=h*d*u-l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],d=t[6],u=t[10],h=i+a+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(d-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+o*a+r*l-s*c,this._y=r*d+o*c+s*a-i*l,this._z=s*d+o*l+i*c-r*a,this._w=o*d-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,a),u=Math.sin((1-t)*d)/l,h=Math.sin(t*d)/l;return this._w=o*u+this._w*h,this._x=i*u+this._x*h,this._y=r*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ul.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ul.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),d=2*(a*t-s*r),u=2*(s*i-o*t);return this.x=t+c*l+o*u-a*d,this.y=i+c*d+a*l-s*u,this.z=r+c*u+s*d-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return co.copy(this).projectOnVector(e),this.sub(co)}reflect(e){return this.sub(co.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const co=new D,ul=new rr;class zr{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,sn):sn.fromBufferAttribute(s,o),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(e.matrixWorld),this.union(Xr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),$r.subVectors(this.max,ur),wi.subVectors(e.a,ur),Ai.subVectors(e.b,ur),Ri.subVectors(e.c,ur),Bn.subVectors(Ai,wi),zn.subVectors(Ri,Ai),ni.subVectors(wi,Ri);let t=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-ni.z,ni.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,ni.z,0,-ni.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-ni.y,ni.x,0];return!lo(t,wi,Ai,Ri,$r)||(t=[1,0,0,0,1,0,0,0,1],!lo(t,wi,Ai,Ri,$r))?!1:(Yr.crossVectors(Bn,zn),t=[Yr.x,Yr.y,Yr.z],lo(t,wi,Ai,Ri,$r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const bn=[new D,new D,new D,new D,new D,new D,new D,new D],sn=new D,Xr=new zr,wi=new D,Ai=new D,Ri=new D,Bn=new D,zn=new D,ni=new D,ur=new D,$r=new D,Yr=new D,ii=new D;function lo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){ii.fromArray(n,s);const a=r.x*Math.abs(ii.x)+r.y*Math.abs(ii.y)+r.z*Math.abs(ii.z),c=e.dot(ii),l=t.dot(ii),d=i.dot(ii);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const hp=new zr,hr=new D,uo=new D;class Mc{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):hp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;hr.subVectors(e,this.center);const t=hr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(hr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(hr.copy(e.center).add(uo)),this.expandByPoint(hr.copy(e.center).sub(uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new D,ho=new D,qr=new D,Hn=new D,fo=new D,jr=new D,po=new D;class fp{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ho.copy(e).add(t).multiplyScalar(.5),qr.copy(t).sub(e).normalize(),Hn.copy(this.origin).sub(ho);const s=e.distanceTo(t)*.5,o=-this.direction.dot(qr),a=Hn.dot(this.direction),c=-Hn.dot(qr),l=Hn.lengthSq(),d=Math.abs(1-o*o);let u,h,p,g;if(d>0)if(u=o*c-a,h=o*a-c,g=s*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,p=u*(u+o*h+2*a)+h*(o*u+h+2*c)+l}else h=s,u=Math.max(0,-(o*h+a)),p=-u*u+h*(h+2*c)+l;else h=-s,u=Math.max(0,-(o*h+a)),p=-u*u+h*(h+2*c)+l;else h<=-g?(u=Math.max(0,-(-o*s+a)),h=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+h*(h+2*c)+l):h<=g?(u=0,h=Math.min(Math.max(-s,-c),s),p=h*(h+2*c)+l):(u=Math.max(0,-(o*s+a)),h=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+h*(h+2*c)+l);else h=o>0?-s:s,u=Math.max(0,-(o*h+a)),p=-u*u+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ho).addScaledVector(qr,h),p}intersectSphere(e,t){En.subVectors(e.center,this.origin);const i=En.dot(this.direction),r=En.dot(En)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),d>=0?(s=(e.min.y-h.y)*d,o=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,o=(e.min.y-h.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-h.z)*u,c=(e.max.z-h.z)*u):(a=(e.max.z-h.z)*u,c=(e.min.z-h.z)*u),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,i,r,s){fo.subVectors(t,e),jr.subVectors(i,e),po.crossVectors(fo,jr);let o=this.direction.dot(po),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hn.subVectors(this.origin,e);const c=a*this.direction.dot(jr.crossVectors(Hn,jr));if(c<0)return null;const l=a*this.direction.dot(fo.cross(Hn));if(l<0||c+l>o)return null;const d=-a*Hn.dot(po);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,i,r,s,o,a,c,l,d,u,h,p,g,_,m){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,d,u,h,p,g,_,m)}set(e,t,i,r,s,o,a,c,l,d,u,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=d,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Pi.setFromMatrixColumn(e,0).length(),s=1/Pi.setFromMatrixColumn(e,1).length(),o=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const h=o*d,p=o*u,g=a*d,_=a*u;t[0]=c*d,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=h-_*l,t[9]=-a*c,t[2]=_-h*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const h=c*d,p=c*u,g=l*d,_=l*u;t[0]=h+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*d,t[9]=-a,t[2]=p*a-g,t[6]=_+h*a,t[10]=o*c}else if(e.order==="ZXY"){const h=c*d,p=c*u,g=l*d,_=l*u;t[0]=h-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*d,t[9]=_-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const h=o*d,p=o*u,g=a*d,_=a*u;t[0]=c*d,t[4]=g*l-p,t[8]=h*l+_,t[1]=c*u,t[5]=_*l+h,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const h=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*d,t[4]=_-h*u,t[8]=g*u+p,t[1]=u,t[5]=o*d,t[9]=-a*d,t[2]=-l*d,t[6]=p*u+g,t[10]=h-_*u}else if(e.order==="XZY"){const h=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*d,t[4]=-u,t[8]=l*d,t[1]=h*u+_,t[5]=o*d,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*d,t[10]=_*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pp,e,mp)}lookAt(e,t,i){const r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Gn.crossVectors(i,$t),Gn.lengthSq()===0&&(Math.abs(i.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Gn.crossVectors(i,$t)),Gn.normalize(),Zr.crossVectors($t,Gn),r[0]=Gn.x,r[4]=Zr.x,r[8]=$t.x,r[1]=Gn.y,r[5]=Zr.y,r[9]=$t.y,r[2]=Gn.z,r[6]=Zr.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],d=i[1],u=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],w=i[3],T=i[7],v=i[11],P=i[15],b=r[0],E=r[4],R=r[8],S=r[12],y=r[1],A=r[5],O=r[9],F=r[13],V=r[2],X=r[6],W=r[10],q=r[14],H=r[3],te=r[7],re=r[11],ge=r[15];return s[0]=o*b+a*y+c*V+l*H,s[4]=o*E+a*A+c*X+l*te,s[8]=o*R+a*O+c*W+l*re,s[12]=o*S+a*F+c*q+l*ge,s[1]=d*b+u*y+h*V+p*H,s[5]=d*E+u*A+h*X+p*te,s[9]=d*R+u*O+h*W+p*re,s[13]=d*S+u*F+h*q+p*ge,s[2]=g*b+_*y+m*V+f*H,s[6]=g*E+_*A+m*X+f*te,s[10]=g*R+_*O+m*W+f*re,s[14]=g*S+_*F+m*q+f*ge,s[3]=w*b+T*y+v*V+P*H,s[7]=w*E+T*A+v*X+P*te,s[11]=w*R+T*O+v*W+P*re,s[15]=w*S+T*F+v*q+P*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],d=e[2],u=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*c*u-r*l*u-s*a*h+i*l*h+r*a*p-i*c*p)+_*(+t*c*p-t*l*h+s*o*h-r*o*p+r*l*d-s*c*d)+m*(+t*l*u-t*a*p-s*o*u+i*o*p+s*a*d-i*l*d)+f*(-r*a*d-t*c*u+t*a*h+r*o*u-i*o*h+i*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],u=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],w=u*m*l-_*h*l+_*c*p-a*m*p-u*c*f+a*h*f,T=g*h*l-d*m*l-g*c*p+o*m*p+d*c*f-o*h*f,v=d*_*l-g*u*l+g*a*p-o*_*p-d*a*f+o*u*f,P=g*u*c-d*_*c-g*a*h+o*_*h+d*a*m-o*u*m,b=t*w+i*T+r*v+s*P;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/b;return e[0]=w*E,e[1]=(_*h*s-u*m*s-_*r*p+i*m*p+u*r*f-i*h*f)*E,e[2]=(a*m*s-_*c*s+_*r*l-i*m*l-a*r*f+i*c*f)*E,e[3]=(u*c*s-a*h*s-u*r*l+i*h*l+a*r*p-i*c*p)*E,e[4]=T*E,e[5]=(d*m*s-g*h*s+g*r*p-t*m*p-d*r*f+t*h*f)*E,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*f-t*c*f)*E,e[7]=(o*h*s-d*c*s+d*r*l-t*h*l-o*r*p+t*c*p)*E,e[8]=v*E,e[9]=(g*u*s-d*_*s-g*i*p+t*_*p+d*i*f-t*u*f)*E,e[10]=(o*_*s-g*a*s+g*i*l-t*_*l-o*i*f+t*a*f)*E,e[11]=(d*a*s-o*u*s-d*i*l+t*u*l+o*i*p-t*a*p)*E,e[12]=P*E,e[13]=(d*_*r-g*u*r+g*i*h-t*_*h-d*i*m+t*u*m)*E,e[14]=(g*a*r-o*_*r-g*i*c+t*_*c+o*i*m-t*a*m)*E,e[15]=(o*u*r-d*a*r+d*i*c-t*u*c-o*i*h+t*a*h)*E,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,d=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,d*a+i,d*c-r*o,0,l*c-r*a,d*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,d=o+o,u=a+a,h=s*l,p=s*d,g=s*u,_=o*d,m=o*u,f=a*u,w=c*l,T=c*d,v=c*u,P=i.x,b=i.y,E=i.z;return r[0]=(1-(_+f))*P,r[1]=(p+v)*P,r[2]=(g-T)*P,r[3]=0,r[4]=(p-v)*b,r[5]=(1-(h+f))*b,r[6]=(m+w)*b,r[7]=0,r[8]=(g+T)*E,r[9]=(m-w)*E,r[10]=(1-(h+_))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Pi.set(r[0],r[1],r[2]).length();const o=Pi.set(r[4],r[5],r[6]).length(),a=Pi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],on.copy(this);const l=1/s,d=1/o,u=1/a;return on.elements[0]*=l,on.elements[1]*=l,on.elements[2]*=l,on.elements[4]*=d,on.elements[5]*=d,on.elements[6]*=d,on.elements[8]*=u,on.elements[9]*=u,on.elements[10]*=u,t.setFromRotationMatrix(on),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Ln){const c=this.elements,l=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),h=(i+r)/(i-r);let p,g;if(a===Ln)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Vs)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ln){const c=this.elements,l=1/(t-e),d=1/(i-r),u=1/(o-s),h=(t+e)*l,p=(i+r)*d;let g,_;if(a===Ln)g=(o+s)*u,_=-2*u;else if(a===Vs)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Pi=new D,on=new ft,pp=new D(0,0,0),mp=new D(1,1,1),Gn=new D,Zr=new D,$t=new D,hl=new ft,fl=new rr;class xn{constructor(e=0,t=0,i=0,r=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],d=r[9],u=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return hl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fl.setFromEuler(this),this.setFromQuaternion(fl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class Tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gp=0;const pl=new D,Li=new rr,Tn=new ft,Kr=new D,fr=new D,_p=new D,vp=new rr,ml=new D(1,0,0),gl=new D(0,1,0),_l=new D(0,0,1),vl={type:"added"},xp={type:"removed"},Di={type:"childadded",child:null},mo={type:"childremoved",child:null};class Rt extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new D,t=new xn,i=new rr,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new Ne}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.multiply(Li),this}rotateOnWorldAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.premultiply(Li),this}rotateX(e){return this.rotateOnAxis(ml,e)}rotateY(e){return this.rotateOnAxis(gl,e)}rotateZ(e){return this.rotateOnAxis(_l,e)}translateOnAxis(e,t){return pl.copy(e).applyQuaternion(this.quaternion),this.position.add(pl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ml,e)}translateY(e){return this.translateOnAxis(gl,e)}translateZ(e){return this.translateOnAxis(_l,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Kr.copy(e):Kr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(fr,Kr,this.up):Tn.lookAt(Kr,fr,this.up),this.quaternion.setFromRotationMatrix(Tn),r&&(Tn.extractRotation(r.matrixWorld),Li.setFromRotationMatrix(Tn),this.quaternion.premultiply(Li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vl),Di.child=e,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xp),mo.child=e,this.dispatchEvent(mo),mo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vl),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,e,_p),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,vp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),d=o(e.images),u=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new D(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new D,Cn=new D,go=new D,wn=new D,Ii=new D,Ui=new D,xl=new D,_o=new D,vo=new D,xo=new D,yo=new rt,So=new rt,Mo=new rt;class ln{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),an.subVectors(e,t),r.cross(an);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){an.subVectors(r,t),Cn.subVectors(i,t),go.subVectors(e,t);const o=an.dot(an),a=an.dot(Cn),c=an.dot(go),l=Cn.dot(Cn),d=Cn.dot(go),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const h=1/u,p=(l*c-a*d)*h,g=(o*d-a*c)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,wn.x),c.addScaledVector(o,wn.y),c.addScaledVector(a,wn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return yo.setScalar(0),So.setScalar(0),Mo.setScalar(0),yo.fromBufferAttribute(e,t),So.fromBufferAttribute(e,i),Mo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(yo,s.x),o.addScaledVector(So,s.y),o.addScaledVector(Mo,s.z),o}static isFrontFacing(e,t,i,r){return an.subVectors(i,t),Cn.subVectors(e,t),an.cross(Cn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),an.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return ln.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ii.subVectors(r,i),Ui.subVectors(s,i),_o.subVectors(e,i);const c=Ii.dot(_o),l=Ui.dot(_o);if(c<=0&&l<=0)return t.copy(i);vo.subVectors(e,r);const d=Ii.dot(vo),u=Ui.dot(vo);if(d>=0&&u<=d)return t.copy(r);const h=c*u-d*l;if(h<=0&&c>=0&&d<=0)return o=c/(c-d),t.copy(i).addScaledVector(Ii,o);xo.subVectors(e,s);const p=Ii.dot(xo),g=Ui.dot(xo);if(g>=0&&p<=g)return t.copy(s);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Ui,a);const m=d*g-p*u;if(m<=0&&u-d>=0&&p-g>=0)return xl.subVectors(s,r),a=(u-d)/(u-d+(p-g)),t.copy(r).addScaledVector(xl,a);const f=1/(m+_+h);return o=_*f,a=h*f,t.copy(i).addScaledVector(Ii,o).addScaledVector(Ui,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function bo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Re{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=$e.workingColorSpace){if(e=np(e,1),t=Vt(t,0,1),i=Vt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=bo(o,s,e+1/3),this.g=bo(o,s,e),this.b=bo(o,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,t=qt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const i=Cu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return $e.fromWorkingColorSpace(Dt.copy(this),e),Math.round(Vt(Dt.r*255,0,255))*65536+Math.round(Vt(Dt.g*255,0,255))*256+Math.round(Vt(Dt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Dt.copy(this),t);const i=Dt.r,r=Dt.g,s=Dt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=d<=.5?u/(o+a):u/(2-o-a),o){case i:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-i)/u+2;break;case s:c=(i-r)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=qt){$e.fromWorkingColorSpace(Dt.copy(this),e);const t=Dt.r,i=Dt.g,r=Dt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Vn),this.setHSL(Vn.h+e,Vn.s+t,Vn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Vn),e.getHSL(Jr);const i=so(Vn.h,Jr.h,t),r=so(Vn.s,Jr.s,t),s=so(Vn.l,Jr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new Re;Re.NAMES=Cu;let yp=0;class Hr extends ir{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=Br(),this.name="",this.blending=Wi,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ea,this.blendDst=ta,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(i.blending=this.blending),this.side!==Qn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ea&&(i.blendSrc=this.blendSrc),this.blendDst!==ta&&(i.blendDst=this.blendDst),this.blendEquation!==di&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ji&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ks extends Hr{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=au,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new D,Qr=new Ye;class fn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=il,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=dr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array),s=Ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==il&&(e.usage=this.usage),e}}class wu extends fn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Au extends fn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bt extends fn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Sp=0;const Jt=new ft,Eo=new Rt,Ni=new D,Yt=new zr,pr=new zr,Ct=new D;class pn extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=Br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mu(e)?Au:wu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ne().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,i){return Jt.makeTranslation(e,t,i),this.applyMatrix4(Jt),this}scale(e,t,i){return Jt.makeScale(e,t,i),this.applyMatrix4(Jt),this}lookAt(e){return Eo.lookAt(e),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new bt(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Yt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];pr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(Yt.min,pr.min),Yt.expandByPoint(Ct),Ct.addVectors(Yt.max,pr.max),Yt.expandByPoint(Ct)):(Yt.expandByPoint(pr.min),Yt.expandByPoint(pr.max))}Yt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ct));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Ct.fromBufferAttribute(a,l),c&&(Ni.fromBufferAttribute(e,l),Ct.add(Ni)),r=Math.max(r,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<i.count;R++)a[R]=new D,c[R]=new D;const l=new D,d=new D,u=new D,h=new Ye,p=new Ye,g=new Ye,_=new D,m=new D;function f(R,S,y){l.fromBufferAttribute(i,R),d.fromBufferAttribute(i,S),u.fromBufferAttribute(i,y),h.fromBufferAttribute(s,R),p.fromBufferAttribute(s,S),g.fromBufferAttribute(s,y),d.sub(l),u.sub(l),p.sub(h),g.sub(h);const A=1/(p.x*g.y-g.x*p.y);isFinite(A)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(A),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(A),a[R].add(_),a[S].add(_),a[y].add(_),c[R].add(m),c[S].add(m),c[y].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let R=0,S=w.length;R<S;++R){const y=w[R],A=y.start,O=y.count;for(let F=A,V=A+O;F<V;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const T=new D,v=new D,P=new D,b=new D;function E(R){P.fromBufferAttribute(r,R),b.copy(P);const S=a[R];T.copy(S),T.sub(P.multiplyScalar(P.dot(S))).normalize(),v.crossVectors(b,S);const A=v.dot(c[R])<0?-1:1;o.setXYZW(R,T.x,T.y,T.z,A)}for(let R=0,S=w.length;R<S;++R){const y=w[R],A=y.start,O=y.count;for(let F=A,V=A+O;F<V;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new D,s=new D,o=new D,a=new D,c=new D,l=new D,d=new D,u=new D;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),d.subVectors(o,s),u.subVectors(r,s),d.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(d),c.add(d),l.add(d),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),d.subVectors(o,s),u.subVectors(r,s),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,c){const l=a.array,d=a.itemSize,u=a.normalized,h=new l.constructor(c.length*d);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*d;for(let f=0;f<d;f++)h[g++]=l[p++]}return new fn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pn,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let d=0,u=l.length;d<u;d++){const h=l[d],p=e(h,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let u=0,h=l.length;u<h;u++){const p=l[u];d.push(p.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],u=s[l];for(let h=0,p=u.length;h<p;h++)d.push(u[h].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,d=o.length;l<d;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yl=new ft,ri=new fp,es=new Mc,Sl=new D,ts=new D,ns=new D,is=new D,To=new D,rs=new D,Ml=new D,ss=new D;class me extends Rt{constructor(e=new pn,t=new Ks){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){rs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=a[c],u=s[c];d!==0&&(To.fromBufferAttribute(u,e),o?rs.addScaledVector(To,d):rs.addScaledVector(To.sub(t),d))}t.add(rs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),es.copy(i.boundingSphere),es.applyMatrix4(s),ri.copy(e.ray).recast(e.near),!(es.containsPoint(ri.origin)===!1&&(ri.intersectSphere(es,Sl)===null||ri.origin.distanceToSquared(Sl)>(e.far-e.near)**2))&&(yl.copy(s).invert(),ri.copy(e.ray).applyMatrix4(yl),!(i.boundingBox!==null&&ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ri)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=w,P=T;v<P;v+=3){const b=a.getX(v),E=a.getX(v+1),R=a.getX(v+2);r=os(this,f,e,i,l,d,u,b,E,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=a.getX(m),T=a.getX(m+1),v=a.getX(m+2);r=os(this,o,e,i,l,d,u,w,T,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=w,P=T;v<P;v+=3){const b=v,E=v+1,R=v+2;r=os(this,f,e,i,l,d,u,b,E,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=m,T=m+1,v=m+2;r=os(this,o,e,i,l,d,u,w,T,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Mp(n,e,t,i,r,s,o,a){let c;if(e.side===Ot?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Qn,a),c===null)return null;ss.copy(a),ss.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ss);return l<t.near||l>t.far?null:{distance:l,point:ss.clone(),object:n}}function os(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,ts),n.getVertexPosition(c,ns),n.getVertexPosition(l,is);const d=Mp(n,e,t,i,ts,ns,is,Ml);if(d){const u=new D;ln.getBarycoord(Ml,ts,ns,is,u),r&&(d.uv=ln.getInterpolatedAttribute(r,a,c,l,u,new Ye)),s&&(d.uv1=ln.getInterpolatedAttribute(s,a,c,l,u,new Ye)),o&&(d.normal=ln.getInterpolatedAttribute(o,a,c,l,u,new D),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new D,materialIndex:0};ln.getNormal(ts,ns,is,h.normal),d.face=h,d.barycoord=u}return d}class ct extends pn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],d=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new bt(l,3)),this.setAttribute("normal",new bt(d,3)),this.setAttribute("uv",new bt(u,2));function g(_,m,f,w,T,v,P,b,E,R,S){const y=v/E,A=P/R,O=v/2,F=P/2,V=b/2,X=E+1,W=R+1;let q=0,H=0;const te=new D;for(let re=0;re<W;re++){const ge=re*A-F;for(let De=0;De<X;De++){const tt=De*y-O;te[_]=tt*w,te[m]=ge*T,te[f]=V,l.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[f]=b>0?1:-1,d.push(te.x,te.y,te.z),u.push(De/E),u.push(1-re/R),q+=1}}for(let re=0;re<R;re++)for(let ge=0;ge<E;ge++){const De=h+ge+X*re,tt=h+ge+X*(re+1),$=h+(ge+1)+X*(re+1),J=h+(ge+1)+X*re;c.push(De,tt,J),c.push(tt,$,J),H+=6}a.addGroup(p,H,S),p+=H,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ct(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function er(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Ft(n){const e={};for(let t=0;t<n.length;t++){const i=er(n[t]);for(const r in i)e[r]=i[r]}return e}function bp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ru(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Ep={clone:er,merge:Ft};var Tp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends Hr{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=er(e.uniforms),this.uniformsGroups=bp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Pu extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=Ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new D,bl=new Ye,El=new Ye;class jt extends Pu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ba*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ro*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ba*2*Math.atan(Math.tan(ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z)}getViewSize(e,t){return this.getViewBounds(e,bl,El),t.subVectors(El,bl)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ro*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Fi=-90,ki=1;class wp extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(Fi,ki,e,t);r.layers=this.layers,this.add(r);const s=new jt(Fi,ki,e,t);s.layers=this.layers,this.add(s);const o=new jt(Fi,ki,e,t);o.layers=this.layers,this.add(o);const a=new jt(Fi,ki,e,t);a.layers=this.layers,this.add(a);const c=new jt(Fi,ki,e,t);c.layers=this.layers,this.add(c);const l=new jt(Fi,ki,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Ln)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,d),e.setRenderTarget(u,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Lu extends Wt{constructor(e,t,i,r,s,o,a,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:Zi,super(e,t,i,r,s,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ap extends xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Lu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:vn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ct(5,5,5),s=new ei({name:"CubemapFromEquirect",uniforms:er(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ot,blending:Zn});s.uniforms.tEquirect.value=t;const o=new me(r,s),a=t.minFilter;return t.minFilter===gi&&(t.minFilter=vn),new wp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Co=new D,Rp=new D,Pp=new Ne;class ci{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Co.subVectors(i,t).cross(Rp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Co),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Pp.getNormalMatrix(e),r=this.coplanarPoint(Co).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const si=new Mc,as=new D;class bc{constructor(e=new ci,t=new ci,i=new ci,r=new ci,s=new ci,o=new ci){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ln){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],d=r[5],u=r[6],h=r[7],p=r[8],g=r[9],_=r[10],m=r[11],f=r[12],w=r[13],T=r[14],v=r[15];if(i[0].setComponents(c-s,h-l,m-p,v-f).normalize(),i[1].setComponents(c+s,h+l,m+p,v+f).normalize(),i[2].setComponents(c+o,h+d,m+g,v+w).normalize(),i[3].setComponents(c-o,h-d,m-g,v-w).normalize(),i[4].setComponents(c-a,h-u,m-_,v-T).normalize(),t===Ln)i[5].setComponents(c+a,h+u,m+_,v+T).normalize();else if(t===Vs)i[5].setComponents(a,u,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(e){return si.center.set(0,0,0),si.radius=.7071067811865476,si.applyMatrix4(e.matrixWorld),this.intersectsSphere(si)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(as.x=r.normal.x>0?e.max.x:e.min.x,as.y=r.normal.y>0?e.max.y:e.min.y,as.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(as)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Du(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Lp(n){const e=new WeakMap;function t(a,c){const l=a.array,d=a.usage,u=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,d),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const d=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,d);else{u.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<u.length;p++){const g=u[h],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,u[h]=_)}u.length=h+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];n.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class In extends pn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,d=c+1,u=e/a,h=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<d;f++){const w=f*h-o;for(let T=0;T<l;T++){const v=T*u-s;g.push(v,-w,0),_.push(0,0,1),m.push(T/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let w=0;w<a;w++){const T=w+l*f,v=w+l*(f+1),P=w+1+l*(f+1),b=w+1+l*f;p.push(T,v,b),p.push(v,P,b)}this.setIndex(p),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(_,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new In(e.width,e.height,e.widthSegments,e.heightSegments)}}var Dp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ip=`#ifdef USE_ALPHAHASH
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
#endif`,Up=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Np=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Op=`#ifdef USE_AOMAP
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
#endif`,Bp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zp=`#ifdef USE_BATCHING
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
#endif`,Hp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xp=`#ifdef USE_IRIDESCENCE
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
#endif`,$p=`#ifdef USE_BUMPMAP
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
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
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
#endif`,tm=`#define PI 3.141592653589793
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
} // validated`,nm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,im=`vec3 transformedNormal = objectNormal;
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
#endif`,rm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,om=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,am=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cm="gl_FragColor = linearToOutputTexel( gl_FragColor );",lm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dm=`#ifdef USE_ENVMAP
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
#endif`,um=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hm=`#ifdef USE_ENVMAP
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
#endif`,fm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
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
#endif`,mm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xm=`#ifdef USE_GRADIENTMAP
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
}`,ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bm=`uniform bool receiveShadow;
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
#endif`,Em=`#ifdef USE_ENVMAP
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
#endif`,Tm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rm=`PhysicalMaterial material;
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
#endif`,Pm=`struct PhysicalMaterial {
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
}`,Lm=`
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
#endif`,Dm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Im=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Um=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,km=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hm=`#if defined( USE_POINTS_UV )
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
#endif`,Gm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$m=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ym=`#ifdef USE_MORPHTARGETS
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
#endif`,qm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,e0=`#ifdef USE_NORMALMAP
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
#endif`,t0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,n0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,i0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,r0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,s0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,o0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,a0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,u0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,p0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,m0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,g0=`float getShadowMask() {
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
}`,_0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,v0=`#ifdef USE_SKINNING
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
#endif`,x0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y0=`#ifdef USE_SKINNING
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
#endif`,S0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,M0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,b0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,E0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,T0=`#ifdef USE_TRANSMISSION
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
#endif`,C0=`#ifdef USE_TRANSMISSION
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
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const L0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D0=`uniform sampler2D t2D;
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
}`,I0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k0=`#include <common>
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
}`,O0=`#if DEPTH_PACKING == 3200
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
}`,B0=`#define DISTANCE
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
}`,z0=`#define DISTANCE
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
}`,H0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,G0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`uniform float scale;
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
}`,W0=`uniform vec3 diffuse;
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
}`,X0=`#include <common>
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
}`,$0=`uniform vec3 diffuse;
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
}`,Y0=`#define LAMBERT
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
}`,q0=`#define LAMBERT
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
}`,j0=`#define MATCAP
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
}`,Z0=`#define MATCAP
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
}`,K0=`#define NORMAL
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
}`,J0=`#define NORMAL
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
}`,Q0=`#define PHONG
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
}`,eg=`#define PHONG
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
}`,tg=`#define STANDARD
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
}`,ng=`#define STANDARD
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
}`,ig=`#define TOON
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
}`,rg=`#define TOON
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
}`,sg=`uniform float size;
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
}`,og=`uniform vec3 diffuse;
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
}`,ag=`#include <common>
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
}`,cg=`uniform vec3 color;
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
}`,lg=`uniform float rotation;
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
}`,dg=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:Dp,alphahash_pars_fragment:Ip,alphamap_fragment:Up,alphamap_pars_fragment:Np,alphatest_fragment:Fp,alphatest_pars_fragment:kp,aomap_fragment:Op,aomap_pars_fragment:Bp,batching_pars_vertex:zp,batching_vertex:Hp,begin_vertex:Gp,beginnormal_vertex:Vp,bsdfs:Wp,iridescence_fragment:Xp,bumpmap_pars_fragment:$p,clipping_planes_fragment:Yp,clipping_planes_pars_fragment:qp,clipping_planes_pars_vertex:jp,clipping_planes_vertex:Zp,color_fragment:Kp,color_pars_fragment:Jp,color_pars_vertex:Qp,color_vertex:em,common:tm,cube_uv_reflection_fragment:nm,defaultnormal_vertex:im,displacementmap_pars_vertex:rm,displacementmap_vertex:sm,emissivemap_fragment:om,emissivemap_pars_fragment:am,colorspace_fragment:cm,colorspace_pars_fragment:lm,envmap_fragment:dm,envmap_common_pars_fragment:um,envmap_pars_fragment:hm,envmap_pars_vertex:fm,envmap_physical_pars_fragment:Em,envmap_vertex:pm,fog_vertex:mm,fog_pars_vertex:gm,fog_fragment:_m,fog_pars_fragment:vm,gradientmap_pars_fragment:xm,lightmap_pars_fragment:ym,lights_lambert_fragment:Sm,lights_lambert_pars_fragment:Mm,lights_pars_begin:bm,lights_toon_fragment:Tm,lights_toon_pars_fragment:Cm,lights_phong_fragment:wm,lights_phong_pars_fragment:Am,lights_physical_fragment:Rm,lights_physical_pars_fragment:Pm,lights_fragment_begin:Lm,lights_fragment_maps:Dm,lights_fragment_end:Im,logdepthbuf_fragment:Um,logdepthbuf_pars_fragment:Nm,logdepthbuf_pars_vertex:Fm,logdepthbuf_vertex:km,map_fragment:Om,map_pars_fragment:Bm,map_particle_fragment:zm,map_particle_pars_fragment:Hm,metalnessmap_fragment:Gm,metalnessmap_pars_fragment:Vm,morphinstance_vertex:Wm,morphcolor_vertex:Xm,morphnormal_vertex:$m,morphtarget_pars_vertex:Ym,morphtarget_vertex:qm,normal_fragment_begin:jm,normal_fragment_maps:Zm,normal_pars_fragment:Km,normal_pars_vertex:Jm,normal_vertex:Qm,normalmap_pars_fragment:e0,clearcoat_normal_fragment_begin:t0,clearcoat_normal_fragment_maps:n0,clearcoat_pars_fragment:i0,iridescence_pars_fragment:r0,opaque_fragment:s0,packing:o0,premultiplied_alpha_fragment:a0,project_vertex:c0,dithering_fragment:l0,dithering_pars_fragment:d0,roughnessmap_fragment:u0,roughnessmap_pars_fragment:h0,shadowmap_pars_fragment:f0,shadowmap_pars_vertex:p0,shadowmap_vertex:m0,shadowmask_pars_fragment:g0,skinbase_vertex:_0,skinning_pars_vertex:v0,skinning_vertex:x0,skinnormal_vertex:y0,specularmap_fragment:S0,specularmap_pars_fragment:M0,tonemapping_fragment:b0,tonemapping_pars_fragment:E0,transmission_fragment:T0,transmission_pars_fragment:C0,uv_pars_fragment:w0,uv_pars_vertex:A0,uv_vertex:R0,worldpos_vertex:P0,background_vert:L0,background_frag:D0,backgroundCube_vert:I0,backgroundCube_frag:U0,cube_vert:N0,cube_frag:F0,depth_vert:k0,depth_frag:O0,distanceRGBA_vert:B0,distanceRGBA_frag:z0,equirect_vert:H0,equirect_frag:G0,linedashed_vert:V0,linedashed_frag:W0,meshbasic_vert:X0,meshbasic_frag:$0,meshlambert_vert:Y0,meshlambert_frag:q0,meshmatcap_vert:j0,meshmatcap_frag:Z0,meshnormal_vert:K0,meshnormal_frag:J0,meshphong_vert:Q0,meshphong_frag:eg,meshphysical_vert:tg,meshphysical_frag:ng,meshtoon_vert:ig,meshtoon_frag:rg,points_vert:sg,points_frag:og,shadow_vert:ag,shadow_frag:cg,sprite_vert:lg,sprite_frag:dg},ne={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},_n={basic:{uniforms:Ft([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Ft([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Re(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Ft([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Ft([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Ft([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new Re(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Ft([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Ft([ne.points,ne.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Ft([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Ft([ne.common,ne.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Ft([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Ft([ne.sprite,ne.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:Ft([ne.common,ne.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:Ft([ne.lights,ne.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};_n.physical={uniforms:Ft([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const cs={r:0,b:0,g:0},oi=new xn,ug=new ft;function hg(n,e,t,i,r,s,o){const a=new Re(0);let c=s===!0?0:1,l,d,u=null,h=0,p=null;function g(w){let T=w.isScene===!0?w.background:null;return T&&T.isTexture&&(T=(w.backgroundBlurriness>0?t:e).get(T)),T}function _(w){let T=!1;const v=g(w);v===null?f(a,c):v&&v.isColor&&(f(v,1),T=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,T){const v=g(T);v&&(v.isCubeTexture||v.mapping===js)?(d===void 0&&(d=new me(new ct(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:er(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),oi.copy(T.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),d.material.uniforms.envMap.value=v,d.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(ug.makeRotationFromEuler(oi)),d.material.toneMapped=$e.getTransfer(v.colorSpace)!==it,(u!==v||h!==v.version||p!==n.toneMapping)&&(d.material.needsUpdate=!0,u=v,h=v.version,p=n.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new me(new In(2,2),new ei({name:"BackgroundMaterial",uniforms:er(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=$e.getTransfer(v.colorSpace)!==it,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||h!==v.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=v,h=v.version,p=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function f(w,T){w.getRGB(cs,Ru(n)),i.buffers.color.setClear(cs.r,cs.g,cs.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),c=T,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,f(a,c)},render:_,addToRenderList:m}}function fg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(y,A,O,F,V){let X=!1;const W=u(F,O,A);s!==W&&(s=W,l(s.object)),X=p(y,F,O,V),X&&g(y,F,O,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(y,A,O,F),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function d(y){return n.deleteVertexArray(y)}function u(y,A,O){const F=O.wireframe===!0;let V=i[y.id];V===void 0&&(V={},i[y.id]=V);let X=V[A.id];X===void 0&&(X={},V[A.id]=X);let W=X[F];return W===void 0&&(W=h(c()),X[F]=W),W}function h(y){const A=[],O=[],F=[];for(let V=0;V<t;V++)A[V]=0,O[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:O,attributeDivisors:F,object:y,attributes:{},index:null}}function p(y,A,O,F){const V=s.attributes,X=A.attributes;let W=0;const q=O.getAttributes();for(const H in q)if(q[H].location>=0){const re=V[H];let ge=X[H];if(ge===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(ge=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(ge=y.instanceColor)),re===void 0||re.attribute!==ge||ge&&re.data!==ge.data)return!0;W++}return s.attributesNum!==W||s.index!==F}function g(y,A,O,F){const V={},X=A.attributes;let W=0;const q=O.getAttributes();for(const H in q)if(q[H].location>=0){let re=X[H];re===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(re=y.instanceColor));const ge={};ge.attribute=re,re&&re.data&&(ge.data=re.data),V[H]=ge,W++}s.attributes=V,s.attributesNum=W,s.index=F}function _(){const y=s.newAttributes;for(let A=0,O=y.length;A<O;A++)y[A]=0}function m(y){f(y,0)}function f(y,A){const O=s.newAttributes,F=s.enabledAttributes,V=s.attributeDivisors;O[y]=1,F[y]===0&&(n.enableVertexAttribArray(y),F[y]=1),V[y]!==A&&(n.vertexAttribDivisor(y,A),V[y]=A)}function w(){const y=s.newAttributes,A=s.enabledAttributes;for(let O=0,F=A.length;O<F;O++)A[O]!==y[O]&&(n.disableVertexAttribArray(O),A[O]=0)}function T(y,A,O,F,V,X,W){W===!0?n.vertexAttribIPointer(y,A,O,V,X):n.vertexAttribPointer(y,A,O,F,V,X)}function v(y,A,O,F){_();const V=F.attributes,X=O.getAttributes(),W=A.defaultAttributeValues;for(const q in X){const H=X[q];if(H.location>=0){let te=V[q];if(te===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(te=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(te=y.instanceColor)),te!==void 0){const re=te.normalized,ge=te.itemSize,De=e.get(te);if(De===void 0)continue;const tt=De.buffer,$=De.type,J=De.bytesPerElement,pe=$===n.INT||$===n.UNSIGNED_INT||te.gpuType===gc;if(te.isInterleavedBufferAttribute){const ie=te.data,Ee=ie.stride,Pe=te.offset;if(ie.isInstancedInterleavedBuffer){for(let Be=0;Be<H.locationSize;Be++)f(H.location+Be,ie.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Be=0;Be<H.locationSize;Be++)m(H.location+Be);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let Be=0;Be<H.locationSize;Be++)T(H.location+Be,ge/H.locationSize,$,re,Ee*J,(Pe+ge/H.locationSize*Be)*J,pe)}else{if(te.isInstancedBufferAttribute){for(let ie=0;ie<H.locationSize;ie++)f(H.location+ie,te.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ie=0;ie<H.locationSize;ie++)m(H.location+ie);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let ie=0;ie<H.locationSize;ie++)T(H.location+ie,ge/H.locationSize,$,re,ge*J,ge/H.locationSize*ie*J,pe)}}else if(W!==void 0){const re=W[q];if(re!==void 0)switch(re.length){case 2:n.vertexAttrib2fv(H.location,re);break;case 3:n.vertexAttrib3fv(H.location,re);break;case 4:n.vertexAttrib4fv(H.location,re);break;default:n.vertexAttrib1fv(H.location,re)}}}}w()}function P(){R();for(const y in i){const A=i[y];for(const O in A){const F=A[O];for(const V in F)d(F[V].object),delete F[V];delete A[O]}delete i[y]}}function b(y){if(i[y.id]===void 0)return;const A=i[y.id];for(const O in A){const F=A[O];for(const V in F)d(F[V].object),delete F[V];delete A[O]}delete i[y.id]}function E(y){for(const A in i){const O=i[A];if(O[y.id]===void 0)continue;const F=O[y.id];for(const V in F)d(F[V].object),delete F[V];delete O[y.id]}}function R(){S(),o=!0,s!==r&&(s=r,l(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:b,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function pg(n,e,t){let i;function r(l){i=l}function s(l,d){n.drawArrays(i,l,d),t.update(d,i,1)}function o(l,d,u){u!==0&&(n.drawArraysInstanced(i,l,d,u),t.update(d,i,u))}function a(l,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,u);let p=0;for(let g=0;g<u;g++)p+=d[g];t.update(p,i,1)}function c(l,d,u,h){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],d[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*h[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function mg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(E){return!(E!==dn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===Or&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Un&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Pn&&!R)}function c(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const u=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:v,vertexTextures:P,maxSamples:b}}function gg(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new ci,a=new Ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||i!==0||r;return r=h,i=u.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?d(null):l();else{const w=s?0:i,T=w*4;let v=f.clippingState||null;c.value=v,v=d(g,h,T,p);for(let P=0;P!==T;++P)v[P]=t[P];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,w=h.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,v=p;T!==_;++T,v+=4)o.copy(u[T]).applyMatrix4(w,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function _g(n){let e=new WeakMap;function t(o,a){return a===la?o.mapping=Zi:a===da&&(o.mapping=Ki),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===la||a===da)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Ap(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Iu extends Pu{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Hi=4,Tl=[.125,.215,.35,.446,.526,.582],ui=20,wo=new Iu,Cl=new Re;let Ao=null,Ro=0,Po=0,Lo=!1;const li=(1+Math.sqrt(5))/2,Oi=1/li,wl=[new D(-li,Oi,0),new D(li,Oi,0),new D(-Oi,0,li),new D(Oi,0,li),new D(0,li,-Oi),new D(0,li,Oi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class za{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ao,Ro,Po),this._renderer.xr.enabled=Lo,e.scissorTest=!1,ls(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zi||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Or,format:dn,colorSpace:nr,depthBuffer:!1},r=Al(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vg(s)),this._blurMaterial=xg(s,e,t)}return r}_compileMaterial(e){const t=new me(this._lodPlanes[0],e);this._renderer.compile(t,wo)}_sceneToCubeUV(e,t,i,r){const a=new jt(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(Cl),d.toneMapping=Kn,d.autoClear=!1;const p=new Ks({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),g=new me(new ct,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Cl),_=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):w===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const T=this._cubeSize;ls(r,w*T,f>2?T:0,T,T),d.setRenderTarget(r),_&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Zi||e.mapping===Ki;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new me(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;ls(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,wo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=wl[(r-s-1)%wl.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new me(this._lodPlanes[r],l),h=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ui-1),_=s/g,m=isFinite(s)?1+Math.floor(d*_):ui;m>ui&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ui}`);const f=[];let w=0;for(let E=0;E<ui;++E){const R=E/_,S=Math.exp(-R*R/2);f.push(S),E===0?w+=S:E<m&&(w+=2*S)}for(let E=0;E<f.length;E++)f[E]=f[E]/w;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-i;const v=this._sizeLods[r],P=3*v*(r>T-Hi?r-T+Hi:0),b=4*(this._cubeSize-v);ls(t,P,b,3*v,2*v),c.setRenderTarget(t),c.render(u,wo)}}function vg(n){const e=[],t=[],i=[];let r=n;const s=n-Hi+1+Tl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>n-Hi?c=Tl[o-n+Hi-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),d=-l,u=1+l,h=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,g=6,_=3,m=2,f=1,w=new Float32Array(_*g*p),T=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let b=0;b<p;b++){const E=b%3*2/3-1,R=b>2?0:-1,S=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];w.set(S,_*g*b),T.set(h,m*g*b);const y=[b,b,b,b,b,b];v.set(y,f*g*b)}const P=new pn;P.setAttribute("position",new fn(w,_)),P.setAttribute("uv",new fn(T,m)),P.setAttribute("faceIndex",new fn(v,f)),e.push(P),r>Hi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Al(n,e,t){const i=new xi(n,e,t);return i.texture.mapping=js,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ls(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function xg(n,e,t){const i=new Float32Array(ui),r=new D(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ec(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Rl(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ec(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Pl(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ec(){return`

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
	`}function yg(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===la||c===da,d=c===Zi||c===Ki;if(l||d){let u=e.get(a);const h=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new za(n)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||d&&p&&r(p)?(t===null&&(t=new za(n)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let c=0;const l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Sg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Sr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Mg(n,e,t,i){const r={},s=new WeakMap;function o(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(u,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function c(u){const h=u.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],n.ARRAY_BUFFER)}}function l(u){const h=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const w=p.array;_=p.version;for(let T=0,v=w.length;T<v;T+=3){const P=w[T+0],b=w[T+1],E=w[T+2];h.push(P,b,b,E,E,P)}}else if(g!==void 0){const w=g.array;_=g.version;for(let T=0,v=w.length/3-1;T<v;T+=3){const P=T+0,b=T+1,E=T+2;h.push(P,b,b,E,E,P)}}else return;const m=new(Mu(h)?Au:wu)(h,1);m.version=_;const f=s.get(u);f&&e.remove(f),s.set(u,m)}function d(u){const h=s.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:d}}function bg(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function c(h,p){n.drawElements(i,p,s,h*o),t.update(p,i,1)}function l(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*o,g),t.update(p,i,g))}function d(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function u(h,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,_,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*_[w];t.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Eg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Tg(n,e,t){const i=new WeakMap,r=new rt;function s(o,a,c){const l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(a);if(h===void 0||h.count!==u){let y=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var p=y;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let P=a.attributes.position.count*v,b=1;P>e.maxTextureSize&&(b=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const E=new Float32Array(P*b*4*u),R=new Eu(E,P,b,u);R.type=Pn,R.needsUpdate=!0;const S=v*4;for(let A=0;A<u;A++){const O=f[A],F=w[A],V=T[A],X=P*b*4*A;for(let W=0;W<O.count;W++){const q=W*S;g===!0&&(r.fromBufferAttribute(O,W),E[X+q+0]=r.x,E[X+q+1]=r.y,E[X+q+2]=r.z,E[X+q+3]=0),_===!0&&(r.fromBufferAttribute(F,W),E[X+q+4]=r.x,E[X+q+5]=r.y,E[X+q+6]=r.z,E[X+q+7]=0),m===!0&&(r.fromBufferAttribute(V,W),E[X+q+8]=r.x,E[X+q+9]=r.y,E[X+q+10]=r.z,E[X+q+11]=V.itemSize===4?r.w:1)}}h={count:u,texture:R,size:new Ye(P,b)},i.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Cg(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==l&&(e.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return u}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class Uu extends Wt{constructor(e,t,i,r,s,o,a,c,l,d=Xi){if(d!==Xi&&d!==Qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Xi&&(i=vi),i===void 0&&d===Qi&&(i=Ji),super(null,r,s,o,a,c,d,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:hn,this.minFilter=c!==void 0?c:hn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Nu=new Wt,Ll=new Uu(1,1),Fu=new Eu,ku=new up,Ou=new Lu,Dl=[],Il=[],Ul=new Float32Array(16),Nl=new Float32Array(9),Fl=new Float32Array(4);function sr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Dl[r];if(s===void 0&&(s=new Float32Array(r),Dl[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Js(n,e){let t=Il[e];t===void 0&&(t=new Int32Array(e),Il[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function wg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function Rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function Pg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function Lg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Fl.set(i),n.uniformMatrix2fv(this.addr,!1,Fl),Tt(t,i)}}function Dg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Nl.set(i),n.uniformMatrix3fv(this.addr,!1,Nl),Tt(t,i)}}function Ig(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Ul.set(i),n.uniformMatrix4fv(this.addr,!1,Ul),Tt(t,i)}}function Ug(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function Fg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function Og(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function Hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function Gg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ll.compareFunction=Su,s=Ll):s=Nu,t.setTexture2D(e||s,r)}function Vg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ku,r)}function Wg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ou,r)}function Xg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Fu,r)}function $g(n){switch(n){case 5126:return wg;case 35664:return Ag;case 35665:return Rg;case 35666:return Pg;case 35674:return Lg;case 35675:return Dg;case 35676:return Ig;case 5124:case 35670:return Ug;case 35667:case 35671:return Ng;case 35668:case 35672:return Fg;case 35669:case 35673:return kg;case 5125:return Og;case 36294:return Bg;case 36295:return zg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Gg;case 35679:case 36299:case 36307:return Vg;case 35680:case 36300:case 36308:case 36293:return Wg;case 36289:case 36303:case 36311:case 36292:return Xg}}function Yg(n,e){n.uniform1fv(this.addr,e)}function qg(n,e){const t=sr(e,this.size,2);n.uniform2fv(this.addr,t)}function jg(n,e){const t=sr(e,this.size,3);n.uniform3fv(this.addr,t)}function Zg(n,e){const t=sr(e,this.size,4);n.uniform4fv(this.addr,t)}function Kg(n,e){const t=sr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Jg(n,e){const t=sr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Qg(n,e){const t=sr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function e_(n,e){n.uniform1iv(this.addr,e)}function t_(n,e){n.uniform2iv(this.addr,e)}function n_(n,e){n.uniform3iv(this.addr,e)}function i_(n,e){n.uniform4iv(this.addr,e)}function r_(n,e){n.uniform1uiv(this.addr,e)}function s_(n,e){n.uniform2uiv(this.addr,e)}function o_(n,e){n.uniform3uiv(this.addr,e)}function a_(n,e){n.uniform4uiv(this.addr,e)}function c_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Nu,s[o])}function l_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ku,s[o])}function d_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Ou,s[o])}function u_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Fu,s[o])}function h_(n){switch(n){case 5126:return Yg;case 35664:return qg;case 35665:return jg;case 35666:return Zg;case 35674:return Kg;case 35675:return Jg;case 35676:return Qg;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return r_;case 36294:return s_;case 36295:return o_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return u_}}class f_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=$g(t.type)}}class p_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=h_(t.type)}}class m_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Do=/(\w+)(\])?(\[|\.)?/g;function kl(n,e){n.seq.push(e),n.map[e.id]=e}function g_(n,e,t){const i=n.name,r=i.length;for(Do.lastIndex=0;;){const s=Do.exec(i),o=Do.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){kl(t,l===void 0?new f_(a,n,e):new p_(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new m_(a),kl(t,u)),t=u}}}class Rs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);g_(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ol(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const __=37297;let v_=0;function x_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Bl=new Ne;function y_(n){$e._getMatrix(Bl,$e.workingColorSpace,n);const e=`mat3( ${Bl.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Zs:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function zl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+x_(n.getShaderSource(e),o)}else return r}function S_(n,e){const t=y_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function M_(n,e){let t;switch(e){case Bf:t="Linear";break;case zf:t="Reinhard";break;case Hf:t="Cineon";break;case cu:t="ACESFilmic";break;case Vf:t="AgX";break;case Wf:t="Neutral";break;case Gf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ds=new D;function b_(){$e.getLuminanceCoefficients(ds);const n=ds.x.toFixed(4),e=ds.y.toFixed(4),t=ds.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mr).join(`
`)}function T_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function C_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Mr(n){return n!==""}function Hl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const w_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(n){return n.replace(w_,R_)}const A_=new Map;function R_(n,e){let t=Oe[e];if(t===void 0){const i=A_.get(e);if(i!==void 0)t=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ha(t)}const P_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vl(n){return n.replace(P_,L_)}function L_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Wl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function D_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===su?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===ou?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===An&&(e="SHADOWMAP_TYPE_VSM"),e}function I_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Zi:case Ki:e="ENVMAP_TYPE_CUBE";break;case js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function U_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ki:e="ENVMAP_MODE_REFRACTION";break}return e}function N_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case au:e="ENVMAP_BLENDING_MULTIPLY";break;case kf:e="ENVMAP_BLENDING_MIX";break;case Of:e="ENVMAP_BLENDING_ADD";break}return e}function F_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function k_(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=D_(t),l=I_(t),d=U_(t),u=N_(t),h=F_(t),p=E_(t),g=T_(s),_=r.createProgram();let m,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Mr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Mr).join(`
`),f.length>0&&(f+=`
`)):(m=[Wl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mr).join(`
`),f=[Wl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Kn?M_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,S_("linearToOutputTexel",t.outputColorSpace),b_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Mr).join(`
`)),o=Ha(o),o=Hl(o,t),o=Gl(o,t),a=Ha(a),a=Hl(a,t),a=Gl(a,t),o=Vl(o),a=Vl(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=w+m+o,v=w+f+a,P=Ol(r,r.VERTEX_SHADER,T),b=Ol(r,r.FRAGMENT_SHADER,v);r.attachShader(_,P),r.attachShader(_,b),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function E(A){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(P).trim(),V=r.getShaderInfoLog(b).trim();let X=!0,W=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,P,b);else{const q=zl(r,P,"vertex"),H=zl(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+O+`
`+q+`
`+H)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(F===""||V==="")&&(W=!1);W&&(A.diagnostics={runnable:X,programLog:O,vertexShader:{log:F,prefix:m},fragmentShader:{log:V,prefix:f}})}r.deleteShader(P),r.deleteShader(b),R=new Rs(r,_),S=C_(r,_)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,__)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=v_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=b,this}let O_=0;class B_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new z_(e),t.set(e,i)),i}}class z_{constructor(e){this.id=O_++,this.code=e,this.usedTimes=0}}function H_(n,e,t,i,r,s,o){const a=new Tu,c=new B_,l=new Set,d=[],u=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,A,O,F){const V=O.fog,X=F.geometry,W=S.isMeshStandardMaterial?O.environment:null,q=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),H=q&&q.mapping===js?q.image.height:null,te=g[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const re=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ge=re!==void 0?re.length:0;let De=0;X.morphAttributes.position!==void 0&&(De=1),X.morphAttributes.normal!==void 0&&(De=2),X.morphAttributes.color!==void 0&&(De=3);let tt,$,J,pe;if(te){const nt=_n[te];tt=nt.vertexShader,$=nt.fragmentShader}else tt=S.vertexShader,$=S.fragmentShader,c.update(S),J=c.getVertexShaderID(S),pe=c.getFragmentShaderID(S);const ie=n.getRenderTarget(),Ee=n.state.buffers.depth.getReversed(),Pe=F.isInstancedMesh===!0,Be=F.isBatchedMesh===!0,Ze=!!S.map,Fe=!!S.matcap,vt=!!q,N=!!S.aoMap,Zt=!!S.lightMap,He=!!S.bumpMap,Ge=!!S.normalMap,Te=!!S.displacementMap,lt=!!S.emissiveMap,be=!!S.metalnessMap,C=!!S.roughnessMap,x=S.anisotropy>0,k=S.clearcoat>0,j=S.dispersion>0,K=S.iridescence>0,Y=S.sheen>0,ye=S.transmission>0,oe=x&&!!S.anisotropyMap,de=k&&!!S.clearcoatMap,We=k&&!!S.clearcoatNormalMap,Q=k&&!!S.clearcoatRoughnessMap,ue=K&&!!S.iridescenceMap,we=K&&!!S.iridescenceThicknessMap,Ae=Y&&!!S.sheenColorMap,he=Y&&!!S.sheenRoughnessMap,Ve=!!S.specularMap,ke=!!S.specularColorMap,st=!!S.specularIntensityMap,L=ye&&!!S.transmissionMap,se=ye&&!!S.thicknessMap,G=!!S.gradientMap,Z=!!S.alphaMap,le=S.alphaTest>0,ae=!!S.alphaHash,Ie=!!S.extensions;let pt=Kn;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(pt=n.toneMapping);const Pt={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:tt,fragmentShader:$,defines:S.defines,customVertexShaderID:J,customFragmentShaderID:pe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Be,batchingColor:Be&&F._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&F.instanceColor!==null,instancingMorph:Pe&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:nr,alphaToCoverage:!!S.alphaToCoverage,map:Ze,matcap:Fe,envMap:vt,envMapMode:vt&&q.mapping,envMapCubeUVHeight:H,aoMap:N,lightMap:Zt,bumpMap:He,normalMap:Ge,displacementMap:h&&Te,emissiveMap:lt,normalMapObjectSpace:Ge&&S.normalMapType===qf,normalMapTangentSpace:Ge&&S.normalMapType===yu,metalnessMap:be,roughnessMap:C,anisotropy:x,anisotropyMap:oe,clearcoat:k,clearcoatMap:de,clearcoatNormalMap:We,clearcoatRoughnessMap:Q,dispersion:j,iridescence:K,iridescenceMap:ue,iridescenceThicknessMap:we,sheen:Y,sheenColorMap:Ae,sheenRoughnessMap:he,specularMap:Ve,specularColorMap:ke,specularIntensityMap:st,transmission:ye,transmissionMap:L,thicknessMap:se,gradientMap:G,opaque:S.transparent===!1&&S.blending===Wi&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:le,alphaHash:ae,combine:S.combine,mapUv:Ze&&_(S.map.channel),aoMapUv:N&&_(S.aoMap.channel),lightMapUv:Zt&&_(S.lightMap.channel),bumpMapUv:He&&_(S.bumpMap.channel),normalMapUv:Ge&&_(S.normalMap.channel),displacementMapUv:Te&&_(S.displacementMap.channel),emissiveMapUv:lt&&_(S.emissiveMap.channel),metalnessMapUv:be&&_(S.metalnessMap.channel),roughnessMapUv:C&&_(S.roughnessMap.channel),anisotropyMapUv:oe&&_(S.anisotropyMap.channel),clearcoatMapUv:de&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:We&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:we&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:he&&_(S.sheenRoughnessMap.channel),specularMapUv:Ve&&_(S.specularMap.channel),specularColorMapUv:ke&&_(S.specularColorMap.channel),specularIntensityMapUv:st&&_(S.specularIntensityMap.channel),transmissionMapUv:L&&_(S.transmissionMap.channel),thicknessMapUv:se&&_(S.thicknessMap.channel),alphaMapUv:Z&&_(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ge||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(Ze||Z),fog:!!V,useFog:S.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ee,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:De,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:pt,decodeVideoTexture:Ze&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===it,decodeVideoTextureEmissive:lt&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===it,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Rn,flipSided:S.side===Ot,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ie&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&S.extensions.multiDraw===!0||Be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pt.vertexUv1s=l.has(1),Pt.vertexUv2s=l.has(2),Pt.vertexUv3s=l.has(3),l.clear(),Pt}function f(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const A in S.defines)y.push(A),y.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(w(y,S),T(y,S),y.push(n.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function w(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function T(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const y=g[S.type];let A;if(y){const O=_n[y];A=Ep.clone(O.uniforms)}else A=S.uniforms;return A}function P(S,y){let A;for(let O=0,F=d.length;O<F;O++){const V=d[O];if(V.cacheKey===y){A=V,++A.usedTimes;break}}return A===void 0&&(A=new k_(n,y,S,s),d.push(A)),A}function b(S){if(--S.usedTimes===0){const y=d.indexOf(S);d[y]=d[d.length-1],d.pop(),S.destroy()}}function E(S){c.remove(S)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:P,releaseProgram:b,releaseShaderCache:E,programs:d,dispose:R}}function G_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function V_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Xl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $l(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u,h,p,g,_,m){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:h,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[e]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,h,p,g,_,m){const f=o(u,h,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(u,h,p,g,_,m){const f=o(u,h,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(u,h){t.length>1&&t.sort(u||V_),i.length>1&&i.sort(h||Xl),r.length>1&&r.sort(h||Xl)}function d(){for(let u=e,h=n.length;u<h;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:d,sort:l}}function W_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new $l,n.set(i,[o])):r>=s.length?(o=new $l,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function X_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Re};break;case"SpotLight":t={position:new D,direction:new D,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function $_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Y_=0;function q_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function j_(n){const e=new X_,t=$_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new D);const r=new D,s=new ft,o=new ft;function a(l){let d=0,u=0,h=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,w=0,T=0,v=0,P=0,b=0,E=0;l.sort(q_);for(let S=0,y=l.length;S<y;S++){const A=l[S],O=A.color,F=A.intensity,V=A.distance,X=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)d+=O.r*F,u+=O.g*F,h+=O.b*F;else if(A.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(A.sh.coefficients[W],F);E++}else if(A.isDirectionalLight){const W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const q=A.shadow,H=t.get(A);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=A.shadow.matrix,w++}i.directional[p]=W,p++}else if(A.isSpotLight){const W=e.get(A);W.position.setFromMatrixPosition(A.matrixWorld),W.color.copy(O).multiplyScalar(F),W.distance=V,W.coneCos=Math.cos(A.angle),W.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),W.decay=A.decay,i.spot[_]=W;const q=A.shadow;if(A.map&&(i.spotLightMap[P]=A.map,P++,q.updateMatrices(A),A.castShadow&&b++),i.spotLightMatrix[_]=q.matrix,A.castShadow){const H=t.get(A);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=X,v++}_++}else if(A.isRectAreaLight){const W=e.get(A);W.color.copy(O).multiplyScalar(F),W.halfWidth.set(A.width*.5,0,0),W.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=W,m++}else if(A.isPointLight){const W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),W.distance=A.distance,W.decay=A.decay,A.castShadow){const q=A.shadow,H=t.get(A);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,H.shadowCameraNear=q.camera.near,H.shadowCameraFar=q.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=X,i.pointShadowMatrix[g]=A.shadow.matrix,T++}i.point[g]=W,g++}else if(A.isHemisphereLight){const W=e.get(A);W.skyColor.copy(A.color).multiplyScalar(F),W.groundColor.copy(A.groundColor).multiplyScalar(F),i.hemi[f]=W,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ne.LTC_FLOAT_1,i.rectAreaLTC2=ne.LTC_FLOAT_2):(i.rectAreaLTC1=ne.LTC_HALF_1,i.rectAreaLTC2=ne.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const R=i.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==f||R.numDirectionalShadows!==w||R.numPointShadows!==T||R.numSpotShadows!==v||R.numSpotMaps!==P||R.numLightProbes!==E)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=v+P-b,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=E,R.directionalLength=p,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=f,R.numDirectionalShadows=w,R.numPointShadows=T,R.numSpotShadows=v,R.numSpotMaps=P,R.numLightProbes=E,i.version=Y_++)}function c(l,d){let u=0,h=0,p=0,g=0,_=0;const m=d.matrixWorldInverse;for(let f=0,w=l.length;f<w;f++){const T=l[f];if(T.isDirectionalLight){const v=i.directional[u];v.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),u++}else if(T.isSpotLight){const v=i.spot[p];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(T.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(T.width*.5,0,0),v.halfHeight.set(0,T.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const v=i.point[h];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),h++}else if(T.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(T.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function Yl(n){const e=new j_(n),t=[],i=[];function r(d){l.camera=d,t.length=0,i.length=0}function s(d){t.push(d)}function o(d){i.push(d)}function a(){e.setup(t)}function c(d){e.setupView(t,d)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Z_(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Yl(n),e.set(r,[a])):s>=o.length?(a=new Yl(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class K_ extends Hr{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=$f,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class J_ extends Hr{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Q_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ev=`uniform sampler2D shadow_pass;
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
}`;function tv(n,e,t){let i=new bc;const r=new Ye,s=new Ye,o=new rt,a=new K_({depthPacking:Yf}),c=new J_,l={},d=t.maxTextureSize,u={[Qn]:Ot,[Ot]:Qn,[Rn]:Rn},h=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:Q_,fragmentShader:ev}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new pn;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new me(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=su;let f=this.type;this.render=function(b,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const S=n.getRenderTarget(),y=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Zn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const F=f!==An&&this.type===An,V=f===An&&this.type!==An;for(let X=0,W=b.length;X<W;X++){const q=b[X],H=q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const te=H.getFrameExtents();if(r.multiply(te),s.copy(H.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/te.x),r.x=s.x*te.x,H.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/te.y),r.y=s.y*te.y,H.mapSize.y=s.y)),H.map===null||F===!0||V===!0){const ge=this.type!==An?{minFilter:hn,magFilter:hn}:{};H.map!==null&&H.map.dispose(),H.map=new xi(r.x,r.y,ge),H.map.texture.name=q.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const re=H.getViewportCount();for(let ge=0;ge<re;ge++){const De=H.getViewport(ge);o.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),O.viewport(o),H.updateMatrices(q,ge),i=H.getFrustum(),v(E,R,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===An&&w(H,R),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(S,y,A)};function w(b,E){const R=e.update(_);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new xi(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(E,null,R,h,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(E,null,R,p,_,null)}function T(b,E,R,S){let y=null;const A=R.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)y=A;else if(y=R.isPointLight===!0?c:a,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const O=y.uuid,F=E.uuid;let V=l[O];V===void 0&&(V={},l[O]=V);let X=V[F];X===void 0&&(X=y.clone(),V[F]=X,E.addEventListener("dispose",P)),y=X}if(y.visible=E.visible,y.wireframe=E.wireframe,S===An?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:u[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const O=n.properties.get(y);O.light=R}return y}function v(b,E,R,S,y){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===An)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,b.matrixWorld);const F=e.update(b),V=b.material;if(Array.isArray(V)){const X=F.groups;for(let W=0,q=X.length;W<q;W++){const H=X[W],te=V[H.materialIndex];if(te&&te.visible){const re=T(b,te,S,y);b.onBeforeShadow(n,b,E,R,F,re,H),n.renderBufferDirect(R,null,F,re,b,H),b.onAfterShadow(n,b,E,R,F,re,H)}}}else if(V.visible){const X=T(b,V,S,y);b.onBeforeShadow(n,b,E,R,F,X,null),n.renderBufferDirect(R,null,F,X,b,null),b.onAfterShadow(n,b,E,R,F,X,null)}}const O=b.children;for(let F=0,V=O.length;F<V;F++)v(O[F],E,R,S,y)}function P(b){b.target.removeEventListener("dispose",P);for(const R in l){const S=l[R],y=b.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const nv={[na]:ia,[ra]:aa,[sa]:ca,[ji]:oa,[ia]:na,[aa]:ra,[ca]:sa,[oa]:ji};function iv(n,e){function t(){let L=!1;const se=new rt;let G=null;const Z=new rt(0,0,0,0);return{setMask:function(le){G!==le&&!L&&(n.colorMask(le,le,le,le),G=le)},setLocked:function(le){L=le},setClear:function(le,ae,Ie,pt,Pt){Pt===!0&&(le*=pt,ae*=pt,Ie*=pt),se.set(le,ae,Ie,pt),Z.equals(se)===!1&&(n.clearColor(le,ae,Ie,pt),Z.copy(se))},reset:function(){L=!1,G=null,Z.set(-1,0,0,0)}}}function i(){let L=!1,se=!1,G=null,Z=null,le=null;return{setReversed:function(ae){if(se!==ae){const Ie=e.get("EXT_clip_control");se?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT);const pt=le;le=null,this.setClear(pt)}se=ae},getReversed:function(){return se},setTest:function(ae){ae?ie(n.DEPTH_TEST):Ee(n.DEPTH_TEST)},setMask:function(ae){G!==ae&&!L&&(n.depthMask(ae),G=ae)},setFunc:function(ae){if(se&&(ae=nv[ae]),Z!==ae){switch(ae){case na:n.depthFunc(n.NEVER);break;case ia:n.depthFunc(n.ALWAYS);break;case ra:n.depthFunc(n.LESS);break;case ji:n.depthFunc(n.LEQUAL);break;case sa:n.depthFunc(n.EQUAL);break;case oa:n.depthFunc(n.GEQUAL);break;case aa:n.depthFunc(n.GREATER);break;case ca:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=ae}},setLocked:function(ae){L=ae},setClear:function(ae){le!==ae&&(se&&(ae=1-ae),n.clearDepth(ae),le=ae)},reset:function(){L=!1,G=null,Z=null,le=null,se=!1}}}function r(){let L=!1,se=null,G=null,Z=null,le=null,ae=null,Ie=null,pt=null,Pt=null;return{setTest:function(nt){L||(nt?ie(n.STENCIL_TEST):Ee(n.STENCIL_TEST))},setMask:function(nt){se!==nt&&!L&&(n.stencilMask(nt),se=nt)},setFunc:function(nt,nn,Sn){(G!==nt||Z!==nn||le!==Sn)&&(n.stencilFunc(nt,nn,Sn),G=nt,Z=nn,le=Sn)},setOp:function(nt,nn,Sn){(ae!==nt||Ie!==nn||pt!==Sn)&&(n.stencilOp(nt,nn,Sn),ae=nt,Ie=nn,pt=Sn)},setLocked:function(nt){L=nt},setClear:function(nt){Pt!==nt&&(n.clearStencil(nt),Pt=nt)},reset:function(){L=!1,se=null,G=null,Z=null,le=null,ae=null,Ie=null,pt=null,Pt=null}}}const s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let d={},u={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,T=null,v=null,P=null,b=null,E=new Re(0,0,0),R=0,S=!1,y=null,A=null,O=null,F=null,V=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,q=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=q>=1):H.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=q>=2);let te=null,re={};const ge=n.getParameter(n.SCISSOR_BOX),De=n.getParameter(n.VIEWPORT),tt=new rt().fromArray(ge),$=new rt().fromArray(De);function J(L,se,G,Z){const le=new Uint8Array(4),ae=n.createTexture();n.bindTexture(L,ae),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<G;Ie++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(se+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return ae}const pe={};pe[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),pe[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),pe[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),o.setFunc(ji),He(!1),Ge(Jc),ie(n.CULL_FACE),N(Zn);function ie(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function Ee(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function Pe(L,se){return u[L]!==se?(n.bindFramebuffer(L,se),u[L]=se,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=se),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=se),!0):!1}function Be(L,se){let G=p,Z=!1;if(L){G=h.get(se),G===void 0&&(G=[],h.set(se,G));const le=L.textures;if(G.length!==le.length||G[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Ie=le.length;ae<Ie;ae++)G[ae]=n.COLOR_ATTACHMENT0+ae;G.length=le.length,Z=!0}}else G[0]!==n.BACK&&(G[0]=n.BACK,Z=!0);Z&&n.drawBuffers(G)}function Ze(L){return g!==L?(n.useProgram(L),g=L,!0):!1}const Fe={[di]:n.FUNC_ADD,[yf]:n.FUNC_SUBTRACT,[Sf]:n.FUNC_REVERSE_SUBTRACT};Fe[Mf]=n.MIN,Fe[bf]=n.MAX;const vt={[Ef]:n.ZERO,[Tf]:n.ONE,[Cf]:n.SRC_COLOR,[ea]:n.SRC_ALPHA,[Df]:n.SRC_ALPHA_SATURATE,[Pf]:n.DST_COLOR,[Af]:n.DST_ALPHA,[wf]:n.ONE_MINUS_SRC_COLOR,[ta]:n.ONE_MINUS_SRC_ALPHA,[Lf]:n.ONE_MINUS_DST_COLOR,[Rf]:n.ONE_MINUS_DST_ALPHA,[If]:n.CONSTANT_COLOR,[Uf]:n.ONE_MINUS_CONSTANT_COLOR,[Nf]:n.CONSTANT_ALPHA,[Ff]:n.ONE_MINUS_CONSTANT_ALPHA};function N(L,se,G,Z,le,ae,Ie,pt,Pt,nt){if(L===Zn){_===!0&&(Ee(n.BLEND),_=!1);return}if(_===!1&&(ie(n.BLEND),_=!0),L!==xf){if(L!==m||nt!==S){if((f!==di||v!==di)&&(n.blendEquation(n.FUNC_ADD),f=di,v=di),nt)switch(L){case Wi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFunc(n.ONE,n.ONE);break;case el:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Wi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case el:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}w=null,T=null,P=null,b=null,E.set(0,0,0),R=0,m=L,S=nt}return}le=le||se,ae=ae||G,Ie=Ie||Z,(se!==f||le!==v)&&(n.blendEquationSeparate(Fe[se],Fe[le]),f=se,v=le),(G!==w||Z!==T||ae!==P||Ie!==b)&&(n.blendFuncSeparate(vt[G],vt[Z],vt[ae],vt[Ie]),w=G,T=Z,P=ae,b=Ie),(pt.equals(E)===!1||Pt!==R)&&(n.blendColor(pt.r,pt.g,pt.b,Pt),E.copy(pt),R=Pt),m=L,S=!1}function Zt(L,se){L.side===Rn?Ee(n.CULL_FACE):ie(n.CULL_FACE);let G=L.side===Ot;se&&(G=!G),He(G),L.blending===Wi&&L.transparent===!1?N(Zn):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const Z=L.stencilWrite;a.setTest(Z),Z&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),lt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):Ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(L){y!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),y=L)}function Ge(L){L!==_f?(ie(n.CULL_FACE),L!==A&&(L===Jc?n.cullFace(n.BACK):L===vf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ee(n.CULL_FACE),A=L}function Te(L){L!==O&&(W&&n.lineWidth(L),O=L)}function lt(L,se,G){L?(ie(n.POLYGON_OFFSET_FILL),(F!==se||V!==G)&&(n.polygonOffset(se,G),F=se,V=G)):Ee(n.POLYGON_OFFSET_FILL)}function be(L){L?ie(n.SCISSOR_TEST):Ee(n.SCISSOR_TEST)}function C(L){L===void 0&&(L=n.TEXTURE0+X-1),te!==L&&(n.activeTexture(L),te=L)}function x(L,se,G){G===void 0&&(te===null?G=n.TEXTURE0+X-1:G=te);let Z=re[G];Z===void 0&&(Z={type:void 0,texture:void 0},re[G]=Z),(Z.type!==L||Z.texture!==se)&&(te!==G&&(n.activeTexture(G),te=G),n.bindTexture(L,se||pe[L]),Z.type=L,Z.texture=se)}function k(){const L=re[te];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function We(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function we(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(L){tt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),tt.copy(L))}function he(L){$.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),$.copy(L))}function Ve(L,se){let G=l.get(se);G===void 0&&(G=new WeakMap,l.set(se,G));let Z=G.get(L);Z===void 0&&(Z=n.getUniformBlockIndex(se,L.name),G.set(L,Z))}function ke(L,se){const Z=l.get(se).get(L);c.get(se)!==Z&&(n.uniformBlockBinding(se,Z,L.__bindingPointIndex),c.set(se,Z))}function st(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},te=null,re={},u={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,T=null,v=null,P=null,b=null,E=new Re(0,0,0),R=0,S=!1,y=null,A=null,O=null,F=null,V=null,tt.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:Ee,bindFramebuffer:Pe,drawBuffers:Be,useProgram:Ze,setBlending:N,setMaterial:Zt,setFlipSided:He,setCullFace:Ge,setLineWidth:Te,setPolygonOffset:lt,setScissorTest:be,activeTexture:C,bindTexture:x,unbindTexture:k,compressedTexImage2D:j,compressedTexImage3D:K,texImage2D:ue,texImage3D:we,updateUBOMapping:Ve,uniformBlockBinding:ke,texStorage2D:We,texStorage3D:Q,texSubImage2D:Y,texSubImage3D:ye,compressedTexSubImage2D:oe,compressedTexSubImage3D:de,scissor:Ae,viewport:he,reset:st}}function ql(n,e,t,i){const r=rv(i);switch(t){case fu:return n*e;case mu:return n*e;case gu:return n*e*2;case _u:return n*e/r.components*r.byteLength;case xc:return n*e/r.components*r.byteLength;case vu:return n*e*2/r.components*r.byteLength;case yc:return n*e*2/r.components*r.byteLength;case pu:return n*e*3/r.components*r.byteLength;case dn:return n*e*4/r.components*r.byteLength;case Sc:return n*e*4/r.components*r.byteLength;case Es:case Ts:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Cs:case ws:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pa:case ga:return Math.max(n,16)*Math.max(e,8)/4;case fa:case ma:return Math.max(n,8)*Math.max(e,8)/2;case _a:case va:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ma:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ba:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ta:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case wa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Aa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Da:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case As:case Ua:case Na:return Math.ceil(n/4)*Math.ceil(e/4)*16;case xu:case Fa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ka:case Oa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rv(n){switch(n){case Un:case du:return{byteLength:1,components:1};case Ir:case uu:case Or:return{byteLength:2,components:1};case _c:case vc:return{byteLength:2,components:4};case vi:case gc:case Pn:return{byteLength:4,components:1};case hu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function sv(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ye,d=new WeakMap;let u;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,x){return p?new OffscreenCanvas(C,x):Ws("canvas")}function _(C,x,k){let j=1;const K=be(C);if((K.width>k||K.height>k)&&(j=k/Math.max(K.width,K.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(j*K.width),ye=Math.floor(j*K.height);u===void 0&&(u=g(Y,ye));const oe=x?g(Y,ye):u;return oe.width=Y,oe.height=ye,oe.getContext("2d").drawImage(C,0,0,Y,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+Y+"x"+ye+")."),oe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function m(C){return C.generateMipmaps}function f(C){n.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(C,x,k,j,K=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=x;if(x===n.RED&&(k===n.FLOAT&&(Y=n.R32F),k===n.HALF_FLOAT&&(Y=n.R16F),k===n.UNSIGNED_BYTE&&(Y=n.R8)),x===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.R8UI),k===n.UNSIGNED_SHORT&&(Y=n.R16UI),k===n.UNSIGNED_INT&&(Y=n.R32UI),k===n.BYTE&&(Y=n.R8I),k===n.SHORT&&(Y=n.R16I),k===n.INT&&(Y=n.R32I)),x===n.RG&&(k===n.FLOAT&&(Y=n.RG32F),k===n.HALF_FLOAT&&(Y=n.RG16F),k===n.UNSIGNED_BYTE&&(Y=n.RG8)),x===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RG8UI),k===n.UNSIGNED_SHORT&&(Y=n.RG16UI),k===n.UNSIGNED_INT&&(Y=n.RG32UI),k===n.BYTE&&(Y=n.RG8I),k===n.SHORT&&(Y=n.RG16I),k===n.INT&&(Y=n.RG32I)),x===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),k===n.UNSIGNED_INT&&(Y=n.RGB32UI),k===n.BYTE&&(Y=n.RGB8I),k===n.SHORT&&(Y=n.RGB16I),k===n.INT&&(Y=n.RGB32I)),x===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),k===n.UNSIGNED_INT&&(Y=n.RGBA32UI),k===n.BYTE&&(Y=n.RGBA8I),k===n.SHORT&&(Y=n.RGBA16I),k===n.INT&&(Y=n.RGBA32I)),x===n.RGB&&k===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),x===n.RGBA){const ye=K?Zs:$e.getTransfer(j);k===n.FLOAT&&(Y=n.RGBA32F),k===n.HALF_FLOAT&&(Y=n.RGBA16F),k===n.UNSIGNED_BYTE&&(Y=ye===it?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function v(C,x){let k;return C?x===null||x===vi||x===Ji?k=n.DEPTH24_STENCIL8:x===Pn?k=n.DEPTH32F_STENCIL8:x===Ir&&(k=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===vi||x===Ji?k=n.DEPTH_COMPONENT24:x===Pn?k=n.DEPTH_COMPONENT32F:x===Ir&&(k=n.DEPTH_COMPONENT16),k}function P(C,x){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==hn&&C.minFilter!==vn?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function b(C){const x=C.target;x.removeEventListener("dispose",b),R(x),x.isVideoTexture&&d.delete(x)}function E(C){const x=C.target;x.removeEventListener("dispose",E),y(x)}function R(C){const x=i.get(C);if(x.__webglInit===void 0)return;const k=C.source,j=h.get(k);if(j){const K=j[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(C),Object.keys(j).length===0&&h.delete(k)}i.remove(C)}function S(C){const x=i.get(C);n.deleteTexture(x.__webglTexture);const k=C.source,j=h.get(k);delete j[x.__cacheKey],o.memory.textures--}function y(C){const x=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let K=0;K<x.__webglFramebuffer[j].length;K++)n.deleteFramebuffer(x.__webglFramebuffer[j][K]);else n.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)n.deleteFramebuffer(x.__webglFramebuffer[j]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const k=C.textures;for(let j=0,K=k.length;j<K;j++){const Y=i.get(k[j]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(k[j])}i.remove(C)}let A=0;function O(){A=0}function F(){const C=A;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),A+=1,C}function V(C){const x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function X(C,x){const k=i.get(C);if(C.isVideoTexture&&Te(C),C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,C,x);return}}t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+x)}function W(C,x){const k=i.get(C);if(C.version>0&&k.__version!==C.version){$(k,C,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+x)}function q(C,x){const k=i.get(C);if(C.version>0&&k.__version!==C.version){$(k,C,x);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+x)}function H(C,x){const k=i.get(C);if(C.version>0&&k.__version!==C.version){J(k,C,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+x)}const te={[ua]:n.REPEAT,[mi]:n.CLAMP_TO_EDGE,[ha]:n.MIRRORED_REPEAT},re={[hn]:n.NEAREST,[Xf]:n.NEAREST_MIPMAP_NEAREST,[Wr]:n.NEAREST_MIPMAP_LINEAR,[vn]:n.LINEAR,[io]:n.LINEAR_MIPMAP_NEAREST,[gi]:n.LINEAR_MIPMAP_LINEAR},ge={[jf]:n.NEVER,[tp]:n.ALWAYS,[Zf]:n.LESS,[Su]:n.LEQUAL,[Kf]:n.EQUAL,[ep]:n.GEQUAL,[Jf]:n.GREATER,[Qf]:n.NOTEQUAL};function De(C,x){if(x.type===Pn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===vn||x.magFilter===io||x.magFilter===Wr||x.magFilter===gi||x.minFilter===vn||x.minFilter===io||x.minFilter===Wr||x.minFilter===gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,te[x.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,te[x.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,te[x.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,re[x.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,re[x.minFilter]),x.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,ge[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===hn||x.minFilter!==Wr&&x.minFilter!==gi||x.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function tt(C,x){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",b));const j=x.source;let K=h.get(j);K===void 0&&(K={},h.set(j,K));const Y=V(x);if(Y!==C.__cacheKey){K[Y]===void 0&&(K[Y]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),K[Y].usedTimes++;const ye=K[C.__cacheKey];ye!==void 0&&(K[C.__cacheKey].usedTimes--,ye.usedTimes===0&&S(x)),C.__cacheKey=Y,C.__webglTexture=K[Y].texture}return k}function $(C,x,k){let j=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=n.TEXTURE_3D);const K=tt(C,x),Y=x.source;t.bindTexture(j,C.__webglTexture,n.TEXTURE0+k);const ye=i.get(Y);if(Y.version!==ye.__version||K===!0){t.activeTexture(n.TEXTURE0+k);const oe=$e.getPrimaries($e.workingColorSpace),de=x.colorSpace===Yn?null:$e.getPrimaries(x.colorSpace),We=x.colorSpace===Yn||oe===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let Q=_(x.image,!1,r.maxTextureSize);Q=lt(x,Q);const ue=s.convert(x.format,x.colorSpace),we=s.convert(x.type);let Ae=T(x.internalFormat,ue,we,x.colorSpace,x.isVideoTexture);De(j,x);let he;const Ve=x.mipmaps,ke=x.isVideoTexture!==!0,st=ye.__version===void 0||K===!0,L=Y.dataReady,se=P(x,Q);if(x.isDepthTexture)Ae=v(x.format===Qi,x.type),st&&(ke?t.texStorage2D(n.TEXTURE_2D,1,Ae,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,Ae,Q.width,Q.height,0,ue,we,null));else if(x.isDataTexture)if(Ve.length>0){ke&&st&&t.texStorage2D(n.TEXTURE_2D,se,Ae,Ve[0].width,Ve[0].height);for(let G=0,Z=Ve.length;G<Z;G++)he=Ve[G],ke?L&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,he.width,he.height,ue,we,he.data):t.texImage2D(n.TEXTURE_2D,G,Ae,he.width,he.height,0,ue,we,he.data);x.generateMipmaps=!1}else ke?(st&&t.texStorage2D(n.TEXTURE_2D,se,Ae,Q.width,Q.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Q.width,Q.height,ue,we,Q.data)):t.texImage2D(n.TEXTURE_2D,0,Ae,Q.width,Q.height,0,ue,we,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ke&&st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Ae,Ve[0].width,Ve[0].height,Q.depth);for(let G=0,Z=Ve.length;G<Z;G++)if(he=Ve[G],x.format!==dn)if(ue!==null)if(ke){if(L)if(x.layerUpdates.size>0){const le=ql(he.width,he.height,x.format,x.type);for(const ae of x.layerUpdates){const Ie=he.data.subarray(ae*le/he.data.BYTES_PER_ELEMENT,(ae+1)*le/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,ae,he.width,he.height,1,ue,Ie)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,he.width,he.height,Q.depth,ue,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,G,Ae,he.width,he.height,Q.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,he.width,he.height,Q.depth,ue,we,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,G,Ae,he.width,he.height,Q.depth,0,ue,we,he.data)}else{ke&&st&&t.texStorage2D(n.TEXTURE_2D,se,Ae,Ve[0].width,Ve[0].height);for(let G=0,Z=Ve.length;G<Z;G++)he=Ve[G],x.format!==dn?ue!==null?ke?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,G,0,0,he.width,he.height,ue,he.data):t.compressedTexImage2D(n.TEXTURE_2D,G,Ae,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?L&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,he.width,he.height,ue,we,he.data):t.texImage2D(n.TEXTURE_2D,G,Ae,he.width,he.height,0,ue,we,he.data)}else if(x.isDataArrayTexture)if(ke){if(st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Ae,Q.width,Q.height,Q.depth),L)if(x.layerUpdates.size>0){const G=ql(Q.width,Q.height,x.format,x.type);for(const Z of x.layerUpdates){const le=Q.data.subarray(Z*G/Q.data.BYTES_PER_ELEMENT,(Z+1)*G/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,ue,we,le)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ue,we,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,Q.width,Q.height,Q.depth,0,ue,we,Q.data);else if(x.isData3DTexture)ke?(st&&t.texStorage3D(n.TEXTURE_3D,se,Ae,Q.width,Q.height,Q.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ue,we,Q.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,Q.width,Q.height,Q.depth,0,ue,we,Q.data);else if(x.isFramebufferTexture){if(st)if(ke)t.texStorage2D(n.TEXTURE_2D,se,Ae,Q.width,Q.height);else{let G=Q.width,Z=Q.height;for(let le=0;le<se;le++)t.texImage2D(n.TEXTURE_2D,le,Ae,G,Z,0,ue,we,null),G>>=1,Z>>=1}}else if(Ve.length>0){if(ke&&st){const G=be(Ve[0]);t.texStorage2D(n.TEXTURE_2D,se,Ae,G.width,G.height)}for(let G=0,Z=Ve.length;G<Z;G++)he=Ve[G],ke?L&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,ue,we,he):t.texImage2D(n.TEXTURE_2D,G,Ae,ue,we,he);x.generateMipmaps=!1}else if(ke){if(st){const G=be(Q);t.texStorage2D(n.TEXTURE_2D,se,Ae,G.width,G.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,we,Q)}else t.texImage2D(n.TEXTURE_2D,0,Ae,ue,we,Q);m(x)&&f(j),ye.__version=Y.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function J(C,x,k){if(x.image.length!==6)return;const j=tt(C,x),K=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+k);const Y=i.get(K);if(K.version!==Y.__version||j===!0){t.activeTexture(n.TEXTURE0+k);const ye=$e.getPrimaries($e.workingColorSpace),oe=x.colorSpace===Yn?null:$e.getPrimaries(x.colorSpace),de=x.colorSpace===Yn||ye===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const We=x.isCompressedTexture||x.image[0].isCompressedTexture,Q=x.image[0]&&x.image[0].isDataTexture,ue=[];for(let Z=0;Z<6;Z++)!We&&!Q?ue[Z]=_(x.image[Z],!0,r.maxCubemapSize):ue[Z]=Q?x.image[Z].image:x.image[Z],ue[Z]=lt(x,ue[Z]);const we=ue[0],Ae=s.convert(x.format,x.colorSpace),he=s.convert(x.type),Ve=T(x.internalFormat,Ae,he,x.colorSpace),ke=x.isVideoTexture!==!0,st=Y.__version===void 0||j===!0,L=K.dataReady;let se=P(x,we);De(n.TEXTURE_CUBE_MAP,x);let G;if(We){ke&&st&&t.texStorage2D(n.TEXTURE_CUBE_MAP,se,Ve,we.width,we.height);for(let Z=0;Z<6;Z++){G=ue[Z].mipmaps;for(let le=0;le<G.length;le++){const ae=G[le];x.format!==dn?Ae!==null?ke?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,0,0,ae.width,ae.height,Ae,ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,Ve,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,0,0,ae.width,ae.height,Ae,he,ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,Ve,ae.width,ae.height,0,Ae,he,ae.data)}}}else{if(G=x.mipmaps,ke&&st){G.length>0&&se++;const Z=be(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,se,Ve,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ue[Z].width,ue[Z].height,Ae,he,ue[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,ue[Z].width,ue[Z].height,0,Ae,he,ue[Z].data);for(let le=0;le<G.length;le++){const Ie=G[le].image[Z].image;ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,0,0,Ie.width,Ie.height,Ae,he,Ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,Ve,Ie.width,Ie.height,0,Ae,he,Ie.data)}}else{ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ae,he,ue[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,Ae,he,ue[Z]);for(let le=0;le<G.length;le++){const ae=G[le];ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,0,0,Ae,he,ae.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,Ve,Ae,he,ae.image[Z])}}}m(x)&&f(n.TEXTURE_CUBE_MAP),Y.__version=K.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function pe(C,x,k,j,K,Y){const ye=s.convert(k.format,k.colorSpace),oe=s.convert(k.type),de=T(k.internalFormat,ye,oe,k.colorSpace),We=i.get(x),Q=i.get(k);if(Q.__renderTarget=x,!We.__hasExternalTextures){const ue=Math.max(1,x.width>>Y),we=Math.max(1,x.height>>Y);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,Y,de,ue,we,x.depth,0,ye,oe,null):t.texImage2D(K,Y,de,ue,we,0,ye,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Ge(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,K,Q.__webglTexture,0,He(x)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,K,Q.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ie(C,x,k){if(n.bindRenderbuffer(n.RENDERBUFFER,C),x.depthBuffer){const j=x.depthTexture,K=j&&j.isDepthTexture?j.type:null,Y=v(x.stencilBuffer,K),ye=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=He(x);Ge(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,Y,x.width,x.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,Y,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Y,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,C)}else{const j=x.textures;for(let K=0;K<j.length;K++){const Y=j[K],ye=s.convert(Y.format,Y.colorSpace),oe=s.convert(Y.type),de=T(Y.internalFormat,ye,oe,Y.colorSpace),We=He(x);k&&Ge(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,We,de,x.width,x.height):Ge(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,We,de,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,de,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ee(C,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(x.depthTexture);j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X(x.depthTexture,0);const K=j.__webglTexture,Y=He(x);if(x.depthTexture.format===Xi)Ge(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(x.depthTexture.format===Qi)Ge(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Pe(C){const x=i.get(C),k=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",K)};j.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=j}if(C.depthTexture&&!x.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ee(x.__webglFramebuffer,C)}else if(k){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=n.createRenderbuffer(),ie(x.__webglDepthbuffer[j],C,!1);else{const K=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ie(x.__webglDepthbuffer,C,!1);else{const j=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,K)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Be(C,x,k){const j=i.get(C);x!==void 0&&pe(j.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Pe(C)}function Ze(C){const x=C.texture,k=i.get(C),j=i.get(x);C.addEventListener("dispose",E);const K=C.textures,Y=C.isWebGLCubeRenderTarget===!0,ye=K.length>1;if(ye||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=x.version,o.memory.textures++),Y){k.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer[oe]=[];for(let de=0;de<x.mipmaps.length;de++)k.__webglFramebuffer[oe][de]=n.createFramebuffer()}else k.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer=[];for(let oe=0;oe<x.mipmaps.length;oe++)k.__webglFramebuffer[oe]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ye)for(let oe=0,de=K.length;oe<de;oe++){const We=i.get(K[oe]);We.__webglTexture===void 0&&(We.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&Ge(C)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let oe=0;oe<K.length;oe++){const de=K[oe];k.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[oe]);const We=s.convert(de.format,de.colorSpace),Q=s.convert(de.type),ue=T(de.internalFormat,We,Q,de.colorSpace,C.isXRRenderTarget===!0),we=He(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,ue,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,k.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),ie(k.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),De(n.TEXTURE_CUBE_MAP,x);for(let oe=0;oe<6;oe++)if(x.mipmaps&&x.mipmaps.length>0)for(let de=0;de<x.mipmaps.length;de++)pe(k.__webglFramebuffer[oe][de],C,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else pe(k.__webglFramebuffer[oe],C,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(x)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let oe=0,de=K.length;oe<de;oe++){const We=K[oe],Q=i.get(We);t.bindTexture(n.TEXTURE_2D,Q.__webglTexture),De(n.TEXTURE_2D,We),pe(k.__webglFramebuffer,C,We,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,0),m(We)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(oe=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,j.__webglTexture),De(oe,x),x.mipmaps&&x.mipmaps.length>0)for(let de=0;de<x.mipmaps.length;de++)pe(k.__webglFramebuffer[de],C,x,n.COLOR_ATTACHMENT0,oe,de);else pe(k.__webglFramebuffer,C,x,n.COLOR_ATTACHMENT0,oe,0);m(x)&&f(oe),t.unbindTexture()}C.depthBuffer&&Pe(C)}function Fe(C){const x=C.textures;for(let k=0,j=x.length;k<j;k++){const K=x[k];if(m(K)){const Y=w(C),ye=i.get(K).__webglTexture;t.bindTexture(Y,ye),f(Y),t.unbindTexture()}}}const vt=[],N=[];function Zt(C){if(C.samples>0){if(Ge(C)===!1){const x=C.textures,k=C.width,j=C.height;let K=n.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(C),oe=x.length>1;if(oe)for(let de=0;de<x.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let de=0;de<x.length;de++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[de]);const We=i.get(x[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,We,0)}n.blitFramebuffer(0,0,k,j,0,0,k,j,K,n.NEAREST),c===!0&&(vt.length=0,N.length=0,vt.push(n.COLOR_ATTACHMENT0+de),C.depthBuffer&&C.resolveDepthBuffer===!1&&(vt.push(Y),N.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let de=0;de<x.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ye.__webglColorRenderbuffer[de]);const We=i.get(x[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,We,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const x=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function He(C){return Math.min(r.maxSamples,C.samples)}function Ge(C){const x=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Te(C){const x=o.render.frame;d.get(C)!==x&&(d.set(C,x),C.update())}function lt(C,x){const k=C.colorSpace,j=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==nr&&k!==Yn&&($e.getTransfer(k)===it?(j!==dn||K!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),x}function be(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=O,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=q,this.setTextureCube=H,this.rebindTextures=Be,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=Zt,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=Ge}function ov(n,e){function t(i,r=Yn){let s;const o=$e.getTransfer(r);if(i===Un)return n.UNSIGNED_BYTE;if(i===_c)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===hu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===du)return n.BYTE;if(i===uu)return n.SHORT;if(i===Ir)return n.UNSIGNED_SHORT;if(i===gc)return n.INT;if(i===vi)return n.UNSIGNED_INT;if(i===Pn)return n.FLOAT;if(i===Or)return n.HALF_FLOAT;if(i===fu)return n.ALPHA;if(i===pu)return n.RGB;if(i===dn)return n.RGBA;if(i===mu)return n.LUMINANCE;if(i===gu)return n.LUMINANCE_ALPHA;if(i===Xi)return n.DEPTH_COMPONENT;if(i===Qi)return n.DEPTH_STENCIL;if(i===_u)return n.RED;if(i===xc)return n.RED_INTEGER;if(i===vu)return n.RG;if(i===yc)return n.RG_INTEGER;if(i===Sc)return n.RGBA_INTEGER;if(i===Es||i===Ts||i===Cs||i===ws)if(o===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Es)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Es)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ts)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ws)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===fa||i===pa||i===ma||i===ga)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===fa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ma)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ga)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_a||i===va||i===xa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_a||i===va)return o===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===xa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ya||i===Sa||i===Ma||i===ba||i===Ea||i===Ta||i===Ca||i===wa||i===Aa||i===Ra||i===Pa||i===La||i===Da||i===Ia)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ya)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Sa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ma)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ba)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ea)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ta)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ca)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===wa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Aa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ra)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===La)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Da)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ia)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===As||i===Ua||i===Na)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===As)return o===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ua)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Na)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xu||i===Fa||i===ka||i===Oa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===As)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Fa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ka)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Oa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ji?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class av extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _t extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cv={type:"move"};class Io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=d.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cv)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _t;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const lv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dv=`
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

}`;class uv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Wt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ei({vertexShader:lv,fragmentShader:dv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new me(new In(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hv extends ir{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,d=null,u=null,h=null,p=null,g=null;const _=new uv,m=t.getContextAttributes();let f=null,w=null;const T=[],v=[],P=new Ye;let b=null;const E=new jt;E.viewport=new rt;const R=new jt;R.viewport=new rt;const S=[E,R],y=new av;let A=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let J=T[$];return J===void 0&&(J=new Io,T[$]=J),J.getTargetRaySpace()},this.getControllerGrip=function($){let J=T[$];return J===void 0&&(J=new Io,T[$]=J),J.getGripSpace()},this.getHand=function($){let J=T[$];return J===void 0&&(J=new Io,T[$]=J),J.getHandSpace()};function F($){const J=v.indexOf($.inputSource);if(J===-1)return;const pe=T[J];pe!==void 0&&(pe.update($.inputSource,$.frame,l||o),pe.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",X);for(let $=0;$<T.length;$++){const J=v[$];J!==null&&(v[$]=null,T[$].disconnect(J))}A=null,O=null,_.reset(),e.setRenderTarget(f),p=null,h=null,u=null,r=null,w=null,tt.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",V),r.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){const J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new xi(p.framebufferWidth,p.framebufferHeight,{format:dn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,pe=null,ie=null;m.depth&&(ie=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=m.stencil?Qi:Xi,pe=m.stencil?Ji:vi);const Ee={colorFormat:t.RGBA8,depthFormat:ie,scaleFactor:s};u=new XRWebGLBinding(r,t),h=u.createProjectionLayer(Ee),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),w=new xi(h.textureWidth,h.textureHeight,{format:dn,type:Un,depthTexture:new Uu(h.textureWidth,h.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),tt.setContext(r),tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X($){for(let J=0;J<$.removed.length;J++){const pe=$.removed[J],ie=v.indexOf(pe);ie>=0&&(v[ie]=null,T[ie].disconnect(pe))}for(let J=0;J<$.added.length;J++){const pe=$.added[J];let ie=v.indexOf(pe);if(ie===-1){for(let Pe=0;Pe<T.length;Pe++)if(Pe>=v.length){v.push(pe),ie=Pe;break}else if(v[Pe]===null){v[Pe]=pe,ie=Pe;break}if(ie===-1)break}const Ee=T[ie];Ee&&Ee.connect(pe)}}const W=new D,q=new D;function H($,J,pe){W.setFromMatrixPosition(J.matrixWorld),q.setFromMatrixPosition(pe.matrixWorld);const ie=W.distanceTo(q),Ee=J.projectionMatrix.elements,Pe=pe.projectionMatrix.elements,Be=Ee[14]/(Ee[10]-1),Ze=Ee[14]/(Ee[10]+1),Fe=(Ee[9]+1)/Ee[5],vt=(Ee[9]-1)/Ee[5],N=(Ee[8]-1)/Ee[0],Zt=(Pe[8]+1)/Pe[0],He=Be*N,Ge=Be*Zt,Te=ie/(-N+Zt),lt=Te*-N;if(J.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(lt),$.translateZ(Te),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ee[10]===-1)$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const be=Be+Te,C=Ze+Te,x=He-lt,k=Ge+(ie-lt),j=Fe*Ze/C*be,K=vt*Ze/C*be;$.projectionMatrix.makePerspective(x,k,j,K,be,C),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function te($,J){J===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(J.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let J=$.near,pe=$.far;_.texture!==null&&(_.depthNear>0&&(J=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),y.near=R.near=E.near=J,y.far=R.far=E.far=pe,(A!==y.near||O!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,O=y.far),E.layers.mask=$.layers.mask|2,R.layers.mask=$.layers.mask|4,y.layers.mask=E.layers.mask|R.layers.mask;const ie=$.parent,Ee=y.cameras;te(y,ie);for(let Pe=0;Pe<Ee.length;Pe++)te(Ee[Pe],ie);Ee.length===2?H(y,E,R):y.projectionMatrix.copy(E.projectionMatrix),re($,y,ie)};function re($,J,pe){pe===null?$.matrix.copy(J.matrixWorld):($.matrix.copy(pe.matrixWorld),$.matrix.invert(),$.matrix.multiply(J.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ba*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function($){c=$,h!==null&&(h.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ge=null;function De($,J){if(d=J.getViewerPose(l||o),g=J,d!==null){const pe=d.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let ie=!1;pe.length!==y.cameras.length&&(y.cameras.length=0,ie=!0);for(let Pe=0;Pe<pe.length;Pe++){const Be=pe[Pe];let Ze=null;if(p!==null)Ze=p.getViewport(Be);else{const vt=u.getViewSubImage(h,Be);Ze=vt.viewport,Pe===0&&(e.setRenderTargetTextures(w,vt.colorTexture,h.ignoreDepthValues?void 0:vt.depthStencilTexture),e.setRenderTarget(w))}let Fe=S[Pe];Fe===void 0&&(Fe=new jt,Fe.layers.enable(Pe),Fe.viewport=new rt,S[Pe]=Fe),Fe.matrix.fromArray(Be.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(Be.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Pe===0&&(y.matrix.copy(Fe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ie===!0&&y.cameras.push(Fe)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const Pe=u.getDepthInformation(pe[0]);Pe&&Pe.isValid&&Pe.texture&&_.init(e,Pe,r.renderState)}}for(let pe=0;pe<T.length;pe++){const ie=v[pe],Ee=T[pe];ie!==null&&Ee!==void 0&&Ee.update(ie,J,l||o)}ge&&ge($,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const tt=new Du;tt.setAnimationLoop(De),this.setAnimationLoop=function($){ge=$},this.dispose=function(){}}}const ai=new xn,fv=new ft;function pv(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Ru(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,w,T,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,w,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ot&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ot&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const w=e.get(f),T=w.envMap,v=w.envMapRotation;T&&(m.envMap.value=T,ai.copy(v),ai.x*=-1,ai.y*=-1,ai.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),m.envMapRotation.value.setFromMatrix4(fv.makeRotationFromEuler(ai)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,w,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=T*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ot&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const w=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function mv(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,T){const v=T.program;i.uniformBlockBinding(w,v)}function l(w,T){let v=r[w.id];v===void 0&&(g(w),v=d(w),r[w.id]=v,w.addEventListener("dispose",m));const P=T.program;i.updateUBOMapping(w,P);const b=e.render.frame;s[w.id]!==b&&(h(w),s[w.id]=b)}function d(w){const T=u();w.__bindingPointIndex=T;const v=n.createBuffer(),P=w.__size,b=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,P,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,v),v}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(w){const T=r[w.id],v=w.uniforms,P=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let b=0,E=v.length;b<E;b++){const R=Array.isArray(v[b])?v[b]:[v[b]];for(let S=0,y=R.length;S<y;S++){const A=R[S];if(p(A,b,S,P)===!0){const O=A.__offset,F=Array.isArray(A.value)?A.value:[A.value];let V=0;for(let X=0;X<F.length;X++){const W=F[X],q=_(W);typeof W=="number"||typeof W=="boolean"?(A.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,O+V,A.__data)):W.isMatrix3?(A.__data[0]=W.elements[0],A.__data[1]=W.elements[1],A.__data[2]=W.elements[2],A.__data[3]=0,A.__data[4]=W.elements[3],A.__data[5]=W.elements[4],A.__data[6]=W.elements[5],A.__data[7]=0,A.__data[8]=W.elements[6],A.__data[9]=W.elements[7],A.__data[10]=W.elements[8],A.__data[11]=0):(W.toArray(A.__data,V),V+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,T,v,P){const b=w.value,E=T+"_"+v;if(P[E]===void 0)return typeof b=="number"||typeof b=="boolean"?P[E]=b:P[E]=b.clone(),!0;{const R=P[E];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return P[E]=b,!0}else if(R.equals(b)===!1)return R.copy(b),!0}return!1}function g(w){const T=w.uniforms;let v=0;const P=16;for(let E=0,R=T.length;E<R;E++){const S=Array.isArray(T[E])?T[E]:[T[E]];for(let y=0,A=S.length;y<A;y++){const O=S[y],F=Array.isArray(O.value)?O.value:[O.value];for(let V=0,X=F.length;V<X;V++){const W=F[V],q=_(W),H=v%P,te=H%q.boundary,re=H+te;v+=te,re!==0&&P-re<q.storage&&(v+=P-re),O.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=v,v+=q.storage}}}const b=v%P;return b>0&&(v+=P-b),w.__size=v,w.__cache={},this}function _(w){const T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){const T=w.target;T.removeEventListener("dispose",m);const v=o.indexOf(T.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function f(){for(const w in r)n.deleteBuffer(r[w]);o=[],r={},s={}}return{bind:c,update:l,dispose:f}}class gv{constructor(e={}){const{canvas:t=ip(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const w=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this.toneMapping=Kn,this.toneMappingExposure=1;const v=this;let P=!1,b=0,E=0,R=null,S=-1,y=null;const A=new rt,O=new rt;let F=null;const V=new Re(0);let X=0,W=t.width,q=t.height,H=1,te=null,re=null;const ge=new rt(0,0,W,q),De=new rt(0,0,W,q);let tt=!1;const $=new bc;let J=!1,pe=!1;const ie=new ft,Ee=new ft,Pe=new D,Be=new rt,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function vt(){return R===null?H:1}let N=i;function Zt(M,I){return t.getContext(M,I)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mc}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ae,!1),N===null){const I="webgl2";if(N=Zt(I,M),N===null)throw Zt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let He,Ge,Te,lt,be,C,x,k,j,K,Y,ye,oe,de,We,Q,ue,we,Ae,he,Ve,ke,st,L;function se(){He=new Sg(N),He.init(),ke=new ov(N,He),Ge=new mg(N,He,e,ke),Te=new iv(N,He),Ge.reverseDepthBuffer&&h&&Te.buffers.depth.setReversed(!0),lt=new Eg(N),be=new G_,C=new sv(N,He,Te,be,Ge,ke,lt),x=new _g(v),k=new yg(v),j=new Lp(N),st=new fg(N,j),K=new Mg(N,j,lt,st),Y=new Cg(N,K,j,lt),Ae=new Tg(N,Ge,C),Q=new gg(be),ye=new H_(v,x,k,He,Ge,st,Q),oe=new pv(v,be),de=new W_,We=new Z_(He),we=new hg(v,x,k,Te,Y,p,c),ue=new tv(v,Y,Ge),L=new mv(N,lt,Ge,Te),he=new pg(N,He,lt),Ve=new bg(N,He,lt),lt.programs=ye.programs,v.capabilities=Ge,v.extensions=He,v.properties=be,v.renderLists=de,v.shadowMap=ue,v.state=Te,v.info=lt}se();const G=new hv(v,N);this.xr=G,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const M=He.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=He.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(M){M!==void 0&&(H=M,this.setSize(W,q,!1))},this.getSize=function(M){return M.set(W,q)},this.setSize=function(M,I,B=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=M,q=I,t.width=Math.floor(M*H),t.height=Math.floor(I*H),B===!0&&(t.style.width=M+"px",t.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(W*H,q*H).floor()},this.setDrawingBufferSize=function(M,I,B){W=M,q=I,H=B,t.width=Math.floor(M*B),t.height=Math.floor(I*B),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(A)},this.getViewport=function(M){return M.copy(ge)},this.setViewport=function(M,I,B,z){M.isVector4?ge.set(M.x,M.y,M.z,M.w):ge.set(M,I,B,z),Te.viewport(A.copy(ge).multiplyScalar(H).round())},this.getScissor=function(M){return M.copy(De)},this.setScissor=function(M,I,B,z){M.isVector4?De.set(M.x,M.y,M.z,M.w):De.set(M,I,B,z),Te.scissor(O.copy(De).multiplyScalar(H).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(M){Te.setScissorTest(tt=M)},this.setOpaqueSort=function(M){te=M},this.setTransparentSort=function(M){re=M},this.getClearColor=function(M){return M.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor.apply(we,arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha.apply(we,arguments)},this.clear=function(M=!0,I=!0,B=!0){let z=0;if(M){let U=!1;if(R!==null){const ee=R.texture.format;U=ee===Sc||ee===yc||ee===xc}if(U){const ee=R.texture.type,ce=ee===Un||ee===vi||ee===Ir||ee===Ji||ee===_c||ee===vc,_e=we.getClearColor(),ve=we.getClearAlpha(),Le=_e.r,Ue=_e.g,xe=_e.b;ce?(g[0]=Le,g[1]=Ue,g[2]=xe,g[3]=ve,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Le,_[1]=Ue,_[2]=xe,_[3]=ve,N.clearBufferiv(N.COLOR,0,_))}else z|=N.COLOR_BUFFER_BIT}I&&(z|=N.DEPTH_BUFFER_BIT),B&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),de.dispose(),We.dispose(),be.dispose(),x.dispose(),k.dispose(),Y.dispose(),st.dispose(),L.dispose(),ye.dispose(),G.dispose(),G.removeEventListener("sessionstart",Gc),G.removeEventListener("sessionend",Vc),ti.stop()};function Z(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const M=lt.autoReset,I=ue.enabled,B=ue.autoUpdate,z=ue.needsUpdate,U=ue.type;se(),lt.autoReset=M,ue.enabled=I,ue.autoUpdate=B,ue.needsUpdate=z,ue.type=U}function ae(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ie(M){const I=M.target;I.removeEventListener("dispose",Ie),pt(I)}function pt(M){Pt(M),be.remove(M)}function Pt(M){const I=be.get(M).programs;I!==void 0&&(I.forEach(function(B){ye.releaseProgram(B)}),M.isShaderMaterial&&ye.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,B,z,U,ee){I===null&&(I=Ze);const ce=U.isMesh&&U.matrixWorld.determinant()<0,_e=Gh(M,I,B,z,U);Te.setMaterial(z,ce);let ve=B.index,Le=1;if(z.wireframe===!0){if(ve=K.getWireframeAttribute(B),ve===void 0)return;Le=2}const Ue=B.drawRange,xe=B.attributes.position;let qe=Ue.start*Le,ot=(Ue.start+Ue.count)*Le;ee!==null&&(qe=Math.max(qe,ee.start*Le),ot=Math.min(ot,(ee.start+ee.count)*Le)),ve!==null?(qe=Math.max(qe,0),ot=Math.min(ot,ve.count)):xe!=null&&(qe=Math.max(qe,0),ot=Math.min(ot,xe.count));const dt=ot-qe;if(dt<0||dt===1/0)return;st.setup(U,z,_e,B,ve);let zt,Ke=he;if(ve!==null&&(zt=j.get(ve),Ke=Ve,Ke.setIndex(zt)),U.isMesh)z.wireframe===!0?(Te.setLineWidth(z.wireframeLinewidth*vt()),Ke.setMode(N.LINES)):Ke.setMode(N.TRIANGLES);else if(U.isLine){let Se=z.linewidth;Se===void 0&&(Se=1),Te.setLineWidth(Se*vt()),U.isLineSegments?Ke.setMode(N.LINES):U.isLineLoop?Ke.setMode(N.LINE_LOOP):Ke.setMode(N.LINE_STRIP)}else U.isPoints?Ke.setMode(N.POINTS):U.isSprite&&Ke.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ke.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))Ke.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Se=U._multiDrawStarts,Mn=U._multiDrawCounts,Je=U._multiDrawCount,rn=ve?j.get(ve).bytesPerElement:1,Ei=be.get(z).currentProgram.getUniforms();for(let Xt=0;Xt<Je;Xt++)Ei.setValue(N,"_gl_DrawID",Xt),Ke.render(Se[Xt]/rn,Mn[Xt])}else if(U.isInstancedMesh)Ke.renderInstances(qe,dt,U.count);else if(B.isInstancedBufferGeometry){const Se=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Mn=Math.min(B.instanceCount,Se);Ke.renderInstances(qe,dt,Mn)}else Ke.render(qe,dt)};function nt(M,I,B){M.transparent===!0&&M.side===Rn&&M.forceSinglePass===!1?(M.side=Ot,M.needsUpdate=!0,Vr(M,I,B),M.side=Qn,M.needsUpdate=!0,Vr(M,I,B),M.side=Rn):Vr(M,I,B)}this.compile=function(M,I,B=null){B===null&&(B=M),f=We.get(B),f.init(I),T.push(f),B.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),M!==B&&M.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const z=new Set;return M.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ee=U.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){const _e=ee[ce];nt(_e,B,U),z.add(_e)}else nt(ee,B,U),z.add(ee)}),T.pop(),f=null,z},this.compileAsync=function(M,I,B=null){const z=this.compile(M,I,B);return new Promise(U=>{function ee(){if(z.forEach(function(ce){be.get(ce).currentProgram.isReady()&&z.delete(ce)}),z.size===0){U(M);return}setTimeout(ee,10)}He.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let nn=null;function Sn(M){nn&&nn(M)}function Gc(){ti.stop()}function Vc(){ti.start()}const ti=new Du;ti.setAnimationLoop(Sn),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(M){nn=M,G.setAnimationLoop(M),M===null?ti.stop():ti.start()},G.addEventListener("sessionstart",Gc),G.addEventListener("sessionend",Vc),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(I),I=G.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,I,R),f=We.get(M,T.length),f.init(I),T.push(f),Ee.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),$.setFromProjectionMatrix(Ee),pe=this.localClippingEnabled,J=Q.init(this.clippingPlanes,pe),m=de.get(M,w.length),m.init(),w.push(m),G.enabled===!0&&G.isPresenting===!0){const ee=v.xr.getDepthSensingMesh();ee!==null&&no(ee,I,-1/0,v.sortObjects)}no(M,I,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(te,re),Fe=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Fe&&we.addToRenderList(m,M),this.info.render.frame++,J===!0&&Q.beginShadows();const B=f.state.shadowsArray;ue.render(B,M,I),J===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,U=m.transmissive;if(f.setupLights(),I.isArrayCamera){const ee=I.cameras;if(U.length>0)for(let ce=0,_e=ee.length;ce<_e;ce++){const ve=ee[ce];Xc(z,U,M,ve)}Fe&&we.render(M);for(let ce=0,_e=ee.length;ce<_e;ce++){const ve=ee[ce];Wc(m,M,ve,ve.viewport)}}else U.length>0&&Xc(z,U,M,I),Fe&&we.render(M),Wc(m,M,I);R!==null&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),M.isScene===!0&&M.onAfterRender(v,M,I),st.resetDefaultState(),S=-1,y=null,T.pop(),T.length>0?(f=T[T.length-1],J===!0&&Q.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function no(M,I,B,z){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)f.pushLight(M),M.castShadow&&f.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||$.intersectsSprite(M)){z&&Be.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ee);const ce=Y.update(M),_e=M.material;_e.visible&&m.push(M,ce,_e,B,Be.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||$.intersectsObject(M))){const ce=Y.update(M),_e=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Be.copy(M.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Be.copy(ce.boundingSphere.center)),Be.applyMatrix4(M.matrixWorld).applyMatrix4(Ee)),Array.isArray(_e)){const ve=ce.groups;for(let Le=0,Ue=ve.length;Le<Ue;Le++){const xe=ve[Le],qe=_e[xe.materialIndex];qe&&qe.visible&&m.push(M,ce,qe,B,Be.z,xe)}}else _e.visible&&m.push(M,ce,_e,B,Be.z,null)}}const ee=M.children;for(let ce=0,_e=ee.length;ce<_e;ce++)no(ee[ce],I,B,z)}function Wc(M,I,B,z){const U=M.opaque,ee=M.transmissive,ce=M.transparent;f.setupLightsView(B),J===!0&&Q.setGlobalState(v.clippingPlanes,B),z&&Te.viewport(A.copy(z)),U.length>0&&Gr(U,I,B),ee.length>0&&Gr(ee,I,B),ce.length>0&&Gr(ce,I,B),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function Xc(M,I,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[z.id]===void 0&&(f.state.transmissionRenderTarget[z.id]=new xi(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?Or:Un,minFilter:gi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const ee=f.state.transmissionRenderTarget[z.id],ce=z.viewport||A;ee.setSize(ce.z,ce.w);const _e=v.getRenderTarget();v.setRenderTarget(ee),v.getClearColor(V),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),Fe&&we.render(B);const ve=v.toneMapping;v.toneMapping=Kn;const Le=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),f.setupLightsView(z),J===!0&&Q.setGlobalState(v.clippingPlanes,z),Gr(M,B,z),C.updateMultisampleRenderTarget(ee),C.updateRenderTargetMipmap(ee),He.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let xe=0,qe=I.length;xe<qe;xe++){const ot=I[xe],dt=ot.object,zt=ot.geometry,Ke=ot.material,Se=ot.group;if(Ke.side===Rn&&dt.layers.test(z.layers)){const Mn=Ke.side;Ke.side=Ot,Ke.needsUpdate=!0,$c(dt,B,z,zt,Ke,Se),Ke.side=Mn,Ke.needsUpdate=!0,Ue=!0}}Ue===!0&&(C.updateMultisampleRenderTarget(ee),C.updateRenderTargetMipmap(ee))}v.setRenderTarget(_e),v.setClearColor(V,X),Le!==void 0&&(z.viewport=Le),v.toneMapping=ve}function Gr(M,I,B){const z=I.isScene===!0?I.overrideMaterial:null;for(let U=0,ee=M.length;U<ee;U++){const ce=M[U],_e=ce.object,ve=ce.geometry,Le=z===null?ce.material:z,Ue=ce.group;_e.layers.test(B.layers)&&$c(_e,I,B,ve,Le,Ue)}}function $c(M,I,B,z,U,ee){M.onBeforeRender(v,I,B,z,U,ee),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),U.onBeforeRender(v,I,B,z,M,ee),U.transparent===!0&&U.side===Rn&&U.forceSinglePass===!1?(U.side=Ot,U.needsUpdate=!0,v.renderBufferDirect(B,I,z,U,M,ee),U.side=Qn,U.needsUpdate=!0,v.renderBufferDirect(B,I,z,U,M,ee),U.side=Rn):v.renderBufferDirect(B,I,z,U,M,ee),M.onAfterRender(v,I,B,z,U,ee)}function Vr(M,I,B){I.isScene!==!0&&(I=Ze);const z=be.get(M),U=f.state.lights,ee=f.state.shadowsArray,ce=U.state.version,_e=ye.getParameters(M,U.state,ee,I,B),ve=ye.getProgramCacheKey(_e);let Le=z.programs;z.environment=M.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(M.isMeshStandardMaterial?k:x).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Le===void 0&&(M.addEventListener("dispose",Ie),Le=new Map,z.programs=Le);let Ue=Le.get(ve);if(Ue!==void 0){if(z.currentProgram===Ue&&z.lightsStateVersion===ce)return qc(M,_e),Ue}else _e.uniforms=ye.getUniforms(M),M.onBeforeCompile(_e,v),Ue=ye.acquireProgram(_e,ve),Le.set(ve,Ue),z.uniforms=_e.uniforms;const xe=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(xe.clippingPlanes=Q.uniform),qc(M,_e),z.needsLights=Wh(M),z.lightsStateVersion=ce,z.needsLights&&(xe.ambientLightColor.value=U.state.ambient,xe.lightProbe.value=U.state.probe,xe.directionalLights.value=U.state.directional,xe.directionalLightShadows.value=U.state.directionalShadow,xe.spotLights.value=U.state.spot,xe.spotLightShadows.value=U.state.spotShadow,xe.rectAreaLights.value=U.state.rectArea,xe.ltc_1.value=U.state.rectAreaLTC1,xe.ltc_2.value=U.state.rectAreaLTC2,xe.pointLights.value=U.state.point,xe.pointLightShadows.value=U.state.pointShadow,xe.hemisphereLights.value=U.state.hemi,xe.directionalShadowMap.value=U.state.directionalShadowMap,xe.directionalShadowMatrix.value=U.state.directionalShadowMatrix,xe.spotShadowMap.value=U.state.spotShadowMap,xe.spotLightMatrix.value=U.state.spotLightMatrix,xe.spotLightMap.value=U.state.spotLightMap,xe.pointShadowMap.value=U.state.pointShadowMap,xe.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=Ue,z.uniformsList=null,Ue}function Yc(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=Rs.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function qc(M,I){const B=be.get(M);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Gh(M,I,B,z,U){I.isScene!==!0&&(I=Ze),C.resetTextureUnits();const ee=I.fog,ce=z.isMeshStandardMaterial?I.environment:null,_e=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:nr,ve=(z.isMeshStandardMaterial?k:x).get(z.envMap||ce),Le=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ue=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),xe=!!B.morphAttributes.position,qe=!!B.morphAttributes.normal,ot=!!B.morphAttributes.color;let dt=Kn;z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(dt=v.toneMapping);const zt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ke=zt!==void 0?zt.length:0,Se=be.get(z),Mn=f.state.lights;if(J===!0&&(pe===!0||M!==y)){const Kt=M===y&&z.id===S;Q.setState(z,M,Kt)}let Je=!1;z.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==Mn.state.version||Se.outputColorSpace!==_e||U.isBatchedMesh&&Se.batching===!1||!U.isBatchedMesh&&Se.batching===!0||U.isBatchedMesh&&Se.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Se.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Se.instancing===!1||!U.isInstancedMesh&&Se.instancing===!0||U.isSkinnedMesh&&Se.skinning===!1||!U.isSkinnedMesh&&Se.skinning===!0||U.isInstancedMesh&&Se.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Se.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Se.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Se.instancingMorph===!1&&U.morphTexture!==null||Se.envMap!==ve||z.fog===!0&&Se.fog!==ee||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==Q.numPlanes||Se.numIntersection!==Q.numIntersection)||Se.vertexAlphas!==Le||Se.vertexTangents!==Ue||Se.morphTargets!==xe||Se.morphNormals!==qe||Se.morphColors!==ot||Se.toneMapping!==dt||Se.morphTargetsCount!==Ke)&&(Je=!0):(Je=!0,Se.__version=z.version);let rn=Se.currentProgram;Je===!0&&(rn=Vr(z,I,U));let Ei=!1,Xt=!1,or=!1;const ut=rn.getUniforms(),mn=Se.uniforms;if(Te.useProgram(rn.program)&&(Ei=!0,Xt=!0,or=!0),z.id!==S&&(S=z.id,Xt=!0),Ei||y!==M){Te.buffers.depth.getReversed()?(ie.copy(M.projectionMatrix),sp(ie),op(ie),ut.setValue(N,"projectionMatrix",ie)):ut.setValue(N,"projectionMatrix",M.projectionMatrix),ut.setValue(N,"viewMatrix",M.matrixWorldInverse);const kn=ut.map.cameraPosition;kn!==void 0&&kn.setValue(N,Pe.setFromMatrixPosition(M.matrixWorld)),Ge.logarithmicDepthBuffer&&ut.setValue(N,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(N,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Xt=!0,or=!0)}if(U.isSkinnedMesh){ut.setOptional(N,U,"bindMatrix"),ut.setOptional(N,U,"bindMatrixInverse");const Kt=U.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),ut.setValue(N,"boneTexture",Kt.boneTexture,C))}U.isBatchedMesh&&(ut.setOptional(N,U,"batchingTexture"),ut.setValue(N,"batchingTexture",U._matricesTexture,C),ut.setOptional(N,U,"batchingIdTexture"),ut.setValue(N,"batchingIdTexture",U._indirectTexture,C),ut.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&ut.setValue(N,"batchingColorTexture",U._colorsTexture,C));const ar=B.morphAttributes;if((ar.position!==void 0||ar.normal!==void 0||ar.color!==void 0)&&Ae.update(U,B,rn),(Xt||Se.receiveShadow!==U.receiveShadow)&&(Se.receiveShadow=U.receiveShadow,ut.setValue(N,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(mn.envMap.value=ve,mn.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(mn.envMapIntensity.value=I.environmentIntensity),Xt&&(ut.setValue(N,"toneMappingExposure",v.toneMappingExposure),Se.needsLights&&Vh(mn,or),ee&&z.fog===!0&&oe.refreshFogUniforms(mn,ee),oe.refreshMaterialUniforms(mn,z,H,q,f.state.transmissionRenderTarget[M.id]),Rs.upload(N,Yc(Se),mn,C)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Rs.upload(N,Yc(Se),mn,C),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(N,"center",U.center),ut.setValue(N,"modelViewMatrix",U.modelViewMatrix),ut.setValue(N,"normalMatrix",U.normalMatrix),ut.setValue(N,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Kt=z.uniformsGroups;for(let kn=0,On=Kt.length;kn<On;kn++){const jc=Kt[kn];L.update(jc,rn),L.bind(jc,rn)}}return rn}function Vh(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function Wh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(M,I,B){be.get(M.texture).__webglTexture=I,be.get(M.depthTexture).__webglTexture=B;const z=be.get(M);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,I){const B=be.get(M);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,B=0){R=M,b=I,E=B;let z=!0,U=null,ee=!1,ce=!1;if(M){const ve=be.get(M);if(ve.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(N.FRAMEBUFFER,null),z=!1;else if(ve.__webglFramebuffer===void 0)C.setupRenderTarget(M);else if(ve.__hasExternalTextures)C.rebindTextures(M,be.get(M.texture).__webglTexture,be.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const xe=M.depthTexture;if(ve.__boundDepthTexture!==xe){if(xe!==null&&be.has(xe)&&(M.width!==xe.image.width||M.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(M)}}const Le=M.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ce=!0);const Ue=be.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ue[I])?U=Ue[I][B]:U=Ue[I],ee=!0):M.samples>0&&C.useMultisampledRTT(M)===!1?U=be.get(M).__webglMultisampledFramebuffer:Array.isArray(Ue)?U=Ue[B]:U=Ue,A.copy(M.viewport),O.copy(M.scissor),F=M.scissorTest}else A.copy(ge).multiplyScalar(H).floor(),O.copy(De).multiplyScalar(H).floor(),F=tt;if(Te.bindFramebuffer(N.FRAMEBUFFER,U)&&z&&Te.drawBuffers(M,U),Te.viewport(A),Te.scissor(O),Te.setScissorTest(F),ee){const ve=be.get(M.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,ve.__webglTexture,B)}else if(ce){const ve=be.get(M.texture),Le=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ve.__webglTexture,B||0,Le)}S=-1},this.readRenderTargetPixels=function(M,I,B,z,U,ee,ce){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ce!==void 0&&(_e=_e[ce]),_e){Te.bindFramebuffer(N.FRAMEBUFFER,_e);try{const ve=M.texture,Le=ve.format,Ue=ve.type;if(!Ge.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-z&&B>=0&&B<=M.height-U&&N.readPixels(I,B,z,U,ke.convert(Le),ke.convert(Ue),ee)}finally{const ve=R!==null?be.get(R).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,ve)}}},this.readRenderTargetPixelsAsync=async function(M,I,B,z,U,ee,ce){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ce!==void 0&&(_e=_e[ce]),_e){const ve=M.texture,Le=ve.format,Ue=ve.type;if(!Ge.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=M.width-z&&B>=0&&B<=M.height-U){Te.bindFramebuffer(N.FRAMEBUFFER,_e);const xe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,xe),N.bufferData(N.PIXEL_PACK_BUFFER,ee.byteLength,N.STREAM_READ),N.readPixels(I,B,z,U,ke.convert(Le),ke.convert(Ue),0);const qe=R!==null?be.get(R).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,qe);const ot=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await rp(N,ot,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,xe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ee),N.deleteBuffer(xe),N.deleteSync(ot),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,I=null,B=0){M.isTexture!==!0&&(Sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,M=arguments[1]);const z=Math.pow(2,-B),U=Math.floor(M.image.width*z),ee=Math.floor(M.image.height*z),ce=I!==null?I.x:0,_e=I!==null?I.y:0;C.setTexture2D(M,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,ce,_e,U,ee),Te.unbindTexture()},this.copyTextureToTexture=function(M,I,B=null,z=null,U=0){M.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,M=arguments[1],I=arguments[2],U=arguments[3]||0,B=null);let ee,ce,_e,ve,Le,Ue,xe,qe,ot;const dt=M.isCompressedTexture?M.mipmaps[U]:M.image;B!==null?(ee=B.max.x-B.min.x,ce=B.max.y-B.min.y,_e=B.isBox3?B.max.z-B.min.z:1,ve=B.min.x,Le=B.min.y,Ue=B.isBox3?B.min.z:0):(ee=dt.width,ce=dt.height,_e=dt.depth||1,ve=0,Le=0,Ue=0),z!==null?(xe=z.x,qe=z.y,ot=z.z):(xe=0,qe=0,ot=0);const zt=ke.convert(I.format),Ke=ke.convert(I.type);let Se;I.isData3DTexture?(C.setTexture3D(I,0),Se=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(C.setTexture2DArray(I,0),Se=N.TEXTURE_2D_ARRAY):(C.setTexture2D(I,0),Se=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const Mn=N.getParameter(N.UNPACK_ROW_LENGTH),Je=N.getParameter(N.UNPACK_IMAGE_HEIGHT),rn=N.getParameter(N.UNPACK_SKIP_PIXELS),Ei=N.getParameter(N.UNPACK_SKIP_ROWS),Xt=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,dt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,dt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ve),N.pixelStorei(N.UNPACK_SKIP_ROWS,Le),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ue);const or=M.isDataArrayTexture||M.isData3DTexture,ut=I.isDataArrayTexture||I.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const mn=be.get(M),ar=be.get(I),Kt=be.get(mn.__renderTarget),kn=be.get(ar.__renderTarget);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Kt.__webglFramebuffer),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let On=0;On<_e;On++)or&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,be.get(M).__webglTexture,U,Ue+On),M.isDepthTexture?(ut&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,be.get(I).__webglTexture,U,ot+On),N.blitFramebuffer(ve,Le,ee,ce,xe,qe,ee,ce,N.DEPTH_BUFFER_BIT,N.NEAREST)):ut?N.copyTexSubImage3D(Se,U,xe,qe,ot+On,ve,Le,ee,ce):N.copyTexSubImage2D(Se,U,xe,qe,ot+On,ve,Le,ee,ce);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ut?M.isDataTexture||M.isData3DTexture?N.texSubImage3D(Se,U,xe,qe,ot,ee,ce,_e,zt,Ke,dt.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Se,U,xe,qe,ot,ee,ce,_e,zt,dt.data):N.texSubImage3D(Se,U,xe,qe,ot,ee,ce,_e,zt,Ke,dt):M.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,xe,qe,ee,ce,zt,Ke,dt.data):M.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,xe,qe,dt.width,dt.height,zt,dt.data):N.texSubImage2D(N.TEXTURE_2D,U,xe,qe,ee,ce,zt,Ke,dt);N.pixelStorei(N.UNPACK_ROW_LENGTH,Mn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Je),N.pixelStorei(N.UNPACK_SKIP_PIXELS,rn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ei),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Xt),U===0&&I.generateMipmaps&&N.generateMipmap(Se),Te.unbindTexture()},this.copyTextureToTexture3D=function(M,I,B=null,z=null,U=0){return M.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,M=arguments[2],I=arguments[3],U=arguments[4]||0),Sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,I,B,z,U)},this.initRenderTarget=function(M){be.get(M).__webglFramebuffer===void 0&&C.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?C.setTextureCube(M,0):M.isData3DTexture?C.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?C.setTexture2DArray(M,0):C.setTexture2D(M,0),Te.unbindTexture()},this.resetState=function(){b=0,E=0,R=null,Te.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class Tc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Re(e),this.near=t,this.far=i}clone(){return new Tc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bu extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Nn extends pn{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const d=[],u=[],h=[],p=[];let g=0;const _=[],m=i/2;let f=0;w(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new bt(u,3)),this.setAttribute("normal",new bt(h,3)),this.setAttribute("uv",new bt(p,2));function w(){const v=new D,P=new D;let b=0;const E=(t-e)/i;for(let R=0;R<=s;R++){const S=[],y=R/s,A=y*(t-e)+e;for(let O=0;O<=r;O++){const F=O/r,V=F*c+a,X=Math.sin(V),W=Math.cos(V);P.x=A*X,P.y=-y*i+m,P.z=A*W,u.push(P.x,P.y,P.z),v.set(X,E,W).normalize(),h.push(v.x,v.y,v.z),p.push(F,1-y),S.push(g++)}_.push(S)}for(let R=0;R<r;R++)for(let S=0;S<s;S++){const y=_[S][R],A=_[S+1][R],O=_[S+1][R+1],F=_[S][R+1];(e>0||S!==0)&&(d.push(y,A,F),b+=3),(t>0||S!==s-1)&&(d.push(A,O,F),b+=3)}l.addGroup(f,b,0),f+=b}function T(v){const P=g,b=new Ye,E=new D;let R=0;const S=v===!0?e:t,y=v===!0?1:-1;for(let O=1;O<=r;O++)u.push(0,m*y,0),h.push(0,y,0),p.push(.5,.5),g++;const A=g;for(let O=0;O<=r;O++){const V=O/r*c+a,X=Math.cos(V),W=Math.sin(V);E.x=S*W,E.y=m*y,E.z=S*X,u.push(E.x,E.y,E.z),h.push(0,y,0),b.x=X*.5+.5,b.y=W*.5*y+.5,p.push(b.x,b.y),g++}for(let O=0;O<r;O++){const F=P+O,V=A+O;v===!0?d.push(V,V+1,F):d.push(V+1,V,F),R+=3}l.addGroup(f,R,v===!0?1:2),f+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cc extends Nn{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Cc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wc extends pn{constructor(e=.5,t=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],c=[],l=[],d=[];let u=e;const h=(t-e)/r,p=new D,g=new Ye;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const f=s+m/i*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let _=0;_<r;_++){const m=_*(i+1);for(let f=0;f<i;f++){const w=f+m,T=w,v=w+i+1,P=w+i+2,b=w+1;a.push(T,v,b),a.push(v,P,b)}}this.setIndex(a),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(l,3)),this.setAttribute("uv",new bt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class yi extends pn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const d=[],u=new D,h=new D,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const w=[],T=f/i;let v=0;f===0&&o===0?v=.5/t:f===i&&c===Math.PI&&(v=-.5/t);for(let P=0;P<=t;P++){const b=P/t;u.x=-e*Math.cos(r+b*s)*Math.sin(o+T*a),u.y=e*Math.cos(o+T*a),u.z=e*Math.sin(r+b*s)*Math.sin(o+T*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),_.push(h.x,h.y,h.z),m.push(b+v,1-T),w.push(l++)}d.push(w)}for(let f=0;f<i;f++)for(let w=0;w<t;w++){const T=d[f][w+1],v=d[f][w],P=d[f+1][w],b=d[f+1][w+1];(f!==0||o>0)&&p.push(T,v,b),(f!==i-1||c<Math.PI)&&p.push(v,P,b)}this.setIndex(p),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(_,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ac extends pn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],c=[],l=[],d=new D,u=new D,h=new D;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),h.subVectors(u,d).normalize(),c.push(h.x,h.y,h.z),l.push(g/r),l.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,f=(r+1)*(p-1)+g,w=(r+1)*p+g;o.push(_,m,w),o.push(m,f,w)}this.setIndex(o),this.setAttribute("position",new bt(a,3)),this.setAttribute("normal",new bt(c,3)),this.setAttribute("uv",new bt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ac(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ze extends Hr{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yu,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rc extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class _v extends Rc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Uo=new ft,jl=new D,Zl=new D;class zu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bc,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;jl.setFromMatrixPosition(e.matrixWorld),t.position.copy(jl),Zl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zl),t.updateMatrixWorld(),Uo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Uo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Kl=new ft,mr=new D,No=new D;class vv extends zu{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ye(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),mr.setFromMatrixPosition(e.matrixWorld),i.position.copy(mr),No.copy(i.position),No.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(No),i.updateMatrixWorld(),r.makeTranslation(-mr.x,-mr.y,-mr.z),Kl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kl)}}class xv extends Rc{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new vv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class yv extends zu{constructor(){super(new Iu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fo extends Rc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new yv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mc);const Ps={yaw:0,pitch:.12};let us=!1,ko=0,Oo=0;const Jl=.004,Sv=-.35,Mv=.55;function Ql(){return Ps}function bv(n){n&&(n.addEventListener("mousedown",e=>{e.button===0&&e.target===n&&(us=!0,ko=e.clientX,Oo=e.clientY,e.preventDefault())}),window.addEventListener("mousemove",e=>{if(!us)return;const t=e.clientX-ko,i=e.clientY-Oo;ko=e.clientX,Oo=e.clientY,Ps.yaw-=t*Jl,Ps.pitch=Math.max(Sv,Math.min(Mv,Ps.pitch-i*Jl))}),window.addEventListener("mouseup",e=>{e.button===0&&(us=!1)}),window.addEventListener("blur",()=>{us=!1}))}const wt=108;function Ev(n){return new ze({color:new Re().setHSL(n,.15,.35+Math.random()*.15),roughness:.75,metalness:.08})}function Tv(){return new ze({color:8961006,emissive:2241348,emissiveIntensity:.35,roughness:.2,metalness:.4})}function hs(n,e,t,i=0){const r=new _t;r.name="city-gateway";const s=new ze({color:9147032,roughness:.82,metalness:.12}),o=new ze({color:12963284,roughness:.55,metalness:.25}),a=32,c=7,l=42,d=8;for(const g of[-l/2+c/2,l/2-c/2]){const _=new me(new ct(c,a,d),s);_.position.set(g,a/2,0),_.castShadow=!0,r.add(_);const m=new me(new ct(c+1.2,2.5,d+1),o);m.position.set(g,a+1.2,0),r.add(m)}const u=new me(new ct(l,5,d+1.5),s);u.position.set(0,a-1.5,0),u.castShadow=!0,r.add(u);const h=new me(new ct(l+6,4,d+2),o);h.position.set(0,a+3,0),r.add(h);const p=new me(new ct(l*.55,3.5,.4),new ze({color:2278750,emissive:1332013,emissiveIntensity:.35}));p.position.set(0,a+3,d/2+.3),r.add(p),e||(r.rotation.y=Math.PI/2),r.position.set(i,0,t),n.add(r)}function Cv(n){const e=new _t;e.name="city";const t=[],i=new me(new In(wt*2,wt*2),new ze({color:"#2e3238",roughness:.78,metalness:.18}));i.rotation.x=-Math.PI/2,i.position.y=.04,i.receiveShadow=!0,e.add(i);const r=new me(new wc(wt-4,wt,64),new ze({color:"#6b7280",roughness:.85}));r.rotation.x=-Math.PI/2,r.position.y=.03,e.add(r);for(let u=-5;u<=5;u++){const h=new me(new In(wt*2,.35),new ze({color:"#d4d4d8"}));h.rotation.x=-Math.PI/2,h.position.set(0,.02,u*18),e.add(h);const p=h.clone();p.rotation.z=Math.PI/2,p.position.set(u*18,.02,0),e.add(p)}const o=(u=>{let h=u;return()=>(h=(h*16807+0)%2147483647,(h-1)/2147483646)})(42);for(let u=-5;u<=5;u++)for(let h=-5;h<=5;h++){if(u===0&&h===0)continue;const p=u*20+(o()-.5)*5,g=h*20+(o()-.5)*5;if(Math.abs(p)<10&&Math.abs(g)<10||Math.abs(p)>wt-18||Math.abs(g)>wt-18)continue;const _=8+o()*8,m=8+o()*8,f=8+o()*28,w=.55+o()*.12,T=new me(new ct(_,f,m),Ev(w));T.position.set(p,f/2,g),T.castShadow=!0,T.receiveShadow=!0,e.add(T);const v=new me(new ct(_+1.2,.22,m+1.2),new ze({color:"#6b7280",roughness:.85}));v.position.set(p,.11,g),v.receiveShadow=!0,e.add(v);const P=Math.floor(f/2.5),b=Math.floor(_/2.2);for(let E=0;E<P;E++)for(let R=0;R<b;R++){if(o()>.72)continue;const S=new me(new In(1.1,1.4),Tv());S.position.set(p-_/2+1.2+R*2.2,1.5+E*2.5,g+m/2+.06),e.add(S)}t.push({minX:p-_/2,maxX:p+_/2,minZ:g-m/2,maxZ:g+m/2,mesh:T})}const a=wt-22,c=wt-22;hs(e,!0,a,0),hs(e,!0,-a,0),hs(e,!1,0,c),hs(e,!1,0,-c),n.add(e);function l(u,h){if(Math.abs(u)>wt||Math.abs(h)>wt)return null;const p=1.15,g=2.25;for(const _ of t)if(u+p>_.minX&&u-p<_.maxX&&h+g>_.minZ&&h-g<_.maxZ)return _;return null}function d(u,h){return Math.abs(u)<=wt&&Math.abs(h)<=wt}return{group:e,colliders:t,checkCarCollision:l,isInCity:d,worldHalf:wt}}const ht=96,fs=4,Ga=6;function Bo(n,e){return Math.abs(n)<wt+Ga&&Math.abs(e)<wt+Ga}function wv(n,e){const t=n*ht,i=t+ht,r=e*ht,s=r+ht,o=wt+Ga;return t>=-o&&i<=o&&r>=-o&&s<=o}function Av(n,e){return(n*73856093^e*19349663)>>>0}function Rv(n){let e=n;return()=>(e=e*1664525+1013904223>>>0,e/4294967295)}function Pv(){const n=new _t,e=new me(new Nn(.18,.28,2.2,8),new ze({color:4863264,roughness:.9}));e.position.y=1.1,e.castShadow=!0;const t=new me(new Cc(1.4+Math.random()*.8,3.5+Math.random(),8),new ze({color:2976562,roughness:.88}));return t.position.y=3.2,t.castShadow=!0,n.add(e,t),n}function Lv(){const n=new me(new yi(.55+Math.random()*.35,8,8),new ze({color:3832382,roughness:.92}));return n.scale.y=.65,n.position.y=.35,n.castShadow=!0,n}function Dv(n,e,t){const i=new _t,r=n*ht+ht*.5,s=e*ht+ht*.5,o=(t()-.5)*ht*.6,a=(t()-.5)*ht*.6,c=8+t()*14,l=new me(new yi(c,12,10),new ze({color:4165444,roughness:.95}));return l.scale.y=.22+t()*.15,l.position.set(r+o,c*l.scale.y*.35,s+a),l.receiveShadow=!0,l.castShadow=!0,i.add(l),i}function Iv(n,e){const t=new _t;t.name=`chunk_${n}_${e}`;const i=Rv(Av(n,e)),r=n*ht,s=e*ht,o=[4037442,4565066,3575610,4894032],a=new me(new In(ht,ht,12,12),new ze({color:o[Math.abs(n+e)%o.length],roughness:.94,metalness:.02}));a.rotation.x=-Math.PI/2;const c=a.geometry.attributes.position;for(let u=0;u<c.count;u++){const h=c.getX(u)+r+ht*.5,p=c.getZ(u)+s+ht*.5,g=Math.sin(h*.04)*Math.cos(p*.035)*.35,_=Math.sin(h*.12+p*.08)*.15;c.setY(u,g+_)}c.needsUpdate=!0,a.geometry.computeVertexNormals(),a.position.set(r+ht*.5,-.12,s+ht*.5),a.receiveShadow=!0,t.add(a);const l=4+Math.floor(i()*8);for(let u=0;u<l;u++){const h=r+i()*ht,p=s+i()*ht;if(Bo(h,p))continue;const g=Pv();g.position.set(h,0,p),g.rotation.y=i()*Math.PI*2,t.add(g)}const d=6+Math.floor(i()*10);for(let u=0;u<d;u++){const h=r+i()*ht,p=s+i()*ht;if(Bo(h,p))continue;const g=Lv();g.position.set(h,0,p),t.add(g)}if(i()>.45){const u=Dv(n,e,i),h=u.children[0];h&&!Bo(h.position.x,h.position.z)&&t.add(u)}return t}function Uv(n){const e=new _t;e.name="countryside",n.add(e);const t=new Map;function i(o,a){return`${o},${a}`}function r(o){const a=t.get(o);a&&(e.remove(a),a.traverse(c=>{var l;c.isMesh&&((l=c.geometry)==null||l.dispose(),c.material&&!Array.isArray(c.material)&&c.material.dispose())}),t.delete(o))}function s(o,a){const c=Math.floor(o/ht),l=Math.floor(a/ht),d=new Set;for(let u=-fs;u<=fs;u++)for(let h=-fs;h<=fs;h++){const p=c+u,g=l+h;if(wv(p,g))continue;const _=i(p,g);if(d.add(_),!t.has(_)){const m=Iv(p,g);t.set(_,m),e.add(m)}}for(const u of t.keys())d.has(u)||r(u)}return{group:e,update:s}}class Nv extends Bu{constructor(){super();const e=new ct;e.deleteAttribute("uv");const t=new ze({side:Ot}),i=new ze,r=new xv(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new me(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new me(e,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new me(e,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new me(e,i);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new me(e,i);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const d=new me(e,i);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const u=new me(e,i);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const h=new me(e,Bi(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const p=new me(e,Bi(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new me(e,Bi(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new me(e,Bi(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const m=new me(e,Bi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const f=new me(e,Bi(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Bi(n){const e=new Ks;return e.color.setScalar(n),e}function Fv(n=document.body){const e=new gv({antialias:!0});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(window.innerWidth,window.innerHeight),e.shadowMap.enabled=!0,e.shadowMap.type=ou,e.toneMapping=cu,e.toneMappingExposure=1.05,e.outputColorSpace=qt,e.domElement.id="world-canvas",e.domElement.style.display="none",e.domElement.style.position="fixed",e.domElement.style.inset="0",n.appendChild(e.domElement);const t=new Bu;t.background=new Re("#87c4a8"),t.fog=new Tc("#9ec8a8",80,320);const i=new za(e),r=i.fromScene(new Nv,.04).texture;t.environment=r,i.dispose();const s=new jt(52,window.innerWidth/window.innerHeight,.1,800),o=new _v("#dce8ff","#3d4a5c",.55);t.add(o);const a=new Fo("#fff8ee",1.45);a.position.set(30,48,18),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-120,a.shadow.camera.right=120,a.shadow.camera.top=120,a.shadow.camera.bottom=-120,a.shadow.bias=-15e-5,a.shadow.normalBias=.02,t.add(a);const c=new Fo("#a8b8d0",.35);c.position.set(-22,18,-14),t.add(c);const l=new Fo("#ffeedd",.25);l.position.set(-10,8,30),t.add(l);const d=Cv(t),u=Uv(t);u.update(0,0);const h={x:0,z:0,lookY:1.05};let p=0;const g=14,_=9;function m(){const R=window.innerWidth,S=window.innerHeight;s.aspect=R/S,s.updateProjectionMatrix(),e.setSize(R,S)}window.addEventListener("resize",m);function f(R,S,y=0){const A=Ql(),O=y+p+A.yaw,F=A.pitch,V=Math.cos(F)*g,X=R-Math.sin(O)*V,W=S-Math.cos(O)*V,q=_+Math.sin(F)*g*.45;s.position.set(X,q,W),s.lookAt(R,1.2+F*1.5,S)}function w(R,S,y,A=0){h.x+=(R-h.x)*.14,h.z+=(S-h.z)*.14,h.lookY+=(1.05-h.lookY)*.1;const O=Ql(),F=9.5,V=4.6,X=y+O.yaw,W=O.pitch,q=Math.cos(W)*F,H=A>0?(Math.random()-.5)*A*.28:0,te=A>0?(Math.random()-.5)*A*.2:0,re=h.x-Math.sin(X)*q+H,ge=h.z-Math.cos(X)*q+H*.4,De=V+Math.sin(W)*F*.32+te;s.position.set(re,De,ge),s.lookAt(h.x,h.lookY+te*.25,h.z)}function T(){e.domElement.style.display="block"}function v(){e.domElement.style.display="none"}function P(){e.render(t,s)}function b(R,S){return{x:Math.max(-5e5,Math.min(5e5,R)),z:Math.max(-5e5,Math.min(5e5,S))}}function E(R,S){u.update(R,S);const y=d.isInCity(R,S);t.background.set(y?"#87a8c4":"#8fd498"),t.fog&&(t.fog.color.set(y?"#9eb4c8":"#a8dcb0"),t.fog.near=y?80:100,t.fog.far=y?280:420)}return{scene:t,camera:s,renderer:e,city:d,countryside:u,envTex:r,show:T,hide:v,resize:m,render:P,updateCamera:f,updateDrivingCamera:w,updateWorld:E,clampPosition:b,worldHalf:d.worldHalf}}const Va=15251594,kv=3900150,ed=1981066,td=1516884;function Xs(n,e=.55){return new ze({color:n,roughness:e,metalness:.05})}function Wa(n,e,t){const i=new Nn(e,e*.95,n,10);i.translate(0,-n/2,0);const r=new me(i,Xs(t));return r.castShadow=!0,r}function Xa(n,e){const t=new me(new yi(n,10,10),Xs(e));return t.castShadow=!0,t}function ps(n,e,t,i,r){const s=new _t,o=Wa(n,e,r[0]);s.add(o);const a=new _t;a.position.y=-n;const c=Wa(t,i,r[1]);a.add(c);const l=Xa(i*.85,Va);return l.position.y=-t,a.add(l),s.add(a),{root:s,knee:a}}function Ov(n){const e=new Re(n);return e.multiplyScalar(.75),e.getHex()}function Hu(n=0,e=0,t=kv){const i=Ov(t),r=new _t,s=new me(new Nn(.42,.48,1.35,14),Xs(t));s.position.y=1.35,s.castShadow=!0,r.add(s);const o=Wa(.22,.14,Va);o.position.y=2.05,r.add(o);const a=new me(new yi(.38,16,16),Xs(Va,.48));a.position.y=2.45,a.castShadow=!0,r.add(a);const c=1.95,l=.72,d=.48,u=.28,h=ps(.42,.13,.38,.11,[t,i]);h.root.position.set(-d,c,0),r.add(h.root);const p=Xa(.14,t);p.position.set(-d,c,0),r.add(p);const g=ps(.42,.13,.38,.11,[i,t]);g.root.position.set(d,c,0),r.add(g.root);const _=Xa(.14,t);_.position.set(d,c,0),r.add(_);const m=ps(.48,.15,.44,.13,[td,ed]);m.root.position.set(-u,l,0),r.add(m.root);const f=ps(.48,.15,.44,.13,[ed,td]);return f.root.position.set(u,l,0),r.add(f.root),r.position.set(n,0,e),{x:n,z:e,facing:0,walkPhase:0,isMoving:!1,inVehicle:null,mesh:r,limbs:{armL:h,armR:g,legL:m,legR:f}}}function Bv(n,e,t,i){const r=Math.hypot(e,t);n.isMoving=r>.01,n.isMoving&&(n.facing=Math.atan2(-e,-t),n.walkPhase+=i*10.5)}function tr(n){const{mesh:e,limbs:t,walkPhase:i,isMoving:r,facing:s}=n;e.position.set(n.x,0,n.z),e.rotation.y=s;const o=r?Math.sin(i):0,a=o*.55,c=o*.42,l=r?.35+Math.max(0,Math.sin(i+.5))*.9:.15,d=r?.35+Math.max(0,Math.sin(i+Math.PI+.5))*.9:.15,u=r?.25+Math.abs(Math.sin(i+Math.PI))*.45:.1,h=r?.25+Math.abs(Math.sin(i))*.45:.1;t.legL.root.rotation.x=a,t.legR.root.rotation.x=-a,t.legL.knee.rotation.x=l,t.legR.knee.rotation.x=d,t.armL.root.rotation.x=-c,t.armR.root.rotation.x=c,t.armL.knee.rotation.x=-u,t.armR.knee.rotation.x=-h;const p=r?Math.abs(Math.sin(i*2))*.06:0;e.position.y=p}function zv(n,e){n.add(e.mesh)}const nd=[{id:"cybertruck",name:"Tesla Cybertruck",year:2024,maker:"Tesla",style:"cybertruck",color:12107204},{id:"model-t",name:"Ford Model T",year:1908,maker:"Ford",style:"vintage",color:1710618},{id:"model-a",name:"Ford Model A",year:1927,maker:"Ford",style:"vintage",color:2969622},{id:"beetle",name:"Volkswagen Beetle",year:1938,maker:"Volkswagen",style:"compact",color:4886745},{id:"jeep-willys",name:"Willys Jeep",year:1941,maker:"Willys",style:"suv",color:4873530},{id:"cadillac-62",name:"Cadillac Series 62",year:1948,maker:"Cadillac",style:"sedan",color:1842204},{id:"mg-td",name:"MG TD",year:1949,maker:"MG",style:"sports",color:9109504},{id:"citroen-2cv",name:"Citroën 2CV",year:1949,maker:"Citroën",style:"compact",color:7048739},{id:"chevy-bel-air",name:"Chevrolet Bel Air",year:1955,maker:"Chevrolet",style:"sedan",color:2003199},{id:"ford-thunderbird",name:"Ford Thunderbird",year:1955,maker:"Ford",style:"sports",color:16777215},{id:"mercedes-300sl",name:"Mercedes-Benz 300 SL",year:1954,maker:"Mercedes-Benz",style:"sports",color:12632256},{id:"mini-cooper",name:"Mini Cooper",year:1959,maker:"Austin",style:"compact",color:11674146},{id:"jaguar-e-type",name:"Jaguar E-Type",year:1961,maker:"Jaguar",style:"sports",color:25600},{id:"vw-bus",name:"Volkswagen Type 2 Bus",year:1962,maker:"Volkswagen",style:"van",color:14329120},{id:"porsche-911",name:"Porsche 911",year:1964,maker:"Porsche",style:"sports",color:9127187},{id:"ford-mustang",name:"Ford Mustang",year:1964,maker:"Ford",style:"sports",color:13369344},{id:"lamborghini-miura",name:"Lamborghini Miura",year:1966,maker:"Lamborghini",style:"sports",color:16766720},{id:"camaro",name:"Chevrolet Camaro",year:1966,maker:"Chevrolet",style:"sports",color:16747520},{id:"corvette-stingray",name:"Chevrolet Corvette Stingray",year:1968,maker:"Chevrolet",style:"sports",color:128},{id:"datsun-240z",name:"Datsun 240Z",year:1969,maker:"Datsun",style:"sports",color:12092939},{id:"citroen-ds",name:"Citroën DS",year:1955,maker:"Citroën",style:"sedan",color:3100495},{id:"lancia-stratos",name:"Lancia Stratos",year:1973,maker:"Lancia",style:"sports",color:16777215},{id:"ferrari-308",name:"Ferrari 308 GTB",year:1975,maker:"Ferrari",style:"sports",color:16711680},{id:"bmw-2002",name:"BMW 2002",year:1968,maker:"BMW",style:"sedan",color:1710638},{id:"delorean",name:"DeLorean DMC-12",year:1981,maker:"DeLorean",style:"sports",color:12632256},{id:"honda-civic",name:"Honda Civic",year:1972,maker:"Honda",style:"compact",color:4620980},{id:"toyota-corolla",name:"Toyota Corolla",year:1966,maker:"Toyota",style:"compact",color:13882323},{id:"land-cruiser",name:"Toyota Land Cruiser",year:1951,maker:"Toyota",style:"suv",color:5597999},{id:"range-rover",name:"Range Rover Classic",year:1970,maker:"Land Rover",style:"suv",color:3050327},{id:"mercedes-g",name:"Mercedes-Benz G-Class",year:1979,maker:"Mercedes-Benz",style:"suv",color:0},{id:"bmw-m3-e30",name:"BMW M3 E30",year:1986,maker:"BMW",style:"sports",color:205},{id:"mazda-miata",name:"Mazda MX-5 Miata",year:1989,maker:"Mazda",style:"sports",color:14423100},{id:"honda-nsx",name:"Honda NSX",year:1990,maker:"Honda",style:"sports",color:16711680},{id:"mclaren-f1",name:"McLaren F1",year:1992,maker:"McLaren",style:"sports",color:16766720},{id:"subaru-impreza",name:"Subaru Impreza WRX",year:1992,maker:"Subaru",style:"sedan",color:139},{id:"toyota-supra",name:"Toyota Supra MK4",year:1993,maker:"Toyota",style:"sports",color:16753920},{id:"dodge-viper",name:"Dodge Viper",year:1992,maker:"Dodge",style:"sports",color:9109504},{id:"hummer-h1",name:"Hummer H1",year:1992,maker:"AM General",style:"suv",color:4017967},{id:"ford-f150",name:"Ford F-150",year:1975,maker:"Ford",style:"truck",color:1722154},{id:"chevy-silverado",name:"Chevrolet Silverado",year:1998,maker:"Chevrolet",style:"truck",color:3100495},{id:"dodge-ram",name:"Ram 1500",year:1981,maker:"Ram",style:"truck",color:0},{id:"tesla-roadster",name:"Tesla Roadster",year:2008,maker:"Tesla",style:"sports",color:11674146},{id:"tesla-model-s",name:"Tesla Model S",year:2012,maker:"Tesla",style:"sedan",color:1842204},{id:"tesla-model-3",name:"Tesla Model 3",year:2017,maker:"Tesla",style:"sedan",color:3100495},{id:"tesla-model-x",name:"Tesla Model X",year:2015,maker:"Tesla",style:"suv",color:1644912},{id:"tesla-model-y",name:"Tesla Model Y",year:2020,maker:"Tesla",style:"suv",color:4620980},{id:"rivian-r1t",name:"Rivian R1T",year:2021,maker:"Rivian",style:"truck",color:5597999},{id:"lucid-air",name:"Lucid Air",year:2021,maker:"Lucid",style:"sedan",color:15263976},{id:"bugatti-chiron",name:"Bugatti Chiron",year:2016,maker:"Bugatti",style:"sports",color:139},{id:"koenigsegg-jesko",name:"Koenigsegg Jesko",year:2019,maker:"Koenigsegg",style:"sports",color:16777215},{id:"porsche-taycan",name:"Porsche Taycan",year:2019,maker:"Porsche",style:"sports",color:3100495},{id:"ford-gt",name:"Ford GT",year:2005,maker:"Ford",style:"sports",color:255},{id:"rolls-phantom",name:"Rolls-Royce Phantom",year:2003,maker:"Rolls-Royce",style:"sedan",color:1710618},{id:"bentley-continental",name:"Bentley Continental GT",year:2003,maker:"Bentley",style:"sports",color:25600},{id:"aston-db5",name:"Aston Martin DB5",year:1963,maker:"Aston Martin",style:"sports",color:12632256},{id:"lamborghini-aventador",name:"Lamborghini Aventador",year:2011,maker:"Lamborghini",style:"sports",color:16729344},{id:"ferrari-laferrari",name:"Ferrari LaFerrari",year:2013,maker:"Ferrari",style:"sports",color:16711680},{id:"pagani-huayra",name:"Pagani Huayra",year:2011,maker:"Pagani",style:"sports",color:7372944},{id:"jeep-wrangler",name:"Jeep Wrangler",year:1986,maker:"Jeep",style:"suv",color:9419919},{id:"ford-bronco",name:"Ford Bronco",year:1966,maker:"Ford",style:"suv",color:13468991},{id:"toyota-hilux",name:"Toyota Hilux",year:1968,maker:"Toyota",style:"truck",color:16777215},{id:"nissan-gtr",name:"Nissan GT-R",year:2007,maker:"Nissan",style:"sports",color:12632256},{id:"audi-quattro",name:"Audi Quattro",year:1980,maker:"Audi",style:"sports",color:16777215},{id:"volvo-240",name:"Volvo 240",year:1974,maker:"Volvo",style:"sedan",color:9139029},{id:"saab-900",name:"Saab 900 Turbo",year:1978,maker:"Saab",style:"sedan",color:3100495},{id:"peugeot-205",name:"Peugeot 205 GTI",year:1984,maker:"Peugeot",style:"compact",color:16711680},{id:"fiat-500",name:"Fiat 500",year:1957,maker:"Fiat",style:"compact",color:8900331},{id:"alfa-giulia",name:"Alfa Romeo Giulia",year:1962,maker:"Alfa Romeo",style:"sedan",color:9109504},{id:"maserati-ghibli",name:"Maserati Ghibli",year:1967,maker:"Maserati",style:"sports",color:1710618},{id:"plymouth-barracuda",name:"Plymouth Barracuda",year:1964,maker:"Plymouth",style:"sports",color:4915330},{id:"dodge-charger",name:"Dodge Charger",year:1966,maker:"Dodge",style:"sedan",color:0},{id:"chevy-impala",name:"Chevrolet Impala",year:1958,maker:"Chevrolet",style:"sedan",color:16777215},{id:"cadillac-escalade",name:"Cadillac Escalade",year:1999,maker:"Cadillac",style:"suv",color:1710618},{id:"lincoln-navigator",name:"Lincoln Navigator",year:1997,maker:"Lincoln",style:"suv",color:3092271},{id:"toyota-prius",name:"Toyota Prius",year:1997,maker:"Toyota",style:"compact",color:4620980},{id:"honda-accord",name:"Honda Accord",year:1976,maker:"Honda",style:"sedan",color:6908265},{id:"hyundai-ioniq5",name:"Hyundai Ioniq 5",year:2021,maker:"Hyundai",style:"suv",color:13882323},{id:"kia-ev6",name:"Kia EV6",year:2021,maker:"Kia",style:"suv",color:3100495},{id:"ford-mach-e",name:"Ford Mustang Mach-E",year:2020,maker:"Ford",style:"suv",color:9109504},{id:"chevy-bolt",name:"Chevrolet Bolt EV",year:2016,maker:"Chevrolet",style:"compact",color:4286945},{id:"bmw-i4",name:"BMW i4",year:2021,maker:"BMW",style:"sedan",color:1710638},{id:"mercedes-eqs",name:"Mercedes-Benz EQS",year:2021,maker:"Mercedes-Benz",style:"sedan",color:0},{id:"genesis-gv80",name:"Genesis GV80",year:2020,maker:"Genesis",style:"suv",color:3100495},{id:"polestar-2",name:"Polestar 2",year:2020,maker:"Polestar",style:"sedan",color:7372944},{id:"vinfast-vf8",name:"VinFast VF8",year:2022,maker:"VinFast",style:"suv",color:4620980},{id:"byd-han",name:"BYD Han",year:2020,maker:"BYD",style:"sedan",color:1710618},{id:"nio-et7",name:"NIO ET7",year:2021,maker:"NIO",style:"sedan",color:3100495},{id:"xpeng-p7",name:"XPeng P7",year:2020,maker:"XPeng",style:"sedan",color:7833753},{id:"renault-5-ev",name:"Renault 5 E-Tech",year:2024,maker:"Renault",style:"compact",color:16766720},{id:"vw-id4",name:"Volkswagen ID.4",year:2020,maker:"Volkswagen",style:"suv",color:3050327},{id:"skoda-enyaq",name:"Škoda Enyaq",year:2020,maker:"Škoda",style:"suv",color:5597999},{id:"seat-leon",name:"SEAT León",year:1999,maker:"SEAT",style:"compact",color:16737095},{id:"opel-gt",name:"Opel GT",year:1968,maker:"Opel",style:"sports",color:16766720},{id:"triumph-spitfire",name:"Triumph Spitfire",year:1962,maker:"Triumph",style:"sports",color:25600},{id:"lotus-elise",name:"Lotus Elise",year:1996,maker:"Lotus",style:"sports",color:16766720},{id:"caterham-7",name:"Caterham Seven",year:1973,maker:"Caterham",style:"sports",color:16776960},{id:"shelby-cobra",name:"Shelby Cobra",year:1962,maker:"Shelby",style:"sports",color:255},{id:"ford-gt40",name:"Ford GT40",year:1964,maker:"Ford",style:"sports",color:255},{id:"porsche-917",name:"Porsche 917",year:1969,maker:"Porsche",style:"sports",color:16766720},{id:"ferrari-250gto",name:"Ferrari 250 GTO",year:1962,maker:"Ferrari",style:"sports",color:16711680},{id:"bugatti-type57",name:"Bugatti Type 57",year:1934,maker:"Bugatti",style:"vintage",color:1710618},{id:"rolls-silver-ghost",name:"Rolls-Royce Silver Ghost",year:1906,maker:"Rolls-Royce",style:"vintage",color:3100495},{id:"packard-eight",name:"Packard Eight",year:1924,maker:"Packard",style:"vintage",color:1710618},{id:"tucker-48",name:"Tucker 48",year:1948,maker:"Tucker",style:"sedan",color:9109504},{id:"studebaker-avanti",name:"Studebaker Avanti",year:1962,maker:"Studebaker",style:"sports",color:9127187},{id:"amc-gremlin",name:"AMC Gremlin",year:1970,maker:"AMC",style:"compact",color:2263842},{id:"pontiac-firebird",name:"Pontiac Firebird",year:1967,maker:"Pontiac",style:"sports",color:16729344},{id:"buick-riviera",name:"Buick Riviera",year:1963,maker:"Buick",style:"sedan",color:128},{id:"oldsmobile-442",name:"Oldsmobile 442",year:1964,maker:"Oldsmobile",style:"sedan",color:9109504},{id:"isuzu-trooper",name:"Isuzu Trooper",year:1981,maker:"Isuzu",style:"suv",color:5597999},{id:"mitsubishi-pajero",name:"Mitsubishi Pajero",year:1981,maker:"Mitsubishi",style:"suv",color:9127187},{id:"suzuki-jimny",name:"Suzuki Jimny",year:1970,maker:"Suzuki",style:"suv",color:3050327},{id:"daihatsu-copen",name:"Daihatsu Copen",year:2002,maker:"Daihatsu",style:"compact",color:16738740},{id:"proton-saga",name:"Proton Saga",year:1985,maker:"Proton",style:"compact",color:12632256},{id:"tata-nano",name:"Tata Nano",year:2008,maker:"Tata",style:"compact",color:16766720},{id:"mahindra-thar",name:"Mahindra Thar",year:2010,maker:"Mahindra",style:"suv",color:9109504},{id:"lada-niva",name:"Lada Niva",year:1977,maker:"Lada",style:"suv",color:3050327},{id:"uaz-469",name:"UAZ-469",year:1972,maker:"UAZ",style:"suv",color:5597999},{id:"zastava-yugo",name:"Zastava Yugo",year:1980,maker:"Zastava",style:"compact",color:16711680},{id:"trabant",name:"Trabant 601",year:1964,maker:"Trabant",style:"compact",color:8900331},{id:"wartburg-353",name:"Wartburg 353",year:1966,maker:"Wartburg",style:"sedan",color:9127187},{id:"skoda-favorit",name:"Škoda Favorit",year:1987,maker:"Škoda",style:"compact",color:13882323},{id:"dacia-logan",name:"Dacia Logan",year:2004,maker:"Dacia",style:"sedan",color:4620980},{id:"geely-coolray",name:"Geely Coolray",year:2019,maker:"Geely",style:"suv",color:1710618},{id:"great-wall-haval",name:"Haval H6",year:2011,maker:"Haval",style:"suv",color:3100495},{id:"chery-tiggo",name:"Chery Tiggo",year:2005,maker:"Chery",style:"suv",color:7372944}];let At=null,ms=null;function id(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function Hv(n){ms=n;const e=document.createElement("button");e.type="button",e.id="garage-box",e.className="garage-box",e.title="Open car garage",e.innerHTML=`
    <img src="./cybertruck.svg" alt="Tesla Cybertruck" width="120" height="72" />
    <span class="garage-label">GARAGE</span>
  `,e.addEventListener("click",()=>Gu()),document.body.appendChild(e),At=document.createElement("div"),At.id="car-garage",At.innerHTML=`
    <div class="garage-panel">
      <header class="garage-header">
        <h1>Every car in the world</h1>
        <p>Click a car to spawn it — you jump into the driver seat.</p>
        <input type="search" class="garage-search" id="garage-search" placeholder="Search cars..." />
      </header>
      <div class="garage-grid" id="garage-grid"></div>
      <button type="button" class="garage-close" id="garage-close">Close</button>
    </div>
  `,document.body.appendChild(At);const t=At.querySelector("#garage-grid");for(const i of nd){const r=document.createElement("button");r.type="button",r.className="garage-car",r.dataset.id=i.id,r.dataset.search=`${i.name} ${i.maker} ${i.year}`.toLowerCase(),r.innerHTML=`
      <span class="garage-car-year">${i.year}</span>
      <span class="garage-car-name">${id(i.name)}</span>
      <span class="garage-car-maker">${id(i.maker)}</span>
    `,r.addEventListener("click",()=>{const s=nd.find(o=>o.id===i.id);s&&(rd(),ms==null||ms(s))}),t.appendChild(r)}return At.querySelector("#garage-close").addEventListener("click",rd),At.querySelector("#garage-search").addEventListener("input",i=>{const r=i.target.value.trim().toLowerCase();t.querySelectorAll(".garage-car").forEach(s=>{s.hidden=r.length>0&&!s.dataset.search.includes(r)})}),{box:e,overlay:At}}function Gu(){At&&(At.style.display="flex",At.querySelector("#garage-search").value="",At.querySelectorAll(".garage-car").forEach(n=>{n.hidden=!1}))}function rd(){At&&(At.style.display="none")}function $a(){return(At==null?void 0:At.style.display)==="flex"}function zi(n){const e=document.getElementById("garage-box");e&&(e.hidden=!n)}const sd={sedan:{length:4.55,width:1.88,ride:.52,cabinH:.78,cabinLen:2.15,hoodLen:1.35,wheelR:.36,wheelX:.86,wheelZ:1.36,grille:!0,chromeTrim:!0},sports:{length:4.15,width:1.92,ride:.38,cabinH:.52,cabinLen:1.42,hoodLen:1.62,wheelR:.34,wheelX:.9,wheelZ:1.22,low:!0,spoiler:!0,wideHips:!0},suv:{length:4.65,width:2.02,ride:.72,cabinH:.98,cabinLen:2.55,hoodLen:1.15,wheelR:.4,wheelX:.92,wheelZ:1.48,roofRails:!0,upright:!0},truck:{length:5.4,width:2.05,ride:.78,cabinH:.82,cabinLen:1.55,hoodLen:1.05,wheelR:.42,wheelX:.96,wheelZ:1.38,bedLen:2.45,bed:!0},compact:{length:3.35,width:1.62,ride:.46,cabinH:.68,cabinLen:1.65,hoodLen:.85,wheelR:.32,wheelX:.72,wheelZ:1.05},vintage:{length:3.85,width:1.72,ride:.68,cabinH:.62,cabinLen:1.45,hoodLen:1.1,wheelR:.36,wheelX:.78,wheelZ:1.2,fenders:!0,tall:!0},van:{length:4.55,width:1.92,ride:.95,cabinH:1.38,cabinLen:3.2,hoodLen:.55,wheelR:.37,wheelX:.88,wheelZ:1.38,flatFront:!0},cybertruck:{bodyShape:"cybertruck"}},Gv={cybertruck:{bodyShape:"cybertruck"},beetle:{bodyShape:"round",length:3.25,width:1.58,ride:.5,roundH:1.02},"citroen-2cv":{bodyShape:"round",length:3.45,width:1.48,ride:.48,roundH:.95,softTop:!0},"fiat-500":{bodyShape:"round",length:2.95,width:1.42,ride:.42,roundH:.88},"vw-bus":{bodyShape:"flat-van",length:4.55,width:1.88,ride:1.05,splitWindshield:!0},"porsche-911":{bodyShape:"911",length:4.35,width:1.9,ride:.4,rearHump:!0,roundLights:!0},"ford-mustang":{bodyShape:"fastback",length:4.55,width:1.92,hoodLen:1.75,fastback:!0,scoop:!0},"dodge-charger":{bodyShape:"fastback",length:4.85,width:1.98,hoodLen:1.7,fastback:!0,muscle:!0},"chevy-camaro":{bodyShape:"fastback",length:4.45,width:1.9,hoodLen:1.65,fastback:!0},camaro:{bodyShape:"fastback",length:4.45,width:1.9,hoodLen:1.65,fastback:!0},delorean:{bodyShape:"wedge",stainless:!0,length:4.2,width:1.85,ride:.42,gullwing:!0},"lamborghini-aventador":{bodyShape:"supercar",length:4.55,width:2.05,ride:.32,scissor:!0,wide:!0},"lamborghini-miura":{bodyShape:"supercar",length:4.35,width:1.92,ride:.34},"ferrari-308":{bodyShape:"supercar",length:4.25,width:1.88,ride:.35,roundLights:!0},"bugatti-chiron":{bodyShape:"supercar",length:4.55,width:2.08,ride:.3,wide:!0,horseshoe:!0},"jeep-wrangler":{bodyShape:"box-suv",length:4.2,width:1.88,ride:.82,spare:!0,roundLights:!0,upright:!0},"mercedes-g":{bodyShape:"box-suv",length:4.55,width:1.95,ride:.88,boxy:!0,spare:!1},"hummer-h1":{bodyShape:"box-suv",length:4.85,width:2.15,ride:.95,wide:!0,military:!0},"model-t":{bodyShape:"vintage-tall",length:3.35,width:1.55,ride:.82,tall:!0,spoked:!0},"rolls-silver-ghost":{bodyShape:"vintage-tall",length:4.85,width:1.82,ride:.95,tall:!0,longHood:!0},"tesla-model-s":{bodyShape:"ev-sedan",length:4.75,width:1.92,ride:.48,smooth:!0,noGrille:!0},"tesla-model-3":{bodyShape:"ev-sedan",length:4.55,width:1.85,ride:.45,smooth:!0,noGrille:!0},"tesla-model-x":{bodyShape:"ev-suv",length:4.75,width:2,ride:.72,falcon:!0,noGrille:!0},"tesla-model-y":{bodyShape:"ev-suv",length:4.65,width:1.92,ride:.68,smooth:!0,noGrille:!0},"tesla-roadster":{bodyShape:"supercar",length:4,width:1.88,ride:.34,smooth:!0,noGrille:!0},"rivian-r1t":{bodyShape:"ev-truck",length:5.35,width:2.05,ride:.82,bed:!0,roundLights:!0},"ford-f150":{bodyShape:"truck",length:5.55,width:2.08,ride:.82,bedLen:2.55,chromeGrille:!0},"dodge-ram":{bodyShape:"truck",length:5.65,width:2.1,ride:.85,bedLen:2.6,tallGrille:!0},"mercedes-300sl":{bodyShape:"gullwing",length:4.35,width:1.82,ride:.42,gullwing:!0},"jaguar-e-type":{bodyShape:"fastback",length:4.45,width:1.78,hoodLen:1.85,longNose:!0},"vw-id4":{bodyShape:"ev-suv",length:4.55,width:1.92,ride:.7,smooth:!0},"renault-5-ev":{bodyShape:"round",length:3.55,width:1.65,ride:.48,roundH:.82,retro:!0},"mini-cooper":{bodyShape:"round",length:3.55,width:1.62,ride:.44,roundH:.72},"ford-gt":{bodyShape:"supercar",length:4.35,width:1.95,ride:.33,stripe:!0},"ford-gt40":{bodyShape:"supercar",length:4.15,width:1.92,ride:.32,stripe:!0},"aston-db5":{bodyShape:"fastback",length:4.45,width:1.82,hoodLen:1.55,elegant:!0},"rolls-phantom":{bodyShape:"luxury-sedan",length:5.35,width:2,ride:.58,tall:!0,longHood:!0},"cadillac-escalade":{bodyShape:"luxury-suv",length:5.05,width:2.05,ride:.78,chromeGrille:!0},trabant:{bodyShape:"round",length:3.25,width:1.48,ride:.46,roundH:.78,twoStroke:!0},"toyota-prius":{bodyShape:"hybrid",length:4.35,width:1.78,ride:.5,wedgeRear:!0},"hyundai-ioniq5":{bodyShape:"ev-suv",length:4.55,width:1.92,ride:.68,pixelLights:!0,retro:!0}};function Vv(n){const e=n.style??"sedan",t={...sd[e]??sd.sedan},i=Gv[n.id]??{},r={...t,...i,id:n.id,name:n.name,style:e,color:n.color??12107204,year:n.year??2e3,maker:n.maker??""};return r.bodyShape||(r.bodyShape=e),r}const zo=new ze({color:2762016,roughness:.82,metalness:.05}),Wv=new ze({color:1316896,roughness:.55,metalness:.15}),od=new ze({color:13421772,metalness:.9,roughness:.2});function Xv(n,e={x:.32,y:.78,z:.05}){const t=new _t;t.name="cockpit";const i=new me(new ct(1.45,.38,.55),Wv);i.position.set(.05,e.y+.08,e.z+.42),i.rotation.x=-.35,t.add(i);const r=new me(new ct(.42,.18,.06),new ze({color:660768,emissive:2245734,emissiveIntensity:.35}));r.position.set(.12,e.y+.22,e.z+.52),r.rotation.x=-.35,t.add(r);const s=new _t,o=new me(new Ac(.17,.028,10,20),od);o.rotation.x=Math.PI/2;const a=new me(new ct(.3,.025,.04),od);s.add(o,a),s.position.set(e.x,e.y+.02,e.z+.28),s.rotation.x=-.55,t.add(s);const c=new me(new ct(.42,.12,.42),zo);c.position.set(e.x,e.y-.08,e.z);const l=new me(new ct(.4,.45,.1),zo);l.position.set(e.x,e.y+.12,e.z-.16),l.rotation.x=-.2;const d=new me(new ct(.22,.18,.08),zo);return d.position.set(e.x,e.y+.38,e.z-.18),t.add(c,l,d),n.add(t),t}function $v(n,e={x:.32,y:.78,z:.05}){const t=new _t;t.name="engine",t.userData.carPart="engine",t.userData.detachable=!1;const i=new me(new ct(.72,.42,.85),new ze({color:3816002,metalness:.75,roughness:.45}));i.position.y=.21,i.castShadow=!0;const r=new me(new ct(.55,.22,.48),new ze({color:2763314,metalness:.8,roughness:.35}));r.position.set(0,.48,.12);const s=new me(new ct(.62,.08,.35),new ze({color:5592416,metalness:.85,roughness:.3}));s.position.set(0,.38,-.22);for(const o of[-.18,.18]){const a=new me(new Nn(.06,.06,.2,8),new ze({color:4868693,metalness:.7,roughness:.4}));a.position.set(o,.52,.05),t.add(a)}return t.add(i,r,s),t.position.set(.02,e.y-.42,e.z+.55),n.add(t),t}function Yv(n){const e=n.userData.wheels??[];for(const t of e)t.userData.baseY=t.position.y,t.userData.baseX=t.position.x,t.userData.steerable=String(t.userData.carPart??"").includes("_f")}function qv(n,e){e&&n.traverse(t=>{if(!t.isMesh||!t.material)return;const i=Array.isArray(t.material)?t.material:[t.material];for(const r of i)(r.isMeshPhysicalMaterial||r.isMeshStandardMaterial)&&(r.envMap=e,r.envMapIntensity=String(t.userData.carPart??"").includes("window")||t.userData.carPart==="windshield"?1.5:.65,r.needsUpdate=!0)})}function Ls(n,e=.12,t=.52){return new ze({color:n,metalness:e,roughness:t})}function Ur(){return new ze({color:12113136,metalness:.05,roughness:.15,transparent:!0,opacity:.5})}function Vu(){return new ze({color:13421772,metalness:.85,roughness:.2})}function jv(){return new ze({color:1315860,metalness:.02,roughness:.95})}function Fn(n=1710618){return new ze({color:n,metalness:.08,roughness:.75})}function Ya(){return new ze({color:16777198,emissive:16774348,emissiveIntensity:.65,roughness:.2})}function Zv(){return new ze({color:16724787,emissive:16716049,emissiveIntensity:.7,roughness:.25})}function qa(n=12107204){return new ze({color:n,metalness:.9,roughness:.18})}function Kv(){return new ze({color:1710618,metalness:.05,roughness:.9})}function mt(n,e,t={}){return n.userData.carPart=e,t.detachable!==!1&&(n.userData.detachable=!0),t.dentPanel&&(n.userData.dentPanel="front"),n}function Me(n,e,t,i){const r=new me(new ct(n,e,t),i);return r.castShadow=!0,r.receiveShadow=!0,r}function ja(n,e={x:.32,y:.78,z:.05}){if(n.userData.driverSeat=e,!n.userData.wheels){const t=[];n.traverse(i=>{var r;(r=i.userData)!=null&&r.isWheel&&t.push(i)}),n.userData.wheels=t}return Xv(n,e),$v(n,e),Yv(n),n}function Jv(n,e){return qv(n,e),n}function Pc(n=.36){const e=new _t;e.userData.isWheel=!0;const t=new me(new Nn(n,n,.28,8),jv);t.rotation.z=Math.PI/2,t.castShadow=!0,t.receiveShadow=!0;const i=new me(new Nn(n*.62,n*.62,.24,8),Fn(7829367));return i.rotation.z=Math.PI/2,i.castShadow=!0,e.add(t,i),e}function ad(n,e){const t=[],i=e.wheelR??.36,r=e.wheelX??.86,s=e.wheelZ??1.32;for(const[o,a,c]of[[-r,s,"wheel_fl"],[r,s,"wheel_fr"],[-r,-s,"wheel_rl"],[r,-s,"wheel_rr"]]){const l=Pc(i);l.position.set(o,i,a),l.userData.carPart=c,l.userData.detachable=!0,n.add(l),t.push(l)}n.userData.wheels=t}function Ho(n,e,t,i,r,s,o){const a=Me(e,t,i,Kv());a.position.set(r,s,o),n.add(a)}function cd(n,e,t,i){const r=e.ride+.14,s=e.width*.42;for(const[o,a]of[[-s,"l"],[s,"r"]]){const c=new _t,l=Me(.34,.22,.14,Fn()),d=Me(.28,.16,.06,Ya());d.position.z=.07,c.add(l,d),c.position.set(o,r,t),n.add(mt(c,"headlight"));const u=new _t,h=Me(.36,.18,.12,Fn(3342336)),p=Me(.3,.14,.05,Zv());p.position.z=.06,u.add(h,p),u.position.set(o,r+.06,i),n.add(mt(u,"taillight"))}if(e.pixelLights)for(const o of[-e.width*.18,e.width*.18]){const a=Me(.12,.12,.08,Ya());a.position.set(o,r-.02,t-.02),n.add(a)}}function ld(n,e,t,i){const r=(s,o)=>{const a=o==="bumper_front",c=mt(Me(e.width*.96,.2,.26,Fn(2236962)),o,{dentPanel:a});return c.position.set(0,e.ride*.32,s),c};n.add(r(t+.04,"bumper_front"),r(i-.04,"bumper_rear"))}function dd(n,e,t){if(e.noGrille){const r=Me(e.width*.7,.08,.1,Fn(1118481));r.position.set(0,e.ride*.4,t),n.add(r);return}const i=mt(Me(e.width*.58,.4,.12,Fn(657930)),"grille");i.position.set(0,e.ride*.44,t),n.add(i);for(let r=-2;r<=2;r++){const s=Me(.05,.34,.05,Vu());s.position.set(r*e.width*.1,e.ride*.44,t+.02),n.add(s)}}function ud(n,e,t){for(const[i,r]of[[-e.width*.52,"mirror_l"],[e.width*.52,"mirror_r"]]){const s=mt(Me(.14,.1,.12,Fn(2236962)),r);s.position.set(i,e.ride+e.cabinH*.52,t),n.add(s)}}function hd(n,e,t){const i=Ls(e.color),r=e.width*.5;for(const[s,o]of[[-r,"door_l"],[r,"door_r"]]){const a=mt(Me(.1,e.cabinH*.82,e.cabinLen*.48,i),o);a.position.set(s,e.ride+e.cabinH*.42,t),n.add(a);const c=mt(Me(.06,e.cabinH*.55,e.cabinLen*.4,Ur()),o==="door_l"?"window_l":"window_r");c.position.set(s*.94,e.ride+e.cabinH*.52,t+.02),n.add(c)}}function fd(n,e,t,i=-.42){const r=mt(Me(e.width*.76,e.cabinH*.58,.1,Ur()),"windshield");r.position.set(0,e.ride+e.cabinH*.48,t+e.cabinLen*.22),r.rotation.x=i,n.add(r);const s=Me(e.width*.7,e.cabinH*.45,.08,Ur());s.position.set(0,e.ride+e.cabinH*.46,t-e.cabinLen*.32),s.rotation.x=.38,n.add(s)}function Qv(n){return n.length*.5-.1}function ex(n){return-n.length*.5+.1}function tx(n,e,t){const i=e.roundH??.9,r=e.cabinZ??-.05,s=[{w:.92,h:.22,d:.88,y:.18},{w:.98,h:.28,d:.95,y:.38},{w:1,h:.32,d:1,y:.58},{w:.95,h:.28,d:.92,y:.78},{w:.82,h:.22,d:.78,y:.95}];for(const c of s){const l=Me(e.width*c.w,i*c.h,e.length*c.d*.55,t);l.position.set(0,e.ride+i*c.y,r),n.add(l)}const o=mt(Me(e.width*.88,i*.2,e.hoodLen??.85,t),"hood",{dentPanel:!0});o.position.set(0,e.ride+i*.22,e.length*.32),n.add(o);const a=Me(e.width*.86,i*.18,.65,t);a.position.set(0,e.ride+i*.2,-e.length*.32),n.add(a)}function nx(n){const e=new _t,t=Ls(n.color),i=Ls(n.color,.08,.65),r=n.length,s=n.width,o=n.ride,a=n.cabinH??.72,c=n.cabinLen??2,l=n.hoodLen??1.2,d=n.cabinZ??-.08,u=Qv(n),h=ex(n);if(n.bodyShape==="round")return tx(e,n,t),fd(e,n,d,-.38),hd(e,n,d),dd(e,n,u),cd(e,n,u+.02,h),ld(e,n,u+.08,h-.08),ud(e,n,d*.2),ad(e,n),ja(e,{x:s*.15,y:o+.42,z:0});const p=Me(s,.28,r*.9,i);p.position.set(0,o*.4,0),e.add(p);const g=r*.5-l*.5-.1,_=mt(Me(s*.94,.18,l,t),"hood",{dentPanel:!0});_.position.set(0,o+.1,g),e.add(_);for(const v of[-1,1]){const P=Me(.22,.36,l*.78,t);P.position.set(v*s*.48,o+.16,g),e.add(P)}const m=Me(s*.9,a*.54,c,t);m.position.set(0,o+a*.32,d),e.add(m);const f=Me(s*.84,.16,c*.9,t);if(f.position.set(0,o+a*.64,d),e.add(f),Ho(e,s*.92,.04,.06,0,o+.08,g-l*.5-.02),Ho(e,s*.92,.04,.06,0,o+a*.28,d+c*.5+.02),n.fastback||n.bodyShape==="fastback"||n.bodyShape==="supercar"||n.bodyShape==="gullwing"){const v=mt(Me(s*.88,a*.5,1.05,t),"trunk");v.position.set(0,o+a*.4,-r*.5+.7),v.rotation.x=-.5,e.add(v)}else if(n.bodyShape!=="truck"&&n.bodyShape!=="ev-truck"&&!n.bed&&n.bodyShape!=="flat-van"){const v=Math.max(.55,r-l-c-.3),P=-r*.5+v*.5+.14,b=Me(s*.9,.2,v,t);b.position.set(0,o+.12,P),e.add(b),Ho(e,s*.92,.04,.06,0,o+.08,P+v*.5+.02)}if(n.bodyShape==="supercar"||n.low){const v=mt(Me(s*.9,.14,l*.92,t),"front_panel",{dentPanel:!0});if(v.position.set(0,o+.05,g+.06),e.add(v),n.wide)for(const P of[-1,1]){const b=Me(.24,.22,.95,t);b.position.set(P*s*.48,o+.2,-r*.22),e.add(b)}}if(n.rearHump||n.bodyShape==="911"){const v=Me(s*.9,.3,.88,t);v.position.set(0,o+.4,-r*.32),e.add(v)}if(n.bodyShape==="wedge"||n.stainless){const v=n.stainless?qa(n.color):t,P=Me(s*.9,o*.72,r*.88,v);P.position.set(0,o*.5,0),e.add(P)}if(n.bodyShape==="box-suv"||n.upright||n.style==="suv"||n.bodyShape==="ev-suv"||n.bodyShape==="luxury-suv"){const v=Me(s*.94,a*.68,c*1.08,t);v.position.set(0,o+a*.4,d),e.add(v);const P=Me(s*.86,.18,c*.95,t);P.position.set(0,o+a*.78,d),e.add(P)}if(n.bed||n.bodyShape==="truck"||n.bodyShape==="ev-truck"){const v=n.bedLen??2.4,P=-r*.5+v*.5+.22,b=Me(s*.94,.22,v,i);b.position.set(0,o*.56,P),e.add(b);for(const R of[-s*.46,s*.46]){const S=Me(.14,.52,v,t);S.position.set(R,o+.38,P),e.add(S)}const E=Me(s*.9,.52,.14,t);E.position.set(0,o+.38,P-v*.5-.05),e.add(E)}if(n.bodyShape==="flat-van"||n.style==="van"){const v=mt(Me(s*.94,a*1.18,r*.84,t),"body",{dentPanel:!0});if(v.position.set(0,o+a*.6,-.05),e.add(v),n.splitWindshield)for(const[P,b]of[[-s*.2,.14],[s*.2,-.14]]){const E=mt(Me(s*.36,a*.52,.1,Ur()),"windshield");E.position.set(P,o+a*.58,u-.18),E.rotation.y=b,e.add(E)}}if(n.spare){const v=Pc(.32);v.position.set(0,o+.48,h-.14),e.add(v)}if(fd(e,n,d,n.upright?-.35:-.42),!n.splitWindshield)hd(e,n,d);else for(const[v,P]of[[-s*.5,"door_l"],[s*.5,"door_r"]]){const b=mt(Me(.1,a*.85,c*.55,t),P);b.position.set(v,o+a*.45,d),e.add(b)}if(dd(e,n,u),cd(e,n,u+.02,h),ld(e,n,u+.08,h-.08),ud(e,n,d*.3),n.scoop){const v=Me(.4,.1,.44,Fn());v.position.set(0,o+.22,g-l*.15),e.add(v)}if(n.spoiler||n.bodyShape==="supercar"){const v=mt(Me(s*.76,.1,.32,t),"spoiler");v.position.set(0,o+a*.54,h+.14),e.add(v)}if(n.stripe){const v=Me(.16,.05,r*.52,Ls(16777215,.2,.4));v.position.set(0,o+.24,0),e.add(v)}if(n.roofRails)for(const v of[-s*.44,s*.44]){const P=Me(.06,.06,c*.88,Vu());P.position.set(v,o+a+.05,d),e.add(P)}if(n.bodyShape==="vintage-tall"||n.tall){const v=Me(s*.88,a*.75,c*.95,t);v.position.set(0,o+a*.48,d),e.add(v)}ad(e,n);const w=o+(n.low?.32:.4),T=n.bodyShape==="truck"||n.bed?.35:.02;return ja(e,{x:s*.17,y:w+.38,z:T})}function ix(n){const e=new _t,t=qa(n.color),i=qa(10133672),r=5.05,s=2.28,o=Me(s,.42,r,i);o.position.set(0,.48,0),e.add(o);const a=Me(s*.96,.55,r*.96,t);a.position.set(0,.78,.05),e.add(a);const c=mt(Me(2.12,.28,1.55,t),"hood",{dentPanel:!0});c.position.set(0,.98,1.55),c.rotation.x=-.08,e.add(c);const l=mt(Me(2.22,.72,.22,t),"front_panel",{dentPanel:!0});l.position.set(0,.72,2.42),e.add(l);const d=mt(Me(2.05,.1,.08,Ya()),"headlight");d.position.set(0,.62,2.52),e.add(d);const u=mt(Me(2.24,.18,.2,Fn()),"bumper_front",{dentPanel:!0});u.position.set(0,.22,2.58),e.add(u);const h=Me(2.02,.52,2.05,t);h.position.set(0,1.42,-.15),h.rotation.x=-.32,e.add(h);const p=Me(2.02,.48,1.85,t);p.position.set(0,1.55,-1.55),p.rotation.x=.28,e.add(p);for(const w of[-1.1,1.1]){const T=mt(Me(.12,.95,3.35,i),w<0?"door_l":"door_r");T.position.set(w,1.05,-.35),T.rotation.y=w<0?.12:-.12,e.add(T)}const g=mt(Me(1.75,.32,1.15,Ur()),"windshield");g.position.set(0,1.12,.55),g.rotation.x=-.42,e.add(g);const _=Me(2.12,.18,2.15,i);_.position.set(0,.52,-1.75),e.add(_);for(const w of[-1.08,1.08]){const T=Me(.14,.42,2.15,t);T.position.set(w,.78,-1.75),e.add(T)}const m=[[-1.02,1.48,"wheel_fl"],[1.02,1.48,"wheel_fr"],[-1.02,-1.48,"wheel_rl"],[1.02,-1.48,"wheel_rr"]],f=[];for(const[w,T,v]of m){const P=Pc(.4);P.position.set(w,.38,T),P.userData.carPart=v,P.userData.detachable=!0,e.add(P),f.push(P)}return e.userData.wheels=f,ja(e,{x:.28,y:.88,z:.12})}function rx(n){const e=Vv(n),t=e.bodyShape==="cybertruck"?ix(e):nx(e);return t.userData.carId=n.id,t.userData.carName=n.name,t}const sx=5,Qt=28,gn=38,gs=30,ox=18;function Lc(){return{engine:100,body:100,hood:100,windshield:100,wheel_fl:100,wheel_fr:100,wheel_rl:100,wheel_rr:100}}function _s(n,e){let t=null;return n.traverse(i=>{var r;((r=i.userData)==null?void 0:r.carPart)===e&&!i.userData.detached&&(t=i)}),t}function br(n,e,t){n.partHealth||(n.partHealth=Lc());const i=n.partHealth,s={headlight:"body",grille:"body",bumper_front:"body",hood:"hood",windshield:"windshield",door_l:"body",door_r:"body",wheel_fl:"wheel_fl",wheel_fr:"wheel_fr",wheel_rl:"wheel_rl",wheel_rr:"wheel_rr"}[e]??"body";i[s]!=null&&(i[s]=Math.max(0,i[s]-t)),(e==="hood"||e==="bumper_front"||e==="grille")&&(i.engine=Math.max(0,i.engine-t*.45))}function Dc(n){return Math.abs(n)>=Qt}function Za(n){return Dc(n)?Math.min(1,(Math.abs(n)-Qt)/(52-Qt)):0}function ax(n){var t;const e=((t=n==null?void 0:n.geometry)==null?void 0:t.parameters)??{};return{width:e.width??2,height:e.height??.6,depth:e.depth??1.2}}function Ic(n){const e={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let t=0;t<n.length;t+=3)e.minX=Math.min(e.minX,n[t]),e.maxX=Math.max(e.maxX,n[t]),e.minY=Math.min(e.minY,n[t+1]),e.maxY=Math.max(e.maxY,n[t+1]),e.minZ=Math.min(e.minZ,n[t+2]),e.maxZ=Math.max(e.maxZ,n[t+2]);return e}function cx(n,e,t){const i=Math.max(0,Math.min(1,(t-n)/(e-n)));return i*i*(3-2*i)}function lx(n){if(n.userData.dentDense)return;const e=n.geometry,t=e==null?void 0:e.parameters;if(!(t!=null&&t.width))return;const{width:i,height:r,depth:s}=t,o=Math.max(10,Math.ceil(i*14)),a=Math.max(10,Math.ceil(r*14)),c=Math.max(5,Math.ceil(s*12)),l=new ct(i,r,s,o,a,c);n.geometry.dispose(),n.geometry=l,n.userData.dentOriginal=null,n.userData.dentColorOriginal=null,n.userData.dentDense=!0}function dx(n){const e=[];if(n.traverse(s=>{s.isMesh&&s.userData.dentPanel==="front"&&e.push(s)}),!e.length)return null;n.updateWorldMatrix(!0,!0);const t=new D;let i=e[0],r=-1/0;for(const s of e)s.getWorldPosition(t),n.worldToLocal(t),t.z>r&&(r=t.z,i=s);return i}function Ka(n){const e=[];return n.traverse(t=>{var i,r,s;t!==n&&(!((i=t.userData)!=null&&i.detachable)||t.userData.detached||(s=(r=t.parent)==null?void 0:r.userData)!=null&&s.detachable||e.push(t))}),e}const pd={headlight:100,grille:85,front_panel:82,bumper_front:78,hood:72,windshield:65,mirror_l:50,mirror_r:50,door_l:40,door_r:40,window_l:38,window_r:38,bumper_rear:20,taillight:18,spoiler:15};function md(n){const e=n.userData.carPart??"";return pd[e]!=null?pd[e]:e.startsWith("wheel_")?35:12}function ux(n,e){const t=new D;n.getWorldPosition(t),e.worldToLocal(t);const i=n.userData.carPart??"";return i==="headlight"||i==="grille"||i==="bumper_front"||i==="hood"||i==="front_panel"?!0:t.z>.15}function hx(n,e=.5){if(!n||n.userData.shattered)return;n.userData.shattered=!0;const t=new Ks({color:16777215,transparent:!0,opacity:.85,depthWrite:!1}),i=new _t;i.name="cracks";const r=10+Math.floor(e*16);for(let s=0;s<r;s++){const o=new me(new In(.15+Math.random()*.55,.012+Math.random()*.02),t);o.position.set((Math.random()-.5)*1.4,(Math.random()-.5)*.9,.03+Math.random()*.02),o.rotation.z=Math.random()*Math.PI,i.add(o)}n.add(i),n.material&&!Array.isArray(n.material)&&(n.material=n.material.clone(),n.material.opacity=Math.min(n.material.opacity??.4,.35),n.material.transmission=.25,n.material.needsUpdate=!0)}function gd(n,e=1){!n||n.userData.hung||n.userData.detached||(n.userData.hung=!0,n.rotation.y=e*(.55+Math.random()*.35),n.position.x+=e*.08)}function fx(n,e,t,i,r,s,o,a){var m;if(!(t!=null&&t.geometry))return;const l=Ic(Uc(t)).maxZ,d=.28+s*.42,u=5+Math.floor(s*4),h=new Re(((m=e.spec)==null?void 0:m.color)??12107204),p=new D(0,0,1).applyAxisAngle(new D(0,1,0),e.rotY),g=new D,_=Math.abs(o);for(let f=0;f<u;f++)for(let w=0;w<u;w++){const T=(f/(u-1)-.5)*2,v=(w/(u-1)-.5)*2,P=Math.hypot(T,v);if(P>1)continue;const b=1-P;if(b<.25&&Math.random()>s*.85)continue;g.set(i+T*d,r+v*d*.85,l),t.localToWorld(g);const E=.07+Math.random()*.11,R=.05+Math.random()*.08,S=.06+Math.random()*.1,y=new ze({color:h.clone().lerp(new Re(6710886),.2+Math.random()*.35),metalness:.55+Math.random()*.3,roughness:.35+Math.random()*.25}),A=new me(new ct(E,R,S),y);A.position.copy(g),A.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),n.add(A);const O=p.clone().multiplyScalar(2+_*.05*b).add(new D((Math.random()-.5)*3,1.5+Math.random()*3,(Math.random()-.5)*2));a.push({mesh:A,vel:O,life:5+Math.random()*2,bounce:.28,spin:new D((Math.random()-.5)*10,(Math.random()-.5)*10,(Math.random()-.5)*10)})}}function px(n,e,t,i){var c,l;const r=Uc(n),s=(l=(c=n.geometry)==null?void 0:c.attributes)==null?void 0:l.position;if(!r||!s)return;const o=.25+i*.4,a=Ic(r).minZ;for(let d=0;d<s.count;d++){const u=r[d*3],h=r[d*3+1];r[d*3+2];const p=Math.hypot(u-e,h-t);if(p>o)continue;1-p/o>.55+i*.25&&s.setXYZ(d,e+(u-e)*.15,t+(h-t)*.15,a-.02)}s.needsUpdate=!0,n.geometry.computeVertexNormals()}function mx(n,e,t,i){const r=Math.abs(t);if(r<ox)return;const s=n.mesh,o=Za(t),a=(h,p,g=18)=>{if(r<p)return!1;const _=_s(s,h);return _?(Ds(n,e,_,t,i),br(n,h,g+o*22),!0):!1},c=Ka(s).filter(h=>h.userData.carPart==="headlight");for(const h of c)Ds(n,e,h,t,i),br(n,"headlight",10);r>=Qt-4&&(a("bumper_front",Qt-4,15),a("grille",Qt-2,12));const l=_s(s,"windshield");if(l&&r>=Qt-6&&(hx(l,o),br(n,"windshield",20+o*30)),l&&r>=gs&&a("windshield",gs,35),r>=Qt&&a("hood",Qt,25),r>=gs+4){const h=_s(s,"door_l"),p=_s(s,"door_r");h&&!h.userData.detached&&Math.random()<.7&&(r>=gn?a("door_l",gn,20):gd(h,-1)),p&&!p.userData.detached&&Math.random()<.7&&(r>=gn?a("door_r",gn,20):gd(p,1))}if(r>=gn)for(const h of["wheel_fl","wheel_fr"])Math.random()<.35+o*.25&&a(h,gn,30);let d=r>=gn?3:r>=gs?2:0;const u=Ka(s).filter(h=>ux(h,s)).sort((h,p)=>md(p)-md(h));for(const h of u){if(d<=0)break;h.userData.detached||(Ds(n,e,h,t,i),br(n,h.userData.carPart??"body",15),d--)}}function gx(n,e,t,i,r){const s=Ka(n.mesh);for(let o=0;o<r&&s.length;o++){const a=Math.floor(Math.random()*s.length);Ds(n,e,s[a],t,i),s.splice(a,1)}}function Uc(n){var t,i;if(n.userData.dentOriginal)return n.userData.dentOriginal;const e=(i=(t=n.geometry)==null?void 0:t.attributes)==null?void 0:i.position;return e?(n.userData.dentOriginal=Float32Array.from(e.array),n.userData.dentOriginal):null}function _x(n){var r,s,o;const e=(s=(r=n.geometry)==null?void 0:r.attributes)==null?void 0:s.position;if(!e||n.geometry.attributes.color)return;const t=new Re(((o=n.material)==null?void 0:o.color)??11184810),i=new Float32Array(e.count*3);for(let a=0;a<e.count;a++)i[a*3]=t.r,i[a*3+1]=t.g,i[a*3+2]=t.b;n.geometry.setAttribute("color",new fn(i,3)),n.material&&(n.material=n.material.clone(),n.material.vertexColors=!0)}function vx(n){var r,s;const e=n.userData.dentOriginal,t=(s=(r=n.geometry)==null?void 0:r.attributes)==null?void 0:s.position;if(!e||!t)return;t.array.set(e),t.needsUpdate=!0;const i=n.geometry.attributes.color;i&&n.userData.dentColorOriginal&&(i.array.set(n.userData.dentColorOriginal),i.needsUpdate=!0),n.geometry.computeVertexNormals()}function xx(n,e,t,i,r){var R,S,y;lx(n);const s=Uc(n),o=(S=(R=n.geometry)==null?void 0:R.attributes)==null?void 0:S.position;if(!s||!o)return;_x(n);const a=n.geometry.attributes.color;a&&!n.userData.dentColorOriginal&&(n.userData.dentColorOriginal=Float32Array.from(a.array));const c=Ic(s),l=c.minZ,d=c.maxZ,u=Math.max(d-l,.02),{width:h,height:p}=ax(n),g=Math.min(h,p),_=g*(r?.26+i*.2:.14+i*.08),m=_*1.25,f=r?3.2+i*1.4:2,w=r?u*(1.25+i*1.6)+g*.06*i:u*(.4+i*.28),T=r?u*(.45+i*.55):u*.08,v=new Re(3816002),P=new Re(6044200),b=new Re(1710624),E=new Re(((y=n.material)==null?void 0:y.color)??11184810);for(let A=0;A<o.count;A++){const O=s[A*3],F=s[A*3+1],V=s[A*3+2],X=O-e,W=F-t,q=Math.hypot(X,W);if(q>m){o.setXYZ(A,O,F,V),a&&n.userData.dentColorOriginal&&a.setXYZ(A,n.userData.dentColorOriginal[A*3],n.userData.dentColorOriginal[A*3+1],n.userData.dentColorOriginal[A*3+2]);continue}const te=(1-q/m)**f,re=cx(l,d,V),ge=Math.abs(q-_*.88),De=r?Math.exp(-(ge*ge)*90)*.38:0,tt=.12+.88*re,$=r?te*(1-re)*.72:te*(1-re)*.25,J=te*w*tt+De*w*re+$*w,pe=te*(r?.62+i*.28:.22)*(.35+.65*re),ie=O-X/(q+1e-4)*pe,Ee=F-W/(q+1e-4)*pe,Pe=l-T*te,Be=Math.min(V,Math.max(Pe,V-J));if(o.setXYZ(A,ie,Ee,Be),a){const Ze=J/(w+.001),Fe=E.clone();Ze>.35&&Fe.lerp(P,(Ze-.35)*1.6),Ze>.58&&Fe.lerp(v,(Ze-.58)*2.2),Ze>.78&&Fe.lerp(b,(Ze-.78)*3.5),a.setXYZ(A,Fe.r,Fe.g,Fe.b)}}o.needsUpdate=!0,a&&(a.needsUpdate=!0),n.geometry.computeVertexNormals()}function yx(n,e){vx(n);for(const t of e)t.panel===n&&xx(n,t.hitX,t.hitY,t.severity,t.scoop)}function Nc(n){const e=new D(0,.75,2.1);return n.mesh.localToWorld(e),e}function Sx(n,e){const t=Nc(e);return n.worldToLocal(t),{x:t.x,y:t.y}}function Mx(n,e,t,i){var a;const r=((a=e.spec)==null?void 0:a.color)??12107204,s=Nc(e),o=new Re(r);for(let c=0;c<t;c++){const l=o.clone().lerp(new Re(16777215),.1+Math.random()*.35),d=new ze({color:l,metalness:.45+Math.random()*.35,roughness:.25+Math.random()*.3}),u=new me(new ct(.03+Math.random()*.06,.008+Math.random()*.012,.04+Math.random()*.05),d);u.position.copy(s),u.position.x+=(Math.random()-.5)*.55,u.position.y+=(Math.random()-.5)*.4,u.position.z+=(Math.random()-.5)*.3,u.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),n.add(u);const h=new D((Math.random()-.5)*4,1.8+Math.random()*3.5,(Math.random()-.2)*4);h.applyAxisAngle(new D(0,1,0),e.rotY),i.push({mesh:u,vel:h,life:.9+Math.random()*.6,bounce:.32})}}function bx(n,e,t,i){const r=new ze({color:16755268,emissive:16737792,emissiveIntensity:2,metalness:.8,roughness:.3});for(let s=0;s<t;s++){const o=new me(new yi(.025+Math.random()*.03,6,6),r);o.position.copy(e),n.add(o),i.push({mesh:o,vel:new D((Math.random()-.5)*8,2+Math.random()*6,(Math.random()-.5)*8),life:.15+Math.random()*.2,sparkle:!0})}}function Ds(n,e,t,i,r){if(!(t!=null&&t.parent)||t.userData.detached)return;const s=new D,o=new rr,a=new D;t.updateWorldMatrix(!0,!1),t.matrixWorld.decompose(s,o,a),t.parent.remove(t),t.traverse(h=>{h.userData&&(h.userData.detached=!0)}),e.add(t),t.position.copy(s),t.quaternion.copy(o),t.scale.copy(a);const c=Math.abs(i),l=t.userData.carPart??"";br(n,l,12+c*.35);const u=new D(0,0,1).applyAxisAngle(new D(0,1,0),n.rotY).clone().multiplyScalar(1.5+c*.045).add(new D((Math.random()-.5)*2,1.2+Math.random()*2.5,(Math.random()-.5)*1.5));l.startsWith("wheel_")&&(u.y+=1.5,u.multiplyScalar(1.2)),r.push({mesh:t,vel:u,life:6,isPart:!0,bounce:.32,spin:new D((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8)})}function Ex(n,e,t,i){const r=Math.abs(t);if(r<sx)return;const s=Nc(n),o=Math.min(18,3+Math.floor(r*.28));if(Mx(e,n,o,i),r>=Qt){const a=Za(t),c=!0,l=dx(n.mesh);if(l){const{x:d,y:u}=Sx(l,n),h={panel:l,hitX:d,hitY:u,severity:a,scoop:c};n.dents||(n.dents=[]),n.dents.push(h),yx(l,n.dents),px(l,d,u,a),fx(e,n,l,d,u,a,t,i),n.damage=(n.damage??0)+35+a*40,n.partHealth||(n.partHealth=Lc()),n.partHealth.body=Math.max(0,n.partHealth.body-15-a*35),n.partHealth.engine=Math.max(0,n.partHealth.engine-a*20)}r>=gn&&bx(e,s,8+Math.floor(a*8),i)}mx(n,e,t,i),r>=gn&&gx(n,e,t,i,1+Math.floor(Za(t)*2))}function Wu(n,e){var t,i;for(let r=n.length-1;r>=0;r--){const s=n[r];s.life-=e,s.vel.y-=16*e,s.mesh.position.addScaledVector(s.vel,e),!s.sparkle&&s.mesh.position.y<.04&&(s.mesh.position.y=.04,s.vel.y<0&&(s.vel.y=-s.vel.y*(s.bounce??.3)),s.vel.x*=.72,s.vel.z*=.72),s.spin&&(s.mesh.rotation.x+=s.spin.x*e,s.mesh.rotation.y+=s.spin.y*e,s.mesh.rotation.z+=s.spin.z*e),s.sparkle&&((t=s.mesh.material)==null?void 0:t.emissiveIntensity)>0&&(s.mesh.material.emissiveIntensity=Math.max(0,s.mesh.material.emissiveIntensity-e*8)),s.life<=0&&((i=s.mesh.parent)==null||i.remove(s.mesh),n.splice(r,1))}}const _d=52,Tx=22,Cx=32,wx=48,Ax=42,Rx=2.4,Px=8,Lx=.38,Dx=28,Ix=.9,Ux=26,vd=38;function Nx(n,e,t,i=0,r=null){const s=rx(n);return Jv(s,r),s.position.set(e,0,t),s.rotation.y=i,{spec:n,mesh:s,x:e,z:t,rotY:i,speed:0,steer:0,damage:0,partHealth:Lc(),dents:[],prevX:e,prevZ:t,reverseCharge:0,knockTilt:0,wheelSpin:0,suspensionT:0,bodyRoll:0,debris:[]}}function Fx(n,e){n.add(e.mesh)}function kx(n,e){e!=null&&e.mesh&&n.remove(e.mesh)}function Ox(n,e){const t=e.mesh.userData.driverSeat??{x:.35,y:.78,z:.05};e.mesh.attach(n.mesh),n.mesh.position.set(t.x,t.y,t.z),n.mesh.rotation.set(0,0,0),n.mesh.scale.setScalar(.42),n.mesh.visible=!0,n.inVehicle=e}function Bx(n,e){const t=e.mesh.parent,i=e.x-Math.sin(e.rotY)*2.5,r=e.z-Math.cos(e.rotY)*2.5;t&&t.attach(n.mesh),n.mesh.scale.setScalar(1),n.x=i,n.z=r,n.mesh.visible=!0,n.inVehicle=null,zx(n)}function zx(n){n.mesh.position.set(n.x,n.mesh.position.y,n.z)}function Hx(n,e){const t=n.mesh.userData.wheels??[],i=n.speed,r=i*e*2.6;n.wheelSpin=(n.wheelSpin??0)+r,n.suspensionT=(n.suspensionT??0)+e*(6+Math.abs(i)*.5);const s=Math.abs(i)*.004;t.forEach((o,a)=>{if(o.userData.detached)return;const c=o.userData.baseY??o.position.y;o.position.y=c+Math.sin(n.suspensionT+a*1.7)*s,o.rotation.x=n.wheelSpin,o.userData.steerable&&(o.rotation.y=-n.steer*.42)})}function Xu(n){n.mesh.position.x=n.x,n.mesh.position.z=n.z,n.mesh.rotation.y=n.rotY}function Gx(n,e,t){if(!(n!=null&&n.mesh))return;let i=0,r=0,s=0;if(n.bodyRoll+=(-n.steer*.08*Math.min(1,Math.abs(n.speed)/18)-n.bodyRoll)*Math.min(1,t*6),r=n.bodyRoll,(n.knockTilt??0)>.01)i=-n.knockTilt,n.knockTilt*=Math.exp(-7*t);else{n.knockTilt=0;const o=Math.abs(n.speed);if(o>=vd){const a=e*.012,c=Math.min(1,(o-vd)/12);s=Math.abs(Math.sin(a*5))*.12*c,i=Math.sin(a*4)*.07*c,r=Math.cos(a*3.2)*.09*c}}n.mesh.position.y=s,n.mesh.rotation.x=i,n.mesh.rotation.z=r}function Vx(n,e){const t=Math.abs(e),i=Math.min(1,Math.max(0,(t-Qt)/(52-Qt))),r=t>=gn,s=r?.52:.26+i*.18,o=t*s;n.speed=-Math.sign(n.speed||1)*o;const a=r?1.25:.45+i*.4;return n.x-=Math.sin(n.rotY)*a,n.z-=Math.cos(n.rotY)*a,n.knockTilt=r?.48:.18+i*.26,n.prevX=n.x,n.prevZ=n.z,{huge:r,severity:i}}function Wx(n,e,t,i){const{throttle:r,brake:s,steer:o,reverse:a=0}=e;n.prevX=n.x,n.prevZ=n.z,n.steer+=(o*Rx-n.steer)*Math.min(1,t*8);const c=.85+Math.abs(n.speed)*.05;n.rotY-=n.steer*t*c;const l=Math.abs(o)<=Lx&&r>0&&a<=0;if(s>0)n.speed-=s*Ax*t;else if(a>0)n.speed-=a*Dx*t,n.speed=Math.max(n.speed,-14),n.speed<-3&&(n.reverseCharge=Math.min(1,(n.reverseCharge??0)+Ix*t));else if(r>0)if((n.reverseCharge??0)>.12&&n.speed<2.5)n.speed+=n.reverseCharge*Ux,n.reverseCharge=0;else{const _=l?wx*(1+Math.min(Math.abs(n.speed)/28,1.2)):Cx*.75;n.speed+=r*_*t}a<=0&&r<=0&&(n.reverseCharge=Math.max(0,(n.reverseCharge??0)-.2*t)),r<=0&&s<=0&&a<=0&&(Math.abs(n.speed)<.4?n.speed=0:n.speed-=Math.sign(n.speed)*Px*t);const d=l?_d:Tx;n.speed=Math.max(-_d*.3,Math.min(d,n.speed));const u=Math.sin(n.rotY)*n.speed*t,h=Math.cos(n.rotY)*n.speed*t,p=i(n.x+u,n.z+h);n.x=p.x,n.z=p.z,Xu(n),Hx(n,t);const g=Math.abs(p.x-(n.prevX+u))>.05||Math.abs(p.z-(n.prevZ+h))>.05;return{impactSpeed:Math.abs(n.speed),charging:l,wallHit:g}}function Xx(n,e,t,i=null){const s=n.x+Math.sin(n.facing)*4,o=n.z+Math.cos(n.facing)*4,a=t(s,o);return Nx(e,a.x,a.z,n.facing,i)}class $x{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return Yx(e).buffer}}function Yx(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t.set(s,i),i+=r.byteLength}return t}function $u(n){return new qx(n).unpack()}function Yu(n){const e=new jx,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class qx{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let i=0,r="",s,o;for(;i<e;)s=t[i],s<160?(o=s,i++):(s^192)<32?(o=(s&31)<<6|t[i+1]&63,i+=2):(s^224)<16?(o=(s&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(o=(s&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),r+=String.fromCodePoint(o);return this.index+=e,r}unpack_array(e){const t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){const t={};for(let i=0;i<e;i++){const r=this.unpack();t[r]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,r=e&8388607|8388608;return(t===0?1:-1)*r*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,r=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(r-20)+t*2**(r-52);return(i===0?1:-1)*o}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class jx{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const i=r=>{if(r<t){const s=this.pack(e[r]);return s instanceof Promise?s.then(()=>i(r+1)):i(r+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),r=e/2**i-1,s=Math.floor(r*2**52),o=2**32,a=t<<31|i+1023<<20|s/o&1048575,c=s%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const r=s=>{if(s<t.length){const o=t[s];if(e.hasOwnProperty(o)){this.pack(o);const a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>r(s+1))}return r(s+1)}};return r(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new $x,this._textEncoder=new TextEncoder}}let qu=!0,ju=!0;function Er(n,e,t){const i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function Si(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Fc("Unable to polyfill events");return}const r=n.RTCPeerConnection.prototype,s=r.addEventListener;r.addEventListener=function(a,c){if(a!==e)return s.apply(this,arguments);const l=d=>{const u=t(d);u&&(c.handleEvent?c.handleEvent(u):c(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),s.apply(this,[a,l])};const o=r.removeEventListener;r.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);const l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(r,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function Zx(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(qu=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function Kx(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(ju=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Fc(){if(typeof window=="object"){if(qu)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function kc(n,e){ju&&console.warn(n+" is deprecated, please use "+e+" instead.")}function Jx(n){const e={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){const i=t.userAgentData.brands.find(r=>r.brand==="Chromium");if(i){const r=parseInt(i.version,10);if(r>=90)return{browser:"chrome",version:r}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Er(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Er(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Er(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=Er(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function xd(n){return Object.prototype.toString.call(n)==="[object Object]"}function Zu(n){return xd(n)?Object.keys(n).reduce(function(e,t){const i=xd(n[t]),r=i?Zu(n[t]):n[t],s=i&&!Object.keys(r).length;return r===void 0||s?e:Object.assign(e,{[t]:r})},{}):n}function Ja(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Ja(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(r=>{Ja(n,n.get(r),t)})}))}function yd(n,e,t){const i=t?"outbound-rtp":"inbound-rtp",r=new Map;if(e===null)return r;const s=[];return n.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&s.push(o)}),s.forEach(o=>{n.forEach(a=>{a.type===i&&a.trackId===o.id&&Ja(n,a,r)})}),r}const Sd=Fc;function Ku(n,e){if(e.version>=64)return;const t=n&&n.navigator;if(!t.mediaDevices)return;const i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;const c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const d=typeof a[l]=="object"?a[l]:{ideal:a[l]};d.exact!==void 0&&typeof d.exact=="number"&&(d.min=d.max=d.exact);const u=function(h,p){return h?h+p.charAt(0).toUpperCase()+p.slice(1):p==="deviceId"?"sourceId":p};if(d.ideal!==void 0){c.optional=c.optional||[];let h={};typeof d.ideal=="number"?(h[u("min",l)]=d.ideal,c.optional.push(h),h={},h[u("max",l)]=d.ideal,c.optional.push(h)):(h[u("",l)]=d.ideal,c.optional.push(h))}d.exact!==void 0&&typeof d.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[u("",l)]=d.exact):["min","max"].forEach(h=>{d[h]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[u(h,l)]=d[h])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},r=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){const l=function(d,u,h){u in d&&!(h in d)&&(d[h]=d[u],delete d[u])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const d=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!d)){delete a.video.facingMode;let u;if(l.exact==="environment"||l.ideal==="environment"?u=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(h=>{h=h.filter(g=>g.kind==="videoinput");let p=h.find(g=>u.some(_=>g.label.toLowerCase().includes(_)));return!p&&h.length&&u.includes("back")&&(p=h[h.length-1]),p&&(a.video.deviceId=l.exact?{exact:p.deviceId}:{ideal:p.deviceId}),a.video=i(a.video),Sd("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return Sd("chrome: "+JSON.stringify(a)),c(a)},s=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){r(a,d=>{t.webkitGetUserMedia(d,c,u=>{l&&l(s(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){const a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return r(c,l=>a(l).then(d=>{if(l.audio&&!d.getAudioTracks().length||l.video&&!d.getVideoTracks().length)throw d.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return d},d=>Promise.reject(s(d))))}}}function Ju(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Qu(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=r=>{r.stream.addEventListener("addtrack",s=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):o={track:s.track};const a=new Event("track");a.track=s.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[r.stream],this.dispatchEvent(a)}),r.stream.getTracks().forEach(s=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.id):o={track:s};const a=new Event("track");a.track=s,a.receiver=o,a.transceiver={receiver:o},a.streams=[r.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Si(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function eh(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){const e=function(r,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=r.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:r}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const r=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,c){let l=r.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};const s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){s.apply(this,arguments);const c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],t.apply(this,[s]),s.getTracks().forEach(o=>{this._senders.push(e(this,o))})};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],i.apply(this,[s]),s.getTracks().forEach(o=>{const a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){const e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function th(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){const i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){const o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});const r=n.RTCPeerConnection.prototype.addTrack;r&&(n.RTCPeerConnection.prototype.addTrack=function(){const o=r.apply(this,arguments);return o._pc=this,o}),n.RTCRtpSender.prototype.getStats=function(){const o=this;return this._pc.getStats().then(a=>yd(a,o.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){const i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){const s=i.apply(this,[]);return s.forEach(o=>o._pc=this),s}),Si(n,"track",r=>(r.receiver._pc=r.srcElement,r)),n.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(o=>yd(o,s.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;const t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){const r=arguments[0];let s,o,a;return this.getSenders().forEach(c=>{c.track===r&&(s?a=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===r&&(o?a=!0:o=c),c.track===r)),a||s&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function nh(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(u=>u.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const a=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};const r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{const c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),r.apply(this,arguments)}}function ih(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return nh(n);const t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){const d=t.apply(this);return this._reverseStreams=this._reverseStreams||{},d.map(u=>this._reverseStreams[u.id])};const i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(d){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},d.getTracks().forEach(u=>{if(this.getSenders().find(p=>p.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[d.id]){const u=new n.MediaStream(d.getTracks());this._streams[d.id]=u,this._reverseStreams[u.id]=d,d=u}i.apply(this,[d])};const r=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(d){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},r.apply(this,[this._streams[d.id]||d]),delete this._reverseStreams[this._streams[d.id]?this._streams[d.id].id:d.id],delete this._streams[d.id]},n.RTCPeerConnection.prototype.addTrack=function(d,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const h=[].slice.call(arguments,1);if(h.length!==1||!h[0].getTracks().find(_=>_===d))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===d))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const g=this._streams[u.id];if(g)g.addTrack(d),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const _=new n.MediaStream([d]);this._streams[u.id]=_,this._reverseStreams[_.id]=u,this.addStream(_)}return this.getSenders().find(_=>_.track===d)};function s(l,d){let u=d.sdp;return Object.keys(l._reverseStreams||[]).forEach(h=>{const p=l._reverseStreams[h],g=l._streams[p.id];u=u.replace(new RegExp(g.id,"g"),p.id)}),new RTCSessionDescription({type:d.type,sdp:u})}function o(l,d){let u=d.sdp;return Object.keys(l._reverseStreams||[]).forEach(h=>{const p=l._reverseStreams[h],g=l._streams[p.id];u=u.replace(new RegExp(p.id,"g"),g.id)}),new RTCSessionDescription({type:d.type,sdp:u})}["createOffer","createAnswer"].forEach(function(l){const d=n.RTCPeerConnection.prototype[l],u={[l](){const h=arguments;return arguments.length&&typeof arguments[0]=="function"?d.apply(this,[g=>{const _=s(this,g);h[0].apply(null,[_])},g=>{h[1]&&h[1].apply(null,g)},arguments[2]]):d.apply(this,arguments).then(g=>s(this,g))}};n.RTCPeerConnection.prototype[l]=u[l]});const a=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:s(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!d._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(d._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let h;Object.keys(this._streams).forEach(p=>{this._streams[p].getTracks().find(_=>d.track===_)&&(h=this._streams[p])}),h&&(h.getTracks().length===1?this.removeStream(this._reverseStreams[h.id]):h.removeTrack(d.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Qa(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]})}function rh(n,e){e.version>102||Si(n,"negotiationneeded",t=>{const i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}const Md=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:rh,shimAddTrackRemoveTrack:ih,shimAddTrackRemoveTrackWithNative:nh,shimGetSendersWithDtmf:eh,shimGetUserMedia:Ku,shimMediaStream:Ju,shimOnTrack:Qu,shimPeerConnection:Qa,shimSenderReceiverGetStats:th},Symbol.toStringTag,{value:"Module"}));function sh(n,e){const t=n&&n.navigator;if(!t.mediaDevices)return;const i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(r,s,o){kc("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(r).then(s,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const r=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},s=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),r(o.audio,"autoGainControl","mozAutoGainControl"),r(o.audio,"noiseSuppression","mozNoiseSuppression")),s(o)},i&&i.prototype.getSettings){const o=i.prototype.getSettings;i.prototype.getSettings=function(){const a=o.apply(this,arguments);return r(a,"mozAutoGainControl","autoGainControl"),r(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){const o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),r(a,"autoGainControl","mozAutoGainControl"),r(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function Qx(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const r=new DOMException("getDisplayMedia without video constraints is undefined");return r.name="NotFoundError",r.code=8,Promise.reject(r)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function oh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function ec(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]}))}function ah(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){const[s,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[s||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((d,u)=>{c.set(u,Object.assign({},d,{type:t[d.type]||d.type}))})}return c}).then(o,a)}}function ch(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;const e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){const r=e.apply(this,[]);return r.forEach(s=>s._pc=this),r});const t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){const r=t.apply(this,arguments);return r._pc=this,r}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function lh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;const e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i}),Si(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function dh(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){kc("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function uh(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function hh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let r=arguments[1]&&arguments[1].sendEncodings;r===void 0&&(r=[]),r=[...r];const s=r.length>0;s&&r.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const o=t.apply(this,arguments);if(s){const{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=r,a.sendEncodings=r,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function fh(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;const t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){const r=t.apply(this,arguments);return"encodings"in r||(r.encodings=[].concat(this.sendEncodings||[{}])),r})}function ph(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function mh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}const bd=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:hh,shimCreateAnswer:mh,shimCreateOffer:ph,shimGetDisplayMedia:Qx,shimGetParameters:fh,shimGetStats:ah,shimGetUserMedia:sh,shimOnTrack:oh,shimPeerConnection:ec,shimRTCDataChannel:uh,shimReceiverGetStats:lh,shimRemoveStream:dh,shimSenderGetStats:ch},Symbol.toStringTag,{value:"Module"}));function gh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(r=>e.call(this,r,i)),i.getVideoTracks().forEach(r=>e.call(this,r,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...r){return r&&r.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);const r=t.getTracks();this.getSenders().forEach(s=>{r.includes(s.track)&&this.removeTrack(s)})})}}function _h(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(r=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(r))return;this._remoteStreams.push(r);const s=new Event("addstream");s.stream=r,this.dispatchEvent(s)})})}});const e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(r){r.streams.forEach(s=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(s)>=0)return;i._remoteStreams.push(s);const o=new Event("addstream");o.stream=s,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function vh(n){if(typeof n!="object"||!n.RTCPeerConnection)return;const e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,r=e.setLocalDescription,s=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,d){const u=arguments.length>=2?arguments[2]:arguments[0],h=t.apply(this,[u]);return d?(h.then(l,d),Promise.resolve()):h},e.createAnswer=function(l,d){const u=arguments.length>=2?arguments[2]:arguments[0],h=i.apply(this,[u]);return d?(h.then(l,d),Promise.resolve()):h};let a=function(c,l,d){const u=r.apply(this,[c]);return d?(u.then(l,d),Promise.resolve()):u};e.setLocalDescription=a,a=function(c,l,d){const u=s.apply(this,[c]);return d?(u.then(l,d),Promise.resolve()):u},e.setRemoteDescription=a,a=function(c,l,d){const u=o.apply(this,[c]);return d?(u.then(l,d),Promise.resolve()):u},e.addIceCandidate=a}function xh(n){const e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=r=>i(yh(r))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=(function(i,r,s){e.mediaDevices.getUserMedia(i).then(r,s)}).bind(e))}function yh(n){return n&&n.video!==void 0?Object.assign({},n,{video:Zu(n.video)}):n}function Sh(n){if(!n.RTCPeerConnection)return;const e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,r){if(i&&i.iceServers){const s=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?(kc("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,s.push(a)):s.push(i.iceServers[o])}i.iceServers=s}return new e(i,r)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function Mh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function bh(n){const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const r=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveAudio===!0&&!r&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const s=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function Eh(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}const Ed=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:Eh,shimCallbacksAPI:vh,shimConstraints:yh,shimCreateOfferLegacy:bh,shimGetUserMedia:xh,shimLocalStreamsAPI:gh,shimRTCIceServerUrls:Sh,shimRemoteStreamsAPI:_h,shimTrackEventTransceiver:Mh},Symbol.toStringTag,{value:"Module"}));function ey(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Go={exports:{}},Td;function ty(){return Td||(Td=1,(function(n){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
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
`},e.getDirection=function(t,i){const r=e.splitLines(t);for(let s=0;s<r.length;s++)switch(r[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[s].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const r=e.splitLines(t)[0].substring(2).split(" ");return{kind:r[0],port:parseInt(r[1],10),protocol:r[2],fmt:r.slice(3).join(" ")}},e.parseOLine=function(t){const r=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:r[0],sessionId:r[1],sessionVersion:parseInt(r[2],10),netType:r[3],addressType:r[4],address:r[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const i=e.splitLines(t);for(let r=0;r<i.length;r++)if(i[r].length<2||i[r].charAt(1)!=="=")return!1;return!0},n.exports=e})(Go)),Go.exports}var Th=ty();const Yi=ey(Th),ny=$h({__proto__:null,default:Yi},[Th]);function Is(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;const e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const r=new e(i),s=Yi.parseCandidate(i.candidate);for(const o in s)o in r||Object.defineProperty(r,o,{value:s[o]});return r.toJSON=function(){return{candidate:r.candidate,sdpMid:r.sdpMid,sdpMLineIndex:r.sdpMLineIndex,usernameFragment:r.usernameFragment}},r}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,Si(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function tc(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||Si(n,"icecandidate",e=>{if(e.candidate){const t=Yi.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Us(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});const t=function(a){if(!a||!a.sdp)return!1;const c=Yi.splitSections(a.sdp);return c.shift(),c.some(l=>{const d=Yi.parseMLine(l);return d&&d.kind==="application"&&d.protocol.indexOf("SCTP")!==-1})},i=function(a){const c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},r=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);const d=Yi.matchPrefix(a.sdp,"a=max-message-size:");return d.length>0?l=parseInt(d[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=i(arguments[0]),l=r(c),d=s(arguments[0],c);let u;l===0&&d===0?u=Number.POSITIVE_INFINITY:l===0||d===0?u=Math.max(l,d):u=Math.min(l,d);const h={};Object.defineProperty(h,"maxMessageSize",{get(){return u}}),this._sctp=h}return o.apply(this,arguments)}}function Ns(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(r,s){const o=r.send;r.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(r.readyState==="open"&&s.sctp&&l>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return o.apply(r,arguments)}}const i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){const s=i.apply(this,arguments);return t(s,this),s},Si(n,"datachannel",r=>(t(r.channel,r.target),r))}function nc(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;const e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=r=>{const s=r.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const o=new Event("connectionstatechange",r);s.dispatchEvent(o)}return r},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function ic(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(r){if(r&&r.sdp&&r.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=r.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&r instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:r.type,sdp:s}):r.sdp=s}return t.apply(this,arguments)}}function Fs(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function ks(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let r=arguments[0]||{};if(typeof r!="object"||r.type&&r.sdp)return t.apply(this,arguments);if(r={type:r.type,sdp:r.sdp},!r.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":r.type="offer";break;default:r.type="answer";break}return r.sdp||r.type!=="offer"&&r.type!=="answer"?t.apply(this,[r]):(r.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}const iy=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:ic,shimAddIceCandidateNullOrEmpty:Fs,shimConnectionState:nc,shimMaxMessageSize:Us,shimParameterlessSetLocalDescription:ks,shimRTCIceCandidate:Is,shimRTCIceCandidateRelayProtocol:tc,shimSendThrowTypeError:Ns},Symbol.toStringTag,{value:"Module"}));function ry({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=Fc,i=Jx(n),r={browserDetails:i,commonShim:iy,extractVersion:Er,disableLog:Zx,disableWarnings:Kx,sdp:ny};switch(i.browser){case"chrome":if(!Md||!Qa||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),r;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),r;t("adapter.js shimming chrome."),r.browserShim=Md,Fs(n,i),ks(n),Ku(n,i),Ju(n),Qa(n,i),Qu(n,i),ih(n,i),eh(n),th(n,i),rh(n,i),Is(n),tc(n),nc(n),Us(n,i),Ns(n,i),ic(n,i);break;case"firefox":if(!bd||!ec||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),r;t("adapter.js shimming firefox."),r.browserShim=bd,Fs(n,i),ks(n),sh(n,i),ec(n,i),ah(n,i),oh(n),dh(n),ch(n),lh(n),uh(n),hh(n,i),fh(n,i),ph(n,i),mh(n,i),Is(n),nc(n),Us(n,i),Ns(n,i);break;case"safari":if(!Ed||!e.shimSafari)return t("Safari shim is not included in this adapter release."),r;t("adapter.js shimming safari."),r.browserShim=Ed,Fs(n,i),ks(n),Sh(n),bh(n),vh(n),gh(n),_h(n),Mh(n),xh(n),Eh(n),Is(n),tc(n),Us(n,i),Ns(n,i),ic(n,i);break;default:t("Unsupported browser!");break}return r}const Cd=ry({window:typeof window>"u"?void 0:window});function Mi(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}class Ch{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],i=e.byteLength,r=Math.ceil(i/this.chunkedMTU);let s=0,o=0;for(;o<i;){const a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:s,data:c,total:r};t.push(l),o=a,s++}return this._dataCount++,t}}}function sy(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.byteLength;return t}const Vo=Cd.default||Cd,gr=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){const n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return Vo.browserDetails.browser}getVersion(){return Vo.browserDetails.version||0}isUnifiedPlanSupported(){const n=this.getBrowser(),e=Vo.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},oy=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),wh=()=>Math.random().toString(36).slice(2),wd={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class ay extends Ch{noop(){}blobToArrayBuffer(e,t){const i=new FileReader;return i.onload=function(r){r.target&&t(r.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=wd,this.browser=gr.getBrowser(),this.browserVersion=gr.getVersion(),this.pack=Yu,this.unpack=$u,this.supports=(function(){const t={browser:gr.isBrowserSupported(),webRTC:gr.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(wd),t.audioVideo=!0;let r;try{r=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!r.ordered;try{r.binaryType="blob",t.binaryBlob=!gr.isIOS}catch{}}catch{}finally{r&&r.close()}}catch{}finally{i&&i.close()}return t})(),this.validateId=oy,this.randomToken=wh}}const Gt=new ay,cy="PeerJS: ";class ly{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const i=[cy,...t];for(const r in i)i[r]instanceof Error&&(i[r]="("+i[r].name+") "+i[r].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var fe=new ly,Oc={},dy=Object.prototype.hasOwnProperty,Bt="~";function Nr(){}Object.create&&(Nr.prototype=Object.create(null),new Nr().__proto__||(Bt=!1));function uy(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function Ah(n,e,t,i,r){if(typeof t!="function")throw new TypeError("The listener must be a function");var s=new uy(t,i||n,r),o=Bt?Bt+e:e;return n._events[o]?n._events[o].fn?n._events[o]=[n._events[o],s]:n._events[o].push(s):(n._events[o]=s,n._eventsCount++),n}function Os(n,e){--n._eventsCount===0?n._events=new Nr:delete n._events[e]}function Nt(){this._events=new Nr,this._eventsCount=0}Nt.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)dy.call(t,i)&&e.push(Bt?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Nt.prototype.listeners=function(e){var t=Bt?Bt+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,s=i.length,o=new Array(s);r<s;r++)o[r]=i[r].fn;return o};Nt.prototype.listenerCount=function(e){var t=Bt?Bt+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Nt.prototype.emit=function(e,t,i,r,s,o){var a=Bt?Bt+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,d,u;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,r),!0;case 5:return c.fn.call(c.context,t,i,r,s),!0;case 6:return c.fn.call(c.context,t,i,r,s,o),!0}for(u=1,d=new Array(l-1);u<l;u++)d[u-1]=arguments[u];c.fn.apply(c.context,d)}else{var h=c.length,p;for(u=0;u<h;u++)switch(c[u].once&&this.removeListener(e,c[u].fn,void 0,!0),l){case 1:c[u].fn.call(c[u].context);break;case 2:c[u].fn.call(c[u].context,t);break;case 3:c[u].fn.call(c[u].context,t,i);break;case 4:c[u].fn.call(c[u].context,t,i,r);break;default:if(!d)for(p=1,d=new Array(l-1);p<l;p++)d[p-1]=arguments[p];c[u].fn.apply(c[u].context,d)}}return!0};Nt.prototype.on=function(e,t,i){return Ah(this,e,t,i,!1)};Nt.prototype.once=function(e,t,i){return Ah(this,e,t,i,!0)};Nt.prototype.removeListener=function(e,t,i,r){var s=Bt?Bt+e:e;if(!this._events[s])return this;if(!t)return Os(this,s),this;var o=this._events[s];if(o.fn)o.fn===t&&(!r||o.once)&&(!i||o.context===i)&&Os(this,s);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||r&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[s]=c.length===1?c[0]:c:Os(this,s)}return this};Nt.prototype.removeAllListeners=function(e){var t;return e?(t=Bt?Bt+e:e,this._events[t]&&Os(this,t)):(this._events=new Nr,this._eventsCount=0),this};Nt.prototype.off=Nt.prototype.removeListener;Nt.prototype.addListener=Nt.prototype.on;Nt.prefixed=Bt;Nt.EventEmitter=Nt;Oc=Nt;var bi={};Mi(bi,"ConnectionType",()=>Jn);Mi(bi,"PeerErrorType",()=>St);Mi(bi,"BaseConnectionErrorType",()=>rc);Mi(bi,"DataConnectionErrorType",()=>Bc);Mi(bi,"SerializationType",()=>Qs);Mi(bi,"SocketEventType",()=>qn);Mi(bi,"ServerMessageType",()=>Ut);var Jn=(function(n){return n.Data="data",n.Media="media",n})({}),St=(function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n})({}),rc=(function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n})({}),Bc=(function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n})({}),Qs=(function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n})({}),qn=(function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n})({}),Ut=(function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n})({});const Rh="1.5.5";class hy extends Oc.EventEmitter{constructor(e,t,i,r,s,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];const a=e?"wss://":"ws://";this._baseUrl=a+t+":"+i+r+"peerjs?key="+s}start(e,t){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+Rh),this._disconnected=!1,this._socket.onmessage=r=>{let s;try{s=JSON.parse(r.data),fe.log("Server message received:",s)}catch{fe.log("Invalid server message",r.data);return}this.emit(qn.Message,s)},this._socket.onclose=r=>{this._disconnected||(fe.log("Socket closed.",r),this._cleanup(),this._disconnected=!0,this.emit(qn.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),fe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){fe.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:Ut.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(qn.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class Ph{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===Jn.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const i=this.connection,r={ordered:!!e.reliable},s=t.createDataChannel(i.label,r);i._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){fe.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,i=this.connection.connectionId,r=this.connection.type,s=this.connection.provider;fe.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(fe.log(`Received ICE candidates for ${t}:`,o.candidate),s.socket.send({type:Ut.Candidate,payload:{candidate:o.candidate,type:r,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":fe.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(rc.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":fe.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(rc.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":fe.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},fe.log("Listening for data channel"),e.ondatachannel=o=>{fe.log("Received data channel");const a=o.channel;s.getConnection(t,i)._initializeDataChannel(a)},fe.log("Listening for remote stream"),e.ontrack=o=>{fe.log("Received remote stream");const a=o.streams[0],c=s.getConnection(t,i);if(c.type===Jn.Media){const l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){fe.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let i=!1;const r=this.connection.dataChannel;r&&(i=!!r.readyState&&r.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);fe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),fe.log("Set localDescription:",i,`for:${this.connection.peer}`);let r={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Jn.Data){const s=this.connection;r={...r,label:s.label,reliable:s.reliable,serialization:s.serialization}}t.socket.send({type:Ut.Offer,payload:r,dst:this.connection.peer})}catch(r){r!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(St.WebRTC,r),fe.log("Failed to setLocalDescription, ",r))}}catch(i){t.emitError(St.WebRTC,i),fe.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createAnswer();fe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),fe.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Ut.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(r){t.emitError(St.WebRTC,r),fe.log("Failed to setLocalDescription, ",r)}}catch(i){t.emitError(St.WebRTC,i),fe.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const i=this.connection.peerConnection,r=this.connection.provider;fe.log("Setting remote description",t);const s=this;try{await i.setRemoteDescription(t),fe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(o){r.emitError(St.WebRTC,o),fe.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){fe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),fe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(St.WebRTC,t),fe.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(fe.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return fe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){fe.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class Lh extends Oc.EventEmitter{emitError(e,t){fe.error("Error:",t),this.emit("error",new fy(`${e}`,t))}}class fy extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class Dh extends Lh{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}}var cc;const Lr=class Lr extends Dh{get type(){return Jn.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||Lr.ID_PREFIX+Gt.randomToken(),this._negotiator=new Ph(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{fe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{fe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){fe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,i=e.payload;switch(e.type){case Ut.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Ut.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:fe.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){fe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const r of i)this.handleMessage(r);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};cc=new WeakMap,cr(Lr,cc,Lr.ID_PREFIX="mc_");let $s=Lr;class py{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:i,port:r,path:s,key:o}=this._options,a=new URL(`${t}://${i}:${r}${s}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",Rh),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){fe.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==Gt.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===Gt.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw fe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var lc,dc;const fi=class fi extends Dh{get type(){return Jn.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||fi.ID_PREFIX+wh(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Ph(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{fe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{fe.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{fe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Bc.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case Ut.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Ut.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:fe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};lc=new WeakMap,dc=new WeakMap,cr(fi,lc,fi.ID_PREFIX="dc_"),cr(fi,dc,fi.MAX_BUFFERED_AMOUNT=8388608);let Ys=fi;class zc extends Ys{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Ys.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return fe.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Wo extends zc{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new Ch,this.serialization=Qs.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=$u(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];const r=sy(i.data);this._handleDataMessage({data:r})}}_send(e,t){const i=Yu(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);fe.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const i of t)this.send(i,!0)}}class my extends zc{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Qs.None}}class gy extends zc{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=Gt.chunkedMTU){this.emitError(Bc.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Qs.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var uc;const Dr=class Dr extends Lh{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:my,json:gy,binary:Wo,"binary-utf8":Wo,default:Wo},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:Gt.CLOUD_HOST,port:Gt.CLOUD_PORT,path:"/",key:Dr.DEFAULT_KEY,token:Gt.randomToken(),config:Gt.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Gt.CLOUD_HOST?this._options.secure=Gt.isSecure():this._options.host==Gt.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&fe.setLogFunction(this._options.logFunction),fe.logLevel=this._options.debug||0,this._api=new py(t),this._socket=this._createServerConnection(),!Gt.supports.audioVideo&&!Gt.supports.data){this._delayedAbort(St.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!Gt.validateId(i)){this._delayedAbort(St.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(r=>this._initialize(r)).catch(r=>this._abort(St.ServerError,r))}_createServerConnection(){const e=new hy(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(qn.Message,t=>{this._handleMessage(t)}),e.on(qn.Error,t=>{this._abort(St.SocketError,t)}),e.on(qn.Disconnected,()=>{this.disconnected||(this.emitError(St.Network,"Lost connection to server."),this.disconnect())}),e.on(qn.Close,()=>{this.disconnected||this._abort(St.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,i=e.payload,r=e.src;switch(t){case Ut.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Ut.Error:this._abort(St.ServerError,i.msg);break;case Ut.IdTaken:this._abort(St.UnavailableID,`ID "${this.id}" is taken`);break;case Ut.InvalidKey:this._abort(St.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Ut.Leave:fe.log(`Received leave message from ${r}`),this._cleanupPeer(r),this._connections.delete(r);break;case Ut.Expire:this.emitError(St.PeerUnavailable,`Could not connect to peer ${r}`);break;case Ut.Offer:{const s=i.connectionId;let o=this.getConnection(r,s);if(o&&(o.close(),fe.warn(`Offer received for existing Connection ID:${s}`)),i.type===Jn.Media){const c=new $s(r,this,{connectionId:s,_payload:i,metadata:i.metadata});o=c,this._addConnection(r,o),this.emit("call",c)}else if(i.type===Jn.Data){const c=new this._serializers[i.serialization](r,this,{connectionId:s,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(r,o),this.emit("connection",c)}else{fe.warn(`Received malformed connection type:${i.type}`);return}const a=this._getMessages(s);for(const c of a)o.handleMessage(c);break}default:{if(!i){fe.warn(`You received a malformed message from ${r} of type ${t}`);return}const s=i.connectionId,o=this.getConnection(r,s);o&&o.peerConnection?o.handleMessage(e):s?this._storeMessage(s,e):fe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){fe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(St.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){fe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(St.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){fe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const r=new $s(e,this,{...i,_stream:t});return this._addConnection(e,r),r}_addConnection(e,t){fe.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const i=this._connections.get(e);if(!i)return null;for(const r of i)if(r.connectionId===t)return r;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){fe.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(fe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const i of t)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;fe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)fe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)fe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(St.ServerError,t))}};uc=new WeakMap,cr(Dr,uc,Dr.DEFAULT_KEY="peerjs");let sc=Dr;var Ad=sc;const _y="ccwd-",Rd="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",vy="https://bperussina.github.io/MyGames/car-crashing-with-dashing/index.html",xy={host:"0.peerjs.com",port:443,path:"/",secure:!0,debug:0},yy={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:global.stun.twilio.com:3478"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}]},Xo=12,Sy=2e3,Pd=15e3;function My(n=6){let e="";for(let t=0;t<n;t++)e+=Rd[Math.floor(Math.random()*Rd.length)];return e}function Ih(n){const e=new URL(vy);return e.searchParams.set("room",n.toUpperCase()),e.toString()}function Ld(n){return`${_y}${n.toUpperCase()}`}function by(n){return new Promise(e=>setTimeout(e,n))}function Dd(n=void 0){return{...xy,...n?{id:n}:{},config:yy}}function Id(){let n=null,e=null,t=null,i=null,r=new Map,s=null,o=null,a=null;function c(b){o==null||o(b)}function l(){for(const[,b]of r)try{b.close()}catch{}if(r.clear(),n){try{n.destroy()}catch{}n=null}}function d(b,E=null){const R=JSON.stringify(b);for(const[,S]of r)S!==E&&S.open&&S.send(R)}function u(b){r.set(b.peer,b),a==null||a(r.size+(e==="host"?1:0)),b.on("data",E=>{try{const R=typeof E=="string"?JSON.parse(E):E;s==null||s(R,b.peer)}catch{}}),b.on("close",()=>{r.delete(b.peer),a==null||a(r.size+(e==="host"?1:0)),s==null||s({t:"leave",id:b.peer})})}function h(b){return new Promise((E,R)=>{const S=setTimeout(()=>{R(Object.assign(new Error("timeout"),{type:"network"}))},Pd);b.once("open",y=>{clearTimeout(S),E(y)}),b.once("error",y=>{clearTimeout(S),R(y)})})}function p(b){return t=b.toUpperCase(),e="host",i=Ld(t),c("Opening your room (works on any internet)…"),new Promise((E,R)=>{l(),n=new Ad(i,Dd(i)),n.on("connection",S=>{S.on("open",()=>{u(S),S.send(JSON.stringify({t:"welcome",host:i,code:t})),s==null||s({t:"join",id:S.peer})})}),h(n).then(()=>{c(`Room ${t} ready — share your link!`),E({code:t,link:Ih(t),role:"host",id:i})}).catch(S=>{c(f(S,"host")),l(),R(S)})})}function g(b){t=b.toUpperCase(),e="client";const E=Ld(t);return new Promise((R,S)=>{l(),n=new Ad(Dd()),h(n).then(y=>{i=y;const A=n.connect(E,{reliable:!0}),O=setTimeout(()=>{S(Object.assign(new Error("connect failed"),{type:"peer-unavailable"}))},Pd);A.on("open",()=>{clearTimeout(O),u(A),c("You're in the game!"),R({code:t,role:"client",id:i})}),A.on("error",()=>{clearTimeout(O),S(Object.assign(new Error("connect failed"),{type:"peer-unavailable"}))})}).catch(y=>{S(y)})})}function _(b){const E=(b==null?void 0:b.type)??"";return E==="peer-unavailable"||E==="network"||E==="disconnected"}async function m(b){t=b.toUpperCase(),e="client",c(`Joining ${t}…`);let E=null;for(let R=1;R<=Xo;R++)try{return R>1&&c(`Still connecting… (${R}/${Xo}) — ask host to keep the game open`),await g(b)}catch(S){if(E=S,l(),R<Xo&&_(S)){await by(Sy);continue}throw c(f(S,"join")),S}throw c(f(E,"join")),E}function f(b,E){const R=(b==null?void 0:b.type)??"";return R==="peer-unavailable"?E==="join"?"Room not open yet — ask host to tap Generate Code and keep the game open.":"That room code is taken — tap Generate Code again.":R==="unavailable-id"?"That room code is taken — tap Generate Code again.":R==="network"||R==="disconnected"?"Internet hiccup — check Wi‑Fi or data and try again.":R==="browser-incompatible"?"Try Chrome, Safari, or Edge for multiplayer.":E==="join"?"Could not connect — make sure the host shared the link and left the game open.":`Could not open room (${R||"error"}) — try again.`}function w(b){if(e==="host")d(b);else{const E=r.values().next().value;E!=null&&E.open&&E.send(JSON.stringify(b))}}function T(b){if(e==="host")s==null||s(b,i);else{const E=r.values().next().value;E!=null&&E.open&&E.send(JSON.stringify(b))}}function v(b,E){e==="host"&&d(E,r.get(b))}function P(){l(),e=null,t=null,i=null}return{host:p,join:m,send:w,sendToHost:T,relay:v,close:P,get role(){return e},get code(){return t},get id(){return i},set onMessage(b){s=b},set onStatus(b){o=b},set onPeerCount(b){a=b}}}const eo="ccwd-player-name",Ud="ccwd-host-room";let Qe=null,Xe=null,vs=null,Xn=new Map;function $n(){if(!Qe)return"Player";const n=Qe.querySelector("#player-name"),e=n==null?void 0:n.value.trim();if(e)return e;try{return localStorage.getItem(eo)||"Player"}catch{return"Player"}}function Nd(n){try{localStorage.setItem(eo,n)}catch{}}function Ey(n){vs=n,Qe=document.createElement("div"),Qe.id="multiplayer-lobby",Qe.innerHTML=`
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
  `,document.body.appendChild(Qe);const e=Qe.querySelector("#lobby-status"),t=Qe.querySelector("#host-info"),i=Qe.querySelector("#room-code"),r=Qe.querySelector("#share-link"),s=Qe.querySelector("#player-name"),o=Qe.querySelector("#lobby-people-list"),a=Qe.querySelector("#btn-enter");try{const P=localStorage.getItem(eo);P&&(s.value=P)}catch{}function c(P){e&&(e.textContent=P)}function l(P){if(o){if(o.innerHTML="",!P.length){const b=document.createElement("li");b.className="lobby-person empty",b.textContent="Nobody here yet",o.appendChild(b);return}for(const b of P){const E=document.createElement("li");E.className="lobby-person",E.textContent=b.you?`${b.name} (you)`:b.name,o.appendChild(E)}}}function d(){return[{id:"local",name:$n(),you:!0}]}function u(){if(!(Xe!=null&&Xe.id))return d();const P=[{id:Xe.id,name:$n(),you:!0}];for(const[b,E]of Xn)P.push({id:b,name:E,you:!1});return P}function h(){(Xe==null?void 0:Xe.role)==="host"?l(u()):(Xe==null?void 0:Xe.role)==="client"||l(d())}function p(){if((Xe==null?void 0:Xe.role)!=="host")return;const P=u();l(P),Xe.send({t:"roster",people:P})}function g(P){Xe=P,Xn.clear(),Xe.onMessage=(b,E)=>{if(Xe.role==="host"&&(b.t==="hello"&&E&&(Xn.set(E,b.name||"Player"),p(),c(`${b.name||"Someone"} joined the lobby`)),b.t==="setName"&&E&&(Xn.set(E,b.name||"Player"),p()),b.t==="leave")){const R=E||b.id;R&&(Xn.delete(R),p(),c("Someone left the lobby"))}b.t==="roster"&&Array.isArray(b.people)&&l(b.people)},Xe.onPeerCount=()=>h()}function _(){const P=$n();if(Nd(P),!Xe){h();return}Xe.role==="host"?p():Xe.role==="client"&&Xe.send({t:"setName",name:P})}function m(){a.hidden=!1}s.addEventListener("input",()=>{_()}),Qe.querySelector("#btn-generate").addEventListener("click",async()=>{try{Xe&&Xe.close(),Xn.clear();const P=Id();P.onStatus=c,g(P);const b=My(),E=await P.host(b);i.textContent=E.code,r.value=E.link,t.hidden=!1;try{sessionStorage.setItem(Ud,E.code)}catch{}history.replaceState(null,"",`?room=${encodeURIComponent(E.code)}`),_(),m(),c("Share the link — friends appear in the lobby when they join.")}catch{c("Could not create room — try again.")}}),Qe.querySelector("#btn-copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(r.value),c("Link copied! Send it to your family.")}catch{r.select(),c("Select the link and copy it.")}}),Qe.querySelector("#btn-join").addEventListener("click",()=>f()),Qe.querySelector("#join-code").addEventListener("keydown",P=>{P.key==="Enter"&&f()});async function f({fromLink:P=!1}={}){const b=Qe.querySelector("#join-code").value.trim();if(!b){c("Type a room code first.");return}try{Xe&&Xe.close(),Xn.clear();const E=Id();E.onStatus=c,g(E),await E.join(b),E.send({t:"hello",name:$n()}),m(),c("You're in the game!"),P&&setTimeout(()=>w(),500)}catch{}}function w(){Xe&&(Nd($n()),$o(),vs==null||vs({room:Xe,isHost:Xe.role==="host",playerName:$n()}))}a.addEventListener("click",w);function T(){Xe&&Xe.close(),Xe=null,Xn.clear(),a.hidden=!0,t.hidden=!0;try{sessionStorage.removeItem(Ud)}catch{}$o(),h()}Qe.querySelector("#lobby-x").addEventListener("click",T);const v=new URLSearchParams(window.location.search).get("room");return v&&(Qe.querySelector("#join-code").value=v),$o(),h(),Qe}function $o(){Qe&&Qe.classList.remove("open")}function Uh(){if(Qe){Qe.classList.add("open");const n=Qe.querySelector("#player-name");if(n)try{const t=localStorage.getItem(eo);t&&!n.value&&(n.value=t)}catch{}const e=Qe.querySelector("#lobby-people-list");if(e&&!Xe){$n(),e.innerHTML="";const t=document.createElement("li");t.className="lobby-person",t.textContent=`${$n()} (you)`,e.appendChild(t)}}}function Fd(){return(Qe==null?void 0:Qe.classList.contains("open"))??!1}const kd=[15680580,16347926,15381256,2278750,440020,11032055,15485081];function Ty(n){const e=new Map;let t=0;function i(){const l=kd[t%kd.length];return t+=1,l}function r(l){if(e.has(l))return e.get(l);const d=i(),u=Hu(0,0,d);u.mesh.userData.remoteId=l,n.add(u.mesh);const h={player:u,target:{x:0,z:0,facing:0,walkPhase:0,isMoving:!1}};return e.set(l,h),h}function s(l,d){const u=r(l);Object.assign(u.target,d);const h=u.player;h.x=d.x,h.z=d.z,h.facing=d.facing??0,h.walkPhase=d.walkPhase??0,h.isMoving=!!d.isMoving,tr(h)}function o(l){const d=e.get(l);d&&(n.remove(d.player.mesh),e.delete(l))}function a(l){const d=Math.min(1,l*12);for(const[,u]of e){const h=u.player,p=u.target;h.x+=(p.x-h.x)*d,h.z+=(p.z-h.z)*d,h.facing+=(p.facing-h.facing)*d,h.walkPhase=p.walkPhase,h.isMoving=p.isMoving,tr(h)}}function c(){for(const l of[...e.keys()])o(l)}return{applyPose:s,remove:o,lerpAll:a,clear:c,count:()=>e.size}}const Nh="ccwd-design-sketch",Gi=28,Fh=[{name:"Stainless",hex:"#b8bdc4"},{name:"Black",hex:"#1a1a1a"},{name:"White",hex:"#ffffff"},{name:"Gray",hex:"#6b7280"},{name:"Red",hex:"#dc2626"},{name:"Blue",hex:"#2563eb"},{name:"Green",hex:"#16a34a"},{name:"Yellow",hex:"#eab308"}];let Mt=null,xt=null,at=null,Fr=!1,_r="draw",Bs=Fh[0].hex,xs=!1,_i=null;function zs(){if(xt)try{localStorage.setItem(Nh,xt.toDataURL("image/png"))}catch{}}function Cy(){if(!(!xt||!at))try{const n=localStorage.getItem(Nh);if(!n)return;const e=new Image;e.onload=()=>{at.drawImage(e,0,0,xt.width,xt.height)},e.src=n}catch{}}function kh(){if(!xt||!at)return;const n=Math.min(window.devicePixelRatio||1,2),e=window.innerWidth,t=window.innerHeight;xt.width=Math.floor(e*n),xt.height=Math.floor(t*n),xt.style.width=`${e}px`,xt.style.height=`${t}px`,at.setTransform(n,0,0,n,0,0),at.fillStyle="#ffffff",at.fillRect(0,0,e,t),Cy()}function Od(n){return Math.round(n/Gi)*Gi}function Bd(n,e){const t=xt.getBoundingClientRect();return{x:n-t.left,y:e-t.top}}function wy(n,e){const t=Od(n),i=Od(e);at.fillStyle=Bs,at.fillRect(t,i,Gi,Gi),at.strokeStyle="rgba(0,0,0,0.12)",at.lineWidth=1,at.strokeRect(t+.5,i+.5,Gi-1,Gi-1)}function zd(){zs(),Oh(),_i==null||_i()}function Hd(){return Fr}function Oh(){Mt&&(Fr=!1,Mt.hidden=!0)}function Ay(){Mt&&(Fr=!0,Mt.hidden=!1,kh())}function Ry(){return new URLSearchParams(window.location.search).has("draw")}function Py(n,e){_i=n,Mt=document.createElement("div"),Mt.id="draw-paper",Mt.innerHTML=`
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
  `,document.body.appendChild(Mt),xt=Mt.querySelector("#draw-paper-canvas"),at=xt.getContext("2d");const t=Mt.querySelector("#draw-colors");for(const c of Fh){const l=document.createElement("button");l.type="button",l.className="draw-swatch",l.style.background=c.hex,l.title=c.name,l.dataset.color=c.hex,c.hex===Bs&&l.classList.add("active"),l.addEventListener("click",()=>{Bs=c.hex,t.querySelectorAll(".draw-swatch").forEach(d=>d.classList.remove("active")),l.classList.add("active"),_r==="erase"&&i("draw")}),t.appendChild(l)}function i(c){_r=c,Mt.querySelectorAll(".draw-tool").forEach(l=>{l.classList.toggle("active",l.dataset.tool===c)})}Mt.querySelectorAll(".draw-tool").forEach(c=>{c.addEventListener("click",()=>i(c.dataset.tool))}),Mt.querySelector("#draw-clear").addEventListener("click",()=>{at.fillStyle="#ffffff",at.fillRect(0,0,xt.width,xt.height),zs()}),Mt.querySelector("#draw-play-btn").addEventListener("click",zd),Mt.querySelector("#draw-multi-btn").addEventListener("click",()=>{Fr=!1,Mt.hidden=!0,e?e():_i==null||_i()});const r=Mt.querySelector("#draw-undo-input");r.addEventListener("keydown",c=>{c.key==="Enter"&&r.value.trim().toLowerCase()==="undo"&&zd()});function s(c){if(c.target.closest(".draw-toolbar, .draw-footer"))return;c.preventDefault(),xs=!0;const l=Bd(c.clientX,c.clientY);_r==="cube"?(wy(l.x,l.y),zs()):_r==="erase"?(at.strokeStyle="#ffffff",at.lineWidth=20,at.lineCap="round",at.beginPath(),at.moveTo(l.x,l.y)):(at.strokeStyle=Bs,at.lineWidth=4,at.lineCap="round",at.beginPath(),at.moveTo(l.x,l.y)),xt.setPointerCapture(c.pointerId)}function o(c){if(!xs)return;const l=Bd(c.clientX,c.clientY);_r!=="cube"&&(at.lineTo(l.x,l.y),at.stroke())}function a(c){if(xs){xs=!1,zs();try{xt.releasePointerCapture(c.pointerId)}catch{}}}return xt.addEventListener("pointerdown",s),xt.addEventListener("pointermove",o),xt.addEventListener("pointerup",a),xt.addEventListener("pointercancel",a),window.addEventListener("resize",()=>{Fr&&kh()}),Mt.hidden=!0,Mt}const Gd="ccwd-build",oc="ccwd-show-update",Ly="MEGA UPDATE",Dy="The game just got way bigger.",Iy=[{icon:"🚗",title:"Block-panel cars",desc:"Every car is now chunky Roblox / BeamNG-style panels."},{icon:"💥",title:"Parts fly off",desc:"Headlights, hood, doors, and wheels break loose in crashes."},{icon:"🏙️",title:"Huge city + countryside",desc:"Drive through the city gates into infinite green hills."},{icon:"📊",title:"Damage HUD",desc:"Live bars for engine, body, hood, glass, and wheels."},{icon:"🖱️",title:"Mouse-look driving",desc:"Look around while you drive and smash buildings."},{icon:"🔄",title:"Auto-updates",desc:"Reload and you always get the newest version — like right now."}];let Tr=null;function Vd(n){return`ccwd-seen-${n}`}async function Uy(){const n=await fetch(`./version.json?_=${Date.now()}`,{cache:"no-store"});return n.ok?n.json():null}function Wd(){const n=new URL(location.href);n.searchParams.has("__v")&&(n.searchParams.delete("__v"),history.replaceState(null,"",n.pathname+n.search+n.hash))}function Ny(n){const e=document.createElement("div");return e.id="update-splash",e.innerHTML=`
    <div class="update-bg"></div>
    <div class="update-rays"></div>
    <div class="update-panel">
      <p class="update-eyebrow">NEW VERSION LOADED</p>
      <h1 class="update-headline">${Ly}</h1>
      <p class="update-tagline">${Dy}</p>
      <p class="update-version">Build <strong>${n}</strong></p>
      <ul class="update-features">
        ${Iy.map(t=>`
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
  `,e}function Fy(n){return new Promise(e=>{const t=n.querySelector("#update-splash-dismiss"),i=()=>{n.classList.add("update-splash-out"),setTimeout(()=>{n.remove(),Tr=null,e()},420)};t.addEventListener("click",i,{once:!0});const r=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),window.removeEventListener("keydown",r),i())};window.addEventListener("keydown",r)})}async function ky(){if(location.hostname==="localhost"||location.hostname==="127.0.0.1")return;let n;try{n=await Uy()}catch{return}const e=n==null?void 0:n.v;if(!e)return;const t=localStorage.getItem(oc)==="1",i=localStorage.getItem(Vd(e))==="1";if(!t&&i){localStorage.setItem(Gd,e),Wd();return}localStorage.removeItem(oc),localStorage.setItem(Gd,e),localStorage.setItem(Vd(e),"1"),Wd(),Tr=Ny(e),document.body.appendChild(Tr),requestAnimationFrame(()=>Tr.classList.add("update-splash-in")),await Fy(Tr)}function Oy(){localStorage.setItem(oc,"1")}const Yo="ccwd-build";function By(){const n=location.hostname;if(n==="localhost"||n==="127.0.0.1")return;const e=async()=>{try{const t=await fetch(`./version.json?_=${Date.now()}`,{cache:"no-store"});if(!t.ok)return;const{v:i}=await t.json();if(!i)return;const r=localStorage.getItem(Yo);if(r&&r!==i){Oy(),localStorage.setItem(Yo,i),location.reload();return}r||localStorage.setItem(Yo,i)}catch{}};e(),setInterval(e,180*1e3)}ky().then(()=>{By()});const zy="car crashing with dashing",Hy=5,Xd=7,Gy=.05,Vy=new URLSearchParams(window.location.search).has("teleport"),{canvas:kt,ctx:Ce}=Yh();kt.id="title-canvas";kt.style.position="fixed";kt.style.inset="0";kt.style.zIndex="1";const tn=new jh(document.body),un=gf();un.onExit(()=>zh());const gt=Fv(),je=Hu(0,0);zv(gt.scene,je);const Hs=Ty(gt.scene);let cn=Ry()?"drawPaper":"title",vr=Vy?1.8:0,ys=0,Ss=0,qo=0,Ar=!1,Rr=!1,Ms=!1,ac=0,en=null,Bh=!1,jo=0,Vi=1,Zo=!1,Ko=!1,Jo=!1,et=null,yn=!1,qi=0,$d=0,Cr=0,Hc=[],Yd=!1,qd={},wr=0;const Pr=document.getElementById("action-toast"),jn=document.getElementById("controls-hud"),kr=document.getElementById("damage-hud"),hi=document.getElementById("room-banner");nu(()=>qs(jn,{driving:yn}));Hv($y);Py(()=>jd(),()=>jd(!0));function jd(n=!1){cn="title",kt.style.display="block",Oh(),n&&Uh()}cn==="drawPaper"&&(kt.style.display="none",Ay());Ey(({room:n,isHost:e})=>{en=n,Bh=e,je.x=0,je.z=0,tr(je),Wy(n),cn="world",Hh(),Gs(),to("You're in the game!")});function Wy(n){n.onMessage=(e,t)=>{e.t==="pose"&&e.id&&e.id!==n.id&&(n.role==="host"&&n.relay(t,e),Hs.applyPose(e.id,e)),e.t==="join"&&e.id&&(Hs.applyPose(e.id,{x:0,z:4,facing:0,walkPhase:0,isMoving:!1}),Vi+=1,Gs(),to("Someone joined!")),e.t==="leave"&&e.id&&(Hs.remove(e.id),Vi=Math.max(1,Vi-1),Gs())},n.onPeerCount=e=>{Vi=e,Gs()}}function Gs(){if(!(!hi||!(en!=null&&en.code)))if(Bh){const n=Ih(en.code);hi.innerHTML=`Room <strong>${en.code}</strong> · ${Vi} player(s) · <a href="${n}" target="_blank" rel="noopener">Share link</a>`,hi.hidden=!1}else hi.textContent=`Room ${en.code} · ${Vi} player(s)`,hi.hidden=!1}function Xy(){en!=null&&en.id&&en.send({t:"pose",id:en.id,x:je.x,z:je.z,facing:je.facing,walkPhase:je.walkPhase,isMoving:je.isMoving})}function $y(n){et&&(kx(gt.scene,et),et=null,yn=!1,je.inVehicle=null,je.mesh.visible=!0),et=Xx(je,n,gt.clampPosition,gt.envTex),Fx(gt.scene,et),yn=!0,un.setDriving(!0),Ox(je,et),qs(jn,{driving:!0}),ru(kr,!0),pc(kr,et)}function Yy(n){if(!(!et||qi>0))if(Ex(et,gt.scene,n,Hc),pc(kr,et),Dc(n)){Vx(et,n);const e=Math.abs(n)>=38;Cr=e?.5:.22,qi=e?.55:.4}else Math.abs(n)>5&&(et.speed*=.55,qi=.12)}function zh(){!et||!yn||(Bx(je,et),yn=!1,un.setDriving(!1),tr(je),gt.updateCamera(je.x,je.z,je.facing),qs(jn,{driving:!1}),ru(kr,!1),to("Exited vehicle"))}function qy(){return ef(tn)}function Zd(n,e){return{throttle:Math.max(n.throttle??0,e.throttle??0),brake:Math.max(n.brake??0,e.brake??0),reverse:Math.max(n.reverse??0,e.reverse??0),steer:Math.abs(n.steer)>Math.abs(e.steer)?n.steer:e.steer}}function Kd(n){var i,r;if(!n||cn!=="world"||Qo()||$a())return;const{fired:e,prevPressed:t}=nf(n,fc(),qd);qd=t;for(const s of e)to(s.action);(i=n.buttons[9])!=null&&i.pressed&&!Zo&&(Zo=!0,iu()),(r=n==null?void 0:n.buttons[9])!=null&&r.pressed||(Zo=!1)}function jy(n,e){const t=Math.max(0,Math.min(1,(e-n.topY)/(n.bottomY-n.topY)));return n.topW*2+(n.bottomW-n.topW*2)*t}function Zy(n,e,t){const i=e*.56,r=jy(t,i),s=Math.min(r*.82,n*.78,420),o=s*.34;return{x:t.cx-s/2,y:i-o/2,w:s,h:o,cx:t.cx,cy:i}}function Ky(n){const t=n.h*.72,i=n.w*.92,r=n.cy+n.h/2+14+t/2;return{x:n.cx-i/2,y:r-t/2,w:i,h:t,cx:n.cx,cy:r}}function Jy(n,e){const t=kt.getBoundingClientRect(),i=kt.width/t.width,r=kt.height/t.height;return{x:(n-t.left)*i,y:(e-t.top)*r}}function Jd(n,e,t){return n>=t.x&&n<=t.x+t.w&&e>=t.y&&e<=t.y+t.h}function Qd(n,e,t,i,r,s){const o=1+Math.sin(i)*.04+(r?.05:0)+(s?-.03:0),a=n.w*o,c=n.h*o,l=n.cx-a/2,d=n.cy-c/2,u=c*.28;Ce.save(),Ce.shadowColor="rgba(0,0,0,0.45)",Ce.shadowBlur=24,Ce.shadowOffsetY=8;const h=Ce.createLinearGradient(l,d,l,d+c);h.addColorStop(0,s?t.pressedTop:t.top),h.addColorStop(1,s?t.pressedBottom:t.bottom),Ce.fillStyle=h,Ce.beginPath(),Ce.roundRect(l,d,a,c,u),Ce.fill(),Ce.shadowBlur=0,Ce.shadowOffsetY=0,Ce.strokeStyle=t.stroke,Ce.lineWidth=5,Ce.stroke(),bs(Ce,e,n.cx,n.cy,{size:Math.floor(c*.38),color:t.text}),Ce.restore()}function Qy(){cn="comingSoon",ac=Hy,je.x=0,je.z=0,tr(je),Hh()}function eS(n,e){const t=Jy(tn.pointer.x,tn.pointer.y);Ar=Jd(t.x,t.y,n),Rr=Jd(t.x,t.y,e),kt.style.cursor=Ar||Rr?"pointer":"default",tn.pointer.down&&!Ms&&(Ar?(Qy(),Ms=!0):Rr&&(Uh(),Ms=!0)),tn.pointer.down||(Ms=!1)}function eu(n,e,t=1){const i=n/2,r=e*.42,s=e,o=n*.08*t,a=n*.92;return{cx:i,topY:r,bottomY:s,topW:o,bottomW:a}}function tS(n,e,t){if(t<=0)return eu(n,e,t);const i=eu(n,e,t),{cx:r,topY:s,bottomY:o,topW:a,bottomW:c}=i;Ce.save(),Ce.globalAlpha=Math.min(1,t);const l=Ce.createLinearGradient(0,s,0,o);return l.addColorStop(0,"#334155"),l.addColorStop(1,"#1e293b"),Ce.fillStyle=l,Ce.beginPath(),Ce.moveTo(r-a,s),Ce.lineTo(r+a,s),Ce.lineTo(r+c/2,o),Ce.lineTo(r-c/2,o),Ce.closePath(),Ce.fill(),Ce.strokeStyle="rgba(250,204,21,0.85)",Ce.lineWidth=3,Ce.setLineDash([18,16]),Ce.beginPath(),Ce.moveTo(r,s),Ce.lineTo(r,o),Ce.stroke(),Ce.setLineDash([]),Ce.fillStyle="rgba(15,23,42,0.35)",Ce.fillRect(0,e*.72,n,e*.28),Ce.restore(),i}function to(n){wr=2,Pr&&(Pr.textContent=n,Pr.classList.add("show"))}function Hh(){kt.style.display="none",gt.show(),Yd||(bv(gt.renderer.domElement),Yd=!0),zi(!0),Gu(),un.setVisible(!0),un.setDriving(yn),yr(jn,!0,{driving:yn})}function nS(n){const e=Kh();let{mx:t,mz:i}=Jh(e);const r=Qh(tn),s=un.readMove();t+=r.mx+s.mx,i+=r.mz+s.mz;const o=Math.hypot(t,i);if(o>1&&(t/=o,i/=o),qi>0&&(qi=Math.max(0,qi-n)),Cr>0&&(Cr=Math.max(0,Cr-n*2.8)),$d+=n,yn&&et){const d=tf(e),u=qy(),h=un.readDrive(),p=Zd(Zd(d,u),h),{impactSpeed:g,wallHit:_}=Wx(et,p,n,gt.clampPosition);if(gt.city.checkCarCollision(et.x,et.z)||_){const f=g;Yy(f),Dc(f)||(et.x=et.prevX,et.z=et.prevZ),Xu(et)}Gx(et,$d,n),Wu(Hc,n),pc(kr,et),gt.updateWorld(et.x,et.z),gt.updateDrivingCamera(et.x,et.z,et.rotY,Cr),Kd(e),tn.isPressed("e")&&!Jo&&(Jo=!0,zh()),tn.isPressed("e")||(Jo=!1);return}Bv(je,t,i,n);const a=je.x+t*Xd*n,c=je.z+i*Xd*n,l=gt.clampPosition(a,c);je.x=l.x,je.z=l.z,tr(je),gt.updateWorld(je.x,je.z),gt.updateCamera(je.x,je.z,je.facing),Hs.lerpAll(n),jo+=n,jo>=Gy&&(jo=0,Xy()),Kd(e),tn.isPressed("m")&&!Ko&&(Ko=!0,iu()),tn.isPressed("m")||(Ko=!1)}function iS(n){const{width:e,height:t}=kt;if(!((Qo()||$a()||Fd()||Hd())&&(yr(jn,!1),Qo()||Hd()))){if(wr>0&&(wr=Math.max(0,wr-n),wr===0&&Pr&&Pr.classList.remove("show")),vr>0){vr=Math.max(0,vr-n);const i=vr>.35?1-(1.8-vr)/1.45:0;kt.style.display="block",gt.hide(),zi(!1),un.setVisible(!1),Zc(Ce,i>.2?"#e0f2fe":"#22c55e"),i>.05&&(Ce.fillStyle=`rgba(255,255,255,${i*.75})`,Ce.fillRect(0,0,e,t)),bs(Ce,"TELEPORTING...",e/2,t*.38,{color:"#0f172a",size:36});return}if(cn==="drawPaper"){kt.style.display="none",gt.hide(),zi(!1),un.setVisible(!1);return}if(cn==="title"){kt.style.display="block",gt.hide(),zi(!1),un.setVisible(!1),yr(jn,!1),hi&&(hi.hidden=!0),ys=Math.min(1,ys+n*1.2),Ss=Math.min(1,Ss+n*.55),qo+=n*4,Zc(Ce,"#22c55e");const i=tS(e,t,Ss),r=Zy(e,t,i),s=Ky(r);if(Ce.globalAlpha=ys,bs(Ce,zy,e/2,t*.22,{color:"#14532d",size:44}),bs(Ce,"The best game ever — realism incoming.",e/2,t*.3,{color:"#166534",size:18}),Ce.globalAlpha=1,!Fd()){eS(r,s);const o=Math.min(1,.35+Ss*.65)*ys;Ce.globalAlpha=o,Qd(r,"PLAY",{top:"#fde047",bottom:"#facc15",pressedTop:"#facc15",pressedBottom:"#eab308",stroke:"#854d0e",text:"#422006"},qo,Ar,tn.pointer.down&&Ar),Qd(s,"MULTIPLAYER",{top:"#4ade80",bottom:"#22c55e",pressedTop:"#22c55e",pressedBottom:"#16a34a",stroke:"#14532d",text:"#14532d"},qo+.5,Rr,tn.pointer.down&&Rr),Ce.globalAlpha=1}return}(cn==="comingSoon"||cn==="world")&&(gt.renderer.domElement.style.boxShadow="",Wu(Hc,n),$a()||nS(n),cn==="comingSoon"?(ac-=n,ac<=0&&(cn="world"),yr(jn,!0,{driving:yn}),zi(!0),un.setVisible(!1)):(zi(!0),yr(jn,!0,{driving:yn})),gt.render())}}window.addEventListener("gamepadconnected",()=>{});Zh(iS);
