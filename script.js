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
                                                                            // Funktion "forEach"
                                                                            //Eingangsparameter 1 = Element, 2 = Index, 3 = Liste (Array). Diese können frei beannt werden
                                                                                                                                                        //!Schleife wird immer bei Neuladen der Seite ausgeführt. 
                                                                            //!Die enthaltenen Event-Listener werden gesetzt und bleiben aktiv, sobald Seite erstmalig geladen
                                                                            //taskTitles = deine Liste
                                                                            //.forEach = gehe jedes Element einzeln durch
                                                                            //taskTitle = Eingabewert der Funktion (Parameter).Wird von "forEach" aus taskTitles befüllt. Der aktuelle einzelne Task-Titel
                                                                            //index = die Nummer dieses Tasks. Erster Task hat index 0. (2ter Eingabeparameter ist Index, kann aber anders benannt werden)
                                                                            //=> = Hier beginnt die Funktion und wird definiert. Code der später ausgeführt werden soll
                                                                            // links von => was kommt rein, rechts von => was soll damit passieren?
                                                                            //{} = Code der Funktion. Hier kommt rein, was mit jedem Task passieren soll

//########################################
//          Variablendefinition
//######################################## 

const tasks = document.querySelectorAll(".task");
const taskTitles = document.querySelectorAll(".task-title");                //const = speichert etwas in einer Variable. Nicht nachträglich neu beschreibbar. "let" dürfte nachträglich im Code geändert werden.
                                                                            //taskTitles  = Name der Variable. Es ist ein Objekt oder eine NodeList

                                                                            //document = deine komplette HTML-Seite
                                                                            //querySelectorALL = suche alle passenden Elemente
                                                                            //".task-title" = alle Elemente mit Klasse task-title

                                                                            //Suche alle Task-Karten auf der Seite und speichere sie als Liste unter taskTitles.
let currentTask = null; 
let currentIndex = null;

const modal = document.querySelector("#taskModal");                         //Suche das Eelment mit der id="taskModal". Die Variable modal enthält jetzt das komplette Modal HTML-Element
const modalTitle = document.querySelector("#modalTitle");                   //Unterschied querySelector und querySelectoAll. Ohne "All" keine Liste, sondern einzelne Elemente
const modalClose = document.querySelector("#modalClose");

let mouseDownOnModalBackground = false;

const modalLocation = document.querySelector("#modalLocation");

//########################################
//          Gobale Functionen
//########################################

function definiereStorageKeys(index)
{
    const taskTitleStorageKey = "taskTitle-" + index;                       //string "taskTitle-" wird durch + mit index zu einem zusammenhängenden String zusammengesetzt. Der Index wird dabei zu Text umgebaut.
    const taskDateStorageKey = "taskDate-" + index;                         //Die Variable wird innerhalb der Schleife definiert (lokale Variable), da für jeden Task eine gesonderte Speichervariable definiert werden soll 
    const taskLocationStorageKey = "taskLocation-" + index;                 //storageKey = Speichername z.B. taskTitle-0                                                   
    const taskLinkStorageKey = "taskLink-" + index;                         //Speichere den aktuellen Text dieses Tasks unter seinem eigenen Namen im Browser
    
    return{
        taskTitleStorageKey,
        taskDateStorageKey,
        taskLocationStorageKey,
        taskLinkStorageKey
    };  
}

function formatiereDatumFuerAnzeige(datum)
{
    if (datum === "")
    {
        return "";
    }

    const teile = datum.split("-");                                     //Wende "split" auf datum an. Split sucht jedes "-" und trennt string an den Stellen auf
                                                                        //Das Ergebnis ist ein Array, das drei Strings enthält ["2026", "07", "25"]
    const jahr = teile [0];
    const monat = teile [1];
    const tag = teile [2];

    return tag + "." + monat + "." + jahr;
}

function formatiereDatumFuerInternenSpeicher(datumIntern)
{
    if (datumIntern === "")
    {
        return "";
    }

    const teile = datumIntern.split(".");

    const tag = teile[0];
    const monat = teile [1];
    const jahr = teile [2];

    return jahr + "-" + monat + "-" + tag;
}

//######################################################################
//INITIALES LADEN DES GESPEICHERTEN TEXTES VON TASK-TITEL, DATUM UND ORT
//######################################################################                                                                         

function initialisiereTasks(task, index)
{
    const storageKeys = definiereStorageKeys(index);
    const savedTaskTitle = localStorage.getItem(storageKeys.taskTitleStorageKey);       //Hole den Text von TaskTitle 0-x aus dem lokalen Speicher und weise ihn der Variable savedText zu
    const savedTaskDate = localStorage.getItem(storageKeys.taskDateStorageKey);         //!!!!Der local Storage ist mein Schrank, taskTitle-0 der Aufkleber auf der Schublade. Sodass ich die Schublade ansprechen kann, um etwas hineinzulegen oder geziehlt wieder rauszuholen mit get/setItem
    const savedTaskLocation = localStorage.getItem(storageKeys.taskLocationStorageKey); //Im ersten Durchlauf ist savedText noch nicht beschrieben da ich den local storage noch nicht beschrieben habe und damit ist saved Text = 0
    
    //TASK-TITLE
    //##########

    if (savedTaskTitle !== null && savedTaskTitle.trim() !== "")            //!= null  = prüft: existiert überhaupt ein Wert? ==> null = es existiert nichts (kein Text / kein Wert gefunden).
    {                                                                       //.trim() = entfernt Leerzeichen am Anfang und Ende. 
        task.querySelector(".task-title").innerText = savedTaskTitle;       //taskTitle.innerText = sichtbarer Wert von taskTitle 0-x
                                                                            //lade den Text aus dem lokalen Speicher in den sichtbaren Bereich
    }                                                                       //Nur wenn ein gespeicherter Wert existiert und darin echter Text steckt, wird er geladen. IN allen anderen Fällen wird der Task-Titel vollständig geleert, damit der Placeholder erscheinen kann. 
        else
        {
            task.querySelector(".task-title").innerHTML = "";               //Der echte html-Text wird gelöscht (nicht nur der sichtbare Text im Falle von innerText), sodass css Code (.task-title:empty::before) greift. Es wir nicht der Speicher und auch nich der sichtbare Text gelöscht, sondern der HTML-Inhalt. Zeilenumbruch zwischen <div> oder vom Browser unsichtbare eingefügte <br> können als "nicht leer" interpretiert werden und der Platzhalter würde nicht angezeigt.
        }                                                                   //Hier wird sichergestellt, dass vom Browser eingefügte <br> entfernt werden. Wenn User nichts schreibt, soll ein Platzhaltertext im Task-Titel erscheinen. Hier wird also sichergestellt, das Feld wirklich leer ist. Platzhalter wird in css sichtbar gemacht und in html definiert.

    //DATE
    //####

    if (savedTaskDate !== null && savedTaskDate !== "")
    {
        task.querySelector(".date span").innerText = formatiereDatumFuerAnzeige(savedTaskDate);             //hier wird in HTML gespeichert, nicht in das Eingabefeld, daher "innerText" und nicht "value"
    }                                                                                                       //".date span" und nicht ".date" da nur Text und nicht auch Icon ersetzt werden soll
    else
    {
        task.querySelector(".date span").innerText = "";
    }

    //LOCATION
    //########

    if (savedTaskLocation !== null && savedTaskLocation.trim() !== "")
    {
        task.querySelector(".location span").innerText = savedTaskLocation; 
    }
}   
tasks.forEach(initialisiereTasks);


//#################
//EDITIERBAR MACHEN
//#################

    //####
    //TASK
    //####

function editiereTask(task)
{
    function editiereTaskTitle(event)
    {   //console.log(event.target);
        task.querySelector(".task-title").contentEditable = true;
        task.querySelector(".task-title").focus();                                                  //behebt Bug, dass Cursor sporadisch nicht beim ersten Anklicken von Task-Titel erscheint
    }task.querySelector(".task-title").addEventListener("click", editiereTaskTitle);
    
    function bearbeitungBeenden()
        {
            task.querySelector(".task-title").contentEditable = false;
        }task.querySelector(".task-title").addEventListener("blur", bearbeitungBeenden);            //blur = Element verliert Focus. Sobald Benutzer Titel verlässt und Cursor nicht mehr blinkt. Das ist der Trigger, dass die Funktion startet. Also sobald der User woanders hinklickt und das Element seinen Fokus verliert.

}tasks.forEach(editiereTask);

    //#####
    //MODAL
    //#####

modalTitle.contentEditable = true;
document.querySelector("#modalDate").contentEditable = false;


//###################################################
//MODAL ÖFFNEN UND TEXT VON TASK TITLE IN MODAL LADEN
//###################################################

function durchlaufeTasks(task, index)
{ 
    let mouseDownBeginnImTaskTitel = false;
    let mouseUpEndeImTaskTitel = false;
    
    //ENTSCHEIDUNG MODAL ÖFFNEN
    //#########################

    function pruefeStartDesKlicks(event)                                                            //event = Objekt, das Informationen über den Klick enthält (wo geklickt, welche Taste, welches Element betroffen?)
    {
        mouseDownBeginnImTaskTitel = event.target.closest(".task-title") !== null;                  //event.target = das Element auf das geklickt wurde | event.currentTarget = Element, an dem der Event Listener hängt
    }task.addEventListener("mousedown", pruefeStartDesKlicks);                                      //closest() läuft vom geklickten Element die HTML-Hierarchie nach oben und sucht das erste passende Element (.task-title)
                                                                                                    //Beispiel <div class="task-title" <span> Life </span>. Klick auf Life ==> event target nicht task-title, sonder span. Closest sucht nach task-title, findet aber span, geht zum Elternelement und findet task-title. 
    function pruefeEndeDesKlicks(event)
    {
        mouseUpEndeImTaskTitel = event.target.closest(".task-title") !== null;
    }task.addEventListener("mouseup", pruefeEndeDesKlicks);

    function entscheideOeffneModal(event)
    {
        if(mouseDownBeginnImTaskTitel || mouseUpEndeImTaskTitel)                                    //wenn der Mausvorgang im Titel begonnen oder im Titel geendet hat, öffne das Modal nicht
        {
            mouseDownBeginnImTaskTitel = false; 
            mouseUpEndeImTasktiel = false; 
            return;                                                                                 //Verlässt Funktion
        }   
        
        //AKTUELLEN TASK FÜR RÜCKSPEICHERN VON MODAL IN TASK
        //##################################################
                                                                            
        currentTask = task;                                                 //aktuellen Task speichern, um bei einer Eingabe im Modal diese in den richtigen Task zu speichern 
        currentIndex = index;                                               //aktuellen Index speichern, um richtigen StorageKey zu setzen.

        uebertrageTaskDatenInModal();  

    }task.addEventListener("click", entscheideOeffneModal);    

    //FÜLLE MODAL MIT TASK DATEN
    //##########################

    function uebertrageTaskDatenInModal()                                               
                                                                            
    {                                                             
        //TITLE
        //#####

        if(task.querySelector(".task-title").innerText.trim() !== "")
        {
            modalTitle.innerText = task.querySelector(".task-title").innerText;                     //Ansonsten greift CSS Z:554 und zeigt Platzhalter an
        }else                                                                                       //CSS prüft, ob innerText leer ist, darum hier die Absicherung gegen unbeabsichtigten Inhalt über trim()
        {
            modalTitle.innerHTML = "";
        }
         
        //LOCATION
        //########
        
        modalLocation.value = task.querySelector(".location span").innerText;                       //bei Inputfeldern braucht es keinen CSS-Befehl, da hier direkt der HTML-Platzhalter greift, sollte keine User-Eingabe bestehen.
                                                                                                    //bei Inputfeldern gibt es kein <br>-Problem, darum innerHTML = ""; nich nötig. 
                                                                                                    //die Bereinigung von Leerzeichen geschiet bereits beim Rückspeichern vom Modal in den Task, daurm beim Öffnen und Laden aus dem Task nicht mehr nötig, da bereits sauber.
                                                                                                    //span, um gezielt nur den Text auszulesen oder zu beschreiben. Das SVG bleibt davon unberührt. Vor allem beim Beschreiben wichtig, sodass das svg nicht überschrieben und gelöscht wird.
         
        //DATE
        //####

        modalDate.value = formatiereDatumFuerInternenSpeicher(task.querySelector(".date span").innerText);

        //LINK
        //####

        const storageKeys = definiereStorageKeys(currentIndex); 
        const savedTaskLink = localStorage.getItem(storageKeys.taskLinkStorageKey);                 //beim Lesen (getItem) vom localStorage nur Key übergeben, beim Schreiben, also setItem den Key und den Wert. Beim Lesen kann ja nur der gespeicherte Wert ausgelesen werden. Keine Angabe nötig.

        if(savedTaskLink !== null && savedTaskLink.trim() !== "")
        {
            modalLink.value = savedTaskLink;
        }else
        {
            modalLink.value = "";
        }
        

        modal.classList.add("open");                                                                    
    };                                                                      
    
};
tasks.forEach(durchlaufeTasks);                                             //forEach übergibt nacheinander Listenelemente von tasks an die Funktion

//########################################
//MODAL EDITIERUNGEN IN TASK RÜCKSPEICHERN
//########################################

//TASK-TITLE
//##########

function speichereModalTitleInTask()
{
    currentTask.querySelector(".task-title").innerText = modalTitle.innerText;
}
modalTitle.addEventListener("input", speichereModalTitleInTask);

//LOCATION
//########

function speichereModalLocationInTask()
{
    currentTask.querySelector(".location span").innerText = modalLocation.value;
}
modalLocation.addEventListener("input", speichereModalLocationInTask);

//DATE
//####

function speichereModalDateInTask()
{
    currentTask.querySelector(".date span").innerText = formatiereDatumFuerAnzeige(modalDate.value); 
}
modalDate.addEventListener("input", speichereModalDateInTask);

//########################## 
//SPEICHERE IN LOCAL STORAGE
//##########################

//TASK
//####

function taskTitlesEditierenUndSpeichern (taskTitle, index)                                                                          
{   
    const storageKeys = definiereStorageKeys(index);               
    function speichereTaskTitleAenderungen()                                            //(), die Funktion erwartet keine Eingabewerte                                                                                                                                      
    {
        localStorage.setItem(storageKeys.taskTitleStorageKey, taskTitle.innerText);     //setItem = speichere etwas                                                                       
    }
    taskTitle.addEventListener("input", speichereTaskTitleAenderungen);                 //"input" = User-Eingabe ist Trigger, um Funktion auszulösen. Funktion erst auslößen, wenn Inhalt verändert wurde
}                                                                                       //!!!!Ein EventListener merkt sich innerhalb einer forEach Funktion immer seine Umgebung in der er erstellt wurde. Im ersten Durchlauf merkt er sich den Wert des entsprechenden Tasks und den zugehörigen StorageKey. Bei einer Eingabe wird genau der EventListener zum passenden Task aktiv und nutzt seine gemerkten Werte.
taskTitles.forEach(taskTitlesEditierenUndSpeichern);                                    //Gehe alle Tasks-Titel nacheinander durch.

//MODAL
//#####

//MODAL-TITLE
//##########

function speichereModalTitleAenderungen()
{
    const storageKeys = definiereStorageKeys(currentIndex);
    localStorage.setItem(storageKeys.taskTitleStorageKey, modalTitle.innerText);
}
modalTitle.addEventListener("input", speichereModalTitleAenderungen); 

//LOCATION
//########

function speichereModalLocationAenderungen()
{
    const storageKeys = definiereStorageKeys(currentIndex);
    localStorage.setItem(storageKeys.taskLocationStorageKey, modalLocation.value);
}
modalLocation.addEventListener("input", speichereModalLocationAenderungen);

//DATE
//####

function speichereModalDateAenderungen()
{
    const storageKeys = definiereStorageKeys(currentIndex);
    localStorage.setItem(storageKeys.taskDateStorageKey, modalDate.value);
}
modalDate.addEventListener("input", speichereModalDateAenderungen);

//LINK
//####

function speichereModalLinkAenderungen()
{
    const storageKeys = definiereStorageKeys(currentIndex);
    localStorage.setItem(storageKeys.taskLinkStorageKey, modalLink.value);
}
modalLink.addEventListener("input", speichereModalLinkAenderungen);

//###############
//MODAL SCHLIEßEN
//###############

modalClose.addEventListener("click", () =>                                  //Die Funktion wird ausgeführt, sobald ein Klick auf einen Task erfolgt ==> wende Event Listener auf task. an
{
    modal.classList.remove("open");
});

modal.addEventListener("mousedown", (event) =>                              //mousedown, bedeutet Maustaste wird nach unten gedrückt. Ein Click wäre drücken und wieder loslassen.
{                                                                           
    mouseDownOnModalBackground = event.target == modal;
});

modal.addEventListener("click", (event) =>                                  
{
    if(mouseDownOnModalBackground && event.target == modal)                 //hier wird geprüft, ob sowohl das Drücken, als auch das Loslassen der Maustaste auf dem Modalhintergrund erfolgten. Damit wird ein unbeabsichtigtes Schließen beim Markieren von Text vermieden (Drücken im Modal, Markieren und Ziehen bis Modal Hintergrund, loslassen)
    {                                                                       //Achtung Bubbling aktiv, oberstes Element bekommt immer die Akionen der Kinder mit. Geschäftsführer weiß, was Teamleiter, Mitarbeiter und Praktikanten machen. Der Praktikant aber nicht, was die darüber machen. 
        modal.classList.remove("open");                                     //Darum hier eine if-Abfrage auf richtigen Klick erforderlich. Beim "modal Close" = dem X-Button nicht nötig, da er das untergeordnete Element ist.
    }

    mouseDownOnModalBackgrund = false;
});

document.addEventListener("keydown", (event) =>
{
    console.log(event.key);
    if(event.key == "Escape" && modal.classList.contains("open"))
    {
        modal.classList.remove("open");
    }
});



// ########## TO-DO ###########

//Markieren des Task-Titels über den Titel hinaus auf den Task, soll nicht das Modal öffenen
//wenn Datum im modal gelöscht wird, verschwindet es inklusive svg auf dem Task ==> beheben.
//Bei Datum keine Buchstaben zulassen oder sogar kalender anzeigen lassen
//Modalinhalt in allen Tasks gleich
//Metadaten hinzufügen
//Neue Tasks durch Nutzer hinzufügen
//Wenn auf Link in Task geklickt, soll der Focus im Modal direkt auf den Link sein und kein weiterer Klick notwendig


//######### Beispielfunktion ###########
/* 

let Hallo = "Hallo";
function Name (Udo)  
{
    console.log(Udo);
};

Name (Hallo);

*/
