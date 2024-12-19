
const burger = document.querySelector('#burger')
const nav = document.querySelector('#nav')
const a = document.querySelectorAll('.menu')
const header = document.querySelector('header')
let tabImg = []

loadImages()



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
    }, 5000);

}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// css dynamique

function dynamicCss(css){
    const leslinks = document.querySelectorAll('.dynamic-css')
    leslinks.forEach(link=>{
        if(link.id === css){
            link.rel = 'stylesheet';
            link.media = "all"
        }else{
            link.media = "none"
        }
        
    })
}

// // Pré-charger toutes les pages HTML lors du chargement du site
const htmlCache = {};

function preloadHTMLPages() {
    const pages = ['accueil', 'portfolio', 'contact']; 
    const promises = pages.map(page => {
        return fetch(`/content/${page}`).then(response => response.text()).then(html => {
            htmlCache[page] = html;  
        });
    });

    Promise.all(promises).then(() => {
    }).catch(error => {
        console.error('Erreur lors du préchargement des pages:', error);
    });
}

preloadHTMLPages();

// menu dynamique 
function loadContent(page) {
    const mainContent = document.getElementById('main-content');

    mainContent.style.opacity = 0
    setTimeout(() => {
        mainContent.style.opacity = 1
    }, 100);
    
    
    if (htmlCache[page]) {
        const html = htmlCache[page];
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        mainContent.textContent = '';
        Array.from(doc.body.childNodes).forEach(node => {
            dynamicCss(page);
            mainContent.appendChild(node);
        });
      
        animvisible();
    } else {
        console.error(`Page ${page} non trouvée dans le cache.`);
    }
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


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

function testnum(){
    // Numéro de téléphone à composer
const phoneNumber = "+1234567890";

// Ouvrir l'application d'appel avec ce numéro
window.location.href = `tel:${phoneNumber}`;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::













