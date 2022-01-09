import { DETAILS_FETCHING, DETAILS_FETCHED, DETAILS_FETCHED_ERROR } from "../constants";
import { getMovies } from '../api/api.js';

function startFetching() {
    return {
        type: DETAILS_FETCHING,
        payload: []
    }
}

async function fetchDetailsAPI(id) {
    let details = [];
    try {
        details = await getMovies(id);
    } catch (error) {
        return {
            type: DETAILS_FETCHED_ERROR,
            payload: []
        }
    }

    return {
        type: DETAILS_FETCHED,
        payload: details
    }
}

export function fetchDetails(id) {
    return (dispatch) => {
        dispatch(startFetching());
        fetchDetailsAPI(id).then(res => dispatch(res))
    }
}
