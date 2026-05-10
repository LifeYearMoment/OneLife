const tasks = document.querySelectorAll(".task");           //const = speichert etwas in einer Variable
                                                            //task  = Name der Variable

                                                            //document = diene komplette HTML-Seite
                                                            //querySelectorALL = suche alle passenden Elemente
                                                            //".task" = alle Elemente mit Klasse task

                                                            //Suche alle Task-Karten auf der Seite und speichere sie als Liste unter task.

console.log(tasks);                                         //Zeige mir in der Konsole, was gefunden wurde.

tasks.forEach((task) =>                                     //tasks = deine Liste
                                                            //.forEach = gehe jedes Element einzeln durch
                                                            //task = der aktuelle einzelne Task
                                                            //{} = hier kommt rein, was mit jedem Task passieren soll
                                                            
                                                            //Gehe alle Tasks nacheinander durch.
{
    task.contentEditable = true;                            //task = aktueller einzelner Task
                                                            //.contentEditable = Eigenschaft: daff der Inhalt bearbeitet werden?
                                                            //= true = ja                         
})                                 
                                                            