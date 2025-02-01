import { useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer(state, action) {
    console.log('Action: ', action.type, action);

    switch (action.type) {

        case 'FETCHING_TRAJETS':
            return { ...state, loading: true }

        case 'SET_TRAJETS':
            return { ...state, trajets: action.payload, lodaing: false }

        case 'DELETE_TRAJET':
            return {
                ...state, trajets: state.trajets
                    .filter(trajet => trajet !== action.payload)
            }

        case 'ADD_TRAJET':
            return { ...state, trajets: [...state.trajets, action.payload] }

        case 'UPDATE_TRAJET':
            return {
                ...state, trajets: [...state.trajets
                    .map(trajet => trajet === action.target ? action.payload : trajet)]
            }
    }
}

export function useTrajets() {
    const [state, dispatch] = useReducer(reducer, {
        trajets: null,
        loading: false
    })

    return {
        trajets: state.trajets,
        fetchTrajets: async () => {
            if (state.loading || state.trajets) {
                return
            }
            dispatch({
                type: 'FETCHING_TRAJETS'
            })
            const trajets = await apiFetch('/listeTrajet', {
                method: 'GET'
            })
            dispatch({
                type: 'SET_TRAJETS',
                payload: trajets
            })
        },
        deleteTrajet: async (trajet) => {
            await apiFetch('/deleteTrajet/' + trajet.id, {
                method: 'DELETE'
            })
            dispatch({
                type: 'DELETE_TRAJET',
                payload: trajet
            })
        },
        addTrajet: async (trajet) => {
            await apiFetch('/insertTrajet')
        }
    }
}