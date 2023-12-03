const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')

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

    const categoryLink = (goodCategory) => {
        const secTitle = document.querySelector('.section-title')
        secTitle.innerHTML = goodCategory
        console.log(secTitle);
        console.log(goodCategory);
    }

    const getData = (value, category) => {
        fetch('https://wildberris-524f3-default-rtdb.firebaseio.com/db.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const array = category ? data.filter((item) => item[category] === value) : data
            localStorage.setItem('goods', JSON.stringify(array))

            const nav = document.querySelector('.navigation')
            nav.addEventListener('click', (e) => {
                const target = e.target
                if (target.closest('.navigation-link')) {
                    console.log(target.textContent);
                    categoryLink(target.textContent)
                }
            })

            renderGoods(array)
                
            
            // if (window.location.pathname !== '/goods.html') {
            //     window.location.href = '/goods.html'
            //     nav.addEventListener('click', (e) => {
            //         // window.location.href = '/goods.html'
            //         const target = e.target
            //         if (target.closest('.navigation-link')) {
            //             categoryLink(target.textContent)
            //         }
            //     })
            //     renderGoods(array)
            // }


            if (window.location.pathname === '/goods.html') {
                // window.location.reload()
                console.log(window.location);
                // nav.addEventListener('click', (e) => {
                //     // window.location.href = '/goods.html'
                //     const target = e.target
                //     if (target.closest('.navigation-link')) {
                //         categoryLink(target.textContent)
                //     }
                // })
                // renderGoods(array)
            }
                // const navLink = document.querySelectorAll('.navigation-link')
                // const arrayNav = navLink.map((item) => {
                //     if (item.textContent.toLowerCase())
                //     console.log(item.textContent);
                // })
                // console.log(itemId);
            // console.log(array);
            // renderGoods(array)
                
            // else {
            //     // renderGoods(array)
            // }
        })
    }
    
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            // e.preventDefault()
            const linkValue = link.textContent
            const category = link.dataset.field            
            getData(linkValue, category)
        })
    })

    if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }    

    
}

getGoods()