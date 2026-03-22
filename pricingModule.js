(function(){

  // Ensure global registry exists
  window.Creativia = window.Creativia || {};
  window.Creativia.components = window.Creativia.components || {};

  // Register pricing component
  window.Creativia.components["pricing"] = function(props){

    const div = document.createElement("div");

    div.innerHTML = `
      <div style="
        padding:20px;
        background:#ffffff;
        border-radius:12px;
        margin-bottom:20px;
        box-shadow:0 2px 10px rgba(0,0,0,0.08);
      ">
        <h2 style="margin-bottom:10px;">
          ${props.title || "Pricing Plan"}
        </h2>

        <p style="font-size:22px;font-weight:bold;margin-bottom:15px;">
          ${props.price || ""}
        </p>

        <button style="
          padding:10px 16px;
          border:none;
          background:#000;
          color:#fff;
          border-radius:6px;
          cursor:pointer;
        ">
          Choose Plan
        </button>
      </div>
    `;

    return div;
  };

})();
