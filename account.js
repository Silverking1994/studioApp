window.CreativiaPage = {

  state: {
    user: null
  },

  /* =========================
     INIT
  ========================= */
  onLoad({ store }) {

    console.log("Account page loaded");

    // Get user from store (Wix user injected upstream)
    this.state.user = store.user || null;

    if (!this.state.user) {
      console.warn("No user data found");
      return;
    }

    this.renderProfile();
    this.populateFields();
    this.bindEvents();
  },

  /* =========================
     PROFILE RENDER
  ========================= */
  renderProfile() {
    const container = document.getElementById("profileSection");
    if (!container) return;

    container.innerHTML = renderProfileHead(this.state.user);
  },

  /* =========================
     FILL FORM FIELDS
  ========================= */
  populateFields() {
    const u = this.state.user;

    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const locationInput = document.getElementById("locationInput");
    const websiteInput = document.getElementById("websiteInput");

    if (nameInput) nameInput.value = u.name || "";
    if (emailInput) emailInput.value = u.email || "";
    if (locationInput) locationInput.value = u.location || "";
    if (websiteInput) websiteInput.value = u.website || "";
  },

  /* =========================
     EVENT HANDLERS
  ========================= */
  bindEvents() {

    const saveBtn = document.getElementById("saveBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const editBtn = document.getElementById("editProfileBtn");

    /* SAVE PROFILE */
    if (saveBtn) {
      saveBtn.onclick = () => {

        const updatedUser = {
          ...this.state.user,
          name: document.getElementById("nameInput").value,
          location: document.getElementById("locationInput").value,
          website: document.getElementById("websiteInput").value
        };

        this.state.user = updatedUser;

        // Send to parent (Wix / main app)
        window.parent.postMessage({
          type: "PROFILE_UPDATE",
          payload: updatedUser
        }, "*");

        alert("Profile updated successfully ✅");
      };
    }

    /* LOGOUT */
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        window.parent.postMessage({
          type: "LOGOUT"
        }, "*");
      };
    }

    /* EDIT PROFILE (optional UI toggle hook) */
    if (editBtn) {
      editBtn.onclick = () => {
        document.getElementById("nameInput").focus();
      };
    }

    /* OTHER ACTIONS */
    document.getElementById("securityBtn")?.addEventListener("click", ()=>{
      alert("Security settings coming soon");
    });

    document.getElementById("preferencesBtn")?.addEventListener("click", ()=>{
      alert("Preferences coming soon");
    });

  },

  /* =========================
     OPTIONAL PAGE DATA
  ========================= */
  setPageData(data){
    console.log("Account page data:", data);
  },

  onDestroy(){
    console.log("Account page destroyed");
  }

};
