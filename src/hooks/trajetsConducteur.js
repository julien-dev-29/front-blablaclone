import { useReducer } from "react";
import { apiFetch } from "../utils/api";
const userId = localStorage.getItem('userId');

function reducer(state, action) {
    console.log('Action: ', action.type, action);

    switch (action.type) {

        case 'FETCHING_TRAJETS_CONDUCTEUR':
            return { ...state, loading: true }

        case 'SET_TRAJETS_CONDUCTEUR':
            return { ...state, trajetsConducteur: action.payload, loading: false }

        case 'DELETE_TRAJET_CONDUCTEUR':
            return {
                ...state, trajetsConducteur: state.trajetsConducteur
                    .filter(trajet => trajet !== action.payload)
            }

        case 'ADD_TRAJET_CONDUCTEUR':
            return { ...state, trajetsConducteur: [...state.trajetsConducteur, action.payload] }

        case 'UPDATE_TRAJET_CONDUCTEUR':
            return {
                ...state, trajetsConducteur: state.trajetsConducteur
                    .map(trajet => trajet === action.target ? action.payload : trajet)
            }

        default:
            return state;
    }
}

export function useTrajetsConducteur() {
    const [state, dispatch] = useReducer(reducer, {
        trajetsConducteur: null,
        loading: false
    })

    return {
        trajetsConducteur: state.trajetsConducteur,
        fetchTrajetConducteur: async () => {
            if (state.loading || state.trajetsConducteur) {
                return
            }
            dispatch({
                type: 'FETCHING_TRAJETS_CONDUCTEUR'
            })
            const trajetsConducteur = await apiFetch('/listeInscriptionConducteur/' + userId, {
                method: 'GET'
            })
            dispatch({
                type: 'SET_TRAJETS_CONDUCTEUR',
                payload: trajetsConducteur
            })
        },
        deleteTrajetConducteur: async (trajet) => {
            await apiFetch('/deleteTrajet/' + trajet.id, {
                method: 'DELETE'
            })
            dispatch({
                type: 'DELETE_TRAJET_CONDUCTEUR',
                payload: trajet
            })
        },
        addTrajetConducteur: async (trajet) => {
            await apiFetch('/insertTrajet', {
                method: 'POST',
                body: JSON.stringify(trajet)
            })
            dispatch({
                type: 'ADD_TRAJET_CONDUCTEUR',
                payload: trajet
            })
        },
        updateTrajetConducteur: async (trajet) => {
            await apiFetch('/updateTrajet/' + trajet.id, {
                method: 'PUT',
                body: JSON.stringify(trajet)
            })
            dispatch({
                type: 'UPDATE_TRAJET_CONDUCTEUR',
                payload: trajet
            })
        }
    }
}