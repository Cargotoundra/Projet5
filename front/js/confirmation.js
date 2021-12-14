
function confirmation(){
    const idConf = document.getElementById("orderId");
    idConf.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
}

confirmation();