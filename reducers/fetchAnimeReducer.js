import { ANIME_FETCHED, ANIME_FETCHING, ANIME_FETCHED_ERROR } from '../constants';

const initState = {
    isFetching: true,
    isError: false
}

const fetchAnimeReducer = (state = initState, action) => {
    switch (action.type) {
        case ANIME_FETCHING: 
            return Object.assign({...state }, {
                isFetching: true,
                isError: false,
                animeList: action.payload
            });
        case ANIME_FETCHED: 
            return Object.assign({...state }, {
                isFetching: false,
                isError: false,
                animeList: action.payload.results
            });
        case ANIME_FETCHED_ERROR: 
            return Object.assign({...state }, {
                isFetching: false,
                isError: true,
                animeList: action.payload
            });
        default:
            return state;
    }
}

export default fetchAnimeReducer;
