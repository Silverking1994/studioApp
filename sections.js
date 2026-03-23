
window.Creativia = window.Creativia || {};
Creativia.sections = Creativia.sections || {};

/* ===============================
   REGISTER SECTION
=============================== */
Creativia.registerSection = function(name, fn){
  this.sections[name] = fn;
};

/* ===============================
   HELPERS (IMPORTANT)
=============================== */
const getMember = () => window.memberData || {};
const safe = (v, fallback="") => v ?? fallback;

/* ===============================
   HEAD STAT
=============================== */
Creativia.registerSection("headStat", (section)=>{

  const type = section.contentType || "dashboard";
  const renderer = window.HeadStatRegistry?.[type];

  return `
    <div class="page-head-wrap">
      <div class="cards-container card headstat-card card-header">
        ${renderer ? renderer(section.headStat || {}) : ""}
      </div>
    </div>
  `;
});


/* ===============================
   PROFILE INFO
=============================== */
Creativia.registerSection("profileInfo", ()=>{

  const member = getMember();

  return `
  <div class="profile-info card">

    <div class="profile-bio">
      ${safe(member.bio, "Creative thinker building the future.")}
    </div>

    <div class="profile-stats">

      <div class="profile-stat">
        <strong>${safe(member.followers, 0)}</strong>
        <span>Followers</span>
      </div>

      <div class="profile-stat">
        <strong>${safe(member.following, 0)}</strong>
        <span>Following</span>
      </div>

      <div class="profile-stat">
        <strong>${safe(member.posts, 0)}</strong>
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
});


/* ===============================
   PROFILE PHOTO
=============================== */
Creativia.registerSection("profilePhoto", ()=>{

  const member = getMember();

  return `
    <div class="profile-photo">
      <img src="${
        member.photo ||
        member.profilePhoto ||
        "https://i.pravatar.cc/300"
      }">

      <div class="online-dot"></div>
    </div>
  `;
});


/* ===============================
   HERO (ADVANCED)
=============================== */
Creativia.registerSection("hero", (section)=>{

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
});


/* ===============================
   CAROUSEL
=============================== */
Creativia.registerSection("carousel", (section)=>{

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
});


/* ===============================
   DISCOVER
=============================== */
Creativia.registerSection("discover", (section)=>{

  return `
    <div class="discover-grid">
      ${(section.items || []).map(item => `
        <div class="discover-card">
          <img src="${item.image}">
          <span>${item.title}</span>
        </div>
      `).join("")}
    </div>
  `;
});


/* ===============================
   POSTS
=============================== */
Creativia.registerSection("posts", (section)=>{

  return `
    <div class="post-list">
      ${(section.items || []).map(item => `
        <div class="post-card">
          <img src="${item.image}">
          <div class="post-content">
            <h3>${item.title}</h3>
            <p>${item.desc || ""}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
});


/* ===============================
   STATS (WITH COUNTER)
=============================== */
Creativia.registerSection("stats", (section)=>{

  if(!section.stats?.length) return "";

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
});


/* ===============================
   DETAILS (EDITABLE)
=============================== */
Creativia.registerSection("details", (section)=>{

  if(!section.details) return "";

  const member = getMember();

  return `
    <div class="card details-section">

      <div class="title">${t("accountDetails")}</div>

      ${section.details.map(d => {

        const value = d.value ?? member?.[d.field] ?? "-";

        return `
          <div class="detail-item">
            <span>${t(d.label)}</span>

            ${
              section.editable
              ? `<input type="text"
                        data-field="${d.field}"
                        value="${value}"
                        onchange="updateMemberDetail(this)">`
              : `<span>${value}</span>`
            }

          </div>
        `;

      }).join("")}

    </div>
  `;
});


/* ===============================
   ACTIONS
=============================== */
Creativia.registerSection("actions", (section)=>{

  if(!section.actions) return "";

  return `
    <div class="card">

      <div class="title">Actions</div>

      <div class="action-grid">

        ${section.actions.map(a => `
          <button
            class="action-btn ${a.type || ""}"
            onclick='handleAction("${a.action}", ${JSON.stringify(a)})'>

            ${a.icon ? `<span class="icon">${a.icon}</span>` : ""}
            <span>${t(a.label)}</span>

          </button>
        `).join("")}

      </div>

    </div>
  `;
});


/* ===============================
   CHART
=============================== */
Creativia.registerSection("chart", (section)=>{

  const id = section.id || "pageChart";

  return `
    <div class="card chart-section">
      <canvas id="${id}" height="120"></canvas>
    </div>
  `;
});


/* ===============================
   CONTROLS
=============================== */
Creativia.registerSection("controls", (section)=>{

  return `
    <div class="controls grid">

      <div class="search-box">
        <input type="text" placeholder="${section.placeholder || "Search..."}">
      </div>

      <div class="filters"></div>

    </div>
  `;
});


/* ===============================
   CARDS GRID
=============================== */
Creativia.registerSection("cards", (section)=>{

  const id = section.id || `grid-${Math.random().toString(36).slice(2,6)}`;

  return `
    <div class="cards-container">
      <div class="grid" id="${id}"></div>
    </div>
  `;
});


/* ===============================
   MEDIA
=============================== */

Creativia.registerSection("media", (section)=>{

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

  return {
    html: `
      <div class="media-section" id="${sectionId}">

        ${controlsEnabled ? `
        <div class="media-controls grid">

          ${showSearch ? `
          <div class="search-box">
            <input 
              type="text" 
              id="mediaSearch-${sectionId}" 
              placeholder="Search media...">
          </div>
          ` : ""}

          ${showFilters ? `
          <div class="media-filters-wrapper horizontal-scroller">
            <div class="filter-buttons" id="mediaFilters-${sectionId}">
              ${(section.filters || []).map(f => `
                <button class="filter-btn ${f === "All" ? "active" : ""}">
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
    `,

    init: ()=>{

      const grid = document.getElementById(`mediaGrid-${sectionId}`);
      const searchInput = document.getElementById(`mediaSearch-${sectionId}`);
      const filtersWrap = document.getElementById(`mediaFilters-${sectionId}`);

      let activeFilter = "All";
      let query = "";

      const items = section.items || [];

      function renderGrid(){

        if(!grid) return;

        const filtered = items.filter(item => {

          const matchFilter =
            activeFilter === "All" || item.type === activeFilter;

          const matchSearch =
            !query || item.title?.toLowerCase().includes(query);

          return matchFilter && matchSearch;
        });

        grid.innerHTML = filtered.map(item => `
          <div class="media-card">
            <img src="${item.image}">
            <div class="media-title">${item.title || ""}</div>
          </div>
        `).join("");
      }

      /* 🔍 SEARCH */
      searchInput?.addEventListener("input", (e)=>{
        query = e.target.value.toLowerCase();
        renderGrid();
      });

      /* 🎛 FILTERS */
      filtersWrap?.addEventListener("click", (e)=>{

        const btn = e.target.closest(".filter-btn");
        if(!btn) return;

        activeFilter = btn.textContent.trim();

        // update UI
        filtersWrap.querySelectorAll(".filter-btn")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        renderGrid();
      });

      // initial render
      renderGrid();
    }
  };

});
