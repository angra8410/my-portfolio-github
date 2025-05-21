'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    // Toggle active state of buttons
    toggleBtns.forEach((btn, index) => {
      if (index === i) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Toggle the button box active state
    if (i === 1) { // Tools button clicked
      toggleBtnBox.classList.add("active");
      skillsBox.classList.add("active");
    } else { // Skills button clicked
      toggleBtnBox.classList.remove("active");
      skillsBox.classList.remove("active");
    }
  });
}

/**
 * language toggle
 */

const langBtns = document.querySelectorAll("[data-lang-btn]");
const langBox = document.querySelector("[data-lang-box]");

for (let i = 0; i < langBtns.length; i++) {
  langBtns[i].addEventListener("click", function () {
    // Toggle active state of buttons
    langBtns.forEach((btn, index) => {
      if (index === i) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Toggle the button box active state for sliding
    if (i === 1) { // Es button clicked
      langBox.classList.add("active");
    } else { // En button clicked
      langBox.classList.remove("active");
    }

    // Get the language value and update
    const lang = this.getAttribute("value");
    setLanguage(lang);
  });
}

// Set initial language on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedLanguage = localStorage.getItem('preferred-language') || 'en';
  
  // Set active state on the correct button and handle sliding
  langBtns.forEach((btn, index) => {
    if (btn.getAttribute("value") === savedLanguage) {
      btn.classList.add("active");
      if (index === 1) { // Es is active
        langBox.classList.add("active");
      }
    } else {
      btn.classList.remove("active");
    }
  });
  
  // Set the language
  setLanguage(savedLanguage);
});

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

/**
 * contact form
 */

// Wait for EmailJS to load
window.addEventListener('load', function() {
  if (typeof emailjs !== 'undefined') {
    // Initialize EmailJS
    emailjs.init("WUwT4rzcyJX7RPNOk");
    console.log("EmailJS initialized");
  } else {
    console.error("EmailJS failed to load");
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the contact form
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    console.error("Contact form not found!");
    return;
  }
  console.log("Contact form found:", contactForm);

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submission started");

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      alert('Email service is not available. Please try again later.');
      return;
    }

    // Validate form
    const name = this.querySelector('[name="from_name"]').value.trim();
    const email = this.querySelector('[name="from_email"]').value.trim();
    const phone = this.querySelector('[name="from_phone"]').value.trim();
    const message = this.querySelector('[name="message"]').value.trim();

    if (!name || !email || !phone || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const templateParams = {
      from_name: name,
      from_email: email,
      from_phone: phone,
      message: message,
      to_name: 'Antonio'
    };
    console.log("Form data:", templateParams);

    // Send the email using EmailJS
    emailjs.send('service_yifcdby', 'template_dgv7l6q', templateParams)
      .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert('Message sent successfully!');
        contactForm.reset();
      })
      .catch(function(error) {
        console.error("FAILED...", error);
        alert('Failed to send message: ' + error.text);
      })
      .finally(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
});

/**
 * internationalization
 */
function setLanguage(language) {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  // Update all elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[language] && translations[language][key]) {
      element.placeholder = translations[language][key];
    }
  });

  // Store the selected language
  localStorage.setItem('preferred-language', language);

  // Update HTML lang attribute
  document.documentElement.lang = language;

  // Disparar evento para que los sliders se reajusten
  window.dispatchEvent(new Event('languagechange'));
}

/**
 * Slider animado para skills/tools
 */
function moveSkillsSlider() {
  const toggleBox = document.querySelector('.skills-toggle:not(.lang-toggle)');
  if (!toggleBox) return;
  const activeBtn = toggleBox.querySelector('.toggle-btn.active');
  if (!activeBtn) return;

  const boxRect = toggleBox.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  const left = btnRect.left - boxRect.left;
  const width = btnRect.width;

  toggleBox.style.setProperty('--skills-slider-left', `${left}px`);
  toggleBox.style.setProperty('--skills-slider-width', `${width}px`);
}

function moveLangSlider() {
  const toggleBox = document.querySelector('.lang-toggle');
  if (!toggleBox) return;
  const activeBtn = toggleBox.querySelector('.toggle-btn.active');
  if (!activeBtn) return;

  const boxRect = toggleBox.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  const left = btnRect.left - boxRect.left;
  const width = btnRect.width;

  toggleBox.style.setProperty('--lang-slider-left', `${left}px`);
  toggleBox.style.setProperty('--lang-slider-width', `${width}px`);
}

window.addEventListener('DOMContentLoaded', moveSkillsSlider);
document.querySelectorAll('.skills-toggle:not(.lang-toggle) .toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(moveSkillsSlider, 10);
  });
});
window.addEventListener('languagechange', moveSkillsSlider);

window.addEventListener('DOMContentLoaded', moveLangSlider);
document.querySelectorAll('.lang-toggle .toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(moveLangSlider, 10);
  });
});
window.addEventListener('languagechange', moveLangSlider);
