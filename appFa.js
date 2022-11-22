//17:45
//variables
const noteList = document.querySelector("#note-list");

//event listeners
function eventListeners(){
    document.querySelector("#form").addEventListener("submit" , newNote);
    document.querySelector("#note-list").addEventListener("click" , removeNote);
    document.addEventListener("DOMContentLoaded" , localStorageAfterRefresh);
    document.querySelector("#form2").addEventListener("submit" , removeAllNotes);
    
}
eventListeners();




//functions
function newNote(e){
    e.preventDefault();

    //get the value in the field
    const note = document.querySelector("#note").value
    
    //create new li tag
    const createList = document.createElement("li");
    createList.appendChild(document.createTextNode(note));

    //adding li tag to the note list
    noteList.appendChild(createList)
    this.reset();

    //create remove button
    const removeButton = document.createElement("a");
    removeButton.appendChild(document.createTextNode("X"));
    removeButton.setAttribute("class" , "remove-note") 


    //adding remove button to the li tag
    createList.appendChild(removeButton)

    //adding note to local storage
    addNotesToLS(note);

    //adding line to the notelist
    createList.appendChild(line)
    
    //alert
    alert("Note has been added successfully")
    

}



//adding note to local storage

function addNotesToLS(oneNoteFromUser){

    //getting notes from local storage
    let notes = getNotesFromLS();
    
    //adding a note from user
    notes.push(oneNoteFromUser);

    localStorage.setItem("userNotes" , JSON.stringify(notes))
}

//getting notes from local storage
function getNotesFromLS(){
    let notes;
    let getNotes = localStorage.getItem("userNotes") //"userNotes" as a key
    if (getNotes === null){
        notes = []; //empty array
    } 
    else{
        notes = JSON.parse(getNotes) //converts stringified into an array
    }

    return notes; //returns an array
}

// local storage after refresh
function localStorageAfterRefresh(){

    //get notes from local storage
    const notes = getNotesFromLS();

    notes.forEach(function(element){
        
        //create list
        const createList = document.createElement("li")
        createList.appendChild(document.createTextNode(element))
        
        //adding remove button
        const removeBtn = document.createElement("a")
        removeBtn.appendChild(document.createTextNode("X"))
        removeBtn.setAttribute("class" , "remove-note")

        
        //adding remove button to the li tag
        createList.appendChild(removeBtn)

        //adding new li tag to the note list
        noteList.appendChild(createList)


    

    })
    
}

//remove note function
function removeNote(event){
    if(event.target.classList.contains("remove-note")){
        event.target.parentElement.remove();
}
removeNoteFromLS(event.target.parentElement.textContent);

}

//removing note from local storage
function removeNoteFromLS(noteContent){

    //get notes from local storage
    const getNotes = getNotesFromLS(); //as an array

    //having access to deleted note
    let len = noteContent.length;
    let deletedNote = noteContent.substring(0 , len-1);
    
    //deleting note from the local storage
    getNotes.forEach(function(felement , index){
            if(felement === deletedNote){
                getNotes.splice(index , 1) //starts from "index" - then removes "1" element
            }
    })

    //setting new array to the local storage
    localStorage.setItem("userNotes" , JSON.stringify(getNotes))

}

//removing all the notes
function removeAllNotes(){
    localStorage.clear();
}




//localStorage.clear();

//idea: adding recycle bin - seperated note for every 12 months of the year