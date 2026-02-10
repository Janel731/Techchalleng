const peluche = document.getElementById('peluche')

let isUserInteracting = false;


peluche.addEventListener('pointerdown',()=>{
  isUserInteracting = true;
})

peluche.addEventListener('pointerup',()=>{
  isUserInteracting = false;
})
// rotation suivant la souris
document.addEventListener('mousemove',(e)=>{
  if(!peluche || isUserInteracting) return;

  const x = (e.clientX / window.innerWidth - 0.5)*2;

  // applique la rotation horizontal
    peluche.cameraOrbit = `${x}rad auto auto`;
    peluche.jumpCameraToGoal;
})