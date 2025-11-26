let students = JSON.parse(localStorage.getItem("students")) || [];
let indexUpdate = null;

let id = document.getElementById("studentID");
let nameInput = document.getElementById("studentName");
let age = document.getElementById("studentAge");
let dept = document.getElementById("studentDepartment");
let grade = document.getElementById("studentGrade");
let year = document.getElementById("studentYear");
let fee = document.getElementById("studentFee");

let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let search = document.getElementById("search");

// DISPLAY FUNCTION
function display(list = students) {
  let box = "";
  list.forEach((std, i) => {
    // تحديد لون الكارد على حسب Fee و Grade
    let borderColor = "blue";
    if (!std.fee) borderColor = "orange";
    else if (std.grade === "F") borderColor = "red";

    // تحديد لون الـ Badge حسب Grade
    let gradeBadge = "";
    switch (std.grade) {
      case "A+":
        gradeBadge = "success";
        break;
      case "A":
        gradeBadge = "primary";
        break;
      case "B+":
        gradeBadge = "info";
        break;
      case "B":
        gradeBadge = "secondary";
        break;
      case "C":
        gradeBadge = "warning";
        break;
      case "D":
        gradeBadge = "dark";
        break;
      case "F":
        gradeBadge = "danger";
        break;
      default:
        gradeBadge = "light";
    }

    box += `
      <div class="col-md-4">
        <div class="card cardhover shadow-sm p-3 h-100" style="border-left: 6px solid ${borderColor}">
          <h5>${std.name} <small>(ID: ${std.id})</small></h5>
          <p><b>Age:</b> ${std.age}</p>
          <p><b>Department:</b> ${std.department}</p>
          <p><b>Grade:</b> <span class="badge bg-${gradeBadge}">${
      std.grade
    }</span></p>
          <p><b>Year:</b> ${std.year}</p>
          <p><b>Fee Status:</b> ${std.fee ? "Paid" : "Unpaid"}</p>
          <div class="actions mt-2">
            <button class="btn btn-sm edit me-2" onclick="editStudent(${i})">Edit</button>
            <button class="btn btn-sm del" onclick="deleteStudent(${i})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("students").innerHTML = box;
}

display();

// ADD STUDENT
addBtn.onclick = function () {
  if (
    !id.value ||
    !nameInput.value ||
    !dept.value ||
    !grade.value ||
    !year.value
  ) {
    return alert("Please fill required fields!");
  }

  if (students.some((s) => s.id == id.value))
    return alert("This ID already exists!");

  let student = {
    id: id.value,
    name: nameInput.value,
    age: age.value,
    department: dept.value,
    grade: grade.value,
    year: year.value,
    fee: fee.checked,
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  clearInputs();
  display();
};

// EDIT STUDENT
function editStudent(i) {
  indexUpdate = i;
  let s = students[i];

  id.value = s.id;
  nameInput.value = s.name;
  age.value = s.age;
  dept.value = s.department;
  grade.value = s.grade;
  year.value = s.year;
  fee.checked = s.fee;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

// UPDATE STUDENT
updateBtn.onclick = function () {
  students[indexUpdate] = {
    id: id.value,
    name: nameInput.value,
    age: age.value,
    department: dept.value,
    grade: grade.value,
    year: year.value,
    fee: fee.checked,
  };
  localStorage.setItem("students", JSON.stringify(students));
  clearInputs();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  display();
};

// DELETE STUDENT
function deleteStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  display();
}

// CLEAR INPUTS
function clearInputs() {
  id.value = "";
  nameInput.value = "";
  age.value = "";
  dept.value = "";
  grade.value = "";
  year.value = "";
  fee.checked = false;
}

// SEARCH STUDENT
search.onkeyup = function () {
  let val = search.value.toLowerCase().trim();
  if (!val) {
    display();
    return;
  }

  let filtered = students.filter(
    (s) => s.name.toLowerCase().includes(val) || s.id.toString().includes(val)
  );

  display(filtered);
};
