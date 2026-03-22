window.CreativiaPage = {

  pageData: null,

  onLoad(ctx){
    console.log("Tracking page loaded", ctx);

    this.bindEvents();
  },

  setPageData(data){
    this.pageData = data;
    console.log("Page data received:", data);
  },

  bindEvents(){

    const input = document.getElementById("tracking-input");
    const button = document.getElementById("track-btn");

    if(!input || !button) return;

    button.onclick = () => {

      const value = input.value.trim();

      if(!value){
        alert("Please enter a tracking ID");
        return;
      }

      this.trackPackage(value);
    };
  },

  trackPackage(id){

    const resultCard = document.getElementById("result-card");
    const resultText = document.getElementById("result-text");

    // Simulated tracking logic (replace with real API later)
    resultCard.style.display = "block";

    resultText.innerText = "Tracking ID: " + id + " is currently in transit 🚚";

    console.log("Tracking request:", id);
  },

  onDestroy(){
    console.log("Tracking page destroyed");

    // Cleanup if needed
    const btn = document.getElementById("track-btn");
    if(btn) btn.onclick = null;
  }

};
