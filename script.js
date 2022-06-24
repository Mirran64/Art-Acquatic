const swup = new Swup();


let active = false;
let burger = document.getElementById("burger")
let menu = document.getElementById("navigationBar")


function activeBurger()
{
    if(active)
    {
        burger.className = "navbar-burger"
        menu.className = "navbar-menu"
        active = false
    }
    else
    {
        burger.className = "navbar-burger is-active"
        menu.className = "navbar-menu is-active"
        active = true
    }

}

burger.onclick = activeBurger