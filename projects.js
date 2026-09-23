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
    cover: { type: "image", src: "images/risd-sign-system/cover.jpg" },

    /* Project page information */
    measurements: `13" x 9", 9 pages, accordion book, 2026`,

    description:
      "This identity system was added to various directories, maps and other graphics. I was inspired by the colors and overlay aesthetics of masking tape, one of many art supplies RISD students use the most.",

    /* Large image at top of project page */
    hero: { type: "image", src: "images/risd-sign-system/all-in-gray.jpg" },

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

    cover: { type: "video", src: "videos/comfortably-numb/cover.mp4" },

    measurements: "1'55'', motion graphic animation, 2025",

    description: "This is a lyric video of Pink Floyd's song \"Comfortably Numb\". Some words in the lyrics are replaced by important symbols in the animation. For example, the word \"you\" is replaced by a dark butterfly and \"I\" is replaced by a T-pin. \"I\" and the pin has a graphic relation, and \"I\" and \"you\" have a narrative relation; a contradiction. I was inspired by butterfly taxidermy in RISD's Nature Lab. I associate the process of a caterpillar metamorphosing into a butterfly to a creative process. A caterpillar builds a cocoon and crawls in while, inside the private room, its organs and biological structures completely transforms. When it is ready it breaks the cozy cocoon to reveal itself to the scary, vast nature. I used metamorphosis as a metaphor for a small thought or a line in a sketchbook turning into a big project. A creative process almost always comes with frustration. I associate the sense of stagnation and anxiety caused from approaching deadlines with the displayed butterflies and caterpillars in the taxidermy box. ",

    hero: { type: "image", src: "images/comfortably-numb/butt-lett.jpg" },

    gallery: [
      { type: "video", src: "videos/comfortably-numb/full-vid.mp4" },
      {
        type: "video",
        src: "videos/comfortably-numb/nose-blood.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      },
      {
        type: "video",
        src: "videos/comfortably-numb/cover.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      },
      {
        type: "video",
        src: "videos/comfortably-numb/horizon.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      }
    ]
  },


  {
    id: "mind-uploading-magazine",

    title: "Mind Uploading Magazine",
    date: "2025",
    category: "Editorial",

    cover: { type: "image", src: "images/mind-uploading-magazine/cover.jpg" },

    measurements: "9\" x 12\", Magazine, 2025",

    description: "I made a magazine based on educational Youtuber Kurzgesagt's video, \"Can You Upload Your Mind And Live Forever?\" There are fold out pages at the end of each chapter, depicting the vast scale of knowledge and the universe. The magazine making process was simple. I watched Kurzgesact's video, digested the contents, and made pages based on the visual language I wanted the magazine to have.",

    hero: { type: "image", src: "images/mind-uploading-magazine/covers-spread.jpg" },

    gallery: [
      { type: "image", src: "images/mind-uploading-magazine/2-3.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/6-7.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/10-11.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/12-13.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/16-17.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/22-23.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/26-27.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/maze-spread.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/nebula.jpg" },
      { type: "image", src: "images/mind-uploading-magazine/size-comparison.jpg" },
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

  function renderProjects(projectList) {

  projectsContainer.innerHTML = projectList
    .map((project, index) => {

      const guide = index === 0
        ? `
          <div class="project-guide" aria-hidden="true">
            <span class="project-guide-horizontal arrow-right"></span>
            <span class="project-guide-vertical arrow-down"></span>
          </div>
        `
        : "";


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

              ${
                project.cover.type === "video"

                  ? `
                    <video
                      autoplay
                      loop
                      muted
                      playsinline
                      preload="metadata"
                    >
                      <source
                        src="${project.cover.src}"
                        type="video/mp4"
                      >
                    </video>
                  `

                  : `
                    <img
                      src="${project.cover.src}"
                      alt="${project.title}"
                      loading="lazy"
                      decoding="async"
                    >
                  `
              }

            </a>

          </div>


          <div class="project-info">

            <h2 class="project-title">
              <a href="${projectLink}">
                ${project.title}
              </a>
            </h2>


            <div class="project-meta">
              <p>${project.date}</p>
              <p>${project.category}</p>
            </div>

          </div>

        </article>
      `;

    })
    .join("");
}

renderProjects(projects);

const filterButtons =
  document.querySelectorAll(".filter");


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    /* Remove active state from every button */

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });


    /* Make clicked button active */

    button.classList.add("active");


    /* Read category from HTML */

    const selectedCategory =
      button.dataset.filter;


    /* ALL */

    if (selectedCategory === "all") {
      renderProjects(projects);
      return;
    }


    /* Filter projects */

    const filteredProjects =
      projects.filter((project) =>
        project.category === selectedCategory
      );


    renderProjects(filteredProjects);

  });

});

}