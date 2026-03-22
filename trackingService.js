/* =====================================================
   TRACKING SERVICE MODULE (CLEAN VERSION)
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
     UI HANDLER (EXTERNAL PAGE)
  =============================== */

  function initUI(){

    const input = document.getElementById("trackingId");
    const btn = document.querySelector("button");
    const result = document.getElementById("result");

    if(!input || !btn || !result) return;

    btn.onclick = async ()=>{

      const value = input.value.trim();

      if(!value){
        result.innerText = "Enter a tracking ID";
        return;
      }

      result.innerText = "Tracking...";

      const res = await trackPackage(value);

      if(res.found){
        result.innerText =
`Tracking #: ${res.trackingNumber}
Status: ${res.status}`;
      } else {
        result.innerText = "Shipment not found";
      }

    };

  }

  /* ===============================
     PLUGIN REGISTRATION (FIXED 🔥)
  =============================== */

  function registerPlugin(){

    if(!window.Creativia) return;

    Creativia.registerPlugin({

      name: "tracking",

      modules: {

        tracking: {
          track: trackPackage
        }

      }

    });

  }

  /* ===============================
     AUTO INIT
  =============================== */
/* =====================================================
   TRACKING SERVICE MODULE (CLEAN VERSION)
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
     UI HANDLER (EXTERNAL PAGE)
  =============================== */

  function initUI(){

    const input = document.getElementById("trackingId");
    const btn = document.querySelector("button");
    const result = document.getElementById("result");

    if(!input || !btn || !result) return;

    btn.onclick = async ()=>{

      const value = input.value.trim();

      if(!value){
        result.innerText = "Enter a tracking ID";
        return;
      }

      result.innerText = "Tracking...";

      const res = await trackPackage(value);

      if(res.found){
        result.innerText =
`Tracking #: ${res.trackingNumber}
Status: ${res.status}`;
      } else {
        result.innerText = "Shipment not found";
      }

    };

  }

  /* ===============================
     PLUGIN REGISTRATION (FIXED 🔥)
  =============================== */

  function registerPlugin(){

    if(!window.Creativia) return;

    Creativia.registerPlugin({

      name: "tracking",

      modules: {

        tracking: {
          track: trackPackage
        }

      }

    });

  }

  /* ===============================
     AUTO INIT
  =============================== */

  /* =====================================================
   TRACKING SERVICE MODULE (CLEAN VERSION)
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
     UI HANDLER (EXTERNAL PAGE)
  =============================== */

  function initUI(){

    const input = document.getElementById("trackingId");
    const btn = document.getElementById("trackBtn");
    const result = document.getElementById("result");

    if(!input || !btn || !result) return;

    btn.onclick = async ()=>{

      const value = input.value.trim();

      if(!value){
        result.innerText = "Enter a tracking ID";
        return;
      }

      result.innerText = "Tracking...";

      const res = await trackPackage(value);

      if(res.found){
        result.innerText =
`Tracking #: ${res.trackingNumber}
Status: ${res.status}`;
      } else {
        result.innerText = "Shipment not found";
      }

    };

  }

  /* ===============================
     PLUGIN REGISTRATION (FIXED 🔥)
  =============================== */

  function registerPlugin(){

    if(!window.Creativia) return;

    Creativia.registerPlugin({

      name: "tracking",

      modules: {

        tracking: {
          track: trackPackage
        }

      }

    });

  }

  /* ===============================
     AUTO INIT
  =============================== */

  function waitForDOMAndInit(){

  let tries = 0;

  const interval = setInterval(()=>{

    const input = document.getElementById("trackingId");
    const btn = document.getElementById("trackBtn");
    const result = document.getElementById("result");

    if(input && btn && result){

      clearInterval(interval);
      initUI(); // 🔥 run safely when DOM exists

    }

    // stop after ~5 seconds
    if(tries++ > 50){
      clearInterval(interval);
      console.warn("Tracking UI not found");
    }

  }, 100);

}

/* AUTO INIT */
waitForDOMAndInit();

  registerPlugin();

})();


