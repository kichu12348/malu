document.addEventListener("DOMContentLoaded", function () {
  createDustParticles();

  flickerTitle();

  const mainImage = document.getElementById("main-image");
  mainImage.addEventListener("click", function () {
    const quote = document.querySelector(".vintage-quote");
    quote.textContent = '"I\'m not dead yet! I feel happy!"';

    setTimeout(() => {
      quote.textContent =
        '"Legend says Malu is still checking her phone to this day..."';
    }, 3000);
  });
});

function createDustParticles() {
  const container = document.getElementById("dust-container");
  const numberOfParticles = 50;

  for (let i = 0; i < numberOfParticles; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.classList.add("dust-particle");

  const size = Math.random() * 3 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  const posX = Math.random() * window.innerWidth;
  const posY = Math.random() * window.innerHeight;
  particle.style.left = `${posX}px`;
  particle.style.top = `${posY}px`;

  particle.style.opacity = Math.random() * 0.6 + 0.2;

  container.appendChild(particle);

  animateParticle(particle);
}

function animateParticle(particle) {
  const startPosX = parseFloat(particle.style.left);
  const startPosY = parseFloat(particle.style.top);

  const duration = Math.random() * 20000 + 10000;
  const startTime = Date.now();

  const moveX = (Math.random() - 0.5) * 100;
  const moveY = (Math.random() - 0.5) * 100;

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;

    if (progress >= 1) {
      // Reset particle
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      animateParticle(particle);
      return;
    }

    // Calculate new position
    const newX = startPosX + moveX * progress;
    const newY = startPosY + moveY * progress;

    // Apply new position
    particle.style.left = `${newX}px`;
    particle.style.top = `${newY}px`;

    // Opacity variation
    const opacityFactor = Math.sin(progress * Math.PI);
    particle.style.opacity = opacityFactor * 0.6 + 0.2;

    requestAnimationFrame(update);
  }

  update();
}

// Flickering title effect
function flickerTitle() {
  const title = document.getElementById("flickering-title");

  setInterval(() => {
    if (Math.random() < 0.08) {
      // slightly reduced flickering
      title.style.opacity = Math.random() * 0.4 + 0.6;
    } else {
      title.style.opacity = 1;
    }
  }, 120);
}

// Add slight movement to image on mouse move
document.addEventListener("mousemove", function (e) {
  const image = document.querySelector(".image-container");
  const moveX = (e.clientX - window.innerWidth / 2) / 50;
  const moveY = (e.clientY - window.innerHeight / 2) / 50;

  image.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Preload and fade in main image
window.addEventListener("load", function () {
  const mainImage = document.getElementById("main-image");

  // Listen for the image to load
  mainImage.addEventListener("load", function () {
    setTimeout(() => {
      mainImage.style.opacity = 1;
    }, 300);
  });
});
