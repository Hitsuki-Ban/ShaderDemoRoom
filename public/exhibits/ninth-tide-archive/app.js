(()=>{var gl="184";var wd=0,_u=1,Ed=2;var pa=1,Td=2,fs=3,Ti=0,Yt=1,pn=2,mn=0,ur=1,st=2,yu=3,Mu=4,Ad=5;var ki=100,Cd=101,Rd=102,Pd=103,Id=104,Dd=200,Ld=201,Nd=202,Fd=203,Io=204,Do=205,Ud=206,Od=207,Bd=208,zd=209,Hd=210,Vd=211,kd=212,Gd=213,Wd=214,Lo=0,No=1,Fo=2,hr=3,Uo=4,Oo=5,Bo=6,zo=7,Su=0,Xd=1,qd=2,Wn=0,ma=1,ga=2,xa=3,yr=4,va=5,_a=6,ya=7;var bu=300,qi=301,Mr=302,xl=303,vl=304,Ma=306,Ho=1e3,wn=1001,Vo=1002,Nt=1003,Yd=1004;var Sa=1005;var Ut=1006,_l=1007;var Yi=1008;var en=1009,wu=1010,Eu=1011,ps=1012,yl=1013,Xn=1014,In=1015,wt=1016,Ml=1017,Sl=1018,ms=1020,Tu=35902,Au=35899,Cu=1021,Ru=1022,Dn=1023,ti=1026,Zi=1027,gs=1028,bl=1029,$i=1030,wl=1031;var El=1033,ba=33776,wa=33777,Ea=33778,Ta=33779,Tl=35840,Al=35841,Cl=35842,Rl=35843,Pl=36196,Il=37492,Dl=37496,Ll=37488,Nl=37489,Aa=37490,Fl=37491,Ul=37808,Ol=37809,Bl=37810,zl=37811,Hl=37812,Vl=37813,kl=37814,Gl=37815,Wl=37816,Xl=37817,ql=37818,Yl=37819,Zl=37820,$l=37821,Jl=36492,Kl=36494,jl=36495,Ql=36283,ec=36284,Ca=36285,tc=36286;var Xs=2300,ko=2301,Po=2302,lu=2303,cu=2400,uu=2401,hu=2402;var Zd=3200;var nc=0,$d=1,Ci="",Qt="srgb",qs="srgb-linear",Ys="linear",je="srgb";var cr=7680;var du=519,Jd=512,Kd=513,jd=514,ic=515,Qd=516,ef=517,rc=518,tf=519,Go=35044,xs=35048;var Pu="300 es",Hn=2e3,ts=2001;function sm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function am(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function nf(){let n=Zs("canvas");return n.style.display="block",n}var Xh={},ns=null;function $s(...n){let e="THREE."+n.shift();ns?ns("log",e,...n):console.log(e,...n)}function rf(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Re(...n){n=rf(n);let e="THREE."+n.shift();if(ns)ns("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ie(...n){n=rf(n);let e="THREE."+n.shift();if(ns)ns("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Wo(...n){let e=n.join(" ");e in Xh||(Xh[e]=!0,Re(...n))}function sf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var af={[Lo]:No,[Fo]:Bo,[Uo]:zo,[hr]:Oo,[No]:Lo,[Bo]:Fo,[zo]:Uo,[Oo]:hr},ni=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qh=1234567,Qr=Math.PI/180,is=180/Math.PI;function wi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function Iu(n,e){return(n%e+e)%e}function om(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function lm(n,e,t){return n!==e?(t-n)/(e-n):0}function Ws(n,e,t){return(1-t)*n+t*e}function cm(n,e,t,i){return Ws(n,e,1-Math.exp(-t*i))}function um(n,e=1){return e-Math.abs(Iu(n,e*2)-e)}function hm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function dm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function fm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function pm(n,e){return n+Math.random()*(e-n)}function mm(n){return n*(.5-Math.random())}function gm(n){n!==void 0&&(qh=n);let e=qh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xm(n){return n*Qr}function vm(n){return n*is}function _m(n){return(n&n-1)===0&&n!==0}function ym(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Mm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Sm(n,e,t,i,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),h=a((e+i)/2),d=s((e-i)/2),u=a((e-i)/2),f=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*h,o*c);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var sc={DEG2RAD:Qr,RAD2DEG:is,generateUUID:wi,clamp:Ke,euclideanModulo:Iu,mapLinear:om,inverseLerp:lm,lerp:Ws,damp:cm,pingpong:um,smoothstep:hm,smootherstep:dm,randInt:fm,randFloat:pm,randFloatSpread:mm,seededRandom:gm,degToRad:xm,radToDeg:vm,isPowerOfTwo:_m,ceilPowerOfTwo:ym,floorPowerOfTwo:Mm,setQuaternionFromProperEuler:Sm,normalize:lt,denormalize:zn},Uu=class Uu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Uu.prototype.isVector2=!0;var he=Uu,Pn=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3],u=s[a+0],f=s[a+1],g=s[a+2],v=s[a+3];if(d!==v||l!==u||c!==f||h!==g){let p=l*u+c*f+h*g+d*v;p<0&&(u=-u,f=-f,g=-g,v=-v,p=-p);let m=1-o;if(p<.9995){let M=Math.acos(p),w=Math.sin(M);m=Math.sin(m*M)/w,o=Math.sin(o*M)/w,l=l*m+u*o,c=c*m+f*o,h=h*m+g*o,d=d*m+v*o}else{l=l*m+u*o,c=c*m+f*o,h=h*m+g*o,d=d*m+v*o;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[a],u=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),d=o(s/2),u=l(i/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ou=class Ou{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Oc.copy(this).projectOnVector(e),this.sub(Oc)}reflect(e){return this.sub(Oc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ou.prototype.isVector3=!0;var I=Ou,Oc=new I,Yh=new Pn,Bu=class Bu{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],v=r[0],p=r[3],m=r[6],M=r[1],w=r[4],b=r[7],C=r[2],E=r[5],P=r[8];return s[0]=a*v+o*M+l*C,s[3]=a*p+o*w+l*E,s[6]=a*m+o*b+l*P,s[1]=c*v+h*M+d*C,s[4]=c*p+h*w+d*E,s[7]=c*m+h*b+d*P,s[2]=u*v+f*M+g*C,s[5]=u*p+f*w+g*E,s[8]=u*m+f*b+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,g=t*d+i*u+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=d*v,e[1]=(r*c-h*i)*v,e[2]=(o*i-r*a)*v,e[3]=u*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Bc.makeScale(e,t)),this}rotate(e){return this.premultiply(Bc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Bc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Bu.prototype.isMatrix3=!0;var Oe=Bu,Bc=new Oe,Zh=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$h=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bm(){let n={enabled:!0,workingColorSpace:qs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===je&&(r.r=Ei(r.r),r.g=Ei(r.g),r.b=Ei(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===je&&(r.r=es(r.r),r.g=es(r.g),r.b=es(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ci?Ys:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Wo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Wo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[qs]:{primaries:e,whitePoint:i,transfer:Ys,toXYZ:Zh,fromXYZ:$h,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:i,transfer:je,toXYZ:Zh,fromXYZ:$h,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),n}var Xe=bm();function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function es(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ur,Xo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ur===void 0&&(Ur=Zs("canvas")),Ur.width=e.width,Ur.height=e.height;let r=Ur.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ur}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Zs("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ei(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ei(t[i]/255)*255):t[i]=Ei(t[i]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},wm=0,rs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(zc(r[a].image)):s.push(zc(r[a]))}else s=zc(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function zc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}var Em=0,Hc=new I,on=class n extends ni{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=wn,r=wn,s=Ut,a=Yi,o=Dn,l=en,c=n.DEFAULT_ANISOTROPY,h=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=wi(),this.name="",this.source=new rs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Hc).x}get height(){return this.source.getSize(Hc).y}get depth(){return this.source.getSize(Hc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ho:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case Vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ho:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case Vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=bu;on.DEFAULT_ANISOTROPY=1;var zu=class zu{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,b=(f+1)/2,C=(m+1)/2,E=(h+u)/4,P=(d+v)/4,y=(g+p)/4;return w>b&&w>C?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=E/i,s=P/i):b>C?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=E/r,s=y/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=P/s,r=y/s),this.set(i,r,s,t),this}let M=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-v)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};zu.prototype.isVector4=!0;var gt=zu,qo=class extends ni{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new on(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new rs(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},xt=class extends qo{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Js=class extends on{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yo=class extends on{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ml=class ml{constructor(e,t,i,r,s,a,o,l,c,h,d,u,f,g,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,h,d,u,f,g,v,p)}set(e,t,i,r,s,a,o,l,c,h,d,u,f,g,v,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ml().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Or.setFromMatrixColumn(e,0).length(),s=1/Or.setFromMatrixColumn(e,1).length(),a=1/Or.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){let u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tm,e,Am)}lookAt(e,t,i){let r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Ui.crossVectors(i,Sn),Ui.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Ui.crossVectors(i,Sn)),Ui.normalize(),ja.crossVectors(Sn,Ui),r[0]=Ui.x,r[4]=ja.x,r[8]=Sn.x,r[1]=Ui.y,r[5]=ja.y,r[9]=Sn.y,r[2]=Ui.z,r[6]=ja.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],v=i[6],p=i[10],m=i[14],M=i[3],w=i[7],b=i[11],C=i[15],E=r[0],P=r[4],y=r[8],A=r[12],D=r[1],R=r[5],U=r[9],W=r[13],X=r[2],O=r[6],V=r[10],G=r[14],ee=r[3],ne=r[7],fe=r[11],Se=r[15];return s[0]=a*E+o*D+l*X+c*ee,s[4]=a*P+o*R+l*O+c*ne,s[8]=a*y+o*U+l*V+c*fe,s[12]=a*A+o*W+l*G+c*Se,s[1]=h*E+d*D+u*X+f*ee,s[5]=h*P+d*R+u*O+f*ne,s[9]=h*y+d*U+u*V+f*fe,s[13]=h*A+d*W+u*G+f*Se,s[2]=g*E+v*D+p*X+m*ee,s[6]=g*P+v*R+p*O+m*ne,s[10]=g*y+v*U+p*V+m*fe,s[14]=g*A+v*W+p*G+m*Se,s[3]=M*E+w*D+b*X+C*ee,s[7]=M*P+w*R+b*O+C*ne,s[11]=M*y+w*U+b*V+C*fe,s[15]=M*A+w*W+b*G+C*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],p=e[11],m=e[15],M=l*f-c*u,w=o*f-c*d,b=o*u-l*d,C=a*f-c*h,E=a*u-l*h,P=a*d-o*h;return t*(v*M-p*w+m*b)-i*(g*M-p*C+m*E)+r*(g*w-v*C+m*P)-s*(g*b-v*E+p*P)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],p=e[14],m=e[15],M=t*o-i*a,w=t*l-r*a,b=t*c-s*a,C=i*l-r*o,E=i*c-s*o,P=r*c-s*l,y=h*v-d*g,A=h*p-u*g,D=h*m-f*g,R=d*p-u*v,U=d*m-f*v,W=u*m-f*p,X=M*W-w*U+b*R+C*D-E*A+P*y;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/X;return e[0]=(o*W-l*U+c*R)*O,e[1]=(r*U-i*W-s*R)*O,e[2]=(v*P-p*E+m*C)*O,e[3]=(u*E-d*P-f*C)*O,e[4]=(l*D-a*W-c*A)*O,e[5]=(t*W-r*D+s*A)*O,e[6]=(p*b-g*P-m*w)*O,e[7]=(h*P-u*b+f*w)*O,e[8]=(a*U-o*D+c*y)*O,e[9]=(i*D-t*U-s*y)*O,e[10]=(g*E-v*b+m*M)*O,e[11]=(d*b-h*E-f*M)*O,e[12]=(o*A-a*R-l*y)*O,e[13]=(t*R-i*A+r*y)*O,e[14]=(v*w-g*C-p*M)*O,e[15]=(h*C-d*w+u*M)*O,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,g=s*d,v=a*h,p=a*d,m=o*d,M=l*c,w=l*h,b=l*d,C=i.x,E=i.y,P=i.z;return r[0]=(1-(v+m))*C,r[1]=(f+b)*C,r[2]=(g-w)*C,r[3]=0,r[4]=(f-b)*E,r[5]=(1-(u+m))*E,r[6]=(p+M)*E,r[7]=0,r[8]=(g+w)*P,r[9]=(p-M)*P,r[10]=(1-(u+v))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Or.set(r[0],r[1],r[2]).length(),o=Or.set(r[4],r[5],r[6]).length(),l=Or.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Un.copy(this);let c=1/a,h=1/o,d=1/l;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=h,Un.elements[5]*=h,Un.elements[6]*=h,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,t.setFromRotationMatrix(Un),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=Hn,l=!1){let c=this.elements,h=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),f=(i+r)/(i-r),g,v;if(l)g=s/(a-s),v=a*s/(a-s);else if(o===Hn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ts)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Hn,l=!1){let c=this.elements,h=2/(t-e),d=2/(i-r),u=-(t+e)/(t-e),f=-(i+r)/(i-r),g,v;if(l)g=1/(a-s),v=a/(a-s);else if(o===Hn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===ts)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};ml.prototype.isMatrix4=!0;var ct=ml,Or=new I,Un=new ct,Tm=new I(0,0,0),Am=new I(1,1,1),Ui=new I,ja=new I,Sn=new I,Jh=new ct,Kh=new Pn,Vn=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kh.setFromEuler(this),this.setFromQuaternion(Kh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vn.DEFAULT_ORDER="XYZ";var ss=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Cm=0,jh=new I,Br=new Pn,_i=new ct,Qa=new I,Ns=new I,Rm=new I,Pm=new Pn,Qh=new I(1,0,0),ed=new I(0,1,0),td=new I(0,0,1),nd={type:"added"},Im={type:"removed"},zr={type:"childadded",child:null},Vc={type:"childremoved",child:null},zt=class n extends ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new I,t=new Vn,i=new Pn,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ct},normalMatrix:{value:new Oe}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Br.setFromAxisAngle(e,t),this.quaternion.multiply(Br),this}rotateOnWorldAxis(e,t){return Br.setFromAxisAngle(e,t),this.quaternion.premultiply(Br),this}rotateX(e){return this.rotateOnAxis(Qh,e)}rotateY(e){return this.rotateOnAxis(ed,e)}rotateZ(e){return this.rotateOnAxis(td,e)}translateOnAxis(e,t){return jh.copy(e).applyQuaternion(this.quaternion),this.position.add(jh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qh,e)}translateY(e){return this.translateOnAxis(ed,e)}translateZ(e){return this.translateOnAxis(td,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Qa.copy(e):Qa.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Ns,Qa,this.up):_i.lookAt(Qa,Ns,this.up),this.quaternion.setFromRotationMatrix(_i),r&&(_i.extractRotation(r.matrixWorld),Br.setFromRotationMatrix(_i),this.quaternion.premultiply(Br.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ie("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nd),zr.child=e,this.dispatchEvent(zr),zr.child=null):Ie("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Im),Vc.child=e,this.dispatchEvent(Vc),Vc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nd),zr.child=e,this.dispatchEvent(zr),zr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,Rm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,Pm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};zt.DEFAULT_UP=new I(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fn=class extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Dm={type:"move"},as=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,i),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dm)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new fn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oi={h:0,s:0,l:0},eo={h:0,s:0,l:0};function kc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ee=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Xe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Xe.workingColorSpace){if(e=Iu(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=kc(a,s,e+1/3),this.g=kc(a,s,e),this.b=kc(a,s,e-1/3)}return Xe.colorSpaceToWorking(this,r),this}setStyle(e,t=Qt){function i(s){s!==void 0&&parseFloat(s)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){let i=of[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=es(e.r),this.g=es(e.g),this.b=es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return Xe.workingToColorSpace(jt.copy(this),e),Math.round(Ke(jt.r*255,0,255))*65536+Math.round(Ke(jt.g*255,0,255))*256+Math.round(Ke(jt.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(jt.copy(this),t);let i=jt.r,r=jt.g,s=jt.b,a=Math.max(i,r,s),o=Math.min(i,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=Qt){Xe.workingToColorSpace(jt.copy(this),e);let t=jt.r,i=jt.g,r=jt.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Oi),this.setHSL(Oi.h+e,Oi.s+t,Oi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Oi),e.getHSL(eo);let i=Ws(Oi.h,eo.h,t),r=Ws(Oi.s,eo.s,t),s=Ws(Oi.l,eo.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jt=new Ee;Ee.NAMES=of;var Ks=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ee(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var js=class extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},On=new I,yi=new I,Gc=new I,Mi=new I,Hr=new I,Vr=new I,id=new I,Wc=new I,Xc=new I,qc=new I,Yc=new gt,Zc=new gt,$c=new gt,ei=class n{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),On.subVectors(e,t),r.cross(On);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){On.subVectors(r,t),yi.subVectors(i,t),Gc.subVectors(e,t);let a=On.dot(On),o=On.dot(yi),l=On.dot(Gc),c=yi.dot(yi),h=yi.dot(Gc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mi.x),l.addScaledVector(a,Mi.y),l.addScaledVector(o,Mi.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Yc.setScalar(0),Zc.setScalar(0),$c.setScalar(0),Yc.fromBufferAttribute(e,t),Zc.fromBufferAttribute(e,i),$c.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Yc,s.x),a.addScaledVector(Zc,s.y),a.addScaledVector($c,s.z),a}static isFrontFacing(e,t,i,r){return On.subVectors(i,t),yi.subVectors(e,t),On.cross(yi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),On.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;Hr.subVectors(r,i),Vr.subVectors(s,i),Wc.subVectors(e,i);let l=Hr.dot(Wc),c=Vr.dot(Wc);if(l<=0&&c<=0)return t.copy(i);Xc.subVectors(e,r);let h=Hr.dot(Xc),d=Vr.dot(Xc);if(h>=0&&d<=h)return t.copy(r);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(Hr,a);qc.subVectors(e,s);let f=Hr.dot(qc),g=Vr.dot(qc);if(g>=0&&f<=g)return t.copy(s);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Vr,o);let p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return id.subVectors(s,r),o=(d-h)/(d-h+(f-g)),t.copy(r).addScaledVector(id,o);let m=1/(p+v+u);return a=v*m,o=u*m,t.copy(i).addScaledVector(Hr,a).addScaledVector(Vr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ii=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Bn):Bn.fromBufferAttribute(s,a),Bn.applyMatrix4(e.matrixWorld),this.expandByPoint(Bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),to.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),to.copy(i.boundingBox)),to.applyMatrix4(e.matrixWorld),this.union(to)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bn),Bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),no.subVectors(this.max,Fs),kr.subVectors(e.a,Fs),Gr.subVectors(e.b,Fs),Wr.subVectors(e.c,Fs),Bi.subVectors(Gr,kr),zi.subVectors(Wr,Gr),sr.subVectors(kr,Wr);let t=[0,-Bi.z,Bi.y,0,-zi.z,zi.y,0,-sr.z,sr.y,Bi.z,0,-Bi.x,zi.z,0,-zi.x,sr.z,0,-sr.x,-Bi.y,Bi.x,0,-zi.y,zi.x,0,-sr.y,sr.x,0];return!Jc(t,kr,Gr,Wr,no)||(t=[1,0,0,0,1,0,0,0,1],!Jc(t,kr,Gr,Wr,no))?!1:(io.crossVectors(Bi,zi),t=[io.x,io.y,io.z],Jc(t,kr,Gr,Wr,no))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Si=[new I,new I,new I,new I,new I,new I,new I,new I],Bn=new I,to=new ii,kr=new I,Gr=new I,Wr=new I,Bi=new I,zi=new I,sr=new I,Fs=new I,no=new I,io=new I,ar=new I;function Jc(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ar.fromArray(n,s);let o=r.x*Math.abs(ar.x)+r.y*Math.abs(ar.y)+r.z*Math.abs(ar.z),l=e.dot(ar),c=t.dot(ar),h=i.dot(ar);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ft=new I,ro=new he,Lm=0,De=class extends ni{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Go,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ro.fromBufferAttribute(this,t),ro.applyMatrix3(e),this.setXY(t,ro.x,ro.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Go&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Qs=class extends De{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ea=class extends De{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var qe=class extends De{constructor(e,t,i){super(new Float32Array(e),t,i)}},Nm=new ii,Us=new I,Kc=new I,ri=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Nm.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);let t=Us.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Us,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add(Kc)),this.expandByPoint(Us.copy(e.center).sub(Kc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Fm=0,Rn=new ct,jc=new zt,Xr=new I,bn=new ii,Os=new ii,Gt=new I,Qe=class n extends ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sm(e)?ea:Qs)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Oe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,i){return Rn.makeTranslation(e,t,i),this.applyMatrix4(Rn),this}scale(e,t,i){return Rn.makeScale(e,t,i),this.applyMatrix4(Rn),this}lookAt(e){return jc.lookAt(e),jc.updateMatrix(),this.applyMatrix4(jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xr).negate(),this.translate(Xr.x,Xr.y,Xr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qe(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];bn.setFromBufferAttribute(s),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ie('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ri);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let i=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Os.setFromBufferAttribute(o),this.morphTargetsRelative?(Gt.addVectors(bn.min,Os.min),bn.expandByPoint(Gt),Gt.addVectors(bn.max,Os.max),bn.expandByPoint(Gt)):(bn.expandByPoint(Os.min),bn.expandByPoint(Os.max))}bn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Gt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Gt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Gt.fromBufferAttribute(o,c),l&&(Xr.fromBufferAttribute(e,c),Gt.add(Xr)),r=Math.max(r,i.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ie('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ie("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new De(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new I,l[y]=new I;let c=new I,h=new I,d=new I,u=new he,f=new he,g=new he,v=new I,p=new I;function m(y,A,D){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,A),d.fromBufferAttribute(i,D),u.fromBufferAttribute(s,y),f.fromBufferAttribute(s,A),g.fromBufferAttribute(s,D),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),o[y].add(v),o[A].add(v),o[D].add(v),l[y].add(p),l[A].add(p),l[D].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,A=M.length;y<A;++y){let D=M[y],R=D.start,U=D.count;for(let W=R,X=R+U;W<X;W+=3)m(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let w=new I,b=new I,C=new I,E=new I;function P(y){C.fromBufferAttribute(r,y),E.copy(C);let A=o[y];w.copy(A),w.sub(C.multiplyScalar(C.dot(A))).normalize(),b.crossVectors(E,A);let R=b.dot(l[y])<0?-1:1;a.setXYZW(y,w.x,w.y,w.z,R)}for(let y=0,A=M.length;y<A;++y){let D=M[y],R=D.start,U=D.count;for(let W=R,X=R+U;W<X;W+=3)P(e.getX(W+0)),P(e.getX(W+1)),P(e.getX(W+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new De(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)u[g++]=c[f++]}return new De(u,h,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,i);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Go,this.updateRanges=[],this.version=0,this.uuid=wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},an=new I,ta=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=zn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){$s("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new De(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){$s("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Um=0,kn=class extends ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=ur,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Do,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=du,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cr,this.stencilZFail=cr,this.stencilZPass=cr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==Ti&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Io&&(i.blendSrc=this.blendSrc),this.blendDst!==Do&&(i.blendDst=this.blendDst),this.blendEquation!==ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==hr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==du&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==cr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==cr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},dr=class extends kn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qr,Bs=new I,Yr=new I,Zr=new I,$r=new he,zs=new he,lf=new ct,so=new I,Hs=new I,ao=new I,rd=new he,Qc=new he,sd=new he,os=class extends zt{constructor(e=new dr){if(super(),this.isSprite=!0,this.type="Sprite",qr===void 0){qr=new Qe;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Zo(t,5);qr.setIndex([0,1,2,0,2,3]),qr.setAttribute("position",new ta(i,3,0,!1)),qr.setAttribute("uv",new ta(i,2,3,!1))}this.geometry=qr,this.material=e,this.center=new he(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ie('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Yr.setFromMatrixScale(this.matrixWorld),lf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yr.multiplyScalar(-Zr.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let a=this.center;oo(so.set(-.5,-.5,0),Zr,a,Yr,r,s),oo(Hs.set(.5,-.5,0),Zr,a,Yr,r,s),oo(ao.set(.5,.5,0),Zr,a,Yr,r,s),rd.set(0,0),Qc.set(1,0),sd.set(1,1);let o=e.ray.intersectTriangle(so,Hs,ao,!1,Bs);if(o===null&&(oo(Hs.set(-.5,.5,0),Zr,a,Yr,r,s),Qc.set(0,1),o=e.ray.intersectTriangle(so,ao,Hs,!1,Bs),o===null))return;let l=e.ray.origin.distanceTo(Bs);l<e.near||l>e.far||t.push({distance:l,point:Bs.clone(),uv:ei.getInterpolation(Bs,so,Hs,ao,rd,Qc,sd,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function oo(n,e,t,i,r,s){$r.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(zs.x=s*$r.x-r*$r.y,zs.y=r*$r.x+s*$r.y):zs.copy($r),n.copy(e),n.x+=zs.x,n.y+=zs.y,n.applyMatrix4(lf)}var bi=new I,eu=new I,lo=new I,Hi=new I,tu=new I,co=new I,nu=new I,fr=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){eu.copy(e).add(t).multiplyScalar(.5),lo.copy(t).sub(e).normalize(),Hi.copy(this.origin).sub(eu);let s=e.distanceTo(t)*.5,a=-this.direction.dot(lo),o=Hi.dot(this.direction),l=-Hi.dot(lo),c=Hi.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=s*h,d>=0)if(u>=-g)if(u<=g){let v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(eu).addScaledVector(lo,u),f}intersectSphere(e,t){bi.subVectors(e.center,this.origin);let i=bi.dot(this.direction),r=bi.dot(bi)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,i,r,s){tu.subVectors(t,e),co.subVectors(i,e),nu.crossVectors(tu,co);let a=this.direction.dot(nu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Hi.subVectors(this.origin,e);let l=o*this.direction.dot(co.crossVectors(Hi,co));if(l<0)return null;let c=o*this.direction.dot(tu.cross(Hi));if(c<0||l+c>a)return null;let h=-o*Hi.dot(nu);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ln=class extends kn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Su,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ad=new ct,or=new fr,uo=new ri,od=new I,ho=new I,fo=new I,po=new I,iu=new I,mo=new I,ld=new I,go=new I,it=class extends zt{constructor(e=new Qe,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){mo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(iu.fromBufferAttribute(d,e),a?mo.addScaledVector(iu,h):mo.addScaledVector(iu.sub(t),h))}t.add(mo)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),uo.copy(i.boundingSphere),uo.applyMatrix4(s),or.copy(e.ray).recast(e.near),!(uo.containsPoint(or.origin)===!1&&(or.intersectSphere(uo,od)===null||or.origin.distanceToSquared(od)>(e.far-e.near)**2))&&(ad.copy(s).invert(),or.copy(e.ray).applyMatrix4(ad),!(i.boundingBox!==null&&or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,or)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let p=u[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let b=M,C=w;b<C;b+=3){let E=o.getX(b),P=o.getX(b+1),y=o.getX(b+2);r=xo(this,m,e,i,c,h,d,E,P,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let M=o.getX(p),w=o.getX(p+1),b=o.getX(p+2);r=xo(this,a,e,i,c,h,d,M,w,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let p=u[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let b=M,C=w;b<C;b+=3){let E=b,P=b+1,y=b+2;r=xo(this,m,e,i,c,h,d,E,P,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let M=p,w=p+1,b=p+2;r=xo(this,a,e,i,c,h,d,M,w,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function Om(n,e,t,i,r,s,a,o){let l;if(e.side===Yt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Ti,o),l===null)return null;go.copy(o),go.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(go);return c<t.near||c>t.far?null:{distance:c,point:go.clone(),object:n}}function xo(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ho),n.getVertexPosition(l,fo),n.getVertexPosition(c,po);let h=Om(n,e,t,i,ho,fo,po,ld);if(h){let d=new I;ei.getBarycoord(ld,ho,fo,po,d),r&&(h.uv=ei.getInterpolatedAttribute(r,o,l,c,d,new he)),s&&(h.uv1=ei.getInterpolatedAttribute(s,o,l,c,d,new he)),a&&(h.normal=ei.getInterpolatedAttribute(a,o,l,c,d,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new I,materialIndex:0};ei.getNormal(ho,fo,po,u.normal),h.face=u,h.barycoord=d}return h}var pr=class extends on{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Nt,h=Nt,d,u){super(null,a,o,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var na=class extends De{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Jr=new ct,cd=new ct,vo=[],ud=new ii,Bm=new ct,Vs=new it,ks=new ri,ia=class extends it{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new na(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Bm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ii),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Jr),ud.copy(e.boundingBox).applyMatrix4(Jr),this.boundingBox.union(ud)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ri),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Jr),ks.copy(e.boundingSphere).applyMatrix4(Jr),this.boundingSphere.union(ks)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(i),e.ray.intersectsSphere(ks)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Jr),cd.multiplyMatrices(i,Jr),Vs.matrixWorld=cd,Vs.raycast(e,vo);for(let a=0,o=vo.length;a<o;a++){let l=vo[a];l.instanceId=s,l.object=this,t.push(l)}vo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new na(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new pr(new Float32Array(r*this.count),r,this.count,gs,In));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ru=new I,zm=new I,Hm=new Oe,Qn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=ru.subVectors(i,t).cross(zm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(ru),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Hm.getNormalMatrix(e),r=this.coplanarPoint(ru).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},lr=new ri,Vm=new he(.5,.5),_o=new I,ls=class{constructor(e=new Qn,t=new Qn,i=new Qn,r=new Qn,s=new Qn,a=new Qn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Hn,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],g=s[8],v=s[9],p=s[10],m=s[11],M=s[12],w=s[13],b=s[14],C=s[15];if(r[0].setComponents(c-a,f-h,m-g,C-M).normalize(),r[1].setComponents(c+a,f+h,m+g,C+M).normalize(),r[2].setComponents(c+o,f+d,m+v,C+w).normalize(),r[3].setComponents(c-o,f-d,m-v,C-w).normalize(),i)r[4].setComponents(l,u,p,b).normalize(),r[5].setComponents(c-l,f-u,m-p,C-b).normalize();else if(r[4].setComponents(c-l,f-u,m-p,C-b).normalize(),t===Hn)r[5].setComponents(c+l,f+u,m+p,C+b).normalize();else if(t===ts)r[5].setComponents(l,u,p,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),lr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(lr)}intersectsSprite(e){lr.center.set(0,0,0);let t=Vm.distanceTo(e.center);return lr.radius=.7071067811865476+t,lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(lr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(_o.x=r.normal.x>0?e.max.x:e.min.x,_o.y=r.normal.y>0?e.max.y:e.min.y,_o.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_o)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var si=class extends kn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},$o=new I,Jo=new I,hd=new ct,Gs=new fr,yo=new ri,su=new I,dd=new I,Ko=class extends zt{constructor(e=new Qe,t=new si){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)$o.fromBufferAttribute(t,r-1),Jo.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=$o.distanceTo(Jo);e.setAttribute("lineDistance",new qe(i,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yo.copy(i.boundingSphere),yo.applyMatrix4(r),yo.radius+=s,e.ray.intersectsSphere(yo)===!1)return;hd.copy(r).invert(),Gs.copy(e.ray).applyMatrix4(hd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,p=g-1;v<p;v+=c){let m=h.getX(v),M=h.getX(v+1),w=Mo(this,e,Gs,l,m,M,v);w&&t.push(w)}if(this.isLineLoop){let v=h.getX(g-1),p=h.getX(f),m=Mo(this,e,Gs,l,v,p,g-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=f,p=g-1;v<p;v+=c){let m=Mo(this,e,Gs,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){let v=Mo(this,e,Gs,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Mo(n,e,t,i,r,s,a){let o=n.geometry.attributes.position;if($o.fromBufferAttribute(o,r),Jo.fromBufferAttribute(o,s),t.distanceSqToSegment($o,Jo,su,dd)>i)return;su.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(su);if(!(c<e.near||c>e.far))return{distance:c,point:dd.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var fd=new I,pd=new I,Gn=class extends Ko{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)fd.fromBufferAttribute(t,r),pd.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+fd.distanceTo(pd);e.setAttribute("lineDistance",new qe(i,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var jo=class extends kn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},md=new ct,fu=new fr,So=new ri,bo=new I,ai=class extends zt{constructor(e=new Qe,t=new jo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),So.copy(i.boundingSphere),So.applyMatrix4(r),So.radius+=s,e.ray.intersectsSphere(So)===!1)return;md.copy(r).invert(),fu.copy(e.ray).applyMatrix4(md);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,v=f;g<v;g++){let p=c.getX(g);bo.fromBufferAttribute(d,p),gd(bo,p,l,r,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,v=f;g<v;g++)bo.fromBufferAttribute(d,g),gd(bo,g,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function gd(n,e,t,i,r,s,a){let o=fu.distanceSqToPoint(n);if(o<t){let l=new I;fu.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ra=class extends on{constructor(e=[],t=qi,i,r,s,a,o,l,c,h){super(e,t,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},sa=class extends on{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ai=class extends on{constructor(e,t,i=Xn,r,s,a,o=Nt,l=Nt,c,h=ti,d=1){if(h!==ti&&h!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Qo=class extends Ai{constructor(e,t=Xn,i=qi,r,s,a=Nt,o=Nt,l,c=ti){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},aa=class extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},oi=class n extends Qe{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new qe(c,3)),this.setAttribute("normal",new qe(h,3)),this.setAttribute("uv",new qe(d,2));function g(v,p,m,M,w,b,C,E,P,y,A){let D=b/P,R=C/y,U=b/2,W=C/2,X=E/2,O=P+1,V=y+1,G=0,ee=0,ne=new I;for(let fe=0;fe<V;fe++){let Se=fe*R-W;for(let Ae=0;Ae<O;Ae++){let tt=Ae*D-U;ne[v]=tt*M,ne[p]=Se*w,ne[m]=X,c.push(ne.x,ne.y,ne.z),ne[v]=0,ne[p]=0,ne[m]=E>0?1:-1,h.push(ne.x,ne.y,ne.z),d.push(Ae/P),d.push(1-fe/y),G+=1}}for(let fe=0;fe<y;fe++)for(let Se=0;Se<P;Se++){let Ae=u+Se+O*fe,tt=u+Se+O*(fe+1),ut=u+(Se+1)+O*(fe+1),Ve=u+(Se+1)+O*fe;l.push(Ae,tt,Ve),l.push(tt,ut,Ve),ee+=6}o.addGroup(f,ee,A),f+=ee,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var oa=class n extends Qe{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new I,h=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=i+d/t*r;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new qe(a,3)),this.setAttribute("normal",new qe(o,3)),this.setAttribute("uv",new qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},mr=class n extends Qe{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],d=[],u=[],f=[],g=0,v=[],p=i/2,m=0;M(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new qe(d,3)),this.setAttribute("normal",new qe(u,3)),this.setAttribute("uv",new qe(f,2));function M(){let b=new I,C=new I,E=0,P=(t-e)/i;for(let y=0;y<=s;y++){let A=[],D=y/s,R=D*(t-e)+e;for(let U=0;U<=r;U++){let W=U/r,X=W*l+o,O=Math.sin(X),V=Math.cos(X);C.x=R*O,C.y=-D*i+p,C.z=R*V,d.push(C.x,C.y,C.z),b.set(O,P,V).normalize(),u.push(b.x,b.y,b.z),f.push(W,1-D),A.push(g++)}v.push(A)}for(let y=0;y<r;y++)for(let A=0;A<s;A++){let D=v[A][y],R=v[A+1][y],U=v[A+1][y+1],W=v[A][y+1];(e>0||A!==0)&&(h.push(D,R,W),E+=3),(t>0||A!==s-1)&&(h.push(R,U,W),E+=3)}c.addGroup(m,E,0),m+=E}function w(b){let C=g,E=new he,P=new I,y=0,A=b===!0?e:t,D=b===!0?1:-1;for(let U=1;U<=r;U++)d.push(0,p*D,0),u.push(0,D,0),f.push(.5,.5),g++;let R=g;for(let U=0;U<=r;U++){let X=U/r*l+o,O=Math.cos(X),V=Math.sin(X);P.x=A*V,P.y=p*D,P.z=A*O,d.push(P.x,P.y,P.z),u.push(0,D,0),E.x=O*.5+.5,E.y=V*.5*D+.5,f.push(E.x,E.y),g++}for(let U=0;U<r;U++){let W=C+U,X=R+U;b===!0?h.push(X,X+1,W):h.push(X+1,X,W),y+=3}c.addGroup(m,y,b===!0?1:2),m+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var el=class n extends Qe{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let s=[],a=[];o(r),c(i),h(),this.setAttribute("position",new qe(s,3)),this.setAttribute("normal",new qe(s.slice(),3)),this.setAttribute("uv",new qe(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let w=new I,b=new I,C=new I;for(let E=0;E<t.length;E+=3)f(t[E+0],w),f(t[E+1],b),f(t[E+2],C),l(w,b,C,M)}function l(M,w,b,C){let E=C+1,P=[];for(let y=0;y<=E;y++){P[y]=[];let A=M.clone().lerp(b,y/E),D=w.clone().lerp(b,y/E),R=E-y;for(let U=0;U<=R;U++)U===0&&y===E?P[y][U]=A:P[y][U]=A.clone().lerp(D,U/R)}for(let y=0;y<E;y++)for(let A=0;A<2*(E-y)-1;A++){let D=Math.floor(A/2);A%2===0?(u(P[y][D+1]),u(P[y+1][D]),u(P[y][D])):(u(P[y][D+1]),u(P[y+1][D+1]),u(P[y+1][D]))}}function c(M){let w=new I;for(let b=0;b<s.length;b+=3)w.x=s[b+0],w.y=s[b+1],w.z=s[b+2],w.normalize().multiplyScalar(M),s[b+0]=w.x,s[b+1]=w.y,s[b+2]=w.z}function h(){let M=new I;for(let w=0;w<s.length;w+=3){M.x=s[w+0],M.y=s[w+1],M.z=s[w+2];let b=p(M)/2/Math.PI+.5,C=m(M)/Math.PI+.5;a.push(b,1-C)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){let w=a[M+0],b=a[M+2],C=a[M+4],E=Math.max(w,b,C),P=Math.min(w,b,C);E>.9&&P<.1&&(w<.2&&(a[M+0]+=1),b<.2&&(a[M+2]+=1),C<.2&&(a[M+4]+=1))}}function u(M){s.push(M.x,M.y,M.z)}function f(M,w){let b=M*3;w.x=e[b+0],w.y=e[b+1],w.z=e[b+2]}function g(){let M=new I,w=new I,b=new I,C=new I,E=new he,P=new he,y=new he;for(let A=0,D=0;A<s.length;A+=9,D+=6){M.set(s[A+0],s[A+1],s[A+2]),w.set(s[A+3],s[A+4],s[A+5]),b.set(s[A+6],s[A+7],s[A+8]),E.set(a[D+0],a[D+1]),P.set(a[D+2],a[D+3]),y.set(a[D+4],a[D+5]),C.copy(M).add(w).add(b).divideScalar(3);let R=p(C);v(E,D+0,M,R),v(P,D+2,w,R),v(y,D+4,b,R)}}function v(M,w,b,C){C<0&&M.x===1&&(a[w]=M.x-1),b.x===0&&b.z===0&&(a[w]=C/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var wo=new I,Eo=new I,au=new I,To=new ei,la=class extends Qe{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Qr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:v,b:p,c:m}=To;if(v.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),To.getNormal(au),d[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,d[1]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,d[2]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){let w=(M+1)%3,b=d[M],C=d[w],E=To[h[M]],P=To[h[w]],y=`${b}_${C}`,A=`${C}_${b}`;A in u&&u[A]?(au.dot(u[A].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(P.x,P.y,P.z)),u[A]=null):y in u||(u[y]={index0:c[M],index1:c[w],normal:au.clone()})}}for(let g in u)if(u[g]){let{index0:v,index1:p}=u[g];wo.fromBufferAttribute(o,v),Eo.fromBufferAttribute(o,p),f.push(wo.x,wo.y,wo.z),f.push(Eo.x,Eo.y,Eo.z)}this.setAttribute("position",new qe(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var cs=class n extends el{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var ca=class n extends Qe{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){let M=m*u-a;for(let w=0;w<c;w++){let b=w*d-s;g.push(b,-M,0),v.push(0,0,1),p.push(w/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let w=M+c*m,b=M+c*(m+1),C=M+1+c*(m+1),E=M+1+c*m;f.push(w,b,E),f.push(b,C,E)}this.setIndex(f),this.setAttribute("position",new qe(g,3)),this.setAttribute("normal",new qe(v,3)),this.setAttribute("uv",new qe(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var gr=class n extends Qe{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new I,u=new I,f=[],g=[],v=[],p=[];for(let m=0;m<=i;m++){let M=[],w=m/i,b=0;m===0&&a===0?b=.5/t:m===i&&l===Math.PI&&(b=-.5/t);for(let C=0;C<=t;C++){let E=C/t;d.x=-e*Math.cos(r+E*s)*Math.sin(a+w*o),d.y=e*Math.cos(a+w*o),d.z=e*Math.sin(r+E*s)*Math.sin(a+w*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(E+b,1-w),M.push(c++)}h.push(M)}for(let m=0;m<i;m++)for(let M=0;M<t;M++){let w=h[m][M+1],b=h[m][M],C=h[m+1][M],E=h[m+1][M+1];(m!==0||a>0)&&f.push(w,b,E),(m!==i-1||l<Math.PI)&&f.push(b,C,E)}this.setIndex(f),this.setAttribute("position",new qe(g,3)),this.setAttribute("normal",new qe(v,3)),this.setAttribute("uv",new qe(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var li=class n extends Qe{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);let l=[],c=[],h=[],d=[],u=new I,f=new I,g=new I;for(let v=0;v<=i;v++){let p=a+v/i*o;for(let m=0;m<=r;m++){let M=m/r*s;f.x=(e+t*Math.cos(p))*Math.cos(M),f.y=(e+t*Math.cos(p))*Math.sin(M),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(m/r),d.push(v/i)}}for(let v=1;v<=i;v++)for(let p=1;p<=r;p++){let m=(r+1)*v+p-1,M=(r+1)*(v-1)+p-1,w=(r+1)*(v-1)+p,b=(r+1)*v+p;l.push(m,M,b),l.push(M,w,b)}this.setIndex(l),this.setAttribute("position",new qe(c,3)),this.setAttribute("normal",new qe(h,3)),this.setAttribute("uv",new qe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function Sr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(xd(r))r.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(xd(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function tn(n){let e={};for(let t=0;t<n.length;t++){let i=Sr(n[t]);for(let r in i)e[r]=i[r]}return e}function xd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function km(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Du(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}var Tn={clone:Sr,merge:tn},Gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ye=class extends kn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gm,this.fragmentShader=Wm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sr(e.uniforms),this.uniformsGroups=km(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},xr=class extends Ye{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},us=class extends kn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nc,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var tl=class extends kn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},nl=class extends kn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ao(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var Gi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},il=class extends Gi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cu,endingEnd:cu}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case uu:s=e,o=2*t-i;break;case hu:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case uu:a=e,l=2*i-t;break;case hu:a=1,l=i+r[1]-r[0];break;default:a=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-t)/(r-t),v=g*g,p=v*g,m=-u*p+2*u*v-u*g,M=(1+u)*p+(-1.5-2*u)*v+(-.5+u)*g+1,w=(-1-f)*p+(1.5+f)*v+.5*g,b=f*p-f*v;for(let C=0;C!==o;++C)s[C]=m*a[h+C]+M*a[c+C]+w*a[l+C]+b*a[d+C];return s}},rl=class extends Gi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(r-t),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},sl=class extends Gi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},al=class extends Gi{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){let v=(i-t)/(r-t),p=1-v;for(let m=0;m!==o;++m)s[m]=a[c+m]*p+a[l+m]*v;return s}let f=o*2,g=e-1;for(let v=0;v!==o;++v){let p=a[c+v],m=a[l+v],M=g*f+v*2,w=u[M],b=u[M+1],C=e*f+v*2,E=d[C],P=d[C+1],y=(i-t)/(r-t),A,D,R,U,W;for(let X=0;X<8;X++){A=y*y,D=A*y,R=1-y,U=R*R,W=U*R;let V=W*t+3*U*y*w+3*R*A*E+D*r-i;if(Math.abs(V)<1e-10)break;let G=3*U*(w-t)+6*R*y*(E-w)+3*A*(r-E);if(Math.abs(G)<1e-10)break;y=y-V/G,y=Math.max(0,Math.min(1,y))}s[v]=W*p+3*U*y*b+3*R*A*P+D*m}return s}},En=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new sl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new il(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new al(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Xs:t=this.InterpolantFactoryMethodDiscrete;break;case ko:t=this.InterpolantFactoryMethodLinear;break;case Po:t=this.InterpolantFactoryMethodSmooth;break;case lu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Re("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xs;case this.InterpolantFactoryMethodLinear:return ko;case this.InterpolantFactoryMethodSmooth:return Po;case this.InterpolantFactoryMethodBezier:return lu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ie("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ie("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ie("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ie("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&am(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Ie("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Po,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let v=t[d+g];if(v!==t[u+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};En.prototype.ValueTypeName="";En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=ko;var Wi=class extends En{constructor(e,t,i){super(e,t,i)}};Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=Xs;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var ol=class extends En{constructor(e,t,i,r){super(e,t,i,r)}};ol.prototype.ValueTypeName="color";var ll=class extends En{constructor(e,t,i,r){super(e,t,i,r)}};ll.prototype.ValueTypeName="number";var cl=class extends Gi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)Pn.slerpFlat(s,0,a,c-o,a,c,l);return s}},ua=class extends En{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new cl(this.times,this.values,this.getValueSize(),e)}};ua.prototype.ValueTypeName="quaternion";ua.prototype.InterpolantFactoryMethodSmooth=void 0;var Xi=class extends En{constructor(e,t,i){super(e,t,i)}};Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=Xs;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var ul=class extends En{constructor(e,t,i,r){super(e,t,i,r)}};ul.prototype.ValueTypeName="vector";var hl=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},cf=new hl,dl=class{constructor(e){this.manager=e!==void 0?e:cf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};dl.DEFAULT_MATERIAL_NAME="__DEFAULT";var ha=class extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},da=class extends ha{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ou=new ct,vd=new I,_d=new I,pu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ls,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;vd.setFromMatrixPosition(e.matrixWorld),t.position.copy(vd),_d.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_d),t.updateMatrixWorld(),ou.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ou,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ts||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ou)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Co=new I,Ro=new Pn,jn=new I,fa=class extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Co,Ro,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Co,Ro,jn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Co,Ro,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Co,Ro,jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Vi=new I,yd=new he,Md=new he,qt=class extends fa{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=is*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z)}getViewSize(e,t){return this.getViewBounds(e,yd,Md),t.subVectors(Md,yd)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Qr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var mu=class extends pu{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},hs=class extends ha{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new mu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},vr=class extends fa{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Kr=-90,jr=1,fl=class extends zt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new qt(Kr,jr,e,t);r.layers=this.layers,this.add(r);let s=new qt(Kr,jr,e,t);s.layers=this.layers,this.add(s);let a=new qt(Kr,jr,e,t);a.layers=this.layers,this.add(a);let o=new qt(Kr,jr,e,t);o.layers=this.layers,this.add(o);let l=new qt(Kr,jr,e,t);l.layers=this.layers,this.add(l);let c=new qt(Kr,jr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ts)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},pl=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},_r=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Xm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Xm(){this._document.hidden===!1&&this.reset()}var Lu="\\[\\]\\.:\\/",qm=new RegExp("["+Lu+"]","g"),Nu="[^"+Lu+"]",Ym="[^"+Lu.replace("\\.","")+"]",Zm=/((?:WC+[\/:])*)/.source.replace("WC",Nu),$m=/(WCOD+)?/.source.replace("WCOD",Ym),Jm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nu),Km=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nu),jm=new RegExp("^"+Zm+$m+Jm+Km+"$"),Qm=["material","materials","bones","map"],gu=class{constructor(e,t,i){let r=i||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},bt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qm,"")}static parseTrackName(e){let t=jm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);Qm.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ie("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ie("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ie("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ie("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Ie("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Ie("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=gu;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wM=new Float32Array(1);var Sd=new ct,ds=class{constructor(e,t,i=0,r=1/0){this.ray=new fr(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new ss,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ie("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Sd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sd),this}intersectObject(e,t=!0,i=[]){return xu(e,this,i,t),i.sort(bd),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)xu(e[r],this,i,t);return i.sort(bd),i}};function bd(n,e){return n.distance-e.distance}function xu(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let a=0,o=s.length;a<o;a++)xu(s[a],e,t,!0)}}var Hu=class Hu{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Hu.prototype.isMatrix2=!0;var vu=Hu;function Fu(n,e,t,i){let r=e0(i);switch(t){case Cu:return n*e;case gs:return n*e/r.components*r.byteLength;case bl:return n*e/r.components*r.byteLength;case $i:return n*e*2/r.components*r.byteLength;case wl:return n*e*2/r.components*r.byteLength;case Ru:return n*e*3/r.components*r.byteLength;case Dn:return n*e*4/r.components*r.byteLength;case El:return n*e*4/r.components*r.byteLength;case ba:case wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ea:case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Al:case Rl:return Math.max(n,16)*Math.max(e,8)/4;case Tl:case Cl:return Math.max(n,8)*Math.max(e,8)/2;case Pl:case Il:case Ll:case Nl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Dl:case Aa:case Fl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ul:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Bl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case zl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Hl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Vl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case kl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Gl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Wl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Xl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ql:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Yl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Zl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case $l:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Jl:case Kl:case jl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ql:case ec:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ca:case tc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function e0(n){switch(n){case en:case wu:return{byteLength:1,components:1};case ps:case Eu:case wt:return{byteLength:2,components:1};case Ml:case Sl:return{byteLength:2,components:4};case Xn:case yl:case In:return{byteLength:4,components:1};case Tu:case Au:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gl}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gl);function Df(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function t0(n){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let v=d[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var n0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,i0=`#ifdef USE_ALPHAHASH
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
#endif`,r0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,s0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,a0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,o0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,l0=`#ifdef USE_AOMAP
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
#endif`,c0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,u0=`#ifdef USE_BATCHING
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
#endif`,h0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,d0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,f0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,p0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,m0=`#ifdef USE_IRIDESCENCE
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
#endif`,g0=`#ifdef USE_BUMPMAP
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
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,M0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,S0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,b0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,w0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,E0=`#define PI 3.141592653589793
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
} // validated`,T0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,A0=`vec3 transformedNormal = objectNormal;
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
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,R0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,P0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,I0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,D0="gl_FragColor = linearToOutputTexel( gl_FragColor );",L0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,N0=`#ifdef USE_ENVMAP
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
#endif`,F0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
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
#endif`,O0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,B0=`#ifdef USE_ENVMAP
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
#endif`,z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,H0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,V0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,k0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,G0=`#ifdef USE_GRADIENTMAP
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
}`,W0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,X0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,q0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Y0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Z0=`#ifdef USE_ENVMAP
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
#endif`,$0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,K0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Q0=`PhysicalMaterial material;
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
#endif`,eg=`uniform sampler2D dfgLUT;
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
}`,tg=`
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
#endif`,ng=`#if defined( RE_IndirectDiffuse )
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
#endif`,ig=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ag=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ug=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dg=`#if defined( USE_POINTS_UV )
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
#endif`,fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vg=`#ifdef USE_MORPHTARGETS
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
#endif`,_g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Eg=`#ifdef USE_NORMALMAP
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
#endif`,Tg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ig=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Dg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ng=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ug=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vg=`float getShadowMask() {
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
}`,kg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gg=`#ifdef USE_SKINNING
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
#endif`,Wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xg=`#ifdef USE_SKINNING
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
#endif`,qg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$g=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jg=`#ifdef USE_TRANSMISSION
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
#endif`,Kg=`#ifdef USE_TRANSMISSION
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
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ix=`uniform sampler2D t2D;
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
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`#include <common>
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
}`,cx=`#if DEPTH_PACKING == 3200
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
}`,ux=`#define DISTANCE
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
}`,hx=`#define DISTANCE
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
}`,dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,px=`uniform float scale;
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
}`,mx=`uniform vec3 diffuse;
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
}`,gx=`#include <common>
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
}`,xx=`uniform vec3 diffuse;
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
}`,vx=`#define LAMBERT
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
}`,_x=`#define LAMBERT
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
}`,yx=`#define MATCAP
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
}`,Mx=`#define MATCAP
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
}`,Sx=`#define NORMAL
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
}`,bx=`#define NORMAL
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
}`,wx=`#define PHONG
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
}`,Ex=`#define PHONG
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
}`,Tx=`#define STANDARD
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
}`,Ax=`#define STANDARD
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
}`,Cx=`#define TOON
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
}`,Rx=`#define TOON
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
}`,Px=`uniform float size;
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
}`,Ix=`uniform vec3 diffuse;
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
}`,Dx=`#include <common>
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
}`,Lx=`uniform vec3 color;
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
}`,Nx=`uniform float rotation;
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
}`,Fx=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:n0,alphahash_pars_fragment:i0,alphamap_fragment:r0,alphamap_pars_fragment:s0,alphatest_fragment:a0,alphatest_pars_fragment:o0,aomap_fragment:l0,aomap_pars_fragment:c0,batching_pars_vertex:u0,batching_vertex:h0,begin_vertex:d0,beginnormal_vertex:f0,bsdfs:p0,iridescence_fragment:m0,bumpmap_pars_fragment:g0,clipping_planes_fragment:x0,clipping_planes_pars_fragment:v0,clipping_planes_pars_vertex:_0,clipping_planes_vertex:y0,color_fragment:M0,color_pars_fragment:S0,color_pars_vertex:b0,color_vertex:w0,common:E0,cube_uv_reflection_fragment:T0,defaultnormal_vertex:A0,displacementmap_pars_vertex:C0,displacementmap_vertex:R0,emissivemap_fragment:P0,emissivemap_pars_fragment:I0,colorspace_fragment:D0,colorspace_pars_fragment:L0,envmap_fragment:N0,envmap_common_pars_fragment:F0,envmap_pars_fragment:U0,envmap_pars_vertex:O0,envmap_physical_pars_fragment:Z0,envmap_vertex:B0,fog_vertex:z0,fog_pars_vertex:H0,fog_fragment:V0,fog_pars_fragment:k0,gradientmap_pars_fragment:G0,lightmap_pars_fragment:W0,lights_lambert_fragment:X0,lights_lambert_pars_fragment:q0,lights_pars_begin:Y0,lights_toon_fragment:$0,lights_toon_pars_fragment:J0,lights_phong_fragment:K0,lights_phong_pars_fragment:j0,lights_physical_fragment:Q0,lights_physical_pars_fragment:eg,lights_fragment_begin:tg,lights_fragment_maps:ng,lights_fragment_end:ig,lightprobes_pars_fragment:rg,logdepthbuf_fragment:sg,logdepthbuf_pars_fragment:ag,logdepthbuf_pars_vertex:og,logdepthbuf_vertex:lg,map_fragment:cg,map_pars_fragment:ug,map_particle_fragment:hg,map_particle_pars_fragment:dg,metalnessmap_fragment:fg,metalnessmap_pars_fragment:pg,morphinstance_vertex:mg,morphcolor_vertex:gg,morphnormal_vertex:xg,morphtarget_pars_vertex:vg,morphtarget_vertex:_g,normal_fragment_begin:yg,normal_fragment_maps:Mg,normal_pars_fragment:Sg,normal_pars_vertex:bg,normal_vertex:wg,normalmap_pars_fragment:Eg,clearcoat_normal_fragment_begin:Tg,clearcoat_normal_fragment_maps:Ag,clearcoat_pars_fragment:Cg,iridescence_pars_fragment:Rg,opaque_fragment:Pg,packing:Ig,premultiplied_alpha_fragment:Dg,project_vertex:Lg,dithering_fragment:Ng,dithering_pars_fragment:Fg,roughnessmap_fragment:Ug,roughnessmap_pars_fragment:Og,shadowmap_pars_fragment:Bg,shadowmap_pars_vertex:zg,shadowmap_vertex:Hg,shadowmask_pars_fragment:Vg,skinbase_vertex:kg,skinning_pars_vertex:Gg,skinning_vertex:Wg,skinnormal_vertex:Xg,specularmap_fragment:qg,specularmap_pars_fragment:Yg,tonemapping_fragment:Zg,tonemapping_pars_fragment:$g,transmission_fragment:Jg,transmission_pars_fragment:Kg,uv_pars_fragment:jg,uv_pars_vertex:Qg,uv_vertex:ex,worldpos_vertex:tx,background_vert:nx,background_frag:ix,backgroundCube_vert:rx,backgroundCube_frag:sx,cube_vert:ax,cube_frag:ox,depth_vert:lx,depth_frag:cx,distance_vert:ux,distance_frag:hx,equirect_vert:dx,equirect_frag:fx,linedashed_vert:px,linedashed_frag:mx,meshbasic_vert:gx,meshbasic_frag:xx,meshlambert_vert:vx,meshlambert_frag:_x,meshmatcap_vert:yx,meshmatcap_frag:Mx,meshnormal_vert:Sx,meshnormal_frag:bx,meshphong_vert:wx,meshphong_frag:Ex,meshphysical_vert:Tx,meshphysical_frag:Ax,meshtoon_vert:Cx,meshtoon_frag:Rx,points_vert:Px,points_frag:Ix,shadow_vert:Dx,shadow_frag:Lx,sprite_vert:Nx,sprite_frag:Fx},de={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},ui={basic:{uniforms:tn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:tn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ee(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:tn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:tn([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:tn([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:tn([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:tn([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:tn([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:tn([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:tn([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:tn([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:tn([de.common,de.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:tn([de.lights,de.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ui.physical={uniforms:tn([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var ac={r:0,b:0,g:0},Ux=new ct,Lf=new Oe;Lf.set(-1,0,0,0,1,0,0,0,1);function Ox(n,e,t,i,r,s){let a=new Ee(0),o=r===!0?0:1,l,c,h=null,d=0,u=null;function f(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){let b=M.backgroundBlurriness>0;w=e.get(w,b)}return w}function g(M){let w=!1,b=f(M);b===null?p(a,o):b&&b.isColor&&(p(b,1),w=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(M,w){let b=f(w);b&&(b.isCubeTexture||b.mapping===Ma)?(c===void 0&&(c=new it(new oi(1,1,1),new Ye({name:"BackgroundCubeMaterial",uniforms:Sr(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ux.makeRotationFromEuler(w.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Lf),c.material.toneMapped=Xe.getTransfer(b.colorSpace)!==je,(h!==b||d!==b.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new it(new ca(2,2),new Ye({name:"BackgroundMaterial",uniforms:Sr(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(b.colorSpace)!==je,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,w){M.getRGB(ac,Du(n)),t.buffers.color.setClear(ac.r,ac.g,ac.b,w,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:g,addToRenderList:v,dispose:m}}function Bx(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null),s=r,a=!1;function o(R,U,W,X,O){let V=!1,G=d(R,X,W,U);s!==G&&(s=G,c(s.object)),V=f(R,X,W,O),V&&g(R,X,W,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,b(R,U,W,X),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function h(R){return n.deleteVertexArray(R)}function d(R,U,W,X){let O=X.wireframe===!0,V=i[U.id];V===void 0&&(V={},i[U.id]=V);let G=R.isInstancedMesh===!0?R.id:0,ee=V[G];ee===void 0&&(ee={},V[G]=ee);let ne=ee[W.id];ne===void 0&&(ne={},ee[W.id]=ne);let fe=ne[O];return fe===void 0&&(fe=u(l()),ne[O]=fe),fe}function u(R){let U=[],W=[],X=[];for(let O=0;O<t;O++)U[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:W,attributeDivisors:X,object:R,attributes:{},index:null}}function f(R,U,W,X){let O=s.attributes,V=U.attributes,G=0,ee=W.getAttributes();for(let ne in ee)if(ee[ne].location>=0){let Se=O[ne],Ae=V[ne];if(Ae===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(Ae=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(Ae=R.instanceColor)),Se===void 0||Se.attribute!==Ae||Ae&&Se.data!==Ae.data)return!0;G++}return s.attributesNum!==G||s.index!==X}function g(R,U,W,X){let O={},V=U.attributes,G=0,ee=W.getAttributes();for(let ne in ee)if(ee[ne].location>=0){let Se=V[ne];Se===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(Se=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(Se=R.instanceColor));let Ae={};Ae.attribute=Se,Se&&Se.data&&(Ae.data=Se.data),O[ne]=Ae,G++}s.attributes=O,s.attributesNum=G,s.index=X}function v(){let R=s.newAttributes;for(let U=0,W=R.length;U<W;U++)R[U]=0}function p(R){m(R,0)}function m(R,U){let W=s.newAttributes,X=s.enabledAttributes,O=s.attributeDivisors;W[R]=1,X[R]===0&&(n.enableVertexAttribArray(R),X[R]=1),O[R]!==U&&(n.vertexAttribDivisor(R,U),O[R]=U)}function M(){let R=s.newAttributes,U=s.enabledAttributes;for(let W=0,X=U.length;W<X;W++)U[W]!==R[W]&&(n.disableVertexAttribArray(W),U[W]=0)}function w(R,U,W,X,O,V,G){G===!0?n.vertexAttribIPointer(R,U,W,O,V):n.vertexAttribPointer(R,U,W,X,O,V)}function b(R,U,W,X){v();let O=X.attributes,V=W.getAttributes(),G=U.defaultAttributeValues;for(let ee in V){let ne=V[ee];if(ne.location>=0){let fe=O[ee];if(fe===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor)),fe!==void 0){let Se=fe.normalized,Ae=fe.itemSize,tt=e.get(fe);if(tt===void 0)continue;let ut=tt.buffer,Ve=tt.type,J=tt.bytesPerElement,ge=Ve===n.INT||Ve===n.UNSIGNED_INT||fe.gpuType===yl;if(fe.isInterleavedBufferAttribute){let ae=fe.data,Le=ae.stride,Be=fe.offset;if(ae.isInstancedInterleavedBuffer){for(let Ne=0;Ne<ne.locationSize;Ne++)m(ne.location+Ne,ae.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ne=0;Ne<ne.locationSize;Ne++)p(ne.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let Ne=0;Ne<ne.locationSize;Ne++)w(ne.location+Ne,Ae/ne.locationSize,Ve,Se,Le*J,(Be+Ae/ne.locationSize*Ne)*J,ge)}else{if(fe.isInstancedBufferAttribute){for(let ae=0;ae<ne.locationSize;ae++)m(ne.location+ae,fe.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ae=0;ae<ne.locationSize;ae++)p(ne.location+ae);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let ae=0;ae<ne.locationSize;ae++)w(ne.location+ae,Ae/ne.locationSize,Ve,Se,Ae*J,Ae/ne.locationSize*ae*J,ge)}}else if(G!==void 0){let Se=G[ee];if(Se!==void 0)switch(Se.length){case 2:n.vertexAttrib2fv(ne.location,Se);break;case 3:n.vertexAttrib3fv(ne.location,Se);break;case 4:n.vertexAttrib4fv(ne.location,Se);break;default:n.vertexAttrib1fv(ne.location,Se)}}}}M()}function C(){A();for(let R in i){let U=i[R];for(let W in U){let X=U[W];for(let O in X){let V=X[O];for(let G in V)h(V[G].object),delete V[G];delete X[O]}}delete i[R]}}function E(R){if(i[R.id]===void 0)return;let U=i[R.id];for(let W in U){let X=U[W];for(let O in X){let V=X[O];for(let G in V)h(V[G].object),delete V[G];delete X[O]}}delete i[R.id]}function P(R){for(let U in i){let W=i[U];for(let X in W){let O=W[X];if(O[R.id]===void 0)continue;let V=O[R.id];for(let G in V)h(V[G].object),delete V[G];delete O[R.id]}}}function y(R){for(let U in i){let W=i[U],X=R.isInstancedMesh===!0?R.id:0,O=W[X];if(O!==void 0){for(let V in O){let G=O[V];for(let ee in G)h(G[ee].object),delete G[ee];delete O[V]}delete W[X],Object.keys(W).length===0&&delete i[U]}}}function A(){D(),a=!0,s!==r&&(s=r,c(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:D,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:p,disableUnusedAttributes:M}}function zx(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Hx(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==Dn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===wt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==en&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==In&&!y)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Re("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:b,maxSamples:C,samples:E}}function Vx(n){let e=this,t=null,i=0,r=!1,s=!1,a=new Qn,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||r;return r=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?h(null):c();else{let M=s?0:i,w=M*4,b=m.clippingState||null;l.value=b,b=h(g,u,w,f);for(let C=0;C!==w;++C)b[C]=t[C];m.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=l.value,g!==!0||p===null){let m=f+v*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let w=0,b=f;w!==v;++w,b+=4)a.copy(d[w]).applyMatrix4(M,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var Ji=4,uf=[.125,.215,.35,.446,.526,.582],br=20,kx=256,Ra=new vr,hf=new Ee,Vu=null,ku=0,Gu=0,Wu=!1,Gx=new I,lc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=Gx}=s;Vu=this._renderer.getRenderTarget(),ku=this._renderer.getActiveCubeFace(),Gu=this._renderer.getActiveMipmapLevel(),Wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ff(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vu,ku,Gu),this._renderer.xr.enabled=Wu,e.scissorTest=!1,vs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qi||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vu=this._renderer.getRenderTarget(),ku=this._renderer.getActiveCubeFace(),Gu=this._renderer.getActiveMipmapLevel(),Wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:wt,format:Dn,colorSpace:qs,depthBuffer:!1},r=df(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=df(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Wx(s)),this._blurMaterial=qx(s,e,t),this._ggxMaterial=Xx(s,e,t)}return r}_compileMaterial(e){let t=new it(new Qe,e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,i,r,s){let l=new qt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(hf),d.toneMapping=Wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new it(new oi,new ln({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,m=!1,M=e.background;M?M.isColor&&(p.color.copy(M),e.background=null,m=!0):(p.color.copy(hf),m=!0);for(let w=0;w<6;w++){let b=w%3;b===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[w],s.y,s.z)):b===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[w]));let C=this._cubeSize;vs(r,b*C,w>2?C:0,C,C),d.setRenderTarget(r),m&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===qi||e.mapping===Mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ff());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;vs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ra)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[i],p=3*v*(i>g-Ji?i-g+Ji:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,vs(s,p,m,3*v,2*v),r.setRenderTarget(s),r.render(o,Ra),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,vs(e,p,m,3*v,2*v),r.setRenderTarget(e),r.render(o,Ra)}_blur(e,t,i,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ie("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[r];d.material=c;let u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*br-1),v=s/g,p=isFinite(s)?1+Math.floor(h*v):br;p>br&&Re(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${br}`);let m=[],M=0;for(let P=0;P<br;++P){let y=P/v,A=Math.exp(-y*y/2);m.push(A),P===0?M+=A:P<p&&(M+=2*A)}for(let P=0;P<m.length;P++)m[P]=m[P]/M;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-i;let b=this._sizeLods[r],C=3*b*(r>w-Ji?r-w+Ji:0),E=4*(this._cubeSize-b);vs(t,C,E,3*b,2*b),l.setRenderTarget(t),l.render(d,Ra)}};function Wx(n){let e=[],t=[],i=[],r=n,s=n-Ji+1+uf.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Ji?l=uf[a-n+Ji-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,M=new Float32Array(v*g*f),w=new Float32Array(p*g*f),b=new Float32Array(m*g*f);for(let E=0;E<f;E++){let P=E%3*2/3-1,y=E>2?0:-1,A=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];M.set(A,v*g*E),w.set(u,p*g*E);let D=[E,E,E,E,E,E];b.set(D,m*g*E)}let C=new Qe;C.setAttribute("position",new De(M,v)),C.setAttribute("uv",new De(w,p)),C.setAttribute("faceIndex",new De(b,m)),i.push(new it(C,null)),r>Ji&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function df(n,e,t){let i=new xt(n,e,t);return i.texture.mapping=Ma,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Xx(n,e,t){return new Ye({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:kx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hc(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function qx(n,e,t){let i=new Float32Array(br),r=new I(0,1,0);return new Ye({name:"SphericalGaussianBlur",defines:{n:br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:hc(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function ff(){return new Ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hc(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function pf(){return new Ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function hc(){return`

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
	`}var cc=class extends xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ra(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new oi(5,5,5),s=new Ye({name:"CubemapFromEquirect",uniforms:Sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yt,blending:mn});s.uniforms.tEquirect.value=t;let a=new it(r,s),o=t.minFilter;return t.minFilter===Yi&&(t.minFilter=Ut),new fl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function Yx(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===xl||f===vl)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new cc(g.height);return v.fromEquirectangularTexture(n,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===xl||f===vl,v=f===qi||f===Mr;if(g||v){let p=t.get(u),m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new lc(n)),p=g?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{let M=u.image;return g&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new lc(n)),p=g?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===xl?u.mapping=qi:f===vl&&(u.mapping=Mr),u}function l(u){let f=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function Zx(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Wo("WebGLRenderer: "+i+" extension not supported."),r}}}function $x(n,e,t,i){let r={},s=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];let f=s.get(u);f&&(e.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],n.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(f!==null){let M=f.array;v=f.version;for(let w=0,b=M.length;w<b;w+=3){let C=M[w+0],E=M[w+1],P=M[w+2];u.push(C,E,E,P,P,C)}}else{let M=g.array;v=g.version;for(let w=0,b=M.length/3-1;w<b;w+=3){let C=w+0,E=w+1,P=w+2;u.push(C,E,E,P,P,C)}}let p=new(g.count>=65535?ea:Qs)(u,1);p.version=v;let m=s.get(d);m&&e.remove(m),s.set(d,p)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Jx(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,u){n.drawElements(i,u,s,d*a),t.update(u,i,1)}function c(d,u,f){f!==0&&(n.drawElementsInstanced(i,u,s,d*a,f),t.update(u,i,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,f);let v=0;for(let p=0;p<f;p++)v+=u[p];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Kx(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Ie("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function jx(n,e,t){let i=new WeakMap,r=new gt;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let A=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],w=0;f===!0&&(w=1),g===!0&&(w=2),v===!0&&(w=3);let b=o.attributes.position.count*w,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let E=new Float32Array(b*C*4*d),P=new Js(E,b,C,d);P.type=In,P.needsUpdate=!0;let y=w*4;for(let D=0;D<d;D++){let R=p[D],U=m[D],W=M[D],X=b*C*4*D;for(let O=0;O<R.count;O++){let V=O*y;f===!0&&(r.fromBufferAttribute(R,O),E[X+V+0]=r.x,E[X+V+1]=r.y,E[X+V+2]=r.z,E[X+V+3]=0),g===!0&&(r.fromBufferAttribute(U,O),E[X+V+4]=r.x,E[X+V+5]=r.y,E[X+V+6]=r.z,E[X+V+7]=0),v===!0&&(r.fromBufferAttribute(W,O),E[X+V+8]=r.x,E[X+V+9]=r.y,E[X+V+10]=r.z,E[X+V+11]=W.itemSize===4?r.w:1)}}u={count:d,texture:P,size:new he(b,C)},i.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Qx(n,e,t,i,r){let s=new WeakMap;function a(c){let h=r.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var ev={[ma]:"LINEAR_TONE_MAPPING",[ga]:"REINHARD_TONE_MAPPING",[xa]:"CINEON_TONE_MAPPING",[yr]:"ACES_FILMIC_TONE_MAPPING",[_a]:"AGX_TONE_MAPPING",[ya]:"NEUTRAL_TONE_MAPPING",[va]:"CUSTOM_TONE_MAPPING"};function tv(n,e,t,i,r){let s=new xt(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Ai(e,t):void 0}),a=new xt(e,t,{type:wt,depthBuffer:!1,stencilBuffer:!1}),o=new Qe;o.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new qe([0,2,0,0,2,0],2));let l=new xr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new it(o,l),h=new vr(-1,1,1,-1,0,1),d=null,u=null,f=!1,g,v=null,p=[],m=!1;this.setSize=function(M,w){s.setSize(M,w),a.setSize(M,w);for(let b=0;b<p.length;b++){let C=p[b];C.setSize&&C.setSize(M,w)}},this.setEffects=function(M){p=M,m=p.length>0&&p[0].isRenderPass===!0;let w=s.width,b=s.height;for(let C=0;C<p.length;C++){let E=p[C];E.setSize&&E.setSize(w,b)}},this.begin=function(M,w){if(f||M.toneMapping===Wn&&p.length===0)return!1;if(v=w,w!==null){let b=w.width,C=w.height;(s.width!==b||s.height!==C)&&this.setSize(b,C)}return m===!1&&M.setRenderTarget(s),g=M.toneMapping,M.toneMapping=Wn,!0},this.hasRenderPass=function(){return m},this.end=function(M,w){M.toneMapping=g,f=!0;let b=s,C=a;for(let E=0;E<p.length;E++){let P=p[E];if(P.enabled!==!1&&(P.render(M,C,b,w),P.needsSwap!==!1)){let y=b;b=C,C=y}}if(d!==M.outputColorSpace||u!==M.toneMapping){d=M.outputColorSpace,u=M.toneMapping,l.defines={},Xe.getTransfer(d)===je&&(l.defines.SRGB_TRANSFER="");let E=ev[u];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(v),M.render(c,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}var Nf=new on,Yu=new Ai(1,1),Ff=new Js,Uf=new Yo,Of=new ra,mf=[],gf=[],xf=new Float32Array(16),vf=new Float32Array(9),_f=new Float32Array(4);function ys(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=mf[r];if(s===void 0&&(s=new Float32Array(r),mf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ht(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Vt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function dc(n,e){let t=gf[e];t===void 0&&(t=new Int32Array(e),gf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function nv(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function iv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2fv(this.addr,e),Vt(t,e)}}function rv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;n.uniform3fv(this.addr,e),Vt(t,e)}}function sv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4fv(this.addr,e),Vt(t,e)}}function av(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,i))return;_f.set(i),n.uniformMatrix2fv(this.addr,!1,_f),Vt(t,i)}}function ov(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,i))return;vf.set(i),n.uniformMatrix3fv(this.addr,!1,vf),Vt(t,i)}}function lv(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,i))return;xf.set(i),n.uniformMatrix4fv(this.addr,!1,xf),Vt(t,i)}}function cv(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function uv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2iv(this.addr,e),Vt(t,e)}}function hv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3iv(this.addr,e),Vt(t,e)}}function dv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4iv(this.addr,e),Vt(t,e)}}function fv(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function pv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2uiv(this.addr,e),Vt(t,e)}}function mv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3uiv(this.addr,e),Vt(t,e)}}function gv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4uiv(this.addr,e),Vt(t,e)}}function xv(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Yu.compareFunction=t.isReversedDepthBuffer()?rc:ic,s=Yu):s=Nf,t.setTexture2D(e||s,r)}function vv(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Uf,r)}function _v(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Of,r)}function yv(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ff,r)}function Mv(n){switch(n){case 5126:return nv;case 35664:return iv;case 35665:return rv;case 35666:return sv;case 35674:return av;case 35675:return ov;case 35676:return lv;case 5124:case 35670:return cv;case 35667:case 35671:return uv;case 35668:case 35672:return hv;case 35669:case 35673:return dv;case 5125:return fv;case 36294:return pv;case 36295:return mv;case 36296:return gv;case 35678:case 36198:case 36298:case 36306:case 35682:return xv;case 35679:case 36299:case 36307:return vv;case 35680:case 36300:case 36308:case 36293:return _v;case 36289:case 36303:case 36311:case 36292:return yv}}function Sv(n,e){n.uniform1fv(this.addr,e)}function bv(n,e){let t=ys(e,this.size,2);n.uniform2fv(this.addr,t)}function wv(n,e){let t=ys(e,this.size,3);n.uniform3fv(this.addr,t)}function Ev(n,e){let t=ys(e,this.size,4);n.uniform4fv(this.addr,t)}function Tv(n,e){let t=ys(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Av(n,e){let t=ys(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Cv(n,e){let t=ys(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Rv(n,e){n.uniform1iv(this.addr,e)}function Pv(n,e){n.uniform2iv(this.addr,e)}function Iv(n,e){n.uniform3iv(this.addr,e)}function Dv(n,e){n.uniform4iv(this.addr,e)}function Lv(n,e){n.uniform1uiv(this.addr,e)}function Nv(n,e){n.uniform2uiv(this.addr,e)}function Fv(n,e){n.uniform3uiv(this.addr,e)}function Uv(n,e){n.uniform4uiv(this.addr,e)}function Ov(n,e,t){let i=this.cache,r=e.length,s=dc(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Yu:a=Nf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Bv(n,e,t){let i=this.cache,r=e.length,s=dc(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Uf,s[a])}function zv(n,e,t){let i=this.cache,r=e.length,s=dc(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Of,s[a])}function Hv(n,e,t){let i=this.cache,r=e.length,s=dc(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ff,s[a])}function Vv(n){switch(n){case 5126:return Sv;case 35664:return bv;case 35665:return wv;case 35666:return Ev;case 35674:return Tv;case 35675:return Av;case 35676:return Cv;case 5124:case 35670:return Rv;case 35667:case 35671:return Pv;case 35668:case 35672:return Iv;case 35669:case 35673:return Dv;case 5125:return Lv;case 36294:return Nv;case 36295:return Fv;case 36296:return Uv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ov;case 35679:case 36299:case 36307:return Bv;case 35680:case 36300:case 36308:case 36293:return zv;case 36289:case 36303:case 36311:case 36292:return Hv}}var Zu=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Mv(t.type)}},$u=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vv(t.type)}},Ju=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},Xu=/(\w+)(\])?(\[|\.)?/g;function yf(n,e){n.seq.push(e),n.map[e.id]=e}function kv(n,e,t){let i=n.name,r=i.length;for(Xu.lastIndex=0;;){let s=Xu.exec(i),a=Xu.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){yf(t,c===void 0?new Zu(o,n,e):new $u(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Ju(o),yf(t,d)),t=d}}}var _s=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);kv(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function Mf(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Gv=37297,Wv=0;function Xv(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Sf=new Oe;function qv(n){Xe._getMatrix(Sf,Xe.workingColorSpace,n);let e=`mat3( ${Sf.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(n)){case Ys:return[e,"LinearTransferOETF"];case je:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function bf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Xv(n.getShaderSource(e),o)}else return s}function Yv(n,e){let t=qv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Zv={[ma]:"Linear",[ga]:"Reinhard",[xa]:"Cineon",[yr]:"ACESFilmic",[_a]:"AgX",[ya]:"Neutral",[va]:"Custom"};function $v(n,e){let t=Zv[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var oc=new I;function Jv(){Xe.getLuminanceCoefficients(oc);let n=oc.x.toFixed(4),e=oc.y.toFixed(4),t=oc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Kv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ia).join(`
`)}function jv(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Qv(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ia(n){return n!==""}function wf(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ef(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var e_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ku(n){return n.replace(e_,n_)}var t_=new Map;function n_(n,e){let t=Ge[e];if(t===void 0){let i=t_.get(e);if(i!==void 0)t=Ge[i],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ku(t)}var i_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tf(n){return n.replace(i_,r_)}function r_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Af(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var s_={[pa]:"SHADOWMAP_TYPE_PCF",[fs]:"SHADOWMAP_TYPE_VSM"};function a_(n){return s_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var o_={[qi]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE",[Ma]:"ENVMAP_TYPE_CUBE_UV"};function l_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":o_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var c_={[Mr]:"ENVMAP_MODE_REFRACTION"};function u_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":c_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var h_={[Su]:"ENVMAP_BLENDING_MULTIPLY",[Xd]:"ENVMAP_BLENDING_MIX",[qd]:"ENVMAP_BLENDING_ADD"};function d_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":h_[n.combine]||"ENVMAP_BLENDING_NONE"}function f_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function p_(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=a_(t),c=l_(t),h=u_(t),d=d_(t),u=f_(t),f=Kv(t),g=jv(s),v=r.createProgram(),p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ia).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ia).join(`
`),m.length>0&&(m+=`
`)):(p=[Af(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ia).join(`
`),m=[Af(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Wn?$v("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Yv("linearToOutputTexel",t.outputColorSpace),Jv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ia).join(`
`)),a=Ku(a),a=wf(a,t),a=Ef(a,t),o=Ku(o),o=wf(o,t),o=Ef(o,t),a=Tf(a),o=Tf(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Pu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=M+p+a,b=M+m+o,C=Mf(r,r.VERTEX_SHADER,w),E=Mf(r,r.FRAGMENT_SHADER,b);r.attachShader(v,C),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function P(R){if(n.debug.checkShaderErrors){let U=r.getProgramInfoLog(v)||"",W=r.getShaderInfoLog(C)||"",X=r.getShaderInfoLog(E)||"",O=U.trim(),V=W.trim(),G=X.trim(),ee=!0,ne=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,C,E);else{let fe=bf(r,C,"vertex"),Se=bf(r,E,"fragment");Ie("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+fe+`
`+Se)}else O!==""?Re("WebGLProgram: Program Info Log:",O):(V===""||G==="")&&(ne=!1);ne&&(R.diagnostics={runnable:ee,programLog:O,vertexShader:{log:V,prefix:p},fragmentShader:{log:G,prefix:m}})}r.deleteShader(C),r.deleteShader(E),y=new _s(r,v),A=Qv(r,v)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(v,Gv)),D},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=E,this}var m_=0,ju=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Qu(e),t.set(e,i)),i}},Qu=class{constructor(e){this.id=m_++,this.code=e,this.usedTimes=0}};function g_(n){return n===$i||n===Aa||n===Ca}function x_(n,e,t,i,r,s){let a=new ss,o=new ju,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,A,D,R,U,W){let X=R.fog,O=U.geometry,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ee=e.get(y.envMap||V,G),ne=ee&&ee.mapping===Ma?ee.image.height:null,fe=f[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Re("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let Se=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ae=Se!==void 0?Se.length:0,tt=0;O.morphAttributes.position!==void 0&&(tt=1),O.morphAttributes.normal!==void 0&&(tt=2),O.morphAttributes.color!==void 0&&(tt=3);let ut,Ve,J,ge;if(fe){let ze=ui[fe];ut=ze.vertexShader,Ve=ze.fragmentShader}else ut=y.vertexShader,Ve=y.fragmentShader,o.update(y),J=o.getVertexShaderID(y),ge=o.getFragmentShaderID(y);let ae=n.getRenderTarget(),Le=n.state.buffers.depth.getReversed(),Be=U.isInstancedMesh===!0,Ne=U.isBatchedMesh===!0,At=!!y.map,$e=!!y.matcap,ht=!!ee,St=!!y.aoMap,Ze=!!y.lightMap,Ot=!!y.bumpMap,Ct=!!y.normalMap,yn=!!y.displacementMap,N=!!y.emissiveMap,Bt=!!y.metalnessMap,Je=!!y.roughnessMap,_t=y.anisotropy>0,ue=y.clearcoat>0,Rt=y.dispersion>0,T=y.iridescence>0,_=y.sheen>0,B=y.transmission>0,Z=_t&&!!y.anisotropyMap,Q=ue&&!!y.clearcoatMap,ie=ue&&!!y.clearcoatNormalMap,ce=ue&&!!y.clearcoatRoughnessMap,q=T&&!!y.iridescenceMap,$=T&&!!y.iridescenceThicknessMap,xe=_&&!!y.sheenColorMap,ye=_&&!!y.sheenRoughnessMap,oe=!!y.specularMap,re=!!y.specularColorMap,Ue=!!y.specularIntensityMap,ke=B&&!!y.transmissionMap,rt=B&&!!y.thicknessMap,L=!!y.gradientMap,se=!!y.alphaMap,Y=y.alphaTest>0,ve=!!y.alphaHash,le=!!y.extensions,j=Wn;y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(j=n.toneMapping);let we={shaderID:fe,shaderType:y.type,shaderName:y.name,vertexShader:ut,fragmentShader:Ve,defines:y.defines,customVertexShaderID:J,customFragmentShaderID:ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ne,batchingColor:Ne&&U._colorsTexture!==null,instancing:Be,instancingColor:Be&&U.instanceColor!==null,instancingMorph:Be&&U.morphTexture!==null,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Xe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:At,matcap:$e,envMap:ht,envMapMode:ht&&ee.mapping,envMapCubeUVHeight:ne,aoMap:St,lightMap:Ze,bumpMap:Ot,normalMap:Ct,displacementMap:yn,emissiveMap:N,normalMapObjectSpace:Ct&&y.normalMapType===$d,normalMapTangentSpace:Ct&&y.normalMapType===nc,packedNormalMap:Ct&&y.normalMapType===nc&&g_(y.normalMap.format),metalnessMap:Bt,roughnessMap:Je,anisotropy:_t,anisotropyMap:Z,clearcoat:ue,clearcoatMap:Q,clearcoatNormalMap:ie,clearcoatRoughnessMap:ce,dispersion:Rt,iridescence:T,iridescenceMap:q,iridescenceThicknessMap:$,sheen:_,sheenColorMap:xe,sheenRoughnessMap:ye,specularMap:oe,specularColorMap:re,specularIntensityMap:Ue,transmission:B,transmissionMap:ke,thicknessMap:rt,gradientMap:L,opaque:y.transparent===!1&&y.blending===ur&&y.alphaToCoverage===!1,alphaMap:se,alphaTest:Y,alphaHash:ve,combine:y.combine,mapUv:At&&g(y.map.channel),aoMapUv:St&&g(y.aoMap.channel),lightMapUv:Ze&&g(y.lightMap.channel),bumpMapUv:Ot&&g(y.bumpMap.channel),normalMapUv:Ct&&g(y.normalMap.channel),displacementMapUv:yn&&g(y.displacementMap.channel),emissiveMapUv:N&&g(y.emissiveMap.channel),metalnessMapUv:Bt&&g(y.metalnessMap.channel),roughnessMapUv:Je&&g(y.roughnessMap.channel),anisotropyMapUv:Z&&g(y.anisotropyMap.channel),clearcoatMapUv:Q&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:$&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(y.sheenRoughnessMap.channel),specularMapUv:oe&&g(y.specularMap.channel),specularColorMapUv:re&&g(y.specularColorMap.channel),specularIntensityMapUv:Ue&&g(y.specularIntensityMap.channel),transmissionMapUv:ke&&g(y.transmissionMap.channel),thicknessMapUv:rt&&g(y.thicknessMap.channel),alphaMapUv:se&&g(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ct||_t),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!O.attributes.uv&&(At||se),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Ct===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Le,skinning:U.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:tt,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:j,decodeVideoTexture:At&&y.map.isVideoTexture===!0&&Xe.getTransfer(y.map.colorSpace)===je,decodeVideoTextureEmissive:N&&y.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(y.emissiveMap.colorSpace)===je,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===pn,flipSided:y.side===Yt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:le&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&y.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return we.vertexUv1s=l.has(1),we.vertexUv2s=l.has(2),we.vertexUv3s=l.has(3),l.clear(),we}function p(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let D in y.defines)A.push(D),A.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(m(A,y),M(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function m(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function M(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),y.push(a.mask)}function w(y){let A=f[y.type],D;if(A){let R=ui[A];D=Tn.clone(R.uniforms)}else D=y.uniforms;return D}function b(y,A){let D=h.get(A);return D!==void 0?++D.usedTimes:(D=new p_(n,A,y,r),c.push(D),h.set(A,D)),D}function C(y){if(--y.usedTimes===0){let A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function P(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:w,acquireProgram:b,releaseProgram:C,releaseShaderCache:E,programs:c,dispose:P}}function v_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function __(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Cf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Rf(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,v,p,m){let M=n[e];return M===void 0?(M={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:p,group:m},n[e]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=g,M.materialVariant=a(u),M.groupOrder=v,M.renderOrder=u.renderOrder,M.z=p,M.group=m),e++,M}function l(u,f,g,v,p,m){let M=o(u,f,g,v,p,m);g.transmission>0?i.push(M):g.transparent===!0?r.push(M):t.push(M)}function c(u,f,g,v,p,m){let M=o(u,f,g,v,p,m);g.transmission>0?i.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function h(u,f){t.length>1&&t.sort(u||__),i.length>1&&i.sort(f||Cf),r.length>1&&r.sort(f||Cf)}function d(){for(let u=e,f=n.length;u<f;u++){let g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function y_(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new Rf,n.set(i,[a])):r>=s.length?(a=new Rf,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function M_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ee};break;case"SpotLight":t={position:new I,direction:new I,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function S_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var b_=0;function w_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function E_(n){let e=new M_,t=S_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);let r=new I,s=new ct,a=new ct;function o(c){let h=0,d=0,u=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,M=0,w=0,b=0,C=0,E=0,P=0;c.sort(w_);for(let A=0,D=c.length;A<D;A++){let R=c[A],U=R.color,W=R.intensity,X=R.distance,O=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===$i?O=R.shadow.map.texture:O=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=U.r*W,d+=U.g*W,u+=U.b*W;else if(R.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(R.sh.coefficients[V],W);P++}else if(R.isDirectionalLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let G=R.shadow,ee=t.get(R);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,i.directionalShadow[f]=ee,i.directionalShadowMap[f]=O,i.directionalShadowMatrix[f]=R.shadow.matrix,M++}i.directional[f]=V,f++}else if(R.isSpotLight){let V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(U).multiplyScalar(W),V.distance=X,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,i.spot[v]=V;let G=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,G.updateMatrices(R),R.castShadow&&E++),i.spotLightMatrix[v]=G.matrix,R.castShadow){let ee=t.get(R);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,i.spotShadow[v]=ee,i.spotShadowMap[v]=O,b++}v++}else if(R.isRectAreaLight){let V=e.get(R);V.color.copy(U).multiplyScalar(W),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=V,p++}else if(R.isPointLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){let G=R.shadow,ee=t.get(R);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,ee.shadowCameraNear=G.camera.near,ee.shadowCameraFar=G.camera.far,i.pointShadow[g]=ee,i.pointShadowMap[g]=O,i.pointShadowMatrix[g]=R.shadow.matrix,w++}i.point[g]=V,g++}else if(R.isHemisphereLight){let V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(W),V.groundColor.copy(R.groundColor).multiplyScalar(W),i.hemi[m]=V,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let y=i.hash;(y.directionalLength!==f||y.pointLength!==g||y.spotLength!==v||y.rectAreaLength!==p||y.hemiLength!==m||y.numDirectionalShadows!==M||y.numPointShadows!==w||y.numSpotShadows!==b||y.numSpotMaps!==C||y.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+C-E,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=P,y.directionalLength=f,y.pointLength=g,y.spotLength=v,y.rectAreaLength=p,y.hemiLength=m,y.numDirectionalShadows=M,y.numPointShadows=w,y.numSpotShadows=b,y.numSpotMaps=C,y.numLightProbes=P,i.version=b_++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0,p=h.matrixWorldInverse;for(let m=0,M=c.length;m<M;m++){let w=c[m];if(w.isDirectionalLight){let b=i.directional[d];b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),d++}else if(w.isSpotLight){let b=i.spot[f];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),f++}else if(w.isRectAreaLight){let b=i.rectArea[g];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),a.identity(),s.copy(w.matrixWorld),s.premultiply(p),a.extractRotation(s),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){let b=i.point[u];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),u++}else if(w.isHemisphereLight){let b=i.hemi[v];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:i}}function Pf(n){let e=new E_(n),t=[],i=[],r=[];function s(u){d.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function T_(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new Pf(n),e.set(r,[o])):s>=a.length?(o=new Pf(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var A_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C_=`uniform sampler2D shadow_pass;
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
}`,R_=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],P_=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],If=new ct,Pa=new I,qu=new I;function I_(n,e,t){let i=new ls,r=new he,s=new he,a=new gt,o=new tl,l=new nl,c={},h=t.maxTextureSize,d={[Ti]:Yt,[Yt]:Ti,[pn]:pn},u=new Ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:A_,fragmentShader:C_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Qe;g.setAttribute("position",new De(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new it(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pa;let m=this.type;this.render=function(E,P,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===Td&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=pa);let A=n.getRenderTarget(),D=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),U=n.state;U.setBlending(mn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let W=m!==this.type;W&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=E.length;X<O;X++){let V=E[X],G=V.shadow;if(G===void 0){Re("WebGLShadowMap:",V,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);let ee=G.getFrameExtents();r.multiply(ee),s.copy(G.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ee.x),r.x=s.x*ee.x,G.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ee.y),r.y=s.y*ee.y,G.mapSize.y=s.y));let ne=n.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ne,G.map===null||W===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===fs){if(V.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new xt(r.x,r.y,{format:$i,type:wt,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),G.map.texture.name=V.name+".shadowMap",G.map.depthTexture=new Ai(r.x,r.y,In),G.map.depthTexture.name=V.name+".shadowMapDepth",G.map.depthTexture.format=ti,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Nt,G.map.depthTexture.magFilter=Nt}else V.isPointLight?(G.map=new cc(r.x),G.map.depthTexture=new Qo(r.x,Xn)):(G.map=new xt(r.x,r.y),G.map.depthTexture=new Ai(r.x,r.y,Xn)),G.map.depthTexture.name=V.name+".shadowMap",G.map.depthTexture.format=ti,this.type===pa?(G.map.depthTexture.compareFunction=ne?rc:ic,G.map.depthTexture.minFilter=Ut,G.map.depthTexture.magFilter=Ut):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Nt,G.map.depthTexture.magFilter=Nt);G.camera.updateProjectionMatrix()}let fe=G.map.isWebGLCubeRenderTarget?6:1;for(let Se=0;Se<fe;Se++){if(G.map.isWebGLCubeRenderTarget)n.setRenderTarget(G.map,Se),n.clear();else{Se===0&&(n.setRenderTarget(G.map),n.clear());let Ae=G.getViewport(Se);a.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),U.viewport(a)}if(V.isPointLight){let Ae=G.camera,tt=G.matrix,ut=V.distance||Ae.far;ut!==Ae.far&&(Ae.far=ut,Ae.updateProjectionMatrix()),Pa.setFromMatrixPosition(V.matrixWorld),Ae.position.copy(Pa),qu.copy(Ae.position),qu.add(R_[Se]),Ae.up.copy(P_[Se]),Ae.lookAt(qu),Ae.updateMatrixWorld(),tt.makeTranslation(-Pa.x,-Pa.y,-Pa.z),If.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),G._frustum.setFromProjectionMatrix(If,Ae.coordinateSystem,Ae.reversedDepth)}else G.updateMatrices(V);i=G.getFrustum(),b(P,y,G.camera,V,this.type)}G.isPointLightShadow!==!0&&this.type===fs&&M(G,y),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(A,D,R)};function M(E,P){let y=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new xt(r.x,r.y,{format:$i,type:wt})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,y,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,y,f,v,null)}function w(E,P,y,A){let D=null,R=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)D=R;else if(D=y.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let U=D.uuid,W=P.uuid,X=c[U];X===void 0&&(X={},c[U]=X);let O=X[W];O===void 0&&(O=D.clone(),X[W]=O,P.addEventListener("dispose",C)),D=O}if(D.visible=P.visible,D.wireframe=P.wireframe,A===fs?D.side=P.shadowSide!==null?P.shadowSide:P.side:D.side=P.shadowSide!==null?P.shadowSide:d[P.side],D.alphaMap=P.alphaMap,D.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,D.map=P.map,D.clipShadows=P.clipShadows,D.clippingPlanes=P.clippingPlanes,D.clipIntersection=P.clipIntersection,D.displacementMap=P.displacementMap,D.displacementScale=P.displacementScale,D.displacementBias=P.displacementBias,D.wireframeLinewidth=P.wireframeLinewidth,D.linewidth=P.linewidth,y.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let U=n.properties.get(D);U.light=y}return D}function b(E,P,y,A,D){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===fs)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let W=e.update(E),X=E.material;if(Array.isArray(X)){let O=W.groups;for(let V=0,G=O.length;V<G;V++){let ee=O[V],ne=X[ee.materialIndex];if(ne&&ne.visible){let fe=w(E,ne,A,D);E.onBeforeShadow(n,E,P,y,W,fe,ee),n.renderBufferDirect(y,null,W,fe,E,ee),E.onAfterShadow(n,E,P,y,W,fe,ee)}}}else if(X.visible){let O=w(E,X,A,D);E.onBeforeShadow(n,E,P,y,W,O,null),n.renderBufferDirect(y,null,W,O,E,null),E.onAfterShadow(n,E,P,y,W,O,null)}}let U=E.children;for(let W=0,X=U.length;W<X;W++)b(U[W],P,y,A,D)}function C(E){E.target.removeEventListener("dispose",C);for(let y in c){let A=c[y],D=E.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function D_(n,e){function t(){let L=!1,se=new gt,Y=null,ve=new gt(0,0,0,0);return{setMask:function(le){Y!==le&&!L&&(n.colorMask(le,le,le,le),Y=le)},setLocked:function(le){L=le},setClear:function(le,j,we,ze,It){It===!0&&(le*=ze,j*=ze,we*=ze),se.set(le,j,we,ze),ve.equals(se)===!1&&(n.clearColor(le,j,we,ze),ve.copy(se))},reset:function(){L=!1,Y=null,ve.set(-1,0,0,0)}}}function i(){let L=!1,se=!1,Y=null,ve=null,le=null;return{setReversed:function(j){if(se!==j){let we=e.get("EXT_clip_control");j?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),se=j;let ze=le;le=null,this.setClear(ze)}},getReversed:function(){return se},setTest:function(j){j?ae(n.DEPTH_TEST):Le(n.DEPTH_TEST)},setMask:function(j){Y!==j&&!L&&(n.depthMask(j),Y=j)},setFunc:function(j){if(se&&(j=af[j]),ve!==j){switch(j){case Lo:n.depthFunc(n.NEVER);break;case No:n.depthFunc(n.ALWAYS);break;case Fo:n.depthFunc(n.LESS);break;case hr:n.depthFunc(n.LEQUAL);break;case Uo:n.depthFunc(n.EQUAL);break;case Oo:n.depthFunc(n.GEQUAL);break;case Bo:n.depthFunc(n.GREATER);break;case zo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=j}},setLocked:function(j){L=j},setClear:function(j){le!==j&&(le=j,se&&(j=1-j),n.clearDepth(j))},reset:function(){L=!1,Y=null,ve=null,le=null,se=!1}}}function r(){let L=!1,se=null,Y=null,ve=null,le=null,j=null,we=null,ze=null,It=null;return{setTest:function(dt){L||(dt?ae(n.STENCIL_TEST):Le(n.STENCIL_TEST))},setMask:function(dt){se!==dt&&!L&&(n.stencilMask(dt),se=dt)},setFunc:function(dt,vi,Jn){(Y!==dt||ve!==vi||le!==Jn)&&(n.stencilFunc(dt,vi,Jn),Y=dt,ve=vi,le=Jn)},setOp:function(dt,vi,Jn){(j!==dt||we!==vi||ze!==Jn)&&(n.stencilOp(dt,vi,Jn),j=dt,we=vi,ze=Jn)},setLocked:function(dt){L=dt},setClear:function(dt){It!==dt&&(n.clearStencil(dt),It=dt)},reset:function(){L=!1,se=null,Y=null,ve=null,le=null,j=null,we=null,ze=null,It=null}}}let s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],v=null,p=!1,m=null,M=null,w=null,b=null,C=null,E=null,P=null,y=new Ee(0,0,0),A=0,D=!1,R=null,U=null,W=null,X=null,O=null,V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,ee=0,ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ne)[1]),G=ee>=1):ne.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),G=ee>=2);let fe=null,Se={},Ae=n.getParameter(n.SCISSOR_BOX),tt=n.getParameter(n.VIEWPORT),ut=new gt().fromArray(Ae),Ve=new gt().fromArray(tt);function J(L,se,Y,ve){let le=new Uint8Array(4),j=n.createTexture();n.bindTexture(L,j),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<Y;we++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(se+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return j}let ge={};ge[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),ge[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ge[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(n.DEPTH_TEST),a.setFunc(hr),Ot(!1),Ct(_u),ae(n.CULL_FACE),St(mn);function ae(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function Le(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function Be(L,se){return u[L]!==se?(n.bindFramebuffer(L,se),u[L]=se,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=se),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=se),!0):!1}function Ne(L,se){let Y=g,ve=!1;if(L){Y=f.get(se),Y===void 0&&(Y=[],f.set(se,Y));let le=L.textures;if(Y.length!==le.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let j=0,we=le.length;j<we;j++)Y[j]=n.COLOR_ATTACHMENT0+j;Y.length=le.length,ve=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,ve=!0);ve&&n.drawBuffers(Y)}function At(L){return v!==L?(n.useProgram(L),v=L,!0):!1}let $e={[ki]:n.FUNC_ADD,[Cd]:n.FUNC_SUBTRACT,[Rd]:n.FUNC_REVERSE_SUBTRACT};$e[Pd]=n.MIN,$e[Id]=n.MAX;let ht={[Dd]:n.ZERO,[Ld]:n.ONE,[Nd]:n.SRC_COLOR,[Io]:n.SRC_ALPHA,[Hd]:n.SRC_ALPHA_SATURATE,[Bd]:n.DST_COLOR,[Ud]:n.DST_ALPHA,[Fd]:n.ONE_MINUS_SRC_COLOR,[Do]:n.ONE_MINUS_SRC_ALPHA,[zd]:n.ONE_MINUS_DST_COLOR,[Od]:n.ONE_MINUS_DST_ALPHA,[Vd]:n.CONSTANT_COLOR,[kd]:n.ONE_MINUS_CONSTANT_COLOR,[Gd]:n.CONSTANT_ALPHA,[Wd]:n.ONE_MINUS_CONSTANT_ALPHA};function St(L,se,Y,ve,le,j,we,ze,It,dt){if(L===mn){p===!0&&(Le(n.BLEND),p=!1);return}if(p===!1&&(ae(n.BLEND),p=!0),L!==Ad){if(L!==m||dt!==D){if((M!==ki||C!==ki)&&(n.blendEquation(n.FUNC_ADD),M=ki,C=ki),dt)switch(L){case ur:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case st:n.blendFunc(n.ONE,n.ONE);break;case yu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ie("WebGLState: Invalid blending: ",L);break}else switch(L){case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case st:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case yu:Ie("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mu:Ie("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ie("WebGLState: Invalid blending: ",L);break}w=null,b=null,E=null,P=null,y.set(0,0,0),A=0,m=L,D=dt}return}le=le||se,j=j||Y,we=we||ve,(se!==M||le!==C)&&(n.blendEquationSeparate($e[se],$e[le]),M=se,C=le),(Y!==w||ve!==b||j!==E||we!==P)&&(n.blendFuncSeparate(ht[Y],ht[ve],ht[j],ht[we]),w=Y,b=ve,E=j,P=we),(ze.equals(y)===!1||It!==A)&&(n.blendColor(ze.r,ze.g,ze.b,It),y.copy(ze),A=It),m=L,D=!1}function Ze(L,se){L.side===pn?Le(n.CULL_FACE):ae(n.CULL_FACE);let Y=L.side===Yt;se&&(Y=!Y),Ot(Y),L.blending===ur&&L.transparent===!1?St(mn):St(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);let ve=L.stencilWrite;o.setTest(ve),ve&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),N(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):Le(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(L){R!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),R=L)}function Ct(L){L!==wd?(ae(n.CULL_FACE),L!==U&&(L===_u?n.cullFace(n.BACK):L===Ed?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Le(n.CULL_FACE),U=L}function yn(L){L!==W&&(G&&n.lineWidth(L),W=L)}function N(L,se,Y){L?(ae(n.POLYGON_OFFSET_FILL),(X!==se||O!==Y)&&(X=se,O=Y,a.getReversed()&&(se=-se),n.polygonOffset(se,Y))):Le(n.POLYGON_OFFSET_FILL)}function Bt(L){L?ae(n.SCISSOR_TEST):Le(n.SCISSOR_TEST)}function Je(L){L===void 0&&(L=n.TEXTURE0+V-1),fe!==L&&(n.activeTexture(L),fe=L)}function _t(L,se,Y){Y===void 0&&(fe===null?Y=n.TEXTURE0+V-1:Y=fe);let ve=Se[Y];ve===void 0&&(ve={type:void 0,texture:void 0},Se[Y]=ve),(ve.type!==L||ve.texture!==se)&&(fe!==Y&&(n.activeTexture(Y),fe=Y),n.bindTexture(L,se||ge[L]),ve.type=L,ve.texture=se)}function ue(){let L=Se[fe];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Rt(){try{n.compressedTexImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function _(){try{n.texSubImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function B(){try{n.texSubImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function Q(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function ie(){try{n.texStorage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function ce(){try{n.texStorage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function q(){try{n.texImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function $(){try{n.texImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function xe(L){return d[L]!==void 0?d[L]:n.getParameter(L)}function ye(L,se){d[L]!==se&&(n.pixelStorei(L,se),d[L]=se)}function oe(L){ut.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ut.copy(L))}function re(L){Ve.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ve.copy(L))}function Ue(L,se){let Y=c.get(se);Y===void 0&&(Y=new WeakMap,c.set(se,Y));let ve=Y.get(L);ve===void 0&&(ve=n.getUniformBlockIndex(se,L.name),Y.set(L,ve))}function ke(L,se){let ve=c.get(se).get(L);l.get(se)!==ve&&(n.uniformBlockBinding(se,ve,L.__bindingPointIndex),l.set(se,ve))}function rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},fe=null,Se={},u={},f=new WeakMap,g=[],v=null,p=!1,m=null,M=null,w=null,b=null,C=null,E=null,P=null,y=new Ee(0,0,0),A=0,D=!1,R=null,U=null,W=null,X=null,O=null,ut.set(0,0,n.canvas.width,n.canvas.height),Ve.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ae,disable:Le,bindFramebuffer:Be,drawBuffers:Ne,useProgram:At,setBlending:St,setMaterial:Ze,setFlipSided:Ot,setCullFace:Ct,setLineWidth:yn,setPolygonOffset:N,setScissorTest:Bt,activeTexture:Je,bindTexture:_t,unbindTexture:ue,compressedTexImage2D:Rt,compressedTexImage3D:T,texImage2D:q,texImage3D:$,pixelStorei:ye,getParameter:xe,updateUBOMapping:Ue,uniformBlockBinding:ke,texStorage2D:ie,texStorage3D:ce,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:Z,compressedTexSubImage3D:Q,scissor:oe,viewport:re,reset:rt}}function L_(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,_){return g?new OffscreenCanvas(T,_):Zs("canvas")}function p(T,_,B){let Z=1,Q=Rt(T);if((Q.width>B||Q.height>B)&&(Z=B/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ie=Math.floor(Z*Q.width),ce=Math.floor(Z*Q.height);u===void 0&&(u=v(ie,ce));let q=_?v(ie,ce):u;return q.width=ie,q.height=ce,q.getContext("2d").drawImage(T,0,0,ie,ce),Re("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ie+"x"+ce+")."),q}else return"data"in T&&Re("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function M(T){n.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,_,B,Z,Q,ie=!1){if(T!==null){if(n[T]!==void 0)return n[T];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ce;Z&&(ce=e.get("EXT_texture_norm16"),ce||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=_;if(_===n.RED&&(B===n.FLOAT&&(q=n.R32F),B===n.HALF_FLOAT&&(q=n.R16F),B===n.UNSIGNED_BYTE&&(q=n.R8),B===n.UNSIGNED_SHORT&&ce&&(q=ce.R16_EXT),B===n.SHORT&&ce&&(q=ce.R16_SNORM_EXT)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.R8UI),B===n.UNSIGNED_SHORT&&(q=n.R16UI),B===n.UNSIGNED_INT&&(q=n.R32UI),B===n.BYTE&&(q=n.R8I),B===n.SHORT&&(q=n.R16I),B===n.INT&&(q=n.R32I)),_===n.RG&&(B===n.FLOAT&&(q=n.RG32F),B===n.HALF_FLOAT&&(q=n.RG16F),B===n.UNSIGNED_BYTE&&(q=n.RG8),B===n.UNSIGNED_SHORT&&ce&&(q=ce.RG16_EXT),B===n.SHORT&&ce&&(q=ce.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RG8UI),B===n.UNSIGNED_SHORT&&(q=n.RG16UI),B===n.UNSIGNED_INT&&(q=n.RG32UI),B===n.BYTE&&(q=n.RG8I),B===n.SHORT&&(q=n.RG16I),B===n.INT&&(q=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGB8UI),B===n.UNSIGNED_SHORT&&(q=n.RGB16UI),B===n.UNSIGNED_INT&&(q=n.RGB32UI),B===n.BYTE&&(q=n.RGB8I),B===n.SHORT&&(q=n.RGB16I),B===n.INT&&(q=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),B===n.UNSIGNED_INT&&(q=n.RGBA32UI),B===n.BYTE&&(q=n.RGBA8I),B===n.SHORT&&(q=n.RGBA16I),B===n.INT&&(q=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_SHORT&&ce&&(q=ce.RGB16_EXT),B===n.SHORT&&ce&&(q=ce.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),_===n.RGBA){let $=ie?Ys:Xe.getTransfer(Q);B===n.FLOAT&&(q=n.RGBA32F),B===n.HALF_FLOAT&&(q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(q=$===je?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ce&&(q=ce.RGBA16_EXT),B===n.SHORT&&ce&&(q=ce.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function C(T,_){let B;return T?_===null||_===Xn||_===ms?B=n.DEPTH24_STENCIL8:_===In?B=n.DEPTH32F_STENCIL8:_===ps&&(B=n.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Xn||_===ms?B=n.DEPTH_COMPONENT24:_===In?B=n.DEPTH_COMPONENT32F:_===ps&&(B=n.DEPTH_COMPONENT16),B}function E(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Nt&&T.minFilter!==Ut?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function P(T){let _=T.target;_.removeEventListener("dispose",P),A(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function y(T){let _=T.target;_.removeEventListener("dispose",y),R(_)}function A(T){let _=i.get(T);if(_.__webglInit===void 0)return;let B=T.source,Z=f.get(B);if(Z){let Q=Z[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&D(T),Object.keys(Z).length===0&&f.delete(B)}i.remove(T)}function D(T){let _=i.get(T);n.deleteTexture(_.__webglTexture);let B=T.source,Z=f.get(B);delete Z[_.__cacheKey],a.memory.textures--}function R(T){let _=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let Q=0;Q<_.__webglFramebuffer[Z].length;Q++)n.deleteFramebuffer(_.__webglFramebuffer[Z][Q]);else n.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)n.deleteFramebuffer(_.__webglFramebuffer[Z]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=T.textures;for(let Z=0,Q=B.length;Z<Q;Z++){let ie=i.get(B[Z]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(B[Z])}i.remove(T)}let U=0;function W(){U=0}function X(){return U}function O(T){U=T}function V(){let T=U;return T>=r.maxTextures&&Re("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),U+=1,T}function G(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function ee(T,_){let B=i.get(T);if(T.isVideoTexture&&_t(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let Z=T.image;if(Z===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(B,T,_);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function ne(T,_){let B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Le(B,T,_);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function fe(T,_){let B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Le(B,T,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function Se(T,_){let B=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&B.__version!==T.version){Be(B,T,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}let Ae={[Ho]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[Vo]:n.MIRRORED_REPEAT},tt={[Nt]:n.NEAREST,[Yd]:n.NEAREST_MIPMAP_NEAREST,[Sa]:n.NEAREST_MIPMAP_LINEAR,[Ut]:n.LINEAR,[_l]:n.LINEAR_MIPMAP_NEAREST,[Yi]:n.LINEAR_MIPMAP_LINEAR},ut={[Jd]:n.NEVER,[tf]:n.ALWAYS,[Kd]:n.LESS,[ic]:n.LEQUAL,[jd]:n.EQUAL,[rc]:n.GEQUAL,[Qd]:n.GREATER,[ef]:n.NOTEQUAL};function Ve(T,_){if(_.type===In&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ut||_.magFilter===_l||_.magFilter===Sa||_.magFilter===Yi||_.minFilter===Ut||_.minFilter===_l||_.minFilter===Sa||_.minFilter===Yi)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Ae[_.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Ae[_.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Ae[_.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,tt[_.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,tt[_.minFilter]),_.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ut[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Nt||_.minFilter!==Sa&&_.minFilter!==Yi||_.type===In&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function J(T,_){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",P));let Z=_.source,Q=f.get(Z);Q===void 0&&(Q={},f.set(Z,Q));let ie=G(_);if(ie!==T.__cacheKey){Q[ie]===void 0&&(Q[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[ie].usedTimes++;let ce=Q[T.__cacheKey];ce!==void 0&&(Q[T.__cacheKey].usedTimes--,ce.usedTimes===0&&D(_)),T.__cacheKey=ie,T.__webglTexture=Q[ie].texture}return B}function ge(T,_,B){return Math.floor(Math.floor(T/B)/_)}function ae(T,_,B,Z){let ie=T.updateRanges;if(ie.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,Z,_.data);else{ie.sort((ye,oe)=>ye.start-oe.start);let ce=0;for(let ye=1;ye<ie.length;ye++){let oe=ie[ce],re=ie[ye],Ue=oe.start+oe.count,ke=ge(re.start,_.width,4),rt=ge(oe.start,_.width,4);re.start<=Ue+1&&ke===rt&&ge(re.start+re.count-1,_.width,4)===ke?oe.count=Math.max(oe.count,re.start+re.count-oe.start):(++ce,ie[ce]=re)}ie.length=ce+1;let q=t.getParameter(n.UNPACK_ROW_LENGTH),$=t.getParameter(n.UNPACK_SKIP_PIXELS),xe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ye=0,oe=ie.length;ye<oe;ye++){let re=ie[ye],Ue=Math.floor(re.start/4),ke=Math.ceil(re.count/4),rt=Ue%_.width,L=Math.floor(Ue/_.width),se=ke,Y=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,rt),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,rt,L,se,Y,B,Z,_.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,$),t.pixelStorei(n.UNPACK_SKIP_ROWS,xe)}}function Le(T,_,B){let Z=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Z=n.TEXTURE_3D);let Q=J(T,_),ie=_.source;t.bindTexture(Z,T.__webglTexture,n.TEXTURE0+B);let ce=i.get(ie);if(ie.version!==ce.__version||Q===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let Y=Xe.getPrimaries(Xe.workingColorSpace),ve=_.colorSpace===Ci?null:Xe.getPrimaries(_.colorSpace),le=_.colorSpace===Ci||Y===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let $=p(_.image,!1,r.maxTextureSize);$=ue(_,$);let xe=s.convert(_.format,_.colorSpace),ye=s.convert(_.type),oe=b(_.internalFormat,xe,ye,_.normalized,_.colorSpace,_.isVideoTexture);Ve(Z,_);let re,Ue=_.mipmaps,ke=_.isVideoTexture!==!0,rt=ce.__version===void 0||Q===!0,L=ie.dataReady,se=E(_,$);if(_.isDepthTexture)oe=C(_.format===Zi,_.type),rt&&(ke?t.texStorage2D(n.TEXTURE_2D,1,oe,$.width,$.height):t.texImage2D(n.TEXTURE_2D,0,oe,$.width,$.height,0,xe,ye,null));else if(_.isDataTexture)if(Ue.length>0){ke&&rt&&t.texStorage2D(n.TEXTURE_2D,se,oe,Ue[0].width,Ue[0].height);for(let Y=0,ve=Ue.length;Y<ve;Y++)re=Ue[Y],ke?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,re.width,re.height,xe,ye,re.data):t.texImage2D(n.TEXTURE_2D,Y,oe,re.width,re.height,0,xe,ye,re.data);_.generateMipmaps=!1}else ke?(rt&&t.texStorage2D(n.TEXTURE_2D,se,oe,$.width,$.height),L&&ae(_,$,xe,ye)):t.texImage2D(n.TEXTURE_2D,0,oe,$.width,$.height,0,xe,ye,$.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){ke&&rt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,oe,Ue[0].width,Ue[0].height,$.depth);for(let Y=0,ve=Ue.length;Y<ve;Y++)if(re=Ue[Y],_.format!==Dn)if(xe!==null)if(ke){if(L)if(_.layerUpdates.size>0){let le=Fu(re.width,re.height,_.format,_.type);for(let j of _.layerUpdates){let we=re.data.subarray(j*le/re.data.BYTES_PER_ELEMENT,(j+1)*le/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,j,re.width,re.height,1,xe,we)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,re.width,re.height,$.depth,xe,re.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,oe,re.width,re.height,$.depth,0,re.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,re.width,re.height,$.depth,xe,ye,re.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Y,oe,re.width,re.height,$.depth,0,xe,ye,re.data)}else{ke&&rt&&t.texStorage2D(n.TEXTURE_2D,se,oe,Ue[0].width,Ue[0].height);for(let Y=0,ve=Ue.length;Y<ve;Y++)re=Ue[Y],_.format!==Dn?xe!==null?ke?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,re.width,re.height,xe,re.data):t.compressedTexImage2D(n.TEXTURE_2D,Y,oe,re.width,re.height,0,re.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,re.width,re.height,xe,ye,re.data):t.texImage2D(n.TEXTURE_2D,Y,oe,re.width,re.height,0,xe,ye,re.data)}else if(_.isDataArrayTexture)if(ke){if(rt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,oe,$.width,$.height,$.depth),L)if(_.layerUpdates.size>0){let Y=Fu($.width,$.height,_.format,_.type);for(let ve of _.layerUpdates){let le=$.data.subarray(ve*Y/$.data.BYTES_PER_ELEMENT,(ve+1)*Y/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ve,$.width,$.height,1,xe,ye,le)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,xe,ye,$.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,oe,$.width,$.height,$.depth,0,xe,ye,$.data);else if(_.isData3DTexture)ke?(rt&&t.texStorage3D(n.TEXTURE_3D,se,oe,$.width,$.height,$.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,xe,ye,$.data)):t.texImage3D(n.TEXTURE_3D,0,oe,$.width,$.height,$.depth,0,xe,ye,$.data);else if(_.isFramebufferTexture){if(rt)if(ke)t.texStorage2D(n.TEXTURE_2D,se,oe,$.width,$.height);else{let Y=$.width,ve=$.height;for(let le=0;le<se;le++)t.texImage2D(n.TEXTURE_2D,le,oe,Y,ve,0,xe,ye,null),Y>>=1,ve>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let Y=n.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),$.parentNode!==Y){Y.appendChild($),d.add(_),Y.onpaint=ze=>{let It=ze.changedElements;for(let dt of d)It.includes(dt.image)&&(dt.needsUpdate=!0)},Y.requestPaint();return}let ve=0,le=n.RGBA,j=n.RGBA,we=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,ve,le,j,we,$),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(ke&&rt){let Y=Rt(Ue[0]);t.texStorage2D(n.TEXTURE_2D,se,oe,Y.width,Y.height)}for(let Y=0,ve=Ue.length;Y<ve;Y++)re=Ue[Y],ke?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,xe,ye,re):t.texImage2D(n.TEXTURE_2D,Y,oe,xe,ye,re);_.generateMipmaps=!1}else if(ke){if(rt){let Y=Rt($);t.texStorage2D(n.TEXTURE_2D,se,oe,Y.width,Y.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,xe,ye,$)}else t.texImage2D(n.TEXTURE_2D,0,oe,xe,ye,$);m(_)&&M(Z),ce.__version=ie.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Be(T,_,B){if(_.image.length!==6)return;let Z=J(T,_),Q=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+B);let ie=i.get(Q);if(Q.version!==ie.__version||Z===!0){t.activeTexture(n.TEXTURE0+B);let ce=Xe.getPrimaries(Xe.workingColorSpace),q=_.colorSpace===Ci?null:Xe.getPrimaries(_.colorSpace),$=_.colorSpace===Ci||ce===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let xe=_.isCompressedTexture||_.image[0].isCompressedTexture,ye=_.image[0]&&_.image[0].isDataTexture,oe=[];for(let j=0;j<6;j++)!xe&&!ye?oe[j]=p(_.image[j],!0,r.maxCubemapSize):oe[j]=ye?_.image[j].image:_.image[j],oe[j]=ue(_,oe[j]);let re=oe[0],Ue=s.convert(_.format,_.colorSpace),ke=s.convert(_.type),rt=b(_.internalFormat,Ue,ke,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,se=ie.__version===void 0||Z===!0,Y=Q.dataReady,ve=E(_,re);Ve(n.TEXTURE_CUBE_MAP,_);let le;if(xe){L&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,rt,re.width,re.height);for(let j=0;j<6;j++){le=oe[j].mipmaps;for(let we=0;we<le.length;we++){let ze=le[we];_.format!==Dn?Ue!==null?L?Y&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,ze.width,ze.height,Ue,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,rt,ze.width,ze.height,0,ze.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,ze.width,ze.height,Ue,ke,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,rt,ze.width,ze.height,0,Ue,ke,ze.data)}}}else{if(le=_.mipmaps,L&&se){le.length>0&&ve++;let j=Rt(oe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,rt,j.width,j.height)}for(let j=0;j<6;j++)if(ye){L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,oe[j].width,oe[j].height,Ue,ke,oe[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,rt,oe[j].width,oe[j].height,0,Ue,ke,oe[j].data);for(let we=0;we<le.length;we++){let It=le[we].image[j].image;L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,It.width,It.height,Ue,ke,It.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,rt,It.width,It.height,0,Ue,ke,It.data)}}else{L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ue,ke,oe[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,rt,Ue,ke,oe[j]);for(let we=0;we<le.length;we++){let ze=le[we];L?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,Ue,ke,ze.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,rt,Ue,ke,ze.image[j])}}}m(_)&&M(n.TEXTURE_CUBE_MAP),ie.__version=Q.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ne(T,_,B,Z,Q,ie){let ce=s.convert(B.format,B.colorSpace),q=s.convert(B.type),$=b(B.internalFormat,ce,q,B.normalized,B.colorSpace),xe=i.get(_),ye=i.get(B);if(ye.__renderTarget=_,!xe.__hasExternalTextures){let oe=Math.max(1,_.width>>ie),re=Math.max(1,_.height>>ie);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,ie,$,oe,re,_.depth,0,ce,q,null):t.texImage2D(Q,ie,$,oe,re,0,ce,q,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Je(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Q,ye.__webglTexture,0,Bt(_)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,Q,ye.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function At(T,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,T),_.depthBuffer){let Z=_.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,ie=C(_.stencilBuffer,Q),ce=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Je(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Bt(_),ie,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt(_),ie,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ie,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,T)}else{let Z=_.textures;for(let Q=0;Q<Z.length;Q++){let ie=Z[Q],ce=s.convert(ie.format,ie.colorSpace),q=s.convert(ie.type),$=b(ie.internalFormat,ce,q,ie.normalized,ie.colorSpace);Je(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Bt(_),$,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt(_),$,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,$,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $e(T,_,B){let Z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=i.get(_.depthTexture);if(Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),Ve(n.TEXTURE_CUBE_MAP,_.depthTexture);let xe=s.convert(_.depthTexture.format),ye=s.convert(_.depthTexture.type),oe;_.depthTexture.format===ti?oe=n.DEPTH_COMPONENT24:_.depthTexture.format===Zi&&(oe=n.DEPTH24_STENCIL8);for(let re=0;re<6;re++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,oe,_.width,_.height,0,xe,ye,null)}}else ee(_.depthTexture,0);let ie=Q.__webglTexture,ce=Bt(_),q=Z?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,$=_.depthTexture.format===Zi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===ti)Je(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,q,ie,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,$,q,ie,0);else if(_.depthTexture.format===Zi)Je(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,q,ie,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,$,q,ie,0);else throw new Error("Unknown depthTexture format")}function ht(T){let _=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let Z=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Z){let Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=Z}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let Z=0;Z<6;Z++)$e(_.__webglFramebuffer[Z],T,Z);else{let Z=T.texture.mipmaps;Z&&Z.length>0?$e(_.__webglFramebuffer[0],T,0):$e(_.__webglFramebuffer,T,0)}else if(B){_.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[Z]),_.__webglDepthbuffer[Z]===void 0)_.__webglDepthbuffer[Z]=n.createRenderbuffer(),At(_.__webglDepthbuffer[Z],T,!1);else{let Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,ie)}}else{let Z=T.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),At(_.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,ie)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function St(T,_,B){let Z=i.get(T);_!==void 0&&Ne(Z.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&ht(T)}function Ze(T){let _=T.texture,B=i.get(T),Z=i.get(_);T.addEventListener("dispose",y);let Q=T.textures,ie=T.isWebGLCubeRenderTarget===!0,ce=Q.length>1;if(ce||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=_.version,a.memory.textures++),ie){B.__webglFramebuffer=[];for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[q]=[];for(let $=0;$<_.mipmaps.length;$++)B.__webglFramebuffer[q][$]=n.createFramebuffer()}else B.__webglFramebuffer[q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let q=0;q<_.mipmaps.length;q++)B.__webglFramebuffer[q]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ce)for(let q=0,$=Q.length;q<$;q++){let xe=i.get(Q[q]);xe.__webglTexture===void 0&&(xe.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Je(T)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let q=0;q<Q.length;q++){let $=Q[q];B.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[q]);let xe=s.convert($.format,$.colorSpace),ye=s.convert($.type),oe=b($.internalFormat,xe,ye,$.normalized,$.colorSpace,T.isXRRenderTarget===!0),re=Bt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,re,oe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,B.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),At(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ve(n.TEXTURE_CUBE_MAP,_);for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)Ne(B.__webglFramebuffer[q][$],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,$);else Ne(B.__webglFramebuffer[q],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);m(_)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let q=0,$=Q.length;q<$;q++){let xe=Q[q],ye=i.get(xe),oe=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,ye.__webglTexture),Ve(oe,xe),Ne(B.__webglFramebuffer,T,xe,n.COLOR_ATTACHMENT0+q,oe,0),m(xe)&&M(oe)}t.unbindTexture()}else{let q=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(q=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(q,Z.__webglTexture),Ve(q,_),_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)Ne(B.__webglFramebuffer[$],T,_,n.COLOR_ATTACHMENT0,q,$);else Ne(B.__webglFramebuffer,T,_,n.COLOR_ATTACHMENT0,q,0);m(_)&&M(q),t.unbindTexture()}T.depthBuffer&&ht(T)}function Ot(T){let _=T.textures;for(let B=0,Z=_.length;B<Z;B++){let Q=_[B];if(m(Q)){let ie=w(T),ce=i.get(Q).__webglTexture;t.bindTexture(ie,ce),M(ie),t.unbindTexture()}}}let Ct=[],yn=[];function N(T){if(T.samples>0){if(Je(T)===!1){let _=T.textures,B=T.width,Z=T.height,Q=n.COLOR_BUFFER_BIT,ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(T),q=_.length>1;if(q)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);let $=T.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=i.get(_[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ye,0)}n.blitFramebuffer(0,0,B,Z,0,0,B,Z,Q,n.NEAREST),l===!0&&(Ct.length=0,yn.length=0,Ct.push(n.COLOR_ATTACHMENT0+xe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ct.push(ie),yn.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,yn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ct))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=i.get(_[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let _=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Bt(T){return Math.min(r.maxSamples,T.samples)}function Je(T){let _=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function _t(T){let _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function ue(T,_){let B=T.colorSpace,Z=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==qs&&B!==Ci&&(Xe.getTransfer(B)===je?(Z!==Dn||Q!==en)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ie("WebGLTextures: Unsupported texture color space:",B)),_}function Rt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=ee,this.setTexture2DArray=ne,this.setTexture3D=fe,this.setTextureCube=Se,this.rebindTextures=St,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function N_(n,e){function t(i,r=Ci){let s,a=Xe.getTransfer(r);if(i===en)return n.UNSIGNED_BYTE;if(i===Ml)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Sl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Tu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Au)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===wu)return n.BYTE;if(i===Eu)return n.SHORT;if(i===ps)return n.UNSIGNED_SHORT;if(i===yl)return n.INT;if(i===Xn)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===wt)return n.HALF_FLOAT;if(i===Cu)return n.ALPHA;if(i===Ru)return n.RGB;if(i===Dn)return n.RGBA;if(i===ti)return n.DEPTH_COMPONENT;if(i===Zi)return n.DEPTH_STENCIL;if(i===gs)return n.RED;if(i===bl)return n.RED_INTEGER;if(i===$i)return n.RG;if(i===wl)return n.RG_INTEGER;if(i===El)return n.RGBA_INTEGER;if(i===ba||i===wa||i===Ea||i===Ta)if(a===je)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ba)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===wa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ba)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===wa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ea)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ta)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Tl||i===Al||i===Cl||i===Rl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Tl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Al)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Cl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Rl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pl||i===Il||i===Dl||i===Ll||i===Nl||i===Aa||i===Fl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Pl||i===Il)return a===je?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Dl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ll)return s.COMPRESSED_R11_EAC;if(i===Nl)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Aa)return s.COMPRESSED_RG11_EAC;if(i===Fl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ul||i===Ol||i===Bl||i===zl||i===Hl||i===Vl||i===kl||i===Gl||i===Wl||i===Xl||i===ql||i===Yl||i===Zl||i===$l)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ul)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ol)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===zl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Hl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Vl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Xl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ql)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Yl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Zl)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$l)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Jl||i===Kl||i===jl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Jl)return a===je?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ql||i===ec||i===Ca||i===tc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ql)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ec)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ca)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ms?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var F_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U_=`
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

}`,eh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new aa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Ye({vertexShader:F_,fragmentShader:U_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new it(new ca(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},th=class extends ni{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,v=typeof XRWebGLBinding<"u",p=new eh,m={},M=t.getContextAttributes(),w=null,b=null,C=[],E=[],P=new he,y=null,A=new qt;A.viewport=new gt;let D=new qt;D.viewport=new gt;let R=[A,D],U=new pl,W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ge=C[J];return ge===void 0&&(ge=new as,C[J]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(J){let ge=C[J];return ge===void 0&&(ge=new as,C[J]=ge),ge.getGripSpace()},this.getHand=function(J){let ge=C[J];return ge===void 0&&(ge=new as,C[J]=ge),ge.getHandSpace()};function O(J){let ge=E.indexOf(J.inputSource);if(ge===-1)return;let ae=C[ge];ae!==void 0&&(ae.update(J.inputSource,J.frame,c||a),ae.dispatchEvent({type:J.type,data:J.inputSource}))}function V(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",G);for(let J=0;J<C.length;J++){let ge=E[J];ge!==null&&(E[J]=null,C[J].disconnect(ge))}W=null,X=null,p.reset();for(let J in m)delete m[J];e.setRenderTarget(w),f=null,u=null,d=null,r=null,b=null,Ve.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",V),r.addEventListener("inputsourceschange",G),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Le=null,Be=null;M.depth&&(Be=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=M.stencil?Zi:ti,Le=M.stencil?ms:Xn);let Ne={colorFormat:t.RGBA8,depthFormat:Be,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Ne),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new xt(u.textureWidth,u.textureHeight,{format:Dn,type:en,depthTexture:new Ai(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ae={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new xt(f.framebufferWidth,f.framebufferHeight,{format:Dn,type:en,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ve.setContext(r),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function G(J){for(let ge=0;ge<J.removed.length;ge++){let ae=J.removed[ge],Le=E.indexOf(ae);Le>=0&&(E[Le]=null,C[Le].disconnect(ae))}for(let ge=0;ge<J.added.length;ge++){let ae=J.added[ge],Le=E.indexOf(ae);if(Le===-1){for(let Ne=0;Ne<C.length;Ne++)if(Ne>=E.length){E.push(ae),Le=Ne;break}else if(E[Ne]===null){E[Ne]=ae,Le=Ne;break}if(Le===-1)break}let Be=C[Le];Be&&Be.connect(ae)}}let ee=new I,ne=new I;function fe(J,ge,ae){ee.setFromMatrixPosition(ge.matrixWorld),ne.setFromMatrixPosition(ae.matrixWorld);let Le=ee.distanceTo(ne),Be=ge.projectionMatrix.elements,Ne=ae.projectionMatrix.elements,At=Be[14]/(Be[10]-1),$e=Be[14]/(Be[10]+1),ht=(Be[9]+1)/Be[5],St=(Be[9]-1)/Be[5],Ze=(Be[8]-1)/Be[0],Ot=(Ne[8]+1)/Ne[0],Ct=At*Ze,yn=At*Ot,N=Le/(-Ze+Ot),Bt=N*-Ze;if(ge.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Bt),J.translateZ(N),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Be[10]===-1)J.projectionMatrix.copy(ge.projectionMatrix),J.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{let Je=At+N,_t=$e+N,ue=Ct-Bt,Rt=yn+(Le-Bt),T=ht*$e/_t*Je,_=St*$e/_t*Je;J.projectionMatrix.makePerspective(ue,Rt,T,_,Je,_t),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Se(J,ge){ge===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ge.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let ge=J.near,ae=J.far;p.texture!==null&&(p.depthNear>0&&(ge=p.depthNear),p.depthFar>0&&(ae=p.depthFar)),U.near=D.near=A.near=ge,U.far=D.far=A.far=ae,(W!==U.near||X!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),W=U.near,X=U.far),U.layers.mask=J.layers.mask|6,A.layers.mask=U.layers.mask&-5,D.layers.mask=U.layers.mask&-3;let Le=J.parent,Be=U.cameras;Se(U,Le);for(let Ne=0;Ne<Be.length;Ne++)Se(Be[Ne],Le);Be.length===2?fe(U,A,D):U.projectionMatrix.copy(A.projectionMatrix),Ae(J,U,Le)};function Ae(J,ge,ae){ae===null?J.matrix.copy(ge.matrixWorld):(J.matrix.copy(ae.matrixWorld),J.matrix.invert(),J.matrix.multiply(ge.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ge.projectionMatrix),J.projectionMatrixInverse.copy(ge.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=is*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(J){return m[J]};let tt=null;function ut(J,ge){if(h=ge.getViewerPose(c||a),g=ge,h!==null){let ae=h.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let Le=!1;ae.length!==U.cameras.length&&(U.cameras.length=0,Le=!0);for(let $e=0;$e<ae.length;$e++){let ht=ae[$e],St=null;if(f!==null)St=f.getViewport(ht);else{let Ot=d.getViewSubImage(u,ht);St=Ot.viewport,$e===0&&(e.setRenderTargetTextures(b,Ot.colorTexture,Ot.depthStencilTexture),e.setRenderTarget(b))}let Ze=R[$e];Ze===void 0&&(Ze=new qt,Ze.layers.enable($e),Ze.viewport=new gt,R[$e]=Ze),Ze.matrix.fromArray(ht.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(ht.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(St.x,St.y,St.width,St.height),$e===0&&(U.matrix.copy(Ze.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Le===!0&&U.cameras.push(Ze)}let Be=r.enabledFeatures;if(Be&&Be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=i.getBinding();let $e=d.getDepthInformation(ae[0]);$e&&$e.isValid&&$e.texture&&p.init($e,r.renderState)}if(Be&&Be.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let $e=0;$e<ae.length;$e++){let ht=ae[$e].camera;if(ht){let St=m[ht];St||(St=new aa,m[ht]=St);let Ze=d.getCameraImage(ht);St.sourceTexture=Ze}}}}for(let ae=0;ae<C.length;ae++){let Le=E[ae],Be=C[ae];Le!==null&&Be!==void 0&&Be.update(Le,ge,c||a)}tt&&tt(J,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),g=null}let Ve=new Df;Ve.setAnimationLoop(ut),this.setAnimationLoop=function(J){tt=J},this.dispose=function(){}}},O_=new ct,Bf=new Oe;Bf.set(-1,0,0,0,1,0,0,0,1);function B_(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Du(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,M,w,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,w):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Yt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Yt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let M=e.get(m),w=M.envMap,b=M.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(O_.makeRotationFromEuler(b)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Bf),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,w){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=w*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Yt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function z_(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){let b=w.program;i.uniformBlockBinding(M,b)}function c(M,w){let b=r[M.id];b===void 0&&(g(M),b=h(M),r[M.id]=b,M.addEventListener("dispose",p));let C=w.program;i.updateUBOMapping(M,C);let E=e.render.frame;s[M.id]!==E&&(u(M),s[M.id]=E)}function h(M){let w=d();M.__bindingPointIndex=w;let b=n.createBuffer(),C=M.__size,E=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,C,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Ie("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let w=r[M.id],b=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let E=0,P=b.length;E<P;E++){let y=Array.isArray(b[E])?b[E]:[b[E]];for(let A=0,D=y.length;A<D;A++){let R=y[A];if(f(R,E,A,C)===!0){let U=R.__offset,W=Array.isArray(R.value)?R.value:[R.value],X=0;for(let O=0;O<W.length;O++){let V=W[O],G=v(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,U+X,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):ArrayBuffer.isView(V)?R.__data.set(new V.constructor(V.buffer,V.byteOffset,R.__data.length)):(V.toArray(R.__data,X),X+=G.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,w,b,C){let E=M.value,P=w+"_"+b;if(C[P]===void 0)return typeof E=="number"||typeof E=="boolean"?C[P]=E:ArrayBuffer.isView(E)?C[P]=E.slice():C[P]=E.clone(),!0;{let y=C[P];if(typeof E=="number"||typeof E=="boolean"){if(y!==E)return C[P]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(y.equals(E)===!1)return y.copy(E),!0}}return!1}function g(M){let w=M.uniforms,b=0,C=16;for(let P=0,y=w.length;P<y;P++){let A=Array.isArray(w[P])?w[P]:[w[P]];for(let D=0,R=A.length;D<R;D++){let U=A[D],W=Array.isArray(U.value)?U.value:[U.value];for(let X=0,O=W.length;X<O;X++){let V=W[X],G=v(V),ee=b%C,ne=ee%G.boundary,fe=ee+ne;b+=ne,fe!==0&&C-fe<G.storage&&(b+=C-fe),U.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=G.storage}}}let E=b%C;return E>0&&(b+=C-E),M.__size=b,M.__cache={},this}function v(M){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",M),w}function p(M){let w=M.target;w.removeEventListener("dispose",p);let b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function m(){for(let M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var H_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ci=null;function V_(){return ci===null&&(ci=new pr(H_,16,16,$i,wt),ci.name="DFG_LUT",ci.minFilter=Ut,ci.magFilter=Ut,ci.wrapS=wn,ci.wrapT=wn,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}var uc=class{constructor(e={}){let{canvas:t=nf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=en}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let v=f,p=new Set([El,wl,bl]),m=new Set([en,Xn,ps,ms,Ml,Sl]),M=new Uint32Array(4),w=new Int32Array(4),b=new I,C=null,E=null,P=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,R=!1,U=null;this._outputColorSpace=Qt;let W=0,X=0,O=null,V=-1,G=null,ee=new gt,ne=new gt,fe=null,Se=new Ee(0),Ae=0,tt=t.width,ut=t.height,Ve=1,J=null,ge=null,ae=new gt(0,0,tt,ut),Le=new gt(0,0,tt,ut),Be=!1,Ne=new ls,At=!1,$e=!1,ht=new ct,St=new I,Ze=new gt,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ct=!1;function yn(){return O===null?Ve:1}let N=i;function Bt(S,F){return t.getContext(S,F)}try{let S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gl}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",ze,!1),N===null){let F="webgl2";if(N=Bt(F,S),N===null)throw Bt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Ie("WebGLRenderer: "+S.message),S}let Je,_t,ue,Rt,T,_,B,Z,Q,ie,ce,q,$,xe,ye,oe,re,Ue,ke,rt,L,se,Y;function ve(){Je=new Zx(N),Je.init(),L=new N_(N,Je),_t=new Hx(N,Je,e,L),ue=new D_(N,Je),_t.reversedDepthBuffer&&u&&ue.buffers.depth.setReversed(!0),Rt=new Kx(N),T=new v_,_=new L_(N,Je,ue,T,_t,L,Rt),B=new Yx(D),Z=new t0(N),se=new Bx(N,Z),Q=new $x(N,Z,Rt,se),ie=new Qx(N,Q,Z,se,Rt),Ue=new jx(N,_t,_),ye=new Vx(T),ce=new x_(D,B,Je,_t,se,ye),q=new B_(D,T),$=new y_,xe=new T_(Je),re=new Ox(D,B,ue,ie,g,l),oe=new I_(D,ie,_t),Y=new z_(N,Rt,_t,ue),ke=new zx(N,Je,Rt),rt=new Jx(N,Je,Rt),Rt.programs=ce.programs,D.capabilities=_t,D.extensions=Je,D.properties=T,D.renderLists=$,D.shadowMap=oe,D.state=ue,D.info=Rt}ve(),v!==en&&(A=new tv(v,t.width,t.height,r,s));let le=new th(D,N);this.xr=le,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let S=Je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Ve},this.setPixelRatio=function(S){S!==void 0&&(Ve=S,this.setSize(tt,ut,!1))},this.getSize=function(S){return S.set(tt,ut)},this.setSize=function(S,F,k=!0){if(le.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=S,ut=F,t.width=Math.floor(S*Ve),t.height=Math.floor(F*Ve),k===!0&&(t.style.width=S+"px",t.style.height=F+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(tt*Ve,ut*Ve).floor()},this.setDrawingBufferSize=function(S,F,k){tt=S,ut=F,Ve=k,t.width=Math.floor(S*k),t.height=Math.floor(F*k),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(v===en){Ie("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Re("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ee)},this.getViewport=function(S){return S.copy(ae)},this.setViewport=function(S,F,k,z){S.isVector4?ae.set(S.x,S.y,S.z,S.w):ae.set(S,F,k,z),ue.viewport(ee.copy(ae).multiplyScalar(Ve).round())},this.getScissor=function(S){return S.copy(Le)},this.setScissor=function(S,F,k,z){S.isVector4?Le.set(S.x,S.y,S.z,S.w):Le.set(S,F,k,z),ue.scissor(ne.copy(Le).multiplyScalar(Ve).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(S){ue.setScissorTest(Be=S)},this.setOpaqueSort=function(S){J=S},this.setTransparentSort=function(S){ge=S},this.getClearColor=function(S){return S.copy(re.getClearColor())},this.setClearColor=function(){re.setClearColor(...arguments)},this.getClearAlpha=function(){return re.getClearAlpha()},this.setClearAlpha=function(){re.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,k=!0){let z=0;if(S){let H=!1;if(O!==null){let me=O.texture.format;H=p.has(me)}if(H){let me=O.texture.type,Me=m.has(me),pe=re.getClearColor(),be=re.getClearAlpha(),Te=pe.r,He=pe.g,We=pe.b;Me?(M[0]=Te,M[1]=He,M[2]=We,M[3]=be,N.clearBufferuiv(N.COLOR,0,M)):(w[0]=Te,w[1]=He,w[2]=We,w[3]=be,N.clearBufferiv(N.COLOR,0,w))}else z|=N.COLOR_BUFFER_BIT}F&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",ze,!1),re.dispose(),$.dispose(),xe.dispose(),T.dispose(),B.dispose(),ie.dispose(),se.dispose(),Y.dispose(),ce.dispose(),le.dispose(),le.removeEventListener("sessionstart",Oh),le.removeEventListener("sessionend",Bh),rr.stop()};function j(S){S.preventDefault(),$s("WebGLRenderer: Context Lost."),R=!0}function we(){$s("WebGLRenderer: Context Restored."),R=!1;let S=Rt.autoReset,F=oe.enabled,k=oe.autoUpdate,z=oe.needsUpdate,H=oe.type;ve(),Rt.autoReset=S,oe.enabled=F,oe.autoUpdate=k,oe.needsUpdate=z,oe.type=H}function ze(S){Ie("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function It(S){let F=S.target;F.removeEventListener("dispose",It),dt(F)}function dt(S){vi(S),T.remove(S)}function vi(S){let F=T.get(S).programs;F!==void 0&&(F.forEach(function(k){ce.releaseProgram(k)}),S.isShaderMaterial&&ce.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,k,z,H,me){F===null&&(F=Ot);let Me=H.isMesh&&H.matrixWorld.determinant()<0,pe=Qp(S,F,k,z,H);ue.setMaterial(z,Me);let be=k.index,Te=1;if(z.wireframe===!0){if(be=Q.getWireframeAttribute(k),be===void 0)return;Te=2}let He=k.drawRange,We=k.attributes.position,Ce=He.start*Te,ft=(He.start+He.count)*Te;me!==null&&(Ce=Math.max(Ce,me.start*Te),ft=Math.min(ft,(me.start+me.count)*Te)),be!==null?(Ce=Math.max(Ce,0),ft=Math.min(ft,be.count)):We!=null&&(Ce=Math.max(Ce,0),ft=Math.min(ft,We.count));let Dt=ft-Ce;if(Dt<0||Dt===1/0)return;se.setup(H,z,pe,k,be);let Pt,pt=ke;if(be!==null&&(Pt=Z.get(be),pt=rt,pt.setIndex(Pt)),H.isMesh)z.wireframe===!0?(ue.setLineWidth(z.wireframeLinewidth*yn()),pt.setMode(N.LINES)):pt.setMode(N.TRIANGLES);else if(H.isLine){let Jt=z.linewidth;Jt===void 0&&(Jt=1),ue.setLineWidth(Jt*yn()),H.isLineSegments?pt.setMode(N.LINES):H.isLineLoop?pt.setMode(N.LINE_LOOP):pt.setMode(N.LINE_STRIP)}else H.isPoints?pt.setMode(N.POINTS):H.isSprite&&pt.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))pt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Jt=H._multiDrawStarts,_e=H._multiDrawCounts,Mn=H._multiDrawCount,nt=be?Z.get(be).bytesPerElement:1,Cn=T.get(z).currentProgram.getUniforms();for(let Kn=0;Kn<Mn;Kn++)Cn.setValue(N,"_gl_DrawID",Kn),pt.render(Jt[Kn]/nt,_e[Kn])}else if(H.isInstancedMesh)pt.renderInstances(Ce,Dt,H.count);else if(k.isInstancedBufferGeometry){let Jt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,_e=Math.min(k.instanceCount,Jt);pt.renderInstances(Ce,Dt,_e)}else pt.render(Ce,Dt)};function Jn(S,F,k){S.transparent===!0&&S.side===pn&&S.forceSinglePass===!1?(S.side=Yt,S.needsUpdate=!0,Ka(S,F,k),S.side=Ti,S.needsUpdate=!0,Ka(S,F,k),S.side=pn):Ka(S,F,k)}this.compile=function(S,F,k=null){k===null&&(k=S),E=xe.get(k),E.init(F),y.push(E),k.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),S!==k&&S.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights();let z=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let me=H.material;if(me)if(Array.isArray(me))for(let Me=0;Me<me.length;Me++){let pe=me[Me];Jn(pe,k,H),z.add(pe)}else Jn(me,k,H),z.add(me)}),E=y.pop(),z},this.compileAsync=function(S,F,k=null){let z=this.compile(S,F,k);return new Promise(H=>{function me(){if(z.forEach(function(Me){T.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){H(S);return}setTimeout(me,10)}Je.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Fc=null;function Kp(S){Fc&&Fc(S)}function Oh(){rr.stop()}function Bh(){rr.start()}let rr=new Df;rr.setAnimationLoop(Kp),typeof self<"u"&&rr.setContext(self),this.setAnimationLoop=function(S){Fc=S,le.setAnimationLoop(S),S===null?rr.stop():rr.start()},le.addEventListener("sessionstart",Oh),le.addEventListener("sessionend",Bh),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){Ie("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;U!==null&&U.renderStart(S,F);let k=le.enabled===!0&&le.isPresenting===!0,z=A!==null&&(O===null||k)&&A.begin(D,O);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(F),F=le.getCamera()),S.isScene===!0&&S.onBeforeRender(D,S,F,O),E=xe.get(S,y.length),E.init(F),E.state.textureUnits=_.getTextureUnits(),y.push(E),ht.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ne.setFromProjectionMatrix(ht,Hn,F.reversedDepth),$e=this.localClippingEnabled,At=ye.init(this.clippingPlanes,$e),C=$.get(S,P.length),C.init(),P.push(C),le.enabled===!0&&le.isPresenting===!0){let Me=D.xr.getDepthSensingMesh();Me!==null&&Uc(Me,F,-1/0,D.sortObjects)}Uc(S,F,0,D.sortObjects),C.finish(),D.sortObjects===!0&&C.sort(J,ge),Ct=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Ct&&re.addToRenderList(C,S),this.info.render.frame++,At===!0&&ye.beginShadows();let H=E.state.shadowsArray;if(oe.render(H,S,F),At===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&A.hasRenderPass())===!1){let Me=C.opaque,pe=C.transmissive;if(E.setupLights(),F.isArrayCamera){let be=F.cameras;if(pe.length>0)for(let Te=0,He=be.length;Te<He;Te++){let We=be[Te];Hh(Me,pe,S,We)}Ct&&re.render(S);for(let Te=0,He=be.length;Te<He;Te++){let We=be[Te];zh(C,S,We,We.viewport)}}else pe.length>0&&Hh(Me,pe,S,F),Ct&&re.render(S),zh(C,S,F)}O!==null&&X===0&&(_.updateMultisampleRenderTarget(O),_.updateRenderTargetMipmap(O)),z&&A.end(D),S.isScene===!0&&S.onAfterRender(D,S,F),se.resetDefaultState(),V=-1,G=null,y.pop(),y.length>0?(E=y[y.length-1],_.setTextureUnits(E.state.textureUnits),At===!0&&ye.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?C=P[P.length-1]:C=null,U!==null&&U.renderEnd()};function Uc(S,F,k,z){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ne.intersectsSprite(S)){z&&Ze.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ht);let Me=ie.update(S),pe=S.material;pe.visible&&C.push(S,Me,pe,k,Ze.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ne.intersectsObject(S))){let Me=ie.update(S),pe=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ze.copy(S.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ze.copy(Me.boundingSphere.center)),Ze.applyMatrix4(S.matrixWorld).applyMatrix4(ht)),Array.isArray(pe)){let be=Me.groups;for(let Te=0,He=be.length;Te<He;Te++){let We=be[Te],Ce=pe[We.materialIndex];Ce&&Ce.visible&&C.push(S,Me,Ce,k,Ze.z,We)}}else pe.visible&&C.push(S,Me,pe,k,Ze.z,null)}}let me=S.children;for(let Me=0,pe=me.length;Me<pe;Me++)Uc(me[Me],F,k,z)}function zh(S,F,k,z){let{opaque:H,transmissive:me,transparent:Me}=S;E.setupLightsView(k),At===!0&&ye.setGlobalState(D.clippingPlanes,k),z&&ue.viewport(ee.copy(z)),H.length>0&&Ja(H,F,k),me.length>0&&Ja(me,F,k),Me.length>0&&Ja(Me,F,k),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function Hh(S,F,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){let Ce=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new xt(1,1,{generateMipmaps:!0,type:Ce?wt:en,minFilter:Yi,samples:Math.max(4,_t.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}let me=E.state.transmissionRenderTarget[z.id],Me=z.viewport||ee;me.setSize(Me.z*D.transmissionResolutionScale,Me.w*D.transmissionResolutionScale);let pe=D.getRenderTarget(),be=D.getActiveCubeFace(),Te=D.getActiveMipmapLevel();D.setRenderTarget(me),D.getClearColor(Se),Ae=D.getClearAlpha(),Ae<1&&D.setClearColor(16777215,.5),D.clear(),Ct&&re.render(k);let He=D.toneMapping;D.toneMapping=Wn;let We=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),At===!0&&ye.setGlobalState(D.clippingPlanes,z),Ja(S,k,z),_.updateMultisampleRenderTarget(me),_.updateRenderTargetMipmap(me),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let ft=0,Dt=F.length;ft<Dt;ft++){let Pt=F[ft],{object:pt,geometry:Jt,material:_e,group:Mn}=Pt;if(_e.side===pn&&pt.layers.test(z.layers)){let nt=_e.side;_e.side=Yt,_e.needsUpdate=!0,Vh(pt,k,z,Jt,_e,Mn),_e.side=nt,_e.needsUpdate=!0,Ce=!0}}Ce===!0&&(_.updateMultisampleRenderTarget(me),_.updateRenderTargetMipmap(me))}D.setRenderTarget(pe,be,Te),D.setClearColor(Se,Ae),We!==void 0&&(z.viewport=We),D.toneMapping=He}function Ja(S,F,k){let z=F.isScene===!0?F.overrideMaterial:null;for(let H=0,me=S.length;H<me;H++){let Me=S[H],{object:pe,geometry:be,group:Te}=Me,He=Me.material;He.allowOverride===!0&&z!==null&&(He=z),pe.layers.test(k.layers)&&Vh(pe,F,k,be,He,Te)}}function Vh(S,F,k,z,H,me){S.onBeforeRender(D,F,k,z,H,me),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(D,F,k,z,S,me),H.transparent===!0&&H.side===pn&&H.forceSinglePass===!1?(H.side=Yt,H.needsUpdate=!0,D.renderBufferDirect(k,F,z,H,S,me),H.side=Ti,H.needsUpdate=!0,D.renderBufferDirect(k,F,z,H,S,me),H.side=pn):D.renderBufferDirect(k,F,z,H,S,me),S.onAfterRender(D,F,k,z,H,me)}function Ka(S,F,k){F.isScene!==!0&&(F=Ot);let z=T.get(S),H=E.state.lights,me=E.state.shadowsArray,Me=H.state.version,pe=ce.getParameters(S,H.state,me,F,k,E.state.lightProbeGridArray),be=ce.getProgramCacheKey(pe),Te=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;let He=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=B.get(S.envMap||z.environment,He),z.envMapRotation=z.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Te===void 0&&(S.addEventListener("dispose",It),Te=new Map,z.programs=Te);let We=Te.get(be);if(We!==void 0){if(z.currentProgram===We&&z.lightsStateVersion===Me)return Gh(S,pe),We}else pe.uniforms=ce.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,k,pe),S.onBeforeCompile(pe,D),We=ce.acquireProgram(pe,be),Te.set(be,We),z.uniforms=pe.uniforms;let Ce=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ce.clippingPlanes=ye.uniform),Gh(S,pe),z.needsLights=tm(S),z.lightsStateVersion=Me,z.needsLights&&(Ce.ambientLightColor.value=H.state.ambient,Ce.lightProbe.value=H.state.probe,Ce.directionalLights.value=H.state.directional,Ce.directionalLightShadows.value=H.state.directionalShadow,Ce.spotLights.value=H.state.spot,Ce.spotLightShadows.value=H.state.spotShadow,Ce.rectAreaLights.value=H.state.rectArea,Ce.ltc_1.value=H.state.rectAreaLTC1,Ce.ltc_2.value=H.state.rectAreaLTC2,Ce.pointLights.value=H.state.point,Ce.pointLightShadows.value=H.state.pointShadow,Ce.hemisphereLights.value=H.state.hemi,Ce.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ce.spotLightMatrix.value=H.state.spotLightMatrix,Ce.spotLightMap.value=H.state.spotLightMap,Ce.pointShadowMatrix.value=H.state.pointShadowMatrix),z.lightProbeGrid=E.state.lightProbeGridArray.length>0,z.currentProgram=We,z.uniformsList=null,We}function kh(S){if(S.uniformsList===null){let F=S.currentProgram.getUniforms();S.uniformsList=_s.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Gh(S,F){let k=T.get(S);k.outputColorSpace=F.outputColorSpace,k.batching=F.batching,k.batchingColor=F.batchingColor,k.instancing=F.instancing,k.instancingColor=F.instancingColor,k.instancingMorph=F.instancingMorph,k.skinning=F.skinning,k.morphTargets=F.morphTargets,k.morphNormals=F.morphNormals,k.morphColors=F.morphColors,k.morphTargetsCount=F.morphTargetsCount,k.numClippingPlanes=F.numClippingPlanes,k.numIntersection=F.numClipIntersection,k.vertexAlphas=F.vertexAlphas,k.vertexTangents=F.vertexTangents,k.toneMapping=F.toneMapping}function jp(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;b.setFromMatrixPosition(F.matrixWorld);for(let k=0,z=S.length;k<z;k++){let H=S[k];if(H.texture!==null&&H.boundingBox.containsPoint(b))return H}return null}function Qp(S,F,k,z,H){F.isScene!==!0&&(F=Ot),_.resetTextureUnits();let me=F.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,pe=O===null?D.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Xe.workingColorSpace,be=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Te=B.get(z.envMap||Me,be),He=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,We=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ce=!!k.morphAttributes.position,ft=!!k.morphAttributes.normal,Dt=!!k.morphAttributes.color,Pt=Wn;z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Pt=D.toneMapping);let pt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Jt=pt!==void 0?pt.length:0,_e=T.get(z),Mn=E.state.lights;if(At===!0&&($e===!0||S!==G)){let yt=S===G&&z.id===V;ye.setState(z,S,yt)}let nt=!1;z.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Mn.state.version||_e.outputColorSpace!==pe||H.isBatchedMesh&&_e.batching===!1||!H.isBatchedMesh&&_e.batching===!0||H.isBatchedMesh&&_e.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&_e.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&_e.instancing===!1||!H.isInstancedMesh&&_e.instancing===!0||H.isSkinnedMesh&&_e.skinning===!1||!H.isSkinnedMesh&&_e.skinning===!0||H.isInstancedMesh&&_e.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&_e.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&_e.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&_e.instancingMorph===!1&&H.morphTexture!==null||_e.envMap!==Te||z.fog===!0&&_e.fog!==me||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==ye.numPlanes||_e.numIntersection!==ye.numIntersection)||_e.vertexAlphas!==He||_e.vertexTangents!==We||_e.morphTargets!==Ce||_e.morphNormals!==ft||_e.morphColors!==Dt||_e.toneMapping!==Pt||_e.morphTargetsCount!==Jt||!!_e.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,_e.__version=z.version);let Cn=_e.currentProgram;nt===!0&&(Cn=Ka(z,F,H),U&&z.isNodeMaterial&&U.onUpdateProgram(z,Cn,_e));let Kn=!1,Li=!1,Nr=!1,mt=Cn.getUniforms(),Lt=_e.uniforms;if(ue.useProgram(Cn.program)&&(Kn=!0,Li=!0,Nr=!0),z.id!==V&&(V=z.id,Li=!0),_e.needsLights){let yt=jp(E.state.lightProbeGridArray,H);_e.lightProbeGrid!==yt&&(_e.lightProbeGrid=yt,Li=!0)}if(Kn||G!==S){ue.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),mt.setValue(N,"projectionMatrix",S.projectionMatrix),mt.setValue(N,"viewMatrix",S.matrixWorldInverse);let Fi=mt.map.cameraPosition;Fi!==void 0&&Fi.setValue(N,St.setFromMatrixPosition(S.matrixWorld)),_t.logarithmicDepthBuffer&&mt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&mt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),G!==S&&(G=S,Li=!0,Nr=!0)}if(_e.needsLights&&(Mn.state.directionalShadowMap.length>0&&mt.setValue(N,"directionalShadowMap",Mn.state.directionalShadowMap,_),Mn.state.spotShadowMap.length>0&&mt.setValue(N,"spotShadowMap",Mn.state.spotShadowMap,_),Mn.state.pointShadowMap.length>0&&mt.setValue(N,"pointShadowMap",Mn.state.pointShadowMap,_)),H.isSkinnedMesh){mt.setOptional(N,H,"bindMatrix"),mt.setOptional(N,H,"bindMatrixInverse");let yt=H.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),mt.setValue(N,"boneTexture",yt.boneTexture,_))}H.isBatchedMesh&&(mt.setOptional(N,H,"batchingTexture"),mt.setValue(N,"batchingTexture",H._matricesTexture,_),mt.setOptional(N,H,"batchingIdTexture"),mt.setValue(N,"batchingIdTexture",H._indirectTexture,_),mt.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&mt.setValue(N,"batchingColorTexture",H._colorsTexture,_));let Ni=k.morphAttributes;if((Ni.position!==void 0||Ni.normal!==void 0||Ni.color!==void 0)&&Ue.update(H,k,Cn),(Li||_e.receiveShadow!==H.receiveShadow)&&(_e.receiveShadow=H.receiveShadow,mt.setValue(N,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(Lt.envMapIntensity.value=F.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=V_()),Li){if(mt.setValue(N,"toneMappingExposure",D.toneMappingExposure),_e.needsLights&&em(Lt,Nr),me&&z.fog===!0&&q.refreshFogUniforms(Lt,me),q.refreshMaterialUniforms(Lt,z,Ve,ut,E.state.transmissionRenderTarget[S.id]),_e.needsLights&&_e.lightProbeGrid){let yt=_e.lightProbeGrid;Lt.probesSH.value=yt.texture,Lt.probesMin.value.copy(yt.boundingBox.min),Lt.probesMax.value.copy(yt.boundingBox.max),Lt.probesResolution.value.copy(yt.resolution)}_s.upload(N,kh(_e),Lt,_)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(_s.upload(N,kh(_e),Lt,_),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&mt.setValue(N,"center",H.center),mt.setValue(N,"modelViewMatrix",H.modelViewMatrix),mt.setValue(N,"normalMatrix",H.normalMatrix),mt.setValue(N,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){let yt=z.uniformsGroups;for(let Fi=0,Fr=yt.length;Fi<Fr;Fi++){let Wh=yt[Fi];Y.update(Wh,Cn),Y.bind(Wh,Cn)}}return Cn}function em(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function tm(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(S,F,k){let z=T.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),T.get(S.texture).__webglTexture=F,T.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){let k=T.get(S);k.__webglFramebuffer=F,k.__useDefaultFramebuffer=F===void 0};let nm=N.createFramebuffer();this.setRenderTarget=function(S,F=0,k=0){O=S,W=F,X=k;let z=null,H=!1,me=!1;if(S){let pe=T.get(S);if(pe.__useDefaultFramebuffer!==void 0){ue.bindFramebuffer(N.FRAMEBUFFER,pe.__webglFramebuffer),ee.copy(S.viewport),ne.copy(S.scissor),fe=S.scissorTest,ue.viewport(ee),ue.scissor(ne),ue.setScissorTest(fe),V=-1;return}else if(pe.__webglFramebuffer===void 0)_.setupRenderTarget(S);else if(pe.__hasExternalTextures)_.rebindTextures(S,T.get(S.texture).__webglTexture,T.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let He=S.depthTexture;if(pe.__boundDepthTexture!==He){if(He!==null&&T.has(He)&&(S.width!==He.image.width||S.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(S)}}let be=S.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(me=!0);let Te=T.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Te[F])?z=Te[F][k]:z=Te[F],H=!0):S.samples>0&&_.useMultisampledRTT(S)===!1?z=T.get(S).__webglMultisampledFramebuffer:Array.isArray(Te)?z=Te[k]:z=Te,ee.copy(S.viewport),ne.copy(S.scissor),fe=S.scissorTest}else ee.copy(ae).multiplyScalar(Ve).floor(),ne.copy(Le).multiplyScalar(Ve).floor(),fe=Be;if(k!==0&&(z=nm),ue.bindFramebuffer(N.FRAMEBUFFER,z)&&ue.drawBuffers(S,z),ue.viewport(ee),ue.scissor(ne),ue.setScissorTest(fe),H){let pe=T.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,pe.__webglTexture,k)}else if(me){let pe=F;for(let be=0;be<S.textures.length;be++){let Te=T.get(S.textures[be]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+be,Te.__webglTexture,k,pe)}}else if(S!==null&&k!==0){let pe=T.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pe.__webglTexture,k)}V=-1},this.readRenderTargetPixels=function(S,F,k,z,H,me,Me,pe=0){if(!(S&&S.isWebGLRenderTarget)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=T.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be){ue.bindFramebuffer(N.FRAMEBUFFER,be);try{let Te=S.textures[pe],He=Te.format,We=Te.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!_t.textureFormatReadable(He)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(We)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-z&&k>=0&&k<=S.height-H&&N.readPixels(F,k,z,H,L.convert(He),L.convert(We),me)}finally{let Te=O!==null?T.get(O).__webglFramebuffer:null;ue.bindFramebuffer(N.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(S,F,k,z,H,me,Me,pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=T.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be)if(F>=0&&F<=S.width-z&&k>=0&&k<=S.height-H){ue.bindFramebuffer(N.FRAMEBUFFER,be);let Te=S.textures[pe],He=Te.format,We=Te.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!_t.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ce=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ce),N.bufferData(N.PIXEL_PACK_BUFFER,me.byteLength,N.STREAM_READ),N.readPixels(F,k,z,H,L.convert(He),L.convert(We),0);let ft=O!==null?T.get(O).__webglFramebuffer:null;ue.bindFramebuffer(N.FRAMEBUFFER,ft);let Dt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await sf(N,Dt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ce),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,me),N.deleteBuffer(Ce),N.deleteSync(Dt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,k=0){let z=Math.pow(2,-k),H=Math.floor(S.image.width*z),me=Math.floor(S.image.height*z),Me=F!==null?F.x:0,pe=F!==null?F.y:0;_.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,k,0,0,Me,pe,H,me),ue.unbindTexture()};let im=N.createFramebuffer(),rm=N.createFramebuffer();this.copyTextureToTexture=function(S,F,k=null,z=null,H=0,me=0){let Me,pe,be,Te,He,We,Ce,ft,Dt,Pt=S.isCompressedTexture?S.mipmaps[me]:S.image;if(k!==null)Me=k.max.x-k.min.x,pe=k.max.y-k.min.y,be=k.isBox3?k.max.z-k.min.z:1,Te=k.min.x,He=k.min.y,We=k.isBox3?k.min.z:0;else{let Lt=Math.pow(2,-H);Me=Math.floor(Pt.width*Lt),pe=Math.floor(Pt.height*Lt),S.isDataArrayTexture?be=Pt.depth:S.isData3DTexture?be=Math.floor(Pt.depth*Lt):be=1,Te=0,He=0,We=0}z!==null?(Ce=z.x,ft=z.y,Dt=z.z):(Ce=0,ft=0,Dt=0);let pt=L.convert(F.format),Jt=L.convert(F.type),_e;F.isData3DTexture?(_.setTexture3D(F,0),_e=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(_.setTexture2DArray(F,0),_e=N.TEXTURE_2D_ARRAY):(_.setTexture2D(F,0),_e=N.TEXTURE_2D),ue.activeTexture(N.TEXTURE0),ue.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),ue.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),ue.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);let Mn=ue.getParameter(N.UNPACK_ROW_LENGTH),nt=ue.getParameter(N.UNPACK_IMAGE_HEIGHT),Cn=ue.getParameter(N.UNPACK_SKIP_PIXELS),Kn=ue.getParameter(N.UNPACK_SKIP_ROWS),Li=ue.getParameter(N.UNPACK_SKIP_IMAGES);ue.pixelStorei(N.UNPACK_ROW_LENGTH,Pt.width),ue.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Pt.height),ue.pixelStorei(N.UNPACK_SKIP_PIXELS,Te),ue.pixelStorei(N.UNPACK_SKIP_ROWS,He),ue.pixelStorei(N.UNPACK_SKIP_IMAGES,We);let Nr=S.isDataArrayTexture||S.isData3DTexture,mt=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){let Lt=T.get(S),Ni=T.get(F),yt=T.get(Lt.__renderTarget),Fi=T.get(Ni.__renderTarget);ue.bindFramebuffer(N.READ_FRAMEBUFFER,yt.__webglFramebuffer),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,Fi.__webglFramebuffer);for(let Fr=0;Fr<be;Fr++)Nr&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(S).__webglTexture,H,We+Fr),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(F).__webglTexture,me,Dt+Fr)),N.blitFramebuffer(Te,He,Me,pe,Ce,ft,Me,pe,N.DEPTH_BUFFER_BIT,N.NEAREST);ue.bindFramebuffer(N.READ_FRAMEBUFFER,null),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||S.isRenderTargetTexture||T.has(S)){let Lt=T.get(S),Ni=T.get(F);ue.bindFramebuffer(N.READ_FRAMEBUFFER,im),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,rm);for(let yt=0;yt<be;yt++)Nr?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Lt.__webglTexture,H,We+yt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Lt.__webglTexture,H),mt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ni.__webglTexture,me,Dt+yt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ni.__webglTexture,me),H!==0?N.blitFramebuffer(Te,He,Me,pe,Ce,ft,Me,pe,N.COLOR_BUFFER_BIT,N.NEAREST):mt?N.copyTexSubImage3D(_e,me,Ce,ft,Dt+yt,Te,He,Me,pe):N.copyTexSubImage2D(_e,me,Ce,ft,Te,He,Me,pe);ue.bindFramebuffer(N.READ_FRAMEBUFFER,null),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else mt?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(_e,me,Ce,ft,Dt,Me,pe,be,pt,Jt,Pt.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(_e,me,Ce,ft,Dt,Me,pe,be,pt,Pt.data):N.texSubImage3D(_e,me,Ce,ft,Dt,Me,pe,be,pt,Jt,Pt):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,me,Ce,ft,Me,pe,pt,Jt,Pt.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,me,Ce,ft,Pt.width,Pt.height,pt,Pt.data):N.texSubImage2D(N.TEXTURE_2D,me,Ce,ft,Me,pe,pt,Jt,Pt);ue.pixelStorei(N.UNPACK_ROW_LENGTH,Mn),ue.pixelStorei(N.UNPACK_IMAGE_HEIGHT,nt),ue.pixelStorei(N.UNPACK_SKIP_PIXELS,Cn),ue.pixelStorei(N.UNPACK_SKIP_ROWS,Kn),ue.pixelStorei(N.UNPACK_SKIP_IMAGES,Li),me===0&&F.generateMipmaps&&N.generateMipmap(_e),ue.unbindTexture()},this.initRenderTarget=function(S){T.get(S).__webglFramebuffer===void 0&&_.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?_.setTextureCube(S,0):S.isData3DTexture?_.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?_.setTexture2DArray(S,0):_.setTexture2D(S,0),ue.unbindTexture()},this.resetState=function(){W=0,X=0,O=null,ue.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}};var hi={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var cn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},G_=new vr(-1,1,1,-1,0,1),nh=class extends Qe{constructor(){super(),this.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qe([0,2,0,0,2,0],2))}},W_=new nh,Ln=class{constructor(e){this._mesh=new it(W_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,G_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Ms=class extends cn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ye?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Tn.clone(e.uniforms),this.material=new Ye({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ln(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Da=class extends cn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},fc=class extends cn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var pc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new he);this._width=i.width,this._height=i.height,t=new xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:wt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ms(hi),this.copyPass.material.blending=mn,this.timer=new _r}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let r=0,s=this.passes.length;r<s;r++){let a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Da!==void 0&&(a instanceof Da?i=!0:a instanceof fc&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new he);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var mc=class extends cn{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ee}render(e,t,i){let r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}};var zf={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ee(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Ss=class n extends cn{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new he(e.x,e.y):new he(256,256),this.clearColor=new Ee(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new xt(s,a,{type:wt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new xt(s,a,{type:wt});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new xt(s,a,{type:wt});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),a=Math.round(a/2)}let o=zf;this.highPassUniforms=Tn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ye({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new he(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Tn.clone(hi.uniforms),this.blendMaterial=new Ye({uniforms:this.copyUniforms,vertexShader:hi.vertexShader,fragmentShader:hi.fragmentShader,premultipliedAlpha:!0,blending:st,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ee,this._oldClearAlpha=1,this._basic=new ln,this._fsQuad=new Ln(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new he(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new Ye({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new he(.5,.5)},direction:{value:new he(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Ye({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Ss.BlurDirectionX=new he(1,0);Ss.BlurDirectionY=new he(0,1);var gc={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

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

		}`};var xc=class extends cn{constructor(e=.96){super(),this.uniforms=Tn.clone(gc.uniforms),this.damp=e,this.compFsMaterial=new Ye({uniforms:this.uniforms,vertexShader:gc.vertexShader,fragmentShader:gc.fragmentShader}),this.copyFsMaterial=new Ye({uniforms:Tn.clone(hi.uniforms),vertexShader:hi.vertexShader,fragmentShader:hi.fragmentShader,blending:mn,depthTest:!1,depthWrite:!1}),this._textureComp=new xt(window.innerWidth,window.innerHeight,{magFilter:Nt,type:wt}),this._textureOld=new xt(window.innerWidth,window.innerHeight,{magFilter:Nt,type:wt}),this._compFsQuad=new Ln(this.compFsMaterial),this._copyFsQuad=new Ln(this.copyFsMaterial)}get damp(){return this.uniforms.damp.value}set damp(e){this.uniforms.damp.value=e}render(e,t,i){this.uniforms.tOld.value=this._textureOld.texture,this.uniforms.tNew.value=i.texture,e.setRenderTarget(this._textureComp),this._compFsQuad.render(e),this._copyFsQuad.material.uniforms.tDiffuse.value=this._textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this._copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._copyFsQuad.render(e));let r=this._textureOld;this._textureOld=this._textureComp,this._textureComp=r}setSize(e,t){this._textureComp.setSize(e,t),this._textureOld.setSize(e,t)}dispose(){this._textureComp.dispose(),this._textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this._compFsQuad.dispose(),this._copyFsQuad.dispose()}};var Hf=`

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`;var Vf=`
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
`;var Gf=new Map([[ma,"LINEAR_TONE_MAPPING"],[ga,"REINHARD_TONE_MAPPING"],[xa,"CINEON_TONE_MAPPING"],[yr,"ACES_FILMIC_TONE_MAPPING"],[_a,"AGX_TONE_MAPPING"],[ya,"NEUTRAL_TONE_MAPPING"],[va,"CUSTOM_TONE_MAPPING"]]),vc={name:"DitheredOutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1},ditherSeed:{value:null}},vertexShader:`
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

    ${Vf}
    ${Hf}

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
  `};function X_(){let n=[...Gf.keys()];if(n.some(e=>!Number.isInteger(e))||new Set(n).size!==n.length||typeof je!="string"||je.length===0||typeof Xe?.getTransfer!="function"||typeof Tn?.clone!="function"||typeof xr!="function"||typeof Ln!="function")throw new Error("DitheredOutputPass requires the three r184 OutputPass API.")}function kf(n){if(!Number.isFinite(n)||!Number.isInteger(n)||n<0||n>255)throw new TypeError("DitheredOutputPass seed must be an integer from 0 through 255.")}X_();var _c=class extends cn{constructor(e){super(),kf(e),this.isDitheredOutputPass=!0,this.isOutputPass=!0,this.uniforms=Tn.clone(vc.uniforms),this.uniforms.ditherSeed.value=e,this.material=new xr({name:vc.name,uniforms:this.uniforms,vertexShader:vc.vertexShader,fragmentShader:vc.fragmentShader}),this._fsQuad=new Ln(this.material),this._outputColorSpace=null,this._toneMapping=null}setSeed(e){return kf(e),this.uniforms.ditherSeed.value=e,this}render(e,t,i){if(this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping){this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Xe.getTransfer(this._outputColorSpace)===je&&(this.material.defines.SRGB_TRANSFER="");let r=Gf.get(this._toneMapping);r!==void 0&&(this.material.defines[r]=""),this.material.needsUpdate=!0}if(this.renderToScreen===!0){e.setRenderTarget(null),this._fsQuad.render(e);return}e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}};function Wf(n,e,t){if(!Number.isFinite(n)||n<0)throw new RangeError("Ninth Tide media time must be a non-negative finite number.");if(!Number.isFinite(e)||e<=0)throw new RangeError("Ninth Tide media duration must be a positive finite number.");if(!Number.isFinite(t)||t<=0)throw new RangeError("Ninth Tide score duration must be a positive finite number.");return Math.min(n,e)/e*t}var q_=new Set(["full","band"]);function bs(n,e){if(!Number.isFinite(n)||n<=0)throw new RangeError(`${e} must be a positive finite number.`)}function Yf(){let n=null;return{advance:i=>{if(!Number.isFinite(i)||i<0)throw new RangeError("currentTime must be a non-negative finite number.");if(n===null||i<n)return n=i,0;let r=i-n;return r>0&&(n=i),r},reset:()=>{n=null}}}function Xf(n){let e=0,t=0,i=!1,r=null,s=[],a=0,o=0;return{reset:()=>{e=0,t=0,i=!1,r=null,s.length=0,a=0,o=0},update:(h,d)=>{e+=d;let u=1-Math.exp(-n.lowpassLambda*d);t=i?t+(h-t)*u:h,i=!0;let f=!1,g=0;if(r){if(f=r.warmed&&r.value>=n.minFlux&&r.value>r.leftValue&&r.value>=t&&r.value>r.threshold,f){let E=Math.max(r.threshold,n.minFlux);g=Math.min(1,Math.max(0,(r.value-r.threshold)/E))}s.push({time:r.time,value:r.value}),a+=r.value,o+=r.value*r.value}let v=e-n.historySeconds;for(;s.length>0&&s[0].time<v;){let E=s.shift();a-=E.value,o-=E.value*E.value}let p=s.length,m=p>0?a/p:0,M=p>0?Math.max(0,o/p-m*m):0,w=Math.sqrt(M),b=p>=n.minSamples&&e>=n.warmupSeconds,C=m+n.thresholdStdDeviations*w;return r={leftValue:r?.value??Number.NEGATIVE_INFINITY,threshold:C,time:e,value:t,warmed:b},{onset:f,strength:g,rawFlux:h,flux:t,threshold:C,mean:m,standardDeviation:w,sampleCount:p,warmed:b}}}}function qf(){return{onset:!1,strength:0,rawFlux:0,flux:0,threshold:0,mean:0,standardDeviation:0,sampleCount:0,warmed:!1}}function Zf(n){if(!n||typeof n!="object")throw new TypeError("Spectral flux onset config is required.");if(bs(n.historySeconds,"historySeconds"),bs(n.warmupSeconds,"warmupSeconds"),bs(n.thresholdStdDeviations,"thresholdStdDeviations"),bs(n.lowpassLambda,"lowpassLambda"),bs(n.minFlux,"minFlux"),!Number.isInteger(n.minSamples)||n.minSamples<2)throw new RangeError("minSamples must be an integer of at least 2.");let e=Xf(n),t=Xf(n),i=null,r=()=>{i=null,e.reset(),t.reset()};return{reset:r,update:(a,o,l)=>{if(!(a instanceof Uint8Array)||a.length===0)throw new TypeError("spectrum must be a non-empty Uint8Array.");if(bs(o,"dtSeconds"),!l||typeof l!="object")throw new TypeError("Spectral flux onset update options are required.");let{bandStartIndex:c,selectedPath:h}=l;if(!Number.isInteger(c)||c<0||c>=a.length)throw new RangeError("bandStartIndex must address the supplied spectrum.");if(!q_.has(h))throw new RangeError("selectedPath must be 'full' or 'band'.");if(!i||i.length!==a.length){r(),i=new Uint8Array(a);let p=qf(),m=qf();return{onset:!1,strength:0,selectedPath:h,primed:!1,full:p,band:m}}let d=0,u=0;for(let p=0;p<a.length;p++){let m=Math.max(0,a[p]-i[p])/255;d+=m,p>=c&&(u+=m)}d/=a.length,u/=a.length-c,i.set(a);let f=e.update(d,o),g=t.update(u,o),v=h==="band"?g:f;return{onset:v.onset,strength:v.strength,selectedPath:h,primed:!0,full:f,band:g}}}}var La=Object.freeze([5.35,4.1,4.35,4,4.9,4.5,4.2,4.05,4.3]),jf=.1,Y_=Object.freeze({desktop:Object.freeze({system:5,user:3}),mobile:Object.freeze({system:2,user:2})}),Qf=new Set(["auto","system","user"]),ep=new WeakMap;function ih(n,e){if(!Number.isFinite(n))throw new RangeError(`${e} must be a finite number.`)}function yc(n,e){if(ih(n,e),n<0)throw new RangeError(`${e} must be non-negative.`)}function rh(n){if(!Number.isInteger(n)||n<0||n>=La.length)throw new RangeError(`mode must be an integer from 0 through ${La.length-1}.`)}function wr(n){let e=ep.get(n);if(!e)throw new TypeError("A pulse history created by createPulseHistory is required.");return e}function $f(n){return n===null?null:{...n}}function Jf(n){return n===null?null:Object.freeze({...n})}function tp(n,e){return n!==null&&e-n.startTime<La[n.mode]}function np(n,e){return n.queueAdvanceStartedAt!==null&&n.clockSeconds-n.queueAdvanceStartedAt<jf&&e.serial<n.queueAdvanceSerial?.5:1}function ip(n,e){let t=n.clockSeconds-e.startTime;return Object.freeze({age:t,originX:e.originX,originZ:e.originZ,sourceY:e.sourceY,screenX:e.screenX,screenY:e.screenY,startTime:e.startTime,strength:e.strength,mode:e.mode,source:e.source,serial:e.serial,contributionScale:np(n,e),lifetime:La[e.mode]})}function Kf(n,e,t,i,r){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new TypeError(`${e}Slots[${r}] must be a pulse slot or null.`);if(!Qf.has(n.source)||(e==="user"?n.source!=="user":n.source==="user"))throw new RangeError(`${e}Slots[${r}] has an invalid source.`);for(let s of["originX","originZ","sourceY","screenX","screenY","startTime","strength"])ih(n[s],`${e}Slots[${r}].${s}`);if(n.startTime<0||n.startTime>t)throw new RangeError(`${e}Slots[${r}].startTime is outside the history clock.`);if(n.strength<=0)throw new RangeError(`${e}Slots[${r}].strength must be positive.`);if(rh(n.mode),!Number.isInteger(n.serial)||n.serial<1||n.serial>=i)throw new RangeError(`${e}Slots[${r}].serial is invalid.`)}}function Z_(n,e){if(!n||typeof n!="object"||Array.isArray(n))throw new TypeError("A pulse history snapshot is required.");if(n.tier!==e.tier)throw new RangeError(`Snapshot tier must be '${e.tier}'.`);if(yc(n.clockSeconds,"snapshot.clockSeconds"),!Number.isInteger(n.nextSerial)||n.nextSerial<1)throw new RangeError("snapshot.nextSerial must be a positive integer.");if(!Number.isInteger(n.systemCursor)||n.systemCursor<0||n.systemCursor>=e.systemCapacity)throw new RangeError("snapshot.systemCursor is invalid.");if(!Number.isInteger(n.userCursor)||n.userCursor<0||n.userCursor>=e.userCapacity)throw new RangeError("snapshot.userCursor is invalid.");if(!Array.isArray(n.systemSlots)||n.systemSlots.length!==e.systemCapacity||!Array.isArray(n.userSlots)||n.userSlots.length!==e.userCapacity)throw new RangeError("Snapshot ring capacities do not match the pulse history tier.");if(n.systemSlots.forEach((t,i)=>{Kf(t,"system",n.clockSeconds,n.nextSerial,i)}),n.userSlots.forEach((t,i)=>{Kf(t,"user",n.clockSeconds,n.nextSerial,i)}),n.queueAdvanceStartedAt===null){if(n.queueAdvanceSerial!==0)throw new RangeError("An inactive queue advance must have serial 0.")}else{if(yc(n.queueAdvanceStartedAt,"snapshot.queueAdvanceStartedAt"),n.queueAdvanceStartedAt>n.clockSeconds)throw new RangeError("snapshot.queueAdvanceStartedAt cannot exceed the history clock.");if(!Number.isInteger(n.queueAdvanceSerial)||n.queueAdvanceSerial<1||n.queueAdvanceSerial>=n.nextSerial)throw new RangeError("snapshot.queueAdvanceSerial is invalid.")}}function $_(n,e){yc(n,"age"),rh(e);let t=Math.min(1,n/La[e]);return 1-t*t*(3-2*t)}function rp(n){let e=Y_[n];if(!e)throw new RangeError("tier must be 'desktop' or 'mobile'.");let t=Object.freeze({tier:n,systemCapacity:e.system,userCapacity:e.user,totalCapacity:e.system+e.user});return ep.set(t,{tier:n,systemCapacity:e.system,userCapacity:e.user,systemSlots:Array(e.system).fill(null),userSlots:Array(e.user).fill(null),systemCursor:0,userCursor:0,clockSeconds:0,nextSerial:1,queueAdvanceStartedAt:null,queueAdvanceSerial:0}),t}function Mc(n){let e=wr(n);e.systemSlots.fill(null),e.userSlots.fill(null),e.systemCursor=0,e.userCursor=0,e.clockSeconds=0,e.nextSerial=1,e.queueAdvanceStartedAt=null,e.queueAdvanceSerial=0}function sp(n,e){let t=wr(n);if(!e||typeof e!="object"||Array.isArray(e))throw new TypeError("pulse must be an object.");if(!Qf.has(e.source))throw new RangeError("source must be 'auto', 'system', or 'user'.");for(let c of["originX","originZ","sourceY","screenX","screenY","strength"])ih(e[c],c);if(e.strength<=0)throw new RangeError("strength must be positive.");rh(e.mode);let i=e.source==="user"?"user":"system",r=t[`${i}Slots`],s=`${i}Cursor`,a=t[s],o=r[a]!==null,l={originX:e.originX,originZ:e.originZ,sourceY:e.sourceY,screenX:e.screenX,screenY:e.screenY,startTime:t.clockSeconds,strength:e.strength,mode:e.mode,source:e.source,serial:t.nextSerial++};return r[a]=l,t[s]=(a+1)%r.length,o&&(t.queueAdvanceStartedAt=t.clockSeconds,t.queueAdvanceSerial=l.serial),ip(t,l)}function ap(n,e){let t=wr(n);return yc(e,"dtSeconds"),e===0||(t.clockSeconds+=e,t.queueAdvanceStartedAt!==null&&t.clockSeconds-t.queueAdvanceStartedAt>=jf&&(t.queueAdvanceStartedAt=null,t.queueAdvanceSerial=0)),t.clockSeconds}function ws(n){let e=wr(n),t=[];for(let i of[...e.systemSlots,...e.userSlots])tp(i,e.clockSeconds)&&t.push(ip(e,i));return Object.freeze(t)}function op(n){let e=wr(n),t=[...e.systemSlots,...e.userSlots].map(i=>{let r=tp(i,e.clockSeconds)?1:0;return Object.freeze(i===null?{originX:0,sourceY:0,originZ:0,startTime:0,strength:0,mode:0,contributionScale:1,active:r}:{originX:i.originX,sourceY:i.sourceY,originZ:i.originZ,startTime:i.startTime,strength:i.strength,mode:i.mode,contributionScale:np(e,i),active:r})});return Object.freeze({clockSeconds:e.clockSeconds,slots:Object.freeze(t)})}function lp(n){let e=null,t=Number.NEGATIVE_INFINITY;for(let i of ws(n)){let r=i.strength*$_(i.age,i.mode),s=e!==null&&r===t&&(i.startTime>e.startTime||i.startTime===e.startTime&&i.serial>e.serial);(r>t||s)&&(e=i,t=r)}return e===null?null:Object.freeze({...e,contribution:t})}function cp(n){let e=null;for(let t of ws(n))(e===null||t.startTime>e.startTime||t.startTime===e.startTime&&t.serial>e.serial)&&(e=t);return e}function sh(n){let e=wr(n);return Object.freeze({tier:e.tier,clockSeconds:e.clockSeconds,nextSerial:e.nextSerial,systemCursor:e.systemCursor,userCursor:e.userCursor,queueAdvanceStartedAt:e.queueAdvanceStartedAt,queueAdvanceSerial:e.queueAdvanceSerial,systemSlots:Object.freeze(e.systemSlots.map(Jf)),userSlots:Object.freeze(e.userSlots.map(Jf))})}function up(n,e){let t=wr(n);Z_(e,t),t.clockSeconds=e.clockSeconds,t.nextSerial=e.nextSerial,t.systemCursor=e.systemCursor,t.userCursor=e.userCursor,t.queueAdvanceStartedAt=e.queueAdvanceStartedAt,t.queueAdvanceSerial=e.queueAdvanceSerial,t.systemSlots=e.systemSlots.map($f),t.userSlots=e.userSlots.map($f)}var et=n=>document.querySelector(n),J_=n=>[...document.querySelectorAll(n)],vt=sc.clamp,$n=sc.lerp,un=(n,e,t,i)=>$n(n,e,1-Math.exp(-t*i)),Mt=(n,e,t)=>{let i=vt((t-n)/Math.max(1e-6,e-n),0,1);return i*i*(3-2*i)},tr=(n,e,t)=>{let i=vt((t-n)/Math.max(1e-6,e-n),0,1);return i*i*i*(i*(i*6-15)+10)},K={gate:et("#gate"),enter:et("#enterBtn"),silent:et("#silentBtn"),replay:et("#replayBtn"),file:et("#fileInput"),fileLabel:et("#fileLabel"),hint:et("#gateHint"),ritualCaption:et("#ritualCaption"),ritualIndex:et("#ritualIndex"),ritualMain:et("#ritualMain"),ritualSub:et("#ritualSub"),phaseNumber:et("#phaseNumber"),phaseName:et("#phaseName"),phaseSub:et("#phaseSub"),sideTicks:J_("#sideIndex i"),coreState:et("#coreState"),fieldState:et("#fieldState"),depth:et("#depthValue"),coord:et("#coordValue"),index:et("#indexValue"),signal:et("#signalState"),mode:et("#modeState"),audioState:et("#audioState"),timeNow:et("#timeNow"),timeTotal:et("#timeTotal"),low:et("#bandLow"),mid:et("#bandMid"),high:et("#bandHigh"),runtimeStatus:et("#runtimeStatus"),archiveProgress:et("#archiveProgress"),cursor:et("#cursor"),message:et("#message"),audio:et("#audio"),unsupported:et("#unsupported")},pp=matchMedia("(pointer: coarse)").matches,ot=pp||innerWidth<820,uh=matchMedia("(prefers-reduced-motion: reduce)").matches,Sc=new URLSearchParams(location.search),mp=window.__NINTH_TIDE_PREVIEW__,Lr=Sc.has("preview")||mp!==void 0,gp=7,xn=rp(ot?"mobile":"desktop"),rn=ot?4:8,xp=Array.from({length:rn},()=>new gt),vp=Array.from({length:rn},()=>new gt),Ps=`
  uniform vec4 uPulses[${rn}];
  uniform vec4 uPulseMeta[${rn}];
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
`;function K_(n){let e=n>>>0,t=function(){let i=e=e+1831565813>>>0;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296};return t.getState=()=>e,t.setState=i=>{if(!Number.isInteger(i)||i<0||i>4294967295)throw new RangeError("Ninth Tide random state must be a uint32.");e=i>>>0},t}var Sh=K_(9545716),Pe=(n=0,e=1)=>n+(e-n)*Sh(),pi=n=>n-Math.floor(n);function Fa(n){if(!Number.isFinite(n))return"00:00";let e=Math.floor(n/60),t=Math.floor(n%60);return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function vn(n,e=1700){K.message.textContent=n,K.message.classList.add("show"),clearTimeout(vn.timer),Lc||(vn.timer=setTimeout(()=>K.message.classList.remove("show"),e))}function Is(n){K.runtimeStatus.textContent!==n&&(K.runtimeStatus.textContent=n)}var Ua=[["I","\u65E0\u6708\u6D4B\u6DF1","MOONLESS SOUNDING"],["II","\u76D0\u661F\u4E0B\u6C89","SALT STARS SINKING"],["III","\u77F3\u82F1\u68A6\u8BED","QUARTZ DREAMS"],["IV","\u95E8\u540E\u4E4B\u6D77","THE SEA BEHIND THE DOOR"],["V","\u672A\u8BDE\u4E4B\u57CE","THE UNBORN CITY"],["VI","\u9006\u6F6E\u9057\u9AB8","RELICS AGAINST THE TIDE"],["VII","\u9ED1\u6C34\u5BC6\u5377","THE BLACKWATER CODEX"],["VIII","\u6DF1\u6E0A\u56DE\u89C6","THE ABYSS LOOKS BACK"],["IX","\u65E0\u5CB8\u957F\u591C","THE SHORELESS NIGHT"]],Pi=[0,48.9709,75.0469,103.0966,145.2408,183.8092,224.8853,260.226,330.0484,354.504],Va=Pi[Pi.length-1],j_=2.85,Q_=Object.freeze({historySeconds:1.25,warmupSeconds:1,thresholdStdDeviations:1.5,lowpassLambda:30,minFlux:.012,minSamples:2}),hp=190,ey=Object.freeze(["full","full","full","full","full","full","full","band","full"]),Cr=[{deep:67081,fog:201753,glow:6806990,accent:14940393,secondary:1860720},{deep:67341,fog:268072,glow:5553888,accent:14021375,secondary:2640515},{deep:198665,fog:1057052,glow:9296047,accent:15986121,secondary:4944722},{deep:197899,fog:1381414,glow:9676287,accent:15198975,secondary:5326978},{deep:329481,fog:2170130,glow:14207097,accent:16773820,secondary:6705956},{deep:67592,fog:598303,glow:6543552,accent:14285036,secondary:2649445},{deep:328459,fog:1970728,glow:12746467,accent:15849720,secondary:7093116},{deep:67338,fog:794144,glow:8640956,accent:15267292,secondary:4287325},{deep:1029,fog:595993,glow:11135177,accent:16773575,secondary:5798244}].map(n=>Object.fromEntries(Object.entries(n).map(([e,t])=>[e,new Ee(t)]))),Fe;try{Fe=new uc({antialias:!ot,powerPreference:"high-performance",alpha:!1,preserveDrawingBuffer:Lr})}catch(n){throw console.error(n),K.unsupported.style.display="grid",n}Fe.setSize(innerWidth,innerHeight);Fe.setPixelRatio(Math.min(devicePixelRatio,ot?1.15:1.6));Fe.outputColorSpace=Qt;Fe.toneMapping=yr;Fe.toneMappingExposure=.05;Fe.setClearColor(772,1);et("#scene").appendChild(Fe.domElement);var hn=new js;hn.background=new Ee(772);hn.fog=new Ks(201496,.021);var $t=new qt(48,innerWidth/innerHeight,.08,85);$t.position.set(0,.75,13.6);var sn=new fn;hn.add(sn);var As=new _r;As.connect(document);var Zn=new he,ji=new he,Oa=new ds,hh=new I,gn=64,Nn=new Uint8Array(gn),ir=new pr(Nn,gn,1,gs,en);ir.magFilter=Ut;ir.minFilter=Ut;ir.wrapS=wn;ir.wrapT=wn;ir.needsUpdate=!0;var x={entered:!1,calibrated:!1,ceremonyTime:-1,ceremonyCue:0,ritual:0,ignite:0,lightLevel:0,shutdown:0,ending:!1,ended:!1,endingCue:0,previewMode:"",previewSection:gp,audioReady:!1,playing:!1,muted:!1,audioFailed:!1,archiveOpen:0,archiveOpenTarget:0,pulseCooldown:0,low:0,mid:0,high:0,rms:0,energy:0,transient:0,previousEnergy:0,tideFloat:0,tideIndex:0,transitionFrom:0,pendingTide:-1,phaseLocal:0,phaseTransition:0,transitionClock:99,transitionSwitched:!1,dive:.12,diveTarget:.12,yaw:0,yawTarget:0,pitch:.07,pitchTarget:.07,dragging:!1,dragDistance:0,lastPointerX:0,lastPointerY:0,activeSeconds:0,syntheticPhase:0,coreHovered:!1},te={time:{value:0},low:{value:0},mid:{value:0},high:{value:0},rms:{value:0},energy:{value:0},transient:{value:0},ritual:{value:0},ignite:{value:0},shutdown:{value:0},uPulseClock:{value:0},uPulses:{value:xp},uPulseMeta:{value:vp},open:{value:0},tide:{value:0},section:{value:0},sectionLocal:{value:0},phaseTransition:{value:0},pixelRatio:{value:Fe.getPixelRatio()},resolution:{value:new he(innerWidth*Fe.getPixelRatio(),innerHeight*Fe.getPixelRatio())},spectrum:{value:ir},deepColor:{value:Cr[0].deep.clone()},fogColor:{value:Cr[0].fog.clone()},glowColor:{value:Cr[0].glow.clone()},accentColor:{value:Cr[0].accent.clone()},secondaryColor:{value:Cr[0].secondary.clone()}},dn=(n={})=>({...te,...n}),ka={pulseAge:{value:99},pulseStrength:{value:0}},Qi={pulseAge:{value:99},pulseStrength:{value:0},pulseScreen:{value:new he(.5,.5)},sonarMode:{value:0}},Er={pulseAge:{value:99},pulseStrength:{value:0}};function bh(n){if(!Number.isInteger(n)||n<0||n>rn)throw new RangeError(`Ninth Tide live pulse count must be an integer from 0 through ${rn}.`);return 1/(1+Math.max(0,n-1)*.55)}function Ds(){let n=op(xn);if(n.slots.length!==rn)throw new Error(`Ninth Tide pulse history exposed ${n.slots.length} slots; expected ${rn}.`);te.uPulseClock.value=n.clockSeconds;let e=bh(n.slots.reduce((r,s)=>r+s.active,0));n.slots.forEach((r,s)=>{xp[s].set(r.originX,r.sourceY,r.originZ,r.startTime),vp[s].set(r.strength,r.mode,r.contributionScale,r.active*e)});let t=x.shutdown>.5?null:cp(xn);ka.pulseAge.value=t?.age??99,ka.pulseStrength.value=t?t.strength*t.contributionScale*Math.exp(-t.age*.34):0;let i=x.shutdown>.5?null:lp(xn);return Qi.pulseAge.value=i?.age??99,Qi.pulseStrength.value=i?i.strength*i.contributionScale*Math.exp(-i.age*.34):0,Qi.pulseScreen.value.set(i?.screenX??.5,i?.screenY??.5),Qi.sonarMode.value=i?.mode??0,t}function ty(){let n=document.createElement("canvas");n.width=n.height=256;let e=n.getContext("2d"),t=e.createRadialGradient(128,128,0,128,128,128);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.07,"rgba(210,255,246,.74)"),t.addColorStop(.28,"rgba(88,224,206,.22)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,256,256);let i=new sa(n);return i.colorSpace=Qt,i}var _p=ty(),ny=new Ye({side:Yt,depthWrite:!1,uniforms:dn(),vertexShader:`
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
  `}),iy=new it(new gr(42,64,36),ny);sn.add(iy);var ry=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
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
    ${Ps}
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
      for (int pulseIndex = 0; pulseIndex < ${rn}; pulseIndex++) {
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
  `}),$a=new it(new oa(16,256),ry);$a.rotation.x=-Math.PI/2;$a.position.y=-2.36;$a.renderOrder=1;sn.add($a);var bc=new us({color:67595,roughness:.22,metalness:.9,emissive:202520,emissiveIntensity:.12,transparent:!0,opacity:.78}),yp=new it(new mr(4.25,4.7,.22,128),bc);yp.position.y=-2.49;sn.add(yp);var wh=[];for(let n of[2.65,3.55,4.55]){let e=new it(new li(n,n===4.55?.012:.006,5,256),new ln({color:6543559,transparent:!0,opacity:.11,blending:st,depthWrite:!1}));e.rotation.x=Math.PI/2,e.position.y=-2.34,wh.push(e),sn.add(e)}function sy(){let n=ot?45:81,e=[];for(let t=0;t<n;t++){let i;t<9?i=0:t<Math.floor(n*.45)?i=1:i=2;let r=i===0?0:i===1?9:Math.floor(n*.45),s=i===0?9:i===1?Math.floor(n*.45)-9:n-Math.floor(n*.45),a=(t-r)/Math.max(1,s)*Math.PI*2+Pe(-.16,.16),o=Math.atan2(Math.sin(a-Math.PI/2),Math.cos(a-Math.PI/2)),l=i===0?.34:.54;Math.abs(o)<l&&(a+=(o>=0?1:-1)*(l-Math.abs(o)+Pe(.07,.24)));let c=i===0?Pe(5.15,6.2):i===1?Pe(8,13.8):Pe(14.5,24.5),h=Pe(i===2?.65:.5,i===2?1.8:1.35),d=Pe(.36,i===2?1.16:.86),u=Pe(i===0?1.2:1.7,i===2?7:5.1),f=new I(Math.cos(a)*c,-2.31+u*.5+Pe(-.08,i===2?.72:.34),Math.sin(a)*c),g=-a+Math.PI/2+Pe(-.18,.18),v=vt((c-4.9)/20.2,0,1),p=pi((t*.61803398875+i*.13)*.97);e.push({center:f,rotation:g,width:h,height:u,depth:d,order:v,band:p,seed:Pe(0,1e3),tier:i})}return e}var Mp=sy();function Sp(n,e,t,i){let r=Math.cos(n.rotation),s=Math.sin(n.rotation);return new I(n.center.x+e*r-i*s,n.center.y+t,n.center.z+e*s+i*r)}function ay(n){let e=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],t=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],i=n.length*t.length*2,r=new Float32Array(i*3),s=new Float32Array(i*3),a=new Float32Array(i),o=new Float32Array(i),l=new Float32Array(i),c=0;for(let d of n)for(let u of t)for(let f of u){let g=e[f],v=Sp(d,g[0]*d.width,g[1]*d.height,g[2]*d.depth);r[c*3]=v.x,r[c*3+1]=v.y,r[c*3+2]=v.z,s[c*3]=d.center.x,s[c*3+1]=d.center.y,s[c*3+2]=d.center.z,a[c]=d.band,o[c]=d.order,l[c]=d.seed,c++}let h=new Qe;return h.setAttribute("position",new De(r,3)),h.setAttribute("aCenter",new De(s,3)),h.setAttribute("aBand",new De(a,1)),h.setAttribute("aOrder",new De(o,1)),h.setAttribute("aSeed",new De(l,1)),h}var oy=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
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
    ${Ps}
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
      for (int pulseIndex = 0; pulseIndex < ${rn}; pulseIndex++) {
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
  `}),ly=new Gn(ay(Mp),oy);sn.add(ly);function cy(n){let e=ot?72:156,t=n.length*e,i=new Float32Array(t*3),r=new Float32Array(t*3),s=new Float32Array(t),a=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t),c=0;for(let u=0;u<n.length;u++){let f=n[u];for(let g=0;g<e;g++){let v=pi((g+1)*.754877666+f.seed*.013),p=pi((g+1)*.569840296+f.seed*.021),m=pi((g+1)*.438579021+f.seed*.034),M=(v-.5)*f.width*.82,w=(p-.5)*f.height*.88,b=(m-.5)*f.depth*.78,C=Sp(f,M,w,b);i[c*3]=C.x,i[c*3+1]=C.y,i[c*3+2]=C.z,r[c*3]=f.center.x,r[c*3+1]=f.center.y,r[c*3+2]=f.center.z,s[c]=vt(f.band+(v-.5)*.035,0,1),a[c]=f.order,o[c]=pi(f.seed*.17+g*.6180339),l[c]=Pe(.72,2.25),c++}}let h=new Qe;h.setAttribute("position",new De(i,3)),h.setAttribute("aCenter",new De(r,3)),h.setAttribute("aBand",new De(s,1)),h.setAttribute("aOrder",new De(a,1)),h.setAttribute("aSeed",new De(o,1)),h.setAttribute("aSize",new De(l,1));let d=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
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
      ${Ps}
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
        for (int pulseIndex = 0; pulseIndex < ${rn}; pulseIndex++) {
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
    `});return new ai(h,d)}var uy=cy(Mp);sn.add(uy);var bp=new fn;sn.add(bp);var wp=[],Ep=[],hy=new mr(.035,1.18,6.05,ot?20:40,1,!0);function dy(n,e,t,i){return new Ye({transparent:!0,depthWrite:!1,side:pn,blending:st,uniforms:dn({band:{value:n},order:{value:e},centerXZ:{value:new he(t.x,t.z)},seed:{value:i}}),vertexShader:`
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
      ${Ps}
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
        for (int pulseIndex = 0; pulseIndex < ${rn}; pulseIndex++) {
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
    `})}for(let n=0;n<9;n++){let e=n/9*Math.PI*2+.12,t=4.55+n%3*.18,i=new I(Math.cos(e)*t,3.72+Math.sin(e*2)*.16,Math.sin(e)*t),r=new fn;r.position.copy(i),r.rotation.y=-e+Math.PI/2,r.userData.angle=e,r.userData.seed=Pe(0,Math.PI*2),r.userData.band=(n+.5)/9,r.userData.order=n/8;let s=new it(hy,dy(r.userData.band,r.userData.order,i,r.userData.seed));s.position.y=-3.025,r.add(s);let a=new ln({color:7921615,transparent:!0,opacity:0,blending:st,depthWrite:!1}),o=new it(new li(.34,.012,5,96),a);o.rotation.x=Math.PI/2,r.add(o);let l=new it(new li(.27,.006,4,72),a.clone());l.rotation.y=Math.PI/2,r.add(l);let c=new os(new dr({map:_p,color:8250837,transparent:!0,opacity:0,blending:st,depthWrite:!1}));c.scale.set(.75,.75,1),r.add(c),Ep.push(i.x,9.8,i.z,i.x,3.78,i.z),bp.add(r),wp.push({root:r,beam:s,ring:o,crossRing:l,aperture:c,index:n})}var Tp=new Qe;Tp.setAttribute("position",new qe(Ep,3));var Eh=new si({color:7064507,transparent:!0,opacity:0,blending:st,depthWrite:!1}),fy=new Gn(Tp,Eh);sn.add(fy);var Ap=new Ye({transparent:!0,depthWrite:!1,side:pn,blending:st,uniforms:dn(ka),vertexShader:`
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
  `}),mi=new it(new gr(1,ot?36:64,ot?20:36),Ap);mi.visible=!1;sn.add(mi);var Di=new fn;sn.add(Di);var py=new Ye({transparent:!0,depthWrite:!1,side:pn,blending:st,uniforms:dn(ka),vertexShader:`
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
  `}),Ki=new it(new mr(1,1,1,ot?48:96,20,!0),py);Ki.visible=!1;Di.add(Ki);var dh=ot?48:96,Tr=new Float32Array(dh*2*3),Th=new Qe;Th.setAttribute("position",new De(Tr,3).setUsage(xs));var wc=new si({color:9300956,transparent:!0,opacity:0,blending:st,depthWrite:!1}),Ga=new Gn(Th,wc);Ga.visible=!1;Di.add(Ga);var fh=ot?28:48,Yn=new ia(new oi(.055,1,.055),new ln({color:7986639,transparent:!0,opacity:0,blending:st,depthWrite:!1}),fh);Yn.instanceMatrix.setUsage(xs);Yn.visible=!1;Di.add(Yn);var Na=new zt;function my(){let n=ot?9:13,e=n*n*n,t=new Float32Array(e*3),i=new Float32Array(e),r=new Float32Array(e),s=0;for(let l=0;l<n;l++)for(let c=0;c<n;c++)for(let h=0;h<n;h++)t[s*3]=(h/(n-1)-.5)*2,t[s*3+1]=(c/(n-1)-.5)*2,t[s*3+2]=(l/(n-1)-.5)*2,i[s]=pi((h+c*1.7+l*2.3)/n),r[s]=s*.731,s++;let a=new Qe;a.setAttribute("position",new De(t,3)),a.setAttribute("aBand",new De(i,1)),a.setAttribute("aSeed",new De(r,1));let o=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(ka),vertexShader:`
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
    `});return new ai(a,o)}var Ri=my();Ri.visible=!1;Di.add(Ri);var ph=ot?120:240,Ar=new Float32Array(ph*2*3),Ah=new Qe;Ah.setAttribute("position",new De(Ar,3).setUsage(xs));var Ec=new si({color:8840405,transparent:!0,opacity:0,blending:st,depthWrite:!1}),Wa=new Gn(Ah,Ec);Wa.visible=!1;Di.add(Wa);var fi=new fn;for(let n=0;n<9;n++){let e=new Gn(new la(new oi(1.9,1.15,.08)),new si({color:n===8?14807764:7526859,transparent:!0,opacity:0,blending:st,depthWrite:!1}));e.userData.index=n,fi.add(e)}fi.visible=!1;Di.add(fi);var Cp=Ap.clone();Cp.uniforms=dn(Er);var di=new it(new gr(1,ot?36:64,ot?20:36),Cp);di.visible=!1;Di.add(di);var qn=new it(new li(1,.025,6,ot?96:192),new ln({color:13037791,transparent:!0,opacity:0,blending:st,depthWrite:!1}));qn.visible=!1;Di.add(qn);var _n=new fn;_n.position.y=.34;sn.add(_n);var gy=new Ye({transparent:!0,uniforms:dn(),vertexShader:`
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
  `}),nr=new it(new cs(1.02,ot?4:5),gy);nr.userData.interactive="core";_n.add(nr);var Es=new it(new cs(1.28,2),new ln({color:9759452,wireframe:!0,transparent:!0,opacity:0,blending:st,depthWrite:!1}));_n.add(Es);var Xa=new os(new dr({map:_p,color:7660756,transparent:!0,opacity:0,blending:st,depthWrite:!1}));Xa.scale.set(5,5,1);_n.add(Xa);var Rp=[];for(let n=0;n<9;n++){let e=1.43+n*.235,t=new ln({color:n===8?15069137:7526857,transparent:!0,opacity:0,blending:st,depthWrite:!1}),i=new it(new li(e,n%3===0?.017:.007,5,ot?96:192),t);i.rotation.set(Pe(-1.1,1.1),Pe(-Math.PI,Math.PI),Pe(-1.1,1.1)),i.userData.speed=Pe(.032,.105)*(n%2?-1:1),i.userData.index=n,Rp.push(i),_n.add(i)}var mh=[],xy=new oi(.036,1.55,.28);for(let n=0;n<9;n++){let e=new us({color:398359,metalness:.92,roughness:.18,emissive:668722,emissiveIntensity:0,transparent:!0,opacity:0}),t=new it(xy,e),i=n/9*Math.PI*2;t.userData.angle=i,t.position.set(Math.cos(i)*1.02,Math.sin(i*2)*.09,Math.sin(i)*1.02),t.rotation.set(Math.sin(i)*.28,-i,Math.cos(i)*.22),mh.push(t),_n.add(t)}function vy(n){let e=new Qe,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n);for(let o=0;o<n;o++){let l=o%9,c=Pe(0,Math.PI*2),h=1.8+l*.22+Pe(-.1,.38);t[o*3]=Math.cos(c)*h,t[o*3+1]=Pe(-2.2,2.2)+Math.sin(c*(2+l%3))*.22,t[o*3+2]=Math.sin(c)*h,i[o]=Pe(0,Math.PI*2),r[o]=Pe(.8,2.8),s[o]=pi(l/9+Pe(-.03,.03))}e.setAttribute("position",new De(t,3)),e.setAttribute("aPhase",new De(i,1)),e.setAttribute("aSize",new De(r,1)),e.setAttribute("aBand",new De(s,1));let a=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
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
    `});return new ai(e,a)}var gh=vy(ot?1200:2600);_n.add(gh);function _y(n){let e=new Qe,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n),a=new Float32Array(n);for(let l=0;l<n;l++){let c=Pe(-1,1),h=Pe(0,Math.PI*2),d=Math.sqrt(Math.max(0,1-c*c)),u=Math.pow(Pe(.02,1),.42);t[l*3]=Math.cos(h)*d*u,t[l*3+1]=c*u,t[l*3+2]=Math.sin(h)*d*u,i[l]=Pe(0,1e3),r[l]=pi(l*.61803398875+Pe(-.02,.02)),s[l]=Pe(0,1),a[l]=Pe(.65,2.45)}e.setAttribute("position",new De(t,3)),e.setAttribute("aSeed",new De(i,1)),e.setAttribute("aBand",new De(r,1)),e.setAttribute("aLayer",new De(s,1)),e.setAttribute("aSize",new De(a,1));let o=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
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
    `});return new ai(e,o)}var Tc=_y(ot?4200:10500);Tc.renderOrder=4;_n.add(Tc);var yy=new Float32Array(gn*2*3),Ac=new Qe;Ac.setAttribute("position",new De(yy,3).setUsage(xs));var Ch=new si({color:10349019,transparent:!0,opacity:0,blending:st,depthWrite:!1}),Pp=new Gn(Ac,Ch);_n.add(Pp);function My(n){let e=new Qe,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n);for(let o=0;o<n;o++){let l=Pe(4,30),c=Pe(0,Math.PI*2);t[o*3]=Math.cos(c)*l,t[o*3+1]=Pe(-5,12),t[o*3+2]=Math.sin(c)*l,i[o]=Pe(0,Math.PI*2),r[o]=Pe(.025,.14),s[o]=Pe(.45,2.4)}e.setAttribute("position",new De(t,3)),e.setAttribute("aPhase",new De(i,1)),e.setAttribute("aSpeed",new De(r,1)),e.setAttribute("aSize",new De(s,1));let a=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
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
    `});return new ai(e,a)}var Ip=My(ot?1200:3300);sn.add(Ip);function Sy(n){let e=new Qe,t=new Float32Array(n*3),i=new Float32Array(n),r=new Float32Array(n),s=new Float32Array(n);for(let o=0;o<n;o++){let l=Pe(3.5,18),c=Pe(0,Math.PI*2);t[o*3]=Math.cos(c)*l,t[o*3+1]=Pe(-7,11),t[o*3+2]=Math.sin(c)*l,i[o]=Pe(0,1e3),r[o]=Pe(1.6,8.5),s[o]=Pe(0,1)}e.setAttribute("position",new De(t,3)),e.setAttribute("aSeed",new De(i,1)),e.setAttribute("aSize",new De(r,1)),e.setAttribute("aBand",new De(s,1));let a=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
      attribute float aSeed;
      attribute float aSize;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float high;
      ${Ps}
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
        for (int pulseIndex = 0; pulseIndex < ${rn}; pulseIndex++) {
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
    `});return new ai(e,a)}var Rh=Sy(ot?260:720);Rh.renderOrder=8;sn.add(Rh);function by(n){let e=[],t=[],i=[],r=[];for(let o=0;o<n;o++){let l=o/n*Math.PI*2+Pe(-.12,.12),c=Pe(21,37),h=Math.cos(l)*c,d=Math.sin(l)*c,u=Pe(-6,-3),f=Pe(7,18),g=Pe(-1.3,1.3),v=(p,m,M,w,b,C)=>{e.push(p,m,M,w,b,C);for(let E=0;E<2;E++)t.push(h,(u+f)*.5,d),i.push(o*1.713),r.push(pi(o*.381966))};v(h,u,d,h+g,f,d+Pe(-.8,.8));for(let p=1;p<5;p++){let m=$n(u,f,p/5),M=Pe(.5,1.7)*(1-p*.08);v(h-Math.cos(l)*M,m,d-Math.sin(l)*M,h+Math.cos(l)*M,m,d+Math.sin(l)*M)}}let s=new Qe;s.setAttribute("position",new qe(e,3)),s.setAttribute("aCenter",new qe(t,3)),s.setAttribute("aSeed",new qe(i,1)),s.setAttribute("aBand",new qe(r,1));let a=new Ye({transparent:!0,depthWrite:!1,blending:st,uniforms:dn(),vertexShader:`
      attribute vec3 aCenter;
      attribute float aSeed;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      ${Ps}
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
        for (int pulseIndex = 0; pulseIndex < ${rn}; pulseIndex++) {
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
    `});return new Gn(s,a)}var Dp=by(ot?22:46);sn.add(Dp);var xh=[];for(let n=0;n<7;n++){let e=new ln({color:2513764,transparent:!0,opacity:.012,blending:st,depthWrite:!1}),t=new it(new li(13+n*3.2,.018+n*.002,3,ot?128:256),e);t.position.y=-5.2+n*2.25,t.rotation.set(Math.PI*.5+Pe(-.16,.16),Pe(-.35,.35),Pe(-.12,.12)),t.userData.seed=Pe(0,10),xh.push(t),sn.add(t)}var Lp=new da(6539453,515,.15);hn.add(Lp);var Ic=new hs(6805704,0,18,2.05);Ic.position.copy(_n.position);hn.add(Ic);var Dc=new hs(2910320,0,34,1.5);Dc.position.set(0,9,-5);hn.add(Dc);var Wt=new pc(Fe),Np=new mc(hn,$t);Wt.addPass(Np);var An=new Ss(new he(innerWidth,innerHeight),ot?.72:.94,.72,.22);Wt.addPass(An);var Xt=new xc(.865);Wt.addPass(Xt);var Fp=new Ms({uniforms:{tDiffuse:{value:null},time:te.time,resolution:te.resolution,energy:te.energy,high:te.high,ritual:te.ritual,shutdown:te.shutdown,pulseAge:Qi.pulseAge,pulseStrength:Qi.pulseStrength,pulseScreen:Qi.pulseScreen,section:te.section,sectionLocal:te.sectionLocal,phaseTransition:te.phaseTransition,sonarMode:Qi.sonarMode,deepColor:te.deepColor,fogColor:te.fogColor,glowColor:te.glowColor},vertexShader:`
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
  `});Wt.addPass(Fp);var qa=new _c(0);Wt.addPass(qa);var Tt=null,dp=null,Zt=null,Ts=null,kt=null,Rr=null,gi=null,Up=Zf(Q_),vh=Yf();function Ls(){Up.reset(),vh.reset()}function Ph(n){Ls(),K.audio.preload="auto",K.audio.src=n,K.audio.load()}function wy(){K.audio.hasAttribute("src")||Ph("./archive.mp3")}async function Cc(n){try{await n.play()}catch(e){if(!(e instanceof DOMException)||e.name!=="AbortError")throw e}}var Op="shader-demo-room",Bp=1,Ey=Object.freeze(["pause","stats","set-preview"]),Ih=window.parent!==window,Dh=null,Et=null,Fn=document.hidden,Rc={documentHidden:document.hidden,hostPaused:!1},er=new Set,Pr=new Set,Cs=!1,Ba=Promise.resolve(),Lc=!1,Ii=!1,za=!1,_h=null,Rs=0,fp=120,nn={frameCount:0,sampleStartedAt:performance.now(),sampleFrames:0,fps:0,frameTimeMs:0};function Ty(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.getPrototypeOf(n)===Object.prototype}function Ir(n,e){if(!Ty(n))return!1;let t=Object.keys(n).sort(),i=[...e].sort();return t.length===i.length&&t.every((r,s)=>r===i[s])}function zp(n,e){Ih&&window.parent.postMessage({context:Op,v:Bp,instanceId:Dh,type:n,payload:e},location.origin)}function Pc(n){zp("stats",{fps:nn.fps,frameTimeMs:nn.frameTimeMs,frameCount:nn.frameCount,paused:n})}function Lh(n=performance.now()){nn.sampleStartedAt=n,nn.sampleFrames=0}function Ay(n){nn.frameCount++,nn.sampleFrames++;let e=n-nn.sampleStartedAt;e<500||(nn.fps=nn.sampleFrames*1e3/e,nn.frameTimeMs=e/nn.sampleFrames,Pc(!1),Lh(n))}async function Cy(){for(;;){let n=Fn;if(n){for(let e of document.querySelectorAll("audio"))!e.paused&&!e.ended&&er.add(e);for(let e of er)!e.paused&&!e.ended&&e.pause();Tt?.state==="running"&&Pr.add(Tt),await Promise.all([...Pr].map(e=>e.state==="running"?e.suspend():void 0))}else{await Promise.all([...Pr].map(t=>t.state==="suspended"?t.resume():void 0));let e=new Set(er);Cs&&e.add(K.audio);for(let t of e)t.isConnected&&t.paused&&!t.ended&&await Cc(t)}if(Fn===n){n||(er.clear(),Pr.clear(),Cs=!1);return}}}function Ya(){Ba=Ba.then(Cy).catch(n=>{console.error("Ninth Tide media pause transition failed.",n)})}async function Ry({elementWasOwned:n,contextWasOwned:e,startWasPending:t}){let i=Tt;Ba=Ba.then(async()=>{n||er.delete(K.audio),!e&&i&&Pr.delete(i),t||(Cs=!1),Fn&&i?.state==="running"&&await i.suspend()}).catch(r=>{console.error("Ninth Tide media intent rollback failed.",r)}),await Ba}function Nh(){!Fn&&!Lc&&!Ii&&Et===null&&(Et=requestAnimationFrame(Qy))}function Hp(){let n=Rc.documentHidden||Rc.hostPaused;if(n!==Fn){if(Fn=n,Fn){Et!==null&&cancelAnimationFrame(Et),Et=null,Ya(),Pc(!0);return}As.reset(),Lh(),Ya(),Pc(!1),Nh()}}function Vp(){Rc.documentHidden=document.hidden,Hp()}function Py(n){return Ir(n,["context","v","instanceId","type","payload"])&&n.context===Op&&n.v===Bp}function kp(n){if(!Ih||n.origin!==location.origin||n.source!==window.parent)return;let e=n.data;if(!Py(e))throw new Error("Invalid Ninth Tide bridge command envelope.");if(e.instanceId===Dh){if(typeof e.type!="string")throw new Error("Invalid Ninth Tide bridge command type.");if(e.type==="set-paused"){if(!Ir(e.payload,["paused"])||typeof e.payload.paused!="boolean")throw new Error("Invalid Ninth Tide set-paused payload.");Rc.hostPaused=e.payload.paused,Hp();return}if(e.type==="set-tide-preview"){if(!Ir(e.payload,["mode","section"]))throw new Error("Invalid Ninth Tide set-tide-preview payload.");let{mode:t,section:i}=e.payload;if(!["opening","main","ending"].includes(t)||!Number.isInteger(i)||i<0||i>8)throw new Error("Invalid Ninth Tide set-tide-preview payload.");Nc(t,i);return}throw new Error(`Unsupported Ninth Tide bridge command: ${e.type}.`)}}function Iy(){if(document.addEventListener("visibilitychange",Vp),!!Ih){if(typeof crypto.randomUUID!="function")throw new Error("Embedded Ninth Tide requires crypto.randomUUID().");Dh=crypto.randomUUID(),window.addEventListener("message",kp),zp("ready",{capabilities:[...Ey]}),Fn&&Pc(!0)}}K.audio.addEventListener("loadedmetadata",()=>{K.timeTotal.textContent=Fa(K.audio.duration)});K.audio.addEventListener("play",()=>{if(Fn){er.add(K.audio),Cs=!0,K.audio.pause(),Ya();return}Ls(),x.playing=!0,K.audioState.textContent="PLAYING",K.signal.textContent="LIVE FFT"});K.audio.addEventListener("pause",()=>{Ls(),x.playing=!1,x.ended||(K.audioState.textContent=x.audioReady?"PAUSED":"STANDBY")});K.audio.addEventListener("seeking",Ls);K.audio.addEventListener("ended",()=>Wp());K.audio.addEventListener("error",()=>{x.audioFailed=!0,K.fileLabel.hidden=!1,K.hint.textContent="\u672A\u80FD\u8BFB\u53D6 archive.mp3\u3002\u8BF7\u9009\u62E9\u672C\u5730\u97F3\u9891\u6587\u4EF6\u7EE7\u7EED\u3002",K.audioState.textContent="FILE REQUIRED"});async function Dy(){if(!Tt){let n=window.AudioContext||window.webkitAudioContext;if(!n)throw new Error("Web Audio API unavailable");Tt=new n,dp=Tt.createMediaElementSource(K.audio),Zt=Tt.createAnalyser(),Zt.fftSize=2048,Zt.smoothingTimeConstant=.82,Zt.minDecibels=-94,Zt.maxDecibels=-16,Ts=Tt.createGain(),Ts.gain.value=0,dp.connect(Zt),Zt.connect(Ts),Ts.connect(Tt.destination),kt=new Uint8Array(Zt.frequencyBinCount),Rr=new Uint8Array(Zt.fftSize)}Fn?(Pr.add(Tt),Ya()):Tt.state!=="running"&&await Tt.resume(),x.audioReady=!0}function Ly(){Ls(),Mc(xn),x.calibrated=!1,x.ceremonyTime=0,x.ceremonyCue=0,x.ritual=0,x.ignite=0,x.lightLevel=0,x.shutdown=0,x.ending=!1,x.ended=!1,x.endingCue=0,x.archiveOpen=0,x.archiveOpenTarget=0,x.pulseCooldown=0,x.tideIndex=0,x.transitionFrom=0,x.pendingTide=-1,x.phaseLocal=0,x.phaseTransition=0,x.transitionClock=99,x.transitionSwitched=!1,te.section.value=0,te.sectionLocal.value=0,te.phaseTransition.value=0,Ds(),document.documentElement.style.setProperty("--phase-veil","0"),x.diveTarget=.12,x.yawTarget=0,x.pitchTarget=.07,document.body.classList.add("entered"),document.body.classList.remove("calibrated","ending","ended"),Is("\u5F00\u573A\u6821\u51C6\u4E2D"),K.coreState.textContent="CALIBRATING",K.fieldState.textContent="DARK ADAPTATION",K.mode.textContent="CALIBRATION",document.documentElement.style.setProperty("--blackout","1"),document.documentElement.style.setProperty("--ritual-caption","0")}async function Dr(n,e=!1){if((!x.entered||e||x.ended)&&(x.entered=!0,Ly(),Number.isFinite(K.audio.duration)&&(K.audio.currentTime=0)),!n){x.audioReady=!1,x.playing=!1,K.signal.textContent="SYNTHETIC",K.audioState.textContent="SILENT";return}let t=Tt!==null&&Pr.has(Tt);try{if(K.enter.disabled=!0,K.enter.textContent="\u6B63\u5728\u6821\u51C6\u2026",wy(),await Dy(),(e||x.ended||K.audio.currentTime>.2)&&(K.audio.currentTime=0),Fn){let i=er.has(K.audio),r=Cs;er.add(K.audio),Cs=!0,Ya();try{await Cc(K.audio)}catch(s){throw await Ry({elementWasOwned:i,contextWasOwned:t,startWasPending:r}),s}}else await Cc(K.audio);K.enter.textContent="\u542F\u52A8\u5171\u9E23\u4EEA\u5F0F",K.enter.disabled=!1}catch(i){let r=i instanceof DOMException&&i.name==="NotAllowedError";r||console.error(i),x.entered=!1,document.body.classList.remove("entered"),K.enter.disabled=!1,K.enter.textContent="\u91CD\u8BD5\u97F3\u9891",K.fileLabel.hidden=!1,K.hint.textContent=r?"\u6D4F\u89C8\u5668\u963B\u6B62\u4E86\u97F3\u9891\u64AD\u653E\u3002\u70B9\u51FB\u201C\u91CD\u8BD5\u97F3\u9891\u201D\u7EE7\u7EED\uFF1B\u5DF2\u8F7D\u5165\u97F3\u9891\u4E0D\u4F1A\u91CD\u590D\u4E0B\u8F7D\u3002":"\u672A\u80FD\u64AD\u653E\u5F53\u524D\u97F3\u9891\u3002\u8BF7\u9009\u62E9\u672C\u5730\u97F3\u9891\u6587\u4EF6\uFF0C\u6216\u70B9\u51FB\u201C\u91CD\u8BD5\u97F3\u9891\u201D\u3002",K.audioState.textContent=r?"PLAYBACK BLOCKED":"FILE REQUIRED",x.audioFailed=!0}}K.enter.addEventListener("click",()=>Dr(!0));K.silent.addEventListener("click",()=>Dr(!1));K.replay.addEventListener("click",()=>Dr(!0,!0));K.file.addEventListener("change",async n=>{let e=n.target.files?.[0];e&&(gi&&URL.revokeObjectURL(gi),gi=URL.createObjectURL(e),Ph(gi),x.audioFailed=!1,K.fileLabel.hidden=!0,K.hint.textContent=`\u5DF2\u8F7D\u5165 ${e.name}`,await Dr(!0,!0))});window.addEventListener("dragover",n=>n.preventDefault());window.addEventListener("drop",async n=>{n.preventDefault();let e=[...n.dataTransfer.files].find(t=>t.type.startsWith("audio/"));e&&(gi&&URL.revokeObjectURL(gi),gi=URL.createObjectURL(e),Ph(gi),await Dr(!0,!0),vn(`AUDIO LOADED / ${e.name.toUpperCase()}`,2200))});function ah(n,e){if(!Zt||!kt||!Tt)return 0;let t=Tt.sampleRate/2,i=vt(Math.floor(n/t*kt.length),0,kt.length-1),r=vt(Math.ceil(e/t*kt.length),i+1,kt.length),s=0;for(let a=i;a<r;a++)s+=kt[a];return s/((r-i)*255)}function Ny(n){if(Zt&&kt&&x.playing&&Tt){let e=Tt.sampleRate/2;for(let t=0;t<gn;t++){let i=t/gn,r=(t+1)/gn,s=28*Math.pow(17e3/28,i),a=28*Math.pow(17e3/28,r),o=vt(Math.floor(s/e*kt.length),0,kt.length-1),l=vt(Math.ceil(a/e*kt.length),o+1,kt.length),c=0;for(let h=o;h<l;h++)c+=kt[h];Nn[t]=Math.round(c/Math.max(1,l-o))}}else for(let e=0;e<gn;e++){let i=22+31*Math.exp(-e/32)*(.55+.45*Math.sin(n*(.42+e*.006)+e*.53));Nn[e]=vt(Math.round(i),0,255)}ir.needsUpdate=!0}function Fy(n){if(n===kt&&Tt){let i=Tt.sampleRate/2;return vt(Math.ceil(hp/i*n.length),0,n.length-1)}let e=Math.log(17e3/28),t=Math.log(hp/28)/e;return vt(Math.ceil(t*n.length),0,n.length-1)}function Uy(n){return x.playing?vh.advance(K.audio.currentTime):(vh.reset(),n)}function Oy(n,e){let t,i,r,s=0;if(Zt&&x.playing){Zt.getByteFrequencyData(kt),Zt.getByteTimeDomainData(Rr),t=Math.pow(ah(24,190),1.14),i=Math.pow(ah(190,2100),1.22),r=Math.pow(ah(2100,9200),1.08);let d=0;for(let u=0;u<Rr.length;u+=4){let f=(Rr[u]-128)/128;d+=f*f}s=Math.sqrt(d/(Rr.length/4))}else x.syntheticPhase+=n,t=.14+.065*(.5+.5*Math.sin(e*1.08)),i=.1+.052*(.5+.5*Math.sin(e*.43+1.2)),r=.05+.03*(.5+.5*Math.sin(e*1.91+2.5)),s=.08+t*.28;x.low=un(x.low,t,8,n),x.mid=un(x.mid,i,7.2,n),x.high=un(x.high,r,9,n),x.rms=un(x.rms,s,9,n);let a=vt(x.low*.48+x.mid*.34+x.high*.22+x.rms*.3,0,1),o=Math.max(0,a-x.previousEnergy)*8.6;x.transient=un(x.transient,o,o>x.transient?26:7,n),x.previousEnergy=a,x.energy=un(x.energy,a,7.8,n),Ny(e);let l=Zt&&kt&&x.playing&&Tt?kt:Nn,c=Uy(n),h=c>0?Up.update(l,c,{bandStartIndex:Fy(l),selectedPath:ey[x.tideIndex]}):{onset:!1,strength:0};if(te.low.value=x.low,te.mid.value=x.mid,te.high.value=x.high,te.rms.value=x.rms,te.energy.value=x.energy,te.transient.value=x.transient,K.low.style.setProperty("--v",vt(x.low*1.75,0,1).toFixed(3)),K.mid.style.setProperty("--v",vt(x.mid*1.95,0,1).toFixed(3)),K.high.style.setProperty("--v",vt(x.high*2.8,0,1).toFixed(3)),Ts&&Tt){let d=Mt(.12,uh?.55:1.75,x.ceremonyTime),u=1-Mt(.53,.98,x.shutdown),f=x.muted?0:.92*d*u;Ts.gain.setTargetAtTime(f,Tt.currentTime,.07)}x.pulseCooldown=Math.max(0,x.pulseCooldown-n),x.calibrated&&!x.ending&&x.playing&&h.onset&&x.pulseCooldown<=0&&(xi({origin:new he(0,0),strength:.48+h.strength*.7,sourceY:.32,announce:!1,mode:x.tideIndex,source:"auto"}),x.pulseCooldown=1.15+(1-x.low)*.7)}function Gp(n){Zn.x=n.clientX/innerWidth*2-1,Zn.y=-(n.clientY/innerHeight)*2+1,K.cursor.style.transform=`translate3d(${n.clientX}px,${n.clientY}px,0)`}window.addEventListener("pointermove",n=>{if(Gp(n),x.dragging&&!x.ending){let e=n.clientX-x.lastPointerX,t=n.clientY-x.lastPointerY;x.yawTarget-=e*.0042,x.pitchTarget=vt(x.pitchTarget+t*.0026,-.3,.5),x.dragDistance+=Math.hypot(e,t)}x.lastPointerX=n.clientX,x.lastPointerY=n.clientY});window.addEventListener("pointerdown",n=>{n.target.closest("button, label, input")||x.ending||(Gp(n),x.dragging=!0,x.dragDistance=0,x.lastPointerX=n.clientX,x.lastPointerY=n.clientY,K.cursor.classList.add("active"))});window.addEventListener("pointerup",n=>{x.dragging&&(x.dragging=!1,K.cursor.classList.remove("active"),x.dragDistance<8&&By(n))});window.addEventListener("pointercancel",()=>{x.dragging=!1,K.cursor.classList.remove("active")});window.addEventListener("wheel",n=>{x.ending||(x.diveTarget=vt(x.diveTarget+n.deltaY*55e-5,0,1))},{passive:!0});function By(n){if(!x.calibrated||x.ending)return;if(Zn.x=n.clientX/innerWidth*2-1,Zn.y=-(n.clientY/innerHeight)*2+1,Oa.setFromCamera(Zn,$t),Oa.intersectObject(nr,!1)[0]){x.archiveOpenTarget=x.archiveOpenTarget>.5?0:1,K.mode.textContent=x.archiveOpenTarget?"DECODING":"OBSERVATION",K.coreState.textContent=x.archiveOpenTarget?"UNSEALED":"RESONANT",xi({origin:new he(0,0),strength:1.35,sourceY:.34,announce:!0,mode:x.tideIndex,source:"user"}),vn(x.archiveOpenTarget?"OPEN":"SEALED",850);return}let t=Oa.intersectObject($a,!1)[0];t?(xi({origin:new he(t.point.x,t.point.z),strength:1.05,sourceY:-2.28,announce:!0,mode:x.tideIndex,source:"user"}),vn(["PRESSURE","CURTAIN","QUARTZ","PILLARS","FORECAST","COUNTERTIDE","CODEX","GAZE","NULL"][x.tideIndex],760)):xi({origin:new he(Zn.x*5,-Zn.y*5),strength:.7,sourceY:.1,announce:!0,mode:x.tideIndex,source:"user"})}function xi({origin:n,strength:e,sourceY:t,announce:i,mode:r,source:s}){$t.updateMatrixWorld(!0);let a=hh.set(n.x,t,n.y).project($t);sp(xn,{originX:n.x,originZ:n.y,sourceY:t,screenX:a.x*.5+.5,screenY:a.y*.5+.5,strength:e,mode:r,source:s}),Ds(),mi.position.set(n.x,t,n.y),mi.scale.setScalar(.001),mi.visible=r===0,i&&(x.pulseCooldown=.95)}window.addEventListener("keydown",async n=>{n.code==="Space"?(n.preventDefault(),x.ended?await Dr(!0,!0):x.entered?x.audioReady&&(K.audio.paused?await Cc(K.audio):K.audio.pause()):await Dr(!0)):n.key.toLowerCase()==="m"?(x.muted=!x.muted,K.audioState.textContent=x.muted?"MUTED":x.playing?"PLAYING":"PAUSED",vn(x.muted?"AUDIO MUTED":"AUDIO RESTORED")):n.key.toLowerCase()==="f"?document.fullscreenElement?document.exitFullscreen?.():document.documentElement.requestFullscreen?.():n.key.toLowerCase()==="r"&&!x.ending&&(x.diveTarget=.12,x.yawTarget=0,x.pitchTarget=.07,vn("VIEWPOINT RECALIBRATED"))});var oh=[{time:.58,text:"FIRST RETURN",strength:.52,y:-2.28,mode:0},{time:1.52,text:"NO FLOOR",strength:.62,y:-2.28,mode:1},{time:2.62,text:"DEPTH BELOW DEPTH",strength:.72,y:-2.28,mode:2},{time:4.1,text:"NINE ROOMS",strength:.86,y:.34,mode:3},{time:5.62,text:"FIRST LIGHT",strength:1.32,y:.34,mode:4},{time:7.45,text:"IT LOOKS BACK",strength:.92,y:.34,mode:7}];function zy(n){let e="",t="",i="";n<1.65?(i="I",e="\u542C\u3002",t="LISTEN."):n<3.55?(i="II",e="\u6D77\u5E8A\u6CA1\u6709\u56DE\u7B54\u3002",t="NO FLOOR ANSWERED."):n<5.75?(i="III",e="\u661F\u56FE\u6C89\u5728\u66F4\u6DF1\u5904\u3002",t="THE STARS LIE LOWER."):(i="IX",e="\u5B83\u5148\u770B\u89C1\u4E86\u6211\u4EEC\u3002",t="IT SAW US FIRST."),K.ritualIndex.textContent=i,K.ritualMain.textContent=e,K.ritualSub.textContent=t;let r=Mt(.18,.62,n)*(1-Mt(8,9.1,n));document.documentElement.style.setProperty("--ritual-caption",r.toFixed(3))}function Hy(n){if(!x.entered||x.calibrated||x.previewMode==="main")return;x.audioReady&&Number.isFinite(K.audio.currentTime)?x.ceremonyTime=K.audio.currentTime:x.ceremonyTime+=n*(uh?2:1);let e=x.ceremonyTime;for(x.ritual=tr(.4,7.7,e),x.ignite=tr(4.15,8,e),x.lightLevel=vt(Mt(.12,1.05,e)*.22+Mt(2.25,7.85,e)*.78,0,1),te.ritual.value=x.ritual,te.ignite.value=x.ignite,zy(e);x.ceremonyCue<oh.length&&e>=oh[x.ceremonyCue].time;){let t=oh[x.ceremonyCue++];xi({origin:new he(0,0),strength:t.strength,sourceY:t.y,announce:!1,mode:t.mode,source:"system"}),vn(t.text,1300)}e>=(uh?4.2:8.65)&&(x.calibrated=!0,x.ritual=1,x.ignite=1,te.ritual.value=1,te.ignite.value=1,document.body.classList.add("calibrated"),K.coreState.textContent="RESONANT",K.fieldState.textContent="LIVE / 64 BANDS",K.mode.textContent="OBSERVATION",Is("\u7B2C I \u7AE0 \xB7 \u65E0\u6708\u6D4B\u6DF1"),document.documentElement.style.setProperty("--ritual-caption","0"))}function Wp(){x.ended||(x.shutdown=1,te.shutdown.value=1,x.ending=!0,x.ended=!0,x.playing=!1,document.body.classList.add("ending"),setTimeout(()=>document.body.classList.add("ended"),700),Is("\u4F53\u9A8C\u7ED3\u675F \xB7 \u5DF2\u5F52\u6863"),K.audioState.textContent="CLOSED",K.coreState.textContent="EXTINGUISHED",K.fieldState.textContent="NO RETURN",document.documentElement.style.setProperty("--blackout","1"))}function Vy(){if(!x.entered||x.previewMode==="main"||x.previewMode==="opening")return;let n=x.shutdown;if(x.previewMode==="ending")n=Math.max(n,.68);else if(x.audioReady&&Number.isFinite(K.audio.duration)&&K.audio.duration>20){let t=K.audio.duration-13.6,i=vt((K.audio.currentTime-t)/13.6,0,1);n=i<.58?i*.78:$n(.4524,1,tr(.58,1,i))}x.shutdown=Math.max(x.shutdown,n),te.shutdown.value=x.shutdown,x.shutdown>.018&&!x.ending&&(x.ending=!0,document.body.classList.add("ending"),K.mode.textContent="WITHDRAWAL",Is("\u7EC8\u5E55\u9000\u6F6E\u4E2D \xB7 \u7B2C IX \u7AE0")),x.endingCue===0&&x.shutdown>.05&&(x.endingCue=1,vn("OUTER SILENCE",1450)),x.endingCue===1&&x.shutdown>.41&&(x.endingCue=2,xi({origin:new he(0,0),strength:.82,sourceY:.34,announce:!1,mode:8,source:"system"}),vn("THE ECHO REVERSES",1550)),x.endingCue===2&&x.shutdown>.76&&(x.endingCue=3,vn("LAST LIGHT",1450)),x.shutdown>=.995&&Wp()}var lh={deep:new Ee,fog:new Ee,glow:new Ee,accent:new Ee,secondary:new Ee},Za=-1;function ky(){return Lr?Va:Number.isFinite(K.audio.duration)?K.audio.duration:Va}function Gy(n,e){let t;if(x.previewMode==="main"){let i=vt(x.previewSection,0,8);t=$n(Pi[i],Pi[i+1],.46)}else x.previewMode==="ending"?t=346:t=x.audioReady?Wf(K.audio.currentTime,e,Va):n/118*e%e;return vt(t,0,Va-.001)}function Wy(n,e){let t=Pi.length-2;for(let c=0;c<Pi.length-1;c++)if(n<Pi[c+1]){t=c;break}t!==x.tideIndex&&x.pendingTide!==t&&(x.transitionFrom=x.tideIndex,x.pendingTide=t,x.transitionClock=0,x.transitionSwitched=!1);let i=1;x.pendingTide>=0&&(x.transitionClock+=e,i=vt(x.transitionClock/j_,0,1),!x.transitionSwitched&&i>=.49&&(x.transitionSwitched=!0,x.tideIndex=x.pendingTide,te.section.value=x.tideIndex,x.calibrated&&!x.ending&&xi({origin:new he(0,0),strength:.58,sourceY:.34,announce:!1,mode:x.tideIndex,source:"system"})),i>=1&&(x.tideIndex=x.pendingTide,x.pendingTide=-1,x.transitionClock=99,x.transitionSwitched=!1,i=1)),x.phaseTransition=x.pendingTide>=0?Math.pow(Math.sin(i*Math.PI),1.18):0,te.phaseTransition.value=x.phaseTransition,document.documentElement.style.setProperty("--phase-veil",(x.phaseTransition*.72).toFixed(3)),document.documentElement.style.setProperty("--phase-turn",x.phaseTransition.toFixed(3));let r=Pi[x.tideIndex],s=Pi[x.tideIndex+1];x.phaseLocal=vt((n-r)/Math.max(.01,s-r),0,1),x.tideFloat=x.tideIndex+x.phaseLocal,te.section.value=x.tideIndex,te.sectionLocal.value=x.phaseLocal,te.tide.value=x.tideFloat;let a=x.pendingTide>=0?x.transitionFrom:x.tideIndex,o=x.pendingTide>=0?x.pendingTide:x.tideIndex,l=x.pendingTide>=0?tr(.08,.92,i):0;for(let c of Object.keys(lh))lh[c].lerpColors(Cr[a][c],Cr[o][c],l),te[`${c}Color`].value.copy(lh[c]);if(hn.fog.color.copy(te.fogColor.value),hn.background.copy(te.deepColor.value),Ic.color.copy(te.glowColor.value),Dc.color.copy(te.secondaryColor.value),Es.material.color.copy(te.glowColor.value),Xa.material.color.copy(te.glowColor.value),Ch.color.copy(te.accentColor.value),Eh.color.copy(te.secondaryColor.value),wc.color.copy(te.glowColor.value),Yn.material.color.copy(te.glowColor.value),Ec.color.copy(te.accentColor.value),qn.material.color.copy(te.accentColor.value),wh.forEach(c=>c.material.color.copy(te.glowColor.value)),x.tideIndex!==Za){Za=x.tideIndex;let c=Ua[x.tideIndex];K.phaseNumber.textContent=c[0],K.phaseName.textContent=c[1],K.phaseSub.textContent=c[2],K.sideTicks.forEach((h,d)=>h.classList.toggle("active",d===x.tideIndex)),x.calibrated&&!x.ending&&Is(`\u7B2C ${c[0]} \u7AE0 \xB7 ${c[1]}`),x.calibrated&&!x.ending&&x.activeSeconds>2&&vn(`${c[0]} \xB7 ${c[1]}`,1150)}}function Xy(n){x.dive=un(x.dive,x.diveTarget,4.1,n),x.yaw=un(x.yaw,x.yawTarget,5,n),x.pitch=un(x.pitch,x.pitchTarget,5,n),ji.lerp(Zn,1-Math.exp(-n*4.5));let e=1-x.ritual,t=$n(13,5.25,Math.pow(x.dive,1.08))+e*1.6+x.shutdown*2.7,i=x.yaw+ji.x*(x.dragging?.015:.095)+e*.05,r=x.pitch+ji.y*(x.dragging?.01:.05)-x.shutdown*.035,s=.17+x.dive*.22,a=Math.cos(r)*t,o=new I(Math.sin(i)*a,s+Math.sin(r)*t*.67,Math.cos(i)*a);$t.position.lerp(o,1-Math.exp(-n*4.2)),$t.lookAt(0,s,0),$t.rotation.z=un($t.rotation.z,-ji.x*.007-x.transient*.003,4,n);let l=Math.round(3860+x.dive*740);K.depth.textContent=`\u2212${String(l).padStart(6,"0")} M`,K.coord.textContent=`${(i*12.7).toFixed(3)} / ${(r*17.4).toFixed(3)}`}function qy(){let n=Ac.attributes.position.array,e=x.tideIndex,t=x.phaseLocal;for(let i=0;i<gn;i++){let r=i/gn,s=r*Math.PI*2,a=Nn[i]/255,o=i*6,l,c,h,d,u,f;if(e===0){let v=1.34+a*.74;l=Math.cos(s)*1.18,c=Math.sin(s*3+te.time.value*.18)*.13,h=Math.sin(s)*1.18,d=Math.cos(s)*v,u=c+(a-.2)*.13,f=Math.sin(s)*v}else if(e===1){let g=Math.pow(Math.abs(Math.cos(s*4.5)),8),v=.78+g*.32,p=v+.28+a*(.65+g*.65);l=Math.cos(s)*v,c=(r-.5)*1.15,h=Math.sin(s)*v,d=Math.cos(s)*p,u=c+Math.sin(s*9)*a*.18,f=Math.sin(s)*p}else if(e===2){let g=Math.round(r*12)/12*Math.PI*2,v=.72,p=1.15+a*.88;l=Math.cos(g)*v,c=Math.sin(s*5)*.42,h=Math.sin(g)*v,d=Math.cos(g)*p,u=c+(a-.25)*.34,f=Math.sin(g)*p}else if(e===3){let g=(r-.5)*2.4;l=g,c=-.82,h=Math.sin(s*3)*.13,d=g,u=-.2+a*2.25,f=h+Math.cos(s*2)*.09}else if(e===4){let v=.74*(.45+Math.pow(Math.abs(Math.sin(s*4.5)),3)*.74),p=v+.34+a*.83;l=Math.cos(s)*v,c=Math.sin(s*2)*.2,h=Math.sin(s)*v,d=Math.cos(s)*p,u=c+Math.sin(s*9)*a*.32,f=Math.sin(s)*p}else if(e===5){let g=(r-.5)*2.7,v=s*2+g*2.8+te.time.value*.35,p=.72,m=p+.24+a*.48;l=Math.cos(v)*p,c=g,h=Math.sin(v)*p,d=Math.cos(v)*m,u=g+(a-.4)*.13,f=Math.sin(v)*m}else if(e===6){let g=Math.floor(r*9),v=pi(r*9);c=(g/8-.5)*2.2,u=c,l=-1.2+v*2.4,d=l+.18+a*1.15,h=(g-4)*.018,f=h+Math.sin(s*4+te.time.value)*.035}else if(e===7){let v=.92+a*.72;l=Math.cos(s)*.7*1.45,c=Math.sin(s)*.7*.58,h=0,d=Math.cos(s)*v*1.45,u=Math.sin(s)*v*.58,f=Math.sin(s*3)*a*.14}else{let g=.46-t*.1,v=g+.08+a*.22;l=Math.cos(s)*g,c=Math.sin(s*2)*.04,h=Math.sin(s)*g,d=Math.cos(s)*v,u=c,f=Math.sin(s)*v}n[o]=l,n[o+1]=c,n[o+2]=h,n[o+3]=d,n[o+4]=u,n[o+5]=f}Ac.attributes.position.needsUpdate=!0}function Yy(n,e){x.archiveOpen=un(x.archiveOpen,x.archiveOpenTarget,4,n),te.open.value=x.archiveOpen;let t=x.tideIndex,i=x.phaseTransition,s=[.55,.92,.42,.2,.68,1.15,.34,.48,.12][t];_n.rotation.y+=n*(.02+s*.055+x.mid*.055)*(1-x.shutdown*.7),_n.rotation.x=Math.sin(e*(.07+s*.05))*(t===5?.075:.035)+ji.y*.025,_n.rotation.z=Math.sin(e*.061)*.02-ji.x*.018+(t===6?Math.sin(e*.17)*.035:0);let o=[x.low,x.high,x.mid,x.low,x.mid,x.mid,x.high,x.transient,x.low][t],l=1+o*.09+x.transient*.025+i*.08,h=[[1,1,1],[1.05,1.28,1.05],[1.08,1.08,1.08],[.56,1.72,.56],[1.18,.92,1.18],[.82,1.38,.82],[1.42,1.2,.28],[1.46,.62,.34],[.48,.48,.48]][t];hh.set(h[0]*l,h[1]*l,h[2]*l),nr.scale.lerp(hh,1-Math.exp(-n*(4+i*8)));let d=1-Mt(.76,.98,x.shutdown)*.78,u=t===6?.85:t===7?.9:t===8?.46:1;Es.scale.set(h[0]*u,h[1]*u,h[2]*u).multiplyScalar((1+x.archiveOpen*.2+x.high*.025+i*.32)*d),Es.rotation.x+=n*(.05+s*.11+x.high*.08),Es.rotation.y-=n*(.04+s*.09+x.mid*.07),Es.material.opacity=(.08+x.high*.24+x.archiveOpen*.08+i*.22)*x.ignite*(1-Mt(.73,.98,x.shutdown));let f=[1,1.24,.86,.94,1.34,1.02,.78,1.22,.54][t];Xa.material.opacity=(.1+o*.38+x.transient*.28+i*.4)*x.ignite*(1-Mt(.72,.96,x.shutdown)),Xa.scale.setScalar((4+f*.8+o*1.2+x.archiveOpen*.7+i*2)*(1-Mt(.68,.98,x.shutdown)*.86)),Ic.intensity=(5+o*29+x.archiveOpen*9+x.transient*16+i*26)*x.ignite*(1-Mt(.72,.99,x.shutdown)),Tc.rotation.y+=n*([.03,.075,.015,.01,.04,-.09,.008,.018,.004][t]+x.mid*.025),Tc.rotation.z=t===5?Math.sin(e*.18)*.12:t===6?.04:Math.sin(e*.055)*.025;for(let g of Rp){let v=g.userData.index,p=v%2?-1:1,m=[.75,1.6,.35,.25,.95,2,.18,.48,.08][t];g.rotation.x+=n*g.userData.speed*m*(1+x.mid*1.15),g.rotation.y-=n*g.userData.speed*.7*m*(1+x.high),t===3&&(g.rotation.z=un(g.rotation.z,v%2?Math.PI/2:0,2.2,n)),t===6&&(g.rotation.x=un(g.rotation.x,Math.PI/2,1.8,n)),t===7&&(g.rotation.x=un(g.rotation.x,Math.PI/2,2.4,n));let M=Mt(v/9*.55,v/9*.55+.25,x.ignite),w=Mt(.5+(8-v)/9*.34,.82+(8-v)/9*.16,x.shutdown),b=1+x.archiveOpen*(.05+v*.017)+o*.012;t===1&&(b*=.86+v%3*.14),t===4&&(b*=.88+Math.sin(v/9*Math.PI)*.32),t===8&&(b*=.48+(1-x.phaseLocal)*.32);let C=t===7?.46:t===6?.72:1;g.scale.set(b,b*C,b).multiplyScalar(1-w*.92),g.material.opacity=((v%3===0?.2:.065)+x.high*(v%3===0?.3:.14)+x.archiveOpen*.05+i*.16)*M*(1-w),g.material.color.copy(v===8?te.accentColor.value:te.glowColor.value)}for(let g=0;g<mh.length;g++){let v=mh[g],p=v.userData.angle+e*(t===5?-.06:.018),m=Mt(g/9*.55,g/9*.55+.25,x.ignite),M=t===4?.95+x.mid*.65:t===7?-.32+x.high*.2:t===8?-.65:0,w=.92+x.archiveOpen*(.9+g*.022)+M*.48+i*.45;v.position.x=Math.cos(p)*w,v.position.z=Math.sin(p)*w,v.position.y=Math.sin(p*2+e*.25)*(.06+x.archiveOpen*.17)+(t===3?(g-4)*.13:0),v.rotation.y=-p+x.archiveOpen*Math.PI*.34+M*.38,v.rotation.z=Math.cos(p)*.2+x.archiveOpen*(g%2?-.58:.58)+(t===6?Math.PI*.42:0),v.material.emissive.copy(g===8?te.accentColor.value:te.secondaryColor.value),v.material.emissiveIntensity=(.05+x.mid*.5+x.archiveOpen*.28+i*.5)*m,v.material.opacity=(t===8?.16:.34)*m*(1-Mt(.64,.94,x.shutdown))}gh.rotation.y-=n*(.008+x.mid*.028)*(t===5?-2.2:1),gh.rotation.z=Math.sin(e*.075)*(t===6?.02:.05),Pp.rotation.y+=n*(t===5?-.055:t===3?.008:.018),Ch.opacity=(.08+x.high*.3+x.archiveOpen*.09+i*.24)*x.ignite*(1-Mt(.65,.94,x.shutdown)),qy()}function Zy(n,e){let t=Mt(.18,.78,x.ritual),i=x.shutdown>.5?[]:ws(xn),r=bh(i.length);Eh.opacity=.04*t*(1-x.shutdown);for(let s of wp){let{root:a,ring:o,crossRing:l,aperture:c,index:h}=s,d=vt(Math.floor(a.userData.band*(gn-1)),0,gn-1),u=Nn[d]/255,f=a.userData.angle,g=0;for(let b of i){let C=Math.hypot(a.position.x-b.originX,a.position.z-b.originZ),E=b.age*(4.15+x.low*1.7);b.mode===1?E=b.age*(2.2+x.high*.8):b.mode===3?E=b.age*2.5:b.mode===7?E=$n(18,.15,tr(0,4.05,b.age)):b.mode===8&&(E=$n(10.5,.15,tr(0,4.3,b.age)));let P=b.mode===6?.55:b.mode>=7?.82:1.35;g+=Math.exp(-Math.abs(C-E)*P)*b.strength*b.contributionScale*Math.exp(-b.age*.34)*r}let v=Mt(h/9*.55,h/9*.55+.28,x.ritual),p=.18+(1-h/8)*.46,m=1-Mt(p,p+.19,x.shutdown),M=[.8,1.45,.52,.32,.92,1.75,.38,.62,.18][x.tideIndex],w=x.tideIndex===5?-1:1;a.rotation.z=Math.sin(e*(.15+h*.006)*M+a.userData.seed)*(.045+u*.17+g*.19),a.rotation.x=Math.cos(e*.12*w+f)*(.018+u*.08+(x.tideIndex===3?x.low*.1:0)),o.rotation.z+=n*(.12+u*.5)*(h%2?-1:1),l.rotation.x+=n*(.08+x.mid*.25),o.material.color.copy(te.glowColor.value),l.material.color.copy(h===8?te.accentColor.value:te.secondaryColor.value),o.material.opacity=(.08+u*.48+g*.58)*v*m,l.material.opacity=(.04+x.high*.16+g*.34)*v*m,c.material.color.copy(h===8?te.accentColor.value:te.glowColor.value),c.material.opacity=(.13+u*.62+g*.72)*v*m,c.scale.setScalar(.55+u*.55+g*.7)}}function $y(n){ap(xn,n);let e=Ds();mi.visible=!1,Ki.visible=!1,Ga.visible=!1,Yn.visible=!1,Ri.visible=!1,Wa.visible=!1,fi.visible=!1,di.visible=!1,qn.visible=!1,wc.opacity=0,Yn.material.opacity=0,Ec.opacity=0;for(let l of fi.children)l.material.opacity=0;if(Er.pulseAge.value=99,Er.pulseStrength.value=0,x.shutdown>.5){let l=Mt(.5,.92,x.shutdown);di.visible=!0,di.position.set(0,.34,0),di.scale.setScalar($n(22,.035,l)),Er.pulseAge.value=l*5.35,Er.pulseStrength.value=(1-l)*1.08;return}if(!e)return;let{mode:t}=e,i=vt(e.age/e.lifetime,0,1),r=Math.pow(1-i,.62)*e.strength*e.contributionScale*Math.exp(-e.age*.34);if(r<=.008)return;let s=e.originX,a=e.sourceY,o=e.originZ;if(t===0){let l=Math.max(.01,e.age*(4.15+x.low*1.7));mi.visible=!0,mi.position.set(s,a,o),mi.scale.setScalar(l)}else if(t===1){Ki.visible=!0,Ki.position.set(s,-.2+a*.2,o),Ki.rotation.y=te.time.value*.11;let l=.2+e.age*(2.2+x.high*.8);Ki.scale.set(l,5.2+e.age*1.3,l)}else if(t===2){Ga.visible=!0;let l=Math.max(.05,e.age*2);for(let c=0;c<dh;c++){let h=c/dh,d=h*Math.PI*2,u=Nn[Math.floor(h*(gn-1))]/255,f=Math.round(h*18)/18*Math.PI*2,g=l+.34+u*2.2+Math.pow(Math.abs(Math.cos(d*4.5)),8)*.95,v=c*6;Tr[v]=s+Math.cos(f)*l,Tr[v+1]=a+Math.sin(d*5+te.time.value)*.16,Tr[v+2]=o+Math.sin(f)*l,Tr[v+3]=s+Math.cos(f)*g,Tr[v+4]=a+(u-.25)*1.1,Tr[v+5]=o+Math.sin(f)*g}Th.attributes.position.needsUpdate=!0,wc.opacity=r*(.28+x.high*.45)}else if(t===3){Yn.visible=!0;let l=.35+e.age*2.5;for(let c=0;c<fh;c++){let h=c/fh,d=h*Math.PI*2,u=Nn[Math.floor(h*(gn-1))]/255,f=.18+u*(2.4+x.low*2.1)+Math.pow(Math.sin(i*Math.PI),2)*.55;Na.position.set(s+Math.cos(d)*l,a-1.7+f*.5,o+Math.sin(d)*l),Na.scale.set(.7+u*.45,f,.7+u*.45),Na.rotation.y=-d,Na.updateMatrix(),Yn.setMatrixAt(c,Na.matrix)}Yn.instanceMatrix.needsUpdate=!0,Yn.material.opacity=r*(.22+x.mid*.38)}else if(t===4)Ri.visible=!0,Ri.position.set(s,a,o),Ri.rotation.y=te.time.value*.18,Ri.rotation.x=Math.sin(te.time.value*.11)*.22,Ri.scale.setScalar(.45+e.age*1.02);else if(t===5){Wa.visible=!0;for(let l=0;l<ph;l++){let c=l/(ph-1),h=l%2,d=(c-.5)*(4.2+e.age*.7),u=c*Math.PI*8+te.time.value*(h?-1.1:.9)+h*Math.PI,f=Nn[Math.floor(c*(gn-1))]/255,g=.6+e.age*.62+f*.38,v=u+.13,p=l*6;Ar[p]=s+Math.cos(u)*g,Ar[p+1]=a+d,Ar[p+2]=o+Math.sin(u)*g,Ar[p+3]=s+Math.cos(v)*g,Ar[p+4]=a+d+.045,Ar[p+5]=o+Math.sin(v)*g}Ah.attributes.position.needsUpdate=!0,Ec.opacity=r*(.25+x.mid*.52)}else if(t===6){fi.visible=!0,fi.position.set(s,a,o),fi.rotation.y=te.time.value*.07;for(let l of fi.children){let c=l.userData.index,h=Mt(c/12,c/12+.32,i)*(1-Mt(.62+c/30,1,i)),d=(c-4)*(.18+e.age*.12);l.position.set(Math.sin(c*1.7)*e.age*.08,(c-4)*.12,d),l.rotation.z=(c-4)*.035+Math.sin(te.time.value*.4+c)*.02,l.scale.setScalar(.62+e.age*.52+c*.025),l.material.opacity=h*r*(.25+x.high*.42)}}else if(t===7){di.visible=!0,Er.pulseAge.value=e.age,Er.pulseStrength.value=e.strength*e.contributionScale*Math.exp(-e.age*.34),di.position.set(s,a,o);let l=$n(18+x.high*3,.18,tr(0,1,i));di.scale.set(l*1.15,l*.58,l)}else{qn.visible=!0,qn.position.set(s,a,o),qn.rotation.x=Math.PI/2+Math.sin(te.time.value*.17)*.18,qn.rotation.y=te.time.value*-.12;let l=$n(10.5,.15,tr(0,1,i));qn.scale.set(l*1.25,l*.72,l),qn.material.opacity=r*(.22+x.high*.35)}}function Jy(n,e){Ip.rotation.y+=n*.0018,Rh.rotation.y-=n*.0032,Dp.rotation.y+=n*7e-4;let t=x.shutdown>.5?[]:ws(xn),i=bh(t.length),r=[.0185,.0205,.019,.024,.018,.021,.023,.026,.03];hn.fog.density=un(hn.fog.density,r[x.tideIndex]+x.dive*.0035+x.phaseTransition*.0025,1.8,n);for(let h=0;h<xh.length;h++){let d=xh[h];d.rotation.z+=n*(.0014+h*24e-5)*(h%2?-1:1),d.rotation.y+=n*8e-4,d.material.color.copy(h%3===0?te.glowColor.value:te.secondaryColor.value);let u=0;for(let f of t)u+=f.age<4.5?f.strength*f.contributionScale*Math.exp(-f.age*.34)*Math.exp(-Math.abs(h-f.age*1.15)*.72)*i:0;d.material.opacity=(.005+x.high*.007+u*.055+x.phaseTransition*.025)*x.ritual*(1-x.shutdown)}bc.emissive.copy(te.secondaryColor.value),bc.emissiveIntensity=(.035+x.low*.22)*x.ritual*(1-x.shutdown),bc.opacity=.34+x.ritual*.28,wh.forEach((h,d)=>{h.rotation.z+=n*(.004+d*.002)*(d%2?-1:1);let u=t.reduce((f,g)=>f+(g.age<3?g.strength*g.contributionScale*.075*Math.exp(-g.age*.34)*i:0),0);h.material.opacity=(.018+x.high*.06+u)*x.ritual*(1-x.shutdown)}),Dc.intensity=.55*x.ritual*(1-x.shutdown)+x.high*1.6+x.phaseTransition*1.8,Lp.intensity=.035+x.ritual*.115;let s=[.52,.64,.58,.49,.68,.6,.5,.72,.38];An.strength=((ot?.42:s[x.tideIndex])+x.energy*.54+x.archiveOpen*.05+x.phaseTransition*.65)*(.22+x.lightLevel*.78)*(1-Mt(.78,1,x.shutdown)*.72),An.radius=.64+x.high*.1+x.phaseTransition*.15+x.shutdown*.08;let a=x.tideIndex===5?.905:x.tideIndex===7?.925:x.tideIndex===8?.94:.86;Xt.uniforms.damp.value=x.shutdown>.45?$n(.9,.982,Mt(.45,.9,x.shutdown)):a+x.high*.018+x.phaseTransition*.035;let o=[.86,.8,.76,.68,.88,.8,.7,.74,.54];Fe.toneMappingExposure=(.025+x.lightLevel*(o[x.tideIndex]+x.energy*.1+x.phaseTransition*.12))*(1-Mt(.76,1,x.shutdown)*.96);let l=Mt(.72,1,x.shutdown),c=Math.max(1-x.lightLevel,l);document.documentElement.style.setProperty("--blackout",c.toFixed(4))}function Ky(){if(pp||x.dragging||!x.calibrated||x.ending)return;Oa.setFromCamera(Zn,$t);let n=Oa.intersectObject(nr,!1).length>0;n!==x.coreHovered&&(x.coreHovered=n,K.cursor.classList.toggle("active",n))}function jy(n,e){let t=vt(n/Va,0,1),i=x.audioReady?t*e:n;K.timeNow.textContent=Fa(i),K.timeTotal.textContent=Fa(e),document.documentElement.style.setProperty("--progress",`${(t*100).toFixed(3)}%`),K.index.textContent=`09\u2013${String(Math.floor(t*9999)).padStart(4,"0")}`,K.archiveProgress.setAttribute("aria-valuenow",(t*100).toFixed(1)),K.archiveProgress.setAttribute("aria-valuetext",`${Fa(i)} / ${Fa(e)}`)}function Ha(n,e){x.activeSeconds+=n,te.time.value=e,x.previewMode==="main"?(x.ritual=1,x.ignite=1,x.lightLevel=1,te.ritual.value=1,te.ignite.value=1):x.previewMode==="ending"&&(x.ritual=1,x.ignite=1,x.lightLevel=1,x.shutdown=Math.max(x.shutdown,.68),te.ritual.value=1,te.ignite.value=1,te.shutdown.value=x.shutdown),Oy(n,e),Hy(n),Vy();let t=ky(),i=Gy(e,t);Wy(i,n),Xy(n),Yy(n,e),Zy(n,e),$y(n),Jy(n,e),Ky(),jy(i,t)}function Fh(n,e){Ha(n,e),qa.setSeed(Lr?_h??0:Rs%256),Wt.render(n),Rs++}function Qy(n){if(Et=null,Fn||Lc||Ii)return;As.update(n);let e=vt(As.getDelta(),0,.05),t=As.getElapsed();Fh(e,t),Ay(n),Nh()}function eM(){let n=innerWidth,e=innerHeight;$t.aspect=n/e,$t.updateProjectionMatrix();let t=Math.min(devicePixelRatio,ot?1.15:1.6);Fe.setPixelRatio(t),Fe.setSize(n,e),Wt.setSize(n,e),te.pixelRatio.value=t,te.resolution.value.set(n*t,e*t)}window.addEventListener("resize",eM);function Nc(n,e){if(!["opening","main","ending"].includes(n))throw new TypeError(`Unknown Ninth Tide preview mode: ${String(n)}`);if(!Number.isInteger(e)||e<0||e>8)throw new RangeError(`Ninth Tide preview section must be an integer from 0 through 8; received ${String(e)}.`);Mc(xn),Ds(),x.previewMode=n,x.previewSection=e,x.tideIndex=e,x.transitionFrom=e,x.pendingTide=-1,x.phaseLocal=0,x.phaseTransition=0,x.transitionClock=99,x.transitionSwitched=!1,x.shutdown=0,x.ending=!1,x.ended=!1,x.endingCue=0,x.ceremonyCue=0,x.archiveOpen=0,te.section.value=e,te.sectionLocal.value=0,te.phaseTransition.value=0,te.shutdown.value=0,Za=-1,x.entered=!0,x.calibrated=n!=="opening",x.ceremonyTime=n==="opening"?5.75:99,x.ritual=n==="opening"?.73:1,x.ignite=n==="opening"?.44:1,x.lightLevel=n==="opening"?.72:1,x.archiveOpenTarget=n==="main"?.76:.45,x.diveTarget=n==="main"?.28:.2,te.ritual.value=x.ritual,te.ignite.value=x.ignite,document.body.classList.add("entered"),document.body.classList.toggle("calibrated",x.calibrated),document.body.classList.toggle("ending",n==="ending"),document.body.classList.remove("ended"),document.documentElement.style.setProperty("--blackout",n==="opening"?"0.28":"0");let t=Ua[e];K.phaseNumber.textContent=t[0],K.phaseName.textContent=t[1],K.phaseSub.textContent=t[2],K.sideTicks.forEach((i,r)=>i.classList.toggle("active",r===e)),Is(n==="opening"?"\u5F00\u573A\u6821\u51C6\u4E2D":n==="ending"?"\u7EC8\u5E55\u9000\u6F6E\u4E2D \xB7 \u7B2C IX \u7AE0":`\u7B2C ${t[0]} \u7AE0 \xB7 ${t[1]}`),xi({origin:new he(0,0),strength:n==="ending"?.45:1.15,sourceY:.34,announce:!1,mode:e,source:"system"})}var tM=Object.freeze(["opacity","emissiveIntensity","roughness","metalness","linewidth","size","rotation","alphaTest"]),nM=Object.freeze(["color","emissive","specular"]);function iM(n){return n===null||["number","string","boolean"].includes(typeof n)?Object.freeze({kind:"primitive",value:n}):n instanceof Ee?Object.freeze({kind:"color",value:Object.freeze([n.r,n.g,n.b])}):n instanceof he||n instanceof I||n instanceof gt?Object.freeze({kind:"vector",value:Object.freeze(n.toArray())}):n instanceof Pn?Object.freeze({kind:"quaternion",value:Object.freeze(n.toArray())}):n instanceof Vn?Object.freeze({kind:"euler",value:Object.freeze([n.x,n.y,n.z,n.order])}):Object.freeze({kind:"reference",value:n})}function rM(n,e,t,i){if(t.kind==="primitive")n[e]=t.value;else if(t.kind==="color")n[e].setRGB(...t.value);else if(t.kind==="vector"||t.kind==="quaternion")n[e].fromArray(t.value);else if(t.kind==="euler")n[e].set(...t.value);else if(n[e]!==t.value)throw new Error(`Ninth Tide deterministic baseline reference changed: ${i}.`)}function yh(n){return Object.freeze(Object.fromEntries(Object.entries(n).map(([e,t])=>[e,iM(t)])))}function Mh(n,e,t){let i=Object.keys(n).sort(),r=Object.keys(e).sort();if(i.length!==r.length||i.some((s,a)=>s!==r[a]))throw new Error(`Ninth Tide deterministic ${t} shape changed.`);for(let s of r)rM(n,s,e[s],`${t}.${s}`)}function sM(n){let e={},t={};for(let i of tM)typeof n[i]=="number"&&(e[i]=n[i]);for(let i of nM)n[i]instanceof Ee&&(t[i]=Object.freeze(n[i].toArray()));return Object.freeze({material:n,scalars:Object.freeze(e),colors:Object.freeze(t),uniforms:n.uniforms?yh(Object.fromEntries(Object.entries(n.uniforms).map(([i,r])=>[i,r.value]))):null})}function aM(n){for(let[e,t]of Object.entries(n.scalars))n.material[e]=t;for(let[e,t]of Object.entries(n.colors))n.material[e].fromArray(t);if(n.uniforms){let e=Object.fromEntries(Object.entries(n.material.uniforms).map(([t,i])=>[t,i.value]));Mh(e,n.uniforms,`material ${n.material.uuid} uniforms`);for(let[t,i]of Object.entries(e))n.material.uniforms[t].value=i}}function oM(){let n=[],e=new Map,t=new Map,i=r=>{n.push(Object.freeze({object:r,position:Object.freeze(r.position.toArray()),quaternion:Object.freeze(r.quaternion.toArray()),scale:Object.freeze(r.scale.toArray()),visible:r.visible,intensity:typeof r.intensity=="number"?r.intensity:null,color:r.color instanceof Ee?Object.freeze(r.color.toArray()):null,instanceMatrix:r.isInstancedMesh?new r.instanceMatrix.array.constructor(r.instanceMatrix.array):null,instanceColor:r.isInstancedMesh&&r.instanceColor?new r.instanceColor.array.constructor(r.instanceColor.array):null}));let s=Array.isArray(r.material)?r.material:r.material?[r.material]:[];for(let a of s)e.has(a.uuid)||e.set(a.uuid,sM(a));if(r.geometry&&!t.has(r.geometry.uuid)){let a=Object.fromEntries(Object.entries(r.geometry.attributes).map(([o,l])=>[o,Object.freeze({attribute:l,array:new l.array.constructor(l.array)})]));t.set(r.geometry.uuid,Object.freeze({geometry:r.geometry,attributes:Object.freeze(a)}))}};return hn.traverse(i),i($t),Object.freeze({objects:Object.freeze(n),materials:Object.freeze([...e.values()]),geometries:Object.freeze([...t.values()])})}function lM(n){for(let e of n.objects){if(e.object.position.fromArray(e.position),e.object.quaternion.fromArray(e.quaternion),e.object.scale.fromArray(e.scale),e.object.visible=e.visible,e.intensity!==null&&(e.object.intensity=e.intensity),e.color&&e.object.color.fromArray(e.color),e.instanceMatrix&&(e.object.instanceMatrix.array.set(e.instanceMatrix),e.object.instanceMatrix.needsUpdate=!0),e.instanceColor){if(!e.object.instanceColor||e.object.instanceColor.array.length!==e.instanceColor.length)throw new Error(`Ninth Tide deterministic instance color changed: ${e.object.uuid}.`);e.object.instanceColor.array.set(e.instanceColor),e.object.instanceColor.needsUpdate=!0}e.object.updateMatrix()}for(let e of n.materials)aM(e);for(let e of n.geometries)for(let[t,i]of Object.entries(e.attributes)){let r=e.geometry.getAttribute(t);if(r!==i.attribute||r.array.length!==i.array.length)throw new Error(`Ninth Tide deterministic geometry attribute changed: ${e.geometry.uuid}.${t}.`);r.array.set(i.array),r.needsUpdate=!0}hn.updateMatrixWorld(!0),$t.updateMatrixWorld(!0)}function cM(){let n=[...new Set([...Object.values(K).flatMap(e=>Array.isArray(e)?e:[e]),...K.sideTicks])];return Object.freeze({rootClassName:document.documentElement.className,rootStyle:document.documentElement.getAttribute("style"),bodyClassName:document.body.className,bodyStyle:document.body.getAttribute("style"),elements:Object.freeze(n.map(e=>Object.freeze({element:e,className:e.className,style:e.getAttribute("style"),textContent:e instanceof HTMLAudioElement||e instanceof HTMLInputElement||e.children.length>0?null:e.textContent,hidden:"hidden"in e?e.hidden:null,disabled:"disabled"in e?e.disabled:null})))})}function ch(n,e,t){t===null?n.removeAttribute(e):n.setAttribute(e,t)}function uM(n){document.documentElement.className=n.rootClassName,ch(document.documentElement,"style",n.rootStyle),document.body.className=n.bodyClassName,ch(document.body,"style",n.bodyStyle);for(let e of n.elements)e.element.className=e.className,ch(e.element,"style",e.style),e.textContent!==null&&(e.element.textContent=e.textContent),e.hidden!==null&&(e.element.hidden=e.hidden),e.disabled!==null&&(e.element.disabled=e.disabled)}function Xp(){if(!(Xt._textureComp instanceof xt)||!(Xt._textureOld instanceof xt)||Xt._textureComp===Xt._textureOld)throw new Error("Ninth Tide deterministic capture requires two distinct Afterimage render targets.")}function hM(n){if(!(n instanceof xt))throw new Error("Ninth Tide deterministic capture encountered an invalid render target.");Fe.setRenderTarget(n),Fe.clear(!0,!0,!0)}function dM(n){Xp();let e=Fe.getRenderTarget(),t=Fe.getClearColor(new Ee).clone(),i=Fe.getClearAlpha();Fe.setClearColor(0,0),Wt.readBuffer=n.composerReadBuffer,Wt.writeBuffer=n.composerWriteBuffer;let r=new Set([Wt.renderTarget1,Wt.renderTarget2,Xt._textureComp,Xt._textureOld,An.renderTargetBright,...An.renderTargetsHorizontal,...An.renderTargetsVertical]);for(let s of r)hM(s);Fe.setClearColor(t,i),Fe.setRenderTarget(e)}function fM(n){return[...n].map(e=>e.toString(16).padStart(2,"0")).join("")}async function Uh(n){if(!crypto.subtle||typeof crypto.subtle.digest!="function")throw new Error("Ninth Tide deterministic capture requires crypto.subtle.digest().");return fM(new Uint8Array(await crypto.subtle.digest("SHA-256",n)))}async function qp(n){let e=n.drawingBufferWidth,t=n.drawingBufferHeight;if(!Number.isInteger(e)||e<=0||!Number.isInteger(t)||t<=0)throw new Error("Ninth Tide deterministic capture requires a non-empty drawing buffer.");let i=new Uint8Array(e*t*4);if(n.readPixels(0,0,e,t,n.RGBA,n.UNSIGNED_BYTE,i),n.getError()!==n.NO_ERROR)throw new Error("Ninth Tide framebuffer readPixels failed.");let r=new Uint8Array(14+i.length);r.set(new TextEncoder().encode("rgba8\0"),0);let s=new DataView(r.buffer,0,14);s.setUint32(6,e,!1),s.setUint32(10,t,!1);let a=e*4;for(let o=0;o<t;o++){let l=t-1-o;r.set(i.subarray(l*a,(l+1)*a),14+o*a)}return{width:e,height:t,hash:await Uh(r)}}async function pM(n){if(!(n instanceof xt)||n.texture.type!==wt||!Number.isInteger(n.width)||n.width<=0||!Number.isInteger(n.height)||n.height<=0)throw new Error("Ninth Tide dither QA requires a non-empty half-float render target.");let e=new Uint16Array(n.width*n.height*4);await Fe.readRenderTargetPixelsAsync(n,0,0,n.width,n.height,e);let t=new Uint8Array(14+e.byteLength);t.set(new TextEncoder().encode("f16\0\0\0"),0);let i=new DataView(t.buffer,0,14);i.setUint32(6,n.width,!1),i.setUint32(10,n.height,!1);let r=n.width*4,s=new Uint16Array(e.length);for(let a=0;a<n.height;a++){let o=n.height-1-a;s.set(e.subarray(o*r,(o+1)*r),a*r)}return t.set(new Uint8Array(s.buffer),14),{width:n.width,height:n.height,hash:await Uh(t)}}function Yp(n){let e=n.getExtension("WEBGL_debug_renderer_info");if(!e)throw new Error("Ninth Tide deterministic capture requires WEBGL_debug_renderer_info.");let t=n.getParameter(e.UNMASKED_RENDERER_WEBGL),i=n.getContextAttributes();if(typeof t!="string"||t.length===0||!i)throw new Error("Ninth Tide deterministic capture could not audit the WebGL renderer.");return{raw:t,debugInfoAvailable:!0,contextAttributes:{...i}}}function mM(){let n=ot?2:5,e=ot?2:3,t=rn*2;return{tier:ot?"mobile":"desktop",systemSlots:n,userSlots:e,totalSlots:rn,addedVectorsPerStage:t,minimumFragmentVectors:224,minimumVertexVectors:256,remainingMinimumFragmentVectors:224-t,remainingMinimumVertexVectors:256-t,actualFragmentVectors:Fe.capabilities.maxFragmentUniforms,actualVertexVectors:Fe.capabilities.maxVertexUniforms}}Lr&&(Xp(),nr.geometry.boundingSphere===null&&nr.geometry.computeBoundingSphere());var at=Lr?Object.freeze({state:yh(x),pulseHistory:sh(xn),globals:yh(Object.fromEntries(Object.entries(te).map(([n,e])=>[n,e.value]))),scene:oM(),dom:cM(),pointer:Object.freeze(Zn.toArray()),pointerSmooth:Object.freeze(ji.toArray()),spectrum:new Uint8Array(Nn),randomState:Sh.getState(),lastTide:Za,frameStats:Object.freeze({...nn}),audioContext:Tt,analyser:Zt,frequencyData:kt,timeData:Rr,rendererTarget:Fe.getRenderTarget(),rendererExposure:Fe.toneMappingExposure,fogDensity:hn.fog.density,bloomStrength:An.strength,bloomRadius:An.radius,bloomThreshold:An.threshold,afterimageDamp:Xt.uniforms.damp.value,composerReadBuffer:Wt.readBuffer,composerWriteBuffer:Wt.writeBuffer,afterimageTextureComp:Xt._textureComp,afterimageTextureOld:Xt._textureOld,drawingBufferWidth:Fe.getContext().drawingBufferWidth,drawingBufferHeight:Fe.getContext().drawingBufferHeight}):null;function Zp(){if(!at)throw new Error("Ninth Tide deterministic baseline is unavailable.");if(clearTimeout(vn.timer),vn.timer=void 0,Tt!==at.audioContext||Zt!==at.analyser||kt!==at.frequencyData||Rr!==at.timeData)throw new Error("Ninth Tide audio graph changed after deterministic baseline capture.");let n=Fe.getContext();if(n.drawingBufferWidth!==at.drawingBufferWidth||n.drawingBufferHeight!==at.drawingBufferHeight)throw new Error("Ninth Tide deterministic capture viewport changed after baseline capture.");K.audio.pause(),Mh(x,at.state,"state"),up(xn,at.pulseHistory),Ds();let e=Object.fromEntries(Object.entries(te).map(([t,i])=>[t,i.value]));Mh(e,at.globals,"globals");for(let[t,i]of Object.entries(e))te[t].value=i;lM(at.scene),uM(at.dom),Zn.fromArray(at.pointer),ji.fromArray(at.pointerSmooth),Nn.set(at.spectrum),ir.needsUpdate=!0,Ls(),Sh.setState(at.randomState),Za=at.lastTide,Object.assign(nn,at.frameStats),nn.sampleStartedAt=0,nn.sampleFrames=0,hn.fog.density=at.fogDensity,An.strength=at.bloomStrength,An.radius=at.bloomRadius,An.threshold=at.bloomThreshold,Xt.uniforms.damp.value=at.afterimageDamp,Xt._textureComp=at.afterimageTextureComp,Xt._textureOld=at.afterimageTextureOld,Fe.toneMappingExposure=at.rendererExposure,Fe.setRenderTarget(at.rendererTarget),dM(at)}function gM(n,e,t){return{mode:n,section:e,timestampMs:t,state:{ritual:x.ritual,ignite:x.ignite,lightLevel:x.lightLevel,shutdown:x.shutdown,archiveOpen:x.archiveOpen,low:x.low,mid:x.mid,high:x.high,rms:x.rms,energy:x.energy,transient:x.transient,tideIndex:x.tideIndex,tideFloat:x.tideFloat,phaseLocal:x.phaseLocal,phaseTransition:x.phaseTransition,dive:x.dive,yaw:x.yaw,pitch:x.pitch,activeSeconds:x.activeSeconds,syntheticPhase:x.syntheticPhase},globals:{time:te.time.value,section:te.section.value,sectionLocal:te.sectionLocal.value,tide:te.tide.value,open:te.open.value,pulseClock:te.uPulseClock.value},pulseHistory:sh(xn),camera:{position:$t.position.toArray(),quaternion:$t.quaternion.toArray()},spectrum:[...Nn]}}async function xM(n,e,t){let i=new TextEncoder().encode(JSON.stringify(gM(n,e,t)));return Uh(i)}function $p(n){if(!Ir(n,["mode","section","timestampMs"]))throw new Error("Ninth Tide deterministic step requires exactly mode, section, and timestampMs.");if(!["opening","main","ending"].includes(n.mode))throw new TypeError(`Unknown Ninth Tide deterministic mode: ${String(n.mode)}.`);if(!Number.isInteger(n.section)||n.section<0||n.section>8)throw new RangeError(`Ninth Tide deterministic section must be an integer from 0 through 8; received ${String(n.section)}.`);if(typeof n.timestampMs!="number"||!Number.isFinite(n.timestampMs)||n.timestampMs<0)throw new RangeError(`Ninth Tide deterministic timestampMs must be finite and non-negative; received ${String(n.timestampMs)}.`)}async function Jp(n){if(Ii)throw new Error("Ninth Tide deterministic step is already running.");$p(n),Ii=!0;try{if(Et!==null&&cancelAnimationFrame(Et),Et=null,Zp(),Nc(n.mode,n.section),n.mode==="main"){let l=.016666666666666666,c=n.timestampMs/1e3;for(let h=0;h<fp;h++)Ha(l,c-(fp-h)*l)}let e=Rs;Fe.info.reset(),Fe.setRenderTarget(null),Fh(1/60,n.timestampMs/1e3);let t=Rs-e;if(t!==1)throw new Error(`Ninth Tide deterministic step rendered ${t} top-level frames.`);if(Et!==null)throw cancelAnimationFrame(Et),Et=null,new Error("Ninth Tide deterministic step queued an animation frame.");let i=Fe.getContext(),r=Yp(i);i.finish();let s=await qp(i),a=await xM(n.mode,n.section,n.timestampMs);Fe.setRenderTarget(at.rendererTarget);let o=n.mode==="opening"?Ua[0][0]:n.mode==="ending"?Ua[8][0]:Ua[n.section][0];return{mode:n.mode,section:n.section,timestampMs:n.timestampMs,frameRenders:t,queuedAnimationFrames:Et===null?0:1,stateDigest:a,framebuffer:s,renderer:r,chapter:{mode:n.mode,section:n.section,phase:o},chapterNumber:n.section+1}}finally{Et!==null&&cancelAnimationFrame(Et),Et=null,Fe.setRenderTarget(at.rendererTarget),Ii=!1}}async function vM(n){if(za)throw new Error("Ninth Tide dither scenario is already running.");return Jp(n)}function _M(n){if(!Ir(n,["mode","section","timestampMs","seed"]))throw new Error("Ninth Tide dither scenario requires exactly mode, section, timestampMs, and seed.");if($p({mode:n.mode,section:n.section,timestampMs:n.timestampMs}),!Number.isInteger(n.seed)||n.seed<0||n.seed>255)throw new RangeError(`Ninth Tide dither seed must be an integer from 0 through 255; received ${String(n.seed)}.`)}async function yM(n){if(_M(n),za||Ii)throw new Error("Ninth Tide dither scenario is already running.");za=!0,_h=n.seed;try{let e=await Jp({mode:n.mode,section:n.section,timestampMs:n.timestampMs}),t=await pM(Xt._textureOld),i=new Map([[Np,"RenderPass"],[An,"UnrealBloomPass"],[Xt,"AfterimagePass"],[Fp,"VeilShaderPass"],[qa,"DitheredOutputPass"]]),r=Wt.passes.map(s=>{let a=i.get(s);if(!a)throw new Error("Ninth Tide composer contains an unaudited pass.");return a});return{...e,seed:n.seed,afterimageFeedback:t,passChain:r,outputOwners:Wt.passes.filter(s=>s.isDitheredOutputPass===!0).length,intermediatePrecision:{composerHalfFloat:Wt.readBuffer.texture.type===wt&&Wt.writeBuffer.texture.type===wt,afterimageHalfFloat:Xt._textureOld.texture.type===wt&&Xt._textureComp.texture.type===wt}}}finally{_h=null,qa.setSeed(0),Fe.setRenderTarget(at.rendererTarget),za=!1}}function MM(n){if(!Ir(n,["scenario","section","timestampMs"]))throw new Error("Ninth Tide pulse scenario requires exactly scenario, section, and timestampMs.");if(!["zero-pulse","user-then-auto","user-epsilon-then-auto","ending-convergence","ending-convergence-empty"].includes(n.scenario))throw new TypeError(`Unknown Ninth Tide pulse scenario: ${String(n.scenario)}.`);if(!Number.isInteger(n.section)||n.section<0||n.section>8)throw new RangeError(`Ninth Tide pulse scenario section must be an integer from 0 through 8; received ${String(n.section)}.`);if(typeof n.timestampMs!="number"||!Number.isFinite(n.timestampMs)||n.timestampMs<0||n.timestampMs>6e3)throw new RangeError(`Ninth Tide pulse scenario timestampMs must be finite from 0 through 6000; received ${String(n.timestampMs)}.`)}async function SM(n){if(Ii||za)throw new Error("Ninth Tide deterministic step is already running.");MM(n),Ii=!0;try{Et!==null&&cancelAnimationFrame(Et),Et=null,Zp();let e=n.scenario.startsWith("ending-convergence");Nc(e?"ending":"main",e?8:n.section),(!e||n.scenario==="ending-convergence-empty")&&(Mc(xn),Ds()),n.scenario==="ending-convergence-empty"&&(x.endingCue=2),(n.scenario==="user-then-auto"||n.scenario==="user-epsilon-then-auto")&&xi({origin:new he(3.25,-1.6),strength:n.scenario==="user-then-auto"?1.05:1e-6,sourceY:-2.28,announce:!1,mode:n.section,source:"user"});let t=1/60,i=n.timestampMs/1e3,r=0,s=!1;for(;r+1e-9<i;){let u=Math.min(t,i-r);if((n.scenario==="user-then-auto"||n.scenario==="user-epsilon-then-auto")&&!s&&r<1&&r+u>=1){let f=1-r;f>0&&Ha(f,1),r=1,xi({origin:new he(0,0),strength:.72,sourceY:.32,announce:!1,mode:n.section,source:"auto"}),s=!0;let g=u-f;g>0&&(r+=g,Ha(g,r))}else r+=u,Ha(u,r)}if((n.scenario==="user-then-auto"||n.scenario==="user-epsilon-then-auto")&&!s&&i>=1)throw new Error("Ninth Tide pulse scenario failed to insert the scheduled auto pulse.");let a=Rs;Fe.info.reset(),Fe.setRenderTarget(null),Fh(0,i);let o=Rs-a;if(o!==1||Et!==null)throw new Error("Ninth Tide pulse scenario must render exactly one top-level frame without scheduling RAF.");let l=Fe.getContext(),c=Yp(l);l.finish();let h=await qp(l),d=ws(xn).map(u=>({...u}));return{scenario:n.scenario,section:e?8:n.section,timestampMs:n.timestampMs,frameRenders:o,queuedAnimationFrames:0,framebuffer:h,renderer:c,uniformBudget:mM(),livePulses:d,artifacts:{shell:mi.visible,curtain:Ki.visible,spokes:Ga.visible,pillars:Yn.visible,lattice:Ri.visible,helix:Wa.visible,slabs:fi.visible,convergence:di.visible,null:qn.visible}}}finally{Et!==null&&cancelAnimationFrame(Et),Et=null,Fe.setRenderTarget(at.rendererTarget),Ii=!1}}function bM(n){if(!Ir(n,["clientX","clientY"])||typeof n.clientX!="number"||!Number.isFinite(n.clientX)||typeof n.clientY!="number"||!Number.isFinite(n.clientY))throw new Error("Ninth Tide hit test requires finite clientX and clientY values.");let e=Fe.domElement.getBoundingClientRect();if(!(e.width>0)||!(e.height>0))throw new Error("Ninth Tide hit test requires a visible renderer canvas.");let t=new he((n.clientX-e.left)/e.width*2-1,-((n.clientY-e.top)/e.height)*2+1),i=new ds;return i.setFromCamera(t,$t),i.intersectObject(nr,!1).length>0}if(Lr){Lc=!0;let n=mp??Sc.get("preview"),e,t=window.__NINTH_TIDE_PREVIEW_SECTION__;if(t!==void 0){if(!Number.isInteger(t)||t<0||t>8)throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(t)}.`);e=t}else if(Sc.has("section")){let i=Sc.get("section");if(!/^[0-8]$/.test(i))throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(i)}.`);e=Number(i)}else e=n==="ending"?8:n==="opening"?0:gp;Nc(n,e),window.__NINTH_TIDE_STEP__=vM,window.__NINTH_TIDE_HIT_TEST__=bM,window.__NINTH_TIDE_PULSE_SCENARIO__=SM,window.__NINTH_TIDE_DITHER_SCENARIO__=yM}Iy();Lh();Lr||Nh();window.addEventListener("beforeunload",()=>{document.removeEventListener("visibilitychange",Vp),window.removeEventListener("message",kp),Et!==null&&cancelAnimationFrame(Et),gi&&URL.revokeObjectURL(gi),As.dispose(),qa.dispose(),Wt.dispose(),Fe.dispose()});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
