// ? head image blur on scroll

// window.addEventListener('scroll', function() {
//   // Get the scroll position
//   const scrollPosition = window.scrollY;

//   // Calculate the blur value based on the scroll position
//   const maxBlur = 10; // Maximum blur value
//   const blurValue = (scrollPosition / 500) * maxBlur; // Adjust 500 as desired for the scroll threshold

//   // Update the image's blur value
//   document.getElementById('scroll-image').style.filter = `blur(${blurValue}px)`;
// });

// ? changing the layout of index by adding classes to it

// ? make the sorting form submit a request when choosing a sort order

const form = document.getElementById("sortForm");
const select = form.querySelector("select");

// Get the selected value from local storage, if available
const storedValue = localStorage.getItem("orderBy");
if (storedValue) {
  select.value = storedValue;
}

select.addEventListener("change", () => {
  form.submit();
});

// todo //////////////////////////////////////
