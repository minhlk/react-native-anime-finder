import { createStore, combineReducers, applyMiddleware } from 'redux';
import fetchAnimeReducer from '../reducers/fetchAnimeReducer';
import fetchDetailsReducer from '../reducers/fetchDetailsReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
        fetchAnime: fetchAnimeReducer,
        fetchDetails: fetchDetailsReducer
    });
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;
