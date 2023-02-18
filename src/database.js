import token from './token';

const api = 'http://sssvvvttt-001-site1.itempurl.com/api';

const perPage = 2;

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

const getWatches = async (page, model, categories, producers, minPrice, maxPrice, isPopular, isOnSale) => {
    let url = getUrl(page, model, categories, producers, minPrice, maxPrice, isPopular, isOnSale);
    let results = {};

    await fetch(url, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token.getToken()}`
                }
            })
            .then(response => response.json())
            .then(response => {
                if(response.token) {
                    token.setToken(response.token);
                }

                results = response;
            })
            .catch(response => {
                results = undefined;
            });

    return results;
}

const getCategories = async () => {
    let results = {};
    await fetch(`${api}/categories`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token.getToken()}`
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }

        results = response;
    })
    .catch(response => {
        results = undefined;
    });

    return results;
}

const getProducers = async () => {
    let results = {};
    await fetch(`${api}/producers`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token.getToken()}`
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }

        results = response;
    })
    .catch(response => {
        results = undefined;
    });

    return results;
}

const signIn = async (login, password) => {
    let results = {};
    await fetch(`${api}/auth`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: login, password: password }),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(response => {
        results = undefined;
    });

    return results;
}

const signUp = async (login, email, password) => {
    let results = {};
    await fetch(`${api}/auth/user`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: login, email: email, password: password }),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(response => {
        results = undefined;
    });

    return results;
}

const functions = {
    getWatches: getWatches,
    getCategories: getCategories,
    getProducers: getProducers,
    signIn: signIn,
    signUp: signUp
};

export default functions;