/* ==========================================
   PROJECT DATA

   When you add or edit projects later,
   this is the main section you will change.
========================================== */

const projects = [

  {
    id: "risd-sign-system",

    title: "RISD Sign System",
    date: "2026",
    category: "Identity",

    /* Homepage thumbnail */
    cover: "images/risd-sign-system/cover.jpg",

    /* Project page information */
    measurements: `13" x 9", 9 pages, accordion book, 2026`,

    description:
      "This identity system was added to various directories, maps and other graphics. I was inspired by the colors and overlay aesthetics of masking tape, one of many art supplies RISD students use the most.",

    /* Large image at top of project page */
    hero: "images/risd-sign-system/all-in-gray-smaller.jpg",

    /* Images that appear below the description */
    gallery: [
      { type: "image", src: "images/risd-sign-system/door-map.jpg" },
      { type: "image", src: "images/risd-sign-system/elevator.jpg" },
    ]
  },


  {
    id: "comfortably-numb",

    title: "Comfortably Numb Lyric Video",
    date: "2025",
    category: "Motion & Web",

    cover: "images/comfortably-numb/cover.gif",

    measurements: "1'55'', motion graphic animation, 2025",

    description: "This is a lyric video of Pink Floyd's song \"Comfortably Numb\". Some words in the lyrics are replaced by important symbols in the animation. For example, the word \"you\" is replaced by a dark butterfly and \"I\" is replaced by a T-pin. \"I\" and the pin has a graphic relation, and \"I\" and \"you\" have a narrative relation; a contradiction. I was inspired by butterfly taxidermy in RISD's Nature Lab. I associate the process of a caterpillar metamorphosing into a butterfly to a creative process. A caterpillar builds a cocoon and crawls in while, inside the private room, its organs and biological structures completely transforms. When it is ready it breaks the cozy cocoon to reveal itself to the scary, vast nature. I used metamorphosis as a metaphor for a small thought or a line in a sketchbook turning into a big project. A creative process almost always comes with frustration. I associate the sense of stagnation and anxiety caused from approaching deadlines with the displayed butterflies and caterpillars in the taxidermy box. ",

    hero: "images/comfortably-numb/butt-lett.jpg",

    gallery: [
      { type: "video", src: "videos/comfortably-numb/1-55.mp4" },
      { type: "image", src: "images/comfortably-numb/anyone-home.gif" },
      { type: "image", src: "images/comfortably-numb/cover.gif" },
      { type: "image", src: "images/comfortably-numb/horizon.gif" }
    ]
  },


  {
    id: "project-three",

    title: "Project Three",
    date: "2025",
    category: "Motion & Web",

    cover: "images/project-three/cover.jpg",

    measurements: "",

    description: "",

    hero: "images/project-three/cover.jpg",

    gallery: [
      /* Add images here later */
    ]
  }

];


/* ==========================================
   HOMEPAGE PROJECT CARDS

   You should NOT need to edit this section
   when adding new projects.
========================================== */

const projectsContainer = document.querySelector(".projects");


if (projectsContainer) {

  projectsContainer.innerHTML = projects
    .map((project, index) => {

      /*
        Only the first project gets the fixed
        decorative project arrow.
      */

      const guide = index === 0
        ? `
          <div class="project-guide" aria-hidden="true">

            <span
              class="project-guide-horizontal arrow-right">
            </span>

            <span
              class="project-guide-vertical arrow-down">
            </span>

          </div>
        `
        : "";


      /*
        Every project automatically links to:

        project.html?id=project-id

        Example:
        project.html?id=risd-sign-system
      */

      const projectLink =
        `project.html?id=${project.id}`;


      return `
        <article class="project">


          <div class="project-image-wrap">

            ${guide}

            <a
              href="${projectLink}"
              class="project-image"
            >

              <img
                src="${project.cover}"
                alt="${project.title}"
              >

            </a>

          </div>


          <div class="project-info">

            <h2 class="project-title">

              <a href="${projectLink}">
                ${project.title}
              </a>

            </h2>


            <div class="project-meta">

              <p>
                ${project.date}
              </p>

              <p>
                ${project.category}
              </p>

            </div>

          </div>


        </article>
      `;

    })
    .join("");

}