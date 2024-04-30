let total = 0;

function calculateDiscountedPrice(originalPrice, discountPercentage) {
    if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
        return 'Invalid input';
    }

    let discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
}

function calculatePriceWithTax(price, taxPercentage) {
    if (price < 0 || taxPercentage < 0 || taxPercentage > 100) {
        return 'Invalid input';
    }

    let taxAmount = (price * taxPercentage) / 100;
    return price + taxAmount;
}

function calculateDiscount() {
    let originalPriceField = document.getElementById('originalPrice');
    let discountField = document.getElementById('discount');
    let taxField = document.getElementById('tax');
    let errorMessage = document.getElementById('errorMessage');

    // Clear the error message at the start of the function
    errorMessage.innerText = '';

    if (originalPriceField.value === '' || discountField.value === '' || taxField.value === '') {
        errorMessage.innerText = 'Error: All fields must be filled out.';
        return;
    }

    let originalPrice = parseFloat(originalPriceField.value);
    let discount = parseFloat(discountField.value);
    let tax = parseFloat(taxField.value);
    let discountedPrice = calculateDiscountedPrice(originalPrice, discount);
    let priceWithTax = calculatePriceWithTax(discountedPrice, tax);

    document.getElementById('result').innerText = `The discounted price is $${discountedPrice}. The price with tax is $${priceWithTax}.`;

    // Show the "Add" button after calculation
    document.getElementById('addButton').style.display = 'block';

    // Add the calculation to the receipt
    addToTotal();

    // Clear the input fields after calculation
    originalPriceField.value = '';
    discountField.value = '';
    taxField.value = '';
}

function toggleReceipt() {
    let receipt = document.getElementById('receipt');
    if (receipt.style.display === 'none') {
        receipt.style.display = 'block';
    } else {
        receipt.style.display = 'none';
    }
}

function addToTotal() {
    let originalPriceField = document.getElementById('originalPrice');
    let discountField = document.getElementById('discount');
    let taxField = document.getElementById('tax');

    let originalPrice = parseFloat(originalPriceField.value);
    let discount = parseFloat(discountField.value);
    let tax = parseFloat(taxField.value);
    let discountedPrice = calculateDiscountedPrice(originalPrice, discount);
    let priceWithTax = calculatePriceWithTax(discountedPrice, tax);
    total += priceWithTax;

    let existingReceiptContent = document.getElementById('receiptContent').innerText;

    // Append the new calculation to the existing receipt content
    let receiptContent = existingReceiptContent + `
    Original Price: $${originalPrice}\n
    Discount: ${discount}%\n
    Discounted Price: $${discountedPrice}\n
    Tax: ${tax}%\n
    Price with Tax: $${priceWithTax}\n
    Total: $${total}\n
    ------------------------------\n`;

    document.getElementById('receiptContent').innerText = receiptContent;
    document.getElementById('receipt').style.display = 'block';
}
