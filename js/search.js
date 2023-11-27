const search = () => {
    const input = document.querySelector('.search-block > input')
    input.addEventListener('change', (e) => {
        console.log(e.target.value);
    })
}

search()