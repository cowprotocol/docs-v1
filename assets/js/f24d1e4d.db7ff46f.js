"use strict";(self.webpackChunkcow_docs=self.webpackChunkcow_docs||[]).push([[1326],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>b});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,b=p["".concat(c,".").concat(f)]||p[f]||u[f]||s;return n?r.createElement(b,a(a({ref:t},d),{},{components:n})):r.createElement(b,a({ref:t},d))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,a=new Array(s);a[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:o,a[1]=i;for(var l=2;l<s;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8633:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=n(7462),o=(n(7294),n(3905));const s={},a="Enable Tokens",i={unversionedId:"cow-sdk/sign-and-post-orders/enable-tokens",id:"cow-sdk/sign-and-post-orders/enable-tokens",title:"Enable Tokens",description:"Because of the use of off-chain signing (meta-transactions), users will need to Enable the sell token before signed orders can be considered as valid ones.",source:"@site/docs/cow-sdk/sign-and-post-orders/enable-tokens.md",sourceDirName:"cow-sdk/sign-and-post-orders",slug:"/cow-sdk/sign-and-post-orders/enable-tokens",permalink:"/docs/docs/cow-sdk/sign-and-post-orders/enable-tokens",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/cow-sdk/sign-and-post-orders/enable-tokens.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"BONUS: Show link to Explorer",permalink:"/docs/docs/cow-sdk/sign-and-post-orders/bonus-show-link-to-explorer"},next:{title:"STEP 1: Get Market Price",permalink:"/docs/docs/cow-sdk/sign-and-post-orders/step-1-get-market-price"}},c={},l=[],d={toc:l},p="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"enable-tokens"},"Enable Tokens"),(0,o.kt)("p",null,"Because of the use of off-chain signing (meta-transactions), users will need to ",(0,o.kt)("strong",{parentName:"p"},"Enable the sell token")," before signed orders can be considered as valid ones."),(0,o.kt)("p",null,"This enabling is technically an ",(0,o.kt)("inlineCode",{parentName:"p"},"ERC-20")," approval, and is something that needs to be done only once. After this all order creation can be done for free using offchain signing."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"For more details see ",(0,o.kt)("a",{parentName:"p",href:"https://docs.cow.fi/tutorials/how-to-submit-orders-via-the-api/1.-set-allowance-for-the-sell-token"},"https://docs.cow.fi/tutorials/how-to-submit-orders-via-the-api/1.-set-allowance-for-the-sell-token"))),(0,o.kt)("p",null,"If you are trying to just get a sense on how to post orders, you can skip this step now and come back later after you manage to create valid orders. Let's continue then with how to instantiate the SDK if we need to sign some orders."))}u.isMDXComponent=!0}}]);