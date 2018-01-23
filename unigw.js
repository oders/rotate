/*
    Beispiel-Injektions-Skript:
    
    Footer und Header der Uniseite werden ausgeblendet.

*/

var outputContent = function() {

    /* Elemente ausblenden */
    var Ausgeblendete = [];
   
    function displayNone(el) {
        // Blendet ein DOM-Objekt aus, 
        // speichert den Original-Displaywert in *.style.orgDisplay und 
        // fügt es der Liste der Ausgeblendeten Ojekte hinzu 
        if (typeof(el) == "object") { // check
            el.style.orgDisplay = el.style.display == "undefined" ? "" : el.style.display;
            Ausgeblendete.push(el);
            el.style.display = "none";
        }
    }

    displayNone(document.getElementsByTagName("Header")[0]);
    displayNone(document.getElementsByTagName("Footer")[0]);
    //console.log(rahmen);
    
    //var rahmen = document.getElementsByClassName("main-content")[0];
    //var neuerInhalt = document.getElementById("c1044877").innerHTML;
    //rahmen.innerHTML = neuerInhalt;
    //document.body.innerHTML = neuerInhalt;

}

outputContent();


