window.Creativia = window.Creativia || {};
Creativia.sections = Creativia.sections || {};

/* REGISTER SECTION */
Creativia.registerSection = function(name, fn){
  this.sections[name] = fn;
};

/* ===============================
   DEFAULT SECTIONS
=============================== */

/* 🔹 HERO SECTION */
Creativia.registerSection("hero", (data)=>{
  return `
    <section class="hero">
      <h1>${data.title || ""}</h1>
      <p>${data.subtitle || ""}</p>
    </section>
  `;
});

/* 🔹 CARDS SECTION */
Creativia.registerSection("cards", (data)=>{

  const items = data.items || [];

  return `
    <section class="cards">
      <div class="card-grid" id="${data.id}">
        ${items.map(item=>`
          <div class="card">
            <h3>${item.title}</h3>
            <p>${item.description || ""}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
});

/* 🔹 TRACKING SECTION (INTERNAL PAGE VERSION) */
Creativia.registerSection("tracking", ()=>{

  return `
    <section class="tracking-section">
      <input id="trackingInput" placeholder="Enter Tracking ID"/>
      <button id="trackBtn">Track</button>

      <div id="trackingResult"></div>
    </section>
  `;
});
