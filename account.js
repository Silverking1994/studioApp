window.CreativiaPage = {

  state: {
    member: null,
    editing: false
  },

  onLoad({ store, components }) {

    console.log("Account page loaded");

    this.state.member = store.user || {
      name: "Guest",
      email: "guest@creativia.com"
    };

    this.renderProfile();
    this.bindEvents();
  },

  setPageData(data){
    console.log("Page data received:", data);
  },

  renderProfile() {
    const container = document.getElementById("profile-container");
    if (!container) return;

    const m = this.state.member;

    container.innerHTML = `
      <div class="profile-box">

        <p><strong>Name:</strong> ${m.name}</p>
        <p><strong>Email:</strong> ${m.email}</p>

        <input id="nameInput" value="${m.name}" style="display:none;" />
        <input id="emailInput" value="${m.email}" style="display:none;" />

      </div>
    `;
  },

  bindEvents() {

    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");

    if (editBtn) {
      editBtn.onclick = () => {
        this.state.editing = true;

        document.getElementById("nameInput").style.display = "block";
        document.getElementById("emailInput").style.display = "block";
      };
    }

    if (saveBtn) {
      saveBtn.onclick = () => {

        const name = document.getElementById("nameInput").value;
        const email = document.getElementById("emailInput").value;

        this.state.member.name = name;
        this.state.member.email = email;

        // Notify parent (Wix or main app)
        window.parent.postMessage({
          type: "PROFILE_UPDATE",
          payload: this.state.member
        }, "*");

        alert("Profile updated!");
      };
    }

  },

  onDestroy() {
    console.log("Account page destroyed");
  }

};
