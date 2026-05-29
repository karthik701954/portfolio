(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var resumeLink = document.getElementById("resume-link");
  if (resumeLink) {
    resumeLink.addEventListener("click", function (e) {
      if (resumeLink.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  }

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = document.getElementById("contact-name");
      var emailEl = document.getElementById("contact-email");
      var messageEl = document.getElementById("contact-message");
      var name = nameEl ? nameEl.value.trim() : "";
      var email = emailEl ? emailEl.value.trim() : "";
      var message = messageEl ? messageEl.value.trim() : "";

      var subject = encodeURIComponent("Portfolio Contact from " + (name || "Visitor"));
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message
      );
      window.location.href = "mailto:sanjayml9900@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  document.querySelectorAll(".cert-card__btn[href='#']").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  var certFilterBtns = document.querySelectorAll(".cert-filter__btn");
  var certCards = document.querySelectorAll(".cert-card[data-category]");
  if (certFilterBtns.length && certCards.length) {
    certFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-filter");
        certFilterBtns.forEach(function (item) {
          item.classList.remove("is-active");
        });
        btn.classList.add("is-active");

        certCards.forEach(function (card) {
          var category = card.getAttribute("data-category");
          var show = target === "all" || category === target;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  var progressFills = document.querySelectorAll(".skill-progress__fill[data-progress]");
  if (progressFills.length && "IntersectionObserver" in window) {
    var progressObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var val = Number(el.getAttribute("data-progress")) || 0;
          el.style.width = Math.max(0, Math.min(100, val)) + "%";
          progressObserver.unobserve(el);
        });
      },
      { root: null, threshold: 0.25 }
    );
    progressFills.forEach(function (bar) {
      progressObserver.observe(bar);
    });
  } else {
    progressFills.forEach(function (bar) {
      var val = Number(bar.getAttribute("data-progress")) || 0;
      bar.style.width = Math.max(0, Math.min(100, val)) + "%";
    });
  }

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  function setNavOpen(open) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!expanded);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        setNavOpen(false);
      }
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
