function initMap() {
    let mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    let marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
    })
}
if(document.querySelector("#map")){
    initMap();
}

/////////////////////////////////////////////////////////////////////////////

const formContact = document.querySelector(".form__contact");

formContact.addEventListener("submit", function(e){
    formSend(e, this);
})

function formSend(e, form) {
    let errors = formValidate(form);

    if(errors > 0){
        e.preventDefault();
    }
}

function formValidate(form) {
    let errors = 0;
    const reqInputs = form.querySelectorAll("._req");

    for(let reqInput of reqInputs){

        removeErrorInput(reqInput);

        if(reqInput.classList.contains("_email") && emailTest(reqInput)){
            addErrorInput(reqInput);
            errors++;

        } else if(!reqInput.value){
            addErrorInput(reqInput);
            errors++;
        }

    }

    return errors;
}

function addErrorInput(input){
    input.classList.add("_err");
}

function removeErrorInput(input){
    input.classList.remove("_err");
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); // Если e-mail не правильный, то выдает true
}

/////////////////////////////////////////////////////////////////////////////

let md2 = window.matchMedia('(max-width: 992.98px)');

const headerLang = document.querySelector(".header__lang");
const headerBottomColFirst = document.querySelector(".header__bottom-col.first");
const headerBottomColThird = document.querySelector(".header__bottom-col.third");
const menuBody = document.querySelector(".menu__body");


checkScreen(md2);
md2.addListener(checkScreen);


function checkScreen(e){
    if(e.matches){
        moveElemTo(headerLang, menuBody);
        moveElemTo(headerBottomColFirst, menuBody);
        moveElemTo(headerBottomColThird, menuBody);
    }else{
        if(document.querySelector(".done")){
            moveElemBackPrep(headerLang, document.querySelector(".header__top-col"))
            moveElemBackPrep(headerBottomColFirst, document.querySelector(".header__bottom"))
            moveElemBackAp(headerBottomColThird, document.querySelector(".header__bottom"));
        }
    }
}


function moveElemTo(elem, to) {
    to.append(elem);
    elem.classList.add("done");
}
function moveElemBackAp(elem, to) {
    to.append(elem);
    elem.classList.remove("done");
}
function moveElemBackPrep(elem, to) {
    to.prepend(elem);
    elem.classList.remove("done");
}


/////////////////////////////////////////////////////////////////////////////

const menuBurger = document.querySelector(".menu__icon");

menuBurger.addEventListener("click", function() {
    menuBurger.classList.toggle("active");
    menuBody.classList.toggle("active");
    document.body.classList.toggle("lock");
})