/*==================== MENU SHOW AND HIDDEN ====================*/
const navMenu = $('#nav-menu');
const navToggle = $('#nav-toggle');
const navClose = $('#nav-close');

/*===== SHOW MENU =====*/
/* Validate if constant exists*/
if (navToggle.length) {
    navToggle.on('click', () => {
        navMenu.addClass('show-menu');
    });
}

/*===== HIDE MENU =====*/
/* Validate if constant exists */
if (navClose.length) {
    navClose.on('click', () => {
        navMenu.removeClass('show-menu');
    });
}

/*===== ADD SOFT SKILL BUTTON =====*/
$(document).ready(function () {
    // Button click event
    $('#addSkillBtn').click(function () {
        // Prompt user for new soft skill
        var skill = prompt('Enter a new soft skill:');

        // Check if a skill name was provided
        if (skill !== null && skill.trim() !== '') {
            // Create new soft skill elements
            var skillTitle = $('<h3>').addClass('skills__name').text(skill);
            var skillPercentage = $('<span>').addClass('skills__percentage');
            var skillTitles = $('<div>').addClass('skills__titles').append(skillTitle, skillPercentage);
            var skillBar = $('<div>').addClass('skills__bar');
            var newSkill = $('<div>').addClass('skills__data').append(skillTitles, skillBar);

            // Add the new soft skill to the container
            $('#chama2').append(newSkill);
        }
    });
});

/*=========== AJAX REQUEST IN ABOUT ME SECTION ===========*/
// Makes AJAX request to get JSON file from "About Me" section
$(document).ready(function() {
    // Makes AJAX request to get JSON file from "About Me" section
    $.ajax({
      url: 'about.json',
      dataType: 'json',
      success: function(data) {
        // Extract all information from JSON
        const description = data.description;
        const educationTitle = data.education.title;
        const educationPosition = data.education.position;
        const educationInstitution = data.education.institution;
        const educationDuration = data.education.duration;
        const educationLink = data.education.link;
        const experienceTitle = data.experience.title;
        const experiencePosition = data.experience.position;
        const experienceCompany = data.experience.company;
        const experienceDuration = data.experience.duration;
        const experienceLink = data.experience.link;
  
        // Creates the HTML to display the information
        const aboutHTML = `
          <h2 class="section__title">About Me</h2>
          <p class="about__description">${description}</p>
  
          <div class="about__display">
            <h5 class="about__info-title"><i class="uil uil-graduation-cap about__icon change-theme"></i>${educationTitle}</h5>
          </div>
          <p class="about__info-text">${educationPosition} | <a href="${educationLink}">${educationInstitution}</a><br><i class="uil uil-calendar-alt"></i>${educationDuration}</p>
  
          <div class="about__display">
            <h5 class="about__info-title"><i class="uil uil-briefcase-alt about__icon change-theme"></i>${experienceTitle}</h5>
          </div>
          <p class="about__info-text">${experiencePosition} | <a href="${experienceLink}">${experienceCompany}</a><br><i class="uil uil-calendar-alt"></i>${experienceDuration}</p>
        `;
  
        // Display the HTML in the about__content div, so the CSS Style created remains
        $('.about__content').html(aboutHTML);
      }
    });
  });
  

//==================== REMOVE MOBILE MENU ====================/
const navLink = $('.nav__link');

function linkAction() {
    const navMenu = $('#nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.removeClass('show-menu');
}
navLink.each(function () {
    $(this).on('click', linkAction);
});

//==================== ACCORDION SKILLS ====================/
const skillsContent = $('.skills__content');
console.log(skillsContent);

const skillsHeader = $('.skills__header');
console.log(skillsHeader);

function toggleSkills() {
    const itemClass = $(this).parent().attr('class');

    if (itemClass === 'skills__content skills__close') {
        $(this).parent().removeClass('skills__close').addClass('skills__open');
    }

    if (itemClass === 'skills__content skills__open') {
        $(this).parent().removeClass('skills__open').addClass('skills__close');
    }
}

skillsHeader.each(function () {
    $(this).on('click', toggleSkills);
});

//==================== SCROLL SECTIONS ACTIVE LINK ====================/
const sections = $('section[id]');

function scrollActive() {
    const scrollY = $(window).scrollTop();

    sections.each(function () {
        const sectionHeight = $(this).outerHeight();
        const sectionTop = $(this).offset().top - 50;
        const sectionId = $(this).attr('id');

        try {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                $('.nav__menu a[href*=' + sectionId + ']').addClass('active-link');
            } else {
                $('.nav__menu a[href*=' + sectionId + ']').removeClass('active-link');
            }
        } catch (error) { }

    });
}
$(window).on('scroll', scrollActive);

//==================== CHANGE BACKGROUND HEADER ====================/ 
function scrollHeader() {
    const nav = $('#header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if ($(this).scrollTop() >= 200) {
        nav.addClass('scroll-header');
    } else {
        nav.removeClass('scroll-header');
    }
}
$(window).on('scroll', scrollHeader);

//==================== SHOW SCROLL TOP ====================/ 
function scrollUp() {
    const scrollUp = $('#scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if ($(this).scrollTop() >= 560) {
        scrollUp.addClass('show-scroll');
    } else {
        scrollUp.removeClass('show-scroll');
    }
}
$(window).on('scroll', scrollUp);

//==================== DARK LIGHT THEME ====================/ 
const themeButton = $('#theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => $('body').hasClass(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.hasClass(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    $('body').addClass(selectedTheme === 'dark' ? darkTheme : '').removeClass(selectedTheme === 'light' ? darkTheme : '');
    themeButton.addClass(selectedIcon === 'uil-sun' ? iconTheme : '').removeClass(selectedIcon === 'uil-moon' ? iconTheme : '');
}

// Activate / deactivate the theme manually with the button
themeButton.on('click', () => {
    // Add or remove the dark / icon theme
    $('body').toggleClass(darkTheme);
    themeButton.toggleClass(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

//==================== SCROLL REVEAL ANIMATION ====================/
/*const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.home_data, .home_img,
            .about_data, .about_img,
            .services_content, .menu_content,
            .app_data, .app_img,
            .contact_data, .contact_button,
            .footer__content`, {
    interval: 200
})*/
