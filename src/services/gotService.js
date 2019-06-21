export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters() {
        return this.getResource(`/characters?page=5&pageSize=10`);
    }
    getCharacter(id) {
        return this.getResource(`/characters/${id}`);
    }
    getAllBooks() {
        return this.getResource(`/books?page=1&pageSize=15`);
    }
    getBook(id) {
        return this.getResource(`/books/${id}`);
    }
    getAllHouses() {
        return this.getResource(`/houses?page=1&pageSize=10`);
    }
    getHouses(id) {
        return this.getResource(`/houses/${id}`);
    }
}

const got = new GotService();
got.getAllBooks()
    .then(res => console.log(res));

got.getBook(3)
    .then(res => console.log(res));

got.getAllHouses()
    .then(res => console.log(res));

got.getHouses(130)
    .then(res => console.log(res));