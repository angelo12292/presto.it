

function generateCard(announcement){
    

    const createdAt = new Date(announcement.createdAt);

    const announcementsRow = document.getElementById('announcementsRow');

    let col = document.createElement('div');
    col.className = "col-12 col-md-6 col-xl-4";
    announcementsRow.appendChild(col)
    
    let card = document.createElement('a');
    card.setAttribute('href','/myannounce.html?id='+announcement.id)
    card.className = "card sottnone";
    col.appendChild(card);
    
    let img = document.createElement('img');
    img.setAttribute('src', 'https://picsum.photos/seed/123/640/480');
    img.className = 'card-img-top';
    card.appendChild(img);


    let span = document.createElement('span');
    span.className = `position-absolute top-0 end-0  px-4 py-2 text-uppercase ${announcement.type === 'sell' ? 'bg-danger' : 'bg-primary'}`;
    span.textContent = announcement.type.toUpperCase();
    card.appendChild(span);


    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    let pPrice = document.createElement('p');
    pPrice.className = 'text-primary fw-semibold fs-5 mb-1';
    pPrice.textContent = `€ ${announcement.price}`;
    cardBody.appendChild(pPrice);

    let h5card = document.createElement('h5');
    h5card.className = 'card-title display-5';
    h5card.textContent = announcement.name;
    cardBody.appendChild(h5card)

    let p1 = document.createElement('p');
    p1.className = 'card-text text-muted';
    p1.textContent = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
    cardBody.appendChild(p1);

    let footer = document.createElement('div');
    footer.className = 'card-footer d-flex justify-content-around p-3 bg-white text-primary';
    card.appendChild(footer);

    let pLike = document.createElement('p');
    pLike.className = 'mb-0';
    footer.appendChild(pLike);

    let iLike = document.createElement('i');
    iLike.className = 'bi bi-tags-fill';
    pLike.appendChild(iLike);

    let spanLike = document.createElement('span')
    spanLike.textContent = 'Like'
    iLike.appendChild(spanLike);

    let pCategories = document.createElement('p');
    pCategories.className = 'mb-0';
    footer.appendChild(pCategories);

    let iCategories = document.createElement('i');
    iCategories.className = 'bi bi-tags';
    pCategories.appendChild(iCategories);

    let spanCategories = document.createElement('span')
    spanCategories.textContent = announcement.category
    iCategories.appendChild(spanCategories);

    let pDate = document.createElement('p');
    pDate.className = 'mb-0';
    footer.appendChild(pDate);

    let iDate = document.createElement('i');
    iDate.className = 'bi bi-calendar';
    pDate.appendChild(iDate);

    let spanDate = document.createElement('span')
    spanDate.textContent = createdAt.toLocaleDateString();
    iDate.appendChild(spanDate);

    return col

}

const announcementsRow = document.getElementById('announcementsRow');

    

function showAnnuncements(announcements) {

    while(announcementsRow.hasChildNodes()) {
        announcementsRow.removeChild(announcementsRow.firstChild);
    }

    announcements.forEach((announcement) => {
      generateCard(announcement);
    });
}

async function readAllAnnuncements() {
    const response = await fetch('/server/api/annunci.json');
    const announcements = await response.json();

    return announcements;
}


// nuova funzioni per la singola scheda

const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const minPriceInput = document.getElementById('minPriceInput');
const maxPriceInput = document.getElementById('maxPriceInput');
const sortSelect = document.getElementById('sortSelect');

const filteringForm = document.getElementById('filteringForm');
filteringForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value.toLowerCase();
    const minPrice = minPriceInput.value;
    const maxPrice = maxPriceInput.value;
    const sortBy = sortSelect.value;

    const announcements = await readAllAnnuncements();

    const filteredAnnouncements = announcements.filter((announcement) => {

        let isAnnouncementRequired = true;

        if(search.length > 0) {
            isAnnouncementRequired = announcement.name.toLowerCase().includes(search);
        }

        if(isAnnouncementRequired == true && category.length > 0) {
            isAnnouncementRequired = announcement.category.toLowerCase() == category;
        }

        if(isAnnouncementRequired == true && minPrice.length > 0) {
            isAnnouncementRequired = announcement.price >= parseFloat(minPrice);
        }

        if(isAnnouncementRequired == true && maxPrice.length > 0) {
            isAnnouncementRequired = announcement.price <= parseFloat(maxPrice);
        }

        return isAnnouncementRequired;
    });


    if(sortBy.length > 0) {

        switch(sortBy) {
            case 'ascByPrice':
                filteredAnnouncements.sort((left, right) => {
                    return parseFloat(left.price) - parseFloat(right.price);
                });
                break;
            case 'descByPrice':
                filteredAnnouncements.sort((left, right) => {
                    return parseFloat(right.price) - parseFloat(left.price);
                });
                break;
            case 'ascByDate':
                filteredAnnouncements.sort((left, right) => {
                    return left.createdAt - right.createdAt;
                });
                break;
            case 'descByDate':
                filteredAnnouncements.sort((left, right) => {
                    return right.createdAt - left.createdAt;
                });
                break;
            case 'ascByAlpha':
                filteredAnnouncements.sort((left, right) => {
                    return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
                });
                break;
            case 'descByAlpha':
                filteredAnnouncements.sort((left, right) => {
                    return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
                });
                break;
        }
    }

    showAnnuncements(filteredAnnouncements);
});


function showCategories(announcements) {

    const uniqueCategories = new Set();

    announcements.forEach((announcement) => {
        uniqueCategories.add(announcement.category);
    });

    uniqueCategories.forEach((category) => {

        const option = document.createElement('option');
        option.setAttribute('value', category.toLowerCase());
        option.textContent = category;

        categorySelect.appendChild(option);
    });
}


readAllAnnuncements()
.then((announcements)=>{
    showCategories(announcements);

    showAnnuncements(announcements);
})

.catch((error)=>{
console.log(error);

})

searchInput.value = '';