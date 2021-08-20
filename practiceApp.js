console.log("Welcome to newton app.This is practiceApp.js file");

showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");

    let notes = localStorage.getItem("notes");

    let notesArr = [];
    if (notes == null) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    }

    notesArr.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    addTxt.value = "";
    addTitle.value = "";
    // console.log("addTitle.value : "+addTitle.value);
    // console.log("addTxt.value : "+addTxt.value);

    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");

    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach((element, index) => {
        html = html + `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `;
    });

    let notesElement = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElement.innerHTML = html;
    }else{
        notesElement.innerHTML = `Nothing to show! User "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputValue = search.value;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputValue)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    });    
});
