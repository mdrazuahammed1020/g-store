let basket = JSON.parse(localStorage.getItem("productsInfo")) || [];
let cartWrapper = document.getElementById('cartWrapper');
let cartTitleInfo = document.getElementById('cartTitleInfo');

const generateSelectedProduct = () => {
    if(!basket.length){
       return cartWrapper.innerHTML = (
            `<div class="empty-cart" >
            <h2>Cart is Empty!</h2>
            <button><a href="index.html">Go back Home</a></button>
            </div>`
        )
    }else{
       return cartWrapper.innerHTML = basket.map((product) => {
        let {id, total} = product;
        let item = productsList.find(x => x.id === id);
        let {title, img, price} = item;
        return `<div id=cart-item-${id} class="cart">
                   <div class="cart-top">
                   <img src=${img} alt="product-img" width="60" />
                   <div class="cart-title-price" >
                   <h3 class="title" >${title}</h3>
                   <h3>$ ${price}</h3>
                   </div>
                   <a onclick="filterProduct('${id}')" class="del-btn" >Delete</a>
                   </div>
                   <div class="buttons increment-decrement-total-btn">
                   <button onclick="decrement('${id}')" >-</button>
                   <button id=${id} >${total}</button>
                   <button onclick="increment('${id}')" >+</button>
                   </div>
                   <h3>Total: $${total * price}</h3> 
                </div>`
       }).join('')
    } 
}

generateSelectedProduct();

const increment = (id) => {
    let selectedId = id;
    let product = basket.find(x => x.id === id);
    if(!product){
        basket.push({
            id: selectedId,
            total: 1
        })
    }else{
        product.total++;
    }
    update(id)
    localStorage.setItem("productsInfo", JSON.stringify(basket));
    generateSelectedProduct();
    generateCartHeader()

}

const decrement = (id) => {
    let selectedId = id;
    console.log(selectedId);
    let product = basket.find(x => x.id === id);
    if(!product) return;
    else if(product.total === 0) return;
    else{
        product.total--;
    }
    update(id)
    basket = basket.filter(x => x.total !== 0) || [];
    localStorage.setItem("productsInfo", JSON.stringify(basket));
    generateSelectedProduct();
    generateCartHeader();

}

const update = (id) => {
    let total = basket.find(x => x.id === id);
    totalSelectedProducts();
    generateCartHeader();
    generateSelectedProduct( )
    document.getElementById(id).innerHTML = total.total ;
    
}

const generateCartHeader = () => {
    
    let totalPrice = basket.map(x =>{
        let {id, total} = x;
        let selectedItem = productsList.find(x => x.id === id);
        return selectedItem.price * total;
        }).reduce((a,b)=> a + b, 0);
        console.log(totalPrice)
        if(basket.length !== 0){
            return cartTitleInfo.innerHTML = `
                                         <div class="cartTopSection">
                                         <h2>Total product price: ${totalPrice}</h2>
                                         <button>Check out</button>
                                         <button onclick="clearOut()" >Clear cart</button>
                                         </div>`
        }
        else {
            return `<h2></h2>`
        };
}
generateCartHeader();

const clearOut = () => {
    basket = [];
    generateSelectedProduct();
    totalSelectedProducts();
    filterProduct();
    cartTitleInfo.innerHTML = ''; // Clear the cart header section
    localStorage.setItem("productsInfo", JSON.stringify(basket));

}

const filterProduct = (id) => {
    basket = basket.filter(x => x.id !== id);
    generateSelectedProduct();
    totalSelectedProducts();
    localStorage.setItem("productsInfo", JSON.stringify(basket));

    if (basket.length === 0) {
        cartTitleInfo.innerHTML = ''; // Clear the cart header section
    } else {
        generateCartHeader(); // Regenerate the cart header
    }

}




const totalSelectedProducts = () => {
    let totalSelectedItems = basket.map(x => x.total).reduce((x, y) => x + y, 0);
    document.getElementById('total-products').innerHTML = totalSelectedItems;
}

totalSelectedProducts();