"use strict";(self.webpackChunkcow_docs=self.webpackChunkcow_docs||[]).push([[148],{3905:(e,t,o)=>{o.d(t,{Zo:()=>p,kt:()=>h});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(o),f=n,h=u["".concat(l,".").concat(f)]||u[f]||d[f]||a;return o?r.createElement(h,i(i({ref:t},p),{},{components:o})):r.createElement(h,i({ref:t},p))}));function h(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,i=new Array(a);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:n,i[1]=s;for(var c=2;c<a;c++)i[c]=o[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}f.displayName="MDXCreateElement"},3441:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=o(7462),n=(o(7294),o(3905));const a={description:"Built on top of the existing on-chain settlement layer"},i="CoW Hooks",s={unversionedId:"overview/cow-hooks/README",id:"overview/cow-hooks/README",title:"CoW Hooks",description:"Built on top of the existing on-chain settlement layer",source:"@site/docs/overview/cow-hooks/README.md",sourceDirName:"overview/cow-hooks",slug:"/overview/cow-hooks/",permalink:"/docs/docs/overview/cow-hooks/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/overview/cow-hooks/README.md",tags:[],version:"current",frontMatter:{description:"Built on top of the existing on-chain settlement layer"},sidebar:"tutorialSidebar",previous:{title:"Coincidence of Wants",permalink:"/docs/docs/overview/coincidence-of-wants"},next:{title:"CoW Hooks Example",permalink:"/docs/docs/overview/cow-hooks/cow-hooks-example/"}},l={},c=[],p={toc:c},u="wrapper";function d(e){let{components:t,...o}=e;return(0,n.kt)(u,(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"cow-hooks"},"CoW Hooks"),(0,n.kt)("figure",null,(0,n.kt)("img",{src:"../../img/Cow-hooks.gif",alt:""}),(0,n.kt)("figcaption",null)),(0,n.kt)("p",null,"Following CoW Protocol roadmaps, we are excited to release a brand new and shiny feature: ",(0,n.kt)("em",{parentName:"p"},"CoW Hooks"),". \\\n\\\nIf you\u2019re excited by Uni v4\u2019s announcement and can\u2019t wait to experience the power of trade hooks, wait no longer. CoW Hooks are live ",(0,n.kt)("strong",{parentName:"p"},"now"),"!"," "),(0,n.kt)("p",null,'These hooks allow users to specify Ethereum calls (also known as an "inner transaction") alongside their orders that execute atomically before and after a CoW Protocol swap. These hooks come in two flavors:'),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},'"Pre-hooks"'),": These are hooks that execute at the start of the settlement, before the swap. Note that these are executed even before an order's signature is checked or sell tokens are transferred out of the user's account. This allows pre-hooks to be used to \"set up\" an order. For example:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Using a Safe and executing a ",(0,n.kt)("inlineCode",{parentName:"li"},"SignMessageLib")," transaction in order to pay for signing an on-chain order if, and only if, it gets executed"),(0,n.kt)("li",{parentName:"ul"},"Setting the required ERC-20 approvals to the CoW Protocol using EIP-2612 permit, so approvals are only set if the order executes"),(0,n.kt)("li",{parentName:"ul"},"Unstaking tokens just-in-time for trading"),(0,n.kt)("li",{parentName:"ul"},"Claiming an airdrop right before dumping")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},'"Post-hooks"'),": These are hooks that execute at the end of a settlement, after the swap completes. This means that the trade proceeds have already been transferred to the ",(0,n.kt)("inlineCode",{parentName:"p"},"receiver")," address and can be used by the post-hooks. For example:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Bridging trade proceeds to L2s"),(0,n.kt)("li",{parentName:"ul"},"Staking trading proceeds")),(0,n.kt)("p",null,"It is also worth noting that additional fees for executing hooks are also charged in the sell token, just like regular order execution fees. So you don't need to hold any special token or additional ETH to make use of this feature!"))}d.isMDXComponent=!0}}]);