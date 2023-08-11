var U=Object.defineProperty;var Q=(s,e,t)=>e in s?U(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var c=(s,e,t)=>(Q(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();function C(s,e){let t=s.length;if(t!=e.length)return!1;for(;t--;)if(s[t]!==e[t])return!1;return!0}function S(s){if(s===null)throw TypeError("elt is null");return s}function W(s,e,t={}){let n=document.createElement(e);return s.appendChild(n),Object.entries(t).forEach(([o,i])=>n.setAttribute(o,i)),n}function O(s,e){s.classList.add("modal-contenu-animation-disparition");const t=()=>{e.style.display="none",s.classList.remove("modal-contenu-animation-disparition"),s.removeEventListener("animationend",t)};s.addEventListener("animationend",t)}function a(s){return S(document.getElementById(s))}function _(s,e){if(s===!1)throw Error(e)}const d=class{constructor(e,t=[]){c(this,"_denomination",["phrase",-1]);c(this,"_parent",null);c(this,"_phrase_cassee",[]);c(this,"verbes",[]);c(this,"_mots_offset",[]);c(this,"_fonctions_uniques",{});c(this,"_fonctions_multiples",{});c(this,"_groupes_enchasses",new Map);c(this,"_manipulations",{});c(this,"_fonction_enchassee",(e,t)=>[e,t[0],t.slice(-1)[0]]);this.phrase=e,this._mots_pos=t,this.phrase=e,this._casseSyntagme(),this._mots_pos=C(t,[])?[...Array(this._phrase_cassee.length).keys()]:t,this._remplit_mots_offset()}get contenu(){return this.phrase}get arbre_genealogique(){if(this._parent===null)return[this._denomination];let e=this._parent.arbre_genealogique;return e.push(this._denomination),console.log(e,this._denomination),e}get mots_sans_fonction(){return this._mots_pos.filter(e=>this.fonction(e).length===0)}get mots_pos(){return this._mots_pos}set contenu(e){this.phrase=e}_remplit_mots_offset(){let e=new RegExp(d.Separateur,"g");const t=[];let n=0,o;for(;(o=e.exec(this.contenu))!==null;)o.index>n&&t.push([n,o.index]),n=o.index+o[0].length;return n<this.contenu.length&&t.push([n,this.contenu.length]),this._mots_offset=t,t}texte_pos(e){let t="";for(let n=0,o=0,i=0,r=-1;n<this._mots_offset.length;n++)e.includes(n)?(r===n-1?(i=this._mots_offset[n][1],n===this._mots_offset.length-1&&(t+=this.contenu.slice(o,i))):([o,i]=this._mots_offset[n],t+=" "),r=n):i>0&&r===n-1&&(t+=this.contenu.slice(o,i));return t}fonction_texte_pos(e,t=-1){return this.texte_pos(this.fonctionPos(e,t))}get phraseCassee(){return this._phrase_cassee}get longueur(){return this._phrase_cassee.length}static get separateur(){return this._separateur}_remplit_les_vides(){typeof this._fonctions_uniques>"u"&&(this._fonctions_uniques={}),typeof this._fonctions_multiples>"u"&&(this._fonctions_multiples={}),typeof this._groupes_enchasses>"u"&&(this._groupes_enchasses=new Map)}get vide(){for(const[,e]of this._groupes_enchasses)if(!e.vide)return!1;return Object.keys(this._fonctions_uniques).length===0&&Object.keys(this._fonctions_multiples).length===0}ajoute_infos_de_manipulation(e,t){this._manipulations[e]=t}infos_de_manipulation(e){return _(e in this._manipulations,`${e} n'est pas enregistré dans les données de manipulation`),this._manipulations[e]}get est_attributif(){return"sujet"in this._fonctions_uniques&&"attribut_du_sujet"in this._fonctions_uniques}cree_groupe_enchasse(e,t,n){const o=new d(this.contenu,e);return this._groupes_enchasses.set([t,n],o),o._denomination=[t,n],o._parent=this,o}get groupes_enchasses_nombre(){return this._groupes_enchasses.size}groupe_enchasse(e,t){let n;for(const[o,i]of this._groupes_enchasses)o[0]===e&&o[1]===t&&(n=i);if(typeof n>"u")throw Error(`Pas de groupe avec la fonction ${e} et le numéro ${t}`);return n}supprime_groupe_enchasse(e,t){for(const[n]of this._groupes_enchasses)if(n[0]===e&&n[1]===t)return this._groupes_enchasses.delete(n);return!1}fonctions_multiples_nombre(e){const t=this._fonctions_multiples;return e in t?t[e].length:0}get copie(){let e=new d(this.contenu,this._mots_pos);return Object.entries(this._fonctions_uniques).forEach(([t,n])=>{n.length>0&&(e._fonctions_uniques[t]=n)}),Object.entries(this._fonctions_multiples).forEach(([t,n])=>{let o=[];n.length>0&&(o=n.filter(i=>i.length>0)),o.length>0&&(e._fonctions_multiples[t]=o)}),e._groupes_enchasses=new Map([...this._groupes_enchasses.entries()].filter(t=>!t[1].vide).map(t=>[t[0],t[1].copie])),e._manipulations=this._manipulations,e.verbes=this.verbes,e}toJSON(){const e=this.copie;let t=Object.assign(e);return t._groupes_enchasses=Array.from(t._groupes_enchasses.entries()),t}get profondeur(){return this._groupes_enchasses.size===0?0:Math.max(...[...this._groupes_enchasses.entries()].map(([e,t])=>t.profondeur))+1}fonction(e){let t=[];this.verbes.includes(e)&&t.push("verbes");for(const n in this._fonctions_uniques)this._fonctions_uniques[n].includes(e)&&t.push(n);for(const n in this._fonctions_multiples)for(const o of this._fonctions_multiples[n])if(o.includes(e)){t.push(n);break}for(const[,n]of this._groupes_enchasses){const o=n.fonction(e);o&&t.push(...o)}return t}fonction_detaillee(e){let t=[];this.verbes.includes(e)&&t.push(this._fonction_enchassee("verbes",this.verbes));for(const o in this._fonctions_uniques)this._fonctions_uniques[o].includes(e)&&t.push(this._fonction_enchassee(o,this._fonctions_uniques[o]));const n=this._fonctions_multiples;for(const o in n)for(const i of n[o])i.includes(e)&&t.push(this._fonction_enchassee(o,i));for(const[,o]of this._groupes_enchasses)t.push(...o.fonction_detaillee(e));return t.sort((o,i)=>o[2]-o[1]>i[2]-i[1]?-1:1)}fonctionPos(e,t=-1){return t>=0&&_(d.Fonctions_multiples.includes(e),`fonctionPos:  ${e} n'est pas une fonction multiple`),e=="verbes"?this.verbes:d.Fonctions_multiples.includes(e)?(_(t>-1,`fonctionPos: numero_de_fonction doit être supérieur à -1 pour les fonctions multiples comme ${e}`),!(e in this._fonctions_multiples)||t>=this._fonctions_multiples[e].length?[]:this._fonctions_multiples[e][t]):e in this._fonctions_uniques?this._fonctions_uniques[e]:[]}declareFonction(e,t,n=-1){if(_(this.mots_valides(t),`declareFonction: ${t} ne correspond pas à une liste de mots valides.`),t=t.sort((o,i)=>o-i),e==="verbes"){this.verbes=t;return}if(d.Fonctions_multiples.includes(e)){let o=this._fonctions_multiples;e in o||(_(n<=0,`declareFonction: ${n} introuvable pour ${e}`),o[e]=[]),n===-1||n===o[e].length?o[e].push(t):(_(n<o[e].length,`declareFonction: ${n} introuvable pour ${e}`),o[e][n]=t)}else this._fonctions_uniques[e]=t}fonctionMots(e,t=-1){return t>=0&&(_(d.Fonctions_multiples.includes(e),`fonctionMots: ${e} n'est pas une fonction multiple`),_(e in this._fonctions_multiples,`fonctionMots: ${e} n'a pas été créé.`),_(t<this._fonctions_multiples[e].length,`fonctionMots: ${t} introuvable pour ${e}`)),this.fonctionPos(e,t).map(n=>this._phrase_cassee[n]).join(" ")}mots_valides(e){if(e.length>0){for(const t of e)if(!this._mots_pos.includes(t))return!1}return!0}_casseSyntagme(){this._phrase_cassee=this.phrase.split(d._separateur).filter(e=>e)}};let h=d;c(h,"Separateur","[ ,;?!.'-]"),c(h,"_separateur",new RegExp(d.Separateur)),c(h,"Fonctions_multiples",["independante","complement_circonstanciel","modalisateur","auto-enonciative","connecteur","balise_textuelle","epithete","complement_du_nom","complement_du_pronom","complement_de_l_adjectif","apposition"]),c(h,"Fonctions_contenants",["independante","sujet","cod","coi","attribut_du_sujet","attribut_du_cod","complement_circonstanciel","complement_du_verbe_impersonnel","complement_du_nom","complement_du_pronom","epithete","apposition","complement_de_l_adjectif"]);class y extends h{constructor(e,t=[]){super(e,t)}static reviver(e,t){return e===""?y.fromJSON(t):t}static fromJSON(e){if(typeof e=="string")return JSON.parse(e,y.reviver);{let t=Object.create(y.prototype);const n=typeof e._groupes_enchasses>"u"?new Map:new Map(Object.entries(e._groupes_enchasses).map(i=>[i[1][0],y.fromJSON(i[1][1])]));let o=Object.assign(t,e,{_groupes_enchasses:n});return o._remplit_les_vides(),o}}groupe_enchasse(e,t){return super.groupe_enchasse(e,t)}aFonction(e){if(h.Fonctions_multiples.includes(e))return e in this._fonctions_multiples?this._fonctions_multiples[e].filter(n=>!C(n,[])).length>0:!1;const t=this.fonctionPos(e);return!C(t,[])}estFonction(e,t){return t=t.sort(),h.Fonctions_multiples.includes(e)?e in this._fonctions_multiples?this._fonctions_multiples[e].filter(n=>C(n,t)).length>0:!1:C(this.fonctionPos(e),t.sort())}*groupes_enchasses(){for(let e of this._groupes_enchasses)yield e}}class b extends h{constructor(e,t){super(e,t.mots_pos),this._corrige=t,this._corrige=t}cree_groupe_enchasse_eleve(e,t,n){const o=new b(this.contenu,e);return this._groupes_enchasses.set([t,n],o),o._denomination=[t,n],o._parent=this,o}get corrige(){return this._corrige}est_complet(e){const t=this.corrige.fonctions_multiples_nombre(e);if(t!==this.fonctions_multiples_nombre(e))return!1;const n=this._fonctions_multiples[e];for(let o=0;o<t;o++){const i=this.corrige.fonctionPos(e,o);if(n.filter(u=>C(u,i)).length===0)return!1}return!0}declare(e,t,n=-1){return h.Fonctions_multiples.includes(e)&&e in this._fonctions_multiples&&this._fonctions_multiples[e].filter(o=>C(o,t)).length!==0?!1:(this.declareFonction(e,t,n),this.corrige.estFonction(e,t))}}function T(s,e){return["sujet","groupe_verbal"].includes(s)?e?"[":"]":""}function X(s,e){return e==s[1]||s[0]==="verbes"?`${T(s[0],!0)}<span groupe class="groupe-de-mots phrase-${s[0]}">`:""}function Y(s,e){return e==s[2]||s[0]==="verbes"?`</span>${T(s[0],!1)}`:""}function B(s,e=[]){const t=new RegExp("("+b.Separateur+")"),n=s.contenu.split(t);let o=0,i=[];for(const r of n){if(b.Separateur.includes(r)){i.push(r);continue}const u=s.fonction_detaillee(o);u.forEach(p=>i.push(X(p,o)));const l=e.includes(o)?'class="phrase-cliquable"':'class="phrase-non-cliquable"';i.push(`<span ${l} id="phrase-mot-${o}">${r}</span>`),u.forEach(p=>i.push(Y(p,o))),o+=1}return i.join("")}function P(s){const e=H(s);s.style.lineHeight=`${1.8+e/10}`,V(s,e)}function H(s){let e=1;for(let t=0;t<s.children.length;t++){let n=s.children[t];n.hasAttribute("groupe")&&(e=Math.max(e,H(n)+1))}return e}function V(s,e){for(let t=0;t<s.children.length;t++){let n=s.children[t];n.hasAttribute("groupe")&&(n.style.padding=`0px 0px ${e*10}px`,V(n,e-1))}}function Z(s,e){const t=e.arbre_genealogique;if(console.log(t),t.length===1)return s;const n={independante:"Indépendante",verbes:"Verbes",verbe_noyau:"Verbe noyau",sujet:"Sujet",cod:"COD",coi:"COI",attribut_du_sujet:"Attribut du sujet",attribut_du_cod:"Attribut du COD",complement_du_verbe_impersonnel:"Complément du verbe impersonnel",complement_d_agent:"Complément d'agent",groupe_verbal:"Groupe verbal",complement_circonstanciel:"Complément circonstanciel",modalisateur:"Modalisateur","auto-enonciative":"Fonction auto-énonciative",connecteur:"Connecteur",balise_textuelle:"Balise textuelle",noyau:"Noyau",epithete:"Épithète",complement_du_nom:"Complément du nom",complement_du_pronom:"Complément du pronom",apposition:"Apposition",complement_de_l_adjectif:"Complément de l'adjectif"};return t.slice(1).map(o=>"Dans le "+(o[1]===-1?n[o[0]]:`${n[o[0]]}-${o[1]}`)).join(" > ")+" : "+s}Array();let f={fonction_de_validation:()=>{console.log("Problème: la fonction de validation n'a pas été mise en place")},ok:()=>{console.log("Aucune fonction définie pour OK")}};const ee={Sujet:"sujet","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},te={Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},ne={Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},oe={Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},se={"Complément de l'adjectif":"complement_de_l_adjectif",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},ie={"Complément de l'adjectif":"complement_de_l_adjectif",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},ae={Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},re={Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle"},le={Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition"},ue={"Complément de l'adjectif":"complement_de_l_adjectif",Noyau:"noyau"},ce={Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition"},pe={Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition"},me={"Complément de l'adjectif":"complement_de_l_adjectif",Sujet:"sujet",Noyau:"noyau","Verbe noyau":"verbe_noyau","Groupe verbal":"groupe_verbal","Complément d'agent":"complement_d_agent","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition"},_e={Noyau:"noyau",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition"},de={independante:ee,sujet:te,cod:ne,coi:oe,attribut_du_sujet:se,attribut_du_cod:ie,complement_d_agent:ae,complement_circonstanciel:re,complement_du_verbe_impersonnel:le,epithete:ue,complement_du_nom:ce,complement_du_pronom:pe,apposition:me,complement_de_l_adjectif:_e};let M=()=>console.log("Problème: aucune fonction définie pour le bouton OK de la nouvelle phrase"),D=()=>console.log("Problème: aucune fonction définie pour la validation de la nouvelle phrase"),G=s=>console.log("Aucune fonction définie pour le sélecteur"),E=()=>(console.log("Problème: enregistre_fonction n'a pas été instancié"),new L("vide")),A=()=>console.log("Problème: aucune fonction définie pour le bouton OK des ajouts de manipulations");function he(){a("modal-nouvelle_phrase-bouton").addEventListener("click",()=>{M()}),a("bouton-valider-phrase").addEventListener("click",()=>{D()}),a("nouvelle_phrase-fonctions-selection").addEventListener("click",s=>{G(s)}),a("ajout-manipulations-form").addEventListener("submit",s=>{s.preventDefault(),A()})}class fe{constructor(e,t,n,o,i=-1,r){c(this,"validee",!1);c(this,"est_multiple",!1);this.nom_de_base=e,this.fonction=t,this.html_node=n,this.syntagme=o,this.numero=i,this.parent=r,this.est_multiple=i>-1}get nom(){return this.numero>-1?`${this.nom_de_base}-${this.numero+1}`:this.nom_de_base}get arbre_genealogique(){return typeof this.parent>"u"?this.nom:`${this.parent.arbre_genealogique} > ${this.nom}`}get id_sous_menu(){const e=this.numero===-1?"":`-${this.numero}`,t=`${this.fonction}${e}`;return typeof this.parent>"u"?t:`${this.parent.id_sous_menu}-${t}`}}const $=class{constructor(e){c(this,"_phrase");c(this,"_traceur",[]);c(this,"_pos",0);c(this,"_selecteur",a("nouvelle_phrase-fonctions-selection"));this._phrase=new b(e,new y(e)),this._selecteur.innerHTML="",Object.entries($.liste_des_fonctions).forEach(t=>this.ajouter_fonction_tracee(this._traceur.length,t[0],t[1])),this._selecteur.style.display="block"}static contenus_possibles(e){return de[e]}set pos(e){this.fonction_courante.html_node.classList.remove("selectionne"),_(e<this._traceur.length,`${e} est plus grand que la longueur du traceur: ${this._traceur.length}.`),this._pos=e,this.fonction_courante.html_node.classList.add("selectionne")}get pos(){return this._pos}get fonction_courante(){return this._traceur[this._pos]}set_pos_selecteur(e,t){for(let n of e.children)n.classList.contains("selecteur")||n.classList.contains("sous_menu")?t=this.set_pos_selecteur(n,t):(n.setAttribute("pos",t.toString()),t+=1);return t}ajouter_node_selecteur(e,t,n,o){for(let i of e.children)if(i.classList.contains("sous_menu")){if(n=this.ajouter_node_selecteur(i.children[1],t,n+1,o),n>o)return n}else{if(n===o&&i.insertAdjacentElement("beforebegin",t),n>o)return n;n+=1}return n===o?(e.appendChild(t),n+1):n}ajouter_fonction_tracee(e,t,n,o=this._phrase,i=-1,r){b.Fonctions_multiples.includes(n)&&i===-1&&(i=0),_(e<=this._traceur.length,`${e} est plus grand que la longueur du traceur`);let u=document.createElement("div");const l=new fe(t,n,u,o,i,r);this._traceur.splice(e,0,l),u.setAttribute("value",l.fonction),u.setAttribute("class","selecteur-element"),u.innerHTML=l.nom,this.ajouter_node_selecteur(this._selecteur,u,0,e),this.set_pos_selecteur(this._selecteur,0)}retirer_enfants(e,t,n=!1){for(const[o,i]of this._traceur.entries())i.parent===e&&(t=this.retirer_enfants(i,t,!1),i.html_node.remove(),t.push(o));return n&&(this._traceur=this._traceur.filter((o,i)=>!t.includes(i)),this.set_pos_selecteur(this._selecteur,0)),t}gere_groupe_enchasse(e,t,n){if(!b.Fonctions_contenants.includes(this.fonction_courante.fonction))return;if(!e){if(n.syntagme.supprime_groupe_enchasse(n.fonction,n.numero)){const l=a(`sous_menu-${n.id_sous_menu}`);l.insertAdjacentElement("beforebegin",n.html_node),this.retirer_enfants(n,[],!0),l.remove()}return}let o=n.syntagme.cree_groupe_enchasse(t,n.fonction,n.numero),i=document.createElement("div");i.setAttribute("class","sous_menu"),i.setAttribute("id",`sous_menu-${n.id_sous_menu}`),this.fonction_courante.html_node.insertAdjacentElement("beforebegin",i),i.insertAdjacentElement("afterbegin",this.fonction_courante.html_node);let r=document.createElement("div");r.setAttribute("class","selecteur sous_menu_contenu"),this.fonction_courante.html_node.insertAdjacentElement("afterend",r);let u=this._pos+1;Object.entries($.contenus_possibles(this.fonction_courante.fonction)).forEach(l=>{this.ajouter_fonction_tracee(u,l[0],l[1],o,-1,n),u+=1}),i.addEventListener("mouseenter",()=>{r.style.display="block"}),i.addEventListener("mouseleave",()=>{r.style.display="none"}),i.addEventListener("click",()=>{r.style.display="none"})}valide_fonction(e){const t=this.fonction_courante;return t.validee=e,e?t.html_node.classList.add("valide"):t.html_node.classList.remove("valide"),e}analyse_de_fonction(e=-1){e===-1?e=this._pos:this.pos=e;const t=this.fonction_courante.fonction,n=this.fonction_courante.syntagme,o=()=>{const r={groupe_verbal:"verbes verbe_noyau cod coi attribut_du_sujet attribut_du_cod complement_du_verbe_impersonnel".split(" "),verbes:"verbe_noyau groupe_verbal".split(" "),verbe_noyau:"verbes groupe_verbal".split(" "),cod:["groupe_verbal","verbes"],coi:["groupe_verbal","verbes"],attribut_du_sujet:["groupe_verbal","verbes"],attribut_du_cod:["groupe_verbal","verbes"],complement_du_verbe_impersonnel:["groupe_verbal","verbes"]};return t in r?r[t].map(u=>n.fonctionPos(u)).flat().concat(n.mots_sans_fonction):n.mots_sans_fonction};a("phrase-analyse-paragraphe").innerHTML=B(this._phrase,o()),P(a("phrase-analyse-paragraphe")),a("consigne-container").innerHTML=`À renseigner : ${this.fonction_courante.arbre_genealogique}`;const i=n.fonctionPos(t,this.fonction_courante.numero);Array.from(document.getElementsByClassName("phrase-cliquable")).forEach(r=>{i.includes(Number(r.id.split("-")[2]))&&r.classList.add("phrase-selectionne")}),E=()=>{const r=Array.from(document.getElementsByClassName("phrase-selectionne")).map(l=>Number(l.id.split("-")[2]));if(this.fonction_courante.est_multiple&&this._phrase.fonctions_multiples_nombre(t)===this.fonction_courante.numero){if(r.length===0)return this;this.ajouter_fonction_tracee(e+1,this.fonction_courante.nom_de_base,t,n,this.fonction_courante.numero+1)}n.declareFonction(t,r,this.fonction_courante.numero);const u=this.valide_fonction(r.length>0);return this.gere_groupe_enchasse(u,r,this.fonction_courante),this.elements_de_manipulation(u),this},D=()=>{const r="phrase.v0.5.1.json",u=new Blob([JSON.stringify(E()._phrase)],{type:"text/json"}),l=document.createElement("a");l.download=r,l.href=window.URL.createObjectURL(u),l.dataset.downloadurl=["text/json",l.download,l.href].join(":");const p=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});l.dispatchEvent(p),l.remove(),I()},f.fonction_de_validation=()=>{E(),this.analyse_de_fonction(e+1)},f.ok=f.fonction_de_validation}elements_de_manipulation(e){if(e&&this.fonction_courante.fonction==="sujet"){a("modal-ajout-manipulations").style.display="block";const t=Array.from(document.getElementsByClassName("phrase-selectionne")).map(r=>r.innerHTML).join(" "),n="je tu il elle nous vous ils elles".split(" "),o=n.includes(t.toLowerCase())?'<input type="hidden" id="pronom-inutile" name="sujet-pronoms" value="null" checked="true">':'<fieldset class="ajout-manipulations-cadre"><legend class="ajout-manipulations-cadre-titre">Par quoi le sujet peut-il être pronominalisé ?</legend>'+n.map(r=>`<label class="ajout-manipulations-label" for="pronom-${r}">${r}<input type="radio" class="pronoms" id="pronom-${r}" name="sujet-pronoms" value="${r}" required><span class="ajout-manipulations-radio"></span></label class="ajout-manipulations-label">`).join(" ")+"</fieldset>";a("modal-ajout-manipulations-titre").innerHTML=`Renseignements nécessaires à la manipulation du sujet : ${t}`,a("ajout-manipulations-form-contenu").innerHTML='<fieldset class="ajout-manipulations-cadre"><legend class="ajout-manipulations-cadre-titre">Animé ou non-animé ?</legend><label class="ajout-manipulations-label" for="est-anime">Le référent du sujet est animé.<input type="radio" id="est-anime" value="true" name="sujet-anime" required><span class="ajout-manipulations-radio"></span></label class="ajout-manipulations-label"><label class="ajout-manipulations-label" for="est-non-anime">Le référent du sujet est non animé.<input type="radio" id="est-non-anime" value="false" name="sujet-anime" required><span class="ajout-manipulations-radio"></span></label class="ajout-manipulations-label"></fieldset>'+o;let i=this.fonction_courante;A=()=>{const r=document.getElementsByName("sujet-anime")[0].checked;let u=Array.from(document.getElementsByName("sujet-pronoms")).filter(l=>l.checked)[0].getAttribute("value");u==="null"&&(u=null),i.syntagme.ajoute_infos_de_manipulation("sujet",{est_anime:r,pronominalisation:u}),a("modal-ajout-manipulations").style.display="none"},f.ok=A}}};let L=$;c(L,"liste_des_fonctions",{Indépendante:"independante",Verbes:"verbes","Verbe noyau":"verbe_noyau",Sujet:"sujet",COD:"cod",COI:"coi","Attribut du sujet":"attribut_du_sujet","Attribut du COD":"attribut_du_cod","Complément du verbe impersonnel":"complement_du_verbe_impersonnel","Complément d'agent":"complement_d_agent","Groupe verbal":"groupe_verbal","Complément circonstanciel":"complement_circonstanciel",Modalisateur:"modalisateur","Fonction auto-énonciative":"auto-enonciative",Connecteur:"connecteur","Balise textuelle":"balise_textuelle",Noyau:"noyau",Épithète:"epithete","Complément du nom":"complement_du_nom","Complément du pronom":"complement_du_pronom",Apposition:"apposition","Complément de l'adjectif":"complement_de_l_adjectif"});function I(){for(const n of S(document.getElementsByClassName("modal")))n.style.display="none";const s=a("modal-nouvelle-phrase");s.style.display="block",a("nouvelle_phrase-texterea").focus(),a("conseil").innerHTML="Sélectionnez chaque fonction comme si vous étiez vous-même l'élève. Cliquez sur valider quand vous avez terminé votre sélection. Valider dans rien sélectionner indique que cette fonction est absente de la phrase. Vous pouvez toujours corriger une éventuelle erreur en sélectionnant une fonction dans la liste déroulante.";const e=a("bouton-valider");e.style.width="50%",e.innerHTML="Valider la fonction";const t=a("bouton-valider-phrase");t.style.display="block",M=()=>{let n=a("nouvelle_phrase-texterea").value;if(n.trim()==="")return;n=n.replace(`
`,"");let o=new L(n);s.style.display="none",o.analyse_de_fonction(0),G=i=>{const r=i.target;E();const u=()=>{let l=r.getAttribute("pos");return typeof l=="string"?parseInt(l):(_(!1,"la valeur de l'attribut est nulle."),-1)};o.analyse_de_fonction(u())}},f.ok=M}function ge(){a("conseil").innerHTML="";const s=a("bouton-valider");s.style.width="100%",s.innerHTML="Valider";const e=a("bouton-valider-phrase");e.style.display="none",a("nouvelle_phrase-fonctions-selection").innerHTML=""}const ve=[{_phrase_cassee:["L","amour","rend","tout","permis"],verbes:[2],_mots_offset:[[0,1],[2,7],[8,12],[13,17],[18,24]],_fonctions_uniques:{verbe_noyau:[2],sujet:[0,1],cod:[3],attribut_du_cod:[4],groupe_verbal:[2,3,4]},_fonctions_multiples:{},_groupes_enchasses:[],_manipulations:{sujet:{est_anime:!1,pronominalisation:"il"}},phrase:"L'amour rend tout permis.",_mots_pos:[0,1,2,3,4]},{_phrase_cassee:["Le","petit","chat","de","ma","voisine","mange","ses","croquettes"],verbes:[6],_mots_offset:[[0,2],[3,8],[9,13],[14,16],[17,19],[20,27],[28,33],[34,37],[38,48]],_fonctions_uniques:{verbe_noyau:[6],sujet:[0,1,2,3,4,5],cod:[7,8],groupe_verbal:[6,7,8]},_fonctions_multiples:{},_groupes_enchasses:[[["sujet",-1],{_phrase_cassee:["Le","petit","chat","de","ma","voisine","mange","ses","croquettes"],verbes:[],_mots_offset:[[0,2],[3,8],[9,13],[14,16],[17,19],[20,27],[28,33],[34,37],[38,48]],_fonctions_uniques:{noyau:[2]},_fonctions_multiples:{epithete:[[1]],complement_du_nom:[[3,4,5]]},_groupes_enchasses:[],_manipulations:{},phrase:"Le petit chat de ma voisine mange ses croquettes.",_mots_pos:[0,1,2,3,4,5]}]],_manipulations:{sujet:{est_anime:!0,pronominalisation:"il"}},phrase:"Le petit chat de ma voisine mange ses croquettes.",_mots_pos:[0,1,2,3,4,5,6,7,8]},{_phrase_cassee:["Marie","donne","du","lait","au","chat"],verbes:[1],_mots_offset:[[0,5],[6,11],[12,14],[15,19],[20,22],[23,27]],_fonctions_uniques:{verbe_noyau:[1],sujet:[0],cod:[2,3],coi:[4,5],groupe_verbal:[1,2,3,4,5]},_fonctions_multiples:{},_groupes_enchasses:[],_manipulations:{sujet:{est_anime:!0,pronominalisation:"elle"}},phrase:"Marie donne du lait au chat.",_mots_pos:[0,1,2,3,4,5]},{_phrase_cassee:["Un","véritable","amant","ne","connaît","point","d","ami"],verbes:[4],_mots_offset:[[0,2],[3,12],[13,18],[19,21],[22,29],[30,35],[36,37],[38,41]],_fonctions_uniques:{verbe_noyau:[4],sujet:[0,1,2],coi:[6,7],groupe_verbal:[3,4,5,6,7]},_fonctions_multiples:{},_groupes_enchasses:[[["sujet",-1],{_phrase_cassee:["Un","véritable","amant","ne","connaît","point","d","ami"],verbes:[],_mots_offset:[[0,2],[3,12],[13,18],[19,21],[22,29],[30,35],[36,37],[38,41]],_fonctions_uniques:{noyau:[2]},_fonctions_multiples:{epithete:[[1]]},_groupes_enchasses:[],_manipulations:{},phrase:"Un véritable amant ne connaît point d'ami.",_mots_pos:[0,1,2]}]],_manipulations:{sujet:{est_anime:!0,pronominalisation:"il"}},phrase:"Un véritable amant ne connaît point d'ami.",_mots_pos:[0,1,2,3,4,5,6,7]},{_phrase_cassee:["Vous","êtes","son","rival"],verbes:[1],_mots_offset:[[0,4],[5,9],[10,13],[14,19]],_fonctions_uniques:{verbe_noyau:[1],sujet:[0],attribut_du_sujet:[2,3],groupe_verbal:[1,2,3]},_fonctions_multiples:{},_groupes_enchasses:[],_manipulations:{sujet:{est_anime:!0,pronominalisation:null}},phrase:"Vous êtes son rival ?",_mots_pos:[0,1,2,3]}],be=ve.map(s=>y.fromJSON(s));function ye(s,e=0){return be.slice(e,e+s)}function je(s,e){const t=a("modal-manipulations");t.style.display="block",a("modal-manipulations-titre").innerHTML="Manipule le sujet pour vérifier ta réponse.",a("manipulable").innerHTML=s.texte_pos(e);const n=s.corrige.infos_de_manipulation("sujet"),o=s.fonction_texte_pos("verbe_noyau"),i=n.est_anime?"Qui ":"Qu'",r='<span class="manipulation-drop-zone">Glisse le sujet ici</span>',u="Je Tu Il Elle Nous Vous Ils Elles".split(" ").map(l=>`<option value="${l.toLowerCase()}">${l}</option>`).join(" ");a("manipulations-form-contenu").innerHTML=`<fieldset class="manipulation-element"><legend class="manipulation-element-titre">Question</legend><span class="manipulation-element-contenu">${i}est-ce qui ${o} ? ${r}</span></fieldset><fieldset class="manipulation-element"><legend class="manipulation-element-titre">Extraction</legend><span class="manipulation-element-contenu">C'est ${r} qui ${o}. </span></fieldset><fieldset class="manipulation-element"><legend class="manipulation-element-titre">Pronominalisation</legend><span class="manipulation-element-contenu">${s.texte_pos(e)} ${o}.<span class="manipulation-fleche">
<svg fill="#000000" height="36px" width="100px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 476.213 476.213" xml:space="preserve">
<polygon points="345.606,107.5 324.394,128.713 418.787,223.107 0,223.107 0,253.107 418.787,253.107 324.394,347.5 
	345.606,368.713 476.213,238.106 "/>
</svg>
    </span> <select name="pronoms">${u}</select> ${o}</span></fieldset>`;for(const l of document.getElementsByClassName("manipulation-drop-zone"))l.addEventListener("dragover",p=>{const m=p;if(m.dataTransfer===null)throw Error("Pas de données transférées");m.preventDefault(),m.dataTransfer.dropEffect="copy"}),l.addEventListener("drop",p=>{const m=p;if(m.dataTransfer===null)throw Error("Pas de données transférées");m.preventDefault();const g=a(m.dataTransfer.getData("text/plain")).innerHTML;let v=m.target;v.innerHTML=g,v.classList.add("manipulable-deplace"),v.classList.remove("manipulation-drop-zone")})}a("manipulable").addEventListener("dragstart",s=>{s.dataTransfer!==null&&(s.dataTransfer.setData("text/plain",s.target.id),s.dataTransfer.dropEffect="copy")});const q=[["verbes","Sélectionne les verbes."],["independante","Sélectionne une indépendante"],["verbe_noyau","Sélectionne le verbe noyau"],["noyau","Sélectionne le noyau"],["sujet","Sélectionne le groupe sujet"],["attribut_du_sujet","Sélectionne l'attribut du sujet."],["cod","Sélectionne le Complément d'objet direct (COD)."],["coi","Sélectionne le Complément d'objet indirect (COI)."],["attribut_du_cod","Sélectionne l'attribut du COD."],["complement_d_agent","Sélectionne le complément d'agent"],["complement_du_verbe_impersonnel","Sélectionne le complément du verbe impersonnel"],["groupe_verbal","Sélectionne le groupe verbal"],["complement_circonstanciel","Sélectionne un complément circonstanciel"],["complement_du_nom","Sélectionne un complément du nom"],["complement_du_pronom","Sélectionne un complément du pronom"],["epithete","Sélectionne une épithète"],["apposition","Sélectionne une apposition"],["complement_de_l_adjectif","Sélectionne un complément de l'adjectif"],["modalisateur","Sélectionne un modalisateur"],["auto-enonciative","Sélectionne une fonction auto-énonciative"],["connecteur","Sélectionne un connecteur"],["balise_textuelle","Sélectionne une balise textuelle"]];function z(s){let e=new b(s.contenu,s);x(0,e,e,[])}function x(s,e,t,n,o=-1){const i=q[s][0];b.Fonctions_multiples.includes(i)&&o===-1&&(o=0);const r=q[s][1]+(o>=0?` (${o+1})`:"");function u(){if(s===q.length-1){let l=e.corrige.groupes_enchasses();n.push(l);for(let p=n.length-1;p>=0;p--){let m=n[p].next();if(m.done===!1){const[[g,v],w]=m.value;return x(0,e.cree_groupe_enchasse_eleve(w,g,v),t,n)}else n.pop()}return Ce()}else{const l=b.Fonctions_multiples.includes(i)&&!e.est_complet(i)?0:1;return o=l===0?o+1:-1,x(s+l,e,t,n,o)}}if(!e.corrige.aFonction(i))return u();a("consigne-container").innerHTML=Z(r,e),a("phrase-analyse-paragraphe").innerHTML=B(t,t.mots_pos),P(a("phrase-analyse-paragraphe")),f.fonction_de_validation=()=>{const l=Array.from(document.getElementsByClassName("phrase-selectionne")).map(g=>Number(g.id.split("-")[2]));if(l.length===0)return;const p=()=>{x(s,e,t,n,o),Array.from(document.getElementsByClassName("phrase-cliquable")).forEach(g=>{l.includes(Number(g.id.split("-")[2]))&&g.classList.add("phrase-selectionne")})},m=()=>{if(l.length===0?!e.corrige.aFonction(i):e.declare(i,l,o))u();else{const v=a("modal-message-contenu");v.classList.add("modal-message-erreur"),j("Il y a une erreur dans ton analyse !","Reprendre l'analyse",()=>{v.classList.remove("modal-message-erreur")})}};i==="sujet"?new Promise((v,w)=>{je(e,l),a("manipulations-form").addEventListener("submit",R=>{a("modal-manipulations").style.display="none",R.preventDefault(),v()},{once:!0}),a("modal-manipulations-annuler").addEventListener("click",()=>{a("modal-manipulations").style.display="none",w()},{once:!0})}).then(m,p):m()},f.ok=f.fonction_de_validation}function j(s,e,t){const n=a("modal-message"),o=a("modal-message-contenu-texte"),i=a("modal-message-bouton");o.innerHTML=s,i.innerHTML=e,n.style.display="block",F=()=>{O(a("modal-message-contenu"),n),t()},f.ok=F}function Ce(){j("Bravo !","Commencer une autre analyse",J)}function J(){const s=a("modal-choix-phrase");s.style.display="block";const e=ye(5,0),t=a("modal-choix-phrase-liste");t.innerHTML="";for(let n in e){const o=e[n],i=W(t,"li",{id:`modal-choix-phrase-liste-${n}`});i.innerHTML=o.contenu,i.addEventListener("click",()=>{z(e[n]),O(a("modal-choix-phrase-contenu"),s)})}}let N=!1;const k=a("phrase-analyse-paragraphe");k.addEventListener("mousedown",s=>{const e=s.target;s.button!=0||!e.classList.contains("phrase-cliquable")||(N=!0,e.classList.toggle("phrase-selectionne"))});k.addEventListener("mouseover",s=>{const e=s.target;N&&e.classList.contains("phrase-cliquable")&&e.classList.toggle("phrase-selectionne")});k.addEventListener("mouseup",s=>{N=!1});a("bouton-valider").addEventListener("click",()=>{f.fonction_de_validation()});document.onkeyup=function(s){s.which===13&&f.ok()};let F=()=>console.log("Problème: aucune fonction définie pour le bouton du message");a("modal-message-bouton").addEventListener("click",()=>{F()});a("nouvelle_phrase").addEventListener("click",()=>{I()});a("analyse_fichier").addEventListener("click",()=>{for(const s of S(document.getElementsByClassName("modal")))s.style.display="none";ge(),a("modal-analyse-fichier").style.display="block"});function Le(){if((()=>{var e=document.createElement("div");return("draggable"in e||"ondragstart"in e&&"ondrop"in e)&&"FormData"in window&&"FileReader"in window})()){const e=a("analyse_fichier_input_form");e.classList.add("has-advanced-upload"),a("analyse_fichier_bouton").style.display="none","drag dragstart dragend dragover dragenter dragleave drop".split(" ").forEach(t=>{e.addEventListener(t,n=>{n.preventDefault(),n.stopPropagation()})}),["dragover","dragenter"].forEach(t=>{e.addEventListener(t,()=>e.classList.add("is-dragover"))}),["dragleave","dragend","drop"].forEach(t=>{e.addEventListener(t,()=>e.classList.remove("is-dragover"))})}else a("analyse_fichier_input").classList.remove("box__file")}function K(s){const e=new FileReader,t=()=>{O(a("modal-analyse-fichier-contenu"),a("modal-analyse-fichier"))};if(s.length==0)return t(),j("Pas de fichier chargé.","OK",()=>{});const n=s[0];if(!(n.type?n.type:"Introuvable").includes("json"))return t(),j("Format invalide","OK",()=>{});e.addEventListener("load",o=>{const i=e.result??"";if(typeof i!="string"||i==="")return t(),j("Fichier invalide","OK",()=>{});try{z(y.fromJSON(i))}catch(r){return console.log(r),t(),r instanceof TypeError?j("Ce fichier n'est pas compatible avec la version actuelle du programme.","OK",()=>{}):j("Fichier invalide","OK",()=>{})}t()}),e.readAsText(n)}a("analyse_fichier_input").addEventListener("change",s=>{const e=s.target;K(e.files)});a("analyse_fichier_input_form").addEventListener("drop",s=>{var e;K((e=s.dataTransfer)==null?void 0:e.files)});he();J();Le();
