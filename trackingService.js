/* =====================================================
   TRACKING SERVICE MODULE
   (Standalone + Plugin Compatible)
===================================================== */

(function(){

  /* ===============================
     MOCK TRACKING DATABASE
  =============================== */

  const mockDatabase = {
    "ABC123": { status: "In Transit", found: true },
    "XYZ789": { status: "Delivered", found: true },
    "TEST001": { status: "Processing", found: true }
  };

  /* ===============================
     CORE TRACK FUNCTION
  =============================== */

  function trackPackage(trackingNumber){

    return new Promise((resolve)=>{

      setTimeout(()=>{

        const data = mockDatabase[trackingNumber];

        if(data){
          resolve({
            trackingNumber,
            status: data.status,
            found: true
          });
        } else {
          resolve({
            trackingNumber,
            found: false
          });
        }

      }, 1000);

    });

  }

  /* ===============================
     STANDALONE HTML MODE
  =============================== */

  function initStandalone(){

    const input = document.getElementById("trackingId");
    const btn = document.getElementById("trackBtn");
    const result = document.getElementById("result");

    if(!input || !btn || !result) return;

    btn.addEventListener("click", async ()=>{

      const id = input.value.trim();
      if(!id) return;

      result.innerText = "Tracking...";

      const response = await trackPackage(id);

      if(response.found){
        result.innerText = `
Tracking #: ${response.trackingNumber}
Status: ${response.status}
        `;
      } else {
        result.innerText = "Shipment not found";
      }

    });

  }

  /* ===============================
     CREATIVE PLUGIN MODE
  =============================== */

  function initPluginMode(){

    if(!window.Creativia) return;

    window.Creativia.registerPlugin({

      name: "trackingService",

      init(){
        console.log("Tracking Service Plugin Loaded");
      },

      modules: {

        trackPackage

      }

    });

  }

  /* ===============================
     AUTO DETECT MODE
  =============================== */

  if(document.getElementById("trackingId")){
    initStandalone();
  }

  initPluginMode();

})();
