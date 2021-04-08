import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

import { dashboardPage } from './views/dashboard.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { craetePage } from './views/create.js';
import { myFurniturePAge } from './views/myFurniture.js';

// import * as api from './api/data.js';
// window.api = api;

const container = document.querySelector('.container');

page('/', decorateConext, dashboardPage);
page('/register', decorateConext, registerPage);
page('/login', decorateConext, loginPage);
page('/details/:id', decorateConext, detailsPage);
page('/edit/:id', decorateConext, editPage);
page('/create', decorateConext, craetePage);
page('/my', decorateConext, myFurniturePAge);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
})

function decorateConext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav();
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    
    if (userId) {
        document.getElementById('user').style.display = 'inline-block'; 
        document.getElementById('guest').style.display = 'none'; 
    } else {
        document.getElementById('user').style.display = 'none'; 
        document.getElementById('guest').style.display = 'inline-block'; 
    }
}