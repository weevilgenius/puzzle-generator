/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=globalThis,Xe=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),mo=new WeakMap;let tr=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o;const o=this.t;if(Xe&&e===void 0){const r=o!==void 0&&o.length===1;r&&(e=mo.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&mo.set(o,e))}return e}toString(){return this.cssText}};const Or=t=>new tr(typeof t=="string"?t:t+"",void 0,Ze),D=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((r,i,s)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new tr(o,t,Ze)},Rr=(t,e)=>{if(Xe)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const r=document.createElement("style"),i=pe.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)}},vo=Xe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const r of e.cssRules)o+=r.cssText;return Or(o)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Mr,defineProperty:Pr,getOwnPropertyDescriptor:Lr,getOwnPropertyNames:Vr,getOwnPropertySymbols:Br,getPrototypeOf:Dr}=Object,ke=globalThis,yo=ke.trustedTypes,Fr=yo?yo.emptyScript:"",Hr=ke.reactiveElementPolyfillSupport,Xt=(t,e)=>t,Dt={toAttribute(t,e){switch(e){case Boolean:t=t?Fr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Je=(t,e)=>!Mr(t,e),wo={attribute:!0,type:String,converter:Dt,reflect:!1,useDefault:!1,hasChanged:Je};Symbol.metadata??=Symbol("metadata"),ke.litPropertyMetadata??=new WeakMap;let Lt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=wo){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,o);i!==void 0&&Pr(this.prototype,e,i)}}static getPropertyDescriptor(e,o,r){const{get:i,set:s}=Lr(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:i,set(n){const l=i?.call(this);s?.call(this,n),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??wo}static _$Ei(){if(this.hasOwnProperty(Xt("elementProperties")))return;const e=Dr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Xt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xt("properties"))){const o=this.properties,r=[...Vr(o),...Br(o)];for(const i of r)this.createProperty(i,o[i])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[r,i]of o)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[o,r]of this.elementProperties){const i=this._$Eu(o,r);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)o.unshift(vo(i))}else e!==void 0&&o.push(vo(e));return o}static _$Eu(e,o){const r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,o=this.constructor.elementProperties;for(const r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Rr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const s=(r.converter?.toAttribute!==void 0?r.converter:Dt).toAttribute(o,r.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,o){const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const s=r.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Dt;this._$Em=i,this[i]=n.fromAttribute(o,s.type)??this._$Ej?.get(i)??null,this._$Em=null}}requestUpdate(e,o,r){if(e!==void 0){const i=this.constructor,s=this[e];if(r??=i.getPropertyOptions(e),!((r.hasChanged??Je)(s,o)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,s]of r){const{wrapped:n}=s,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,s,l)}}let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};Lt.elementStyles=[],Lt.shadowRootOptions={mode:"open"},Lt[Xt("elementProperties")]=new Map,Lt[Xt("finalized")]=new Map,Hr?.({ReactiveElement:Lt}),(ke.reactiveElementVersions??=[]).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=globalThis,me=Qe.trustedTypes,_o=me?me.createPolicy("lit-html",{createHTML:t=>t}):void 0,er="$lit$",xt=`lit$${Math.random().toFixed(9).slice(2)}$`,or="?"+xt,Ir=`<${or}>`,Mt=document,Jt=()=>Mt.createComment(""),Qt=t=>t===null||typeof t!="object"&&typeof t!="function",to=Array.isArray,Nr=t=>to(t)||typeof t?.[Symbol.iterator]=="function",Me=`[ 	
\f\r]`,Wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xo=/-->/g,ko=/>/g,Tt=RegExp(`>|${Me}(?:([^\\s"'>=/]+)(${Me}*=${Me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$o=/'/g,Co=/"/g,rr=/^(?:script|style|textarea|title)$/i,Ur=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),k=Ur(1),et=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),So=new WeakMap,Ot=Mt.createTreeWalker(Mt,129);function ir(t,e){if(!to(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return _o!==void 0?_o.createHTML(e):e}const Wr=(t,e)=>{const o=t.length-1,r=[];let i,s=e===2?"<svg>":e===3?"<math>":"",n=Wt;for(let l=0;l<o;l++){const c=t[l];let u,d,p=-1,b=0;for(;b<c.length&&(n.lastIndex=b,d=n.exec(c),d!==null);)b=n.lastIndex,n===Wt?d[1]==="!--"?n=xo:d[1]!==void 0?n=ko:d[2]!==void 0?(rr.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=Tt):d[3]!==void 0&&(n=Tt):n===Tt?d[0]===">"?(n=i??Wt,p=-1):d[1]===void 0?p=-2:(p=n.lastIndex-d[2].length,u=d[1],n=d[3]===void 0?Tt:d[3]==='"'?Co:$o):n===Co||n===$o?n=Tt:n===xo||n===ko?n=Wt:(n=Tt,i=void 0);const f=n===Tt&&t[l+1].startsWith("/>")?" ":"";s+=n===Wt?c+Ir:p>=0?(r.push(u),c.slice(0,p)+er+c.slice(p)+xt+f):c+xt+(p===-2?l:f)}return[ir(t,s+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class te{constructor({strings:e,_$litType$:o},r){let i;this.parts=[];let s=0,n=0;const l=e.length-1,c=this.parts,[u,d]=Wr(e,o);if(this.el=te.createElement(u,r),Ot.currentNode=this.el.content,o===2||o===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=Ot.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(er)){const b=d[n++],f=i.getAttribute(p).split(xt),g=/([.?@])?(.*)/.exec(b);c.push({type:1,index:s,name:g[2],strings:f,ctor:g[1]==="."?qr:g[1]==="?"?Kr:g[1]==="@"?Gr:$e}),i.removeAttribute(p)}else p.startsWith(xt)&&(c.push({type:6,index:s}),i.removeAttribute(p));if(rr.test(i.tagName)){const p=i.textContent.split(xt),b=p.length-1;if(b>0){i.textContent=me?me.emptyScript:"";for(let f=0;f<b;f++)i.append(p[f],Jt()),Ot.nextNode(),c.push({type:2,index:++s});i.append(p[b],Jt())}}}else if(i.nodeType===8)if(i.data===or)c.push({type:2,index:s});else{let p=-1;for(;(p=i.data.indexOf(xt,p+1))!==-1;)c.push({type:7,index:s}),p+=xt.length-1}s++}}static createElement(e,o){const r=Mt.createElement("template");return r.innerHTML=e,r}}function Ft(t,e,o=t,r){if(e===et)return e;let i=r!==void 0?o._$Co?.[r]:o._$Cl;const s=Qt(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(t),i._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=i:o._$Cl=i),i!==void 0&&(e=Ft(t,i._$AS(t,e.values),i,r)),e}class jr{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:r}=this._$AD,i=(e?.creationScope??Mt).importNode(o,!0);Ot.currentNode=i;let s=Ot.nextNode(),n=0,l=0,c=r[0];for(;c!==void 0;){if(n===c.index){let u;c.type===2?u=new oe(s,s.nextSibling,this,e):c.type===1?u=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(u=new Yr(s,this,e)),this._$AV.push(u),c=r[++l]}n!==c?.index&&(s=Ot.nextNode(),n++)}return Ot.currentNode=Mt,i}p(e){let o=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}}class oe{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,i){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Ft(this,e,o),Qt(e)?e===M||e==null||e===""?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==et&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Nr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==M&&Qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Mt.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=te.createElement(ir(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(o);else{const s=new jr(i,this),n=s.u(this.options);s.p(o),this.T(n),this._$AH=s}}_$AC(e){let o=So.get(e.strings);return o===void 0&&So.set(e.strings,o=new te(e)),o}k(e){to(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let r,i=0;for(const s of e)i===o.length?o.push(r=new oe(this.O(Jt()),this.O(Jt()),this,this.options)):r=o[i],r._$AI(s),i++;i<o.length&&(this._$AR(r&&r._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class $e{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,i,s){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=M}_$AI(e,o=this,r,i){const s=this.strings;let n=!1;if(s===void 0)e=Ft(this,e,o,0),n=!Qt(e)||e!==this._$AH&&e!==et,n&&(this._$AH=e);else{const l=e;let c,u;for(e=s[0],c=0;c<s.length-1;c++)u=Ft(this,l[r+c],o,c),u===et&&(u=this._$AH[c]),n||=!Qt(u)||u!==this._$AH[c],u===M?e=M:e!==M&&(e+=(u??"")+s[c+1]),this._$AH[c]=u}n&&!i&&this.j(e)}j(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class qr extends $e{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===M?void 0:e}}class Kr extends $e{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==M)}}class Gr extends $e{constructor(e,o,r,i,s){super(e,o,r,i,s),this.type=5}_$AI(e,o=this){if((e=Ft(this,e,o,0)??M)===et)return;const r=this._$AH,i=e===M&&r!==M||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==M&&(r===M||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Yr{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Ft(this,e)}}const Xr=Qe.litHtmlPolyfillSupport;Xr?.(te,oe),(Qe.litHtmlVersions??=[]).push("3.3.0");const Zr=(t,e,o)=>{const r=o?.renderBefore??e;let i=r._$litPart$;if(i===void 0){const s=o?.renderBefore??null;r._$litPart$=i=new oe(e.insertBefore(Jt(),s),s,void 0,o??{})}return i._$AI(t),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const eo=globalThis;let Zt=class extends Lt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Zr(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return et}};Zt._$litElement$=!0,Zt.finalized=!0,eo.litElementHydrateSupport?.({LitElement:Zt});const Jr=eo.litElementPolyfillSupport;Jr?.({LitElement:Zt});(eo.litElementVersions??=[]).push("4.2.0");var Qr=D`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;const Ue=new Set,Vt=new Map;let zt,oo="ltr",ro="en";const sr=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(sr){const t=new MutationObserver(ar);oo=document.documentElement.dir||"ltr",ro=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function nr(...t){t.map(e=>{const o=e.$code.toLowerCase();Vt.has(o)?Vt.set(o,Object.assign(Object.assign({},Vt.get(o)),e)):Vt.set(o,e),zt||(zt=e)}),ar()}function ar(){sr&&(oo=document.documentElement.dir||"ltr",ro=document.documentElement.lang||navigator.language),[...Ue.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let ti=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ue.add(this.host)}hostDisconnected(){Ue.delete(this.host)}dir(){return`${this.host.dir||oo}`.toLowerCase()}lang(){return`${this.host.lang||ro}`.toLowerCase()}getTranslationData(e){var o,r;const i=new Intl.Locale(e.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(r=(o=i?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",l=Vt.get(`${s}-${n}`),c=Vt.get(s);return{locale:i,language:s,region:n,primary:l,secondary:c}}exists(e,o){var r;const{primary:i,secondary:s}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(i&&i[e]||s&&s[e]||o.includeFallback&&zt&&zt[e])}term(e,...o){const{primary:r,secondary:i}=this.getTranslationData(this.lang());let s;if(r&&r[e])s=r[e];else if(i&&i[e])s=i[e];else if(zt&&zt[e])s=zt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...o):s}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var lr={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};nr(lr);var ei=lr,gt=class extends ti{};nr(ei);var U=D`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,cr=Object.defineProperty,oi=Object.defineProperties,ri=Object.getOwnPropertyDescriptor,ii=Object.getOwnPropertyDescriptors,Ao=Object.getOwnPropertySymbols,si=Object.prototype.hasOwnProperty,ni=Object.prototype.propertyIsEnumerable,Pe=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),io=t=>{throw TypeError(t)},Eo=(t,e,o)=>e in t?cr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,At=(t,e)=>{for(var o in e||(e={}))si.call(e,o)&&Eo(t,o,e[o]);if(Ao)for(var o of Ao(e))ni.call(e,o)&&Eo(t,o,e[o]);return t},Ce=(t,e)=>oi(t,ii(e)),a=(t,e,o,r)=>{for(var i=r>1?void 0:r?ri(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(i=(r?n(e,o,i):n(i))||i);return r&&i&&cr(e,o,i),i},hr=(t,e,o)=>e.has(t)||io("Cannot "+o),ai=(t,e,o)=>(hr(t,e,"read from private field"),e.get(t)),li=(t,e,o)=>e.has(t)?io("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),ci=(t,e,o,r)=>(hr(t,e,"write to private field"),e.set(t,o),o),hi=function(t,e){this[0]=t,this[1]=e},ui=t=>{var e=t[Pe("asyncIterator")],o=!1,r,i={};return e==null?(e=t[Pe("iterator")](),r=s=>i[s]=n=>e[s](n)):(e=e.call(t),r=s=>i[s]=n=>{if(o){if(o=!1,s==="throw")throw n;return n}return o=!0,{done:!1,value:new hi(new Promise(l=>{var c=e[s](n);c instanceof Object||io("Object expected"),l(c)}),1)}}),i[Pe("iterator")]=()=>i,r("next"),"throw"in e?r("throw"):i.throw=s=>{throw s},"return"in e&&r("return"),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const di={attribute:!0,type:String,converter:Dt,reflect:!1,hasChanged:Je},pi=(t=di,e,o)=>{const{kind:r,metadata:i}=o;let s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),r==="accessor"){const{name:n}=o;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,c,t)},init(l){return l!==void 0&&this.C(n,void 0,t,l),l}}}if(r==="setter"){const{name:n}=o;return function(l){const c=this[n];e.call(this,l),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+r)};function h(t){return(e,o)=>typeof o=="object"?pi(t,e,o):((r,i,s)=>{const n=i.hasOwnProperty(s);return i.constructor.createProperty(s,r),n?Object.getOwnPropertyDescriptor(i,s):void 0})(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(t){return h({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function so(t){return(e,o)=>{const r=typeof e=="function"?e:e[o];Object.assign(r,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fi=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O(t,e){return(o,r,i)=>{const s=n=>n.renderRoot?.querySelector(t)??null;return fi(o,r,{get(){return s(this)}})}}var fe,L=class extends Zt{constructor(){super(),li(this,fe,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const o=new CustomEvent(t,At({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const r=customElements.get(t);if(!r){try{customElements.define(t,e,o)}catch{customElements.define(t,class extends e{},o)}return}let i=" (unknown version)",s=i;"version"in e&&e.version&&(i=" v"+e.version),"version"in r&&r.version&&(s=" v"+r.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${s} has already been registered.`)}attributeChangedCallback(t,e,o){ai(this,fe)||(this.constructor.elementProperties.forEach((r,i)=>{r.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i])}),ci(this,fe,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}};fe=new WeakMap;L.version="2.20.1";L.dependencies={};a([h()],L.prototype,"dir",2);a([h()],L.prototype,"lang",2);var ur=class extends L{constructor(){super(...arguments),this.localize=new gt(this)}render(){return k`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};ur.styles=[U,Qr];var jt=new WeakMap,qt=new WeakMap,Kt=new WeakMap,Le=new WeakSet,ae=new WeakMap,re=class{constructor(t,e){this.handleFormData=o=>{const r=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!n&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(l=>{o.formData.append(i,l.toString())}):o.formData.append(i,s.toString()))},this.handleFormSubmit=o=>{var r;const i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=jt.get(this.form))==null||r.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),ae.set(this.host,[])},this.handleInteraction=o=>{const r=ae.get(this.host);r.includes(o.type)||r.push(o.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.checkValidity=="function"&&!r.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.reportValidity=="function"&&!r.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=At({form:o=>{const r=o.form;if(r){const s=o.getRootNode().querySelector(`#${r}`);if(s)return s}return o.closest("form")},name:o=>o.name,value:o=>o.value,defaultValue:o=>o.defaultValue,disabled:o=>{var r;return(r=o.disabled)!=null?r:!1},reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0,checkValidity:o=>typeof o.checkValidity=="function"?o.checkValidity():!0,setValue:(o,r)=>o.value=r,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),ae.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),ae.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,jt.has(this.form)?jt.get(this.form).add(this.host):jt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),qt.has(this.form)||(qt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Kt.has(this.form)||(Kt.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=jt.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),qt.has(this.form)&&(this.form.reportValidity=qt.get(this.form),qt.delete(this.form)),Kt.has(this.form)&&(this.form.checkValidity=Kt.get(this.form),Kt.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?Le.add(t):Le.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&o.setAttribute(r,e.getAttribute(r))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=!!Le.has(e),r=!!e.required;e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault()}},no=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(Ce(At({},no),{valid:!1,valueMissing:!0}));Object.freeze(Ce(At({},no),{valid:!1,customError:!0}));var bi=D`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,Se=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{const r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},We="";function To(t){We=t}function gi(t=""){if(!We){const e=[...document.getElementsByTagName("script")],o=e.find(r=>r.hasAttribute("data-shoelace"));if(o)To(o.getAttribute("data-shoelace"));else{const r=e.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src));let i="";r&&(i=r.getAttribute("src")),To(i.split("/").slice(0,-1).join("/"))}}return We.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var mi={name:"default",resolver:t=>gi(`assets/icons/${t}.svg`)},vi=mi,zo={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},yi={name:"system",resolver:t=>t in zo?`data:image/svg+xml,${encodeURIComponent(zo[t])}`:""},wi=yi,_i=[vi,wi],je=[];function xi(t){je.push(t)}function ki(t){je=je.filter(e=>e!==t)}function Oo(t){return _i.find(e=>e.name===t)}var $i=D`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function R(t,e){const o=At({waitUntilFirstUpdate:!1},e);return(r,i)=>{const{update:s}=r,n=Array.isArray(t)?t:[t];r.update=function(l){n.forEach(c=>{const u=c;if(l.has(u)){const d=l.get(u),p=this[u];d!==p&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](d,p)}}),s.call(this,l)}}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ci=(t,e)=>t?._$litType$!==void 0,Si=t=>t.strings===void 0,Ai={},Ei=(t,e=Ai)=>t._$AH=e;var Gt=Symbol(),le=Symbol(),Ve,Be=new Map,Z=class extends L{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let r;if(e?.spriteSheet)return this.svg=k`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Gt:le}catch{return le}try{const i=document.createElement("div");i.innerHTML=await r.text();const s=i.firstElementChild;if(((o=s?.tagName)==null?void 0:o.toLowerCase())!=="svg")return Gt;Ve||(Ve=new DOMParser);const l=Ve.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):Gt}catch{return Gt}}connectedCallback(){super.connectedCallback(),xi(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),ki(this)}getIconSource(){const t=Oo(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),r=o?Oo(this.library):void 0;if(!e){this.svg=null;return}let i=Be.get(e);if(i||(i=this.resolveIcon(e,r),Be.set(e,i)),!this.initialRender)return;const s=await i;if(s===le&&Be.delete(e),e===this.getIconSource().url){if(Ci(s)){if(this.svg=s,r){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof r.mutator=="function"&&n&&r.mutator(n)}return}switch(s){case le:case Gt:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(!0),(t=r?.mutator)==null||t.call(r,this.svg),this.emit("sl-load")}}}render(){return this.svg}};Z.styles=[U,$i];a([P()],Z.prototype,"svg",2);a([h({reflect:!0})],Z.prototype,"name",2);a([h()],Z.prototype,"src",2);a([h()],Z.prototype,"label",2);a([h({reflect:!0})],Z.prototype,"library",2);a([R("label")],Z.prototype,"handleLabelChange",1);a([R(["name","src","library"])],Z.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},ao=t=>(...e)=>({_$litDirective$:t,values:e});let lo=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=ao(class extends lo{constructor(t){if(super(t),t.type!==_t.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}const o=t.element.classList;for(const r of this.st)r in e||(o.remove(r),this.st.delete(r));for(const r in e){const i=!!e[r];i===this.st.has(r)||this.nt?.has(r)||(i?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return et}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dr=Symbol.for(""),Ti=t=>{if(t?.r===dr)return t?._$litStatic$},ve=(t,...e)=>({_$litStatic$:e.reduce((o,r,i)=>o+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1],t[0]),r:dr}),Ro=new Map,zi=t=>(e,...o)=>{const r=o.length;let i,s;const n=[],l=[];let c,u=0,d=!1;for(;u<r;){for(c=e[u];u<r&&(s=o[u],(i=Ti(s))!==void 0);)c+=i+e[++u],d=!0;u!==r&&l.push(s),n.push(c),u++}if(u===r&&n.push(e[r]),d){const p=n.join("$$lit$$");(e=Ro.get(p))===void 0&&(n.raw=n,Ro.set(p,e=n)),o=l}return t(e,...o)},be=zi(k);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=t=>t??M;var C=class extends L{constructor(){super(...arguments),this.formControlController=new re(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Se(this,"[default]","prefix","suffix"),this.localize=new gt(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:no}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?ve`a`:ve`button`;return be`
      <${e}
        part="base"
        class=${V({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${m(t?void 0:this.disabled)}
        type=${m(t?void 0:this.type)}
        title=${this.title}
        name=${m(t?void 0:this.name)}
        value=${m(t?void 0:this.value)}
        href=${m(t&&!this.disabled?this.href:void 0)}
        target=${m(t?this.target:void 0)}
        download=${m(t?this.download:void 0)}
        rel=${m(t?this.rel:void 0)}
        role=${m(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?be` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?be`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};C.styles=[U,bi];C.dependencies={"sl-icon":Z,"sl-spinner":ur};a([O(".button")],C.prototype,"button",2);a([P()],C.prototype,"hasFocus",2);a([P()],C.prototype,"invalid",2);a([h()],C.prototype,"title",2);a([h({reflect:!0})],C.prototype,"variant",2);a([h({reflect:!0})],C.prototype,"size",2);a([h({type:Boolean,reflect:!0})],C.prototype,"caret",2);a([h({type:Boolean,reflect:!0})],C.prototype,"disabled",2);a([h({type:Boolean,reflect:!0})],C.prototype,"loading",2);a([h({type:Boolean,reflect:!0})],C.prototype,"outline",2);a([h({type:Boolean,reflect:!0})],C.prototype,"pill",2);a([h({type:Boolean,reflect:!0})],C.prototype,"circle",2);a([h()],C.prototype,"type",2);a([h()],C.prototype,"name",2);a([h()],C.prototype,"value",2);a([h()],C.prototype,"href",2);a([h()],C.prototype,"target",2);a([h()],C.prototype,"rel",2);a([h()],C.prototype,"download",2);a([h()],C.prototype,"form",2);a([h({attribute:"formaction"})],C.prototype,"formAction",2);a([h({attribute:"formenctype"})],C.prototype,"formEnctype",2);a([h({attribute:"formmethod"})],C.prototype,"formMethod",2);a([h({attribute:"formnovalidate",type:Boolean})],C.prototype,"formNoValidate",2);a([h({attribute:"formtarget"})],C.prototype,"formTarget",2);a([R("disabled",{waitUntilFirstUpdate:!0})],C.prototype,"handleDisabledChange",1);C.define("sl-button");var Oi=D`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,Ae=(t="value")=>(e,o)=>{const r=e.constructor,i=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(s,n,l){var c;const u=r.getPropertyOptions(t),d=typeof u.attribute=="string"?u.attribute:t;if(s===d){const p=u.converter||Dt,f=(typeof p=="function"?p:(c=p?.fromAttribute)!=null?c:Dt.fromAttribute)(l,u.type);this[t]!==f&&(this[o]=f)}i.call(this,s,n,l)}},co=D`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye=ao(class extends lo{constructor(t){if(super(t),t.type!==_t.PROPERTY&&t.type!==_t.ATTRIBUTE&&t.type!==_t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Si(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===et||e===M)return e;const o=t.element,r=t.name;if(t.type===_t.PROPERTY){if(e===o[r])return et}else if(t.type===_t.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return et}else if(t.type===_t.ATTRIBUTE&&o.getAttribute(r)===e+"")return et;return Ei(t),e}});var F=class extends L{constructor(){super(...arguments),this.formControlController=new re(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Se(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return k`
      <div
        class=${V({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${V({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${m(this.value)}
            .indeterminate=${ye(this.indeterminate)}
            .checked=${ye(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?k`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?k`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};F.styles=[U,co,Oi];F.dependencies={"sl-icon":Z};a([O('input[type="checkbox"]')],F.prototype,"input",2);a([P()],F.prototype,"hasFocus",2);a([h()],F.prototype,"title",2);a([h()],F.prototype,"name",2);a([h()],F.prototype,"value",2);a([h({reflect:!0})],F.prototype,"size",2);a([h({type:Boolean,reflect:!0})],F.prototype,"disabled",2);a([h({type:Boolean,reflect:!0})],F.prototype,"checked",2);a([h({type:Boolean,reflect:!0})],F.prototype,"indeterminate",2);a([Ae("checked")],F.prototype,"defaultChecked",2);a([h({reflect:!0})],F.prototype,"form",2);a([h({type:Boolean,reflect:!0})],F.prototype,"required",2);a([h({attribute:"help-text"})],F.prototype,"helpText",2);a([R("disabled",{waitUntilFirstUpdate:!0})],F.prototype,"handleDisabledChange",1);a([R(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],F.prototype,"handleStateChange",1);F.define("sl-checkbox");var Ri=D`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,v=class extends L{constructor(){super(...arguments),this.formControlController=new re(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Se(this,"help-text","label"),this.localize=new gt(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){const i=e??this.input.selectionStart,s=o??this.input.selectionEnd;this.input.setRangeText(t,i,s,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return k`
      <div
        part="form-control"
        class=${V({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${V({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${m(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${m(this.placeholder)}
              minlength=${m(this.minlength)}
              maxlength=${m(this.maxlength)}
              min=${m(this.min)}
              max=${m(this.max)}
              step=${m(this.step)}
              .value=${ye(this.value)}
              autocapitalize=${m(this.autocapitalize)}
              autocomplete=${m(this.autocomplete)}
              autocorrect=${m(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${m(this.pattern)}
              enterkeyhint=${m(this.enterkeyhint)}
              inputmode=${m(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${s?k`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?k`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?k`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:k`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};v.styles=[U,co,Ri];v.dependencies={"sl-icon":Z};a([O(".input__control")],v.prototype,"input",2);a([P()],v.prototype,"hasFocus",2);a([h()],v.prototype,"title",2);a([h({reflect:!0})],v.prototype,"type",2);a([h()],v.prototype,"name",2);a([h()],v.prototype,"value",2);a([Ae()],v.prototype,"defaultValue",2);a([h({reflect:!0})],v.prototype,"size",2);a([h({type:Boolean,reflect:!0})],v.prototype,"filled",2);a([h({type:Boolean,reflect:!0})],v.prototype,"pill",2);a([h()],v.prototype,"label",2);a([h({attribute:"help-text"})],v.prototype,"helpText",2);a([h({type:Boolean})],v.prototype,"clearable",2);a([h({type:Boolean,reflect:!0})],v.prototype,"disabled",2);a([h()],v.prototype,"placeholder",2);a([h({type:Boolean,reflect:!0})],v.prototype,"readonly",2);a([h({attribute:"password-toggle",type:Boolean})],v.prototype,"passwordToggle",2);a([h({attribute:"password-visible",type:Boolean})],v.prototype,"passwordVisible",2);a([h({attribute:"no-spin-buttons",type:Boolean})],v.prototype,"noSpinButtons",2);a([h({reflect:!0})],v.prototype,"form",2);a([h({type:Boolean,reflect:!0})],v.prototype,"required",2);a([h()],v.prototype,"pattern",2);a([h({type:Number})],v.prototype,"minlength",2);a([h({type:Number})],v.prototype,"maxlength",2);a([h()],v.prototype,"min",2);a([h()],v.prototype,"max",2);a([h()],v.prototype,"step",2);a([h()],v.prototype,"autocapitalize",2);a([h()],v.prototype,"autocorrect",2);a([h()],v.prototype,"autocomplete",2);a([h({type:Boolean})],v.prototype,"autofocus",2);a([h()],v.prototype,"enterkeyhint",2);a([h({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],v.prototype,"spellcheck",2);a([h()],v.prototype,"inputmode",2);a([R("disabled",{waitUntilFirstUpdate:!0})],v.prototype,"handleDisabledChange",1);a([R("step",{waitUntilFirstUpdate:!0})],v.prototype,"handleStepChange",1);a([R("value",{waitUntilFirstUpdate:!0})],v.prototype,"handleValueChange",1);v.define("sl-input");var Mi=D`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,E=class extends L{constructor(){super(...arguments),this.formControlController=new re(this),this.hasSlotController=new Se(this,"help-text","label"),this.localize=new gt(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`)}syncTooltip(t){if(this.output!==null){const e=this.input.offsetWidth,o=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=this.localize.dir()==="rtl",s=e*t;if(i){const n=`${e-s}px + ${t} * ${r}`;this.output.style.translate=`calc((${n} - ${o/2}px - ${r} / 2))`}else{const n=`${s}px - ${t} * ${r}`;this.output.style.translate=`calc(${n} - ${o/2}px + ${r} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t))}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}focus(t){this.input.focus(t)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e;return k`
      <div
        part="form-control"
        class=${V({"form-control":!0,"form-control--medium":!0,"form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${V({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${m(this.name)}
              ?disabled=${this.disabled}
              min=${m(this.min)}
              max=${m(this.max)}
              step=${m(this.step)}
              .value=${ye(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?k`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};E.styles=[U,co,Mi];a([O(".range__control")],E.prototype,"input",2);a([O(".range__tooltip")],E.prototype,"output",2);a([P()],E.prototype,"hasFocus",2);a([P()],E.prototype,"hasTooltip",2);a([h()],E.prototype,"title",2);a([h()],E.prototype,"name",2);a([h({type:Number})],E.prototype,"value",2);a([h()],E.prototype,"label",2);a([h({attribute:"help-text"})],E.prototype,"helpText",2);a([h({type:Boolean,reflect:!0})],E.prototype,"disabled",2);a([h({type:Number})],E.prototype,"min",2);a([h({type:Number})],E.prototype,"max",2);a([h({type:Number})],E.prototype,"step",2);a([h()],E.prototype,"tooltip",2);a([h({attribute:!1})],E.prototype,"tooltipFormatter",2);a([h({reflect:!0})],E.prototype,"form",2);a([Ae()],E.prototype,"defaultValue",2);a([so({passive:!0})],E.prototype,"handleThumbDragStart",1);a([R("value",{waitUntilFirstUpdate:!0})],E.prototype,"handleValueChange",1);a([R("disabled",{waitUntilFirstUpdate:!0})],E.prototype,"handleDisabledChange",1);a([R("hasTooltip",{waitUntilFirstUpdate:!0})],E.prototype,"syncRange",1);E.define("sl-range");var Pi=D`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,Li=D`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,q=class extends L{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?ve`a`:ve`button`;return be`
      <${e}
        part="base"
        class=${V({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${m(t?void 0:this.disabled)}
        type=${m(t?void 0:"button")}
        href=${m(t?this.href:void 0)}
        target=${m(t?this.target:void 0)}
        download=${m(t?this.download:void 0)}
        rel=${m(t&&this.target?"noreferrer noopener":void 0)}
        role=${m(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${m(this.name)}
          library=${m(this.library)}
          src=${m(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};q.styles=[U,Li];q.dependencies={"sl-icon":Z};a([O(".icon-button")],q.prototype,"button",2);a([P()],q.prototype,"hasFocus",2);a([h()],q.prototype,"name",2);a([h()],q.prototype,"library",2);a([h()],q.prototype,"src",2);a([h()],q.prototype,"href",2);a([h()],q.prototype,"target",2);a([h()],q.prototype,"download",2);a([h()],q.prototype,"label",2);a([h({type:Boolean,reflect:!0})],q.prototype,"disabled",2);var Vi=0,at=class extends L{constructor(){super(...arguments),this.localize=new gt(this),this.attrId=++Vi,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,k`
      <div
        part="base"
        class=${V({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?k`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};at.styles=[U,Pi];at.dependencies={"sl-icon-button":q};a([O(".tab")],at.prototype,"tab",2);a([h({reflect:!0})],at.prototype,"panel",2);a([h({type:Boolean,reflect:!0})],at.prototype,"active",2);a([h({type:Boolean,reflect:!0})],at.prototype,"closable",2);a([h({type:Boolean,reflect:!0})],at.prototype,"disabled",2);a([h({type:Number,reflect:!0})],at.prototype,"tabIndex",2);a([R("active")],at.prototype,"handleActiveChange",1);a([R("disabled")],at.prototype,"handleDisabledChange",1);at.define("sl-tab");var Bi=D`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,Di=D`
  :host {
    display: contents;
  }
`,Ee=class extends L{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const t=this.shadowRoot.querySelector("slot");if(t!==null){const e=t.assignedElements({flatten:!0});this.observedElements.forEach(o=>this.resizeObserver.unobserve(o)),this.observedElements=[],e.forEach(o=>{this.resizeObserver.observe(o),this.observedElements.push(o)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return k` <slot @slotchange=${this.handleSlotChange}></slot> `}};Ee.styles=[U,Di];a([h({type:Boolean,reflect:!0})],Ee.prototype,"disabled",2);a([R("disabled",{waitUntilFirstUpdate:!0})],Ee.prototype,"handleDisabledChange",1);function Fi(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function Mo(t,e,o="vertical",r="smooth"){const i=Fi(t,e),s=i.top+e.scrollTop,n=i.left+e.scrollLeft,l=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,u=e.scrollTop,d=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(n<l?e.scrollTo({left:n,behavior:r}):n+t.clientWidth>c&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:r})),(o==="vertical"||o==="both")&&(s<u?e.scrollTo({top:s,behavior:r}):s+t.clientHeight>d&&e.scrollTo({top:s-e.offsetHeight+t.clientHeight,behavior:r}))}var I=class extends L{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new gt(this),this.hasScrollControls=!1,this.shouldHideScrollStartButton=!1,this.shouldHideScrollEndButton=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1,this.fixedScrollControls=!1,this.scrollOffset=1}connectedCallback(){const t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{const o=e.filter(({target:r})=>{if(r===this)return!0;if(r.closest("sl-tab-group")!==this)return!1;const i=r.tagName.toLowerCase();return i==="sl-tab"||i==="sl-tab-panel"});if(o.length!==0){if(o.some(r=>!["aria-labelledby","aria-controls"].includes(r.attributeName))&&setTimeout(()=>this.setAriaLabels()),o.some(r=>r.attributeName==="disabled"))this.syncTabsAndPanels();else if(o.some(r=>r.attributeName==="active")){const i=o.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="sl-tab").map(s=>s.target).find(s=>s.active);i&&this.setActiveTab(i)}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,attributeFilter:["active","disabled","name","panel"],childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((o,r)=>{var i;o[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((i=this.getActiveTab())!=null?i:this.tabs[0],{emitEvents:!1}),r.unobserve(o[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){var t,e;super.disconnectedCallback(),(t=this.mutationObserver)==null||t.disconnect(),this.nav&&((e=this.resizeObserver)==null||e.unobserve(this.nav))}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const o=t.target.closest("sl-tab");o?.closest("sl-tab-group")===this&&o!==null&&this.setActiveTab(o,{scrollBehavior:"smooth"})}handleKeyDown(t){const o=t.target.closest("sl-tab");if(o?.closest("sl-tab-group")===this&&(["Enter"," "].includes(t.key)&&o!==null&&(this.setActiveTab(o,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const i=this.tabs.find(l=>l.matches(":focus")),s=this.localize.dir()==="rtl";let n=null;if(i?.tagName.toLowerCase()==="sl-tab"){if(t.key==="Home")n=this.focusableTabs[0];else if(t.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const l=this.tabs.findIndex(c=>c===i);n=this.findNextFocusableTab(l,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const l=this.tabs.findIndex(c=>c===i);n=this.findNextFocusableTab(l,"forward")}if(!n)return;n.tabIndex=0,n.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(l=>{l.tabIndex=l===n?0:-1}),["top","bottom"].includes(this.placement)&&Mo(n,this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=At({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const o=this.activeTab;this.activeTab=t,this.tabs.forEach(r=>{r.active=r===this.activeTab,r.tabIndex=r===this.activeTab?0:-1}),this.panels.forEach(r=>{var i;return r.active=r.name===((i=this.activeTab)==null?void 0:i.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Mo(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(o&&this.emit("sl-tab-hide",{detail:{name:o.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(o=>o.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,o=t.clientHeight,r=this.localize.dir()==="rtl",i=this.getAllTabs(),n=i.slice(0,i.indexOf(t)).reduce((l,c)=>({left:l.left+c.clientWidth,top:l.top+c.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=r?`${-1*n.left}px`:`${n.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${o}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(t,e){let o=null;const r=e==="forward"?1:-1;let i=t+r;for(;t<this.tabs.length;){if(o=this.tabs[i]||null,o===null){e==="forward"?o=this.focusableTabs[0]:o=this.focusableTabs[this.focusableTabs.length-1];break}if(!o.disabled)break;i+=r}return o}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd())}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons()}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){const e=this.tabs.find(o=>o.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){const t=this.localize.dir()==="rtl";return k`
      <div
        part="base"
        class=${V({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?k`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${V({"tab-group__scroll-button":!0,"tab-group__scroll-button--start":!0,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?k`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${V({"tab-group__scroll-button":!0,"tab-group__scroll-button--end":!0,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};I.styles=[U,Bi];I.dependencies={"sl-icon-button":q,"sl-resize-observer":Ee};a([O(".tab-group")],I.prototype,"tabGroup",2);a([O(".tab-group__body")],I.prototype,"body",2);a([O(".tab-group__nav")],I.prototype,"nav",2);a([O(".tab-group__indicator")],I.prototype,"indicator",2);a([P()],I.prototype,"hasScrollControls",2);a([P()],I.prototype,"shouldHideScrollStartButton",2);a([P()],I.prototype,"shouldHideScrollEndButton",2);a([h()],I.prototype,"placement",2);a([h()],I.prototype,"activation",2);a([h({attribute:"no-scroll-controls",type:Boolean})],I.prototype,"noScrollControls",2);a([h({attribute:"fixed-scroll-controls",type:Boolean})],I.prototype,"fixedScrollControls",2);a([so({passive:!0})],I.prototype,"updateScrollButtons",1);a([R("noScrollControls",{waitUntilFirstUpdate:!0})],I.prototype,"updateScrollControls",1);a([R("placement",{waitUntilFirstUpdate:!0})],I.prototype,"syncIndicator",1);I.define("sl-tab-group");var Hi=(t,e)=>{let o=0;return function(...r){window.clearTimeout(o),o=window.setTimeout(()=>{t.call(this,...r)},e)}},Po=(t,e,o)=>{const r=t[e];t[e]=function(...i){r.call(this,...i),o.call(this,r,...i)}};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){const e=new Set,o=new WeakMap,r=s=>{for(const n of s.changedTouches)e.add(n.identifier)},i=s=>{for(const n of s.changedTouches)e.delete(n.identifier)};document.addEventListener("touchstart",r,!0),document.addEventListener("touchend",i,!0),document.addEventListener("touchcancel",i,!0),Po(EventTarget.prototype,"addEventListener",function(s,n){if(n!=="scrollend")return;const l=Hi(()=>{e.size?l():this.dispatchEvent(new Event("scrollend"))},100);s.call(this,"scroll",l,{passive:!0}),o.set(this,l)}),Po(EventTarget.prototype,"removeEventListener",function(s,n){if(n!=="scrollend")return;const l=o.get(this);l&&s.call(this,"scroll",l,{passive:!0})})}})();var Ii=D`
  :host {
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
`,Ni=0,ie=class extends L{constructor(){super(...arguments),this.attrId=++Ni,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return k`
      <slot
        part="base"
        class=${V({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};ie.styles=[U,Ii];a([h({reflect:!0})],ie.prototype,"name",2);a([h({type:Boolean,reflect:!0})],ie.prototype,"active",2);a([R("active")],ie.prototype,"handleActiveChange",1);ie.define("sl-tab-panel");var Ui=D`
  :host(:not(:focus-within)) {
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
`,pr=class extends L{render(){return k` <slot></slot> `}};pr.styles=[U,Ui];function De(t,e){function o(i){const s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,l=s.left+n.scrollX,c=s.top+n.scrollY,u=i.pageX-l,d=i.pageY-c;e?.onMove&&e.onMove(u,d)}function r(){document.removeEventListener("pointermove",o),document.removeEventListener("pointerup",r),e?.onStop&&e.onStop()}document.addEventListener("pointermove",o,{passive:!0}),document.addEventListener("pointerup",r),e?.initialEvent instanceof PointerEvent&&o(e.initialEvent)}var Wi=D`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;function*fr(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*ui(fr(t.shadowRoot.activeElement))))}function ji(){return[...fr()].pop()}var Lo=new WeakMap;function br(t){let e=Lo.get(t);return e||(e=window.getComputedStyle(t,null),Lo.set(t,e)),e}function qi(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=br(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ki(t){const e=br(t),{overflowY:o,overflowX:r}=e;return o==="scroll"||r==="scroll"?!0:o!=="auto"||r!=="auto"?!1:t.scrollHeight>t.clientHeight&&o==="auto"||t.scrollWidth>t.clientWidth&&r==="auto"}function Gi(t){const e=t.tagName.toLowerCase(),o=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(o)||o<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return!1;if(e==="input"&&t.getAttribute("type")==="radio"){const s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,l=s.querySelector(`${n}:checked`);return l?l===t:s.querySelector(n)===t}return qi(t)?(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Ki(t):!1}function Yi(t){var e,o;const r=Zi(t),i=(e=r[0])!=null?e:null,s=(o=r[r.length-1])!=null?o:null;return{start:i,end:s}}function Xi(t,e){var o;return((o=t.getRootNode({composed:!0}))==null?void 0:o.host)!==e}function Zi(t){const e=new WeakMap,o=[];function r(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||e.has(i))return;e.set(i,!0),!o.includes(i)&&Gi(i)&&o.push(i),i instanceof HTMLSlotElement&&Xi(i,t)&&i.assignedElements({flatten:!0}).forEach(s=>{r(s)}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&r(i.shadowRoot)}for(const s of i.children)r(s)}return r(t),o.sort((i,s)=>{const n=Number(i.getAttribute("tabindex"))||0;return(Number(s.getAttribute("tabindex"))||0)-n})}var Ji=D`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

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
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
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
`;const $t=Math.min,Y=Math.max,we=Math.round,ce=Math.floor,ht=t=>({x:t,y:t}),Qi={left:"right",right:"left",bottom:"top",top:"bottom"},ts={start:"end",end:"start"};function qe(t,e,o){return Y(t,$t(e,o))}function It(t,e){return typeof t=="function"?t(e):t}function Ct(t){return t.split("-")[0]}function Nt(t){return t.split("-")[1]}function gr(t){return t==="x"?"y":"x"}function ho(t){return t==="y"?"height":"width"}const es=new Set(["top","bottom"]);function bt(t){return es.has(Ct(t))?"y":"x"}function uo(t){return gr(bt(t))}function os(t,e,o){o===void 0&&(o=!1);const r=Nt(t),i=uo(t),s=ho(i);let n=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(n=_e(n)),[n,_e(n)]}function rs(t){const e=_e(t);return[Ke(t),e,Ke(e)]}function Ke(t){return t.replace(/start|end/g,e=>ts[e])}const Vo=["left","right"],Bo=["right","left"],is=["top","bottom"],ss=["bottom","top"];function ns(t,e,o){switch(t){case"top":case"bottom":return o?e?Bo:Vo:e?Vo:Bo;case"left":case"right":return e?is:ss;default:return[]}}function as(t,e,o,r){const i=Nt(t);let s=ns(Ct(t),o==="start",r);return i&&(s=s.map(n=>n+"-"+i),e&&(s=s.concat(s.map(Ke)))),s}function _e(t){return t.replace(/left|right|bottom|top/g,e=>Qi[e])}function ls(t){return{top:0,right:0,bottom:0,left:0,...t}}function mr(t){return typeof t!="number"?ls(t):{top:t,right:t,bottom:t,left:t}}function xe(t){const{x:e,y:o,width:r,height:i}=t;return{width:r,height:i,top:o,left:e,right:e+r,bottom:o+i,x:e,y:o}}function Do(t,e,o){let{reference:r,floating:i}=t;const s=bt(e),n=uo(e),l=ho(n),c=Ct(e),u=s==="y",d=r.x+r.width/2-i.width/2,p=r.y+r.height/2-i.height/2,b=r[l]/2-i[l]/2;let f;switch(c){case"top":f={x:d,y:r.y-i.height};break;case"bottom":f={x:d,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:p};break;case"left":f={x:r.x-i.width,y:p};break;default:f={x:r.x,y:r.y}}switch(Nt(e)){case"start":f[n]-=b*(o&&u?-1:1);break;case"end":f[n]+=b*(o&&u?-1:1);break}return f}const cs=async(t,e,o)=>{const{placement:r="bottom",strategy:i="absolute",middleware:s=[],platform:n}=o,l=s.filter(Boolean),c=await(n.isRTL==null?void 0:n.isRTL(e));let u=await n.getElementRects({reference:t,floating:e,strategy:i}),{x:d,y:p}=Do(u,r,c),b=r,f={},g=0;for(let y=0;y<l.length;y++){const{name:x,fn:w}=l[y],{x:$,y:S,data:B,reset:T}=await w({x:d,y:p,initialPlacement:r,placement:b,strategy:i,middlewareData:f,rects:u,platform:n,elements:{reference:t,floating:e}});d=$??d,p=S??p,f={...f,[x]:{...f[x],...B}},T&&g<=50&&(g++,typeof T=="object"&&(T.placement&&(b=T.placement),T.rects&&(u=T.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:i}):T.rects),{x:d,y:p}=Do(u,b,c)),y=-1)}return{x:d,y:p,placement:b,strategy:i,middlewareData:f}};async function po(t,e){var o;e===void 0&&(e={});const{x:r,y:i,platform:s,rects:n,elements:l,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:b=!1,padding:f=0}=It(e,t),g=mr(f),x=l[b?p==="floating"?"reference":"floating":p],w=xe(await s.getClippingRect({element:(o=await(s.isElement==null?void 0:s.isElement(x)))==null||o?x:x.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(l.floating)),boundary:u,rootBoundary:d,strategy:c})),$=p==="floating"?{x:r,y:i,width:n.floating.width,height:n.floating.height}:n.reference,S=await(s.getOffsetParent==null?void 0:s.getOffsetParent(l.floating)),B=await(s.isElement==null?void 0:s.isElement(S))?await(s.getScale==null?void 0:s.getScale(S))||{x:1,y:1}:{x:1,y:1},T=xe(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:$,offsetParent:S,strategy:c}):$);return{top:(w.top-T.top+g.top)/B.y,bottom:(T.bottom-w.bottom+g.bottom)/B.y,left:(w.left-T.left+g.left)/B.x,right:(T.right-w.right+g.right)/B.x}}const hs=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:r,placement:i,rects:s,platform:n,elements:l,middlewareData:c}=e,{element:u,padding:d=0}=It(t,e)||{};if(u==null)return{};const p=mr(d),b={x:o,y:r},f=uo(i),g=ho(f),y=await n.getDimensions(u),x=f==="y",w=x?"top":"left",$=x?"bottom":"right",S=x?"clientHeight":"clientWidth",B=s.reference[g]+s.reference[f]-b[f]-s.floating[g],T=b[f]-s.reference[f],ot=await(n.getOffsetParent==null?void 0:n.getOffsetParent(u));let N=ot?ot[S]:0;(!N||!await(n.isElement==null?void 0:n.isElement(ot)))&&(N=l.floating[S]||s.floating[g]);const pt=B/2-T/2,lt=N/2-y[g]/2-1,J=$t(p[w],lt),mt=$t(p[$],lt),ct=J,vt=N-y[g]-mt,j=N/2-y[g]/2+pt,Et=qe(ct,j,vt),ft=!c.arrow&&Nt(i)!=null&&j!==Et&&s.reference[g]/2-(j<ct?J:mt)-y[g]/2<0,rt=ft?j<ct?j-ct:j-vt:0;return{[f]:b[f]+rt,data:{[f]:Et,centerOffset:j-Et-rt,...ft&&{alignmentOffset:rt}},reset:ft}}}),us=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;const{placement:i,middlewareData:s,rects:n,initialPlacement:l,platform:c,elements:u}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:b,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:y=!0,...x}=It(t,e);if((o=s.arrow)!=null&&o.alignmentOffset)return{};const w=Ct(i),$=bt(l),S=Ct(l)===l,B=await(c.isRTL==null?void 0:c.isRTL(u.floating)),T=b||(S||!y?[_e(l)]:rs(l)),ot=g!=="none";!b&&ot&&T.push(...as(l,y,g,B));const N=[l,...T],pt=await po(e,x),lt=[];let J=((r=s.flip)==null?void 0:r.overflows)||[];if(d&&lt.push(pt[w]),p){const j=os(i,n,B);lt.push(pt[j[0]],pt[j[1]])}if(J=[...J,{placement:i,overflows:lt}],!lt.every(j=>j<=0)){var mt,ct;const j=(((mt=s.flip)==null?void 0:mt.index)||0)+1,Et=N[j];if(Et&&(!(p==="alignment"?$!==bt(Et):!1)||J.every(it=>it.overflows[0]>0&&bt(it.placement)===$)))return{data:{index:j,overflows:J},reset:{placement:Et}};let ft=(ct=J.filter(rt=>rt.overflows[0]<=0).sort((rt,it)=>rt.overflows[1]-it.overflows[1])[0])==null?void 0:ct.placement;if(!ft)switch(f){case"bestFit":{var vt;const rt=(vt=J.filter(it=>{if(ot){const yt=bt(it.placement);return yt===$||yt==="y"}return!0}).map(it=>[it.placement,it.overflows.filter(yt=>yt>0).reduce((yt,zr)=>yt+zr,0)]).sort((it,yt)=>it[1]-yt[1])[0])==null?void 0:vt[0];rt&&(ft=rt);break}case"initialPlacement":ft=l;break}if(i!==ft)return{reset:{placement:ft}}}return{}}}},ds=new Set(["left","top"]);async function ps(t,e){const{placement:o,platform:r,elements:i}=t,s=await(r.isRTL==null?void 0:r.isRTL(i.floating)),n=Ct(o),l=Nt(o),c=bt(o)==="y",u=ds.has(n)?-1:1,d=s&&c?-1:1,p=It(e,t);let{mainAxis:b,crossAxis:f,alignmentAxis:g}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&typeof g=="number"&&(f=l==="end"?g*-1:g),c?{x:f*d,y:b*u}:{x:b*u,y:f*d}}const fs=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;const{x:i,y:s,placement:n,middlewareData:l}=e,c=await ps(e,t);return n===((o=l.offset)==null?void 0:o.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:i+c.x,y:s+c.y,data:{...c,placement:n}}}}},bs=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:r,placement:i}=e,{mainAxis:s=!0,crossAxis:n=!1,limiter:l={fn:x=>{let{x:w,y:$}=x;return{x:w,y:$}}},...c}=It(t,e),u={x:o,y:r},d=await po(e,c),p=bt(Ct(i)),b=gr(p);let f=u[b],g=u[p];if(s){const x=b==="y"?"top":"left",w=b==="y"?"bottom":"right",$=f+d[x],S=f-d[w];f=qe($,f,S)}if(n){const x=p==="y"?"top":"left",w=p==="y"?"bottom":"right",$=g+d[x],S=g-d[w];g=qe($,g,S)}const y=l.fn({...e,[b]:f,[p]:g});return{...y,data:{x:y.x-o,y:y.y-r,enabled:{[b]:s,[p]:n}}}}}},gs=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var o,r;const{placement:i,rects:s,platform:n,elements:l}=e,{apply:c=()=>{},...u}=It(t,e),d=await po(e,u),p=Ct(i),b=Nt(i),f=bt(i)==="y",{width:g,height:y}=s.floating;let x,w;p==="top"||p==="bottom"?(x=p,w=b===(await(n.isRTL==null?void 0:n.isRTL(l.floating))?"start":"end")?"left":"right"):(w=p,x=b==="end"?"top":"bottom");const $=y-d.top-d.bottom,S=g-d.left-d.right,B=$t(y-d[x],$),T=$t(g-d[w],S),ot=!e.middlewareData.shift;let N=B,pt=T;if((o=e.middlewareData.shift)!=null&&o.enabled.x&&(pt=S),(r=e.middlewareData.shift)!=null&&r.enabled.y&&(N=$),ot&&!b){const J=Y(d.left,0),mt=Y(d.right,0),ct=Y(d.top,0),vt=Y(d.bottom,0);f?pt=g-2*(J!==0||mt!==0?J+mt:Y(d.left,d.right)):N=y-2*(ct!==0||vt!==0?ct+vt:Y(d.top,d.bottom))}await c({...e,availableWidth:pt,availableHeight:N});const lt=await n.getDimensions(l.floating);return g!==lt.width||y!==lt.height?{reset:{rects:!0}}:{}}}};function Te(){return typeof window<"u"}function Ut(t){return vr(t)?(t.nodeName||"").toLowerCase():"#document"}function X(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function dt(t){var e;return(e=(vr(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function vr(t){return Te()?t instanceof Node||t instanceof X(t).Node:!1}function st(t){return Te()?t instanceof Element||t instanceof X(t).Element:!1}function ut(t){return Te()?t instanceof HTMLElement||t instanceof X(t).HTMLElement:!1}function Fo(t){return!Te()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof X(t).ShadowRoot}const ms=new Set(["inline","contents"]);function se(t){const{overflow:e,overflowX:o,overflowY:r,display:i}=nt(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!ms.has(i)}const vs=new Set(["table","td","th"]);function ys(t){return vs.has(Ut(t))}const ws=[":popover-open",":modal"];function ze(t){return ws.some(e=>{try{return t.matches(e)}catch{return!1}})}const _s=["transform","translate","scale","rotate","perspective"],xs=["transform","translate","scale","rotate","perspective","filter"],ks=["paint","layout","strict","content"];function Oe(t){const e=fo(),o=st(t)?nt(t):t;return _s.some(r=>o[r]?o[r]!=="none":!1)||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||xs.some(r=>(o.willChange||"").includes(r))||ks.some(r=>(o.contain||"").includes(r))}function $s(t){let e=St(t);for(;ut(e)&&!Ht(e);){if(Oe(e))return e;if(ze(e))return null;e=St(e)}return null}function fo(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Cs=new Set(["html","body","#document"]);function Ht(t){return Cs.has(Ut(t))}function nt(t){return X(t).getComputedStyle(t)}function Re(t){return st(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function St(t){if(Ut(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Fo(t)&&t.host||dt(t);return Fo(e)?e.host:e}function yr(t){const e=St(t);return Ht(e)?t.ownerDocument?t.ownerDocument.body:t.body:ut(e)&&se(e)?e:yr(e)}function ee(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);const i=yr(t),s=i===((r=t.ownerDocument)==null?void 0:r.body),n=X(i);if(s){const l=Ge(n);return e.concat(n,n.visualViewport||[],se(i)?i:[],l&&o?ee(l):[])}return e.concat(i,ee(i,[],o))}function Ge(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function wr(t){const e=nt(t);let o=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const i=ut(t),s=i?t.offsetWidth:o,n=i?t.offsetHeight:r,l=we(o)!==s||we(r)!==n;return l&&(o=s,r=n),{width:o,height:r,$:l}}function bo(t){return st(t)?t:t.contextElement}function Bt(t){const e=bo(t);if(!ut(e))return ht(1);const o=e.getBoundingClientRect(),{width:r,height:i,$:s}=wr(e);let n=(s?we(o.width):o.width)/r,l=(s?we(o.height):o.height)/i;return(!n||!Number.isFinite(n))&&(n=1),(!l||!Number.isFinite(l))&&(l=1),{x:n,y:l}}const Ss=ht(0);function _r(t){const e=X(t);return!fo()||!e.visualViewport?Ss:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function As(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==X(t)?!1:e}function Pt(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),s=bo(t);let n=ht(1);e&&(r?st(r)&&(n=Bt(r)):n=Bt(t));const l=As(s,o,r)?_r(s):ht(0);let c=(i.left+l.x)/n.x,u=(i.top+l.y)/n.y,d=i.width/n.x,p=i.height/n.y;if(s){const b=X(s),f=r&&st(r)?X(r):r;let g=b,y=Ge(g);for(;y&&r&&f!==g;){const x=Bt(y),w=y.getBoundingClientRect(),$=nt(y),S=w.left+(y.clientLeft+parseFloat($.paddingLeft))*x.x,B=w.top+(y.clientTop+parseFloat($.paddingTop))*x.y;c*=x.x,u*=x.y,d*=x.x,p*=x.y,c+=S,u+=B,g=X(y),y=Ge(g)}}return xe({width:d,height:p,x:c,y:u})}function go(t,e){const o=Re(t).scrollLeft;return e?e.left+o:Pt(dt(t)).left+o}function xr(t,e,o){o===void 0&&(o=!1);const r=t.getBoundingClientRect(),i=r.left+e.scrollLeft-(o?0:go(t,r)),s=r.top+e.scrollTop;return{x:i,y:s}}function Es(t){let{elements:e,rect:o,offsetParent:r,strategy:i}=t;const s=i==="fixed",n=dt(r),l=e?ze(e.floating):!1;if(r===n||l&&s)return o;let c={scrollLeft:0,scrollTop:0},u=ht(1);const d=ht(0),p=ut(r);if((p||!p&&!s)&&((Ut(r)!=="body"||se(n))&&(c=Re(r)),ut(r))){const f=Pt(r);u=Bt(r),d.x=f.x+r.clientLeft,d.y=f.y+r.clientTop}const b=n&&!p&&!s?xr(n,c,!0):ht(0);return{width:o.width*u.x,height:o.height*u.y,x:o.x*u.x-c.scrollLeft*u.x+d.x+b.x,y:o.y*u.y-c.scrollTop*u.y+d.y+b.y}}function Ts(t){return Array.from(t.getClientRects())}function zs(t){const e=dt(t),o=Re(t),r=t.ownerDocument.body,i=Y(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),s=Y(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let n=-o.scrollLeft+go(t);const l=-o.scrollTop;return nt(r).direction==="rtl"&&(n+=Y(e.clientWidth,r.clientWidth)-i),{width:i,height:s,x:n,y:l}}function Os(t,e){const o=X(t),r=dt(t),i=o.visualViewport;let s=r.clientWidth,n=r.clientHeight,l=0,c=0;if(i){s=i.width,n=i.height;const u=fo();(!u||u&&e==="fixed")&&(l=i.offsetLeft,c=i.offsetTop)}return{width:s,height:n,x:l,y:c}}const Rs=new Set(["absolute","fixed"]);function Ms(t,e){const o=Pt(t,!0,e==="fixed"),r=o.top+t.clientTop,i=o.left+t.clientLeft,s=ut(t)?Bt(t):ht(1),n=t.clientWidth*s.x,l=t.clientHeight*s.y,c=i*s.x,u=r*s.y;return{width:n,height:l,x:c,y:u}}function Ho(t,e,o){let r;if(e==="viewport")r=Os(t,o);else if(e==="document")r=zs(dt(t));else if(st(e))r=Ms(e,o);else{const i=_r(t);r={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return xe(r)}function kr(t,e){const o=St(t);return o===e||!st(o)||Ht(o)?!1:nt(o).position==="fixed"||kr(o,e)}function Ps(t,e){const o=e.get(t);if(o)return o;let r=ee(t,[],!1).filter(l=>st(l)&&Ut(l)!=="body"),i=null;const s=nt(t).position==="fixed";let n=s?St(t):t;for(;st(n)&&!Ht(n);){const l=nt(n),c=Oe(n);!c&&l.position==="fixed"&&(i=null),(s?!c&&!i:!c&&l.position==="static"&&!!i&&Rs.has(i.position)||se(n)&&!c&&kr(t,n))?r=r.filter(d=>d!==n):i=l,n=St(n)}return e.set(t,r),r}function Ls(t){let{element:e,boundary:o,rootBoundary:r,strategy:i}=t;const n=[...o==="clippingAncestors"?ze(e)?[]:Ps(e,this._c):[].concat(o),r],l=n[0],c=n.reduce((u,d)=>{const p=Ho(e,d,i);return u.top=Y(p.top,u.top),u.right=$t(p.right,u.right),u.bottom=$t(p.bottom,u.bottom),u.left=Y(p.left,u.left),u},Ho(e,l,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Vs(t){const{width:e,height:o}=wr(t);return{width:e,height:o}}function Bs(t,e,o){const r=ut(e),i=dt(e),s=o==="fixed",n=Pt(t,!0,s,e);let l={scrollLeft:0,scrollTop:0};const c=ht(0);function u(){c.x=go(i)}if(r||!r&&!s)if((Ut(e)!=="body"||se(i))&&(l=Re(e)),r){const f=Pt(e,!0,s,e);c.x=f.x+e.clientLeft,c.y=f.y+e.clientTop}else i&&u();s&&!r&&i&&u();const d=i&&!r&&!s?xr(i,l):ht(0),p=n.left+l.scrollLeft-c.x-d.x,b=n.top+l.scrollTop-c.y-d.y;return{x:p,y:b,width:n.width,height:n.height}}function Fe(t){return nt(t).position==="static"}function Io(t,e){if(!ut(t)||nt(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return dt(t)===o&&(o=o.ownerDocument.body),o}function $r(t,e){const o=X(t);if(ze(t))return o;if(!ut(t)){let i=St(t);for(;i&&!Ht(i);){if(st(i)&&!Fe(i))return i;i=St(i)}return o}let r=Io(t,e);for(;r&&ys(r)&&Fe(r);)r=Io(r,e);return r&&Ht(r)&&Fe(r)&&!Oe(r)?o:r||$s(t)||o}const Ds=async function(t){const e=this.getOffsetParent||$r,o=this.getDimensions,r=await o(t.floating);return{reference:Bs(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Fs(t){return nt(t).direction==="rtl"}const ge={convertOffsetParentRelativeRectToViewportRelativeRect:Es,getDocumentElement:dt,getClippingRect:Ls,getOffsetParent:$r,getElementRects:Ds,getClientRects:Ts,getDimensions:Vs,getScale:Bt,isElement:st,isRTL:Fs};function Cr(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Hs(t,e){let o=null,r;const i=dt(t);function s(){var l;clearTimeout(r),(l=o)==null||l.disconnect(),o=null}function n(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),s();const u=t.getBoundingClientRect(),{left:d,top:p,width:b,height:f}=u;if(l||e(),!b||!f)return;const g=ce(p),y=ce(i.clientWidth-(d+b)),x=ce(i.clientHeight-(p+f)),w=ce(d),S={rootMargin:-g+"px "+-y+"px "+-x+"px "+-w+"px",threshold:Y(0,$t(1,c))||1};let B=!0;function T(ot){const N=ot[0].intersectionRatio;if(N!==c){if(!B)return n();N?n(!1,N):r=setTimeout(()=>{n(!1,1e-7)},1e3)}N===1&&!Cr(u,t.getBoundingClientRect())&&n(),B=!1}try{o=new IntersectionObserver(T,{...S,root:i.ownerDocument})}catch{o=new IntersectionObserver(T,S)}o.observe(t)}return n(!0),s}function Is(t,e,o,r){r===void 0&&(r={});const{ancestorScroll:i=!0,ancestorResize:s=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,u=bo(t),d=i||s?[...u?ee(u):[],...ee(e)]:[];d.forEach(w=>{i&&w.addEventListener("scroll",o,{passive:!0}),s&&w.addEventListener("resize",o)});const p=u&&l?Hs(u,o):null;let b=-1,f=null;n&&(f=new ResizeObserver(w=>{let[$]=w;$&&$.target===u&&f&&(f.unobserve(e),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var S;(S=f)==null||S.observe(e)})),o()}),u&&!c&&f.observe(u),f.observe(e));let g,y=c?Pt(t):null;c&&x();function x(){const w=Pt(t);y&&!Cr(y,w)&&o(),y=w,g=requestAnimationFrame(x)}return o(),()=>{var w;d.forEach($=>{i&&$.removeEventListener("scroll",o),s&&$.removeEventListener("resize",o)}),p?.(),(w=f)==null||w.disconnect(),f=null,c&&cancelAnimationFrame(g)}}const Ns=fs,Us=bs,Ws=us,No=gs,js=hs,qs=(t,e,o)=>{const r=new Map,i={platform:ge,...o},s={...i.platform,_c:r};return cs(t,e,{...i,platform:s})};function Ks(t){return Gs(t)}function He(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Gs(t){for(let e=t;e;e=He(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=He(t);e;e=He(e)){if(!(e instanceof Element))continue;const o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||Oe(o)||e.tagName==="BODY"))return e}return null}function Ys(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:!0)}var A=class extends L{constructor(){super(...arguments),this.localize=new gt(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom");let r=0,i=0,s=0,n=0,l=0,c=0,u=0,d=0;o?t.top<e.top?(r=t.left,i=t.bottom,s=t.right,n=t.bottom,l=e.left,c=e.top,u=e.right,d=e.top):(r=e.left,i=e.bottom,s=e.right,n=e.bottom,l=t.left,c=t.top,u=t.right,d=t.top):t.left<e.left?(r=t.right,i=t.top,s=e.left,n=e.top,l=t.right,c=t.bottom,u=e.left,d=e.bottom):(r=e.right,i=e.top,s=t.left,n=t.top,l=e.right,c=e.bottom,u=t.left,d=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${d}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Ys(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=Is(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Ns({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(No({apply:({rects:o})=>{const r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=i?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Ws({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Us({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(No({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(js({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?o=>ge.getOffsetParent(o,Ks):ge.getOffsetParent;qs(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Ce(At({},ge),{getOffsetParent:e})}).then(({x:o,y:r,middlewareData:i,placement:s})=>{const n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){const c=i.arrow.x,u=i.arrow.y;let d="",p="",b="",f="";if(this.arrowPlacement==="start"){const g=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?g:"",f=n?"":g}else if(this.arrowPlacement==="end"){const g=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":g,f=n?g:"",b=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(f=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":"",d=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(f=typeof c=="number"?`${c}px`:"",d=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:d,right:p,bottom:b,left:f,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return k`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${V({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${V({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?k`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};A.styles=[U,Ji];a([O(".popup")],A.prototype,"popup",2);a([O(".popup__arrow")],A.prototype,"arrowEl",2);a([h()],A.prototype,"anchor",2);a([h({type:Boolean,reflect:!0})],A.prototype,"active",2);a([h({reflect:!0})],A.prototype,"placement",2);a([h({reflect:!0})],A.prototype,"strategy",2);a([h({type:Number})],A.prototype,"distance",2);a([h({type:Number})],A.prototype,"skidding",2);a([h({type:Boolean})],A.prototype,"arrow",2);a([h({attribute:"arrow-placement"})],A.prototype,"arrowPlacement",2);a([h({attribute:"arrow-padding",type:Number})],A.prototype,"arrowPadding",2);a([h({type:Boolean})],A.prototype,"flip",2);a([h({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],A.prototype,"flipFallbackPlacements",2);a([h({attribute:"flip-fallback-strategy"})],A.prototype,"flipFallbackStrategy",2);a([h({type:Object})],A.prototype,"flipBoundary",2);a([h({attribute:"flip-padding",type:Number})],A.prototype,"flipPadding",2);a([h({type:Boolean})],A.prototype,"shift",2);a([h({type:Object})],A.prototype,"shiftBoundary",2);a([h({attribute:"shift-padding",type:Number})],A.prototype,"shiftPadding",2);a([h({attribute:"auto-size"})],A.prototype,"autoSize",2);a([h()],A.prototype,"sync",2);a([h({type:Object})],A.prototype,"autoSizeBoundary",2);a([h({attribute:"auto-size-padding",type:Number})],A.prototype,"autoSizePadding",2);a([h({attribute:"hover-bridge",type:Boolean})],A.prototype,"hoverBridge",2);var Sr=new Map,Xs=new WeakMap;function Zs(t){return t??{keyframes:[],options:{duration:0}}}function Uo(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Ar(t,e){Sr.set(t,Zs(e))}function Wo(t,e,o){const r=Xs.get(t);if(r?.[e])return Uo(r[e],o.dir);const i=Sr.get(e);return i?Uo(i,o.dir):{keyframes:[],options:{duration:0}}}function jo(t,e){return new Promise(o=>{function r(i){i.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}function qo(t,e,o){return new Promise(r=>{if(o?.duration===1/0)throw new Error("Promise-based animations must be finite.");const i=t.animate(e,Ce(At({},o),{duration:Js()?0:o.duration}));i.addEventListener("cancel",r,{once:!0}),i.addEventListener("finish",r,{once:!0})})}function Js(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ko(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{e.cancel(),requestAnimationFrame(o)})))}var W=class extends L{constructor(){super(...arguments),this.localize=new gt(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}const o=(r,i)=>{if(!r)return null;const s=r.closest(i);if(s)return s;const n=r.getRootNode();return n instanceof ShadowRoot?o(n.host,i):null};setTimeout(()=>{var r;const i=((r=this.containingElement)==null?void 0:r.getRootNode())instanceof ShadowRoot?ji():document.activeElement;(!this.containingElement||o(i,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{const e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:!0})[0];typeof t?.focus=="function"&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}const e=this.getMenu();if(e){const o=e.getAllItems(),r=o[0],i=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),o.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(i),i.focus())}))}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const e=this.trigger.assignedElements({flatten:!0}).find(r=>Yi(r).start);let o;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":o=e.button;break;default:o=e}o.setAttribute("aria-haspopup","true"),o.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,jo(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,jo(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Ko(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=Wo(this,"dropdown.show",{dir:this.localize.dir()});await qo(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Ko(this);const{keyframes:t,options:e}=Wo(this,"dropdown.hide",{dir:this.localize.dir()});await qo(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return k`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${m(this.sync?this.sync:void 0)}
        class=${V({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};W.styles=[U,Wi];W.dependencies={"sl-popup":A};a([O(".dropdown")],W.prototype,"popup",2);a([O(".dropdown__trigger")],W.prototype,"trigger",2);a([O(".dropdown__panel")],W.prototype,"panel",2);a([h({type:Boolean,reflect:!0})],W.prototype,"open",2);a([h({reflect:!0})],W.prototype,"placement",2);a([h({type:Boolean,reflect:!0})],W.prototype,"disabled",2);a([h({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],W.prototype,"stayOpenOnSelect",2);a([h({attribute:!1})],W.prototype,"containingElement",2);a([h({type:Number})],W.prototype,"distance",2);a([h({type:Number})],W.prototype,"skidding",2);a([h({type:Boolean})],W.prototype,"hoist",2);a([h({reflect:!0})],W.prototype,"sync",2);a([R("open",{waitUntilFirstUpdate:!0})],W.prototype,"handleOpenChange",1);Ar("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Ar("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Qs=D`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
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

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;function Q(t,e,o){const r=i=>Object.is(i,-0)?0:i;return t<e?r(e):t>o?r(o):r(t)}var tn=D`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,ne=class extends L{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=Yt(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){const e=Yt(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){const e=Yt(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){const e=Yt(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{const o=t.indexOf(e),r=Yt(e);r&&(r.toggleAttribute("data-sl-button-group__button",!0),r.toggleAttribute("data-sl-button-group__button--first",o===0),r.toggleAttribute("data-sl-button-group__button--inner",o>0&&o<t.length-1),r.toggleAttribute("data-sl-button-group__button--last",o===t.length-1),r.toggleAttribute("data-sl-button-group__button--radio",r.tagName.toLowerCase()==="sl-radio-button"))})}render(){return k`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};ne.styles=[U,tn];a([O("slot")],ne.prototype,"defaultSlot",2);a([P()],ne.prototype,"disableRole",2);a([h()],ne.prototype,"label",2);function Yt(t){var e;const o="sl-button, sl-radio-button";return(e=t.closest(o))!=null?e:t.querySelector(o)}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Er="important",en=" !"+Er,wt=ao(class extends lo{constructor(t){if(super(t),t.type!==_t.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(const r in e){const i=e[r];if(i!=null){this.ft.add(r);const s=typeof i=="string"&&i.endsWith(en);r.includes("-")||s?o.setProperty(r,s?i.slice(0,-11):i,s?Er:""):o[r]=i}}return et}});function H(t,e){on(t)&&(t="100%");const o=rn(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),o&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function he(t){return Math.min(1,Math.max(0,t))}function on(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function rn(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Tr(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function ue(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Rt(t){return t.length===1?"0"+t:String(t)}function sn(t,e,o){return{r:H(t,255)*255,g:H(e,255)*255,b:H(o,255)*255}}function Go(t,e,o){t=H(t,255),e=H(e,255),o=H(o,255);const r=Math.max(t,e,o),i=Math.min(t,e,o);let s=0,n=0;const l=(r+i)/2;if(r===i)n=0,s=0;else{const c=r-i;switch(n=l>.5?c/(2-r-i):c/(r+i),r){case t:s=(e-o)/c+(e<o?6:0);break;case e:s=(o-t)/c+2;break;case o:s=(t-e)/c+4;break}s/=6}return{h:s,s:n,l}}function Ie(t,e,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+(e-t)*(6*o):o<1/2?e:o<2/3?t+(e-t)*(2/3-o)*6:t}function nn(t,e,o){let r,i,s;if(t=H(t,360),e=H(e,100),o=H(o,100),e===0)i=o,s=o,r=o;else{const n=o<.5?o*(1+e):o+e-o*e,l=2*o-n;r=Ie(l,n,t+1/3),i=Ie(l,n,t),s=Ie(l,n,t-1/3)}return{r:r*255,g:i*255,b:s*255}}function Yo(t,e,o){t=H(t,255),e=H(e,255),o=H(o,255);const r=Math.max(t,e,o),i=Math.min(t,e,o);let s=0;const n=r,l=r-i,c=r===0?0:l/r;if(r===i)s=0;else{switch(r){case t:s=(e-o)/l+(e<o?6:0);break;case e:s=(o-t)/l+2;break;case o:s=(t-e)/l+4;break}s/=6}return{h:s,s:c,v:n}}function an(t,e,o){t=H(t,360)*6,e=H(e,100),o=H(o,100);const r=Math.floor(t),i=t-r,s=o*(1-e),n=o*(1-i*e),l=o*(1-(1-i)*e),c=r%6,u=[o,n,s,s,l,o][c],d=[l,o,o,n,s,s][c],p=[s,s,l,o,o,n][c];return{r:u*255,g:d*255,b:p*255}}function Xo(t,e,o,r){const i=[Rt(Math.round(t).toString(16)),Rt(Math.round(e).toString(16)),Rt(Math.round(o).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function ln(t,e,o,r,i){const s=[Rt(Math.round(t).toString(16)),Rt(Math.round(e).toString(16)),Rt(Math.round(o).toString(16)),Rt(hn(r))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function cn(t,e,o,r){const i=t/100,s=e/100,n=o/100,l=r/100,c=255*(1-i)*(1-l),u=255*(1-s)*(1-l),d=255*(1-n)*(1-l);return{r:c,g:u,b:d}}function Zo(t,e,o){let r=1-t/255,i=1-e/255,s=1-o/255,n=Math.min(r,i,s);return n===1?(r=0,i=0,s=0):(r=(r-n)/(1-n)*100,i=(i-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(r),m:Math.round(i),y:Math.round(s),k:Math.round(n)}}function hn(t){return Math.round(parseFloat(t)*255).toString(16)}function Jo(t){return G(t)/255}function G(t){return parseInt(t,16)}function un(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}const Ye={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function dn(t){let e={r:0,g:0,b:0},o=1,r=null,i=null,s=null,n=!1,l=!1;return typeof t=="string"&&(t=bn(t)),typeof t=="object"&&(K(t.r)&&K(t.g)&&K(t.b)?(e=sn(t.r,t.g,t.b),n=!0,l=String(t.r).substr(-1)==="%"?"prgb":"rgb"):K(t.h)&&K(t.s)&&K(t.v)?(r=ue(t.s),i=ue(t.v),e=an(t.h,r,i),n=!0,l="hsv"):K(t.h)&&K(t.s)&&K(t.l)?(r=ue(t.s),s=ue(t.l),e=nn(t.h,r,s),n=!0,l="hsl"):K(t.c)&&K(t.m)&&K(t.y)&&K(t.k)&&(e=cn(t.c,t.m,t.y,t.k),n=!0,l="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(o=t.a)),o=Tr(o),{ok:n,format:t.format||l,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:o}}const pn="[-\\+]?\\d+%?",fn="[-\\+]?\\d*\\.\\d+%?",kt="(?:"+fn+")|(?:"+pn+")",Ne="[\\s|\\(]+("+kt+")[,|\\s]+("+kt+")[,|\\s]+("+kt+")\\s*\\)?",de="[\\s|\\(]+("+kt+")[,|\\s]+("+kt+")[,|\\s]+("+kt+")[,|\\s]+("+kt+")\\s*\\)?",tt={CSS_UNIT:new RegExp(kt),rgb:new RegExp("rgb"+Ne),rgba:new RegExp("rgba"+de),hsl:new RegExp("hsl"+Ne),hsla:new RegExp("hsla"+de),hsv:new RegExp("hsv"+Ne),hsva:new RegExp("hsva"+de),cmyk:new RegExp("cmyk"+de),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function bn(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(Ye[t])t=Ye[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let o=tt.rgb.exec(t);return o?{r:o[1],g:o[2],b:o[3]}:(o=tt.rgba.exec(t),o?{r:o[1],g:o[2],b:o[3],a:o[4]}:(o=tt.hsl.exec(t),o?{h:o[1],s:o[2],l:o[3]}:(o=tt.hsla.exec(t),o?{h:o[1],s:o[2],l:o[3],a:o[4]}:(o=tt.hsv.exec(t),o?{h:o[1],s:o[2],v:o[3]}:(o=tt.hsva.exec(t),o?{h:o[1],s:o[2],v:o[3],a:o[4]}:(o=tt.cmyk.exec(t),o?{c:o[1],m:o[2],y:o[3],k:o[4]}:(o=tt.hex8.exec(t),o?{r:G(o[1]),g:G(o[2]),b:G(o[3]),a:Jo(o[4]),format:e?"name":"hex8"}:(o=tt.hex6.exec(t),o?{r:G(o[1]),g:G(o[2]),b:G(o[3]),format:e?"name":"hex"}:(o=tt.hex4.exec(t),o?{r:G(o[1]+o[1]),g:G(o[2]+o[2]),b:G(o[3]+o[3]),a:Jo(o[4]+o[4]),format:e?"name":"hex8"}:(o=tt.hex3.exec(t),o?{r:G(o[1]+o[1]),g:G(o[2]+o[2]),b:G(o[3]+o[3]),format:e?"name":"hex"}:!1))))))))))}function K(t){return typeof t=="number"?!Number.isNaN(t):tt.CSS_UNIT.test(t)}class z{constructor(e="",o={}){if(e instanceof z)return e;typeof e=="number"&&(e=un(e)),this.originalInput=e;const r=dn(e);this.originalInput=e,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=o.format??r.format,this.gradientType=o.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let o,r,i;const s=e.r/255,n=e.g/255,l=e.b/255;return s<=.03928?o=s/12.92:o=Math.pow((s+.055)/1.055,2.4),n<=.03928?r=n/12.92:r=Math.pow((n+.055)/1.055,2.4),l<=.03928?i=l/12.92:i=Math.pow((l+.055)/1.055,2.4),.2126*o+.7152*r+.0722*i}getAlpha(){return this.a}setAlpha(e){return this.a=Tr(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=Yo(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=Yo(this.r,this.g,this.b),o=Math.round(e.h*360),r=Math.round(e.s*100),i=Math.round(e.v*100);return this.a===1?`hsv(${o}, ${r}%, ${i}%)`:`hsva(${o}, ${r}%, ${i}%, ${this.roundA})`}toHsl(){const e=Go(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=Go(this.r,this.g,this.b),o=Math.round(e.h*360),r=Math.round(e.s*100),i=Math.round(e.l*100);return this.a===1?`hsl(${o}, ${r}%, ${i}%)`:`hsla(${o}, ${r}%, ${i}%, ${this.roundA})`}toHex(e=!1){return Xo(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return ln(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),o=Math.round(this.g),r=Math.round(this.b);return this.a===1?`rgb(${e}, ${o}, ${r})`:`rgba(${e}, ${o}, ${r}, ${this.roundA})`}toPercentageRgb(){const e=o=>`${Math.round(H(o,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=o=>Math.round(H(o,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...Zo(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:o,y:r,k:i}=Zo(this.r,this.g,this.b);return`cmyk(${e}, ${o}, ${r}, ${i})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+Xo(this.r,this.g,this.b,!1);for(const[o,r]of Object.entries(Ye))if(e===r)return o;return!1}toString(e){const o=!!e;e=e??this.format;let r=!1;const i=this.a<1&&this.a>=0;return!o&&i&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(r=this.toRgbString()),e==="prgb"&&(r=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(r=this.toHexString()),e==="hex3"&&(r=this.toHexString(!0)),e==="hex4"&&(r=this.toHex8String(!0)),e==="hex8"&&(r=this.toHex8String()),e==="name"&&(r=this.toName()),e==="hsl"&&(r=this.toHslString()),e==="hsv"&&(r=this.toHsvString()),e==="cmyk"&&(r=this.toCmykString()),r||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new z(this.toString())}lighten(e=10){const o=this.toHsl();return o.l+=e/100,o.l=he(o.l),new z(o)}brighten(e=10){const o=this.toRgb();return o.r=Math.max(0,Math.min(255,o.r-Math.round(255*-(e/100)))),o.g=Math.max(0,Math.min(255,o.g-Math.round(255*-(e/100)))),o.b=Math.max(0,Math.min(255,o.b-Math.round(255*-(e/100)))),new z(o)}darken(e=10){const o=this.toHsl();return o.l-=e/100,o.l=he(o.l),new z(o)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const o=this.toHsl();return o.s-=e/100,o.s=he(o.s),new z(o)}saturate(e=10){const o=this.toHsl();return o.s+=e/100,o.s=he(o.s),new z(o)}greyscale(){return this.desaturate(100)}spin(e){const o=this.toHsl(),r=(o.h+e)%360;return o.h=r<0?360+r:r,new z(o)}mix(e,o=50){const r=this.toRgb(),i=new z(e).toRgb(),s=o/100,n={r:(i.r-r.r)*s+r.r,g:(i.g-r.g)*s+r.g,b:(i.b-r.b)*s+r.b,a:(i.a-r.a)*s+r.a};return new z(n)}analogous(e=6,o=30){const r=this.toHsl(),i=360/o,s=[this];for(r.h=(r.h-(i*e>>1)+720)%360;--e;)r.h=(r.h+i)%360,s.push(new z(r));return s}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new z(e)}monochromatic(e=6){const o=this.toHsv(),{h:r}=o,{s:i}=o;let{v:s}=o;const n=[],l=1/e;for(;e--;)n.push(new z({h:r,s:i,v:s})),s=(s+l)%1;return n}splitcomplement(){const e=this.toHsl(),{h:o}=e;return[this,new z({h:(o+72)%360,s:e.s,l:e.l}),new z({h:(o+216)%360,s:e.s,l:e.l})]}onBackground(e){const o=this.toRgb(),r=new z(e).toRgb(),i=o.a+r.a*(1-o.a);return new z({r:(o.r*o.a+r.r*r.a*(1-o.a))/i,g:(o.g*o.a+r.g*r.a*(1-o.a))/i,b:(o.b*o.a+r.b*r.a*(1-o.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const o=this.toHsl(),{h:r}=o,i=[this],s=360/e;for(let n=1;n<e;n++)i.push(new z({h:(r+n*s)%360,s:o.s,l:o.l}));return i}equals(e){const o=new z(e);return this.format==="cmyk"||o.format==="cmyk"?this.toCmykString()===o.toCmykString():this.toRgbString()===o.toRgbString()}}var Qo="EyeDropper"in window,_=class extends L{constructor(){super(),this.formControlController=new re(this),this.isSafeValue=!1,this.localize=new gt(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),o=e.querySelector(".color-picker__slider-handle"),{width:r}=e.getBoundingClientRect();let i=this.value,s=this.value;o.focus(),t.preventDefault(),De(e,{onMove:n=>{this.alpha=Q(n/r*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),o=e.querySelector(".color-picker__slider-handle"),{width:r}=e.getBoundingClientRect();let i=this.value,s=this.value;o.focus(),t.preventDefault(),De(e,{onMove:n=>{this.hue=Q(n/r*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".color-picker__grid"),o=e.querySelector(".color-picker__grid-handle"),{width:r,height:i}=e.getBoundingClientRect();let s=this.value,n=this.value;o.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,De(e,{onMove:(l,c)=>{this.saturation=Q(l/r*100,0,100),this.brightness=Q(100-c/i*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==s&&(s=this.value,this.emit("sl-change"))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,o=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=Q(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=Q(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(t){const e=t.shiftKey?10:1,o=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=Q(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=Q(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(t){const e=t.shiftKey?10:1,o=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=Q(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=Q(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=Q(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=Q(this.brightness-e,0,100),this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(t){const e=t.target,o=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleTouchMove(t){t.preventDefault()}parseColor(t){const e=new z(t);if(!e.isValid)return null;const o=e.toHsl(),r={h:o.h,s:o.s*100,l:o.l*100,a:o.a},i=e.toRgb(),s=e.toHexString(),n=e.toHex8String(),l=e.toHsv(),c={h:l.h,s:l.s*100,v:l.v*100,a:l.a};return{hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){const e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!Qo)return;new EyeDropper().open().then(e=>{const o=this.value;this.setColor(e.sRGBHex),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(t,e,o,r=100){const i=new z(`hsva(${t}, ${e}%, ${o}%, ${r/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const o=this.parseColor(e);o!==null?(this.inputValue=this.value,this.hue=o.hsva.h,this.saturation=o.hsva.s,this.brightness=o.hsva.v,this.alpha=o.hsva.a*100,this.syncValues()):this.inputValue=t??""}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t)}blur(){var t;const e=this.inline?this.base:this.trigger;this.hasFocus&&(e.focus({preventScroll:!0}),e.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:!0}),this.disabled||this.formControlController.emitInvalidEvent(),!1):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.saturation,e=100-this.brightness,o=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(i=>i.trim()!==""),r=k`
      <div
        part="base"
        class=${V({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?k`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${wt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${V({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${wt({top:`${e}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${m(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${wt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${m(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?k`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${wt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${wt({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${m(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${wt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":k`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${Qo?k`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${o.length>0?k`
              <div part="swatches" class="color-picker__swatches">
                ${o.map(i=>{const s=this.parseColor(i);return s?k`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${m(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${i}
                      @click=${()=>this.selectSwatch(i)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(s.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${wt({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${i}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?r:k`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${V({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":!0})}
          style=${wt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${r}
      </sl-dropdown>
    `}};_.styles=[U,Qs];_.dependencies={"sl-button-group":ne,"sl-button":C,"sl-dropdown":W,"sl-icon":Z,"sl-input":v,"sl-visually-hidden":pr};a([O('[part~="base"]')],_.prototype,"base",2);a([O('[part~="input"]')],_.prototype,"input",2);a([O(".color-dropdown")],_.prototype,"dropdown",2);a([O('[part~="preview"]')],_.prototype,"previewButton",2);a([O('[part~="trigger"]')],_.prototype,"trigger",2);a([P()],_.prototype,"hasFocus",2);a([P()],_.prototype,"isDraggingGridHandle",2);a([P()],_.prototype,"isEmpty",2);a([P()],_.prototype,"inputValue",2);a([P()],_.prototype,"hue",2);a([P()],_.prototype,"saturation",2);a([P()],_.prototype,"brightness",2);a([P()],_.prototype,"alpha",2);a([h()],_.prototype,"value",2);a([Ae()],_.prototype,"defaultValue",2);a([h()],_.prototype,"label",2);a([h()],_.prototype,"format",2);a([h({type:Boolean,reflect:!0})],_.prototype,"inline",2);a([h({reflect:!0})],_.prototype,"size",2);a([h({attribute:"no-format-toggle",type:Boolean})],_.prototype,"noFormatToggle",2);a([h()],_.prototype,"name",2);a([h({type:Boolean,reflect:!0})],_.prototype,"disabled",2);a([h({type:Boolean})],_.prototype,"hoist",2);a([h({type:Boolean})],_.prototype,"opacity",2);a([h({type:Boolean})],_.prototype,"uppercase",2);a([h()],_.prototype,"swatches",2);a([h({reflect:!0})],_.prototype,"form",2);a([h({type:Boolean,reflect:!0})],_.prototype,"required",2);a([so({passive:!1})],_.prototype,"handleTouchMove",1);a([R("format",{waitUntilFirstUpdate:!0})],_.prototype,"handleFormatChange",1);a([R("opacity",{waitUntilFirstUpdate:!0})],_.prototype,"handleOpacityChange",1);a([R("value")],_.prototype,"handleValueChange",1);_.define("sl-color-picker");
//# sourceMappingURL=shoelace-CTvh2FiC.js.map
