import Jikan from './jikan/jikan-node.js';
const mal = new Jikan();

export const getMovies = async (ep_id) => {
  return mal.findAnime(ep_id, 'videos');
}

export const getAnimesByName = async (searchQuery) => {
  return mal.search('anime', searchQuery, { page: 1 });
}
