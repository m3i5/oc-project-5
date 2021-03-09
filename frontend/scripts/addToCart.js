
function addToCart() {

    let url = document.URL;
    let url_array = url.split('/')
    let id = url_array[url_array.length-1];

    let quantity = 1;

    camera = {
        "id": id,
        "name": document.getElementById('productName').innerText,
        "price": document.getElementById('productPrice').innerText,
        "img": document.getElementById('productImage').src,
        "qty": quantity
    };

    if (localStorage.getItem("camerasInCart") === null){
        localStorage.setItem("camerasInCart", JSON.stringify([]));
    }

    let cart = JSON.parse(localStorage.getItem("camerasInCart"));

    if (cart.length == 0) {
        cart.push(camera);
    }else {
        let index = cart.findIndex(o => o.id == camera.id);
        //console.log(index);
        if (index != -1){
            cart[index].qty += 1;
        }else {
            cart.push(camera);
        }
    }

    localStorage.setItem("camerasInCart", JSON.stringify(cart))
    cartQty();

};
document.getElementById('addToCart').addEventListener("click", function () {
    addToCart();
}, false);


// localStorage.clear();