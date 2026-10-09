(function () {
  var nav = document.getElementById("site-nav");
  var drawer = document.getElementById("nav-drawer");

  function onScroll() {
    if (!nav) return;
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

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }
})();
