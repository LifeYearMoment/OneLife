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
const modalDate = document.querySelector("#modalDate");
const modalLocation = document.querySelector("#modalLocation");
const modalClose = document.querySelector("#modalClose");

const checkVisitContent = document.querySelector(".checkVisitContent");
const checkToDoContent = document.querySelector(".checkToDoContent");
const checkVisitNewChecklistItem = document.querySelector(".checkVisitNewChecklistItem");
const checkToDoNewChecklistItem = document.querySelector(".checkToDoNewChecklistItem");
const checkVisitDoneContent = document.querySelector(".checkVisitDoneContent");
const checkVisitDoneInner = document.querySelector(".checkVisitDoneInner");
let AnzahlCheckboxVisitDone = checkVisitDoneInner.querySelectorAll(".checkboxVisit").length;
const hideVisitButton = document.querySelector("#hideVisitButton");
const checklistVisits = document.querySelectorAll(".checklistVisit");
const checklistToDos = document.querySelectorAll(".checklistToDo");

const checklistVisitArray = [];

let mouseDownOnModalBackground = false;



//########################################
//          Gobale Functionen
//########################################

function definiereStorageKeys(index)
{
    const taskTitleStorageKey = "taskTitle-" + index;                       //string "taskTitle-" wird durch + mit index zu einem zusammenhängenden String zusammengesetzt. Der Index wird dabei zu Text umgebaut.
    const taskDateStorageKey = "taskDate-" + index;                         //Die Variable wird innerhalb der Schleife definiert (lokale Variable), da für jeden Task eine gesonderte Speichervariable definiert werden soll 
    const taskLocationStorageKey = "taskLocation-" + index;                 //storageKey = Speichername z.B. taskTitle-0                                                   
    const taskLinkStorageKey = "taskLink-" + index;                         //Speichere den aktuellen Text dieses Tasks unter seinem eigenen Namen im Browser
    const checkVisitStorageKey = "checkVisit-" + index;

    return{
        taskTitleStorageKey,
        taskDateStorageKey,
        taskLocationStorageKey,
        taskLinkStorageKey,
        checkVisitStorageKey
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

//##############
//INITIALISIEREN
//##############

//====
//TASK
//====

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

//COUNTDOWN
//######### 

function countdownZaehler(task)
{
    const taskDateText = task.querySelector(".date span").innerText;

    if (taskDateText === "")
    {
        task.querySelector(".countdown span").innerText = "Ohne Termin";
        return;
    }

    const taskDate = new Date(formatiereDatumFuerInternenSpeicher(taskDateText));               //"23.05.2026" wird zu "2026-05-23", und wird mit new Date() aus Text zum Date-Objekt, das man für die Differenzbildung benötigt. Nur new Date() erzeugt das heutige Datum 
    const dateToday = new Date();
    
    const timeRemaining_ms = taskDate - dateToday;
    const timeRemaining_s = Math.ceil(timeRemaining_ms/1000);
    const timeRemaining_min = Math.ceil(timeRemaining_ms/1000/60);
    const timeRemaining_h = Math.ceil(timeRemaining_ms/1000/60/60);
    const timeRemaining_day = Math.ceil(timeRemaining_ms/1000/60/60/24);

    if(timeRemaining_day === 0)
        {
            task.querySelector(".countdown span").innerText = " HEUTE";
        }
            else if(timeRemaining_day < 0)
            {
                task.querySelector(".countdown span").innerText = " VORBEI";
            }
                else
                {
                    task.querySelector(".countdown span").innerText = timeRemaining_day + " Tage";
                }
}

function aktualisiereZaehler()
{
    tasks.forEach(countdownZaehler);

}aktualisiereZaehler();                                                                         //wichtig für erste Ausführung zum Zeitpunkt t = 0 s.
setInterval(aktualisiereZaehler, 1000);                                                         //führt ab der ersten Sekunde, jede weitere s aus.

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

    function entscheideOeffneModal()
    {
        if(mouseDownBeginnImTaskTitel || mouseUpEndeImTaskTitel)                                    //wenn der Mausvorgang im Titel begonnen oder im Titel geendet hat, öffne das Modal nicht
        {
            mouseDownBeginnImTaskTitel = false; 
            mouseUpEndeImTasktiel = false; 
            return;                                                                                 //Verlässt Funktion
        }   
        
        //AKTUELLEN TASK FÜR RÜCKSPEICHERN VON MODAL IN TASK
        //##################################################
                                                                            
        currentTask = task;                                                                         //aktuellen Task speichern, um bei einer Eingabe im Modal diese in den richtigen Task zu speichern 
        currentIndex = index;                                                                       //aktuellen Index speichern, um richtigen StorageKey zu setzen.

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

        placeholderModalDateHidden();
        
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
        
        //MODAL-CHECKLIST-VISIT
        //#####################

        
        function initialisiereChecklistVisit(checklistVisit, iChecklist)
        {
            const storageKeys = definiereStorageKeys(currentIndex);                                                                     // Werte zum richtigen Task abrufen
            const savedChecklistVisit = JSON.parse(localStorage.getItem(storageKeys.checkVisitStorageKey));

            if (savedChecklistVisit !== null && savedChecklistVisit[iChecklist] !== null && savedChecklistVisit[iChecklist] !== undefined)  
            {                                                                       
                checklistVisit.querySelector(".checklistVisitText").value = savedChecklistVisit[iChecklist].text;                       //Speiche die zum Durchlauf passende gespeicherte Checklist in das Modal
                checklistVisit.querySelector(".checkboxVisit").checked = savedChecklistVisit[iChecklist].checked;                       //checked links ist Eigenschaft wie value bei einem input-Element, checked rechts ist der Name des Objektes. Hier einmal als Text und einmal als Checked definiert

                if (checklistVisit.querySelector(".checkboxVisit").checked === true)
                {
                    document.querySelector(".checkVisitDoneInner").append(checklistVisit);
                }else
                {
                    document.querySelector(".checkVisitContent").append(checklistVisit);
                }

                steuereCheckVisitButton ();
                checklistVisitArray[iChecklist] = savedChecklistVisit[iChecklist];   
            }                                                                       
                else
                {
                    checklistVisit.querySelector(".checklistVisitText").value = "";    
                    checklistVisit.querySelector(".checkboxVisit").checked = false;           
                }                                                                
                
            }   
        checklistVisits.forEach(initialisiereChecklistVisit);

        //MODAL OEFFNEN
        //#############

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

//COUNTDOWN
//#########

modalDate.addEventListener("input", aktualisiereZaehler);

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

//CHECKBOX
//########

//CHECKBOX VISIT

function speichereModalChecklistVisitAenderungen(checklistVisit, iChecklist)
{
    function speichereChecklistVisit()
    {
        //console.log("speichern");
        //console.log(checklistVisit.querySelector(".checkboxVisit").checked);
        checklistVisitArray[iChecklist] = 
        {
            checked: checklistVisit.querySelector(".checkboxVisit").checked,
            text: checklistVisit.querySelector(".checklistVisitText").value
        };

        const storageKeys = definiereStorageKeys(currentIndex);
        localStorage.setItem(storageKeys.checkVisitStorageKey, JSON.stringify(checklistVisitArray));
        

    }
    checklistVisit.querySelector(".checklistVisitText").addEventListener("input", speichereChecklistVisit);
    checklistVisit.querySelector(".checkboxVisit").addEventListener("change", speichereChecklistVisit);
    
}checklistVisits.forEach(speichereModalChecklistVisitAenderungen);

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
    //console.log(event.key);
    if(event.key == "Escape" && modal.classList.contains("open"))
    {
        modal.classList.remove("open");
    }
});

//#################
//MODAL DATE STYLEN
//#################

function oeffneDatePicker()
{    
    if (modalDate.showPicker)                                               //Sicherheitsprüfun. "showPicker" ist eine Methode des Date-Inputs, mit der JavaScript den nativen Kalender öffnen kann. Hier Abfrage, ob modal Date überhaupt die Funktion showPicker besitzt. Wenn der Brwoser unterstützt, dann wahr
    {
        modalDate.showPicker();
    }
}modalDate.addEventListener("click", oeffneDatePicker);
//console.log(modalDate.value);

function placeholderModalDateHidden()
{
    if(modalDate.value === "")
    {
        modalDate.classList.add("dateHidden");
    }else
    {
        modalDate.classList.remove("dateHidden");
    }
}modalDate.addEventListener("input", placeholderModalDateHidden);

//###############
//MODAL CHECKLIST
//###############

const hideVisitButtonNumber = document.querySelector("#hideVisitButtonNumber");
hideVisitButtonNumber.innerHTML = AnzahlCheckboxVisitDone;
const hideVisitButtonTitle = document.querySelector("#hideVisitButtonTitle");
hideVisitButtonTitle.innerHTML = "Erlebt";

//CHECKLIST ITEM AUSBLENDEN
//#########################

const checkboxVisits = document.querySelectorAll(".checkboxVisit");

if(AnzahlCheckboxVisitDone === 0)
{
    document.querySelector("#hideVisitButton").classList.add("ausgeblendet");                   //Done-Bereich ausblenden, wenn kein Element abgehakt ist
}

function vergebeChecklistVisitReihenfolge(checklistVisit, index)
{
    checklistVisit.dataset.order = index;
}checklistVisits.forEach(vergebeChecklistVisitReihenfolge);

function vergebeChecklistToDoReihenfolge(checklistToDo, index)
{
    checklistToDo.dataset.order = index;
}checklistToDos.forEach(vergebeChecklistToDoReihenfolge);

function aktiviereCheckboxVisit(checkboxVisit)
{
    checkboxVisit.addEventListener("change", pruefeCheckboxAktiv);
}checkboxVisits.forEach(aktiviereCheckboxVisit);

function pruefeCheckboxAktiv (event)
{
    const aktuellesChecklistVisit = event.target.closest(".checklistVisit");                    //Checklist, dessen Checkbox angeklickt wurde
    
    //console.log(aktuellesChecklistVisit);
    //console.log(aktuelleReihenfolge);

    if(event.target.checked === true)                                                            //Wenn das Element abgehakt wurde, dann...
    {        
        checkVisitDoneInner.append(aktuellesChecklistVisit);
        
        steuereCheckVisitButton ();
    }else
    {
        //console.log("checkbox deaktiviert");
        
        if(checkVisitDoneContent.classList.contains("ausgeblendet") !== true)                        //Wenn Fenster "Erledig" geöffnet
        {
            checkVisitDoneContent.style.maxHeight = checkVisitDoneContent.scrollHeight + "px";                 
        }

        document.querySelector(".checkVisitContent").append(aktuellesChecklistVisit);       //Wenn Checkbox Haken entfernt, dann nimm nicht nur Checkbox, sondern komplettes Element mit Text und verschiebe es
        steuereCheckVisitButton ();
    }
}

//CHECKLISTE HINZUFUEGEN
//######################

function neuesChecklistVisitElement ()
{
    const neuesChecklistVisitElement = document.createElement("div");
    neuesChecklistVisitElement.classList.add("checklistVisit");

    neuesChecklistVisitElement.dataset.order = document.querySelectorAll(".checklistVisit").length;

    const neuesDragHandle = document.createElement("div");
    neuesDragHandle.classList.add("dragHandle");
    neuesDragHandle.textContent = "::";
    aktiviereDragHandle (neuesDragHandle);

    neuesChecklistVisitElement.append(neuesDragHandle);

    const neueCheckboxVisit = document.createElement("input");
    neueCheckboxVisit.type = "checkbox";
    neueCheckboxVisit.classList.add("checkboxVisit");
    neueCheckboxVisit.addEventListener("change", pruefeCheckboxAktiv);

    neuesChecklistVisitElement.append(neueCheckboxVisit);

    const neuerChecklistVisitText = document.createElement("input");
    neuerChecklistVisitText.type = "text";
    neuerChecklistVisitText.classList.add("checklistVisitText");

    neuesChecklistVisitElement.append(neuerChecklistVisitText);

    const neuesLoescheChecklistVisit = document.createElement("div");
    neuesLoescheChecklistVisit.classList.add("loescheChecklistVisit");
    neuesLoescheChecklistVisit.classList.add("loescheChecklist");
    neuesLoescheChecklistVisit.textContent = "x";

    neuesChecklistVisitElement.append(neuesLoescheChecklistVisit);

    checkVisitContent.append(neuesChecklistVisitElement);
    
}checkVisitNewChecklistItem.addEventListener("click", neuesChecklistVisitElement);

function neuesChecklistToDoElement ()
{
    const neuesChecklistToDoElement = document.createElement("div");
    neuesChecklistToDoElement.classList.add("checklistToDo");

    neuesChecklistToDoElement.dataset.order = document.querySelectorAll(".checklistToDo").length;

    const neuesDragHandle = document.createElement("div");
    neuesDragHandle.classList.add("dragHandle"); 
    neuesDragHandle.textContent = "::";
    aktiviereDragHandle (neuesDragHandle);

    neuesChecklistToDoElement.append(neuesDragHandle);

    const neueCheckboxToDo = document.createElement("input");
    neueCheckboxToDo.type = "checkbox";
    neueCheckboxToDo.classList.add("checkboxToDo");
    neueCheckboxToDo.addEventListener("change", pruefeCheckboxAktiv);

    neuesChecklistToDoElement.append(neueCheckboxToDo);

    const neuerChecklistToDoText = document.createElement("input");
    neuerChecklistToDoText.type = "text";
    neuerChecklistToDoText.classList.add("checklistToDoText");

    neuesChecklistToDoElement.append(neuerChecklistToDoText);

    const neuesLoescheChecklistToDo = document.createElement("div");
    neuesLoescheChecklistToDo.classList.add("loescheChecklistToDo");
    neuesLoescheChecklistToDo.classList.add("loescheChecklist");
    neuesLoescheChecklistToDo.textContent = "x";

    neuesChecklistToDoElement.append(neuesLoescheChecklistToDo);

    checkToDoContent.append(neuesChecklistToDoElement);  //Eltern-Element.append(Kind-Element); Füge Kind an letzte Stelle des Eltern-Elements
    
}checkToDoNewChecklistItem.addEventListener("click", neuesChecklistToDoElement);

//CHECKLISTE VERSCHIEBEN
//######################

const dragHandles = document.querySelectorAll(".dragHandle");
let newChecklistShadow = null; 
let startDragVisit = null;
let startDragSection = null;
let dragPreview = null; 
let dragOffsetX = null; 
let dragOffsetY = null;
let dragStartX = null; 
let dragStartY = null; 

function aktiviereDragHandle (dragHandle)
{
    dragHandle.addEventListener("pointerdown", startePointer);
    document.addEventListener("pointerup", beendePointer);                      //pointerup darf überall passieren, pointerdown muss auf dem Handle passieren, sonst kein Drag
    dragHandle.addEventListener("pointermove", bewegePointer);
}dragHandles.forEach(aktiviereDragHandle);

function startePointer (event)
{
    //console.log(event.currentTarget);                                         //currentTarget = genau das Element, an dem der Listener hängt. Für das tatsächlich gedrückte Element, sollte es ein Kind sein, nutzt man event.target

    event.preventDefault();

    event.currentTarget.setPointerCapture(event.pointerId);                     //pointerup wirkt immer auf dem Element auf dem losgelassen. Diese Funktion stellt sicher, dass er dort wirkt, wo gegriffen wurde
    startDragVisit = event.currentTarget.closest(".checklistVisit");            //auf welchem checklist Visit ist der Drag gestartet?                            

    //###### POSITION ERFASSEN ######

    const startDragRect = startDragVisit.getBoundingClientRect();               //Wo genau liegt dieses Element gerade im sichtbaren Browserfenster und wie groß ist es?
                                                                                /*{
                                                                                top: xxx,
                                                                                left: xxx,
                                                                                right: xxx,
                                                                                bottom: xxx, 
                                                                                width: xxx, 
                                                                                height: xxx
                                                                                }*/
    
    dragOffsetX = event.clientX - startDragRect.left;                           //event.clientX/Y = Position von Maus/Finger
    dragOffsetY = event.clientY - startDragRect.top;                            //startDragRect.left/top = Position der Karte im Browser
                                                                                //Differenz daraus = wo innerhalb der Karte angefasst

    dragStartX = event.clientX;                                                 //event.clientX/Y = Position von Maus/Finger
    dragStartY = event.clientY;

    //##### SHADOW ERZEUGEN ######

    newChecklistShadow = document.createElement("div");                         //Schattenelement als Platzhalter erzeugen
    newChecklistShadow.classList.add("checklistVisitShadow");                   //Schattenelement mit Classlist versehen
    startDragVisit.before(newChecklistShadow);                                  //Shadow vor gegriffenen Element einfügen

    //##### DRAG PREVIEW ERZEUGEN #####

    dragPreview = startDragVisit.cloneNode(true);                               //Erzeugt Kopie des kompletten gegriffenen Elements. True bedeutet nicht nur äußeres Element zu kopieren, sondern auch alle Kinder.
    dragPreview.classList.add("dragPreview");                                   //Preview mit CSS Klasse versehen
    dragPreview.style.width = startDragRect.width + "px";                       //Ermitteln der Breite des gegriffenen Elements

    document.body.append(dragPreview);                                          //hängt Prieview direkt an body, damit sie nicht von Overflow: hidden abgeschnitten wird. Über fixed im css und Koordinatendefinition erfolgt die Platzierung                         

    startDragVisit.classList.add("checklistVisitDragAktiv");                    //CSS schiebt das Originalelement aus dem sichtbaren Bereich

    dragPreview.style.left = dragStartX - dragOffsetX + "px";                   //Positioniert an Stelle des Originalelements   
    dragPreview.style.top = dragStartY - dragOffsetY + "px";

    //##### BEREICH CONTENT ODER DONE ERFASSEN #####

    if (event.currentTarget.closest(".checkVisitContent") !== null)             //in welchem Bereich startet Drag
    {
        startDragSection = "visitNotDone";
    }
        else if (event.currentTarget.closest(".checkVisitDoneContent") !== null)
        {
            startDragSection = "visitDone";
        }
    //console.log(startDragVisit);
    //console.log(startDragSection);
}

let dragOver = null;
let dragOverYPosition = null;
let dragOvermiddle = null; 
let dragOverDragSection = null; 

function bewegePointer(event)
{
    //##### PREVIEW UNTER POINTER POSITIONIEREN #####

    if (dragPreview === null)
    {
        return;
    }

    dragPreview.style.left = event.clientX - dragOffsetX + "px";        //Drag-Handle von Vorschau unter Griffpoition positionieren
    dragPreview.style.top = event.clientY - dragOffsetY + "px";

    event.currentTarget.setPointerCapture(event.pointerId);             //obwohl das Element nicht mehr unter der Maus ist (aus dem sichtbaren Bereich geschoben), bekommt es noch die events
                                                                        //pointer iD wichtig für Touch. Da mehrere Finger auf dem Touch sein können

    //##### ELEMENT UNTER POINTER IDENTIFIZIEREN #####

    const elementUnterPointer = document.elementFromPoint               //Funktion elementFromPoint bekommt Koordinaten genannt. Anschließed gibt sie das Element an dieser Stelle aus. Hier das Handle.
    (
        event.clientX,
        event.clientY
    );

    let checklistUnterPointer = null; 

    if (elementUnterPointer !== null)
    {
        checklistUnterPointer = elementUnterPointer.closest(".checklistVisit"); // gehe vom Handle zum Checklistenelement und speichere das Checklistenelement auf dessen Handle das Event liegt
    }

    //##### BEREICH CONTENT ODER DONE ERFASSEN #####

    let bereichUnterPointer = null; 

    if(elementUnterPointer !== null)
    {
        if (elementUnterPointer.closest(".checkVisitContent") !== null)
        {
            bereichUnterPointer = "visitNotDone";   
        }
            else if (elementUnterPointer.closest(".checkVisitDone") !== null)
            {
                bereichUnterPointer = "visitDone";   
            }
    }
       
    

    //##### SCHATTEN VERSCHIEBEN #####

    if (checklistUnterPointer !== null)                                 //Abfrage, falls es kein Element über dem Element unter dem Pointer
    {
        const checklistRechteck = checklistUnterPointer.getBoundingClientRect();
        const mitte = checklistRechteck.top + checklistRechteck.height / 2;

        if (event.clientY < mitte)
        {
            
            if (startDragSection === "visitNotDone" && bereichUnterPointer === "visitNotDone")
            {
                checkVisitContent.insertBefore(newChecklistShadow, checklistUnterPointer);
            }
                else if (startDragSection === "visitDone" && bereichUnterPointer === "visitDone")
                {
                    checkVisitDoneInner.insertBefore(newChecklistShadow, checklistUnterPointer);
                }
        }
            else
            {
                if (startDragSection === "visitNotDone" && bereichUnterPointer === "visitNotDone")
                {
                    checkVisitContent.insertBefore(newChecklistShadow, checklistUnterPointer.nextElementSibling);
                }
                    else if (startDragSection === "visitDone" && bereichUnterPointer === "visitDone")
                    {
                        checkVisitDoneInner.insertBefore(newChecklistShadow, checklistUnterPointer.nextElementSibling);
                    }
            }
    }
}

function beendePointer ()
{
    if (newChecklistShadow !== null && startDragVisit !== null)
    {
        newChecklistShadow.replaceWith(startDragVisit);                 //ersetzt den Schatten durch das Originalelement. Ausschließliches zurückholen inden sichtbaren Bereich, würde das Element an seine alte Stelle zurückbringen
    }

    if (startDragVisit !== null)
    {
        startDragVisit.classList.remove("checklistVisitDragAktiv");     //Originalelement in den sichtbaen Bereich zurückholen
    }

    if (dragPreview !== null)
    {
        dragPreview.remove();                                           //Prieview entfernen
        dragPreview = null;
    }

    dragOffsetX = null;
    dragOffsetY = null;
    dragStartX = null; 
    dragStartY = null; 
    
    newChecklistShadow = null;
    startDragVisit = null;
    startDragSection = null; 
}

//CHECKLISTE LOESCHEN
//###################

const modalChecklist = document.querySelector(".modalChecklist");

function loescheChecklist(event)
{
    //console.log(event.target.closest(".loescheChecklistVisit"));
    //console.log(Number(event.target.closest(".checklistVisit").dataset.order));
    //console.log(Number(event.target.closest(".checklistToDo").dataset.order));
    if((event.target.closest(".loescheChecklistVisit") || event.target.closest(".loescheChecklistToDo"))  === null)
    {
        //console.log("keinLoeschvorgang");
        return;
    }else
    {
        //console.log("loesche Checklist");
        if(event.target.closest(".checklistVisit"))
        {
            const dataOrderAktuelleChecklistVisit = Number(event.target.closest(".checklistVisit").dataset.order);
            event.target.closest(".checklistVisit").remove();

            const checklistVisits = document.querySelectorAll(".checklistVisit");

            function dataOrderVisitNeuErstellen(checklistVisit)
            {
                if(dataOrderAktuelleChecklistVisit < Number(checklistVisit.dataset.order))
                {
                    checklistVisit.dataset.order = Number(checklistVisit.dataset.order) - 1;
                }
            }checklistVisits.forEach(dataOrderVisitNeuErstellen);
        }

        else if (event.target.closest(".checklistToDo"))
        {
            const dataOrderAktuelleChecklistToDo = Number(event.target.closest(".checklistToDo").dataset.order);
            event.target.closest(".checklistToDo").remove();

            const checklistToDos = document.querySelectorAll(".checklistToDo");

            function dataOrderToDoNeuErstellen(checklistToDo)
            {
                if(dataOrderAktuelleChecklistToDo < Number(checklistToDo.dataset.order))
                {
                    checklistToDo.dataset.order = Number(checklistToDo.dataset.order) - 1;
                }
            }checklistToDos.forEach(dataOrderToDoNeuErstellen);
        }

        //console.log(dataOrderAktuelleChecklist);
    }

    

}modalChecklist.addEventListener("click", loescheChecklist);

//CHECKLISTBUTTON
//###############

function steuereCheckVisitButton ()
{
    AnzahlCheckboxVisitDone = checkVisitDoneInner.querySelectorAll(".checkboxVisit").length;

    if(checkVisitDoneInner.querySelectorAll(".checkboxVisit").length === 0)
    {
        document.querySelector("#hideVisitButton").classList.add("ausgeblendet");                       //Button ausblenden 
        hideVisitButtonArrow.innerHTML = "&#709";
        checkVisitDoneContent.classList.add("ausgeblendet");

        checkVisitDoneContent.style.height = "";
        checkVisitDoneContent.style.maxHeight = "";

        hideVisitButtonNumber.innerHTML = AnzahlCheckboxVisitDone;
        //console.log(AnzahlCheckboxVisitDone);

        if(checkVisitDoneInner.querySelector(".checkboxVisit") === null)
        {
            checkVisitDoneInner.classList.add("ausgeblendet");                                          //Padding entfernen
            //console.log("Keine Checkbox in Hidden");
        }            
    }else
    {
        AnzahlCheckboxVisitDone = checkVisitDoneInner.querySelectorAll(".checkboxVisit").length;
        document.querySelector("#hideVisitButton").classList.remove("ausgeblendet");
        hideVisitButtonNumber.innerHTML = AnzahlCheckboxVisitDone;
        
        //console.log(AnzahlCheckboxVisitDone);

        if(checkVisitDoneContent.classList.contains("ausgeblendet") !== true)
        {
            checkVisitDoneInner.classList.remove("ausgeblendet");
            checkVisitDoneContent.style.maxHeight = checkVisitDoneContent.scrollHeight + "px";
        }else 
        {
            checkVisitDoneContent.style.maxHeight = "0px";
        }
    }
}

//AUSGEBLENDETER BEREICH AUF- UND ZUKLAPPEN
//#########################################

document.querySelector(".checkVisitDoneContent").classList.add("ausgeblendet");

const hideVisitButtonArrow = document.querySelector("#hideVisitButtonArrow");
hideVisitButtonArrow.innerHTML = "&#709";

function openCloseHideSection ()
{
    checkVisitDoneContent.classList.add("aktiviereTransitionHidden");
    checkVisitDoneContent.classList.toggle("ausgeblendet");                                      //wechselt zwischen hinzufügen und löschen von "auseblendet"  
    

    if(checkVisitDoneContent.classList.contains("ausgeblendet") === true)
    {
        checkVisitDoneContent.style.maxHeight = "0px";
        hideVisitButtonArrow.innerHTML = "&#709";
    }else
    {
         if(checkVisitDoneInner.querySelector(".checkboxVisit") === null)
        {
            document.querySelector(".checkVisitDoneInner").classList.add("ausgeblendet");
            //console.log("Keine Checkbox in Hidden");
        }else
        {
            document.querySelector(".checkVisitDoneInner").classList.remove("ausgeblendet");
        }
        checkVisitDoneContent.style.maxHeight = checkVisitDoneContent.scrollHeight + "px";
        hideVisitButtonArrow.innerHTML = "&#708 ";

        function transitionEnfernen()
        {
            checkVisitDoneContent.classList.remove("aktiviereTransitionHidden");
        }checkVisitDoneContent.addEventListener("transitionend", transitionEnfernen, {once: true});
    }
    
    //console.log(checkVisitDoneContent.scrollHeight);
    
}hideVisitButton.addEventListener("click", openCloseHideSection);


// ########## TO-DO ###########


//Nach Löschen von Task Titel ohne Reload wird kein Platzhalter gesetzt. Erst nach gesondertem Reload
//Wenn auf Link in Task geklickt, soll der Focus im Modal direkt auf den Link sein und kein weiterer Klick notwendig
//Timer immer granularer, je näher Event kommt. Ggf. Zahl groß, Einheit darunter kleiner
//Hinweis, wenn Location, Date, Link oder sonstiges einen Eintrag hat, ohne, dass der Titel angegeben wurde.
//Filter-/Ansichtslogik für Tasks einrichten ==> abeschlossen, nahe Zukunft, Termin eingetragen, ggf. ohne Termin/weitere sinnvolle Zusätze



// ############ ERLEDIGT ###############

//Reihenfolge beim Checken von Checklisten verändert sich je nach Reihenfolge des An- und Abhakens. Bei Reload Poition der Einträge wird wieder in die alte Reihenfolge gebracht
//Neue Tasks durch Nutzer hinzufügen
//Checkliste animiert auf und zuklappen. Aktuell mittels css Notlösung gemacht.
//Markieren des Task-Titels über den Titel hinaus auf den Task, soll nicht das Modal öffenen
//wenn Datum im modal gelöscht wird, verschwindet es inklusive svg auf dem Task ==> beheben.
//Bei Datum keine Buchstaben zulassen oder sogar kalender anzeigen lassen
//Modalinhalt in allen Tasks gleich
//Metadaten hinzufügen


//######### Beispielfunktion ###########
/* 

let Hallo = "Hallo";
function Name (Udo)  
{
    console.log(Udo);
};

Name (Hallo);





//const iChecklist = Array.from(checkboxVisits).indexOf(checkboxVisit);

*/
