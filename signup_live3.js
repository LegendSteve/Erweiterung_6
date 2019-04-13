function Text_Eingeben(element_id, text){
    //Das Element fokussieren
    $("#"+element_id).focus();
    $("#"+element_id).focusin();
    $("#"+element_id).click();

    //Variablen für KeyDown/Up
    var kdown = jQuery.Event("keydown");
    var kup = jQuery.Event("keyup");

    //Den Text zu einem Array aus einzelnen Buchstaben machen
    var text_array = text.split("");
    console.log(text_array);

    //Durch alle Buchstaben gehen
    for(i = 0; i < text_array.length; i++){

        //Den Keycode des Buchstaben herausfinden & dem KeyDown/Up sagen
        var code = text_array[i].charCodeAt(0);
        kdown.which = code;
        kup.which = code;

        //KeyDown auslösen
        $("#"+element_id).trigger(kdown);
        //Es auch wirklich hinschreiben
        $("#"+element_id).change();
        document.getElementById(element_id).value += text_array[i];
        //KeyUp auslösen
        $("#"+element_id).trigger(kup).delay(1000);        
    }
    $("#"+element_id).blur();
    $("#"+element_id).focusout();
}

function Text_Eingeben2(element_id, text){
    //Das Element fokussieren
    $("#"+element_id).click();
    $("#"+element_id).focus();
    $("#"+element_id).focusin();

    $("#"+element_id).change();

    document.getElementById(element_id).value = text;

    
    $("#"+element_id).blur();
    $("#"+element_id).focusout();
}

function Select_Auswählen(element_id, value){
    $("#"+element_id).val(value).change();
    return true;
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
   
function random_zahl(minimum, maximum){
    zahl = Math.floor(Math.random() * (maximum - minimum)) + minimum;
    console.log(zahl);
    return zahl;
}

async function Eingeben(){
    $("#iSignupAction").click();
    await sleep(500);
    Text_Eingeben("PasswordInput","awd9812zHADhao");
    $("#iSignupAction").click();
    await sleep(500);
    Text_Eingeben("FirstName", "Mohammed");
    Text_Eingeben("LastName", "Mahghandi");
    $("#iSignupAction").click();
    await sleep(500);
    Select_Auswählen("BirthDay", random_zahl(1, 30))
    Select_Auswählen("BirthMonth", random_zahl(1, 12))
    Select_Auswählen("BirthYear", random_zahl(1980, 1999))
    $("#iSignupAction").click();
    await sleep(5000);
    window.open("https://www.minuteinbox.com/email/id/2?get-zahl");

    //window.opener.postMessage("Bild: "+$("img[aria-label='Visuelles Captcha']").attr("src"), "file:///C:/Users/Stefan/Desktop/Speicher%20Manager%202/index.html");
}

async function receiveMessage(event){
    if(event.data.includes("Zahl: ") == false)
    return;
    var zahl = event.data.replace("Zahl: ", "");
    sessionStorage.setItem("Zahl", zahl);
    Text_Eingeben("VerificationCode", zahl);
    Text_Eingeben2("VerificationCode", zahl);
    $("#iSignupAction").click();
    await sleep(2500);
    window.opener.postMessage("Bild: "+$("img[aria-label='Visuelles Captcha']").attr("src"), "file:///C:/Users/Stefan/Desktop/Speicher%20Manager%203/index.html");
}

window.addEventListener("message", receiveMessage, false);

function setZahl(){
    var zahl = sessionStorage.getItem("zahl");
} 

//var zahl = $('tr').find('td:contains("Verwenden Sie zum Bestätigen Ihrer E-Mail-Adresse den folgenden Sicherheitscode: ")').children()[0].innerHTML;
//https://raw.githack.com/LegendSteve/SpeicherManager_1/master/signup_live.js