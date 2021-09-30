import { dataCourses } from "./datacourses.js";
import { Student } from "./student.js";
var Estudiante = new Student("José Cristóbal Arroyo Castellanos", "202011404", 1000580058, 18, "Calle Falsa", "3155222119");
document.getElementById('nombreEstudiante').innerText = Estudiante.nombre;
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student-data');
var inputSearchBox = document.getElementById('search-box');
var inputCreditsBox = document.getElementById('credits-box');
var btn = document.getElementById('bfbn');
var totalCredits = document.getElementById('total-credits');
btn.onclick = function () { return applyFilterByName(); };
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td><td>" + c.professor + "</td><td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
    totalCredits.innerText = "Créditos totales: " + getTotalCredits(dataCourses).toString();
}
function renderStudentData(s) {
    var tbElement = document.createElement("tbody");
    tbElement.innerHTML = "<tr><td>C\u00F3digo</td><td>" + s.codigo + "</td></tr> \n                          <tr><td>C\u00E9dula</td><td>" + s.cedula + "</td></tr>\n                          <tr><td>Edad</td><td>" + s.edad + "</td></tr>\n                          <tr><td>Direcci\u00F3n</td><td>" + s.direccion + "</td></tr>\n                          <tr><td>Tel\u00E9fono</td><td>" + s.telefono + "</td></tr>";
    studentTbody.appendChild(tbElement);
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach((function (course) { return totalCredits = totalCredits + course.credits; }));
    return totalCredits;
}
function clearCoursesInTable() {
    coursesTbody.innerHTML = "";
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function filterByCredits(minCredits, maxCredits, courses) {
    var cursos = [];
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].credits >= minCredits && courses[i].credits <= maxCredits) {
            cursos.push(courses[i]);
        }
    }
    return cursos;
}
function applyFilterByName() {
    console.log("Button Pressed");
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    var credits = inputCreditsBox.value.split('-');
    var minCredits = 0;
    var maxCredits = Math.pow(10, 3);
    if (credits.length === 2) {
        minCredits = parseInt(credits[0]);
        maxCredits = parseInt(credits[1]);
    }
    else if (credits.length === 1) {
        minCredits = parseInt(credits[0]);
        maxCredits = parseInt(credits[0]);
    }
    clearCoursesInTable();
    console.log(minCredits, maxCredits);
    var coursesFiltered = searchCourseByName(text, dataCourses);
    coursesFiltered = filterByCredits(minCredits, maxCredits, coursesFiltered);
    renderCoursesInTable(coursesFiltered);
}
renderCoursesInTable(dataCourses);
renderStudentData(Estudiante);
