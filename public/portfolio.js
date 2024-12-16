const divDossiers = document.querySelector('#dossiers')
const divPhotos = document.querySelector('#photos')

// divDossiers.style.display='flex'
// divPhotos.style.display='none'

let dossiers = []
// Requête GET avec fetch
fetch('/portfolio')
    .then(response => {
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json(); // Convertit la réponse en JSON
    })
    .then(datas => {
    datas.forEach(el => {
        let nom = el.name
        dossiers.push(nom)
    });
    creatDossiers(dossiers)
    })
    .catch(error => {
    console.error('Erreur lors de la requête :', error); // Gestion des erreurs
});


function creatDossiers(noms) {
    noms.forEach(async (nom) =>{

        let div = document.createElement('div')
        div.classList.add('dossiers')
        div.id = nom
        let chemin = await searchImg(nom)

        if(chemin){
            div.style.backgroundImage = `url(${chemin})`
        }else{
            let p = document.createElement('p')
            p.textContent = "aucune photo disponible"
            div.appendChild(p)
        }

        divDossiers.appendChild(div)

        div.addEventListener('click', ()=>{
            imgs(div.id)
        })

        let h2 = document.createElement('h2')
        h2.textContent = nom
        div.appendChild(h2)

    })
}

async function searchImg(el) {
    try {
        const response = await fetch(`/portfolio/dossierimg/${el}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        return data.src; // Retourne le chemin de l'image
    } catch (error) {
        console.error(`Erreur lors de la requête pour ${el} :`, error);
        return null; // Retourne null en cas d'erreur
    }
}

async function imgs(el) {
    try {
        const response = await fetch(`/portfolio/img/${el}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const datas = await response.json();
        divDossiers.style.display ="none"
        divPhotos.style.display='flex'
        let button = document.createElement('button')
        button.textContent = "retour"
        divPhotos.appendChild(button)
        button.addEventListener('click', ()=>{
            divPhotos.textContent=""
            divDossiers.style.display ="flex"
        })
        datas.forEach( data => {
            let img = document.createElement('img')
            img.src = `portfolio/${el}/${data}`
            divPhotos.appendChild(img)
        });
        
    } catch (error) {
        console.error(`Erreur lors de la requête pour ${el} :`, error);
        return null; // Retourne null en cas d'erreur
    }
}

