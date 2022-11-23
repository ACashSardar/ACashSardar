const navbar = document.getElementById("navbar");
const skillset = document.getElementById("skillset");
const projectItems = document.getElementById("project-items");
const colors = ["limegreen", "blueviolet", "hotpink"];

window.onscroll = () => {
  if (document.documentElement.scrollTop >= 700 || window.innerWidth < 600) {
    navbar.style.background = "#333";
  } else {
    navbar.style.background = "rgba(0,0,0,0)";
  }
};

function download(e) {
  console.log(e);
  var link = document.createElement("a");
  link.href = "./resources/resume.pdf";
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
fetch("resources/skills.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((skill, index) => {
      skillset.innerHTML += `
        <li class="list-group-item rounded-0">
        <div class="d-flex justify-content-between">
            <label class="fs-4 fw-normal custom-text-color">${
              skill.name
            }</label>
            <label class="fs-6 fw-light pt-2">${skill.category}</label>
        </div>
        <span
            ><hr style="width: ${
              skill.rating
            }%; height: 5px; border:5px solid ${
        colors[index % colors.length]
      }; background: ${colors[index % colors.length]}; border-radius:5px"
        /></span>
        </li>
      `;
    });
  });

fetch("resources/projects.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item, index) => {
      projectItems.innerHTML += `
        <li class="list-group-item rounded-0">
            <p class="fs-4 fw-normal custom-text-color">${item.name}</p>
            <p>
            <a
                class="text-decoration-none link-dark fw-light"
                data-bs-toggle="collapse"
                href="#pi${index}"
                role="button"
                aria-expanded="false"
                aria-controls="pi${index}"
                onClick="changeArrow(this)"
            >
                Show Details <i class="fa fa-caret-down"></i>
            </a>
            </p>
            <div class="collapse" id="pi${index}">
            <div class="card card-body mb-2" style="width:100%">
                <h5>Key Features:</h5>
                <p class="fs-6 fw-light">${item.keyFeatures}</p>

                <h5>Tools and technologies</h5>
                <p class="fs-6 fw-light">${item.technologies}</p>

                <h5>GitHub Link</h5>
                <div class="d-flex flex-column mb-2">
                ${item.githubLink
                  .map(
                    (e, index) =>
                      `<a href=${e.link} target="_blank" class="me-2">${e.link}</a>`
                  )
                  .join("")}
                </div>
                
                ${
                  item.websiteLink !== ""
                    ? `<h5>Website Link</h5>
                    <a href=${item.websiteLink} target="_blank" class="fs-6 fw-light">${item.websiteLink}</a>`
                    : ""
                }

            </div>
            </div>
        </li>
        `;
    });
  });
