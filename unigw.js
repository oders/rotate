var outputContent = function() {

    var html_ = this.scripts    ; //document.body.innerHTML;
    console.log("html", html_);
    var rahmen = document.getElementsByClassName("main-content")[0];

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
    //console.log(rahmen);
    //var neuerInhalt = document.getElementById("c1044877").innerHTML;
    //rahmen.innerHTML = neuerInhalt;
    //document.body.innerHTML = neuerInhalt;

}

outputContent();


