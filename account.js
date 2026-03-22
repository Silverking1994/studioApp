(function () {

  window.CreativiaPage = {

    onLoad() {
      console.log("Account Page Loaded");

      const user = JSON.parse(localStorage.getItem("user"));

      const nameEl = document.getElementById("user-name");
      const emailEl = document.getElementById("user-email");

      if (user) {
        if (nameEl) nameEl.innerText = user.name;
        if (emailEl) emailEl.innerText = user.email;
      }

      const btn = document.getElementById("edit-profile");

      if (btn) {
        btn.onclick = () => {
          const newName = prompt("Update your name:", user.name);

          if (newName) {
            user.name = newName;

            localStorage.setItem("user", JSON.stringify(user));

            if (nameEl) nameEl.innerText = newName;

            alert("Profile updated!");
          }
        };
      }
    },

    onDestroy() {
      console.log("Account Page Destroyed");
    }

  };

})();
