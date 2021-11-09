/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");
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

/**
 * End Helper Functions
 */

// build the nav
sections.forEach((section) => {
  let navbarItemHTML = `
    <li>
    <a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>
    </li>
    `;

  navbar.insertAdjacentHTML("beforeend", navbarItemHTML);
});

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
    const currentSection = document.querySelector(
      `#${e.target.textContent.replace(" ", "").toLowerCase()}`
    );

    // Get the current selected section's coordinates (top and left) as top is the most important
    const sectionCoord = currentSection.getBoundingClientRect();

    // check if the selected section has the active class or not, if no, then add it
    // and remove all other active classes
    sections.forEach((section) => {
      if (section === currentSection) {
        section.classList.add("section__active");
      } else {
        section.classList.remove("section__active");
      }
    });

    // Invoke the scroll to the section helper function
    scrollToSection(sectionCoord.top, sectionCoord.left);

    // Same as adding the active class to a section, it adds the same hover effects
    // to the active section giving more visual feedback
    navLinks.forEach((navLink) => {
      if (navLink === e.target) {
        navLink.classList.add("active__link");
      } else {
        navLink.classList.remove("active__link");
      }
    });
  });
});
