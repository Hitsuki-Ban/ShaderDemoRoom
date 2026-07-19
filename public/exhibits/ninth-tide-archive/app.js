(()=>{var Jo="184";var $u=0,Jc=1,Ju=2;var ea=1,Ku=2,rr=3,Mi=0,Wt=1,un=2,dn=0,rs=1,st=2,Kc=3,jc=4,ju=5;var Oi=100,Qu=101,ed=102,td=103,nd=104,id=200,sd=201,rd=202,ad=203,ho=204,uo=205,od=206,ld=207,cd=208,hd=209,ud=210,dd=211,fd=212,pd=213,md=214,fo=0,po=1,mo=2,as=3,go=4,xo=5,vo=6,_o=7,Qc=0,gd=1,xd=2,Hn=0,ta=1,na=2,ia=3,ps=4,sa=5,ra=6,aa=7;var eh=300,Vi=301,ms=302,Ko=303,jo=304,oa=306,yo=1e3,Mn=1001,Mo=1002,Lt=1003,vd=1004;var la=1005;var Nt=1006,Qo=1007;var ki=1008;var $t=1009,th=1010,nh=1011,ar=1012,el=1013,Vn=1014,An=1015,Bt=1016,tl=1017,nl=1018,or=1020,ih=35902,sh=35899,rh=1021,ah=1022,Cn=1023,jn=1026,Gi=1027,lr=1028,il=1029,Wi=1030,sl=1031;var rl=1033,ca=33776,ha=33777,ua=33778,da=33779,al=35840,ol=35841,ll=35842,cl=35843,hl=36196,ul=37492,dl=37496,fl=37488,pl=37489,fa=37490,ml=37491,gl=37808,xl=37809,vl=37810,_l=37811,yl=37812,Ml=37813,Sl=37814,bl=37815,wl=37816,El=37817,Tl=37818,Al=37819,Cl=37820,Rl=37821,Pl=36492,Il=36494,Ll=36495,Dl=36283,Nl=36284,pa=36285,Ul=36286;var Ir=2300,So=2301,co=2302,zc=2303,Hc=2400,Vc=2401,kc=2402;var _d=3200;var Fl=0,yd=1,bi="",Zt="srgb",Lr="srgb-linear",Dr="linear",it="srgb";var ss=7680;var Gc=519,Md=512,Sd=513,bd=514,Ol=515,wd=516,Ed=517,Bl=518,Td=519,bo=35044,cr=35048;var oh="300 es",Fn=2e3,qs=2001;function jf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ad(){let i=Nr("canvas");return i.style.display="block",i}var gu={},Ys=null;function Ur(...i){let e="THREE."+i.shift();Ys?Ys("log",e,...i):console.log(e,...i)}function Cd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Re(...i){i=Cd(i);let e="THREE."+i.shift();if(Ys)Ys("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ie(...i){i=Cd(i);let e="THREE."+i.shift();if(Ys)Ys("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function wo(...i){let e=i.join(" ");e in gu||(gu[e]=!0,Re(...i))}function Rd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Pd={[fo]:po,[mo]:vo,[go]:_o,[as]:xo,[po]:fo,[vo]:mo,[_o]:go,[xo]:as},Qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xu=1234567,Ws=Math.PI/180,Zs=180/Math.PI;function _i(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function lh(i,e){return(i%e+e)%e}function ep(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function tp(i,e,t){return i!==e?(t-i)/(e-i):0}function Pr(i,e,t){return(1-t)*i+t*e}function np(i,e,t,n){return Pr(i,e,1-Math.exp(-t*n))}function ip(i,e=1){return e-Math.abs(lh(i,e*2)-e)}function sp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function rp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ap(i,e){return i+Math.floor(Math.random()*(e-i+1))}function op(i,e){return i+Math.random()*(e-i)}function lp(i){return i*(.5-Math.random())}function cp(i){i!==void 0&&(xu=i);let e=xu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hp(i){return i*Ws}function up(i){return i*Zs}function dp(i){return(i&i-1)===0&&i!==0}function fp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function pp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function mp(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),p=r((n-e)/2),x=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*x,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*x,o*c);break;case"ZYZ":i.set(l*x,l*p,o*h,o*c);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Un(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var zl={DEG2RAD:Ws,RAD2DEG:Zs,generateUUID:_i,clamp:Ke,euclideanModulo:lh,mapLinear:ep,inverseLerp:tp,lerp:Pr,damp:np,pingpong:ip,smoothstep:sp,smootherstep:rp,randInt:ap,randFloat:op,randFloatSpread:lp,seededRandom:cp,degToRad:hp,radToDeg:up,isPowerOfTwo:dp,ceilPowerOfTwo:fp,floorPowerOfTwo:pp,setQuaternionFromProperEuler:mp,normalize:at,denormalize:Un},fh=class fh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fh.prototype.isVector2=!0;var ue=fh,Tn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],p=r[a+1],x=r[a+2],_=r[a+3];if(d!==_||l!==u||c!==p||h!==x){let g=l*u+c*p+h*x+d*_;g<0&&(u=-u,p=-p,x=-x,_=-_,g=-g);let f=1-o;if(g<.9995){let M=Math.acos(g),w=Math.sin(M);f=Math.sin(f*M)/w,o=Math.sin(o*M)/w,l=l*f+u*o,c=c*f+p*o,h=h*f+x*o,d=d*f+_*o}else{l=l*f+u*o,c=c*f+p*o,h=h*f+x*o,d=d*f+_*o;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],p=r[a+2],x=r[a+3];return e[t]=o*x+h*d+l*p-c*u,e[t+1]=l*x+h*u+c*d-o*p,e[t+2]=c*x+h*p+o*u-l*d,e[t+3]=h*x-o*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),p=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*p*x,this._y=c*p*d-u*h*x,this._z=c*h*x+u*p*d,this._w=c*h*d-u*p*x;break;case"YXZ":this._x=u*h*d+c*p*x,this._y=c*p*d-u*h*x,this._z=c*h*x-u*p*d,this._w=c*h*d+u*p*x;break;case"ZXY":this._x=u*h*d-c*p*x,this._y=c*p*d+u*h*x,this._z=c*h*x+u*p*d,this._w=c*h*d-u*p*x;break;case"ZYX":this._x=u*h*d-c*p*x,this._y=c*p*d+u*h*x,this._z=c*h*x-u*p*d,this._w=c*h*d+u*p*x;break;case"YZX":this._x=u*h*d+c*p*x,this._y=c*p*d+u*h*x,this._z=c*h*x-u*p*d,this._w=c*h*d-u*p*x;break;case"XZY":this._x=u*h*d-c*p*x,this._y=c*p*d-u*h*x,this._z=c*h*x+u*p*d,this._w=c*h*d+u*p*x;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ph=class ph{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return pc.copy(this).projectOnVector(e),this.sub(pc)}reflect(e){return this.sub(pc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ph.prototype.isVector3=!0;var I=ph,pc=new I,vu=new Tn,mh=class mh{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],x=n[8],_=s[0],g=s[3],f=s[6],M=s[1],w=s[4],b=s[7],C=s[2],T=s[5],P=s[8];return r[0]=a*_+o*M+l*C,r[3]=a*g+o*w+l*T,r[6]=a*f+o*b+l*P,r[1]=c*_+h*M+d*C,r[4]=c*g+h*w+d*T,r[7]=c*f+h*b+d*P,r[2]=u*_+p*M+x*C,r[5]=u*g+p*w+x*T,r[8]=u*f+p*b+x*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,p=c*r-a*l,x=t*d+n*u+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/x;return e[0]=d*_,e[1]=(s*c-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=u*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(mc.makeScale(e,t)),this}rotate(e){return this.premultiply(mc.makeRotation(-e)),this}translate(e,t){return this.premultiply(mc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};mh.prototype.isMatrix3=!0;var Fe=mh,mc=new Fe,_u=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yu=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gp(){let i={enabled:!0,workingColorSpace:Lr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===it&&(s.r=yi(s.r),s.g=yi(s.g),s.b=yi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(s.r=Xs(s.r),s.g=Xs(s.g),s.b=Xs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bi?Dr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Lr]:{primaries:e,whitePoint:n,transfer:Dr,toXYZ:_u,fromXYZ:yu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:_u,fromXYZ:yu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),i}var qe=gp();function yi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var As,Eo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{As===void 0&&(As=Nr("canvas")),As.width=e.width,As.height=e.height;let s=As.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=As}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Nr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yi(t[n]/255)*255):t[n]=yi(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},xp=0,$s=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=_i(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(gc(s[a].image)):r.push(gc(s[a]))}else r=gc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function gc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Eo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}var vp=0,xc=new I,rn=class i extends Qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=Nt,a=ki,o=Cn,l=$t,c=i.DEFAULT_ANISOTROPY,h=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=_i(),this.name="",this.source=new $s(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(xc).x}get height(){return this.source.getSize(xc).y}get depth(){return this.source.getSize(xc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yo:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case Mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yo:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case Mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=eh;rn.DEFAULT_ANISOTROPY=1;var gh=class gh{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],x=l[9],_=l[2],g=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(x-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(x+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,b=(p+1)/2,C=(f+1)/2,T=(h+u)/4,P=(d+_)/4,y=(x+g)/4;return w>b&&w>C?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=T/n,r=P/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=T/s,r=y/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=P/r,s=y/r),this.set(n,s,r,t),this}let M=Math.sqrt((g-x)*(g-x)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(g-x)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gh.prototype.isVector4=!0;var St=gh,To=class extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new rn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new $s(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},xt=class extends To{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Fr=class extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ao=class extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var $o=class $o{constructor(e,t,n,s,r,a,o,l,c,h,d,u,p,x,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,p,x,_,g)}set(e,t,n,s,r,a,o,l,c,h,d,u,p,x,_,g){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=x,f[11]=_,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $o().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Cs.setFromMatrixColumn(e,0).length(),r=1/Cs.setFromMatrixColumn(e,1).length(),a=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,p=a*d,x=o*h,_=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+x*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=x+p*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,p=l*d,x=c*h,_=c*d;t[0]=u+_*o,t[4]=x*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-x,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,p=l*d,x=c*h,_=c*d;t[0]=u-_*o,t[4]=-a*d,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,p=a*d,x=o*h,_=o*d;t[0]=l*h,t[4]=x*c-p,t[8]=u*c+_,t[1]=l*d,t[5]=_*c+u,t[9]=p*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,p=a*c,x=o*l,_=o*c;t[0]=l*h,t[4]=_-u*d,t[8]=x*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+x,t[10]=u-_*d}else if(e.order==="XZY"){let u=a*l,p=a*c,x=o*l,_=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+_,t[5]=a*h,t[9]=p*d-x,t[2]=x*d-p,t[6]=o*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_p,e,yp)}lookAt(e,t,n){let s=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Ii.crossVectors(n,_n),Ii.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Ii.crossVectors(n,_n)),Ii.normalize(),La.crossVectors(_n,Ii),s[0]=Ii.x,s[4]=La.x,s[8]=_n.x,s[1]=Ii.y,s[5]=La.y,s[9]=_n.y,s[2]=Ii.z,s[6]=La.z,s[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],x=n[2],_=n[6],g=n[10],f=n[14],M=n[3],w=n[7],b=n[11],C=n[15],T=s[0],P=s[4],y=s[8],A=s[12],L=s[1],R=s[5],F=s[9],W=s[13],X=s[2],O=s[6],V=s[10],G=s[14],te=s[3],ne=s[7],fe=s[11],Se=s[15];return r[0]=a*T+o*L+l*X+c*te,r[4]=a*P+o*R+l*O+c*ne,r[8]=a*y+o*F+l*V+c*fe,r[12]=a*A+o*W+l*G+c*Se,r[1]=h*T+d*L+u*X+p*te,r[5]=h*P+d*R+u*O+p*ne,r[9]=h*y+d*F+u*V+p*fe,r[13]=h*A+d*W+u*G+p*Se,r[2]=x*T+_*L+g*X+f*te,r[6]=x*P+_*R+g*O+f*ne,r[10]=x*y+_*F+g*V+f*fe,r[14]=x*A+_*W+g*G+f*Se,r[3]=M*T+w*L+b*X+C*te,r[7]=M*P+w*R+b*O+C*ne,r[11]=M*y+w*F+b*V+C*fe,r[15]=M*A+w*W+b*G+C*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],x=e[3],_=e[7],g=e[11],f=e[15],M=l*p-c*u,w=o*p-c*d,b=o*u-l*d,C=a*p-c*h,T=a*u-l*h,P=a*d-o*h;return t*(_*M-g*w+f*b)-n*(x*M-g*C+f*T)+s*(x*w-_*C+f*P)-r*(x*b-_*T+g*P)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],x=e[12],_=e[13],g=e[14],f=e[15],M=t*o-n*a,w=t*l-s*a,b=t*c-r*a,C=n*l-s*o,T=n*c-r*o,P=s*c-r*l,y=h*_-d*x,A=h*g-u*x,L=h*f-p*x,R=d*g-u*_,F=d*f-p*_,W=u*f-p*g,X=M*W-w*F+b*R+C*L-T*A+P*y;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/X;return e[0]=(o*W-l*F+c*R)*O,e[1]=(s*F-n*W-r*R)*O,e[2]=(_*P-g*T+f*C)*O,e[3]=(u*T-d*P-p*C)*O,e[4]=(l*L-a*W-c*A)*O,e[5]=(t*W-s*L+r*A)*O,e[6]=(g*b-x*P-f*w)*O,e[7]=(h*P-u*b+p*w)*O,e[8]=(a*F-o*L+c*y)*O,e[9]=(n*L-t*F-r*y)*O,e[10]=(x*T-_*b+f*M)*O,e[11]=(d*b-h*T-p*M)*O,e[12]=(o*A-a*R-l*y)*O,e[13]=(t*R-n*A+s*y)*O,e[14]=(_*w-x*C-g*M)*O,e[15]=(h*C-d*w+u*M)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,p=r*h,x=r*d,_=a*h,g=a*d,f=o*d,M=l*c,w=l*h,b=l*d,C=n.x,T=n.y,P=n.z;return s[0]=(1-(_+f))*C,s[1]=(p+b)*C,s[2]=(x-w)*C,s[3]=0,s[4]=(p-b)*T,s[5]=(1-(u+f))*T,s[6]=(g+M)*T,s[7]=0,s[8]=(x+w)*P,s[9]=(g-M)*P,s[10]=(1-(u+_))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Cs.set(s[0],s[1],s[2]).length(),o=Cs.set(s[4],s[5],s[6]).length(),l=Cs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ln.copy(this);let c=1/a,h=1/o,d=1/l;return Ln.elements[0]*=c,Ln.elements[1]*=c,Ln.elements[2]*=c,Ln.elements[4]*=h,Ln.elements[5]*=h,Ln.elements[6]*=h,Ln.elements[8]*=d,Ln.elements[9]*=d,Ln.elements[10]*=d,t.setFromRotationMatrix(Ln),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Fn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s),x,_;if(l)x=r/(a-r),_=a*r/(a-r);else if(o===Fn)x=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===qs)x=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Fn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),p=-(n+s)/(n-s),x,_;if(l)x=1/(a-r),_=a/(a-r);else if(o===Fn)x=-2/(a-r),_=-(a+r)/(a-r);else if(o===qs)x=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};$o.prototype.isMatrix4=!0;var ot=$o,Cs=new I,Ln=new ot,_p=new I(0,0,0),yp=new I(1,1,1),Ii=new I,La=new I,_n=new I,Mu=new ot,Su=new Tn,On=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Su.setFromEuler(this),this.setFromQuaternion(Su,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};On.DEFAULT_ORDER="XYZ";var Js=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Mp=0,bu=new I,Rs=new Tn,pi=new ot,Da=new I,yr=new I,Sp=new I,bp=new Tn,wu=new I(1,0,0),Eu=new I(0,1,0),Tu=new I(0,0,1),Au={type:"added"},wp={type:"removed"},Ps={type:"childadded",child:null},vc={type:"childremoved",child:null},Ot=class i extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=_i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new On,n=new Tn,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Fe}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Js,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(wu,e)}rotateY(e){return this.rotateOnAxis(Eu,e)}rotateZ(e){return this.rotateOnAxis(Tu,e)}translateOnAxis(e,t){return bu.copy(e).applyQuaternion(this.quaternion),this.position.add(bu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(wu,e)}translateY(e){return this.translateOnAxis(Eu,e)}translateZ(e){return this.translateOnAxis(Tu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Da.copy(e):Da.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(yr,Da,this.up):pi.lookAt(Da,yr,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),Rs.setFromRotationMatrix(pi),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ie("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Au),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null):Ie("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wp),vc.child=e,this.dispatchEvent(vc),vc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Au),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,e,Sp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,bp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Ot.DEFAULT_UP=new I(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=class extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ep={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),f=this._getHandJoint(c,_);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,x=.005;c.inputState.pinching&&u>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ep)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new hn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},Na={h:0,s:0,l:0};function _c(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ee=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=lh(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=_c(a,r,e+1/3),this.g=_c(a,r,e),this.b=_c(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Zt){function n(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){let n=Id[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return qe.workingToColorSpace(Yt.copy(this),e),Math.round(Ke(Yt.r*255,0,255))*65536+Math.round(Ke(Yt.g*255,0,255))*256+Math.round(Ke(Yt.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=Zt){qe.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,s=Yt.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+t,Li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Li),e.getHSL(Na);let n=Pr(Li.h,Na.h,t),s=Pr(Li.s,Na.s,t),r=Pr(Li.l,Na.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new Ee;Ee.NAMES=Id;var Or=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ee(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Br=class extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Dn=new I,mi=new I,yc=new I,gi=new I,Is=new I,Ls=new I,Cu=new I,Mc=new I,Sc=new I,bc=new I,wc=new St,Ec=new St,Tc=new St,Kn=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Dn.subVectors(e,t),s.cross(Dn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Dn.subVectors(s,t),mi.subVectors(n,t),yc.subVectors(e,t);let a=Dn.dot(Dn),o=Dn.dot(mi),l=Dn.dot(yc),c=mi.dot(mi),h=mi.dot(yc),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,x=(a*h-o*l)*u;return r.set(1-p-x,x,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,gi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gi.x),l.addScaledVector(a,gi.y),l.addScaledVector(o,gi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return wc.setScalar(0),Ec.setScalar(0),Tc.setScalar(0),wc.fromBufferAttribute(e,t),Ec.fromBufferAttribute(e,n),Tc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(wc,r.x),a.addScaledVector(Ec,r.y),a.addScaledVector(Tc,r.z),a}static isFrontFacing(e,t,n,s){return Dn.subVectors(n,t),mi.subVectors(e,t),Dn.cross(mi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Dn.cross(mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Is.subVectors(s,n),Ls.subVectors(r,n),Mc.subVectors(e,n);let l=Is.dot(Mc),c=Ls.dot(Mc);if(l<=0&&c<=0)return t.copy(n);Sc.subVectors(e,s);let h=Is.dot(Sc),d=Ls.dot(Sc);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Is,a);bc.subVectors(e,r);let p=Is.dot(bc),x=Ls.dot(bc);if(x>=0&&p<=x)return t.copy(r);let _=p*c-l*x;if(_<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(n).addScaledVector(Ls,o);let g=h*x-p*d;if(g<=0&&d-h>=0&&p-x>=0)return Cu.subVectors(r,s),o=(d-h)/(d-h+(p-x)),t.copy(s).addScaledVector(Cu,o);let f=1/(g+_+u);return a=_*f,o=u*f,t.copy(n).addScaledVector(Is,a).addScaledVector(Ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ei=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Nn):Nn.fromBufferAttribute(r,a),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ua.copy(n.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mr),Fa.subVectors(this.max,Mr),Ds.subVectors(e.a,Mr),Ns.subVectors(e.b,Mr),Us.subVectors(e.c,Mr),Di.subVectors(Ns,Ds),Ni.subVectors(Us,Ns),es.subVectors(Ds,Us);let t=[0,-Di.z,Di.y,0,-Ni.z,Ni.y,0,-es.z,es.y,Di.z,0,-Di.x,Ni.z,0,-Ni.x,es.z,0,-es.x,-Di.y,Di.x,0,-Ni.y,Ni.x,0,-es.y,es.x,0];return!Ac(t,Ds,Ns,Us,Fa)||(t=[1,0,0,0,1,0,0,0,1],!Ac(t,Ds,Ns,Us,Fa))?!1:(Oa.crossVectors(Di,Ni),t=[Oa.x,Oa.y,Oa.z],Ac(t,Ds,Ns,Us,Fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},xi=[new I,new I,new I,new I,new I,new I,new I,new I],Nn=new I,Ua=new ei,Ds=new I,Ns=new I,Us=new I,Di=new I,Ni=new I,es=new I,Mr=new I,Fa=new I,Oa=new I,ts=new I;function Ac(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ts.fromArray(i,r);let o=s.x*Math.abs(ts.x)+s.y*Math.abs(ts.y)+s.z*Math.abs(ts.z),l=e.dot(ts),c=t.dot(ts),h=n.dot(ts);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Dt=new I,Ba=new ue,Tp=0,Le=class extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bo,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Un(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Un(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Un(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var zr=class extends Le{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Hr=class extends Le{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var We=class extends Le{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ap=new ei,Sr=new I,Cc=new I,ti=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ap.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);let t=Sr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Sr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Cc)),this.expandByPoint(Sr.copy(e.center).sub(Cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Cp=0,En=new ot,Rc=new Ot,Fs=new I,yn=new ei,br=new ei,Vt=new I,je=class i extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=_i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jf(e)?Hr:zr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Fe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return Rc.lookAt(e),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new We(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ie('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];br.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(yn.min,br.min),yn.expandByPoint(Vt),Vt.addVectors(yn.max,br.max),yn.expandByPoint(Vt)):(yn.expandByPoint(br.min),yn.expandByPoint(br.max))}yn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Vt.fromBufferAttribute(o,c),l&&(Fs.fromBufferAttribute(e,c),Vt.add(Fs)),s=Math.max(s,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ie('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ie("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Le(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new I,l[y]=new I;let c=new I,h=new I,d=new I,u=new ue,p=new ue,x=new ue,_=new I,g=new I;function f(y,A,L){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,L),u.fromBufferAttribute(r,y),p.fromBufferAttribute(r,A),x.fromBufferAttribute(r,L),h.sub(c),d.sub(c),p.sub(u),x.sub(u);let R=1/(p.x*x.y-x.x*p.y);isFinite(R)&&(_.copy(h).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(R),g.copy(d).multiplyScalar(p.x).addScaledVector(h,-x.x).multiplyScalar(R),o[y].add(_),o[A].add(_),o[L].add(_),l[y].add(g),l[A].add(g),l[L].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,A=M.length;y<A;++y){let L=M[y],R=L.start,F=L.count;for(let W=R,X=R+F;W<X;W+=3)f(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let w=new I,b=new I,C=new I,T=new I;function P(y){C.fromBufferAttribute(s,y),T.copy(C);let A=o[y];w.copy(A),w.sub(C.multiplyScalar(C.dot(A))).normalize(),b.crossVectors(T,A);let R=b.dot(l[y])<0?-1:1;a.setXYZW(y,w.x,w.y,w.z,R)}for(let y=0,A=M.length;y<A;++y){let L=M[y],R=L.start,F=L.count;for(let W=R,X=R+F;W<X;W+=3)P(e.getX(W+0)),P(e.getX(W+1)),P(e.getX(W+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Le(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,d=new I;if(e)for(let u=0,p=e.count;u<p;u+=3){let x=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,x=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let f=0;f<h;f++)u[x++]=c[p++]}return new Le(u,h,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=e(u,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Co=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=bo,this.updateRanges=[],this.version=0,this.uuid=_i()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},sn=new I,Vr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ur("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Le(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ur("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Rp=0,Bn=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=_i(),this.name="",this.type="Material",this.blending=rs,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ho,this.blendDst=uo,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rs&&(n.blending=this.blending),this.side!==Mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ho&&(n.blendSrc=this.blendSrc),this.blendDst!==uo&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==as&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},os=class extends Bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Os,wr=new I,Bs=new I,zs=new I,Hs=new ue,Er=new ue,Ld=new ot,za=new I,Tr=new I,Ha=new I,Ru=new ue,Pc=new ue,Pu=new ue,js=class extends Ot{constructor(e=new os){if(super(),this.isSprite=!0,this.type="Sprite",Os===void 0){Os=new je;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Co(t,5);Os.setIndex([0,1,2,0,2,3]),Os.setAttribute("position",new Vr(n,3,0,!1)),Os.setAttribute("uv",new Vr(n,2,3,!1))}this.geometry=Os,this.material=e,this.center=new ue(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ie('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Bs.setFromMatrixScale(this.matrixWorld),Ld.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),zs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Bs.multiplyScalar(-zs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Va(za.set(-.5,-.5,0),zs,a,Bs,s,r),Va(Tr.set(.5,-.5,0),zs,a,Bs,s,r),Va(Ha.set(.5,.5,0),zs,a,Bs,s,r),Ru.set(0,0),Pc.set(1,0),Pu.set(1,1);let o=e.ray.intersectTriangle(za,Tr,Ha,!1,wr);if(o===null&&(Va(Tr.set(-.5,.5,0),zs,a,Bs,s,r),Pc.set(0,1),o=e.ray.intersectTriangle(za,Ha,Tr,!1,wr),o===null))return;let l=e.ray.origin.distanceTo(wr);l<e.near||l>e.far||t.push({distance:l,point:wr.clone(),uv:Kn.getInterpolation(wr,za,Tr,Ha,Ru,Pc,Pu,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Va(i,e,t,n,s,r){Hs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Er.x=r*Hs.x-s*Hs.y,Er.y=s*Hs.x+r*Hs.y):Er.copy(Hs),i.copy(e),i.x+=Er.x,i.y+=Er.y,i.applyMatrix4(Ld)}var vi=new I,Ic=new I,ka=new I,Ui=new I,Lc=new I,Ga=new I,Dc=new I,ls=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vi.copy(this.origin).addScaledVector(this.direction,t),vi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ic.copy(e).add(t).multiplyScalar(.5),ka.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(Ic);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ka),o=Ui.dot(this.direction),l=-Ui.dot(ka),c=Ui.lengthSq(),h=Math.abs(1-a*a),d,u,p,x;if(h>0)if(d=a*l-o,u=a*o-l,x=r*h,d>=0)if(u>=-x)if(u<=x){let _=1/h;d*=_,u*=_,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-x?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=x?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ic).addScaledVector(ka,u),p}intersectSphere(e,t){vi.subVectors(e.center,this.origin);let n=vi.dot(this.direction),s=vi.dot(vi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vi)!==null}intersectTriangle(e,t,n,s,r){Lc.subVectors(t,e),Ga.subVectors(n,e),Dc.crossVectors(Lc,Ga);let a=this.direction.dot(Dc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ui.subVectors(this.origin,e);let l=o*this.direction.dot(Ga.crossVectors(Ui,Ga));if(l<0)return null;let c=o*this.direction.dot(Lc.cross(Ui));if(c<0||l+c>a)return null;let h=-o*Ui.dot(Dc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},an=class extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Iu=new ot,ns=new ls,Wa=new ti,Lu=new I,Xa=new I,qa=new I,Ya=new I,Nc=new I,Za=new I,Du=new I,$a=new I,tt=class extends Ot{constructor(e=new je,t=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Za.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Nc.fromBufferAttribute(d,e),a?Za.addScaledVector(Nc,h):Za.addScaledVector(Nc.sub(t),h))}t.add(Za)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(r),ns.copy(e.ray).recast(e.near),!(Wa.containsPoint(ns.origin)===!1&&(ns.intersectSphere(Wa,Lu)===null||ns.origin.distanceToSquared(Lu)>(e.far-e.near)**2))&&(Iu.copy(r).invert(),ns.copy(e.ray).applyMatrix4(Iu),!(n.boundingBox!==null&&ns.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ns)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,_=u.length;x<_;x++){let g=u[x],f=a[g.materialIndex],M=Math.max(g.start,p.start),w=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,C=w;b<C;b+=3){let T=o.getX(b),P=o.getX(b+1),y=o.getX(b+2);s=Ja(this,f,e,n,c,h,d,T,P,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let g=x,f=_;g<f;g+=3){let M=o.getX(g),w=o.getX(g+1),b=o.getX(g+2);s=Ja(this,a,e,n,c,h,d,M,w,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,_=u.length;x<_;x++){let g=u[x],f=a[g.materialIndex],M=Math.max(g.start,p.start),w=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,C=w;b<C;b+=3){let T=b,P=b+1,y=b+2;s=Ja(this,f,e,n,c,h,d,T,P,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let g=x,f=_;g<f;g+=3){let M=g,w=g+1,b=g+2;s=Ja(this,a,e,n,c,h,d,M,w,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Pp(i,e,t,n,s,r,a,o){let l;if(e.side===Wt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Mi,o),l===null)return null;$a.copy(o),$a.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo($a);return c<t.near||c>t.far?null:{distance:c,point:$a.clone(),object:i}}function Ja(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Xa),i.getVertexPosition(l,qa),i.getVertexPosition(c,Ya);let h=Pp(i,e,t,n,Xa,qa,Ya,Du);if(h){let d=new I;Kn.getBarycoord(Du,Xa,qa,Ya,d),s&&(h.uv=Kn.getInterpolatedAttribute(s,o,l,c,d,new ue)),r&&(h.uv1=Kn.getInterpolatedAttribute(r,o,l,c,d,new ue)),a&&(h.normal=Kn.getInterpolatedAttribute(a,o,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new I,materialIndex:0};Kn.getNormal(Xa,qa,Ya,u.normal),h.face=u,h.barycoord=d}return h}var cs=class extends rn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Lt,h=Lt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var kr=class extends Le{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Vs=new ot,Nu=new ot,Ka=[],Uu=new ei,Ip=new ot,Ar=new tt,Cr=new ti,Gr=class extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new kr(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ip)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ei),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vs),Uu.copy(e.boundingBox).applyMatrix4(Vs),this.boundingBox.union(Uu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ti),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vs),Cr.copy(e.boundingSphere).applyMatrix4(Vs),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Ar.geometry=this.geometry,Ar.material=this.material,Ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(n),e.ray.intersectsSphere(Cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Vs),Nu.multiplyMatrices(n,Vs),Ar.matrixWorld=Nu,Ar.raycast(e,Ka);for(let a=0,o=Ka.length;a<o;a++){let l=Ka[a];l.instanceId=r,l.object=this,t.push(l)}Ka.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new kr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new cs(new Float32Array(s*this.count),s,this.count,lr,An));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Uc=new I,Lp=new I,Dp=new Fe,Jn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Uc.subVectors(n,t).cross(Lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Uc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Dp.getNormalMatrix(e),s=this.coplanarPoint(Uc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},is=new ti,Np=new ue(.5,.5),ja=new I,Qs=class{constructor(e=new Jn,t=new Jn,n=new Jn,s=new Jn,r=new Jn,a=new Jn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],x=r[8],_=r[9],g=r[10],f=r[11],M=r[12],w=r[13],b=r[14],C=r[15];if(s[0].setComponents(c-a,p-h,f-x,C-M).normalize(),s[1].setComponents(c+a,p+h,f+x,C+M).normalize(),s[2].setComponents(c+o,p+d,f+_,C+w).normalize(),s[3].setComponents(c-o,p-d,f-_,C-w).normalize(),n)s[4].setComponents(l,u,g,b).normalize(),s[5].setComponents(c-l,p-u,f-g,C-b).normalize();else if(s[4].setComponents(c-l,p-u,f-g,C-b).normalize(),t===Fn)s[5].setComponents(c+l,p+u,f+g,C+b).normalize();else if(t===qs)s[5].setComponents(l,u,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(e){is.center.set(0,0,0);let t=Np.distanceTo(e.center);return is.radius=.7071067811865476+t,is.applyMatrix4(e.matrixWorld),this.intersectsSphere(is)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ja.x=s.normal.x>0?e.max.x:e.min.x,ja.y=s.normal.y>0?e.max.y:e.min.y,ja.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ja)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ni=class extends Bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ro=new I,Po=new I,Fu=new ot,Rr=new ls,Qa=new ti,Fc=new I,Ou=new I,Io=class extends Ot{constructor(e=new je,t=new ni){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ro.fromBufferAttribute(t,s-1),Po.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ro.distanceTo(Po);e.setAttribute("lineDistance",new We(n,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qa.copy(n.boundingSphere),Qa.applyMatrix4(s),Qa.radius+=r,e.ray.intersectsSphere(Qa)===!1)return;Fu.copy(s).invert(),Rr.copy(e.ray).applyMatrix4(Fu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let _=p,g=x-1;_<g;_+=c){let f=h.getX(_),M=h.getX(_+1),w=eo(this,e,Rr,l,f,M,_);w&&t.push(w)}if(this.isLineLoop){let _=h.getX(x-1),g=h.getX(p),f=eo(this,e,Rr,l,_,g,x-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let _=p,g=x-1;_<g;_+=c){let f=eo(this,e,Rr,l,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){let _=eo(this,e,Rr,l,x-1,p,x-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function eo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Ro.fromBufferAttribute(o,s),Po.fromBufferAttribute(o,r),t.distanceSqToSegment(Ro,Po,Fc,Ou)>n)return;Fc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Fc);if(!(c<e.near||c>e.far))return{distance:c,point:Ou.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Bu=new I,zu=new I,zn=class extends Io{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Bu.fromBufferAttribute(t,s),zu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bu.distanceTo(zu);e.setAttribute("lineDistance",new We(n,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Lo=class extends Bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Hu=new ot,Wc=new ls,to=new ti,no=new I,ii=class extends Ot{constructor(e=new je,t=new Lo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(s),to.radius+=r,e.ray.intersectsSphere(to)===!1)return;Hu.copy(s).invert(),Wc.copy(e.ray).applyMatrix4(Hu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let x=u,_=p;x<_;x++){let g=c.getX(x);no.fromBufferAttribute(d,g),Vu(no,g,l,s,e,t,this)}}else{let u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=u,_=p;x<_;x++)no.fromBufferAttribute(d,x),Vu(no,x,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Vu(i,e,t,n,s,r,a){let o=Wc.distanceSqToPoint(i);if(o<t){let l=new I;Wc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Wr=class extends rn{constructor(e=[],t=Vi,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Xr=class extends rn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Si=class extends rn{constructor(e,t,n=Vn,s,r,a,o=Lt,l=Lt,c,h=jn,d=1){if(h!==jn&&h!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $s(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Do=class extends Si{constructor(e,t=Vn,n=Vi,s,r,a=Lt,o=Lt,l,c=jn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},qr=class extends rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},si=class i extends je{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,p=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(d,2));function x(_,g,f,M,w,b,C,T,P,y,A){let L=b/P,R=C/y,F=b/2,W=C/2,X=T/2,O=P+1,V=y+1,G=0,te=0,ne=new I;for(let fe=0;fe<V;fe++){let Se=fe*R-W;for(let Ae=0;Ae<O;Ae++){let Qe=Ae*L-F;ne[_]=Qe*M,ne[g]=Se*w,ne[f]=X,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[g]=0,ne[f]=T>0?1:-1,h.push(ne.x,ne.y,ne.z),d.push(Ae/P),d.push(1-fe/y),G+=1}}for(let fe=0;fe<y;fe++)for(let Se=0;Se<P;Se++){let Ae=u+Se+O*fe,Qe=u+Se+O*(fe+1),ct=u+(Se+1)+O*(fe+1),He=u+(Se+1)+O*fe;l.push(Ae,Qe,He),l.push(Qe,ct,He),te+=6}o.addGroup(p,te,A),p+=te,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Yr=class i extends je{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new I,h=new ue;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let p=n+d/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new We(a,3)),this.setAttribute("normal",new We(o,3)),this.setAttribute("uv",new We(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},hs=class i extends je{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],x=0,_=[],g=n/2,f=0;M(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new We(d,3)),this.setAttribute("normal",new We(u,3)),this.setAttribute("uv",new We(p,2));function M(){let b=new I,C=new I,T=0,P=(t-e)/n;for(let y=0;y<=r;y++){let A=[],L=y/r,R=L*(t-e)+e;for(let F=0;F<=s;F++){let W=F/s,X=W*l+o,O=Math.sin(X),V=Math.cos(X);C.x=R*O,C.y=-L*n+g,C.z=R*V,d.push(C.x,C.y,C.z),b.set(O,P,V).normalize(),u.push(b.x,b.y,b.z),p.push(W,1-L),A.push(x++)}_.push(A)}for(let y=0;y<s;y++)for(let A=0;A<r;A++){let L=_[A][y],R=_[A+1][y],F=_[A+1][y+1],W=_[A][y+1];(e>0||A!==0)&&(h.push(L,R,W),T+=3),(t>0||A!==r-1)&&(h.push(R,F,W),T+=3)}c.addGroup(f,T,0),f+=T}function w(b){let C=x,T=new ue,P=new I,y=0,A=b===!0?e:t,L=b===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*L,0),u.push(0,L,0),p.push(.5,.5),x++;let R=x;for(let F=0;F<=s;F++){let X=F/s*l+o,O=Math.cos(X),V=Math.sin(X);P.x=A*V,P.y=g*L,P.z=A*O,d.push(P.x,P.y,P.z),u.push(0,L,0),T.x=O*.5+.5,T.y=V*.5*L+.5,p.push(T.x,T.y),x++}for(let F=0;F<s;F++){let W=C+F,X=R+F;b===!0?h.push(X,X+1,W):h.push(X+1,X,W),y+=3}c.addGroup(f,y,b===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var No=class i extends je{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new We(r,3)),this.setAttribute("normal",new We(r.slice(),3)),this.setAttribute("uv",new We(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let w=new I,b=new I,C=new I;for(let T=0;T<t.length;T+=3)p(t[T+0],w),p(t[T+1],b),p(t[T+2],C),l(w,b,C,M)}function l(M,w,b,C){let T=C+1,P=[];for(let y=0;y<=T;y++){P[y]=[];let A=M.clone().lerp(b,y/T),L=w.clone().lerp(b,y/T),R=T-y;for(let F=0;F<=R;F++)F===0&&y===T?P[y][F]=A:P[y][F]=A.clone().lerp(L,F/R)}for(let y=0;y<T;y++)for(let A=0;A<2*(T-y)-1;A++){let L=Math.floor(A/2);A%2===0?(u(P[y][L+1]),u(P[y+1][L]),u(P[y][L])):(u(P[y][L+1]),u(P[y+1][L+1]),u(P[y+1][L]))}}function c(M){let w=new I;for(let b=0;b<r.length;b+=3)w.x=r[b+0],w.y=r[b+1],w.z=r[b+2],w.normalize().multiplyScalar(M),r[b+0]=w.x,r[b+1]=w.y,r[b+2]=w.z}function h(){let M=new I;for(let w=0;w<r.length;w+=3){M.x=r[w+0],M.y=r[w+1],M.z=r[w+2];let b=g(M)/2/Math.PI+.5,C=f(M)/Math.PI+.5;a.push(b,1-C)}x(),d()}function d(){for(let M=0;M<a.length;M+=6){let w=a[M+0],b=a[M+2],C=a[M+4],T=Math.max(w,b,C),P=Math.min(w,b,C);T>.9&&P<.1&&(w<.2&&(a[M+0]+=1),b<.2&&(a[M+2]+=1),C<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function p(M,w){let b=M*3;w.x=e[b+0],w.y=e[b+1],w.z=e[b+2]}function x(){let M=new I,w=new I,b=new I,C=new I,T=new ue,P=new ue,y=new ue;for(let A=0,L=0;A<r.length;A+=9,L+=6){M.set(r[A+0],r[A+1],r[A+2]),w.set(r[A+3],r[A+4],r[A+5]),b.set(r[A+6],r[A+7],r[A+8]),T.set(a[L+0],a[L+1]),P.set(a[L+2],a[L+3]),y.set(a[L+4],a[L+5]),C.copy(M).add(w).add(b).divideScalar(3);let R=g(C);_(T,L+0,M,R),_(P,L+2,w,R),_(y,L+4,b,R)}}function _(M,w,b,C){C<0&&M.x===1&&(a[w]=M.x-1),b.x===0&&b.z===0&&(a[w]=C/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var io=new I,so=new I,Oc=new I,ro=new Kn,Zr=class extends je{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Ws*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},p=[];for(let x=0;x<l;x+=3){a?(c[0]=a.getX(x),c[1]=a.getX(x+1),c[2]=a.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);let{a:_,b:g,c:f}=ro;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),ro.getNormal(Oc),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){let w=(M+1)%3,b=d[M],C=d[w],T=ro[h[M]],P=ro[h[w]],y=`${b}_${C}`,A=`${C}_${b}`;A in u&&u[A]?(Oc.dot(u[A].normal)<=r&&(p.push(T.x,T.y,T.z),p.push(P.x,P.y,P.z)),u[A]=null):y in u||(u[y]={index0:c[M],index1:c[w],normal:Oc.clone()})}}for(let x in u)if(u[x]){let{index0:_,index1:g}=u[x];io.fromBufferAttribute(o,_),so.fromBufferAttribute(o,g),p.push(io.x,io.y,io.z),p.push(so.x,so.y,so.z)}this.setAttribute("position",new We(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var er=class i extends No{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var $r=class i extends je{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,p=[],x=[],_=[],g=[];for(let f=0;f<h;f++){let M=f*u-a;for(let w=0;w<c;w++){let b=w*d-r;x.push(b,-M,0),_.push(0,0,1),g.push(w/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let w=M+c*f,b=M+c*(f+1),C=M+1+c*(f+1),T=M+1+c*f;p.push(w,b,T),p.push(b,C,T)}this.setIndex(p),this.setAttribute("position",new We(x,3)),this.setAttribute("normal",new We(_,3)),this.setAttribute("uv",new We(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var us=class i extends je{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new I,u=new I,p=[],x=[],_=[],g=[];for(let f=0;f<=n;f++){let M=[],w=f/n,b=0;f===0&&a===0?b=.5/t:f===n&&l===Math.PI&&(b=-.5/t);for(let C=0;C<=t;C++){let T=C/t;d.x=-e*Math.cos(s+T*r)*Math.sin(a+w*o),d.y=e*Math.cos(a+w*o),d.z=e*Math.sin(s+T*r)*Math.sin(a+w*o),x.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(T+b,1-w),M.push(c++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){let w=h[f][M+1],b=h[f][M],C=h[f+1][M],T=h[f+1][M+1];(f!==0||a>0)&&p.push(w,b,T),(f!==n-1||l<Math.PI)&&p.push(b,C,T)}this.setIndex(p),this.setAttribute("position",new We(x,3)),this.setAttribute("normal",new We(_,3)),this.setAttribute("uv",new We(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ri=class i extends je{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new I,p=new I,x=new I;for(let _=0;_<=n;_++){let g=a+_/n*o;for(let f=0;f<=s;f++){let M=f/s*r;p.x=(e+t*Math.cos(g))*Math.cos(M),p.y=(e+t*Math.cos(g))*Math.sin(M),p.z=t*Math.sin(g),c.push(p.x,p.y,p.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),x.subVectors(p,u).normalize(),h.push(x.x,x.y,x.z),d.push(f/s),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=s;g++){let f=(s+1)*_+g-1,M=(s+1)*(_-1)+g-1,w=(s+1)*(_-1)+g,b=(s+1)*_+g;l.push(f,M,b),l.push(M,w,b)}this.setIndex(l),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function gs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(ku(s))s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ku(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Jt(i){let e={};for(let t=0;t<i.length;t++){let n=gs(i[t]);for(let s in n)e[s]=n[s]}return e}function ku(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Up(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ch(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var Rn={clone:gs,merge:Jt},Fp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xe=class extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fp,this.fragmentShader=Op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gs(e.uniforms),this.uniformsGroups=Up(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},tr=class extends Xe{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},nr=class extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fl,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Uo=class extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_d,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Fo=class extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ao(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Bi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Oo=class extends Bi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hc,endingEnd:Hc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Vc:r=e,o=2*t-n;break;case kc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Vc:a=e,l=2*n-t;break;case kc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,x=(n-t)/(s-t),_=x*x,g=_*x,f=-u*g+2*u*_-u*x,M=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*x+1,w=(-1-p)*g+(1.5+p)*_+.5*x,b=p*g-p*_;for(let C=0;C!==o;++C)r[C]=f*a[h+C]+M*a[c+C]+w*a[l+C]+b*a[d+C];return r}},Bo=class extends Bi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},zo=class extends Bi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Ho=class extends Bi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){let _=(n-t)/(s-t),g=1-_;for(let f=0;f!==o;++f)r[f]=a[c+f]*g+a[l+f]*_;return r}let p=o*2,x=e-1;for(let _=0;_!==o;++_){let g=a[c+_],f=a[l+_],M=x*p+_*2,w=u[M],b=u[M+1],C=e*p+_*2,T=d[C],P=d[C+1],y=(n-t)/(s-t),A,L,R,F,W;for(let X=0;X<8;X++){A=y*y,L=A*y,R=1-y,F=R*R,W=F*R;let V=W*t+3*F*y*w+3*R*A*T+L*s-n;if(Math.abs(V)<1e-10)break;let G=3*F*(w-t)+6*R*y*(T-w)+3*A*(s-T);if(Math.abs(G)<1e-10)break;y=y-V/G,y=Math.max(0,Math.min(1,y))}r[_]=W*g+3*F*y*b+3*R*A*P+L*f}return r}},Sn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ao(t,this.TimeBufferType),this.values=ao(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ao(e.times,Array),values:ao(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ho(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ir:t=this.InterpolantFactoryMethodDiscrete;break;case So:t=this.InterpolantFactoryMethodLinear;break;case co:t=this.InterpolantFactoryMethodSmooth;break;case zc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Re("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ir;case this.InterpolantFactoryMethodLinear:return So;case this.InterpolantFactoryMethodSmooth:return co;case this.InterpolantFactoryMethodBezier:return zc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ie("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ie("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ie("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ie("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Qf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ie("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===co,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,u=d-n,p=d+n;for(let x=0;x!==n;++x){let _=t[d+x];if(_!==t[u+x]||_!==t[p+x]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=So;var zi=class extends Sn{constructor(e,t,n){super(e,t,n)}};zi.prototype.ValueTypeName="bool";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=Ir;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Vo=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}};Vo.prototype.ValueTypeName="color";var ko=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}};ko.prototype.ValueTypeName="number";var Go=class extends Bi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)Tn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Jr=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Go(this.times,this.values,this.getValueSize(),e)}};Jr.prototype.ValueTypeName="quaternion";Jr.prototype.InterpolantFactoryMethodSmooth=void 0;var Hi=class extends Sn{constructor(e,t,n){super(e,t,n)}};Hi.prototype.ValueTypeName="string";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=Ir;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}};Wo.prototype.ValueTypeName="vector";var Xo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],x=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Dd=new Xo,qo=class{constructor(e){this.manager=e!==void 0?e:Dd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};qo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Kr=class extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},jr=class extends Kr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Bc=new ot,Gu=new I,Wu=new I,Xc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=$t,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qs,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Gu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gu),Wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wu),t.updateMatrixWorld(),Bc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===qs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},oo=new I,lo=new Tn,$n=new I,Qr=class extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(oo,lo,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oo,lo,$n.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(oo,lo,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oo,lo,$n.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fi=new I,Xu=new ue,qu=new ue,Gt=class extends Qr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z)}getViewSize(e,t){return this.getViewBounds(e,Xu,qu),t.subVectors(qu,Xu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ws*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var qc=class extends Xc{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0}},ir=class extends Kr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new qc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ds=class extends Qr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var ks=-90,Gs=1,Yo=class extends Ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Gt(ks,Gs,e,t);s.layers=this.layers,this.add(s);let r=new Gt(ks,Gs,e,t);r.layers=this.layers,this.add(r);let a=new Gt(ks,Gs,e,t);a.layers=this.layers,this.add(a);let o=new Gt(ks,Gs,e,t);o.layers=this.layers,this.add(o);let l=new Gt(ks,Gs,e,t);l.layers=this.layers,this.add(l);let c=new Gt(ks,Gs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Zo=class extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},fs=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Bp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Bp(){this._document.hidden===!1&&this.reset()}var hh="\\[\\]\\.:\\/",zp=new RegExp("["+hh+"]","g"),uh="[^"+hh+"]",Hp="[^"+hh.replace("\\.","")+"]",Vp=/((?:WC+[\/:])*)/.source.replace("WC",uh),kp=/(WCOD+)?/.source.replace("WCOD",Hp),Gp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uh),Wp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uh),Xp=new RegExp("^"+Vp+kp+Gp+Wp+"$"),qp=["material","materials","bones","map"],Yc=class{constructor(e,t,n){let s=n||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Mt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(zp,"")}static parseTrackName(e){let t=Xp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);qp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ie("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ie("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ie("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ie("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ie("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ie("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Mt.Composite=Yc;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var sy=new Float32Array(1);var Yu=new ot,sr=class{constructor(e,t,n=0,s=1/0){this.ray=new ls(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Js,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ie("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yu),this}intersectObject(e,t=!0,n=[]){return Zc(e,this,n,t),n.sort(Zu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Zc(e[s],this,n,t);return n.sort(Zu),n}};function Zu(i,e){return i.distance-e.distance}function Zc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Zc(r[a],e,t,!0)}}var xh=class xh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};xh.prototype.isMatrix2=!0;var $c=xh;function dh(i,e,t,n){let s=Yp(n);switch(t){case rh:return i*e;case lr:return i*e/s.components*s.byteLength;case il:return i*e/s.components*s.byteLength;case Wi:return i*e*2/s.components*s.byteLength;case sl:return i*e*2/s.components*s.byteLength;case ah:return i*e*3/s.components*s.byteLength;case Cn:return i*e*4/s.components*s.byteLength;case rl:return i*e*4/s.components*s.byteLength;case ca:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ua:case da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ol:case cl:return Math.max(i,16)*Math.max(e,8)/4;case al:case ll:return Math.max(i,8)*Math.max(e,8)/2;case hl:case ul:case fl:case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dl:case fa:case ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case vl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Pl:case Il:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Dl:case Nl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case pa:case Ul:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yp(i){switch(i){case $t:case th:return{byteLength:1,components:1};case ar:case nh:case Bt:return{byteLength:2,components:1};case tl:case nl:return{byteLength:2,components:4};case Vn:case el:case An:return{byteLength:4,components:1};case ih:case sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jo}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jo);function nf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Zp(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,x)=>p.start-x.start);let u=0;for(let p=1;p<d.length;p++){let x=d[u],_=d[p];_.start<=x.start+x.count+1?x.count=Math.max(x.count,_.start+_.count-x.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,x=d.length;p<x;p++){let _=d[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var $p=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jp=`#ifdef USE_ALPHAHASH
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
#endif`,Kp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,em=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tm=`#ifdef USE_AOMAP
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
#endif`,nm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,im=`#ifdef USE_BATCHING
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
#endif`,sm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,am=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,om=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,lm=`#ifdef USE_IRIDESCENCE
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
#endif`,cm=`#ifdef USE_BUMPMAP
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
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,vm=`#define PI 3.141592653589793
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
} // validated`,_m=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ym=`vec3 transformedNormal = objectNormal;
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
#endif`,Mm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Em="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Am=`#ifdef USE_ENVMAP
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
#endif`,Cm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rm=`#ifdef USE_ENVMAP
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
#endif`,Pm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Im=`#ifdef USE_ENVMAP
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
#endif`,Lm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Um=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fm=`#ifdef USE_GRADIENTMAP
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
}`,Om=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Vm=`#ifdef USE_ENVMAP
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
#endif`,km=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qm=`PhysicalMaterial material;
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
#endif`,Ym=`uniform sampler2D dfgLUT;
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
}`,Zm=`
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
#endif`,$m=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Km=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,n0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,i0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,r0=`#if defined( USE_POINTS_UV )
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
#endif`,a0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,l0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,c0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u0=`#ifdef USE_MORPHTARGETS
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
#endif`,d0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,p0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,m0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,x0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,v0=`#ifdef USE_NORMALMAP
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
#endif`,_0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,y0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,S0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,w0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,E0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,T0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,C0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,R0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,P0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,I0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,D0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,N0=`float getShadowMask() {
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
}`,U0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,F0=`#ifdef USE_SKINNING
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
#endif`,O0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,B0=`#ifdef USE_SKINNING
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
#endif`,z0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,H0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,V0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,k0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,G0=`#ifdef USE_TRANSMISSION
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
#endif`,W0=`#ifdef USE_TRANSMISSION
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
#endif`,X0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,$0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,J0=`uniform sampler2D t2D;
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
}`,K0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`#include <common>
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
}`,ng=`#if DEPTH_PACKING == 3200
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
}`,ig=`#define DISTANCE
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
}`,sg=`#define DISTANCE
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
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
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
}`,lg=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,hg=`uniform vec3 diffuse;
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
}`,ug=`#define LAMBERT
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
}`,dg=`#define LAMBERT
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
}`,fg=`#define MATCAP
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
}`,pg=`#define MATCAP
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
}`,mg=`#define NORMAL
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
}`,gg=`#define NORMAL
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
}`,xg=`#define PHONG
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
}`,vg=`#define PHONG
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
}`,_g=`#define STANDARD
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
}`,yg=`#define STANDARD
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
}`,Mg=`#define TOON
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
}`,Sg=`#define TOON
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
}`,bg=`uniform float size;
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
}`,wg=`uniform vec3 diffuse;
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
}`,Eg=`#include <common>
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
}`,Tg=`uniform vec3 color;
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
}`,Ag=`uniform float rotation;
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
}`,Cg=`uniform vec3 diffuse;
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
}`,ke={alphahash_fragment:$p,alphahash_pars_fragment:Jp,alphamap_fragment:Kp,alphamap_pars_fragment:jp,alphatest_fragment:Qp,alphatest_pars_fragment:em,aomap_fragment:tm,aomap_pars_fragment:nm,batching_pars_vertex:im,batching_vertex:sm,begin_vertex:rm,beginnormal_vertex:am,bsdfs:om,iridescence_fragment:lm,bumpmap_pars_fragment:cm,clipping_planes_fragment:hm,clipping_planes_pars_fragment:um,clipping_planes_pars_vertex:dm,clipping_planes_vertex:fm,color_fragment:pm,color_pars_fragment:mm,color_pars_vertex:gm,color_vertex:xm,common:vm,cube_uv_reflection_fragment:_m,defaultnormal_vertex:ym,displacementmap_pars_vertex:Mm,displacementmap_vertex:Sm,emissivemap_fragment:bm,emissivemap_pars_fragment:wm,colorspace_fragment:Em,colorspace_pars_fragment:Tm,envmap_fragment:Am,envmap_common_pars_fragment:Cm,envmap_pars_fragment:Rm,envmap_pars_vertex:Pm,envmap_physical_pars_fragment:Vm,envmap_vertex:Im,fog_vertex:Lm,fog_pars_vertex:Dm,fog_fragment:Nm,fog_pars_fragment:Um,gradientmap_pars_fragment:Fm,lightmap_pars_fragment:Om,lights_lambert_fragment:Bm,lights_lambert_pars_fragment:zm,lights_pars_begin:Hm,lights_toon_fragment:km,lights_toon_pars_fragment:Gm,lights_phong_fragment:Wm,lights_phong_pars_fragment:Xm,lights_physical_fragment:qm,lights_physical_pars_fragment:Ym,lights_fragment_begin:Zm,lights_fragment_maps:$m,lights_fragment_end:Jm,lightprobes_pars_fragment:Km,logdepthbuf_fragment:jm,logdepthbuf_pars_fragment:Qm,logdepthbuf_pars_vertex:e0,logdepthbuf_vertex:t0,map_fragment:n0,map_pars_fragment:i0,map_particle_fragment:s0,map_particle_pars_fragment:r0,metalnessmap_fragment:a0,metalnessmap_pars_fragment:o0,morphinstance_vertex:l0,morphcolor_vertex:c0,morphnormal_vertex:h0,morphtarget_pars_vertex:u0,morphtarget_vertex:d0,normal_fragment_begin:f0,normal_fragment_maps:p0,normal_pars_fragment:m0,normal_pars_vertex:g0,normal_vertex:x0,normalmap_pars_fragment:v0,clearcoat_normal_fragment_begin:_0,clearcoat_normal_fragment_maps:y0,clearcoat_pars_fragment:M0,iridescence_pars_fragment:S0,opaque_fragment:b0,packing:w0,premultiplied_alpha_fragment:E0,project_vertex:T0,dithering_fragment:A0,dithering_pars_fragment:C0,roughnessmap_fragment:R0,roughnessmap_pars_fragment:P0,shadowmap_pars_fragment:I0,shadowmap_pars_vertex:L0,shadowmap_vertex:D0,shadowmask_pars_fragment:N0,skinbase_vertex:U0,skinning_pars_vertex:F0,skinning_vertex:O0,skinnormal_vertex:B0,specularmap_fragment:z0,specularmap_pars_fragment:H0,tonemapping_fragment:V0,tonemapping_pars_fragment:k0,transmission_fragment:G0,transmission_pars_fragment:W0,uv_pars_fragment:X0,uv_pars_vertex:q0,uv_vertex:Y0,worldpos_vertex:Z0,background_vert:$0,background_frag:J0,backgroundCube_vert:K0,backgroundCube_frag:j0,cube_vert:Q0,cube_frag:eg,depth_vert:tg,depth_frag:ng,distance_vert:ig,distance_frag:sg,equirect_vert:rg,equirect_frag:ag,linedashed_vert:og,linedashed_frag:lg,meshbasic_vert:cg,meshbasic_frag:hg,meshlambert_vert:ug,meshlambert_frag:dg,meshmatcap_vert:fg,meshmatcap_frag:pg,meshnormal_vert:mg,meshnormal_frag:gg,meshphong_vert:xg,meshphong_frag:vg,meshphysical_vert:_g,meshphysical_frag:yg,meshtoon_vert:Mg,meshtoon_frag:Sg,points_vert:bg,points_frag:wg,shadow_vert:Eg,shadow_frag:Tg,sprite_vert:Ag,sprite_frag:Cg},de={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},oi={basic:{uniforms:Jt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Jt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ee(0)},envMapIntensity:{value:1}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Jt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Jt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Jt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ee(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Jt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Jt([de.points,de.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Jt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Jt([de.common,de.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Jt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Jt([de.sprite,de.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distance:{uniforms:Jt([de.common,de.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distance_vert,fragmentShader:ke.distance_frag},shadow:{uniforms:Jt([de.lights,de.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};oi.physical={uniforms:Jt([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var Hl={r:0,b:0,g:0},Rg=new ot,sf=new Fe;sf.set(-1,0,0,0,1,0,0,0,1);function Pg(i,e,t,n,s,r){let a=new Ee(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function p(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){let b=M.backgroundBlurriness>0;w=e.get(w,b)}return w}function x(M){let w=!1,b=p(M);b===null?g(a,o):b&&b.isColor&&(g(b,1),w=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,w){let b=p(w);b&&(b.isCubeTexture||b.mapping===oa)?(c===void 0&&(c=new tt(new si(1,1,1),new Xe({name:"BackgroundCubeMaterial",uniforms:gs(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Rg.makeRotationFromEuler(w.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(sf),c.material.toneMapped=qe.getTransfer(b.colorSpace)!==it,(h!==b||d!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new tt(new $r(2,2),new Xe({name:"BackgroundMaterial",uniforms:gs(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=qe.getTransfer(b.colorSpace)!==it,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,w){M.getRGB(Hl,ch(i)),t.buffers.color.setClear(Hl.r,Hl.g,Hl.b,w,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:x,addToRenderList:_,dispose:f}}function Ig(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(R,F,W,X,O){let V=!1,G=d(R,X,W,F);r!==G&&(r=G,c(r.object)),V=p(R,X,W,O),V&&x(R,X,W,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,b(R,F,W,X),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function d(R,F,W,X){let O=X.wireframe===!0,V=n[F.id];V===void 0&&(V={},n[F.id]=V);let G=R.isInstancedMesh===!0?R.id:0,te=V[G];te===void 0&&(te={},V[G]=te);let ne=te[W.id];ne===void 0&&(ne={},te[W.id]=ne);let fe=ne[O];return fe===void 0&&(fe=u(l()),ne[O]=fe),fe}function u(R){let F=[],W=[],X=[];for(let O=0;O<t;O++)F[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:X,object:R,attributes:{},index:null}}function p(R,F,W,X){let O=r.attributes,V=F.attributes,G=0,te=W.getAttributes();for(let ne in te)if(te[ne].location>=0){let Se=O[ne],Ae=V[ne];if(Ae===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(Ae=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(Ae=R.instanceColor)),Se===void 0||Se.attribute!==Ae||Ae&&Se.data!==Ae.data)return!0;G++}return r.attributesNum!==G||r.index!==X}function x(R,F,W,X){let O={},V=F.attributes,G=0,te=W.getAttributes();for(let ne in te)if(te[ne].location>=0){let Se=V[ne];Se===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(Se=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(Se=R.instanceColor));let Ae={};Ae.attribute=Se,Se&&Se.data&&(Ae.data=Se.data),O[ne]=Ae,G++}r.attributes=O,r.attributesNum=G,r.index=X}function _(){let R=r.newAttributes;for(let F=0,W=R.length;F<W;F++)R[F]=0}function g(R){f(R,0)}function f(R,F){let W=r.newAttributes,X=r.enabledAttributes,O=r.attributeDivisors;W[R]=1,X[R]===0&&(i.enableVertexAttribArray(R),X[R]=1),O[R]!==F&&(i.vertexAttribDivisor(R,F),O[R]=F)}function M(){let R=r.newAttributes,F=r.enabledAttributes;for(let W=0,X=F.length;W<X;W++)F[W]!==R[W]&&(i.disableVertexAttribArray(W),F[W]=0)}function w(R,F,W,X,O,V,G){G===!0?i.vertexAttribIPointer(R,F,W,O,V):i.vertexAttribPointer(R,F,W,X,O,V)}function b(R,F,W,X){_();let O=X.attributes,V=W.getAttributes(),G=F.defaultAttributeValues;for(let te in V){let ne=V[te];if(ne.location>=0){let fe=O[te];if(fe===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor)),fe!==void 0){let Se=fe.normalized,Ae=fe.itemSize,Qe=e.get(fe);if(Qe===void 0)continue;let ct=Qe.buffer,He=Qe.type,J=Qe.bytesPerElement,ge=He===i.INT||He===i.UNSIGNED_INT||fe.gpuType===el;if(fe.isInterleavedBufferAttribute){let ae=fe.data,De=ae.stride,Oe=fe.offset;if(ae.isInstancedInterleavedBuffer){for(let Ne=0;Ne<ne.locationSize;Ne++)f(ne.location+Ne,ae.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ne=0;Ne<ne.locationSize;Ne++)g(ne.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Ne=0;Ne<ne.locationSize;Ne++)w(ne.location+Ne,Ae/ne.locationSize,He,Se,De*J,(Oe+Ae/ne.locationSize*Ne)*J,ge)}else{if(fe.isInstancedBufferAttribute){for(let ae=0;ae<ne.locationSize;ae++)f(ne.location+ae,fe.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ae=0;ae<ne.locationSize;ae++)g(ne.location+ae);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let ae=0;ae<ne.locationSize;ae++)w(ne.location+ae,Ae/ne.locationSize,He,Se,Ae*J,Ae/ne.locationSize*ae*J,ge)}}else if(G!==void 0){let Se=G[te];if(Se!==void 0)switch(Se.length){case 2:i.vertexAttrib2fv(ne.location,Se);break;case 3:i.vertexAttrib3fv(ne.location,Se);break;case 4:i.vertexAttrib4fv(ne.location,Se);break;default:i.vertexAttrib1fv(ne.location,Se)}}}}M()}function C(){A();for(let R in n){let F=n[R];for(let W in F){let X=F[W];for(let O in X){let V=X[O];for(let G in V)h(V[G].object),delete V[G];delete X[O]}}delete n[R]}}function T(R){if(n[R.id]===void 0)return;let F=n[R.id];for(let W in F){let X=F[W];for(let O in X){let V=X[O];for(let G in V)h(V[G].object),delete V[G];delete X[O]}}delete n[R.id]}function P(R){for(let F in n){let W=n[F];for(let X in W){let O=W[X];if(O[R.id]===void 0)continue;let V=O[R.id];for(let G in V)h(V[G].object),delete V[G];delete O[R.id]}}}function y(R){for(let F in n){let W=n[F],X=R.isInstancedMesh===!0?R.id:0,O=W[X];if(O!==void 0){for(let V in O){let G=O[V];for(let te in G)h(G[te].object),delete G[te];delete O[V]}delete W[X],Object.keys(W).length===0&&delete n[F]}}}function A(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:L,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function Lg(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Dg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Cn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===Bt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==$t&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==An&&!y)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Re("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:x,maxTextureSize:_,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:b,maxSamples:C,samples:T}}function Ng(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Jn,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){let x=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,f=i.get(d);if(!s||x===null||x.length===0||r&&!g)r?h(null):c();else{let M=r?0:n,w=M*4,b=f.clippingState||null;l.value=b,b=h(x,u,w,p);for(let C=0;C!==w;++C)b[C]=t[C];f.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,x){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,x!==!0||g===null){let f=p+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<f)&&(g=new Float32Array(f));for(let w=0,b=p;w!==_;++w,b+=4)a.copy(d[w]).applyMatrix4(M,o),a.normal.toArray(g,b),g[b+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Xi=4,Nd=[.125,.215,.35,.446,.526,.582],xs=20,Ug=256,ma=new ds,Ud=new Ee,vh=null,_h=0,yh=0,Mh=!1,Fg=new I,kl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Fg}=r;vh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),yh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Od(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(vh,_h,yh),this._renderer.xr.enabled=Mh,e.scissorTest=!1,hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vi||e.mapping===ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),yh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Bt,format:Cn,colorSpace:Lr,depthBuffer:!1},s=Fd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Og(r)),this._blurMaterial=zg(r,e,t),this._ggxMaterial=Bg(r,e,t)}return s}_compileMaterial(e){let t=new tt(new je,e);this._renderer.compile(t,ma)}_sceneToCubeUV(e,t,n,s,r){let l=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Ud),d.toneMapping=Hn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new tt(new si,new an({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,f=!1,M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,f=!0):(g.color.copy(Ud),f=!0);for(let w=0;w<6;w++){let b=w%3;b===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):b===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let C=this._cubeSize;hr(s,b*C,w>2?C:0,C,C),d.setRenderTarget(s),f&&d.render(_,l),d.render(e,l)}d.toneMapping=p,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Vi||e.mapping===ms;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Od());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;hr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ma)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,p=d*u,{_lodMax:x}=this,_=this._sizeLods[n],g=3*_*(n>x-Xi?n-x+Xi:0),f=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=x-t,hr(r,g,f,3*_,2*_),s.setRenderTarget(r),s.render(o,ma),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-n,hr(e,g,f,3*_,2*_),s.setRenderTarget(e),s.render(o,ma)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ie("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=c;let u=c.uniforms,p=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*xs-1),_=r/x,g=isFinite(r)?1+Math.floor(h*_):xs;g>xs&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${xs}`);let f=[],M=0;for(let P=0;P<xs;++P){let y=P/_,A=Math.exp(-y*y/2);f.push(A),P===0?M+=A:P<g&&(M+=2*A)}for(let P=0;P<f.length;P++)f[P]=f[P]/M;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:w}=this;u.dTheta.value=x,u.mipInt.value=w-n;let b=this._sizeLods[s],C=3*b*(s>w-Xi?s-w+Xi:0),T=4*(this._cubeSize-b);hr(t,C,T,3*b,2*b),l.setRenderTarget(t),l.render(d,ma)}};function Og(i){let e=[],t=[],n=[],s=i,r=i-Xi+1+Nd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Xi?l=Nd[a-i+Xi-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,x=6,_=3,g=2,f=1,M=new Float32Array(_*x*p),w=new Float32Array(g*x*p),b=new Float32Array(f*x*p);for(let T=0;T<p;T++){let P=T%3*2/3-1,y=T>2?0:-1,A=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];M.set(A,_*x*T),w.set(u,g*x*T);let L=[T,T,T,T,T,T];b.set(L,f*x*T)}let C=new je;C.setAttribute("position",new Le(M,_)),C.setAttribute("uv",new Le(w,g)),C.setAttribute("faceIndex",new Le(b,f)),n.push(new tt(C,null)),s>Xi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Fd(i,e,t){let n=new xt(i,e,t);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Bg(i,e,t){return new Xe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ug,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

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
		`,blending:dn,depthTest:!1,depthWrite:!1})}function zg(i,e,t){let n=new Float32Array(xs),s=new I(0,1,0);return new Xe({name:"SphericalGaussianBlur",defines:{n:xs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Xl(),fragmentShader:`

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
		`,blending:dn,depthTest:!1,depthWrite:!1})}function Od(){return new Xe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xl(),fragmentShader:`

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
		`,blending:dn,depthTest:!1,depthWrite:!1})}function Bd(){return new Xe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dn,depthTest:!1,depthWrite:!1})}function Xl(){return`

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
	`}var Gl=class extends xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Wr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new si(5,5,5),r=new Xe({name:"CubemapFromEquirect",uniforms:gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:dn});r.uniforms.tEquirect.value=t;let a=new tt(s,r),o=t.minFilter;return t.minFilter===ki&&(t.minFilter=Nt),new Yo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Hg(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===Ko||p===jo)if(e.has(u)){let x=e.get(u).texture;return o(x,u.mapping)}else{let x=u.image;if(x&&x.height>0){let _=new Gl(x.height);return _.fromEquirectangularTexture(i,u),e.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let p=u.mapping,x=p===Ko||p===jo,_=p===Vi||p===ms;if(x||_){let g=t.get(u),f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new kl(i)),g=x?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let M=u.image;return x&&M&&M.height>0||_&&M&&l(M)?(n===null&&(n=new kl(i)),g=x?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,p){return p===Ko?u.mapping=Vi:p===jo&&(u.mapping=ms),u}function l(u){let p=0,x=6;for(let _=0;_<x;_++)u[_]!==void 0&&p++;return p===x}function c(u){let p=u.target;p.removeEventListener("dispose",c);let x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Vg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&wo("WebGLRenderer: "+n+" extension not supported."),s}}}function kg(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let x in u.attributes)e.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete s[u.id];let p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let p in u)e.update(u[p],i.ARRAY_BUFFER)}function c(d){let u=[],p=d.index,x=d.attributes.position,_=0;if(x===void 0)return;if(p!==null){let M=p.array;_=p.version;for(let w=0,b=M.length;w<b;w+=3){let C=M[w+0],T=M[w+1],P=M[w+2];u.push(C,T,T,P,P,C)}}else{let M=x.array;_=x.version;for(let w=0,b=M.length/3-1;w<b;w+=3){let C=w+0,T=w+1,P=w+2;u.push(C,T,T,P,P,C)}}let g=new(x.count>=65535?Hr:zr)(u,1);g.version=_;let f=r.get(d);f&&e.remove(f),r.set(d,g)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Gg(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,d*a,p),t.update(u,n,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let _=0;for(let g=0;g<p;g++)_+=u[g];t.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Wg(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ie("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Xg(i,e,t){let n=new WeakMap,s=new St;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let A=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],w=0;p===!0&&(w=1),x===!0&&(w=2),_===!0&&(w=3);let b=o.attributes.position.count*w,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let T=new Float32Array(b*C*4*d),P=new Fr(T,b,C,d);P.type=An,P.needsUpdate=!0;let y=w*4;for(let L=0;L<d;L++){let R=g[L],F=f[L],W=M[L],X=b*C*4*L;for(let O=0;O<R.count;O++){let V=O*y;p===!0&&(s.fromBufferAttribute(R,O),T[X+V+0]=s.x,T[X+V+1]=s.y,T[X+V+2]=s.z,T[X+V+3]=0),x===!0&&(s.fromBufferAttribute(F,O),T[X+V+4]=s.x,T[X+V+5]=s.y,T[X+V+6]=s.z,T[X+V+7]=0),_===!0&&(s.fromBufferAttribute(W,O),T[X+V+8]=s.x,T[X+V+9]=s.y,T[X+V+10]=s.z,T[X+V+11]=W.itemSize===4?s.w:1)}}u={count:d,texture:P,size:new ue(b,C)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];let x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function qg(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Yg={[ta]:"LINEAR_TONE_MAPPING",[na]:"REINHARD_TONE_MAPPING",[ia]:"CINEON_TONE_MAPPING",[ps]:"ACES_FILMIC_TONE_MAPPING",[ra]:"AGX_TONE_MAPPING",[aa]:"NEUTRAL_TONE_MAPPING",[sa]:"CUSTOM_TONE_MAPPING"};function Zg(i,e,t,n,s){let r=new xt(e,t,{type:i,depthBuffer:n,stencilBuffer:s,depthTexture:n?new Si(e,t):void 0}),a=new xt(e,t,{type:Bt,depthBuffer:!1,stencilBuffer:!1}),o=new je;o.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new We([0,2,0,0,2,0],2));let l=new tr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new tt(o,l),h=new ds(-1,1,1,-1,0,1),d=null,u=null,p=!1,x,_=null,g=[],f=!1;this.setSize=function(M,w){r.setSize(M,w),a.setSize(M,w);for(let b=0;b<g.length;b++){let C=g[b];C.setSize&&C.setSize(M,w)}},this.setEffects=function(M){g=M,f=g.length>0&&g[0].isRenderPass===!0;let w=r.width,b=r.height;for(let C=0;C<g.length;C++){let T=g[C];T.setSize&&T.setSize(w,b)}},this.begin=function(M,w){if(p||M.toneMapping===Hn&&g.length===0)return!1;if(_=w,w!==null){let b=w.width,C=w.height;(r.width!==b||r.height!==C)&&this.setSize(b,C)}return f===!1&&M.setRenderTarget(r),x=M.toneMapping,M.toneMapping=Hn,!0},this.hasRenderPass=function(){return f},this.end=function(M,w){M.toneMapping=x,p=!0;let b=r,C=a;for(let T=0;T<g.length;T++){let P=g[T];if(P.enabled!==!1&&(P.render(M,C,b,w),P.needsSwap!==!1)){let y=b;b=C,C=y}}if(d!==M.outputColorSpace||u!==M.toneMapping){d=M.outputColorSpace,u=M.toneMapping,l.defines={},qe.getTransfer(d)===it&&(l.defines.SRGB_TRANSFER="");let T=Yg[u];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(_),M.render(c,h),_=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),l.dispose()}}var rf=new rn,wh=new Si(1,1),af=new Fr,of=new Ao,lf=new Wr,zd=[],Hd=[],Vd=new Float32Array(16),kd=new Float32Array(9),Gd=new Float32Array(4);function dr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=zd[s];if(r===void 0&&(r=new Float32Array(s),zd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ql(i,e){let t=Hd[e];t===void 0&&(t=new Int32Array(e),Hd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function $g(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Jg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function Kg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function jg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function Qg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Gd.set(n),i.uniformMatrix2fv(this.addr,!1,Gd),Ht(t,n)}}function ex(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;kd.set(n),i.uniformMatrix3fv(this.addr,!1,kd),Ht(t,n)}}function tx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Vd.set(n),i.uniformMatrix4fv(this.addr,!1,Vd),Ht(t,n)}}function nx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function sx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function ax(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function cx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function hx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(wh.compareFunction=t.isReversedDepthBuffer()?Bl:Ol,r=wh):r=rf,t.setTexture2D(e||r,s)}function ux(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||of,s)}function dx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||lf,s)}function fx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||af,s)}function px(i){switch(i){case 5126:return $g;case 35664:return Jg;case 35665:return Kg;case 35666:return jg;case 35674:return Qg;case 35675:return ex;case 35676:return tx;case 5124:case 35670:return nx;case 35667:case 35671:return ix;case 35668:case 35672:return sx;case 35669:case 35673:return rx;case 5125:return ax;case 36294:return ox;case 36295:return lx;case 36296:return cx;case 35678:case 36198:case 36298:case 36306:case 35682:return hx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return fx}}function mx(i,e){i.uniform1fv(this.addr,e)}function gx(i,e){let t=dr(e,this.size,2);i.uniform2fv(this.addr,t)}function xx(i,e){let t=dr(e,this.size,3);i.uniform3fv(this.addr,t)}function vx(i,e){let t=dr(e,this.size,4);i.uniform4fv(this.addr,t)}function _x(i,e){let t=dr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function yx(i,e){let t=dr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Mx(i,e){let t=dr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sx(i,e){i.uniform1iv(this.addr,e)}function bx(i,e){i.uniform2iv(this.addr,e)}function wx(i,e){i.uniform3iv(this.addr,e)}function Ex(i,e){i.uniform4iv(this.addr,e)}function Tx(i,e){i.uniform1uiv(this.addr,e)}function Ax(i,e){i.uniform2uiv(this.addr,e)}function Cx(i,e){i.uniform3uiv(this.addr,e)}function Rx(i,e){i.uniform4uiv(this.addr,e)}function Px(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=wh:a=rf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Ix(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||of,r[a])}function Lx(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||lf,r[a])}function Dx(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||af,r[a])}function Nx(i){switch(i){case 5126:return mx;case 35664:return gx;case 35665:return xx;case 35666:return vx;case 35674:return _x;case 35675:return yx;case 35676:return Mx;case 5124:case 35670:return Sx;case 35667:case 35671:return bx;case 35668:case 35672:return wx;case 35669:case 35673:return Ex;case 5125:return Tx;case 36294:return Ax;case 36295:return Cx;case 36296:return Rx;case 35678:case 36198:case 36298:case 36306:case 35682:return Px;case 35679:case 36299:case 36307:return Ix;case 35680:case 36300:case 36308:case 36293:return Lx;case 36289:case 36303:case 36311:case 36292:return Dx}}var Eh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=px(t.type)}},Th=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Nx(t.type)}},Ah=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Sh=/(\w+)(\])?(\[|\.)?/g;function Wd(i,e){i.seq.push(e),i.map[e.id]=e}function Ux(i,e,t){let n=i.name,s=n.length;for(Sh.lastIndex=0;;){let r=Sh.exec(n),a=Sh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Wd(t,c===void 0?new Eh(o,i,e):new Th(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Ah(o),Wd(t,d)),t=d}}}var ur=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ux(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Xd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Fx=37297,Ox=0;function Bx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var qd=new Fe;function zx(i){qe._getMatrix(qd,qe.workingColorSpace,i);let e=`mat3( ${qd.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case Dr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Yd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Bx(i.getShaderSource(e),o)}else return r}function Hx(i,e){let t=zx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Vx={[ta]:"Linear",[na]:"Reinhard",[ia]:"Cineon",[ps]:"ACESFilmic",[ra]:"AgX",[aa]:"Neutral",[sa]:"Custom"};function kx(i,e){let t=Vx[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Vl=new I;function Gx(){qe.getLuminanceCoefficients(Vl);let i=Vl.x.toFixed(4),e=Vl.y.toFixed(4),t=Vl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function Xx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xa(i){return i!==""}function Zd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $d(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ch(i){return i.replace(Yx,$x)}var Zx=new Map;function $x(i,e){let t=ke[e];if(t===void 0){let n=Zx.get(e);if(n!==void 0)t=ke[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ch(t)}var Jx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jd(i){return i.replace(Jx,Kx)}function Kx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var jx={[ea]:"SHADOWMAP_TYPE_PCF",[rr]:"SHADOWMAP_TYPE_VSM"};function Qx(i){return jx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ev={[Vi]:"ENVMAP_TYPE_CUBE",[ms]:"ENVMAP_TYPE_CUBE",[oa]:"ENVMAP_TYPE_CUBE_UV"};function tv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ev[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var nv={[ms]:"ENVMAP_MODE_REFRACTION"};function iv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":nv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var sv={[Qc]:"ENVMAP_BLENDING_MULTIPLY",[gd]:"ENVMAP_BLENDING_MIX",[xd]:"ENVMAP_BLENDING_ADD"};function rv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":sv[i.combine]||"ENVMAP_BLENDING_NONE"}function av(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ov(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Qx(t),c=tv(t),h=iv(t),d=rv(t),u=av(t),p=Wx(t),x=Xx(r),_=s.createProgram(),g,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(xa).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(xa).join(`
`),f.length>0&&(f+=`
`)):(g=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),f=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?ke.tonemapping_pars_fragment:"",t.toneMapping!==Hn?kx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,Hx("linearToOutputTexel",t.outputColorSpace),Gx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xa).join(`
`)),a=Ch(a),a=Zd(a,t),a=$d(a,t),o=Ch(o),o=Zd(o,t),o=$d(o,t),a=Jd(a),o=Jd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===oh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===oh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let w=M+g+a,b=M+f+o,C=Xd(s,s.VERTEX_SHADER,w),T=Xd(s,s.FRAGMENT_SHADER,b);s.attachShader(_,C),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(R){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(_)||"",W=s.getShaderInfoLog(C)||"",X=s.getShaderInfoLog(T)||"",O=F.trim(),V=W.trim(),G=X.trim(),te=!0,ne=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,T);else{let fe=Yd(s,C,"vertex"),Se=Yd(s,T,"fragment");Ie("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+fe+`
`+Se)}else O!==""?Re("WebGLProgram: Program Info Log:",O):(V===""||G==="")&&(ne=!1);ne&&(R.diagnostics={runnable:te,programLog:O,vertexShader:{log:V,prefix:g},fragmentShader:{log:G,prefix:f}})}s.deleteShader(C),s.deleteShader(T),y=new ur(s,_),A=qx(s,_)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(_,Fx)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ox++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}var lv=0,Rh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ph(e),t.set(e,n)),n}},Ph=class{constructor(e){this.id=lv++,this.code=e,this.usedTimes=0}};function cv(i){return i===Wi||i===fa||i===pa}function hv(i,e,t,n,s,r){let a=new Js,o=new Rh,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,A,L,R,F,W){let X=R.fog,O=F.geometry,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,te=e.get(y.envMap||V,G),ne=te&&te.mapping===oa?te.image.height:null,fe=p[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&Re("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let Se=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ae=Se!==void 0?Se.length:0,Qe=0;O.morphAttributes.position!==void 0&&(Qe=1),O.morphAttributes.normal!==void 0&&(Qe=2),O.morphAttributes.color!==void 0&&(Qe=3);let ct,He,J,ge;if(fe){let Be=oi[fe];ct=Be.vertexShader,He=Be.fragmentShader}else ct=y.vertexShader,He=y.fragmentShader,o.update(y),J=o.getVertexShaderID(y),ge=o.getFragmentShaderID(y);let ae=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Oe=F.isInstancedMesh===!0,Ne=F.isBatchedMesh===!0,wt=!!y.map,$e=!!y.matcap,ht=!!te,yt=!!y.aoMap,Ye=!!y.lightMap,Ut=!!y.bumpMap,Et=!!y.normalMap,xn=!!y.displacementMap,N=!!y.emissiveMap,Ft=!!y.metalnessMap,Je=!!y.roughnessMap,mt=y.anisotropy>0,he=y.clearcoat>0,Tt=y.dispersion>0,E=y.iridescence>0,v=y.sheen>0,B=y.transmission>0,Z=mt&&!!y.anisotropyMap,ee=he&&!!y.clearcoatMap,ie=he&&!!y.clearcoatNormalMap,ce=he&&!!y.clearcoatRoughnessMap,q=E&&!!y.iridescenceMap,$=E&&!!y.iridescenceThicknessMap,xe=v&&!!y.sheenColorMap,ye=v&&!!y.sheenRoughnessMap,oe=!!y.specularMap,se=!!y.specularColorMap,Ue=!!y.specularIntensityMap,Ve=B&&!!y.transmissionMap,nt=B&&!!y.thicknessMap,D=!!y.gradientMap,re=!!y.alphaMap,Y=y.alphaTest>0,ve=!!y.alphaHash,le=!!y.extensions,Q=Hn;y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Q=i.toneMapping);let we={shaderID:fe,shaderType:y.type,shaderName:y.name,vertexShader:ct,fragmentShader:He,defines:y.defines,customVertexShaderID:J,customFragmentShaderID:ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ne,batchingColor:Ne&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:wt,matcap:$e,envMap:ht,envMapMode:ht&&te.mapping,envMapCubeUVHeight:ne,aoMap:yt,lightMap:Ye,bumpMap:Ut,normalMap:Et,displacementMap:xn,emissiveMap:N,normalMapObjectSpace:Et&&y.normalMapType===yd,normalMapTangentSpace:Et&&y.normalMapType===Fl,packedNormalMap:Et&&y.normalMapType===Fl&&cv(y.normalMap.format),metalnessMap:Ft,roughnessMap:Je,anisotropy:mt,anisotropyMap:Z,clearcoat:he,clearcoatMap:ee,clearcoatNormalMap:ie,clearcoatRoughnessMap:ce,dispersion:Tt,iridescence:E,iridescenceMap:q,iridescenceThicknessMap:$,sheen:v,sheenColorMap:xe,sheenRoughnessMap:ye,specularMap:oe,specularColorMap:se,specularIntensityMap:Ue,transmission:B,transmissionMap:Ve,thicknessMap:nt,gradientMap:D,opaque:y.transparent===!1&&y.blending===rs&&y.alphaToCoverage===!1,alphaMap:re,alphaTest:Y,alphaHash:ve,combine:y.combine,mapUv:wt&&x(y.map.channel),aoMapUv:yt&&x(y.aoMap.channel),lightMapUv:Ye&&x(y.lightMap.channel),bumpMapUv:Ut&&x(y.bumpMap.channel),normalMapUv:Et&&x(y.normalMap.channel),displacementMapUv:xn&&x(y.displacementMap.channel),emissiveMapUv:N&&x(y.emissiveMap.channel),metalnessMapUv:Ft&&x(y.metalnessMap.channel),roughnessMapUv:Je&&x(y.roughnessMap.channel),anisotropyMapUv:Z&&x(y.anisotropyMap.channel),clearcoatMapUv:ee&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:ie&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:$&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:ye&&x(y.sheenRoughnessMap.channel),specularMapUv:oe&&x(y.specularMap.channel),specularColorMapUv:se&&x(y.specularColorMap.channel),specularIntensityMapUv:Ue&&x(y.specularIntensityMap.channel),transmissionMapUv:Ve&&x(y.transmissionMap.channel),thicknessMapUv:nt&&x(y.thicknessMap.channel),alphaMapUv:re&&x(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Et||mt),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(wt||re),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Et===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:De,skinning:F.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:Qe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Q,decodeVideoTexture:wt&&y.map.isVideoTexture===!0&&qe.getTransfer(y.map.colorSpace)===it,decodeVideoTextureEmissive:N&&y.emissiveMap.isVideoTexture===!0&&qe.getTransfer(y.emissiveMap.colorSpace)===it,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===un,flipSided:y.side===Wt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:le&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&y.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return we.vertexUv1s=l.has(1),we.vertexUv2s=l.has(2),we.vertexUv3s=l.has(3),l.clear(),we}function g(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let L in y.defines)A.push(L),A.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(f(A,y),M(A,y),A.push(i.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function f(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function M(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),y.push(a.mask)}function w(y){let A=p[y.type],L;if(A){let R=oi[A];L=Rn.clone(R.uniforms)}else L=y.uniforms;return L}function b(y,A){let L=h.get(A);return L!==void 0?++L.usedTimes:(L=new ov(i,A,y,s),c.push(L),h.set(A,L)),L}function C(y){if(--y.usedTimes===0){let A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function T(y){o.remove(y)}function P(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:w,acquireProgram:b,releaseProgram:C,releaseShaderCache:T,programs:c,dispose:P}}function uv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function dv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function jd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Qd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,x,_,g,f){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:p,material:x,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:f},i[e]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=x,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=g,M.group=f),e++,M}function l(u,p,x,_,g,f){let M=o(u,p,x,_,g,f);x.transmission>0?n.push(M):x.transparent===!0?s.push(M):t.push(M)}function c(u,p,x,_,g,f){let M=o(u,p,x,_,g,f);x.transmission>0?n.unshift(M):x.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,p){t.length>1&&t.sort(u||dv),n.length>1&&n.sort(p||jd),s.length>1&&s.sort(p||jd)}function d(){for(let u=e,p=i.length;u<p;u++){let x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function fv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Qd,i.set(n,[a])):s>=r.length?(a=new Qd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function pv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ee};break;case"SpotLight":t={position:new I,direction:new I,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function mv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var gv=0;function xv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function vv(i){let e=new pv,t=mv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let s=new I,r=new ot,a=new ot;function o(c){let h=0,d=0,u=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,x=0,_=0,g=0,f=0,M=0,w=0,b=0,C=0,T=0,P=0;c.sort(xv);for(let A=0,L=c.length;A<L;A++){let R=c[A],F=R.color,W=R.intensity,X=R.distance,O=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Wi?O=R.shadow.map.texture:O=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=F.r*W,d+=F.g*W,u+=F.b*W;else if(R.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(R.sh.coefficients[V],W);P++}else if(R.isDirectionalLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let G=R.shadow,te=t.get(R);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,n.directionalShadow[p]=te,n.directionalShadowMap[p]=O,n.directionalShadowMatrix[p]=R.shadow.matrix,M++}n.directional[p]=V,p++}else if(R.isSpotLight){let V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(F).multiplyScalar(W),V.distance=X,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,n.spot[_]=V;let G=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,G.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[_]=G.matrix,R.castShadow){let te=t.get(R);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,n.spotShadow[_]=te,n.spotShadowMap[_]=O,b++}_++}else if(R.isRectAreaLight){let V=e.get(R);V.color.copy(F).multiplyScalar(W),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=V,g++}else if(R.isPointLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){let G=R.shadow,te=t.get(R);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,te.shadowCameraNear=G.camera.near,te.shadowCameraFar=G.camera.far,n.pointShadow[x]=te,n.pointShadowMap[x]=O,n.pointShadowMatrix[x]=R.shadow.matrix,w++}n.point[x]=V,x++}else if(R.isHemisphereLight){let V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(W),V.groundColor.copy(R.groundColor).multiplyScalar(W),n.hemi[f]=V,f++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let y=n.hash;(y.directionalLength!==p||y.pointLength!==x||y.spotLength!==_||y.rectAreaLength!==g||y.hemiLength!==f||y.numDirectionalShadows!==M||y.numPointShadows!==w||y.numSpotShadows!==b||y.numSpotMaps!==C||y.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=g,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=b+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,y.directionalLength=p,y.pointLength=x,y.spotLength=_,y.rectAreaLength=g,y.hemiLength=f,y.numDirectionalShadows=M,y.numPointShadows=w,y.numSpotShadows=b,y.numSpotMaps=C,y.numLightProbes=P,n.version=gv++)}function l(c,h){let d=0,u=0,p=0,x=0,_=0,g=h.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){let w=c[f];if(w.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),d++}else if(w.isSpotLight){let b=n.spot[p];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),p++}else if(w.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),a.identity(),r.copy(w.matrixWorld),r.premultiply(g),a.extractRotation(r),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(w.isPointLight){let b=n.point[u];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),u++}else if(w.isHemisphereLight){let b=n.hemi[_];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function ef(i){let e=new vv(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function _v(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new ef(i),e.set(s,[o])):r>=a.length?(o=new ef(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var yv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mv=`uniform sampler2D shadow_pass;
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
}`,Sv=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],bv=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],tf=new ot,ga=new I,bh=new I;function wv(i,e,t){let n=new Qs,s=new ue,r=new ue,a=new St,o=new Uo,l=new Fo,c={},h=t.maxTextureSize,d={[Mi]:Wt,[Wt]:Mi,[un]:un},u=new Xe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:yv,fragmentShader:Mv}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let x=new je;x.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new tt(x,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ea;let f=this.type;this.render=function(T,P,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Ku&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ea);let A=i.getRenderTarget(),L=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),F=i.state;F.setBlending(dn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let W=f!==this.type;W&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=T.length;X<O;X++){let V=T[X],G=V.shadow;if(G===void 0){Re("WebGLShadowMap:",V,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let te=G.getFrameExtents();s.multiply(te),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/te.x),s.x=r.x*te.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/te.y),s.y=r.y*te.y,G.mapSize.y=r.y));let ne=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ne,G.map===null||W===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===rr){if(V.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new xt(s.x,s.y,{format:Wi,type:Bt,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),G.map.texture.name=V.name+".shadowMap",G.map.depthTexture=new Si(s.x,s.y,An),G.map.depthTexture.name=V.name+".shadowMapDepth",G.map.depthTexture.format=jn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt}else V.isPointLight?(G.map=new Gl(s.x),G.map.depthTexture=new Do(s.x,Vn)):(G.map=new xt(s.x,s.y),G.map.depthTexture=new Si(s.x,s.y,Vn)),G.map.depthTexture.name=V.name+".shadowMap",G.map.depthTexture.format=jn,this.type===ea?(G.map.depthTexture.compareFunction=ne?Bl:Ol,G.map.depthTexture.minFilter=Nt,G.map.depthTexture.magFilter=Nt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt);G.camera.updateProjectionMatrix()}let fe=G.map.isWebGLCubeRenderTarget?6:1;for(let Se=0;Se<fe;Se++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,Se),i.clear();else{Se===0&&(i.setRenderTarget(G.map),i.clear());let Ae=G.getViewport(Se);a.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),F.viewport(a)}if(V.isPointLight){let Ae=G.camera,Qe=G.matrix,ct=V.distance||Ae.far;ct!==Ae.far&&(Ae.far=ct,Ae.updateProjectionMatrix()),ga.setFromMatrixPosition(V.matrixWorld),Ae.position.copy(ga),bh.copy(Ae.position),bh.add(Sv[Se]),Ae.up.copy(bv[Se]),Ae.lookAt(bh),Ae.updateMatrixWorld(),Qe.makeTranslation(-ga.x,-ga.y,-ga.z),tf.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),G._frustum.setFromProjectionMatrix(tf,Ae.coordinateSystem,Ae.reversedDepth)}else G.updateMatrices(V);n=G.getFrustum(),b(P,y,G.camera,V,this.type)}G.isPointLightShadow!==!0&&this.type===rr&&M(G,y),G.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(A,L,R)};function M(T,P){let y=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new xt(s.x,s.y,{format:Wi,type:Bt})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(P,null,y,u,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(P,null,y,p,_,null)}function w(T,P,y,A){let L=null,R=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)L=R;else if(L=y.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let F=L.uuid,W=P.uuid,X=c[F];X===void 0&&(X={},c[F]=X);let O=X[W];O===void 0&&(O=L.clone(),X[W]=O,P.addEventListener("dispose",C)),L=O}if(L.visible=P.visible,L.wireframe=P.wireframe,A===rr?L.side=P.shadowSide!==null?P.shadowSide:P.side:L.side=P.shadowSide!==null?P.shadowSide:d[P.side],L.alphaMap=P.alphaMap,L.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,L.map=P.map,L.clipShadows=P.clipShadows,L.clippingPlanes=P.clippingPlanes,L.clipIntersection=P.clipIntersection,L.displacementMap=P.displacementMap,L.displacementScale=P.displacementScale,L.displacementBias=P.displacementBias,L.wireframeLinewidth=P.wireframeLinewidth,L.linewidth=P.linewidth,y.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let F=i.properties.get(L);F.light=y}return L}function b(T,P,y,A,L){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===rr)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);let W=e.update(T),X=T.material;if(Array.isArray(X)){let O=W.groups;for(let V=0,G=O.length;V<G;V++){let te=O[V],ne=X[te.materialIndex];if(ne&&ne.visible){let fe=w(T,ne,A,L);T.onBeforeShadow(i,T,P,y,W,fe,te),i.renderBufferDirect(y,null,W,fe,T,te),T.onAfterShadow(i,T,P,y,W,fe,te)}}}else if(X.visible){let O=w(T,X,A,L);T.onBeforeShadow(i,T,P,y,W,O,null),i.renderBufferDirect(y,null,W,O,T,null),T.onAfterShadow(i,T,P,y,W,O,null)}}let F=T.children;for(let W=0,X=F.length;W<X;W++)b(F[W],P,y,A,L)}function C(T){T.target.removeEventListener("dispose",C);for(let y in c){let A=c[y],L=T.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function Ev(i,e){function t(){let D=!1,re=new St,Y=null,ve=new St(0,0,0,0);return{setMask:function(le){Y!==le&&!D&&(i.colorMask(le,le,le,le),Y=le)},setLocked:function(le){D=le},setClear:function(le,Q,we,Be,Rt){Rt===!0&&(le*=Be,Q*=Be,we*=Be),re.set(le,Q,we,Be),ve.equals(re)===!1&&(i.clearColor(le,Q,we,Be),ve.copy(re))},reset:function(){D=!1,Y=null,ve.set(-1,0,0,0)}}}function n(){let D=!1,re=!1,Y=null,ve=null,le=null;return{setReversed:function(Q){if(re!==Q){let we=e.get("EXT_clip_control");Q?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),re=Q;let Be=le;le=null,this.setClear(Be)}},getReversed:function(){return re},setTest:function(Q){Q?ae(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(Q){Y!==Q&&!D&&(i.depthMask(Q),Y=Q)},setFunc:function(Q){if(re&&(Q=Pd[Q]),ve!==Q){switch(Q){case fo:i.depthFunc(i.NEVER);break;case po:i.depthFunc(i.ALWAYS);break;case mo:i.depthFunc(i.LESS);break;case as:i.depthFunc(i.LEQUAL);break;case go:i.depthFunc(i.EQUAL);break;case xo:i.depthFunc(i.GEQUAL);break;case vo:i.depthFunc(i.GREATER);break;case _o:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=Q}},setLocked:function(Q){D=Q},setClear:function(Q){le!==Q&&(le=Q,re&&(Q=1-Q),i.clearDepth(Q))},reset:function(){D=!1,Y=null,ve=null,le=null,re=!1}}}function s(){let D=!1,re=null,Y=null,ve=null,le=null,Q=null,we=null,Be=null,Rt=null;return{setTest:function(ut){D||(ut?ae(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(ut){re!==ut&&!D&&(i.stencilMask(ut),re=ut)},setFunc:function(ut,fi,Yn){(Y!==ut||ve!==fi||le!==Yn)&&(i.stencilFunc(ut,fi,Yn),Y=ut,ve=fi,le=Yn)},setOp:function(ut,fi,Yn){(Q!==ut||we!==fi||Be!==Yn)&&(i.stencilOp(ut,fi,Yn),Q=ut,we=fi,Be=Yn)},setLocked:function(ut){D=ut},setClear:function(ut){Rt!==ut&&(i.clearStencil(ut),Rt=ut)},reset:function(){D=!1,re=null,Y=null,ve=null,le=null,Q=null,we=null,Be=null,Rt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},p=new WeakMap,x=[],_=null,g=!1,f=null,M=null,w=null,b=null,C=null,T=null,P=null,y=new Ee(0,0,0),A=0,L=!1,R=null,F=null,W=null,X=null,O=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,te=0,ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),G=te>=1):ne.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),G=te>=2);let fe=null,Se={},Ae=i.getParameter(i.SCISSOR_BOX),Qe=i.getParameter(i.VIEWPORT),ct=new St().fromArray(Ae),He=new St().fromArray(Qe);function J(D,re,Y,ve){let le=new Uint8Array(4),Q=i.createTexture();i.bindTexture(D,Q),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<Y;we++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(re+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return Q}let ge={};ge[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(as),Ut(!1),Et(Jc),ae(i.CULL_FACE),yt(dn);function ae(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function De(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Oe(D,re){return u[D]!==re?(i.bindFramebuffer(D,re),u[D]=re,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=re),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Ne(D,re){let Y=x,ve=!1;if(D){Y=p.get(re),Y===void 0&&(Y=[],p.set(re,Y));let le=D.textures;if(Y.length!==le.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,we=le.length;Q<we;Q++)Y[Q]=i.COLOR_ATTACHMENT0+Q;Y.length=le.length,ve=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,ve=!0);ve&&i.drawBuffers(Y)}function wt(D){return _!==D?(i.useProgram(D),_=D,!0):!1}let $e={[Oi]:i.FUNC_ADD,[Qu]:i.FUNC_SUBTRACT,[ed]:i.FUNC_REVERSE_SUBTRACT};$e[td]=i.MIN,$e[nd]=i.MAX;let ht={[id]:i.ZERO,[sd]:i.ONE,[rd]:i.SRC_COLOR,[ho]:i.SRC_ALPHA,[ud]:i.SRC_ALPHA_SATURATE,[cd]:i.DST_COLOR,[od]:i.DST_ALPHA,[ad]:i.ONE_MINUS_SRC_COLOR,[uo]:i.ONE_MINUS_SRC_ALPHA,[hd]:i.ONE_MINUS_DST_COLOR,[ld]:i.ONE_MINUS_DST_ALPHA,[dd]:i.CONSTANT_COLOR,[fd]:i.ONE_MINUS_CONSTANT_COLOR,[pd]:i.CONSTANT_ALPHA,[md]:i.ONE_MINUS_CONSTANT_ALPHA};function yt(D,re,Y,ve,le,Q,we,Be,Rt,ut){if(D===dn){g===!0&&(De(i.BLEND),g=!1);return}if(g===!1&&(ae(i.BLEND),g=!0),D!==ju){if(D!==f||ut!==L){if((M!==Oi||C!==Oi)&&(i.blendEquation(i.FUNC_ADD),M=Oi,C=Oi),ut)switch(D){case rs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case st:i.blendFunc(i.ONE,i.ONE);break;case Kc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ie("WebGLState: Invalid blending: ",D);break}else switch(D){case rs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case st:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Kc:Ie("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jc:Ie("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ie("WebGLState: Invalid blending: ",D);break}w=null,b=null,T=null,P=null,y.set(0,0,0),A=0,f=D,L=ut}return}le=le||re,Q=Q||Y,we=we||ve,(re!==M||le!==C)&&(i.blendEquationSeparate($e[re],$e[le]),M=re,C=le),(Y!==w||ve!==b||Q!==T||we!==P)&&(i.blendFuncSeparate(ht[Y],ht[ve],ht[Q],ht[we]),w=Y,b=ve,T=Q,P=we),(Be.equals(y)===!1||Rt!==A)&&(i.blendColor(Be.r,Be.g,Be.b,Rt),y.copy(Be),A=Rt),f=D,L=!1}function Ye(D,re){D.side===un?De(i.CULL_FACE):ae(i.CULL_FACE);let Y=D.side===Wt;re&&(Y=!Y),Ut(Y),D.blending===rs&&D.transparent===!1?yt(dn):yt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ve=D.stencilWrite;o.setTest(ve),ve&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),N(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(D){R!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),R=D)}function Et(D){D!==$u?(ae(i.CULL_FACE),D!==F&&(D===Jc?i.cullFace(i.BACK):D===Ju?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),F=D}function xn(D){D!==W&&(G&&i.lineWidth(D),W=D)}function N(D,re,Y){D?(ae(i.POLYGON_OFFSET_FILL),(X!==re||O!==Y)&&(X=re,O=Y,a.getReversed()&&(re=-re),i.polygonOffset(re,Y))):De(i.POLYGON_OFFSET_FILL)}function Ft(D){D?ae(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function Je(D){D===void 0&&(D=i.TEXTURE0+V-1),fe!==D&&(i.activeTexture(D),fe=D)}function mt(D,re,Y){Y===void 0&&(fe===null?Y=i.TEXTURE0+V-1:Y=fe);let ve=Se[Y];ve===void 0&&(ve={type:void 0,texture:void 0},Se[Y]=ve),(ve.type!==D||ve.texture!==re)&&(fe!==Y&&(i.activeTexture(Y),fe=Y),i.bindTexture(D,re||ge[D]),ve.type=D,ve.texture=re)}function he(){let D=Se[fe];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Tt(){try{i.compressedTexImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function v(){try{i.texSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function B(){try{i.texSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function ee(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function ie(){try{i.texStorage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function ce(){try{i.texStorage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function q(){try{i.texImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function $(){try{i.texImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function xe(D){return d[D]!==void 0?d[D]:i.getParameter(D)}function ye(D,re){d[D]!==re&&(i.pixelStorei(D,re),d[D]=re)}function oe(D){ct.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ct.copy(D))}function se(D){He.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),He.copy(D))}function Ue(D,re){let Y=c.get(re);Y===void 0&&(Y=new WeakMap,c.set(re,Y));let ve=Y.get(D);ve===void 0&&(ve=i.getUniformBlockIndex(re,D.name),Y.set(D,ve))}function Ve(D,re){let ve=c.get(re).get(D);l.get(re)!==ve&&(i.uniformBlockBinding(re,ve,D.__bindingPointIndex),l.set(re,ve))}function nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},fe=null,Se={},u={},p=new WeakMap,x=[],_=null,g=!1,f=null,M=null,w=null,b=null,C=null,T=null,P=null,y=new Ee(0,0,0),A=0,L=!1,R=null,F=null,W=null,X=null,O=null,ct.set(0,0,i.canvas.width,i.canvas.height),He.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:De,bindFramebuffer:Oe,drawBuffers:Ne,useProgram:wt,setBlending:yt,setMaterial:Ye,setFlipSided:Ut,setCullFace:Et,setLineWidth:xn,setPolygonOffset:N,setScissorTest:Ft,activeTexture:Je,bindTexture:mt,unbindTexture:he,compressedTexImage2D:Tt,compressedTexImage3D:E,texImage2D:q,texImage3D:$,pixelStorei:ye,getParameter:xe,updateUBOMapping:Ue,uniformBlockBinding:Ve,texStorage2D:ie,texStorage3D:ce,texSubImage2D:v,texSubImage3D:B,compressedTexSubImage2D:Z,compressedTexSubImage3D:ee,scissor:oe,viewport:se,reset:nt}}function Tv(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,h=new WeakMap,d=new Set,u,p=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,v){return x?new OffscreenCanvas(E,v):Nr("canvas")}function g(E,v,B){let Z=1,ee=Tt(E);if((ee.width>B||ee.height>B)&&(Z=B/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let ie=Math.floor(Z*ee.width),ce=Math.floor(Z*ee.height);u===void 0&&(u=_(ie,ce));let q=v?_(ie,ce):u;return q.width=ie,q.height=ce,q.getContext("2d").drawImage(E,0,0,ie,ce),Re("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+ie+"x"+ce+")."),q}else return"data"in E&&Re("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),E;return E}function f(E){return E.generateMipmaps}function M(E){i.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(E,v,B,Z,ee,ie=!1){if(E!==null){if(i[E]!==void 0)return i[E];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ce;Z&&(ce=e.get("EXT_texture_norm16"),ce||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=v;if(v===i.RED&&(B===i.FLOAT&&(q=i.R32F),B===i.HALF_FLOAT&&(q=i.R16F),B===i.UNSIGNED_BYTE&&(q=i.R8),B===i.UNSIGNED_SHORT&&ce&&(q=ce.R16_EXT),B===i.SHORT&&ce&&(q=ce.R16_SNORM_EXT)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.R8UI),B===i.UNSIGNED_SHORT&&(q=i.R16UI),B===i.UNSIGNED_INT&&(q=i.R32UI),B===i.BYTE&&(q=i.R8I),B===i.SHORT&&(q=i.R16I),B===i.INT&&(q=i.R32I)),v===i.RG&&(B===i.FLOAT&&(q=i.RG32F),B===i.HALF_FLOAT&&(q=i.RG16F),B===i.UNSIGNED_BYTE&&(q=i.RG8),B===i.UNSIGNED_SHORT&&ce&&(q=ce.RG16_EXT),B===i.SHORT&&ce&&(q=ce.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RG8UI),B===i.UNSIGNED_SHORT&&(q=i.RG16UI),B===i.UNSIGNED_INT&&(q=i.RG32UI),B===i.BYTE&&(q=i.RG8I),B===i.SHORT&&(q=i.RG16I),B===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGB8UI),B===i.UNSIGNED_SHORT&&(q=i.RGB16UI),B===i.UNSIGNED_INT&&(q=i.RGB32UI),B===i.BYTE&&(q=i.RGB8I),B===i.SHORT&&(q=i.RGB16I),B===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),B===i.UNSIGNED_INT&&(q=i.RGBA32UI),B===i.BYTE&&(q=i.RGBA8I),B===i.SHORT&&(q=i.RGBA16I),B===i.INT&&(q=i.RGBA32I)),v===i.RGB&&(B===i.UNSIGNED_SHORT&&ce&&(q=ce.RGB16_EXT),B===i.SHORT&&ce&&(q=ce.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),v===i.RGBA){let $=ie?Dr:qe.getTransfer(ee);B===i.FLOAT&&(q=i.RGBA32F),B===i.HALF_FLOAT&&(q=i.RGBA16F),B===i.UNSIGNED_BYTE&&(q=$===it?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ce&&(q=ce.RGBA16_EXT),B===i.SHORT&&ce&&(q=ce.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function C(E,v){let B;return E?v===null||v===Vn||v===or?B=i.DEPTH24_STENCIL8:v===An?B=i.DEPTH32F_STENCIL8:v===ar&&(B=i.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Vn||v===or?B=i.DEPTH_COMPONENT24:v===An?B=i.DEPTH_COMPONENT32F:v===ar&&(B=i.DEPTH_COMPONENT16),B}function T(E,v){return f(E)===!0||E.isFramebufferTexture&&E.minFilter!==Lt&&E.minFilter!==Nt?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function P(E){let v=E.target;v.removeEventListener("dispose",P),A(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function y(E){let v=E.target;v.removeEventListener("dispose",y),R(v)}function A(E){let v=n.get(E);if(v.__webglInit===void 0)return;let B=E.source,Z=p.get(B);if(Z){let ee=Z[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&L(E),Object.keys(Z).length===0&&p.delete(B)}n.remove(E)}function L(E){let v=n.get(E);i.deleteTexture(v.__webglTexture);let B=E.source,Z=p.get(B);delete Z[v.__cacheKey],a.memory.textures--}function R(E){let v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let ee=0;ee<v.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(v.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let B=E.textures;for(let Z=0,ee=B.length;Z<ee;Z++){let ie=n.get(B[Z]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(B[Z])}n.remove(E)}let F=0;function W(){F=0}function X(){return F}function O(E){F=E}function V(){let E=F;return E>=s.maxTextures&&Re("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),F+=1,E}function G(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function te(E,v){let B=n.get(E);if(E.isVideoTexture&&mt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&B.__version!==E.version){let Z=E.image;if(Z===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{De(B,E,v);return}}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function ne(E,v){let B=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){De(B,E,v);return}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function fe(E,v){let B=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){De(B,E,v);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function Se(E,v){let B=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&B.__version!==E.version){Oe(B,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}let Ae={[yo]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[Mo]:i.MIRRORED_REPEAT},Qe={[Lt]:i.NEAREST,[vd]:i.NEAREST_MIPMAP_NEAREST,[la]:i.NEAREST_MIPMAP_LINEAR,[Nt]:i.LINEAR,[Qo]:i.LINEAR_MIPMAP_NEAREST,[ki]:i.LINEAR_MIPMAP_LINEAR},ct={[Md]:i.NEVER,[Td]:i.ALWAYS,[Sd]:i.LESS,[Ol]:i.LEQUAL,[bd]:i.EQUAL,[Bl]:i.GEQUAL,[wd]:i.GREATER,[Ed]:i.NOTEQUAL};function He(E,v){if(v.type===An&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Nt||v.magFilter===Qo||v.magFilter===la||v.magFilter===ki||v.minFilter===Nt||v.minFilter===Qo||v.minFilter===la||v.minFilter===ki)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Ae[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Ae[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Ae[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Qe[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Qe[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ct[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Lt||v.minFilter!==la&&v.minFilter!==ki||v.type===An&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function J(E,v){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",P));let Z=v.source,ee=p.get(Z);ee===void 0&&(ee={},p.set(Z,ee));let ie=G(v);if(ie!==E.__cacheKey){ee[ie]===void 0&&(ee[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ee[ie].usedTimes++;let ce=ee[E.__cacheKey];ce!==void 0&&(ee[E.__cacheKey].usedTimes--,ce.usedTimes===0&&L(v)),E.__cacheKey=ie,E.__webglTexture=ee[ie].texture}return B}function ge(E,v,B){return Math.floor(Math.floor(E/B)/v)}function ae(E,v,B,Z){let ie=E.updateRanges;if(ie.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,B,Z,v.data);else{ie.sort((ye,oe)=>ye.start-oe.start);let ce=0;for(let ye=1;ye<ie.length;ye++){let oe=ie[ce],se=ie[ye],Ue=oe.start+oe.count,Ve=ge(se.start,v.width,4),nt=ge(oe.start,v.width,4);se.start<=Ue+1&&Ve===nt&&ge(se.start+se.count-1,v.width,4)===Ve?oe.count=Math.max(oe.count,se.start+se.count-oe.start):(++ce,ie[ce]=se)}ie.length=ce+1;let q=t.getParameter(i.UNPACK_ROW_LENGTH),$=t.getParameter(i.UNPACK_SKIP_PIXELS),xe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ye=0,oe=ie.length;ye<oe;ye++){let se=ie[ye],Ue=Math.floor(se.start/4),Ve=Math.ceil(se.count/4),nt=Ue%v.width,D=Math.floor(Ue/v.width),re=Ve,Y=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,nt,D,re,Y,B,Z,v.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,$),t.pixelStorei(i.UNPACK_SKIP_ROWS,xe)}}function De(E,v,B){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);let ee=J(E,v),ie=v.source;t.bindTexture(Z,E.__webglTexture,i.TEXTURE0+B);let ce=n.get(ie);if(ie.version!==ce.__version||ee===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let Y=qe.getPrimaries(qe.workingColorSpace),ve=v.colorSpace===bi?null:qe.getPrimaries(v.colorSpace),le=v.colorSpace===bi||Y===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let $=g(v.image,!1,s.maxTextureSize);$=he(v,$);let xe=r.convert(v.format,v.colorSpace),ye=r.convert(v.type),oe=b(v.internalFormat,xe,ye,v.normalized,v.colorSpace,v.isVideoTexture);He(Z,v);let se,Ue=v.mipmaps,Ve=v.isVideoTexture!==!0,nt=ce.__version===void 0||ee===!0,D=ie.dataReady,re=T(v,$);if(v.isDepthTexture)oe=C(v.format===Gi,v.type),nt&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,oe,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,oe,$.width,$.height,0,xe,ye,null));else if(v.isDataTexture)if(Ue.length>0){Ve&&nt&&t.texStorage2D(i.TEXTURE_2D,re,oe,Ue[0].width,Ue[0].height);for(let Y=0,ve=Ue.length;Y<ve;Y++)se=Ue[Y],Ve?D&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,se.width,se.height,xe,ye,se.data):t.texImage2D(i.TEXTURE_2D,Y,oe,se.width,se.height,0,xe,ye,se.data);v.generateMipmaps=!1}else Ve?(nt&&t.texStorage2D(i.TEXTURE_2D,re,oe,$.width,$.height),D&&ae(v,$,xe,ye)):t.texImage2D(i.TEXTURE_2D,0,oe,$.width,$.height,0,xe,ye,$.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ve&&nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,oe,Ue[0].width,Ue[0].height,$.depth);for(let Y=0,ve=Ue.length;Y<ve;Y++)if(se=Ue[Y],v.format!==Cn)if(xe!==null)if(Ve){if(D)if(v.layerUpdates.size>0){let le=dh(se.width,se.height,v.format,v.type);for(let Q of v.layerUpdates){let we=se.data.subarray(Q*le/se.data.BYTES_PER_ELEMENT,(Q+1)*le/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,Q,se.width,se.height,1,xe,we)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,se.width,se.height,$.depth,xe,se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,oe,se.width,se.height,$.depth,0,se.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,se.width,se.height,$.depth,xe,ye,se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,oe,se.width,se.height,$.depth,0,xe,ye,se.data)}else{Ve&&nt&&t.texStorage2D(i.TEXTURE_2D,re,oe,Ue[0].width,Ue[0].height);for(let Y=0,ve=Ue.length;Y<ve;Y++)se=Ue[Y],v.format!==Cn?xe!==null?Ve?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,se.width,se.height,xe,se.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,oe,se.width,se.height,0,se.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?D&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,se.width,se.height,xe,ye,se.data):t.texImage2D(i.TEXTURE_2D,Y,oe,se.width,se.height,0,xe,ye,se.data)}else if(v.isDataArrayTexture)if(Ve){if(nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,oe,$.width,$.height,$.depth),D)if(v.layerUpdates.size>0){let Y=dh($.width,$.height,v.format,v.type);for(let ve of v.layerUpdates){let le=$.data.subarray(ve*Y/$.data.BYTES_PER_ELEMENT,(ve+1)*Y/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,$.width,$.height,1,xe,ye,le)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,xe,ye,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,oe,$.width,$.height,$.depth,0,xe,ye,$.data);else if(v.isData3DTexture)Ve?(nt&&t.texStorage3D(i.TEXTURE_3D,re,oe,$.width,$.height,$.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,xe,ye,$.data)):t.texImage3D(i.TEXTURE_3D,0,oe,$.width,$.height,$.depth,0,xe,ye,$.data);else if(v.isFramebufferTexture){if(nt)if(Ve)t.texStorage2D(i.TEXTURE_2D,re,oe,$.width,$.height);else{let Y=$.width,ve=$.height;for(let le=0;le<re;le++)t.texImage2D(i.TEXTURE_2D,le,oe,Y,ve,0,xe,ye,null),Y>>=1,ve>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let Y=i.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),$.parentNode!==Y){Y.appendChild($),d.add(v),Y.onpaint=Be=>{let Rt=Be.changedElements;for(let ut of d)Rt.includes(ut.image)&&(ut.needsUpdate=!0)},Y.requestPaint();return}let ve=0,le=i.RGBA,Q=i.RGBA,we=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,ve,le,Q,we,$),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Ve&&nt){let Y=Tt(Ue[0]);t.texStorage2D(i.TEXTURE_2D,re,oe,Y.width,Y.height)}for(let Y=0,ve=Ue.length;Y<ve;Y++)se=Ue[Y],Ve?D&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,xe,ye,se):t.texImage2D(i.TEXTURE_2D,Y,oe,xe,ye,se);v.generateMipmaps=!1}else if(Ve){if(nt){let Y=Tt($);t.texStorage2D(i.TEXTURE_2D,re,oe,Y.width,Y.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,ye,$)}else t.texImage2D(i.TEXTURE_2D,0,oe,xe,ye,$);f(v)&&M(Z),ce.__version=ie.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Oe(E,v,B){if(v.image.length!==6)return;let Z=J(E,v),ee=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+B);let ie=n.get(ee);if(ee.version!==ie.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);let ce=qe.getPrimaries(qe.workingColorSpace),q=v.colorSpace===bi?null:qe.getPrimaries(v.colorSpace),$=v.colorSpace===bi||ce===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let xe=v.isCompressedTexture||v.image[0].isCompressedTexture,ye=v.image[0]&&v.image[0].isDataTexture,oe=[];for(let Q=0;Q<6;Q++)!xe&&!ye?oe[Q]=g(v.image[Q],!0,s.maxCubemapSize):oe[Q]=ye?v.image[Q].image:v.image[Q],oe[Q]=he(v,oe[Q]);let se=oe[0],Ue=r.convert(v.format,v.colorSpace),Ve=r.convert(v.type),nt=b(v.internalFormat,Ue,Ve,v.normalized,v.colorSpace),D=v.isVideoTexture!==!0,re=ie.__version===void 0||Z===!0,Y=ee.dataReady,ve=T(v,se);He(i.TEXTURE_CUBE_MAP,v);let le;if(xe){D&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,nt,se.width,se.height);for(let Q=0;Q<6;Q++){le=oe[Q].mipmaps;for(let we=0;we<le.length;we++){let Be=le[we];v.format!==Cn?Ue!==null?D?Y&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,Be.width,Be.height,Ue,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,nt,Be.width,Be.height,0,Be.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,Be.width,Be.height,Ue,Ve,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,nt,Be.width,Be.height,0,Ue,Ve,Be.data)}}}else{if(le=v.mipmaps,D&&re){le.length>0&&ve++;let Q=Tt(oe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,nt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ye){D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,oe[Q].width,oe[Q].height,Ue,Ve,oe[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,nt,oe[Q].width,oe[Q].height,0,Ue,Ve,oe[Q].data);for(let we=0;we<le.length;we++){let Rt=le[we].image[Q].image;D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,Rt.width,Rt.height,Ue,Ve,Rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,nt,Rt.width,Rt.height,0,Ue,Ve,Rt.data)}}else{D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ue,Ve,oe[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,nt,Ue,Ve,oe[Q]);for(let we=0;we<le.length;we++){let Be=le[we];D?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,Ue,Ve,Be.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,nt,Ue,Ve,Be.image[Q])}}}f(v)&&M(i.TEXTURE_CUBE_MAP),ie.__version=ee.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Ne(E,v,B,Z,ee,ie){let ce=r.convert(B.format,B.colorSpace),q=r.convert(B.type),$=b(B.internalFormat,ce,q,B.normalized,B.colorSpace),xe=n.get(v),ye=n.get(B);if(ye.__renderTarget=v,!xe.__hasExternalTextures){let oe=Math.max(1,v.width>>ie),se=Math.max(1,v.height>>ie);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,ie,$,oe,se,v.depth,0,ce,q,null):t.texImage2D(ee,ie,$,oe,se,0,ce,q,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Je(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ee,ye.__webglTexture,0,Ft(v)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ee,ye.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(E,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){let Z=v.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,ie=C(v.stencilBuffer,ee),ce=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Je(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ft(v),ie,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft(v),ie,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ie,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,E)}else{let Z=v.textures;for(let ee=0;ee<Z.length;ee++){let ie=Z[ee],ce=r.convert(ie.format,ie.colorSpace),q=r.convert(ie.type),$=b(ie.internalFormat,ce,q,ie.normalized,ie.colorSpace);Je(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ft(v),$,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft(v),$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function $e(E,v,B){let Z=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ee=n.get(v.depthTexture);if(ee.__renderTarget=v,(!ee.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),ee.__webglTexture===void 0){ee.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),He(i.TEXTURE_CUBE_MAP,v.depthTexture);let xe=r.convert(v.depthTexture.format),ye=r.convert(v.depthTexture.type),oe;v.depthTexture.format===jn?oe=i.DEPTH_COMPONENT24:v.depthTexture.format===Gi&&(oe=i.DEPTH24_STENCIL8);for(let se=0;se<6;se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,oe,v.width,v.height,0,xe,ye,null)}}else te(v.depthTexture,0);let ie=ee.__webglTexture,ce=Ft(v),q=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,$=v.depthTexture.format===Gi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===jn)Je(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,q,ie,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,$,q,ie,0);else if(v.depthTexture.format===Gi)Je(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,q,ie,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,$,q,ie,0);else throw new Error("Unknown depthTexture format")}function ht(E){let v=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let Z=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){let ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=Z}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let Z=0;Z<6;Z++)$e(v.__webglFramebuffer[Z],E,Z);else{let Z=E.texture.mipmaps;Z&&Z.length>0?$e(v.__webglFramebuffer[0],E,0):$e(v.__webglFramebuffer,E,0)}else if(B){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),wt(v.__webglDepthbuffer[Z],E,!1);else{let ee=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,ie)}}else{let Z=E.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),wt(v.__webglDepthbuffer,E,!1);else{let ee=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,ie)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function yt(E,v,B){let Z=n.get(E);v!==void 0&&Ne(Z.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&ht(E)}function Ye(E){let v=E.texture,B=n.get(E),Z=n.get(v);E.addEventListener("dispose",y);let ee=E.textures,ie=E.isWebGLCubeRenderTarget===!0,ce=ee.length>1;if(ce||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,a.memory.textures++),ie){B.__webglFramebuffer=[];for(let q=0;q<6;q++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[q]=[];for(let $=0;$<v.mipmaps.length;$++)B.__webglFramebuffer[q][$]=i.createFramebuffer()}else B.__webglFramebuffer[q]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let q=0;q<v.mipmaps.length;q++)B.__webglFramebuffer[q]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ce)for(let q=0,$=ee.length;q<$;q++){let xe=n.get(ee[q]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&Je(E)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let q=0;q<ee.length;q++){let $=ee[q];B.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[q]);let xe=r.convert($.format,$.colorSpace),ye=r.convert($.type),oe=b($.internalFormat,xe,ye,$.normalized,$.colorSpace,E.isXRRenderTarget===!0),se=Ft(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,se,oe,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,B.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),wt(B.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),He(i.TEXTURE_CUBE_MAP,v);for(let q=0;q<6;q++)if(v.mipmaps&&v.mipmaps.length>0)for(let $=0;$<v.mipmaps.length;$++)Ne(B.__webglFramebuffer[q][$],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,$);else Ne(B.__webglFramebuffer[q],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);f(v)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let q=0,$=ee.length;q<$;q++){let xe=ee[q],ye=n.get(xe),oe=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(oe=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,ye.__webglTexture),He(oe,xe),Ne(B.__webglFramebuffer,E,xe,i.COLOR_ATTACHMENT0+q,oe,0),f(xe)&&M(oe)}t.unbindTexture()}else{let q=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(q=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(q,Z.__webglTexture),He(q,v),v.mipmaps&&v.mipmaps.length>0)for(let $=0;$<v.mipmaps.length;$++)Ne(B.__webglFramebuffer[$],E,v,i.COLOR_ATTACHMENT0,q,$);else Ne(B.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,q,0);f(v)&&M(q),t.unbindTexture()}E.depthBuffer&&ht(E)}function Ut(E){let v=E.textures;for(let B=0,Z=v.length;B<Z;B++){let ee=v[B];if(f(ee)){let ie=w(E),ce=n.get(ee).__webglTexture;t.bindTexture(ie,ce),M(ie),t.unbindTexture()}}}let Et=[],xn=[];function N(E){if(E.samples>0){if(Je(E)===!1){let v=E.textures,B=E.width,Z=E.height,ee=i.COLOR_BUFFER_BIT,ie=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(E),q=v.length>1;if(q)for(let xe=0;xe<v.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);let $=E.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let xe=0;xe<v.length;xe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=n.get(v[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ye,0)}i.blitFramebuffer(0,0,B,Z,0,0,B,Z,ee,i.NEAREST),l===!0&&(Et.length=0,xn.length=0,Et.push(i.COLOR_ATTACHMENT0+xe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Et.push(ie),xn.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,xn)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Et))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let xe=0;xe<v.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);let ye=n.get(v[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ft(E){return Math.min(s.maxSamples,E.samples)}function Je(E){let v=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function mt(E){let v=a.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function he(E,v){let B=E.colorSpace,Z=E.format,ee=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||B!==Lr&&B!==bi&&(qe.getTransfer(B)===it?(Z!==Cn||ee!==$t)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ie("WebGLTextures: Unsupported texture color space:",B)),v}function Tt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=te,this.setTexture2DArray=ne,this.setTexture3D=fe,this.setTextureCube=Se,this.rebindTextures=yt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Av(i,e){function t(n,s=bi){let r,a=qe.getTransfer(s);if(n===$t)return i.UNSIGNED_BYTE;if(n===tl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===nl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ih)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===sh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===th)return i.BYTE;if(n===nh)return i.SHORT;if(n===ar)return i.UNSIGNED_SHORT;if(n===el)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===Bt)return i.HALF_FLOAT;if(n===rh)return i.ALPHA;if(n===ah)return i.RGB;if(n===Cn)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===Gi)return i.DEPTH_STENCIL;if(n===lr)return i.RED;if(n===il)return i.RED_INTEGER;if(n===Wi)return i.RG;if(n===sl)return i.RG_INTEGER;if(n===rl)return i.RGBA_INTEGER;if(n===ca||n===ha||n===ua||n===da)if(a===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ca)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ca)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===al||n===ol||n===ll||n===cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===al)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hl||n===ul||n===dl||n===fl||n===pl||n===fa||n===ml)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===hl||n===ul)return a===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===fl)return r.COMPRESSED_R11_EAC;if(n===pl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===fa)return r.COMPRESSED_RG11_EAC;if(n===ml)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===gl||n===xl||n===vl||n===_l||n===yl||n===Ml||n===Sl||n===bl||n===wl||n===El||n===Tl||n===Al||n===Cl||n===Rl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===gl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_l)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ml)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===El)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Tl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Al)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Cl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Rl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pl||n===Il||n===Ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Pl)return a===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dl||n===Nl||n===pa||n===Ul)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Dl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Nl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ul)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===or?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Cv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rv=`
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

}`,Ih=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new qr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Xe({vertexShader:Cv,fragmentShader:Rv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new $r(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Lh=class extends Qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,x=null,_=typeof XRWebGLBinding<"u",g=new Ih,f={},M=t.getContextAttributes(),w=null,b=null,C=[],T=[],P=new ue,y=null,A=new Gt;A.viewport=new St;let L=new Gt;L.viewport=new St;let R=[A,L],F=new Zo,W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ge=C[J];return ge===void 0&&(ge=new Ks,C[J]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(J){let ge=C[J];return ge===void 0&&(ge=new Ks,C[J]=ge),ge.getGripSpace()},this.getHand=function(J){let ge=C[J];return ge===void 0&&(ge=new Ks,C[J]=ge),ge.getHandSpace()};function O(J){let ge=T.indexOf(J.inputSource);if(ge===-1)return;let ae=C[ge];ae!==void 0&&(ae.update(J.inputSource,J.frame,c||a),ae.dispatchEvent({type:J.type,data:J.inputSource}))}function V(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",G);for(let J=0;J<C.length;J++){let ge=T[J];ge!==null&&(T[J]=null,C[J].disconnect(ge))}W=null,X=null,g.reset();for(let J in f)delete f[J];e.setRenderTarget(w),p=null,u=null,d=null,s=null,b=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",V),s.addEventListener("inputsourceschange",G),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,De=null,Oe=null;M.depth&&(Oe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=M.stencil?Gi:jn,De=M.stencil?or:Vn);let Ne={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ne),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new xt(u.textureWidth,u.textureHeight,{format:Cn,type:$t,depthTexture:new Si(u.textureWidth,u.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ae={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new xt(p.framebufferWidth,p.framebufferHeight,{format:Cn,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),He.setContext(s),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(J){for(let ge=0;ge<J.removed.length;ge++){let ae=J.removed[ge],De=T.indexOf(ae);De>=0&&(T[De]=null,C[De].disconnect(ae))}for(let ge=0;ge<J.added.length;ge++){let ae=J.added[ge],De=T.indexOf(ae);if(De===-1){for(let Ne=0;Ne<C.length;Ne++)if(Ne>=T.length){T.push(ae),De=Ne;break}else if(T[Ne]===null){T[Ne]=ae,De=Ne;break}if(De===-1)break}let Oe=C[De];Oe&&Oe.connect(ae)}}let te=new I,ne=new I;function fe(J,ge,ae){te.setFromMatrixPosition(ge.matrixWorld),ne.setFromMatrixPosition(ae.matrixWorld);let De=te.distanceTo(ne),Oe=ge.projectionMatrix.elements,Ne=ae.projectionMatrix.elements,wt=Oe[14]/(Oe[10]-1),$e=Oe[14]/(Oe[10]+1),ht=(Oe[9]+1)/Oe[5],yt=(Oe[9]-1)/Oe[5],Ye=(Oe[8]-1)/Oe[0],Ut=(Ne[8]+1)/Ne[0],Et=wt*Ye,xn=wt*Ut,N=De/(-Ye+Ut),Ft=N*-Ye;if(ge.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ft),J.translateZ(N),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Oe[10]===-1)J.projectionMatrix.copy(ge.projectionMatrix),J.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{let Je=wt+N,mt=$e+N,he=Et-Ft,Tt=xn+(De-Ft),E=ht*$e/mt*Je,v=yt*$e/mt*Je;J.projectionMatrix.makePerspective(he,Tt,E,v,Je,mt),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Se(J,ge){ge===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ge.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ge=J.near,ae=J.far;g.texture!==null&&(g.depthNear>0&&(ge=g.depthNear),g.depthFar>0&&(ae=g.depthFar)),F.near=L.near=A.near=ge,F.far=L.far=A.far=ae,(W!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),W=F.near,X=F.far),F.layers.mask=J.layers.mask|6,A.layers.mask=F.layers.mask&-5,L.layers.mask=F.layers.mask&-3;let De=J.parent,Oe=F.cameras;Se(F,De);for(let Ne=0;Ne<Oe.length;Ne++)Se(Oe[Ne],De);Oe.length===2?fe(F,A,L):F.projectionMatrix.copy(A.projectionMatrix),Ae(J,F,De)};function Ae(J,ge,ae){ae===null?J.matrix.copy(ge.matrixWorld):(J.matrix.copy(ae.matrixWorld),J.matrix.invert(),J.matrix.multiply(ge.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ge.projectionMatrix),J.projectionMatrixInverse.copy(ge.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Zs*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(J){return f[J]};let Qe=null;function ct(J,ge){if(h=ge.getViewerPose(c||a),x=ge,h!==null){let ae=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let De=!1;ae.length!==F.cameras.length&&(F.cameras.length=0,De=!0);for(let $e=0;$e<ae.length;$e++){let ht=ae[$e],yt=null;if(p!==null)yt=p.getViewport(ht);else{let Ut=d.getViewSubImage(u,ht);yt=Ut.viewport,$e===0&&(e.setRenderTargetTextures(b,Ut.colorTexture,Ut.depthStencilTexture),e.setRenderTarget(b))}let Ye=R[$e];Ye===void 0&&(Ye=new Gt,Ye.layers.enable($e),Ye.viewport=new St,R[$e]=Ye),Ye.matrix.fromArray(ht.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(ht.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(yt.x,yt.y,yt.width,yt.height),$e===0&&(F.matrix.copy(Ye.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),De===!0&&F.cameras.push(Ye)}let Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let $e=d.getDepthInformation(ae[0]);$e&&$e.isValid&&$e.texture&&g.init($e,s.renderState)}if(Oe&&Oe.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let $e=0;$e<ae.length;$e++){let ht=ae[$e].camera;if(ht){let yt=f[ht];yt||(yt=new qr,f[ht]=yt);let Ye=d.getCameraImage(ht);yt.sourceTexture=Ye}}}}for(let ae=0;ae<C.length;ae++){let De=T[ae],Oe=C[ae];De!==null&&Oe!==void 0&&Oe.update(De,ge,c||a)}Qe&&Qe(J,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),x=null}let He=new nf;He.setAnimationLoop(ct),this.setAnimationLoop=function(J){Qe=J},this.dispose=function(){}}},Pv=new ot,cf=new Fe;cf.set(-1,0,0,0,1,0,0,0,1);function Iv(i,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,ch(i)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,M,w,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),d(g,f)):f.isMeshPhongMaterial?(r(g,f),h(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),u(g,f),f.isMeshPhysicalMaterial&&p(g,f,b)):f.isMeshMatcapMaterial?(r(g,f),x(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),_(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,M,w):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Wt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Wt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let M=e.get(f),w=M.envMap,b=M.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(Pv.makeRotationFromEuler(b)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(cf),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,M,w){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*M,g.scale.value=w*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function d(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,M){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Wt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,f){f.matcap&&(g.matcap.value=f.matcap)}function _(g,f){let M=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lv(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){let b=w.program;n.uniformBlockBinding(M,b)}function c(M,w){let b=s[M.id];b===void 0&&(x(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",g));let C=w.program;n.updateUBOMapping(M,C);let T=e.render.frame;r[M.id]!==T&&(u(M),r[M.id]=T)}function h(M){let w=d();M.__bindingPointIndex=w;let b=i.createBuffer(),C=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Ie("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let w=s[M.id],b=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let T=0,P=b.length;T<P;T++){let y=Array.isArray(b[T])?b[T]:[b[T]];for(let A=0,L=y.length;A<L;A++){let R=y[A];if(p(R,T,A,C)===!0){let F=R.__offset,W=Array.isArray(R.value)?R.value:[R.value],X=0;for(let O=0;O<W.length;O++){let V=W[O],G=_(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,F+X,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):ArrayBuffer.isView(V)?R.__data.set(new V.constructor(V.buffer,V.byteOffset,R.__data.length)):(V.toArray(R.__data,X),X+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,w,b,C){let T=M.value,P=w+"_"+b;if(C[P]===void 0)return typeof T=="number"||typeof T=="boolean"?C[P]=T:ArrayBuffer.isView(T)?C[P]=T.slice():C[P]=T.clone(),!0;{let y=C[P];if(typeof T=="number"||typeof T=="boolean"){if(y!==T)return C[P]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(y.equals(T)===!1)return y.copy(T),!0}}return!1}function x(M){let w=M.uniforms,b=0,C=16;for(let P=0,y=w.length;P<y;P++){let A=Array.isArray(w[P])?w[P]:[w[P]];for(let L=0,R=A.length;L<R;L++){let F=A[L],W=Array.isArray(F.value)?F.value:[F.value];for(let X=0,O=W.length;X<O;X++){let V=W[X],G=_(V),te=b%C,ne=te%G.boundary,fe=te+ne;b+=ne,fe!==0&&C-fe<G.storage&&(b+=C-fe),F.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=b,b+=G.storage}}}let T=b%C;return T>0&&(b+=C-T),M.__size=b,M.__cache={},this}function _(M){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",M),w}function g(M){let w=M.target;w.removeEventListener("dispose",g);let b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function f(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var Dv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ai=null;function Nv(){return ai===null&&(ai=new cs(Dv,16,16,Wi,Bt),ai.name="DFG_LUT",ai.minFilter=Nt,ai.magFilter=Nt,ai.wrapS=Mn,ai.wrapT=Mn,ai.generateMipmaps=!1,ai.needsUpdate=!0),ai}var Wl=class{constructor(e={}){let{canvas:t=Ad(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=$t}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let _=p,g=new Set([rl,sl,il]),f=new Set([$t,Vn,ar,or,tl,nl]),M=new Uint32Array(4),w=new Int32Array(4),b=new I,C=null,T=null,P=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,R=!1,F=null;this._outputColorSpace=Zt;let W=0,X=0,O=null,V=-1,G=null,te=new St,ne=new St,fe=null,Se=new Ee(0),Ae=0,Qe=t.width,ct=t.height,He=1,J=null,ge=null,ae=new St(0,0,Qe,ct),De=new St(0,0,Qe,ct),Oe=!1,Ne=new Qs,wt=!1,$e=!1,ht=new ot,yt=new I,Ye=new St,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Et=!1;function xn(){return O===null?He:1}let N=n;function Ft(S,U){return t.getContext(S,U)}try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jo}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",Be,!1),N===null){let U="webgl2";if(N=Ft(U,S),N===null)throw Ft(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Ie("WebGLRenderer: "+S.message),S}let Je,mt,he,Tt,E,v,B,Z,ee,ie,ce,q,$,xe,ye,oe,se,Ue,Ve,nt,D,re,Y;function ve(){Je=new Vg(N),Je.init(),D=new Av(N,Je),mt=new Dg(N,Je,e,D),he=new Ev(N,Je),mt.reversedDepthBuffer&&u&&he.buffers.depth.setReversed(!0),Tt=new Wg(N),E=new uv,v=new Tv(N,Je,he,E,mt,D,Tt),B=new Hg(L),Z=new Zp(N),re=new Ig(N,Z),ee=new kg(N,Z,Tt,re),ie=new qg(N,ee,Z,re,Tt),Ue=new Xg(N,mt,v),ye=new Ng(E),ce=new hv(L,B,Je,mt,re,ye),q=new Iv(L,E),$=new fv,xe=new _v(Je),se=new Pg(L,B,he,ie,x,l),oe=new wv(L,ie,mt),Y=new Lv(N,Tt,mt,he),Ve=new Lg(N,Je,Tt),nt=new Gg(N,Je,Tt),Tt.programs=ce.programs,L.capabilities=mt,L.extensions=Je,L.properties=E,L.renderLists=$,L.shadowMap=oe,L.state=he,L.info=Tt}ve(),_!==$t&&(A=new Zg(_,t.width,t.height,s,r));let le=new Lh(L,N);this.xr=le,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let S=Je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return He},this.setPixelRatio=function(S){S!==void 0&&(He=S,this.setSize(Qe,ct,!1))},this.getSize=function(S){return S.set(Qe,ct)},this.setSize=function(S,U,k=!0){if(le.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}Qe=S,ct=U,t.width=Math.floor(S*He),t.height=Math.floor(U*He),k===!0&&(t.style.width=S+"px",t.style.height=U+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(Qe*He,ct*He).floor()},this.setDrawingBufferSize=function(S,U,k){Qe=S,ct=U,He=k,t.width=Math.floor(S*k),t.height=Math.floor(U*k),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(_===$t){Ie("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){Re("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(te)},this.getViewport=function(S){return S.copy(ae)},this.setViewport=function(S,U,k,z){S.isVector4?ae.set(S.x,S.y,S.z,S.w):ae.set(S,U,k,z),he.viewport(te.copy(ae).multiplyScalar(He).round())},this.getScissor=function(S){return S.copy(De)},this.setScissor=function(S,U,k,z){S.isVector4?De.set(S.x,S.y,S.z,S.w):De.set(S,U,k,z),he.scissor(ne.copy(De).multiplyScalar(He).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(S){he.setScissorTest(Oe=S)},this.setOpaqueSort=function(S){J=S},this.setTransparentSort=function(S){ge=S},this.getClearColor=function(S){return S.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,k=!0){let z=0;if(S){let H=!1;if(O!==null){let me=O.texture.format;H=g.has(me)}if(H){let me=O.texture.type,Me=f.has(me),pe=se.getClearColor(),be=se.getClearAlpha(),Te=pe.r,ze=pe.g,Ge=pe.b;Me?(M[0]=Te,M[1]=ze,M[2]=Ge,M[3]=be,N.clearBufferuiv(N.COLOR,0,M)):(w[0]=Te,w[1]=ze,w[2]=Ge,w[3]=be,N.clearBufferiv(N.COLOR,0,w))}else z|=N.COLOR_BUFFER_BIT}U&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),F=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),se.dispose(),$.dispose(),xe.dispose(),E.dispose(),B.dispose(),ie.dispose(),re.dispose(),Y.dispose(),ce.dispose(),le.dispose(),le.removeEventListener("sessionstart",lu),le.removeEventListener("sessionend",cu),Qi.stop()};function Q(S){S.preventDefault(),Ur("WebGLRenderer: Context Lost."),R=!0}function we(){Ur("WebGLRenderer: Context Restored."),R=!1;let S=Tt.autoReset,U=oe.enabled,k=oe.autoUpdate,z=oe.needsUpdate,H=oe.type;ve(),Tt.autoReset=S,oe.enabled=U,oe.autoUpdate=k,oe.needsUpdate=z,oe.type=H}function Be(S){Ie("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Rt(S){let U=S.target;U.removeEventListener("dispose",Rt),ut(U)}function ut(S){fi(S),E.remove(S)}function fi(S){let U=E.get(S).programs;U!==void 0&&(U.forEach(function(k){ce.releaseProgram(k)}),S.isShaderMaterial&&ce.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,k,z,H,me){U===null&&(U=Ut);let Me=H.isMesh&&H.matrixWorld.determinant()<0,pe=qf(S,U,k,z,H);he.setMaterial(z,Me);let be=k.index,Te=1;if(z.wireframe===!0){if(be=ee.getWireframeAttribute(k),be===void 0)return;Te=2}let ze=k.drawRange,Ge=k.attributes.position,Ce=ze.start*Te,dt=(ze.start+ze.count)*Te;me!==null&&(Ce=Math.max(Ce,me.start*Te),dt=Math.min(dt,(me.start+me.count)*Te)),be!==null?(Ce=Math.max(Ce,0),dt=Math.min(dt,be.count)):Ge!=null&&(Ce=Math.max(Ce,0),dt=Math.min(dt,Ge.count));let Pt=dt-Ce;if(Pt<0||Pt===1/0)return;re.setup(H,z,pe,k,be);let At,ft=Ve;if(be!==null&&(At=Z.get(be),ft=nt,ft.setIndex(At)),H.isMesh)z.wireframe===!0?(he.setLineWidth(z.wireframeLinewidth*xn()),ft.setMode(N.LINES)):ft.setMode(N.TRIANGLES);else if(H.isLine){let Xt=z.linewidth;Xt===void 0&&(Xt=1),he.setLineWidth(Xt*xn()),H.isLineSegments?ft.setMode(N.LINES):H.isLineLoop?ft.setMode(N.LINE_LOOP):ft.setMode(N.LINE_STRIP)}else H.isPoints?ft.setMode(N.POINTS):H.isSprite&&ft.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))ft.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Xt=H._multiDrawStarts,_e=H._multiDrawCounts,vn=H._multiDrawCount,et=be?Z.get(be).bytesPerElement:1,wn=E.get(z).currentProgram.getUniforms();for(let Zn=0;Zn<vn;Zn++)wn.setValue(N,"_gl_DrawID",Zn),ft.render(Xt[Zn]/et,_e[Zn])}else if(H.isInstancedMesh)ft.renderInstances(Ce,Pt,H.count);else if(k.isInstancedBufferGeometry){let Xt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,_e=Math.min(k.instanceCount,Xt);ft.renderInstances(Ce,Pt,_e)}else ft.render(Ce,Pt)};function Yn(S,U,k){S.transparent===!0&&S.side===un&&S.forceSinglePass===!1?(S.side=Wt,S.needsUpdate=!0,Ia(S,U,k),S.side=Mi,S.needsUpdate=!0,Ia(S,U,k),S.side=un):Ia(S,U,k)}this.compile=function(S,U,k=null){k===null&&(k=S),T=xe.get(k),T.init(U),y.push(T),k.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),S!==k&&S.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),T.setupLights();let z=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let me=H.material;if(me)if(Array.isArray(me))for(let Me=0;Me<me.length;Me++){let pe=me[Me];Yn(pe,k,H),z.add(pe)}else Yn(me,k,H),z.add(me)}),T=y.pop(),z},this.compileAsync=function(S,U,k=null){let z=this.compile(S,U,k);return new Promise(H=>{function me(){if(z.forEach(function(Me){E.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){H(S);return}setTimeout(me,10)}Je.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let dc=null;function Wf(S){dc&&dc(S)}function lu(){Qi.stop()}function cu(){Qi.start()}let Qi=new nf;Qi.setAnimationLoop(Wf),typeof self<"u"&&Qi.setContext(self),this.setAnimationLoop=function(S){dc=S,le.setAnimationLoop(S),S===null?Qi.stop():Qi.start()},le.addEventListener("sessionstart",lu),le.addEventListener("sessionend",cu),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){Ie("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;F!==null&&F.renderStart(S,U);let k=le.enabled===!0&&le.isPresenting===!0,z=A!==null&&(O===null||k)&&A.begin(L,O);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),S.isScene===!0&&S.onBeforeRender(L,S,U,O),T=xe.get(S,y.length),T.init(U),T.state.textureUnits=v.getTextureUnits(),y.push(T),ht.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ne.setFromProjectionMatrix(ht,Fn,U.reversedDepth),$e=this.localClippingEnabled,wt=ye.init(this.clippingPlanes,$e),C=$.get(S,P.length),C.init(),P.push(C),le.enabled===!0&&le.isPresenting===!0){let Me=L.xr.getDepthSensingMesh();Me!==null&&fc(Me,U,-1/0,L.sortObjects)}fc(S,U,0,L.sortObjects),C.finish(),L.sortObjects===!0&&C.sort(J,ge),Et=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Et&&se.addToRenderList(C,S),this.info.render.frame++,wt===!0&&ye.beginShadows();let H=T.state.shadowsArray;if(oe.render(H,S,U),wt===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&A.hasRenderPass())===!1){let Me=C.opaque,pe=C.transmissive;if(T.setupLights(),U.isArrayCamera){let be=U.cameras;if(pe.length>0)for(let Te=0,ze=be.length;Te<ze;Te++){let Ge=be[Te];uu(Me,pe,S,Ge)}Et&&se.render(S);for(let Te=0,ze=be.length;Te<ze;Te++){let Ge=be[Te];hu(C,S,Ge,Ge.viewport)}}else pe.length>0&&uu(Me,pe,S,U),Et&&se.render(S),hu(C,S,U)}O!==null&&X===0&&(v.updateMultisampleRenderTarget(O),v.updateRenderTargetMipmap(O)),z&&A.end(L),S.isScene===!0&&S.onAfterRender(L,S,U),re.resetDefaultState(),V=-1,G=null,y.pop(),y.length>0?(T=y[y.length-1],v.setTextureUnits(T.state.textureUnits),wt===!0&&ye.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?C=P[P.length-1]:C=null,F!==null&&F.renderEnd()};function fc(S,U,k,z){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLightProbeGrid)T.pushLightProbeGrid(S);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ne.intersectsSprite(S)){z&&Ye.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ht);let Me=ie.update(S),pe=S.material;pe.visible&&C.push(S,Me,pe,k,Ye.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ne.intersectsObject(S))){let Me=ie.update(S),pe=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ye.copy(S.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ye.copy(Me.boundingSphere.center)),Ye.applyMatrix4(S.matrixWorld).applyMatrix4(ht)),Array.isArray(pe)){let be=Me.groups;for(let Te=0,ze=be.length;Te<ze;Te++){let Ge=be[Te],Ce=pe[Ge.materialIndex];Ce&&Ce.visible&&C.push(S,Me,Ce,k,Ye.z,Ge)}}else pe.visible&&C.push(S,Me,pe,k,Ye.z,null)}}let me=S.children;for(let Me=0,pe=me.length;Me<pe;Me++)fc(me[Me],U,k,z)}function hu(S,U,k,z){let{opaque:H,transmissive:me,transparent:Me}=S;T.setupLightsView(k),wt===!0&&ye.setGlobalState(L.clippingPlanes,k),z&&he.viewport(te.copy(z)),H.length>0&&Pa(H,U,k),me.length>0&&Pa(me,U,k),Me.length>0&&Pa(Me,U,k),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function uu(S,U,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){let Ce=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new xt(1,1,{generateMipmaps:!0,type:Ce?Bt:$t,minFilter:ki,samples:Math.max(4,mt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}let me=T.state.transmissionRenderTarget[z.id],Me=z.viewport||te;me.setSize(Me.z*L.transmissionResolutionScale,Me.w*L.transmissionResolutionScale);let pe=L.getRenderTarget(),be=L.getActiveCubeFace(),Te=L.getActiveMipmapLevel();L.setRenderTarget(me),L.getClearColor(Se),Ae=L.getClearAlpha(),Ae<1&&L.setClearColor(16777215,.5),L.clear(),Et&&se.render(k);let ze=L.toneMapping;L.toneMapping=Hn;let Ge=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),wt===!0&&ye.setGlobalState(L.clippingPlanes,z),Pa(S,k,z),v.updateMultisampleRenderTarget(me),v.updateRenderTargetMipmap(me),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let dt=0,Pt=U.length;dt<Pt;dt++){let At=U[dt],{object:ft,geometry:Xt,material:_e,group:vn}=At;if(_e.side===un&&ft.layers.test(z.layers)){let et=_e.side;_e.side=Wt,_e.needsUpdate=!0,du(ft,k,z,Xt,_e,vn),_e.side=et,_e.needsUpdate=!0,Ce=!0}}Ce===!0&&(v.updateMultisampleRenderTarget(me),v.updateRenderTargetMipmap(me))}L.setRenderTarget(pe,be,Te),L.setClearColor(Se,Ae),Ge!==void 0&&(z.viewport=Ge),L.toneMapping=ze}function Pa(S,U,k){let z=U.isScene===!0?U.overrideMaterial:null;for(let H=0,me=S.length;H<me;H++){let Me=S[H],{object:pe,geometry:be,group:Te}=Me,ze=Me.material;ze.allowOverride===!0&&z!==null&&(ze=z),pe.layers.test(k.layers)&&du(pe,U,k,be,ze,Te)}}function du(S,U,k,z,H,me){S.onBeforeRender(L,U,k,z,H,me),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(L,U,k,z,S,me),H.transparent===!0&&H.side===un&&H.forceSinglePass===!1?(H.side=Wt,H.needsUpdate=!0,L.renderBufferDirect(k,U,z,H,S,me),H.side=Mi,H.needsUpdate=!0,L.renderBufferDirect(k,U,z,H,S,me),H.side=un):L.renderBufferDirect(k,U,z,H,S,me),S.onAfterRender(L,U,k,z,H,me)}function Ia(S,U,k){U.isScene!==!0&&(U=Ut);let z=E.get(S),H=T.state.lights,me=T.state.shadowsArray,Me=H.state.version,pe=ce.getParameters(S,H.state,me,U,k,T.state.lightProbeGridArray),be=ce.getProgramCacheKey(pe),Te=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;let ze=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=B.get(S.envMap||z.environment,ze),z.envMapRotation=z.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Te===void 0&&(S.addEventListener("dispose",Rt),Te=new Map,z.programs=Te);let Ge=Te.get(be);if(Ge!==void 0){if(z.currentProgram===Ge&&z.lightsStateVersion===Me)return pu(S,pe),Ge}else pe.uniforms=ce.getUniforms(S),F!==null&&S.isNodeMaterial&&F.build(S,k,pe),S.onBeforeCompile(pe,L),Ge=ce.acquireProgram(pe,be),Te.set(be,Ge),z.uniforms=pe.uniforms;let Ce=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ce.clippingPlanes=ye.uniform),pu(S,pe),z.needsLights=Zf(S),z.lightsStateVersion=Me,z.needsLights&&(Ce.ambientLightColor.value=H.state.ambient,Ce.lightProbe.value=H.state.probe,Ce.directionalLights.value=H.state.directional,Ce.directionalLightShadows.value=H.state.directionalShadow,Ce.spotLights.value=H.state.spot,Ce.spotLightShadows.value=H.state.spotShadow,Ce.rectAreaLights.value=H.state.rectArea,Ce.ltc_1.value=H.state.rectAreaLTC1,Ce.ltc_2.value=H.state.rectAreaLTC2,Ce.pointLights.value=H.state.point,Ce.pointLightShadows.value=H.state.pointShadow,Ce.hemisphereLights.value=H.state.hemi,Ce.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ce.spotLightMatrix.value=H.state.spotLightMatrix,Ce.spotLightMap.value=H.state.spotLightMap,Ce.pointShadowMatrix.value=H.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=Ge,z.uniformsList=null,Ge}function fu(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=ur.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function pu(S,U){let k=E.get(S);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function Xf(S,U){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;b.setFromMatrixPosition(U.matrixWorld);for(let k=0,z=S.length;k<z;k++){let H=S[k];if(H.texture!==null&&H.boundingBox.containsPoint(b))return H}return null}function qf(S,U,k,z,H){U.isScene!==!0&&(U=Ut),v.resetTextureUnits();let me=U.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,pe=O===null?L.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:qe.workingColorSpace,be=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Te=B.get(z.envMap||Me,be),ze=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ge=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ce=!!k.morphAttributes.position,dt=!!k.morphAttributes.normal,Pt=!!k.morphAttributes.color,At=Hn;z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(At=L.toneMapping);let ft=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Xt=ft!==void 0?ft.length:0,_e=E.get(z),vn=T.state.lights;if(wt===!0&&($e===!0||S!==G)){let gt=S===G&&z.id===V;ye.setState(z,S,gt)}let et=!1;z.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==vn.state.version||_e.outputColorSpace!==pe||H.isBatchedMesh&&_e.batching===!1||!H.isBatchedMesh&&_e.batching===!0||H.isBatchedMesh&&_e.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&_e.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&_e.instancing===!1||!H.isInstancedMesh&&_e.instancing===!0||H.isSkinnedMesh&&_e.skinning===!1||!H.isSkinnedMesh&&_e.skinning===!0||H.isInstancedMesh&&_e.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&_e.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&_e.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&_e.instancingMorph===!1&&H.morphTexture!==null||_e.envMap!==Te||z.fog===!0&&_e.fog!==me||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==ye.numPlanes||_e.numIntersection!==ye.numIntersection)||_e.vertexAlphas!==ze||_e.vertexTangents!==Ge||_e.morphTargets!==Ce||_e.morphNormals!==dt||_e.morphColors!==Pt||_e.toneMapping!==At||_e.morphTargetsCount!==Xt||!!_e.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,_e.__version=z.version);let wn=_e.currentProgram;et===!0&&(wn=Ia(z,U,H),F&&z.isNodeMaterial&&F.onUpdateProgram(z,wn,_e));let Zn=!1,Ci=!1,Es=!1,pt=wn.getUniforms(),It=_e.uniforms;if(he.useProgram(wn.program)&&(Zn=!0,Ci=!0,Es=!0),z.id!==V&&(V=z.id,Ci=!0),_e.needsLights){let gt=Xf(T.state.lightProbeGridArray,H);_e.lightProbeGrid!==gt&&(_e.lightProbeGrid=gt,Ci=!0)}if(Zn||G!==S){he.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),pt.setValue(N,"projectionMatrix",S.projectionMatrix),pt.setValue(N,"viewMatrix",S.matrixWorldInverse);let Pi=pt.map.cameraPosition;Pi!==void 0&&Pi.setValue(N,yt.setFromMatrixPosition(S.matrixWorld)),mt.logarithmicDepthBuffer&&pt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&pt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),G!==S&&(G=S,Ci=!0,Es=!0)}if(_e.needsLights&&(vn.state.directionalShadowMap.length>0&&pt.setValue(N,"directionalShadowMap",vn.state.directionalShadowMap,v),vn.state.spotShadowMap.length>0&&pt.setValue(N,"spotShadowMap",vn.state.spotShadowMap,v),vn.state.pointShadowMap.length>0&&pt.setValue(N,"pointShadowMap",vn.state.pointShadowMap,v)),H.isSkinnedMesh){pt.setOptional(N,H,"bindMatrix"),pt.setOptional(N,H,"bindMatrixInverse");let gt=H.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),pt.setValue(N,"boneTexture",gt.boneTexture,v))}H.isBatchedMesh&&(pt.setOptional(N,H,"batchingTexture"),pt.setValue(N,"batchingTexture",H._matricesTexture,v),pt.setOptional(N,H,"batchingIdTexture"),pt.setValue(N,"batchingIdTexture",H._indirectTexture,v),pt.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&pt.setValue(N,"batchingColorTexture",H._colorsTexture,v));let Ri=k.morphAttributes;if((Ri.position!==void 0||Ri.normal!==void 0||Ri.color!==void 0)&&Ue.update(H,k,wn),(Ci||_e.receiveShadow!==H.receiveShadow)&&(_e.receiveShadow=H.receiveShadow,pt.setValue(N,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(It.envMapIntensity.value=U.environmentIntensity),It.dfgLUT!==void 0&&(It.dfgLUT.value=Nv()),Ci){if(pt.setValue(N,"toneMappingExposure",L.toneMappingExposure),_e.needsLights&&Yf(It,Es),me&&z.fog===!0&&q.refreshFogUniforms(It,me),q.refreshMaterialUniforms(It,z,He,ct,T.state.transmissionRenderTarget[S.id]),_e.needsLights&&_e.lightProbeGrid){let gt=_e.lightProbeGrid;It.probesSH.value=gt.texture,It.probesMin.value.copy(gt.boundingBox.min),It.probesMax.value.copy(gt.boundingBox.max),It.probesResolution.value.copy(gt.resolution)}ur.upload(N,fu(_e),It,v)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ur.upload(N,fu(_e),It,v),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&pt.setValue(N,"center",H.center),pt.setValue(N,"modelViewMatrix",H.modelViewMatrix),pt.setValue(N,"normalMatrix",H.normalMatrix),pt.setValue(N,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){let gt=z.uniformsGroups;for(let Pi=0,Ts=gt.length;Pi<Ts;Pi++){let mu=gt[Pi];Y.update(mu,wn),Y.bind(mu,wn)}}return wn}function Yf(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function Zf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(S,U,k){let z=E.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),E.get(S.texture).__webglTexture=U,E.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){let k=E.get(S);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};let $f=N.createFramebuffer();this.setRenderTarget=function(S,U=0,k=0){O=S,W=U,X=k;let z=null,H=!1,me=!1;if(S){let pe=E.get(S);if(pe.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(N.FRAMEBUFFER,pe.__webglFramebuffer),te.copy(S.viewport),ne.copy(S.scissor),fe=S.scissorTest,he.viewport(te),he.scissor(ne),he.setScissorTest(fe),V=-1;return}else if(pe.__webglFramebuffer===void 0)v.setupRenderTarget(S);else if(pe.__hasExternalTextures)v.rebindTextures(S,E.get(S.texture).__webglTexture,E.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let ze=S.depthTexture;if(pe.__boundDepthTexture!==ze){if(ze!==null&&E.has(ze)&&(S.width!==ze.image.width||S.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(S)}}let be=S.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(me=!0);let Te=E.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Te[U])?z=Te[U][k]:z=Te[U],H=!0):S.samples>0&&v.useMultisampledRTT(S)===!1?z=E.get(S).__webglMultisampledFramebuffer:Array.isArray(Te)?z=Te[k]:z=Te,te.copy(S.viewport),ne.copy(S.scissor),fe=S.scissorTest}else te.copy(ae).multiplyScalar(He).floor(),ne.copy(De).multiplyScalar(He).floor(),fe=Oe;if(k!==0&&(z=$f),he.bindFramebuffer(N.FRAMEBUFFER,z)&&he.drawBuffers(S,z),he.viewport(te),he.scissor(ne),he.setScissorTest(fe),H){let pe=E.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,k)}else if(me){let pe=U;for(let be=0;be<S.textures.length;be++){let Te=E.get(S.textures[be]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+be,Te.__webglTexture,k,pe)}}else if(S!==null&&k!==0){let pe=E.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pe.__webglTexture,k)}V=-1},this.readRenderTargetPixels=function(S,U,k,z,H,me,Me,pe=0){if(!(S&&S.isWebGLRenderTarget)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=E.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be){he.bindFramebuffer(N.FRAMEBUFFER,be);try{let Te=S.textures[pe],ze=Te.format,Ge=Te.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!mt.textureFormatReadable(ze)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!mt.textureTypeReadable(Ge)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-z&&k>=0&&k<=S.height-H&&N.readPixels(U,k,z,H,D.convert(ze),D.convert(Ge),me)}finally{let Te=O!==null?E.get(O).__webglFramebuffer:null;he.bindFramebuffer(N.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(S,U,k,z,H,me,Me,pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=E.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be)if(U>=0&&U<=S.width-z&&k>=0&&k<=S.height-H){he.bindFramebuffer(N.FRAMEBUFFER,be);let Te=S.textures[pe],ze=Te.format,Ge=Te.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!mt.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!mt.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ce=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ce),N.bufferData(N.PIXEL_PACK_BUFFER,me.byteLength,N.STREAM_READ),N.readPixels(U,k,z,H,D.convert(ze),D.convert(Ge),0);let dt=O!==null?E.get(O).__webglFramebuffer:null;he.bindFramebuffer(N.FRAMEBUFFER,dt);let Pt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Rd(N,Pt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ce),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,me),N.deleteBuffer(Ce),N.deleteSync(Pt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,k=0){let z=Math.pow(2,-k),H=Math.floor(S.image.width*z),me=Math.floor(S.image.height*z),Me=U!==null?U.x:0,pe=U!==null?U.y:0;v.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,k,0,0,Me,pe,H,me),he.unbindTexture()};let Jf=N.createFramebuffer(),Kf=N.createFramebuffer();this.copyTextureToTexture=function(S,U,k=null,z=null,H=0,me=0){let Me,pe,be,Te,ze,Ge,Ce,dt,Pt,At=S.isCompressedTexture?S.mipmaps[me]:S.image;if(k!==null)Me=k.max.x-k.min.x,pe=k.max.y-k.min.y,be=k.isBox3?k.max.z-k.min.z:1,Te=k.min.x,ze=k.min.y,Ge=k.isBox3?k.min.z:0;else{let It=Math.pow(2,-H);Me=Math.floor(At.width*It),pe=Math.floor(At.height*It),S.isDataArrayTexture?be=At.depth:S.isData3DTexture?be=Math.floor(At.depth*It):be=1,Te=0,ze=0,Ge=0}z!==null?(Ce=z.x,dt=z.y,Pt=z.z):(Ce=0,dt=0,Pt=0);let ft=D.convert(U.format),Xt=D.convert(U.type),_e;U.isData3DTexture?(v.setTexture3D(U,0),_e=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(v.setTexture2DArray(U,0),_e=N.TEXTURE_2D_ARRAY):(v.setTexture2D(U,0),_e=N.TEXTURE_2D),he.activeTexture(N.TEXTURE0),he.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),he.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),he.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);let vn=he.getParameter(N.UNPACK_ROW_LENGTH),et=he.getParameter(N.UNPACK_IMAGE_HEIGHT),wn=he.getParameter(N.UNPACK_SKIP_PIXELS),Zn=he.getParameter(N.UNPACK_SKIP_ROWS),Ci=he.getParameter(N.UNPACK_SKIP_IMAGES);he.pixelStorei(N.UNPACK_ROW_LENGTH,At.width),he.pixelStorei(N.UNPACK_IMAGE_HEIGHT,At.height),he.pixelStorei(N.UNPACK_SKIP_PIXELS,Te),he.pixelStorei(N.UNPACK_SKIP_ROWS,ze),he.pixelStorei(N.UNPACK_SKIP_IMAGES,Ge);let Es=S.isDataArrayTexture||S.isData3DTexture,pt=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){let It=E.get(S),Ri=E.get(U),gt=E.get(It.__renderTarget),Pi=E.get(Ri.__renderTarget);he.bindFramebuffer(N.READ_FRAMEBUFFER,gt.__webglFramebuffer),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,Pi.__webglFramebuffer);for(let Ts=0;Ts<be;Ts++)Es&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,E.get(S).__webglTexture,H,Ge+Ts),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,E.get(U).__webglTexture,me,Pt+Ts)),N.blitFramebuffer(Te,ze,Me,pe,Ce,dt,Me,pe,N.DEPTH_BUFFER_BIT,N.NEAREST);he.bindFramebuffer(N.READ_FRAMEBUFFER,null),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||S.isRenderTargetTexture||E.has(S)){let It=E.get(S),Ri=E.get(U);he.bindFramebuffer(N.READ_FRAMEBUFFER,Jf),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,Kf);for(let gt=0;gt<be;gt++)Es?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,It.__webglTexture,H,Ge+gt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,It.__webglTexture,H),pt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ri.__webglTexture,me,Pt+gt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ri.__webglTexture,me),H!==0?N.blitFramebuffer(Te,ze,Me,pe,Ce,dt,Me,pe,N.COLOR_BUFFER_BIT,N.NEAREST):pt?N.copyTexSubImage3D(_e,me,Ce,dt,Pt+gt,Te,ze,Me,pe):N.copyTexSubImage2D(_e,me,Ce,dt,Te,ze,Me,pe);he.bindFramebuffer(N.READ_FRAMEBUFFER,null),he.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else pt?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(_e,me,Ce,dt,Pt,Me,pe,be,ft,Xt,At.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(_e,me,Ce,dt,Pt,Me,pe,be,ft,At.data):N.texSubImage3D(_e,me,Ce,dt,Pt,Me,pe,be,ft,Xt,At):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,me,Ce,dt,Me,pe,ft,Xt,At.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,me,Ce,dt,At.width,At.height,ft,At.data):N.texSubImage2D(N.TEXTURE_2D,me,Ce,dt,Me,pe,ft,Xt,At);he.pixelStorei(N.UNPACK_ROW_LENGTH,vn),he.pixelStorei(N.UNPACK_IMAGE_HEIGHT,et),he.pixelStorei(N.UNPACK_SKIP_PIXELS,wn),he.pixelStorei(N.UNPACK_SKIP_ROWS,Zn),he.pixelStorei(N.UNPACK_SKIP_IMAGES,Ci),me===0&&U.generateMipmaps&&N.generateMipmap(_e),he.unbindTexture()},this.initRenderTarget=function(S){E.get(S).__webglFramebuffer===void 0&&v.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?v.setTextureCube(S,0):S.isData3DTexture?v.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?v.setTexture2DArray(S,0):v.setTexture2D(S,0),he.unbindTexture()},this.resetState=function(){W=0,X=0,O=null,he.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var li={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var on=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Fv=new ds(-1,1,1,-1,0,1),Dh=class extends je{constructor(){super(),this.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new We([0,2,0,0,2,0],2))}},Ov=new Dh,kn=class{constructor(e){this._mesh=new tt(Ov,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Fv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var fr=class extends on{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Xe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Rn.clone(e.uniforms),this.material=new Xe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new kn(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var va=class extends on{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Yl=class extends on{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Zl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ue);this._width=n.width,this._height=n.height,t=new xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Bt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new fr(li),this.copyPass.material.blending=dn,this.timer=new fs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}va!==void 0&&(a instanceof va?n=!0:a instanceof Yl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ue);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var $l=class extends on{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ee}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var hf={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ee(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var pr=class i extends on{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ue(e.x,e.y):new ue(256,256),this.clearColor=new Ee(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new xt(r,a,{type:Bt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new xt(r,a,{type:Bt});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new xt(r,a,{type:Bt});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=hf;this.highPassUniforms=Rn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Xe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ue(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Rn.clone(li.uniforms),this.blendMaterial=new Xe({uniforms:this.copyUniforms,vertexShader:li.vertexShader,fragmentShader:li.fragmentShader,premultipliedAlpha:!0,blending:st,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ee,this._oldClearAlpha=1,this._basic=new an,this._fsQuad=new kn(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ue(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(n*n))/n);return new Xe({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ue(.5,.5)},direction:{value:new ue(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}};pr.BlurDirectionX=new ue(1,0);pr.BlurDirectionY=new ue(0,1);var Jl={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

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

		}`};var Kl=class extends on{constructor(e=.96){super(),this.uniforms=Rn.clone(Jl.uniforms),this.damp=e,this.compFsMaterial=new Xe({uniforms:this.uniforms,vertexShader:Jl.vertexShader,fragmentShader:Jl.fragmentShader}),this.copyFsMaterial=new Xe({uniforms:Rn.clone(li.uniforms),vertexShader:li.vertexShader,fragmentShader:li.fragmentShader,blending:dn,depthTest:!1,depthWrite:!1}),this._textureComp=new xt(window.innerWidth,window.innerHeight,{magFilter:Lt,type:Bt}),this._textureOld=new xt(window.innerWidth,window.innerHeight,{magFilter:Lt,type:Bt}),this._compFsQuad=new kn(this.compFsMaterial),this._copyFsQuad=new kn(this.copyFsMaterial)}get damp(){return this.uniforms.damp.value}set damp(e){this.uniforms.damp.value=e}render(e,t,n){this.uniforms.tOld.value=this._textureOld.texture,this.uniforms.tNew.value=n.texture,e.setRenderTarget(this._textureComp),this._compFsQuad.render(e),this._copyFsQuad.material.uniforms.tDiffuse.value=this._textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this._copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._copyFsQuad.render(e));let s=this._textureOld;this._textureOld=this._textureComp,this._textureComp=s}setSize(e,t){this._textureComp.setSize(e,t),this._textureOld.setSize(e,t)}dispose(){this._textureComp.dispose(),this._textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this._compFsQuad.dispose(),this._copyFsQuad.dispose()}};var _a={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var jl=class extends on{constructor(){super(),this.isOutputPass=!0,this.uniforms=Rn.clone(_a.uniforms),this.material=new tr({name:_a.name,uniforms:this.uniforms,vertexShader:_a.vertexShader,fragmentShader:_a.fragmentShader}),this._fsQuad=new kn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===it&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ta?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===na?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ia?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ps?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ra?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===aa?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===sa&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var rt=i=>document.querySelector(i),Bv=i=>[...document.querySelectorAll(i)],bt=zl.clamp,Xn=zl.lerp,Qt=(i,e,t,n)=>Xn(i,e,1-Math.exp(-t*n)),vt=(i,e,t)=>{let n=bt((t-i)/Math.max(1e-6,e-i),0,1);return n*n*(3-2*n)},Ji=(i,e,t)=>{let n=bt((t-i)/Math.max(1e-6,e-i),0,1);return n*n*n*(n*(n*6-15)+10)},j={gate:rt("#gate"),enter:rt("#enterBtn"),silent:rt("#silentBtn"),replay:rt("#replayBtn"),file:rt("#fileInput"),fileLabel:rt("#fileLabel"),hint:rt("#gateHint"),ritualCaption:rt("#ritualCaption"),ritualIndex:rt("#ritualIndex"),ritualMain:rt("#ritualMain"),ritualSub:rt("#ritualSub"),phaseNumber:rt("#phaseNumber"),phaseName:rt("#phaseName"),phaseSub:rt("#phaseSub"),sideTicks:Bv("#sideIndex i"),coreState:rt("#coreState"),fieldState:rt("#fieldState"),depth:rt("#depthValue"),coord:rt("#coordValue"),index:rt("#indexValue"),signal:rt("#signalState"),mode:rt("#modeState"),audioState:rt("#audioState"),timeNow:rt("#timeNow"),timeTotal:rt("#timeTotal"),low:rt("#bandLow"),mid:rt("#bandMid"),high:rt("#bandHigh"),cursor:rt("#cursor"),message:rt("#message"),audio:rt("#audio"),unsupported:rt("#unsupported")},pf=matchMedia("(pointer: coarse)").matches,_t=pf||innerWidth<820,Bh=matchMedia("(prefers-reduced-motion: reduce)").matches,Ql=new URLSearchParams(location.search),mf=window.__NINTH_TIDE_PREVIEW__,_r=Ql.has("preview")||mf!==void 0;function zv(i){let e=i>>>0,t=function(){let n=e=e+1831565813>>>0;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296};return t.getState=()=>e,t.setState=n=>{if(!Number.isInteger(n)||n<0||n>4294967295)throw new RangeError("Ninth Tide random state must be a uint32.");e=n>>>0},t}var Jh=zv(9545716),Pe=(i=0,e=1)=>i+(e-i)*Jh(),ui=i=>i-Math.floor(i);function zh(i){if(!Number.isFinite(i))return"00:00";let e=Math.floor(i/60),t=Math.floor(i%60);return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function mn(i,e=1700){j.message.textContent=i,j.message.classList.add("show"),clearTimeout(mn.timer),uc||(mn.timer=setTimeout(()=>j.message.classList.remove("show"),e))}var Ma=[["I","\u65E0\u6708\u6D4B\u6DF1","MOONLESS SOUNDING"],["II","\u76D0\u661F\u4E0B\u6C89","SALT STARS SINKING"],["III","\u77F3\u82F1\u68A6\u8BED","QUARTZ DREAMS"],["IV","\u95E8\u540E\u4E4B\u6D77","THE SEA BEHIND THE DOOR"],["V","\u672A\u8BDE\u4E4B\u57CE","THE UNBORN CITY"],["VI","\u9006\u6F6E\u9057\u9AB8","RELICS AGAINST THE TIDE"],["VII","\u9ED1\u6C34\u5BC6\u5377","THE BLACKWATER CODEX"],["VIII","\u6DF1\u6E0A\u56DE\u89C6","THE ABYSS LOOKS BACK"],["IX","\u65E0\u5CB8\u957F\u591C","THE SHORELESS NIGHT"]],Gn=[0,48.9709,75.0469,103.0966,145.2408,183.8092,224.8853,260.226,330.0484,354.504],uf=Gn[Gn.length-1],Hv=2.85,ys=[{deep:67081,fog:201753,glow:6806990,accent:14940393,secondary:1860720},{deep:67341,fog:268072,glow:5553888,accent:14021375,secondary:2640515},{deep:198665,fog:1057052,glow:9296047,accent:15986121,secondary:4944722},{deep:197899,fog:1381414,glow:9676287,accent:15198975,secondary:5326978},{deep:329481,fog:2170130,glow:14207097,accent:16773820,secondary:6705956},{deep:67592,fog:598303,glow:6543552,accent:14285036,secondary:2649445},{deep:328459,fog:1970728,glow:12746467,accent:15849720,secondary:7093116},{deep:67338,fog:794144,glow:8640956,accent:15267292,secondary:4287325},{deep:1029,fog:595993,glow:11135177,accent:16773575,secondary:5798244}].map(i=>Object.fromEntries(Object.entries(i).map(([e,t])=>[e,new Ee(t)]))),Ze;try{Ze=new Wl({antialias:!_t,powerPreference:"high-performance",alpha:!1,preserveDrawingBuffer:_r})}catch(i){throw console.error(i),j.unsupported.style.display="grid",i}Ze.setSize(innerWidth,innerHeight);Ze.setPixelRatio(Math.min(devicePixelRatio,_t?1.15:1.6));Ze.outputColorSpace=Zt;Ze.toneMapping=ps;Ze.toneMappingExposure=.05;Ze.setClearColor(772,1);rt("#scene").appendChild(Ze.domElement);var ln=new Br;ln.background=new Ee(772);ln.fog=new Or(201496,.021);var tn=new Gt(48,innerWidth/innerHeight,.08,85);tn.position.set(0,.75,13.6);var nn=new hn;ln.add(nn);var xr=new fs;xr.connect(document);var Wn=new ue,Yi=new ue,Sa=new sr,Hh=new I,fn=64,qn=new Uint8Array(fn),ji=new cs(qn,fn,1,lr,$t);ji.magFilter=Nt;ji.minFilter=Nt;ji.wrapS=Mn;ji.wrapT=Mn;ji.needsUpdate=!0;var m={entered:!1,calibrated:!1,ceremonyTime:-1,ceremonyCue:0,ritual:0,ignite:0,lightLevel:0,shutdown:0,ending:!1,ended:!1,endingCue:0,previewMode:"",previewSection:4,audioReady:!1,playing:!1,muted:!1,audioFailed:!1,archiveOpen:0,archiveOpenTarget:0,pulseAge:99,pulseStrength:0,pulseOrigin:new ue(0,0),pulseSourceY:.35,pulseCooldown:0,low:0,mid:0,high:0,rms:0,energy:0,transient:0,previousEnergy:0,tideFloat:0,tideIndex:0,transitionFrom:0,pendingTide:-1,phaseLocal:0,phaseTransition:0,transitionClock:99,transitionSwitched:!1,pulseMode:0,pulseSerial:0,pulseScreen:new ue(.5,.5),dive:.12,diveTarget:.12,yaw:0,yawTarget:0,pitch:.07,pitchTarget:.07,dragging:!1,dragDistance:0,lastPointerX:0,lastPointerY:0,activeSeconds:0,syntheticPhase:0,coreHovered:!1},K={time:{value:0},low:{value:0},mid:{value:0},high:{value:0},rms:{value:0},energy:{value:0},transient:{value:0},ritual:{value:0},ignite:{value:0},shutdown:{value:0},pulseAge:{value:99},pulseStrength:{value:0},pulseOrigin:{value:m.pulseOrigin},pulseScreen:{value:m.pulseScreen},open:{value:0},tide:{value:0},section:{value:0},sectionLocal:{value:0},phaseTransition:{value:0},sonarMode:{value:0},pixelRatio:{value:Ze.getPixelRatio()},resolution:{value:new ue(innerWidth*Ze.getPixelRatio(),innerHeight*Ze.getPixelRatio())},spectrum:{value:ji},deepColor:{value:ys[0].deep.clone()},fogColor:{value:ys[0].fog.clone()},glowColor:{value:ys[0].glow.clone()},accentColor:{value:ys[0].accent.clone()},secondaryColor:{value:ys[0].secondary.clone()}},cn=(i={})=>({...K,...i});function Vv(){let i=document.createElement("canvas");i.width=i.height=256;let e=i.getContext("2d"),t=e.createRadialGradient(128,128,0,128,128,128);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.07,"rgba(210,255,246,.74)"),t.addColorStop(.28,"rgba(88,224,206,.22)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,256,256);let n=new Xr(i);return n.colorSpace=Zt,n}var gf=Vv(),kv=new Xe({side:Wt,depthWrite:!1,uniforms:cn(),vertexShader:`
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
  `}),Gv=new tt(new us(42,64,36),kv);nn.add(Gv);var Wv=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
  `}),Ra=new tt(new Yr(16,256),Wv);Ra.rotation.x=-Math.PI/2;Ra.position.y=-2.36;Ra.renderOrder=1;nn.add(Ra);var ec=new nr({color:67595,roughness:.22,metalness:.9,emissive:202520,emissiveIntensity:.12,transparent:!0,opacity:.78}),xf=new tt(new hs(4.25,4.7,.22,128),ec);xf.position.y=-2.49;nn.add(xf);var Kh=[];for(let i of[2.65,3.55,4.55]){let e=new tt(new ri(i,i===4.55?.012:.006,5,256),new an({color:6543559,transparent:!0,opacity:.11,blending:st,depthWrite:!1}));e.rotation.x=Math.PI/2,e.position.y=-2.34,Kh.push(e),nn.add(e)}function Xv(){let i=_t?45:81,e=[];for(let t=0;t<i;t++){let n;t<9?n=0:t<Math.floor(i*.45)?n=1:n=2;let s=n===0?0:n===1?9:Math.floor(i*.45),r=n===0?9:n===1?Math.floor(i*.45)-9:i-Math.floor(i*.45),a=(t-s)/Math.max(1,r)*Math.PI*2+Pe(-.16,.16),o=Math.atan2(Math.sin(a-Math.PI/2),Math.cos(a-Math.PI/2)),l=n===0?.34:.54;Math.abs(o)<l&&(a+=(o>=0?1:-1)*(l-Math.abs(o)+Pe(.07,.24)));let c=n===0?Pe(5.15,6.2):n===1?Pe(8,13.8):Pe(14.5,24.5),h=Pe(n===2?.65:.5,n===2?1.8:1.35),d=Pe(.36,n===2?1.16:.86),u=Pe(n===0?1.2:1.7,n===2?7:5.1),p=new I(Math.cos(a)*c,-2.31+u*.5+Pe(-.08,n===2?.72:.34),Math.sin(a)*c),x=-a+Math.PI/2+Pe(-.18,.18),_=bt((c-4.9)/20.2,0,1),g=ui((t*.61803398875+n*.13)*.97);e.push({center:p,rotation:x,width:h,height:u,depth:d,order:_,band:g,seed:Pe(0,1e3),tier:n})}return e}var vf=Xv();function _f(i,e,t,n){let s=Math.cos(i.rotation),r=Math.sin(i.rotation);return new I(i.center.x+e*s-n*r,i.center.y+t,i.center.z+e*r+n*s)}function qv(i){let e=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],t=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],n=i.length*t.length*2,s=new Float32Array(n*3),r=new Float32Array(n*3),a=new Float32Array(n),o=new Float32Array(n),l=new Float32Array(n),c=0;for(let d of i)for(let u of t)for(let p of u){let x=e[p],_=_f(d,x[0]*d.width,x[1]*d.height,x[2]*d.depth);s[c*3]=_.x,s[c*3+1]=_.y,s[c*3+2]=_.z,r[c*3]=d.center.x,r[c*3+1]=d.center.y,r[c*3+2]=d.center.z,a[c]=d.band,o[c]=d.order,l[c]=d.seed,c++}let h=new je;return h.setAttribute("position",new Le(s,3)),h.setAttribute("aCenter",new Le(r,3)),h.setAttribute("aBand",new Le(a,1)),h.setAttribute("aOrder",new Le(o,1)),h.setAttribute("aSeed",new Le(l,1)),h}var Yv=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
  `}),Zv=new zn(qv(vf),Yv);nn.add(Zv);function $v(i){let e=_t?72:156,t=i.length*e,n=new Float32Array(t*3),s=new Float32Array(t*3),r=new Float32Array(t),a=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t),c=0;for(let u=0;u<i.length;u++){let p=i[u];for(let x=0;x<e;x++){let _=ui((x+1)*.754877666+p.seed*.013),g=ui((x+1)*.569840296+p.seed*.021),f=ui((x+1)*.438579021+p.seed*.034),M=(_-.5)*p.width*.82,w=(g-.5)*p.height*.88,b=(f-.5)*p.depth*.78,C=_f(p,M,w,b);n[c*3]=C.x,n[c*3+1]=C.y,n[c*3+2]=C.z,s[c*3]=p.center.x,s[c*3+1]=p.center.y,s[c*3+2]=p.center.z,r[c]=bt(p.band+(_-.5)*.035,0,1),a[c]=p.order,o[c]=ui(p.seed*.17+x*.6180339),l[c]=Pe(.72,2.25),c++}}let h=new je;h.setAttribute("position",new Le(n,3)),h.setAttribute("aCenter",new Le(s,3)),h.setAttribute("aBand",new Le(r,1)),h.setAttribute("aOrder",new Le(a,1)),h.setAttribute("aSeed",new Le(o,1)),h.setAttribute("aSize",new Le(l,1));let d=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
    `});return new ii(h,d)}var Jv=$v(vf);nn.add(Jv);var yf=new hn;nn.add(yf);var Mf=[],Sf=[],Kv=new hs(.035,1.18,6.05,_t?20:40,1,!0);function jv(i,e,t,n){return new Xe({transparent:!0,depthWrite:!1,side:un,blending:st,uniforms:cn({band:{value:i},order:{value:e},centerXZ:{value:new ue(t.x,t.z)},seed:{value:n}}),vertexShader:`
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
    `})}for(let i=0;i<9;i++){let e=i/9*Math.PI*2+.12,t=4.55+i%3*.18,n=new I(Math.cos(e)*t,3.72+Math.sin(e*2)*.16,Math.sin(e)*t),s=new hn;s.position.copy(n),s.rotation.y=-e+Math.PI/2,s.userData.angle=e,s.userData.seed=Pe(0,Math.PI*2),s.userData.band=(i+.5)/9,s.userData.order=i/8;let r=new tt(Kv,jv(s.userData.band,s.userData.order,n,s.userData.seed));r.position.y=-3.025,s.add(r);let a=new an({color:7921615,transparent:!0,opacity:0,blending:st,depthWrite:!1}),o=new tt(new ri(.34,.012,5,96),a);o.rotation.x=Math.PI/2,s.add(o);let l=new tt(new ri(.27,.006,4,72),a.clone());l.rotation.y=Math.PI/2,s.add(l);let c=new js(new os({map:gf,color:8250837,transparent:!0,opacity:0,blending:st,depthWrite:!1}));c.scale.set(.75,.75,1),s.add(c),Sf.push(n.x,9.8,n.z,n.x,3.78,n.z),yf.add(s),Mf.push({root:s,beam:r,ring:o,crossRing:l,aperture:c,index:i})}var bf=new je;bf.setAttribute("position",new We(Sf,3));var jh=new ni({color:7064507,transparent:!0,opacity:0,blending:st,depthWrite:!1}),Qv=new zn(bf,jh);nn.add(Qv);var wf=new Xe({transparent:!0,depthWrite:!1,side:un,blending:st,uniforms:cn(),vertexShader:`
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
  `}),Ti=new tt(new us(1,_t?36:64,_t?20:36),wf);Ti.visible=!1;nn.add(Ti);var Ai=new hn;nn.add(Ai);var e_=new Xe({transparent:!0,depthWrite:!1,side:un,blending:st,uniforms:cn(),vertexShader:`
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
  `}),Ms=new tt(new hs(1,1,1,_t?48:96,20,!0),e_);Ms.visible=!1;Ai.add(Ms);var Vh=_t?48:96,vs=new Float32Array(Vh*2*3),Qh=new je;Qh.setAttribute("position",new Le(vs,3).setUsage(cr));var tc=new ni({color:9300956,transparent:!0,opacity:0,blending:st,depthWrite:!1}),nc=new zn(Qh,tc);nc.visible=!1;Ai.add(nc);var kh=_t?28:48,hi=new Gr(new si(.055,1,.055),new an({color:7986639,transparent:!0,opacity:0,blending:st,depthWrite:!1}),kh);hi.instanceMatrix.setUsage(cr);hi.visible=!1;Ai.add(hi);var ya=new Ot;function t_(){let i=_t?9:13,e=i*i*i,t=new Float32Array(e*3),n=new Float32Array(e),s=new Float32Array(e),r=0;for(let l=0;l<i;l++)for(let c=0;c<i;c++)for(let h=0;h<i;h++)t[r*3]=(h/(i-1)-.5)*2,t[r*3+1]=(c/(i-1)-.5)*2,t[r*3+2]=(l/(i-1)-.5)*2,n[r]=ui((h+c*1.7+l*2.3)/i),s[r]=r*.731,r++;let a=new je;a.setAttribute("position",new Le(t,3)),a.setAttribute("aBand",new Le(n,1)),a.setAttribute("aSeed",new Le(s,1));let o=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
    `});return new ii(a,o)}var qi=t_();qi.visible=!1;Ai.add(qi);var Gh=_t?120:240,_s=new Float32Array(Gh*2*3),eu=new je;eu.setAttribute("position",new Le(_s,3).setUsage(cr));var ic=new ni({color:8840405,transparent:!0,opacity:0,blending:st,depthWrite:!1}),sc=new zn(eu,ic);sc.visible=!1;Ai.add(sc);var Ei=new hn;for(let i=0;i<9;i++){let e=new zn(new Zr(new si(1.9,1.15,.08)),new ni({color:i===8?14807764:7526859,transparent:!0,opacity:0,blending:st,depthWrite:!1}));e.userData.index=i,Ei.add(e)}Ei.visible=!1;Ai.add(Ei);var Ef=wf.clone();Ef.uniforms=cn();var wi=new tt(new us(1,_t?36:64,_t?20:36),Ef);wi.visible=!1;Ai.add(wi);var ci=new tt(new ri(1,.025,6,_t?96:192),new an({color:13037791,transparent:!0,opacity:0,blending:st,depthWrite:!1}));ci.visible=!1;Ai.add(ci);var gn=new hn;gn.position.y=.34;nn.add(gn);var n_=new Xe({transparent:!0,uniforms:cn(),vertexShader:`
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
  `}),Ki=new tt(new er(1.02,_t?4:5),n_);Ki.userData.interactive="core";gn.add(Ki);var mr=new tt(new er(1.28,2),new an({color:9759452,wireframe:!0,transparent:!0,opacity:0,blending:st,depthWrite:!1}));gn.add(mr);var Ea=new js(new os({map:gf,color:7660756,transparent:!0,opacity:0,blending:st,depthWrite:!1}));Ea.scale.set(5,5,1);gn.add(Ea);var Tf=[];for(let i=0;i<9;i++){let e=1.43+i*.235,t=new an({color:i===8?15069137:7526857,transparent:!0,opacity:0,blending:st,depthWrite:!1}),n=new tt(new ri(e,i%3===0?.017:.007,5,_t?96:192),t);n.rotation.set(Pe(-1.1,1.1),Pe(-Math.PI,Math.PI),Pe(-1.1,1.1)),n.userData.speed=Pe(.032,.105)*(i%2?-1:1),n.userData.index=i,Tf.push(n),gn.add(n)}var Wh=[],i_=new si(.036,1.55,.28);for(let i=0;i<9;i++){let e=new nr({color:398359,metalness:.92,roughness:.18,emissive:668722,emissiveIntensity:0,transparent:!0,opacity:0}),t=new tt(i_,e),n=i/9*Math.PI*2;t.userData.angle=n,t.position.set(Math.cos(n)*1.02,Math.sin(n*2)*.09,Math.sin(n)*1.02),t.rotation.set(Math.sin(n)*.28,-n,Math.cos(n)*.22),Wh.push(t),gn.add(t)}function s_(i){let e=new je,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i);for(let o=0;o<i;o++){let l=o%9,c=Pe(0,Math.PI*2),h=1.8+l*.22+Pe(-.1,.38);t[o*3]=Math.cos(c)*h,t[o*3+1]=Pe(-2.2,2.2)+Math.sin(c*(2+l%3))*.22,t[o*3+2]=Math.sin(c)*h,n[o]=Pe(0,Math.PI*2),s[o]=Pe(.8,2.8),r[o]=ui(l/9+Pe(-.03,.03))}e.setAttribute("position",new Le(t,3)),e.setAttribute("aPhase",new Le(n,1)),e.setAttribute("aSize",new Le(s,1)),e.setAttribute("aBand",new Le(r,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
    `});return new ii(e,a)}var Xh=s_(_t?1200:2600);gn.add(Xh);function r_(i){let e=new je,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i),a=new Float32Array(i);for(let l=0;l<i;l++){let c=Pe(-1,1),h=Pe(0,Math.PI*2),d=Math.sqrt(Math.max(0,1-c*c)),u=Math.pow(Pe(.02,1),.42);t[l*3]=Math.cos(h)*d*u,t[l*3+1]=c*u,t[l*3+2]=Math.sin(h)*d*u,n[l]=Pe(0,1e3),s[l]=ui(l*.61803398875+Pe(-.02,.02)),r[l]=Pe(0,1),a[l]=Pe(.65,2.45)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aSeed",new Le(n,1)),e.setAttribute("aBand",new Le(s,1)),e.setAttribute("aLayer",new Le(r,1)),e.setAttribute("aSize",new Le(a,1));let o=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
    `});return new ii(e,o)}var rc=r_(_t?4200:10500);rc.renderOrder=4;gn.add(rc);var a_=new Float32Array(fn*2*3),ac=new je;ac.setAttribute("position",new Le(a_,3).setUsage(cr));var tu=new ni({color:10349019,transparent:!0,opacity:0,blending:st,depthWrite:!1}),Af=new zn(ac,tu);gn.add(Af);function o_(i){let e=new je,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i);for(let o=0;o<i;o++){let l=Pe(4,30),c=Pe(0,Math.PI*2);t[o*3]=Math.cos(c)*l,t[o*3+1]=Pe(-5,12),t[o*3+2]=Math.sin(c)*l,n[o]=Pe(0,Math.PI*2),s[o]=Pe(.025,.14),r[o]=Pe(.45,2.4)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aPhase",new Le(n,1)),e.setAttribute("aSpeed",new Le(s,1)),e.setAttribute("aSize",new Le(r,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
    `});return new ii(e,a)}var Cf=o_(_t?1200:3300);nn.add(Cf);function l_(i){let e=new je,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i),r=new Float32Array(i);for(let o=0;o<i;o++){let l=Pe(3.5,18),c=Pe(0,Math.PI*2);t[o*3]=Math.cos(c)*l,t[o*3+1]=Pe(-7,11),t[o*3+2]=Math.sin(c)*l,n[o]=Pe(0,1e3),s[o]=Pe(1.6,8.5),r[o]=Pe(0,1)}e.setAttribute("position",new Le(t,3)),e.setAttribute("aSeed",new Le(n,1)),e.setAttribute("aSize",new Le(s,1)),e.setAttribute("aBand",new Le(r,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
    `});return new ii(e,a)}var nu=l_(_t?260:720);nu.renderOrder=8;nn.add(nu);function c_(i){let e=[],t=[],n=[],s=[];for(let o=0;o<i;o++){let l=o/i*Math.PI*2+Pe(-.12,.12),c=Pe(21,37),h=Math.cos(l)*c,d=Math.sin(l)*c,u=Pe(-6,-3),p=Pe(7,18),x=Pe(-1.3,1.3),_=(g,f,M,w,b,C)=>{e.push(g,f,M,w,b,C);for(let T=0;T<2;T++)t.push(h,(u+p)*.5,d),n.push(o*1.713),s.push(ui(o*.381966))};_(h,u,d,h+x,p,d+Pe(-.8,.8));for(let g=1;g<5;g++){let f=Xn(u,p,g/5),M=Pe(.5,1.7)*(1-g*.08);_(h-Math.cos(l)*M,f,d-Math.sin(l)*M,h+Math.cos(l)*M,f,d+Math.sin(l)*M)}}let r=new je;r.setAttribute("position",new We(e,3)),r.setAttribute("aCenter",new We(t,3)),r.setAttribute("aSeed",new We(n,1)),r.setAttribute("aBand",new We(s,1));let a=new Xe({transparent:!0,depthWrite:!1,blending:st,uniforms:cn(),vertexShader:`
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
    `});return new zn(r,a)}var Rf=c_(_t?22:46);nn.add(Rf);var qh=[];for(let i=0;i<7;i++){let e=new an({color:2513764,transparent:!0,opacity:.012,blending:st,depthWrite:!1}),t=new tt(new ri(13+i*3.2,.018+i*.002,3,_t?128:256),e);t.position.y=-5.2+i*2.25,t.rotation.set(Math.PI*.5+Pe(-.16,.16),Pe(-.35,.35),Pe(-.12,.12)),t.userData.seed=Pe(0,10),qh.push(t),nn.add(t)}var Pf=new jr(6539453,515,.15);ln.add(Pf);var cc=new ir(6805704,0,18,2.05);cc.position.copy(gn.position);ln.add(cc);var hc=new ir(2910320,0,34,1.5);hc.position.set(0,9,-5);ln.add(hc);var bn=new Zl(Ze);bn.addPass(new $l(ln,tn));var Pn=new pr(new ue(innerWidth,innerHeight),_t?.72:.94,.72,.22);bn.addPass(Pn);var pn=new Kl(.865);bn.addPass(pn);var h_=new fr({uniforms:{tDiffuse:{value:null},time:K.time,resolution:K.resolution,energy:K.energy,high:K.high,ritual:K.ritual,shutdown:K.shutdown,pulseAge:K.pulseAge,pulseStrength:K.pulseStrength,pulseScreen:K.pulseScreen,section:K.section,sectionLocal:K.sectionLocal,phaseTransition:K.phaseTransition,sonarMode:K.sonarMode,deepColor:K.deepColor,fogColor:K.fogColor,glowColor:K.glowColor},vertexShader:`
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
  `});bn.addPass(h_);bn.addPass(new jl);var Ct=null,df=null,Kt=null,gr=null,en=null,Ss=null,di=null,If="shader-demo-room",Lf=1,u_=Object.freeze(["pause","stats","set-preview"]),iu=window.parent!==window,su=null,kt=null,In=document.hidden,oc={documentHidden:document.hidden,hostPaused:!1},Zi=new Set,bs=new Set,vr=!1,ba=Promise.resolve(),uc=!1,wa=!1,Yh=0,ff=120,jt={frameCount:0,sampleStartedAt:performance.now(),sampleFrames:0,fps:0,frameTimeMs:0};function d_(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)&&Object.getPrototypeOf(i)===Object.prototype}function Ta(i,e){if(!d_(i))return!1;let t=Object.keys(i).sort(),n=[...e].sort();return t.length===n.length&&t.every((s,r)=>s===n[r])}function Df(i,e){iu&&window.parent.postMessage({context:If,v:Lf,instanceId:su,type:i,payload:e},location.origin)}function lc(i){Df("stats",{fps:jt.fps,frameTimeMs:jt.frameTimeMs,frameCount:jt.frameCount,paused:i})}function ru(i=performance.now()){jt.sampleStartedAt=i,jt.sampleFrames=0}function f_(i){jt.frameCount++,jt.sampleFrames++;let e=i-jt.sampleStartedAt;e<500||(jt.fps=jt.sampleFrames*1e3/e,jt.frameTimeMs=e/jt.sampleFrames,lc(!1),ru(i))}async function p_(){for(;;){let i=In;if(i){for(let e of document.querySelectorAll("audio"))!e.paused&&!e.ended&&Zi.add(e);for(let e of Zi)!e.paused&&!e.ended&&e.pause();Ct?.state==="running"&&bs.add(Ct),await Promise.all([...bs].map(e=>e.state==="running"?e.suspend():void 0))}else{await Promise.all([...bs].map(t=>t.state==="suspended"?t.resume():void 0));let e=new Set(Zi);vr&&e.add(j.audio);for(let t of e)t.isConnected&&t.paused&&!t.ended&&await t.play()}if(In===i){i||(Zi.clear(),bs.clear(),vr=!1);return}}}function Aa(){ba=ba.then(p_).catch(i=>{console.error("Ninth Tide media pause transition failed.",i)})}async function m_({elementWasOwned:i,contextWasOwned:e,startWasPending:t}){let n=Ct;ba=ba.then(async()=>{i||Zi.delete(j.audio),!e&&n&&bs.delete(n),t||(vr=!1),In&&n?.state==="running"&&await n.suspend()}).catch(s=>{console.error("Ninth Tide media intent rollback failed.",s)}),await ba}function au(){!In&&!uc&&!wa&&kt===null&&(kt=requestAnimationFrame(U_))}function Nf(){let i=oc.documentHidden||oc.hostPaused;if(i!==In){if(In=i,In){kt!==null&&cancelAnimationFrame(kt),kt=null,Aa(),lc(!0);return}xr.reset(),ru(),Aa(),lc(!1),au()}}function Uf(){oc.documentHidden=document.hidden,Nf()}function g_(i){return Ta(i,["context","v","instanceId","type","payload"])&&i.context===If&&i.v===Lf}function Ff(i){if(!iu||i.origin!==location.origin||i.source!==window.parent)return;let e=i.data;if(!g_(e))throw new Error("Invalid Ninth Tide bridge command envelope.");if(e.instanceId===su){if(typeof e.type!="string")throw new Error("Invalid Ninth Tide bridge command type.");if(e.type==="set-paused"){if(!Ta(e.payload,["paused"])||typeof e.payload.paused!="boolean")throw new Error("Invalid Ninth Tide set-paused payload.");oc.hostPaused=e.payload.paused,Nf();return}if(e.type==="set-tide-preview"){if(!Ta(e.payload,["mode","section"]))throw new Error("Invalid Ninth Tide set-tide-preview payload.");let{mode:t,section:n}=e.payload;if(!["opening","main","ending"].includes(t)||!Number.isInteger(n)||n<0||n>8)throw new Error("Invalid Ninth Tide set-tide-preview payload.");ou(t,n);return}throw new Error(`Unsupported Ninth Tide bridge command: ${e.type}.`)}}function x_(){if(document.addEventListener("visibilitychange",Uf),!!iu){if(typeof crypto.randomUUID!="function")throw new Error("Embedded Ninth Tide requires crypto.randomUUID().");su=crypto.randomUUID(),window.addEventListener("message",Ff),Df("ready",{capabilities:[...u_]}),In&&lc(!0)}}j.audio.addEventListener("loadedmetadata",()=>{j.timeTotal.textContent=zh(j.audio.duration)});j.audio.addEventListener("play",()=>{if(In){Zi.add(j.audio),vr=!0,j.audio.pause(),Aa();return}m.playing=!0,j.audioState.textContent="PLAYING",j.signal.textContent="LIVE FFT"});j.audio.addEventListener("pause",()=>{m.playing=!1,m.ended||(j.audioState.textContent=m.audioReady?"PAUSED":"STANDBY")});j.audio.addEventListener("ended",()=>Bf());j.audio.addEventListener("error",()=>{m.audioFailed=!0,j.fileLabel.hidden=!1,j.hint.textContent="\u672A\u80FD\u8BFB\u53D6 archive.mp3\u3002\u8BF7\u9009\u62E9\u672C\u5730\u97F3\u9891\u6587\u4EF6\u7EE7\u7EED\u3002",j.audioState.textContent="FILE REQUIRED"});async function v_(){if(!Ct){let i=window.AudioContext||window.webkitAudioContext;if(!i)throw new Error("Web Audio API unavailable");Ct=new i,df=Ct.createMediaElementSource(j.audio),Kt=Ct.createAnalyser(),Kt.fftSize=2048,Kt.smoothingTimeConstant=.82,Kt.minDecibels=-94,Kt.maxDecibels=-16,gr=Ct.createGain(),gr.gain.value=0,df.connect(Kt),Kt.connect(gr),gr.connect(Ct.destination),en=new Uint8Array(Kt.frequencyBinCount),Ss=new Uint8Array(Kt.fftSize)}In?(bs.add(Ct),Aa()):Ct.state!=="running"&&await Ct.resume(),m.audioReady=!0}function __(){m.calibrated=!1,m.ceremonyTime=0,m.ceremonyCue=0,m.ritual=0,m.ignite=0,m.lightLevel=0,m.shutdown=0,m.ending=!1,m.ended=!1,m.endingCue=0,m.archiveOpen=0,m.archiveOpenTarget=0,m.pulseAge=99,m.pulseStrength=0,m.pulseCooldown=0,m.pulseMode=0,m.pulseSerial=0,m.tideIndex=0,m.transitionFrom=0,m.pendingTide=-1,m.phaseLocal=0,m.phaseTransition=0,m.transitionClock=99,m.transitionSwitched=!1,K.section.value=0,K.sectionLocal.value=0,K.phaseTransition.value=0,K.sonarMode.value=0,document.documentElement.style.setProperty("--phase-veil","0"),m.diveTarget=.12,m.yawTarget=0,m.pitchTarget=.07,document.body.classList.add("entered"),document.body.classList.remove("calibrated","ending","ended"),j.coreState.textContent="CALIBRATING",j.fieldState.textContent="DARK ADAPTATION",j.mode.textContent="CALIBRATION",document.documentElement.style.setProperty("--blackout","1"),document.documentElement.style.setProperty("--ritual-caption","0")}async function ws(i,e=!1){if((!m.entered||e||m.ended)&&(m.entered=!0,__(),Number.isFinite(j.audio.duration)&&(j.audio.currentTime=0)),!i){m.audioReady=!1,m.playing=!1,j.signal.textContent="SYNTHETIC",j.audioState.textContent="SILENT";return}let t=Ct!==null&&bs.has(Ct);try{if(j.enter.disabled=!0,j.enter.textContent="\u6B63\u5728\u6821\u51C6\u2026",await v_(),(e||m.ended||j.audio.currentTime>.2)&&(j.audio.currentTime=0),In){let n=Zi.has(j.audio),s=vr;Zi.add(j.audio),vr=!0,Aa();try{await j.audio.play()}catch(r){if(!(r instanceof DOMException)||r.name!=="AbortError")throw await m_({elementWasOwned:n,contextWasOwned:t,startWasPending:s}),r}}else await j.audio.play();j.enter.textContent="\u542F\u52A8\u5171\u9E23\u4EEA\u5F0F",j.enter.disabled=!1}catch(n){console.error(n),j.enter.disabled=!1,j.enter.textContent="\u91CD\u8BD5\u97F3\u9891",j.fileLabel.hidden=!1,j.hint.textContent="\u97F3\u9891\u88AB\u6D4F\u89C8\u5668\u62E6\u622A\u6216\u6587\u4EF6\u4E0D\u53EF\u8BFB\u3002\u53EF\u9009\u62E9\u672C\u5730\u97F3\u9891\uFF0C\u6216\u5148\u65E0\u58F0\u8FDB\u5165\u3002",m.audioFailed=!0}}j.enter.addEventListener("click",()=>ws(!0));j.silent.addEventListener("click",()=>ws(!1));j.replay.addEventListener("click",()=>ws(!0,!0));j.file.addEventListener("change",async i=>{let e=i.target.files?.[0];e&&(di&&URL.revokeObjectURL(di),di=URL.createObjectURL(e),j.audio.src=di,j.audio.load(),m.audioFailed=!1,j.fileLabel.hidden=!0,j.hint.textContent=`\u5DF2\u8F7D\u5165 ${e.name}`,await ws(!0,!0))});window.addEventListener("dragover",i=>i.preventDefault());window.addEventListener("drop",async i=>{i.preventDefault();let e=[...i.dataTransfer.files].find(t=>t.type.startsWith("audio/"));e&&(di&&URL.revokeObjectURL(di),di=URL.createObjectURL(e),j.audio.src=di,j.audio.load(),await ws(!0,!0),mn(`AUDIO LOADED / ${e.name.toUpperCase()}`,2200))});function Nh(i,e){if(!Kt||!en||!Ct)return 0;let t=Ct.sampleRate/2,n=bt(Math.floor(i/t*en.length),0,en.length-1),s=bt(Math.ceil(e/t*en.length),n+1,en.length),r=0;for(let a=n;a<s;a++)r+=en[a];return r/((s-n)*255)}function y_(i){if(Kt&&en&&m.playing&&Ct){let e=Ct.sampleRate/2;for(let t=0;t<fn;t++){let n=t/fn,s=(t+1)/fn,r=28*Math.pow(17e3/28,n),a=28*Math.pow(17e3/28,s),o=bt(Math.floor(r/e*en.length),0,en.length-1),l=bt(Math.ceil(a/e*en.length),o+1,en.length),c=0;for(let h=o;h<l;h++)c+=en[h];qn[t]=Math.round(c/Math.max(1,l-o))}}else for(let e=0;e<fn;e++){let n=22+31*Math.exp(-e/32)*(.55+.45*Math.sin(i*(.42+e*.006)+e*.53));qn[e]=bt(Math.round(n),0,255)}ji.needsUpdate=!0}function M_(i,e){let t,n,s,r=0;if(Kt&&m.playing){Kt.getByteFrequencyData(en),Kt.getByteTimeDomainData(Ss),t=Math.pow(Nh(24,190),1.14),n=Math.pow(Nh(190,2100),1.22),s=Math.pow(Nh(2100,9200),1.08);let l=0;for(let c=0;c<Ss.length;c+=4){let h=(Ss[c]-128)/128;l+=h*h}r=Math.sqrt(l/(Ss.length/4))}else m.syntheticPhase+=i,t=.14+.065*(.5+.5*Math.sin(e*1.08)),n=.1+.052*(.5+.5*Math.sin(e*.43+1.2)),s=.05+.03*(.5+.5*Math.sin(e*1.91+2.5)),r=.08+t*.28;m.low=Qt(m.low,t,8,i),m.mid=Qt(m.mid,n,7.2,i),m.high=Qt(m.high,s,9,i),m.rms=Qt(m.rms,r,9,i);let a=bt(m.low*.48+m.mid*.34+m.high*.22+m.rms*.3,0,1),o=Math.max(0,a-m.previousEnergy)*8.6;if(m.transient=Qt(m.transient,o,o>m.transient?26:7,i),m.previousEnergy=a,m.energy=Qt(m.energy,a,7.8,i),y_(e),K.low.value=m.low,K.mid.value=m.mid,K.high.value=m.high,K.rms.value=m.rms,K.energy.value=m.energy,K.transient.value=m.transient,j.low.style.setProperty("--v",bt(m.low*1.75,0,1).toFixed(3)),j.mid.style.setProperty("--v",bt(m.mid*1.95,0,1).toFixed(3)),j.high.style.setProperty("--v",bt(m.high*2.8,0,1).toFixed(3)),gr&&Ct){let l=vt(.12,Bh?.55:1.75,m.ceremonyTime),c=1-vt(.53,.98,m.shutdown),h=m.muted?0:.92*l*c;gr.gain.setTargetAtTime(h,Ct.currentTime,.07)}m.pulseCooldown=Math.max(0,m.pulseCooldown-i),m.calibrated&&!m.ending&&m.playing&&m.transient>.16&&m.pulseCooldown<=0&&($i(new ue(0,0),.48+m.transient*.7,.32,!1),m.pulseCooldown=1.15+(1-m.low)*.7)}function Of(i){Wn.x=i.clientX/innerWidth*2-1,Wn.y=-(i.clientY/innerHeight)*2+1,j.cursor.style.transform=`translate3d(${i.clientX}px,${i.clientY}px,0)`}window.addEventListener("pointermove",i=>{if(Of(i),m.dragging&&!m.ending){let e=i.clientX-m.lastPointerX,t=i.clientY-m.lastPointerY;m.yawTarget-=e*.0042,m.pitchTarget=bt(m.pitchTarget+t*.0026,-.3,.5),m.dragDistance+=Math.hypot(e,t)}m.lastPointerX=i.clientX,m.lastPointerY=i.clientY});window.addEventListener("pointerdown",i=>{i.target.closest("button, label, input")||m.ending||(Of(i),m.dragging=!0,m.dragDistance=0,m.lastPointerX=i.clientX,m.lastPointerY=i.clientY,j.cursor.classList.add("active"))});window.addEventListener("pointerup",i=>{m.dragging&&(m.dragging=!1,j.cursor.classList.remove("active"),m.dragDistance<8&&S_(i))});window.addEventListener("pointercancel",()=>{m.dragging=!1,j.cursor.classList.remove("active")});window.addEventListener("wheel",i=>{m.ending||(m.diveTarget=bt(m.diveTarget+i.deltaY*55e-5,0,1))},{passive:!0});function S_(i){if(!m.calibrated||m.ending)return;if(Wn.x=i.clientX/innerWidth*2-1,Wn.y=-(i.clientY/innerHeight)*2+1,Sa.setFromCamera(Wn,tn),Sa.intersectObject(Ki,!1)[0]){m.archiveOpenTarget=m.archiveOpenTarget>.5?0:1,j.mode.textContent=m.archiveOpenTarget?"DECODING":"OBSERVATION",j.coreState.textContent=m.archiveOpenTarget?"UNSEALED":"RESONANT",$i(new ue(0,0),1.35,.34,!0),mn(m.archiveOpenTarget?"OPEN":"SEALED",850);return}let t=Sa.intersectObject(Ra,!1)[0];t?($i(new ue(t.point.x,t.point.z),1.05,-2.28,!0),mn(["PRESSURE","CURTAIN","QUARTZ","PILLARS","FORECAST","COUNTERTIDE","CODEX","GAZE","NULL"][m.tideIndex],760)):$i(new ue(Wn.x*5,-Wn.y*5),.7,.1,!0)}function $i(i=new ue(0,0),e=1,t=.34,n=!1,s=null){m.pulseAge=0,m.pulseStrength=e,m.pulseOrigin.copy(i),m.pulseSourceY=t,m.pulseMode=s??m.tideIndex,m.pulseSerial++;let r=Hh.set(i.x,t,i.y).project(tn);m.pulseScreen.set(r.x*.5+.5,r.y*.5+.5),K.pulseAge.value=0,K.pulseStrength.value=e,K.sonarMode.value=m.pulseMode,Ti.position.set(i.x,t,i.y),Ti.scale.setScalar(.001),Ti.visible=m.pulseMode===0,n&&(m.pulseCooldown=.95)}window.addEventListener("keydown",async i=>{i.code==="Space"?(i.preventDefault(),m.ended?await ws(!0,!0):m.entered?m.audioReady&&(j.audio.paused?await j.audio.play():j.audio.pause()):await ws(!0)):i.key.toLowerCase()==="m"?(m.muted=!m.muted,j.audioState.textContent=m.muted?"MUTED":m.playing?"PLAYING":"PAUSED",mn(m.muted?"AUDIO MUTED":"AUDIO RESTORED")):i.key.toLowerCase()==="f"?document.fullscreenElement?document.exitFullscreen?.():document.documentElement.requestFullscreen?.():i.key.toLowerCase()==="r"&&!m.ending&&(m.diveTarget=.12,m.yawTarget=0,m.pitchTarget=.07,mn("VIEWPOINT RECALIBRATED"))});var Uh=[{time:.58,text:"FIRST RETURN",strength:.52,y:-2.28,mode:0},{time:1.52,text:"NO FLOOR",strength:.62,y:-2.28,mode:1},{time:2.62,text:"DEPTH BELOW DEPTH",strength:.72,y:-2.28,mode:2},{time:4.1,text:"NINE ROOMS",strength:.86,y:.34,mode:3},{time:5.62,text:"FIRST LIGHT",strength:1.32,y:.34,mode:4},{time:7.45,text:"IT LOOKS BACK",strength:.92,y:.34,mode:7}];function b_(i){let e="",t="",n="";i<1.65?(n="I",e="\u542C\u3002",t="LISTEN."):i<3.55?(n="II",e="\u6D77\u5E8A\u6CA1\u6709\u56DE\u7B54\u3002",t="NO FLOOR ANSWERED."):i<5.75?(n="III",e="\u661F\u56FE\u6C89\u5728\u66F4\u6DF1\u5904\u3002",t="THE STARS LIE LOWER."):(n="IX",e="\u5B83\u5148\u770B\u89C1\u4E86\u6211\u4EEC\u3002",t="IT SAW US FIRST."),j.ritualIndex.textContent=n,j.ritualMain.textContent=e,j.ritualSub.textContent=t;let s=vt(.18,.62,i)*(1-vt(8,9.1,i));document.documentElement.style.setProperty("--ritual-caption",s.toFixed(3))}function w_(i){if(!m.entered||m.calibrated||m.previewMode==="main")return;m.audioReady&&Number.isFinite(j.audio.currentTime)?m.ceremonyTime=j.audio.currentTime:m.ceremonyTime+=i*(Bh?2:1);let e=m.ceremonyTime;for(m.ritual=Ji(.4,7.7,e),m.ignite=Ji(4.15,8,e),m.lightLevel=bt(vt(.12,1.05,e)*.22+vt(2.25,7.85,e)*.78,0,1),K.ritual.value=m.ritual,K.ignite.value=m.ignite,b_(e);m.ceremonyCue<Uh.length&&e>=Uh[m.ceremonyCue].time;){let t=Uh[m.ceremonyCue++];$i(new ue(0,0),t.strength,t.y,!1,t.mode),mn(t.text,1300)}e>=(Bh?4.2:8.65)&&(m.calibrated=!0,m.ritual=1,m.ignite=1,K.ritual.value=1,K.ignite.value=1,document.body.classList.add("calibrated"),j.coreState.textContent="RESONANT",j.fieldState.textContent="LIVE / 64 BANDS",j.mode.textContent="OBSERVATION",document.documentElement.style.setProperty("--ritual-caption","0"))}function Bf(){m.ended||(m.shutdown=1,K.shutdown.value=1,m.ending=!0,m.ended=!0,m.playing=!1,document.body.classList.add("ending"),setTimeout(()=>document.body.classList.add("ended"),700),j.audioState.textContent="CLOSED",j.coreState.textContent="EXTINGUISHED",j.fieldState.textContent="NO RETURN",document.documentElement.style.setProperty("--blackout","1"))}function E_(){if(!m.entered||m.previewMode==="main"||m.previewMode==="opening")return;let i=m.shutdown;if(m.previewMode==="ending")i=Math.max(i,.68);else if(m.audioReady&&Number.isFinite(j.audio.duration)&&j.audio.duration>20){let t=j.audio.duration-13.6,n=bt((j.audio.currentTime-t)/13.6,0,1);i=n<.58?n*.78:Xn(.4524,1,Ji(.58,1,n))}m.shutdown=Math.max(m.shutdown,i),K.shutdown.value=m.shutdown,m.shutdown>.018&&!m.ending&&(m.ending=!0,document.body.classList.add("ending"),j.mode.textContent="WITHDRAWAL"),m.endingCue===0&&m.shutdown>.05&&(m.endingCue=1,mn("OUTER SILENCE",1450)),m.endingCue===1&&m.shutdown>.41&&(m.endingCue=2,$i(new ue(0,0),.82,.34,!1,8),mn("THE ECHO REVERSES",1550)),m.endingCue===2&&m.shutdown>.76&&(m.endingCue=3,mn("LAST LIGHT",1450)),m.shutdown>=.995&&Bf()}var Fh={deep:new Ee,fog:new Ee,glow:new Ee,accent:new Ee,secondary:new Ee},Ca=-1;function zf(){return _r?uf:Number.isFinite(j.audio.duration)?j.audio.duration:uf}function T_(i,e){let t=zf(),n;if(m.previewMode==="main"){let d=bt(m.previewSection,0,8);n=Xn(Gn[d],Gn[d+1],.46)}else m.previewMode==="ending"?n=346:n=m.audioReady&&t>0?j.audio.currentTime:i/118*t%t;n=bt(n,0,Gn[Gn.length-1]-.001);let s=Gn.length-2;for(let d=0;d<Gn.length-1;d++)if(n<Gn[d+1]){s=d;break}s!==m.tideIndex&&m.pendingTide!==s&&(m.transitionFrom=m.tideIndex,m.pendingTide=s,m.transitionClock=0,m.transitionSwitched=!1);let r=1;m.pendingTide>=0&&(m.transitionClock+=e,r=bt(m.transitionClock/Hv,0,1),!m.transitionSwitched&&r>=.49&&(m.transitionSwitched=!0,m.tideIndex=m.pendingTide,K.section.value=m.tideIndex,m.calibrated&&!m.ending&&$i(new ue(0,0),.58,.34,!1,m.tideIndex)),r>=1&&(m.tideIndex=m.pendingTide,m.pendingTide=-1,m.transitionClock=99,m.transitionSwitched=!1,r=1)),m.phaseTransition=m.pendingTide>=0?Math.pow(Math.sin(r*Math.PI),1.18):0,K.phaseTransition.value=m.phaseTransition,document.documentElement.style.setProperty("--phase-veil",(m.phaseTransition*.72).toFixed(3)),document.documentElement.style.setProperty("--phase-turn",m.phaseTransition.toFixed(3));let a=Gn[m.tideIndex],o=Gn[m.tideIndex+1];m.phaseLocal=bt((n-a)/Math.max(.01,o-a),0,1),m.tideFloat=m.tideIndex+m.phaseLocal,K.section.value=m.tideIndex,K.sectionLocal.value=m.phaseLocal,K.tide.value=m.tideFloat;let l=m.pendingTide>=0?m.transitionFrom:m.tideIndex,c=m.pendingTide>=0?m.pendingTide:m.tideIndex,h=m.pendingTide>=0?Ji(.08,.92,r):0;for(let d of Object.keys(Fh))Fh[d].lerpColors(ys[l][d],ys[c][d],h),K[`${d}Color`].value.copy(Fh[d]);if(ln.fog.color.copy(K.fogColor.value),ln.background.copy(K.deepColor.value),cc.color.copy(K.glowColor.value),hc.color.copy(K.secondaryColor.value),mr.material.color.copy(K.glowColor.value),Ea.material.color.copy(K.glowColor.value),tu.color.copy(K.accentColor.value),jh.color.copy(K.secondaryColor.value),tc.color.copy(K.glowColor.value),hi.material.color.copy(K.glowColor.value),ic.color.copy(K.accentColor.value),ci.material.color.copy(K.accentColor.value),Kh.forEach(d=>d.material.color.copy(K.glowColor.value)),m.tideIndex!==Ca){Ca=m.tideIndex;let d=Ma[m.tideIndex];j.phaseNumber.textContent=d[0],j.phaseName.textContent=d[1],j.phaseSub.textContent=d[2],j.sideTicks.forEach((u,p)=>u.classList.toggle("active",p===m.tideIndex)),m.calibrated&&!m.ending&&m.activeSeconds>2&&mn(`${d[0]} \xB7 ${d[1]}`,1150)}}function A_(i){m.dive=Qt(m.dive,m.diveTarget,4.1,i),m.yaw=Qt(m.yaw,m.yawTarget,5,i),m.pitch=Qt(m.pitch,m.pitchTarget,5,i),Yi.lerp(Wn,1-Math.exp(-i*4.5));let e=1-m.ritual,t=Xn(13,5.25,Math.pow(m.dive,1.08))+e*1.6+m.shutdown*2.7,n=m.yaw+Yi.x*(m.dragging?.015:.095)+e*.05,s=m.pitch+Yi.y*(m.dragging?.01:.05)-m.shutdown*.035,r=.17+m.dive*.22,a=Math.cos(s)*t,o=new I(Math.sin(n)*a,r+Math.sin(s)*t*.67,Math.cos(n)*a);tn.position.lerp(o,1-Math.exp(-i*4.2)),tn.lookAt(0,r,0),tn.rotation.z=Qt(tn.rotation.z,-Yi.x*.007-m.transient*.003,4,i);let l=Math.round(3860+m.dive*740);j.depth.textContent=`\u2212${String(l).padStart(6,"0")} M`,j.coord.textContent=`${(n*12.7).toFixed(3)} / ${(s*17.4).toFixed(3)}`}function C_(){let i=ac.attributes.position.array,e=m.tideIndex,t=m.phaseLocal;for(let n=0;n<fn;n++){let s=n/fn,r=s*Math.PI*2,a=qn[n]/255,o=n*6,l,c,h,d,u,p;if(e===0){let _=1.34+a*.74;l=Math.cos(r)*1.18,c=Math.sin(r*3+K.time.value*.18)*.13,h=Math.sin(r)*1.18,d=Math.cos(r)*_,u=c+(a-.2)*.13,p=Math.sin(r)*_}else if(e===1){let x=Math.pow(Math.abs(Math.cos(r*4.5)),8),_=.78+x*.32,g=_+.28+a*(.65+x*.65);l=Math.cos(r)*_,c=(s-.5)*1.15,h=Math.sin(r)*_,d=Math.cos(r)*g,u=c+Math.sin(r*9)*a*.18,p=Math.sin(r)*g}else if(e===2){let x=Math.round(s*12)/12*Math.PI*2,_=.72,g=1.15+a*.88;l=Math.cos(x)*_,c=Math.sin(r*5)*.42,h=Math.sin(x)*_,d=Math.cos(x)*g,u=c+(a-.25)*.34,p=Math.sin(x)*g}else if(e===3){let x=(s-.5)*2.4;l=x,c=-.82,h=Math.sin(r*3)*.13,d=x,u=-.2+a*2.25,p=h+Math.cos(r*2)*.09}else if(e===4){let _=.74*(.45+Math.pow(Math.abs(Math.sin(r*4.5)),3)*.74),g=_+.34+a*.83;l=Math.cos(r)*_,c=Math.sin(r*2)*.2,h=Math.sin(r)*_,d=Math.cos(r)*g,u=c+Math.sin(r*9)*a*.32,p=Math.sin(r)*g}else if(e===5){let x=(s-.5)*2.7,_=r*2+x*2.8+K.time.value*.35,g=.72,f=g+.24+a*.48;l=Math.cos(_)*g,c=x,h=Math.sin(_)*g,d=Math.cos(_)*f,u=x+(a-.4)*.13,p=Math.sin(_)*f}else if(e===6){let x=Math.floor(s*9),_=ui(s*9);c=(x/8-.5)*2.2,u=c,l=-1.2+_*2.4,d=l+.18+a*1.15,h=(x-4)*.018,p=h+Math.sin(r*4+K.time.value)*.035}else if(e===7){let _=.92+a*.72;l=Math.cos(r)*.7*1.45,c=Math.sin(r)*.7*.58,h=0,d=Math.cos(r)*_*1.45,u=Math.sin(r)*_*.58,p=Math.sin(r*3)*a*.14}else{let x=.46-t*.1,_=x+.08+a*.22;l=Math.cos(r)*x,c=Math.sin(r*2)*.04,h=Math.sin(r)*x,d=Math.cos(r)*_,u=c,p=Math.sin(r)*_}i[o]=l,i[o+1]=c,i[o+2]=h,i[o+3]=d,i[o+4]=u,i[o+5]=p}ac.attributes.position.needsUpdate=!0}function R_(i,e){m.archiveOpen=Qt(m.archiveOpen,m.archiveOpenTarget,4,i),K.open.value=m.archiveOpen;let t=m.tideIndex,n=m.phaseTransition,r=[.55,.92,.42,.2,.68,1.15,.34,.48,.12][t];gn.rotation.y+=i*(.02+r*.055+m.mid*.055)*(1-m.shutdown*.7),gn.rotation.x=Math.sin(e*(.07+r*.05))*(t===5?.075:.035)+Yi.y*.025,gn.rotation.z=Math.sin(e*.061)*.02-Yi.x*.018+(t===6?Math.sin(e*.17)*.035:0);let o=[m.low,m.high,m.mid,m.low,m.mid,m.mid,m.high,m.transient,m.low][t],l=1+o*.09+m.transient*.025+n*.08,h=[[1,1,1],[1.05,1.28,1.05],[1.08,1.08,1.08],[.56,1.72,.56],[1.18,.92,1.18],[.82,1.38,.82],[1.42,1.2,.28],[1.46,.62,.34],[.48,.48,.48]][t];Hh.set(h[0]*l,h[1]*l,h[2]*l),Ki.scale.lerp(Hh,1-Math.exp(-i*(4+n*8)));let d=1-vt(.76,.98,m.shutdown)*.78,u=t===6?.85:t===7?.9:t===8?.46:1;mr.scale.set(h[0]*u,h[1]*u,h[2]*u).multiplyScalar((1+m.archiveOpen*.2+m.high*.025+n*.32)*d),mr.rotation.x+=i*(.05+r*.11+m.high*.08),mr.rotation.y-=i*(.04+r*.09+m.mid*.07),mr.material.opacity=(.08+m.high*.24+m.archiveOpen*.08+n*.22)*m.ignite*(1-vt(.73,.98,m.shutdown));let p=[1,1.24,.86,.94,1.34,1.02,.78,1.22,.54][t];Ea.material.opacity=(.1+o*.38+m.transient*.28+n*.4)*m.ignite*(1-vt(.72,.96,m.shutdown)),Ea.scale.setScalar((4+p*.8+o*1.2+m.archiveOpen*.7+n*2)*(1-vt(.68,.98,m.shutdown)*.86)),cc.intensity=(5+o*29+m.archiveOpen*9+m.transient*16+n*26)*m.ignite*(1-vt(.72,.99,m.shutdown)),rc.rotation.y+=i*([.03,.075,.015,.01,.04,-.09,.008,.018,.004][t]+m.mid*.025),rc.rotation.z=t===5?Math.sin(e*.18)*.12:t===6?.04:Math.sin(e*.055)*.025;for(let x of Tf){let _=x.userData.index,g=_%2?-1:1,f=[.75,1.6,.35,.25,.95,2,.18,.48,.08][t];x.rotation.x+=i*x.userData.speed*f*(1+m.mid*1.15),x.rotation.y-=i*x.userData.speed*.7*f*(1+m.high),t===3&&(x.rotation.z=Qt(x.rotation.z,_%2?Math.PI/2:0,2.2,i)),t===6&&(x.rotation.x=Qt(x.rotation.x,Math.PI/2,1.8,i)),t===7&&(x.rotation.x=Qt(x.rotation.x,Math.PI/2,2.4,i));let M=vt(_/9*.55,_/9*.55+.25,m.ignite),w=vt(.5+(8-_)/9*.34,.82+(8-_)/9*.16,m.shutdown),b=1+m.archiveOpen*(.05+_*.017)+o*.012;t===1&&(b*=.86+_%3*.14),t===4&&(b*=.88+Math.sin(_/9*Math.PI)*.32),t===8&&(b*=.48+(1-m.phaseLocal)*.32);let C=t===7?.46:t===6?.72:1;x.scale.set(b,b*C,b).multiplyScalar(1-w*.92),x.material.opacity=((_%3===0?.2:.065)+m.high*(_%3===0?.3:.14)+m.archiveOpen*.05+n*.16)*M*(1-w),x.material.color.copy(_===8?K.accentColor.value:K.glowColor.value)}for(let x=0;x<Wh.length;x++){let _=Wh[x],g=_.userData.angle+e*(t===5?-.06:.018),f=vt(x/9*.55,x/9*.55+.25,m.ignite),M=t===4?.95+m.mid*.65:t===7?-.32+m.high*.2:t===8?-.65:0,w=.92+m.archiveOpen*(.9+x*.022)+M*.48+n*.45;_.position.x=Math.cos(g)*w,_.position.z=Math.sin(g)*w,_.position.y=Math.sin(g*2+e*.25)*(.06+m.archiveOpen*.17)+(t===3?(x-4)*.13:0),_.rotation.y=-g+m.archiveOpen*Math.PI*.34+M*.38,_.rotation.z=Math.cos(g)*.2+m.archiveOpen*(x%2?-.58:.58)+(t===6?Math.PI*.42:0),_.material.emissive.copy(x===8?K.accentColor.value:K.secondaryColor.value),_.material.emissiveIntensity=(.05+m.mid*.5+m.archiveOpen*.28+n*.5)*f,_.material.opacity=(t===8?.16:.34)*f*(1-vt(.64,.94,m.shutdown))}Xh.rotation.y-=i*(.008+m.mid*.028)*(t===5?-2.2:1),Xh.rotation.z=Math.sin(e*.075)*(t===6?.02:.05),Af.rotation.y+=i*(t===5?-.055:t===3?.008:.018),tu.opacity=(.08+m.high*.3+m.archiveOpen*.09+n*.24)*m.ignite*(1-vt(.65,.94,m.shutdown)),C_()}function P_(i,e){let t=vt(.18,.78,m.ritual);jh.opacity=.04*t*(1-m.shutdown);for(let n of Mf){let{root:s,ring:r,crossRing:a,aperture:o,index:l}=n,c=bt(Math.floor(s.userData.band*(fn-1)),0,fn-1),h=qn[c]/255,d=s.userData.angle,u=Math.hypot(s.position.x-m.pulseOrigin.x,s.position.z-m.pulseOrigin.y),p=m.pulseAge*(4.15+m.low*1.7);m.pulseMode===1?p=m.pulseAge*(2.2+m.high*.8):m.pulseMode===3?p=m.pulseAge*2.5:m.pulseMode===7?p=Xn(18,.15,Ji(0,4.05,m.pulseAge)):m.pulseMode===8&&(p=Xn(10.5,.15,Ji(0,4.3,m.pulseAge)));let x=m.pulseMode===6?.55:m.pulseMode>=7?.82:1.35,_=Math.exp(-Math.abs(u-p)*x)*m.pulseStrength,g=vt(l/9*.55,l/9*.55+.28,m.ritual),f=.18+(1-l/8)*.46,M=1-vt(f,f+.19,m.shutdown),w=[.8,1.45,.52,.32,.92,1.75,.38,.62,.18][m.tideIndex],b=m.tideIndex===5?-1:1;s.rotation.z=Math.sin(e*(.15+l*.006)*w+s.userData.seed)*(.045+h*.17+_*.19),s.rotation.x=Math.cos(e*.12*b+d)*(.018+h*.08+(m.tideIndex===3?m.low*.1:0)),r.rotation.z+=i*(.12+h*.5)*(l%2?-1:1),a.rotation.x+=i*(.08+m.mid*.25),r.material.color.copy(K.glowColor.value),a.material.color.copy(l===8?K.accentColor.value:K.secondaryColor.value),r.material.opacity=(.08+h*.48+_*.58)*g*M,a.material.opacity=(.04+m.high*.16+_*.34)*g*M,o.material.color.copy(l===8?K.accentColor.value:K.glowColor.value),o.material.opacity=(.13+h*.62+_*.72)*g*M,o.scale.setScalar(.55+h*.55+_*.7)}}function I_(i){m.pulseAge+=i,K.pulseAge.value=m.pulseAge,m.pulseStrength=Qt(m.pulseStrength,0,.34,i),K.pulseStrength.value=m.pulseStrength,Ti.visible=!1,Ms.visible=!1,nc.visible=!1,hi.visible=!1,qi.visible=!1,sc.visible=!1,Ei.visible=!1,wi.visible=!1,ci.visible=!1,tc.opacity=0,hi.material.opacity=0,ic.opacity=0;for(let c of Ei.children)c.material.opacity=0;if(m.shutdown>.5){let c=vt(.5,.92,m.shutdown);wi.visible=!0,wi.position.set(0,.34,0),wi.scale.setScalar(Xn(22,.035,c)),K.pulseStrength.value=Math.max(K.pulseStrength.value,(1-c)*1.08);return}let e=m.pulseMode,n=[5.35,4.1,4.35,4,4.9,4.5,4.2,4.05,4.3][e]||4.5;if(m.pulseAge>=n||m.pulseStrength<=.008)return;let s=bt(m.pulseAge/n,0,1),r=Math.pow(1-s,.62)*m.pulseStrength,a=m.pulseOrigin.x,o=m.pulseSourceY,l=m.pulseOrigin.y;if(e===0){let c=Math.max(.01,m.pulseAge*(4.15+m.low*1.7));Ti.visible=!0,Ti.position.set(a,o,l),Ti.scale.setScalar(c)}else if(e===1){Ms.visible=!0,Ms.position.set(a,-.2+o*.2,l),Ms.rotation.y=K.time.value*.11;let c=.2+m.pulseAge*(2.2+m.high*.8);Ms.scale.set(c,5.2+m.pulseAge*1.3,c)}else if(e===2){nc.visible=!0;let c=Math.max(.05,m.pulseAge*2);for(let h=0;h<Vh;h++){let d=h/Vh,u=d*Math.PI*2,p=qn[Math.floor(d*(fn-1))]/255,x=Math.round(d*18)/18*Math.PI*2,_=c+.34+p*2.2+Math.pow(Math.abs(Math.cos(u*4.5)),8)*.95,g=h*6;vs[g]=a+Math.cos(x)*c,vs[g+1]=o+Math.sin(u*5+K.time.value)*.16,vs[g+2]=l+Math.sin(x)*c,vs[g+3]=a+Math.cos(x)*_,vs[g+4]=o+(p-.25)*1.1,vs[g+5]=l+Math.sin(x)*_}Qh.attributes.position.needsUpdate=!0,tc.opacity=r*(.28+m.high*.45)}else if(e===3){hi.visible=!0;let c=.35+m.pulseAge*2.5;for(let h=0;h<kh;h++){let d=h/kh,u=d*Math.PI*2,p=qn[Math.floor(d*(fn-1))]/255,x=.18+p*(2.4+m.low*2.1)+Math.pow(Math.sin(s*Math.PI),2)*.55;ya.position.set(a+Math.cos(u)*c,o-1.7+x*.5,l+Math.sin(u)*c),ya.scale.set(.7+p*.45,x,.7+p*.45),ya.rotation.y=-u,ya.updateMatrix(),hi.setMatrixAt(h,ya.matrix)}hi.instanceMatrix.needsUpdate=!0,hi.material.opacity=r*(.22+m.mid*.38)}else if(e===4)qi.visible=!0,qi.position.set(a,o,l),qi.rotation.y=K.time.value*.18,qi.rotation.x=Math.sin(K.time.value*.11)*.22,qi.scale.setScalar(.45+m.pulseAge*1.02);else if(e===5){sc.visible=!0;for(let c=0;c<Gh;c++){let h=c/(Gh-1),d=c%2,u=(h-.5)*(4.2+m.pulseAge*.7),p=h*Math.PI*8+K.time.value*(d?-1.1:.9)+d*Math.PI,x=qn[Math.floor(h*(fn-1))]/255,_=.6+m.pulseAge*.62+x*.38,g=p+.13,f=c*6;_s[f]=a+Math.cos(p)*_,_s[f+1]=o+u,_s[f+2]=l+Math.sin(p)*_,_s[f+3]=a+Math.cos(g)*_,_s[f+4]=o+u+.045,_s[f+5]=l+Math.sin(g)*_}eu.attributes.position.needsUpdate=!0,ic.opacity=r*(.25+m.mid*.52)}else if(e===6){Ei.visible=!0,Ei.position.set(a,o,l),Ei.rotation.y=K.time.value*.07;for(let c of Ei.children){let h=c.userData.index,d=vt(h/12,h/12+.32,s)*(1-vt(.62+h/30,1,s)),u=(h-4)*(.18+m.pulseAge*.12);c.position.set(Math.sin(h*1.7)*m.pulseAge*.08,(h-4)*.12,u),c.rotation.z=(h-4)*.035+Math.sin(K.time.value*.4+h)*.02,c.scale.setScalar(.62+m.pulseAge*.52+h*.025),c.material.opacity=d*r*(.25+m.high*.42)}}else if(e===7){wi.visible=!0,wi.position.set(a,o,l);let c=Xn(18+m.high*3,.18,Ji(0,1,s));wi.scale.set(c*1.15,c*.58,c)}else{ci.visible=!0,ci.position.set(a,o,l),ci.rotation.x=Math.PI/2+Math.sin(K.time.value*.17)*.18,ci.rotation.y=K.time.value*-.12;let c=Xn(10.5,.15,Ji(0,1,s));ci.scale.set(c*1.25,c*.72,c),ci.material.opacity=r*(.22+m.high*.35)}}function L_(i,e){Cf.rotation.y+=i*.0018,nu.rotation.y-=i*.0032,Rf.rotation.y+=i*7e-4;let t=[.0185,.0205,.019,.024,.018,.021,.023,.026,.03];ln.fog.density=Qt(ln.fog.density,t[m.tideIndex]+m.dive*.0035+m.phaseTransition*.0025,1.8,i);for(let l=0;l<qh.length;l++){let c=qh[l];c.rotation.z+=i*(.0014+l*24e-5)*(l%2?-1:1),c.rotation.y+=i*8e-4,c.material.color.copy(l%3===0?K.glowColor.value:K.secondaryColor.value);let h=m.pulseAge<4.5?m.pulseStrength*Math.exp(-Math.abs(l-m.pulseAge*1.15)*.72):0;c.material.opacity=(.005+m.high*.007+h*.055+m.phaseTransition*.025)*m.ritual*(1-m.shutdown)}ec.emissive.copy(K.secondaryColor.value),ec.emissiveIntensity=(.035+m.low*.22)*m.ritual*(1-m.shutdown),ec.opacity=.34+m.ritual*.28,Kh.forEach((l,c)=>{l.rotation.z+=i*(.004+c*.002)*(c%2?-1:1),l.material.opacity=(.018+m.high*.06+(m.pulseAge<3?m.pulseStrength*.075:0))*m.ritual*(1-m.shutdown)}),hc.intensity=.55*m.ritual*(1-m.shutdown)+m.high*1.6+m.phaseTransition*1.8,Pf.intensity=.035+m.ritual*.115;let n=[.52,.64,.58,.49,.68,.6,.5,.72,.38];Pn.strength=((_t?.42:n[m.tideIndex])+m.energy*.54+m.archiveOpen*.05+m.phaseTransition*.65)*(.22+m.lightLevel*.78)*(1-vt(.78,1,m.shutdown)*.72),Pn.radius=.64+m.high*.1+m.phaseTransition*.15+m.shutdown*.08;let s=m.tideIndex===5?.905:m.tideIndex===7?.925:m.tideIndex===8?.94:.86;pn.uniforms.damp.value=m.shutdown>.45?Xn(.9,.982,vt(.45,.9,m.shutdown)):s+m.high*.018+m.phaseTransition*.035;let r=[.86,.8,.76,.68,.88,.8,.7,.74,.54];Ze.toneMappingExposure=(.025+m.lightLevel*(r[m.tideIndex]+m.energy*.1+m.phaseTransition*.12))*(1-vt(.76,1,m.shutdown)*.96);let a=vt(.72,1,m.shutdown),o=Math.max(1-m.lightLevel,a);document.documentElement.style.setProperty("--blackout",o.toFixed(4))}function D_(){if(pf||m.dragging||!m.calibrated||m.ending)return;Sa.setFromCamera(Wn,tn);let i=Sa.intersectObject(Ki,!1).length>0;i!==m.coreHovered&&(m.coreHovered=i,j.cursor.classList.toggle("active",i))}function N_(){let i=zf(),e=m.audioReady?j.audio.currentTime:m.activeSeconds%i;j.timeNow.textContent=zh(e),j.timeTotal.textContent=zh(i);let t=i>0?bt(e/i,0,1):0;document.documentElement.style.setProperty("--progress",`${(t*100).toFixed(3)}%`),j.index.textContent=`09\u2013${String(Math.floor(t*9999)).padStart(4,"0")}`}function Hf(i,e){m.activeSeconds+=i,K.time.value=e,m.previewMode==="main"?(m.ritual=1,m.ignite=1,m.lightLevel=1,K.ritual.value=1,K.ignite.value=1):m.previewMode==="ending"&&(m.ritual=1,m.ignite=1,m.lightLevel=1,m.shutdown=Math.max(m.shutdown,.68),K.ritual.value=1,K.ignite.value=1,K.shutdown.value=m.shutdown),M_(i,e),w_(i),E_(),T_(e,i),A_(i),R_(i,e),P_(i,e),I_(i),L_(i,e),D_(),N_()}function Vf(i,e){Hf(i,e),bn.render(i),Yh++}function U_(i){if(kt=null,In||uc||wa)return;xr.update(i);let e=bt(xr.getDelta(),0,.05),t=xr.getElapsed();Vf(e,t),f_(i),au()}function F_(){let i=innerWidth,e=innerHeight;tn.aspect=i/e,tn.updateProjectionMatrix();let t=Math.min(devicePixelRatio,_t?1.15:1.6);Ze.setPixelRatio(t),Ze.setSize(i,e),bn.setSize(i,e),K.pixelRatio.value=t,K.resolution.value.set(i*t,e*t)}window.addEventListener("resize",F_);function ou(i,e){if(!["opening","main","ending"].includes(i))throw new TypeError(`Unknown Ninth Tide preview mode: ${String(i)}`);if(!Number.isInteger(e)||e<0||e>8)throw new RangeError(`Ninth Tide preview section must be an integer from 0 through 8; received ${String(e)}.`);m.previewMode=i,m.previewSection=e,m.tideIndex=e,m.transitionFrom=e,m.pendingTide=-1,m.phaseLocal=0,m.phaseTransition=0,m.transitionClock=99,m.transitionSwitched=!1,m.shutdown=0,m.ending=!1,m.ended=!1,m.endingCue=0,m.ceremonyCue=0,m.archiveOpen=0,K.section.value=e,K.sectionLocal.value=0,K.phaseTransition.value=0,K.shutdown.value=0,Ca=-1,m.entered=!0,m.calibrated=i!=="opening",m.ceremonyTime=i==="opening"?5.75:99,m.ritual=i==="opening"?.73:1,m.ignite=i==="opening"?.44:1,m.lightLevel=i==="opening"?.72:1,m.archiveOpenTarget=i==="main"?.76:.45,m.diveTarget=i==="main"?.28:.2,K.ritual.value=m.ritual,K.ignite.value=m.ignite,document.body.classList.add("entered"),document.body.classList.toggle("calibrated",m.calibrated),document.body.classList.toggle("ending",i==="ending"),document.body.classList.remove("ended"),document.documentElement.style.setProperty("--blackout",i==="opening"?"0.28":"0");let t=Ma[e];j.phaseNumber.textContent=t[0],j.phaseName.textContent=t[1],j.phaseSub.textContent=t[2],j.sideTicks.forEach((n,s)=>n.classList.toggle("active",s===e)),$i(new ue(0,0),i==="ending"?.45:1.15,.34,!1)}var O_=Object.freeze(["opacity","emissiveIntensity","roughness","metalness","linewidth","size","rotation","alphaTest"]),B_=Object.freeze(["color","emissive","specular"]);function z_(i){return i===null||["number","string","boolean"].includes(typeof i)?Object.freeze({kind:"primitive",value:i}):i instanceof Ee?Object.freeze({kind:"color",value:Object.freeze([i.r,i.g,i.b])}):i instanceof ue||i instanceof I||i instanceof St?Object.freeze({kind:"vector",value:Object.freeze(i.toArray())}):i instanceof Tn?Object.freeze({kind:"quaternion",value:Object.freeze(i.toArray())}):i instanceof On?Object.freeze({kind:"euler",value:Object.freeze([i.x,i.y,i.z,i.order])}):Object.freeze({kind:"reference",value:i})}function H_(i,e,t,n){if(t.kind==="primitive")i[e]=t.value;else if(t.kind==="color")i[e].setRGB(...t.value);else if(t.kind==="vector"||t.kind==="quaternion")i[e].fromArray(t.value);else if(t.kind==="euler")i[e].set(...t.value);else if(i[e]!==t.value)throw new Error(`Ninth Tide deterministic baseline reference changed: ${n}.`)}function Zh(i){return Object.freeze(Object.fromEntries(Object.entries(i).map(([e,t])=>[e,z_(t)])))}function $h(i,e,t){let n=Object.keys(i).sort(),s=Object.keys(e).sort();if(n.length!==s.length||n.some((r,a)=>r!==s[a]))throw new Error(`Ninth Tide deterministic ${t} shape changed.`);for(let r of s)H_(i,r,e[r],`${t}.${r}`)}function V_(i){let e={},t={};for(let n of O_)typeof i[n]=="number"&&(e[n]=i[n]);for(let n of B_)i[n]instanceof Ee&&(t[n]=Object.freeze(i[n].toArray()));return Object.freeze({material:i,scalars:Object.freeze(e),colors:Object.freeze(t),uniforms:i.uniforms?Zh(Object.fromEntries(Object.entries(i.uniforms).map(([n,s])=>[n,s.value]))):null})}function k_(i){for(let[e,t]of Object.entries(i.scalars))i.material[e]=t;for(let[e,t]of Object.entries(i.colors))i.material[e].fromArray(t);if(i.uniforms){let e=Object.fromEntries(Object.entries(i.material.uniforms).map(([t,n])=>[t,n.value]));$h(e,i.uniforms,`material ${i.material.uuid} uniforms`);for(let[t,n]of Object.entries(e))i.material.uniforms[t].value=n}}function G_(){let i=[],e=new Map,t=new Map,n=s=>{i.push(Object.freeze({object:s,position:Object.freeze(s.position.toArray()),quaternion:Object.freeze(s.quaternion.toArray()),scale:Object.freeze(s.scale.toArray()),visible:s.visible,intensity:typeof s.intensity=="number"?s.intensity:null,color:s.color instanceof Ee?Object.freeze(s.color.toArray()):null,instanceMatrix:s.isInstancedMesh?new s.instanceMatrix.array.constructor(s.instanceMatrix.array):null,instanceColor:s.isInstancedMesh&&s.instanceColor?new s.instanceColor.array.constructor(s.instanceColor.array):null}));let r=Array.isArray(s.material)?s.material:s.material?[s.material]:[];for(let a of r)e.has(a.uuid)||e.set(a.uuid,V_(a));if(s.geometry&&!t.has(s.geometry.uuid)){let a=Object.fromEntries(Object.entries(s.geometry.attributes).map(([o,l])=>[o,Object.freeze({attribute:l,array:new l.array.constructor(l.array)})]));t.set(s.geometry.uuid,Object.freeze({geometry:s.geometry,attributes:Object.freeze(a)}))}};return ln.traverse(n),n(tn),Object.freeze({objects:Object.freeze(i),materials:Object.freeze([...e.values()]),geometries:Object.freeze([...t.values()])})}function W_(i){for(let e of i.objects){if(e.object.position.fromArray(e.position),e.object.quaternion.fromArray(e.quaternion),e.object.scale.fromArray(e.scale),e.object.visible=e.visible,e.intensity!==null&&(e.object.intensity=e.intensity),e.color&&e.object.color.fromArray(e.color),e.instanceMatrix&&(e.object.instanceMatrix.array.set(e.instanceMatrix),e.object.instanceMatrix.needsUpdate=!0),e.instanceColor){if(!e.object.instanceColor||e.object.instanceColor.array.length!==e.instanceColor.length)throw new Error(`Ninth Tide deterministic instance color changed: ${e.object.uuid}.`);e.object.instanceColor.array.set(e.instanceColor),e.object.instanceColor.needsUpdate=!0}e.object.updateMatrix()}for(let e of i.materials)k_(e);for(let e of i.geometries)for(let[t,n]of Object.entries(e.attributes)){let s=e.geometry.getAttribute(t);if(s!==n.attribute||s.array.length!==n.array.length)throw new Error(`Ninth Tide deterministic geometry attribute changed: ${e.geometry.uuid}.${t}.`);s.array.set(n.array),s.needsUpdate=!0}ln.updateMatrixWorld(!0),tn.updateMatrixWorld(!0)}function X_(){let i=[...new Set([...Object.values(j).flatMap(e=>Array.isArray(e)?e:[e]),...j.sideTicks])];return Object.freeze({rootClassName:document.documentElement.className,rootStyle:document.documentElement.getAttribute("style"),bodyClassName:document.body.className,bodyStyle:document.body.getAttribute("style"),elements:Object.freeze(i.map(e=>Object.freeze({element:e,className:e.className,style:e.getAttribute("style"),textContent:e instanceof HTMLAudioElement||e instanceof HTMLInputElement||e.children.length>0?null:e.textContent,hidden:"hidden"in e?e.hidden:null,disabled:"disabled"in e?e.disabled:null})))})}function Oh(i,e,t){t===null?i.removeAttribute(e):i.setAttribute(e,t)}function q_(i){document.documentElement.className=i.rootClassName,Oh(document.documentElement,"style",i.rootStyle),document.body.className=i.bodyClassName,Oh(document.body,"style",i.bodyStyle);for(let e of i.elements)e.element.className=e.className,Oh(e.element,"style",e.style),e.textContent!==null&&(e.element.textContent=e.textContent),e.hidden!==null&&(e.element.hidden=e.hidden),e.disabled!==null&&(e.element.disabled=e.disabled)}function kf(){if(!(pn._textureComp instanceof xt)||!(pn._textureOld instanceof xt)||pn._textureComp===pn._textureOld)throw new Error("Ninth Tide deterministic capture requires two distinct Afterimage render targets.")}function Y_(i){if(!(i instanceof xt))throw new Error("Ninth Tide deterministic capture encountered an invalid render target.");Ze.setRenderTarget(i),Ze.clear(!0,!0,!0)}function Z_(i){kf();let e=Ze.getRenderTarget(),t=Ze.getClearColor(new Ee).clone(),n=Ze.getClearAlpha();Ze.setClearColor(0,0),bn.readBuffer=i.composerReadBuffer,bn.writeBuffer=i.composerWriteBuffer;let s=new Set([bn.renderTarget1,bn.renderTarget2,pn._textureComp,pn._textureOld,Pn.renderTargetBright,...Pn.renderTargetsHorizontal,...Pn.renderTargetsVertical]);for(let r of s)Y_(r);Ze.setClearColor(t,n),Ze.setRenderTarget(e)}function $_(i){return[...i].map(e=>e.toString(16).padStart(2,"0")).join("")}async function Gf(i){if(!crypto.subtle||typeof crypto.subtle.digest!="function")throw new Error("Ninth Tide deterministic capture requires crypto.subtle.digest().");return $_(new Uint8Array(await crypto.subtle.digest("SHA-256",i)))}async function J_(i){let e=i.drawingBufferWidth,t=i.drawingBufferHeight;if(!Number.isInteger(e)||e<=0||!Number.isInteger(t)||t<=0)throw new Error("Ninth Tide deterministic capture requires a non-empty drawing buffer.");let n=new Uint8Array(e*t*4);if(i.readPixels(0,0,e,t,i.RGBA,i.UNSIGNED_BYTE,n),i.getError()!==i.NO_ERROR)throw new Error("Ninth Tide framebuffer readPixels failed.");let s=new Uint8Array(14+n.length);s.set(new TextEncoder().encode("rgba8\0"),0);let r=new DataView(s.buffer,0,14);r.setUint32(6,e,!1),r.setUint32(10,t,!1);let a=e*4;for(let o=0;o<t;o++){let l=t-1-o;s.set(n.subarray(l*a,(l+1)*a),14+o*a)}return{width:e,height:t,hash:await Gf(s)}}function K_(i){let e=i.getExtension("WEBGL_debug_renderer_info");if(!e)throw new Error("Ninth Tide deterministic capture requires WEBGL_debug_renderer_info.");let t=i.getParameter(e.UNMASKED_RENDERER_WEBGL),n=i.getContextAttributes();if(typeof t!="string"||t.length===0||!n)throw new Error("Ninth Tide deterministic capture could not audit the WebGL renderer.");return{raw:t,debugInfoAvailable:!0,contextAttributes:{...n}}}_r&&(kf(),Ki.geometry.boundingSphere===null&&Ki.geometry.computeBoundingSphere());var lt=_r?Object.freeze({state:Zh(m),globals:Zh(Object.fromEntries(Object.entries(K).map(([i,e])=>[i,e.value]))),scene:G_(),dom:X_(),pointer:Object.freeze(Wn.toArray()),pointerSmooth:Object.freeze(Yi.toArray()),spectrum:new Uint8Array(qn),randomState:Jh.getState(),lastTide:Ca,frameStats:Object.freeze({...jt}),audioContext:Ct,analyser:Kt,frequencyData:en,timeData:Ss,rendererTarget:Ze.getRenderTarget(),rendererExposure:Ze.toneMappingExposure,fogDensity:ln.fog.density,bloomStrength:Pn.strength,bloomRadius:Pn.radius,bloomThreshold:Pn.threshold,afterimageDamp:pn.uniforms.damp.value,composerReadBuffer:bn.readBuffer,composerWriteBuffer:bn.writeBuffer,afterimageTextureComp:pn._textureComp,afterimageTextureOld:pn._textureOld,drawingBufferWidth:Ze.getContext().drawingBufferWidth,drawingBufferHeight:Ze.getContext().drawingBufferHeight}):null;function j_(){if(!lt)throw new Error("Ninth Tide deterministic baseline is unavailable.");if(clearTimeout(mn.timer),mn.timer=void 0,Ct!==lt.audioContext||Kt!==lt.analyser||en!==lt.frequencyData||Ss!==lt.timeData)throw new Error("Ninth Tide audio graph changed after deterministic baseline capture.");let i=Ze.getContext();if(i.drawingBufferWidth!==lt.drawingBufferWidth||i.drawingBufferHeight!==lt.drawingBufferHeight)throw new Error("Ninth Tide deterministic capture viewport changed after baseline capture.");j.audio.pause(),$h(m,lt.state,"state");let e=Object.fromEntries(Object.entries(K).map(([t,n])=>[t,n.value]));$h(e,lt.globals,"globals");for(let[t,n]of Object.entries(e))K[t].value=n;W_(lt.scene),q_(lt.dom),Wn.fromArray(lt.pointer),Yi.fromArray(lt.pointerSmooth),qn.set(lt.spectrum),ji.needsUpdate=!0,Jh.setState(lt.randomState),Ca=lt.lastTide,Object.assign(jt,lt.frameStats),jt.sampleStartedAt=0,jt.sampleFrames=0,ln.fog.density=lt.fogDensity,Pn.strength=lt.bloomStrength,Pn.radius=lt.bloomRadius,Pn.threshold=lt.bloomThreshold,pn.uniforms.damp.value=lt.afterimageDamp,pn._textureComp=lt.afterimageTextureComp,pn._textureOld=lt.afterimageTextureOld,Ze.toneMappingExposure=lt.rendererExposure,Ze.setRenderTarget(lt.rendererTarget),Z_(lt)}function Q_(i,e,t){return{mode:i,section:e,timestampMs:t,state:{ritual:m.ritual,ignite:m.ignite,lightLevel:m.lightLevel,shutdown:m.shutdown,archiveOpen:m.archiveOpen,pulseAge:m.pulseAge,pulseStrength:m.pulseStrength,low:m.low,mid:m.mid,high:m.high,rms:m.rms,energy:m.energy,transient:m.transient,tideIndex:m.tideIndex,tideFloat:m.tideFloat,phaseLocal:m.phaseLocal,phaseTransition:m.phaseTransition,dive:m.dive,yaw:m.yaw,pitch:m.pitch,activeSeconds:m.activeSeconds,syntheticPhase:m.syntheticPhase},globals:{time:K.time.value,section:K.section.value,sectionLocal:K.sectionLocal.value,tide:K.tide.value,open:K.open.value,pulseAge:K.pulseAge.value,pulseStrength:K.pulseStrength.value},camera:{position:tn.position.toArray(),quaternion:tn.quaternion.toArray()},spectrum:[...qn]}}async function ey(i,e,t){let n=new TextEncoder().encode(JSON.stringify(Q_(i,e,t)));return Gf(n)}function ty(i){if(!Ta(i,["mode","section","timestampMs"]))throw new Error("Ninth Tide deterministic step requires exactly mode, section, and timestampMs.");if(!["opening","main","ending"].includes(i.mode))throw new TypeError(`Unknown Ninth Tide deterministic mode: ${String(i.mode)}.`);if(!Number.isInteger(i.section)||i.section<0||i.section>8)throw new RangeError(`Ninth Tide deterministic section must be an integer from 0 through 8; received ${String(i.section)}.`);if(typeof i.timestampMs!="number"||!Number.isFinite(i.timestampMs)||i.timestampMs<0)throw new RangeError(`Ninth Tide deterministic timestampMs must be finite and non-negative; received ${String(i.timestampMs)}.`)}async function ny(i){if(wa)throw new Error("Ninth Tide deterministic step is already running.");ty(i),wa=!0;try{if(kt!==null&&cancelAnimationFrame(kt),kt=null,j_(),ou(i.mode,i.section),i.mode==="main"){let l=.016666666666666666,c=i.timestampMs/1e3;for(let h=0;h<ff;h++)Hf(l,c-(ff-h)*l)}let e=Yh;Ze.info.reset(),Ze.setRenderTarget(null),Vf(1/60,i.timestampMs/1e3);let t=Yh-e;if(t!==1)throw new Error(`Ninth Tide deterministic step rendered ${t} top-level frames.`);if(kt!==null)throw cancelAnimationFrame(kt),kt=null,new Error("Ninth Tide deterministic step queued an animation frame.");let n=Ze.getContext(),s=K_(n);n.finish();let r=await J_(n),a=await ey(i.mode,i.section,i.timestampMs);Ze.setRenderTarget(lt.rendererTarget);let o=i.mode==="opening"?Ma[0][0]:i.mode==="ending"?Ma[8][0]:Ma[i.section][0];return{mode:i.mode,section:i.section,timestampMs:i.timestampMs,frameRenders:t,queuedAnimationFrames:kt===null?0:1,stateDigest:a,framebuffer:r,renderer:s,chapter:{mode:i.mode,section:i.section,phase:o},chapterNumber:i.section+1}}finally{kt!==null&&cancelAnimationFrame(kt),kt=null,Ze.setRenderTarget(lt.rendererTarget),wa=!1}}function iy(i){if(!Ta(i,["clientX","clientY"])||typeof i.clientX!="number"||!Number.isFinite(i.clientX)||typeof i.clientY!="number"||!Number.isFinite(i.clientY))throw new Error("Ninth Tide hit test requires finite clientX and clientY values.");let e=Ze.domElement.getBoundingClientRect();if(!(e.width>0)||!(e.height>0))throw new Error("Ninth Tide hit test requires a visible renderer canvas.");let t=new ue((i.clientX-e.left)/e.width*2-1,-((i.clientY-e.top)/e.height)*2+1),n=new sr;return n.setFromCamera(t,tn),n.intersectObject(Ki,!1).length>0}if(_r){uc=!0;let i=mf??Ql.get("preview"),e,t=window.__NINTH_TIDE_PREVIEW_SECTION__;if(t!==void 0){if(!Number.isInteger(t)||t<0||t>8)throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(t)}.`);e=t}else if(Ql.has("section")){let n=Ql.get("section");if(!/^[0-8]$/.test(n))throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(n)}.`);e=Number(n)}else e=i==="ending"?8:i==="opening"?0:4;ou(i,e),window.__NINTH_TIDE_STEP__=ny,window.__NINTH_TIDE_HIT_TEST__=iy}x_();ru();_r||au();window.addEventListener("beforeunload",()=>{document.removeEventListener("visibilitychange",Uf),window.removeEventListener("message",Ff),kt!==null&&cancelAnimationFrame(kt),di&&URL.revokeObjectURL(di),xr.dispose(),Ze.dispose()});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
