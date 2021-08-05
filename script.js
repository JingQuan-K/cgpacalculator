/*
Author: Kueh Jing Quan
Date Created: May 2020
----------------------------------
*/

//VARIABLES
const defaultSubjectsNo = 6;
const maxCreditNo = 7;
const decimalPointNo = 4;

//Gradepoints
let settingsArr = {
    "default": { 'A+': 4.30, 'A': 4.00, 'A-': 3.70, 'B+': 3.30, 'B': 3.00, 'B-': 2.70, 'C+': 2.30, 'C': 2.00, 'C-': 1.70, 'D+': 1.30, 'D': 1.00, 'D-': 0.70, 'F': 0.00 },
    "taruc": { 'A': 4.00, 'A-': 3.75, 'B+': 3.50, 'B': 3.00, 'B-': 2.75, 'C+': 2.50, 'C': 2.00, 'F': 0.00 },
    "utar": { 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'F': 0.00 },
    "help": { 'A': 4.00, 'A-': 3.75, 'B+': 3.50, 'B': 3.25, 'B-': 3.00, 'C+': 2.75, 'C': 2.50, 'C-': 2.25, 'D': 2.00, 'F': 0.00 },
    "inti": { 'A+': 4.00, 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'C-': 1.50, 'D': 1.00, 'F': 0.00 },
    "usm": { 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'C-': 1.67, 'D+': 1.33, 'D': 1.00, 'D-': 0.67, 'F': 0.00 },
    "ucsi": { 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'C-': 1.67, 'D+': 1.33, 'D': 1.00, 'D-': 0.67, 'F': 0.00 },
    "sunway": { 'A': 4.00, 'B+': 3.50, 'B': 3.00, 'C+': 2.50, 'C': 2.00, 'D+': 1.50, 'D': 1.00, 'F': 0.00 },
    "taylors": { 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'D+': 1.67, 'D': 1.33, 'D-': 1.00, 'F': 0.00 },
    "utm": { 'A+': 4.00, 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'C-': 1.67, 'D+': 1.33, 'D': 1.00, 'D-': 0.67, 'F': 0.00 },
    "upm": { 'A': 4.00, 'A-': 3.75, 'B+': 3.50, 'B': 3.00, 'B-': 2.75, 'C+': 2.50, 'C': 2.00, 'C-': 1.75, 'D+': 1.50, 'D': 1.00, 'F': 0.00 },
    "stpm": { 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'D+': 1.67, 'D': 1.33, 'D-': 1.00, 'F': 0.00 },
    "custom": { 'A+': 4.30, 'A': 4.00, 'A-': 3.70, 'B+': 3.30, 'B': 3.00, 'B-': 2.70, 'C+': 2.30, 'C': 2.00, 'C-': 1.70, 'D+': 1.30, 'D': 1.00, 'D-': 0.70, 'F': 0.00 }
}

//initialSavedSettings
let id = localStorage.getItem('settings') ?? 'default'
let custom = JSON.parse(localStorage.getItem('customizedSettings')) ?? settingsArr['custom']

//SELECTORS
const calculatorTable = document.querySelector(".calculator-table");
const calculatorTableBody = calculatorTable.getElementsByTagName('tbody')[0];
const addSubjectButton = document.querySelector(".addSubject-btn");
const currentCGPAInput = document.querySelector(".currentCGPA");
const creditsCompletedInput = document.querySelector(".creditsCompleted");
const cgpaTargetInput = document.querySelector(".cgpaTarget");
const creditsTakingInput = document.querySelector(".creditsTaking");
const settingsName = document.querySelector('#settingsName');
const saveSettings = document.querySelector(".saveSettings-btn");
const settingsTableBody = document.querySelector(".settings-table-body");


//FUNCTIONS
//Calculator-Functions
function loadDefaultSubjects() {
    calculatorTableBody.innerHTML = '';

    for (let i = 0; i < defaultSubjectsNo; i++) {
        addSubject();
    }
}

function addSubject() {
    let id = localStorage.getItem('settings') ?? 'default'
    let grades = settingsArr[id];
    let row = calculatorTableBody.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    //Subject Input
    let subjectInput = document.createElement("input");
    subjectInput.setAttribute("type", "text");
    subjectInput.setAttribute("placeholder", "Eg. Calculus");
    cell1.appendChild(subjectInput);

    //Credit Select
    let creditSelect = document.createElement("select");
    creditSelect.setAttribute("class", "credit");
    creditSelect.setAttribute("onchange", "calculator()")
    for (let i = 0; i <= maxCreditNo; i++) {
        let creditOption = document.createElement("option");
        if (i === 0) {
            creditOption.append("--");
            creditOption.setAttribute("disabled", true);
            creditOption.setAttribute("selected", true);
            creditOption.setAttribute("value", "--");
        } else {
            creditOption.append(i);
            creditOption.setAttribute("value", i);
        }
        creditSelect.appendChild(creditOption);
    }
    cell2.appendChild(creditSelect);

    //Grade Select
    let gradeSelect = document.createElement("select");
    gradeSelect.setAttribute("class", "grade");
    gradeSelect.setAttribute("onchange", "calculator()")
    let gradeOption = document.createElement("option");
    gradeOption.append("--");
    gradeOption.setAttribute("disabled", true);
    gradeOption.setAttribute("selected", true);
    gradeOption.setAttribute("value", "--");
    gradeSelect.appendChild(gradeOption);

    for (let i in grades) {
        let gradeOption = document.createElement("option");
        gradeOption.append(i);
        gradeOption.setAttribute("value", grades[i]);
        gradeSelect.appendChild(gradeOption);
    }
    cell3.appendChild(gradeSelect);

    //Remove Button
    cell4.innerHTML = "<i class='far fa-trash-alt'></i>";
    cell4.setAttribute("onclick", "removeSubject(this), calculator()");
    cell4.classList.add("removeSubject-btn");

    toggleRemoveButton();
}

function calculator() {
    let result = { semesterCredits: 0, totalGradePoints: 0, gpa: 0, totalCredits: 0, cgpa: 0 };

    calculateGPA(result);

    calculateCGPA(result);

    displayResults(result);

}

function calculateGPA(result) {
    for (let i = 1; i < calculatorTable.rows.length; i++) {
        let creditInput = calculatorTable.rows[i].cells[1].querySelector(".credit").value;
        let gradeInput = calculatorTable.rows[i].cells[2].querySelector(".grade").value;

        if (creditInput !== "--" && gradeInput !== "--") {
            let credit = parseFloat(creditInput);
            let gradeValue = parseFloat(gradeInput);
            let gradePoints = gradeValue * credit;
            result["totalGradePoints"] += gradePoints;
            result["semesterCredits"] += credit;
        }
    }

    result["gpa"] = result["totalGradePoints"] / result["semesterCredits"];

    if (isNaN(result["gpa"]))
        result["gpa"] = 0;
}

function calculateCGPA(result) {
    let currentCGPA = parseFloat(currentCGPAInput.value);
    let creditsCompleted = parseFloat(creditsCompletedInput.value);

    if (currentCGPAInput.value !== "" && creditsCompletedInput.value !== "") {
        let currentGradePoints = currentCGPA * creditsCompleted;
        result["totalCredits"] = result["semesterCredits"] + creditsCompleted;
        result["totalGradePoints"] += currentGradePoints;
        result["cgpa"] = result["totalGradePoints"] / result["totalCredits"];

    }
}

function calculateGPAtarget() {
    let cgpaTarget = parseFloat(cgpaTargetInput.value);
    let totalCredits = parseFloat(creditsCompletedInput.value) + parseFloat(creditsTakingInput.value);
    let currentGradePoints = parseFloat(creditsCompletedInput.value) * parseFloat(currentCGPAInput.value);

    if (currentCGPAInput.value !== "" && creditsCompletedInput.value !== "" && creditsTakingInput.value !== "" && cgpaTargetInput.value !== "") {
        let gpaTarget = (cgpaTarget * totalCredits - currentGradePoints) / parseFloat(creditsTakingInput.value);
        document.querySelector(".gpaTargetValue").innerHTML = gpaTarget.toFixed(getDecimalPoint(gpaTarget));
    }
}

function displayResults(result) {
    document.querySelector('#semesterCreditDisplay').innerHTML = result["semesterCredits"];
    document.querySelector('#gpaDisplay').innerHTML = result["gpa"].toFixed(getDecimalPoint(result["gpa"]));
    document.querySelector('#totalCreditDisplay').innerHTML = result["totalCredits"];
    document.querySelector('#cgpaDisplay').innerHTML = result["cgpa"].toFixed(getDecimalPoint(result["cgpa"]));

    document.querySelector('#gpaDisplay').style.color = getColour(result["gpa"]);
    document.querySelector('#cgpaDisplay').style.color = getColour(result["cgpa"]);
}

function getColour(value) {
    let color = "";
    if (value <= 0)
        color = "grey";
    else if (value <= 2)
        color = "red";
    else if (value <= 3)
        color = "orange";
    else if (value <= 3.5)
        color = "#15a708";
    else if (value > 3.5)
        color = "#00fb1d";

    return color;
}

//does not display decimal points if value is 0
function getDecimalPoint(value) {
    let decimalPoint = decimalPointNo;
    if (value === 0)
        decimalPoint = 0;

    return decimalPoint;
}

function removeSubject(tableRow) {
    let index = tableRow.parentNode.rowIndex;
    calculatorTable.deleteRow(index);
    toggleRemoveButton();
}

//hides remove button if there is only one subject
function toggleRemoveButton() {
    if (calculatorTable.rows.length === 2) {
        document.querySelector(".removeSubject-btn").style.display = "none";
    } else {
        document.querySelector(".removeSubject-btn").style.display = "table-cell";
    }
}

function inflateSettingsTable(id) {

    let editable = true
    if (id === 'custom')
        editable = false

    for (let i = 0; i < settingsTableBody.rows.length; i++) {

        if (settingsArr[id][settingsTableBody.rows[i].cells[1].innerHTML] != undefined) {
            settingsTableBody.rows[i].cells[0].children[0].checked = true;
            settingsTableBody.rows[i].cells[2].children[0].value = parseFloat(settingsArr[id][settingsTableBody.rows[i].cells[1].innerHTML]).toFixed(2);
        }
        else {
            settingsTableBody.rows[i].cells[0].children[0].checked = false;
            settingsTableBody.rows[i].cells[2].children[0].value = "";
        }

        settingsTableBody.rows[i].cells[0].children[0].disabled = editable;
        settingsTableBody.rows[i].cells[2].children[0].disabled = editable;
    }


}

function save() {

    //save id to local storage
    let id;
    preSetTabs.forEach(tab => {
        if (tab.classList.contains('active'))
            id = tab.id;
    })
    settingsName.innerHTML = document.querySelector('#' + id).innerHTML;
    localStorage.setItem('settings', id);
    

    //save customizedSettings to local storage
    if (id === 'custom') {
        settingsArr['custom'] = {}
        for (let i = 0; i < settingsTableBody.rows.length; i++) {
            if (settingsTableBody.rows[i].cells[0].children[0].checked) {
                settingsArr["custom"][settingsTableBody.rows[i].cells[1].innerHTML] = settingsTableBody.rows[i].cells[2].children[0].value
            }
        }
        localStorage.setItem('customizedSettings', JSON.stringify(settingsArr['custom']))
    }

}


//For page load only
function loadSettings() {
    preSetTabs.forEach(tab => {
        if (tab.id === id)
            tab.classList.add('active')
        else
            tab.classList.remove('active')
    })
    settingsArr['custom'] = custom;
    settingsName.innerHTML = document.querySelector('#' + id).innerHTML;
    inflateSettingsTable(id);

}

function toggleSettingsList(btn){
    const settingsList = document.querySelector('.settingsList')

    if (settingsList.hasAttribute('style')) {
        if (settingsList.style.display != "none")
            settingsList.style.display = "none"
        else
            settingsList.style.display = "block";
    }
    else {
        settingsList.style.display = "block"
    }

    btn.classList.toggle('fa-chevron-up');
    btn.classList.toggle('fa-chevron-down');
}


//ACTIONS
window.onload = () => {
    loadSettings();
    loadDefaultSubjects();
}
addSubjectButton.onclick = addSubject;
saveSettings.onclick = () => {
    save();
    loadDefaultSubjects();
}
currentCGPAInput.addEventListener('keyup', calculator);
currentCGPAInput.addEventListener('keyup', calculateGPAtarget);
currentCGPAInput.addEventListener('change', calculator);
currentCGPAInput.addEventListener('change', calculateGPAtarget);

creditsCompletedInput.addEventListener('keyup', calculator);
creditsCompletedInput.addEventListener('keyup', calculateGPAtarget);
creditsCompletedInput.addEventListener('change', calculator);
creditsCompletedInput.addEventListener('change', calculateGPAtarget);

creditsTakingInput.addEventListener('keyup', calculateGPAtarget);
creditsTakingInput.addEventListener('change', calculateGPAtarget);
cgpaTargetInput.addEventListener('keyup', calculateGPAtarget);
creditsTakingInput.addEventListener('change', calculateGPAtarget);

//TABS
const navBarTabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
const preSetTabs = document.querySelectorAll('.preSetTab');

navBarTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        navBarTabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

preSetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        preSetTabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        inflateSettingsTable(tab.id);
    })
})
