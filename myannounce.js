function generateCard(announcement) {

    const createdAt = new Date(announcement.createdAt);

    const announcementRow = document.getElementById('announcementRow');


     let col = document.createElement('div');
     col.className = "col-12 col-md-6 p-0";
     announcementRow.appendChild(col);
     
     let img = document.createElement('img');
     img.setAttribute('src', 'https://picsum.photos/seed/123/640/480');
     img.className = 'card-img-top';
     col.appendChild(img);

     let colCard = document.createElement('div');
     colCard.className = "col-12 col-md-6 p-4 d-flex align-items-center";
     announcementRow.appendChild(colCard)

     let colEmpty1 = document.createElement('div');
     colCard.appendChild(colEmpty1)

     let colEmpty2 = document.createElement('div');
     colEmpty1.appendChild(colEmpty2)
 
     let pPrice = document.createElement('p');
     pPrice.className = 'text-primary fw-semibold fs-5 mb-1';
     pPrice.textContent = `€ ${announcement.price}`;
     colEmpty2.appendChild(pPrice);
 
     let h5Card = document.createElement('h5');
     h5Card.className = 'card-title display-5';
     h5Card.textContent = announcement.name;
     colEmpty2.appendChild(h5Card)
 
     let p1 = document.createElement('p');
     p1.className = 'card-text text-muted';
     p1.textContent = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
     colEmpty2.appendChild(p1);

     let footer = document.createElement('div');
     footer.className = 'd-flex justify-content-around p-3 bg-white text-primary';
     colEmpty1.appendChild(footer);
 
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

   
    readAllAnnouncements()
        .then((announcements) => {
    
            const query = new URLSearchParams(window.location.search);
            const id = query.get('id');
    
            const foundAnnouncement = announcements.find((announcement) => {
                    return announcement.id == id;
                
            });

        generateCard (foundAnnouncement);
           
        })
        .catch((error) => {
            console.log(error);
        });


    async function readAllAnnouncements() {
    const response = await fetch('/server/api/annunci.json');
    const announcements = await response.json();

    return announcements;
}

