const navbar = document.getElementById("navbar");
const skillset = document.getElementById("skillset");
const profiles = document.getElementById("profile");
const projectItems = document.getElementById("project-items");
const experienceItems = document.getElementById("experience-items");
const educationItems = document.getElementById("education-items");
const myImg = document.getElementById("my-img");

// Fetch and render Education data
fetch("resources/education.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((edu) => {
      educationItems.innerHTML += `
        <article class="timeline-card">
          <div class="timeline-header">
            <div class="timeline-brand">
              <img src="${edu.logo}" class="brand-logo-img" alt="${edu.institutionName}">
            </div>
            <div>
              <span class="timeline-duration">${edu.duration}</span>
              <h3 class="timeline-title">${edu.institutionName}</h3>
            </div>
          </div>
          <div class="timeline-body">
            <p class="timeline-detail"><strong>Degree:</strong> ${edu.degree}</p>
            <p class="timeline-detail"><strong>Branch:</strong> ${edu.branch}</p>
            <p class="timeline-detail"><strong>Score:</strong> ${edu.score}</p>
          </div>
          <div class="timeline-footer">
            <span class="location-tag"><i class="fa-solid fa-location-dot"></i> ${edu.location}</span>
          </div>
        </article>
      `;
    });
  })
  .catch((err) => console.error("Error loading education data:", err));

// Fetch and render Experience data
fetch("resources/experience.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((exp) => {
      experienceItems.innerHTML += `
        <article class="timeline-card">
          <div class="timeline-header">
            <div class="timeline-brand">
              <img src="${exp.logo}" class="brand-logo-img" alt="${exp.company}">
            </div>
            <div>
              <span class="timeline-duration">${exp.duration}</span>
              <h3 class="timeline-title">${exp.company}</h3>
            </div>
          </div>
          <div class="timeline-body">
            <p class="timeline-detail"><strong>Position:</strong> ${exp.designation}</p>
            <p class="timeline-detail"><strong>Core Role:</strong> ${exp.role}</p>
            <p class="timeline-detail"><strong>Engagement:</strong> ${exp.type}</p>
          </div>
          <div class="timeline-footer">
            <span class="location-tag"><i class="fa-solid fa-location-dot"></i> ${exp.location}</span>
          </div>
        </article>
      `;
    });
  })
  .catch((err) => console.error("Error loading experience data:", err));

// Fetch and render Skills data
fetch("resources/skills.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((skill) => {
      skillset.innerHTML += `
        <div class="skill-tile">
          <img src="${skill.logo}" class="skill-tile-icon" alt="Tech Skill">
        </div>
      `;
    });
  })
  .catch((err) => console.error("Error loading skills data:", err));

// Fetch and render Projects data
fetch("resources/projects.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((project) => {
      let githubLinksHTML = "";
      if (project.githubLink && Array.isArray(project.githubLink)) {
        githubLinksHTML = project.githubLink
          .map(
            (e, index) =>
              `<a href="${e.link}" target="_blank" rel="noopener noreferrer" class="project-gh-link">
                <i class="fa-brands fa-github"></i> Code ${index + 1}
              </a>`,
          )
          .join("");
      }

      projectItems.innerHTML += `
        <div class="project-card">
          <div class="project-img-container">
            <img class="project-card-img" src="${project.logo}" alt="${project.name}">
          </div>
          <div class="project-card-content">
            <h3 class="project-title">${project.name}</h3>
            <div class="project-links-group">
              ${githubLinksHTML}
            </div>
            <div class="project-cta-group">
              ${
                project.projectDetailsLink !== "" &&
                project.projectDetailsLink != null
                  ? `<a href="${project.projectDetailsLink}" target="_blank" rel="noopener noreferrer" class="project-btn demo-btn">
                      <i class="fa-brands fa-youtube"></i> Demo
                    </a>`
                  : ``
              }
              ${
                project.websiteLink !== "" && project.websiteLink != null
                  ? `<a href="${project.websiteLink}" target="_blank" rel="noopener noreferrer" class="project-btn site-btn">
                      <i class="fa-solid fa-globe"></i> Visit
                    </a>`
                  : ``
              }
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch((err) => console.error("Error loading projects data:", err));

// Fetch and render Profiles data
fetch("resources/profile.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((profile) => {
      profiles.innerHTML += `
        <div class="profile-tile">
          <a href="${profile.link}" target="_blank" rel="noopener noreferrer" class="profile-tile-link">
            <img src="${profile.logo}" class="profile-tile-icon" alt="Profile Platform">
          </a>
        </div>
      `;
    });
  })
  .catch((err) => console.error("Error loading profiles data:", err));

// Morphing profile picture animation
function animateMyPic() {
  if (!myImg) return;
  let i = 30;
  let flag = true;
  let turn = 0;
  setInterval(() => {
    if (turn === 0) {
      myImg.style.borderTopLeftRadius = `${i}%`;
      myImg.style.borderBottomRightRadius = `${i}%`;
    } else {
      myImg.style.borderBottomLeftRadius = `${i}%`;
      myImg.style.borderTopRightRadius = `${i}%`;
    }

    if (flag) {
      if (i === 50) {
        flag = !flag;
        turn = (turn + 1) % 2;
      } else i++;
    } else {
      if (i === 30) {
        flag = !flag;
      } else i--;
    }
  }, 30);
}

animateMyPic();
