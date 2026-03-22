/* =====================================================
   SECTION REGISTRY
===================================================== */

window.Creativia = window.Creativia || {};

Creativia.sections = {};

/* REGISTER SECTION */
Creativia.registerSection = function(name, fn){
  this.sections[name] = fn;
};

/* GET SECTION */
Creativia.getSection = function(name){
  return this.sections[name];
};


/* =====================================================
   DEFAULT SECTION TYPES
===================================================== */

/* 🔹 HERO SECTION */
Creativia.registerSection("hero", (section)=>{
  const hero = Creativia.getComponent("hero");
  return hero(section);
});


/* 🔹 CARDS SECTION */
Creativia.registerSection("cards", (section)=>{
  const grid = Creativia.getComponent("cardGrid");
  return grid(section);
});


/* 🔹 TRACKING SECTION */
Creativia.registerSection("tracking", (section)=>{

  const input = Creativia.getComponent("trackingInput");

  return `
    <section class="tracking-section">
      <h2>${section.title || "Track Shipment"}</h2>
      ${input()}
      <div id="trackingResult"></div>
    </section>
  `;
});
