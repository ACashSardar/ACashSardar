const skillset = document.getElementById("skillset");
const projectItems = document.getElementById("project-items");

const colors = ["limegreen", "blueviolet", "hotpink"];

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
        <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <label class="fs-5 fw-bold custom-text-color">${skill.name}</label>
            <label class="fs-6 fw-normal custom-text-color pt-2">${
              skill.category
            }</label>
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
        <li class="list-group-item">
            <p class="fs-4 fw-bold custom-text-color">${item.name}</p>
            <p>
            <a
                class="text-decoration-none link-dark fw-bold"
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
            <div class="card card-body mb-2">
                <h5>Key Features:</h5>
                <p class="fs-6 fw-light">${item.keyFeatures}</p>

                <h5>Tools and technologies</h5>
                <p class="fs-6 fw-light">${item.technologies}</p>
            </div>
            </div>
        </li>
        `;
    });
  });
