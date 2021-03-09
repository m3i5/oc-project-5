const displayCart = () => {
    let cartItems = JSON.parse(localStorage.getItem("camerasInCart"));

    let container = document.getElementById("cartContent");
    let output = '';
    let total = 0;


    if ( cartItems != null ) {

        for (var i in cartItems) {

            camera = cartItems[i];
            output +=
                `<div class="singleInCart" id="${camera.id}">
                    <img src="${camera.img}" width="65" height="65">
                    <h3>${camera.name}</h3>
                    <p class="item_price" id="number">Qty: ${camera.qty}</p>
                    <button class="btn" id="decrement" value="minus">-</button>
                    <button class="btn" id="increment" value="plus">+</button>
                    <p>${camera.price}</p>
                    <button class="btn delete_item" id="del">Remove</button>
                </div>`;

            total += parseFloat(camera.qty) * parseFloat(camera.price);

            container.innerHTML = output;
        }

        document.getElementById('total').innerHTML =
            `<div class="cartSum">
                <h3>Total: </h3>
                <p id="total-sum">${total}</p><span>$</span>
            </div>`;
    }


}
displayCart();

const btn = document.querySelectorAll('#del');
const inc = document.querySelectorAll('#increment');
const dec = document.querySelectorAll('#decrement');

btn.forEach(function (button) {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        parent = button.parentElement.id;
        cart = JSON.parse(localStorage.getItem("camerasInCart"));

        for (let cam of cart) {
            if (cam.id === parent) {
                camIndex = cart.indexOf(cam);
                console.log(camIndex);
                cart.splice(camIndex, 1);

                element = document.getElementById(parent);
                element.remove();

                sum = parseFloat(cam.qty) * parseFloat(cam.price);

                totalBefore = document.querySelector('#total-sum').innerText
                totalNow = parseFloat(totalBefore) - sum;

                if(totalNow == 0){
                    totalElement = document.getElementById('total');
                    totalElement.remove();
                }
                if(cart.length == 0){
                    localStorage.clear();
                    let container = document.getElementById("cartContent");
                    let output = '';

                        output +=
                        `<p class="emptyParagraph">Sorry your cart seems to be empty <br />
                        Please add an item to proceed with your order...</p>`;
                        container.innerHTML = output;

                }
                document.getElementById('total-sum').innerText = totalNow;

                localStorage.setItem('camerasInCart', JSON.stringify(cart));
                cartQty();
            }

        }

    })
})

inc.forEach(function (inc) {
    inc.addEventListener('click', (e) => {
        e.preventDefault();
        parent = inc.parentElement.id;
        cart = JSON.parse(localStorage.getItem("camerasInCart"));

        for (let cam of cart) {
            if (cam.id === parent) {
                cam.qty += 1;

                totalBefore = document.querySelector('#total-sum').innerText
                totalNow = parseFloat(totalBefore) + parseFloat(cam.price);
                document.getElementById('total-sum').innerText = totalNow;

                document.getElementById(parent).children[2].innerText = `Qty: ${cam.qty}`;

                if(cart.length == 0){
                    localStorage.clear();
                    totalElement = document.getElementById('total');
                    totalElement.remove();
                }

                localStorage.setItem('camerasInCart', JSON.stringify(cart));
                cartQty();
            }

        }
    })
})

dec.forEach(function (dec) {
    dec.addEventListener('click', (e) => {
        e.preventDefault();
        parent = dec.parentElement.id;
        cart = JSON.parse(localStorage.getItem("camerasInCart"));

        for (let cam of cart) {
            if (cam.id === parent) {
                cam.qty -= 1;

                totalBefore = document.querySelector('#total-sum').innerText
                totalNow = parseFloat(totalBefore) - parseFloat(cam.price);
                document.getElementById('total-sum').innerText = totalNow;

                if(cam.qty == 0){
                    camIndex = cart.indexOf(cam);
                    console.log(camIndex);
                    cart.splice(camIndex, 1);

                    element = document.getElementById(parent);
                    element.remove();
                    localStorage.setItem('camerasInCart', JSON.stringify(cart));
                    if(cart.length == 0){
                        localStorage.clear();
                        totalElement = document.getElementById('total');
                        totalElement.remove();

                        let container = document.getElementById("cartContent");
                        let output = '';

                            output +=
                            `<p class="emptyParagraph">Sorry your cart seems to be empty <br />
                            Please add an item to proceed with your order...</p>`;
                            container.innerHTML = output;

                    }
                }

                document.getElementById(parent).children[2].innerText = `Qty: ${cam.qty}`;
                localStorage.setItem('camerasInCart', JSON.stringify(cart));
                cartQty();
            }

        }
    })
})

function validate(){
    let fName = document.forms["orderForm"]["firstName"].value;
    let lName = document.forms["orderForm"]["lastName"].value;
    let address = document.forms["orderForm"]["addressInput"].value;
    let city = document.forms["orderForm"]["cityInput"].value;
    let email = document.forms["orderForm"]["emailInput"].value;

    var products = [];

    if ( fName == "" || lName == "" || address == "" || city == "" || email == ""){
        alert("All fields are required!");
        return false;
    }else if (JSON.parse(localStorage.getItem("camerasInCart")) === null){
        alert("Shopping cart is empty!");
    }else {

        cart = JSON.parse(localStorage.getItem("camerasInCart"));

        for (let camera of cart){
            products.push(camera.id);
        }
        contactObj = {
            contact: {
                firstName: fName,
                lastName: lName,
                address: address,
                city: city,
                email: email
            },
            "products": products
        };
        contact = {
            "firstName": fName,
            "lastName": lName,
            "address": address,
            "city": city,
            "email": email
        };

        let xhttp = new XMLHttpRequest();


    xhttp.onload = function () {
      if (this.status >= 200 && this.status < 300) {

        let response = JSON.parse(this.responseText)
        console.log(response.orderId);

        main = document.getElementById("cart-main");
        total = document.getElementById('total-sum').innerText;
        main.innerHTML = `
                    <section id="confirmation">
                        <i class="fas fa-check"></i>
                        <h2>Thank you for you order!</h2>
                        <h2>Order id: ${response.orderId}</h2>
                        <p>Total: ${total}\$</p>
                        <a href="index.html" class="button">Continue shopping</a>
                    </section>
        `;

        currentCameras = JSON.parse(localStorage.getItem("camerasInCart"));
        currentOrder = {
            datails: {
                contact: contact,
                id: response.orderId,
                total: total
            },
            cameras: currentCameras
        }
        if (localStorage.getItem("pastOrders") === null){
            localStorage.setItem("pastOrders", JSON.stringify([]));
        }

        let orders = JSON.parse(localStorage.getItem("pastOrders"));
        orders.push(currentOrder);
        localStorage.setItem("pastOrders", JSON.stringify(orders));
        localStorage.removeItem("camerasInCart");
      } else {
        alert("response unsuccessfull")
      }

    };
    xhttp.open("POST", "http://localhost:3000/api/cameras/order");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ "contact": contact, "products": products }));

    }

}

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  validate();
});

function emptyMessage() {
    let cartItems = JSON.parse(localStorage.getItem("camerasInCart"));
    let container = document.getElementById("cartContent");
    let output = '';

    if (cartItems === null){
        output =
        `<p class="emptyParagraph">Sorry your cart seems to be empty <br />
        Please add an item to proceed with your order...</p>`;
        container.innerHTML = output;
    }
}

emptyMessage();

// localStorage.clear();


