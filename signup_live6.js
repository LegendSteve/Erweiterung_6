Variationen = "qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM12345678901234567890"

function getPasswort(länge){
    pw = "";
    for(i = 0; i < länge; i++){
        zahl = Math.floor(Math.random() * Variationen.length);
        pw += Variationen.charAt(zahl);
    }
    return pw;
}

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
    email = location.search.split("&")[1].replace("email=","").replace("%40","@")
    vorname = email.split("@")[0].split(".")[0]
    nachname = email.split("@")[0].split(".")[1]
    passwort = getPasswort(16);
    gb_tt = random_zahl(1, 30);
    gb_mm = random_zahl(1, 12);
    gb_jj = random_zahl(1980, 1999);

    $("#iSignupAction").click();
    await sleep(500);
    Text_Eingeben("PasswordInput",passwort);
    $("#iSignupAction").click();
    await sleep(500);
    Text_Eingeben("FirstName", vorname);
    Text_Eingeben("LastName", nachname);
    $("#iSignupAction").click();
    await sleep(500);
    Select_Auswählen("BirthDay", gb_tt);
    Select_Auswählen("BirthMonth", gb_mm);
    Select_Auswählen("BirthYear", gb_jj);
    $("#iSignupAction").click();
    await sleep(5000);
    window.open("https://www.minuteinbox.com/email/id/2?get-zahl",
    "awhdaohwdaohdawjdaji",
    "width=1,height=1,screenX=0,screenY=0");
    
    //window.opener.postMessage("Bild: "+$("img[aria-label='Visuelles Captcha']").attr("src"), "file:///C:/Users/Stefan/Desktop/Speicher%20Manager%202/index.html");
}

async function receiveMessage(event){
    if(event.data.includes("Zahl: ")){
        var zahl = event.data.replace("Zahl: ", "");
        sessionStorage.setItem("Zahl", zahl);
        Text_Eingeben("VerificationCode", zahl);
        Text_Eingeben2("VerificationCode", zahl);
        $("#iSignupAction").click();
        await sleep(2500);
        window.opener.postMessage("Bild: "+$("img[aria-label='Visuelles Captcha']").attr("src"), "file:///C:/Users/Stefan/Desktop/Speicher%20Manager%203/index.html");
    }
    if(event.data.includes("Verification: ")){
        var ver = event.data.replace("Verification: ","");
        id = $("input[aria-label='Geben Sie die Zeichen ein, die Sie sehen.']")[0].id;
        Text_Eingeben(id, ver);
        window.opener.postMessage("Account: "+email+","+vorname+","+nachname+","+passwort+","+gb_tt+","+gb_mm+","+gb_jj, "file:///C:/Users/Stefan/Desktop/Speicher%20Manager%203/index.html");
        $("#iSignupAction").click();
    }
}

window.addEventListener("message", receiveMessage, false);

//var zahl = $('tr').find('td:contains("Verwenden Sie zum Bestätigen Ihrer E-Mail-Adresse den folgenden Sicherheitscode: ")').children()[0].innerHTML;
//https://raw.githack.com/LegendSteve/SpeicherManager_1/master/signup_live.js
onPageLoad()

function onPageLoad(){
    sleep(5000);
    Eingeben();
}
