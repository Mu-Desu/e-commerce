// ? make the img in the cards shop now fade the blur when hovering anywhere inside the card
const divs = document.querySelectorAll(".card-shop-now");

divs.forEach((div) => {
  const image = div.querySelector(".product-img");
  const text = div.querySelector(".card-shop-now-content");

  text.addEventListener("mouseenter", () => {
    image.style.filter = "blur(0)";
  });

  text.addEventListener("mouseleave", () => {
    image.style.filter = "blur(4px)";
  });
});

// ? the animation stuff
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entery) => {
    if (entery.isIntersecting) {
      entery.target.classList.add("show");
    } else {
      entery.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// ? header text fade in
const fadeInText = document.getElementById("header-text");

function fadeIn() {
  fadeInText.style.opacity = "1";
}

window.addEventListener("DOMContentLoaded", fadeIn);

// ? cards shop now animation stuff

// Get all elements with the class "card-shop-now"
const cardElements = document.querySelectorAll(".card-shop-now");

// Loop through each element and apply different styles
cardElements.forEach((cardElement, index) => {
  if (index === 1) {
    // Styles for the second element
    cardElement.style.transitionDelay = "200ms";
  } else if (index === 2) {
    // Styles for the third element
    cardElement.style.transitionDelay = "400ms";
  }
});

// Get all elements with the class "quality-cards"
const qualityElements = document.querySelectorAll(".quality-cards");

// Loop through each element and apply different styles
qualityElements.forEach((qualityElement, index) => {
  if (index === 1) {
    // Styles for the second element
    qualityElement.style.transitionDelay = "200ms";
  } else if (index === 2) {
    // Styles for the third element
    qualityElement.style.transitionDelay = "400ms";
  } else if (index === 3) {
    // Styles for the third element
    qualityElement.style.transitionDelay = "600ms";
  }
});
