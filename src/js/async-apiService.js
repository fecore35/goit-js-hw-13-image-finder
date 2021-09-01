const API_KEY = '1030453-4271fa747ef92e686e2b519ac';
const BASE_URL = 'https://pixabay.com/api/';

export default class AsyncImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchCountries() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    const response = await fetch(url);
    const newImages = await response.json();
    this.nextPage();

    return newImages.hits;
  }

  resetPage() {
    this.page = 1;
  }

  nextPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
