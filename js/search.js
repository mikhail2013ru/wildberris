const search = () => {
    const input = document.querySelector('.search-block > input')
    const searchBtn = document.getElementById('button-addon2')

    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            let inpValue = e.target.value
            getInputData(inpValue)
            input.value = ''  
        }
    })

    searchBtn.addEventListener('click', () => {
        const inpValue = input.value
        getInputData(inpValue)
        input.value = ''
    })

    const getInputData = (inpValue) => {
        fetch('https://wildberris-524f3-default-rtdb.firebaseio.com/db.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const array = data.filter((item) => {
                if (item.name.toLowerCase().includes(inpValue.toLowerCase())) {
                    return item.name
                }
            })

            localStorage.setItem('goods', JSON.stringify(array))            
            if (window.location.pathname !== '/goods.html') {
                window.location.href = '/goods.html'
            } else {
                renderGoods(array)
            }
        })
    }

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list')
        goodsContainer.innerHTML = ''
        goods.forEach(({category, description, gender, id, img, label, name, offer, price}) => {
            const goodBlock = document.createElement('div')
            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')
            goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${label ? null : 'd-none'}">${label}</span>
                    <img src="db/${img}" alt="${name}" class="goods-image">
                    <h3 class="goods-title">${name}</h3>
                    <p class="goods-description">${description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${id}">
                        <span class="button-price">$${price}</span>
                    </button>
                </div>
            `
            goodsContainer.append(goodBlock)
        })
    }
}

search()