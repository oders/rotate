// Definiert update_config(), welche bei Aufruf die CONFIGDATEI via XMLHTTPRequest lädt und deren Inhalt zurückgibt

// Definiert loadScript(location), welche bei ihrem Aufruf die Datei unter location als config_Script lädt, bzw. neu lädt.
// Diese enthält einen Array namens "seitenliste", in dem die gesamte Seitenliste enthalten ist.

function loadScript(location) {
    // Check for existing script element and delete it if it exists
    var js = document.getElementById("config_Script");
    if(js) {
        console.log(js);
        console.log(document);
        js.parentElement.removeChild(js);
        console.info("---------- Konfiguration.js entfernt ----------");
    }

    // Create new script element and load a script into it
    js = document.createElement("script");
    js.src = location;
    js.id = "config_Script";
    document.body.appendChild(js);
    console.info("---------- Konfiguration.js neu geladen ----------");
}

/*
var CONFIGDATEI = "Konfiguration.js";

var test = "leer";

console.log("config_imp.js ..geladen");
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


function update_config() {
var request = new XMLHttpRequest();
request.open("GET",CONFIGDATEI,true);
request.responseType= "text";
request.onerror = function () {
    console.log("Fehler: request nicht erfolgreich");
}
request.onload = function () {
    console.log("request onload");
    test = request.response;
    console.log (request.response);
}
request.send();
return request.response;
}

//update_config();
*/