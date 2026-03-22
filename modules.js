/* =====================================================
   MODULE REGISTRY
===================================================== */

window.Creativia = window.Creativia || {};

Creativia.modules = {};

/* REGISTER MODULE */
Creativia.registerModule = function(name, fn){
  this.modules[name] = fn;
};

/* GET MODULE */
Creativia.getModule = function(name){
  return this.modules[name];
};


/* =====================================================
   TRACKING MODULE
===================================================== */

Creativia.registerModule("tracking", {

  track: async function(trackingNumber){

    // 🔥 Replace with real backend later
    const mockDB = {
      "ABC123": { status: "In Transit" },
      "XYZ789": { status: "Delivered" }
    };

    return new Promise(resolve=>{
      setTimeout(()=>{
        if(mockDB[trackingNumber]){
          resolve({
            found:true,
            trackingNumber,
            status: mockDB[trackingNumber].status
          });
        }else{
          resolve({ found:false });
        }
      },1000);
    });

  }

});
