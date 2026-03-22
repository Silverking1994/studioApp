/* =====================================================
   COMPONENT REGISTRY
===================================================== */

window.Creativia = window.Creativia || {};

/* ===============================
   SAFE GETTERS (CRITICAL)
=============================== */

Creativia.getComponent = function(name){
  return this.components?.[name] || null;
};

Creativia.getSection = function(name){
  return this.sections?.[name] || null;
};

Creativia.getModule = function(name){
  return this.modules?.[name] || null;
};


/* =====================================================
   DEFAULT COMPONENTS
===================================================== */

/* 🔹 HERO */
Creativia.registerComponent("hero", (data)=>{
  return `
    <section class="hero">
      <h1>${data.title || ""}</h1>
      <p>${data.subtitle || ""}</p>
    </section>
  `;
});


/* 🔹 CARD GRID */
Creativia.registerComponent("cardGrid", (data)=>{
  const items = data.items || [];

  return `
    <div class="card-grid" id="${data.id}">
      ${items.map(item=>`
        <div class="card">
          <h3>${item.title}</h3>
          <p>${item.description || ""}</p>
        </div>
      `).join("")}
    </div>
  `;
});


/* 🔹 TRACKING INPUT */
Creativia.registerComponent("trackingInput", ()=>{
  return `
    <div class="track-box">
      <input id="trackingInput" placeholder="Enter Tracking ID"/>
      <button id="trackBtn">Track</button>
    </div>
  `;
});
