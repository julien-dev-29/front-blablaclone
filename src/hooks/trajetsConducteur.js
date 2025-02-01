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

        case "SET_MESSAGE":
            return { ...state, message: action.payload }

        case "SET_ERROR":
            return { ...state, error: action.payload }

        default:
            return state;
    }
}

export function useTrajetsConducteur() {
    const [state, dispatch] = useReducer(reducer, {
        trajetsConducteur: null,
        loading: false,
        message: null,
        error: null
    })

    return {
        trajetsConducteur: state.trajetsConducteur,
        message: state.message,
        error: state.error,
        fetchTrajetConducteur: async () => {
            if (state.loading || state.trajetsConducteur) {
                return
            }
            dispatch({
                type: 'FETCHING_TRAJETS_CONDUCTEUR'
            })
            try {
                const trajetsConducteur = await apiFetch('/listeInscriptionConducteur/' + userId, {
                    method: 'GET'
                })
                dispatch({
                    type: 'SET_TRAJETS_CONDUCTEUR',
                    payload: trajetsConducteur
                })
            } catch (error) {
                dispatch({
                    type: 'SET_ERROR',
                    payload: error.errors.error
                })
                dispatch({
                    type: 'SET_TRAJETS_CONDUCTEUR',
                    payload: null
                })
            }

        },
        deleteTrajetConducteur: async (trajet) => {
            const response = await apiFetch('/deleteTrajet/' + trajet.id, {
                method: 'DELETE'
            })
            dispatch({
                type: 'DELETE_TRAJET_CONDUCTEUR',
                payload: trajet
            })
            dispatch({
                type: 'SET_MESSAGE',
                payload: response.message
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
            dispatch({
                type: 'SET_MESSAGE',
                payload: response.message
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
            dispatch({
                type: 'SET_MESSAGE',
                payload: response.message
            })
        }
    }
}