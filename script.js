                                                            // "." 
                                                                // greife auf etwas zu
                                                                // oder nutze eine Eigenschaft oder Funktion von etwas
                                                            // "+"
                                                                // wird genutzt zum addieren
                                                                // um Strings miteinander ohne Leerzeichen zu verbinden. 
                                                                    // Wird ein String erkannt, so werden Zahlen, die angeklebt werden sollen zu Text umgewandelt
                                                            // "Funktion(Werte die in Funktion reinfließen, sodass darin mit ihnen gearbeitet werden kann)"
                                                            // Objekt.Funktion oder Objekt.leseEigenschaften
                                                                //Also wende Funktion auf Objekt an oder lese Eigenschaften von Objekt

//########################################
//          Variablendefinition
//######################################## 

const modal = document.querySelector("#taskModal");         //Suche das Eelment mit der id="taskModal". Die Variable modal enthält jetzt das komplette Modal HTML-Element
const modalTitle = document.querySelector("#modalTitle");   //Unterschied querySelector und querySelectoAll. Ohne "All" keine Liste, sondern einzelne Elemente
const modalClose = document.querySelector("#modalClose");

const tasks = document.querySelectorAll(".task");           //const = speichert etwas in einer Variable. Nicht nachträglich neu beschreibbar. "let" dürfte nachträglich im Code geändert werden.
                                                            //tasks  = Name der Variable. Es ist ein Objekt oder eine NodeList

                                                            //document = deine komplette HTML-Seite
                                                            //querySelectorALL = suche alle passenden Elemente
                                                            //".task" = alle Elemente mit Klasse task

                                                            //Suche alle Task-Karten auf der Seite und speichere sie als Liste unter tasks.

//########################################
//                  MODAL
//########################################    

tasks.forEach((task) => 
{
    task.addEventListener("click", () =>                    //Die Funktion wird ausgeführt, sobald ein Klick auf einen Task erfolgt ==> wende Event Listener auf task. an
    {
        modalTitle.innerText = task.innerText;              //Nimm den Text des angeklickten Tasks und schreibe ihn in die Modal-Überschrift
        modal.classList.add("open");                        //Füge der Klassenliste des Modals die CSS-Klasse "open" hinzu. Die ClassList besteht aus allen Klassen bspw. eines Containers.
    });
});

modalClose.addEventListener("click", () =>
{
    modal.classList.remove("open");
});

//########################################
//TASKS EDITIERBAR UND SPEICHERN DER TASKS
//########################################

console.log(tasks);                                         //Zeige mir in der Konsole, was gefunden wurde.

tasks.forEach((task, index) =>                              //tasks = deine Liste
                                                            //.forEach = gehe jedes Element einzeln durch
                                                            //task = Eingabewert der Funktion (Parameter). Der aktuelle einzelne Task
                                                            //index = die Nummer dieses Tasks. Erster Task hat index 0
                                                            //=> = Hier beginnt die Funktion und wird definiert. Code der später ausgeführt werden soll
                                                            // links von => was kommt rein, rechts von => was soll damit passieren?
                                                            //{} = Code der Funktion. Hier kommt rein, was mit jedem Task passieren soll
                                                            
                                                            //Gehe alle Tasks nacheinander durch.
{
    task.contentEditable = true;                            //.contentEditable = Eigenschaft: darf der Inhalt bearbeitet werden?
                                                            //task = aktueller einzelner Task
                                                            //= true = ja 

    const storageKey = "task-" + index;                     //string "task-" wird durch + mit index zu einem zusammenhängenden String zusammengesetzt. Der Index wird dabei zu Text umgebaut.
                                                            //Die Variable wird innerhalb der Schleife definiert (lokale Variable), da für jeden Task eine gesonderte Speichervariable definiert werden soll                       
    const savedText = localStorage.getItem(storageKey);     //Hole den Text von Task 0-x aus dem lokalen Speicher und weise ihn der Variable savedText zu
    
    if (savedText !== null)                                 // != null  = es existiert nichts (kein Text / kein Wert gefunden)
    {
        task.innerText = savedText;                         //task.innerText = sichtbarer Wert von task 0-x
                                                            //lade den Text aus dem lokalen Speicher in den sichtbaren Bereich
    }
    
    task.addEventListener("input", () =>                    //Argumente für die Funktion sind "input" und ()
                                                            //"input" = Auf welches Ereignis soll gehört werden
                                                            //"input" = Trigger um Funktion auszulösen
                                                            //Funktion erst auslößen, wenn Inhalt verändert wurde 
                                                            //(), die Funktion erwartet keine Eingabewerte
    {
        localStorage.setItem(storageKey, task.innerText);   //localStorage = Keine Variable, sondern eingebautes Browser-Objekt
                                                            //setItem = speichere etwas
                                                            //storageKey = Speichername z.B. task-0
                                                            //task.innerText = der sichtbare Text im aktuellen Task
                                                            //Speichere den aktuellen Text dieses Tasks unter seinem eigenen Namen im Browser
    });
    
});                                
                                                            



// ########## TO-DO ###########

//Code nochmal verstehen
//Blinken der Tasks bei Reload fixen
//Tasks durch anklicken im Vordergrund öffnen
//Neue Tasks durch Nutzer hinzufügen
