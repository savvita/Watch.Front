//const api = 'https://localhost:7231/api';
const api = 'http://sssvvvttt-001-site1.itempurl.com/api';
const tokenKey = "token";
const perPage = 2;

let currentCategory;
let currentPage;
let filterName;
let selectedProducers;
let selectedCategories;
let count;

let watch;
let category;
let producer;
let user;

function index() {
    initializeCategories();
    initializeProducers();
    initializeButtons();
    $('#loginForm').hide(0);
    $('#registerForm').hide(0);
    $('#basketForm').hide(0);
    loadWatches(1, null, null, null, true);

    if(sessionStorage.getItem(tokenKey) != null) {
        setAccountMenu(true);
        setHello();
    }
    else {
        setAccountMenu(false);
    }
}

function about() {
    initializeButtons();
    $('#loginForm').hide(0);
    $('#registerForm').hide(0);
    $('#basketForm').hide(0);
    if(sessionStorage.getItem(tokenKey) != null) {
        setAccountMenu(true);
        setHello();
    }
    else {
        setAccountMenu(false);
    }
}

function manager() {
    if(sessionStorage.getItem(tokenKey) != null) {
        setAccountMenu(true);
        setHello();
    }
    else {
        setAccountMenu(false);
    }

    let isManager = hasManagerRole();

    if(isManager) {
        $('#loginForm').hide(0);
        initializeManagerSidebar();
    }

    else {
        showSignIn();
    }
    initializeButtons();
    $('#watchForm').hide();
    $('#categoryForm').hide();
    $('#producerForm').hide();
}

function admin() {
    if(sessionStorage.getItem(tokenKey) != null) {
        setAccountMenu(true);
        setHello();
    }
    else {
        setAccountMenu(false);
    }


    let isAdmin = hasAdminRole();

    if(isAdmin) {
        $('#loginForm').hide(0);
        loadUsersTable();
    }

    else {
        showSignIn();
    }
    initializeButtons();
    $('#userForm').hide();
}

function initializeManagerSidebar() {
    let container = $('#sidebar');

    container.append(`<button type="button" class="btn btn-outline-light rounded-0" onclick="loadCategoriesTable()">Categories</button>`);
    container.append(`<button type="button" class="btn btn-outline-light rounded-0" onclick="loadProducersTable()">Producers</button>`);
    container.append(`<button type="button" class="btn btn-outline-light rounded-0" onclick="loadWatchesTable()">Watches</button>`);
    container.append(`<button type="button" class="btn btn-outline-light rounded-0" onclick="loadOrders(true, true)">Orders</button>`);
}

function hasManagerRole() {
    if(!sessionStorage.getItem(tokenKey)) {
        return false;
    }
    let token = parseJwt(sessionStorage.getItem(tokenKey));
    return Object.values(token)[2].includes('Manager');
}

function hasAdminRole() {
    if(!sessionStorage.getItem(tokenKey)) {
        return false;
    }
    let token = parseJwt(sessionStorage.getItem(tokenKey));
    return Object.values(token)[2].includes('Admin');
}

function setHello() {
    let token = parseJwt(sessionStorage.getItem(tokenKey));
    $('#user').text(`Hello, ${Object.values(token)[0]}`);
}

function clearHello() {
    $('#user').text(``);
}

function loadCategories(callback) {
    $.ajax({
        type: 'GET',
        url: `${api}/categories`,
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            categories = response.value;
            callback();
        }
    });
}

function loadProducers(callback) {
    $.ajax({
        type: 'GET',
        url: `${api}/producers`,
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            producers = response.value;
            callback();
        }
    });
}

function initializeCategories() {
    loadCategories(() => {
        let container = $('#categoriesNav');
        let sideContainer = $('#categoriesSideNav');

        for(category of categories) {
            container.append(`<button type="button" class="btn btn-outline-light rounded-0" data-id="${category.key.id}">${category.key.categoryName}</button>`);

            sideContainer.append(`<div class="form-check bg-dark text-white pointer">
                <input class="form-check-input pointer" type="checkbox" value="category" id="category${category.key.id}" data-id="${category.key.id}">
                <label class="form-check-label text-start pointer" for="category${category.key.id}">${category.key.categoryName}
                </label>
                </div>`);
        }
        $(`input[type="checkbox"][value="category"]`).change(filterCategories);
    });

}

function initializeProducers() {
    loadProducers(() => {
        let sideContainer = $('#producersSideNav');

        for(producer of producers) {
            sideContainer.append(`<div class="form-check bg-dark text-white pointer">
                <input class="form-check-input pointer" type="checkbox" value="producer" id="producer${producer.key.id}" data-id="${producer.key.id}">
                <label class="form-check-label text-start pointer" for="producer${producer.key.id}">${producer.key.producerName}
                </label>
                </div>`);
        }

        $(`input[type="checkbox"][value="producer"]`).change(filterProducers);
    });
}

function initializeButtons() {
    $('#searchBtn').click(function() {
        filterName = $('#searchTxt').val();
        loadWatches(undefined, filterName);
        return false;
    });

    $('#searchBtn').on('input', (function() {
        filterName = $('#searchTxt').val();
        loadWatches(undefined, filterName);
        return false;
    }));

    $('#min-price').blur(() => loadWatches(1, currentCategory, filterName, selectedProducers));

    $('#max-price').blur(() => loadWatches(1, currentCategory, filterName, selectedProducers));

    $('#signInBtn').click(function() {
        signIn();
        return false;
    });

    $('#cancelSignInBtn').click(function() {
        clearForms();
        hideSignIn();
        return false;
    });

    $('#signUpBtn').click(function() {
        signUp();
        return false;
    });

    $('#cancelSignUpBtn').click(function() {
        clearForms();
        hideSignUp();
        return false;
    });

    $('#okWatchBtn').click(function(event) {
        event.stopPropagation();
        event.preventDefault();

        if(validateWatch()) {
            saveWatch();
            $('#watchForm').hide();
        }
        return false;
    });

    $('#cancelWatchBtn').click(function(event) {
        event.stopPropagation();
        $('#watchForm').hide();
        return false;
    });

    $('#okCategoryBtn').click(function(event) {
        event.stopPropagation();
        event.preventDefault();

        category.categoryName = $('#categoryName').val();

        if(validateCategory()) {
            saveCategory();
            hideCategoryForm();
        }
        return false;
    });

    $('#cancelCategoryBtn').click(function(event) {
        event.stopPropagation();
        hideCategoryForm();
        return false;
    });

    $('#okProducerBtn').click(function(event) {
        event.stopPropagation();
        event.preventDefault();

        producer.producerName = $('#producerName').val();

        if(validateProducer()) {
            saveProducer();
            hideProducerForm();
        }
        return false;
    });

    $('#cancelProducerBtn').click(function(event) {
        event.stopPropagation();
        hideProducerForm();
        return false;
    });

    $('#okUserBtn').click(function(event) {
        event.stopPropagation();
        event.preventDefault();

        user.userName = $('#user_login').val();
        user.email = $('#user_email').val();
        user.password = $('#user_password').val();

        if(validateUser()) {
            saveUser();
        }
        return false;
    });

    $('#cancelUserBtn').click(function(event) {
        event.stopPropagation();
        hideUserForm();
        return false;
    });

    $('#closeBasketBtn').click(function(event) {
        event.stopPropagation();
        updateBasket();
        $('#basketForm').hide(500);
        return false;
    });

    $('#clearBasketBtn').click(function(event) {
        event.stopPropagation();
        clearBasket();
        $('#basketForm').hide(500);
        return false;
    });

    $('#okBasketBtn').click(function(event) {
        event.stopPropagation();
        order();
        $('#basketForm').hide(500);
        return false;
    });
}

async function showBasketForm() {
    if(!sessionStorage.getItem(tokenKey)) {
        showSignIn();
        return;
    }

    let container = $('#basketcontainer');
    container.empty();
    $('#okBasketBtn').show();
    $('#clearBasketBtn').show();

    await $.ajax({
        type: 'GET',
        url: `${api}/baskets`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response != null) {
                if(response.token) {
                    setToken(response.token);
                }

                if(response.hits > 0) {
                    addBasketTable(response.value);
                }
                else {
                    container.append(`<p class="text-white m-3">Basket is empty</p>`);
                    $('#okBasketBtn').hide();
                    $('#clearBasketBtn').hide();
                }
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        }
    });

    $('#basketForm').show(500);
}

function addToBasket(event) {
    let id = event.target.closest('div').getAttribute('data-id');
    let price = event.target.closest('div').getAttribute('data-price');

    let basketDetail = {
        "watchId": id,
        "unitPrice": price,
        "count": 1
    };

    $.ajax({
        type: 'POST',
        url: `${api}/baskets`,
        data: JSON.stringify(basketDetail),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },

        success: function(response) {
            if(response.token) {
                setToken(response.token);
            }

            showBasketForm();
        },
        error: function(data) {
            // let error;

            // error = 'Something went wrong. Try again later';

            // $('#watchErrorTxt').text(error);
        }
    });
    
}

async function clearBasket() {
    await $.ajax({
        type: 'DELETE',
        url: `${api}/baskets`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.value != null) {
                if(response.token) {
                    setToken(response.token);
                }
            }
            
            else  {
            }
        },
        error: data => {
        }
    });
}

async function addBasketTable(basket) {
    let container = $('#basketcontainer');
    let sum = 0;

    for(detail of basket.details) {
        sum += detail.count * detail.unitPrice;
        let watch = await getWatch(detail.watchId);

        let img;
        if(watch.imageUrl != null) {
            img = `<img src="${watch.imageUrl}" class="card-img-top small" alt="${watch.model}">`;
        }
        else {
            img = `<img src="images/No_image_available.png" class="card-img-top small" alt="${watch.model}">`;
        }

        container.append(`<div class="row mb-3" data-id=${detail.id}>
        <div class="col-sm-10">
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            ${img}
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title text-dark">${watch.producer.producerName} ${watch.model}</h5>
              <p class="card-text text-dark"">${watch.price} &#8372;</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="col-sm-2">
             <input type="number" value="${detail.count}" min="0" max="${watch.available}"class="form-control">
         </div>
      </div>`);
    }
    container.append(`<h3>Total: ${sum} &#8372;</h3>`)
}

async function updateBasket() {
    let details = [];
    let rows = $('#basketcontainer > div');

    if(rows.length == 0) {
        return;
    }
    
    for(row of rows) {
        details.push({
            "id": row.getAttribute('data-id'),
            "count": row.querySelector('input[type="number"').value
        });
    }

    await $.ajax({
        type: 'PUT',
        url: `${api}/baskets`,
        data: JSON.stringify(details),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response != null) {
                if(response.token) {
                    setToken(response.token);
                }
            }
        },
        error: (data) => {
            console.log(data);
        }
    });
}

async function order() {
    await $.ajax({
        type: 'POST',
        url: `${api}/orders`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response != null) {
                if(response.token) {
                    setToken(response.token);
                }
            }

            if(response.value) {
                alert(`Order id = ${response.value.id}`);
            }
        },
        error: (data) => {
            console.log(data);
        }
    });
}



function filterCategory(e) {
    filterName = undefined;
    $('#searchTxt').val('');

    currentCategory = parseInt(e.target.getAttribute('data-id'));
    $('#breadcrumb_active').text(e.target.textContent);
    loadWatches(1, currentCategory, filterName, selectedProducers);
}

function filterProducers(e) {
    e.stopPropagation();

    $('#searchTxt').val('');

    $('#breadcrumb_active').text(e.target.textContent);

    let inputes = $('input[type="checkbox"][value="producer"]:checked');
    selectedProducers = [];
    for(ch of inputes) {
        let id = ch.getAttribute('data-id');
        selectedProducers.push(id);
    };

    loadWatches(1, currentCategory, filterName, selectedProducers);

    return false;
}

function filterCategories(e) {
    e.stopPropagation();

    $('#searchTxt').val('');

    $('#breadcrumb_active').text(e.target.textContent);

    let inputes = $('input[type="checkbox"][value="category"]:checked');
    selectedCategories = [];
    for(ch of inputes) {
        let id = ch.getAttribute('data-id');
        selectedCategories.push(id);
    };

    loadWatches(1, null, filterName, selectedProducers);

    return false;
}

function loadWatches(page, category, filterName, producers, isPopular) {
    let container = $('#container');
    container.empty();

    let url = `${api}/watches/page/${page}?perPage=${perPage}&onSale=true`;

    if(category) {
        url += `&categoryIds=${category}`;
    }

    if(selectedCategories) {
        for(prod of selectedCategories) {
            url += `&categoryIds=${prod}`;
        }
    }

    if(selectedProducers) {
        for(prod of selectedProducers) {
            url += `&producerIds=${prod}`;
        }
    }

    if(isPopular) {
        url += `&isPopular=${isPopular}`;
    }

    if(filterName) {
        url += `&model=${filterName}`;
    }

    let min = parseFloat($(`#min-price`).val());
    if(min) {
        url += `&minPrice=${min}`;
    }

    let max = parseFloat($(`#max-price`).val());
    if(max) {
        url += `&maxPrice=${max}`;
    }

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            if(response.hits > 0) {
                for(watch of response.value) {
                    container.append(addCard(watch));
                }

                currentPage = page;
                currentCategory = category;
                count = response.hits;
                addPagination(currentPage, Math.ceil(response.hits / perPage));
            }
            
            else  {
                currentPage = undefined;
                count = 0;
                removePagination();
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        }
    });
}

function addCard(item) {
    let img;
    if(item.imageUrl != null) {
        img = `<img src="${item.imageUrl}" class="card-img-top" alt="${item.model}">`;
    }
    else {
        img = `<img src="images/No_image_available.png" class="card-img-top" alt="${item.title}">`;
    }
    return `<div class="card text-white bg-dark m-3 border-light" style="width: 18rem;" data-id="${item.id}" data-price="${item.price}">
                <p class="d-none">${item.id}</p>
                ${img}
                <div class="card-body">
                <h5 class="card-title">${item.model}</h5>
                <p class="card-text">Category: ${item.category.categoryName}</p>
                <p class="card-text">Producer: ${item.producer.producerName}</p>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Price: ${item.price} &#8372;</li>
                <button class="btn btn-success" onclick="addToBasket(event)">Buy</button>
                </ul>
            </div>`;
}

function setToken(token){
    sessionStorage.setItem(tokenKey, token);
}

function getToken(){
    return sessionStorage.getItem(tokenKey);
}

function addPagination(page, count) {
    let container = $('#pagination');
    container.empty();

    container.append(`<li class="page-item">
                            <a id="prevBtn" class="page-link bg-dark text-white" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li id="page-nav-item" class="pagination" onclick="goToPage(event)"></li>
                        <li class="page-item">
                            <a id="nextBtn" class="page-link bg-dark text-white" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                            </li>`);

    let item = $('#page-nav-item');

    for(let i = 0; i < count; i++) {
        item.append(`<li class="page-item${i + 1 === page ? ' active' : ''}"><a class="page-link bg-dark text-white rounded-0" href="#" data-page=${i + 1}>${i + 1}</a></li>`);
    }

    $('#prevBtn').click(function () {
        if(currentPage > 1) {
            loadWatches(currentPage - 1, currentCategory, filterName, producers);
        }
    });

    $('#nextBtn').click(function () {
        if(currentPage < count) {
            loadWatches(currentPage + 1, currentCategory, filterName, producers);
        }
    })
}

function removePagination() {
    let container = $('#pagination');
    container.empty();
}

function goToPage(e) {
    loadWatches(parseInt(e.target.getAttribute('data-page')), currentCategory, filterName, selectedProducers);
}

function signIn() {
    if($('#signin_login').val() == '' || $('#signin_password').val() == '') {
        $('#signInErrorTxt').text('Enter your login and password');
        return;
    }

    let login = {
        "userName": $('#signin_login').val(),
        "password": $('#signin_password').val()
    }

    $.ajax({
        type: "POST",
        url: `${api}/auth`,
        data: JSON.stringify(login),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        success: function(response) {
            if(response.token) {
                setToken(response.token);
            }

            $('#signInErrorTxt').text('');
            
            hideSignIn();
            setAccountMenu(true);
            setHello();
            clearForms();
        },
        error: function(data) {
            let error;

            if(data.responseJSON.code == 'invalid-credentials') {
                error = 'Invalid login and/or password';
            }
            else {
                error = 'Something went wrong. Try again later';
            }
            $('#signInErrorTxt').text(error);
        }
    });
}

function signUp() {
    if($('#signup_login').val() == '' || $('#signup_password').val() == '' || $('#signup_password_confirm').val() == '' || $('#signup_email').val() == '') {
        $('#signUpErrorTxt').text('All fields are required');
        return;
    }

     if($('#signup_password').val() != $('#signup_password_confirm').val()) {
        $('#signUpErrorTxt').text('Passwords do not match');
        return;
    }

    let reg = {
        "userName": $('#signup_login').val(),
        "password": $('#signup_password').val(),
        "email": $('#signup_email').val()
    }


    $.ajax({
        type: "POST",
        url: `${api}/auth/user`,
        data: JSON.stringify(reg),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        success: function(response) {
            if(response.token) {
                setToken(response.token);
            }
            $('#signUpErrorTxt').text('');
            hideSignUp();
            setAccountMenu(true);    
            setHello(); 
            clearForms();  
        },
        error: function(data) {
            let error;

            if(data.status == 409) {
                error = 'This login is already registered';
            }
            else {
                error = 'Something went wrong. Try again later';
            }
            $('#signUpErrorTxt').text(error);
        }
    });
}

function logOut() {
    sessionStorage.removeItem(tokenKey);
    setAccountMenu(false);

    clearForms();
    clearHello();
    
    $(location).attr('href', 'index.html');
}

function clearForms() {
    $('#signin_login').val('');
    $('#signin_password').val('');
    $('#signInErrorTxt').text('');

    $('#signup_login').val('');
    $('#signup_email').val('');
    $('#signup_password').val('');
    $('#signup_password_confirm').val('');
    $('#signUpErrorTxt').text('');
}

function setAccountMenu(isLogged) {
    let nav = $('#accountNav');
    nav.empty();
    if(isLogged) {
        nav.append(`<li><a class="dropdown-item" href="#" onclick="loadOrders()">My orders</a></li>`);

        if(hasManagerRole()) {
            nav.append(`<li><a class="dropdown-item" href="manager.html">Manager mode</a></li>`);
        }

        if(hasAdminRole()) {
            nav.append(`<li><a class="dropdown-item" href="admin.html">Admin mode</a></li>`);
        }
        // nav.append(`<li><a class="dropdown-item" href="account.html">My profile</a></li>`);
        nav.append(`<li><a class="dropdown-item" href="#" onclick="logOut()">Log out</a></li>`);
    }
    else {
        nav.append(`<li><a class="dropdown-item" href="#" onclick="showSignIn()">Log in</a></li>`);
        nav.append(`<li><a class="dropdown-item" href="#" onclick="showSignUp()">Register</a></li>`);
    }
}

function showSignIn() {
    $('#signInErrorTxt').text('');
    $('#email').val('');
    $('#loginForm').show(500);
}

function hideSignIn() {
    clearForms();
    $('#loginForm').hide(500);
}

function showSignUp() {
    $('#signUpErrorTxt').text('');
    $('#registerEmail').val('');
    $('#registerForm').show(500);
}

function hideSignUp() {
    clearForms();
    $('#registerForm').hide(500);
}



function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function loadCategoriesTable() {
    let container = $('#container');
    container.empty();

    let url = `${api}/categories`;

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            if(response != null) {
                addCategoriesTable(response.value);
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}

function loadProducersTable() {
    let container = $('#container');
    container.empty();

    let url = `${api}/producers`;

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            if(response != null) {
                addProducersTable(response.value);
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}

function loadOrders(isManager = false, isAll = false) {
    let container = $('#container');
    container.empty();

    removePagination();

    let url = `${api}/orders`;

    if(isAll) {
        url += '/all'
    }

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            if(response != null) {
                addOrdersTable(response.value, isManager);
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}

function loadWatchesTable() {
    let container = $('#container');
    container.empty();

    let url = `${api}/watches`;

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            
            if(response.token) {
                setToken(response.token);
            }

            if(response != null) {
                addWatchTable(response.value);
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            console.log(data);
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}

function loadUsersTable() {
    let container = $('#container');
    container.empty();

    let url = `${api}/users`;

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            if(response != null && response.value.length > 0) {
                addUsersTable(response.value);
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}

function addWatchTable(watches) {
    let container = $('#container');
    container.empty();
    container.append('<h3 class="text-white">Watches</h3><img src="images/add_icon.png" alt="Add" class="pointer icon" title="Add" onclick="showWatchForm()">')
    container.append(`<table class="table bg-dark text-white">
                        <thead>
                        <tr>
                            <th scope="col"><input id="selectAll" class="form-check-input" type="checkbox" value="" onclick="selectAll()"></th>
                            <th scope="col">Image</th>
                            <th scope="col">Producer</th>
                            <th scope="col">Model</th>
                            <th scope="col">Category</th>
                            <th scope="col">Available</th>
                            <th scope="col">Sold</th>
                            <th scope="col">On sale</th>
                            <th scope="col">Price</th>
                            <th scope="col">Popular</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody id="rowcontainer">
                        
                        </tbody>
                    </table>`);

    let rowcontainer = $(`#rowcontainer`);               
    for(item of watches) {
        rowcontainer.append(addWatchRow(item));
    }
}

function addUsersTable(users) {
    let container = $('#container');
    container.empty();
    container.append('<h3 class="text-white">Users</h3><img src="images/add_icon.png" alt="Add" class="pointer icon" title="Add" onclick="showUserForm()">')
    container.append(`<table class="table bg-dark text-white">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Login</th>
                            <th scope="col">Email</th>
                            <th scope="col">Manager</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody id="rowcontainer">
                        
                        </tbody>
                    </table>`);

    let rowcontainer = $(`#rowcontainer`);               
    for(item of users) {
        rowcontainer.append(addUserRow(item));
    }
}

function addOrdersTable(orders, isManager) {
    let container = $('#container');
    container.empty();
    container.append('<h3 class="text-white">Orders</h3>')
    container.append(`<table class="table bg-dark text-white">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">UserId</th>
                            <th scope="col">Status</th>
                            <th scope="col">Details</th>
                            <th scope="col">Total</th>
                            ${isManager ? '<th scope="col">Close</th>' : '<td></td>'}
                            <th scope="col">Cancel</th>
                        </tr>
                        </thead>
                        <tbody id="rowcontainer">
                        
                        </tbody>
                    </table>`);

    let rowcontainer = $(`#rowcontainer`);               
    for(item of orders) {
        addOrderRow(rowcontainer, item, isManager);
    }
}

function addOrderRow(container, order, isManager) {
    let price = 0;
    order.details.forEach(x => price += x.count * x.unitPrice);
    container.append(`<tr data-id="${order.id}">
    <th scope="row">${order.id}</th>
    <td>${order.date}</td>
    <td>${order.userId}</td>
    <td>${order.status.statusName}</td>
    <td id=${order.id}></td>
    <td>${price} &#8372;</td>
    ${isManager && (order.status.id == 1 || order.status.id == 2) ? '<td><button class="btn btn-outline-light" onclick="closeOrder(event)">Close</button></td>' : '<td></td>'}
    ${order.status.id == 1 || order.status.id == 2 ? '<td><button class="btn btn-outline-light" onclick="cancelOrder(event)">Cancel</button></td>' : '<td></td>'}
</tr>`);

    order.details.forEach(x => $(`#${order.id}`).append(`<p>Watch Id: ${x.watchId}</p>`));
}

async function cancelOrder(event) {
    orderId = event.target.closest('tr').getAttribute('data-id');
    event.stopPropagation();

    let order;

    await $.ajax({
        type: 'GET',
        url: `${api}/orders/${orderId}`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.value != null) {
                if(response.token) {
                    setToken(response.token);
                }

                order = response.value;
            }
            
            else  {
            }
        },
        error: data => {
        }
    });

    if(!order) {
        return;
    }
    order.status.id = 4;
    $.ajax({
        type: 'PUT',
        url: `${api}/orders`,
        data: JSON.stringify(order),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },


        success: response => {
            if(response.value != null) {
                if(response.token) {
                    setToken(response.token);
                }

                loadOrders(hasManagerRole());
            }
            
            else  {
            }
        },
        error: data => {
        }
    });
}

async function closeOrder(event) {
    orderId = event.target.closest('tr').getAttribute('data-id');
    event.stopPropagation();

   
    $.ajax({
        type: 'DELETE',
        url: `${api}/orders/${orderId}`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },


        success: response => {
            if(response.value != null) {
                if(response.token) {
                    setToken(response.token);
                }

                let isManager = hasManagerRole();

                loadOrders(isManager, isManager);
            }
            
            else  {
            }
        },
        error: data => {
        }
    });
}

function addCategoriesTable(categories) {
    let container = $('#container');
    container.empty();
    container.append('<h3 class="text-white">Categories</h3><img src="images/add_icon.png" alt="Add" class="pointer icon" title="Add" onclick="showCategoryForm()">')

    container.append(`<table class="table text-white">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Category name</th>
        <th scope="col">Count</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody id="rowcontainer">
    </tbody>    
  </table>`)

  let rowcontainer = $(`#rowcontainer`); 
    for(item of categories) {
        rowcontainer.append(addCategoryRow(item));
      }
}

function addProducersTable(producers) {
    let container = $('#container');
    container.empty();
    container.append('<h3 class="text-white">Producers</h3><img src="images/add_icon.png" alt="Add" class="pointer icon" title="Add" onclick="showProducerForm()">')

    container.append(`<table class="table text-white">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Producer name</th>
        <th scope="col">Count</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody id="rowcontainer">
    </tbody>    
  </table>`)

  let rowcontainer = $(`#rowcontainer`); 
    for(item of producers) {
        rowcontainer.append(addProducerRow(item));
      }
}

function addCategoryRow(category) {
    return `<tr data-id="${category.key.id}" data-name="${category.key.categoryName}">
    <th scope="row">${category.key.id}</th>
    <td>${category.key.categoryName}</td>
    <td>${category.value}</td>
    <td><img class="icon" src="/images/edit_icon.svg" title="Edit" onclick="showCategoryForm(event)"></td>
    <td><img class="icon" src="/images/delete_icon.svg" title="Delete" onclick="deleteCategory(event)"></td>
</tr>`
}

function addProducerRow(producer) {
    return `<tr data-id="${producer.key.id}" data-name="${producer.key.producerName}">
    <th scope="row">${producer.key.id}</th>
    <td>${producer.key.producerName}</td>
    <td>${producer.value}</td>
    <td><img class="icon" src="/images/edit_icon.svg" title="Edit" onclick="showProducerForm(event)"></td>
    <td><img class="icon" src="/images/delete_icon.svg" title="Delete" onclick="deleteProducer(event)"></td>
</tr>`
}

function deleteCategory(event) {
    categoryid = event.target.closest('tr').getAttribute('data-id');
    event.stopPropagation();

    $.ajax({
        type: 'DELETE',
        url: `${api}/categories/${categoryid}`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.value != null) {
                if(response.token) {
                    setToken(response.token);
                }

                if(response.value == true) {
                    loadCategoriesTable();
                }
                else {
                    $('#error').text('Ooops');
                }
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
                $('#error').text('You need to authorize first');
                $('#logout').hide();
                $('#links').show();
            }
        }
    });
}


function deleteProducer(event) {
    producerid = event.target.closest('tr').getAttribute('data-id');
    event.stopPropagation();

    $.ajax({
        type: 'DELETE',
        url: `${api}/producers/${producerid}`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.value != null) {
                if(response.token) {
                    setToken(response.token);
                }

                if(response.value == true) {
                    loadProducersTable();
                }
                else {
                    $('#producerErrorTxt').text('Ooops');
                }
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
                $('#producerErrorTxt').text('You need to authorize first');
                $('#logout').hide();
                $('#links').show();
            }
        }
    });
}

function deleteUser(event) {
    userid = event.target.closest('tr').getAttribute('data-id');
    event.stopPropagation();

    $.ajax({
        type: 'DELETE',
        url: `${api}/users/${userid}`,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.value != null) {
                if(response.token) {
                    setToken(response.token);
                }

                if(response.value == true) {
                    loadUsersTable();
                }
                else {
                    $('#userErrorTxt').text('Ooops');
                }
            }
            
            else  {
                container.append(`<p class="text-white m-3">Not found. Sorry :(</p>`);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
                $('#userErrorTxt').text('You need to authorize first');
                $('#logout').hide();
                $('#userErrorTxt').show();
            }
        }
    });
}


function addWatchRow(watch){
    let img = `<img class="small" src="images/No_image_available.png" alt="No photo available">`;

    if(watch.imageUrl) {
        img = `<img class="small" src="${watch.imageUrl}" alt="No photo available">`
    }

    return `<tr data-id="${watch.id}">
      <th scope="row"><input class="form-check-input" type="checkbox" value="row"></th>
      <td>${img}</td>
      <td>${watch.producer.producerName}</td>
      <td>${watch.model}</td>
      <td>${watch.category.categoryName}</td>
      <td>${watch.available}</td>
      <td>${watch.sold}</td>
      <td>${watch.onSale}</td>
      <td>${watch.price} &#8372;</td>
      <td><input class="form-check-input" type="checkbox" value="ispopular" ${watch.isPopular == true ? 'checked' : ''} onclick="switchPopular(event)"></td>
      <td><img class="icon" src="images/edit_icon.svg" alt="Edit" onclick="showWatchForm(event)">
      <img class="icon" src="images/delete_icon.svg" alt="Delete" onclick="deleteWatches(event)">
      <img class="icon" src="images/restore_icon.svg" alt="Restore" onclick="restoreWatches(event)"></td>
    </tr>`
}

function addUserRow(user){
    return `<tr data-id="${user.id}" data-username="${user.userName}" data-email="${user.email}">
      <th scope="row">${user.id}</th>
      <td>${user.userName}</td>
      <td>${user.email}</td>
      <td><input class="form-check-input" type="checkbox" value="manager" ${user.isManager == true ? 'checked' : ''} onclick="switchRole(event)"></td>
      <td><input class="form-check-input" type="checkbox" value="admin" ${user.isAdmin == true ? 'checked' : ''} onclick="switchRole(event)"></td>
      <td><img class="icon" src="images/edit_icon.svg" alt="Edit" onclick="showUserForm(event)"></td>
      <td><img class="icon" src="images/delete_icon.svg" alt="Delete" onclick="deleteUser(event)"></td>
    </tr>`
}

function showCategoryForm(event) {
    if(event) {
        event.stopPropagation();
        $('#categoryName').val(event.target.closest('tr').getAttribute('data-name'));

        category = {
            id: event.target.closest('tr').getAttribute('data-id'),
            categoryName: event.target.closest('tr').getAttribute('data-name')
        }
    }
    else {
        $('#categoryName').val('');
        category = {
            categoryName: ''
        };
    }

    $('#categoryForm').show(500);
}

function showUserForm(event) {
    if(event) {
        $('#pass').hide();
        $('#pass_conf').hide();
        event.stopPropagation();
        $('#user_login').val(event.target.closest('tr').getAttribute('data-username'));
        $('#user_email').val(event.target.closest('tr').getAttribute('data-email'));

        user = {
            id: event.target.closest('tr').getAttribute('data-id'),
            userName: event.target.closest('tr').getAttribute('data-username'),
            email: event.target.closest('tr').getAttribute('data-email'),
            isManager: event.target.closest('tr').querySelector('input[value="manager"]').checked,
            isAdmin: event.target.closest('tr').querySelector('input[value="admin"]').checked,
        }
    }
    else {
        $('#pass').show();
        $('#pass_conf').show();
        $('#user_login').val('');
        $('#user_email').val('');
        user = {
            userName: '',
            email: ''
        };
    }

    $('#userForm').show(500);
}

function showProducerForm(event) {
    if(event) {
        event.stopPropagation();
        $('#producerName').val(event.target.closest('tr').getAttribute('data-name'));

        producer = {
            id: event.target.closest('tr').getAttribute('data-id'),
            producerName: event.target.closest('tr').getAttribute('data-name')
        }
    }
    else {
        $('#producerName').val('');
        producer = {
            producerName: ''
        };
    }

    $('#producerForm').show(500);
}

function validateCategory() {
    $('#categoryErrorTxt').text('');

    if(!category || category.categoryName == '') {
        $('#categoryErrorTxt').text('Category name is required');
        return false;
    }

    return true;
}

function validateUser() {
    $('#userErrorTxt').text('');

    if(!user || user.userName == '') {
        $('#userErrorTxt').text('Username is required');
        return false;
    }

    if(user.email == '') {
        $('#userErrorTxt').text('Email is required');
        return false;
    }

    if(!user.id && $('#user_password').val() == '') {
        $('#userErrorTxt').text('Password is required');
        return false;
    }

    if($('#user_password').val() != $('#user_password_confirm').val()) {
        $('#userErrorTxt').text('Passwords do not match');
        return false;
    }

    return true;
}

function validateProducer() {
    $('#producerErrorTxt').text('');

    if(!producer || producer.producerName == '') {
        $('#producerErrorTxt').text('Producer name is required');
        return false;
    }

    return true;
}

function hideCategoryForm() {
    $('#categoryName').val('');
    $('#categoryForm').hide(500);

    category = undefined;
}

function hideUserForm() {
    $('#user_login').val('');
    $('#user_email').val('');
    $('#userForm').hide(500);

    user = undefined;
}

function hideProducerForm() {
    $('#producerName').val('');
    $('#producerForm').hide(500);

    producer = undefined;
}

async function showWatchForm(event) {
    await initilazeDropDownCategories($('#watchCategory'));
    await initilazeDropDownProducers($('#watchProducer'));
    
    if(event) {
        event.stopPropagation();
        let id = event.target.closest('tr').getAttribute('data-id');

        let url = `${api}/watches/${id}`;

        $.ajax({
            type: 'GET',
            url: url,
            headers: {
            'Authorization': "Bearer " + getToken()
            },

            success: response => {
                if(response.token) {
                    setToken(response.token);
                }

                watch = response.value;

                $('#watchId').val(response.value.id);
                $(`#watchProducer`).val(response.value.producer.id);
                $('#watchModel').val(response.value.model);
                $(`#watchCategory`).val(response.value.category.id);
                $('#watchAvailable').val(response.value.available);
                $('#watchPrice').val(response.value.price);
                $('#watchImage').val(response.value.imageUrl);
                $('#watchForm').show();
            },
            error: data => {
                
                if(data.status == 401) {
                    container.empty();
                }
            }
        });
    }
    else {
        $('#watchForm').show();
    }
}

function saveWatch() {
    let method = 'POST';
    if(watch) {
        watch.model = $('#watchModel').val();
        watch.price = $('#watchPrice').val();
        watch.available = $('#watchAvailable').val();
        watch.imageUrl = $('#watchImage').val();
        watch.category.id = $(`#watchCategory`).val();
        watch.producer.id = $(`#watchProducer`).val();
        method = 'PUT';
    }
    else {
        watch = {
            model : $('#watchModel').val(),
            price : $('#watchPrice').val(),
            available : $('#watchAvailable').val(),
            imageUrl : $('#watchImage').val(),
            category : {
                id : $(`#watchCategory`).val()
            },
            producer : {
                id : $(`#watchProducer`).val()
            },
            onSale : false,
            isPopular : false,
            sold: 0
        }
    }

    $.ajax({
        type: method,
        url: `${api}/watches`,
        data: JSON.stringify(watch),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },

        success: function(response) {
            if(response.token) {
                setToken(response.token);
            }

            hideWatchForm();

            loadWatchesTable();
        },
        error: function(data) {
            let error;

            error = 'Something went wrong. Try again later';

            $('#watchErrorTxt').text(error);
        }
    });
}

function saveCategory() {
    let method = 'POST';
    if(category.id) {
        method = 'PUT';
    }

    $.ajax({
        type: method,
        url: `${api}/categories`,
        data: JSON.stringify(category),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },

        success: function(response) {
            if(response.token) {
                setToken(response.token);
            }

            hideCategoryForm();

            loadCategoriesTable();
        },
        error: function(data) {
            let error;

            error = 'Something went wrong. Try again later';

            $('#categoryErrorTxt').text(error);
        }
    });
}

function saveUser() {
    let method = 'POST';
    let url = `${api}/auth/user`

    if(user.id) {
        method = 'PUT';
        url = `${api}/users`;
    }

    $.ajax({
        type: method,
        url: url,
        data: JSON.stringify(user),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },

        success: function(response) {

            hideUserForm();

            loadUsersTable();
        },
        error: function(data) {
            let error = 'Something went wrong. Try again later';

            if(data.status == 409) {
                error = "Username is already registered";
            }

            $('#userErrorTxt').text(error);
        }
    });
}

function switchRole(event) {
    let u = {
        id: event.target.closest('tr').getAttribute('data-id'),
        userName: event.target.closest('tr').getAttribute('data-username'),
        email: event.target.closest('tr').getAttribute('data-email'),
        isManager: event.target.closest('tr').querySelector('input[value="manager"]').checked,
        isAdmin: event.target.closest('tr').querySelector('input[value="admin"]').checked
    }

    $.ajax({
        type: 'PUT',
        url: `${api}/users`,
        data: JSON.stringify(u),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },

        success: function(response) {

            hideUserForm();

            loadUsersTable();
        },
        error: function(data) {
            let error;

            error = 'Something went wrong. Try again later';

            $('#categoryErrorTxt').text(error);
        }
    });
}


function saveProducer() {
    let method = 'POST';
    if(producer.id) {
        method = 'PUT';
    }

    $.ajax({
        type: method,
        url: `${api}/producers`,
        data: JSON.stringify(producer),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken()
        },

        success: function(response) {
            if(response.token) {
                setToken(response.token);
            }

            hideProducerForm();

            loadProducersTable();
        },
        error: function(data) {
            let error;

            error = 'Something went wrong. Try again later';

            $('#producerErrorTxt').text(error);
        }
    });
}

function hideWatchForm() {
    $('#watchId').val('');
    $(`#watchProducer`).val(0);
    $('#watchModel').val('');
    $(`#watchCategory`).val(0);
    $('#watchAvailable').val('');
    $('#watchPrice').val('');
    $('#watchImage').val('');
    $('#watchErrorTxt').text('');
    $('#watchForm').hide(500);

    watch = undefined;
}

function initilazeDropDownCategories(container) {
    container.empty();
    return $.ajax({
        type: 'GET',
        url: `${api}/categories`,
        headers: {
            'Authorization': "Bearer " + getToken()
          },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            container.append(`<option selected value="0">Choose...</option>`);
            for(category of response.value) {
                container.append(`<option value="${category.key.id}">${category.key.categoryName}</option>`);
            }
        }
    });
}


function initilazeDropDownProducers(container) {
    container.empty();
    return $.ajax({
        type: 'GET',
        url: `${api}/producers`,
        headers: {
            'Authorization': "Bearer " + getToken()
          },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            container.append(`<option selected value="0">Choose...</option>`);
            for(producer of response.value) {
                container.append(`<option value="${producer.key.id}">${producer.key.producerName}</option>`);
            }
        }
    });
}


function validateWatch() {
    $('#watchErrorTxt').empty();

    if($(`#watchCategory`).val() == 0) {
        $('#watchErrorTxt').text('Category is required');
        return false;
    }

    if($(`#watchProducer`).val() == 0) {
        $('#watchErrorTxt').text('Producer is required');
        return false;
    }

    let price = parseFloat($('#watchPrice').val());
    if(!price || price < 0) {
        $('#watchErrorTxt').text('Price is incorrect');
        return false;
    }

    let available = parseFloat($('#watchAvailable').val());
    if(!available || available < 0) {
        $('#watchErrorTxt').text('Available is incorrect');
        return false;
    }

    if($('#watchModel').val() == '') {
        $('#watchErrorTxt').text('Model is required');
        return false;
    }

    return true;
}

async function switchPopular(event) {
    let id = event.target.closest('tr').getAttribute('data-id');

    let watch = await getWatch(id);
    watch.isPopular = event.target.checked;

    let url = `${api}/watches`;

    await $.ajax({
        type: 'PUT',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken(),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data:  JSON.stringify(watch),

        success: response => {
            if(response.token) {
                setToken(response.token);
            }

            loadWatchesTable();
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}

async function getWatch(id) {
    let url = `${api}/watches/${id}`;
    let watch;

    await $.ajax({
        type: 'GET',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }
            watch = response.value;
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });

    return watch;
}

function getSelectedRows() {
    return $('input[type="checkbox"][value="row"]:checked:not(#selectAll)');
}

function selectAll() {
    let value = $('#selectAll').prop('checked');
    $('input[type="checkbox"][value="row"]').prop("checked", value);
}

async function deleteWatches(event) {
    let inputes = getSelectedRows();
    for(ch of inputes) {
        let id = ch.closest('tr').getAttribute('data-id');
        await deleteWatch(id);
    };

    if(inputes.length == 0) {
        let id = event.target.closest('tr').getAttribute('data-id');
        await deleteWatch(id);
    }

    loadWatchesTable();
}

async function restoreWatches(event) {
    let inputes = getSelectedRows();
    for(ch of inputes) {
        let id = ch.closest('tr').getAttribute('data-id');
        await restoreWatch(id);
    };

    if(inputes.length == 0) {
        let id = event.target.closest('tr').getAttribute('data-id');
        await restoreWatch(id);
    }

    loadWatchesTable();
}

async function deleteWatch(id) {
    let url = `${api}/watches/${id}`;

    await $.ajax({
        type: 'DELETE',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}

async function restoreWatch(id) {
    let url = `${api}/watches/restore/${id}`;

    await $.ajax({
        type: 'PUT',
        url: url,
        headers: {
          'Authorization': "Bearer " + getToken()
        },

        success: response => {
            if(response.token) {
                setToken(response.token);
            }
        },
        error: data => {
            if(data.status == 401) {
                container.empty();
            }
        }
    });
}
