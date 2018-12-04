const api = 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};


export const login = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const signup = (payload) =>
    fetch(`${api}/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getUserFromCode = (payload) =>
    fetch(`${api}/code/` + payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const verifyUser = (payload) =>
    fetch(`${api}/verifyuser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    })
        .then(res => {
            return successHandler(res);
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getAllActiveUsers = () =>
    fetch(`${api}/users`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getTopUsersBasedOnTime = (payload) =>
    fetch(`${api}/users/` + payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getActiveUsersByMonth = (month) =>
    fetch(`${api}/users/active/` + month, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getActiveUserPlayBackByMonth = (month) =>
    fetch(`${api}/users/playback/` + month, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getUsersBySubscriptionType = (type, month) =>
    fetch(`${api}/users/` + type + "/" + month, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getMonthlySubscriptionIncome = (payload) =>
    fetch(`${api}/income/subscribed/` + payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getMonthlyPayPerViewIncome = (payload) =>
    fetch(`${api}/income/ppv/` + payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getUserById = (payload) =>
    fetch(`${api}/user/` + payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getLimitedMovies = (noOfRecords) =>
    fetch(`${api}/getMovies`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ count: noOfRecords })
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const addSubscription = (payload) =>
    fetch(`${api}/payment`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getAllMovies = () =>
    fetch(`${api}/movie?size=1`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getOneMovie = (id) =>
    fetch(`${api}/movies/${id}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const addNewMovie = (payload) =>
    fetch(`${api}/movie`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const updateMovie = (payload) =>
    fetch(`${api}/movie`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const deleteMovie = (payload) =>
    fetch(`${api}/movie/:id`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        // body: JSON.stringify(payload)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const addNewActor = (payload) =>
    fetch(`${api}/actors`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getActors = () =>
    fetch(`${api}/actors`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getNewPage = (page) =>
    fetch(`${api}/movie?page=${page}&size=1`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getFilterOptions = () =>
    fetch(`${api}/movie/filters`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

export const getFilterMovies = (page, uri) =>
    fetch(`${api}/movie/filters/execute?page=${page}&size=1&${uri}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    }).then(res => {
        return successHandler(res);
    }).catch(error => {
        return error;
    });

let successHandler = (res) => {
    if (res.status === 401) {
        // UserHelper.redirectToLogin();
    } else {
        return res.json();
    }
}
