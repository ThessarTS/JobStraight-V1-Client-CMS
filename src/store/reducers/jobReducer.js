import { SUCCESS_FETCH_JOBS } from "../actionType/jobActionType";

let initialState = {
    jobs: []
}

export default function jobReducer(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_FETCH_JOBS:
            return {
                ...state,
                jobs: action.payload
            }
        default:
            return state

    }
}