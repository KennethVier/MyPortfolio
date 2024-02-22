// For skills counter
const numbers = document.querySelectorAll('.number');
const svgEl = document.querySelectorAll('svg circle');
const counters = Array(numbers.length);
const intervals = Array(counters.length);
counters.fill(0);

const startAnimations = () => {
    const skillsSection = document.getElementById('skills');
    const rect = skillsSection.getBoundingClientRect();
    const threshold = window.innerWidth < 768 ? 0.2 : 0.5;

    if (
        (rect.top < window.innerHeight * threshold && rect.bottom > 0) ||  // Scrolling down and skills section is in view
        (rect.bottom > window.innerHeight * (1 - threshold) && rect.top < window.innerHeight)  // Scrolling up and skills section is in view
    ) {
        numbers.forEach((number, index) => {
            if (!intervals[index]) {
                intervals[index] = setInterval(() => {
                    if (counters[index] === parseInt(number.dataset.num)) {
                        clearInterval(intervals[index]);
                        intervals[index] = null;
                    } else {
                        counters[index] += 1;
                        number.innerHTML = counters[index] + "%";
                        svgEl[index].style.strokeDashoffset = Math.floor(472 - 440 * parseFloat(number.dataset.num / 100));
                    }
                }, 30);
            }
        });
    } else {
        numbers.forEach((number, index) => {
            clearInterval(intervals[index]);
            intervals[index] = null;
            counters[index] = 0;
            number.innerHTML = "0%";
            svgEl[index].style.strokeDashoffset = 472;
        });
    }
};

const handleScrollResize = () => {
    startAnimations();
};

window.addEventListener('scroll', handleScrollResize);
window.addEventListener('resize', handleScrollResize);

startAnimations();


// For Navbar bg
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function updateActiveLinks() {
    let offset = window.innerWidth > 767 ? 500 : 100; // Adjust the offset based on screen size

    sections.forEach(sec => {
        let top = window.scrollY;
        let sectionOffset = sec.offsetTop - offset;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= sectionOffset && top < sectionOffset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            let targetLink = document.querySelector('.navbar-nav .nav-link[href="#' + id + '"]');

            if (targetLink) {
                targetLink.classList.add('active');
            }
        }
    });
}

// Initial call to set active links on page load
updateActiveLinks();

window.onscroll = updateActiveLinks;

// Check for screen size on resize
window.onresize = () => {
    // Update the offset based on screen size when resizing
    updateActiveLinks();
};



// For typewriting effect
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".type-anim", {
        strings: ["HELLO,", "WELCOME!!"],
        typeSpeed: 200,
        backSpeed: 200,
        loop: true
    });
});





// For fade-in and slide effect
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const fromTopElements = document.querySelectorAll(".from-top");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px",
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove("appear");
    } else {
      entry.target.classList.add("appear");
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});

fromTopElements.forEach(element => {
  appearOnScroll.observe(element);
});


// For navbar slide effect
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll("#main-nav li");
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add("slide-through");
    });
});

