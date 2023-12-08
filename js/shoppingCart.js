const shoppingCart = () => {
    const shortContainer = document.querySelector('.short-goods')       
    shortContainer.addEventListener('click', (e) => {
        if (e.target.closest('.goods-card-btn')) {
            const buttonToCart = e.target.closest('.add-to-cart')
            const goodId = buttonToCart.dataset.id           
            addToCart(goodId)
        }
    })

    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods')) 
        const clickedGood = goods.find((good) => {
            return good.id === id
        })
        
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

        if (cart.some(good => good.id === clickedGood.id)) {
            console.log('+');
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })
        } else {
            clickedGood.count = 1
            cart.push(clickedGood)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        console.log(cart);
    }
}

shoppingCart()