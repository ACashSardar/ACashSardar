const navbar = document.getElementById("navbar");
const skillset = document.getElementById("skillset");
const projectItems = document.getElementById("project-items");
const experienceItems = document.getElementById("experience-items");
const educationItems = document.getElementById("education-items");
const errorMsg = document.getElementById("error-msg");

const colors = ["darkcyan", "lime", "orangered"];

window.onscroll = () => {
  if (document.documentElement.scrollTop >= 680 || window.innerWidth < 600) {
    navbar.style.background = "#333";
  } else {
    navbar.style.background = "rgba(0,0,0,0.5)";
  }
};

function download(e) {
  var link = document.createElement("a");
  link.href = "./resources/Resume_Akash.pdf";
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
        <div class="d-flex justify-content-between">
          <p class="fs-6 fw-light mb-0">${edu.degree}</p>
          <p class="fs-6 fw-normal mb-0">${edu.score}</p>
        </div>
        <div class="d-flex justify-content-between">
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
          <p class="fs-6 fw-light mb-0">Role: ${exp.role}</p>
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
        <label>
        <a
            class="show-details link-light fw-light"
            data-bs-toggle="collapse"
            href="#si${index}"
            role="button"
            aria-expanded="false"
            aria-controls="si${index}"
            onClick="changeArrow(this)"
        >
            Show Details <i class="fa fa-caret-down"></i>
        </a>
      </label>
      <div class="collapse" id="si${index}">
      <div class="card text-light border-0 card-body p-0" style="width:100%">
          ${skill.subSkills
            .map(
              (subskill, index) =>
                `
                <div class="px-3 py-2 custom-bg">
                  <div class="d-flex justify-content-between mb-1">
                      <label class="fs-6 fw-normal custom-text-color">${subskill.name}</label>
                      <label class="fs-6 fw-light pt-2">${subskill.rating}%</label>
                  </div>
                  <div class="progress" style="height:8px">
                    <div class="progress-bar bg-info" role="progressbar" style="width: ${subskill.rating}%; height:8px" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                `
            )
            .join("")}
      </div>
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
                  class="show-details link-light fw-light"
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
            <div class="card text-light custom-bg card-body mb-2" style="width:100%">
                <h5>Key Features:</h5>
                <p class="fs-6 fw-light">${project.keyFeatures}</p>

                <h5>Tools and technologies</h5>
                <p class="fs-6 fw-light">${project.technologies}</p>

                <h5>Documentation Link</h5>
                <a href=${
                  project.projectDetailsLink
                } target="_blank" class="fs-6 fw-light mb-2">${
        project.projectDetailsLink
      }</a>

                <h5>GitHub Link</h5>
                <div class="d-flex flex-column mb-2">
                ${project.githubLink
                  .map(
                    (e, index) =>
                      `<a href=${e.link} target="_blank" class="class="fs-6 fw-light me-2">${e.link}</a>`
                  )
                  .join("")}
                </div>
                
                ${
                  project.websiteLink !== ""
                    ? `<h5>Website Link</h5>
                    <a href=${project.websiteLink} target="_blank" class="fs-6 fw-light">${project.websiteLink}</a>`
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
