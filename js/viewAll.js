const viewAll = () => {
    const ViewAllBtn = document.querySelector('.more')
    const HideBtn = document.querySelector('.hide')
    const shortGoods = document.querySelector('.short-goods')
    
    ViewAllBtn.addEventListener('click', (e) => {
        e.preventDefault()
        shortGoods.textContent = ''   
        getData() 
    })

    HideBtn.addEventListener('click', (e) => {
        e.preventDefault()
        getData(2) 
    })

    const renderGoods = (goods) => {
        const shortContainer = document.querySelector('.short-goods')
        shortContainer.innerHTML = ''
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
            shortContainer.append(goodBlock)
        })
    }

    const getData = (param) => {
        fetch('https://wildberris-524f3-default-rtdb.firebaseio.com/db.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (param) {
                const array = data.filter((item) => {
                    return item.label.toLowerCase() === 'new'
                }) 

                // const newArr = array.splice(4)
                array.splice(4)
                // console.log(array);
                localStorage.setItem('goods', JSON.stringify(array))
                renderGoods(array)
            } else {
                localStorage.setItem('goods', JSON.stringify(data))
                renderGoods(data)
            }
        })
    }

    getData(2)
}

viewAll()
