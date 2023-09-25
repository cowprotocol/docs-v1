"use strict";(self.webpackChunkcow_docs=self.webpackChunkcow_docs||[]).push([[6024],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),i=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=i(e.components);return a.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=i(r),f=n,m=d["".concat(c,".").concat(f)]||d[f]||p[f]||o;return r?a.createElement(m,s(s({ref:t},u),{},{components:r})):a.createElement(m,s({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:n,s[1]=l;for(var i=2;i<o;i++)s[i]=r[i];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1764:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var a=r(7462),n=(r(7294),r(3905));const o={},s="Guarantees",l={unversionedId:"smart-contracts/allow-list-authenticator-1/guarantees",id:"smart-contracts/allow-list-authenticator-1/guarantees",title:"Guarantees",description:"1. No user funds can be touched except for settling an order that was authorized by the user",source:"@site/docs/smart-contracts/allow-list-authenticator-1/guarantees.md",sourceDirName:"smart-contracts/allow-list-authenticator-1",slug:"/smart-contracts/allow-list-authenticator-1/guarantees",permalink:"/docs/docs/smart-contracts/allow-list-authenticator-1/guarantees",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/smart-contracts/allow-list-authenticator-1/guarantees.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Allow-list authenticator",permalink:"/docs/docs/smart-contracts/allow-list-authenticator-1/"},next:{title:"ETH Flow Contract",permalink:"/docs/docs/smart-contracts/eth-flow-contract/"}},c={},i=[],u={toc:i},d="wrapper";function p(e){let{components:t,...r}=e;return(0,n.kt)(d,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"guarantees"},"Guarantees"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"No user funds can be touched except for settling an order that was authorized by the user"))),(0,n.kt)("p",null,"Users allow the vault relayer to trade their tokens. However, the settlement contract can only access user funds in the process of settling an order. An order is considered valid only if the user has explicitly authorized that order."," "),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"A user cannot get a settlement price that is worse than the limit price specified in the order"))),(0,n.kt)("p",null,"When an order is traded, users always receive at least the amount of output tokens that they would receive if they had traded at the order limit price."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Once an order is fulfilled, it cannot be traded again"))),(0,n.kt)("p",null,"The smart contract keeps track of the filled amount of each order. If an order was traded, the filled amount is recorded. If a solver tried to settle the same order again, it would only be able to trade the amount that wasn't filled before."))}p.isMDXComponent=!0}}]);