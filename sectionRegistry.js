

const MiniLayouts = {

  projectHead(options = {}){

    return `
      <div class="project-head-content">

        <div class="project-title">
          ${options.title || "Project"}
        </div>

        <div class="project-meta">
          ${options.subtitle || ""}
        </div>

      </div>
    `;
  },

 bgImage(options = {}){

  return `
    <div class="bg-head"
      style="background-image:url('${options.image || ""}')">

      <div class="bg-overlay">

        <h2>${options.title || ""}</h2>
        <p>${options.subtitle || ""}</p>

      </div>

    </div>
  `;
},
decoration(options = {}){

  return `
    <div class="head-decoration">

      ${options.icon ? `
      <div class="decoration-icon ${options.type || ""}">
        <img src="${options.icon}">
      </div>
      ` : ""}

      ${options.label ? `
      <div class="decoration-label">
        ${options.label}
      </div>
      ` : ""}

    </div>
  `;
},

    
  member(options = {}){

    return `
      <div class="member-head">

        <img class="member-avatar"
          src="${memberData?.photo || 'https://i.pravatar.cc/300'}">

        <div>

          <div class="member-name">
            ${memberData?.name || "Member"}
          </div>

          <div class="member-level">
            ${memberData?.membership?.accessLevel || ""}
          </div>

        </div>

      </div>
    `;
  }

};

/* =====================================================
  HEAD STATS CONTENT TYPE RENDERING
===================================================== */




const HeadStatLayouts = {

  dashboard: renderDashboardHeadStat,

  profile: renderProfileHeadStat,

  minimal: renderMinimalHeadStat

};



/* =====================================================
   SECTION REGISTRY (DYNAMIC) — FULL
===================================================== */




const SectionRegistry = {





headStat(section){

const type = section.contentType || "dashboard";

const renderer = HeadStatRegistry[type];

const content = renderer
? renderer(section.headStat || {})
: "";

return `
<div class="page-head-wrap">

<div class="cards-container card headstat-card card-header  ">


</div>

</div>

`;

},






  /* ================= PROFILE HERO ================= */
  
  
  profileInfo(section){

return `
<div class="profile-info card">

  <div class="profile-bio">
    ${memberData?.bio || "Creative thinker building the future."}
  </div>

  <div class="profile-stats">

    <div class="profile-stat">
      <strong>${memberData?.followers || 0}</strong>
      <span>Followers</span>
    </div>

    <div class="profile-stat">
      <strong>${memberData?.following || 0}</strong>
      <span>Following</span>
    </div>

    <div class="profile-stat">
      <strong>${memberData?.posts || 0}</strong>
      <span>Posts</span>
    </div>

  </div>

  <div class="profile-actions">

    <button class="primary-btn" onclick="handleAction('messageUser')">
      <i class="fas fa-envelope"></i> Message
    </button>

    <button class="secondary-btn" onclick="handleAction('connectUser')">
      <i class="fas fa-user-plus"></i> Connect
    </button>

  </div>

</div>
`;
},
  
  

  profilePhoto(){
  

    return `
      <div class="profile-photo">
       <img src="${
          memberData?.photo ||
          memberData?.profilePhoto ||
          "https://i.pravatar.cc/300"
        }" alt="Profile">

        <div class="online-dot"></div>

      </div>
    `;
  },



  /* ================= HERO ================= */

  hero(section){
    return `
      <div class="hero-row card">
        ${(section.items || []).map(item => `
          <div class="hero-card">
            ${
              item.media === "video"
              ? `<video src="${item.src}" autoplay muted loop></video>`
              : `<img src="${item.src}">`
            }
            <div class="hero-overlay">${item.title || ""}</div>
          </div>
        `).join("")}
      </div>
    `;
  },

  /* ================= CAROUSEL ================= */

  carousel(section){
    return `
      <div class="carousel-row">
        ${(section.items || []).map(item => `
          <div class="carousel-card">
            <img src="${item.image}">
            <div class="carousel-title">${item.title || ""}</div>
          </div>
        `).join("")}
      </div>
    `;
  },

  /* ================= DISCOVER ================= */

  discover(section){
    return `
      <div class="discover-grid">
        ${(section.items || []).map(item => `
          <div class="discover-card">
            <img src="${item.image}" alt="${item.title}">
            <span>${item.title}</span>
          </div>
        `).join("")}
      </div>
    `;
  },

  /* ================= POSTS ================= */

  posts(section){
    return `
      <div class="post-list">
        ${(section.items || []).map(item => `
          <div class="post-card">
            <img src="${item.image}" alt="${item.title}">
            <div class="post-content">
              <h3>${item.title}</h3>
              <p>${item.desc || ""}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  
  /* ================= STATS ================= */

  stats(section){

    if(!section.stats || !section.stats.length) return "";

    return `
      <div class="grid grid-card">

        ${section.stats.slice(0,3).map(stat=>{

          const str = String(stat.value);
          const match = str.match(/[\d,.]+/);

          let numericValue = NaN;
          let prefix = "";
          let suffix = "";

          if(match){
            numericValue = parseFloat(match[0].replace(/,/g,""));
            prefix = str.slice(0,match.index);
            suffix = str.slice(match.index + match[0].length);
          }

          return `
            <div class="stat" id="${stat.id}">

              ${t(stat.label)}

              <div class="highlight ${!isNaN(numericValue) ? "counter":""}"

                ${!isNaN(numericValue)
                  ? `data-target="${numericValue}" data-prefix="${prefix}" data-suffix="${suffix}"`
                  : ""}>

                ${stat.value}

              </div>

            </div>
          `;

        }).join("")}

      </div>
    `;
  },

  /* ================= DETAILS ================= */
  
  details(section){

  if(!section.details) return "";
  const title = "accountDetails";

  return `
    <div class="card details-section">

      <div class="title">${t(title)}</div>

      ${section.details.map(d => {
        const displayValue =
          d.value ??
          memberData?.[d.field] ??
          "-";

        // If editable, render input field
        const fieldHTML = section.editable
          ? `<input type="text" 
                    class="detail-input" 
                    data-field="${d.field}" 
                    value="${displayValue}"
                    onchange="updateMemberDetail(this)">`
          : `<span>${displayValue}</span>`;

        return `
          <div class="detail-item">
            <span>${t(d.label)}</span>
            ${fieldHTML}
          </div>
        `;

      }).join("")}

    </div>
  `;
},


  /* ================= ACTIONS ================= */

  actions(section){

    if(!section.actions) return "";

    return `
      <div class="card">

        <div class="title">Actions</div>

        <div class="action-grid">

          ${section.actions.map(a => `

            <button
              class="action-btn ${a.type || ""}"
              id="action-${a.action}"
              onclick='handleAction("${a.action}", ${JSON.stringify(a)})'>

              ${a.icon ? `<span class="icon">${a.icon}</span>` : ""}

              <span class="label">${t(a.label)}</span>

            </button>

          `).join("")}

        </div>

      </div>
    `;
  },

  /* ================= CHART ================= */


chart(section){

const chartId = section.id || "pageChart";

return `
<div class="card chart-section">
  <canvas id="${chartId}" height="120"></canvas>
</div>
`;

},

  

  /* ================= CONTROLS ================= */

  controls(section){

    return `
      <div class="controls grid">

        <div class="search-box">
          <input
            type="text"
            id="searchInput"
            placeholder="${section.placeholder || "Search..."}">
        </div>

        <div class="filters" id="filters"></div>

      </div>
    `;
  },

  /* ================= CARDS GRID ================= */
  
  cards(section){

  const gridId = section.id || `grid-${Math.random().toString(36).substr(2,5)}`;

  return `
    <div class="cards-container">
      <div class="grid" id="${gridId}"></div>
    </div>
  `;
},

  /* ================= MEDIA ================= */


media(section){

const sectionId = section.id || `media-${Math.random().toString(36).substr(2,6)}`;

const controlsEnabled = section.controls !== false;

const showSearch =
typeof section.controls === "object"
? section.controls.showSearch ?? true
: true;

const showFilters =
typeof section.controls === "object"
? section.controls.showFilters ?? true
: true;

return `
<div class="media-section">

${controlsEnabled ? `
<div class="media-controls grid">

${showSearch ? `
<div class="search-box">
<input type="text" id="mediaSearch-${sectionId}" placeholder="Search media...">
</div>
` : ""}

${showFilters ? `
<div class="media-filters-wrapper horizontal-scroller">
<div class="filter-buttons" id="mediaFilters-${sectionId}">
${(section.filters || []).map(f => `
<button class="filter-btn ${f==="All"?"active":""}">
${f}
</button>
`).join("")}
</div>
</div>
` : ""}

</div>
` : ""}

<div class="media-grid" id="mediaGrid-${sectionId}"></div>

</div>
`;

}

};
function renderMediaGrid(gridId, items){

  const grid = document.getElementById(gridId);
  if(!grid) return;

  if(!items || items.length === 0){
    grid.innerHTML = "<p>No media found</p>";
    return;
  }

  grid.innerHTML = items.map(item => `

    <div class="media-card">

      ${
        item.type?.toLowerCase() === "video"
        ? `<video src="${item.src}" class="media-thumb" muted loop></video>`
        : `<img src="${item.image || item.src}" class="media-thumb"/>`
      }

      <div class="media-info">

        <div class="media-title">${item.title || ""}</div>

        ${
          item.description
          ? `<div class="media-desc">${item.description}</div>`
          : ""
        }

        ${
          item.status
          ? `<div class="media-status ${item.status.toLowerCase()}">${item.status}</div>`
          : ""
        }

      </div>

    </div>

  `).join("");

}









function renderDashboardHeadStat(data){

  return `
  <div class="headstat headstat-dashboard card">

    <div class="headstat-left">
     <div class="headstat-greeting">
  ${t("welcomeBack")}
</div>

      <div class="headstat-name">
        ${memberData?.name || "Member"}
      </div>

      <div class="headstat-plan">
        ${memberData?.membership?.accessLevel || "Free"}
      </div>
    </div>

    <div class="profile-avatar img ">
      <img src="${memberData?.membership?.photo || 
      'https://static.wixstatic.com/media/6f9344_91829b44be534f95874840d8397f1136~mv2.png'}">
    </div>

  </div>
  `;

}



function renderProfileHeadStat(data){

  return `
 
 <div class="cards-container card headstat-card card-header">

   

    <div class="profile-meta">



    </div>
</div>

  </div>
  `;

}




function renderMinimalHeadStat(data){

const type = data.headStat?.contentType || "default";

const renderer = MiniLayouts[type];

const content = renderer
? renderer(data.headStat)
: "";

const decorations = renderHeadDecorations(
data.headStat?.decorations || []
);

return `
<div class="headstat cards-container card headstat-card card-header headstat-minimal">

${content}

${decorations}

</div>
`;

}


function renderHeadDecorations(decorations=[]){

if(!decorations.length) return "";

return decorations.map(d=>{

const pos = d.position || "right";

return `
<div class="decoration decoration-${pos} ${d.type || ""}">

<img src="${d.icon}" />

${d.count ? `<span class="decoration-count">${d.count}</span>` : ""}

${d.label ? `<span class="decoration-label">${d.label}</span>` : ""}

</div>
`;

}).join("");

}








function toggleSettings(){

settingsVisible = !settingsVisible;

renderSettingsPageDynamic(settingsPageData);

}


/* ================================
   FIELD CHANGE HANDLER
================================= */

function fieldChangeHandler(e, key){

  let val;

  if(e.target.type === "checkbox"){
    val = e.target.checked;
  }
  else{
    val = e.target.value;
  }

  memberData[key] = val;
 currentLanguage = memberData.language;
 console.log('onchange:',currentLanguage)
 
}



/* ================================
   FILE PREVIEW
================================= */

function previewFile(event, key){

  const file = event.target.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = (e)=>{

    memberData[key] = e.target.result;

    const preview = document.querySelector(`img.avatar-preview`);

    if(preview){
      preview.src = e.target.result;
    }

  };

  reader.readAsDataURL(file);

}


function saveSettingsDynamic(){

  try{
  
	currentLanguage = memberData.language;
    localStorage.setItem(
      "memberSettings",
      JSON.stringify(memberData,currentLanguage)
    );
    console.log('lang:',memberData,currentLanguage)
    
     // Send to Wix parent
  window.parent.postMessage({
    type:"UPDATE_MEMBER_SETTINGS",
    payload: memberData,currentLanguage
  },"*");

    showGlobalAlert("Settings saved!", "success");

  }catch(err){

    console.error(err);

    showGlobalAlert("Failed to save settings", "danger");

  }

  renderSettingsPageDynamic(settingsPageData);

}


