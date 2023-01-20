import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32936203-f995b0120a7e97e60c049aedf';
  static per_page = 40;

  constructor() {
    this.page = 1;
    this.q = null;
  }

  fetchPhotosByQ() {
    const { q, page } = this;

    return axios.get(`${PixabayAPI.BASE_URL}`, {
      params: {
        key: PixabayAPI.API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PixabayAPI.per_page,
      },
    });
  }
}
