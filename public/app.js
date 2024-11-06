console.log('hello world')

const burger = document.querySelector('#burger')
const nav = document.querySelector('#nav')
const a = document.querySelectorAll('.menu')



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
        console.log(images); // Vous pouvez l'utiliser dans votre fonction carrousel
        // Exemple : afficher chaque image dans un élément img
        const carouselContainer = document.getElementById('carousel');
        // images.forEach(imagePath => {
        //     const imgElement = document.createElement('img');
        //     imgElement.src = imagePath;
        //     carouselContainer.appendChild(imgElement);
        // });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

