document.addEventListener('DOMContentLoaded', function() {
    const priceRange = document.getElementById('priceRange');
    const selectedRange = document.getElementById('selectedRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
  
    noUiSlider.create(priceRange, {
      start: [0, 1000], // Initial range values
      connect: true, // Connect the two handles with a colored bar
      range: {
        'min': 20,
        'max': 1000
      },
      margin: 100,
      step: 10
    });
  
    // Get the selected range values when the handles are moved
    priceRange.noUiSlider.on('update', function(values, handle) {
      let minPrice = parseInt(values[0]).toFixed(0);
      let maxPrice = parseInt(values[1]).toFixed(0);
      minPriceInput.value = minPrice;
      maxPriceInput.value = maxPrice;
      selectedRange.textContent = 'Price: $' + minPrice + ' - $' + maxPrice;
    });
  });