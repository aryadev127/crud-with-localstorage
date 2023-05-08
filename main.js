// main of curd
// global variable
let selectedRow = null;
let noIndex = "A.0";
let data = {};
const DATA_CRUD = "DATA_CRUD";
const button = $("#submit");
function $(element) {
  return document.querySelector(element);
}
// localstorage system
if (localStorage.getItem(DATA_CRUD)) {
  let value = JSON.parse(localStorage.getItem(DATA_CRUD));
  for (let i in value) {
    data[i] = [value[i][0], value[i][1], value[i][2]];
    createList(i, value[i][0], value[i][1], value[i][2]);
    noIndex = i;
  }
  console.log(data);
}

function syncLocalStorage(event, noIndex, name, study, email) {
  switch (event) {
    case "ADD":
    case "UPDATE":
      data[noIndex] = [name, study, email];
      break;
    case "DELETE":
      delete data[noIndex];
      break;
  }
  localStorage.setItem(DATA_CRUD, JSON.stringify(data));
}
// basic system
function createList(noIndex, name, study, email) {
  let list = $("#list");
  let inner = `
    <tr>
      <td hidden>${noIndex}</td>
      <td>${name}</td>
      <td>${study}</td>
      <td>${email}</td>
      <td>
         <a 
         class="btn btn-warning m-1" 
         href="#" 
         onclick="edit(this)"
         >edit</a>
        <a class="btn btn-danger m-1" 
        href="#" 
        onclick="remove(this)"
        >delete</a>
      </td>
    </tr>
  `;
  list.insertAdjacentHTML("afterbegin", inner);
}

function add() {
  // get value from form and display it
  let formName = $("#name");
  let formStudy = $("#study");
  let formEmail = $("#email");

  if (selectedRow != null) {
    selectedRow.cells[1].innerText = formName.value;
    selectedRow.cells[2].innerText = formStudy.value;
    selectedRow.cells[3].innerText = formEmail.value;
    syncLocalStorage(
      "UPDATE",
      noIndex,
      formName.value,
      formStudy.value,
      formEmail.value
    );
    swal({
      title: "telah di edit",
      icon: "success",
    });
    button.value = "submit";
    selectedRow = null;
    iName = null;
    return;
  }
  indexName();
  createList(noIndex, formName.value, formStudy.value, formEmail.value);
  syncLocalStorage(
    "ADD",
    noIndex,
    formName.value,
    formStudy.value,
    formEmail.value
  );
  //sweet alert time
  swal({
    title: "berhasil menambahkan",
    icon: "success",
  });
  //remove text input after submiit
  formName.value = "";
  formStudy.value = "";
  formEmail.value = "";
}

function edit(element) {
  selectedRow = element.parentElement.parentElement;
  let formName = $("#name");
  let formStudy = $("#study");
  let formEmail = $("#email");

  formName.value = selectedRow.cells[1].innerText;
  formStudy.value = selectedRow.cells[2].innerText;
  formEmail.value = selectedRow.cells[3].innerText;
  noIndex = selectedRow.cells[0].innerText.trim();
  button.value = "edit";
  restartNoIndex();
}

function remove(element) {
  selectedRow = element.parentElement.parentElement;
  noIndex = selectedRow.cells[0].innerText.trim();
  syncLocalStorage("DELETE", noIndex);
  selectedRow.remove();
  //swal time
  swal({
    title: "dihapus",
    icon: "warning",
  });
  // back to default value
  selectedRow = null;
  restartNoIndex();
}

function indexName() {
  let split = noIndex.split(".");
  let num = eval(`${split[1]} + 1`);
  noIndex = `${split[0]}.${num}`;
  console.log(noIndex);
}

function restartNoIndex() {
  for (let i in data) {
    if (data[i]) {
      noIndex = i;
      return;
    }
  }
  noIndex = "A.0";
}
