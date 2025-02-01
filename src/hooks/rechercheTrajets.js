import { useReducer } from "react";
import { ApiError, apiFetch } from "../utils/api";

function reducer(state, action) {
    console.log('Action: ', action.type, action);

    switch (action.type) {

        case 'FETCHING_RECHERCHE_TRAJETS':
            return { ...state, loading: true }

        case 'SET_RECHERCHE_TRAJETS':
            return { ...state, rechercheTrajets: action.payload, loading: false }

        case 'DELETE_RECHERCHE_TRAJET':
            return {
                ...state, rechercheTrajets: state.rechercheTrajets
                    .filter(trajet => trajet !== action.payload)
            }

        case 'ADD_RECHERCHE_TRAJET':
            return { ...state, rechercheTrajets: [...state.rechercheTrajets, action.payload] }

        case 'UPDATE_RECHERCHE_TRAJET':
            return {
                ...state, rechercheTrajets: [...state.rechercheTrajets
                    .map(trajet => trajet === action.target ? action.payload : trajet)]
            }
    }
}

export function useRechercheTrajets() {
    const [state, dispatch] = useReducer(reducer, {
        rechercheTrajets: null,
        loading: false
    })

    return {
        rechercheTrajets: state.rechercheTrajets,
        fetchRechercheTrajets: async (villeD, villeA) => {
            console.log('fetchRechercheTrajets called')
            dispatch({
                type: 'FETCHING_RECHERCHE_TRAJETS'
            })
            const rechercheTrajets = await apiFetch(`/rechercheTrajet/${villeD}/${villeA}`, {
                method: 'GET'
            })
            dispatch({
                type: 'SET_RECHERCHE_TRAJETS',
                payload: rechercheTrajets
            })
        },
        deleteRechercheTrajets: async (trajet) => {
            await apiFetch('/deleteTrajet/' + trajet.id, {
                method: 'DELETE'
            })
            dispatch({
                type: 'DELETE_RECHERCHE_TRAJET',
                payload: trajet
            })
        },
        addRechercheTrajets: async (trajet) => {
            await apiFetch('/insertTrajet')
        }
    }
}