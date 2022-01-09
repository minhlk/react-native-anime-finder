import { DETAILS_FETCHED, DETAILS_FETCHING, DETAILS_FETCHED_ERROR } from '../constants';

const initState = {
    isFetching: true,
    isError: false
}

const fetchDetailsReducer = (state = initState, action) => {
    switch (action.type) {
        case DETAILS_FETCHING: 
            return Object.assign({...state }, {
                isFetching: true,
                isError: false,
                detailsList: action.payload
            });
        case DETAILS_FETCHED: 
            return Object.assign({...state }, {
                isFetching: false,
                isError: false,
                detailsList: action.payload.episodes
            });
        case DETAILS_FETCHED_ERROR: 
            return Object.assign({...state }, {
                isFetching: false,
                isError: true,
                detailsList: action.payload
            });
        default:
            return state;
    }
}

export default fetchDetailsReducer;
