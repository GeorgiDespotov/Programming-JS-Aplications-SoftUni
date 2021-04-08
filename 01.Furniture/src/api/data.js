import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export async function register(email, password) {
    const result = await api.post(host + '/users/register', {email, password});

    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);

    return result;
}

export async function login(email, password) {
    const result = await api.post(host + '/users/login', {email, password});

    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);

    return result;
}

export async function logout() {
    const result = await api.get(host + '/users/logout');

    sessionStorage.removeItem('userId', result._id);
    sessionStorage.removeItem('email', result.email);
    sessionStorage.removeItem('authToken', result.accessToken);

    return result;
}

export async function getFurniture() {
    return await api.get(host + '/data/catalog')
}

export async function getFurnitureById(id) {
    return await api.get(host + '/data/catalog/' + id);
}

export async function getMyFurniture() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`)
}

export async function createFurniture(data) {
    return await api.post(host + '/data/catalog', data);
}

export async function updateFurniture(id, data) {
    return await api.put(host + '/data/catalog/' + id, data);
}

export async function deleteFurniture(id) {
    return await api.del(host + '/data/catalog/' + id);
}



