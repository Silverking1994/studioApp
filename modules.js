window.Creativia = window.Creativia || {};
Creativia.modules = Creativia.modules || {};

/* REGISTER MODULE */
Creativia.registerModule = function(name, mod){
  this.modules[name] = mod;
};

/* ===============================
   TRACKING MODULE
=============================== */

Creativia.registerModule("tracking", {

  async track(trackingNumber){

    return new Promise(resolve => {

      setTimeout(()=>{

        if(trackingNumber === "123"){
          resolve({
            found: true,
            trackingNumber,
            status: "In Transit"
          });
        } else {
          resolve({ found:false });
        }

      }, 1000);

    });

  },

  init(pageData){

    const btn = document.getElementById("trackBtn");
    if(!btn) return;

    btn.onclick = async ()=>{

      const input = document.getElementById("trackingInput");
      const result = document.getElementById("trackingResult");

      const value = input.value.trim();
      if(!value) return;

      result.innerText = "Tracking...";

      const res = await this.track(value);

      if(res.found){
        result.innerHTML = `
          <p><b>ID:</b> ${res.trackingNumber}</p>
          <p><b>Status:</b> ${res.status}</p>
        `;
      } else {
        result.innerText = "Not found";
      }

    };

  }

});
