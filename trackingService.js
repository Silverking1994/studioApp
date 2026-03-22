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
     TRACK FUNCTION
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
     INIT UI (MAIN FIX 🔥)
  =============================== */
  function initUI(){

    const input  = document.getElementById("trackingId");
    const btn    = document.getElementById("trackBtn");
    const result = document.getElementById("result");

    if(!input || !btn || !result) return;

    btn.onclick = async () => {

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
     🔥 RUN WHEN PAGE LOADS (FIX)
  =============================== */

  // THIS replaces DOMContentLoaded
  setTimeout(initUI, 100);

})();
