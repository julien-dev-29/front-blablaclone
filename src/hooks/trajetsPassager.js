import { useReducer } from "react";
import { apiFetch } from "../utils/api";
const userId = localStorage.getItem('userId');

function reducer(state, action) {
    console.log('Action: ', action.type, action);

    switch (action.type) {

        case 'FETCHING_TRAJETS_PASSAGER':
            return { ...state, loading: true }

        case 'SET_TRAJETS_PASSAGER':
            return { ...state, trajetsPassager: action.payload, loading: false }

        case 'DELETE_TRAJET_PASSAGER':
            return {
                ...state, trajetsPassager: state.trajetsPassager
                    .filter(trajet => trajet !== action.payload)
            }

        case 'ADD_TRAJET_PASSAGER':
            return { ...state, trajetsPassager: [...state.trajetsPassager, action.payload] }

        case 'UPDATE_TRAJET_PASSAGER':
            return {
                ...state, trajetsPassager: state.trajetsPassager
                    .map(trajet => trajet === action.target ? action.payload : trajet)
            }

        default:
            return state;
    }
}

export function useTrajetsPassager() {
    const [state, dispatch] = useReducer(reducer, {
        trajetsPassager: null,
        loading: false
    })

    return {
        trajetsPassager: state.trajetsPassager,
        fetchTrajetPassager: async () => {
            if (state.loading || state.trajetsPassager) {
                return
            }
            dispatch({
                type: 'FETCHING_TRAJETS_PASSAGER'
            })
            const trajetsPassager = await apiFetch('/listeInscriptionUser/' + userId, {
                method: 'GET'
            })
            dispatch({
                type: 'SET_TRAJETS_PASSAGER',
                payload: trajetsPassager
            })
        },
        deleteTrajetPassager: async (trajet) => {
            await apiFetch('/deleteTrajet/' + trajet.id, {
                method: 'DELETE'
            })
            dispatch({
                type: 'DELETE_TRAJET_PASSAGER',
                payload: trajet
            })
        },
        addTrajetPassager: async (trajet) => {
            await apiFetch('/addTrajet', {
                method: 'POST',
                body: JSON.stringify(trajet)
            })
            dispatch({
                type: 'ADD_TRAJET_PASSAGER',
                payload: trajet
            })
        },
        updateTrajetPassager: async (trajet) => {
            await apiFetch('/updateTrajet/' + trajet.id, {
                method: 'PUT',
                body: JSON.stringify(trajet)
            })
            dispatch({
                type: 'UPDATE_TRAJET_PASSAGER',
                payload: trajet
            })
        }
    }
}