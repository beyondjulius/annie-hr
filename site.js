(function () {
  var nav = document.getElementById("site-nav");
  var drawer = document.getElementById("nav-drawer");
  var isInner = document.body.classList.contains("inner");

  function onScroll() {
    if (!nav) return;
    if (isInner) {
      nav.classList.add("is-scrolled");
      return;
    }
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll("[data-open-nav]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!drawer) return;
      drawer.hidden = false;
      drawer.classList.add("open");
    });
  });

  document.querySelectorAll("[data-close-nav]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!drawer) return;
      drawer.classList.remove("open");
      drawer.hidden = true;
    });
  });

  function revealNow(el) {
    el.classList.add("is-in");
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        revealNow(el);
      } else {
        io.observe(el);
      }
    });
  } else {
    document.querySelectorAll(".reveal").forEach(revealNow);
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = (form.elements.namedItem("name") || {}).value || "";
      var org = (form.elements.namedItem("organisation") || {}).value || "";
      var intent = (form.elements.namedItem("intent") || {}).value || "";
      var message = (form.elements.namedItem("message") || {}).value || "";
      var subject = encodeURIComponent("Annie HR conversation — " + (org || name || "enquiry"));
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Organisation: " + org + "\n" +
        "Intent: " + intent + "\n\n" +
        message
      );
      window.location.href = "mailto:anneyeboah2021@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
})();
