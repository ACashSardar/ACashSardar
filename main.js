const navbar = document.getElementById("navbar");
const skillset = document.getElementById("skillset");
const profiles = document.getElementById("profile");
const projectItems = document.getElementById("project-items");
const experienceItems = document.getElementById("experience-items");
const educationItems = document.getElementById("education-items");
const errorMsg = document.getElementById("error-msg");
const navBtn = document.getElementById("nav-btn");

const colors = ["darkcyan", "lime", "orangered"];

function changeNavIcon() {
  if (navBtn.innerHTML == '<i class="fa fa-times"></i>') {
    navBtn.innerHTML = '<i class="fa fa-bars"></i>';
    navBtn.style.color = "white";
  } else {
    navBtn.innerHTML = '<i class="fa fa-times"></i>';
    navBtn.style.color = "white";
  }
}

function download(e) {
  var link = document.createElement("a");
  link.href = "./resources/Resume_Akash_Sardar.pdf";
  link.download = "resume_Akash_Sardar.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function changeArrow(e) {
  if (e.innerHTML.includes("up")) {
    e.innerHTML = `Show Details <i class="fa fa-caret-down"></i>`;
  } else {
    e.innerHTML = `Hide Details <i class="fa fa-caret-up"></i>`;
  }
}

fetch("resources/education.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((edu, index) => {
      educationItems.innerHTML += `
        <div class="row m-0 mb-3">
          <div class="col-md-6 d-flex justify-content-center">
              <span class="me-3">
                <img src=${edu.logo}  style="height: 5rem; width: 5rem;">
              </span>
              <span class="text-start">
                <label class="fs-5 fw-bold custom-text-color">${edu.institutionName}</label>
                <p class="fs-6 fw-light text-secondary mb-0">${edu.degree}</p>
                <p class="fs-6 fw-light text-secondary mb-0">${edu.branch}</p>
              </span>
          </div>
          <div class="col-md-6 d-flex justify-content-center">
            <div class="d-flex">
              <span class="text-start">
                <label class="fs-6 fw-bold pt-2"><i class="fa fa-map-marker"></i> ${edu.location}</label>
                <p class="fs-6 fw-light text-secondary mb-0">${edu.duration}</p>
                <p class="fs-6 fw-normal text-secondary mb-0">${edu.score}</p>
              </span>
            </div>
          </div>
        </div>
      `;
    });
  });

fetch("resources/experience.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((exp, index) => {
      experienceItems.innerHTML += `
        <div class="row m-0 mb-3">
          <div class="col-md-6 d-flex justify-content-center">
              <span class="me-3">
                <img src=${exp.logo}  style="height: 5rem; width: 5rem;">
              </span>
              <span class="text-start">
                <label class="fs-5 fw-bold custom-text-color">${exp.company}</label>
                <p class="fs-6 fw-light text-secondary mb-0">Role: ${exp.role}</p>
                <p class="fs-6 fw-light text-secondary mb-0">Client: ${exp.client}</p>
              </span>
          </div>
          <div class="col-md-6 d-flex justify-content-center">
            <div class="d-flex">
              <span class="text-start">
                <label class="fs-6 fw-bold pt-2"><i class="fa fa-map-marker"></i> ${exp.location}</label>
                <p class="fs-6 fw-light text-secondary mb-0">${exp.duration}</p>
                <p class="fs-6 fw-light text-secondary mb-0">Type: ${exp.type}</p>
              </span>
            </div>
          </div>
        </div>
      `;
    });
  });

fetch("resources/skills.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((skill, index) => {
      skillset.innerHTML += `
        <div class="col-md-2 col-2" >
          <img src="${skill.logo}" class="tech-logo" alt="">
        </div>
      `;
    });
  });

fetch("resources/projects.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((project, index) => {
      projectItems.innerHTML += `
        <div class="col-md-4">
          <div class="card border-0 rounded-2 mb-5">
            <img class="rounded-2" src="${project.logo}" style="height: 14rem">
            <div class="card-body text-left">
              <h4 class="fw-bold">${project.name}</h4>
              <p class="card-text text-secondary">${project.description}<p>
              <span class="badge text-dark rounded-0 fs-6 fw-light p-3">
                <b class="me-2">Github Link(s): </b>
                ${project.githubLink
                  .map(
                    (e, index) =>
                      `<a href=${
                        e.link
                      } target="_blank" class="fw-bold me-2">Link${
                        index + 1
                      }</a>`
                  )
                  .join("")}
              </span>
              <span>
                ${
                  project.projectDetailsLink !== ""
                    ? `<a href=${project.projectDetailsLink} target="_blank">
                        <button class="btn btn-sm btn-danger fw-bold fs-6 fw-light">Watch Demo <i class="fa fa-youtube-play"></i></button>
                      </a>`
                    : `<span></span>`
                }
                ${
                  project.websiteLink !== ""
                    ? `<a href=${project.websiteLink} target="_blank">
                        <button class="btn btn-sm btn-danger fw-bold">Visit Website <i class="fa fa-globe"></i></button>
                      </a>`
                    : `<span></span>`
                }
              </span>
            </div>
          </div>
        </div>
        `;
    });
  });

fetch("resources/profile.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((profile, index) => {
      profiles.innerHTML += `
        <div class="col-3" >
          <a href="${profile.link}" target="_blank">
            <img src="${profile.logo}" class="profile-logo" alt="">
          </a>
        </div>
      `;
    });
  });

function handleFormSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const subject = e.target.subject.value;
  const body = e.target.body.value;

  sendEmail(name, email, subject, body, () => {
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.subject.value = "";
    e.target.body.value = "";
    errorMsg.innerHTML = "";
  });
}

function sendEmail(name, email, subject, body, callback) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "akashs13122000@gmail.com",
    Password: "18C2EE26A1BA83A5FB88018E92EDDD3384D3",
    To: "akashs13122000@gmail.com",
    From: email,
    Subject: subject,
    Body: body,
  }).then((message) => {
    console.log(message);
    if (message === "OK") {
      alert("Mail Sent to Akash Sardar");
      callback();
    } else {
      errorMsg.innerHTML = "Please check your Email ID";
    }
  });
}

function resetForm() {
  document.getElementById("contact-form").reset();
}
