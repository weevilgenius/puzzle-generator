var Yn=()=>({checkValidity(t){const e=t.input,n={message:"",isValid:!0,invalidKeys:[]};if(!e)return n;let i=!0;if("checkValidity"in e&&(i=e.checkValidity()),i)return n;if(n.isValid=!1,"validationMessage"in e&&(n.message=e.validationMessage),!("validity"in e))return n.invalidKeys.push("customError"),n;for(const o in e.validity){if(o==="valid")continue;const a=o;e.validity[a]&&n.invalidKeys.push(a)}return n}}),_i=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,Gn=t=>{throw TypeError(t)},s=(t,e,n,i)=>{for(var o=i>1?void 0:i?Ti(e,n):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(o=(i?r(e,n,o):r(o))||o);return i&&o&&_i(e,n,o),o},Xn=(t,e,n)=>e.has(t)||Gn("Cannot "+n),Vi=(t,e,n)=>(Xn(t,e,"read from private field"),e.get(t)),Li=(t,e,n)=>e.has(t)?Gn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Ri=(t,e,n,i)=>(Xn(t,e,"write to private field"),e.set(t,n),n);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const we=globalThis,sn=we.ShadowRoot&&(we.ShadyCSS===void 0||we.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zn=Symbol(),$n=new WeakMap;let Di=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Zn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(sn&&e===void 0){const i=n!==void 0&&n.length===1;i&&(e=$n.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&$n.set(n,e))}return e}toString(){return this.cssText}};const Jn=t=>new Di(typeof t=="string"?t:t+"",void 0,Zn),Oi=(t,e)=>{if(sn)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of e){const i=document.createElement("style"),o=we.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=n.cssText,t.appendChild(i)}},kn=sn?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const i of e.cssRules)n+=i.cssText;return Jn(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Mi,defineProperty:zi,getOwnPropertyDescriptor:Pi,getOwnPropertyNames:Bi,getOwnPropertySymbols:Ii,getPrototypeOf:Hi}=Object,Te=globalThis,En=Te.trustedTypes,Fi=En?En.emptyScript:"",qi=Te.reactiveElementPolyfillSupport,oe=(t,e)=>t,$e={toAttribute(t,e){switch(e){case Boolean:t=t?Fi:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},ln=(t,e)=>!Mi(t,e),Cn={attribute:!0,type:String,converter:$e,reflect:!1,useDefault:!1,hasChanged:ln};Symbol.metadata??=Symbol("metadata"),Te.litPropertyMetadata??=new WeakMap;let Ht=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=Cn){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,n);o!==void 0&&zi(this.prototype,e,o)}}static getPropertyDescriptor(e,n,i){const{get:o,set:a}=Pi(this.prototype,e)??{get(){return this[n]},set(r){this[n]=r}};return{get:o,set(r){const h=o?.call(this);a?.call(this,r),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Cn}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;const e=Hi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){const n=this.properties,i=[...Bi(n),...Ii(n)];for(const o of i)this.createProperty(o,n[o])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[i,o]of n)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const o=this._$Eu(n,i);o!==void 0&&this._$Eh.set(o,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)n.unshift(kn(o))}else e!==void 0&&n.push(kn(e));return n}static _$Eu(e,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Oi(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const a=(i.converter?.toAttribute!==void 0?i.converter:$e).toAttribute(n,i.type);this._$Em=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,n){const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const a=i.getPropertyOptions(o),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:$e;this._$Em=o;const h=r.fromAttribute(n,a.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(e,n,i){if(e!==void 0){const o=this.constructor,a=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??ln)(a,n)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:o,wrapped:a},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??n??this[e]),a!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,a]of i){const{wrapped:r}=a,h=this[o];r!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,a,h)}}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};Ht.elementStyles=[],Ht.shadowRootOptions={mode:"open"},Ht[oe("elementProperties")]=new Map,Ht[oe("finalized")]=new Map,qi?.({ReactiveElement:Ht}),(Te.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hn=globalThis,ke=hn.trustedTypes,Sn=ke?ke.createPolicy("lit-html",{createHTML:t=>t}):void 0,Qn="$lit$",Ct=`lit$${Math.random().toFixed(9).slice(2)}$`,ti="?"+Ct,Ni=`<${ti}>`,Pt=document,re=()=>Pt.createComment(""),se=t=>t===null||typeof t!="object"&&typeof t!="function",cn=Array.isArray,Ui=t=>cn(t)||typeof t?.[Symbol.iterator]=="function",Be=`[ 	
\f\r]`,te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,An=/-->/g,_n=/>/g,Dt=RegExp(`>|${Be}(?:([^\\s"'>=/]+)(${Be}*=${Be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Tn=/'/g,Vn=/"/g,ei=/^(?:script|style|textarea|title)$/i,Wi=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),g=Wi(1),X=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),Ln=new WeakMap,Mt=Pt.createTreeWalker(Pt,129);function ni(t,e){if(!cn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Sn!==void 0?Sn.createHTML(e):e}const ji=(t,e)=>{const n=t.length-1,i=[];let o,a=e===2?"<svg>":e===3?"<math>":"",r=te;for(let h=0;h<n;h++){const c=t[h];let u,d,p=-1,b=0;for(;b<c.length&&(r.lastIndex=b,d=r.exec(c),d!==null);)b=r.lastIndex,r===te?d[1]==="!--"?r=An:d[1]!==void 0?r=_n:d[2]!==void 0?(ei.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=Dt):d[3]!==void 0&&(r=Dt):r===Dt?d[0]===">"?(r=o??te,p=-1):d[1]===void 0?p=-2:(p=r.lastIndex-d[2].length,u=d[1],r=d[3]===void 0?Dt:d[3]==='"'?Vn:Tn):r===Vn||r===Tn?r=Dt:r===An||r===_n?r=te:(r=Dt,o=void 0);const f=r===Dt&&t[h+1].startsWith("/>")?" ":"";a+=r===te?c+Ni:p>=0?(i.push(u),c.slice(0,p)+Qn+c.slice(p)+Ct+f):c+Ct+(p===-2?h:f)}return[ni(t,a+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class le{constructor({strings:e,_$litType$:n},i){let o;this.parts=[];let a=0,r=0;const h=e.length-1,c=this.parts,[u,d]=ji(e,n);if(this.el=le.createElement(u,i),Mt.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Mt.nextNode())!==null&&c.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(const p of o.getAttributeNames())if(p.endsWith(Qn)){const b=d[r++],f=o.getAttribute(p).split(Ct),m=/([.?@])?(.*)/.exec(b);c.push({type:1,index:a,name:m[2],strings:f,ctor:m[1]==="."?Yi:m[1]==="?"?Gi:m[1]==="@"?Xi:Ve}),o.removeAttribute(p)}else p.startsWith(Ct)&&(c.push({type:6,index:a}),o.removeAttribute(p));if(ei.test(o.tagName)){const p=o.textContent.split(Ct),b=p.length-1;if(b>0){o.textContent=ke?ke.emptyScript:"";for(let f=0;f<b;f++)o.append(p[f],re()),Mt.nextNode(),c.push({type:2,index:++a});o.append(p[b],re())}}}else if(o.nodeType===8)if(o.data===ti)c.push({type:2,index:a});else{let p=-1;for(;(p=o.data.indexOf(Ct,p+1))!==-1;)c.push({type:7,index:a}),p+=Ct.length-1}a++}}static createElement(e,n){const i=Pt.createElement("template");return i.innerHTML=e,i}}function Nt(t,e,n=t,i){if(e===X)return e;let o=i!==void 0?n._$Co?.[i]:n._$Cl;const a=se(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),a===void 0?o=void 0:(o=new a(t),o._$AT(t,n,i)),i!==void 0?(n._$Co??=[])[i]=o:n._$Cl=o),o!==void 0&&(e=Nt(t,o._$AS(t,e.values),o,i)),e}class Ki{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:i}=this._$AD,o=(e?.creationScope??Pt).importNode(n,!0);Mt.currentNode=o;let a=Mt.nextNode(),r=0,h=0,c=i[0];for(;c!==void 0;){if(r===c.index){let u;c.type===2?u=new he(a,a.nextSibling,this,e):c.type===1?u=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(u=new Zi(a,this,e)),this._$AV.push(u),c=i[++h]}r!==c?.index&&(a=Mt.nextNode(),r++)}return Mt.currentNode=Pt,o}p(e){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}}class he{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,i,o){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Nt(this,e,n),se(e)?e===z||e==null||e===""?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==X&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ui(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==z&&se(this._$AH)?this._$AA.nextSibling.data=e:this.T(Pt.createTextNode(e)),this._$AH=e}$(e){const{values:n,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=le.createElement(ni(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(n);else{const a=new Ki(o,this),r=a.u(this.options);a.p(n),this.T(r),this._$AH=a}}_$AC(e){let n=Ln.get(e.strings);return n===void 0&&Ln.set(e.strings,n=new le(e)),n}k(e){cn(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,o=0;for(const a of e)o===n.length?n.push(i=new he(this.O(re()),this.O(re()),this,this.options)):i=n[o],i._$AI(a),o++;o<n.length&&(this._$AR(i&&i._$AB.nextSibling,o),n.length=o)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ve{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,o,a){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=n,this._$AM=o,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}_$AI(e,n=this,i,o){const a=this.strings;let r=!1;if(a===void 0)e=Nt(this,e,n,0),r=!se(e)||e!==this._$AH&&e!==X,r&&(this._$AH=e);else{const h=e;let c,u;for(e=a[0],c=0;c<a.length-1;c++)u=Nt(this,h[i+c],n,c),u===X&&(u=this._$AH[c]),r||=!se(u)||u!==this._$AH[c],u===z?e=z:e!==z&&(e+=(u??"")+a[c+1]),this._$AH[c]=u}r&&!o&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Yi extends Ve{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}}class Gi extends Ve{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==z)}}class Xi extends Ve{constructor(e,n,i,o,a){super(e,n,i,o,a),this.type=5}_$AI(e,n=this){if((e=Nt(this,e,n,0)??z)===X)return;const i=this._$AH,o=e===z&&i!==z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==z&&(i===z||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Zi{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Nt(this,e)}}const Ji=hn.litHtmlPolyfillSupport;Ji?.(le,he),(hn.litHtmlVersions??=[]).push("3.3.1");const Qi=(t,e,n)=>{const i=n?.renderBefore??e;let o=i._$litPart$;if(o===void 0){const a=n?.renderBefore??null;i._$litPart$=o=new he(e.insertBefore(re(),a),a,void 0,n??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const un=globalThis;let ae=class extends Ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qi(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return X}};ae._$litElement$=!0,ae.finalized=!0,un.litElementHydrateSupport?.({LitElement:ae});const to=un.litElementPolyfillSupport;to?.({LitElement:ae});(un.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const eo=!1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=t=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const no={attribute:!0,type:String,converter:$e,reflect:!1,hasChanged:ln},io=(t=no,e,n)=>{const{kind:i,metadata:o}=n;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(n.name,t),i==="accessor"){const{name:r}=n;return{set(h){const c=e.get.call(this);e.set.call(this,h),this.requestUpdate(r,c,t)},init(h){return h!==void 0&&this.C(r,void 0,t,h),h}}}if(i==="setter"){const{name:r}=n;return function(h){const c=this[r];e.call(this,h),this.requestUpdate(r,c,t)}}throw Error("Unsupported decorator location: "+i)};function l(t){return(e,n)=>typeof n=="object"?io(t,e,n):((i,o,a)=>{const r=o.hasOwnProperty(a);return o.constructor.createProperty(a,i),r?Object.getOwnPropertyDescriptor(o,a):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function oo(t){return(e,n)=>{const i=typeof e=="function"?e:e[n];Object.assign(i,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ii=(t,e,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function C(t,e){return(n,i,o)=>{const a=r=>r.renderRoot?.querySelector(t)??null;return ii(n,i,{get(){return a(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ao;function ro(t){return(e,n)=>ii(e,n,{get(){return(this.renderRoot??(ao??=document.createDocumentFragment())).querySelectorAll(t)}})}var so=`:host {
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
`,ye,U=class extends ae{constructor(){super(),Li(this,ye,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,n)=>{this.internals?.states&&(n?this.internals.states.add(e):this.internals.states.delete(e))},has:e=>this.internals?.states?this.internals.states.has(e):!1};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,n]of t.elementProperties)n.default==="inherit"&&n.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${n.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[so,...t].map(e=>typeof e=="string"?Jn(e):e)}attributeChangedCallback(t,e,n){Vi(this,ye)||(this.constructor.elementProperties.forEach((i,o)=>{i.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o])}),Ri(this,ye,!0)),super.attributeChangedCallback(t,e,n)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,n)=>{t.has(n)&&this[n]==null&&(this[n]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const n=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});n.error=e,this.dispatchEvent(n)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};ye=new WeakMap;s([l()],U.prototype,"dir",2);s([l()],U.prototype,"lang",2);s([l({type:Boolean,reflect:!0,attribute:"did-ssr"})],U.prototype,"didSSR",2);var dn=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},lo=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),W=class extends U{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new dn))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[lo()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const n of e.observedAttributes)t.add(n);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const e=this.value;if(Array.isArray(e)){if(this.name){const n=new FormData;for(const i of e)n.append(this.name,i);this.setValue(n,n)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],n=t[1];let i=t[2];i||(i=this.validationTarget),this.internals.setValidity(e,n,i||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&n),this.customStates.set("user-valid",e&&n)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,n]=t;this.internals.setFormValue(e,n)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},n=this.validationTarget||this.input||void 0;let i="";for(const o of t){const{isValid:a,message:r,invalidKeys:h}=o.checkValidity(this);a||(i||(i=r),h?.length>=0&&h.forEach(c=>e[c]=!0))}i||(i=this.validationMessage),this.setValidity(e,i,n)}};W.formAssociated=!0;s([l({reflect:!0})],W.prototype,"name",2);s([l({type:Boolean})],W.prototype,"disabled",2);s([l({state:!0,attribute:!1})],W.prototype,"valueHasChanged",2);s([l({state:!0,attribute:!1})],W.prototype,"hasInteracted",2);s([l({attribute:"custom-error",reflect:!0})],W.prototype,"customError",2);s([l({attribute:!1,state:!0,type:Object})],W.prototype,"validity",1);var Xt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=n=>{const i=n.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},Lt=`@layer wa-utilities {
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
`,Le=`@layer wa-utilities {
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
`;const Ge=new Set,Ft=new Map;let Ot,pn="ltr",fn="en";const oi=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(oi){const t=new MutationObserver(ri);pn=document.documentElement.dir||"ltr",fn=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ai(...t){t.map(e=>{const n=e.$code.toLowerCase();Ft.has(n)?Ft.set(n,Object.assign(Object.assign({},Ft.get(n)),e)):Ft.set(n,e),Ot||(Ot=e)}),ri()}function ri(){oi&&(pn=document.documentElement.dir||"ltr",fn=document.documentElement.lang||navigator.language),[...Ge.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let ho=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ge.add(this.host)}hostDisconnected(){Ge.delete(this.host)}dir(){return`${this.host.dir||pn}`.toLowerCase()}lang(){return`${this.host.lang||fn}`.toLowerCase()}getTranslationData(e){var n,i;const o=new Intl.Locale(e.replace(/_/g,"-")),a=o?.language.toLowerCase(),r=(i=(n=o?.region)===null||n===void 0?void 0:n.toLowerCase())!==null&&i!==void 0?i:"",h=Ft.get(`${a}-${r}`),c=Ft.get(a);return{locale:o,language:a,region:r,primary:h,secondary:c}}exists(e,n){var i;const{primary:o,secondary:a}=this.getTranslationData((i=n.lang)!==null&&i!==void 0?i:this.lang());return n=Object.assign({includeFallback:!1},n),!!(o&&o[e]||a&&a[e]||n.includeFallback&&Ot&&Ot[e])}term(e,...n){const{primary:i,secondary:o}=this.getTranslationData(this.lang());let a;if(i&&i[e])a=i[e];else if(o&&o[e])a=o[e];else if(Ot&&Ot[e])a=Ot[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof a=="function"?a(...n):a}date(e,n){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),n).format(e)}number(e,n){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),n).format(e)}relativeTime(e,n,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,n)}};var si={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};ai(si);var co=si,lt=class extends ho{};ai(co);function D(t,e){const n={waitUntilFirstUpdate:!1,...e};return(i,o)=>{const{update:a}=i,r=Array.isArray(t)?t:[t];i.update=function(h){r.forEach(c=>{const u=c;if(h.has(u)){const d=h.get(u),p=this[u];d!==p&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[o](d,p)}}),a.call(this,h)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Re=t=>(...e)=>({_$litDirective$:t,values:e});let De=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,i){this._$Ct=e,this._$AM=n,this._$Ci=i}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=Re(class extends De{constructor(t){if(super(t),t.type!==wt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}const n=t.element.classList;for(const i of this.st)i in e||(n.remove(i),this.st.delete(i));for(const i in e){const o=!!e[i];o===this.st.has(i)||this.nt?.has(i)||(o?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return X}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=t=>t??z;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const li=Symbol.for(""),uo=t=>{if(t?.r===li)return t?._$litStatic$},Rn=(t,...e)=>({_$litStatic$:e.reduce((n,i,o)=>n+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[o+1],t[0]),r:li}),Dn=new Map,po=t=>(e,...n)=>{const i=n.length;let o,a;const r=[],h=[];let c,u=0,d=!1;for(;u<i;){for(c=e[u];u<i&&(a=n[u],(o=uo(a))!==void 0);)c+=o+e[++u],d=!0;u!==i&&h.push(a),r.push(c),u++}if(u===i&&r.push(e[i]),d){const p=r.join("$$lit$$");(e=Dn.get(p))===void 0&&(r.raw=r,Dn.set(p,e=r)),n=h}return t(e,...n)},Ie=po(g);var fo=`@layer wa-component {
  :host {
    display: inline-block;
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
`,A=class extends W{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Xt(this,"[default]","start","end"),this.localize=new lt(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button",this.form=null}static get validators(){return[...super.validators,Yn()]}constructLightDOMButton(){const t=document.createElement("button");return t.type=this.type,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.name&&(t.name=this.name),t.value=this.value||"",["form","formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{this.hasAttribute(e)&&t.setAttribute(e,this.getAttribute(e))}),t}handleClick(){if(!this.getForm())return;const e=this.constructLightDOMButton();this.parentElement?.append(e),e.click(),e.remove()}handleInvalid(){this.dispatchEvent(new dn)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,n=!1,i="";[...t].forEach(o=>{o.nodeType===Node.ELEMENT_NODE&&o.localName==="wa-icon"&&(n=!0,e||(e=o.hasAttribute("label"))),o.nodeType===Node.TEXT_NODE&&(i+=o.textContent)}),this.isIconButton=i.trim()===""&&n,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?Rn`a`:Rn`button`;return Ie`
      <${e}
        part="base"
        class=${P({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
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
        ${this.withCaret?Ie`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Ie`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};A.css=[fo,Le,Lt];s([C(".button")],A.prototype,"button",2);s([C("slot:not([name])")],A.prototype,"labelSlot",2);s([R()],A.prototype,"invalid",2);s([R()],A.prototype,"isIconButton",2);s([l()],A.prototype,"title",2);s([l({reflect:!0})],A.prototype,"variant",2);s([l({reflect:!0})],A.prototype,"appearance",2);s([l({reflect:!0})],A.prototype,"size",2);s([l({attribute:"with-caret",type:Boolean,reflect:!0})],A.prototype,"withCaret",2);s([l({type:Boolean})],A.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],A.prototype,"loading",2);s([l({type:Boolean,reflect:!0})],A.prototype,"pill",2);s([l()],A.prototype,"type",2);s([l({reflect:!0})],A.prototype,"name",2);s([l({reflect:!0})],A.prototype,"value",2);s([l({reflect:!0})],A.prototype,"href",2);s([l()],A.prototype,"target",2);s([l()],A.prototype,"rel",2);s([l()],A.prototype,"download",2);s([l({reflect:!0})],A.prototype,"form",2);s([l({attribute:"formaction"})],A.prototype,"formAction",2);s([l({attribute:"formenctype"})],A.prototype,"formEnctype",2);s([l({attribute:"formmethod"})],A.prototype,"formMethod",2);s([l({attribute:"formnovalidate",type:Boolean})],A.prototype,"formNoValidate",2);s([l({attribute:"formtarget"})],A.prototype,"formTarget",2);s([D("disabled",{waitUntilFirstUpdate:!0})],A.prototype,"handleDisabledChange",1);A=s([F("wa-button")],A);var bo=`:host {
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
`,Xe=class extends U{constructor(){super(...arguments),this.localize=new lt(this)}render(){return g`
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
    `}};Xe.css=bo;Xe=s([F("wa-spinner")],Xe);var mo=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}},Ze="",Je="";function On(t){Ze=t}function go(t=""){if(!Ze){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const n=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;On(n)}else{const i=[...document.getElementsByTagName("script")].find(o=>o.src.endsWith("webawesome.js")||o.src.endsWith("webawesome.loader.js")||o.src.endsWith("webawesome.ssr-loader.js"));if(i){const o=String(i.getAttribute("src"));On(o.split("/").slice(0,-1).join("/"))}}}return Ze.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function vo(t){Je=t}function wo(){if(!Je){const t=document.querySelector("[data-fa-kit-code]");t&&vo(t.getAttribute("data-fa-kit-code")||"")}return Je}function yo(t,e,n){const i=wo(),o=i.length>0;let a="solid";return e==="classic"&&(n==="thin"&&(a="thin"),n==="light"&&(a="light"),n==="regular"&&(a="regular"),n==="solid"&&(a="solid")),e==="sharp"&&(n==="thin"&&(a="sharp-thin"),n==="light"&&(a="sharp-light"),n==="regular"&&(a="sharp-regular"),n==="solid"&&(a="sharp-solid")),e==="duotone"&&(n==="thin"&&(a="duotone-thin"),n==="light"&&(a="duotone-light"),n==="regular"&&(a="duotone-regular"),n==="solid"&&(a="duotone")),e==="sharp-duotone"&&(n==="thin"&&(a="sharp-duotone-thin"),n==="light"&&(a="sharp-duotone-light"),n==="regular"&&(a="sharp-duotone-regular"),n==="solid"&&(a="sharp-duotone-solid")),e==="brands"&&(a="brands"),o?`https://ka-p.fontawesome.com/releases/v6.7.2/svgs/${a}/${t}.svg?token=${encodeURIComponent(i)}`:`https://ka-f.fontawesome.com/releases/v6.7.2/svgs/${a}/${t}.svg`}var xo={name:"default",resolver:(t,e="classic",n="solid")=>yo(t,e,n)},$o=xo;function ko(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var He={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714, 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>'}},Eo={name:"system",resolver:(t,e="classic",n="solid")=>{let o=He[n][t]??He.regular[t]??He.regular["circle-question"];return o?ko(o):""}},Co=Eo,So="classic",Ee=[$o,Co],Ce=[];function Ao(t){Ce.push(t)}function _o(t){Ce=Ce.filter(e=>e!==t)}function Fe(t){return Ee.find(e=>e.name===t)}function Tr(t,e){To(t),Ee.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),Ce.forEach(n=>{n.library===t&&n.setIcon()})}function To(t){Ee=Ee.filter(e=>e.name!==t)}function Vo(){return So}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lo=(t,e)=>t?._$litType$!==void 0,Ro=t=>t.strings===void 0,Do={},Oo=(t,e=Do)=>t._$AH=e;var Mo=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},zo=`:host {
  --primary-color: currentColor;
  --primary-opacity: 1;
  --secondary-color: currentColor;
  --secondary-opacity: 0.4;

  display: inline-flex;
  box-sizing: content-box !important;
  width: auto;
  height: 1em;
}

svg {
  display: inline-block;
  width: auto;
  height: inherit;
  fill: currentColor;

  .fa-primary {
    color: var(--primary-color);
    opacity: var(--primary-opacity);
  }

  .fa-secondary {
    color: var(--secondary-color);
    opacity: var(--secondary-opacity);
  }
}

:host([fixed-width]) {
  width: 1em;
  justify-content: center;
}
`,ee=Symbol(),de=Symbol(),qe,Ne=new Map,J=class extends U{constructor(){super(...arguments),this.svg=null,this.label="",this.library="default"}connectedCallback(){super.connectedCallback(),Ao(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),_o(this)}getIconSource(){const t=Fe(this.library),e=this.family||Vo();return this.name&&t?{url:t.resolver(this.name,e,this.variant),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}async resolveIcon(t,e){let n;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=g`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const i=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(i),this.svg}try{if(n=await fetch(t,{mode:"cors"}),!n.ok)return n.status===410?ee:de}catch{return de}try{const i=document.createElement("div");i.innerHTML=await n.text();const o=i.firstElementChild;if(o?.tagName?.toLowerCase()!=="svg")return ee;qe||(qe=new DOMParser);const r=qe.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return r?(r.part.add("svg"),document.adoptNode(r)):ee}catch{return ee}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),n=e?Fe(this.library):void 0;if(!t){this.svg=null;return}let i=Ne.get(t);i||(i=this.resolveIcon(t,n),Ne.set(t,i));const o=await i;if(o===de&&Ne.delete(t),t===this.getIconSource().url){if(Lo(o)){this.svg=o;return}switch(o){case de:case ee:this.svg=null,this.dispatchEvent(new Mo);break;default:this.svg=o.cloneNode(!0),n?.mutator?.(this.svg),this.dispatchEvent(new mo)}}}updated(t){super.updated(t);const e=Fe(this.library),n=this.shadowRoot?.querySelector("svg");n&&e?.mutator?.(n)}render(){return this.hasUpdated?this.svg:g`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`}};J.css=zo;s([R()],J.prototype,"svg",2);s([l()],J.prototype,"name",2);s([l()],J.prototype,"family",2);s([l()],J.prototype,"variant",2);s([l({attribute:"fixed-width",type:Boolean,reflect:!0})],J.prototype,"fixedWidth",2);s([l()],J.prototype,"src",2);s([l()],J.prototype,"label",2);s([l()],J.prototype,"library",2);s([D("label")],J.prototype,"handleLabelChange",1);s([D(["family","name","library","variant","src"])],J.prototype,"setIcon",1);J=s([F("wa-icon")],J);var Po=`:host {
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
`,Bt=class extends U{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return g` <slot part="base" role="status"></slot>`}};Bt.css=[Le,Po];s([l({reflect:!0})],Bt.prototype,"variant",2);s([l({reflect:!0})],Bt.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],Bt.prototype,"pill",2);s([l({reflect:!0})],Bt.prototype,"attention",2);Bt=s([F("wa-badge")],Bt);var bn=(t={})=>{let{validationElement:e,validationProperty:n}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),n||(n="value");const i={observedAttributes:["required"],message:e.validationMessage,checkValidity(o){const a={message:"",isValid:!0,invalidKeys:[]};return(o.required??o.hasAttribute("required"))&&!o[n]&&(a.message=typeof i.message=="function"?i.message(o):i.message||"",a.isValid=!1,a.invalidKeys.push("valueMissing")),a}};return i},ce=`:host {
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
 */const Qe=Re(class extends De{constructor(t){if(super(t),t.type!==wt.PROPERTY&&t.type!==wt.ATTRIBUTE&&t.type!==wt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ro(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===X||e===z)return e;const n=t.element,i=t.name;if(t.type===wt.PROPERTY){if(e===n[i])return X}else if(t.type===wt.BOOLEAN_ATTRIBUTE){if(!!e===n.hasAttribute(i))return X}else if(t.type===wt.ATTRIBUTE&&n.getAttribute(i)===e+"")return X;return Oo(t),e}});var Bo=`:host {
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
`,I=class extends W{constructor(){super(...arguments),this.hasSlotController=new Xt(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint=""}static get validators(){const t=[bn({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){return this._value??"on"}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,n=!this.checked&&this.indeterminate,i=n?"indeterminate":"check",o=n?"indeterminate":"check";return g`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${_(this._value)}
            .indeterminate=${Qe(this.indeterminate)}
            .checked=${Qe(this.checked)}
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
        class="${P({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};I.css=[ce,Lt,Bo];I.shadowRootOptions={...W.shadowRootOptions,delegatesFocus:!0};s([C('input[type="checkbox"]')],I.prototype,"input",2);s([l()],I.prototype,"title",2);s([l({reflect:!0})],I.prototype,"name",2);s([l({reflect:!0})],I.prototype,"value",1);s([l({reflect:!0})],I.prototype,"size",2);s([l({type:Boolean})],I.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],I.prototype,"indeterminate",2);s([l({type:Boolean,attribute:!1})],I.prototype,"checked",2);s([l({type:Boolean,reflect:!0,attribute:"checked"})],I.prototype,"defaultChecked",2);s([l({reflect:!0})],I.prototype,"form",2);s([l({type:Boolean,reflect:!0})],I.prototype,"required",2);s([l()],I.prototype,"hint",2);s([D("defaultChecked")],I.prototype,"handleDefaultCheckedChange",1);s([D(["checked","indeterminate"])],I.prototype,"handleStateChange",1);s([D("disabled")],I.prototype,"handleDisabledChange",1);I=s([F("wa-checkbox")],I);const Io="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let Ho=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=Io[n[t]&63];return e};function V(t,e,n){const i=o=>Object.is(o,-0)?0:o;return t<e?i(e):t>n?i(n):i(t)}function Fo(t=""){return`${t}${Ho()}`}var qo=`:host {
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
`,Ut=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.value=0,this.indeterminate=!1,this.label=""}updated(t){t.has("value")&&requestAnimationFrame(()=>{this.style.setProperty("--percentage",`${V(this.value,0,100)}%`)})}render(){return g`
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
    `}};Ut.css=qo;s([l({type:Number,reflect:!0})],Ut.prototype,"value",2);s([l({type:Boolean,reflect:!0})],Ut.prototype,"indeterminate",2);s([l()],Ut.prototype,"label",2);Ut=s([F("wa-progress-bar")],Ut);var No=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};const At=Math.min,G=Math.max,Se=Math.round,pe=Math.floor,ut=t=>({x:t,y:t}),Uo={left:"right",right:"left",bottom:"top",top:"bottom"},Wo={start:"end",end:"start"};function tn(t,e,n){return G(t,At(e,n))}function Zt(t,e){return typeof t=="function"?t(e):t}function _t(t){return t.split("-")[0]}function Jt(t){return t.split("-")[1]}function hi(t){return t==="x"?"y":"x"}function mn(t){return t==="y"?"height":"width"}const jo=new Set(["top","bottom"]);function yt(t){return jo.has(_t(t))?"y":"x"}function gn(t){return hi(yt(t))}function Ko(t,e,n){n===void 0&&(n=!1);const i=Jt(t),o=gn(t),a=mn(o);let r=o==="x"?i===(n?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(r=Ae(r)),[r,Ae(r)]}function Yo(t){const e=Ae(t);return[en(t),e,en(e)]}function en(t){return t.replace(/start|end/g,e=>Wo[e])}const Mn=["left","right"],zn=["right","left"],Go=["top","bottom"],Xo=["bottom","top"];function Zo(t,e,n){switch(t){case"top":case"bottom":return n?e?zn:Mn:e?Mn:zn;case"left":case"right":return e?Go:Xo;default:return[]}}function Jo(t,e,n,i){const o=Jt(t);let a=Zo(_t(t),n==="start",i);return o&&(a=a.map(r=>r+"-"+o),e&&(a=a.concat(a.map(en)))),a}function Ae(t){return t.replace(/left|right|bottom|top/g,e=>Uo[e])}function Qo(t){return{top:0,right:0,bottom:0,left:0,...t}}function ci(t){return typeof t!="number"?Qo(t):{top:t,right:t,bottom:t,left:t}}function _e(t){const{x:e,y:n,width:i,height:o}=t;return{width:i,height:o,top:n,left:e,right:e+i,bottom:n+o,x:e,y:n}}function Pn(t,e,n){let{reference:i,floating:o}=t;const a=yt(e),r=gn(e),h=mn(r),c=_t(e),u=a==="y",d=i.x+i.width/2-o.width/2,p=i.y+i.height/2-o.height/2,b=i[h]/2-o[h]/2;let f;switch(c){case"top":f={x:d,y:i.y-o.height};break;case"bottom":f={x:d,y:i.y+i.height};break;case"right":f={x:i.x+i.width,y:p};break;case"left":f={x:i.x-o.width,y:p};break;default:f={x:i.x,y:i.y}}switch(Jt(e)){case"start":f[r]-=b*(n&&u?-1:1);break;case"end":f[r]+=b*(n&&u?-1:1);break}return f}const ta=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:a=[],platform:r}=n,h=a.filter(Boolean),c=await(r.isRTL==null?void 0:r.isRTL(e));let u=await r.getElementRects({reference:t,floating:e,strategy:o}),{x:d,y:p}=Pn(u,i,c),b=i,f={},m=0;for(let v=0;v<h.length;v++){const{name:E,fn:x}=h[v],{x:S,y:L,data:H,reset:O}=await x({x:d,y:p,initialPlacement:i,placement:b,strategy:o,middlewareData:f,rects:u,platform:r,elements:{reference:t,floating:e}});d=S??d,p=L??p,f={...f,[E]:{...f[E],...H}},O&&m<=50&&(m++,typeof O=="object"&&(O.placement&&(b=O.placement),O.rects&&(u=O.rects===!0?await r.getElementRects({reference:t,floating:e,strategy:o}):O.rects),{x:d,y:p}=Pn(u,b,c)),v=-1)}return{x:d,y:p,placement:b,strategy:o,middlewareData:f}};async function vn(t,e){var n;e===void 0&&(e={});const{x:i,y:o,platform:a,rects:r,elements:h,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:b=!1,padding:f=0}=Zt(e,t),m=ci(f),E=h[b?p==="floating"?"reference":"floating":p],x=_e(await a.getClippingRect({element:(n=await(a.isElement==null?void 0:a.isElement(E)))==null||n?E:E.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(h.floating)),boundary:u,rootBoundary:d,strategy:c})),S=p==="floating"?{x:i,y:o,width:r.floating.width,height:r.floating.height}:r.reference,L=await(a.getOffsetParent==null?void 0:a.getOffsetParent(h.floating)),H=await(a.isElement==null?void 0:a.isElement(L))?await(a.getScale==null?void 0:a.getScale(L))||{x:1,y:1}:{x:1,y:1},O=_e(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:h,rect:S,offsetParent:L,strategy:c}):S);return{top:(x.top-O.top+m.top)/H.y,bottom:(O.bottom-x.bottom+m.bottom)/H.y,left:(x.left-O.left+m.left)/H.x,right:(O.right-x.right+m.right)/H.x}}const ea=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:i,placement:o,rects:a,platform:r,elements:h,middlewareData:c}=e,{element:u,padding:d=0}=Zt(t,e)||{};if(u==null)return{};const p=ci(d),b={x:n,y:i},f=gn(o),m=mn(f),v=await r.getDimensions(u),E=f==="y",x=E?"top":"left",S=E?"bottom":"right",L=E?"clientHeight":"clientWidth",H=a.reference[m]+a.reference[f]-b[f]-a.floating[m],O=b[f]-a.reference[f],nt=await(r.getOffsetParent==null?void 0:r.getOffsetParent(u));let N=nt?nt[L]:0;(!N||!await(r.isElement==null?void 0:r.isElement(nt)))&&(N=h.floating[L]||a.floating[m]);const mt=H/2-O/2,ht=N/2-v[m]/2-1,tt=At(p[x],ht),xt=At(p[S],ht),ct=tt,$t=N-v[m]-xt,j=N/2-v[m]/2+mt,Rt=tn(ct,j,$t),gt=!c.arrow&&Jt(o)!=null&&j!==Rt&&a.reference[m]/2-(j<ct?tt:xt)-v[m]/2<0,it=gt?j<ct?j-ct:j-$t:0;return{[f]:b[f]+it,data:{[f]:Rt,centerOffset:j-Rt-it,...gt&&{alignmentOffset:it}},reset:gt}}}),na=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,i;const{placement:o,middlewareData:a,rects:r,initialPlacement:h,platform:c,elements:u}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:b,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:v=!0,...E}=Zt(t,e);if((n=a.arrow)!=null&&n.alignmentOffset)return{};const x=_t(o),S=yt(h),L=_t(h)===h,H=await(c.isRTL==null?void 0:c.isRTL(u.floating)),O=b||(L||!v?[Ae(h)]:Yo(h)),nt=m!=="none";!b&&nt&&O.push(...Jo(h,v,m,H));const N=[h,...O],mt=await vn(e,E),ht=[];let tt=((i=a.flip)==null?void 0:i.overflows)||[];if(d&&ht.push(mt[x]),p){const j=Ko(o,r,H);ht.push(mt[j[0]],mt[j[1]])}if(tt=[...tt,{placement:o,overflows:ht}],!ht.every(j=>j<=0)){var xt,ct;const j=(((xt=a.flip)==null?void 0:xt.index)||0)+1,Rt=N[j];if(Rt&&(!(p==="alignment"?S!==yt(Rt):!1)||tt.every(ot=>ot.overflows[0]>0&&yt(ot.placement)===S)))return{data:{index:j,overflows:tt},reset:{placement:Rt}};let gt=(ct=tt.filter(it=>it.overflows[0]<=0).sort((it,ot)=>it.overflows[1]-ot.overflows[1])[0])==null?void 0:ct.placement;if(!gt)switch(f){case"bestFit":{var $t;const it=($t=tt.filter(ot=>{if(nt){const kt=yt(ot.placement);return kt===S||kt==="y"}return!0}).map(ot=>[ot.placement,ot.overflows.filter(kt=>kt>0).reduce((kt,Ai)=>kt+Ai,0)]).sort((ot,kt)=>ot[1]-kt[1])[0])==null?void 0:$t[0];it&&(gt=it);break}case"initialPlacement":gt=h;break}if(o!==gt)return{reset:{placement:gt}}}return{}}}},ia=new Set(["left","top"]);async function oa(t,e){const{placement:n,platform:i,elements:o}=t,a=await(i.isRTL==null?void 0:i.isRTL(o.floating)),r=_t(n),h=Jt(n),c=yt(n)==="y",u=ia.has(r)?-1:1,d=a&&c?-1:1,p=Zt(e,t);let{mainAxis:b,crossAxis:f,alignmentAxis:m}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return h&&typeof m=="number"&&(f=h==="end"?m*-1:m),c?{x:f*d,y:b*u}:{x:b*u,y:f*d}}const aa=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,i;const{x:o,y:a,placement:r,middlewareData:h}=e,c=await oa(e,t);return r===((n=h.offset)==null?void 0:n.placement)&&(i=h.arrow)!=null&&i.alignmentOffset?{}:{x:o+c.x,y:a+c.y,data:{...c,placement:r}}}}},ra=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:i,placement:o}=e,{mainAxis:a=!0,crossAxis:r=!1,limiter:h={fn:E=>{let{x,y:S}=E;return{x,y:S}}},...c}=Zt(t,e),u={x:n,y:i},d=await vn(e,c),p=yt(_t(o)),b=hi(p);let f=u[b],m=u[p];if(a){const E=b==="y"?"top":"left",x=b==="y"?"bottom":"right",S=f+d[E],L=f-d[x];f=tn(S,f,L)}if(r){const E=p==="y"?"top":"left",x=p==="y"?"bottom":"right",S=m+d[E],L=m-d[x];m=tn(S,m,L)}const v=h.fn({...e,[b]:f,[p]:m});return{...v,data:{x:v.x-n,y:v.y-i,enabled:{[b]:a,[p]:r}}}}}},sa=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,i;const{placement:o,rects:a,platform:r,elements:h}=e,{apply:c=()=>{},...u}=Zt(t,e),d=await vn(e,u),p=_t(o),b=Jt(o),f=yt(o)==="y",{width:m,height:v}=a.floating;let E,x;p==="top"||p==="bottom"?(E=p,x=b===(await(r.isRTL==null?void 0:r.isRTL(h.floating))?"start":"end")?"left":"right"):(x=p,E=b==="end"?"top":"bottom");const S=v-d.top-d.bottom,L=m-d.left-d.right,H=At(v-d[E],S),O=At(m-d[x],L),nt=!e.middlewareData.shift;let N=H,mt=O;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(mt=L),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(N=S),nt&&!b){const tt=G(d.left,0),xt=G(d.right,0),ct=G(d.top,0),$t=G(d.bottom,0);f?mt=m-2*(tt!==0||xt!==0?tt+xt:G(d.left,d.right)):N=v-2*(ct!==0||$t!==0?ct+$t:G(d.top,d.bottom))}await c({...e,availableWidth:mt,availableHeight:N});const ht=await r.getDimensions(h.floating);return m!==ht.width||v!==ht.height?{reset:{rects:!0}}:{}}}};function Oe(){return typeof window<"u"}function Qt(t){return ui(t)?(t.nodeName||"").toLowerCase():"#document"}function Z(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function bt(t){var e;return(e=(ui(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function ui(t){return Oe()?t instanceof Node||t instanceof Z(t).Node:!1}function at(t){return Oe()?t instanceof Element||t instanceof Z(t).Element:!1}function dt(t){return Oe()?t instanceof HTMLElement||t instanceof Z(t).HTMLElement:!1}function Bn(t){return!Oe()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Z(t).ShadowRoot}const la=new Set(["inline","contents"]);function ue(t){const{overflow:e,overflowX:n,overflowY:i,display:o}=rt(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!la.has(o)}const ha=new Set(["table","td","th"]);function ca(t){return ha.has(Qt(t))}const ua=[":popover-open",":modal"];function Me(t){return ua.some(e=>{try{return t.matches(e)}catch{return!1}})}const da=["transform","translate","scale","rotate","perspective"],pa=["transform","translate","scale","rotate","perspective","filter"],fa=["paint","layout","strict","content"];function ze(t){const e=wn(),n=at(t)?rt(t):t;return da.some(i=>n[i]?n[i]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||pa.some(i=>(n.willChange||"").includes(i))||fa.some(i=>(n.contain||"").includes(i))}function ba(t){let e=Tt(t);for(;dt(e)&&!Wt(e);){if(ze(e))return e;if(Me(e))return null;e=Tt(e)}return null}function wn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const ma=new Set(["html","body","#document"]);function Wt(t){return ma.has(Qt(t))}function rt(t){return Z(t).getComputedStyle(t)}function Pe(t){return at(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Tt(t){if(Qt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Bn(t)&&t.host||bt(t);return Bn(e)?e.host:e}function di(t){const e=Tt(t);return Wt(e)?t.ownerDocument?t.ownerDocument.body:t.body:dt(e)&&ue(e)?e:di(e)}function jt(t,e,n){var i;e===void 0&&(e=[]),n===void 0&&(n=!0);const o=di(t),a=o===((i=t.ownerDocument)==null?void 0:i.body),r=Z(o);if(a){const h=nn(r);return e.concat(r,r.visualViewport||[],ue(o)?o:[],h&&n?jt(h):[])}return e.concat(o,jt(o,[],n))}function nn(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function pi(t){const e=rt(t);let n=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const o=dt(t),a=o?t.offsetWidth:n,r=o?t.offsetHeight:i,h=Se(n)!==a||Se(i)!==r;return h&&(n=a,i=r),{width:n,height:i,$:h}}function yn(t){return at(t)?t:t.contextElement}function qt(t){const e=yn(t);if(!dt(e))return ut(1);const n=e.getBoundingClientRect(),{width:i,height:o,$:a}=pi(e);let r=(a?Se(n.width):n.width)/i,h=(a?Se(n.height):n.height)/o;return(!r||!Number.isFinite(r))&&(r=1),(!h||!Number.isFinite(h))&&(h=1),{x:r,y:h}}const ga=ut(0);function fi(t){const e=Z(t);return!wn()||!e.visualViewport?ga:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function va(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==Z(t)?!1:e}function It(t,e,n,i){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),a=yn(t);let r=ut(1);e&&(i?at(i)&&(r=qt(i)):r=qt(t));const h=va(a,n,i)?fi(a):ut(0);let c=(o.left+h.x)/r.x,u=(o.top+h.y)/r.y,d=o.width/r.x,p=o.height/r.y;if(a){const b=Z(a),f=i&&at(i)?Z(i):i;let m=b,v=nn(m);for(;v&&i&&f!==m;){const E=qt(v),x=v.getBoundingClientRect(),S=rt(v),L=x.left+(v.clientLeft+parseFloat(S.paddingLeft))*E.x,H=x.top+(v.clientTop+parseFloat(S.paddingTop))*E.y;c*=E.x,u*=E.y,d*=E.x,p*=E.y,c+=L,u+=H,m=Z(v),v=nn(m)}}return _e({width:d,height:p,x:c,y:u})}function xn(t,e){const n=Pe(t).scrollLeft;return e?e.left+n:It(bt(t)).left+n}function bi(t,e,n){n===void 0&&(n=!1);const i=t.getBoundingClientRect(),o=i.left+e.scrollLeft-(n?0:xn(t,i)),a=i.top+e.scrollTop;return{x:o,y:a}}function wa(t){let{elements:e,rect:n,offsetParent:i,strategy:o}=t;const a=o==="fixed",r=bt(i),h=e?Me(e.floating):!1;if(i===r||h&&a)return n;let c={scrollLeft:0,scrollTop:0},u=ut(1);const d=ut(0),p=dt(i);if((p||!p&&!a)&&((Qt(i)!=="body"||ue(r))&&(c=Pe(i)),dt(i))){const f=It(i);u=qt(i),d.x=f.x+i.clientLeft,d.y=f.y+i.clientTop}const b=r&&!p&&!a?bi(r,c,!0):ut(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+d.x+b.x,y:n.y*u.y-c.scrollTop*u.y+d.y+b.y}}function ya(t){return Array.from(t.getClientRects())}function xa(t){const e=bt(t),n=Pe(t),i=t.ownerDocument.body,o=G(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),a=G(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let r=-n.scrollLeft+xn(t);const h=-n.scrollTop;return rt(i).direction==="rtl"&&(r+=G(e.clientWidth,i.clientWidth)-o),{width:o,height:a,x:r,y:h}}function $a(t,e){const n=Z(t),i=bt(t),o=n.visualViewport;let a=i.clientWidth,r=i.clientHeight,h=0,c=0;if(o){a=o.width,r=o.height;const u=wn();(!u||u&&e==="fixed")&&(h=o.offsetLeft,c=o.offsetTop)}return{width:a,height:r,x:h,y:c}}const ka=new Set(["absolute","fixed"]);function Ea(t,e){const n=It(t,!0,e==="fixed"),i=n.top+t.clientTop,o=n.left+t.clientLeft,a=dt(t)?qt(t):ut(1),r=t.clientWidth*a.x,h=t.clientHeight*a.y,c=o*a.x,u=i*a.y;return{width:r,height:h,x:c,y:u}}function In(t,e,n){let i;if(e==="viewport")i=$a(t,n);else if(e==="document")i=xa(bt(t));else if(at(e))i=Ea(e,n);else{const o=fi(t);i={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return _e(i)}function mi(t,e){const n=Tt(t);return n===e||!at(n)||Wt(n)?!1:rt(n).position==="fixed"||mi(n,e)}function Ca(t,e){const n=e.get(t);if(n)return n;let i=jt(t,[],!1).filter(h=>at(h)&&Qt(h)!=="body"),o=null;const a=rt(t).position==="fixed";let r=a?Tt(t):t;for(;at(r)&&!Wt(r);){const h=rt(r),c=ze(r);!c&&h.position==="fixed"&&(o=null),(a?!c&&!o:!c&&h.position==="static"&&!!o&&ka.has(o.position)||ue(r)&&!c&&mi(t,r))?i=i.filter(d=>d!==r):o=h,r=Tt(r)}return e.set(t,i),i}function Sa(t){let{element:e,boundary:n,rootBoundary:i,strategy:o}=t;const r=[...n==="clippingAncestors"?Me(e)?[]:Ca(e,this._c):[].concat(n),i],h=r[0],c=r.reduce((u,d)=>{const p=In(e,d,o);return u.top=G(p.top,u.top),u.right=At(p.right,u.right),u.bottom=At(p.bottom,u.bottom),u.left=G(p.left,u.left),u},In(e,h,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Aa(t){const{width:e,height:n}=pi(t);return{width:e,height:n}}function _a(t,e,n){const i=dt(e),o=bt(e),a=n==="fixed",r=It(t,!0,a,e);let h={scrollLeft:0,scrollTop:0};const c=ut(0);function u(){c.x=xn(o)}if(i||!i&&!a)if((Qt(e)!=="body"||ue(o))&&(h=Pe(e)),i){const f=It(e,!0,a,e);c.x=f.x+e.clientLeft,c.y=f.y+e.clientTop}else o&&u();a&&!i&&o&&u();const d=o&&!i&&!a?bi(o,h):ut(0),p=r.left+h.scrollLeft-c.x-d.x,b=r.top+h.scrollTop-c.y-d.y;return{x:p,y:b,width:r.width,height:r.height}}function Ue(t){return rt(t).position==="static"}function Hn(t,e){if(!dt(t)||rt(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return bt(t)===n&&(n=n.ownerDocument.body),n}function gi(t,e){const n=Z(t);if(Me(t))return n;if(!dt(t)){let o=Tt(t);for(;o&&!Wt(o);){if(at(o)&&!Ue(o))return o;o=Tt(o)}return n}let i=Hn(t,e);for(;i&&ca(i)&&Ue(i);)i=Hn(i,e);return i&&Wt(i)&&Ue(i)&&!ze(i)?n:i||ba(t)||n}const Ta=async function(t){const e=this.getOffsetParent||gi,n=this.getDimensions,i=await n(t.floating);return{reference:_a(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function Va(t){return rt(t).direction==="rtl"}const xe={convertOffsetParentRelativeRectToViewportRelativeRect:wa,getDocumentElement:bt,getClippingRect:Sa,getOffsetParent:gi,getElementRects:Ta,getClientRects:ya,getDimensions:Aa,getScale:qt,isElement:at,isRTL:Va};function vi(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function La(t,e){let n=null,i;const o=bt(t);function a(){var h;clearTimeout(i),(h=n)==null||h.disconnect(),n=null}function r(h,c){h===void 0&&(h=!1),c===void 0&&(c=1),a();const u=t.getBoundingClientRect(),{left:d,top:p,width:b,height:f}=u;if(h||e(),!b||!f)return;const m=pe(p),v=pe(o.clientWidth-(d+b)),E=pe(o.clientHeight-(p+f)),x=pe(d),L={rootMargin:-m+"px "+-v+"px "+-E+"px "+-x+"px",threshold:G(0,At(1,c))||1};let H=!0;function O(nt){const N=nt[0].intersectionRatio;if(N!==c){if(!H)return r();N?r(!1,N):i=setTimeout(()=>{r(!1,1e-7)},1e3)}N===1&&!vi(u,t.getBoundingClientRect())&&r(),H=!1}try{n=new IntersectionObserver(O,{...L,root:o.ownerDocument})}catch{n=new IntersectionObserver(O,L)}n.observe(t)}return r(!0),a}function Ra(t,e,n,i){i===void 0&&(i={});const{ancestorScroll:o=!0,ancestorResize:a=!0,elementResize:r=typeof ResizeObserver=="function",layoutShift:h=typeof IntersectionObserver=="function",animationFrame:c=!1}=i,u=yn(t),d=o||a?[...u?jt(u):[],...jt(e)]:[];d.forEach(x=>{o&&x.addEventListener("scroll",n,{passive:!0}),a&&x.addEventListener("resize",n)});const p=u&&h?La(u,n):null;let b=-1,f=null;r&&(f=new ResizeObserver(x=>{let[S]=x;S&&S.target===u&&f&&(f.unobserve(e),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var L;(L=f)==null||L.observe(e)})),n()}),u&&!c&&f.observe(u),f.observe(e));let m,v=c?It(t):null;c&&E();function E(){const x=It(t);v&&!vi(v,x)&&n(),v=x,m=requestAnimationFrame(E)}return n(),()=>{var x;d.forEach(S=>{o&&S.removeEventListener("scroll",n),a&&S.removeEventListener("resize",n)}),p?.(),(x=f)==null||x.disconnect(),f=null,c&&cancelAnimationFrame(m)}}const Da=aa,Oa=ra,Ma=na,Fn=sa,za=ea,Pa=(t,e,n)=>{const i=new Map,o={platform:xe,...n},a={...o.platform,_c:i};return ta(t,e,{...o,platform:a})};function Ba(t){return Ia(t)}function We(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Ia(t){for(let e=t;e;e=We(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=We(t);e;e=We(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||ze(n)||e.tagName==="BODY"))return e}return null}var Ha=`:host {
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
`;function qn(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var fe=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),T=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),n=this.placement.includes("top")||this.placement.includes("bottom");let i=0,o=0,a=0,r=0,h=0,c=0,u=0,d=0;n?t.top<e.top?(i=t.left,o=t.bottom,a=t.right,r=t.bottom,h=e.left,c=e.top,u=e.right,d=e.top):(i=e.left,o=e.bottom,a=e.right,r=e.bottom,h=t.left,c=t.top,u=t.right,d=t.top):t.left<e.left?(i=t.right,o=t.top,a=e.left,r=e.top,h=t.right,c=t.bottom,u=e.left,d=e.bottom):(i=e.right,o=e.top,a=t.left,r=t.top,h=e.right,c=e.bottom,u=t.left,d=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${d}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||qn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=Ra(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Da({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Fn({apply:({rects:i})=>{const o=this.sync==="width"||this.sync==="both",a=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=a?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;fe&&!qn(this.anchor)&&this.boundary==="scroll"&&(e=jt(this.anchorEl).filter(i=>i instanceof Element)),this.flip&&t.push(Ma({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Oa({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(Fn({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(za({element:this.arrowEl,padding:this.arrowPadding}));const n=fe?i=>xe.getOffsetParent(i,Ba):xe.getOffsetParent;Pa(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:fe?"absolute":"fixed",platform:{...xe,getOffsetParent:n}}).then(({x:i,y:o,middlewareData:a,placement:r})=>{const h=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){const u=a.arrow.x,d=a.arrow.y;let p="",b="",f="",m="";if(this.arrowPlacement==="start"){const v=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",b=h?v:"",m=h?"":v}else if(this.arrowPlacement==="end"){const v=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";b=h?"":v,m=h?v:"",f=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(m=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(m=typeof u=="number"?`${u}px`:"",p=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:p,right:b,bottom:f,left:m,[c]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new No)}render(){return g`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${P({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${P({popup:!0,"popup-active":this.active,"popup-fixed":!fe,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?g`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};T.css=Ha;s([C(".popup")],T.prototype,"popup",2);s([C(".arrow")],T.prototype,"arrowEl",2);s([l()],T.prototype,"anchor",2);s([l({type:Boolean,reflect:!0})],T.prototype,"active",2);s([l({reflect:!0})],T.prototype,"placement",2);s([l()],T.prototype,"boundary",2);s([l({type:Number})],T.prototype,"distance",2);s([l({type:Number})],T.prototype,"skidding",2);s([l({type:Boolean})],T.prototype,"arrow",2);s([l({attribute:"arrow-placement"})],T.prototype,"arrowPlacement",2);s([l({attribute:"arrow-padding",type:Number})],T.prototype,"arrowPadding",2);s([l({type:Boolean})],T.prototype,"flip",2);s([l({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],T.prototype,"flipFallbackPlacements",2);s([l({attribute:"flip-fallback-strategy"})],T.prototype,"flipFallbackStrategy",2);s([l({type:Object})],T.prototype,"flipBoundary",2);s([l({attribute:"flip-padding",type:Number})],T.prototype,"flipPadding",2);s([l({type:Boolean})],T.prototype,"shift",2);s([l({type:Object})],T.prototype,"shiftBoundary",2);s([l({attribute:"shift-padding",type:Number})],T.prototype,"shiftPadding",2);s([l({attribute:"auto-size"})],T.prototype,"autoSize",2);s([l()],T.prototype,"sync",2);s([l({type:Object})],T.prototype,"autoSizeBoundary",2);s([l({attribute:"auto-size-padding",type:Number})],T.prototype,"autoSizePadding",2);s([l({attribute:"hover-bridge",type:Boolean})],T.prototype,"hoverBridge",2);T=s([F("wa-popup")],T);var wi=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},yi=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},xi=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},$i=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};function Kt(t,e){return new Promise(n=>{function i(o){o.target===t&&(t.removeEventListener(e,i),n())}t.addEventListener(e,i)})}function Yt(t,e){return new Promise(n=>{const i=new AbortController,{signal:o}=i;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let a=()=>{t.classList.remove(e),n(),i.abort()};t.addEventListener("animationend",a,{once:!0,signal:o}),t.addEventListener("animationcancel",a,{once:!0,signal:o})})}var Fa=`:host {
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
  padding: 0.25em 0.5em;
  user-select: none;
  -webkit-user-select: none;
}
`,B=class extends U{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),this.hideDelay))}}connectedCallback(){super.connectedCallback(),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=Fo("wa-tooltip-"))}disconnectedCallback(){if(super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor){const t=this.anchor.getAttribute("aria-labelledby")||"";this.anchor.setAttribute("aria-labelledby",t.replace(this.id,""))}}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){if(this.open){if(this.disabled)return;const t=new $i;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await Yt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new yi)}else{const t=new xi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await Yt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new wi)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.querySelector(`#${this.for}`):null,n=this.anchor;if(e===n)return;const{signal:i}=this.eventController,o=new RegExp(`\\b${this.id}\\b`);if(e){const a=e.getAttribute("aria-labelledby")||"";a.match(o)||e.setAttribute("aria-labelledby",a+" "+this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:i}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:i}),e.addEventListener("click",this.handleClick,{signal:i}),e.addEventListener("mouseover",this.handleMouseOver,{signal:i}),e.addEventListener("mouseout",this.handleMouseOut,{signal:i})}if(n){const a=n.getAttribute("aria-labelledby")||"";n.setAttribute("aria-labelledby",a.replace(o,"")),n.removeEventListener("blur",this.handleBlur,{capture:!0}),n.removeEventListener("focus",this.handleFocus,{capture:!0}),n.removeEventListener("click",this.handleClick),n.removeEventListener("mouseover",this.handleMouseOver),n.removeEventListener("mouseout",this.handleMouseOut)}this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Kt(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Kt(this,"wa-after-hide")}render(){return g`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${P({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        arrow
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};B.css=Fa;B.dependencies={"wa-popup":T};s([C("slot:not([name])")],B.prototype,"defaultSlot",2);s([C(".body")],B.prototype,"body",2);s([C("wa-popup")],B.prototype,"popup",2);s([l()],B.prototype,"placement",2);s([l({type:Boolean,reflect:!0})],B.prototype,"disabled",2);s([l({type:Number})],B.prototype,"distance",2);s([l({type:Boolean,reflect:!0})],B.prototype,"open",2);s([l({type:Number})],B.prototype,"skidding",2);s([l({attribute:"show-delay",type:Number})],B.prototype,"showDelay",2);s([l({attribute:"hide-delay",type:Number})],B.prototype,"hideDelay",2);s([l()],B.prototype,"trigger",2);s([l()],B.prototype,"for",2);s([R()],B.prototype,"anchor",2);s([D("open",{waitUntilFirstUpdate:!0})],B.prototype,"handleOpenChange",1);s([D("for")],B.prototype,"handleForChange",1);s([D(["distance","placement","skidding"])],B.prototype,"handleOptionsChange",1);s([D("disabled")],B.prototype,"handleDisabledChange",1);B=s([F("wa-tooltip")],B);var ki=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};function Ei(t,e){const n=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!n&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&qa(e)})}function qa(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const n=[...e.elements];if(n.length===1){e.requestSubmit(null);return}const i=n.find(o=>o.type==="submit"&&!o.matches(":disabled"));i&&(["input","button"].includes(i.localName)?e.requestSubmit(i):i.click())}var Na=`:host {
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
`,y=class extends W{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Xt(this,"hint","label"),this.localize=new lt(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.form=null,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Yn()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new ki),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){Ei(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,n="none"){this.input.setSelectionRange(t,e,n)}setRangeText(t,e,n,i="preserve"){const o=e??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(t,o,a,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,i=this.hint?!0:!!e,o=this.withClear&&!this.disabled&&!this.readonly,a=this.hasUpdated&&o&&(typeof this.value=="number"||this.value&&this.value.length>0);return g`
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
          .value=${Qe(this.value||"")}
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

        ${a?g`
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
        class=${P({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};y.css=[Lt,ce,Na];y.shadowRootOptions={...W.shadowRootOptions,delegatesFocus:!0};s([C("input")],y.prototype,"input",2);s([l()],y.prototype,"title",2);s([l({reflect:!0})],y.prototype,"type",2);s([R()],y.prototype,"value",1);s([l({attribute:"value",reflect:!0})],y.prototype,"defaultValue",2);s([l({reflect:!0})],y.prototype,"size",2);s([l({reflect:!0})],y.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],y.prototype,"pill",2);s([l()],y.prototype,"label",2);s([l({attribute:"hint"})],y.prototype,"hint",2);s([l({attribute:"with-clear",type:Boolean})],y.prototype,"withClear",2);s([l()],y.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],y.prototype,"readonly",2);s([l({attribute:"password-toggle",type:Boolean})],y.prototype,"passwordToggle",2);s([l({attribute:"password-visible",type:Boolean})],y.prototype,"passwordVisible",2);s([l({attribute:"without-spin-buttons",type:Boolean})],y.prototype,"withoutSpinButtons",2);s([l({reflect:!0})],y.prototype,"form",2);s([l({type:Boolean,reflect:!0})],y.prototype,"required",2);s([l()],y.prototype,"pattern",2);s([l({type:Number})],y.prototype,"minlength",2);s([l({type:Number})],y.prototype,"maxlength",2);s([l()],y.prototype,"min",2);s([l()],y.prototype,"max",2);s([l()],y.prototype,"step",2);s([l()],y.prototype,"autocapitalize",2);s([l()],y.prototype,"autocorrect",2);s([l()],y.prototype,"autocomplete",2);s([l({type:Boolean})],y.prototype,"autofocus",2);s([l()],y.prototype,"enterkeyhint",2);s([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],y.prototype,"spellcheck",2);s([l()],y.prototype,"inputmode",2);s([l({attribute:"with-label",type:Boolean})],y.prototype,"withLabel",2);s([l({attribute:"with-hint",type:Boolean})],y.prototype,"withHint",2);s([D("step",{waitUntilFirstUpdate:!0})],y.prototype,"handleStepChange",1);y=s([F("wa-input")],y);function je(t,e){function n(o){const a=t.getBoundingClientRect(),r=t.ownerDocument.defaultView,h=a.left+r.pageXOffset,c=a.top+r.pageYOffset,u=o.pageX-h,d=o.pageY-c;e?.onMove&&e.onMove(u,d)}function i(){document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",i),e?.onStop&&e.onStop()}document.addEventListener("pointermove",n,{passive:!0}),document.addEventListener("pointerup",i),e?.initialEvent instanceof PointerEvent&&n(e.initialEvent)}var vt=typeof window<"u"&&"ontouchstart"in window,be=class{constructor(t,e){this.isActive=!1,this.isDragging=!1,this.handleDragStart=n=>{const i=vt&&"touches"in n?n.touches[0].clientX:n.clientX,o=vt&&"touches"in n?n.touches[0].clientY:n.clientY;n.preventDefault(),!(this.isDragging||!vt&&n.buttons>1)&&(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),this.options.start(i,o))},this.handleDragStop=n=>{const i=vt&&"touches"in n?n.touches[0].clientX:n.clientX,o=vt&&"touches"in n?n.touches[0].clientY:n.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.options.stop(i,o)},this.handleDragMove=n=>{const i=vt&&"touches"in n?n.touches[0].clientX:n.clientX,o=vt&&"touches"in n?n.touches[0].clientY:n.clientY;window.getSelection()?.removeAllRanges(),this.options.move(i,o)},this.element=t,this.options={start:()=>{},stop:()=>{},move:()=>{},...e},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),vt&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.element.removeEventListener("pointerdown",this.handleDragStart),vt&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(t!==void 0?t:!this.isActive)?this.start():this.stop()}},Ua=()=>{const t=Object.assign(document.createElement("input"),{type:"range",required:!0});return{observedAttributes:["required","min","max","step"],checkValidity(e){const n={message:"",isValid:!0,invalidKeys:[]},i=(o,a,r,h)=>{const c=document.createElement("input");return c.type="range",c.min=String(a),c.max=String(r),c.step=String(h),c.value=String(o),c.checkValidity(),c.validationMessage};if(e.required&&!e.hasInteracted)return n.isValid=!1,n.invalidKeys.push("valueMissing"),n.message=t.validationMessage||"Please fill out this field.",n;if(e.isRange){const o=e.minValue,a=e.maxValue;if(o<e.min)return n.isValid=!1,n.invalidKeys.push("rangeUnderflow"),n.message=i(o,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,n;if(a>e.max)return n.isValid=!1,n.invalidKeys.push("rangeOverflow"),n.message=i(a,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,n;if(e.step&&e.step!==1){const r=(o-e.min)%e.step!==0,h=(a-e.min)%e.step!==0;if(r||h){n.isValid=!1,n.invalidKeys.push("stepMismatch");const c=r?o:a;return n.message=i(c,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,n}}}else{const o=e.value;if(o<e.min)return n.isValid=!1,n.invalidKeys.push("rangeUnderflow"),n.message=i(o,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,n;if(o>e.max)return n.isValid=!1,n.invalidKeys.push("rangeOverflow"),n.message=i(o,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,n;if(e.step&&e.step!==1&&(o-e.min)%e.step!==0)return n.isValid=!1,n.invalidKeys.push("stepMismatch"),n.message=i(o,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,n}return n}}},Wa=`:host {
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
`,$=class extends W{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new Xt(this,"hint","label"),this.localize=new lt(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=this.defaultValue,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.form=null,this.min=0,this.max=100,this.step=1,this.required=!1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1}static get validators(){return[...super.validators,Ua()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new be(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new be(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new be(this.track,{start:(t,e)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{const n=this.getValueFromCoordinates(t,e),i=Math.abs(n-this.minValue),o=Math.abs(n-this.maxValue);if(i===o)if(n>this.maxValue)this.activeThumb="max";else if(n<this.minValue)this.activeThumb="min";else{const a=this.localize.dir()==="rtl",r=this.orientation==="vertical",h=r?e:t,c=this.lastTrackPosition||h;this.lastTrackPosition=h;const u=h>c!==a&&!r||h<c&&r;this.activeThumb=u?"max":"min"}else this.activeThumb=i<=o?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,e,this.activeThumb),this.showRangeTooltips()},move:(t,e)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,e,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb==="min"?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new be(this.slider,{start:(t,e)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,e),this.showTooltip()},move:(t,e)=>{this.setValueFromCoordinates(t,e)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}updated(t){if(t.has("range")&&this.requestUpdate(),this.isRange?(t.has("minValue")||t.has("maxValue"))&&(this.minValue=V(this.minValue,this.min,this.maxValue),this.maxValue=V(this.maxValue,this.minValue,this.max),this.updateFormValue()):t.has("value")&&(this.value=V(this.value,this.min,this.max),this.setValue(String(this.value))),(t.has("min")||t.has("max"))&&(this.isRange?(this.minValue=V(this.minValue,this.min,this.max),this.maxValue=V(this.maxValue,this.min,this.max)):this.value=V(this.value,this.min,this.max)),t.has("disabled")&&this.customStates.set("disabled",this.disabled),t.has("disabled")||t.has("readonly")){const e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):this.value=parseFloat(this.getAttribute("value")??String(this.min)),this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){const e=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length;return t=Math.round(t/this.step)*this.step,t=V(t,this.min,this.max),parseFloat(t.toFixed(e))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,e){const n=this.localize.dir()==="rtl",i=this.orientation==="vertical",{top:o,right:a,bottom:r,left:h,height:c,width:u}=this.trackBoundingClientRect,d=i?e:t,p=i?{start:o,end:r,size:c}:{start:h,end:a,size:u},f=(i||n?p.end-d:d-p.start)/p.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*f)}handleBlur(){this.isRange?requestAnimationFrame(()=>{const t=this.shadowRoot?.activeElement;t===this.thumbMin||t===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){const e=t.target;this.isRange?(e===this.thumbMin?this.activeThumb="min":e===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){const e=this.localize.dir()==="rtl",n=t.target;if(this.disabled||this.readonly||this.isRange&&(n===this.thumbMin?this.activeThumb="min":n===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;const i=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value;let o=i;switch(t.key){case"ArrowUp":case(e?"ArrowLeft":"ArrowRight"):t.preventDefault(),o=this.clampAndRoundToStep(i+this.step);break;case"ArrowDown":case(e?"ArrowRight":"ArrowLeft"):t.preventDefault(),o=this.clampAndRoundToStep(i-this.step);break;case"Home":t.preventDefault(),o=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),o=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();const a=Math.max(i+(this.max-this.min)/10,i+this.step);o=this.clampAndRoundToStep(a);break;case"PageDown":t.preventDefault();const r=Math.min(i-(this.max-this.min)/10,i-this.step);o=this.clampAndRoundToStep(r);break;case"Enter":Ei(t,this);return}o!==i&&(this.isRange?(this.activeThumb==="min"?o>this.maxValue?(this.maxValue=o,this.minValue=o):this.minValue=Math.max(this.min,o):o<this.minValue?(this.minValue=o,this.maxValue=o):this.maxValue=Math.min(this.max,o),this.updateFormValue()):this.value=V(o,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,e){const n=this.value;this.value=this.getValueFromCoordinates(t,e),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,e,n){const i=this.getValueFromCoordinates(t,e),o=n==="min"?this.minValue:this.maxValue;n==="min"?i>this.maxValue?(this.maxValue=i,this.minValue=i):this.minValue=Math.max(this.min,i):i<this.minValue?(this.minValue=i,this.maxValue=i):this.maxValue=Math.min(this.max,i),o!==(n==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){this.withTooltip&&this.tooltips.forEach(t=>{t.open=!0})}hideRangeTooltips(){this.withTooltip&&this.tooltips.forEach(t=>{t.open=!1})}updateFormValue(){if(this.isRange){const t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){const t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=V(t,this.min,this.maxValue),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){const t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=V(t,this.minValue,this.max),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("hint"),n=this.label?!0:!!t,i=this.hint?!0:!!e,o=this.hasSlotController.test("reference"),a=P({small:this.size==="small",medium:this.size==="medium",large:this.size==="large",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),r=[];if(this.withMarkers)for(let b=this.min;b<=this.max;b+=this.step)r.push(this.getPercentageFromValue(b));const h=g`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${P({vh:!n})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,c=g`
      <div
        id="hint"
        part="hint"
        class=${P({"has-slotted":i})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,u=this.withMarkers?g`
          <div id="markers" part="markers">
            ${r.map(b=>g`<span part="marker" class="marker" style="--position: ${b}%"></span>`)}
          </div>
        `:"",d=o?g`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",p=(b,f)=>this.withTooltip?g`
            <wa-tooltip
              id=${`tooltip${b!=="thumb"?"-"+b:""}`}
              part="tooltip"
              exportparts="
                tooltip:tooltip__tooltip,
                content:tooltip__content,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${b}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(f):this.localize.number(f)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){const b=V(this.getPercentageFromValue(this.minValue),0,100),f=V(this.getPercentageFromValue(this.maxValue),0,100);return g`
        ${h}

        <div id="slider" part="slider" class=${a}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style="--start: ${Math.min(b,f)}%; --end: ${Math.max(b,f)}%"
            ></div>

            ${u}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style="--position: ${b}%"
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
      `}else{const b=V(this.getPercentageFromValue(this.value),0,100),f=V(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return g`
        ${h}

        <div
          id="slider"
          part="slider"
          class=${a}
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
              style="--start: ${f}%; --end: ${b}%"
            ></div>

            ${u}
            <span id="thumb" part="thumb" style="--position: ${b}%"></span>
          </div>

          ${d} ${c}
        </div>

        ${p("thumb",this.value)}
      `}}};$.formAssociated=!0;$.observeSlots=!0;$.css=[Lt,ce,Wa];s([C("#slider")],$.prototype,"slider",2);s([C("#thumb")],$.prototype,"thumb",2);s([C("#thumb-min")],$.prototype,"thumbMin",2);s([C("#thumb-max")],$.prototype,"thumbMax",2);s([C("#track")],$.prototype,"track",2);s([C("#tooltip")],$.prototype,"tooltip",2);s([ro("wa-tooltip")],$.prototype,"tooltips",2);s([l()],$.prototype,"label",2);s([l({attribute:"hint"})],$.prototype,"hint",2);s([l({reflect:!0})],$.prototype,"name",2);s([l({type:Number,attribute:"min-value"})],$.prototype,"minValue",2);s([l({type:Number,attribute:"max-value"})],$.prototype,"maxValue",2);s([l({attribute:"value",reflect:!0,type:Number})],$.prototype,"defaultValue",2);s([R()],$.prototype,"value",1);s([l({type:Boolean,reflect:!0})],$.prototype,"range",2);s([l({type:Boolean})],$.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],$.prototype,"readonly",2);s([l({reflect:!0})],$.prototype,"orientation",2);s([l({reflect:!0})],$.prototype,"size",2);s([l({attribute:"indicator-offset",type:Number})],$.prototype,"indicatorOffset",2);s([l({reflect:!0})],$.prototype,"form",2);s([l({type:Number})],$.prototype,"min",2);s([l({type:Number})],$.prototype,"max",2);s([l({type:Number})],$.prototype,"step",2);s([l({type:Boolean,reflect:!0})],$.prototype,"required",2);s([l({type:Boolean})],$.prototype,"autofocus",2);s([l({attribute:"tooltip-distance",type:Number})],$.prototype,"tooltipDistance",2);s([l({attribute:"tooltip-placement",reflect:!0})],$.prototype,"tooltipPlacement",2);s([l({attribute:"with-markers",type:Boolean})],$.prototype,"withMarkers",2);s([l({attribute:"with-tooltip",type:Boolean})],$.prototype,"withTooltip",2);s([l({attribute:!1})],$.prototype,"valueFormatter",2);$=s([F("wa-slider")],$);var ja=`:host {
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
`,Ka=0,pt=class extends U{constructor(){super(...arguments),this.attrId=++Ka,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||(this.slot="nav"),super.connectedCallback(),this.setAttribute("role","tab")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,g`
      <div
        part="base"
        class=${P({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};pt.css=ja;s([C(".tab")],pt.prototype,"tab",2);s([l({reflect:!0})],pt.prototype,"panel",2);s([l({type:Boolean,reflect:!0})],pt.prototype,"active",2);s([l({type:Boolean,reflect:!0})],pt.prototype,"disabled",2);s([l({type:Number,reflect:!0})],pt.prototype,"tabIndex",2);s([D("active")],pt.prototype,"handleActiveChange",1);s([D("disabled")],pt.prototype,"handleDisabledChange",1);pt=s([F("wa-tab")],pt);function Ya(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function on(t,e,n="vertical",i="smooth"){const o=Ya(t,e),a=o.top+e.scrollTop,r=o.left+e.scrollLeft,h=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,u=e.scrollTop,d=e.scrollTop+e.offsetHeight;(n==="horizontal"||n==="both")&&(r<h?e.scrollTo({left:r,behavior:i}):r+t.clientWidth>c&&e.scrollTo({left:r-e.offsetWidth+t.clientWidth,behavior:i})),(n==="vertical"||n==="both")&&(a<u?e.scrollTo({top:a,behavior:i}):a+t.clientHeight>d&&e.scrollTo({top:a-e.offsetHeight+t.clientHeight,behavior:i}))}var Ga=class extends Event{constructor(t){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},Xa=class extends Event{constructor(t){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},Za=`:host {
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
`,Q=class extends U{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new lt(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(n=>!["aria-labelledby","aria-controls"].includes(n.attributeName))&&setTimeout(()=>this.setAriaLabels());const e=t.filter(n=>n.target.closest("wa-tab-group")===this);if(e.some(n=>n.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(n=>n.attributeName==="active")){const i=e.filter(o=>o.attributeName==="active"&&o.target.tagName.toLowerCase()==="wa-tab").map(o=>o.target).find(o=>o.active);i&&i.closest("wa-tab-group")===this&&this.setActiveTab(i)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,n)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){const i=this.tabs.find(o=>o.panel===this.active);i&&this.setActiveTab(i)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});n.unobserve(e[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const n=t.target.closest("wa-tab");n?.closest("wa-tab-group")===this&&n!==null&&this.setActiveTab(n,{scrollBehavior:"smooth"})}handleKeyDown(t){const n=t.target.closest("wa-tab");if(n?.closest("wa-tab-group")===this){if(["Enter"," "].includes(t.key)){n!==null&&(this.setActiveTab(n,{scrollBehavior:"smooth"}),t.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const o=this.tabs.find(h=>h.matches(":focus")),a=this.localize.dir()==="rtl";let r=null;if(o?.tagName.toLowerCase()==="wa-tab"){if(t.key==="Home")r=this.focusableTabs[0];else if(t.key==="End")r=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const h=this.tabs.findIndex(c=>c===o);r=this.findNextFocusableTab(h,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const h=this.tabs.findIndex(c=>c===o);r=this.findNextFocusableTab(h,"forward")}if(!r)return;r.tabIndex=0,r.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(r,{scrollBehavior:"smooth"}):this.tabs.forEach(h=>{h.tabIndex=h===r?0:-1}),["top","bottom"].includes(this.placement)&&on(r,this.nav,"horizontal"),t.preventDefault()}}}}findNextFocusableTab(t,e){let n=null;const i=e==="forward"?1:-1;let o=t+i;for(;t<this.tabs.length;){if(n=this.tabs[o]||null,n===null){e==="forward"?n=this.focusableTabs[0]:n=this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;o+=i}return n}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e={emitEvents:!0,scrollBehavior:"auto",...e},t.closest("wa-tab-group")===this&&t!==this.activeTab&&!t.disabled){const n=this.activeTab;this.active=t.panel,this.activeTab=t,this.tabs.forEach(i=>{i.active=i===this.activeTab,i.tabIndex=i===this.activeTab?0:-1}),this.panels.forEach(i=>i.active=i.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&on(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(n&&this.dispatchEvent(new Ga({name:n.panel})),this.dispatchEvent(new Xa({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(n=>n.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){const t=this.tabs.find(e=>e.panel===this.active);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return g`
      <div
        part="base"
        class=${P({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
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
    `}};Q.css=Za;s([C(".tab-group")],Q.prototype,"tabGroup",2);s([C(".body")],Q.prototype,"body",2);s([C(".nav")],Q.prototype,"nav",2);s([R()],Q.prototype,"hasScrollControls",2);s([l({reflect:!0})],Q.prototype,"active",2);s([l()],Q.prototype,"placement",2);s([l()],Q.prototype,"activation",2);s([l({attribute:"without-scroll-controls",type:Boolean})],Q.prototype,"withoutScrollControls",2);s([D("active")],Q.prototype,"updateActiveTab",1);s([D("withoutScrollControls",{waitUntilFirstUpdate:!0})],Q.prototype,"updateScrollControls",1);Q=s([F("wa-tab-group")],Q);var Ja=`:host {
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
`,Qa=0,Gt=class extends U{constructor(){super(...arguments),this.attrId=++Qa,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return g`
      <slot
        part="base"
        class=${P({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};Gt.css=Ja;s([l({reflect:!0})],Gt.prototype,"name",2);s([l({type:Boolean,reflect:!0})],Gt.prototype,"active",2);s([D("active")],Gt.prototype,"handleActiveChange",1);Gt=s([F("wa-tab-panel")],Gt);function ie(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(o=>ie(o,--e)).join("");let n=t;if(n.nodeType===Node.TEXT_NODE)return n.textContent??"";if(n.nodeType===Node.ELEMENT_NODE){let i=n;if(i.hasAttribute("slot")||i.matches("style, script"))return"";if(i instanceof HTMLSlotElement){let o=i.assignedNodes({flatten:!0});if(o.length>0)return ie(o,--e)}return e>-1?ie(i,--e):i.textContent??""}return n.hasChildNodes()?ie(n.childNodes,--e):""}var tr=`:host {
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
`,st=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-select")?.hasInteracted){const e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=ie(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return g`
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
    `}};st.css=tr;s([C(".label")],st.prototype,"defaultSlot",2);s([R()],st.prototype,"current",2);s([l({reflect:!0})],st.prototype,"value",2);s([l({type:Boolean})],st.prototype,"disabled",2);s([l({type:Boolean,attribute:!1})],st.prototype,"selected",2);s([l({type:Boolean,attribute:"selected"})],st.prototype,"defaultSelected",2);s([l()],st.prototype,"label",1);s([R()],st.prototype,"defaultLabel",2);st=s([F("wa-option")],st);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class an extends De{constructor(e){if(super(e),this.it=z,e.type!==wt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===z||e==null)return this._t=void 0,this.it=e;if(e===X)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}an.directiveName="unsafeHTML",an.resultType=1;const er=Re(an);var nr=`:host {
  --tag-max-size: 10ch;
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
`,k=class extends W{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Xt(this,"hint","label"),this.localize=new lt(this),this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.form=null,this.required=!1,this.getTag=t=>g`
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
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,n=e.closest('[part~="clear-button"]')!==null,i=e.closest("wa-button")!==null;if(!(n||i)){if(t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const o=this.getAllOptions(),a=o.indexOf(this.currentOption);let r=Math.max(0,a);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(r=a+1,r>o.length-1&&(r=0)):t.key==="ArrowUp"?(r=a-1,r<0&&(r=o.length-1)):t.key==="Home"?r=0:t.key==="End"&&(r=o.length-1),this.setCurrentOption(o[r])}if(t.key?.length===1||t.key==="Backspace"){const o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const a of o)if(a.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=[bn({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),t==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(n=>!n.disabled).map(n=>n.value));let e=t;return t!=null&&(e=t.filter(n=>this.optionValues.has(n)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const e=this.getAllOptions().filter(n=>n.hasAttribute("selected")||n.defaultSelected);if(e.length>0){const n=e.map(i=>i.value);this._defaultValue=this.multiple?n:n[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const n=t.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="wa-button");this.disabled||n||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.value!==null&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new ki),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const n=t.target.closest("wa-option");n&&!n.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(n):this.setSelectedOptions(n),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const n=t.filter(i=>e.includes(i.value));this.setSelectedOptions(n)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;let n=e;if(!n){const i=t.target.closest("wa-tag[part~=tag]");if(i){const o=this.shadowRoot?.querySelector('[part="tags"]');if(o){const r=Array.from(o.children).indexOf(i);r>=0&&r<this.selectedOptions.length&&(n=this.selectedOptions[r])}}}n&&(this.toggleOptionSelection(n,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(n=>{n.current=!1,n.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),n=Array.isArray(t)?t:[t];e.forEach(i=>{n.includes(i)||(i.selected=!1)}),n.length&&n.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){const t=this.getAllOptions();this.selectedOptions=t.filter(n=>{if(!this.hasInteracted&&!this.valueHasChanged){const i=this.defaultValue,o=Array.isArray(i)?i:[i];return n.hasAttribute("selected")||n.defaultSelected||n.selected||o?.includes(n.value)}return n.selected});let e=new Set(this.selectedOptions.map(n=>n.value));if(e.size>0||this._value){const n=this._value;if(this._value==null){let i=this.defaultValue??[];this._value=Array.isArray(i)?i:[i]}this._value=this._value?.filter(i=>!this.optionValues?.has(i))??null,this._value?.unshift(...e),this.requestUpdate("value",n)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const n=this.selectedOptions[0];this.displayLabel=n?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const n=this.getTag(t,e);return n?typeof n=="string"?er(n):n:null}else if(e===this.maxOptionsVisible)return g`
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
        `;return null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],n=t.filter(i=>e.includes(i.value));this.setSelectedOptions(n),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new $i;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Yt(this.popup.popup,"show"),this.currentOption&&on(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new yi)}else{const t=new xi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Yt(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new wi)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Kt(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Kt(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,i=this.hint?!0:!!e,o=(this.hasUpdated||eo)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,a=!!(this.placeholder&&(!this.value||this.value.length===0));return g`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control-has-label":n})}
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
            class=${P({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":a})}
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
          class=${P({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};k.css=[nr,ce,Lt];s([C(".select")],k.prototype,"popup",2);s([C(".combobox")],k.prototype,"combobox",2);s([C(".display-input")],k.prototype,"displayInput",2);s([C(".value-input")],k.prototype,"valueInput",2);s([C(".listbox")],k.prototype,"listbox",2);s([R()],k.prototype,"displayLabel",2);s([R()],k.prototype,"currentOption",2);s([R()],k.prototype,"selectedOptions",2);s([R()],k.prototype,"optionValues",2);s([l()],k.prototype,"name",2);s([l({attribute:!1})],k.prototype,"defaultValue",1);s([l({attribute:"value",reflect:!1})],k.prototype,"value",1);s([l({reflect:!0})],k.prototype,"size",2);s([l()],k.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],k.prototype,"multiple",2);s([l({attribute:"max-options-visible",type:Number})],k.prototype,"maxOptionsVisible",2);s([l({type:Boolean})],k.prototype,"disabled",2);s([l({attribute:"with-clear",type:Boolean})],k.prototype,"withClear",2);s([l({type:Boolean,reflect:!0})],k.prototype,"open",2);s([l({reflect:!0})],k.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],k.prototype,"pill",2);s([l()],k.prototype,"label",2);s([l({reflect:!0})],k.prototype,"placement",2);s([l({attribute:"hint"})],k.prototype,"hint",2);s([l({attribute:"with-label",type:Boolean})],k.prototype,"withLabel",2);s([l({attribute:"with-hint",type:Boolean})],k.prototype,"withHint",2);s([l({reflect:!0})],k.prototype,"form",2);s([l({type:Boolean,reflect:!0})],k.prototype,"required",2);s([l({attribute:!1})],k.prototype,"getTag",2);s([D("disabled",{waitUntilFirstUpdate:!0})],k.prototype,"handleDisabledChange",1);s([D("value",{waitUntilFirstUpdate:!0})],k.prototype,"handleValueChange",1);s([D("open",{waitUntilFirstUpdate:!0})],k.prototype,"handleOpenChange",1);k=s([F("wa-select")],k);var ir=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}},or=`@layer wa-component {
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
`,Vt=class extends U{constructor(){super(...arguments),this.localize=new lt(this),this.variant="neutral",this.appearance="outlined filled",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new ir)}render(){return g`
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
    `}};Vt.css=[or,Le,Lt];s([l({reflect:!0})],Vt.prototype,"variant",2);s([l({reflect:!0})],Vt.prototype,"appearance",2);s([l({reflect:!0})],Vt.prototype,"size",2);s([l({type:Boolean,reflect:!0})],Vt.prototype,"pill",2);s([l({attribute:"with-remove",type:Boolean})],Vt.prototype,"withRemove",2);Vt=s([F("wa-tag")],Vt);var ar=`@layer wa-utilities {
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
`;function q(t,e){rr(t)&&(t="100%");const n=sr(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),n&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function me(t){return Math.min(1,Math.max(0,t))}function rr(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function sr(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Ci(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function ge(t){return Number(t)<=1?`${Number(t)*100}%`:t}function zt(t){return t.length===1?"0"+t:String(t)}function lr(t,e,n){return{r:q(t,255)*255,g:q(e,255)*255,b:q(n,255)*255}}function Nn(t,e,n){t=q(t,255),e=q(e,255),n=q(n,255);const i=Math.max(t,e,n),o=Math.min(t,e,n);let a=0,r=0;const h=(i+o)/2;if(i===o)r=0,a=0;else{const c=i-o;switch(r=h>.5?c/(2-i-o):c/(i+o),i){case t:a=(e-n)/c+(e<n?6:0);break;case e:a=(n-t)/c+2;break;case n:a=(t-e)/c+4;break}a/=6}return{h:a,s:r,l:h}}function Ke(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*(6*n):n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function hr(t,e,n){let i,o,a;if(t=q(t,360),e=q(e,100),n=q(n,100),e===0)o=n,a=n,i=n;else{const r=n<.5?n*(1+e):n+e-n*e,h=2*n-r;i=Ke(h,r,t+1/3),o=Ke(h,r,t),a=Ke(h,r,t-1/3)}return{r:i*255,g:o*255,b:a*255}}function Un(t,e,n){t=q(t,255),e=q(e,255),n=q(n,255);const i=Math.max(t,e,n),o=Math.min(t,e,n);let a=0;const r=i,h=i-o,c=i===0?0:h/i;if(i===o)a=0;else{switch(i){case t:a=(e-n)/h+(e<n?6:0);break;case e:a=(n-t)/h+2;break;case n:a=(t-e)/h+4;break}a/=6}return{h:a,s:c,v:r}}function cr(t,e,n){t=q(t,360)*6,e=q(e,100),n=q(n,100);const i=Math.floor(t),o=t-i,a=n*(1-e),r=n*(1-o*e),h=n*(1-(1-o)*e),c=i%6,u=[n,r,a,a,h,n][c],d=[h,n,n,r,a,a][c],p=[a,a,h,n,n,r][c];return{r:u*255,g:d*255,b:p*255}}function Wn(t,e,n,i){const o=[zt(Math.round(t).toString(16)),zt(Math.round(e).toString(16)),zt(Math.round(n).toString(16))];return i&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function ur(t,e,n,i,o){const a=[zt(Math.round(t).toString(16)),zt(Math.round(e).toString(16)),zt(Math.round(n).toString(16)),zt(pr(i))];return o&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}function dr(t,e,n,i){const o=t/100,a=e/100,r=n/100,h=i/100,c=255*(1-o)*(1-h),u=255*(1-a)*(1-h),d=255*(1-r)*(1-h);return{r:c,g:u,b:d}}function jn(t,e,n){let i=1-t/255,o=1-e/255,a=1-n/255,r=Math.min(i,o,a);return r===1?(i=0,o=0,a=0):(i=(i-r)/(1-r)*100,o=(o-r)/(1-r)*100,a=(a-r)/(1-r)*100),r*=100,{c:Math.round(i),m:Math.round(o),y:Math.round(a),k:Math.round(r)}}function pr(t){return Math.round(parseFloat(t)*255).toString(16)}function Kn(t){return Y(t)/255}function Y(t){return parseInt(t,16)}function fr(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}const rn={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function br(t){let e={r:0,g:0,b:0},n=1,i=null,o=null,a=null,r=!1,h=!1;return typeof t=="string"&&(t=vr(t)),typeof t=="object"&&(K(t.r)&&K(t.g)&&K(t.b)?(e=lr(t.r,t.g,t.b),r=!0,h=String(t.r).substr(-1)==="%"?"prgb":"rgb"):K(t.h)&&K(t.s)&&K(t.v)?(i=ge(t.s),o=ge(t.v),e=cr(t.h,i,o),r=!0,h="hsv"):K(t.h)&&K(t.s)&&K(t.l)?(i=ge(t.s),a=ge(t.l),e=hr(t.h,i,a),r=!0,h="hsl"):K(t.c)&&K(t.m)&&K(t.y)&&K(t.k)&&(e=dr(t.c,t.m,t.y,t.k),r=!0,h="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(n=t.a)),n=Ci(n),{ok:r,format:t.format||h,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:n}}const mr="[-\\+]?\\d+%?",gr="[-\\+]?\\d*\\.\\d+%?",St="(?:"+gr+")|(?:"+mr+")",Ye="[\\s|\\(]+("+St+")[,|\\s]+("+St+")[,|\\s]+("+St+")\\s*\\)?",ve="[\\s|\\(]+("+St+")[,|\\s]+("+St+")[,|\\s]+("+St+")[,|\\s]+("+St+")\\s*\\)?",et={CSS_UNIT:new RegExp(St),rgb:new RegExp("rgb"+Ye),rgba:new RegExp("rgba"+ve),hsl:new RegExp("hsl"+Ye),hsla:new RegExp("hsla"+ve),hsv:new RegExp("hsv"+Ye),hsva:new RegExp("hsva"+ve),cmyk:new RegExp("cmyk"+ve),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function vr(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(rn[t])t=rn[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let n=et.rgb.exec(t);return n?{r:n[1],g:n[2],b:n[3]}:(n=et.rgba.exec(t),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=et.hsl.exec(t),n?{h:n[1],s:n[2],l:n[3]}:(n=et.hsla.exec(t),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=et.hsv.exec(t),n?{h:n[1],s:n[2],v:n[3]}:(n=et.hsva.exec(t),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=et.cmyk.exec(t),n?{c:n[1],m:n[2],y:n[3],k:n[4]}:(n=et.hex8.exec(t),n?{r:Y(n[1]),g:Y(n[2]),b:Y(n[3]),a:Kn(n[4]),format:e?"name":"hex8"}:(n=et.hex6.exec(t),n?{r:Y(n[1]),g:Y(n[2]),b:Y(n[3]),format:e?"name":"hex"}:(n=et.hex4.exec(t),n?{r:Y(n[1]+n[1]),g:Y(n[2]+n[2]),b:Y(n[3]+n[3]),a:Kn(n[4]+n[4]),format:e?"name":"hex8"}:(n=et.hex3.exec(t),n?{r:Y(n[1]+n[1]),g:Y(n[2]+n[2]),b:Y(n[3]+n[3]),format:e?"name":"hex"}:!1))))))))))}function K(t){return typeof t=="number"?!Number.isNaN(t):et.CSS_UNIT.test(t)}class M{constructor(e="",n={}){if(e instanceof M)return e;typeof e=="number"&&(e=fr(e)),this.originalInput=e;const i=br(e);this.originalInput=e,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=n.format??i.format,this.gradientType=n.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let n,i,o;const a=e.r/255,r=e.g/255,h=e.b/255;return a<=.03928?n=a/12.92:n=Math.pow((a+.055)/1.055,2.4),r<=.03928?i=r/12.92:i=Math.pow((r+.055)/1.055,2.4),h<=.03928?o=h/12.92:o=Math.pow((h+.055)/1.055,2.4),.2126*n+.7152*i+.0722*o}getAlpha(){return this.a}setAlpha(e){return this.a=Ci(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=Un(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=Un(this.r,this.g,this.b),n=Math.round(e.h*360),i=Math.round(e.s*100),o=Math.round(e.v*100);return this.a===1?`hsv(${n}, ${i}%, ${o}%)`:`hsva(${n}, ${i}%, ${o}%, ${this.roundA})`}toHsl(){const e=Nn(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=Nn(this.r,this.g,this.b),n=Math.round(e.h*360),i=Math.round(e.s*100),o=Math.round(e.l*100);return this.a===1?`hsl(${n}, ${i}%, ${o}%)`:`hsla(${n}, ${i}%, ${o}%, ${this.roundA})`}toHex(e=!1){return Wn(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return ur(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),n=Math.round(this.g),i=Math.round(this.b);return this.a===1?`rgb(${e}, ${n}, ${i})`:`rgba(${e}, ${n}, ${i}, ${this.roundA})`}toPercentageRgb(){const e=n=>`${Math.round(q(n,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=n=>Math.round(q(n,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...jn(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:n,y:i,k:o}=jn(this.r,this.g,this.b);return`cmyk(${e}, ${n}, ${i}, ${o})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+Wn(this.r,this.g,this.b,!1);for(const[n,i]of Object.entries(rn))if(e===i)return n;return!1}toString(e){const n=!!e;e=e??this.format;let i=!1;const o=this.a<1&&this.a>=0;return!n&&o&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(i=this.toRgbString()),e==="prgb"&&(i=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(i=this.toHexString()),e==="hex3"&&(i=this.toHexString(!0)),e==="hex4"&&(i=this.toHex8String(!0)),e==="hex8"&&(i=this.toHex8String()),e==="name"&&(i=this.toName()),e==="hsl"&&(i=this.toHslString()),e==="hsv"&&(i=this.toHsvString()),e==="cmyk"&&(i=this.toCmykString()),i||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new M(this.toString())}lighten(e=10){const n=this.toHsl();return n.l+=e/100,n.l=me(n.l),new M(n)}brighten(e=10){const n=this.toRgb();return n.r=Math.max(0,Math.min(255,n.r-Math.round(255*-(e/100)))),n.g=Math.max(0,Math.min(255,n.g-Math.round(255*-(e/100)))),n.b=Math.max(0,Math.min(255,n.b-Math.round(255*-(e/100)))),new M(n)}darken(e=10){const n=this.toHsl();return n.l-=e/100,n.l=me(n.l),new M(n)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const n=this.toHsl();return n.s-=e/100,n.s=me(n.s),new M(n)}saturate(e=10){const n=this.toHsl();return n.s+=e/100,n.s=me(n.s),new M(n)}greyscale(){return this.desaturate(100)}spin(e){const n=this.toHsl(),i=(n.h+e)%360;return n.h=i<0?360+i:i,new M(n)}mix(e,n=50){const i=this.toRgb(),o=new M(e).toRgb(),a=n/100,r={r:(o.r-i.r)*a+i.r,g:(o.g-i.g)*a+i.g,b:(o.b-i.b)*a+i.b,a:(o.a-i.a)*a+i.a};return new M(r)}analogous(e=6,n=30){const i=this.toHsl(),o=360/n,a=[this];for(i.h=(i.h-(o*e>>1)+720)%360;--e;)i.h=(i.h+o)%360,a.push(new M(i));return a}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new M(e)}monochromatic(e=6){const n=this.toHsv(),{h:i}=n,{s:o}=n;let{v:a}=n;const r=[],h=1/e;for(;e--;)r.push(new M({h:i,s:o,v:a})),a=(a+h)%1;return r}splitcomplement(){const e=this.toHsl(),{h:n}=e;return[this,new M({h:(n+72)%360,s:e.s,l:e.l}),new M({h:(n+216)%360,s:e.s,l:e.l})]}onBackground(e){const n=this.toRgb(),i=new M(e).toRgb(),o=n.a+i.a*(1-n.a);return new M({r:(n.r*n.a+i.r*i.a*(1-n.a))/o,g:(n.g*n.a+i.g*i.a*(1-n.a))/o,b:(n.b*n.a+i.b*i.a*(1-n.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const n=this.toHsl(),{h:i}=n,o=[this],a=360/e;for(let r=1;r<e;r++)o.push(new M({h:(i+r*a)%360,s:n.s,l:n.l}));return o}equals(e){const n=new M(e);return this.format==="cmyk"||n.format==="cmyk"?this.toCmykString()===n.toCmykString():this.toRgbString()===n.toRgbString()}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Si="important",wr=" !"+Si,Et=Re(class extends De{constructor(t){if(super(t),t.type!==wt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,n)=>{const i=t[n];return i==null?e:e+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:n}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?n.removeProperty(i):n[i]=null);for(const i in e){const o=e[i];if(o!=null){this.ft.add(i);const a=typeof o=="string"&&o.endsWith(wr);i.includes("-")||a?n.setProperty(i,a?o.slice(0,-11):o,a?Si:""):n[i]=o}}return X}});var yr=`:host {
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
`,w=class extends W{constructor(){super(),this.hasSlotController=new Xt(this,"hint","label"),this.isSafeValue=!1,this.localize=new lt(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!0,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this._value=null,this.defaultValue=this.getAttribute("value")||null,this.withLabel=!1,this.withHint=!1,this.hasEyeDropper=!1,this.label="",this.hint="",this.format="hex",this.size="medium",this.withoutFormatToggle=!1,this.name=null,this.disabled=!1,this.open=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form=null,this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0},this.handleFocusOut=()=>{this.hasFocus=!1},this.reportValidityAfterShow=()=>{this.removeEventListener("invalid",this.emitInvalid),this.reportValidity(),this.addEventListener("invalid",this.emitInvalid)},this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focus())},this.handleDocumentKeyDown=t=>{if(t.key==="Escape"&&this.open){t.stopPropagation(),this.focus(),this.hide();return}t.key==="Tab"&&setTimeout(()=>{const e=this.getRootNode()instanceof ShadowRoot?document.activeElement?.shadowRoot?.activeElement:document.activeElement;(!this||e?.closest(this.tagName.toLowerCase())!==this)&&this.hide()})},this.handleDocumentMouseDown=t=>{const n=t.composedPath().some(i=>i instanceof Element&&(i.closest(".color-picker")||i===this.trigger));this&&!n&&this.hide()},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}static get validators(){const t=[bn()];return[...super.validators,...t]}get validationTarget(){return this.popup?.active?this.input:this.trigger}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("preview-color-copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("preview-color-copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value||""),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".slider.alpha"),n=e.querySelector(".slider-handle"),{width:i}=e.getBoundingClientRect();let o=this.value,a=this.value;n.focus(),t.preventDefault(),je(e,{onMove:r=>{this.alpha=V(r/i*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".slider.hue"),n=e.querySelector(".slider-handle"),{width:i}=e.getBoundingClientRect();let o=this.value,a=this.value;n.focus(),t.preventDefault(),je(e,{onMove:r=>{this.hue=V(r/i*360,0,360),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input"))}))},onStop:()=>{this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".grid"),n=e.querySelector(".grid-handle"),{width:i,height:o}=e.getBoundingClientRect();let a=this.value,r=this.value;n.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,je(e,{onMove:(h,c)=>{this.saturation=V(h/i*100,0,100),this.brightness=V(100-c/o*100,0,100),this.syncValues(),this.value!==r&&(r=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=V(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=V(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleHueKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=V(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=V(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleGridKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=V(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=V(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=V(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=V(this.brightness-e,0,100),this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputChange(t){const e=t.target,n=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value||""):this.value="",this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputInput(t){this.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),setTimeout(()=>this.input.select())):this.hue=0}}handleTouchMove(t){t.preventDefault()}parseColor(t){if(!t||t.trim()==="")return null;const e=new M(t);if(!e.isValid)return null;const n=e.toHsl(),i=e.toRgb(),o=e.toHsv();if(!i||i.r==null||i.g==null||i.b==null)return null;const a={h:n.h||0,s:(n.s||0)*100,l:(n.l||0)*100,a:n.a||0},r=e.toHexString(),h=e.toHex8String(),c={h:o.h||0,s:(o.s||0)*100,v:(o.v||0)*100,a:o.a||0};return{hsl:{h:a.h,s:a.s,l:a.l,string:this.setLetterCase(`hsl(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%)`)},hsla:{h:a.h,s:a.s,l:a.l,a:a.a,string:this.setLetterCase(`hsla(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%, ${a.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a||0,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${(i.a||0).toFixed(2).toString()})`)},hex:this.setLetterCase(r),hexa:this.setLetterCase(h)}}setColor(t){const e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("preview-color-copied"),this.updateValidity()}handleAfterShow(){this.updateValidity()}handleEyeDropper(){if(!this.hasEyeDropper)return;new EyeDropper().open().then(e=>{const n=this.value;this.setColor(e.sRGBHex),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getHexString(t,e,n,i=100){const o=new M(`hsva(${t}, ${e}%, ${n}%, ${i/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}willUpdate(t){super.willUpdate(t),t.has("value")&&this.handleValueChange(t.get("value")||"",this.value||"")}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const n=this.parseColor(e);n!==null?(this.inputValue=this.value||"",this.hue=n.hsva.h,this.saturation=n.hsva.s,this.brightness=n.hsva.v,this.alpha=n.hsva.a*100,this.syncValues()):this.inputValue=t??""}this.requestUpdate()}focus(t){this.trigger.focus(t)}blur(){const t=this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),this.popup?.active&&this.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}reportValidity(){return!this.validity.valid&&!this.open?(this.addEventListener("wa-after-show",this.reportValidityAfterShow,{once:!0}),this.show(),this.disabled||this.dispatchEvent(new dn),!1):super.reportValidity()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}firstUpdated(t){super.firstUpdated(t),this.hasEyeDropper="EyeDropper"in window}handleTriggerClick(){this.open?this.hide():(this.show(),this.focus())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}updateAccessibleTrigger(){const t=this.trigger;t&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){if(!this.open)return this.open=!0,Kt(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Kt(this,"wa-after-hide")}addOpenListeners(){this.base.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.base&&this.base.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled){this.open=!1;return}this.updateAccessibleTrigger(),this.open?(this.dispatchEvent(new CustomEvent("wa-show")),this.addOpenListeners(),await this.updateComplete,this.base.hidden=!1,this.popup.active=!0,await Yt(this.popup.popup,"show-with-scale"),this.dispatchEvent(new CustomEvent("wa-after-show"))):(this.dispatchEvent(new CustomEvent("wa-hide")),this.removeOpenListeners(),await Yt(this.popup.popup,"hide-with-scale"),this.base.hidden=!0,this.popup.active=!1,this.dispatchEvent(new CustomEvent("wa-after-hide")))}render(){const t=this.hasUpdated?this.withLabel||this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.withHint||this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,i=this.hint?!0:!!e,o=this.saturation,a=100-this.brightness,r=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(c=>c.trim()!==""),h=g`
      <div
        part="base"
        class=${P({"color-picker":!0})}
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
            class=${P({"grid-handle":!0,"grid-handle-dragging":this.isDraggingGridHandle})}
            style=${Et({top:`${a}%`,left:`${o}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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

        ${r.length>0?g`
              <div part="swatches" class="swatches">
                ${r.map(c=>{const u=this.parseColor(c);return u?g`
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
        class=${P({container:!0,"form-control":!0,"form-control-has-label":n})}
        part="trigger-container form-control"
      >
        <div part="form-control-label" class="label" id="form-control-label">
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${P({trigger:!0,"trigger-empty":this.isEmpty,"transparent-bg":!0,"form-control-input":!0})}
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
          class=${P({"has-slotted":i})}
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
        aria-disabled=${this.disabled?"true":"false"}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        ${h}
      </wa-popup>
    `}};w.css=[ar,Lt,ce,yr];w.shadowRootOptions={...W.shadowRootOptions,delegatesFocus:!0};s([C('[part~="base"]')],w.prototype,"base",2);s([C('[part~="input"]')],w.prototype,"input",2);s([C('[part~="form-control-label"]')],w.prototype,"triggerLabel",2);s([C('[part~="form-control-input"]')],w.prototype,"triggerButton",2);s([C(".color-popup")],w.prototype,"popup",2);s([C('[part~="preview"]')],w.prototype,"previewButton",2);s([C('[part~="trigger"]')],w.prototype,"trigger",2);s([R()],w.prototype,"hasFocus",2);s([R()],w.prototype,"isDraggingGridHandle",2);s([R()],w.prototype,"isEmpty",2);s([R()],w.prototype,"inputValue",2);s([R()],w.prototype,"hue",2);s([R()],w.prototype,"saturation",2);s([R()],w.prototype,"brightness",2);s([R()],w.prototype,"alpha",2);s([R()],w.prototype,"value",1);s([l({attribute:"value",reflect:!0})],w.prototype,"defaultValue",2);s([l({attribute:"with-label",reflect:!0,type:Boolean})],w.prototype,"withLabel",2);s([l({attribute:"with-hint",reflect:!0,type:Boolean})],w.prototype,"withHint",2);s([R()],w.prototype,"hasEyeDropper",2);s([l()],w.prototype,"label",2);s([l({attribute:"hint"})],w.prototype,"hint",2);s([l()],w.prototype,"format",2);s([l({reflect:!0})],w.prototype,"size",2);s([l({attribute:"without-format-toggle",type:Boolean})],w.prototype,"withoutFormatToggle",2);s([l({reflect:!0})],w.prototype,"name",2);s([l({type:Boolean})],w.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],w.prototype,"open",2);s([l({type:Boolean})],w.prototype,"opacity",2);s([l({type:Boolean})],w.prototype,"uppercase",2);s([l()],w.prototype,"swatches",2);s([l({reflect:!0})],w.prototype,"form",2);s([l({type:Boolean,reflect:!0})],w.prototype,"required",2);s([oo({passive:!1})],w.prototype,"handleTouchMove",1);s([D("format",{waitUntilFirstUpdate:!0})],w.prototype,"handleFormatChange",1);s([D("opacity")],w.prototype,"handleOpacityChange",1);s([D("value")],w.prototype,"handleValueChange",1);s([D("open",{waitUntilFirstUpdate:!0})],w.prototype,"handleOpenChange",1);w=s([F("wa-color-picker")],w);var xr=`:host {
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
`,ft=class extends U{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal",this.variant="neutral"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){ne(t.target)?.classList.add("button-focus")}handleBlur(t){ne(t.target)?.classList.remove("button-focus")}handleMouseOver(t){ne(t.target)?.classList.add("button-hover")}handleMouseOut(t){ne(t.target)?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const n=t.indexOf(e),i=ne(e);i&&(i.appearance==="outlined"&&(this.hasOutlined=!0),this.size&&i.setAttribute("size",this.size),i.classList.add("wa-button-group__button"),i.classList.toggle("wa-button-group__horizontal",this.orientation==="horizontal"),i.classList.toggle("wa-button-group__vertical",this.orientation==="vertical"),i.classList.toggle("wa-button-group__button-first",n===0),i.classList.toggle("wa-button-group__button-inner",n>0&&n<t.length-1),i.classList.toggle("wa-button-group__button-last",n===t.length-1),i.classList.toggle("wa-button-group__button-radio",i.tagName.toLowerCase()==="wa-radio-button"))})}render(){return g`
      <slot
        part="base"
        class=${P({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};ft.css=[Lt,Le,xr];s([C("slot")],ft.prototype,"defaultSlot",2);s([R()],ft.prototype,"disableRole",2);s([R()],ft.prototype,"hasOutlined",2);s([l()],ft.prototype,"label",2);s([l({reflect:!0})],ft.prototype,"orientation",2);s([l({reflect:!0})],ft.prototype,"size",2);s([l({reflect:!0})],ft.prototype,"variant",2);ft=s([F("wa-button-group")],ft);function ne(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const n of e)n.nodeType===Node.ELEMENT_NODE&&$r(n)});async function $r(t){const e=t instanceof Element?t.tagName.toLowerCase():"",n=e?.startsWith("wa-"),i=[...t.querySelectorAll(":not(:defined)")].map(r=>r.tagName.toLowerCase()).filter(r=>r.startsWith("wa-"));n&&!customElements.get(e)&&i.push(e);const o=[...new Set(i)],a=await Promise.allSettled(o.map(r=>kr(r)));for(const r of a)r.status==="rejected"&&console.warn(r.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function kr(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),n=go(`components/${e}/${e}.js`);return new Promise((i,o)=>{import(n).then(()=>i()).catch(()=>o(new Error(`Unable to autoload <${t}> from ${n}`)))})}export{Tr as r};
//# sourceMappingURL=webawesome-BOW-VaTR.js.map
