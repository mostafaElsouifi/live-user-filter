const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

filter.addEventListener('input', e => { 
    filterData(e.target.value);
    displayNoResults()
});

getData();

async function getData(){
    const res = await fetch('https://randomuser.me/api/?results=50');
    const data = await res.json();
    const { results } = data;

    // clear results 
    result.innerHTML = '';

    // add no result html 

    const noResultLi = document.createElement('li');
    listItems.push(noResultLi);
    noResultLi.setAttribute('id', 'no-result');
    noResultLi.classList.add('hide');
    noResultLi.innerHTML = `
    <h3>Sorry No Users &#129488	</h3>` ;
    result.appendChild(noResultLi)
    results.forEach( user => {
        const li = document.createElement('li');
        listItems.push(li);
        
        li.innerHTML = `<img src="${user.picture.large}">
        <div class="user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
        </div>`;

        result.appendChild(li);

    });
}


const filterData  = (searchTerm)=>{
    listItems.forEach(item =>{
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())){
            item.classList.remove('hide')
        }else{
            item.classList.add('hide')
        }
    })
}

const displayNoResults = ()=>{
    const noResultLi = document.getElementById('no-result');
    const users = listItems.filter(user => user.className !== 'hide');
    if(users.length === 0) { 
        noResultLi.classList.remove('hide');
    }else{
        noResultLi.classList.add('hide');
    }

}