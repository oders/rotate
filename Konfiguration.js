/* 

    ANLEITUNG Konfiguration.js

    Dies ist die Konfigurationsdatei. 
    Hier werden alle Seiten mitsamt ihrer Anzeigedauer und einem optionalen Skript, das in der Seite ausgeführt wird, eingetragen.
    Außerdem sind hier einige Einstellungen, wie die Standardanzeigendauer gespeichert.

    Die Datei ist als Javascript Datei konzipiert und wird von der Rotations-Rahmenseite geladen. Die Einstellungen sind daher jeweils als Javascript Variablen definiert.

    Mit // können Zeilen als Kommentar markiert bzw. ignoriert werden

    1) Seitenliste
    Dieses Array enthält die Liste der anzuzeigenden Seiten in ihrer Reihenfolge. Der Syntax ist: 
    
    [Seitenname, Anzeigendauer, opt. Skript]

    als Beispiel: ["url",5000,"skript123.js"].
    (zwischen den einzelnen Seiten das Komma nicht vergessen! Die [] sind ebenfalls unerlässlich)

    Seitenname: entweder eine lokale Url, oder eine Internetadresse
    Anzeigedauer: in Millisekunden. Falls nichts angegeben wird, wird der Wert von "standarddelay" verwendet, das ebenfalls in dieser Datei festgelegt
    Skript: Es kann ein Skript angegeben werden, das die aufgerufene Seite (bevor sie angezeigt wird) verändert. Dieses wird in die Seite injeziert und wirkt dort genauso, als wäre es direkt dort eingebaut gewesen.

    
    2) Einstellungen
    CONFIGINTERVAL: diese Datei wird alle x Millisekunden neu eingelesen

    standarddelay: Die Anzeigezeit für Seiten, bei denen keine angegeben wurde
    
    Bsp 2: Es wird keine Anzeigezeit angegeben
    ["astaseite.html",,"astaskript.js"]
*/


var Seitenliste = [["page1.htm",4000,""],["page2.htm",4000,""],
    //["http://www.gmail.com",2000,""],
   // ["http://www.uni-greifswald.de",2000,"unigw.js"],
   // ["http://www.asta-kit.de",3000,""],
   // ["http://www.sueddeutsche.de",5000],
    //["ht."] // fehlerhafte Urls schafft er noch nicht!
];

var CONFIGINTERVAL = 40000; // Alle x Millisekunden  wird diese Datei neu eingelesen

/* Anzeigezeit einer Seite, sofern in der Konfigurationsdatei nichts anderes angegeben ist */
var standarddelay = 3000;