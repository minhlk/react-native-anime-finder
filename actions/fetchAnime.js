import { ANIME_FETCHING, ANIME_FETCHED, ANIME_FETCHED_ERROR } from "../constants";
import { getAnimesByName } from '../api/api.js';

function startFetching() {
    return {
        type: ANIME_FETCHING,
        payload: []
    }
}

async function fetchAnimeAPI(searchQuery) {
    let animeList = [];
    try {
        animeList = await getAnimesByName(searchQuery);
    } catch (error) {
        return {
            type: ANIME_FETCHED_ERROR,
            payload: []
        }
    }

    return {
        type: ANIME_FETCHED,
        payload: animeList
    }
}

export function fetchAnime(searchQuery) {
    return (dispatch) => {
        dispatch(startFetching());
        fetchAnimeAPI(searchQuery).then(res => dispatch(res))
    }
}
