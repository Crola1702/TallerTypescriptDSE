import { dataCourses } from "./datacourses.js";
import { Course } from "./course.js";
import { Student } from "./student.js";

const Estudiante = new Student("José Cristóbal Arroyo Castellanos",
                               "202011404",
                               1000580058,
                               18,
                               "Calle Falsa",
                               "3155222119");

document.getElementById('nombreEstudiante')!.innerText = Estudiante.nombre;

const coursesTbody: HTMLElement = document.getElementById('courses')!;
const studentTbody: HTMLElement = document.getElementById('student-data')!;
const inputSearchBox: any = document.getElementById('search-box')!;
const inputCreditsBox: any = document.getElementById('credits-box')!;
const btn: any = document.getElementById('bfbn')!;
const totalCredits = document.getElementById('total-credits')!;
btn.onclick = () => applyFilterByName();


function renderCoursesInTable(courses: Course[]): void {
    courses.forEach(c => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${c.name}</td><td>${c.professor}</td><td>${c.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
    totalCredits.innerText = "Créditos totales: "+getTotalCredits(dataCourses).toString();
}

function renderStudentData(s: Student): void {
    let tbElement = document.createElement("tbody")
    tbElement.innerHTML= `<tr><td>Código</td><td>${s.codigo}</td></tr> 
                          <tr><td>Cédula</td><td>${s.cedula}</td></tr>
                          <tr><td>Edad</td><td>${s.edad}</td></tr>
                          <tr><td>Dirección</td><td>${s.direccion}</td></tr>
                          <tr><td>Teléfono</td><td>${s.telefono}</td></tr>`;
    studentTbody.appendChild(tbElement);
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course => totalCredits = totalCredits+course.credits));
    return totalCredits
}

function clearCoursesInTable() {
    coursesTbody.innerHTML = "";
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
}

function filterByCredits(minCredits: number, maxCredits: number, courses: Course[]): Course[] {
    let cursos: Course[] = [];
    for (let i=0; i<courses.length; i++){
        if (courses[i].credits >= minCredits && courses[i].credits <= maxCredits){
            cursos.push(courses[i]);
        }
    }
    return cursos;
}

function applyFilterByName() {
    console.log("Button Pressed");
    let text = inputSearchBox.value;
    text = (text == null) ? '': text;
    let credits = inputCreditsBox.value.split('-');
    let minCredits = 0
    let maxCredits = 10**3
    if (credits.length === 2) {
        minCredits = parseInt(credits[0]);
        maxCredits = parseInt(credits[1]);
    }
    else if (credits.length === 1) {
        minCredits = parseInt(credits[0])
        maxCredits = parseInt(credits[0])
    }
    clearCoursesInTable();
    console.log(minCredits,maxCredits);
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    coursesFiltered = filterByCredits(minCredits, maxCredits, coursesFiltered);
    renderCoursesInTable(coursesFiltered);
}

renderCoursesInTable(dataCourses);
renderStudentData(Estudiante);
