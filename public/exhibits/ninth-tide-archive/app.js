(()=>{var Xl="184";var ff=0,ih=1,pf=2;var Ba=1,mf=2,Os=3,Bi=0,Zt=1,yn=2,Sn=0,Dr=1,ot=2,rh=3,sh=4,gf=5;var rr=100,xf=101,vf=102,_f=103,yf=104,Sf=200,Mf=201,bf=202,wf=203,al=204,ol=205,Ef=206,Tf=207,Af=208,Cf=209,Rf=210,Pf=211,If=212,Df=213,Lf=214,ll=0,cl=1,ul=2,Lr=3,hl=4,dl=5,fl=6,pl=7,ah=0,Nf=1,Ff=2,Qn=0,za=1,Ha=2,ka=3,kr=4,Va=5,Ga=6,Wa=7;var oh=300,lr=301,Vr=302,ql=303,Yl=304,Xa=306,ml=1e3,Dn=1001,gl=1002,Ft=1003,Uf=1004;var qa=1005;var Ot=1006,$l=1007;var cr=1008;var sn=1009,lh=1010,ch=1011,Bs=1012,Zl=1013,ei=1014,Hn=1015,Tt=1016,jl=1017,Jl=1018,zs=1020,uh=35902,hh=35899,dh=1021,fh=1022,kn=1023,di=1026,ur=1027,Hs=1028,Kl=1029,hr=1030,Ql=1031;var ec=1033,Ya=33776,$a=33777,Za=33778,ja=33779,tc=35840,nc=35841,ic=35842,rc=35843,sc=36196,ac=37492,oc=37496,lc=37488,cc=37489,Ja=37490,uc=37491,hc=37808,dc=37809,fc=37810,pc=37811,mc=37812,gc=37813,xc=37814,vc=37815,_c=37816,yc=37817,Sc=37818,Mc=37819,bc=37820,wc=37821,Ec=36492,Tc=36494,Ac=36495,Cc=36283,Rc=36284,Ka=36285,Pc=36286;var ma=2300,xl=2301,sl=2302,qu=2303,Yu=2400,$u=2401,Zu=2402;var Of=3200;var Ic=0,Bf=1,Vi="",nn="srgb",ga="srgb-linear",xa="linear",et="srgb";var Ir=7680;var ju=519,zf=512,Hf=513,kf=514,Dc=515,Vf=516,Gf=517,Lc=518,Wf=519,vl=35044,dr=35048;var ph="300 es",jn=2e3,Ts=2001;function E0(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function T0(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function va(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Xf(){let n=va("canvas");return n.style.display="block",n}var Ld={},As=null;function _a(...n){let e="THREE."+n.shift();As?As("log",e,...n):console.log(e,...n)}function qf(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ie(...n){n=qf(n);let e="THREE."+n.shift();if(As)As("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function De(...n){n=qf(n);let e="THREE."+n.shift();if(As)As("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function _l(...n){let e=n.join(" ");e in Ld||(Ld[e]=!0,Ie(...n))}function Yf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var $f={[ll]:cl,[ul]:fl,[hl]:pl,[Lr]:dl,[cl]:ll,[fl]:ul,[pl]:hl,[dl]:Lr},fi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Nd=1234567,ws=Math.PI/180,Cs=180/Math.PI;function Ui(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function mh(n,e){return(n%e+e)%e}function A0(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function C0(n,e,t){return n!==e?(t-n)/(e-n):0}function pa(n,e,t){return(1-t)*n+t*e}function R0(n,e,t,i){return pa(n,e,1-Math.exp(-t*i))}function P0(n,e=1){return e-Math.abs(mh(n,e*2)-e)}function I0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function D0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function L0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function N0(n,e){return n+Math.random()*(e-n)}function F0(n){return n*(.5-Math.random())}function U0(n){n!==void 0&&(Nd=n);let e=Nd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function O0(n){return n*ws}function B0(n){return n*Cs}function z0(n){return(n&n-1)===0&&n!==0}function H0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function k0(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function V0(n,e,t,i,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),h=a((e+i)/2),d=s((e-i)/2),u=a((e-i)/2),f=s((i-e)/2),x=a((i-e)/2);switch(r){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*x,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*x,o*c);break;case"ZYZ":n.set(l*x,l*f,o*h,o*c);break;default:Ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Nc={DEG2RAD:ws,RAD2DEG:Cs,generateUUID:Ui,clamp:Qe,euclideanModulo:mh,mapLinear:A0,inverseLerp:C0,lerp:pa,damp:R0,pingpong:P0,smoothstep:I0,smootherstep:D0,randInt:L0,randFloat:N0,randFloatSpread:F0,seededRandom:U0,degToRad:O0,radToDeg:B0,isPowerOfTwo:z0,ceilPowerOfTwo:H0,floorPowerOfTwo:k0,setQuaternionFromProperEuler:V0,normalize:lt,denormalize:Zn},yh=class yh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};yh.prototype.isVector2=!0;var he=yh,rn=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3],u=s[a+0],f=s[a+1],x=s[a+2],v=s[a+3];if(d!==v||l!==u||c!==f||h!==x){let p=l*u+c*f+h*x+d*v;p<0&&(u=-u,f=-f,x=-x,v=-v,p=-p);let m=1-o;if(p<.9995){let S=Math.acos(p),w=Math.sin(S);m=Math.sin(m*S)/w,o=Math.sin(o*S)/w,l=l*m+u*o,c=c*m+f*o,h=h*m+x*o,d=d*m+v*o}else{l=l*m+u*o,c=c*m+f*o,h=h*m+x*o,d=d*m+v*o;let S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[a],u=s[a+1],f=s[a+2],x=s[a+3];return e[t]=o*x+h*d+l*f-c*u,e[t+1]=l*x+h*u+c*d-o*f,e[t+2]=c*x+h*f+o*u-l*d,e[t+3]=h*x-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),d=o(s/2),u=l(i/2),f=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*x,this._y=c*f*d-u*h*x,this._z=c*h*x+u*f*d,this._w=c*h*d-u*f*x;break;case"YXZ":this._x=u*h*d+c*f*x,this._y=c*f*d-u*h*x,this._z=c*h*x-u*f*d,this._w=c*h*d+u*f*x;break;case"ZXY":this._x=u*h*d-c*f*x,this._y=c*f*d+u*h*x,this._z=c*h*x+u*f*d,this._w=c*h*d-u*f*x;break;case"ZYX":this._x=u*h*d-c*f*x,this._y=c*f*d+u*h*x,this._z=c*h*x-u*f*d,this._w=c*h*d+u*f*x;break;case"YZX":this._x=u*h*d+c*f*x,this._y=c*f*d+u*h*x,this._z=c*h*x-u*f*d,this._w=c*h*d-u*f*x;break;case"XZY":this._x=u*h*d-c*f*x,this._y=c*f*d-u*h*x,this._z=c*h*x+u*f*d,this._w=c*h*d+u*f*x;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Sh=class Sh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Su.copy(this).projectOnVector(e),this.sub(Su)}reflect(e){return this.sub(Su.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Sh.prototype.isVector3=!0;var D=Sh,Su=new D,Fd=new rn,Mh=class Mh{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],x=i[8],v=r[0],p=r[3],m=r[6],S=r[1],w=r[4],b=r[7],C=r[2],E=r[5],P=r[8];return s[0]=a*v+o*S+l*C,s[3]=a*p+o*w+l*E,s[6]=a*m+o*b+l*P,s[1]=c*v+h*S+d*C,s[4]=c*p+h*w+d*E,s[7]=c*m+h*b+d*P,s[2]=u*v+f*S+x*C,s[5]=u*p+f*w+x*E,s[8]=u*m+f*b+x*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,x=t*d+i*u+r*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return e[0]=d*v,e[1]=(r*c-h*i)*v,e[2]=(o*i-r*a)*v,e[3]=u*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Mu.makeScale(e,t)),this}rotate(e){return this.premultiply(Mu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Mu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Mh.prototype.isMatrix3=!0;var Be=Mh,Mu=new Be,Ud=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Od=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function G0(){let n={enabled:!0,workingColorSpace:ga,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===et&&(r.r=Oi(r.r),r.g=Oi(r.g),r.b=Oi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(r.r=Es(r.r),r.g=Es(r.g),r.b=Es(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Vi?xa:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return _l("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return _l("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ga]:{primaries:e,whitePoint:i,transfer:xa,toXYZ:Ud,fromXYZ:Od,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:i,transfer:et,toXYZ:Ud,fromXYZ:Od,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),n}var qe=G0();function Oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Es(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var os,yl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{os===void 0&&(os=va("canvas")),os.width=e.width,os.height=e.height;let r=os.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=os}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=va("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Oi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Oi(t[i]/255)*255):t[i]=Oi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},W0=0,Rs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=Ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(bu(r[a].image)):s.push(bu(r[a]))}else s=bu(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function bu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?yl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}var X0=0,wu=new D,hn=class n extends fi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Dn,r=Dn,s=Ot,a=cr,o=kn,l=sn,c=n.DEFAULT_ANISOTROPY,h=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=Ui(),this.name="",this.source=new Rs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wu).x}get height(){return this.source.getSize(wu).y}get depth(){return this.source.getSize(wu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ie(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==oh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ml:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case gl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ml:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case gl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=oh;hn.DEFAULT_ANISOTROPY=1;var bh=class bh{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],x=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(x-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(x+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,b=(f+1)/2,C=(m+1)/2,E=(h+u)/4,P=(d+v)/4,y=(x+p)/4;return w>b&&w>C?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=E/i,s=P/i):b>C?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=E/r,s=y/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=P/s,r=y/s),this.set(i,r,s,t),this}let S=Math.sqrt((p-x)*(p-x)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(p-x)/S,this.y=(d-v)/S,this.z=(u-h)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bh.prototype.isVector4=!0;var ut=bh,Sl=class extends fi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new hn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Rs(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},vt=class extends Sl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ya=class extends hn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ml=class extends hn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wl=class Wl{constructor(e,t,i,r,s,a,o,l,c,h,d,u,f,x,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,h,d,u,f,x,v,p)}set(e,t,i,r,s,a,o,l,c,h,d,u,f,x,v,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=x,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wl().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/ls.setFromMatrixColumn(e,0).length(),s=1/ls.setFromMatrixColumn(e,1).length(),a=1/ls.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let u=a*h,f=a*d,x=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+x*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=x+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,x=c*h,v=c*d;t[0]=u+v*o,t[4]=x*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-x,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,x=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=x+f*o,t[1]=f+x*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,x=o*h,v=o*d;t[0]=l*h,t[4]=x*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,x=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=x*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+x,t[10]=u-v*d}else if(e.order==="XZY"){let u=a*l,f=a*c,x=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-x,t[2]=x*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(q0,e,Y0)}lookAt(e,t,i){let r=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Ki.crossVectors(i,Pn),Ki.lengthSq()===0&&(Math.abs(i.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Ki.crossVectors(i,Pn)),Ki.normalize(),Co.crossVectors(Pn,Ki),r[0]=Ki.x,r[4]=Co.x,r[8]=Pn.x,r[1]=Ki.y,r[5]=Co.y,r[9]=Pn.y,r[2]=Ki.z,r[6]=Co.z,r[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],x=i[2],v=i[6],p=i[10],m=i[14],S=i[3],w=i[7],b=i[11],C=i[15],E=r[0],P=r[4],y=r[8],A=r[12],I=r[1],R=r[5],F=r[9],W=r[13],X=r[2],O=r[6],H=r[10],V=r[14],K=r[3],ne=r[7],ue=r[11],Me=r[15];return s[0]=a*E+o*I+l*X+c*K,s[4]=a*P+o*R+l*O+c*ne,s[8]=a*y+o*F+l*H+c*ue,s[12]=a*A+o*W+l*V+c*Me,s[1]=h*E+d*I+u*X+f*K,s[5]=h*P+d*R+u*O+f*ne,s[9]=h*y+d*F+u*H+f*ue,s[13]=h*A+d*W+u*V+f*Me,s[2]=x*E+v*I+p*X+m*K,s[6]=x*P+v*R+p*O+m*ne,s[10]=x*y+v*F+p*H+m*ue,s[14]=x*A+v*W+p*V+m*Me,s[3]=S*E+w*I+b*X+C*K,s[7]=S*P+w*R+b*O+C*ne,s[11]=S*y+w*F+b*H+C*ue,s[15]=S*A+w*W+b*V+C*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],x=e[3],v=e[7],p=e[11],m=e[15],S=l*f-c*u,w=o*f-c*d,b=o*u-l*d,C=a*f-c*h,E=a*u-l*h,P=a*d-o*h;return t*(v*S-p*w+m*b)-i*(x*S-p*C+m*E)+r*(x*w-v*C+m*P)-s*(x*b-v*E+p*P)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],x=e[12],v=e[13],p=e[14],m=e[15],S=t*o-i*a,w=t*l-r*a,b=t*c-s*a,C=i*l-r*o,E=i*c-s*o,P=r*c-s*l,y=h*v-d*x,A=h*p-u*x,I=h*m-f*x,R=d*p-u*v,F=d*m-f*v,W=u*m-f*p,X=S*W-w*F+b*R+C*I-E*A+P*y;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/X;return e[0]=(o*W-l*F+c*R)*O,e[1]=(r*F-i*W-s*R)*O,e[2]=(v*P-p*E+m*C)*O,e[3]=(u*E-d*P-f*C)*O,e[4]=(l*I-a*W-c*A)*O,e[5]=(t*W-r*I+s*A)*O,e[6]=(p*b-x*P-m*w)*O,e[7]=(h*P-u*b+f*w)*O,e[8]=(a*F-o*I+c*y)*O,e[9]=(i*I-t*F-s*y)*O,e[10]=(x*E-v*b+m*S)*O,e[11]=(d*b-h*E-f*S)*O,e[12]=(o*A-a*R-l*y)*O,e[13]=(t*R-i*A+r*y)*O,e[14]=(v*w-x*C-p*S)*O,e[15]=(h*C-d*w+u*S)*O,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,x=s*d,v=a*h,p=a*d,m=o*d,S=l*c,w=l*h,b=l*d,C=i.x,E=i.y,P=i.z;return r[0]=(1-(v+m))*C,r[1]=(f+b)*C,r[2]=(x-w)*C,r[3]=0,r[4]=(f-b)*E,r[5]=(1-(u+m))*E,r[6]=(p+S)*E,r[7]=0,r[8]=(x+w)*P,r[9]=(p-S)*P,r[10]=(1-(u+v))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let a=ls.set(r[0],r[1],r[2]).length(),o=ls.set(r[4],r[5],r[6]).length(),l=ls.set(r[8],r[9],r[10]).length();s<0&&(a=-a),qn.copy(this);let c=1/a,h=1/o,d=1/l;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=h,qn.elements[5]*=h,qn.elements[6]*=h,qn.elements[8]*=d,qn.elements[9]*=d,qn.elements[10]*=d,t.setFromRotationMatrix(qn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=jn,l=!1){let c=this.elements,h=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),f=(i+r)/(i-r),x,v;if(l)x=s/(a-s),v=a*s/(a-s);else if(o===jn)x=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Ts)x=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=jn,l=!1){let c=this.elements,h=2/(t-e),d=2/(i-r),u=-(t+e)/(t-e),f=-(i+r)/(i-r),x,v;if(l)x=1/(a-s),v=a/(a-s);else if(o===jn)x=-2/(a-s),v=-(a+s)/(a-s);else if(o===Ts)x=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Wl.prototype.isMatrix4=!0;var ct=Wl,ls=new D,qn=new ct,q0=new D(0,0,0),Y0=new D(1,1,1),Ki=new D,Co=new D,Pn=new D,Bd=new ct,zd=new rn,Ln=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Bd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zd.setFromEuler(this),this.setFromQuaternion(zd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ln.DEFAULT_ORDER="XYZ";var Ps=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},$0=0,Hd=new D,cs=new rn,Ii=new ct,Ro=new D,ra=new D,Z0=new D,j0=new rn,kd=new D(1,0,0),Vd=new D(0,1,0),Gd=new D(0,0,1),Wd={type:"added"},J0={type:"removed"},us={type:"childadded",child:null},Eu={type:"childremoved",child:null},kt=class n extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$0++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new D,t=new Ln,i=new rn,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ct},normalMatrix:{value:new Be}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ps,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.multiply(cs),this}rotateOnWorldAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.premultiply(cs),this}rotateX(e){return this.rotateOnAxis(kd,e)}rotateY(e){return this.rotateOnAxis(Vd,e)}rotateZ(e){return this.rotateOnAxis(Gd,e)}translateOnAxis(e,t){return Hd.copy(e).applyQuaternion(this.quaternion),this.position.add(Hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kd,e)}translateY(e){return this.translateOnAxis(Vd,e)}translateZ(e){return this.translateOnAxis(Gd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ro.copy(e):Ro.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),ra.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(ra,Ro,this.up):Ii.lookAt(Ro,ra,this.up),this.quaternion.setFromRotationMatrix(Ii),r&&(Ii.extractRotation(r.matrixWorld),cs.setFromRotationMatrix(Ii),this.quaternion.premultiply(cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(De("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wd),us.child=e,this.dispatchEvent(us),us.child=null):De("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(J0),Eu.child=e,this.dispatchEvent(Eu),Eu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wd),us.child=e,this.dispatchEvent(us),us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ra,e,Z0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ra,j0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};kt.DEFAULT_UP=new D(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _n=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},K0={type:"move"},Is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,i),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,x=.005;c.inputState.pinching&&u>f+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(K0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Zf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qi={h:0,s:0,l:0},Po={h:0,s:0,l:0};function Tu(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ae=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=qe.workingColorSpace){if(e=mh(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Tu(a,s,e+1/3),this.g=Tu(a,s,e),this.b=Tu(a,s,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,t=nn){function i(s){s!==void 0&&parseFloat(s)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ie("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){let i=Zf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return qe.workingToColorSpace(tn.copy(this),e),Math.round(Qe(tn.r*255,0,255))*65536+Math.round(Qe(tn.g*255,0,255))*256+Math.round(Qe(tn.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(tn.copy(this),t);let i=tn.r,r=tn.g,s=tn.b,a=Math.max(i,r,s),o=Math.min(i,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=nn){qe.workingToColorSpace(tn.copy(this),e);let t=tn.r,i=tn.g,r=tn.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qi),this.setHSL(Qi.h+e,Qi.s+t,Qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qi),e.getHSL(Po);let i=pa(Qi.h,Po.h,t),r=pa(Qi.s,Po.s,t),s=pa(Qi.l,Po.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},tn=new Ae;Ae.NAMES=Zf;var Sa=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ae(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ma=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Yn=new D,Di=new D,Au=new D,Li=new D,hs=new D,ds=new D,Xd=new D,Cu=new D,Ru=new D,Pu=new D,Iu=new ut,Du=new ut,Lu=new ut,hi=class n{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Yn.subVectors(e,t),r.cross(Yn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Yn.subVectors(r,t),Di.subVectors(i,t),Au.subVectors(e,t);let a=Yn.dot(Yn),o=Yn.dot(Di),l=Yn.dot(Au),c=Di.dot(Di),h=Di.dot(Au),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,x=(a*h-o*l)*u;return s.set(1-f-x,x,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Li.x),l.addScaledVector(a,Li.y),l.addScaledVector(o,Li.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Iu.setScalar(0),Du.setScalar(0),Lu.setScalar(0),Iu.fromBufferAttribute(e,t),Du.fromBufferAttribute(e,i),Lu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Iu,s.x),a.addScaledVector(Du,s.y),a.addScaledVector(Lu,s.z),a}static isFrontFacing(e,t,i,r){return Yn.subVectors(i,t),Di.subVectors(e,t),Yn.cross(Di).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),Yn.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;hs.subVectors(r,i),ds.subVectors(s,i),Cu.subVectors(e,i);let l=hs.dot(Cu),c=ds.dot(Cu);if(l<=0&&c<=0)return t.copy(i);Ru.subVectors(e,r);let h=hs.dot(Ru),d=ds.dot(Ru);if(h>=0&&d<=h)return t.copy(r);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(hs,a);Pu.subVectors(e,s);let f=hs.dot(Pu),x=ds.dot(Pu);if(x>=0&&f<=x)return t.copy(s);let v=f*c-l*x;if(v<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(i).addScaledVector(ds,o);let p=h*x-f*d;if(p<=0&&d-h>=0&&f-x>=0)return Xd.subVectors(s,r),o=(d-h)/(d-h+(f-x)),t.copy(r).addScaledVector(Xd,o);let m=1/(p+v+u);return a=v*m,o=u*m,t.copy(i).addScaledVector(hs,a).addScaledVector(ds,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},pi=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,$n):$n.fromBufferAttribute(s,a),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Io.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Io.copy(i.boundingBox)),Io.applyMatrix4(e.matrixWorld),this.union(Io)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sa),Do.subVectors(this.max,sa),fs.subVectors(e.a,sa),ps.subVectors(e.b,sa),ms.subVectors(e.c,sa),er.subVectors(ps,fs),tr.subVectors(ms,ps),Ar.subVectors(fs,ms);let t=[0,-er.z,er.y,0,-tr.z,tr.y,0,-Ar.z,Ar.y,er.z,0,-er.x,tr.z,0,-tr.x,Ar.z,0,-Ar.x,-er.y,er.x,0,-tr.y,tr.x,0,-Ar.y,Ar.x,0];return!Nu(t,fs,ps,ms,Do)||(t=[1,0,0,0,1,0,0,0,1],!Nu(t,fs,ps,ms,Do))?!1:(Lo.crossVectors(er,tr),t=[Lo.x,Lo.y,Lo.z],Nu(t,fs,ps,ms,Do))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ni=[new D,new D,new D,new D,new D,new D,new D,new D],$n=new D,Io=new pi,fs=new D,ps=new D,ms=new D,er=new D,tr=new D,Ar=new D,sa=new D,Do=new D,Lo=new D,Cr=new D;function Nu(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Cr.fromArray(n,s);let o=r.x*Math.abs(Cr.x)+r.y*Math.abs(Cr.y)+r.z*Math.abs(Cr.z),l=e.dot(Cr),c=t.dot(Cr),h=i.dot(Cr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ut=new D,No=new he,Q0=0,Le=class extends fi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Q0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=vl,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)No.fromBufferAttribute(this,t),No.applyMatrix3(e),this.setXY(t,No.x,No.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var ba=class extends Le{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var wa=class extends Le{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ye=class extends Le{constructor(e,t,i){super(new Float32Array(e),t,i)}},eg=new pi,aa=new D,Fu=new D,mi=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):eg.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;aa.subVectors(e,this.center);let t=aa.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(aa,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(aa.copy(e.center).add(Fu)),this.expandByPoint(aa.copy(e.center).sub(Fu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},tg=0,zn=new ct,Uu=new kt,gs=new D,In=new pi,oa=new pi,qt=new D,tt=class n extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(E0(e)?wa:ba)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,t,i){return zn.makeTranslation(e,t,i),this.applyMatrix4(zn),this}scale(e,t,i){return zn.makeScale(e,t,i),this.applyMatrix4(zn),this}lookAt(e){return Uu.lookAt(e),Uu.updateMatrix(),this.applyMatrix4(Uu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ye(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){De("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];In.setFromBufferAttribute(s),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&De('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){De("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let i=this.boundingSphere.center;if(In.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];oa.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(In.min,oa.min),In.expandByPoint(qt),qt.addVectors(In.max,oa.max),In.expandByPoint(qt)):(In.expandByPoint(oa.min),In.expandByPoint(oa.max))}In.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(qt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)qt.fromBufferAttribute(o,c),l&&(gs.fromBufferAttribute(e,c),qt.add(gs)),r=Math.max(r,i.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&De('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){De("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Le(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new D,l[y]=new D;let c=new D,h=new D,d=new D,u=new he,f=new he,x=new he,v=new D,p=new D;function m(y,A,I){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,A),d.fromBufferAttribute(i,I),u.fromBufferAttribute(s,y),f.fromBufferAttribute(s,A),x.fromBufferAttribute(s,I),h.sub(c),d.sub(c),f.sub(u),x.sub(u);let R=1/(f.x*x.y-x.x*f.y);isFinite(R)&&(v.copy(h).multiplyScalar(x.y).addScaledVector(d,-f.y).multiplyScalar(R),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-x.x).multiplyScalar(R),o[y].add(v),o[A].add(v),o[I].add(v),l[y].add(p),l[A].add(p),l[I].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let y=0,A=S.length;y<A;++y){let I=S[y],R=I.start,F=I.count;for(let W=R,X=R+F;W<X;W+=3)m(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let w=new D,b=new D,C=new D,E=new D;function P(y){C.fromBufferAttribute(r,y),E.copy(C);let A=o[y];w.copy(A),w.sub(C.multiplyScalar(C.dot(A))).normalize(),b.crossVectors(E,A);let R=b.dot(l[y])<0?-1:1;a.setXYZW(y,w.x,w.y,w.z,R)}for(let y=0,A=S.length;y<A;++y){let I=S[y],R=I.start,F=I.count;for(let W=R,X=R+F;W<X;W+=3)P(e.getX(W+0)),P(e.getX(W+1)),P(e.getX(W+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Le(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){let x=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,x=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)u[x++]=c[f++]}return new Le(u,h,d)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,i);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bl=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=vl,this.updateRanges=[],this.version=0,this.uuid=Ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},un=new D,Ea=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){_a("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Le(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_a("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ng=0,Jn=class extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=Dr,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=al,this.blendDst=ol,this.blendEquation=rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ju,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ir,this.stencilZFail=Ir,this.stencilZPass=Ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ie(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Dr&&(i.blending=this.blending),this.side!==Bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==al&&(i.blendSrc=this.blendSrc),this.blendDst!==ol&&(i.blendDst=this.blendDst),this.blendEquation!==rr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Lr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ju&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ir&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ir&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ir&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Nr=class extends Jn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xs,la=new D,vs=new D,_s=new D,ys=new he,ca=new he,jf=new ct,Fo=new D,ua=new D,Uo=new D,qd=new he,Ou=new he,Yd=new he,Ds=class extends kt{constructor(e=new Nr){if(super(),this.isSprite=!0,this.type="Sprite",xs===void 0){xs=new tt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new bl(t,5);xs.setIndex([0,1,2,0,2,3]),xs.setAttribute("position",new Ea(i,3,0,!1)),xs.setAttribute("uv",new Ea(i,2,3,!1))}this.geometry=xs,this.material=e,this.center=new he(.5,.5),this.count=1}raycast(e,t){e.camera===null&&De('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vs.setFromMatrixScale(this.matrixWorld),jf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),_s.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vs.multiplyScalar(-_s.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let a=this.center;Oo(Fo.set(-.5,-.5,0),_s,a,vs,r,s),Oo(ua.set(.5,-.5,0),_s,a,vs,r,s),Oo(Uo.set(.5,.5,0),_s,a,vs,r,s),qd.set(0,0),Ou.set(1,0),Yd.set(1,1);let o=e.ray.intersectTriangle(Fo,ua,Uo,!1,la);if(o===null&&(Oo(ua.set(-.5,.5,0),_s,a,vs,r,s),Ou.set(0,1),o=e.ray.intersectTriangle(Fo,Uo,ua,!1,la),o===null))return;let l=e.ray.origin.distanceTo(la);l<e.near||l>e.far||t.push({distance:l,point:la.clone(),uv:hi.getInterpolation(la,Fo,ua,Uo,qd,Ou,Yd,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Oo(n,e,t,i,r,s){ys.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(ca.x=s*ys.x-r*ys.y,ca.y=r*ys.x+s*ys.y):ca.copy(ys),n.copy(e),n.x+=ca.x,n.y+=ca.y,n.applyMatrix4(jf)}var Fi=new D,Bu=new D,Bo=new D,nr=new D,zu=new D,zo=new D,Hu=new D,Fr=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,t),Fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Bu.copy(e).add(t).multiplyScalar(.5),Bo.copy(t).sub(e).normalize(),nr.copy(this.origin).sub(Bu);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Bo),o=nr.dot(this.direction),l=-nr.dot(Bo),c=nr.lengthSq(),h=Math.abs(1-a*a),d,u,f,x;if(h>0)if(d=a*l-o,u=a*o-l,x=s*h,d>=0)if(u>=-x)if(u<=x){let v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-x?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=x?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Bu).addScaledVector(Bo,u),f}intersectSphere(e,t){Fi.subVectors(e.center,this.origin);let i=Fi.dot(this.direction),r=Fi.dot(Fi)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,t,i,r,s){zu.subVectors(t,e),zo.subVectors(i,e),Hu.crossVectors(zu,zo);let a=this.direction.dot(Hu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;nr.subVectors(this.origin,e);let l=o*this.direction.dot(zo.crossVectors(nr,zo));if(l<0)return null;let c=o*this.direction.dot(zu.cross(nr));if(c<0||l+c>a)return null;let h=-o*nr.dot(Hu);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},dn=class extends Jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=ah,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},$d=new ct,Rr=new Fr,Ho=new mi,Zd=new D,ko=new D,Vo=new D,Go=new D,ku=new D,Wo=new D,jd=new D,Xo=new D,st=class extends kt{constructor(e=new tt,t=new dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Wo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(ku.fromBufferAttribute(d,e),a?Wo.addScaledVector(ku,h):Wo.addScaledVector(ku.sub(t),h))}t.add(Wo)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ho.copy(i.boundingSphere),Ho.applyMatrix4(s),Rr.copy(e.ray).recast(e.near),!(Ho.containsPoint(Rr.origin)===!1&&(Rr.intersectSphere(Ho,Zd)===null||Rr.origin.distanceToSquared(Zd)>(e.far-e.near)**2))&&($d.copy(s).invert(),Rr.copy(e.ray).applyMatrix4($d),!(i.boundingBox!==null&&Rr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Rr)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=u.length;x<v;x++){let p=u[x],m=a[p.materialIndex],S=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let b=S,C=w;b<C;b+=3){let E=o.getX(b),P=o.getX(b+1),y=o.getX(b+2);r=qo(this,m,e,i,c,h,d,E,P,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let x=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=x,m=v;p<m;p+=3){let S=o.getX(p),w=o.getX(p+1),b=o.getX(p+2);r=qo(this,a,e,i,c,h,d,S,w,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=u.length;x<v;x++){let p=u[x],m=a[p.materialIndex],S=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let b=S,C=w;b<C;b+=3){let E=b,P=b+1,y=b+2;r=qo(this,m,e,i,c,h,d,E,P,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let x=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=x,m=v;p<m;p+=3){let S=p,w=p+1,b=p+2;r=qo(this,a,e,i,c,h,d,S,w,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function ig(n,e,t,i,r,s,a,o){let l;if(e.side===Zt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Bi,o),l===null)return null;Xo.copy(o),Xo.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Xo);return c<t.near||c>t.far?null:{distance:c,point:Xo.clone(),object:n}}function qo(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ko),n.getVertexPosition(l,Vo),n.getVertexPosition(c,Go);let h=ig(n,e,t,i,ko,Vo,Go,jd);if(h){let d=new D;hi.getBarycoord(jd,ko,Vo,Go,d),r&&(h.uv=hi.getInterpolatedAttribute(r,o,l,c,d,new he)),s&&(h.uv1=hi.getInterpolatedAttribute(s,o,l,c,d,new he)),a&&(h.normal=hi.getInterpolatedAttribute(a,o,l,c,d,new D),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new D,materialIndex:0};hi.getNormal(ko,Vo,Go,u.normal),h.face=u,h.barycoord=d}return h}var Ur=class extends hn{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Ft,h=Ft,d,u){super(null,a,o,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ta=class extends Le{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ss=new ct,Jd=new ct,Yo=[],Kd=new pi,rg=new ct,ha=new st,da=new mi,Aa=class extends st{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ta(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,rg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ss),Kd.copy(e.boundingBox).applyMatrix4(Ss),this.boundingBox.union(Kd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ss),da.copy(e.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(da)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(ha.geometry=this.geometry,ha.material=this.material,ha.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),da.copy(this.boundingSphere),da.applyMatrix4(i),e.ray.intersectsSphere(da)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ss),Jd.multiplyMatrices(i,Ss),ha.matrixWorld=Jd,ha.raycast(e,Yo);for(let a=0,o=Yo.length;a<o;a++){let l=Yo[a];l.instanceId=s,l.object=this,t.push(l)}Yo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ta(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ur(new Float32Array(r*this.count),r,this.count,Hs,Hn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Vu=new D,sg=new D,ag=new Be,ui=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Vu.subVectors(i,t).cross(sg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Vu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||ag.getNormalMatrix(e),r=this.coplanarPoint(Vu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Pr=new mi,og=new he(.5,.5),$o=new D,Ls=class{constructor(e=new ui,t=new ui,i=new ui,r=new ui,s=new ui,a=new ui){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=jn,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],x=s[8],v=s[9],p=s[10],m=s[11],S=s[12],w=s[13],b=s[14],C=s[15];if(r[0].setComponents(c-a,f-h,m-x,C-S).normalize(),r[1].setComponents(c+a,f+h,m+x,C+S).normalize(),r[2].setComponents(c+o,f+d,m+v,C+w).normalize(),r[3].setComponents(c-o,f-d,m-v,C-w).normalize(),i)r[4].setComponents(l,u,p,b).normalize(),r[5].setComponents(c-l,f-u,m-p,C-b).normalize();else if(r[4].setComponents(c-l,f-u,m-p,C-b).normalize(),t===jn)r[5].setComponents(c+l,f+u,m+p,C+b).normalize();else if(t===Ts)r[5].setComponents(l,u,p,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pr)}intersectsSprite(e){Pr.center.set(0,0,0);let t=og.distanceTo(e.center);return Pr.radius=.7071067811865476+t,Pr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if($o.x=r.normal.x>0?e.max.x:e.min.x,$o.y=r.normal.y>0?e.max.y:e.min.y,$o.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint($o)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var gi=class extends Jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},wl=new D,El=new D,Qd=new ct,fa=new Fr,Zo=new mi,Gu=new D,ef=new D,Tl=class extends kt{constructor(e=new tt,t=new gi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)wl.fromBufferAttribute(t,r-1),El.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=wl.distanceTo(El);e.setAttribute("lineDistance",new Ye(i,1))}else Ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Zo.copy(i.boundingSphere),Zo.applyMatrix4(r),Zo.radius+=s,e.ray.intersectsSphere(Zo)===!1)return;Qd.copy(r).invert(),fa.copy(e.ray).applyMatrix4(Qd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let v=f,p=x-1;v<p;v+=c){let m=h.getX(v),S=h.getX(v+1),w=jo(this,e,fa,l,m,S,v);w&&t.push(w)}if(this.isLineLoop){let v=h.getX(x-1),p=h.getX(f),m=jo(this,e,fa,l,v,p,x-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=f,p=x-1;v<p;v+=c){let m=jo(this,e,fa,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){let v=jo(this,e,fa,l,x-1,f,x-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function jo(n,e,t,i,r,s,a){let o=n.geometry.attributes.position;if(wl.fromBufferAttribute(o,r),El.fromBufferAttribute(o,s),t.distanceSqToSegment(wl,El,Gu,ef)>i)return;Gu.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Gu);if(!(c<e.near||c>e.far))return{distance:c,point:ef.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var tf=new D,nf=new D,Kn=class extends Tl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)tf.fromBufferAttribute(t,r),nf.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+tf.distanceTo(nf);e.setAttribute("lineDistance",new Ye(i,1))}else Ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Al=class extends Jn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},rf=new ct,Ju=new Fr,Jo=new mi,Ko=new D,xi=class extends kt{constructor(e=new tt,t=new Al){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jo.copy(i.boundingSphere),Jo.applyMatrix4(r),Jo.radius+=s,e.ray.intersectsSphere(Jo)===!1)return;rf.copy(r).invert(),Ju.copy(e.ray).applyMatrix4(rf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let x=u,v=f;x<v;x++){let p=c.getX(x);Ko.fromBufferAttribute(d,p),sf(Ko,p,l,r,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let x=u,v=f;x<v;x++)Ko.fromBufferAttribute(d,x),sf(Ko,x,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function sf(n,e,t,i,r,s,a){let o=Ju.distanceSqToPoint(n);if(o<t){let l=new D;Ju.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ca=class extends hn{constructor(e=[],t=lr,i,r,s,a,o,l,c,h){super(e,t,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ra=class extends hn{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var zi=class extends hn{constructor(e,t,i=ei,r,s,a,o=Ft,l=Ft,c,h=di,d=1){if(h!==di&&h!==ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Cl=class extends zi{constructor(e,t=ei,i=lr,r,s,a=Ft,o=Ft,l,c=di){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Pa=class extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},vi=class n extends tt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(d,2));function x(v,p,m,S,w,b,C,E,P,y,A){let I=b/P,R=C/y,F=b/2,W=C/2,X=E/2,O=P+1,H=y+1,V=0,K=0,ne=new D;for(let ue=0;ue<H;ue++){let Me=ue*R-W;for(let Re=0;Re<O;Re++){let it=Re*I-F;ne[v]=it*S,ne[p]=Me*w,ne[m]=X,c.push(ne.x,ne.y,ne.z),ne[v]=0,ne[p]=0,ne[m]=E>0?1:-1,h.push(ne.x,ne.y,ne.z),d.push(Re/P),d.push(1-ue/y),V+=1}}for(let ue=0;ue<y;ue++)for(let Me=0;Me<P;Me++){let Re=u+Me+O*ue,it=u+Me+O*(ue+1),ht=u+(Me+1)+O*(ue+1),Ve=u+(Me+1)+O*ue;l.push(Re,it,Ve),l.push(it,ht,Ve),K+=6}o.addGroup(f,K,A),f+=K,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ia=class n extends tt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new D,h=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=i+d/t*r;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Ye(a,3)),this.setAttribute("normal",new Ye(o,3)),this.setAttribute("uv",new Ye(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Hi=class n extends tt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],d=[],u=[],f=[],x=0,v=[],p=i/2,m=0;S(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Ye(d,3)),this.setAttribute("normal",new Ye(u,3)),this.setAttribute("uv",new Ye(f,2));function S(){let b=new D,C=new D,E=0,P=(t-e)/i;for(let y=0;y<=s;y++){let A=[],I=y/s,R=I*(t-e)+e;for(let F=0;F<=r;F++){let W=F/r,X=W*l+o,O=Math.sin(X),H=Math.cos(X);C.x=R*O,C.y=-I*i+p,C.z=R*H,d.push(C.x,C.y,C.z),b.set(O,P,H).normalize(),u.push(b.x,b.y,b.z),f.push(W,1-I),A.push(x++)}v.push(A)}for(let y=0;y<r;y++)for(let A=0;A<s;A++){let I=v[A][y],R=v[A+1][y],F=v[A+1][y+1],W=v[A][y+1];(e>0||A!==0)&&(h.push(I,R,W),E+=3),(t>0||A!==s-1)&&(h.push(R,F,W),E+=3)}c.addGroup(m,E,0),m+=E}function w(b){let C=x,E=new he,P=new D,y=0,A=b===!0?e:t,I=b===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,p*I,0),u.push(0,I,0),f.push(.5,.5),x++;let R=x;for(let F=0;F<=r;F++){let X=F/r*l+o,O=Math.cos(X),H=Math.sin(X);P.x=A*H,P.y=p*I,P.z=A*O,d.push(P.x,P.y,P.z),u.push(0,I,0),E.x=O*.5+.5,E.y=H*.5*I+.5,f.push(E.x,E.y),x++}for(let F=0;F<r;F++){let W=C+F,X=R+F;b===!0?h.push(X,X+1,W):h.push(X+1,X,W),y+=3}c.addGroup(m,y,b===!0?1:2),m+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Rl=class n extends tt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let s=[],a=[];o(r),c(i),h(),this.setAttribute("position",new Ye(s,3)),this.setAttribute("normal",new Ye(s.slice(),3)),this.setAttribute("uv",new Ye(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(S){let w=new D,b=new D,C=new D;for(let E=0;E<t.length;E+=3)f(t[E+0],w),f(t[E+1],b),f(t[E+2],C),l(w,b,C,S)}function l(S,w,b,C){let E=C+1,P=[];for(let y=0;y<=E;y++){P[y]=[];let A=S.clone().lerp(b,y/E),I=w.clone().lerp(b,y/E),R=E-y;for(let F=0;F<=R;F++)F===0&&y===E?P[y][F]=A:P[y][F]=A.clone().lerp(I,F/R)}for(let y=0;y<E;y++)for(let A=0;A<2*(E-y)-1;A++){let I=Math.floor(A/2);A%2===0?(u(P[y][I+1]),u(P[y+1][I]),u(P[y][I])):(u(P[y][I+1]),u(P[y+1][I+1]),u(P[y+1][I]))}}function c(S){let w=new D;for(let b=0;b<s.length;b+=3)w.x=s[b+0],w.y=s[b+1],w.z=s[b+2],w.normalize().multiplyScalar(S),s[b+0]=w.x,s[b+1]=w.y,s[b+2]=w.z}function h(){let S=new D;for(let w=0;w<s.length;w+=3){S.x=s[w+0],S.y=s[w+1],S.z=s[w+2];let b=p(S)/2/Math.PI+.5,C=m(S)/Math.PI+.5;a.push(b,1-C)}x(),d()}function d(){for(let S=0;S<a.length;S+=6){let w=a[S+0],b=a[S+2],C=a[S+4],E=Math.max(w,b,C),P=Math.min(w,b,C);E>.9&&P<.1&&(w<.2&&(a[S+0]+=1),b<.2&&(a[S+2]+=1),C<.2&&(a[S+4]+=1))}}function u(S){s.push(S.x,S.y,S.z)}function f(S,w){let b=S*3;w.x=e[b+0],w.y=e[b+1],w.z=e[b+2]}function x(){let S=new D,w=new D,b=new D,C=new D,E=new he,P=new he,y=new he;for(let A=0,I=0;A<s.length;A+=9,I+=6){S.set(s[A+0],s[A+1],s[A+2]),w.set(s[A+3],s[A+4],s[A+5]),b.set(s[A+6],s[A+7],s[A+8]),E.set(a[I+0],a[I+1]),P.set(a[I+2],a[I+3]),y.set(a[I+4],a[I+5]),C.copy(S).add(w).add(b).divideScalar(3);let R=p(C);v(E,I+0,S,R),v(P,I+2,w,R),v(y,I+4,b,R)}}function v(S,w,b,C){C<0&&S.x===1&&(a[w]=S.x-1),b.x===0&&b.z===0&&(a[w]=C/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Qo=new D,el=new D,Wu=new D,tl=new hi,Da=class extends tt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(ws*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let x=0;x<l;x+=3){a?(c[0]=a.getX(x),c[1]=a.getX(x+1),c[2]=a.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);let{a:v,b:p,c:m}=tl;if(v.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),tl.getNormal(Wu),d[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,d[1]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,d[2]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){let w=(S+1)%3,b=d[S],C=d[w],E=tl[h[S]],P=tl[h[w]],y=`${b}_${C}`,A=`${C}_${b}`;A in u&&u[A]?(Wu.dot(u[A].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(P.x,P.y,P.z)),u[A]=null):y in u||(u[y]={index0:c[S],index1:c[w],normal:Wu.clone()})}}for(let x in u)if(u[x]){let{index0:v,index1:p}=u[x];Qo.fromBufferAttribute(o,v),el.fromBufferAttribute(o,p),f.push(Qo.x,Qo.y,Qo.z),f.push(el.x,el.y,el.z)}this.setAttribute("position",new Ye(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var Or=class n extends Rl{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var La=class n extends tt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,f=[],x=[],v=[],p=[];for(let m=0;m<h;m++){let S=m*u-a;for(let w=0;w<c;w++){let b=w*d-s;x.push(b,-S,0),v.push(0,0,1),p.push(w/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){let w=S+c*m,b=S+c*(m+1),C=S+1+c*(m+1),E=S+1+c*m;f.push(w,b,E),f.push(b,C,E)}this.setIndex(f),this.setAttribute("position",new Ye(x,3)),this.setAttribute("normal",new Ye(v,3)),this.setAttribute("uv",new Ye(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var ki=class n extends tt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new D,u=new D,f=[],x=[],v=[],p=[];for(let m=0;m<=i;m++){let S=[],w=m/i,b=0;m===0&&a===0?b=.5/t:m===i&&l===Math.PI&&(b=-.5/t);for(let C=0;C<=t;C++){let E=C/t;d.x=-e*Math.cos(r+E*s)*Math.sin(a+w*o),d.y=e*Math.cos(a+w*o),d.z=e*Math.sin(r+E*s)*Math.sin(a+w*o),x.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(E+b,1-w),S.push(c++)}h.push(S)}for(let m=0;m<i;m++)for(let S=0;S<t;S++){let w=h[m][S+1],b=h[m][S],C=h[m+1][S],E=h[m+1][S+1];(m!==0||a>0)&&f.push(w,b,E),(m!==i-1||l<Math.PI)&&f.push(b,C,E)}this.setIndex(f),this.setAttribute("position",new Ye(x,3)),this.setAttribute("normal",new Ye(v,3)),this.setAttribute("uv",new Ye(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Nn=class n extends tt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);let l=[],c=[],h=[],d=[],u=new D,f=new D,x=new D;for(let v=0;v<=i;v++){let p=a+v/i*o;for(let m=0;m<=r;m++){let S=m/r*s;f.x=(e+t*Math.cos(p))*Math.cos(S),f.y=(e+t*Math.cos(p))*Math.sin(S),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),u.x=e*Math.cos(S),u.y=e*Math.sin(S),x.subVectors(f,u).normalize(),h.push(x.x,x.y,x.z),d.push(m/r),d.push(v/i)}}for(let v=1;v<=i;v++)for(let p=1;p<=r;p++){let m=(r+1)*v+p-1,S=(r+1)*(v-1)+p-1,w=(r+1)*(v-1)+p,b=(r+1)*v+p;l.push(m,S,b),l.push(S,w,b)}this.setIndex(l),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function Gr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(af(r))r.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(af(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function an(n){let e={};for(let t=0;t<n.length;t++){let i=Gr(n[t]);for(let r in i)e[r]=i[r]}return e}function af(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function lg(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function gh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var Un={clone:Gr,merge:an},cg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ug=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$e=class extends Jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cg,this.fragmentShader=ug,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gr(e.uniforms),this.uniformsGroups=lg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Br=class extends $e{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ns=class extends Jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ic,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Pl=class extends Jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Of,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Il=class extends Jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function nl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var sr=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Dl=class extends sr{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yu,endingEnd:Yu}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case $u:s=e,o=2*t-i;break;case Zu:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case $u:a=e,l=2*i-t;break;case Zu:a=1,l=i+r[1]-r[0];break;default:a=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,x=(i-t)/(r-t),v=x*x,p=v*x,m=-u*p+2*u*v-u*x,S=(1+u)*p+(-1.5-2*u)*v+(-.5+u)*x+1,w=(-1-f)*p+(1.5+f)*v+.5*x,b=f*p-f*v;for(let C=0;C!==o;++C)s[C]=m*a[h+C]+S*a[c+C]+w*a[l+C]+b*a[d+C];return s}},Ll=class extends sr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(r-t),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},Nl=class extends sr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Fl=class extends sr{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){let v=(i-t)/(r-t),p=1-v;for(let m=0;m!==o;++m)s[m]=a[c+m]*p+a[l+m]*v;return s}let f=o*2,x=e-1;for(let v=0;v!==o;++v){let p=a[c+v],m=a[l+v],S=x*f+v*2,w=u[S],b=u[S+1],C=e*f+v*2,E=d[C],P=d[C+1],y=(i-t)/(r-t),A,I,R,F,W;for(let X=0;X<8;X++){A=y*y,I=A*y,R=1-y,F=R*R,W=F*R;let H=W*t+3*F*y*w+3*R*A*E+I*r-i;if(Math.abs(H)<1e-10)break;let V=3*F*(w-t)+6*R*y*(E-w)+3*A*(r-E);if(Math.abs(V)<1e-10)break;y=y-H/V,y=Math.max(0,Math.min(1,y))}s[v]=W*p+3*F*y*b+3*R*A*P+I*m}return s}},Fn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=nl(t,this.TimeBufferType),this.values=nl(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:nl(e.times,Array),values:nl(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Nl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Dl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case ma:t=this.InterpolantFactoryMethodDiscrete;break;case xl:t=this.InterpolantFactoryMethodLinear;break;case sl:t=this.InterpolantFactoryMethodSmooth;break;case qu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ie("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ma;case this.InterpolantFactoryMethodLinear:return xl;case this.InterpolantFactoryMethodSmooth:return sl;case this.InterpolantFactoryMethodBezier:return qu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(De("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(De("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){De("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){De("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&T0(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){De("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===sl,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let x=0;x!==i;++x){let v=t[d+x];if(v!==t[u+x]||v!==t[f+x]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Fn.prototype.ValueTypeName="";Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=xl;var ar=class extends Fn{constructor(e,t,i){super(e,t,i)}};ar.prototype.ValueTypeName="bool";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=ma;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;var Ul=class extends Fn{constructor(e,t,i,r){super(e,t,i,r)}};Ul.prototype.ValueTypeName="color";var Ol=class extends Fn{constructor(e,t,i,r){super(e,t,i,r)}};Ol.prototype.ValueTypeName="number";var Bl=class extends sr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)rn.slerpFlat(s,0,a,c-o,a,c,l);return s}},Na=class extends Fn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Bl(this.times,this.values,this.getValueSize(),e)}};Na.prototype.ValueTypeName="quaternion";Na.prototype.InterpolantFactoryMethodSmooth=void 0;var or=class extends Fn{constructor(e,t,i){super(e,t,i)}};or.prototype.ValueTypeName="string";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=ma;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;var zl=class extends Fn{constructor(e,t,i,r){super(e,t,i,r)}};zl.prototype.ValueTypeName="vector";var Hl=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],x=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Jf=new Hl,kl=class{constructor(e){this.manager=e!==void 0?e:Jf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};kl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Fa=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ua=class extends Fa{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ae(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Xu=new ct,of=new D,lf=new D,Ku=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ls,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;of.setFromMatrixPosition(e.matrixWorld),t.position.copy(of),lf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lf),t.updateMatrixWorld(),Xu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xu,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ts||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Xu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},il=new D,rl=new rn,ci=new D,Oa=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(il,rl,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(il,rl,ci.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(il,rl,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(il,rl,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ir=new D,cf=new he,uf=new he,$t=class extends Oa{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ir.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ir.x,ir.y).multiplyScalar(-e/ir.z),ir.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ir.x,ir.y).multiplyScalar(-e/ir.z)}getViewSize(e,t){return this.getViewBounds(e,cf,uf),t.subVectors(uf,cf)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ws*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Qu=class extends Ku{constructor(){super(new $t(90,1,.5,500)),this.isPointLightShadow=!0}},Fs=class extends Fa{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Qu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},zr=class extends Oa{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Ms=-90,bs=1,Vl=class extends kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new $t(Ms,bs,e,t);r.layers=this.layers,this.add(r);let s=new $t(Ms,bs,e,t);s.layers=this.layers,this.add(s);let a=new $t(Ms,bs,e,t);a.layers=this.layers,this.add(a);let o=new $t(Ms,bs,e,t);o.layers=this.layers,this.add(o);let l=new $t(Ms,bs,e,t);l.layers=this.layers,this.add(l);let c=new $t(Ms,bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===jn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ts)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},Gl=class extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Hr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=hg.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function hg(){this._document.hidden===!1&&this.reset()}var xh="\\[\\]\\.:\\/",dg=new RegExp("["+xh+"]","g"),vh="[^"+xh+"]",fg="[^"+xh.replace("\\.","")+"]",pg=/((?:WC+[\/:])*)/.source.replace("WC",vh),mg=/(WCOD+)?/.source.replace("WCOD",fg),gg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vh),xg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vh),vg=new RegExp("^"+pg+mg+gg+xg+"$"),_g=["material","materials","bones","map"],eh=class{constructor(e,t,i){let r=i||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Et=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(dg,"")}static parseTrackName(e){let t=vg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);_g.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ie("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){De("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){De("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){De("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){De("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){De("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){De("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){De("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;De("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Et.Composite=eh;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var YM=new Float32Array(1);var hf=new ct,Us=class{constructor(e,t,i=0,r=1/0){this.ray=new Fr(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ps,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):De("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hf),this}intersectObject(e,t=!0,i=[]){return th(e,this,i,t),i.sort(df),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)th(e[r],this,i,t);return i.sort(df),i}};function df(n,e){return n.distance-e.distance}function th(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let a=0,o=s.length;a<o;a++)th(s[a],e,t,!0)}}var wh=class wh{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};wh.prototype.isMatrix2=!0;var nh=wh;function _h(n,e,t,i){let r=yg(i);switch(t){case dh:return n*e;case Hs:return n*e/r.components*r.byteLength;case Kl:return n*e/r.components*r.byteLength;case hr:return n*e*2/r.components*r.byteLength;case Ql:return n*e*2/r.components*r.byteLength;case fh:return n*e*3/r.components*r.byteLength;case kn:return n*e*4/r.components*r.byteLength;case ec:return n*e*4/r.components*r.byteLength;case Ya:case $a:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Za:case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case nc:case rc:return Math.max(n,16)*Math.max(e,8)/4;case tc:case ic:return Math.max(n,8)*Math.max(e,8)/2;case sc:case ac:case lc:case cc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case oc:case Ja:case uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case dc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case fc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case pc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case mc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case gc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case xc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case vc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case _c:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case yc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Sc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Mc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case bc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case wc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ec:case Tc:case Ac:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Cc:case Rc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ka:case Pc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function yg(n){switch(n){case sn:case lh:return{byteLength:1,components:1};case Bs:case ch:case Tt:return{byteLength:2,components:1};case jl:case Jl:return{byteLength:2,components:4};case ei:case Zl:case Hn:return{byteLength:4,components:1};case uh:case hh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xl}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xl);function yp(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Sg(n){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,x)=>f.start-x.start);let u=0;for(let f=1;f<d.length;f++){let x=d[u],v=d[f];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,x=d.length;f<x;f++){let v=d[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bg=`#ifdef USE_ALPHAHASH
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
#endif`,wg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ag=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cg=`#ifdef USE_AOMAP
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
#endif`,Rg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pg=`#ifdef USE_BATCHING
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
#endif`,Ig=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ng=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Fg=`#ifdef USE_IRIDESCENCE
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
#endif`,Ug=`#ifdef USE_BUMPMAP
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
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Gg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Xg=`#define PI 3.141592653589793
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
} // validated`,qg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yg=`vec3 transformedNormal = objectNormal;
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
#endif`,$g=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ex=`#ifdef USE_ENVMAP
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
#endif`,tx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,nx=`#ifdef USE_ENVMAP
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
#endif`,ix=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rx=`#ifdef USE_ENVMAP
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
#endif`,sx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ax=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ox=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cx=`#ifdef USE_GRADIENTMAP
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
}`,ux=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,px=`#ifdef USE_ENVMAP
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
#endif`,mx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_x=`PhysicalMaterial material;
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
#endif`,yx=`uniform sampler2D dfgLUT;
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
}`,Sx=`
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
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
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
#endif`,bx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ax=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Px=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ix=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dx=`#if defined( USE_POINTS_UV )
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
#endif`,Lx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ux=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ox=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bx=`#ifdef USE_MORPHTARGETS
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
#endif`,zx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xx=`#ifdef USE_NORMALMAP
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
#endif`,qx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$x=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ev=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,iv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,av=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ov=`float getShadowMask() {
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
}`,lv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cv=`#ifdef USE_SKINNING
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
#endif`,uv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hv=`#ifdef USE_SKINNING
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
#endif`,dv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gv=`#ifdef USE_TRANSMISSION
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
#endif`,xv=`#ifdef USE_TRANSMISSION
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
#endif`,vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Mv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bv=`uniform sampler2D t2D;
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
}`,wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ev=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Av=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cv=`#include <common>
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
}`,Rv=`#if DEPTH_PACKING == 3200
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
}`,Pv=`#define DISTANCE
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
}`,Iv=`#define DISTANCE
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
}`,Dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nv=`uniform float scale;
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
}`,Fv=`uniform vec3 diffuse;
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
}`,Uv=`#include <common>
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
}`,Ov=`uniform vec3 diffuse;
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
}`,Bv=`#define LAMBERT
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
}`,zv=`#define LAMBERT
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
}`,Hv=`#define MATCAP
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
}`,kv=`#define MATCAP
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
}`,Vv=`#define NORMAL
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
}`,Gv=`#define NORMAL
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
}`,Wv=`#define PHONG
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
}`,Xv=`#define PHONG
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
}`,qv=`#define STANDARD
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
}`,Yv=`#define STANDARD
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
}`,$v=`#define TOON
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
}`,Zv=`#define TOON
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
}`,jv=`uniform float size;
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
}`,Jv=`uniform vec3 diffuse;
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
}`,Kv=`#include <common>
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
}`,Qv=`uniform vec3 color;
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
}`,e_=`uniform float rotation;
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
}`,t_=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:Mg,alphahash_pars_fragment:bg,alphamap_fragment:wg,alphamap_pars_fragment:Eg,alphatest_fragment:Tg,alphatest_pars_fragment:Ag,aomap_fragment:Cg,aomap_pars_fragment:Rg,batching_pars_vertex:Pg,batching_vertex:Ig,begin_vertex:Dg,beginnormal_vertex:Lg,bsdfs:Ng,iridescence_fragment:Fg,bumpmap_pars_fragment:Ug,clipping_planes_fragment:Og,clipping_planes_pars_fragment:Bg,clipping_planes_pars_vertex:zg,clipping_planes_vertex:Hg,color_fragment:kg,color_pars_fragment:Vg,color_pars_vertex:Gg,color_vertex:Wg,common:Xg,cube_uv_reflection_fragment:qg,defaultnormal_vertex:Yg,displacementmap_pars_vertex:$g,displacementmap_vertex:Zg,emissivemap_fragment:jg,emissivemap_pars_fragment:Jg,colorspace_fragment:Kg,colorspace_pars_fragment:Qg,envmap_fragment:ex,envmap_common_pars_fragment:tx,envmap_pars_fragment:nx,envmap_pars_vertex:ix,envmap_physical_pars_fragment:px,envmap_vertex:rx,fog_vertex:sx,fog_pars_vertex:ax,fog_fragment:ox,fog_pars_fragment:lx,gradientmap_pars_fragment:cx,lightmap_pars_fragment:ux,lights_lambert_fragment:hx,lights_lambert_pars_fragment:dx,lights_pars_begin:fx,lights_toon_fragment:mx,lights_toon_pars_fragment:gx,lights_phong_fragment:xx,lights_phong_pars_fragment:vx,lights_physical_fragment:_x,lights_physical_pars_fragment:yx,lights_fragment_begin:Sx,lights_fragment_maps:Mx,lights_fragment_end:bx,lightprobes_pars_fragment:wx,logdepthbuf_fragment:Ex,logdepthbuf_pars_fragment:Tx,logdepthbuf_pars_vertex:Ax,logdepthbuf_vertex:Cx,map_fragment:Rx,map_pars_fragment:Px,map_particle_fragment:Ix,map_particle_pars_fragment:Dx,metalnessmap_fragment:Lx,metalnessmap_pars_fragment:Nx,morphinstance_vertex:Fx,morphcolor_vertex:Ux,morphnormal_vertex:Ox,morphtarget_pars_vertex:Bx,morphtarget_vertex:zx,normal_fragment_begin:Hx,normal_fragment_maps:kx,normal_pars_fragment:Vx,normal_pars_vertex:Gx,normal_vertex:Wx,normalmap_pars_fragment:Xx,clearcoat_normal_fragment_begin:qx,clearcoat_normal_fragment_maps:Yx,clearcoat_pars_fragment:$x,iridescence_pars_fragment:Zx,opaque_fragment:jx,packing:Jx,premultiplied_alpha_fragment:Kx,project_vertex:Qx,dithering_fragment:ev,dithering_pars_fragment:tv,roughnessmap_fragment:nv,roughnessmap_pars_fragment:iv,shadowmap_pars_fragment:rv,shadowmap_pars_vertex:sv,shadowmap_vertex:av,shadowmask_pars_fragment:ov,skinbase_vertex:lv,skinning_pars_vertex:cv,skinning_vertex:uv,skinnormal_vertex:hv,specularmap_fragment:dv,specularmap_pars_fragment:fv,tonemapping_fragment:pv,tonemapping_pars_fragment:mv,transmission_fragment:gv,transmission_pars_fragment:xv,uv_pars_fragment:vv,uv_pars_vertex:_v,uv_vertex:yv,worldpos_vertex:Sv,background_vert:Mv,background_frag:bv,backgroundCube_vert:wv,backgroundCube_frag:Ev,cube_vert:Tv,cube_frag:Av,depth_vert:Cv,depth_frag:Rv,distance_vert:Pv,distance_frag:Iv,equirect_vert:Dv,equirect_frag:Lv,linedashed_vert:Nv,linedashed_frag:Fv,meshbasic_vert:Uv,meshbasic_frag:Ov,meshlambert_vert:Bv,meshlambert_frag:zv,meshmatcap_vert:Hv,meshmatcap_frag:kv,meshnormal_vert:Vv,meshnormal_frag:Gv,meshphong_vert:Wv,meshphong_frag:Xv,meshphysical_vert:qv,meshphysical_frag:Yv,meshtoon_vert:$v,meshtoon_frag:Zv,points_vert:jv,points_frag:Jv,shadow_vert:Kv,shadow_frag:Qv,sprite_vert:e_,sprite_frag:t_},fe={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},yi={basic:{uniforms:an([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:an([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:an([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:an([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:an([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:an([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:an([fe.points,fe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:an([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:an([fe.common,fe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:an([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:an([fe.sprite,fe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:an([fe.common,fe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:an([fe.lights,fe.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};yi.physical={uniforms:an([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};var Fc={r:0,b:0,g:0},n_=new ct,Sp=new Be;Sp.set(-1,0,0,0,1,0,0,0,1);function i_(n,e,t,i,r,s){let a=new Ae(0),o=r===!0?0:1,l,c,h=null,d=0,u=null;function f(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){let b=S.backgroundBlurriness>0;w=e.get(w,b)}return w}function x(S){let w=!1,b=f(S);b===null?p(a,o):b&&b.isColor&&(p(b,1),w=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(S,w){let b=f(w);b&&(b.isCubeTexture||b.mapping===Xa)?(c===void 0&&(c=new st(new vi(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:Gr(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(n_.makeRotationFromEuler(w.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Sp),c.material.toneMapped=qe.getTransfer(b.colorSpace)!==et,(h!==b||d!==b.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new st(new La(2,2),new $e({name:"BackgroundMaterial",uniforms:Gr(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=qe.getTransfer(b.colorSpace)!==et,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,w){S.getRGB(Fc,gh(n)),t.buffers.color.setClear(Fc.r,Fc.g,Fc.b,w,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,p(a,o)},render:x,addToRenderList:v,dispose:m}}function r_(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null),s=r,a=!1;function o(R,F,W,X,O){let H=!1,V=d(R,X,W,F);s!==V&&(s=V,c(s.object)),H=f(R,X,W,O),H&&x(R,X,W,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,b(R,F,W,X),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function h(R){return n.deleteVertexArray(R)}function d(R,F,W,X){let O=X.wireframe===!0,H=i[F.id];H===void 0&&(H={},i[F.id]=H);let V=R.isInstancedMesh===!0?R.id:0,K=H[V];K===void 0&&(K={},H[V]=K);let ne=K[W.id];ne===void 0&&(ne={},K[W.id]=ne);let ue=ne[O];return ue===void 0&&(ue=u(l()),ne[O]=ue),ue}function u(R){let F=[],W=[],X=[];for(let O=0;O<t;O++)F[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:X,object:R,attributes:{},index:null}}function f(R,F,W,X){let O=s.attributes,H=F.attributes,V=0,K=W.getAttributes();for(let ne in K)if(K[ne].location>=0){let Me=O[ne],Re=H[ne];if(Re===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(Re=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(Re=R.instanceColor)),Me===void 0||Me.attribute!==Re||Re&&Me.data!==Re.data)return!0;V++}return s.attributesNum!==V||s.index!==X}function x(R,F,W,X){let O={},H=F.attributes,V=0,K=W.getAttributes();for(let ne in K)if(K[ne].location>=0){let Me=H[ne];Me===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(Me=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(Me=R.instanceColor));let Re={};Re.attribute=Me,Me&&Me.data&&(Re.data=Me.data),O[ne]=Re,V++}s.attributes=O,s.attributesNum=V,s.index=X}function v(){let R=s.newAttributes;for(let F=0,W=R.length;F<W;F++)R[F]=0}function p(R){m(R,0)}function m(R,F){let W=s.newAttributes,X=s.enabledAttributes,O=s.attributeDivisors;W[R]=1,X[R]===0&&(n.enableVertexAttribArray(R),X[R]=1),O[R]!==F&&(n.vertexAttribDivisor(R,F),O[R]=F)}function S(){let R=s.newAttributes,F=s.enabledAttributes;for(let W=0,X=F.length;W<X;W++)F[W]!==R[W]&&(n.disableVertexAttribArray(W),F[W]=0)}function w(R,F,W,X,O,H,V){V===!0?n.vertexAttribIPointer(R,F,W,O,H):n.vertexAttribPointer(R,F,W,X,O,H)}function b(R,F,W,X){v();let O=X.attributes,H=W.getAttributes(),V=F.defaultAttributeValues;for(let K in H){let ne=H[K];if(ne.location>=0){let ue=O[K];if(ue===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(ue=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(ue=R.instanceColor)),ue!==void 0){let Me=ue.normalized,Re=ue.itemSize,it=e.get(ue);if(it===void 0)continue;let ht=it.buffer,Ve=it.type,j=it.bytesPerElement,ge=Ve===n.INT||Ve===n.UNSIGNED_INT||ue.gpuType===Zl;if(ue.isInterleavedBufferAttribute){let ae=ue.data,Ne=ae.stride,ze=ue.offset;if(ae.isInstancedInterleavedBuffer){for(let Ue=0;Ue<ne.locationSize;Ue++)m(ne.location+Ue,ae.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ue=0;Ue<ne.locationSize;Ue++)p(ne.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,ht);for(let Ue=0;Ue<ne.locationSize;Ue++)w(ne.location+Ue,Re/ne.locationSize,Ve,Me,Ne*j,(ze+Re/ne.locationSize*Ue)*j,ge)}else{if(ue.isInstancedBufferAttribute){for(let ae=0;ae<ne.locationSize;ae++)m(ne.location+ae,ue.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ae=0;ae<ne.locationSize;ae++)p(ne.location+ae);n.bindBuffer(n.ARRAY_BUFFER,ht);for(let ae=0;ae<ne.locationSize;ae++)w(ne.location+ae,Re/ne.locationSize,Ve,Me,Re*j,Re/ne.locationSize*ae*j,ge)}}else if(V!==void 0){let Me=V[K];if(Me!==void 0)switch(Me.length){case 2:n.vertexAttrib2fv(ne.location,Me);break;case 3:n.vertexAttrib3fv(ne.location,Me);break;case 4:n.vertexAttrib4fv(ne.location,Me);break;default:n.vertexAttrib1fv(ne.location,Me)}}}}S()}function C(){A();for(let R in i){let F=i[R];for(let W in F){let X=F[W];for(let O in X){let H=X[O];for(let V in H)h(H[V].object),delete H[V];delete X[O]}}delete i[R]}}function E(R){if(i[R.id]===void 0)return;let F=i[R.id];for(let W in F){let X=F[W];for(let O in X){let H=X[O];for(let V in H)h(H[V].object),delete H[V];delete X[O]}}delete i[R.id]}function P(R){for(let F in i){let W=i[F];for(let X in W){let O=W[X];if(O[R.id]===void 0)continue;let H=O[R.id];for(let V in H)h(H[V].object),delete H[V];delete O[R.id]}}}function y(R){for(let F in i){let W=i[F],X=R.isInstancedMesh===!0?R.id:0,O=W[X];if(O!==void 0){for(let H in O){let V=O[H];for(let K in V)h(V[K].object),delete V[K];delete O[H]}delete W[X],Object.keys(W).length===0&&delete i[F]}}}function A(){I(),a=!0,s!==r&&(s=r,c(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:I,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:p,disableUnusedAttributes:S}}function s_(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function a_(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==kn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===Tt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==sn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Hn&&!y)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ie("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:b,maxSamples:C,samples:E}}function o_(n){let e=this,t=null,i=0,r=!1,s=!1,a=new ui,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||r;return r=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let x=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!r||x===null||x.length===0||s&&!p)s?h(null):c();else{let S=s?0:i,w=S*4,b=m.clippingState||null;l.value=b,b=h(x,u,w,f);for(let C=0;C!==w;++C)b[C]=t[C];m.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,x){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=l.value,x!==!0||p===null){let m=f+v*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let w=0,b=f;w!==v;++w,b+=4)a.copy(d[w]).applyMatrix4(S,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var fr=4,Kf=[.125,.215,.35,.446,.526,.582],Wr=20,l_=256,Qa=new zr,Qf=new Ae,Eh=null,Th=0,Ah=0,Ch=!1,c_=new D,Oc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=c_}=s;Eh=this._renderer.getRenderTarget(),Th=this._renderer.getActiveCubeFace(),Ah=this._renderer.getActiveMipmapLevel(),Ch=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=np(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Eh,Th,Ah),this._renderer.xr.enabled=Ch,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===lr||e.mapping===Vr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Eh=this._renderer.getRenderTarget(),Th=this._renderer.getActiveCubeFace(),Ah=this._renderer.getActiveMipmapLevel(),Ch=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:Tt,format:kn,colorSpace:ga,depthBuffer:!1},r=ep(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ep(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=u_(s)),this._blurMaterial=d_(s,e,t),this._ggxMaterial=h_(s,e,t)}return r}_compileMaterial(e){let t=new st(new tt,e);this._renderer.compile(t,Qa)}_sceneToCubeUV(e,t,i,r,s){let l=new $t(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Qf),d.toneMapping=Qn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new st(new vi,new dn({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,m=!1,S=e.background;S?S.isColor&&(p.color.copy(S),e.background=null,m=!0):(p.color.copy(Qf),m=!0);for(let w=0;w<6;w++){let b=w%3;b===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[w],s.y,s.z)):b===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[w]));let C=this._cubeSize;ks(r,b*C,w>2?C:0,C,C),d.setRenderTarget(r),m&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=S}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===lr||e.mapping===Vr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=np()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tp());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;ks(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Qa)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:x}=this,v=this._sizeLods[i],p=3*v*(i>x-fr?i-x+fr:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=x-t,ks(s,p,m,3*v,2*v),r.setRenderTarget(s),r.render(o,Qa),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-i,ks(e,p,m,3*v,2*v),r.setRenderTarget(e),r.render(o,Qa)}_blur(e,t,i,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&De("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[r];d.material=c;let u=c.uniforms,f=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Wr-1),v=s/x,p=isFinite(s)?1+Math.floor(h*v):Wr;p>Wr&&Ie(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Wr}`);let m=[],S=0;for(let P=0;P<Wr;++P){let y=P/v,A=Math.exp(-y*y/2);m.push(A),P===0?S+=A:P<p&&(S+=2*A)}for(let P=0;P<m.length;P++)m[P]=m[P]/S;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:w}=this;u.dTheta.value=x,u.mipInt.value=w-i;let b=this._sizeLods[r],C=3*b*(r>w-fr?r-w+fr:0),E=4*(this._cubeSize-b);ks(t,C,E,3*b,2*b),l.setRenderTarget(t),l.render(d,Qa)}};function u_(n){let e=[],t=[],i=[],r=n,s=n-fr+1+Kf.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>n-fr?l=Kf[a-n+fr-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,x=6,v=3,p=2,m=1,S=new Float32Array(v*x*f),w=new Float32Array(p*x*f),b=new Float32Array(m*x*f);for(let E=0;E<f;E++){let P=E%3*2/3-1,y=E>2?0:-1,A=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];S.set(A,v*x*E),w.set(u,p*x*E);let I=[E,E,E,E,E,E];b.set(I,m*x*E)}let C=new tt;C.setAttribute("position",new Le(S,v)),C.setAttribute("uv",new Le(w,p)),C.setAttribute("faceIndex",new Le(b,m)),i.push(new st(C,null)),r>fr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function ep(n,e,t){let i=new vt(n,e,t);return i.texture.mapping=Xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function h_(n,e,t){return new $e({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:l_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hc(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function d_(n,e,t){let i=new Float32Array(Wr),r=new D(0,1,0);return new $e({name:"SphericalGaussianBlur",defines:{n:Wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hc(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function tp(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hc(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function np(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Hc(){return`

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
	`}var Bc=class extends vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ca(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new vi(5,5,5),s=new $e({name:"CubemapFromEquirect",uniforms:Gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Zt,blending:Sn});s.uniforms.tEquirect.value=t;let a=new st(r,s),o=t.minFilter;return t.minFilter===cr&&(t.minFilter=Ot),new Vl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function f_(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===ql||f===Yl)if(e.has(u)){let x=e.get(u).texture;return o(x,u.mapping)}else{let x=u.image;if(x&&x.height>0){let v=new Bc(x.height);return v.fromEquirectangularTexture(n,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,x=f===ql||f===Yl,v=f===lr||f===Vr;if(x||v){let p=t.get(u),m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new Oc(n)),p=x?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{let S=u.image;return x&&S&&S.height>0||v&&S&&l(S)?(i===null&&(i=new Oc(n)),p=x?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===ql?u.mapping=lr:f===Yl&&(u.mapping=Vr),u}function l(u){let f=0,x=6;for(let v=0;v<x;v++)u[v]!==void 0&&f++;return f===x}function c(u){let f=u.target;f.removeEventListener("dispose",c);let x=e.get(f);x!==void 0&&(e.delete(f),x.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let x=t.get(f);x!==void 0&&(t.delete(f),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function p_(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&_l("WebGLRenderer: "+i+" extension not supported."),r}}}function m_(n,e,t,i){let r={},s=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let x in u.attributes)e.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete r[u.id];let f=s.get(u);f&&(e.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],n.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,x=d.attributes.position,v=0;if(x===void 0)return;if(f!==null){let S=f.array;v=f.version;for(let w=0,b=S.length;w<b;w+=3){let C=S[w+0],E=S[w+1],P=S[w+2];u.push(C,E,E,P,P,C)}}else{let S=x.array;v=x.version;for(let w=0,b=S.length/3-1;w<b;w+=3){let C=w+0,E=w+1,P=w+2;u.push(C,E,E,P,P,C)}}let p=new(x.count>=65535?wa:ba)(u,1);p.version=v;let m=s.get(d);m&&e.remove(m),s.set(d,p)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function g_(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,u){n.drawElements(i,u,s,d*a),t.update(u,i,1)}function c(d,u,f){f!==0&&(n.drawElementsInstanced(i,u,s,d*a,f),t.update(u,i,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,f);let v=0;for(let p=0;p<f;p++)v+=u[p];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function x_(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:De("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function v_(n,e,t){let i=new WeakMap,r=new ut;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let A=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],w=0;f===!0&&(w=1),x===!0&&(w=2),v===!0&&(w=3);let b=o.attributes.position.count*w,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let E=new Float32Array(b*C*4*d),P=new ya(E,b,C,d);P.type=Hn,P.needsUpdate=!0;let y=w*4;for(let I=0;I<d;I++){let R=p[I],F=m[I],W=S[I],X=b*C*4*I;for(let O=0;O<R.count;O++){let H=O*y;f===!0&&(r.fromBufferAttribute(R,O),E[X+H+0]=r.x,E[X+H+1]=r.y,E[X+H+2]=r.z,E[X+H+3]=0),x===!0&&(r.fromBufferAttribute(F,O),E[X+H+4]=r.x,E[X+H+5]=r.y,E[X+H+6]=r.z,E[X+H+7]=0),v===!0&&(r.fromBufferAttribute(W,O),E[X+H+8]=r.x,E[X+H+9]=r.y,E[X+H+10]=r.z,E[X+H+11]=W.itemSize===4?r.w:1)}}u={count:d,texture:P,size:new he(b,C)},i.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let x=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function __(n,e,t,i,r){let s=new WeakMap;function a(c){let h=r.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var y_={[za]:"LINEAR_TONE_MAPPING",[Ha]:"REINHARD_TONE_MAPPING",[ka]:"CINEON_TONE_MAPPING",[kr]:"ACES_FILMIC_TONE_MAPPING",[Ga]:"AGX_TONE_MAPPING",[Wa]:"NEUTRAL_TONE_MAPPING",[Va]:"CUSTOM_TONE_MAPPING"};function S_(n,e,t,i,r){let s=new vt(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new zi(e,t):void 0}),a=new vt(e,t,{type:Tt,depthBuffer:!1,stencilBuffer:!1}),o=new tt;o.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ye([0,2,0,0,2,0],2));let l=new Br({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new st(o,l),h=new zr(-1,1,1,-1,0,1),d=null,u=null,f=!1,x,v=null,p=[],m=!1;this.setSize=function(S,w){s.setSize(S,w),a.setSize(S,w);for(let b=0;b<p.length;b++){let C=p[b];C.setSize&&C.setSize(S,w)}},this.setEffects=function(S){p=S,m=p.length>0&&p[0].isRenderPass===!0;let w=s.width,b=s.height;for(let C=0;C<p.length;C++){let E=p[C];E.setSize&&E.setSize(w,b)}},this.begin=function(S,w){if(f||S.toneMapping===Qn&&p.length===0)return!1;if(v=w,w!==null){let b=w.width,C=w.height;(s.width!==b||s.height!==C)&&this.setSize(b,C)}return m===!1&&S.setRenderTarget(s),x=S.toneMapping,S.toneMapping=Qn,!0},this.hasRenderPass=function(){return m},this.end=function(S,w){S.toneMapping=x,f=!0;let b=s,C=a;for(let E=0;E<p.length;E++){let P=p[E];if(P.enabled!==!1&&(P.render(S,C,b,w),P.needsSwap!==!1)){let y=b;b=C,C=y}}if(d!==S.outputColorSpace||u!==S.toneMapping){d=S.outputColorSpace,u=S.toneMapping,l.defines={},qe.getTransfer(d)===et&&(l.defines.SRGB_TRANSFER="");let E=y_[u];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,S.setRenderTarget(v),S.render(c,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}var Mp=new hn,Ih=new zi(1,1),bp=new ya,wp=new Ml,Ep=new Ca,ip=[],rp=[],sp=new Float32Array(16),ap=new Float32Array(9),op=new Float32Array(4);function Gs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=ip[r];if(s===void 0&&(s=new Float32Array(r),ip[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Vt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function kc(n,e){let t=rp[e];t===void 0&&(t=new Int32Array(e),rp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function M_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function b_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2fv(this.addr,e),Gt(t,e)}}function w_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;n.uniform3fv(this.addr,e),Gt(t,e)}}function E_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4fv(this.addr,e),Gt(t,e)}}function T_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;op.set(i),n.uniformMatrix2fv(this.addr,!1,op),Gt(t,i)}}function A_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;ap.set(i),n.uniformMatrix3fv(this.addr,!1,ap),Gt(t,i)}}function C_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;sp.set(i),n.uniformMatrix4fv(this.addr,!1,sp),Gt(t,i)}}function R_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function P_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2iv(this.addr,e),Gt(t,e)}}function I_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3iv(this.addr,e),Gt(t,e)}}function D_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4iv(this.addr,e),Gt(t,e)}}function L_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function N_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2uiv(this.addr,e),Gt(t,e)}}function F_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3uiv(this.addr,e),Gt(t,e)}}function U_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4uiv(this.addr,e),Gt(t,e)}}function O_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ih.compareFunction=t.isReversedDepthBuffer()?Lc:Dc,s=Ih):s=Mp,t.setTexture2D(e||s,r)}function B_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||wp,r)}function z_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ep,r)}function H_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||bp,r)}function k_(n){switch(n){case 5126:return M_;case 35664:return b_;case 35665:return w_;case 35666:return E_;case 35674:return T_;case 35675:return A_;case 35676:return C_;case 5124:case 35670:return R_;case 35667:case 35671:return P_;case 35668:case 35672:return I_;case 35669:case 35673:return D_;case 5125:return L_;case 36294:return N_;case 36295:return F_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return O_;case 35679:case 36299:case 36307:return B_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return H_}}function V_(n,e){n.uniform1fv(this.addr,e)}function G_(n,e){let t=Gs(e,this.size,2);n.uniform2fv(this.addr,t)}function W_(n,e){let t=Gs(e,this.size,3);n.uniform3fv(this.addr,t)}function X_(n,e){let t=Gs(e,this.size,4);n.uniform4fv(this.addr,t)}function q_(n,e){let t=Gs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Y_(n,e){let t=Gs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function $_(n,e){let t=Gs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Z_(n,e){n.uniform1iv(this.addr,e)}function j_(n,e){n.uniform2iv(this.addr,e)}function J_(n,e){n.uniform3iv(this.addr,e)}function K_(n,e){n.uniform4iv(this.addr,e)}function Q_(n,e){n.uniform1uiv(this.addr,e)}function ey(n,e){n.uniform2uiv(this.addr,e)}function ty(n,e){n.uniform3uiv(this.addr,e)}function ny(n,e){n.uniform4uiv(this.addr,e)}function iy(n,e,t){let i=this.cache,r=e.length,s=kc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ih:a=Mp;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function ry(n,e,t){let i=this.cache,r=e.length,s=kc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||wp,s[a])}function sy(n,e,t){let i=this.cache,r=e.length,s=kc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ep,s[a])}function ay(n,e,t){let i=this.cache,r=e.length,s=kc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||bp,s[a])}function oy(n){switch(n){case 5126:return V_;case 35664:return G_;case 35665:return W_;case 35666:return X_;case 35674:return q_;case 35675:return Y_;case 35676:return $_;case 5124:case 35670:return Z_;case 35667:case 35671:return j_;case 35668:case 35672:return J_;case 35669:case 35673:return K_;case 5125:return Q_;case 36294:return ey;case 36295:return ty;case 36296:return ny;case 35678:case 36198:case 36298:case 36306:case 35682:return iy;case 35679:case 36299:case 36307:return ry;case 35680:case 36300:case 36308:case 36293:return sy;case 36289:case 36303:case 36311:case 36292:return ay}}var Dh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=k_(t.type)}},Lh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=oy(t.type)}},Nh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},Rh=/(\w+)(\])?(\[|\.)?/g;function lp(n,e){n.seq.push(e),n.map[e.id]=e}function ly(n,e,t){let i=n.name,r=i.length;for(Rh.lastIndex=0;;){let s=Rh.exec(i),a=Rh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){lp(t,c===void 0?new Dh(o,n,e):new Lh(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Nh(o),lp(t,d)),t=d}}}var Vs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);ly(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function cp(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var cy=37297,uy=0;function hy(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var up=new Be;function dy(n){qe._getMatrix(up,qe.workingColorSpace,n);let e=`mat3( ${up.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case xa:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function hp(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+hy(n.getShaderSource(e),o)}else return s}function fy(n,e){let t=dy(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var py={[za]:"Linear",[Ha]:"Reinhard",[ka]:"Cineon",[kr]:"ACESFilmic",[Ga]:"AgX",[Wa]:"Neutral",[Va]:"Custom"};function my(n,e){let t=py[e];return t===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Uc=new D;function gy(){qe.getLuminanceCoefficients(Uc);let n=Uc.x.toFixed(4),e=Uc.y.toFixed(4),t=Uc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(to).join(`
`)}function vy(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function _y(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function to(n){return n!==""}function dp(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var yy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fh(n){return n.replace(yy,My)}var Sy=new Map;function My(n,e){let t=We[e];if(t===void 0){let i=Sy.get(e);if(i!==void 0)t=We[i],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Fh(t)}var by=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pp(n){return n.replace(by,wy)}function wy(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function mp(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var Ey={[Ba]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function Ty(n){return Ey[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ay={[lr]:"ENVMAP_TYPE_CUBE",[Vr]:"ENVMAP_TYPE_CUBE",[Xa]:"ENVMAP_TYPE_CUBE_UV"};function Cy(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Ay[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ry={[Vr]:"ENVMAP_MODE_REFRACTION"};function Py(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Ry[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Iy={[ah]:"ENVMAP_BLENDING_MULTIPLY",[Nf]:"ENVMAP_BLENDING_MIX",[Ff]:"ENVMAP_BLENDING_ADD"};function Dy(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Iy[n.combine]||"ENVMAP_BLENDING_NONE"}function Ly(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Ny(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Ty(t),c=Cy(t),h=Py(t),d=Dy(t),u=Ly(t),f=xy(t),x=vy(s),v=r.createProgram(),p,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(to).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(to).join(`
`),m.length>0&&(m+=`
`)):(p=[mp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),m=[mp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qn?"#define TONE_MAPPING":"",t.toneMapping!==Qn?We.tonemapping_pars_fragment:"",t.toneMapping!==Qn?my("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,fy("linearToOutputTexel",t.outputColorSpace),gy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(to).join(`
`)),a=Fh(a),a=dp(a,t),a=fp(a,t),o=Fh(o),o=dp(o,t),o=fp(o,t),a=pp(a),o=pp(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=S+p+a,b=S+m+o,C=cp(r,r.VERTEX_SHADER,w),E=cp(r,r.FRAGMENT_SHADER,b);r.attachShader(v,C),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function P(R){if(n.debug.checkShaderErrors){let F=r.getProgramInfoLog(v)||"",W=r.getShaderInfoLog(C)||"",X=r.getShaderInfoLog(E)||"",O=F.trim(),H=W.trim(),V=X.trim(),K=!0,ne=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,C,E);else{let ue=hp(r,C,"vertex"),Me=hp(r,E,"fragment");De("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+ue+`
`+Me)}else O!==""?Ie("WebGLProgram: Program Info Log:",O):(H===""||V==="")&&(ne=!1);ne&&(R.diagnostics={runnable:K,programLog:O,vertexShader:{log:H,prefix:p},fragmentShader:{log:V,prefix:m}})}r.deleteShader(C),r.deleteShader(E),y=new Vs(r,v),A=_y(r,v)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(v,cy)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=uy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=E,this}var Fy=0,Uh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Oh(e),t.set(e,i)),i}},Oh=class{constructor(e){this.id=Fy++,this.code=e,this.usedTimes=0}};function Uy(n){return n===hr||n===Ja||n===Ka}function Oy(n,e,t,i,r,s){let a=new Ps,o=new Uh,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,A,I,R,F,W){let X=R.fog,O=F.geometry,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,K=e.get(y.envMap||H,V),ne=K&&K.mapping===Xa?K.image.height:null,ue=f[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Ie("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let Me=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Re=Me!==void 0?Me.length:0,it=0;O.morphAttributes.position!==void 0&&(it=1),O.morphAttributes.normal!==void 0&&(it=2),O.morphAttributes.color!==void 0&&(it=3);let ht,Ve,j,ge;if(ue){let He=yi[ue];ht=He.vertexShader,Ve=He.fragmentShader}else ht=y.vertexShader,Ve=y.fragmentShader,o.update(y),j=o.getVertexShaderID(y),ge=o.getFragmentShaderID(y);let ae=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),ze=F.isInstancedMesh===!0,Ue=F.isBatchedMesh===!0,Ct=!!y.map,Je=!!y.matcap,dt=!!K,wt=!!y.aoMap,Ze=!!y.lightMap,zt=!!y.bumpMap,Rt=!!y.normalMap,Cn=!!y.displacementMap,N=!!y.emissiveMap,Ht=!!y.metalnessMap,Ke=!!y.roughnessMap,_t=y.anisotropy>0,de=y.clearcoat>0,Pt=y.dispersion>0,T=y.iridescence>0,_=y.sheen>0,B=y.transmission>0,$=_t&&!!y.anisotropyMap,te=de&&!!y.clearcoatMap,ie=de&&!!y.clearcoatNormalMap,ce=de&&!!y.clearcoatRoughnessMap,q=T&&!!y.iridescenceMap,Z=T&&!!y.iridescenceThicknessMap,xe=_&&!!y.sheenColorMap,ye=_&&!!y.sheenRoughnessMap,oe=!!y.specularMap,re=!!y.specularColorMap,Oe=!!y.specularIntensityMap,Ge=B&&!!y.transmissionMap,at=B&&!!y.thicknessMap,L=!!y.gradientMap,se=!!y.alphaMap,Y=y.alphaTest>0,ve=!!y.alphaHash,le=!!y.extensions,ee=Qn;y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ee=n.toneMapping);let Te={shaderID:ue,shaderType:y.type,shaderName:y.name,vertexShader:ht,fragmentShader:Ve,defines:y.defines,customVertexShaderID:j,customFragmentShaderID:ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ue,batchingColor:Ue&&F._colorsTexture!==null,instancing:ze,instancingColor:ze&&F.instanceColor!==null,instancingMorph:ze&&F.morphTexture!==null,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ct,matcap:Je,envMap:dt,envMapMode:dt&&K.mapping,envMapCubeUVHeight:ne,aoMap:wt,lightMap:Ze,bumpMap:zt,normalMap:Rt,displacementMap:Cn,emissiveMap:N,normalMapObjectSpace:Rt&&y.normalMapType===Bf,normalMapTangentSpace:Rt&&y.normalMapType===Ic,packedNormalMap:Rt&&y.normalMapType===Ic&&Uy(y.normalMap.format),metalnessMap:Ht,roughnessMap:Ke,anisotropy:_t,anisotropyMap:$,clearcoat:de,clearcoatMap:te,clearcoatNormalMap:ie,clearcoatRoughnessMap:ce,dispersion:Pt,iridescence:T,iridescenceMap:q,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:xe,sheenRoughnessMap:ye,specularMap:oe,specularColorMap:re,specularIntensityMap:Oe,transmission:B,transmissionMap:Ge,thicknessMap:at,gradientMap:L,opaque:y.transparent===!1&&y.blending===Dr&&y.alphaToCoverage===!1,alphaMap:se,alphaTest:Y,alphaHash:ve,combine:y.combine,mapUv:Ct&&x(y.map.channel),aoMapUv:wt&&x(y.aoMap.channel),lightMapUv:Ze&&x(y.lightMap.channel),bumpMapUv:zt&&x(y.bumpMap.channel),normalMapUv:Rt&&x(y.normalMap.channel),displacementMapUv:Cn&&x(y.displacementMap.channel),emissiveMapUv:N&&x(y.emissiveMap.channel),metalnessMapUv:Ht&&x(y.metalnessMap.channel),roughnessMapUv:Ke&&x(y.roughnessMap.channel),anisotropyMapUv:$&&x(y.anisotropyMap.channel),clearcoatMapUv:te&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:ie&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:ye&&x(y.sheenRoughnessMap.channel),specularMapUv:oe&&x(y.specularMap.channel),specularColorMapUv:re&&x(y.specularColorMap.channel),specularIntensityMapUv:Oe&&x(y.specularIntensityMap.channel),transmissionMapUv:Ge&&x(y.transmissionMap.channel),thicknessMapUv:at&&x(y.thicknessMap.channel),alphaMapUv:se&&x(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Rt||_t),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(Ct||se),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Rt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ne,skinning:F.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:it,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:Ct&&y.map.isVideoTexture===!0&&qe.getTransfer(y.map.colorSpace)===et,decodeVideoTextureEmissive:N&&y.emissiveMap.isVideoTexture===!0&&qe.getTransfer(y.emissiveMap.colorSpace)===et,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===yn,flipSided:y.side===Zt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:le&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&y.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function p(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let I in y.defines)A.push(I),A.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(m(A,y),S(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function m(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function S(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),y.push(a.mask)}function w(y){let A=f[y.type],I;if(A){let R=yi[A];I=Un.clone(R.uniforms)}else I=y.uniforms;return I}function b(y,A){let I=h.get(A);return I!==void 0?++I.usedTimes:(I=new Ny(n,A,y,r),c.push(I),h.set(A,I)),I}function C(y){if(--y.usedTimes===0){let A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function P(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:w,acquireProgram:b,releaseProgram:C,releaseShaderCache:E,programs:c,dispose:P}}function By(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function zy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function gp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function xp(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,x,v,p,m){let S=n[e];return S===void 0?(S={id:u.id,object:u,geometry:f,material:x,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:p,group:m},n[e]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=x,S.materialVariant=a(u),S.groupOrder=v,S.renderOrder=u.renderOrder,S.z=p,S.group=m),e++,S}function l(u,f,x,v,p,m){let S=o(u,f,x,v,p,m);x.transmission>0?i.push(S):x.transparent===!0?r.push(S):t.push(S)}function c(u,f,x,v,p,m){let S=o(u,f,x,v,p,m);x.transmission>0?i.unshift(S):x.transparent===!0?r.unshift(S):t.unshift(S)}function h(u,f){t.length>1&&t.sort(u||zy),i.length>1&&i.sort(f||gp),r.length>1&&r.sort(f||gp)}function d(){for(let u=e,f=n.length;u<f;u++){let x=n[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function Hy(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new xp,n.set(i,[a])):r>=s.length?(a=new xp,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function ky(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ae};break;case"SpotLight":t={position:new D,direction:new D,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function Vy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Gy=0;function Wy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Xy(n){let e=new ky,t=Vy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);let r=new D,s=new ct,a=new ct;function o(c){let h=0,d=0,u=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let f=0,x=0,v=0,p=0,m=0,S=0,w=0,b=0,C=0,E=0,P=0;c.sort(Wy);for(let A=0,I=c.length;A<I;A++){let R=c[A],F=R.color,W=R.intensity,X=R.distance,O=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===hr?O=R.shadow.map.texture:O=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=F.r*W,d+=F.g*W,u+=F.b*W;else if(R.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(R.sh.coefficients[H],W);P++}else if(R.isDirectionalLight){let H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let V=R.shadow,K=t.get(R);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,i.directionalShadow[f]=K,i.directionalShadowMap[f]=O,i.directionalShadowMatrix[f]=R.shadow.matrix,S++}i.directional[f]=H,f++}else if(R.isSpotLight){let H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(F).multiplyScalar(W),H.distance=X,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,i.spot[v]=H;let V=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,V.updateMatrices(R),R.castShadow&&E++),i.spotLightMatrix[v]=V.matrix,R.castShadow){let K=t.get(R);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,i.spotShadow[v]=K,i.spotShadowMap[v]=O,b++}v++}else if(R.isRectAreaLight){let H=e.get(R);H.color.copy(F).multiplyScalar(W),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=H,p++}else if(R.isPointLight){let H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){let V=R.shadow,K=t.get(R);K.shadowIntensity=V.intensity,K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,K.shadowCameraNear=V.camera.near,K.shadowCameraFar=V.camera.far,i.pointShadow[x]=K,i.pointShadowMap[x]=O,i.pointShadowMatrix[x]=R.shadow.matrix,w++}i.point[x]=H,x++}else if(R.isHemisphereLight){let H=e.get(R);H.skyColor.copy(R.color).multiplyScalar(W),H.groundColor.copy(R.groundColor).multiplyScalar(W),i.hemi[m]=H,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let y=i.hash;(y.directionalLength!==f||y.pointLength!==x||y.spotLength!==v||y.rectAreaLength!==p||y.hemiLength!==m||y.numDirectionalShadows!==S||y.numPointShadows!==w||y.numSpotShadows!==b||y.numSpotMaps!==C||y.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=p,i.point.length=x,i.hemi.length=m,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+C-E,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=P,y.directionalLength=f,y.pointLength=x,y.spotLength=v,y.rectAreaLength=p,y.hemiLength=m,y.numDirectionalShadows=S,y.numPointShadows=w,y.numSpotShadows=b,y.numSpotMaps=C,y.numLightProbes=P,i.version=Gy++)}function l(c,h){let d=0,u=0,f=0,x=0,v=0,p=h.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){let w=c[m];if(w.isDirectionalLight){let b=i.directional[d];b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),d++}else if(w.isSpotLight){let b=i.spot[f];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),f++}else if(w.isRectAreaLight){let b=i.rectArea[x];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),a.identity(),s.copy(w.matrixWorld),s.premultiply(p),a.extractRotation(s),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(w.isPointLight){let b=i.point[u];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),u++}else if(w.isHemisphereLight){let b=i.hemi[v];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:i}}function vp(n){let e=new Xy(n),t=[],i=[],r=[];function s(u){d.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function qy(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new vp(n),e.set(r,[o])):s>=a.length?(o=new vp(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var Yy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$y=`uniform sampler2D shadow_pass;
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
}`,Zy=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],jy=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],_p=new ct,eo=new D,Ph=new D;function Jy(n,e,t){let i=new Ls,r=new he,s=new he,a=new ut,o=new Pl,l=new Il,c={},h=t.maxTextureSize,d={[Bi]:Zt,[Zt]:Bi,[yn]:yn},u=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:Yy,fragmentShader:$y}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let x=new tt;x.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new st(x,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ba;let m=this.type;this.render=function(E,P,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===mf&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ba);let A=n.getRenderTarget(),I=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Sn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let W=m!==this.type;W&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=E.length;X<O;X++){let H=E[X],V=H.shadow;if(V===void 0){Ie("WebGLShadowMap:",H,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);let K=V.getFrameExtents();r.multiply(K),s.copy(V.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/K.x),r.x=s.x*K.x,V.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/K.y),r.y=s.y*K.y,V.mapSize.y=s.y));let ne=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=ne,V.map===null||W===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Os){if(H.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new vt(r.x,r.y,{format:hr,type:Tt,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),V.map.texture.name=H.name+".shadowMap",V.map.depthTexture=new zi(r.x,r.y,Hn),V.map.depthTexture.name=H.name+".shadowMapDepth",V.map.depthTexture.format=di,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft}else H.isPointLight?(V.map=new Bc(r.x),V.map.depthTexture=new Cl(r.x,ei)):(V.map=new vt(r.x,r.y),V.map.depthTexture=new zi(r.x,r.y,ei)),V.map.depthTexture.name=H.name+".shadowMap",V.map.depthTexture.format=di,this.type===Ba?(V.map.depthTexture.compareFunction=ne?Lc:Dc,V.map.depthTexture.minFilter=Ot,V.map.depthTexture.magFilter=Ot):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft);V.camera.updateProjectionMatrix()}let ue=V.map.isWebGLCubeRenderTarget?6:1;for(let Me=0;Me<ue;Me++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,Me),n.clear();else{Me===0&&(n.setRenderTarget(V.map),n.clear());let Re=V.getViewport(Me);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),F.viewport(a)}if(H.isPointLight){let Re=V.camera,it=V.matrix,ht=H.distance||Re.far;ht!==Re.far&&(Re.far=ht,Re.updateProjectionMatrix()),eo.setFromMatrixPosition(H.matrixWorld),Re.position.copy(eo),Ph.copy(Re.position),Ph.add(Zy[Me]),Re.up.copy(jy[Me]),Re.lookAt(Ph),Re.updateMatrixWorld(),it.makeTranslation(-eo.x,-eo.y,-eo.z),_p.multiplyMatrices(Re.projectionMatrix,Re.matrixWorldInverse),V._frustum.setFromProjectionMatrix(_p,Re.coordinateSystem,Re.reversedDepth)}else V.updateMatrices(H);i=V.getFrustum(),b(P,y,V.camera,H,this.type)}V.isPointLightShadow!==!0&&this.type===Os&&S(V,y),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(A,I,R)};function S(E,P){let y=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new vt(r.x,r.y,{format:hr,type:Tt})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,y,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,y,f,v,null)}function w(E,P,y,A){let I=null,R=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)I=R;else if(I=y.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let F=I.uuid,W=P.uuid,X=c[F];X===void 0&&(X={},c[F]=X);let O=X[W];O===void 0&&(O=I.clone(),X[W]=O,P.addEventListener("dispose",C)),I=O}if(I.visible=P.visible,I.wireframe=P.wireframe,A===Os?I.side=P.shadowSide!==null?P.shadowSide:P.side:I.side=P.shadowSide!==null?P.shadowSide:d[P.side],I.alphaMap=P.alphaMap,I.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,I.map=P.map,I.clipShadows=P.clipShadows,I.clippingPlanes=P.clippingPlanes,I.clipIntersection=P.clipIntersection,I.displacementMap=P.displacementMap,I.displacementScale=P.displacementScale,I.displacementBias=P.displacementBias,I.wireframeLinewidth=P.wireframeLinewidth,I.linewidth=P.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let F=n.properties.get(I);F.light=y}return I}function b(E,P,y,A,I){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===Os)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let W=e.update(E),X=E.material;if(Array.isArray(X)){let O=W.groups;for(let H=0,V=O.length;H<V;H++){let K=O[H],ne=X[K.materialIndex];if(ne&&ne.visible){let ue=w(E,ne,A,I);E.onBeforeShadow(n,E,P,y,W,ue,K),n.renderBufferDirect(y,null,W,ue,E,K),E.onAfterShadow(n,E,P,y,W,ue,K)}}}else if(X.visible){let O=w(E,X,A,I);E.onBeforeShadow(n,E,P,y,W,O,null),n.renderBufferDirect(y,null,W,O,E,null),E.onAfterShadow(n,E,P,y,W,O,null)}}let F=E.children;for(let W=0,X=F.length;W<X;W++)b(F[W],P,y,A,I)}function C(E){E.target.removeEventListener("dispose",C);for(let y in c){let A=c[y],I=E.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function Ky(n,e){function t(){let L=!1,se=new ut,Y=null,ve=new ut(0,0,0,0);return{setMask:function(le){Y!==le&&!L&&(n.colorMask(le,le,le,le),Y=le)},setLocked:function(le){L=le},setClear:function(le,ee,Te,He,Dt){Dt===!0&&(le*=He,ee*=He,Te*=He),se.set(le,ee,Te,He),ve.equals(se)===!1&&(n.clearColor(le,ee,Te,He),ve.copy(se))},reset:function(){L=!1,Y=null,ve.set(-1,0,0,0)}}}function i(){let L=!1,se=!1,Y=null,ve=null,le=null;return{setReversed:function(ee){if(se!==ee){let Te=e.get("EXT_clip_control");ee?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),se=ee;let He=le;le=null,this.setClear(He)}},getReversed:function(){return se},setTest:function(ee){ee?ae(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(ee){Y!==ee&&!L&&(n.depthMask(ee),Y=ee)},setFunc:function(ee){if(se&&(ee=$f[ee]),ve!==ee){switch(ee){case ll:n.depthFunc(n.NEVER);break;case cl:n.depthFunc(n.ALWAYS);break;case ul:n.depthFunc(n.LESS);break;case Lr:n.depthFunc(n.LEQUAL);break;case hl:n.depthFunc(n.EQUAL);break;case dl:n.depthFunc(n.GEQUAL);break;case fl:n.depthFunc(n.GREATER);break;case pl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=ee}},setLocked:function(ee){L=ee},setClear:function(ee){le!==ee&&(le=ee,se&&(ee=1-ee),n.clearDepth(ee))},reset:function(){L=!1,Y=null,ve=null,le=null,se=!1}}}function r(){let L=!1,se=null,Y=null,ve=null,le=null,ee=null,Te=null,He=null,Dt=null;return{setTest:function(ft){L||(ft?ae(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(ft){se!==ft&&!L&&(n.stencilMask(ft),se=ft)},setFunc:function(ft,Pi,oi){(Y!==ft||ve!==Pi||le!==oi)&&(n.stencilFunc(ft,Pi,oi),Y=ft,ve=Pi,le=oi)},setOp:function(ft,Pi,oi){(ee!==ft||Te!==Pi||He!==oi)&&(n.stencilOp(ft,Pi,oi),ee=ft,Te=Pi,He=oi)},setLocked:function(ft){L=ft},setClear:function(ft){Dt!==ft&&(n.clearStencil(ft),Dt=ft)},reset:function(){L=!1,se=null,Y=null,ve=null,le=null,ee=null,Te=null,He=null,Dt=null}}}let s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,x=[],v=null,p=!1,m=null,S=null,w=null,b=null,C=null,E=null,P=null,y=new Ae(0,0,0),A=0,I=!1,R=null,F=null,W=null,X=null,O=null,H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,K=0,ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(ne)[1]),V=K>=1):ne.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),V=K>=2);let ue=null,Me={},Re=n.getParameter(n.SCISSOR_BOX),it=n.getParameter(n.VIEWPORT),ht=new ut().fromArray(Re),Ve=new ut().fromArray(it);function j(L,se,Y,ve){let le=new Uint8Array(4),ee=n.createTexture();n.bindTexture(L,ee),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<Y;Te++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(se+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return ee}let ge={};ge[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),ge[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ge[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(n.DEPTH_TEST),a.setFunc(Lr),zt(!1),Rt(ih),ae(n.CULL_FACE),wt(Sn);function ae(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function Ne(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function ze(L,se){return u[L]!==se?(n.bindFramebuffer(L,se),u[L]=se,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=se),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=se),!0):!1}function Ue(L,se){let Y=x,ve=!1;if(L){Y=f.get(se),Y===void 0&&(Y=[],f.set(se,Y));let le=L.textures;if(Y.length!==le.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,Te=le.length;ee<Te;ee++)Y[ee]=n.COLOR_ATTACHMENT0+ee;Y.length=le.length,ve=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,ve=!0);ve&&n.drawBuffers(Y)}function Ct(L){return v!==L?(n.useProgram(L),v=L,!0):!1}let Je={[rr]:n.FUNC_ADD,[xf]:n.FUNC_SUBTRACT,[vf]:n.FUNC_REVERSE_SUBTRACT};Je[_f]=n.MIN,Je[yf]=n.MAX;let dt={[Sf]:n.ZERO,[Mf]:n.ONE,[bf]:n.SRC_COLOR,[al]:n.SRC_ALPHA,[Rf]:n.SRC_ALPHA_SATURATE,[Af]:n.DST_COLOR,[Ef]:n.DST_ALPHA,[wf]:n.ONE_MINUS_SRC_COLOR,[ol]:n.ONE_MINUS_SRC_ALPHA,[Cf]:n.ONE_MINUS_DST_COLOR,[Tf]:n.ONE_MINUS_DST_ALPHA,[Pf]:n.CONSTANT_COLOR,[If]:n.ONE_MINUS_CONSTANT_COLOR,[Df]:n.CONSTANT_ALPHA,[Lf]:n.ONE_MINUS_CONSTANT_ALPHA};function wt(L,se,Y,ve,le,ee,Te,He,Dt,ft){if(L===Sn){p===!0&&(Ne(n.BLEND),p=!1);return}if(p===!1&&(ae(n.BLEND),p=!0),L!==gf){if(L!==m||ft!==I){if((S!==rr||C!==rr)&&(n.blendEquation(n.FUNC_ADD),S=rr,C=rr),ft)switch(L){case Dr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ot:n.blendFunc(n.ONE,n.ONE);break;case rh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:De("WebGLState: Invalid blending: ",L);break}else switch(L){case Dr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ot:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case rh:De("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sh:De("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:De("WebGLState: Invalid blending: ",L);break}w=null,b=null,E=null,P=null,y.set(0,0,0),A=0,m=L,I=ft}return}le=le||se,ee=ee||Y,Te=Te||ve,(se!==S||le!==C)&&(n.blendEquationSeparate(Je[se],Je[le]),S=se,C=le),(Y!==w||ve!==b||ee!==E||Te!==P)&&(n.blendFuncSeparate(dt[Y],dt[ve],dt[ee],dt[Te]),w=Y,b=ve,E=ee,P=Te),(He.equals(y)===!1||Dt!==A)&&(n.blendColor(He.r,He.g,He.b,Dt),y.copy(He),A=Dt),m=L,I=!1}function Ze(L,se){L.side===yn?Ne(n.CULL_FACE):ae(n.CULL_FACE);let Y=L.side===Zt;se&&(Y=!Y),zt(Y),L.blending===Dr&&L.transparent===!1?wt(Sn):wt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);let ve=L.stencilWrite;o.setTest(ve),ve&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),N(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function zt(L){R!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),R=L)}function Rt(L){L!==ff?(ae(n.CULL_FACE),L!==F&&(L===ih?n.cullFace(n.BACK):L===pf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),F=L}function Cn(L){L!==W&&(V&&n.lineWidth(L),W=L)}function N(L,se,Y){L?(ae(n.POLYGON_OFFSET_FILL),(X!==se||O!==Y)&&(X=se,O=Y,a.getReversed()&&(se=-se),n.polygonOffset(se,Y))):Ne(n.POLYGON_OFFSET_FILL)}function Ht(L){L?ae(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function Ke(L){L===void 0&&(L=n.TEXTURE0+H-1),ue!==L&&(n.activeTexture(L),ue=L)}function _t(L,se,Y){Y===void 0&&(ue===null?Y=n.TEXTURE0+H-1:Y=ue);let ve=Me[Y];ve===void 0&&(ve={type:void 0,texture:void 0},Me[Y]=ve),(ve.type!==L||ve.texture!==se)&&(ue!==Y&&(n.activeTexture(Y),ue=Y),n.bindTexture(L,se||ge[L]),ve.type=L,ve.texture=se)}function de(){let L=Me[ue];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Pt(){try{n.compressedTexImage2D(...arguments)}catch(L){De("WebGLState:",L)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(L){De("WebGLState:",L)}}function _(){try{n.texSubImage2D(...arguments)}catch(L){De("WebGLState:",L)}}function B(){try{n.texSubImage3D(...arguments)}catch(L){De("WebGLState:",L)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(L){De("WebGLState:",L)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(L){De("WebGLState:",L)}}function ie(){try{n.texStorage2D(...arguments)}catch(L){De("WebGLState:",L)}}function ce(){try{n.texStorage3D(...arguments)}catch(L){De("WebGLState:",L)}}function q(){try{n.texImage2D(...arguments)}catch(L){De("WebGLState:",L)}}function Z(){try{n.texImage3D(...arguments)}catch(L){De("WebGLState:",L)}}function xe(L){return d[L]!==void 0?d[L]:n.getParameter(L)}function ye(L,se){d[L]!==se&&(n.pixelStorei(L,se),d[L]=se)}function oe(L){ht.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ht.copy(L))}function re(L){Ve.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ve.copy(L))}function Oe(L,se){let Y=c.get(se);Y===void 0&&(Y=new WeakMap,c.set(se,Y));let ve=Y.get(L);ve===void 0&&(ve=n.getUniformBlockIndex(se,L.name),Y.set(L,ve))}function Ge(L,se){let ve=c.get(se).get(L);l.get(se)!==ve&&(n.uniformBlockBinding(se,ve,L.__bindingPointIndex),l.set(se,ve))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},ue=null,Me={},u={},f=new WeakMap,x=[],v=null,p=!1,m=null,S=null,w=null,b=null,C=null,E=null,P=null,y=new Ae(0,0,0),A=0,I=!1,R=null,F=null,W=null,X=null,O=null,ht.set(0,0,n.canvas.width,n.canvas.height),Ve.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ae,disable:Ne,bindFramebuffer:ze,drawBuffers:Ue,useProgram:Ct,setBlending:wt,setMaterial:Ze,setFlipSided:zt,setCullFace:Rt,setLineWidth:Cn,setPolygonOffset:N,setScissorTest:Ht,activeTexture:Ke,bindTexture:_t,unbindTexture:de,compressedTexImage2D:Pt,compressedTexImage3D:T,texImage2D:q,texImage3D:Z,pixelStorei:ye,getParameter:xe,updateUBOMapping:Oe,uniformBlockBinding:Ge,texStorage2D:ie,texStorage3D:ce,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:$,compressedTexSubImage3D:te,scissor:oe,viewport:re,reset:at}}function Qy(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap,d=new Set,u,f=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,_){return x?new OffscreenCanvas(T,_):va("canvas")}function p(T,_,B){let $=1,te=Pt(T);if((te.width>B||te.height>B)&&($=B/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ie=Math.floor($*te.width),ce=Math.floor($*te.height);u===void 0&&(u=v(ie,ce));let q=_?v(ie,ce):u;return q.width=ie,q.height=ce,q.getContext("2d").drawImage(T,0,0,ie,ce),Ie("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ie+"x"+ce+")."),q}else return"data"in T&&Ie("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),T;return T}function m(T){return T.generateMipmaps}function S(T){n.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,_,B,$,te,ie=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ce;$&&(ce=e.get("EXT_texture_norm16"),ce||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=_;if(_===n.RED&&(B===n.FLOAT&&(q=n.R32F),B===n.HALF_FLOAT&&(q=n.R16F),B===n.UNSIGNED_BYTE&&(q=n.R8),B===n.UNSIGNED_SHORT&&ce&&(q=ce.R16_EXT),B===n.SHORT&&ce&&(q=ce.R16_SNORM_EXT)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.R8UI),B===n.UNSIGNED_SHORT&&(q=n.R16UI),B===n.UNSIGNED_INT&&(q=n.R32UI),B===n.BYTE&&(q=n.R8I),B===n.SHORT&&(q=n.R16I),B===n.INT&&(q=n.R32I)),_===n.RG&&(B===n.FLOAT&&(q=n.RG32F),B===n.HALF_FLOAT&&(q=n.RG16F),B===n.UNSIGNED_BYTE&&(q=n.RG8),B===n.UNSIGNED_SHORT&&ce&&(q=ce.RG16_EXT),B===n.SHORT&&ce&&(q=ce.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RG8UI),B===n.UNSIGNED_SHORT&&(q=n.RG16UI),B===n.UNSIGNED_INT&&(q=n.RG32UI),B===n.BYTE&&(q=n.RG8I),B===n.SHORT&&(q=n.RG16I),B===n.INT&&(q=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGB8UI),B===n.UNSIGNED_SHORT&&(q=n.RGB16UI),B===n.UNSIGNED_INT&&(q=n.RGB32UI),B===n.BYTE&&(q=n.RGB8I),B===n.SHORT&&(q=n.RGB16I),B===n.INT&&(q=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),B===n.UNSIGNED_INT&&(q=n.RGBA32UI),B===n.BYTE&&(q=n.RGBA8I),B===n.SHORT&&(q=n.RGBA16I),B===n.INT&&(q=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_SHORT&&ce&&(q=ce.RGB16_EXT),B===n.SHORT&&ce&&(q=ce.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),_===n.RGBA){let Z=ie?xa:qe.getTransfer(te);B===n.FLOAT&&(q=n.RGBA32F),B===n.HALF_FLOAT&&(q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(q=Z===et?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ce&&(q=ce.RGBA16_EXT),B===n.SHORT&&ce&&(q=ce.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function C(T,_){let B;return T?_===null||_===ei||_===zs?B=n.DEPTH24_STENCIL8:_===Hn?B=n.DEPTH32F_STENCIL8:_===Bs&&(B=n.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ei||_===zs?B=n.DEPTH_COMPONENT24:_===Hn?B=n.DEPTH_COMPONENT32F:_===Bs&&(B=n.DEPTH_COMPONENT16),B}function E(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ft&&T.minFilter!==Ot?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function P(T){let _=T.target;_.removeEventListener("dispose",P),A(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function y(T){let _=T.target;_.removeEventListener("dispose",y),R(_)}function A(T){let _=i.get(T);if(_.__webglInit===void 0)return;let B=T.source,$=f.get(B);if($){let te=$[_.__cacheKey];te.usedTimes--,te.usedTimes===0&&I(T),Object.keys($).length===0&&f.delete(B)}i.remove(T)}function I(T){let _=i.get(T);n.deleteTexture(_.__webglTexture);let B=T.source,$=f.get(B);delete $[_.__cacheKey],a.memory.textures--}function R(T){let _=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let te=0;te<_.__webglFramebuffer[$].length;te++)n.deleteFramebuffer(_.__webglFramebuffer[$][te]);else n.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)n.deleteFramebuffer(_.__webglFramebuffer[$]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=T.textures;for(let $=0,te=B.length;$<te;$++){let ie=i.get(B[$]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(B[$])}i.remove(T)}let F=0;function W(){F=0}function X(){return F}function O(T){F=T}function H(){let T=F;return T>=r.maxTextures&&Ie("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),F+=1,T}function V(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function K(T,_){let B=i.get(T);if(T.isVideoTexture&&_t(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let $=T.image;if($===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(B,T,_);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function ne(T,_){let B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Ne(B,T,_);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function ue(T,_){let B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Ne(B,T,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function Me(T,_){let B=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&B.__version!==T.version){ze(B,T,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}let Re={[ml]:n.REPEAT,[Dn]:n.CLAMP_TO_EDGE,[gl]:n.MIRRORED_REPEAT},it={[Ft]:n.NEAREST,[Uf]:n.NEAREST_MIPMAP_NEAREST,[qa]:n.NEAREST_MIPMAP_LINEAR,[Ot]:n.LINEAR,[$l]:n.LINEAR_MIPMAP_NEAREST,[cr]:n.LINEAR_MIPMAP_LINEAR},ht={[zf]:n.NEVER,[Wf]:n.ALWAYS,[Hf]:n.LESS,[Dc]:n.LEQUAL,[kf]:n.EQUAL,[Lc]:n.GEQUAL,[Vf]:n.GREATER,[Gf]:n.NOTEQUAL};function Ve(T,_){if(_.type===Hn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ot||_.magFilter===$l||_.magFilter===qa||_.magFilter===cr||_.minFilter===Ot||_.minFilter===$l||_.minFilter===qa||_.minFilter===cr)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Re[_.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Re[_.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Re[_.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,it[_.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,it[_.minFilter]),_.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ht[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ft||_.minFilter!==qa&&_.minFilter!==cr||_.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function j(T,_){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",P));let $=_.source,te=f.get($);te===void 0&&(te={},f.set($,te));let ie=V(_);if(ie!==T.__cacheKey){te[ie]===void 0&&(te[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),te[ie].usedTimes++;let ce=te[T.__cacheKey];ce!==void 0&&(te[T.__cacheKey].usedTimes--,ce.usedTimes===0&&I(_)),T.__cacheKey=ie,T.__webglTexture=te[ie].texture}return B}function ge(T,_,B){return Math.floor(Math.floor(T/B)/_)}function ae(T,_,B,$){let ie=T.updateRanges;if(ie.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,$,_.data);else{ie.sort((ye,oe)=>ye.start-oe.start);let ce=0;for(let ye=1;ye<ie.length;ye++){let oe=ie[ce],re=ie[ye],Oe=oe.start+oe.count,Ge=ge(re.start,_.width,4),at=ge(oe.start,_.width,4);re.start<=Oe+1&&Ge===at&&ge(re.start+re.count-1,_.width,4)===Ge?oe.count=Math.max(oe.count,re.start+re.count-oe.start):(++ce,ie[ce]=re)}ie.length=ce+1;let q=t.getParameter(n.UNPACK_ROW_LENGTH),Z=t.getParameter(n.UNPACK_SKIP_PIXELS),xe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ye=0,oe=ie.length;ye<oe;ye++){let re=ie[ye],Oe=Math.floor(re.start/4),Ge=Math.ceil(re.count/4),at=Oe%_.width,L=Math.floor(Oe/_.width),se=Ge,Y=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,at),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,at,L,se,Y,B,$,_.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(n.UNPACK_SKIP_ROWS,xe)}}function Ne(T,_,B){let $=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=n.TEXTURE_3D);let te=j(T,_),ie=_.source;t.bindTexture($,T.__webglTexture,n.TEXTURE0+B);let ce=i.get(ie);if(ie.version!==ce.__version||te===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let Y=qe.getPrimaries(qe.workingColorSpace),ve=_.colorSpace===Vi?null:qe.getPrimaries(_.colorSpace),le=_.colorSpace===Vi||Y===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=p(_.image,!1,r.maxTextureSize);Z=de(_,Z);let xe=s.convert(_.format,_.colorSpace),ye=s.convert(_.type),oe=b(_.internalFormat,xe,ye,_.normalized,_.colorSpace,_.isVideoTexture);Ve($,_);let re,Oe=_.mipmaps,Ge=_.isVideoTexture!==!0,at=ce.__version===void 0||te===!0,L=ie.dataReady,se=E(_,Z);if(_.isDepthTexture)oe=C(_.format===ur,_.type),at&&(Ge?t.texStorage2D(n.TEXTURE_2D,1,oe,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,oe,Z.width,Z.height,0,xe,ye,null));else if(_.isDataTexture)if(Oe.length>0){Ge&&at&&t.texStorage2D(n.TEXTURE_2D,se,oe,Oe[0].width,Oe[0].height);for(let Y=0,ve=Oe.length;Y<ve;Y++)re=Oe[Y],Ge?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,re.width,re.height,xe,ye,re.data):t.texImage2D(n.TEXTURE_2D,Y,oe,re.width,re.height,0,xe,ye,re.data);_.generateMipmaps=!1}else Ge?(at&&t.texStorage2D(n.TEXTURE_2D,se,oe,Z.width,Z.height),L&&ae(_,Z,xe,ye)):t.texImage2D(n.TEXTURE_2D,0,oe,Z.width,Z.height,0,xe,ye,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ge&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,oe,Oe[0].width,Oe[0].height,Z.depth);for(let Y=0,ve=Oe.length;Y<ve;Y++)if(re=Oe[Y],_.format!==kn)if(xe!==null)if(Ge){if(L)if(_.layerUpdates.size>0){let le=_h(re.width,re.height,_.format,_.type);for(let ee of _.layerUpdates){let Te=re.data.subarray(ee*le/re.data.BYTES_PER_ELEMENT,(ee+1)*le/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,ee,re.width,re.height,1,xe,Te)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,re.width,re.height,Z.depth,xe,re.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,oe,re.width,re.height,Z.depth,0,re.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,re.width,re.height,Z.depth,xe,ye,re.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Y,oe,re.width,re.height,Z.depth,0,xe,ye,re.data)}else{Ge&&at&&t.texStorage2D(n.TEXTURE_2D,se,oe,Oe[0].width,Oe[0].height);for(let Y=0,ve=Oe.length;Y<ve;Y++)re=Oe[Y],_.format!==kn?xe!==null?Ge?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,re.width,re.height,xe,re.data):t.compressedTexImage2D(n.TEXTURE_2D,Y,oe,re.width,re.height,0,re.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,re.width,re.height,xe,ye,re.data):t.texImage2D(n.TEXTURE_2D,Y,oe,re.width,re.height,0,xe,ye,re.data)}else if(_.isDataArrayTexture)if(Ge){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,oe,Z.width,Z.height,Z.depth),L)if(_.layerUpdates.size>0){let Y=_h(Z.width,Z.height,_.format,_.type);for(let ve of _.layerUpdates){let le=Z.data.subarray(ve*Y/Z.data.BYTES_PER_ELEMENT,(ve+1)*Y/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ve,Z.width,Z.height,1,xe,ye,le)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,xe,ye,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,oe,Z.width,Z.height,Z.depth,0,xe,ye,Z.data);else if(_.isData3DTexture)Ge?(at&&t.texStorage3D(n.TEXTURE_3D,se,oe,Z.width,Z.height,Z.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,xe,ye,Z.data)):t.texImage3D(n.TEXTURE_3D,0,oe,Z.width,Z.height,Z.depth,0,xe,ye,Z.data);else if(_.isFramebufferTexture){if(at)if(Ge)t.texStorage2D(n.TEXTURE_2D,se,oe,Z.width,Z.height);else{let Y=Z.width,ve=Z.height;for(let le=0;le<se;le++)t.texImage2D(n.TEXTURE_2D,le,oe,Y,ve,0,xe,ye,null),Y>>=1,ve>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let Y=n.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),Z.parentNode!==Y){Y.appendChild(Z),d.add(_),Y.onpaint=He=>{let Dt=He.changedElements;for(let ft of d)Dt.includes(ft.image)&&(ft.needsUpdate=!0)},Y.requestPaint();return}let ve=0,le=n.RGBA,ee=n.RGBA,Te=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,ve,le,ee,Te,Z),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Oe.length>0){if(Ge&&at){let Y=Pt(Oe[0]);t.texStorage2D(n.TEXTURE_2D,se,oe,Y.width,Y.height)}for(let Y=0,ve=Oe.length;Y<ve;Y++)re=Oe[Y],Ge?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,xe,ye,re):t.texImage2D(n.TEXTURE_2D,Y,oe,xe,ye,re);_.generateMipmaps=!1}else if(Ge){if(at){let Y=Pt(Z);t.texStorage2D(n.TEXTURE_2D,se,oe,Y.width,Y.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,xe,ye,Z)}else t.texImage2D(n.TEXTURE_2D,0,oe,xe,ye,Z);m(_)&&S($),ce.__version=ie.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function ze(T,_,B){if(_.image.length!==6)return;let $=j(T,_),te=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+B);let ie=i.get(te);if(te.version!==ie.__version||$===!0){t.activeTexture(n.TEXTURE0+B);let ce=qe.getPrimaries(qe.workingColorSpace),q=_.colorSpace===Vi?null:qe.getPrimaries(_.colorSpace),Z=_.colorSpace===Vi||ce===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let xe=_.isCompressedTexture||_.image[0].isCompressedTexture,ye=_.image[0]&&_.image[0].isDataTexture,oe=[];for(let ee=0;ee<6;ee++)!xe&&!ye?oe[ee]=p(_.image[ee],!0,r.maxCubemapSize):oe[ee]=ye?_.image[ee].image:_.image[ee],oe[ee]=de(_,oe[ee]);let re=oe[0],Oe=s.convert(_.format,_.colorSpace),Ge=s.convert(_.type),at=b(_.internalFormat,Oe,Ge,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,se=ie.__version===void 0||$===!0,Y=te.dataReady,ve=E(_,re);Ve(n.TEXTURE_CUBE_MAP,_);let le;if(xe){L&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,at,re.width,re.height);for(let ee=0;ee<6;ee++){le=oe[ee].mipmaps;for(let Te=0;Te<le.length;Te++){let He=le[Te];_.format!==kn?Oe!==null?L?Y&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,0,0,He.width,He.height,Oe,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,at,He.width,He.height,0,He.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,0,0,He.width,He.height,Oe,Ge,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,at,He.width,He.height,0,Oe,Ge,He.data)}}}else{if(le=_.mipmaps,L&&se){le.length>0&&ve++;let ee=Pt(oe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,at,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ye){L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,oe[ee].width,oe[ee].height,Oe,Ge,oe[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,at,oe[ee].width,oe[ee].height,0,Oe,Ge,oe[ee].data);for(let Te=0;Te<le.length;Te++){let Dt=le[Te].image[ee].image;L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,0,0,Dt.width,Dt.height,Oe,Ge,Dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,at,Dt.width,Dt.height,0,Oe,Ge,Dt.data)}}else{L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Oe,Ge,oe[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,at,Oe,Ge,oe[ee]);for(let Te=0;Te<le.length;Te++){let He=le[Te];L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,0,0,Oe,Ge,He.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,at,Oe,Ge,He.image[ee])}}}m(_)&&S(n.TEXTURE_CUBE_MAP),ie.__version=te.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ue(T,_,B,$,te,ie){let ce=s.convert(B.format,B.colorSpace),q=s.convert(B.type),Z=b(B.internalFormat,ce,q,B.normalized,B.colorSpace),xe=i.get(_),ye=i.get(B);if(ye.__renderTarget=_,!xe.__hasExternalTextures){let oe=Math.max(1,_.width>>ie),re=Math.max(1,_.height>>ie);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,ie,Z,oe,re,_.depth,0,ce,q,null):t.texImage2D(te,ie,Z,oe,re,0,ce,q,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Ke(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,te,ye.__webglTexture,0,Ht(_)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,te,ye.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ct(T,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,T),_.depthBuffer){let $=_.depthTexture,te=$&&$.isDepthTexture?$.type:null,ie=C(_.stencilBuffer,te),ce=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ke(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ht(_),ie,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ht(_),ie,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ie,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,T)}else{let $=_.textures;for(let te=0;te<$.length;te++){let ie=$[te],ce=s.convert(ie.format,ie.colorSpace),q=s.convert(ie.type),Z=b(ie.internalFormat,ce,q,ie.normalized,ie.colorSpace);Ke(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ht(_),Z,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ht(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Je(T,_,B){let $=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let te=i.get(_.depthTexture);if(te.__renderTarget=_,(!te.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(te.__webglInit===void 0&&(te.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Ve(n.TEXTURE_CUBE_MAP,_.depthTexture);let xe=s.convert(_.depthTexture.format),ye=s.convert(_.depthTexture.type),oe;_.depthTexture.format===di?oe=n.DEPTH_COMPONENT24:_.depthTexture.format===ur&&(oe=n.DEPTH24_STENCIL8);for(let re=0;re<6;re++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,oe,_.width,_.height,0,xe,ye,null)}}else K(_.depthTexture,0);let ie=te.__webglTexture,ce=Ht(_),q=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,Z=_.depthTexture.format===ur?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===di)Ke(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,q,ie,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,Z,q,ie,0);else if(_.depthTexture.format===ur)Ke(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,q,ie,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,Z,q,ie,0);else throw new Error("Unknown depthTexture format")}function dt(T){let _=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let $=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){let te=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),_.__depthDisposeCallback=te}_.__boundDepthTexture=$}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let $=0;$<6;$++)Je(_.__webglFramebuffer[$],T,$);else{let $=T.texture.mipmaps;$&&$.length>0?Je(_.__webglFramebuffer[0],T,0):Je(_.__webglFramebuffer,T,0)}else if(B){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=n.createRenderbuffer(),Ct(_.__webglDepthbuffer[$],T,!1);else{let te=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,ie)}}else{let $=T.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Ct(_.__webglDepthbuffer,T,!1);else{let te=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,ie)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(T,_,B){let $=i.get(T);_!==void 0&&Ue($.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&dt(T)}function Ze(T){let _=T.texture,B=i.get(T),$=i.get(_);T.addEventListener("dispose",y);let te=T.textures,ie=T.isWebGLCubeRenderTarget===!0,ce=te.length>1;if(ce||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=_.version,a.memory.textures++),ie){B.__webglFramebuffer=[];for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[q]=[];for(let Z=0;Z<_.mipmaps.length;Z++)B.__webglFramebuffer[q][Z]=n.createFramebuffer()}else B.__webglFramebuffer[q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let q=0;q<_.mipmaps.length;q++)B.__webglFramebuffer[q]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ce)for(let q=0,Z=te.length;q<Z;q++){let xe=i.get(te[q]);xe.__webglTexture===void 0&&(xe.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Ke(T)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let q=0;q<te.length;q++){let Z=te[q];B.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[q]);let xe=s.convert(Z.format,Z.colorSpace),ye=s.convert(Z.type),oe=b(Z.internalFormat,xe,ye,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),re=Ht(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,re,oe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,B.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Ct(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Ve(n.TEXTURE_CUBE_MAP,_);for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Ue(B.__webglFramebuffer[q][Z],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Z);else Ue(B.__webglFramebuffer[q],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);m(_)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let q=0,Z=te.length;q<Z;q++){let xe=te[q],ye=i.get(xe),oe=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,ye.__webglTexture),Ve(oe,xe),Ue(B.__webglFramebuffer,T,xe,n.COLOR_ATTACHMENT0+q,oe,0),m(xe)&&S(oe)}t.unbindTexture()}else{let q=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(q=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(q,$.__webglTexture),Ve(q,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Ue(B.__webglFramebuffer[Z],T,_,n.COLOR_ATTACHMENT0,q,Z);else Ue(B.__webglFramebuffer,T,_,n.COLOR_ATTACHMENT0,q,0);m(_)&&S(q),t.unbindTexture()}T.depthBuffer&&dt(T)}function zt(T){let _=T.textures;for(let B=0,$=_.length;B<$;B++){let te=_[B];if(m(te)){let ie=w(T),ce=i.get(te).__webglTexture;t.bindTexture(ie,ce),S(ie),t.unbindTexture()}}}let Rt=[],Cn=[];function N(T){if(T.samples>0){if(Ke(T)===!1){let _=T.textures,B=T.width,$=T.height,te=n.COLOR_BUFFER_BIT,ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(T),q=_.length>1;if(q)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);let Z=T.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=i.get(_[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ye,0)}n.blitFramebuffer(0,0,B,$,0,0,B,$,te,n.NEAREST),l===!0&&(Rt.length=0,Cn.length=0,Rt.push(n.COLOR_ATTACHMENT0+xe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Rt.push(ie),Cn.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Cn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Rt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=i.get(_[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let _=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Ht(T){return Math.min(r.maxSamples,T.samples)}function Ke(T){let _=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function _t(T){let _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function de(T,_){let B=T.colorSpace,$=T.format,te=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==ga&&B!==Vi&&(qe.getTransfer(B)===et?($!==kn||te!==sn)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):De("WebGLTextures: Unsupported texture color space:",B)),_}function Pt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=K,this.setTexture2DArray=ne,this.setTexture3D=ue,this.setTextureCube=Me,this.rebindTextures=wt,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=zt,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function eS(n,e){function t(i,r=Vi){let s,a=qe.getTransfer(r);if(i===sn)return n.UNSIGNED_BYTE;if(i===jl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Jl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===uh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===hh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===lh)return n.BYTE;if(i===ch)return n.SHORT;if(i===Bs)return n.UNSIGNED_SHORT;if(i===Zl)return n.INT;if(i===ei)return n.UNSIGNED_INT;if(i===Hn)return n.FLOAT;if(i===Tt)return n.HALF_FLOAT;if(i===dh)return n.ALPHA;if(i===fh)return n.RGB;if(i===kn)return n.RGBA;if(i===di)return n.DEPTH_COMPONENT;if(i===ur)return n.DEPTH_STENCIL;if(i===Hs)return n.RED;if(i===Kl)return n.RED_INTEGER;if(i===hr)return n.RG;if(i===Ql)return n.RG_INTEGER;if(i===ec)return n.RGBA_INTEGER;if(i===Ya||i===$a||i===Za||i===ja)if(a===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ya)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===$a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ja)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ya)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===$a)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ja)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tc||i===nc||i===ic||i===rc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===tc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ic)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===rc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===sc||i===ac||i===oc||i===lc||i===cc||i===Ja||i===uc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===sc||i===ac)return a===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===oc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===lc)return s.COMPRESSED_R11_EAC;if(i===cc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ja)return s.COMPRESSED_RG11_EAC;if(i===uc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===hc||i===dc||i===fc||i===pc||i===mc||i===gc||i===xc||i===vc||i===_c||i===yc||i===Sc||i===Mc||i===bc||i===wc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===hc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===dc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===fc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===pc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===gc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_c)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===bc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wc)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ec||i===Tc||i===Ac)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ec)return a===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Tc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ac)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cc||i===Rc||i===Ka||i===Pc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Cc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Rc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ka)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var tS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nS=`
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

}`,Bh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Pa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new $e({vertexShader:tS,fragmentShader:nS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new La(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},zh=class extends fi{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,x=null,v=typeof XRWebGLBinding<"u",p=new Bh,m={},S=t.getContextAttributes(),w=null,b=null,C=[],E=[],P=new he,y=null,A=new $t;A.viewport=new ut;let I=new $t;I.viewport=new ut;let R=[A,I],F=new Gl,W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ge=C[j];return ge===void 0&&(ge=new Is,C[j]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(j){let ge=C[j];return ge===void 0&&(ge=new Is,C[j]=ge),ge.getGripSpace()},this.getHand=function(j){let ge=C[j];return ge===void 0&&(ge=new Is,C[j]=ge),ge.getHandSpace()};function O(j){let ge=E.indexOf(j.inputSource);if(ge===-1)return;let ae=C[ge];ae!==void 0&&(ae.update(j.inputSource,j.frame,c||a),ae.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",V);for(let j=0;j<C.length;j++){let ge=E[j];ge!==null&&(E[j]=null,C[j].disconnect(ge))}W=null,X=null,p.reset();for(let j in m)delete m[j];e.setRenderTarget(w),f=null,u=null,d=null,r=null,b=null,Ve.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",H),r.addEventListener("inputsourceschange",V),S.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Ne=null,ze=null;S.depth&&(ze=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=S.stencil?ur:di,Ne=S.stencil?zs:ei);let Ue={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Ue),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new vt(u.textureWidth,u.textureHeight,{format:kn,type:sn,depthTexture:new zi(u.textureWidth,u.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ae={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new vt(f.framebufferWidth,f.framebufferHeight,{format:kn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ve.setContext(r),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function V(j){for(let ge=0;ge<j.removed.length;ge++){let ae=j.removed[ge],Ne=E.indexOf(ae);Ne>=0&&(E[Ne]=null,C[Ne].disconnect(ae))}for(let ge=0;ge<j.added.length;ge++){let ae=j.added[ge],Ne=E.indexOf(ae);if(Ne===-1){for(let Ue=0;Ue<C.length;Ue++)if(Ue>=E.length){E.push(ae),Ne=Ue;break}else if(E[Ue]===null){E[Ue]=ae,Ne=Ue;break}if(Ne===-1)break}let ze=C[Ne];ze&&ze.connect(ae)}}let K=new D,ne=new D;function ue(j,ge,ae){K.setFromMatrixPosition(ge.matrixWorld),ne.setFromMatrixPosition(ae.matrixWorld);let Ne=K.distanceTo(ne),ze=ge.projectionMatrix.elements,Ue=ae.projectionMatrix.elements,Ct=ze[14]/(ze[10]-1),Je=ze[14]/(ze[10]+1),dt=(ze[9]+1)/ze[5],wt=(ze[9]-1)/ze[5],Ze=(ze[8]-1)/ze[0],zt=(Ue[8]+1)/Ue[0],Rt=Ct*Ze,Cn=Ct*zt,N=Ne/(-Ze+zt),Ht=N*-Ze;if(ge.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ht),j.translateZ(N),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ze[10]===-1)j.projectionMatrix.copy(ge.projectionMatrix),j.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{let Ke=Ct+N,_t=Je+N,de=Rt-Ht,Pt=Cn+(Ne-Ht),T=dt*Je/_t*Ke,_=wt*Je/_t*Ke;j.projectionMatrix.makePerspective(de,Pt,T,_,Ke,_t),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Me(j,ge){ge===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ge.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ge=j.near,ae=j.far;p.texture!==null&&(p.depthNear>0&&(ge=p.depthNear),p.depthFar>0&&(ae=p.depthFar)),F.near=I.near=A.near=ge,F.far=I.far=A.far=ae,(W!==F.near||X!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),W=F.near,X=F.far),F.layers.mask=j.layers.mask|6,A.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;let Ne=j.parent,ze=F.cameras;Me(F,Ne);for(let Ue=0;Ue<ze.length;Ue++)Me(ze[Ue],Ne);ze.length===2?ue(F,A,I):F.projectionMatrix.copy(A.projectionMatrix),Re(j,F,Ne)};function Re(j,ge,ae){ae===null?j.matrix.copy(ge.matrixWorld):(j.matrix.copy(ae.matrixWorld),j.matrix.invert(),j.matrix.multiply(ge.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ge.projectionMatrix),j.projectionMatrixInverse.copy(ge.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Cs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(j){return m[j]};let it=null;function ht(j,ge){if(h=ge.getViewerPose(c||a),x=ge,h!==null){let ae=h.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let Ne=!1;ae.length!==F.cameras.length&&(F.cameras.length=0,Ne=!0);for(let Je=0;Je<ae.length;Je++){let dt=ae[Je],wt=null;if(f!==null)wt=f.getViewport(dt);else{let zt=d.getViewSubImage(u,dt);wt=zt.viewport,Je===0&&(e.setRenderTargetTextures(b,zt.colorTexture,zt.depthStencilTexture),e.setRenderTarget(b))}let Ze=R[Je];Ze===void 0&&(Ze=new $t,Ze.layers.enable(Je),Ze.viewport=new ut,R[Je]=Ze),Ze.matrix.fromArray(dt.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(dt.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(wt.x,wt.y,wt.width,wt.height),Je===0&&(F.matrix.copy(Ze.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ne===!0&&F.cameras.push(Ze)}let ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=i.getBinding();let Je=d.getDepthInformation(ae[0]);Je&&Je.isValid&&Je.texture&&p.init(Je,r.renderState)}if(ze&&ze.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Je=0;Je<ae.length;Je++){let dt=ae[Je].camera;if(dt){let wt=m[dt];wt||(wt=new Pa,m[dt]=wt);let Ze=d.getCameraImage(dt);wt.sourceTexture=Ze}}}}for(let ae=0;ae<C.length;ae++){let Ne=E[ae],ze=C[ae];Ne!==null&&ze!==void 0&&ze.update(Ne,ge,c||a)}it&&it(j,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),x=null}let Ve=new yp;Ve.setAnimationLoop(ht),this.setAnimationLoop=function(j){it=j},this.dispose=function(){}}},iS=new ct,Tp=new Be;Tp.set(-1,0,0,0,1,0,0,0,1);function rS(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,gh(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,S,w,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(s(p,m),x(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,S,w):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Zt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Zt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let S=e.get(m),w=S.envMap,b=S.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(iS.makeRotationFromEuler(b)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Tp),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,S,w){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=w*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Zt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let S=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function sS(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){let b=w.program;i.uniformBlockBinding(S,b)}function c(S,w){let b=r[S.id];b===void 0&&(x(S),b=h(S),r[S.id]=b,S.addEventListener("dispose",p));let C=w.program;i.updateUBOMapping(S,C);let E=e.render.frame;s[S.id]!==E&&(u(S),s[S.id]=E)}function h(S){let w=d();S.__bindingPointIndex=w;let b=n.createBuffer(),C=S.__size,E=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,C,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return De("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){let w=r[S.id],b=S.uniforms,C=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let E=0,P=b.length;E<P;E++){let y=Array.isArray(b[E])?b[E]:[b[E]];for(let A=0,I=y.length;A<I;A++){let R=y[A];if(f(R,E,A,C)===!0){let F=R.__offset,W=Array.isArray(R.value)?R.value:[R.value],X=0;for(let O=0;O<W.length;O++){let H=W[O],V=v(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,F+X,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):ArrayBuffer.isView(H)?R.__data.set(new H.constructor(H.buffer,H.byteOffset,R.__data.length)):(H.toArray(R.__data,X),X+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,w,b,C){let E=S.value,P=w+"_"+b;if(C[P]===void 0)return typeof E=="number"||typeof E=="boolean"?C[P]=E:ArrayBuffer.isView(E)?C[P]=E.slice():C[P]=E.clone(),!0;{let y=C[P];if(typeof E=="number"||typeof E=="boolean"){if(y!==E)return C[P]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(y.equals(E)===!1)return y.copy(E),!0}}return!1}function x(S){let w=S.uniforms,b=0,C=16;for(let P=0,y=w.length;P<y;P++){let A=Array.isArray(w[P])?w[P]:[w[P]];for(let I=0,R=A.length;I<R;I++){let F=A[I],W=Array.isArray(F.value)?F.value:[F.value];for(let X=0,O=W.length;X<O;X++){let H=W[X],V=v(H),K=b%C,ne=K%V.boundary,ue=K+ne;b+=ne,ue!==0&&C-ue<V.storage&&(b+=C-ue),F.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=b,b+=V.storage}}}let E=b%C;return E>0&&(b+=C-E),S.__size=b,S.__cache={},this}function v(S){let w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(w.boundary=16,w.storage=S.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",S),w}function p(S){let w=S.target;w.removeEventListener("dispose",p);let b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function m(){for(let S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var aS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_i=null;function oS(){return _i===null&&(_i=new Ur(aS,16,16,hr,Tt),_i.name="DFG_LUT",_i.minFilter=Ot,_i.magFilter=Ot,_i.wrapS=Dn,_i.wrapT=Dn,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}var zc=class{constructor(e={}){let{canvas:t=Xf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=sn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;let v=f,p=new Set([ec,Ql,Kl]),m=new Set([sn,ei,Bs,zs,jl,Jl]),S=new Uint32Array(4),w=new Int32Array(4),b=new D,C=null,E=null,P=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,R=!1,F=null;this._outputColorSpace=nn;let W=0,X=0,O=null,H=-1,V=null,K=new ut,ne=new ut,ue=null,Me=new Ae(0),Re=0,it=t.width,ht=t.height,Ve=1,j=null,ge=null,ae=new ut(0,0,it,ht),Ne=new ut(0,0,it,ht),ze=!1,Ue=new Ls,Ct=!1,Je=!1,dt=new ct,wt=new D,Ze=new ut,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Rt=!1;function Cn(){return O===null?Ve:1}let N=i;function Ht(M,U){return t.getContext(M,U)}try{let M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xl}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",He,!1),N===null){let U="webgl2";if(N=Ht(U,M),N===null)throw Ht(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw De("WebGLRenderer: "+M.message),M}let Ke,_t,de,Pt,T,_,B,$,te,ie,ce,q,Z,xe,ye,oe,re,Oe,Ge,at,L,se,Y;function ve(){Ke=new p_(N),Ke.init(),L=new eS(N,Ke),_t=new a_(N,Ke,e,L),de=new Ky(N,Ke),_t.reversedDepthBuffer&&u&&de.buffers.depth.setReversed(!0),Pt=new x_(N),T=new By,_=new Qy(N,Ke,de,T,_t,L,Pt),B=new f_(I),$=new Sg(N),se=new r_(N,$),te=new m_(N,$,Pt,se),ie=new __(N,te,$,se,Pt),Oe=new v_(N,_t,_),ye=new o_(T),ce=new Oy(I,B,Ke,_t,se,ye),q=new rS(I,T),Z=new Hy,xe=new qy(Ke),re=new i_(I,B,de,ie,x,l),oe=new Jy(I,ie,_t),Y=new sS(N,Pt,_t,de),Ge=new s_(N,Ke,Pt),at=new g_(N,Ke,Pt),Pt.programs=ce.programs,I.capabilities=_t,I.extensions=Ke,I.properties=T,I.renderLists=Z,I.shadowMap=oe,I.state=de,I.info=Pt}ve(),v!==sn&&(A=new S_(v,t.width,t.height,r,s));let le=new zh(I,N);this.xr=le,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let M=Ke.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Ke.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Ve},this.setPixelRatio=function(M){M!==void 0&&(Ve=M,this.setSize(it,ht,!1))},this.getSize=function(M){return M.set(it,ht)},this.setSize=function(M,U,G=!0){if(le.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}it=M,ht=U,t.width=Math.floor(M*Ve),t.height=Math.floor(U*Ve),G===!0&&(t.style.width=M+"px",t.style.height=U+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(it*Ve,ht*Ve).floor()},this.setDrawingBufferSize=function(M,U,G){it=M,ht=U,Ve=G,t.width=Math.floor(M*G),t.height=Math.floor(U*G),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(v===sn){De("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){Ie("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(K)},this.getViewport=function(M){return M.copy(ae)},this.setViewport=function(M,U,G,z){M.isVector4?ae.set(M.x,M.y,M.z,M.w):ae.set(M,U,G,z),de.viewport(K.copy(ae).multiplyScalar(Ve).round())},this.getScissor=function(M){return M.copy(Ne)},this.setScissor=function(M,U,G,z){M.isVector4?Ne.set(M.x,M.y,M.z,M.w):Ne.set(M,U,G,z),de.scissor(ne.copy(Ne).multiplyScalar(Ve).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(M){de.setScissorTest(ze=M)},this.setOpaqueSort=function(M){j=M},this.setTransparentSort=function(M){ge=M},this.getClearColor=function(M){return M.copy(re.getClearColor())},this.setClearColor=function(){re.setClearColor(...arguments)},this.getClearAlpha=function(){return re.getClearAlpha()},this.setClearAlpha=function(){re.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,G=!0){let z=0;if(M){let k=!1;if(O!==null){let me=O.texture.format;k=p.has(me)}if(k){let me=O.texture.type,Se=m.has(me),pe=re.getClearColor(),Ee=re.getClearAlpha(),Ce=pe.r,ke=pe.g,Xe=pe.b;Se?(S[0]=Ce,S[1]=ke,S[2]=Xe,S[3]=Ee,N.clearBufferuiv(N.COLOR,0,S)):(w[0]=Ce,w[1]=ke,w[2]=Xe,w[3]=Ee,N.clearBufferiv(N.COLOR,0,w))}else z|=N.COLOR_BUFFER_BIT}U&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",He,!1),re.dispose(),Z.dispose(),xe.dispose(),T.dispose(),B.dispose(),ie.dispose(),se.dispose(),Y.dispose(),ce.dispose(),le.dispose(),le.removeEventListener("sessionstart",Ed),le.removeEventListener("sessionend",Td),Tr.stop()};function ee(M){M.preventDefault(),_a("WebGLRenderer: Context Lost."),R=!0}function Te(){_a("WebGLRenderer: Context Restored."),R=!1;let M=Pt.autoReset,U=oe.enabled,G=oe.autoUpdate,z=oe.needsUpdate,k=oe.type;ve(),Pt.autoReset=M,oe.enabled=U,oe.autoUpdate=G,oe.needsUpdate=z,oe.type=k}function He(M){De("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Dt(M){let U=M.target;U.removeEventListener("dispose",Dt),ft(U)}function ft(M){Pi(M),T.remove(M)}function Pi(M){let U=T.get(M).programs;U!==void 0&&(U.forEach(function(G){ce.releaseProgram(G)}),M.isShaderMaterial&&ce.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,G,z,k,me){U===null&&(U=zt);let Se=k.isMesh&&k.matrixWorld.determinant()<0,pe=_0(M,U,G,z,k);de.setMaterial(z,Se);let Ee=G.index,Ce=1;if(z.wireframe===!0){if(Ee=te.getWireframeAttribute(G),Ee===void 0)return;Ce=2}let ke=G.drawRange,Xe=G.attributes.position,Pe=ke.start*Ce,pt=(ke.start+ke.count)*Ce;me!==null&&(Pe=Math.max(Pe,me.start*Ce),pt=Math.min(pt,(me.start+me.count)*Ce)),Ee!==null?(Pe=Math.max(Pe,0),pt=Math.min(pt,Ee.count)):Xe!=null&&(Pe=Math.max(Pe,0),pt=Math.min(pt,Xe.count));let Lt=pt-Pe;if(Lt<0||Lt===1/0)return;se.setup(k,z,pe,G,Ee);let It,gt=Ge;if(Ee!==null&&(It=$.get(Ee),gt=at,gt.setIndex(It)),k.isMesh)z.wireframe===!0?(de.setLineWidth(z.wireframeLinewidth*Cn()),gt.setMode(N.LINES)):gt.setMode(N.TRIANGLES);else if(k.isLine){let Qt=z.linewidth;Qt===void 0&&(Qt=1),de.setLineWidth(Qt*Cn()),k.isLineSegments?gt.setMode(N.LINES):k.isLineLoop?gt.setMode(N.LINE_LOOP):gt.setMode(N.LINE_STRIP)}else k.isPoints?gt.setMode(N.POINTS):k.isSprite&&gt.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))gt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Qt=k._multiDrawStarts,_e=k._multiDrawCounts,Rn=k._multiDrawCount,rt=Ee?$.get(Ee).bytesPerElement:1,Bn=T.get(z).currentProgram.getUniforms();for(let li=0;li<Rn;li++)Bn.setValue(N,"_gl_DrawID",li),gt.render(Qt[li]/rt,_e[li])}else if(k.isInstancedMesh)gt.renderInstances(Pe,Lt,k.count);else if(G.isInstancedBufferGeometry){let Qt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,_e=Math.min(G.instanceCount,Qt);gt.renderInstances(Pe,Lt,_e)}else gt.render(Pe,Lt)};function oi(M,U,G){M.transparent===!0&&M.side===yn&&M.forceSinglePass===!1?(M.side=Zt,M.needsUpdate=!0,Ao(M,U,G),M.side=Bi,M.needsUpdate=!0,Ao(M,U,G),M.side=yn):Ao(M,U,G)}this.compile=function(M,U,G=null){G===null&&(G=M),E=xe.get(G),E.init(U),y.push(E),G.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),M!==G&&M.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),E.setupLights();let z=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let me=k.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){let pe=me[Se];oi(pe,G,k),z.add(pe)}else oi(me,G,k),z.add(me)}),E=y.pop(),z},this.compileAsync=function(M,U,G=null){let z=this.compile(M,U,G);return new Promise(k=>{function me(){if(z.forEach(function(Se){T.get(Se).currentProgram.isReady()&&z.delete(Se)}),z.size===0){k(M);return}setTimeout(me,10)}Ke.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let _u=null;function x0(M){_u&&_u(M)}function Ed(){Tr.stop()}function Td(){Tr.start()}let Tr=new yp;Tr.setAnimationLoop(x0),typeof self<"u"&&Tr.setContext(self),this.setAnimationLoop=function(M){_u=M,le.setAnimationLoop(M),M===null?Tr.stop():Tr.start()},le.addEventListener("sessionstart",Ed),le.addEventListener("sessionend",Td),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){De("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;F!==null&&F.renderStart(M,U);let G=le.enabled===!0&&le.isPresenting===!0,z=A!==null&&(O===null||G)&&A.begin(I,O);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),M.isScene===!0&&M.onBeforeRender(I,M,U,O),E=xe.get(M,y.length),E.init(U),E.state.textureUnits=_.getTextureUnits(),y.push(E),dt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ue.setFromProjectionMatrix(dt,jn,U.reversedDepth),Je=this.localClippingEnabled,Ct=ye.init(this.clippingPlanes,Je),C=Z.get(M,P.length),C.init(),P.push(C),le.enabled===!0&&le.isPresenting===!0){let Se=I.xr.getDepthSensingMesh();Se!==null&&yu(Se,U,-1/0,I.sortObjects)}yu(M,U,0,I.sortObjects),C.finish(),I.sortObjects===!0&&C.sort(j,ge),Rt=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Rt&&re.addToRenderList(C,M),this.info.render.frame++,Ct===!0&&ye.beginShadows();let k=E.state.shadowsArray;if(oe.render(k,M,U),Ct===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&A.hasRenderPass())===!1){let Se=C.opaque,pe=C.transmissive;if(E.setupLights(),U.isArrayCamera){let Ee=U.cameras;if(pe.length>0)for(let Ce=0,ke=Ee.length;Ce<ke;Ce++){let Xe=Ee[Ce];Cd(Se,pe,M,Xe)}Rt&&re.render(M);for(let Ce=0,ke=Ee.length;Ce<ke;Ce++){let Xe=Ee[Ce];Ad(C,M,Xe,Xe.viewport)}}else pe.length>0&&Cd(Se,pe,M,U),Rt&&re.render(M),Ad(C,M,U)}O!==null&&X===0&&(_.updateMultisampleRenderTarget(O),_.updateRenderTargetMipmap(O)),z&&A.end(I),M.isScene===!0&&M.onAfterRender(I,M,U),se.resetDefaultState(),H=-1,V=null,y.pop(),y.length>0?(E=y[y.length-1],_.setTextureUnits(E.state.textureUnits),Ct===!0&&ye.setGlobalState(I.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?C=P[P.length-1]:C=null,F!==null&&F.renderEnd()};function yu(M,U,G,z){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ue.intersectsSprite(M)){z&&Ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(dt);let Se=ie.update(M),pe=M.material;pe.visible&&C.push(M,Se,pe,G,Ze.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ue.intersectsObject(M))){let Se=ie.update(M),pe=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ze.copy(M.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ze.copy(Se.boundingSphere.center)),Ze.applyMatrix4(M.matrixWorld).applyMatrix4(dt)),Array.isArray(pe)){let Ee=Se.groups;for(let Ce=0,ke=Ee.length;Ce<ke;Ce++){let Xe=Ee[Ce],Pe=pe[Xe.materialIndex];Pe&&Pe.visible&&C.push(M,Se,Pe,G,Ze.z,Xe)}}else pe.visible&&C.push(M,Se,pe,G,Ze.z,null)}}let me=M.children;for(let Se=0,pe=me.length;Se<pe;Se++)yu(me[Se],U,G,z)}function Ad(M,U,G,z){let{opaque:k,transmissive:me,transparent:Se}=M;E.setupLightsView(G),Ct===!0&&ye.setGlobalState(I.clippingPlanes,G),z&&de.viewport(K.copy(z)),k.length>0&&To(k,U,G),me.length>0&&To(me,U,G),Se.length>0&&To(Se,U,G),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Cd(M,U,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){let Pe=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new vt(1,1,{generateMipmaps:!0,type:Pe?Tt:sn,minFilter:cr,samples:Math.max(4,_t.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}let me=E.state.transmissionRenderTarget[z.id],Se=z.viewport||K;me.setSize(Se.z*I.transmissionResolutionScale,Se.w*I.transmissionResolutionScale);let pe=I.getRenderTarget(),Ee=I.getActiveCubeFace(),Ce=I.getActiveMipmapLevel();I.setRenderTarget(me),I.getClearColor(Me),Re=I.getClearAlpha(),Re<1&&I.setClearColor(16777215,.5),I.clear(),Rt&&re.render(G);let ke=I.toneMapping;I.toneMapping=Qn;let Xe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),Ct===!0&&ye.setGlobalState(I.clippingPlanes,z),To(M,G,z),_.updateMultisampleRenderTarget(me),_.updateRenderTargetMipmap(me),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let pt=0,Lt=U.length;pt<Lt;pt++){let It=U[pt],{object:gt,geometry:Qt,material:_e,group:Rn}=It;if(_e.side===yn&&gt.layers.test(z.layers)){let rt=_e.side;_e.side=Zt,_e.needsUpdate=!0,Rd(gt,G,z,Qt,_e,Rn),_e.side=rt,_e.needsUpdate=!0,Pe=!0}}Pe===!0&&(_.updateMultisampleRenderTarget(me),_.updateRenderTargetMipmap(me))}I.setRenderTarget(pe,Ee,Ce),I.setClearColor(Me,Re),Xe!==void 0&&(z.viewport=Xe),I.toneMapping=ke}function To(M,U,G){let z=U.isScene===!0?U.overrideMaterial:null;for(let k=0,me=M.length;k<me;k++){let Se=M[k],{object:pe,geometry:Ee,group:Ce}=Se,ke=Se.material;ke.allowOverride===!0&&z!==null&&(ke=z),pe.layers.test(G.layers)&&Rd(pe,U,G,Ee,ke,Ce)}}function Rd(M,U,G,z,k,me){M.onBeforeRender(I,U,G,z,k,me),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(I,U,G,z,M,me),k.transparent===!0&&k.side===yn&&k.forceSinglePass===!1?(k.side=Zt,k.needsUpdate=!0,I.renderBufferDirect(G,U,z,k,M,me),k.side=Bi,k.needsUpdate=!0,I.renderBufferDirect(G,U,z,k,M,me),k.side=yn):I.renderBufferDirect(G,U,z,k,M,me),M.onAfterRender(I,U,G,z,k,me)}function Ao(M,U,G){U.isScene!==!0&&(U=zt);let z=T.get(M),k=E.state.lights,me=E.state.shadowsArray,Se=k.state.version,pe=ce.getParameters(M,k.state,me,U,G,E.state.lightProbeGridArray),Ee=ce.getProgramCacheKey(pe),Ce=z.programs;z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;let ke=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;z.envMap=B.get(M.envMap||z.environment,ke),z.envMapRotation=z.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ce===void 0&&(M.addEventListener("dispose",Dt),Ce=new Map,z.programs=Ce);let Xe=Ce.get(Ee);if(Xe!==void 0){if(z.currentProgram===Xe&&z.lightsStateVersion===Se)return Id(M,pe),Xe}else pe.uniforms=ce.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,G,pe),M.onBeforeCompile(pe,I),Xe=ce.acquireProgram(pe,Ee),Ce.set(Ee,Xe),z.uniforms=pe.uniforms;let Pe=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=ye.uniform),Id(M,pe),z.needsLights=S0(M),z.lightsStateVersion=Se,z.needsLights&&(Pe.ambientLightColor.value=k.state.ambient,Pe.lightProbe.value=k.state.probe,Pe.directionalLights.value=k.state.directional,Pe.directionalLightShadows.value=k.state.directionalShadow,Pe.spotLights.value=k.state.spot,Pe.spotLightShadows.value=k.state.spotShadow,Pe.rectAreaLights.value=k.state.rectArea,Pe.ltc_1.value=k.state.rectAreaLTC1,Pe.ltc_2.value=k.state.rectAreaLTC2,Pe.pointLights.value=k.state.point,Pe.pointLightShadows.value=k.state.pointShadow,Pe.hemisphereLights.value=k.state.hemi,Pe.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Pe.spotLightMatrix.value=k.state.spotLightMatrix,Pe.spotLightMap.value=k.state.spotLightMap,Pe.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=E.state.lightProbeGridArray.length>0,z.currentProgram=Xe,z.uniformsList=null,Xe}function Pd(M){if(M.uniformsList===null){let U=M.currentProgram.getUniforms();M.uniformsList=Vs.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Id(M,U){let G=T.get(M);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function v0(M,U){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(U.matrixWorld);for(let G=0,z=M.length;G<z;G++){let k=M[G];if(k.texture!==null&&k.boundingBox.containsPoint(b))return k}return null}function _0(M,U,G,z,k){U.isScene!==!0&&(U=zt),_.resetTextureUnits();let me=U.fog,Se=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,pe=O===null?I.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:qe.workingColorSpace,Ee=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ce=B.get(z.envMap||Se,Ee),ke=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Xe=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Pe=!!G.morphAttributes.position,pt=!!G.morphAttributes.normal,Lt=!!G.morphAttributes.color,It=Qn;z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(It=I.toneMapping);let gt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Qt=gt!==void 0?gt.length:0,_e=T.get(z),Rn=E.state.lights;if(Ct===!0&&(Je===!0||M!==V)){let yt=M===V&&z.id===H;ye.setState(z,M,yt)}let rt=!1;z.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Rn.state.version||_e.outputColorSpace!==pe||k.isBatchedMesh&&_e.batching===!1||!k.isBatchedMesh&&_e.batching===!0||k.isBatchedMesh&&_e.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&_e.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&_e.instancing===!1||!k.isInstancedMesh&&_e.instancing===!0||k.isSkinnedMesh&&_e.skinning===!1||!k.isSkinnedMesh&&_e.skinning===!0||k.isInstancedMesh&&_e.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&_e.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&_e.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&_e.instancingMorph===!1&&k.morphTexture!==null||_e.envMap!==Ce||z.fog===!0&&_e.fog!==me||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==ye.numPlanes||_e.numIntersection!==ye.numIntersection)||_e.vertexAlphas!==ke||_e.vertexTangents!==Xe||_e.morphTargets!==Pe||_e.morphNormals!==pt||_e.morphColors!==Lt||_e.toneMapping!==It||_e.morphTargetsCount!==Qt||!!_e.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(rt=!0):(rt=!0,_e.__version=z.version);let Bn=_e.currentProgram;rt===!0&&(Bn=Ao(z,U,k),F&&z.isNodeMaterial&&F.onUpdateProgram(z,Bn,_e));let li=!1,Zi=!1,ss=!1,xt=Bn.getUniforms(),Nt=_e.uniforms;if(de.useProgram(Bn.program)&&(li=!0,Zi=!0,ss=!0),z.id!==H&&(H=z.id,Zi=!0),_e.needsLights){let yt=v0(E.state.lightProbeGridArray,k);_e.lightProbeGrid!==yt&&(_e.lightProbeGrid=yt,Zi=!0)}if(li||V!==M){de.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),xt.setValue(N,"projectionMatrix",M.projectionMatrix),xt.setValue(N,"viewMatrix",M.matrixWorldInverse);let Ji=xt.map.cameraPosition;Ji!==void 0&&Ji.setValue(N,wt.setFromMatrixPosition(M.matrixWorld)),_t.logarithmicDepthBuffer&&xt.setValue(N,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&xt.setValue(N,"isOrthographic",M.isOrthographicCamera===!0),V!==M&&(V=M,Zi=!0,ss=!0)}if(_e.needsLights&&(Rn.state.directionalShadowMap.length>0&&xt.setValue(N,"directionalShadowMap",Rn.state.directionalShadowMap,_),Rn.state.spotShadowMap.length>0&&xt.setValue(N,"spotShadowMap",Rn.state.spotShadowMap,_),Rn.state.pointShadowMap.length>0&&xt.setValue(N,"pointShadowMap",Rn.state.pointShadowMap,_)),k.isSkinnedMesh){xt.setOptional(N,k,"bindMatrix"),xt.setOptional(N,k,"bindMatrixInverse");let yt=k.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),xt.setValue(N,"boneTexture",yt.boneTexture,_))}k.isBatchedMesh&&(xt.setOptional(N,k,"batchingTexture"),xt.setValue(N,"batchingTexture",k._matricesTexture,_),xt.setOptional(N,k,"batchingIdTexture"),xt.setValue(N,"batchingIdTexture",k._indirectTexture,_),xt.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&xt.setValue(N,"batchingColorTexture",k._colorsTexture,_));let ji=G.morphAttributes;if((ji.position!==void 0||ji.normal!==void 0||ji.color!==void 0)&&Oe.update(k,G,Bn),(Zi||_e.receiveShadow!==k.receiveShadow)&&(_e.receiveShadow=k.receiveShadow,xt.setValue(N,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(Nt.envMapIntensity.value=U.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=oS()),Zi){if(xt.setValue(N,"toneMappingExposure",I.toneMappingExposure),_e.needsLights&&y0(Nt,ss),me&&z.fog===!0&&q.refreshFogUniforms(Nt,me),q.refreshMaterialUniforms(Nt,z,Ve,ht,E.state.transmissionRenderTarget[M.id]),_e.needsLights&&_e.lightProbeGrid){let yt=_e.lightProbeGrid;Nt.probesSH.value=yt.texture,Nt.probesMin.value.copy(yt.boundingBox.min),Nt.probesMax.value.copy(yt.boundingBox.max),Nt.probesResolution.value.copy(yt.resolution)}Vs.upload(N,Pd(_e),Nt,_)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Vs.upload(N,Pd(_e),Nt,_),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&xt.setValue(N,"center",k.center),xt.setValue(N,"modelViewMatrix",k.modelViewMatrix),xt.setValue(N,"normalMatrix",k.normalMatrix),xt.setValue(N,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){let yt=z.uniformsGroups;for(let Ji=0,as=yt.length;Ji<as;Ji++){let Dd=yt[Ji];Y.update(Dd,Bn),Y.bind(Dd,Bn)}}return Bn}function y0(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function S0(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(M,U,G){let z=T.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),T.get(M.texture).__webglTexture=U,T.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){let G=T.get(M);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};let M0=N.createFramebuffer();this.setRenderTarget=function(M,U=0,G=0){O=M,W=U,X=G;let z=null,k=!1,me=!1;if(M){let pe=T.get(M);if(pe.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(N.FRAMEBUFFER,pe.__webglFramebuffer),K.copy(M.viewport),ne.copy(M.scissor),ue=M.scissorTest,de.viewport(K),de.scissor(ne),de.setScissorTest(ue),H=-1;return}else if(pe.__webglFramebuffer===void 0)_.setupRenderTarget(M);else if(pe.__hasExternalTextures)_.rebindTextures(M,T.get(M.texture).__webglTexture,T.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ke=M.depthTexture;if(pe.__boundDepthTexture!==ke){if(ke!==null&&T.has(ke)&&(M.width!==ke.image.width||M.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(M)}}let Ee=M.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(me=!0);let Ce=T.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?z=Ce[U][G]:z=Ce[U],k=!0):M.samples>0&&_.useMultisampledRTT(M)===!1?z=T.get(M).__webglMultisampledFramebuffer:Array.isArray(Ce)?z=Ce[G]:z=Ce,K.copy(M.viewport),ne.copy(M.scissor),ue=M.scissorTest}else K.copy(ae).multiplyScalar(Ve).floor(),ne.copy(Ne).multiplyScalar(Ve).floor(),ue=ze;if(G!==0&&(z=M0),de.bindFramebuffer(N.FRAMEBUFFER,z)&&de.drawBuffers(M,z),de.viewport(K),de.scissor(ne),de.setScissorTest(ue),k){let pe=T.get(M.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,G)}else if(me){let pe=U;for(let Ee=0;Ee<M.textures.length;Ee++){let Ce=T.get(M.textures[Ee]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ee,Ce.__webglTexture,G,pe)}}else if(M!==null&&G!==0){let pe=T.get(M.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pe.__webglTexture,G)}H=-1},this.readRenderTargetPixels=function(M,U,G,z,k,me,Se,pe=0){if(!(M&&M.isWebGLRenderTarget)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(Ee=Ee[Se]),Ee){de.bindFramebuffer(N.FRAMEBUFFER,Ee);try{let Ce=M.textures[pe],ke=Ce.format,Xe=Ce.type;if(M.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!_t.textureFormatReadable(ke)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Xe)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-z&&G>=0&&G<=M.height-k&&N.readPixels(U,G,z,k,L.convert(ke),L.convert(Xe),me)}finally{let Ce=O!==null?T.get(O).__webglFramebuffer:null;de.bindFramebuffer(N.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(M,U,G,z,k,me,Se,pe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(Ee=Ee[Se]),Ee)if(U>=0&&U<=M.width-z&&G>=0&&G<=M.height-k){de.bindFramebuffer(N.FRAMEBUFFER,Ee);let Ce=M.textures[pe],ke=Ce.format,Xe=Ce.type;if(M.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!_t.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Pe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Pe),N.bufferData(N.PIXEL_PACK_BUFFER,me.byteLength,N.STREAM_READ),N.readPixels(U,G,z,k,L.convert(ke),L.convert(Xe),0);let pt=O!==null?T.get(O).__webglFramebuffer:null;de.bindFramebuffer(N.FRAMEBUFFER,pt);let Lt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Yf(N,Lt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Pe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,me),N.deleteBuffer(Pe),N.deleteSync(Lt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,G=0){let z=Math.pow(2,-G),k=Math.floor(M.image.width*z),me=Math.floor(M.image.height*z),Se=U!==null?U.x:0,pe=U!==null?U.y:0;_.setTexture2D(M,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,Se,pe,k,me),de.unbindTexture()};let b0=N.createFramebuffer(),w0=N.createFramebuffer();this.copyTextureToTexture=function(M,U,G=null,z=null,k=0,me=0){let Se,pe,Ee,Ce,ke,Xe,Pe,pt,Lt,It=M.isCompressedTexture?M.mipmaps[me]:M.image;if(G!==null)Se=G.max.x-G.min.x,pe=G.max.y-G.min.y,Ee=G.isBox3?G.max.z-G.min.z:1,Ce=G.min.x,ke=G.min.y,Xe=G.isBox3?G.min.z:0;else{let Nt=Math.pow(2,-k);Se=Math.floor(It.width*Nt),pe=Math.floor(It.height*Nt),M.isDataArrayTexture?Ee=It.depth:M.isData3DTexture?Ee=Math.floor(It.depth*Nt):Ee=1,Ce=0,ke=0,Xe=0}z!==null?(Pe=z.x,pt=z.y,Lt=z.z):(Pe=0,pt=0,Lt=0);let gt=L.convert(U.format),Qt=L.convert(U.type),_e;U.isData3DTexture?(_.setTexture3D(U,0),_e=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(_.setTexture2DArray(U,0),_e=N.TEXTURE_2D_ARRAY):(_.setTexture2D(U,0),_e=N.TEXTURE_2D),de.activeTexture(N.TEXTURE0),de.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),de.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),de.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);let Rn=de.getParameter(N.UNPACK_ROW_LENGTH),rt=de.getParameter(N.UNPACK_IMAGE_HEIGHT),Bn=de.getParameter(N.UNPACK_SKIP_PIXELS),li=de.getParameter(N.UNPACK_SKIP_ROWS),Zi=de.getParameter(N.UNPACK_SKIP_IMAGES);de.pixelStorei(N.UNPACK_ROW_LENGTH,It.width),de.pixelStorei(N.UNPACK_IMAGE_HEIGHT,It.height),de.pixelStorei(N.UNPACK_SKIP_PIXELS,Ce),de.pixelStorei(N.UNPACK_SKIP_ROWS,ke),de.pixelStorei(N.UNPACK_SKIP_IMAGES,Xe);let ss=M.isDataArrayTexture||M.isData3DTexture,xt=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){let Nt=T.get(M),ji=T.get(U),yt=T.get(Nt.__renderTarget),Ji=T.get(ji.__renderTarget);de.bindFramebuffer(N.READ_FRAMEBUFFER,yt.__webglFramebuffer),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,Ji.__webglFramebuffer);for(let as=0;as<Ee;as++)ss&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(M).__webglTexture,k,Xe+as),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(U).__webglTexture,me,Lt+as)),N.blitFramebuffer(Ce,ke,Se,pe,Pe,pt,Se,pe,N.DEPTH_BUFFER_BIT,N.NEAREST);de.bindFramebuffer(N.READ_FRAMEBUFFER,null),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||M.isRenderTargetTexture||T.has(M)){let Nt=T.get(M),ji=T.get(U);de.bindFramebuffer(N.READ_FRAMEBUFFER,b0),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,w0);for(let yt=0;yt<Ee;yt++)ss?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Nt.__webglTexture,k,Xe+yt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Nt.__webglTexture,k),xt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ji.__webglTexture,me,Lt+yt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ji.__webglTexture,me),k!==0?N.blitFramebuffer(Ce,ke,Se,pe,Pe,pt,Se,pe,N.COLOR_BUFFER_BIT,N.NEAREST):xt?N.copyTexSubImage3D(_e,me,Pe,pt,Lt+yt,Ce,ke,Se,pe):N.copyTexSubImage2D(_e,me,Pe,pt,Ce,ke,Se,pe);de.bindFramebuffer(N.READ_FRAMEBUFFER,null),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else xt?M.isDataTexture||M.isData3DTexture?N.texSubImage3D(_e,me,Pe,pt,Lt,Se,pe,Ee,gt,Qt,It.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(_e,me,Pe,pt,Lt,Se,pe,Ee,gt,It.data):N.texSubImage3D(_e,me,Pe,pt,Lt,Se,pe,Ee,gt,Qt,It):M.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,me,Pe,pt,Se,pe,gt,Qt,It.data):M.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,me,Pe,pt,It.width,It.height,gt,It.data):N.texSubImage2D(N.TEXTURE_2D,me,Pe,pt,Se,pe,gt,Qt,It);de.pixelStorei(N.UNPACK_ROW_LENGTH,Rn),de.pixelStorei(N.UNPACK_IMAGE_HEIGHT,rt),de.pixelStorei(N.UNPACK_SKIP_PIXELS,Bn),de.pixelStorei(N.UNPACK_SKIP_ROWS,li),de.pixelStorei(N.UNPACK_SKIP_IMAGES,Zi),me===0&&U.generateMipmaps&&N.generateMipmap(_e),de.unbindTexture()},this.initRenderTarget=function(M){T.get(M).__webglFramebuffer===void 0&&_.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?_.setTextureCube(M,0):M.isData3DTexture?_.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?_.setTexture2DArray(M,0):_.setTexture2D(M,0),de.unbindTexture()},this.resetState=function(){W=0,X=0,O=null,de.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var Si={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var fn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},cS=new zr(-1,1,1,-1,0,1),Hh=class extends tt{constructor(){super(),this.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ye([0,2,0,0,2,0],2))}},uS=new Hh,Vn=class{constructor(e){this._mesh=new st(uS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Ws=class extends fn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof $e?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Un.clone(e.uniforms),this.material=new $e({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Vn(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var no=class extends fn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Vc=class extends fn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Gc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new he);this._width=i.width,this._height=i.height,t=new vt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Tt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ws(Si),this.copyPass.material.blending=Sn,this.timer=new Hr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let r=0,s=this.passes.length;r<s;r++){let a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}no!==void 0&&(a instanceof no?i=!0:a instanceof Vc&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new he);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Wc=class extends fn{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ae}render(e,t,i){let r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}};var Ap={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ae(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Xs=class n extends fn{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new he(e.x,e.y):new he(256,256),this.clearColor=new Ae(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new vt(s,a,{type:Tt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new vt(s,a,{type:Tt});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new vt(s,a,{type:Tt});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),a=Math.round(a/2)}let o=Ap;this.highPassUniforms=Un.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new $e({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new he(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Un.clone(Si.uniforms),this.blendMaterial=new $e({uniforms:this.copyUniforms,vertexShader:Si.vertexShader,fragmentShader:Si.fragmentShader,premultipliedAlpha:!0,blending:ot,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ae,this._oldClearAlpha=1,this._basic=new dn,this._fsQuad=new Vn(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new he(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new $e({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new he(.5,.5)},direction:{value:new he(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new $e({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Xs.BlurDirectionX=new he(1,0);Xs.BlurDirectionY=new he(0,1);var Xc={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

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

		}`};var qc=class extends fn{constructor(e=.96){super(),this.uniforms=Un.clone(Xc.uniforms),this.damp=e,this.compFsMaterial=new $e({uniforms:this.uniforms,vertexShader:Xc.vertexShader,fragmentShader:Xc.fragmentShader}),this.copyFsMaterial=new $e({uniforms:Un.clone(Si.uniforms),vertexShader:Si.vertexShader,fragmentShader:Si.fragmentShader,blending:Sn,depthTest:!1,depthWrite:!1}),this._textureComp=new vt(window.innerWidth,window.innerHeight,{magFilter:Ft,type:Tt}),this._textureOld=new vt(window.innerWidth,window.innerHeight,{magFilter:Ft,type:Tt}),this._compFsQuad=new Vn(this.compFsMaterial),this._copyFsQuad=new Vn(this.copyFsMaterial)}get damp(){return this.uniforms.damp.value}set damp(e){this.uniforms.damp.value=e}render(e,t,i){this.uniforms.tOld.value=this._textureOld.texture,this.uniforms.tNew.value=i.texture,e.setRenderTarget(this._textureComp),this._compFsQuad.render(e),this._copyFsQuad.material.uniforms.tDiffuse.value=this._textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this._copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._copyFsQuad.render(e));let r=this._textureOld;this._textureOld=this._textureComp,this._textureComp=r}setSize(e,t){this._textureComp.setSize(e,t),this._textureOld.setSize(e,t)}dispose(){this._textureComp.dispose(),this._textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this._compFsQuad.dispose(),this._copyFsQuad.dispose()}};var Cp=`

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`;var Rp=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 CineonToneMapping( vec3 color ) {

	// filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
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

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
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

// AgX Tone Mapping implementation based on Filament, which in turn is based
// on Blender's implementation using rec 2020 primaries
// https://github.com/google/filament/pull/7236
// Inputs and outputs are encoded as Linear-sRGB.

vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	// LOG2_MIN      = -10.0
	// LOG2_MAX      =  +6.5
	// MIDDLE_GRAY   =  0.18
	const float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )
	const float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )

	color *= toneMappingExposure;

	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	// Gamut mapping. Simple clamp for now.
	color = clamp( color, 0.0, 1.0 );

	return color;

}

// https://modelviewer.dev/examples/tone-mapping

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

vec3 CustomToneMapping( vec3 color ) { return color; }
`;var Ip=new Map([[za,"LINEAR_TONE_MAPPING"],[Ha,"REINHARD_TONE_MAPPING"],[ka,"CINEON_TONE_MAPPING"],[kr,"ACES_FILMIC_TONE_MAPPING"],[Ga,"AGX_TONE_MAPPING"],[Wa,"NEUTRAL_TONE_MAPPING"],[Va,"CUSTOM_TONE_MAPPING"]]),Yc={name:"DitheredOutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1},ditherSeed:{value:null}},vertexShader:`
    precision highp float;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    precision highp float;

    uniform sampler2D tDiffuse;
    uniform float ditherSeed;

    ${Rp}
    ${Cp}

    varying vec2 vUv;

    float gradientNoise(vec2 pixel) {
      return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
    }

    void main() {
      gl_FragColor = texture2D(tDiffuse, vUv);

      #ifdef LINEAR_TONE_MAPPING
        gl_FragColor.rgb = LinearToneMapping(gl_FragColor.rgb);
      #elif defined(REINHARD_TONE_MAPPING)
        gl_FragColor.rgb = ReinhardToneMapping(gl_FragColor.rgb);
      #elif defined(CINEON_TONE_MAPPING)
        gl_FragColor.rgb = CineonToneMapping(gl_FragColor.rgb);
      #elif defined(ACES_FILMIC_TONE_MAPPING)
        gl_FragColor.rgb = ACESFilmicToneMapping(gl_FragColor.rgb);
      #elif defined(AGX_TONE_MAPPING)
        gl_FragColor.rgb = AgXToneMapping(gl_FragColor.rgb);
      #elif defined(NEUTRAL_TONE_MAPPING)
        gl_FragColor.rgb = NeutralToneMapping(gl_FragColor.rgb);
      #elif defined(CUSTOM_TONE_MAPPING)
        gl_FragColor.rgb = CustomToneMapping(gl_FragColor.rgb);
      #endif

      #ifdef SRGB_TRANSFER
        gl_FragColor = sRGBTransferOETF(gl_FragColor);
      #endif

      vec2 ditherCoordinate = gl_FragCoord.xy + vec2(ditherSeed * 5.588238, 0.0);
      float ign = gradientNoise(ditherCoordinate);
      gl_FragColor.rgb = clamp(
        gl_FragColor.rgb + vec3((ign - 0.5) / 255.0),
        vec3(0.0),
        vec3(1.0)
      );
    }
  `};function hS(){let n=[...Ip.keys()];if(n.some(e=>!Number.isInteger(e))||new Set(n).size!==n.length||typeof et!="string"||et.length===0||typeof qe?.getTransfer!="function"||typeof Un?.clone!="function"||typeof Br!="function"||typeof Vn!="function")throw new Error("DitheredOutputPass requires the three r184 OutputPass API.")}function Pp(n){if(!Number.isFinite(n)||!Number.isInteger(n)||n<0||n>255)throw new TypeError("DitheredOutputPass seed must be an integer from 0 through 255.")}hS();var $c=class extends fn{constructor(e){super(),Pp(e),this.isDitheredOutputPass=!0,this.isOutputPass=!0,this.uniforms=Un.clone(Yc.uniforms),this.uniforms.ditherSeed.value=e,this.material=new Br({name:Yc.name,uniforms:this.uniforms,vertexShader:Yc.vertexShader,fragmentShader:Yc.fragmentShader}),this._fsQuad=new Vn(this.material),this._outputColorSpace=null,this._toneMapping=null}setSeed(e){return Pp(e),this.uniforms.ditherSeed.value=e,this}render(e,t,i){if(this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping){this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===et&&(this.material.defines.SRGB_TRANSFER="");let r=Ip.get(this._toneMapping);r!==void 0&&(this.material.defines[r]=""),this.material.needsUpdate=!0}if(this.renderToScreen===!0){e.setRenderTarget(null),this._fsQuad.render(e);return}e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Vh=new WeakSet;function Dp(n){for(let e of Object.values(n))e!==null&&typeof e=="object"&&!Object.isFrozen(e)&&Dp(e);return Object.freeze(n)}var dS=Dp({desktop:{tier:"desktop",antialias:!0,pixelRatioCap:1.6,bloomInitialStrength:.94,pulse:{systemCapacity:5,userCapacity:3,maxPulses:8},assets:{archiveCellCount:81,archivePointsPerCell:156,beamRadialSegments:40,sonarShellWidthSegments:64,sonarShellHeightSegments:36,sonarCurtainRadialSegments:96,sonarSpokeCount:96,sonarPillarCount:48,sonarLatticeSide:13,helixSegments:240,sonarConvergenceWidthSegments:64,sonarConvergenceHeightSegments:36,nullRingTubularSegments:192,coreDetail:5,coreRingTubularSegments:192,forecastDustCount:2600,energyBodyCount:10500,mistCount:3300,nearSnowCount:720,abyssalSpineCount:46,pressureStrataTubularSegments:256}},mobile:{tier:"mobile",antialias:!1,pixelRatioCap:1.15,bloomInitialStrength:.72,pulse:{systemCapacity:2,userCapacity:2,maxPulses:4},assets:{archiveCellCount:45,archivePointsPerCell:72,beamRadialSegments:20,sonarShellWidthSegments:36,sonarShellHeightSegments:20,sonarCurtainRadialSegments:48,sonarSpokeCount:48,sonarPillarCount:28,sonarLatticeSide:9,helixSegments:120,sonarConvergenceWidthSegments:36,sonarConvergenceHeightSegments:20,nullRingTubularSegments:96,coreDetail:4,coreRingTubularSegments:96,forecastDustCount:1200,energyBodyCount:4200,mistCount:1200,nearSnowCount:260,abyssalSpineCount:22,pressureStrataTubularSegments:128}}});function kh(n,e){if(!Number.isFinite(n)||n<=0)throw new RangeError(`${e} must be a positive finite number.`)}function Zc({width:n,height:e,dpr:t,coarse:i}){if(kh(n,"width"),kh(e,"height"),kh(t,"dpr"),typeof i!="boolean")throw new TypeError("coarse must be a boolean.");let r=dS[i||n<=819?"mobile":"desktop"],s=Object.freeze({...r,width:n,height:e,devicePixelRatio:t,coarse:i,effectivePixelRatio:Math.min(t,r.pixelRatioCap)});return Vh.add(s),s}function Lp(n,e){if(!Vh.has(n)||!Vh.has(e))throw new TypeError("Two profiles returned by resolveQualityProfile are required.");return n.width===e.width&&n.height===e.height&&n.devicePixelRatio===e.devicePixelRatio&&n.coarse===e.coarse&&n.tier===e.tier&&n.effectivePixelRatio===e.effectivePixelRatio}var fS=/^--[a-z0-9-]+$/,Np=new WeakMap;function io(n){pS(n);let e=Np.get(n);return e||(e=new Map,Np.set(n,e)),Object.freeze({set(t,i){if(mS(t),gS(i),Fp(n,t)===i)return!1;n.setProperty(t,i);let s=Fp(n,t);if(e.set(t,s),s!==i)throw new Error(`CSS style target did not retain the exact value written for ${t}.`);return!0}})}function pS(n){if(!(typeof n=="object"&&n!==null||typeof n=="function")||typeof n.getPropertyValue!="function"||typeof n.setProperty!="function")throw new TypeError("CSS style target must provide getPropertyValue() and setProperty() methods.")}function mS(n){if(typeof n!="string"||!fS.test(n))throw new TypeError("CSS custom property name must match /^--[a-z0-9-]+$/.")}function gS(n){if(typeof n!="string")throw new TypeError("CSS custom property value must be a formatted string.")}function Fp(n,e){let t=n.getPropertyValue(e);if(typeof t!="string")throw new TypeError("CSS style target getPropertyValue() must return a string.");return t}function Bp(n,e,t){if(!Number.isFinite(n)||n<0)throw new RangeError("Ninth Tide media time must be a non-negative finite number.");if(!Number.isFinite(e)||e<=0)throw new RangeError("Ninth Tide media duration must be a positive finite number.");if(!Number.isFinite(t)||t<=0)throw new RangeError("Ninth Tide score duration must be a positive finite number.");return Math.min(n,e)/e*t}function Gh(n,e,t){if(!Number.isFinite(n)||n<0)throw new RangeError("Ninth Tide silent elapsed time must be a non-negative finite number.");if(!Number.isFinite(e)||e<=0)throw new RangeError("Ninth Tide silent duration must be a positive finite number.");if(!Number.isFinite(t)||t<=0)throw new RangeError("Ninth Tide score duration must be a positive finite number.");return Math.min(n,e)/e*t}function xS(n,e,t=13.6){if(!Number.isFinite(n)||n<0)throw new RangeError("Ninth Tide visual score time must be a non-negative finite number.");if(!Number.isFinite(e)||e<=0)throw new RangeError("Ninth Tide score duration must be a positive finite number.");if(!Number.isFinite(t)||t<=0||t>e)throw new RangeError("Ninth Tide withdrawal span must be positive and no longer than the score.");let i=e-t,r=Math.min(Math.max((n-i)/t,0),1);return r<.58?r*.78:.4524+(1-.4524)*_S((r-.58)/(1-.58))}var Mi=Object.freeze({started:.018,outerSilence:.05,echoReverses:.41,lastLight:.76,finished:.995}),Up=Object.freeze(["cueCursor","finished","shutdown","started"]);function zp(n,e,t){vS(n);let i=xS(e,t);if(n.finished)return Op(n,[]);if(i<n.shutdown)throw new RangeError("Ninth Tide ending visual score time must not move backwards.");let r=[],s=n.started,a=n.cueCursor,o=!1;return!s&&i>Mi.started&&(s=!0,r.push("shutdown-start")),a===0&&i>Mi.outerSilence&&(a=1,r.push("outer-silence")),a===1&&i>Mi.echoReverses&&(a=2,r.push("echo-reverses")),a===2&&i>Mi.lastLight&&(a=3,r.push("last-light")),i>=Mi.finished&&(o=!0,r.push("finish")),Op({shutdown:o?1:i,started:s,cueCursor:a,finished:o},r)}function vS(n){if(n===null||typeof n!="object"||Array.isArray(n))throw new TypeError("Ninth Tide ending state must be an object.");let e=Object.keys(n).sort();if(e.length!==Up.length||e.some((s,a)=>s!==Up[a]))throw new TypeError("Ninth Tide ending state must contain exactly shutdown, started, cueCursor, and finished.");if(!Number.isFinite(n.shutdown)||n.shutdown<0||n.shutdown>1)throw new RangeError("Ninth Tide ending shutdown must be a finite number from 0 to 1.");if(typeof n.started!="boolean"||typeof n.finished!="boolean")throw new TypeError("Ninth Tide ending started and finished flags must be booleans.");if(!Number.isInteger(n.cueCursor)||n.cueCursor<0||n.cueCursor>3)throw new RangeError("Ninth Tide ending cue cursor must be an integer from 0 to 3.");let t=n.shutdown>Mi.started,i=n.shutdown>Mi.lastLight?3:n.shutdown>Mi.echoReverses?2:n.shutdown>Mi.outerSilence?1:0,r=n.finished?n.shutdown===1:n.shutdown<Mi.finished;if(n.started!==t||n.cueCursor!==i||!r||n.finished&&(!n.started||n.cueCursor!==3))throw new RangeError("Ninth Tide ending state is inconsistent with its shutdown progress.")}function Op(n,e){let t=Object.freeze({...n});return Object.freeze({state:t,transitions:Object.freeze(e)})}function _S(n){let e=Math.min(Math.max(n,0),1);return e*e*e*(e*(e*6-15)+10)}var yS=new Set(["full","band"]);function qs(n,e){if(!Number.isFinite(n)||n<=0)throw new RangeError(`${e} must be a positive finite number.`)}function Vp(){let n=null;return{advance:i=>{if(!Number.isFinite(i)||i<0)throw new RangeError("currentTime must be a non-negative finite number.");if(n===null||i<n)return n=i,0;let r=i-n;return r>0&&(n=i),r},reset:()=>{n=null}}}function Hp(n){let e=0,t=0,i=!1,r=null,s=[],a=0,o=0;return{reset:()=>{e=0,t=0,i=!1,r=null,s.length=0,a=0,o=0},update:(h,d)=>{e+=d;let u=1-Math.exp(-n.lowpassLambda*d);t=i?t+(h-t)*u:h,i=!0;let f=!1,x=0;if(r){if(f=r.warmed&&r.value>=n.minFlux&&r.value>r.leftValue&&r.value>=t&&r.value>r.threshold,f){let E=Math.max(r.threshold,n.minFlux);x=Math.min(1,Math.max(0,(r.value-r.threshold)/E))}s.push({time:r.time,value:r.value}),a+=r.value,o+=r.value*r.value}let v=e-n.historySeconds;for(;s.length>0&&s[0].time<v;){let E=s.shift();a-=E.value,o-=E.value*E.value}let p=s.length,m=p>0?a/p:0,S=p>0?Math.max(0,o/p-m*m):0,w=Math.sqrt(S),b=p>=n.minSamples&&e>=n.warmupSeconds,C=m+n.thresholdStdDeviations*w;return r={leftValue:r?.value??Number.NEGATIVE_INFINITY,threshold:C,time:e,value:t,warmed:b},{onset:f,strength:x,rawFlux:h,flux:t,threshold:C,mean:m,standardDeviation:w,sampleCount:p,warmed:b}}}}function kp(){return{onset:!1,strength:0,rawFlux:0,flux:0,threshold:0,mean:0,standardDeviation:0,sampleCount:0,warmed:!1}}function Gp(n){if(!n||typeof n!="object")throw new TypeError("Spectral flux onset config is required.");if(qs(n.historySeconds,"historySeconds"),qs(n.warmupSeconds,"warmupSeconds"),qs(n.thresholdStdDeviations,"thresholdStdDeviations"),qs(n.lowpassLambda,"lowpassLambda"),qs(n.minFlux,"minFlux"),!Number.isInteger(n.minSamples)||n.minSamples<2)throw new RangeError("minSamples must be an integer of at least 2.");let e=Hp(n),t=Hp(n),i=null,r=()=>{i=null,e.reset(),t.reset()};return{reset:r,update:(a,o,l)=>{if(!(a instanceof Uint8Array)||a.length===0)throw new TypeError("spectrum must be a non-empty Uint8Array.");if(qs(o,"dtSeconds"),!l||typeof l!="object")throw new TypeError("Spectral flux onset update options are required.");let{bandStartIndex:c,selectedPath:h}=l;if(!Number.isInteger(c)||c<0||c>=a.length)throw new RangeError("bandStartIndex must address the supplied spectrum.");if(!yS.has(h))throw new RangeError("selectedPath must be 'full' or 'band'.");if(!i||i.length!==a.length){r(),i=new Uint8Array(a);let p=kp(),m=kp();return{onset:!1,strength:0,selectedPath:h,primed:!1,full:p,band:m}}let d=0,u=0;for(let p=0;p<a.length;p++){let m=Math.max(0,a[p]-i[p])/255;d+=m,p>=c&&(u+=m)}d/=a.length,u/=a.length-c,i.set(a);let f=e.update(d,o),x=t.update(u,o),v=h==="band"?x:f;return{onset:v.onset,strength:v.strength,selectedPath:h,primed:!0,full:f,band:x}}}}var ro=Object.freeze([5.35,4.1,4.35,4,4.9,4.5,4.2,4.05,4.3]),$p=.1,Zp=new Set(["auto","system","user"]),jp=new WeakMap;function Xh(n,e){if(!Number.isFinite(n))throw new RangeError(`${e} must be a finite number.`)}function jc(n,e){if(Xh(n,e),n<0)throw new RangeError(`${e} must be non-negative.`)}function qh(n){if(!Number.isInteger(n)||n<0||n>=ro.length)throw new RangeError(`mode must be an integer from 0 through ${ro.length-1}.`)}function Jp(n){if(!n||typeof n!="object"||Array.isArray(n))throw new TypeError("Pulse history capacities are required.");for(let e of["systemCapacity","userCapacity"])if(!Number.isInteger(n[e])||n[e]<=0)throw new RangeError(`${e} must be a positive integer.`)}function Gi(n){let e=jp.get(n);if(!e)throw new TypeError("A pulse history created by createPulseHistory is required.");return e}function Wh(n){return n===null?null:{...n}}function Wp(n){return n===null?null:Object.freeze({...n})}function Kp(n,e){return n!==null&&e-n.startTime<ro[n.mode]}function Qp(n,e){return n.queueAdvanceStartedAt!==null&&n.clockSeconds-n.queueAdvanceStartedAt<$p&&e.serial<n.queueAdvanceSerial?.5:1}function em(n,e){let t=n.clockSeconds-e.startTime;return Object.freeze({age:t,originX:e.originX,originZ:e.originZ,sourceY:e.sourceY,screenX:e.screenX,screenY:e.screenY,startTime:e.startTime,strength:e.strength,mode:e.mode,source:e.source,serial:e.serial,contributionScale:Qp(n,e),lifetime:ro[e.mode]})}function Xp(n,e,t,i,r){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new TypeError(`${e}Slots[${r}] must be a pulse slot or null.`);if(!Zp.has(n.source)||(e==="user"?n.source!=="user":n.source==="user"))throw new RangeError(`${e}Slots[${r}] has an invalid source.`);for(let s of["originX","originZ","sourceY","screenX","screenY","startTime","strength"])Xh(n[s],`${e}Slots[${r}].${s}`);if(n.startTime<0||n.startTime>t)throw new RangeError(`${e}Slots[${r}].startTime is outside the history clock.`);if(n.strength<=0)throw new RangeError(`${e}Slots[${r}].strength must be positive.`);if(qh(n.mode),!Number.isInteger(n.serial)||n.serial<1||n.serial>=i)throw new RangeError(`${e}Slots[${r}].serial is invalid.`)}}function qp(n,e,t){let i=n.indexOf(null);if(i!==-1&&(e!==i||n.slice(i).some(s=>s!==null)))throw new RangeError(`${t}Slots and ${t}Cursor do not form a valid ring.`);let r=i===-1?[...n.slice(e),...n.slice(0,e)]:n.slice(0,e);for(let s=1;s<r.length;s++)if(r[s-1].serial>=r[s].serial)throw new RangeError(`${t}Slots are not ordered by pulse serial.`)}function tm(n,e){if(!n||typeof n!="object"||Array.isArray(n))throw new TypeError("A pulse history snapshot is required.");if(n.systemCapacity!==e.systemCapacity||n.userCapacity!==e.userCapacity)throw new RangeError("Snapshot ring capacities do not match the pulse history.");if(jc(n.clockSeconds,"snapshot.clockSeconds"),!Number.isInteger(n.nextSerial)||n.nextSerial<1)throw new RangeError("snapshot.nextSerial must be a positive integer.");if(!Number.isInteger(n.systemCursor)||n.systemCursor<0||n.systemCursor>=e.systemCapacity)throw new RangeError("snapshot.systemCursor is invalid.");if(!Number.isInteger(n.userCursor)||n.userCursor<0||n.userCursor>=e.userCapacity)throw new RangeError("snapshot.userCursor is invalid.");if(!Array.isArray(n.systemSlots)||n.systemSlots.length!==e.systemCapacity||!Array.isArray(n.userSlots)||n.userSlots.length!==e.userCapacity)throw new RangeError("Snapshot ring capacities do not match the pulse history.");n.systemSlots.forEach((i,r)=>{Xp(i,"system",n.clockSeconds,n.nextSerial,r)}),n.userSlots.forEach((i,r)=>{Xp(i,"user",n.clockSeconds,n.nextSerial,r)}),qp(n.systemSlots,n.systemCursor,"system"),qp(n.userSlots,n.userCursor,"user");let t=[...n.systemSlots,...n.userSlots].filter(i=>i!==null).map(i=>i.serial);if(new Set(t).size!==t.length)throw new RangeError("Snapshot pulse serials must be unique.");if(n.queueAdvanceStartedAt===null){if(n.queueAdvanceSerial!==0)throw new RangeError("An inactive queue advance must have serial 0.")}else{if(jc(n.queueAdvanceStartedAt,"snapshot.queueAdvanceStartedAt"),n.queueAdvanceStartedAt>n.clockSeconds)throw new RangeError("snapshot.queueAdvanceStartedAt cannot exceed the history clock.");if(!Number.isInteger(n.queueAdvanceSerial)||n.queueAdvanceSerial<1||n.queueAdvanceSerial>=n.nextSerial)throw new RangeError("snapshot.queueAdvanceSerial is invalid.");if(!t.includes(n.queueAdvanceSerial))throw new RangeError("snapshot.queueAdvanceSerial must identify a retained pulse.")}}function SS(n,e){jc(n,"age"),qh(e);let t=Math.min(1,n/ro[e]);return 1-t*t*(3-2*t)}function Yh(n){Jp(n);let{systemCapacity:e,userCapacity:t}=n,i=Object.freeze({systemCapacity:e,userCapacity:t,totalCapacity:e+t});return jp.set(i,{systemCapacity:e,userCapacity:t,systemSlots:Array(e).fill(null),userSlots:Array(t).fill(null),systemCursor:0,userCursor:0,clockSeconds:0,nextSerial:1,queueAdvanceStartedAt:null,queueAdvanceSerial:0}),i}function Jc(n){let e=Gi(n);e.systemSlots.fill(null),e.userSlots.fill(null),e.systemCursor=0,e.userCursor=0,e.clockSeconds=0,e.nextSerial=1,e.queueAdvanceStartedAt=null,e.queueAdvanceSerial=0}function nm(n,e){let t=Gi(n);if(!e||typeof e!="object"||Array.isArray(e))throw new TypeError("pulse must be an object.");if(!Zp.has(e.source))throw new RangeError("source must be 'auto', 'system', or 'user'.");for(let c of["originX","originZ","sourceY","screenX","screenY","strength"])Xh(e[c],c);if(e.strength<=0)throw new RangeError("strength must be positive.");qh(e.mode);let i=e.source==="user"?"user":"system",r=t[`${i}Slots`],s=`${i}Cursor`,a=t[s],o=r[a]!==null,l={originX:e.originX,originZ:e.originZ,sourceY:e.sourceY,screenX:e.screenX,screenY:e.screenY,startTime:t.clockSeconds,strength:e.strength,mode:e.mode,source:e.source,serial:t.nextSerial++};return r[a]=l,t[s]=(a+1)%r.length,o&&(t.queueAdvanceStartedAt=t.clockSeconds,t.queueAdvanceSerial=l.serial),em(t,l)}function im(n,e){let t=Gi(n);return jc(e,"dtSeconds"),e===0||(t.clockSeconds+=e,t.queueAdvanceStartedAt!==null&&t.clockSeconds-t.queueAdvanceStartedAt>=$p&&(t.queueAdvanceStartedAt=null,t.queueAdvanceSerial=0)),t.clockSeconds}function Ys(n){let e=Gi(n),t=[];for(let i of[...e.systemSlots,...e.userSlots])Kp(i,e.clockSeconds)&&t.push(em(e,i));return Object.freeze(t)}function rm(n){let e=Gi(n),t=[...e.systemSlots,...e.userSlots].map(i=>{let r=Kp(i,e.clockSeconds)?1:0;return Object.freeze(i===null?{originX:0,sourceY:0,originZ:0,startTime:0,strength:0,mode:0,contributionScale:1,active:r}:{originX:i.originX,sourceY:i.sourceY,originZ:i.originZ,startTime:i.startTime,strength:i.strength,mode:i.mode,contributionScale:Qp(e,i),active:r})});return Object.freeze({clockSeconds:e.clockSeconds,slots:Object.freeze(t)})}function sm(n){let e=null,t=Number.NEGATIVE_INFINITY;for(let i of Ys(n)){let r=i.strength*SS(i.age,i.mode),s=e!==null&&r===t&&(i.startTime>e.startTime||i.startTime===e.startTime&&i.serial>e.serial);(r>t||s)&&(e=i,t=r)}return e===null?null:Object.freeze({...e,contribution:t})}function am(n){let e=null;for(let t of Ys(n))(e===null||t.startTime>e.startTime||t.startTime===e.startTime&&t.serial>e.serial)&&(e=t);return e}function Kc(n){let e=Gi(n);return Object.freeze({systemCapacity:e.systemCapacity,userCapacity:e.userCapacity,clockSeconds:e.clockSeconds,nextSerial:e.nextSerial,systemCursor:e.systemCursor,userCursor:e.userCursor,queueAdvanceStartedAt:e.queueAdvanceStartedAt,queueAdvanceSerial:e.queueAdvanceSerial,systemSlots:Object.freeze(e.systemSlots.map(Wp)),userSlots:Object.freeze(e.userSlots.map(Wp))})}function om(n,e){let t=Gi(n);tm(e,t),t.clockSeconds=e.clockSeconds,t.nextSerial=e.nextSerial,t.systemCursor=e.systemCursor,t.userCursor=e.userCursor,t.queueAdvanceStartedAt=e.queueAdvanceStartedAt,t.queueAdvanceSerial=e.queueAdvanceSerial,t.systemSlots=e.systemSlots.map(Wh),t.userSlots=e.userSlots.map(Wh)}function Yp(n,e){let t=n.filter(i=>i!==null).sort((i,r)=>r.serial-i.serial).slice(0,e).sort((i,r)=>i.serial-r.serial).map(Wh);return{cursor:t.length%e,slots:[...t,...Array(e-t.length).fill(null)]}}function lm(n,e){let t=Gi(n);Jp(e);let i=Yh(e),r=Gi(i),s=Yp(t.systemSlots,r.systemCapacity),a=Yp(t.userSlots,r.userCapacity);return r.clockSeconds=t.clockSeconds,r.nextSerial=t.nextSerial,r.systemCursor=s.cursor,r.userCursor=a.cursor,r.queueAdvanceStartedAt=t.queueAdvanceStartedAt,r.queueAdvanceSerial=t.queueAdvanceSerial,r.systemSlots=s.slots,r.userSlots=a.slots,tm(Kc(i),r),i}var je=n=>document.querySelector(n),MS=n=>[...document.querySelectorAll(n)],Mt=Nc.clamp,Ai=Nc.lerp,pn=(n,e,t,i)=>Ai(n,e,1-Math.exp(-t*i)),St=(n,e,t)=>{let i=Mt((t-n)/Math.max(1e-6,e-n),0,1);return i*i*(3-2*i)},es=(n,e,t)=>{let i=Mt((t-n)/Math.max(1e-6,e-n),0,1);return i*i*i*(i*(i*6-15)+10)},J={gate:je("#gate"),enter:je("#enterBtn"),silent:je("#silentBtn"),replay:je("#replayBtn"),file:je("#fileInput"),fileLabel:je("#fileLabel"),hint:je("#gateHint"),ritualCaption:je("#ritualCaption"),ritualIndex:je("#ritualIndex"),ritualMain:je("#ritualMain"),ritualSub:je("#ritualSub"),phaseNumber:je("#phaseNumber"),phaseName:je("#phaseName"),phaseSub:je("#phaseSub"),sideTicks:MS("#sideIndex i"),coreState:je("#coreState"),fieldState:je("#fieldState"),depth:je("#depthValue"),coord:je("#coordValue"),index:je("#indexValue"),signal:je("#signalState"),mode:je("#modeState"),audioState:je("#audioState"),timeNow:je("#timeNow"),timeTotal:je("#timeTotal"),low:je("#bandLow"),mid:je("#bandMid"),high:je("#bandHigh"),runtimeStatus:je("#runtimeStatus"),archiveProgress:je("#archiveProgress"),cursor:je("#cursor"),message:je("#message"),audio:je("#audio"),unsupported:je("#unsupported")},ri=io(document.documentElement.style),$h=Object.freeze({low:io(J.low.style),mid:io(J.mid.style),high:io(J.high.style)}),du=matchMedia("(pointer: coarse)"),we=Zc({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,coarse:du.matches}),Qh=matchMedia("(prefers-reduced-motion: reduce)").matches,lo=new URLSearchParams(location.search),xm=window.__NINTH_TIDE_PREVIEW__,Ci=lo.has("preview")||xm!==void 0,vm=lo.get("qa")==="cycle",_m=7,Kt=Yh(we.pulse),Yt=we.pulse.maxPulses,po=Array.from({length:Yt},()=>new ut),mo=Array.from({length:Yt},()=>new ut),ym=n=>`
  uniform vec4 uPulses[${n}];
  uniform vec4 uPulseMeta[${n}];
  uniform float uPulseClock;
  float pulseLifetime(float mode) {
    if (mode < 0.5) return 5.35;
    if (mode < 1.5) return 4.10;
    if (mode < 2.5) return 4.35;
    if (mode < 3.5) return 4.00;
    if (mode < 4.5) return 4.90;
    if (mode < 5.5) return 4.50;
    if (mode < 6.5) return 4.20;
    if (mode < 7.5) return 4.05;
    return 4.30;
  }
  float pulseStrengthAt(int pulseIndex, float age) {
    return uPulseMeta[pulseIndex].x * uPulseMeta[pulseIndex].z * uPulseMeta[pulseIndex].w
      * exp(-age * 0.34);
  }
`,wr=ym(Yt);function bS(n){let e=n>>>0,t=function(){let i=e=e+1831565813>>>0;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296};return t.getState=()=>e,t.setState=i=>{if(!Number.isInteger(i)||i<0||i>4294967295)throw new RangeError("Ninth Tide random state must be a uint32.");e=i>>>0},t}var ti=bS(9545716),be=(n=0,e=1)=>n+(e-n)*ti(),Ei=n=>n-Math.floor(n);function ao(n){if(!Number.isFinite(n))return"00:00";let e=Math.floor(n/60),t=Math.floor(n%60);return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function ln(n,e=1700){J.message.textContent=n,J.message.classList.add("show"),clearTimeout(ln.timer),wo||(ln.timer=setTimeout(()=>J.message.classList.remove("show"),e))}function is(n){J.runtimeStatus.textContent!==n&&(J.runtimeStatus.textContent=n)}var co=[["I","\u65E0\u6708\u6D4B\u6DF1","MOONLESS SOUNDING"],["II","\u76D0\u661F\u4E0B\u6C89","SALT STARS SINKING"],["III","\u77F3\u82F1\u68A6\u8BED","QUARTZ DREAMS"],["IV","\u95E8\u540E\u4E4B\u6D77","THE SEA BEHIND THE DOOR"],["V","\u672A\u8BDE\u4E4B\u57CE","THE UNBORN CITY"],["VI","\u9006\u6F6E\u9057\u9AB8","RELICS AGAINST THE TIDE"],["VII","\u9ED1\u6C34\u5BC6\u5377","THE BLACKWATER CODEX"],["VIII","\u6DF1\u6E0A\u56DE\u89C6","THE ABYSS LOOKS BACK"],["IX","\u65E0\u5CB8\u957F\u591C","THE SHORELESS NIGHT"]],Wi=[0,48.9709,75.0469,103.0966,145.2408,183.8092,224.8853,260.226,330.0484,354.504],Gn=Wi[Wi.length-1],cm=118,wS=2.85,ES=Object.freeze({historySeconds:1.25,warmupSeconds:1,thresholdStdDeviations:1.5,lowpassLambda:30,minFlux:.012,minSamples:2}),um=190,TS=Object.freeze(["full","full","full","full","full","full","full","band","full"]),$r=[{deep:67081,fog:201753,glow:6806990,accent:14940393,secondary:1860720},{deep:67341,fog:268072,glow:5553888,accent:14021375,secondary:2640515},{deep:198665,fog:1057052,glow:9296047,accent:15986121,secondary:4944722},{deep:197899,fog:1381414,glow:9676287,accent:15198975,secondary:5326978},{deep:329481,fog:2170130,glow:14207097,accent:16773820,secondary:6705956},{deep:67592,fog:598303,glow:6543552,accent:14285036,secondary:2649445},{deep:328459,fog:1970728,glow:12746467,accent:15849720,secondary:7093116},{deep:67338,fog:794144,glow:8640956,accent:15267292,secondary:4287325},{deep:1029,fog:595993,glow:11135177,accent:16773575,secondary:5798244}].map(n=>Object.fromEntries(Object.entries(n).map(([e,t])=>[e,new Ae(t)])));function Sm(n){let e;try{e=new zc({antialias:n.antialias,powerPreference:"high-performance",alpha:!1,preserveDrawingBuffer:Ci})}catch(i){throw console.error(i),J.unsupported.style.display="grid",i}let t=e.getContext().getContextAttributes();if(!t||t.antialias!==n.antialias)throw e.forceContextLoss(),e.dispose(),new Error(`Ninth Tide WebGL antialias mismatch for ${n.tier} quality.`);return e.setPixelRatio(n.effectivePixelRatio),e.setSize(n.width,n.height),e.outputColorSpace=nn,e.toneMapping=kr,e.toneMappingExposure=.05,e.setClearColor(772,1),e}var Fe=Sm(we);je("#scene").appendChild(Fe.domElement);var xn=new Ma;xn.background=new Ae(772);xn.fog=new Sa(201496,.021);var Xt=new $t(48,innerWidth/innerHeight,.08,85);Xt.position.set(0,.75,13.6);var cn=new _n;xn.add(cn);var xr=new Hr;xr.connect(document);var ni=new he,pr=new he,uo=new Us,ed=new D,hm=new D,wn=64,Wn=new Uint8Array(wn),Er=new Ur(Wn,wn,1,Hs,sn);Er.magFilter=Ot;Er.minFilter=Ot;Er.wrapS=Dn;Er.wrapT=Dn;Er.needsUpdate=!0;var g={entered:!1,calibrated:!1,ceremonyTime:-1,ceremonyCue:0,ritual:0,ignite:0,lightLevel:0,shutdown:0,ending:!1,ended:!1,endingCue:0,finishCount:0,clockSource:"",roundStartedAt:0,round:0,previewMode:"",previewSection:_m,audioReady:!1,playing:!1,muted:!1,audioFailed:!1,archiveOpen:0,archiveOpenTarget:0,pulseCooldown:0,low:0,mid:0,high:0,rms:0,energy:0,transient:0,previousEnergy:0,tideFloat:0,tideIndex:0,transitionFrom:0,pendingTide:-1,phaseLocal:0,phaseTransition:0,transitionClock:99,transitionSwitched:!1,dive:.12,diveTarget:.12,yaw:0,yawTarget:0,pitch:.07,pitchTarget:.07,dragging:!1,dragDistance:0,lastPointerX:0,lastPointerY:0,activeSeconds:0,syntheticPhase:0,coreHovered:!1},Jr=null,Mm=0,cd=[];function Js(n,e=0){if(vm){if(typeof n!="string"||n.length===0)throw new TypeError("Ninth Tide cycle audit id must be a non-empty string.");if(!Number.isFinite(e)||e<0||e>Gn)throw new RangeError("Ninth Tide cycle audit time must be within the visual score.");cd.push(Object.freeze({sequence:++Mm,id:n,logicalTime:e,source:g.clockSource}))}}var Q={time:{value:0},low:{value:0},mid:{value:0},high:{value:0},rms:{value:0},energy:{value:0},transient:{value:0},ritual:{value:0},ignite:{value:0},shutdown:{value:0},uPulseClock:{value:0},uPulses:{value:po},uPulseMeta:{value:mo},open:{value:0},tide:{value:0},section:{value:0},sectionLocal:{value:0},phaseTransition:{value:0},pixelRatio:{value:Fe.getPixelRatio()},resolution:{value:new he(innerWidth*Fe.getPixelRatio(),innerHeight*Fe.getPixelRatio())},spectrum:{value:Er},deepColor:{value:$r[0].deep.clone()},fogColor:{value:$r[0].fog.clone()},glowColor:{value:$r[0].glow.clone()},accentColor:{value:$r[0].accent.clone()},secondaryColor:{value:$r[0].secondary.clone()}},vn=(n={})=>({...Q,...n}),go={pulseAge:{value:99},pulseStrength:{value:0}},mr={pulseAge:{value:99},pulseStrength:{value:0},pulseScreen:{value:new he(.5,.5)},sonarMode:{value:0}},Xr={pulseAge:{value:99},pulseStrength:{value:0}};function ud(n){if(!Number.isInteger(n)||n<0||n>Yt)throw new RangeError(`Ninth Tide live pulse count must be an integer from 0 through ${Yt}.`);return 1/(1+Math.max(0,n-1)*.55)}function rs(){let n=rm(Kt);if(n.slots.length!==Yt)throw new Error(`Ninth Tide pulse history exposed ${n.slots.length} slots; expected ${Yt}.`);Q.uPulseClock.value=n.clockSeconds;let e=ud(n.slots.reduce((r,s)=>r+s.active,0));n.slots.forEach((r,s)=>{po[s].set(r.originX,r.sourceY,r.originZ,r.startTime),mo[s].set(r.strength,r.mode,r.contributionScale,r.active*e)});let t=g.shutdown>.5?null:am(Kt);go.pulseAge.value=t?.age??99,go.pulseStrength.value=t?t.strength*t.contributionScale*Math.exp(-t.age*.34):0;let i=g.shutdown>.5?null:sm(Kt);return mr.pulseAge.value=i?.age??99,mr.pulseStrength.value=i?i.strength*i.contributionScale*Math.exp(-i.age*.34):0,mr.pulseScreen.value.set(i?.screenX??.5,i?.screenY??.5),mr.sonarMode.value=i?.mode??0,t}function AS(){let n=document.createElement("canvas");n.width=n.height=256;let e=n.getContext("2d"),t=e.createRadialGradient(128,128,0,128,128,128);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.07,"rgba(210,255,246,.74)"),t.addColorStop(.28,"rgba(88,224,206,.22)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,256,256);let i=new Ra(n);return i.colorSpace=nn,i}var bm=AS(),CS=new $e({side:Zt,depthWrite:!1,uniforms:vn(),vertexShader:`
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
  `}),RS=new st(new ki(42,64,36),CS);cn.add(RS);function wm(){return new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
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
    uniform float ritual;
    uniform float shutdown;
    uniform float tide;
    uniform vec3 glowColor;
    uniform vec3 secondaryColor;
    ${wr}
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
      float wave = 0.0;
      float wake = 0.0;
      for (int pulseIndex = 0; pulseIndex < ${Yt}; pulseIndex++) {
        if (uPulseMeta[pulseIndex].w > 0.0) {
        float pulseAge = max(0.0, uPulseClock - uPulses[pulseIndex].w);
        float pulseStrength = pulseStrengthAt(pulseIndex, pulseAge) * (1.0 - step(0.5, shutdown));
        float pulseWaveStrength = pulseStrength * smoothstep(pulseLifetime(uPulseMeta[pulseIndex].y), 0.0, pulseAge);
        vec2 pulseOrigin = vec2(uPulses[pulseIndex].x, uPulses[pulseIndex].z);
        float localRadius = length(p - pulseOrigin);
        float waveRadius = pulseAge * (4.15 + low * 1.7);
        wave += exp(-abs(localRadius - waveRadius) * 1.55) * pulseWaveStrength;
        wake += step(localRadius, waveRadius) * exp(-(waveRadius - localRadius) * 0.23) * exp(-pulseAge * 0.12) * pulseStrength;
        }
      }
      float center = exp(-nr * 7.0) * (0.08 + low * 0.14);
      float scan = 0.5 + 0.5 * sin(radius * 8.5 - time * 0.75 + mid * 3.0);
      float edgeFade = smoothstep(1.0, 0.69, nr) * smoothstep(0.01, 0.07, nr);
      float activate = smoothstep(0.03, 0.58, ritual);
      float survive = 1.0 - smoothstep(0.43, 0.90, shutdown);
      vec3 color = mix(secondaryColor, glowColor, nr + wave * 0.7);
      float alpha = (rings + spokes + nine * 0.22 + center + wave * 2.4 + wake * 0.32 + scan * 0.008) * edgeFade * activate * survive;
      gl_FragColor = vec4(color * (0.22 + wave * 1.60 + wake * 0.18), alpha * 0.68);
    }
  `})}var hd=wm(),ea=new st(new Ia(16,256),hd);ea.rotation.x=-Math.PI/2;ea.position.y=-2.36;ea.renderOrder=1;cn.add(ea);var Qc=new Ns({color:67595,roughness:.22,metalness:.9,emissive:202520,emissiveIntensity:.12,transparent:!0,opacity:.78}),Em=new st(new Hi(4.25,4.7,.22,128),Qc);Em.position.y=-2.49;cn.add(Em);var dd=[];for(let n of[2.65,3.55,4.55]){let e=new st(new Nn(n,n===4.55?.012:.006,5,256),new dn({color:6543559,transparent:!0,opacity:.11,blending:ot,depthWrite:!1}));e.rotation.x=Math.PI/2,e.position.y=-2.34,dd.push(e),cn.add(e)}function Tm(n){let e=[];for(let t=0;t<n;t++){let i;t<9?i=0:t<Math.floor(n*.45)?i=1:i=2;let r=i===0?0:i===1?9:Math.floor(n*.45),s=i===0?9:i===1?Math.floor(n*.45)-9:n-Math.floor(n*.45),a=(t-r)/Math.max(1,s)*Math.PI*2+be(-.16,.16),o=Math.atan2(Math.sin(a-Math.PI/2),Math.cos(a-Math.PI/2)),l=i===0?.34:.54;Math.abs(o)<l&&(a+=(o>=0?1:-1)*(l-Math.abs(o)+be(.07,.24)));let c=i===0?be(5.15,6.2):i===1?be(8,13.8):be(14.5,24.5),h=be(i===2?.65:.5,i===2?1.8:1.35),d=be(.36,i===2?1.16:.86),u=be(i===0?1.2:1.7,i===2?7:5.1),f=new D(Math.cos(a)*c,-2.31+u*.5+be(-.08,i===2?.72:.34),Math.sin(a)*c),x=-a+Math.PI/2+be(-.18,.18),v=Mt((c-4.9)/20.2,0,1),p=Ei((t*.61803398875+i*.13)*.97);e.push({center:f,rotation:x,width:h,height:u,depth:d,order:v,band:p,seed:be(0,1e3),tier:i})}return e}var fu=Tm(we.assets.archiveCellCount);function Am(n,e,t,i){let r=Math.cos(n.rotation),s=Math.sin(n.rotation);return new D(n.center.x+e*r-i*s,n.center.y+t,n.center.z+e*s+i*r)}function Cm(n){let e=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],t=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],i=n.length*t.length*2,r=new Float32Array(i*3),s=new Float32Array(i*3),a=new Float32Array(i),o=new Float32Array(i),l=new Float32Array(i),c=0;for(let d of n)for(let u of t)for(let f of u){let x=e[f],v=Am(d,x[0]*d.width,x[1]*d.height,x[2]*d.depth);r[c*3]=v.x,r[c*3+1]=v.y,r[c*3+2]=v.z,s[c*3]=d.center.x,s[c*3+1]=d.center.y,s[c*3+2]=d.center.z,a[c]=d.band,o[c]=d.order,l[c]=d.seed,c++}let h=new tt;return h.setAttribute("position",new Le(r,3)),h.setAttribute("aCenter",new Le(s,3)),h.setAttribute("aBand",new Le(a,1)),h.setAttribute("aOrder",new Le(o,1)),h.setAttribute("aSeed",new Le(l,1)),h}function Rm(){return new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
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
    ${wr}
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
      float front = 0.0;
      float memory = 0.0;
      for (int pulseIndex = 0; pulseIndex < ${Yt}; pulseIndex++) {
        if (uPulseMeta[pulseIndex].w > 0.0) {
        float pulseAge = max(0.0, uPulseClock - uPulses[pulseIndex].w);
        float pulseStrength = pulseStrengthAt(pulseIndex, pulseAge) * (1.0 - step(0.5, shutdown));
        vec2 pulseOrigin = vec2(uPulses[pulseIndex].x, uPulses[pulseIndex].z);
        float waveRadius = pulseAge * (4.15 + low * 1.7);
        float distanceToPulse = length(aCenter.xz - pulseOrigin);
        front += exp(-abs(distanceToPulse - waveRadius) * 1.46) * pulseStrength;
        memory += step(distanceToPulse, waveRadius) * exp(-(waveRadius - distanceToPulse) * 0.105) * exp(-pulseAge * 0.055) * pulseStrength;
        }
      }
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
  `})}var fd=Rm(),nu=new Kn(Cm(fu),fd);cn.add(nu);function Pm(n,e){let t=n.length*e,i=new Float32Array(t*3),r=new Float32Array(t*3),s=new Float32Array(t),a=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t),c=0;for(let u=0;u<n.length;u++){let f=n[u];for(let x=0;x<e;x++){let v=Ei((x+1)*.754877666+f.seed*.013),p=Ei((x+1)*.569840296+f.seed*.021),m=Ei((x+1)*.438579021+f.seed*.034),S=(v-.5)*f.width*.82,w=(p-.5)*f.height*.88,b=(m-.5)*f.depth*.78,C=Am(f,S,w,b);i[c*3]=C.x,i[c*3+1]=C.y,i[c*3+2]=C.z,r[c*3]=f.center.x,r[c*3+1]=f.center.y,r[c*3+2]=f.center.z,s[c]=Mt(f.band+(v-.5)*.035,0,1),a[c]=f.order,o[c]=Ei(f.seed*.17+x*.6180339),l[c]=be(.72,2.25),c++}}let h=new tt;h.setAttribute("position",new Le(i,3)),h.setAttribute("aCenter",new Le(r,3)),h.setAttribute("aBand",new Le(s,1)),h.setAttribute("aOrder",new Le(a,1)),h.setAttribute("aSeed",new Le(o,1)),h.setAttribute("aSize",new Le(l,1));let d=new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
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
      ${wr}
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
        float front = 0.0;
        float memory = 0.0;
        for (int pulseIndex = 0; pulseIndex < ${Yt}; pulseIndex++) {
          if (uPulseMeta[pulseIndex].w > 0.0) {
          float pulseAge = max(0.0, uPulseClock - uPulses[pulseIndex].w);
          float pulseStrength = pulseStrengthAt(pulseIndex, pulseAge) * (1.0 - step(0.5, shutdown));
          vec2 pulseOrigin = vec2(uPulses[pulseIndex].x, uPulses[pulseIndex].z);
          float waveRadius = pulseAge * (4.15 + low * 1.7);
          float distanceToPulse = length(aCenter.xz - pulseOrigin);
          front += exp(-abs(distanceToPulse - waveRadius) * 1.42) * pulseStrength;
          memory += step(distanceToPulse, waveRadius) * exp(-(waveRadius - distanceToPulse) * 0.095) * exp(-pulseAge * 0.052) * pulseStrength;
          }
        }
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
    `});return new xi(h,d)}var ts=Pm(fu,we.assets.archivePointsPerCell);cn.add(ts);var Im=new _n;cn.add(Im);var ta=[],Dm=[],xo=new Hi(.035,1.18,6.05,we.assets.beamRadialSegments,1,!0);function Lm(n,e,t,i){return new $e({transparent:!0,depthWrite:!1,side:yn,blending:ot,uniforms:vn({band:{value:n},order:{value:e},centerXZ:{value:new he(t.x,t.z)},seed:{value:i}}),vertexShader:`
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
      ${wr}
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
        float resonance = 0.0;
        for (int pulseIndex = 0; pulseIndex < ${Yt}; pulseIndex++) {
          if (uPulseMeta[pulseIndex].w > 0.0) {
          float pulseAge = max(0.0, uPulseClock - uPulses[pulseIndex].w);
          float pulseStrength = pulseStrengthAt(pulseIndex, pulseAge) * (1.0 - step(0.5, shutdown));
          vec2 pulseOrigin = vec2(uPulses[pulseIndex].x, uPulses[pulseIndex].z);
          float waveRadius = pulseAge * 4.65;
          float d = length(centerXZ - pulseOrigin);
          resonance += exp(-abs(d - waveRadius) * 1.48) * pulseStrength;
          }
        }
        float filament = pow(abs(sin(vUv.y * 54.0 + time * (0.16 + band * 0.26) + seed)), 16.0);
        float grain = hash21(gl_FragCoord.xy + seed * 71.0);
        float alpha = edge * lengthFade * (0.008 + spec * 0.042 + resonance * 0.095 + high * 0.008);
        alpha *= activation * survive * mix(0.58, 1.0, grain);
        vec3 color = mix(glowColor, accentColor, spec * 0.46 + resonance * 0.7 + filament * 0.18);
        gl_FragColor = vec4(color * (0.34 + spec * 1.6 + resonance * 2.2), alpha);
      }
    `})}for(let n=0;n<9;n++){let e=n/9*Math.PI*2+.12,t=4.55+n%3*.18,i=new D(Math.cos(e)*t,3.72+Math.sin(e*2)*.16,Math.sin(e)*t),r=new _n;r.position.copy(i),r.rotation.y=-e+Math.PI/2,r.userData.angle=e,r.userData.seed=be(0,Math.PI*2),r.userData.band=(n+.5)/9,r.userData.order=n/8;let s=new st(xo,Lm(r.userData.band,r.userData.order,i,r.userData.seed));s.position.y=-3.025,r.add(s);let a=new dn({color:7921615,transparent:!0,opacity:0,blending:ot,depthWrite:!1}),o=new st(new Nn(.34,.012,5,96),a);o.rotation.x=Math.PI/2,r.add(o);let l=new st(new Nn(.27,.006,4,72),a.clone());l.rotation.y=Math.PI/2,r.add(l);let c=new Ds(new Nr({map:bm,color:8250837,transparent:!0,opacity:0,blending:ot,depthWrite:!1}));c.scale.set(.75,.75,1),r.add(c),Dm.push(i.x,9.8,i.z,i.x,3.78,i.z),Im.add(r),ta.push({root:r,beam:s,ring:o,crossRing:l,aperture:c,index:n})}var Nm=new tt;Nm.setAttribute("position",new Ye(Dm,3));var pd=new gi({color:7064507,transparent:!0,opacity:0,blending:ot,depthWrite:!1}),PS=new Kn(Nm,pd);cn.add(PS);var Fm=new $e({transparent:!0,depthWrite:!1,side:yn,blending:ot,uniforms:vn(go),vertexShader:`
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
  `}),En=new st(new ki(1,we.assets.sonarShellWidthSegments,we.assets.sonarShellHeightSegments),Fm);En.visible=!1;cn.add(En);var $i=new _n;cn.add($i);var IS=new $e({transparent:!0,depthWrite:!1,side:yn,blending:ot,uniforms:vn(go),vertexShader:`
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
  `}),ii=new st(new Hi(1,1,1,we.assets.sonarCurtainRadialSegments,20,!0),IS);ii.visible=!1;$i.add(ii);function Um(n){let e=new Float32Array(n*2*3),t=new tt;t.setAttribute("position",new Le(e,3).setUsage(dr));let i=new gi({color:9300956,transparent:!0,opacity:0,blending:ot,depthWrite:!1});return{count:n,positions:e,geometry:t,material:i,object:new Kn(t,i)}}var{count:iu,positions:qr,geometry:md,material:vo,object:vr}=Um(we.assets.sonarSpokeCount);vr.visible=!1;$i.add(vr);function Om(n){let e=new Aa(new vi(.055,1,.055),new dn({color:7986639,transparent:!0,opacity:0,blending:ot,depthWrite:!1}),n);return e.instanceMatrix.setUsage(dr),e}var _o=we.assets.sonarPillarCount,Jt=Om(_o);Jt.visible=!1;$i.add(Jt);var so=new kt;function Bm(n){let e=n*n*n,t=new Float32Array(e*3),i=new Float32Array(e),r=new Float32Array(e),s=0;for(let l=0;l<n;l++)for(let c=0;c<n;c++)for(let h=0;h<n;h++)t[s*3]=(h/(n-1)-.5)*2,t[s*3+1]=(c/(n-1)-.5)*2,t[s*3+2]=(l/(n-1)-.5)*2,i[s]=Ei((h+c*1.7+l*2.3)/n),r[s]=s*.731,s++;let a=new tt;a.setAttribute("position",new Le(t,3)),a.setAttribute("aBand",new Le(i,1)),a.setAttribute("aSeed",new Le(r,1));let o=new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(go),vertexShader:`
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
    `});return new xi(a,o)}var mn=Bm(we.assets.sonarLatticeSide);mn.visible=!1;$i.add(mn);function zm(n){let e=new Float32Array(n*2*3),t=new tt;t.setAttribute("position",new Le(e,3).setUsage(dr));let i=new gi({color:8840405,transparent:!0,opacity:0,blending:ot,depthWrite:!1});return{count:n,positions:e,geometry:t,material:i,object:new Kn(t,i)}}var{count:ru,positions:Yr,geometry:gd,material:yo,object:_r}=zm(we.assets.helixSegments);_r.visible=!1;$i.add(_r);var wi=new _n;for(let n=0;n<9;n++){let e=new Kn(new Da(new vi(1.9,1.15,.08)),new gi({color:n===8?14807764:7526859,transparent:!0,opacity:0,blending:ot,depthWrite:!1}));e.userData.index=n,wi.add(e)}wi.visible=!1;$i.add(wi);var Hm=Fm.clone();Hm.uniforms=vn(Xr);var Mn=new st(new ki(1,we.assets.sonarConvergenceWidthSegments,we.assets.sonarConvergenceHeightSegments),Hm);Mn.visible=!1;$i.add(Mn);var bn=new st(new Nn(1,.025,6,we.assets.nullRingTubularSegments),new dn({color:13037791,transparent:!0,opacity:0,blending:ot,depthWrite:!1}));bn.visible=!1;$i.add(bn);var Tn=new _n;Tn.position.y=.34;cn.add(Tn);var DS=new $e({transparent:!0,uniforms:vn(),vertexShader:`
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
  `}),ai=new st(new Or(1.02,we.assets.coreDetail),DS);ai.userData.interactive="core";Tn.add(ai);var $s=new st(new Or(1.28,2),new dn({color:9759452,wireframe:!0,transparent:!0,opacity:0,blending:ot,depthWrite:!1}));Tn.add($s);var So=new Ds(new Nr({map:bm,color:7660756,transparent:!0,opacity:0,blending:ot,depthWrite:!1}));So.scale.set(5,5,1);Tn.add(So);var yr=[];for(let n=0;n<9;n++){let e=1.43+n*.235,t=new dn({color:n===8?15069137:7526857,transparent:!0,opacity:0,blending:ot,depthWrite:!1}),i=new st(new Nn(e,n%3===0?.017:.007,5,we.assets.coreRingTubularSegments),t);i.rotation.set(be(-1.1,1.1),be(-Math.PI,Math.PI),be(-1.1,1.1)),i.userData.qualityBaseQuaternion=i.quaternion.clone(),i.userData.speed=be(.032,.105)*(n%2?-1:1),i.userData.index=n,yr.push(i),Tn.add(i)}var td=[],LS=new vi(.036,1.55,.28);for(let n=0;n<9;n++){let e=new Ns({color:398359,metalness:.92,roughness:.18,emissive:668722,emissiveIntensity:0,transparent:!0,opacity:0}),t=new st(LS,e),i=n/9*Math.PI*2;t.userData.angle=i,t.position.set(Math.cos(i)*1.02,Math.sin(i*2)*.09,Math.sin(i)*1.02),t.rotation.set(Math.sin(i)*.28,-i,Math.cos(i)*.22),td.push(t),Tn.add(t)}function km(n){let e=new tt,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n);for(let o=0;o<n;o++){let l=o%9,c=be(0,Math.PI*2),h=1.8+l*.22+be(-.1,.38);t[o*3]=Math.cos(c)*h,t[o*3+1]=be(-2.2,2.2)+Math.sin(c*(2+l%3))*.22,t[o*3+2]=Math.sin(c)*h,i[o]=be(0,Math.PI*2),r[o]=be(.8,2.8),s[o]=Ei(l/9+be(-.03,.03))}e.setAttribute("position",new Le(t,3)),e.setAttribute("aPhase",new Le(i,1)),e.setAttribute("aSize",new Le(r,1)),e.setAttribute("aBand",new Le(s,1));let a=new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
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
    `});return new xi(e,a)}var Xi=km(we.assets.forecastDustCount);Tn.add(Xi);function Vm(n){let e=new tt,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n),a=new Float32Array(n);for(let l=0;l<n;l++){let c=be(-1,1),h=be(0,Math.PI*2),d=Math.sqrt(Math.max(0,1-c*c)),u=Math.pow(be(.02,1),.42);t[l*3]=Math.cos(h)*d*u,t[l*3+1]=c*u,t[l*3+2]=Math.sin(h)*d*u,i[l]=be(0,1e3),r[l]=Ei(l*.61803398875+be(-.02,.02)),s[l]=be(0,1),a[l]=be(.65,2.45)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aSeed",new Le(i,1)),e.setAttribute("aBand",new Le(r,1)),e.setAttribute("aLayer",new Le(s,1)),e.setAttribute("aSize",new Le(a,1));let o=new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
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
    `});return new xi(e,o)}var Ri=Vm(we.assets.energyBodyCount);Ri.renderOrder=4;Tn.add(Ri);var NS=new Float32Array(wn*2*3),su=new tt;su.setAttribute("position",new Le(NS,3).setUsage(dr));var xd=new gi({color:10349019,transparent:!0,opacity:0,blending:ot,depthWrite:!1}),Gm=new Kn(su,xd);Tn.add(Gm);function Wm(n){let e=new tt,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n);for(let o=0;o<n;o++){let l=be(4,30),c=be(0,Math.PI*2);t[o*3]=Math.cos(c)*l,t[o*3+1]=be(-5,12),t[o*3+2]=Math.sin(c)*l,i[o]=be(0,Math.PI*2),r[o]=be(.025,.14),s[o]=be(.45,2.4)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aPhase",new Le(i,1)),e.setAttribute("aSpeed",new Le(r,1)),e.setAttribute("aSize",new Le(s,1));let a=new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
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
    `});return new xi(e,a)}var Sr=Wm(we.assets.mistCount);cn.add(Sr);function Xm(n){let e=new tt,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n);for(let o=0;o<n;o++){let l=be(3.5,18),c=be(0,Math.PI*2);t[o*3]=Math.cos(c)*l,t[o*3+1]=be(-7,11),t[o*3+2]=Math.sin(c)*l,i[o]=be(0,1e3),r[o]=be(1.6,8.5),s[o]=be(0,1)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aSeed",new Le(i,1)),e.setAttribute("aSize",new Le(r,1)),e.setAttribute("aBand",new Le(s,1));let a=new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
      attribute float aSeed;
      attribute float aSize;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float high;
      ${wr}
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
        float scatter = 0.0;
        for (int pulseIndex = 0; pulseIndex < ${Yt}; pulseIndex++) {
          if (uPulseMeta[pulseIndex].w > 0.0) {
          float pulseAge = max(0.0, uPulseClock - uPulses[pulseIndex].w);
          float pulseStrength = pulseStrengthAt(pulseIndex, pulseAge) * (1.0 - step(0.5, shutdown))
            * smoothstep(pulseLifetime(uPulseMeta[pulseIndex].y), 0.0, pulseAge);
          vec2 pulseOrigin = vec2(uPulses[pulseIndex].x, uPulses[pulseIndex].z);
          float waveRadius = pulseAge * 4.8;
          float waveDistance = abs(length(p.xz - pulseOrigin) - waveRadius);
          scatter += exp(-waveDistance * 0.68) * pulseStrength;
          }
        }
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
    `});return new xi(e,a)}var qi=Xm(we.assets.nearSnowCount);qi.renderOrder=8;cn.add(qi);function qm(n){let e=[],t=[],i=[],r=[];for(let o=0;o<n;o++){let l=o/n*Math.PI*2+be(-.12,.12),c=be(21,37),h=Math.cos(l)*c,d=Math.sin(l)*c,u=be(-6,-3),f=be(7,18),x=be(-1.3,1.3),v=(p,m,S,w,b,C)=>{e.push(p,m,S,w,b,C);for(let E=0;E<2;E++)t.push(h,(u+f)*.5,d),i.push(o*1.713),r.push(Ei(o*.381966))};v(h,u,d,h+x,f,d+be(-.8,.8));for(let p=1;p<5;p++){let m=Ai(u,f,p/5),S=be(.5,1.7)*(1-p*.08);v(h-Math.cos(l)*S,m,d-Math.sin(l)*S,h+Math.cos(l)*S,m,d+Math.sin(l)*S)}}let s=new tt;s.setAttribute("position",new Ye(e,3)),s.setAttribute("aCenter",new Ye(t,3)),s.setAttribute("aSeed",new Ye(i,1)),s.setAttribute("aBand",new Ye(r,1));let a=new $e({transparent:!0,depthWrite:!1,blending:ot,uniforms:vn(),vertexShader:`
      attribute vec3 aCenter;
      attribute float aSeed;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      ${wr}
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
        float resonance = 0.0;
        for (int pulseIndex = 0; pulseIndex < ${Yt}; pulseIndex++) {
          if (uPulseMeta[pulseIndex].w > 0.0) {
          float pulseAge = max(0.0, uPulseClock - uPulses[pulseIndex].w);
          float pulseStrength = pulseStrengthAt(pulseIndex, pulseAge) * (1.0 - step(0.5, shutdown))
            * smoothstep(pulseLifetime(uPulseMeta[pulseIndex].y), 0.0, pulseAge);
          vec2 pulseOrigin = vec2(uPulses[pulseIndex].x, uPulses[pulseIndex].z);
          float waveRadius = pulseAge * 4.8;
          resonance += exp(-abs(length(aCenter.xz - pulseOrigin) - waveRadius) * 0.52) * pulseStrength;
          }
        }
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
    `});return new Kn(s,a)}var Mr=qm(we.assets.abyssalSpineCount);cn.add(Mr);var Yi=[];for(let n=0;n<7;n++){let e=new dn({color:2513764,transparent:!0,opacity:.012,blending:ot,depthWrite:!1}),t=new st(new Nn(13+n*3.2,.018+n*.002,3,we.assets.pressureStrataTubularSegments),e);t.position.y=-5.2+n*2.25,t.rotation.set(Math.PI*.5+be(-.16,.16),be(-.35,.35),be(-.12,.12)),t.userData.qualityBaseQuaternion=t.quaternion.clone(),t.userData.seed=be(0,10),Yi.push(t),cn.add(t)}var Ym=new Ua(6539453,515,.15);xn.add(Ym);var pu=new Fs(6805704,0,18,2.05);pu.position.copy(Tn.position);xn.add(pu);var mu=new Fs(2910320,0,34,1.5);mu.position.set(0,9,-5);xn.add(mu);function $m(n,e){let t=new Gc(n),i=null,r=null,s=null,a=null,o=null;try{return i=new Wc(xn,Xt),t.addPass(i),r=new Xs(new he(e.width,e.height),e.bloomInitialStrength,.72,.22),t.addPass(r),s=new qc(.865),t.addPass(s),a=new Ws({uniforms:{tDiffuse:{value:null},time:Q.time,resolution:Q.resolution,energy:Q.energy,high:Q.high,ritual:Q.ritual,shutdown:Q.shutdown,pulseAge:mr.pulseAge,pulseStrength:mr.pulseStrength,pulseScreen:mr.pulseScreen,section:Q.section,sectionLocal:Q.sectionLocal,phaseTransition:Q.phaseTransition,sonarMode:mr.sonarMode,deepColor:Q.deepColor,fogColor:Q.fogColor,glowColor:Q.glowColor},vertexShader:`
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
  `}),t.addPass(a),o=new $c(0),t.addPass(o),t.setPixelRatio(e.effectivePixelRatio),t.setSize(e.width,e.height),{composer:t,renderPass:i,bloom:r,afterimage:s,veilPass:a,ditheredOutputPass:o}}catch(l){for(let c of[r,s,a,o])c&&typeof c.dispose=="function"&&c.dispose();throw t.dispose(),l}}var{composer:bt,renderPass:au,bloom:gn,afterimage:Bt,veilPass:ou,ditheredOutputPass:Ks}=$m(Fe,we);function nd(n){let e=new Set;for(let i of n){if(!i||typeof i.dispose!="function")throw new TypeError("Ninth Tide tier-owned resources must expose dispose().");if(e.has(i))throw new Error("Ninth Tide tier-owned resource was registered more than once.");e.add(i)}let t=!1;return Object.freeze({size:e.size,dispose(){if(t)throw new Error("Ninth Tide tier-owned resources were disposed more than once.");t=!0;let i=[];for(let r of[...e].reverse())try{r.dispose()}catch(s){i.push(s)}if(i.length>0)throw new AggregateError(i,"Ninth Tide tier-owned resource disposal failed.")}})}function FS(){return nd([hd,nu.geometry,fd,ts.geometry,ts.material,xo,...ta.map(({beam:n})=>n.material),En.geometry,ii.geometry,md,vo,Jt,Jt.geometry,Jt.material,mn.geometry,mn.material,gd,yo,Mn.geometry,bn.geometry,ai.geometry,...yr.map(n=>n.geometry),Xi.geometry,Xi.material,Ri.geometry,Ri.material,Sr.geometry,Sr.material,qi.geometry,qi.material,Mr.geometry,Mr.material,...Yi.map(n=>n.geometry)])}function gu(n){for(let e of[n.bloom,n.afterimage,n.veilPass,n.ditheredOutputPass]){if(!e||typeof e.dispose!="function")throw new TypeError("Ninth Tide postprocess passes must expose dispose().");e.dispose()}n.composer.dispose()}function US(n,e,t){let i=[];for(let r of[()=>n.dispose(),()=>gu(e),()=>t.forceContextLoss(),()=>t.dispose()])try{r()}catch(s){i.push(s)}if(i.length>0)throw new AggregateError(i,"Ninth Tide retired quality generation disposal failed.")}function id(){return{pulseHistory:Kt,pulseSlotCount:Yt,pulseVectors:po,pulseMetaVectors:mo,pulseHistoryShaderHeader:wr}}function eu(n){Kt=n.pulseHistory,Yt=n.pulseSlotCount,po=n.pulseVectors,mo=n.pulseMetaVectors,wr=n.pulseHistoryShaderHeader,Q.uPulses.value=po,Q.uPulseMeta.value=mo}function OS(n){let e=lm(Kt,n.pulse),t=n.pulse.maxPulses;if(e.totalCapacity!==t)throw new Error(`Ninth Tide projected ${e.totalCapacity} pulse slots; expected ${t}.`);return{pulseHistory:e,pulseSlotCount:t,pulseVectors:Array.from({length:t},()=>new ut),pulseMetaVectors:Array.from({length:t},()=>new ut),pulseHistoryShaderHeader:ym(t)}}function BS(){let n=[],e=new Set;return{own(t){if(!t||typeof t.dispose!="function")throw new TypeError("Ninth Tide staged resources must expose dispose().");if(e.has(t))throw new Error("Ninth Tide staged resource was registered more than once.");return e.add(t),n.push(t),t},finish(){return nd(n)},disposePartial(){n.length>0&&nd(n).dispose()}}}function Zm(n){let e=id(),t=ti.getState(),i=OS(n),r=BS(),s=null,a=null;try{eu(i),ti.setState(9545716);let o=r.own(wm()),l=Tm(n.assets.archiveCellCount),c=r.own(Cm(l)),h=r.own(Rm()),d=Pm(l,n.assets.archivePointsPerCell);r.own(d.geometry),r.own(d.material);let u=r.own(new Hi(.035,1.18,6.05,n.assets.beamRadialSegments,1,!0)),f=[],x=ta.map(({root:V})=>{let K=be(0,Math.PI*2);return f.push(K),r.own(Lm(V.userData.band,V.userData.order,V.position,K))}),v=r.own(new ki(1,n.assets.sonarShellWidthSegments,n.assets.sonarShellHeightSegments)),p=r.own(new Hi(1,1,1,n.assets.sonarCurtainRadialSegments,20,!0)),m=Um(n.assets.sonarSpokeCount);r.own(m.geometry),r.own(m.material);let S=Om(n.assets.sonarPillarCount);r.own(S),r.own(S.geometry),r.own(S.material);let w=Bm(n.assets.sonarLatticeSide);r.own(w.geometry),r.own(w.material);let b=zm(n.assets.helixSegments);r.own(b.geometry),r.own(b.material);let C=r.own(new ki(1,n.assets.sonarConvergenceWidthSegments,n.assets.sonarConvergenceHeightSegments)),E=r.own(new Nn(1,.025,6,n.assets.nullRingTubularSegments)),P=r.own(new Or(1.02,n.assets.coreDetail)),y=yr.map((V,K)=>{let ne=1.43+K*.235,ue=r.own(new Nn(ne,K%3===0?.017:.007,5,n.assets.coreRingTubularSegments)),Me=new Ln(be(-1.1,1.1),be(-Math.PI,Math.PI),be(-1.1,1.1));return{geometry:ue,baseQuaternion:new rn().setFromEuler(Me),speed:be(.032,.105)*(K%2?-1:1)}}),A=km(n.assets.forecastDustCount);r.own(A.geometry),r.own(A.material);let I=Vm(n.assets.energyBodyCount);r.own(I.geometry),r.own(I.material);let R=Wm(n.assets.mistCount);r.own(R.geometry),r.own(R.material);let F=Xm(n.assets.nearSnowCount);r.own(F.geometry),r.own(F.material);let W=qm(n.assets.abyssalSpineCount);r.own(W.geometry),r.own(W.material);let X=Yi.map((V,K)=>{let ne=r.own(new Nn(13+K*3.2,.018+K*.002,3,n.assets.pressureStrataTubularSegments)),ue=new Ln(Math.PI*.5+be(-.16,.16),be(-.35,.35),be(-.12,.12));return{geometry:ne,baseQuaternion:new rn().setFromEuler(ue),seed:be(0,10)}});s=Sm(n),a=$m(s,n);let O=ti.getState(),H=r.finish();return eu(e),ti.setState(t),{profile:n,pulseBinding:i,randomState:O,owner:H,renderer:s,postprocess:a,assets:{floorMaterial:o,archiveCells:l,archiveWireGeometry:c,archiveWireMaterial:h,archivePoints:d,beamGeometry:u,beamSeeds:f,beamMaterials:x,sonarShellGeometry:v,sonarCurtainGeometry:p,spokeAssets:m,pillars:S,lattice:w,helixAssets:b,sonarConvergenceGeometry:C,sonarNullGeometry:E,coreGeometry:P,coreRingStates:y,forecastDust:A,energyBody:I,mist:R,nearSnow:F,abyssalSpines:W,pressureStates:X}}}catch(o){throw a&&gu(a),s&&(s.forceContextLoss(),s.dispose()),r.disposePartial(),eu(e),ti.setState(t),o}}function bi(n,e){let t=n.parent;if(!t)throw new Error("Ninth Tide cannot replace a detached tier-owned object.");let i=t.children.indexOf(n);if(i<0)throw new Error("Ninth Tide tier-owned parent does not contain its object.");e.position.copy(n.position),e.quaternion.copy(n.quaternion),e.scale.copy(n.scale),e.visible=n.visible,e.renderOrder=n.renderOrder,e.frustumCulled=n.frustumCulled,t.remove(n),t.add(e);let r=t.children.indexOf(e);t.children.splice(r,1),t.children.splice(i,0,e)}function dm(n,e){let t=n.userData.qualityBaseQuaternion;if(!(t instanceof rn))throw new Error("Ninth Tide tier-owned pose is missing its base quaternion.");let i=n.quaternion.clone().multiply(t.clone().invert());n.quaternion.copy(i.multiply(e)),n.userData.qualityBaseQuaternion=e.clone()}var On=Object.freeze({number:1,profile:we,owner:FS()}),jm=null,vd=null,tu=null,oo={rendererPixelRatio:0,rendererSize:0,composerPixelRatio:0,composerSize:0};function zS(n,e){if(!n.parent||!n.parent.children.includes(n))throw new Error(`Ninth Tide ${e} is detached before quality commit.`)}function HS(n){if(tu==="before-live-swap")throw new Error("Ninth Tide injected quality commit failure before live swap.");if(!n||n.owner===On.owner)throw new Error("Ninth Tide staged generation must have independent ownership.");let e=n.assets;if(e.beamMaterials.length!==ta.length||e.coreRingStates.length!==yr.length||e.pressureStates.length!==Yi.length)throw new Error("Ninth Tide staged generation has incomplete tier-owned arrays.");for(let[i,r]of[["archive points",ts],["sonar spokes",vr],["sonar pillars",Jt],["sonar lattice",mn],["sonar helix",_r],["forecast dust",Xi],["energy body",Ri],["mist",Sr],["near snow",qi],["abyssal spines",Mr]])zS(r,i);for(let i of[...yr,...Yi])if(!(i.userData.qualityBaseQuaternion instanceof rn))throw new Error("Ninth Tide tier-owned pose is missing its base quaternion.");if(e.pillars.instanceMatrix.usage!==dr)throw new Error("Ninth Tide staged sonar pillars must use dynamic instance matrices.");let t=je("#scene");if(Fe.domElement.parentNode!==t||n.renderer.domElement.parentNode!==null)throw new Error("Ninth Tide renderer canvases are not ready for atomic quality commit.")}function kS(n){let e=[];for(let t of[()=>n.owner.dispose(),()=>gu(n.postprocess),()=>n.renderer.forceContextLoss(),()=>n.renderer.dispose()])try{t()}catch(i){e.push(i)}if(e.length>0)throw new AggregateError(e,"Ninth Tide staged quality generation cleanup failed.");return Object.freeze({resourceCount:n.owner.size,contextLost:n.renderer.getContext().isContextLost()})}function VS(n){HS(n);let e=On,t=Fe,i=t.domElement,r={composer:bt,renderPass:au,bloom:gn,afterimage:Bt,veilPass:ou,ditheredOutputPass:Ks},s=n.assets;ea.material=s.floorMaterial,hd=s.floorMaterial,fu=s.archiveCells,nu.geometry=s.archiveWireGeometry,nu.material=s.archiveWireMaterial,fd=s.archiveWireMaterial,bi(ts,s.archivePoints),ts=s.archivePoints,xo=s.beamGeometry,ta.forEach(({root:o,beam:l},c)=>{l.geometry=xo,l.material=s.beamMaterials[c],o.userData.seed=s.beamSeeds[c]}),En.geometry=s.sonarShellGeometry,ii.geometry=s.sonarCurtainGeometry,bi(vr,s.spokeAssets.object),iu=s.spokeAssets.count,qr=s.spokeAssets.positions,md=s.spokeAssets.geometry,vo=s.spokeAssets.material,vr=s.spokeAssets.object,bi(Jt,s.pillars),_o=n.profile.assets.sonarPillarCount,Jt=s.pillars,bi(mn,s.lattice),mn=s.lattice,bi(_r,s.helixAssets.object),ru=s.helixAssets.count,Yr=s.helixAssets.positions,gd=s.helixAssets.geometry,yo=s.helixAssets.material,_r=s.helixAssets.object,Mn.geometry=s.sonarConvergenceGeometry,bn.geometry=s.sonarNullGeometry,ai.geometry=s.coreGeometry,yr.forEach((o,l)=>{let c=s.coreRingStates[l];dm(o,c.baseQuaternion),o.geometry=c.geometry,o.userData.speed=c.speed}),bi(Xi,s.forecastDust),Xi=s.forecastDust,bi(Ri,s.energyBody),Ri=s.energyBody,bi(Sr,s.mist),Sr=s.mist,bi(qi,s.nearSnow),qi=s.nearSnow,bi(Mr,s.abyssalSpines),Mr=s.abyssalSpines,Yi.forEach((o,l)=>{let c=s.pressureStates[l];dm(o,c.baseQuaternion),o.geometry=c.geometry,o.userData.seed=c.seed}),je("#scene").replaceChild(n.renderer.domElement,i),eu(n.pulseBinding),we=n.profile,ti.setState(n.randomState),Fe=n.renderer,{composer:bt,renderPass:au,bloom:gn,afterimage:Bt,veilPass:ou,ditheredOutputPass:Ks}=n.postprocess,Xt.aspect=we.width/we.height,Xt.updateProjectionMatrix(),Q.pixelRatio.value=we.effectivePixelRatio,Q.resolution.value.set(we.width*we.effectivePixelRatio,we.height*we.effectivePixelRatio),rs(),On=Object.freeze({number:e.number+1,profile:we,owner:n.owner}),jm=Object.freeze({number:e.number,resourceCount:e.owner.size}),US(e.owner,r,t)}function Jm(n){try{VS(n)}catch(e){if(On.owner!==n.owner)try{let t=kS(n);vd=Object.freeze({resourceCount:t.resourceCount,contextLost:t.contextLost,message:e instanceof Error?e.message:String(e)})}catch(t){throw new AggregateError([e,t],"Ninth Tide quality commit and staged cleanup both failed.")}throw e}}var At=null,fm=null,jt=null,Zs=null,Wt=null,Zr=null,Ti=null,Km=Gp(ES),rd=Vp();function na(){Km.reset(),rd.reset()}function _d(n){na(),J.audio.preload="auto",J.audio.src=n,J.audio.load()}function GS(){J.audio.hasAttribute("src")||_d("./archive.mp3")}async function lu(n){try{await n.play()}catch(e){if(!(e instanceof DOMException)||e.name!=="AbortError")throw e}}var Qm="shader-demo-room",e0=1,WS=Object.freeze(["pause","stats","set-preview"]),yd=window.parent!==window,Sd=null,mt=null,Xn=document.hidden,cu={documentHidden:document.hidden,hostPaused:!1},gr=new Set,jr=new Set,Qs=!1,ho=Promise.resolve(),wo=!1,An=!1,nt=null,Kr=!1,sd=null,br=0,pm=120,on={frameCount:0,sampleStartedAt:performance.now(),sampleFrames:0,fps:0,frameTimeMs:0};function XS(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.getPrototypeOf(n)===Object.prototype}function ns(n,e){if(!XS(n))return!1;let t=Object.keys(n).sort(),i=[...e].sort();return t.length===i.length&&t.every((r,s)=>r===i[s])}function t0(n,e){yd&&window.parent.postMessage({context:Qm,v:e0,instanceId:Sd,type:n,payload:e},location.origin)}function uu(n){t0("stats",{fps:on.fps,frameTimeMs:on.frameTimeMs,frameCount:on.frameCount,paused:n})}function Md(n=performance.now()){on.sampleStartedAt=n,on.sampleFrames=0}function qS(n){on.frameCount++,on.sampleFrames++;let e=n-on.sampleStartedAt;e<500||(on.fps=on.sampleFrames*1e3/e,on.frameTimeMs=e/on.sampleFrames,uu(!1),Md(n))}async function YS(){for(;;){let n=Xn;if(n){for(let e of document.querySelectorAll("audio"))!e.paused&&!e.ended&&gr.add(e);for(let e of gr)!e.paused&&!e.ended&&e.pause();At?.state==="running"&&jr.add(At),await Promise.all([...jr].map(e=>e.state==="running"?e.suspend():void 0))}else{await Promise.all([...jr].map(t=>t.state==="suspended"?t.resume():void 0));let e=new Set(gr);Qs&&e.add(J.audio);for(let t of e)t.isConnected&&t.paused&&!t.ended&&await lu(t)}if(Xn===n){n||(gr.clear(),jr.clear(),Qs=!1);return}}}function Mo(){ho=ho.then(YS).catch(n=>{console.error("Ninth Tide media pause transition failed.",n)})}async function $S({elementWasOwned:n,contextWasOwned:e,startWasPending:t}){let i=At;ho=ho.then(async()=>{n||gr.delete(J.audio),!e&&i&&jr.delete(i),t||(Qs=!1),Xn&&i?.state==="running"&&await i.suspend()}).catch(r=>{console.error("Ninth Tide media intent rollback failed.",r)}),await ho}function Eo(){!Xn&&!wo&&!An&&mt===null&&(mt=requestAnimationFrame(xM))}function n0(){let n=cu.documentHidden||cu.hostPaused;if(n!==Xn){if(Xn=n,Xn){mt!==null&&cancelAnimationFrame(mt),mt=null,Mo(),uu(!0);return}xr.reset(),Md(),Mo(),uu(!1),Eo()}}function i0(){cu.documentHidden=document.hidden,n0()}function ZS(n){return ns(n,["context","v","instanceId","type","payload"])&&n.context===Qm&&n.v===e0}function r0(n){if(!yd||n.origin!==location.origin||n.source!==window.parent)return;let e=n.data;if(!ZS(e))throw new Error("Invalid Ninth Tide bridge command envelope.");if(e.instanceId===Sd){if(typeof e.type!="string")throw new Error("Invalid Ninth Tide bridge command type.");if(e.type==="set-paused"){if(!ns(e.payload,["paused"])||typeof e.payload.paused!="boolean")throw new Error("Invalid Ninth Tide set-paused payload.");cu.hostPaused=e.payload.paused,n0();return}if(e.type==="set-tide-preview"){if(!ns(e.payload,["mode","section"]))throw new Error("Invalid Ninth Tide set-tide-preview payload.");let{mode:t,section:i}=e.payload;if(!["opening","main","ending"].includes(t)||!Number.isInteger(i)||i<0||i>8)throw new Error("Invalid Ninth Tide set-tide-preview payload.");vu(t,i);return}throw new Error(`Unsupported Ninth Tide bridge command: ${e.type}.`)}}function jS(){if(document.addEventListener("visibilitychange",i0),!!yd){if(typeof crypto.randomUUID!="function")throw new Error("Embedded Ninth Tide requires crypto.randomUUID().");Sd=crypto.randomUUID(),window.addEventListener("message",r0),t0("ready",{capabilities:[...WS]}),Xn&&uu(!0)}}J.audio.addEventListener("loadedmetadata",()=>{J.timeTotal.textContent=ao(J.audio.duration)});J.audio.addEventListener("play",()=>{if(Xn){gr.add(J.audio),Qs=!0,J.audio.pause(),Mo();return}na(),g.playing=!0,J.audioState.textContent="PLAYING",J.signal.textContent="LIVE FFT"});J.audio.addEventListener("pause",()=>{na(),g.playing=!1,g.ended||(J.audioState.textContent=g.audioReady?"PAUSED":"STANDBY")});J.audio.addEventListener("seeking",na);J.audio.addEventListener("ended",()=>{g.clockSource==="audio"&&o0(Gn)});J.audio.addEventListener("error",()=>{g.audioFailed=!0,J.fileLabel.hidden=!1,J.hint.textContent="\u672A\u80FD\u8BFB\u53D6 archive.mp3\u3002\u8BF7\u9009\u62E9\u672C\u5730\u97F3\u9891\u6587\u4EF6\u7EE7\u7EED\u3002",J.audioState.textContent="FILE REQUIRED"});async function JS(){if(!At){let n=window.AudioContext||window.webkitAudioContext;if(!n)throw new Error("Web Audio API unavailable");At=new n,fm=At.createMediaElementSource(J.audio),jt=At.createAnalyser(),jt.fftSize=2048,jt.smoothingTimeConstant=.82,jt.minDecibels=-94,jt.maxDecibels=-16,Zs=At.createGain(),Zs.gain.value=0,fm.connect(jt),jt.connect(Zs),Zs.connect(At.destination),Wt=new Uint8Array(jt.frequencyBinCount),Zr=new Uint8Array(jt.fftSize)}Xn?(jr.add(At),Mo()):At.state!=="running"&&await At.resume(),g.audioReady=!0}function KS(n,e,t){if(!["audio","silent"].includes(n))throw new TypeError(`Unknown Ninth Tide clock source: ${String(n)}.`);if(!Number.isFinite(e)||e<0)throw new RangeError("Ninth Tide round origin must be finite and non-negative.");if(typeof t!="boolean")throw new TypeError("Ninth Tide restarting flag must be boolean.");g.clockSource=n,Jr!==null&&(clearTimeout(Jr),Jr=null),t?Js("replay",Gn):(cd.length=0,Mm=0),na(),Jc(Kt),g.calibrated=!1,g.ceremonyTime=0,g.ceremonyCue=0,g.ritual=0,g.ignite=0,g.lightLevel=0,g.shutdown=0,g.ending=!1,g.ended=!1,g.endingCue=0,g.finishCount=0,g.roundStartedAt=e,g.round+=1,g.archiveOpen=0,g.archiveOpenTarget=0,g.pulseCooldown=0,g.tideIndex=0,g.transitionFrom=0,g.pendingTide=-1,g.phaseLocal=0,g.phaseTransition=0,g.transitionClock=99,g.transitionSwitched=!1,Q.section.value=0,Q.sectionLocal.value=0,Q.phaseTransition.value=0,rs(),ri.set("--phase-veil","0"),g.diveTarget=.12,g.yawTarget=0,g.pitchTarget=.07,document.body.classList.add("entered"),document.body.classList.remove("calibrated","ending","ended"),is("\u5F00\u573A\u6821\u51C6\u4E2D"),J.coreState.textContent="CALIBRATING",J.fieldState.textContent="DARK ADAPTATION",J.mode.textContent="CALIBRATION",ri.set("--blackout","1"),ri.set("--ritual-caption","0"),Js(t?"chapter-I":"enter",0),t||Js("chapter-I",0)}async function ia(n,e=!1){if(!["audio","silent"].includes(n))throw new TypeError(`Unknown Ninth Tide clock source: ${String(n)}.`);if(!g.entered||e||g.ended)g.entered=!0,KS(n,xr.getElapsed(),e),Number.isFinite(J.audio.duration)&&(J.audio.currentTime=0);else if(g.clockSource!==n)throw new Error("Ninth Tide cannot change clock source during an active round.");if(n==="silent"){g.audioReady=!1,g.playing=!1,J.signal.textContent="SYNTHETIC",J.audioState.textContent="SILENT";return}let t=At!==null&&jr.has(At);try{if(J.enter.disabled=!0,J.enter.textContent="\u6B63\u5728\u6821\u51C6\u2026",GS(),await JS(),(e||g.ended||J.audio.currentTime>.2)&&(J.audio.currentTime=0),Xn){let i=gr.has(J.audio),r=Qs;gr.add(J.audio),Qs=!0,Mo();try{await lu(J.audio)}catch(s){throw await $S({elementWasOwned:i,contextWasOwned:t,startWasPending:r}),s}}else await lu(J.audio);J.enter.textContent="\u542F\u52A8\u5171\u9E23\u4EEA\u5F0F",J.enter.disabled=!1}catch(i){let r=i instanceof DOMException&&i.name==="NotAllowedError";r||console.error(i),g.entered=!1,g.clockSource="",document.body.classList.remove("entered"),J.enter.disabled=!1,J.enter.textContent="\u91CD\u8BD5\u97F3\u9891",J.fileLabel.hidden=!1,J.hint.textContent=r?"\u6D4F\u89C8\u5668\u963B\u6B62\u4E86\u97F3\u9891\u64AD\u653E\u3002\u70B9\u51FB\u201C\u91CD\u8BD5\u97F3\u9891\u201D\u7EE7\u7EED\uFF1B\u5DF2\u8F7D\u5165\u97F3\u9891\u4E0D\u4F1A\u91CD\u590D\u4E0B\u8F7D\u3002":"\u672A\u80FD\u64AD\u653E\u5F53\u524D\u97F3\u9891\u3002\u8BF7\u9009\u62E9\u672C\u5730\u97F3\u9891\u6587\u4EF6\uFF0C\u6216\u70B9\u51FB\u201C\u91CD\u8BD5\u97F3\u9891\u201D\u3002",J.audioState.textContent=r?"PLAYBACK BLOCKED":"FILE REQUIRED",g.audioFailed=!0}}function s0(){if(!["audio","silent"].includes(g.clockSource))throw new Error("Ninth Tide replay requires a completed round clock source.");return ia(g.clockSource,!0)}J.enter.addEventListener("click",()=>ia("audio"));J.silent.addEventListener("click",()=>ia("silent"));J.replay.addEventListener("click",s0);J.file.addEventListener("change",async n=>{let e=n.target.files?.[0];e&&(Ti&&URL.revokeObjectURL(Ti),Ti=URL.createObjectURL(e),_d(Ti),g.audioFailed=!1,J.fileLabel.hidden=!0,J.hint.textContent=`\u5DF2\u8F7D\u5165 ${e.name}`,await ia("audio",!0))});window.addEventListener("dragover",n=>n.preventDefault());window.addEventListener("drop",async n=>{n.preventDefault();let e=[...n.dataTransfer.files].find(t=>t.type.startsWith("audio/"));e&&(Ti&&URL.revokeObjectURL(Ti),Ti=URL.createObjectURL(e),_d(Ti),await ia("audio",!0),ln(`AUDIO LOADED / ${e.name.toUpperCase()}`,2200))});function Zh(n,e){if(!jt||!Wt||!At)return 0;let t=At.sampleRate/2,i=Mt(Math.floor(n/t*Wt.length),0,Wt.length-1),r=Mt(Math.ceil(e/t*Wt.length),i+1,Wt.length),s=0;for(let a=i;a<r;a++)s+=Wt[a];return s/((r-i)*255)}function QS(n){if(jt&&Wt&&g.playing&&At){let e=At.sampleRate/2;for(let t=0;t<wn;t++){let i=t/wn,r=(t+1)/wn,s=28*Math.pow(17e3/28,i),a=28*Math.pow(17e3/28,r),o=Mt(Math.floor(s/e*Wt.length),0,Wt.length-1),l=Mt(Math.ceil(a/e*Wt.length),o+1,Wt.length),c=0;for(let h=o;h<l;h++)c+=Wt[h];Wn[t]=Math.round(c/Math.max(1,l-o))}}else for(let e=0;e<wn;e++){let i=22+31*Math.exp(-e/32)*(.55+.45*Math.sin(n*(.42+e*.006)+e*.53));Wn[e]=Mt(Math.round(i),0,255)}Er.needsUpdate=!0}function eM(n){if(n===Wt&&At){let i=At.sampleRate/2;return Mt(Math.ceil(um/i*n.length),0,n.length-1)}let e=Math.log(17e3/28),t=Math.log(um/28)/e;return Mt(Math.ceil(t*n.length),0,n.length-1)}function tM(n){return g.playing?rd.advance(J.audio.currentTime):(rd.reset(),n)}function nM(n,e){let t,i,r,s=0;if(jt&&g.playing){jt.getByteFrequencyData(Wt),jt.getByteTimeDomainData(Zr),t=Math.pow(Zh(24,190),1.14),i=Math.pow(Zh(190,2100),1.22),r=Math.pow(Zh(2100,9200),1.08);let d=0;for(let u=0;u<Zr.length;u+=4){let f=(Zr[u]-128)/128;d+=f*f}s=Math.sqrt(d/(Zr.length/4))}else g.syntheticPhase+=n,t=.14+.065*(.5+.5*Math.sin(e*1.08)),i=.1+.052*(.5+.5*Math.sin(e*.43+1.2)),r=.05+.03*(.5+.5*Math.sin(e*1.91+2.5)),s=.08+t*.28;g.low=pn(g.low,t,8,n),g.mid=pn(g.mid,i,7.2,n),g.high=pn(g.high,r,9,n),g.rms=pn(g.rms,s,9,n);let a=Mt(g.low*.48+g.mid*.34+g.high*.22+g.rms*.3,0,1),o=Math.max(0,a-g.previousEnergy)*8.6;g.transient=pn(g.transient,o,o>g.transient?26:7,n),g.previousEnergy=a,g.energy=pn(g.energy,a,7.8,n),QS(e);let l=jt&&Wt&&g.playing&&At?Wt:Wn,c=tM(n),h=c>0?Km.update(l,c,{bandStartIndex:eM(l),selectedPath:TS[g.tideIndex]}):{onset:!1,strength:0};if(Q.low.value=g.low,Q.mid.value=g.mid,Q.high.value=g.high,Q.rms.value=g.rms,Q.energy.value=g.energy,Q.transient.value=g.transient,$h.low.set("--v",Mt(g.low*1.75,0,1).toFixed(3)),$h.mid.set("--v",Mt(g.mid*1.95,0,1).toFixed(3)),$h.high.set("--v",Mt(g.high*2.8,0,1).toFixed(3)),Zs&&At){let d=St(.12,Qh?.55:1.75,g.ceremonyTime),u=1-St(.53,.98,g.shutdown),f=g.muted?0:.92*d*u;Zs.gain.setTargetAtTime(f,At.currentTime,.07)}g.pulseCooldown=Math.max(0,g.pulseCooldown-n),g.calibrated&&!g.ending&&g.playing&&h.onset&&g.pulseCooldown<=0&&(si({origin:new he(0,0),strength:.48+h.strength*.7,sourceY:.32,announce:!1,mode:g.tideIndex,source:"auto"}),g.pulseCooldown=1.15+(1-g.low)*.7)}function a0(n){ni.x=n.clientX/innerWidth*2-1,ni.y=-(n.clientY/innerHeight)*2+1,J.cursor.style.transform=`translate3d(${n.clientX}px,${n.clientY}px,0)`}window.addEventListener("pointermove",n=>{if(a0(n),g.dragging&&!g.ending){let e=n.clientX-g.lastPointerX,t=n.clientY-g.lastPointerY;g.yawTarget-=e*.0042,g.pitchTarget=Mt(g.pitchTarget+t*.0026,-.3,.5),g.dragDistance+=Math.hypot(e,t)}g.lastPointerX=n.clientX,g.lastPointerY=n.clientY});window.addEventListener("pointerdown",n=>{n.target.closest("button, label, input")||g.ending||(a0(n),g.dragging=!0,g.dragDistance=0,g.lastPointerX=n.clientX,g.lastPointerY=n.clientY,J.cursor.classList.add("active"))});window.addEventListener("pointerup",n=>{g.dragging&&(g.dragging=!1,J.cursor.classList.remove("active"),g.dragDistance<8&&iM(n))});window.addEventListener("pointercancel",()=>{g.dragging=!1,J.cursor.classList.remove("active")});window.addEventListener("wheel",n=>{g.ending||(g.diveTarget=Mt(g.diveTarget+n.deltaY*55e-5,0,1))},{passive:!0});function iM(n){if(!g.calibrated||g.ending)return;if(ni.x=n.clientX/innerWidth*2-1,ni.y=-(n.clientY/innerHeight)*2+1,uo.setFromCamera(ni,Xt),uo.intersectObject(ai,!1)[0]){g.archiveOpenTarget=g.archiveOpenTarget>.5?0:1,J.mode.textContent=g.archiveOpenTarget?"DECODING":"OBSERVATION",J.coreState.textContent=g.archiveOpenTarget?"UNSEALED":"RESONANT",si({origin:new he(0,0),strength:1.35,sourceY:.34,announce:!0,mode:g.tideIndex,source:"user"}),ln(g.archiveOpenTarget?"OPEN":"SEALED",850);return}let t=uo.intersectObject(ea,!1)[0];t?(si({origin:new he(t.point.x,t.point.z),strength:1.05,sourceY:-2.28,announce:!0,mode:g.tideIndex,source:"user"}),ln(["PRESSURE","CURTAIN","QUARTZ","PILLARS","FORECAST","COUNTERTIDE","CODEX","GAZE","NULL"][g.tideIndex],760)):si({origin:new he(ni.x*5,-ni.y*5),strength:.7,sourceY:.1,announce:!0,mode:g.tideIndex,source:"user"})}function si({origin:n,strength:e,sourceY:t,announce:i,mode:r,source:s}){Xt.updateMatrixWorld(!0);let a=ed.set(n.x,t,n.y).project(Xt);nm(Kt,{originX:n.x,originZ:n.y,sourceY:t,screenX:a.x*.5+.5,screenY:a.y*.5+.5,strength:e,mode:r,source:s}),rs(),En.position.set(n.x,t,n.y),En.scale.setScalar(.001),En.visible=r===0,i&&(g.pulseCooldown=.95)}window.addEventListener("keydown",async n=>{n.code==="Space"?(n.preventDefault(),g.ended?await s0():g.entered?g.audioReady&&(J.audio.paused?await lu(J.audio):J.audio.pause()):await ia("audio")):n.key.toLowerCase()==="m"?(g.muted=!g.muted,J.audioState.textContent=g.muted?"MUTED":g.playing?"PLAYING":"PAUSED",ln(g.muted?"AUDIO MUTED":"AUDIO RESTORED")):n.key.toLowerCase()==="f"?document.fullscreenElement?document.exitFullscreen?.():document.documentElement.requestFullscreen?.():n.key.toLowerCase()==="r"&&!g.ending&&(g.diveTarget=.12,g.yawTarget=0,g.pitchTarget=.07,ln("VIEWPOINT RECALIBRATED"))});var jh=[{time:.58,text:"FIRST RETURN",strength:.52,y:-2.28,mode:0},{time:1.52,text:"NO FLOOR",strength:.62,y:-2.28,mode:1},{time:2.62,text:"DEPTH BELOW DEPTH",strength:.72,y:-2.28,mode:2},{time:4.1,text:"NINE ROOMS",strength:.86,y:.34,mode:3},{time:5.62,text:"FIRST LIGHT",strength:1.32,y:.34,mode:4},{time:7.45,text:"IT LOOKS BACK",strength:.92,y:.34,mode:7}];function rM(n){let e="",t="",i="";n<1.65?(i="I",e="\u542C\u3002",t="LISTEN."):n<3.55?(i="II",e="\u6D77\u5E8A\u6CA1\u6709\u56DE\u7B54\u3002",t="NO FLOOR ANSWERED."):n<5.75?(i="III",e="\u661F\u56FE\u6C89\u5728\u66F4\u6DF1\u5904\u3002",t="THE STARS LIE LOWER."):(i="IX",e="\u5B83\u5148\u770B\u89C1\u4E86\u6211\u4EEC\u3002",t="IT SAW US FIRST."),J.ritualIndex.textContent=i,J.ritualMain.textContent=e,J.ritualSub.textContent=t;let r=St(.18,.62,n)*(1-St(8,9.1,n));ri.set("--ritual-caption",r.toFixed(3))}function sM(n){if(!g.entered||g.calibrated||g.previewMode==="main")return;g.audioReady&&Number.isFinite(J.audio.currentTime)?g.ceremonyTime=J.audio.currentTime:g.ceremonyTime+=n*(Qh?2:1);let e=g.ceremonyTime;for(g.ritual=es(.4,7.7,e),g.ignite=es(4.15,8,e),g.lightLevel=Mt(St(.12,1.05,e)*.22+St(2.25,7.85,e)*.78,0,1),Q.ritual.value=g.ritual,Q.ignite.value=g.ignite,rM(e);g.ceremonyCue<jh.length&&e>=jh[g.ceremonyCue].time;){let t=jh[g.ceremonyCue++];si({origin:new he(0,0),strength:t.strength,sourceY:t.y,announce:!1,mode:t.mode,source:"system"}),ln(t.text,1300)}e>=(Qh?4.2:8.65)&&(g.calibrated=!0,g.ritual=1,g.ignite=1,Q.ritual.value=1,Q.ignite.value=1,document.body.classList.add("calibrated"),J.coreState.textContent="RESONANT",J.fieldState.textContent="LIVE / 64 BANDS",J.mode.textContent="OBSERVATION",is("\u7B2C I \u7AE0 \xB7 \u65E0\u6708\u6D4B\u6DF1"),ri.set("--ritual-caption","0"))}function aM(){return g.ended?!1:(g.shutdown=1,Q.shutdown.value=1,g.ending=!0,g.ended=!0,g.finishCount+=1,g.playing=!1,document.body.classList.add("ending"),Jr=setTimeout(()=>{Jr=null,document.body.classList.add("ended"),Js("epilogue",Gn)},700),is("\u4F53\u9A8C\u7ED3\u675F \xB7 \u5DF2\u5F52\u6863"),J.audioState.textContent="CLOSED",J.coreState.textContent="EXTINGUISHED",J.fieldState.textContent="NO RETURN",ri.set("--blackout","1"),!0)}function oM(){let n=[];return g.shutdown=Math.max(g.shutdown,.68),Q.shutdown.value=g.shutdown,g.ending||(g.ending=!0,n.push("shutdown-start"),document.body.classList.add("ending"),J.mode.textContent="WITHDRAWAL",is("\u7EC8\u5E55\u9000\u6F6E\u4E2D \xB7 \u7B2C IX \u7AE0")),g.endingCue===0&&(g.endingCue=1,n.push("outer-silence"),ln("OUTER SILENCE",1450)),g.endingCue===1&&(g.endingCue=2,n.push("echo-reverses"),si({origin:new he(0,0),strength:.82,sourceY:.34,announce:!1,mode:8,source:"system"}),ln("THE ECHO REVERSES",1550)),Object.freeze(n)}function o0(n){if(!g.entered||g.previewMode==="main"||g.previewMode==="opening")return Object.freeze([]);if(g.previewMode==="ending")return oM();let e=zp({shutdown:g.shutdown,started:g.ending,cueCursor:g.endingCue,finished:g.ended},n,Gn);g.shutdown=e.state.shutdown,g.ending=e.state.started,g.endingCue=e.state.cueCursor,Q.shutdown.value=g.shutdown;for(let t of e.transitions)if(Js(t,n),t==="shutdown-start")document.body.classList.add("ending"),J.mode.textContent="WITHDRAWAL",is("\u7EC8\u5E55\u9000\u6F6E\u4E2D \xB7 \u7B2C IX \u7AE0");else if(t==="outer-silence")ln("OUTER SILENCE",1450);else if(t==="echo-reverses")si({origin:new he(0,0),strength:.82,sourceY:.34,announce:!1,mode:8,source:"system"}),ln("THE ECHO REVERSES",1550);else if(t==="last-light")ln("LAST LIGHT",1450);else if(t==="finish")aM();else throw new Error(`Unknown Ninth Tide ending transition: ${t}.`);if(g.ended!==e.state.finished||g.finishCount>1)throw new Error("Ninth Tide ending reducer diverged from the committed ending state.");return e.transitions}var Jh={deep:new Ae,fog:new Ae,glow:new Ae,accent:new Ae,secondary:new Ae},bo=-1;function l0(){if(Ci||g.previewMode!==""||!g.entered||g.clockSource==="silent")return Gn;if(g.clockSource!=="audio")throw new Error(`Unknown Ninth Tide clock source: ${String(g.clockSource)}.`);if(!g.audioReady||J.audio.readyState<HTMLMediaElement.HAVE_METADATA)return null;if(!Number.isFinite(J.audio.duration)||J.audio.duration<=0)throw new RangeError("Ninth Tide audio duration must be a positive finite number.");return J.audio.duration}function c0(n,e){let t;if(g.previewMode==="main"){let i=Mt(g.previewSection,0,8);t=Ai(Wi[i],Wi[i+1],.46)}else if(g.previewMode==="ending")t=346;else if(g.previewMode==="opening")t=Gh(n,cm,Gn);else if(!g.entered)t=0;else if(g.clockSource==="audio")t=e===null?0:Bp(J.audio.currentTime,e,Gn);else if(g.clockSource==="silent")t=Gh(n-g.roundStartedAt,cm,Gn);else throw new Error(`Unknown Ninth Tide clock source: ${String(g.clockSource)}.`);return Mt(t,0,Gn)}function mm(n,e){let t=g.tideIndex;g.tideIndex=n,t!==8&&n===8&&Js("chapter-IX",e)}function lM(n,e){let t=Wi.length-2;for(let c=0;c<Wi.length-1;c++)if(n<Wi[c+1]){t=c;break}t!==g.tideIndex&&g.pendingTide!==t&&(g.transitionFrom=g.tideIndex,g.pendingTide=t,g.transitionClock=0,g.transitionSwitched=!1);let i=1;g.pendingTide>=0&&(g.transitionClock+=e,i=Mt(g.transitionClock/wS,0,1),!g.transitionSwitched&&i>=.49&&(g.transitionSwitched=!0,mm(g.pendingTide,n),Q.section.value=g.tideIndex,g.calibrated&&!g.ending&&si({origin:new he(0,0),strength:.58,sourceY:.34,announce:!1,mode:g.tideIndex,source:"system"})),i>=1&&(mm(g.pendingTide,n),g.pendingTide=-1,g.transitionClock=99,g.transitionSwitched=!1,i=1)),g.phaseTransition=g.pendingTide>=0?Math.pow(Math.sin(i*Math.PI),1.18):0,Q.phaseTransition.value=g.phaseTransition,ri.set("--phase-veil",(g.phaseTransition*.72).toFixed(3)),ri.set("--phase-turn",g.phaseTransition.toFixed(3));let r=Wi[g.tideIndex],s=Wi[g.tideIndex+1];g.phaseLocal=Mt((n-r)/Math.max(.01,s-r),0,1),g.tideFloat=g.tideIndex+g.phaseLocal,Q.section.value=g.tideIndex,Q.sectionLocal.value=g.phaseLocal,Q.tide.value=g.tideFloat;let a=g.pendingTide>=0?g.transitionFrom:g.tideIndex,o=g.pendingTide>=0?g.pendingTide:g.tideIndex,l=g.pendingTide>=0?es(.08,.92,i):0;for(let c of Object.keys(Jh))Jh[c].lerpColors($r[a][c],$r[o][c],l),Q[`${c}Color`].value.copy(Jh[c]);if(xn.fog.color.copy(Q.fogColor.value),xn.background.copy(Q.deepColor.value),pu.color.copy(Q.glowColor.value),mu.color.copy(Q.secondaryColor.value),$s.material.color.copy(Q.glowColor.value),So.material.color.copy(Q.glowColor.value),xd.color.copy(Q.accentColor.value),pd.color.copy(Q.secondaryColor.value),vo.color.copy(Q.glowColor.value),Jt.material.color.copy(Q.glowColor.value),yo.color.copy(Q.accentColor.value),bn.material.color.copy(Q.accentColor.value),dd.forEach(c=>c.material.color.copy(Q.glowColor.value)),g.tideIndex!==bo){bo=g.tideIndex;let c=co[g.tideIndex];J.phaseNumber.textContent=c[0],J.phaseName.textContent=c[1],J.phaseSub.textContent=c[2],J.sideTicks.forEach((h,d)=>h.classList.toggle("active",d===g.tideIndex)),g.calibrated&&!g.ending&&is(`\u7B2C ${c[0]} \u7AE0 \xB7 ${c[1]}`),g.calibrated&&!g.ending&&g.activeSeconds>2&&ln(`${c[0]} \xB7 ${c[1]}`,1150)}}function cM(n){g.dive=pn(g.dive,g.diveTarget,4.1,n),g.yaw=pn(g.yaw,g.yawTarget,5,n),g.pitch=pn(g.pitch,g.pitchTarget,5,n),pr.lerp(ni,1-Math.exp(-n*4.5));let e=1-g.ritual,t=Ai(13,5.25,Math.pow(g.dive,1.08))+e*1.6+g.shutdown*2.7,i=g.yaw+pr.x*(g.dragging?.015:.095)+e*.05,r=g.pitch+pr.y*(g.dragging?.01:.05)-g.shutdown*.035,s=.17+g.dive*.22,a=Math.cos(r)*t;hm.set(Math.sin(i)*a,s+Math.sin(r)*t*.67,Math.cos(i)*a),Xt.position.lerp(hm,1-Math.exp(-n*4.2)),Xt.lookAt(0,s,0),Xt.rotation.z=pn(Xt.rotation.z,-pr.x*.007-g.transient*.003,4,n);let o=Math.round(3860+g.dive*740);J.depth.textContent=`\u2212${String(o).padStart(6,"0")} M`,J.coord.textContent=`${(i*12.7).toFixed(3)} / ${(r*17.4).toFixed(3)}`}function uM(){let n=su.attributes.position.array,e=g.tideIndex,t=g.phaseLocal;for(let i=0;i<wn;i++){let r=i/wn,s=r*Math.PI*2,a=Wn[i]/255,o=i*6,l,c,h,d,u,f;if(e===0){let v=1.34+a*.74;l=Math.cos(s)*1.18,c=Math.sin(s*3+Q.time.value*.18)*.13,h=Math.sin(s)*1.18,d=Math.cos(s)*v,u=c+(a-.2)*.13,f=Math.sin(s)*v}else if(e===1){let x=Math.pow(Math.abs(Math.cos(s*4.5)),8),v=.78+x*.32,p=v+.28+a*(.65+x*.65);l=Math.cos(s)*v,c=(r-.5)*1.15,h=Math.sin(s)*v,d=Math.cos(s)*p,u=c+Math.sin(s*9)*a*.18,f=Math.sin(s)*p}else if(e===2){let x=Math.round(r*12)/12*Math.PI*2,v=.72,p=1.15+a*.88;l=Math.cos(x)*v,c=Math.sin(s*5)*.42,h=Math.sin(x)*v,d=Math.cos(x)*p,u=c+(a-.25)*.34,f=Math.sin(x)*p}else if(e===3){let x=(r-.5)*2.4;l=x,c=-.82,h=Math.sin(s*3)*.13,d=x,u=-.2+a*2.25,f=h+Math.cos(s*2)*.09}else if(e===4){let v=.74*(.45+Math.pow(Math.abs(Math.sin(s*4.5)),3)*.74),p=v+.34+a*.83;l=Math.cos(s)*v,c=Math.sin(s*2)*.2,h=Math.sin(s)*v,d=Math.cos(s)*p,u=c+Math.sin(s*9)*a*.32,f=Math.sin(s)*p}else if(e===5){let x=(r-.5)*2.7,v=s*2+x*2.8+Q.time.value*.35,p=.72,m=p+.24+a*.48;l=Math.cos(v)*p,c=x,h=Math.sin(v)*p,d=Math.cos(v)*m,u=x+(a-.4)*.13,f=Math.sin(v)*m}else if(e===6){let x=Math.floor(r*9),v=Ei(r*9);c=(x/8-.5)*2.2,u=c,l=-1.2+v*2.4,d=l+.18+a*1.15,h=(x-4)*.018,f=h+Math.sin(s*4+Q.time.value)*.035}else if(e===7){let v=.92+a*.72;l=Math.cos(s)*.7*1.45,c=Math.sin(s)*.7*.58,h=0,d=Math.cos(s)*v*1.45,u=Math.sin(s)*v*.58,f=Math.sin(s*3)*a*.14}else{let x=.46-t*.1,v=x+.08+a*.22;l=Math.cos(s)*x,c=Math.sin(s*2)*.04,h=Math.sin(s)*x,d=Math.cos(s)*v,u=c,f=Math.sin(s)*v}n[o]=l,n[o+1]=c,n[o+2]=h,n[o+3]=d,n[o+4]=u,n[o+5]=f}su.attributes.position.needsUpdate=!0}function hM(n,e){g.archiveOpen=pn(g.archiveOpen,g.archiveOpenTarget,4,n),Q.open.value=g.archiveOpen;let t=g.tideIndex,i=g.phaseTransition,s=[.55,.92,.42,.2,.68,1.15,.34,.48,.12][t];Tn.rotation.y+=n*(.02+s*.055+g.mid*.055)*(1-g.shutdown*.7),Tn.rotation.x=Math.sin(e*(.07+s*.05))*(t===5?.075:.035)+pr.y*.025,Tn.rotation.z=Math.sin(e*.061)*.02-pr.x*.018+(t===6?Math.sin(e*.17)*.035:0);let o=[g.low,g.high,g.mid,g.low,g.mid,g.mid,g.high,g.transient,g.low][t],l=1+o*.09+g.transient*.025+i*.08,h=[[1,1,1],[1.05,1.28,1.05],[1.08,1.08,1.08],[.56,1.72,.56],[1.18,.92,1.18],[.82,1.38,.82],[1.42,1.2,.28],[1.46,.62,.34],[.48,.48,.48]][t];ed.set(h[0]*l,h[1]*l,h[2]*l),ai.scale.lerp(ed,1-Math.exp(-n*(4+i*8)));let d=1-St(.76,.98,g.shutdown)*.78,u=t===6?.85:t===7?.9:t===8?.46:1;$s.scale.set(h[0]*u,h[1]*u,h[2]*u).multiplyScalar((1+g.archiveOpen*.2+g.high*.025+i*.32)*d),$s.rotation.x+=n*(.05+s*.11+g.high*.08),$s.rotation.y-=n*(.04+s*.09+g.mid*.07),$s.material.opacity=(.08+g.high*.24+g.archiveOpen*.08+i*.22)*g.ignite*(1-St(.73,.98,g.shutdown));let f=[1,1.24,.86,.94,1.34,1.02,.78,1.22,.54][t];So.material.opacity=(.1+o*.38+g.transient*.28+i*.4)*g.ignite*(1-St(.72,.96,g.shutdown)),So.scale.setScalar((4+f*.8+o*1.2+g.archiveOpen*.7+i*2)*(1-St(.68,.98,g.shutdown)*.86)),pu.intensity=(5+o*29+g.archiveOpen*9+g.transient*16+i*26)*g.ignite*(1-St(.72,.99,g.shutdown)),Ri.rotation.y+=n*([.03,.075,.015,.01,.04,-.09,.008,.018,.004][t]+g.mid*.025),Ri.rotation.z=t===5?Math.sin(e*.18)*.12:t===6?.04:Math.sin(e*.055)*.025;for(let x of yr){let v=x.userData.index,p=v%2?-1:1,m=[.75,1.6,.35,.25,.95,2,.18,.48,.08][t];x.rotation.x+=n*x.userData.speed*m*(1+g.mid*1.15),x.rotation.y-=n*x.userData.speed*.7*m*(1+g.high),t===3&&(x.rotation.z=pn(x.rotation.z,v%2?Math.PI/2:0,2.2,n)),t===6&&(x.rotation.x=pn(x.rotation.x,Math.PI/2,1.8,n)),t===7&&(x.rotation.x=pn(x.rotation.x,Math.PI/2,2.4,n));let S=St(v/9*.55,v/9*.55+.25,g.ignite),w=St(.5+(8-v)/9*.34,.82+(8-v)/9*.16,g.shutdown),b=1+g.archiveOpen*(.05+v*.017)+o*.012;t===1&&(b*=.86+v%3*.14),t===4&&(b*=.88+Math.sin(v/9*Math.PI)*.32),t===8&&(b*=.48+(1-g.phaseLocal)*.32);let C=t===7?.46:t===6?.72:1;x.scale.set(b,b*C,b).multiplyScalar(1-w*.92),x.material.opacity=((v%3===0?.2:.065)+g.high*(v%3===0?.3:.14)+g.archiveOpen*.05+i*.16)*S*(1-w),x.material.color.copy(v===8?Q.accentColor.value:Q.glowColor.value)}for(let x=0;x<td.length;x++){let v=td[x],p=v.userData.angle+e*(t===5?-.06:.018),m=St(x/9*.55,x/9*.55+.25,g.ignite),S=t===4?.95+g.mid*.65:t===7?-.32+g.high*.2:t===8?-.65:0,w=.92+g.archiveOpen*(.9+x*.022)+S*.48+i*.45;v.position.x=Math.cos(p)*w,v.position.z=Math.sin(p)*w,v.position.y=Math.sin(p*2+e*.25)*(.06+g.archiveOpen*.17)+(t===3?(x-4)*.13:0),v.rotation.y=-p+g.archiveOpen*Math.PI*.34+S*.38,v.rotation.z=Math.cos(p)*.2+g.archiveOpen*(x%2?-.58:.58)+(t===6?Math.PI*.42:0),v.material.emissive.copy(x===8?Q.accentColor.value:Q.secondaryColor.value),v.material.emissiveIntensity=(.05+g.mid*.5+g.archiveOpen*.28+i*.5)*m,v.material.opacity=(t===8?.16:.34)*m*(1-St(.64,.94,g.shutdown))}Xi.rotation.y-=n*(.008+g.mid*.028)*(t===5?-2.2:1),Xi.rotation.z=Math.sin(e*.075)*(t===6?.02:.05),Gm.rotation.y+=n*(t===5?-.055:t===3?.008:.018),xd.opacity=(.08+g.high*.3+g.archiveOpen*.09+i*.24)*g.ignite*(1-St(.65,.94,g.shutdown)),uM()}function dM(n,e){let t=St(.18,.78,g.ritual),i=g.shutdown>.5?[]:Ys(Kt),r=ud(i.length);pd.opacity=.04*t*(1-g.shutdown);for(let s of ta){let{root:a,ring:o,crossRing:l,aperture:c,index:h}=s,d=Mt(Math.floor(a.userData.band*(wn-1)),0,wn-1),u=Wn[d]/255,f=a.userData.angle,x=0;for(let b of i){let C=Math.hypot(a.position.x-b.originX,a.position.z-b.originZ),E=b.age*(4.15+g.low*1.7);b.mode===1?E=b.age*(2.2+g.high*.8):b.mode===3?E=b.age*2.5:b.mode===7?E=Ai(18,.15,es(0,4.05,b.age)):b.mode===8&&(E=Ai(10.5,.15,es(0,4.3,b.age)));let P=b.mode===6?.55:b.mode>=7?.82:1.35;x+=Math.exp(-Math.abs(C-E)*P)*b.strength*b.contributionScale*Math.exp(-b.age*.34)*r}let v=St(h/9*.55,h/9*.55+.28,g.ritual),p=.18+(1-h/8)*.46,m=1-St(p,p+.19,g.shutdown),S=[.8,1.45,.52,.32,.92,1.75,.38,.62,.18][g.tideIndex],w=g.tideIndex===5?-1:1;a.rotation.z=Math.sin(e*(.15+h*.006)*S+a.userData.seed)*(.045+u*.17+x*.19),a.rotation.x=Math.cos(e*.12*w+f)*(.018+u*.08+(g.tideIndex===3?g.low*.1:0)),o.rotation.z+=n*(.12+u*.5)*(h%2?-1:1),l.rotation.x+=n*(.08+g.mid*.25),o.material.color.copy(Q.glowColor.value),l.material.color.copy(h===8?Q.accentColor.value:Q.secondaryColor.value),o.material.opacity=(.08+u*.48+x*.58)*v*m,l.material.opacity=(.04+g.high*.16+x*.34)*v*m,c.material.color.copy(h===8?Q.accentColor.value:Q.glowColor.value),c.material.opacity=(.13+u*.62+x*.72)*v*m,c.scale.setScalar(.55+u*.55+x*.7)}}function fM(n){im(Kt,n);let e=rs();En.visible=!1,ii.visible=!1,vr.visible=!1,Jt.visible=!1,mn.visible=!1,_r.visible=!1,wi.visible=!1,Mn.visible=!1,bn.visible=!1,vo.opacity=0,Jt.material.opacity=0,yo.opacity=0;for(let l of wi.children)l.material.opacity=0;if(Xr.pulseAge.value=99,Xr.pulseStrength.value=0,g.shutdown>.5){let l=St(.5,.92,g.shutdown);Mn.visible=!0,Mn.position.set(0,.34,0),Mn.scale.setScalar(Ai(22,.035,l)),Xr.pulseAge.value=l*5.35,Xr.pulseStrength.value=(1-l)*1.08;return}if(!e)return;let{mode:t}=e,i=Mt(e.age/e.lifetime,0,1),r=Math.pow(1-i,.62)*e.strength*e.contributionScale*Math.exp(-e.age*.34);if(r<=.008)return;let s=e.originX,a=e.sourceY,o=e.originZ;if(t===0){let l=Math.max(.01,e.age*(4.15+g.low*1.7));En.visible=!0,En.position.set(s,a,o),En.scale.setScalar(l)}else if(t===1){ii.visible=!0,ii.position.set(s,-.2+a*.2,o),ii.rotation.y=Q.time.value*.11;let l=.2+e.age*(2.2+g.high*.8);ii.scale.set(l,5.2+e.age*1.3,l)}else if(t===2){vr.visible=!0;let l=Math.max(.05,e.age*2);for(let c=0;c<iu;c++){let h=c/iu,d=h*Math.PI*2,u=Wn[Math.floor(h*(wn-1))]/255,f=Math.round(h*18)/18*Math.PI*2,x=l+.34+u*2.2+Math.pow(Math.abs(Math.cos(d*4.5)),8)*.95,v=c*6;qr[v]=s+Math.cos(f)*l,qr[v+1]=a+Math.sin(d*5+Q.time.value)*.16,qr[v+2]=o+Math.sin(f)*l,qr[v+3]=s+Math.cos(f)*x,qr[v+4]=a+(u-.25)*1.1,qr[v+5]=o+Math.sin(f)*x}md.attributes.position.needsUpdate=!0,vo.opacity=r*(.28+g.high*.45)}else if(t===3){Jt.visible=!0;let l=.35+e.age*2.5;for(let c=0;c<_o;c++){let h=c/_o,d=h*Math.PI*2,u=Wn[Math.floor(h*(wn-1))]/255,f=.18+u*(2.4+g.low*2.1)+Math.pow(Math.sin(i*Math.PI),2)*.55;so.position.set(s+Math.cos(d)*l,a-1.7+f*.5,o+Math.sin(d)*l),so.scale.set(.7+u*.45,f,.7+u*.45),so.rotation.y=-d,so.updateMatrix(),Jt.setMatrixAt(c,so.matrix)}Jt.instanceMatrix.needsUpdate=!0,Jt.material.opacity=r*(.22+g.mid*.38)}else if(t===4)mn.visible=!0,mn.position.set(s,a,o),mn.rotation.y=Q.time.value*.18,mn.rotation.x=Math.sin(Q.time.value*.11)*.22,mn.scale.setScalar(.45+e.age*1.02);else if(t===5){_r.visible=!0;for(let l=0;l<ru;l++){let c=l/(ru-1),h=l%2,d=(c-.5)*(4.2+e.age*.7),u=c*Math.PI*8+Q.time.value*(h?-1.1:.9)+h*Math.PI,f=Wn[Math.floor(c*(wn-1))]/255,x=.6+e.age*.62+f*.38,v=u+.13,p=l*6;Yr[p]=s+Math.cos(u)*x,Yr[p+1]=a+d,Yr[p+2]=o+Math.sin(u)*x,Yr[p+3]=s+Math.cos(v)*x,Yr[p+4]=a+d+.045,Yr[p+5]=o+Math.sin(v)*x}gd.attributes.position.needsUpdate=!0,yo.opacity=r*(.25+g.mid*.52)}else if(t===6){wi.visible=!0,wi.position.set(s,a,o),wi.rotation.y=Q.time.value*.07;for(let l of wi.children){let c=l.userData.index,h=St(c/12,c/12+.32,i)*(1-St(.62+c/30,1,i)),d=(c-4)*(.18+e.age*.12);l.position.set(Math.sin(c*1.7)*e.age*.08,(c-4)*.12,d),l.rotation.z=(c-4)*.035+Math.sin(Q.time.value*.4+c)*.02,l.scale.setScalar(.62+e.age*.52+c*.025),l.material.opacity=h*r*(.25+g.high*.42)}}else if(t===7){Mn.visible=!0,Xr.pulseAge.value=e.age,Xr.pulseStrength.value=e.strength*e.contributionScale*Math.exp(-e.age*.34),Mn.position.set(s,a,o);let l=Ai(18+g.high*3,.18,es(0,1,i));Mn.scale.set(l*1.15,l*.58,l)}else{bn.visible=!0,bn.position.set(s,a,o),bn.rotation.x=Math.PI/2+Math.sin(Q.time.value*.17)*.18,bn.rotation.y=Q.time.value*-.12;let l=Ai(10.5,.15,es(0,1,i));bn.scale.set(l*1.25,l*.72,l),bn.material.opacity=r*(.22+g.high*.35)}}function pM(n,e){Sr.rotation.y+=n*.0018,qi.rotation.y-=n*.0032,Mr.rotation.y+=n*7e-4;let t=g.shutdown>.5?[]:Ys(Kt),i=ud(t.length),r=[.0185,.0205,.019,.024,.018,.021,.023,.026,.03];xn.fog.density=pn(xn.fog.density,r[g.tideIndex]+g.dive*.0035+g.phaseTransition*.0025,1.8,n);for(let h=0;h<Yi.length;h++){let d=Yi[h];d.rotation.z+=n*(.0014+h*24e-5)*(h%2?-1:1),d.rotation.y+=n*8e-4,d.material.color.copy(h%3===0?Q.glowColor.value:Q.secondaryColor.value);let u=0;for(let f of t)u+=f.age<4.5?f.strength*f.contributionScale*Math.exp(-f.age*.34)*Math.exp(-Math.abs(h-f.age*1.15)*.72)*i:0;d.material.opacity=(.005+g.high*.007+u*.055+g.phaseTransition*.025)*g.ritual*(1-g.shutdown)}Qc.emissive.copy(Q.secondaryColor.value),Qc.emissiveIntensity=(.035+g.low*.22)*g.ritual*(1-g.shutdown),Qc.opacity=.34+g.ritual*.28,dd.forEach((h,d)=>{h.rotation.z+=n*(.004+d*.002)*(d%2?-1:1);let u=t.reduce((f,x)=>f+(x.age<3?x.strength*x.contributionScale*.075*Math.exp(-x.age*.34)*i:0),0);h.material.opacity=(.018+g.high*.06+u)*g.ritual*(1-g.shutdown)}),mu.intensity=.55*g.ritual*(1-g.shutdown)+g.high*1.6+g.phaseTransition*1.8,Ym.intensity=.035+g.ritual*.115;let s=[.52,.64,.58,.49,.68,.6,.5,.72,.38];gn.strength=((we.tier==="mobile"?.42:s[g.tideIndex])+g.energy*.54+g.archiveOpen*.05+g.phaseTransition*.65)*(.22+g.lightLevel*.78)*(1-St(.78,1,g.shutdown)*.72),gn.radius=.64+g.high*.1+g.phaseTransition*.15+g.shutdown*.08;let a=g.tideIndex===5?.905:g.tideIndex===7?.925:g.tideIndex===8?.94:.86;Bt.uniforms.damp.value=g.shutdown>.45?Ai(.9,.982,St(.45,.9,g.shutdown)):a+g.high*.018+g.phaseTransition*.035;let o=[.86,.8,.76,.68,.88,.8,.7,.74,.54];Fe.toneMappingExposure=(.025+g.lightLevel*(o[g.tideIndex]+g.energy*.1+g.phaseTransition*.12))*(1-St(.76,1,g.shutdown)*.96);let l=St(.72,1,g.shutdown),c=Math.max(1-g.lightLevel,l);ri.set("--blackout",c.toFixed(4))}function mM(){if(we.coarse||g.dragging||!g.calibrated||g.ending)return;uo.setFromCamera(ni,Xt);let n=uo.intersectObject(ai,!1).length>0;n!==g.coreHovered&&(g.coreHovered=n,J.cursor.classList.toggle("active",n))}function gM(n,e){let t=Mt(n/Gn,0,1),i=g.clockSource==="audio"&&e!==null?t*e:n,r=e??0;J.timeNow.textContent=ao(i),J.timeTotal.textContent=ao(r),ri.set("--progress",`${(t*100).toFixed(3)}%`),J.index.textContent=`09\u2013${String(Math.floor(t*9999)).padStart(4,"0")}`,J.archiveProgress.setAttribute("aria-valuenow",(t*100).toFixed(1)),J.archiveProgress.setAttribute("aria-valuetext",`${ao(i)} / ${ao(r)}`)}function fo(n,e){g.activeSeconds+=n,Q.time.value=e,g.previewMode==="main"?(g.ritual=1,g.ignite=1,g.lightLevel=1,Q.ritual.value=1,Q.ignite.value=1):g.previewMode==="ending"&&(g.ritual=1,g.ignite=1,g.lightLevel=1,g.shutdown=Math.max(g.shutdown,.68),Q.ritual.value=1,Q.ignite.value=1,Q.shutdown.value=g.shutdown),nM(n,e),sM(n);let t=l0(),i=c0(e,t);o0(i),lM(i,n),cM(n),hM(n,e),dM(n,e),fM(n),pM(n,e),mM(),gM(i,t)}function xu(n,e){fo(n,e),Ks.setSeed(Ci?sd??0:br%256),bt.render(n),br++}function xM(n){if(mt=null,Xn||wo||An)return;u0(),xr.update(n);let e=Mt(xr.getDelta(),0,.05),t=xr.getElapsed();xu(e,t),qS(n),Eo()}var hu=!1,js=null;function vM(){return Zc({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,coarse:du.matches})}function Qr(){hu=!0,Eo()}function ad(){js&&js.removeEventListener("change",Qr),js=matchMedia(`(resolution: ${we.devicePixelRatio}dppx)`),js.addEventListener("change",Qr)}function _M(n){if(n.tier!==we.tier)throw new Error("Ninth Tide same-tier resize received a different quality tier.");let e=n.effectivePixelRatio!==we.effectivePixelRatio,t=n.width!==we.width||n.height!==we.height;e&&(oo.rendererPixelRatio+=1,Fe.setPixelRatio(n.effectivePixelRatio),oo.composerPixelRatio+=1,bt.setPixelRatio(n.effectivePixelRatio),Q.pixelRatio.value=n.effectivePixelRatio),t&&(oo.rendererSize+=1,Fe.setSize(n.width,n.height),oo.composerSize+=1,bt.setSize(n.width,n.height),Xt.aspect=n.width/n.height,Xt.updateProjectionMatrix()),(e||t)&&Q.resolution.value.set(n.width*n.effectivePixelRatio,n.height*n.effectivePixelRatio),we=n,On=Object.freeze({number:On.number,profile:n,owner:On.owner})}function gm(){if(Fe.getPixelRatio()!==we.effectivePixelRatio)throw new Error("Ninth Tide renderer pixel ratio diverged from the quality profile.");let n=Fe.getContext(),e=n.getContextAttributes();if(!e||e.antialias!==we.antialias)throw new Error("Ninth Tide renderer context diverged from the quality profile.");let t=Math.floor(we.width*we.effectivePixelRatio),i=Math.floor(we.height*we.effectivePixelRatio),r=we.width*we.effectivePixelRatio,s=we.height*we.effectivePixelRatio;if(n.drawingBufferWidth!==t||n.drawingBufferHeight!==i||bt.readBuffer.width!==r||bt.readBuffer.height!==s||bt.writeBuffer.width!==r||bt.writeBuffer.height!==s)throw new Error("Ninth Tide renderer/composer dimensions diverged from the quality profile.")}function u0(n=!1){if(!hu&&!n)return!1;if(An||Kr)throw new Error("Ninth Tide quality reconcile cannot overlap deterministic capture.");hu=!1;let e=vM();if(Lp(e,we))return ad(),gm(),!1;if(Ci&&wd(),e.tier===we.tier)_M(e);else{let t=Zm(e);Jm(t)}return Ci&&(nt=p0()),ad(),gm(),!0}function yM(){let n=Fe.getContext();return Object.freeze({generation:On.number,profile:we,pulseSlots:Yt,canvasCount:je("#scene").querySelectorAll("canvas").length,contextAntialias:n.getContextAttributes()?.antialias,rendererPixelRatio:Fe.getPixelRatio(),drawingBuffer:Object.freeze({width:n.drawingBufferWidth,height:n.drawingBufferHeight}),composerReadBuffer:Object.freeze({width:bt.readBuffer.width,height:bt.readBuffer.height}),composerWriteBuffer:Object.freeze({width:bt.writeBuffer.width,height:bt.writeBuffer.height}),counts:Object.freeze({archiveCellCount:fu.length,archivePointCount:ts.geometry.getAttribute("position").count,beamRadialSegments:xo.parameters.radialSegments,sonarShellWidthSegments:En.geometry.parameters.widthSegments,sonarShellHeightSegments:En.geometry.parameters.heightSegments,sonarCurtainRadialSegments:ii.geometry.parameters.radialSegments,sonarSpokeCount:iu,sonarPillarCount:_o,sonarLatticePointCount:mn.geometry.getAttribute("position").count,helixSegments:ru,sonarConvergenceWidthSegments:Mn.geometry.parameters.widthSegments,sonarConvergenceHeightSegments:Mn.geometry.parameters.heightSegments,nullRingTubularSegments:bn.geometry.parameters.tubularSegments,coreDetail:ai.geometry.parameters.detail,coreRingTubularSegments:Object.freeze(yr.map(e=>e.geometry.parameters.tubularSegments)),forecastDustCount:Xi.geometry.getAttribute("position").count,energyBodyCount:Ri.geometry.getAttribute("position").count,mistCount:Sr.geometry.getAttribute("position").count,nearSnowCount:qi.geometry.getAttribute("position").count,abyssalSpineVertices:Mr.geometry.getAttribute("position").count,pressureStrataTubularSegments:Object.freeze(Yi.map(e=>e.geometry.parameters.tubularSegments))}),memory:Object.freeze({...Fe.info.memory}),currentOwnedResources:On.owner.size,lastDisposedGeneration:jm,lastRejectedGeneration:vd,sonarPillarDynamic:Jt.instanceMatrix.usage===dr,sizingOperations:Object.freeze({...oo})})}function SM(n){if(!Number.isInteger(n)||n<1||n>120)throw new RangeError("Ninth Tide static quality frame count must be an integer from 1 through 120.");if(wo||An)throw new Error("Ninth Tide static quality frames cannot overlap deterministic capture.");mt!==null&&cancelAnimationFrame(mt),mt=null,An=!0;let e=Q.time.value,t=br;try{for(let r=0;r<n;r++)xu(0,e)}finally{An=!1,Eo()}let i=br-t;if(i!==n)throw new Error(`Ninth Tide static quality audit rendered ${i} frames; expected ${n}.`);return Object.freeze({rendered:i,elapsed:e})}function MM(){if(An||Kr||tu!==null)throw new Error("Ninth Tide rejected-commit audit cannot overlap another lifecycle operation.");let n={generation:On,renderer:Fe,composer:bt,pulse:id(),randomState:ti.getState()},e=Zc({width:we.tier==="desktop"?819:820,height:we.height,dpr:we.devicePixelRatio,coarse:!1}),t=Zm(e),i=null;tu="before-live-swap";try{Jm(t)}catch(s){i=s}finally{tu=null}if(!(i instanceof Error)||i.message!=="Ninth Tide injected quality commit failure before live swap.")throw new Error("Ninth Tide rejected-commit audit did not observe the injected failure.");let r=id();if(On!==n.generation||Fe!==n.renderer||bt!==n.composer||r.pulseHistory!==n.pulse.pulseHistory||r.pulseVectors!==n.pulse.pulseVectors||r.pulseMetaVectors!==n.pulse.pulseMetaVectors||ti.getState()!==n.randomState)throw new Error("Ninth Tide rejected quality commit changed the live generation.");return Object.freeze({message:i.message,generation:On.number,rejection:vd})}window.addEventListener("resize",Qr);du.addEventListener("change",Qr);ad();window.__NINTH_TIDE_QUALITY__=Object.freeze({inspect:yM,reconcile(){return hu=!0,u0(!0)},staticFrames:SM,auditRejectedCommit:MM});function vu(n,e){if(!["opening","main","ending"].includes(n))throw new TypeError(`Unknown Ninth Tide preview mode: ${String(n)}`);if(!Number.isInteger(e)||e<0||e>8)throw new RangeError(`Ninth Tide preview section must be an integer from 0 through 8; received ${String(e)}.`);Jc(Kt),rs(),g.previewMode=n,g.previewSection=e,g.tideIndex=e,g.transitionFrom=e,g.pendingTide=-1,g.phaseLocal=0,g.phaseTransition=0,g.transitionClock=99,g.transitionSwitched=!1,g.shutdown=0,g.ending=!1,g.ended=!1,g.endingCue=0,g.finishCount=0,g.ceremonyCue=0,g.archiveOpen=0,Q.section.value=e,Q.sectionLocal.value=0,Q.phaseTransition.value=0,Q.shutdown.value=0,bo=-1,g.entered=!0,g.calibrated=n!=="opening",g.ceremonyTime=n==="opening"?5.75:99,g.ritual=n==="opening"?.73:1,g.ignite=n==="opening"?.44:1,g.lightLevel=n==="opening"?.72:1,g.archiveOpenTarget=n==="main"?.76:.45,g.diveTarget=n==="main"?.28:.2,Q.ritual.value=g.ritual,Q.ignite.value=g.ignite,document.body.classList.add("entered"),document.body.classList.toggle("calibrated",g.calibrated),document.body.classList.toggle("ending",n==="ending"),document.body.classList.remove("ended"),ri.set("--blackout",n==="opening"?"0.28":"0");let t=co[e];J.phaseNumber.textContent=t[0],J.phaseName.textContent=t[1],J.phaseSub.textContent=t[2],J.sideTicks.forEach((i,r)=>i.classList.toggle("active",r===e)),is(n==="opening"?"\u5F00\u573A\u6821\u51C6\u4E2D":n==="ending"?"\u7EC8\u5E55\u9000\u6F6E\u4E2D \xB7 \u7B2C IX \u7AE0":`\u7B2C ${t[0]} \u7AE0 \xB7 ${t[1]}`),si({origin:new he(0,0),strength:n==="ending"?.45:1.15,sourceY:.34,announce:!1,mode:e,source:"system"})}var bM=Object.freeze(["opacity","emissiveIntensity","roughness","metalness","linewidth","size","rotation","alphaTest"]),wM=Object.freeze(["color","emissive","specular"]);function EM(n){return n===null||["number","string","boolean"].includes(typeof n)?Object.freeze({kind:"primitive",value:n}):n instanceof Ae?Object.freeze({kind:"color",value:Object.freeze([n.r,n.g,n.b])}):n instanceof he||n instanceof D||n instanceof ut?Object.freeze({kind:"vector",value:Object.freeze(n.toArray())}):n instanceof rn?Object.freeze({kind:"quaternion",value:Object.freeze(n.toArray())}):n instanceof Ln?Object.freeze({kind:"euler",value:Object.freeze([n.x,n.y,n.z,n.order])}):Object.freeze({kind:"reference",value:n})}function TM(n,e,t,i){if(t.kind==="primitive")n[e]=t.value;else if(t.kind==="color")n[e].setRGB(...t.value);else if(t.kind==="vector"||t.kind==="quaternion")n[e].fromArray(t.value);else if(t.kind==="euler")n[e].set(...t.value);else if(n[e]!==t.value)throw new Error(`Ninth Tide deterministic baseline reference changed: ${i}.`)}function od(n){return Object.freeze(Object.fromEntries(Object.entries(n).map(([e,t])=>[e,EM(t)])))}function ld(n,e,t){let i=Object.keys(n).sort(),r=Object.keys(e).sort();if(i.length!==r.length||i.some((s,a)=>s!==r[a]))throw new Error(`Ninth Tide deterministic ${t} shape changed.`);for(let s of r)TM(n,s,e[s],`${t}.${s}`)}function AM(n){let e={},t={};for(let i of bM)typeof n[i]=="number"&&(e[i]=n[i]);for(let i of wM)n[i]instanceof Ae&&(t[i]=Object.freeze(n[i].toArray()));return Object.freeze({material:n,scalars:Object.freeze(e),colors:Object.freeze(t),uniforms:n.uniforms?od(Object.fromEntries(Object.entries(n.uniforms).map(([i,r])=>[i,r.value]))):null})}function CM(n){for(let[e,t]of Object.entries(n.scalars))n.material[e]=t;for(let[e,t]of Object.entries(n.colors))n.material[e].fromArray(t);if(n.uniforms){let e=Object.fromEntries(Object.entries(n.material.uniforms).map(([t,i])=>[t,i.value]));ld(e,n.uniforms,`material ${n.material.uuid} uniforms`);for(let[t,i]of Object.entries(e))n.material.uniforms[t].value=i}}function RM(){let n=[],e=new Map,t=new Map,i=r=>{n.push(Object.freeze({object:r,position:Object.freeze(r.position.toArray()),quaternion:Object.freeze(r.quaternion.toArray()),scale:Object.freeze(r.scale.toArray()),visible:r.visible,intensity:typeof r.intensity=="number"?r.intensity:null,color:r.color instanceof Ae?Object.freeze(r.color.toArray()):null,instanceMatrix:r.isInstancedMesh?new r.instanceMatrix.array.constructor(r.instanceMatrix.array):null,instanceColor:r.isInstancedMesh&&r.instanceColor?new r.instanceColor.array.constructor(r.instanceColor.array):null}));let s=Array.isArray(r.material)?r.material:r.material?[r.material]:[];for(let a of s)e.has(a.uuid)||e.set(a.uuid,AM(a));if(r.geometry&&!t.has(r.geometry.uuid)){let a=Object.fromEntries(Object.entries(r.geometry.attributes).map(([o,l])=>[o,Object.freeze({attribute:l,array:new l.array.constructor(l.array)})]));t.set(r.geometry.uuid,Object.freeze({geometry:r.geometry,attributes:Object.freeze(a)}))}};return xn.traverse(i),i(Xt),Object.freeze({objects:Object.freeze(n),materials:Object.freeze([...e.values()]),geometries:Object.freeze([...t.values()])})}function PM(n){for(let e of n.objects){if(e.object.position.fromArray(e.position),e.object.quaternion.fromArray(e.quaternion),e.object.scale.fromArray(e.scale),e.object.visible=e.visible,e.intensity!==null&&(e.object.intensity=e.intensity),e.color&&e.object.color.fromArray(e.color),e.instanceMatrix&&(e.object.instanceMatrix.array.set(e.instanceMatrix),e.object.instanceMatrix.needsUpdate=!0),e.instanceColor){if(!e.object.instanceColor||e.object.instanceColor.array.length!==e.instanceColor.length)throw new Error(`Ninth Tide deterministic instance color changed: ${e.object.uuid}.`);e.object.instanceColor.array.set(e.instanceColor),e.object.instanceColor.needsUpdate=!0}e.object.updateMatrix()}for(let e of n.materials)CM(e);for(let e of n.geometries)for(let[t,i]of Object.entries(e.attributes)){let r=e.geometry.getAttribute(t);if(r!==i.attribute||r.array.length!==i.array.length)throw new Error(`Ninth Tide deterministic geometry attribute changed: ${e.geometry.uuid}.${t}.`);r.array.set(i.array),r.needsUpdate=!0}xn.updateMatrixWorld(!0),Xt.updateMatrixWorld(!0)}function IM(){let n=[...new Set([...Object.values(J).flatMap(e=>Array.isArray(e)?e:[e]),...J.sideTicks])];return Object.freeze({rootClassName:document.documentElement.className,rootStyle:document.documentElement.getAttribute("style"),bodyClassName:document.body.className,bodyStyle:document.body.getAttribute("style"),elements:Object.freeze(n.map(e=>Object.freeze({element:e,className:e.className,style:e.getAttribute("style"),textContent:e instanceof HTMLAudioElement||e instanceof HTMLInputElement||e.children.length>0?null:e.textContent,hidden:"hidden"in e?e.hidden:null,disabled:"disabled"in e?e.disabled:null})))})}function Kh(n,e,t){t===null?n.removeAttribute(e):n.setAttribute(e,t)}function DM(n){document.documentElement.className=n.rootClassName,Kh(document.documentElement,"style",n.rootStyle),document.body.className=n.bodyClassName,Kh(document.body,"style",n.bodyStyle);for(let e of n.elements)e.element.className=e.className,Kh(e.element,"style",e.style),e.textContent!==null&&(e.element.textContent=e.textContent),e.hidden!==null&&(e.element.hidden=e.hidden),e.disabled!==null&&(e.element.disabled=e.disabled)}function h0(){if(!(Bt._textureComp instanceof vt)||!(Bt._textureOld instanceof vt)||Bt._textureComp===Bt._textureOld)throw new Error("Ninth Tide deterministic capture requires two distinct Afterimage render targets.")}function LM(n){if(!(n instanceof vt))throw new Error("Ninth Tide deterministic capture encountered an invalid render target.");Fe.setRenderTarget(n),Fe.clear(!0,!0,!0)}function NM(n){h0();let e=Fe.getRenderTarget(),t=Fe.getClearColor(new Ae).clone(),i=Fe.getClearAlpha();Fe.setClearColor(0,0),bt.readBuffer=n.composerReadBuffer,bt.writeBuffer=n.composerWriteBuffer;let r=new Set([bt.renderTarget1,bt.renderTarget2,Bt._textureComp,Bt._textureOld,gn.renderTargetBright,...gn.renderTargetsHorizontal,...gn.renderTargetsVertical]);for(let s of r)LM(s);Fe.setClearColor(t,i),Fe.setRenderTarget(e)}function FM(n){return[...n].map(e=>e.toString(16).padStart(2,"0")).join("")}async function bd(n){if(!crypto.subtle||typeof crypto.subtle.digest!="function")throw new Error("Ninth Tide deterministic capture requires crypto.subtle.digest().");return FM(new Uint8Array(await crypto.subtle.digest("SHA-256",n)))}async function d0(n){let e=n.drawingBufferWidth,t=n.drawingBufferHeight;if(!Number.isInteger(e)||e<=0||!Number.isInteger(t)||t<=0)throw new Error("Ninth Tide deterministic capture requires a non-empty drawing buffer.");let i=new Uint8Array(e*t*4);if(n.readPixels(0,0,e,t,n.RGBA,n.UNSIGNED_BYTE,i),n.getError()!==n.NO_ERROR)throw new Error("Ninth Tide framebuffer readPixels failed.");let r=new Uint8Array(14+i.length);r.set(new TextEncoder().encode("rgba8\0"),0);let s=new DataView(r.buffer,0,14);s.setUint32(6,e,!1),s.setUint32(10,t,!1);let a=e*4;for(let o=0;o<t;o++){let l=t-1-o;r.set(i.subarray(l*a,(l+1)*a),14+o*a)}return{width:e,height:t,hash:await bd(r)}}async function UM(n){if(!(n instanceof vt)||n.texture.type!==Tt||!Number.isInteger(n.width)||n.width<=0||!Number.isInteger(n.height)||n.height<=0)throw new Error("Ninth Tide dither QA requires a non-empty half-float render target.");let e=new Uint16Array(n.width*n.height*4);await Fe.readRenderTargetPixelsAsync(n,0,0,n.width,n.height,e);let t=new Uint8Array(14+e.byteLength);t.set(new TextEncoder().encode("f16\0\0\0"),0);let i=new DataView(t.buffer,0,14);i.setUint32(6,n.width,!1),i.setUint32(10,n.height,!1);let r=n.width*4,s=new Uint16Array(e.length);for(let a=0;a<n.height;a++){let o=n.height-1-a;s.set(e.subarray(o*r,(o+1)*r),a*r)}return t.set(new Uint8Array(s.buffer),14),{width:n.width,height:n.height,hash:await bd(t)}}function f0(n){let e=n.getExtension("WEBGL_debug_renderer_info");if(!e)throw new Error("Ninth Tide deterministic capture requires WEBGL_debug_renderer_info.");let t=n.getParameter(e.UNMASKED_RENDERER_WEBGL),i=n.getContextAttributes();if(typeof t!="string"||t.length===0||!i)throw new Error("Ninth Tide deterministic capture could not audit the WebGL renderer.");return{raw:t,debugInfoAvailable:!0,contextAttributes:{...i}}}function OM(){let n=we.pulse.systemCapacity,e=we.pulse.userCapacity,t=Yt*2;return{tier:we.tier,systemSlots:n,userSlots:e,totalSlots:Yt,addedVectorsPerStage:t,minimumFragmentVectors:224,minimumVertexVectors:256,remainingMinimumFragmentVectors:224-t,remainingMinimumVertexVectors:256-t,actualFragmentVectors:Fe.capabilities.maxFragmentUniforms,actualVertexVectors:Fe.capabilities.maxVertexUniforms}}Ci&&(h0(),ai.geometry.boundingSphere===null&&ai.geometry.computeBoundingSphere());function p0(){return Object.freeze({state:od(g),pulseHistory:Kc(Kt),globals:od(Object.fromEntries(Object.entries(Q).map(([n,e])=>[n,e.value]))),scene:RM(),dom:IM(),pointer:Object.freeze(ni.toArray()),pointerSmooth:Object.freeze(pr.toArray()),spectrum:new Uint8Array(Wn),randomState:ti.getState(),lastTide:bo,frameStats:Object.freeze({...on}),audioContext:At,analyser:jt,frequencyData:Wt,timeData:Zr,rendererTarget:Fe.getRenderTarget(),rendererExposure:Fe.toneMappingExposure,fogDensity:xn.fog.density,bloomStrength:gn.strength,bloomRadius:gn.radius,bloomThreshold:gn.threshold,afterimageDamp:Bt.uniforms.damp.value,composerReadBuffer:bt.readBuffer,composerWriteBuffer:bt.writeBuffer,afterimageTextureComp:Bt._textureComp,afterimageTextureOld:Bt._textureOld,drawingBufferWidth:Fe.getContext().drawingBufferWidth,drawingBufferHeight:Fe.getContext().drawingBufferHeight})}Ci&&(nt=p0());function wd(){if(!nt)throw new Error("Ninth Tide deterministic baseline is unavailable.");if(clearTimeout(ln.timer),ln.timer=void 0,At!==nt.audioContext||jt!==nt.analyser||Wt!==nt.frequencyData||Zr!==nt.timeData)throw new Error("Ninth Tide audio graph changed after deterministic baseline capture.");let n=Fe.getContext();if(n.drawingBufferWidth!==nt.drawingBufferWidth||n.drawingBufferHeight!==nt.drawingBufferHeight)throw new Error("Ninth Tide deterministic capture viewport changed after baseline capture.");J.audio.pause(),ld(g,nt.state,"state"),om(Kt,nt.pulseHistory),rs();let e=Object.fromEntries(Object.entries(Q).map(([t,i])=>[t,i.value]));ld(e,nt.globals,"globals");for(let[t,i]of Object.entries(e))Q[t].value=i;PM(nt.scene),DM(nt.dom),ni.fromArray(nt.pointer),pr.fromArray(nt.pointerSmooth),Wn.set(nt.spectrum),Er.needsUpdate=!0,na(),ti.setState(nt.randomState),bo=nt.lastTide,Object.assign(on,nt.frameStats),on.sampleStartedAt=0,on.sampleFrames=0,xn.fog.density=nt.fogDensity,gn.strength=nt.bloomStrength,gn.radius=nt.bloomRadius,gn.threshold=nt.bloomThreshold,Bt.uniforms.damp.value=nt.afterimageDamp,Bt._textureComp=nt.afterimageTextureComp,Bt._textureOld=nt.afterimageTextureOld,Fe.toneMappingExposure=nt.rendererExposure,Fe.setRenderTarget(nt.rendererTarget),NM(nt)}function BM(n,e,t){return{mode:n,section:e,timestampMs:t,state:{ritual:g.ritual,ignite:g.ignite,lightLevel:g.lightLevel,shutdown:g.shutdown,archiveOpen:g.archiveOpen,low:g.low,mid:g.mid,high:g.high,rms:g.rms,energy:g.energy,transient:g.transient,tideIndex:g.tideIndex,tideFloat:g.tideFloat,phaseLocal:g.phaseLocal,phaseTransition:g.phaseTransition,dive:g.dive,yaw:g.yaw,pitch:g.pitch,activeSeconds:g.activeSeconds,syntheticPhase:g.syntheticPhase},globals:{time:Q.time.value,section:Q.section.value,sectionLocal:Q.sectionLocal.value,tide:Q.tide.value,open:Q.open.value,pulseClock:Q.uPulseClock.value},pulseHistory:Kc(Kt),camera:{position:Xt.position.toArray(),quaternion:Xt.quaternion.toArray()},spectrum:[...Wn]}}async function zM(n,e,t){let i=new TextEncoder().encode(JSON.stringify(BM(n,e,t)));return bd(i)}function m0(n){if(!ns(n,["mode","section","timestampMs"]))throw new Error("Ninth Tide deterministic step requires exactly mode, section, and timestampMs.");if(!["opening","main","ending"].includes(n.mode))throw new TypeError(`Unknown Ninth Tide deterministic mode: ${String(n.mode)}.`);if(!Number.isInteger(n.section)||n.section<0||n.section>8)throw new RangeError(`Ninth Tide deterministic section must be an integer from 0 through 8; received ${String(n.section)}.`);if(typeof n.timestampMs!="number"||!Number.isFinite(n.timestampMs)||n.timestampMs<0)throw new RangeError(`Ninth Tide deterministic timestampMs must be finite and non-negative; received ${String(n.timestampMs)}.`)}async function g0(n){if(An)throw new Error("Ninth Tide deterministic step is already running.");m0(n),An=!0;try{if(mt!==null&&cancelAnimationFrame(mt),mt=null,wd(),vu(n.mode,n.section),n.mode==="main"){let l=.016666666666666666,c=n.timestampMs/1e3;for(let h=0;h<pm;h++)fo(l,c-(pm-h)*l)}let e=br;Fe.info.reset(),Fe.setRenderTarget(null),xu(1/60,n.timestampMs/1e3);let t=br-e;if(t!==1)throw new Error(`Ninth Tide deterministic step rendered ${t} top-level frames.`);if(mt!==null)throw cancelAnimationFrame(mt),mt=null,new Error("Ninth Tide deterministic step queued an animation frame.");let i=Fe.getContext(),r=f0(i);i.finish();let s=await d0(i),a=await zM(n.mode,n.section,n.timestampMs);Fe.setRenderTarget(nt.rendererTarget);let o=n.mode==="opening"?co[0][0]:n.mode==="ending"?co[8][0]:co[n.section][0];return{mode:n.mode,section:n.section,timestampMs:n.timestampMs,frameRenders:t,queuedAnimationFrames:mt===null?0:1,stateDigest:a,framebuffer:s,renderer:r,chapter:{mode:n.mode,section:n.section,phase:o},chapterNumber:n.section+1}}finally{mt!==null&&cancelAnimationFrame(mt),mt=null,Fe.setRenderTarget(nt.rendererTarget),An=!1}}async function HM(n){if(Kr)throw new Error("Ninth Tide dither scenario is already running.");return g0(n)}function kM(n){if(!ns(n,["mode","section","timestampMs","seed"]))throw new Error("Ninth Tide dither scenario requires exactly mode, section, timestampMs, and seed.");if(m0({mode:n.mode,section:n.section,timestampMs:n.timestampMs}),!Number.isInteger(n.seed)||n.seed<0||n.seed>255)throw new RangeError(`Ninth Tide dither seed must be an integer from 0 through 255; received ${String(n.seed)}.`)}async function VM(n){if(kM(n),Kr||An)throw new Error("Ninth Tide dither scenario is already running.");Kr=!0,sd=n.seed;try{let e=await g0({mode:n.mode,section:n.section,timestampMs:n.timestampMs}),t=await UM(Bt._textureOld),i=new Map([[au,"RenderPass"],[gn,"UnrealBloomPass"],[Bt,"AfterimagePass"],[ou,"VeilShaderPass"],[Ks,"DitheredOutputPass"]]),r=bt.passes.map(s=>{let a=i.get(s);if(!a)throw new Error("Ninth Tide composer contains an unaudited pass.");return a});return{...e,seed:n.seed,afterimageFeedback:t,passChain:r,outputOwners:bt.passes.filter(s=>s.isDitheredOutputPass===!0).length,intermediatePrecision:{composerHalfFloat:bt.readBuffer.texture.type===Tt&&bt.writeBuffer.texture.type===Tt,afterimageHalfFloat:Bt._textureOld.texture.type===Tt&&Bt._textureComp.texture.type===Tt}}}finally{sd=null,Ks.setSeed(0),Fe.setRenderTarget(nt.rendererTarget),Kr=!1}}function GM(n){if(!ns(n,["scenario","section","timestampMs"]))throw new Error("Ninth Tide pulse scenario requires exactly scenario, section, and timestampMs.");if(!["zero-pulse","user-then-auto","user-epsilon-then-auto","ending-convergence","ending-convergence-empty"].includes(n.scenario))throw new TypeError(`Unknown Ninth Tide pulse scenario: ${String(n.scenario)}.`);if(!Number.isInteger(n.section)||n.section<0||n.section>8)throw new RangeError(`Ninth Tide pulse scenario section must be an integer from 0 through 8; received ${String(n.section)}.`);if(typeof n.timestampMs!="number"||!Number.isFinite(n.timestampMs)||n.timestampMs<0||n.timestampMs>6e3)throw new RangeError(`Ninth Tide pulse scenario timestampMs must be finite from 0 through 6000; received ${String(n.timestampMs)}.`)}async function WM(n){if(An||Kr)throw new Error("Ninth Tide deterministic step is already running.");GM(n),An=!0;try{mt!==null&&cancelAnimationFrame(mt),mt=null,wd();let e=n.scenario.startsWith("ending-convergence");vu(e?"ending":"main",e?8:n.section),(!e||n.scenario==="ending-convergence-empty")&&(Jc(Kt),rs()),n.scenario==="ending-convergence-empty"&&(g.endingCue=2),(n.scenario==="user-then-auto"||n.scenario==="user-epsilon-then-auto")&&si({origin:new he(3.25,-1.6),strength:n.scenario==="user-then-auto"?1.05:1e-6,sourceY:-2.28,announce:!1,mode:n.section,source:"user"});let t=1/60,i=n.timestampMs/1e3,r=0,s=!1;for(;r+1e-9<i;){let u=Math.min(t,i-r);if((n.scenario==="user-then-auto"||n.scenario==="user-epsilon-then-auto")&&!s&&r<1&&r+u>=1){let f=1-r;f>0&&fo(f,1),r=1,si({origin:new he(0,0),strength:.72,sourceY:.32,announce:!1,mode:n.section,source:"auto"}),s=!0;let x=u-f;x>0&&(r+=x,fo(x,r))}else r+=u,fo(u,r)}if((n.scenario==="user-then-auto"||n.scenario==="user-epsilon-then-auto")&&!s&&i>=1)throw new Error("Ninth Tide pulse scenario failed to insert the scheduled auto pulse.");let a=br;Fe.info.reset(),Fe.setRenderTarget(null),xu(0,i);let o=br-a;if(o!==1||mt!==null)throw new Error("Ninth Tide pulse scenario must render exactly one top-level frame without scheduling RAF.");let l=Fe.getContext(),c=f0(l);l.finish();let h=await d0(l),d=Ys(Kt).map(u=>({...u}));return{scenario:n.scenario,section:e?8:n.section,timestampMs:n.timestampMs,frameRenders:o,queuedAnimationFrames:0,framebuffer:h,renderer:c,uniformBudget:OM(),livePulses:d,artifacts:{shell:En.visible,curtain:ii.visible,spokes:vr.visible,pillars:Jt.visible,lattice:mn.visible,helix:_r.visible,slabs:wi.visible,convergence:Mn.visible,null:bn.visible}}}finally{mt!==null&&cancelAnimationFrame(mt),mt=null,Fe.setRenderTarget(nt.rendererTarget),An=!1}}function XM(n){if(!ns(n,["clientX","clientY"])||typeof n.clientX!="number"||!Number.isFinite(n.clientX)||typeof n.clientY!="number"||!Number.isFinite(n.clientY))throw new Error("Ninth Tide hit test requires finite clientX and clientY values.");let e=Fe.domElement.getBoundingClientRect();if(!(e.width>0)||!(e.height>0))throw new Error("Ninth Tide hit test requires a visible renderer canvas.");let t=new he((n.clientX-e.left)/e.width*2-1,-((n.clientY-e.top)/e.height)*2+1),i=new Us;return i.setFromCamera(t,Xt),i.intersectObject(ai,!1).length>0}if(Ci){wo=!0;let n=xm??lo.get("preview"),e,t=window.__NINTH_TIDE_PREVIEW_SECTION__;if(t!==void 0){if(!Number.isInteger(t)||t<0||t>8)throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(t)}.`);e=t}else if(lo.has("section")){let i=lo.get("section");if(!/^[0-8]$/.test(i))throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(i)}.`);e=Number(i)}else e=n==="ending"?8:n==="opening"?0:_m;vu(n,e),window.__NINTH_TIDE_STEP__=HM,window.__NINTH_TIDE_HIT_TEST__=XM,window.__NINTH_TIDE_PULSE_SCENARIO__=WM,window.__NINTH_TIDE_DITHER_SCENARIO__=VM}function qM(){let n=l0();return Object.freeze({source:g.clockSource,round:g.round,chapter:g.tideIndex+1,visualScoreTime:c0(xr.getElapsed(),n),shutdown:g.shutdown,ending:g.ending,finished:g.ended,epilogueVisible:document.body.classList.contains("ended"),endingCue:g.endingCue,finishCount:g.finishCount,clockPending:g.clockSource==="audio"&&n===null,events:Object.freeze(cd.map(e=>Object.freeze({...e})))})}if(vm){if(Ci)throw new Error("Ninth Tide cycle audit cannot overlap deterministic preview.");window.__NINTH_TIDE_CYCLE_AUDIT__=Object.freeze({snapshot:qM})}jS();Md();Ci||Eo();window.addEventListener("beforeunload",()=>{document.removeEventListener("visibilitychange",i0),window.removeEventListener("message",r0),window.removeEventListener("resize",Qr),du.removeEventListener("change",Qr),js&&js.removeEventListener("change",Qr),mt!==null&&cancelAnimationFrame(mt),Jr!==null&&clearTimeout(Jr),Ti&&URL.revokeObjectURL(Ti),xr.dispose(),On.owner.dispose(),gu({composer:bt,renderPass:au,bloom:gn,afterimage:Bt,veilPass:ou,ditheredOutputPass:Ks}),Fe.forceContextLoss(),Fe.dispose()});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
