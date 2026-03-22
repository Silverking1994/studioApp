(function(){

/* =========================
   PROFILE RENDER
========================= */
function renderProfile(user){

  return `
    <div class="card">

      <div style="text-align:center;">
        <img src="${user.photo || 'https://via.placeholder.com/100'}"
             style="width:100px;height:100px;border-radius:50%;object-fit:cover;" />

        <h2>${user.name || "User"}</h2>
        <p>${user.email || ""}</p>
      </div>

      <hr style="opacity:0.2;margin:20px 0;">

      <p><strong>Location:</strong> ${user.location || "—"}</p>
      <p><strong>Membership:</strong> ${user.membership || "Standard"}</p>

      <div style="margin-top:15px;">
        <button onclick="alert('Edit Profile')">Edit Profile</button>
        <button onclick="alert('Settings')">Settings</button>
      </div>

    </div>
  `;
}

/* =========================
   STATS RENDER
========================= */
function renderStats(user){

  return `
    <div class="card">
      <h3>Stats</h3>

      <div style="display:flex;gap:20px;justify-content:space-around;">
        <div>
          <strong>${user.posts || 0}</strong>
          <div>Posts</div>
        </div>

        <div>
          <strong>${user.followers || 0}</strong>
          <div>Followers</div>
        </div>

        <div>
          <strong>${user.following || 0}</strong>
          <div>Following</div>
        </div>
      </div>

    </div>
  `;
}

/* =========================
   MAIN ENTRY
========================= */
window.renderAccountPage = function(state){

  const user = state.user || {};

  const root = document.getElementById("account-root");

  root.innerHTML = `
    ${renderProfile(user)}
    ${renderStats(user)}
  `;

};

})();
