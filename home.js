/* =========================
   CREATIVIA PAGE SCRIPT
   (GitHub Hosted)
========================= */

(function () {
  console.log("GitHub Home Script Loaded");

  // Register page logic globally
  window.CreativiaPage = {

    onLoad() {
      console.log("GitHub Page onLoad running");

      // Example interaction
      const items = document.querySelectorAll(".grid-item");

      items.forEach((el) => {
        el.addEventListener("click", () => {
          alert("GitHub Script Click: " + el.innerText);
        });
      });

      // Example: dynamic DOM change
      const heroTitle = document.querySelector("h1");
      if (heroTitle) {
        heroTitle.innerText += " 🚀";
      }
    },

    onDestroy() {
      console.log("GitHub Page destroyed");

      // Clean up if needed
      const items = document.querySelectorAll(".grid-item");
      items.forEach((el) => {
        el.replaceWith(el.cloneNode(true)); // removes listeners
      });
    }

  };

})();
