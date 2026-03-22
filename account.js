(function () {

  function waitForElement(selector, timeout = 2000) {
    return new Promise((resolve, reject) => {
      const interval = 50;
      let elapsed = 0;

      const timer = setInterval(() => {
        const el = document.querySelector(selector);

        if (el) {
          clearInterval(timer);
          resolve(el);
        }

        elapsed += interval;

        if (elapsed >= timeout) {
          clearInterval(timer);
          reject("Element not found: " + selector);
        }
      }, interval);
    });
  }

  window.CreativiaPage = {

    async onLoad() {
      console.log("Account Page Loaded");

      const user = JSON.parse(localStorage.getItem("user"));

      try {
        const nameEl = await waitForElement("#user-name");
        const emailEl = await waitForElement("#user-email");
        const btn = await waitForElement("#edit-profile");

        if (user) {
          nameEl.innerText = user.name || "";
          emailEl.innerText = user.email || "";
        }

        btn.onclick = () => {
          const newName = prompt("Update your name:", user?.name || "");

          if (newName) {
            user.name = newName;

            localStorage.setItem("user", JSON.stringify(user));

            nameEl.innerText = newName;

            alert("Profile updated!");
          }
        };

      } catch (err) {
        console.warn("Account page binding failed:", err);
      }
    },

    onDestroy() {
      console.log("Account Page Destroyed");
    }

  };

})();
