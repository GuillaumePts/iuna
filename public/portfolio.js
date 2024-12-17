const divDossiers = document.querySelector('#dossiers')
const divPhotos = document.querySelector('#photos')

afficherDossiers()


// Appel des dossiers
function afficherDossiers(){
    
    let dossiers = []
    console.log(dossiers);
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
}



// Construction du dossier 
function creatDossiers(noms) {


    noms.forEach(async (nom) =>{

        let div = document.createElement('div')
        div.classList.add('dossier')
        div.id = nom
        let chemin = await searchImg(nom)

        if(chemin){
            let imgBack = document.createElement('img')
            imgBack.src = chemin
            div.appendChild(imgBack)
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


// Appel pour trouver la première photo de chaque dossier 
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


// Function d'appel des images du dossier choisi
async function imgs(el) {

    divPhotos.style.display = "flex"
    divDossiers.style.display ="none"

    try {
        const response = await fetch(`/portfolio/img/${el}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const datas = await response.json();

        let button = document.querySelector('#return')
        button.addEventListener('click', ()=>{

            const imgasupp = divPhotos.querySelectorAll('img')
            imgasupp.forEach(img => {
                img.remove();
            });
            divPhotos.style.display = "none"
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

