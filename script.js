'use strict';
let submitBtn = document.querySelector('#submit-btn');
let idInput = document.querySelector('#input-id');
let nameInput = document.querySelector('#input-name');
let ageInput = document.querySelector('#input-age');
let typeInput = document.querySelector('#input-type');
let weightInput = document.querySelector('#input-weight');
let lengthInput = document.querySelector('#input-length');
let colorInput = document.querySelector('#input-color-1');
let breedInput = document.querySelector('#input-breed');
let vaccinatedInput = document.querySelector('#input-vaccinated');
let dewormedInput = document.querySelector('#input-dewormed');
let sterilizedInput = document.querySelector('#input-sterilized');
const tableBodyEl = document.querySelector('#tbody'); 
tableBodyEl.innerHTML = '';// xoa bo row 
let deleteBtn = document.querySelector('#btn-delete');
let calcBtn = document.querySelector('#calc-btn');
let petArr = []; // data thu cung
let healthyPetArr = []; // thu cung healthy
const healthyBtn = document.querySelector('#healthy-btn'); //nut show pet.
var data = {};
let BMI = '?';

// nut submit
submitBtn.addEventListener('click', function () {
    data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        BMI: BMI,
        Date: new Date(),
    };
    // chack mang petarr
    let validate = validateForm();
    if (validate === true) {
        if (petArr.length === 0) {
            petArr.push(data);
        } else {
            // check id trung nhau
            let check = checkID(idInput.value, petArr);
            if (check === true) {
                petArr.push(data); // luu du lieu vao mang
            } else {
                window.alert('ID must unique!');
            }
        }
        renderTableData(petArr); // hien thi len man hinh 
        resetForm();
    }
});

// nút delete
tableBodyEl.addEventListener('click', function (e) {

    if (e.target.id != "btn-delete") return;

    const petId = e.target.getAttribute('data-id');

    if (!petId) return;

    const isConfirm = confirm('Are you sure?');

    if (!isConfirm) return;

    console.log(`Delete pet with id = ${petId}`);

    //remove

    petArr.splice(petArr.findIndex(pet => pet.id == petId), 1);

    //reload

    renderTableData(petArr);

});

//nut show healthy pet.
healthyBtn.addEventListener('click', function () {
    let healthyCheck = healthyBtn.textContent;
    if (healthyCheck === 'Show All Pet') {
        renderTableData(petArr);
        healthyBtn.textContent = 'Show Healthy Pet';
    } else if (healthyCheck === 'Show Healthy Pet') {
        healthyPetArr = petArr.filter(checkPetHealthy);
        renderTableData(healthyPetArr);
        healthyBtn.textContent = 'Show All Pet';
    }
});

// nut Calc BMI
calcBtn.addEventListener('click', function () {
    data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        BMI: BMI,
        Date: new Date(),
    };
    for (let i = 0; i < petArr.length; i++) {
        console.log(typeof petArr[i].weight);
        console.log(typeof petArr[i].length);

        if (petArr[i].type === 'Dog') {
            petArr[i].BMI = petArr[i].weight * 703 / petArr[i].length ^ 2;
        }
        if (petArr[i].type === 'Cat') {
            petArr[i].BMI = petArr[i].weight * 886 / petArr[i].length ^ 2;
        }
    }
    renderTableData(petArr);

});

// check pets khỏe mạnh
function checkPetHealthy(data) {

    return data.vaccinated === true && data.dewormed === true && data.sterilized === true;
}; 
// check dữ liệu nhập vào
function validateForm() {
    let a = parseInt(ageInput.value), b = parseInt(weightInput.value), c = parseInt(lengthInput.value);
    if (idInput.value === "") {
        window.alert('Input empty');
        return false;
    }
    if (nameInput.value === "") {
        window.alert('Name empty');
        return false;
    }
    if (ageInput.value === "") {
        window.alert('Age empty');
        return false;
    }
    if (weightInput.value === "") {
        window.alert('Weight empty');
        return false;
    }
    if (lengthInput.value === "") {
        window.alert('length empty');
        return false;
    }
    
    if (a < 1 || a > 15) {
        window.alert('Age must be between 1 and 15!');
        return false;
    }
    if (b < 1 || b > 15) {
        window.alert('Weight must be between 1 and 15!');
        return false;
    }
    if (c < 1 || c > 100) {
        window.alert('Length must be between 1 and 100!');
        return false;
    }
    if (typeInput.value === "Select Type") {
        window.alert('Please select Type!');
        return false;
    }
    if (breedInput.value === "Select Breed") {
        window.alert('Please select Breed!');
        return false;
    }
    return true;

};

// hàm hiển thị dữ liệu trong bảng
function renderTableData(pets) {
    tableBodyEl.innerHTML = '';
    pets.forEach(displayRow);
};

function displayRow(item) {
    const row = document.createElement('tr');
    row.innerHTML = genRow(item);
    tableBodyEl.appendChild(row);
}

// hiển thị result
function genRow(row) {
    return `
    <th scope ="row">${row.id}</th>
    <td>${row.name}</td>
    <td>${row.age}</td>
    <td>${row.type}</td>
    <td>${row.weight}</td>
    <td>${row.length}</td>
    <td>${row.breed}</td>
    <td>
        <i class"bi-square-fill" style="color: ${row.color}"></i>
    </td>
    <td>
        <i class="bi ${row.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"} "></i>
    </td>
    <td>
        <i class="bi ${row.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"} "></i>
    </td>
    <td>
        <i class="bi ${row.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"} "></i>
    </td>
    <td>${row.BMI}</td>
    <td>${row.Date.getDay()} / ${row.Date.getMonth()} / ${row.Date.getFullYear()} </td>
    <td>
        <button type ="button" class = "btn btn-danger btn-delete" id = "btn-delete" data-id="${row.id}">Delete</button>
    </td>`

}

// reset
function resetForm() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}

// check id.
function checkID(id, pets) {
    let isCheck = true;
    for (let i = 0; i < pets.length; i++) {
        if (id === pets[i].id) {
            return false;
        }
    }
    return isCheck;
}