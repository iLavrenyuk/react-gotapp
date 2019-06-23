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
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
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

    _transformCharacter(char) {
        function correct(item) {
            if (item === '') {
                item = 'unknown'; // unknown
            }
            return item;
        };

        return {
            name: char.name,
            gender: correct(char.gender),
            born: correct(char.born),
            died: correct(char.died),
            culture: correct(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}
