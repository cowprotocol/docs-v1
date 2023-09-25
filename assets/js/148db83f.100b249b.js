"use strict";(self.webpackChunkcow_docs=self.webpackChunkcow_docs||[]).push([[5883],{3905:(e,t,o)=>{o.d(t,{Zo:()=>p,kt:()=>f});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var c=r.createContext({}),l=function(e){var t=r.useContext(c),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},w=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(o),w=n,f=d["".concat(c,".").concat(w)]||d[w]||u[w]||a;return o?r.createElement(f,i(i({ref:t},p),{},{components:o})):r.createElement(f,i({ref:t},p))}));function f(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,i=new Array(a);i[0]=w;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:n,i[1]=s;for(var l=2;l<a;l++)i[l]=o[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}w.displayName="MDXCreateElement"},3417:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=o(7462),n=(o(7294),o(3905));const a={description:"This section provides some quick start information for integrating with CoW Protocol."},i="CoW SDK",s={unversionedId:"cow-sdk/README",id:"cow-sdk/README",title:"CoW SDK",description:"This section provides some quick start information for integrating with CoW Protocol.",source:"@site/docs/cow-sdk/README.md",sourceDirName:"cow-sdk",slug:"/cow-sdk/",permalink:"/docs/docs/cow-sdk/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/cow-sdk/README.md",tags:[],version:"current",frontMatter:{description:"This section provides some quick start information for integrating with CoW Protocol."},sidebar:"tutorialSidebar",previous:{title:"CoW Protocol Overview",permalink:"/docs/docs/"},next:{title:"CoW API",permalink:"/docs/docs/cow-sdk/cow-api"}},c={},l=[{value:'First, lets introduce CoW Swap and CoW Protocol <a href="#get-started" id="get-started"></a>',id:"first-lets-introduce-cow-swap-and-cow-protocol-",level:3},{value:'Get familiar with CoW Swap <a href="#get-familiar-with-cowswap" id="get-familiar-with-cowswap"></a>',id:"get-familiar-with-cow-swap-",level:4}],p={toc:l},d="wrapper";function u(e){let{components:t,...o}=e;return(0,n.kt)(d,(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"cow-sdk"},"CoW SDK"),(0,n.kt)("p",null,"Unlock an endless world of possibilities via ",(0,n.kt)("strong",{parentName:"p"},"CoW Protocol SDK")," (",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@cowprotocol/cow-sdk"},"@cowprotocol/cow-sdk")," in NPM)"),(0,n.kt)("h3",{id:"first-lets-introduce-cow-swap-and-cow-protocol-"},"First, lets introduce CoW Swap and CoW Protocol ",(0,n.kt)("a",{href:"#get-started",id:"get-started"})),(0,n.kt)("p",null,"CoW Swap is a Decentralized Application (DApp) and Protocol allowing users to ",(0,n.kt)("strong",{parentName:"p"},"exchange digital assets directly (peer-to-peer) and via existing trading decentralized exchanges"),"."),(0,n.kt)("p",null,"Its novel design maximizes trade efficiency and provides a competitive way to ensure best prices."),(0,n.kt)("p",null,"One of the core ideas is executing ",(0,n.kt)("strong",{parentName:"p"},"trades in batches"),", where users will trade directly using what is known as ",(0,n.kt)("strong",{parentName:"p"},"\u201cCoincidence of Wants\u201d")," (hence the name CoW). In the context of blockchains, batch auctions are a superior mechanism compared to continuous time trading, as they already execute transactions in discrete \u201cblocks\u201d every few seconds."),(0,n.kt)("p",null,"In consequence CoW Swap ",(0,n.kt)("strong",{parentName:"p"},"protects users from front-running and other value extraction (known as MEV)"),". The mechanism also leverages the concept of \u201cring trades\u201d to boost liquidity in highly fragmented and long-tail token markets."),(0,n.kt)("p",null,"Additionally, CoW Swap allows for an improved user experience by facilitating gasless trades, not paying for failed transactions and adaptive routing in case of volatility."),(0,n.kt)("h4",{id:"get-familiar-with-cow-swap-"},"Get familiar with CoW Swap ",(0,n.kt)("a",{href:"#get-familiar-with-cowswap",id:"get-familiar-with-cowswap"})),(0,n.kt)("p",null,"CoW Swap uses CoW protocol. One easy way to get familiar with the protocol is by doing one trade in CoW Swap:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://swap.cow.fi/#/1/swap/WETH?utm_source=docs.cow.fi&utm_medium=web&utm_content=cow-sdk-page/"},"https://swap.cow.fi"))),(0,n.kt)("p",null,"You can use it in ",(0,n.kt)("strong",{parentName:"p"},"Goerli")," test net if you want. Otherwise, it is avaiable in ",(0,n.kt)("strong",{parentName:"p"},"Mainnet")," and ",(0,n.kt)("strong",{parentName:"p"},"Gnosis Chain"),"."),(0,n.kt)("p",null,"Now you are more familiar with the protocol and CoW Swap, let's introduce the SDK in the next section."))}u.isMDXComponent=!0}}]);