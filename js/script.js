// ==========================
// 1. INIT GSAP & PLUGINS
// ==========================
gsap.registerPlugin(ScrollTrigger);

// ==========================
// 2. HERO TEXT ANIMATION
// ==========================
const tlHero = gsap.timeline();
tlHero.from(".para h1", { opacity: 0, y: 20, duration: 0.6 })
      .from(".para p", { opacity: 0, y: 20, duration: 0.6 })
      .from(".para button", { opacity: 0, y: 20, duration: 0.5 });

// ==========================
// 3. MAIN TRANSITION SCROLL
// ==========================
const mainTransition = gsap.timeline({
  scrollTrigger: {
    trigger: ".header",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    pin: true,
    pinSpacing: false
  }
});

mainTransition.from(".section1", { yPercent: 100, ease: "none" })
              .to("#hero-content", { opacity: 0, y: -100, ease: "none" }, 0);

// ==========================
// 4. EMOTION ORBITAL POINTS
// ==========================
const points = gsap.utils.toArray(".emotion-point");
const orbit = document.querySelector(".orbit-container");
const radius = window.innerHeight * 0.42;

ScrollTrigger.matchMedia({

  // --- DESKTOP ---
  "(min-width: 769px)": function () {

    // Placement initial avec CSS transform
    points.forEach((point, i) => {
      const angle = (360 / points.length) * i * (Math.PI / 180);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      gsap.set(point, { x, y, opacity: 0, scale: 0.5 });
    });

    const orbitTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#story-wrapper",
        start: "top top",
        end: "+=3500",
        scrub: 1,
        pin: true
      }
    });

    // Fade + scale des points
    orbitTl.to(points, {
      opacity: 1,
      scale: 1,
      duration: 2,
      stagger: 0.3,
      ease: "back.out(1.7)"
    });

    // Rotation du conteneur ORBIT, points gardent texte droit
    orbitTl.to(orbit, { rotation: 360, duration: 10, ease: "none" });

  },

  // --- MOBILE ---
  "(max-width: 768px)": function () {
    // Reset
    gsap.set(points, { clearProps: "all", opacity: 0, y: 20, position: "absolute" });

    const mobileTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#story-wrapper",
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true
      }
    });

    points.forEach((point, i) => {
      mobileTl.to(point, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
              .to(point, { opacity: 0, y: -20, duration: 0.5 }, "+=0.6");
    });
  }

});

// ==========================
// 5. PELUCHE FADE-IN
// ==========================
gsap.from("#peluche", { opacity: 0, duration: 0.8, ease: "power3.out" });

// ==========================
// 6. SECTIONS APPEAR ON SCROLL
// ==========================
function animateSection(selector, yOffset=50) {
  gsap.from(selector, {
    opacity: 0,
    y: yOffset,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
}

// Emo & CTA
animateSection(".emot", 50);
animateSection("#immersive-section-h3", -150);
animateSection(".emot-btn", 30);
animateSection("#section-offer h3", 150);
animateSection("#section-offer h5", 90);
animateSection(".offer", 300);
animateSection("#assurance h3", -150);
animateSection(".reassurance-subtitle", -150);
animateSection(".reassurance", 50);

// ==========================
// 7. REASSURANCE TIMELINE
// ==========================
const cmT = gsap.timeline({
  scrollTrigger: {
    trigger: ".reassurance",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

cmT.from(".reassurance1", { opacity: 0, scale:0.9, duration: 0.6 })
   .from(".reassurance2", { opacity: 0, scale:0.9, duration: 0.6 },"-=0.3")
   .from(".reassurance3", { opacity: 0, scale:0.9, duration: 0.5 },"-=0.2");

// ==========================
// 8. BUTTON ALERTS
// ==========================
document.querySelectorAll("button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    Swal.fire({
      title: "Votre requête a été prise en compte !",
      icon: "success",
      draggable: true
    });
  });
});

