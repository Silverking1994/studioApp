/* =====================================================
   TRACKING SERVICE MODULE (FINAL CLEAN VERSION)
===================================================== */

(function(){

  /* ===============================
     MOCK DATABASE
  =============================== */

  const mockDatabase = {
    "ABC123": { status: "In Transit" },
    "XYZ789": { status: "Delivered" },
    "TEST001": { status: "Processing" }
  };

  /* ===============================
     CORE LOGIC (SINGLE SOURCE 🔥)
  =============================== */

  async function trackPackage(trackingNumber){

    await new Promise(r => setTimeout(r, 1000));

    const data = mockDatabase[trackingNumber];

    if(data){
      return {
        trackingNumber,
        status: data.status,
        found: true
      };
    }

    return {
      trackingNumber,
      found: false
    };
  }

  /* ===============================
     UI HANDLER
  =============================== */

  function initUI(){

    const input  = document.getElementById("trackingId");
    const btn    = document.getElementById("trackBtn");
    const result = document.getElementById("result");

    // ❌ Stop if elements not present
    if(!input || !btn || !result) return;

    // 🔥 Prevent duplicate binding
    if(btn.dataset.bound === "true") return;
    btn.dataset.bound = "true";

    btn.addEventListener("click", async ()=>{

      const value = input.value.trim();

      if(!value){
        result.innerText = "Enter a tracking ID";
        return;
      }

      result.innerText = "Tracking...";

      try{

        const res = await trackPackage(value);

        if(res.found){
          result.innerText =
`Tracking #: ${res.trackingNumber}
Status: ${res.status}`;
        } else {
          result.innerText = "Shipment not found";
        }

      }catch(err){
        console.error("Tracking error:", err);
        result.innerText = "Error tracking package";
      }

    });

  }

  /* ===============================
     SAFE AUTO INIT (FOR DYNAMIC LOAD)
  =============================== */

  function waitForElementsAndInit(){

    let attempts = 0;

    const interval = setInterval(()=>{

      const input  = document.getElementById("trackingId");
      const btn    = document.getElementById("trackBtn");
      const result = document.getElementById("result");

      if(input && btn && result){
        clearInterval(interval);
        initUI();
      }

      // stop trying after ~5 seconds
      if(attempts++ > 50){
        clearInterval(interval);
        console.warn("Tracking UI not found in DOM");
      }

    }, 100);

  }

  /* ===============================
     EVENT-BASED INIT (BEST PRACTICE)
  =============================== */

  window.addEventListener("external:pageReady", (e)=>{

    if(e.detail?.page === "trackingService"){
      initUI();
    }

  });

  /* ===============================
     PLUGIN REGISTRATION (CREATIVIA)
  =============================== */

  function registerPlugin(){

    if(!window.Creativia) return;

    Creativia.registerPlugin({

      name: "trackingService",

      modules: {
        tracking: {
          track: trackPackage
        }
      }

    });

  }

  /* ===============================
     INIT SEQUENCE
  =============================== */

  registerPlugin();
  waitForElementsAndInit(); // fallback if event missed

})();
