let idUrl = (new URL(document.location)).searchParams;
let idConfirmation = idUrl.get('orderId');
console.log(idConfirmation);

(document.getElementById('orderId')).innerText = idConfirmation;