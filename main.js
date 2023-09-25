const navbar = document.getElementById("navbar");
const skillset = document.getElementById("skillset");
const projectItems = document.getElementById("project-items");
const experienceItems = document.getElementById("experience-items");
const educationItems = document.getElementById("education-items");
const errorMsg = document.getElementById("error-msg");
const navBtn = document.getElementById("nav-btn");

const colors = ["darkcyan", "lime", "orangered"];

function changeNavIcon() {
  if (navBtn.innerHTML == '<i class="fa fa-times"></i>') {
    navBtn.innerHTML = '<i class="fa fa-bars"></i>';
    navBtn.style.color = "grey";
  } else {
    navBtn.innerHTML = '<i class="fa fa-times"></i>';
    navBtn.style.color = "red";
  }
}

window.onscroll = () => {
  if (document.documentElement.scrollTop >= 680 || window.innerWidth < 600) {
    navbar.style.background = "white";
  } else {
    navbar.style.background = "white";
  }
};

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
        <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <label class="fs-5 fw-normal custom-text-color">${edu.institutionName}</label>
            <label class="fs-6 fw-light pt-2">${edu.institutionType}</label>
        </div >
        <div class="d-flex text-primary justify-content-between">
          <p class="fs-6 fw-light mb-0">${edu.degree}</p>
          <p class="fs-6 fw-normal mb-0">${edu.score}</p>
        </div>
        <div class="d-flex text-primary justify-content-between">
          <p class="fs-6 fw-light mb-0">${edu.branch}</p>
          <p class="fs-6 fw-light mb-0">${edu.duration}</p>
        </div>
        </li>
      `;
    });
  });

fetch("resources/experience.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((exp, index) => {
      experienceItems.innerHTML += `
        <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <label class="fs-5 fw-normal custom-text-color">${
              exp.company
            }</label>
            <label class="fs-6 fw-light pt-2">${
              exp.duration + ", " + exp.location
            }</label>
        </div>
          <p class="fs-6 fw-light text-primary mb-0">Role: ${exp.role}</p>
        </li>
      `;
    });
  });

fetch("resources/skills.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((skill, index) => {
      skillset.innerHTML += `
        <li class="list-group-item">
          <label class="fs-5 fw-normal custom-text-color">${skill.name}</label>
          <br>
          <div class="card text-primary border-0 card-body p-0" style="width:100%">
              ${skill.subSkills
                .map(
                  (subskill, index) =>
                    `${subskill.name},
                    `
                )
                .join("")}
          </div>
        </li>
      `;
    });
  });

fetch("resources/projects.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((project, index) => {
      projectItems.innerHTML += `
        <li class="list-group-item">
            <label class="fs-5 fw-normal custom-text-color">${
              project.name
            }</label><br>
            <label>
              <a
                  class="show-details link-dark fw-light"
                  data-bs-toggle="collapse"
                  href="#pi${index}"
                  role="button"
                  aria-expanded="false"
                  aria-controls="pi${index}"
                  onClick="changeArrow(this)"
              >
                  Show Details <i class="fa fa-caret-down"></i>
              </a>
            </label>
            <div class="collapse" id="pi${index}">
            <div class="card text-dark custom-bg card-body mb-2" style="width:100%">
                <p class="fs-5 fw-normal text-primary mb-0">Key Features:</p>
                <p class="fs-6 fw-light">${project.keyFeatures}</p>

                <p class="fs-5 fw-normal text-primary mb-0">Tools and technologies</p>
                <p class="fs-6 fw-light">${project.technologies}</p>

                <p class="fs-5 fw-normal text-primary mb-0">Video Demo</p>

                <a href=${
                  project.projectDetailsLink
                } target="_blank" class="fs-6 fw-light link-dark mb-2">${
        project.projectDetailsLink
      }</a>

                <p class="fs-5 fw-normal text-primary mb-0">GitHub Link</p>
                <div class="d-flex flex-column mb-2">
                ${project.githubLink
                  .map(
                    (e, index) =>
                      `<a href=${e.link} target="_blank" class="fs-6 fw-light link-dark me-2">${e.link}</a>`
                  )
                  .join("")}
                </div>
                
                ${
                  project.websiteLink !== ""
                    ? `<p class="fs-5 fw-normal text-primary mb-0">Website Link</p>
                    <a href=${project.websiteLink} target="_blank" class="fs-6 fw-light link-dark">${project.websiteLink}</a>`
                    : ""
                }

            </div>
            </div>
        </li>
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
