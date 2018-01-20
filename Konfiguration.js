var Seitenliste = [
    ["page1.htm",5000,""],
    ["http://www.uni-greifswald.de",2000,"unigw.js"],
    ["page2.htm",3000,""],
    ["page3.htm",5000],
    //["ht."] //das schafft er noch nicht!
];

var CONFIGINTERVAL = 40000; // Alle x Sekunden wird die Seitenliste abgerufen

/* Anzeigezeit einer Seite, sofern in der Konfigurationsdatei nichts anderes angegeben ist */
var standarddelay = 3000;