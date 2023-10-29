import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import jobReducer from './reducers/jobReducer'
import companyReducer from './reducers/companyReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    job: jobReducer,
    company: companyReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store