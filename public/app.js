console.log('hello world')

const burger = document.querySelector('#burger')
const nav = document.querySelector('#nav')



burger.addEventListener("click",()=>{
    let el = burger.textContent
    menu(el)
})

function menu(arg){
    if(arg === 'menu_open'){

        burger.textContent="tab_close_right"
        
        nav.style.display="flex"

    }else if(arg === 'tab_close_right'){
        burger.textContent="menu_open"
        
        nav.style.display="none"
    }else{
        console.log('err');
    }
}