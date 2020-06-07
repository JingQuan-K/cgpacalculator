/*
Author: Kueh Jing Quan
Date: May-June 2020
----------------------------------
*/

//VARIABLES
const defaultSubjectsNo = 6;
const maxCreditNo = 7;
const decimalPointNo = 4;

//SELECTORS
const calculatorTable = document.querySelector(".calculator-table");
const calculatorTableBody = calculatorTable.getElementsByTagName('tbody')[0];
const addSubjectButton = document.querySelector(".addSubject-btn");
const currentCGPAInput = document.querySelector(".currentCGPA");
const creditsCompletedInput = document.querySelector(".creditsCompleted");
const cgpaTargetInput = document.querySelector(".cgpaTarget");
const creditsTakingInput = document.querySelector(".creditsTaking");
const saveSettings = document.querySelector(".saveSettings-btn");
const settingsTableBody = document.querySelector(".settings-table-body");


//FUNCTIONS
//calculator-functions
function loadDefaultSubjects(){ 
    calculatorTableBody.innerHTML = '';
    let grades = getGrades();

    for(let i = 0; i < defaultSubjectsNo; i++){
        addSubject();
    }
}

function addSubject() {
    let grades = getGrades();
    let row = calculatorTableBody.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    //Subject Input
    let subjectInput = document.createElement("input");
    subjectInput.setAttribute("type","text");
    subjectInput.setAttribute("placeholder", "Eg. Calculus");
    cell1.appendChild(subjectInput);

    //Credit Select
    let creditSelect = document.createElement("select");
    creditSelect.setAttribute("class","credit");
    creditSelect.setAttribute("onchange","calculator()")
    for(let i = 0; i <= maxCreditNo; i++){
        let creditOption = document.createElement("option");
        if(i === 0){
            creditOption.append("--");
            creditOption.setAttribute("disabled", true);
            creditOption.setAttribute("selected" ,true);
            creditOption.setAttribute("value","--");
        }else{
            creditOption.append(i);
            creditOption.setAttribute("value",i);
        }
        creditSelect.appendChild(creditOption);
    }
    cell2.appendChild(creditSelect);

    //Grade Select
    let gradeSelect = document.createElement("select");
    gradeSelect.setAttribute("class","grade");
    gradeSelect.setAttribute("onchange","calculator()")
    let gradeOption = document.createElement("option");
    gradeOption.append("--");
    gradeOption.setAttribute("disabled", true);
    gradeOption.setAttribute("selected" ,true);
    gradeOption.setAttribute("value","--");
    gradeSelect.appendChild(gradeOption);

    for(let i in grades){
        let gradeOption = document.createElement("option");
        gradeOption.append(i);
        gradeOption.setAttribute("value",grades[i]);
        gradeSelect.appendChild(gradeOption);
    }
    cell3.appendChild(gradeSelect);

    //Remove Button
    cell4.innerHTML="<i class='far fa-trash-alt'></i>";
    cell4.setAttribute("onclick","removeSubject(this), calculator()");
    cell4.classList.add("removeSubject-btn");

    toggleRemoveButton();
}

function calculator(){
    let result = {semesterCredits:0, totalGradePoints:0, gpa:0, totalCredits:0, cgpa:0};

    calculateGPA(result);

    calculateCGPA(result);

    displayResults(result);

}

function calculateGPA(result){
    for (let i = 1; i < calculatorTable.rows.length; i++ ){
        let creditInput = calculatorTable.rows[i].cells[1].querySelector(".credit").value;
        let gradeInput = calculatorTable.rows[i].cells[2].querySelector(".grade").value;

        if( creditInput !== "--" &&  gradeInput !== "--"){
            let credit = parseFloat(creditInput);
            let gradeValue = parseFloat(gradeInput);
            let gradePoints = gradeValue * credit;
            result["totalGradePoints"] += gradePoints;
            result["semesterCredits"] += credit;
        }
    }

    result["gpa"] = result["totalGradePoints"] / result["semesterCredits"];
    
    if(isNaN(result["gpa"]))
        result["gpa"] = 0;
}

function calculateCGPA(result){
    let currentCGPA = parseFloat(currentCGPAInput.value);
    let creditsCompleted = parseFloat(creditsCompletedInput.value);

    if(currentCGPAInput.value !== "" && creditsCompletedInput.value !== ""){
        let currentGradePoints =  currentCGPA * creditsCompleted;
        result["totalCredits"] = result["semesterCredits"] + creditsCompleted;
        result["totalGradePoints"] += currentGradePoints;
        result["cgpa"] = result["totalGradePoints"] / result["totalCredits"];
    }
}

function calculateGPAtarget(){
    let cgpaTarget = parseFloat(cgpaTargetInput.value);
    let totalCredits = parseFloat(creditsCompletedInput.value) + parseFloat(creditsTakingInput.value);
    let currentGradePoints = parseFloat(creditsCompletedInput.value) * parseFloat(currentCGPAInput.value);

    if(currentCGPAInput.value !== "" && creditsCompletedInput.value !== "" && creditsTakingInput.value !== "" && cgpaTargetInput.value !== ""){
        let gpaTarget = (cgpaTarget * totalCredits - currentGradePoints) /  parseFloat(creditsTakingInput.value);
        document.querySelector(".gpaTargetValue").innerHTML = gpaTarget.toFixed(getDecimalPoint(gpaTarget));
    }
}

function displayResults(result){
    document.querySelector('#semesterCreditDisplay').innerHTML = result["semesterCredits"];
    document.querySelector('#gpaDisplay').innerHTML = result["gpa"].toFixed(getDecimalPoint(result["gpa"]));
    document.querySelector('#totalCreditDisplay').innerHTML = result["totalCredits"];
    document.querySelector('#cgpaDisplay').innerHTML = result["cgpa"].toFixed(getDecimalPoint(result["cgpa"]));

    document.querySelector('#gpaDisplay').style.color = getColour(result["gpa"]);
    document.querySelector('#cgpaDisplay').style.color = getColour(result["cgpa"]);
}

function getColour(value){
    let color = "";
    if(value <= 0)
        color = "grey";
    else if(value <= 2)
        color = "red";
    else if(value <= 3)
        color = "orange";
    else if(value <= 3.5)
        color ="#15a708";
    else if(value <= 4)
        color ="#00fb1d";

    return color;
}

function getDecimalPoint(value){
    let decimalPoint = decimalPointNo;
    if(value === 0)
        decimalPoint = 0;

    return decimalPoint;
}

function removeSubject(tableRow) {
    let index = tableRow.parentNode.rowIndex;
    calculatorTable.deleteRow(index);
    toggleRemoveButton();
}   

function toggleRemoveButton(){
    if(calculatorTable.rows.length === 2){
        document.querySelector(".removeSubject-btn").style.display="none";  
    }else{
        document.querySelector(".removeSubject-btn").style.display="table-cell";
    }
}

//settings-functions
function getGrades(){
    let grades = {};
    for(let i = 0; i < settingsTableBody.rows.length; i++){
        let checkBox = settingsTableBody.rows[i].cells[0].children[0];
        if(checkBox.checked){
            let grade = settingsTableBody.rows[i].cells[1].innerHTML;
            let point = settingsTableBody.rows[i].cells[2].children[0].value;
            grades[grade] = parseFloat(point);
        }
    }
    return grades;
}

function setPreSetSettings(id){
    let checkedRows = getPreSetChoice(id).slice(0,12);
    let gradeValueByRow = getPreSetChoice(id).slice(12,24);
    
    for(let i = 0; i < settingsTableBody.rows.length; i++){
        settingsTableBody.rows[i].cells[0].children[0].checked = checkedRows[i];
        settingsTableBody.rows[i].cells[2].children[0].value = gradeValueByRow[i].toFixed(2);
    }


}

function getPreSetChoice(id){
    let defaultSettings = [true, true, true, true, true, true, true, true, true, true, true, true, 4.00, 3.70, 3.30, 3.00, 2.70, 2.30, 2.00, 1.70, 1.30, 1.00, 0.70, 0.00];
    let taruc = [true, true, true, true, true, true, true, false, false, false, false, true, 4.00, 3.75, 3.50, 3.00, 2.75, 2.50, 2.00, 1.75, 1.50, 1.00, 0.75, 0.00];
    let utar = [true, true, true, true, true, true, true, false, false, false, false, true, 4.00, 3.67, 3.33, 3.00, 2.67, 2.33, 2.00, 1.67, 1.33, 1.00, 0.67, 0.00];
    let help = [true, true, true, true, true, true, true, true, false, true, false, true, 4.00, 3.75, 3.50, 3.25, 3.00, 2.75, 2.50, 2.25, 2.10, 2.00, 1.75, 0.00];

    if(id === "defaultSettings") return defaultSettings;
    else if(id === "tarucSettings") return taruc;
    else if(id === "utarSettings") return utar;
    else if(id === "helpSettings") return help;
}


//ACTIONS
window.onload = loadDefaultSubjects;
addSubjectButton.onclick = addSubject;
saveSettings.onclick = loadDefaultSubjects;

currentCGPAInput.addEventListener('keyup',calculator);
currentCGPAInput.addEventListener('keyup',calculateGPAtarget);
currentCGPAInput.addEventListener('change',calculator);
currentCGPAInput.addEventListener('change',calculateGPAtarget);

creditsCompletedInput.addEventListener('keyup',calculator);
creditsCompletedInput.addEventListener('keyup',calculateGPAtarget);
creditsCompletedInput.addEventListener('change',calculator);
creditsCompletedInput.addEventListener('change',calculateGPAtarget);

creditsTakingInput.addEventListener('keyup',calculateGPAtarget);
creditsTakingInput.addEventListener('change',calculateGPAtarget);
cgpaTargetInput.addEventListener('keyup',calculateGPAtarget);
creditsTakingInput.addEventListener('change',calculateGPAtarget);

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

  preSetTabs.forEach(tab =>{
      tab.addEventListener('click',() =>{
          preSetTabs.forEach(tab =>{
              tab.classList.remove('active')
          })
          tab.classList.add('active')
          setPreSetSettings(tab.id);
      })
  })
