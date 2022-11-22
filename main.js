const skillset = document.getElementById("skillset");
const projects = document.getElementById("projects");

let projectItems = [];
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

fetch("resources/skills.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((skill, index) => {
      skillset.innerHTML += `
        <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <label class="fs-5 fw-light">${skill.name}</label>
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
    projectItems = data;

    projectItems.forEach((pi) => {
      projects.innerHTML += pi.name + " " + pi.desc + "<br>";
    });
  });
