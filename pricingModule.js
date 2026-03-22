(function(){

  window.Creativia = window.Creativia || {
    components: {},
    registerComponent(name, fn){
      this.components[name] = fn;
    }
  };

  window.Creativia.registerComponent("pricing", function(props){

    const div = document.createElement("div");

    div.innerHTML = `
      <div style="padding:20px;background:#fff;border-radius:12px;margin-bottom:20px;">
        <h2>${props.title}</h2>
        <p>${props.price}</p>
      </div>
    `;

    return div;
  });

})();
