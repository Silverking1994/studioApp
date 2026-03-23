
const card = document.getElementById("card");
const scene = document.querySelector(".scene");

/* 3D Hover Tilt */
scene.addEventListener("mousemove", e=>{
  const rect = scene.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width/2;
  const centerY = rect.height/2;

  const rotateX = -(y-centerY)/20;
  const rotateY = (x-centerX)/20;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

scene.addEventListener("mouseleave", ()=>{
  card.style.transform = "rotateX(0) rotateY(0)";
});

/* Biometric Unlock */
const finger = document.getElementById("finger");
finger.addEventListener("click",()=>{
  finger.classList.add("unlocked");
  alert("Biometric Identity Verified.\nWelcome to the Creativia Temple.");
});

