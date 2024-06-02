const navbar = document.getElementById("navbar");
const skillset = document.getElementById("skillset");
const profiles = document.getElementById("profile");
const projectItems = document.getElementById("project-items");
const experienceItems = document.getElementById("experience-items");
const educationItems = document.getElementById("education-items");
const errorMsg = document.getElementById("error-msg");
const navBtn = document.getElementById("nav-btn");
const myImg = document.getElementById("my-img");

const colors = ["darkcyan", "lime", "orangered"];

function changeNavIcon() {
  if (navBtn.innerHTML == '<i class="fa fa-times"></i>') {
    navBtn.innerHTML = '<i class="fa fa-bars"></i>';
    navBtn.style.color = "black";
  } else {
    navBtn.innerHTML = '<i class="fa fa-times"></i>';
    navBtn.style.color = "black";
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
          <div class="col-6 d-flex justify-content-center">
              <span class="me-3">
                <img src=${edu.logo}  class="custom-brand-logo">
              </span>
              <span class="text-start">
                <label class="custom-text-lg fw-bold custom-text-color">${edu.institutionName}</label>
                <p class="custom-text-sm text-secondary mb-0">${edu.degree}</p>
                <p class="custom-text-sm text-secondary mb-0">Branch: ${edu.branch}</p>
              </span>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <div class="d-flex">
              <span class="text-start">
                <label class="custom-text-sm fw-bold">${edu.location}</label>
                <p class="custom-text-sm text-secondary mb-0">${edu.duration}</p>
                <p class="custom-text-sm text-secondary mb-0">${edu.score}</p>
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
          <div class="col-6 d-flex justify-content-center">
              <span class="me-3">
                <img src=${exp.logo}  class="custom-brand-logo">
              </span>
              <span class="text-start">
                <label class="custom-text-lg fw-bold custom-text-color">${exp.company}</label>
                <p class="custom-text-sm text-secondary mb-0">${exp.designation}</p>
                <p class="custom-text-sm text-secondary mb-0">Role: ${exp.role}</p>
              </span>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <div class="d-flex">
              <span class="text-start">
                <label class="custom-text-sm fw-bold">${exp.location}</label>
                <p class="custom-text-sm text-secondary mb-0">${exp.duration}</p>
                <p class="custom-text-sm text-secondary mb-0">Type: ${exp.type}</p>
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
          <div class="card rounded-2 border custom-bg-transparent mb-3">
            <img class="rounded-top border" src="${
              project.logo
            }" style="height: 11rem">
            <div class="card-body text-left">
              <p class="custom-text-xl mb-1">${project.name}</p>
              <span class="badge text-dark rounded-0 custom-text-lg fw-light mb-2">
                <label class="me-2">Github Link(s): </label>
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
              </span><br/>
              <span>
                ${
                  project.projectDetailsLink !== ""
                    ? `<a href=${project.projectDetailsLink} target="_blank">
                        <button class="custom-btn">Watch Demo <i class="fa fa-youtube-play"></i></button>
                      </a>`
                    : `<span></span>`
                }
                ${
                  project.websiteLink !== ""
                    ? `<a href=${project.websiteLink} target="_blank">
                        <button class="custom-btn">Visit Website <i class="fa fa-globe"></i></button>
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
        <div class="col-md-2 col-4" >
          <a href="${profile.link}" target="_blank">
            <img src="${profile.logo}" class="profile-logo" alt="">
          </a>
        </div>
      `;
    });
  });

function animateMyPic() {
  let i = 30;
  let flag = true;
  let turn = 0;
  setInterval(() => {
    if (turn == 0) {
      myImg.style.borderTopLeftRadius = `${i}%`;
      myImg.style.borderBottomRightRadius = `${i}%`;
    } else {
      myImg.style.borderBottomLeftRadius = `${i}%`;
      myImg.style.borderTopRightRadius = `${i}%`;
    }
    myImg.style.background = `rgb(${(i * 2) % 255} , ${(i * 2) % 255}, ${
      (i * 2) % 255
    })`;

    if (flag) {
      if (i == 50) {
        flag = !flag;
        turn = (turn + 1) % 2;
      } else i++;
    } else {
      if (i == 30) {
        flag = !flag;
      } else i--;
    }
  }, 30);
}

animateMyPic();
