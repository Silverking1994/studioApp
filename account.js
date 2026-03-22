

document.addEventListener("mousemove", e=>{

const card=document.querySelector(".premium-card")
if(!card) return

const rect=card.getBoundingClientRect()

const x=e.clientX-rect.left
const y=e.clientY-rect.top

const rotateY=((x/rect.width)-.5)*16
const rotateX=((y/rect.height)-.5)*-16

card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

})

document.addEventListener("mouseleave",()=>{
const card=document.querySelector(".premium-card")
if(card) card.style.transform="rotateX(0) rotateY(0)"
})




const membershipTierStyles = {
  "Platinum": {
    gradient: "linear-gradient(135deg, #e5e4e2, #b0b0b0)",
    shineColor: "rgba(255,255,255,0.3)"
  },
  "Gold": {
    gradient: "linear-gradient(135deg, #ffd700, #ffb347)",
    shineColor: "rgba(255,255,255,0.35)"
  },
  "Silver": {
    gradient: "linear-gradient(135deg, #c0c0c0, #9b9b9b)",
    shineColor: "rgba(255,255,255,0.25)"
  },
  "Bronze": {
    gradient: "linear-gradient(135deg, #cd7f32, #a0522d)",
    shineColor: "rgba(255,255,255,0.2)"
  },
  "Standard": {
    gradient: "linear-gradient(135deg, #f9f9f9, #e0e0e0)",
    shineColor: "rgba(255,255,255,0.2)"
  }
};



function renderMembershipCard(memberData) {
  const hasMembership = memberData?.membership;
  const tier = memberData?.membership?.accessLevel || "Standard";
  const style = membershipTierStyles[tier] || membershipTierStyles["Standard"];

  if (hasMembership) {
    return `
      <div class="settings-section card">
        <div class="settings-grid">
          <div class="membership-card premium-card" 
               onmousemove="handleCardHover(event)" 
               onmouseleave="resetCardHover(event)"
               style="background: ${style.gradient};">

            <div class="card-inner">

              <div class="card-front">

                <div class="card-top">
                  <span class="card-brand">
                    <i class="fas fa-crown"></i> ${t("membershipAccess")}
                  </span>
                  <span class="card-tier">
                    ${tier}
                  </span>
                </div>

                <div class="card-chip"></div>

                <div class="card-number">
                  **** **** **** ${memberData.memberId?.slice(-4) || "1024"}
                </div>

                <div class="card-bottom">
                  <div class="card-holder">
                    <label>${t("fullName")}</label>
                    <span>${memberData.firstName || ""} ${memberData.lastName || ""}</span>
                  </div>

                  <div class="card-exp">
                    <label>${t("accessType")}</label>
                    <span>${memberData.membership?.accessType || "Unlimited"}</span>
                  </div>
                </div>

                <div class="card-shine" style="background: linear-gradient(120deg, ${style.shineColor} 0%, rgba(255,255,255,0) 80%)"></div>

              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Non-member card (unchanged)
    return `
      <div class="settings-section card">
        <div class="settings-grid">
          <div class="membership-card invite-card" 
               onmousemove="handleCardHover(event)" 
               onmouseleave="resetCardHover(event)">
            <div class="card-inner">
              <div class="card-front">
                <div class="card-top">
                  <span class="card-brand">
                    <i class="fas fa-star"></i> ${t("becomeMember")}
                  </span>
                </div>
                <div class="card-message">
                  <p>${t("membershipBenefitsPrompt")}</p>
                </div>
                <div class="card-shine"></div>
              </div>
              <div class="card-back">
                <div class="card-actions">
                  <button class="primary-btn" onclick="navigate('membership')">
                    ${t("subscribeNow")}
                  </button>
                </div>
                <div class="card-shine"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}



function updateMemberDetail(input) {
  const field = input.dataset.field;
  const value = input.value;

  // Support nested fields like membership.accessLevel
  const keys = field.split(".");
  let obj = memberData;
  for(let i=0; i<keys.length-1; i++){
    if(!obj[keys[i]]) obj[keys[i]] = {};
    obj = obj[keys[i]];
  }
  obj[keys[keys.length-1]] = value;

  console.log("Updated memberData:", memberData);
}




function getUserDetails(memberData) {
  if (!memberData) return [];

  return [
    { label: "Full Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Membership", field: "membership" }, // matches your card
  ].map(d => {
    // Support nested fields like membership.accessLevel if needed
    const value = d.field.split('.').reduce((obj, key) => obj?.[key], memberData);
    return { ...d, value: value ?? "-" };
  });
}



/* ================================
   PROFILE HEAD
================================= */
function renderProfileHead(member = {}){
 const lang = currentLanguage || "English";
  const name = member.name || "User";
  const email = member.email || "";
  const photo = member.photo || "https://via.placeholder.com/120";
  const website = member.website || "";
  

  const posts = member.posts ?? 0;
  const followers = member.followers ?? 0;
  const following = member.following ?? 0;
  

  const socialLinks = Array.isArray(member.socialLinks)
    ? member.socialLinks
    : [];

  const socialLinksHtml = socialLinks.map(link=>{

    const url = link?.url || "#";
    const icon = link?.icon || "fas fa-link";
    
      
   

    return `
      <a href="${url}" target="_blank" rel="noopener">
        <i class="${icon}"></i>
      </a>
    `;

  }).join("");

  const websiteHtml = website
    ? `<p><a href="${website}" target="_blank" rel="noopener">${website}</a></p>`
    : "";

  return `
  <div class="headstat headstat-profile card">

    <div class="profile-photo">
      <img src="${photo}" alt="${name}" loading="lazy">
      <div class="online-dot"></div>
    </div>

    <div class="profile-info">
      
      <div class="profile-meta">
       <h2>${name}</h2>
      <p>${email}</p>
      ${websiteHtml}

<p>
<i class="fas fa-location-dot"></i>
${member.location || "—"}
</p>

<p class="tier-badge">
<i class="fas fa-crown"></i>
${member.membership || "Standard"}
</p>

</div>

      
      
      
      <div class="profile-social-links">${socialLinksHtml}</div>
      
      
      
    </div>

    <div class="profile-stats">

      <div class="profile-stat">
        <strong>${posts}</strong>
       <span>${t("posts")}</span>
       
      </div>

      <div class="profile-stat">
        <strong>${followers}</strong>
       <span>${t("followers")}</span>
      </div>

      <div class="profile-stat">
        <strong>${following}</strong>
       <span>${t("following")}</span>
      </div>

    </div>
    <div class="profile-actions">

  <button class="primary-btn" onclick="navigate('profile')">
    <i class="fas fa-briefcase"></i> 
    ${t("portfolio")}
  </button>

  <button class="secondary-btn">
    <i class="fas fa-wallet"></i> 
    ${t("wallet")}
  </button>

</div>

  </div>
  `;
}





/* ================================
   RENDER USER SETTINGS FIELD
================================= */

function renderUserSettingsField(field){

  const lang = currentLanguage || "English";

  const label =
    translations?.[lang]?.[field.label] || field.label;

  switch(field.type){

    case "select":

      return `
      <div class="setting-item">

        <label>${label}</label>

        <select
          data-key="${field.key}"
          onchange="fieldChangeHandler(event,'${field.key}')"
        >

          ${field.options.map(o => `
            <option
              value="${o}"
              ${memberData[field.key]===o ? "selected" : ""}
            >
              ${o}
            </option>
          `).join("")}

        </select>

      </div>
      `;


    case "checkbox":

      return `
      <div class="setting-item">

        <label>

          <input
            type="checkbox"
            data-key="${field.key}"
            ${memberData[field.key] ? "checked" : ""}
            onchange="fieldChangeHandler(event,'${field.key}')"
          >

          ${label}

        </label>

      </div>
      `;


    case "file":

      return `
      <div class="setting-item">

        <label>${label}</label>

        <input
          type="file"
          data-key="${field.key}"
          onchange="previewFile(event,'${field.key}')"
        >

        <img
          class="avatar-preview"
          src="${memberData[field.key] || ''}"
          style="width:60px;height:60px;border-radius:50%;margin-top:5px;"
        >

      </div>
      `;
      
      case "button":

      return `
      <div class="setting-item">

        <label>${label}</label>
    <button class="primary-btn" onclick="${field.action}">
  ${t(field.text)}
</button>

      </div>
      `;


    case "password":

      return `
      <div class="setting-item">

        <label>${label}</label>

        <input
          type="password"
          value=""
          placeholder="Enter new password"
          data-key="${field.key}"
          onchange="fieldChangeHandler(event,'${field.key}')"
        >

      </div>
      `;


    default:

      return `
      <div class="setting-item">

        <label>${label}</label>

        <input
          type="${field.type || "text"}"
          value="${memberData[field.key] || ""}"
          data-key="${field.key}"
          onchange="fieldChangeHandler(event,'${field.key}')"
        >

      </div>
      `;

  }

}


function renderAccountActions(){

return `
<div class="card">

<h3>${t("actions")}</h3>

<div class="profile-actions">

<button class="primary-btn" onclick="toggleSettings()">
<i class="fas fa-gear"></i>
${t("editSettings")}
</button>

<button class="secondary-btn" onclick="handleAction('logout')">
<i class="fas fa-right-from-bracket"></i>
${t("logout")}
</button>

</div>

</div>
`;
}

/* ================================
   RENDER SETTINGS PAGE
================================= */

function renderSettingsPageDynamic(pageData){

  const container = document.getElementById("app-view");

  if(!container) return;

  const lang = currentLanguage || "English";
  
// 3️⃣ Details section (dynamic)
  
  const userDetailsSection = {
  type: "details",
  details: getUserDetails(memberData),
  editable: false // ← makes all fields inline editable
};

const detailsHTML = SectionRegistry.details(userDetailsSection);



  const renderSection = (section)=>{

    let html = `
      <div class="settings-section card">

        <h3>${translations?.[lang]?.[section.title] || section.title}</h3>

        <div class="settings-grid">
          ${section.fields.map(f=>renderUserSettingsField(f)).join("")}
        </div>
    `;

    if(section.subsections){

      html += section.subsections.map(sub=>`

        <div class="settings-subsection card">

          <h4>${translations?.[lang]?.[sub.title] || sub.title}</h4>

          <div class="settings-grid">
            ${sub.fields.map(f=>renderUserSettingsField(f)).join("")}
          </div>

        </div>

      `).join("");

    }

    html += `</div>`;

    return html;

  };

  let html = renderProfileHead(memberData);
  
  html += renderMembershipCard(memberData);
  html += SectionRegistry.details(userDetailsSection);

  // 4️⃣ Account actions
  html += renderAccountActions();
  if(settingsVisible){

  html += `
  <h2 style="text-align:center;margin-top:10px;">
    ${translations?.[lang]?.[pageData.title] || pageData.title}
  </h2>
  `;

  html += `<div class="settings-content">`;

  html += pageData.sections.map(renderSection).join("");

  html += `
  <button class="save-btn" onclick="saveSettingsDynamic()">
    ${translations?.[lang]?.saveChanges || "Save Changes"}
  </button>
  `;

  html += `</div>`;
  
  
  }

  container.innerHTML = html;

}

