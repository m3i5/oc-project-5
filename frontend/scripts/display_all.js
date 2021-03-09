// Func to diplay all cameras on main page
const displayAllProducts = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/cameras/', true);

    xhr.onload = function () {
        if (this.status == 200) {

            let cameras = JSON.parse(this.responseText);
            let display = '';

            for (let i in cameras) {

                display +=
                `<div class="frame">
                    <div>
                        <img src="${cameras[i].imageUrl}">
                        <div>
                            <h2>${cameras[i].name}</h2>
                            <h3>${cameras[i].price / 100}.00$</h3>
                            <a class="test btn" href="singleCam.html?productId=/${cameras[i]._id}">Product details</a>
                        </div>
                    </div>
                </div>`;
                document.getElementById('productList').innerHTML = display;
            }
        } else {
            console.log("error")
        }
    }

        xhr.send();
    }

displaySingleCamera = () => {

    let query = window.location.search.substring(1);
    let vars = query.split("=");
    let ID = vars[1];

    let xhr = new XMLHttpRequest();
    let  url = 'http://localhost:3000/api/cameras/' + ID;

    xhr.open('GET', url);

    xhr.onload = function () {

        if (this.status == 200) {

            let product = JSON.parse(this.responseText);


            document.getElementById('productImage').src = `${product.imageUrl}`;
            document.getElementById('productName').textContent = `${product.name}`;
            document.getElementById('productPrice').textContent = `${product.price / 100}.00$`;
            document.getElementById('productDescription').textContent = `${product.description}`;

            let dropDown = document.getElementById('customisation');
            dropDown.lenght = 0;

            let defaultOption = document.createElement('option');
            defaultOption.text = "Choose a lense";
            dropDown.add(defaultOption);

            let options = [];

            for (i in product.lenses) {
                let lense = document.createElement('option');
                lense.className = 'lense' + [i];
                lense.text = product.lenses[i];
                dropDown.add(lense);
            }


        } else {
            console.log("error");
        }
    }
    xhr.send();

}


function cartQty(){
    let cartItems = JSON.parse(localStorage.getItem("camerasInCart"));
    let sumOfCameras = 0;

    if ( cartItems != null ) {

        for (var i in cartItems) {

            camera = cartItems[i];
            sumOfCameras += parseFloat(camera.qty);

        }
        document.getElementById("cartIcon").innerHTML =
                `<p>Cart</p>
                <p class="nav__cart--quantity">${sumOfCameras}</p>`
    }

}
cartQty();
displayAllProducts();
displaySingleCamera();
// localStorage.clear();