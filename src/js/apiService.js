const BASE_URL = 'https://pixabay.com/api/';

const fetchCountries = function (searchQuery = '') {
  return fetch(`${BASE_URL}/${searchQuery}`).then(response => response.json());
};

export default { fetchCountries };
