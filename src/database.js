import token from './token';

const api = 'http://sssvvvttt-001-site1.itempurl.com/api';
//const api = 'https://localhost:7231/api';

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

//========= Getters ==========================
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

const getAllWatches = async () => {
    let results = {};

    await fetch(`${api}/watches`, {
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

const getWatch = async (id) => {
    let results = {};

    await fetch(`${api}/watches/${id}`, {
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

const getBasket = async () => {
    if(!token.getToken()) {
        return undefined;
    }
    let results = {};
    await fetch(`${api}/baskets`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const getOrders = async (isManagerMode) => {
    if(!token.getToken()) {
        return undefined;
    }

    let url = `${api}/orders`;

    if(isManagerMode) {
        url += '/all'
    }
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const getUsers = async () => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};
    await fetch(`${api}/users`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
}
//============================================

//========= Authorization ====================
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
//============================================


//========= Order handling ===================
const addToBasket = async (watch) => {
    let results = {};
    await fetch(`${api}/baskets`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify({ watchId: watch.id, unitPrice: watch.price, count: 1 })
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

const deleteBasket = async () => {
    let results = {};
    await fetch(`${api}/baskets`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const updateBasket = async (basket) => {
    if(!token.getToken() || !basket || basket.details.length === 0) {
        return undefined;
    }
    let results = {};
    await fetch(`${api}/baskets`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(basket.details),
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

const order = async () => {
    if(!token.getToken()) {
        return undefined;
    }
    let results = {};
    await fetch(`${api}/orders`, {
        method: 'post',
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const closeOrder = async (id) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/orders/${id}`, {
        method: 'put',
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const cancelOrder = async (id) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/orders/${id}`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
}
//============================================

//========= Editing ==========================
const updateUser = async (user) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/users`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(user),
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

const updateCategory = async (category) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/categories`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(category),
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

const updateProducer = async (producer) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/producers`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(producer),
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

const updateWatch = async (watch) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/watches`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(watch),
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

const restoreWatch = async (id) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/watches/restore/${id}`, {
        method: 'put',
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
    .catch(response => {
        results = undefined;
    });

    return results;
}
//============================================

//========= Creating =========================
const createCategory = async (category) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/categories`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(category),
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

const createProducer = async (producer) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/producers`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(producer),
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

const createWatch = async (watch) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/watches`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(watch),
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
//============================================

//========= Deleting ==========================
const deleteUser = async (id) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/users/${id}`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const deleteCategory = async (id) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/categories/${id}`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const deleteProducer = async (id) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/producers/${id}`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
}

const deleteWatch = async (id) => {
    if(!token.getToken()) {
        return undefined;
    }

    let results = {};

    await fetch(`${api}/watches/${id}`, {
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
    .catch(response => {
        results = undefined;
    });

    return results;
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