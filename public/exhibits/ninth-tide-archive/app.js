(()=>{var No="184";var Su=0,Pc=1,bu=2;var Hr=1,Eu=2,Ys=3,hi=0,Vt=1,nn=2,sn=0,Zi=1,it=2,Ic=3,Lc=4,Tu=5;var Ri=100,wu=101,Au=102,Cu=103,Ru=104,Pu=200,Iu=201,Lu=202,Du=203,Za=204,Ja=205,Nu=206,Uu=207,Fu=208,Ou=209,Bu=210,zu=211,Vu=212,Hu=213,ku=214,$a=0,Ka=1,Qa=2,Ji=3,ja=4,eo=5,to=6,no=7,Dc=0,Gu=1,Wu=2,Rn=0,kr=1,Gr=2,Wr=3,is=4,Xr=5,qr=6,Yr=7;var Nc=300,Di=301,ss=302,Uo=303,Fo=304,Zr=306,io=1e3,pn=1001,so=1002,Rt=1003,Xu=1004;var Jr=1005;var It=1006,Oo=1007;var Ni=1008;var Xt=1009,Uc=1010,Fc=1011,Zs=1012,Bo=1013,Pn=1014,_n=1015,Ut=1016,zo=1017,Vo=1018,Js=1020,Oc=35902,Bc=35899,zc=1021,Vc=1022,vn=1023,Vn=1026,Ui=1027,$s=1028,Ho=1029,Fi=1030,ko=1031;var Go=1033,$r=33776,Kr=33777,Qr=33778,jr=33779,Wo=35840,Xo=35841,qo=35842,Yo=35843,Zo=36196,Jo=37492,$o=37496,Ko=37488,Qo=37489,ea=37490,jo=37491,el=37808,tl=37809,nl=37810,il=37811,sl=37812,rl=37813,al=37814,ol=37815,ll=37816,cl=37817,hl=37818,ul=37819,dl=37820,fl=37821,pl=36492,ml=36494,gl=36495,xl=36283,_l=36284,ta=36285,vl=36286;var xr=2300,ro=2301,Ya=2302,vc=2303,yc=2400,Mc=2401,Sc=2402;var qu=3200;var yl=0,Yu=1,fi="",Wt="srgb",_r="srgb-linear",vr="linear",nt="srgb";var Yi=7680;var bc=519,Zu=512,Ju=513,$u=514,Ml=515,Ku=516,Qu=517,Sl=518,ju=519,ao=35044,Ks=35048;var Hc="300 es",wn=2e3,Us=2001;function pf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function mf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function yr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ed(){let i=yr("canvas");return i.style.display="block",i}var Gh={},Fs=null;function Mr(...i){let e="THREE."+i.shift();Fs?Fs("log",e,...i):console.log(e,...i)}function td(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Re(...i){i=td(i);let e="THREE."+i.shift();if(Fs)Fs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ie(...i){i=td(i);let e="THREE."+i.shift();if(Fs)Fs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function oo(...i){let e=i.join(" ");e in Gh||(Gh[e]=!0,Re(...i))}function nd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var id={[$a]:Ka,[Qa]:to,[ja]:no,[Ji]:eo,[Ka]:$a,[to]:Qa,[no]:ja,[eo]:Ji},Hn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wh=1234567,Ds=Math.PI/180,Os=180/Math.PI;function li(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function kc(i,e){return(i%e+e)%e}function gf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function xf(i,e,t){return i!==e?(t-i)/(e-i):0}function gr(i,e,t){return(1-t)*i+t*e}function _f(i,e,t,n){return gr(i,e,1-Math.exp(-t*n))}function vf(i,e=1){return e-Math.abs(kc(i,e*2)-e)}function yf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Mf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Sf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function bf(i,e){return i+Math.random()*(e-i)}function Ef(i){return i*(.5-Math.random())}function Tf(i){i!==void 0&&(Wh=i);let e=Wh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wf(i){return i*Ds}function Af(i){return i*Os}function Cf(i){return(i&i-1)===0&&i!==0}function Rf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function If(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),p=r((n-e)/2),x=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*d,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*x,c*p,o*l);break;case"YXY":i.set(c*p,o*h,c*x,o*l);break;case"ZYZ":i.set(c*x,c*p,o*h,o*l);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var bl={DEG2RAD:Ds,RAD2DEG:Os,generateUUID:li,clamp:$e,euclideanModulo:kc,mapLinear:gf,inverseLerp:xf,lerp:gr,damp:_f,pingpong:vf,smoothstep:yf,smootherstep:Mf,randInt:Sf,randFloat:bf,randFloatSpread:Ef,seededRandom:Tf,degToRad:wf,radToDeg:Af,isPowerOfTwo:Cf,ceilPowerOfTwo:Rf,floorPowerOfTwo:Pf,setQuaternionFromProperEuler:If,normalize:rt,denormalize:Tn},Yc=class Yc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yc.prototype.isVector2=!0;var me=Yc,kn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],p=r[a+1],x=r[a+2],v=r[a+3];if(d!==v||c!==u||l!==p||h!==x){let m=c*u+l*p+h*x+d*v;m<0&&(u=-u,p=-p,x=-x,v=-v,m=-m);let f=1-o;if(m<.9995){let M=Math.acos(m),E=Math.sin(M);f=Math.sin(f*M)/E,o=Math.sin(o*M)/E,c=c*f+u*o,l=l*f+p*o,h=h*f+x*o,d=d*f+v*o}else{c=c*f+u*o,l=l*f+p*o,h=h*f+x*o,d=d*f+v*o;let M=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=M,l*=M,h*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],p=r[a+2],x=r[a+3];return e[t]=o*x+h*d+c*p-l*u,e[t+1]=c*x+h*u+l*d-o*p,e[t+2]=l*x+h*p+o*u-c*d,e[t+3]=h*x-o*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),p=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*p*x,this._y=l*p*d-u*h*x,this._z=l*h*x+u*p*d,this._w=l*h*d-u*p*x;break;case"YXZ":this._x=u*h*d+l*p*x,this._y=l*p*d-u*h*x,this._z=l*h*x-u*p*d,this._w=l*h*d+u*p*x;break;case"ZXY":this._x=u*h*d-l*p*x,this._y=l*p*d+u*h*x,this._z=l*h*x+u*p*d,this._w=l*h*d-u*p*x;break;case"ZYX":this._x=u*h*d-l*p*x,this._y=l*p*d+u*h*x,this._z=l*h*x-u*p*d,this._w=l*h*d+u*p*x;break;case"YZX":this._x=u*h*d+l*p*x,this._y=l*p*d+u*h*x,this._z=l*h*x-u*p*d,this._w=l*h*d-u*p*x;break;case"XZY":this._x=u*h*d-l*p*x,this._y=l*p*d-u*h*x,this._z=l*h*x+u*p*d,this._w=l*h*d+u*p*x;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Zc=class Zc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zl.copy(this).projectOnVector(e),this.sub(Zl)}reflect(e){return this.sub(Zl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Zc.prototype.isVector3=!0;var L=Zc,Zl=new L,Xh=new kn,Jc=class Jc{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],x=n[8],v=s[0],m=s[3],f=s[6],M=s[1],E=s[4],b=s[7],C=s[2],w=s[5],P=s[8];return r[0]=a*v+o*M+c*C,r[3]=a*m+o*E+c*w,r[6]=a*f+o*b+c*P,r[1]=l*v+h*M+d*C,r[4]=l*m+h*E+d*w,r[7]=l*f+h*b+d*P,r[2]=u*v+p*M+x*C,r[5]=u*m+p*E+x*w,r[8]=u*f+p*b+x*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,p=l*r-a*c,x=t*d+n*u+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return e[0]=d*v,e[1]=(s*l-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(h*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Jl.makeScale(e,t)),this}rotate(e){return this.premultiply(Jl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Jc.prototype.isMatrix3=!0;var Fe=Jc,Jl=new Fe,qh=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yh=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lf(){let i={enabled:!0,workingColorSpace:_r,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===nt&&(s.r=ci(s.r),s.g=ci(s.g),s.b=ci(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(s.r=Ns(s.r),s.g=Ns(s.g),s.b=Ns(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fi?vr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return oo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return oo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[_r]:{primaries:e,whitePoint:n,transfer:vr,toXYZ:qh,fromXYZ:Yh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:n,transfer:nt,toXYZ:qh,fromXYZ:Yh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),i}var qe=Lf();function ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ns(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var gs,lo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gs===void 0&&(gs=yr("canvas")),gs.width=e.width,gs.height=e.height;let s=gs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=yr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ci(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ci(t[n]/255)*255):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Df=0,Bs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($l(s[a].image)):r.push($l(s[a]))}else r=$l(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function $l(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?lo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}var Nf=0,Kl=new L,Kt=class i extends Hn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=pn,s=pn,r=It,a=Ni,o=vn,c=Xt,l=i.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=li(),this.name="",this.source=new Bs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kl).x}get height(){return this.source.getSize(Kl).y}get depth(){return this.source.getSize(Kl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case io:e.x=e.x-Math.floor(e.x);break;case pn:e.x=e.x<0?0:1;break;case so:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case io:e.y=e.y-Math.floor(e.y);break;case pn:e.y=e.y<0?0:1;break;case so:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=Nc;Kt.DEFAULT_ANISOTROPY=1;var $c=class $c{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],x=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,b=(p+1)/2,C=(f+1)/2,w=(h+u)/4,P=(d+v)/4,y=(x+m)/4;return E>b&&E>C?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=P/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=w/s,r=y/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=P/r,s=y/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-x)*(m-x)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-x)/M,this.y=(d-v)/M,this.z=(u-h)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$c.prototype.isVector4=!0;var St=$c,co=class extends Hn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Kt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Bs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},Tt=class extends co{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Sr=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ho=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Do=class Do{constructor(e,t,n,s,r,a,o,c,l,h,d,u,p,x,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,u,p,x,v,m)}set(e,t,n,s,r,a,o,c,l,h,d,u,p,x,v,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=x,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Do().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,s=1/xs.setFromMatrixColumn(e,0).length(),r=1/xs.setFromMatrixColumn(e,1).length(),a=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,p=a*d,x=o*h,v=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+x*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=x+p*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,p=c*d,x=l*h,v=l*d;t[0]=u+v*o,t[4]=x*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-x,t[6]=v+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,p=c*d,x=l*h,v=l*d;t[0]=u-v*o,t[4]=-a*d,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,p=a*d,x=o*h,v=o*d;t[0]=c*h,t[4]=x*l-p,t[8]=u*l+v,t[1]=c*d,t[5]=v*l+u,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,p=a*l,x=o*c,v=o*l;t[0]=c*h,t[4]=v-u*d,t[8]=x*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+x,t[10]=u-v*d}else if(e.order==="XZY"){let u=a*c,p=a*l,x=o*c,v=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+v,t[5]=a*h,t[9]=p*d-x,t[2]=x*d-p,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Uf,e,Ff)}lookAt(e,t,n){let s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),bi.crossVectors(n,dn),bi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),bi.crossVectors(n,dn)),bi.normalize(),ga.crossVectors(dn,bi),s[0]=bi.x,s[4]=ga.x,s[8]=dn.x,s[1]=bi.y,s[5]=ga.y,s[9]=dn.y,s[2]=bi.z,s[6]=ga.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],x=n[2],v=n[6],m=n[10],f=n[14],M=n[3],E=n[7],b=n[11],C=n[15],w=s[0],P=s[4],y=s[8],A=s[12],I=s[1],R=s[5],F=s[9],W=s[13],X=s[2],O=s[6],H=s[10],G=s[14],j=s[3],ne=s[7],de=s[11],Se=s[15];return r[0]=a*w+o*I+c*X+l*j,r[4]=a*P+o*R+c*O+l*ne,r[8]=a*y+o*F+c*H+l*de,r[12]=a*A+o*W+c*G+l*Se,r[1]=h*w+d*I+u*X+p*j,r[5]=h*P+d*R+u*O+p*ne,r[9]=h*y+d*F+u*H+p*de,r[13]=h*A+d*W+u*G+p*Se,r[2]=x*w+v*I+m*X+f*j,r[6]=x*P+v*R+m*O+f*ne,r[10]=x*y+v*F+m*H+f*de,r[14]=x*A+v*W+m*G+f*Se,r[3]=M*w+E*I+b*X+C*j,r[7]=M*P+E*R+b*O+C*ne,r[11]=M*y+E*F+b*H+C*de,r[15]=M*A+E*W+b*G+C*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],x=e[3],v=e[7],m=e[11],f=e[15],M=c*p-l*u,E=o*p-l*d,b=o*u-c*d,C=a*p-l*h,w=a*u-c*h,P=a*d-o*h;return t*(v*M-m*E+f*b)-n*(x*M-m*C+f*w)+s*(x*E-v*C+f*P)-r*(x*b-v*w+m*P)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],x=e[12],v=e[13],m=e[14],f=e[15],M=t*o-n*a,E=t*c-s*a,b=t*l-r*a,C=n*c-s*o,w=n*l-r*o,P=s*l-r*c,y=h*v-d*x,A=h*m-u*x,I=h*f-p*x,R=d*m-u*v,F=d*f-p*v,W=u*f-p*m,X=M*W-E*F+b*R+C*I-w*A+P*y;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/X;return e[0]=(o*W-c*F+l*R)*O,e[1]=(s*F-n*W-r*R)*O,e[2]=(v*P-m*w+f*C)*O,e[3]=(u*w-d*P-p*C)*O,e[4]=(c*I-a*W-l*A)*O,e[5]=(t*W-s*I+r*A)*O,e[6]=(m*b-x*P-f*E)*O,e[7]=(h*P-u*b+p*E)*O,e[8]=(a*F-o*I+l*y)*O,e[9]=(n*I-t*F-r*y)*O,e[10]=(x*w-v*b+f*M)*O,e[11]=(d*b-h*w-p*M)*O,e[12]=(o*A-a*R-c*y)*O,e[13]=(t*R-n*A+s*y)*O,e[14]=(v*E-x*C-m*M)*O,e[15]=(h*C-d*E+u*M)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,p=r*h,x=r*d,v=a*h,m=a*d,f=o*d,M=c*l,E=c*h,b=c*d,C=n.x,w=n.y,P=n.z;return s[0]=(1-(v+f))*C,s[1]=(p+b)*C,s[2]=(x-E)*C,s[3]=0,s[4]=(p-b)*w,s[5]=(1-(u+f))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(x+E)*P,s[9]=(m-M)*P,s[10]=(1-(u+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=xs.set(s[0],s[1],s[2]).length(),o=xs.set(s[4],s[5],s[6]).length(),c=xs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Sn.copy(this);let l=1/a,h=1/o,d=1/c;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=d,Sn.elements[9]*=d,Sn.elements[10]*=d,t.setFromRotationMatrix(Sn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=wn,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s),x,v;if(c)x=r/(a-r),v=a*r/(a-r);else if(o===wn)x=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Us)x=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=wn,c=!1){let l=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),p=-(n+s)/(n-s),x,v;if(c)x=1/(a-r),v=a/(a-r);else if(o===wn)x=-2/(a-r),v=-(a+r)/(a-r);else if(o===Us)x=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Do.prototype.isMatrix4=!0;var at=Do,xs=new L,Sn=new at,Uf=new L(0,0,0),Ff=new L(1,1,1),bi=new L,ga=new L,dn=new L,Zh=new at,Jh=new kn,ui=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jh.setFromEuler(this),this.setFromQuaternion(Jh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ui.DEFAULT_ORDER="XYZ";var zs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Of=0,$h=new L,_s=new kn,ii=new at,xa=new L,ar=new L,Bf=new L,zf=new kn,Kh=new L(1,0,0),Qh=new L(0,1,0),jh=new L(0,0,1),eu={type:"added"},Vf={type:"removed"},vs={type:"childadded",child:null},Ql={type:"childremoved",child:null},Nt=class i extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new ui,n=new kn,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new at},normalMatrix:{value:new Fe}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(Kh,e)}rotateY(e){return this.rotateOnAxis(Qh,e)}rotateZ(e){return this.rotateOnAxis(jh,e)}translateOnAxis(e,t){return $h.copy(e).applyQuaternion(this.quaternion),this.position.add($h.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kh,e)}translateY(e){return this.translateOnAxis(Qh,e)}translateZ(e){return this.translateOnAxis(jh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xa.copy(e):xa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(ar,xa,this.up):ii.lookAt(xa,ar,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),_s.setFromRotationMatrix(ii),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ie("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eu),vs.child=e,this.dispatchEvent(vs),vs.child=null):Ie("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vf),Ql.child=e,this.dispatchEvent(Ql),Ql.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eu),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,e,Bf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,zf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Nt.DEFAULT_UP=new L(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var tn=class extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Hf={type:"move"},Vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,x=.005;l.inputState.pinching&&u>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},_a={h:0,s:0,l:0};function jl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ce=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=kc(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=jl(a,r,e+1/3),this.g=jl(a,r,e),this.b=jl(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Wt){function n(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){let n=sd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=Ns(e.r),this.g=Ns(e.g),this.b=Ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return qe.workingToColorSpace(Gt.copy(this),e),Math.round($e(Gt.r*255,0,255))*65536+Math.round($e(Gt.g*255,0,255))*256+Math.round($e(Gt.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Gt.copy(this),t);let n=Gt.r,s=Gt.g,r=Gt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Wt){qe.workingToColorSpace(Gt.copy(this),e);let t=Gt.r,n=Gt.g,s=Gt.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ei),this.setHSL(Ei.h+e,Ei.s+t,Ei.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ei),e.getHSL(_a);let n=gr(Ei.h,_a.h,t),s=gr(Ei.s,_a.s,t),r=gr(Ei.l,_a.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Gt=new Ce;Ce.NAMES=sd;var br=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ce(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Er=class extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},bn=new L,si=new L,ec=new L,ri=new L,ys=new L,Ms=new L,tu=new L,tc=new L,nc=new L,ic=new L,sc=new St,rc=new St,ac=new St,zn=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),bn.subVectors(e,t),s.cross(bn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){bn.subVectors(s,t),si.subVectors(n,t),ec.subVectors(e,t);let a=bn.dot(bn),o=bn.dot(si),c=bn.dot(ec),l=si.dot(si),h=si.dot(ec),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(l*c-o*h)*u,x=(a*h-o*c)*u;return r.set(1-p-x,x,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ri.x),c.addScaledVector(a,ri.y),c.addScaledVector(o,ri.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return sc.setScalar(0),rc.setScalar(0),ac.setScalar(0),sc.fromBufferAttribute(e,t),rc.fromBufferAttribute(e,n),ac.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(sc,r.x),a.addScaledVector(rc,r.y),a.addScaledVector(ac,r.z),a}static isFrontFacing(e,t,n,s){return bn.subVectors(n,t),si.subVectors(e,t),bn.cross(si).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),bn.cross(si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;ys.subVectors(s,n),Ms.subVectors(r,n),tc.subVectors(e,n);let c=ys.dot(tc),l=Ms.dot(tc);if(c<=0&&l<=0)return t.copy(n);nc.subVectors(e,s);let h=ys.dot(nc),d=Ms.dot(nc);if(h>=0&&d<=h)return t.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ys,a);ic.subVectors(e,r);let p=ys.dot(ic),x=Ms.dot(ic);if(x>=0&&p<=x)return t.copy(r);let v=p*l-c*x;if(v<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(Ms,o);let m=h*x-p*d;if(m<=0&&d-h>=0&&p-x>=0)return tu.subVectors(r,s),o=(d-h)/(d-h+(p-x)),t.copy(s).addScaledVector(tu,o);let f=1/(m+v+u);return a=v*f,o=u*f,t.copy(n).addScaledVector(ys,a).addScaledVector(Ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Gn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(r,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),va.copy(n.boundingBox)),va.applyMatrix4(e.matrixWorld),this.union(va)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),ya.subVectors(this.max,or),Ss.subVectors(e.a,or),bs.subVectors(e.b,or),Es.subVectors(e.c,or),Ti.subVectors(bs,Ss),wi.subVectors(Es,bs),Gi.subVectors(Ss,Es);let t=[0,-Ti.z,Ti.y,0,-wi.z,wi.y,0,-Gi.z,Gi.y,Ti.z,0,-Ti.x,wi.z,0,-wi.x,Gi.z,0,-Gi.x,-Ti.y,Ti.x,0,-wi.y,wi.x,0,-Gi.y,Gi.x,0];return!oc(t,Ss,bs,Es,ya)||(t=[1,0,0,0,1,0,0,0,1],!oc(t,Ss,bs,Es,ya))?!1:(Ma.crossVectors(Ti,wi),t=[Ma.x,Ma.y,Ma.z],oc(t,Ss,bs,Es,ya))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ai),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ai=[new L,new L,new L,new L,new L,new L,new L,new L],En=new L,va=new Gn,Ss=new L,bs=new L,Es=new L,Ti=new L,wi=new L,Gi=new L,or=new L,ya=new L,Ma=new L,Wi=new L;function oc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Wi.fromArray(i,r);let o=s.x*Math.abs(Wi.x)+s.y*Math.abs(Wi.y)+s.z*Math.abs(Wi.z),c=e.dot(Wi),l=t.dot(Wi),h=n.dot(Wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Pt=new L,Sa=new me,kf=0,Le=class extends Hn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ao,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Sa.fromBufferAttribute(this,t),Sa.applyMatrix3(e),this.setXY(t,Sa.x,Sa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ao&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Tr=class extends Le{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var wr=class extends Le{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var We=class extends Le{constructor(e,t,n){super(new Float32Array(e),t,n)}},Gf=new Gn,lr=new L,lc=new L,Wn=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Gf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;lr.subVectors(e,this.center);let t=lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(lr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(lr.copy(e.center).add(lc)),this.expandByPoint(lr.copy(e.center).sub(lc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Wf=0,xn=new at,cc=new Nt,Ts=new L,fn=new Gn,cr=new Gn,Bt=new L,Ke=class i extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pf(e)?wr:Tr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Fe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,n){return xn.makeTranslation(e,t,n),this.applyMatrix4(xn),this}scale(e,t,n){return xn.makeScale(e,t,n),this.applyMatrix4(xn),this}lookAt(e){return cc.lookAt(e),cc.updateMatrix(),this.applyMatrix4(cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new We(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ie('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];cr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(fn.min,cr.min),fn.expandByPoint(Bt),Bt.addVectors(fn.max,cr.max),fn.expandByPoint(Bt)):(fn.expandByPoint(cr.min),fn.expandByPoint(cr.max))}fn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Bt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Bt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Bt.fromBufferAttribute(o,l),c&&(Ts.fromBufferAttribute(e,l),Bt.add(Ts)),s=Math.max(s,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ie('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ie("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Le(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new L,c[y]=new L;let l=new L,h=new L,d=new L,u=new me,p=new me,x=new me,v=new L,m=new L;function f(y,A,I){l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,I),u.fromBufferAttribute(r,y),p.fromBufferAttribute(r,A),x.fromBufferAttribute(r,I),h.sub(l),d.sub(l),p.sub(u),x.sub(u);let R=1/(p.x*x.y-x.x*p.y);isFinite(R)&&(v.copy(h).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-x.x).multiplyScalar(R),o[y].add(v),o[A].add(v),o[I].add(v),c[y].add(m),c[A].add(m),c[I].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,A=M.length;y<A;++y){let I=M[y],R=I.start,F=I.count;for(let W=R,X=R+F;W<X;W+=3)f(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let E=new L,b=new L,C=new L,w=new L;function P(y){C.fromBufferAttribute(s,y),w.copy(C);let A=o[y];E.copy(A),E.sub(C.multiplyScalar(C.dot(A))).normalize(),b.crossVectors(w,A);let R=b.dot(c[y])<0?-1:1;a.setXYZW(y,E.x,E.y,E.z,R)}for(let y=0,A=M.length;y<A;++y){let I=M[y],R=I.start,F=I.count;for(let W=R,X=R+F;W<X;W+=3)P(e.getX(W+0)),P(e.getX(W+1)),P(e.getX(W+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Le(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,d=new L;if(e)for(let u=0,p=e.count;u<p;u+=3){let x=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h),p=0,x=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*h;for(let f=0;f<h;f++)u[x++]=l[p++]}return new Le(u,h,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},uo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ao,this.updateRanges=[],this.version=0,this.uuid=li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},$t=new L,Ar=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Mr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Le(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Mr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Xf=0,An=class extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=li(),this.name="",this.type="Material",this.blending=Zi,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Za,this.blendDst=Ja,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(n.blending=this.blending),this.side!==hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Za&&(n.blendSrc=this.blendSrc),this.blendDst!==Ja&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},$i=class extends An{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ws,hr=new L,As=new L,Cs=new L,Rs=new me,ur=new me,rd=new at,ba=new L,dr=new L,Ea=new L,nu=new me,hc=new me,iu=new me,Hs=class extends Nt{constructor(e=new $i){if(super(),this.isSprite=!0,this.type="Sprite",ws===void 0){ws=new Ke;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new uo(t,5);ws.setIndex([0,1,2,0,2,3]),ws.setAttribute("position",new Ar(n,3,0,!1)),ws.setAttribute("uv",new Ar(n,2,3,!1))}this.geometry=ws,this.material=e,this.center=new me(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ie('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),As.setFromMatrixScale(this.matrixWorld),rd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Cs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&As.multiplyScalar(-Cs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Ta(ba.set(-.5,-.5,0),Cs,a,As,s,r),Ta(dr.set(.5,-.5,0),Cs,a,As,s,r),Ta(Ea.set(.5,.5,0),Cs,a,As,s,r),nu.set(0,0),hc.set(1,0),iu.set(1,1);let o=e.ray.intersectTriangle(ba,dr,Ea,!1,hr);if(o===null&&(Ta(dr.set(-.5,.5,0),Cs,a,As,s,r),hc.set(0,1),o=e.ray.intersectTriangle(ba,Ea,dr,!1,hr),o===null))return;let c=e.ray.origin.distanceTo(hr);c<e.near||c>e.far||t.push({distance:c,point:hr.clone(),uv:zn.getInterpolation(hr,ba,dr,Ea,nu,hc,iu,new me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ta(i,e,t,n,s,r){Rs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(ur.x=r*Rs.x-s*Rs.y,ur.y=s*Rs.x+r*Rs.y):ur.copy(Rs),i.copy(e),i.x+=ur.x,i.y+=ur.y,i.applyMatrix4(rd)}var oi=new L,uc=new L,wa=new L,Ai=new L,dc=new L,Aa=new L,fc=new L,Ki=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,t),oi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){uc.copy(e).add(t).multiplyScalar(.5),wa.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(uc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(wa),o=Ai.dot(this.direction),c=-Ai.dot(wa),l=Ai.lengthSq(),h=Math.abs(1-a*a),d,u,p,x;if(h>0)if(d=a*c-o,u=a*o-c,x=r*h,d>=0)if(u>=-x)if(u<=x){let v=1/h;d*=v,u*=v,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-x?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=x?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(uc).addScaledVector(wa,u),p}intersectSphere(e,t){oi.subVectors(e.center,this.origin);let n=oi.dot(this.direction),s=oi.dot(oi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,t,n,s,r){dc.subVectors(t,e),Aa.subVectors(n,e),fc.crossVectors(dc,Aa);let a=this.direction.dot(fc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ai.subVectors(this.origin,e);let c=o*this.direction.dot(Aa.crossVectors(Ai,Aa));if(c<0)return null;let l=o*this.direction.dot(dc.cross(Ai));if(l<0||c+l>a)return null;let h=-o*Ai.dot(fc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},su=new at,Xi=new Ki,Ca=new Wn,ru=new L,Ra=new L,Pa=new L,Ia=new L,pc=new L,La=new L,au=new L,Da=new L,et=class extends Nt{constructor(e=new Ke,t=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){La.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(pc.fromBufferAttribute(d,e),a?La.addScaledVector(pc,h):La.addScaledVector(pc.sub(t),h))}t.add(La)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ca.copy(n.boundingSphere),Ca.applyMatrix4(r),Xi.copy(e.ray).recast(e.near),!(Ca.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Ca,ru)===null||Xi.origin.distanceToSquared(ru)>(e.far-e.near)**2))&&(su.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(su),!(n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=u.length;x<v;x++){let m=u[x],f=a[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,C=E;b<C;b+=3){let w=o.getX(b),P=o.getX(b+1),y=o.getX(b+2);s=Na(this,f,e,n,l,h,d,w,P,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=x,f=v;m<f;m+=3){let M=o.getX(m),E=o.getX(m+1),b=o.getX(m+2);s=Na(this,a,e,n,l,h,d,M,E,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,v=u.length;x<v;x++){let m=u[x],f=a[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,C=E;b<C;b+=3){let w=b,P=b+1,y=b+2;s=Na(this,f,e,n,l,h,d,w,P,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=x,f=v;m<f;m+=3){let M=m,E=m+1,b=m+2;s=Na(this,a,e,n,l,h,d,M,E,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function qf(i,e,t,n,s,r,a,o){let c;if(e.side===Vt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===hi,o),c===null)return null;Da.copy(o),Da.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Da);return l<t.near||l>t.far?null:{distance:l,point:Da.clone(),object:i}}function Na(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ra),i.getVertexPosition(c,Pa),i.getVertexPosition(l,Ia);let h=qf(i,e,t,n,Ra,Pa,Ia,au);if(h){let d=new L;zn.getBarycoord(au,Ra,Pa,Ia,d),s&&(h.uv=zn.getInterpolatedAttribute(s,o,c,l,d,new me)),r&&(h.uv1=zn.getInterpolatedAttribute(r,o,c,l,d,new me)),a&&(h.normal=zn.getInterpolatedAttribute(a,o,c,l,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new L,materialIndex:0};zn.getNormal(Ra,Pa,Ia,u.normal),h.face=u,h.barycoord=d}return h}var Qi=class extends Kt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Rt,h=Rt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cr=class extends Le{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ps=new at,ou=new at,Ua=[],lu=new Gn,Yf=new at,fr=new et,pr=new Wn,Rr=class extends et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Cr(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Yf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),lu.copy(e.boundingBox).applyMatrix4(Ps),this.boundingBox.union(lu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),pr.copy(e.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(fr.geometry=this.geometry,fr.material=this.material,fr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pr.copy(this.boundingSphere),pr.applyMatrix4(n),e.ray.intersectsSphere(pr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ps),ou.multiplyMatrices(n,Ps),fr.matrixWorld=ou,fr.raycast(e,Ua);for(let a=0,o=Ua.length;a<o;a++){let c=Ua[a];c.instanceId=r,c.object=this,t.push(c)}Ua.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Cr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qi(new Float32Array(s*this.count),s,this.count,$s,_n));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},mc=new L,Zf=new L,Jf=new Fe,Bn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=mc.subVectors(n,t).cross(Zf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(mc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Jf.getNormalMatrix(e),s=this.coplanarPoint(mc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},qi=new Wn,$f=new me(.5,.5),Fa=new L,ks=class{constructor(e=new Bn,t=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],x=r[8],v=r[9],m=r[10],f=r[11],M=r[12],E=r[13],b=r[14],C=r[15];if(s[0].setComponents(l-a,p-h,f-x,C-M).normalize(),s[1].setComponents(l+a,p+h,f+x,C+M).normalize(),s[2].setComponents(l+o,p+d,f+v,C+E).normalize(),s[3].setComponents(l-o,p-d,f-v,C-E).normalize(),n)s[4].setComponents(c,u,m,b).normalize(),s[5].setComponents(l-c,p-u,f-m,C-b).normalize();else if(s[4].setComponents(l-c,p-u,f-m,C-b).normalize(),t===wn)s[5].setComponents(l+c,p+u,f+m,C+b).normalize();else if(t===Us)s[5].setComponents(c,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){qi.center.set(0,0,0);let t=$f.distanceTo(e.center);return qi.radius=.7071067811865476+t,qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Fa.x=s.normal.x>0?e.max.x:e.min.x,Fa.y=s.normal.y>0?e.max.y:e.min.y,Fa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Fa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Xn=class extends An{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},fo=new L,po=new L,cu=new at,mr=new Ki,Oa=new Wn,gc=new L,hu=new L,mo=class extends Nt{constructor(e=new Ke,t=new Xn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)fo.fromBufferAttribute(t,s-1),po.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=fo.distanceTo(po);e.setAttribute("lineDistance",new We(n,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(s),Oa.radius+=r,e.ray.intersectsSphere(Oa)===!1)return;cu.copy(s).invert(),mr.copy(e.ray).applyMatrix4(cu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let v=p,m=x-1;v<m;v+=l){let f=h.getX(v),M=h.getX(v+1),E=Ba(this,e,mr,c,f,M,v);E&&t.push(E)}if(this.isLineLoop){let v=h.getX(x-1),m=h.getX(p),f=Ba(this,e,mr,c,v,m,x-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=p,m=x-1;v<m;v+=l){let f=Ba(this,e,mr,c,v,v+1,v);f&&t.push(f)}if(this.isLineLoop){let v=Ba(this,e,mr,c,x-1,p,x-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ba(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(fo.fromBufferAttribute(o,s),po.fromBufferAttribute(o,r),t.distanceSqToSegment(fo,po,gc,hu)>n)return;gc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(gc);if(!(l<e.near||l>e.far))return{distance:l,point:hu.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var uu=new L,du=new L,Cn=class extends mo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)uu.fromBufferAttribute(t,s),du.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+uu.distanceTo(du);e.setAttribute("lineDistance",new We(n,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var go=class extends An{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},fu=new at,Ec=new Ki,za=new Wn,Va=new L,qn=class extends Nt{constructor(e=new Ke,t=new go){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(s),za.radius+=r,e.ray.intersectsSphere(za)===!1)return;fu.copy(s).invert(),Ec.copy(e.ray).applyMatrix4(fu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let x=u,v=p;x<v;x++){let m=l.getX(x);Va.fromBufferAttribute(d,m),pu(Va,m,c,s,e,t,this)}}else{let u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=u,v=p;x<v;x++)Va.fromBufferAttribute(d,x),pu(Va,x,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function pu(i,e,t,n,s,r,a){let o=Ec.distanceSqToPoint(i);if(o<t){let c=new L;Ec.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Pr=class extends Kt{constructor(e=[],t=Di,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ir=class extends Kt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var di=class extends Kt{constructor(e,t,n=Pn,s,r,a,o=Rt,c=Rt,l,h=Vn,d=1){if(h!==Vn&&h!==Ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},xo=class extends di{constructor(e,t=Pn,n=Di,s,r,a=Rt,o=Rt,c,l=Vn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Lr=class extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Yn=class i extends Ke{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],u=0,p=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(d,2));function x(v,m,f,M,E,b,C,w,P,y,A){let I=b/P,R=C/y,F=b/2,W=C/2,X=w/2,O=P+1,H=y+1,G=0,j=0,ne=new L;for(let de=0;de<H;de++){let Se=de*R-W;for(let we=0;we<O;we++){let Qe=we*I-F;ne[v]=Qe*M,ne[m]=Se*E,ne[f]=X,l.push(ne.x,ne.y,ne.z),ne[v]=0,ne[m]=0,ne[f]=w>0?1:-1,h.push(ne.x,ne.y,ne.z),d.push(we/P),d.push(1-de/y),G+=1}}for(let de=0;de<y;de++)for(let Se=0;Se<P;Se++){let we=u+Se+O*de,Qe=u+Se+O*(de+1),ot=u+(Se+1)+O*(de+1),Ve=u+(Se+1)+O*de;c.push(we,Qe,Ve),c.push(Qe,ot,Ve),j+=6}o.addGroup(p,j,A),p+=j,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Dr=class i extends Ke{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new L,h=new me;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let p=n+d/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new We(a,3)),this.setAttribute("normal",new We(o,3)),this.setAttribute("uv",new We(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ji=class i extends Ke{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],x=0,v=[],m=n/2,f=0;M(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new We(d,3)),this.setAttribute("normal",new We(u,3)),this.setAttribute("uv",new We(p,2));function M(){let b=new L,C=new L,w=0,P=(t-e)/n;for(let y=0;y<=r;y++){let A=[],I=y/r,R=I*(t-e)+e;for(let F=0;F<=s;F++){let W=F/s,X=W*c+o,O=Math.sin(X),H=Math.cos(X);C.x=R*O,C.y=-I*n+m,C.z=R*H,d.push(C.x,C.y,C.z),b.set(O,P,H).normalize(),u.push(b.x,b.y,b.z),p.push(W,1-I),A.push(x++)}v.push(A)}for(let y=0;y<s;y++)for(let A=0;A<r;A++){let I=v[A][y],R=v[A+1][y],F=v[A+1][y+1],W=v[A][y+1];(e>0||A!==0)&&(h.push(I,R,W),w+=3),(t>0||A!==r-1)&&(h.push(R,F,W),w+=3)}l.addGroup(f,w,0),f+=w}function E(b){let C=x,w=new me,P=new L,y=0,A=b===!0?e:t,I=b===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,m*I,0),u.push(0,I,0),p.push(.5,.5),x++;let R=x;for(let F=0;F<=s;F++){let X=F/s*c+o,O=Math.cos(X),H=Math.sin(X);P.x=A*H,P.y=m*I,P.z=A*O,d.push(P.x,P.y,P.z),u.push(0,I,0),w.x=O*.5+.5,w.y=H*.5*I+.5,p.push(w.x,w.y),x++}for(let F=0;F<s;F++){let W=C+F,X=R+F;b===!0?h.push(X,X+1,W):h.push(X+1,X,W),y+=3}l.addGroup(f,y,b===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var _o=class i extends Ke{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new We(r,3)),this.setAttribute("normal",new We(r.slice(),3)),this.setAttribute("uv",new We(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let E=new L,b=new L,C=new L;for(let w=0;w<t.length;w+=3)p(t[w+0],E),p(t[w+1],b),p(t[w+2],C),c(E,b,C,M)}function c(M,E,b,C){let w=C+1,P=[];for(let y=0;y<=w;y++){P[y]=[];let A=M.clone().lerp(b,y/w),I=E.clone().lerp(b,y/w),R=w-y;for(let F=0;F<=R;F++)F===0&&y===w?P[y][F]=A:P[y][F]=A.clone().lerp(I,F/R)}for(let y=0;y<w;y++)for(let A=0;A<2*(w-y)-1;A++){let I=Math.floor(A/2);A%2===0?(u(P[y][I+1]),u(P[y+1][I]),u(P[y][I])):(u(P[y][I+1]),u(P[y+1][I+1]),u(P[y+1][I]))}}function l(M){let E=new L;for(let b=0;b<r.length;b+=3)E.x=r[b+0],E.y=r[b+1],E.z=r[b+2],E.normalize().multiplyScalar(M),r[b+0]=E.x,r[b+1]=E.y,r[b+2]=E.z}function h(){let M=new L;for(let E=0;E<r.length;E+=3){M.x=r[E+0],M.y=r[E+1],M.z=r[E+2];let b=m(M)/2/Math.PI+.5,C=f(M)/Math.PI+.5;a.push(b,1-C)}x(),d()}function d(){for(let M=0;M<a.length;M+=6){let E=a[M+0],b=a[M+2],C=a[M+4],w=Math.max(E,b,C),P=Math.min(E,b,C);w>.9&&P<.1&&(E<.2&&(a[M+0]+=1),b<.2&&(a[M+2]+=1),C<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function p(M,E){let b=M*3;E.x=e[b+0],E.y=e[b+1],E.z=e[b+2]}function x(){let M=new L,E=new L,b=new L,C=new L,w=new me,P=new me,y=new me;for(let A=0,I=0;A<r.length;A+=9,I+=6){M.set(r[A+0],r[A+1],r[A+2]),E.set(r[A+3],r[A+4],r[A+5]),b.set(r[A+6],r[A+7],r[A+8]),w.set(a[I+0],a[I+1]),P.set(a[I+2],a[I+3]),y.set(a[I+4],a[I+5]),C.copy(M).add(E).add(b).divideScalar(3);let R=m(C);v(w,I+0,M,R),v(P,I+2,E,R),v(y,I+4,b,R)}}function v(M,E,b,C){C<0&&M.x===1&&(a[E]=M.x-1),b.x===0&&b.z===0&&(a[E]=C/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var Ha=new L,ka=new L,xc=new L,Ga=new zn,Nr=class extends Ke{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Ds*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),u={},p=[];for(let x=0;x<c;x+=3){a?(l[0]=a.getX(x),l[1]=a.getX(x+1),l[2]=a.getX(x+2)):(l[0]=x,l[1]=x+1,l[2]=x+2);let{a:v,b:m,c:f}=Ga;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),f.fromBufferAttribute(o,l[2]),Ga.getNormal(xc),d[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){let E=(M+1)%3,b=d[M],C=d[E],w=Ga[h[M]],P=Ga[h[E]],y=`${b}_${C}`,A=`${C}_${b}`;A in u&&u[A]?(xc.dot(u[A].normal)<=r&&(p.push(w.x,w.y,w.z),p.push(P.x,P.y,P.z)),u[A]=null):y in u||(u[y]={index0:l[M],index1:l[E],normal:xc.clone()})}}for(let x in u)if(u[x]){let{index0:v,index1:m}=u[x];Ha.fromBufferAttribute(o,v),ka.fromBufferAttribute(o,m),p.push(Ha.x,Ha.y,Ha.z),p.push(ka.x,ka.y,ka.z)}this.setAttribute("position",new We(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var Gs=class i extends _o{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Ur=class i extends Ke{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,p=[],x=[],v=[],m=[];for(let f=0;f<h;f++){let M=f*u-a;for(let E=0;E<l;E++){let b=E*d-r;x.push(b,-M,0),v.push(0,0,1),m.push(E/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<o;M++){let E=M+l*f,b=M+l*(f+1),C=M+1+l*(f+1),w=M+1+l*f;p.push(E,b,w),p.push(b,C,w)}this.setIndex(p),this.setAttribute("position",new We(x,3)),this.setAttribute("normal",new We(v,3)),this.setAttribute("uv",new We(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var es=class i extends Ke{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new L,u=new L,p=[],x=[],v=[],m=[];for(let f=0;f<=n;f++){let M=[],E=f/n,b=0;f===0&&a===0?b=.5/t:f===n&&c===Math.PI&&(b=-.5/t);for(let C=0;C<=t;C++){let w=C/t;d.x=-e*Math.cos(s+w*r)*Math.sin(a+E*o),d.y=e*Math.cos(a+E*o),d.z=e*Math.sin(s+w*r)*Math.sin(a+E*o),x.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(w+b,1-E),M.push(l++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){let E=h[f][M+1],b=h[f][M],C=h[f+1][M],w=h[f+1][M+1];(f!==0||a>0)&&p.push(E,b,w),(f!==n-1||c<Math.PI)&&p.push(b,C,w)}this.setIndex(p),this.setAttribute("position",new We(x,3)),this.setAttribute("normal",new We(v,3)),this.setAttribute("uv",new We(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Zn=class i extends Ke{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],d=[],u=new L,p=new L,x=new L;for(let v=0;v<=n;v++){let m=a+v/n*o;for(let f=0;f<=s;f++){let M=f/s*r;p.x=(e+t*Math.cos(m))*Math.cos(M),p.y=(e+t*Math.cos(m))*Math.sin(M),p.z=t*Math.sin(m),l.push(p.x,p.y,p.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),x.subVectors(p,u).normalize(),h.push(x.x,x.y,x.z),d.push(f/s),d.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=s;m++){let f=(s+1)*v+m-1,M=(s+1)*(v-1)+m-1,E=(s+1)*(v-1)+m,b=(s+1)*v+m;c.push(f,M,b),c.push(M,E,b)}this.setIndex(c),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function rs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(mu(s))s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(mu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function qt(i){let e={};for(let t=0;t<i.length;t++){let n=rs(i[t]);for(let s in n)e[s]=n[s]}return e}function mu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Kf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Gc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var yn={clone:rs,merge:qt},Qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xe=class extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qf,this.fragmentShader=jf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=Kf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ws=class extends Xe{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Xs=class extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yl,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var vo=class extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},yo=class extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Wa(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Pi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Mo=class extends Pi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yc,endingEnd:yc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Mc:r=e,o=2*t-n;break;case Sc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Mc:a=e,c=2*n-t;break;case Sc:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,x=(n-t)/(s-t),v=x*x,m=v*x,f=-u*m+2*u*v-u*x,M=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*x+1,E=(-1-p)*m+(1.5+p)*v+.5*x,b=p*m-p*v;for(let C=0;C!==o;++C)r[C]=f*a[h+C]+M*a[l+C]+E*a[c+C]+b*a[d+C];return r}},So=class extends Pi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}},bo=class extends Pi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Eo=class extends Pi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){let v=(n-t)/(s-t),m=1-v;for(let f=0;f!==o;++f)r[f]=a[l+f]*m+a[c+f]*v;return r}let p=o*2,x=e-1;for(let v=0;v!==o;++v){let m=a[l+v],f=a[c+v],M=x*p+v*2,E=u[M],b=u[M+1],C=e*p+v*2,w=d[C],P=d[C+1],y=(n-t)/(s-t),A,I,R,F,W;for(let X=0;X<8;X++){A=y*y,I=A*y,R=1-y,F=R*R,W=F*R;let H=W*t+3*F*y*E+3*R*A*w+I*s-n;if(Math.abs(H)<1e-10)break;let G=3*F*(E-t)+6*R*y*(w-E)+3*A*(s-w);if(Math.abs(G)<1e-10)break;y=y-H/G,y=Math.max(0,Math.min(1,y))}r[v]=W*m+3*F*y*b+3*R*A*P+I*f}return r}},mn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Wa(t,this.TimeBufferType),this.values=Wa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Wa(e.times,Array),values:Wa(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new So(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Eo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case xr:t=this.InterpolantFactoryMethodDiscrete;break;case ro:t=this.InterpolantFactoryMethodLinear;break;case Ya:t=this.InterpolantFactoryMethodSmooth;break;case vc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Re("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xr;case this.InterpolantFactoryMethodLinear:return ro;case this.InterpolantFactoryMethodSmooth:return Ya;case this.InterpolantFactoryMethodBezier:return vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ie("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ie("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ie("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ie("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&mf(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ie("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ya,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,u=d-n,p=d+n;for(let x=0;x!==n;++x){let v=t[d+x];if(v!==t[u+x]||v!==t[p+x]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};mn.prototype.ValueTypeName="";mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=ro;var Ii=class extends mn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="bool";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=xr;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var To=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}};To.prototype.ValueTypeName="color";var wo=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}};wo.prototype.ValueTypeName="number";var Ao=class extends Pi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)kn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Fr=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ao(this.times,this.values,this.getValueSize(),e)}};Fr.prototype.ValueTypeName="quaternion";Fr.prototype.InterpolantFactoryMethodSmooth=void 0;var Li=class extends mn{constructor(e,t,n){super(e,t,n)}};Li.prototype.ValueTypeName="string";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=xr;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var Co=class extends mn{constructor(e,t,n,s){super(e,t,n,s)}};Co.prototype.ValueTypeName="vector";var Ro=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let p=l[d],x=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},ad=new Ro,Po=class{constructor(e){this.manager=e!==void 0?e:ad,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Po.DEFAULT_MATERIAL_NAME="__DEFAULT";var Or=class extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Br=class extends Or{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},_c=new at,gu=new L,xu=new L,Tc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.mapType=Xt,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ks,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;gu.setFromMatrixPosition(e.matrixWorld),t.position.copy(gu),xu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xu),t.updateMatrixWorld(),_c.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_c,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Us||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_c)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xa=new L,qa=new kn,On=new L,zr=class extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xa,qa,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xa,qa,On.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Xa,qa,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xa,qa,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ci=new L,_u=new me,vu=new me,zt=class extends zr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,_u,vu),t.subVectors(vu,_u)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var wc=class extends Tc{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0}},qs=class extends Or{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new wc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ts=class extends zr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Is=-90,Ls=1,Io=class extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new zt(Is,Ls,e,t);s.layers=this.layers,this.add(s);let r=new zt(Is,Ls,e,t);r.layers=this.layers,this.add(r);let a=new zt(Is,Ls,e,t);a.layers=this.layers,this.add(a);let o=new zt(Is,Ls,e,t);o.layers=this.layers,this.add(o);let c=new zt(Is,Ls,e,t);c.layers=this.layers,this.add(c);let l=new zt(Is,Ls,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Us)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Lo=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ns=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=ep.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function ep(){this._document.hidden===!1&&this.reset()}var Wc="\\[\\]\\.:\\/",tp=new RegExp("["+Wc+"]","g"),Xc="[^"+Wc+"]",np="[^"+Wc.replace("\\.","")+"]",ip=/((?:WC+[\/:])*)/.source.replace("WC",Xc),sp=/(WCOD+)?/.source.replace("WCOD",np),rp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xc),ap=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xc),op=new RegExp("^"+ip+sp+rp+ap+"$"),lp=["material","materials","bones","map"],Ac=class{constructor(e,t,n){let s=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(tp,"")}static parseTrackName(e){let t=op.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);lp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ie("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ie("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ie("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ie("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ie("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ie("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};vt.Composite=Ac;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Y_=new Float32Array(1);var yu=new at,Vr=class{constructor(e,t,n=0,s=1/0){this.ray=new Ki(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new zs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ie("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yu),this}intersectObject(e,t=!0,n=[]){return Cc(e,this,n,t),n.sort(Mu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Cc(e[s],this,n,t);return n.sort(Mu),n}};function Mu(i,e){return i.distance-e.distance}function Cc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Cc(r[a],e,t,!0)}}var Kc=class Kc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Kc.prototype.isMatrix2=!0;var Rc=Kc;function qc(i,e,t,n){let s=cp(n);switch(t){case zc:return i*e;case $s:return i*e/s.components*s.byteLength;case Ho:return i*e/s.components*s.byteLength;case Fi:return i*e*2/s.components*s.byteLength;case ko:return i*e*2/s.components*s.byteLength;case Vc:return i*e*3/s.components*s.byteLength;case vn:return i*e*4/s.components*s.byteLength;case Go:return i*e*4/s.components*s.byteLength;case $r:case Kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Qr:case jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xo:case Yo:return Math.max(i,16)*Math.max(e,8)/4;case Wo:case qo:return Math.max(i,8)*Math.max(e,8)/2;case Zo:case Jo:case Ko:case Qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $o:case ea:case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case nl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case al:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ul:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case pl:case ml:case gl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case xl:case _l:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ta:case vl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function cp(i){switch(i){case Xt:case Uc:return{byteLength:1,components:1};case Zs:case Fc:case Ut:return{byteLength:2,components:1};case zo:case Vo:return{byteLength:2,components:4};case Pn:case Bo:case _n:return{byteLength:4,components:1};case Oc:case Bc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:No}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=No);function Rd(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function hp(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,x)=>p.start-x.start);let u=0;for(let p=1;p<d.length;p++){let x=d[u],v=d[p];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++u,d[u]=v)}d.length=u+1;for(let p=0,x=d.length;p<x;p++){let v=d[p];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dp=`#ifdef USE_ALPHAHASH
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
#endif`,fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xp=`#ifdef USE_AOMAP
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
#endif`,_p=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vp=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,yp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ep=`#ifdef USE_IRIDESCENCE
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
#endif`,Tp=`#ifdef USE_BUMPMAP
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
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Dp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Np=`#define PI 3.141592653589793
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
} // validated`,Up=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fp=`vec3 transformedNormal = objectNormal;
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
#endif`,Op=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hp="gl_FragColor = linearToOutputTexel( gl_FragColor );",kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gp=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Wp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Xp=`#ifdef USE_ENVMAP
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
#endif`,qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yp=`#ifdef USE_ENVMAP
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
#endif`,Zp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$p=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qp=`#ifdef USE_GRADIENTMAP
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
}`,jp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,em=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nm=`uniform bool receiveShadow;
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
#endif
#include <lightprobes_pars_fragment>`,im=`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
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
#endif`,sm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,am=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,om=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,cm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hm=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,um=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,dm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,pm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_m=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ym=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mm=`#if defined( USE_POINTS_UV )
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
#endif`,Sm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Em=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Am=`#ifdef USE_MORPHTARGETS
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
#endif`,Cm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Pm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nm=`#ifdef USE_NORMALMAP
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
#endif`,Um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Om=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Hm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,km=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ym=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Zm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,$m=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,Km=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qm=`#ifdef USE_SKINNING
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
#endif`,jm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e0=`#ifdef USE_SKINNING
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
#endif`,t0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,r0=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a0=`#ifdef USE_TRANSMISSION
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
#endif`,o0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,u0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,d0=`uniform sampler2D t2D;
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
}`,f0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`#include <common>
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
}`,_0=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,v0=`#define DISTANCE
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
}`,y0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
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
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,S0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b0=`uniform float scale;
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
}`,E0=`uniform vec3 diffuse;
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
}`,T0=`#include <common>
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
}`,w0=`uniform vec3 diffuse;
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
}`,A0=`#define LAMBERT
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
}`,C0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,R0=`#define MATCAP
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
}`,P0=`#define MATCAP
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
}`,I0=`#define NORMAL
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
}`,L0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,D0=`#define PHONG
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
}`,N0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,U0=`#define STANDARD
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
}`,F0=`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,O0=`#define TOON
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
}`,B0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,z0=`uniform float size;
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
}`,V0=`uniform vec3 diffuse;
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
}`,H0=`#include <common>
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
}`,k0=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,G0=`uniform float rotation;
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
}`,W0=`uniform vec3 diffuse;
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
}`,ke={alphahash_fragment:up,alphahash_pars_fragment:dp,alphamap_fragment:fp,alphamap_pars_fragment:pp,alphatest_fragment:mp,alphatest_pars_fragment:gp,aomap_fragment:xp,aomap_pars_fragment:_p,batching_pars_vertex:vp,batching_vertex:yp,begin_vertex:Mp,beginnormal_vertex:Sp,bsdfs:bp,iridescence_fragment:Ep,bumpmap_pars_fragment:Tp,clipping_planes_fragment:wp,clipping_planes_pars_fragment:Ap,clipping_planes_pars_vertex:Cp,clipping_planes_vertex:Rp,color_fragment:Pp,color_pars_fragment:Ip,color_pars_vertex:Lp,color_vertex:Dp,common:Np,cube_uv_reflection_fragment:Up,defaultnormal_vertex:Fp,displacementmap_pars_vertex:Op,displacementmap_vertex:Bp,emissivemap_fragment:zp,emissivemap_pars_fragment:Vp,colorspace_fragment:Hp,colorspace_pars_fragment:kp,envmap_fragment:Gp,envmap_common_pars_fragment:Wp,envmap_pars_fragment:Xp,envmap_pars_vertex:qp,envmap_physical_pars_fragment:im,envmap_vertex:Yp,fog_vertex:Zp,fog_pars_vertex:Jp,fog_fragment:$p,fog_pars_fragment:Kp,gradientmap_pars_fragment:Qp,lightmap_pars_fragment:jp,lights_lambert_fragment:em,lights_lambert_pars_fragment:tm,lights_pars_begin:nm,lights_toon_fragment:sm,lights_toon_pars_fragment:rm,lights_phong_fragment:am,lights_phong_pars_fragment:om,lights_physical_fragment:lm,lights_physical_pars_fragment:cm,lights_fragment_begin:hm,lights_fragment_maps:um,lights_fragment_end:dm,lightprobes_pars_fragment:fm,logdepthbuf_fragment:pm,logdepthbuf_pars_fragment:mm,logdepthbuf_pars_vertex:gm,logdepthbuf_vertex:xm,map_fragment:_m,map_pars_fragment:vm,map_particle_fragment:ym,map_particle_pars_fragment:Mm,metalnessmap_fragment:Sm,metalnessmap_pars_fragment:bm,morphinstance_vertex:Em,morphcolor_vertex:Tm,morphnormal_vertex:wm,morphtarget_pars_vertex:Am,morphtarget_vertex:Cm,normal_fragment_begin:Rm,normal_fragment_maps:Pm,normal_pars_fragment:Im,normal_pars_vertex:Lm,normal_vertex:Dm,normalmap_pars_fragment:Nm,clearcoat_normal_fragment_begin:Um,clearcoat_normal_fragment_maps:Fm,clearcoat_pars_fragment:Om,iridescence_pars_fragment:Bm,opaque_fragment:zm,packing:Vm,premultiplied_alpha_fragment:Hm,project_vertex:km,dithering_fragment:Gm,dithering_pars_fragment:Wm,roughnessmap_fragment:Xm,roughnessmap_pars_fragment:qm,shadowmap_pars_fragment:Ym,shadowmap_pars_vertex:Zm,shadowmap_vertex:Jm,shadowmask_pars_fragment:$m,skinbase_vertex:Km,skinning_pars_vertex:Qm,skinning_vertex:jm,skinnormal_vertex:e0,specularmap_fragment:t0,specularmap_pars_fragment:n0,tonemapping_fragment:i0,tonemapping_pars_fragment:s0,transmission_fragment:r0,transmission_pars_fragment:a0,uv_pars_fragment:o0,uv_pars_vertex:l0,uv_vertex:c0,worldpos_vertex:h0,background_vert:u0,background_frag:d0,backgroundCube_vert:f0,backgroundCube_frag:p0,cube_vert:m0,cube_frag:g0,depth_vert:x0,depth_frag:_0,distance_vert:v0,distance_frag:y0,equirect_vert:M0,equirect_frag:S0,linedashed_vert:b0,linedashed_frag:E0,meshbasic_vert:T0,meshbasic_frag:w0,meshlambert_vert:A0,meshlambert_frag:C0,meshmatcap_vert:R0,meshmatcap_frag:P0,meshnormal_vert:I0,meshnormal_frag:L0,meshphong_vert:D0,meshphong_frag:N0,meshphysical_vert:U0,meshphysical_frag:F0,meshtoon_vert:O0,meshtoon_frag:B0,points_vert:z0,points_frag:V0,shadow_vert:H0,shadow_frag:k0,sprite_vert:G0,sprite_frag:W0},ue={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},$n={basic:{uniforms:qt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:qt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ce(0)},envMapIntensity:{value:1}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:qt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:qt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:qt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ce(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:qt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:qt([ue.points,ue.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:qt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:qt([ue.common,ue.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:qt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:qt([ue.sprite,ue.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distance:{uniforms:qt([ue.common,ue.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distance_vert,fragmentShader:ke.distance_frag},shadow:{uniforms:qt([ue.lights,ue.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};$n.physical={uniforms:qt([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var El={r:0,b:0,g:0},X0=new at,Pd=new Fe;Pd.set(-1,0,0,0,1,0,0,0,1);function q0(i,e,t,n,s,r){let a=new Ce(0),o=s===!0?0:1,c,l,h=null,d=0,u=null;function p(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){let b=M.backgroundBlurriness>0;E=e.get(E,b)}return E}function x(M){let E=!1,b=p(M);b===null?m(a,o):b&&b.isColor&&(m(b,1),E=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(M,E){let b=p(E);b&&(b.isCubeTexture||b.mapping===Zr)?(l===void 0&&(l=new et(new Yn(1,1,1),new Xe({name:"BackgroundCubeMaterial",uniforms:rs($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(X0.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Pd),l.material.toneMapped=qe.getTransfer(b.colorSpace)!==nt,(h!==b||d!==b.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new et(new Ur(2,2),new Xe({name:"BackgroundMaterial",uniforms:rs($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=qe.getTransfer(b.colorSpace)!==nt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,E){M.getRGB(El,Gc(i)),t.buffers.color.setClear(El.r,El.g,El.b,E,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:x,addToRenderList:v,dispose:f}}function Y0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(R,F,W,X,O){let H=!1,G=d(R,X,W,F);r!==G&&(r=G,l(r.object)),H=p(R,X,W,O),H&&x(R,X,W,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,b(R,F,W,X),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function d(R,F,W,X){let O=X.wireframe===!0,H=n[F.id];H===void 0&&(H={},n[F.id]=H);let G=R.isInstancedMesh===!0?R.id:0,j=H[G];j===void 0&&(j={},H[G]=j);let ne=j[W.id];ne===void 0&&(ne={},j[W.id]=ne);let de=ne[O];return de===void 0&&(de=u(c()),ne[O]=de),de}function u(R){let F=[],W=[],X=[];for(let O=0;O<t;O++)F[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:X,object:R,attributes:{},index:null}}function p(R,F,W,X){let O=r.attributes,H=F.attributes,G=0,j=W.getAttributes();for(let ne in j)if(j[ne].location>=0){let Se=O[ne],we=H[ne];if(we===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(we=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(we=R.instanceColor)),Se===void 0||Se.attribute!==we||we&&Se.data!==we.data)return!0;G++}return r.attributesNum!==G||r.index!==X}function x(R,F,W,X){let O={},H=F.attributes,G=0,j=W.getAttributes();for(let ne in j)if(j[ne].location>=0){let Se=H[ne];Se===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(Se=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(Se=R.instanceColor));let we={};we.attribute=Se,Se&&Se.data&&(we.data=Se.data),O[ne]=we,G++}r.attributes=O,r.attributesNum=G,r.index=X}function v(){let R=r.newAttributes;for(let F=0,W=R.length;F<W;F++)R[F]=0}function m(R){f(R,0)}function f(R,F){let W=r.newAttributes,X=r.enabledAttributes,O=r.attributeDivisors;W[R]=1,X[R]===0&&(i.enableVertexAttribArray(R),X[R]=1),O[R]!==F&&(i.vertexAttribDivisor(R,F),O[R]=F)}function M(){let R=r.newAttributes,F=r.enabledAttributes;for(let W=0,X=F.length;W<X;W++)F[W]!==R[W]&&(i.disableVertexAttribArray(W),F[W]=0)}function E(R,F,W,X,O,H,G){G===!0?i.vertexAttribIPointer(R,F,W,O,H):i.vertexAttribPointer(R,F,W,X,O,H)}function b(R,F,W,X){v();let O=X.attributes,H=W.getAttributes(),G=F.defaultAttributeValues;for(let j in H){let ne=H[j];if(ne.location>=0){let de=O[j];if(de===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(de=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(de=R.instanceColor)),de!==void 0){let Se=de.normalized,we=de.itemSize,Qe=e.get(de);if(Qe===void 0)continue;let ot=Qe.buffer,Ve=Qe.type,$=Qe.bytesPerElement,ge=Ve===i.INT||Ve===i.UNSIGNED_INT||de.gpuType===Bo;if(de.isInterleavedBufferAttribute){let ae=de.data,De=ae.stride,Oe=de.offset;if(ae.isInstancedInterleavedBuffer){for(let Ne=0;Ne<ne.locationSize;Ne++)f(ne.location+Ne,ae.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ne=0;Ne<ne.locationSize;Ne++)m(ne.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let Ne=0;Ne<ne.locationSize;Ne++)E(ne.location+Ne,we/ne.locationSize,Ve,Se,De*$,(Oe+we/ne.locationSize*Ne)*$,ge)}else{if(de.isInstancedBufferAttribute){for(let ae=0;ae<ne.locationSize;ae++)f(ne.location+ae,de.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ae=0;ae<ne.locationSize;ae++)m(ne.location+ae);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let ae=0;ae<ne.locationSize;ae++)E(ne.location+ae,we/ne.locationSize,Ve,Se,we*$,we/ne.locationSize*ae*$,ge)}}else if(G!==void 0){let Se=G[j];if(Se!==void 0)switch(Se.length){case 2:i.vertexAttrib2fv(ne.location,Se);break;case 3:i.vertexAttrib3fv(ne.location,Se);break;case 4:i.vertexAttrib4fv(ne.location,Se);break;default:i.vertexAttrib1fv(ne.location,Se)}}}}M()}function C(){A();for(let R in n){let F=n[R];for(let W in F){let X=F[W];for(let O in X){let H=X[O];for(let G in H)h(H[G].object),delete H[G];delete X[O]}}delete n[R]}}function w(R){if(n[R.id]===void 0)return;let F=n[R.id];for(let W in F){let X=F[W];for(let O in X){let H=X[O];for(let G in H)h(H[G].object),delete H[G];delete X[O]}}delete n[R.id]}function P(R){for(let F in n){let W=n[F];for(let X in W){let O=W[X];if(O[R.id]===void 0)continue;let H=O[R.id];for(let G in H)h(H[G].object),delete H[G];delete O[R.id]}}}function y(R){for(let F in n){let W=n[F],X=R.isInstancedMesh===!0?R.id:0,O=W[X];if(O!==void 0){for(let H in O){let G=O[H];for(let j in G)h(G[j].object),delete G[j];delete O[H]}delete W[X],Object.keys(W).length===0&&delete n[F]}}}function A(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:I,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Z0(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function J0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==vn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===Ut&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Xt&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==_n&&!y)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Re("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:b,maxSamples:C,samples:w}}function $0(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Bn,o=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){let x=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||x===null||x.length===0||r&&!m)r?h(null):l();else{let M=r?0:n,E=M*4,b=f.clippingState||null;c.value=b,b=h(x,u,E,p);for(let C=0;C!==E;++C)b[C]=t[C];f.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,x){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=c.value,x!==!0||m===null){let f=p+v*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,b=p;E!==v;++E,b+=4)a.copy(d[E]).applyMatrix4(M,o),a.normal.toArray(m,b),m[b+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var Oi=4,od=[.125,.215,.35,.446,.526,.582],as=20,K0=256,na=new ts,ld=new Ce,Qc=null,jc=0,eh=0,th=!1,Q0=new L,wl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Q0}=r;Qc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),eh=this._renderer.getActiveMipmapLevel(),th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ud(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qc,jc,eh),this._renderer.xr.enabled=th,e.scissorTest=!1,Qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Di||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),eh=this._renderer.getActiveMipmapLevel(),th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:Ut,format:vn,colorSpace:_r,depthBuffer:!1},s=cd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=j0(r)),this._blurMaterial=tg(r,e,t),this._ggxMaterial=eg(r,e,t)}return s}_compileMaterial(e){let t=new et(new Ke,e);this._renderer.compile(t,na)}_sceneToCubeUV(e,t,n,s,r){let c=new zt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(ld),d.toneMapping=Rn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new et(new Yn,new Qt({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,f=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(ld),f=!0);for(let E=0;E<6;E++){let b=E%3;b===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):b===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));let C=this._cubeSize;Qs(s,b*C,E>2?C:0,C,C),d.setRenderTarget(s),f&&d.render(v,c),d.render(e,c)}d.toneMapping=p,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Di||e.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ud()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Qs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,na)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,p=d*u,{_lodMax:x}=this,v=this._sizeLods[n],m=3*v*(n>x-Oi?n-x+Oi:0),f=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=x-t,Qs(r,m,f,3*v,2*v),s.setRenderTarget(r),s.render(o,na),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-n,Qs(e,m,f,3*v,2*v),s.setRenderTarget(e),s.render(o,na)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ie("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=l;let u=l.uniforms,p=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*as-1),v=r/x,m=isFinite(r)?1+Math.floor(h*v):as;m>as&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${as}`);let f=[],M=0;for(let P=0;P<as;++P){let y=P/v,A=Math.exp(-y*y/2);f.push(A),P===0?M+=A:P<m&&(M+=2*A)}for(let P=0;P<f.length;P++)f[P]=f[P]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:E}=this;u.dTheta.value=x,u.mipInt.value=E-n;let b=this._sizeLods[s],C=3*b*(s>E-Oi?s-E+Oi:0),w=4*(this._cubeSize-b);Qs(t,C,w,3*b,2*b),c.setRenderTarget(t),c.render(d,na)}};function j0(i){let e=[],t=[],n=[],s=i,r=i-Oi+1+od.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Oi?c=od[a-i+Oi-1]:a===0&&(c=0),t.push(c);let l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,x=6,v=3,m=2,f=1,M=new Float32Array(v*x*p),E=new Float32Array(m*x*p),b=new Float32Array(f*x*p);for(let w=0;w<p;w++){let P=w%3*2/3-1,y=w>2?0:-1,A=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];M.set(A,v*x*w),E.set(u,m*x*w);let I=[w,w,w,w,w,w];b.set(I,f*x*w)}let C=new Ke;C.setAttribute("position",new Le(M,v)),C.setAttribute("uv",new Le(E,m)),C.setAttribute("faceIndex",new Le(b,f)),n.push(new et(C,null)),s>Oi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function cd(i,e,t){let n=new Tt(i,e,t);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function eg(i,e,t){return new Xe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:K0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Rl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:sn,depthTest:!1,depthWrite:!1})}function tg(i,e,t){let n=new Float32Array(as),s=new L(0,1,0);return new Xe({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Rl(),fragmentShader:`

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
		`,blending:sn,depthTest:!1,depthWrite:!1})}function hd(){return new Xe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rl(),fragmentShader:`

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
		`,blending:sn,depthTest:!1,depthWrite:!1})}function ud(){return new Xe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:sn,depthTest:!1,depthWrite:!1})}function Rl(){return`

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
	`}var Al=class extends Tt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Pr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Yn(5,5,5),r=new Xe({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:sn});r.uniforms.tEquirect.value=t;let a=new et(s,r),o=t.minFilter;return t.minFilter===Ni&&(t.minFilter=It),new Io(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function ng(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===Uo||p===Fo)if(e.has(u)){let x=e.get(u).texture;return o(x,u.mapping)}else{let x=u.image;if(x&&x.height>0){let v=new Al(x.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",l),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let p=u.mapping,x=p===Uo||p===Fo,v=p===Di||p===ss;if(x||v){let m=t.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new wl(i)),m=x?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return x&&M&&M.height>0||v&&M&&c(M)?(n===null&&(n=new wl(i)),m=x?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===Uo?u.mapping=Di:p===Fo&&(u.mapping=ss),u}function c(u){let p=0,x=6;for(let v=0;v<x;v++)u[v]!==void 0&&p++;return p===x}function l(u){let p=u.target;p.removeEventListener("dispose",l);let x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function ig(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&oo("WebGLRenderer: "+n+" extension not supported."),s}}}function sg(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let x in u.attributes)e.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete s[u.id];let p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){let u=d.attributes;for(let p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(d){let u=[],p=d.index,x=d.attributes.position,v=0;if(x===void 0)return;if(p!==null){let M=p.array;v=p.version;for(let E=0,b=M.length;E<b;E+=3){let C=M[E+0],w=M[E+1],P=M[E+2];u.push(C,w,w,P,P,C)}}else{let M=x.array;v=x.version;for(let E=0,b=M.length/3-1;E<b;E+=3){let C=E+0,w=E+1,P=E+2;u.push(C,w,w,P,P,C)}}let m=new(x.count>=65535?wr:Tr)(u,1);m.version=v;let f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function rg(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function l(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,d*a,p),t.update(u,n,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let v=0;for(let m=0;m<p;m++)v+=u[m];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function ag(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ie("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function og(i,e,t){let n=new WeakMap,s=new St;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let A=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],E=0;p===!0&&(E=1),x===!0&&(E=2),v===!0&&(E=3);let b=o.attributes.position.count*E,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let w=new Float32Array(b*C*4*d),P=new Sr(w,b,C,d);P.type=_n,P.needsUpdate=!0;let y=E*4;for(let I=0;I<d;I++){let R=m[I],F=f[I],W=M[I],X=b*C*4*I;for(let O=0;O<R.count;O++){let H=O*y;p===!0&&(s.fromBufferAttribute(R,O),w[X+H+0]=s.x,w[X+H+1]=s.y,w[X+H+2]=s.z,w[X+H+3]=0),x===!0&&(s.fromBufferAttribute(F,O),w[X+H+4]=s.x,w[X+H+5]=s.y,w[X+H+6]=s.z,w[X+H+7]=0),v===!0&&(s.fromBufferAttribute(W,O),w[X+H+8]=s.x,w[X+H+9]=s.y,w[X+H+10]=s.z,w[X+H+11]=W.itemSize===4?s.w:1)}}u={count:d,texture:P,size:new me(b,C)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];let x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function lg(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var cg={[kr]:"LINEAR_TONE_MAPPING",[Gr]:"REINHARD_TONE_MAPPING",[Wr]:"CINEON_TONE_MAPPING",[is]:"ACES_FILMIC_TONE_MAPPING",[qr]:"AGX_TONE_MAPPING",[Yr]:"NEUTRAL_TONE_MAPPING",[Xr]:"CUSTOM_TONE_MAPPING"};function hg(i,e,t,n,s){let r=new Tt(e,t,{type:i,depthBuffer:n,stencilBuffer:s,depthTexture:n?new di(e,t):void 0}),a=new Tt(e,t,{type:Ut,depthBuffer:!1,stencilBuffer:!1}),o=new Ke;o.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new We([0,2,0,0,2,0],2));let c=new Ws({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new et(o,c),h=new ts(-1,1,1,-1,0,1),d=null,u=null,p=!1,x,v=null,m=[],f=!1;this.setSize=function(M,E){r.setSize(M,E),a.setSize(M,E);for(let b=0;b<m.length;b++){let C=m[b];C.setSize&&C.setSize(M,E)}},this.setEffects=function(M){m=M,f=m.length>0&&m[0].isRenderPass===!0;let E=r.width,b=r.height;for(let C=0;C<m.length;C++){let w=m[C];w.setSize&&w.setSize(E,b)}},this.begin=function(M,E){if(p||M.toneMapping===Rn&&m.length===0)return!1;if(v=E,E!==null){let b=E.width,C=E.height;(r.width!==b||r.height!==C)&&this.setSize(b,C)}return f===!1&&M.setRenderTarget(r),x=M.toneMapping,M.toneMapping=Rn,!0},this.hasRenderPass=function(){return f},this.end=function(M,E){M.toneMapping=x,p=!0;let b=r,C=a;for(let w=0;w<m.length;w++){let P=m[w];if(P.enabled!==!1&&(P.render(M,C,b,E),P.needsSwap!==!1)){let y=b;b=C,C=y}}if(d!==M.outputColorSpace||u!==M.toneMapping){d=M.outputColorSpace,u=M.toneMapping,c.defines={},qe.getTransfer(d)===nt&&(c.defines.SRGB_TRANSFER="");let w=cg[u];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(v),M.render(l,h),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),c.dispose()}}var Id=new Kt,sh=new di(1,1),Ld=new Sr,Dd=new ho,Nd=new Pr,dd=[],fd=[],pd=new Float32Array(16),md=new Float32Array(9),gd=new Float32Array(4);function er(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=dd[s];if(r===void 0&&(r=new Float32Array(s),dd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Pl(i,e){let t=fd[e];t===void 0&&(t=new Int32Array(e),fd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ug(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function fg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function pg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function mg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;gd.set(n),i.uniformMatrix2fv(this.addr,!1,gd),Ot(t,n)}}function gg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;md.set(n),i.uniformMatrix3fv(this.addr,!1,md),Ot(t,n)}}function xg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;pd.set(n),i.uniformMatrix4fv(this.addr,!1,pd),Ot(t,n)}}function _g(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function vg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function yg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function Mg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function Sg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function bg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function Eg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function Tg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function wg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(sh.compareFunction=t.isReversedDepthBuffer()?Sl:Ml,r=sh):r=Id,t.setTexture2D(e||r,s)}function Ag(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Dd,s)}function Cg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Nd,s)}function Rg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ld,s)}function Pg(i){switch(i){case 5126:return ug;case 35664:return dg;case 35665:return fg;case 35666:return pg;case 35674:return mg;case 35675:return gg;case 35676:return xg;case 5124:case 35670:return _g;case 35667:case 35671:return vg;case 35668:case 35672:return yg;case 35669:case 35673:return Mg;case 5125:return Sg;case 36294:return bg;case 36295:return Eg;case 36296:return Tg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Ag;case 35680:case 36300:case 36308:case 36293:return Cg;case 36289:case 36303:case 36311:case 36292:return Rg}}function Ig(i,e){i.uniform1fv(this.addr,e)}function Lg(i,e){let t=er(e,this.size,2);i.uniform2fv(this.addr,t)}function Dg(i,e){let t=er(e,this.size,3);i.uniform3fv(this.addr,t)}function Ng(i,e){let t=er(e,this.size,4);i.uniform4fv(this.addr,t)}function Ug(i,e){let t=er(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Fg(i,e){let t=er(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Og(i,e){let t=er(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Bg(i,e){i.uniform1iv(this.addr,e)}function zg(i,e){i.uniform2iv(this.addr,e)}function Vg(i,e){i.uniform3iv(this.addr,e)}function Hg(i,e){i.uniform4iv(this.addr,e)}function kg(i,e){i.uniform1uiv(this.addr,e)}function Gg(i,e){i.uniform2uiv(this.addr,e)}function Wg(i,e){i.uniform3uiv(this.addr,e)}function Xg(i,e){i.uniform4uiv(this.addr,e)}function qg(i,e,t){let n=this.cache,s=e.length,r=Pl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=sh:a=Id;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Yg(i,e,t){let n=this.cache,s=e.length,r=Pl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Dd,r[a])}function Zg(i,e,t){let n=this.cache,s=e.length,r=Pl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Nd,r[a])}function Jg(i,e,t){let n=this.cache,s=e.length,r=Pl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ld,r[a])}function $g(i){switch(i){case 5126:return Ig;case 35664:return Lg;case 35665:return Dg;case 35666:return Ng;case 35674:return Ug;case 35675:return Fg;case 35676:return Og;case 5124:case 35670:return Bg;case 35667:case 35671:return zg;case 35668:case 35672:return Vg;case 35669:case 35673:return Hg;case 5125:return kg;case 36294:return Gg;case 36295:return Wg;case 36296:return Xg;case 35678:case 36198:case 36298:case 36306:case 35682:return qg;case 35679:case 36299:case 36307:return Yg;case 35680:case 36300:case 36308:case 36293:return Zg;case 36289:case 36303:case 36311:case 36292:return Jg}}var rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Pg(t.type)}},ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$g(t.type)}},oh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},nh=/(\w+)(\])?(\[|\.)?/g;function xd(i,e){i.seq.push(e),i.map[e.id]=e}function Kg(i,e,t){let n=i.name,s=n.length;for(nh.lastIndex=0;;){let r=nh.exec(n),a=nh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){xd(t,l===void 0?new rh(o,i,e):new ah(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new oh(o),xd(t,d)),t=d}}}var js=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Kg(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function _d(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Qg=37297,jg=0;function ex(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var vd=new Fe;function tx(i){qe._getMatrix(vd,qe.workingColorSpace,i);let e=`mat3( ${vd.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case vr:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function yd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+ex(i.getShaderSource(e),o)}else return r}function nx(i,e){let t=tx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var ix={[kr]:"Linear",[Gr]:"Reinhard",[Wr]:"Cineon",[is]:"ACESFilmic",[qr]:"AgX",[Yr]:"Neutral",[Xr]:"Custom"};function sx(i,e){let t=ix[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Tl=new L;function rx(){qe.getLuminanceCoefficients(Tl);let i=Tl.x.toFixed(4),e=Tl.y.toFixed(4),t=Tl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ax(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sa).join(`
`)}function ox(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function sa(i){return i!==""}function Md(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var cx=/^[ \t]*#include +<([\w\d./]+)>/gm;function lh(i){return i.replace(cx,ux)}var hx=new Map;function ux(i,e){let t=ke[e];if(t===void 0){let n=hx.get(e);if(n!==void 0)t=ke[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return lh(t)}var dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bd(i){return i.replace(dx,fx)}function fx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ed(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var px={[Hr]:"SHADOWMAP_TYPE_PCF",[Ys]:"SHADOWMAP_TYPE_VSM"};function mx(i){return px[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var gx={[Di]:"ENVMAP_TYPE_CUBE",[ss]:"ENVMAP_TYPE_CUBE",[Zr]:"ENVMAP_TYPE_CUBE_UV"};function xx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":gx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var _x={[ss]:"ENVMAP_MODE_REFRACTION"};function vx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":_x[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var yx={[Dc]:"ENVMAP_BLENDING_MULTIPLY",[Gu]:"ENVMAP_BLENDING_MIX",[Wu]:"ENVMAP_BLENDING_ADD"};function Mx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":yx[i.combine]||"ENVMAP_BLENDING_NONE"}function Sx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function bx(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=mx(t),l=xx(t),h=vx(t),d=Mx(t),u=Sx(t),p=ax(t),x=ox(r),v=s.createProgram(),m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(sa).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(sa).join(`
`),f.length>0&&(f+=`
`)):(m=[Ed(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sa).join(`
`),f=[Ed(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rn?"#define TONE_MAPPING":"",t.toneMapping!==Rn?ke.tonemapping_pars_fragment:"",t.toneMapping!==Rn?sx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,nx("linearToOutputTexel",t.outputColorSpace),rx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(sa).join(`
`)),a=lh(a),a=Md(a,t),a=Sd(a,t),o=lh(o),o=Md(o,t),o=Sd(o,t),a=bd(a),o=bd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let E=M+m+a,b=M+f+o,C=_d(s,s.VERTEX_SHADER,E),w=_d(s,s.FRAGMENT_SHADER,b);s.attachShader(v,C),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(R){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(v)||"",W=s.getShaderInfoLog(C)||"",X=s.getShaderInfoLog(w)||"",O=F.trim(),H=W.trim(),G=X.trim(),j=!0,ne=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,C,w);else{let de=yd(s,C,"vertex"),Se=yd(s,w,"fragment");Ie("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+de+`
`+Se)}else O!==""?Re("WebGLProgram: Program Info Log:",O):(H===""||G==="")&&(ne=!1);ne&&(R.diagnostics={runnable:j,programLog:O,vertexShader:{log:H,prefix:m},fragmentShader:{log:G,prefix:f}})}s.deleteShader(C),s.deleteShader(w),y=new js(s,v),A=lx(s,v)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(v,Qg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=w,this}var Ex=0,ch=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hh(e),t.set(e,n)),n}},hh=class{constructor(e){this.id=Ex++,this.code=e,this.usedTimes=0}};function Tx(i){return i===Fi||i===ea||i===ta}function wx(i,e,t,n,s,r){let a=new zs,o=new ch,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,A,I,R,F,W){let X=R.fog,O=F.geometry,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,j=e.get(y.envMap||H,G),ne=j&&j.mapping===Zr?j.image.height:null,de=p[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&Re("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let Se=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,we=Se!==void 0?Se.length:0,Qe=0;O.morphAttributes.position!==void 0&&(Qe=1),O.morphAttributes.normal!==void 0&&(Qe=2),O.morphAttributes.color!==void 0&&(Qe=3);let ot,Ve,$,ge;if(de){let Be=$n[de];ot=Be.vertexShader,Ve=Be.fragmentShader}else ot=y.vertexShader,Ve=y.fragmentShader,o.update(y),$=o.getVertexShaderID(y),ge=o.getFragmentShaderID(y);let ae=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Oe=F.isInstancedMesh===!0,Ne=F.isBatchedMesh===!0,yt=!!y.map,Ze=!!y.matcap,lt=!!j,_t=!!y.aoMap,Ye=!!y.lightMap,Lt=!!y.bumpMap,Mt=!!y.normalMap,hn=!!y.displacementMap,N=!!y.emissiveMap,Dt=!!y.metalnessMap,Je=!!y.roughnessMap,ft=y.anisotropy>0,he=y.clearcoat>0,bt=y.dispersion>0,T=y.iridescence>0,_=y.sheen>0,B=y.transmission>0,Z=ft&&!!y.anisotropyMap,Q=he&&!!y.clearcoatMap,ie=he&&!!y.clearcoatNormalMap,ce=he&&!!y.clearcoatRoughnessMap,q=T&&!!y.iridescenceMap,J=T&&!!y.iridescenceThicknessMap,xe=_&&!!y.sheenColorMap,ye=_&&!!y.sheenRoughnessMap,oe=!!y.specularMap,se=!!y.specularColorMap,Ue=!!y.specularIntensityMap,He=B&&!!y.transmissionMap,tt=B&&!!y.thicknessMap,D=!!y.gradientMap,re=!!y.alphaMap,Y=y.alphaTest>0,_e=!!y.alphaHash,le=!!y.extensions,K=Rn;y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(K=i.toneMapping);let Ee={shaderID:de,shaderType:y.type,shaderName:y.name,vertexShader:ot,fragmentShader:Ve,defines:y.defines,customVertexShaderID:$,customFragmentShaderID:ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ne,batchingColor:Ne&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:yt,matcap:Ze,envMap:lt,envMapMode:lt&&j.mapping,envMapCubeUVHeight:ne,aoMap:_t,lightMap:Ye,bumpMap:Lt,normalMap:Mt,displacementMap:hn,emissiveMap:N,normalMapObjectSpace:Mt&&y.normalMapType===Yu,normalMapTangentSpace:Mt&&y.normalMapType===yl,packedNormalMap:Mt&&y.normalMapType===yl&&Tx(y.normalMap.format),metalnessMap:Dt,roughnessMap:Je,anisotropy:ft,anisotropyMap:Z,clearcoat:he,clearcoatMap:Q,clearcoatNormalMap:ie,clearcoatRoughnessMap:ce,dispersion:bt,iridescence:T,iridescenceMap:q,iridescenceThicknessMap:J,sheen:_,sheenColorMap:xe,sheenRoughnessMap:ye,specularMap:oe,specularColorMap:se,specularIntensityMap:Ue,transmission:B,transmissionMap:He,thicknessMap:tt,gradientMap:D,opaque:y.transparent===!1&&y.blending===Zi&&y.alphaToCoverage===!1,alphaMap:re,alphaTest:Y,alphaHash:_e,combine:y.combine,mapUv:yt&&x(y.map.channel),aoMapUv:_t&&x(y.aoMap.channel),lightMapUv:Ye&&x(y.lightMap.channel),bumpMapUv:Lt&&x(y.bumpMap.channel),normalMapUv:Mt&&x(y.normalMap.channel),displacementMapUv:hn&&x(y.displacementMap.channel),emissiveMapUv:N&&x(y.emissiveMap.channel),metalnessMapUv:Dt&&x(y.metalnessMap.channel),roughnessMapUv:Je&&x(y.roughnessMap.channel),anisotropyMapUv:Z&&x(y.anisotropyMap.channel),clearcoatMapUv:Q&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:ie&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:ye&&x(y.sheenRoughnessMap.channel),specularMapUv:oe&&x(y.specularMap.channel),specularColorMapUv:se&&x(y.specularColorMap.channel),specularIntensityMapUv:Ue&&x(y.specularIntensityMap.channel),transmissionMapUv:He&&x(y.transmissionMap.channel),thicknessMapUv:tt&&x(y.thicknessMap.channel),alphaMapUv:re&&x(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Mt||ft),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(yt||re),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Mt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:De,skinning:F.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Qe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:K,decodeVideoTexture:yt&&y.map.isVideoTexture===!0&&qe.getTransfer(y.map.colorSpace)===nt,decodeVideoTextureEmissive:N&&y.emissiveMap.isVideoTexture===!0&&qe.getTransfer(y.emissiveMap.colorSpace)===nt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===nn,flipSided:y.side===Vt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:le&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&y.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function m(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let I in y.defines)A.push(I),A.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(f(A,y),M(A,y),A.push(i.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function f(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function M(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),y.push(a.mask)}function E(y){let A=p[y.type],I;if(A){let R=$n[A];I=yn.clone(R.uniforms)}else I=y.uniforms;return I}function b(y,A){let I=h.get(A);return I!==void 0?++I.usedTimes:(I=new bx(i,A,y,s),l.push(I),h.set(A,I)),I}function C(y){if(--y.usedTimes===0){let A=l.indexOf(y);l[A]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function w(y){o.remove(y)}function P(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:E,acquireProgram:b,releaseProgram:C,releaseShaderCache:w,programs:l,dispose:P}}function Ax(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Cx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Td(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,x,v,m,f){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:p,material:x,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:f},i[e]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=x,M.materialVariant=a(u),M.groupOrder=v,M.renderOrder=u.renderOrder,M.z=m,M.group=f),e++,M}function c(u,p,x,v,m,f){let M=o(u,p,x,v,m,f);x.transmission>0?n.push(M):x.transparent===!0?s.push(M):t.push(M)}function l(u,p,x,v,m,f){let M=o(u,p,x,v,m,f);x.transmission>0?n.unshift(M):x.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,p){t.length>1&&t.sort(u||Cx),n.length>1&&n.sort(p||Td),s.length>1&&s.sort(p||Td)}function d(){for(let u=e,p=i.length;u<p;u++){let x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function Rx(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new wd,i.set(n,[a])):s>=r.length?(a=new wd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Px(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ce};break;case"SpotLight":t={position:new L,direction:new L,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Ix(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Lx=0;function Dx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Nx(i){let e=new Px,t=Ix(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new at,a=new at;function o(l){let h=0,d=0,u=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,x=0,v=0,m=0,f=0,M=0,E=0,b=0,C=0,w=0,P=0;l.sort(Dx);for(let A=0,I=l.length;A<I;A++){let R=l[A],F=R.color,W=R.intensity,X=R.distance,O=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Fi?O=R.shadow.map.texture:O=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=F.r*W,d+=F.g*W,u+=F.b*W;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],W);P++}else if(R.isDirectionalLight){let H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let G=R.shadow,j=t.get(R);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=O,n.directionalShadowMatrix[p]=R.shadow.matrix,M++}n.directional[p]=H,p++}else if(R.isSpotLight){let H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(F).multiplyScalar(W),H.distance=X,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[v]=H;let G=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,G.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[v]=G.matrix,R.castShadow){let j=t.get(R);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.spotShadow[v]=j,n.spotShadowMap[v]=O,b++}v++}else if(R.isRectAreaLight){let H=e.get(R);H.color.copy(F).multiplyScalar(W),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=H,m++}else if(R.isPointLight){let H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){let G=R.shadow,j=t.get(R);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,j.shadowCameraNear=G.camera.near,j.shadowCameraFar=G.camera.far,n.pointShadow[x]=j,n.pointShadowMap[x]=O,n.pointShadowMatrix[x]=R.shadow.matrix,E++}n.point[x]=H,x++}else if(R.isHemisphereLight){let H=e.get(R);H.skyColor.copy(R.color).multiplyScalar(W),H.groundColor.copy(R.groundColor).multiplyScalar(W),n.hemi[f]=H,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let y=n.hash;(y.directionalLength!==p||y.pointLength!==x||y.spotLength!==v||y.rectAreaLength!==m||y.hemiLength!==f||y.numDirectionalShadows!==M||y.numPointShadows!==E||y.numSpotShadows!==b||y.numSpotMaps!==C||y.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=b+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,y.directionalLength=p,y.pointLength=x,y.spotLength=v,y.rectAreaLength=m,y.hemiLength=f,y.numDirectionalShadows=M,y.numPointShadows=E,y.numSpotShadows=b,y.numSpotMaps=C,y.numLightProbes=P,n.version=Lx++)}function c(l,h){let d=0,u=0,p=0,x=0,v=0,m=h.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){let E=l[f];if(E.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(E.isSpotLight){let b=n.spot[p];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),p++}else if(E.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(E.width*.5,0,0),b.halfHeight.set(0,E.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(E.isPointLight){let b=n.point[u];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){let b=n.hemi[v];b.direction.setFromMatrixPosition(E.matrixWorld),b.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function Ad(i){let e=new Nx(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Ux(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Ad(i),e.set(s,[o])):r>=a.length?(o=new Ad(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Fx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ox=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Bx=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],zx=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Cd=new at,ia=new L,ih=new L;function Vx(i,e,t){let n=new ks,s=new me,r=new me,a=new St,o=new vo,c=new yo,l={},h=t.maxTextureSize,d={[hi]:Vt,[Vt]:hi,[nn]:nn},u=new Xe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:Fx,fragmentShader:Ox}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let x=new Ke;x.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new et(x,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hr;let f=this.type;this.render=function(w,P,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Eu&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Hr);let A=i.getRenderTarget(),I=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),F=i.state;F.setBlending(sn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let W=f!==this.type;W&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=w.length;X<O;X++){let H=w[X],G=H.shadow;if(G===void 0){Re("WebGLShadowMap:",H,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let j=G.getFrameExtents();s.multiply(j),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,G.mapSize.y=r.y));let ne=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ne,G.map===null||W===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ys){if(H.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Tt(s.x,s.y,{format:Fi,type:Ut,minFilter:It,magFilter:It,generateMipmaps:!1}),G.map.texture.name=H.name+".shadowMap",G.map.depthTexture=new di(s.x,s.y,_n),G.map.depthTexture.name=H.name+".shadowMapDepth",G.map.depthTexture.format=Vn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt}else H.isPointLight?(G.map=new Al(s.x),G.map.depthTexture=new xo(s.x,Pn)):(G.map=new Tt(s.x,s.y),G.map.depthTexture=new di(s.x,s.y,Pn)),G.map.depthTexture.name=H.name+".shadowMap",G.map.depthTexture.format=Vn,this.type===Hr?(G.map.depthTexture.compareFunction=ne?Sl:Ml,G.map.depthTexture.minFilter=It,G.map.depthTexture.magFilter=It):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt);G.camera.updateProjectionMatrix()}let de=G.map.isWebGLCubeRenderTarget?6:1;for(let Se=0;Se<de;Se++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,Se),i.clear();else{Se===0&&(i.setRenderTarget(G.map),i.clear());let we=G.getViewport(Se);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),F.viewport(a)}if(H.isPointLight){let we=G.camera,Qe=G.matrix,ot=H.distance||we.far;ot!==we.far&&(we.far=ot,we.updateProjectionMatrix()),ia.setFromMatrixPosition(H.matrixWorld),we.position.copy(ia),ih.copy(we.position),ih.add(Bx[Se]),we.up.copy(zx[Se]),we.lookAt(ih),we.updateMatrixWorld(),Qe.makeTranslation(-ia.x,-ia.y,-ia.z),Cd.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Cd,we.coordinateSystem,we.reversedDepth)}else G.updateMatrices(H);n=G.getFrustum(),b(P,y,G.camera,H,this.type)}G.isPointLightShadow!==!0&&this.type===Ys&&M(G,y),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(A,I,R)};function M(w,P){let y=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Tt(s.x,s.y,{format:Fi,type:Ut})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,y,u,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,y,p,v,null)}function E(w,P,y,A){let I=null,R=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)I=R;else if(I=y.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let F=I.uuid,W=P.uuid,X=l[F];X===void 0&&(X={},l[F]=X);let O=X[W];O===void 0&&(O=I.clone(),X[W]=O,P.addEventListener("dispose",C)),I=O}if(I.visible=P.visible,I.wireframe=P.wireframe,A===Ys?I.side=P.shadowSide!==null?P.shadowSide:P.side:I.side=P.shadowSide!==null?P.shadowSide:d[P.side],I.alphaMap=P.alphaMap,I.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,I.map=P.map,I.clipShadows=P.clipShadows,I.clippingPlanes=P.clippingPlanes,I.clipIntersection=P.clipIntersection,I.displacementMap=P.displacementMap,I.displacementScale=P.displacementScale,I.displacementBias=P.displacementBias,I.wireframeLinewidth=P.wireframeLinewidth,I.linewidth=P.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let F=i.properties.get(I);F.light=y}return I}function b(w,P,y,A,I){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===Ys)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);let W=e.update(w),X=w.material;if(Array.isArray(X)){let O=W.groups;for(let H=0,G=O.length;H<G;H++){let j=O[H],ne=X[j.materialIndex];if(ne&&ne.visible){let de=E(w,ne,A,I);w.onBeforeShadow(i,w,P,y,W,de,j),i.renderBufferDirect(y,null,W,de,w,j),w.onAfterShadow(i,w,P,y,W,de,j)}}}else if(X.visible){let O=E(w,X,A,I);w.onBeforeShadow(i,w,P,y,W,O,null),i.renderBufferDirect(y,null,W,O,w,null),w.onAfterShadow(i,w,P,y,W,O,null)}}let F=w.children;for(let W=0,X=F.length;W<X;W++)b(F[W],P,y,A,I)}function C(w){w.target.removeEventListener("dispose",C);for(let y in l){let A=l[y],I=w.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function Hx(i,e){function t(){let D=!1,re=new St,Y=null,_e=new St(0,0,0,0);return{setMask:function(le){Y!==le&&!D&&(i.colorMask(le,le,le,le),Y=le)},setLocked:function(le){D=le},setClear:function(le,K,Ee,Be,wt){wt===!0&&(le*=Be,K*=Be,Ee*=Be),re.set(le,K,Ee,Be),_e.equals(re)===!1&&(i.clearColor(le,K,Ee,Be),_e.copy(re))},reset:function(){D=!1,Y=null,_e.set(-1,0,0,0)}}}function n(){let D=!1,re=!1,Y=null,_e=null,le=null;return{setReversed:function(K){if(re!==K){let Ee=e.get("EXT_clip_control");K?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),re=K;let Be=le;le=null,this.setClear(Be)}},getReversed:function(){return re},setTest:function(K){K?ae(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(K){Y!==K&&!D&&(i.depthMask(K),Y=K)},setFunc:function(K){if(re&&(K=id[K]),_e!==K){switch(K){case $a:i.depthFunc(i.NEVER);break;case Ka:i.depthFunc(i.ALWAYS);break;case Qa:i.depthFunc(i.LESS);break;case Ji:i.depthFunc(i.LEQUAL);break;case ja:i.depthFunc(i.EQUAL);break;case eo:i.depthFunc(i.GEQUAL);break;case to:i.depthFunc(i.GREATER);break;case no:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=K}},setLocked:function(K){D=K},setClear:function(K){le!==K&&(le=K,re&&(K=1-K),i.clearDepth(K))},reset:function(){D=!1,Y=null,_e=null,le=null,re=!1}}}function s(){let D=!1,re=null,Y=null,_e=null,le=null,K=null,Ee=null,Be=null,wt=null;return{setTest:function(ct){D||(ct?ae(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(ct){re!==ct&&!D&&(i.stencilMask(ct),re=ct)},setFunc:function(ct,ni,Un){(Y!==ct||_e!==ni||le!==Un)&&(i.stencilFunc(ct,ni,Un),Y=ct,_e=ni,le=Un)},setOp:function(ct,ni,Un){(K!==ct||Ee!==ni||Be!==Un)&&(i.stencilOp(ct,ni,Un),K=ct,Ee=ni,Be=Un)},setLocked:function(ct){D=ct},setClear:function(ct){wt!==ct&&(i.clearStencil(ct),wt=ct)},reset:function(){D=!1,re=null,Y=null,_e=null,le=null,K=null,Ee=null,Be=null,wt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},d={},u={},p=new WeakMap,x=[],v=null,m=!1,f=null,M=null,E=null,b=null,C=null,w=null,P=null,y=new Ce(0,0,0),A=0,I=!1,R=null,F=null,W=null,X=null,O=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,j=0,ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(ne)[1]),G=j>=1):ne.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),G=j>=2);let de=null,Se={},we=i.getParameter(i.SCISSOR_BOX),Qe=i.getParameter(i.VIEWPORT),ot=new St().fromArray(we),Ve=new St().fromArray(Qe);function $(D,re,Y,_e){let le=new Uint8Array(4),K=i.createTexture();i.bindTexture(D,K),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ee=0;Ee<Y;Ee++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,_e,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(re+Ee,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return K}let ge={};ge[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(Ji),Lt(!1),Mt(Pc),ae(i.CULL_FACE),_t(sn);function ae(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function De(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Oe(D,re){return u[D]!==re?(i.bindFramebuffer(D,re),u[D]=re,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=re),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Ne(D,re){let Y=x,_e=!1;if(D){Y=p.get(re),Y===void 0&&(Y=[],p.set(re,Y));let le=D.textures;if(Y.length!==le.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let K=0,Ee=le.length;K<Ee;K++)Y[K]=i.COLOR_ATTACHMENT0+K;Y.length=le.length,_e=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,_e=!0);_e&&i.drawBuffers(Y)}function yt(D){return v!==D?(i.useProgram(D),v=D,!0):!1}let Ze={[Ri]:i.FUNC_ADD,[wu]:i.FUNC_SUBTRACT,[Au]:i.FUNC_REVERSE_SUBTRACT};Ze[Cu]=i.MIN,Ze[Ru]=i.MAX;let lt={[Pu]:i.ZERO,[Iu]:i.ONE,[Lu]:i.SRC_COLOR,[Za]:i.SRC_ALPHA,[Bu]:i.SRC_ALPHA_SATURATE,[Fu]:i.DST_COLOR,[Nu]:i.DST_ALPHA,[Du]:i.ONE_MINUS_SRC_COLOR,[Ja]:i.ONE_MINUS_SRC_ALPHA,[Ou]:i.ONE_MINUS_DST_COLOR,[Uu]:i.ONE_MINUS_DST_ALPHA,[zu]:i.CONSTANT_COLOR,[Vu]:i.ONE_MINUS_CONSTANT_COLOR,[Hu]:i.CONSTANT_ALPHA,[ku]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(D,re,Y,_e,le,K,Ee,Be,wt,ct){if(D===sn){m===!0&&(De(i.BLEND),m=!1);return}if(m===!1&&(ae(i.BLEND),m=!0),D!==Tu){if(D!==f||ct!==I){if((M!==Ri||C!==Ri)&&(i.blendEquation(i.FUNC_ADD),M=Ri,C=Ri),ct)switch(D){case Zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case it:i.blendFunc(i.ONE,i.ONE);break;case Ic:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ie("WebGLState: Invalid blending: ",D);break}else switch(D){case Zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case it:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ic:Ie("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lc:Ie("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ie("WebGLState: Invalid blending: ",D);break}E=null,b=null,w=null,P=null,y.set(0,0,0),A=0,f=D,I=ct}return}le=le||re,K=K||Y,Ee=Ee||_e,(re!==M||le!==C)&&(i.blendEquationSeparate(Ze[re],Ze[le]),M=re,C=le),(Y!==E||_e!==b||K!==w||Ee!==P)&&(i.blendFuncSeparate(lt[Y],lt[_e],lt[K],lt[Ee]),E=Y,b=_e,w=K,P=Ee),(Be.equals(y)===!1||wt!==A)&&(i.blendColor(Be.r,Be.g,Be.b,wt),y.copy(Be),A=wt),f=D,I=!1}function Ye(D,re){D.side===nn?De(i.CULL_FACE):ae(i.CULL_FACE);let Y=D.side===Vt;re&&(Y=!Y),Lt(Y),D.blending===Zi&&D.transparent===!1?_t(sn):_t(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let _e=D.stencilWrite;o.setTest(_e),_e&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),N(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(D){R!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),R=D)}function Mt(D){D!==Su?(ae(i.CULL_FACE),D!==F&&(D===Pc?i.cullFace(i.BACK):D===bu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),F=D}function hn(D){D!==W&&(G&&i.lineWidth(D),W=D)}function N(D,re,Y){D?(ae(i.POLYGON_OFFSET_FILL),(X!==re||O!==Y)&&(X=re,O=Y,a.getReversed()&&(re=-re),i.polygonOffset(re,Y))):De(i.POLYGON_OFFSET_FILL)}function Dt(D){D?ae(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function Je(D){D===void 0&&(D=i.TEXTURE0+H-1),de!==D&&(i.activeTexture(D),de=D)}function ft(D,re,Y){Y===void 0&&(de===null?Y=i.TEXTURE0+H-1:Y=de);let _e=Se[Y];_e===void 0&&(_e={type:void 0,texture:void 0},Se[Y]=_e),(_e.type!==D||_e.texture!==re)&&(de!==Y&&(i.activeTexture(Y),de=Y),i.bindTexture(D,re||ge[D]),_e.type=D,_e.texture=re)}function he(){let D=Se[de];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function bt(){try{i.compressedTexImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function _(){try{i.texSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function B(){try{i.texSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function ie(){try{i.texStorage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function ce(){try{i.texStorage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function q(){try{i.texImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function J(){try{i.texImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function xe(D){return d[D]!==void 0?d[D]:i.getParameter(D)}function ye(D,re){d[D]!==re&&(i.pixelStorei(D,re),d[D]=re)}function oe(D){ot.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ot.copy(D))}function se(D){Ve.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Ve.copy(D))}function Ue(D,re){let Y=l.get(re);Y===void 0&&(Y=new WeakMap,l.set(re,Y));let _e=Y.get(D);_e===void 0&&(_e=i.getUniformBlockIndex(re,D.name),Y.set(D,_e))}function He(D,re){let _e=l.get(re).get(D);c.get(re)!==_e&&(i.uniformBlockBinding(re,_e,D.__bindingPointIndex),c.set(re,_e))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},de=null,Se={},u={},p=new WeakMap,x=[],v=null,m=!1,f=null,M=null,E=null,b=null,C=null,w=null,P=null,y=new Ce(0,0,0),A=0,I=!1,R=null,F=null,W=null,X=null,O=null,ot.set(0,0,i.canvas.width,i.canvas.height),Ve.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:De,bindFramebuffer:Oe,drawBuffers:Ne,useProgram:yt,setBlending:_t,setMaterial:Ye,setFlipSided:Lt,setCullFace:Mt,setLineWidth:hn,setPolygonOffset:N,setScissorTest:Dt,activeTexture:Je,bindTexture:ft,unbindTexture:he,compressedTexImage2D:bt,compressedTexImage3D:T,texImage2D:q,texImage3D:J,pixelStorei:ye,getParameter:xe,updateUBOMapping:Ue,uniformBlockBinding:He,texStorage2D:ie,texStorage3D:ce,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:Z,compressedTexSubImage3D:Q,scissor:oe,viewport:se,reset:tt}}function kx(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new me,h=new WeakMap,d=new Set,u,p=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,_){return x?new OffscreenCanvas(T,_):yr("canvas")}function m(T,_,B){let Z=1,Q=bt(T);if((Q.width>B||Q.height>B)&&(Z=B/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ie=Math.floor(Z*Q.width),ce=Math.floor(Z*Q.height);u===void 0&&(u=v(ie,ce));let q=_?v(ie,ce):u;return q.width=ie,q.height=ce,q.getContext("2d").drawImage(T,0,0,ie,ce),Re("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ie+"x"+ce+")."),q}else return"data"in T&&Re("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function f(T){return T.generateMipmaps}function M(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,_,B,Z,Q,ie=!1){if(T!==null){if(i[T]!==void 0)return i[T];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ce;Z&&(ce=e.get("EXT_texture_norm16"),ce||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=_;if(_===i.RED&&(B===i.FLOAT&&(q=i.R32F),B===i.HALF_FLOAT&&(q=i.R16F),B===i.UNSIGNED_BYTE&&(q=i.R8),B===i.UNSIGNED_SHORT&&ce&&(q=ce.R16_EXT),B===i.SHORT&&ce&&(q=ce.R16_SNORM_EXT)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.R8UI),B===i.UNSIGNED_SHORT&&(q=i.R16UI),B===i.UNSIGNED_INT&&(q=i.R32UI),B===i.BYTE&&(q=i.R8I),B===i.SHORT&&(q=i.R16I),B===i.INT&&(q=i.R32I)),_===i.RG&&(B===i.FLOAT&&(q=i.RG32F),B===i.HALF_FLOAT&&(q=i.RG16F),B===i.UNSIGNED_BYTE&&(q=i.RG8),B===i.UNSIGNED_SHORT&&ce&&(q=ce.RG16_EXT),B===i.SHORT&&ce&&(q=ce.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RG8UI),B===i.UNSIGNED_SHORT&&(q=i.RG16UI),B===i.UNSIGNED_INT&&(q=i.RG32UI),B===i.BYTE&&(q=i.RG8I),B===i.SHORT&&(q=i.RG16I),B===i.INT&&(q=i.RG32I)),_===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGB8UI),B===i.UNSIGNED_SHORT&&(q=i.RGB16UI),B===i.UNSIGNED_INT&&(q=i.RGB32UI),B===i.BYTE&&(q=i.RGB8I),B===i.SHORT&&(q=i.RGB16I),B===i.INT&&(q=i.RGB32I)),_===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),B===i.UNSIGNED_INT&&(q=i.RGBA32UI),B===i.BYTE&&(q=i.RGBA8I),B===i.SHORT&&(q=i.RGBA16I),B===i.INT&&(q=i.RGBA32I)),_===i.RGB&&(B===i.UNSIGNED_SHORT&&ce&&(q=ce.RGB16_EXT),B===i.SHORT&&ce&&(q=ce.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),_===i.RGBA){let J=ie?vr:qe.getTransfer(Q);B===i.FLOAT&&(q=i.RGBA32F),B===i.HALF_FLOAT&&(q=i.RGBA16F),B===i.UNSIGNED_BYTE&&(q=J===nt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ce&&(q=ce.RGBA16_EXT),B===i.SHORT&&ce&&(q=ce.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function C(T,_){let B;return T?_===null||_===Pn||_===Js?B=i.DEPTH24_STENCIL8:_===_n?B=i.DEPTH32F_STENCIL8:_===Zs&&(B=i.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Pn||_===Js?B=i.DEPTH_COMPONENT24:_===_n?B=i.DEPTH_COMPONENT32F:_===Zs&&(B=i.DEPTH_COMPONENT16),B}function w(T,_){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==Rt&&T.minFilter!==It?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function P(T){let _=T.target;_.removeEventListener("dispose",P),A(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function y(T){let _=T.target;_.removeEventListener("dispose",y),R(_)}function A(T){let _=n.get(T);if(_.__webglInit===void 0)return;let B=T.source,Z=p.get(B);if(Z){let Q=Z[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&I(T),Object.keys(Z).length===0&&p.delete(B)}n.remove(T)}function I(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let B=T.source,Z=p.get(B);delete Z[_.__cacheKey],a.memory.textures--}function R(T){let _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let Q=0;Q<_.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Z]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=T.textures;for(let Z=0,Q=B.length;Z<Q;Z++){let ie=n.get(B[Z]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(B[Z])}n.remove(T)}let F=0;function W(){F=0}function X(){return F}function O(T){F=T}function H(){let T=F;return T>=s.maxTextures&&Re("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function G(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function j(T,_){let B=n.get(T);if(T.isVideoTexture&&ft(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let Z=T.image;if(Z===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{De(B,T,_);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function ne(T,_){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){De(B,T,_);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function de(T,_){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){De(B,T,_);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function Se(T,_){let B=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&B.__version!==T.version){Oe(B,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}let we={[io]:i.REPEAT,[pn]:i.CLAMP_TO_EDGE,[so]:i.MIRRORED_REPEAT},Qe={[Rt]:i.NEAREST,[Xu]:i.NEAREST_MIPMAP_NEAREST,[Jr]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[Oo]:i.LINEAR_MIPMAP_NEAREST,[Ni]:i.LINEAR_MIPMAP_LINEAR},ot={[Zu]:i.NEVER,[ju]:i.ALWAYS,[Ju]:i.LESS,[Ml]:i.LEQUAL,[$u]:i.EQUAL,[Sl]:i.GEQUAL,[Ku]:i.GREATER,[Qu]:i.NOTEQUAL};function Ve(T,_){if(_.type===_n&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===It||_.magFilter===Oo||_.magFilter===Jr||_.magFilter===Ni||_.minFilter===It||_.minFilter===Oo||_.minFilter===Jr||_.minFilter===Ni)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,we[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,we[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,we[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Qe[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Qe[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ot[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Rt||_.minFilter!==Jr&&_.minFilter!==Ni||_.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function $(T,_){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",P));let Z=_.source,Q=p.get(Z);Q===void 0&&(Q={},p.set(Z,Q));let ie=G(_);if(ie!==T.__cacheKey){Q[ie]===void 0&&(Q[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[ie].usedTimes++;let ce=Q[T.__cacheKey];ce!==void 0&&(Q[T.__cacheKey].usedTimes--,ce.usedTimes===0&&I(_)),T.__cacheKey=ie,T.__webglTexture=Q[ie].texture}return B}function ge(T,_,B){return Math.floor(Math.floor(T/B)/_)}function ae(T,_,B,Z){let ie=T.updateRanges;if(ie.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,B,Z,_.data);else{ie.sort((ye,oe)=>ye.start-oe.start);let ce=0;for(let ye=1;ye<ie.length;ye++){let oe=ie[ce],se=ie[ye],Ue=oe.start+oe.count,He=ge(se.start,_.width,4),tt=ge(oe.start,_.width,4);se.start<=Ue+1&&He===tt&&ge(se.start+se.count-1,_.width,4)===He?oe.count=Math.max(oe.count,se.start+se.count-oe.start):(++ce,ie[ce]=se)}ie.length=ce+1;let q=t.getParameter(i.UNPACK_ROW_LENGTH),J=t.getParameter(i.UNPACK_SKIP_PIXELS),xe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ye=0,oe=ie.length;ye<oe;ye++){let se=ie[ye],Ue=Math.floor(se.start/4),He=Math.ceil(se.count/4),tt=Ue%_.width,D=Math.floor(Ue/_.width),re=He,Y=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,tt,D,re,Y,B,Z,_.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,J),t.pixelStorei(i.UNPACK_SKIP_ROWS,xe)}}function De(T,_,B){let Z=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Z=i.TEXTURE_3D);let Q=$(T,_),ie=_.source;t.bindTexture(Z,T.__webglTexture,i.TEXTURE0+B);let ce=n.get(ie);if(ie.version!==ce.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let Y=qe.getPrimaries(qe.workingColorSpace),_e=_.colorSpace===fi?null:qe.getPrimaries(_.colorSpace),le=_.colorSpace===fi||Y===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let J=m(_.image,!1,s.maxTextureSize);J=he(_,J);let xe=r.convert(_.format,_.colorSpace),ye=r.convert(_.type),oe=b(_.internalFormat,xe,ye,_.normalized,_.colorSpace,_.isVideoTexture);Ve(Z,_);let se,Ue=_.mipmaps,He=_.isVideoTexture!==!0,tt=ce.__version===void 0||Q===!0,D=ie.dataReady,re=w(_,J);if(_.isDepthTexture)oe=C(_.format===Ui,_.type),tt&&(He?t.texStorage2D(i.TEXTURE_2D,1,oe,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,oe,J.width,J.height,0,xe,ye,null));else if(_.isDataTexture)if(Ue.length>0){He&&tt&&t.texStorage2D(i.TEXTURE_2D,re,oe,Ue[0].width,Ue[0].height);for(let Y=0,_e=Ue.length;Y<_e;Y++)se=Ue[Y],He?D&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,se.width,se.height,xe,ye,se.data):t.texImage2D(i.TEXTURE_2D,Y,oe,se.width,se.height,0,xe,ye,se.data);_.generateMipmaps=!1}else He?(tt&&t.texStorage2D(i.TEXTURE_2D,re,oe,J.width,J.height),D&&ae(_,J,xe,ye)):t.texImage2D(i.TEXTURE_2D,0,oe,J.width,J.height,0,xe,ye,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){He&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,oe,Ue[0].width,Ue[0].height,J.depth);for(let Y=0,_e=Ue.length;Y<_e;Y++)if(se=Ue[Y],_.format!==vn)if(xe!==null)if(He){if(D)if(_.layerUpdates.size>0){let le=qc(se.width,se.height,_.format,_.type);for(let K of _.layerUpdates){let Ee=se.data.subarray(K*le/se.data.BYTES_PER_ELEMENT,(K+1)*le/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,K,se.width,se.height,1,xe,Ee)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,se.width,se.height,J.depth,xe,se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,oe,se.width,se.height,J.depth,0,se.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,se.width,se.height,J.depth,xe,ye,se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,oe,se.width,se.height,J.depth,0,xe,ye,se.data)}else{He&&tt&&t.texStorage2D(i.TEXTURE_2D,re,oe,Ue[0].width,Ue[0].height);for(let Y=0,_e=Ue.length;Y<_e;Y++)se=Ue[Y],_.format!==vn?xe!==null?He?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,se.width,se.height,xe,se.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,oe,se.width,se.height,0,se.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?D&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,se.width,se.height,xe,ye,se.data):t.texImage2D(i.TEXTURE_2D,Y,oe,se.width,se.height,0,xe,ye,se.data)}else if(_.isDataArrayTexture)if(He){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,oe,J.width,J.height,J.depth),D)if(_.layerUpdates.size>0){let Y=qc(J.width,J.height,_.format,_.type);for(let _e of _.layerUpdates){let le=J.data.subarray(_e*Y/J.data.BYTES_PER_ELEMENT,(_e+1)*Y/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,J.width,J.height,1,xe,ye,le)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,xe,ye,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,oe,J.width,J.height,J.depth,0,xe,ye,J.data);else if(_.isData3DTexture)He?(tt&&t.texStorage3D(i.TEXTURE_3D,re,oe,J.width,J.height,J.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,xe,ye,J.data)):t.texImage3D(i.TEXTURE_3D,0,oe,J.width,J.height,J.depth,0,xe,ye,J.data);else if(_.isFramebufferTexture){if(tt)if(He)t.texStorage2D(i.TEXTURE_2D,re,oe,J.width,J.height);else{let Y=J.width,_e=J.height;for(let le=0;le<re;le++)t.texImage2D(i.TEXTURE_2D,le,oe,Y,_e,0,xe,ye,null),Y>>=1,_e>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let Y=i.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),J.parentNode!==Y){Y.appendChild(J),d.add(_),Y.onpaint=Be=>{let wt=Be.changedElements;for(let ct of d)wt.includes(ct.image)&&(ct.needsUpdate=!0)},Y.requestPaint();return}let _e=0,le=i.RGBA,K=i.RGBA,Ee=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,_e,le,K,Ee,J),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(He&&tt){let Y=bt(Ue[0]);t.texStorage2D(i.TEXTURE_2D,re,oe,Y.width,Y.height)}for(let Y=0,_e=Ue.length;Y<_e;Y++)se=Ue[Y],He?D&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,xe,ye,se):t.texImage2D(i.TEXTURE_2D,Y,oe,xe,ye,se);_.generateMipmaps=!1}else if(He){if(tt){let Y=bt(J);t.texStorage2D(i.TEXTURE_2D,re,oe,Y.width,Y.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,ye,J)}else t.texImage2D(i.TEXTURE_2D,0,oe,xe,ye,J);f(_)&&M(Z),ce.__version=ie.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Oe(T,_,B){if(_.image.length!==6)return;let Z=$(T,_),Q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let ie=n.get(Q);if(Q.version!==ie.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);let ce=qe.getPrimaries(qe.workingColorSpace),q=_.colorSpace===fi?null:qe.getPrimaries(_.colorSpace),J=_.colorSpace===fi||ce===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let xe=_.isCompressedTexture||_.image[0].isCompressedTexture,ye=_.image[0]&&_.image[0].isDataTexture,oe=[];for(let K=0;K<6;K++)!xe&&!ye?oe[K]=m(_.image[K],!0,s.maxCubemapSize):oe[K]=ye?_.image[K].image:_.image[K],oe[K]=he(_,oe[K]);let se=oe[0],Ue=r.convert(_.format,_.colorSpace),He=r.convert(_.type),tt=b(_.internalFormat,Ue,He,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,re=ie.__version===void 0||Z===!0,Y=Q.dataReady,_e=w(_,se);Ve(i.TEXTURE_CUBE_MAP,_);let le;if(xe){D&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,tt,se.width,se.height);for(let K=0;K<6;K++){le=oe[K].mipmaps;for(let Ee=0;Ee<le.length;Ee++){let Be=le[Ee];_.format!==vn?Ue!==null?D?Y&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,0,0,Be.width,Be.height,Ue,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,tt,Be.width,Be.height,0,Be.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,0,0,Be.width,Be.height,Ue,He,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,tt,Be.width,Be.height,0,Ue,He,Be.data)}}}else{if(le=_.mipmaps,D&&re){le.length>0&&_e++;let K=bt(oe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,tt,K.width,K.height)}for(let K=0;K<6;K++)if(ye){D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,oe[K].width,oe[K].height,Ue,He,oe[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,tt,oe[K].width,oe[K].height,0,Ue,He,oe[K].data);for(let Ee=0;Ee<le.length;Ee++){let wt=le[Ee].image[K].image;D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,0,0,wt.width,wt.height,Ue,He,wt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,tt,wt.width,wt.height,0,Ue,He,wt.data)}}else{D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ue,He,oe[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,tt,Ue,He,oe[K]);for(let Ee=0;Ee<le.length;Ee++){let Be=le[Ee];D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,0,0,Ue,He,Be.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,tt,Ue,He,Be.image[K])}}}f(_)&&M(i.TEXTURE_CUBE_MAP),ie.__version=Q.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ne(T,_,B,Z,Q,ie){let ce=r.convert(B.format,B.colorSpace),q=r.convert(B.type),J=b(B.internalFormat,ce,q,B.normalized,B.colorSpace),xe=n.get(_),ye=n.get(B);if(ye.__renderTarget=_,!xe.__hasExternalTextures){let oe=Math.max(1,_.width>>ie),se=Math.max(1,_.height>>ie);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ie,J,oe,se,_.depth,0,ce,q,null):t.texImage2D(Q,ie,J,oe,se,0,ce,q,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Je(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Q,ye.__webglTexture,0,Dt(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,Q,ye.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function yt(T,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let Z=_.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,ie=C(_.stencilBuffer,Q),ce=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Je(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt(_),ie,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt(_),ie,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ie,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,T)}else{let Z=_.textures;for(let Q=0;Q<Z.length;Q++){let ie=Z[Q],ce=r.convert(ie.format,ie.colorSpace),q=r.convert(ie.type),J=b(ie.internalFormat,ce,q,ie.normalized,ie.colorSpace);Je(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt(_),J,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt(_),J,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,J,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ze(T,_,B){let Z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(_.depthTexture);if(Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,_.depthTexture);let xe=r.convert(_.depthTexture.format),ye=r.convert(_.depthTexture.type),oe;_.depthTexture.format===Vn?oe=i.DEPTH_COMPONENT24:_.depthTexture.format===Ui&&(oe=i.DEPTH24_STENCIL8);for(let se=0;se<6;se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,oe,_.width,_.height,0,xe,ye,null)}}else j(_.depthTexture,0);let ie=Q.__webglTexture,ce=Dt(_),q=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,J=_.depthTexture.format===Ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Vn)Je(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,q,ie,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,J,q,ie,0);else if(_.depthTexture.format===Ui)Je(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,q,ie,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,J,q,ie,0);else throw new Error("Unknown depthTexture format")}function lt(T){let _=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let Z=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Z){let Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=Z}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let Z=0;Z<6;Z++)Ze(_.__webglFramebuffer[Z],T,Z);else{let Z=T.texture.mipmaps;Z&&Z.length>0?Ze(_.__webglFramebuffer[0],T,0):Ze(_.__webglFramebuffer,T,0)}else if(B){_.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Z]),_.__webglDepthbuffer[Z]===void 0)_.__webglDepthbuffer[Z]=i.createRenderbuffer(),yt(_.__webglDepthbuffer[Z],T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ie)}}else{let Z=T.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),yt(_.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ie)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(T,_,B){let Z=n.get(T);_!==void 0&&Ne(Z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&lt(T)}function Ye(T){let _=T.texture,B=n.get(T),Z=n.get(_);T.addEventListener("dispose",y);let Q=T.textures,ie=T.isWebGLCubeRenderTarget===!0,ce=Q.length>1;if(ce||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=_.version,a.memory.textures++),ie){B.__webglFramebuffer=[];for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[q]=[];for(let J=0;J<_.mipmaps.length;J++)B.__webglFramebuffer[q][J]=i.createFramebuffer()}else B.__webglFramebuffer[q]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let q=0;q<_.mipmaps.length;q++)B.__webglFramebuffer[q]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ce)for(let q=0,J=Q.length;q<J;q++){let xe=n.get(Q[q]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Je(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let q=0;q<Q.length;q++){let J=Q[q];B.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[q]);let xe=r.convert(J.format,J.colorSpace),ye=r.convert(J.type),oe=b(J.internalFormat,xe,ye,J.normalized,J.colorSpace,T.isXRRenderTarget===!0),se=Dt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,se,oe,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,B.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),yt(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,_);for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)Ne(B.__webglFramebuffer[q][J],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,J);else Ne(B.__webglFramebuffer[q],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);f(_)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let q=0,J=Q.length;q<J;q++){let xe=Q[q],ye=n.get(xe),oe=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,ye.__webglTexture),Ve(oe,xe),Ne(B.__webglFramebuffer,T,xe,i.COLOR_ATTACHMENT0+q,oe,0),f(xe)&&M(oe)}t.unbindTexture()}else{let q=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(q=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(q,Z.__webglTexture),Ve(q,_),_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)Ne(B.__webglFramebuffer[J],T,_,i.COLOR_ATTACHMENT0,q,J);else Ne(B.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,q,0);f(_)&&M(q),t.unbindTexture()}T.depthBuffer&&lt(T)}function Lt(T){let _=T.textures;for(let B=0,Z=_.length;B<Z;B++){let Q=_[B];if(f(Q)){let ie=E(T),ce=n.get(Q).__webglTexture;t.bindTexture(ie,ce),M(ie),t.unbindTexture()}}}let Mt=[],hn=[];function N(T){if(T.samples>0){if(Je(T)===!1){let _=T.textures,B=T.width,Z=T.height,Q=i.COLOR_BUFFER_BIT,ie=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(T),q=_.length>1;if(q)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);let J=T.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=n.get(_[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ye,0)}i.blitFramebuffer(0,0,B,Z,0,0,B,Z,Q,i.NEAREST),c===!0&&(Mt.length=0,hn.length=0,Mt.push(i.COLOR_ATTACHMENT0+xe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Mt.push(ie),hn.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,hn)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=n.get(_[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Dt(T){return Math.min(s.maxSamples,T.samples)}function Je(T){let _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ft(T){let _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function he(T,_){let B=T.colorSpace,Z=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==_r&&B!==fi&&(qe.getTransfer(B)===nt?(Z!==vn||Q!==Xt)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ie("WebGLTextures: Unsupported texture color space:",B)),_}function bt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=ne,this.setTexture3D=de,this.setTextureCube=Se,this.rebindTextures=_t,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Gx(i,e){function t(n,s=fi){let r,a=qe.getTransfer(s);if(n===Xt)return i.UNSIGNED_BYTE;if(n===zo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Oc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Uc)return i.BYTE;if(n===Fc)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===Bo)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Ut)return i.HALF_FLOAT;if(n===zc)return i.ALPHA;if(n===Vc)return i.RGB;if(n===vn)return i.RGBA;if(n===Vn)return i.DEPTH_COMPONENT;if(n===Ui)return i.DEPTH_STENCIL;if(n===$s)return i.RED;if(n===Ho)return i.RED_INTEGER;if(n===Fi)return i.RG;if(n===ko)return i.RG_INTEGER;if(n===Go)return i.RGBA_INTEGER;if(n===$r||n===Kr||n===Qr||n===jr)if(a===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Wo||n===Xo||n===qo||n===Yo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Xo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zo||n===Jo||n===$o||n===Ko||n===Qo||n===ea||n===jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Zo||n===Jo)return a===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===$o)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ko)return r.COMPRESSED_R11_EAC;if(n===Qo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ea)return r.COMPRESSED_RG11_EAC;if(n===jo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===el)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===il)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===al)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ol)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ll)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===hl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ul)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pl||n===ml||n===gl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===pl)return a===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ml)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===gl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xl||n===_l||n===ta||n===vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===xl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_l)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Wx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xx=`
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

}`,uh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Lr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Xe({vertexShader:Wx,fragmentShader:Xx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new et(new Ur(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},dh=class extends Hn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,x=null,v=typeof XRWebGLBinding<"u",m=new uh,f={},M=t.getContextAttributes(),E=null,b=null,C=[],w=[],P=new me,y=null,A=new zt;A.viewport=new St;let I=new zt;I.viewport=new St;let R=[A,I],F=new Lo,W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ge=C[$];return ge===void 0&&(ge=new Vs,C[$]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function($){let ge=C[$];return ge===void 0&&(ge=new Vs,C[$]=ge),ge.getGripSpace()},this.getHand=function($){let ge=C[$];return ge===void 0&&(ge=new Vs,C[$]=ge),ge.getHandSpace()};function O($){let ge=w.indexOf($.inputSource);if(ge===-1)return;let ae=C[ge];ae!==void 0&&(ae.update($.inputSource,$.frame,l||a),ae.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",G);for(let $=0;$<C.length;$++){let ge=w[$];ge!==null&&(w[$]=null,C[$].disconnect(ge))}W=null,X=null,m.reset();for(let $ in f)delete f[$];e.setRenderTarget(E),p=null,u=null,d=null,s=null,b=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",G),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,De=null,Oe=null;M.depth&&(Oe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=M.stencil?Ui:Vn,De=M.stencil?Js:Pn);let Ne={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ne),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new Tt(u.textureWidth,u.textureHeight,{format:vn,type:Xt,depthTexture:new di(u.textureWidth,u.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ae={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Tt(p.framebufferWidth,p.framebufferHeight,{format:vn,type:Xt,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ve.setContext(s),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G($){for(let ge=0;ge<$.removed.length;ge++){let ae=$.removed[ge],De=w.indexOf(ae);De>=0&&(w[De]=null,C[De].disconnect(ae))}for(let ge=0;ge<$.added.length;ge++){let ae=$.added[ge],De=w.indexOf(ae);if(De===-1){for(let Ne=0;Ne<C.length;Ne++)if(Ne>=w.length){w.push(ae),De=Ne;break}else if(w[Ne]===null){w[Ne]=ae,De=Ne;break}if(De===-1)break}let Oe=C[De];Oe&&Oe.connect(ae)}}let j=new L,ne=new L;function de($,ge,ae){j.setFromMatrixPosition(ge.matrixWorld),ne.setFromMatrixPosition(ae.matrixWorld);let De=j.distanceTo(ne),Oe=ge.projectionMatrix.elements,Ne=ae.projectionMatrix.elements,yt=Oe[14]/(Oe[10]-1),Ze=Oe[14]/(Oe[10]+1),lt=(Oe[9]+1)/Oe[5],_t=(Oe[9]-1)/Oe[5],Ye=(Oe[8]-1)/Oe[0],Lt=(Ne[8]+1)/Ne[0],Mt=yt*Ye,hn=yt*Lt,N=De/(-Ye+Lt),Dt=N*-Ye;if(ge.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Dt),$.translateZ(N),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Oe[10]===-1)$.projectionMatrix.copy(ge.projectionMatrix),$.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{let Je=yt+N,ft=Ze+N,he=Mt-Dt,bt=hn+(De-Dt),T=lt*Ze/ft*Je,_=_t*Ze/ft*Je;$.projectionMatrix.makePerspective(he,bt,T,_,Je,ft),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Se($,ge){ge===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ge.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ge=$.near,ae=$.far;m.texture!==null&&(m.depthNear>0&&(ge=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),F.near=I.near=A.near=ge,F.far=I.far=A.far=ae,(W!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),W=F.near,X=F.far),F.layers.mask=$.layers.mask|6,A.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;let De=$.parent,Oe=F.cameras;Se(F,De);for(let Ne=0;Ne<Oe.length;Ne++)Se(Oe[Ne],De);Oe.length===2?de(F,A,I):F.projectionMatrix.copy(A.projectionMatrix),we($,F,De)};function we($,ge,ae){ae===null?$.matrix.copy(ge.matrixWorld):($.matrix.copy(ae.matrixWorld),$.matrix.invert(),$.matrix.multiply(ge.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ge.projectionMatrix),$.projectionMatrixInverse.copy(ge.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Os*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function($){return f[$]};let Qe=null;function ot($,ge){if(h=ge.getViewerPose(l||a),x=ge,h!==null){let ae=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let De=!1;ae.length!==F.cameras.length&&(F.cameras.length=0,De=!0);for(let Ze=0;Ze<ae.length;Ze++){let lt=ae[Ze],_t=null;if(p!==null)_t=p.getViewport(lt);else{let Lt=d.getViewSubImage(u,lt);_t=Lt.viewport,Ze===0&&(e.setRenderTargetTextures(b,Lt.colorTexture,Lt.depthStencilTexture),e.setRenderTarget(b))}let Ye=R[Ze];Ye===void 0&&(Ye=new zt,Ye.layers.enable(Ze),Ye.viewport=new St,R[Ze]=Ye),Ye.matrix.fromArray(lt.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(lt.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(_t.x,_t.y,_t.width,_t.height),Ze===0&&(F.matrix.copy(Ye.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),De===!0&&F.cameras.push(Ye)}let Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let Ze=d.getDepthInformation(ae[0]);Ze&&Ze.isValid&&Ze.texture&&m.init(Ze,s.renderState)}if(Oe&&Oe.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let Ze=0;Ze<ae.length;Ze++){let lt=ae[Ze].camera;if(lt){let _t=f[lt];_t||(_t=new Lr,f[lt]=_t);let Ye=d.getCameraImage(lt);_t.sourceTexture=Ye}}}}for(let ae=0;ae<C.length;ae++){let De=w[ae],Oe=C[ae];De!==null&&Oe!==void 0&&Oe.update(De,ge,l||a)}Qe&&Qe($,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),x=null}let Ve=new Rd;Ve.setAnimationLoop(ot),this.setAnimationLoop=function($){Qe=$},this.dispose=function(){}}},qx=new at,Ud=new Fe;Ud.set(-1,0,0,0,1,0,0,0,1);function Yx(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Gc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,E,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(r(m,f),x(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,M,E):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Vt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Vt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=e.get(f),E=M.envMap,b=M.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(qx.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ud),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Vt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zx(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,E){let b=E.program;n.uniformBlockBinding(M,b)}function l(M,E){let b=s[M.id];b===void 0&&(x(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",m));let C=E.program;n.updateUBOMapping(M,C);let w=e.render.frame;r[M.id]!==w&&(u(M),r[M.id]=w)}function h(M){let E=d();M.__bindingPointIndex=E;let b=i.createBuffer(),C=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Ie("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let E=s[M.id],b=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,P=b.length;w<P;w++){let y=Array.isArray(b[w])?b[w]:[b[w]];for(let A=0,I=y.length;A<I;A++){let R=y[A];if(p(R,w,A,C)===!0){let F=R.__offset,W=Array.isArray(R.value)?R.value:[R.value],X=0;for(let O=0;O<W.length;O++){let H=W[O],G=v(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,F+X,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):ArrayBuffer.isView(H)?R.__data.set(new H.constructor(H.buffer,H.byteOffset,R.__data.length)):(H.toArray(R.__data,X),X+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,E,b,C){let w=M.value,P=E+"_"+b;if(C[P]===void 0)return typeof w=="number"||typeof w=="boolean"?C[P]=w:ArrayBuffer.isView(w)?C[P]=w.slice():C[P]=w.clone(),!0;{let y=C[P];if(typeof w=="number"||typeof w=="boolean"){if(y!==w)return C[P]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(y.equals(w)===!1)return y.copy(w),!0}}return!1}function x(M){let E=M.uniforms,b=0,C=16;for(let P=0,y=E.length;P<y;P++){let A=Array.isArray(E[P])?E[P]:[E[P]];for(let I=0,R=A.length;I<R;I++){let F=A[I],W=Array.isArray(F.value)?F.value:[F.value];for(let X=0,O=W.length;X<O;X++){let H=W[X],G=v(H),j=b%C,ne=j%G.boundary,de=j+ne;b+=ne,de!==0&&C-de<G.storage&&(b+=C-de),F.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=b,b+=G.storage}}}let w=b%C;return w>0&&(b+=C-w),M.__size=b,M.__cache={},this}function v(M){let E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(E.boundary=16,E.storage=M.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",M),E}function m(M){let E=M.target;E.removeEventListener("dispose",m);let b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}var Jx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function $x(){return Jn===null&&(Jn=new Qi(Jx,16,16,Fi,Ut),Jn.name="DFG_LUT",Jn.minFilter=It,Jn.magFilter=It,Jn.wrapS=pn,Jn.wrapT=pn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var Cl=class{constructor(e={}){let{canvas:t=ed(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Xt}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let v=p,m=new Set([Go,ko,Ho]),f=new Set([Xt,Pn,Zs,Js,zo,Vo]),M=new Uint32Array(4),E=new Int32Array(4),b=new L,C=null,w=null,P=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,R=!1,F=null;this._outputColorSpace=Wt;let W=0,X=0,O=null,H=-1,G=null,j=new St,ne=new St,de=null,Se=new Ce(0),we=0,Qe=t.width,ot=t.height,Ve=1,$=null,ge=null,ae=new St(0,0,Qe,ot),De=new St(0,0,Qe,ot),Oe=!1,Ne=new ks,yt=!1,Ze=!1,lt=new at,_t=new L,Ye=new St,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Mt=!1;function hn(){return O===null?Ve:1}let N=n;function Dt(S,U){return t.getContext(S,U)}try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${No}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",Be,!1),N===null){let U="webgl2";if(N=Dt(U,S),N===null)throw Dt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Ie("WebGLRenderer: "+S.message),S}let Je,ft,he,bt,T,_,B,Z,Q,ie,ce,q,J,xe,ye,oe,se,Ue,He,tt,D,re,Y;function _e(){Je=new ig(N),Je.init(),D=new Gx(N,Je),ft=new J0(N,Je,e,D),he=new Hx(N,Je),ft.reversedDepthBuffer&&u&&he.buffers.depth.setReversed(!0),bt=new ag(N),T=new Ax,_=new kx(N,Je,he,T,ft,D,bt),B=new ng(I),Z=new hp(N),re=new Y0(N,Z),Q=new sg(N,Z,bt,re),ie=new lg(N,Q,Z,re,bt),Ue=new og(N,ft,_),ye=new $0(T),ce=new wx(I,B,Je,ft,re,ye),q=new Yx(I,T),J=new Rx,xe=new Ux(Je),se=new q0(I,B,he,ie,x,c),oe=new Vx(I,ie,ft),Y=new Zx(N,bt,ft,he),He=new Z0(N,Je,bt),tt=new rg(N,Je,bt),bt.programs=ce.programs,I.capabilities=ft,I.extensions=Je,I.properties=T,I.renderLists=J,I.shadowMap=oe,I.state=he,I.info=bt}_e(),v!==Xt&&(A=new hg(v,t.width,t.height,s,r));let le=new dh(I,N);this.xr=le,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let S=Je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Ve},this.setPixelRatio=function(S){S!==void 0&&(Ve=S,this.setSize(Qe,ot,!1))},this.getSize=function(S){return S.set(Qe,ot)},this.setSize=function(S,U,k=!0){if(le.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}Qe=S,ot=U,t.width=Math.floor(S*Ve),t.height=Math.floor(U*Ve),k===!0&&(t.style.width=S+"px",t.style.height=U+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(Qe*Ve,ot*Ve).floor()},this.setDrawingBufferSize=function(S,U,k){Qe=S,ot=U,Ve=k,t.width=Math.floor(S*k),t.height=Math.floor(U*k),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(v===Xt){Ie("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){Re("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(j)},this.getViewport=function(S){return S.copy(ae)},this.setViewport=function(S,U,k,z){S.isVector4?ae.set(S.x,S.y,S.z,S.w):ae.set(S,U,k,z),he.viewport(j.copy(ae).multiplyScalar(Ve).round())},this.getScissor=function(S){return S.copy(De)},this.setScissor=function(S,U,k,z){S.isVector4?De.set(S.x,S.y,S.z,S.w):De.set(S,U,k,z),he.scissor(ne.copy(De).multiplyScalar(Ve).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(S){he.setScissorTest(Oe=S)},this.setOpaqueSort=function(S){$=S},this.setTransparentSort=function(S){ge=S},this.getClearColor=function(S){return S.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,k=!0){let z=0;if(S){let V=!1;if(O!==null){let pe=O.texture.format;V=m.has(pe)}if(V){let pe=O.texture.type,Me=f.has(pe),fe=se.getClearColor(),be=se.getClearAlpha(),Te=fe.r,ze=fe.g,Ge=fe.b;Me?(M[0]=Te,M[1]=ze,M[2]=Ge,M[3]=be,N.clearBufferuiv(N.COLOR,0,M)):(E[0]=Te,E[1]=ze,E[2]=Ge,E[3]=be,N.clearBufferiv(N.COLOR,0,E))}else z|=N.COLOR_BUFFER_BIT}U&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),F=S},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),se.dispose(),J.dispose(),xe.dispose(),T.dispose(),B.dispose(),ie.dispose(),re.dispose(),Y.dispose(),ce.dispose(),le.dispose(),le.removeEventListener("sessionstart",Uh),le.removeEventListener("sessionend",Fh),ki.stop()};function K(S){S.preventDefault(),Mr("WebGLRenderer: Context Lost."),R=!0}function Ee(){Mr("WebGLRenderer: Context Restored."),R=!1;let S=bt.autoReset,U=oe.enabled,k=oe.autoUpdate,z=oe.needsUpdate,V=oe.type;_e(),bt.autoReset=S,oe.enabled=U,oe.autoUpdate=k,oe.needsUpdate=z,oe.type=V}function Be(S){Ie("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function wt(S){let U=S.target;U.removeEventListener("dispose",wt),ct(U)}function ct(S){ni(S),T.remove(S)}function ni(S){let U=T.get(S).programs;U!==void 0&&(U.forEach(function(k){ce.releaseProgram(k)}),S.isShaderMaterial&&ce.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,k,z,V,pe){U===null&&(U=Lt);let Me=V.isMesh&&V.matrixWorld.determinant()<0,fe=lf(S,U,k,z,V);he.setMaterial(z,Me);let be=k.index,Te=1;if(z.wireframe===!0){if(be=Q.getWireframeAttribute(k),be===void 0)return;Te=2}let ze=k.drawRange,Ge=k.attributes.position,Ae=ze.start*Te,ht=(ze.start+ze.count)*Te;pe!==null&&(Ae=Math.max(Ae,pe.start*Te),ht=Math.min(ht,(pe.start+pe.count)*Te)),be!==null?(Ae=Math.max(Ae,0),ht=Math.min(ht,be.count)):Ge!=null&&(Ae=Math.max(Ae,0),ht=Math.min(ht,Ge.count));let At=ht-Ae;if(At<0||At===1/0)return;re.setup(V,z,fe,k,be);let Et,ut=He;if(be!==null&&(Et=Z.get(be),ut=tt,ut.setIndex(Et)),V.isMesh)z.wireframe===!0?(he.setLineWidth(z.wireframeLinewidth*hn()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(V.isLine){let Ht=z.linewidth;Ht===void 0&&(Ht=1),he.setLineWidth(Ht*hn()),V.isLineSegments?ut.setMode(N.LINES):V.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else V.isPoints?ut.setMode(N.POINTS):V.isSprite&&ut.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))ut.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Ht=V._multiDrawStarts,ve=V._multiDrawCounts,un=V._multiDrawCount,je=be?Z.get(be).bytesPerElement:1,gn=T.get(z).currentProgram.getUniforms();for(let Fn=0;Fn<un;Fn++)gn.setValue(N,"_gl_DrawID",Fn),ut.render(Ht[Fn]/je,ve[Fn])}else if(V.isInstancedMesh)ut.renderInstances(Ae,At,V.count);else if(k.isInstancedBufferGeometry){let Ht=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,ve=Math.min(k.instanceCount,Ht);ut.renderInstances(Ae,At,ve)}else ut.render(Ae,At)};function Un(S,U,k){S.transparent===!0&&S.side===nn&&S.forceSinglePass===!1?(S.side=Vt,S.needsUpdate=!0,ma(S,U,k),S.side=hi,S.needsUpdate=!0,ma(S,U,k),S.side=nn):ma(S,U,k)}this.compile=function(S,U,k=null){k===null&&(k=S),w=xe.get(k),w.init(U),y.push(w),k.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),S!==k&&S.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights();let z=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let pe=V.material;if(pe)if(Array.isArray(pe))for(let Me=0;Me<pe.length;Me++){let fe=pe[Me];Un(fe,k,V),z.add(fe)}else Un(pe,k,V),z.add(pe)}),w=y.pop(),z},this.compileAsync=function(S,U,k=null){let z=this.compile(S,U,k);return new Promise(V=>{function pe(){if(z.forEach(function(Me){T.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){V(S);return}setTimeout(pe,10)}Je.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let ql=null;function af(S){ql&&ql(S)}function Uh(){ki.stop()}function Fh(){ki.start()}let ki=new Rd;ki.setAnimationLoop(af),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(S){ql=S,le.setAnimationLoop(S),S===null?ki.stop():ki.start()},le.addEventListener("sessionstart",Uh),le.addEventListener("sessionend",Fh),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){Ie("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;F!==null&&F.renderStart(S,U);let k=le.enabled===!0&&le.isPresenting===!0,z=A!==null&&(O===null||k)&&A.begin(I,O);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,U,O),w=xe.get(S,y.length),w.init(U),w.state.textureUnits=_.getTextureUnits(),y.push(w),lt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ne.setFromProjectionMatrix(lt,wn,U.reversedDepth),Ze=this.localClippingEnabled,yt=ye.init(this.clippingPlanes,Ze),C=J.get(S,P.length),C.init(),P.push(C),le.enabled===!0&&le.isPresenting===!0){let Me=I.xr.getDepthSensingMesh();Me!==null&&Yl(Me,U,-1/0,I.sortObjects)}Yl(S,U,0,I.sortObjects),C.finish(),I.sortObjects===!0&&C.sort($,ge),Mt=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Mt&&se.addToRenderList(C,S),this.info.render.frame++,yt===!0&&ye.beginShadows();let V=w.state.shadowsArray;if(oe.render(V,S,U),yt===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&A.hasRenderPass())===!1){let Me=C.opaque,fe=C.transmissive;if(w.setupLights(),U.isArrayCamera){let be=U.cameras;if(fe.length>0)for(let Te=0,ze=be.length;Te<ze;Te++){let Ge=be[Te];Bh(Me,fe,S,Ge)}Mt&&se.render(S);for(let Te=0,ze=be.length;Te<ze;Te++){let Ge=be[Te];Oh(C,S,Ge,Ge.viewport)}}else fe.length>0&&Bh(Me,fe,S,U),Mt&&se.render(S),Oh(C,S,U)}O!==null&&X===0&&(_.updateMultisampleRenderTarget(O),_.updateRenderTargetMipmap(O)),z&&A.end(I),S.isScene===!0&&S.onAfterRender(I,S,U),re.resetDefaultState(),H=-1,G=null,y.pop(),y.length>0?(w=y[y.length-1],_.setTextureUnits(w.state.textureUnits),yt===!0&&ye.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,P.pop(),P.length>0?C=P[P.length-1]:C=null,F!==null&&F.renderEnd()};function Yl(S,U,k,z){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ne.intersectsSprite(S)){z&&Ye.setFromMatrixPosition(S.matrixWorld).applyMatrix4(lt);let Me=ie.update(S),fe=S.material;fe.visible&&C.push(S,Me,fe,k,Ye.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ne.intersectsObject(S))){let Me=ie.update(S),fe=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ye.copy(S.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ye.copy(Me.boundingSphere.center)),Ye.applyMatrix4(S.matrixWorld).applyMatrix4(lt)),Array.isArray(fe)){let be=Me.groups;for(let Te=0,ze=be.length;Te<ze;Te++){let Ge=be[Te],Ae=fe[Ge.materialIndex];Ae&&Ae.visible&&C.push(S,Me,Ae,k,Ye.z,Ge)}}else fe.visible&&C.push(S,Me,fe,k,Ye.z,null)}}let pe=S.children;for(let Me=0,fe=pe.length;Me<fe;Me++)Yl(pe[Me],U,k,z)}function Oh(S,U,k,z){let{opaque:V,transmissive:pe,transparent:Me}=S;w.setupLightsView(k),yt===!0&&ye.setGlobalState(I.clippingPlanes,k),z&&he.viewport(j.copy(z)),V.length>0&&pa(V,U,k),pe.length>0&&pa(pe,U,k),Me.length>0&&pa(Me,U,k),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Bh(S,U,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){let Ae=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new Tt(1,1,{generateMipmaps:!0,type:Ae?Ut:Xt,minFilter:Ni,samples:Math.max(4,ft.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}let pe=w.state.transmissionRenderTarget[z.id],Me=z.viewport||j;pe.setSize(Me.z*I.transmissionResolutionScale,Me.w*I.transmissionResolutionScale);let fe=I.getRenderTarget(),be=I.getActiveCubeFace(),Te=I.getActiveMipmapLevel();I.setRenderTarget(pe),I.getClearColor(Se),we=I.getClearAlpha(),we<1&&I.setClearColor(16777215,.5),I.clear(),Mt&&se.render(k);let ze=I.toneMapping;I.toneMapping=Rn;let Ge=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),yt===!0&&ye.setGlobalState(I.clippingPlanes,z),pa(S,k,z),_.updateMultisampleRenderTarget(pe),_.updateRenderTargetMipmap(pe),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let ht=0,At=U.length;ht<At;ht++){let Et=U[ht],{object:ut,geometry:Ht,material:ve,group:un}=Et;if(ve.side===nn&&ut.layers.test(z.layers)){let je=ve.side;ve.side=Vt,ve.needsUpdate=!0,zh(ut,k,z,Ht,ve,un),ve.side=je,ve.needsUpdate=!0,Ae=!0}}Ae===!0&&(_.updateMultisampleRenderTarget(pe),_.updateRenderTargetMipmap(pe))}I.setRenderTarget(fe,be,Te),I.setClearColor(Se,we),Ge!==void 0&&(z.viewport=Ge),I.toneMapping=ze}function pa(S,U,k){let z=U.isScene===!0?U.overrideMaterial:null;for(let V=0,pe=S.length;V<pe;V++){let Me=S[V],{object:fe,geometry:be,group:Te}=Me,ze=Me.material;ze.allowOverride===!0&&z!==null&&(ze=z),fe.layers.test(k.layers)&&zh(fe,U,k,be,ze,Te)}}function zh(S,U,k,z,V,pe){S.onBeforeRender(I,U,k,z,V,pe),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(I,U,k,z,S,pe),V.transparent===!0&&V.side===nn&&V.forceSinglePass===!1?(V.side=Vt,V.needsUpdate=!0,I.renderBufferDirect(k,U,z,V,S,pe),V.side=hi,V.needsUpdate=!0,I.renderBufferDirect(k,U,z,V,S,pe),V.side=nn):I.renderBufferDirect(k,U,z,V,S,pe),S.onAfterRender(I,U,k,z,V,pe)}function ma(S,U,k){U.isScene!==!0&&(U=Lt);let z=T.get(S),V=w.state.lights,pe=w.state.shadowsArray,Me=V.state.version,fe=ce.getParameters(S,V.state,pe,U,k,w.state.lightProbeGridArray),be=ce.getProgramCacheKey(fe),Te=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;let ze=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=B.get(S.envMap||z.environment,ze),z.envMapRotation=z.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Te===void 0&&(S.addEventListener("dispose",wt),Te=new Map,z.programs=Te);let Ge=Te.get(be);if(Ge!==void 0){if(z.currentProgram===Ge&&z.lightsStateVersion===Me)return Hh(S,fe),Ge}else fe.uniforms=ce.getUniforms(S),F!==null&&S.isNodeMaterial&&F.build(S,k,fe),S.onBeforeCompile(fe,I),Ge=ce.acquireProgram(fe,be),Te.set(be,Ge),z.uniforms=fe.uniforms;let Ae=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ae.clippingPlanes=ye.uniform),Hh(S,fe),z.needsLights=hf(S),z.lightsStateVersion=Me,z.needsLights&&(Ae.ambientLightColor.value=V.state.ambient,Ae.lightProbe.value=V.state.probe,Ae.directionalLights.value=V.state.directional,Ae.directionalLightShadows.value=V.state.directionalShadow,Ae.spotLights.value=V.state.spot,Ae.spotLightShadows.value=V.state.spotShadow,Ae.rectAreaLights.value=V.state.rectArea,Ae.ltc_1.value=V.state.rectAreaLTC1,Ae.ltc_2.value=V.state.rectAreaLTC2,Ae.pointLights.value=V.state.point,Ae.pointLightShadows.value=V.state.pointShadow,Ae.hemisphereLights.value=V.state.hemi,Ae.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ae.spotLightMatrix.value=V.state.spotLightMatrix,Ae.spotLightMap.value=V.state.spotLightMap,Ae.pointShadowMatrix.value=V.state.pointShadowMatrix),z.lightProbeGrid=w.state.lightProbeGridArray.length>0,z.currentProgram=Ge,z.uniformsList=null,Ge}function Vh(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=js.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Hh(S,U){let k=T.get(S);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function of(S,U){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;b.setFromMatrixPosition(U.matrixWorld);for(let k=0,z=S.length;k<z;k++){let V=S[k];if(V.texture!==null&&V.boundingBox.containsPoint(b))return V}return null}function lf(S,U,k,z,V){U.isScene!==!0&&(U=Lt),_.resetTextureUnits();let pe=U.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,fe=O===null?I.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:qe.workingColorSpace,be=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Te=B.get(z.envMap||Me,be),ze=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ge=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ae=!!k.morphAttributes.position,ht=!!k.morphAttributes.normal,At=!!k.morphAttributes.color,Et=Rn;z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Et=I.toneMapping);let ut=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Ht=ut!==void 0?ut.length:0,ve=T.get(z),un=w.state.lights;if(yt===!0&&(Ze===!0||S!==G)){let pt=S===G&&z.id===H;ye.setState(z,S,pt)}let je=!1;z.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==un.state.version||ve.outputColorSpace!==fe||V.isBatchedMesh&&ve.batching===!1||!V.isBatchedMesh&&ve.batching===!0||V.isBatchedMesh&&ve.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&ve.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&ve.instancing===!1||!V.isInstancedMesh&&ve.instancing===!0||V.isSkinnedMesh&&ve.skinning===!1||!V.isSkinnedMesh&&ve.skinning===!0||V.isInstancedMesh&&ve.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ve.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ve.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ve.instancingMorph===!1&&V.morphTexture!==null||ve.envMap!==Te||z.fog===!0&&ve.fog!==pe||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==ye.numPlanes||ve.numIntersection!==ye.numIntersection)||ve.vertexAlphas!==ze||ve.vertexTangents!==Ge||ve.morphTargets!==Ae||ve.morphNormals!==ht||ve.morphColors!==At||ve.toneMapping!==Et||ve.morphTargetsCount!==Ht||!!ve.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(je=!0):(je=!0,ve.__version=z.version);let gn=ve.currentProgram;je===!0&&(gn=ma(z,U,V),F&&z.isNodeMaterial&&F.onUpdateProgram(z,gn,ve));let Fn=!1,yi=!1,ps=!1,dt=gn.getUniforms(),Ct=ve.uniforms;if(he.useProgram(gn.program)&&(Fn=!0,yi=!0,ps=!0),z.id!==H&&(H=z.id,yi=!0),ve.needsLights){let pt=of(w.state.lightProbeGridArray,V);ve.lightProbeGrid!==pt&&(ve.lightProbeGrid=pt,yi=!0)}if(Fn||G!==S){he.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),dt.setValue(N,"projectionMatrix",S.projectionMatrix),dt.setValue(N,"viewMatrix",S.matrixWorldInverse);let Si=dt.map.cameraPosition;Si!==void 0&&Si.setValue(N,_t.setFromMatrixPosition(S.matrixWorld)),ft.logarithmicDepthBuffer&&dt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&dt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),G!==S&&(G=S,yi=!0,ps=!0)}if(ve.needsLights&&(un.state.directionalShadowMap.length>0&&dt.setValue(N,"directionalShadowMap",un.state.directionalShadowMap,_),un.state.spotShadowMap.length>0&&dt.setValue(N,"spotShadowMap",un.state.spotShadowMap,_),un.state.pointShadowMap.length>0&&dt.setValue(N,"pointShadowMap",un.state.pointShadowMap,_)),V.isSkinnedMesh){dt.setOptional(N,V,"bindMatrix"),dt.setOptional(N,V,"bindMatrixInverse");let pt=V.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),dt.setValue(N,"boneTexture",pt.boneTexture,_))}V.isBatchedMesh&&(dt.setOptional(N,V,"batchingTexture"),dt.setValue(N,"batchingTexture",V._matricesTexture,_),dt.setOptional(N,V,"batchingIdTexture"),dt.setValue(N,"batchingIdTexture",V._indirectTexture,_),dt.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&dt.setValue(N,"batchingColorTexture",V._colorsTexture,_));let Mi=k.morphAttributes;if((Mi.position!==void 0||Mi.normal!==void 0||Mi.color!==void 0)&&Ue.update(V,k,gn),(yi||ve.receiveShadow!==V.receiveShadow)&&(ve.receiveShadow=V.receiveShadow,dt.setValue(N,"receiveShadow",V.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(Ct.envMapIntensity.value=U.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=$x()),yi){if(dt.setValue(N,"toneMappingExposure",I.toneMappingExposure),ve.needsLights&&cf(Ct,ps),pe&&z.fog===!0&&q.refreshFogUniforms(Ct,pe),q.refreshMaterialUniforms(Ct,z,Ve,ot,w.state.transmissionRenderTarget[S.id]),ve.needsLights&&ve.lightProbeGrid){let pt=ve.lightProbeGrid;Ct.probesSH.value=pt.texture,Ct.probesMin.value.copy(pt.boundingBox.min),Ct.probesMax.value.copy(pt.boundingBox.max),Ct.probesResolution.value.copy(pt.resolution)}js.upload(N,Vh(ve),Ct,_)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(js.upload(N,Vh(ve),Ct,_),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&dt.setValue(N,"center",V.center),dt.setValue(N,"modelViewMatrix",V.modelViewMatrix),dt.setValue(N,"normalMatrix",V.normalMatrix),dt.setValue(N,"modelMatrix",V.matrixWorld),z.uniformsGroups!==void 0){let pt=z.uniformsGroups;for(let Si=0,ms=pt.length;Si<ms;Si++){let kh=pt[Si];Y.update(kh,gn),Y.bind(kh,gn)}}return gn}function cf(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function hf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(S,U,k){let z=T.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),T.get(S.texture).__webglTexture=U,T.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){let k=T.get(S);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};let uf=N.createFramebuffer();this.setRenderTarget=function(S,U=0,k=0){O=S,W=U,X=k;let z=null,V=!1,pe=!1;if(S){let fe=T.get(S);if(fe.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(N.FRAMEBUFFER,fe.__webglFramebuffer),j.copy(S.viewport),ne.copy(S.scissor),de=S.scissorTest,he.viewport(j),he.scissor(ne),he.setScissorTest(de),H=-1;return}else if(fe.__webglFramebuffer===void 0)_.setupRenderTarget(S);else if(fe.__hasExternalTextures)_.rebindTextures(S,T.get(S.texture).__webglTexture,T.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let ze=S.depthTexture;if(fe.__boundDepthTexture!==ze){if(ze!==null&&T.has(ze)&&(S.width!==ze.image.width||S.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(S)}}let be=S.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(pe=!0);let Te=T.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Te[U])?z=Te[U][k]:z=Te[U],V=!0):S.samples>0&&_.useMultisampledRTT(S)===!1?z=T.get(S).__webglMultisampledFramebuffer:Array.isArray(Te)?z=Te[k]:z=Te,j.copy(S.viewport),ne.copy(S.scissor),de=S.scissorTest}else j.copy(ae).multiplyScalar(Ve).floor(),ne.copy(De).multiplyScalar(Ve).floor(),de=Oe;if(k!==0&&(z=uf),he.bindFramebuffer(N.FRAMEBUFFER,z)&&he.drawBuffers(S,z),he.viewport(j),he.scissor(ne),he.setScissorTest(de),V){let fe=T.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,fe.__webglTexture,k)}else if(pe){let fe=U;for(let be=0;be<S.textures.length;be++){let Te=T.get(S.textures[be]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+be,Te.__webglTexture,k,fe)}}else if(S!==null&&k!==0){let fe=T.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,k)}H=-1},this.readRenderTargetPixels=function(S,U,k,z,V,pe,Me,fe=0){if(!(S&&S.isWebGLRenderTarget)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=T.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be){he.bindFramebuffer(N.FRAMEBUFFER,be);try{let Te=S.textures[fe],ze=Te.format,Ge=Te.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!ft.textureFormatReadable(ze)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Ge)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-z&&k>=0&&k<=S.height-V&&N.readPixels(U,k,z,V,D.convert(ze),D.convert(Ge),pe)}finally{let Te=O!==null?T.get(O).__webglFramebuffer:null;he.bindFramebuffer(N.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(S,U,k,z,V,pe,Me,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=T.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be)if(U>=0&&U<=S.width-z&&k>=0&&k<=S.height-V){he.bindFramebuffer(N.FRAMEBUFFER,be);let Te=S.textures[fe],ze=Te.format,Ge=Te.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!ft.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ae=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ae),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),N.readPixels(U,k,z,V,D.convert(ze),D.convert(Ge),0);let ht=O!==null?T.get(O).__webglFramebuffer:null;he.bindFramebuffer(N.FRAMEBUFFER,ht);let At=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await nd(N,At,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ae),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(Ae),N.deleteSync(At),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,k=0){let z=Math.pow(2,-k),V=Math.floor(S.image.width*z),pe=Math.floor(S.image.height*z),Me=U!==null?U.x:0,fe=U!==null?U.y:0;_.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,k,0,0,Me,fe,V,pe),he.unbindTexture()};let df=N.createFramebuffer(),ff=N.createFramebuffer();this.copyTextureToTexture=function(S,U,k=null,z=null,V=0,pe=0){let Me,fe,be,Te,ze,Ge,Ae,ht,At,Et=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(k!==null)Me=k.max.x-k.min.x,fe=k.max.y-k.min.y,be=k.isBox3?k.max.z-k.min.z:1,Te=k.min.x,ze=k.min.y,Ge=k.isBox3?k.min.z:0;else{let Ct=Math.pow(2,-V);Me=Math.floor(Et.width*Ct),fe=Math.floor(Et.height*Ct),S.isDataArrayTexture?be=Et.depth:S.isData3DTexture?be=Math.floor(Et.depth*Ct):be=1,Te=0,ze=0,Ge=0}z!==null?(Ae=z.x,ht=z.y,At=z.z):(Ae=0,ht=0,At=0);let ut=D.convert(U.format),Ht=D.convert(U.type),ve;U.isData3DTexture?(_.setTexture3D(U,0),ve=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(_.setTexture2DArray(U,0),ve=N.TEXTURE_2D_ARRAY):(_.setTexture2D(U,0),ve=N.TEXTURE_2D),he.activeTexture(N.TEXTURE0),he.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),he.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),he.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);let un=he.getParameter(N.UNPACK_ROW_LENGTH),je=he.getParameter(N.UNPACK_IMAGE_HEIGHT),gn=he.getParameter(N.UNPACK_SKIP_PIXELS),Fn=he.getParameter(N.UNPACK_SKIP_ROWS),yi=he.getParameter(N.UNPACK_SKIP_IMAGES);he.pixelStorei(N.UNPACK_ROW_LENGTH,Et.width),he.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Et.height),he.pixelStorei(N.UNPACK_SKIP_PIXELS,Te),he.pixelStorei(N.UNPACK_SKIP_ROWS,ze),he.pixelStorei(N.UNPACK_SKIP_IMAGES,Ge);let ps=S.isDataArrayTexture||S.isData3DTexture,dt=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){let Ct=T.get(S),Mi=T.get(U),pt=T.get(Ct.__renderTarget),Si=T.get(Mi.__renderTarget);he.bindFramebuffer(N.READ_FRAMEBUFFER,pt.__webglFramebuffer),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,Si.__webglFramebuffer);for(let ms=0;ms<be;ms++)ps&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(S).__webglTexture,V,Ge+ms),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(U).__webglTexture,pe,At+ms)),N.blitFramebuffer(Te,ze,Me,fe,Ae,ht,Me,fe,N.DEPTH_BUFFER_BIT,N.NEAREST);he.bindFramebuffer(N.READ_FRAMEBUFFER,null),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||T.has(S)){let Ct=T.get(S),Mi=T.get(U);he.bindFramebuffer(N.READ_FRAMEBUFFER,df),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,ff);for(let pt=0;pt<be;pt++)ps?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ct.__webglTexture,V,Ge+pt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ct.__webglTexture,V),dt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mi.__webglTexture,pe,At+pt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mi.__webglTexture,pe),V!==0?N.blitFramebuffer(Te,ze,Me,fe,Ae,ht,Me,fe,N.COLOR_BUFFER_BIT,N.NEAREST):dt?N.copyTexSubImage3D(ve,pe,Ae,ht,At+pt,Te,ze,Me,fe):N.copyTexSubImage2D(ve,pe,Ae,ht,Te,ze,Me,fe);he.bindFramebuffer(N.READ_FRAMEBUFFER,null),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else dt?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(ve,pe,Ae,ht,At,Me,fe,be,ut,Ht,Et.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(ve,pe,Ae,ht,At,Me,fe,be,ut,Et.data):N.texSubImage3D(ve,pe,Ae,ht,At,Me,fe,be,ut,Ht,Et):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,Ae,ht,Me,fe,ut,Ht,Et.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,Ae,ht,Et.width,Et.height,ut,Et.data):N.texSubImage2D(N.TEXTURE_2D,pe,Ae,ht,Me,fe,ut,Ht,Et);he.pixelStorei(N.UNPACK_ROW_LENGTH,un),he.pixelStorei(N.UNPACK_IMAGE_HEIGHT,je),he.pixelStorei(N.UNPACK_SKIP_PIXELS,gn),he.pixelStorei(N.UNPACK_SKIP_ROWS,Fn),he.pixelStorei(N.UNPACK_SKIP_IMAGES,yi),pe===0&&U.generateMipmaps&&N.generateMipmap(ve),he.unbindTexture()},this.initRenderTarget=function(S){T.get(S).__webglFramebuffer===void 0&&_.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?_.setTextureCube(S,0):S.isData3DTexture?_.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?_.setTexture2DArray(S,0):_.setTexture2D(S,0),he.unbindTexture()},this.resetState=function(){W=0,X=0,O=null,he.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var Kn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var jt=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Qx=new ts(-1,1,1,-1,0,1),fh=class extends Ke{constructor(){super(),this.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new We([0,2,0,0,2,0],2))}},jx=new fh,In=class{constructor(e){this._mesh=new et(jx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Qx)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var tr=class extends jt{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Xe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=yn.clone(e.uniforms),this.material=new Xe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new In(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ra=class extends jt{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Il=class extends jt{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Ll=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new me);this._width=n.width,this._height=n.height,t=new Tt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ut}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new tr(Kn),this.copyPass.material.blending=sn,this.timer=new ns}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ra!==void 0&&(a instanceof ra?n=!0:a instanceof Il&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new me);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Dl=class extends jt{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ce}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var Fd={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ce(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var nr=class i extends jt{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new me(e.x,e.y):new me(256,256),this.clearColor=new Ce(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Tt(r,a,{type:Ut}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new Tt(r,a,{type:Ut});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new Tt(r,a,{type:Ut});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=Fd;this.highPassUniforms=yn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Xe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new me(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=yn.clone(Kn.uniforms),this.blendMaterial=new Xe({uniforms:this.copyUniforms,vertexShader:Kn.vertexShader,fragmentShader:Kn.fragmentShader,premultipliedAlpha:!0,blending:it,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ce,this._oldClearAlpha=1,this._basic=new Qt,this._fsQuad=new In(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new me(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(n*n))/n);return new Xe({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new me(.5,.5)},direction:{value:new me(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Xe({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};nr.BlurDirectionX=new me(1,0);nr.BlurDirectionY=new me(0,1);var Nl={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float damp;

		uniform sampler2D tOld;
		uniform sampler2D tNew;

		varying vec2 vUv;

		vec4 when_gt( vec4 x, float y ) {

			return max( sign( x - y ), 0.0 );

		}

		void main() {

			vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);

		}`};var Ul=class extends jt{constructor(e=.96){super(),this.uniforms=yn.clone(Nl.uniforms),this.damp=e,this.compFsMaterial=new Xe({uniforms:this.uniforms,vertexShader:Nl.vertexShader,fragmentShader:Nl.fragmentShader}),this.copyFsMaterial=new Xe({uniforms:yn.clone(Kn.uniforms),vertexShader:Kn.vertexShader,fragmentShader:Kn.fragmentShader,blending:sn,depthTest:!1,depthWrite:!1}),this._textureComp=new Tt(window.innerWidth,window.innerHeight,{magFilter:Rt,type:Ut}),this._textureOld=new Tt(window.innerWidth,window.innerHeight,{magFilter:Rt,type:Ut}),this._compFsQuad=new In(this.compFsMaterial),this._copyFsQuad=new In(this.copyFsMaterial)}get damp(){return this.uniforms.damp.value}set damp(e){this.uniforms.damp.value=e}render(e,t,n){this.uniforms.tOld.value=this._textureOld.texture,this.uniforms.tNew.value=n.texture,e.setRenderTarget(this._textureComp),this._compFsQuad.render(e),this._copyFsQuad.material.uniforms.tDiffuse.value=this._textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this._copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._copyFsQuad.render(e));let s=this._textureOld;this._textureOld=this._textureComp,this._textureComp=s}setSize(e,t){this._textureComp.setSize(e,t),this._textureOld.setSize(e,t)}dispose(){this._textureComp.dispose(),this._textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this._compFsQuad.dispose(),this._copyFsQuad.dispose()}};var aa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Fl=class extends jt{constructor(){super(),this.isOutputPass=!0,this.uniforms=yn.clone(aa.uniforms),this.material=new Ws({name:aa.name,uniforms:this.uniforms,vertexShader:aa.vertexShader,fragmentShader:aa.fragmentShader}),this._fsQuad=new In(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===kr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Gr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Wr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===is?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===qr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Yr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Xr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var st=i=>document.querySelector(i),e_=i=>[...document.querySelectorAll(i)],gt=bl.clamp,Dn=bl.lerp,Yt=(i,e,t,n)=>Dn(i,e,1-Math.exp(-t*n)),mt=(i,e,t)=>{let n=gt((t-i)/Math.max(1e-6,e-i),0,1);return n*n*(3-2*n)},Hi=(i,e,t)=>{let n=gt((t-i)/Math.max(1e-6,e-i),0,1);return n*n*n*(n*(n*6-15)+10)},te={gate:st("#gate"),enter:st("#enterBtn"),silent:st("#silentBtn"),replay:st("#replayBtn"),file:st("#fileInput"),fileLabel:st("#fileLabel"),hint:st("#gateHint"),ritualCaption:st("#ritualCaption"),ritualIndex:st("#ritualIndex"),ritualMain:st("#ritualMain"),ritualSub:st("#ritualSub"),phaseNumber:st("#phaseNumber"),phaseName:st("#phaseName"),phaseSub:st("#phaseSub"),sideTicks:e_("#sideIndex i"),coreState:st("#coreState"),fieldState:st("#fieldState"),depth:st("#depthValue"),coord:st("#coordValue"),index:st("#indexValue"),signal:st("#signalState"),mode:st("#modeState"),audioState:st("#audioState"),timeNow:st("#timeNow"),timeTotal:st("#timeTotal"),low:st("#bandLow"),mid:st("#bandMid"),high:st("#bandHigh"),cursor:st("#cursor"),message:st("#message"),audio:st("#audio"),unsupported:st("#unsupported")},Vd=matchMedia("(pointer: coarse)").matches,xt=Vd||innerWidth<820,_h=matchMedia("(prefers-reduced-motion: reduce)").matches;function t_(i){return function(){let e=i+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var n_=t_(9545716),Pe=(i=0,e=1)=>i+(e-i)*n_(),ei=i=>i-Math.floor(i);function vh(i){if(!Number.isFinite(i))return"00:00";let e=Math.floor(i/60),t=Math.floor(i%60);return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function Mn(i,e=1700){te.message.textContent=i,te.message.classList.add("show"),clearTimeout(Mn.timer),Mn.timer=setTimeout(()=>te.message.classList.remove("show"),e)}var i_=[["I","\u65E0\u6708\u6D4B\u6DF1","MOONLESS SOUNDING"],["II","\u76D0\u661F\u4E0B\u6C89","SALT STARS SINKING"],["III","\u77F3\u82F1\u68A6\u8BED","QUARTZ DREAMS"],["IV","\u95E8\u540E\u4E4B\u6D77","THE SEA BEHIND THE DOOR"],["V","\u672A\u8BDE\u4E4B\u57CE","THE UNBORN CITY"],["VI","\u9006\u6F6E\u9057\u9AB8","RELICS AGAINST THE TIDE"],["VII","\u9ED1\u6C34\u5BC6\u5377","THE BLACKWATER CODEX"],["VIII","\u6DF1\u6E0A\u56DE\u89C6","THE ABYSS LOOKS BACK"],["IX","\u65E0\u5CB8\u957F\u591C","THE SHORELESS NIGHT"]],pi=[0,48.9709,75.0469,103.0966,145.2408,183.8092,224.8853,260.226,330.0484,354.504],s_=2.85,cs=[{deep:67081,fog:201753,glow:6806990,accent:14940393,secondary:1860720},{deep:67341,fog:268072,glow:5553888,accent:14021375,secondary:2640515},{deep:198665,fog:1057052,glow:9296047,accent:15986121,secondary:4944722},{deep:197899,fog:1381414,glow:9676287,accent:15198975,secondary:5326978},{deep:329481,fog:2170130,glow:14207097,accent:16773820,secondary:6705956},{deep:67592,fog:598303,glow:6543552,accent:14285036,secondary:2649445},{deep:328459,fog:1970728,glow:12746467,accent:15849720,secondary:7093116},{deep:67338,fog:794144,glow:8640956,accent:15267292,secondary:4287325},{deep:1029,fog:595993,glow:11135177,accent:16773575,secondary:5798244}].map(i=>Object.fromEntries(Object.entries(i).map(([e,t])=>[e,new Ce(t)]))),Zt;try{Zt=new Cl({antialias:!xt,powerPreference:"high-performance",alpha:!1})}catch(i){throw console.error(i),te.unsupported.style.display="grid",i}Zt.setSize(innerWidth,innerHeight);Zt.setPixelRatio(Math.min(devicePixelRatio,xt?1.15:1.6));Zt.outputColorSpace=Wt;Zt.toneMapping=is;Zt.toneMappingExposure=.05;Zt.setClearColor(772,1);st("#scene").appendChild(Zt.domElement);var Nn=new Er;Nn.background=new Ce(772);Nn.fog=new br(201496,.021);var Ln=new zt(48,innerWidth/innerHeight,.08,85);Ln.position.set(0,.75,13.6);var Jt=new tn;Nn.add(Jt);var ca=new ns;ca.connect(document);var xi=new me,ir=new me,ha=new Vr,yh=new L,ln=64,zi=new Uint8Array(ln),ds=new Qi(zi,ln,1,$s,Xt);ds.magFilter=It;ds.minFilter=It;ds.wrapS=pn;ds.wrapT=pn;ds.needsUpdate=!0;var g={entered:!1,calibrated:!1,ceremonyTime:-1,ceremonyCue:0,ritual:0,ignite:0,lightLevel:0,shutdown:0,ending:!1,ended:!1,endingCue:0,previewMode:"",previewSection:4,audioReady:!1,playing:!1,muted:!1,audioFailed:!1,archiveOpen:0,archiveOpenTarget:0,pulseAge:99,pulseStrength:0,pulseOrigin:new me(0,0),pulseSourceY:.35,pulseCooldown:0,low:0,mid:0,high:0,rms:0,energy:0,transient:0,previousEnergy:0,tideFloat:0,tideIndex:0,transitionFrom:0,pendingTide:-1,phaseLocal:0,phaseTransition:0,transitionClock:99,transitionSwitched:!1,pulseMode:0,pulseSerial:0,pulseScreen:new me(.5,.5),dive:.12,diveTarget:.12,yaw:0,yawTarget:0,pitch:.07,pitchTarget:.07,dragging:!1,dragDistance:0,lastPointerX:0,lastPointerY:0,activeSeconds:0,syntheticPhase:0,coreHovered:!1},ee={time:{value:0},low:{value:0},mid:{value:0},high:{value:0},rms:{value:0},energy:{value:0},transient:{value:0},ritual:{value:0},ignite:{value:0},shutdown:{value:0},pulseAge:{value:99},pulseStrength:{value:0},pulseOrigin:{value:g.pulseOrigin},pulseScreen:{value:g.pulseScreen},open:{value:0},tide:{value:0},section:{value:0},sectionLocal:{value:0},phaseTransition:{value:0},sonarMode:{value:0},pixelRatio:{value:Zt.getPixelRatio()},resolution:{value:new me(innerWidth*Zt.getPixelRatio(),innerHeight*Zt.getPixelRatio())},spectrum:{value:ds},deepColor:{value:cs[0].deep.clone()},fogColor:{value:cs[0].fog.clone()},glowColor:{value:cs[0].glow.clone()},accentColor:{value:cs[0].accent.clone()},secondaryColor:{value:cs[0].secondary.clone()}},en=(i={})=>({...ee,...i});function r_(){let i=document.createElement("canvas");i.width=i.height=256;let e=i.getContext("2d"),t=e.createRadialGradient(128,128,0,128,128,128);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.07,"rgba(210,255,246,.74)"),t.addColorStop(.28,"rgba(88,224,206,.22)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,256,256);let n=new Ir(i);return n.colorSpace=Wt,n}var Hd=r_(),a_=new Xe({side:Vt,depthWrite:!1,uniforms:en(),vertexShader:`
    varying vec3 vWorld;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
    uniform float time;
    uniform float low;
    uniform float high;
    uniform float energy;
    uniform float ritual;
    uniform float shutdown;
    uniform float tide;
    uniform vec3 deepColor;
    uniform vec3 fogColor;
    uniform vec3 glowColor;
    varying vec3 vWorld;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
    }
    float noise21(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash21(i), hash21(i + vec2(1.0,0.0)), f.x),
                 mix(hash21(i + vec2(0.0,1.0)), hash21(i + vec2(1.0,1.0)), f.x), f.y);
    }
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.52;
      for (int i = 0; i < 5; i++) {
        v += a * noise21(p);
        p = mat2(1.7, -1.15, 1.15, 1.7) * p + 0.17;
        a *= 0.48;
      }
      return v;
    }
    void main() {
      vec3 d = normalize(vWorld);
      float lon = atan(d.z, d.x) / 6.2831853 + 0.5;
      float lat = asin(clamp(d.y, -1.0, 1.0)) / 3.1415926 + 0.5;
      vec2 uv = vec2(lon, lat);
      float n = fbm(vec2(uv.x * 4.6 + time * 0.006, uv.y * 7.0 - time * 0.004));
      float slow = fbm(vec2(uv.x * 1.9 - time * 0.002, uv.y * 2.5));
      float upper = pow(max(0.0, d.y * 0.5 + 0.5), 2.6);
      float horizon = pow(1.0 - abs(d.y), 4.2);
      float caustic = abs(sin(uv.x * 37.0 + n * 4.0 + time * 0.07) - sin(uv.y * 29.0 - time * 0.05));
      caustic = pow(max(0.0, 1.0 - caustic), 11.0);
      vec3 color = mix(deepColor, fogColor, 0.27 + n * 0.46 + horizon * 0.13);
      color += glowColor * (upper * 0.012 + caustic * upper * (0.012 + high * 0.028));
      color += glowColor * slow * (0.006 + low * 0.009);
      color *= 0.48 + ritual * 0.52;
      color *= 1.0 - shutdown * 0.82;
      color *= 0.92 + sin(tide * 0.64 + n * 2.0) * 0.06;
      gl_FragColor = vec4(color, 1.0);
    }
  `}),o_=new et(new es(42,64,36),a_);Jt.add(o_);var l_=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
    varying vec2 vPlane;
    void main() {
      vPlane = position.xy;
      vec4 wp = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
    uniform float time;
    uniform float low;
    uniform float mid;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform float ritual;
    uniform float shutdown;
    uniform float tide;
    uniform vec2 pulseOrigin;
    uniform vec3 glowColor;
    uniform vec3 secondaryColor;
    varying vec2 vPlane;

    float lineBand(float x, float width) {
      float f = abs(fract(x) - 0.5);
      return 1.0 - smoothstep(width, width * 2.25, f);
    }
    void main() {
      vec2 p = vPlane;
      float radius = length(p);
      if (radius > 16.0) discard;
      float nr = radius / 16.0;
      float angle = atan(p.y, p.x) / 6.2831853 + 0.5;
      float rings = lineBand(nr * 22.0 - time * 0.025, 0.015) * 0.24;
      rings += lineBand(nr * 8.0 + time * 0.009, 0.010) * 0.48;
      float spokes = lineBand(angle * 72.0, 0.006) * smoothstep(0.16, 0.78, nr) * 0.26;
      float nine = lineBand(angle * 9.0 - tide * 0.012, 0.012) * 0.58;
      float localRadius = length(p - pulseOrigin);
      float waveRadius = pulseAge * (4.15 + low * 1.7);
      float wave = exp(-abs(localRadius - waveRadius) * 1.55) * smoothstep(5.2, 0.0, pulseAge) * pulseStrength;
      float wake = step(localRadius, waveRadius) * exp(-(waveRadius - localRadius) * 0.23) * exp(-pulseAge * 0.12) * pulseStrength;
      float center = exp(-nr * 7.0) * (0.08 + low * 0.14);
      float scan = 0.5 + 0.5 * sin(radius * 8.5 - time * 0.75 + mid * 3.0);
      float edgeFade = smoothstep(1.0, 0.69, nr) * smoothstep(0.01, 0.07, nr);
      float activate = smoothstep(0.03, 0.58, ritual);
      float survive = 1.0 - smoothstep(0.43, 0.90, shutdown);
      vec3 color = mix(secondaryColor, glowColor, nr + wave * 0.7);
      float alpha = (rings + spokes + nine * 0.22 + center + wave * 2.4 + wake * 0.32 + scan * 0.008) * edgeFade * activate * survive;
      gl_FragColor = vec4(color * (0.22 + wave * 1.60 + wake * 0.18), alpha * 0.68);
    }
  `}),da=new et(new Dr(16,256),l_);da.rotation.x=-Math.PI/2;da.position.y=-2.36;da.renderOrder=1;Jt.add(da);var Ol=new Xs({color:67595,roughness:.22,metalness:.9,emissive:202520,emissiveIntensity:.12,transparent:!0,opacity:.78}),kd=new et(new ji(4.25,4.7,.22,128),Ol);kd.position.y=-2.49;Jt.add(kd);var Ch=[];for(let i of[2.65,3.55,4.55]){let e=new et(new Zn(i,i===4.55?.012:.006,5,256),new Qt({color:6543559,transparent:!0,opacity:.11,blending:it,depthWrite:!1}));e.rotation.x=Math.PI/2,e.position.y=-2.34,Ch.push(e),Jt.add(e)}function c_(){let i=xt?45:81,e=[];for(let t=0;t<i;t++){let n;t<9?n=0:t<Math.floor(i*.45)?n=1:n=2;let s=n===0?0:n===1?9:Math.floor(i*.45),r=n===0?9:n===1?Math.floor(i*.45)-9:i-Math.floor(i*.45),a=(t-s)/Math.max(1,r)*Math.PI*2+Pe(-.16,.16),o=Math.atan2(Math.sin(a-Math.PI/2),Math.cos(a-Math.PI/2)),c=n===0?.34:.54;Math.abs(o)<c&&(a+=(o>=0?1:-1)*(c-Math.abs(o)+Pe(.07,.24)));let l=n===0?Pe(5.15,6.2):n===1?Pe(8,13.8):Pe(14.5,24.5),h=Pe(n===2?.65:.5,n===2?1.8:1.35),d=Pe(.36,n===2?1.16:.86),u=Pe(n===0?1.2:1.7,n===2?7:5.1),p=new L(Math.cos(a)*l,-2.31+u*.5+Pe(-.08,n===2?.72:.34),Math.sin(a)*l),x=-a+Math.PI/2+Pe(-.18,.18),v=gt((l-4.9)/20.2,0,1),m=ei((t*.61803398875+n*.13)*.97);e.push({center:p,rotation:x,width:h,height:u,depth:d,order:v,band:m,seed:Pe(0,1e3),tier:n})}return e}var Gd=c_();function Wd(i,e,t,n){let s=Math.cos(i.rotation),r=Math.sin(i.rotation);return new L(i.center.x+e*s-n*r,i.center.y+t,i.center.z+e*r+n*s)}function h_(i){let e=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],t=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],n=i.length*t.length*2,s=new Float32Array(n*3),r=new Float32Array(n*3),a=new Float32Array(n),o=new Float32Array(n),c=new Float32Array(n),l=0;for(let d of i)for(let u of t)for(let p of u){let x=e[p],v=Wd(d,x[0]*d.width,x[1]*d.height,x[2]*d.depth);s[l*3]=v.x,s[l*3+1]=v.y,s[l*3+2]=v.z,r[l*3]=d.center.x,r[l*3+1]=d.center.y,r[l*3+2]=d.center.z,a[l]=d.band,o[l]=d.order,c[l]=d.seed,l++}let h=new Ke;return h.setAttribute("position",new Le(s,3)),h.setAttribute("aCenter",new Le(r,3)),h.setAttribute("aBand",new Le(a,1)),h.setAttribute("aOrder",new Le(o,1)),h.setAttribute("aSeed",new Le(c,1)),h}var u_=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
    attribute vec3 aCenter;
    attribute float aBand;
    attribute float aOrder;
    attribute float aSeed;
    uniform sampler2D spectrum;
    uniform float time;
    uniform float low;
    uniform float high;
    uniform float ritual;
    uniform float shutdown;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform vec2 pulseOrigin;
    varying float vAlpha;
    varying float vSpec;
    varying float vResonance;
    varying float vBand;

    void main() {
      float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
      float activation = smoothstep(aOrder * 0.56, aOrder * 0.56 + 0.29, ritual);
      float offStart = 0.06 + (1.0 - aOrder) * 0.65;
      float off = smoothstep(offStart, offStart + 0.22, shutdown);
      vec3 radial = normalize(vec3(aCenter.x, 0.22 + fract(aSeed * 0.13) * 0.32, aCenter.z) + vec3(0.0001));
      vec3 p = position + radial * (1.0 - activation) * (2.1 + aOrder * 7.5);
      float waveRadius = pulseAge * (4.15 + low * 1.7);
      float distanceToPulse = length(aCenter.xz - pulseOrigin);
      float front = exp(-abs(distanceToPulse - waveRadius) * 1.46) * pulseStrength;
      float memory = step(distanceToPulse, waveRadius) * exp(-(waveRadius - distanceToPulse) * 0.105) * exp(-pulseAge * 0.055) * pulseStrength;
      vec3 fromCenter = p - aCenter;
      p += normalize(fromCenter + vec3(0.0001)) * (spec * 0.018 + front * 0.095);
      p.y += sin(time * 0.35 + aSeed + aCenter.x * 0.2) * (0.005 + spec * 0.014);
      p = mix(p, vec3(0.0, 0.32, 0.0) + normalize(fromCenter + vec3(0.001)) * 0.28, off * 0.58);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      float cameraDistance = length(cameraPosition - p);
      float farFade = mix(0.035, 1.0, 1.0 - smoothstep(10.0, 31.0, cameraDistance));
      vSpec = spec;
      vResonance = front * 1.45 + memory * 0.28;
      vBand = aBand;
      vAlpha = (0.068 + spec * 0.21 + vResonance * 0.58 + high * 0.028) * activation * (1.0 - off) * farFade;
    }
  `,fragmentShader:`
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    uniform vec3 secondaryColor;
    varying float vAlpha;
    varying float vSpec;
    varying float vResonance;
    varying float vBand;
    void main() {
      vec3 color = mix(secondaryColor, glowColor, 0.35 + vBand * 0.48);
      color = mix(color, accentColor, clamp(vResonance * 0.75 + vSpec * 0.18, 0.0, 0.82));
      gl_FragColor = vec4(color * (0.48 + vSpec * 1.25 + vResonance * 1.8), vAlpha);
    }
  `}),d_=new Cn(h_(Gd),u_);Jt.add(d_);function f_(i){let e=xt?72:156,t=i.length*e,n=new Float32Array(t*3),s=new Float32Array(t*3),r=new Float32Array(t),a=new Float32Array(t),o=new Float32Array(t),c=new Float32Array(t),l=0;for(let u=0;u<i.length;u++){let p=i[u];for(let x=0;x<e;x++){let v=ei((x+1)*.754877666+p.seed*.013),m=ei((x+1)*.569840296+p.seed*.021),f=ei((x+1)*.438579021+p.seed*.034),M=(v-.5)*p.width*.82,E=(m-.5)*p.height*.88,b=(f-.5)*p.depth*.78,C=Wd(p,M,E,b);n[l*3]=C.x,n[l*3+1]=C.y,n[l*3+2]=C.z,s[l*3]=p.center.x,s[l*3+1]=p.center.y,s[l*3+2]=p.center.z,r[l]=gt(p.band+(v-.5)*.035,0,1),a[l]=p.order,o[l]=ei(p.seed*.17+x*.6180339),c[l]=Pe(.72,2.25),l++}}let h=new Ke;h.setAttribute("position",new Le(n,3)),h.setAttribute("aCenter",new Le(s,3)),h.setAttribute("aBand",new Le(r,1)),h.setAttribute("aOrder",new Le(a,1)),h.setAttribute("aSeed",new Le(o,1)),h.setAttribute("aSize",new Le(c,1));let d=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
      attribute vec3 aCenter;
      attribute float aBand;
      attribute float aOrder;
      attribute float aSeed;
      attribute float aSize;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float low;
      uniform float high;
      uniform float transient;
      uniform float ritual;
      uniform float shutdown;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      varying float vResonance;
      varying float vBand;
      varying float vSeed;

      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float activation = smoothstep(aOrder * 0.55, aOrder * 0.55 + 0.31, ritual);
        float offStart = 0.055 + (1.0 - aOrder) * 0.66;
        float off = smoothstep(offStart, offStart + 0.22, shutdown);
        vec3 rel = position - aCenter;
        vec3 radial = normalize(vec3(aCenter.x, 0.18 + aSeed * 0.4, aCenter.z) + vec3(0.001));
        vec3 scattered = position + radial * (2.8 + aOrder * 9.2) + vec3(sin(aSeed * 43.0), cos(aSeed * 37.0), sin(aSeed * 29.0)) * 0.75;
        vec3 p = mix(scattered, position, activation);
        float waveRadius = pulseAge * (4.15 + low * 1.7);
        float distanceToPulse = length(aCenter.xz - pulseOrigin);
        float front = exp(-abs(distanceToPulse - waveRadius) * 1.42) * pulseStrength;
        float memory = step(distanceToPulse, waveRadius) * exp(-(waveRadius - distanceToPulse) * 0.095) * exp(-pulseAge * 0.052) * pulseStrength;
        vec3 relDir = normalize(rel + vec3(0.0001));
        p += relDir * (spec * (0.035 + high * 0.035) + front * 0.22);
        p.y += sin(time * (0.42 + aBand * 0.54) + aSeed * 31.0) * (0.012 + spec * 0.045);
        p = mix(p, vec3(0.0, 0.34, 0.0) + relDir * (0.12 + aSeed * 0.28), off * 0.84);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float perspective = clamp(8.0 / max(1.0, -mv.z), 0.28, 3.3);
        gl_PointSize = aSize * pixelRatio * perspective * (0.72 + spec * 2.15 + front * 2.7 + transient * 0.22);
        float cameraDistance = length(cameraPosition - p);
        float farFade = mix(0.018, 1.0, 1.0 - smoothstep(10.0, 32.0, cameraDistance));
        vSpec = spec;
        vResonance = front * 1.55 + memory * 0.38;
        vBand = aBand;
        vSeed = aSeed;
        vAlpha = (0.20 + spec * 0.62 + vResonance * 0.78) * activation * (1.0 - off) * farFade;
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      uniform vec3 secondaryColor;
      varying float vAlpha;
      varying float vSpec;
      varying float vResonance;
      varying float vBand;
      varying float vSeed;
      void main() {
        vec2 q = abs(gl_PointCoord - 0.5);
        float square = 1.0 - smoothstep(0.34, 0.5, max(q.x, q.y));
        float core = 1.0 - smoothstep(0.0, 0.16, length(gl_PointCoord - 0.5));
        if (square <= 0.001) discard;
        vec3 color = mix(secondaryColor, glowColor, 0.28 + vBand * 0.62);
        color = mix(color, accentColor, clamp(vSpec * 0.28 + vResonance * 0.8, 0.0, 0.9));
        float twinkle = 0.82 + 0.18 * sin(vSeed * 91.0);
        float alpha = square * (0.56 + core * 0.44) * vAlpha * twinkle;
        gl_FragColor = vec4(color * (0.7 + core * 0.9 + vSpec * 1.2 + vResonance * 1.8), alpha);
      }
    `});return new qn(h,d)}var p_=f_(Gd);Jt.add(p_);var Xd=new tn;Jt.add(Xd);var qd=[],Yd=[],m_=new ji(.035,1.18,6.05,xt?20:40,1,!0);function g_(i,e,t,n){return new Xe({transparent:!0,depthWrite:!1,side:nn,blending:it,uniforms:en({band:{value:i},order:{value:e},centerXZ:{value:new me(t.x,t.z)},seed:{value:n}}),vertexShader:`
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform sampler2D spectrum;
      uniform float time;
      uniform float high;
      uniform float ritual;
      uniform float shutdown;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float band;
      uniform float order;
      uniform float seed;
      uniform vec2 centerXZ;
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      varying vec2 vUv;
      varying vec3 vWorld;
      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      void main() {
        float spec = texture2D(spectrum, vec2(band, 0.5)).r;
        float activation = smoothstep(order * 0.42, order * 0.42 + 0.32, ritual);
        float offStart = 0.18 + (1.0 - order) * 0.46;
        float survive = 1.0 - smoothstep(offStart, offStart + 0.19, shutdown);
        float edge = pow(max(0.0, sin(vUv.x * 3.1415926)), 2.5);
        float lengthFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.43, vUv.y);
        float waveRadius = pulseAge * 4.65;
        float d = length(centerXZ - pulseOrigin);
        float resonance = exp(-abs(d - waveRadius) * 1.48) * pulseStrength;
        float filament = pow(abs(sin(vUv.y * 54.0 + time * (0.16 + band * 0.26) + seed)), 16.0);
        float grain = hash21(gl_FragCoord.xy + seed * 71.0);
        float alpha = edge * lengthFade * (0.008 + spec * 0.042 + resonance * 0.095 + high * 0.008);
        alpha *= activation * survive * mix(0.58, 1.0, grain);
        vec3 color = mix(glowColor, accentColor, spec * 0.46 + resonance * 0.7 + filament * 0.18);
        gl_FragColor = vec4(color * (0.34 + spec * 1.6 + resonance * 2.2), alpha);
      }
    `})}for(let i=0;i<9;i++){let e=i/9*Math.PI*2+.12,t=4.55+i%3*.18,n=new L(Math.cos(e)*t,3.72+Math.sin(e*2)*.16,Math.sin(e)*t),s=new tn;s.position.copy(n),s.rotation.y=-e+Math.PI/2,s.userData.angle=e,s.userData.seed=Pe(0,Math.PI*2),s.userData.band=(i+.5)/9,s.userData.order=i/8;let r=new et(m_,g_(s.userData.band,s.userData.order,n,s.userData.seed));r.position.y=-3.025,s.add(r);let a=new Qt({color:7921615,transparent:!0,opacity:0,blending:it,depthWrite:!1}),o=new et(new Zn(.34,.012,5,96),a);o.rotation.x=Math.PI/2,s.add(o);let c=new et(new Zn(.27,.006,4,72),a.clone());c.rotation.y=Math.PI/2,s.add(c);let l=new Hs(new $i({map:Hd,color:8250837,transparent:!0,opacity:0,blending:it,depthWrite:!1}));l.scale.set(.75,.75,1),s.add(l),Yd.push(n.x,9.8,n.z,n.x,3.78,n.z),Xd.add(s),qd.push({root:s,beam:r,ring:o,crossRing:c,aperture:l,index:i})}var Zd=new Ke;Zd.setAttribute("position",new We(Yd,3));var Rh=new Xn({color:7064507,transparent:!0,opacity:0,blending:it,depthWrite:!1}),x_=new Cn(Zd,Rh);Jt.add(x_);var Jd=new Xe({transparent:!0,depthWrite:!1,side:nn,blending:it,uniforms:en(),vertexShader:`
    varying vec3 vNormalW;
    varying vec3 vWorld;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform float high;
    uniform float shutdown;
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorld);
      float fresnel = pow(1.0 - abs(dot(normalize(vNormalW), viewDir)), 4.8);
      float decay = smoothstep(5.4, 0.0, pulseAge) * pulseStrength;
      float alpha = fresnel * decay * (0.08 + high * 0.06) * (1.0 - shutdown * 0.7);
      vec3 color = mix(glowColor, accentColor, fresnel * 0.55);
      gl_FragColor = vec4(color * (0.65 + decay * 1.8), alpha);
    }
  `}),_i=new et(new es(1,xt?36:64,xt?20:36),Jd);_i.visible=!1;Jt.add(_i);var vi=new tn;Jt.add(vi);var __=new Xe({transparent:!0,depthWrite:!1,side:nn,blending:it,uniforms:en(),vertexShader:`
    varying vec3 vLocal;
    varying vec3 vWorld;
    varying vec3 vNormalW;
    void main() {
      vLocal = position;
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
    uniform float time;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform float high;
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    varying vec3 vLocal;
    varying vec3 vWorld;
    varying vec3 vNormalW;
    void main() {
      float stripe = pow(abs(sin(vLocal.y * 20.0 - time * 1.8)), 22.0);
      float fresnel = pow(1.0 - abs(dot(normalize(vNormalW), normalize(cameraPosition - vWorld))), 3.2);
      float decay = smoothstep(4.5, 0.0, pulseAge) * pulseStrength;
      float alpha = (fresnel * 0.14 + stripe * (0.035 + high * 0.08)) * decay;
      gl_FragColor = vec4(mix(glowColor, accentColor, stripe) * (0.45 + stripe * 1.8), alpha);
    }
  `}),hs=new et(new ji(1,1,1,xt?48:96,20,!0),__);hs.visible=!1;vi.add(hs);var Mh=xt?48:96,os=new Float32Array(Mh*2*3),Ph=new Ke;Ph.setAttribute("position",new Le(os,3).setUsage(Ks));var Bl=new Xn({color:9300956,transparent:!0,opacity:0,blending:it,depthWrite:!1}),zl=new Cn(Ph,Bl);zl.visible=!1;vi.add(zl);var Sh=xt?28:48,jn=new Rr(new Yn(.055,1,.055),new Qt({color:7986639,transparent:!0,opacity:0,blending:it,depthWrite:!1}),Sh);jn.instanceMatrix.setUsage(Ks);jn.visible=!1;vi.add(jn);var oa=new Nt;function v_(){let i=xt?9:13,e=i*i*i,t=new Float32Array(e*3),n=new Float32Array(e),s=new Float32Array(e),r=0;for(let c=0;c<i;c++)for(let l=0;l<i;l++)for(let h=0;h<i;h++)t[r*3]=(h/(i-1)-.5)*2,t[r*3+1]=(l/(i-1)-.5)*2,t[r*3+2]=(c/(i-1)-.5)*2,n[r]=ei((h+l*1.7+c*2.3)/i),s[r]=r*.731,r++;let a=new Ke;a.setAttribute("position",new Le(t,3)),a.setAttribute("aBand",new Le(n,1)),a.setAttribute("aSeed",new Le(s,1));let o=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
      attribute float aBand;
      attribute float aSeed;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float life = smoothstep(4.8, 0.0, pulseAge) * pulseStrength;
        vec3 p = position;
        float shell = abs(length(p) - mod(pulseAge * 0.52, 1.8));
        p *= 1.6 + pulseAge * 0.72;
        p += normalize(position + 0.001) * sin(aSeed + time * 1.4) * spec * 0.16;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = pixelRatio * clamp(7.0 / max(1.0, -mv.z), 0.4, 2.8) * (1.0 + spec * 2.3);
        vAlpha = exp(-shell * 3.2) * life * (0.2 + spec * 0.8);
        vSpec = spec;
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec2 q = abs(gl_PointCoord - 0.5);
        float box = 1.0 - smoothstep(0.28, 0.5, max(q.x,q.y));
        if (box < 0.01) discard;
        gl_FragColor = vec4(mix(glowColor, accentColor, vSpec) * (0.65 + vSpec), box * vAlpha);
      }
    `});return new qn(a,o)}var Bi=v_();Bi.visible=!1;vi.add(Bi);var bh=xt?120:240,ls=new Float32Array(bh*2*3),Ih=new Ke;Ih.setAttribute("position",new Le(ls,3).setUsage(Ks));var Vl=new Xn({color:8840405,transparent:!0,opacity:0,blending:it,depthWrite:!1}),Hl=new Cn(Ih,Vl);Hl.visible=!1;vi.add(Hl);var gi=new tn;for(let i=0;i<9;i++){let e=new Cn(new Nr(new Yn(1.9,1.15,.08)),new Xn({color:i===8?14807764:7526859,transparent:!0,opacity:0,blending:it,depthWrite:!1}));e.userData.index=i,gi.add(e)}gi.visible=!1;vi.add(gi);var $d=Jd.clone();$d.uniforms=en();var mi=new et(new es(1,xt?36:64,xt?20:36),$d);mi.visible=!1;vi.add(mi);var Qn=new et(new Zn(1,.025,6,xt?96:192),new Qt({color:13037791,transparent:!0,opacity:0,blending:it,depthWrite:!1}));Qn.visible=!1;vi.add(Qn);var cn=new tn;cn.position.y=.34;Jt.add(cn);var y_=new Xe({transparent:!0,uniforms:en(),vertexShader:`
    uniform float time;
    uniform float low;
    uniform float mid;
    uniform float transient;
    uniform float open;
    uniform float ignite;
    uniform float shutdown;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    varying float vNoise;
    float waveNoise(vec3 p) {
      float n = sin(p.x * 3.1 + time * 0.7);
      n += sin(p.y * 4.7 - time * 0.43) * 0.55;
      n += sin(p.z * 6.3 + time * 0.31) * 0.32;
      n += sin((p.x + p.y + p.z) * 8.0 - time * 0.23) * 0.18;
      return n / 2.05;
    }
    void main() {
      float n = waveNoise(position);
      float breathing = (0.025 + low * 0.17 + transient * 0.1 + open * 0.07) * ignite;
      vec3 p = position + normal * (n * 0.065 + breathing * (0.58 + n * 0.3));
      p *= 1.0 - smoothstep(0.70, 0.98, shutdown) * 0.72;
      vec4 wp = modelMatrix * vec4(p, 1.0);
      vWorld = wp.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      vNoise = n;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
    uniform float time;
    uniform float mid;
    uniform float high;
    uniform float open;
    uniform float ignite;
    uniform float shutdown;
    uniform float section;
    uniform vec3 fogColor;
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    varying float vNoise;
    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorld);
      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), viewDir), 0.0), 2.65);
      float latitude = sin(vWorld.y * 14.0 + vWorld.x * 4.2 - time * 0.72 + vNoise * 4.0);
      float veins = pow(max(0.0, latitude), 20.0);
      float lattice = pow(abs(sin((vWorld.x + vWorld.z) * 13.0 + time * 0.24)), 34.0);
      vec3 color = mix(fogColor * 0.34, glowColor, fresnel * 0.76 + veins * 0.34);
      color = mix(color, accentColor, lattice * (0.12 + high * 0.7) + open * fresnel * 0.24);
      float mode = floor(section + 0.5);
      float bodyPresence = 0.82;
      if (mode > 0.5) bodyPresence = 0.60;
      if (mode > 1.5) bodyPresence = 0.49;
      if (mode > 2.5) bodyPresence = 0.38;
      if (mode > 4.5) bodyPresence = 0.29;
      if (mode > 5.5) bodyPresence = 0.17;
      if (mode > 6.5) bodyPresence = 0.10;
      if (mode > 7.5) bodyPresence = 0.065;
      float power = (0.18 + fresnel * 2.4 + veins * (0.28 + mid * 0.9) + lattice * high * 1.5) * ignite * bodyPresence;
      float alpha = ignite * bodyPresence * (1.0 - smoothstep(0.82, 1.0, shutdown));
      gl_FragColor = vec4(color * power, alpha);
    }
  `}),fa=new et(new Gs(1.02,xt?4:5),y_);fa.userData.interactive="core";cn.add(fa);var sr=new et(new Gs(1.28,2),new Qt({color:9759452,wireframe:!0,transparent:!0,opacity:0,blending:it,depthWrite:!1}));cn.add(sr);var ua=new Hs(new $i({map:Hd,color:7660756,transparent:!0,opacity:0,blending:it,depthWrite:!1}));ua.scale.set(5,5,1);cn.add(ua);var Kd=[];for(let i=0;i<9;i++){let e=1.43+i*.235,t=new Qt({color:i===8?15069137:7526857,transparent:!0,opacity:0,blending:it,depthWrite:!1}),n=new et(new Zn(e,i%3===0?.017:.007,5,xt?96:192),t);n.rotation.set(Pe(-1.1,1.1),Pe(-Math.PI,Math.PI),Pe(-1.1,1.1)),n.userData.speed=Pe(.032,.105)*(i%2?-1:1),n.userData.index=i,Kd.push(n),cn.add(n)}var Eh=[],M_=new Yn(.036,1.55,.28);for(let i=0;i<9;i++){let e=new Xs({color:398359,metalness:.92,roughness:.18,emissive:668722,emissiveIntensity:0,transparent:!0,opacity:0}),t=new et(M_,e),n=i/9*Math.PI*2;t.userData.angle=n,t.position.set(Math.cos(n)*1.02,Math.sin(n*2)*.09,Math.sin(n)*1.02),t.rotation.set(Math.sin(n)*.28,-n,Math.cos(n)*.22),Eh.push(t),cn.add(t)}function S_(i){let e=new Ke,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i);for(let o=0;o<i;o++){let c=o%9,l=Pe(0,Math.PI*2),h=1.8+c*.22+Pe(-.1,.38);t[o*3]=Math.cos(l)*h,t[o*3+1]=Pe(-2.2,2.2)+Math.sin(l*(2+c%3))*.22,t[o*3+2]=Math.sin(l)*h,n[o]=Pe(0,Math.PI*2),s[o]=Pe(.8,2.8),r[o]=ei(c/9+Pe(-.03,.03))}e.setAttribute("position",new Le(t,3)),e.setAttribute("aPhase",new Le(n,1)),e.setAttribute("aSize",new Le(s,1)),e.setAttribute("aBand",new Le(r,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
      attribute float aPhase;
      attribute float aSize;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float low;
      uniform float mid;
      uniform float high;
      uniform float transient;
      uniform float open;
      uniform float ignite;
      uniform float shutdown;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      varying float vBand;
      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        vec3 p = position;
        float a = time * (0.018 + aBand * 0.032) + aPhase * 0.05 + mid * 0.18;
        mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
        p.xz = rot * p.xz;
        p.y += sin(time * 0.22 + aPhase + length(p.xz) * 1.7) * (0.05 + high * 0.12);
        p.xz *= ignite * (1.0 + open * (0.09 + aBand * 0.08) + low * 0.012);
        p *= 1.0 - smoothstep(0.64, 0.98, shutdown) * 0.75;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * pixelRatio * clamp(8.0 / max(1.0, -mv.z), 0.35, 3.2) * (0.6 + spec * 1.7 + high * 0.7 + transient * 0.3);
        vAlpha = (0.18 + spec * 0.56 + high * 0.18) * ignite * (1.0 - shutdown);
        vSpec = spec;
        vBand = aBand;
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      varying float vAlpha;
      varying float vSpec;
      varying float vBand;
      void main() {
        vec2 q = abs(gl_PointCoord - 0.5);
        float box = 1.0 - smoothstep(0.34, 0.5, max(q.x, q.y));
        if (box < 0.01) discard;
        vec3 color = mix(glowColor, accentColor, vBand * 0.62 + vSpec * 0.2);
        gl_FragColor = vec4(color * (0.72 + vSpec * 1.45), box * vAlpha);
      }
    `});return new qn(e,a)}var Th=S_(xt?1200:2600);cn.add(Th);function b_(i){let e=new Ke,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i),a=new Float32Array(i);for(let c=0;c<i;c++){let l=Pe(-1,1),h=Pe(0,Math.PI*2),d=Math.sqrt(Math.max(0,1-l*l)),u=Math.pow(Pe(.02,1),.42);t[c*3]=Math.cos(h)*d*u,t[c*3+1]=l*u,t[c*3+2]=Math.sin(h)*d*u,n[c]=Pe(0,1e3),s[c]=ei(c*.61803398875+Pe(-.02,.02)),r[c]=Pe(0,1),a[c]=Pe(.65,2.45)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aSeed",new Le(n,1)),e.setAttribute("aBand",new Le(s,1)),e.setAttribute("aLayer",new Le(r,1)),e.setAttribute("aSize",new Le(a,1));let o=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
      attribute float aSeed;
      attribute float aBand;
      attribute float aLayer;
      attribute float aSize;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float low;
      uniform float mid;
      uniform float high;
      uniform float transient;
      uniform float open;
      uniform float ignite;
      uniform float shutdown;
      uniform float section;
      uniform float sectionLocal;
      uniform float phaseTransition;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      varying float vMode;
      varying float vSeed;
      const float PI = 3.14159265359;
      mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c,-s,s,c); }
      float hash11(float p) { return fract(sin(p * 127.1) * 43758.5453); }
      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        vec3 p = position;
        float radius = max(0.001, length(p));
        vec3 n = p / radius;
        float mode = floor(section + 0.5);
        float life = 0.72 + 0.28 * sin(time * (0.37 + aBand * 0.19) + aSeed);

        if (mode < 0.5) {
          // I \u2014 pressure breathing: a dark-water lung, almost spherical.
          float pressure = sin(time * 0.74 + radius * 8.0 + aSeed * 0.02);
          p = n * (0.30 + radius * 1.08 + pressure * (0.045 + low * 0.18));
        } else if (mode < 1.5) {
          // II \u2014 salt stars: nine radial filaments, sharpened by upper bands.
          float az = atan(n.z, n.x);
          float star = pow(abs(cos(az * 4.5 + n.y * 1.7 + time * 0.06)), 13.0);
          float spoke = 0.28 + radius * (0.68 + star * (1.05 + spec * 1.18));
          p = n * spoke;
          p.y += sin(az * 9.0 + time * 0.22 + aSeed) * high * 0.16;
        } else if (mode < 2.5) {
          // III \u2014 blind quartz: directions quantise into unstable facets.
          vec3 q = floor(n * 5.0 + 0.5) / 5.0;
          q = normalize(mix(n, q, 0.72));
          float stepPulse = floor((time * 1.7 + aSeed) * 2.0) * 0.01;
          p = q * (0.24 + radius * (1.23 + spec * 0.28) + stepPulse);
        } else if (mode < 3.5) {
          // IV \u2014 the gate: matter becomes a vertical pressure column.
          float az = atan(p.z, p.x);
          float cr = length(p.xz);
          float slit = 0.25 + 0.10 * sin(p.y * 9.0 - time * 0.45 + aSeed);
          p = vec3(cos(az) * cr * slit, p.y * (2.75 + low * 0.62), sin(az) * cr * slit);
          p.y += (spec - 0.3) * 0.32;
        } else if (mode < 4.5) {
          // V \u2014 the unarrived city: a nine-lobed forecast bloom.
          float az = atan(n.z, n.x);
          float petal = pow(abs(sin(az * 4.5 + n.y * 2.6 - time * 0.08)), 4.0);
          p = n * (0.22 + radius * (0.64 + petal * (1.22 + mid * 0.58) + spec * 0.30));
          p.y *= 0.84 + petal * 0.46;
        } else if (mode < 5.5) {
          // VI \u2014 counter-current: a helix rotating against its own wake.
          float twist = p.y * (3.8 + mid * 1.8) + time * (aLayer > 0.5 ? 0.23 : -0.19);
          p.xz = rot(twist) * p.xz;
          p.xz *= 0.72 + abs(p.y) * 0.46 + spec * 0.18;
          p.y *= 1.62;
        } else if (mode < 6.5) {
          // VII \u2014 codex: data is compressed into a page no eye can read.
          p.x = sign(p.x) * pow(abs(p.x), 0.72) * 1.72;
          p.y *= 1.52;
          p.z *= 0.065 + high * 0.075;
          p.z += sin((p.y + aBand) * 22.0 - time * 1.15) * (0.015 + spec * 0.08);
        } else if (mode < 7.5) {
          // VIII \u2014 the abyss looks back: an oblate iris and a hollow pupil.
          float d = length(p.xy);
          p.xy *= vec2(1.92, 0.68);
          p.z *= 0.16 + d * 0.10;
          p.z += sin(d * 15.0 - time * 0.92 + aSeed) * (0.025 + transient * 0.12);
          p *= 0.88 + smoothstep(0.24, 0.92, d) * 0.26;
        } else {
          // IX \u2014 shoreless: the field contracts into a cold archival pearl.
          float finalPull = 0.36 - sectionLocal * 0.10;
          p = n * (finalPull * (0.32 + radius * 0.78) + spec * 0.045);
          p += n * sin(time * 0.45 + aSeed) * 0.012;
        }

        p *= 1.0 + open * (0.08 + aLayer * 0.16);
        // At a chapter cut, geometry turns into a transient spherical notation.
        float transition = phaseTransition;
        vec3 transitionShell = n * (1.35 + aLayer * 1.7 + spec * 0.32);
        p = mix(p, transitionShell, transition * (0.58 + aLayer * 0.32));
        p += n * sin(aSeed * 1.91 + time * 7.0) * transition * 0.12;
        p *= ignite * (1.0 - smoothstep(0.66, 0.99, shutdown) * 0.94);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float perspective = clamp(9.0 / max(1.0, -mv.z), 0.36, 3.4);
        gl_PointSize = aSize * pixelRatio * perspective * 1.26 * (0.62 + spec * 1.72 + high * 0.58 + transition * 1.25);
        vAlpha = (0.15 + spec * 0.62 + life * 0.14 + transient * 0.20) * ignite * (1.0 - shutdown) * (0.88 + transition * 0.50);
        vSpec = spec;
        vMode = mode;
        vSeed = aSeed;
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      uniform vec3 secondaryColor;
      uniform float phaseTransition;
      varying float vAlpha;
      varying float vSpec;
      varying float vMode;
      varying float vSeed;
      void main() {
        vec2 q = gl_PointCoord - 0.5;
        float r = length(q);
        if (r > 0.5) discard;
        float core = smoothstep(0.48, 0.0, r);
        float ring = smoothstep(0.09, 0.0, abs(r - 0.26));
        float grain = 0.82 + 0.18 * sin(vSeed * 17.0);
        vec3 color = mix(glowColor, accentColor, clamp(vSpec * 0.74 + vMode * 0.035, 0.0, 1.0));
        color = mix(color, secondaryColor, ring * 0.18);
        float alpha = (core * 0.78 + ring * (0.18 + phaseTransition * 0.28)) * vAlpha * grain;
        gl_FragColor = vec4(color * (0.68 + vSpec * 1.75 + core * 0.35), alpha);
      }
    `});return new qn(e,o)}var kl=b_(xt?4200:10500);kl.renderOrder=4;cn.add(kl);var E_=new Float32Array(ln*2*3),Gl=new Ke;Gl.setAttribute("position",new Le(E_,3).setUsage(Ks));var Lh=new Xn({color:10349019,transparent:!0,opacity:0,blending:it,depthWrite:!1}),Qd=new Cn(Gl,Lh);cn.add(Qd);function T_(i){let e=new Ke,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i);for(let o=0;o<i;o++){let c=Pe(4,30),l=Pe(0,Math.PI*2);t[o*3]=Math.cos(l)*c,t[o*3+1]=Pe(-5,12),t[o*3+2]=Math.sin(l)*c,n[o]=Pe(0,Math.PI*2),s[o]=Pe(.025,.14),r[o]=Pe(.45,2.4)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aPhase",new Le(n,1)),e.setAttribute("aSpeed",new Le(s,1)),e.setAttribute("aSize",new Le(r,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
      attribute float aPhase;
      attribute float aSpeed;
      attribute float aSize;
      uniform float time;
      uniform float high;
      uniform float ritual;
      uniform float shutdown;
      uniform float pixelRatio;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y += mod(time * aSpeed + aPhase * 2.0, 17.0) - 8.5;
        p.x += sin(time * aSpeed * 1.7 + aPhase) * 0.36;
        p.z += cos(time * aSpeed * 1.3 + aPhase) * 0.28;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * pixelRatio * clamp(7.0 / max(1.0, -mv.z), 0.2, 2.0) * (0.7 + high * 0.42);
        float dist = length(cameraPosition - p);
        float farFade = 1.0 - smoothstep(10.0, 38.0, dist);
        vAlpha = (0.08 + high * 0.1) * smoothstep(0.12, 0.8, ritual) * (1.0 - shutdown) * mix(0.2, 1.0, farFade);
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(glowColor * 0.55, smoothstep(0.5, 0.0, d) * vAlpha);
      }
    `});return new qn(e,a)}var jd=T_(xt?1200:3300);Jt.add(jd);function w_(i){let e=new Ke,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i);for(let o=0;o<i;o++){let c=Pe(3.5,18),l=Pe(0,Math.PI*2);t[o*3]=Math.cos(l)*c,t[o*3+1]=Pe(-7,11),t[o*3+2]=Math.sin(l)*c,n[o]=Pe(0,1e3),s[o]=Pe(1.6,8.5),r[o]=Pe(0,1)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aSeed",new Le(n,1)),e.setAttribute("aSize",new Le(s,1)),e.setAttribute("aBand",new Le(r,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
      attribute float aSeed;
      attribute float aSize;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float high;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float ritual;
      uniform float shutdown;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec3 p = position;
        p.y += mod(time * (0.018 + fract(aSeed) * 0.035) + aSeed, 18.0) - 9.0;
        p.x += sin(time * 0.047 + aSeed) * 0.55;
        p.z += cos(time * 0.039 + aSeed * 1.7) * 0.42;
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float waveRadius = pulseAge * 4.8;
        float waveDistance = abs(length(p.xz - pulseOrigin) - waveRadius);
        float scatter = exp(-waveDistance * 0.68) * pulseStrength * smoothstep(5.2, 0.0, pulseAge);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float depth = max(0.8, -mv.z);
        gl_PointSize = aSize * pixelRatio * clamp(12.0 / depth, 0.22, 3.8) * (0.65 + high * 0.55 + scatter * 1.5);
        float focus = smoothstep(23.0, 3.0, depth) * smoothstep(0.3, 2.4, depth);
        vAlpha = (0.018 + spec * 0.035 + scatter * 0.15) * focus * ritual * (1.0 - shutdown);
        vSpec = spec + scatter;
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform vec3 fogColor;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float halo = exp(-d * d * 14.0);
        vec3 color = mix(fogColor, glowColor, 0.28 + vSpec * 0.32);
        gl_FragColor = vec4(color * (0.42 + halo * 0.55), halo * vAlpha);
      }
    `});return new qn(e,a)}var Dh=w_(xt?260:720);Dh.renderOrder=8;Jt.add(Dh);function A_(i){let e=[],t=[],n=[],s=[];for(let o=0;o<i;o++){let c=o/i*Math.PI*2+Pe(-.12,.12),l=Pe(21,37),h=Math.cos(c)*l,d=Math.sin(c)*l,u=Pe(-6,-3),p=Pe(7,18),x=Pe(-1.3,1.3),v=(m,f,M,E,b,C)=>{e.push(m,f,M,E,b,C);for(let w=0;w<2;w++)t.push(h,(u+p)*.5,d),n.push(o*1.713),s.push(ei(o*.381966))};v(h,u,d,h+x,p,d+Pe(-.8,.8));for(let m=1;m<5;m++){let f=Dn(u,p,m/5),M=Pe(.5,1.7)*(1-m*.08);v(h-Math.cos(c)*M,f,d-Math.sin(c)*M,h+Math.cos(c)*M,f,d+Math.sin(c)*M)}}let r=new Ke;r.setAttribute("position",new We(e,3)),r.setAttribute("aCenter",new We(t,3)),r.setAttribute("aSeed",new We(n,1)),r.setAttribute("aBand",new We(s,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:it,uniforms:en(),vertexShader:`
      attribute vec3 aCenter;
      attribute float aSeed;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float section;
      uniform float ritual;
      uniform float shutdown;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec3 p = position;
        p.x += sin(time * 0.012 + aSeed) * 0.17;
        p.z += cos(time * 0.009 + aSeed * 1.3) * 0.14;
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float waveRadius = pulseAge * 4.8;
        float resonance = exp(-abs(length(aCenter.xz - pulseOrigin) - waveRadius) * 0.52) * pulseStrength * smoothstep(5.5, 0.0, pulseAge);
        float distanceFade = 1.0 - smoothstep(21.0, 43.0, distance(cameraPosition, aCenter));
        float phaseLift = 0.018 + step(6.5, section) * 0.018;
        vAlpha = (phaseLift + resonance * 0.62 + spec * 0.018) * distanceFade * ritual * (1.0 - shutdown);
        vSpec = spec + resonance;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform vec3 secondaryColor;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec3 color = mix(secondaryColor, glowColor, clamp(vSpec, 0.0, 1.0));
        gl_FragColor = vec4(color * (0.18 + vSpec * 0.9), vAlpha);
      }
    `});return new Cn(r,a)}var ef=A_(xt?22:46);Jt.add(ef);var wh=[];for(let i=0;i<7;i++){let e=new Qt({color:2513764,transparent:!0,opacity:.012,blending:it,depthWrite:!1}),t=new et(new Zn(13+i*3.2,.018+i*.002,3,xt?128:256),e);t.position.y=-5.2+i*2.25,t.rotation.set(Math.PI*.5+Pe(-.16,.16),Pe(-.35,.35),Pe(-.12,.12)),t.userData.seed=Pe(0,10),wh.push(t),Jt.add(t)}var tf=new Br(6539453,515,.15);Nn.add(tf);var Wl=new qs(6805704,0,18,2.05);Wl.position.copy(cn.position);Nn.add(Wl);var Xl=new qs(2910320,0,34,1.5);Xl.position.set(0,9,-5);Nn.add(Xl);var fs=new Ll(Zt);fs.addPass(new Dl(Nn,Ln));var Ah=new nr(new me(innerWidth,innerHeight),xt?.72:.94,.72,.22);fs.addPass(Ah);var nf=new Ul(.865);fs.addPass(nf);var C_=new tr({uniforms:{tDiffuse:{value:null},time:ee.time,resolution:ee.resolution,energy:ee.energy,high:ee.high,ritual:ee.ritual,shutdown:ee.shutdown,pulseAge:ee.pulseAge,pulseStrength:ee.pulseStrength,pulseScreen:ee.pulseScreen,section:ee.section,sectionLocal:ee.sectionLocal,phaseTransition:ee.phaseTransition,sonarMode:ee.sonarMode,deepColor:ee.deepColor,fogColor:ee.fogColor,glowColor:ee.glowColor},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec2 resolution;
    uniform float energy;
    uniform float high;
    uniform float ritual;
    uniform float shutdown;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform vec2 pulseScreen;
    uniform float section;
    uniform float sectionLocal;
    uniform float phaseTransition;
    uniform float sonarMode;
    uniform vec3 deepColor;
    uniform vec3 fogColor;
    uniform vec3 glowColor;
    varying vec2 vUv;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    void main() {
      vec2 uv = vUv;
      vec2 center = uv - 0.5;
      float radial = length(center * vec2(1.0, resolution.y / max(1.0, resolution.x)));
      float edge = smoothstep(0.20, 0.63, radial);
      float noise = hash21(uv * resolution * 0.37 + floor(time * 8.0));
      vec2 direction = normalize(center + vec2(0.0001));
      vec2 tangent = vec2(-direction.y, direction.x);
      float abyss = smoothstep(2.5, 8.0, section);
      float blurAmount = 0.00028 + edge * (0.0032 + energy * 0.0013 + abyss * 0.0007) + shutdown * 0.0027 + phaseTransition * 0.0018;
      vec2 d = direction * blurAmount;
      vec2 t = tangent * blurAmount * 0.72;
      vec3 source = texture2D(tDiffuse, uv).rgb;
      vec3 blurred = source * 0.28;
      blurred += texture2D(tDiffuse, uv + d).rgb * 0.13;
      blurred += texture2D(tDiffuse, uv - d).rgb * 0.13;
      blurred += texture2D(tDiffuse, uv + d * 2.2).rgb * 0.08;
      blurred += texture2D(tDiffuse, uv - d * 2.2).rgb * 0.08;
      blurred += texture2D(tDiffuse, uv + t).rgb * 0.10;
      blurred += texture2D(tDiffuse, uv - t).rgb * 0.10;
      blurred += texture2D(tDiffuse, uv + t * 2.0).rgb * 0.05;
      blurred += texture2D(tDiffuse, uv - t * 2.0).rgb * 0.05;

      float chroma = (0.00018 + high * 0.00062 + pulseStrength * exp(-pulseAge * 1.8) * 0.0011 + phaseTransition * 0.0014) * (0.22 + edge * 1.5);
      float r = texture2D(tDiffuse, uv + direction * chroma).r;
      float b = texture2D(tDiffuse, uv - direction * chroma).b;
      source.r = mix(source.r, r, 0.62);
      source.b = mix(source.b, b, 0.62);

      float dissolve = edge * (0.36 + energy * 0.21 + abyss * 0.08) + smoothstep(0.48, 0.98, shutdown) * 0.52;
      dissolve *= 0.86 + noise * 0.14;
      float lowerWater = smoothstep(0.72, 0.08, uv.y);
      vec3 field = mix(deepColor, fogColor, 0.40 + radial * 0.76 + lowerWater * 0.18 + sin(time * 0.05) * 0.025);
      vec3 color = mix(source, blurred, clamp(dissolve, 0.0, 0.82));
      color = mix(color, field, clamp(edge * (0.17 + abyss * 0.05) + shutdown * 0.42 + lowerWater * 0.035, 0.0, 0.76));

      // The chapter cut is a pressure front rather than a typographic card.
      float transitionRing = exp(-abs(radial - (0.08 + phaseTransition * 0.55)) * 22.0) * phaseTransition;
      color += glowColor * transitionRing * (0.08 + high * 0.08);
      color = mix(color, field, phaseTransition * edge * 0.16);

      // Ninth-dialect sonar removes light from the image before returning a rim.
      vec2 pulseDelta = (uv - pulseScreen) * vec2(1.0, resolution.y / max(1.0, resolution.x));
      float pulseDistance = length(pulseDelta);
      float nullRadius = mix(0.58, 0.015, smoothstep(0.0, 4.3, pulseAge));
      float nullFront = exp(-abs(pulseDistance - nullRadius) * 48.0) * pulseStrength * step(7.5, sonarMode) * smoothstep(4.3, 0.0, pulseAge);
      float nullInterior = smoothstep(nullRadius, nullRadius * 0.72, pulseDistance) * pulseStrength * step(7.5, sonarMode) * smoothstep(4.3, 0.0, pulseAge);
      color *= 1.0 - nullInterior * 0.74;
      color += glowColor * nullFront * 0.22;

      // Chapter VIII behaves like an eye: peripheral light is admitted, the
      // centre remains unnaturally still.
      float gaze = step(6.5, section) * (1.0 - step(7.5, section));
      color *= 1.0 - gaze * exp(-radial * radial * 42.0) * 0.08;
      color += glowColor * edge * edge * (0.003 + energy * 0.005 + abyss * 0.002);
      float grain = noise - 0.5;
      color += grain * (0.007 + high * 0.007 + abyss * 0.004);
      float vignette = smoothstep(0.80, 0.16, radial);
      color *= mix(0.56 - abyss * 0.05, 1.0, vignette);
      color *= 0.18 + ritual * 0.82;
      gl_FragColor = vec4(color, 1.0);
    }
  `});fs.addPass(C_);fs.addPass(new Fl);var an=null,Od=null,rn=null,rr=null,on=null,la=null,ti=null;te.audio.addEventListener("loadedmetadata",()=>{te.timeTotal.textContent=vh(te.audio.duration)});te.audio.addEventListener("play",()=>{g.playing=!0,te.audioState.textContent="PLAYING",te.signal.textContent="LIVE FFT"});te.audio.addEventListener("pause",()=>{g.playing=!1,g.ended||(te.audioState.textContent=g.audioReady?"PAUSED":"STANDBY")});te.audio.addEventListener("ended",()=>rf());te.audio.addEventListener("error",()=>{g.audioFailed=!0,te.fileLabel.hidden=!1,te.hint.textContent="\u672A\u80FD\u8BFB\u53D6 archive.mp3\u3002\u8BF7\u9009\u62E9\u672C\u5730\u97F3\u9891\u6587\u4EF6\u7EE7\u7EED\u3002",te.audioState.textContent="FILE REQUIRED"});async function R_(){if(!an){let i=window.AudioContext||window.webkitAudioContext;if(!i)throw new Error("Web Audio API unavailable");an=new i,Od=an.createMediaElementSource(te.audio),rn=an.createAnalyser(),rn.fftSize=2048,rn.smoothingTimeConstant=.82,rn.minDecibels=-94,rn.maxDecibels=-16,rr=an.createGain(),rr.gain.value=0,Od.connect(rn),rn.connect(rr),rr.connect(an.destination),on=new Uint8Array(rn.frequencyBinCount),la=new Uint8Array(rn.fftSize)}an.state!=="running"&&await an.resume(),g.audioReady=!0}function P_(){g.calibrated=!1,g.ceremonyTime=0,g.ceremonyCue=0,g.ritual=0,g.ignite=0,g.lightLevel=0,g.shutdown=0,g.ending=!1,g.ended=!1,g.endingCue=0,g.archiveOpen=0,g.archiveOpenTarget=0,g.pulseAge=99,g.pulseStrength=0,g.pulseCooldown=0,g.pulseMode=0,g.pulseSerial=0,g.tideIndex=0,g.transitionFrom=0,g.pendingTide=-1,g.phaseLocal=0,g.phaseTransition=0,g.transitionClock=99,g.transitionSwitched=!1,ee.section.value=0,ee.sectionLocal.value=0,ee.phaseTransition.value=0,ee.sonarMode.value=0,document.documentElement.style.setProperty("--phase-veil","0"),g.diveTarget=.12,g.yawTarget=0,g.pitchTarget=.07,document.body.classList.add("entered"),document.body.classList.remove("calibrated","ending","ended"),te.coreState.textContent="CALIBRATING",te.fieldState.textContent="DARK ADAPTATION",te.mode.textContent="CALIBRATION",document.documentElement.style.setProperty("--blackout","1"),document.documentElement.style.setProperty("--ritual-caption","0")}async function us(i,e=!1){if((!g.entered||e||g.ended)&&(g.entered=!0,P_(),Number.isFinite(te.audio.duration)&&(te.audio.currentTime=0)),!i){g.audioReady=!1,g.playing=!1,te.signal.textContent="SYNTHETIC",te.audioState.textContent="SILENT";return}try{te.enter.disabled=!0,te.enter.textContent="\u6B63\u5728\u6821\u51C6\u2026",await R_(),(e||g.ended||te.audio.currentTime>.2)&&(te.audio.currentTime=0),await te.audio.play(),te.enter.textContent="\u542F\u52A8\u5171\u9E23\u4EEA\u5F0F",te.enter.disabled=!1}catch(t){console.error(t),te.enter.disabled=!1,te.enter.textContent="\u91CD\u8BD5\u97F3\u9891",te.fileLabel.hidden=!1,te.hint.textContent="\u97F3\u9891\u88AB\u6D4F\u89C8\u5668\u62E6\u622A\u6216\u6587\u4EF6\u4E0D\u53EF\u8BFB\u3002\u53EF\u9009\u62E9\u672C\u5730\u97F3\u9891\uFF0C\u6216\u5148\u65E0\u58F0\u8FDB\u5165\u3002",g.audioFailed=!0}}te.enter.addEventListener("click",()=>us(!0));te.silent.addEventListener("click",()=>us(!1));te.replay.addEventListener("click",()=>us(!0,!0));te.file.addEventListener("change",async i=>{let e=i.target.files?.[0];e&&(ti&&URL.revokeObjectURL(ti),ti=URL.createObjectURL(e),te.audio.src=ti,te.audio.load(),g.audioFailed=!1,te.fileLabel.hidden=!0,te.hint.textContent=`\u5DF2\u8F7D\u5165 ${e.name}`,await us(!0,!0))});window.addEventListener("dragover",i=>i.preventDefault());window.addEventListener("drop",async i=>{i.preventDefault();let e=[...i.dataTransfer.files].find(t=>t.type.startsWith("audio/"));e&&(ti&&URL.revokeObjectURL(ti),ti=URL.createObjectURL(e),te.audio.src=ti,te.audio.load(),await us(!0,!0),Mn(`AUDIO LOADED / ${e.name.toUpperCase()}`,2200))});function ph(i,e){if(!rn||!on||!an)return 0;let t=an.sampleRate/2,n=gt(Math.floor(i/t*on.length),0,on.length-1),s=gt(Math.ceil(e/t*on.length),n+1,on.length),r=0;for(let a=n;a<s;a++)r+=on[a];return r/((s-n)*255)}function I_(i){if(rn&&on&&g.playing&&an){let e=an.sampleRate/2;for(let t=0;t<ln;t++){let n=t/ln,s=(t+1)/ln,r=28*Math.pow(17e3/28,n),a=28*Math.pow(17e3/28,s),o=gt(Math.floor(r/e*on.length),0,on.length-1),c=gt(Math.ceil(a/e*on.length),o+1,on.length),l=0;for(let h=o;h<c;h++)l+=on[h];zi[t]=Math.round(l/Math.max(1,c-o))}}else for(let e=0;e<ln;e++){let n=22+31*Math.exp(-e/32)*(.55+.45*Math.sin(i*(.42+e*.006)+e*.53));zi[e]=gt(Math.round(n),0,255)}ds.needsUpdate=!0}function L_(i,e){let t,n,s,r=0;if(rn&&g.playing){rn.getByteFrequencyData(on),rn.getByteTimeDomainData(la),t=Math.pow(ph(24,190),1.14),n=Math.pow(ph(190,2100),1.22),s=Math.pow(ph(2100,9200),1.08);let c=0;for(let l=0;l<la.length;l+=4){let h=(la[l]-128)/128;c+=h*h}r=Math.sqrt(c/(la.length/4))}else g.syntheticPhase+=i,t=.14+.065*(.5+.5*Math.sin(e*1.08)),n=.1+.052*(.5+.5*Math.sin(e*.43+1.2)),s=.05+.03*(.5+.5*Math.sin(e*1.91+2.5)),r=.08+t*.28;g.low=Yt(g.low,t,8,i),g.mid=Yt(g.mid,n,7.2,i),g.high=Yt(g.high,s,9,i),g.rms=Yt(g.rms,r,9,i);let a=gt(g.low*.48+g.mid*.34+g.high*.22+g.rms*.3,0,1),o=Math.max(0,a-g.previousEnergy)*8.6;if(g.transient=Yt(g.transient,o,o>g.transient?26:7,i),g.previousEnergy=a,g.energy=Yt(g.energy,a,7.8,i),I_(e),ee.low.value=g.low,ee.mid.value=g.mid,ee.high.value=g.high,ee.rms.value=g.rms,ee.energy.value=g.energy,ee.transient.value=g.transient,te.low.style.setProperty("--v",gt(g.low*1.75,0,1).toFixed(3)),te.mid.style.setProperty("--v",gt(g.mid*1.95,0,1).toFixed(3)),te.high.style.setProperty("--v",gt(g.high*2.8,0,1).toFixed(3)),rr&&an){let c=mt(.12,_h?.55:1.75,g.ceremonyTime),l=1-mt(.53,.98,g.shutdown),h=g.muted?0:.92*c*l;rr.gain.setTargetAtTime(h,an.currentTime,.07)}g.pulseCooldown=Math.max(0,g.pulseCooldown-i),g.calibrated&&!g.ending&&g.playing&&g.transient>.16&&g.pulseCooldown<=0&&(Vi(new me(0,0),.48+g.transient*.7,.32,!1),g.pulseCooldown=1.15+(1-g.low)*.7)}function sf(i){xi.x=i.clientX/innerWidth*2-1,xi.y=-(i.clientY/innerHeight)*2+1,te.cursor.style.transform=`translate3d(${i.clientX}px,${i.clientY}px,0)`}window.addEventListener("pointermove",i=>{if(sf(i),g.dragging&&!g.ending){let e=i.clientX-g.lastPointerX,t=i.clientY-g.lastPointerY;g.yawTarget-=e*.0042,g.pitchTarget=gt(g.pitchTarget+t*.0026,-.3,.5),g.dragDistance+=Math.hypot(e,t)}g.lastPointerX=i.clientX,g.lastPointerY=i.clientY});window.addEventListener("pointerdown",i=>{i.target.closest("button, label, input")||g.ending||(sf(i),g.dragging=!0,g.dragDistance=0,g.lastPointerX=i.clientX,g.lastPointerY=i.clientY,te.cursor.classList.add("active"))});window.addEventListener("pointerup",i=>{g.dragging&&(g.dragging=!1,te.cursor.classList.remove("active"),g.dragDistance<8&&D_(i))});window.addEventListener("pointercancel",()=>{g.dragging=!1,te.cursor.classList.remove("active")});window.addEventListener("wheel",i=>{g.ending||(g.diveTarget=gt(g.diveTarget+i.deltaY*55e-5,0,1))},{passive:!0});function D_(i){if(!g.calibrated||g.ending)return;if(xi.x=i.clientX/innerWidth*2-1,xi.y=-(i.clientY/innerHeight)*2+1,ha.setFromCamera(xi,Ln),ha.intersectObject(fa,!1)[0]){g.archiveOpenTarget=g.archiveOpenTarget>.5?0:1,te.mode.textContent=g.archiveOpenTarget?"DECODING":"OBSERVATION",te.coreState.textContent=g.archiveOpenTarget?"UNSEALED":"RESONANT",Vi(new me(0,0),1.35,.34,!0),Mn(g.archiveOpenTarget?"OPEN":"SEALED",850);return}let t=ha.intersectObject(da,!1)[0];t?(Vi(new me(t.point.x,t.point.z),1.05,-2.28,!0),Mn(["PRESSURE","CURTAIN","QUARTZ","PILLARS","FORECAST","COUNTERTIDE","CODEX","GAZE","NULL"][g.tideIndex],760)):Vi(new me(xi.x*5,-xi.y*5),.7,.1,!0)}function Vi(i=new me(0,0),e=1,t=.34,n=!1,s=null){g.pulseAge=0,g.pulseStrength=e,g.pulseOrigin.copy(i),g.pulseSourceY=t,g.pulseMode=s??g.tideIndex,g.pulseSerial++;let r=yh.set(i.x,t,i.y).project(Ln);g.pulseScreen.set(r.x*.5+.5,r.y*.5+.5),ee.pulseAge.value=0,ee.pulseStrength.value=e,ee.sonarMode.value=g.pulseMode,_i.position.set(i.x,t,i.y),_i.scale.setScalar(.001),_i.visible=g.pulseMode===0,n&&(g.pulseCooldown=.95)}window.addEventListener("keydown",async i=>{i.code==="Space"?(i.preventDefault(),g.ended?await us(!0,!0):g.entered?g.audioReady&&(te.audio.paused?await te.audio.play():te.audio.pause()):await us(!0)):i.key.toLowerCase()==="m"?(g.muted=!g.muted,te.audioState.textContent=g.muted?"MUTED":g.playing?"PLAYING":"PAUSED",Mn(g.muted?"AUDIO MUTED":"AUDIO RESTORED")):i.key.toLowerCase()==="f"?document.fullscreenElement?document.exitFullscreen?.():document.documentElement.requestFullscreen?.():i.key.toLowerCase()==="r"&&!g.ending&&(g.diveTarget=.12,g.yawTarget=0,g.pitchTarget=.07,Mn("VIEWPOINT RECALIBRATED"))});var mh=[{time:.58,text:"FIRST RETURN",strength:.52,y:-2.28,mode:0},{time:1.52,text:"NO FLOOR",strength:.62,y:-2.28,mode:1},{time:2.62,text:"DEPTH BELOW DEPTH",strength:.72,y:-2.28,mode:2},{time:4.1,text:"NINE ROOMS",strength:.86,y:.34,mode:3},{time:5.62,text:"FIRST LIGHT",strength:1.32,y:.34,mode:4},{time:7.45,text:"IT LOOKS BACK",strength:.92,y:.34,mode:7}];function N_(i){let e="",t="",n="";i<1.65?(n="I",e="\u542C\u3002",t="LISTEN."):i<3.55?(n="II",e="\u6D77\u5E8A\u6CA1\u6709\u56DE\u7B54\u3002",t="NO FLOOR ANSWERED."):i<5.75?(n="III",e="\u661F\u56FE\u6C89\u5728\u66F4\u6DF1\u5904\u3002",t="THE STARS LIE LOWER."):(n="IX",e="\u5B83\u5148\u770B\u89C1\u4E86\u6211\u4EEC\u3002",t="IT SAW US FIRST."),te.ritualIndex.textContent=n,te.ritualMain.textContent=e,te.ritualSub.textContent=t;let s=mt(.18,.62,i)*(1-mt(8,9.1,i));document.documentElement.style.setProperty("--ritual-caption",s.toFixed(3))}function U_(i){if(!g.entered||g.calibrated||g.previewMode==="main")return;g.audioReady&&Number.isFinite(te.audio.currentTime)?g.ceremonyTime=te.audio.currentTime:g.ceremonyTime+=i*(_h?2:1);let e=g.ceremonyTime;for(g.ritual=Hi(.4,7.7,e),g.ignite=Hi(4.15,8,e),g.lightLevel=gt(mt(.12,1.05,e)*.22+mt(2.25,7.85,e)*.78,0,1),ee.ritual.value=g.ritual,ee.ignite.value=g.ignite,N_(e);g.ceremonyCue<mh.length&&e>=mh[g.ceremonyCue].time;){let t=mh[g.ceremonyCue++];Vi(new me(0,0),t.strength,t.y,!1,t.mode),Mn(t.text,1300)}e>=(_h?4.2:8.65)&&(g.calibrated=!0,g.ritual=1,g.ignite=1,ee.ritual.value=1,ee.ignite.value=1,document.body.classList.add("calibrated"),te.coreState.textContent="RESONANT",te.fieldState.textContent="LIVE / 64 BANDS",te.mode.textContent="OBSERVATION",document.documentElement.style.setProperty("--ritual-caption","0"))}function rf(){g.ended||(g.shutdown=1,ee.shutdown.value=1,g.ending=!0,g.ended=!0,g.playing=!1,document.body.classList.add("ending"),setTimeout(()=>document.body.classList.add("ended"),700),te.audioState.textContent="CLOSED",te.coreState.textContent="EXTINGUISHED",te.fieldState.textContent="NO RETURN",document.documentElement.style.setProperty("--blackout","1"))}function F_(){if(!g.entered||g.previewMode==="main"||g.previewMode==="opening")return;let i=g.shutdown;if(g.previewMode==="ending")i=Math.max(i,.68);else if(g.audioReady&&Number.isFinite(te.audio.duration)&&te.audio.duration>20){let t=te.audio.duration-13.6,n=gt((te.audio.currentTime-t)/13.6,0,1);i=n<.58?n*.78:Dn(.4524,1,Hi(.58,1,n))}g.shutdown=Math.max(g.shutdown,i),ee.shutdown.value=g.shutdown,g.shutdown>.018&&!g.ending&&(g.ending=!0,document.body.classList.add("ending"),te.mode.textContent="WITHDRAWAL"),g.endingCue===0&&g.shutdown>.05&&(g.endingCue=1,Mn("OUTER SILENCE",1450)),g.endingCue===1&&g.shutdown>.41&&(g.endingCue=2,Vi(new me(0,0),.82,.34,!1,8),Mn("THE ECHO REVERSES",1550)),g.endingCue===2&&g.shutdown>.76&&(g.endingCue=3,Mn("LAST LIGHT",1450)),g.shutdown>=.995&&rf()}var gh={deep:new Ce,fog:new Ce,glow:new Ce,accent:new Ce,secondary:new Ce},Bd=-1;function O_(i,e){let t=Number.isFinite(te.audio.duration)?te.audio.duration:354.504,n;if(g.previewMode==="main"){let d=gt(g.previewSection,0,8);n=Dn(pi[d],pi[d+1],.46)}else g.previewMode==="ending"?n=346:n=g.audioReady&&t>0?te.audio.currentTime:i/118*t%t;n=gt(n,0,pi[pi.length-1]-.001);let s=pi.length-2;for(let d=0;d<pi.length-1;d++)if(n<pi[d+1]){s=d;break}s!==g.tideIndex&&g.pendingTide!==s&&(g.transitionFrom=g.tideIndex,g.pendingTide=s,g.transitionClock=0,g.transitionSwitched=!1);let r=1;g.pendingTide>=0&&(g.transitionClock+=e,r=gt(g.transitionClock/s_,0,1),!g.transitionSwitched&&r>=.49&&(g.transitionSwitched=!0,g.tideIndex=g.pendingTide,ee.section.value=g.tideIndex,g.calibrated&&!g.ending&&Vi(new me(0,0),.58,.34,!1,g.tideIndex)),r>=1&&(g.tideIndex=g.pendingTide,g.pendingTide=-1,g.transitionClock=99,g.transitionSwitched=!1,r=1)),g.phaseTransition=g.pendingTide>=0?Math.pow(Math.sin(r*Math.PI),1.18):0,ee.phaseTransition.value=g.phaseTransition,document.documentElement.style.setProperty("--phase-veil",(g.phaseTransition*.72).toFixed(3)),document.documentElement.style.setProperty("--phase-turn",g.phaseTransition.toFixed(3));let a=pi[g.tideIndex],o=pi[g.tideIndex+1];g.phaseLocal=gt((n-a)/Math.max(.01,o-a),0,1),g.tideFloat=g.tideIndex+g.phaseLocal,ee.section.value=g.tideIndex,ee.sectionLocal.value=g.phaseLocal,ee.tide.value=g.tideFloat;let c=g.pendingTide>=0?g.transitionFrom:g.tideIndex,l=g.pendingTide>=0?g.pendingTide:g.tideIndex,h=g.pendingTide>=0?Hi(.08,.92,r):0;for(let d of Object.keys(gh))gh[d].lerpColors(cs[c][d],cs[l][d],h),ee[`${d}Color`].value.copy(gh[d]);if(Nn.fog.color.copy(ee.fogColor.value),Nn.background.copy(ee.deepColor.value),Wl.color.copy(ee.glowColor.value),Xl.color.copy(ee.secondaryColor.value),sr.material.color.copy(ee.glowColor.value),ua.material.color.copy(ee.glowColor.value),Lh.color.copy(ee.accentColor.value),Rh.color.copy(ee.secondaryColor.value),Bl.color.copy(ee.glowColor.value),jn.material.color.copy(ee.glowColor.value),Vl.color.copy(ee.accentColor.value),Qn.material.color.copy(ee.accentColor.value),Ch.forEach(d=>d.material.color.copy(ee.glowColor.value)),g.tideIndex!==Bd){Bd=g.tideIndex;let d=i_[g.tideIndex];te.phaseNumber.textContent=d[0],te.phaseName.textContent=d[1],te.phaseSub.textContent=d[2],te.sideTicks.forEach((u,p)=>u.classList.toggle("active",p===g.tideIndex)),g.calibrated&&!g.ending&&g.activeSeconds>2&&Mn(`${d[0]} \xB7 ${d[1]}`,1150)}}function B_(i){g.dive=Yt(g.dive,g.diveTarget,4.1,i),g.yaw=Yt(g.yaw,g.yawTarget,5,i),g.pitch=Yt(g.pitch,g.pitchTarget,5,i),ir.lerp(xi,1-Math.exp(-i*4.5));let e=1-g.ritual,t=Dn(13,5.25,Math.pow(g.dive,1.08))+e*1.6+g.shutdown*2.7,n=g.yaw+ir.x*(g.dragging?.015:.095)+e*.05,s=g.pitch+ir.y*(g.dragging?.01:.05)-g.shutdown*.035,r=.17+g.dive*.22,a=Math.cos(s)*t,o=new L(Math.sin(n)*a,r+Math.sin(s)*t*.67,Math.cos(n)*a);Ln.position.lerp(o,1-Math.exp(-i*4.2)),Ln.lookAt(0,r,0),Ln.rotation.z=Yt(Ln.rotation.z,-ir.x*.007-g.transient*.003,4,i);let c=Math.round(3860+g.dive*740);te.depth.textContent=`\u2212${String(c).padStart(6,"0")} M`,te.coord.textContent=`${(n*12.7).toFixed(3)} / ${(s*17.4).toFixed(3)}`}function z_(){let i=Gl.attributes.position.array,e=g.tideIndex,t=g.phaseLocal;for(let n=0;n<ln;n++){let s=n/ln,r=s*Math.PI*2,a=zi[n]/255,o=n*6,c,l,h,d,u,p;if(e===0){let v=1.34+a*.74;c=Math.cos(r)*1.18,l=Math.sin(r*3+ee.time.value*.18)*.13,h=Math.sin(r)*1.18,d=Math.cos(r)*v,u=l+(a-.2)*.13,p=Math.sin(r)*v}else if(e===1){let x=Math.pow(Math.abs(Math.cos(r*4.5)),8),v=.78+x*.32,m=v+.28+a*(.65+x*.65);c=Math.cos(r)*v,l=(s-.5)*1.15,h=Math.sin(r)*v,d=Math.cos(r)*m,u=l+Math.sin(r*9)*a*.18,p=Math.sin(r)*m}else if(e===2){let x=Math.round(s*12)/12*Math.PI*2,v=.72,m=1.15+a*.88;c=Math.cos(x)*v,l=Math.sin(r*5)*.42,h=Math.sin(x)*v,d=Math.cos(x)*m,u=l+(a-.25)*.34,p=Math.sin(x)*m}else if(e===3){let x=(s-.5)*2.4;c=x,l=-.82,h=Math.sin(r*3)*.13,d=x,u=-.2+a*2.25,p=h+Math.cos(r*2)*.09}else if(e===4){let v=.74*(.45+Math.pow(Math.abs(Math.sin(r*4.5)),3)*.74),m=v+.34+a*.83;c=Math.cos(r)*v,l=Math.sin(r*2)*.2,h=Math.sin(r)*v,d=Math.cos(r)*m,u=l+Math.sin(r*9)*a*.32,p=Math.sin(r)*m}else if(e===5){let x=(s-.5)*2.7,v=r*2+x*2.8+ee.time.value*.35,m=.72,f=m+.24+a*.48;c=Math.cos(v)*m,l=x,h=Math.sin(v)*m,d=Math.cos(v)*f,u=x+(a-.4)*.13,p=Math.sin(v)*f}else if(e===6){let x=Math.floor(s*9),v=ei(s*9);l=(x/8-.5)*2.2,u=l,c=-1.2+v*2.4,d=c+.18+a*1.15,h=(x-4)*.018,p=h+Math.sin(r*4+ee.time.value)*.035}else if(e===7){let v=.92+a*.72;c=Math.cos(r)*.7*1.45,l=Math.sin(r)*.7*.58,h=0,d=Math.cos(r)*v*1.45,u=Math.sin(r)*v*.58,p=Math.sin(r*3)*a*.14}else{let x=.46-t*.1,v=x+.08+a*.22;c=Math.cos(r)*x,l=Math.sin(r*2)*.04,h=Math.sin(r)*x,d=Math.cos(r)*v,u=l,p=Math.sin(r)*v}i[o]=c,i[o+1]=l,i[o+2]=h,i[o+3]=d,i[o+4]=u,i[o+5]=p}Gl.attributes.position.needsUpdate=!0}function V_(i,e){g.archiveOpen=Yt(g.archiveOpen,g.archiveOpenTarget,4,i),ee.open.value=g.archiveOpen;let t=g.tideIndex,n=g.phaseTransition,r=[.55,.92,.42,.2,.68,1.15,.34,.48,.12][t];cn.rotation.y+=i*(.02+r*.055+g.mid*.055)*(1-g.shutdown*.7),cn.rotation.x=Math.sin(e*(.07+r*.05))*(t===5?.075:.035)+ir.y*.025,cn.rotation.z=Math.sin(e*.061)*.02-ir.x*.018+(t===6?Math.sin(e*.17)*.035:0);let o=[g.low,g.high,g.mid,g.low,g.mid,g.mid,g.high,g.transient,g.low][t],c=1+o*.09+g.transient*.025+n*.08,h=[[1,1,1],[1.05,1.28,1.05],[1.08,1.08,1.08],[.56,1.72,.56],[1.18,.92,1.18],[.82,1.38,.82],[1.42,1.2,.28],[1.46,.62,.34],[.48,.48,.48]][t];yh.set(h[0]*c,h[1]*c,h[2]*c),fa.scale.lerp(yh,1-Math.exp(-i*(4+n*8)));let d=1-mt(.76,.98,g.shutdown)*.78,u=t===6?.85:t===7?.9:t===8?.46:1;sr.scale.set(h[0]*u,h[1]*u,h[2]*u).multiplyScalar((1+g.archiveOpen*.2+g.high*.025+n*.32)*d),sr.rotation.x+=i*(.05+r*.11+g.high*.08),sr.rotation.y-=i*(.04+r*.09+g.mid*.07),sr.material.opacity=(.08+g.high*.24+g.archiveOpen*.08+n*.22)*g.ignite*(1-mt(.73,.98,g.shutdown));let p=[1,1.24,.86,.94,1.34,1.02,.78,1.22,.54][t];ua.material.opacity=(.1+o*.38+g.transient*.28+n*.4)*g.ignite*(1-mt(.72,.96,g.shutdown)),ua.scale.setScalar((4+p*.8+o*1.2+g.archiveOpen*.7+n*2)*(1-mt(.68,.98,g.shutdown)*.86)),Wl.intensity=(5+o*29+g.archiveOpen*9+g.transient*16+n*26)*g.ignite*(1-mt(.72,.99,g.shutdown)),kl.rotation.y+=i*([.03,.075,.015,.01,.04,-.09,.008,.018,.004][t]+g.mid*.025),kl.rotation.z=t===5?Math.sin(e*.18)*.12:t===6?.04:Math.sin(e*.055)*.025;for(let x of Kd){let v=x.userData.index,m=v%2?-1:1,f=[.75,1.6,.35,.25,.95,2,.18,.48,.08][t];x.rotation.x+=i*x.userData.speed*f*(1+g.mid*1.15),x.rotation.y-=i*x.userData.speed*.7*f*(1+g.high),t===3&&(x.rotation.z=Yt(x.rotation.z,v%2?Math.PI/2:0,2.2,i)),t===6&&(x.rotation.x=Yt(x.rotation.x,Math.PI/2,1.8,i)),t===7&&(x.rotation.x=Yt(x.rotation.x,Math.PI/2,2.4,i));let M=mt(v/9*.55,v/9*.55+.25,g.ignite),E=mt(.5+(8-v)/9*.34,.82+(8-v)/9*.16,g.shutdown),b=1+g.archiveOpen*(.05+v*.017)+o*.012;t===1&&(b*=.86+v%3*.14),t===4&&(b*=.88+Math.sin(v/9*Math.PI)*.32),t===8&&(b*=.48+(1-g.phaseLocal)*.32);let C=t===7?.46:t===6?.72:1;x.scale.set(b,b*C,b).multiplyScalar(1-E*.92),x.material.opacity=((v%3===0?.2:.065)+g.high*(v%3===0?.3:.14)+g.archiveOpen*.05+n*.16)*M*(1-E),x.material.color.copy(v===8?ee.accentColor.value:ee.glowColor.value)}for(let x=0;x<Eh.length;x++){let v=Eh[x],m=v.userData.angle+e*(t===5?-.06:.018),f=mt(x/9*.55,x/9*.55+.25,g.ignite),M=t===4?.95+g.mid*.65:t===7?-.32+g.high*.2:t===8?-.65:0,E=.92+g.archiveOpen*(.9+x*.022)+M*.48+n*.45;v.position.x=Math.cos(m)*E,v.position.z=Math.sin(m)*E,v.position.y=Math.sin(m*2+e*.25)*(.06+g.archiveOpen*.17)+(t===3?(x-4)*.13:0),v.rotation.y=-m+g.archiveOpen*Math.PI*.34+M*.38,v.rotation.z=Math.cos(m)*.2+g.archiveOpen*(x%2?-.58:.58)+(t===6?Math.PI*.42:0),v.material.emissive.copy(x===8?ee.accentColor.value:ee.secondaryColor.value),v.material.emissiveIntensity=(.05+g.mid*.5+g.archiveOpen*.28+n*.5)*f,v.material.opacity=(t===8?.16:.34)*f*(1-mt(.64,.94,g.shutdown))}Th.rotation.y-=i*(.008+g.mid*.028)*(t===5?-2.2:1),Th.rotation.z=Math.sin(e*.075)*(t===6?.02:.05),Qd.rotation.y+=i*(t===5?-.055:t===3?.008:.018),Lh.opacity=(.08+g.high*.3+g.archiveOpen*.09+n*.24)*g.ignite*(1-mt(.65,.94,g.shutdown)),z_()}function H_(i,e){let t=mt(.18,.78,g.ritual);Rh.opacity=.04*t*(1-g.shutdown);for(let n of qd){let{root:s,ring:r,crossRing:a,aperture:o,index:c}=n,l=gt(Math.floor(s.userData.band*(ln-1)),0,ln-1),h=zi[l]/255,d=s.userData.angle,u=Math.hypot(s.position.x-g.pulseOrigin.x,s.position.z-g.pulseOrigin.y),p=g.pulseAge*(4.15+g.low*1.7);g.pulseMode===1?p=g.pulseAge*(2.2+g.high*.8):g.pulseMode===3?p=g.pulseAge*2.5:g.pulseMode===7?p=Dn(18,.15,Hi(0,4.05,g.pulseAge)):g.pulseMode===8&&(p=Dn(10.5,.15,Hi(0,4.3,g.pulseAge)));let x=g.pulseMode===6?.55:g.pulseMode>=7?.82:1.35,v=Math.exp(-Math.abs(u-p)*x)*g.pulseStrength,m=mt(c/9*.55,c/9*.55+.28,g.ritual),f=.18+(1-c/8)*.46,M=1-mt(f,f+.19,g.shutdown),E=[.8,1.45,.52,.32,.92,1.75,.38,.62,.18][g.tideIndex],b=g.tideIndex===5?-1:1;s.rotation.z=Math.sin(e*(.15+c*.006)*E+s.userData.seed)*(.045+h*.17+v*.19),s.rotation.x=Math.cos(e*.12*b+d)*(.018+h*.08+(g.tideIndex===3?g.low*.1:0)),r.rotation.z+=i*(.12+h*.5)*(c%2?-1:1),a.rotation.x+=i*(.08+g.mid*.25),r.material.color.copy(ee.glowColor.value),a.material.color.copy(c===8?ee.accentColor.value:ee.secondaryColor.value),r.material.opacity=(.08+h*.48+v*.58)*m*M,a.material.opacity=(.04+g.high*.16+v*.34)*m*M,o.material.color.copy(c===8?ee.accentColor.value:ee.glowColor.value),o.material.opacity=(.13+h*.62+v*.72)*m*M,o.scale.setScalar(.55+h*.55+v*.7)}}function k_(i){g.pulseAge+=i,ee.pulseAge.value=g.pulseAge,g.pulseStrength=Yt(g.pulseStrength,0,.34,i),ee.pulseStrength.value=g.pulseStrength,_i.visible=!1,hs.visible=!1,zl.visible=!1,jn.visible=!1,Bi.visible=!1,Hl.visible=!1,gi.visible=!1,mi.visible=!1,Qn.visible=!1,Bl.opacity=0,jn.material.opacity=0,Vl.opacity=0;for(let l of gi.children)l.material.opacity=0;if(g.shutdown>.5){let l=mt(.5,.92,g.shutdown);mi.visible=!0,mi.position.set(0,.34,0),mi.scale.setScalar(Dn(22,.035,l)),ee.pulseStrength.value=Math.max(ee.pulseStrength.value,(1-l)*1.08);return}let e=g.pulseMode,n=[5.35,4.1,4.35,4,4.9,4.5,4.2,4.05,4.3][e]||4.5;if(g.pulseAge>=n||g.pulseStrength<=.008)return;let s=gt(g.pulseAge/n,0,1),r=Math.pow(1-s,.62)*g.pulseStrength,a=g.pulseOrigin.x,o=g.pulseSourceY,c=g.pulseOrigin.y;if(e===0){let l=Math.max(.01,g.pulseAge*(4.15+g.low*1.7));_i.visible=!0,_i.position.set(a,o,c),_i.scale.setScalar(l)}else if(e===1){hs.visible=!0,hs.position.set(a,-.2+o*.2,c),hs.rotation.y=ee.time.value*.11;let l=.2+g.pulseAge*(2.2+g.high*.8);hs.scale.set(l,5.2+g.pulseAge*1.3,l)}else if(e===2){zl.visible=!0;let l=Math.max(.05,g.pulseAge*2);for(let h=0;h<Mh;h++){let d=h/Mh,u=d*Math.PI*2,p=zi[Math.floor(d*(ln-1))]/255,x=Math.round(d*18)/18*Math.PI*2,v=l+.34+p*2.2+Math.pow(Math.abs(Math.cos(u*4.5)),8)*.95,m=h*6;os[m]=a+Math.cos(x)*l,os[m+1]=o+Math.sin(u*5+ee.time.value)*.16,os[m+2]=c+Math.sin(x)*l,os[m+3]=a+Math.cos(x)*v,os[m+4]=o+(p-.25)*1.1,os[m+5]=c+Math.sin(x)*v}Ph.attributes.position.needsUpdate=!0,Bl.opacity=r*(.28+g.high*.45)}else if(e===3){jn.visible=!0;let l=.35+g.pulseAge*2.5;for(let h=0;h<Sh;h++){let d=h/Sh,u=d*Math.PI*2,p=zi[Math.floor(d*(ln-1))]/255,x=.18+p*(2.4+g.low*2.1)+Math.pow(Math.sin(s*Math.PI),2)*.55;oa.position.set(a+Math.cos(u)*l,o-1.7+x*.5,c+Math.sin(u)*l),oa.scale.set(.7+p*.45,x,.7+p*.45),oa.rotation.y=-u,oa.updateMatrix(),jn.setMatrixAt(h,oa.matrix)}jn.instanceMatrix.needsUpdate=!0,jn.material.opacity=r*(.22+g.mid*.38)}else if(e===4)Bi.visible=!0,Bi.position.set(a,o,c),Bi.rotation.y=ee.time.value*.18,Bi.rotation.x=Math.sin(ee.time.value*.11)*.22,Bi.scale.setScalar(.45+g.pulseAge*1.02);else if(e===5){Hl.visible=!0;for(let l=0;l<bh;l++){let h=l/(bh-1),d=l%2,u=(h-.5)*(4.2+g.pulseAge*.7),p=h*Math.PI*8+ee.time.value*(d?-1.1:.9)+d*Math.PI,x=zi[Math.floor(h*(ln-1))]/255,v=.6+g.pulseAge*.62+x*.38,m=p+.13,f=l*6;ls[f]=a+Math.cos(p)*v,ls[f+1]=o+u,ls[f+2]=c+Math.sin(p)*v,ls[f+3]=a+Math.cos(m)*v,ls[f+4]=o+u+.045,ls[f+5]=c+Math.sin(m)*v}Ih.attributes.position.needsUpdate=!0,Vl.opacity=r*(.25+g.mid*.52)}else if(e===6){gi.visible=!0,gi.position.set(a,o,c),gi.rotation.y=ee.time.value*.07;for(let l of gi.children){let h=l.userData.index,d=mt(h/12,h/12+.32,s)*(1-mt(.62+h/30,1,s)),u=(h-4)*(.18+g.pulseAge*.12);l.position.set(Math.sin(h*1.7)*g.pulseAge*.08,(h-4)*.12,u),l.rotation.z=(h-4)*.035+Math.sin(ee.time.value*.4+h)*.02,l.scale.setScalar(.62+g.pulseAge*.52+h*.025),l.material.opacity=d*r*(.25+g.high*.42)}}else if(e===7){mi.visible=!0,mi.position.set(a,o,c);let l=Dn(18+g.high*3,.18,Hi(0,1,s));mi.scale.set(l*1.15,l*.58,l)}else{Qn.visible=!0,Qn.position.set(a,o,c),Qn.rotation.x=Math.PI/2+Math.sin(ee.time.value*.17)*.18,Qn.rotation.y=ee.time.value*-.12;let l=Dn(10.5,.15,Hi(0,1,s));Qn.scale.set(l*1.25,l*.72,l),Qn.material.opacity=r*(.22+g.high*.35)}}function G_(i,e){jd.rotation.y+=i*.0018,Dh.rotation.y-=i*.0032,ef.rotation.y+=i*7e-4;let t=[.0185,.0205,.019,.024,.018,.021,.023,.026,.03];Nn.fog.density=Yt(Nn.fog.density,t[g.tideIndex]+g.dive*.0035+g.phaseTransition*.0025,1.8,i);for(let c=0;c<wh.length;c++){let l=wh[c];l.rotation.z+=i*(.0014+c*24e-5)*(c%2?-1:1),l.rotation.y+=i*8e-4,l.material.color.copy(c%3===0?ee.glowColor.value:ee.secondaryColor.value);let h=g.pulseAge<4.5?g.pulseStrength*Math.exp(-Math.abs(c-g.pulseAge*1.15)*.72):0;l.material.opacity=(.005+g.high*.007+h*.055+g.phaseTransition*.025)*g.ritual*(1-g.shutdown)}Ol.emissive.copy(ee.secondaryColor.value),Ol.emissiveIntensity=(.035+g.low*.22)*g.ritual*(1-g.shutdown),Ol.opacity=.34+g.ritual*.28,Ch.forEach((c,l)=>{c.rotation.z+=i*(.004+l*.002)*(l%2?-1:1),c.material.opacity=(.018+g.high*.06+(g.pulseAge<3?g.pulseStrength*.075:0))*g.ritual*(1-g.shutdown)}),Xl.intensity=.55*g.ritual*(1-g.shutdown)+g.high*1.6+g.phaseTransition*1.8,tf.intensity=.035+g.ritual*.115;let n=[.52,.64,.58,.49,.68,.6,.5,.72,.38];Ah.strength=((xt?.42:n[g.tideIndex])+g.energy*.54+g.archiveOpen*.05+g.phaseTransition*.65)*(.22+g.lightLevel*.78)*(1-mt(.78,1,g.shutdown)*.72),Ah.radius=.64+g.high*.1+g.phaseTransition*.15+g.shutdown*.08;let s=g.tideIndex===5?.905:g.tideIndex===7?.925:g.tideIndex===8?.94:.86;nf.uniforms.damp.value=g.shutdown>.45?Dn(.9,.982,mt(.45,.9,g.shutdown)):s+g.high*.018+g.phaseTransition*.035;let r=[.86,.8,.76,.68,.88,.8,.7,.74,.54];Zt.toneMappingExposure=(.025+g.lightLevel*(r[g.tideIndex]+g.energy*.1+g.phaseTransition*.12))*(1-mt(.76,1,g.shutdown)*.96);let a=mt(.72,1,g.shutdown),o=Math.max(1-g.lightLevel,a);document.documentElement.style.setProperty("--blackout",o.toFixed(4))}function W_(){if(Vd||g.dragging||!g.calibrated||g.ending)return;ha.setFromCamera(xi,Ln);let i=ha.intersectObject(fa,!1).length>0;i!==g.coreHovered&&(g.coreHovered=i,te.cursor.classList.toggle("active",i))}function X_(){let i=Number.isFinite(te.audio.duration)?te.audio.duration:354.504,e=g.audioReady?te.audio.currentTime:g.activeSeconds%i;te.timeNow.textContent=vh(e),te.timeTotal.textContent=vh(i);let t=i>0?gt(e/i,0,1):0;document.documentElement.style.setProperty("--progress",`${(t*100).toFixed(3)}%`),te.index.textContent=`09\u2013${String(Math.floor(t*9999)).padStart(4,"0")}`}function Nh(i){ca.update(i);let e=gt(ca.getDelta(),0,.05),t=ca.getElapsed();g.activeSeconds+=e,ee.time.value=t,g.previewMode==="main"?(g.ritual=1,g.ignite=1,g.lightLevel=1,ee.ritual.value=1,ee.ignite.value=1):g.previewMode==="ending"&&(g.ritual=1,g.ignite=1,g.lightLevel=1,g.shutdown=Math.max(g.shutdown,.68),ee.ritual.value=1,ee.ignite.value=1,ee.shutdown.value=g.shutdown),L_(e,t),U_(e),F_(),O_(t,e),B_(e),V_(e,t),H_(e,t),k_(e),G_(e,t),W_(),X_(),fs.render(e),requestAnimationFrame(Nh)}requestAnimationFrame(Nh);function q_(){let i=innerWidth,e=innerHeight;Ln.aspect=i/e,Ln.updateProjectionMatrix();let t=Math.min(devicePixelRatio,xt?1.15:1.6);Zt.setPixelRatio(t),Zt.setSize(i,e),fs.setSize(i,e),ee.pixelRatio.value=t,ee.resolution.value.set(i*t,e*t)}window.addEventListener("resize",q_);var xh=new URLSearchParams(location.search),zd=window.__NINTH_TIDE_PREVIEW__;if(xh.has("preview")||zd){let i=zd||xh.get("preview")||"main",e=Number(window.__NINTH_TIDE_PREVIEW_SECTION__??xh.get("section"));g.previewSection=Number.isFinite(e)?gt(Math.round(e),0,8):i==="ending"?8:i==="opening"?0:4,g.tideIndex=g.previewSection,g.transitionFrom=g.previewSection,ee.section.value=g.previewSection,g.previewMode=i,g.entered=!0,g.calibrated=i!=="opening",g.ceremonyTime=i==="opening"?5.75:99,g.ritual=i==="opening"?.73:1,g.ignite=i==="opening"?.44:1,g.lightLevel=i==="opening"?.72:1,g.archiveOpenTarget=i==="main"?.76:.45,g.diveTarget=i==="main"?.28:.2,ee.ritual.value=g.ritual,ee.ignite.value=g.ignite,document.body.classList.add("entered"),g.calibrated&&document.body.classList.add("calibrated"),i==="ending"&&document.body.classList.add("ending"),document.documentElement.style.setProperty("--blackout",i==="opening"?"0.28":"0"),Vi(new me(0,0),i==="ending"?.45:1.15,.34,!1),window.__NINTH_TIDE_STEP__=Nh}window.addEventListener("beforeunload",()=>{ti&&URL.revokeObjectURL(ti),ca.dispose(),Zt.dispose()});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
