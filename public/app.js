console.log('hello world')

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


// Système de menu
function loadContent(page) {
    const mainContent = document.getElementById('main-content');
    const cssLink = document.getElementById('dynamic-css'); 
    const scriptDyn = document.querySelector('#dynamic-script')
    
    // Charger le contenu HTML de la page demandée
    fetch(`/content/${page}`)
        .then(response => response.text())
        .then(html => {
            // Interpréter le HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Effacer le contenu actuel et ajouter le nouveau contenu
            mainContent.textContent = '';
            Array.from(doc.body.childNodes).forEach(node => {
                mainContent.appendChild(node);
            });

            // Mettre à jour la feuille de style CSS
            cssLink.href = `${page}.css`;
            scriptDyn.src = `${page}.js`

            // Réactiver l'animation sur les nouveaux éléments chargés
            animvisible();
        })
        .catch(error => console.error('Erreur lors du chargement:', error));
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

// URL de l'API ou de la ressource à récupérer
const url = 'https://api.example.com/data';







