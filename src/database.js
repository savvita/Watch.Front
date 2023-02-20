import token from './token';

const api = 'http://sssvvvttt-001-site1.itempurl.com/api';
//const api = 'https://localhost:7231/api';

const perPage = 2;

const get = async (url) => {
    let results = {};
    await fetch(url, {
        method: 'get',
        headers: {
            'Authorization': "Bearer " + token.getToken()
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const post = async (url, body) => {
    let results = {};
    await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const put = async (url, body) => {
    let results = {};
    await fetch(url, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const remove = async (url) => {
    let results = {};
    await fetch(url, {
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + token.getToken()
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const getUrl = (page, model, categories, producers, minPrice, maxPrice, isPopular, isOnSale) => {
    let url = `${api}/watches/page/${page}?perPage=${perPage}`;

    if(categories) {
        for(let category of categories) {
            url += `&categoryIds=${category.id}`;
        }
    }

    if(producers) {
        for(let producer of producers) {
            url += `&producerIds=${producer.id}`;
        }
    }

    if(isPopular) {
        url += `&isPopular=${isPopular}`;
    }

    if(isOnSale) {
        url += `&onSale=${isOnSale}`;
    }

    if(model) {
        url += `&model=${model}`;
    }

    if(minPrice) {
        url += `&minPrice=${minPrice}`;
    }

    if(maxPrice) {
        url += `&maxPrice=${maxPrice}`;
    }

    return url;
}

//========= Getters ==========================
const getWatches = async (page, model, categories, producers, minPrice, maxPrice, isPopular, isOnSale) => {
    let url = getUrl(page, model, categories, producers, minPrice, maxPrice, isPopular, isOnSale);

    return await get(url);
}

const getAllWatches = async () => {
    return await get(`${api}/watches`);
}

const getWatch = async (id) => {
    return await get(`${api}/watches/${id}`);
}

const getCategories = async () => {
    return await get(`${api}/categories`);
}

const getProducers = async () => {
    return await get(`${api}/producers`);
}

const getBasket = async () => {
    return await get(`${api}/baskets`);
}

const getOrders = async (isManagerMode) => {
    if(!token.getToken()) {
        return undefined;
    }

    let url = `${api}/orders`;

    if(isManagerMode) {
        url += '/all'
    }

    return await get(url);
}

const getUsers = async () => {
    if(!token.getToken()) {
        return undefined;
    }

    return await get(`${api}/users`);
}
//============================================

//========= Authorization ====================
const signIn = async (login, password) => {
    return await post(`${api}/auth`, { userName: login, password: password });
}

const signUp = async (login, email, password) => {
    return await post(`${api}/auth/user`, { userName: login, email: email, password: password });
}
//============================================


//========= Order handling ===================
const addToBasket = async (watch) => {
    return await post(`${api}/baskets`, { watchId: watch.id, unitPrice: watch.price, count: 1 });
}

const deleteBasket = async () => {
    return await remove(`${api}/baskets`);
}

const updateBasket = async (basket) => {
    if(!token.getToken() || !basket || basket.details.length === 0) {
        return undefined;
    }

    return await put(`${api}/baskets`, basket.details);
}

const order = async () => {
    return await post(`${api}/orders`);
}

const closeOrder = async (id) => {
    return await put(`${api}/orders/${id}`, {});
}

const cancelOrder = async (id) => {
    return await remove(`${api}/orders/${id}`);
}
//============================================

//========= Editing ==========================
const updateUser = async (user) => {
    return await put(`${api}/users`, user);
}

const updateCategory = async (category) => {
    return await put(`${api}/categories`, category);
}

const updateProducer = async (producer) => {
    return await put(`${api}/producers`, producer);
}

const updateWatch = async (watch) => {
    return await put(`${api}/watches`, watch);
}

const restoreWatch = async (id) => {
    return await put(`${api}/watches/restore/${id}`, {});
}
//============================================

//========= Creating =========================
const createCategory = async (category) => {
    return await post(`${api}/categories`, category);
}

const createProducer = async (producer) => {
    return await post(`${api}/producers`, producer);
}

const createWatch = async (watch) => {
    return await post(`${api}/watches`, watch);
}
//============================================

//========= Deleting ==========================
const deleteUser = async (id) => {
    return await remove(`${api}/users/${id}`);
}

const deleteCategory = async (id) => {
    return await remove(`${api}/categories/${id}`);
}

const deleteProducer = async (id) => {
    return await remove(`${api}/producers/${id}`);
}

const deleteWatch = async (id) => {
    return await remove(`${api}/watches/${id}`);
}
//============================================

const functions = {
    getWatches: getWatches,
    getAllWatches: getAllWatches,
    getWatch: getWatch,
    getCategories: getCategories,
    getProducers: getProducers,
    getOrders: getOrders,
    getUsers: getUsers,
    signIn: signIn,
    signUp: signUp,
    addToBasket: addToBasket,
    getBasket: getBasket,
    deleteBasket: deleteBasket,
    updateBasket: updateBasket,
    order: order,
    closeOrder: closeOrder,
    cancelOrder: cancelOrder,
    updateUser: updateUser,
    deleteUser: deleteUser,
    deleteCategory: deleteCategory,
    deleteProducer: deleteProducer,
    deleteWatch: deleteWatch,
    updateWatch: updateWatch,
    restoreWatch: restoreWatch,
    updateCategory: updateCategory,
    updateProducer: updateProducer,
    createWatch: createWatch,
    createCategory: createCategory,
    createProducer: createProducer
};

export default functions;