(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const d of u.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();function $_(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var Nh={exports:{}},xl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bv;function r1(){if(Bv)return xl;Bv=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,u){var d=null;if(u!==void 0&&(d=""+u),l.key!==void 0&&(d=""+l.key),"key"in l){u={};for(var h in l)h!=="key"&&(u[h]=l[h])}else u=l;return l=u.ref,{$$typeof:o,type:s,key:d,ref:l!==void 0?l:null,props:u}}return xl.Fragment=t,xl.jsx=i,xl.jsxs=i,xl}var Fv;function o1(){return Fv||(Fv=1,Nh.exports=r1()),Nh.exports}var p=o1(),Dh={exports:{}},ft={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hv;function l1(){if(Hv)return ft;Hv=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),d=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),v=Symbol.for("react.view_transition"),M=Symbol.iterator;function A(B){return B===null||typeof B!="object"?null:(B=M&&B[M]||B["@@iterator"],typeof B=="function"?B:null)}var N={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,b={};function L(B,re,Se){this.props=B,this.context=re,this.refs=b,this.updater=Se||N}L.prototype.isReactComponent={},L.prototype.setState=function(B,re){if(typeof B!="object"&&typeof B!="function"&&B!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,B,re,"setState")},L.prototype.forceUpdate=function(B){this.updater.enqueueForceUpdate(this,B,"forceUpdate")};function k(){}k.prototype=L.prototype;function R(B,re,Se){this.props=B,this.context=re,this.refs=b,this.updater=Se||N}var U=R.prototype=new k;U.constructor=R,S(U,L.prototype),U.isPureReactComponent=!0;var P=Array.isArray;function F(){}var T={H:null,A:null,T:null,S:null},I=Object.prototype.hasOwnProperty;function j(B,re,Se){var G=Se.ref;return{$$typeof:o,type:B,key:re,ref:G!==void 0?G:null,props:Se}}function W(B,re){return j(B.type,re,B.props)}function ae(B){return typeof B=="object"&&B!==null&&B.$$typeof===o}function q(B){var re={"=":"=0",":":"=2"};return"$"+B.replace(/[=:]/g,function(Se){return re[Se]})}var Y=/\/+/g;function ne(B,re){return typeof B=="object"&&B!==null&&B.key!=null?q(""+B.key):re.toString(36)}function Q(B){switch(B.status){case"fulfilled":return B.value;case"rejected":throw B.reason;default:switch(typeof B.status=="string"?B.then(F,F):(B.status="pending",B.then(function(re){B.status==="pending"&&(B.status="fulfilled",B.value=re)},function(re){B.status==="pending"&&(B.status="rejected",B.reason=re)})),B.status){case"fulfilled":return B.value;case"rejected":throw B.reason}}throw B}function J(B,re,Se,G,ee){var be=typeof B;(be==="undefined"||be==="boolean")&&(B=null);var Ne=!1;if(B===null)Ne=!0;else switch(be){case"bigint":case"string":case"number":Ne=!0;break;case"object":switch(B.$$typeof){case o:case t:Ne=!0;break;case y:return Ne=B._init,J(Ne(B._payload),re,Se,G,ee)}}if(Ne)return ee=ee(B),Ne=G===""?"."+ne(B,0):G,P(ee)?(Se="",Ne!=null&&(Se=Ne.replace(Y,"$&/")+"/"),J(ee,re,Se,"",function(ut){return ut})):ee!=null&&(ae(ee)&&(ee=W(ee,Se+(ee.key==null||B&&B.key===ee.key?"":(""+ee.key).replace(Y,"$&/")+"/")+Ne)),re.push(ee)),1;Ne=0;var ge=G===""?".":G+":";if(P(B))for(var Ce=0;Ce<B.length;Ce++)G=B[Ce],be=ge+ne(G,Ce),Ne+=J(G,re,Se,be,ee);else if(Ce=A(B),typeof Ce=="function")for(B=Ce.call(B),Ce=0;!(G=B.next()).done;)G=G.value,be=ge+ne(G,Ce++),Ne+=J(G,re,Se,be,ee);else if(be==="object"){if(typeof B.then=="function")return J(Q(B),re,Se,G,ee);throw re=String(B),Error("Objects are not valid as a React child (found: "+(re==="[object Object]"?"object with keys {"+Object.keys(B).join(", ")+"}":re)+"). If you meant to render a collection of children, use an array instead.")}return Ne}function me(B,re,Se){if(B==null)return B;var G=[],ee=0;return J(B,G,"","",function(be){return re.call(Se,be,ee++)}),G}function ue(B){if(B._status===-1){var re=B._result,Se=re();Se.then(function(G){(B._status===0||B._status===-1)&&(B._status=1,B._result=G,Se.status===void 0&&(Se.status="fulfilled",Se.value=G))},function(G){(B._status===0||B._status===-1)&&(B._status=2,B._result=G,Se.status===void 0&&(Se.status="rejected",Se.reason=G))}),B._status===-1&&(B._status=0,B._result=Se)}if(B._status===1)return B._result.default;throw B._result}var O=typeof reportError=="function"?reportError:function(B){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var re=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof B=="object"&&B!==null&&typeof B.message=="string"?String(B.message):String(B),error:B});if(!window.dispatchEvent(re))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",B);return}console.error(B)};function D(B){var re=T.T,Se={};Se.types=re!==null?re.types:null,T.T=Se;try{var G=B(),ee=T.S;ee!==null&&ee(Se,G),typeof G=="object"&&G!==null&&typeof G.then=="function"&&G.then(F,O)}catch(be){O(be)}finally{re!==null&&Se.types!==null&&(re.types=Se.types),T.T=re}}function _e(B){var re=T.T;if(re!==null){var Se=re.types;Se===null?re.types=[B]:Se.indexOf(B)===-1&&Se.push(B)}else D(_e.bind(null,B))}var we={map:me,forEach:function(B,re,Se){me(B,function(){re.apply(this,arguments)},Se)},count:function(B){var re=0;return me(B,function(){re++}),re},toArray:function(B){return me(B,function(re){return re})||[]},only:function(B){if(!ae(B))throw Error("React.Children.only expected to receive a single React element child.");return B}};return ft.Activity=x,ft.Children=we,ft.Component=L,ft.Fragment=i,ft.Profiler=l,ft.PureComponent=R,ft.StrictMode=s,ft.Suspense=g,ft.ViewTransition=v,ft.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,ft.__COMPILER_RUNTIME={__proto__:null,c:function(B){return T.H.useMemoCache(B)}},ft.addTransitionType=_e,ft.cache=function(B){return function(){return B.apply(null,arguments)}},ft.cacheSignal=function(){return null},ft.cloneElement=function(B,re,Se){if(B==null)throw Error("The argument must be a React element, but you passed "+B+".");var G=S({},B.props),ee=B.key;if(re!=null)for(be in re.key!==void 0&&(ee=""+re.key),re)!I.call(re,be)||be==="key"||be==="__self"||be==="__source"||be==="ref"&&re.ref===void 0||(G[be]=re[be]);var be=arguments.length-2;if(be===1)G.children=Se;else if(1<be){for(var Ne=Array(be),ge=0;ge<be;ge++)Ne[ge]=arguments[ge+2];G.children=Ne}return j(B.type,ee,G)},ft.createContext=function(B){return B={$$typeof:d,_currentValue:B,_currentValue2:B,_threadCount:0,Provider:null,Consumer:null},B.Provider=B,B.Consumer={$$typeof:u,_context:B},B},ft.createElement=function(B,re,Se){var G,ee={},be=null;if(re!=null)for(G in re.key!==void 0&&(be=""+re.key),re)I.call(re,G)&&G!=="key"&&G!=="__self"&&G!=="__source"&&(ee[G]=re[G]);var Ne=arguments.length-2;if(Ne===1)ee.children=Se;else if(1<Ne){for(var ge=Array(Ne),Ce=0;Ce<Ne;Ce++)ge[Ce]=arguments[Ce+2];ee.children=ge}if(B&&B.defaultProps)for(G in Ne=B.defaultProps,Ne)ee[G]===void 0&&(ee[G]=Ne[G]);return j(B,be,ee)},ft.createRef=function(){return{current:null}},ft.forwardRef=function(B){return{$$typeof:h,render:B}},ft.isValidElement=ae,ft.lazy=function(B){return{$$typeof:y,_payload:{_status:-1,_result:B},_init:ue}},ft.memo=function(B,re){return{$$typeof:m,type:B,compare:re===void 0?null:re}},ft.startTransition=D,ft.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},ft.use=function(B){return T.H.use(B)},ft.useActionState=function(B,re,Se){return T.H.useActionState(B,re,Se)},ft.useCallback=function(B,re){return T.H.useCallback(B,re)},ft.useContext=function(B){return T.H.useContext(B)},ft.useDebugValue=function(){},ft.useDeferredValue=function(B,re){return T.H.useDeferredValue(B,re)},ft.useEffect=function(B,re){return T.H.useEffect(B,re)},ft.useEffectEvent=function(B){return T.H.useEffectEvent(B)},ft.useId=function(){return T.H.useId()},ft.useImperativeHandle=function(B,re,Se){return T.H.useImperativeHandle(B,re,Se)},ft.useInsertionEffect=function(B,re){return T.H.useInsertionEffect(B,re)},ft.useLayoutEffect=function(B,re){return T.H.useLayoutEffect(B,re)},ft.useMemo=function(B,re){return T.H.useMemo(B,re)},ft.useOptimistic=function(B,re){return T.H.useOptimistic(B,re)},ft.useReducer=function(B,re,Se){return T.H.useReducer(B,re,Se)},ft.useRef=function(B){return T.H.useRef(B)},ft.useState=function(B){return T.H.useState(B)},ft.useSyncExternalStore=function(B,re,Se){return T.H.useSyncExternalStore(B,re,Se)},ft.useTransition=function(){return T.H.useTransition()},ft.version="19.3.0",ft}var Gv;function dm(){return Gv||(Gv=1,Dh.exports=l1()),Dh.exports}var Pe=dm();const c1=$_(Pe);var Uh={exports:{}},vl={},Lh={exports:{}},Oh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vv;function u1(){return Vv||(Vv=1,(function(o){function t(Q,J){var me=Q.length;Q.push(J);e:for(;0<me;){var ue=me-1>>>1,O=Q[ue];if(0<l(O,J))Q[ue]=J,Q[me]=O,me=ue;else break e}}function i(Q){return Q.length===0?null:Q[0]}function s(Q){if(Q.length===0)return null;var J=Q[0],me=Q.pop();if(me!==J){Q[0]=me;e:for(var ue=0,O=Q.length,D=O>>>1;ue<D;){var _e=2*(ue+1)-1,we=Q[_e],B=_e+1,re=Q[B];if(0>l(we,me))B<O&&0>l(re,we)?(Q[ue]=re,Q[B]=me,ue=B):(Q[ue]=we,Q[_e]=me,ue=_e);else if(B<O&&0>l(re,me))Q[ue]=re,Q[B]=me,ue=B;else break e}}return J}function l(Q,J){var me=Q.sortIndex-J.sortIndex;return me!==0?me:Q.id-J.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;o.unstable_now=function(){return u.now()}}else{var d=Date,h=d.now();o.unstable_now=function(){return d.now()-h}}var g=[],m=[],y=1,x=null,v=3,M=!1,A=!1,N=!1,S=!1,b=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;function R(Q){for(var J=i(m);J!==null;){if(J.callback===null)s(m);else if(J.startTime<=Q)s(m),J.sortIndex=J.expirationTime,t(g,J);else break;J=i(m)}}function U(Q){if(N=!1,R(Q),!A)if(i(g)!==null)A=!0,P||(P=!0,ae());else{var J=i(m);J!==null&&ne(U,J.startTime-Q)}}var P=!1,F=-1,T=5,I=-1;function j(){return S?!0:!(o.unstable_now()-I<T)}function W(){if(S=!1,P){var Q=o.unstable_now();I=Q;var J=!0;try{e:{A=!1,N&&(N=!1,L(F),F=-1),M=!0;var me=v;try{t:{for(R(Q),x=i(g);x!==null&&!(x.expirationTime>Q&&j());){var ue=x.callback;if(typeof ue=="function"){x.callback=null,v=x.priorityLevel;var O=ue(x.expirationTime<=Q);if(Q=o.unstable_now(),typeof O=="function"){x.callback=O,R(Q),J=!0;break t}x===i(g)&&s(g),R(Q)}else s(g);x=i(g)}if(x!==null)J=!0;else{var D=i(m);D!==null&&ne(U,D.startTime-Q),J=!1}}break e}finally{x=null,v=me,M=!1}J=void 0}}finally{J?ae():P=!1}}}var ae;if(typeof k=="function")ae=function(){k(W)};else if(typeof MessageChannel<"u"){var q=new MessageChannel,Y=q.port2;q.port1.onmessage=W,ae=function(){Y.postMessage(null)}}else ae=function(){b(W,0)};function ne(Q,J){F=b(function(){Q(o.unstable_now())},J)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(Q){Q.callback=null},o.unstable_forceFrameRate=function(Q){0>Q||125<Q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<Q?Math.floor(1e3/Q):5},o.unstable_getCurrentPriorityLevel=function(){return v},o.unstable_next=function(Q){switch(v){case 1:case 2:case 3:var J=3;break;default:J=v}var me=v;v=J;try{return Q()}finally{v=me}},o.unstable_requestPaint=function(){S=!0},o.unstable_runWithPriority=function(Q,J){switch(Q){case 1:case 2:case 3:case 4:case 5:break;default:Q=3}var me=v;v=Q;try{return J()}finally{v=me}},o.unstable_scheduleCallback=function(Q,J,me){var ue=o.unstable_now();switch(typeof me=="object"&&me!==null?(me=me.delay,me=typeof me=="number"&&0<me?ue+me:ue):me=ue,Q){case 1:var O=-1;break;case 2:O=250;break;case 5:O=1073741823;break;case 4:O=1e4;break;default:O=5e3}return O=me+O,Q={id:y++,callback:J,priorityLevel:Q,startTime:me,expirationTime:O,sortIndex:-1},me>ue?(Q.sortIndex=me,t(m,Q),i(g)===null&&Q===i(m)&&(N?(L(F),F=-1):N=!0,ne(U,me-ue))):(Q.sortIndex=O,t(g,Q),A||M||(A=!0,P||(P=!0,ae()))),Q},o.unstable_shouldYield=j,o.unstable_wrapCallback=function(Q){var J=v;return function(){var me=v;v=J;try{return Q.apply(this,arguments)}finally{v=me}}}})(Oh)),Oh}var kv;function f1(){return kv||(kv=1,Lh.exports=u1()),Lh.exports}var Ph={exports:{}},Pn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jv;function d1(){if(jv)return Pn;jv=1;var o=dm();function t(y){var x="https://react.dev/errors/"+y;if(1<arguments.length){x+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)x+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+y+"; visit "+x+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal"),u=Symbol.for("react.recoverable"),d=Symbol.for("react.optimistic_key");function h(y,x,v){var M=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:M==null?null:M===d?d:""+M,children:y,containerInfo:x,implementation:v}}var g=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(y,x){if(y==="font")return"";if(typeof x=="string")return x==="use-credentials"?x:""}return Pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Pn.browser=function(y){return{$$typeof:u,_reason:y}},Pn.createPortal=function(y,x){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!x||x.nodeType!==1&&x.nodeType!==9&&x.nodeType!==11)throw Error(t(299));return h(y,x,null,v)},Pn.flushSync=function(y){var x=g.T,v=s.p;try{if(g.T=null,s.p=2,y)return y()}finally{g.T=x,s.p=v,s.d.f()}},Pn.preconnect=function(y,x){typeof y=="string"&&(x?(x=x.crossOrigin,x=typeof x=="string"?x==="use-credentials"?x:"":void 0):x=null,s.d.C(y,x))},Pn.prefetchDNS=function(y){typeof y=="string"&&s.d.D(y)},Pn.preinit=function(y,x){if(typeof y=="string"&&x&&typeof x.as=="string"){var v=x.as,M=m(v,x.crossOrigin),A=typeof x.integrity=="string"?x.integrity:void 0,N=typeof x.fetchPriority=="string"?x.fetchPriority:void 0;v==="style"?s.d.S(y,typeof x.precedence=="string"?x.precedence:void 0,{crossOrigin:M,integrity:A,fetchPriority:N}):v==="script"&&s.d.X(y,{crossOrigin:M,integrity:A,fetchPriority:N,nonce:typeof x.nonce=="string"?x.nonce:void 0})}},Pn.preinitModule=function(y,x){if(typeof y=="string")if(typeof x=="object"&&x!==null){if(x.as==null||x.as==="script"){var v=m(x.as,x.crossOrigin);s.d.M(y,{crossOrigin:v,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0,fetchPriority:typeof x.fetchPriority=="string"?x.fetchPriority:void 0})}}else x==null&&s.d.M(y)},Pn.preload=function(y,x){if(typeof y=="string"&&typeof x=="object"&&x!==null&&typeof x.as=="string"){var v=x.as,M=m(v,x.crossOrigin);s.d.L(y,v,{crossOrigin:M,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0,type:typeof x.type=="string"?x.type:void 0,fetchPriority:typeof x.fetchPriority=="string"?x.fetchPriority:void 0,referrerPolicy:typeof x.referrerPolicy=="string"?x.referrerPolicy:void 0,imageSrcSet:typeof x.imageSrcSet=="string"?x.imageSrcSet:void 0,imageSizes:typeof x.imageSizes=="string"?x.imageSizes:void 0,media:typeof x.media=="string"?x.media:void 0})}},Pn.preloadModule=function(y,x){if(typeof y=="string")if(x){var v=m(x.as,x.crossOrigin);s.d.m(y,{as:typeof x.as=="string"&&x.as!=="script"?x.as:void 0,crossOrigin:v,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0,fetchPriority:typeof x.fetchPriority=="string"?x.fetchPriority:void 0})}else s.d.m(y)},Pn.requestFormReset=function(y){s.d.r(y)},Pn.unstable_batchedUpdates=function(y,x){return y(x)},Pn.useFormState=function(y,x,v){return g.H.useFormState(y,x,v)},Pn.useFormStatus=function(){return g.H.useHostTransitionStatus()},Pn.version="19.3.0",Pn}var Xv;function h1(){if(Xv)return Ph.exports;Xv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),Ph.exports=d1(),Ph.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wv;function p1(){if(Wv)return vl;Wv=1;var o=f1(),t=dm(),i=h1();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function u(e){for(var n=e,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(e=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?e:null}function d(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function h(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function g(e){if(u(e)!==e)throw Error(s(188))}function m(e){var n=e.alternate;if(!n){if(n=u(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,r=n;;){var c=a.return;if(c===null)break;var f=c.alternate;if(f===null){if(r=c.return,r!==null){a=r;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===a)return g(c),e;if(f===r)return g(c),n;f=f.sibling}throw Error(s(188))}if(a.return!==r.return)a=c,r=f;else{for(var _=!1,C=c.child;C;){if(C===a){_=!0,a=c,r=f;break}if(C===r){_=!0,r=c,a=f;break}C=C.sibling}if(!_){for(C=f.child;C;){if(C===a){_=!0,a=f,r=c;break}if(C===r){_=!0,r=f,a=c;break}C=C.sibling}if(!_)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function y(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=y(e),n!==null)return n;e=e.sibling}return null}function x(e,n,a,r,c,f){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&a(e,r,c,f)||(e.tag!==22||e.memoizedState===null)&&(n||e.tag!==5&&e.tag!==27)&&x(e.child,n,a,r,c,f))return!0;e=e.sibling}return!1}function v(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function M(e){var n=!1;for(e=e.return;e!==null&&(e.tag===4&&(n=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return n}function A(e){var n=[null,null],a=v(e);return a===null||N(n,e,a.child,{foundSelf:!1}),n}function N(e,n,a,r){for(;a!==null;){if(a===n)r.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(r.foundSelf)return e[1]=a,!0;e[0]=a}else if((a.tag!==22||a.memoizedState===null)&&N(e,n,a.child,r))return!0;a=a.sibling}return!1}function S(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(s(559))}}var b=null,L=null;function k(e,n,a){return e===a?!0:e===n?(b=e,!0):!1}function R(e,n,a){return e===a?(L=e,!1):e===n?(L!==null&&(b=e),!0):!1}function U(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function P(e,n,a){for(var r=0,c=e;c;c=a(c))r++;c=0;for(var f=n;f;f=a(f))c++;for(;0<r-c;)e=a(e),r--;for(;0<c-r;)n=a(n),c--;for(;r--;){if(e===n||n!==null&&e===n.alternate)return e;e=a(e),n=a(n)}return null}var F=Object.assign,T=Symbol.for("react.element"),I=Symbol.for("react.transitional.element"),j=Symbol.for("react.portal"),W=Symbol.for("react.fragment"),ae=Symbol.for("react.strict_mode"),q=Symbol.for("react.profiler"),Y=Symbol.for("react.consumer"),ne=Symbol.for("react.context"),Q=Symbol.for("react.forward_ref"),J=Symbol.for("react.suspense"),me=Symbol.for("react.suspense_list"),ue=Symbol.for("react.memo"),O=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),_e=Symbol.for("react.legacy_hidden"),we=Symbol.for("react.memo_cache_sentinel"),B=Symbol.for("react.view_transition"),re=Symbol.for("react.recoverable"),Se=Symbol.iterator;function G(e){return e===null||typeof e!="object"?null:(e=Se&&e[Se]||e["@@iterator"],typeof e=="function"?e:null)}var ee=Symbol.for("react.client.reference");function be(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ee?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case W:return"Fragment";case q:return"Profiler";case ae:return"StrictMode";case J:return"Suspense";case me:return"SuspenseList";case D:return"Activity";case B:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case j:return"Portal";case ne:return e.displayName||"Context";case Y:return(e._context.displayName||"Context")+".Consumer";case Q:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ue:return n=e.displayName||null,n!==null?n:be(e.type)||"Memo";case O:n=e._payload,e=e._init;try{return be(e(n))}catch{}}return null}var Ne=Array.isArray,ge=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ce=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ut={pending:!1,data:null,method:null,action:null},Ge=[],st=-1;function lt(e){return{current:e}}function Je(e){0>st||(e.current=Ge[st],Ge[st]=null,st--)}function nt(e,n){st++,Ge[st]=e.current,e.current=n}var Et=lt(null),Ht=lt(null),zt=lt(null),$t=lt(null);function Z(e,n){switch(nt(zt,n),nt(Ht,e),nt(Et,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?qx(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=qx(n),e=Yx(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Je(Et),nt(Et,e)}function tn(){Je(Et),Je(Ht),Je(zt)}function Dt(e){var n=e.memoizedState;n!==null&&(Wr._currentValue=n.memoizedState,nt($t,e)),n=Et.current;var a=Yx(n,e.type);n!==a&&(nt(Ht,e),nt(Et,a))}function z(e){Ht.current===e&&(Je(Et),Je(Ht)),$t.current===e&&(Je($t),Wr._currentValue=ut)}var E,se;function le(e){if(E===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);E=n&&n[1]||"",se=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+E+e+se}var ve=!1;function De(e,n){if(!e||ve)return"";ve=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var Ee=function(){throw Error()};if(Object.defineProperty(Ee.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Ee,[])}catch(Be){var $=Be}Reflect.construct(e,[],Ee)}else{try{Ee.call()}catch(Be){$=Be}Ee=!1;try{var de=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),Ee=!0,new e}finally{Ee&&(de!==void 0?Object.defineProperty(e.prototype,"props",de):delete e.prototype.props)}}}else{try{throw Error()}catch(Be){$=Be}(Ee=e())&&typeof Ee.catch=="function"&&Ee.catch(function(){})}}catch(Be){if(Be&&$&&typeof Be.stack=="string")return[Be.stack,$.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=r.DetermineComponentFrameRoot(),_=f[0],C=f[1];if(_&&C){var H=_.split(`
`),ie=C.split(`
`);for(c=r=0;r<H.length&&!H[r].includes("DetermineComponentFrameRoot");)r++;for(;c<ie.length&&!ie[c].includes("DetermineComponentFrameRoot");)c++;if(r===H.length||c===ie.length)for(r=H.length-1,c=ie.length-1;1<=r&&0<=c&&H[r]!==ie[c];)c--;for(;1<=r&&0<=c;r--,c--)if(H[r]!==ie[c]){if(r!==1||c!==1)do if(r--,c--,0>c||H[r]!==ie[c]){var pe=`
`+H[r].replace(" at new "," at ");return e.displayName&&pe.includes("<anonymous>")&&(pe=pe.replace("<anonymous>",e.displayName)),pe}while(1<=r&&0<=c);break}}}finally{ve=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?le(a):""}function Ue(e,n){switch(e.tag){case 26:case 27:case 5:return le(e.type);case 16:return le("Lazy");case 13:return e.child!==n&&n!==null?le("Suspense Fallback"):le("Suspense");case 19:return le("SuspenseList");case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return le("Activity");case 30:return le("ViewTransition");default:return""}}function ye(e){try{var n="",a=null;do n+=Ue(e,a),a=e,e=e.return;while(e);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Ae=Object.prototype.hasOwnProperty,Oe=o.unstable_scheduleCallback,it=o.unstable_cancelCallback,He=o.unstable_shouldYield,Fe=o.unstable_requestPaint,qe=o.unstable_now,rt=o.unstable_getCurrentPriorityLevel,ht=o.unstable_ImmediatePriority,K=o.unstable_UserBlockingPriority,Le=o.unstable_NormalPriority,Te=o.unstable_LowPriority,Ie=o.unstable_IdlePriority,We=o.log,Re=o.unstable_setDisableYieldValue,tt=null,Xe=null;function Ut(e){if(typeof We=="function"&&Re(e),Xe&&typeof Xe.setStrictMode=="function")try{Xe.setStrictMode(tt,e)}catch{}}var pt=Math.clz32?Math.clz32:sf,ni=Math.log,xi=Math.LN2;function sf(e){return e>>>=0,e===0?32:31-(ni(e)/xi|0)|0}var lr=256,As=262144,Va=4194304;function ga(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ws(e,n,a){var r=e.pendingLanes;if(r===0)return 0;var c=0,f=e.suspendedLanes,_=e.pingedLanes;e=e.warmLanes;var C=r&134217727;return C!==0?(r=C&~f,r!==0?c=ga(r):(_&=C,_!==0?c=ga(_):a||(a=C&~e,a!==0&&(c=ga(a))))):(C=r&~f,C!==0?c=ga(C):_!==0?c=ga(_):a||(a=r&~e,a!==0&&(c=ga(a)))),c===0?0:n!==0&&n!==c&&(n&f)===0&&(f=c&-c,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:c}function ka(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Wi(e,n){(n&8)!==0&&(n|=n&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=n;0<a;){var r=31-pt(a),c=1<<r;n|=e[r],a&=~c}return n}function Mo(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Eo(){var e=Va;return Va<<=1,(Va&62914560)===0&&(Va=4194304),e}function cr(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function qi(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Hl(e,n,a,r,c,f){var _=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var C=e.entanglements,H=e.expirationTimes,ie=e.hiddenUpdates;for(a=_&~a;0<a;){var pe=31-pt(a),Ee=1<<pe;C[pe]=0,H[pe]=-1;var $=ie[pe];if($!==null)for(ie[pe]=null,pe=0;pe<$.length;pe++){var de=$[pe];de!==null&&(de.lane&=-536870913)}a&=~Ee}r!==0&&Cs(e,r,0),f!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=f&~(_&~n))}function Cs(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var r=31-pt(n);e.entangledLanes|=n,e.entanglements[r]=e.entanglements[r]|1073741824|a&261930}function To(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var r=31-pt(a),c=1<<r;c&n|e[r]&n&&(e[r]|=n),a&=~c}}function Ao(e,n){var a=n&-n;return a=(a&42)!==0?1:wo(a),(a&(e.suspendedLanes|n))!==0?0:a}function wo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Co(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Gl(){var e=Ce.p;return e!==0?e:(e=window.event,e===void 0?32:Dv(e.type))}function Vl(e,n){var a=Ce.p;try{return Ce.p=e,n()}finally{Ce.p=a}}var vi=Math.random().toString(36).slice(2),w="__reactFiber$"+vi,V="__reactProps$"+vi,xe="__reactContainer$"+vi,ce="__reactEvents$"+vi,fe="__reactListeners$"+vi,Ve="__reactHandles$"+vi,Ye="__reactResources$"+vi,ze="__reactMarker$"+vi,Qe="__reactLoad$"+vi;function $e(e){delete e[w],delete e[V],delete e[fe],delete e[Ve]}function ct(e){var n;if(n=e[w])return n;for(var a=e.parentNode;a;){if(n=a[xe]||a[w]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=fv(e);e!==null;){if(a=e[w])return a;e=fv(e)}return n}e=a,a=e.parentNode}return null}function mt(e){if(e=e[w]||e[xe]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Ze(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Tt(e){var n=e[Ye];return n||(n=e[Ye]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function St(e){e[ze]=!0}function Kt(e){e[Qe]=void 0}var jt=new Set,Sn={};function ke(e,n){fn(e,n),fn(e+"Capture",n)}function fn(e,n){for(Sn[e]=n,e=0;e<n.length;e++)jt.add(n[e])}var Lt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Vn={},ii={};function Yi(e){return Ae.call(ii,e)?!0:Ae.call(Vn,e)?!1:Lt.test(e)?ii[e]=!0:(Vn[e]=!0,!1)}var bt=!1;function Gt(){var e=bt;return bt=!1,e}function nn(e,n,a){if(Yi(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,a)}}function ai(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,a)}}function Ct(e,n,a,r){if(r===null)e.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,r)}}function dn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function xa(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function kl(e,n,a){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var c=r.get,f=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return c.call(this)},set:function(_){a=""+_,f.call(this,_)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function rf(e){if(!e._valueTracker){var n=xa(e)?"checked":"value";e._valueTracker=kl(e,n,""+e[n])}}function Pm(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return e&&(r=xa(e)?e.checked?"true":"false":e.value),e=r,e!==a?(n.setValue(e),!0):!1}var wS=/[\n"\\]/g;function _i(e){return e.replace(wS,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function of(e,n,a,r,c,f,_,C){e.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?e.type=_:e.removeAttribute("type"),n!=null?_==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+dn(n)):e.value!==""+dn(n)&&(e.value=""+dn(n)):_!=="submit"&&_!=="reset"||e.removeAttribute("value"),n!=null?_==="number"&&e.value==n?lf(e,dn(e.value)):lf(e,dn(n)):a!=null?lf(e,dn(a)):r!=null&&e.removeAttribute("value"),c==null&&f!=null&&(e.defaultChecked=!!f),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?e.name=""+dn(C):e.removeAttribute("name")}function Im(e,n,a,r,c,f,_,C){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){rf(e);return}a=a!=null?""+dn(a):"",n=n!=null?""+dn(n):a,C||n===e.value||(e.value=n),e.defaultValue=n}r=r??c,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=C?e.checked:!!r,e.defaultChecked=!!r,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(e.name=_),rf(e)}function lf(e,n){e.defaultValue!==""+n&&(e.defaultValue=""+n)}function ur(e,n,a,r){if(e=e.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<e.length;a++)c=n.hasOwnProperty("$"+e[a].value),e[a].selected!==c&&(e[a].selected=c),c&&r&&(e[a].defaultSelected=!0)}else{for(a=""+dn(a),n=null,c=0;c<e.length;c++){if(e[c].value===a){e[c].selected=!0,r&&(e[c].defaultSelected=!0);return}n!==null||e[c].disabled||(n=e[c])}n!==null&&(n.selected=!0)}}function zm(e,n,a){if(n!=null&&(n=""+dn(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+dn(a):""}function Bm(e,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(Ne(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=dn(n),e.defaultValue=a,r=e.textContent,r===a&&r!==""&&r!==null&&(e.value=r),rf(e)}function fr(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var CS=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Fm(e,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":r?e.setProperty(n,a):typeof a!="number"||a===0||CS.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Hm(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="",bt=!0);for(var c in n)r=n[c],n.hasOwnProperty(c)&&a[c]!==r&&(Fm(e,c,r),bt=!0)}else for(var f in n)n.hasOwnProperty(f)&&Fm(e,f,n[f])}function cf(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var RS=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),NS=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function jl(e){return NS.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Zi(){}var uf=null;function ff(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var dr=null,hr=null;function Gm(e){var n=mt(e);if(n&&(e=n.stateNode)){var a=e[V]||null;e:switch(e=n.stateNode,n.type){case"input":if(of(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+_i(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==e&&r.form===e.form){var c=r[V]||null;if(!c)throw Error(s(90));of(r,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===e.form&&Pm(r)}break e;case"textarea":zm(e,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&ur(e,!!a.multiple,n,!1)}}}var df=!1;function Vm(e,n,a){if(df)return e(n,a);df=!0;try{var r=e(n);return r}finally{if(df=!1,(dr!==null||hr!==null)&&(jc(),dr&&(n=dr,e=hr,hr=dr=null,Gm(n),e)))for(n=0;n<e.length;n++)Gm(e[n])}}function Ro(e,n){var a=e.stateNode;if(a===null)return null;var r=a[V]||null;if(r===null)return null;a=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var va=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hf=!1;if(va)try{var No={};Object.defineProperty(No,"passive",{get:function(){hf=!0}}),window.addEventListener("test",No,No),window.removeEventListener("test",No,No)}catch{hf=!1}var ja=null,pf=null,Xl=null;function km(){if(Xl)return Xl;var e,n=pf,a=n.length,r,c="value"in ja?ja.value:ja.textContent,f=c.length;for(e=0;e<a&&n[e]===c[e];e++);var _=a-e;for(r=1;r<=_&&n[a-r]===c[f-r];r++);return Xl=c.slice(e,1<r?1-r:void 0)}function Wl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function ql(){return!0}function jm(){return!1}function kn(e){function n(a,r,c,f,_){this._reactName=a,this._targetInst=c,this.type=r,this.nativeEvent=f,this.target=_,this.currentTarget=null;for(var C in e)e.hasOwnProperty(C)&&(a=e[C],this[C]=a?a(f):f[C]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?ql:jm,this.isPropagationStopped=jm,this}return F(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ql)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ql)},persist:function(){},isPersistent:ql}),n}var Xa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Yl=kn(Xa),Do=F({},Xa,{view:0,detail:0}),DS=kn(Do),mf,gf,Uo,Zl=F({},Do,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vf,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Uo&&(Uo&&e.type==="mousemove"?(mf=e.screenX-Uo.screenX,gf=e.screenY-Uo.screenY):gf=mf=0,Uo=e),mf)},movementY:function(e){return"movementY"in e?e.movementY:gf}}),Xm=kn(Zl),US=F({},Zl,{dataTransfer:0}),LS=kn(US),OS=F({},Do,{relatedTarget:0}),xf=kn(OS),PS=F({},Xa,{animationName:0,elapsedTime:0,pseudoElement:0}),IS=kn(PS),zS=F({},Xa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),BS=kn(zS),FS=F({},Xa,{data:0}),Wm=kn(FS),HS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},GS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},VS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kS(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=VS[e])?!!n[e]:!1}function vf(){return kS}var jS=F({},Do,{key:function(e){if(e.key){var n=HS[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Wl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?GS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vf,charCode:function(e){return e.type==="keypress"?Wl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),XS=kn(jS),WS=F({},Zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qm=kn(WS),qS=F({},Xa,{submitter:0}),YS=kn(qS),ZS=F({},Do,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vf}),KS=kn(ZS),QS=F({},Xa,{propertyName:0,elapsedTime:0,pseudoElement:0}),JS=kn(QS),$S=F({},Zl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),eb=kn($S),tb=F({},Xa,{newState:0,oldState:0,source:0}),nb=kn(tb),ib=[9,13,27,32],_f=va&&"CompositionEvent"in window,Lo=null;va&&"documentMode"in document&&(Lo=document.documentMode);var ab=va&&"TextEvent"in window&&!Lo,Ym=va&&(!_f||Lo&&8<Lo&&11>=Lo),Zm=" ",Km=!1;function Qm(e,n){switch(e){case"keyup":return ib.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pr=!1;function sb(e,n){switch(e){case"compositionend":return Jm(n);case"keypress":return n.which!==32?null:(Km=!0,Zm);case"textInput":return e=n.data,e===Zm&&Km?null:e;default:return null}}function rb(e,n){if(pr)return e==="compositionend"||!_f&&Qm(e,n)?(e=km(),Xl=pf=ja=null,pr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ym&&n.locale!=="ko"?null:n.data;default:return null}}var ob={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $m(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!ob[e.type]:n==="textarea"}function e0(e,n,a,r){dr?hr?hr.push(r):hr=[r]:dr=r,n=Kc(n,"onChange"),0<n.length&&(a=new Yl("onChange","change",null,a,r),e.push({event:a,listeners:n}))}var Oo=null,Po=null;function lb(e){Gx(e,0)}function Kl(e){var n=Ze(e);if(Pm(n))return e}function t0(e,n){if(e==="change")return n}var n0=!1;if(va){var yf;if(va){var Sf="oninput"in document;if(!Sf){var i0=document.createElement("div");i0.setAttribute("oninput","return;"),Sf=typeof i0.oninput=="function"}yf=Sf}else yf=!1;n0=yf&&(!document.documentMode||9<document.documentMode)}function a0(){Oo&&(Oo.detachEvent("onpropertychange",s0),Po=Oo=null)}function s0(e){if(e.propertyName==="value"&&Kl(Po)){var n=[];e0(n,Po,e,ff(e)),Vm(lb,n)}}function cb(e,n,a){e==="focusin"?(a0(),Oo=n,Po=a,Oo.attachEvent("onpropertychange",s0)):e==="focusout"&&a0()}function ub(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Kl(Po)}function fb(e,n){if(e==="click")return Kl(n)}function db(e,n){if(e==="input"||e==="change")return Kl(n)}function hb(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var si=typeof Object.is=="function"?Object.is:hb;function Io(e,n){if(si(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var c=a[r];if(!Ae.call(n,c)||!si(e[c],n[c]))return!1}return!0}function bf(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function r0(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function o0(e,n){var a=r0(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=n&&r>=n)return{node:a,offset:n-e};e=r}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=r0(a)}}function l0(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?l0(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function c0(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=bf(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=bf(e.document)}return n}function Mf(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var pb=va&&"documentMode"in document&&11>=document.documentMode,mr=null,Ef=null,zo=null,Tf=!1;function u0(e,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Tf||mr==null||mr!==bf(r)||(r=mr,"selectionStart"in r&&Mf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zo&&Io(zo,r)||(zo=r,r=Kc(Ef,"onSelect"),0<r.length&&(n=new Yl("onSelect","select",null,n,a),e.push({event:n,listeners:r}),n.target=mr)))}function Rs(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var gr={animationend:Rs("Animation","AnimationEnd"),animationiteration:Rs("Animation","AnimationIteration"),animationstart:Rs("Animation","AnimationStart"),transitionrun:Rs("Transition","TransitionRun"),transitionstart:Rs("Transition","TransitionStart"),transitioncancel:Rs("Transition","TransitionCancel"),transitionend:Rs("Transition","TransitionEnd")},Af={},f0={};va&&(f0=document.createElement("div").style,"AnimationEvent"in window||(delete gr.animationend.animation,delete gr.animationiteration.animation,delete gr.animationstart.animation),"TransitionEvent"in window||delete gr.transitionend.transition);function Ns(e){if(Af[e])return Af[e];if(!gr[e])return e;var n=gr[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in f0)return Af[e]=n[a];return e}var d0=Ns("animationend"),h0=Ns("animationiteration"),p0=Ns("animationstart"),mb=Ns("transitionrun"),gb=Ns("transitionstart"),xb=Ns("transitioncancel"),m0=Ns("transitionend"),g0=new Map,wf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wf.push("scrollEnd");function Li(e,n){g0.set(e,n),ke(n,[e])}var vb=0;function _a(e,n){if(e.name!=null&&e.name!=="auto")return e.name;if(n.autoName!==null)return n.autoName;e=zi.identifierPrefix;var a=vb++;return e="_"+e+"t_"+a.toString(32)+"_",n.autoName=e}function x0(e){if(e==null||typeof e=="string")return e;var n=null,a=Ir;if(a!==null)for(var r=0;r<a.length;r++){var c=e[a[r]];if(c!=null){if(c==="none")return"none";n=n==null?c:n+(" "+c)}}return n??e.default}function ya(e,n){return e=x0(e),n=x0(n),n==null?e==="auto"?null:e:n==="auto"?null:n}var Ql=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},yi=[],xr=0,Cf=0;function Jl(){for(var e=xr,n=Cf=xr=0;n<e;){var a=yi[n];yi[n++]=null;var r=yi[n];yi[n++]=null;var c=yi[n];yi[n++]=null;var f=yi[n];if(yi[n++]=null,r!==null&&c!==null){var _=r.pending;_===null?c.next=c:(c.next=_.next,_.next=c),r.pending=c}f!==0&&v0(a,c,f)}}function $l(e,n,a,r){yi[xr++]=e,yi[xr++]=n,yi[xr++]=a,yi[xr++]=r,Cf|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Rf(e,n,a,r){return $l(e,n,a,r),ec(e)}function Ds(e,n){return $l(e,null,null,n),ec(e)}function v0(e,n,a){e.lanes|=a;var r=e.alternate;r!==null&&(r.lanes|=a);for(var c=!1,f=e.return;f!==null;)f.childLanes|=a,r=f.alternate,r!==null&&(r.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(c=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,c&&n!==null&&(c=31-pt(a),e=f.hiddenUpdates,r=e[c],r===null?e[c]=[n]:r.push(n),n.lane=a|536870912),f):null}function ec(e){if(50<sl)throw sl=0,kc=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var vr={};function _b(e,n,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kn(e,n,a,r){return new _b(e,n,a,r)}function Nf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Sa(e,n){var a=e.alternate;return a===null?(a=Kn(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&1206910976,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function _0(e,n){e.flags&=1206910978;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function tc(e,n,a,r,c,f){var _=0;if(r=e,typeof r=="function")Nf(r)&&(_=1);else if(typeof r=="string")_=qM(e,a,Et.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(r){case D:return e=Kn(31,a,n,c),e.elementType=D,e.lanes=f,e;case W:return Us(a.children,c,f,n);case ae:_=8,c|=24;break;case q:return e=Kn(12,a,n,c|2),e.elementType=q,e.lanes=f,e;case J:return e=Kn(13,a,n,c),e.elementType=J,e.lanes=f,e;case me:return e=Kn(19,a,n,c),e.elementType=me,e.lanes=f,e;case _e:case B:return e=c|32,e=Kn(30,a,n,e),e.elementType=B,e.lanes=f,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case ne:_=10;break e;case Y:_=9;break e;case Q:_=11;break e;case ue:_=14;break e;case O:_=16,r=null;break e}_=29,a=Error(s(130,e===null?"null":typeof e,"")),r=null}return n=Kn(_,a,n,c),n.elementType=e,n.type=r,n.lanes=f,n}function Us(e,n,a,r){return e=Kn(7,e,r,n),e.lanes=a,e}function Df(e,n,a){return e=Kn(6,e,null,n),e.lanes=a,e}function y0(e){var n=Kn(18,null,null,0);return n.stateNode=e,n}function Uf(e,n,a){return n=Kn(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var S0=new WeakMap;function Si(e,n){if(typeof e=="object"&&e!==null){var a=S0.get(e);return a!==void 0?a:(n={value:e,source:n,stack:ye(n)},S0.set(e,n),n)}return{value:e,source:n,stack:ye(n)}}var _r=[],yr=0,nc=null,Bo=0,bi=[],Mi=0,Wa=null,Ki=1,Qi="";function ba(e,n){_r[yr++]=Bo,_r[yr++]=nc,nc=e,Bo=n}function b0(e,n,a){bi[Mi++]=Ki,bi[Mi++]=Qi,bi[Mi++]=Wa,Wa=e;var r=Ki;e=Qi;var c=32-pt(r)-1;r&=~(1<<c),a+=1;var f=32-pt(n)+c;if(30<f){var _=c-c%5;f=(r&(1<<_)-1).toString(32),r>>=_,c-=_,Ki=1<<32-pt(n)+c|a<<c|r,Qi=f+e}else Ki=1<<f|a<<c|r,Qi=e}function ic(e){e.return!==null&&(ba(e,1),b0(e,1,0))}function Lf(e){for(;e===nc;)nc=_r[--yr],_r[yr]=null,Bo=_r[--yr],_r[yr]=null;for(;e===Wa;)Wa=bi[--Mi],bi[Mi]=null,Qi=bi[--Mi],bi[Mi]=null,Ki=bi[--Mi],bi[Mi]=null}function M0(e,n){bi[Mi++]=Ki,bi[Mi++]=Qi,bi[Mi++]=Wa,Ki=n.id,Qi=n.overflow,Wa=e}var Tn=null,an=null,Mt=!1,qa=null,Ei=!1,Of=Error(s(519));function Ya(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Fo(Si(n,e)),Of}function E0(e){var n=e.stateNode,a=e.type,r=e.memoizedProps;switch(n[w]=e,n[V]=r,a){case"dialog":wt("cancel",n),wt("close",n);break;case"iframe":case"object":case"embed":wt("load",n);break;case"video":case"audio":for(a=0;a<ol.length;a++)wt(ol[a],n);break;case"source":wt("error",n);break;case"img":case"image":case"link":wt("error",n),wt("load",n);break;case"details":wt("toggle",n);break;case"input":wt("invalid",n),Im(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":wt("invalid",n);break;case"textarea":wt("invalid",n),Bm(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||Xx(n.textContent,a)?(r.popover!=null&&(wt("beforetoggle",n),wt("toggle",n)),r.onScroll!=null&&wt("scroll",n),r.onScrollEnd!=null&&wt("scrollend",n),r.onClick!=null&&(n.onclick=Zi),n=!0):n=!1,n||Ya(e,!0)}function ac(e){for(Tn=e.return;Tn;)switch(Tn.tag){case 5:case 31:case 13:Ei=!1;return;case 27:case 3:Ei=!0;return;default:Tn=Tn.return}}function Sr(e){if(e!==Tn)return!1;if(!Mt)return ac(e),Mt=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||uh(e.type,e.memoizedProps)),a=!a),a&&an&&Ya(e),ac(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));an=uv(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));an=uv(e)}else n===27?(n=an,us(e.type)?(e=_h,_h=null,an=e):an=n):an=Tn?Ai(e.stateNode.nextSibling):null;return!0}function Ls(){an=Tn=null,Mt=!1}function Pf(){var e=qa;return e!==null&&($n===null?$n=e:$n.push.apply($n,e),qa=null),e}function Fo(e){qa===null?qa=[e]:qa.push(e)}var If=lt(null),Os=null,Ma=null;function Za(e,n,a){nt(If,n._currentValue),n._currentValue=a}function Ea(e){e._currentValue=If.current,Je(If)}function sc(e,n,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===a)break;e=e.return}}function zf(e,n,a,r){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var f=c.dependencies;if(f!==null){var _=c.child;f=f.firstContext;e:for(;f!==null;){var C=f;f=c;for(var H=0;H<n.length;H++)if(C.context===n[H]){f.lanes|=a,C=f.alternate,C!==null&&(C.lanes|=a),sc(f.return,a,e),r||(_=null);break e}f=C.next}}else if(c.tag===18){if(_=c.return,_===null)throw Error(s(341));_.lanes|=a,f=_.alternate,f!==null&&(f.lanes|=a),sc(_,a,e),_=null}else c.tag===13&&c.memoizedState!==null&&c.memoizedState.dehydrated===null?(c.lanes|=a,_=c.alternate,_!==null&&(_.lanes|=a),sc(c.return,a,e),_=c.child,_=_!==null?_.sibling:null):_=c.child;if(_!==null)_.return=c;else for(_=c;_!==null;){if(_===e){_=null;break}if(c=_.sibling,c!==null){c.return=_.return,_=c;break}_=_.return}c=_}}function Ps(e,n,a,r){e=null;for(var c=n,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var _=c.alternate;if(_===null)throw Error(s(387));if(_=_.memoizedProps,_!==null){var C=c.type;si(c.pendingProps.value,_.value)||(e!==null?e.push(C):e=[C])}}else if(c===$t.current){if(_=c.alternate,_===null)throw Error(s(387));_.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Wr):e=[Wr])}c=c.return}return e!==null&&zf(n,e,a,r),n.flags|=262144,e!==null}function rc(e){for(e=e.firstContext;e!==null;){if(!si(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Is(e){Os=e,Ma=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Nn(e){return T0(Os,e)}function oc(e,n){return Os===null&&Is(e),T0(e,n)}function T0(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Ma===null){if(e===null)throw Error(s(308));Ma=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Ma=Ma.next=n;return a}var yb=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,r){e.push(r)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Sb=o.unstable_scheduleCallback,bb=o.unstable_NormalPriority,gn={$$typeof:ne,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Bf(){return{controller:new yb,data:new Map,refCount:0}}function Ho(e){e.refCount--,e.refCount===0&&Sb(bb,function(){e.controller.abort()})}function A0(e,n){if((e.pendingLanes&4194048)!==0){var a=e.transitionTypes;for(a===null&&(a=e.transitionTypes=[]),e=0;e<n.length;e++){var r=n[e];a.indexOf(r)===-1&&a.push(r)}}}var Go=null;function Mb(e){var n=e.transitionTypes;return e.transitionTypes=null,n}var Vo=null,Ff=0,zs=0,br=null;function Eb(e,n){if(Vo===null){var a=Vo=[];Ff=0,zs=th(),br={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Ff++,n.then(w0,w0),n}function w0(){if(--Ff===0&&(Go=null,Vo!==null)){br!==null&&(br.status="fulfilled");var e=Vo;Vo=null,zs=0,br=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Tb(e,n){var a=[],r={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return e.then(function(){r.status="fulfilled",r.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(r.status="rejected",r.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),r}var C0=ge.S;ge.S=function(e,n){if(yx=qe(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Eb(e,n),Go!==null)for(var a=Hr;a!==null;)A0(a,Go),a=a.next;if(a=e.types,a!==null){for(var r=Hr;r!==null;)A0(r,a),r=r.next;if(zs!==0){r=Go,r===null&&(r=Go=[]);for(var c=0;c<a.length;c++){var f=a[c];r.indexOf(f)===-1&&r.push(f)}}}C0!==null&&C0(e,n)};var Bs=lt(null);function Hf(){var e=Bs.current;return e!==null?e:en.pooledCache}function lc(e,n){n===null?nt(Bs,Bs.current):nt(Bs,n.pool)}function R0(){var e=Hf();return e===null?null:{parent:gn._currentValue,pool:e}}var Mr=Error(s(460)),Gf=Error(s(474)),cc=Error(s(542)),uc={then:function(){}};function N0(e){return e=e.status,e==="fulfilled"||e==="rejected"}function D0(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Zi,Zi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,L0(e),e===void 0&&!("reason"in n)?Error(s(600)):e;default:if(typeof n.status=="string")n.then(Zi,Zi);else{if(e=en,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(r){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=r}},function(r){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,L0(e),e}throw Hs=n,Mr}}function Fs(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Hs=a,Mr):a}}var Hs=null;function U0(){if(Hs===null)throw Error(s(459));var e=Hs;return Hs=null,e}function L0(e){if(e===Mr||e===cc)throw Error(s(483))}var Er=null,ko=0;function fc(e){var n=ko;return ko+=1,Er===null&&(Er=[]),D0(Er,e,n)}function Ka(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function dc(e,n){throw n.$$typeof===T?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function O0(e){function n(te,X){if(e){var oe=te.deletions;oe===null?(te.deletions=[X],te.flags|=16):oe.push(X)}}function a(te,X){if(!e)return null;for(;X!==null;)n(te,X),X=X.sibling;return null}function r(te){for(var X=new Map;te!==null;)te.key===null?X.set(te.index,te):X.set(te.key,te),te=te.sibling;return X}function c(te,X){return te=Sa(te,X),te.index=0,te.sibling=null,te}function f(te,X,oe){return te.index=oe,e?(oe=te.alternate,oe!==null?(oe=oe.index,oe<X?(te.flags|=2,X):oe):(te.flags|=134217730,X)):(te.flags|=1048576,X)}function _(te){return e&&te.alternate===null&&(te.flags|=134217730),te}function C(te,X,oe,Me){return X===null||X.tag!==6?(X=Df(oe,te.mode,Me),X.return=te,X):(X=c(X,oe),X.return=te,X)}function H(te,X,oe,Me){var Ke=oe.type;return Ke===W?(te=pe(te,X,oe.props.children,Me,oe.key),Ka(te,oe),te):X!==null&&(X.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===O&&Fs(Ke)===X.type)?(X=c(X,oe.props),Ka(X,oe),X.return=te,X):(X=tc(oe.type,oe.key,oe.props,null,te.mode,Me),Ka(X,oe),X.return=te,X)}function ie(te,X,oe,Me){return X===null||X.tag!==4||X.stateNode.containerInfo!==oe.containerInfo||X.stateNode.implementation!==oe.implementation?(X=Uf(oe,te.mode,Me),X.return=te,X):(X=c(X,oe.children||[]),X.return=te,X)}function pe(te,X,oe,Me,Ke){return X===null||X.tag!==7?(X=Us(oe,te.mode,Me,Ke),X.return=te,X):(X=c(X,oe),X.return=te,X)}function Ee(te,X,oe){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=Df(""+X,te.mode,oe),X.return=te,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case I:return oe=tc(X.type,X.key,X.props,null,te.mode,oe),Ka(oe,X),oe.return=te,oe;case j:return X=Uf(X,te.mode,oe),X.return=te,X;case O:return X=Fs(X),Ee(te,X,oe)}if(Ne(X)||G(X))return X=Us(X,te.mode,oe,null),X.return=te,X;if(typeof X.then=="function")return Ee(te,fc(X),oe);if(X.$$typeof===ne)return Ee(te,oc(te,X),oe);dc(te,X)}return null}function $(te,X,oe,Me){var Ke=X!==null?X.key:null;if(typeof oe=="string"&&oe!==""||typeof oe=="number"||typeof oe=="bigint")return Ke!==null?null:C(te,X,""+oe,Me);if(typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case I:return oe.key===Ke?H(te,X,oe,Me):null;case j:return oe.key===Ke?ie(te,X,oe,Me):null;case O:return oe=Fs(oe),$(te,X,oe,Me)}if(Ne(oe)||G(oe))return Ke!==null?null:pe(te,X,oe,Me,null);if(typeof oe.then=="function")return $(te,X,fc(oe),Me);if(oe.$$typeof===ne)return $(te,X,oc(te,oe),Me);dc(te,oe)}return null}function de(te,X,oe,Me,Ke){if(typeof Me=="string"&&Me!==""||typeof Me=="number"||typeof Me=="bigint")return te=te.get(oe)||null,C(X,te,""+Me,Ke);if(typeof Me=="object"&&Me!==null){switch(Me.$$typeof){case I:return te=te.get(Me.key===null?oe:Me.key)||null,H(X,te,Me,Ke);case j:return te=te.get(Me.key===null?oe:Me.key)||null,ie(X,te,Me,Ke);case O:return Me=Fs(Me),de(te,X,oe,Me,Ke)}if(Ne(Me)||G(Me))return te=te.get(oe)||null,pe(X,te,Me,Ke,null);if(typeof Me.then=="function")return de(te,X,oe,fc(Me),Ke);if(Me.$$typeof===ne)return de(te,X,oe,oc(X,Me),Ke);dc(X,Me)}return null}function Be(te,X,oe,Me){for(var Ke=null,Nt=null,at=X,ot=X=0,_n=null;at!==null&&ot<oe.length;ot++){at.index>ot?(_n=at,at=null):_n=at.sibling;var Bt=$(te,at,oe[ot],Me);if(Bt===null){at===null&&(at=_n);break}e&&at&&Bt.alternate===null&&n(te,at),X=f(Bt,X,ot),Nt===null?Ke=Bt:Nt.sibling=Bt,Nt=Bt,at=_n}if(ot===oe.length)return a(te,at),Mt&&ba(te,ot),Ke;if(at===null){for(;ot<oe.length;ot++)at=Ee(te,oe[ot],Me),at!==null&&(X=f(at,X,ot),Nt===null?Ke=at:Nt.sibling=at,Nt=at);return Mt&&ba(te,ot),Ke}for(at=r(at);ot<oe.length;ot++)_n=de(at,te,ot,oe[ot],Me),_n!==null&&(e&&(Bt=_n.alternate,Bt!==null&&at.delete(Bt.key===null?ot:Bt.key)),X=f(_n,X,ot),Nt===null?Ke=_n:Nt.sibling=_n,Nt=_n);return e&&at.forEach(function(ms){return n(te,ms)}),Mt&&ba(te,ot),Ke}function et(te,X,oe,Me){if(oe==null)throw Error(s(151));for(var Ke=null,Nt=null,at=X,ot=X=0,_n=null,Bt=oe.next();at!==null&&!Bt.done;ot++,Bt=oe.next()){at.index>ot?(_n=at,at=null):_n=at.sibling;var ms=$(te,at,Bt.value,Me);if(ms===null){at===null&&(at=_n);break}e&&at&&ms.alternate===null&&n(te,at),X=f(ms,X,ot),Nt===null?Ke=ms:Nt.sibling=ms,Nt=ms,at=_n}if(Bt.done)return a(te,at),Mt&&ba(te,ot),Ke;if(at===null){for(;!Bt.done;ot++,Bt=oe.next())Bt=Ee(te,Bt.value,Me),Bt!==null&&(X=f(Bt,X,ot),Nt===null?Ke=Bt:Nt.sibling=Bt,Nt=Bt);return Mt&&ba(te,ot),Ke}for(at=r(at);!Bt.done;ot++,Bt=oe.next())Bt=de(at,te,ot,Bt.value,Me),Bt!==null&&(e&&(_n=Bt.alternate,_n!==null&&at.delete(_n.key===null?ot:_n.key)),X=f(Bt,X,ot),Nt===null?Ke=Bt:Nt.sibling=Bt,Nt=Bt);return e&&at.forEach(function(s1){return n(te,s1)}),Mt&&ba(te,ot),Ke}function vt(te,X,oe,Me){if(typeof oe=="object"&&oe!==null&&oe.type===W&&oe.key===null&&oe.props.ref===void 0&&(oe=oe.props.children),typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case I:e:{for(var Ke=oe.key;X!==null;){if(X.key===Ke){if(Ke=oe.type,Ke===W){if(X.tag===7){a(te,X.sibling),Me=c(X,oe.props.children),Ka(Me,oe),Me.return=te,te=Me;break e}}else if(X.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===O&&Fs(Ke)===X.type){a(te,X.sibling),Me=c(X,oe.props),Ka(Me,oe),Me.return=te,te=Me;break e}a(te,X);break}else n(te,X);X=X.sibling}oe.type===W?(Me=Us(oe.props.children,te.mode,Me,oe.key),Ka(Me,oe),Me.return=te,te=Me):(Me=tc(oe.type,oe.key,oe.props,null,te.mode,Me),Ka(Me,oe),Me.return=te,te=Me)}return _(te);case j:e:{for(Ke=oe.key;X!==null;){if(X.key===Ke)if(X.tag===4&&X.stateNode.containerInfo===oe.containerInfo&&X.stateNode.implementation===oe.implementation){a(te,X.sibling),Me=c(X,oe.children||[]),Me.return=te,te=Me;break e}else{a(te,X);break}else n(te,X);X=X.sibling}Me=Uf(oe,te.mode,Me),Me.return=te,te=Me}return _(te);case O:return oe=Fs(oe),vt(te,X,oe,Me)}if(Ne(oe))return Be(te,X,oe,Me);if(G(oe)){if(Ke=G(oe),typeof Ke!="function")throw Error(s(150));return oe=Ke.call(oe),et(te,X,oe,Me)}if(typeof oe.then=="function")return vt(te,X,fc(oe),Me);if(oe.$$typeof===ne)return vt(te,X,oc(te,oe),Me);dc(te,oe)}return typeof oe=="string"&&oe!==""||typeof oe=="number"||typeof oe=="bigint"?(oe=""+oe,X!==null&&X.tag===6?(a(te,X.sibling),Me=c(X,oe),Me.return=te,te=Me):(a(te,X),Me=Df(oe,te.mode,Me),Me.return=te,te=Me),_(te)):a(te,X)}return function(te,X,oe,Me){try{ko=0;var Ke=vt(te,X,oe,Me);return Er=null,Ke}catch(at){if(at===Mr||at===cc)throw at;var Nt=Kn(29,at,null,te.mode);return Nt.lanes=Me,Nt.return=te,Nt}finally{}}}var Gs=O0(!0),P0=O0(!1),Qa=!1;function Vf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function kf(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ja(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function $a(e,n,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(Vt&2)!==0){var c=r.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),r.pending=n,n=ec(e),v0(e,null,a),n}return $l(e,r,n,a),ec(e)}function jo(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,To(e,a)}}function jf(e,n){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var c=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?c=f=_:f=f.next=_,a=a.next}while(a!==null);f===null?c=f=n:f=f.next=n}else c=f=n;a={baseState:r.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:r.shared,callbacks:r.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Xf=!1;function Xo(){if(Xf){var e=br;if(e!==null)throw e}}function Wo(e,n,a,r){Xf=!1;var c=e.updateQueue;Qa=!1;var f=c.firstBaseUpdate,_=c.lastBaseUpdate,C=c.shared.pending;if(C!==null){c.shared.pending=null;var H=C,ie=H.next;H.next=null,_===null?f=ie:_.next=ie,_=H;var pe=e.alternate;pe!==null&&(pe=pe.updateQueue,C=pe.lastBaseUpdate,C!==_&&(C===null?pe.firstBaseUpdate=ie:C.next=ie,pe.lastBaseUpdate=H))}if(f!==null){var Ee=c.baseState;_=0,pe=ie=H=null,C=f;do{var $=C.lane&-536870913,de=$!==C.lane;if(de?(Rt&$)===$:(r&$)===$){$!==0&&$===zs&&(Xf=!0),pe!==null&&(pe=pe.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});e:{var Be=e,et=C;$=n;var vt=a;switch(et.tag){case 1:if(Be=et.payload,typeof Be=="function"){Ee=Be.call(vt,Ee,$);break e}Ee=Be;break e;case 3:Be.flags=Be.flags&-65537|128;case 0:if(Be=et.payload,$=typeof Be=="function"?Be.call(vt,Ee,$):Be,$==null)break e;Ee=F({},Ee,$);break e;case 2:Qa=!0}}$=C.callback,$!==null&&(e.flags|=64,de&&(e.flags|=8192),de=c.callbacks,de===null?c.callbacks=[$]:de.push($))}else de={lane:$,tag:C.tag,payload:C.payload,callback:C.callback,next:null},pe===null?(ie=pe=de,H=Ee):pe=pe.next=de,_|=$;if(C=C.next,C===null){if(C=c.shared.pending,C===null)break;de=C,C=de.next,de.next=null,c.lastBaseUpdate=de,c.shared.pending=null}}while(!0);pe===null&&(H=Ee),c.baseState=H,c.firstBaseUpdate=ie,c.lastBaseUpdate=pe,f===null&&(c.shared.lanes=0),rs|=_,e.lanes=_,e.memoizedState=Ee}}function I0(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function z0(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)I0(a[e],n)}var es=lt(null),hc=lt(0);function B0(e,n){e=Ra,nt(hc,e),nt(es,n),Ra=e|n.baseLanes}function Wf(){nt(hc,Ra),nt(es,es.current)}function qf(){Ra=hc.current,Je(es),Je(hc)}var Dn=lt(null),Bn=null;function ts(e){var n=e.alternate;nt(Un,Un.current&1),nt(Dn,e),Bn===null&&(n===null||es.current!==null||n.memoizedState!==null)&&(Bn=e)}function Yf(e){nt(Un,Un.current),nt(Dn,e),Bn===null&&(Bn=e)}function F0(e){e.tag===22?(nt(Un,Un.current),nt(Dn,e),Bn===null&&(Bn=e)):ns()}function ns(){nt(Un,Un.current),nt(Dn,Dn.current)}function ri(e){Je(Dn),Bn===e&&(Bn=null),Je(Un)}var Un=lt(0);function qo(e,n){nt(Dn,Dn.current),nt(Un,n)}function Zf(e){Je(Un),Je(Dn),Bn===e&&(Bn=null)}function pc(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||xh(a)||vh(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ta=0,xt=null,Qt=null,xn=null,mc=!1,Tr=!1,Vs=!1,gc=0,Yo=0,Ar=null,Ab=0;function hn(){throw Error(s(321))}function Kf(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!si(e[a],n[a]))return!1;return!0}function Qf(e,n,a,r,c,f){return Ta=f,xt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,ge.H=e===null||e.memoizedState===null?bg:Mg,Vs=!1,f=a(r,c),Vs=!1,Tr&&(f=G0(n,a,r,c)),H0(e),f}function H0(e){ge.H=Mc;var n=Qt!==null&&Qt.next!==null;if(Ta=0,xn=Qt=xt=null,mc=!1,Yo=0,Ar=null,n)throw Error(s(300));e===null||vn||(e=e.dependencies,e!==null&&rc(e)&&(vn=!0))}function G0(e,n,a,r){xt=e;var c=0;do{if(Tr&&(Ar=null),Yo=0,Tr=!1,25<=c)throw Error(s(301));if(c+=1,xn=Qt=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}ge.H=Ob,f=n(a,r)}while(Tr);return f}function wb(){var e=ge.H,n=e.useState()[0];return n=typeof n.then=="function"?Zo(n):n,e=e.useState()[0],(Qt!==null?Qt.memoizedState:null)!==e&&(xt.flags|=1024),n}function Jf(){var e=gc!==0;return gc=0,e}function $f(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function ed(e){if(mc){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}mc=!1}Ta=0,xn=Qt=xt=null,Tr=!1,Yo=gc=0,Ar=null}function jn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xn===null?xt.memoizedState=xn=e:xn=xn.next=e,xn}function mn(){if(Qt===null){var e=xt.alternate;e=e!==null?e.memoizedState:null}else e=Qt.next;var n=xn===null?xt.memoizedState:xn.next;if(n!==null)xn=n,Qt=e;else{if(e===null)throw xt.alternate===null?Error(s(467)):Error(s(310));Qt=e,e={memoizedState:Qt.memoizedState,baseState:Qt.baseState,baseQueue:Qt.baseQueue,queue:Qt.queue,next:null},xn===null?xt.memoizedState=xn=e:xn=xn.next=e}return xn}function xc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Zo(e){var n=Yo;return Yo+=1,Ar===null&&(Ar=[]),e=D0(Ar,e,n),n=xt,(xn===null?n.memoizedState:xn.next)===null&&(n=n.alternate,ge.H=n===null||n.memoizedState===null?bg:Mg),e}function vc(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Zo(e);if(e.$$typeof===re)return;if(e.$$typeof===ne)return Nn(e)}throw Error(s(438,String(e)))}function td(e){var n=null,a=xt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=xt.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=xc(),xt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),r=0;r<e;r++)a[r]=we;return n.index++,a}function Aa(e,n){return typeof n=="function"?n(e):n}function _c(e){var n=mn();return nd(n,Qt,e)}function nd(e,n,a){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var c=e.baseQueue,f=r.pending;if(f!==null){if(c!==null){var _=c.next;c.next=f.next,f.next=_}n.baseQueue=c=f,r.pending=null}if(f=e.baseState,c===null)e.memoizedState=f;else{n=c.next;var C=_=null,H=null,ie=n,pe=!1;do{var Ee=ie.lane&-536870913;if(Ee!==ie.lane?(Rt&Ee)===Ee:(Ta&Ee)===Ee){var $=ie.revertLane;if($===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null}),Ee===zs&&(pe=!0);else if((Ta&$)===$){ie=ie.next,$===zs&&(pe=!0);continue}else Ee={lane:0,revertLane:ie.revertLane,gesture:null,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null},H===null?(C=H=Ee,_=f):H=H.next=Ee,xt.lanes|=$,rs|=$;Ee=ie.action,Vs&&a(f,Ee),f=ie.hasEagerState?ie.eagerState:a(f,Ee)}else $={lane:Ee,revertLane:ie.revertLane,gesture:ie.gesture,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null},H===null?(C=H=$,_=f):H=H.next=$,xt.lanes|=Ee,rs|=Ee;ie=ie.next}while(ie!==null&&ie!==n);if(H===null?_=f:H.next=C,!si(f,e.memoizedState)&&(vn=!0,pe&&(a=br,a!==null)))throw a;e.memoizedState=f,e.baseState=_,e.baseQueue=H,r.lastRenderedState=f}return c===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function id(e){var n=mn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var r=a.dispatch,c=a.pending,f=n.memoizedState;if(c!==null){a.pending=null;var _=c=c.next;do f=e(f,_.action),_=_.next;while(_!==c);si(f,n.memoizedState)||(vn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,r]}function V0(e,n,a){var r=xt,c=mn(),f=Mt;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var _=!si((Qt||c).memoizedState,a);if(_&&(c.memoizedState=a,vn=!0),c=c.queue,rd(X0.bind(null,r,c,e),[e]),e=c.getSnapshot!==n||_||xn!==null&&(xn.memoizedState.tag&1)!==0,wr(e?9:8,{destroy:void 0},j0.bind(null,r,c,a,n),null),e){if(r.flags|=2048,en===null)throw Error(s(349));f||(Ta&127)!==0||k0(r,n,a)}return a}function k0(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=xt.updateQueue,n===null?(n=xc(),xt.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function j0(e,n,a,r){n.value=a,n.getSnapshot=r,W0(n)&&q0(e)}function X0(e,n,a){return a(function(){W0(n)&&q0(e)})}function W0(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!si(e,a)}catch{return!0}}function q0(e){var n=Ds(e,2);n!==null&&ei(n,e,2)}function ad(e){var n=jn();if(typeof e=="function"){var a=e;if(e=a(),Vs){Ut(!0);try{a()}finally{Ut(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Aa,lastRenderedState:e},n}function Y0(e,n,a,r){return e.baseState=a,nd(e,Qt,typeof r=="function"?r:Aa)}function Cb(e,n,a,r,c){if(bc(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){f.listeners.push(_)}};ge.T!==null?a(!0):f.isTransition=!1,r(f),a=n.pending,a===null?(f.next=n.pending=f,Z0(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Z0(e,n){var a=n.action,r=n.payload,c=e.state;if(n.isTransition){var f=ge.T,_={};_.types=f!==null?f.types:null,ge.T=_;try{var C=a(c,r),H=ge.S;H!==null&&H(_,C),K0(e,n,C)}catch(ie){sd(e,n,ie)}finally{f!==null&&_.types!==null&&(f.types=_.types),ge.T=f}}else try{f=a(c,r),K0(e,n,f)}catch(ie){sd(e,n,ie)}}function K0(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Q0(e,n,r)},function(r){return sd(e,n,r)}):Q0(e,n,a)}function Q0(e,n,a){n.status="fulfilled",n.value=a,J0(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Z0(e,a)))}function sd(e,n,a){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,J0(n),n=n.next;while(n!==r)}e.action=null}function J0(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function $0(e,n){return n}function eg(e,n){if(Mt){var a=en.formState;if(a!==null){e:{var r=xt;if(Mt){if(an){t:{for(var c=an,f=Ei;c.nodeType!==8;){if(!f){c=null;break t}if(c=Ai(c.nextSibling),c===null){c=null;break t}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){an=Ai(c.nextSibling),r=c.data==="F!";break e}}Ya(r)}r=!1}r&&(n=a[0])}}return a=jn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$0,lastRenderedState:n},a.queue=r,a=_g.bind(null,xt,r),r.dispatch=a,r=ad(!1),f=fd.bind(null,xt,!1,r.queue),r=jn(),c={state:n,dispatch:null,action:e,pending:null},r.queue=c,a=Cb.bind(null,xt,c,f,a),c.dispatch=a,r.memoizedState=e,[n,a,!1]}function tg(e){var n=mn();return ng(n,Qt,e)}function ng(e,n,a){if(n=nd(e,n,$0)[0],e=_c(Aa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=Zo(n)}catch(_){throw _===Mr?cc:_}else r=n;n=mn();var c=n.queue,f=c.dispatch;return a!==n.memoizedState&&(xt.flags|=2048,wr(9,{destroy:void 0},Rb.bind(null,c,a),null)),[r,f,e]}function Rb(e,n){e.action=n}function ig(e){var n=mn(),a=Qt;if(a!==null)return ng(n,a,e);mn(),n=n.memoizedState,a=mn();var r=a.queue.dispatch;return a.memoizedState=e,[n,r,!1]}function wr(e,n,a,r){return e={tag:e,create:a,deps:r,inst:n,next:null},n=xt.updateQueue,n===null&&(n=xc(),xt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,n.lastEffect=e),e}function ag(){return mn().memoizedState}function yc(e,n,a,r){var c=jn();xt.flags|=e,c.memoizedState=wr(1|n,{destroy:void 0},a,r===void 0?null:r)}function Sc(e,n,a,r){var c=mn();r=r===void 0?null:r;var f=c.memoizedState.inst;Qt!==null&&r!==null&&Kf(r,Qt.memoizedState.deps)?c.memoizedState=wr(n,f,a,r):(xt.flags|=e,c.memoizedState=wr(1|n,f,a,r))}function sg(e,n){yc(8390656,8,e,n)}function rd(e,n){Sc(2048,8,e,n)}function Nb(e){xt.flags|=4;var n=xt.updateQueue;if(n===null)n=xc(),xt.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function rg(e){var n=mn().memoizedState;return Nb({ref:n,nextImpl:e}),function(){if((Vt&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function og(e,n){return Sc(4,2,e,n)}function lg(e,n){return Sc(4,4,e,n)}function cg(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function ug(e,n,a){a=a!=null?a.concat([e]):null,Sc(4,4,cg.bind(null,n,e),a)}function od(){}function fg(e,n){var a=mn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Kf(n,r[1])?r[0]:(a.memoizedState=[e,n],e)}function dg(e,n){var a=mn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Kf(n,r[1]))return r[0];if(r=e(),Vs){Ut(!0);try{e()}finally{Ut(!1)}}return a.memoizedState=[r,n],r}function ld(e,n,a){return a===void 0||(Ta&1073741824)!==0&&(Rt&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=bx(),xt.lanes|=e,rs|=e,a)}function hg(e,n,a,r){return si(a,n)?a:es.current!==null?(e=ld(e,a,r),si(e,n)||(vn=!0),e):(Ta&106)===0||(Ta&1073741824)!==0&&(Rt&261930)===0?(vn=!0,e.memoizedState=a):(e=bx(),xt.lanes|=e,rs|=e,n)}function pg(e,n,a,r,c){var f=Ce.p;Ce.p=f!==0&&8>f?f:8;var _=ge.T,C={};C.types=_!==null?_.types:null,ge.T=C,fd(e,!1,n,a);try{var H=c(),ie=ge.S;if(ie!==null&&ie(C,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var pe=Tb(H,r);Ko(e,n,pe,ui(e))}else Ko(e,n,r,ui(e))}catch(Ee){Ko(e,n,{then:function(){},status:"rejected",reason:Ee},ui())}finally{Ce.p=f,_!==null&&C.types!==null&&(_.types=C.types),ge.T=_}}function Db(){}function cd(e,n,a,r){if(e.tag!==5)throw Error(s(476));var c=mg(e).queue;pg(e,c,n,ut,a===null?Db:function(){return gg(e),a(r)})}function mg(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ut,baseState:ut,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Aa,lastRenderedState:ut},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Aa,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function gg(e){var n=mg(e);n.next===null&&(n=e.alternate.memoizedState),Ko(e,n.next.queue,{},ui())}function ud(){return Nn(Wr)}function xg(){return mn().memoizedState}function vg(){return mn().memoizedState}function Ub(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=ui();e=Ja(a);var r=$a(n,e,a);r!==null&&(ei(r,n,a),jo(r,n,a)),n={cache:Bf()},e.payload=n;return}n=n.return}}function Lb(e,n,a){var r=ui();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bc(e)?yg(n,a):(a=Rf(e,n,a,r),a!==null&&(ei(a,e,r),Sg(a,n,r)))}function _g(e,n,a){var r=ui();Ko(e,n,a,r)}function Ko(e,n,a,r){var c={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(bc(e))yg(n,c);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var _=n.lastRenderedState,C=f(_,a);if(c.hasEagerState=!0,c.eagerState=C,si(C,_))return $l(e,n,c,0),en===null&&Jl(),!1}catch{}finally{}if(a=Rf(e,n,c,r),a!==null)return ei(a,e,r),Sg(a,n,r),!0}return!1}function fd(e,n,a,r){if(r={lane:2,revertLane:th(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},bc(e)){if(n)throw Error(s(479))}else n=Rf(e,a,r,2),n!==null&&ei(n,e,2)}function bc(e){var n=e.alternate;return e===xt||n!==null&&n===xt}function yg(e,n){Tr=mc=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Sg(e,n,a){if((a&4194048)!==0){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,To(e,a)}}var Mc={readContext:Nn,use:vc,useCallback:hn,useContext:hn,useEffect:hn,useImperativeHandle:hn,useLayoutEffect:hn,useInsertionEffect:hn,useMemo:hn,useReducer:hn,useRef:hn,useState:hn,useDebugValue:hn,useDeferredValue:hn,useTransition:hn,useSyncExternalStore:hn,useId:hn,useHostTransitionStatus:hn,useFormState:hn,useActionState:hn,useOptimistic:hn,useMemoCache:hn,useCacheRefresh:hn,useEffectEvent:hn},bg={readContext:Nn,use:vc,useCallback:function(e,n){return jn().memoizedState=[e,n===void 0?null:n],e},useContext:Nn,useEffect:sg,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,yc(4194308,4,cg.bind(null,n,e),a)},useLayoutEffect:function(e,n){return yc(4194308,4,e,n)},useInsertionEffect:function(e,n){yc(4,2,e,n)},useMemo:function(e,n){var a=jn();n=n===void 0?null:n;var r=e();if(Vs){Ut(!0);try{e()}finally{Ut(!1)}}return a.memoizedState=[r,n],r},useReducer:function(e,n,a){var r=jn();if(a!==void 0){var c=a(n);if(Vs){Ut(!0);try{a(n)}finally{Ut(!1)}}}else c=n;return r.memoizedState=r.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},r.queue=e,e=e.dispatch=Lb.bind(null,xt,e),[r.memoizedState,e]},useRef:function(e){var n=jn();return e={current:e},n.memoizedState=e},useState:function(e){e=ad(e);var n=e.queue,a=_g.bind(null,xt,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:od,useDeferredValue:function(e,n){var a=jn();return ld(a,e,n)},useTransition:function(){var e=ad(!1);return e=pg.bind(null,xt,e.queue,!0,!1),jn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var r=xt,c=jn();if(Mt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),en===null)throw Error(s(349));(Rt&127)!==0||k0(r,n,a)}c.memoizedState=a;var f={value:a,getSnapshot:n};return c.queue=f,sg(X0.bind(null,r,f,e),[e]),r.flags|=2048,wr(9,{destroy:void 0},j0.bind(null,r,f,a,n),null),a},useId:function(){var e=jn(),n=en.identifierPrefix;if(Mt){var a=Qi,r=Ki;a=(r&~(1<<32-pt(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=gc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Ab++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:ud,useFormState:eg,useActionState:eg,useOptimistic:function(e){var n=jn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=fd.bind(null,xt,!0,a),a.dispatch=n,[e,n]},useMemoCache:td,useCacheRefresh:function(){return jn().memoizedState=Ub.bind(null,xt)},useEffectEvent:function(e){var n=jn(),a={impl:e};return n.memoizedState=a,function(){if((Vt&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Mg={readContext:Nn,use:vc,useCallback:fg,useContext:Nn,useEffect:rd,useImperativeHandle:ug,useInsertionEffect:og,useLayoutEffect:lg,useMemo:dg,useReducer:_c,useRef:ag,useState:function(){return _c(Aa)},useDebugValue:od,useDeferredValue:function(e,n){var a=mn();return hg(a,Qt.memoizedState,e,n)},useTransition:function(){var e=_c(Aa)[0],n=mn().memoizedState;return[typeof e=="boolean"?e:Zo(e),n]},useSyncExternalStore:V0,useId:xg,useHostTransitionStatus:ud,useFormState:tg,useActionState:tg,useOptimistic:function(e,n){var a=mn();return Y0(a,Qt,e,n)},useMemoCache:td,useCacheRefresh:vg,useEffectEvent:rg},Ob={readContext:Nn,use:vc,useCallback:fg,useContext:Nn,useEffect:rd,useImperativeHandle:ug,useInsertionEffect:og,useLayoutEffect:lg,useMemo:dg,useReducer:id,useRef:ag,useState:function(){return id(Aa)},useDebugValue:od,useDeferredValue:function(e,n){var a=mn();return Qt===null?ld(a,e,n):hg(a,Qt.memoizedState,e,n)},useTransition:function(){var e=id(Aa)[0],n=mn().memoizedState;return[typeof e=="boolean"?e:Zo(e),n]},useSyncExternalStore:V0,useId:xg,useHostTransitionStatus:ud,useFormState:ig,useActionState:ig,useOptimistic:function(e,n){var a=mn();return Qt!==null?Y0(a,Qt,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:td,useCacheRefresh:vg,useEffectEvent:rg};function dd(e,n,a,r){n=e.memoizedState,a=a(r,n),a=a==null?n:F({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var hd={enqueueSetState:function(e,n,a){e=e._reactInternals;var r=ui(),c=Ja(r);c.payload=n,a!=null&&(c.callback=a),n=$a(e,c,r),n!==null&&(ei(n,e,r),jo(n,e,r))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var r=ui(),c=Ja(r);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=$a(e,c,r),n!==null&&(ei(n,e,r),jo(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=ui(),r=Ja(a);r.tag=2,n!=null&&(r.callback=n),n=$a(e,r,a),n!==null&&(ei(n,e,a),jo(n,e,a))}};function Eg(e,n,a,r,c,f,_){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,f,_):n.prototype&&n.prototype.isPureReactComponent?!Io(a,r)||!Io(c,f):!0}function Tg(e,n,a,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==e&&hd.enqueueReplaceState(n,n.state,null)}function ks(e,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(e=e.defaultProps){a===n&&(a=F({},a));for(var c in e)a[c]===void 0&&(a[c]=e[c])}return a}function Ag(e){Ql(e)}function wg(e){console.error(e)}function Cg(e){Ql(e)}function Ec(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function Rg(e,n,a){try{var r=e.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function pd(e,n,a){return a=Ja(a),a.tag=3,a.payload={element:null},a.callback=function(){Ec(e,n)},a}function Ng(e){return e=Ja(e),e.tag=3,e}function Dg(e,n,a,r){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var f=r.value;e.payload=function(){return c(f)},e.callback=function(){Rg(n,a,r)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(e.callback=function(){Rg(n,a,r),typeof c!="function"&&(os===null?os=new Set([this]):os.add(this));var C=r.stack;this.componentDidCatch(r.value,{componentStack:C!==null?C:""})})}function Pb(e,n,a,r,c){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Ps(n,a,c,!0),a=Dn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return Bn===null?Xc():a.alternate===null&&pn===0&&(pn=3),a.flags&=-257,a.flags|=65536,a.lanes=c,r===uc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Jd(e,r,c)),!1;case 22:return a.flags|=65536,r===uc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Jd(e,r,c)),!1}throw Error(s(435,a.tag))}return Jd(e,r,c),Xc(),!1}if(Mt)return n=Dn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,r!==Of&&(e=Error(s(422),{cause:r}),Fo(Si(e,a)))):(r!==Of&&(n=Error(s(423),{cause:r}),Fo(Si(n,a))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,r=Si(r,a),c=pd(e.stateNode,r,c),jf(e,c),pn!==4&&(pn=2)),!1;var f=Error(s(520),{cause:r});if(f=Si(f,a),al===null?al=[f]:al.push(f),pn!==4&&(pn=2),n===null)return!0;r=Si(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=c&-c,a.lanes|=e,e=pd(a.stateNode,r,e),jf(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(os===null||!os.has(f))))return a.flags|=65536,c&=-c,a.lanes|=c,c=Ng(c),Dg(c,e,a,r),jf(a,c),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var md=Error(s(461)),vn=!1;function bn(e,n,a,r){n.child=e===null?P0(n,null,a,r):Gs(n,e.child,a,r)}function Ug(e,n,a,r,c){a=a.render;var f=n.ref;if("ref"in r){var _={};for(var C in r)C!=="ref"&&(_[C]=r[C])}else _=r;return Is(n),r=Qf(e,n,a,_,f,c),C=Jf(),e!==null&&!vn?($f(e,n,c),wa(e,n,c)):(Mt&&C&&ic(n),n.flags|=1,bn(e,n,r,c),n.child)}function Lg(e,n,a,r,c){if(e===null){var f=a.type;return typeof f=="function"&&!Nf(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Og(e,n,f,r,c)):(e=tc(a.type,null,r,n,n.mode,c),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!Md(e,c)){var _=f.memoizedProps;if(a=a.compare,a=a!==null?a:Io,a(_,r)&&e.ref===n.ref)return wa(e,n,c)}return n.flags|=1,e=Sa(f,r),e.ref=n.ref,e.return=n,n.child=e}function Og(e,n,a,r,c){if(e!==null){var f=e.memoizedProps;if(Io(f,r)&&e.ref===n.ref)if(vn=!1,n.pendingProps=r=f,Md(e,c))(e.flags&131072)!==0&&(vn=!0);else return n.lanes=e.lanes,wa(e,n,c)}return gd(e,n,a,r,c)}function Pg(e,n,a,r){var c=r.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(r=n.child=e.child,c=0;r!==null;)c=c|r.lanes|r.childLanes,r=r.sibling;r=c&~f}else r=0,n.child=null;return Ig(e,n,f,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&lc(n,f!==null?f.cachePool:null),f!==null?B0(n,f):Wf(),F0(n);else return r=n.lanes=536870912,Ig(e,n,f!==null?f.baseLanes|a:a,a,r)}else f!==null?(lc(n,f.cachePool),B0(n,f),ns(),n.memoizedState=null):(e!==null&&lc(n,null),Wf(),ns());return bn(e,n,c,a),n.child}function Qo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Ig(e,n,a,r,c){var f=Hf();return f=f===null?null:{parent:gn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&lc(n,null),Wf(),F0(n),e!==null&&Ps(e,n,r,!0),n.childLanes=c,null}function Tc(e,n){return n=Ac({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function zg(e,n,a){return Gs(n,e.child,null,a),e=Tc(n,n.pendingProps),e.flags|=2,ri(n),n.memoizedState=null,e}function Ib(e,n,a){var r=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Mt){if(r.mode==="hidden")return e=Tc(n,r),n.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Qo(null,e);if(Yf(n),(e=an)?(e=cv(e,Ei),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Wa!==null?{id:Ki,overflow:Qi}:null,retryLane:536870912,hydrationErrors:null},a=y0(e),a.return=n,n.child=a,Tn=n,an=null)):e=null,e===null)throw Ya(n);return n.lanes=536870912,null}return Tc(n,r)}var f=e.memoizedState;if(f!==null){var _=f.dehydrated;if(Yf(n),c)if(n.flags&256)n.flags&=-257,n=zg(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(vn||Ps(e,n,a,!1),c=(a&e.childLanes)!==0,vn||c){if(es.current===null){if(r=en,r!==null&&(_=Ao(r,a),_!==0&&_!==f.retryLane))throw f.retryLane=_,Ds(e,_),ei(r,e,_),md;Xc()}n=zg(e,n,a)}else e=f.treeContext,an=Ai(_.nextSibling),Tn=n,Mt=!0,qa=null,Ei=!1,e!==null&&M0(n,e),n=Tc(n,r),n.flags|=134221824;return n}return e=Sa(e.child,{mode:r.mode,children:r.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Cr(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function gd(e,n,a,r,c){return Is(n),a=Qf(e,n,a,r,void 0,c),r=Jf(),e!==null&&!vn?($f(e,n,c),wa(e,n,c)):(Mt&&r&&ic(n),n.flags|=1,bn(e,n,a,c),n.child)}function Bg(e,n,a,r,c,f){return Is(n),n.updateQueue=null,a=G0(n,r,a,c),H0(e),r=Jf(),e!==null&&!vn?($f(e,n,f),wa(e,n,f)):(Mt&&r&&ic(n),n.flags|=1,bn(e,n,a,f),n.child)}function Fg(e,n,a,r,c){if(Is(n),n.stateNode===null){var f=vr,_=a.contextType;typeof _=="object"&&_!==null&&(f=Nn(_)),f=new a(r,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=hd,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=r,f.state=n.memoizedState,f.refs={},Vf(n),_=a.contextType,f.context=typeof _=="object"&&_!==null?Nn(_):vr,f.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(dd(n,a,_,r),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(_=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),_!==f.state&&hd.enqueueReplaceState(f,f.state,null),Wo(n,r,f,c),Xo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(e===null){f=n.stateNode;var C=n.memoizedProps,H=ks(a,C);f.props=H;var ie=f.context,pe=a.contextType;_=vr,typeof pe=="object"&&pe!==null&&(_=Nn(pe));var Ee=a.getDerivedStateFromProps;pe=typeof Ee=="function"||typeof f.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,pe||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(C||ie!==_)&&Tg(n,f,r,_),Qa=!1;var $=n.memoizedState;f.state=$,Wo(n,r,f,c),Xo(),ie=n.memoizedState,C||$!==ie||Qa?(typeof Ee=="function"&&(dd(n,a,Ee,r),ie=n.memoizedState),(H=Qa||Eg(n,a,H,r,$,ie,_))?(pe||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=ie),f.props=r,f.state=ie,f.context=_,r=H):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{f=n.stateNode,kf(e,n),_=n.memoizedProps,pe=ks(a,_),f.props=pe,Ee=n.pendingProps,$=f.context,ie=a.contextType,H=vr,typeof ie=="object"&&ie!==null&&(H=Nn(ie)),C=a.getDerivedStateFromProps,(ie=typeof C=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(_!==Ee||$!==H)&&Tg(n,f,r,H),Qa=!1,$=n.memoizedState,f.state=$,Wo(n,r,f,c),Xo();var de=n.memoizedState;_!==Ee||$!==de||Qa||e!==null&&e.dependencies!==null&&rc(e.dependencies)?(typeof C=="function"&&(dd(n,a,C,r),de=n.memoizedState),(pe=Qa||Eg(n,a,pe,r,$,de,H)||e!==null&&e.dependencies!==null&&rc(e.dependencies))?(ie||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,de,H),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,de,H)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&$===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&$===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=de),f.props=r,f.state=de,f.context=H,r=pe):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&$===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&$===e.memoizedState||(n.flags|=1024),r=!1)}return f=r,Cr(e,n),r=(n.flags&128)!==0,f||r?(f=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&r?(n.child=Gs(n,e.child,null,c),n.child=Gs(n,null,a,c)):bn(e,n,a,c),n.memoizedState=f.state,e=n.child):e=wa(e,n,c),e}function Hg(e,n,a,r){return Ls(),n.flags|=256,bn(e,n,a,r),n.child}var xd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vd(e){return{baseLanes:e,cachePool:R0()}}function _d(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ci),e}function Gg(e,n,a){var r=n.pendingProps,c=!1,f=(n.flags&128)!==0,_;if((_=f)||(_=e!==null&&e.memoizedState===null?!1:(Un.current&2)!==0),_&&(c=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,e===null){if(Mt){if(c?ts(n):ns(),(e=an)?(e=cv(e,Ei),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Wa!==null?{id:Ki,overflow:Qi}:null,retryLane:536870912,hydrationErrors:null},a=y0(e),a.return=n,n.child=a,Tn=n,an=null)):e=null,e===null)throw Ya(n);return vh(e)?n.lanes=32:n.lanes=536870912,null}return f=r.children,r=r.fallback,c?(ns(),c=n.mode,f=Ac({mode:"hidden",children:f},c),r=Us(r,c,a,null),f.return=n,r.return=n,f.sibling=r,n.child=f,r=n.child,r.memoizedState=vd(a),r.childLanes=_d(e,_,a),n.memoizedState=xd,Qo(null,r)):(ts(n),yd(n,f))}var C=e.memoizedState;if(C!==null){var H=C.dehydrated;if(H!==null)return zb(e,n,f,_,r,H,C,a)}return c?(ns(),c=r.fallback,f=n.mode,C=e.child,H=C.sibling,r=Sa(C,{mode:"hidden",children:r.children}),r.subtreeFlags=C.subtreeFlags&1206910976,H!==null?c=Sa(H,c):(c=Us(c,f,a,null),c.flags|=2),c.return=n,r.return=n,r.sibling=c,n.child=r,Qo(null,r),r=n.child,c=e.child.memoizedState,c===null?c=vd(a):(f=c.cachePool,f!==null?(C=gn._currentValue,f=f.parent!==C?{parent:C,pool:C}:f):f=R0(),c={baseLanes:c.baseLanes|a,cachePool:f}),r.memoizedState=c,r.childLanes=_d(e,_,a),n.memoizedState=xd,Qo(e.child,r)):(ts(n),a=e.child,e=a.sibling,a=Sa(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,e!==null&&(_=n.deletions,_===null?(n.deletions=[e],n.flags|=16):_.push(e)),n.child=a,n.memoizedState=null,a)}function yd(e,n){return n=Ac({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Ac(e,n){return e=Kn(22,e,null,n),e.lanes=0,e}function wc(e,n,a){return Gs(n,e.child,null,a),e=yd(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function zb(e,n,a,r,c,f,_,C){if(a)return n.flags&256?(ts(n),n.flags&=-257,wc(e,n,C)):n.memoizedState!==null?(ns(),n.child=e.child,n.flags|=128,null):(ns(),f=c.fallback,_=n.mode,c=Ac({mode:"visible",children:c.children},_),f=Us(f,_,C,null),f.flags|=2,c.return=n,f.return=n,c.sibling=f,n.child=c,Gs(n,e.child,null,C),c=n.child,c.memoizedState=vd(C),c.childLanes=_d(e,r,C),n.memoizedState=xd,Qo(null,c));if(ts(n),vh(f)){if(r=f.nextSibling&&f.nextSibling.dataset,r)var H=r.dgst;return r=H,r!==""&&(c=Error(s(419)),c.stack="",c.digest=r,Fo({value:c,source:null,stack:null})),wc(e,n,C)}if(vn||Ps(e,n,C,!1),r=(C&e.childLanes)!==0,vn||r){if(es.current!==null)return wc(e,n,C);if(r=en,r!==null&&(c=Ao(r,C),c!==0&&c!==_.retryLane))throw _.retryLane=c,Ds(e,c),ei(r,e,c),md;return xh(f)||Xc(),wc(e,n,C)}return xh(f)?(n.flags|=192,n.child=e.child,null):(e=_.treeContext,an=Ai(f.nextSibling),Tn=n,Mt=!0,qa=null,Ei=!1,e!==null&&M0(n,e),n=yd(n,c.children),n.flags|=134221824,n)}function Vg(e,n,a){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),sc(e.return,n,a)}function kg(e){for(var n=null;e!==null;){var a=e.alternate;a!==null&&pc(a)===null&&(n=e),e=e.sibling}return n}function Cc(e,n,a,r,c,f){var _=e.memoizedState;_===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:c,treeForkCount:f}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=r,_.tail=a,_.tailMode=c,_.treeForkCount=f)}function Sd(e){var n=e.child;for(e.child=null;n!==null;){var a=n.sibling;n.sibling=e.child,e.child=n,n=a}}function bd(e,n,a){var r=n.pendingProps,c=r.revealOrder,f=r.tail;r=r.children;var _=Un.current;if(n.flags&128)return qo(n,_),null;var C=(_&2)!==0;if(C?(_=_&1|2,n.flags|=128):_&=1,qo(n,_),c==="backwards"&&e!==null?(Sd(e),bn(e,n,r,a),Sd(e)):bn(e,n,r,a),r=Mt?Bo:0,!C&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vg(e,a,n);else if(e.tag===19)Vg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"backwards":a=kg(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null,Sd(n)),Cc(n,!0,c,null,f,r);break;case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(e=c.alternate,e!==null&&pc(e)===null){n.child=c;break}e=c.sibling,c.sibling=a,a=c,c=e}Cc(n,!0,a,null,f,r);break;case"together":Cc(n,!1,null,null,void 0,r);break;case"independent":n.memoizedState=null;break;default:a=kg(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),Cc(n,!1,c,a,f,r)}return n.child}function jg(e,n,a){var r=n.pendingProps;return Za(n,n.type,r.value),bn(e,n,r.children,a),n.child}function wa(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),rs|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(Ps(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Sa(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Sa(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Md(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&rc(e)))}function Bb(e,n,a){switch(n.tag){case 3:Z(n,n.stateNode.containerInfo),Za(n,gn,e.memoizedState.cache),Ls();break;case 27:case 5:Dt(n);break;case 4:Z(n,n.stateNode.containerInfo);break;case 10:Za(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Yf(n),null;break;case 13:var r=n.memoizedState;if(r!==null){if(r.dehydrated!==null)return ts(n),n.flags|=128,null;r=Ps(e,n,a,!1);var c=n.child.childLanes;return r||(a&c)!==0?Gg(e,n,a):(ts(n),e=wa(e,n,a),e!==null?e.sibling:null)}ts(n);break;case 19:if(n.flags&128)return bd(e,n,a);if(c=(e.flags&128)!==0,r=(a&n.childLanes)!==0,r||(Ps(e,n,a,!1),r=(a&n.childLanes)!==0),c){if(r)return bd(e,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),qo(n,Un.current),r)break;return null;case 22:return n.lanes=0,Pg(e,n,a,n.pendingProps);case 24:Za(n,gn,e.memoizedState.cache)}return wa(e,n,a)}function Xg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)vn=!0;else{if(!Md(e,a)&&(n.flags&128)===0)return vn=!1,Bb(e,n,a);vn=(e.flags&131072)!==0}else vn=!1,Mt&&(n.flags&1048576)!==0&&b0(n,Bo,n.index);switch(n.lanes=0,n.tag){case 16:e:{var r=n.pendingProps;if(e=Fs(n.elementType),n.type=e,typeof e=="function")Nf(e)?(r=ks(e,r),n.tag=1,n=Fg(null,n,e,r,a)):(n.tag=0,n=gd(null,n,e,r,a));else{if(e!=null){var c=e.$$typeof;if(c===Q){n.tag=11,n=Ug(null,n,e,r,a);break e}else if(c===ue){n.tag=14,n=Lg(null,n,e,r,a);break e}else if(c===ne){n.tag=10,n.type=e,n=jg(null,n,a);break e}}throw n=be(e)||e,Error(s(306,n,""))}}return n;case 0:return gd(e,n,n.type,n.pendingProps,a);case 1:return r=n.type,c=ks(r,n.pendingProps),Fg(e,n,r,c,a);case 3:e:{if(Z(n,n.stateNode.containerInfo),e===null)throw Error(s(387));r=n.pendingProps;var f=n.memoizedState;c=f.element,kf(e,n),Wo(n,r,null,a);var _=n.memoizedState;if(r=_.cache,Za(n,gn,r),r!==f.cache&&zf(n,[gn],a,!0),Xo(),r=_.element,f.isDehydrated)if(f={element:r,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Hg(e,n,r,a);break e}else if(r!==c){c=Si(Error(s(424)),n),Fo(c),n=Hg(e,n,r,a);break e}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(an=Ai(e.firstChild),Tn=n,Mt=!0,qa=null,Ei=!0,a=P0(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Ls(),r===c){n=wa(e,n,a);break e}bn(e,n,r,a)}n=n.child}return n;case 26:return Cr(e,n),e===null?(a=gv(n.type,null,n.pendingProps,null))?n.memoizedState=a:Mt||(n.stateNode=Zx(n.type,n.pendingProps,zt.current,n)):n.memoizedState=gv(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Dt(n),e===null&&Mt&&(r=n.stateNode=dv(n.type,n.pendingProps,zt.current),Tn=n,Ei=!0,c=an,us(n.type)?(_h=c,an=Ai(r.firstChild)):an=c),bn(e,n,n.pendingProps.children,a),Cr(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Mt&&((c=r=an)&&(r=UM(r,n.type,n.pendingProps,Ei),r!==null?(n.stateNode=r,Tn=n,an=Ai(r.firstChild),Ei=!1,c=!0):c=!1),c||Ya(n)),Dt(n),c=n.type,f=n.pendingProps,_=e!==null?e.memoizedProps:null,r=f.children,uh(c,f)?r=null:_!==null&&uh(c,_)&&(n.flags|=32),n.memoizedState!==null&&(c=Qf(e,n,wb,null,null,a),Wr._currentValue=c),Cr(e,n),bn(e,n,r,a),n.child;case 6:return e===null&&Mt&&((e=a=an)&&(a=LM(a,n.pendingProps,Ei),a!==null?(n.stateNode=a,Tn=n,an=null,e=!0):e=!1),e||Ya(n)),null;case 13:return Gg(e,n,a);case 4:return Z(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=Gs(n,null,r,a):bn(e,n,r,a),n.child;case 11:return Ug(e,n,n.type,n.pendingProps,a);case 7:return r=n.pendingProps,Cr(e,n),bn(e,n,r,a),n.child;case 8:return bn(e,n,n.pendingProps.children,a),n.child;case 12:return bn(e,n,n.pendingProps.children,a),n.child;case 10:return jg(e,n,a);case 9:return c=n.type._context,r=n.pendingProps.children,Is(n),c=Nn(c),r=r(c),n.flags|=1,bn(e,n,r,a),n.child;case 14:return Lg(e,n,n.type,n.pendingProps,a);case 15:return Og(e,n,n.type,n.pendingProps,a);case 19:return bd(e,n,a);case 31:return Ib(e,n,a);case 22:return Pg(e,n,a,n.pendingProps);case 24:return Is(n),r=Nn(gn),e===null?(c=Hf(),c===null&&(c=en,f=Bf(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=a),c=f),n.memoizedState={parent:r,cache:c},Vf(n),Za(n,gn,c)):((e.lanes&a)!==0&&(kf(e,n),Wo(n,null,null,a),Xo()),c=e.memoizedState,f=n.memoizedState,c.parent!==r?(c={parent:r,cache:r},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Za(n,gn,r)):(r=f.cache,Za(n,gn,r),r!==c.cache&&zf(n,[gn],a,!0))),bn(e,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=n.pendingProps,r.name!=null&&r.name!=="auto"?n.flags|=e===null?18882560:18874368:Mt&&ic(n),e!==null&&e.memoizedProps.name!==r.name?n.flags|=4194816:Cr(e,n),bn(e,n,r.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ca(e){e.flags|=4}function Ed(e,n,a,r,c){var f;if((f=(e.mode&32)!==0)&&(f=a===null?yv(n,r):yv(n,r)&&(r.src!==a.src||r.srcSet!==a.srcSet)),f){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(Ax())e.flags|=8192;else throw Hs=uc,Gf}else e.flags&=-16777217}function Wg(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Sv(n))if(Ax())e.flags|=8192;else throw Hs=uc,Gf}function Rc(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Eo():536870912,e.lanes|=n,Lr|=n)}function Jo(e,n){if(!Mt)switch(e.tailMode){case"visible":break;case"collapsed":for(var a=e.tail,r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(n=e.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null}}function sn(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(n)for(var c=e.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags&1206910976,r|=c.flags&1206910976,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=r,e.childLanes=a,n}function Fb(e,n,a){var r=n.pendingProps;switch(Lf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sn(n),null;case 1:return sn(n),null;case 3:return a=n.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Ea(gn),tn(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Sr(n)?Ca(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Pf())),sn(n),null;case 26:var c=n.type,f=n.memoizedState;return e===null?(Ca(n),f!==null?(sn(n),Wg(n,f)):(sn(n),Ed(n,c,null,r,a))):f?f!==e.memoizedState?(Ca(n),sn(n),Wg(n,f)):(sn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==r&&Ca(n),sn(n),Ed(n,c,e,r,a)),null;case 27:if(z(n),a=zt.current,c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Ca(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return sn(n),n.subtreeFlags&=-33554433,null}e=Et.current,Sr(n)?E0(n):(e=dv(c,r,a),n.stateNode=e,Ca(n))}return sn(n),n.subtreeFlags&=-33554433,null;case 5:if(z(n),c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Ca(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return sn(n),n.subtreeFlags&=-33554433,null}if(f=Et.current,Sr(n))E0(n);else{var _=cl(zt.current);switch(f){case 1:f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":f=_.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof r.is=="string"?_.createElement("select",{is:r.is}):_.createElement("select"),r.multiple?f.multiple=!0:r.size&&(f.size=r.size);break;default:f=typeof r.is=="string"?_.createElement(c,{is:r.is}):_.createElement(c)}}f[w]=n,f[V]=r;e:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)f.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break e;for(;_.sibling===null;){if(_.return===null||_.return===n)break e;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=f;e:switch(On(f,c,r),c){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&Ca(n)}}return sn(n),n.subtreeFlags&=-33554433,Ed(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==r&&Ca(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(e=zt.current,Sr(n)){if(e=n.stateNode,a=n.memoizedProps,r=null,c=Tn,c!==null)switch(c.tag){case 27:case 5:r=c.memoizedProps}e[w]=n,e=!!(e.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||Xx(e.nodeValue,a)),e||Ya(n,!0)}else e=cl(e).createTextNode(r),e[w]=n,n.stateNode=e}return sn(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(r=Sr(n),a!==null){if(e===null){if(!r)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[w]=n}else Ls(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;sn(n),e=!1}else a=Pf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ri(n),n):(ri(n),null);if((n.flags&128)!==0)throw Error(s(558))}return sn(n),null;case 13:if(r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=Sr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[w]=n}else Ls(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;sn(n),c=!1}else c=Pf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(ri(n),n):(ri(n),null)}return ri(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,e=e!==null&&e.memoizedState!==null,a&&(r=n.child,c=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(c=r.alternate.memoizedState.cachePool.pool),f=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(f=r.memoizedState.cachePool.pool),f!==c&&(r.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Rc(n,n.updateQueue),sn(n),null);case 4:return tn(),e===null&&sh(n.stateNode.containerInfo),n.flags|=67108864,sn(n),null;case 10:return Ea(n.type),sn(n),null;case 19:if(Zf(n),r=n.memoizedState,r===null)return sn(n),null;if(c=(n.flags&128)!==0,f=r.rendering,f===null)if(c)Jo(r,!1);else{if(pn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=pc(e),f!==null){for(n.flags|=128,Jo(r,!1),e=f.updateQueue,n.updateQueue=e,Rc(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)_0(a,e),a=a.sibling;return qo(n,Un.current&1|2),Mt&&ba(n,r.treeForkCount),n.child}e=e.sibling}r.tail!==null&&qe()>Gc&&(n.flags|=128,c=!0,Jo(r,!1),n.lanes=4194304)}else{if(!c)if(e=pc(f),e!==null){if(n.flags|=128,c=!0,e=e.updateQueue,n.updateQueue=e,Rc(n,e),Jo(r,!0),r.tail===null&&r.tailMode!=="collapsed"&&r.tailMode!=="visible"&&!f.alternate&&!Mt)return sn(n),null}else 2*qe()-r.renderingStartTime>Gc&&a!==536870912&&(n.flags|=128,c=!0,Jo(r,!1),n.lanes=4194304);r.isBackwards?(f.sibling=n.child,n.child=f):(e=r.last,e!==null?e.sibling=f:n.child=f,r.last=f)}if(r.tail!==null){e=r.tail;e:{for(a=e;a!==null;){if(a.alternate!==null){a=!1;break e}a=a.sibling}a=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=qe(),e.sibling=null,f=Un.current,f=c?f&1|2:f&1,r.tailMode==="visible"||r.tailMode==="collapsed"||!a||Mt?qo(n,f):(a=f,nt(Dn,n),nt(Un,a),Bn===null&&(Bn=n)),Mt&&ba(n,r.treeForkCount),e}return sn(n),null;case 22:case 23:return ri(n),qf(),r=n.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(sn(n),n.subtreeFlags&6&&(n.flags|=8192)):sn(n),a=n.updateQueue,a!==null&&Rc(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),e!==null&&Je(Bs),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Ea(gn),sn(n),null;case 25:return null;case 30:return n.flags|=33554432,sn(n),null}throw Error(s(156,n.tag))}function Hb(e,n){switch(Lf(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Ea(gn),tn(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return z(n),null;case 31:if(n.memoizedState!==null){if(ri(n),n.alternate===null)throw Error(s(340));Ls()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ri(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Ls()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Zf(n),e=n.flags,e&65536?(n.flags=e&-65537|128,e=n.memoizedState,e!==null&&(e.rendering=null,e.tail=null),n.flags|=4,n):null;case 4:return tn(),null;case 10:return Ea(n.type),null;case 22:case 23:return ri(n),qf(),e!==null&&Je(Bs),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Ea(gn),null;case 25:return null;default:return null}}function qg(e,n){switch(Lf(n),n.tag){case 3:Ea(gn),tn();break;case 26:case 27:case 5:z(n);break;case 4:tn();break;case 31:n.memoizedState!==null&&ri(n);break;case 13:ri(n);break;case 19:Zf(n);break;case 10:Ea(n.type);break;case 22:case 23:ri(n),qf(),e!==null&&Je(Bs);break;case 24:Ea(gn)}}function $o(e,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var c=r.next;a=c;do{if((a.tag&e)===e){r=void 0;var f=a.create,_=a.inst;r=f(),_.destroy=r}a=a.next}while(a!==c)}}catch(C){qt(n,n.return,C)}}function is(e,n,a){try{var r=n.updateQueue,c=r!==null?r.lastEffect:null;if(c!==null){var f=c.next;r=f;do{if((r.tag&e)===e){var _=r.inst,C=_.destroy;if(C!==void 0){_.destroy=void 0,c=n;var H=a,ie=C;try{ie()}catch(pe){qt(c,H,pe)}}}r=r.next}while(r!==f)}}catch(pe){qt(n,n.return,pe)}}function Yg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{z0(n,a)}catch(r){qt(e,e.return,r)}}}function Zg(e,n,a){a.props=ks(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(r){qt(e,n,r)}}function Ji(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var c=e.stateNode,f=_a(e.memoizedProps,c);(c.ref===null||c.ref.name!==f)&&(c.ref=nv(f)),r=c.ref;break;case 7:if(e.stateNode===null){var _=new fi(e);x(e.child,!1,NM,_,void 0,void 0),e.stateNode=_}r=e.stateNode;break;default:r=e.stateNode}typeof a=="function"?e.refCleanup=a(r):a.current=r}}catch(C){qt(e,n,C)}}function Ln(e,n){var a=e.ref,r=e.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(c){qt(e,n,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){qt(e,n,c)}else a.current=null}function Nc(e,n){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&n!==null)for(var a=0;a<n.length;a++)lv(e.stateNode,n[a])}function Kg(e){for(var n=e.return;n!==null&&(Ad(n)&&lv(e.stateNode,n.stateNode),!Td(n));)n=n.return}function el(e){for(var n=e.return;n!==null&&(Ad(n)&&DM(e.stateNode,n.stateNode),!Td(n));)n=n.return}function Td(e){return e.tag===5||e.tag===3||e.tag===27}function Ad(e){return e&&e.tag===7&&e.stateNode!==null}function wd(e){var n=e.type,a=e.memoizedProps,r=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break e;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(c){qt(e,e.return,c)}}function Cd(e,n,a){try{var r=e.stateNode;dM(r,e.type,a,n),r[V]=n}catch(c){qt(e,e.return,c)}}function Qg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&us(e.type)||e.tag===4}function Rd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Qg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&us(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Nd(e,n,a,r){var c=e.tag;if(c===5||c===6)c=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(c,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(c),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Zi)),Nc(e,r),bt=!0;else if(c!==4&&(c===27&&(Nc(e,r),r=null,us(e.type)&&(a=e.stateNode,n=null)),e=e.child,e!==null))for(Nd(e,n,a,r),e=e.sibling;e!==null;)Nd(e,n,a,r),e=e.sibling}function Dc(e,n,a,r){var c=e.tag;if(c===5||c===6)c=e.stateNode,n?a.insertBefore(c,n):a.appendChild(c),Nc(e,r),bt=!0;else if(c!==4&&(c===27&&(Nc(e,r),r=null,us(e.type)&&(a=e.stateNode)),e=e.child,e!==null))for(Dc(e,n,a,r),e=e.sibling;e!==null;)Dc(e,n,a,r),e=e.sibling}function Jg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var r=e.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);On(n,r,a),n[w]=e,n[V]=a}catch(f){qt(e,e.return,f)}}var Uc=!1,oi=null;function $g(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Uc=!0)}var $i=null;function ex(){var e=$i;return $i=null,e}var Qn=0;function Rr(e,n,a,r,c){return Qn=0,tx(e.child,n,a,r,c)}function tx(e,n,a,r,c){for(var f=!1;e!==null;){if(e.tag===5){var _=e.stateNode;if(r!==null){var C=hh(_);r.push(C),C.view&&(f=!0)}else f||hh(_).view&&(f=!0);Uc=!0,ev(_,Qn===0?n:n+"_"+Qn,a),Qn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&c||tx(e.child,n,a,r,c)&&(f=!0));e=e.sibling}return f}function ea(e,n){for(;e!==null;)e.tag===5?tv(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&n||ea(e.child,n)),e=e.sibling}function Lc(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Lc(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var n=e.memoizedProps;if(n.name==null||n.name==="auto")throw Error(s(544));var a=n.name;n=ya(n.default,n.share),n!=="none"&&(Rr(e,a,n,null,!1)||ea(e.child,!1))}e=e.sibling}}function Dd(e,n){if(e.tag===30){var a=e.stateNode,r=e.memoizedProps,c=_a(r,a),f=ya(r.default,a.paired?r.share:r.enter);f!=="none"?Rr(e,c,f,null,!1)?(Lc(e),a.paired||n||zr(e,r.onEnter)):ea(e.child,!1):Lc(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Dd(e,n),e=e.sibling;else Lc(e)}function Ud(e){if(oi!==null&&oi.size!==0){var n=oi;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var a=e.memoizedProps,r=a.name;if(r!=null&&r!=="auto"){var c=n.get(r);if(c!==void 0){var f=ya(a.default,a.share);if(f!=="none"&&(Rr(e,r,f,null,!1)?(f=e.stateNode,c.paired=f,f.paired=c,zr(e,a.onShare)):ea(e.child,!1)),n.delete(r),n.size===0)break}}}Ud(e)}e=e.sibling}}}function Ld(e){if(e.tag===30){var n=e.memoizedProps,a=_a(n,e.stateNode),r=oi!==null?oi.get(a):void 0,c=ya(n.default,r!==void 0?n.share:n.exit);c!=="none"&&(Rr(e,a,c,null,!1)?r!==void 0?(c=e.stateNode,r.paired=c,c.paired=r,oi.delete(a),zr(e,n.onShare)):zr(e,n.onExit):ea(e.child,!1)),oi!==null&&Ud(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Ld(e),e=e.sibling;else oi!==null&&Ud(e)}function nx(e){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,a=_a(n,e.stateNode);n=ya(n.default,n.update),e.flags&=-5,n!=="none"&&Rr(e,a,n,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&nx(e);e=e.sibling}}function Od(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.stateNode;n.paired!==null&&(n.paired=null,ea(e.child,!1))}Od(e)}e=e.sibling}}function Oc(e){if(e.tag===30)e.stateNode.paired=null,ea(e.child,!1),Od(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Oc(e),e=e.sibling;else Od(e)}function ix(e){for(e=e.child;e!==null;)e.tag===30?ea(e.child,!1):(e.subtreeFlags&33554432)!==0&&ix(e),e=e.sibling}function Pd(e,n,a,r,c,f,_){for(var C=!1;n!==null;){if(n.tag===5){var H=n.stateNode;if(f!==null&&Qn<f.length){var ie=f[Qn],pe=hh(H);(ie.view||pe.view)&&(C=!0);var Ee;if(Ee=(e.flags&4)===0)if(pe.clip)Ee=!0;else{Ee=ie.rect;var $=pe.rect;Ee=Ee.y!==$.y||Ee.x!==$.x||Ee.height!==$.height||Ee.width!==$.width}Ee&&(e.flags|=4),pe.abs?pe=!ie.abs:(ie=ie.rect,pe=pe.rect,pe=ie.height!==pe.height||ie.width!==pe.width),pe&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&ev(H,Qn===0?a:a+"_"+Qn,c),C&&(e.flags&4)!==0||($i===null&&($i=[]),$i.push(H,Qn===0?r:r+"_"+Qn,n.memoizedProps)),Qn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&_?e.flags|=n.flags&32:Pd(e,n.child,a,r,c,f,_)&&(C=!0));n=n.sibling}return C}function ax(e,n){for(e=e.child;e!==null;){if(e.tag===30){var a=e.memoizedProps,r=e.stateNode,c=_a(a,r),f=ya(a.default,a.update),_;_=e.memoizedState,e.memoizedState=null,r=e;var C=e.child;Qn=0,c=Pd(r,C,c,c,f,_,!1),(e.flags&4)!==0&&c&&zr(e,a.onUpdate)}else(e.subtreeFlags&33554432)!==0&&ax(e);e=e.sibling}}var An=!1,Xt=!1,ta=!1,Id=!1,sx=typeof WeakSet=="function"?WeakSet:Set,wn=null,na=!1,tl=!1,Pc=!1,zd=!1;function Gb(e,n,a){if(e=e.containerInfo,lh=qr,e=c0(e),Mf(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var c=r.getSelection&&r.getSelection();if(c&&c.rangeCount!==0){r=c.anchorNode;var f=c.anchorOffset,_=c.focusNode;c=c.focusOffset;try{r.nodeType,_.nodeType}catch{r=null;break e}var C=0,H=-1,ie=-1,pe=0,Ee=0,$=e,de=null;t:for(;;){for(var Be;$!==r||f!==0&&$.nodeType!==3||(H=C+f),$!==_||c!==0&&$.nodeType!==3||(ie=C+c),$.nodeType===3&&(C+=$.nodeValue.length),(Be=$.firstChild)!==null;)de=$,$=Be;for(;;){if($===e)break t;if(de===r&&++pe===f&&(H=C),de===_&&++Ee===c&&(ie=C),(Be=$.nextSibling)!==null)break;$=de,de=$.parentNode}$=Be}r=H===-1||ie===-1?null:{start:H,end:ie}}else r=null}r=r||{start:0,end:0}}else r=null;for(ch={focusedElem:e,selectionRange:r},qr=!1,a=(a&335544064)===a,wn=n,n=a?9270:1024;wn!==null;){if(e=wn,a&&(r=e.deletions,r!==null))for(f=0;f<r.length;f++)a&&Ld(r[f]);if(e.alternate===null&&(e.flags&2)!==0)a&&$g(e),Ic(a);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&a&&Ld(r),Ic(a);continue}else if(r!==null&&r.memoizedState!==null){a&&$g(e),Ic(a);continue}}r=e.child,(e.subtreeFlags&n)!==0&&r!==null?(r.return=e,wn=r):(a&&nx(e),Ic(a))}}oi=null}function Ic(e){for(;wn!==null;){var n=wn,a=e,r=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((c&1024)!==0&&r!==null){a=void 0,c=r.memoizedProps,r=r.memoizedState;var f=n.stateNode;try{var _=ks(n.type,c);a=f.getSnapshotBeforeUpdate(_,r),f.__reactInternalSnapshotBeforeUpdate=a}catch(C){qt(n,n.return,C)}}break;case 3:if((c&1024)!==0){if(r=n.stateNode.containerInfo,a=r.nodeType,a===9)gh(r);else if(a===1)switch(r.nodeName){case"HEAD":case"HTML":case"BODY":gh(r);break;default:r.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&r!==null&&(a=_a(r.memoizedProps,r.stateNode),c=n.memoizedProps,c=ya(c.default,c.update),c!=="none"&&Rr(r,a,c,r.memoizedState=[],!0));break;default:if((c&1024)!==0)throw Error(s(163))}if(r=n.sibling,r!==null){r.return=n.return,wn=r;break}wn=n.return}}function rx(e,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:ia(e,a),r&4&&$o(5,a);break;case 1:if(ia(e,a),r&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(_){qt(a,a.return,_)}else{var c=ks(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(c,n,e.__reactInternalSnapshotBeforeUpdate)}catch(_){qt(a,a.return,_)}}r&64&&Yg(a),r&512&&Ji(a,a.return);break;case 3:if(ia(e,a),r&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{z0(e,n)}catch(_){qt(a,a.return,_)}}break;case 27:n===null&&r&4&&Jg(a);case 26:case 5:ia(e,a),n===null&&r&4&&wd(a),r&512&&Ji(a,a.return);break;case 12:ia(e,a);break;case 31:ia(e,a),r&4&&ux(e,a);break;case 13:ia(e,a),r&4&&fx(e,a),r&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=$b.bind(null,a),OM(e,a))));break;case 22:if(r=a.memoizedState!==null||An,!r){var f=n!==null&&n.memoizedState!==null||Xt;n=An,c=Xt,An=r,(Xt=f)&&!c?(r=2,(a.subtreeFlags&8772)!==0&&(r|=1),Ii(e,a,r)):ia(e,a),An=n,Xt=c}break;case 30:ia(e,a),r&512&&Ji(a,a.return);break;case 7:r&512&&Ji(a,a.return);default:ia(e,a)}}function Bd(e,n){for(e=e.child;e!==null;)ox(e,n),e=e.sibling}function ox(e,n){switch(e.tag){case 5:case 26:try{var a=e.stateNode;if(n){var r=a.style;typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"}else{var c=e.stateNode,f=e.memoizedProps.style,_=f!=null&&f.hasOwnProperty("display")?f.display:null;c.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(H){qt(e,e.return,H)}Fd(e,n);break;case 6:try{e.stateNode.nodeValue=n?"":e.memoizedProps,bt=!0}catch(H){qt(e,e.return,H)}break;case 18:try{var C=e.stateNode;n?$x(C,!0):$x(e.stateNode,!1)}catch(H){qt(e,e.return,H)}break;case 22:case 23:e.memoizedState===null&&Bd(e,n);break;default:Bd(e,n)}}function Fd(e,n){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){e:{var a=e,r=n;switch(a.tag){case 4:ox(a,r);break e;case 22:a.memoizedState===null&&Fd(a,r);break e;default:Fd(a,r)}}e=e.sibling}}function lx(e){var n=e.alternate;n!==null&&(e.alternate=null,lx(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&$e(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var rn=null,Jn=!1;function Oi(e,n,a){for(a=a.child;a!==null;)cx(e,n,a),a=a.sibling}function cx(e,n,a){if(Xe&&typeof Xe.onCommitFiberUnmount=="function")try{Xe.onCommitFiberUnmount(tt,a)}catch{}switch(a.tag){case 26:Xt||Ln(a,n),Oi(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Xt&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Xt||Ln(a,n),el(a);var r=rn,c=Jn;us(a.type)&&(rn=a.stateNode,Jn=!1),Oi(e,n,a),hv(a.stateNode,a.type,a.memoizedProps),rn=r,Jn=c;break;case 5:Xt||Ln(a,n),el(a);case 6:if(a.tag===6&&el(a),r=rn,c=Jn,rn=null,Oi(e,n,a),rn=r,Jn=c,rn!==null)if(Jn)try{(rn.nodeType===9?rn.body:rn.nodeName==="HTML"?rn.ownerDocument.body:rn).removeChild(a.stateNode),bt=!0}catch(f){qt(a,n,f)}else try{rn.removeChild(a.stateNode),bt=!0}catch(f){qt(a,n,f)}break;case 18:rn!==null&&(Jn?(e=rn,Jx(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Yr(e)):Jx(rn,a.stateNode));break;case 4:r=rn,c=Jn,rn=a.stateNode.containerInfo,Jn=!0,Oi(e,n,a),rn=r,Jn=c;break;case 0:case 11:case 14:case 15:is(2,a,n),Xt||is(4,a,n),Oi(e,n,a);break;case 1:Xt||(Ln(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&Zg(a,n,r)),Oi(e,n,a);break;case 21:Oi(e,n,a);break;case 22:Xt=(r=Xt)||a.memoizedState!==null,Oi(e,n,a),Xt=r;break;case 30:Ln(a,n),Oi(e,n,a);break;case 7:Xt||Ln(a,n),Oi(e,n,a);break;default:Oi(e,n,a)}}function ux(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Yr(e)}catch(a){qt(n,n.return,a)}}}function fx(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Yr(e)}catch(a){qt(n,n.return,a)}}function Vb(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new sx),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new sx),n;default:throw Error(s(435,e.tag))}}function zc(e,n){var a=Vb(e);n.forEach(function(r){if(!a.has(r)){a.add(r);var c=eM.bind(null,e,r);r.then(c,c)}})}function Xn(e,n,a){var r=n.deletions;if(r!==null)for(var c=0;c<r.length;c++){var f=r[c],_=e,C=n,H=C;e:for(;H!==null;){switch(H.tag){case 27:if(us(H.type)){rn=H.stateNode,Jn=!1;break e}break;case 5:rn=H.stateNode,Jn=!1;break e;case 3:case 4:rn=H.stateNode.containerInfo,Jn=!0;break e}H=H.return}if(rn===null)throw Error(s(160));cx(_,C,f),rn=null,Jn=!1,_=f.alternate,_!==null&&(_.return=null),f.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)dx(n,e,a),n=n.sibling}var Pi=null;function dx(e,n,a){var r=e.alternate,c=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(c&4&&(r=e.updateQueue,r=r!==null?r.events:null,r!==null))for(var f=0;f<r.length;f++){var _=r[f];_.ref.impl=_.nextImpl}Xn(n,e,a),Wn(e),c&4&&(is(3,e,e.return),$o(3,e),is(5,e,e.return));break;case 1:Xn(n,e,a),Wn(e),c&512&&(Xt||r===null||Ln(r,r.return)),c&64&&An&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(f=Pi,Xn(n,e,a),Wn(e),c&512&&(Xt||r===null||Ln(r,r.return)),c&4)if(c=r!==null?r.memoizedState:null,a=e.memoizedState,r===null)if(a===null)if(e.stateNode===null)if(An)e.stateNode=Zx(e.type,e.memoizedProps,n.containerInfo,e);else{e:{n=e.type,a=e.memoizedProps,c=f.ownerDocument||f;t:switch(n){case"title":r=c.getElementsByTagName("title")[0],(!r||r[ze]||r[w]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=c.createElement(n),c.head.insertBefore(r,c.querySelector("head > title"))),On(r,n,a),r[w]=e,St(r),n=r;break e;case"link":if(f=_v("link","href",c).get(n+(a.href||""))){for(_=0;_<f.length;_++)if(r=f[_],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){f.splice(_,1);break t}}r=c.createElement(n),On(r,n,a),c.head.appendChild(r);break;case"meta":if(f=_v("meta","content",c).get(n+(a.content||""))){for(_=0;_<f.length;_++)if(r=f[_],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){f.splice(_,1);break t}}r=c.createElement(n),On(r,n,a),c.head.appendChild(r);break;default:throw Error(s(468,n))}r[w]=e,St(r),n=r}e.stateNode=n}else An||Mh(f,e.type,e.stateNode);else e.stateNode=vv(f,a,e.memoizedProps);else c!==a?(c===null?(n=r.stateNode,n===null||Xt||n.parentNode.removeChild(n)):c.count--,a===null?An||Mh(f,e.type,e.stateNode):vv(f,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Cd(e,e.memoizedProps,r.memoizedProps);break;case 27:Xn(n,e,a),Wn(e),c&512&&(Xt||r===null||Ln(r,r.return)),r!==null&&c&4&&Cd(e,e.memoizedProps,r.memoizedProps);break;case 5:if(f=ta,ta=!1,Xn(n,e,a),ta=f,Wn(e),c&512&&(Xt||r===null||Ln(r,r.return)),e.flags&32){n=e.stateNode;try{fr(n,""),bt=!0}catch(pe){qt(e,e.return,pe)}}c&4&&e.stateNode!=null&&(n=e.memoizedProps,Cd(e,n,r!==null?r.memoizedProps:n)),c&1024&&(Id=!0);break;case 6:if(Xn(n,e,a),Wn(e),c&4){if(e.stateNode===null)throw Error(s(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n,bt=!0}catch(pe){qt(e,e.return,pe)}}break;case 3:if(bt=!1,Jc=null,f=Pi,Pi=ul(n.containerInfo),Xn(n,e,a),Pi=f,Wn(e),c&4&&r!==null&&r.memoizedState.isDehydrated)try{Yr(n.containerInfo)}catch(pe){qt(e,e.return,pe)}Id&&(Id=!1,hx(e)),bt=!1;break;case 4:c=ta,ta=An,r=Gt(),f=Pi,Pi=ul(e.stateNode.containerInfo),Xn(n,e,a),Wn(e),Pi=f,bt&&tl&&(Pc=!0),bt=r,ta=c;break;case 12:Xn(n,e,a),Wn(e);break;case 31:Xn(n,e,a),Wn(e),c&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,zc(e,n)));break;case 13:Xn(n,e,a),Wn(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Hc=qe()),c&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,zc(e,n)));break;case 22:f=e.memoizedState!==null,_=r!==null&&r.memoizedState!==null;var C=An,H=Xt,ie=ta;An=C||f,ta=ie||f,Xt=H||_,Xn(n,e,a),Xt=H,ta=ie,An=C,Wn(e),c&8192&&(n=e.stateNode,n._visibility=f?n._visibility&-2:n._visibility|1,!f||r===null||_||An||Xt||(n=_||Xt,a=An,r=Xt,An=f||An,Xt=n,as(e,2),An=a,Xt=r),!f&&ta||Bd(e,f)),c&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,zc(e,a))));break;case 19:Xn(n,e,a),Wn(e),c&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,zc(e,n)));break;case 30:c&512&&(Xt||r===null||Ln(r,r.return)),c=Gt(),f=tl,_=(a&335544064)===a,C=e.memoizedProps,tl=_&&ya(C.default,C.update)!=="none",Xn(n,e,a),Wn(e),_&&r!==null&&bt&&(e.flags|=4),tl=f,bt=c;break;case 21:break;case 7:c&512&&(Xt||r===null||Ln(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Xn(n,e,a),Wn(e)}}function Wn(e){var n=e.flags;if(n&2){try{for(var a,r=e.return;r!==null;){if(Qg(r)){a=r;break}r=r.return}r=null;for(var c=e.return;c!==null;){if(Ad(c)){var f=c.stateNode;r===null?r=[f]:r.push(f)}if(Td(c))break;c=c.return}var _=r;if(a==null)throw Error(s(160));switch(a.tag){case 27:var C=a.stateNode,H=Rd(e);Dc(e,H,C,_);break;case 5:var ie=a.stateNode;a.flags&32&&(fr(ie,""),a.flags&=-33);var pe=Rd(e);Dc(e,pe,ie,_);break;case 3:case 4:var Ee=a.stateNode.containerInfo,$=Rd(e);Nd(e,$,Ee,_);break;default:throw Error(s(161))}}catch(de){qt(e,e.return,de)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function hx(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;hx(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,qr=!0,n.reset(),qr=!1),e=e.sibling}}function Nr(e,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)px(n,e),n=n.sibling;else ax(n)}function px(e,n){var a=e.alternate;if(a===null)Dd(e,!1);else switch(e.tag){case 3:if(zd=na=!1,ex(),Nr(n,e),!na&&!Pc){if(e=$i,e!==null)for(var r=0;r<e.length;r+=3){a=e[r];var c=e[r+1];tv(a,e[r+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+c+")"})}e=n.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),zd=!0}$i=null;break;case 5:Nr(n,e);break;case 4:r=na,na=!1,Nr(n,e),na&&(Pc=!0),na=r;break;case 22:e.memoizedState===null&&(a.memoizedState!==null?Dd(e,!1):Nr(n,e));break;case 30:r=na,c=ex(),na=!1,Nr(n,e),na&&(e.flags|=4);var f=e.memoizedProps,_=e.stateNode;n=_a(f,_),_=_a(a.memoizedProps,_);var C=ya(f.default,f.update);C==="none"?n=!1:(f=a.memoizedState,a.memoizedState=null,a=e.child,Qn=0,n=Pd(e,a,n,_,C,f,!0),Qn!==(f===null?0:f.length)&&(e.flags|=32)),(e.flags&4)!==0&&n?(zr(e,e.memoizedProps.onUpdate),$i=c):c!==null&&(c.push.apply(c,$i),$i=c),na=(e.flags&32)!==0?!0:r;break;default:Nr(n,e)}}function ia(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)rx(e,n.alternate,n),n=n.sibling}function as(e,n){for(e=e.child;e!==null;){var a=e,r=n;switch(a.tag){case 0:case 11:case 14:case 15:is(4,a,a.return),as(a,r);break;case 1:Ln(a,a.return);var c=a.stateNode;typeof c.componentWillUnmount=="function"&&Zg(a,a.return,c),as(a,r);break;case 27:(r&2)!==0&&hv(a.stateNode,a.type,a.memoizedProps);case 5:Ln(a,a.return),a.tag!==5&&a.tag!==27||el(a),as(a,r);break;case 6:el(a);break;case 26:Ln(a,a.return),c=a.stateNode,a.memoizedState!==null||c===null||Xt||c.parentNode.removeChild(c),as(a,r);break;case 22:a.memoizedState===null&&as(a,r);break;case 30:Ln(a,a.return),as(a,r);break;case 7:Ln(a,a.return);default:as(a,r)}e=e.sibling}}function Ii(e,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var r=n.alternate,c=e,f=n,_=f.flags,C=(a&1)!==0;switch(f.tag){case 0:case 11:case 15:Ii(c,f,a),$o(4,f);break;case 1:if(Ii(c,f,a),r=f,c=r.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(pe){qt(r,r.return,pe)}if(r=f,c=r.updateQueue,c!==null){var H=r.stateNode;try{var ie=c.shared.hiddenCallbacks;if(ie!==null)for(c.shared.hiddenCallbacks=null,c=0;c<ie.length;c++)I0(ie[c],H)}catch(pe){qt(r,r.return,pe)}}C&&_&64&&Yg(f),Ji(f,f.return);break;case 27:(a&2)!==0&&Jg(f);case 5:f.tag!==5&&f.tag!==27||Kg(f),Ii(c,f,a),C&&r===null&&_&4&&wd(f),Ji(f,f.return);break;case 6:Kg(f);break;case 26:H=f.stateNode,f.memoizedState!==null||H===null||An||Mh(ul(H.ownerDocument),f.type,H),Ii(c,f,a),C&&r===null&&_&4&&wd(f),Ji(f,f.return);break;case 12:Ii(c,f,a);break;case 31:Ii(c,f,a),C&&_&4&&ux(c,f);break;case 13:Ii(c,f,a),C&&_&4&&fx(c,f);break;case 22:f.memoizedState===null&&Ii(c,f,a),Ji(f,f.return);break;case 30:Ii(c,f,a),Ji(f,f.return);break;case 7:Ji(f,f.return);default:Ii(c,f,a)}n=n.sibling}}function Hd(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Ho(a))}function Gd(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Ho(e))}function Ti(e,n,a,r){var c=(a&335544064)===a;if(n.subtreeFlags&(c?10262:10256))for(n=n.child;n!==null;)mx(e,n,a,r),n=n.sibling;else c&&ix(n)}function mx(e,n,a,r){var c=(a&335544064)===a;c&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Oc(n);var f=n.flags;switch(n.tag){case 0:case 11:case 15:Ti(e,n,a,r),f&2048&&$o(9,n);break;case 1:Ti(e,n,a,r);break;case 3:Ti(e,n,a,r),c&&zd&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),f&2048&&(f=null,n.alternate!==null&&(f=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==f&&(n.refCount++,f!=null&&Ho(f)));break;case 12:if(f&2048){Ti(e,n,a,r),f=n.stateNode;try{var _=n.memoizedProps,C=_.id,H=_.onPostCommit;typeof H=="function"&&H(C,n.alternate===null?"mount":"update",f.passiveEffectDuration,-0)}catch(ie){qt(n,n.return,ie)}}else Ti(e,n,a,r);break;case 31:Ti(e,n,a,r);break;case 13:Ti(e,n,a,r);break;case 23:break;case 22:_=n.stateNode,C=n.alternate,n.memoizedState!==null?(c&&C!==null&&C.memoizedState===null&&Oc(C),_._visibility&2?Ti(e,n,a,r):nl(e,n)):(c&&C!==null&&C.memoizedState!==null&&Oc(n),_._visibility&2?Ti(e,n,a,r):(_._visibility|=2,Dr(e,n,a,r,(n.subtreeFlags&10256)!==0||!1))),f&2048&&Hd(C,n);break;case 24:Ti(e,n,a,r),f&2048&&Gd(n.alternate,n);break;case 30:c&&(f=n.alternate,f!==null&&(ea(f.child,!0),ea(n.child,!0))),Ti(e,n,a,r);break;default:Ti(e,n,a,r)}}function Dr(e,n,a,r,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,_=n,C=a,H=r,ie=_.flags;switch(_.tag){case 0:case 11:case 15:Dr(f,_,C,H,c),$o(8,_);break;case 23:break;case 22:var pe=_.stateNode;_.memoizedState!==null?pe._visibility&2?Dr(f,_,C,H,c):nl(f,_):(pe._visibility|=2,Dr(f,_,C,H,c)),c&&ie&2048&&Hd(_.alternate,_);break;case 24:Dr(f,_,C,H,c),c&&ie&2048&&Gd(_.alternate,_);break;default:Dr(f,_,C,H,c)}n=n.sibling}}function nl(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,r=n,c=r.flags;switch(r.tag){case 22:nl(a,r),c&2048&&Hd(r.alternate,r);break;case 24:nl(a,r),c&2048&&Gd(r.alternate,r);break;default:nl(a,r)}n=n.sibling}}var js=8192;function Xs(e,n,a){if(e.subtreeFlags&js)for(e=e.child;e!==null;)gx(e,n,a),e=e.sibling}function gx(e,n,a){switch(e.tag){case 26:Xs(e,n,a),e.flags&js&&(e.memoizedState!==null?YM(a,Pi,e.memoizedState,e.memoizedProps):(e=e.stateNode,(n&335544128)===n&&Mv(a,e)));break;case 5:Xs(e,n,a),e.flags&js&&(e=e.stateNode,(n&335544128)===n&&Mv(a,e));break;case 3:case 4:var r=Pi;Pi=ul(e.stateNode.containerInfo),Xs(e,n,a),Pi=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=js,js=16777216,Xs(e,n,a),js=r):Xs(e,n,a));break;case 30:if((e.flags&js)!==0&&(r=e.memoizedProps.name,r!=null&&r!=="auto")){var c=e.stateNode;c.paired=null,oi===null&&(oi=new Map),oi.set(r,c)}Xs(e,n,a);break;default:Xs(e,n,a)}}function xx(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function il(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];wn=r,_x(r,e)}xx(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)vx(e),e=e.sibling}function vx(e){switch(e.tag){case 0:case 11:case 15:il(e),e.flags&2048&&is(9,e,e.return);break;case 3:il(e);break;case 12:il(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Bc(e)):il(e);break;default:il(e)}}function Bc(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];wn=r,_x(r,e)}xx(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:is(8,n,n.return),Bc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Bc(n));break;default:Bc(n)}e=e.sibling}}function _x(e,n){for(;wn!==null;){var a=wn;switch(a.tag){case 0:case 11:case 15:is(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ho(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,wn=r;else e:for(a=e;wn!==null;){r=wn;var c=r.sibling,f=r.return;if(lx(r),r===a){wn=null;break e}if(c!==null){c.return=f,wn=c;break e}wn=f}}}var kb={getCacheForType:function(e){var n=Nn(gn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Nn(gn).controller.signal}},jb=typeof WeakMap=="function"?WeakMap:Map,Vt=0,en=null,At=null,Rt=0,Wt=0,li=null,ss=!1,Ur=!1,Vd=!1,Ra=0,pn=0,rs=0,Ws=0,Fc=0,ci=0,Lr=0,al=null,$n=null,kd=!1,Hc=0,yx=0,Gc=1/0,Vc=null,os=null,ln=0,zi=null,qs=null,aa=0,jd=0,Xd=null,Sx=null,Or=null,Pr=null,Ir=null,sl=0,kc=null;function ui(){return(Vt&2)!==0&&Rt!==0?Rt&-Rt:ge.T!==null?th():Gl()}function bx(){if(ci===0)if((Rt&536870912)===0||Mt){var e=As;As<<=1,(As&3932160)===0&&(As=262144),ci=e}else ci=536870912;return e=Dn.current,e!==null&&(e.flags|=32),ci}function zr(e,n){if(n!=null){var a=e.stateNode,r=a.ref;r===null&&(r=a.ref=nv(_a(e.memoizedProps,a))),Pr===null&&(Pr=[]),Pr.push(n.bind(null,r))}}function ei(e,n,a){(e===en&&(Wt===2||Wt===9)||e.cancelPendingCommit!==null)&&(Br(e,0),ls(e,Rt,ci,!1)),qi(e,a),((Vt&2)===0||e!==en)&&(e===en&&((Vt&2)===0&&(Ws|=a),pn===4&&ls(e,Rt,ci,!1)),sa(e))}function Mx(e,n,a){if((Vt&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&e.expiredLanes)===0||ka(e,n),c=r?qb(e,n):qd(e,n,!0),f=r;do{if(c===0){Ur&&!r&&ls(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!Xb(a)){c=qd(e,n,!1),f=!1;continue}if(c===2){if(f=n,e.errorRecoveryDisabledLanes&f)var _=0;else _=e.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;e:{var C=e;c=al;var H=C.current.memoizedState.isDehydrated;if(H&&(Br(C,_).flags|=256),_=qd(C,_,!1),_!==2&&_!==6){if(Vd&&!H){C.errorRecoveryDisabledLanes|=f,Ws|=f,c=4;break e}f=$n,$n=c,f!==null&&($n===null?$n=f:$n.push.apply($n,f))}c=_}if(f=!1,c!==2)continue}}if(c===1){Br(e,0),ls(e,n,0,!0);break}e:{switch(r=e,f=c,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:ls(r,n,ci,!ss);break e;case 2:$n=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=Hc+300-qe(),10<c)){if(ls(r,n,ci,!ss),ws(r,0,!0)!==0)break e;aa=n,r.timeoutHandle=dh(Ex.bind(null,r,a,$n,Vc,kd,n,ci,Ws,Lr,ss,f,"Throttled",-0,0),c);break e}Ex(r,a,$n,Vc,kd,n,ci,Ws,Lr,ss,f,null,-0,0)}}break}while(!0);sa(e)}function Ex(e,n,a,r,c,f,_,C,H,ie,pe,Ee,$,de){e.timeoutHandle=-1;var Be=n.subtreeFlags,et=(f&335544064)===f;if(Ee=null,(et||Be&8192||(Be&16785408)===16785408)&&(Ee={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zi},oi=null,gx(n,f,Ee),et&&(Be=Ee,et=e.containerInfo,et=(et.nodeType===9?et:et.ownerDocument).__reactViewTransition,et!=null&&(Be.count++,Be.waitingForViewTransition=!0,Be=hl.bind(Be),et.finished.then(Be,Be))),Be=(f&62914560)===f?Hc-qe():(f&4194048)===f?yx-qe():0,Be=ZM(Ee,Be),Be!==null)){aa=f,e.cancelPendingCommit=Be(Ux.bind(null,e,n,f,a,r,c,_,C,H,ie,pe,Ee,null,$,de)),ls(e,f,_,!ie);return}Ux(e,n,f,a,r,c,_,C,H,ie,pe,Ee)}function Xb(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var c=a[r],f=c.getSnapshot;c=c.value;try{if(!si(f(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ls(e,n,a,r){n=Wi(e,n),n&=~Fc,n&=~Ws,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes;for(var c=n;0<c;){var f=31-pt(c),_=1<<f;r[f]=-1,c&=~_}a!==0&&Cs(e,a,n)}function jc(){return(Vt&6)===0?(rl(0),!1):!0}function Wd(){if(At!==null){if(Wt===0)var e=At.return;else e=At,Ma=Os=null,ed(e),Er=null,ko=0,e=At;for(;e!==null;)qg(e.alternate,e),e=e.return;At=null}}function Br(e,n){var a=e.timeoutHandle;return a!==-1&&(e.timeoutHandle=-1,mM(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),aa=0,Wd(),en=e,At=a=Sa(e.current,null),Rt=n,Wt=0,li=null,ss=!1,Ur=ka(e,n),Vd=!1,Lr=ci=Fc=Ws=rs=pn=0,$n=al=null,kd=!1,Ra=Wi(e,n),Jl(),a}function Tx(e,n){xt=null,ge.H=Mc,n===Mr||n===cc?(n=U0(),Wt=3):n===Gf?(n=U0(),Wt=4):Wt=n===md?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,li=n,At===null&&(pn=1,Ec(e,Si(n,e.current)))}function Ax(){var e=Dn.current;return e===null?!0:(Rt&4194048)===Rt?Bn===null:(Rt&62914560)===Rt||(Rt&536870912)!==0?e===Bn:!1}function wx(){var e=ge.H;return ge.H=Mc,e===null?Mc:e}function Cx(){var e=ge.A;return ge.A=kb,e}function Xc(){pn=4,ss||(Rt&4194048)!==Rt&&Dn.current!==null||(Ur=!0),(rs&134217727)===0&&(Ws&134217727)===0||en===null||ls(en,Rt,ci,!1)}function qd(e,n,a){var r=Vt;Vt|=2;var c=wx(),f=Cx();(en!==e||Rt!==n)&&(Vc=null,Br(e,n)),n=!1;var _=pn;e:do try{if(Wt!==0&&At!==null){var C=At,H=li;switch(Wt){case 8:Wd(),_=6;break e;case 3:case 2:case 9:case 6:Dn.current===null&&(n=!0);var ie=Wt;if(Wt=0,li=null,Fr(e,C,H,ie),a&&Ur){_=0;break e}break;default:ie=Wt,Wt=0,li=null,Fr(e,C,H,ie)}}Wb(),_=pn;break}catch(pe){Tx(e,pe)}while(!0);return n&&e.shellSuspendCounter++,Ma=Os=null,Vt=r,ge.H=c,ge.A=f,At===null&&(en=null,Rt=0,Jl()),_}function Wb(){for(;At!==null;)Rx(At)}function qb(e,n){var a=Vt;Vt|=2;var r=wx(),c=Cx();en!==e||Rt!==n?(Vc=null,Gc=qe()+500,Br(e,n)):Ur=ka(e,n);e:do try{if(Wt!==0&&At!==null){n=At;var f=li;t:switch(Wt){case 1:Wt=0,li=null,Fr(e,n,f,1);break;case 2:case 9:if(N0(f)){Wt=0,li=null,Nx(n);break}n=function(){Wt!==2&&Wt!==9||en!==e||(Wt=7),sa(e)},f.then(n,n);break e;case 3:Wt=7;break e;case 4:Wt=5;break e;case 7:N0(f)?(Wt=0,li=null,Nx(n)):(Wt=0,li=null,Fr(e,n,f,7));break;case 5:var _=null;switch(At.tag){case 26:_=At.memoizedState;case 5:case 27:var C=At;if(_?Sv(_):C.stateNode.complete){Wt=0,li=null;var H=C.sibling;if(H!==null)At=H;else{var ie=C.return;ie!==null?(At=ie,Wc(ie)):At=null}break t}}Wt=0,li=null,Fr(e,n,f,5);break;case 6:Wt=0,li=null,Fr(e,n,f,6);break;case 8:Wd(),pn=6;break e;default:throw Error(s(462))}}Yb();break}catch(pe){Tx(e,pe)}while(!0);return Ma=Os=null,ge.H=r,ge.A=c,Vt=a,At!==null?0:(en=null,Rt=0,Jl(),pn)}function Yb(){for(;At!==null&&!He();)Rx(At)}function Rx(e){var n=Xg(e.alternate,e,Ra);e.memoizedProps=e.pendingProps,n===null?Wc(e):At=n}function Nx(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Bg(a,n,n.pendingProps,n.type,void 0,Rt);break;case 11:n=Bg(a,n,n.pendingProps,n.type.render,n.ref,Rt);break;case 5:ed(n);var r=n;r===Tn&&(Mt?(ac(r),r.tag===5&&r.stateNode!=null&&(an=r.stateNode)):(ac(r),Mt=!0));default:qg(a,n),n=At=_0(n,Ra),n=Xg(a,n,Ra)}e.memoizedProps=e.pendingProps,n===null?Wc(e):At=n}function Fr(e,n,a,r){Ma=Os=null,ed(n),Er=null,ko=0;var c=n.return;try{if(Pb(e,c,n,a,Rt)){pn=1,Ec(e,Si(a,e.current)),At=null;return}}catch(f){if(c!==null)throw At=c,f;pn=1,Ec(e,Si(a,e.current)),At=null;return}n.flags&32768?(Mt||r===1?e=!0:Ur||(Rt&536870912)!==0?e=!1:(ss=e=!0,(r===2||r===9||r===3||r===6)&&(r=Dn.current,r!==null&&r.tag===13&&(r.flags|=16384))),Dx(n,e)):Wc(n)}function Wc(e){var n=e;do{if((n.flags&32768)!==0){Dx(n,ss);return}e=n.return;var a=Fb(n.alternate,n,Ra);if(a!==null){At=a;return}if(n=n.sibling,n!==null){At=n;return}At=n=e}while(n!==null);pn===0&&(pn=5)}function Dx(e,n){do{var a=Hb(e.alternate,e);if(a!==null){a.flags&=32767,At=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){At=e;return}At=e=a}while(e!==null);pn=6,At=null}function Ux(e,n,a,r,c,f,_,C,H,ie,pe,Ee){e.cancelPendingCommit=null;do qc();while(ln!==0);if((Vt&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));e===en&&(At=en=null,Rt=0),qs=n,zi=e,aa=a,Xd=c,Sx=r,Zb(e,n,a,_,C,H,Ee)}}function Zb(e,n,a,r,c,f,_){var C=n.lanes|n.childLanes;if(jd=C,C|=Cf,Hl(e,a,C,r,c,f),Pr=null,(a&335544064)===a?(Ir=Mb(e),r=10262):(Ir=null,r=10256),(n.subtreeFlags&r)!==0||(n.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,tM(Le,function(){return Qd(),null})):(e.callbackNode=null,e.callbackPriority=0),Uc=!1,r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=ge.T,ge.T=null,c=Ce.p,Ce.p=2,f=Vt,Vt|=4;try{Gb(e,n,a)}finally{Vt=f,Ce.p=c,ge.T=r}}ln=1,Uc?Or=SM(_,e.containerInfo,Ir,Yd,Zd,Qb,Kd,Qd,Kb):(Yd(),Zd(),Kd())}function Kb(e){if(ln!==0){var n=zi.onRecoverableError;n(e,{componentStack:null})}}function Qb(){ln===3&&(ln=0,px(qs,zi),ln=4)}function Yd(){if(ln===1){ln=0;var e=zi,n=qs,a=aa,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=ge.T,ge.T=null;var c=Ce.p;Ce.p=2;var f=Vt;Vt|=4;try{tl=Pc=!1,dx(n,e,a),a=ch;var _=c0(e.containerInfo),C=a.focusedElem,H=a.selectionRange;if(_!==C&&C&&C.ownerDocument&&l0(C.ownerDocument.documentElement,C)){if(H!==null&&Mf(C)){var ie=H.start,pe=H.end;if(pe===void 0&&(pe=ie),"selectionStart"in C)C.selectionStart=ie,C.selectionEnd=Math.min(pe,C.value.length);else{var Ee=C.ownerDocument||document,$=Ee&&Ee.defaultView||window;if($.getSelection){var de=$.getSelection(),Be=C.textContent.length,et=Math.min(H.start,Be),vt=H.end===void 0?et:Math.min(H.end,Be);!de.extend&&et>vt&&(_=vt,vt=et,et=_);var te=o0(C,et),X=o0(C,vt);if(te&&X&&(de.rangeCount!==1||de.anchorNode!==te.node||de.anchorOffset!==te.offset||de.focusNode!==X.node||de.focusOffset!==X.offset)){var oe=Ee.createRange();oe.setStart(te.node,te.offset),de.removeAllRanges(),et>vt?(de.addRange(oe),de.extend(X.node,X.offset)):(oe.setEnd(X.node,X.offset),de.addRange(oe))}}}}for(Ee=[],de=C;de=de.parentNode;)de.nodeType===1&&Ee.push({element:de,left:de.scrollLeft,top:de.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<Ee.length;C++){var Me=Ee[C];Me.element.scrollLeft=Me.left,Me.element.scrollTop=Me.top}}qr=!!lh,ch=lh=null}finally{Vt=f,Ce.p=c,ge.T=r}}e.current=n,ln=2}}function Zd(){if(ln===2){ln=0;var e=zi,n=qs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=ge.T,ge.T=null;var r=Ce.p;Ce.p=2;var c=Vt;Vt|=4;try{rx(e,n.alternate,n)}finally{Vt=c,Ce.p=r,ge.T=a}}ln=3}}function Kd(){if(ln===4||ln===3){ln=0;var e=Or;Or=null,Fe();var n=zi,a=qs,r=aa,c=Sx,f=(r&335544064)===r?10262:10256;if((a.subtreeFlags&f)!==0||(a.flags&f)!==0?ln=5:(ln=0,qs=zi=null,Lx(n,n.pendingLanes)),f=n.pendingLanes,f===0&&(os=null),Co(r),a=a.stateNode,Xe&&typeof Xe.onCommitFiberRoot=="function")try{Xe.onCommitFiberRoot(tt,a,void 0,(a.current.flags&128)===128)}catch{}if(c!==null){a=ge.T,f=Ce.p,Ce.p=2,ge.T=null;try{for(var _=n.onRecoverableError,C=0;C<c.length;C++){var H=c[C];_(H.value,{componentStack:H.stack})}}finally{ge.T=a,Ce.p=f}}if(c=Pr,_=Ir,Ir=null,c!==null&&(Pr=null,_===null&&(_=[]),e!==null))for(H=0;H<c.length;H++)a=(0,c[H])(_),a!==void 0&&e.finished.finally(a);(aa&3)!==0&&qc(),sa(n),f=n.pendingLanes,(r&261930)!==0&&(f&42)!==0?n===kc?sl++:(sl=0,kc=n):(sl=0,kc=null),rl(0)}}function Lx(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Ho(n)))}function qc(){return Or!==null&&(Or.skipTransition(),Or=null),Yd(),Zd(),Kd(),Qd()}function Qd(){if(ln!==5)return!1;var e=zi,n=jd;jd=0;var a=Co(aa),r=ge.T,c=Ce.p;try{Ce.p=32>a?32:a,ge.T=null,a=Xd,Xd=null;var f=zi,_=aa;if(ln=0,qs=zi=null,aa=0,(Vt&6)!==0)throw Error(s(331));var C=Vt;if(Vt|=4,vx(f.current),mx(f,f.current,_,a),Vt=C,rl(0,!1),Xe&&typeof Xe.onPostCommitFiberRoot=="function")try{Xe.onPostCommitFiberRoot(tt,f)}catch{}return!0}finally{Ce.p=c,ge.T=r,Lx(e,n)}}function Ox(e,n,a){n=Si(a,n),n=pd(e.stateNode,n,2),e=$a(e,n,2),e!==null&&(qi(e,2),sa(e))}function qt(e,n,a){if(e.tag===3)Ox(e,e,a);else for(;n!==null;){if(n.tag===3){Ox(n,e,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(os===null||!os.has(r))){e=Si(a,e),a=Ng(2),r=$a(n,a,2),r!==null&&(Dg(a,r,n,e),qi(r,2),sa(r));break}}n=n.return}}function Jd(e,n,a){var r=e.pingCache;if(r===null){r=e.pingCache=new jb;var c=new Set;r.set(n,c)}else c=r.get(n),c===void 0&&(c=new Set,r.set(n,c));c.has(a)||(Vd=!0,c.add(a),e=Jb.bind(null,e,n,a),n.then(e,e))}function Jb(e,n,a){var r=e.pingCache;r!==null&&r.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,en===e&&(Rt&a)===a&&((pn===4||pn===3&&(Rt&62914560)===Rt&&300>qe()-Hc)&&(Vt&2)===0?Br(e,0):Fc|=a,Lr===Rt&&(Lr=0)),sa(e)}function Px(e,n){n===0&&(n=Eo()),e=Ds(e,n),e!==null&&(qi(e,n),sa(e))}function $b(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Px(e,a)}function eM(e,n){var a=0;switch(e.tag){case 31:case 13:var r=e.stateNode,c=e.memoizedState;c!==null&&(a=c.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),Px(e,a)}function tM(e,n){return Oe(e,n)}var Hr=null,Gr=null,$d=!1,Yc=!1,eh=!1,cs=0;function sa(e){e!==Gr&&e.next===null&&(Gr===null?Hr=Gr=e:Gr=Gr.next=e),Yc=!0,$d||($d=!0,iM())}function rl(e,n){if(!eh&&Yc){eh=!0;do for(var a=!1,r=Hr;r!==null;){if(e!==0){var c=r.pendingLanes;if(c===0)var f=0;else{var _=r.suspendedLanes,C=r.pingedLanes;f=(1<<31-pt(42|e)+1)-1,f&=c&~(_&~C),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Fx(r,f))}else f=Rt,f=ws(r,r===en?f:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(f&3)===0||ka(r,f)||(a=!0,Fx(r,f));r=r.next}while(a);eh=!1}}function nM(){Ix()}function Ix(){Yc=$d=!1;var e=0;cs!==0&&pM()&&(e=cs);for(var n=qe(),a=null,r=Hr;r!==null;){var c=r.next,f=zx(r,n);f===0?(r.next=null,a===null?Hr=c:a.next=c,c===null&&(Gr=a)):(a=r,(e!==0||(f&3)!==0)&&(Yc=!0)),r=c}ln!==0&&ln!==5||rl(e),cs!==0&&(cs=0)}function zx(e,n){for(var a=e.suspendedLanes,r=e.pingedLanes,c=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var _=31-pt(f),C=1<<_,H=c[_];H===-1?((C&a)===0||(C&r)!==0)&&(c[_]=Mo(C,n)):H<=n&&(e.expiredLanes|=C),f&=~C}if(n=en,a=Rt,a=ws(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,a===0||e===n&&(Wt===2||Wt===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&it(r),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||ka(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(r!==null&&it(r),Co(a)){case 2:case 8:a=K;break;case 32:a=Le;break;case 268435456:a=Ie;break;default:a=Le}return r=Bx.bind(null,e),a=Oe(a,r),e.callbackPriority=n,e.callbackNode=a,n}return r!==null&&r!==null&&it(r),e.callbackPriority=2,e.callbackNode=null,2}function Bx(e,n){if(ln!==0&&ln!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(qc()&&e.callbackNode!==a)return null;var r=Rt;return r=ws(e,e===en?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Mx(e,r,n),zx(e,qe()),e.callbackNode!=null&&e.callbackNode===a?Bx.bind(null,e):null)}function Fx(e,n){if(qc())return null;Mx(e,n,!0)}function iM(){gM(function(){(Vt&6)!==0?Oe(ht,nM):Ix()})}function th(){if(cs===0){var e=zs;e===0&&(e=lr,lr<<=1,(lr&261888)===0&&(lr=256)),cs=e}return cs}function Hx(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:jl(e)}function aM(e,n,a,r,c){if(n==="submit"&&a&&a.stateNode===c){var f=Hx((c[V]||null).action),_=r.submitter;_&&(n=(n=_[V]||null)?Hx(n.formAction):_.getAttribute("formAction"),n!==null&&(f=n,_=null));var C=new Yl("action","action",null,r,c);e.push({event:C,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(cs!==0){var H=new FormData(c,_);cd(a,{pending:!0,data:H,method:c.method,action:f},null,H)}}else typeof f=="function"&&(C.preventDefault(),H=new FormData(c,_),cd(a,{pending:!0,data:H,method:c.method,action:f},f,H))},currentTarget:c}]})}}for(var nh=0;nh<wf.length;nh++){var ih=wf[nh],sM=ih.toLowerCase(),rM=ih[0].toUpperCase()+ih.slice(1);Li(sM,"on"+rM)}Li(d0,"onAnimationEnd"),Li(h0,"onAnimationIteration"),Li(p0,"onAnimationStart"),Li("dblclick","onDoubleClick"),Li("focusin","onFocus"),Li("focusout","onBlur"),Li(mb,"onTransitionRun"),Li(gb,"onTransitionStart"),Li(xb,"onTransitionCancel"),Li(m0,"onTransitionEnd"),fn("onMouseEnter",["mouseout","mouseover"]),fn("onMouseLeave",["mouseout","mouseover"]),fn("onPointerEnter",["pointerout","pointerover"]),fn("onPointerLeave",["pointerout","pointerover"]),ke("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ke("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ke("onBeforeInput",["compositionend","keypress","textInput","paste"]),ke("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ke("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ke("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ol="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),oM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ol));function Gx(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],c=r.event;r=r.listeners;e:{var f=void 0;if(n)for(var _=r.length-1;0<=_;_--){var C=r[_],H=C.instance,ie=C.currentTarget;if(C=C.listener,H!==f&&c.isPropagationStopped())break e;f=C,c.currentTarget=ie;try{f(c)}catch(pe){Ql(pe)}c.currentTarget=null,f=H}else for(_=0;_<r.length;_++){if(C=r[_],H=C.instance,ie=C.currentTarget,C=C.listener,H!==f&&c.isPropagationStopped())break e;f=C,c.currentTarget=ie;try{f(c)}catch(pe){Ql(pe)}c.currentTarget=null,f=H}}}}function wt(e,n){var a=n[ce];a===void 0&&(a=n[ce]=new Set);var r=e+"__bubble";a.has(r)||(Vx(n,e,2,!1),a.add(r))}function ah(e,n,a){var r=0;n&&(r|=4),Vx(a,e,r,n)}var Zc="_reactListening"+Math.random().toString(36).slice(2);function sh(e){if(!e[Zc]){e[Zc]=!0,jt.forEach(function(a){a!=="selectionchange"&&(oM.has(a)||ah(a,!1,e),ah(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Zc]||(n[Zc]=!0,ah("selectionchange",!1,n))}}function Vx(e,n,a,r){switch(Dv(n)){case 2:var c=$M;break;case 8:c=e1;break;default:c=Th}a=c.bind(null,n,a,e),c=void 0,!hf||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),r?c!==void 0?e.addEventListener(n,a,{capture:!0,passive:c}):e.addEventListener(n,a,!0):c!==void 0?e.addEventListener(n,a,{passive:c}):e.addEventListener(n,a,!1)}function rh(e,n,a,r,c){var f=r;if((n&1)===0&&(n&2)===0&&r!==null)e:for(;;){if(r===null)return;var _=r.tag;if(_===3||_===4){var C=r.stateNode.containerInfo;if(C===c)break;if(_===4)for(_=r.return;_!==null;){var H=_.tag;if((H===3||H===4)&&_.stateNode.containerInfo===c)return;_=_.return}for(;C!==null;){if(_=ct(C),_===null)return;if(H=_.tag,H===5||H===6||H===26||H===27){r=f=_;continue e}C=C.parentNode}}r=r.return}Vm(function(){var ie=f,pe=ff(a),Ee=[];e:{var $=g0.get(e);if($!==void 0){var de=Yl,Be=e;switch(e){case"keypress":if(Wl(a)===0)break e;case"keydown":case"keyup":de=XS;break;case"focusin":Be="focus",de=xf;break;case"focusout":Be="blur",de=xf;break;case"beforeblur":case"afterblur":de=xf;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":de=Xm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":de=LS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":de=KS;break;case d0:case h0:case p0:de=IS;break;case m0:de=JS;break;case"scroll":case"scrollend":de=DS;break;case"wheel":de=eb;break;case"copy":case"cut":case"paste":de=BS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":de=qm;break;case"submit":de=YS;break;case"toggle":case"beforetoggle":de=nb}var et=(n&4)!==0,vt=!et&&(e==="scroll"||e==="scrollend"),te=et?$!==null?$+"Capture":null:$;et=[];for(var X=ie,oe;X!==null;){var Me=X;if(oe=Me.stateNode,Me=Me.tag,Me!==5&&Me!==26&&Me!==27||oe===null||te===null||(Me=Ro(X,te),Me!=null&&et.push(ll(X,Me,oe))),vt)break;X=X.return}0<et.length&&($=new de($,Be,null,a,pe),Ee.push({event:$,listeners:et}))}}if((n&7)===0){e:{if(de=e==="mouseover"||e==="pointerover",$=e==="mouseout"||e==="pointerout",de&&a!==uf&&(Be=a.relatedTarget||a.fromElement)&&(ct(Be)||Be[xe]))break e;($||de)&&(Be=pe.window===pe?pe:(de=pe.ownerDocument)?de.defaultView||de.parentWindow:window,$?(de=a.relatedTarget||a.toElement,$=ie,de=de?ct(de):null,de!==null&&(vt=u(de),et=de.tag,de!==vt||et!==5&&et!==27&&et!==6)&&(de=null)):($=null,de=ie),$!==de&&(et=Xm,Me="onMouseLeave",te="onMouseEnter",X="mouse",(e==="pointerout"||e==="pointerover")&&(et=qm,Me="onPointerLeave",te="onPointerEnter",X="pointer"),vt=$==null?Be:Ze($),oe=de==null?Be:Ze(de),Be=new et(Me,X+"leave",$,a,pe),Be.target=vt,Be.relatedTarget=oe,Me=null,ct(pe)===ie&&(et=new et(te,X+"enter",de,a,pe),et.target=oe,et.relatedTarget=vt,Me=et),vt=Me,et=$&&de?P($,de,lM):null,$!==null&&kx(Ee,Be,$,et,!1),de!==null&&vt!==null&&kx(Ee,vt,de,et,!0)))}e:{if($=ie?Ze(ie):window,de=$.nodeName&&$.nodeName.toLowerCase(),de==="select"||de==="input"&&$.type==="file")var Ke=t0;else if($m($))if(n0)Ke=db;else{Ke=ub;var Nt=cb}else de=$.nodeName,!de||de.toLowerCase()!=="input"||$.type!=="checkbox"&&$.type!=="radio"?ie&&cf(ie.elementType)&&(Ke=t0):Ke=fb;if(Ke&&(Ke=Ke(e,ie))){e0(Ee,Ke,a,pe);break e}Nt&&Nt(e,$,ie)}switch(Nt=ie?Ze(ie):window,e){case"focusin":($m(Nt)||Nt.contentEditable==="true")&&(mr=Nt,Ef=ie,zo=null);break;case"focusout":zo=Ef=mr=null;break;case"mousedown":Tf=!0;break;case"contextmenu":case"mouseup":case"dragend":Tf=!1,u0(Ee,a,pe);break;case"selectionchange":if(pb)break;case"keydown":case"keyup":u0(Ee,a,pe)}var at;if(_f)e:{switch(e){case"compositionstart":var ot="onCompositionStart";break e;case"compositionend":ot="onCompositionEnd";break e;case"compositionupdate":ot="onCompositionUpdate";break e}ot=void 0}else pr?Qm(e,a)&&(ot="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ot="onCompositionStart");ot&&(Ym&&a.locale!=="ko"&&(pr||ot!=="onCompositionStart"?ot==="onCompositionEnd"&&pr&&(at=km()):(ja=pe,pf="value"in ja?ja.value:ja.textContent,pr=!0)),Nt=Kc(ie,ot),0<Nt.length&&(ot=new Wm(ot,e,null,a,pe),Ee.push({event:ot,listeners:Nt}),at?ot.data=at:(at=Jm(a),at!==null&&(ot.data=at)))),(at=ab?sb(e,a):rb(e,a))&&(ot=Kc(ie,"onBeforeInput"),0<ot.length&&(Nt=new Wm("onBeforeInput","beforeinput",null,a,pe),Ee.push({event:Nt,listeners:ot}),Nt.data=at)),aM(Ee,e,ie,a,pe)}Gx(Ee,n)})}function ll(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Kc(e,n){for(var a=n+"Capture",r=[];e!==null;){var c=e,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=Ro(e,a),c!=null&&r.unshift(ll(e,c,f)),c=Ro(e,n),c!=null&&r.push(ll(e,c,f))),e.tag===3)return r;e=e.return}return[]}function lM(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function kx(e,n,a,r,c){for(var f=n._reactName,_=[];a!==null&&a!==r;){var C=a,H=C.alternate,ie=C.stateNode;if(C=C.tag,H!==null&&H===r)break;C!==5&&C!==26&&C!==27||ie===null||(H=ie,c?(ie=Ro(a,f),ie!=null&&_.unshift(ll(a,ie,H))):c||(ie=Ro(a,f),ie!=null&&_.push(ll(a,ie,H)))),a=a.return}_.length!==0&&e.push({event:n,listeners:_})}var cM=/\r\n?/g,uM=/\u0000|\uFFFD/g;function jx(e){return(typeof e=="string"?e:""+e).replace(cM,`
`).replace(uM,"")}function Xx(e,n){return n=jx(n),jx(e)===n}function Yt(e,n,a,r,c,f){switch(a){case"children":if(typeof r=="string")n==="body"||n==="textarea"&&r===""||fr(e,r);else if(typeof r=="number"||typeof r=="bigint")n!=="body"&&fr(e,""+r);else return;break;case"className":ai(e,"class",r);break;case"tabIndex":ai(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ai(e,a,r);break;case"style":Hm(e,r,f);return;case"data":if(n!=="object"){ai(e,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=jl(r),e.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Yt(e,n,"name",c.name,c,null),Yt(e,n,"formEncType",c.formEncType,c,null),Yt(e,n,"formMethod",c.formMethod,c,null),Yt(e,n,"formTarget",c.formTarget,c,null)):(Yt(e,n,"encType",c.encType,c,null),Yt(e,n,"method",c.method,c,null),Yt(e,n,"target",c.target,c,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=jl(r),e.setAttribute(a,r);break;case"onClick":r!=null&&(e.onclick=Zi);return;case"onScroll":r!=null&&wt("scroll",e);return;case"onScrollEnd":r!=null&&wt("scrollend",e);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));(f!=null?f.__html:void 0)!==a&&(e.innerHTML=a)}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}a=jl(r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,r):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":r===!0?e.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,r):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(a,r):e.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(a):e.setAttribute(a,r);break;case"popover":wt("beforetoggle",e),wt("toggle",e),nn(e,"popover",r);break;case"xlinkActuate":Ct(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Ct(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Ct(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Ct(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Ct(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Ct(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Ct(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Ct(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Ct(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":nn(e,"is",r);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=RS.get(a)||a,nn(e,a,r);else return}bt=!0}function oh(e,n,a,r,c,f){switch(a){case"style":Hm(e,r,f);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));(f!=null?f.__html:void 0)!==a&&(e.innerHTML=a)}}break;case"children":if(typeof r=="string")fr(e,r);else if(typeof r=="number"||typeof r=="bigint")fr(e,""+r);else return;break;case"onScroll":r!=null&&wt("scroll",e);return;case"onScrollEnd":r!=null&&wt("scrollend",e);return;case"onClick":r!=null&&(e.onclick=Zi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Sn.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),f=a.slice(2,c?a.length-7:void 0),n=e[V]||null,n=n!=null?n[a]:null,typeof n=="function"&&e.removeEventListener(f,n,c),typeof r=="function")){typeof n!="function"&&n!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(f,r,c);break e}bt=!0,a in e?e[a]=r:r===!0?e.setAttribute(a,""):nn(e,a,r)}return}bt=!0}function On(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":wt("error",e),wt("load",e);var r=!1,c=!1,f;for(f in a)if(a.hasOwnProperty(f)){var _=a[f];if(_!=null)switch(f){case"src":r=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Yt(e,n,f,_,a,null)}}c&&Yt(e,n,"srcSet",a.srcSet,a,null),r&&Yt(e,n,"src",a.src,a,null);return;case"input":wt("invalid",e);var C=f=_=c=null,H=null,ie=null;for(r in a)if(a.hasOwnProperty(r)){var pe=a[r];if(pe!=null)switch(r){case"name":c=pe;break;case"type":_=pe;break;case"checked":H=pe;break;case"defaultChecked":ie=pe;break;case"value":f=pe;break;case"defaultValue":C=pe;break;case"children":case"dangerouslySetInnerHTML":if(pe!=null)throw Error(s(137,n));break;default:Yt(e,n,r,pe,a,null)}}Im(e,f,C,H,ie,_,c,!1);return;case"select":wt("invalid",e),r=_=f=null;for(c in a)if(a.hasOwnProperty(c)&&(C=a[c],C!=null))switch(c){case"value":f=C;break;case"defaultValue":_=C;break;case"multiple":r=C;default:Yt(e,n,c,C,a,null)}n=f,a=_,e.multiple=!!r,n!=null?ur(e,!!r,n,!1):a!=null&&ur(e,!!r,a,!0);return;case"textarea":wt("invalid",e),f=c=r=null;for(_ in a)if(a.hasOwnProperty(_)&&(C=a[_],C!=null))switch(_){case"value":r=C;break;case"defaultValue":c=C;break;case"children":f=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(s(91));break;default:Yt(e,n,_,C,a,null)}Bm(e,r,c,f);return;case"option":for(H in a)if(a.hasOwnProperty(H)&&(r=a[H],r!=null))switch(H){case"selected":e.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Yt(e,n,H,r,a,null)}return;case"dialog":wt("beforetoggle",e),wt("toggle",e),wt("cancel",e),wt("close",e);break;case"iframe":case"object":wt("load",e);break;case"video":case"audio":for(r=0;r<ol.length;r++)wt(ol[r],e);break;case"image":wt("error",e),wt("load",e);break;case"details":wt("toggle",e);break;case"embed":case"source":case"link":wt("error",e),wt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ie in a)if(a.hasOwnProperty(ie)&&(r=a[ie],r!=null))switch(ie){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Yt(e,n,ie,r,a,null)}return;default:if(cf(n)){for(pe in a)a.hasOwnProperty(pe)&&(r=a[pe],r!==void 0&&oh(e,n,pe,r,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(r=a[C],r!=null&&Yt(e,n,C,r,a,null))}var fM={};function dM(e,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,_=null,C=null,H=null,ie=null,pe=null;for(de in a){var Ee=a[de];if(a.hasOwnProperty(de)&&Ee!=null)switch(de){case"checked":break;case"value":break;case"defaultValue":H=Ee;default:r.hasOwnProperty(de)||Yt(e,n,de,null,r,Ee)}}for(var $ in r){var de=r[$];if(Ee=a[$],r.hasOwnProperty($)&&(de!=null||Ee!=null))switch($){case"type":de!==Ee&&(bt=!0),f=de;break;case"name":de!==Ee&&(bt=!0),c=de;break;case"checked":de!==Ee&&(bt=!0),ie=de;break;case"defaultChecked":de!==Ee&&(bt=!0),pe=de;break;case"value":de!==Ee&&(bt=!0),_=de;break;case"defaultValue":de!==Ee&&(bt=!0),C=de;break;case"children":case"dangerouslySetInnerHTML":if(de!=null)throw Error(s(137,n));break;default:de!==Ee&&Yt(e,n,$,de,r,Ee)}}of(e,_,C,H,ie,pe,f,c);return;case"select":de=_=C=$=null;for(f in a)if(H=a[f],a.hasOwnProperty(f)&&H!=null)switch(f){case"value":break;case"multiple":de=H;default:r.hasOwnProperty(f)||Yt(e,n,f,null,r,H)}for(c in r)if(f=r[c],H=a[c],r.hasOwnProperty(c)&&(f!=null||H!=null))switch(c){case"value":f!==H&&(bt=!0),$=f;break;case"defaultValue":f!==H&&(bt=!0),C=f;break;case"multiple":f!==H&&(bt=!0),_=f;default:f!==H&&Yt(e,n,c,f,r,H)}n=C,a=_,r=de,$!=null?ur(e,!!a,$,!1):!!r!=!!a&&(n!=null?ur(e,!!a,n,!0):ur(e,!!a,a?[]:"",!1));return;case"textarea":de=$=null;for(C in a)if(c=a[C],a.hasOwnProperty(C)&&c!=null&&!r.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Yt(e,n,C,null,r,c)}for(_ in r)if(c=r[_],f=a[_],r.hasOwnProperty(_)&&(c!=null||f!=null))switch(_){case"value":c!==f&&(bt=!0),$=c;break;case"defaultValue":c!==f&&(bt=!0),de=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==f&&Yt(e,n,_,c,r,f)}zm(e,$,de);return;case"option":for(var Be in a)if($=a[Be],a.hasOwnProperty(Be)&&$!=null&&!r.hasOwnProperty(Be))switch(Be){case"selected":e.selected=!1;break;default:Yt(e,n,Be,null,r,$)}for(H in r)if($=r[H],de=a[H],r.hasOwnProperty(H)&&$!==de&&($!=null||de!=null))switch(H){case"selected":$!==de&&(bt=!0),e.selected=$&&typeof $!="function"&&typeof $!="symbol";break;default:Yt(e,n,H,$,r,de)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var et in a)$=a[et],a.hasOwnProperty(et)&&$!=null&&!r.hasOwnProperty(et)&&Yt(e,n,et,null,r,$);for(ie in r)if($=r[ie],de=a[ie],r.hasOwnProperty(ie)&&$!==de&&($!=null||de!=null))switch(ie){case"children":case"dangerouslySetInnerHTML":if($!=null)throw Error(s(137,n));break;default:Yt(e,n,ie,$,r,de)}return;default:if(cf(n)){for(var vt in a)$=a[vt],a.hasOwnProperty(vt)&&$!==void 0&&!r.hasOwnProperty(vt)&&oh(e,n,vt,void 0,r,$);for(pe in r)$=r[pe],de=a[pe],!r.hasOwnProperty(pe)||$===de||$===void 0&&de===void 0||oh(e,n,pe,$,r,de);return}}for(var te in a)$=a[te],a.hasOwnProperty(te)&&$!=null&&!r.hasOwnProperty(te)&&Yt(e,n,te,null,r,$);for(Ee in r)$=r[Ee],de=a[Ee],!r.hasOwnProperty(Ee)||$===de||$==null&&de==null||Yt(e,n,Ee,$,r,de)}function Wx(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function hM(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var c=a[r],f=c.transferSize,_=c.initiatorType,C=c.duration;if(f&&C&&Wx(_)){for(_=0,C=c.responseEnd,r+=1;r<a.length;r++){var H=a[r],ie=H.startTime;if(ie>C)break;var pe=H.transferSize,Ee=H.initiatorType;pe&&Wx(Ee)&&(H=H.responseEnd,_+=pe*(H<C?1:(C-ie)/(H-ie)))}if(--r,n+=8*(f+_)/(c.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var lh=null,ch=null;function cl(e){return e.nodeType===9?e:e.ownerDocument}function qx(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Yx(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Zx(e,n,a,r){return a=cl(a).createElement(e),a[w]=r,a[V]=n,On(a,e,n),St(a),a}function uh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var fh=null;function pM(){var e=window.event;return e&&e.type==="popstate"?e===fh?!1:(fh=e,!0):(fh=null,!1)}var dh=typeof setTimeout=="function"?setTimeout:void 0,mM=typeof clearTimeout=="function"?clearTimeout:void 0,Kx=typeof Promise=="function"?Promise:void 0,Qx=typeof requestAnimationFrame=="function"?requestAnimationFrame:dh,gM=typeof queueMicrotask=="function"?queueMicrotask:typeof Kx<"u"?function(e){return Kx.resolve(null).then(e).catch(xM)}:dh;function xM(e){setTimeout(function(){throw e})}function us(e){return e==="head"}function Jx(e,n){var a=n,r=0;do{var c=a.nextSibling;if(e.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(r===0){e.removeChild(c),Yr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")yh(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,yh(a);for(var f=a.firstChild;f;){var _=f.nextSibling,C=f.nodeName;f[ze]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=_}}else a==="body"&&yh(e.ownerDocument.body);a=c}while(a);Yr(n)}function $x(e,n){var a=e;e=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=r}while(a)}function ev(e,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,e.style.viewTransitionName=n,a!=null&&(e.style.viewTransitionClass=a),a=getComputedStyle(e),a.display==="inline"){if(n=e.getClientRects(),n.length===1)var r=1;else for(var c=r=0;c<n.length;c++){var f=n[c];0<f.width&&0<f.height&&r++}r===1&&(e=e.style,e.display=n.length===1?"inline-block":"block",e.marginTop="-"+a.paddingTop,e.marginBottom="-"+a.paddingBottom)}}function tv(e,n){e=e.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;e.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,e.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),e.display==="inline-block"&&(n==null?e.display=e.margin="":(a=n.display,e.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?e.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],e.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],e.marginBottom=n==null||typeof n=="boolean"?"":n)))}function vM(e,n,a){return a=a.ownerDocument.defaultView,{rect:e,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=a.innerHeight&&e.left<=a.innerWidth}}function hh(e){var n=e.getBoundingClientRect(),a=getComputedStyle(e);return vM(n,a,e)}function _M(e){return e.documentElement.clientHeight}function yM(e){this.addEventListener("load",e),this.addEventListener("error",e)}function SM(e,n,a,r,c,f,_,C,H){var ie=n.nodeType===9?n:n.ownerDocument;try{var pe=ie.startViewTransition({update:function(){var $=ie.defaultView,de=$.navigation&&$.navigation.transition,Be=ie.fonts.status;r();var et=[];if(Be==="loaded"&&(_M(ie),ie.fonts.status==="loading"&&et.push(ie.fonts.ready)),Be=et.length,e!==null)for(var vt=e.suspenseyImages,te=0,X=0;X<vt.length;X++){var oe=vt[X];if(!oe.complete){var Me=oe.getBoundingClientRect();if(0<Me.bottom&&0<Me.right&&Me.top<$.innerHeight&&Me.left<$.innerWidth){if(te+=bv(oe),te>$c){et.length=Be;break}oe=new Promise(yM.bind(oe)),et.push(oe)}}}if(0<et.length)return $=Promise.race([Promise.all(et),new Promise(function(Ke){return setTimeout(Ke,500)})]).then(c,c),(de?Promise.allSettled([de.finished,$]):$).then(f,f);if(c(),de)return de.finished.then(f,f);f()},types:a});ie.__reactViewTransition=pe;var Ee=[];return pe.ready.then(function(){for(var $=ie.documentElement.getAnimations({subtree:!0}),de=0;de<$.length;de++){var Be=$[de],et=Be.effect,vt=et.pseudoElement;if(vt!=null&&vt.startsWith("::view-transition")){Ee.push(Be),Be=et.getKeyframes();for(var te=vt=void 0,X=!0,oe=0;oe<Be.length;oe++){var Me=Be[oe],Ke=Me.width;if(vt===void 0)vt=Ke;else if(vt!==Ke){X=!1;break}if(Ke=Me.height,te===void 0)te=Ke;else if(te!==Ke){X=!1;break}delete Me.width,delete Me.height,Me.transform==="none"&&delete Me.transform}X&&vt!==void 0&&te!==void 0&&(et.setKeyframes(Be),X=getComputedStyle(et.target,et.pseudoElement),X.width!==vt||X.height!==te)&&(X=Be[0],X.width=vt,X.height=te,X=Be[Be.length-1],X.width=vt,X.height=te,et.setKeyframes(Be))}}_()},function($){ie.__reactViewTransition===pe&&(ie.__reactViewTransition=null);try{if(typeof $=="object"&&$!==null)switch($.name){case"InvalidStateError":($.message==="View transition was skipped because document visibility state is hidden."||$.message==="Skipping view transition because document visibility state has become hidden."||$.message==="Skipping view transition because viewport size changed."||$.message==="Transition was aborted because of invalid state")&&($=null)}$!==null&&H($)}finally{r(),c(),_()}}),pe.finished.finally(function(){for(var $=0;$<Ee.length;$++)Ee[$].cancel();ie.__reactViewTransition===pe&&(ie.__reactViewTransition=null),C()}),pe}catch{return r(),c(),_(),null}}function Ys(e,n){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+n+")"}Ys.prototype.animate=function(e,n){return n=typeof n=="number"?{duration:n}:F({},n),n.pseudoElement=this._selector,this._scope.animate(e,n)},Ys.prototype.getAnimations=function(){for(var e=this._scope,n=this._selector,a=e.getAnimations({subtree:!0}),r=[],c=0;c<a.length;c++){var f=a[c].effect;f!==null&&f.target===e&&f.pseudoElement===n&&r.push(a[c])}return r},Ys.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function nv(e){return{name:e,group:new Ys("group",e),imagePair:new Ys("image-pair",e),old:new Ys("old",e),new:new Ys("new",e)}}function fi(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}fi.prototype.addEventListener=function(e,n,a){var r=null,c=null;if(!(a!=null&&typeof a!="boolean"&&(r=a.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var f=this._eventListeners;if(av(f,e,n,a)===-1){var _=this,C=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(C=function(H){_.removeEventListener(e,n,a),typeof n=="function"?n.call(this,H):n.handleEvent(H)}),r!==null&&(c=_.removeEventListener.bind(_,e,n,a),r.addEventListener("abort",c,{once:!0}),c=r.removeEventListener.bind(r,"abort",c)),r=Vr(a),f.push({type:e,listener:n,optionsOrUseCapture:a,attachedListener:C,cleanup:c}),x(this._fragmentFiber.child,!1,bM,e,C,r)}this._eventListeners=f}};function bM(e,n,a,r){return S(e).addEventListener(n,a,r),!1}fi.prototype.removeEventListener=function(e,n,a){var r=this._eventListeners;if(r!==null&&(n=av(r,e,n,a),n!==-1)){var c=r[n];a=c.attachedListener;var f=c.cleanup;c=Vr(c.optionsOrUseCapture),x(this._fragmentFiber.child,!1,MM,e,a,c),r.splice(n,1),f!==null&&f()}};function MM(e,n,a,r){return S(e).removeEventListener(n,a,r),!1}function Vr(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function iv(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function av(e,n,a,r){if(e.length===0)return-1;r=iv(r);for(var c=0;c<e.length;c++){var f=e[c];if(f.type===n&&f.listener===a&&iv(f.optionsOrUseCapture)===r)return c}return-1}fi.prototype.dispatchEvent=function(e){var n=v(this._fragmentFiber);if(n===null)return!0;n=S(n);var a=this._eventListeners;if(a!==null&&0<a.length||!e.bubbles){var r=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var c=0;c<a.length;c++){var f=a[c];r.addEventListener(f.type,f.attachedListener,Vr(f.optionsOrUseCapture))}if(n.appendChild(r),e=r.dispatchEvent(e),a)for(c=0;c<a.length;c++)f=a[c],r.removeEventListener(f.type,f.attachedListener,Vr(f.optionsOrUseCapture));return n.removeChild(r),e}return n.dispatchEvent(e)},fi.prototype.focus=function(e){x(this._fragmentFiber.child,!0,sv,e,void 0,void 0)};function sv(e,n){return e.tag===6?!1:(e=S(e),PM(e,n))}fi.prototype.focusLast=function(e){var n=[];x(this._fragmentFiber.child,!0,ph,n,void 0,void 0);for(var a=n.length-1;0<=a&&!sv(n[a],e);a--);};function ph(e,n){return n.push(e),!1}fi.prototype.blur=function(){var e=v(this._fragmentFiber);e!==null&&(e=S(e),e=cl(e).activeElement,e!==null&&x(this._fragmentFiber.child,!1,EM,e,void 0,void 0))};function EM(e,n){return e.tag===6?!1:(e=S(e),e===n||e.contains(n)?(n.blur(),!0):!1)}fi.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),x(this._fragmentFiber.child,!1,TM,e,void 0,void 0)};function TM(e,n){return e.tag===6||(e=S(e),n.observe(e)),!1}fi.prototype.unobserveUsing=function(e){var n=this._observers;if(n!==null&&n.has(e)){n.delete(e),x(this._fragmentFiber.child,!1,AM,e,void 0,void 0);for(var a=n=0;a<Bi.length;a++){var r=Bi[a];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Bi[n++]=r}Bi.length=n}};function AM(e,n){return e.tag===6||(e=S(e),n.unobserve(e)),!1}var Bi=[],mh=!1;function wM(e,n,a){Bi.push({fragmentInstance:e,observer:n,instance:a}),mh||(mh=!0,IM(function(){mh=!1;var r=Bi;Bi=[];for(var c=0;c<r.length;c++){var f=r[c];f.observer.unobserve(f.instance)}}))}fi.prototype.getClientRects=function(){var e=[];return x(this._fragmentFiber.child,!1,CM,e,void 0,void 0),e};function CM(e,n){if(e.tag===6){e=e.stateNode;var a=e.ownerDocument.createRange();a.selectNodeContents(e),n.push.apply(n,a.getClientRects())}else e=S(e),n.push.apply(n,e.getClientRects());return!1}fi.prototype.getRootNode=function(e){var n=v(this._fragmentFiber);return n===null?this:S(n).getRootNode(e)},fi.prototype.compareDocumentPosition=function(e){var n=v(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];x(this._fragmentFiber.child,!1,ph,a,void 0,void 0);var r=S(n);if(a.length===0){if(a=r,M(this._fragmentFiber)){e:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break e}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var c=r=a.compareDocumentPosition(e);return a===e?c=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=A(n)[1],a===null?c=Node.DOCUMENT_POSITION_PRECEDING:(e=S(a).compareDocumentPosition(e),c=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),c|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=S(a[0]),c=S(a[a.length-1]);var f=M(this._fragmentFiber)?n.parentElement:r;if(f==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=f.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,f=f.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY;var _=n.compareDocumentPosition(e),C=c.compareDocumentPosition(e),H=_&Node.DOCUMENT_POSITION_CONTAINED_BY||C&Node.DOCUMENT_POSITION_CONTAINED_BY;return C=r&&f&&_&Node.DOCUMENT_POSITION_FOLLOWING&&C&Node.DOCUMENT_POSITION_PRECEDING,n=r&&n===e||f&&c===e||H||C?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&n===e||!f&&c===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:_,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||RM(n,this._fragmentFiber,a[0],a[a.length-1],e)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function RM(e,n,a,r,c){var f=ct(c);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!f)e:{for(;f!==null;){if(f.tag===7&&(f===n||f.alternate===n)){a=!0;break e}f=f.return}a=!1}return a}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(f===null)return f=c.ownerDocument,c===f||c===f.documentElement||c===f.body;e:{for(f=n,n=v(n);f!==null;){if(!(f.tag!==5&&f.tag!==3&&f.tag!==27||f!==n&&f.alternate!==n)){f=!0;break e}f=f.return}f=!1}return f}return e&Node.DOCUMENT_POSITION_PRECEDING?((n=!!f)&&!(n=f===a)&&(n=P(a,f,U),n===null?n=!1:(x(n,!0,k,f,a),f=b,b=null,n=f!==null)),n):e&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!f)&&!(n=f===r)&&(n=P(r,f,U),n===null?n=!1:(x(n,!0,R,f,r),f=b,L=b=null,n=f!==null)),n):!1}function rv(e,n){var a=e.ownerDocument.createRange();a.selectNodeContents(e),e=a.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,n?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}fi.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(s(566));var n=[];x(this._fragmentFiber.child,!1,ph,n,void 0,void 0);var a=e!==!1;if(n.length===0){var r=A(this._fragmentFiber);if(r=a?r[1]||r[0]||v(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=S(r),rv(e,a);return}if(r=S(r),r.nodeType!==9){if(r.nodeType===11){a="host"in r?r.host:null,a!==null&&a.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=a?n.length-1:0;r!==(a?-1:n.length);){var c=n[r];c.tag===6?(c=S(c),rv(c,a)):S(c).scrollIntoView(e),r+=a?-1:1}};function NM(e,n){return e=S(e),ov(e,n),!1}function ov(e,n){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(n)}function lv(e,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];e.addEventListener(c.type,c.attachedListener,Vr(c.optionsOrUseCapture))}e.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(f){for(var _=0,C=0;C<Bi.length;C++){var H=Bi[C];(H.fragmentInstance!==n||H.observer!==f||H.instance!==e)&&(Bi[_++]=H)}Bi.length=_,f.observe(e)}),ov(e,n))}function DM(e,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];e.removeEventListener(c.type,c.attachedListener,Vr(c.optionsOrUseCapture))}e.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(f){typeof f.rootMargin=="string"?wM(n,f,e):f.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(n))}function gh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":gh(a),$e(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function UM(e,n,a,r){for(;e.nodeType===1;){var c=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[ze])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=Ai(e.nextSibling),e===null)break}return null}function LM(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ai(e.nextSibling),e===null))return null;return e}function cv(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ai(e.nextSibling),e===null))return null;return e}function xh(e){return e.data==="$?"||e.data==="$~"}function vh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function OM(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function Ai(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var _h=null;function uv(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return Ai(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function fv(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function PM(e,n){function a(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener("focus",a,!0),(e.focus||HTMLElement.prototype.focus).call(e,n)}finally{e.ownerDocument.removeEventListener("focus",a,!0)}return r}function IM(e){Qx(function(){Qx(function(n){return e(n)})})}function dv(e,n,a){switch(n=cl(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function hv(e,n,a){for(var r in a){var c=a[r];a.hasOwnProperty(r)&&c!=null&&Yt(e,n,r,null,fM,c)}a.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===Zi&&(e.onclick=null),$e(e)}function yh(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);$e(e)}var wi=new Map,pv=new Set;function ul(e){if(typeof e.getRootNode=="function"){var n=e.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return e.nodeType===9?e:e.ownerDocument}var Na=Ce.d;Ce.d={f:zM,r:BM,D:FM,C:HM,L:GM,m:VM,X:jM,S:kM,M:XM};function zM(){var e=Na.f(),n=jc();return e||n}function BM(e){var n=mt(e);n!==null&&n.tag===5&&n.type==="form"?gg(n):Na.r(e)}var kr=typeof document>"u"?null:document;function mv(e,n,a){var r=kr;if(r&&typeof n=="string"&&n){var c=_i(n);c='link[rel="'+e+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),pv.has(c)||(pv.add(c),e={rel:e,crossOrigin:a,href:n},r.querySelector(c)===null&&(n=r.createElement("link"),On(n,"link",e),St(n),r.head.appendChild(n)))}}function FM(e){Na.D(e),mv("dns-prefetch",e,null)}function HM(e,n){Na.C(e,n),mv("preconnect",e,n)}function GM(e,n,a){Na.L(e,n,a);var r=kr;if(r&&e&&n){var c='link[rel="preload"][as="'+_i(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+_i(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+_i(a.imageSizes)+'"]')):c+='[href="'+_i(e)+'"]';var f=c;switch(n){case"style":f=jr(e);break;case"script":f=Xr(e)}if(!(wi.has(f)||(e=F({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),wi.set(f,e),r.querySelector(c)!==null||n==="style"&&r.querySelector(fl(f))||n==="script"&&r.querySelector(dl(f))))){var _=r.createElement("link");On(_,"link",e),n==="style"&&(_[Qe]=!0,_.onload=_.onerror=function(){Kt(_)}),St(_),r.head.appendChild(_)}}}function VM(e,n){Na.m(e,n);var a=kr;if(a&&e){var r=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+_i(r)+'"][href="'+_i(e)+'"]',f=c;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=Xr(e)}if(!wi.has(f)&&(e=F({rel:"modulepreload",href:e},n),wi.set(f,e),a.querySelector(c)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(dl(f)))return}r=a.createElement("link"),On(r,"link",e),St(r),a.head.appendChild(r)}}}function kM(e,n,a){Na.S(e,n,a);var r=kr;if(r&&e){var c=Tt(r).hoistableStyles,f=jr(e);n=n||"default";var _=c.get(f);if(!_){var C={loading:0,preload:null};if(_=r.querySelector(fl(f)))C.loading=5;else{e=F({rel:"stylesheet",href:e,"data-precedence":n},a),(a=wi.get(f))&&Sh(e,a);var H=_=r.createElement("link");St(H),On(H,"link",e),H._p=new Promise(function(ie,pe){H.onload=ie,H.onerror=pe}),H.addEventListener("load",function(){C.loading|=1}),H.addEventListener("error",function(){C.loading|=2}),C.loading|=4,Qc(_,n,r)}_={type:"stylesheet",instance:_,count:1,state:C},c.set(f,_)}}}function jM(e,n){Na.X(e,n);var a=kr;if(a&&e){var r=Tt(a).hoistableScripts,c=Xr(e),f=r.get(c);f||(f=a.querySelector(dl(c)),f||(e=F({src:e,async:!0},n),(n=wi.get(c))&&bh(e,n),f=a.createElement("script"),St(f),On(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function XM(e,n){Na.M(e,n);var a=kr;if(a&&e){var r=Tt(a).hoistableScripts,c=Xr(e),f=r.get(c);f||(f=a.querySelector(dl(c)),f||(e=F({src:e,async:!0,type:"module"},n),(n=wi.get(c))&&bh(e,n),f=a.createElement("script"),St(f),On(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function gv(e,n,a,r){var c=(c=zt.current)?ul(c):null;if(!c)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=jr(a.href),n=Tt(c).hoistableStyles,r=n.get(a),r||(r={type:"style",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=jr(a.href);var f=Tt(c).hoistableStyles,_=f.get(e);if(_||(c=c.ownerDocument||c,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,_),(f=c.querySelector(fl(e)))?f._p||(_.instance=f,_.state.loading=5):(f=wi.get(e),f||(f={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},wi.set(e,f)),WM(c,e,f,_.state))),n&&r===null)throw Error(s(528,""));return _}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Xr(a),n=Tt(c).hoistableScripts,r=n.get(a),r||(r={type:"script",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function jr(e){return'href="'+_i(e)+'"'}function fl(e){return'link[rel="stylesheet"]['+e+"]"}function xv(e){return F({},e,{"data-precedence":e.precedence,precedence:null})}function WM(e,n,a,r){if(n=e.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Qe]!==!0){r.loading=1;return}}else n=e.createElement("link"),n[Qe]=!0,n.onload=n.onerror=Kt.bind(null,n),On(n,"link",a),St(n),e.head.appendChild(n);r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2})}function Xr(e){return'[src="'+_i(e)+'"]'}function dl(e){return"script[async]"+e}function vv(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=e.querySelector('style[data-href~="'+_i(a.href)+'"]');if(r)return n.instance=r,St(r),r;var c=F({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),St(r),On(r,"style",c),Qc(r,a.precedence,e),n.instance=r;case"stylesheet":c=jr(a.href);var f=e.querySelector(fl(c));if(f)return n.state.loading|=4,n.instance=f,St(f),f;r=xv(a),(c=wi.get(c))&&Sh(r,c),f=(e.ownerDocument||e).createElement("link"),St(f);var _=f;return _._p=new Promise(function(C,H){_.onload=C,_.onerror=H}),On(f,"link",r),n.state.loading|=4,Qc(f,a.precedence,e),n.instance=f;case"script":return f=Xr(a.src),(c=e.querySelector(dl(f)))?(n.instance=c,St(c),c):(r=a,(c=wi.get(f))&&(r=F({},a),bh(r,c)),e=e.ownerDocument||e,c=e.createElement("script"),St(c),On(c,"link",r),e.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Qc(r,a.precedence,e));return n.instance}function Qc(e,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=r.length?r[r.length-1]:null,f=c,_=0;_<r.length;_++){var C=r[_];if(C.dataset.precedence===n)f=C;else if(f!==c)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Sh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function bh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Jc=null;function _v(e,n,a){if(Jc===null){var r=new Map,c=Jc=new Map;c.set(a,r)}else c=Jc,r=c.get(a),r||(r=new Map,c.set(a,r));if(r.has(e))return r;for(r.set(e,null),a=a.getElementsByTagName(e),c=0;c<a.length;c++){var f=a[c];if(!(f[ze]||f[w]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var _=f.getAttribute(n)||"";_=e+_;var C=r.get(_);C?C.push(f):r.set(_,[f])}}return r}function Mh(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function qM(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function yv(e,n){return e==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function Sv(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function bv(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Mv(e,n){typeof n.decode=="function"&&(e.imgCount++,n.complete||(e.imgBytes+=bv(n),e.suspenseyImages.push(n)),e=KM.bind(e),n.decode().then(e,e))}function YM(e,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=jr(r.href),f=n.querySelector(fl(c));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=hl.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,St(f);return}f=n.ownerDocument||n,r=xv(r),(c=wi.get(c))&&Sh(r,c),f=f.createElement("link"),St(f);var _=f;_._p=new Promise(function(C,H){_.onload=C,_.onerror=H}),On(f,"link",r),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=hl.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var $c=0;function ZM(e,n){return e.stylesheets&&e.count===0&&tu(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var r=setTimeout(function(){if(e.stylesheets&&tu(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&$c===0&&($c=62500*hM());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&tu(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>$c?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(c)}}:null}function Ev(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)tu(e,e.stylesheets);else if(e.unsuspend){var n=e.unsuspend;e.unsuspend=null,n()}}}function hl(){this.count--,Ev(this)}function KM(){this.imgCount--,Ev(this)}var eu=null;function tu(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,eu=new Map,n.forEach(QM,e),eu=null,hl.call(e))}function QM(e,n){if(!(n.state.loading&4)){var a=eu.get(e);if(a)var r=a.get(null);else{a=new Map,eu.set(e,a);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var _=c[f];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),r=_)}r&&a.set(null,r)}c=n.instance,_=c.getAttribute("data-precedence"),f=a.get(_)||r,f===r&&a.set(null,c),a.set(_,c),this.count++,r=hl.bind(this),c.addEventListener("load",r),c.addEventListener("error",r),f?f.parentNode.insertBefore(c,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),n.state.loading|=4}}var Wr={$$typeof:ne,Provider:null,Consumer:null,_currentValue:ut,_currentValue2:ut,_threadCount:0};function JM(e,n,a,r,c,f,_,C,H){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=cr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=cr(0),this.hiddenUpdates=cr(null),this.identifierPrefix=r,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.transitionTypes=null,this.incompleteTransitions=new Map}function Tv(e,n,a,r,c,f,_,C,H,ie,pe,Ee){return e=new JM(e,n,a,_,H,ie,pe,Ee,C),n=1,f===!0&&(n|=24),f=Kn(3,null,null,n),e.current=f,f.stateNode=e,n=Bf(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:r,isDehydrated:a,cache:n},Vf(f),e}function Av(e){return e?(e=vr,e):vr}function wv(e,n,a,r,c,f){c=Av(c),r.context===null?r.context=c:r.pendingContext=c,r=Ja(n),r.payload={element:a},f=f===void 0?null:f,f!==null&&(r.callback=f),a=$a(e,r,n),a!==null&&(ei(a,e,n),jo(a,e,n))}function Cv(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Eh(e,n){Cv(e,n),(e=e.alternate)&&Cv(e,n)}function Rv(e){if(e.tag===13||e.tag===31){var n=Ds(e,67108864);n!==null&&ei(n,e,67108864),Eh(e,67108864)}}function Nv(e){if(e.tag===13||e.tag===31){var n=ui();n=wo(n);var a=Ds(e,n);a!==null&&ei(a,e,n),Eh(e,n)}}var qr=!0;function $M(e,n,a,r){var c=ge.T;ge.T=null;var f=Ce.p;try{Ce.p=2,Th(e,n,a,r)}finally{Ce.p=f,ge.T=c}}function e1(e,n,a,r){var c=ge.T;ge.T=null;var f=Ce.p;try{Ce.p=8,Th(e,n,a,r)}finally{Ce.p=f,ge.T=c}}function Th(e,n,a,r){if(qr){var c=Ah(r);if(c===null)rh(e,n,r,nu,a),Uv(e,r);else if(n1(c,e,n,a,r))r.stopPropagation();else if(Uv(e,r),n&4&&-1<t1.indexOf(e)){for(;c!==null;){var f=mt(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var _=ga(f.pendingLanes);if(_!==0){var C=f;for(C.pendingLanes|=2,C.entangledLanes|=2;_;){var H=1<<31-pt(_);C.entanglements[1]|=H,_&=~H}sa(f),(Vt&6)===0&&(Gc=qe()+500,rl(0))}}break;case 31:case 13:C=Ds(f,2),C!==null&&ei(C,f,2),jc(),Eh(f,2)}if(f=Ah(r),f===null&&rh(e,n,r,nu,a),f===c)break;c=f}c!==null&&r.stopPropagation()}else rh(e,n,r,null,a)}}function Ah(e){return e=ff(e),wh(e)}var nu=null;function wh(e){if(nu=null,e=ct(e),e!==null){var n=u(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=d(n),e!==null)return e;e=null}else if(a===31){if(e=h(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return nu=e,null}function Dv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(rt()){case ht:return 2;case K:return 8;case Le:case Te:return 32;case Ie:return 268435456;default:return 32}default:return 32}}var Ch=!1,fs=null,ds=null,hs=null,pl=new Map,ml=new Map,ps=[],t1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Uv(e,n){switch(e){case"focusin":case"focusout":fs=null;break;case"dragenter":case"dragleave":ds=null;break;case"mouseover":case"mouseout":hs=null;break;case"pointerover":case"pointerout":pl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":ml.delete(n.pointerId)}}function gl(e,n,a,r,c,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:f,targetContainers:[c]},n!==null&&(n=mt(n),n!==null&&Rv(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),e)}function n1(e,n,a,r,c){switch(n){case"focusin":return fs=gl(fs,e,n,a,r,c),!0;case"dragenter":return ds=gl(ds,e,n,a,r,c),!0;case"mouseover":return hs=gl(hs,e,n,a,r,c),!0;case"pointerover":var f=c.pointerId;return pl.set(f,gl(pl.get(f)||null,e,n,a,r,c)),!0;case"gotpointercapture":return f=c.pointerId,ml.set(f,gl(ml.get(f)||null,e,n,a,r,c)),!0}return!1}function Lv(e){var n=ct(e.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=d(a),n!==null){e.blockedOn=n,Vl(e.priority,function(){Nv(a)});return}}else if(n===31){if(n=h(a),n!==null){e.blockedOn=n,Vl(e.priority,function(){Nv(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function iu(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Ah(e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);uf=r,a.target.dispatchEvent(r),uf=null}else return n=mt(a),n!==null&&Rv(n),e.blockedOn=a,!1;n.shift()}return!0}function Ov(e,n,a){iu(e)&&a.delete(n)}function i1(){Ch=!1,fs!==null&&iu(fs)&&(fs=null),ds!==null&&iu(ds)&&(ds=null),hs!==null&&iu(hs)&&(hs=null),pl.forEach(Ov),ml.forEach(Ov)}function au(e,n){e.blockedOn===n&&(e.blockedOn=null,Ch||(Ch=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,i1)))}var su=null;function Pv(e){su!==e&&(su=e,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){su===e&&(su=null);for(var n=0;n<e.length;n+=3){var a=e[n],r=e[n+1],c=e[n+2];if(typeof r!="function"){if(wh(r||a)===null)continue;break}var f=mt(a);f!==null&&(e.splice(n,3),n-=3,cd(f,{pending:!0,data:c,method:a.method,action:r},r,c))}}))}function Yr(e){function n(H){return au(H,e)}fs!==null&&au(fs,e),ds!==null&&au(ds,e),hs!==null&&au(hs,e),pl.forEach(n),ml.forEach(n);for(var a=0;a<ps.length;a++){var r=ps[a];r.blockedOn===e&&(r.blockedOn=null)}for(;0<ps.length&&(a=ps[0],a.blockedOn===null);)Lv(a),a.blockedOn===null&&ps.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var c=a[r],f=a[r+1],_=c[V]||null;if(typeof f=="function")_||Pv(a);else if(_){var C=null;if(f&&f.hasAttribute("formAction")){if(c=f,_=f[V]||null)C=_.formAction;else if(wh(c)!==null)continue}else C=_.action;typeof C=="function"?a[r+1]=C:(a.splice(r,3),r-=3),Pv(a)}}}function Iv(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(_){return c=_})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function Rh(e){this._internalRoot=e}ru.prototype.render=Rh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ui();wv(a,r,e,n,null,null)},ru.prototype.unmount=Rh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;wv(e.current,2,null,e,null,null),jc(),n[xe]=null}};function ru(e){this._internalRoot=e}ru.prototype.unstable_scheduleHydration=function(e){if(e){var n=Gl();e={blockedOn:null,target:e,priority:n};for(var a=0;a<ps.length&&n!==0&&n<ps[a].priority;a++);ps.splice(a,0,e),a===0&&Lv(e)}};var zv=t.version;if(zv!=="19.3.0")throw Error(s(527,zv,"19.3.0"));Ce.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=m(n),e=e!==null?y(e):null,e=e===null?null:e.stateNode,e};var a1={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:ge,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ou=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ou.isDisabled&&ou.supportsFiber)try{tt=ou.inject(a1),Xe=ou}catch{}}return vl.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,r="",c=Ag,f=wg,_=Cg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=Tv(e,1,!1,null,null,a,r,null,c,f,_,Iv),e[xe]=n.current,sh(e),new Rh(n)},vl.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var r=!1,c="",f=Ag,_=wg,C=Cg,H=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=Tv(e,1,!0,n,a??null,r,c,H,f,_,C,Iv),n.context=Av(null),a=n.current,r=ui(),r=wo(r),c=Ja(r),c.callback=null,$a(a,c,r),a=r,n.current.lanes=a,qi(n,a),sa(n),e[xe]=n.current,sh(e),new ru(n)},vl.version="19.3.0",vl}var qv;function m1(){if(qv)return Uh.exports;qv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),Uh.exports=p1(),Uh.exports}var g1=m1();const x1=$_(g1);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v1=o=>o==null?void 0:o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function _1(o,t,i=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:v1(o),size:24,node:t,...i.length>0?{aliases:i}:{}}}/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y1=o=>{let t="",i=!1;for(const s of o){if(s==="-"||s==="_"||s<=" "){i=t.length>0;continue}t.length===0?t+=s.toLowerCase():t+=i?s.toUpperCase():s,i=!1}return t};/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S1=o=>{const t=y1(o);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=(...o)=>o.filter((t,i,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===i).join(" ").trim();/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zs={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Ih(o){return o!=null}function b1(o,t={}){var v,M;const i=t.attributeNames??{},s=A=>i[A]??A,l=o.size??o.width??Zs.width,u=o.size??o.height??Zs.height,d=((v=o.aliases)==null?void 0:v.filter(A=>typeof A=="string"&&A.trim()!=="").map(A=>`lucide-${A}`))??[],h=[...o.name?[`lucide-${o.name}`]:[],...d],g=((M=t.className)==null?void 0:M.split(" ").filter(Boolean))??[],m=t.includeDefaultClasses===!1?vp(...g):vp("lucide",...h,...g),y=t.absoluteStrokeWidth?Number(t.strokeWidth??Zs["stroke-width"])*Number(o.size??o.width??Zs.width)/Number(t.size??t.width??Zs.width):t.strokeWidth??Zs["stroke-width"];return["svg",{...Object.entries(Zs).reduce((A,[N,S])=>(A[s(N)]=S,A),{}),..."color"in t&&t.color&&{[s("stroke")]:t.color},..."size"in t&&Ih(t.size)&&{[s("width")]:t.size,[s("height")]:t.size},..."width"in t&&Ih(t.width)&&{[s("width")]:t.width},..."height"in t&&Ih(t.height)&&{[s("height")]:t.height},[s("stroke-width")]:y,...m&&{[s("class")]:m},[s("viewBox")]:`0 0 ${l} ${u}`,...t.hasA11yProp===!1?{[s("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},o.node.map(A=>{const[N,S,b]=A,L=t.nonScalingStroke?{[s("vector-effect")]:"non-scaling-stroke",...S}:S;return b?[N,L,b]:[N,L]})]}/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function M1(o,t={}){return b1(o,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E1=o=>{for(const t in o)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},T1=Pe.createContext({}),A1=()=>Pe.useContext(T1),w1=Pe.forwardRef(({color:o,size:t,width:i,height:s,strokeWidth:l,absoluteStrokeWidth:u,nonScalingStroke:d,className:h="",children:g,iconNode:m=[],icon:y={node:m,aliases:[],size:24},...x},v)=>{const{size:M=24,strokeWidth:A=2,absoluteStrokeWidth:N=!1,nonScalingStroke:S=!1,color:b="currentColor",className:L=""}=A1()??{},k=!!g||E1(x),[R,U,P=[]]=M1(y,{color:o??b,width:i??t??M,height:s??t??M,strokeWidth:l??A,absoluteStrokeWidth:u??N,nonScalingStroke:d??S,className:vp(L,h),hasA11yProp:k,attributes:x});return Pe.createElement(R,{ref:v,...U},[...P.map(([F,T])=>Pe.createElement(F,T)),...Array.isArray(g)?g:[g]])});/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function kt(o,t=[],i=[]){const s=typeof o=="string"?_1(o,t,i):o,l=Pe.forwardRef(({className:u,...d},h)=>Pe.createElement(w1,{ref:h,icon:s,className:u,...d}));return s.name&&(l.displayName=S1(s.name)),l}/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ey={name:"activity",size:24,node:[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]};ey.node;const hm=kt(ey);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ty={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};ty.node;const Qu=kt(ty);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ny={name:"arrow-up-right",size:24,node:[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]};ny.node;const C1=kt(ny);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iy={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};iy.node;const Ba=kt(iy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ay={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};ay.node;const sy=kt(ay);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ry={name:"circle-check-big",size:24,node:[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],aliases:["check-circle"]};ry.node;const Yv=kt(ry);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oy={name:"code-xml",size:24,node:[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],aliases:["code-2"]};oy.node;const ly=kt(oy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cy={name:"compass",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]]};cy.node;const R1=kt(cy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uy={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};uy.node;const zl=kt(uy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy={name:"corner-down-left",size:24,node:[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4",key:"6o5b7l"}],["path",{d:"m9 10-5 5 5 5",key:"1kshq7"}]]};fy.node;const N1=kt(fy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dy={name:"cpu",size:24,node:[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]};dy.node;const hy=kt(dy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const py={name:"external-link",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]};py.node;const D1=kt(py);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const my={name:"file-code-corner",size:24,node:[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",key:"1wthlu"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"m5 16-3 3 3 3",key:"331omg"}],["path",{d:"m9 22 3-3-3-3",key:"lsp7cz"}]],aliases:["file-code-2"]};my.node;const U1=kt(my);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gy={name:"flask-conical",size:24,node:[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",key:"18mbvz"}],["path",{d:"M6.453 15h11.094",key:"3shlmq"}],["path",{d:"M8.5 2h7",key:"csnxdl"}]]};gy.node;const xy=kt(gy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vy={name:"globe",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]};vy.node;const _y=kt(vy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yy={name:"key",size:24,node:[["path",{d:"m2 21 9.6-9.6",key:"9l79m3"}],["path",{d:"m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19",key:"fw8biw"}],["circle",{cx:"15.5",cy:"7.5",r:"5.5",key:"4wxmhb"}]]};yy.node;const L1=kt(yy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sy={name:"log-in",size:24,node:[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]]};Sy.node;const O1=kt(Sy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const by={name:"menu",size:24,node:[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]};by.node;const P1=kt(by);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const My={name:"palette",size:24,node:[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]]};My.node;const I1=kt(My);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ey={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};Ey.node;const z1=kt(Ey);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ty={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};Ty.node;const Zv=kt(Ty);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ay={name:"send",size:24,node:[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]};Ay.node;const Kv=kt(Ay);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wy={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};wy.node;const Ju=kt(wy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cy={name:"sliders-vertical",size:24,node:[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],aliases:["sliders"]};Cy.node;const _p=kt(Cy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ry={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Ry.node;const Ms=kt(Ry);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ny={name:"terminal",size:24,node:[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]};Ny.node;const Dy=kt(Ny);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uy={name:"type",size:24,node:[["path",{d:"M12 4v16",key:"1654pz"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",key:"e0r10z"}],["path",{d:"M9 20h6",key:"s66wpe"}]]};Uy.node;const B1=kt(Uy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ly={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};Ly.node;const Oy=kt(Ly);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Py={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};Py.node;const yp=kt(Py);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iy={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Iy.node;const yo=kt(Iy);/**
 * @license lucide-react v1.52.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zy={name:"zap",size:24,node:[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]]};zy.node;const By=kt(zy);var pm={};(function o(t,i,s,l){var u=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),d=typeof Path2D=="function"&&typeof DOMMatrix=="function",h=(function(){if(!t.OffscreenCanvas)return!1;try{var O=new OffscreenCanvas(1,1),D=O.getContext("2d");D.fillRect(0,0,1,1);var _e=O.transferToImageBitmap();D.createPattern(_e,"no-repeat")}catch{return!1}return!0})();function g(){}function m(O){var D=i.exports.Promise,_e=D!==void 0?D:t.Promise;return typeof _e=="function"?new _e(O):(O(g,g),null)}var y=(function(O,D){return{transform:function(_e){if(O)return _e;if(D.has(_e))return D.get(_e);var we=new OffscreenCanvas(_e.width,_e.height),B=we.getContext("2d");return B.drawImage(_e,0,0),D.set(_e,we),we},clear:function(){D.clear()}}})(h,new Map),x=(function(){var O=Math.floor(16.666666666666668),D,_e,we={},B=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(D=function(re){var Se=Math.random();return we[Se]=requestAnimationFrame(function G(ee){B===ee||B+O-1<ee?(B=ee,delete we[Se],re()):we[Se]=requestAnimationFrame(G)}),Se},_e=function(re){we[re]&&cancelAnimationFrame(we[re])}):(D=function(re){return setTimeout(re,O)},_e=function(re){return clearTimeout(re)}),{frame:D,cancel:_e}})(),v=(function(){var O,D,_e={};function we(B){function re(Se,G){B.postMessage({options:Se||{},callback:G})}B.init=function(G){var ee=G.transferControlToOffscreen();B.postMessage({canvas:ee},[ee])},B.fire=function(G,ee,be){if(D)return re(G,null),D;var Ne=Math.random().toString(36).slice(2);return D=m(function(ge){function Ce(ut){ut.data.callback===Ne&&(delete _e[Ne],B.removeEventListener("message",Ce),D=null,y.clear(),be(),ge())}B.addEventListener("message",Ce),re(G,Ne),_e[Ne]=Ce.bind(null,{data:{callback:Ne}})}),D},B.reset=function(){B.postMessage({reset:!0});for(var G in _e)_e[G](),delete _e[G]}}return function(){if(O)return O;if(!s&&u){var B=["var CONFETTI, SIZE = {}, module = {};","("+o.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{O=new Worker(URL.createObjectURL(new Blob([B])))}catch(re){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",re),null}we(O)}return O}})(),M={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function A(O,D){return D?D(O):O}function N(O){return O!=null}function S(O,D,_e){return A(O&&N(O[D])?O[D]:M[D],_e)}function b(O){return O<0?0:Math.floor(O)}function L(O,D){return Math.floor(Math.random()*(D-O))+O}function k(O){return parseInt(O,16)}function R(O){return O.map(U)}function U(O){var D=String(O).replace(/[^0-9a-f]/gi,"");return D.length<6&&(D=D[0]+D[0]+D[1]+D[1]+D[2]+D[2]),{r:k(D.substring(0,2)),g:k(D.substring(2,4)),b:k(D.substring(4,6))}}function P(O){var D=S(O,"origin",Object);return D.x=S(D,"x",Number),D.y=S(D,"y",Number),D}function F(O){O.width=document.documentElement.clientWidth,O.height=document.documentElement.clientHeight}function T(O){var D=O.getBoundingClientRect();O.width=D.width,O.height=D.height}function I(O){var D=document.createElement("canvas");return D.style.position="fixed",D.style.top="0px",D.style.left="0px",D.style.pointerEvents="none",D.style.zIndex=O,D}function j(O,D,_e,we,B,re,Se,G,ee){O.save(),O.translate(D,_e),O.rotate(re),O.scale(we,B),O.arc(0,0,1,Se,G,ee),O.restore()}function W(O){var D=O.angle*(Math.PI/180),_e=O.spread*(Math.PI/180);return{x:O.x,y:O.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:O.startVelocity*.5+Math.random()*O.startVelocity,angle2D:-D+(.5*_e-Math.random()*_e),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:O.color,shape:O.shape,tick:0,totalTicks:O.ticks,decay:O.decay,drift:O.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:O.gravity*3,ovalScalar:.6,scalar:O.scalar,flat:O.flat}}function ae(O,D){D.x+=Math.cos(D.angle2D)*D.velocity+D.drift,D.y+=Math.sin(D.angle2D)*D.velocity+D.gravity,D.velocity*=D.decay,D.flat?(D.wobble=0,D.wobbleX=D.x+10*D.scalar,D.wobbleY=D.y+10*D.scalar,D.tiltSin=0,D.tiltCos=0,D.random=1):(D.wobble+=D.wobbleSpeed,D.wobbleX=D.x+10*D.scalar*Math.cos(D.wobble),D.wobbleY=D.y+10*D.scalar*Math.sin(D.wobble),D.tiltAngle+=.1,D.tiltSin=Math.sin(D.tiltAngle),D.tiltCos=Math.cos(D.tiltAngle),D.random=Math.random()+2);var _e=D.tick++/D.totalTicks,we=D.x+D.random*D.tiltCos,B=D.y+D.random*D.tiltSin,re=D.wobbleX+D.random*D.tiltCos,Se=D.wobbleY+D.random*D.tiltSin;if(O.fillStyle="rgba("+D.color.r+", "+D.color.g+", "+D.color.b+", "+(1-_e)+")",O.beginPath(),d&&D.shape.type==="path"&&typeof D.shape.path=="string"&&Array.isArray(D.shape.matrix))O.fill(J(D.shape.path,D.shape.matrix,D.x,D.y,Math.abs(re-we)*.1,Math.abs(Se-B)*.1,Math.PI/10*D.wobble));else if(D.shape.type==="bitmap"){var G=Math.PI/10*D.wobble,ee=Math.abs(re-we)*.1,be=Math.abs(Se-B)*.1,Ne=D.shape.bitmap.width*D.scalar,ge=D.shape.bitmap.height*D.scalar,Ce=new DOMMatrix([Math.cos(G)*ee,Math.sin(G)*ee,-Math.sin(G)*be,Math.cos(G)*be,D.x,D.y]);Ce.multiplySelf(new DOMMatrix(D.shape.matrix));var ut=O.createPattern(y.transform(D.shape.bitmap),"no-repeat");ut.setTransform(Ce),O.globalAlpha=1-_e,O.fillStyle=ut,O.fillRect(D.x-Ne/2,D.y-ge/2,Ne,ge),O.globalAlpha=1}else if(D.shape==="circle")O.ellipse?O.ellipse(D.x,D.y,Math.abs(re-we)*D.ovalScalar,Math.abs(Se-B)*D.ovalScalar,Math.PI/10*D.wobble,0,2*Math.PI):j(O,D.x,D.y,Math.abs(re-we)*D.ovalScalar,Math.abs(Se-B)*D.ovalScalar,Math.PI/10*D.wobble,0,2*Math.PI);else if(D.shape==="star")for(var Ge=Math.PI/2*3,st=4*D.scalar,lt=8*D.scalar,Je=D.x,nt=D.y,Et=5,Ht=Math.PI/Et;Et--;)Je=D.x+Math.cos(Ge)*lt,nt=D.y+Math.sin(Ge)*lt,O.lineTo(Je,nt),Ge+=Ht,Je=D.x+Math.cos(Ge)*st,nt=D.y+Math.sin(Ge)*st,O.lineTo(Je,nt),Ge+=Ht;else O.moveTo(Math.floor(D.x),Math.floor(D.y)),O.lineTo(Math.floor(D.wobbleX),Math.floor(B)),O.lineTo(Math.floor(re),Math.floor(Se)),O.lineTo(Math.floor(we),Math.floor(D.wobbleY));return O.closePath(),O.fill(),D.tick<D.totalTicks}function q(O,D,_e,we,B){var re=D.slice(),Se=O.getContext("2d"),G,ee,be=m(function(Ne){function ge(){G=ee=null,Se.clearRect(0,0,we.width,we.height),y.clear(),B(),Ne()}function Ce(){s&&!(we.width===l.width&&we.height===l.height)&&(we.width=O.width=l.width,we.height=O.height=l.height),!we.width&&!we.height&&(_e(O),we.width=O.width,we.height=O.height),Se.clearRect(0,0,we.width,we.height),re=re.filter(function(ut){return ae(Se,ut)}),re.length?G=x.frame(Ce):ge()}G=x.frame(Ce),ee=ge});return{addFettis:function(Ne){return re=re.concat(Ne),be},canvas:O,promise:be,reset:function(){G&&x.cancel(G),ee&&ee()}}}function Y(O,D){var _e=!O,we=!!S(D||{},"resize"),B=!1,re=S(D,"disableForReducedMotion",Boolean),Se=u&&!!S(D||{},"useWorker"),G=Se?v():null,ee=_e?F:T,be=O&&G?!!O.__confetti_initialized:!1,Ne=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,ge;function Ce(Ge,st,lt){for(var Je=S(Ge,"particleCount",b),nt=S(Ge,"angle",Number),Et=S(Ge,"spread",Number),Ht=S(Ge,"startVelocity",Number),zt=S(Ge,"decay",Number),$t=S(Ge,"gravity",Number),Z=S(Ge,"drift",Number),tn=S(Ge,"colors",R),Dt=S(Ge,"ticks",Number),z=S(Ge,"shapes"),E=S(Ge,"scalar"),se=!!S(Ge,"flat"),le=P(Ge),ve=Je,De=[],Ue=O.width*le.x,ye=O.height*le.y;ve--;)De.push(W({x:Ue,y:ye,angle:nt,spread:Et,startVelocity:Ht,color:tn[ve%tn.length],shape:z[L(0,z.length)],ticks:Dt,decay:zt,gravity:$t,drift:Z,scalar:E,flat:se}));return ge?ge.addFettis(De):(ge=q(O,De,ee,st,lt),ge.promise)}function ut(Ge){var st=re||S(Ge,"disableForReducedMotion",Boolean),lt=S(Ge,"zIndex",Number);if(st&&Ne)return m(function(Ht){Ht()});_e&&ge?O=ge.canvas:_e&&!O&&(O=I(lt),document.body.appendChild(O)),we&&!be&&ee(O);var Je={width:O.width,height:O.height};G&&!be&&G.init(O),be=!0,G&&(O.__confetti_initialized=!0);function nt(){if(G){var Ht={getBoundingClientRect:function(){if(!_e)return O.getBoundingClientRect()}};ee(Ht),G.postMessage({resize:{width:Ht.width,height:Ht.height}});return}Je.width=Je.height=null}function Et(){ge=null,we&&(B=!1,t.removeEventListener("resize",nt)),_e&&O&&(document.body.contains(O)&&document.body.removeChild(O),O=null,be=!1)}return we&&!B&&(B=!0,t.addEventListener("resize",nt,!1)),G?G.fire(Ge,Je,Et):Ce(Ge,Je,Et)}return ut.reset=function(){G&&G.reset(),ge&&ge.reset()},ut}var ne;function Q(){return ne||(ne=Y(null,{useWorker:!0,resize:!0})),ne}function J(O,D,_e,we,B,re,Se){var G=new Path2D(O),ee=new Path2D;ee.addPath(G,new DOMMatrix(D));var be=new Path2D;return be.addPath(ee,new DOMMatrix([Math.cos(Se)*B,Math.sin(Se)*B,-Math.sin(Se)*re,Math.cos(Se)*re,_e,we])),be}function me(O){if(!d)throw new Error("path confetti are not supported in this browser");var D,_e;typeof O=="string"?D=O:(D=O.path,_e=O.matrix);var we=new Path2D(D),B=document.createElement("canvas"),re=B.getContext("2d");if(!_e){for(var Se=1e3,G=Se,ee=Se,be=0,Ne=0,ge,Ce,ut=0;ut<Se;ut+=2)for(var Ge=0;Ge<Se;Ge+=2)re.isPointInPath(we,ut,Ge,"nonzero")&&(G=Math.min(G,ut),ee=Math.min(ee,Ge),be=Math.max(be,ut),Ne=Math.max(Ne,Ge));ge=be-G,Ce=Ne-ee;var st=10,lt=Math.min(st/ge,st/Ce);_e=[lt,0,0,lt,-Math.round(ge/2+G)*lt,-Math.round(Ce/2+ee)*lt]}return{type:"path",path:D,matrix:_e}}function ue(O){var D,_e=1,we="#000000",B='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof O=="string"?D=O:(D=O.text,_e="scalar"in O?O.scalar:_e,B="fontFamily"in O?O.fontFamily:B,we="color"in O?O.color:we);var re=10*_e,Se=""+re+"px "+B,G=new OffscreenCanvas(re,re),ee=G.getContext("2d");ee.font=Se;var be=ee.measureText(D),Ne=Math.ceil(be.actualBoundingBoxRight+be.actualBoundingBoxLeft),ge=Math.ceil(be.actualBoundingBoxAscent+be.actualBoundingBoxDescent),Ce=2,ut=be.actualBoundingBoxLeft+Ce,Ge=be.actualBoundingBoxAscent+Ce;Ne+=Ce+Ce,ge+=Ce+Ce,G=new OffscreenCanvas(Ne,ge),ee=G.getContext("2d"),ee.font=Se,ee.fillStyle=we,ee.fillText(D,ut,Ge);var st=1/_e;return{type:"bitmap",bitmap:G.transferToImageBitmap(),matrix:[st,0,0,st,-Ne*st/2,-ge*st/2]}}i.exports=function(){return Q().apply(this,arguments)},i.exports.reset=function(){Q().reset()},i.exports.create=Y,i.exports.shapeFromPath=me,i.exports.shapeFromText=ue})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),pm,!1);const mm=pm.exports;pm.exports.create;class F1{constructor(){this.ctx=null,this.isMuted=!0,this.oscillators=[],this.gainNode=null}init(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;this.ctx=new t}}toggleMute(){return this.init(),this.ctx.state==="suspended"&&this.ctx.resume(),this.isMuted=!this.isMuted,this.isMuted?this.stopDrone():this.startDrone(),!this.isMuted}startDrone(){if(!this.ctx||this.gainNode)return;this.gainNode=this.ctx.createGain(),this.gainNode.gain.setValueAtTime(.01,this.ctx.currentTime),this.gainNode.gain.exponentialRampToValueAtTime(.1,this.ctx.currentTime+3),this.gainNode.connect(this.ctx.destination);const t=this.ctx.createOscillator();t.type="sine",t.frequency.setValueAtTime(55,this.ctx.currentTime);const i=this.ctx.createOscillator();i.type="sine",i.frequency.setValueAtTime(110.5,this.ctx.currentTime);const s=this.ctx.createOscillator();s.type="triangle",s.frequency.setValueAtTime(164.81,this.ctx.currentTime);const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(320,this.ctx.currentTime),t.connect(l),i.connect(l),s.connect(l),l.connect(this.gainNode),t.start(),i.start(),s.start(),this.oscillators=[t,i,s]}stopDrone(){this.gainNode&&this.ctx&&(this.gainNode.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.8),setTimeout(()=>{this.oscillators.forEach(t=>{try{t.stop()}catch{}}),this.oscillators=[],this.gainNode=null},900))}playChime(){try{this.init(),this.ctx.state==="suspended"&&this.ctx.resume();const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(587.33,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(880,this.ctx.currentTime+.25),i.gain.setValueAtTime(.12,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.8),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.8)}catch{}}playUnlockSound(){try{this.init(),this.ctx.state==="suspended"&&this.ctx.resume(),[440,554.37,659.25,880].forEach((i,s)=>{const l=this.ctx.createOscillator(),u=this.ctx.createGain(),d=this.ctx.currentTime+s*.09;l.type="sine",l.frequency.setValueAtTime(i,d),u.gain.setValueAtTime(.12,d),u.gain.exponentialRampToValueAtTime(.001,d+.7),l.connect(u),u.connect(this.ctx.destination),l.start(d),l.stop(d+.7)})}catch{}}playWarp(){try{this.init(),this.ctx.state==="suspended"&&this.ctx.resume();const t=this.ctx.createOscillator(),i=this.ctx.createGain(),s=this.ctx.createBiquadFilter();s.type="lowpass",s.frequency.setValueAtTime(450,this.ctx.currentTime),s.frequency.exponentialRampToValueAtTime(80,this.ctx.currentTime+1.2),t.type="sawtooth",t.frequency.setValueAtTime(140,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(32,this.ctx.currentTime+1.2),i.gain.setValueAtTime(.18,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+1.2),t.connect(s),s.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+1.2);const l=this.ctx.createOscillator(),u=this.ctx.createGain();l.type="sine",l.frequency.setValueAtTime(440,this.ctx.currentTime),l.frequency.exponentialRampToValueAtTime(1760,this.ctx.currentTime+.8),u.gain.setValueAtTime(.08,this.ctx.currentTime),u.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.9),l.connect(u),u.connect(this.ctx.destination),l.start(),l.stop(this.ctx.currentTime+.9)}catch{}}playPulse(t=528){try{this.init(),this.ctx.state==="suspended"&&this.ctx.resume();const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(t,this.ctx.currentTime),s.gain.setValueAtTime(.09,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.4),i.connect(s),s.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.4)}catch{}}playTick(){try{this.init(),this.ctx.state==="suspended"&&this.ctx.resume();const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(1200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(300,this.ctx.currentTime+.03),i.gain.setValueAtTime(.05,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.03),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.03)}catch{}}playSectorShift(t=0){try{this.init(),this.ctx.state==="suspended"&&this.ctx.resume();const i=[440,523.25,659.25,783.99],s=i[t%i.length]||528,l=this.ctx.createOscillator(),u=this.ctx.createGain();l.type="sine",l.frequency.setValueAtTime(s,this.ctx.currentTime),l.frequency.exponentialRampToValueAtTime(s*1.5,this.ctx.currentTime+.15),u.gain.setValueAtTime(.08,this.ctx.currentTime),u.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.35),l.connect(u),u.connect(this.ctx.destination),l.start(),l.stop(this.ctx.currentTime+.35)}catch{}}playSuccess(){try{this.init(),this.ctx.state==="suspended"&&this.ctx.resume();const t=this.ctx.createOscillator(),i=this.ctx.createOscillator(),s=this.ctx.createGain();t.type="sine",i.type="triangle",t.frequency.setValueAtTime(783.99,this.ctx.currentTime),i.frequency.setValueAtTime(1046.5,this.ctx.currentTime+.05),s.gain.setValueAtTime(.09,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.4),t.connect(s),i.connect(s),s.connect(this.ctx.destination),t.start(),i.start(this.ctx.currentTime+.05),t.stop(this.ctx.currentTime+.4),i.stop(this.ctx.currentTime+.4)}catch{}}}const cn=new F1;function H1({isOpen:o,onClose:t,initialTab:i="invite"}){const[s,l]=Pe.useState(i),[u,d]=Pe.useState(""),[h,g]=Pe.useState(!1),[m,y]=Pe.useState(""),[x,v]=Pe.useState(!1),[M,A]=Pe.useState("LPX-VOID-VIP"),[N,S]=Pe.useState({name:"",contact:"",service:"Viral Landing Experience",budget:"$5,000 - $15,000",details:""}),[b,L]=Pe.useState(!1),[k,R]=Pe.useState(!1);if(!o)return null;const U=T=>{T.preventDefault(),u.trim()&&(cn.playUnlockSound(),mm({particleCount:100,spread:70,origin:{y:.6},colors:["#c084fc","#ffffff","#e9d5ff","#818cf8","#38bdf8"]}),g(!0),y("INVITATION VALIDATED: Welcome to Lunar Paradox, Operative."))},P=async T=>{T.preventDefault(),R(!0),cn.playChime();try{const I=await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(N)});if(I.ok){const j=await I.json();j.ticketId&&A(j.ticketId)}}catch{console.log("Lead queued locally:",N)}finally{R(!1),L(!0)}},F=()=>{navigator.clipboard.writeText(M),v(!0),setTimeout(()=>v(!1),2e3)};return p.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in",onClick:t,children:p.jsxs("div",{className:"relative w-full max-w-xl rounded-2xl glass-card border border-purple-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] text-slate-100 overflow-hidden",onClick:T=>T.stopPropagation(),children:[p.jsx("div",{className:"absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"}),p.jsx("div",{className:"absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"}),p.jsx("button",{onClick:t,className:"absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors","aria-label":"Close modal",children:p.jsx(yo,{className:"w-5 h-5"})}),p.jsxs("div",{className:"mb-6",children:[p.jsx("div",{className:"flex items-center gap-2 mb-1",children:p.jsxs("span",{className:"inline-flex items-center gap-1 text-xs font-mono-accent tracking-widest text-purple-300 uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30",children:[p.jsx(Ms,{className:"w-3 h-3"})," The Gateway"]})}),p.jsx("h2",{className:"text-2xl md:text-3xl font-bold font-display tracking-tight text-white",children:s==="invite"?"Enter The Paradox":"Commission The Vanguard"}),p.jsx("p",{className:"text-sm text-slate-400 mt-1",children:s==="invite"?"Enter your invitation watermark code to unlock exclusive operative clearance.":"Direct intake for visionary founders, digital creators, and elite brands."})]}),p.jsxs("div",{className:"flex rounded-xl bg-black/40 p-1 mb-6 border border-white/10",children:[p.jsxs("button",{onClick:()=>l("invite"),className:`flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${s==="invite"?"bg-purple-600/40 text-white shadow-sm border border-purple-400/30":"text-slate-400 hover:text-slate-200"}`,children:[p.jsx(L1,{className:"w-4 h-4"})," Invitation Code"]}),p.jsxs("button",{onClick:()=>l("client"),className:`flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${s==="client"?"bg-purple-600/40 text-white shadow-sm border border-purple-400/30":"text-slate-400 hover:text-slate-200"}`,children:[p.jsx(Kv,{className:"w-4 h-4"})," Work With Us"]})]}),s==="invite"&&p.jsx("div",{children:h?p.jsxs("div",{className:"space-y-4 animate-scale-up",children:[p.jsxs("div",{className:"p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 flex items-start gap-3",children:[p.jsx(Yv,{className:"w-5 h-5 text-emerald-400 shrink-0 mt-0.5"}),p.jsxs("div",{children:[p.jsx("p",{className:"text-sm font-semibold",children:m}),p.jsx("p",{className:"text-xs text-emerald-300/80 mt-1",children:"Clearance level 4 granted. You are now connected to the Vanguard Core."})]})]}),p.jsxs("div",{className:"space-y-2",children:[p.jsx("h4",{className:"text-xs font-mono-accent text-slate-300 uppercase tracking-wider",children:"Unlocked Operative Perks:"}),p.jsxs("ul",{className:"text-xs text-slate-300 space-y-1.5",children:[p.jsxs("li",{className:"flex items-center gap-2",children:["✦ ",p.jsx("strong",{children:"Priority Client Queuing:"})," Guaranteed 48hr response for new projects."]}),p.jsxs("li",{className:"flex items-center gap-2",children:["✦ ",p.jsx("strong",{children:"Direct Vanguard Access:"})," Private Telegram / Discord war-room."]}),p.jsxs("li",{className:"flex items-center gap-2",children:["✦ ",p.jsx("strong",{children:"15% Invitation Credit:"})," Applied to your initial design & tech build."]})]})]}),p.jsxs("div",{className:"flex gap-3 pt-2",children:[p.jsx("button",{onClick:()=>l("client"),className:"flex-1 py-3 rounded-xl glass-button font-bold text-xs tracking-wider uppercase text-center cursor-pointer",children:"Claim VIP Project Slot"}),p.jsx("button",{onClick:t,className:"px-4 py-3 rounded-xl border border-white/20 text-xs text-slate-300 hover:bg-white/5 cursor-pointer",children:"Explore Void"})]})]}):p.jsxs("form",{onSubmit:U,className:"space-y-4",children:[p.jsxs("div",{children:[p.jsx("label",{className:"block text-xs font-mono-accent uppercase tracking-wider text-slate-300 mb-2",children:"Enter Watermark / Invitation Code"}),p.jsxs("div",{className:"relative",children:[p.jsx("input",{type:"text",value:u,onChange:T=>d(T.target.value.toUpperCase()),placeholder:"e.g. PARADOX, VOID2024, GENZ",className:"w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-purple-400/30 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-white placeholder-slate-500 font-mono-accent tracking-widest text-base",autoFocus:!0}),p.jsxs("button",{type:"submit",className:"absolute right-2 top-2 bottom-2 px-4 rounded-lg glass-button text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer",children:["Verify ",p.jsx(Qu,{className:"w-3.5 h-3.5"})]})]}),p.jsxs("p",{className:"text-[11px] text-slate-400 mt-2 flex items-center gap-1.5",children:[p.jsx(Ju,{className:"w-3.5 h-3.5 text-purple-400"}),"Redirected from an invitation? Any authentic code grants immediate access."]})]}),p.jsxs("div",{className:"p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 mt-4",children:[p.jsx("p",{className:"text-xs text-purple-200 font-medium mb-1",children:"Don't have a code yet?"}),p.jsxs("p",{className:"text-xs text-slate-400",children:["Switch to the ",p.jsx("button",{type:"button",onClick:()=>l("client"),className:"text-purple-300 underline font-semibold cursor-pointer",children:"Work With Us"})," tab to apply directly for VIP project slots."]})]})]})}),s==="client"&&p.jsx("div",{children:b?p.jsxs("div",{className:"space-y-4 animate-scale-up text-center py-4",children:[p.jsx("div",{className:"w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center mx-auto mb-2",children:p.jsx(Yv,{className:"w-6 h-6"})}),p.jsx("h3",{className:"text-xl font-bold font-display text-white",children:"Application Transmitted"}),p.jsxs("p",{className:"text-xs text-slate-300 max-w-sm mx-auto",children:["Your project dossier has been securely logged on the edge. Our directors will reach out to ",p.jsx("strong",{className:"text-purple-300",children:N.contact})," within 12 hours."]}),p.jsxs("div",{className:"p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between max-w-xs mx-auto",children:[p.jsxs("span",{className:"text-xs font-mono-accent text-slate-400",children:["Passcode: ",M]}),p.jsxs("button",{onClick:F,className:"text-xs flex items-center gap-1 text-purple-300 hover:text-white cursor-pointer",children:[x?p.jsx(Ba,{className:"w-3.5 h-3.5 text-emerald-400"}):p.jsx(zl,{className:"w-3.5 h-3.5"}),x?"Copied":"Copy"]})]}),p.jsx("button",{onClick:t,className:"px-6 py-2.5 rounded-xl border border-white/20 text-xs text-slate-300 hover:bg-white/10 cursor-pointer mt-2",children:"Return to Exploration"})]}):p.jsxs("form",{onSubmit:P,className:"space-y-3.5",children:[p.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[p.jsxs("div",{children:[p.jsx("label",{className:"block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1",children:"Your Name / Brand"}),p.jsx("input",{type:"text",required:!0,value:N.name,onChange:T=>S({...N,name:T.target.value}),placeholder:"e.g. Satoshi / Nova Studio",className:"w-full px-3.5 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"})]}),p.jsxs("div",{children:[p.jsx("label",{className:"block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1",children:"Contact (Discord / TG / Email)"}),p.jsx("input",{type:"text",required:!0,value:N.contact,onChange:T=>S({...N,contact:T.target.value}),placeholder:"@handle or email",className:"w-full px-3.5 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"})]})]}),p.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[p.jsxs("div",{children:[p.jsx("label",{className:"block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1",children:"What do you need built?"}),p.jsxs("select",{value:N.service,onChange:T=>S({...N,service:T.target.value}),className:"w-full px-3.5 py-2.5 rounded-lg bg-[#0e0a1f] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-slate-200 cursor-pointer",children:[p.jsx("option",{children:"Viral Landing Experience"}),p.jsx("option",{children:"Full-Stack Web App / Platform"}),p.jsx("option",{children:"Gen-Z Brand Identity & 3D"}),p.jsx("option",{children:"Cloudflare / Edge Deployment"})]})]}),p.jsxs("div",{children:[p.jsx("label",{className:"block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1",children:"Budget Range"}),p.jsxs("select",{value:N.budget,onChange:T=>S({...N,budget:T.target.value}),className:"w-full px-3.5 py-2.5 rounded-lg bg-[#0e0a1f] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-slate-200 cursor-pointer",children:[p.jsx("option",{children:"$2,500 - $5,000"}),p.jsx("option",{children:"$5,000 - $15,000"}),p.jsx("option",{children:"$15,000 - $50,000+"})]})]})]}),p.jsxs("div",{children:[p.jsx("label",{className:"block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1",children:"Project Vision / Goals"}),p.jsx("textarea",{rows:3,value:N.details,onChange:T=>S({...N,details:T.target.value}),placeholder:"Tell us what you want to achieve, timeline, and inspiration...",className:"w-full px-3.5 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"})]}),p.jsxs("button",{type:"submit",disabled:k,className:"w-full py-3 rounded-xl glass-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50",children:[p.jsx(Kv,{className:"w-4 h-4 text-purple-300"})," ",k?"Transmitting...":"Submit Application to Vanguard"]})]})})]})})}function G1({isOpen:o,onClose:t,onOpenGateway:i}){return o?p.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in",onClick:t,children:p.jsxs("div",{className:"relative w-full max-w-2xl rounded-2xl glass-card border border-purple-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] text-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto",onClick:s=>s.stopPropagation(),children:[p.jsx("button",{onClick:t,className:"absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors","aria-label":"Close",children:p.jsx(yo,{className:"w-5 h-5"})}),p.jsxs("div",{className:"mb-6",children:[p.jsx("span",{className:"text-xs font-mono-accent text-purple-400 tracking-widest uppercase",children:"The Manifesto"}),p.jsx("h2",{className:"text-2xl md:text-3xl font-bold font-display text-white mt-1",children:"Inside The Lunar Paradox"}),p.jsx("p",{className:"text-sm text-slate-400 mt-1",children:"Why ordinary digital presence fails the new generation—and how the Paradox changes everything."})]}),p.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:[p.jsxs("div",{className:"p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all",children:[p.jsx("div",{className:"w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3",children:p.jsx(_y,{className:"w-4 h-4"})}),p.jsx("h4",{className:"text-sm font-semibold text-white mb-1",children:"Edge Velocity"}),p.jsx("p",{className:"text-xs text-slate-400 leading-relaxed",children:"Hosted globally across 300+ edge locations. Sub-50ms latency ensures instant immersion."})]}),p.jsxs("div",{className:"p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all",children:[p.jsx("div",{className:"w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-3",children:p.jsx(hy,{className:"w-4 h-4"})}),p.jsx("h4",{className:"text-sm font-semibold text-white mb-1",children:"Dimensional UI"}),p.jsx("p",{className:"text-xs text-slate-400 leading-relaxed",children:"Synthesized liquid chrome physics and reactive glassmorphism tuned for Gen-Z attention spans."})]}),p.jsxs("div",{className:"p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all",children:[p.jsx("div",{className:"w-8 h-8 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center mb-3",children:p.jsx(By,{className:"w-4 h-4"})}),p.jsx("h4",{className:"text-sm font-semibold text-white mb-1",children:"High Conversion"}),p.jsx("p",{className:"text-xs text-slate-400 leading-relaxed",children:"Engineered funnel from invitation watermark directly to client signed contracts."})]})]}),p.jsxs("div",{className:"p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4",children:[p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx(Ju,{className:"w-6 h-6 text-purple-300 shrink-0"}),p.jsxs("div",{children:[p.jsx("p",{className:"text-xs font-semibold text-white",children:"Ready to commission your experience?"}),p.jsx("p",{className:"text-[11px] text-slate-400",children:"Exclusive client onboarding windows are currently open."})]})]}),p.jsxs("button",{onClick:()=>{t(),i("client")},className:"w-full md:w-auto px-5 py-2.5 rounded-xl glass-button font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shrink-0",children:["Apply for Access ",p.jsx(Qu,{className:"w-3.5 h-3.5 text-purple-300"})]})]})]})}):null}function Sp(o){const t=o.replace("#","");return t.length===3?[parseInt(t[0]+t[0],16),parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16)]:[parseInt(t.slice(0,2),16)||0,parseInt(t.slice(2,4),16)||0,parseInt(t.slice(4,6),16)||0]}function V1(o,t,i){const s=l=>Math.max(0,Math.min(255,Math.round(l)));return"#"+[o,t,i].map(l=>s(l).toString(16).padStart(2,"0")).join("")}function k1(o,t,i){o/=255,t/=255,i/=255;const s=Math.max(o,t,i),l=Math.min(o,t,i);let u,d,h=(s+l)/2;if(s===l)u=d=0;else{const g=s-l;switch(d=h>.5?g/(2-s-l):g/(s+l),s){case o:u=(t-i)/g+(t<i?6:0);break;case t:u=(i-o)/g+2;break;case i:u=(o-t)/g+4;break;default:u=0}u/=6}return[Math.round(u*360),Math.round(d*100),Math.round(h*100)]}function ra(o,t,i){o=(o%360+360)%360,t/=100,i/=100;const s=d=>(d+o/30)%12,l=t*Math.min(i,1-i),u=d=>i-l*Math.max(-1,Math.min(s(d)-3,Math.min(9-s(d),1)));return V1(u(0)*255,u(8)*255,u(4)*255)}function Qv(o,t,i){const[s,l,u]=[o,t,i].map(d=>(d/=255,d<=.03928?d/12.92:Math.pow((d+.055)/1.055,2.4)));return .2126*s+.7152*l+.0722*u}function j1(o,t){try{const[i,s,l]=Sp(o),[u,d,h]=Sp(t),g=Qv(i,s,l),m=Qv(u,d,h),y=Math.max(g,m),x=Math.min(g,m);return((y+.05)/(x+.05)).toFixed(2)}catch{return"1.00"}}function X1(o){const[t,i,s]=Sp(o),[l,u,d]=k1(t,i,s);return{base:o,complementary:ra(l+180,u,d),analogousLeft:ra(l-30,u,d),analogousRight:ra(l+30,u,d),triadic1:ra(l+120,u,d),triadic2:ra(l+240,u,d),monochrome:[ra(l,Math.max(10,u*.7),92),ra(l,u,70),ra(l,u,50),ra(l,u,30),ra(l,Math.min(100,u*1.2),12)]}}function W1(o){if(!o||!o.trim())return"";let t=o;return t=t.replace(/<\?xml[\s\S]*?\?>/gi,""),t=t.replace(/<!DOCTYPE[\s\S]*?>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/xmlns:sketch="[^"]*"/gi,""),t=t.replace(/xmlns:inkscape="[^"]*"/gi,""),t=t.replace(/xmlns:sodipodi="[^"]*"/gi,""),t=t.replace(/xmlns:i="[^"]*"/gi,""),t=t.replace(/sodipodi:[a-z0-9-]+="[^"]*"/gi,""),t=t.replace(/inkscape:[a-z0-9-]+="[^"]*"/gi,""),t=t.replace(/sketch:[a-z0-9-]+="[^"]*"/gi,""),t=t.replace(/\s+(id|class)=""/gi,""),t=t.replace(/>\s+</g,"><"),t=t.replace(/\s{2,}/g," "),t.trim()}function q1(o){return o?o.replace(/class=/g,"className=").replace(/clip-path=/g,"clipPath=").replace(/fill-rule=/g,"fillRule=").replace(/stroke-width=/g,"strokeWidth=").replace(/stroke-linecap=/g,"strokeLinecap=").replace(/stroke-linejoin=/g,"strokeLinejoin=").replace(/stroke-miterlimit=/g,"strokeMiterlimit=").replace(/stop-color=/g,"stopColor=").replace(/stop-opacity=/g,"stopOpacity=").replace(/xlink:href=/g,"xlinkHref="):""}function Y1({isOpen:o,onClose:t,initialSector:i="studio"}){const[s,l]=Pe.useState(i),[u,d]=Pe.useState(!0),[h,g]=Pe.useState(21);Pe.useEffect(()=>{const y=setInterval(()=>{g(17+Math.floor(Math.random()*6))},4500);return()=>clearInterval(y)},[]),Pe.useEffect(()=>{if(!o)return;const y=x=>{x.key==="Escape"?t():x.key==="1"&&!["INPUT","TEXTAREA"].includes(x.target.tagName)?m("studio",0):x.key==="2"&&!["INPUT","TEXTAREA"].includes(x.target.tagName)?m("forge",1):x.key==="3"&&!["INPUT","TEXTAREA"].includes(x.target.tagName)?m("labs",2):x.key==="4"&&!["INPUT","TEXTAREA"].includes(x.target.tagName)&&m("vault",3)};return window.addEventListener("keydown",y),()=>window.removeEventListener("keydown",y)},[o]);const m=(y,x)=>{l(y),u&&cn.playSectorShift(x)};return o?p.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-3xl animate-fade-in select-none",onClick:t,children:p.jsxs("div",{className:"relative w-full max-w-6xl h-[94vh] max-h-[920px] rounded-3xl bg-[#0c0c10]/90 backdrop-blur-3xl border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] flex flex-col overflow-hidden text-[#f5f5f7]",onClick:y=>y.stopPropagation(),children:[p.jsxs("header",{className:"flex-shrink-0 px-4 sm:px-6 py-3 border-b border-white/[0.07] bg-[#121216]/60 backdrop-blur-2xl flex flex-wrap items-center justify-between gap-3",children:[p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsxs("div",{className:"flex items-center gap-1.5 pr-2 border-r border-white/[0.08]",children:[p.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 cursor-pointer hover:opacity-100 transition-opacity",onClick:t}),p.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"}),p.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-[#27c93f]/80"})]}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsx("span",{className:"font-heading font-semibold text-xs tracking-wider text-white",children:"LUNAR PARADOX"}),p.jsx("span",{className:"text-[10px] font-mono text-[#86868b]",children:"OS 2.6"})]}),p.jsxs("div",{className:"hidden lg:flex items-center gap-2 pl-3 border-l border-white/[0.08] text-[10px] font-mono text-[#86868b]",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse"}),p.jsxs("span",{children:[h,"ms EDGE"]})]})]}),p.jsx("nav",{className:"flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl",children:[{id:"studio",label:"Studio",key:"1"},{id:"forge",label:"Forge",key:"2"},{id:"labs",label:"Labs",key:"3"},{id:"vault",label:"Vault",key:"4"}].map((y,x)=>{const v=s===y.id;return p.jsxs("button",{onClick:()=>m(y.id,x),className:`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-heading font-medium tracking-normal transition-all cursor-pointer whitespace-nowrap ${v?"bg-white text-black shadow-sm font-semibold":"text-[#86868b] hover:text-white hover:bg-white/[0.04]"}`,children:[p.jsx("span",{children:y.label}),p.jsx("span",{className:`hidden md:inline-block text-[9px] px-1 rounded ${v?"bg-black/10 text-black":"text-[#6e6e73]"}`,children:y.key})]},y.id)})}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsx("button",{onClick:()=>{const y=!u;d(y),y&&cn.playTick()},className:"p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors border border-white/[0.08] cursor-pointer",title:u?"Acoustics Active":"Acoustics Muted","aria-label":"Sound Toggle",children:u?p.jsx(Oy,{className:"w-3.5 h-3.5 text-white"}):p.jsx(yp,{className:"w-3.5 h-3.5"})}),p.jsxs("button",{onClick:t,className:"flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors border border-white/[0.08] cursor-pointer text-[10px] font-mono","aria-label":"Close",children:[p.jsx(yo,{className:"w-3 h-3"}),p.jsx("span",{className:"hidden sm:inline",children:"esc"})]})]})]}),p.jsxs("main",{className:"flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8",children:[s==="studio"&&p.jsx(Z1,{soundEnabled:u}),s==="forge"&&p.jsx(K1,{soundEnabled:u}),s==="labs"&&p.jsx(eE,{soundEnabled:u}),s==="vault"&&p.jsx(tE,{soundEnabled:u,onOpenStudio:()=>m("studio",0)})]})]})}):null}function Z1({soundEnabled:o}){const[t,i]=Pe.useState(["3d_spatial","fullstack_app"]),[s,l]=Pe.useState("flagship"),[u,d]=Pe.useState({name:"",contact:"",overview:""}),[h,g]=Pe.useState(!1),[m,y]=Pe.useState("LPX-CLNT-9821"),[x,v]=Pe.useState(!1),[M,A]=Pe.useState(!1),N=[{id:"3d_spatial",title:"3D WebGL & Spatial Experience",basePrice:12e3,desc:"Real-time shaders, liquid chrome optics, 120 FPS performance"},{id:"fullstack_app",title:"High-Performance Web Platform",basePrice:9500,desc:"React 19, TypeScript, Edge API microservices, sub-50ms latency"},{id:"design_system",title:"Avant-Garde Design System",basePrice:6500,desc:"Design tokens, dark titanium materials, fluid typography scales"},{id:"edge_infra",title:"Sub-50ms Global Infrastructure",basePrice:4500,desc:"Cloudflare Workers, zero cold-start edge databases, global CDN"},{id:"ai_interactive",title:"Generative AI & Audio Synthesis",basePrice:8e3,desc:"Client-side procedural audio, real-time generative interfaces"}],S=[{id:"sprint",label:"2-Week Sprint",multiplier:1.25,time:"10–14 Days",desc:"Accelerated delivery"},{id:"flagship",label:"Flagship Build",multiplier:1,time:"4–6 Weeks",desc:"Custom craftsmanship"},{id:"retainer",label:"Quarterly Retainer",multiplier:.85,time:"Continuous",desc:"Dedicated engineering"}],b=Pe.useMemo(()=>{var F,T;let R=5e3;t.forEach(I=>{const j=N.find(W=>W.id===I);j&&(R+=j.basePrice)});const U=((F=S.find(I=>I.id===s))==null?void 0:F.multiplier)||1,P=Math.round(R*U);return{min:(P*.9).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}),max:(P*1.15).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}),time:((T=S.find(I=>I.id===s))==null?void 0:T.time)||"4–6 Weeks"}},[t,s]),L=R=>{o&&cn.playTick(),i(U=>U.includes(R)?U.length>1?U.filter(P=>P!==R):U:[...U,R])},k=async R=>{if(R.preventDefault(),!!u.contact.trim()){v(!0),o&&cn.playSuccess();try{const U={name:u.name,contact:u.contact,overview:u.overview,scopes:t,velocity:s,estimateRange:`${b.min} - ${b.max}`};await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(U)})}catch(U){console.log("Lead queued:",U)}finally{const U=`LPX-PRO-${Math.floor(1e3+Math.random()*9e3)}`;y(U),v(!1),g(!0),mm({particleCount:70,spread:50,origin:{y:.6}})}}};return p.jsxs("div",{className:"max-w-5xl mx-auto space-y-8 animate-fade-in",children:[p.jsxs("div",{className:"border-b border-white/[0.08] pb-6",children:[p.jsx("span",{className:"text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1",children:"LUNAR STUDIO // BESPOKE DIGITAL COMMISSION"}),p.jsx("h2",{className:"text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight",children:"Bespoke Creative Engineering"}),p.jsx("p",{className:"text-sm text-[#86868b] mt-2 max-w-2xl leading-relaxed",children:"We design and build category-defining spatial web flagships, 3D applications, and edge platforms for founders and brands that value technical excellence."})]}),h?p.jsxs("div",{className:"p-8 rounded-3xl bg-white/[0.04] border border-white/[0.1] text-center space-y-4 max-w-lg mx-auto shadow-2xl",children:[p.jsx("div",{className:"w-14 h-14 rounded-full bg-white text-black mx-auto flex items-center justify-center",children:p.jsx(Ba,{className:"w-7 h-7 stroke-[2.5]"})}),p.jsx("h3",{className:"text-2xl font-heading font-semibold text-white",children:"Project Brief Transmitted"}),p.jsx("p",{className:"text-xs text-[#86868b] leading-relaxed",children:"Your project parameters have been received. Our founding design partners will follow up with you directly within 12 hours."}),p.jsxs("div",{className:"p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] flex items-center justify-between text-xs font-mono",children:[p.jsx("span",{className:"text-[#86868b]",children:"TRACKING PASSCODE:"}),p.jsx("span",{className:"text-white font-semibold",children:m}),p.jsx("button",{onClick:()=>{navigator.clipboard.writeText(m),A(!0),setTimeout(()=>A(!1),2e3)},className:"text-[#86868b] hover:text-white ml-2 cursor-pointer",children:M?p.jsx(Ba,{className:"w-4 h-4 text-emerald-400"}):p.jsx(zl,{className:"w-4 h-4"})})]}),p.jsx("button",{onClick:()=>g(!1),className:"text-xs text-[#86868b] hover:text-white hover:underline pt-2 cursor-pointer transition-colors",children:"Configure another scope"})]}):p.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8",children:[p.jsxs("div",{className:"lg:col-span-7 space-y-6",children:[p.jsxs("div",{children:[p.jsx("label",{className:"text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider block mb-3",children:"1. Project Capabilities"}),p.jsx("div",{className:"space-y-2",children:N.map(R=>{const U=t.includes(R.id);return p.jsxs("div",{onClick:()=>L(R.id),className:`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${U?"bg-white/[0.08] border-white/[0.2] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]":"bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"}`,children:[p.jsxs("div",{className:"flex items-center gap-3.5",children:[p.jsx("div",{className:`w-5 h-5 rounded-full flex items-center justify-center transition-all ${U?"bg-white text-black":"border border-white/25"}`,children:U&&p.jsx(Ba,{className:"w-3 h-3 stroke-[3]"})}),p.jsxs("div",{children:[p.jsx("div",{className:"text-xs sm:text-sm font-heading font-medium text-white",children:R.title}),p.jsx("div",{className:"text-[11px] text-[#86868b] mt-0.5",children:R.desc})]})]}),p.jsxs("span",{className:"text-[11px] font-mono text-[#86868b] whitespace-nowrap",children:["+$",(R.basePrice/1e3).toFixed(1),"k"]})]},R.id)})})]}),p.jsxs("div",{children:[p.jsx("label",{className:"text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider block mb-3",children:"2. Timeline Velocity"}),p.jsx("div",{className:"grid grid-cols-3 gap-2.5",children:S.map(R=>p.jsxs("button",{type:"button",onClick:()=>{l(R.id),o&&cn.playTick()},className:`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${s===R.id?"bg-white/[0.08] border-white/[0.22] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]":"bg-white/[0.02] border-white/[0.06] text-[#86868b] hover:text-white hover:bg-white/[0.04]"}`,children:[p.jsx("div",{className:"text-xs font-heading font-semibold text-white",children:R.label}),p.jsx("div",{className:"text-[10px] text-[#86868b] font-mono mt-0.5",children:R.time})]},R.id))})]})]}),p.jsxs("div",{className:"lg:col-span-5 space-y-6",children:[p.jsxs("div",{className:"p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] space-y-4",children:[p.jsxs("div",{className:"flex items-center justify-between text-xs font-mono text-[#86868b]",children:[p.jsx("span",{children:"ESTIMATED INVESTMENT"}),p.jsxs("span",{className:"text-[#30d158] flex items-center gap-1.5",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-[#30d158]"}),"REAL-TIME"]})]}),p.jsxs("div",{className:"text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight",children:[b.min," ",p.jsx("span",{className:"text-lg font-normal text-[#6e6e73]",children:"–"})," ",b.max]}),p.jsxs("div",{className:"flex items-center justify-between text-xs font-mono pt-3 border-t border-white/[0.08] text-[#86868b]",children:[p.jsx("span",{children:"ESTIMATED DURATION:"}),p.jsx("span",{className:"text-white font-medium",children:b.time})]})]}),p.jsxs("form",{onSubmit:k,className:"p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-3.5",children:[p.jsx("div",{className:"text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider",children:"Direct Client Transmission"}),p.jsx("div",{children:p.jsx("input",{type:"text",placeholder:"Your Name / Organization",value:u.name,onChange:R=>d({...u,name:R.target.value}),className:"w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30 transition-colors"})}),p.jsx("div",{children:p.jsx("input",{type:"text",required:!0,placeholder:"Contact (Email, Discord, or Telegram) *",value:u.contact,onChange:R=>d({...u,contact:R.target.value}),className:"w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30 transition-colors"})}),p.jsx("div",{children:p.jsx("textarea",{rows:3,placeholder:"Tell us about the project goals...",value:u.overview,onChange:R=>d({...u,overview:R.target.value}),className:"w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30 transition-colors resize-none"})}),p.jsx("button",{type:"submit",disabled:x,className:"w-full py-3.5 rounded-full apple-action-btn text-xs font-heading font-semibold tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center gap-2",children:x?p.jsx(z1,{className:"w-4 h-4 animate-spin text-black"}):p.jsxs(p.Fragment,{children:[p.jsx("span",{children:"Transmit Project Brief"}),p.jsx(Qu,{className:"w-3.5 h-3.5 text-black"})]})})]})]})]})]})}function K1({soundEnabled:o}){const[t,i]=Pe.useState("chroma");return p.jsxs("div",{className:"max-w-5xl mx-auto space-y-6 animate-fade-in",children:[p.jsxs("div",{className:"border-b border-white/[0.08] pb-5 flex flex-wrap items-center justify-between gap-4",children:[p.jsxs("div",{children:[p.jsx("span",{className:"text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1",children:"LUNAR FORGE // DEVELOPER LABORATORY"}),p.jsx("h2",{className:"text-3xl font-heading font-semibold text-white tracking-tight",children:"Developer & Design Instruments"}),p.jsx("p",{className:"text-xs sm:text-sm text-[#86868b] mt-1",children:"Pure client-side utilities. Zero tracking. Computed instantaneously on hardware."})]}),p.jsx("div",{className:"flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]",children:[{id:"chroma",label:"Color Theory & WCAG",icon:I1},{id:"svg",label:"SVG Minifier",icon:ly},{id:"clamp",label:"Fluid Clamp()",icon:B1}].map(s=>{const l=s.icon,u=t===s.id;return p.jsxs("button",{onClick:()=>{i(s.id),o&&cn.playTick()},className:`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading transition-all cursor-pointer ${u?"bg-white text-black font-semibold shadow-sm":"text-[#86868b] hover:text-white"}`,children:[p.jsx(l,{className:"w-3.5 h-3.5"}),p.jsx("span",{children:s.label})]},s.id)})})]}),t==="chroma"&&p.jsx(Q1,{soundEnabled:o}),t==="svg"&&p.jsx(J1,{soundEnabled:o}),t==="clamp"&&p.jsx($1,{soundEnabled:o})]})}function Q1({soundEnabled:o}){const[t,i]=Pe.useState("#0071e3"),[s,l]=Pe.useState("#000000"),[u,d]=Pe.useState(null),h=Pe.useMemo(()=>X1(t),[t]),g=Pe.useMemo(()=>j1(t,s),[t,s]),m=parseFloat(g)>=7,y=parseFloat(g)>=4.5,x=parseFloat(g)>=3,v=[{name:"System Blue",hex:"#0071e3"},{name:"Indigo",hex:"#5e5ce6"},{name:"Purple",hex:"#bf5af2"},{name:"Pink",hex:"#ff375f"},{name:"Orange",hex:"#ff9f0a"},{name:"Mint",hex:"#63e6e2"},{name:"Green",hex:"#30d158"},{name:"Starlight Silver",hex:"#e5e5ea"}],M=(A,N)=>{navigator.clipboard.writeText(A),d(N),o&&cn.playSuccess(),setTimeout(()=>d(null),2e3)};return p.jsxs("div",{className:"space-y-6",children:[p.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[p.jsxs("div",{className:"lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4",children:[p.jsx("div",{className:"text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider",children:"Chromatic Input & Luminance"}),p.jsxs("div",{className:"space-y-3.5",children:[p.jsxs("div",{children:[p.jsx("label",{className:"text-xs text-[#86868b] block mb-1.5",children:"Dominant Subject Hex"}),p.jsxs("div",{className:"flex items-center gap-2.5",children:[p.jsx("input",{type:"color",value:t,onChange:A=>i(A.target.value),className:"w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"}),p.jsx("input",{type:"text",value:t,onChange:A=>i(A.target.value),className:"flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-white/30"})]})]}),p.jsxs("div",{children:[p.jsx("label",{className:"text-xs text-[#86868b] block mb-1.5",children:"Background Canvas Hex"}),p.jsxs("div",{className:"flex items-center gap-2.5",children:[p.jsx("input",{type:"color",value:s,onChange:A=>l(A.target.value),className:"w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"}),p.jsx("input",{type:"text",value:s,onChange:A=>l(A.target.value),className:"flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-white/30"})]})]})]}),p.jsxs("div",{className:"pt-3 border-t border-white/[0.08]",children:[p.jsx("span",{className:"text-[10px] font-mono text-[#86868b] block mb-2",children:"APPLE SYSTEM HUES:"}),p.jsx("div",{className:"flex flex-wrap gap-2",children:v.map(A=>p.jsxs("button",{onClick:()=>{i(A.hex),o&&cn.playTick()},className:"flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-xs text-[#f5f5f7] border border-white/[0.06] cursor-pointer transition-all",children:[p.jsx("span",{className:"w-2.5 h-2.5 rounded-full",style:{backgroundColor:A.hex}}),p.jsx("span",{className:"text-[11px]",children:A.name})]},A.name))})]})]}),p.jsxs("div",{className:"lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between space-y-4",children:[p.jsxs("div",{children:[p.jsxs("div",{className:"flex items-center justify-between text-xs font-mono text-[#86868b]",children:[p.jsx("span",{children:"WCAG CONTRAST COMPLIANCE"}),p.jsxs("span",{className:"font-semibold text-white",children:[g," : 1"]})]}),p.jsxs("div",{className:"text-4xl sm:text-5xl font-heading font-semibold text-white tracking-tight mt-1",children:[g,":1"]}),p.jsxs("div",{className:"grid grid-cols-3 gap-2 mt-4",children:[p.jsxs("div",{className:`p-2.5 rounded-2xl text-center border ${m?"bg-[#30d158]/10 border-[#30d158]/30 text-[#30d158]":"bg-[#ff453a]/10 border-[#ff453a]/30 text-[#ff453a]"}`,children:[p.jsx("div",{className:"text-[10px] font-mono font-bold",children:"AAA"}),p.jsx("div",{className:"text-[9px] mt-0.5",children:m?"PASS (7.0+)":"FAIL"})]}),p.jsxs("div",{className:`p-2.5 rounded-2xl text-center border ${y?"bg-[#30d158]/10 border-[#30d158]/30 text-[#30d158]":"bg-[#ff453a]/10 border-[#ff453a]/30 text-[#ff453a]"}`,children:[p.jsx("div",{className:"text-[10px] font-mono font-bold",children:"AA NORMAL"}),p.jsx("div",{className:"text-[9px] mt-0.5",children:y?"PASS (4.5+)":"FAIL"})]}),p.jsxs("div",{className:`p-2.5 rounded-2xl text-center border ${x?"bg-[#30d158]/10 border-[#30d158]/30 text-[#30d158]":"bg-[#ff453a]/10 border-[#ff453a]/30 text-[#ff453a]"}`,children:[p.jsx("div",{className:"text-[10px] font-mono font-bold",children:"AA LARGE"}),p.jsx("div",{className:"text-[9px] mt-0.5",children:x?"PASS (3.0+)":"FAIL"})]})]})]}),p.jsxs("div",{className:"p-4 rounded-2xl border border-white/[0.08]",style:{backgroundColor:s,color:t},children:[p.jsx("div",{className:"text-sm font-heading font-semibold",children:"Human Interface Typography Sample"}),p.jsx("div",{className:"text-xs opacity-80 mt-0.5",children:"Testing perceived contrast and optical sharpness against pure canvas black."})]})]})]}),p.jsxs("div",{className:"p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4",children:[p.jsxs("div",{className:"flex items-center justify-between",children:[p.jsxs("div",{children:[p.jsx("div",{className:"text-xs font-heading font-medium text-white",children:"Derived Chromatic Harmonies (Color Wheel Equations)"}),p.jsx("div",{className:"text-[11px] text-[#86868b]",children:"Calculated using mathematical hue rotations across 360° HSL chromatic space."})]}),p.jsxs("button",{onClick:()=>M(`:root {
  --color-base: ${h.base};
  --color-complement: ${h.complementary};
  --color-analog-1: ${h.analogousLeft};
  --color-analog-2: ${h.analogousRight};
  --color-triad-1: ${h.triadic1};
  --color-triad-2: ${h.triadic2};
}`,"css"),className:"px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-white border border-white/[0.08] cursor-pointer flex items-center gap-1.5",children:[u==="css"?p.jsx(Ba,{className:"w-3.5 h-3.5 text-emerald-400"}):p.jsx(zl,{className:"w-3.5 h-3.5"}),p.jsx("span",{children:"COPY HARMONY TOKENS"})]})]}),p.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2",children:[p.jsxs("div",{onClick:()=>{i(h.complementary),o&&cn.playTick()},className:"p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40",children:[p.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[p.jsx("span",{className:"w-4 h-4 rounded-full",style:{backgroundColor:h.complementary}}),p.jsx("span",{className:"text-[10px] font-mono text-[#86868b]",children:"180° COMPLEMENT"})]}),p.jsx("div",{className:"text-xs font-mono font-medium text-white",children:h.complementary})]}),p.jsxs("div",{onClick:()=>{i(h.analogousLeft),o&&cn.playTick()},className:"p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40",children:[p.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[p.jsx("span",{className:"w-4 h-4 rounded-full",style:{backgroundColor:h.analogousLeft}}),p.jsx("span",{className:"text-[10px] font-mono text-[#86868b]",children:"-30° ANALOGOUS"})]}),p.jsx("div",{className:"text-xs font-mono font-medium text-white",children:h.analogousLeft})]}),p.jsxs("div",{onClick:()=>{i(h.analogousRight),o&&cn.playTick()},className:"p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40",children:[p.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[p.jsx("span",{className:"w-4 h-4 rounded-full",style:{backgroundColor:h.analogousRight}}),p.jsx("span",{className:"text-[10px] font-mono text-[#86868b]",children:"+30° ANALOGOUS"})]}),p.jsx("div",{className:"text-xs font-mono font-medium text-white",children:h.analogousRight})]}),p.jsxs("div",{onClick:()=>{i(h.triadic1),o&&cn.playTick()},className:"p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40",children:[p.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[p.jsx("span",{className:"w-4 h-4 rounded-full",style:{backgroundColor:h.triadic1}}),p.jsx("span",{className:"text-[10px] font-mono text-[#86868b]",children:"120° TRIADIC"})]}),p.jsx("div",{className:"text-xs font-mono font-medium text-white",children:h.triadic1})]})]}),p.jsxs("div",{className:"pt-2",children:[p.jsx("div",{className:"text-[10px] font-mono text-[#86868b] mb-1.5",children:"5-STOP MONOCHROMATIC LUMA SCALE:"}),p.jsx("div",{className:"grid grid-cols-5 h-8 rounded-xl overflow-hidden border border-white/[0.08]",children:h.monochrome.map((A,N)=>p.jsx("div",{style:{backgroundColor:A},className:"cursor-pointer flex items-center justify-center group",onClick:()=>{i(A),o&&cn.playTick()},title:`Select ${A}`,children:p.jsx("span",{className:"text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-black font-bold",children:A})},N))})]})]})]})}function J1({soundEnabled:o}){const t=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" viewBox="0 0 100 100" class="hero-logo" id="lunar-icon">
  <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch -->
  <title>Lunar Eclipse Badge</title>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#86868b" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="40" fill="url(#grad1)" stroke="#ffffff" stroke-width="1.5" />
  <path d="M 50 15 A 35 35 0 0 0 50 85 A 25 25 0 0 1 50 15 Z" fill="#0c0c10" opacity="0.85" />
</svg>`,[i,s]=Pe.useState(t),[l,u]=Pe.useState(null),d=Pe.useMemo(()=>W1(i),[i]),h=Pe.useMemo(()=>q1(d),[d]),g=new Blob([i]).size,m=new Blob([d]).size,y=g>0?Math.round((g-m)/g*100):0,x=(v,M)=>{navigator.clipboard.writeText(v),u(M),o&&cn.playSuccess(),setTimeout(()=>u(null),2e3)};return p.jsxs("div",{className:"space-y-4",children:[p.jsxs("div",{className:"p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono",children:[p.jsxs("div",{className:"flex items-center gap-4",children:[p.jsxs("span",{className:"text-[#86868b]",children:["INPUT: ",p.jsxs("strong",{className:"text-white",children:[g," B"]})]}),p.jsxs("span",{className:"text-[#86868b]",children:["OPTIMIZED: ",p.jsxs("strong",{className:"text-white",children:[m," B"]})]}),p.jsxs("span",{className:"text-[#30d158] font-semibold",children:["REDUCTION: ",y>0?`-${y}%`:"0%"]})]}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsxs("button",{onClick:()=>x(d,"svg"),className:"px-3.5 py-1.5 rounded-full bg-white text-black font-heading font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:bg-[#e5e5ea]",children:[l==="svg"?p.jsx(Ba,{className:"w-3.5 h-3.5"}):p.jsx(zl,{className:"w-3.5 h-3.5"}),p.jsx("span",{children:"Copy Clean SVG"})]}),p.jsxs("button",{onClick:()=>x(h,"jsx"),className:"px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-heading font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-white/[0.08]",children:[l==="jsx"?p.jsx(Ba,{className:"w-3.5 h-3.5"}):p.jsx(ly,{className:"w-3.5 h-3.5"}),p.jsx("span",{children:"Copy React JSX"})]})]})]}),p.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[p.jsxs("div",{className:"space-y-1.5",children:[p.jsxs("div",{className:"flex items-center justify-between text-[11px] font-mono text-[#86868b]",children:[p.jsx("span",{children:"RAW SVG INPUT"}),p.jsx("button",{onClick:()=>s(t),className:"text-white hover:underline cursor-pointer",children:"Reset"})]}),p.jsx("textarea",{value:i,onChange:v=>s(v.target.value),className:"w-full h-64 p-3.5 rounded-2xl bg-[#08080c] border border-white/[0.08] text-xs font-mono text-[#f5f5f7] focus:outline-none focus:border-white/30 resize-none custom-scrollbar",placeholder:"Paste raw SVG code..."})]}),p.jsxs("div",{className:"space-y-1.5",children:[p.jsxs("div",{className:"flex items-center justify-between text-[11px] font-mono text-[#86868b]",children:[p.jsx("span",{children:"OUTPUT PREVIEW"}),p.jsx("span",{className:"text-[#30d158]",children:"CLIENT RUNTIME"})]}),p.jsxs("div",{className:"h-64 rounded-2xl bg-[#08080c] border border-white/[0.08] flex flex-col overflow-hidden",children:[p.jsx("div",{className:"h-28 bg-[#101014] border-b border-white/[0.08] flex items-center justify-center p-3",children:d?p.jsx("div",{className:"w-20 h-20 flex items-center justify-center",dangerouslySetInnerHTML:{__html:d}}):p.jsx("span",{className:"text-xs text-[#6e6e73] font-mono",children:"No valid SVG"})}),p.jsx("textarea",{readOnly:!0,value:d,className:"flex-1 p-3.5 bg-transparent text-xs font-mono text-[#86868b] focus:outline-none resize-none custom-scrollbar"})]})]})]})]})}function $1({soundEnabled:o}){const[t,i]=Pe.useState(390),[s,l]=Pe.useState(1440),[u,d]=Pe.useState(16),[h,g]=Pe.useState(48),[m,y]=Pe.useState(800),[x,v]=Pe.useState(!1),M=Pe.useMemo(()=>{const N=(h-u)/(s-t),S=-t*N+u,b=(N*100).toFixed(2),L=(S/16).toFixed(3),k=(u/16).toFixed(3),R=(h/16).toFixed(3);return`clamp(${k}rem, ${L}rem + ${b}vw, ${R}rem)`},[t,s,u,h]),A=Pe.useMemo(()=>{if(m<=t)return u;if(m>=s)return h;const N=(m-t)/(s-t);return Math.round(u+N*(h-u))},[t,s,u,h,m]);return p.jsx("div",{className:"space-y-6",children:p.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[p.jsxs("div",{className:"p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4",children:[p.jsx("div",{className:"text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider",children:"Screen & Typographic Boundaries"}),p.jsxs("div",{className:"space-y-4",children:[p.jsxs("div",{children:[p.jsxs("div",{className:"flex justify-between text-xs text-[#86868b] mb-1",children:[p.jsx("span",{children:"Minimum Viewport (Mobile)"}),p.jsxs("span",{className:"font-mono text-white font-medium",children:[t,"px"]})]}),p.jsx("input",{type:"range",min:"320",max:"600",value:t,onChange:N=>i(Number(N.target.value)),className:"w-full accent-white cursor-pointer"})]}),p.jsxs("div",{children:[p.jsxs("div",{className:"flex justify-between text-xs text-[#86868b] mb-1",children:[p.jsx("span",{children:"Maximum Viewport (Desktop)"}),p.jsxs("span",{className:"font-mono text-white font-medium",children:[s,"px"]})]}),p.jsx("input",{type:"range",min:"1024",max:"1920",value:s,onChange:N=>l(Number(N.target.value)),className:"w-full accent-white cursor-pointer"})]}),p.jsxs("div",{children:[p.jsxs("div",{className:"flex justify-between text-xs text-[#86868b] mb-1",children:[p.jsx("span",{children:"Min Size"}),p.jsxs("span",{className:"font-mono text-white font-medium",children:[u,"px"]})]}),p.jsx("input",{type:"range",min:"12",max:"32",value:u,onChange:N=>d(Number(N.target.value)),className:"w-full accent-white cursor-pointer"})]}),p.jsxs("div",{children:[p.jsxs("div",{className:"flex justify-between text-xs text-[#86868b] mb-1",children:[p.jsx("span",{children:"Max Size"}),p.jsxs("span",{className:"font-mono text-white font-medium",children:[h,"px"]})]}),p.jsx("input",{type:"range",min:"24",max:"96",value:h,onChange:N=>g(Number(N.target.value)),className:"w-full accent-white cursor-pointer"})]})]})]}),p.jsxs("div",{className:"p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4 flex flex-col justify-between",children:[p.jsxs("div",{children:[p.jsx("div",{className:"text-xs font-mono text-[#86868b] mb-1",children:"GENERATED CSS CLAMP()"}),p.jsxs("div",{className:"p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-white break-all select-all",children:["font-size: ",M,";"]}),p.jsxs("div",{className:"mt-5 space-y-2",children:[p.jsxs("div",{className:"flex justify-between text-xs font-mono text-[#86868b]",children:[p.jsx("span",{children:"SIMULATED VIEWPORT:"}),p.jsxs("span",{className:"text-[#30d158] font-semibold",children:[m,"px (Font: ",A,"px)"]})]}),p.jsx("input",{type:"range",min:"320",max:"1920",value:m,onChange:N=>y(Number(N.target.value)),className:"w-full accent-white cursor-pointer"})]})]}),p.jsx("div",{className:"p-5 rounded-2xl bg-[#08080c] border border-white/[0.08] overflow-hidden flex items-center justify-center min-h-[110px]",children:p.jsx("div",{className:"font-heading font-semibold text-white text-center transition-all leading-tight",style:{fontSize:`${A}px`},children:"LUNAR PARADOX"})}),p.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`font-size: ${M};`),v(!0),o&&cn.playSuccess(),setTimeout(()=>v(!1),2e3)},className:"w-full py-3 rounded-full bg-white text-black font-heading font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer hover:bg-[#e5e5ea] flex items-center justify-center gap-1.5",children:[x?p.jsx(Ba,{className:"w-3.5 h-3.5"}):p.jsx(zl,{className:"w-3.5 h-3.5"}),p.jsx("span",{children:"Copy Clamp() CSS"})]})]})]})})}function eE({soundEnabled:o}){const[t,i]=Pe.useState(""),[s,l]=Pe.useState(!1),[u,d]=Pe.useState(342),h=[{id:"shader_studio",name:"Lunar Shader Studio",tag:"WEBGPU / WEBGL",status:"Private Beta",desc:"Node-based visual shader synthesizer for web engineers. Export directly to React Three Fiber or raw WGSL.",features:["Real-time raymarching nodes","Procedural lunar noise maps","Zero-dependency bundle output"]},{id:"spatial_audio",name:"Spatial Audio Engine",tag:"WEB AUDIO API",status:"Developer Preview",desc:"Sub-millisecond procedural soundscapes and micro-acoustics. Zero external audio file download overhead.",features:["Synthesized haptic clicks","Spatial room acoustics","Hardware-timed scheduling"]},{id:"quantum_tokens",name:"Quantum Design System",tag:"CSS / TAILWIND",status:"Open Access",desc:"Human Interface design system engineered with variable typography, fluid clamp() scales, and optical materials.",features:["Tailwind v4 ready","WCAG AAA contrast modes","VisionOS frosted materials"]}],g=m=>{m.preventDefault(),t.trim()&&(o&&cn.playSuccess(),d(Math.floor(180+Math.random()*300)),l(!0),mm({particleCount:70,spread:50,origin:{y:.6}}))};return p.jsxs("div",{className:"max-w-5xl mx-auto space-y-8 animate-fade-in",children:[p.jsxs("div",{className:"border-b border-white/[0.08] pb-6",children:[p.jsx("span",{className:"text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1",children:"LUNAR LABS // SOFTWARE SUITE"}),p.jsx("h2",{className:"text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight",children:"Tools for Creative Engineers"}),p.jsx("p",{className:"text-sm text-[#86868b] mt-2 max-w-2xl leading-relaxed",children:"We develop proprietary software and developer toolkits engineered to empower spatial designers and web technologists."})]}),p.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:h.map(m=>p.jsxs("div",{className:"p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between",children:[p.jsxs("div",{className:"space-y-3",children:[p.jsxs("div",{className:"flex items-center justify-between",children:[p.jsx("span",{className:"text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] text-white border border-white/[0.08]",children:m.tag}),p.jsxs("span",{className:"text-[10px] font-mono text-[#30d158] font-medium",children:["● ",m.status]})]}),p.jsx("h3",{className:"text-lg font-heading font-semibold text-white",children:m.name}),p.jsx("p",{className:"text-xs text-[#86868b] leading-relaxed",children:m.desc}),p.jsx("ul",{className:"space-y-1.5 pt-3 border-t border-white/[0.08]",children:m.features.map((y,x)=>p.jsxs("li",{className:"text-[11px] text-[#f5f5f7] flex items-center gap-1.5",children:[p.jsx(Ba,{className:"w-3.5 h-3.5 text-white stroke-[2.5]"}),p.jsx("span",{children:y})]},x))})]}),p.jsx("div",{className:"pt-4 mt-4 border-t border-white/[0.08]",children:p.jsxs("button",{onClick:()=>{const y=document.getElementById("waitlist-anchor");y==null||y.scrollIntoView({behavior:"smooth"}),o&&cn.playTick()},className:"w-full py-2.5 rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-black text-xs font-heading font-semibold transition-all cursor-pointer flex items-center justify-center gap-1",children:[p.jsx("span",{children:"Request Access"}),p.jsx(sy,{className:"w-3.5 h-3.5"})]})})]},m.id))}),p.jsxs("div",{id:"waitlist-anchor",className:"p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center space-y-4 max-w-xl mx-auto shadow-2xl",children:[p.jsx(Ms,{className:"w-6 h-6 text-white mx-auto"}),p.jsx("h3",{className:"text-xl sm:text-2xl font-heading font-semibold text-white tracking-tight",children:"Join Lunar Labs Early Access"}),p.jsx("p",{className:"text-xs text-[#86868b] max-w-md mx-auto leading-relaxed",children:"Receive priority notification for developer beta releases, private test keys, and documentation."}),s?p.jsxs("div",{className:"p-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-white text-xs font-mono",children:["🎉 ACCESS RESERVED: You are spot ",p.jsxs("strong",{className:"text-white",children:["#",u]})," in priority queue."]}):p.jsxs("form",{onSubmit:g,className:"flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto",children:[p.jsx("input",{type:"email",required:!0,placeholder:"Enter email address...",value:t,onChange:m=>i(m.target.value),className:"flex-1 w-full px-4 py-2.5 rounded-full bg-black/50 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30"}),p.jsx("button",{type:"submit",className:"w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-heading font-semibold text-xs transition-all cursor-pointer hover:bg-[#e5e5ea]",children:"Request Access"})]})]})]})}function tE({soundEnabled:o,onOpenStudio:t}){const i=[{id:"aura_spatial",client:"AURA // SPATIAL",category:"Luxury E-Commerce & 3D Configurator",metric:"+280% Dwell Time",metricSub:"4m 12s average session duration",latency:"24ms Edge Delivery",stack:["React 19","Three.js","WebGL 2.0","Cloudflare Edge"],summary:"Engineered an interactive 3D configurator featuring real-time refraction and specular caustics, driving unprecedented buyer conversion."},{id:"synapse_protocol",client:"SYNAPSE // PROTOCOL",category:"Decentralized Generative AI Canvas",metric:"850K+ Active Nodes",metricSub:"99.98% consensus uptime",latency:"18ms Global Latency",stack:["Vite","Web Workers","Web Audio API","Tailwind"],summary:"Interactive spatial node network handling concurrent generative visual synthesis across 300+ global edge locations without frame drops."},{id:"chrono_horology",client:"CHRONO // HOROLOGY",category:"Swiss Haute Horlogerie 3D Platform",metric:"100/100 Lighthouse",metricSub:"Sub-second mobile First Contentful Paint",latency:"32ms Asset Stream",stack:["Three.js","Lanczos Video Compression","Edge CDN"],summary:"High-precision tourbillon timepiece exploration with synthesized tick micro-acoustics and microscopic zoom fidelity."}];return p.jsxs("div",{className:"max-w-5xl mx-auto space-y-8 animate-fade-in",children:[p.jsxs("div",{className:"border-b border-white/[0.08] pb-6 flex flex-wrap items-center justify-between gap-4",children:[p.jsxs("div",{children:[p.jsx("span",{className:"text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1",children:"LUNAR VAULT // PROVEN PRODUCTION WORKS"}),p.jsx("h2",{className:"text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight",children:"Production Engineering"}),p.jsx("p",{className:"text-sm text-[#86868b] mt-2 max-w-2xl leading-relaxed",children:"Every engagement delivers verifiable performance: sub-50ms latency, zero layout shifts, and industry-defining visual clarity."})]}),p.jsxs("button",{onClick:()=>{t(),o&&cn.playTick()},className:"px-5 py-2.5 rounded-full bg-white text-black font-heading font-semibold text-xs transition-all cursor-pointer hover:bg-[#e5e5ea] flex items-center gap-1.5",children:[p.jsx("span",{children:"Commission a Project"}),p.jsx(Qu,{className:"w-3.5 h-3.5 text-black"})]})]}),p.jsx("div",{className:"space-y-5",children:i.map(s=>p.jsxs("div",{className:"p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-4",children:[p.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[p.jsxs("div",{children:[p.jsx("span",{className:"text-[10px] font-mono text-[#86868b] uppercase tracking-wider",children:s.category}),p.jsx("h3",{className:"text-xl sm:text-2xl font-heading font-semibold text-white mt-0.5",children:s.client})]}),p.jsxs("div",{className:"text-right",children:[p.jsx("div",{className:"text-base sm:text-xl font-heading font-semibold text-white",children:s.metric}),p.jsx("div",{className:"text-[10px] font-mono text-[#86868b]",children:s.metricSub})]})]}),p.jsx("p",{className:"text-xs sm:text-sm text-[#86868b] leading-relaxed",children:s.summary}),p.jsxs("div",{className:"pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono",children:[p.jsx("div",{className:"flex flex-wrap items-center gap-1.5",children:s.stack.map((l,u)=>p.jsx("span",{className:"px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[10px] text-[#f5f5f7]",children:l},u))}),p.jsxs("span",{className:"text-[#86868b] text-[11px]",children:["● ",s.latency]})]})]},s.id))})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gm="186",nE=0,Jv=1,iE=2,Iu=1,aE=2,Cl=3,ir=0,Zn=1,Ia=2,Fa=0,Nl=1,Vu=2,$v=3,e_=4,sE=5,po=100,rE=101,oE=102,lE=103,cE=104,uE=200,fE=201,dE=202,hE=203,Fy=204,Hy=205,pE=206,mE=207,gE=208,xE=209,vE=210,_E=211,yE=212,SE=213,bE=214,bp=0,Mp=1,Ep=2,Dl=3,Tp=4,Ap=5,wp=6,Cp=7,Gy=0,ME=1,EE=2,ha=0,Vy=1,ky=2,jy=3,xm=4,Xy=5,Wy=6,qy=7,Yy=300,ar=301,vo=302,zh=303,Bh=304,$u=306,Rp=1e3,za=1001,Np=1002,In=1003,TE=1004,lu=1005,Gn=1006,Fh=1007,tr=1008,mi=1009,Zy=1010,Ky=1011,Ul=1012,vm=1013,pa=1014,fa=1015,ma=1016,_m=1017,ym=1018,Ll=1020,Qy=35902,Jy=35899,$y=1021,eS=1022,Vi=1023,Ga=1026,nr=1027,tS=1028,Sm=1029,sr=1030,bm=1031,Mm=1033,zu=33776,Bu=33777,Fu=33778,Hu=33779,Dp=35840,Up=35841,Lp=35842,Op=35843,Pp=36196,Ip=37492,zp=37496,Bp=37488,Fp=37489,ku=37490,Hp=37491,Gp=37808,Vp=37809,kp=37810,jp=37811,Xp=37812,Wp=37813,qp=37814,Yp=37815,Zp=37816,Kp=37817,Qp=37818,Jp=37819,$p=37820,em=37821,tm=36492,nm=36494,im=36495,am=36283,sm=36284,ju=36285,rm=36286,AE=3200,om=0,wE=1,bs="",pi="srgb",Xu="srgb-linear",Wu="linear",Zt="srgb",Hh=7680,CE=519,RE=512,NE=513,DE=514,Em=515,UE=516,LE=517,Tm=518,OE=519,nS=35044,t_="300 es",da=2e3,Ol=2001;function PE(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function Pl(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function IE(){const o=Pl("canvas");return o.style.display="block",o}const n_={};function qu(...o){const t="THREE."+o.shift();console.log(t,...o)}function iS(o){const t=o[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=o[1];i&&i.isStackTrace?o[0]+=" "+i.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function dt(...o){o=iS(o);const t="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...o)}}function Ft(...o){o=iS(o);const t="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...o)}}function go(...o){const t=o.join(" ");t in n_||(n_[t]=!0,dt(...o))}function zE(o,t,i){return new Promise(function(s,l){function u(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:s()}}setTimeout(u,i)})}const BE={[bp]:Mp,[Ep]:wp,[Tp]:Cp,[Dl]:Ap,[Mp]:bp,[wp]:Ep,[Cp]:Tp,[Ap]:Dl};class rr{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let u=0,d=l.length;u<d;u++)l[u].call(this,t);t.target=null}}}const Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gh=Math.PI/180,lm=180/Math.PI;function Es(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Fn[o&255]+Fn[o>>8&255]+Fn[o>>16&255]+Fn[o>>24&255]+"-"+Fn[t&255]+Fn[t>>8&255]+"-"+Fn[t>>16&15|64]+Fn[t>>24&255]+"-"+Fn[i&63|128]+Fn[i>>8&255]+"-"+Fn[i>>16&255]+Fn[i>>24&255]+Fn[s&255]+Fn[s>>8&255]+Fn[s>>16&255]+Fn[s>>24&255]).toLowerCase()}function Pt(o,t,i){return Math.max(t,Math.min(i,o))}function FE(o,t){return(o%t+t)%t}function Vh(o,t,i){return(1-i)*o+i*t}function ua(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:case Uint8ClampedArray:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Jt(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Nm=class Nm{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Pt(this.x,t.x,i.x),this.y=Pt(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=Pt(this.x,t,i),this.y=Pt(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pt(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(Pt(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),u=this.x-t.x,d=this.y-t.y;return this.x=u*s-d*l+t.x,this.y=u*l+d*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Nm.prototype.isVector2=!0;let _t=Nm;class So{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,u,d,h){let g=s[l+0],m=s[l+1],y=s[l+2],x=s[l+3],v=u[d+0],M=u[d+1],A=u[d+2],N=u[d+3];if(x!==N||g!==v||m!==M||y!==A){let S=g*v+m*M+y*A+x*N;S<0&&(v=-v,M=-M,A=-A,N=-N,S=-S);let b=1-h;if(S<.9995){const L=Math.acos(S),k=Math.sin(L);b=Math.sin(b*L)/k,h=Math.sin(h*L)/k,g=g*b+v*h,m=m*b+M*h,y=y*b+A*h,x=x*b+N*h}else{g=g*b+v*h,m=m*b+M*h,y=y*b+A*h,x=x*b+N*h;const L=1/Math.sqrt(g*g+m*m+y*y+x*x);g*=L,m*=L,y*=L,x*=L}}t[i]=g,t[i+1]=m,t[i+2]=y,t[i+3]=x}static multiplyQuaternionsFlat(t,i,s,l,u,d){const h=s[l],g=s[l+1],m=s[l+2],y=s[l+3],x=u[d],v=u[d+1],M=u[d+2],A=u[d+3];return t[i]=h*A+y*x+g*M-m*v,t[i+1]=g*A+y*v+m*x-h*M,t[i+2]=m*A+y*M+h*v-g*x,t[i+3]=y*A-h*x-g*v-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,u=t._z,d=t._order,h=Math.cos,g=Math.sin,m=h(s/2),y=h(l/2),x=h(u/2),v=g(s/2),M=g(l/2),A=g(u/2);switch(d){case"XYZ":this._x=v*y*x+m*M*A,this._y=m*M*x-v*y*A,this._z=m*y*A+v*M*x,this._w=m*y*x-v*M*A;break;case"YXZ":this._x=v*y*x+m*M*A,this._y=m*M*x-v*y*A,this._z=m*y*A-v*M*x,this._w=m*y*x+v*M*A;break;case"ZXY":this._x=v*y*x-m*M*A,this._y=m*M*x+v*y*A,this._z=m*y*A+v*M*x,this._w=m*y*x-v*M*A;break;case"ZYX":this._x=v*y*x-m*M*A,this._y=m*M*x+v*y*A,this._z=m*y*A-v*M*x,this._w=m*y*x+v*M*A;break;case"YZX":this._x=v*y*x+m*M*A,this._y=m*M*x+v*y*A,this._z=m*y*A-v*M*x,this._w=m*y*x-v*M*A;break;case"XZY":this._x=v*y*x-m*M*A,this._y=m*M*x-v*y*A,this._z=m*y*A+v*M*x,this._w=m*y*x+v*M*A;break;default:dt("Quaternion: .setFromEuler() encountered an unknown order: "+d)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],u=i[8],d=i[1],h=i[5],g=i[9],m=i[2],y=i[6],x=i[10],v=s+h+x;if(v>0){const M=.5/Math.sqrt(v+1);this._w=.25/M,this._x=(y-g)*M,this._y=(u-m)*M,this._z=(d-l)*M}else if(s>h&&s>x){const M=2*Math.sqrt(1+s-h-x);this._w=(y-g)/M,this._x=.25*M,this._y=(l+d)/M,this._z=(u+m)/M}else if(h>x){const M=2*Math.sqrt(1+h-s-x);this._w=(u-m)/M,this._x=(l+d)/M,this._y=.25*M,this._z=(g+y)/M}else{const M=2*Math.sqrt(1+x-s-h);this._w=(d-l)/M,this._x=(u+m)/M,this._y=(g+y)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Pt(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,u=t._z,d=t._w,h=i._x,g=i._y,m=i._z,y=i._w;return this._x=s*y+d*h+l*m-u*g,this._y=l*y+d*g+u*h-s*m,this._z=u*y+d*m+s*g-l*h,this._w=d*y-s*h-l*g-u*m,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,u=t._z,d=t._w,h=this.dot(t);h<0&&(s=-s,l=-l,u=-u,d=-d,h=-h);let g=1-i;if(h<.9995){const m=Math.acos(h),y=Math.sin(m);g=Math.sin(g*m)/y,i=Math.sin(i*m)/y,this._x=this._x*g+s*i,this._y=this._y*g+l*i,this._z=this._z*g+u*i,this._w=this._w*g+d*i,this._onChangeCallback()}else this._x=this._x*g+s*i,this._y=this._y*g+l*i,this._z=this._z*g+u*i,this._w=this._w*g+d*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),u=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),u*Math.sin(i),u*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Dm=class Dm{constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(i_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(i_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[3]*s+u[6]*l,this.y=u[1]*i+u[4]*s+u[7]*l,this.z=u[2]*i+u[5]*s+u[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=t.elements,d=1/(u[3]*i+u[7]*s+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*s+u[8]*l+u[12])*d,this.y=(u[1]*i+u[5]*s+u[9]*l+u[13])*d,this.z=(u[2]*i+u[6]*s+u[10]*l+u[14])*d,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,u=t.x,d=t.y,h=t.z,g=t.w,m=2*(d*l-h*s),y=2*(h*i-u*l),x=2*(u*s-d*i);return this.x=i+g*m+d*x-h*y,this.y=s+g*y+h*m-u*x,this.z=l+g*x+u*y-d*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[4]*s+u[8]*l,this.y=u[1]*i+u[5]*s+u[9]*l,this.z=u[2]*i+u[6]*s+u[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Pt(this.x,t.x,i.x),this.y=Pt(this.y,t.y,i.y),this.z=Pt(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=Pt(this.x,t,i),this.y=Pt(this.y,t,i),this.z=Pt(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pt(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,u=t.z,d=i.x,h=i.y,g=i.z;return this.x=l*g-u*h,this.y=u*d-s*g,this.z=s*h-l*d,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return kh.copy(this).projectOnVector(t),this.sub(kh)}reflect(t){return this.sub(kh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(Pt(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Dm.prototype.isVector3=!0;let he=Dm;const kh=new he,i_=new So,Um=class Um{constructor(t,i,s,l,u,d,h,g,m){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,d,h,g,m)}set(t,i,s,l,u,d,h,g,m){const y=this.elements;return y[0]=t,y[1]=l,y[2]=h,y[3]=i,y[4]=u,y[5]=g,y[6]=s,y[7]=d,y[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,d=s[0],h=s[3],g=s[6],m=s[1],y=s[4],x=s[7],v=s[2],M=s[5],A=s[8],N=l[0],S=l[3],b=l[6],L=l[1],k=l[4],R=l[7],U=l[2],P=l[5],F=l[8];return u[0]=d*N+h*L+g*U,u[3]=d*S+h*k+g*P,u[6]=d*b+h*R+g*F,u[1]=m*N+y*L+x*U,u[4]=m*S+y*k+x*P,u[7]=m*b+y*R+x*F,u[2]=v*N+M*L+A*U,u[5]=v*S+M*k+A*P,u[8]=v*b+M*R+A*F,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],d=t[4],h=t[5],g=t[6],m=t[7],y=t[8];return i*d*y-i*h*m-s*u*y+s*h*g+l*u*m-l*d*g}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],d=t[4],h=t[5],g=t[6],m=t[7],y=t[8],x=y*d-h*m,v=h*g-y*u,M=m*u-d*g,A=i*x+s*v+l*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const N=1/A;return t[0]=x*N,t[1]=(l*m-y*s)*N,t[2]=(h*s-l*d)*N,t[3]=v*N,t[4]=(y*i-l*g)*N,t[5]=(l*u-h*i)*N,t[6]=M*N,t[7]=(s*g-m*i)*N,t[8]=(d*i-s*u)*N,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,u,d,h){const g=Math.cos(u),m=Math.sin(u);return this.set(s*g,s*m,-s*(g*d+m*h)+d+t,-l*m,l*g,-l*(-m*d+g*h)+h+i,0,0,1),this}scale(t,i){return go("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(jh.makeScale(t,i)),this}rotate(t){return go("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(jh.makeRotation(-t)),this}translate(t,i){return go("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(jh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Um.prototype.isMatrix3=!0;let gt=Um;const jh=new gt,a_=new gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),s_=new gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function HE(){const o={enabled:!0,workingColorSpace:Xu,spaces:{},convert:function(l,u,d){return this.enabled===!1||u===d||!u||!d||(this.spaces[u].transfer===Zt&&(l.r=Ha(l.r),l.g=Ha(l.g),l.b=Ha(l.b)),this.spaces[u].primaries!==this.spaces[d].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===Zt&&(l.r=xo(l.r),l.g=xo(l.g),l.b=xo(l.b))),l},workingToColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},colorSpaceToWorking:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===bs?Wu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,d){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,u){return go("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,u)},toWorkingColorSpace:function(l,u){return go("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,u)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[Xu]:{primaries:t,whitePoint:s,transfer:Wu,toXYZ:a_,fromXYZ:s_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:pi},outputColorSpaceConfig:{drawingBufferColorSpace:pi}},[pi]:{primaries:t,whitePoint:s,transfer:Zt,toXYZ:a_,fromXYZ:s_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:pi}}}),o}const Ot=HE();function Ha(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function xo(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Zr;class GE{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Zr===void 0&&(Zr=Pl("canvas")),Zr.width=t.width,Zr.height=t.height;const l=Zr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=Zr}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Pl("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),u=l.data;for(let d=0;d<u.length;d++)u[d]=Ha(u[d]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ha(i[s]/255)*255):i[s]=Ha(i[s]);return{data:i,width:t.width,height:t.height}}else return dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let VE=0;class Am{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:VE++}),this.uuid=Es(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let d=0,h=l.length;d<h;d++)l[d].isDataTexture?u.push(Xh(l[d].image)):u.push(Xh(l[d]))}else u=Xh(l);s.url=u}return i||(t.images[this.uuid]=s),s}}function Xh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?GE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(dt("Texture: Unable to serialize Texture."),{})}let kE=0;const Wh=new he;class zn extends rr{constructor(t=zn.DEFAULT_IMAGE,i=zn.DEFAULT_MAPPING,s=za,l=za,u=Gn,d=tr,h=Vi,g=mi,m=zn.DEFAULT_ANISOTROPY,y=bs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kE++}),this.uuid=Es(),this.name="",this.source=new Am(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=u,this.minFilter=d,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=g,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=y,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wh).x}get height(){return this.source.getSize(Wh).y}get depth(){return this.source.getSize(Wh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){dt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){dt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yy)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rp:t.x=t.x-Math.floor(t.x);break;case za:t.x=t.x<0?0:1;break;case Np:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rp:t.y=t.y-Math.floor(t.y);break;case za:t.y=t.y<0?0:1;break;case Np:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=Yy;zn.DEFAULT_ANISOTROPY=1;const Lm=class Lm{constructor(t=0,i=0,s=0,l=1){this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=this.w,d=t.elements;return this.x=d[0]*i+d[4]*s+d[8]*l+d[12]*u,this.y=d[1]*i+d[5]*s+d[9]*l+d[13]*u,this.z=d[2]*i+d[6]*s+d[10]*l+d[14]*u,this.w=d[3]*i+d[7]*s+d[11]*l+d[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,u;const g=t.elements,m=g[0],y=g[4],x=g[8],v=g[1],M=g[5],A=g[9],N=g[2],S=g[6],b=g[10];if(Math.abs(y-v)<.01&&Math.abs(x-N)<.01&&Math.abs(A-S)<.01){if(Math.abs(y+v)<.1&&Math.abs(x+N)<.1&&Math.abs(A+S)<.1&&Math.abs(m+M+b-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const k=(m+1)/2,R=(M+1)/2,U=(b+1)/2,P=(y+v)/4,F=(x+N)/4,T=(A+S)/4;return k>R&&k>U?k<.01?(s=0,l=.707106781,u=.707106781):(s=Math.sqrt(k),l=P/s,u=F/s):R>U?R<.01?(s=.707106781,l=0,u=.707106781):(l=Math.sqrt(R),s=P/l,u=T/l):U<.01?(s=.707106781,l=.707106781,u=0):(u=Math.sqrt(U),s=F/u,l=T/u),this.set(s,l,u,i),this}let L=Math.sqrt((S-A)*(S-A)+(x-N)*(x-N)+(v-y)*(v-y));return Math.abs(L)<.001&&(L=1),this.x=(S-A)/L,this.y=(x-N)/L,this.z=(v-y)/L,this.w=Math.acos((m+M+b-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Pt(this.x,t.x,i.x),this.y=Pt(this.y,t.y,i.y),this.z=Pt(this.z,t.z,i.z),this.w=Pt(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=Pt(this.x,t,i),this.y=Pt(this.y,t,i),this.z=Pt(this.z,t,i),this.w=Pt(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pt(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Lm.prototype.isVector4=!0;let un=Lm;class jE extends rr{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new un(0,0,t,i),this.scissorTest=!1,this.viewport=new un(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},u=new zn(l),d=s.count;for(let h=0;h<d;h++)this.textures[h]=u.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:Gn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Am(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const i=t.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ki extends jE{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class aS extends zn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=In,this.minFilter=In,this.wrapR=za,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class XE extends zn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=In,this.minFilter=In,this.wrapR=za,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Ku=class Ku{constructor(t,i,s,l,u,d,h,g,m,y,x,v,M,A,N,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,d,h,g,m,y,x,v,M,A,N,S)}set(t,i,s,l,u,d,h,g,m,y,x,v,M,A,N,S){const b=this.elements;return b[0]=t,b[4]=i,b[8]=s,b[12]=l,b[1]=u,b[5]=d,b[9]=h,b[13]=g,b[2]=m,b[6]=y,b[10]=x,b[14]=v,b[3]=M,b[7]=A,b[11]=N,b[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ku().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,s=t.elements,l=1/Kr.setFromMatrixColumn(t,0).length(),u=1/Kr.setFromMatrixColumn(t,1).length(),d=1/Kr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*u,i[5]=s[5]*u,i[6]=s[6]*u,i[7]=0,i[8]=s[8]*d,i[9]=s[9]*d,i[10]=s[10]*d,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,u=t.z,d=Math.cos(s),h=Math.sin(s),g=Math.cos(l),m=Math.sin(l),y=Math.cos(u),x=Math.sin(u);if(t.order==="XYZ"){const v=d*y,M=d*x,A=h*y,N=h*x;i[0]=g*y,i[4]=-g*x,i[8]=m,i[1]=M+A*m,i[5]=v-N*m,i[9]=-h*g,i[2]=N-v*m,i[6]=A+M*m,i[10]=d*g}else if(t.order==="YXZ"){const v=g*y,M=g*x,A=m*y,N=m*x;i[0]=v+N*h,i[4]=A*h-M,i[8]=d*m,i[1]=d*x,i[5]=d*y,i[9]=-h,i[2]=M*h-A,i[6]=N+v*h,i[10]=d*g}else if(t.order==="ZXY"){const v=g*y,M=g*x,A=m*y,N=m*x;i[0]=v-N*h,i[4]=-d*x,i[8]=A+M*h,i[1]=M+A*h,i[5]=d*y,i[9]=N-v*h,i[2]=-d*m,i[6]=h,i[10]=d*g}else if(t.order==="ZYX"){const v=d*y,M=d*x,A=h*y,N=h*x;i[0]=g*y,i[4]=A*m-M,i[8]=v*m+N,i[1]=g*x,i[5]=N*m+v,i[9]=M*m-A,i[2]=-m,i[6]=h*g,i[10]=d*g}else if(t.order==="YZX"){const v=d*g,M=d*m,A=h*g,N=h*m;i[0]=g*y,i[4]=N-v*x,i[8]=A*x+M,i[1]=x,i[5]=d*y,i[9]=-h*y,i[2]=-m*y,i[6]=M*x+A,i[10]=v-N*x}else if(t.order==="XZY"){const v=d*g,M=d*m,A=h*g,N=h*m;i[0]=g*y,i[4]=-x,i[8]=m*y,i[1]=v*x+N,i[5]=d*y,i[9]=M*x-A,i[2]=A*x-M,i[6]=h*y,i[10]=N*x+v}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(WE,t,qE)}lookAt(t,i,s){const l=this.elements;return di.subVectors(t,i),di.lengthSq()===0&&(di.z=1),di.normalize(),gs.crossVectors(s,di),gs.lengthSq()===0&&(Math.abs(s.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),gs.crossVectors(s,di)),gs.normalize(),cu.crossVectors(di,gs),l[0]=gs.x,l[4]=cu.x,l[8]=di.x,l[1]=gs.y,l[5]=cu.y,l[9]=di.y,l[2]=gs.z,l[6]=cu.z,l[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,d=s[0],h=s[4],g=s[8],m=s[12],y=s[1],x=s[5],v=s[9],M=s[13],A=s[2],N=s[6],S=s[10],b=s[14],L=s[3],k=s[7],R=s[11],U=s[15],P=l[0],F=l[4],T=l[8],I=l[12],j=l[1],W=l[5],ae=l[9],q=l[13],Y=l[2],ne=l[6],Q=l[10],J=l[14],me=l[3],ue=l[7],O=l[11],D=l[15];return u[0]=d*P+h*j+g*Y+m*me,u[4]=d*F+h*W+g*ne+m*ue,u[8]=d*T+h*ae+g*Q+m*O,u[12]=d*I+h*q+g*J+m*D,u[1]=y*P+x*j+v*Y+M*me,u[5]=y*F+x*W+v*ne+M*ue,u[9]=y*T+x*ae+v*Q+M*O,u[13]=y*I+x*q+v*J+M*D,u[2]=A*P+N*j+S*Y+b*me,u[6]=A*F+N*W+S*ne+b*ue,u[10]=A*T+N*ae+S*Q+b*O,u[14]=A*I+N*q+S*J+b*D,u[3]=L*P+k*j+R*Y+U*me,u[7]=L*F+k*W+R*ne+U*ue,u[11]=L*T+k*ae+R*Q+U*O,u[15]=L*I+k*q+R*J+U*D,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],u=t[12],d=t[1],h=t[5],g=t[9],m=t[13],y=t[2],x=t[6],v=t[10],M=t[14],A=t[3],N=t[7],S=t[11],b=t[15],L=g*M-m*v,k=h*M-m*x,R=h*v-g*x,U=d*M-m*y,P=d*v-g*y,F=d*x-h*y;return i*(N*L-S*k+b*R)-s*(A*L-S*U+b*P)+l*(A*k-N*U+b*F)-u*(A*R-N*P+S*F)}determinantAffine(){const t=this.elements,i=t[0],s=t[4],l=t[8],u=t[1],d=t[5],h=t[9],g=t[2],m=t[6],y=t[10];return i*(d*y-h*m)-s*(u*y-h*g)+l*(u*m-d*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],d=t[4],h=t[5],g=t[6],m=t[7],y=t[8],x=t[9],v=t[10],M=t[11],A=t[12],N=t[13],S=t[14],b=t[15],L=i*h-s*d,k=i*g-l*d,R=i*m-u*d,U=s*g-l*h,P=s*m-u*h,F=l*m-u*g,T=y*N-x*A,I=y*S-v*A,j=y*b-M*A,W=x*S-v*N,ae=x*b-M*N,q=v*b-M*S,Y=L*q-k*ae+R*W+U*j-P*I+F*T;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const ne=1/Y;return t[0]=(h*q-g*ae+m*W)*ne,t[1]=(l*ae-s*q-u*W)*ne,t[2]=(N*F-S*P+b*U)*ne,t[3]=(v*P-x*F-M*U)*ne,t[4]=(g*j-d*q-m*I)*ne,t[5]=(i*q-l*j+u*I)*ne,t[6]=(S*R-A*F-b*k)*ne,t[7]=(y*F-v*R+M*k)*ne,t[8]=(d*ae-h*j+m*T)*ne,t[9]=(s*j-i*ae-u*T)*ne,t[10]=(A*P-N*R+b*L)*ne,t[11]=(x*R-y*P-M*L)*ne,t[12]=(h*I-d*W-g*T)*ne,t[13]=(i*W-s*I+l*T)*ne,t[14]=(N*k-A*U-S*L)*ne,t[15]=(y*U-x*k+v*L)*ne,this}scale(t){const i=this.elements,s=t.x,l=t.y,u=t.z;return i[0]*=s,i[4]*=l,i[8]*=u,i[1]*=s,i[5]*=l,i[9]*=u,i[2]*=s,i[6]*=l,i[10]*=u,i[3]*=s,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),u=1-s,d=t.x,h=t.y,g=t.z,m=u*d,y=u*h;return this.set(m*d+s,m*h-l*g,m*g+l*h,0,m*h+l*g,y*h+s,y*g-l*d,0,m*g-l*h,y*g+l*d,u*g*g+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,u,d){return this.set(1,s,u,0,t,1,d,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,u=i._x,d=i._y,h=i._z,g=i._w,m=u+u,y=d+d,x=h+h,v=u*m,M=u*y,A=u*x,N=d*y,S=d*x,b=h*x,L=g*m,k=g*y,R=g*x,U=s.x,P=s.y,F=s.z;return l[0]=(1-(N+b))*U,l[1]=(M+R)*U,l[2]=(A-k)*U,l[3]=0,l[4]=(M-R)*P,l[5]=(1-(v+b))*P,l[6]=(S+L)*P,l[7]=0,l[8]=(A+k)*F,l[9]=(S-L)*F,l[10]=(1-(v+N))*F,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const u=this.determinantAffine();if(u===0)return s.set(1,1,1),i.identity(),this;let d=Kr.set(l[0],l[1],l[2]).length();const h=Kr.set(l[4],l[5],l[6]).length(),g=Kr.set(l[8],l[9],l[10]).length();u<0&&(d=-d),Fi.copy(this);const m=1/d,y=1/h,x=1/g;return Fi.elements[0]*=m,Fi.elements[1]*=m,Fi.elements[2]*=m,Fi.elements[4]*=y,Fi.elements[5]*=y,Fi.elements[6]*=y,Fi.elements[8]*=x,Fi.elements[9]*=x,Fi.elements[10]*=x,i.setFromRotationMatrix(Fi),s.x=d,s.y=h,s.z=g,this}makePerspective(t,i,s,l,u,d,h=da,g=!1){const m=this.elements,y=2*u/(i-t),x=2*u/(s-l),v=(i+t)/(i-t),M=(s+l)/(s-l);let A,N;if(g)A=u/(d-u),N=d*u/(d-u);else if(h===da)A=-(d+u)/(d-u),N=-2*d*u/(d-u);else if(h===Ol)A=-d/(d-u),N=-d*u/(d-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return m[0]=y,m[4]=0,m[8]=v,m[12]=0,m[1]=0,m[5]=x,m[9]=M,m[13]=0,m[2]=0,m[6]=0,m[10]=A,m[14]=N,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,s,l,u,d,h=da,g=!1){const m=this.elements,y=2/(i-t),x=2/(s-l),v=-(i+t)/(i-t),M=-(s+l)/(s-l);let A,N;if(g)A=1/(d-u),N=d/(d-u);else if(h===da)A=-2/(d-u),N=-(d+u)/(d-u);else if(h===Ol)A=-1/(d-u),N=-u/(d-u);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return m[0]=y,m[4]=0,m[8]=0,m[12]=v,m[1]=0,m[5]=x,m[9]=0,m[13]=M,m[2]=0,m[6]=0,m[10]=A,m[14]=N,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}};Ku.prototype.isMatrix4=!0;let on=Ku;const Kr=new he,Fi=new on,WE=new he(0,0,0),qE=new he(1,1,1),gs=new he,cu=new he,di=new he,r_=new on,o_=new So;class Ts{constructor(t=0,i=0,s=0,l=Ts.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,u=l[0],d=l[4],h=l[8],g=l[1],m=l[5],y=l[9],x=l[2],v=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Pt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-y,M),this._z=Math.atan2(-d,u)):(this._x=Math.atan2(v,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(g,m)):(this._y=Math.atan2(-x,u),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-x,M),this._z=Math.atan2(-d,m)):(this._y=0,this._z=Math.atan2(g,u));break;case"ZYX":this._y=Math.asin(-Pt(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(v,M),this._z=Math.atan2(g,u)):(this._x=0,this._z=Math.atan2(-d,m));break;case"YZX":this._z=Math.asin(Pt(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(-y,m),this._y=Math.atan2(-x,u)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-Pt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(v,m),this._y=Math.atan2(h,u)):(this._x=Math.atan2(-y,M),this._y=0);break;default:dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return r_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(r_,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return o_.setFromEuler(this),this.setFromQuaternion(o_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ts.DEFAULT_ORDER="XYZ";class sS{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let YE=0;const l_=new he,Qr=new So,Da=new on,uu=new he,_l=new he,ZE=new he,KE=new So,c_=new he(1,0,0),u_=new he(0,1,0),f_=new he(0,0,1),d_={type:"added"},QE={type:"removed"},Jr={type:"childadded",child:null},qh={type:"childremoved",child:null};class Rn extends rr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:YE++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const t=new he,i=new Ts,s=new So,l=new he(1,1,1);function u(){s.setFromEuler(i,!1)}function d(){i.setFromQuaternion(s,void 0,!1)}i._onChange(u),s._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new on},normalMatrix:{value:new gt}}),this.matrix=new on,this.matrixWorld=new on,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Qr.setFromAxisAngle(t,i),this.quaternion.multiply(Qr),this}rotateOnWorldAxis(t,i){return Qr.setFromAxisAngle(t,i),this.quaternion.premultiply(Qr),this}rotateX(t){return this.rotateOnAxis(c_,t)}rotateY(t){return this.rotateOnAxis(u_,t)}rotateZ(t){return this.rotateOnAxis(f_,t)}translateOnAxis(t,i){return l_.copy(t).applyQuaternion(this.quaternion),this.position.add(l_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(c_,t)}translateY(t){return this.translateOnAxis(u_,t)}translateZ(t){return this.translateOnAxis(f_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Da.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?uu.copy(t):uu.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),_l.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Da.lookAt(_l,uu,this.up):Da.lookAt(uu,_l,this.up),this.quaternion.setFromRotationMatrix(Da),l&&(Da.extractRotation(l.matrixWorld),Qr.setFromRotationMatrix(Da),this.quaternion.premultiply(Qr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ft("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(d_),Jr.child=t,this.dispatchEvent(Jr),Jr.child=null):Ft("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(QE),qh.child=t,this.dispatchEvent(qh),qh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Da.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Da.multiply(t.parent.matrixWorld)),t.applyMatrix4(Da),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(d_),Jr.child=t,this.dispatchEvent(Jr),Jr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const d=this.children[s].getObjectByProperty(t,i);if(d!==void 0)return d}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let u=0,d=l.length;u<d;u++)l[u].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_l,t,ZE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_l,KE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,u=this.matrix.elements;u[12]+=i-u[0]*i-u[4]*s-u[8]*l,u[13]+=s-u[1]*i-u[5]*s-u[9]*l,u[14]+=l-u[2]*i-u[6]*s-u[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i,s=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const u=this.children;for(let d=0,h=u.length;d<h;d++)u[d].updateWorldMatrix(!1,!0,s)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function u(h,g){return h[g.uuid]===void 0&&(h[g.uuid]=g.toJSON(t)),g.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const g=h.shapes;if(Array.isArray(g))for(let m=0,y=g.length;m<y;m++){const x=g[m];u(t.shapes,x)}else u(t.shapes,g)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let g=0,m=this.material.length;g<m;g++)h.push(u(t.materials,this.material[g]));l.material=h}else l.material=u(t.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const g=this.animations[h];l.animations.push(u(t.animations,g))}}if(i){const h=d(t.geometries),g=d(t.materials),m=d(t.textures),y=d(t.images),x=d(t.shapes),v=d(t.skeletons),M=d(t.animations),A=d(t.nodes);h.length>0&&(s.geometries=h),g.length>0&&(s.materials=g),m.length>0&&(s.textures=m),y.length>0&&(s.images=y),x.length>0&&(s.shapes=x),v.length>0&&(s.skeletons=v),M.length>0&&(s.animations=M),A.length>0&&(s.nodes=A)}return s.object=l,s;function d(h){const g=[];for(const m in h){const y=h[m];delete y.metadata,g.push(y)}return g}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Rn.DEFAULT_UP=new he(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fu extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const JE={type:"move"};class Yh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new he,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new he),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new he,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new he,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,u=null,d=null;const h=this._targetRay,g=this._grip,m=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(m&&t.hand){d=!0;for(const N of t.hand.values()){const S=i.getJointPose(N,s),b=this._getHandJoint(m,N);S!==null&&(b.matrix.fromArray(S.transform.matrix),b.matrix.decompose(b.position,b.rotation,b.scale),b.matrixWorldNeedsUpdate=!0,b.jointRadius=S.radius),b.visible=S!==null}const y=m.joints["index-finger-tip"],x=m.joints["thumb-tip"],v=y.position.distanceTo(x.position),M=.02,A=.005;m.inputState.pinching&&v>M+A?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&v<=M-A&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else g!==null&&t.gripSpace&&(u=i.getPose(t.gripSpace,s),u!==null&&(g.matrix.fromArray(u.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,u.linearVelocity?(g.hasLinearVelocity=!0,g.linearVelocity.copy(u.linearVelocity)):g.hasLinearVelocity=!1,u.angularVelocity?(g.hasAngularVelocity=!0,g.angularVelocity.copy(u.angularVelocity)):g.hasAngularVelocity=!1,g.eventsEnabled&&g.dispatchEvent({type:"gripUpdated",data:t,target:this})));h!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&u!==null&&(l=u),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(JE)))}return h!==null&&(h.visible=l!==null),g!==null&&(g.visible=u!==null),m!==null&&(m.visible=d!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new fu;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const rS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xs={h:0,s:0,l:0},du={h:0,s:0,l:0};function Zh(o,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(t-o)*6*i:i<1/2?t:i<2/3?o+(t-o)*6*(2/3-i):o}class It{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=pi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ot.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=Ot.workingColorSpace){return this.r=t,this.g=i,this.b=s,Ot.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=Ot.workingColorSpace){if(t=FE(t,1),i=Pt(i,0,1),s=Pt(s,0,1),i===0)this.r=this.g=this.b=s;else{const u=s<=.5?s*(1+i):s+i-s*i,d=2*s-u;this.r=Zh(d,u,t+1/3),this.g=Zh(d,u,t),this.b=Zh(d,u,t-1/3)}return Ot.colorSpaceToWorking(this,l),this}setStyle(t,i=pi){function s(u){u!==void 0&&parseFloat(u)<1&&dt("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const d=l[1],h=l[2];switch(d){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:dt("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=l[1],d=u.length;if(d===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(d===6)return this.setHex(parseInt(u,16),i);dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=pi){const s=rS[t.toLowerCase()];return s!==void 0?this.setHex(s,i):dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ha(t.r),this.g=Ha(t.g),this.b=Ha(t.b),this}copyLinearToSRGB(t){return this.r=xo(t.r),this.g=xo(t.g),this.b=xo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pi){return Ot.workingToColorSpace(Hn.copy(this),t),Math.round(Pt(Hn.r*255,0,255))*65536+Math.round(Pt(Hn.g*255,0,255))*256+Math.round(Pt(Hn.b*255,0,255))}getHexString(t=pi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ot.workingColorSpace){Ot.workingToColorSpace(Hn.copy(this),i);const s=Hn.r,l=Hn.g,u=Hn.b,d=Math.max(s,l,u),h=Math.min(s,l,u);let g,m;const y=(h+d)/2;if(h===d)g=0,m=0;else{const x=d-h;switch(m=y<=.5?x/(d+h):x/(2-d-h),d){case s:g=(l-u)/x+(l<u?6:0);break;case l:g=(u-s)/x+2;break;case u:g=(s-l)/x+4;break}g/=6}return t.h=g,t.s=m,t.l=y,t}getRGB(t,i=Ot.workingColorSpace){return Ot.workingToColorSpace(Hn.copy(this),i),t.r=Hn.r,t.g=Hn.g,t.b=Hn.b,t}getStyle(t=pi){Ot.workingToColorSpace(Hn.copy(this),t);const i=Hn.r,s=Hn.g,l=Hn.b;return t!==pi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(xs),this.setHSL(xs.h+t,xs.s+i,xs.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(xs),t.getHSL(du);const s=Vh(xs.h,du.h,i),l=Vh(xs.s,du.s,i),u=Vh(xs.l,du.l,i);return this.setHSL(s,l,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,u=t.elements;return this.r=u[0]*i+u[3]*s+u[6]*l,this.g=u[1]*i+u[4]*s+u[7]*l,this.b=u[2]*i+u[5]*s+u[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Hn=new It;It.NAMES=rS;class $E extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ts,this.environmentIntensity=1,this.environmentRotation=new Ts,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Hi=new he,Ua=new he,Kh=new he,La=new he,$r=new he,eo=new he,h_=new he,Qh=new he,Jh=new he,$h=new he,ep=new un,tp=new un,np=new un;class Ni{constructor(t=new he,i=new he,s=new he){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Hi.subVectors(t,i),l.cross(Hi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(t,i,s,l,u){Hi.subVectors(l,i),Ua.subVectors(s,i),Kh.subVectors(t,i);const d=Hi.dot(Hi),h=Hi.dot(Ua),g=Hi.dot(Kh),m=Ua.dot(Ua),y=Ua.dot(Kh),x=d*m-h*h;if(x===0)return u.set(0,0,0),null;const v=1/x,M=(m*g-h*y)*v,A=(d*y-h*g)*v;return u.set(1-M-A,A,M)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,La)===null?!1:La.x>=0&&La.y>=0&&La.x+La.y<=1}static getInterpolation(t,i,s,l,u,d,h,g){return this.getBarycoord(t,i,s,l,La)===null?(g.x=0,g.y=0,"z"in g&&(g.z=0),"w"in g&&(g.w=0),null):(g.setScalar(0),g.addScaledVector(u,La.x),g.addScaledVector(d,La.y),g.addScaledVector(h,La.z),g)}static getInterpolatedAttribute(t,i,s,l,u,d){return ep.setScalar(0),tp.setScalar(0),np.setScalar(0),ep.fromBufferAttribute(t,i),tp.fromBufferAttribute(t,s),np.fromBufferAttribute(t,l),d.setScalar(0),d.addScaledVector(ep,u.x),d.addScaledVector(tp,u.y),d.addScaledVector(np,u.z),d}static isFrontFacing(t,i,s,l){return Hi.subVectors(s,i),Ua.subVectors(t,i),Hi.cross(Ua).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Hi.subVectors(this.c,this.b),Ua.subVectors(this.a,this.b),Hi.cross(Ua).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ni.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,u){return Ni.getInterpolation(t,this.a,this.b,this.c,i,s,l,u)}containsPoint(t){return Ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,u=this.c;let d,h;$r.subVectors(l,s),eo.subVectors(u,s),Qh.subVectors(t,s);const g=$r.dot(Qh),m=eo.dot(Qh);if(g<=0&&m<=0)return i.copy(s);Jh.subVectors(t,l);const y=$r.dot(Jh),x=eo.dot(Jh);if(y>=0&&x<=y)return i.copy(l);const v=g*x-y*m;if(v<=0&&g>=0&&y<=0)return d=g/(g-y),i.copy(s).addScaledVector($r,d);$h.subVectors(t,u);const M=$r.dot($h),A=eo.dot($h);if(A>=0&&M<=A)return i.copy(u);const N=M*m-g*A;if(N<=0&&m>=0&&A<=0)return h=m/(m-A),i.copy(s).addScaledVector(eo,h);const S=y*A-M*x;if(S<=0&&x-y>=0&&M-A>=0)return h_.subVectors(u,l),h=(x-y)/(x-y+(M-A)),i.copy(l).addScaledVector(h_,h);const b=1/(S+N+v);return d=N*b,h=v*b,i.copy(s).addScaledVector($r,d).addScaledVector(eo,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Bl{constructor(t=new he(1/0,1/0,1/0),i=new he(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Gi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Gi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Gi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const u=s.getAttribute("position");if(i===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let d=0,h=u.count;d<h;d++)t.isMesh===!0?t.getVertexPosition(d,Gi):Gi.fromBufferAttribute(u,d),Gi.applyMatrix4(t.matrixWorld),this.expandByPoint(Gi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),hu.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),hu.copy(s.boundingBox)),hu.applyMatrix4(t.matrixWorld),this.union(hu)}const l=t.children;for(let u=0,d=l.length;u<d;u++)this.expandByObject(l[u],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gi),Gi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(yl),pu.subVectors(this.max,yl),to.subVectors(t.a,yl),no.subVectors(t.b,yl),io.subVectors(t.c,yl),vs.subVectors(no,to),_s.subVectors(io,no),Ks.subVectors(to,io);let i=[0,-vs.z,vs.y,0,-_s.z,_s.y,0,-Ks.z,Ks.y,vs.z,0,-vs.x,_s.z,0,-_s.x,Ks.z,0,-Ks.x,-vs.y,vs.x,0,-_s.y,_s.x,0,-Ks.y,Ks.x,0];return!ip(i,to,no,io,pu)||(i=[1,0,0,0,1,0,0,0,1],!ip(i,to,no,io,pu))?!1:(mu.crossVectors(vs,_s),i=[mu.x,mu.y,mu.z],ip(i,to,no,io,pu))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Oa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Oa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Oa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Oa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Oa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Oa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Oa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Oa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Oa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Oa=[new he,new he,new he,new he,new he,new he,new he,new he],Gi=new he,hu=new Bl,to=new he,no=new he,io=new he,vs=new he,_s=new he,Ks=new he,yl=new he,pu=new he,mu=new he,Qs=new he;function ip(o,t,i,s,l){for(let u=0,d=o.length-3;u<=d;u+=3){Qs.fromArray(o,u);const h=l.x*Math.abs(Qs.x)+l.y*Math.abs(Qs.y)+l.z*Math.abs(Qs.z),g=t.dot(Qs),m=i.dot(Qs),y=s.dot(Qs);if(Math.max(-Math.max(g,m,y),Math.min(g,m,y))>h)return!1}return!0}const yn=new he,gu=new _t;let eT=0;class Di extends rr{constructor(t,i,s=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eT++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=nS,this.updateRanges=[],this.gpuType=fa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)gu.fromBufferAttribute(this,i),gu.applyMatrix3(t),this.setXY(i,gu.x,gu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)yn.fromBufferAttribute(this,i),yn.applyMatrix3(t),this.setXYZ(i,yn.x,yn.y,yn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)yn.fromBufferAttribute(this,i),yn.applyMatrix4(t),this.setXYZ(i,yn.x,yn.y,yn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)yn.fromBufferAttribute(this,i),yn.applyNormalMatrix(t),this.setXYZ(i,yn.x,yn.y,yn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)yn.fromBufferAttribute(this,i),yn.transformDirection(t),this.setXYZ(i,yn.x,yn.y,yn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=ua(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Jt(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=ua(i,this.array)),i}setX(t,i){return this.normalized&&(i=Jt(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=ua(i,this.array)),i}setY(t,i){return this.normalized&&(i=Jt(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=ua(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Jt(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=ua(i,this.array)),i}setW(t,i){return this.normalized&&(i=Jt(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Jt(i,this.array),s=Jt(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Jt(i,this.array),s=Jt(s,this.array),l=Jt(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,u){return t*=this.itemSize,this.normalized&&(i=Jt(i,this.array),s=Jt(s,this.array),l=Jt(l,this.array),u=Jt(u,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class oS extends Di{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class lS extends Di{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class Ui extends Di{constructor(t,i,s){super(new Float32Array(t),i,s)}}const tT=new Bl,Sl=new he,ap=new he;class ef{constructor(t=new he,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):tT.setFromPoints(t).getCenter(s);let l=0;for(let u=0,d=t.length;u<d;u++)l=Math.max(l,s.distanceToSquared(t[u]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Sl.subVectors(t,this.center);const i=Sl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Sl,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ap.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Sl.copy(t.center).add(ap)),this.expandByPoint(Sl.copy(t.center).sub(ap))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let nT=0;const Ci=new on,sp=new Rn,ao=new he,hi=new Bl,bl=new Bl,Cn=new he;class gi extends rr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nT++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(PE(t)?lS:oS)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const u=new gt().getNormalMatrix(t);s.applyNormalMatrix(u),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ci.makeRotationFromQuaternion(t),this.applyMatrix4(Ci),this}rotateX(t){return Ci.makeRotationX(t),this.applyMatrix4(Ci),this}rotateY(t){return Ci.makeRotationY(t),this.applyMatrix4(Ci),this}rotateZ(t){return Ci.makeRotationZ(t),this.applyMatrix4(Ci),this}translate(t,i,s){return Ci.makeTranslation(t,i,s),this.applyMatrix4(Ci),this}scale(t,i,s){return Ci.makeScale(t,i,s),this.applyMatrix4(Ci),this}lookAt(t){return sp.lookAt(t),sp.updateMatrix(),this.applyMatrix4(sp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ao).negate(),this.translate(ao.x,ao.y,ao.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,u=t.length;l<u;l++){const d=t[l];s.push(d.x,d.y,d.z||0)}this.setAttribute("position",new Ui(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const u=t[l];i.setXYZ(l,u.x,u.y,u.z||0)}t.length>i.count&&dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bl);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new he(-1/0,-1/0,-1/0),new he(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const u=i[s];hi.setFromBufferAttribute(u),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ft('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ef);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ft("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new he,1/0);return}if(t){const s=this.boundingSphere.center;if(hi.setFromBufferAttribute(t),i)for(let u=0,d=i.length;u<d;u++){const h=i[u];bl.setFromBufferAttribute(h),this.morphTargetsRelative?(Cn.addVectors(hi.min,bl.min),hi.expandByPoint(Cn),Cn.addVectors(hi.max,bl.max),hi.expandByPoint(Cn)):(hi.expandByPoint(bl.min),hi.expandByPoint(bl.max))}hi.getCenter(s);let l=0;for(let u=0,d=t.count;u<d;u++)Cn.fromBufferAttribute(t,u),l=Math.max(l,s.distanceToSquared(Cn));if(i)for(let u=0,d=i.length;u<d;u++){const h=i[u],g=this.morphTargetsRelative;for(let m=0,y=h.count;m<y;m++)Cn.fromBufferAttribute(h,m),g&&(ao.fromBufferAttribute(t,m),Cn.add(ao)),l=Math.max(l,s.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ft('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ft("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,u=i.uv;let d=this.getAttribute("tangent");(d===void 0||d.count!==s.count)&&(d=new Di(new Float32Array(4*s.count),4),this.setAttribute("tangent",d));const h=[],g=[];for(let T=0;T<s.count;T++)h[T]=new he,g[T]=new he;const m=new he,y=new he,x=new he,v=new _t,M=new _t,A=new _t,N=new he,S=new he;function b(T,I,j){m.fromBufferAttribute(s,T),y.fromBufferAttribute(s,I),x.fromBufferAttribute(s,j),v.fromBufferAttribute(u,T),M.fromBufferAttribute(u,I),A.fromBufferAttribute(u,j),y.sub(m),x.sub(m),M.sub(v),A.sub(v);const W=1/(M.x*A.y-A.x*M.y);isFinite(W)&&(N.copy(y).multiplyScalar(A.y).addScaledVector(x,-M.y).multiplyScalar(W),S.copy(x).multiplyScalar(M.x).addScaledVector(y,-A.x).multiplyScalar(W),h[T].add(N),h[I].add(N),h[j].add(N),g[T].add(S),g[I].add(S),g[j].add(S))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let T=0,I=L.length;T<I;++T){const j=L[T],W=j.start,ae=j.count;for(let q=W,Y=W+ae;q<Y;q+=3)b(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const k=new he,R=new he,U=new he,P=new he;function F(T){U.fromBufferAttribute(l,T),P.copy(U);const I=h[T];k.copy(I),k.sub(U.multiplyScalar(U.dot(I))).normalize(),R.crossVectors(P,I);const W=R.dot(g[T])<0?-1:1;d.setXYZW(T,k.x,k.y,k.z,W)}for(let T=0,I=L.length;T<I;++T){const j=L[T],W=j.start,ae=j.count;for(let q=W,Y=W+ae;q<Y;q+=3)F(t.getX(q+0)),F(t.getX(q+1)),F(t.getX(q+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new Di(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let v=0,M=s.count;v<M;v++)s.setXYZ(v,0,0,0);const l=new he,u=new he,d=new he,h=new he,g=new he,m=new he,y=new he,x=new he;if(t)for(let v=0,M=t.count;v<M;v+=3){const A=t.getX(v+0),N=t.getX(v+1),S=t.getX(v+2);l.fromBufferAttribute(i,A),u.fromBufferAttribute(i,N),d.fromBufferAttribute(i,S),y.subVectors(d,u),x.subVectors(l,u),y.cross(x),h.fromBufferAttribute(s,A),g.fromBufferAttribute(s,N),m.fromBufferAttribute(s,S),h.add(y),g.add(y),m.add(y),s.setXYZ(A,h.x,h.y,h.z),s.setXYZ(N,g.x,g.y,g.z),s.setXYZ(S,m.x,m.y,m.z)}else for(let v=0,M=i.count;v<M;v+=3)l.fromBufferAttribute(i,v+0),u.fromBufferAttribute(i,v+1),d.fromBufferAttribute(i,v+2),y.subVectors(d,u),x.subVectors(l,u),y.cross(x),s.setXYZ(v+0,y.x,y.y,y.z),s.setXYZ(v+1,y.x,y.y,y.z),s.setXYZ(v+2,y.x,y.y,y.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)Cn.fromBufferAttribute(t,i),Cn.normalize(),t.setXYZ(i,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function t(h,g){const m=h.array,y=h.itemSize,x=h.normalized,v=new m.constructor(g.length*y);let M=0,A=0;for(let N=0,S=g.length;N<S;N++){h.isInterleavedBufferAttribute?M=g[N]*h.data.stride+h.offset:M=g[N]*y;for(let b=0;b<y;b++)v[A++]=m[M++]}return new Di(v,y,x)}if(this.index===null)return dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new gi,s=this.index.array,l=this.attributes;for(const h in l){const g=l[h],m=t(g,s);i.setAttribute(h,m)}const u=this.morphAttributes;for(const h in u){const g=[],m=u[h];for(let y=0,x=m.length;y<x;y++){const v=m[y],M=t(v,s);g.push(M)}i.morphAttributes[h]=g}i.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let h=0,g=d.length;h<g;h++){const m=d[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const g=this.parameters;for(const m in g)g[m]!==void 0&&(t[m]=g[m]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const g in s){const m=s[g];t.data.attributes[g]=m.toJSON(t.data)}const l={};let u=!1;for(const g in this.morphAttributes){const m=this.morphAttributes[g],y=[];for(let x=0,v=m.length;x<v;x++){const M=m[x];y.push(M.toJSON(t.data))}y.length>0&&(l[g]=y,u=!0)}u&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(t.data.groups=JSON.parse(JSON.stringify(d)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const m in l){const y=l[m];this.setAttribute(m,y.clone(i))}const u=t.morphAttributes;for(const m in u){const y=[],x=u[m];for(let v=0,M=x.length;v<M;v++)y.push(x[v].clone(i));this.morphAttributes[m]=y}this.morphTargetsRelative=t.morphTargetsRelative;const d=t.groups;for(let m=0,y=d.length;m<y;m++){const x=d[m];this.addGroup(x.start,x.count,x.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const g=t.boundingSphere;return g!==null&&(this.boundingSphere=g.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class iT{constructor(t,i){this.isInterleavedBuffer=!0,this.array=t,this.stride=i,this.count=t!==void 0?t.length/i:0,this.usage=nS,this.updateRanges=[],this.version=0,this.uuid=Es()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,i,s){t*=this.stride,s*=i.stride;for(let l=0,u=this.stride;l<u;l++)this.array[t+l]=i.array[s+l];return this}set(t,i=0){return this.array.set(t,i),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const i=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const i={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}}const qn=new he;class Yu{constructor(t,i,s,l=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=i,this.offset=s,this.normalized=l}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let i=0,s=this.data.count;i<s;i++)qn.fromBufferAttribute(this,i),qn.applyMatrix4(t),this.setXYZ(i,qn.x,qn.y,qn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)qn.fromBufferAttribute(this,i),qn.applyNormalMatrix(t),this.setXYZ(i,qn.x,qn.y,qn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)qn.fromBufferAttribute(this,i),qn.transformDirection(t),this.setXYZ(i,qn.x,qn.y,qn.z);return this}getComponent(t,i){let s=this.array[t*this.data.stride+this.offset+i];return this.normalized&&(s=ua(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Jt(s,this.array)),this.data.array[t*this.data.stride+this.offset+i]=s,this}setX(t,i){return this.normalized&&(i=Jt(i,this.array)),this.data.array[t*this.data.stride+this.offset]=i,this}setY(t,i){return this.normalized&&(i=Jt(i,this.array)),this.data.array[t*this.data.stride+this.offset+1]=i,this}setZ(t,i){return this.normalized&&(i=Jt(i,this.array)),this.data.array[t*this.data.stride+this.offset+2]=i,this}setW(t,i){return this.normalized&&(i=Jt(i,this.array)),this.data.array[t*this.data.stride+this.offset+3]=i,this}getX(t){let i=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(i=ua(i,this.array)),i}getY(t){let i=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(i=ua(i,this.array)),i}getZ(t){let i=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(i=ua(i,this.array)),i}getW(t){let i=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(i=ua(i,this.array)),i}setXY(t,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(i=Jt(i,this.array),s=Jt(s,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this}setXYZ(t,i,s,l){return t=t*this.data.stride+this.offset,this.normalized&&(i=Jt(i,this.array),s=Jt(s,this.array),l=Jt(l,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this.data.array[t+2]=l,this}setXYZW(t,i,s,l,u){return t=t*this.data.stride+this.offset,this.normalized&&(i=Jt(i,this.array),s=Jt(s,this.array),l=Jt(l,this.array),u=Jt(u,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this.data.array[t+2]=l,this.data.array[t+3]=u,this}clone(t){if(t===void 0){qu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let u=0;u<this.itemSize;u++)i.push(this.data.array[l+u])}return new Di(new this.array.constructor(i),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Yu(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){qu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let u=0;u<this.itemSize;u++)i.push(this.data.array[l+u])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const rp=new he,aT=new he,sT=new gt;class Ss{constructor(t=new he(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=rp.subVectors(s,i).cross(aT.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,s=!0){const l=t.delta(rp),u=this.normal.dot(l);if(u===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const d=-(t.start.dot(this.normal)+this.constant)/u;return s===!0&&(d<0||d>1)?null:i.copy(t.start).addScaledVector(l,d)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||sT.getNormalMatrix(t),l=this.coplanarPoint(rp).applyMatrix4(t),u=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let rT=0;class or extends rr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rT++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=Nl,this.side=ir,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fy,this.blendDst=Hy,this.blendEquation=po,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Dl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=CE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hh,this.stencilZFail=Hh,this.stencilZPass=Hh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){dt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){dt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(u=>u.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(u){const d=[];for(const h in u){const g=u[h];delete g.metadata,d.push(g)}return d}if(i){const u=l(t.textures),d=l(t.images);u.length>0&&(s.textures=u),d.length>0&&(s.images=d)}return s}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new It().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(s=>new Ss().fromJSON(s))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new _t().fromArray(s)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let u=0;u!==l;++u)s[u]=i[u].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class cS extends or{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let so;const Ml=new he,ro=new he,oo=new he,lo=new _t,El=new _t,uS=new on,xu=new he,Tl=new he,vu=new he,p_=new _t,op=new _t,m_=new _t;class oT extends Rn{constructor(t=new cS){if(super(),this.isSprite=!0,this.type="Sprite",so===void 0){so=new gi;const i=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),s=new iT(i,5);so.setIndex([0,1,2,0,2,3]),so.setAttribute("position",new Yu(s,3,0,!1)),so.setAttribute("uv",new Yu(s,2,3,!1))}this.geometry=so,this.material=t,this.center=new _t(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,i){t.camera===null&&Ft('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ro.setFromMatrixScale(this.matrixWorld),uS.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),oo.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ro.multiplyScalar(-oo.z);const s=this.material.rotation;let l,u;s!==0&&(u=Math.cos(s),l=Math.sin(s));const d=this.center;_u(xu.set(-.5,-.5,0),oo,d,ro,l,u),_u(Tl.set(.5,-.5,0),oo,d,ro,l,u),_u(vu.set(.5,.5,0),oo,d,ro,l,u),p_.set(0,0),op.set(1,0),m_.set(1,1);let h=t.ray.intersectTriangle(xu,Tl,vu,!1,Ml);if(h===null&&(_u(Tl.set(-.5,.5,0),oo,d,ro,l,u),op.set(0,1),h=t.ray.intersectTriangle(xu,vu,Tl,!1,Ml),h===null))return;const g=t.ray.origin.distanceTo(Ml);g<t.near||g>t.far||i.push({distance:g,point:Ml.clone(),uv:Ni.getInterpolation(Ml,xu,Tl,vu,p_,op,m_,new _t),face:null,object:this})}copy(t,i){return super.copy(t,i),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function _u(o,t,i,s,l,u){lo.subVectors(o,i).addScalar(.5).multiply(s),l!==void 0?(El.x=u*lo.x-l*lo.y,El.y=l*lo.x+u*lo.y):El.copy(lo),o.copy(t),o.x+=El.x,o.y+=El.y,o.applyMatrix4(uS)}const Pa=new he,lp=new he,yu=new he,Su=new he;class fS{constructor(t=new he,i=new he(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pa)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=Pa.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(Pa.copy(this.origin).addScaledVector(this.direction,i),Pa.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){lp.copy(t).add(i).multiplyScalar(.5),yu.copy(i).sub(t).normalize(),Su.copy(this.origin).sub(lp);const u=t.distanceTo(i)*.5,d=-this.direction.dot(yu),h=Su.dot(this.direction),g=-Su.dot(yu),m=Su.lengthSq(),y=Math.abs(1-d*d);let x,v,M,A;if(y>0)if(x=d*g-h,v=d*h-g,A=u*y,x>=0)if(v>=-A)if(v<=A){const N=1/y;x*=N,v*=N,M=x*(x+d*v+2*h)+v*(d*x+v+2*g)+m}else v=u,x=Math.max(0,-(d*v+h)),M=-x*x+v*(v+2*g)+m;else v=-u,x=Math.max(0,-(d*v+h)),M=-x*x+v*(v+2*g)+m;else v<=-A?(x=Math.max(0,-(-d*u+h)),v=x>0?-u:Math.min(Math.max(-u,-g),u),M=-x*x+v*(v+2*g)+m):v<=A?(x=0,v=Math.min(Math.max(-u,-g),u),M=v*(v+2*g)+m):(x=Math.max(0,-(d*u+h)),v=x>0?u:Math.min(Math.max(-u,-g),u),M=-x*x+v*(v+2*g)+m);else v=d>0?-u:u,x=Math.max(0,-(d*v+h)),M=-x*x+v*(v+2*g)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(lp).addScaledVector(yu,v),M}intersectSphere(t,i){if(t.radius<0)return null;Pa.subVectors(t.center,this.origin);const s=Pa.dot(this.direction),l=Pa.dot(Pa)-s*s,u=t.radius*t.radius;if(l>u)return null;const d=Math.sqrt(u-l),h=s-d,g=s+d;return g<0?null:h<0?this.at(g,i):this.at(h,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,u,d,h,g;const m=1/this.direction.x,y=1/this.direction.y,x=1/this.direction.z,v=this.origin;return m>=0?(s=(t.min.x-v.x)*m,l=(t.max.x-v.x)*m):(s=(t.max.x-v.x)*m,l=(t.min.x-v.x)*m),y>=0?(u=(t.min.y-v.y)*y,d=(t.max.y-v.y)*y):(u=(t.max.y-v.y)*y,d=(t.min.y-v.y)*y),s>d||u>l||((u>s||isNaN(s))&&(s=u),(d<l||isNaN(l))&&(l=d),x>=0?(h=(t.min.z-v.z)*x,g=(t.max.z-v.z)*x):(h=(t.max.z-v.z)*x,g=(t.min.z-v.z)*x),s>g||h>l)||((h>s||s!==s)&&(s=h),(g<l||l!==l)&&(l=g),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,Pa)!==null}intersectTriangle(t,i,s,l,u){const d=this.origin,h=this.direction,g=h.x,m=h.y,y=h.z,x=t.x-d.x,v=t.y-d.y,M=t.z-d.z,A=i.x-d.x,N=i.y-d.y,S=i.z-d.z,b=s.x-d.x,L=s.y-d.y,k=s.z-d.z,R=Math.abs(g),U=Math.abs(m),P=Math.abs(y);let F,T,I,j,W,ae,q,Y,ne,Q,J,me;if(R>=U&&R>=P?(I=g,ae=x,ne=A,me=b,g>=0?(F=m,T=y,j=v,W=M,q=N,Y=S,Q=L,J=k):(F=y,T=m,j=M,W=v,q=S,Y=N,Q=k,J=L)):U>=P?(I=m,ae=v,ne=N,me=L,m>=0?(F=y,T=g,j=M,W=x,q=S,Y=A,Q=k,J=b):(F=g,T=y,j=x,W=M,q=A,Y=S,Q=b,J=k)):(I=y,ae=M,ne=S,me=k,y>=0?(F=g,T=m,j=x,W=v,q=A,Y=N,Q=b,J=L):(F=m,T=g,j=v,W=x,q=N,Y=A,Q=L,J=b)),I===0)return null;const ue=F/I,O=T/I,D=1/I,_e=j-ue*ae,we=W-O*ae,B=q-ue*ne,re=Y-O*ne,Se=Q-ue*me,G=J-O*me,ee=Se*re-G*B,be=_e*G-we*Se,Ne=B*we-re*_e;if(l){if(ee<0||be<0||Ne<0)return null}else if((ee<0||be<0||Ne<0)&&(ee>0||be>0||Ne>0))return null;const ge=ee+be+Ne;if(ge===0)return null;const Ce=D*(ee*ae+be*ne+Ne*me);return(ge>0?Ce<0:Ce>0)?null:this.at(Ce/ge,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dS extends or{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ts,this.combine=Gy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const g_=new on,Js=new fS,bu=new ef,x_=new he,Mu=new he,Eu=new he,Tu=new he,cp=new he,Au=new he,v_=new he,wu=new he;class ji extends Rn{constructor(t=new gi,i=new dS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,d=l.length;u<d;u++){const h=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=u}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,u=s.morphAttributes.position,d=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const h=this.morphTargetInfluences;if(u&&h){Au.set(0,0,0);for(let g=0,m=u.length;g<m;g++){const y=h[g],x=u[g];y!==0&&(cp.fromBufferAttribute(x,t),d?Au.addScaledVector(cp,y):Au.addScaledVector(cp.sub(i),y))}i.add(Au)}return i}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),bu.copy(s.boundingSphere),bu.applyMatrix4(u),Js.copy(t.ray).recast(t.near),!(bu.containsPoint(Js.origin)===!1&&(Js.intersectSphere(bu,x_)===null||Js.origin.distanceToSquared(x_)>(t.far-t.near)**2))&&(g_.copy(u).invert(),Js.copy(t.ray).applyMatrix4(g_),!(s.boundingBox!==null&&Js.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Js)))}_computeIntersections(t,i,s){let l;const u=this.geometry,d=this.material,h=u.index,g=u.attributes.position,m=u.attributes.uv,y=u.attributes.uv1,x=u.attributes.normal,v=u.groups,M=u.drawRange;if(h!==null)if(Array.isArray(d))for(let A=0,N=v.length;A<N;A++){const S=v[A],b=d[S.materialIndex],L=Math.max(S.start,M.start),k=Math.min(h.count,Math.min(S.start+S.count,M.start+M.count));for(let R=L,U=k;R<U;R+=3){const P=h.getX(R),F=h.getX(R+1),T=h.getX(R+2);l=Cu(this,b,t,s,m,y,x,P,F,T),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const A=Math.max(0,M.start),N=Math.min(h.count,M.start+M.count);for(let S=A,b=N;S<b;S+=3){const L=h.getX(S),k=h.getX(S+1),R=h.getX(S+2);l=Cu(this,d,t,s,m,y,x,L,k,R),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(g!==void 0)if(Array.isArray(d))for(let A=0,N=v.length;A<N;A++){const S=v[A],b=d[S.materialIndex],L=Math.max(S.start,M.start),k=Math.min(g.count,Math.min(S.start+S.count,M.start+M.count));for(let R=L,U=k;R<U;R+=3){const P=R,F=R+1,T=R+2;l=Cu(this,b,t,s,m,y,x,P,F,T),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const A=Math.max(0,M.start),N=Math.min(g.count,M.start+M.count);for(let S=A,b=N;S<b;S+=3){const L=S,k=S+1,R=S+2;l=Cu(this,d,t,s,m,y,x,L,k,R),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function lT(o,t,i,s,l,u,d,h){let g;if(t.side===Zn?g=s.intersectTriangle(d,u,l,!0,h):g=s.intersectTriangle(l,u,d,t.side===ir,h),g===null)return null;wu.copy(h),wu.applyMatrix4(o.matrixWorld);const m=i.ray.origin.distanceTo(wu);return m<i.near||m>i.far?null:{distance:m,point:wu.clone(),object:o}}function Cu(o,t,i,s,l,u,d,h,g,m){o.getVertexPosition(h,Mu),o.getVertexPosition(g,Eu),o.getVertexPosition(m,Tu);const y=lT(o,t,i,s,Mu,Eu,Tu,v_);if(y){const x=new he;Ni.getBarycoord(v_,Mu,Eu,Tu,x),l&&(y.uv=Ni.getInterpolatedAttribute(l,h,g,m,x,new _t)),u&&(y.uv1=Ni.getInterpolatedAttribute(u,h,g,m,x,new _t)),d&&(y.normal=Ni.getInterpolatedAttribute(d,h,g,m,x,new he),y.normal.dot(s.direction)>0&&y.normal.multiplyScalar(-1));const v={a:h,b:g,c:m,normal:new he,materialIndex:0};Ni.getNormal(Mu,Eu,Tu,v.normal),y.face=v,y.barycoord=x}return y}class cT extends zn{constructor(t=null,i=1,s=1,l,u,d,h,g,m=In,y=In,x,v){super(null,d,h,g,m,y,l,u,x,v),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $s=new ef,uT=new _t(.5,.5),Ru=new he;class wm{constructor(t=new Ss,i=new Ss,s=new Ss,l=new Ss,u=new Ss,d=new Ss){this.planes=[t,i,s,l,u,d]}set(t,i,s,l,u,d){const h=this.planes;return h[0].copy(t),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(u),h[5].copy(d),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=da,s=!1){const l=this.planes,u=t.elements,d=u[0],h=u[1],g=u[2],m=u[3],y=u[4],x=u[5],v=u[6],M=u[7],A=u[8],N=u[9],S=u[10],b=u[11],L=u[12],k=u[13],R=u[14],U=u[15];if(l[0].setComponents(m-d,M-y,b-A,U-L).normalize(),l[1].setComponents(m+d,M+y,b+A,U+L).normalize(),l[2].setComponents(m+h,M+x,b+N,U+k).normalize(),l[3].setComponents(m-h,M-x,b-N,U-k).normalize(),s)l[4].setComponents(g,v,S,R).normalize(),l[5].setComponents(m-g,M-v,b-S,U-R).normalize();else if(l[4].setComponents(m-g,M-v,b-S,U-R).normalize(),i===da)l[5].setComponents(m+g,M+v,b+S,U+R).normalize();else if(i===Ol)l[5].setComponents(g,v,S,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$s.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),$s.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($s)}intersectsSprite(t){$s.center.set(0,0,0);const i=uT.distanceTo(t.center);return $s.radius=.7071067811865476+i,$s.applyMatrix4(t.matrixWorld),this.intersectsSphere($s)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Ru.x=l.normal.x>0?t.max.x:t.min.x,Ru.y=l.normal.y>0?t.max.y:t.min.y,Ru.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Ru)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hS extends or{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const __=new on,cm=new fS,Nu=new ef,Du=new he;class fT extends Rn{constructor(t=new gi,i=new hS){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.matrixWorld,u=t.params.Points.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Nu.copy(s.boundingSphere),Nu.applyMatrix4(l),Nu.radius+=u,t.ray.intersectsSphere(Nu)===!1)return;__.copy(l).invert(),cm.copy(t.ray).applyMatrix4(__);const h=u/((this.scale.x+this.scale.y+this.scale.z)/3),g=h*h,m=s.index,x=s.attributes.position;if(m!==null){const v=Math.max(0,d.start),M=Math.min(m.count,d.start+d.count);for(let A=v,N=M;A<N;A++){const S=m.getX(A);Du.fromBufferAttribute(x,S),y_(Du,S,g,l,t,i,this)}}else{const v=Math.max(0,d.start),M=Math.min(x.count,d.start+d.count);for(let A=v,N=M;A<N;A++)Du.fromBufferAttribute(x,A),y_(Du,A,g,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,d=l.length;u<d;u++){const h=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=u}}}}}function y_(o,t,i,s,l,u,d){const h=cm.distanceSqToPoint(o);if(h<i){const g=new he;cm.closestPointToPoint(o,g),g.applyMatrix4(s);const m=l.ray.origin.distanceTo(g);if(m<l.near||m>l.far)return;u.push({distance:m,distanceToRay:Math.sqrt(h),point:g,index:t,face:null,faceIndex:null,barycoord:null,object:d})}}class pS extends zn{constructor(t=[],i=ar,s,l,u,d,h,g,m,y){super(t,i,s,l,u,d,h,g,m,y),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class dT extends zn{constructor(t,i,s,l,u,d,h,g,m){super(t,i,s,l,u,d,h,g,m),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Il extends zn{constructor(t,i,s=pa,l,u,d,h=In,g=In,m,y=Ga,x=1){if(y!==Ga&&y!==nr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:t,height:i,depth:x};super(v,l,u,d,h,g,y,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Am(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return i.compareFunction=this.compareFunction,i}}class hT extends Il{constructor(t,i=pa,s=ar,l,u,d=In,h=In,g,m=Ga){const y={width:t,height:t,depth:1},x=[y,y,y,y,y,y];super(t,t,i,s,l,u,d,h,g,m),this.image=x,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class mS extends zn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Fl extends gi{constructor(t=1,i=1,s=1,l=1,u=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:u,depthSegments:d};const h=this;l=Math.floor(l),u=Math.floor(u),d=Math.floor(d);const g=[],m=[],y=[],x=[];let v=0,M=0;A("z","y","x",-1,-1,s,i,t,d,u,0),A("z","y","x",1,-1,s,i,-t,d,u,1),A("x","z","y",1,1,t,s,i,l,d,2),A("x","z","y",1,-1,t,s,-i,l,d,3),A("x","y","z",1,-1,t,i,s,l,u,4),A("x","y","z",-1,-1,t,i,-s,l,u,5),this.setIndex(g),this.setAttribute("position",new Ui(m,3)),this.setAttribute("normal",new Ui(y,3)),this.setAttribute("uv",new Ui(x,2));function A(N,S,b,L,k,R,U,P,F,T,I){const j=R/F,W=U/T,ae=R/2,q=U/2,Y=P/2,ne=F+1,Q=T+1;let J=0,me=0;const ue=new he;for(let O=0;O<Q;O++){const D=O*W-q;for(let _e=0;_e<ne;_e++){const we=_e*j-ae;ue[N]=we*L,ue[S]=D*k,ue[b]=Y,m.push(ue.x,ue.y,ue.z),ue[N]=0,ue[S]=0,ue[b]=P>0?1:-1,y.push(ue.x,ue.y,ue.z),x.push(_e/F),x.push(1-O/T),J+=1}}for(let O=0;O<T;O++)for(let D=0;D<F;D++){const _e=v+D+ne*O,we=v+D+ne*(O+1),B=v+(D+1)+ne*(O+1),re=v+(D+1)+ne*O;g.push(_e,we,re),g.push(we,B,re),me+=6}h.addGroup(M,me,I),M+=me,v+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class tf extends gi{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const u=t/2,d=i/2,h=Math.floor(s),g=Math.floor(l),m=h+1,y=g+1,x=t/h,v=i/g,M=[],A=[],N=[],S=[];for(let b=0;b<y;b++){const L=b*v-d;for(let k=0;k<m;k++){const R=k*x-u;A.push(R,-L,0),N.push(0,0,1),S.push(k/h),S.push(1-b/g)}}for(let b=0;b<g;b++)for(let L=0;L<h;L++){const k=L+m*b,R=L+m*(b+1),U=L+1+m*(b+1),P=L+1+m*b;M.push(k,R,P),M.push(R,U,P)}this.setIndex(M),this.setAttribute("position",new Ui(A,3)),this.setAttribute("normal",new Ui(N,3)),this.setAttribute("uv",new Ui(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tf(t.width,t.height,t.widthSegments,t.heightSegments)}}class Zu extends gi{constructor(t=1,i=32,s=16,l=0,u=Math.PI*2,d=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:s,phiStart:l,phiLength:u,thetaStart:d,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const g=Math.min(d+h,Math.PI);let m=0;const y=[],x=new he,v=new he,M=[],A=[],N=[],S=[];for(let b=0;b<=s;b++){const L=[],k=b/s,R=d+k*h,U=t*Math.cos(R),P=Math.sqrt(t*t-U*U);let F=0;b===0&&d===0?F=.5/i:b===s&&g===Math.PI&&(F=-.5/i);for(let T=0;T<=i;T++){const I=T/i,j=l+I*u;x.x=-P*Math.cos(j),x.y=U,x.z=P*Math.sin(j),A.push(x.x,x.y,x.z),v.copy(x).normalize(),N.push(v.x,v.y,v.z),S.push(I+F,1-k),L.push(m++)}y.push(L)}for(let b=0;b<s;b++)for(let L=0;L<i;L++){const k=y[b][L+1],R=y[b][L],U=y[b+1][L],P=y[b+1][L+1];(b!==0||d>0)&&M.push(k,R,P),(b!==s-1||g<Math.PI)&&M.push(R,U,P)}this.setIndex(M),this.setAttribute("position",new Ui(A,3)),this.setAttribute("normal",new Ui(N,3)),this.setAttribute("uv",new Ui(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function _o(o){const t={};for(const i in o){t[i]={};for(const s in o[i]){const l=o[i][s];if(S_(l))l.isRenderTargetTexture?(dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone();else if(Array.isArray(l))if(S_(l[0])){const u=[];for(let d=0,h=l.length;d<h;d++)u[d]=l[d].clone();t[i][s]=u}else t[i][s]=l.slice();else t[i][s]=l}}return t}function Yn(o){const t={};for(let i=0;i<o.length;i++){const s=_o(o[i]);for(const l in s)t[l]=s[l]}return t}function S_(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}function pT(o){const t=[];for(let i=0;i<o.length;i++)t.push(o[i].clone());return t}function gS(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ot.workingColorSpace}const mT={clone:_o,merge:Yn};var gT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xi extends or{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gT,this.fragmentShader=xT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_o(t.uniforms),this.uniformsGroups=pT(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const d=this.uniforms[l].value;d&&d.isTexture?i.uniforms[l]={type:"t",value:d.toJSON(t).uuid}:d&&d.isColor?i.uniforms[l]={type:"c",value:d.getHex()}:d&&d.isVector2?i.uniforms[l]={type:"v2",value:d.toArray()}:d&&d.isVector3?i.uniforms[l]={type:"v3",value:d.toArray()}:d&&d.isVector4?i.uniforms[l]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?i.uniforms[l]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?i.uniforms[l]={type:"m4",value:d.toArray()}:i.uniforms[l]={value:d}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const s in t.uniforms){const l=t.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new It().setHex(l.value);break;case"v2":this.uniforms[s].value=new _t().fromArray(l.value);break;case"v3":this.uniforms[s].value=new he().fromArray(l.value);break;case"v4":this.uniforms[s].value=new un().fromArray(l.value);break;case"m3":this.uniforms[s].value=new gt().fromArray(l.value);break;case"m4":this.uniforms[s].value=new on().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)this.extensions[s]=t.extensions[s];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class vT extends Xi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _T extends or{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=om,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ts,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yT extends or{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=AE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ST extends or{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const up={enabled:!1,files:{},add:function(o,t){this.enabled!==!1&&(b_(o)||(this.files[o]=t))},get:function(o){if(this.enabled!==!1&&!b_(o))return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};function b_(o){try{const t=o.slice(o.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class bT{constructor(t,i,s){const l=this;let u=!1,d=0,h=0,g;const m=[];this.onStart=void 0,this.onLoad=t,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(y){h++,u===!1&&l.onStart!==void 0&&l.onStart(y,d,h),u=!0},this.itemEnd=function(y){d++,l.onProgress!==void 0&&l.onProgress(y,d,h),d===h&&(u=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(y){l.onError!==void 0&&l.onError(y)},this.resolveURL=function(y){return y=y.normalize("NFC"),g?g(y):y},this.setURLModifier=function(y){return g=y,this},this.addHandler=function(y,x){return m.push(y,x),this},this.removeHandler=function(y){const x=m.indexOf(y);return x!==-1&&m.splice(x,2),this},this.getHandler=function(y){for(let x=0,v=m.length;x<v;x+=2){const M=m[x],A=m[x+1];if(M.global&&(M.lastIndex=0),M.test(y))return A}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const MT=new bT;class Cm{constructor(t){this.manager=t!==void 0?t:MT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,i){const s=this;return new Promise(function(l,u){s.load(t,l,i,u)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Cm.DEFAULT_MATERIAL_NAME="__DEFAULT";const co=new WeakMap;class ET extends Cm{constructor(t){super(t)}load(t,i,s,l){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const u=this,d=up.get(`image:${t}`);if(d!==void 0){if(d.complete===!0)u.manager.itemStart(t),setTimeout(function(){i&&i(d),u.manager.itemEnd(t)},0);else{let x=co.get(d);x===void 0&&(x=[],co.set(d,x)),x.push({onLoad:i,onError:l})}return d}const h=Pl("img");function g(){y(),i&&i(this);const x=co.get(this)||[];for(let v=0;v<x.length;v++){const M=x[v];M.onLoad&&M.onLoad(this)}co.delete(this),u.manager.itemEnd(t)}function m(x){y(),l&&l(x),up.remove(`image:${t}`);const v=co.get(this)||[];for(let M=0;M<v.length;M++){const A=v[M];A.onError&&A.onError(x)}co.delete(this),u.manager.itemError(t),u.manager.itemEnd(t)}function y(){h.removeEventListener("load",g,!1),h.removeEventListener("error",m,!1)}return h.addEventListener("load",g,!1),h.addEventListener("error",m,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),up.add(`image:${t}`,h),u.manager.itemStart(t),h.src=t,h}}class TT extends Cm{constructor(t){super(t)}load(t,i,s,l){const u=new zn,d=new ET(this.manager);return d.setCrossOrigin(this.crossOrigin),d.setPath(this.path),d.load(t,function(h){u.image=h,u.needsUpdate=!0,i!==void 0&&i(u)},s,l),u}}class xS extends Rn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=i}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const fp=new on,M_=new he,E_=new he;class AT{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.mapType=mi,this.map=null,this.mapPass=null,this.matrix=new on,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wm,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new un(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera;M_.setFromMatrixPosition(t.matrixWorld),i.position.copy(M_),E_.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(E_),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(t,i,s,l){fp.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),s.setFromProjectionMatrix(fp,t.coordinateSystem,t.reversedDepth);const u=this._frameExtents,d=l?l.z/u.x:1,h=l?l.w/u.y:1,g=l?l.x/u.x:0,m=l?l.y/u.y:0;t.coordinateSystem===Ol||t.reversedDepth?i.set(.5*d,0,0,.5*d+g,0,.5*h,0,.5*h+m,0,0,1,0,0,0,0,1):i.set(.5*d,0,0,.5*d+g,0,.5*h,0,.5*h+m,0,0,.5,.5,0,0,0,1),i.multiply(fp)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Uu=new he,Lu=new So,oa=new he;class vS extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new on,this.projectionMatrix=new on,this.projectionMatrixInverse=new on,this.coordinateSystem=da,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Uu,Lu,oa),oa.x===1&&oa.y===1&&oa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uu,Lu,oa.set(1,1,1)).invert()}updateWorldMatrix(t,i,s=!1){super.updateWorldMatrix(t,i,s),this.matrixWorld.decompose(Uu,Lu,oa),oa.x===1&&oa.y===1&&oa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uu,Lu,oa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ys=new he,T_=new _t,A_=new _t;class Ri extends vS{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=lm*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return lm*2*Math.atan(Math.tan(Gh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ys.x,ys.y).multiplyScalar(-t/ys.z),ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ys.x,ys.y).multiplyScalar(-t/ys.z)}getViewSize(t,i){return this.getViewBounds(t,T_,A_),i.subVectors(A_,T_)}setViewOffset(t,i,s,l,u,d){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Gh*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,u=-.5*l;const d=this.view;if(this.view!==null&&this.view.enabled){const g=d.fullWidth,m=d.fullHeight;u+=d.offsetX*l/g,i-=d.offsetY*s/m,l*=d.width/g,s*=d.height/m}const h=this.filmOffset;h!==0&&(u+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class Rm extends vS{constructor(t=-1,i=1,s=1,l=-1,u=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=u,this.far=d,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,u,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=s-t,d=s+t,h=l+i,g=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,y=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=m*this.view.offsetX,d=u+m*this.view.width,h-=y*this.view.offsetY,g=h-y*this.view.height}this.projectionMatrix.makeOrthographic(u,d,h,g,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class wT extends AT{constructor(){super(new Rm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class w_ extends xS{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rn.DEFAULT_UP),this.updateMatrix(),this.target=new Rn,this.shadow=new wT}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class CT extends xS{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const uo=-90,fo=1;class RT extends Rn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ri(uo,fo,t,i);l.layers=this.layers,this.add(l);const u=new Ri(uo,fo,t,i);u.layers=this.layers,this.add(u);const d=new Ri(uo,fo,t,i);d.layers=this.layers,this.add(d);const h=new Ri(uo,fo,t,i);h.layers=this.layers,this.add(h);const g=new Ri(uo,fo,t,i);g.layers=this.layers,this.add(g);const m=new Ri(uo,fo,t,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,u,d,h,g]=i;for(const m of i)this.remove(m);if(t===da)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),g.up.set(0,1,0),g.lookAt(0,0,-1);else if(t===Ol)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),g.up.set(0,-1,0),g.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of i)this.add(m),m.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,d,h,g,m,y]=this.children,x=t.getRenderTarget(),v=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),A=t.xr.enabled;t.xr.enabled=!1;const N=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let S=!1;t.isWebGLRenderer===!0?S=t.state.buffers.depth.getReversed():S=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,u),t.setRenderTarget(s,1,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),t.setRenderTarget(s,2,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,h),t.setRenderTarget(s,3,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,g),t.setRenderTarget(s,4,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),s.texture.generateMipmaps=N,t.setRenderTarget(s,5,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,y),t.setRenderTarget(x,v,M),t.xr.enabled=A,s.texture.needsPMREMUpdate=!0}}class NT extends Ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Om=class Om{constructor(t,i,s,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let s=0;s<4;s++)this.elements[s]=t[s+i];return this}set(t,i,s,l){const u=this.elements;return u[0]=t,u[2]=i,u[1]=s,u[3]=l,this}};Om.prototype.isMatrix2=!0;let C_=Om;function R_(o,t,i,s){const l=DT(s);switch(i){case $y:return o*t;case tS:return o*t/l.components*l.byteLength;case Sm:return o*t/l.components*l.byteLength;case sr:return o*t*2/l.components*l.byteLength;case bm:return o*t*2/l.components*l.byteLength;case eS:return o*t*3/l.components*l.byteLength;case Vi:return o*t*4/l.components*l.byteLength;case Mm:return o*t*4/l.components*l.byteLength;case zu:case Bu:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Fu:case Hu:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Up:case Op:return Math.max(o,16)*Math.max(t,8)/4;case Dp:case Lp:return Math.max(o,8)*Math.max(t,8)/2;case Pp:case Ip:case Bp:case Fp:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case zp:case ku:case Hp:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Gp:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Vp:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case kp:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case jp:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case Xp:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case Wp:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case qp:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Yp:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case Zp:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case Kp:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case Qp:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case Jp:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case $p:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case em:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case tm:case nm:case im:return Math.ceil(o/4)*Math.ceil(t/4)*16;case am:case sm:return Math.ceil(o/4)*Math.ceil(t/4)*8;case ju:case rm:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function DT(o){switch(o){case mi:case Zy:return{byteLength:1,components:1};case Ul:case Ky:case ma:return{byteLength:2,components:1};case _m:case ym:return{byteLength:2,components:4};case pa:case vm:case fa:return{byteLength:4,components:1};case Qy:case Jy:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gm}}));typeof window<"u"&&(window.__THREE__?dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function _S(){let o=null,t=!1,i=null,s=null;function l(u,d){s=o.requestAnimationFrame(l),i(u,d)}return{start:function(){t!==!0&&i!==null&&o!==null&&(s=o.requestAnimationFrame(l),t=!0)},stop:function(){o!==null&&o.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(u){i=u},setContext:function(u){o=u}}}function UT(o){const t=new WeakMap;function i(h,g){const m=h.array,y=h.usage,x=m.byteLength,v=o.createBuffer();o.bindBuffer(g,v),o.bufferData(g,m,y),h.onUploadCallback();let M;if(m instanceof Float32Array)M=o.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)M=o.HALF_FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=o.SHORT;else if(m instanceof Uint32Array)M=o.UNSIGNED_INT;else if(m instanceof Int32Array)M=o.INT;else if(m instanceof Int8Array)M=o.BYTE;else if(m instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:v,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:x}}function s(h,g,m){const y=g.array,x=g.updateRanges;if(o.bindBuffer(m,h),x.length===0)o.bufferSubData(m,0,y);else{x.sort((M,A)=>M.start-A.start);let v=0;for(let M=1;M<x.length;M++){const A=x[v],N=x[M];N.start<=A.start+A.count+1?A.count=Math.max(A.count,N.start+N.count-A.start):(++v,x[v]=N)}x.length=v+1;for(let M=0,A=x.length;M<A;M++){const N=x[M];o.bufferSubData(m,N.start*y.BYTES_PER_ELEMENT,y,N.start,N.count)}g.clearUpdateRanges()}g.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function u(h){h.isInterleavedBufferAttribute&&(h=h.data);const g=t.get(h);g&&(o.deleteBuffer(g.buffer),t.delete(h))}function d(h,g){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const y=t.get(h);(!y||y.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=t.get(h);if(m===void 0)t.set(h,i(h,g));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,g),m.version=h.version}}return{get:l,remove:u,update:d}}var LT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,OT=`#ifdef USE_ALPHAHASH
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
#endif`,PT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,IT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,BT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,FT=`#ifdef USE_AOMAP
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
#endif`,HT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,GT=`#ifdef USE_BATCHING
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
#endif`,VT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,WT=`#ifdef USE_IRIDESCENCE
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
#endif`,qT=`#ifdef USE_BUMPMAP
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
#endif`,YT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ZT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,KT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,JT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$T=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,eA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,nA=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,iA=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,aA=`vec3 transformedNormal = objectNormal;
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
#endif`,sA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,oA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cA="gl_FragColor = linearToOutputTexel( gl_FragColor );",uA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif`,dA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hA=`#ifdef USE_ENVMAP
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
#endif`,pA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_A=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yA=`#ifdef USE_GRADIENTMAP
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
}`,SA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,MA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,EA=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#include <lightprobes_pars_fragment>`,TA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,AA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,RA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NA=`PhysicalMaterial material;
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
#endif`,DA=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
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
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
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
}`,UA=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,LA=`#if defined( RE_IndirectDiffuse )
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
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,OA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,PA=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,IA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,HA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,GA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kA=`#if defined( USE_POINTS_UV )
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
#endif`,jA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,WA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,YA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZA=`#ifdef USE_MORPHTARGETS
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
#endif`,KA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,JA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$A=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ew=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,nw=`#ifdef USE_NORMALMAP
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
#endif`,iw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,aw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ow=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
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
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
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
#endif`,gw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,xw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,vw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
}`,_w=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yw=`#ifdef USE_SKINNING
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
#endif`,Sw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bw=`#ifdef USE_SKINNING
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
#endif`,Mw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ew=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Aw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ww=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cw=`#ifdef USE_TRANSMISSION
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
#endif`,Rw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Uw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ow=`uniform sampler2D t2D;
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
}`,Pw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fw=`#include <common>
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
}`,Hw=`#if DEPTH_PACKING == 3200
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
}`,Gw=`#define DISTANCE
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
}`,Vw=`#define DISTANCE
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
void main() {
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
}`,kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xw=`uniform float scale;
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
}`,Ww=`uniform vec3 diffuse;
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
}`,qw=`#include <common>
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
}`,Yw=`uniform vec3 diffuse;
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
}`,Zw=`#define LAMBERT
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
}`,Kw=`#define LAMBERT
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
}`,Qw=`#define MATCAP
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
}`,Jw=`#define MATCAP
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
}`,$w=`#define NORMAL
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
}`,e2=`#define NORMAL
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
}`,t2=`#define PHONG
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
}`,n2=`#define PHONG
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
}`,i2=`#define STANDARD
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
}`,a2=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
}`,s2=`#define TOON
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
}`,r2=`#define TOON
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
}`,o2=`uniform float size;
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
}`,l2=`uniform vec3 diffuse;
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
}`,c2=`#include <common>
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
}`,u2=`uniform vec3 color;
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
}`,f2=`uniform float rotation;
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
}`,d2=`uniform vec3 diffuse;
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
}`,yt={alphahash_fragment:LT,alphahash_pars_fragment:OT,alphamap_fragment:PT,alphamap_pars_fragment:IT,alphatest_fragment:zT,alphatest_pars_fragment:BT,aomap_fragment:FT,aomap_pars_fragment:HT,batching_pars_vertex:GT,batching_vertex:VT,begin_vertex:kT,beginnormal_vertex:jT,bsdfs:XT,iridescence_fragment:WT,bumpmap_pars_fragment:qT,clipping_planes_fragment:YT,clipping_planes_pars_fragment:ZT,clipping_planes_pars_vertex:KT,clipping_planes_vertex:QT,color_fragment:JT,color_pars_fragment:$T,color_pars_vertex:eA,color_vertex:tA,common:nA,cube_uv_reflection_fragment:iA,defaultnormal_vertex:aA,displacementmap_pars_vertex:sA,displacementmap_vertex:rA,emissivemap_fragment:oA,emissivemap_pars_fragment:lA,colorspace_fragment:cA,colorspace_pars_fragment:uA,envmap_fragment:fA,envmap_common_pars_fragment:dA,envmap_pars_fragment:hA,envmap_pars_vertex:pA,envmap_physical_pars_fragment:TA,envmap_vertex:mA,fog_vertex:gA,fog_pars_vertex:xA,fog_fragment:vA,fog_pars_fragment:_A,gradientmap_pars_fragment:yA,lightmap_pars_fragment:SA,lights_lambert_fragment:bA,lights_lambert_pars_fragment:MA,lights_pars_begin:EA,lights_toon_fragment:AA,lights_toon_pars_fragment:wA,lights_phong_fragment:CA,lights_phong_pars_fragment:RA,lights_physical_fragment:NA,lights_physical_pars_fragment:DA,lights_fragment_begin:UA,lights_fragment_maps:LA,lights_fragment_end:OA,lightprobes_pars_fragment:PA,logdepthbuf_fragment:IA,logdepthbuf_pars_fragment:zA,logdepthbuf_pars_vertex:BA,logdepthbuf_vertex:FA,map_fragment:HA,map_pars_fragment:GA,map_particle_fragment:VA,map_particle_pars_fragment:kA,metalnessmap_fragment:jA,metalnessmap_pars_fragment:XA,morphinstance_vertex:WA,morphcolor_vertex:qA,morphnormal_vertex:YA,morphtarget_pars_vertex:ZA,morphtarget_vertex:KA,normal_fragment_begin:QA,normal_fragment_maps:JA,normal_pars_fragment:$A,normal_pars_vertex:ew,normal_vertex:tw,normalmap_pars_fragment:nw,clearcoat_normal_fragment_begin:iw,clearcoat_normal_fragment_maps:aw,clearcoat_pars_fragment:sw,iridescence_pars_fragment:rw,opaque_fragment:ow,packing:lw,premultiplied_alpha_fragment:cw,project_vertex:uw,dithering_fragment:fw,dithering_pars_fragment:dw,roughnessmap_fragment:hw,roughnessmap_pars_fragment:pw,shadowmap_pars_fragment:mw,shadowmap_pars_vertex:gw,shadowmap_vertex:xw,shadowmask_pars_fragment:vw,skinbase_vertex:_w,skinning_pars_vertex:yw,skinning_vertex:Sw,skinnormal_vertex:bw,specularmap_fragment:Mw,specularmap_pars_fragment:Ew,tonemapping_fragment:Tw,tonemapping_pars_fragment:Aw,transmission_fragment:ww,transmission_pars_fragment:Cw,uv_pars_fragment:Rw,uv_pars_vertex:Nw,uv_vertex:Dw,worldpos_vertex:Uw,background_vert:Lw,background_frag:Ow,backgroundCube_vert:Pw,backgroundCube_frag:Iw,cube_vert:zw,cube_frag:Bw,depth_vert:Fw,depth_frag:Hw,distance_vert:Gw,distance_frag:Vw,equirect_vert:kw,equirect_frag:jw,linedashed_vert:Xw,linedashed_frag:Ww,meshbasic_vert:qw,meshbasic_frag:Yw,meshlambert_vert:Zw,meshlambert_frag:Kw,meshmatcap_vert:Qw,meshmatcap_frag:Jw,meshnormal_vert:$w,meshnormal_frag:e2,meshphong_vert:t2,meshphong_frag:n2,meshphysical_vert:i2,meshphysical_frag:a2,meshtoon_vert:s2,meshtoon_frag:r2,points_vert:o2,points_frag:l2,shadow_vert:c2,shadow_frag:u2,sprite_vert:f2,sprite_frag:d2},je={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},envMapRotation:{value:new gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new he},probesMax:{value:new he},probesResolution:{value:new he}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},ca={basic:{uniforms:Yn([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:Yn([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new It(0)},envMapIntensity:{value:1}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:Yn([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:Yn([je.common,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.roughnessmap,je.metalnessmap,je.fog,je.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:Yn([je.common,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.gradientmap,je.fog,je.lights,{emissive:{value:new It(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:Yn([je.common,je.bumpmap,je.normalmap,je.displacementmap,je.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:Yn([je.points,je.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:Yn([je.common,je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:Yn([je.common,je.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:Yn([je.common,je.bumpmap,je.normalmap,je.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:Yn([je.sprite,je.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new gt}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distance:{uniforms:Yn([je.common,je.displacementmap,{referencePosition:{value:new he},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distance_vert,fragmentShader:yt.distance_frag},shadow:{uniforms:Yn([je.lights,je.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};ca.physical={uniforms:Yn([ca.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};const Ou={r:0,b:0,g:0},h2=new on,yS=new gt;yS.set(-1,0,0,0,1,0,0,0,1);function p2(o,t,i,s,l,u){const d=new It(0);let h=l===!0?0:1,g,m,y=null,x=0,v=null;function M(L){let k=L.isScene===!0?L.background:null;if(k&&k.isTexture){const R=L.backgroundBlurriness>0;k=t.get(k,R)}return k}function A(L){let k=!1;const R=M(L);R===null?S(d,h):R&&R.isColor&&(S(R,1),k=!0);const U=o.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,u):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,u),(o.autoClear||k)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function N(L,k){const R=M(k);R&&(R.isCubeTexture||R.mapping===$u)?(m===void 0&&(m=new ji(new Fl(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:_o(ca.backgroundCube.uniforms),vertexShader:ca.backgroundCube.vertexShader,fragmentShader:ca.backgroundCube.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(U,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),m.material.uniforms.envMap.value=R,m.material.uniforms.backgroundBlurriness.value=k.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=k.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(h2.makeRotationFromEuler(k.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(yS),m.material.toneMapped=Ot.getTransfer(R.colorSpace)!==Zt,(y!==R||x!==R.version||v!==o.toneMapping)&&(m.material.needsUpdate=!0,y=R,x=R.version,v=o.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null)):R&&R.isTexture&&(g===void 0&&(g=new ji(new tf(2,2),new Xi({name:"BackgroundMaterial",uniforms:_o(ca.background.uniforms),vertexShader:ca.background.vertexShader,fragmentShader:ca.background.fragmentShader,side:ir,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),Object.defineProperty(g.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(g)),g.material.uniforms.t2D.value=R,g.material.uniforms.backgroundIntensity.value=k.backgroundIntensity,g.material.toneMapped=Ot.getTransfer(R.colorSpace)!==Zt,R.matrixAutoUpdate===!0&&R.updateMatrix(),g.material.uniforms.uvTransform.value.copy(R.matrix),(y!==R||x!==R.version||v!==o.toneMapping)&&(g.material.needsUpdate=!0,y=R,x=R.version,v=o.toneMapping),g.layers.enableAll(),L.unshift(g,g.geometry,g.material,0,0,null))}function S(L,k){L.getRGB(Ou,gS(o)),i.buffers.color.setClear(Ou.r,Ou.g,Ou.b,k,u)}function b(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0)}return{getClearColor:function(){return d},setClearColor:function(L,k=1){d.set(L),h=k,S(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(L){h=L,S(d,h)},render:A,addToRenderList:N,dispose:b}}function m2(o,t){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=v(null);let u=l,d=!1;function h(W,ae,q,Y,ne){let Q=!1;const J=x(W,Y,q,ae);u!==J&&(u=J,m(u.object)),Q=M(W,Y,q,ne),Q&&A(W,Y,q,ne),ne!==null&&t.update(ne,o.ELEMENT_ARRAY_BUFFER),(Q||d)&&(d=!1,R(W,ae,q,Y),ne!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(ne).buffer))}function g(){return o.createVertexArray()}function m(W){return o.bindVertexArray(W)}function y(W){return o.deleteVertexArray(W)}function x(W,ae,q,Y){const ne=Y.wireframe===!0;let Q=s[ae.id];Q===void 0&&(Q={},s[ae.id]=Q);const J=W.isInstancedMesh===!0?W.id:0;let me=Q[J];me===void 0&&(me={},Q[J]=me);let ue=me[q.id];ue===void 0&&(ue={},me[q.id]=ue);let O=ue[ne];return O===void 0&&(O=v(g()),ue[ne]=O),O}function v(W){const ae=[],q=[],Y=[];for(let ne=0;ne<i;ne++)ae[ne]=0,q[ne]=0,Y[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:ae,enabledAttributes:q,attributeDivisors:Y,object:W,attributes:{},index:null}}function M(W,ae,q,Y){const ne=u.attributes,Q=ae.attributes;let J=0;const me=q.getAttributes();for(const ue in me)if(me[ue].location>=0){const D=ne[ue];let _e=Q[ue];if(_e===void 0&&(ue==="instanceMatrix"&&W.instanceMatrix&&(_e=W.instanceMatrix),ue==="instanceColor"&&W.instanceColor&&(_e=W.instanceColor)),D===void 0||D.attribute!==_e||_e&&D.data!==_e.data)return!0;J++}return u.attributesNum!==J||u.index!==Y}function A(W,ae,q,Y){const ne={},Q=ae.attributes;let J=0;const me=q.getAttributes();for(const ue in me)if(me[ue].location>=0){let D=Q[ue];D===void 0&&(ue==="instanceMatrix"&&W.instanceMatrix&&(D=W.instanceMatrix),ue==="instanceColor"&&W.instanceColor&&(D=W.instanceColor));const _e={};_e.attribute=D,D&&D.data&&(_e.data=D.data),ne[ue]=_e,J++}u.attributes=ne,u.attributesNum=J,u.index=Y}function N(){const W=u.newAttributes;for(let ae=0,q=W.length;ae<q;ae++)W[ae]=0}function S(W){b(W,0)}function b(W,ae){const q=u.newAttributes,Y=u.enabledAttributes,ne=u.attributeDivisors;q[W]=1,Y[W]===0&&(o.enableVertexAttribArray(W),Y[W]=1),ne[W]!==ae&&(o.vertexAttribDivisor(W,ae),ne[W]=ae)}function L(){const W=u.newAttributes,ae=u.enabledAttributes;for(let q=0,Y=ae.length;q<Y;q++)ae[q]!==W[q]&&(o.disableVertexAttribArray(q),ae[q]=0)}function k(W,ae,q,Y,ne,Q,J){J===!0?o.vertexAttribIPointer(W,ae,q,ne,Q):o.vertexAttribPointer(W,ae,q,Y,ne,Q)}function R(W,ae,q,Y){N();const ne=Y.attributes,Q=q.getAttributes(),J=ae.defaultAttributeValues;for(const me in Q){const ue=Q[me];if(ue.location>=0){let O=ne[me];if(O===void 0&&(me==="instanceMatrix"&&W.instanceMatrix&&(O=W.instanceMatrix),me==="instanceColor"&&W.instanceColor&&(O=W.instanceColor)),O!==void 0){const D=O.normalized,_e=O.itemSize,we=t.get(O);if(we===void 0)continue;const B=we.buffer,re=we.type,Se=we.bytesPerElement,G=re===o.INT||re===o.UNSIGNED_INT||O.gpuType===vm;if(O.isInterleavedBufferAttribute){const ee=O.data,be=ee.stride,Ne=O.offset;if(ee.isInstancedInterleavedBuffer){for(let ge=0;ge<ue.locationSize;ge++)b(ue.location+ge,ee.meshPerAttribute);W.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ge=0;ge<ue.locationSize;ge++)S(ue.location+ge);o.bindBuffer(o.ARRAY_BUFFER,B);for(let ge=0;ge<ue.locationSize;ge++)k(ue.location+ge,_e/ue.locationSize,re,D,be*Se,(Ne+_e/ue.locationSize*ge)*Se,G)}else{if(O.isInstancedBufferAttribute){for(let ee=0;ee<ue.locationSize;ee++)b(ue.location+ee,O.meshPerAttribute);W.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let ee=0;ee<ue.locationSize;ee++)S(ue.location+ee);o.bindBuffer(o.ARRAY_BUFFER,B);for(let ee=0;ee<ue.locationSize;ee++)k(ue.location+ee,_e/ue.locationSize,re,D,_e*Se,_e/ue.locationSize*ee*Se,G)}}else if(J!==void 0){const D=J[me];if(D!==void 0)switch(D.length){case 2:o.vertexAttrib2fv(ue.location,D);break;case 3:o.vertexAttrib3fv(ue.location,D);break;case 4:o.vertexAttrib4fv(ue.location,D);break;default:o.vertexAttrib1fv(ue.location,D)}}}}L()}function U(){I();for(const W in s){const ae=s[W];for(const q in ae){const Y=ae[q];for(const ne in Y){const Q=Y[ne];for(const J in Q)y(Q[J].object),delete Q[J];delete Y[ne]}}delete s[W]}}function P(W){if(s[W.id]===void 0)return;const ae=s[W.id];for(const q in ae){const Y=ae[q];for(const ne in Y){const Q=Y[ne];for(const J in Q)y(Q[J].object),delete Q[J];delete Y[ne]}}delete s[W.id]}function F(W){for(const ae in s){const q=s[ae];for(const Y in q){const ne=q[Y];if(ne[W.id]===void 0)continue;const Q=ne[W.id];for(const J in Q)y(Q[J].object),delete Q[J];delete ne[W.id]}}}function T(W){for(const ae in s){const q=s[ae],Y=W.isInstancedMesh===!0?W.id:0,ne=q[Y];if(ne!==void 0){for(const Q in ne){const J=ne[Q];for(const me in J)y(J[me].object),delete J[me];delete ne[Q]}delete q[Y],Object.keys(q).length===0&&delete s[ae]}}}function I(){j(),d=!0,u!==l&&(u=l,m(u.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:I,resetDefaultState:j,dispose:U,releaseStatesOfGeometry:P,releaseStatesOfObject:T,releaseStatesOfProgram:F,initAttributes:N,enableAttribute:S,disableUnusedAttributes:L}}function g2(o,t,i){let s;function l(g){s=g}function u(g,m){o.drawArrays(s,g,m),i.update(m,s,1)}function d(g,m,y){y!==0&&(o.drawArraysInstanced(s,g,m,y),i.update(m,s,y))}function h(g,m,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,g,0,m,0,y);let v=0;for(let M=0;M<y;M++)v+=m[M];i.update(v,s,1)}this.setMode=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function x2(o,t,i,s){let l;function u(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const F=t.get("EXT_texture_filter_anisotropic");l=o.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(F){return!(F!==Vi&&s.convert(F)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(F){const T=F===ma&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(F!==mi&&F!==fa&&!T&&s.convert(F)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE))}function g(F){if(F==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const y=g(m);y!==m&&(dt("WebGLRenderer:",m,"not supported, using",y,"instead."),m=y);const x=i.logarithmicDepthBuffer===!0,v=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&v===!1&&dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),A=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),N=o.getParameter(o.MAX_TEXTURE_SIZE),S=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),b=o.getParameter(o.MAX_VERTEX_ATTRIBS),L=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),k=o.getParameter(o.MAX_VARYING_VECTORS),R=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),U=o.getParameter(o.MAX_SAMPLES),P=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:g,textureFormatReadable:d,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:x,reversedDepthBuffer:v,maxTextures:M,maxVertexTextures:A,maxTextureSize:N,maxCubemapSize:S,maxAttributes:b,maxVertexUniforms:L,maxVaryings:k,maxFragmentUniforms:R,maxSamples:U,samples:P}}function v2(o){const t=this;let i=null,s=0,l=!1,u=!1;const d=new Ss,h=new gt,g={value:null,needsUpdate:!1};this.uniform=g,this.numPlanes=0,this.numIntersection=0,this.init=function(x,v){const M=x.length!==0||v||s!==0||l;return l=v,s=x.length,M},this.beginShadows=function(){u=!0,y(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(x,v){i=y(x,v,0)},this.setState=function(x,v,M){const A=x.clippingPlanes,N=x.clipIntersection,S=x.clipShadows,b=o.get(x);if(!l||A===null||A.length===0||u&&!S)u?y(null):m();else{const L=u?0:s,k=L*4;let R=b.clippingState||null;g.value=R,R=y(A,v,k,M);for(let U=0;U!==k;++U)R[U]=i[U];b.clippingState=R,this.numIntersection=N?this.numPlanes:0,this.numPlanes+=L}};function m(){g.value!==i&&(g.value=i,g.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function y(x,v,M,A){const N=x!==null?x.length:0;let S=null;if(N!==0){if(S=g.value,A!==!0||S===null){const b=M+N*4,L=v.matrixWorldInverse;h.getNormalMatrix(L),(S===null||S.length<b)&&(S=new Float32Array(b));for(let k=0,R=M;k!==N;++k,R+=4)d.copy(x[k]).applyMatrix4(L,h),d.normal.toArray(S,R),S[R+3]=d.constant}g.value=S,g.needsUpdate=!0}return t.numPlanes=N,t.numIntersection=0,S}}const mo=4,_2=6,y2=20,S2=256,Al=new Rm,N_=new It;let dp=null,hp=0,pp=0,mp=!1;const b2=new he,er=new he;class D_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,u={}){const{size:d=256,position:h=b2}=u;dp=this._renderer.getRenderTarget(),hp=this._renderer.getActiveCubeFace(),pp=this._renderer.getActiveMipmapLevel(),mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const g=this._allocateTargets();return g.depthBuffer=!0,this._sceneToCubeUV(t,s,l,g,h),i>0&&this._blur(g,0,0,i),this._applyPMREM(g),this._cleanup(g),g}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=O_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=L_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(dp,hp,pp),this._renderer.xr.enabled=mp,t.scissorTest=!1,ho(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===ar||t.mapping===vo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),dp=this._renderer.getRenderTarget(),hp=this._renderer.getActiveCubeFace(),pp=this._renderer.getActiveMipmapLevel(),mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:ma,format:Vi,colorSpace:Xu,depthBuffer:!1},l=U_(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=U_(t,i,s);const{_lodMax:u}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=M2(u)),this._blurMaterial=T2(u,t,i),this._ggxMaterial=E2(u,t,i)}return l}_compileMaterial(t){const i=new ji(new gi,t);this._renderer.compile(i,Al)}_sceneToCubeUV(t,i,s,l,u){const g=new Ri(90,1,i,s),m=[1,-1,1,1,1,1],y=[1,1,1,-1,-1,-1],x=this._renderer,v=x.autoClear,M=x.toneMapping;x.getClearColor(N_),x.toneMapping=ha,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(l),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ji(new Fl,new dS({name:"PMREM.Background",side:Zn,depthWrite:!1,depthTest:!1})));const N=this._backgroundBox,S=N.material;let b=!1;const L=t.background;L?L.isColor&&(S.color.copy(L),t.background=null,b=!0):(S.color.copy(N_),b=!0);for(let k=0;k<6;k++){const R=k%3;R===0?(g.up.set(0,m[k],0),g.position.set(u.x,u.y,u.z),g.lookAt(u.x+y[k],u.y,u.z)):R===1?(g.up.set(0,0,m[k]),g.position.set(u.x,u.y,u.z),g.lookAt(u.x,u.y+y[k],u.z)):(g.up.set(0,m[k],0),g.position.set(u.x,u.y,u.z),g.lookAt(u.x,u.y,u.z+y[k]));const U=this._cubeSize;ho(l,R*U,k>2?U:0,U,U),x.setRenderTarget(l),b&&x.render(N,g),x.render(t,g)}x.toneMapping=M,x.autoClear=v,t.background=L}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===ar||t.mapping===vo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=O_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=L_());const u=l?this._cubemapMaterial:this._equirectMaterial,d=this._lodMeshes[0];d.material=u;const h=u.uniforms;h.envMap.value=t;const g=this._cubeSize;ho(i,0,0,3*g,2*g),s.setRenderTarget(i),s.render(d,Al)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let u=1;u<l;u++)this._applyGGXFilter(t,u-1,u);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,u=this._pingPongRenderTarget,d=this._ggxMaterial,h=this._lodMeshes[s];h.material=d;const g=d.uniforms,m=s/(this._lodMeshes.length-1),y=i/(this._lodMeshes.length-1),x=Math.sqrt(m*m-y*y),v=m*1.25,M=x*v,{_lodMax:A}=this,N=this._sizeLods[s],S=3*N*(s>A-mo?s-A+mo:0),b=4*(this._cubeSize-N);g.envMap.value=t.texture,g.roughness.value=M,g.mipInt.value=A-i,ho(u,S,b,3*N,2*N),l.setRenderTarget(u),l.render(h,Al),g.envMap.value=u.texture,g.roughness.value=0,g.mipInt.value=A-s,ho(t,S,b,3*N,2*N),l.setRenderTarget(t),l.render(h,Al)}_blur(t,i,s,l){const u=this._pingPongRenderTarget,d=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,u,i,s,d),this._blurPass(u,t,s,s,d)}_blurPass(t,i,s,l,u){const d=this._renderer,h=this._blurMaterial,g=this._lodMeshes[l];g.material=h;const m=h.uniforms;m.envMap.value=t.texture,m.sigma.value=u,m.mipInt.value=this._lodMax-s;const y=this._sizeLods[l],x=3*y*(l>this._lodMax-mo?l-this._lodMax+mo:0),v=4*(this._cubeSize-y);ho(i,x,v,3*y,2*y),d.setRenderTarget(i),d.render(g,Al)}}function M2(o){const t=[],i=[];let s=o;const l=o-mo+1+_2;for(let u=0;u<l;u++){const d=Math.pow(2,s);t.push(d);const h=1/(d-2),g=-h,m=1+h,y=[g,g,m,g,m,m,g,g,m,m,g,m],x=6,v=6,M=3,A=new Float32Array(M*v*x),N=new Float32Array(M*v*x);for(let b=0;b<x;b++){const L=b%3*2/3-1,k=b>2?0:-1,R=[L,k,0,L+2/3,k,0,L+2/3,k+1,0,L,k,0,L+2/3,k+1,0,L,k+1,0];A.set(R,M*v*b);for(let U=0;U<v;U++){const P=y[U*2]*2-1,F=y[U*2+1]*2-1;b===0?er.set(1,F,P):b===1?er.set(-P,1,-F):b===2?er.set(-P,F,1):b===3?er.set(-1,F,-P):b===4?er.set(-P,-1,F):er.set(P,F,-1),er.toArray(N,(b*v+U)*M)}}const S=new gi;S.setAttribute("position",new Di(A,M)),S.setAttribute("outputDirection",new Di(N,M)),i.push(new ji(S,null)),s>mo&&s--}return{lodMeshes:i,sizeLods:t}}function U_(o,t,i){const s=new ki(o,t,i);return s.texture.mapping=$u,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function ho(o,t,i,s,l){o.viewport.set(t,i,s,l),o.scissor.set(t,i,s,l)}function E2(o,t,i){return new Xi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:S2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:nf(),fragmentShader:`

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
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function T2(o,t,i){return new Xi({name:"SphericalGaussianBlur",defines:{SAMPLES:y2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:nf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function L_(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nf(),fragmentShader:`

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
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function O_(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function nf(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class SS extends ki{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new pS(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Fl(5,5,5),u=new Xi({name:"CubemapFromEquirect",uniforms:_o(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Zn,blending:Fa});u.uniforms.tEquirect.value=i;const d=new ji(l,u),h=i.minFilter;return i.minFilter===tr&&(i.minFilter=Gn),new RT(1,10,this).update(t,d),i.minFilter=h,d.geometry.dispose(),d.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const u=t.getRenderTarget();for(let d=0;d<6;d++)t.setRenderTarget(this,d),t.clear(i,s,l);t.setRenderTarget(u)}}function A2(o){let t=new WeakMap,i=new WeakMap,s=null;function l(v,M=!1){return v==null?null:M?d(v):u(v)}function u(v){if(v&&v.isTexture){const M=v.mapping;if(M===zh||M===Bh)if(t.has(v)){const A=t.get(v).texture;return h(A,v.mapping)}else{const A=v.image;if(A&&A.height>0){const N=new SS(A.height);return N.fromEquirectangularTexture(o,v),t.set(v,N),v.addEventListener("dispose",m),h(N.texture,v.mapping)}else return null}}return v}function d(v){if(v&&v.isTexture){const M=v.mapping,A=M===zh||M===Bh,N=M===ar||M===vo;if(A||N){let S=i.get(v);const b=S!==void 0?S.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==b)return s===null&&(s=new D_(o)),S=A?s.fromEquirectangular(v,S):s.fromCubemap(v,S),S.texture.pmremVersion=v.pmremVersion,i.set(v,S),S.texture;if(S!==void 0)return S.texture;{const L=v.image;return A&&L&&L.height>0||N&&L&&g(L)?(s===null&&(s=new D_(o)),S=A?s.fromEquirectangular(v):s.fromCubemap(v),S.texture.pmremVersion=v.pmremVersion,i.set(v,S),v.addEventListener("dispose",y),S.texture):null}}}return v}function h(v,M){return M===zh?v.mapping=ar:M===Bh&&(v.mapping=vo),v}function g(v){let M=0;const A=6;for(let N=0;N<A;N++)v[N]!==void 0&&M++;return M===A}function m(v){const M=v.target;M.removeEventListener("dispose",m);const A=t.get(M);A!==void 0&&(t.delete(M),A.dispose())}function y(v){const M=v.target;M.removeEventListener("dispose",y);const A=i.get(M);A!==void 0&&(i.delete(M),A.dispose())}function x(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:x}}function w2(o){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=o.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&go("WebGLRenderer: "+s+" extension not supported."),l}}}function C2(o,t,i,s){const l={},u=new WeakMap;function d(x){const v=x.target;v.index!==null&&t.remove(v.index);for(const A in v.attributes)t.remove(v.attributes[A]);v.removeEventListener("dispose",d),delete l[v.id];const M=u.get(v);M&&(t.remove(M),u.delete(v)),s.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,i.memory.geometries--}function h(x,v){return l[v.id]===!0||(v.addEventListener("dispose",d),l[v.id]=!0,i.memory.geometries++),v}function g(x){const v=x.attributes;for(const M in v)t.update(v[M],o.ARRAY_BUFFER)}function m(x){const v=[],M=x.index,A=x.attributes.position;let N=0;if(A===void 0)return;if(M!==null){const L=M.array;N=M.version;for(let k=0,R=L.length;k<R;k+=3){const U=L[k+0],P=L[k+1],F=L[k+2];v.push(U,P,P,F,F,U)}}else{const L=A.array;N=A.version;for(let k=0,R=L.length/3-1;k<R;k+=3){const U=k+0,P=k+1,F=k+2;v.push(U,P,P,F,F,U)}}const S=new(A.count>=65535?lS:oS)(v,1);S.version=N;const b=u.get(x);b&&t.remove(b),u.set(x,S)}function y(x){const v=u.get(x);if(v){const M=x.index;M!==null&&v.version<M.version&&m(x)}else m(x);return u.get(x)}return{get:h,update:g,getWireframeAttribute:y}}function R2(o,t,i){let s;function l(x){s=x}let u,d;function h(x){u=x.type,d=x.bytesPerElement}function g(x,v){o.drawElements(s,v,u,x*d),i.update(v,s,1)}function m(x,v,M){M!==0&&(o.drawElementsInstanced(s,v,u,x*d,M),i.update(v,s,M))}function y(x,v,M){if(M===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,v,0,u,x,0,M);let N=0;for(let S=0;S<M;S++)N+=v[S];i.update(N,s,1)}this.setMode=l,this.setIndex=h,this.render=g,this.renderInstances=m,this.renderMultiDraw=y}function N2(o){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(u,d,h){switch(i.calls++,d){case o.TRIANGLES:i.triangles+=h*(u/3);break;case o.LINES:i.lines+=h*(u/2);break;case o.LINE_STRIP:i.lines+=h*(u-1);break;case o.LINE_LOOP:i.lines+=h*u;break;case o.POINTS:i.points+=h*u;break;default:Ft("WebGLInfo: Unknown draw mode:",d);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function D2(o,t,i){const s=new WeakMap,l=new un;function u(d,h,g){const m=d.morphTargetInfluences,y=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=y!==void 0?y.length:0;let v=s.get(h);if(v===void 0||v.count!==x){let j=function(){T.dispose(),s.delete(h),h.removeEventListener("dispose",j)};var M=j;v!==void 0&&v.texture.dispose();const A=h.morphAttributes.position!==void 0,N=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,b=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],k=h.morphAttributes.color||[];let R=0;A===!0&&(R=1),N===!0&&(R=2),S===!0&&(R=3);let U=h.attributes.position.count*R,P=1;U>t.maxTextureSize&&(P=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const F=new Float32Array(U*P*4*x),T=new aS(F,U,P,x);T.type=fa,T.needsUpdate=!0;const I=R*4;for(let W=0;W<x;W++){const ae=b[W],q=L[W],Y=k[W],ne=U*P*4*W;for(let Q=0;Q<ae.count;Q++){const J=Q*I;A===!0&&(l.fromBufferAttribute(ae,Q),F[ne+J+0]=l.x,F[ne+J+1]=l.y,F[ne+J+2]=l.z,F[ne+J+3]=0),N===!0&&(l.fromBufferAttribute(q,Q),F[ne+J+4]=l.x,F[ne+J+5]=l.y,F[ne+J+6]=l.z,F[ne+J+7]=0),S===!0&&(l.fromBufferAttribute(Y,Q),F[ne+J+8]=l.x,F[ne+J+9]=l.y,F[ne+J+10]=l.z,F[ne+J+11]=Y.itemSize===4?l.w:1)}}v={count:x,texture:T,size:new _t(U,P)},s.set(h,v),h.addEventListener("dispose",j)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)g.getUniforms().setValue(o,"morphTexture",d.morphTexture,i);else{let A=0;for(let S=0;S<m.length;S++)A+=m[S];const N=h.morphTargetsRelative?1:1-A;g.getUniforms().setValue(o,"morphTargetBaseInfluence",N),g.getUniforms().setValue(o,"morphTargetInfluences",m)}g.getUniforms().setValue(o,"morphTargetsTexture",v.texture,i),g.getUniforms().setValue(o,"morphTargetsTextureSize",v.size)}return{update:u}}function U2(o,t,i,s,l){let u=new WeakMap;function d(m){const y=l.render.frame,x=m.geometry,v=t.get(m,x);if(u.get(v)!==y&&(t.update(v),u.set(v,y)),m.isInstancedMesh&&(m.hasEventListener("dispose",g)===!1&&m.addEventListener("dispose",g),u.get(m)!==y&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),u.set(m,y))),m.isSkinnedMesh){const M=m.skeleton;u.get(M)!==y&&(M.update(),u.set(M,y))}return v}function h(){u=new WeakMap}function g(m){const y=m.target;y.removeEventListener("dispose",g),s.releaseStatesOfObject(y),i.remove(y.instanceMatrix),y.instanceColor!==null&&i.remove(y.instanceColor)}return{update:d,dispose:h}}const L2={[Vy]:"LINEAR_TONE_MAPPING",[ky]:"REINHARD_TONE_MAPPING",[jy]:"CINEON_TONE_MAPPING",[xm]:"ACES_FILMIC_TONE_MAPPING",[Wy]:"AGX_TONE_MAPPING",[qy]:"NEUTRAL_TONE_MAPPING",[Xy]:"CUSTOM_TONE_MAPPING"};function O2(o,t,i,s,l,u){const d=new ki(t,i,{type:o,depthBuffer:l,stencilBuffer:u,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,g=null;const m=new gi;m.setAttribute("position",new Ui([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Ui([0,2,0,0,2,0],2));const y=new vT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),x=new ji(m,y),v=new Rm(-1,1,1,-1,0,1);let M=null,A=null,N=!1,S,b=null,L=[],k=!1;this.setSize=function(R,U){d.setSize(R,U),h!==null&&h.setSize(R,U),g!==null&&g.setSize(R,U);for(let P=0;P<L.length;P++){const F=L[P];F.setSize&&F.setSize(R,U)}},this.setEffects=function(R){L=R,k=L.length>0&&L[0].isRenderPass===!0;const U=d.width,P=d.height;L.length>0&&h===null&&(h=new ki(U,P,{type:ma,depthBuffer:!1,stencilBuffer:!1}),g=new ki(U,P,{type:ma,depthBuffer:!1,stencilBuffer:!1}));for(let F=0;F<L.length;F++){const T=L[F];T.setSize&&T.setSize(U,P)}},this.begin=function(R,U){if(N||R.toneMapping===ha&&L.length===0)return!1;if(b=U,U!==null){const P=U.width,F=U.height;(d.width!==P||d.height!==F)&&this.setSize(P,F)}return k===!1&&R.setRenderTarget(d),S=R.toneMapping,R.toneMapping=ha,!0},this.hasRenderPass=function(){return k},this.end=function(R,U){R.toneMapping=S,N=!0;let P=d,F=h;for(let T=0;T<L.length;T++){const I=L[T];I.enabled!==!1&&(I.render(R,F,P,U),I.needsSwap!==!1&&(P=F,F=F===h?g:h))}if(M!==R.outputColorSpace||A!==R.toneMapping){M=R.outputColorSpace,A=R.toneMapping,y.defines={},Ot.getTransfer(M)===Zt&&(y.defines.SRGB_TRANSFER="");const T=L2[A];T&&(y.defines[T]=""),y.needsUpdate=!0}y.uniforms.tDiffuse.value=P.texture,R.setRenderTarget(b),R.render(x,v),b=null,N=!1},this.isCompositing=function(){return N},this.dispose=function(){d.dispose(),h!==null&&h.dispose(),g!==null&&g.dispose(),m.dispose(),y.dispose()}}const bS=new zn,um=new Il(1,1),MS=new aS,ES=new XE,TS=new pS,P_=[],I_=[],z_=new Float32Array(16),B_=new Float32Array(9),F_=new Float32Array(4);function bo(o,t,i){const s=o[0];if(s<=0||s>0)return o;const l=t*i;let u=P_[l];if(u===void 0&&(u=new Float32Array(l),P_[l]=u),t!==0){s.toArray(u,0);for(let d=1,h=0;d!==t;++d)h+=i,o[d].toArray(u,h)}return u}function Mn(o,t){if(o.length!==t.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==t[i])return!1;return!0}function En(o,t){for(let i=0,s=t.length;i<s;i++)o[i]=t[i]}function af(o,t){let i=I_[t];i===void 0&&(i=new Int32Array(t),I_[t]=i);for(let s=0;s!==t;++s)i[s]=o.allocateTextureUnit();return i}function P2(o,t){const i=this.cache;i[0]!==t&&(o.uniform1f(this.addr,t),i[0]=t)}function I2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;o.uniform2fv(this.addr,t),En(i,t)}}function z2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Mn(i,t))return;o.uniform3fv(this.addr,t),En(i,t)}}function B2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;o.uniform4fv(this.addr,t),En(i,t)}}function F2(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;o.uniformMatrix2fv(this.addr,!1,t),En(i,t)}else{if(Mn(i,s))return;F_.set(s),o.uniformMatrix2fv(this.addr,!1,F_),En(i,s)}}function H2(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;o.uniformMatrix3fv(this.addr,!1,t),En(i,t)}else{if(Mn(i,s))return;B_.set(s),o.uniformMatrix3fv(this.addr,!1,B_),En(i,s)}}function G2(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;o.uniformMatrix4fv(this.addr,!1,t),En(i,t)}else{if(Mn(i,s))return;z_.set(s),o.uniformMatrix4fv(this.addr,!1,z_),En(i,s)}}function V2(o,t){const i=this.cache;i[0]!==t&&(o.uniform1i(this.addr,t),i[0]=t)}function k2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;o.uniform2iv(this.addr,t),En(i,t)}}function j2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Mn(i,t))return;o.uniform3iv(this.addr,t),En(i,t)}}function X2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;o.uniform4iv(this.addr,t),En(i,t)}}function W2(o,t){const i=this.cache;i[0]!==t&&(o.uniform1ui(this.addr,t),i[0]=t)}function q2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;o.uniform2uiv(this.addr,t),En(i,t)}}function Y2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Mn(i,t))return;o.uniform3uiv(this.addr,t),En(i,t)}}function Z2(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;o.uniform4uiv(this.addr,t),En(i,t)}}function K2(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let u;this.type===o.SAMPLER_2D_SHADOW?(um.compareFunction=i.isReversedDepthBuffer()?Tm:Em,u=um):u=bS,i.setTexture2D(t||u,l)}function Q2(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||ES,l)}function J2(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||TS,l)}function $2(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||MS,l)}function e3(o){switch(o){case 5126:return P2;case 35664:return I2;case 35665:return z2;case 35666:return B2;case 35674:return F2;case 35675:return H2;case 35676:return G2;case 5124:case 35670:return V2;case 35667:case 35671:return k2;case 35668:case 35672:return j2;case 35669:case 35673:return X2;case 5125:return W2;case 36294:return q2;case 36295:return Y2;case 36296:return Z2;case 35678:case 36198:case 36298:case 36306:case 35682:return K2;case 35679:case 36299:case 36307:return Q2;case 35680:case 36300:case 36308:case 36293:return J2;case 36289:case 36303:case 36311:case 36292:return $2}}function t3(o,t){o.uniform1fv(this.addr,t)}function n3(o,t){const i=bo(t,this.size,2);o.uniform2fv(this.addr,i)}function i3(o,t){const i=bo(t,this.size,3);o.uniform3fv(this.addr,i)}function a3(o,t){const i=bo(t,this.size,4);o.uniform4fv(this.addr,i)}function s3(o,t){const i=bo(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function r3(o,t){const i=bo(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function o3(o,t){const i=bo(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function l3(o,t){o.uniform1iv(this.addr,t)}function c3(o,t){o.uniform2iv(this.addr,t)}function u3(o,t){o.uniform3iv(this.addr,t)}function f3(o,t){o.uniform4iv(this.addr,t)}function d3(o,t){o.uniform1uiv(this.addr,t)}function h3(o,t){o.uniform2uiv(this.addr,t)}function p3(o,t){o.uniform3uiv(this.addr,t)}function m3(o,t){o.uniform4uiv(this.addr,t)}function g3(o,t,i){const s=this.cache,l=t.length,u=af(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),En(s,u));let d;this.type===o.SAMPLER_2D_SHADOW?d=um:d=bS;for(let h=0;h!==l;++h)i.setTexture2D(t[h]||d,u[h])}function x3(o,t,i){const s=this.cache,l=t.length,u=af(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),En(s,u));for(let d=0;d!==l;++d)i.setTexture3D(t[d]||ES,u[d])}function v3(o,t,i){const s=this.cache,l=t.length,u=af(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),En(s,u));for(let d=0;d!==l;++d)i.setTextureCube(t[d]||TS,u[d])}function _3(o,t,i){const s=this.cache,l=t.length,u=af(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),En(s,u));for(let d=0;d!==l;++d)i.setTexture2DArray(t[d]||MS,u[d])}function y3(o){switch(o){case 5126:return t3;case 35664:return n3;case 35665:return i3;case 35666:return a3;case 35674:return s3;case 35675:return r3;case 35676:return o3;case 5124:case 35670:return l3;case 35667:case 35671:return c3;case 35668:case 35672:return u3;case 35669:case 35673:return f3;case 5125:return d3;case 36294:return h3;case 36295:return p3;case 36296:return m3;case 35678:case 36198:case 36298:case 36306:case 35682:return g3;case 35679:case 36299:case 36307:return x3;case 35680:case 36300:case 36308:case 36293:return v3;case 36289:case 36303:case 36311:case 36292:return _3}}class S3{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=e3(i.type)}}class b3{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=y3(i.type)}}class M3{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let u=0,d=l.length;u!==d;++u){const h=l[u];h.setValue(t,i[h.id],s)}}}const gp=/(\w+)(\])?(\[|\.)?/g;function H_(o,t){o.seq.push(t),o.map[t.id]=t}function E3(o,t,i){const s=o.name,l=s.length;for(gp.lastIndex=0;;){const u=gp.exec(s),d=gp.lastIndex;let h=u[1];const g=u[2]==="]",m=u[3];if(g&&(h=h|0),m===void 0||m==="["&&d+2===l){H_(i,m===void 0?new S3(h,o,t):new b3(h,o,t));break}else{let x=i.map[h];x===void 0&&(x=new M3(h),H_(i,x)),i=x}}}class Gu{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let d=0;d<s;++d){const h=t.getActiveUniform(i,d),g=t.getUniformLocation(i,h.name);E3(h,g,this)}const l=[],u=[];for(const d of this.seq)d.type===t.SAMPLER_2D_SHADOW||d.type===t.SAMPLER_CUBE_SHADOW||d.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(d):u.push(d);l.length>0&&(this.seq=l.concat(u))}setValue(t,i,s,l){const u=this.map[i];u!==void 0&&u.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let u=0,d=i.length;u!==d;++u){const h=i[u],g=s[h.id];g.needsUpdate!==!1&&h.setValue(t,g.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,u=t.length;l!==u;++l){const d=t[l];d.id in i&&s.push(d)}return s}}function G_(o,t,i){const s=o.createShader(t);return o.shaderSource(s,i),o.compileShader(s),s}const T3=37297;let A3=0;function w3(o,t){const i=o.split(`
`),s=[],l=Math.max(t-6,0),u=Math.min(t+6,i.length);for(let d=l;d<u;d++){const h=d+1;s.push(`${h===t?">":" "} ${h}: ${i[d]}`)}return s.join(`
`)}const V_=new gt;function C3(o){Ot._getMatrix(V_,Ot.workingColorSpace,o);const t=`mat3( ${V_.elements.map(i=>i.toFixed(4))} )`;switch(Ot.getTransfer(o)){case Wu:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return dt("WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function k_(o,t,i){const s=o.getShaderParameter(t,o.COMPILE_STATUS),u=(o.getShaderInfoLog(t)||"").trim();if(s&&u==="")return"";const d=/ERROR: 0:(\d+)/.exec(u);if(d){const h=parseInt(d[1]);return i.toUpperCase()+`

`+u+`

`+w3(o.getShaderSource(t),h)}else return u}function R3(o,t){const i=C3(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const N3={[Vy]:"Linear",[ky]:"Reinhard",[jy]:"Cineon",[xm]:"ACESFilmic",[Wy]:"AgX",[qy]:"Neutral",[Xy]:"Custom"};function D3(o,t){const i=N3[t];return i===void 0?(dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Pu=new he;function U3(){Ot.getLuminanceCoefficients(Pu);const o=Pu.x.toFixed(4),t=Pu.y.toFixed(4),i=Pu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function L3(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rl).join(`
`)}function O3(o){const t=[];for(const i in o){const s=o[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function P3(o,t){const i={},s=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const u=o.getActiveAttrib(t,l),d=u.name;let h=1;u.type===o.FLOAT_MAT2&&(h=2),u.type===o.FLOAT_MAT3&&(h=3),u.type===o.FLOAT_MAT4&&(h=4),i[d]={type:u.type,location:o.getAttribLocation(t,d),locationSize:h}}return i}function Rl(o){return o!==""}function j_(o,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function X_(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const I3=/^[ \t]*#include +<([\w\d./]+)>/gm;function fm(o){return o.replace(I3,B3)}const z3=new Map;function B3(o,t){let i=yt[t];if(i===void 0){const s=z3.get(t);if(s!==void 0)i=yt[s],dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return fm(i)}const F3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function W_(o){return o.replace(F3,H3)}function H3(o,t,i,s){let l="";for(let u=parseInt(t);u<parseInt(i);u++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function q_(o){let t=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const G3={[Iu]:"SHADOWMAP_TYPE_PCF",[Cl]:"SHADOWMAP_TYPE_VSM"};function V3(o){return G3[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const k3={[ar]:"ENVMAP_TYPE_CUBE",[vo]:"ENVMAP_TYPE_CUBE",[$u]:"ENVMAP_TYPE_CUBE_UV"};function j3(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":k3[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const X3={[vo]:"ENVMAP_MODE_REFRACTION"};function W3(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":X3[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const q3={[Gy]:"ENVMAP_BLENDING_MULTIPLY",[ME]:"ENVMAP_BLENDING_MIX",[EE]:"ENVMAP_BLENDING_ADD"};function Y3(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":q3[o.combine]||"ENVMAP_BLENDING_NONE"}function Z3(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function K3(o,t,i,s){const l=o.getContext(),u=i.defines;let d=i.vertexShader,h=i.fragmentShader;const g=V3(i),m=j3(i),y=W3(i),x=Y3(i),v=Z3(i),M=L3(i),A=O3(u),N=l.createProgram();let S,b,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(Rl).join(`
`),S.length>0&&(S+=`
`),b=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(Rl).join(`
`),b.length>0&&(b+=`
`)):(S=[q_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+y:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+g:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rl).join(`
`),b=[q_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+y:"",i.envMap?"#define "+x:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+g:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ha?"#define TONE_MAPPING":"",i.toneMapping!==ha?yt.tonemapping_pars_fragment:"",i.toneMapping!==ha?D3("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,R3("linearToOutputTexel",i.outputColorSpace),U3(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Rl).join(`
`)),d=fm(d),d=j_(d,i),d=X_(d,i),h=fm(h),h=j_(h,i),h=X_(h,i),d=W_(d),h=W_(h),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,b=["#define varying in",i.glslVersion===t_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===t_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const k=L+S+d,R=L+b+h,U=G_(l,l.VERTEX_SHADER,k),P=G_(l,l.FRAGMENT_SHADER,R);l.attachShader(N,U),l.attachShader(N,P),i.index0AttributeName!==void 0?l.bindAttribLocation(N,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(N,0,"position"),l.linkProgram(N);function F(W){if(o.debug.checkShaderErrors){const ae=l.getProgramInfoLog(N)||"",q=l.getShaderInfoLog(U)||"",Y=l.getShaderInfoLog(P)||"",ne=ae.trim(),Q=q.trim(),J=Y.trim();let me=!0,ue=!0;if(l.getProgramParameter(N,l.LINK_STATUS)===!1)if(me=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,N,U,P);else{const O=k_(l,U,"vertex"),D=k_(l,P,"fragment");Ft("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(N,l.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+ne+`
`+O+`
`+D)}else ne!==""?dt("WebGLProgram: Program Info Log:",ne):(Q===""||J==="")&&(ue=!1);ue&&(W.diagnostics={runnable:me,programLog:ne,vertexShader:{log:Q,prefix:S},fragmentShader:{log:J,prefix:b}})}l.deleteShader(U),l.deleteShader(P),T=new Gu(l,N),I=P3(l,N)}let T;this.getUniforms=function(){return T===void 0&&F(this),T};let I;this.getAttributes=function(){return I===void 0&&F(this),I};let j=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=l.getProgramParameter(N,T3)),j},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(N),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=A3++,this.cacheKey=t,this.usedTimes=1,this.program=N,this.vertexShader=U,this.fragmentShader=P,this}let Q3=0;class J3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,s){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new $3(t),i.set(t,s)),s}}class $3{constructor(t){this.id=Q3++,this.code=t,this.usedTimes=0}}function eC(o){return o===sr||o===ku||o===ju}function tC(o,t,i,s,l,u){const d=new sS,h=new J3,g=new Set,m=[],y=new Map,x=s.logarithmicDepthBuffer;let v=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(T){return g.add(T),T===0?"uv":`uv${T}`}function N(T,I,j,W,ae,q){const Y=W.fog,ne=ae.geometry,Q=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?W.environment:null,J=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,me=t.get(T.envMap||Q,J),ue=me&&me.mapping===$u?me.image.height:null,O=M[T.type];T.precision!==null&&(v=s.getMaxPrecision(T.precision),v!==T.precision&&dt("WebGLProgram.getParameters:",T.precision,"not supported, using",v,"instead."));const D=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,_e=D!==void 0?D.length:0;let we=0;ne.morphAttributes.position!==void 0&&(we=1),ne.morphAttributes.normal!==void 0&&(we=2),ne.morphAttributes.color!==void 0&&(we=3);let B,re,Se,G;if(O){const Ut=ca[O];B=Ut.vertexShader,re=Ut.fragmentShader}else{B=T.vertexShader,re=T.fragmentShader;const Ut=h.getVertexShaderStage(T),pt=h.getFragmentShaderStage(T);h.update(T,Ut,pt),Se=Ut.id,G=pt.id}const ee=o.getRenderTarget(),be=o.state.buffers.depth.getReversed(),Ne=ae.isInstancedMesh===!0,ge=ae.isBatchedMesh===!0,Ce=!!T.map,ut=!!T.matcap,Ge=!!me,st=!!T.aoMap,lt=!!T.lightMap,Je=!!T.bumpMap&&T.wireframe===!1,nt=!!T.normalMap,Et=!!T.displacementMap,Ht=!!T.emissiveMap,zt=!!T.metalnessMap,$t=!!T.roughnessMap,Z=T.anisotropy>0,tn=T.clearcoat>0,Dt=T.dispersion>0,z=T.retroreflectivity>0,E=T.iridescence>0,se=T.sheen>0,le=T.transmission>0,ve=Z&&!!T.anisotropyMap,De=tn&&!!T.clearcoatMap,Ue=tn&&!!T.clearcoatNormalMap,ye=tn&&!!T.clearcoatRoughnessMap,Ae=E&&!!T.iridescenceMap,Oe=E&&!!T.iridescenceThicknessMap,it=se&&!!T.sheenColorMap,He=se&&!!T.sheenRoughnessMap,Fe=!!T.specularMap,qe=!!T.specularColorMap,rt=!!T.specularIntensityMap,ht=le&&!!T.transmissionMap,K=le&&!!T.thicknessMap,Le=!!T.gradientMap,Te=!!T.alphaMap,Ie=T.alphaTest>0,We=!!T.alphaHash,Re=!!T.extensions;let tt=ha;T.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(tt=o.toneMapping);const Xe={shaderID:O,shaderType:T.type,shaderName:T.name,vertexShader:B,fragmentShader:re,defines:T.defines,customVertexShaderID:Se,customFragmentShaderID:G,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:v,batching:ge,batchingColor:ge&&ae._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&ae.instanceColor!==null,instancingMorph:Ne&&ae.morphTexture!==null,outputColorSpace:ee===null?o.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ot.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Ce,matcap:ut,envMap:Ge,envMapMode:Ge&&me.mapping,envMapCubeUVHeight:ue,aoMap:st,lightMap:lt,bumpMap:Je,normalMap:nt,displacementMap:Et,emissiveMap:Ht,normalMapObjectSpace:nt&&T.normalMapType===wE,normalMapTangentSpace:nt&&T.normalMapType===om,packedNormalMap:nt&&T.normalMapType===om&&eC(T.normalMap.format),metalnessMap:zt,roughnessMap:$t,anisotropy:Z,anisotropyMap:ve,clearcoat:tn,clearcoatMap:De,clearcoatNormalMap:Ue,clearcoatRoughnessMap:ye,dispersion:Dt,retroreflection:z,iridescence:E,iridescenceMap:Ae,iridescenceThicknessMap:Oe,sheen:se,sheenColorMap:it,sheenRoughnessMap:He,specularMap:Fe,specularColorMap:qe,specularIntensityMap:rt,transmission:le,transmissionMap:ht,thicknessMap:K,gradientMap:Le,opaque:T.transparent===!1&&T.blending===Nl&&T.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ie,alphaHash:We,combine:T.combine,mapUv:Ce&&A(T.map.channel),aoMapUv:st&&A(T.aoMap.channel),lightMapUv:lt&&A(T.lightMap.channel),bumpMapUv:Je&&A(T.bumpMap.channel),normalMapUv:nt&&A(T.normalMap.channel),displacementMapUv:Et&&A(T.displacementMap.channel),emissiveMapUv:Ht&&A(T.emissiveMap.channel),metalnessMapUv:zt&&A(T.metalnessMap.channel),roughnessMapUv:$t&&A(T.roughnessMap.channel),anisotropyMapUv:ve&&A(T.anisotropyMap.channel),clearcoatMapUv:De&&A(T.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&A(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&A(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&A(T.iridescenceMap.channel),iridescenceThicknessMapUv:Oe&&A(T.iridescenceThicknessMap.channel),sheenColorMapUv:it&&A(T.sheenColorMap.channel),sheenRoughnessMapUv:He&&A(T.sheenRoughnessMap.channel),specularMapUv:Fe&&A(T.specularMap.channel),specularColorMapUv:qe&&A(T.specularColorMap.channel),specularIntensityMapUv:rt&&A(T.specularIntensityMap.channel),transmissionMapUv:ht&&A(T.transmissionMap.channel),thicknessMapUv:K&&A(T.thicknessMap.channel),alphaMapUv:Te&&A(T.alphaMap.channel),vertexTangents:!!ne.attributes.tangent&&(nt||Z),vertexNormals:!!ne.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,pointsUvs:ae.isPoints===!0&&!!ne.attributes.uv&&(Ce||Te),fog:!!Y,useFog:T.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||ne.attributes.normal===void 0&&nt===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:be,skinning:ae.isSkinnedMesh===!0,hasPositionAttribute:ne.attributes.position!==void 0,morphTargets:ne.morphAttributes.position!==void 0,morphNormals:ne.morphAttributes.normal!==void 0,morphColors:ne.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:we,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:T.dithering,shadowMapEnabled:o.shadowMap.enabled&&j.length>0,shadowMapType:o.shadowMap.type,toneMapping:tt,decodeVideoTexture:Ce&&T.map.isVideoTexture===!0&&Ot.getTransfer(T.map.colorSpace)===Zt,decodeVideoTextureEmissive:Ht&&T.emissiveMap.isVideoTexture===!0&&Ot.getTransfer(T.emissiveMap.colorSpace)===Zt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ia,flipSided:T.side===Zn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Re&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&T.extensions.multiDraw===!0||ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Xe.vertexUv1s=g.has(1),Xe.vertexUv2s=g.has(2),Xe.vertexUv3s=g.has(3),g.clear(),Xe}function S(T){const I=[];if(T.shaderID?I.push(T.shaderID):(I.push(T.customVertexShaderID),I.push(T.customFragmentShaderID)),T.defines!==void 0)for(const j in T.defines)I.push(j),I.push(T.defines[j]);return T.isRawShaderMaterial===!1&&(b(I,T),L(I,T),I.push(o.outputColorSpace)),I.push(T.customProgramCacheKey),I.join()}function b(T,I){T.push(I.precision),T.push(I.outputColorSpace),T.push(I.envMapMode),T.push(I.envMapCubeUVHeight),T.push(I.mapUv),T.push(I.alphaMapUv),T.push(I.lightMapUv),T.push(I.aoMapUv),T.push(I.bumpMapUv),T.push(I.normalMapUv),T.push(I.displacementMapUv),T.push(I.emissiveMapUv),T.push(I.metalnessMapUv),T.push(I.roughnessMapUv),T.push(I.anisotropyMapUv),T.push(I.clearcoatMapUv),T.push(I.clearcoatNormalMapUv),T.push(I.clearcoatRoughnessMapUv),T.push(I.iridescenceMapUv),T.push(I.iridescenceThicknessMapUv),T.push(I.sheenColorMapUv),T.push(I.sheenRoughnessMapUv),T.push(I.specularMapUv),T.push(I.specularColorMapUv),T.push(I.specularIntensityMapUv),T.push(I.transmissionMapUv),T.push(I.thicknessMapUv),T.push(I.combine),T.push(I.fogExp2),T.push(I.sizeAttenuation),T.push(I.morphTargetsCount),T.push(I.morphAttributeCount),T.push(I.numSunLights),T.push(I.numDirLights),T.push(I.numPointLights),T.push(I.numSpotLights),T.push(I.numSpotLightMaps),T.push(I.numHemiLights),T.push(I.numRectAreaLights),T.push(I.numSunLightShadows),T.push(I.numDirLightShadows),T.push(I.numPointLightShadows),T.push(I.numSpotLightShadows),T.push(I.numSpotLightShadowsWithMaps),T.push(I.numLightProbes),T.push(I.shadowMapType),T.push(I.toneMapping),T.push(I.numClippingPlanes),T.push(I.numClipIntersection),T.push(I.depthPacking)}function L(T,I){d.disableAll(),I.instancing&&d.enable(0),I.instancingColor&&d.enable(1),I.instancingMorph&&d.enable(2),I.matcap&&d.enable(3),I.envMap&&d.enable(4),I.normalMapObjectSpace&&d.enable(5),I.normalMapTangentSpace&&d.enable(6),I.clearcoat&&d.enable(7),I.iridescence&&d.enable(8),I.alphaTest&&d.enable(9),I.vertexColors&&d.enable(10),I.vertexAlphas&&d.enable(11),I.vertexUv1s&&d.enable(12),I.vertexUv2s&&d.enable(13),I.vertexUv3s&&d.enable(14),I.vertexTangents&&d.enable(15),I.anisotropy&&d.enable(16),I.alphaHash&&d.enable(17),I.batching&&d.enable(18),I.dispersion&&d.enable(19),I.retroreflection&&d.enable(24),I.batchingColor&&d.enable(20),I.gradientMap&&d.enable(21),I.packedNormalMap&&d.enable(22),I.vertexNormals&&d.enable(23),T.push(d.mask),d.disableAll(),I.fog&&d.enable(0),I.useFog&&d.enable(1),I.flatShading&&d.enable(2),I.logarithmicDepthBuffer&&d.enable(3),I.reversedDepthBuffer&&d.enable(4),I.skinning&&d.enable(5),I.morphTargets&&d.enable(6),I.morphNormals&&d.enable(7),I.morphColors&&d.enable(8),I.premultipliedAlpha&&d.enable(9),I.shadowMapEnabled&&d.enable(10),I.doubleSided&&d.enable(11),I.flipSided&&d.enable(12),I.useDepthPacking&&d.enable(13),I.dithering&&d.enable(14),I.transmission&&d.enable(15),I.sheen&&d.enable(16),I.opaque&&d.enable(17),I.pointsUvs&&d.enable(18),I.decodeVideoTexture&&d.enable(19),I.decodeVideoTextureEmissive&&d.enable(20),I.alphaToCoverage&&d.enable(21),I.numLightProbeGrids>0&&d.enable(22),I.hasPositionAttribute&&d.enable(23),T.push(d.mask)}function k(T){const I=M[T.type];let j;if(I){const W=ca[I];j=mT.clone(W.uniforms)}else j=T.uniforms;return j}function R(T,I){let j=y.get(I);return j!==void 0?++j.usedTimes:(j=new K3(o,I,T,l),m.push(j),y.set(I,j)),j}function U(T){if(--T.usedTimes===0){const I=m.indexOf(T);m[I]=m[m.length-1],m.pop(),y.delete(T.cacheKey),T.destroy()}}function P(T){h.remove(T)}function F(){h.dispose()}return{getParameters:N,getProgramCacheKey:S,getUniforms:k,acquireProgram:R,releaseProgram:U,releaseShaderCache:P,programs:m,dispose:F}}function nC(){let o=new WeakMap;function t(d){return o.has(d)}function i(d){let h=o.get(d);return h===void 0&&(h={},o.set(d,h)),h}function s(d){o.delete(d)}function l(d,h,g){o.get(d)[h]=g}function u(){o=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:u}}function iC(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.materialVariant!==t.materialVariant?o.materialVariant-t.materialVariant:o.z!==t.z?o.z-t.z:o.id-t.id}function Y_(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function Z_(){const o=[];let t=0;const i=[],s=[],l=[];function u(){t=0,i.length=0,s.length=0,l.length=0}function d(v){let M=0;return v.isInstancedMesh&&(M+=2),v.isSkinnedMesh&&(M+=1),M}function h(v,M,A,N,S,b){let L=o[t];return L===void 0?(L={id:v.id,object:v,geometry:M,material:A,materialVariant:d(v),groupOrder:N,renderOrder:v.renderOrder,z:S,group:b},o[t]=L):(L.id=v.id,L.object=v,L.geometry=M,L.material=A,L.materialVariant=d(v),L.groupOrder=N,L.renderOrder=v.renderOrder,L.z=S,L.group=b),t++,L}function g(v,M,A,N,S,b,L){L.reversedDepth===!0&&(S=-S);const k=h(v,M,A,N,S,b);A.transmission>0?s.push(k):A.transparent===!0?l.push(k):i.push(k)}function m(v,M,A,N,S,b){const L=h(v,M,A,N,S,b);A.transmission>0?s.unshift(L):A.transparent===!0?l.unshift(L):i.unshift(L)}function y(v,M){i.length>1&&i.sort(v||iC),s.length>1&&s.sort(M||Y_),l.length>1&&l.sort(M||Y_)}function x(){for(let v=t,M=o.length;v<M;v++){const A=o[v];if(A.id===null)break;A.id=null,A.object=null,A.geometry=null,A.material=null,A.group=null}}return{opaque:i,transmissive:s,transparent:l,init:u,push:g,unshift:m,finish:x,sort:y}}function aC(){let o=new WeakMap;function t(s,l){const u=o.get(s);let d;return u===void 0?(d=new Z_,o.set(s,[d])):l>=u.length?(d=new Z_,u.push(d)):d=u[l],d}function i(){o=new WeakMap}return{get:t,dispose:i}}function sC(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new he,color:new It};break;case"SpotLight":i={position:new he,direction:new he,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new he,color:new It,distance:0,decay:0};break;case"HemisphereLight":i={direction:new he,skyColor:new It,groundColor:new It};break;case"RectAreaLight":i={color:new It,position:new he,halfWidth:new he,halfHeight:new he};break}return o[t.id]=i,i}}}function rC(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=i,i}}}let oC=0;function lC(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function cC(o){const t=new sC,i=rC(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new he);const l=new he,u=new on,d=new on;function h(m){let y=0,x=0,v=0;for(let ae=0;ae<9;ae++)s.probe[ae].set(0,0,0);let M=0,A=0,N=0,S=0,b=0,L=0,k=0,R=0,U=0,P=0,F=0,T=0,I=0,j=0;m.sort(lC);for(let ae=0,q=m.length;ae<q;ae++){const Y=m[ae],ne=Y.color,Q=Y.intensity,J=Y.distance;let me=null;if(Y.shadow&&Y.shadow.map&&(Y.shadow.map.texture.format===sr?me=Y.shadow.map.texture:me=Y.shadow.map.depthTexture||Y.shadow.map.texture),Y.isAmbientLight)y+=ne.r*Q,x+=ne.g*Q,v+=ne.b*Q;else if(Y.isLightProbe){for(let ue=0;ue<9;ue++)s.probe[ue].addScaledVector(Y.sh.coefficients[ue],Q);j++}else if(Y.isSunLight){const ue=t.get(Y);if(ue.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const O=Y.shadow,D=i.get(Y);D.shadowIntensity=O.intensity,D.shadowBias=O.bias,D.shadowNormalBias=O.normalBias,D.shadowRadius=O.radius,D.shadowMapSize.copy(O.mapSize).multiply(O.getFrameExtents()),s.sunShadow[A]=D,s.sunShadowMap[A]=me;const _e=O.getViewportCount();for(let we=0;we<_e;we++)s.sunShadowMatrix[N+we]=O.getMatrix(we),s.sunShadowCascade[N+we]=O._cascadeData[we];N+=_e,A++}s.sun[M]=ue,M++}else if(Y.isDirectionalLight){const ue=t.get(Y);if(ue.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const O=Y.shadow,D=i.get(Y);D.shadowIntensity=O.intensity,D.shadowBias=O.bias,D.shadowNormalBias=O.normalBias,D.shadowRadius=O.radius,D.shadowMapSize=O.mapSize,s.directionalShadow[S]=D,s.directionalShadowMap[S]=me,s.directionalShadowMatrix[S]=Y.shadow.matrix,U++}s.directional[S]=ue,S++}else if(Y.isSpotLight){const ue=t.get(Y);ue.position.setFromMatrixPosition(Y.matrixWorld),ue.color.copy(ne).multiplyScalar(Q),ue.distance=J,ue.coneCos=Math.cos(Y.angle),ue.penumbraCos=Math.cos(Y.angle*(1-Y.penumbra)),ue.decay=Y.decay,s.spot[L]=ue;const O=Y.shadow;if(Y.map&&(s.spotLightMap[T]=Y.map,T++,O.updateMatrices(Y),Y.castShadow&&I++),s.spotLightMatrix[L]=O.matrix,Y.castShadow){const D=i.get(Y);D.shadowIntensity=O.intensity,D.shadowBias=O.bias,D.shadowNormalBias=O.normalBias,D.shadowRadius=O.radius,D.shadowMapSize=O.mapSize,s.spotShadow[L]=D,s.spotShadowMap[L]=me,F++}L++}else if(Y.isRectAreaLight){const ue=t.get(Y);ue.color.copy(ne).multiplyScalar(Q),ue.halfWidth.set(Y.width*.5,0,0),ue.halfHeight.set(0,Y.height*.5,0),s.rectArea[k]=ue,k++}else if(Y.isPointLight){const ue=t.get(Y);if(ue.color.copy(Y.color).multiplyScalar(Y.intensity),ue.distance=Y.distance,ue.decay=Y.decay,Y.castShadow){const O=Y.shadow,D=i.get(Y);D.shadowIntensity=O.intensity,D.shadowBias=O.bias,D.shadowNormalBias=O.normalBias,D.shadowRadius=O.radius,D.shadowMapSize=O.mapSize,D.shadowCameraNear=O.camera.near,D.shadowCameraFar=O.camera.far,s.pointShadow[b]=D,s.pointShadowMap[b]=me,s.pointShadowMatrix[b]=Y.shadow.matrix,P++}s.point[b]=ue,b++}else if(Y.isHemisphereLight){const ue=t.get(Y);ue.skyColor.copy(Y.color).multiplyScalar(Q),ue.groundColor.copy(Y.groundColor).multiplyScalar(Q),s.hemi[R]=ue,R++}}k>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=je.LTC_FLOAT_1,s.rectAreaLTC2=je.LTC_FLOAT_2):(s.rectAreaLTC1=je.LTC_HALF_1,s.rectAreaLTC2=je.LTC_HALF_2)),s.ambient[0]=y,s.ambient[1]=x,s.ambient[2]=v;const W=s.hash;(W.sunLength!==M||W.directionalLength!==S||W.pointLength!==b||W.spotLength!==L||W.rectAreaLength!==k||W.hemiLength!==R||W.numSunShadows!==A||W.numDirectionalShadows!==U||W.numPointShadows!==P||W.numSpotShadows!==F||W.numSpotMaps!==T||W.numLightProbes!==j)&&(s.sun.length=M,s.directional.length=S,s.spot.length=L,s.rectArea.length=k,s.point.length=b,s.hemi.length=R,s.sunShadow.length=A,s.sunShadowMap.length=A,s.sunShadowMatrix.length=N,s.sunShadowCascade.length=N,s.directionalShadow.length=U,s.directionalShadowMap.length=U,s.directionalShadowMatrix.length=U,s.pointShadow.length=P,s.pointShadowMap.length=P,s.pointShadowMatrix.length=P,s.spotShadow.length=F,s.spotShadowMap.length=F,s.spotLightMatrix.length=F+T-I,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=I,s.numLightProbes=j,W.sunLength=M,W.directionalLength=S,W.pointLength=b,W.spotLength=L,W.rectAreaLength=k,W.hemiLength=R,W.numSunShadows=A,W.numDirectionalShadows=U,W.numPointShadows=P,W.numSpotShadows=F,W.numSpotMaps=T,W.numLightProbes=j,s.version=oC++)}function g(m,y){let x=0,v=0,M=0,A=0,N=0,S=0;const b=y.matrixWorldInverse;for(let L=0,k=m.length;L<k;L++){const R=m[L];if(R.isSunLight){const U=s.sun[x];U.direction.setFromMatrixPosition(R.matrixWorld),U.direction.transformDirection(b),x++}else if(R.isDirectionalLight){const U=s.directional[v];U.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(b),v++}else if(R.isSpotLight){const U=s.spot[A];U.position.setFromMatrixPosition(R.matrixWorld),U.position.applyMatrix4(b),U.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(b),A++}else if(R.isRectAreaLight){const U=s.rectArea[N];U.position.setFromMatrixPosition(R.matrixWorld),U.position.applyMatrix4(b),d.identity(),u.copy(R.matrixWorld),u.premultiply(b),d.extractRotation(u),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),U.halfWidth.applyMatrix4(d),U.halfHeight.applyMatrix4(d),N++}else if(R.isPointLight){const U=s.point[M];U.position.setFromMatrixPosition(R.matrixWorld),U.position.applyMatrix4(b),M++}else if(R.isHemisphereLight){const U=s.hemi[S];U.direction.setFromMatrixPosition(R.matrixWorld),U.direction.transformDirection(b),S++}}}return{setup:h,setupView:g,state:s}}function K_(o){const t=new cC(o),i=[],s=[],l=[];function u(v){x.camera=v,i.length=0,s.length=0,l.length=0}function d(v){i.push(v)}function h(v){s.push(v)}function g(v){l.push(v)}function m(){t.setup(i)}function y(v){t.setupView(i,v)}const x={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:u,state:x,setupLights:m,setupLightsView:y,pushLight:d,pushShadow:h,pushLightProbeGrid:g}}function uC(o){let t=new WeakMap;function i(l,u=0){const d=t.get(l);let h;return d===void 0?(h=new K_(o),t.set(l,[h])):u>=d.length?(h=new K_(o),d.push(h)):h=d[u],h}function s(){t=new WeakMap}return{get:i,dispose:s}}const fC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dC=`uniform sampler2D shadow_pass;
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
}`,hC=[new he(1,0,0),new he(-1,0,0),new he(0,1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1)],pC=[new he(0,-1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1),new he(0,-1,0),new he(0,-1,0)],Q_=new on,wl=new he,xp=new he;function mC(o,t,i){let s=new wm;const l=new _t,u=new _t,d=new un,h=new yT,g=new ST,m={},y=i.maxTextureSize,x={[ir]:Zn,[Zn]:ir,[Ia]:Ia},v=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:fC,fragmentShader:dC}),M=v.clone();M.defines.HORIZONTAL_PASS=1;const A=new gi;A.setAttribute("position",new Di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const N=new ji(A,v),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Iu;let b=this.type;this.render=function(P,F,T){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||P.length===0)return;this.type===aE&&(dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Iu);const I=o.getRenderTarget(),j=o.getActiveCubeFace(),W=o.getActiveMipmapLevel(),ae=o.state;ae.setBlending(Fa),ae.buffers.depth.getReversed()===!0?ae.buffers.color.setClear(0,0,0,0):ae.buffers.color.setClear(1,1,1,1),ae.buffers.depth.setTest(!0),ae.setScissorTest(!1);const q=b!==this.type;q&&F.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(ne=>ne.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,ne=P.length;Y<ne;Y++){const Q=P[Y],J=Q.shadow;if(J===void 0){dt("WebGLShadowMap:",Q,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;l.copy(J.mapSize);const me=J.getFrameExtents();l.multiply(me),u.copy(J.mapSize),(l.x>y||l.y>y)&&(l.x>y&&(u.x=Math.floor(y/me.x),l.x=u.x*me.x,J.mapSize.x=u.x),l.y>y&&(u.y=Math.floor(y/me.y),l.y=u.y*me.y,J.mapSize.y=u.y));const ue=o.state.buffers.depth.getReversed();if(J.camera._reversedDepth=ue,J.map===null||q===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===Cl){if(Q.isPointLight){dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new ki(l.x,l.y,{format:sr,type:ma,minFilter:Gn,magFilter:Gn,generateMipmaps:!1}),J.map.texture.name=Q.name+".shadowMap",J.map.depthTexture=new Il(l.x,l.y,fa),J.map.depthTexture.name=Q.name+".shadowMapDepth",J.map.depthTexture.format=Ga,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=In,J.map.depthTexture.magFilter=In}else Q.isPointLight?(J.map=new SS(l.x),J.map.depthTexture=new hT(l.x,pa)):(J.map=new ki(l.x,l.y),J.map.depthTexture=new Il(l.x,l.y,pa)),J.map.depthTexture.name=Q.name+".shadowMap",J.map.depthTexture.format=Ga,this.type===Iu?(J.map.depthTexture.compareFunction=ue?Tm:Em,J.map.depthTexture.minFilter=Gn,J.map.depthTexture.magFilter=Gn):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=In,J.map.depthTexture.magFilter=In);J.camera.updateProjectionMatrix()}J.map.isWebGLCubeRenderTarget!==!0&&(J.map.width!==l.x||J.map.height!==l.y)&&J.map.setSize(l.x,l.y);const O=J.map.isWebGLCubeRenderTarget?6:J.getViewportCount();Q.isPointLight!==!0&&J.updateMatrices(Q,T);for(let D=0;D<O;D++){const _e=J.getCamera(D);if(Q.isPointLight){const we=J.camera,B=J.matrix,re=Q.distance||we.far;re!==we.far&&(we.far=re,we.updateProjectionMatrix()),wl.setFromMatrixPosition(Q.matrixWorld),we.position.copy(wl),xp.copy(we.position),xp.add(hC[D]),we.up.copy(pC[D]),we.lookAt(xp),we.updateMatrixWorld(),B.makeTranslation(-wl.x,-wl.y,-wl.z),Q_.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),J._frustum.setFromProjectionMatrix(Q_,we.coordinateSystem,we.reversedDepth)}if(J.map.isWebGLCubeRenderTarget)o.setRenderTarget(J.map,D),o.clear();else{D===0&&(o.setRenderTarget(J.map),o.clear());const we=J.getViewport(D);d.set(u.x*we.x,u.y*we.y,u.x*we.z,u.y*we.w),ae.viewport(d)}s=J.getFrustum(D),R(F,T,_e,Q,this.type)}J.isPointLightShadow!==!0&&this.type===Cl&&L(J,T),J.needsUpdate=!1}b=this.type,S.needsUpdate=!1,o.setRenderTarget(I,j,W)};function L(P,F){const T=t.update(N);v.defines.VSM_SAMPLES!==P.blurSamples&&(v.defines.VSM_SAMPLES=P.blurSamples,M.defines.VSM_SAMPLES=P.blurSamples,v.needsUpdate=!0,M.needsUpdate=!0),P.mapPass===null?P.mapPass=new ki(l.x,l.y,{format:sr,type:ma}):(P.mapPass.width!==P.map.width||P.mapPass.height!==P.map.height)&&P.mapPass.setSize(P.map.width,P.map.height),v.uniforms.shadow_pass.value=P.map.depthTexture,v.uniforms.resolution.value.set(P.map.width,P.map.height),v.uniforms.radius.value=P.radius,o.setRenderTarget(P.mapPass),o.clear(),o.renderBufferDirect(F,null,T,v,N,null),M.uniforms.shadow_pass.value=P.mapPass.texture,M.uniforms.resolution.value.set(P.map.width,P.map.height),M.uniforms.radius.value=P.radius,o.setRenderTarget(P.map),o.clear(),o.renderBufferDirect(F,null,T,M,N,null)}function k(P,F,T,I){let j=null;const W=T.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(W!==void 0)j=W;else if(j=T.isPointLight===!0?g:h,o.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const ae=j.uuid,q=F.uuid;let Y=m[ae];Y===void 0&&(Y={},m[ae]=Y);let ne=Y[q];ne===void 0&&(ne=j.clone(),Y[q]=ne,F.addEventListener("dispose",U)),j=ne}if(j.visible=F.visible,j.wireframe=F.wireframe,I===Cl?j.side=F.shadowSide!==null?F.shadowSide:F.side:j.side=F.shadowSide!==null?F.shadowSide:x[F.side],j.alphaMap=F.alphaMap,j.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,j.map=F.map,j.clipShadows=F.clipShadows,j.clippingPlanes=F.clippingPlanes,j.clipIntersection=F.clipIntersection,j.displacementMap=F.displacementMap,j.displacementScale=F.displacementScale,j.displacementBias=F.displacementBias,j.wireframeLinewidth=F.wireframeLinewidth,j.linewidth=F.linewidth,T.isPointLight===!0&&j.isMeshDistanceMaterial===!0){const ae=o.properties.get(j);ae.light=T}return j}function R(P,F,T,I,j){if(P.visible===!1)return;if(P.layers.test(F.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&j===Cl)&&(!P.frustumCulled||P.intersectsFrustum(s))){P.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,P.matrixWorld);const q=t.update(P),Y=P.material;if(Array.isArray(Y)){const ne=q.groups;for(let Q=0,J=ne.length;Q<J;Q++){const me=ne[Q],ue=Y[me.materialIndex];if(ue&&ue.visible){const O=k(P,ue,I,j);P.onBeforeShadow(o,P,F,T,q,O,me),o.renderBufferDirect(T,null,q,O,P,me),P.onAfterShadow(o,P,F,T,q,O,me)}}}else if(Y.visible){const ne=k(P,Y,I,j);P.onBeforeShadow(o,P,F,T,q,ne,null),o.renderBufferDirect(T,null,q,ne,P,null),P.onAfterShadow(o,P,F,T,q,ne,null)}}const ae=P.children;for(let q=0,Y=ae.length;q<Y;q++)R(ae[q],F,T,I,j)}function U(P){P.target.removeEventListener("dispose",U);for(const T in m){const I=m[T],j=P.target.uuid;j in I&&(I[j].dispose(),delete I[j])}}}function gC(o,t){function i(){let K=!1;const Le=new un;let Te=null;const Ie=new un(0,0,0,0);return{setMask:function(We){Te!==We&&!K&&(o.colorMask(We,We,We,We),Te=We)},setLocked:function(We){K=We},setClear:function(We,Re,tt,Xe,Ut){Ut===!0&&(We*=Xe,Re*=Xe,tt*=Xe),Le.set(We,Re,tt,Xe),Ie.equals(Le)===!1&&(o.clearColor(We,Re,tt,Xe),Ie.copy(Le))},reset:function(){K=!1,Te=null,Ie.set(-1,0,0,0)}}}function s(){let K=!1,Le=!1,Te=null,Ie=null,We=null;return{setReversed:function(Re){if(Le!==Re){const tt=t.get("EXT_clip_control");Re?tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.ZERO_TO_ONE_EXT):tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.NEGATIVE_ONE_TO_ONE_EXT),Le=Re;const Xe=We;We=null,this.setClear(Xe)}},getReversed:function(){return Le},setTest:function(Re){Re?ee(o.DEPTH_TEST):be(o.DEPTH_TEST)},setMask:function(Re){Te!==Re&&!K&&(o.depthMask(Re),Te=Re)},setFunc:function(Re){if(Le&&(Re=BE[Re]),Ie!==Re){switch(Re){case bp:o.depthFunc(o.NEVER);break;case Mp:o.depthFunc(o.ALWAYS);break;case Ep:o.depthFunc(o.LESS);break;case Dl:o.depthFunc(o.LEQUAL);break;case Tp:o.depthFunc(o.EQUAL);break;case Ap:o.depthFunc(o.GEQUAL);break;case wp:o.depthFunc(o.GREATER);break;case Cp:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Ie=Re}},setLocked:function(Re){K=Re},setClear:function(Re){We!==Re&&(We=Re,Le&&(Re=1-Re),o.clearDepth(Re))},reset:function(){K=!1,Te=null,Ie=null,We=null,Le=!1}}}function l(){let K=!1,Le=null,Te=null,Ie=null,We=null,Re=null,tt=null,Xe=null,Ut=null;return{setTest:function(pt){K||(pt?ee(o.STENCIL_TEST):be(o.STENCIL_TEST))},setMask:function(pt){Le!==pt&&!K&&(o.stencilMask(pt),Le=pt)},setFunc:function(pt,ni,xi){(Te!==pt||Ie!==ni||We!==xi)&&(o.stencilFunc(pt,ni,xi),Te=pt,Ie=ni,We=xi)},setOp:function(pt,ni,xi){(Re!==pt||tt!==ni||Xe!==xi)&&(o.stencilOp(pt,ni,xi),Re=pt,tt=ni,Xe=xi)},setLocked:function(pt){K=pt},setClear:function(pt){Ut!==pt&&(o.clearStencil(pt),Ut=pt)},reset:function(){K=!1,Le=null,Te=null,Ie=null,We=null,Re=null,tt=null,Xe=null,Ut=null}}}const u=new i,d=new s,h=new l,g=new WeakMap,m=new WeakMap;let y={},x={},v={},M=new WeakMap,A=[],N=null,S=!1,b=null,L=null,k=null,R=null,U=null,P=null,F=null,T=new It(0,0,0),I=0,j=!1,W=null,ae=null,q=null,Y=null,ne=null;const Q=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,me=0;const ue=o.getParameter(o.VERSION);ue.indexOf("WebGL")!==-1?(me=parseFloat(/^WebGL (\d)/.exec(ue)[1]),J=me>=1):ue.indexOf("OpenGL ES")!==-1&&(me=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),J=me>=2);let O=null,D={};const _e=o.getParameter(o.SCISSOR_BOX),we=o.getParameter(o.VIEWPORT),B=new un().fromArray(_e),re=new un().fromArray(we);function Se(K,Le,Te,Ie){const We=new Uint8Array(4),Re=o.createTexture();o.bindTexture(K,Re),o.texParameteri(K,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(K,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let tt=0;tt<Te;tt++)K===o.TEXTURE_3D||K===o.TEXTURE_2D_ARRAY?o.texImage3D(Le,0,o.RGBA,1,1,Ie,0,o.RGBA,o.UNSIGNED_BYTE,We):o.texImage2D(Le+tt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,We);return Re}const G={};G[o.TEXTURE_2D]=Se(o.TEXTURE_2D,o.TEXTURE_2D,1),G[o.TEXTURE_CUBE_MAP]=Se(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[o.TEXTURE_2D_ARRAY]=Se(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),G[o.TEXTURE_3D]=Se(o.TEXTURE_3D,o.TEXTURE_3D,1,1),u.setClear(0,0,0,1),d.setClear(1),h.setClear(0),ee(o.DEPTH_TEST),d.setFunc(Dl),Je(!1),nt(Jv),ee(o.CULL_FACE),st(Fa);function ee(K){y[K]!==!0&&(o.enable(K),y[K]=!0)}function be(K){y[K]!==!1&&(o.disable(K),y[K]=!1)}function Ne(K,Le){return v[K]!==Le?(o.bindFramebuffer(K,Le),v[K]=Le,K===o.DRAW_FRAMEBUFFER&&(v[o.FRAMEBUFFER]=Le),K===o.FRAMEBUFFER&&(v[o.DRAW_FRAMEBUFFER]=Le),!0):!1}function ge(K,Le){let Te=A,Ie=!1;if(K){Te=M.get(Le),Te===void 0&&(Te=[],M.set(Le,Te));const We=K.textures;if(Te.length!==We.length||Te[0]!==o.COLOR_ATTACHMENT0){for(let Re=0,tt=We.length;Re<tt;Re++)Te[Re]=o.COLOR_ATTACHMENT0+Re;Te.length=We.length,Ie=!0}}else Te[0]!==o.BACK&&(Te[0]=o.BACK,Ie=!0);Ie&&o.drawBuffers(Te)}function Ce(K){return N!==K?(o.useProgram(K),N=K,!0):!1}const ut={[po]:o.FUNC_ADD,[rE]:o.FUNC_SUBTRACT,[oE]:o.FUNC_REVERSE_SUBTRACT};ut[lE]=o.MIN,ut[cE]=o.MAX;const Ge={[uE]:o.ZERO,[fE]:o.ONE,[dE]:o.SRC_COLOR,[Fy]:o.SRC_ALPHA,[vE]:o.SRC_ALPHA_SATURATE,[gE]:o.DST_COLOR,[pE]:o.DST_ALPHA,[hE]:o.ONE_MINUS_SRC_COLOR,[Hy]:o.ONE_MINUS_SRC_ALPHA,[xE]:o.ONE_MINUS_DST_COLOR,[mE]:o.ONE_MINUS_DST_ALPHA,[_E]:o.CONSTANT_COLOR,[yE]:o.ONE_MINUS_CONSTANT_COLOR,[SE]:o.CONSTANT_ALPHA,[bE]:o.ONE_MINUS_CONSTANT_ALPHA};function st(K,Le,Te,Ie,We,Re,tt,Xe,Ut,pt){if(K===Fa){S===!0&&(be(o.BLEND),S=!1);return}if(S===!1&&(ee(o.BLEND),S=!0),K!==sE){if(K!==b||pt!==j){if((L!==po||U!==po)&&(o.blendEquation(o.FUNC_ADD),L=po,U=po),pt)switch(K){case Nl:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Vu:o.blendFunc(o.ONE,o.ONE);break;case $v:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case e_:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:Ft("WebGLState: Invalid blending: ",K);break}else switch(K){case Nl:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Vu:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case $v:Ft("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case e_:Ft("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ft("WebGLState: Invalid blending: ",K);break}k=null,R=null,P=null,F=null,T.set(0,0,0),I=0,b=K,j=pt}return}We=We||Le,Re=Re||Te,tt=tt||Ie,(Le!==L||We!==U)&&(o.blendEquationSeparate(ut[Le],ut[We]),L=Le,U=We),(Te!==k||Ie!==R||Re!==P||tt!==F)&&(o.blendFuncSeparate(Ge[Te],Ge[Ie],Ge[Re],Ge[tt]),k=Te,R=Ie,P=Re,F=tt),(Xe.equals(T)===!1||Ut!==I)&&(o.blendColor(Xe.r,Xe.g,Xe.b,Ut),T.copy(Xe),I=Ut),b=K,j=!1}function lt(K,Le){K.side===Ia?be(o.CULL_FACE):ee(o.CULL_FACE);let Te=K.side===Zn;Le&&(Te=!Te),Je(Te),K.blending===Nl&&K.transparent===!1?st(Fa):st(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),d.setFunc(K.depthFunc),d.setTest(K.depthTest),d.setMask(K.depthWrite),u.setMask(K.colorWrite);const Ie=K.stencilWrite;h.setTest(Ie),Ie&&(h.setMask(K.stencilWriteMask),h.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),h.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),Ht(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?ee(o.SAMPLE_ALPHA_TO_COVERAGE):be(o.SAMPLE_ALPHA_TO_COVERAGE)}function Je(K){W!==K&&(K?o.frontFace(o.CW):o.frontFace(o.CCW),W=K)}function nt(K){K!==nE?(ee(o.CULL_FACE),K!==ae&&(K===Jv?o.cullFace(o.BACK):K===iE?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):be(o.CULL_FACE),ae=K}function Et(K){K!==q&&(J&&o.lineWidth(K),q=K)}function Ht(K,Le,Te){K?(ee(o.POLYGON_OFFSET_FILL),(Y!==Le||ne!==Te)&&(Y=Le,ne=Te,d.getReversed()&&(Le=-Le),o.polygonOffset(Le,Te))):be(o.POLYGON_OFFSET_FILL)}function zt(K){K?ee(o.SCISSOR_TEST):be(o.SCISSOR_TEST)}function $t(K){K===void 0&&(K=o.TEXTURE0+Q-1),O!==K&&(o.activeTexture(K),O=K)}function Z(K,Le,Te){Te===void 0&&(O===null?Te=o.TEXTURE0+Q-1:Te=O);let Ie=D[Te];Ie===void 0&&(Ie={type:void 0,texture:void 0},D[Te]=Ie),(Ie.type!==K||Ie.texture!==Le)&&(O!==Te&&(o.activeTexture(Te),O=Te),o.bindTexture(K,Le||G[K]),Ie.type=K,Ie.texture=Le)}function tn(){const K=D[O];K!==void 0&&K.type!==void 0&&(o.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function Dt(){try{o.compressedTexImage2D(...arguments)}catch(K){Ft("WebGLState:",K)}}function z(){try{o.compressedTexImage3D(...arguments)}catch(K){Ft("WebGLState:",K)}}function E(){try{o.texSubImage2D(...arguments)}catch(K){Ft("WebGLState:",K)}}function se(){try{o.texSubImage3D(...arguments)}catch(K){Ft("WebGLState:",K)}}function le(){try{o.compressedTexSubImage2D(...arguments)}catch(K){Ft("WebGLState:",K)}}function ve(){try{o.compressedTexSubImage3D(...arguments)}catch(K){Ft("WebGLState:",K)}}function De(){try{o.texStorage2D(...arguments)}catch(K){Ft("WebGLState:",K)}}function Ue(){try{o.texStorage3D(...arguments)}catch(K){Ft("WebGLState:",K)}}function ye(){try{o.texImage2D(...arguments)}catch(K){Ft("WebGLState:",K)}}function Ae(){try{o.texImage3D(...arguments)}catch(K){Ft("WebGLState:",K)}}function Oe(K){return x[K]!==void 0?x[K]:o.getParameter(K)}function it(K,Le){x[K]!==Le&&(o.pixelStorei(K,Le),x[K]=Le)}function He(K){B.equals(K)===!1&&(o.scissor(K.x,K.y,K.z,K.w),B.copy(K))}function Fe(K){re.equals(K)===!1&&(o.viewport(K.x,K.y,K.z,K.w),re.copy(K))}function qe(K,Le){let Te=m.get(Le);Te===void 0&&(Te=new WeakMap,m.set(Le,Te));let Ie=Te.get(K);Ie===void 0&&(Ie=o.getUniformBlockIndex(Le,K.name),Te.set(K,Ie))}function rt(K,Le){const Ie=m.get(Le).get(K);g.get(Le)!==Ie&&(o.uniformBlockBinding(Le,Ie,K.__bindingPointIndex),g.set(Le,Ie))}function ht(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),d.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),o.pixelStorei(o.PACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,o.BROWSER_DEFAULT_WEBGL),o.pixelStorei(o.PACK_ROW_LENGTH,0),o.pixelStorei(o.PACK_SKIP_PIXELS,0),o.pixelStorei(o.PACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_ROW_LENGTH,0),o.pixelStorei(o.UNPACK_IMAGE_HEIGHT,0),o.pixelStorei(o.UNPACK_SKIP_PIXELS,0),o.pixelStorei(o.UNPACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_SKIP_IMAGES,0),y={},x={},O=null,D={},v={},M=new WeakMap,A=[],N=null,S=!1,b=null,L=null,k=null,R=null,U=null,P=null,F=null,T=new It(0,0,0),I=0,j=!1,W=null,ae=null,q=null,Y=null,ne=null,B.set(0,0,o.canvas.width,o.canvas.height),re.set(0,0,o.canvas.width,o.canvas.height),u.reset(),d.reset(),h.reset()}return{buffers:{color:u,depth:d,stencil:h},enable:ee,disable:be,bindFramebuffer:Ne,drawBuffers:ge,useProgram:Ce,setBlending:st,setMaterial:lt,setFlipSided:Je,setCullFace:nt,setLineWidth:Et,setPolygonOffset:Ht,setScissorTest:zt,activeTexture:$t,bindTexture:Z,unbindTexture:tn,compressedTexImage2D:Dt,compressedTexImage3D:z,texImage2D:ye,texImage3D:Ae,pixelStorei:it,getParameter:Oe,updateUBOMapping:qe,uniformBlockBinding:rt,texStorage2D:De,texStorage3D:Ue,texSubImage2D:E,texSubImage3D:se,compressedTexSubImage2D:le,compressedTexSubImage3D:ve,scissor:He,viewport:Fe,reset:ht}}function xC(o,t,i,s,l,u,d){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,g=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new _t,y=new WeakMap,x=new Set;let v;const M=new WeakMap;let A=!1;try{A=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(z,E){return A?new OffscreenCanvas(z,E):Pl("canvas")}function S(z,E,se){let le=1;const ve=Dt(z);if((ve.width>se||ve.height>se)&&(le=se/Math.max(ve.width,ve.height)),le<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const De=Math.floor(le*ve.width),Ue=Math.floor(le*ve.height);v===void 0&&(v=N(De,Ue));const ye=E?N(De,Ue):v;return ye.width=De,ye.height=Ue,ye.getContext("2d").drawImage(z,0,0,De,Ue),dt("WebGLRenderer: Texture has been resized from ("+ve.width+"x"+ve.height+") to ("+De+"x"+Ue+")."),ye}else return"data"in z&&dt("WebGLRenderer: Image in DataTexture is too big ("+ve.width+"x"+ve.height+")."),z;return z}function b(z){return z.generateMipmaps}function L(z){o.generateMipmap(z)}function k(z){return z.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?o.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function R(z,E,se,le,ve,De=!1){if(z!==null){if(o[z]!==void 0)return o[z];dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Ue;le&&(Ue=t.get("EXT_texture_norm16"),Ue||dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ye=E;if(E===o.RED&&(se===o.FLOAT&&(ye=o.R32F),se===o.HALF_FLOAT&&(ye=o.R16F),se===o.UNSIGNED_BYTE&&(ye=o.R8),se===o.UNSIGNED_SHORT&&Ue&&(ye=Ue.R16_EXT),se===o.SHORT&&Ue&&(ye=Ue.R16_SNORM_EXT)),E===o.RED_INTEGER&&(se===o.UNSIGNED_BYTE&&(ye=o.R8UI),se===o.UNSIGNED_SHORT&&(ye=o.R16UI),se===o.UNSIGNED_INT&&(ye=o.R32UI),se===o.BYTE&&(ye=o.R8I),se===o.SHORT&&(ye=o.R16I),se===o.INT&&(ye=o.R32I)),E===o.RG&&(se===o.FLOAT&&(ye=o.RG32F),se===o.HALF_FLOAT&&(ye=o.RG16F),se===o.UNSIGNED_BYTE&&(ye=o.RG8),se===o.UNSIGNED_SHORT&&Ue&&(ye=Ue.RG16_EXT),se===o.SHORT&&Ue&&(ye=Ue.RG16_SNORM_EXT)),E===o.RG_INTEGER&&(se===o.UNSIGNED_BYTE&&(ye=o.RG8UI),se===o.UNSIGNED_SHORT&&(ye=o.RG16UI),se===o.UNSIGNED_INT&&(ye=o.RG32UI),se===o.BYTE&&(ye=o.RG8I),se===o.SHORT&&(ye=o.RG16I),se===o.INT&&(ye=o.RG32I)),E===o.RGB_INTEGER&&(se===o.UNSIGNED_BYTE&&(ye=o.RGB8UI),se===o.UNSIGNED_SHORT&&(ye=o.RGB16UI),se===o.UNSIGNED_INT&&(ye=o.RGB32UI),se===o.BYTE&&(ye=o.RGB8I),se===o.SHORT&&(ye=o.RGB16I),se===o.INT&&(ye=o.RGB32I)),E===o.RGBA_INTEGER&&(se===o.UNSIGNED_BYTE&&(ye=o.RGBA8UI),se===o.UNSIGNED_SHORT&&(ye=o.RGBA16UI),se===o.UNSIGNED_INT&&(ye=o.RGBA32UI),se===o.BYTE&&(ye=o.RGBA8I),se===o.SHORT&&(ye=o.RGBA16I),se===o.INT&&(ye=o.RGBA32I)),E===o.RGB&&(se===o.UNSIGNED_SHORT&&Ue&&(ye=Ue.RGB16_EXT),se===o.SHORT&&Ue&&(ye=Ue.RGB16_SNORM_EXT),se===o.UNSIGNED_INT_5_9_9_9_REV&&(ye=o.RGB9_E5),se===o.UNSIGNED_INT_10F_11F_11F_REV&&(ye=o.R11F_G11F_B10F)),E===o.RGBA){const Ae=De?Wu:Ot.getTransfer(ve);se===o.FLOAT&&(ye=o.RGBA32F),se===o.HALF_FLOAT&&(ye=o.RGBA16F),se===o.UNSIGNED_BYTE&&(ye=Ae===Zt?o.SRGB8_ALPHA8:o.RGBA8),se===o.UNSIGNED_SHORT&&Ue&&(ye=Ue.RGBA16_EXT),se===o.SHORT&&Ue&&(ye=Ue.RGBA16_SNORM_EXT),se===o.UNSIGNED_SHORT_4_4_4_4&&(ye=o.RGBA4),se===o.UNSIGNED_SHORT_5_5_5_1&&(ye=o.RGB5_A1)}return(ye===o.R16F||ye===o.R32F||ye===o.RG16F||ye===o.RG32F||ye===o.RGBA16F||ye===o.RGBA32F)&&t.get("EXT_color_buffer_float"),ye}function U(z,E){let se;return z?E===null||E===pa||E===Ll?se=o.DEPTH24_STENCIL8:E===fa?se=o.DEPTH32F_STENCIL8:E===Ul&&(se=o.DEPTH24_STENCIL8,dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===pa||E===Ll?se=o.DEPTH_COMPONENT24:E===fa?se=o.DEPTH_COMPONENT32F:E===Ul&&(se=o.DEPTH_COMPONENT16),se}function P(z,E){return b(z)===!0||z.isFramebufferTexture&&z.minFilter!==In&&z.minFilter!==Gn?Math.log2(Math.max(E.width,E.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?E.mipmaps.length:1}function F(z){const E=z.target;E.removeEventListener("dispose",F),I(E),E.isVideoTexture&&y.delete(E),E.isHTMLTexture&&x.delete(E)}function T(z){const E=z.target;E.removeEventListener("dispose",T),W(E)}function I(z){const E=s.get(z);if(E.__webglInit===void 0)return;const se=z.source,le=M.get(se);if(le){const ve=le[E.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&j(z),Object.keys(le).length===0&&M.delete(se)}s.remove(z)}function j(z){const E=s.get(z);o.deleteTexture(E.__webglTexture);const se=z.source,le=M.get(se);delete le[E.__cacheKey],d.memory.textures--}function W(z){const E=s.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),s.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(E.__webglFramebuffer[le]))for(let ve=0;ve<E.__webglFramebuffer[le].length;ve++)o.deleteFramebuffer(E.__webglFramebuffer[le][ve]);else o.deleteFramebuffer(E.__webglFramebuffer[le]);E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer[le])}else{if(Array.isArray(E.__webglFramebuffer))for(let le=0;le<E.__webglFramebuffer.length;le++)o.deleteFramebuffer(E.__webglFramebuffer[le]);else o.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&o.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let le=0;le<E.__webglColorRenderbuffer.length;le++)E.__webglColorRenderbuffer[le]&&o.deleteRenderbuffer(E.__webglColorRenderbuffer[le]);E.__webglDepthRenderbuffer&&o.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const se=z.textures;for(let le=0,ve=se.length;le<ve;le++){const De=s.get(se[le]);De.__webglTexture&&(o.deleteTexture(De.__webglTexture),d.memory.textures--),s.remove(se[le])}s.remove(z)}let ae=0;function q(){ae=0}function Y(){return ae}function ne(z){ae=z}function Q(){const z=ae;return z>=l.maxTextures&&dt("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+l.maxTextures),ae+=1,z}function J(z){const E=[];return E.push(z.wrapS),E.push(z.wrapT),E.push(z.wrapR||0),E.push(z.magFilter),E.push(z.minFilter),E.push(z.anisotropy),E.push(z.internalFormat),E.push(z.format),E.push(z.type),E.push(z.generateMipmaps),E.push(z.premultiplyAlpha),E.push(z.flipY),E.push(z.unpackAlignment),E.push(z.colorSpace),E.join()}function me(z,E){const se=s.get(z);if(z.isVideoTexture&&Z(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&se.__version!==z.version){const le=z.image;if(le===null)dt("WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)dt("WebGLRenderer: Texture marked for update but image is incomplete");else{be(se,z,E);return}}else z.isExternalTexture&&(se.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,se.__webglTexture,o.TEXTURE0+E)}function ue(z,E){const se=s.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&se.__version!==z.version){be(se,z,E);return}else z.isExternalTexture&&(se.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(o.TEXTURE_2D_ARRAY,se.__webglTexture,o.TEXTURE0+E)}function O(z,E){const se=s.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&se.__version!==z.version){be(se,z,E);return}i.bindTexture(o.TEXTURE_3D,se.__webglTexture,o.TEXTURE0+E)}function D(z,E){const se=s.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&se.__version!==z.version){Ne(se,z,E);return}i.bindTexture(o.TEXTURE_CUBE_MAP,se.__webglTexture,o.TEXTURE0+E)}const _e={[Rp]:o.REPEAT,[za]:o.CLAMP_TO_EDGE,[Np]:o.MIRRORED_REPEAT},we={[In]:o.NEAREST,[TE]:o.NEAREST_MIPMAP_NEAREST,[lu]:o.NEAREST_MIPMAP_LINEAR,[Gn]:o.LINEAR,[Fh]:o.LINEAR_MIPMAP_NEAREST,[tr]:o.LINEAR_MIPMAP_LINEAR},B={[RE]:o.NEVER,[OE]:o.ALWAYS,[NE]:o.LESS,[Em]:o.LEQUAL,[DE]:o.EQUAL,[Tm]:o.GEQUAL,[UE]:o.GREATER,[LE]:o.NOTEQUAL};function re(z,E){if(E.type===fa&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Gn||E.magFilter===Fh||E.magFilter===lu||E.magFilter===tr||E.minFilter===Gn||E.minFilter===Fh||E.minFilter===lu||E.minFilter===tr)&&dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(z,o.TEXTURE_WRAP_S,_e[E.wrapS]),o.texParameteri(z,o.TEXTURE_WRAP_T,_e[E.wrapT]),(z===o.TEXTURE_3D||z===o.TEXTURE_2D_ARRAY)&&o.texParameteri(z,o.TEXTURE_WRAP_R,_e[E.wrapR]),o.texParameteri(z,o.TEXTURE_MAG_FILTER,we[E.magFilter]),o.texParameteri(z,o.TEXTURE_MIN_FILTER,we[E.minFilter]),E.compareFunction&&(o.texParameteri(z,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(z,o.TEXTURE_COMPARE_FUNC,B[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===In||E.minFilter!==lu&&E.minFilter!==tr||E.type===fa&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const se=t.get("EXT_texture_filter_anisotropic");o.texParameterf(z,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function Se(z,E){let se=!1;z.__webglInit===void 0&&(z.__webglInit=!0,E.addEventListener("dispose",F));const le=E.source;let ve=M.get(le);ve===void 0&&(ve={},M.set(le,ve));const De=J(E);if(De!==z.__cacheKey){ve[De]===void 0&&(ve[De]={texture:o.createTexture(),usedTimes:0},d.memory.textures++,se=!0),ve[De].usedTimes++;const Ue=ve[z.__cacheKey];Ue!==void 0&&(ve[z.__cacheKey].usedTimes--,Ue.usedTimes===0&&j(E)),z.__cacheKey=De,z.__webglTexture=ve[De].texture}return se}function G(z,E,se){return Math.floor(Math.floor(z/se)/E)}function ee(z,E,se,le){const De=z.updateRanges;if(De.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,E.width,E.height,se,le,E.data);else{De.sort((it,He)=>it.start-He.start);let Ue=0;for(let it=1;it<De.length;it++){const He=De[Ue],Fe=De[it],qe=He.start+He.count,rt=G(Fe.start,E.width,4),ht=G(He.start,E.width,4);Fe.start<=qe+1&&rt===ht&&G(Fe.start+Fe.count-1,E.width,4)===rt?He.count=Math.max(He.count,Fe.start+Fe.count-He.start):(++Ue,De[Ue]=Fe)}De.length=Ue+1;const ye=i.getParameter(o.UNPACK_ROW_LENGTH),Ae=i.getParameter(o.UNPACK_SKIP_PIXELS),Oe=i.getParameter(o.UNPACK_SKIP_ROWS);i.pixelStorei(o.UNPACK_ROW_LENGTH,E.width);for(let it=0,He=De.length;it<He;it++){const Fe=De[it],qe=Math.floor(Fe.start/4),rt=Math.ceil(Fe.count/4),ht=qe%E.width,K=Math.floor(qe/E.width),Le=rt,Te=1;i.pixelStorei(o.UNPACK_SKIP_PIXELS,ht),i.pixelStorei(o.UNPACK_SKIP_ROWS,K),i.texSubImage2D(o.TEXTURE_2D,0,ht,K,Le,Te,se,le,E.data)}z.clearUpdateRanges(),i.pixelStorei(o.UNPACK_ROW_LENGTH,ye),i.pixelStorei(o.UNPACK_SKIP_PIXELS,Ae),i.pixelStorei(o.UNPACK_SKIP_ROWS,Oe)}}function be(z,E,se){let le=o.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(le=o.TEXTURE_2D_ARRAY),E.isData3DTexture&&(le=o.TEXTURE_3D);const ve=Se(z,E),De=E.source;i.bindTexture(le,z.__webglTexture,o.TEXTURE0+se);const Ue=s.get(De);if(De.version!==Ue.__version||ve===!0){if(i.activeTexture(o.TEXTURE0+se),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const Te=Ot.getPrimaries(Ot.workingColorSpace),Ie=E.colorSpace===bs?null:Ot.getPrimaries(E.colorSpace),We=E.colorSpace===bs||Te===Ie?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,We)}i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment);let Ae=S(E.image,!1,l.maxTextureSize);Ae=tn(E,Ae);const Oe=u.convert(E.format,E.colorSpace),it=u.convert(E.type);let He=R(E.internalFormat,Oe,it,E.normalized,E.colorSpace,E.isVideoTexture);re(le,E);let Fe;const qe=E.mipmaps,rt=E.isVideoTexture!==!0,ht=Ue.__version===void 0||ve===!0,K=De.dataReady,Le=P(E,Ae);if(E.isDepthTexture)He=U(E.format===nr,E.type),ht&&(rt?i.texStorage2D(o.TEXTURE_2D,1,He,Ae.width,Ae.height):i.texImage2D(o.TEXTURE_2D,0,He,Ae.width,Ae.height,0,Oe,it,null));else if(E.isDataTexture)if(qe.length>0){rt&&ht&&i.texStorage2D(o.TEXTURE_2D,Le,He,qe[0].width,qe[0].height);for(let Te=0,Ie=qe.length;Te<Ie;Te++)Fe=qe[Te],rt?K&&i.texSubImage2D(o.TEXTURE_2D,Te,0,0,Fe.width,Fe.height,Oe,it,Fe.data):i.texImage2D(o.TEXTURE_2D,Te,He,Fe.width,Fe.height,0,Oe,it,Fe.data);E.generateMipmaps=!1}else rt?(ht&&i.texStorage2D(o.TEXTURE_2D,Le,He,Ae.width,Ae.height),K&&ee(E,Ae,Oe,it)):i.texImage2D(o.TEXTURE_2D,0,He,Ae.width,Ae.height,0,Oe,it,Ae.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){rt&&ht&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Le,He,qe[0].width,qe[0].height,Ae.depth);for(let Te=0,Ie=qe.length;Te<Ie;Te++)if(Fe=qe[Te],E.format!==Vi)if(Oe!==null)if(rt){if(K)if(E.layerUpdates.size>0){const We=R_(Fe.width,Fe.height,E.format,E.type);for(const Re of E.layerUpdates){const tt=Fe.data.subarray(Re*We/Fe.data.BYTES_PER_ELEMENT,(Re+1)*We/Fe.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Te,0,0,Re,Fe.width,Fe.height,1,Oe,tt)}}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Te,0,0,0,Fe.width,Fe.height,Ae.depth,Oe,Fe.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,Te,He,Fe.width,Fe.height,Ae.depth,0,Fe.data,0,0);else dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?K&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,Te,0,0,0,Fe.width,Fe.height,Ae.depth,Oe,it,Fe.data):i.texImage3D(o.TEXTURE_2D_ARRAY,Te,He,Fe.width,Fe.height,Ae.depth,0,Oe,it,Fe.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{rt&&ht&&i.texStorage2D(o.TEXTURE_2D,Le,He,qe[0].width,qe[0].height);for(let Te=0,Ie=qe.length;Te<Ie;Te++)Fe=qe[Te],E.format!==Vi?Oe!==null?rt?K&&i.compressedTexSubImage2D(o.TEXTURE_2D,Te,0,0,Fe.width,Fe.height,Oe,Fe.data):i.compressedTexImage2D(o.TEXTURE_2D,Te,He,Fe.width,Fe.height,0,Fe.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?K&&i.texSubImage2D(o.TEXTURE_2D,Te,0,0,Fe.width,Fe.height,Oe,it,Fe.data):i.texImage2D(o.TEXTURE_2D,Te,He,Fe.width,Fe.height,0,Oe,it,Fe.data)}else if(E.isDataArrayTexture)if(rt){if(ht&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Le,He,Ae.width,Ae.height,Ae.depth),K)if(E.layerUpdates.size>0){const Te=R_(Ae.width,Ae.height,E.format,E.type);for(const Ie of E.layerUpdates){const We=Ae.data.subarray(Ie*Te/Ae.data.BYTES_PER_ELEMENT,(Ie+1)*Te/Ae.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Ie,Ae.width,Ae.height,1,Oe,it,We)}E.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Ae.width,Ae.height,Ae.depth,Oe,it,Ae.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,He,Ae.width,Ae.height,Ae.depth,0,Oe,it,Ae.data);else if(E.isData3DTexture)rt?(ht&&i.texStorage3D(o.TEXTURE_3D,Le,He,Ae.width,Ae.height,Ae.depth),K&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Ae.width,Ae.height,Ae.depth,Oe,it,Ae.data)):i.texImage3D(o.TEXTURE_3D,0,He,Ae.width,Ae.height,Ae.depth,0,Oe,it,Ae.data);else if(E.isFramebufferTexture){if(ht)if(rt)i.texStorage2D(o.TEXTURE_2D,Le,He,Ae.width,Ae.height);else{let Te=Ae.width,Ie=Ae.height;for(let We=0;We<Le;We++)i.texImage2D(o.TEXTURE_2D,We,He,Te,Ie,0,Oe,it,null),Te>>=1,Ie>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in o){const Te=o.canvas;if(Te.hasAttribute("layoutsubtree")||Te.setAttribute("layoutsubtree","true"),Ae.parentNode!==Te){Te.appendChild(Ae),x.add(E),Te.onpaint=Ie=>{const We=Ie.changedElements;for(const Re of x)We.includes(Re.image)&&(Re.needsUpdate=!0)},Te.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,Ae);else{const We=o.RGBA,Re=o.RGBA,tt=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,We,Re,tt,Ae)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(qe.length>0){if(rt&&ht){const Te=Dt(qe[0]);i.texStorage2D(o.TEXTURE_2D,Le,He,Te.width,Te.height)}for(let Te=0,Ie=qe.length;Te<Ie;Te++)Fe=qe[Te],rt?K&&i.texSubImage2D(o.TEXTURE_2D,Te,0,0,Oe,it,Fe):i.texImage2D(o.TEXTURE_2D,Te,He,Oe,it,Fe);E.generateMipmaps=!1}else if(rt){if(ht){const Te=Dt(Ae);i.texStorage2D(o.TEXTURE_2D,Le,He,Te.width,Te.height)}K&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Oe,it,Ae)}else i.texImage2D(o.TEXTURE_2D,0,He,Oe,it,Ae);b(E)&&L(le),Ue.__version=De.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function Ne(z,E,se){if(E.image.length!==6)return;const le=Se(z,E),ve=E.source;i.bindTexture(o.TEXTURE_CUBE_MAP,z.__webglTexture,o.TEXTURE0+se);const De=s.get(ve);if(ve.version!==De.__version||le===!0){i.activeTexture(o.TEXTURE0+se);const Ue=Ot.getPrimaries(Ot.workingColorSpace),ye=E.colorSpace===bs?null:Ot.getPrimaries(E.colorSpace),Ae=E.colorSpace===bs||Ue===ye?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Oe=E.isCompressedTexture||E.image[0].isCompressedTexture,it=E.image[0]&&E.image[0].isDataTexture,He=[];for(let Re=0;Re<6;Re++)!Oe&&!it?He[Re]=S(E.image[Re],!0,l.maxCubemapSize):He[Re]=it?E.image[Re].image:E.image[Re],He[Re]=tn(E,He[Re]);const Fe=He[0],qe=u.convert(E.format,E.colorSpace),rt=u.convert(E.type),ht=R(E.internalFormat,qe,rt,E.normalized,E.colorSpace),K=E.isVideoTexture!==!0,Le=De.__version===void 0||le===!0,Te=ve.dataReady;let Ie=P(E,Fe);re(o.TEXTURE_CUBE_MAP,E);let We;if(Oe){K&&Le&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Ie,ht,Fe.width,Fe.height);for(let Re=0;Re<6;Re++){We=He[Re].mipmaps;for(let tt=0;tt<We.length;tt++){const Xe=We[tt];E.format!==Vi?qe!==null?K?Te&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,0,0,Xe.width,Xe.height,qe,Xe.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,ht,Xe.width,Xe.height,0,Xe.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):K?Te&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,0,0,Xe.width,Xe.height,qe,rt,Xe.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,ht,Xe.width,Xe.height,0,qe,rt,Xe.data)}}}else{if(We=E.mipmaps,K&&Le){We.length>0&&Ie++;const Re=Dt(He[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Ie,ht,Re.width,Re.height)}for(let Re=0;Re<6;Re++)if(it){K?Te&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,He[Re].width,He[Re].height,qe,rt,He[Re].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,ht,He[Re].width,He[Re].height,0,qe,rt,He[Re].data);for(let tt=0;tt<We.length;tt++){const Ut=We[tt].image[Re].image;K?Te&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,0,0,Ut.width,Ut.height,qe,rt,Ut.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,ht,Ut.width,Ut.height,0,qe,rt,Ut.data)}}else{K?Te&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,qe,rt,He[Re]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,ht,qe,rt,He[Re]);for(let tt=0;tt<We.length;tt++){const Xe=We[tt];K?Te&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,0,0,qe,rt,Xe.image[Re]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,ht,qe,rt,Xe.image[Re])}}}b(E)&&L(o.TEXTURE_CUBE_MAP),De.__version=ve.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function ge(z,E,se,le,ve,De){const Ue=u.convert(se.format,se.colorSpace),ye=u.convert(se.type),Ae=R(se.internalFormat,Ue,ye,se.normalized,se.colorSpace),Oe=s.get(E),it=s.get(se);if(it.__renderTarget=E,!Oe.__hasExternalTextures){const He=Math.max(1,E.width>>De),Fe=Math.max(1,E.height>>De);ve===o.TEXTURE_3D||ve===o.TEXTURE_2D_ARRAY?i.texImage3D(ve,De,Ae,He,Fe,E.depth,0,Ue,ye,null):i.texImage2D(ve,De,Ae,He,Fe,0,Ue,ye,null)}i.bindFramebuffer(o.FRAMEBUFFER,z),$t(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,le,ve,it.__webglTexture,0,zt(E)):(ve===o.TEXTURE_2D||ve>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&ve<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,le,ve,it.__webglTexture,De),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Ce(z,E,se){if(o.bindRenderbuffer(o.RENDERBUFFER,z),E.depthBuffer){const le=E.depthTexture,ve=le&&le.isDepthTexture?le.type:null,De=U(E.stencilBuffer,ve),Ue=E.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;$t(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,zt(E),De,E.width,E.height):se?o.renderbufferStorageMultisample(o.RENDERBUFFER,zt(E),De,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,De,E.width,E.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ue,o.RENDERBUFFER,z)}else{const le=E.textures;for(let ve=0;ve<le.length;ve++){const De=le[ve],Ue=u.convert(De.format,De.colorSpace),ye=u.convert(De.type),Ae=R(De.internalFormat,Ue,ye,De.normalized,De.colorSpace);$t(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,zt(E),Ae,E.width,E.height):se?o.renderbufferStorageMultisample(o.RENDERBUFFER,zt(E),Ae,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,Ae,E.width,E.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function ut(z,E,se){const le=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(o.FRAMEBUFFER,z),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ve=s.get(E.depthTexture);if(ve.__renderTarget=E,(!ve.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),le){if(ve.__webglInit===void 0&&(ve.__webglInit=!0,E.depthTexture.addEventListener("dispose",F)),ve.__webglTexture===void 0){ve.__webglTexture=o.createTexture(),i.bindTexture(o.TEXTURE_CUBE_MAP,ve.__webglTexture),re(o.TEXTURE_CUBE_MAP,E.depthTexture);const Oe=u.convert(E.depthTexture.format),it=u.convert(E.depthTexture.type);let He;E.depthTexture.format===Ga?He=o.DEPTH_COMPONENT24:E.depthTexture.format===nr&&(He=o.DEPTH24_STENCIL8);for(let Fe=0;Fe<6;Fe++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,0,He,E.width,E.height,0,Oe,it,null)}}else me(E.depthTexture,0);const De=ve.__webglTexture,Ue=zt(E),ye=le?o.TEXTURE_CUBE_MAP_POSITIVE_X+se:o.TEXTURE_2D,Ae=E.depthTexture.format===nr?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ga)$t(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Ae,ye,De,0,Ue):o.framebufferTexture2D(o.FRAMEBUFFER,Ae,ye,De,0);else if(E.depthTexture.format===nr)$t(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Ae,ye,De,0,Ue):o.framebufferTexture2D(o.FRAMEBUFFER,Ae,ye,De,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ge(z){const E=s.get(z),se=z.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==z.depthTexture){const le=z.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),le){const ve=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,le.removeEventListener("dispose",ve)};le.addEventListener("dispose",ve),E.__depthDisposeCallback=ve}E.__boundDepthTexture=le}if(z.depthTexture&&!E.__autoAllocateDepthBuffer)if(se)for(let le=0;le<6;le++)ut(E.__webglFramebuffer[le],z,le);else{const le=z.texture.mipmaps;le&&le.length>0?ut(E.__webglFramebuffer[0],z,0):ut(E.__webglFramebuffer,z,0)}else if(se){E.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[le]),E.__webglDepthbuffer[le]===void 0)E.__webglDepthbuffer[le]=o.createRenderbuffer(),Ce(E.__webglDepthbuffer[le],z,!1);else{const ve=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,De=E.__webglDepthbuffer[le];o.bindRenderbuffer(o.RENDERBUFFER,De),o.framebufferRenderbuffer(o.FRAMEBUFFER,ve,o.RENDERBUFFER,De)}}else{const le=z.texture.mipmaps;if(le&&le.length>0?i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=o.createRenderbuffer(),Ce(E.__webglDepthbuffer,z,!1);else{const ve=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,De=E.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,De),o.framebufferRenderbuffer(o.FRAMEBUFFER,ve,o.RENDERBUFFER,De)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function st(z,E,se){const le=s.get(z);E!==void 0&&ge(le.__webglFramebuffer,z,z.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),se!==void 0&&Ge(z)}function lt(z){const E=z.texture,se=s.get(z),le=s.get(E);z.addEventListener("dispose",T);const ve=z.textures,De=z.isWebGLCubeRenderTarget===!0,Ue=ve.length>1;if(Ue||(le.__webglTexture===void 0&&(le.__webglTexture=o.createTexture()),le.__version=E.version,d.memory.textures++),De){se.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(E.mipmaps&&E.mipmaps.length>0){se.__webglFramebuffer[ye]=[];for(let Ae=0;Ae<E.mipmaps.length;Ae++)se.__webglFramebuffer[ye][Ae]=o.createFramebuffer()}else se.__webglFramebuffer[ye]=o.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){se.__webglFramebuffer=[];for(let ye=0;ye<E.mipmaps.length;ye++)se.__webglFramebuffer[ye]=o.createFramebuffer()}else se.__webglFramebuffer=o.createFramebuffer();if(Ue)for(let ye=0,Ae=ve.length;ye<Ae;ye++){const Oe=s.get(ve[ye]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=o.createTexture(),d.memory.textures++)}if(z.samples>0&&$t(z)===!1){se.__webglMultisampledFramebuffer=o.createFramebuffer(),se.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,se.__webglMultisampledFramebuffer);for(let ye=0;ye<ve.length;ye++){const Ae=ve[ye];se.__webglColorRenderbuffer[ye]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,se.__webglColorRenderbuffer[ye]);const Oe=u.convert(Ae.format,Ae.colorSpace),it=u.convert(Ae.type),He=R(Ae.internalFormat,Oe,it,Ae.normalized,Ae.colorSpace,z.isXRRenderTarget===!0),Fe=zt(z);o.renderbufferStorageMultisample(o.RENDERBUFFER,Fe,He,z.width,z.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+ye,o.RENDERBUFFER,se.__webglColorRenderbuffer[ye])}o.bindRenderbuffer(o.RENDERBUFFER,null),z.depthBuffer&&(se.__webglDepthRenderbuffer=o.createRenderbuffer(),Ce(se.__webglDepthRenderbuffer,z,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(De){i.bindTexture(o.TEXTURE_CUBE_MAP,le.__webglTexture),re(o.TEXTURE_CUBE_MAP,E);for(let ye=0;ye<6;ye++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)ge(se.__webglFramebuffer[ye][Ae],z,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ae);else ge(se.__webglFramebuffer[ye],z,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);b(E)&&L(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Ue){for(let ye=0,Ae=ve.length;ye<Ae;ye++){const Oe=ve[ye],it=s.get(Oe);let He=o.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(He=z.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(He,it.__webglTexture),re(He,Oe),ge(se.__webglFramebuffer,z,Oe,o.COLOR_ATTACHMENT0+ye,He,0),b(Oe)&&L(He)}i.unbindTexture()}else{let ye=o.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(ye=z.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(ye,le.__webglTexture),re(ye,E),E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)ge(se.__webglFramebuffer[Ae],z,E,o.COLOR_ATTACHMENT0,ye,Ae);else ge(se.__webglFramebuffer,z,E,o.COLOR_ATTACHMENT0,ye,0);b(E)&&L(ye),i.unbindTexture()}z.depthBuffer&&Ge(z)}function Je(z){const E=z.textures;for(let se=0,le=E.length;se<le;se++){const ve=E[se];if(b(ve)){const De=k(z),Ue=s.get(ve).__webglTexture;i.bindTexture(De,Ue),L(De),i.unbindTexture()}}}const nt=[],Et=[];function Ht(z){if(z.samples>0){if($t(z)===!1){const E=z.textures,se=z.width,le=z.height;let ve=o.COLOR_BUFFER_BIT;const De=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ue=s.get(z),ye=E.length>1;if(ye)for(let Oe=0;Oe<E.length;Oe++)i.bindFramebuffer(o.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Oe,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Ue.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Oe,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer);const Ae=z.texture.mipmaps;Ae&&Ae.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Oe=0;Oe<E.length;Oe++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(ve|=o.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(ve|=o.STENCIL_BUFFER_BIT)),ye){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ue.__webglColorRenderbuffer[Oe]);const it=s.get(E[Oe]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,it,0)}o.blitFramebuffer(0,0,se,le,0,0,se,le,ve,o.NEAREST),g===!0&&(nt.length=0,Et.length=0,nt.push(o.COLOR_ATTACHMENT0+Oe),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&(nt.push(De),Et.push(De),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Et)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,nt))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),ye)for(let Oe=0;Oe<E.length;Oe++){i.bindFramebuffer(o.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Oe,o.RENDERBUFFER,Ue.__webglColorRenderbuffer[Oe]);const it=s.get(E[Oe]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Ue.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Oe,o.TEXTURE_2D,it,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&g){const E=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[E])}}}function zt(z){return Math.min(l.maxSamples,z.samples)}function $t(z){const E=s.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Z(z){const E=d.render.frame;y.get(z)!==E&&(y.set(z,E),z.update())}function tn(z,E){const se=z.colorSpace,le=z.format,ve=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||se!==Xu&&se!==bs&&(Ot.getTransfer(se)===Zt?(le!==Vi||ve!==mi)&&dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ft("WebGLTextures: Unsupported texture color space:",se)),E}function Dt(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(m.width=z.naturalWidth||z.width,m.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(m.width=z.displayWidth,m.height=z.displayHeight):(m.width=z.width,m.height=z.height),m}this.allocateTextureUnit=Q,this.resetTextureUnits=q,this.getTextureUnits=Y,this.setTextureUnits=ne,this.setTexture2D=me,this.setTexture2DArray=ue,this.setTexture3D=O,this.setTextureCube=D,this.rebindTextures=st,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=Ge,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=$t,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function vC(o,t){function i(s,l=bs){let u;const d=Ot.getTransfer(l);if(s===mi)return o.UNSIGNED_BYTE;if(s===_m)return o.UNSIGNED_SHORT_4_4_4_4;if(s===ym)return o.UNSIGNED_SHORT_5_5_5_1;if(s===Qy)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===Jy)return o.UNSIGNED_INT_10F_11F_11F_REV;if(s===Zy)return o.BYTE;if(s===Ky)return o.SHORT;if(s===Ul)return o.UNSIGNED_SHORT;if(s===vm)return o.INT;if(s===pa)return o.UNSIGNED_INT;if(s===fa)return o.FLOAT;if(s===ma)return o.HALF_FLOAT;if(s===$y)return o.ALPHA;if(s===eS)return o.RGB;if(s===Vi)return o.RGBA;if(s===Ga)return o.DEPTH_COMPONENT;if(s===nr)return o.DEPTH_STENCIL;if(s===tS)return o.RED;if(s===Sm)return o.RED_INTEGER;if(s===sr)return o.RG;if(s===bm)return o.RG_INTEGER;if(s===Mm)return o.RGBA_INTEGER;if(s===zu||s===Bu||s===Fu||s===Hu)if(d===Zt)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(s===zu)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Bu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Fu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Hu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(s===zu)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Bu)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Fu)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Hu)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Dp||s===Up||s===Lp||s===Op)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(s===Dp)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Up)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Lp)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Op)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Pp||s===Ip||s===zp||s===Bp||s===Fp||s===ku||s===Hp)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(s===Pp||s===Ip)return d===Zt?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(s===zp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC;if(s===Bp)return u.COMPRESSED_R11_EAC;if(s===Fp)return u.COMPRESSED_SIGNED_R11_EAC;if(s===ku)return u.COMPRESSED_RG11_EAC;if(s===Hp)return u.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Gp||s===Vp||s===kp||s===jp||s===Xp||s===Wp||s===qp||s===Yp||s===Zp||s===Kp||s===Qp||s===Jp||s===$p||s===em)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(s===Gp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Vp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===kp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===jp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Xp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Wp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===qp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Yp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Zp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Kp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Qp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Jp)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===$p)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===em)return d===Zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===tm||s===nm||s===im)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(s===tm)return d===Zt?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===nm)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===im)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===am||s===sm||s===ju||s===rm)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(s===am)return u.COMPRESSED_RED_RGTC1_EXT;if(s===sm)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ju)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===rm)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ll?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const _C=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yC=`
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

}`;class SC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new mS(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new Xi({vertexShader:_C,fragmentShader:yC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ji(new tf(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bC extends rr{constructor(t,i){super();const s=this;let l=null,u=1,d=null,h="local-floor",g=1,m=null,y=null,x=null,v=null,M=null,A=null;const N=typeof XRWebGLBinding<"u",S=new SC,b={},L=i.getContextAttributes();let k=null,R=null;const U=[],P=[],F=new _t;let T=null,I=null;const j=new Ri;j.viewport=new un;const W=new Ri;W.viewport=new un;const ae=[j,W],q=new NT;let Y=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let ee=U[G];return ee===void 0&&(ee=new Yh,U[G]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(G){let ee=U[G];return ee===void 0&&(ee=new Yh,U[G]=ee),ee.getGripSpace()},this.getHand=function(G){let ee=U[G];return ee===void 0&&(ee=new Yh,U[G]=ee),ee.getHandSpace()};function Q(G){const ee=P.indexOf(G.inputSource);if(ee===-1)return;const be=U[ee];be!==void 0&&(be.update(G.inputSource,G.frame,m||d),be.dispatchEvent({type:G.type,data:G.inputSource}))}function J(){l.removeEventListener("select",Q),l.removeEventListener("selectstart",Q),l.removeEventListener("selectend",Q),l.removeEventListener("squeeze",Q),l.removeEventListener("squeezestart",Q),l.removeEventListener("squeezeend",Q),l.removeEventListener("end",J),l.removeEventListener("inputsourceschange",me);for(let G=0;G<U.length;G++){const ee=P[G];ee!==null&&(P[G]=null,U[G].disconnect(ee))}Y=null,ne=null,S.reset();for(const G in b)delete b[G];if(t.setRenderTarget(k),M=null,v=null,x=null,l=null,R=null,Se.stop(),s.isPresenting=!1,t.setPixelRatio(T),t.setSize(F.width,F.height,!1),I!==null){const G=I.camera;G.fov=I.fov,G.zoom=I.zoom,G.updateProjectionMatrix(),I=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){u=G,s.isPresenting===!0&&dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){h=G,s.isPresenting===!0&&dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(G){m=G},this.getBaseLayer=function(){return v!==null?v:M},this.getBinding=function(){return x===null&&N&&(x=new XRWebGLBinding(l,i)),x},this.getFrame=function(){return A},this.getSession=function(){return l},this.setSession=async function(G){if(l=G,l!==null){if(k=t.getRenderTarget(),l.addEventListener("select",Q),l.addEventListener("selectstart",Q),l.addEventListener("selectend",Q),l.addEventListener("squeeze",Q),l.addEventListener("squeezestart",Q),l.addEventListener("squeezeend",Q),l.addEventListener("end",J),l.addEventListener("inputsourceschange",me),L.xrCompatible!==!0&&await i.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(F),N&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ne=null,ge=null;L.depth&&(ge=L.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,be=L.stencil?nr:Ga,Ne=L.stencil?Ll:pa);const Ce={colorFormat:i.RGBA8,depthFormat:ge,scaleFactor:u};x=this.getBinding(),v=x.createProjectionLayer(Ce),l.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),R=new ki(v.textureWidth,v.textureHeight,{format:Vi,type:mi,depthTexture:new Il(v.textureWidth,v.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:L.stencil,colorSpace:t.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const be={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,be),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),R=new ki(M.framebufferWidth,M.framebufferHeight,{format:Vi,type:mi,colorSpace:t.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1,storeMultisampledDepthBuffer:M.ignoreDepthValues===!1,storeMultisampledStencilBuffer:M.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(g),m=null,d=await l.requestReferenceSpace(h),Se.setContext(l),Se.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function me(G){for(let ee=0;ee<G.removed.length;ee++){const be=G.removed[ee],Ne=P.indexOf(be);Ne>=0&&(P[Ne]=null,U[Ne].disconnect(be))}for(let ee=0;ee<G.added.length;ee++){const be=G.added[ee];let Ne=P.indexOf(be);if(Ne===-1){for(let Ce=0;Ce<U.length;Ce++)if(Ce>=P.length){P.push(be),Ne=Ce;break}else if(P[Ce]===null){P[Ce]=be,Ne=Ce;break}if(Ne===-1)break}const ge=U[Ne];ge&&ge.connect(be)}}const ue=new he,O=new he;function D(G,ee,be){ue.setFromMatrixPosition(ee.matrixWorld),O.setFromMatrixPosition(be.matrixWorld);const Ne=ue.distanceTo(O),ge=ee.projectionMatrix.elements,Ce=be.projectionMatrix.elements,ut=ge[14]/(ge[10]-1),Ge=ge[14]/(ge[10]+1),st=(ge[9]+1)/ge[5],lt=(ge[9]-1)/ge[5],Je=(ge[8]-1)/ge[0],nt=(Ce[8]+1)/Ce[0],Et=ut*Je,Ht=ut*nt,zt=Ne/(-Je+nt),$t=zt*-Je;if(ee.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX($t),G.translateZ(zt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ge[10]===-1)G.projectionMatrix.copy(ee.projectionMatrix),G.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Z=ut+zt,tn=Ge+zt,Dt=Et-$t,z=Ht+(Ne-$t),E=st*Ge/tn*Z,se=lt*Ge/tn*Z;G.projectionMatrix.makePerspective(Dt,z,E,se,Z,tn),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function _e(G,ee){ee===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(ee.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(l===null)return;let ee=G.near,be=G.far;S.texture!==null&&(S.depthNear>0&&(ee=S.depthNear),S.depthFar>0&&(be=S.depthFar)),q.near=W.near=j.near=ee,q.far=W.far=j.far=be,(Y!==q.near||ne!==q.far)&&(l.updateRenderState({depthNear:q.near,depthFar:q.far}),Y=q.near,ne=q.far),q.layers.mask=G.layers.mask|6,j.layers.mask=q.layers.mask&-5,W.layers.mask=q.layers.mask&-3;const Ne=G.parent,ge=q.cameras;_e(q,Ne);for(let Ce=0;Ce<ge.length;Ce++)_e(ge[Ce],Ne);ge.length===2?D(q,j,W):q.projectionMatrix.copy(j.projectionMatrix),I===null&&G.isPerspectiveCamera&&(I={camera:G,fov:G.fov,zoom:G.zoom}),we(G,q,Ne)};function we(G,ee,be){be===null?G.matrix.copy(ee.matrixWorld):(G.matrix.copy(be.matrixWorld),G.matrix.invert(),G.matrix.multiply(ee.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(ee.projectionMatrix),G.projectionMatrixInverse.copy(ee.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=lm*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(v===null&&M===null))return g},this.setFoveation=function(G){g=G,v!==null&&(v.fixedFoveation=G),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=G)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(q)},this.getCameraTexture=function(G){return b[G]};let B=null;function re(G,ee){if(y=ee.getViewerPose(m||d),A=ee,y!==null){const be=y.views;M!==null&&(t.setRenderTargetFramebuffer(R,M.framebuffer),t.setRenderTarget(R));let Ne=!1;be.length!==q.cameras.length&&(q.cameras.length=0,Ne=!0);for(let Ge=0;Ge<be.length;Ge++){const st=be[Ge];let lt=null;if(M!==null)lt=M.getViewport(st);else{const nt=x.getViewSubImage(v,st);lt=nt.viewport,Ge===0&&(t.setRenderTargetTextures(R,nt.colorTexture,nt.depthStencilTexture),t.setRenderTarget(R))}let Je=ae[Ge];Je===void 0&&(Je=new Ri,Je.layers.enable(Ge),Je.viewport=new un,ae[Ge]=Je),Je.matrix.fromArray(st.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(st.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(lt.x,lt.y,lt.width,lt.height),Ge===0&&(q.matrix.copy(Je.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Ne===!0&&q.cameras.push(Je)}const ge=l.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&N){x=s.getBinding();const Ge=x.getDepthInformation(be[0]);Ge&&Ge.isValid&&Ge.texture&&S.init(Ge,l.renderState)}if(ge&&ge.includes("camera-access")&&N){t.state.unbindTexture(),x=s.getBinding();for(let Ge=0;Ge<be.length;Ge++){const st=be[Ge].camera;if(st){let lt=b[st];lt||(lt=new mS,b[st]=lt);const Je=x.getCameraImage(st);lt.sourceTexture=Je}}}}for(let be=0;be<U.length;be++){const Ne=P[be],ge=U[be];Ne!==null&&ge!==void 0&&ge.update(Ne,ee,m||d)}B&&B(G,ee),ee.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ee}),A=null}const Se=new _S;Se.setAnimationLoop(re),this.setAnimationLoop=function(G){B=G},this.dispose=function(){}}}const MC=new on,AS=new gt;AS.set(-1,0,0,0,1,0,0,0,1);function EC(o,t){function i(S,b){S.matrixAutoUpdate===!0&&S.updateMatrix(),b.value.copy(S.matrix)}function s(S,b){b.color.getRGB(S.fogColor.value,gS(o)),b.isFog?(S.fogNear.value=b.near,S.fogFar.value=b.far):b.isFogExp2&&(S.fogDensity.value=b.density)}function l(S,b,L,k,R){b.isNodeMaterial?b.uniformsNeedUpdate=!1:b.isMeshBasicMaterial?u(S,b):b.isMeshLambertMaterial?(u(S,b),b.envMap&&(S.envMapIntensity.value=b.envMapIntensity)):b.isMeshToonMaterial?(u(S,b),x(S,b)):b.isMeshPhongMaterial?(u(S,b),y(S,b),b.envMap&&(S.envMapIntensity.value=b.envMapIntensity)):b.isMeshStandardMaterial?(u(S,b),v(S,b),b.isMeshPhysicalMaterial&&M(S,b,R)):b.isMeshMatcapMaterial?(u(S,b),A(S,b)):b.isMeshDepthMaterial?u(S,b):b.isMeshDistanceMaterial?(u(S,b),N(S,b)):b.isMeshNormalMaterial?u(S,b):b.isLineBasicMaterial?(d(S,b),b.isLineDashedMaterial&&h(S,b)):b.isPointsMaterial?g(S,b,L,k):b.isSpriteMaterial?m(S,b):b.isShadowMaterial?(S.color.value.copy(b.color),S.opacity.value=b.opacity):b.isShaderMaterial&&(b.uniformsNeedUpdate=!1)}function u(S,b){S.opacity.value=b.opacity,b.color&&S.diffuse.value.copy(b.color),b.emissive&&S.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity),b.map&&(S.map.value=b.map,i(b.map,S.mapTransform)),b.alphaMap&&(S.alphaMap.value=b.alphaMap,i(b.alphaMap,S.alphaMapTransform)),b.bumpMap&&(S.bumpMap.value=b.bumpMap,i(b.bumpMap,S.bumpMapTransform),S.bumpScale.value=b.bumpScale,b.side===Zn&&(S.bumpScale.value*=-1)),b.normalMap&&(S.normalMap.value=b.normalMap,i(b.normalMap,S.normalMapTransform),S.normalScale.value.copy(b.normalScale),b.side===Zn&&S.normalScale.value.negate()),b.displacementMap&&(S.displacementMap.value=b.displacementMap,i(b.displacementMap,S.displacementMapTransform),S.displacementScale.value=b.displacementScale,S.displacementBias.value=b.displacementBias),b.emissiveMap&&(S.emissiveMap.value=b.emissiveMap,i(b.emissiveMap,S.emissiveMapTransform)),b.specularMap&&(S.specularMap.value=b.specularMap,i(b.specularMap,S.specularMapTransform)),b.alphaTest>0&&(S.alphaTest.value=b.alphaTest);const L=t.get(b),k=L.envMap,R=L.envMapRotation;k&&(S.envMap.value=k,S.envMapRotation.value.setFromMatrix4(MC.makeRotationFromEuler(R)).transpose(),k.isCubeTexture&&k.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(AS),S.reflectivity.value=b.reflectivity,S.ior.value=b.ior,S.refractionRatio.value=b.refractionRatio),b.lightMap&&(S.lightMap.value=b.lightMap,S.lightMapIntensity.value=b.lightMapIntensity,i(b.lightMap,S.lightMapTransform)),b.aoMap&&(S.aoMap.value=b.aoMap,S.aoMapIntensity.value=b.aoMapIntensity,i(b.aoMap,S.aoMapTransform))}function d(S,b){S.diffuse.value.copy(b.color),S.opacity.value=b.opacity,b.map&&(S.map.value=b.map,i(b.map,S.mapTransform))}function h(S,b){S.dashSize.value=b.dashSize,S.totalSize.value=b.dashSize+b.gapSize,S.scale.value=b.scale}function g(S,b,L,k){S.diffuse.value.copy(b.color),S.opacity.value=b.opacity,S.size.value=b.size*L,S.scale.value=k*.5,b.map&&(S.map.value=b.map,i(b.map,S.uvTransform)),b.alphaMap&&(S.alphaMap.value=b.alphaMap,i(b.alphaMap,S.alphaMapTransform)),b.alphaTest>0&&(S.alphaTest.value=b.alphaTest)}function m(S,b){S.diffuse.value.copy(b.color),S.opacity.value=b.opacity,S.rotation.value=b.rotation,b.map&&(S.map.value=b.map,i(b.map,S.mapTransform)),b.alphaMap&&(S.alphaMap.value=b.alphaMap,i(b.alphaMap,S.alphaMapTransform)),b.alphaTest>0&&(S.alphaTest.value=b.alphaTest)}function y(S,b){S.specular.value.copy(b.specular),S.shininess.value=Math.max(b.shininess,1e-4)}function x(S,b){b.gradientMap&&(S.gradientMap.value=b.gradientMap)}function v(S,b){S.metalness.value=b.metalness,b.metalnessMap&&(S.metalnessMap.value=b.metalnessMap,i(b.metalnessMap,S.metalnessMapTransform)),S.roughness.value=b.roughness,b.roughnessMap&&(S.roughnessMap.value=b.roughnessMap,i(b.roughnessMap,S.roughnessMapTransform)),b.envMap&&(S.envMapIntensity.value=b.envMapIntensity)}function M(S,b,L){S.ior.value=b.ior,b.sheen>0&&(S.sheenColor.value.copy(b.sheenColor).multiplyScalar(b.sheen),S.sheenRoughness.value=b.sheenRoughness,b.sheenColorMap&&(S.sheenColorMap.value=b.sheenColorMap,i(b.sheenColorMap,S.sheenColorMapTransform)),b.sheenRoughnessMap&&(S.sheenRoughnessMap.value=b.sheenRoughnessMap,i(b.sheenRoughnessMap,S.sheenRoughnessMapTransform))),b.clearcoat>0&&(S.clearcoat.value=b.clearcoat,S.clearcoatRoughness.value=b.clearcoatRoughness,b.clearcoatMap&&(S.clearcoatMap.value=b.clearcoatMap,i(b.clearcoatMap,S.clearcoatMapTransform)),b.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=b.clearcoatRoughnessMap,i(b.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),b.clearcoatNormalMap&&(S.clearcoatNormalMap.value=b.clearcoatNormalMap,i(b.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(b.clearcoatNormalScale),b.side===Zn&&S.clearcoatNormalScale.value.negate())),b.dispersion>0&&(S.dispersion.value=b.dispersion),b.retroreflectivity>0&&(S.retroreflectivity.value=b.retroreflectivity),b.iridescence>0&&(S.iridescence.value=b.iridescence,S.iridescenceIOR.value=b.iridescenceIOR,S.iridescenceThicknessMinimum.value=b.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=b.iridescenceThicknessRange[1],b.iridescenceMap&&(S.iridescenceMap.value=b.iridescenceMap,i(b.iridescenceMap,S.iridescenceMapTransform)),b.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=b.iridescenceThicknessMap,i(b.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),b.transmission>0&&(S.transmission.value=b.transmission,S.transmissionSamplerMap.value=L.texture,S.transmissionSamplerSize.value.set(L.width,L.height),b.transmissionMap&&(S.transmissionMap.value=b.transmissionMap,i(b.transmissionMap,S.transmissionMapTransform)),S.thickness.value=b.thickness,b.thicknessMap&&(S.thicknessMap.value=b.thicknessMap,i(b.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=b.attenuationDistance,S.attenuationColor.value.copy(b.attenuationColor)),b.anisotropy>0&&(S.anisotropyVector.value.set(b.anisotropy*Math.cos(b.anisotropyRotation),b.anisotropy*Math.sin(b.anisotropyRotation)),b.anisotropyMap&&(S.anisotropyMap.value=b.anisotropyMap,i(b.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=b.specularIntensity,S.specularColor.value.copy(b.specularColor),b.specularColorMap&&(S.specularColorMap.value=b.specularColorMap,i(b.specularColorMap,S.specularColorMapTransform)),b.specularIntensityMap&&(S.specularIntensityMap.value=b.specularIntensityMap,i(b.specularIntensityMap,S.specularIntensityMapTransform))}function A(S,b){b.matcap&&(S.matcap.value=b.matcap)}function N(S,b){const L=t.get(b).light;S.referencePosition.value.setFromMatrixPosition(L.matrixWorld),S.nearDistance.value=L.shadow.camera.near,S.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function TC(o,t,i,s){let l={},u={},d=[];const h=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function g(R,U){const P=U.program;s.uniformBlockBinding(R,P)}function m(R,U){let P=l[R.id];P===void 0&&(S(R),P=y(R),l[R.id]=P,R.addEventListener("dispose",L));const F=U.program;s.updateUBOMapping(R,F);const T=t.render.frame;u[R.id]!==T&&(v(R),u[R.id]=T)}function y(R){const U=x();R.__bindingPointIndex=U;const P=o.createBuffer(),F=R.__size,T=R.usage;return o.bindBuffer(o.UNIFORM_BUFFER,P),o.bufferData(o.UNIFORM_BUFFER,F,T),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,U,P),P}function x(){for(let R=0;R<h;R++)if(d.indexOf(R)===-1)return d.push(R),R;return Ft("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(R){const U=l[R.id],P=R.uniforms,F=R.__cache;o.bindBuffer(o.UNIFORM_BUFFER,U);for(let T=0,I=P.length;T<I;T++){const j=P[T];if(Array.isArray(j))for(let W=0,ae=j.length;W<ae;W++)M(j[W],T,W,F);else M(j,T,0,F)}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(R,U,P,F){if(N(R,U,P,F)===!0){const T=R.__offset,I=R.value;if(Array.isArray(I)){let j=0;for(let W=0;W<I.length;W++){const ae=I[W],q=b(ae);A(ae,R.__data,j),typeof ae!="number"&&typeof ae!="boolean"&&!ae.isMatrix3&&!ArrayBuffer.isView(ae)&&(j+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else A(I,R.__data,0);o.bufferSubData(o.UNIFORM_BUFFER,T,R.__data)}}function A(R,U,P){typeof R=="number"||typeof R=="boolean"?U[0]=R:R.isMatrix3?(U[0]=R.elements[0],U[1]=R.elements[1],U[2]=R.elements[2],U[3]=0,U[4]=R.elements[3],U[5]=R.elements[4],U[6]=R.elements[5],U[7]=0,U[8]=R.elements[6],U[9]=R.elements[7],U[10]=R.elements[8],U[11]=0):ArrayBuffer.isView(R)?U.set(new R.constructor(R.buffer,R.byteOffset,U.length)):R.toArray(U,P)}function N(R,U,P,F){const T=R.value,I=U+"_"+P;if(F[I]===void 0)return typeof T=="number"||typeof T=="boolean"?F[I]=T:ArrayBuffer.isView(T)?F[I]=T.slice():F[I]=T.clone(),!0;{const j=F[I];if(typeof T=="number"||typeof T=="boolean"){if(j!==T)return F[I]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(j.equals(T)===!1)return j.copy(T),!0}}return!1}function S(R){const U=R.uniforms;let P=0;const F=16;for(let I=0,j=U.length;I<j;I++){const W=Array.isArray(U[I])?U[I]:[U[I]];for(let ae=0,q=W.length;ae<q;ae++){const Y=W[ae],ne=Array.isArray(Y.value)?Y.value:[Y.value];for(let Q=0,J=ne.length;Q<J;Q++){const me=ne[Q],ue=b(me),O=P%F,D=O%ue.boundary,_e=O+D;P+=D,_e!==0&&F-_e<ue.storage&&(P+=F-_e),Y.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=P,P+=ue.storage}}}const T=P%F;return T>0&&(P+=F-T),R.__size=P,R.__cache={},this}function b(R){const U={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(U.boundary=4,U.storage=4):R.isVector2?(U.boundary=8,U.storage=8):R.isVector3||R.isColor?(U.boundary=16,U.storage=12):R.isVector4?(U.boundary=16,U.storage=16):R.isMatrix3?(U.boundary=48,U.storage=48):R.isMatrix4?(U.boundary=64,U.storage=64):R.isTexture?dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(R)?(U.boundary=16,U.storage=R.byteLength):dt("WebGLRenderer: Unsupported uniform value type.",R),U}function L(R){const U=R.target;U.removeEventListener("dispose",L);const P=d.indexOf(U.__bindingPointIndex);d.splice(P,1),o.deleteBuffer(l[U.id]),delete l[U.id],delete u[U.id]}function k(){for(const R in l)o.deleteBuffer(l[R]);d=[],l={},u={}}return{bind:g,update:m,dispose:k}}const AC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let la=null;function wC(){return la===null&&(la=new cT(AC,16,16,sr,ma),la.name="DFG_LUT",la.minFilter=Gn,la.magFilter=Gn,la.wrapS=za,la.wrapT=za,la.generateMipmaps=!1,la.needsUpdate=!0),la}class CC{constructor(t={}){const{canvas:i=IE(),context:s=null,depth:l=!0,stencil:u=!1,alpha:d=!1,antialias:h=!1,premultipliedAlpha:g=!0,preserveDrawingBuffer:m=!1,powerPreference:y="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:v=!1,outputBufferType:M=mi}=t;this.isWebGLRenderer=!0;let A;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");A=s.getContextAttributes().alpha}else A=d;const N=M,S=new Set([Mm,bm,Sm]),b=new Set([mi,pa,Ul,Ll,_m,ym]),L=new Uint32Array(4),k=new Int32Array(4),R=new he;let U=null,P=null;const F=[],T=[];let I=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ha,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const j=this;let W=!1,ae=null,q=null,Y=null,ne=null;this._outputColorSpace=pi;let Q=0,J=0,me=null,ue=-1,O=null;const D=new un,_e=new un;let we=null;const B=new It(0);let re=0,Se=i.width,G=i.height,ee=1,be=null,Ne=null;const ge=new un(0,0,Se,G),Ce=new un(0,0,Se,G);let ut=!1;const Ge=new wm;let st=!1,lt=!1;const Je=new on,nt=new he,Et=new un,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function $t(){return me===null?ee:1}let Z=s;function tn(w,V){return i.getContext(w,V)}let Dt,z,E,se,le,ve,De,Ue,ye,Ae,Oe,it,He,Fe,qe,rt,ht,K,Le,Te,Ie,We,Re;try{const w={alpha:!0,depth:l,stencil:u,antialias:h,premultipliedAlpha:g,preserveDrawingBuffer:m,powerPreference:y,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${gm}`),i.addEventListener("webglcontextlost",Ut,!1),i.addEventListener("webglcontextrestored",pt,!1),i.addEventListener("webglcontextcreationerror",ni,!1),Z===null){const V="webgl2";if(Z=tn(V,w),Z===null)throw tn(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}tt()}catch(w){throw i.removeEventListener("webglcontextlost",Ut,!1),i.removeEventListener("webglcontextrestored",pt,!1),i.removeEventListener("webglcontextcreationerror",ni,!1),Ft("WebGLRenderer: "+w.message),w}function tt(){Dt=new w2(Z),Dt.init(),Ie=new vC(Z,Dt),z=new x2(Z,Dt,t,Ie),E=new gC(Z,Dt),z.reversedDepthBuffer&&v&&E.buffers.depth.setReversed(!0),q=Z.createFramebuffer(),Y=Z.createFramebuffer(),ne=Z.createFramebuffer(),se=new N2(Z),le=new nC,ve=new xC(Z,Dt,E,le,z,Ie,se),De=new A2(j),Ue=new UT(Z),We=new m2(Z,Ue),ye=new C2(Z,Ue,se,We),Ae=new U2(Z,ye,Ue,We,se),K=new D2(Z,z,ve),qe=new v2(le),Oe=new tC(j,De,Dt,z,We,qe),it=new EC(j,le),He=new aC,Fe=new uC(Dt),ht=new p2(j,De,E,Ae,A,g),rt=new mC(j,Ae,z),Re=new TC(Z,se,z,E),Le=new g2(Z,Dt,se),Te=new R2(Z,Dt,se),se.programs=Oe.programs,j.capabilities=z,j.extensions=Dt,j.properties=le,j.renderLists=He,j.shadowMap=rt,j.state=E,j.info=se}N!==mi&&(I=new O2(N,i.width,i.height,h,l,u));const Xe=new bC(j,Z);this.xr=Xe,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){const w=Dt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Dt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(w){w!==void 0&&(ee=w,this.setSize(Se,G,!1))},this.getSize=function(w){return w.set(Se,G)},this.setSize=function(w,V,xe=!0){if(Xe.isPresenting){dt("WebGLRenderer: Can't change size while VR device is presenting.");return}Se=w,G=V,i.width=Math.floor(w*ee),i.height=Math.floor(V*ee),xe===!0&&(i.style.width=w+"px",i.style.height=V+"px"),I!==null&&I.setSize(i.width,i.height),this.setViewport(0,0,w,V)},this.getDrawingBufferSize=function(w){return w.set(Se*ee,G*ee).floor()},this.setDrawingBufferSize=function(w,V,xe){Se=w,G=V,ee=xe,i.width=Math.floor(w*xe),i.height=Math.floor(V*xe),this.setViewport(0,0,w,V)},this.setEffects=function(w){if(N===mi){Ft("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let V=0;V<w.length;V++)if(w[V].isOutputPass===!0){dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(D)},this.getViewport=function(w){return w.copy(ge)},this.setViewport=function(w,V,xe,ce){w.isVector4?ge.set(w.x,w.y,w.z,w.w):ge.set(w,V,xe,ce),E.viewport(D.copy(ge).multiplyScalar(ee).round())},this.getScissor=function(w){return w.copy(Ce)},this.setScissor=function(w,V,xe,ce){w.isVector4?Ce.set(w.x,w.y,w.z,w.w):Ce.set(w,V,xe,ce),E.scissor(_e.copy(Ce).multiplyScalar(ee).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(w){E.setScissorTest(ut=w)},this.setOpaqueSort=function(w){be=w},this.setTransparentSort=function(w){Ne=w},this.getClearColor=function(w){return w.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,xe=!0){let ce=0;if(w){let fe=!1;if(me!==null){const Ve=me.texture.format;fe=S.has(Ve)}if(fe){const Ve=me.texture.type,Ye=b.has(Ve),ze=ht.getClearColor(),Qe=ht.getClearAlpha(),$e=ze.r,ct=ze.g,mt=ze.b;Ye?(L[0]=$e,L[1]=ct,L[2]=mt,L[3]=Qe,Z.clearBufferuiv(Z.COLOR,0,L)):(k[0]=$e,k[1]=ct,k[2]=mt,k[3]=Qe,Z.clearBufferiv(Z.COLOR,0,k))}else ce|=Z.COLOR_BUFFER_BIT}V&&(ce|=Z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),xe&&(ce|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ce!==0&&Z.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),ae=w},this.dispose=function(){i.removeEventListener("webglcontextlost",Ut,!1),i.removeEventListener("webglcontextrestored",pt,!1),i.removeEventListener("webglcontextcreationerror",ni,!1),ht.dispose(),He.dispose(),Fe.dispose(),le.dispose(),De.dispose(),Ae.dispose(),We.dispose(),Re.dispose(),Oe.dispose(),Xe.dispose(),Xe.removeEventListener("sessionstart",ws),Xe.removeEventListener("sessionend",ka),Wi.stop()};function Ut(w){w.preventDefault(),qu("WebGLRenderer: Context Lost."),W=!0}function pt(){qu("WebGLRenderer: Context Restored."),W=!1;const w=se.autoReset,V=rt.enabled,xe=rt.autoUpdate,ce=rt.needsUpdate,fe=rt.type;tt(),se.autoReset=w,rt.enabled=V,rt.autoUpdate=xe,rt.needsUpdate=ce,rt.type=fe}function ni(w){Ft("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function xi(w){const V=w.target;V.removeEventListener("dispose",xi),sf(V)}function sf(w){lr(w),le.remove(w)}function lr(w){const V=le.get(w).programs;V!==void 0&&(V.forEach(function(xe){Oe.releaseProgram(xe)}),w.isShaderMaterial&&Oe.releaseShaderCache(w))}this.renderBufferDirect=function(w,V,xe,ce,fe,Ve){V===null&&(V=Ht);const Ye=fe.isMesh&&fe.matrixWorld.determinantAffine()<0,ze=Co(w,V,xe,ce,fe);E.setMaterial(ce,Ye);let Qe=xe.index,$e=1;if(ce.wireframe===!0){if(Qe=ye.getWireframeAttribute(xe),Qe===void 0)return;$e=2}const ct=xe.drawRange,mt=xe.attributes.position;let Ze=ct.start*$e,Tt=(ct.start+ct.count)*$e;Ve!==null&&(Ze=Math.max(Ze,Ve.start*$e),Tt=Math.min(Tt,(Ve.start+Ve.count)*$e)),Qe!==null?(Ze=Math.max(Ze,0),Tt=Math.min(Tt,Qe.count)):mt!=null&&(Ze=Math.max(Ze,0),Tt=Math.min(Tt,mt.count));const St=Tt-Ze;if(St<0||St===1/0)return;We.setup(fe,ce,ze,xe,Qe);let Kt,jt=Le;if(Qe!==null&&(Kt=Ue.get(Qe),jt=Te,jt.setIndex(Kt)),fe.isMesh)ce.wireframe===!0?(E.setLineWidth(ce.wireframeLinewidth*$t()),jt.setMode(Z.LINES)):jt.setMode(Z.TRIANGLES);else if(fe.isLine){let Sn=ce.linewidth;Sn===void 0&&(Sn=1),E.setLineWidth(Sn*$t()),fe.isLineSegments?jt.setMode(Z.LINES):fe.isLineLoop?jt.setMode(Z.LINE_LOOP):jt.setMode(Z.LINE_STRIP)}else fe.isPoints?jt.setMode(Z.POINTS):fe.isSprite&&jt.setMode(Z.TRIANGLES);if(fe.isBatchedMesh)if(Dt.get("WEBGL_multi_draw"))jt.renderMultiDraw(fe._multiDrawStarts,fe._multiDrawCounts,fe._multiDrawCount);else{const Sn=fe._multiDrawStarts,ke=fe._multiDrawCounts,fn=fe._multiDrawCount,Lt=Qe?Ue.get(Qe).bytesPerElement:1,Vn=le.get(ce).currentProgram.getUniforms();for(let ii=0;ii<fn;ii++)Vn.setValue(Z,"_gl_DrawID",ii),jt.render(Sn[ii]/Lt,ke[ii])}else if(fe.isInstancedMesh)jt.renderInstances(Ze,St,fe.count);else if(xe.isInstancedBufferGeometry){const Sn=xe._maxInstanceCount!==void 0?xe._maxInstanceCount:1/0,ke=Math.min(xe.instanceCount,Sn);jt.renderInstances(Ze,St,ke)}else jt.render(Ze,St)};function As(w,V,xe,ce){ae!==null&&w.isNodeMaterial&&ae.setObject(ce,w),st===!0&&qe.setState(w,xe,!1),w.transparent===!0&&w.side===Ia&&w.forceSinglePass===!1?(w.side=Zn,w.needsUpdate=!0,Cs(w,V,ce),w.side=ir,w.needsUpdate=!0,Cs(w,V,ce),w.side=Ia):Cs(w,V,ce)}this.compile=function(w,V,xe=null){xe===null&&(xe=w),ae!==null&&ae.renderStart(w,V,xe),P=Fe.get(xe),P.init(V),T.push(P),xe.traverseVisible(function(fe){fe.isLight&&fe.layers.test(V.layers)&&(P.pushLight(fe),fe.castShadow&&P.pushShadow(fe))}),w!==xe&&w.traverseVisible(function(fe){fe.isLight&&fe.layers.test(V.layers)&&(P.pushLight(fe),fe.castShadow&&P.pushShadow(fe))}),P.setupLights(),ae!==null&&ae.updateLights(P.state.lightsArray),lt=this.localClippingEnabled,st=qe.init(this.clippingPlanes,lt),st===!0&&qe.setGlobalState(this.clippingPlanes,V),ae!==null&&rt.render(P.state.shadowsArray,xe,V);const ce=new Set;return w.traverse(function(fe){if(!(fe.isMesh||fe.isPoints||fe.isLine||fe.isSprite))return;const Ve=fe.material;if(Ve)if(Array.isArray(Ve))for(let Ye=0;Ye<Ve.length;Ye++){const ze=Ve[Ye];As(ze,xe,V,fe),ce.add(ze)}else As(Ve,xe,V,fe),ce.add(Ve)}),P=T.pop(),ae!==null&&ae.renderEnd(),ce},this.compileAsync=function(w,V,xe=null){const ce=this.compile(w,V,xe);return new Promise(fe=>{function Ve(){if(ce.forEach(function(Ye){const Qe=le.get(Ye).currentProgram;(Qe===void 0||Qe.isReady())&&ce.delete(Ye)}),ce.size===0){fe(w);return}setTimeout(Ve,10)}Dt.get("KHR_parallel_shader_compile")!==null?Ve():setTimeout(Ve,10)})};let Va=null;function ga(w){Va&&Va(w)}function ws(){Wi.stop()}function ka(){Wi.start()}const Wi=new _S;Wi.setAnimationLoop(ga),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(w){Va=w,Xe.setAnimationLoop(w),w===null?Wi.stop():Wi.start()},Xe.addEventListener("sessionstart",ws),Xe.addEventListener("sessionend",ka),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0){Ft("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;ae!==null&&ae.renderStart(w,V);const xe=Xe.enabled===!0&&Xe.isPresenting===!0,ce=I!==null&&(me===null||xe)&&I.begin(j,me);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(V),V=Xe.getCamera()),w.isScene===!0&&w.onBeforeRender(j,w,V,me),P=Fe.get(w,T.length),P.init(V),P.state.textureUnits=ve.getTextureUnits(),T.push(P),Je.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Ge.setFromProjectionMatrix(Je,da,V.reversedDepth),lt=this.localClippingEnabled,st=qe.init(this.clippingPlanes,lt),U=He.get(w,F.length),U.init(),F.push(U),Xe.enabled===!0&&Xe.isPresenting===!0){const Ye=j.xr.getDepthSensingMesh();Ye!==null&&Mo(Ye,V,-1/0,j.sortObjects)}Mo(w,V,0,j.sortObjects),U.finish(),ae!==null&&ae.updateLights(P.state.lightsArray),j.sortObjects===!0&&U.sort(be,Ne),zt=Xe.enabled===!1||Xe.isPresenting===!1||Xe.hasDepthSensing()===!1,zt&&ht.addToRenderList(U,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&qe.beginShadows();const fe=P.state.shadowsArray;if(rt.render(fe,w,V),st===!0&&qe.endShadows(),(ce&&I.hasRenderPass())===!1){const Ye=U.opaque,ze=U.transmissive;if(P.setupLights(),V.isArrayCamera){const Qe=V.cameras;if(ze.length>0)for(let $e=0,ct=Qe.length;$e<ct;$e++){const mt=Qe[$e];cr(Ye,ze,w,mt)}zt&&ht.render(w);for(let $e=0,ct=Qe.length;$e<ct;$e++){const mt=Qe[$e];Eo(U,w,mt,mt.viewport)}}else ze.length>0&&cr(Ye,ze,w,V),zt&&ht.render(w),Eo(U,w,V)}me!==null&&J===0&&(ve.updateMultisampleRenderTarget(me),ve.updateRenderTargetMipmap(me)),ce&&I.end(j),w.isScene===!0&&w.onAfterRender(j,w,V),We.resetDefaultState(),ue=-1,O=null,T.pop(),T.length>0?(P=T[T.length-1],ve.setTextureUnits(P.state.textureUnits),st===!0&&qe.setGlobalState(j.clippingPlanes,P.state.camera)):P=null,F.pop(),F.length>0?U=F[F.length-1]:U=null,ae!==null&&ae.renderEnd()};function Mo(w,V,xe,ce){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)xe=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLightProbeGrid)P.pushLightProbeGrid(w);else if(w.isLight)P.pushLight(w),w.castShadow&&P.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Ge)){ce&&Et.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Je);const Ye=Ae.update(w),ze=w.material;ze.visible&&U.push(w,Ye,ze,xe,Et.z,null,V)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Ge))){const Ye=Ae.update(w),ze=w.material;if(ce&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Et.copy(w.boundingSphere.center)):(Ye.boundingSphere===null&&Ye.computeBoundingSphere(),Et.copy(Ye.boundingSphere.center)),Et.applyMatrix4(w.matrixWorld).applyMatrix4(Je)),Array.isArray(ze)){const Qe=Ye.groups;for(let $e=0,ct=Qe.length;$e<ct;$e++){const mt=Qe[$e],Ze=ze[mt.materialIndex];Ze&&Ze.visible&&U.push(w,Ye,Ze,xe,Et.z,mt,V)}}else ze.visible&&U.push(w,Ye,ze,xe,Et.z,null,V)}}const Ve=w.children;for(let Ye=0,ze=Ve.length;Ye<ze;Ye++)Mo(Ve[Ye],V,xe,ce)}function Eo(w,V,xe,ce){const{opaque:fe,transmissive:Ve,transparent:Ye}=w;P.setupLightsView(xe),st===!0&&qe.setGlobalState(j.clippingPlanes,xe),ce&&E.viewport(D.copy(ce)),fe.length>0&&qi(fe,V,xe),Ve.length>0&&qi(Ve,V,xe),Ye.length>0&&qi(Ye,V,xe),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function cr(w,V,xe,ce){if((xe.isScene===!0?xe.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[ce.id]===void 0){const Ze=Dt.has("EXT_color_buffer_half_float")||Dt.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[ce.id]=new ki(1,1,{generateMipmaps:!0,type:Ze?ma:mi,minFilter:tr,samples:Math.max(4,z.samples),stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ot.workingColorSpace})}const Ve=P.state.transmissionRenderTarget[ce.id],Ye=ce.viewport||D;Ve.setSize(Ye.z*j.transmissionResolutionScale,Ye.w*j.transmissionResolutionScale);const ze=j.getRenderTarget(),Qe=j.getActiveCubeFace(),$e=j.getActiveMipmapLevel();j.setRenderTarget(Ve),j.getClearColor(B),re=j.getClearAlpha(),re<1&&j.setClearColor(16777215,.5),j.clear(),zt&&ht.render(xe);const ct=j.toneMapping;j.toneMapping=ha;const mt=ce.viewport;if(ce.viewport!==void 0&&(ce.viewport=void 0),P.setupLightsView(ce),st===!0&&qe.setGlobalState(j.clippingPlanes,ce),qi(w,xe,ce),ve.updateMultisampleRenderTarget(Ve),ve.updateRenderTargetMipmap(Ve),Dt.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let Tt=0,St=V.length;Tt<St;Tt++){const Kt=V[Tt],{object:jt,geometry:Sn,material:ke,group:fn}=Kt;if(ke.side===Ia&&jt.layers.test(ce.layers)){const Lt=ke.side;ke.side=Zn,ke.needsUpdate=!0,Hl(jt,xe,ce,Sn,ke,fn),ke.side=Lt,ke.needsUpdate=!0,Ze=!0}}Ze===!0&&(ve.updateMultisampleRenderTarget(Ve),ve.updateRenderTargetMipmap(Ve))}j.setRenderTarget(ze,Qe,$e),j.setClearColor(B,re),mt!==void 0&&(ce.viewport=mt),j.toneMapping=ct}function qi(w,V,xe){const ce=V.isScene===!0?V.overrideMaterial:null;for(let fe=0,Ve=w.length;fe<Ve;fe++){const Ye=w[fe],{object:ze,geometry:Qe,group:$e}=Ye;let ct=Ye.material;ct.allowOverride===!0&&ce!==null&&(ct=ce),ze.layers.test(xe.layers)&&Hl(ze,V,xe,Qe,ct,$e)}}function Hl(w,V,xe,ce,fe,Ve){ae!==null&&fe.isNodeMaterial&&ae.setObject(w,fe),w.onBeforeRender(j,V,xe,ce,fe,Ve),w.modelViewMatrix.multiplyMatrices(xe.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),fe.onBeforeRender(j,V,xe,ce,w,Ve),fe.transparent===!0&&fe.side===Ia&&fe.forceSinglePass===!1?(fe.side=Zn,fe.needsUpdate=!0,j.renderBufferDirect(xe,V,ce,fe,w,Ve),fe.side=ir,fe.needsUpdate=!0,j.renderBufferDirect(xe,V,ce,fe,w,Ve),fe.side=Ia):j.renderBufferDirect(xe,V,ce,fe,w,Ve),w.onAfterRender(j,V,xe,ce,fe,Ve)}function Cs(w,V,xe){V.isScene!==!0&&(V=Ht);const ce=le.get(w),fe=P.state.lights,Ve=P.state.shadowsArray,Ye=fe.state.version,ze=Oe.getParameters(w,fe.state,Ve,V,xe,P.state.lightProbeGridArray),Qe=Oe.getProgramCacheKey(ze);let $e=ce.programs;ce.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?V.environment:null,ce.fog=V.fog;const ct=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ce.envMap=De.get(w.envMap||ce.environment,ct),ce.envMapRotation=ce.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,$e===void 0&&(w.addEventListener("dispose",xi),$e=new Map,ce.programs=$e);let mt=$e.get(Qe);if(mt!==void 0){if(ce.currentProgram===mt&&ce.lightsStateVersion===Ye)return Ao(w,ze),mt}else ze.uniforms=Oe.getUniforms(w),ae!==null&&w.isNodeMaterial&&ae.build(w,xe,ze),w.onBeforeCompile(ze,j),mt=Oe.acquireProgram(ze,Qe),$e.set(Qe,mt),ce.uniforms=ze.uniforms;const Ze=ce.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ze.clippingPlanes=qe.uniform),Ao(w,ze),ce.needsLights=Vl(w),ce.lightsStateVersion=Ye,ce.needsLights&&(Ze.ambientLightColor.value=fe.state.ambient,Ze.lightProbe.value=fe.state.probe,Ze.sunLights.value=fe.state.sun,Ze.sunLightShadows.value=fe.state.sunShadow,Ze.directionalLights.value=fe.state.directional,Ze.directionalLightShadows.value=fe.state.directionalShadow,Ze.spotLights.value=fe.state.spot,Ze.spotLightShadows.value=fe.state.spotShadow,Ze.rectAreaLights.value=fe.state.rectArea,Ze.ltc_1.value=fe.state.rectAreaLTC1,Ze.ltc_2.value=fe.state.rectAreaLTC2,Ze.pointLights.value=fe.state.point,Ze.pointLightShadows.value=fe.state.pointShadow,Ze.hemisphereLights.value=fe.state.hemi,Ze.sunShadowMatrix.value=fe.state.sunShadowMatrix,Ze.sunShadowCascade.value=fe.state.sunShadowCascade,Ze.directionalShadowMatrix.value=fe.state.directionalShadowMatrix,Ze.spotLightMatrix.value=fe.state.spotLightMatrix,Ze.spotLightMap.value=fe.state.spotLightMap,Ze.pointShadowMatrix.value=fe.state.pointShadowMatrix),ce.lightProbeGrid=P.state.lightProbeGridArray.length>0,ce.currentProgram=mt,ce.uniformsList=null,mt}function To(w){if(w.uniformsList===null){const V=w.currentProgram.getUniforms();w.uniformsList=Gu.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function Ao(w,V){const xe=le.get(w);xe.outputColorSpace=V.outputColorSpace,xe.batching=V.batching,xe.batchingColor=V.batchingColor,xe.instancing=V.instancing,xe.instancingColor=V.instancingColor,xe.instancingMorph=V.instancingMorph,xe.skinning=V.skinning,xe.morphTargets=V.morphTargets,xe.morphNormals=V.morphNormals,xe.morphColors=V.morphColors,xe.morphTargetsCount=V.morphTargetsCount,xe.numClippingPlanes=V.numClippingPlanes,xe.numIntersection=V.numClipIntersection,xe.vertexAlphas=V.vertexAlphas,xe.vertexTangents=V.vertexTangents,xe.toneMapping=V.toneMapping}function wo(w,V){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;R.setFromMatrixPosition(V.matrixWorld);for(let xe=0,ce=w.length;xe<ce;xe++){const fe=w[xe];if(fe.texture!==null&&fe.boundingBox.containsPoint(R))return fe}return null}function Co(w,V,xe,ce,fe){V.isScene!==!0&&(V=Ht),ve.resetTextureUnits();const Ve=V.fog,Ye=ce.isMeshStandardMaterial||ce.isMeshLambertMaterial||ce.isMeshPhongMaterial?V.environment:null,ze=me===null?j.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:Ot.workingColorSpace,Qe=ce.isMeshStandardMaterial||ce.isMeshLambertMaterial&&!ce.envMap||ce.isMeshPhongMaterial&&!ce.envMap,$e=De.get(ce.envMap||Ye,Qe),ct=ce.vertexColors===!0&&!!xe.attributes.color&&xe.attributes.color.itemSize===4,mt=!!xe.attributes.tangent&&(!!ce.normalMap||ce.anisotropy>0),Ze=!!xe.morphAttributes.position,Tt=!!xe.morphAttributes.normal,St=!!xe.morphAttributes.color;let Kt=ha;ce.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(Kt=j.toneMapping);const jt=xe.morphAttributes.position||xe.morphAttributes.normal||xe.morphAttributes.color,Sn=jt!==void 0?jt.length:0,ke=le.get(ce),fn=P.state.lights;if(st===!0&&(lt===!0||w!==O)){const Ct=w===O&&ce.id===ue;qe.setState(ce,w,Ct)}let Lt=!1;ce.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==fn.state.version||ke.outputColorSpace!==ze||fe.isBatchedMesh&&ke.batching===!1||!fe.isBatchedMesh&&ke.batching===!0||fe.isBatchedMesh&&ke.batchingColor===!0&&fe._colorsTexture===null||fe.isBatchedMesh&&ke.batchingColor===!1&&fe._colorsTexture!==null||fe.isInstancedMesh&&ke.instancing===!1||!fe.isInstancedMesh&&ke.instancing===!0||fe.isSkinnedMesh&&ke.skinning===!1||!fe.isSkinnedMesh&&ke.skinning===!0||fe.isInstancedMesh&&ke.instancingColor===!0&&fe.instanceColor===null||fe.isInstancedMesh&&ke.instancingColor===!1&&fe.instanceColor!==null||fe.isInstancedMesh&&ke.instancingMorph===!0&&fe.morphTexture===null||fe.isInstancedMesh&&ke.instancingMorph===!1&&fe.morphTexture!==null||ke.envMap!==$e||ce.fog===!0&&ke.fog!==Ve||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==qe.numPlanes||ke.numIntersection!==qe.numIntersection)||ke.vertexAlphas!==ct||ke.vertexTangents!==mt||ke.morphTargets!==Ze||ke.morphNormals!==Tt||ke.morphColors!==St||ke.toneMapping!==Kt||ke.morphTargetsCount!==Sn||!!ke.lightProbeGrid!=P.state.lightProbeGridArray.length>0)&&(Lt=!0):(Lt=!0,ke.__version=ce.version);let Vn=ke.currentProgram;Lt===!0&&(Vn=Cs(ce,V,fe),ae&&ce.isNodeMaterial&&ae.onUpdateProgram(ce,Vn,ke));let ii=!1,Yi=!1,bt=!1;const Gt=Vn.getUniforms(),nn=ke.uniforms;if(E.useProgram(Vn.program)&&(ii=!0,Yi=!0,bt=!0),ce.id!==ue&&(ue=ce.id,Yi=!0),ke.needsLights){const Ct=wo(P.state.lightProbeGridArray,fe);ke.lightProbeGrid!==Ct&&(ke.lightProbeGrid=Ct,Yi=!0)}if(ii||O!==w){E.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Gt.setValue(Z,"projectionMatrix",w.projectionMatrix),Gt.setValue(Z,"viewMatrix",w.matrixWorldInverse);const dn=Gt.map.cameraPosition;dn!==void 0&&dn.setValue(Z,nt.setFromMatrixPosition(w.matrixWorld)),z.logarithmicDepthBuffer&&Gt.setValue(Z,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ce.isMeshPhongMaterial||ce.isMeshToonMaterial||ce.isMeshLambertMaterial||ce.isMeshBasicMaterial||ce.isMeshStandardMaterial||ce.isShaderMaterial)&&Gt.setValue(Z,"isOrthographic",w.isOrthographicCamera===!0),O!==w&&(O=w,Yi=!0,bt=!0)}if(ke.needsLights&&(fn.state.sunShadowMap.length>0&&Gt.setValue(Z,"sunShadowMap",fn.state.sunShadowMap,ve),fn.state.directionalShadowMap.length>0&&Gt.setValue(Z,"directionalShadowMap",fn.state.directionalShadowMap,ve),fn.state.spotShadowMap.length>0&&Gt.setValue(Z,"spotShadowMap",fn.state.spotShadowMap,ve),fn.state.pointShadowMap.length>0&&Gt.setValue(Z,"pointShadowMap",fn.state.pointShadowMap,ve)),fe.isSkinnedMesh){Gt.setOptional(Z,fe,"bindMatrix"),Gt.setOptional(Z,fe,"bindMatrixInverse");const Ct=fe.skeleton;Ct&&(Ct.boneTexture===null&&Ct.computeBoneTexture(),Gt.setValue(Z,"boneTexture",Ct.boneTexture,ve))}fe.isBatchedMesh&&(Gt.setOptional(Z,fe,"batchingTexture"),Gt.setValue(Z,"batchingTexture",fe._matricesTexture,ve),Gt.setOptional(Z,fe,"batchingIdTexture"),Gt.setValue(Z,"batchingIdTexture",fe._indirectTexture,ve),Gt.setOptional(Z,fe,"batchingColorTexture"),fe._colorsTexture!==null&&Gt.setValue(Z,"batchingColorTexture",fe._colorsTexture,ve));const ai=xe.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&K.update(fe,xe,Vn),(Yi||ke.receiveShadow!==fe.receiveShadow)&&(ke.receiveShadow=fe.receiveShadow,Gt.setValue(Z,"receiveShadow",fe.receiveShadow)),(ce.isMeshStandardMaterial||ce.isMeshLambertMaterial||ce.isMeshPhongMaterial)&&ce.envMap===null&&V.environment!==null&&(nn.envMapIntensity.value=V.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=wC()),Yi){if(Gt.setValue(Z,"toneMappingExposure",j.toneMappingExposure),ke.needsLights&&Gl(nn,bt),Ve&&ce.fog===!0&&it.refreshFogUniforms(nn,Ve),it.refreshMaterialUniforms(nn,ce,ee,G,P.state.transmissionRenderTarget[w.id]),ke.needsLights&&ke.lightProbeGrid){const Ct=ke.lightProbeGrid;nn.probesSH.value=Ct.texture,nn.probesMin.value.copy(Ct.boundingBox.min),nn.probesMax.value.copy(Ct.boundingBox.max),nn.probesResolution.value.copy(Ct.resolution)}Gu.upload(Z,To(ke),nn,ve)}if(ce.isShaderMaterial&&ce.uniformsNeedUpdate===!0&&(Gu.upload(Z,To(ke),nn,ve),ce.uniformsNeedUpdate=!1),ce.isSpriteMaterial&&Gt.setValue(Z,"center",fe.center),Gt.setValue(Z,"modelViewMatrix",fe.modelViewMatrix),Gt.setValue(Z,"normalMatrix",fe.normalMatrix),Gt.setValue(Z,"modelMatrix",fe.matrixWorld),ce.uniformsGroups!==void 0){const Ct=ce.uniformsGroups;for(let dn=0,xa=Ct.length;dn<xa;dn++){const kl=Ct[dn];Re.update(kl,Vn),Re.bind(kl,Vn)}}return Vn}function Gl(w,V){w.ambientLightColor.needsUpdate=V,w.lightProbe.needsUpdate=V,w.sunLights.needsUpdate=V,w.sunLightShadows.needsUpdate=V,w.directionalLights.needsUpdate=V,w.directionalLightShadows.needsUpdate=V,w.pointLights.needsUpdate=V,w.pointLightShadows.needsUpdate=V,w.spotLights.needsUpdate=V,w.spotLightShadows.needsUpdate=V,w.rectAreaLights.needsUpdate=V,w.hemisphereLights.needsUpdate=V}function Vl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return me},this.setRenderTargetTextures=function(w,V,xe){const ce=le.get(w);ce.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ce.__autoAllocateDepthBuffer===!1&&(ce.__useRenderToTexture=!1),le.get(w.texture).__webglTexture=V,le.get(w.depthTexture).__webglTexture=ce.__autoAllocateDepthBuffer?void 0:xe,ce.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,V){const xe=le.get(w);xe.__webglFramebuffer=V,xe.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(w,V=0,xe=0){me=w,Q=V,J=xe;let ce=null,fe=!1,Ve=!1;if(w){const ze=le.get(w);if(ze.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(Z.FRAMEBUFFER,ze.__webglFramebuffer),D.copy(w.viewport),_e.copy(w.scissor),we=w.scissorTest,E.viewport(D),E.scissor(_e),E.setScissorTest(we),ue=-1;return}else if(ze.__webglFramebuffer===void 0)ve.setupRenderTarget(w);else if(ze.__hasExternalTextures)ve.rebindTextures(w,le.get(w.texture).__webglTexture,le.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ct=w.depthTexture;if(ze.__boundDepthTexture!==ct){if(ct!==null&&le.has(ct)&&(w.width!==ct.image.width||w.height!==ct.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(w)}}const Qe=w.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Ve=!0);const $e=le.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray($e[V])?ce=$e[V][xe]:ce=$e[V],fe=!0):w.samples>0&&ve.useMultisampledRTT(w)===!1?ce=le.get(w).__webglMultisampledFramebuffer:Array.isArray($e)?ce=$e[xe]:ce=$e,D.copy(w.viewport),_e.copy(w.scissor),we=w.scissorTest}else D.copy(ge).multiplyScalar(ee).floor(),_e.copy(Ce).multiplyScalar(ee).floor(),we=ut;if(xe!==0&&(ce=q),E.bindFramebuffer(Z.FRAMEBUFFER,ce)&&E.drawBuffers(w,ce),E.viewport(D),E.scissor(_e),E.setScissorTest(we),fe){const ze=le.get(w.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+V,ze.__webglTexture,xe)}else if(Ve){const ze=V;for(let Qe=0;Qe<w.textures.length;Qe++){const $e=le.get(w.textures[Qe]);Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0+Qe,$e.__webglTexture,xe,ze)}}else if(w!==null&&xe!==0){const ze=le.get(w.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,ze.__webglTexture,xe)}ue=-1};function vi(w){const V=le.get(w);return(V.__readFormat!==w.format||V.__readType!==w.type)&&(V.__readFormat=w.format,V.__readType=w.type,V.__formatReadable=z.textureFormatReadable(w.format),V.__typeReadable=z.textureTypeReadable(w.type)),V}this.readRenderTargetPixels=function(w,V,xe,ce,fe,Ve,Ye,ze=0){if(!(w&&w.isWebGLRenderTarget)){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Qe=le.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ye!==void 0&&(Qe=Qe[Ye]),Qe){E.bindFramebuffer(Z.FRAMEBUFFER,Qe);try{const $e=w.textures[ze],ct=$e.format,mt=$e.type;w.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+ze);const Ze=vi($e);if(Ze.__formatReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ze.__typeReadable===!1){Ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=w.width-ce&&xe>=0&&xe<=w.height-fe&&Z.readPixels(V,xe,ce,fe,Ie.convert(ct),Ie.convert(mt),Ve)}finally{const $e=me!==null?le.get(me).__webglFramebuffer:null;E.bindFramebuffer(Z.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(w,V,xe,ce,fe,Ve,Ye,ze=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Qe=le.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ye!==void 0&&(Qe=Qe[Ye]),Qe)if(V>=0&&V<=w.width-ce&&xe>=0&&xe<=w.height-fe){E.bindFramebuffer(Z.FRAMEBUFFER,Qe);const $e=w.textures[ze],ct=$e.format,mt=$e.type;w.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+ze);const Ze=vi($e);if(Ze.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ze.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Tt=Z.createBuffer();Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Tt),Z.bufferData(Z.PIXEL_PACK_BUFFER,Ve.byteLength,Z.STREAM_READ),Z.readPixels(V,xe,ce,fe,Ie.convert(ct),Ie.convert(mt),0),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,null);const St=me!==null?le.get(me).__webglFramebuffer:null;E.bindFramebuffer(Z.FRAMEBUFFER,St);const Kt=Z.fenceSync(Z.SYNC_GPU_COMMANDS_COMPLETE,0);return Z.flush(),await zE(Z,Kt,4),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Tt),Z.getBufferSubData(Z.PIXEL_PACK_BUFFER,0,Ve),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,null),Z.deleteBuffer(Tt),Z.deleteSync(Kt),Ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,V=null,xe=0){const ce=Math.pow(2,-xe),fe=Math.floor(w.image.width*ce),Ve=Math.floor(w.image.height*ce),Ye=V!==null?V.x:0,ze=V!==null?V.y:0;ve.setTexture2D(w,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,xe,0,0,Ye,ze,fe,Ve),E.unbindTexture()},this.copyTextureToTexture=function(w,V,xe=null,ce=null,fe=0,Ve=0){let Ye,ze,Qe,$e,ct,mt,Ze,Tt,St;const Kt=w.isCompressedTexture?w.mipmaps[Ve]:w.image;if(xe!==null)Ye=xe.max.x-xe.min.x,ze=xe.max.y-xe.min.y,Qe=xe.isBox3?xe.max.z-xe.min.z:1,$e=xe.min.x,ct=xe.min.y,mt=xe.isBox3?xe.min.z:0;else{const nn=Math.pow(2,-fe);Ye=Math.floor(Kt.width*nn),ze=Math.floor(Kt.height*nn),w.isDataArrayTexture?Qe=Kt.depth:w.isData3DTexture?Qe=Math.floor(Kt.depth*nn):Qe=1,$e=0,ct=0,mt=0}ce!==null?(Ze=ce.x,Tt=ce.y,St=ce.z):(Ze=0,Tt=0,St=0);const jt=Ie.convert(V.format),Sn=Ie.convert(V.type);let ke;V.isData3DTexture?(ve.setTexture3D(V,0),ke=Z.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(ve.setTexture2DArray(V,0),ke=Z.TEXTURE_2D_ARRAY):(ve.setTexture2D(V,0),ke=Z.TEXTURE_2D),E.activeTexture(Z.TEXTURE0),E.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,V.flipY),E.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),E.pixelStorei(Z.UNPACK_ALIGNMENT,V.unpackAlignment);const fn=E.getParameter(Z.UNPACK_ROW_LENGTH),Lt=E.getParameter(Z.UNPACK_IMAGE_HEIGHT),Vn=E.getParameter(Z.UNPACK_SKIP_PIXELS),ii=E.getParameter(Z.UNPACK_SKIP_ROWS),Yi=E.getParameter(Z.UNPACK_SKIP_IMAGES);E.pixelStorei(Z.UNPACK_ROW_LENGTH,Kt.width),E.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Kt.height),E.pixelStorei(Z.UNPACK_SKIP_PIXELS,$e),E.pixelStorei(Z.UNPACK_SKIP_ROWS,ct),E.pixelStorei(Z.UNPACK_SKIP_IMAGES,mt);const bt=w.isDataArrayTexture||w.isData3DTexture,Gt=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){const nn=le.get(w),ai=le.get(V),Ct=le.get(nn.__renderTarget),dn=le.get(ai.__renderTarget);E.bindFramebuffer(Z.READ_FRAMEBUFFER,Ct.__webglFramebuffer),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,dn.__webglFramebuffer);for(let xa=0;xa<Qe;xa++)bt&&(Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,le.get(w).__webglTexture,fe,mt+xa),Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,le.get(V).__webglTexture,Ve,St+xa)),Z.blitFramebuffer($e,ct,Ye,ze,Ze,Tt,Ye,ze,Z.DEPTH_BUFFER_BIT,Z.NEAREST);E.bindFramebuffer(Z.READ_FRAMEBUFFER,null),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else if(fe!==0||w.isRenderTargetTexture||le.has(w)){const nn=le.get(w),ai=le.get(V);E.bindFramebuffer(Z.READ_FRAMEBUFFER,Y),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,ne);for(let Ct=0;Ct<Qe;Ct++)bt?Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,nn.__webglTexture,fe,mt+Ct):Z.framebufferTexture2D(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,nn.__webglTexture,fe),Gt?Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,ai.__webglTexture,Ve,St+Ct):Z.framebufferTexture2D(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,ai.__webglTexture,Ve),fe!==0?Z.blitFramebuffer($e,ct,Ye,ze,Ze,Tt,Ye,ze,Z.COLOR_BUFFER_BIT,Z.NEAREST):Gt?Z.copyTexSubImage3D(ke,Ve,Ze,Tt,St+Ct,$e,ct,Ye,ze):Z.copyTexSubImage2D(ke,Ve,Ze,Tt,$e,ct,Ye,ze);E.bindFramebuffer(Z.READ_FRAMEBUFFER,null),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else Gt?w.isDataTexture||w.isData3DTexture?Z.texSubImage3D(ke,Ve,Ze,Tt,St,Ye,ze,Qe,jt,Sn,Kt.data):V.isCompressedArrayTexture?Z.compressedTexSubImage3D(ke,Ve,Ze,Tt,St,Ye,ze,Qe,jt,Kt.data):Z.texSubImage3D(ke,Ve,Ze,Tt,St,Ye,ze,Qe,jt,Sn,Kt):w.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,Ve,Ze,Tt,Ye,ze,jt,Sn,Kt.data):w.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,Ve,Ze,Tt,Kt.width,Kt.height,jt,Kt.data):Z.texSubImage2D(Z.TEXTURE_2D,Ve,Ze,Tt,Ye,ze,jt,Sn,Kt);E.pixelStorei(Z.UNPACK_ROW_LENGTH,fn),E.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Lt),E.pixelStorei(Z.UNPACK_SKIP_PIXELS,Vn),E.pixelStorei(Z.UNPACK_SKIP_ROWS,ii),E.pixelStorei(Z.UNPACK_SKIP_IMAGES,Yi),Ve===0&&V.generateMipmaps&&Z.generateMipmap(ke),E.unbindTexture()},this.initRenderTarget=function(w){le.get(w).__webglFramebuffer===void 0&&ve.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?ve.setTextureCube(w,0):w.isData3DTexture?ve.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?ve.setTexture2DArray(w,0):ve.setTexture2D(w,0),E.unbindTexture()},this.resetState=function(){Q=0,J=0,me=null,E.reset(),We.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return da}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Ot._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ot._getUnpackColorSpace()}}function RC({mousePos:o={x:.5,y:.5}}){const t=Pe.useRef(null),i=Pe.useRef(o);return Pe.useEffect(()=>{i.current=o},[o]),Pe.useEffect(()=>{const s=t.current;if(!s)return;const l=new $E,u=new Ri(45,s.clientWidth/s.clientHeight,.1,1e3);u.position.z=8.5;const d=new CC({antialias:!0,alpha:!0,powerPreference:"high-performance"});d.setSize(s.clientWidth,s.clientHeight),d.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),d.toneMapping=xm,d.toneMappingExposure=1.4,s.appendChild(d.domElement);const g=new TT().load("/textures/moon_1024.jpg");g.colorSpace=pi;const m=.92,y=1.72,x=new Zu(y,64,64),v=new _T({map:g,bumpMap:g,bumpScale:.045,roughness:.82,metalness:.05}),M=new ji(x,v);M.position.y=m,l.add(M);const A=new Zu(y*1.055,48,48),N=new Xi({vertexShader:`
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.82, 0.90, 1.0, 1.0) * intensity * 1.5;
        }
      `,blending:Vu,side:Zn,transparent:!0}),S=new ji(A,N);S.position.y=m,l.add(S);const b=document.createElement("canvas");b.width=256,b.height=256;const L=b.getContext("2d"),k=L.createRadialGradient(128,128,30,128,128,128);k.addColorStop(0,"rgba(215, 230, 255, 0.65)"),k.addColorStop(.35,"rgba(165, 195, 255, 0.22)"),k.addColorStop(.7,"rgba(130, 150, 245, 0.05)"),k.addColorStop(1,"rgba(0, 0, 0, 0)"),L.fillStyle=k,L.fillRect(0,0,256,256);const R=new dT(b),U=new cS({map:R,blending:Vu,transparent:!0,opacity:.85}),P=new oT(U);P.scale.set(6.8,6.8,1),P.position.y=m,l.add(P);const F=1200,T=new gi,I=new Float32Array(F*3),j=new Float32Array(F*3);for(let _e=0;_e<F*3;_e+=3){I[_e]=(Math.random()-.5)*45,I[_e+1]=(Math.random()-.5)*35,I[_e+2]=-5+(Math.random()-.5)*30;const we=.75+Math.random()*.25;j[_e]=we,j[_e+1]=we*(.9+Math.random()*.1),j[_e+2]=1}T.setAttribute("position",new Di(I,3)),T.setAttribute("color",new Di(j,3));const W=new hS({size:.07,vertexColors:!0,transparent:!0,opacity:.75}),ae=new fT(T,W);l.add(ae);const q=new CT(4212069,1.5);l.add(q);const Y=new w_(16777215,3.2);Y.position.set(4.5,3,5),l.add(Y);const ne=new w_(8444159,2);ne.position.set(-5,-2.5,-2),l.add(ne);let Q=0,J=4.5,me=3;const ue=()=>{if(!s)return;const _e=s.clientWidth,we=s.clientHeight,B=_e/we;u.aspect=B,B<.8?u.position.z=10.6:B<1.2?u.position.z=9.6:u.position.z=8.5,u.updateProjectionMatrix(),d.setSize(_e,we)};ue(),window.addEventListener("resize",ue);let O;const D=()=>{O=requestAnimationFrame(D),M.rotation.y+=.0016,S.rotation.y+=.0016,ae.rotation.y+=15e-5,ae.rotation.x+=1e-4;const _e=i.current;M.rotation.x+=(Q-M.rotation.x)*.05,M.position.x+=((_e.x-.5)*.35-M.position.x)*.05,M.position.y+=(m-(_e.y-.5)*.35-M.position.y)*.05,S.position.copy(M.position),P.position.copy(M.position),J=4.5+(_e.x-.5)*3.5,me=3-(_e.y-.5)*3.5,Q=(_e.y-.5)*.25,Y.position.x+=(J-Y.position.x)*.05,Y.position.y+=(me-Y.position.y)*.05,d.render(l,u)};return D(),()=>{window.removeEventListener("resize",ue),cancelAnimationFrame(O),d.dispose(),x.dispose(),v.dispose(),A.dispose(),N.dispose(),T.dispose(),W.dispose(),s&&d.domElement&&s.removeChild(d.domElement)}},[]),p.jsx("div",{ref:t,className:"absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"})}const ti=[{id:"studio",name:"Lunar Studio",subdomain:"studio.lunarparadox.com",desc:"Spatial 3D, generative visual engines & cinematic direction.",icon:Ms,badge:"AGENCY & CORE",badgeColor:"text-amber-300 border-amber-500/30 bg-amber-500/10",color:"from-amber-500/20 to-orange-500/10",status:"Operational"},{id:"forge",name:"Lunar Forge",subdomain:"forge.lunarparadox.com",desc:"Free design utilities, color science, WCAG contrast & token lab.",icon:_p,badge:"FREE TOOLS",badgeColor:"text-purple-300 border-purple-500/30 bg-purple-500/10",color:"from-purple-500/20 to-indigo-500/10",status:"Open Access"},{id:"labs",name:"Lunar Labs",subdomain:"labs.lunarparadox.com",desc:"Frontier AI models, neural interfaces & experimental synthesis.",icon:xy,badge:"RESEARCH BETA",badgeColor:"text-emerald-300 border-emerald-500/30 bg-emerald-500/10",color:"from-emerald-500/20 to-teal-500/10",status:"Invite Only"},{id:"vault",name:"Lunar Vault",subdomain:"vault.lunarparadox.com",desc:"Cryptographic design assets, certified tokens & flagship archive.",icon:Ju,badge:"VERIFIED",badgeColor:"text-sky-300 border-sky-500/30 bg-sky-500/10",color:"from-sky-500/20 to-blue-500/10",status:"Protected"},{id:"docs",name:"Developer Docs",subdomain:"docs.lunarparadox.com",desc:"Protocol specifications, SDK integration & headless API specs.",icon:U1,badge:"v2.6 SPEC",badgeColor:"text-slate-300 border-white/20 bg-white/5",color:"from-slate-500/20 to-zinc-500/10",status:"Public"},{id:"status",name:"Mesh Telemetry",subdomain:"status.lunarparadox.com",desc:"Distributed node ping, edge latency & dimension consensus.",icon:hm,badge:"99.98% UP",badgeColor:"text-emerald-400 border-emerald-500/30 bg-emerald-500/10",color:"from-emerald-500/20 to-cyan-500/10",status:"All Nodes Live"}];function J_({onSelectBranch:o,onOpenCommandOS:t}){const[i,s]=Pe.useState(!1),l=Pe.useRef(null);return Pe.useEffect(()=>{const u=d=>{l.current&&!l.current.contains(d.target)&&s(!1)};return i&&document.addEventListener("mousedown",u),()=>document.removeEventListener("mousedown",u)},[i]),Pe.useEffect(()=>{const u=d=>{d.key==="Escape"&&s(!1)};return window.addEventListener("keydown",u),()=>window.removeEventListener("keydown",u)},[]),p.jsxs("div",{className:"relative",ref:l,children:[p.jsxs("button",{onClick:()=>s(!i),className:`group relative p-2 md:px-3 md:py-1.5 rounded-full flex items-center gap-2 transition-all duration-200 border cursor-pointer ${i?"bg-white/15 border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]":"bg-white/[0.04] hover:bg-white/[0.09] border-white/10 hover:border-white/25 text-slate-300 hover:text-white"}`,title:"Lunar Paradox Ecosystem (Branches)","aria-label":"Ecosystem Branches",children:[p.jsx("div",{className:"w-4 h-4 grid grid-cols-3 gap-[2.5px] items-center justify-center",children:[...Array(9)].map((u,d)=>p.jsx("span",{className:`w-[3px] h-[3px] rounded-full transition-all duration-300 ${i?"bg-white scale-110 shadow-[0_0_4px_white]":"bg-slate-300 group-hover:bg-white"}`},d))}),p.jsx("span",{className:"hidden xl:inline text-xs font-heading font-medium tracking-wide",children:"Ecosystem"})]}),i&&p.jsxs("div",{className:"absolute right-0 top-12 w-[340px] sm:w-[420px] max-h-[85vh] overflow-y-auto z-50 p-3 sm:p-4 rounded-3xl bg-[#0b0a12]/95 backdrop-blur-3xl border border-white/[0.14] shadow-[0_25px_65px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] animate-in fade-in zoom-in-95 duration-200",children:[p.jsxs("div",{className:"flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] px-2",children:[p.jsxs("div",{children:[p.jsx("div",{className:"text-[10px] font-mono tracking-widest text-[#86868b] uppercase",children:"The Stem & Branches"}),p.jsxs("h3",{className:"text-sm font-semibold text-white tracking-wide flex items-center gap-2",children:[p.jsx("span",{children:"Ecosystem Subdomains"}),p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"})]})]}),p.jsxs("button",{onClick:()=>{s(!1),t&&t()},className:"flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[10px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer",children:[p.jsx(Dy,{className:"w-3 h-3"}),p.jsx("span",{children:"⌘K"})]})]}),p.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:ti.map(u=>{const d=u.icon;return p.jsxs("div",{"data-branch-id":u.id,onClick:()=>{s(!1),o(u)},className:"group relative p-3 rounded-2xl bg-white/[0.025] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.2] transition-all duration-200 cursor-pointer flex flex-col justify-between",children:[p.jsxs("div",{children:[p.jsxs("div",{className:"flex items-center justify-between mb-2",children:[p.jsx("div",{className:"w-7 h-7 rounded-xl bg-white/[0.06] flex items-center justify-center text-slate-200 group-hover:text-white group-hover:bg-white/[0.12] transition-all",children:p.jsx(d,{className:"w-4 h-4"})}),p.jsx("span",{className:`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${u.badgeColor}`,children:u.badge})]}),p.jsxs("div",{className:"font-heading font-semibold text-xs text-white group-hover:text-cyan-200 transition-colors flex items-center gap-1",children:[p.jsx("span",{children:u.name}),p.jsx(D1,{className:"w-2.5 h-2.5 text-slate-500 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"})]}),p.jsx("div",{className:"text-[10px] font-mono text-[#86868b] group-hover:text-slate-400 truncate mb-1",children:u.subdomain}),p.jsx("p",{className:"text-[11px] text-slate-400 line-clamp-2 leading-tight",children:u.desc})]}),p.jsxs("div",{className:"mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-slate-500 group-hover:text-slate-300",children:[p.jsx("span",{children:u.status}),p.jsx(sy,{className:"w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform"})]})]},u.id)})}),p.jsxs("div",{className:"mt-3 pt-2.5 border-t border-white/[0.08] px-2 flex items-center justify-between text-[10px] text-[#86868b] font-mono",children:[p.jsx("span",{children:"Stem Platform: lunarparadox.com"}),p.jsxs("span",{className:"text-emerald-400 flex items-center gap-1",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-400"}),"Mesh Synchronized"]})]})]})]})}function NC({onSelectBranch:o,onEnterParadox:t,onOpenGateway:i}){const[s,l]=Pe.useState(""),[u,d]=Pe.useState(!1),[h,g]=Pe.useState(0),m=Pe.useRef(null),y=Pe.useRef(null);Pe.useEffect(()=>{const S=b=>{var L;b.key==="/"&&document.activeElement!==m.current&&(b.preventDefault(),(L=m.current)==null||L.focus())};return window.addEventListener("keydown",S),()=>window.removeEventListener("keydown",S)},[]);const v=(()=>{if(!s.trim())return[{id:"b-studio",type:"branch",title:"Lunar Studio",subdomain:"studio.lunarparadox.com",subtitle:"Launch real-time 3D spatial scenes & generative engine",icon:Ms,branchId:"studio",tag:"Subdomain"},{id:"b-forge",type:"branch",title:"Lunar Forge",subdomain:"forge.lunarparadox.com",subtitle:"Free color theory, WCAG contrast & token laboratory",icon:_p,branchId:"forge",tag:"Free Branch"},{id:"b-labs",type:"branch",title:"Lunar Labs",subdomain:"labs.lunarparadox.com",subtitle:"Frontier neural models & experimental intelligence",icon:xy,branchId:"labs",tag:"R&D"},{id:"b-vault",type:"branch",title:"Lunar Vault",subdomain:"vault.lunarparadox.com",subtitle:"Cryptographic asset registry & genesis collection",icon:Ju,branchId:"vault",tag:"Registry"}];const S=s.toLowerCase(),b=[];return ti.forEach(L=>{(L.name.toLowerCase().includes(S)||L.subdomain.toLowerCase().includes(S)||L.desc.toLowerCase().includes(S))&&b.push({id:`branch-${L.id}`,type:"branch",title:L.name,subdomain:L.subdomain,subtitle:L.desc,icon:L.icon,branchId:L.id,tag:"Subdomain"})}),"contrast color palette forge token".includes(S)&&b.push({id:"action-contrast",type:"action",title:"Launch Color & Contrast Matrix",subdomain:"forge.lunarparadox.com/contrast",subtitle:"Test APCA & WCAG AAA contrast ratio on dark OLED displays",icon:_p,branchId:"forge",tag:"Tool"}),"quote budget pricing agency studio 3d".includes(S)&&b.push({id:"action-quote",type:"action",title:"Compute Studio Production Scope",subdomain:"studio.lunarparadox.com/quote",subtitle:"Interactive real-time production & engineering cost estimator",icon:Ms,branchId:"studio",tag:"Estimator"}),"status latency uptime nodes health ping".includes(S)&&b.push({id:"action-status",type:"action",title:"Network Telemetry: 42 Nodes Synchronized",subdomain:"status.lunarparadox.com",subtitle:"Dimension 00 consensus 98.4% // Edge latency 12ms",icon:hm,branchId:"status",tag:"Telemetry"}),"login pass invite access key gateway".includes(S)&&b.push({id:"action-gateway",type:"gateway",title:"Authentication & Invitation Gateway",subdomain:"auth.lunarparadox.com",subtitle:"Enter invitation key or wire direct client request",icon:By,action:()=>i("invite"),tag:"Auth"}),b.length===0&&b.push({id:"query-matrix",type:"matrix",title:`Query Neural Matrix for "${s}"`,subdomain:"labs.lunarparadox.com/neural",subtitle:"Execute zero-shot synthesis across Lunar Paradox knowledge graph",icon:R1,branchId:"labs",tag:"AI Synthesis"}),b})(),M=S=>{var b;if(S.key==="ArrowDown")S.preventDefault(),g(L=>(L+1)%v.length);else if(S.key==="ArrowUp")S.preventDefault(),g(L=>(L-1+v.length)%v.length);else if(S.key==="Enter"){S.preventDefault();const L=v[h];L?A(L):N()}else S.key==="Escape"&&((b=m.current)==null||b.blur(),d(!1))},A=S=>{if(d(!1),S.action)S.action();else if(S.branchId){const b=ti.find(L=>L.id===S.branchId)||ti[0];o(b)}},N=()=>{const S=ti[Math.floor(Math.random()*4)];o(S)};return p.jsxs("div",{className:"w-full max-w-2xl mx-auto flex flex-col items-center relative z-40",ref:y,children:[p.jsxs("div",{className:`relative w-full rounded-2xl md:rounded-full transition-all duration-300 ${u?"bg-[#101016]/95 border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.2),0_10px_35px_rgba(0,0,0,0.8)]":"bg-[#121218]/70 hover:bg-[#14141e]/85 border-white/[0.12] hover:border-white/[0.22] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"} border backdrop-blur-3xl`,children:[p.jsxs("div",{className:"flex items-center px-4 md:px-5 py-3 md:py-3.5 gap-3",children:[p.jsx("div",{className:"text-slate-400 shrink-0",children:u?p.jsx(Ms,{className:"w-4 h-4 text-sky-400 animate-pulse"}):p.jsx(Zv,{className:"w-4 h-4 text-slate-400"})}),p.jsx("input",{ref:m,type:"text",value:s,onChange:S=>{l(S.target.value),g(0)},onFocus:()=>d(!0),onBlur:()=>{setTimeout(()=>d(!1),220)},onKeyDown:M,placeholder:"Search ecosystem, launch branches, or type a command... (Press /)",className:"w-full bg-transparent text-sm md:text-base text-white placeholder-slate-500 font-body outline-none tracking-wide"}),s&&p.jsx("button",{onClick:()=>{var S;l(""),(S=m.current)==null||S.focus()},className:"p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors",children:p.jsx(yo,{className:"w-3.5 h-3.5"})}),p.jsxs("div",{className:"hidden sm:flex items-center gap-1.5 shrink-0",children:[p.jsx("kbd",{className:"px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/10 rounded-md",children:"/"}),p.jsx("kbd",{className:"px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/10 rounded-md",children:"⌘K"})]})]}),u&&p.jsxs("div",{className:"absolute left-0 right-0 top-full mt-2 p-2 rounded-2xl bg-[#0c0c14]/95 backdrop-blur-3xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-80 overflow-y-auto z-50 animate-in fade-in zoom-in-98 duration-150",children:[p.jsxs("div",{className:"px-3 py-1.5 text-[10px] font-mono text-[#86868b] uppercase tracking-wider flex items-center justify-between",children:[p.jsx("span",{children:s?"Matching Ecosystem Nodes":"Ecosystem Branches & Quick Launch"}),p.jsx("span",{children:"Navigate with ↑↓ • ↵ to Select"})]}),p.jsx("div",{className:"flex flex-col gap-1 mt-1",children:v.map((S,b)=>{const L=S.icon,k=b===h;return p.jsxs("div",{onMouseDown:()=>A(S),onMouseEnter:()=>g(b),className:`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${k?"bg-white/[0.1] border border-white/[0.15] text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]":"text-slate-300 hover:bg-white/[0.05] border border-transparent"}`,children:[p.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[p.jsx("div",{className:`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${k?"bg-sky-500/20 text-sky-300":"bg-white/[0.06] text-slate-400"}`,children:p.jsx(L,{className:"w-3.5 h-3.5"})}),p.jsxs("div",{className:"truncate",children:[p.jsxs("div",{className:"text-xs font-heading font-semibold text-white flex items-center gap-2",children:[p.jsx("span",{children:S.title}),p.jsxs("span",{className:"text-[10px] font-mono text-slate-400 font-normal",children:["(",S.subdomain,")"]})]}),p.jsx("div",{className:"text-[11px] text-slate-400 truncate",children:S.subtitle})]})]}),p.jsxs("div",{className:"flex items-center gap-2 shrink-0 ml-3",children:[p.jsx("span",{className:"text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]",children:S.tag}),k&&p.jsx(N1,{className:"w-3 h-3 text-sky-400 animate-pulse"})]})]},S.id)})})]})]}),p.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3 mt-4",children:[p.jsxs("button",{onClick:()=>{const S=v[0];S&&A(S)},className:"px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-xs font-heading font-medium text-slate-200 hover:text-white transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)] flex items-center gap-2",children:[p.jsx(Zv,{className:"w-3.5 h-3.5 text-slate-400"}),p.jsx("span",{children:"Nexus Search"})]}),p.jsxs("button",{onClick:N,className:"px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500/15 to-purple-500/15 hover:from-sky-500/25 hover:to-purple-500/25 border border-sky-400/20 hover:border-sky-400/40 text-xs font-heading font-medium text-sky-200 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.1)] flex items-center gap-2",children:[p.jsx(Ms,{className:"w-3.5 h-3.5 text-sky-300 animate-spin",style:{animationDuration:"6s"}}),p.jsx("span",{children:"I'm Feeling Paradoxical ✦"})]})]}),p.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-2 mt-4 pt-1",children:[p.jsx("span",{className:"text-[10px] font-mono text-[#86868b] tracking-wider uppercase mr-1",children:"Direct Branches:"}),ti.slice(0,4).map(S=>p.jsxs("button",{onClick:()=>o(S),className:"px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/[0.2] text-[11px] font-body text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white"}),p.jsx("span",{children:S.name.replace("Lunar ","")}),p.jsx("span",{className:"text-[9px] text-[#86868b] font-mono",children:"↗"})]},S.id))]})]})}function DC({branch:o,isOpen:t,onClose:i,onLaunchSandbox:s}){if(!t||!o)return null;const l=o.icon||Ms;return p.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200",children:[p.jsx("div",{className:"absolute inset-0",onClick:i}),p.jsxs("div",{className:"relative w-full max-w-lg rounded-3xl bg-[#0d0d14]/95 border border-white/[0.16] shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200",children:[p.jsx("div",{className:"absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-25 blur-3xl bg-gradient-to-br from-sky-400 to-purple-600"}),p.jsx("button",{onClick:i,className:"absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-400 hover:text-white transition-all cursor-pointer border border-white/10",children:p.jsx(yo,{className:"w-4 h-4"})}),p.jsxs("div",{className:"flex items-center gap-3.5 mb-5",children:[p.jsx("div",{className:"w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]",children:p.jsx(l,{className:"w-6 h-6"})}),p.jsxs("div",{children:[p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsx("span",{className:"text-[10px] font-mono tracking-widest text-[#86868b] uppercase",children:"ECOSYSTEM BRANCH"}),p.jsx("span",{className:`text-[9px] font-mono px-2 py-0.5 rounded-full border ${o.badgeColor||"text-purple-300 border-purple-500/30 bg-purple-500/10"}`,children:o.badge||"ACTIVE"})]}),p.jsx("h2",{className:"text-xl sm:text-2xl font-bold font-display text-white tracking-wide",children:o.name})]})]}),p.jsxs("div",{className:"flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/[0.08] mb-5 font-mono text-xs text-sky-200",children:[p.jsxs("div",{className:"flex items-center gap-2 truncate",children:[p.jsx(_y,{className:"w-4 h-4 text-sky-400 shrink-0"}),p.jsx("span",{className:"text-slate-400",children:"Target URL:"}),p.jsxs("span",{className:"text-white font-medium truncate",children:["https://",o.subdomain]})]}),p.jsxs("span",{className:"text-[10px] text-emerald-400 font-mono flex items-center gap-1 shrink-0 ml-2",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"}),"LIVE"]})]}),p.jsx("p",{className:"text-sm text-slate-300 leading-relaxed mb-6 font-body",children:o.desc}),p.jsxs("div",{className:"grid grid-cols-2 gap-2.5 mb-7 text-xs font-mono",children:[p.jsxs("div",{className:"p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]",children:[p.jsx("div",{className:"text-[10px] text-[#86868b] uppercase",children:"Subdomain Routing"}),p.jsxs("div",{className:"text-slate-200 font-semibold mt-0.5 flex items-center gap-1",children:[p.jsx(hy,{className:"w-3 h-3 text-purple-400"}),p.jsx("span",{children:"Dedicated Cluster"})]})]}),p.jsxs("div",{className:"p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]",children:[p.jsx("div",{className:"text-[10px] text-[#86868b] uppercase",children:"Edge Latency"}),p.jsxs("div",{className:"text-emerald-400 font-semibold mt-0.5 flex items-center gap-1",children:[p.jsx(hm,{className:"w-3 h-3 text-emerald-400"}),p.jsx("span",{children:"12ms // Global Mesh"})]})]})]}),p.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-3",children:[p.jsxs("a",{href:`https://${o.subdomain}`,target:"_blank",rel:"noopener noreferrer",onClick:u=>{},className:"w-full sm:flex-1 py-3 px-5 rounded-full bg-white text-black hover:bg-slate-200 font-heading font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.35)]",children:[p.jsx("span",{children:"LAUNCH SUBDOMAIN"}),p.jsx(C1,{className:"w-4 h-4 text-black"})]}),p.jsxs("button",{onClick:()=>{i(),s&&s(o.id)},className:"w-full sm:w-auto py-3 px-5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer",children:[p.jsx(Dy,{className:"w-3.5 h-3.5"}),p.jsx("span",{children:"Sandbox Preview"})]})]})]})]})}function UC({className:o="w-4 h-4"}){return p.jsx("svg",{className:o,viewBox:"0 0 24 24",fill:"currentColor",children:p.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}function LC({className:o="w-4 h-4"}){return p.jsx("svg",{className:o,viewBox:"0 0 24 24",fill:"currentColor",children:p.jsx("path",{d:"M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"})})}function OC({className:o="w-4 h-4"}){return p.jsxs("svg",{className:o,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[p.jsx("rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}),p.jsx("path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}),p.jsx("line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"})]})}function PC(){const[o,t]=Pe.useState({x:.5,y:.5}),[i,s]=Pe.useState(!1),[l,u]=Pe.useState(!1),[d,h]=Pe.useState("invite"),[g,m]=Pe.useState(!1),[y,x]=Pe.useState(!1),[v,M]=Pe.useState("studio"),[A,N]=Pe.useState(null),[S,b]=Pe.useState(!1),[L,k]=Pe.useState(!1),[R,U]=Pe.useState(1428914),[P,F]=Pe.useState(0),[T,I]=Pe.useState(!1);Pe.useEffect(()=>{const q=Y=>{(Y.metaKey||Y.ctrlKey)&&Y.key.toLowerCase()==="k"&&(Y.preventDefault(),x(ne=>!ne))};return window.addEventListener("keydown",q),()=>window.removeEventListener("keydown",q)},[]),Pe.useEffect(()=>{const q=setInterval(()=>{U(Y=>Y+Math.floor(Math.random()*5)-2)},3800);return()=>clearInterval(q)},[]),R.toLocaleString(),Pe.useEffect(()=>{const q=()=>{k(window.innerWidth<768)};q(),window.addEventListener("resize",q);const Y=ne=>{t({x:ne.clientX/window.innerWidth,y:ne.clientY/window.innerHeight})};return window.addEventListener("mousemove",Y),()=>{window.removeEventListener("resize",q),window.removeEventListener("mousemove",Y)}},[]);const j=()=>{const q=cn.toggleMute();s(q)},W=q=>{cn.playChime(),h(q),u(!0),b(!1)},ae=(q="studio")=>{cn.playSectorShift(0),M(q),x(!0),b(!1)};return(o.x-.5)*22,(o.y-.5)*22,p.jsxs("div",{className:"relative min-h-screen w-full bg-[#030108] text-slate-100 overflow-x-hidden md:overflow-hidden font-body flex flex-col justify-between select-none",children:[p.jsxs("div",{className:"fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030108]",children:[p.jsx(RC,{mousePos:o}),p.jsx("div",{className:"absolute inset-0 pointer-events-none",style:{background:"radial-gradient(circle at 50% 50%, transparent 0%, transparent 60%, rgba(3,1,8,0.65) 85%, #030108 100%)"}})]}),p.jsxs("header",{className:"relative z-30 w-full px-6 md:px-12 pt-6 md:pt-7 pb-2 flex items-center justify-between gap-4",children:[p.jsxs("div",{className:"cursor-pointer group flex items-center gap-3 shrink-0",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[p.jsxs("div",{children:[p.jsx("h1",{className:"text-xl sm:text-2xl md:text-3xl font-black tracking-[0.16em] font-display text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]",children:"LUNAR PARADOX"}),p.jsx("p",{className:"text-[11px] md:text-sm text-slate-300 font-body font-normal tracking-wide mt-0.5",children:"Step into the other side of light"})]}),p.jsxs("div",{className:"hidden 2xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[10px] font-mono-accent text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"}),p.jsx("span",{children:"NODE // ACTIVE"}),p.jsx("span",{className:"text-purple-400/40",children:"|"}),p.jsx("span",{children:"CYCLE: 89.4%"})]})]}),p.jsxs("nav",{className:"hidden lg:flex items-center gap-4 xl:gap-6 text-xs md:text-sm tracking-widest font-heading font-semibold text-slate-300",children:[p.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 text-white",children:"HOME"}),p.jsxs("button",{onClick:()=>N(ti.find(q=>q.id==="studio")),className:"hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1",children:[p.jsx("span",{children:"STUDIO"}),p.jsx("span",{className:"text-[10px] text-slate-500 font-mono",children:"↗"})]}),p.jsxs("button",{onClick:()=>N(ti.find(q=>q.id==="forge")),className:"hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1.5",children:[p.jsx("span",{children:"FORGE"}),p.jsx("span",{className:"text-[9px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono-accent border border-purple-500/30",children:"FREE"}),p.jsx("span",{className:"text-[10px] text-slate-500 font-mono",children:"↗"})]}),p.jsxs("button",{onClick:()=>N(ti.find(q=>q.id==="labs")),className:"hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1",children:[p.jsx("span",{children:"LABS"}),p.jsx("span",{className:"text-[10px] text-slate-500 font-mono",children:"↗"})]}),p.jsxs("button",{onClick:()=>N(ti.find(q=>q.id==="vault")),className:"hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1",children:[p.jsx("span",{children:"VAULT"}),p.jsx("span",{className:"text-[10px] text-slate-500 font-mono",children:"↗"})]}),p.jsx(J_,{onSelectBranch:q=>N(q),onOpenCommandOS:()=>x(!0)}),p.jsxs("button",{onClick:j,className:`btn-2026-hud px-3 py-1.5 rounded-full cursor-pointer flex items-center gap-2 text-xs font-mono transition-all ${i?"border-white/30 text-white bg-white/[0.1]":"text-[#86868b]"}`,title:"Toggle Ambient Audio",children:[i?p.jsxs("div",{className:"flex items-end gap-[2px] h-3.5 px-0.5",children:[p.jsx("span",{className:"w-[2px] bg-white rounded-full bar-1"}),p.jsx("span",{className:"w-[2px] bg-white rounded-full bar-2"}),p.jsx("span",{className:"w-[2px] bg-white rounded-full bar-3"}),p.jsx("span",{className:"w-[2px] bg-white rounded-full bar-4"})]}):p.jsx(yp,{className:"w-3.5 h-3.5 text-[#86868b]"}),p.jsx("span",{className:"text-[10px] tracking-wider",children:i?"AUDIO ON":"AUDIO OFF"})]}),p.jsxs("button",{onClick:()=>W("invite"),className:"btn-2026-hud px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium cursor-pointer text-[#f5f5f7] hover:text-white",children:[p.jsx(O1,{className:"w-3.5 h-3.5 text-[#86868b]"}),p.jsx("span",{children:"LOGIN"})]})]}),p.jsxs("div",{className:"flex lg:hidden items-center gap-2.5 shrink-0",children:[p.jsx(J_,{onSelectBranch:q=>N(q),onOpenCommandOS:()=>x(!0)}),p.jsx("button",{onClick:j,className:`btn-2026-hud p-2.5 rounded-full text-xs cursor-pointer ${i?"border-purple-400/60 text-purple-200":""}`,children:i?p.jsx(Oy,{className:"w-4 h-4 text-purple-300"}):p.jsx(yp,{className:"w-4 h-4"})}),p.jsx("button",{onClick:()=>b(!S),className:"btn-2026-hud p-2.5 rounded-full text-white cursor-pointer",children:S?p.jsx(yo,{className:"w-4 h-4"}):p.jsx(P1,{className:"w-4 h-4"})})]})]}),S&&p.jsxs("div",{className:"lg:hidden fixed inset-x-0 top-20 z-40 p-4 bg-black/95 backdrop-blur-2xl border-b border-purple-500/30 flex flex-col gap-2 text-xs font-mono-accent",children:[p.jsx("button",{onClick:()=>{b(!1)},className:"text-left py-2 text-slate-300 hover:text-white",children:"HOME (STEM PLATFORM)"}),p.jsxs("button",{onClick:()=>{b(!1),N(ti.find(q=>q.id==="studio"))},className:"text-left py-2 text-slate-200 hover:text-white flex items-center justify-between",children:[p.jsx("span",{children:"01 STUDIO (studio.lunarparadox.com)"}),p.jsx("span",{className:"text-[10px] text-amber-300 font-bold",children:"AGENCY ↗"})]}),p.jsxs("button",{onClick:()=>{b(!1),N(ti.find(q=>q.id==="forge"))},className:"text-left py-2 text-slate-200 hover:text-white flex items-center justify-between",children:[p.jsx("span",{children:"02 FORGE (forge.lunarparadox.com)"}),p.jsx("span",{className:"text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30",children:"FREE TOOLS ↗"})]}),p.jsxs("button",{onClick:()=>{b(!1),N(ti.find(q=>q.id==="labs"))},className:"text-left py-2 text-slate-200 hover:text-white flex items-center justify-between",children:[p.jsx("span",{children:"03 LABS (labs.lunarparadox.com)"}),p.jsx("span",{className:"text-[10px] text-emerald-400",children:"R&D BETA ↗"})]}),p.jsxs("button",{onClick:()=>{b(!1),N(ti.find(q=>q.id==="vault"))},className:"text-left py-2 text-slate-200 hover:text-white flex items-center justify-between",children:[p.jsx("span",{children:"04 VAULT (vault.lunarparadox.com)"}),p.jsx("span",{className:"text-[10px] text-sky-400",children:"REGISTRY ↗"})]}),p.jsxs("div",{className:"pt-2 border-t border-white/10 flex items-center justify-between",children:[p.jsx("button",{onClick:()=>W("invite"),className:"text-left py-1 text-slate-400 hover:text-white",children:"ACCESS PASSCODE"}),p.jsx("button",{onClick:()=>W("client"),className:"text-left py-1 text-purple-300 font-semibold",children:"DIRECT WIRE"})]})]}),p.jsxs("main",{className:"relative z-20 flex-1 flex flex-col justify-end items-center px-4 md:px-12 max-w-7xl mx-auto w-full pb-6 md:pb-10",children:[p.jsx("div",{className:"flex-1 w-full min-h-[300px] md:min-h-[380px] pointer-events-none"}),p.jsxs("div",{className:"flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono text-[#86868b] tracking-wider uppercase mb-5 text-center px-4 py-1.5 rounded-full bg-[#121216]/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]",children:[p.jsxs("span",{className:"flex items-center gap-1.5",children:[p.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse"}),p.jsx("span",{className:"text-white font-medium",children:R.toLocaleString()})," ENTITIES IN VOID"]}),p.jsx("span",{className:"text-white/20",children:"•"}),p.jsx("span",{className:"hidden sm:inline text-[#86868b]",children:"DIMENSION 00 // ACTIVE"}),p.jsx("span",{className:"hidden sm:inline text-white/20",children:"•"}),p.jsxs("span",{className:"text-[#86868b]",children:[p.jsx("span",{className:"text-white font-medium",children:"98.4%"})," CONSENSUS"]})]}),p.jsx(NC,{onSelectBranch:q=>N(q),onEnterParadox:()=>ae("studio"),onOpenGateway:q=>W(q)}),p.jsxs("div",{className:"flex items-center gap-2 mt-4 text-[9px] md:text-[10px] font-mono text-[#86868b] tracking-widest text-center",children:[p.jsx("span",{className:"w-1 h-1 rounded-full bg-white/40"}),p.jsx("span",{children:"STEM PLATFORM // DIRECT SUBDOMAIN MESH v2.6 // PRESS ⌘K ANYWHERE"})]})]}),p.jsxs("footer",{className:"relative z-30 w-full px-6 md:px-14 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400",children:[p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{children:"© 2026 Lunar Paradox"}),p.jsx("span",{className:"text-white/20",children:"•"}),p.jsx("span",{className:"text-[10px] font-mono text-slate-500",children:"Node: US-EAST-01 (Active)"})]}),p.jsxs("div",{className:"flex items-center gap-5 text-slate-400",children:[p.jsx("a",{href:"#discord",onClick:q=>{q.preventDefault(),W("invite")},className:"hover:text-white transition-colors p-1",title:"Discord Community",children:p.jsx(LC,{className:"w-4 h-4"})}),p.jsx("a",{href:"#twitter",onClick:q=>{q.preventDefault(),W("invite")},className:"hover:text-white transition-colors p-1",title:"Twitter / X",children:p.jsx(UC,{className:"w-4 h-4"})}),p.jsx("a",{href:"#instagram",onClick:q=>{q.preventDefault(),W("invite")},className:"hover:text-white transition-colors p-1",title:"Instagram",children:p.jsx(OC,{className:"w-4 h-4"})})]})]}),p.jsx(DC,{branch:A,isOpen:!!A,onClose:()=>N(null),onLaunchSandbox:q=>ae(q)}),p.jsx(Y1,{isOpen:y,onClose:()=>x(!1),initialSector:v}),p.jsx(H1,{isOpen:l,onClose:()=>u(!1),initialTab:d}),p.jsx(G1,{isOpen:g,onClose:()=>m(!1),onOpenGateway:q=>W(q)})]})}x1.createRoot(document.getElementById("root")).render(p.jsx(c1.StrictMode,{children:p.jsx(PC,{})}));
