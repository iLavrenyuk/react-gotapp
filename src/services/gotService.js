export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllBooks = async () => {
        const res = await this.getResource(`/books?page=1&pageSize=15`);
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse)
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    _transformCharacter(char) {
        function correct(item) {
            if (item === '') {
                item = 'unknown :('; // unknown
            }
            return item;
        };

        return {
            name: correct(char.name),
            gender: correct(char.gender),
            born: correct(char.born),
            died: correct(char.died),
            culture: correct(char.culture),
            id: char.url.match(/\d+/g)
        }
    }

    _transformHouse(house) {
        console.log(house);
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
            id: house.url.match(/\d+/g)
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            id: book.url.match(/\d+/g)
        }
    }
}
