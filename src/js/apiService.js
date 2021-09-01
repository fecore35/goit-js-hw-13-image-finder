const API_KEY = '1030453-4271fa747ef92e686e2b519ac';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchCountries() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
