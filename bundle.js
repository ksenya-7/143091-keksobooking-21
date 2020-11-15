(()=>{"use strict";(()=>{const e=(e,t)=>Math.floor(e+Math.random()*(t+1-e));window.utils={isEscape:e=>"Escape"===e.key,isEnter:e=>"Enter"===e.key,getRandom:e,getRandomFrom:t=>t[e(0,t.length-1)],shuffleElements:e=>{const t=e.slice();for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[t[e],t[o]]=[t[o],t[e]]}return t}}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o={400:"Неверный запрос",401:"Пользователь не авторизован",404:"Ничего не найдено",500:"Internal Server Error"},r=(e,t,r)=>{let n;switch(e.status){case 200:t(e.response);break;case e.status:n=o[e.status];break;default:n="Cтатус ответа: : "+e.status+" "+e.statusText}n&&r(n)},n=(e,t,o,n,a)=>{const l=new XMLHttpRequest;l.responseType="json",l.addEventListener("load",r.bind(null,l,t,o)),l.timeout=5e3,l.addEventListener("timeout",(()=>{o("Запрос не успел выполниться за "+l.timeout+"мс")})),l.addEventListener("error",(()=>{window.error.onLoadErrorMessage()})),l.open(e,n),l.send(a)};window.backend={load:(t,o)=>{n("GET",t,o,e)},save:(e,o,r)=>{n("POST",o,r,t,e)}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=document.querySelector("main"),t=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),o=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),r=o.querySelector(".error__button"),n=o.querySelector(".error__message"),a=(e,t,o)=>{e.remove(),document.removeEventListener("keydown",t),document.removeEventListener("mousedown",o)},l=e=>{window.utils.isEscape(e)&&(e.preventDefault(),a(t,l,u))},u=e=>{e.preventDefault(),a(t,l,u)},c=()=>{a(o,d,s)},d=e=>{window.utils.isEscape(e)&&(e.preventDefault(),a(o,d,s))},s=e=>{e.preventDefault(),a(o,d,s)};window.error={onLoadSuccessMessage:()=>{e.append(t),document.addEventListener("keydown",l),document.addEventListener("mousedown",u)},onLoadErrorMessage:t=>{n.textContent=t,e.append(o),r.addEventListener("click",c),document.addEventListener("keydown",d),document.addEventListener("mousedown",s)},onLoadFormErrorMessage:()=>{var t,n,a,l,u;t=o,n=r,a=c,l=d,u=s,e.append(t),n.addEventListener("click",a),document.addEventListener("keydown",l),document.addEventListener("mousedown",u)}}})(),(()=>{let e=null,t=null;const o=t=>{window.utils.isEscape(t)&&e.classList.add("hidden"),document.removeEventListener("keydown",o),document.removeEventListener("click",r)},r=()=>{e.remove(),document.removeEventListener("keydown",o),document.removeEventListener("click",r)};window.openCards=(n,a)=>{let l=n.slice();for(let n=0;n<a.length;n++)a[n].addEventListener("click",(()=>{null!==e&&e.remove(),window.renderCard(l[n]),e=document.querySelector(".map__card"),t=e.querySelector(".popup__close"),t.addEventListener("click",r),document.addEventListener("keydown",o)}))}})(),(()=>{const e=["popup__title","popup__text--address","popup__text--price","popup__type","popup__text--capacity","popup__text--time","popup__features","popup__description","popup__photos","popup__avatar"],t=document.querySelector(".map__filters-container"),o=document.querySelector("#card").content.querySelector(".map__card"),r=o.querySelector(".popup__photo"),n={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"};window.renderCard=a=>{const l=o.cloneNode(!0);l.querySelector(".popup__title").textContent=a.offer.title,l.querySelector(".popup__text--address").textContent=a.offer.address,l.querySelector(".popup__text--price").textContent=a.offer.price+"₽/ночь",l.querySelector(".popup__type").textContent=n[a.offer.type],l.querySelector(".popup__text--capacity").textContent=`${a.offer.rooms} комнаты для ${a.offer.guests} гостей.`,l.querySelector(".popup__text--time").textContent=`Заезд после ${a.offer.checkin}, выезд до ${a.offer.checkout}.`,l.querySelector(".popup__features").innerHTML="",((e,t)=>{const o=document.createDocumentFragment();e.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature"),t.classList.add("popup__feature--"+e),o.append(t)})),t.append(o)})(a.offer.features,l.querySelector(".popup__features")),l.querySelector(".popup__description").textContent=a.offer.description,l.querySelector(".popup__photos").innerHTML="",((e,t)=>{const o=document.createDocumentFragment();e.forEach((e=>{const t=r.cloneNode(!0);t.src=e,o.append(t)})),t.append(o)})(a.offer.photos,l.querySelector(".popup__photos")),e.forEach((e=>{""===l.querySelector("."+e).innerHTML&&(l.querySelector("."+e).style.display="none")})),l.querySelector(".popup__avatar").src=a.author.avatar,l.querySelector(".popup__avatar").style.display="block",t.insertAdjacentElement("beforeBegin",l)}})(),(()=>{const e=document.querySelector(".map").querySelector(".map__pins"),t=e=>{const t=document.querySelector("#pin").content.querySelector(".map__pin").cloneNode(!0);return t.style=`left: ${e.location.x-25}px; top: ${e.location.y-70}px;`,t.querySelector("img").src=e.author.avatar,t.querySelector("img").alt=e.offer.title,null===e.offer||void 0===e.offer?null:t};window.renderPins=o=>{const r=o.slice(0,5);document.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>e.remove())),document.querySelectorAll(".popup").forEach((e=>e.remove()));const n=document.createDocumentFragment();r.map(t).forEach((e=>n.append(e))),e.append(n);const a=document.querySelectorAll(".map__pin:not(.map__pin--main)");window.openCards(o,a)}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector("#address");e.addEventListener("mousedown",(o=>{o.preventDefault();let r={x:o.clientX,y:o.clientY};const n=(e,t)=>Math.floor(parseInt(e,10)+32.5)+", "+Math.floor(parseInt(t,10)+87),a=o=>{o.preventDefault();let a=r.x-o.clientX,l=r.y-o.clientY;r={x:o.clientX,y:o.clientY},e.offsetTop-l>543?e.style.top="543px":e.offsetTop-l<43?e.style.top="43px":(e.style.top=e.offsetTop-l+"px",t.value=n(e.style.left,e.style.top)),e.offsetLeft-a>1168.5?e.style.left="1168.5px":e.offsetLeft-a<-32.5?e.style.left="-32.5px":(e.style.left=e.offsetLeft-a+"px",t.value=n(e.style.left,e.style.top))},l=o=>{o.preventDefault(),t.value=n(e.style.left,e.style.top),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",l)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",l)}))})(),(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),o=e.querySelector("#housing-price"),r=e.querySelector("#housing-rooms"),n=e.querySelector("#housing-guests"),a=e.querySelector("#housing-features"),l=e=>"any"===t.value||t.value===e.offer.type,u=e=>{const t=parseInt(e.offer.price,10);let r=!0;switch(o.value){case"any":r=!0;break;case"middle":r=t>=1e4&&t<=5e4;break;case"low":r=t<1e4;break;case"high":r=t>5e4}return r},c=e=>"any"===r.value||parseInt(r.value,10)===e.offer.rooms,d=e=>"any"===n.value||parseInt(n.value,10)===e.offer.guests,s=e=>{const t=e.offer.features,o=a.querySelectorAll("input[type=checkbox]:checked");return[].map.call(o,(e=>e.value)).every((e=>t.includes(e)))},i=window.debounce(window.renderPins);window.filtersHandler=t=>{e.addEventListener("change",(()=>{const e=t.filter(l).filter(u).filter(c).filter(d).filter(s);i(e)}))}})(),(()=>{const e=document.querySelectorAll(".map__filter"),t=document.querySelectorAll(".map__checkbox"),o={LEFT:parseInt(document.querySelector(".map__pin--main").style.left,10)+32.5,TOP_INITIAL:parseInt(document.querySelector(".map__pin--main").style.top,10)+32.5,TOP:parseInt(document.querySelector(".map__pin--main").style.top,10)+87},r=e=>{for(let t of e)"INPUT"===t.tagName?t.setAttribute("disabled","disabled"):t.setAttribute("disabled","true")};window.disactivatePage=()=>{document.querySelector(".ad-form").classList.add("ad-form--disabled"),document.querySelector(".map").classList.add("map--faded"),document.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>e.remove())),r(document.querySelector(".ad-form").children),r(e),r(t),document.querySelector("#address").value=Math.round(o.LEFT)+", "+Math.round(o.TOP_INITIAL),document.querySelector(".map__pin--main").style.left="570px",document.querySelector(".map__pin--main").style.top="375px",document.querySelector("#address").setAttribute("readonly","readonly"),document.querySelector(".map__pin--main").addEventListener("mousedown",window.onMouseDown)}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#title"),o=e.querySelector("#type"),r=e.querySelector("#price"),n=e.querySelector("#capacity"),a=e.querySelector("#room_number"),l=e.querySelector("#timein"),u=e.querySelector("#timeout"),c={bungalow:0,flat:1e3,house:5e3,palace:1e4},d={bungalow:"«Бунгало» — минимальная цена за ночь 0",flat:"«Квартира» — минимальная цена за ночь 1 000",house:"«Дом» — минимальная цена 5 000",palace:"«Дворец» — минимальная цена 10 000"},s={1:"1 комната — «для 1 гостя»",2:"2 комнаты — «для 2 гостей» или «для 1 гостя»",3:"3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»",100:"100 комнат — «не для гостей»"},i={1:[1],2:[1,2],3:[1,2,3],100:[0]};let p=n.value,m=a.value,y=t.value,_=o.value,f=r.value,v=l.value,S=u.value;n.addEventListener("change",(()=>(p=n.value,n.setCustomValidity(""),n.style.outline="none",n.reportValidity(),p))),a.addEventListener("change",(()=>(m=a.value,n.setCustomValidity(""),n.style.outline="none",a.reportValidity(),m))),t.addEventListener("input",(e=>{y=t.value,y.length<30?(t.setCustomValidity(`Минимальная длина заголовка объявления 30 символов. Допишите ещё ${30-y.length} симв.`),t.style.outline="2px solid orange",e.preventDefault()):y.length>100?(t.setCustomValidity(`Максимальная длина заголовка объявления 100 символов. Удалите лишние ${y.length-100} симв.`),t.style.outline="2px solid orange",e.preventDefault()):(t.setCustomValidity(""),t.style.outline="none",y=t.value),t.reportValidity()})),o.addEventListener("change",(()=>(_=o.value,r.placeholder=c[""+_],r.setCustomValidity(""),r.style.outline="none",o.reportValidity(),_))),r.addEventListener("change",(()=>(f=r.value,r.placeholder=c[""+_],r.setCustomValidity(""),r.style.outline="none",r.reportValidity(),f)));let q=v===S;l.addEventListener("change",(()=>{v=l.value,S=u.value,q=v===S,q?(u.setCustomValidity(""),u.style.outline="none"):u.value=v})),u.addEventListener("change",(()=>{v=l.value,S=u.value,q=v===S,q?(u.setCustomValidity(""),u.style.outline="none"):l.value=S})),window.form={onAdFormSubmit:()=>{i[""+m].some((e=>parseInt(e,10)===parseInt(p,10)))?f>=c[""+_]?y.length<30||y.length>100?(t.setCustomValidity("Длина заголовка объявления от 30 до 100 символов."),t.style.outline="2px solid orange"):window.backend.save(new FormData(e),(()=>{window.disactivatePage(),window.error.onLoadSuccessMessage()}),window.error.onLoadFormErrorMessage):(r.setCustomValidity(d[_]),r.placeholder=c[""+_],r.style.outline="2px solid orange"):(n.setCustomValidity(s[m]),n.style.outline="2px solid orange"),e.reportValidity()},priceTypeValue:c}})(),(()=>{const e=document.querySelector(".ad-form").children,t=document.querySelectorAll("select"),o=document.querySelectorAll("input"),r=document.querySelector(".ad-form__reset"),n={LEFT:parseInt(document.querySelector(".map__pin--main").style.left,10)+32.5,TOP_INITIAL:parseInt(document.querySelector(".map__pin--main").style.top,10)+32.5,TOP:parseInt(document.querySelector(".map__pin--main").style.top,10)+87},a={bungalow:0,flat:1e3,house:5e3,palace:1e4};document.querySelector("#address").value=Math.round(n.LEFT)+", "+Math.round(n.TOP_INITIAL);let l=document.querySelector("#type").value;document.querySelector("#price").placeholder=a[l];const u=e=>{for(let t of e)"INPUT"===t.tagName?t.removeAttribute("disabled","disabled"):t.removeAttribute("disabled","true")};let c=[];const d=e=>{c=e.slice(),window.renderPins(c),window.filtersHandler(c)},s=()=>{window.backend.load(d,window.error.onLoadErrorMessage),document.querySelector(".ad-form").classList.remove("ad-form--disabled"),document.querySelector(".map").classList.remove("map--faded"),u(e),u(t),u(o),document.querySelector(".map__pin--main").querySelector("img").draggable="true",document.querySelector(".map__pin--main").removeEventListener("click",i),document.querySelector(".map__pin--main").removeEventListener("keydown",p)},i=e=>{0===e.button&&s()},p=e=>{e.preventDefault(),window.utils.isEnter(e)&&s()};document.querySelector(".map__pin--main").addEventListener("click",i),document.querySelector(".map__pin--main").addEventListener("keydown",p),document.querySelector(".ad-form").addEventListener("submit",(e=>{e.preventDefault(),window.form.onAdFormSubmit(),document.querySelector(".map__filters").reset(),document.querySelector(".ad-form").reset(),window.disactivatePage(),document.querySelector("#price").placeholder=a[l],document.querySelector(".map__pin--main").addEventListener("click",i),document.querySelector(".map__pin--main").addEventListener("keydown",p)})),r.addEventListener("click",(e=>{e.preventDefault(),document.querySelector(".map__filters").reset(),document.querySelector(".ad-form").reset(),window.disactivatePage(),document.querySelector("#price").placeholder=a[l],document.querySelector(".map__pin--main").addEventListener("click",i),document.querySelector(".map__pin--main").addEventListener("keydown",p)})),r.addEventListener("keydown",(e=>{e.preventDefault(),window.utils.isEnter(e)&&(document.querySelector(".map__filters").reset(),document.querySelector(".ad-form").reset(),window.disactivatePage(),document.querySelector("#price").placeholder=a[l],document.querySelector(".map__pin--main").addEventListener("click",i),document.querySelector(".map__pin--main").addEventListener("keydown",p))}))})()})();