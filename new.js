document.addEventListener("DOMContentLoaded", function () {
  // ========= WOW Animation
  window.wow = new WOW({
    live: false,
    offset: 50,
  });
  window.wow.init();

  // ========= GLightbox
  const lightbox = GLightbox({
    href: "https://www.youtube.com/watch?v=r44RKWyfcFw",
    type: "video",
    source: "youtube", // vimeo, youtube or local
    width: 900,
    autoplayVideos: true,
  });

  // ========= Dark Mode Toggler
  const darkTogglerCheckbox = document.querySelector("#darkToggler");
  const html = document.querySelector("html");

  function darkModeToggler() {
    if (darkTogglerCheckbox.checked) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
  }

  darkModeToggler();
  darkTogglerCheckbox.addEventListener("click", darkModeToggler);

  // ========= Sticky Header + Back to Top
  window.onscroll = function () {
    const ud_header = document.querySelector(".header");
    const sticky = ud_header.offsetTop;

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    const backToTop = document.querySelector(".back-to-top");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // ========= Responsive Navbar
  const navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
  });

  // Close menu on link click
  document.querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a").forEach(function (e) {
    e.addEventListener("click", function () {
      navbarToggler.classList.remove("navbarTogglerActive");
      navbarCollapse.classList.add("hidden");
    });
  });

  // ========= Submenu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach(function (el) {
    el.querySelector("a").addEventListener("click", function () {
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });

  // ========= FAQ Accordion
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach(function (el) {
    el.querySelector(".faq-btn").addEventListener("click", function () {
      el.querySelector(".icon").classList.toggle("rotate-180");
      el.querySelector(".faq-content").classList.toggle("hidden");
    });
  });

  // ==== for menu scroll
  const pageLink = document.querySelectorAll(".menu-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  // section menu active
  function onScroll(event) {
    const sections = document.querySelectorAll(".menu-scroll");
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;
      if (refElement.offsetTop <= scrollTopMinus && refElement.offsetTop + refElement.offsetHeight > scrollTopMinus) {
        document.querySelector(".menu-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  // ========= Scroll To Top Smooth
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    function animateScroll() {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }
    animateScroll();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  document.querySelector(".back-to-top").onclick = function () {
    scrollTo(document.documentElement);
  };
});
