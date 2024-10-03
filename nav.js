function NAVBAR() {
  let login = document.getElementById("login");
  let logout = document.getElementById("logout");
  let cart = document.getElementById("cart");
  let profile = document.getElementById("profile");
  let token = localStorage.getItem("jwtToken");
  if(token != null || token != undefined){
    login.style.display = "none";
  }else{
    logout.style.display = "none";
    cart.style.display = "none";
    profile.style.display = "none";
  }
}
NAVBAR()
function LOGOUT() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userId");
  window.location.href = "index.html";
}

async function cart() {
  let userId = localStorage.getItem("userId");
  let request = await fetch(`https://localhost:44384/api/Carts/GetCartItemsByUserId/${userId}`);
  let data = await request.json();
  console.log(data);
  let cartItemsContainer = document.getElementById("cartItemsContainer");
  if(data.cartItems == null || data.cartItems.length == 0){
    let noitems = document.getElementById("noitems");
    noitems.style.display = "";
  }else{
  data.cartItems.forEach(item => {
    cartItemsContainer.innerHTML += `<div class="w-commerce-commercecartitem cart-item">
                    <img
                      src="images/${item.product.image1}"
                      alt=""
                      class="w-commerce-commercecartitemimage cart-image"
                      style="height:92px;"
                    />
                    <div
                      class="w-commerce-commercecartiteminfo cart-summary"
                    >
                      <div
                        class="w-commerce-commercecartproductname text-small is-semi-bold"
                      >
                        ${item.product.name}
                      </div>
                      <div
                      class="text-regular"
                      >
                        &nbsp;${(item.product.price - (item.product.price * item.product.discount))}.00&nbsp;JOD
                      </div>
                      
                      
                      <a
                        href="#"
                        role="button"
                        class="w-inline-block"
                        aria-label="Remove item from cart"
                        onclick="removeCartItem(${item.id})"
                        ><div class="text-tiny is-color-p3">
                          Remove
                        </div></a
                      >
                    </div>
                    
                  </div>`
  });}
  let subtotal = document.getElementById("subtotal");
  subtotal.innerHTML = `&nbsp;<p id="total" style = "display: inline">${data.subtotal}</p>.00&nbsp;JDs`;
    subtotal.style.display = "inline";
  let count = document.getElementById("count");
  count.innerHTML = `${data.count}`;
}
cart()

async function removeCartItem(cartItemId) {
  let request = await fetch(`https://localhost:44384/api/Carts/DeleteCartItem/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
  });
  if (request.ok) {
    cartItemsContainer.innerHTML = ""
    cart();
  } else {
    console.log("Error deleting cart item");
  }
}
function Checkout(){
  debugger;
  let userId = localStorage.getItem("userId");
  let cartItemsContainer = document.getElementById("cartItemsContainer");
  if(cartItemsContainer.innerHTML == ""){
    alert("Your cart is empty!")
  }else{
    let total = document.getElementById("total");
    localStorage.setItem("total", total.innerText);
    window.location.href = "Checkout.html";
  }
}