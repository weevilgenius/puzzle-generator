var Gn=()=>({checkValidity(t){const e=t.input,n={message:"",isValid:!0,invalidKeys:[]};if(!e)return n;let i=!0;if("checkValidity"in e&&(i=e.checkValidity()),i)return n;if(n.isValid=!1,"validationMessage"in e&&(n.message=e.validationMessage),!("validity"in e))return n.invalidKeys.push("customError"),n;for(const o in e.validity){if(o==="valid")continue;const r=o;e.validity[r]&&n.invalidKeys.push(r)}return n}}),Li=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor,Zn=t=>{throw TypeError(t)},s=(t,e,n,i)=>{for(var o=i>1?void 0:i?Vi(e,n):e,r=t.length-1,a;r>=0;r--)(a=t[r])&&(o=(i?a(e,n,o):a(o))||o);return i&&o&&Li(e,n,o),o},Jn=(t,e,n)=>e.has(t)||Zn("Cannot "+n),Ri=(t,e,n)=>(Jn(t,e,"read from private field"),e.get(t)),Oi=(t,e,n)=>e.has(t)?Zn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Di=(t,e,n,i)=>(Jn(t,e,"write to private field"),e.set(t,n),n);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye=globalThis,hn=ye.ShadowRoot&&(ye.ShadyCSS===void 0||ye.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qn=Symbol(),kn=new WeakMap;let Mi=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Qn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(hn&&e===void 0){const i=n!==void 0&&n.length===1;i&&(e=kn.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&kn.set(n,e))}return e}toString(){return this.cssText}};const ti=t=>new Mi(typeof t=="string"?t:t+"",void 0,Qn),zi=(t,e)=>{if(hn)t.adoptedStyleSheets=e.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of e){const i=document.createElement("style"),o=ye.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=n.cssText,t.appendChild(i)}},Cn=hn?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const i of e.cssRules)n+=i.cssText;return ti(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Pi,defineProperty:Bi,getOwnPropertyDescriptor:Ii,getOwnPropertyNames:Fi,getOwnPropertySymbols:Hi,getPrototypeOf:qi}=Object,Le=globalThis,En=Le.trustedTypes,Ni=En?En.emptyScript:"",Ui=Le.reactiveElementPolyfillSupport,re=(t,e)=>t,ke={toAttribute(t,e){switch(e){case Boolean:t=t?Ni:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},cn=(t,e)=>!Pi(t,e),Sn={attribute:!0,type:String,converter:ke,reflect:!1,useDefault:!1,hasChanged:cn};Symbol.metadata??=Symbol("metadata"),Le.litPropertyMetadata??=new WeakMap;let Ht=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=Sn){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,n);o!==void 0&&Bi(this.prototype,e,o)}}static getPropertyDescriptor(e,n,i){const{get:o,set:r}=Ii(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:o,set(a){const h=o?.call(this);r?.call(this,a),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Sn}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;const e=qi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){const n=this.properties,i=[...Fi(n),...Hi(n)];for(const o of i)this.createProperty(o,n[o])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[i,o]of n)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const o=this._$Eu(n,i);o!==void 0&&this._$Eh.set(o,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)n.unshift(Cn(o))}else e!==void 0&&n.push(Cn(e));return n}static _$Eu(e,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zi(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:ke).toAttribute(n,i.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,n){const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const r=i.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ke;this._$Em=o;const h=a.fromAttribute(n,r.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(e,n,i){if(e!==void 0){const o=this.constructor,r=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??cn)(r,n)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:o,wrapped:r},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i){const{wrapped:a}=r,h=this[o];a!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,r,h)}}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(n)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((n=>this._$ET(n,this[n]))),this._$EM()}updated(e){}firstUpdated(e){}};Ht.elementStyles=[],Ht.shadowRootOptions={mode:"open"},Ht[re("elementProperties")]=new Map,Ht[re("finalized")]=new Map,Ui?.({ReactiveElement:Ht}),(Le.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const un=globalThis,Ce=un.trustedTypes,An=Ce?Ce.createPolicy("lit-html",{createHTML:t=>t}):void 0,ei="$lit$",St=`lit$${Math.random().toFixed(9).slice(2)}$`,ni="?"+St,Wi=`<${ni}>`,Pt=document,se=()=>Pt.createComment(""),le=t=>t===null||typeof t!="object"&&typeof t!="function",dn=Array.isArray,ji=t=>dn(t)||typeof t?.[Symbol.iterator]=="function",Fe=`[ 	
\f\r]`,ee=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_n=/-->/g,Tn=/>/g,Ot=RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ln=/'/g,Vn=/"/g,ii=/^(?:script|style|textarea|title)$/i,Ki=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),g=Ki(1),Z=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),Rn=new WeakMap,Mt=Pt.createTreeWalker(Pt,129);function oi(t,e){if(!dn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return An!==void 0?An.createHTML(e):e}const Yi=(t,e)=>{const n=t.length-1,i=[];let o,r=e===2?"<svg>":e===3?"<math>":"",a=ee;for(let h=0;h<n;h++){const c=t[h];let u,d,p=-1,m=0;for(;m<c.length&&(a.lastIndex=m,d=a.exec(c),d!==null);)m=a.lastIndex,a===ee?d[1]==="!--"?a=_n:d[1]!==void 0?a=Tn:d[2]!==void 0?(ii.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=Ot):d[3]!==void 0&&(a=Ot):a===Ot?d[0]===">"?(a=o??ee,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Ot:d[3]==='"'?Vn:Ln):a===Vn||a===Ln?a=Ot:a===_n||a===Tn?a=ee:(a=Ot,o=void 0);const f=a===Ot&&t[h+1].startsWith("/>")?" ":"";r+=a===ee?c+Wi:p>=0?(i.push(u),c.slice(0,p)+ei+c.slice(p)+St+f):c+St+(p===-2?h:f)}return[oi(t,r+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class he{constructor({strings:e,_$litType$:n},i){let o;this.parts=[];let r=0,a=0;const h=e.length-1,c=this.parts,[u,d]=Yi(e,n);if(this.el=he.createElement(u,i),Mt.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Mt.nextNode())!==null&&c.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(const p of o.getAttributeNames())if(p.endsWith(ei)){const m=d[a++],f=o.getAttribute(p).split(St),b=/([.?@])?(.*)/.exec(m);c.push({type:1,index:r,name:b[2],strings:f,ctor:b[1]==="."?Gi:b[1]==="?"?Zi:b[1]==="@"?Ji:Ve}),o.removeAttribute(p)}else p.startsWith(St)&&(c.push({type:6,index:r}),o.removeAttribute(p));if(ii.test(o.tagName)){const p=o.textContent.split(St),m=p.length-1;if(m>0){o.textContent=Ce?Ce.emptyScript:"";for(let f=0;f<m;f++)o.append(p[f],se()),Mt.nextNode(),c.push({type:2,index:++r});o.append(p[m],se())}}}else if(o.nodeType===8)if(o.data===ni)c.push({type:2,index:r});else{let p=-1;for(;(p=o.data.indexOf(St,p+1))!==-1;)c.push({type:7,index:r}),p+=St.length-1}r++}}static createElement(e,n){const i=Pt.createElement("template");return i.innerHTML=e,i}}function Ut(t,e,n=t,i){if(e===Z)return e;let o=i!==void 0?n._$Co?.[i]:n._$Cl;const r=le(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(t),o._$AT(t,n,i)),i!==void 0?(n._$Co??=[])[i]=o:n._$Cl=o),o!==void 0&&(e=Ut(t,o._$AS(t,e.values),o,i)),e}class Xi{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:i}=this._$AD,o=(e?.creationScope??Pt).importNode(n,!0);Mt.currentNode=o;let r=Mt.nextNode(),a=0,h=0,c=i[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new ce(r,r.nextSibling,this,e):c.type===1?u=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(u=new Qi(r,this,e)),this._$AV.push(u),c=i[++h]}a!==c?.index&&(r=Mt.nextNode(),a++)}return Mt.currentNode=Pt,o}p(e){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}}class ce{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,i,o){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Ut(this,e,n),le(e)?e===z||e==null||e===""?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==Z&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ji(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==z&&le(this._$AH)?this._$AA.nextSibling.data=e:this.T(Pt.createTextNode(e)),this._$AH=e}$(e){const{values:n,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=he.createElement(oi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(n);else{const r=new Xi(o,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(e){let n=Rn.get(e.strings);return n===void 0&&Rn.set(e.strings,n=new he(e)),n}k(e){dn(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,o=0;for(const r of e)o===n.length?n.push(i=new ce(this.O(se()),this.O(se()),this,this.options)):i=n[o],i._$AI(r),o++;o<n.length&&(this._$AR(i&&i._$AB.nextSibling,o),n.length=o)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ve{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,o,r){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=n,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}_$AI(e,n=this,i,o){const r=this.strings;let a=!1;if(r===void 0)e=Ut(this,e,n,0),a=!le(e)||e!==this._$AH&&e!==Z,a&&(this._$AH=e);else{const h=e;let c,u;for(e=r[0],c=0;c<r.length-1;c++)u=Ut(this,h[i+c],n,c),u===Z&&(u=this._$AH[c]),a||=!le(u)||u!==this._$AH[c],u===z?e=z:e!==z&&(e+=(u??"")+r[c+1]),this._$AH[c]=u}a&&!o&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Gi extends Ve{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}}class Zi extends Ve{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==z)}}class Ji extends Ve{constructor(e,n,i,o,r){super(e,n,i,o,r),this.type=5}_$AI(e,n=this){if((e=Ut(this,e,n,0)??z)===Z)return;const i=this._$AH,o=e===z&&i!==z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==z&&(i===z||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Qi{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ut(this,e)}}const to=un.litHtmlPolyfillSupport;to?.(he,ce),(un.litHtmlVersions??=[]).push("3.3.1");const eo=(t,e,n)=>{const i=n?.renderBefore??e;let o=i._$litPart$;if(o===void 0){const r=n?.renderBefore??null;i._$litPart$=o=new ce(e.insertBefore(se(),r),r,void 0,n??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pn=globalThis;let ae=class extends Ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=eo(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ae._$litElement$=!0,ae.finalized=!0,pn.litElementHydrateSupport?.({LitElement:ae});const no=pn.litElementPolyfillSupport;no?.({LitElement:ae});(pn.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const io=!1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=t=>(e,n)=>{n!==void 0?n.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oo={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:cn},ro=(t=oo,e,n)=>{const{kind:i,metadata:o}=n;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(n.name,t),i==="accessor"){const{name:a}=n;return{set(h){const c=e.get.call(this);e.set.call(this,h),this.requestUpdate(a,c,t)},init(h){return h!==void 0&&this.C(a,void 0,t,h),h}}}if(i==="setter"){const{name:a}=n;return function(h){const c=this[a];e.call(this,h),this.requestUpdate(a,c,t)}}throw Error("Unsupported decorator location: "+i)};function l(t){return(e,n)=>typeof n=="object"?ro(t,e,n):((i,o,r)=>{const a=o.hasOwnProperty(r);return o.constructor.createProperty(r,i),a?Object.getOwnPropertyDescriptor(o,r):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ao(t){return(e,n)=>{const i=typeof e=="function"?e:e[n];Object.assign(i,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ri=(t,e,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function E(t,e){return(n,i,o)=>{const r=a=>a.renderRoot?.querySelector(t)??null;return ri(n,i,{get(){return r(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let so;function lo(t){return(e,n)=>ri(e,n,{get(){return(this.renderRoot??(so??=document.createDocumentFragment())).querySelectorAll(t)}})}var ho=`:host {
  box-sizing: border-box !important;
}

:host *,
:host *::before,
:host *::after {
  box-sizing: inherit !important;
}

[hidden] {
  display: none !important;
}
`,xe,U=class extends ae{constructor(){super(),Oi(this,xe,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,n)=>{this.internals?.states&&(n?this.internals.states.add(e):this.internals.states.delete(e))},has:e=>this.internals?.states?this.internals.states.has(e):!1};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,n]of t.elementProperties)n.default==="inherit"&&n.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${n.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[ho,...t].map(e=>typeof e=="string"?ti(e):e)}attributeChangedCallback(t,e,n){Ri(this,xe)||(this.constructor.elementProperties.forEach((i,o)=>{i.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o])}),Di(this,xe,!0)),super.attributeChangedCallback(t,e,n)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,n)=>{t.has(n)&&this[n]==null&&(this[n]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const n=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});n.error=e,this.dispatchEvent(n)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};xe=new WeakMap;s([l()],U.prototype,"dir",2);s([l()],U.prototype,"lang",2);s([l({type:Boolean,reflect:!0,attribute:"did-ssr"})],U.prototype,"didSSR",2);var fn=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},co=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),W=class extends U{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new fn))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[co()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const n of e.observedAttributes)t.add(n);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const e=this.value;if(Array.isArray(e)){if(this.name){const n=new FormData;for(const i of e)n.append(this.name,i);this.setValue(n,n)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],n=t[1];let i=t[2];i||(i=this.validationTarget),this.internals.setValidity(e,n,i||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&n),this.customStates.set("user-valid",e&&n)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,n]=t;this.internals.setFormValue(e,n)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},n=this.validationTarget||this.input||void 0;let i="";for(const o of t){const{isValid:r,message:a,invalidKeys:h}=o.checkValidity(this);r||(i||(i=a),h?.length>=0&&h.forEach(c=>e[c]=!0))}i||(i=this.validationMessage),this.setValidity(e,i,n)}};W.formAssociated=!0;s([l({reflect:!0})],W.prototype,"name",2);s([l({type:Boolean})],W.prototype,"disabled",2);s([l({state:!0,attribute:!1})],W.prototype,"valueHasChanged",2);s([l({state:!0,attribute:!1})],W.prototype,"hasInteracted",2);s([l({attribute:"custom-error",reflect:!0})],W.prototype,"customError",2);s([l({attribute:!1,state:!0,type:Object})],W.prototype,"validity",1);var Zt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=n=>{const i=n.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},Ft=`@layer wa-utilities {
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
}
`;const Ze=new Set,qt=new Map;let Dt,mn="ltr",bn="en";const ai=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(ai){const t=new MutationObserver(li);mn=document.documentElement.dir||"ltr",bn=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function si(...t){t.map(e=>{const n=e.$code.toLowerCase();qt.has(n)?qt.set(n,Object.assign(Object.assign({},qt.get(n)),e)):qt.set(n,e),Dt||(Dt=e)}),li()}function li(){ai&&(mn=document.documentElement.dir||"ltr",bn=document.documentElement.lang||navigator.language),[...Ze.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let uo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ze.add(this.host)}hostDisconnected(){Ze.delete(this.host)}dir(){return`${this.host.dir||mn}`.toLowerCase()}lang(){return`${this.host.lang||bn}`.toLowerCase()}getTranslationData(e){var n,i;const o=new Intl.Locale(e.replace(/_/g,"-")),r=o?.language.toLowerCase(),a=(i=(n=o?.region)===null||n===void 0?void 0:n.toLowerCase())!==null&&i!==void 0?i:"",h=qt.get(`${r}-${a}`),c=qt.get(r);return{locale:o,language:r,region:a,primary:h,secondary:c}}exists(e,n){var i;const{primary:o,secondary:r}=this.getTranslationData((i=n.lang)!==null&&i!==void 0?i:this.lang());return n=Object.assign({includeFallback:!1},n),!!(o&&o[e]||r&&r[e]||n.includeFallback&&Dt&&Dt[e])}term(e,...n){const{primary:i,secondary:o}=this.getTranslationData(this.lang());let r;if(i&&i[e])r=i[e];else if(o&&o[e])r=o[e];else if(Dt&&Dt[e])r=Dt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof r=="function"?r(...n):r}date(e,n){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),n).format(e)}number(e,n){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),n).format(e)}relativeTime(e,n,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,n)}};var hi={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};si(hi);var po=hi,lt=class extends uo{};si(po);function O(t,e){const n={waitUntilFirstUpdate:!1,...e};return(i,o)=>{const{update:r}=i,a=Array.isArray(t)?t:[t];i.update=function(h){a.forEach(c=>{const u=c;if(h.has(u)){const d=h.get(u),p=this[u];d!==p&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[o](d,p)}}),r.call(this,h)}}}var Re=`@layer wa-utilities {
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
}
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Oe=t=>(...e)=>({_$litDirective$:t,values:e});let De=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,i){this._$Ct=e,this._$AM=n,this._$Ci=i}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=Oe(class extends De{constructor(t){if(super(t),t.type!==wt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((i=>i!==""))));for(const i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}const n=t.element.classList;for(const i of this.st)i in e||(n.remove(i),this.st.delete(i));for(const i in e){const o=!!e[i];o===this.st.has(i)||this.nt?.has(i)||(o?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return Z}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=t=>t??z;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ci=Symbol.for(""),fo=t=>{if(t?.r===ci)return t?._$litStatic$},On=(t,...e)=>({_$litStatic$:e.reduce(((n,i,o)=>n+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[o+1]),t[0]),r:ci}),Dn=new Map,mo=t=>(e,...n)=>{const i=n.length;let o,r;const a=[],h=[];let c,u=0,d=!1;for(;u<i;){for(c=e[u];u<i&&(r=n[u],(o=fo(r))!==void 0);)c+=o+e[++u],d=!0;u!==i&&h.push(r),a.push(c),u++}if(u===i&&a.push(e[i]),d){const p=a.join("$$lit$$");(e=Dn.get(p))===void 0&&(a.raw=a,Dn.set(p,e=a)),n=h}return t(e,...n)},He=mo(g);var bo=`@layer wa-component {
  :host {
    display: inline-block;

    /* Workaround because Chrome doesn't like :host(:has()) below
     * https://issues.chromium.org/issues/40062355 
     * Firefox doesn't like this nested rule, so both are needed */
    &:has(wa-badge) {
      position: relative;
    }
  }

  /* Apply relative positioning only when needed to position wa-badge
   * This avoids creating a new stacking context for every button */
  :host(:has(wa-badge)) {
    position: relative;
  }
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  vertical-align: middle;
  transition-property: background, border, box-shadow, color;
  transition-duration: var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);
  cursor: pointer;
  padding: 0 var(--wa-form-control-padding-inline);
  font-family: inherit;
  font-size: inherit;
  font-weight: var(--wa-font-weight-action);
  line-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
  height: var(--wa-form-control-height);
  width: 100%;

  background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
  border-color: transparent;
  color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
  border-radius: var(--wa-form-control-border-radius);
  border-style: var(--wa-border-style);
  border-width: var(--wa-border-width-s);
}

/* Appearance modifiers */
:host([appearance~='plain']) {
  .button {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: transparent;
    border-color: transparent;
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    }
  }
  .button:not(.disabled):not(.loading):active {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
      var(--wa-color-mix-active)
    );
  }
}

:host([appearance~='outlined']) {
  .button {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    }
  }
  .button:not(.disabled):not(.loading):active {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
      var(--wa-color-mix-active)
    );
  }
}

:host([appearance~='filled']) {
  .button {
    color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
    border-color: transparent;
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-hover)
      );
    }
  }
  .button:not(.disabled):not(.loading):active {
    color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
      var(--wa-color-mix-active)
    );
  }
}

:host([appearance~='filled'][appearance~='outlined']) .button {
  border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
}

:host([appearance~='accent']) {
  .button {
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-hover)
      );
    }
  }
  .button:not(.disabled):not(.loading):active {
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
      var(--wa-color-mix-active)
    );
  }
}

/* Focus states */
.button:focus {
  outline: none;
}

.button:focus-visible {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Disabled state */
.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* When disabled, prevent mouse events from bubbling up from children */
.button.disabled * {
  pointer-events: none;
}

/* Keep it last so Safari doesn't stop parsing this block */
.button::-moz-focus-inner {
  border: 0;
}

/* Icon buttons */
.button.is-icon-button {
  outline-offset: 2px;
  width: var(--wa-form-control-height);
  aspect-ratio: 1;
}

/* Pill modifier */
:host([pill]) .button {
  border-radius: var(--wa-border-radius-pill);
}

/*
 * Label
 */

.start,
.end {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.label {
  display: inline-block;
}

.is-icon-button .label {
  display: flex;
}

.label::slotted(wa-icon) {
  align-self: center;
}

/*
 * Caret modifier
 */

wa-icon[part~='caret'] {
  display: flex;
  align-self: center;
  align-items: center;

  &::part(svg) {
    width: 0.875em;
    height: 0.875em;
  }

  .button:has(&) .end {
    display: none;
  }
}

/*
 * Loading modifier
 */

.loading {
  position: relative;
  cursor: wait;

  .start,
  .label,
  .end,
  .caret {
    visibility: hidden;
  }

  wa-spinner {
    --indicator-color: currentColor;
    --track-color: color-mix(in oklab, currentColor, transparent 90%);

    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }
}

/*
 * Badges
 */

button ::slotted(wa-badge) {
  border-color: var(--wa-color-surface-default);
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  translate: 50% -50%;
  pointer-events: none;
}

:host(:dir(rtl)) ::slotted(wa-badge) {
  translate: -50% -50%;
}

/*
* Button spacing
*/

slot[name='start']::slotted(*) {
  margin-inline-end: 0.75em;
}

slot[name='end']::slotted(*),
.button:not(.visually-hidden-label) [part~='caret'] {
  margin-inline-start: 0.75em;
}

/*
 * Button group border radius modifications
 */

/* Remove border radius from all grouped buttons by default */
:host(.wa-button-group__button) .button {
  border-radius: 0;
}

/* Horizontal orientation */
:host(.wa-button-group__horizontal.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-form-control-border-radius);
  border-end-start-radius: var(--wa-form-control-border-radius);
}

:host(.wa-button-group__horizontal.wa-button-group__button-last) .button {
  border-start-end-radius: var(--wa-form-control-border-radius);
  border-end-end-radius: var(--wa-form-control-border-radius);
}

/* Vertical orientation */
:host(.wa-button-group__vertical) {
  flex: 1 1 auto;
}

:host(.wa-button-group__vertical) .button {
  width: 100%;
  justify-content: start;
}

:host(.wa-button-group__vertical.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-form-control-border-radius);
  border-start-end-radius: var(--wa-form-control-border-radius);
}

:host(.wa-button-group__vertical.wa-button-group__button-last) .button {
  border-end-start-radius: var(--wa-form-control-border-radius);
  border-end-end-radius: var(--wa-form-control-border-radius);
}

/* Handle pill modifier for button groups */
:host([pill].wa-button-group__horizontal.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-border-radius-pill);
  border-end-start-radius: var(--wa-border-radius-pill);
}

:host([pill].wa-button-group__horizontal.wa-button-group__button-last) .button {
  border-start-end-radius: var(--wa-border-radius-pill);
  border-end-end-radius: var(--wa-border-radius-pill);
}

:host([pill].wa-button-group__vertical.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-border-radius-pill);
  border-start-end-radius: var(--wa-border-radius-pill);
}

:host([pill].wa-button-group__vertical.wa-button-group__button-last) .button {
  border-end-start-radius: var(--wa-border-radius-pill);
  border-end-end-radius: var(--wa-border-radius-pill);
}
`,A=class extends W{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Zt(this,"[default]","start","end"),this.localize=new lt(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button",this.form=null}static get validators(){return[...super.validators,Gn()]}constructLightDOMButton(){const t=document.createElement("button");return t.type=this.type,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.name&&(t.name=this.name),t.value=this.value||"",["form","formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{this.hasAttribute(e)&&t.setAttribute(e,this.getAttribute(e))}),t}handleClick(){if(!this.getForm())return;const e=this.constructLightDOMButton();this.parentElement?.append(e),e.click(),e.remove()}handleInvalid(){this.dispatchEvent(new fn)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,n=!1,i="";[...t].forEach(o=>{o.nodeType===Node.ELEMENT_NODE&&o.localName==="wa-icon"&&(n=!0,e||(e=o.hasAttribute("label"))),o.nodeType===Node.TEXT_NODE&&(i+=o.textContent)}),this.isIconButton=i.trim()===""&&n,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?On`a`:On`button`;return He`
      <${e}
        part="base"
        class=${B({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${_(t?void 0:this.disabled)}
        type=${_(t?void 0:this.type)}
        title=${this.title}
        name=${_(t?void 0:this.name)}
        value=${_(t?void 0:this.value)}
        href=${_(t?this.href:void 0)}
        target=${_(t?this.target:void 0)}
        download=${_(t?this.download:void 0)}
        rel=${_(t&&this.rel?this.rel:void 0)}
        role=${_(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?He`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?He`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};A.css=[bo,Re,Ft];s([E(".button")],A.prototype,"button",2);s([E("slot:not([name])")],A.prototype,"labelSlot",2);s([R()],A.prototype,"invalid",2);s([R()],A.prototype,"isIconButton",2);s([l()],A.prototype,"title",2);s([l({reflect:!0})],A.prototype,"variant",2);s([l({reflect:!0})],A.prototype,"appearance",2);s([l({reflect:!0})],A.prototype,"size",2);s([l({attribute:"with-caret",type:Boolean,reflect:!0})],A.prototype,"withCaret",2);s([l({type:Boolean})],A.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],A.prototype,"loading",2);s([l({type:Boolean,reflect:!0})],A.prototype,"pill",2);s([l()],A.prototype,"type",2);s([l({reflect:!0})],A.prototype,"name",2);s([l({reflect:!0})],A.prototype,"value",2);s([l({reflect:!0})],A.prototype,"href",2);s([l()],A.prototype,"target",2);s([l()],A.prototype,"rel",2);s([l()],A.prototype,"download",2);s([l({reflect:!0})],A.prototype,"form",2);s([l({attribute:"formaction"})],A.prototype,"formAction",2);s([l({attribute:"formenctype"})],A.prototype,"formEnctype",2);s([l({attribute:"formmethod"})],A.prototype,"formMethod",2);s([l({attribute:"formnovalidate",type:Boolean})],A.prototype,"formNoValidate",2);s([l({attribute:"formtarget"})],A.prototype,"formTarget",2);s([O("disabled",{waitUntilFirstUpdate:!0})],A.prototype,"handleDisabledChange",1);A=s([H("wa-button")],A);var go=`:host {
  --track-width: 2px;
  --track-color: var(--wa-color-neutral-fill-normal);
  --indicator-color: var(--wa-color-brand-fill-loud);
  --speed: 2s;

  /* Resizing a spinner element using anything but font-size will break the animation because the animation uses em units.
   Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can grow/shrink and
   break the animation. The use of \`flex: none\` on the host element prevents this by always having the spinner sized
   according to its actual dimensions.
  */
  flex: none;
  display: inline-flex;
  width: 1em;
  height: 1em;
}

svg {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  animation: spin var(--speed) linear infinite;
}

.track {
  stroke: var(--track-color);
}

.indicator {
  stroke: var(--indicator-color);
  stroke-dasharray: 75, 100;
  stroke-dashoffset: -5;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
`,Je=class extends U{constructor(){super(...arguments),this.localize=new lt(this)}render(){return g`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `}};Je.css=go;Je=s([H("wa-spinner")],Je);var vo=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}},Qe="",tn="";function Mn(t){Qe=t}function wo(t=""){if(!Qe){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const n=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;Mn(n)}else{const i=[...document.getElementsByTagName("script")].find(o=>o.src.endsWith("webawesome.js")||o.src.endsWith("webawesome.loader.js")||o.src.endsWith("webawesome.ssr-loader.js"));if(i){const o=String(i.getAttribute("src"));Mn(o.split("/").slice(0,-1).join("/"))}}}return Qe.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function yo(t){tn=t}function xo(){if(!tn){const t=document.querySelector("[data-fa-kit-code]");t&&yo(t.getAttribute("data-fa-kit-code")||"")}return tn}var gt="7.0.1";function $o(t,e,n){const i=xo(),o=i.length>0;let r="solid";return e==="notdog"?(n==="solid"&&(r="solid"),n==="duo-solid"&&(r="duo-solid"),`https://ka-p.fontawesome.com/releases/v${gt}/svgs/notdog-${r}/${t}.svg?token=${encodeURIComponent(i)}`):e==="chisel"?`https://ka-p.fontawesome.com/releases/v${gt}/svgs/chisel-regular/${t}.svg?token=${encodeURIComponent(i)}`:e==="etch"?`https://ka-p.fontawesome.com/releases/v${gt}/svgs/etch-solid/${t}.svg?token=${encodeURIComponent(i)}`:e==="jelly"?(n==="regular"&&(r="regular"),n==="duo-regular"&&(r="duo-regular"),n==="fill-regular"&&(r="fill-regular"),`https://ka-p.fontawesome.com/releases/v${gt}/svgs/jelly-${r}/${t}.svg?token=${encodeURIComponent(i)}`):e==="slab"?((n==="solid"||n==="regular")&&(r="regular"),n==="press-regular"&&(r="press-regular"),`https://ka-p.fontawesome.com/releases/v${gt}/svgs/slab-${r}/${t}.svg?token=${encodeURIComponent(i)}`):e==="thumbprint"?`https://ka-p.fontawesome.com/releases/v${gt}/svgs/thumbprint-light/${t}.svg?token=${encodeURIComponent(i)}`:e==="whiteboard"?`https://ka-p.fontawesome.com/releases/v${gt}/svgs/whiteboard-semibold/${t}.svg?token=${encodeURIComponent(i)}`:(e==="classic"&&(n==="thin"&&(r="thin"),n==="light"&&(r="light"),n==="regular"&&(r="regular"),n==="solid"&&(r="solid")),e==="sharp"&&(n==="thin"&&(r="sharp-thin"),n==="light"&&(r="sharp-light"),n==="regular"&&(r="sharp-regular"),n==="solid"&&(r="sharp-solid")),e==="duotone"&&(n==="thin"&&(r="duotone-thin"),n==="light"&&(r="duotone-light"),n==="regular"&&(r="duotone-regular"),n==="solid"&&(r="duotone")),e==="sharp-duotone"&&(n==="thin"&&(r="sharp-duotone-thin"),n==="light"&&(r="sharp-duotone-light"),n==="regular"&&(r="sharp-duotone-regular"),n==="solid"&&(r="sharp-duotone-solid")),e==="brands"&&(r="brands"),o?`https://ka-p.fontawesome.com/releases/v${gt}/svgs/${r}/${t}.svg?token=${encodeURIComponent(i)}`:`https://ka-f.fontawesome.com/releases/v${gt}/svgs/${r}/${t}.svg`)}var ko={name:"default",resolver:(t,e="classic",n="solid")=>$o(t,e,n),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){const{family:n,variant:i}=e;if(n==="duotone"||n==="sharp-duotone"||n==="notdog"&&i==="duo-solid"||n==="jelly"&&i==="duo-regular"||n==="thumbprint"){const o=[...t.querySelectorAll("path")],r=o.find(h=>!h.hasAttribute("opacity")),a=o.find(h=>h.hasAttribute("opacity"));if(!r||!a)return;if(r.setAttribute("data-duotone-primary",""),a.setAttribute("data-duotone-secondary",""),e.swapOpacity&&r&&a){const h=a.getAttribute("opacity")||"0.4";r.style.setProperty("--path-opacity",h),a.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},Co=ko;function Eo(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var qe={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},So={name:"system",resolver:(t,e="classic",n="solid")=>{let o=qe[n][t]??qe.regular[t]??qe.regular["circle-question"];return o?Eo(o):""}},Ao=So,_o="classic",Ee=[Co,Ao],Se=[];function To(t){Se.push(t)}function Lo(t){Se=Se.filter(e=>e!==t)}function Ne(t){return Ee.find(e=>e.name===t)}function Va(t,e){Vo(t),Ee.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),Se.forEach(n=>{n.library===t&&n.setIcon()})}function Vo(t){Ee=Ee.filter(e=>e.name!==t)}function Ro(){return _o}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oo=(t,e)=>t?._$litType$!==void 0,Do=t=>t.strings===void 0,Mo={},zo=(t,e=Mo)=>t._$AH=e;var Po=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},Bo=`:host {
  --primary-color: currentColor;
  --primary-opacity: 1;
  --secondary-color: currentColor;
  --secondary-opacity: 0.4;

  box-sizing: content-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: -0.125em;
}

/* Standard */
:host(:not([auto-width])) {
  width: 1.25em;
  height: 1em;
}

/* Auto-width */
:host([auto-width]) {
  width: auto;
  height: 1em;
}

svg {
  height: 1em;
  fill: currentColor;
  overflow: visible;

  /* Duotone colors with path-specific opacity fallback */
  path[data-duotone-primary] {
    color: var(--primary-color);
    opacity: var(--path-opacity, var(--primary-opacity));
  }

  path[data-duotone-secondary] {
    color: var(--secondary-color);
    opacity: var(--path-opacity, var(--secondary-opacity));
  }
}
`,ne=Symbol(),pe=Symbol(),Ue,We=new Map,K=class extends U{constructor(){super(...arguments),this.svg=null,this.swapOpacity=!1,this.label="",this.library="default",this.resolveIcon=async(t,e)=>{let n;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=g`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const i=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(i,this),this.svg}try{if(n=await fetch(t,{mode:"cors"}),!n.ok)return n.status===410?ne:pe}catch{return pe}try{const i=document.createElement("div");i.innerHTML=await n.text();const o=i.firstElementChild;if(o?.tagName?.toLowerCase()!=="svg")return ne;Ue||(Ue=new DOMParser);const a=Ue.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):ne}catch{return ne}}}connectedCallback(){super.connectedCallback(),To(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Lo(this)}getIconSource(){const t=Ne(this.library),e=this.family||Ro();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),n=e?Ne(this.library):void 0;if(!t){this.svg=null;return}let i=We.get(t);i||(i=this.resolveIcon(t,n),We.set(t,i));const o=await i;if(o===pe&&We.delete(t),t===this.getIconSource().url){if(Oo(o)){this.svg=o;return}switch(o){case pe:case ne:this.svg=null,this.dispatchEvent(new Po);break;default:this.svg=o.cloneNode(!0),n?.mutator?.(this.svg,this),this.dispatchEvent(new vo)}}}updated(t){super.updated(t);const e=Ne(this.library),n=this.shadowRoot?.querySelector("svg");n&&e?.mutator?.(n,this)}render(){return this.hasUpdated?this.svg:g`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`}};K.css=Bo;s([R()],K.prototype,"svg",2);s([l({reflect:!0})],K.prototype,"name",2);s([l({reflect:!0})],K.prototype,"family",2);s([l({reflect:!0})],K.prototype,"variant",2);s([l({attribute:"auto-width",type:Boolean,reflect:!0})],K.prototype,"autoWidth",2);s([l({attribute:"swap-opacity",type:Boolean,reflect:!0})],K.prototype,"swapOpacity",2);s([l()],K.prototype,"src",2);s([l()],K.prototype,"label",2);s([l({reflect:!0})],K.prototype,"library",2);s([O("label")],K.prototype,"handleLabelChange",1);s([O(["family","name","library","variant","src","autoWidth","swapOpacity"])],K.prototype,"setIcon",1);K=s([H("wa-icon")],K);var Io=`:host {
  --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375em 0.625em;
  color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
  font-size: max(var(--wa-font-size-2xs), 0.75em);
  font-weight: var(--wa-font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
  background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
  border-color: transparent;
  border-radius: var(--wa-border-radius-s);
  border-style: var(--wa-border-style);
  border-width: var(--wa-border-width-s);
  user-select: none;
  -webkit-user-select: none;
  cursor: inherit;
}

/* Appearance modifiers */
:host([appearance~='outlined']) {
  --pulse-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));

  color: var(--wa-color-on-quiet, var(--wa-color-brand-on-quiet));
  background-color: transparent;
  border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
}

:host([appearance~='filled']) {
  --pulse-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));

  color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
  background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
  border-color: transparent;
}

:host([appearance~='filled'][appearance~='outlined']) {
  --pulse-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));

  border-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));
}

:host([appearance~='accent']) {
  --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

  color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
  background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
  border-color: transparent;
}

/* Pill modifier */
:host([pill]) {
  border-radius: var(--wa-border-radius-pill);
}

/* Pulse attention */
:host([attention='pulse']) {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--pulse-color);
  }
  70% {
    box-shadow: 0 0 0 0.5rem transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

/* Bounce attention */
:host([attention='bounce']) {
  animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

::slotted(wa-icon) {
  margin-inline-end: var(--wa-space-2xs, 0.25em);
  opacity: 90%;
  line-height: 1;
  height: 0.85em;
}
`,Bt=class extends U{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return g` <slot part="base" role="status"></slot>`}};Bt.css=[Re,Io];s([l({reflect:!0})],Bt.prototype,"variant",2);s([l({reflect:!0})],Bt.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],Bt.prototype,"pill",2);s([l({reflect:!0})],Bt.prototype,"attention",2);Bt=s([H("wa-badge")],Bt);var gn=(t={})=>{let{validationElement:e,validationProperty:n}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),n||(n="value");const i={observedAttributes:["required"],message:e.validationMessage,checkValidity(o){const r={message:"",isValid:!0,invalidKeys:[]};return(o.required??o.hasAttribute("required"))&&!o[n]&&(r.message=typeof i.message=="function"?i.message(o):i.message||"",r.isValid=!1,r.invalidKeys.push("valueMissing")),r}};return i},ue=`:host {
  display: flex;
  flex-direction: column;
}

/* Label */
:is([part~='form-control-label'], [part~='label']):has(*:not(:empty)) {
  display: inline-block;
  color: var(--wa-form-control-label-color);
  font-weight: var(--wa-form-control-label-font-weight);
  line-height: var(--wa-form-control-label-line-height);
  margin-block-end: 0.5em;

  :host([required]) &::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }
}

/* Help text */
[part~='hint'] {
  display: block;
  color: var(--wa-form-control-hint-color);
  font-weight: var(--wa-form-control-hint-font-weight);
  line-height: var(--wa-form-control-hint-line-height);
  margin-block-start: 0.5em;
  font-size: var(--wa-font-size-smaller);
  line-height: var(--wa-form-control-label-line-height);

  &:not(.has-slotted) {
    display: none;
  }
}
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const en=Oe(class extends De{constructor(t){if(super(t),t.type!==wt.PROPERTY&&t.type!==wt.ATTRIBUTE&&t.type!==wt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Do(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Z||e===z)return e;const n=t.element,i=t.name;if(t.type===wt.PROPERTY){if(e===n[i])return Z}else if(t.type===wt.BOOLEAN_ATTRIBUTE){if(!!e===n.hasAttribute(i))return Z}else if(t.type===wt.ATTRIBUTE&&n.getAttribute(i)===e+"")return Z;return zo(t),e}});var Fo=`:host {
  --checked-icon-color: var(--wa-color-brand-on-loud);
  --checked-icon-scale: 0.8;

  display: inline-flex;
  color: var(--wa-form-control-value-color);
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  user-select: none;
  -webkit-user-select: none;
}

[part~='control'] {
  display: inline-flex;
  flex: 0 0 auto;
  position: relative;
  align-items: center;
  justify-content: center;
  width: var(--wa-form-control-toggle-size);
  height: var(--wa-form-control-toggle-size);
  border-color: var(--wa-form-control-border-color);
  border-radius: min(
    calc(var(--wa-form-control-toggle-size) * 0.375),
    var(--wa-border-radius-s)
  ); /* min prevents entirely circular checkbox */
  border-style: var(--wa-border-style);
  border-width: var(--wa-form-control-border-width);
  background-color: var(--wa-form-control-background-color);
  transition:
    background var(--wa-transition-normal),
    border-color var(--wa-transition-fast),
    box-shadow var(--wa-transition-fast),
    color var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);

  margin-inline-end: 0.5em;
}

[part~='base'] {
  display: flex;
  align-items: flex-start;
  position: relative;
  color: currentColor;
  vertical-align: middle;
  cursor: pointer;
}

[part~='label'] {
  display: inline;
}

/* Checked */
[part~='control']:has(:checked, :indeterminate) {
  color: var(--checked-icon-color);
  border-color: var(--wa-form-control-activated-color);
  background-color: var(--wa-form-control-activated-color);
}

/* Focus */
[part~='control']:has(> input:focus-visible:not(:disabled)) {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Disabled */
:host [part~='base']:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

input {
  position: absolute;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  pointer-events: none;
}

[part~='icon'] {
  display: flex;
  scale: var(--checked-icon-scale);

  /* Without this, Safari renders the icon slightly to the left */
  &::part(svg) {
    translate: 0.0009765625em;
  }

  input:not(:checked, :indeterminate) + & {
    visibility: hidden;
  }
}

:host([required]) [part~='label']::after {
  content: var(--wa-form-control-required-content);
  color: var(--wa-form-control-required-content-color);
  margin-inline-start: var(--wa-form-control-required-content-offset);
}
`,I=class extends W{constructor(){super(...arguments),this.hasSlotController=new Zt(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint=""}static get validators(){const t=[gn({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){return this._value??"on"}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,n=!this.checked&&this.indeterminate,i=n?"indeterminate":"check",o=n?"indeterminate":"check";return g`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${_(this._value)}
            .indeterminate=${en(this.indeterminate)}
            .checked=${en(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${o}-icon icon" library="system" name=${i}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${B({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};I.css=[ue,Ft,Fo];I.shadowRootOptions={...W.shadowRootOptions,delegatesFocus:!0};s([E('input[type="checkbox"]')],I.prototype,"input",2);s([l()],I.prototype,"title",2);s([l({reflect:!0})],I.prototype,"name",2);s([l({reflect:!0})],I.prototype,"value",1);s([l({reflect:!0})],I.prototype,"size",2);s([l({type:Boolean})],I.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],I.prototype,"indeterminate",2);s([l({type:Boolean,attribute:!1})],I.prototype,"checked",2);s([l({type:Boolean,reflect:!0,attribute:"checked"})],I.prototype,"defaultChecked",2);s([l({reflect:!0})],I.prototype,"form",2);s([l({type:Boolean,reflect:!0})],I.prototype,"required",2);s([l()],I.prototype,"hint",2);s([O("defaultChecked")],I.prototype,"handleDefaultCheckedChange",1);s([O(["checked","indeterminate"])],I.prototype,"handleStateChange",1);s([O("disabled")],I.prototype,"handleDisabledChange",1);I=s([H("wa-checkbox")],I);const Ho="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let qo=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=Ho[n[t]&63];return e};function L(t,e,n){const i=o=>Object.is(o,-0)?0:o;return t<e?i(e):t>n?i(n):i(t)}function No(t=""){return`${t}${qo()}`}var Uo=`:host {
  --track-height: 1rem;
  --track-color: var(--wa-color-neutral-fill-normal);
  --indicator-color: var(--wa-color-brand-fill-loud);

  display: flex;
}

.progress-bar {
  flex: 1 1 auto;
  display: flex;
  position: relative;
  overflow: hidden;
  height: var(--track-height);
  border-radius: var(--wa-border-radius-pill);
  background-color: var(--track-color);
  color: var(--wa-color-brand-on-loud);
  font-size: var(--wa-font-size-s);
}

.indicator {
  width: var(--percentage);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--indicator-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1;
  font-weight: var(--wa-font-weight-semibold);
  transition: all var(--wa-transition-slow, 200ms) var(--wa-transition-easing, ease);
  user-select: none;
  -webkit-user-select: none;
}

/* Indeterminate */
:host([indeterminate]) .indicator {
  position: absolute;
  inset-block: 0;
  inline-size: 50%;
  animation: wa-progress-indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
}

@media (forced-colors: active) {
  .progress-bar {
    outline: solid 1px SelectedItem;
    background-color: var(--wa-color-surface-default);
  }

  .indicator {
    outline: solid 1px SelectedItem;
    background-color: SelectedItem;
  }
}

@keyframes wa-progress-indeterminate {
  0% {
    inset-inline-start: -50%;
  }

  75%,
  100% {
    inset-inline-start: 100%;
  }
}
`,Wt=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.value=0,this.indeterminate=!1,this.label=""}updated(t){t.has("value")&&requestAnimationFrame(()=>{this.style.setProperty("--percentage",`${L(this.value,0,100)}%`)})}render(){return g`
      <div
        part="base"
        class="progress-bar"
        role="progressbar"
        title=${_(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?"0":this.value}
      >
        <div part="indicator" class="indicator">
          ${this.indeterminate?"":g` <slot part="label" class="label"></slot> `}
        </div>
      </div>
    `}};Wt.css=Uo;s([l({type:Number,reflect:!0})],Wt.prototype,"value",2);s([l({type:Boolean,reflect:!0})],Wt.prototype,"indeterminate",2);s([l()],Wt.prototype,"label",2);Wt=s([H("wa-progress-bar")],Wt);var Wo=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};const _t=Math.min,G=Math.max,Ae=Math.round,fe=Math.floor,ut=t=>({x:t,y:t}),jo={left:"right",right:"left",bottom:"top",top:"bottom"},Ko={start:"end",end:"start"};function nn(t,e,n){return G(t,_t(e,n))}function Jt(t,e){return typeof t=="function"?t(e):t}function Tt(t){return t.split("-")[0]}function Qt(t){return t.split("-")[1]}function ui(t){return t==="x"?"y":"x"}function vn(t){return t==="y"?"height":"width"}const Yo=new Set(["top","bottom"]);function yt(t){return Yo.has(Tt(t))?"y":"x"}function wn(t){return ui(yt(t))}function Xo(t,e,n){n===void 0&&(n=!1);const i=Qt(t),o=wn(t),r=vn(o);let a=o==="x"?i===(n?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(a=_e(a)),[a,_e(a)]}function Go(t){const e=_e(t);return[on(t),e,on(e)]}function on(t){return t.replace(/start|end/g,e=>Ko[e])}const zn=["left","right"],Pn=["right","left"],Zo=["top","bottom"],Jo=["bottom","top"];function Qo(t,e,n){switch(t){case"top":case"bottom":return n?e?Pn:zn:e?zn:Pn;case"left":case"right":return e?Zo:Jo;default:return[]}}function tr(t,e,n,i){const o=Qt(t);let r=Qo(Tt(t),n==="start",i);return o&&(r=r.map(a=>a+"-"+o),e&&(r=r.concat(r.map(on)))),r}function _e(t){return t.replace(/left|right|bottom|top/g,e=>jo[e])}function er(t){return{top:0,right:0,bottom:0,left:0,...t}}function di(t){return typeof t!="number"?er(t):{top:t,right:t,bottom:t,left:t}}function Te(t){const{x:e,y:n,width:i,height:o}=t;return{width:i,height:o,top:n,left:e,right:e+i,bottom:n+o,x:e,y:n}}function Bn(t,e,n){let{reference:i,floating:o}=t;const r=yt(e),a=wn(e),h=vn(a),c=Tt(e),u=r==="y",d=i.x+i.width/2-o.width/2,p=i.y+i.height/2-o.height/2,m=i[h]/2-o[h]/2;let f;switch(c){case"top":f={x:d,y:i.y-o.height};break;case"bottom":f={x:d,y:i.y+i.height};break;case"right":f={x:i.x+i.width,y:p};break;case"left":f={x:i.x-o.width,y:p};break;default:f={x:i.x,y:i.y}}switch(Qt(e)){case"start":f[a]-=m*(n&&u?-1:1);break;case"end":f[a]+=m*(n&&u?-1:1);break}return f}const nr=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:r=[],platform:a}=n,h=r.filter(Boolean),c=await(a.isRTL==null?void 0:a.isRTL(e));let u=await a.getElementRects({reference:t,floating:e,strategy:o}),{x:d,y:p}=Bn(u,i,c),m=i,f={},b=0;for(let v=0;v<h.length;v++){const{name:C,fn:x}=h[v],{x:S,y:V,data:F,reset:D}=await x({x:d,y:p,initialPlacement:i,placement:m,strategy:o,middlewareData:f,rects:u,platform:a,elements:{reference:t,floating:e}});d=S??d,p=V??p,f={...f,[C]:{...f[C],...F}},D&&b<=50&&(b++,typeof D=="object"&&(D.placement&&(m=D.placement),D.rects&&(u=D.rects===!0?await a.getElementRects({reference:t,floating:e,strategy:o}):D.rects),{x:d,y:p}=Bn(u,m,c)),v=-1)}return{x:d,y:p,placement:m,strategy:o,middlewareData:f}};async function yn(t,e){var n;e===void 0&&(e={});const{x:i,y:o,platform:r,rects:a,elements:h,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:m=!1,padding:f=0}=Jt(e,t),b=di(f),C=h[m?p==="floating"?"reference":"floating":p],x=Te(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(C)))==null||n?C:C.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(h.floating)),boundary:u,rootBoundary:d,strategy:c})),S=p==="floating"?{x:i,y:o,width:a.floating.width,height:a.floating.height}:a.reference,V=await(r.getOffsetParent==null?void 0:r.getOffsetParent(h.floating)),F=await(r.isElement==null?void 0:r.isElement(V))?await(r.getScale==null?void 0:r.getScale(V))||{x:1,y:1}:{x:1,y:1},D=Te(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:h,rect:S,offsetParent:V,strategy:c}):S);return{top:(x.top-D.top+b.top)/F.y,bottom:(D.bottom-x.bottom+b.bottom)/F.y,left:(x.left-D.left+b.left)/F.x,right:(D.right-x.right+b.right)/F.x}}const ir=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:i,placement:o,rects:r,platform:a,elements:h,middlewareData:c}=e,{element:u,padding:d=0}=Jt(t,e)||{};if(u==null)return{};const p=di(d),m={x:n,y:i},f=wn(o),b=vn(f),v=await a.getDimensions(u),C=f==="y",x=C?"top":"left",S=C?"bottom":"right",V=C?"clientHeight":"clientWidth",F=r.reference[b]+r.reference[f]-m[f]-r.floating[b],D=m[f]-r.reference[f],nt=await(a.getOffsetParent==null?void 0:a.getOffsetParent(u));let N=nt?nt[V]:0;(!N||!await(a.isElement==null?void 0:a.isElement(nt)))&&(N=h.floating[V]||r.floating[b]);const mt=F/2-D/2,ht=N/2-v[b]/2-1,tt=_t(p[x],ht),$t=_t(p[S],ht),ct=tt,kt=N-v[b]-$t,j=N/2-v[b]/2+mt,Rt=nn(ct,j,kt),bt=!c.arrow&&Qt(o)!=null&&j!==Rt&&r.reference[b]/2-(j<ct?tt:$t)-v[b]/2<0,it=bt?j<ct?j-ct:j-kt:0;return{[f]:m[f]+it,data:{[f]:Rt,centerOffset:j-Rt-it,...bt&&{alignmentOffset:it}},reset:bt}}}),or=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,i;const{placement:o,middlewareData:r,rects:a,initialPlacement:h,platform:c,elements:u}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=!0,...C}=Jt(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};const x=Tt(o),S=yt(h),V=Tt(h)===h,F=await(c.isRTL==null?void 0:c.isRTL(u.floating)),D=m||(V||!v?[_e(h)]:Go(h)),nt=b!=="none";!m&&nt&&D.push(...tr(h,v,b,F));const N=[h,...D],mt=await yn(e,C),ht=[];let tt=((i=r.flip)==null?void 0:i.overflows)||[];if(d&&ht.push(mt[x]),p){const j=Xo(o,a,F);ht.push(mt[j[0]],mt[j[1]])}if(tt=[...tt,{placement:o,overflows:ht}],!ht.every(j=>j<=0)){var $t,ct;const j=((($t=r.flip)==null?void 0:$t.index)||0)+1,Rt=N[j];if(Rt&&(!(p==="alignment"?S!==yt(Rt):!1)||tt.every(ot=>yt(ot.placement)===S?ot.overflows[0]>0:!0)))return{data:{index:j,overflows:tt},reset:{placement:Rt}};let bt=(ct=tt.filter(it=>it.overflows[0]<=0).sort((it,ot)=>it.overflows[1]-ot.overflows[1])[0])==null?void 0:ct.placement;if(!bt)switch(f){case"bestFit":{var kt;const it=(kt=tt.filter(ot=>{if(nt){const Ct=yt(ot.placement);return Ct===S||Ct==="y"}return!0}).map(ot=>[ot.placement,ot.overflows.filter(Ct=>Ct>0).reduce((Ct,Ti)=>Ct+Ti,0)]).sort((ot,Ct)=>ot[1]-Ct[1])[0])==null?void 0:kt[0];it&&(bt=it);break}case"initialPlacement":bt=h;break}if(o!==bt)return{reset:{placement:bt}}}return{}}}},rr=new Set(["left","top"]);async function ar(t,e){const{placement:n,platform:i,elements:o}=t,r=await(i.isRTL==null?void 0:i.isRTL(o.floating)),a=Tt(n),h=Qt(n),c=yt(n)==="y",u=rr.has(a)?-1:1,d=r&&c?-1:1,p=Jt(e,t);let{mainAxis:m,crossAxis:f,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return h&&typeof b=="number"&&(f=h==="end"?b*-1:b),c?{x:f*d,y:m*u}:{x:m*u,y:f*d}}const sr=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,i;const{x:o,y:r,placement:a,middlewareData:h}=e,c=await ar(e,t);return a===((n=h.offset)==null?void 0:n.placement)&&(i=h.arrow)!=null&&i.alignmentOffset?{}:{x:o+c.x,y:r+c.y,data:{...c,placement:a}}}}},lr=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:i,placement:o}=e,{mainAxis:r=!0,crossAxis:a=!1,limiter:h={fn:C=>{let{x,y:S}=C;return{x,y:S}}},...c}=Jt(t,e),u={x:n,y:i},d=await yn(e,c),p=yt(Tt(o)),m=ui(p);let f=u[m],b=u[p];if(r){const C=m==="y"?"top":"left",x=m==="y"?"bottom":"right",S=f+d[C],V=f-d[x];f=nn(S,f,V)}if(a){const C=p==="y"?"top":"left",x=p==="y"?"bottom":"right",S=b+d[C],V=b-d[x];b=nn(S,b,V)}const v=h.fn({...e,[m]:f,[p]:b});return{...v,data:{x:v.x-n,y:v.y-i,enabled:{[m]:r,[p]:a}}}}}},hr=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,i;const{placement:o,rects:r,platform:a,elements:h}=e,{apply:c=()=>{},...u}=Jt(t,e),d=await yn(e,u),p=Tt(o),m=Qt(o),f=yt(o)==="y",{width:b,height:v}=r.floating;let C,x;p==="top"||p==="bottom"?(C=p,x=m===(await(a.isRTL==null?void 0:a.isRTL(h.floating))?"start":"end")?"left":"right"):(x=p,C=m==="end"?"top":"bottom");const S=v-d.top-d.bottom,V=b-d.left-d.right,F=_t(v-d[C],S),D=_t(b-d[x],V),nt=!e.middlewareData.shift;let N=F,mt=D;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(mt=V),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(N=S),nt&&!m){const tt=G(d.left,0),$t=G(d.right,0),ct=G(d.top,0),kt=G(d.bottom,0);f?mt=b-2*(tt!==0||$t!==0?tt+$t:G(d.left,d.right)):N=v-2*(ct!==0||kt!==0?ct+kt:G(d.top,d.bottom))}await c({...e,availableWidth:mt,availableHeight:N});const ht=await a.getDimensions(h.floating);return b!==ht.width||v!==ht.height?{reset:{rects:!0}}:{}}}};function Me(){return typeof window<"u"}function te(t){return pi(t)?(t.nodeName||"").toLowerCase():"#document"}function J(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function ft(t){var e;return(e=(pi(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function pi(t){return Me()?t instanceof Node||t instanceof J(t).Node:!1}function rt(t){return Me()?t instanceof Element||t instanceof J(t).Element:!1}function dt(t){return Me()?t instanceof HTMLElement||t instanceof J(t).HTMLElement:!1}function In(t){return!Me()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof J(t).ShadowRoot}const cr=new Set(["inline","contents"]);function de(t){const{overflow:e,overflowX:n,overflowY:i,display:o}=at(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!cr.has(o)}const ur=new Set(["table","td","th"]);function dr(t){return ur.has(te(t))}const pr=[":popover-open",":modal"];function ze(t){return pr.some(e=>{try{return t.matches(e)}catch{return!1}})}const fr=["transform","translate","scale","rotate","perspective"],mr=["transform","translate","scale","rotate","perspective","filter"],br=["paint","layout","strict","content"];function Pe(t){const e=xn(),n=rt(t)?at(t):t;return fr.some(i=>n[i]?n[i]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||mr.some(i=>(n.willChange||"").includes(i))||br.some(i=>(n.contain||"").includes(i))}function gr(t){let e=Lt(t);for(;dt(e)&&!jt(e);){if(Pe(e))return e;if(ze(e))return null;e=Lt(e)}return null}function xn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const vr=new Set(["html","body","#document"]);function jt(t){return vr.has(te(t))}function at(t){return J(t).getComputedStyle(t)}function Be(t){return rt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Lt(t){if(te(t)==="html")return t;const e=t.assignedSlot||t.parentNode||In(t)&&t.host||ft(t);return In(e)?e.host:e}function fi(t){const e=Lt(t);return jt(e)?t.ownerDocument?t.ownerDocument.body:t.body:dt(e)&&de(e)?e:fi(e)}function Kt(t,e,n){var i;e===void 0&&(e=[]),n===void 0&&(n=!0);const o=fi(t),r=o===((i=t.ownerDocument)==null?void 0:i.body),a=J(o);if(r){const h=rn(a);return e.concat(a,a.visualViewport||[],de(o)?o:[],h&&n?Kt(h):[])}return e.concat(o,Kt(o,[],n))}function rn(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function mi(t){const e=at(t);let n=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const o=dt(t),r=o?t.offsetWidth:n,a=o?t.offsetHeight:i,h=Ae(n)!==r||Ae(i)!==a;return h&&(n=r,i=a),{width:n,height:i,$:h}}function $n(t){return rt(t)?t:t.contextElement}function Nt(t){const e=$n(t);if(!dt(e))return ut(1);const n=e.getBoundingClientRect(),{width:i,height:o,$:r}=mi(e);let a=(r?Ae(n.width):n.width)/i,h=(r?Ae(n.height):n.height)/o;return(!a||!Number.isFinite(a))&&(a=1),(!h||!Number.isFinite(h))&&(h=1),{x:a,y:h}}const wr=ut(0);function bi(t){const e=J(t);return!xn()||!e.visualViewport?wr:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function yr(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==J(t)?!1:e}function It(t,e,n,i){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),r=$n(t);let a=ut(1);e&&(i?rt(i)&&(a=Nt(i)):a=Nt(t));const h=yr(r,n,i)?bi(r):ut(0);let c=(o.left+h.x)/a.x,u=(o.top+h.y)/a.y,d=o.width/a.x,p=o.height/a.y;if(r){const m=J(r),f=i&&rt(i)?J(i):i;let b=m,v=rn(b);for(;v&&i&&f!==b;){const C=Nt(v),x=v.getBoundingClientRect(),S=at(v),V=x.left+(v.clientLeft+parseFloat(S.paddingLeft))*C.x,F=x.top+(v.clientTop+parseFloat(S.paddingTop))*C.y;c*=C.x,u*=C.y,d*=C.x,p*=C.y,c+=V,u+=F,b=J(v),v=rn(b)}}return Te({width:d,height:p,x:c,y:u})}function Ie(t,e){const n=Be(t).scrollLeft;return e?e.left+n:It(ft(t)).left+n}function gi(t,e){const n=t.getBoundingClientRect(),i=n.left+e.scrollLeft-Ie(t,n),o=n.top+e.scrollTop;return{x:i,y:o}}function xr(t){let{elements:e,rect:n,offsetParent:i,strategy:o}=t;const r=o==="fixed",a=ft(i),h=e?ze(e.floating):!1;if(i===a||h&&r)return n;let c={scrollLeft:0,scrollTop:0},u=ut(1);const d=ut(0),p=dt(i);if((p||!p&&!r)&&((te(i)!=="body"||de(a))&&(c=Be(i)),dt(i))){const f=It(i);u=Nt(i),d.x=f.x+i.clientLeft,d.y=f.y+i.clientTop}const m=a&&!p&&!r?gi(a,c):ut(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+d.x+m.x,y:n.y*u.y-c.scrollTop*u.y+d.y+m.y}}function $r(t){return Array.from(t.getClientRects())}function kr(t){const e=ft(t),n=Be(t),i=t.ownerDocument.body,o=G(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),r=G(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let a=-n.scrollLeft+Ie(t);const h=-n.scrollTop;return at(i).direction==="rtl"&&(a+=G(e.clientWidth,i.clientWidth)-o),{width:o,height:r,x:a,y:h}}const Fn=25;function Cr(t,e){const n=J(t),i=ft(t),o=n.visualViewport;let r=i.clientWidth,a=i.clientHeight,h=0,c=0;if(o){r=o.width,a=o.height;const d=xn();(!d||d&&e==="fixed")&&(h=o.offsetLeft,c=o.offsetTop)}const u=Ie(i);if(u<=0){const d=i.ownerDocument,p=d.body,m=getComputedStyle(p),f=d.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,b=Math.abs(i.clientWidth-p.clientWidth-f);b<=Fn&&(r-=b)}else u<=Fn&&(r+=u);return{width:r,height:a,x:h,y:c}}const Er=new Set(["absolute","fixed"]);function Sr(t,e){const n=It(t,!0,e==="fixed"),i=n.top+t.clientTop,o=n.left+t.clientLeft,r=dt(t)?Nt(t):ut(1),a=t.clientWidth*r.x,h=t.clientHeight*r.y,c=o*r.x,u=i*r.y;return{width:a,height:h,x:c,y:u}}function Hn(t,e,n){let i;if(e==="viewport")i=Cr(t,n);else if(e==="document")i=kr(ft(t));else if(rt(e))i=Sr(e,n);else{const o=bi(t);i={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return Te(i)}function vi(t,e){const n=Lt(t);return n===e||!rt(n)||jt(n)?!1:at(n).position==="fixed"||vi(n,e)}function Ar(t,e){const n=e.get(t);if(n)return n;let i=Kt(t,[],!1).filter(h=>rt(h)&&te(h)!=="body"),o=null;const r=at(t).position==="fixed";let a=r?Lt(t):t;for(;rt(a)&&!jt(a);){const h=at(a),c=Pe(a);!c&&h.position==="fixed"&&(o=null),(r?!c&&!o:!c&&h.position==="static"&&!!o&&Er.has(o.position)||de(a)&&!c&&vi(t,a))?i=i.filter(d=>d!==a):o=h,a=Lt(a)}return e.set(t,i),i}function _r(t){let{element:e,boundary:n,rootBoundary:i,strategy:o}=t;const a=[...n==="clippingAncestors"?ze(e)?[]:Ar(e,this._c):[].concat(n),i],h=a[0],c=a.reduce((u,d)=>{const p=Hn(e,d,o);return u.top=G(p.top,u.top),u.right=_t(p.right,u.right),u.bottom=_t(p.bottom,u.bottom),u.left=G(p.left,u.left),u},Hn(e,h,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Tr(t){const{width:e,height:n}=mi(t);return{width:e,height:n}}function Lr(t,e,n){const i=dt(e),o=ft(e),r=n==="fixed",a=It(t,!0,r,e);let h={scrollLeft:0,scrollTop:0};const c=ut(0);function u(){c.x=Ie(o)}if(i||!i&&!r)if((te(e)!=="body"||de(o))&&(h=Be(e)),i){const f=It(e,!0,r,e);c.x=f.x+e.clientLeft,c.y=f.y+e.clientTop}else o&&u();r&&!i&&o&&u();const d=o&&!i&&!r?gi(o,h):ut(0),p=a.left+h.scrollLeft-c.x-d.x,m=a.top+h.scrollTop-c.y-d.y;return{x:p,y:m,width:a.width,height:a.height}}function je(t){return at(t).position==="static"}function qn(t,e){if(!dt(t)||at(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return ft(t)===n&&(n=n.ownerDocument.body),n}function wi(t,e){const n=J(t);if(ze(t))return n;if(!dt(t)){let o=Lt(t);for(;o&&!jt(o);){if(rt(o)&&!je(o))return o;o=Lt(o)}return n}let i=qn(t,e);for(;i&&dr(i)&&je(i);)i=qn(i,e);return i&&jt(i)&&je(i)&&!Pe(i)?n:i||gr(t)||n}const Vr=async function(t){const e=this.getOffsetParent||wi,n=this.getDimensions,i=await n(t.floating);return{reference:Lr(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function Rr(t){return at(t).direction==="rtl"}const $e={convertOffsetParentRelativeRectToViewportRelativeRect:xr,getDocumentElement:ft,getClippingRect:_r,getOffsetParent:wi,getElementRects:Vr,getClientRects:$r,getDimensions:Tr,getScale:Nt,isElement:rt,isRTL:Rr};function yi(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Or(t,e){let n=null,i;const o=ft(t);function r(){var h;clearTimeout(i),(h=n)==null||h.disconnect(),n=null}function a(h,c){h===void 0&&(h=!1),c===void 0&&(c=1),r();const u=t.getBoundingClientRect(),{left:d,top:p,width:m,height:f}=u;if(h||e(),!m||!f)return;const b=fe(p),v=fe(o.clientWidth-(d+m)),C=fe(o.clientHeight-(p+f)),x=fe(d),V={rootMargin:-b+"px "+-v+"px "+-C+"px "+-x+"px",threshold:G(0,_t(1,c))||1};let F=!0;function D(nt){const N=nt[0].intersectionRatio;if(N!==c){if(!F)return a();N?a(!1,N):i=setTimeout(()=>{a(!1,1e-7)},1e3)}N===1&&!yi(u,t.getBoundingClientRect())&&a(),F=!1}try{n=new IntersectionObserver(D,{...V,root:o.ownerDocument})}catch{n=new IntersectionObserver(D,V)}n.observe(t)}return a(!0),r}function Dr(t,e,n,i){i===void 0&&(i={});const{ancestorScroll:o=!0,ancestorResize:r=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:h=typeof IntersectionObserver=="function",animationFrame:c=!1}=i,u=$n(t),d=o||r?[...u?Kt(u):[],...Kt(e)]:[];d.forEach(x=>{o&&x.addEventListener("scroll",n,{passive:!0}),r&&x.addEventListener("resize",n)});const p=u&&h?Or(u,n):null;let m=-1,f=null;a&&(f=new ResizeObserver(x=>{let[S]=x;S&&S.target===u&&f&&(f.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var V;(V=f)==null||V.observe(e)})),n()}),u&&!c&&f.observe(u),f.observe(e));let b,v=c?It(t):null;c&&C();function C(){const x=It(t);v&&!yi(v,x)&&n(),v=x,b=requestAnimationFrame(C)}return n(),()=>{var x;d.forEach(S=>{o&&S.removeEventListener("scroll",n),r&&S.removeEventListener("resize",n)}),p?.(),(x=f)==null||x.disconnect(),f=null,c&&cancelAnimationFrame(b)}}const Mr=sr,zr=lr,Pr=or,Nn=hr,Br=ir,Ir=(t,e,n)=>{const i=new Map,o={platform:$e,...n},r={...o.platform,_c:i};return nr(t,e,{...o,platform:r})};function Fr(t){return Hr(t)}function Ke(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Hr(t){for(let e=t;e;e=Ke(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Ke(t);e;e=Ke(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||Pe(n)||e.tagName==="BODY"))return e}return null}var qr=`:host {
  --arrow-color: black;
  --arrow-size: var(--wa-tooltip-arrow-size);
  --show-duration: 100ms;
  --hide-duration: 100ms;

  /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
  --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
  --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

  display: contents;
}

.popup {
  position: absolute;
  isolation: isolate;
  max-width: var(--auto-size-available-width, none);
  max-height: var(--auto-size-available-height, none);

  /* Clear UA styles for [popover] */
  :where(&) {
    inset: unset;
    padding: unset;
    margin: unset;
    width: unset;
    height: unset;
    color: unset;
    background: unset;
    border: unset;
    overflow: unset;
  }
}

.popup-fixed {
  position: fixed;
}

.popup:not(.popup-active) {
  display: none;
}

.arrow {
  position: absolute;
  width: calc(var(--arrow-size-diagonal) * 2);
  height: calc(var(--arrow-size-diagonal) * 2);
  rotate: 45deg;
  background: var(--arrow-color);
  z-index: 3;
}

:host([data-current-placement~='left']) .arrow {
  rotate: -45deg;
}

:host([data-current-placement~='right']) .arrow {
  rotate: 135deg;
}

:host([data-current-placement~='bottom']) .arrow {
  rotate: 225deg;
}

/* Hover bridge */
.popup-hover-bridge:not(.popup-hover-bridge-visible) {
  display: none;
}

.popup-hover-bridge {
  position: fixed;
  z-index: 899;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  clip-path: polygon(
    var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
    var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
    var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
    var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
  );
}

/* Built-in animations */
.show {
  animation: show var(--show-duration) ease;
}

.hide {
  animation: show var(--hide-duration) ease reverse;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.show-with-scale {
  animation: show-with-scale var(--show-duration) ease;
}

.hide-with-scale {
  animation: show-with-scale var(--hide-duration) ease reverse;
}

@keyframes show-with-scale {
  from {
    opacity: 0;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
`;function Un(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var me=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),T=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),n=this.placement.includes("top")||this.placement.includes("bottom");let i=0,o=0,r=0,a=0,h=0,c=0,u=0,d=0;n?t.top<e.top?(i=t.left,o=t.bottom,r=t.right,a=t.bottom,h=e.left,c=e.top,u=e.right,d=e.top):(i=e.left,o=e.bottom,r=e.right,a=e.bottom,h=t.left,c=t.top,u=t.right,d=t.top):t.left<e.left?(i=t.right,o=t.top,r=e.left,a=e.top,h=t.right,c=t.bottom,u=e.left,d=e.bottom):(i=e.right,o=e.top,r=t.left,a=t.top,h=e.right,c=e.bottom,u=t.left,d=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${d}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Un(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=Dr(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Mr({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Nn({apply:({rects:i})=>{const o=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=r?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;me&&!Un(this.anchor)&&this.boundary==="scroll"&&(e=Kt(this.anchorEl).filter(i=>i instanceof Element)),this.flip&&t.push(Pr({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(zr({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(Nn({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Br({element:this.arrowEl,padding:this.arrowPadding}));const n=me?i=>$e.getOffsetParent(i,Fr):$e.getOffsetParent;Ir(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:me?"absolute":"fixed",platform:{...$e,getOffsetParent:n}}).then(({x:i,y:o,middlewareData:r,placement:a})=>{const h=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[a.split("-")[0]];if(this.setAttribute("data-current-placement",a),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){const u=r.arrow.x,d=r.arrow.y;let p="",m="",f="",b="";if(this.arrowPlacement==="start"){const v=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",m=h?v:"",b=h?"":v}else if(this.arrowPlacement==="end"){const v=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=h?"":v,b=h?v:"",f=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(b=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(b=typeof u=="number"?`${u}px`:"",p=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:p,right:m,bottom:f,left:b,[c]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Wo)}render(){return g`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${B({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${B({popup:!0,"popup-active":this.active,"popup-fixed":!me,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?g`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};T.css=qr;s([E(".popup")],T.prototype,"popup",2);s([E(".arrow")],T.prototype,"arrowEl",2);s([l()],T.prototype,"anchor",2);s([l({type:Boolean,reflect:!0})],T.prototype,"active",2);s([l({reflect:!0})],T.prototype,"placement",2);s([l()],T.prototype,"boundary",2);s([l({type:Number})],T.prototype,"distance",2);s([l({type:Number})],T.prototype,"skidding",2);s([l({type:Boolean})],T.prototype,"arrow",2);s([l({attribute:"arrow-placement"})],T.prototype,"arrowPlacement",2);s([l({attribute:"arrow-padding",type:Number})],T.prototype,"arrowPadding",2);s([l({type:Boolean})],T.prototype,"flip",2);s([l({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],T.prototype,"flipFallbackPlacements",2);s([l({attribute:"flip-fallback-strategy"})],T.prototype,"flipFallbackStrategy",2);s([l({type:Object})],T.prototype,"flipBoundary",2);s([l({attribute:"flip-padding",type:Number})],T.prototype,"flipPadding",2);s([l({type:Boolean})],T.prototype,"shift",2);s([l({type:Object})],T.prototype,"shiftBoundary",2);s([l({attribute:"shift-padding",type:Number})],T.prototype,"shiftPadding",2);s([l({attribute:"auto-size"})],T.prototype,"autoSize",2);s([l()],T.prototype,"sync",2);s([l({type:Object})],T.prototype,"autoSizeBoundary",2);s([l({attribute:"auto-size-padding",type:Number})],T.prototype,"autoSizePadding",2);s([l({attribute:"hover-bridge",type:Boolean})],T.prototype,"hoverBridge",2);T=s([H("wa-popup")],T);var xi=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},$i=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},ki=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},Ci=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};function Yt(t,e){return new Promise(n=>{function i(o){o.target===t&&(t.removeEventListener(e,i),n())}t.addEventListener(e,i)})}function Xt(t,e){return new Promise(n=>{const i=new AbortController,{signal:o}=i;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let r=()=>{t.classList.remove(e),n(),i.abort()};t.addEventListener("animationend",r,{once:!0,signal:o}),t.addEventListener("animationcancel",r,{once:!0,signal:o})})}var Nr=`:host {
  --max-width: 30ch;

  /** These styles are added so we don't interfere in the DOM. */
  display: inline-block;
  position: absolute;

  /** Defaults for inherited CSS properties */
  color: var(--wa-tooltip-content-color);
  font-size: var(--wa-tooltip-font-size);
  line-height: var(--wa-tooltip-line-height);
  text-align: start;
  white-space: normal;
}

.tooltip {
  --arrow-size: var(--wa-tooltip-arrow-size);
  --arrow-color: var(--wa-tooltip-background-color);
}

.tooltip::part(popup) {
  z-index: 1000;
}

.tooltip[placement^='top']::part(popup) {
  transform-origin: bottom;
}

.tooltip[placement^='bottom']::part(popup) {
  transform-origin: top;
}

.tooltip[placement^='left']::part(popup) {
  transform-origin: right;
}

.tooltip[placement^='right']::part(popup) {
  transform-origin: left;
}

.body {
  display: block;
  width: max-content;
  max-width: var(--max-width);
  border-radius: var(--wa-tooltip-border-radius);
  background-color: var(--wa-tooltip-background-color);
  border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  padding: 0.25em 0.5em;
  user-select: none;
  -webkit-user-select: none;
}

.tooltip::part(arrow) {
  border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
}
`,P=class extends U{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),this.hideDelay))}}connectedCallback(){super.connectedCallback(),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=No("wa-tooltip-"))}disconnectedCallback(){if(super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor){const t=this.anchor.getAttribute("aria-labelledby")||"";this.anchor.setAttribute("aria-labelledby",t.replace(this.id,""))}}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){if(this.open){if(this.disabled)return;const t=new Ci;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await Xt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new $i)}else{const t=new ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await Xt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new xi)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.querySelector(`#${this.for}`):null,n=this.anchor;if(e===n)return;const{signal:i}=this.eventController,o=new RegExp(`\\b${this.id}\\b`);if(e){const r=e.getAttribute("aria-labelledby")||"";r.match(o)||e.setAttribute("aria-labelledby",r+" "+this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:i}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:i}),e.addEventListener("click",this.handleClick,{signal:i}),e.addEventListener("mouseover",this.handleMouseOver,{signal:i}),e.addEventListener("mouseout",this.handleMouseOut,{signal:i})}if(n){const r=n.getAttribute("aria-labelledby")||"";n.setAttribute("aria-labelledby",r.replace(o,"")),n.removeEventListener("blur",this.handleBlur,{capture:!0}),n.removeEventListener("focus",this.handleFocus,{capture:!0}),n.removeEventListener("click",this.handleClick),n.removeEventListener("mouseover",this.handleMouseOver),n.removeEventListener("mouseout",this.handleMouseOut)}this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Yt(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Yt(this,"wa-after-hide")}render(){return g`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${B({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};P.css=Nr;P.dependencies={"wa-popup":T};s([E("slot:not([name])")],P.prototype,"defaultSlot",2);s([E(".body")],P.prototype,"body",2);s([E("wa-popup")],P.prototype,"popup",2);s([l()],P.prototype,"placement",2);s([l({type:Boolean,reflect:!0})],P.prototype,"disabled",2);s([l({type:Number})],P.prototype,"distance",2);s([l({type:Boolean,reflect:!0})],P.prototype,"open",2);s([l({type:Number})],P.prototype,"skidding",2);s([l({attribute:"show-delay",type:Number})],P.prototype,"showDelay",2);s([l({attribute:"hide-delay",type:Number})],P.prototype,"hideDelay",2);s([l()],P.prototype,"trigger",2);s([l({attribute:"without-arrow",type:Boolean,reflect:!0})],P.prototype,"withoutArrow",2);s([l()],P.prototype,"for",2);s([R()],P.prototype,"anchor",2);s([O("open",{waitUntilFirstUpdate:!0})],P.prototype,"handleOpenChange",1);s([O("for")],P.prototype,"handleForChange",1);s([O(["distance","placement","skidding"])],P.prototype,"handleOptionsChange",1);s([O("disabled")],P.prototype,"handleDisabledChange",1);P=s([H("wa-tooltip")],P);var Ei=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};function Si(t,e){const n=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!n&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&Ur(e)})}function Ur(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const n=[...e.elements];if(n.length===1){e.requestSubmit(null);return}const i=n.find(o=>o.type==="submit"&&!o.matches(":disabled"));i&&(["input","button"].includes(i.localName)?e.requestSubmit(i):i.click())}var Wr=`:host {
  border-width: 0;
}

.text-field {
  flex: auto;
  display: flex;
  align-items: stretch;
  justify-content: start;
  position: relative;
  transition: inherit;
  height: var(--wa-form-control-height);
  border-color: var(--wa-form-control-border-color);
  border-radius: var(--wa-form-control-border-radius);
  border-style: var(--wa-form-control-border-style);
  border-width: var(--wa-form-control-border-width);
  cursor: text;
  color: var(--wa-form-control-value-color);
  font-size: var(--wa-form-control-value-font-size);
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  vertical-align: middle;
  width: 100%;
  transition:
    background-color var(--wa-transition-normal),
    border var(--wa-transition-normal),
    outline var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);
  background-color: var(--wa-form-control-background-color);
  box-shadow: var(--box-shadow);
  padding: 0 var(--wa-form-control-padding-inline);

  &:focus-within {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Style disabled inputs */
  &:has(:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

/* Appearance modifiers */
:host([appearance~='outlined']) .text-field {
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
}

:host([appearance~='filled']) .text-field {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-color-neutral-fill-quiet);
}

:host([appearance~='filled'][appearance~='outlined']) .text-field {
  border-color: var(--wa-form-control-border-color);
}

:host([pill]) .text-field {
  border-radius: var(--wa-border-radius-pill) !important;
}

.text-field input,
.text-field textarea {
  /*
    Fixes an alignment issue with placeholders.
    https://github.com/shoelace-style/webawesome/issues/342
  */
  height: 100%;

  padding: 0;
  border: none;
  outline: none;
  box-shadow: none;
  margin: 0;
  cursor: inherit;
  -webkit-appearance: none;
  font: inherit;
}

input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  transition: inherit;

  /* prettier-ignore */
  background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
  height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
  padding-block: 0;
  color: inherit;

  &:autofill {
    &,
    &:hover,
    &:focus,
    &:active {
      box-shadow: none;
      caret-color: var(--wa-form-control-value-color);
    }
  }

  &::placeholder {
    color: var(--wa-form-control-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }
}

textarea {
  &:autofill {
    &,
    &:hover,
    &:focus,
    &:active {
      box-shadow: none;
      caret-color: var(--wa-form-control-value-color);
    }
  }

  &::placeholder {
    color: var(--wa-form-control-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }
}

.start,
.end {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  cursor: default;

  &::slotted(wa-icon) {
    color: var(--wa-color-neutral-on-quiet);
  }
}

.start::slotted(*) {
  margin-inline-end: var(--wa-form-control-padding-inline);
}

.end::slotted(*) {
  margin-inline-start: var(--wa-form-control-padding-inline);
}

/*
 * Clearable + Password Toggle
 */

.clear,
.password-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  color: var(--wa-color-neutral-on-quiet);
  border: none;
  background: none;
  padding: 0;
  transition: var(--wa-transition-normal) color;
  cursor: pointer;
  margin-inline-start: var(--wa-form-control-padding-inline);

  @media (hover: hover) {
    &:hover {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  &:active {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  &:focus {
    outline: none;
  }
}

/* Don't show the browser's password toggle in Edge */
::-ms-reveal {
  display: none;
}

/* Hide the built-in number spinner */
:host([without-spin-buttons]) input[type='number'] {
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }
}
`,y=class extends W{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Zt(this,"hint","label"),this.localize=new lt(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.form=null,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Gn()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Ei),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){Si(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,n="none"){this.input.setSelectionRange(t,e,n)}setRangeText(t,e,n,i="preserve"){const o=e??this.input.selectionStart,r=n??this.input.selectionEnd;this.input.setRangeText(t,o,r,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,i=this.hint?!0:!!e,o=this.withClear&&!this.disabled&&!this.readonly,r=this.hasUpdated&&o&&(typeof this.value=="number"||this.value&&this.value.length>0);return g`
      <label part="form-control-label label" class="label" for="input" aria-hidden=${n?"false":"true"}>
        <slot name="label">${this.label}</slot>
      </label>

      <div part="input" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="base"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${_(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${_(this.placeholder)}
          minlength=${_(this.minlength)}
          maxlength=${_(this.maxlength)}
          min=${_(this.min)}
          max=${_(this.max)}
          step=${_(this.step)}
          .value=${en(this.value??"")}
          autocapitalize=${_(this.autocapitalize)}
          autocomplete=${_(this.autocomplete)}
          autocorrect=${_(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${_(this.pattern)}
          enterkeyhint=${_(this.enterkeyhint)}
          inputmode=${_(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${r?g`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?g`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?g`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:g`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${B({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};y.css=[Ft,ue,Wr];y.shadowRootOptions={...W.shadowRootOptions,delegatesFocus:!0};s([E("input")],y.prototype,"input",2);s([l()],y.prototype,"title",2);s([l({reflect:!0})],y.prototype,"type",2);s([R()],y.prototype,"value",1);s([l({attribute:"value",reflect:!0})],y.prototype,"defaultValue",2);s([l({reflect:!0})],y.prototype,"size",2);s([l({reflect:!0})],y.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],y.prototype,"pill",2);s([l()],y.prototype,"label",2);s([l({attribute:"hint"})],y.prototype,"hint",2);s([l({attribute:"with-clear",type:Boolean})],y.prototype,"withClear",2);s([l()],y.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],y.prototype,"readonly",2);s([l({attribute:"password-toggle",type:Boolean})],y.prototype,"passwordToggle",2);s([l({attribute:"password-visible",type:Boolean})],y.prototype,"passwordVisible",2);s([l({attribute:"without-spin-buttons",type:Boolean})],y.prototype,"withoutSpinButtons",2);s([l({reflect:!0})],y.prototype,"form",2);s([l({type:Boolean,reflect:!0})],y.prototype,"required",2);s([l()],y.prototype,"pattern",2);s([l({type:Number})],y.prototype,"minlength",2);s([l({type:Number})],y.prototype,"maxlength",2);s([l()],y.prototype,"min",2);s([l()],y.prototype,"max",2);s([l()],y.prototype,"step",2);s([l()],y.prototype,"autocapitalize",2);s([l()],y.prototype,"autocorrect",2);s([l()],y.prototype,"autocomplete",2);s([l({type:Boolean})],y.prototype,"autofocus",2);s([l()],y.prototype,"enterkeyhint",2);s([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],y.prototype,"spellcheck",2);s([l()],y.prototype,"inputmode",2);s([l({attribute:"with-label",type:Boolean})],y.prototype,"withLabel",2);s([l({attribute:"with-hint",type:Boolean})],y.prototype,"withHint",2);s([O("step",{waitUntilFirstUpdate:!0})],y.prototype,"handleStepChange",1);y=s([H("wa-input")],y);function Ye(t,e){function n(o){const r=t.getBoundingClientRect(),a=t.ownerDocument.defaultView,h=r.left+a.pageXOffset,c=r.top+a.pageYOffset,u=o.pageX-h,d=o.pageY-c;e?.onMove&&e.onMove(u,d)}function i(){document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",i),e?.onStop&&e.onStop()}document.addEventListener("pointermove",n,{passive:!0}),document.addEventListener("pointerup",i),e?.initialEvent instanceof PointerEvent&&n(e.initialEvent)}var vt=typeof window<"u"&&"ontouchstart"in window,be=class{constructor(t,e){this.isActive=!1,this.isDragging=!1,this.handleDragStart=n=>{const i=vt&&"touches"in n?n.touches[0].clientX:n.clientX,o=vt&&"touches"in n?n.touches[0].clientY:n.clientY;this.isDragging||!vt&&n.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),this.options.start(i,o))},this.handleDragStop=n=>{const i=vt&&"touches"in n?n.touches[0].clientX:n.clientX,o=vt&&"touches"in n?n.touches[0].clientY:n.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.options.stop(i,o)},this.handleDragMove=n=>{const i=vt&&"touches"in n?n.touches[0].clientX:n.clientX,o=vt&&"touches"in n?n.touches[0].clientY:n.clientY;window.getSelection()?.removeAllRanges(),this.options.move(i,o)},this.element=t,this.options={start:()=>{},stop:()=>{},move:()=>{},...e},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),vt&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.element.removeEventListener("pointerdown",this.handleDragStart),vt&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(t!==void 0?t:!this.isActive)?this.start():this.stop()}},jr=()=>{const t=Object.assign(document.createElement("input"),{type:"range",required:!0});return{observedAttributes:["required","min","max","step"],checkValidity(e){const n={message:"",isValid:!0,invalidKeys:[]},i=(o,r,a,h)=>{const c=document.createElement("input");return c.type="range",c.min=String(r),c.max=String(a),c.step=String(h),c.value=String(o),c.checkValidity(),c.validationMessage};if(e.required&&!e.hasInteracted)return n.isValid=!1,n.invalidKeys.push("valueMissing"),n.message=t.validationMessage||"Please fill out this field.",n;if(e.isRange){const o=e.minValue,r=e.maxValue;if(o<e.min)return n.isValid=!1,n.invalidKeys.push("rangeUnderflow"),n.message=i(o,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,n;if(r>e.max)return n.isValid=!1,n.invalidKeys.push("rangeOverflow"),n.message=i(r,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,n;if(e.step&&e.step!==1){const a=(o-e.min)%e.step!==0,h=(r-e.min)%e.step!==0;if(a||h){n.isValid=!1,n.invalidKeys.push("stepMismatch");const c=a?o:r;return n.message=i(c,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,n}}}else{const o=e.value;if(o<e.min)return n.isValid=!1,n.invalidKeys.push("rangeUnderflow"),n.message=i(o,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,n;if(o>e.max)return n.isValid=!1,n.invalidKeys.push("rangeOverflow"),n.message=i(o,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,n;if(e.step&&e.step!==1&&(o-e.min)%e.step!==0)return n.isValid=!1,n.invalidKeys.push("stepMismatch"),n.message=i(o,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,n}return n}}},Kr=`:host {
  --track-size: 0.5em;
  --thumb-width: 1.4em;
  --thumb-height: 1.4em;
  --marker-width: 0.1875em;
  --marker-height: 0.1875em;
}

:host([orientation='vertical']) {
  width: auto;
}

#label:has(~ .vertical) {
  display: block;
  order: 2;
  max-width: none;
  text-align: center;
}

#description:has(~ .vertical) {
  order: 3;
  text-align: center;
}

/* Add extra space between slider and label, when present */
#label:has(*:not(:empty)) ~ #slider {
  &.horizontal {
    margin-block-start: 0.5em;
  }
  &.vertical {
    margin-block-end: 0.5em;
  }
}

#slider {
  touch-action: none;

  &:focus {
    outline: none;
  }

  &:focus-visible:not(.disabled) #thumb,
  &:focus-visible:not(.disabled) #thumb-min,
  &:focus-visible:not(.disabled) #thumb-max {
    outline: var(--wa-focus-ring);
    /* intentionally no offset due to border */
  }
}

#track {
  position: relative;
  border-radius: 9999px;
  background: var(--wa-color-neutral-fill-normal);
  isolation: isolate;
}

/* Orientation */
.horizontal #track {
  height: var(--track-size);
}

.vertical #track {
  order: 1;
  width: var(--track-size);
  height: 200px;
}

/* Disabled */
.disabled #track {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Indicator */
#indicator {
  position: absolute;
  border-radius: inherit;
  background-color: var(--wa-form-control-activated-color);

  &:dir(ltr) {
    right: calc(100% - max(var(--start), var(--end)));
    left: min(var(--start), var(--end));
  }

  &:dir(rtl) {
    right: min(var(--start), var(--end));
    left: calc(100% - max(var(--start), var(--end)));
  }
}

.horizontal #indicator {
  top: 0;
  height: 100%;
}

.vertical #indicator {
  top: calc(100% - var(--end));
  bottom: var(--start);
  left: 0;
  width: 100%;
}

/* Thumbs */
#thumb,
#thumb-min,
#thumb-max {
  z-index: 3;
  position: absolute;
  width: var(--thumb-width);
  height: var(--thumb-height);
  border: solid 0.125em var(--wa-color-surface-default);
  border-radius: 50%;
  background-color: var(--wa-form-control-activated-color);
  cursor: pointer;
}

.disabled #thumb,
.disabled #thumb-min,
.disabled #thumb-max {
  cursor: inherit;
}

.horizontal #thumb,
.horizontal #thumb-min,
.horizontal #thumb-max {
  top: calc(50% - var(--thumb-height) / 2);

  &:dir(ltr) {
    right: auto;
    left: calc(var(--position) - var(--thumb-width) / 2);
  }

  &:dir(rtl) {
    right: calc(var(--position) - var(--thumb-width) / 2);
    left: auto;
  }
}

.vertical #thumb,
.vertical #thumb-min,
.vertical #thumb-max {
  bottom: calc(var(--position) - var(--thumb-height) / 2);
  left: calc(50% - var(--thumb-width) / 2);
}

/* Range-specific thumb styles */
:host([range]) {
  #thumb-min:focus-visible,
  #thumb-max:focus-visible {
    z-index: 4; /* Ensure focused thumb appears on top */
    outline: var(--wa-focus-ring);
    /* intentionally no offset due to border */
  }
}

/* Markers */
#markers {
  pointer-events: none;
}

.marker {
  z-index: 2;
  position: absolute;
  width: var(--marker-width);
  height: var(--marker-height);
  border-radius: 50%;
  background-color: var(--wa-color-surface-default);
}

.marker:first-of-type,
.marker:last-of-type {
  display: none;
}

.horizontal .marker {
  top: calc(50% - var(--marker-height) / 2);
  left: calc(var(--position) - var(--marker-width) / 2);
}

.vertical .marker {
  top: calc(var(--position) - var(--marker-height) / 2);
  left: calc(50% - var(--marker-width) / 2);
}

/* Marker labels */
#references {
  position: relative;

  slot {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  ::slotted(*) {
    color: var(--wa-color-text-quiet);
    font-size: 0.875em;
    line-height: 1;
  }
}

.horizontal {
  #references {
    margin-block-start: 0.5em;
  }
}

.vertical {
  display: flex;
  margin-inline: auto;

  #track {
    order: 1;
  }

  #references {
    order: 2;
    width: min-content;
    margin-inline-start: 0.75em;

    slot {
      flex-direction: column;
    }
  }
}

.vertical #references slot {
  flex-direction: column;
}
`,$=class extends W{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new Zt(this,"hint","label"),this.localize=new lt(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=this.defaultValue,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.form=null,this.min=0,this.max=100,this.step=1,this.required=!1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1}static get validators(){return[...super.validators,jr()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new be(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new be(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new be(this.track,{start:(t,e)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{const n=this.getValueFromCoordinates(t,e),i=Math.abs(n-this.minValue),o=Math.abs(n-this.maxValue);if(i===o)if(n>this.maxValue)this.activeThumb="max";else if(n<this.minValue)this.activeThumb="min";else{const r=this.localize.dir()==="rtl",a=this.orientation==="vertical",h=a?e:t,c=this.lastTrackPosition||h;this.lastTrackPosition=h;const u=h>c!==r&&!a||h<c&&a;this.activeThumb=u?"max":"min"}else this.activeThumb=i<=o?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,e,this.activeThumb),this.showRangeTooltips()},move:(t,e)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,e,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb==="min"?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new be(this.slider,{start:(t,e)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,e),this.showTooltip()},move:(t,e)=>{this.setValueFromCoordinates(t,e)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}updated(t){if(t.has("range")&&this.requestUpdate(),this.isRange?(t.has("minValue")||t.has("maxValue"))&&(this.minValue=L(this.minValue,this.min,this.maxValue),this.maxValue=L(this.maxValue,this.minValue,this.max),this.updateFormValue()):t.has("value")&&(this.value=L(this.value,this.min,this.max),this.setValue(String(this.value))),(t.has("min")||t.has("max"))&&(this.isRange?(this.minValue=L(this.minValue,this.min,this.max),this.maxValue=L(this.maxValue,this.min,this.max)):this.value=L(this.value,this.min,this.max)),t.has("disabled")&&this.customStates.set("disabled",this.disabled),t.has("disabled")||t.has("readonly")){const e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):this.value=parseFloat(this.getAttribute("value")??String(this.min)),this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){const e=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length;return t=Math.round(t/this.step)*this.step,t=L(t,this.min,this.max),parseFloat(t.toFixed(e))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,e){const n=this.localize.dir()==="rtl",i=this.orientation==="vertical",{top:o,right:r,bottom:a,left:h,height:c,width:u}=this.trackBoundingClientRect,d=i?e:t,p=i?{start:o,end:a,size:c}:{start:h,end:r,size:u},f=(i||n?p.end-d:d-p.start)/p.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*f)}handleBlur(){this.isRange?requestAnimationFrame(()=>{const t=this.shadowRoot?.activeElement;t===this.thumbMin||t===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){const e=t.target;this.isRange?(e===this.thumbMin?this.activeThumb="min":e===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){const e=this.localize.dir()==="rtl",n=t.target;if(this.disabled||this.readonly||this.isRange&&(n===this.thumbMin?this.activeThumb="min":n===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;const i=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value;let o=i;switch(t.key){case"ArrowUp":case(e?"ArrowLeft":"ArrowRight"):t.preventDefault(),o=this.clampAndRoundToStep(i+this.step);break;case"ArrowDown":case(e?"ArrowRight":"ArrowLeft"):t.preventDefault(),o=this.clampAndRoundToStep(i-this.step);break;case"Home":t.preventDefault(),o=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),o=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();const r=Math.max(i+(this.max-this.min)/10,i+this.step);o=this.clampAndRoundToStep(r);break;case"PageDown":t.preventDefault();const a=Math.min(i-(this.max-this.min)/10,i-this.step);o=this.clampAndRoundToStep(a);break;case"Enter":Si(t,this);return}o!==i&&(this.isRange?(this.activeThumb==="min"?o>this.maxValue?(this.maxValue=o,this.minValue=o):this.minValue=Math.max(this.min,o):o<this.minValue?(this.minValue=o,this.maxValue=o):this.maxValue=Math.min(this.max,o),this.updateFormValue()):this.value=L(o,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,e){const n=this.value;this.value=this.getValueFromCoordinates(t,e),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,e,n){const i=this.getValueFromCoordinates(t,e),o=n==="min"?this.minValue:this.maxValue;n==="min"?i>this.maxValue?(this.maxValue=i,this.minValue=i):this.minValue=Math.max(this.min,i):i<this.minValue?(this.minValue=i,this.maxValue=i):this.maxValue=Math.min(this.max,i),o!==(n==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){this.withTooltip&&this.tooltips.forEach(t=>{t.open=!0})}hideRangeTooltips(){this.withTooltip&&this.tooltips.forEach(t=>{t.open=!1})}updateFormValue(){if(this.isRange){const t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){const t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=L(t,this.min,this.maxValue),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){const t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=L(t,this.minValue,this.max),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("hint"),n=this.label?!0:!!t,i=this.hint?!0:!!e,o=this.hasSlotController.test("reference"),r=B({small:this.size==="small",medium:this.size==="medium",large:this.size==="large",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),a=[];if(this.withMarkers)for(let m=this.min;m<=this.max;m+=this.step)a.push(this.getPercentageFromValue(m));const h=g`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${B({vh:!n})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,c=g`
      <div
        id="hint"
        part="hint"
        class=${B({"has-slotted":i})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,u=this.withMarkers?g`
          <div id="markers" part="markers">
            ${a.map(m=>g`<span part="marker" class="marker" style="--position: ${m}%"></span>`)}
          </div>
        `:"",d=o?g`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",p=(m,f)=>this.withTooltip?g`
            <wa-tooltip
              id=${`tooltip${m!=="thumb"?"-"+m:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${m}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(f):this.localize.number(f)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){const m=L(this.getPercentageFromValue(this.minValue),0,100),f=L(this.getPercentageFromValue(this.maxValue),0,100);return g`
        ${h}

        <div id="slider" part="slider" class=${r}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style="--start: ${Math.min(m,f)}%; --end: ${Math.max(m,f)}%"
            ></div>

            ${u}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style="--position: ${m}%"
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:"Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style="--position: ${f}%"
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:"Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${d} ${c}
        </div>

        ${p("thumb-min",this.minValue)} ${p("thumb-max",this.maxValue)}
      `}else{const m=L(this.getPercentageFromValue(this.value),0,100),f=L(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return g`
        ${h}

        <div
          id="slider"
          part="slider"
          class=${r}
          role="slider"
          aria-disabled=${this.disabled?"true":"false"}
          aria-readonly=${this.disabled?"true":"false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.value):this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled?-1:0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style="--start: ${f}%; --end: ${m}%"
            ></div>

            ${u}
            <span id="thumb" part="thumb" style="--position: ${m}%"></span>
          </div>

          ${d} ${c}
        </div>

        ${p("thumb",this.value)}
      `}}};$.formAssociated=!0;$.observeSlots=!0;$.css=[Ft,ue,Kr];s([E("#slider")],$.prototype,"slider",2);s([E("#thumb")],$.prototype,"thumb",2);s([E("#thumb-min")],$.prototype,"thumbMin",2);s([E("#thumb-max")],$.prototype,"thumbMax",2);s([E("#track")],$.prototype,"track",2);s([E("#tooltip")],$.prototype,"tooltip",2);s([lo("wa-tooltip")],$.prototype,"tooltips",2);s([l()],$.prototype,"label",2);s([l({attribute:"hint"})],$.prototype,"hint",2);s([l({reflect:!0})],$.prototype,"name",2);s([l({type:Number,attribute:"min-value"})],$.prototype,"minValue",2);s([l({type:Number,attribute:"max-value"})],$.prototype,"maxValue",2);s([l({attribute:"value",reflect:!0,type:Number})],$.prototype,"defaultValue",2);s([R()],$.prototype,"value",1);s([l({type:Boolean,reflect:!0})],$.prototype,"range",2);s([l({type:Boolean})],$.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],$.prototype,"readonly",2);s([l({reflect:!0})],$.prototype,"orientation",2);s([l({reflect:!0})],$.prototype,"size",2);s([l({attribute:"indicator-offset",type:Number})],$.prototype,"indicatorOffset",2);s([l({reflect:!0})],$.prototype,"form",2);s([l({type:Number})],$.prototype,"min",2);s([l({type:Number})],$.prototype,"max",2);s([l({type:Number})],$.prototype,"step",2);s([l({type:Boolean,reflect:!0})],$.prototype,"required",2);s([l({type:Boolean})],$.prototype,"autofocus",2);s([l({attribute:"tooltip-distance",type:Number})],$.prototype,"tooltipDistance",2);s([l({attribute:"tooltip-placement",reflect:!0})],$.prototype,"tooltipPlacement",2);s([l({attribute:"with-markers",type:Boolean})],$.prototype,"withMarkers",2);s([l({attribute:"with-tooltip",type:Boolean})],$.prototype,"withTooltip",2);s([l({attribute:!1})],$.prototype,"valueFormatter",2);$=s([H("wa-slider")],$);var Yr=`:host {
  display: inline-block;
  color: var(--wa-color-neutral-on-quiet);
  font-weight: var(--wa-font-weight-action);
}

.tab {
  display: inline-flex;
  align-items: center;
  font: inherit;
  padding: 1em 1.5em;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  transition: color var(--wa-transition-fast) var(--wa-transition-easing);

  ::slotted(wa-icon:first-child) {
    margin-inline-end: 0.5em;
  }

  ::slotted(wa-icon:last-child) {
    margin-inline-start: 0.5em;
  }
}

@media (hover: hover) {
  :host(:hover:not([disabled])) .tab {
    color: currentColor;
  }
}

:host(:focus) {
  outline: transparent;
}

:host(:focus-visible) .tab {
  outline: var(--wa-focus-ring);
  outline-offset: calc(-1 * var(--wa-border-width-l) - var(--wa-focus-ring-offset));
}

:host([active]:not([disabled])) {
  color: var(--wa-color-brand-on-quiet);
}

:host([disabled]) .tab {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (forced-colors: active) {
  :host([active]:not([disabled])) {
    outline: solid 1px transparent;
    outline-offset: -3px;
  }
}
`,Xr=0,pt=class extends U{constructor(){super(...arguments),this.attrId=++Xr,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||(this.slot="nav"),super.connectedCallback(),this.setAttribute("role","tab")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,g`
      <div
        part="base"
        class=${B({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};pt.css=Yr;s([E(".tab")],pt.prototype,"tab",2);s([l({reflect:!0})],pt.prototype,"panel",2);s([l({type:Boolean,reflect:!0})],pt.prototype,"active",2);s([l({type:Boolean,reflect:!0})],pt.prototype,"disabled",2);s([l({type:Number,reflect:!0})],pt.prototype,"tabIndex",2);s([O("active")],pt.prototype,"handleActiveChange",1);s([O("disabled")],pt.prototype,"handleDisabledChange",1);pt=s([H("wa-tab")],pt);function Gr(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function an(t,e,n="vertical",i="smooth"){const o=Gr(t,e),r=o.top+e.scrollTop,a=o.left+e.scrollLeft,h=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,u=e.scrollTop,d=e.scrollTop+e.offsetHeight;(n==="horizontal"||n==="both")&&(a<h?e.scrollTo({left:a,behavior:i}):a+t.clientWidth>c&&e.scrollTo({left:a-e.offsetWidth+t.clientWidth,behavior:i})),(n==="vertical"||n==="both")&&(r<u?e.scrollTo({top:r,behavior:i}):r+t.clientHeight>d&&e.scrollTo({top:r-e.offsetHeight+t.clientHeight,behavior:i}))}var Zr=class extends Event{constructor(t){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},Jr=class extends Event{constructor(t){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},Qr=`:host {
  --indicator-color: var(--wa-color-brand-fill-loud);
  --track-color: var(--wa-color-neutral-fill-normal);
  --track-width: 0.125rem;

  display: block;
}

.tab-group {
  display: flex;
  border-radius: 0;
}

.tabs {
  display: flex;
  position: relative;
}

.indicator {
  position: absolute;
}

.tab-group-has-scroll-controls .nav-container {
  position: relative;
  padding: 0 1.5em;
}

.body {
  display: block;
  overflow: auto;
}

.scroll-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1.5em;
}

.scroll-button-start {
  inset-inline-start: 0;
}

.scroll-button-end {
  inset-inline-end: 0;
}

/*
   * Top
   */

.tab-group-top {
  flex-direction: column;
}

.tab-group-top .nav-container {
  order: 1;
}

.tab-group-top .nav {
  display: flex;
  overflow-x: auto;

  /* Hide scrollbar in Firefox */
  scrollbar-width: none;
}

/* Hide scrollbar in Chrome/Safari */
.tab-group-top .nav::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.tab-group-top .tabs {
  flex: 1 1 auto;
  position: relative;
  flex-direction: row;
  border-bottom: solid var(--track-width) var(--track-color);
}

.tab-group-top .indicator {
  bottom: calc(-1 * var(--track-width));
  border-bottom: solid var(--track-width) var(--indicator-color);
}

.tab-group-top .body {
  order: 2;
}

.tab-group-top ::slotted(wa-tab[active]) {
  border-block-end: solid var(--track-width) var(--indicator-color);
  margin-block-end: calc(-1 * var(--track-width));
}

.tab-group-top ::slotted(wa-tab-panel) {
  --padding: var(--wa-space-xl) 0;
}

/*
   * Bottom
   */

.tab-group-bottom {
  flex-direction: column;
}

.tab-group-bottom .nav-container {
  order: 2;
}

.tab-group-bottom .nav {
  display: flex;
  overflow-x: auto;

  /* Hide scrollbar in Firefox */
  scrollbar-width: none;
}

/* Hide scrollbar in Chrome/Safari */
.tab-group-bottom .nav::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.tab-group-bottom .tabs {
  flex: 1 1 auto;
  position: relative;
  flex-direction: row;
  border-top: solid var(--track-width) var(--track-color);
}

.tab-group-bottom .indicator {
  top: calc(-1 * var(--track-width));
  border-top: solid var(--track-width) var(--indicator-color);
}

.tab-group-bottom .body {
  order: 1;
}

.tab-group-bottom ::slotted(wa-tab[active]) {
  border-block-start: solid var(--track-width) var(--indicator-color);
  margin-block-start: calc(-1 * var(--track-width));
}

.tab-group-bottom ::slotted(wa-tab-panel) {
  --padding: var(--wa-space-xl) 0;
}

/*
   * Start
   */

.tab-group-start {
  flex-direction: row;
}

.tab-group-start .nav-container {
  order: 1;
}

.tab-group-start .tabs {
  flex: 0 0 auto;
  flex-direction: column;
  border-inline-end: solid var(--track-width) var(--track-color);
}

.tab-group-start .indicator {
  inset-inline-end: calc(-1 * var(--track-width));
  border-right: solid var(--track-width) var(--indicator-color);
}

.tab-group-start .body {
  flex: 1 1 auto;
  order: 2;
}

.tab-group-start ::slotted(wa-tab[active]) {
  border-inline-end: solid var(--track-width) var(--indicator-color);
  margin-inline-end: calc(-1 * var(--track-width));
}

.tab-group-start ::slotted(wa-tab-panel) {
  --padding: 0 var(--wa-space-xl);
}

/*
   * End
   */

.tab-group-end {
  flex-direction: row;
}

.tab-group-end .nav-container {
  order: 2;
}

.tab-group-end .tabs {
  flex: 0 0 auto;
  flex-direction: column;
  border-left: solid var(--track-width) var(--track-color);
}

.tab-group-end .indicator {
  inset-inline-start: calc(-1 * var(--track-width));
  border-inline-start: solid var(--track-width) var(--indicator-color);
}

.tab-group-end .body {
  flex: 1 1 auto;
  order: 1;
}

.tab-group-end ::slotted(wa-tab[active]) {
  border-inline-start: solid var(--track-width) var(--indicator-color);
  margin-inline-start: calc(-1 * var(--track-width));
}

.tab-group-end ::slotted(wa-tab-panel) {
  --padding: 0 var(--wa-space-xl);
}
`,Q=class extends U{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new lt(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(n=>!["aria-labelledby","aria-controls"].includes(n.attributeName))&&setTimeout(()=>this.setAriaLabels());const e=t.filter(n=>n.target.closest("wa-tab-group")===this);if(e.some(n=>n.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(n=>n.attributeName==="active")){const i=e.filter(o=>o.attributeName==="active"&&o.target.tagName.toLowerCase()==="wa-tab").map(o=>o.target).find(o=>o.active);i&&i.closest("wa-tab-group")===this&&this.setActiveTab(i)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,n)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){const i=this.tabs.find(o=>o.panel===this.active);i&&this.setActiveTab(i)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});n.unobserve(e[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const n=t.target.closest("wa-tab");n?.closest("wa-tab-group")===this&&n!==null&&this.setActiveTab(n,{scrollBehavior:"smooth"})}handleKeyDown(t){const n=t.target.closest("wa-tab");if(n?.closest("wa-tab-group")===this){if(["Enter"," "].includes(t.key)){n!==null&&(this.setActiveTab(n,{scrollBehavior:"smooth"}),t.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const o=this.tabs.find(h=>h.matches(":focus")),r=this.localize.dir()==="rtl";let a=null;if(o?.tagName.toLowerCase()==="wa-tab"){if(t.key==="Home")a=this.focusableTabs[0];else if(t.key==="End")a=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(r?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const h=this.tabs.findIndex(c=>c===o);a=this.findNextFocusableTab(h,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(r?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const h=this.tabs.findIndex(c=>c===o);a=this.findNextFocusableTab(h,"forward")}if(!a)return;a.tabIndex=0,a.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(a,{scrollBehavior:"smooth"}):this.tabs.forEach(h=>{h.tabIndex=h===a?0:-1}),["top","bottom"].includes(this.placement)&&an(a,this.nav,"horizontal"),t.preventDefault()}}}}findNextFocusableTab(t,e){let n=null;const i=e==="forward"?1:-1;let o=t+i;for(;t<this.tabs.length;){if(n=this.tabs[o]||null,n===null){e==="forward"?n=this.focusableTabs[0]:n=this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;o+=i}return n}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e={emitEvents:!0,scrollBehavior:"auto",...e},t.closest("wa-tab-group")===this&&t!==this.activeTab&&!t.disabled){const n=this.activeTab;this.active=t.panel,this.activeTab=t,this.tabs.forEach(i=>{i.active=i===this.activeTab,i.tabIndex=i===this.activeTab?0:-1}),this.panels.forEach(i=>i.active=i.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&an(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(n&&this.dispatchEvent(new Zr({name:n.panel})),this.dispatchEvent(new Jr({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(n=>n.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){const t=this.tabs.find(e=>e.panel===this.active);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return g`
      <div
        part="base"
        class=${B({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?g`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${t?"chevron-right":"chevron-left"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToStart")}
                  ></wa-icon>
                </wa-button>
              `:""}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${()=>this.activeTab?.focus({preventScroll:!0})}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?g`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${t?"chevron-left":"chevron-right"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToEnd")}
                  ></wa-icon>
                </wa-button>
              `:""}
        </div>

        <slot part="body" class="body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};Q.css=Qr;s([E(".tab-group")],Q.prototype,"tabGroup",2);s([E(".body")],Q.prototype,"body",2);s([E(".nav")],Q.prototype,"nav",2);s([R()],Q.prototype,"hasScrollControls",2);s([l({reflect:!0})],Q.prototype,"active",2);s([l()],Q.prototype,"placement",2);s([l()],Q.prototype,"activation",2);s([l({attribute:"without-scroll-controls",type:Boolean})],Q.prototype,"withoutScrollControls",2);s([O("active")],Q.prototype,"updateActiveTab",1);s([O("withoutScrollControls",{waitUntilFirstUpdate:!0})],Q.prototype,"updateScrollControls",1);Q=s([H("wa-tab-group")],Q);var ta=`:host {
  --padding: 0;

  display: none;
}

:host([active]) {
  display: block;
}

.tab-panel {
  display: block;
  padding: var(--padding);
}
`,ea=0,Gt=class extends U{constructor(){super(...arguments),this.attrId=++ea,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return g`
      <slot
        part="base"
        class=${B({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};Gt.css=ta;s([l({reflect:!0})],Gt.prototype,"name",2);s([l({type:Boolean,reflect:!0})],Gt.prototype,"active",2);s([O("active")],Gt.prototype,"handleActiveChange",1);Gt=s([H("wa-tab-panel")],Gt);function oe(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(o=>oe(o,--e)).join("");let n=t;if(n.nodeType===Node.TEXT_NODE)return n.textContent??"";if(n.nodeType===Node.ELEMENT_NODE){let i=n;if(i.hasAttribute("slot")||i.matches("style, script"))return"";if(i instanceof HTMLSlotElement){let o=i.assignedNodes({flatten:!0});if(o.length>0)return oe(o,--e)}return e>-1?oe(i,--e):i.textContent??""}return n.hasChildNodes()?oe(n.childNodes,--e):""}var na=`:host {
  display: block;
  color: var(--wa-color-text-normal);
  -webkit-user-select: none;
  user-select: none;

  position: relative;
  display: flex;
  align-items: center;
  font: inherit;
  padding: 0.5em 1em 0.5em 0.25em;
  line-height: var(--wa-line-height-condensed);
  transition: fill var(--wa-transition-normal) var(--wa-transition-easing);
  cursor: pointer;
}

:host(:focus) {
  outline: none;
}

@media (hover: hover) {
  :host(:not([disabled], :state(current)):is(:state(hover), :hover)) {
    background-color: var(--wa-color-neutral-fill-normal);
    color: var(--wa-color-neutral-on-normal);
  }
}

:host(:state(current)),
:host([disabled]:state(current)) {
  background-color: var(--wa-color-brand-fill-loud);
  color: var(--wa-color-brand-on-loud);
  opacity: 1;
}

:host([disabled]) {
  outline: none;
  opacity: 0.5;
  cursor: not-allowed;
}

.label {
  flex: 1 1 auto;
  display: inline-block;
}

.check {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--wa-font-size-smaller);
  visibility: hidden;
  width: 2em;
}

:host(:state(selected)) .check {
  visibility: visible;
}

.start,
.end {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.start::slotted(*) {
  margin-inline-end: 0.5em;
}

.end::slotted(*) {
  margin-inline-start: 0.5em;
}

@media (forced-colors: active) {
  :host(:hover:not([aria-disabled='true'])) {
    outline: dashed 1px SelectedItem;
    outline-offset: -1px;
  }
}
`,st=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-select")?.hasInteracted){const e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=oe(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return g`
      <wa-icon
        part="checked-icon"
        class="check"
        name="check"
        library="system"
        variant="solid"
        aria-hidden="true"
      ></wa-icon>
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};st.css=na;s([E(".label")],st.prototype,"defaultSlot",2);s([R()],st.prototype,"current",2);s([l({reflect:!0})],st.prototype,"value",2);s([l({type:Boolean})],st.prototype,"disabled",2);s([l({type:Boolean,attribute:!1})],st.prototype,"selected",2);s([l({type:Boolean,attribute:"selected"})],st.prototype,"defaultSelected",2);s([l()],st.prototype,"label",1);s([R()],st.prototype,"defaultLabel",2);st=s([H("wa-option")],st);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class sn extends De{constructor(e){if(super(e),this.it=z,e.type!==wt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===z||e==null)return this._t=void 0,this.it=e;if(e===Z)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}sn.directiveName="unsafeHTML",sn.resultType=1;const ia=Oe(sn);var oa=`:host {
  --tag-max-size: 10ch;
  --show-duration: 100ms;
  --hide-duration: 100ms;
}

/* Add ellipses to multi select options */
:host wa-tag::part(content) {
  display: initial;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: var(--tag-max-size);
}

:host .disabled [part~='combobox'] {
  opacity: 0.5;
  cursor: not-allowed;
  outline: none;
}

:host .enabled:is(.open, :focus-within) [part~='combobox'] {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/** The popup */
.select {
  flex: 1 1 auto;
  display: inline-flex;
  width: 100%;
  position: relative;
  vertical-align: middle;

  /* Pass through from select to the popup */
  --show-duration: inherit;
  --hide-duration: inherit;

  &::part(popup) {
    z-index: 900;
  }

  &[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  &[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }
}

/* Combobox */
.combobox {
  flex: 1;
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  justify-content: start;

  min-height: var(--wa-form-control-height);

  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
  border-radius: var(--wa-form-control-border-radius);
  border-style: var(--wa-form-control-border-style);
  border-width: var(--wa-form-control-border-width);
  color: var(--wa-form-control-value-color);
  cursor: pointer;
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  overflow: hidden;
  padding: 0 var(--wa-form-control-padding-inline);
  position: relative;
  vertical-align: middle;
  width: 100%;
  transition:
    background-color var(--wa-transition-normal),
    border var(--wa-transition-normal),
    outline var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);

  :host([multiple]) .select:not(.placeholder-visible) & {
    padding-inline-start: 0;
    padding-block: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));
  }

  /* Pills */
  :host([pill]) & {
    border-radius: var(--wa-border-radius-pill);
  }
}

/* Appearance modifiers */
:host([appearance~='outlined']) .combobox {
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
}

:host([appearance~='filled']) .combobox {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-color-neutral-fill-quiet);
}

:host([appearance~='filled'][appearance~='outlined']) .combobox {
  border-color: var(--wa-form-control-border-color);
}

.display-input {
  position: relative;
  width: 100%;
  font: inherit;
  border: none;
  background: none;
  line-height: var(--wa-form-control-value-line-height);
  color: var(--wa-form-control-value-color);
  cursor: inherit;
  overflow: hidden;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--wa-form-control-placeholder-color);
  }
}

/* Visually hide the display input when multiple is enabled */
:host([multiple]) .select:not(.placeholder-visible) .display-input {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.value-input {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: 0;
  margin: 0;
}

.tags {
  display: flex;
  flex: 1;
  align-items: center;
  flex-wrap: wrap;
  margin-inline-start: 0.25em;
  gap: 0.25em;

  &::slotted(wa-tag) {
    cursor: pointer !important;
  }

  .disabled &,
  .disabled &::slotted(wa-tag) {
    cursor: not-allowed !important;
  }
}

/* Start and End */

.start,
.end {
  flex: 0;
  display: inline-flex;
  align-items: center;
  color: var(--wa-color-neutral-on-quiet);
}

.end::slotted(*) {
  margin-inline-start: var(--wa-form-control-padding-inline);
}

.start::slotted(*) {
  margin-inline-end: var(--wa-form-control-padding-inline);
}

:host([multiple]) .start::slotted(*) {
  margin-inline: var(--wa-form-control-padding-inline);
}

/* Clear button */
[part~='clear-button'] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  color: var(--wa-color-neutral-on-quiet);
  border: none;
  background: none;
  padding: 0;
  transition: color var(--wa-transition-normal);
  cursor: pointer;
  margin-inline-start: var(--wa-form-control-padding-inline);

  &:focus {
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  &:active {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }
}

/* Expand icon */
.expand-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  color: var(--wa-color-neutral-on-quiet);
  transition: rotate var(--wa-transition-slow) ease;
  rotate: 0deg;
  margin-inline-start: var(--wa-form-control-padding-inline);

  .open & {
    rotate: -180deg;
  }
}

/* Listbox */
.listbox {
  display: block;
  position: relative;
  font: inherit;
  box-shadow: var(--wa-shadow-m);
  background: var(--wa-color-surface-raised);
  border-color: var(--wa-color-surface-border);
  border-radius: var(--wa-border-radius-m);
  border-style: var(--wa-border-style);
  border-width: var(--wa-border-width-s);
  padding-block: 0.5em;
  padding-inline: 0;
  overflow: auto;
  overscroll-behavior: none;

  /* Make sure it adheres to the popup's auto size */
  max-width: var(--auto-size-available-width);
  max-height: var(--auto-size-available-height);

  &::slotted(wa-divider) {
    --spacing: 0.5em;
  }
}

slot:not([name])::slotted(small) {
  display: block;
  font-size: var(--wa-font-size-smaller);
  font-weight: var(--wa-font-weight-semibold);
  color: var(--wa-color-text-quiet);
  padding-block: 0.5em;
  padding-inline: 2.25em;
}
`,k=class extends W{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Zt(this,"hint","label"),this.localize=new lt(this),this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.form=null,this.required=!1,this.getTag=t=>g`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,n=e.closest('[part~="clear-button"]')!==null,i=e.closest("wa-button")!==null;if(!(n||i)){if(t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const o=this.getAllOptions(),r=o.indexOf(this.currentOption);let a=Math.max(0,r);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(a=r+1,a>o.length-1&&(a=0)):t.key==="ArrowUp"?(a=r-1,a<0&&(a=o.length-1)):t.key==="Home"?a=0:t.key==="End"&&(a=o.length-1),this.setCurrentOption(o[a])}if(t.key?.length===1||t.key==="Backspace"){const o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const r of o)if(r.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(r);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=[gn({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),t==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(n=>!n.disabled).map(n=>n.value));let e=t;return t!=null&&(e=t.filter(n=>this.optionValues.has(n)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const e=this.getAllOptions().filter(n=>n.hasAttribute("selected")||n.defaultSelected);if(e.length>0){const n=e.map(i=>i.value);this._defaultValue=this.multiple?n:n[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const n=t.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="wa-button");this.disabled||n||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.value!==null&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Ei),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const n=t.target.closest("wa-option");n&&!n.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(n):this.setSelectedOptions(n),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const n=t.filter(i=>e.includes(i.value));this.setSelectedOptions(n)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;let n=e;if(!n){const i=t.target.closest("wa-tag[part~=tag]");if(i){const o=this.shadowRoot?.querySelector('[part="tags"]');if(o){const a=Array.from(o.children).indexOf(i);a>=0&&a<this.selectedOptions.length&&(n=this.selectedOptions[a])}}}n&&(this.toggleOptionSelection(n,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(n=>{n.current=!1,n.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),n=Array.isArray(t)?t:[t];e.forEach(i=>{n.includes(i)||(i.selected=!1)}),n.length&&n.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){const t=this.getAllOptions();this.selectedOptions=t.filter(n=>{if(!this.hasInteracted&&!this.valueHasChanged){const i=this.defaultValue,o=Array.isArray(i)?i:[i];return n.hasAttribute("selected")||n.defaultSelected||n.selected||o?.includes(n.value)}return n.selected});let e=new Set(this.selectedOptions.map(n=>n.value));if(e.size>0||this._value){const n=this._value;if(this._value==null){let i=this.defaultValue??[];this._value=Array.isArray(i)?i:[i]}this._value=this._value?.filter(i=>!this.optionValues?.has(i))??null,this._value?.unshift(...e),this.requestUpdate("value",n)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const n=this.selectedOptions[0];this.displayLabel=n?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const n=this.getTag(t,e);return n?typeof n=="string"?ia(n):n:null}else if(e===this.maxOptionsVisible)return g`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `;return null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],n=t.filter(i=>e.includes(i.value));this.setSelectedOptions(n),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new Ci;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Xt(this.popup.popup,"show"),this.currentOption&&an(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new $i)}else{const t=new ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Xt(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new xi)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Yt(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Yt(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,i=this.hint?!0:!!e,o=(this.hasUpdated||io)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,r=!!(this.placeholder&&(!this.value||this.value.length===0));return g`
      <div
        part="form-control"
        class=${B({"form-control":!0,"form-control-has-label":n})}
      >
        <label
          id="label"
          part="form-control-label label"
          class="label"
          aria-hidden=${n?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${B({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":r})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?g`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${o?g`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${B({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};k.css=[oa,ue,Ft];s([E(".select")],k.prototype,"popup",2);s([E(".combobox")],k.prototype,"combobox",2);s([E(".display-input")],k.prototype,"displayInput",2);s([E(".value-input")],k.prototype,"valueInput",2);s([E(".listbox")],k.prototype,"listbox",2);s([R()],k.prototype,"displayLabel",2);s([R()],k.prototype,"currentOption",2);s([R()],k.prototype,"selectedOptions",2);s([R()],k.prototype,"optionValues",2);s([l()],k.prototype,"name",2);s([l({attribute:!1})],k.prototype,"defaultValue",1);s([l({attribute:"value",reflect:!1})],k.prototype,"value",1);s([l({reflect:!0})],k.prototype,"size",2);s([l()],k.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],k.prototype,"multiple",2);s([l({attribute:"max-options-visible",type:Number})],k.prototype,"maxOptionsVisible",2);s([l({type:Boolean})],k.prototype,"disabled",2);s([l({attribute:"with-clear",type:Boolean})],k.prototype,"withClear",2);s([l({type:Boolean,reflect:!0})],k.prototype,"open",2);s([l({reflect:!0})],k.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],k.prototype,"pill",2);s([l()],k.prototype,"label",2);s([l({reflect:!0})],k.prototype,"placement",2);s([l({attribute:"hint"})],k.prototype,"hint",2);s([l({attribute:"with-label",type:Boolean})],k.prototype,"withLabel",2);s([l({attribute:"with-hint",type:Boolean})],k.prototype,"withHint",2);s([l({reflect:!0})],k.prototype,"form",2);s([l({type:Boolean,reflect:!0})],k.prototype,"required",2);s([l({attribute:!1})],k.prototype,"getTag",2);s([O("disabled",{waitUntilFirstUpdate:!0})],k.prototype,"handleDisabledChange",1);s([O("value",{waitUntilFirstUpdate:!0})],k.prototype,"handleValueChange",1);s([O("open",{waitUntilFirstUpdate:!0})],k.prototype,"handleOpenChange",1);k=s([H("wa-select")],k);var ra=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}},aa=`@layer wa-component {
  :host {
    display: inline-flex;
    gap: 0.5em;
    border-radius: var(--wa-border-radius-m);
    align-items: center;
    background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    font-size: inherit;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    height: calc(var(--wa-form-control-height) * 0.8);
    line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
    padding: 0 0.75em;
  }

  /* Appearance modifiers */
  :host([appearance~='outlined']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
  }

  :host([appearance~='filled']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled'][appearance~='outlined']) {
    border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
  }
}

.content {
  font-size: var(--wa-font-size-smaller);
}

[part='remove-button'] {
  color: inherit;
  line-height: 1;
}

[part='remove-button']::part(base) {
  padding: 0;
  height: 1em;
  width: 1em;
}

@media (hover: hover) {
  :host(:hover) > [part='remove-button']::part(base) {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
  }
}

:host(:active) > [part='remove-button']::part(base) {
  color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
}

/*
 * Pill modifier
 */
:host([pill]) {
  border-radius: var(--wa-border-radius-pill);
}
`,Vt=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.variant="neutral",this.appearance="outlined filled",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new ra)}render(){return g`
      <slot part="content" class="content"></slot>

      ${this.withRemove?g`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};Vt.css=[aa,Re,Ft];s([l({reflect:!0})],Vt.prototype,"variant",2);s([l({reflect:!0})],Vt.prototype,"appearance",2);s([l({reflect:!0})],Vt.prototype,"size",2);s([l({type:Boolean,reflect:!0})],Vt.prototype,"pill",2);s([l({attribute:"with-remove",type:Boolean})],Vt.prototype,"withRemove",2);Vt=s([H("wa-tag")],Vt);var sa=`@layer wa-utilities {
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
}
`;function q(t,e){la(t)&&(t="100%");const n=ha(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),n&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function ge(t){return Math.min(1,Math.max(0,t))}function la(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function ha(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Ai(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function ve(t){return Number(t)<=1?`${Number(t)*100}%`:t}function zt(t){return t.length===1?"0"+t:String(t)}function ca(t,e,n){return{r:q(t,255)*255,g:q(e,255)*255,b:q(n,255)*255}}function Wn(t,e,n){t=q(t,255),e=q(e,255),n=q(n,255);const i=Math.max(t,e,n),o=Math.min(t,e,n);let r=0,a=0;const h=(i+o)/2;if(i===o)a=0,r=0;else{const c=i-o;switch(a=h>.5?c/(2-i-o):c/(i+o),i){case t:r=(e-n)/c+(e<n?6:0);break;case e:r=(n-t)/c+2;break;case n:r=(t-e)/c+4;break}r/=6}return{h:r,s:a,l:h}}function Xe(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*(6*n):n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function ua(t,e,n){let i,o,r;if(t=q(t,360),e=q(e,100),n=q(n,100),e===0)o=n,r=n,i=n;else{const a=n<.5?n*(1+e):n+e-n*e,h=2*n-a;i=Xe(h,a,t+1/3),o=Xe(h,a,t),r=Xe(h,a,t-1/3)}return{r:i*255,g:o*255,b:r*255}}function jn(t,e,n){t=q(t,255),e=q(e,255),n=q(n,255);const i=Math.max(t,e,n),o=Math.min(t,e,n);let r=0;const a=i,h=i-o,c=i===0?0:h/i;if(i===o)r=0;else{switch(i){case t:r=(e-n)/h+(e<n?6:0);break;case e:r=(n-t)/h+2;break;case n:r=(t-e)/h+4;break}r/=6}return{h:r,s:c,v:a}}function da(t,e,n){t=q(t,360)*6,e=q(e,100),n=q(n,100);const i=Math.floor(t),o=t-i,r=n*(1-e),a=n*(1-o*e),h=n*(1-(1-o)*e),c=i%6,u=[n,a,r,r,h,n][c],d=[h,n,n,a,r,r][c],p=[r,r,h,n,n,a][c];return{r:u*255,g:d*255,b:p*255}}function Kn(t,e,n,i){const o=[zt(Math.round(t).toString(16)),zt(Math.round(e).toString(16)),zt(Math.round(n).toString(16))];return i&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function pa(t,e,n,i,o){const r=[zt(Math.round(t).toString(16)),zt(Math.round(e).toString(16)),zt(Math.round(n).toString(16)),zt(ma(i))];return o&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))&&r[3].startsWith(r[3].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0)+r[3].charAt(0):r.join("")}function fa(t,e,n,i){const o=t/100,r=e/100,a=n/100,h=i/100,c=255*(1-o)*(1-h),u=255*(1-r)*(1-h),d=255*(1-a)*(1-h);return{r:c,g:u,b:d}}function Yn(t,e,n){let i=1-t/255,o=1-e/255,r=1-n/255,a=Math.min(i,o,r);return a===1?(i=0,o=0,r=0):(i=(i-a)/(1-a)*100,o=(o-a)/(1-a)*100,r=(r-a)/(1-a)*100),a*=100,{c:Math.round(i),m:Math.round(o),y:Math.round(r),k:Math.round(a)}}function ma(t){return Math.round(parseFloat(t)*255).toString(16)}function Xn(t){return X(t)/255}function X(t){return parseInt(t,16)}function ba(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}const ln={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function ga(t){let e={r:0,g:0,b:0},n=1,i=null,o=null,r=null,a=!1,h=!1;return typeof t=="string"&&(t=ya(t)),typeof t=="object"&&(Y(t.r)&&Y(t.g)&&Y(t.b)?(e=ca(t.r,t.g,t.b),a=!0,h=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Y(t.h)&&Y(t.s)&&Y(t.v)?(i=ve(t.s),o=ve(t.v),e=da(t.h,i,o),a=!0,h="hsv"):Y(t.h)&&Y(t.s)&&Y(t.l)?(i=ve(t.s),r=ve(t.l),e=ua(t.h,i,r),a=!0,h="hsl"):Y(t.c)&&Y(t.m)&&Y(t.y)&&Y(t.k)&&(e=fa(t.c,t.m,t.y,t.k),a=!0,h="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(n=t.a)),n=Ai(n),{ok:a,format:t.format||h,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:n}}const va="[-\\+]?\\d+%?",wa="[-\\+]?\\d*\\.\\d+%?",At="(?:"+wa+")|(?:"+va+")",Ge="[\\s|\\(]+("+At+")[,|\\s]+("+At+")[,|\\s]+("+At+")\\s*\\)?",we="[\\s|\\(]+("+At+")[,|\\s]+("+At+")[,|\\s]+("+At+")[,|\\s]+("+At+")\\s*\\)?",et={CSS_UNIT:new RegExp(At),rgb:new RegExp("rgb"+Ge),rgba:new RegExp("rgba"+we),hsl:new RegExp("hsl"+Ge),hsla:new RegExp("hsla"+we),hsv:new RegExp("hsv"+Ge),hsva:new RegExp("hsva"+we),cmyk:new RegExp("cmyk"+we),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function ya(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(ln[t])t=ln[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let n=et.rgb.exec(t);return n?{r:n[1],g:n[2],b:n[3]}:(n=et.rgba.exec(t),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=et.hsl.exec(t),n?{h:n[1],s:n[2],l:n[3]}:(n=et.hsla.exec(t),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=et.hsv.exec(t),n?{h:n[1],s:n[2],v:n[3]}:(n=et.hsva.exec(t),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=et.cmyk.exec(t),n?{c:n[1],m:n[2],y:n[3],k:n[4]}:(n=et.hex8.exec(t),n?{r:X(n[1]),g:X(n[2]),b:X(n[3]),a:Xn(n[4]),format:e?"name":"hex8"}:(n=et.hex6.exec(t),n?{r:X(n[1]),g:X(n[2]),b:X(n[3]),format:e?"name":"hex"}:(n=et.hex4.exec(t),n?{r:X(n[1]+n[1]),g:X(n[2]+n[2]),b:X(n[3]+n[3]),a:Xn(n[4]+n[4]),format:e?"name":"hex8"}:(n=et.hex3.exec(t),n?{r:X(n[1]+n[1]),g:X(n[2]+n[2]),b:X(n[3]+n[3]),format:e?"name":"hex"}:!1))))))))))}function Y(t){return typeof t=="number"?!Number.isNaN(t):et.CSS_UNIT.test(t)}class M{constructor(e="",n={}){if(e instanceof M)return e;typeof e=="number"&&(e=ba(e)),this.originalInput=e;const i=ga(e);this.originalInput=e,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=n.format??i.format,this.gradientType=n.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let n,i,o;const r=e.r/255,a=e.g/255,h=e.b/255;return r<=.03928?n=r/12.92:n=Math.pow((r+.055)/1.055,2.4),a<=.03928?i=a/12.92:i=Math.pow((a+.055)/1.055,2.4),h<=.03928?o=h/12.92:o=Math.pow((h+.055)/1.055,2.4),.2126*n+.7152*i+.0722*o}getAlpha(){return this.a}setAlpha(e){return this.a=Ai(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=jn(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=jn(this.r,this.g,this.b),n=Math.round(e.h*360),i=Math.round(e.s*100),o=Math.round(e.v*100);return this.a===1?`hsv(${n}, ${i}%, ${o}%)`:`hsva(${n}, ${i}%, ${o}%, ${this.roundA})`}toHsl(){const e=Wn(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=Wn(this.r,this.g,this.b),n=Math.round(e.h*360),i=Math.round(e.s*100),o=Math.round(e.l*100);return this.a===1?`hsl(${n}, ${i}%, ${o}%)`:`hsla(${n}, ${i}%, ${o}%, ${this.roundA})`}toHex(e=!1){return Kn(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return pa(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),n=Math.round(this.g),i=Math.round(this.b);return this.a===1?`rgb(${e}, ${n}, ${i})`:`rgba(${e}, ${n}, ${i}, ${this.roundA})`}toPercentageRgb(){const e=n=>`${Math.round(q(n,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=n=>Math.round(q(n,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...Yn(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:n,y:i,k:o}=Yn(this.r,this.g,this.b);return`cmyk(${e}, ${n}, ${i}, ${o})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+Kn(this.r,this.g,this.b,!1);for(const[n,i]of Object.entries(ln))if(e===i)return n;return!1}toString(e){const n=!!e;e=e??this.format;let i=!1;const o=this.a<1&&this.a>=0;return!n&&o&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(i=this.toRgbString()),e==="prgb"&&(i=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(i=this.toHexString()),e==="hex3"&&(i=this.toHexString(!0)),e==="hex4"&&(i=this.toHex8String(!0)),e==="hex8"&&(i=this.toHex8String()),e==="name"&&(i=this.toName()),e==="hsl"&&(i=this.toHslString()),e==="hsv"&&(i=this.toHsvString()),e==="cmyk"&&(i=this.toCmykString()),i||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new M(this.toString())}lighten(e=10){const n=this.toHsl();return n.l+=e/100,n.l=ge(n.l),new M(n)}brighten(e=10){const n=this.toRgb();return n.r=Math.max(0,Math.min(255,n.r-Math.round(255*-(e/100)))),n.g=Math.max(0,Math.min(255,n.g-Math.round(255*-(e/100)))),n.b=Math.max(0,Math.min(255,n.b-Math.round(255*-(e/100)))),new M(n)}darken(e=10){const n=this.toHsl();return n.l-=e/100,n.l=ge(n.l),new M(n)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const n=this.toHsl();return n.s-=e/100,n.s=ge(n.s),new M(n)}saturate(e=10){const n=this.toHsl();return n.s+=e/100,n.s=ge(n.s),new M(n)}greyscale(){return this.desaturate(100)}spin(e){const n=this.toHsl(),i=(n.h+e)%360;return n.h=i<0?360+i:i,new M(n)}mix(e,n=50){const i=this.toRgb(),o=new M(e).toRgb(),r=n/100,a={r:(o.r-i.r)*r+i.r,g:(o.g-i.g)*r+i.g,b:(o.b-i.b)*r+i.b,a:(o.a-i.a)*r+i.a};return new M(a)}analogous(e=6,n=30){const i=this.toHsl(),o=360/n,r=[this];for(i.h=(i.h-(o*e>>1)+720)%360;--e;)i.h=(i.h+o)%360,r.push(new M(i));return r}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new M(e)}monochromatic(e=6){const n=this.toHsv(),{h:i}=n,{s:o}=n;let{v:r}=n;const a=[],h=1/e;for(;e--;)a.push(new M({h:i,s:o,v:r})),r=(r+h)%1;return a}splitcomplement(){const e=this.toHsl(),{h:n}=e;return[this,new M({h:(n+72)%360,s:e.s,l:e.l}),new M({h:(n+216)%360,s:e.s,l:e.l})]}onBackground(e){const n=this.toRgb(),i=new M(e).toRgb(),o=n.a+i.a*(1-n.a);return new M({r:(n.r*n.a+i.r*i.a*(1-n.a))/o,g:(n.g*n.a+i.g*i.a*(1-n.a))/o,b:(n.b*n.a+i.b*i.a*(1-n.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const n=this.toHsl(),{h:i}=n,o=[this],r=360/e;for(let a=1;a<e;a++)o.push(new M({h:(i+a*r)%360,s:n.s,l:n.l}));return o}equals(e){const n=new M(e);return this.format==="cmyk"||n.format==="cmyk"?this.toCmykString()===n.toCmykString():this.toRgbString()===n.toRgbString()}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _i="important",xa=" !"+_i,Et=Oe(class extends De{constructor(t){if(super(t),t.type!==wt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,n)=>{const i=t[n];return i==null?e:e+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(t,[e]){const{style:n}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?n.removeProperty(i):n[i]=null);for(const i in e){const o=e[i];if(o!=null){this.ft.add(i);const r=typeof o=="string"&&o.endsWith(xa);i.includes("-")||r?n.setProperty(i,r?o.slice(0,-11):o,r?_i:""):n[i]=o}}return Z}});var $a=`:host {
  --grid-width: 17em;
  --grid-height: 12em;
  --grid-handle-size: 1.25em;
  --slider-height: 1em;
  --slider-handle-size: calc(var(--slider-height) + 0.25em);
}

.color-picker {
  background-color: var(--wa-color-surface-raised);
  border-radius: var(--wa-border-radius-m);
  border-style: var(--wa-border-style);
  border-width: var(--wa-border-width-s);
  border-color: var(--wa-color-surface-border);
  box-shadow: var(--wa-shadow-m);
  color: var(--color);
  font: inherit;
  font-size: inherit;
  user-select: none;
  width: var(--grid-width);
  -webkit-user-select: none;
}

.grid {
  position: relative;
  height: var(--grid-height);
  background-image:
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
    linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
  border-top-left-radius: calc(var(--wa-border-radius-m) - var(--wa-border-width-s));
  border-top-right-radius: calc(var(--wa-border-radius-m) - var(--wa-border-width-s));
  cursor: crosshair;
  forced-color-adjust: none;
}

.grid-handle {
  position: absolute;
  width: var(--grid-handle-size);
  height: var(--grid-handle-size);
  border-radius: var(--wa-border-radius-circle);
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
  border: solid 0.125rem white;
  margin-top: calc(var(--grid-handle-size) / -2);
  margin-left: calc(var(--grid-handle-size) / -2);
  transition: scale var(--wa-transition-normal) var(--wa-transition-easing);
}

.grid-handle-dragging {
  cursor: none;
  scale: 1.5;
}

.grid-handle:focus-visible {
  outline: var(--wa-focus-ring);
}

.controls {
  padding: 0.75em;
  display: flex;
  align-items: center;
}

.sliders {
  flex: 1 1 auto;
}

.slider {
  position: relative;
  height: var(--slider-height);
  border-radius: var(--wa-border-radius-s);
  box-shadow: inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
  forced-color-adjust: none;
}

.slider:not(:last-of-type) {
  margin-bottom: 0.75em;
}

.slider-handle {
  position: absolute;
  top: calc(50% - var(--slider-handle-size) / 2);
  width: var(--slider-handle-size);
  height: var(--slider-handle-size);
  border-radius: var(--wa-border-radius-circle);
  border: solid 0.125rem white;
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
  margin-left: calc(var(--slider-handle-size) / -2);
}

.slider-handle:focus-visible {
  outline: var(--wa-focus-ring);
}

.hue {
  background-image: linear-gradient(
    to right,
    rgb(255, 0, 0) 0%,
    rgb(255, 255, 0) 17%,
    rgb(0, 255, 0) 33%,
    rgb(0, 255, 255) 50%,
    rgb(0, 0, 255) 67%,
    rgb(255, 0, 255) 83%,
    rgb(255, 0, 0) 100%
  );
}

.alpha .alpha-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.preview {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 3em;
  height: 3em;
  border: none;
  border-radius: var(--wa-border-radius-circle);
  background: none;
  font-size: inherit;
  margin-inline-start: 0.75em;
  cursor: copy;
  forced-color-adjust: none;
}

.preview:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  box-shadow: inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);

  /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
  background-color: var(--preview-color);
}

.preview:focus-visible {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

.preview-color {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 0.0625rem rgba(0, 0, 0, 0.125);
}

.preview-color-copied {
  animation: pulse 850ms;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--wa-color-brand-fill-loud);
  }
  70% {
    box-shadow: 0 0 0 0.5rem transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

.user-input {
  display: flex;
  align-items: center;
  padding: 0 0.75em 0.75em 0.75em;
}

.user-input wa-input {
  min-width: 0; /* fix input width in Safari */
  flex: 1 1 auto;

  &::part(form-control-label) {
    /* Visually hidden */
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
}

.user-input wa-button-group {
  margin-inline-start: 0.75em;

  &::part(base) {
    flex-wrap: nowrap;
  }
}

.user-input wa-button:first-of-type {
  min-width: 3em;
  max-width: 3em;
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(1.5em, 100%), 1fr));
  grid-gap: 0.5em;
  justify-items: center;
  border-block-start: var(--wa-form-control-border-style) var(--wa-form-control-border-width)
    var(--wa-color-surface-border);
  padding: 0.5em;
  forced-color-adjust: none;
}

.swatch {
  position: relative;
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: var(--wa-border-radius-s);
}

.swatch .swatch-color {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 0.0625rem rgba(0, 0, 0, 0.125);
  border-radius: inherit;
  cursor: pointer;
}

.swatch:focus-visible {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

.transparent-bg {
  background-image:
    linear-gradient(45deg, var(--wa-color-neutral-fill-normal) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--wa-color-neutral-fill-normal) 75%),
    linear-gradient(45deg, transparent 75%, var(--wa-color-neutral-fill-normal) 75%),
    linear-gradient(45deg, var(--wa-color-neutral-fill-normal) 25%, transparent 25%);
  background-size: 0.5rem 0.5rem;
  background-position:
    0 0,
    0 0,
    -0.25rem -0.25rem,
    0.25rem 0.25rem;
}

:host([disabled]) {
  opacity: 0.5;
  cursor: not-allowed;

  .grid,
  .grid-handle,
  .slider,
  .slider-handle,
  .preview,
  .swatch,
  .swatch-color {
    pointer-events: none;
  }
}

/*
 * Color dropdown
 */

.color-dropdown {
  display: contents;
}

.color-dropdown::part(panel) {
  max-height: none;
  background-color: var(--wa-color-surface-raised);
  border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
  border-radius: var(--wa-border-radius-m);
  overflow: visible;
}

.trigger {
  display: block;
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: inherit;
  forced-color-adjust: none;
  width: var(--wa-form-control-height);
  height: var(--wa-form-control-height);
  border-radius: var(--wa-form-control-border-radius);
}

.trigger:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: currentColor;
  box-shadow:
    inset 0 0 0 var(--wa-form-control-border-width) var(--wa-form-control-border-color),
    inset 0 0 0 calc(var(--wa-form-control-border-width) * 3) var(--wa-color-surface-default);
}

.trigger-empty:before {
  background-color: transparent;
}

.trigger:focus-visible {
  outline: none;
}

.trigger:focus-visible:not(.trigger:disabled) {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

:host([disabled]) :is(.label, .trigger) {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-control.form-control-has-label .label {
  cursor: pointer;
  display: inline-block;
}
`,w=class extends W{constructor(){super(),this.hasSlotController=new Zt(this,"hint","label"),this.isSafeValue=!1,this.localize=new lt(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!0,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this._value=null,this.defaultValue=this.getAttribute("value")||null,this.withLabel=!1,this.withHint=!1,this.hasEyeDropper=!1,this.label="",this.hint="",this.format="hex",this.size="medium",this.withoutFormatToggle=!1,this.name=null,this.disabled=!1,this.open=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form=null,this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0},this.handleFocusOut=()=>{this.hasFocus=!1},this.reportValidityAfterShow=()=>{this.removeEventListener("invalid",this.emitInvalid),this.reportValidity(),this.addEventListener("invalid",this.emitInvalid)},this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focus())},this.handleDocumentKeyDown=t=>{if(t.key==="Escape"&&this.open){t.stopPropagation(),this.focus(),this.hide();return}t.key==="Tab"&&setTimeout(()=>{const e=this.getRootNode()instanceof ShadowRoot?document.activeElement?.shadowRoot?.activeElement:document.activeElement;(!this||e?.closest(this.tagName.toLowerCase())!==this)&&this.hide()})},this.handleDocumentMouseDown=t=>{const n=t.composedPath().some(i=>i instanceof Element&&(i.closest(".color-picker")||i===this.trigger));this&&!n&&this.hide()},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}static get validators(){const t=[gn()];return[...super.validators,...t]}get validationTarget(){return this.popup?.active?this.input:this.trigger}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("preview-color-copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("preview-color-copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value||""),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".slider.alpha"),n=e.querySelector(".slider-handle"),{width:i}=e.getBoundingClientRect();let o=this.value,r=this.value;n.focus(),t.preventDefault(),Ye(e,{onMove:a=>{this.alpha=L(a/i*100,0,100),this.syncValues(),this.value!==r&&(r=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".slider.hue"),n=e.querySelector(".slider-handle"),{width:i}=e.getBoundingClientRect();let o=this.value,r=this.value;n.focus(),t.preventDefault(),Ye(e,{onMove:a=>{this.hue=L(a/i*360,0,360),this.syncValues(),this.value!==r&&(r=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input"))}))},onStop:()=>{this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".grid"),n=e.querySelector(".grid-handle"),{width:i,height:o}=e.getBoundingClientRect();let r=this.value,a=this.value;n.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,Ye(e,{onMove:(h,c)=>{this.saturation=L(h/i*100,0,100),this.brightness=L(100-c/o*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==r&&(r=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=L(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=L(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleHueKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=L(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=L(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleGridKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=L(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=L(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=L(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=L(this.brightness-e,0,100),this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputChange(t){const e=t.target,n=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value||""):this.value="",this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputInput(t){this.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),setTimeout(()=>this.input.select())):this.hue=0}}handleTouchMove(t){t.preventDefault()}parseColor(t){if(!t||t.trim()==="")return null;const e=new M(t);if(!e.isValid)return null;const n=e.toHsl(),i=e.toRgb(),o=e.toHsv();if(!i||i.r==null||i.g==null||i.b==null)return null;const r={h:n.h||0,s:(n.s||0)*100,l:(n.l||0)*100,a:n.a||0},a=e.toHexString(),h=e.toHex8String(),c={h:o.h||0,s:(o.s||0)*100,v:(o.v||0)*100,a:o.a||0};return{hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a||0,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${(i.a||0).toFixed(2).toString()})`)},hex:this.setLetterCase(a),hexa:this.setLetterCase(h)}}setColor(t){const e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("preview-color-copied"),this.updateValidity()}handleAfterShow(){this.updateValidity()}handleEyeDropper(){if(!this.hasEyeDropper)return;new EyeDropper().open().then(e=>{const n=this.value;this.setColor(e.sRGBHex),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getHexString(t,e,n,i=100){const o=new M(`hsva(${t}, ${e}%, ${n}%, ${i/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}willUpdate(t){super.willUpdate(t),t.has("value")&&this.handleValueChange(t.get("value")||"",this.value||"")}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const n=this.parseColor(e);n!==null?(this.inputValue=this.value||"",this.hue=n.hsva.h,this.saturation=n.hsva.s,this.brightness=n.hsva.v,this.alpha=n.hsva.a*100,this.syncValues()):this.inputValue=t??""}this.requestUpdate()}focus(t){this.trigger.focus(t)}blur(){const t=this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),this.popup?.active&&this.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}reportValidity(){return!this.validity.valid&&!this.open?(this.addEventListener("wa-after-show",this.reportValidityAfterShow,{once:!0}),this.show(),this.disabled||this.dispatchEvent(new fn),!1):super.reportValidity()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}firstUpdated(t){super.firstUpdated(t),this.hasEyeDropper="EyeDropper"in window}handleTriggerClick(){this.open?this.hide():(this.show(),this.focus())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}updateAccessibleTrigger(){const t=this.trigger;t&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){if(!this.open)return this.open=!0,Yt(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Yt(this,"wa-after-hide")}addOpenListeners(){this.base.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.base&&this.base.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled){this.open=!1;return}this.updateAccessibleTrigger(),this.open?(this.dispatchEvent(new CustomEvent("wa-show")),this.addOpenListeners(),await this.updateComplete,this.base.hidden=!1,this.popup.active=!0,await Xt(this.popup.popup,"show-with-scale"),this.dispatchEvent(new CustomEvent("wa-after-show"))):(this.dispatchEvent(new CustomEvent("wa-hide")),this.removeOpenListeners(),await Xt(this.popup.popup,"hide-with-scale"),this.base.hidden=!0,this.popup.active=!1,this.dispatchEvent(new CustomEvent("wa-after-hide")))}render(){const t=this.hasUpdated?this.withLabel||this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.withHint||this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,i=this.hint?!0:!!e,o=this.saturation,r=100-this.brightness,a=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(c=>c.trim()!==""),h=g`
      <div
        part="base"
        class=${B({"color-picker":!0})}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${Et({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${B({"grid-handle":!0,"grid-handle-dragging":this.isDraggingGridHandle})}
            style=${Et({top:`${r}%`,left:`${o}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${_(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="controls">
          <div class="sliders">
            <div
              part="slider hue-slider"
              class="hue slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="slider-handle"
                style=${Et({left:`${this.hue===0?0:100/(360/this.hue)}%`,backgroundColor:this.getHexString(this.hue,100,100)})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${_(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?g`
                  <div
                    part="slider opacity-slider"
                    class="alpha slider transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="alpha-gradient"
                      style=${Et({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${Et({left:`${this.alpha}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${_(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="preview transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${Et({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="user-input" aria-live="polite">
          <wa-input
            part="input"
            type="text"
            name=${this.name}
            size="small"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}
            @input=${this.handleInputInput}
            @blur=${this.stopNestedEventPropagation}
            @focus=${this.stopNestedEventPropagation}
          ></wa-input>

          <wa-button-group>
            ${this.withoutFormatToggle?"":g`
                  <wa-button
                    part="format-button"
                    size="small"
                    appearance="outlined"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      start:format-button__start,
                      label:format-button__label,
                      end:format-button__end,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </wa-button>
                `}
            ${this.hasEyeDropper?g`
                  <wa-button
                    part="eyedropper-button"
                    size="small"
                    appearance="outlined"
                    exportparts="
                      base:eyedropper-button__base,
                      start:eyedropper-button__start,
                      label:eyedropper-button__label,
                      end:eyedropper-button__end,
                      caret:eyedropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    <wa-icon
                      library="system"
                      name="eyedropper"
                      variant="solid"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></wa-icon>
                  </wa-button>
                `:""}
          </wa-button-group>
        </div>

        ${a.length>0?g`
              <div part="swatches" class="swatches">
                ${a.map(c=>{const u=this.parseColor(c);return u?g`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${_(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${c}
                      @click=${()=>this.selectSwatch(c)}
                      @keydown=${d=>!this.disabled&&d.key==="Enter"&&this.setColor(u.hexa)}
                    >
                      <div class="swatch-color" style=${Et({backgroundColor:u.hexa})}></div>
                    </div>
                  `:""})}
              </div>
            `:""}
      </div>
    `;return g`
      <div
        class=${B({container:!0,"form-control":!0,"form-control-has-label":n})}
        part="trigger-container form-control"
      >
        <div part="form-control-label" class="label" id="form-control-label">
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${B({trigger:!0,"trigger-empty":this.isEmpty,"transparent-bg":!0,"form-control-input":!0})}
          style=${Et({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
          aria-labelledby="form-control-label"
          aria-describedby="hint"
          .disabled=${this.disabled}
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        ></button>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${B({"has-slotted":i})}
          >${this.hint}</slot
        >
      </div>

      <wa-popup
        class="color-popup"
        anchor="trigger"
        placement="bottom-start"
        distance="0"
        skidding="0"
        sync="width"
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        aria-disabled=${this.disabled?"true":"false"}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        ${h}
      </wa-popup>
    `}};w.css=[sa,Ft,ue,$a];w.shadowRootOptions={...W.shadowRootOptions,delegatesFocus:!0};s([E('[part~="base"]')],w.prototype,"base",2);s([E('[part~="input"]')],w.prototype,"input",2);s([E('[part~="form-control-label"]')],w.prototype,"triggerLabel",2);s([E('[part~="form-control-input"]')],w.prototype,"triggerButton",2);s([E(".color-popup")],w.prototype,"popup",2);s([E('[part~="preview"]')],w.prototype,"previewButton",2);s([E('[part~="trigger"]')],w.prototype,"trigger",2);s([R()],w.prototype,"hasFocus",2);s([R()],w.prototype,"isDraggingGridHandle",2);s([R()],w.prototype,"isEmpty",2);s([R()],w.prototype,"inputValue",2);s([R()],w.prototype,"hue",2);s([R()],w.prototype,"saturation",2);s([R()],w.prototype,"brightness",2);s([R()],w.prototype,"alpha",2);s([R()],w.prototype,"value",1);s([l({attribute:"value",reflect:!0})],w.prototype,"defaultValue",2);s([l({attribute:"with-label",reflect:!0,type:Boolean})],w.prototype,"withLabel",2);s([l({attribute:"with-hint",reflect:!0,type:Boolean})],w.prototype,"withHint",2);s([R()],w.prototype,"hasEyeDropper",2);s([l()],w.prototype,"label",2);s([l({attribute:"hint"})],w.prototype,"hint",2);s([l()],w.prototype,"format",2);s([l({reflect:!0})],w.prototype,"size",2);s([l({attribute:"without-format-toggle",type:Boolean})],w.prototype,"withoutFormatToggle",2);s([l({reflect:!0})],w.prototype,"name",2);s([l({type:Boolean})],w.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],w.prototype,"open",2);s([l({type:Boolean})],w.prototype,"opacity",2);s([l({type:Boolean})],w.prototype,"uppercase",2);s([l()],w.prototype,"swatches",2);s([l({reflect:!0})],w.prototype,"form",2);s([l({type:Boolean,reflect:!0})],w.prototype,"required",2);s([ao({passive:!1})],w.prototype,"handleTouchMove",1);s([O("format",{waitUntilFirstUpdate:!0})],w.prototype,"handleFormatChange",1);s([O("opacity")],w.prototype,"handleOpacityChange",1);s([O("value")],w.prototype,"handleValueChange",1);s([O("open",{waitUntilFirstUpdate:!0})],w.prototype,"handleOpenChange",1);w=s([H("wa-color-picker")],w);var ka=`:host {
  display: inline-flex;
}

.button-group {
  display: flex;
  position: relative;
  isolation: isolate;
  flex-wrap: wrap;
  gap: 1px;

  @media (hover: hover) {
    > :hover,
    &::slotted(:hover) {
      z-index: 1;
    }
  }

  /* Focus and checked are always on top */
  > :focus,
  &::slotted(:focus),
  > [aria-checked='true'],
  &::slotted([aria-checked='true']),
  > [checked],
  &::slotted([checked]) {
    z-index: 2 !important;
  }
}
:host([orientation='vertical']) .button-group {
  flex-direction: column;
}

/* Button groups with at least one outlined button will not have a gap and instead have borders overlap */
.button-group.has-outlined {
  gap: 0;

  &:not([aria-orientation='vertical']):not(.button-group-vertical)::slotted(:not(:first-child)) {
    margin-inline-start: calc(-1 * var(--border-width));
  }

  &:is([aria-orientation='vertical'], .button-group-vertical)::slotted(:not(:first-child)) {
    margin-block-start: calc(-1 * var(--border-width));
  }
}
`,xt=class extends U{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal",this.variant="neutral"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){ie(t.target)?.classList.add("button-focus")}handleBlur(t){ie(t.target)?.classList.remove("button-focus")}handleMouseOver(t){ie(t.target)?.classList.add("button-hover")}handleMouseOut(t){ie(t.target)?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const n=t.indexOf(e),i=ie(e);i&&(i.appearance==="outlined"&&(this.hasOutlined=!0),i.classList.add("wa-button-group__button"),i.classList.toggle("wa-button-group__horizontal",this.orientation==="horizontal"),i.classList.toggle("wa-button-group__vertical",this.orientation==="vertical"),i.classList.toggle("wa-button-group__button-first",n===0),i.classList.toggle("wa-button-group__button-inner",n>0&&n<t.length-1),i.classList.toggle("wa-button-group__button-last",n===t.length-1),i.classList.toggle("wa-button-group__button-radio",i.tagName.toLowerCase()==="wa-radio-button"))})}render(){return g`
      <slot
        part="base"
        class=${B({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};xt.css=[Re,ka];s([E("slot")],xt.prototype,"defaultSlot",2);s([R()],xt.prototype,"disableRole",2);s([R()],xt.prototype,"hasOutlined",2);s([l()],xt.prototype,"label",2);s([l({reflect:!0})],xt.prototype,"orientation",2);s([l({reflect:!0})],xt.prototype,"variant",2);xt=s([H("wa-button-group")],xt);function ie(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const n of e)n.nodeType===Node.ELEMENT_NODE&&Ca(n)});async function Ca(t){const e=t instanceof Element?t.tagName.toLowerCase():"",n=e?.startsWith("wa-"),i=[...t.querySelectorAll(":not(:defined)")].map(a=>a.tagName.toLowerCase()).filter(a=>a.startsWith("wa-"));n&&!customElements.get(e)&&i.push(e);const o=[...new Set(i)],r=await Promise.allSettled(o.map(a=>Ea(a)));for(const a of r)a.status==="rejected"&&console.warn(a.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function Ea(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),n=wo(`components/${e}/${e}.js`);return new Promise((i,o)=>{import(n).then(()=>i()).catch(()=>o(new Error(`Unable to autoload <${t}> from ${n}`)))})}export{Va as r};
//# sourceMappingURL=webawesome-BNu9ozLj.js.map
