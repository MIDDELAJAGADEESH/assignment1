
let studentname = document.querySelector(".taking-input-name");
let studentid = document.querySelector(".taking-input-id");
let studentmail = document.querySelector(".taking-input-mail");
let studentph = document.querySelector(".taking-input-ph");
let button = document.querySelector(".add");
let empty = document.getElementsByTagName("input");
let display = document.querySelector(".newsection");

button.addEventListener('click', function () {
    let allFilled = true;
    for (let i of empty) {
        if (i.value === "") {
            allFilled = false;
            break;
        }
    }
//taking only coorect inputs based on field type
    if (!allFilled) {
        alert("Input should not be empty. Fill all fields.");
        return;
    }

    if (isNaN(studentid.value)) {
        alert("ID should be a number.");
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(studentname.value)) {
        alert("Name should only contain letters.");
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(studentmail.value)) {
        alert("Enter a valid email address.");
        return;
    }
    if (!/^\d{10}$/.test(studentph.value)) {
        alert("Phone number should be 10 digits.");
        return;
    }

    let newSection = document.createElement('section');
    newSection.className = "newdetails";

    for (let j = 0; j < empty.length; j++) {
        let info = document.createElement('span');
        info.innerText = empty[j].value;
        newSection.appendChild(info);
    }

    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    editButton.className = 'sectionbutton';
    deleteButton.className = 'sectionbutton';
    editButton.innerText = "Edit";
    deleteButton.innerText = "Delete";
    newSection.appendChild(editButton);
    newSection.appendChild(deleteButton);
    display.appendChild(newSection);
    display.scrollTop = display.scrollHeight;
    //this make input fileds empty after clicking and add
    for (i of empty){
        i.value="";
    }

    save();
// edit sutudent enterd details
    editButton.addEventListener('click', function () {
        if (editButton.innerText === "Edit") {
            let convert = newSection.querySelectorAll('span');
            convert.forEach(span => {
                let newInput = document.createElement('input');
                newInput.value = span.innerText;
                span.replaceWith(newInput);
            });
            editButton.innerText = "Save";
        } else {
            let convert = newSection.querySelectorAll('input');
            convert.forEach(input => {
                let convertToSpan = document.createElement('span');
                convertToSpan.innerText = input.value;
                input.replaceWith(convertToSpan);
            });
            editButton.innerText = "Edit";
            save();
        }
    });
//delete details
    deleteButton.addEventListener('click', function () {
        newSection.remove();
        save();
    });
});

function save() {
    localStorage.setItem('savedata', display.innerHTML);
}
//this helps to change the sutudent enterd details
function show() {
    display.innerHTML = localStorage.getItem('savedata');
    let sections = display.querySelectorAll('section');
    sections.forEach(section => {
        let editButton = section.querySelector('button:nth-of-type(1)');
        let deleteButton = section.querySelector('button:nth-of-type(2)');

        editButton.addEventListener('click', function () {
            if (editButton.innerText === "Edit") {
                let convert = section.querySelectorAll('span');
                convert.forEach(span => {
                    let newInput = document.createElement('input');
                    newInput.value = span.innerText;
                    span.replaceWith(newInput);
                });
                editButton.innerText = "Save";
            } else {
                let convert = section.querySelectorAll('input');
                convert.forEach(input => {
                    let convertToSpan = document.createElement('span');
                    convertToSpan.innerText = input.value;
                    input.replaceWith(convertToSpan);
                });
                editButton.innerText = "Edit";
                save();
            }
        });

        deleteButton.addEventListener('click', function () {
            section.remove();
            save();
        });
    });
}

show();