console.log('hello world')

const burger = document.querySelector('#burger')
const nav = document.querySelector('#nav')
const a = document.querySelectorAll('.menu')
const header = document.querySelector('header')
let tabImg = []

loadImages()

burger.addEventListener("click",()=>{
    let el = burger.textContent
    menu(el)
})

function menu(arg){
    if(arg === 'menu_open'){

        burger.textContent="tab_close_right" 
        for (let i = 0; i < a.length; i++) {
            const el = a[i];
            el.style.transform=`translateX(0px)`
        }
        

    }else if(arg === 'tab_close_right'){
        burger.textContent="menu_open"
        let x = 200
        for (let i = 0; i < a.length; i++) {
            const el = a[i];
            x+=20
            el.style.transform=`translateX(${x}px)`
            el.classList.remove('shadow')
        }
        
    }else{
        arg === 'menu_open'
    }
}


async function loadImages() {
    try {
        const response = await fetch('/api/images');
        if (!response.ok) throw new Error('Erreur lors de la récupération des images');
        const images = await response.json();

        // Utilisez le tableau d'images pour configurer le carrousel
     // Vous pouvez l'utiliser dans votre fonction carrousel
        // Exemple : afficher chaque image dans un élément img
        
        images.forEach(imagePath => {
            tabImg.push(imagePath)
        });

        playCarrou()
    } catch (error) {
        console.error('Erreur:', error);
    }
}


function playCarrou(){

    let img= document.createElement('img')
    img.src = tabImg[tabImg.length-1];
    img.style.transition='1s linear'
    img.classList.add('limage')
    img.classList.add('blur')
    header.appendChild(img)
    header.prepend(img);
    let count = 0

    setInterval(() => {
        img.src=tabImg[count]
        if (count >= tabImg.length -1) {
            count = 0
        }else{
            count++
        }
        // img.style.filter="blur(5px)  grayscale(100%)"
        // img.style.opacity="0"
        // // img.style.transform="translate(-50%,-50%) scale(1.5)"

        // setTimeout(() => {
        //     img.style.filter="blur(0px)  grayscale(0%)"
        //     img.style.opacity="1"
        //     // img.style.transform="translate(-50%,-50%) scale(1)"
        // }, 300);
        
    }, 5000);

    
    


    
}




// Système de menu
function loadContent(page) {
    const mainContent = document.getElementById('main-content');
    const cssLink = document.getElementById('dynamic-css'); // L'ID du link est supposé être "dynamic-css"
    
    // Charger le contenu HTML de la page demandée
    fetch(`/content/${page}`)
        .then(response => response.text())
        .then(html => {
            // Interpréter le HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Effacer le contenu actuel et ajouter le nouveau contenu
            mainContent.innerHTML = '';
            Array.from(doc.body.childNodes).forEach(node => {
                mainContent.appendChild(node);
            });

            // Mettre à jour la feuille de style CSS
            cssLink.href = `${page}.css`;

            // Réactiver l'animation sur les nouveaux éléments chargés
            animvisible();
        })
        .catch(error => console.error('Erreur lors du chargement:', error));
}


function animvisible() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    // Réinitialiser les observations
    document.querySelectorAll('.scroll-fade').forEach(p => {
        observer.observe(p);
    });
}


// Initialisation
animvisible();




