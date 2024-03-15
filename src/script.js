// console.log('hi')



let basket = JSON.parse(localStorage.getItem("productsInfo")) || [];
console.log(typeof basket)

let productsWrapper = document.getElementById("products");
let generateProducts = () => {
    return(
        productsWrapper.innerHTML = productsList.map(product => {
            let {id, title, des, img, price} = product;
            let selectedItem = basket.find(x => x.id === id) || [];
            // console.log(selectedItem.total)
            return(
            `<div id=product-id-${id} class="product">
                <div class="product-img">
                <img src=${img} alt="">
                </div>
                <div class="product-details">
                    <h3 class="title">${title}</h3>
                    <p>${des}</p>
                    <h3>$${price}</h3>
                    <div class="buttons">
                        <button onclick="decrement('${id}')" class="decrement" id="decrement">-</button>
                        <button id=${id} class="selected-products">${selectedItem.total === undefined ? 0 : selectedItem.total}</button>
                        <button onclick="increment('${id}')" class="increment" id="increment">+</button>
                    </div>
                </div>
                </div>`
                )
        }).join("")
    )  
}

generateProducts();

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
}


const update = (id) => {
    let total = basket.find(x => x.id === id);
    document.getElementById(id).innerHTML = total.total ;
    // basket = basket.filter(x => x.total !== 0);   
    totalSelectedProducts();
}

const totalSelectedProducts = () => {
    let totalSelectedItems = basket.map(x => x.total).reduce((x, y) => x + y, 0);
    document.getElementById('total-products').innerHTML = totalSelectedItems;
    // console.log(totalSelectedItems)
}

totalSelectedProducts()


