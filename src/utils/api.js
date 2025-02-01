const baseUrl = 'https://covoit.juroll.eu/api'
const baseUrlLocal = 'http://localhost:8000/api'
const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')

/**
 * Classe erreur api
 */
export class ApiError {
    constructor(errors) {
        this.errors = errors
    }
}

/**
 * 
 * @param {string} endpoint 
 * @param {object} options 
 */
export async function apiFetch(endpoint, options = {}) {
    const response = await fetch(baseUrlLocal + endpoint, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        ...options
    })
    if (response.status > 309 && response.status < 500) {
        throw new ApiError(await response.json())
    }
    const responseData = await response.json()
    console.log('apiFetch: ', JSON.stringify(responseData));
    return responseData
}

export async function register(trajet) {
    const response = await apiFetch('/insertInscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            idPers: userId,
            idTrajet: trajet.id
        })
    })
    if (response.error) {
        throw new ApiError(response.error)
    }
    return response
}