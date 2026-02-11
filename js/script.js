gsap.registerPlugin(ScrollTrigger);

// ==================== HERO ANIMATION ====================
document.addEventListener("DOMContentLoaded", () => {
  const para_h1 = document.querySelector('.para h1');
  const para_p = document.querySelector('.para p');
  const para_btn = document.querySelector('.para button');

  // Timeline simple et légère pour le hero
  gsap.timeline()
    .from(para_h1, { opacity: 0, y: 20, duration: 0.6 })
    .from(para_p, { opacity: 0, y: 20, duration: 0.6 })
    .from(para_btn, { opacity: 0, y: 20, duration: 0.5 });
});

// ==================== SECTION 1 ANIMATION ====================
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    const points = gsap.utils.toArray(".emotion-point");
    const orbit = document.querySelector(".orbit-container");
    const radius = window.innerHeight * 0.42;

    // Placement initial des points
    points.forEach((point, i) => {
      const angle = (360 / points.length) * i;
      const rad = angle * (Math.PI / 180);
      gsap.set(point, {
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
        opacity: 0,
        scale: 0.5,
        xPercent: -15,
        yPercent: -50,
      });
    });

    // Timeline globale section
    gsap.timeline({
      scrollTrigger: {
        trigger: "#story-wrapper",
        start: "top top",
        end: "+=3500",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    })
    .to(points, { opacity: 1, scale: 1, duration: 2, stagger: 0.3, ease: "back.out(1.7)" })
    .to(orbit, { rotation: 360, duration: 10, ease: "none" }, ">-1")
    .to(points, { rotation: -360, duration: 10, ease: "none" }, "<");
  },

  "(max-width: 768px)": function () {
    const points = gsap.utils.toArray(".emotion-point");
    gsap.set(points, { clearProps: "all", opacity: 0, y: 20, position: "absolute" });

    const tlm2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#story-wrapper",
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true
      }
    });

    points.forEach((point, i) => {
      tlm2.to(point, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
      if (i < points.length - 1) {
        tlm2.to(point, { opacity: 0, y: -20, scale: 0.9, duration: 0.5 });
      }
    });
  }
});

// ==================== REASSURANCE ANIMATION ====================
const cmT = gsap.timeline({
  scrollTrigger: {
    trigger: ".reassurance",
    start: "top 85%",
    toggleActions: "play none none none",
    once: true
  }
});

cmT.from(".reassurance1", { opacity: 0, scale: 0.9, duration: 0.6 })
   .from(".reassurance2", { opacity: 0, scale: 0.9, duration: 0.6 })
   .from(".reassurance3", { opacity: 0, scale: 0.9, duration: 0.5 });

// ==================== OTHER ELEMENTS (emot, offer, final CTA) ====================
const sectTm = gsap.timeline({ defaults: { ease: "power2.out" } });

// Animation en une seule timeline ScrollTrigger pour réduire TBT
sectTm.from(".emot", { opacity: 0, y: 50, duration: 0.8, stagger: 0.3, scrollTrigger: {
  trigger: ".emot", start: "top 85%", toggleActions: "play none none none"
}})
.from("#immersive-section-h3", { opacity: 0, y: -150, duration: 1, scrollTrigger: {
  trigger: ".section1", start: "bottom bottom", toggleActions: "play none none none"
}})
.from(".emot-btn", { opacity: 0, duration: 1, stagger: 0.3, scrollTrigger: {
  trigger: ".emot-btn", start: "bottom 85%", toggleActions: "play none none none"
}})
.from("#section-offer h3", { opacity: 0, y: 150, duration: 1, scrollTrigger: {
  trigger: "#section-offer", start: "top 75%", toggleActions: "play none none none"
}})
.from("#section-offer h5", { opacity: 0, y: 90, duration: 1, scrollTrigger: {
  trigger: "#section-offer h3", start: "top 95%", toggleActions: "play none none none"
}})
.from(".offer", { opacity: 0, x: 300, duration: 1, stagger: 0.2, scrollTrigger: {
  trigger: ".offer", start: "top 95%", scrub: 1
}})
.from("#assurance h3", { opacity: 0, x: -150, duration: 1, scrollTrigger: {
  trigger: "#assurance h3", start: "top 95%", scrub: 1
}})
.from(".reassurance-subtitle", { opacity: 0, x: -150, duration: 1, scrollTrigger: {
  trigger: ".reassurance-subtitle", start: "top 95%", scrub: 1
}})
.from(".reassurance", { opacity: 0, duration: 1, scrollTrigger: {
  trigger: ".reassurance", start: "top 95%", scrub: 1
}});

// ==================== BUTTONS ALERT ====================
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    Swal.fire({
      title: "Votre requête a été prise en compte !",
      icon: "success",
      draggable: true
    });
  });
});
