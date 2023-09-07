// Check if the document is fully loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Initialize when the document is ready
function ready() {
    var removeCartButtons = document.getElementsByClassName('product-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('product-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-to-cart'); // Change this to match your HTML class
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addtocartonclick);
    }
}

// Cart item remove
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updatetotal();
}

// Quantity change
function quantityChanged(event) {
    var input = event.target;
    var quantity = parseInt(input.value);

    if (isNaN(quantity) || quantity <= 0) {
        input.value = 1;
        quantity = 1;
    }

    updatetotal();
}

// Add to cart
function addtocartonclick(event) {
    var button = event.target;
    var products = button.parentElement.parentElement; // Adjust this to match your HTML structure
    var title = products.querySelector('.product-name').innerText;
    var price = products.querySelector('.product-price').innerText;
    var productImage = products.querySelector('.product-image img').src;
    var product_id = products.getAttribute('data-product-id'); // Add a data-product-id attribute to your product element

    updatetotal();
    addProductToCart(title, price, productImage, product_id);
}

function addProductToCart(title, price, productImage, product_id) {
    // Send an AJAX request to update the cart on the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "{{ path('add_to_cart') }}", true); // Change this to your server endpoint URL
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response if needed
            console.log('Product added to cart successfully.');
        }
    };
    xhr.send("product_id=" + product_id + "&quantity=1");

    // Create and append the cart item to the table
    var cartTableBody = document.querySelector('.cart-table tbody'); // Adjust this to match your HTML structure

    var cartTableRow = document.createElement('tr');
    cartTableRow.classList.add('table-body-row');

    cartTableRow.innerHTML = `
        <td class="product-remove"><i class="far fa-window-close"></i></td>
        <td class="product-image"><img src="${productImage}" alt=""></td>
        <td class="product-name">${title}</td>
        <td class="product-price">${price}</td>
        <td class="product-quantity"><input type="number" value="1" min="1" class="cart-quantity-input"></td>
        <td class="product-total">${price}</td>
    `;

    cartTableBody.appendChild(cartTableRow);

    // Attach event listeners for the remove button and quantity input here
    var removeButton = cartTableRow.querySelector('.product-remove');
    removeButton.addEventListener('click', removeCartItem);

    var quantityInput = cartTableRow.querySelector('.cart-quantity-input');
    quantityInput.addEventListener('change', quantityChanged);

    updatetotal();
}

// Update total
function updatetotal() {
    var cartBoxes = document.querySelectorAll('.table-body-row');
    var subtotal = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.product-price');
        var quantityInput = cartBox.querySelector('.cart-quantity-input');
        var totalElement = cartBox.querySelector('.product-total');
        var priceText = priceElement.innerText.replace('$', '');
        var price = parseFloat(priceText);
        var quantity = parseInt(quantityInput.value);

        if (!isNaN(price) && !isNaN(quantity)) {
            var itemTotal = price * quantity;
            totalElement.innerText = '$' + itemTotal.toFixed(2);
            subtotal += itemTotal;
        }
    }

    // Calculate shipping cost and total based on your logic
    var shippingCost = 15; 
    var total = subtotal + shippingCost;

    // Update the cart total in your HTML
    var cartTotalElement = document.querySelector('.cart-total p');
    cartTotalElement.innerText = 'Total: $' + total.toFixed(2);
}

// Initial cart total calculation
updatetotal();