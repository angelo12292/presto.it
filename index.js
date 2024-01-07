
// fetch('/server/api/categorie.json')


let createCard = function(category){

    let col = document.createElement('div');
    col.className = "col-12 col-md-6 col-lg-4 col-xl-3 g-3"
   

    let card = document.createElement('div');
    card.className = "card text myiconcard border-4 "
    col.appendChild(card);

    let cardBody= document.createElement('div');
    cardBody.className = "card-body text-center bg-white"
    card.appendChild(cardBody);

    let icon = document.createElement('i')
    icon.className = category.icon
    cardBody.appendChild(icon);

    let title = document.createElement('h5')
    title.className = "card-title text-center text-black pt-3"
    title.textContent = category.name
    icon.appendChild(title);

    let announce = document.createElement('p')
    announce.className = "card-text mb-3 text-primary cardtex pt-2"
    announce.textContent = category.announcementsCount +' annunci'
    title.appendChild(announce);
    
    return col;
}

const row = document.getElementById('categoriesRow');

fetch('/server/api/categorie.json')
    .then((response)=>{
        return response.json();

    })
    .then((categories)=>{
        categories.forEach(category => {
            const col = createCard(category)
            row.appendChild(col)
        });
    })
    .catch((error) => {
        console.log(error);
    });
/*

   
}
 <div class="col-12 col-sm-6 col-md-3 mb-3">
        <div class="card text myiconcard">
          <div class="card-body d-flex align-items-center p-4 ">
          <i class="text-center mb-4 text-primary fa-solid fa-car fa-lg"></i>
          <h5 class="card-title text-center">Auto</h5>
          <p class="card-text text-center mb-3 text-primary">123 Annunci</p>
          </div>
        </div> 
    </div>







// http://127.0.0.1:5500/server/api/categorie.json      URL
// protocollo://dominio:porta/path?queryString
fetch('/server/api/categorie.json')
    .then((response) => {
        return response.json();
    })
    .then((categories) => {

        console.log('sono nel then', categories);

        categories.forEach((category) => {
            categoriesRow.innerHTML += createCard(category);
        });
    })
    .catch((error) => {
        console.log(error);
    });

    */
   