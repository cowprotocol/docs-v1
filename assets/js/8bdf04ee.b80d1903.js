"use strict";(self.webpackChunkcow_docs=self.webpackChunkcow_docs||[]).push([[6458],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=i,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||r;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2605:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=n(7462),i=(n(7294),n(3905));const r={},o="Slippage accounting",s={unversionedId:"solvers/in-depth-solver-specification/slippage-accounting",id:"solvers/in-depth-solver-specification/slippage-accounting",title:"Slippage accounting",description:"Solver Slippage Accounting",source:"@site/docs/solvers/in-depth-solver-specification/slippage-accounting.md",sourceDirName:"solvers/in-depth-solver-specification",slug:"/solvers/in-depth-solver-specification/slippage-accounting",permalink:"/docs/docs/solvers/in-depth-solver-specification/slippage-accounting",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/solvers/in-depth-solver-specification/slippage-accounting.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Sample Test Instances",permalink:"/docs/docs/solvers/in-depth-solver-specification/sample-test-instances"},next:{title:"Social Consensus Rules",permalink:"/docs/docs/solvers/in-depth-solver-specification/social-consensus-rules"}},l={},c=[{value:"Solver Slippage Accounting",id:"solver-slippage-accounting",level:2},{value:"1. Batch-wise Token Imbalance",id:"1-batch-wise-token-imbalance",level:3},{value:"Transfer Type Classification",id:"transfer-type-classification",level:4},{value:"Phantom Transfers (aka Internalized Token Imbalance)",id:"phantom-transfers-aka-internalized-token-imbalance",level:4},{value:"2. Evaluation in ETH (aka Token Prices)",id:"2-evaluation-in-eth-aka-token-prices",level:3}],p={toc:c},d="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"slippage-accounting"},"Slippage accounting"),(0,i.kt)("h2",{id:"solver-slippage-accounting"},"Solver Slippage Accounting"),(0,i.kt)("p",null,"Slippage accounting is performed on a per settlement/transaction basis according to the following two primary components. The SQL source code can be found on ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cowprotocol/solver-rewards/blob/main/queries/dune_v2/period_slippage.sql"},"GitHub")," or ",(0,i.kt)("a",{parentName:"p",href:"https://dune.com/queries/2421375"},"Dune Analytics")),(0,i.kt)("h3",{id:"1-batch-wise-token-imbalance"},"1. Batch-wise Token Imbalance"),(0,i.kt)("p",null,"The token balance sheet represents a classified account of all incoming and outgoing token transfers relative to the settlement contract. Classification categories are ",(0,i.kt)("inlineCode",{parentName:"p"},"USER_{IN/OUT}"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"AMM_{IN/OUT}")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"PHANTOM_TRANSFER")),(0,i.kt)("h4",{id:"transfer-type-classification"},"Transfer Type Classification"),(0,i.kt)("p",null,"In all cases ",(0,i.kt)("inlineCode",{parentName:"p"},"IN")," represents settlement contract as ",(0,i.kt)("inlineCode",{parentName:"p"},"recipient")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"OUT")," as ",(0,i.kt)("inlineCode",{parentName:"p"},"sender"),"!"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"USER_{IN/OUT}")," transfers are those emitted by the Settlement contract's Trade Event (with ",(0,i.kt)("inlineCode",{parentName:"li"},"USER_IN")," adjusted for fees)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"AMM_{IN/OUT}")," classification is assigned to all on-chain transfers that are NOT user transfers"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"PHANTOM_TRANSFER")," represents token transfers associated with ",(0,i.kt)("em",{parentName:"li"},"internalized buffer trades"),'. In brief, these are transfers related to AMM interactions that were "skipped" for the purpose of gas optimization in favour of using the settlement contract\'s internal holdings. The process for including this "off-chain" data is rather involved, so we dedicate an entire section to it below.')),(0,i.kt)("p",null,"Note that ",(0,i.kt)("inlineCode",{parentName:"p"},"AMM_IN/OUT")," also captures ",(0,i.kt)("inlineCode",{parentName:"p"},"WETH")," token (un)wraps."),(0,i.kt)("h4",{id:"phantom-transfers-aka-internalized-token-imbalance"},"Phantom Transfers (aka Internalized Token Imbalance)"),(0,i.kt)("p",null,'As mentioned above, as a form of gas optimization, solvers may indicate whether certain AMM interactions may be "internalized" if the settlement contract has sufficient balance and would be willing to facilitate the trade with their own funds. Solvers are expected to provide the ',(0,i.kt)("inlineCode",{parentName:"p"},"complete")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"reduced")," ",(0,i.kt)("em",{parentName:"p"},"call-data")," which serves as proof that there was indeed a liquidity source on the competition block that would have filled the trade with the quoted amounts. Internal token imbalances are computed by simulating the transactions with both the ",(0,i.kt)("inlineCode",{parentName:"p"},"complete")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"reduced")," call-data, parsing the transfers and take the difference. This difference represents a ",(0,i.kt)("strong",{parentName:"p"},"very close approximation"),' of the "phantom" transfers that would have happened if the settlement had not been internalized.'),(0,i.kt)("p",null,"Note the use of the term ",(0,i.kt)("em",{parentName:"p"},"approximation")," in this context means that the simulations happened on the ",(0,i.kt)("strong",{parentName:"p"},"competition block")," which is strictly earlier than the ",(0,i.kt)("strong",{parentName:"p"},"settlement block"),' where the transaction was mined. It may happen that the state of skipped liquidity sources changes between these blocks, but this process fairly and accurately captures the solver\'s "intent" (anything else is essentially slippage anyway). This process is deemed to be deterministic, upto potential disagreement between transaction simulators.'),(0,i.kt)("p",null,"Please find the source code for internal imbalances at ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cowprotocol/solver-rewards/tree/main/internal%5C_transfers"},"https://github.com/cowprotocol/solver-rewards/tree/main/internal\\_transfers")),(0,i.kt)("h3",{id:"2-evaluation-in-eth-aka-token-prices"},"2. Evaluation in ETH (aka Token Prices)"),(0,i.kt)("p",null,"Token prices are taken as the ",(0,i.kt)("em",{parentName:"p"},"hourly mean")," over Dune's ",(0,i.kt)("inlineCode",{parentName:"p"},"prices.usd"),' table in combination with the "intrinsic" token prices provided in settlements. SQL code for price table is ',(0,i.kt)("a",{parentName:"p",href:"https://github.com/cowprotocol/solver-rewards/blob/dd2cb170cf6c214b8c2edf1d82eec333d2fa35a1/queries/dune_v2/period_slippage.sql#L258-L324"},"here")))}u.isMDXComponent=!0}}]);