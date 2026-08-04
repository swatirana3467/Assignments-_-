const form = document.getElementById("feedbackForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const course = document.getElementById("course");
const feedback = document.getElementById("feedback");

const storedData = document.getElementById("storedData");
const sessionUser = document.getElementById("sessionUser");

function clearErrors() {
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("courseError").innerText = "";
    document.getElementById("feedbackError").innerText = "";
}

function displayData() {

    let data = JSON.parse(localStorage.getItem("studentFeedback"));

    if (data) {

        storedData.innerHTML = `
        <b>Name:</b> ${data.name}<br>
        <b>Email:</b> ${data.email}<br>
        <b>Course:</b> ${data.course}<br>
        <b>Feedback:</b> ${data.feedback}
        `;

    } else {

        storedData.innerHTML = "No feedback stored.";

    }

    let currentUser = sessionStorage.getItem("currentUser");

    if(currentUser){
        sessionUser.innerHTML = "Current Session User: " + currentUser;
    }else{
        sessionUser.innerHTML = "";
    }

}

displayData();

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let isValid = true;

    if (name.value.trim() === "") {
        document.getElementById("nameError").innerText =
            "Student Name is required";
        isValid = false;
    }

    if (email.value.trim() === "") {
        document.getElementById("emailError").innerText =
            "Email is required";
        isValid = false;
    }
    else {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            document.getElementById("emailError").innerText =
                "Enter a valid email address";
            isValid = false;
        }
    }

    if (course.value === "") {
        document.getElementById("courseError").innerText =
            "Please select a course";
        isValid = false;
    }

    if (feedback.value.trim() === "") {
        document.getElementById("feedbackError").innerText =
            "Feedback cannot be empty";
        isValid = false;
    }

    if (isValid) {

        const student = {
            name: name.value.trim(),
            email: email.value.trim(),
            course: course.value,
            feedback: feedback.value.trim()
        };

        localStorage.setItem(
            "studentFeedback",
            JSON.stringify(student)
        );

        sessionStorage.setItem(
            "currentUser",
            student.name
        );

        displayData();

        form.reset();
    }

});

name.addEventListener("input",()=>document.getElementById("nameError").innerText="");
email.addEventListener("input",()=>document.getElementById("emailError").innerText="");
course.addEventListener("change",()=>document.getElementById("courseError").innerText="");
feedback.addEventListener("input",()=>document.getElementById("feedbackError").innerText="");

document.getElementById("deleteBtn").addEventListener("click",function(){

    localStorage.removeItem("studentFeedback");

    sessionStorage.removeItem("currentUser");

    displayData();

});