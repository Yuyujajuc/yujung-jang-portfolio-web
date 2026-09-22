/* ==========================================
   PROJECT PAGE RENDERER

   This file reads the project ID from the URL
   and fills project.html with the matching data
   from projects.js.
========================================== */


/* Get the ?id=... part from the URL */

const params = new URLSearchParams(window.location.search);

const projectId = params.get("id");


/* Find the matching project inside projects.js */

const project = projects.find(
  (item) => item.id === projectId
);


/* ==========================================
   IF PROJECT DOES NOT EXIST
========================================== */

if (!project) {

  document.body.innerHTML = `
    <main class="project-page">

      <p>
        Project not found.
      </p>

      <a
        class="project-back"
        href="index.html"
      >
        Back to Main
      </a>

    </main>
  `;

}


/* ==========================================
   IF PROJECT EXISTS
========================================== */

else {

  /* Browser tab title */

  document.title =
    `${project.title} — Yujung Jang`;


  /* ========================================
     HERO IMAGE
  ======================================== */

  const heroImage =
    document.querySelector("#project-hero");

  heroImage.src = project.hero;
  heroImage.alt = project.title;


  /* ========================================
     PROJECT TITLE
  ======================================== */

  document
    .querySelector("#project-title")
    .textContent = project.title;


  /* ========================================
     MEASUREMENTS
  ======================================== */

  const measurements =
    document.querySelector("#project-measurements");

  measurements.textContent =
    project.measurements || "";


  /*
    If a project has no measurements,
    hide that line completely.
  */

  if (!project.measurements) {
    measurements.style.display = "none";
  }


  /* ========================================
     DESCRIPTION
  ======================================== */

  const description =
    document.querySelector("#project-description");

  description.textContent =
    project.description || "";


  /*
    If there is no description,
    hide the intro section.
  */

  if (!project.description) {
    document
      .querySelector(".project-page-intro")
      .style.display = "none";
  }


  /* ========================================
     GALLERY
  ======================================== */

  const gallery =
    document.querySelector("#project-gallery");


  if (
    project.gallery &&
    project.gallery.length > 0
  ) {

    gallery.innerHTML = project.gallery
  .map((item, index) => {

    if (item.type === "video") {
      return `
        <video
          class="project-gallery-video"
          controls
          playsinline
        >
          <source src="${item.src}" type="video/mp4">
        </video>
      `;
    }

    return `
      <img
        src="${item.src}"
        alt="${project.title} detail ${index + 1}"
      >
    `;

  })
  .join("");

  }

  else {

    /*
      If there are no gallery images,
      hide the empty gallery section.
    */

    gallery.style.display = "none";

  }

}