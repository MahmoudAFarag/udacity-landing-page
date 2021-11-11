/**
 * Define Global Variables
 *
 */
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");
const topBtn = document.querySelector(".top__btn");
/**
 * End Global Variables
 * Start Helper Functions
 */

// The current windows scrolled amount is added to avoid wrong calculations on second click
function scrollToSection(top, left) {
  window.scrollTo({
    behavior: "smooth",
    top: top + window.scrollY,
    left: left + window.scrollX,
  });
}

function scrollToTop() {
  window.scrollTo({
    behavior: "smooth",
    top: 0,
    left: 0,
  });
}

const activeSectionObeserver = (enteries) => {
  // destructure to get the current intersecting entery instead of the array of sections
  const [entry] = enteries;
  const navitem = document.querySelector(`.${entry.target.id}`);

  if (entry.isIntersecting) {
    navitem.classList.add("active__link");
    entry.target.classList.add("section__active");
  } else {
    entry.target.classList.remove("section__active");
    navitem.classList.remove("active__link");
  }
};
/**
 * End Helper Functions
 */

// build the nav
sections.forEach((section) => {
  let navbarItemHTML = `
    <li>
    <a href="${section.id}" class="${section.id} menu__link">${section.dataset.nav}</a>
    </li>
    `;

  navbar.insertAdjacentHTML("beforeend", navbarItemHTML);
});

// Check if mouse is over navbar, dont hide otherwise hide it
// I'm just worried about using 2 separate event listeners for this, is it fine performance wise? also I think
// the scroll event listener is too expensive or is it?
header.addEventListener("mouseenter", () => {
  header.style.opacity = 1;
});

header.addEventListener("mouseleave", () => {
  // check if we are at the top of the page, no need to hide
  if (document.body.scrollTop === 0) {
    header.style.opacity = 1;
  } else {
    header.style.opacity = 0;
  }
});

// if user stopped scrolling, hide the navbar && add scroll to top styles
document.addEventListener("scroll", () => {
  header.style.opacity = 1;

  setTimeout(() => {
    if (document.body.scrollTop <= 100) {
      header.style.opacity = 1;
      topBtn.setAttribute("style", "visibility: hidden; opacity: 0;");
    } else {
      header.style.opacity = 0;
      topBtn.setAttribute("style", "visibility: visible; opacity: 1;");
    }
  }, 500);
});

// TEST intersection api
const sectionsObserver = new IntersectionObserver(activeSectionObeserver, {
  root: null,
  threshold: 0.55,
});

sections.forEach((section) => {
  sectionsObserver.observe(section);
});

// scroll to top when top button is clicked
topBtn.addEventListener("click", scrollToTop);

// Select all links AFTER they have been generated
const navLinks = document.querySelectorAll(".menu__link");

// Loop over all links and add a click event listener to each link
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    /*
     Dynamically select the equivalent section by comparing the textContect of the clicked link 
     to the ID of the corresponding section and converting it to lowercase
  */
    const linkClass = e.target.className.split(" ")[0];
    const currentSection = document.querySelector(`#${linkClass}`);

    // Get the current selected section's coordinates (top and left) as top is the most important
    const sectionCoords = currentSection.getBoundingClientRect();

    // Invoke the scroll to the section helper function
    scrollToSection(sectionCoords.top, sectionCoords.left);
  });
});
