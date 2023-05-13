import axios from 'axios';

const MAIN_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b7007467ba5a2c7fffe68666af66429f';

export async function getTrending(page = 1) {
  const url = `${MAIN_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}


export async function searchMovieName(movieName) {
  const apiKey = '2e9f8fc9479fa19131d9c8fc8ea7c110';
  const apiUrl = 'https://api.themoviedb.org/3';


  const url = `${MAIN_URL}/search/movie?api_key=${API_KEY}&query=${movieName}&language=en-US&page=1`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
