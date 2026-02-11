gsap.registerPlugin(ScrollTrigger);


const para_h1 = document.querySelector('.para h1');
const para_p = document.querySelector('.para p');
const para_btn = document.querySelector('.para button');

let tl = gsap.timeline();
tl.from(para_h1, { opacity: 0, y: 20, duration: 0.6 })
    .from(para_p, { opacity: 0, y: 20, duration: 0.6 })
    .fromTo(para_btn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });

// on s'sassure que la section  est bien visible
gsap.set(".section1", {
    zIndex: 10, position: "relative"
})

const mainTransition = gsap.timeline({
    scrollTrigger: {
        trigger: ".header",
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1
    }
})

mainTransition.from(".section1", {
    yPercent: 100,
    ease: "none"
})






mainTransition.to('#hero-content', {
    opacity: 0,
    y: -100,
    ease: "none"
}, 0)


// Sélection des éléments
const points = gsap.utils.toArray(".emotion-point");
const orbit = document.querySelector(".orbit-container");

// Rayon du cercle pour Desktop
const radius = window.innerHeight * 0.42;

// --- GESTION RESPONSIVE AVANCÉE ---
ScrollTrigger.matchMedia({

    // ------------------------------------------------
    // 1. CONFIGURATION DESKTOP (Écrans larges)
    // ------------------------------------------------
    "(min-width: 769px)": function () {

        // A. Placement Initial Trigonométrique
        points.forEach((point, i) => {
            const angleDeg = (360 / points.length) * i;
            const angleRad = (angleDeg * Math.PI) / 180;

            // Calcul position X/Y
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            // Application immédiate
            gsap.set(point, {
                x: x,
                y: y,
                opacity: 0,
                scale: 0.5,
                xPercent: -15, // Ajustement pour que le point soit proche du cercle
                yPercent: -50,
                
            });
        });

        // B. Création de la Timeline Desktop
        const tml = gsap.timeline({
            scrollTrigger: {
                trigger: "#story-wrapper",
                start: "top top",
                end: "+=3500", // Scroll long pour une rotation lente
                scrub: 1,      // Douceur du mouvement
                pin: true,     // Bloque l'écran
                anticipatePin: 1
            }
        });

        // Étape 1 : Apparition des points (Fade in + Scale)
        tml.to(points, {
            opacity: 1,
            scale: 1,
            duration: 2,
            stagger: 0.3,
            ease: "back.out(1.7)"
        });

        // Étape 2 : Rotation Orbitale
        // On tourne le conteneur dans un sens...
        tml.to(orbit, {
            rotation: 180,
            duration: 10,
            ease: "none"
        }, ">-1"); // Démarre légèrement avant la fin de l'apparition

        // ... ET on tourne les points dans l'autre sens pour garder le texte droit
        tml.to(points, {
            rotation: -180,
            duration: 10,
            ease: "none"
        }, "<"); // Synchronisation parfaite ("<")
    },

    // ------------------------------------------------
    // 2. CONFIGURATION MOBILE (Tablettes & Téléphones)
    // ------------------------------------------------
    "(max-width: 768px)": function () {

        // Reset complet des positions pour le mobile
        gsap.set(points, {
            clearProps: "all" // Nettoie les styles inline mis par Desktop
        });
        gsap.set(points, {
            opacity: 0,
            y: 20,
            position: "absolute" // Superposés au même endroit
        });

        // Timeline Mobile "Slideshow"
        const tlm2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#story-wrapper",
                start: "top top",
                end: "+=4000", // Plus long pour laisser le temps de lire
                scrub: true,
                pin: true
            }
        });

        // Boucle pour créer la séquence : Apparition -> Pause -> Disparition
        points.forEach((point, i) => {
            // Apparition
            tlm2.to(point, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });

            // Pause de lecture (espace vide dans la timeline)
            tlm2.to({ opacity: 0 }, { duration: 0.6 });

            // Disparition (sauf pour le dernier point qui reste un peu)
            if (i < points.length - 1) {
                tlm2.to(point, {
                    opacity: 0,
                    y: -20,
                    scale: 0.9,
                    duration: 0.5
                });
            }
        });
    }
});

const sectTm = gsap.timeline();

sectTm.from(".emot", {opacity: 0, y: 50, duration: 0.8, ease: "power1.out",scrollTrigger: {trigger: ".emot", start: "top 85%", stagger: 0.3, toggleActions: "play none none reverse", markers: false}})

     .from("#immersive-section-h3", {
    opacity: 0,
    y: -150,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".section1",
        start: "bottom bottom",
        stagger: 1.3,
        toggleActions: "play none none reverse",
        markers:false
    }

})

    .from(".emot-btn", {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".emot-btn",
        start: "bottom 85%",
        stagger: 1.3,
        toggleActions: "play none none reverse",
        markers: false
    }

})

   .from("#section-offer h3", {
    opacity: 0,
    y: 150,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#section-offer",
        start: "top 75%",
        stagger: 1.3,
        toggleActions: "play none none reverse",
        markers:false
    }

})

    .from("#section-offer h5", {
    opacity: 0,
    y: 90,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#section-offer h3",
        start: "top 95%",
        stagger: 1.3,
        toggleActions: "play none none reverse",
        markers:false
    }

})

    .from(".offer", {
    opacity: 0,
    x: 300,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".offer",
        start: "top 95%",
        stagger: 1.3,
        toggleActions: "play none none reverse",
        markers:false
    }

})

    .from("#assurance h3", {
    opacity: 0,
    x: -150,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#assurance h3",
        start: "top 95%",
        stagger: 1.3,
        toggleActions: "play none none reverse",
        markers:false
    }

})

    .from(".reassurance-subtitle", {
    opacity: 0,
    x: -150,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".reassurance-subtitle",
        start: "top 95%",
        stagger: 1.3,
        toggleActions: "play none none reverse",
        markers:false
    }

})

 gsap.from(".reassurance", {
    scrollTrigger: {
        trigger: ".reassurance",
        start: "top 85%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50
});





const buttons = document.querySelectorAll("button");
buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        Swal.fire({
  title: "Votre requête a été prise en compte !",
  icon: "success",
  draggable: true
});
    })
})









