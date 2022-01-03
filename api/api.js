import Jikan from './jikan/jikan-node.js';
const mal = new Jikan();

const getMovies = async (ep_id, onSuccess, onError) => {
  try {
    const response = await mal.findAnime(ep_id, 'videos');
    onSuccess(response)
  } catch (error) {
    onError(error)
  }
}

const getAnimesByName = async (searchQuery, onSuccess, onError) => {
  try {
    const response = await mal.search('anime', searchQuery, { page: 1 });
    onSuccess(response)
  } catch (error) {
    onError(error);
  }
}

module.exports = {
  getMovies,
  getAnimesByName,
}