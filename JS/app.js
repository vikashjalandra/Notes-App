 shownotes();

// If user adds AnimationTimeline, add it to local storage 
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click",function (e){
    let addtxt = document.getElementById("addtxt");
    let addTitle = document.getElementById("addTitle");

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    let myObj ={
        title:addTitle.value, 
        text:addtxt.value
    }

    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addTitle.value="";
    shownotes();
})

   

// Function to show elements from localstorage
function shownotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;

    });
    let notesElm = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    }

    else {
        notesElm.innerHTML = `Nothing to show! use "Add a Note" Section above to add notes.`;
    }
}

// Function to Delete a Note. 

function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();

}

let search = document.getElementById('searchtxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
