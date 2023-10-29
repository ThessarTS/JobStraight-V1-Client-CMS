import { SUCCESS_FETCH_COMPANIES } from "../actionType/companyActionType"


let initialState = {
    companies: []
}

export default function companyReducer(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_FETCH_COMPANIES:
            return {
                ...state,
                companies: action.payload
            }
        default:
            return state

    }
}