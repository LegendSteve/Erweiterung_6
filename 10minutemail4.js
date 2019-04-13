/*script = document.createElement("script");
script.innerHTML = "function receiveMessage(event){if(event.data != 'Zahl bekommen')return;var zahl = $('tr').find('td:contains('Verwenden Sie zum Bestätigen Ihrer E-Mail-Adresse den folgenden Sicherheitscode: ')').children()[0].innerHTML; event.source.postMessage('Zahl: '+zahl, event.origin); window.close();} window.addEventListener('message', receiveMessage, false);";
document.body.appendChild(script);*/

if(getZahl() == false){getEmail()}

function getEmail(){
    email = $("#email").html();
    window.opener.postMessage("Email: "+email, "file:///C:/Users/Stefan/Desktop/Speicher%20Manager%203/index.html");
}

function getZahl(){
    if(!location.search.includes('get-zahl')){return false}
    var zahl = document.getElementsByTagName('span')[0].innerHTML;
    window.opener.postMessage('Zahl: '+zahl, 'https://signup.live.com');
    window.close()
}

//https://raw.githack.com/LegendSteve/SpeicherManager_1/master/10minutemail.js