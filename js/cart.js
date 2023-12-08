const cart = () => {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = cart.querySelector('.modal-close')
    const tableGoods = document.querySelector('.cart-table__goods')
    const modalForm = document.querySelector('.modal-form')
    const cardTotalPrice = document.querySelector('.card-table__total')

    const totalPrice = () => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        if (cart.length !== 0) {
            modalForm.style.display = 'flex'
            let res = cart.map((elem) => {
                return elem.price * elem.count
            })
        
            const result = res.reduce((sum, elem) => {
                return ((sum) + (elem))
            })

            cardTotalPrice.innerHTML = result
        } else {
            modalForm.style.display = 'none'
            cardTotalPrice.innerHTML = '0$'
        }
    }

    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        const newCart = cart.filter(good => {
            return good.id !== id
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        totalPrice()
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                good.count++
            }
            return good
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        totalPrice()
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        let newCart = cart.map(good => {
            if (good.id === id) {
                if (good.count > 0) {
                    good.count--
                }
            }
            return good
        })

        newCart = newCart.filter((good) => {
            return good.count
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        totalPrice()
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const renderCartGoods = (goods) => {
        tableGoods.innerHTML = ''
        goods.forEach(({name, price, count, id}) => {
            console.log(goods);
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${name}</td>
                <td>${price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${count}</td>
                <td><button class="cart-btn-plus"">+</button></td>
                <td class="totalPriceItem">${+price * +count}$</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `

            tr.addEventListener('click', (e) => {
                const target = e.target
                if (target.classList.contains('cart-btn-minus')) {
                    minusCartItem(id)
                } else if (target.classList.contains('cart-btn-plus')) {
                    plusCartItem(id)
                } else if (target.classList.contains('cart-btn-delete')) {
                    deleteCartItem(id)
                }

            })
            
            tableGoods.append(tr)
        })
    }

    const sendForm = () => {
        const cartArray = localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : []

        fetch('https://jsonplaceholder.typicode.com/posts/', {
            method: 'POST',
            body: JSON.stringify({
                cart: cartArray,
                name: '',
                phone: ''
            })
        }).then(() => {
            cart.style.display = 'none'
            localStorage.removeItem('cart')
        })        
    }

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('submit');
        sendForm()
    })
    
    cartBtn.addEventListener('click', () => {     
        const cartArray = localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : []
        totalPrice()
        renderCartGoods(cartArray)
        cart.style.display = 'flex'
    })
    
    closeBtn.addEventListener('click', () => {
        cart.style.display = 'none'
    })

    cart.addEventListener('click', (e) => {
        const target = e.target
        if (!target.closest('.modal') && target.classList.contains('overlay')) {
            cart.style.display = 'none'
        }
    })
}

cart()