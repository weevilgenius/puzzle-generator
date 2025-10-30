/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Kt=`:host {
  display: flex;
  flex-direction: column;
}

/* Label */
:is([part~='form-control-label'], [part~='label']):has(*:not(:empty)) {
  display: inline-flex;
  color: var(--wa-form-control-label-color);
  font-weight: var(--wa-form-control-label-font-weight);
  line-height: var(--wa-form-control-label-line-height);
  margin-block-end: 0.5em;
}

:host([required]) :is([part~='form-control-label'], [part~='label'])::after {
  content: var(--wa-form-control-required-content);
  margin-inline-start: var(--wa-form-control-required-content-offset);
  color: var(--wa-form-control-required-content-color);
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
`;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var qo=Object.defineProperty,No=Object.getOwnPropertyDescriptor,ro=t=>{throw TypeError(t)},r=(t,e,n,o)=>{for(var i=o>1?void 0:o?No(e,n):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,n,i):s(i))||i);return o&&i&&qo(e,n,i),i},so=(t,e,n)=>e.has(t)||ro("Cannot "+n),Uo=(t,e,n)=>(so(t,e,"read from private field"),e.get(t)),Wo=(t,e,n)=>e.has(t)?ro("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),jo=(t,e,n,o)=>(so(t,e,"write to private field"),e.set(t,n),n);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=globalThis,mn=Se.ShadowRoot&&(Se.ShadyCSS===void 0||Se.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lo=Symbol(),On=new WeakMap;let Ko=class{constructor(e,n,o){if(this._$cssResult$=!0,o!==lo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(mn&&e===void 0){const o=n!==void 0&&n.length===1;o&&(e=On.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&On.set(n,e))}return e}toString(){return this.cssText}};const ho=t=>new Ko(typeof t=="string"?t:t+"",void 0,lo),Yo=(t,e)=>{if(mn)t.adoptedStyleSheets=e.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of e){const o=document.createElement("style"),i=Se.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=n.cssText,t.appendChild(o)}},Dn=mn?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const o of e.cssRules)n+=o.cssText;return ho(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Xo,defineProperty:Go,getOwnPropertyDescriptor:Qo,getOwnPropertyNames:Zo,getOwnPropertySymbols:Jo,getPrototypeOf:ti}=Object,De=globalThis,zn=De.trustedTypes,ei=zn?zn.emptyScript:"",ni=De.reactiveElementPolyfillSupport,ce=(t,e)=>t,Ae={toAttribute(t,e){switch(e){case Boolean:t=t?ei:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},bn=(t,e)=>!Xo(t,e),Mn={attribute:!0,type:String,converter:Ae,reflect:!1,useDefault:!1,hasChanged:bn};Symbol.metadata??=Symbol("metadata"),De.litPropertyMetadata??=new WeakMap;let Yt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=Mn){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,n);i!==void 0&&Go(this.prototype,e,i)}}static getPropertyDescriptor(e,n,o){const{get:i,set:a}=Qo(this.prototype,e)??{get(){return this[n]},set(s){this[n]=s}};return{get:i,set(s){const h=i?.call(this);a?.call(this,s),this.requestUpdate(e,h,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Mn}static _$Ei(){if(this.hasOwnProperty(ce("elementProperties")))return;const e=ti(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ce("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ce("properties"))){const n=this.properties,o=[...Zo(n),...Jo(n)];for(const i of o)this.createProperty(i,n[i])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[o,i]of n)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[n,o]of this.elementProperties){const i=this._$Eu(n,o);i!==void 0&&this._$Eh.set(i,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)n.unshift(Dn(i))}else e!==void 0&&n.push(Dn(e));return n}static _$Eu(e,n){const o=n.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const o of n.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yo(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,n,o){this._$AK(e,o)}_$ET(e,n){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const a=(o.converter?.toAttribute!==void 0?o.converter:Ae).toAttribute(n,o.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,n){const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const a=o.getPropertyOptions(i),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Ae;this._$Em=i;const h=s.fromAttribute(n,a.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(e,n,o){if(e!==void 0){const i=this.constructor,a=this[e];if(o??=i.getPropertyOptions(e),!((o.hasChanged??bn)(a,n)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,o))))return;this.C(e,n,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:o,reflect:i,wrapped:a},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??n??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(n=void 0),this._$AL.set(e,n)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,a]of o){const{wrapped:s}=a,h=this[i];s!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,a,h)}}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(n)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((n=>this._$ET(n,this[n]))),this._$EM()}updated(e){}firstUpdated(e){}};Yt.elementStyles=[],Yt.shadowRootOptions={mode:"open"},Yt[ce("elementProperties")]=new Map,Yt[ce("finalized")]=new Map,ni?.({ReactiveElement:Yt}),(De.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gn=globalThis,Te=gn.trustedTypes,In=Te?Te.createPolicy("lit-html",{createHTML:t=>t}):void 0,co="$lit$",Vt=`lit$${Math.random().toFixed(9).slice(2)}$`,uo="?"+Vt,oi=`<${uo}>`,Ut=document,de=()=>Ut.createComment(""),pe=t=>t===null||typeof t!="object"&&typeof t!="function",vn=Array.isArray,ii=t=>vn(t)||typeof t?.[Symbol.iterator]=="function",We=`[ 	
\f\r]`,re=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Bn=/>/g,Ft=RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fn=/'/g,Hn=/"/g,po=/^(?:script|style|textarea|title)$/i,ai=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),g=ai(1),tt=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),qn=new WeakMap,qt=Ut.createTreeWalker(Ut,129);function fo(t,e){if(!vn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return In!==void 0?In.createHTML(e):e}const ri=(t,e)=>{const n=t.length-1,o=[];let i,a=e===2?"<svg>":e===3?"<math>":"",s=re;for(let h=0;h<n;h++){const c=t[h];let d,u,p=-1,f=0;for(;f<c.length&&(s.lastIndex=f,u=s.exec(c),u!==null);)f=s.lastIndex,s===re?u[1]==="!--"?s=Pn:u[1]!==void 0?s=Bn:u[2]!==void 0?(po.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=Ft):u[3]!==void 0&&(s=Ft):s===Ft?u[0]===">"?(s=i??re,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,d=u[1],s=u[3]===void 0?Ft:u[3]==='"'?Hn:Fn):s===Hn||s===Fn?s=Ft:s===Pn||s===Bn?s=re:(s=Ft,i=void 0);const m=s===Ft&&t[h+1].startsWith("/>")?" ":"";a+=s===re?c+oi:p>=0?(o.push(d),c.slice(0,p)+co+c.slice(p)+Vt+m):c+Vt+(p===-2?h:m)}return[fo(t,a+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class fe{constructor({strings:e,_$litType$:n},o){let i;this.parts=[];let a=0,s=0;const h=e.length-1,c=this.parts,[d,u]=ri(e,n);if(this.el=fe.createElement(d,o),qt.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=qt.nextNode())!==null&&c.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(co)){const f=u[s++],m=i.getAttribute(p).split(Vt),b=/([.?@])?(.*)/.exec(f);c.push({type:1,index:a,name:b[2],strings:m,ctor:b[1]==="."?li:b[1]==="?"?hi:b[1]==="@"?ci:ze}),i.removeAttribute(p)}else p.startsWith(Vt)&&(c.push({type:6,index:a}),i.removeAttribute(p));if(po.test(i.tagName)){const p=i.textContent.split(Vt),f=p.length-1;if(f>0){i.textContent=Te?Te.emptyScript:"";for(let m=0;m<f;m++)i.append(p[m],de()),qt.nextNode(),c.push({type:2,index:++a});i.append(p[f],de())}}}else if(i.nodeType===8)if(i.data===uo)c.push({type:2,index:a});else{let p=-1;for(;(p=i.data.indexOf(Vt,p+1))!==-1;)c.push({type:7,index:a}),p+=Vt.length-1}a++}}static createElement(e,n){const o=Ut.createElement("template");return o.innerHTML=e,o}}function Qt(t,e,n=t,o){if(e===tt)return e;let i=o!==void 0?n._$Co?.[o]:n._$Cl;const a=pe(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(t),i._$AT(t,n,o)),o!==void 0?(n._$Co??=[])[o]=i:n._$Cl=i),i!==void 0&&(e=Qt(t,i._$AS(t,e.values),i,o)),e}class si{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:o}=this._$AD,i=(e?.creationScope??Ut).importNode(n,!0);qt.currentNode=i;let a=qt.nextNode(),s=0,h=0,c=o[0];for(;c!==void 0;){if(s===c.index){let d;c.type===2?d=new me(a,a.nextSibling,this,e):c.type===1?d=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(d=new ui(a,this,e)),this._$AV.push(d),c=o[++h]}s!==c?.index&&(a=qt.nextNode(),s++)}return qt.currentNode=Ut,i}p(e){let n=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,n),n+=o.strings.length-2):o._$AI(e[n])),n++}}class me{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,o,i){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Qt(this,e,n),pe(e)?e===I||e==null||e===""?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==tt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ii(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&pe(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ut.createTextNode(e)),this._$AH=e}$(e){const{values:n,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=fe.createElement(fo(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(n);else{const a=new si(i,this),s=a.u(this.options);a.p(n),this.T(s),this._$AH=a}}_$AC(e){let n=qn.get(e.strings);return n===void 0&&qn.set(e.strings,n=new fe(e)),n}k(e){vn(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let o,i=0;for(const a of e)i===n.length?n.push(o=new me(this.O(de()),this.O(de()),this,this.options)):o=n[i],o._$AI(a),i++;i<n.length&&(this._$AR(o&&o._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ze{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,o,i,a){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=n,this._$AM=i,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=I}_$AI(e,n=this,o,i){const a=this.strings;let s=!1;if(a===void 0)e=Qt(this,e,n,0),s=!pe(e)||e!==this._$AH&&e!==tt,s&&(this._$AH=e);else{const h=e;let c,d;for(e=a[0],c=0;c<a.length-1;c++)d=Qt(this,h[o+c],n,c),d===tt&&(d=this._$AH[c]),s||=!pe(d)||d!==this._$AH[c],d===I?e=I:e!==I&&(e+=(d??"")+a[c+1]),this._$AH[c]=d}s&&!i&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class li extends ze{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}}class hi extends ze{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}}class ci extends ze{constructor(e,n,o,i,a){super(e,n,o,i,a),this.type=5}_$AI(e,n=this){if((e=Qt(this,e,n,0)??I)===tt)return;const o=this._$AH,i=e===I&&o!==I||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==I&&(o===I||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ui{constructor(e,n,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Qt(this,e)}}const di=gn.litHtmlPolyfillSupport;di?.(fe,me),(gn.litHtmlVersions??=[]).push("3.3.1");const pi=(t,e,n)=>{const o=n?.renderBefore??e;let i=o._$litPart$;if(i===void 0){const a=n?.renderBefore??null;o._$litPart$=i=new me(e.insertBefore(de(),a),a,void 0,n??{})}return i._$AI(t),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wn=globalThis;let ue=class extends Yt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=pi(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}};ue._$litElement$=!0,ue.finalized=!0,wn.litElementHydrateSupport?.({LitElement:ue});const fi=wn.litElementPolyfillSupport;fi?.({LitElement:ue});(wn.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mi=!1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=t=>(e,n)=>{n!==void 0?n.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bi={attribute:!0,type:String,converter:Ae,reflect:!1,hasChanged:bn},gi=(t=bi,e,n)=>{const{kind:o,metadata:i}=n;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(n.name,t),o==="accessor"){const{name:s}=n;return{set(h){const c=e.get.call(this);e.set.call(this,h),this.requestUpdate(s,c,t)},init(h){return h!==void 0&&this.C(s,void 0,t,h),h}}}if(o==="setter"){const{name:s}=n;return function(h){const c=this[s];e.call(this,h),this.requestUpdate(s,c,t)}}throw Error("Unsupported decorator location: "+o)};function l(t){return(e,n)=>typeof n=="object"?gi(t,e,n):((o,i,a)=>{const s=i.hasOwnProperty(a);return i.constructor.createProperty(a,o),s?Object.getOwnPropertyDescriptor(i,a):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function T(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function vi(t){return(e,n)=>{const o=typeof e=="function"?e:e[n];Object.assign(o,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wi=(t,e,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(t,e){return(n,o,i)=>{const a=s=>s.renderRoot?.querySelector(t)??null;return wi(n,o,{get(){return a(this)}})}}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var yi=`:host {
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
`,Ee,N=class extends ue{constructor(){super(),Wo(this,Ee,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,n)=>{if(this.internals?.states)try{n?this.internals.states.add(e):this.internals.states.delete(e)}catch(o){if(String(o).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw o}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,n]of t.elementProperties)n.default==="inherit"&&n.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${n.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[yi,...t].map(e=>typeof e=="string"?ho(e):e)}attributeChangedCallback(t,e,n){Uo(this,Ee)||(this.constructor.elementProperties.forEach((o,i)=>{o.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i])}),jo(this,Ee,!0)),super.attributeChangedCallback(t,e,n)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,n)=>{t.has(n)&&this[n]==null&&(this[n]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const n=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});n.error=e,this.dispatchEvent(n)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Ee=new WeakMap;r([l()],N.prototype,"dir",2);r([l()],N.prototype,"lang",2);r([l({type:Boolean,reflect:!0,attribute:"did-ssr"})],N.prototype,"didSSR",2);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var yn=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},xi=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),F=class extends N{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new yn))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[xi()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const n of e.observedAttributes)t.add(n);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const e=this.value;if(Array.isArray(e)){if(this.name){const n=new FormData;for(const o of e)n.append(this.name,o);this.setValue(n,n)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],n=t[1];let o=t[2];o||(o=this.validationTarget),this.internals.setValidity(e,n,o||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&n),this.customStates.set("user-valid",e&&n)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,n]=t;this.internals.setFormValue(e,n)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},n=this.validationTarget||this.input||void 0;let o="";for(const i of t){const{isValid:a,message:s,invalidKeys:h}=i.checkValidity(this);a||(o||(o=s),h?.length>=0&&h.forEach(c=>e[c]=!0))}o||(o=this.validationMessage),this.setValidity(e,o,n)}};F.formAssociated=!0;r([l({reflect:!0})],F.prototype,"name",2);r([l({type:Boolean})],F.prototype,"disabled",2);r([l({state:!0,attribute:!1})],F.prototype,"valueHasChanged",2);r([l({state:!0,attribute:!1})],F.prototype,"hasInteracted",2);r([l({attribute:"custom-error",reflect:!0})],F.prototype,"customError",2);r([l({attribute:!1,state:!0,type:Object})],F.prototype,"validity",1);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var wt=`@layer wa-utilities {
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
`;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var ki=`:host {
  --checked-icon-color: var(--wa-form-control-activated-color);
  --checked-icon-scale: 0.7;

  color: var(--wa-form-control-value-color);
  display: inline-flex;
  flex-direction: row;
  align-items: top;
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

:host(:focus) {
  outline: none;
}

/* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
:host(:not(:state(checked))) svg circle {
  opacity: 0;
}

[part~='label'] {
  display: inline;
}

[part~='hint'] {
  margin-block-start: 0.5em;
}

/* Default spacing for default appearance radios */
:host([appearance='default']) {
  margin-block: 0.375em; /* Half of the original 0.75em gap on each side */
}

:host([appearance='default'][data-wa-radio-horizontal]) {
  margin-block: 0;
  margin-inline: 0.5em; /* Half of the original 1em gap on each side */
}

/* Remove margin from first/last items to prevent extra space */
:host([appearance='default'][data-wa-radio-first]) {
  margin-block-start: 0;
  margin-inline-start: 0;
}

:host([appearance='default'][data-wa-radio-last]) {
  margin-block-end: 0;
  margin-inline-end: 0;
}

/* Button appearance have no spacing, they get handled by the overlap margins below */
:host([appearance='button']) {
  margin: 0;
  align-items: center;
  min-height: var(--wa-form-control-height);
  background-color: var(--wa-color-surface-default);
  border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
  border-radius: var(--wa-border-radius-m);
  padding: 0 var(--wa-form-control-padding-inline);
  transition:
    background-color var(--wa-transition-fast),
    border-color var(--wa-transition-fast);
}

/* Default appearance */
:host([appearance='default']) {
  .control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    color: transparent;
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  .checked-icon {
    display: flex;
    fill: currentColor;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    scale: var(--checked-icon-scale);
  }
}

/* Button appearance */
:host([appearance='button']) {
  .control {
    display: none;
  }
}

/* Checked */
:host(:state(checked)) .control {
  color: var(--checked-icon-color);
  border-color: var(--wa-form-control-activated-color);
  background-color: var(--wa-form-control-background-color);
}

/* Focus */
:host(:focus-visible) .control {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Disabled */
:host(:state(disabled)) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Horizontal grouping - remove inner border radius */
:host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-inner]) {
  border-radius: 0;
}

:host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-first]) {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}

:host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-last]) {
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}

/* Vertical grouping - remove inner border radius */
:host([appearance='button'][data-wa-radio-vertical][data-wa-radio-inner]) {
  border-radius: 0;
}

:host([appearance='button'][data-wa-radio-vertical][data-wa-radio-first]) {
  border-end-start-radius: 0;
  border-end-end-radius: 0;
}

:host([appearance='button'][data-wa-radio-vertical][data-wa-radio-last]) {
  border-start-start-radius: 0;
  border-start-end-radius: 0;
}

@media (hover: hover) {
  :host([appearance='button']:hover:not(:state(disabled), :state(checked))) {
    background-color: color-mix(in srgb, var(--wa-color-surface-default) 95%, var(--wa-color-mix-hover));
  }
}

:host([appearance='button']:focus-visible) {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

:host([appearance='button']:state(checked)) {
  border-color: var(--wa-form-control-activated-color);
  background-color: var(--wa-color-brand-fill-quiet);
}

:host([appearance='button']:state(checked):focus-visible) {
  outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-brand-border-loud);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Button overlap margins */
:host([appearance='button'][data-wa-radio-horizontal]:not([data-wa-radio-first])) {
  margin-inline-start: calc(-1 * var(--wa-form-control-border-width));
}

:host([appearance='button'][data-wa-radio-vertical]:not([data-wa-radio-first])) {
  margin-block-start: calc(-1 * var(--wa-form-control-border-width));
}

/* Ensure interactive states are visible above adjacent buttons */
:host([appearance='button']:hover),
:host([appearance='button']:state(checked)) {
  position: relative;
  z-index: 1;
}

:host([appearance='button']:focus-visible) {
  z-index: 2;
}
`,mt=class extends F{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.form=null,this.appearance="default",this.size="medium",this.disabled=!1,this.handleClick=()=>{!this.disabled&&!this.forceDisabled&&(this.checked=!0)},this.addEventListener("click",this.handleClick)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.tabIndex=0,this.setAttribute("aria-disabled",this.disabled||this.forceDisabled?"true":"false")}updated(t){if(super.updated(t),t.has("checked")&&(this.customStates.set("checked",this.checked),this.setAttribute("aria-checked",this.checked?"true":"false"),!this.disabled&&!this.forceDisabled&&(this.tabIndex=this.checked?0:-1)),t.has("disabled")||t.has("forceDisabled")){const e=this.disabled||this.forceDisabled;this.customStates.set("disabled",e),this.setAttribute("aria-disabled",e?"true":"false"),e?this.tabIndex=-1:this.tabIndex=this.checked?0:-1}}setValue(){}render(){return g`
      <span part="control" class="control">
        ${this.checked?g`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:""}
      </span>

      <slot part="label" class="label"></slot>
    `}};mt.css=[Kt,wt,ki];r([T()],mt.prototype,"checked",2);r([T()],mt.prototype,"forceDisabled",2);r([l({reflect:!0})],mt.prototype,"form",2);r([l({reflect:!0})],mt.prototype,"value",2);r([l({reflect:!0})],mt.prototype,"appearance",2);r([l({reflect:!0})],mt.prototype,"size",2);r([l({type:Boolean})],mt.prototype,"disabled",2);mt=r([B("wa-radio")],mt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var $i=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var on="",an="";function Nn(t){on=t}function Si(t=""){if(!on){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const n=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;Nn(n)}else{const o=[...document.getElementsByTagName("script")].find(i=>i.src.endsWith("webawesome.js")||i.src.endsWith("webawesome.loader.js")||i.src.endsWith("webawesome.ssr-loader.js"));if(o){const i=String(o.getAttribute("src"));Nn(i.split("/").slice(0,-1).join("/"))}}}return on.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function Ei(t){an=t}function Ci(){if(!an){const t=document.querySelector("[data-fa-kit-code]");t&&Ei(t.getAttribute("data-fa-kit-code")||"")}return an}var $t="7.0.1";function Ai(t,e,n){const o=Ci(),i=o.length>0;let a="solid";return e==="notdog"?(n==="solid"&&(a="solid"),n==="duo-solid"&&(a="duo-solid"),`https://ka-p.fontawesome.com/releases/v${$t}/svgs/notdog-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="chisel"?`https://ka-p.fontawesome.com/releases/v${$t}/svgs/chisel-regular/${t}.svg?token=${encodeURIComponent(o)}`:e==="etch"?`https://ka-p.fontawesome.com/releases/v${$t}/svgs/etch-solid/${t}.svg?token=${encodeURIComponent(o)}`:e==="jelly"?(n==="regular"&&(a="regular"),n==="duo-regular"&&(a="duo-regular"),n==="fill-regular"&&(a="fill-regular"),`https://ka-p.fontawesome.com/releases/v${$t}/svgs/jelly-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="slab"?((n==="solid"||n==="regular")&&(a="regular"),n==="press-regular"&&(a="press-regular"),`https://ka-p.fontawesome.com/releases/v${$t}/svgs/slab-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="thumbprint"?`https://ka-p.fontawesome.com/releases/v${$t}/svgs/thumbprint-light/${t}.svg?token=${encodeURIComponent(o)}`:e==="whiteboard"?`https://ka-p.fontawesome.com/releases/v${$t}/svgs/whiteboard-semibold/${t}.svg?token=${encodeURIComponent(o)}`:(e==="classic"&&(n==="thin"&&(a="thin"),n==="light"&&(a="light"),n==="regular"&&(a="regular"),n==="solid"&&(a="solid")),e==="sharp"&&(n==="thin"&&(a="sharp-thin"),n==="light"&&(a="sharp-light"),n==="regular"&&(a="sharp-regular"),n==="solid"&&(a="sharp-solid")),e==="duotone"&&(n==="thin"&&(a="duotone-thin"),n==="light"&&(a="duotone-light"),n==="regular"&&(a="duotone-regular"),n==="solid"&&(a="duotone")),e==="sharp-duotone"&&(n==="thin"&&(a="sharp-duotone-thin"),n==="light"&&(a="sharp-duotone-light"),n==="regular"&&(a="sharp-duotone-regular"),n==="solid"&&(a="sharp-duotone-solid")),e==="brands"&&(a="brands"),i?`https://ka-p.fontawesome.com/releases/v${$t}/svgs/${a}/${t}.svg?token=${encodeURIComponent(o)}`:`https://ka-f.fontawesome.com/releases/v${$t}/svgs/${a}/${t}.svg`)}var Ti={name:"default",resolver:(t,e="classic",n="solid")=>Ai(t,e,n),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){const{family:n,variant:o}=e;if(n==="duotone"||n==="sharp-duotone"||n==="notdog"&&o==="duo-solid"||n==="jelly"&&o==="duo-regular"||n==="thumbprint"){const i=[...t.querySelectorAll("path")],a=i.find(h=>!h.hasAttribute("opacity")),s=i.find(h=>h.hasAttribute("opacity"));if(!a||!s)return;if(a.setAttribute("data-duotone-primary",""),s.setAttribute("data-duotone-secondary",""),e.swapOpacity&&a&&s){const h=s.getAttribute("opacity")||"0.4";a.style.setProperty("--path-opacity",h),s.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},_i=Ti;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Li(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var je={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Ri={name:"system",resolver:(t,e="classic",n="solid")=>{let i=je[n][t]??je.regular[t]??je.regular["circle-question"];return i?Li(i):""}},Vi=Ri;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Oi="classic",_e=[_i,Vi],Le=[];function Di(t){Le.push(t)}function zi(t){Le=Le.filter(e=>e!==t)}function Ke(t){return _e.find(e=>e.name===t)}function Pr(t,e){Mi(t),_e.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),Le.forEach(n=>{n.library===t&&n.setIcon()})}function Mi(t){_e=_e.filter(e=>e.name!==t)}function Ii(){return Oi}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function D(t,e){const n={waitUntilFirstUpdate:!1,...e};return(o,i)=>{const{update:a}=o,s=Array.isArray(t)?t:[t];o.update=function(h){s.forEach(c=>{const d=c;if(h.has(d)){const u=h.get(d),p=this[d];u!==p&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[i](u,p)}}),a.call(this,h)}}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pi=(t,e)=>t?._$litType$!==void 0,Bi=t=>t.strings===void 0,Fi={},Hi=(t,e=Fi)=>t._$AH=e;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var qi=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},Ni=`:host {
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
`,se=Symbol(),ge=Symbol(),Ye,Xe=new Map,G=class extends N{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.resolveIcon=async(t,e)=>{let n;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=g`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const o=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(o,this),this.svg}try{if(n=await fetch(t,{mode:"cors"}),!n.ok)return n.status===410?se:ge}catch{return ge}try{const o=document.createElement("div");o.innerHTML=await n.text();const i=o.firstElementChild;if(i?.tagName?.toLowerCase()!=="svg")return se;Ye||(Ye=new DOMParser);const s=Ye.parseFromString(i.outerHTML,"text/html").body.querySelector("svg");return s?(s.part.add("svg"),document.adoptNode(s)):se}catch{return se}}}connectedCallback(){super.connectedCallback(),Di(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),zi(this)}getIconSource(){const t=Ke(this.library),e=this.family||Ii();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),n=e?Ke(this.library):void 0;if(!t){this.svg=null;return}let o=Xe.get(t);o||(o=this.resolveIcon(t,n),Xe.set(t,o));const i=await o;if(i===ge&&Xe.delete(t),t===this.getIconSource().url){if(Pi(i)){this.svg=i;return}switch(i){case ge:case se:this.svg=null,this.dispatchEvent(new qi);break;default:this.svg=i.cloneNode(!0),n?.mutator?.(this.svg,this),this.dispatchEvent(new $i)}}}updated(t){super.updated(t);const e=Ke(this.library),n=this.shadowRoot?.querySelector("svg");n&&e?.mutator?.(n,this)}render(){return this.hasUpdated?this.svg:g`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`}};G.css=Ni;r([T()],G.prototype,"svg",2);r([l({reflect:!0})],G.prototype,"name",2);r([l({reflect:!0})],G.prototype,"family",2);r([l({reflect:!0})],G.prototype,"variant",2);r([l({attribute:"auto-width",type:Boolean,reflect:!0})],G.prototype,"autoWidth",2);r([l({attribute:"swap-opacity",type:Boolean,reflect:!0})],G.prototype,"swapOpacity",2);r([l()],G.prototype,"src",2);r([l()],G.prototype,"label",2);r([l({reflect:!0})],G.prototype,"library",2);r([D("label")],G.prototype,"handleLabelChange",1);r([D(["family","name","library","variant","src","autoWidth","swapOpacity"])],G.prototype,"setIcon",1);G=r([B("wa-icon")],G);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Me=(t={})=>{let{validationElement:e,validationProperty:n}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),n||(n="value");const o={observedAttributes:["required"],message:e.validationMessage,checkValidity(i){const a={message:"",isValid:!0,invalidKeys:[]};return(i.required??i.hasAttribute("required"))&&!i[n]&&(a.message=typeof o.message=="function"?o.message(i):o.message||"",a.isValid=!1,a.invalidKeys.push("valueMissing")),a}};return o};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Pt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=n=>{const o=n.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};const Ui="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let Wi=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=Ui[n[t]&63];return e};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function R(t,e,n){const o=i=>Object.is(i,-0)?0:i;return t<e?o(e):t>n?o(n):o(t)}function xn(t=""){return`${t}${Wi()}`}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Ie=t=>(...e)=>({_$litDirective$:t,values:e});let Pe=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,o){this._$Ct=e,this._$AM=n,this._$Ci=o}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=Ie(class extends Pe{constructor(t){if(super(t),t.type!==Et.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}const n=t.element.classList;for(const o of this.st)o in e||(n.remove(o),this.st.delete(o));for(const o in e){const i=!!e[o];i===this.st.has(o)||this.nt?.has(o)||(i?(n.add(o),this.st.add(o)):(n.remove(o),this.st.delete(o)))}return tt}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var ji=`:host {
  display: block;
}

.form-control {
  position: relative;
  border: none;
  padding: 0;
  margin: 0;
}

.label {
  padding: 0;
}

.radio-group-required .label::after {
  content: var(--wa-form-control-required-content);
  margin-inline-start: var(--wa-form-control-required-content-offset);
}

[part~='form-control-input'] {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0; /* Radios handle their own spacing */
}

/* Horizontal */
:host([orientation='horizontal']) [part~='form-control-input'] {
  flex-direction: row;
}

/* Help text */
[part~='hint'] {
  margin-block-start: 0.5em;
}
`,j=class extends F{constructor(){super(),this.hasSlotController=new Pt(this,"hint","label"),this.label="",this.hint="",this.name=null,this.disabled=!1,this.orientation="vertical",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=t=>{const e=t.target.closest("wa-radio");if(!e||e.disabled||e.forceDisabled||this.disabled)return;const n=this.value;this.value=e.value,e.checked=!0;const o=this.getAllRadios();for(const i of o)e!==i&&(i.checked=!1,i.setAttribute("tabindex","-1"));this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})},this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("click",this.handleRadioClick)}static get validators(){const t=[Me({validationElement:Object.assign(document.createElement("input"),{required:!0,type:"radio",name:xn("__wa-radio")})})];return[...super.validators,...t]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){typeof t=="number"&&(t=String(t)),this.valueHasChanged=!0,this._value=t}get validationTarget(){const t=this.querySelector(":is(wa-radio):not([disabled])");if(t)return t}updated(t){(t.has("disabled")||t.has("value"))&&this.syncRadioElements()}formResetCallback(...t){this.value=this.defaultValue,super.formResetCallback(...t),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll("wa-radio")]}handleLabelClick(){this.focus()}async syncRadioElements(){const t=this.getAllRadios();if(t.forEach((e,n)=>{e.setAttribute("size",this.size),e.toggleAttribute("data-wa-radio-horizontal",this.orientation!=="vertical"),e.toggleAttribute("data-wa-radio-vertical",this.orientation==="vertical"),e.toggleAttribute("data-wa-radio-first",n===0),e.toggleAttribute("data-wa-radio-inner",n!==0&&n!==t.length-1),e.toggleAttribute("data-wa-radio-last",n===t.length-1),e.forceDisabled=this.disabled}),await Promise.all(t.map(async e=>{await e.updateComplete,!e.disabled&&e.value===this.value?e.checked=!0:e.checked=!1})),this.disabled)t.forEach(e=>{e.tabIndex=-1});else{const e=t.filter(o=>!o.disabled),n=e.find(o=>o.checked);e.length>0&&(n?e.forEach(o=>{o.tabIndex=o.checked?0:-1}):e.forEach((o,i)=>{o.tabIndex=i===0?0:-1})),t.filter(o=>o.disabled).forEach(o=>{o.tabIndex=-1})}}handleKeyDown(t){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key)||this.disabled)return;const e=this.getAllRadios().filter(h=>!h.disabled);if(e.length<=0)return;t.preventDefault();const n=this.value,o=e.find(h=>h.checked)??e[0],i=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1;let a=e.indexOf(o)+i;a||(a=0),a<0&&(a=e.length-1),a>e.length-1&&(a=0);const s=e.some(h=>h.tagName.toLowerCase()==="wa-radio-button");this.getAllRadios().forEach(h=>{h.checked=!1,s||h.setAttribute("tabindex","-1")}),this.value=e[a].value,e[a].checked=!0,s?e[a].shadowRoot.querySelector("button").focus():(e[a].setAttribute("tabindex","0"),e[a].focus()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),t.preventDefault()}focus(t){if(this.disabled)return;const e=this.getAllRadios(),n=e.find(a=>a.checked),o=e.find(a=>!a.disabled),i=n||o;i&&i.focus(t)}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e;return g`
      <fieldset
        part="form-control"
        class=${O({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":n})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class="label"
          aria-hidden=${n?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${O({"has-slotted":o})}
          aria-hidden=${o?"false":"true"}
          >${this.hint}</slot
        >
      </fieldset>
    `}};j.css=[wt,Kt,ji];j.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};r([x("slot:not([name])")],j.prototype,"defaultSlot",2);r([l()],j.prototype,"label",2);r([l({attribute:"hint"})],j.prototype,"hint",2);r([l({reflect:!0})],j.prototype,"name",2);r([l({type:Boolean,reflect:!0})],j.prototype,"disabled",2);r([l({reflect:!0})],j.prototype,"orientation",2);r([T()],j.prototype,"value",1);r([l({attribute:"value",reflect:!0})],j.prototype,"defaultValue",2);r([l({reflect:!0})],j.prototype,"size",2);r([l({type:Boolean,reflect:!0})],j.prototype,"required",2);r([l({type:Boolean,attribute:"with-label"})],j.prototype,"withLabel",2);r([l({type:Boolean,attribute:"with-hint"})],j.prototype,"withHint",2);j=r([B("wa-radio-group")],j);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var mo=()=>({checkValidity(t){const e=t.input,n={message:"",isValid:!0,invalidKeys:[]};if(!e)return n;let o=!0;if("checkValidity"in e&&(o=e.checkValidity()),o)return n;if(n.isValid=!1,"validationMessage"in e&&(n.message=e.validationMessage),!("validity"in e))return n.invalidKeys.push("customError"),n;for(const i in e.validity){if(i==="valid")continue;const a=i;e.validity[a]&&n.invalidKeys.push(a)}return n}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Be=`@layer wa-utilities {
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
`;const rn=new Set,Xt=new Map;let Ht,kn="ltr",$n="en";const bo=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(bo){const t=new MutationObserver(vo);kn=document.documentElement.dir||"ltr",$n=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function go(...t){t.map(e=>{const n=e.$code.toLowerCase();Xt.has(n)?Xt.set(n,Object.assign(Object.assign({},Xt.get(n)),e)):Xt.set(n,e),Ht||(Ht=e)}),vo()}function vo(){bo&&(kn=document.documentElement.dir||"ltr",$n=document.documentElement.lang||navigator.language),[...rn.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let Ki=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){rn.add(this.host)}hostDisconnected(){rn.delete(this.host)}dir(){return`${this.host.dir||kn}`.toLowerCase()}lang(){return`${this.host.lang||$n}`.toLowerCase()}getTranslationData(e){var n,o;const i=new Intl.Locale(e.replace(/_/g,"-")),a=i?.language.toLowerCase(),s=(o=(n=i?.region)===null||n===void 0?void 0:n.toLowerCase())!==null&&o!==void 0?o:"",h=Xt.get(`${a}-${s}`),c=Xt.get(a);return{locale:i,language:a,region:s,primary:h,secondary:c}}exists(e,n){var o;const{primary:i,secondary:a}=this.getTranslationData((o=n.lang)!==null&&o!==void 0?o:this.lang());return n=Object.assign({includeFallback:!1},n),!!(i&&i[e]||a&&a[e]||n.includeFallback&&Ht&&Ht[e])}term(e,...n){const{primary:o,secondary:i}=this.getTranslationData(this.lang());let a;if(o&&o[e])a=o[e];else if(i&&i[e])a=i[e];else if(Ht&&Ht[e])a=Ht[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof a=="function"?a(...n):a}date(e,n){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),n).format(e)}number(e,n){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),n).format(e)}relativeTime(e,n,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,n)}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var wo={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};go(wo);var Yi=wo;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var at=class extends Ki{};go(Yi);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=t=>t??I;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yo=Symbol.for(""),Xi=t=>{if(t?.r===yo)return t?._$litStatic$},Un=(t,...e)=>({_$litStatic$:e.reduce(((n,o,i)=>n+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[i+1]),t[0]),r:yo}),Wn=new Map,Gi=t=>(e,...n)=>{const o=n.length;let i,a;const s=[],h=[];let c,d=0,u=!1;for(;d<o;){for(c=e[d];d<o&&(a=n[d],(i=Xi(a))!==void 0);)c+=i+e[++d],u=!0;d!==o&&h.push(a),s.push(c),d++}if(d===o&&s.push(e[o]),u){const p=s.join("$$lit$$");(e=Wn.get(p))===void 0&&(s.raw=s,Wn.set(p,e=s)),n=h}return t(e,...n)},Ge=Gi(g);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Qi=`@layer wa-component {
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
:host([appearance='plain']) {
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

:host([appearance='outlined']) {
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

:host([appearance='filled']) {
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

:host([appearance='filled-outlined']) {
  .button {
    color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
    border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
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

:host([appearance='accent']) {
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

.button.is-icon-button:has(wa-icon) {
  width: auto;
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

wa-icon[part='caret'] {
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

.button ::slotted(wa-badge) {
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
.button:not(.visually-hidden-label) [part='caret'] {
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
`,A=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Pt(this,"[default]","start","end"),this.localize=new at(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button",this.form=null}static get validators(){return[...super.validators,mo()]}constructLightDOMButton(){const t=document.createElement("button");return t.type=this.type,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.name&&(t.name=this.name),t.value=this.value||"",["form","formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{this.hasAttribute(e)&&t.setAttribute(e,this.getAttribute(e))}),t}handleClick(){if(!this.getForm())return;const e=this.constructLightDOMButton();this.parentElement?.append(e),e.click(),e.remove()}handleInvalid(){this.dispatchEvent(new yn)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,n=!1,o=!1,i=!1;[...t].forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){const s=a;s.localName==="wa-icon"?(n=!0,e||(e=s.label!==void 0)):i=!0}else a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()||"").length>0&&(o=!0)}),this.isIconButton=n&&!o&&!i,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?Un`a`:Un`button`;return Ge`
      <${e}
        part="base"
        class=${O({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
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
        ${this.withCaret?Ge`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Ge`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};A.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};A.css=[Qi,Be,wt];r([x(".button")],A.prototype,"button",2);r([x("slot:not([name])")],A.prototype,"labelSlot",2);r([T()],A.prototype,"invalid",2);r([T()],A.prototype,"isIconButton",2);r([l()],A.prototype,"title",2);r([l({reflect:!0})],A.prototype,"variant",2);r([l({reflect:!0})],A.prototype,"appearance",2);r([l({reflect:!0})],A.prototype,"size",2);r([l({attribute:"with-caret",type:Boolean,reflect:!0})],A.prototype,"withCaret",2);r([l({type:Boolean})],A.prototype,"disabled",2);r([l({type:Boolean,reflect:!0})],A.prototype,"loading",2);r([l({type:Boolean,reflect:!0})],A.prototype,"pill",2);r([l()],A.prototype,"type",2);r([l({reflect:!0})],A.prototype,"name",2);r([l({reflect:!0})],A.prototype,"value",2);r([l({reflect:!0})],A.prototype,"href",2);r([l()],A.prototype,"target",2);r([l()],A.prototype,"rel",2);r([l()],A.prototype,"download",2);r([l({reflect:!0})],A.prototype,"form",2);r([l({attribute:"formaction"})],A.prototype,"formAction",2);r([l({attribute:"formenctype"})],A.prototype,"formEnctype",2);r([l({attribute:"formmethod"})],A.prototype,"formMethod",2);r([l({attribute:"formnovalidate",type:Boolean})],A.prototype,"formNoValidate",2);r([l({attribute:"formtarget"})],A.prototype,"formTarget",2);r([D("disabled",{waitUntilFirstUpdate:!0})],A.prototype,"handleDisabledChange",1);A=r([B("wa-button")],A);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Zi=`:host {
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
`,sn=class extends N{constructor(){super(...arguments),this.localize=new at(this)}render(){return g`
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
    `}};sn.css=Zi;sn=r([B("wa-spinner")],sn);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ji=`:host {
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
:host([appearance='outlined']) {
  --pulse-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));

  color: var(--wa-color-on-quiet, var(--wa-color-brand-on-quiet));
  background-color: transparent;
  border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
}

:host([appearance='filled']) {
  --pulse-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));

  color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
  background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
  border-color: transparent;
}

:host([appearance='filled-outlined']) {
  --pulse-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));

  color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
  background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
  border-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));
}

:host([appearance='accent']) {
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
`,Wt=class extends N{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return g` <slot part="base" role="status"></slot>`}};Wt.css=[Be,Ji];r([l({reflect:!0})],Wt.prototype,"variant",2);r([l({reflect:!0})],Wt.prototype,"appearance",2);r([l({type:Boolean,reflect:!0})],Wt.prototype,"pill",2);r([l({reflect:!0})],Wt.prototype,"attention",2);Wt=r([B("wa-badge")],Wt);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ln=Ie(class extends Pe{constructor(t){if(super(t),t.type!==Et.PROPERTY&&t.type!==Et.ATTRIBUTE&&t.type!==Et.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Bi(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===tt||e===I)return e;const n=t.element,o=t.name;if(t.type===Et.PROPERTY){if(e===n[o])return tt}else if(t.type===Et.BOOLEAN_ATTRIBUTE){if(!!e===n.hasAttribute(o))return tt}else if(t.type===Et.ATTRIBUTE&&n.getAttribute(o)===e+"")return tt;return Hi(t),e}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var ta=`:host {
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
`,H=class extends F{constructor(){super(...arguments),this.hasSlotController=new Pt(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint=""}static get validators(){const t=[Me({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){const t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,n=!this.checked&&this.indeterminate,o=n?"indeterminate":"check",i=n?"indeterminate":"check";return g`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${_(this._value)}
            .indeterminate=${ln(this.indeterminate)}
            .checked=${ln(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${i}-icon icon" library="system" name=${o}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${O({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};H.css=[Kt,wt,ta];H.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};r([x('input[type="checkbox"]')],H.prototype,"input",2);r([l()],H.prototype,"title",2);r([l({reflect:!0})],H.prototype,"name",2);r([l({reflect:!0})],H.prototype,"value",1);r([l({reflect:!0})],H.prototype,"size",2);r([l({type:Boolean})],H.prototype,"disabled",2);r([l({type:Boolean,reflect:!0})],H.prototype,"indeterminate",2);r([l({type:Boolean,attribute:!1})],H.prototype,"checked",2);r([l({type:Boolean,reflect:!0,attribute:"checked"})],H.prototype,"defaultChecked",2);r([l({reflect:!0})],H.prototype,"form",2);r([l({type:Boolean,reflect:!0})],H.prototype,"required",2);r([l()],H.prototype,"hint",2);r([D("defaultChecked")],H.prototype,"handleDefaultCheckedChange",1);r([D(["checked","indeterminate"])],H.prototype,"handleStateChange",1);r([D("disabled")],H.prototype,"handleDisabledChange",1);H=r([B("wa-checkbox")],H);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var ea=`:host {
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
`,Zt=class extends N{constructor(){super(...arguments),this.localize=new at(this),this.value=0,this.indeterminate=!1,this.label=""}updated(t){t.has("value")&&requestAnimationFrame(()=>{this.style.setProperty("--percentage",`${R(this.value,0,100)}%`)})}render(){return g`
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
    `}};Zt.css=ea;r([l({type:Number,reflect:!0})],Zt.prototype,"value",2);r([l({type:Boolean,reflect:!0})],Zt.prototype,"indeterminate",2);r([l()],Zt.prototype,"label",2);Zt=r([B("wa-progress-bar")],Zt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var na=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};const Dt=Math.min,J=Math.max,Re=Math.round,ve=Math.floor,ft=t=>({x:t,y:t}),oa={left:"right",right:"left",bottom:"top",top:"bottom"},ia={start:"end",end:"start"};function hn(t,e,n){return J(t,Dt(e,n))}function oe(t,e){return typeof t=="function"?t(e):t}function zt(t){return t.split("-")[0]}function ie(t){return t.split("-")[1]}function xo(t){return t==="x"?"y":"x"}function Sn(t){return t==="y"?"height":"width"}const aa=new Set(["top","bottom"]);function Ct(t){return aa.has(zt(t))?"y":"x"}function En(t){return xo(Ct(t))}function ra(t,e,n){n===void 0&&(n=!1);const o=ie(t),i=En(t),a=Sn(i);let s=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(s=Ve(s)),[s,Ve(s)]}function sa(t){const e=Ve(t);return[cn(t),e,cn(e)]}function cn(t){return t.replace(/start|end/g,e=>ia[e])}const jn=["left","right"],Kn=["right","left"],la=["top","bottom"],ha=["bottom","top"];function ca(t,e,n){switch(t){case"top":case"bottom":return n?e?Kn:jn:e?jn:Kn;case"left":case"right":return e?la:ha;default:return[]}}function ua(t,e,n,o){const i=ie(t);let a=ca(zt(t),n==="start",o);return i&&(a=a.map(s=>s+"-"+i),e&&(a=a.concat(a.map(cn)))),a}function Ve(t){return t.replace(/left|right|bottom|top/g,e=>oa[e])}function da(t){return{top:0,right:0,bottom:0,left:0,...t}}function ko(t){return typeof t!="number"?da(t):{top:t,right:t,bottom:t,left:t}}function Oe(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function Yn(t,e,n){let{reference:o,floating:i}=t;const a=Ct(e),s=En(e),h=Sn(s),c=zt(e),d=a==="y",u=o.x+o.width/2-i.width/2,p=o.y+o.height/2-i.height/2,f=o[h]/2-i[h]/2;let m;switch(c){case"top":m={x:u,y:o.y-i.height};break;case"bottom":m={x:u,y:o.y+o.height};break;case"right":m={x:o.x+o.width,y:p};break;case"left":m={x:o.x-i.width,y:p};break;default:m={x:o.x,y:o.y}}switch(ie(e)){case"start":m[s]-=f*(n&&d?-1:1);break;case"end":m[s]+=f*(n&&d?-1:1);break}return m}const pa=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:a=[],platform:s}=n,h=a.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(e));let d=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:u,y:p}=Yn(d,o,c),f=o,m={},b=0;for(let v=0;v<h.length;v++){const{name:E,fn:k}=h[v],{x:C,y:V,data:q,reset:z}=await k({x:u,y:p,initialPlacement:o,placement:f,strategy:i,middlewareData:m,rects:d,platform:s,elements:{reference:t,floating:e}});u=C??u,p=V??p,m={...m,[E]:{...m[E],...q}},z&&b<=50&&(b++,typeof z=="object"&&(z.placement&&(f=z.placement),z.rects&&(d=z.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):z.rects),{x:u,y:p}=Yn(d,f,c)),v=-1)}return{x:u,y:p,placement:f,strategy:i,middlewareData:m}};async function Cn(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:a,rects:s,elements:h,strategy:c}=t,{boundary:d="clippingAncestors",rootBoundary:u="viewport",elementContext:p="floating",altBoundary:f=!1,padding:m=0}=oe(e,t),b=ko(m),E=h[f?p==="floating"?"reference":"floating":p],k=Oe(await a.getClippingRect({element:(n=await(a.isElement==null?void 0:a.isElement(E)))==null||n?E:E.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(h.floating)),boundary:d,rootBoundary:u,strategy:c})),C=p==="floating"?{x:o,y:i,width:s.floating.width,height:s.floating.height}:s.reference,V=await(a.getOffsetParent==null?void 0:a.getOffsetParent(h.floating)),q=await(a.isElement==null?void 0:a.isElement(V))?await(a.getScale==null?void 0:a.getScale(V))||{x:1,y:1}:{x:1,y:1},z=Oe(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:h,rect:C,offsetParent:V,strategy:c}):C);return{top:(k.top-z.top+b.top)/q.y,bottom:(z.bottom-k.bottom+b.bottom)/q.y,left:(k.left-z.left+b.left)/q.x,right:(z.right-k.right+b.right)/q.x}}const fa=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:i,rects:a,platform:s,elements:h,middlewareData:c}=e,{element:d,padding:u=0}=oe(t,e)||{};if(d==null)return{};const p=ko(u),f={x:n,y:o},m=En(i),b=Sn(m),v=await s.getDimensions(d),E=m==="y",k=E?"top":"left",C=E?"bottom":"right",V=E?"clientHeight":"clientWidth",q=a.reference[b]+a.reference[m]-f[m]-a.floating[b],z=f[m]-a.reference[m],rt=await(s.getOffsetParent==null?void 0:s.getOffsetParent(d));let W=rt?rt[V]:0;(!W||!await(s.isElement==null?void 0:s.isElement(rt)))&&(W=h.floating[V]||a.floating[b]);const xt=q/2-z/2,dt=W/2-v[b]/2-1,ot=Dt(p[k],dt),Tt=Dt(p[C],dt),pt=ot,_t=W-v[b]-Tt,K=W/2-v[b]/2+xt,Bt=hn(pt,K,_t),kt=!c.arrow&&ie(i)!=null&&K!==Bt&&a.reference[b]/2-(K<pt?ot:Tt)-v[b]/2<0,st=kt?K<pt?K-pt:K-_t:0;return{[m]:f[m]+st,data:{[m]:Bt,centerOffset:K-Bt-st,...kt&&{alignmentOffset:st}},reset:kt}}}),ma=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:a,rects:s,initialPlacement:h,platform:c,elements:d}=e,{mainAxis:u=!0,crossAxis:p=!0,fallbackPlacements:f,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=!0,...E}=oe(t,e);if((n=a.arrow)!=null&&n.alignmentOffset)return{};const k=zt(i),C=Ct(h),V=zt(h)===h,q=await(c.isRTL==null?void 0:c.isRTL(d.floating)),z=f||(V||!v?[Ve(h)]:sa(h)),rt=b!=="none";!f&&rt&&z.push(...ua(h,v,b,q));const W=[h,...z],xt=await Cn(e,E),dt=[];let ot=((o=a.flip)==null?void 0:o.overflows)||[];if(u&&dt.push(xt[k]),p){const K=ra(i,s,q);dt.push(xt[K[0]],xt[K[1]])}if(ot=[...ot,{placement:i,overflows:dt}],!dt.every(K=>K<=0)){var Tt,pt;const K=(((Tt=a.flip)==null?void 0:Tt.index)||0)+1,Bt=W[K];if(Bt&&(!(p==="alignment"?C!==Ct(Bt):!1)||ot.every(lt=>Ct(lt.placement)===C?lt.overflows[0]>0:!0)))return{data:{index:K,overflows:ot},reset:{placement:Bt}};let kt=(pt=ot.filter(st=>st.overflows[0]<=0).sort((st,lt)=>st.overflows[1]-lt.overflows[1])[0])==null?void 0:pt.placement;if(!kt)switch(m){case"bestFit":{var _t;const st=(_t=ot.filter(lt=>{if(rt){const Lt=Ct(lt.placement);return Lt===C||Lt==="y"}return!0}).map(lt=>[lt.placement,lt.overflows.filter(Lt=>Lt>0).reduce((Lt,Ho)=>Lt+Ho,0)]).sort((lt,Lt)=>lt[1]-Lt[1])[0])==null?void 0:_t[0];st&&(kt=st);break}case"initialPlacement":kt=h;break}if(i!==kt)return{reset:{placement:kt}}}return{}}}},ba=new Set(["left","top"]);async function ga(t,e){const{placement:n,platform:o,elements:i}=t,a=await(o.isRTL==null?void 0:o.isRTL(i.floating)),s=zt(n),h=ie(n),c=Ct(n)==="y",d=ba.has(s)?-1:1,u=a&&c?-1:1,p=oe(e,t);let{mainAxis:f,crossAxis:m,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return h&&typeof b=="number"&&(m=h==="end"?b*-1:b),c?{x:m*u,y:f*d}:{x:f*d,y:m*u}}const va=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:a,placement:s,middlewareData:h}=e,c=await ga(e,t);return s===((n=h.offset)==null?void 0:n.placement)&&(o=h.arrow)!=null&&o.alignmentOffset?{}:{x:i+c.x,y:a+c.y,data:{...c,placement:s}}}}},wa=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:a=!0,crossAxis:s=!1,limiter:h={fn:E=>{let{x:k,y:C}=E;return{x:k,y:C}}},...c}=oe(t,e),d={x:n,y:o},u=await Cn(e,c),p=Ct(zt(i)),f=xo(p);let m=d[f],b=d[p];if(a){const E=f==="y"?"top":"left",k=f==="y"?"bottom":"right",C=m+u[E],V=m-u[k];m=hn(C,m,V)}if(s){const E=p==="y"?"top":"left",k=p==="y"?"bottom":"right",C=b+u[E],V=b-u[k];b=hn(C,b,V)}const v=h.fn({...e,[f]:m,[p]:b});return{...v,data:{x:v.x-n,y:v.y-o,enabled:{[f]:a,[p]:s}}}}}},ya=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:i,rects:a,platform:s,elements:h}=e,{apply:c=()=>{},...d}=oe(t,e),u=await Cn(e,d),p=zt(i),f=ie(i),m=Ct(i)==="y",{width:b,height:v}=a.floating;let E,k;p==="top"||p==="bottom"?(E=p,k=f===(await(s.isRTL==null?void 0:s.isRTL(h.floating))?"start":"end")?"left":"right"):(k=p,E=f==="end"?"top":"bottom");const C=v-u.top-u.bottom,V=b-u.left-u.right,q=Dt(v-u[E],C),z=Dt(b-u[k],V),rt=!e.middlewareData.shift;let W=q,xt=z;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(xt=V),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(W=C),rt&&!f){const ot=J(u.left,0),Tt=J(u.right,0),pt=J(u.top,0),_t=J(u.bottom,0);m?xt=b-2*(ot!==0||Tt!==0?ot+Tt:J(u.left,u.right)):W=v-2*(pt!==0||_t!==0?pt+_t:J(u.top,u.bottom))}await c({...e,availableWidth:xt,availableHeight:W});const dt=await s.getDimensions(h.floating);return b!==dt.width||v!==dt.height?{reset:{rects:!0}}:{}}}};function Fe(){return typeof window<"u"}function ae(t){return $o(t)?(t.nodeName||"").toLowerCase():"#document"}function et(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function yt(t){var e;return(e=($o(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function $o(t){return Fe()?t instanceof Node||t instanceof et(t).Node:!1}function ht(t){return Fe()?t instanceof Element||t instanceof et(t).Element:!1}function bt(t){return Fe()?t instanceof HTMLElement||t instanceof et(t).HTMLElement:!1}function Xn(t){return!Fe()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof et(t).ShadowRoot}const xa=new Set(["inline","contents"]);function be(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=ct(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!xa.has(i)}const ka=new Set(["table","td","th"]);function $a(t){return ka.has(ae(t))}const Sa=[":popover-open",":modal"];function He(t){return Sa.some(e=>{try{return t.matches(e)}catch{return!1}})}const Ea=["transform","translate","scale","rotate","perspective"],Ca=["transform","translate","scale","rotate","perspective","filter"],Aa=["paint","layout","strict","content"];function qe(t){const e=An(),n=ht(t)?ct(t):t;return Ea.some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||Ca.some(o=>(n.willChange||"").includes(o))||Aa.some(o=>(n.contain||"").includes(o))}function Ta(t){let e=Mt(t);for(;bt(e)&&!Jt(e);){if(qe(e))return e;if(He(e))return null;e=Mt(e)}return null}function An(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const _a=new Set(["html","body","#document"]);function Jt(t){return _a.has(ae(t))}function ct(t){return et(t).getComputedStyle(t)}function Ne(t){return ht(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Mt(t){if(ae(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Xn(t)&&t.host||yt(t);return Xn(e)?e.host:e}function So(t){const e=Mt(t);return Jt(e)?t.ownerDocument?t.ownerDocument.body:t.body:bt(e)&&be(e)?e:So(e)}function te(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const i=So(t),a=i===((o=t.ownerDocument)==null?void 0:o.body),s=et(i);if(a){const h=un(s);return e.concat(s,s.visualViewport||[],be(i)?i:[],h&&n?te(h):[])}return e.concat(i,te(i,[],n))}function un(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Eo(t){const e=ct(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=bt(t),a=i?t.offsetWidth:n,s=i?t.offsetHeight:o,h=Re(n)!==a||Re(o)!==s;return h&&(n=a,o=s),{width:n,height:o,$:h}}function Tn(t){return ht(t)?t:t.contextElement}function Gt(t){const e=Tn(t);if(!bt(e))return ft(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:a}=Eo(e);let s=(a?Re(n.width):n.width)/o,h=(a?Re(n.height):n.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!h||!Number.isFinite(h))&&(h=1),{x:s,y:h}}const La=ft(0);function Co(t){const e=et(t);return!An()||!e.visualViewport?La:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Ra(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==et(t)?!1:e}function jt(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),a=Tn(t);let s=ft(1);e&&(o?ht(o)&&(s=Gt(o)):s=Gt(t));const h=Ra(a,n,o)?Co(a):ft(0);let c=(i.left+h.x)/s.x,d=(i.top+h.y)/s.y,u=i.width/s.x,p=i.height/s.y;if(a){const f=et(a),m=o&&ht(o)?et(o):o;let b=f,v=un(b);for(;v&&o&&m!==b;){const E=Gt(v),k=v.getBoundingClientRect(),C=ct(v),V=k.left+(v.clientLeft+parseFloat(C.paddingLeft))*E.x,q=k.top+(v.clientTop+parseFloat(C.paddingTop))*E.y;c*=E.x,d*=E.y,u*=E.x,p*=E.y,c+=V,d+=q,b=et(v),v=un(b)}}return Oe({width:u,height:p,x:c,y:d})}function Ue(t,e){const n=Ne(t).scrollLeft;return e?e.left+n:jt(yt(t)).left+n}function Ao(t,e){const n=t.getBoundingClientRect(),o=n.left+e.scrollLeft-Ue(t,n),i=n.top+e.scrollTop;return{x:o,y:i}}function Va(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const a=i==="fixed",s=yt(o),h=e?He(e.floating):!1;if(o===s||h&&a)return n;let c={scrollLeft:0,scrollTop:0},d=ft(1);const u=ft(0),p=bt(o);if((p||!p&&!a)&&((ae(o)!=="body"||be(s))&&(c=Ne(o)),bt(o))){const m=jt(o);d=Gt(o),u.x=m.x+o.clientLeft,u.y=m.y+o.clientTop}const f=s&&!p&&!a?Ao(s,c):ft(0);return{width:n.width*d.x,height:n.height*d.y,x:n.x*d.x-c.scrollLeft*d.x+u.x+f.x,y:n.y*d.y-c.scrollTop*d.y+u.y+f.y}}function Oa(t){return Array.from(t.getClientRects())}function Da(t){const e=yt(t),n=Ne(t),o=t.ownerDocument.body,i=J(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),a=J(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+Ue(t);const h=-n.scrollTop;return ct(o).direction==="rtl"&&(s+=J(e.clientWidth,o.clientWidth)-i),{width:i,height:a,x:s,y:h}}const Gn=25;function za(t,e){const n=et(t),o=yt(t),i=n.visualViewport;let a=o.clientWidth,s=o.clientHeight,h=0,c=0;if(i){a=i.width,s=i.height;const u=An();(!u||u&&e==="fixed")&&(h=i.offsetLeft,c=i.offsetTop)}const d=Ue(o);if(d<=0){const u=o.ownerDocument,p=u.body,f=getComputedStyle(p),m=u.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(o.clientWidth-p.clientWidth-m);b<=Gn&&(a-=b)}else d<=Gn&&(a+=d);return{width:a,height:s,x:h,y:c}}const Ma=new Set(["absolute","fixed"]);function Ia(t,e){const n=jt(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,a=bt(t)?Gt(t):ft(1),s=t.clientWidth*a.x,h=t.clientHeight*a.y,c=i*a.x,d=o*a.y;return{width:s,height:h,x:c,y:d}}function Qn(t,e,n){let o;if(e==="viewport")o=za(t,n);else if(e==="document")o=Da(yt(t));else if(ht(e))o=Ia(e,n);else{const i=Co(t);o={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return Oe(o)}function To(t,e){const n=Mt(t);return n===e||!ht(n)||Jt(n)?!1:ct(n).position==="fixed"||To(n,e)}function Pa(t,e){const n=e.get(t);if(n)return n;let o=te(t,[],!1).filter(h=>ht(h)&&ae(h)!=="body"),i=null;const a=ct(t).position==="fixed";let s=a?Mt(t):t;for(;ht(s)&&!Jt(s);){const h=ct(s),c=qe(s);!c&&h.position==="fixed"&&(i=null),(a?!c&&!i:!c&&h.position==="static"&&!!i&&Ma.has(i.position)||be(s)&&!c&&To(t,s))?o=o.filter(u=>u!==s):i=h,s=Mt(s)}return e.set(t,o),o}function Ba(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const s=[...n==="clippingAncestors"?He(e)?[]:Pa(e,this._c):[].concat(n),o],h=s[0],c=s.reduce((d,u)=>{const p=Qn(e,u,i);return d.top=J(p.top,d.top),d.right=Dt(p.right,d.right),d.bottom=Dt(p.bottom,d.bottom),d.left=J(p.left,d.left),d},Qn(e,h,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Fa(t){const{width:e,height:n}=Eo(t);return{width:e,height:n}}function Ha(t,e,n){const o=bt(e),i=yt(e),a=n==="fixed",s=jt(t,!0,a,e);let h={scrollLeft:0,scrollTop:0};const c=ft(0);function d(){c.x=Ue(i)}if(o||!o&&!a)if((ae(e)!=="body"||be(i))&&(h=Ne(e)),o){const m=jt(e,!0,a,e);c.x=m.x+e.clientLeft,c.y=m.y+e.clientTop}else i&&d();a&&!o&&i&&d();const u=i&&!o&&!a?Ao(i,h):ft(0),p=s.left+h.scrollLeft-c.x-u.x,f=s.top+h.scrollTop-c.y-u.y;return{x:p,y:f,width:s.width,height:s.height}}function Qe(t){return ct(t).position==="static"}function Zn(t,e){if(!bt(t)||ct(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return yt(t)===n&&(n=n.ownerDocument.body),n}function _o(t,e){const n=et(t);if(He(t))return n;if(!bt(t)){let i=Mt(t);for(;i&&!Jt(i);){if(ht(i)&&!Qe(i))return i;i=Mt(i)}return n}let o=Zn(t,e);for(;o&&$a(o)&&Qe(o);)o=Zn(o,e);return o&&Jt(o)&&Qe(o)&&!qe(o)?n:o||Ta(t)||n}const qa=async function(t){const e=this.getOffsetParent||_o,n=this.getDimensions,o=await n(t.floating);return{reference:Ha(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Na(t){return ct(t).direction==="rtl"}const Ce={convertOffsetParentRelativeRectToViewportRelativeRect:Va,getDocumentElement:yt,getClippingRect:Ba,getOffsetParent:_o,getElementRects:qa,getClientRects:Oa,getDimensions:Fa,getScale:Gt,isElement:ht,isRTL:Na};function Lo(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Ua(t,e){let n=null,o;const i=yt(t);function a(){var h;clearTimeout(o),(h=n)==null||h.disconnect(),n=null}function s(h,c){h===void 0&&(h=!1),c===void 0&&(c=1),a();const d=t.getBoundingClientRect(),{left:u,top:p,width:f,height:m}=d;if(h||e(),!f||!m)return;const b=ve(p),v=ve(i.clientWidth-(u+f)),E=ve(i.clientHeight-(p+m)),k=ve(u),V={rootMargin:-b+"px "+-v+"px "+-E+"px "+-k+"px",threshold:J(0,Dt(1,c))||1};let q=!0;function z(rt){const W=rt[0].intersectionRatio;if(W!==c){if(!q)return s();W?s(!1,W):o=setTimeout(()=>{s(!1,1e-7)},1e3)}W===1&&!Lo(d,t.getBoundingClientRect())&&s(),q=!1}try{n=new IntersectionObserver(z,{...V,root:i.ownerDocument})}catch{n=new IntersectionObserver(z,V)}n.observe(t)}return s(!0),a}function Ro(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:h=typeof IntersectionObserver=="function",animationFrame:c=!1}=o,d=Tn(t),u=i||a?[...d?te(d):[],...te(e)]:[];u.forEach(k=>{i&&k.addEventListener("scroll",n,{passive:!0}),a&&k.addEventListener("resize",n)});const p=d&&h?Ua(d,n):null;let f=-1,m=null;s&&(m=new ResizeObserver(k=>{let[C]=k;C&&C.target===d&&m&&(m.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var V;(V=m)==null||V.observe(e)})),n()}),d&&!c&&m.observe(d),m.observe(e));let b,v=c?jt(t):null;c&&E();function E(){const k=jt(t);v&&!Lo(v,k)&&n(),v=k,b=requestAnimationFrame(E)}return n(),()=>{var k;u.forEach(C=>{i&&C.removeEventListener("scroll",n),a&&C.removeEventListener("resize",n)}),p?.(),(k=m)==null||k.disconnect(),m=null,c&&cancelAnimationFrame(b)}}const Vo=va,Oo=wa,Do=ma,Jn=ya,Wa=fa,zo=(t,e,n)=>{const o=new Map,i={platform:Ce,...n},a={...i.platform,_c:o};return pa(t,e,{...i,platform:a})};function ja(t){return Ka(t)}function Ze(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Ka(t){for(let e=t;e;e=Ze(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Ze(t);e;e=Ze(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||qe(n)||e.tagName==="BODY"))return e}return null}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ya=`:host {
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
`;function to(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var we=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),L=class extends N{constructor(){super(...arguments),this.localize=new at(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),n=this.placement.includes("top")||this.placement.includes("bottom");let o=0,i=0,a=0,s=0,h=0,c=0,d=0,u=0;n?t.top<e.top?(o=t.left,i=t.bottom,a=t.right,s=t.bottom,h=e.left,c=e.top,d=e.right,u=e.top):(o=e.left,i=e.bottom,a=e.right,s=e.bottom,h=t.left,c=t.top,d=t.right,u=t.top):t.left<e.left?(o=t.right,i=t.top,a=e.left,s=e.top,h=t.right,c=t.bottom,d=e.left,u=e.bottom):(o=e.right,i=e.top,a=t.left,s=t.top,h=e.right,c=e.bottom,d=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||to(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=Ro(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Vo({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Jn({apply:({rects:o})=>{const i=this.sync==="width"||this.sync==="both",a=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${o.reference.width}px`:"",this.popup.style.height=a?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;we&&!to(this.anchor)&&this.boundary==="scroll"&&(e=te(this.anchorEl).filter(o=>o instanceof Element)),this.flip&&t.push(Do({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Oo({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(Jn({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Wa({element:this.arrowEl,padding:this.arrowPadding}));const n=we?o=>Ce.getOffsetParent(o,ja):Ce.getOffsetParent;zo(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:we?"absolute":"fixed",platform:{...Ce,getOffsetParent:n}}).then(({x:o,y:i,middlewareData:a,placement:s})=>{const h=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${o}px`,top:`${i}px`}),this.arrow){const d=a.arrow.x,u=a.arrow.y;let p="",f="",m="",b="";if(this.arrowPlacement==="start"){const v=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",f=h?v:"",b=h?"":v}else if(this.arrowPlacement==="end"){const v=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=h?"":v,b=h?v:"",m=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(b=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(b=typeof d=="number"?`${d}px`:"",p=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:p,right:f,bottom:m,left:b,[c]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new na)}render(){return g`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${O({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${O({popup:!0,"popup-active":this.active,"popup-fixed":!we,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?g`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};L.css=Ya;r([x(".popup")],L.prototype,"popup",2);r([x(".arrow")],L.prototype,"arrowEl",2);r([l()],L.prototype,"anchor",2);r([l({type:Boolean,reflect:!0})],L.prototype,"active",2);r([l({reflect:!0})],L.prototype,"placement",2);r([l()],L.prototype,"boundary",2);r([l({type:Number})],L.prototype,"distance",2);r([l({type:Number})],L.prototype,"skidding",2);r([l({type:Boolean})],L.prototype,"arrow",2);r([l({attribute:"arrow-placement"})],L.prototype,"arrowPlacement",2);r([l({attribute:"arrow-padding",type:Number})],L.prototype,"arrowPadding",2);r([l({type:Boolean})],L.prototype,"flip",2);r([l({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],L.prototype,"flipFallbackPlacements",2);r([l({attribute:"flip-fallback-strategy"})],L.prototype,"flipFallbackStrategy",2);r([l({type:Object})],L.prototype,"flipBoundary",2);r([l({attribute:"flip-padding",type:Number})],L.prototype,"flipPadding",2);r([l({type:Boolean})],L.prototype,"shift",2);r([l({type:Object})],L.prototype,"shiftBoundary",2);r([l({attribute:"shift-padding",type:Number})],L.prototype,"shiftPadding",2);r([l({attribute:"auto-size"})],L.prototype,"autoSize",2);r([l()],L.prototype,"sync",2);r([l({type:Object})],L.prototype,"autoSizeBoundary",2);r([l({attribute:"auto-size-padding",type:Number})],L.prototype,"autoSizePadding",2);r([l({attribute:"hover-bridge",type:Boolean})],L.prototype,"hoverBridge",2);L=r([B("wa-popup")],L);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var _n=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},Ln=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},Rn=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},Vn=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function ee(t,e){return new Promise(n=>{function o(i){i.target===t&&(t.removeEventListener(e,o),n())}t.addEventListener(e,o)})}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function gt(t,e){return new Promise(n=>{const o=new AbortController,{signal:i}=o;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let a=()=>{t.classList.remove(e),n(),o.abort()};t.addEventListener("animationend",a,{once:!0,signal:i}),t.addEventListener("animationcancel",a,{once:!0,signal:i})})}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Xa=`:host {
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
`,P=class extends N{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),this.hideDelay))}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=xn("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){const o=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);o.includes(e)||(o.push(e),t.setAttribute("aria-labelledby",o.join(" ")))}removeFromAriaLabelledBy(t,e){const i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(a=>a!==e);i.length>0?t.setAttribute("aria-labelledby",i.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;const t=new Vn;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await gt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Ln)}else{const t=new Rn;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await gt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new _n)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.getElementById(this.for):null,n=this.anchor;if(e===n)return;const{signal:o}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:o}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:o}),e.addEventListener("click",this.handleClick,{signal:o}),e.addEventListener("mouseover",this.handleMouseOver,{signal:o}),e.addEventListener("mouseout",this.handleMouseOut,{signal:o})),n&&(this.removeFromAriaLabelledBy(n,this.id),n.removeEventListener("blur",this.handleBlur,{capture:!0}),n.removeEventListener("focus",this.handleFocus,{capture:!0}),n.removeEventListener("click",this.handleClick),n.removeEventListener("mouseover",this.handleMouseOver),n.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,ee(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,ee(this,"wa-after-hide")}render(){return g`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${O({tooltip:!0,"tooltip-open":this.open})}
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
    `}};P.css=Xa;P.dependencies={"wa-popup":L};r([x("slot:not([name])")],P.prototype,"defaultSlot",2);r([x(".body")],P.prototype,"body",2);r([x("wa-popup")],P.prototype,"popup",2);r([l()],P.prototype,"placement",2);r([l({type:Boolean,reflect:!0})],P.prototype,"disabled",2);r([l({type:Number})],P.prototype,"distance",2);r([l({type:Boolean,reflect:!0})],P.prototype,"open",2);r([l({type:Number})],P.prototype,"skidding",2);r([l({attribute:"show-delay",type:Number})],P.prototype,"showDelay",2);r([l({attribute:"hide-delay",type:Number})],P.prototype,"hideDelay",2);r([l()],P.prototype,"trigger",2);r([l({attribute:"without-arrow",type:Boolean,reflect:!0})],P.prototype,"withoutArrow",2);r([l()],P.prototype,"for",2);r([T()],P.prototype,"anchor",2);r([D("open",{waitUntilFirstUpdate:!0})],P.prototype,"handleOpenChange",1);r([D("for")],P.prototype,"handleForChange",1);r([D(["distance","placement","skidding"])],P.prototype,"handleOptionsChange",1);r([D("disabled")],P.prototype,"handleDisabledChange",1);P=r([B("wa-tooltip")],P);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Mo=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Io(t,e){const n=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!n&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&Ga(e)})}function Ga(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const n=[...e.elements];if(n.length===1){e.requestSubmit(null);return}const o=n.find(i=>i.type==="submit"&&!i.matches(":disabled"));o&&(["input","button"].includes(o.localName)?e.requestSubmit(o):o.click())}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Qa=`:host {
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
:host([appearance='outlined']) .text-field {
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
}

:host([appearance='filled']) .text-field {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-color-neutral-fill-quiet);
}

:host([appearance='filled-outlined']) .text-field {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-form-control-border-color);
}

:host([pill]) .text-field {
  border-radius: var(--wa-border-radius-pill) !important;
}

.text-field {
  /* Show autofill styles over the entire text field, not just the native <input> */
  &:has(:autofill),
  &:has(:-webkit-autofill) {
    background-color: var(--wa-color-brand-fill-quiet) !important;
  }

  input,
  textarea {
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

    /* Turn off Safari's autofill styles */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-background-clip: text;
      background-color: transparent;
      -webkit-text-fill-color: inherit;
    }
  }
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
`,y=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Pt(this,"hint","label"),this.localize=new at(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.form=null,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,mo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Mo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){Io(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,n="none"){this.input.setSelectionRange(t,e,n)}setRangeText(t,e,n,o="preserve"){const i=e??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(t,i,a,o),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,i=this.withClear&&!this.disabled&&!this.readonly,a=this.hasUpdated&&i&&(typeof this.value=="number"||this.value&&this.value.length>0);return g`
      <label part="form-control-label label" class="label" for="input" aria-hidden=${n?"false":"true"}>
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
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
          .value=${ln(this.value??"")}
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
        class=${O({"has-slotted":o})}
        aria-hidden=${o?"false":"true"}
        >${this.hint}</slot
      >
    `}};y.css=[wt,Kt,Qa];y.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};r([x("input")],y.prototype,"input",2);r([l()],y.prototype,"title",2);r([l({reflect:!0})],y.prototype,"type",2);r([T()],y.prototype,"value",1);r([l({attribute:"value",reflect:!0})],y.prototype,"defaultValue",2);r([l({reflect:!0})],y.prototype,"size",2);r([l({reflect:!0})],y.prototype,"appearance",2);r([l({type:Boolean,reflect:!0})],y.prototype,"pill",2);r([l()],y.prototype,"label",2);r([l({attribute:"hint"})],y.prototype,"hint",2);r([l({attribute:"with-clear",type:Boolean})],y.prototype,"withClear",2);r([l()],y.prototype,"placeholder",2);r([l({type:Boolean,reflect:!0})],y.prototype,"readonly",2);r([l({attribute:"password-toggle",type:Boolean})],y.prototype,"passwordToggle",2);r([l({attribute:"password-visible",type:Boolean})],y.prototype,"passwordVisible",2);r([l({attribute:"without-spin-buttons",type:Boolean})],y.prototype,"withoutSpinButtons",2);r([l({reflect:!0})],y.prototype,"form",2);r([l({type:Boolean,reflect:!0})],y.prototype,"required",2);r([l()],y.prototype,"pattern",2);r([l({type:Number})],y.prototype,"minlength",2);r([l({type:Number})],y.prototype,"maxlength",2);r([l()],y.prototype,"min",2);r([l()],y.prototype,"max",2);r([l()],y.prototype,"step",2);r([l()],y.prototype,"autocapitalize",2);r([l()],y.prototype,"autocorrect",2);r([l()],y.prototype,"autocomplete",2);r([l({type:Boolean})],y.prototype,"autofocus",2);r([l()],y.prototype,"enterkeyhint",2);r([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],y.prototype,"spellcheck",2);r([l()],y.prototype,"inputmode",2);r([l({attribute:"with-label",type:Boolean})],y.prototype,"withLabel",2);r([l({attribute:"with-hint",type:Boolean})],y.prototype,"withHint",2);r([D("step",{waitUntilFirstUpdate:!0})],y.prototype,"handleStepChange",1);y=r([B("wa-input")],y);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Je(t,e){function n(i){const a=t.getBoundingClientRect(),s=t.ownerDocument.defaultView,h=a.left+s.pageXOffset,c=a.top+s.pageYOffset,d=i.pageX-h,u=i.pageY-c;e?.onMove&&e.onMove(d,u)}function o(){document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",o),e?.onStop&&e.onStop()}document.addEventListener("pointermove",n,{passive:!0}),document.addEventListener("pointerup",o),e?.initialEvent instanceof PointerEvent&&n(e.initialEvent)}var St=typeof window<"u"&&"ontouchstart"in window,ye=class{constructor(t,e){this.isActive=!1,this.isDragging=!1,this.handleDragStart=n=>{const o=St&&"touches"in n?n.touches[0].clientX:n.clientX,i=St&&"touches"in n?n.touches[0].clientY:n.clientY;this.isDragging||!St&&n.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),this.options.start(o,i))},this.handleDragStop=n=>{const o=St&&"touches"in n?n.touches[0].clientX:n.clientX,i=St&&"touches"in n?n.touches[0].clientY:n.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.options.stop(o,i)},this.handleDragMove=n=>{const o=St&&"touches"in n?n.touches[0].clientX:n.clientX,i=St&&"touches"in n?n.touches[0].clientY:n.clientY;window.getSelection()?.removeAllRanges(),this.options.move(o,i)},this.element=t,this.options={start:()=>{},stop:()=>{},move:()=>{},...e},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),St&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.element.removeEventListener("pointerdown",this.handleDragStart),St&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(t!==void 0?t:!this.isActive)?this.start():this.stop()}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Za=()=>{const t=Object.assign(document.createElement("input"),{type:"range",required:!0});return{observedAttributes:["required","min","max","step"],checkValidity(e){const n={message:"",isValid:!0,invalidKeys:[]},o=(i,a,s,h)=>{const c=document.createElement("input");return c.type="range",c.min=String(a),c.max=String(s),c.step=String(h),c.value=String(i),c.checkValidity(),c.validationMessage};if(e.required&&!e.hasInteracted)return n.isValid=!1,n.invalidKeys.push("valueMissing"),n.message=t.validationMessage||"Please fill out this field.",n;if(e.isRange){const i=e.minValue,a=e.maxValue;if(i<e.min)return n.isValid=!1,n.invalidKeys.push("rangeUnderflow"),n.message=o(i,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,n;if(a>e.max)return n.isValid=!1,n.invalidKeys.push("rangeOverflow"),n.message=o(a,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,n;if(e.step&&e.step!==1){const s=(i-e.min)%e.step!==0,h=(a-e.min)%e.step!==0;if(s||h){n.isValid=!1,n.invalidKeys.push("stepMismatch");const c=s?i:a;return n.message=o(c,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,n}}}else{const i=e.value;if(i<e.min)return n.isValid=!1,n.invalidKeys.push("rangeUnderflow"),n.message=o(i,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,n;if(i>e.max)return n.isValid=!1,n.invalidKeys.push("rangeOverflow"),n.message=o(i,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,n;if(e.step&&e.step!==1&&(i-e.min)%e.step!==0)return n.isValid=!1,n.invalidKeys.push("stepMismatch"),n.message=o(i,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,n}return n}}},Ja=`:host {
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
`,$=class extends F{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new Pt(this,"hint","label"),this.localize=new at(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=this.defaultValue,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.form=null,this.min=0,this.max=100,this.step=1,this.required=!1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1}static get validators(){return[...super.validators,Za()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new ye(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new ye(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new ye(this.track,{start:(t,e)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{const n=this.getValueFromCoordinates(t,e),o=Math.abs(n-this.minValue),i=Math.abs(n-this.maxValue);if(o===i)if(n>this.maxValue)this.activeThumb="max";else if(n<this.minValue)this.activeThumb="min";else{const a=this.localize.dir()==="rtl",s=this.orientation==="vertical",h=s?e:t,c=this.lastTrackPosition||h;this.lastTrackPosition=h;const d=h>c!==a&&!s||h<c&&s;this.activeThumb=d?"max":"min"}else this.activeThumb=o<=i?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,e,this.activeThumb),this.showRangeTooltips()},move:(t,e)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,e,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb==="min"?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new ye(this.slider,{start:(t,e)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,e),this.showTooltip()},move:(t,e)=>{this.setValueFromCoordinates(t,e)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}updated(t){if(t.has("range")&&this.requestUpdate(),this.isRange?(t.has("minValue")||t.has("maxValue"))&&(this.minValue=R(this.minValue,this.min,this.maxValue),this.maxValue=R(this.maxValue,this.minValue,this.max),this.updateFormValue()):t.has("value")&&(this.value=R(this.value,this.min,this.max),this.setValue(String(this.value))),(t.has("min")||t.has("max"))&&(this.isRange?(this.minValue=R(this.minValue,this.min,this.max),this.maxValue=R(this.maxValue,this.min,this.max)):this.value=R(this.value,this.min,this.max)),t.has("disabled")&&this.customStates.set("disabled",this.disabled),t.has("disabled")||t.has("readonly")){const e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):this.value=parseFloat(this.getAttribute("value")??String(this.min)),this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){const e=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length;return t=Math.round(t/this.step)*this.step,t=R(t,this.min,this.max),parseFloat(t.toFixed(e))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,e){const n=this.localize.dir()==="rtl",o=this.orientation==="vertical",{top:i,right:a,bottom:s,left:h,height:c,width:d}=this.trackBoundingClientRect,u=o?e:t,p=o?{start:i,end:s,size:c}:{start:h,end:a,size:d},m=(o||n?p.end-u:u-p.start)/p.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*m)}handleBlur(){this.isRange?requestAnimationFrame(()=>{const t=this.shadowRoot?.activeElement;t===this.thumbMin||t===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){const e=t.target;this.isRange?(e===this.thumbMin?this.activeThumb="min":e===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){const e=this.localize.dir()==="rtl",n=t.target;if(this.disabled||this.readonly||this.isRange&&(n===this.thumbMin?this.activeThumb="min":n===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;const o=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value;let i=o;switch(t.key){case"ArrowUp":case(e?"ArrowLeft":"ArrowRight"):t.preventDefault(),i=this.clampAndRoundToStep(o+this.step);break;case"ArrowDown":case(e?"ArrowRight":"ArrowLeft"):t.preventDefault(),i=this.clampAndRoundToStep(o-this.step);break;case"Home":t.preventDefault(),i=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),i=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();const a=Math.max(o+(this.max-this.min)/10,o+this.step);i=this.clampAndRoundToStep(a);break;case"PageDown":t.preventDefault();const s=Math.min(o-(this.max-this.min)/10,o-this.step);i=this.clampAndRoundToStep(s);break;case"Enter":Io(t,this);return}i!==o&&(this.isRange?(this.activeThumb==="min"?i>this.maxValue?(this.maxValue=i,this.minValue=i):this.minValue=Math.max(this.min,i):i<this.minValue?(this.minValue=i,this.maxValue=i):this.maxValue=Math.min(this.max,i),this.updateFormValue()):this.value=R(i,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,e){const n=this.value;this.value=this.getValueFromCoordinates(t,e),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,e,n){const o=this.getValueFromCoordinates(t,e),i=n==="min"?this.minValue:this.maxValue;n==="min"?o>this.maxValue?(this.maxValue=o,this.minValue=o):this.minValue=Math.max(this.min,o):o<this.minValue?(this.minValue=o,this.maxValue=o):this.maxValue=Math.min(this.max,o),i!==(n==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");this.activeThumb==="min"?(t&&(t.open=!0),e&&(e.open=!1)):this.activeThumb==="max"&&(e&&(e.open=!0),t&&(t.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");t&&(t.open=!1),e&&(e.open=!1)}updateFormValue(){if(this.isRange){const t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){const t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=R(t,this.min,this.maxValue),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){const t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=R(t,this.minValue,this.max),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("hint"),n=this.label?!0:!!t,o=this.hint?!0:!!e,i=this.hasSlotController.test("reference"),a=O({small:this.size==="small",medium:this.size==="medium",large:this.size==="large",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),s=[];if(this.withMarkers)for(let f=this.min;f<=this.max;f+=this.step)s.push(this.getPercentageFromValue(f));const h=g`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${O({vh:!n})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,c=g`
      <div
        id="hint"
        part="hint"
        class=${O({"has-slotted":o})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,d=this.withMarkers?g`
          <div id="markers" part="markers">
            ${s.map(f=>g`<span part="marker" class="marker" style="--position: ${f}%"></span>`)}
          </div>
        `:"",u=i?g`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",p=(f,m)=>this.withTooltip?g`
            <wa-tooltip
              id=${`tooltip${f!=="thumb"?"-"+f:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${f}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(m):this.localize.number(m)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){const f=R(this.getPercentageFromValue(this.minValue),0,100),m=R(this.getPercentageFromValue(this.maxValue),0,100);return g`
        ${h}

        <div id="slider" part="slider" class=${a}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style="--start: ${Math.min(f,m)}%; --end: ${Math.max(f,m)}%"
            ></div>

            ${d}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style="--position: ${f}%"
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
              style="--position: ${m}%"
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

          ${u} ${c}
        </div>

        ${p("thumb-min",this.minValue)} ${p("thumb-max",this.maxValue)}
      `}else{const f=R(this.getPercentageFromValue(this.value),0,100),m=R(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return g`
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
              style="--start: ${m}%; --end: ${f}%"
            ></div>

            ${d}
            <span id="thumb" part="thumb" style="--position: ${f}%"></span>
          </div>

          ${u} ${c}
        </div>

        ${p("thumb",this.value)}
      `}}};$.formAssociated=!0;$.observeSlots=!0;$.css=[wt,Kt,Ja];r([x("#slider")],$.prototype,"slider",2);r([x("#thumb")],$.prototype,"thumb",2);r([x("#thumb-min")],$.prototype,"thumbMin",2);r([x("#thumb-max")],$.prototype,"thumbMax",2);r([x("#track")],$.prototype,"track",2);r([x("#tooltip")],$.prototype,"tooltip",2);r([l()],$.prototype,"label",2);r([l({attribute:"hint"})],$.prototype,"hint",2);r([l({reflect:!0})],$.prototype,"name",2);r([l({type:Number,attribute:"min-value"})],$.prototype,"minValue",2);r([l({type:Number,attribute:"max-value"})],$.prototype,"maxValue",2);r([l({attribute:"value",reflect:!0,type:Number})],$.prototype,"defaultValue",2);r([T()],$.prototype,"value",1);r([l({type:Boolean,reflect:!0})],$.prototype,"range",2);r([l({type:Boolean})],$.prototype,"disabled",2);r([l({type:Boolean,reflect:!0})],$.prototype,"readonly",2);r([l({reflect:!0})],$.prototype,"orientation",2);r([l({reflect:!0})],$.prototype,"size",2);r([l({attribute:"indicator-offset",type:Number})],$.prototype,"indicatorOffset",2);r([l({reflect:!0})],$.prototype,"form",2);r([l({type:Number})],$.prototype,"min",2);r([l({type:Number})],$.prototype,"max",2);r([l({type:Number})],$.prototype,"step",2);r([l({type:Boolean,reflect:!0})],$.prototype,"required",2);r([l({type:Boolean})],$.prototype,"autofocus",2);r([l({attribute:"tooltip-distance",type:Number})],$.prototype,"tooltipDistance",2);r([l({attribute:"tooltip-placement",reflect:!0})],$.prototype,"tooltipPlacement",2);r([l({attribute:"with-markers",type:Boolean})],$.prototype,"withMarkers",2);r([l({attribute:"with-tooltip",type:Boolean})],$.prototype,"withTooltip",2);r([l({attribute:!1})],$.prototype,"valueFormatter",2);$=r([B("wa-slider")],$);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var tr=`:host {
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
`,er=0,vt=class extends N{constructor(){super(...arguments),this.attrId=++er,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||(this.slot="nav"),super.connectedCallback(),this.setAttribute("role","tab")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,g`
      <div
        part="base"
        class=${O({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};vt.css=tr;r([x(".tab")],vt.prototype,"tab",2);r([l({reflect:!0})],vt.prototype,"panel",2);r([l({type:Boolean,reflect:!0})],vt.prototype,"active",2);r([l({type:Boolean,reflect:!0})],vt.prototype,"disabled",2);r([l({type:Number,reflect:!0})],vt.prototype,"tabIndex",2);r([D("active")],vt.prototype,"handleActiveChange",1);r([D("disabled")],vt.prototype,"handleDisabledChange",1);vt=r([B("wa-tab")],vt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function nr(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function dn(t,e,n="vertical",o="smooth"){const i=nr(t,e),a=i.top+e.scrollTop,s=i.left+e.scrollLeft,h=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,d=e.scrollTop,u=e.scrollTop+e.offsetHeight;(n==="horizontal"||n==="both")&&(s<h?e.scrollTo({left:s,behavior:o}):s+t.clientWidth>c&&e.scrollTo({left:s-e.offsetWidth+t.clientWidth,behavior:o})),(n==="vertical"||n==="both")&&(a<d?e.scrollTo({top:a,behavior:o}):a+t.clientHeight>u&&e.scrollTo({top:a-e.offsetHeight+t.clientHeight,behavior:o}))}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var or=class extends Event{constructor(t){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},ir=class extends Event{constructor(t){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},ar=`:host {
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
`,nt=class extends N{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new at(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(n=>!["aria-labelledby","aria-controls"].includes(n.attributeName))&&setTimeout(()=>this.setAriaLabels());const e=t.filter(n=>n.target.closest("wa-tab-group")===this);if(e.some(n=>n.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(n=>n.attributeName==="active")){const o=e.filter(i=>i.attributeName==="active"&&i.target.tagName.toLowerCase()==="wa-tab").map(i=>i.target).find(i=>i.active);o&&o.closest("wa-tab-group")===this&&this.setActiveTab(o)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,n)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){const o=this.tabs.find(i=>i.panel===this.active);o&&this.setActiveTab(o)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});n.unobserve(e[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const n=t.target.closest("wa-tab");n?.closest("wa-tab-group")===this&&n!==null&&this.setActiveTab(n,{scrollBehavior:"smooth"})}handleKeyDown(t){const n=t.target.closest("wa-tab");if(n?.closest("wa-tab-group")===this){if(["Enter"," "].includes(t.key)){n!==null&&(this.setActiveTab(n,{scrollBehavior:"smooth"}),t.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const i=this.tabs.find(h=>h.matches(":focus")),a=this.localize.dir()==="rtl";let s=null;if(i?.tagName.toLowerCase()==="wa-tab"){if(t.key==="Home")s=this.focusableTabs[0];else if(t.key==="End")s=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const h=this.tabs.findIndex(c=>c===i);s=this.findNextFocusableTab(h,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const h=this.tabs.findIndex(c=>c===i);s=this.findNextFocusableTab(h,"forward")}if(!s)return;s.tabIndex=0,s.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(s,{scrollBehavior:"smooth"}):this.tabs.forEach(h=>{h.tabIndex=h===s?0:-1}),["top","bottom"].includes(this.placement)&&dn(s,this.nav,"horizontal"),t.preventDefault()}}}}findNextFocusableTab(t,e){let n=null;const o=e==="forward"?1:-1;let i=t+o;for(;t<this.tabs.length;){if(n=this.tabs[i]||null,n===null){e==="forward"?n=this.focusableTabs[0]:n=this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;i+=o}return n}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e={emitEvents:!0,scrollBehavior:"auto",...e},t.closest("wa-tab-group")===this&&t!==this.activeTab&&!t.disabled){const n=this.activeTab;this.active=t.panel,this.activeTab=t,this.tabs.forEach(o=>{o.active=o===this.activeTab,o.tabIndex=o===this.activeTab?0:-1}),this.panels.forEach(o=>o.active=o.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&dn(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(n&&this.dispatchEvent(new or({name:n.panel})),this.dispatchEvent(new ir({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(n=>n.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){const t=this.tabs.find(e=>e.panel===this.active);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return g`
      <div
        part="base"
        class=${O({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
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
    `}};nt.css=ar;r([x(".tab-group")],nt.prototype,"tabGroup",2);r([x(".body")],nt.prototype,"body",2);r([x(".nav")],nt.prototype,"nav",2);r([T()],nt.prototype,"hasScrollControls",2);r([l({reflect:!0})],nt.prototype,"active",2);r([l()],nt.prototype,"placement",2);r([l()],nt.prototype,"activation",2);r([l({attribute:"without-scroll-controls",type:Boolean})],nt.prototype,"withoutScrollControls",2);r([D("active")],nt.prototype,"updateActiveTab",1);r([D("withoutScrollControls",{waitUntilFirstUpdate:!0})],nt.prototype,"updateScrollControls",1);nt=r([B("wa-tab-group")],nt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var rr=`:host {
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
`,sr=0,ne=class extends N{constructor(){super(...arguments),this.attrId=++sr,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return g`
      <slot
        part="base"
        class=${O({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};ne.css=rr;r([l({reflect:!0})],ne.prototype,"name",2);r([l({type:Boolean,reflect:!0})],ne.prototype,"active",2);r([D("active")],ne.prototype,"handleActiveChange",1);ne=r([B("wa-tab-panel")],ne);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function he(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(i=>he(i,--e)).join("");let n=t;if(n.nodeType===Node.TEXT_NODE)return n.textContent??"";if(n.nodeType===Node.ELEMENT_NODE){let o=n;if(o.hasAttribute("slot")||o.matches("style, script"))return"";if(o instanceof HTMLSlotElement){let i=o.assignedNodes({flatten:!0});if(i.length>0)return he(i,--e)}return e>-1?he(o,--e):o.textContent??""}return n.hasChildNodes()?he(n.childNodes,--e):""}var lr=`:host {
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
`,ut=class extends N{constructor(){super(...arguments),this.localize=new at(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-select")?.hasInteracted){const e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=he(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return g`
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
    `}};ut.css=lr;r([x(".label")],ut.prototype,"defaultSlot",2);r([T()],ut.prototype,"current",2);r([l({reflect:!0})],ut.prototype,"value",2);r([l({type:Boolean})],ut.prototype,"disabled",2);r([l({type:Boolean,attribute:!1})],ut.prototype,"selected",2);r([l({type:Boolean,attribute:"selected"})],ut.prototype,"defaultSelected",2);r([l()],ut.prototype,"label",1);r([T()],ut.prototype,"defaultLabel",2);ut=r([B("wa-option")],ut);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class pn extends Pe{constructor(e){if(super(e),this.it=I,e.type!==Et.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===I||e==null)return this._t=void 0,this.it=e;if(e===tt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}pn.directiveName="unsafeHTML",pn.resultType=1;const hr=Ie(pn);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var cr=`:host {
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
:host([appearance='outlined']) .combobox {
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
}

:host([appearance='filled']) .combobox {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-color-neutral-fill-quiet);
}

:host([appearance='filled-outlined']) .combobox {
  background-color: var(--wa-color-neutral-fill-quiet);
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
`,S=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Pt(this,"hint","label"),this.localize=new at(this),this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.form=null,this.required=!1,this.getTag=t=>g`
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
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,n=e.closest('[part~="clear-button"]')!==null,o=e.closest("wa-button")!==null;if(!(n||o)){if(t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const i=this.getAllOptions(),a=i.indexOf(this.currentOption);let s=Math.max(0,a);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(s=a+1,s>i.length-1&&(s=0)):t.key==="ArrowUp"?(s=a-1,s<0&&(s=i.length-1)):t.key==="Home"?s=0:t.key==="End"&&(s=i.length-1),this.setCurrentOption(i[s])}if(t.key?.length===1||t.key==="Backspace"){const i=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const a of i)if(a.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=[Me({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),t==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(n=>!n.disabled).map(n=>n.value));let e=t;return t!=null&&(e=t.filter(n=>this.optionValues.has(n)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const e=this.getAllOptions().filter(n=>n.hasAttribute("selected")||n.defaultSelected);if(e.length>0){const n=e.map(o=>o.value);this._defaultValue=this.multiple?n:n[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const n=t.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="wa-button");this.disabled||n||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.value!==null&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Mo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const n=t.target.closest("wa-option");n&&!n.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(n):this.setSelectedOptions(n),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const n=t.filter(o=>e.includes(o.value));this.setSelectedOptions(n)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;let n=e;if(!n){const o=t.target.closest("wa-tag[part~=tag]");if(o){const i=this.shadowRoot?.querySelector('[part="tags"]');if(i){const s=Array.from(i.children).indexOf(o);s>=0&&s<this.selectedOptions.length&&(n=this.selectedOptions[s])}}}n&&(this.toggleOptionSelection(n,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(n=>{n.current=!1,n.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),n=Array.isArray(t)?t:[t];e.forEach(o=>{n.includes(o)||(o.selected=!1)}),n.length&&n.forEach(o=>o.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){const t=this.getAllOptions();this.selectedOptions=t.filter(n=>{if(!this.hasInteracted&&!this.valueHasChanged){const o=this.defaultValue,i=Array.isArray(o)?o:[o];return n.hasAttribute("selected")||n.defaultSelected||n.selected||i?.includes(n.value)}return n.selected});let e=new Set(this.selectedOptions.map(n=>n.value));if(e.size>0||this._value){const n=this._value;if(this._value==null){let o=this.defaultValue??[];this._value=Array.isArray(o)?o:[o]}this._value=this._value?.filter(o=>!this.optionValues?.has(o))??null,this._value?.unshift(...e),this.requestUpdate("value",n)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const n=this.selectedOptions[0];this.displayLabel=n?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const n=this.getTag(t,e);return n?typeof n=="string"?hr(n):n:null}else if(e===this.maxOptionsVisible)return g`
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
        `;return null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],n=t.filter(o=>e.includes(o.value));this.setSelectedOptions(n),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new Vn;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await gt(this.popup.popup,"show"),this.currentOption&&dn(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Ln)}else{const t=new Rn;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await gt(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new _n)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,ee(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,ee(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,i=(this.hasUpdated||mi)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,a=!!(this.placeholder&&(!this.value||this.value.length===0));return g`
      <div
        part="form-control"
        class=${O({"form-control":!0,"form-control-has-label":n})}
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
            class=${O({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":a})}
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

              ${i?g`
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
          class=${O({"has-slotted":o})}
          aria-hidden=${o?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};S.css=[cr,Kt,wt];r([x(".select")],S.prototype,"popup",2);r([x(".combobox")],S.prototype,"combobox",2);r([x(".display-input")],S.prototype,"displayInput",2);r([x(".value-input")],S.prototype,"valueInput",2);r([x(".listbox")],S.prototype,"listbox",2);r([T()],S.prototype,"displayLabel",2);r([T()],S.prototype,"currentOption",2);r([T()],S.prototype,"selectedOptions",2);r([T()],S.prototype,"optionValues",2);r([l()],S.prototype,"name",2);r([l({attribute:!1})],S.prototype,"defaultValue",1);r([l({attribute:"value",reflect:!1})],S.prototype,"value",1);r([l({reflect:!0})],S.prototype,"size",2);r([l()],S.prototype,"placeholder",2);r([l({type:Boolean,reflect:!0})],S.prototype,"multiple",2);r([l({attribute:"max-options-visible",type:Number})],S.prototype,"maxOptionsVisible",2);r([l({type:Boolean})],S.prototype,"disabled",2);r([l({attribute:"with-clear",type:Boolean})],S.prototype,"withClear",2);r([l({type:Boolean,reflect:!0})],S.prototype,"open",2);r([l({reflect:!0})],S.prototype,"appearance",2);r([l({type:Boolean,reflect:!0})],S.prototype,"pill",2);r([l()],S.prototype,"label",2);r([l({reflect:!0})],S.prototype,"placement",2);r([l({attribute:"hint"})],S.prototype,"hint",2);r([l({attribute:"with-label",type:Boolean})],S.prototype,"withLabel",2);r([l({attribute:"with-hint",type:Boolean})],S.prototype,"withHint",2);r([l({reflect:!0})],S.prototype,"form",2);r([l({type:Boolean,reflect:!0})],S.prototype,"required",2);r([l({attribute:!1})],S.prototype,"getTag",2);r([D("disabled",{waitUntilFirstUpdate:!0})],S.prototype,"handleDisabledChange",1);r([D("value",{waitUntilFirstUpdate:!0})],S.prototype,"handleValueChange",1);r([D("open",{waitUntilFirstUpdate:!0})],S.prototype,"handleOpenChange",1);S=r([B("wa-select")],S);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var ur=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}},dr=`@layer wa-component {
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
  :host([appearance='outlined']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
  }

  :host([appearance='filled']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
  }

  :host([appearance='accent']) {
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
`,It=class extends N{constructor(){super(...arguments),this.localize=new at(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new ur)}render(){return g`
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
    `}};It.css=[dr,Be,wt];r([l({reflect:!0})],It.prototype,"variant",2);r([l({reflect:!0})],It.prototype,"appearance",2);r([l({reflect:!0})],It.prototype,"size",2);r([l({type:Boolean,reflect:!0})],It.prototype,"pill",2);r([l({attribute:"with-remove",type:Boolean})],It.prototype,"withRemove",2);It=r([B("wa-tag")],It);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var pr=`@layer wa-utilities {
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label) {
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
`;function U(t,e){fr(t)&&(t="100%");const n=mr(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),n&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function xe(t){return Math.min(1,Math.max(0,t))}function fr(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function mr(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Po(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function ke(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Nt(t){return t.length===1?"0"+t:String(t)}function br(t,e,n){return{r:U(t,255)*255,g:U(e,255)*255,b:U(n,255)*255}}function eo(t,e,n){t=U(t,255),e=U(e,255),n=U(n,255);const o=Math.max(t,e,n),i=Math.min(t,e,n);let a=0,s=0;const h=(o+i)/2;if(o===i)s=0,a=0;else{const c=o-i;switch(s=h>.5?c/(2-o-i):c/(o+i),o){case t:a=(e-n)/c+(e<n?6:0);break;case e:a=(n-t)/c+2;break;case n:a=(t-e)/c+4;break}a/=6}return{h:a,s,l:h}}function tn(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*(6*n):n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function gr(t,e,n){let o,i,a;if(t=U(t,360),e=U(e,100),n=U(n,100),e===0)i=n,a=n,o=n;else{const s=n<.5?n*(1+e):n+e-n*e,h=2*n-s;o=tn(h,s,t+1/3),i=tn(h,s,t),a=tn(h,s,t-1/3)}return{r:o*255,g:i*255,b:a*255}}function no(t,e,n){t=U(t,255),e=U(e,255),n=U(n,255);const o=Math.max(t,e,n),i=Math.min(t,e,n);let a=0;const s=o,h=o-i,c=o===0?0:h/o;if(o===i)a=0;else{switch(o){case t:a=(e-n)/h+(e<n?6:0);break;case e:a=(n-t)/h+2;break;case n:a=(t-e)/h+4;break}a/=6}return{h:a,s:c,v:s}}function vr(t,e,n){t=U(t,360)*6,e=U(e,100),n=U(n,100);const o=Math.floor(t),i=t-o,a=n*(1-e),s=n*(1-i*e),h=n*(1-(1-i)*e),c=o%6,d=[n,s,a,a,h,n][c],u=[h,n,n,s,a,a][c],p=[a,a,h,n,n,s][c];return{r:d*255,g:u*255,b:p*255}}function oo(t,e,n,o){const i=[Nt(Math.round(t).toString(16)),Nt(Math.round(e).toString(16)),Nt(Math.round(n).toString(16))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function wr(t,e,n,o,i){const a=[Nt(Math.round(t).toString(16)),Nt(Math.round(e).toString(16)),Nt(Math.round(n).toString(16)),Nt(xr(o))];return i&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}function yr(t,e,n,o){const i=t/100,a=e/100,s=n/100,h=o/100,c=255*(1-i)*(1-h),d=255*(1-a)*(1-h),u=255*(1-s)*(1-h);return{r:c,g:d,b:u}}function io(t,e,n){let o=1-t/255,i=1-e/255,a=1-n/255,s=Math.min(o,i,a);return s===1?(o=0,i=0,a=0):(o=(o-s)/(1-s)*100,i=(i-s)/(1-s)*100,a=(a-s)/(1-s)*100),s*=100,{c:Math.round(o),m:Math.round(i),y:Math.round(a),k:Math.round(s)}}function xr(t){return Math.round(parseFloat(t)*255).toString(16)}function ao(t){return Z(t)/255}function Z(t){return parseInt(t,16)}function kr(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}const fn={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function $r(t){let e={r:0,g:0,b:0},n=1,o=null,i=null,a=null,s=!1,h=!1;return typeof t=="string"&&(t=Cr(t)),typeof t=="object"&&(Q(t.r)&&Q(t.g)&&Q(t.b)?(e=br(t.r,t.g,t.b),s=!0,h=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Q(t.h)&&Q(t.s)&&Q(t.v)?(o=ke(t.s),i=ke(t.v),e=vr(t.h,o,i),s=!0,h="hsv"):Q(t.h)&&Q(t.s)&&Q(t.l)?(o=ke(t.s),a=ke(t.l),e=gr(t.h,o,a),s=!0,h="hsl"):Q(t.c)&&Q(t.m)&&Q(t.y)&&Q(t.k)&&(e=yr(t.c,t.m,t.y,t.k),s=!0,h="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(n=t.a)),n=Po(n),{ok:s,format:t.format||h,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:n}}const Sr="[-\\+]?\\d+%?",Er="[-\\+]?\\d*\\.\\d+%?",Ot="(?:"+Er+")|(?:"+Sr+")",en="[\\s|\\(]+("+Ot+")[,|\\s]+("+Ot+")[,|\\s]+("+Ot+")\\s*\\)?",$e="[\\s|\\(]+("+Ot+")[,|\\s]+("+Ot+")[,|\\s]+("+Ot+")[,|\\s]+("+Ot+")\\s*\\)?",it={CSS_UNIT:new RegExp(Ot),rgb:new RegExp("rgb"+en),rgba:new RegExp("rgba"+$e),hsl:new RegExp("hsl"+en),hsla:new RegExp("hsla"+$e),hsv:new RegExp("hsv"+en),hsva:new RegExp("hsva"+$e),cmyk:new RegExp("cmyk"+$e),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Cr(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(fn[t])t=fn[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let n=it.rgb.exec(t);return n?{r:n[1],g:n[2],b:n[3]}:(n=it.rgba.exec(t),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=it.hsl.exec(t),n?{h:n[1],s:n[2],l:n[3]}:(n=it.hsla.exec(t),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=it.hsv.exec(t),n?{h:n[1],s:n[2],v:n[3]}:(n=it.hsva.exec(t),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=it.cmyk.exec(t),n?{c:n[1],m:n[2],y:n[3],k:n[4]}:(n=it.hex8.exec(t),n?{r:Z(n[1]),g:Z(n[2]),b:Z(n[3]),a:ao(n[4]),format:e?"name":"hex8"}:(n=it.hex6.exec(t),n?{r:Z(n[1]),g:Z(n[2]),b:Z(n[3]),format:e?"name":"hex"}:(n=it.hex4.exec(t),n?{r:Z(n[1]+n[1]),g:Z(n[2]+n[2]),b:Z(n[3]+n[3]),a:ao(n[4]+n[4]),format:e?"name":"hex8"}:(n=it.hex3.exec(t),n?{r:Z(n[1]+n[1]),g:Z(n[2]+n[2]),b:Z(n[3]+n[3]),format:e?"name":"hex"}:!1))))))))))}function Q(t){return typeof t=="number"?!Number.isNaN(t):it.CSS_UNIT.test(t)}class M{constructor(e="",n={}){if(e instanceof M)return e;typeof e=="number"&&(e=kr(e)),this.originalInput=e;const o=$r(e);this.originalInput=e,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=n.format??o.format,this.gradientType=n.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let n,o,i;const a=e.r/255,s=e.g/255,h=e.b/255;return a<=.03928?n=a/12.92:n=Math.pow((a+.055)/1.055,2.4),s<=.03928?o=s/12.92:o=Math.pow((s+.055)/1.055,2.4),h<=.03928?i=h/12.92:i=Math.pow((h+.055)/1.055,2.4),.2126*n+.7152*o+.0722*i}getAlpha(){return this.a}setAlpha(e){return this.a=Po(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=no(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=no(this.r,this.g,this.b),n=Math.round(e.h*360),o=Math.round(e.s*100),i=Math.round(e.v*100);return this.a===1?`hsv(${n}, ${o}%, ${i}%)`:`hsva(${n}, ${o}%, ${i}%, ${this.roundA})`}toHsl(){const e=eo(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=eo(this.r,this.g,this.b),n=Math.round(e.h*360),o=Math.round(e.s*100),i=Math.round(e.l*100);return this.a===1?`hsl(${n}, ${o}%, ${i}%)`:`hsla(${n}, ${o}%, ${i}%, ${this.roundA})`}toHex(e=!1){return oo(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return wr(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),n=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${e}, ${n}, ${o})`:`rgba(${e}, ${n}, ${o}, ${this.roundA})`}toPercentageRgb(){const e=n=>`${Math.round(U(n,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=n=>Math.round(U(n,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...io(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:n,y:o,k:i}=io(this.r,this.g,this.b);return`cmyk(${e}, ${n}, ${o}, ${i})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+oo(this.r,this.g,this.b,!1);for(const[n,o]of Object.entries(fn))if(e===o)return n;return!1}toString(e){const n=!!e;e=e??this.format;let o=!1;const i=this.a<1&&this.a>=0;return!n&&i&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(o=this.toRgbString()),e==="prgb"&&(o=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(o=this.toHexString()),e==="hex3"&&(o=this.toHexString(!0)),e==="hex4"&&(o=this.toHex8String(!0)),e==="hex8"&&(o=this.toHex8String()),e==="name"&&(o=this.toName()),e==="hsl"&&(o=this.toHslString()),e==="hsv"&&(o=this.toHsvString()),e==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new M(this.toString())}lighten(e=10){const n=this.toHsl();return n.l+=e/100,n.l=xe(n.l),new M(n)}brighten(e=10){const n=this.toRgb();return n.r=Math.max(0,Math.min(255,n.r-Math.round(255*-(e/100)))),n.g=Math.max(0,Math.min(255,n.g-Math.round(255*-(e/100)))),n.b=Math.max(0,Math.min(255,n.b-Math.round(255*-(e/100)))),new M(n)}darken(e=10){const n=this.toHsl();return n.l-=e/100,n.l=xe(n.l),new M(n)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const n=this.toHsl();return n.s-=e/100,n.s=xe(n.s),new M(n)}saturate(e=10){const n=this.toHsl();return n.s+=e/100,n.s=xe(n.s),new M(n)}greyscale(){return this.desaturate(100)}spin(e){const n=this.toHsl(),o=(n.h+e)%360;return n.h=o<0?360+o:o,new M(n)}mix(e,n=50){const o=this.toRgb(),i=new M(e).toRgb(),a=n/100,s={r:(i.r-o.r)*a+o.r,g:(i.g-o.g)*a+o.g,b:(i.b-o.b)*a+o.b,a:(i.a-o.a)*a+o.a};return new M(s)}analogous(e=6,n=30){const o=this.toHsl(),i=360/n,a=[this];for(o.h=(o.h-(i*e>>1)+720)%360;--e;)o.h=(o.h+i)%360,a.push(new M(o));return a}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new M(e)}monochromatic(e=6){const n=this.toHsv(),{h:o}=n,{s:i}=n;let{v:a}=n;const s=[],h=1/e;for(;e--;)s.push(new M({h:o,s:i,v:a})),a=(a+h)%1;return s}splitcomplement(){const e=this.toHsl(),{h:n}=e;return[this,new M({h:(n+72)%360,s:e.s,l:e.l}),new M({h:(n+216)%360,s:e.s,l:e.l})]}onBackground(e){const n=this.toRgb(),o=new M(e).toRgb(),i=n.a+o.a*(1-n.a);return new M({r:(n.r*n.a+o.r*o.a*(1-n.a))/i,g:(n.g*n.a+o.g*o.a*(1-n.a))/i,b:(n.b*n.a+o.b*o.a*(1-n.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const n=this.toHsl(),{h:o}=n,i=[this],a=360/e;for(let s=1;s<e;s++)i.push(new M({h:(o+s*a)%360,s:n.s,l:n.l}));return i}equals(e){const n=new M(e);return this.format==="cmyk"||n.format==="cmyk"?this.toCmykString()===n.toCmykString():this.toRgbString()===n.toRgbString()}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bo="important",Ar=" !"+Bo,Rt=Ie(class extends Pe{constructor(t){if(super(t),t.type!==Et.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,n)=>{const o=t[n];return o==null?e:e+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(t,[e]){const{style:n}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?n.removeProperty(o):n[o]=null);for(const o in e){const i=e[o];if(i!=null){this.ft.add(o);const a=typeof i=="string"&&i.endsWith(Ar);o.includes("-")||a?n.setProperty(o,a?i.slice(0,-11):i,a?Bo:""):n[o]=i}}return tt}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Tr=`:host {
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
`,w=class extends F{constructor(){super(),this.hasSlotController=new Pt(this,"hint","label"),this.isSafeValue=!1,this.localize=new at(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!0,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this._value=null,this.defaultValue=this.getAttribute("value")||null,this.withLabel=!1,this.withHint=!1,this.hasEyeDropper=!1,this.label="",this.hint="",this.format="hex",this.size="medium",this.withoutFormatToggle=!1,this.name=null,this.disabled=!1,this.open=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form=null,this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0},this.handleFocusOut=()=>{this.hasFocus=!1},this.reportValidityAfterShow=()=>{this.removeEventListener("invalid",this.emitInvalid),this.reportValidity(),this.addEventListener("invalid",this.emitInvalid)},this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focus())},this.handleDocumentKeyDown=t=>{if(t.key==="Escape"&&this.open){t.stopPropagation(),this.focus(),this.hide();return}t.key==="Tab"&&setTimeout(()=>{const e=this.getRootNode()instanceof ShadowRoot?document.activeElement?.shadowRoot?.activeElement:document.activeElement;(!this||e?.closest(this.tagName.toLowerCase())!==this)&&this.hide()})},this.handleDocumentMouseDown=t=>{const n=t.composedPath().some(o=>o instanceof Element&&(o.closest(".color-picker")||o===this.trigger));this&&!n&&this.hide()},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}static get validators(){const t=[Me()];return[...super.validators,...t]}get validationTarget(){return this.popup?.active?this.input:this.trigger}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("preview-color-copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("preview-color-copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value||""),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".slider.alpha"),n=e.querySelector(".slider-handle"),{width:o}=e.getBoundingClientRect();let i=this.value,a=this.value;n.focus(),t.preventDefault(),Je(e,{onMove:s=>{this.alpha=R(s/o*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.value!==i&&(i=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".slider.hue"),n=e.querySelector(".slider-handle"),{width:o}=e.getBoundingClientRect();let i=this.value,a=this.value;n.focus(),t.preventDefault(),Je(e,{onMove:s=>{this.hue=R(s/o*360,0,360),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input"))}))},onStop:()=>{this.value!==i&&(i=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".grid"),n=e.querySelector(".grid-handle"),{width:o,height:i}=e.getBoundingClientRect();let a=this.value,s=this.value;n.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,Je(e,{onMove:(h,c)=>{this.saturation=R(h/o*100,0,100),this.brightness=R(100-c/i*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=R(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=R(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleHueKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=R(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=R(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleGridKeyDown(t){const e=t.shiftKey?10:1,n=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=R(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=R(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=R(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=R(this.brightness-e,0,100),this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputChange(t){const e=t.target,n=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value||""):this.value="",this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputInput(t){this.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),setTimeout(()=>this.input.select())):this.hue=0}}handleTouchMove(t){t.preventDefault()}parseColor(t){if(!t||t.trim()==="")return null;const e=new M(t);if(!e.isValid)return null;const n=e.toHsl(),o=e.toRgb(),i=e.toHsv();if(!o||o.r==null||o.g==null||o.b==null)return null;const a={h:n.h||0,s:(n.s||0)*100,l:(n.l||0)*100,a:n.a||0},s=e.toHexString(),h=e.toHex8String(),c={h:i.h||0,s:(i.s||0)*100,v:(i.v||0)*100,a:i.a||0};return{hsl:{h:a.h,s:a.s,l:a.l,string:this.setLetterCase(`hsl(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%)`)},hsla:{h:a.h,s:a.s,l:a.l,a:a.a,string:this.setLetterCase(`hsla(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%, ${a.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:o.r,g:o.g,b:o.b,string:this.setLetterCase(`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`)},rgba:{r:o.r,g:o.g,b:o.b,a:o.a||0,string:this.setLetterCase(`rgba(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)}, ${(o.a||0).toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(h)}}setColor(t){const e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("preview-color-copied"),this.updateValidity()}handleAfterShow(){this.updateValidity()}handleEyeDropper(){if(!this.hasEyeDropper)return;new EyeDropper().open().then(e=>{const n=this.value;this.setColor(e.sRGBHex),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getHexString(t,e,n,o=100){const i=new M(`hsva(${t}, ${e}%, ${n}%, ${o/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}willUpdate(t){super.willUpdate(t),t.has("value")&&this.handleValueChange(t.get("value")||"",this.value||"")}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const n=this.parseColor(e);n!==null?(this.inputValue=this.value||"",this.hue=n.hsva.h,this.saturation=n.hsva.s,this.brightness=n.hsva.v,this.alpha=n.hsva.a*100,this.syncValues()):this.inputValue=t??""}this.requestUpdate()}focus(t){this.trigger.focus(t)}blur(){const t=this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),this.popup?.active&&this.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}reportValidity(){return!this.validity.valid&&!this.open?(this.addEventListener("wa-after-show",this.reportValidityAfterShow,{once:!0}),this.show(),this.disabled||this.dispatchEvent(new yn),!1):super.reportValidity()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}firstUpdated(t){super.firstUpdated(t),this.hasEyeDropper="EyeDropper"in window}handleTriggerClick(){this.open?this.hide():(this.show(),this.focus())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}updateAccessibleTrigger(){const t=this.trigger;t&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){if(!this.open)return this.open=!0,ee(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,ee(this,"wa-after-hide")}addOpenListeners(){this.base.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.base&&this.base.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled){this.open=!1;return}this.updateAccessibleTrigger(),this.open?(this.dispatchEvent(new CustomEvent("wa-show")),this.addOpenListeners(),await this.updateComplete,this.base.hidden=!1,this.popup.active=!0,await gt(this.popup.popup,"show-with-scale"),this.dispatchEvent(new CustomEvent("wa-after-show"))):(this.dispatchEvent(new CustomEvent("wa-hide")),this.removeOpenListeners(),await gt(this.popup.popup,"hide-with-scale"),this.base.hidden=!0,this.popup.active=!1,this.dispatchEvent(new CustomEvent("wa-after-hide")))}render(){const t=this.hasUpdated?this.withLabel||this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.withHint||this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,i=this.saturation,a=100-this.brightness,s=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(c=>c.trim()!==""),h=g`
      <div
        part="base"
        class=${O({"color-picker":!0})}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${Rt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${O({"grid-handle":!0,"grid-handle-dragging":this.isDraggingGridHandle})}
            style=${Rt({top:`${a}%`,left:`${i}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
                style=${Rt({left:`${this.hue===0?0:100/(360/this.hue)}%`,backgroundColor:this.getHexString(this.hue,100,100)})}
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
                      style=${Rt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${Rt({left:`${this.alpha}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            style=${Rt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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

        ${s.length>0?g`
              <div part="swatches" class="swatches">
                ${s.map(c=>{const d=this.parseColor(c);return d?g`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${_(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${c}
                      @click=${()=>this.selectSwatch(c)}
                      @keydown=${u=>!this.disabled&&u.key==="Enter"&&this.setColor(d.hexa)}
                    >
                      <div class="swatch-color" style=${Rt({backgroundColor:d.hexa})}></div>
                    </div>
                  `:""})}
              </div>
            `:""}
      </div>
    `;return g`
      <div
        class=${O({container:!0,"form-control":!0,"form-control-has-label":n})}
        part="trigger-container form-control"
      >
        <div part="form-control-label" class="label" id="form-control-label">
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${O({trigger:!0,"trigger-empty":this.isEmpty,"transparent-bg":!0,"form-control-input":!0})}
          style=${Rt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
          class=${O({"has-slotted":o})}
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
    `}};w.css=[pr,wt,Kt,Tr];w.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};r([x('[part~="base"]')],w.prototype,"base",2);r([x('[part~="input"]')],w.prototype,"input",2);r([x('[part~="form-control-label"]')],w.prototype,"triggerLabel",2);r([x('[part~="form-control-input"]')],w.prototype,"triggerButton",2);r([x(".color-popup")],w.prototype,"popup",2);r([x('[part~="preview"]')],w.prototype,"previewButton",2);r([x('[part~="trigger"]')],w.prototype,"trigger",2);r([T()],w.prototype,"hasFocus",2);r([T()],w.prototype,"isDraggingGridHandle",2);r([T()],w.prototype,"isEmpty",2);r([T()],w.prototype,"inputValue",2);r([T()],w.prototype,"hue",2);r([T()],w.prototype,"saturation",2);r([T()],w.prototype,"brightness",2);r([T()],w.prototype,"alpha",2);r([T()],w.prototype,"value",1);r([l({attribute:"value",reflect:!0})],w.prototype,"defaultValue",2);r([l({attribute:"with-label",reflect:!0,type:Boolean})],w.prototype,"withLabel",2);r([l({attribute:"with-hint",reflect:!0,type:Boolean})],w.prototype,"withHint",2);r([T()],w.prototype,"hasEyeDropper",2);r([l()],w.prototype,"label",2);r([l({attribute:"hint"})],w.prototype,"hint",2);r([l()],w.prototype,"format",2);r([l({reflect:!0})],w.prototype,"size",2);r([l({attribute:"without-format-toggle",type:Boolean})],w.prototype,"withoutFormatToggle",2);r([l({reflect:!0})],w.prototype,"name",2);r([l({type:Boolean})],w.prototype,"disabled",2);r([l({type:Boolean,reflect:!0})],w.prototype,"open",2);r([l({type:Boolean})],w.prototype,"opacity",2);r([l({type:Boolean})],w.prototype,"uppercase",2);r([l()],w.prototype,"swatches",2);r([l({reflect:!0})],w.prototype,"form",2);r([l({type:Boolean,reflect:!0})],w.prototype,"required",2);r([vi({passive:!1})],w.prototype,"handleTouchMove",1);r([D("format",{waitUntilFirstUpdate:!0})],w.prototype,"handleFormatChange",1);r([D("opacity")],w.prototype,"handleOpacityChange",1);r([D("value")],w.prototype,"handleValueChange",1);r([D("open",{waitUntilFirstUpdate:!0})],w.prototype,"handleOpenChange",1);w=r([B("wa-color-picker")],w);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var _r=`:host {
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
`,At=class extends N{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal",this.variant="neutral"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){le(t.target)?.classList.add("button-focus")}handleBlur(t){le(t.target)?.classList.remove("button-focus")}handleMouseOver(t){le(t.target)?.classList.add("button-hover")}handleMouseOut(t){le(t.target)?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const n=t.indexOf(e),o=le(e);o&&(o.appearance==="outlined"&&(this.hasOutlined=!0),o.classList.add("wa-button-group__button"),o.classList.toggle("wa-button-group__horizontal",this.orientation==="horizontal"),o.classList.toggle("wa-button-group__vertical",this.orientation==="vertical"),o.classList.toggle("wa-button-group__button-first",n===0),o.classList.toggle("wa-button-group__button-inner",n>0&&n<t.length-1),o.classList.toggle("wa-button-group__button-last",n===t.length-1),o.classList.toggle("wa-button-group__button-radio",o.tagName.toLowerCase()==="wa-radio-button"))})}render(){return g`
      <slot
        part="base"
        class=${O({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};At.css=[Be,_r];r([x("slot")],At.prototype,"defaultSlot",2);r([T()],At.prototype,"disableRole",2);r([T()],At.prototype,"hasOutlined",2);r([l()],At.prototype,"label",2);r([l({reflect:!0})],At.prototype,"orientation",2);r([l({reflect:!0})],At.prototype,"variant",2);At=r([B("wa-button-group")],At);function le(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Lr=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};function*Fo(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Fo(t.shadowRoot.activeElement)))}var Rr=`:host {
  --show-duration: 50ms;
  --hide-duration: 50ms;
  display: contents;
}

#menu {
  display: flex;
  flex-direction: column;
  width: max-content;
  margin: 0;
  padding: 0.25em;
  border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
  border-radius: var(--wa-border-radius-m);
  background-color: var(--wa-color-surface-raised);
  box-shadow: var(--wa-shadow-m);
  color: var(--wa-color-text-normal);
  text-align: start;
  user-select: none;
  overflow: auto;
  max-width: var(--auto-size-available-width) !important;
  max-height: var(--auto-size-available-height) !important;

  &.show {
    animation: show var(--show-duration) ease;
  }

  &.hide {
    animation: show var(--hide-duration) ease reverse;
  }

  ::slotted(h1),
  ::slotted(h2),
  ::slotted(h3),
  ::slotted(h4),
  ::slotted(h5),
  ::slotted(h6) {
    display: block !important;
    margin: 0.25em 0 !important;
    padding: 0.25em 0.75em !important;
    color: var(--wa-color-text-quiet) !important;
    font-family: var(--wa-font-family-body) !important;
    font-weight: var(--wa-font-weight-semibold) !important;
    font-size: var(--wa-font-size-smaller) !important;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em; /* Component-specific, left as-is */
  }
}

wa-popup[data-current-placement^='top'] #menu {
  transform-origin: bottom;
}

wa-popup[data-current-placement^='bottom'] #menu {
  transform-origin: top;
}

wa-popup[data-current-placement^='left'] #menu {
  transform-origin: right;
}

wa-popup[data-current-placement^='right'] #menu {
  transform-origin: left;
}

wa-popup[data-current-placement='left-start'] #menu {
  transform-origin: right top;
}

wa-popup[data-current-placement='left-end'] #menu {
  transform-origin: right bottom;
}

wa-popup[data-current-placement='right-start'] #menu {
  transform-origin: left top;
}

wa-popup[data-current-placement='right-end'] #menu {
  transform-origin: left bottom;
}

@keyframes show {
  from {
    scale: 0.9;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
`,nn=new Set,X=class extends N{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new at(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{const e=this.localize.dir()==="rtl";if(t.key==="Escape"){const u=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,u?.focus();return}const n=[...Fo()].find(u=>u.localName==="wa-dropdown-item"),o=n?.localName==="wa-dropdown-item",i=this.getCurrentSubmenuItem(),a=!!i;let s,h,c;a?(s=this.getSubmenuItems(i),h=s.find(u=>u.active||u===n),c=h?s.indexOf(h):-1):(s=this.getItems(),h=s.find(u=>u.active||u===n),c=h?s.indexOf(h):-1);let d;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),c>0?d=s[c-1]:d=s[s.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),c!==-1&&c<s.length-1?d=s[c+1]:d=s[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&o&&h&&h.hasSubmenu){t.preventDefault(),t.stopPropagation(),h.submenuOpen=!0,this.addToSubmenuStack(h),setTimeout(()=>{const u=this.getSubmenuItems(h);u.length>0&&(u.forEach((p,f)=>p.active=f===0),u[0].focus())},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&a){t.preventDefault(),t.stopPropagation();const u=this.removeFromSubmenuStack();u&&(u.submenuOpen=!1,setTimeout(()=>{u.focus(),u.active=!0,(u.slot==="submenu"?this.getSubmenuItems(u.parentElement):this.getItems()).forEach(f=>{f!==u&&(f.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),d=t.key==="Home"?s[0]:s[s.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,s.some(u=>{const p=(u.textContent||"").trim().toLowerCase(),f=this.userTypedQuery.trim().toLowerCase();return p.startsWith(f)?(d=u,!0):!1})),d){t.preventDefault(),t.stopPropagation(),s.forEach(u=>u.active=u===d),d.focus();return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&o&&h&&(t.preventDefault(),t.stopPropagation(),h.hasSubmenu?(h.submenuOpen=!0,this.addToSubmenuStack(h),setTimeout(()=>{const u=this.getSubmenuItems(h);u.length>0&&(u.forEach((p,f)=>p.active=f===0),u[0].focus())},0)):this.makeSelection(h))},this.handleDocumentPointerDown=t=>{t.composedPath().some(o=>o instanceof HTMLElement?o===this||o.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{const e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;const n=e.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl",i=o?n.right:n.left,a=o?Math.max(t.clientX,i):Math.min(t.clientX,i),s=Math.max(n.top,Math.min(t.clientY,n.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${a}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${s}px`);const h=e.matches(":hover"),c=e.submenuElement?.matches(":hover")||!!t.composedPath().find(d=>d instanceof HTMLElement&&d.closest('[part="submenu"]')===e.submenuElement);!h&&!c&&setTimeout(()=>{!e.matches(":hover")&&!e.submenuElement?.matches(":hover")&&(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove)}firstUpdated(){this.syncAriaAttributes()}async updated(t){t.has("open")&&(this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())),t.has("size")&&this.syncItemSizes()}getItems(t=!1){const e=this.defaultSlot.assignedElements({flatten:!0}).filter(n=>n.localName==="wa-dropdown-item");return t?e:e.filter(n=>!n.disabled)}getSubmenuItems(t,e=!1){const n=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!n)return[];const o=n.assignedElements({flatten:!0}).filter(i=>i.localName==="wa-dropdown-item");return e?o:o.filter(i=>!i.disabled)}syncItemSizes(){this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){const e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){const e=t.closest('wa-dropdown-item:not([slot="submenu"])');let n;e?n=this.getSubmenuItems(e,!0):n=this.getItems(!0),n.forEach(o=>{o!==t&&o.submenuOpen&&(o.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger())return;const e=new Vn;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}nn.forEach(o=>o.open=!1),this.popup.active=!0,this.open=!0,nn.add(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await gt(this.menu,"show");const n=this.getItems();n.length>0&&(n.forEach((o,i)=>o.active=i===0),n[0].focus()),this.dispatchEvent(new Ln)}async hideMenu(){const t=new Rn({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,nn.delete(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await gt(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new _n)}handleMenuClick(t){const e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e)}}async handleMenuSlotChange(){const t=this.getItems(!0);await Promise.all(t.map(o=>o.updateComplete)),this.syncItemSizes();const e=t.some(o=>o.type==="checkbox"),n=t.some(o=>o.hasSubmenu);t.forEach((o,i)=>{o.active=i===0,o.checkboxAdjacent=e,o.submenuAdjacent=n})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){const e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);const e=Ro(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);const n=t.submenuElement.querySelector('slot[name="submenu"]');n&&(n.removeEventListener("slotchange",X.handleSubmenuSlotChange),n.addEventListener("slotchange",X.handleSubmenuSlotChange),X.handleSubmenuSlotChange({target:n}))}static handleSubmenuSlotChange(t){const e=t.target;if(!e)return;const n=e.assignedElements().filter(a=>a.localName==="wa-dropdown-item");if(n.length===0)return;const o=n.some(a=>a.hasSubmenu),i=n.some(a=>a.type==="checkbox");n.forEach(a=>{a.submenuAdjacent=o,a.checkboxAdjacent=i})}processSubmenuItems(t){if(!t.submenuElement)return;const e=this.getSubmenuItems(t,!0),n=e.some(o=>o.hasSubmenu);e.forEach(o=>{o.submenuAdjacent=n})}cleanupSubmenuPosition(t){const e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;const n=this.localize.dir()==="rtl"?"left-start":"right-start";zo(t,t.submenuElement,{placement:n,middleware:[Vo({mainAxis:0,crossAxis:-5}),Do({fallbackStrategy:"bestFit"}),Oo({padding:8})]}).then(({x:o,y:i,placement:a})=>{t.submenuElement.setAttribute("data-placement",a),Object.assign(t.submenuElement.style,{left:`${o}px`,top:`${i}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");const n=t.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${n.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${n.bottom}px`)}makeSelection(t){const e=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);const n=new Lr({item:t});this.dispatchEvent(n),n.defaultPrevented||(this.open=!1,e?.focus())}async syncAriaAttributes(){const t=this.getTrigger();let e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",xn("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup.active:this.open;return g`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${t}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}};X.css=[wt,Rr];r([x("slot:not([name])")],X.prototype,"defaultSlot",2);r([x("#menu")],X.prototype,"menu",2);r([x("wa-popup")],X.prototype,"popup",2);r([l({type:Boolean,reflect:!0})],X.prototype,"open",2);r([l({reflect:!0})],X.prototype,"size",2);r([l({reflect:!0})],X.prototype,"placement",2);r([l({type:Number})],X.prototype,"distance",2);r([l({type:Number})],X.prototype,"skidding",2);X=r([B("wa-dropdown")],X);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Vr=`:host {
  display: flex;
  position: relative;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: var(--wa-border-radius-s);
  isolation: isolate;
  color: var(--wa-color-text-normal);
  line-height: var(--wa-line-height-condensed);
  cursor: pointer;
  transition:
    100ms background-color ease,
    100ms color ease;
}

@media (hover: hover) {
  :host(:hover:not(:state(disabled))) {
    background-color: var(--wa-color-neutral-fill-normal);
  }
}

:host(:focus-visible) {
  z-index: 1;
  outline: var(--wa-focus-ring);
  background-color: var(--wa-color-neutral-fill-normal);
}

:host(:state(disabled)) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Danger variant */
:host([variant='danger']),
:host([variant='danger']) #details {
  color: var(--wa-color-danger-on-quiet);
}

@media (hover: hover) {
  :host([variant='danger']:hover) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }
}

:host([variant='danger']:focus-visible) {
  background-color: var(--wa-color-danger-fill-normal);
  color: var(--wa-color-danger-on-normal);
}

:host([checkbox-adjacent]) {
  padding-inline-start: 2em;
}

/* Only add padding when item actually has a submenu */
:host([submenu-adjacent]:not(:state(has-submenu))) #details {
  padding-inline-end: 0;
}

:host(:state(has-submenu)[submenu-adjacent]) #details {
  padding-inline-end: 1.75em;
}

#check {
  visibility: hidden;
  margin-inline-start: -1.5em;
  margin-inline-end: 0.5em;
  font-size: var(--wa-font-size-smaller);
}

:host(:state(checked)) #check {
  visibility: visible;
}

#icon ::slotted(*) {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin-inline-end: 0.75em !important;
  font-size: var(--wa-font-size-smaller);
}

#label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#details {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: end;
  color: var(--wa-color-text-quiet);
  font-size: var(--wa-font-size-smaller) !important;
}

#details ::slotted(*) {
  margin-inline-start: 2em !important;
}

/* Submenu indicator icon */
#submenu-indicator {
  position: absolute;
  inset-inline-end: 1em;
  color: var(--wa-color-neutral-on-quiet);
  font-size: var(--wa-font-size-smaller);
}

/* Flip chevron icon when RTL */
:host(:dir(rtl)) #submenu-indicator {
  transform: scaleX(-1);
}

/* Submenu styles */
#submenu {
  display: flex;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  width: max-content;
  margin: 0;
  padding: 0.25em;
  border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
  border-radius: var(--wa-border-radius-m);
  background-color: var(--wa-color-surface-raised);
  box-shadow: var(--wa-shadow-m);
  color: var(--wa-color-text-normal);
  text-align: start;
  user-select: none;

  /* Override default popover styles */
  &[popover] {
    margin: 0;
    inset: auto;
    padding: 0.25em;
    overflow: visible;
    border-radius: var(--wa-border-radius-m);
  }

  &.show {
    animation: submenu-show var(--show-duration, 50ms) ease;
  }

  &.hide {
    animation: submenu-show var(--show-duration, 50ms) ease reverse;
  }

  /* Submenu placement transform origins */
  &[data-placement^='top'] {
    transform-origin: bottom;
  }

  &[data-placement^='bottom'] {
    transform-origin: top;
  }

  &[data-placement^='left'] {
    transform-origin: right;
  }

  &[data-placement^='right'] {
    transform-origin: left;
  }

  &[data-placement='left-start'] {
    transform-origin: right top;
  }

  &[data-placement='left-end'] {
    transform-origin: right bottom;
  }

  &[data-placement='right-start'] {
    transform-origin: left top;
  }

  &[data-placement='right-end'] {
    transform-origin: left bottom;
  }

  /* Safe triangle styling */
  &::before {
    display: none;
    z-index: 9;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    content: '';
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
    pointer-events: auto; /* Enable mouse events on the triangle */
  }

  &[data-visible]::before {
    display: block;
  }
}

::slotted(wa-dropdown-item) {
  font-size: inherit;
}

::slotted(wa-divider) {
  --spacing: 0.25em;
}

@keyframes submenu-show {
  from {
    scale: 0.9;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
`,Y=class extends N{constructor(){super(...arguments),this.hasSlotController=new Pt(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.setAttribute("aria-checked",this.checked?"true":"false"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("type")&&(this.type==="checkbox"?this.setAttribute("role","menuitemcheckbox"):this.setAttribute("role","menuitem")),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.notifyParentOfOpening(),this.submenuElement.showPopover(),this.submenuElement.hidden=!1,this.submenuElement.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await gt(this.submenuElement,"show"),setTimeout(()=>{const t=this.getSubmenuItems();t.length>0&&(t.forEach((e,n)=>e.active=n===0),t[0].focus())},0))}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;e&&[...e.children].filter(o=>o!==this&&o.localName==="wa-dropdown-item"&&o.getAttribute("slot")===this.getAttribute("slot")&&o.submenuOpen).forEach(o=>{o.submenuOpen=!1})}async closeSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),this.submenuElement.hidden||(await gt(this.submenuElement,"hide"),this.submenuElement.hidden=!0,this.submenuElement.removeAttribute("data-visible"),this.submenuElement.hidePopover()))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return g`
      ${this.type==="checkbox"?g`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?g`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?g`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:""}
    `}};Y.css=Vr;r([x("#submenu")],Y.prototype,"submenuElement",2);r([l({type:Boolean})],Y.prototype,"active",2);r([l({reflect:!0})],Y.prototype,"variant",2);r([l({reflect:!0})],Y.prototype,"size",2);r([l({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],Y.prototype,"checkboxAdjacent",2);r([l({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],Y.prototype,"submenuAdjacent",2);r([l()],Y.prototype,"value",2);r([l({reflect:!0})],Y.prototype,"type",2);r([l({type:Boolean})],Y.prototype,"checked",2);r([l({type:Boolean,reflect:!0})],Y.prototype,"disabled",2);r([l({type:Boolean,reflect:!0})],Y.prototype,"submenuOpen",2);r([T()],Y.prototype,"hasSubmenu",2);Y=r([B("wa-dropdown-item")],Y);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const n of e)n.nodeType===Node.ELEMENT_NODE&&Or(n)});async function Or(t){const e=t instanceof Element?t.tagName.toLowerCase():"",n=e?.startsWith("wa-"),o=[...t.querySelectorAll(":not(:defined)")].map(s=>s.tagName.toLowerCase()).filter(s=>s.startsWith("wa-"));n&&!customElements.get(e)&&o.push(e);const i=[...new Set(o)],a=await Promise.allSettled(i.map(s=>Dr(s)));for(const s of a)s.status==="rejected"&&console.warn(s.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function Dr(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),n=Si(`components/${e}/${e}.js`);return new Promise((o,i)=>{import(n).then(()=>o()).catch(()=>i(new Error(`Unable to autoload <${t}> from ${n}`)))})}export{Pr as r};
//# sourceMappingURL=webawesome-7D1rN-GI.js.map
