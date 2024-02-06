const characterList = document.querySelector(".left__character-list");
const infoList = document.querySelector(".right__info-list");

const baseUrl = "https://swapi.dev/api/";


const fetchApi = async (endpoint) => {
    try {
        const res = await fetch(baseUrl + endpoint);
        const data = await res.json();
        return data.results
    } catch (err) {
        console.error(`Error fetching data for ${endpoint}: ${err}`);
    }
};
 

const renderCharacters = async () => {
    const people = await fetchApi("people/");
    let html = ""
    people.forEach((person) => {
        html += `<li>${person.name}</li>`
    })
    console.log(html);
    characterList.innerHTML = html
};

renderCharacters()