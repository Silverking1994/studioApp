/* =========================
   ACCOUNT PAGE SCRIPT
========================= */
(function () {
  console.log("Account Script Loaded");

  window.CreativiaPage = {

    onLoad() {
      console.log("Account Page onLoad");

      // Access user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      const nameEl = document.getElementById("user-name");
      const emailEl = document.getElementById("user-email");

      if (user) {
        if (nameEl) nameEl.innerText = user.name;
        if (emailEl) emailEl.innerText = user.email || "No email";
      }

      // Edit button
      const editBtn = document.getElementById("edit-profile");

      if (editBtn) {
        editBtn.onclick = () => {
          const newName = prompt("Enter new name:", user.name);

          if (newName) {
            user.name = newName;
            localStorage.setItem("user", JSON.stringify(user));

            nameEl.innerText = newName;

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
