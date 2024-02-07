const characterList = document.querySelector(".left__character-list");
const infoList = document.querySelector(".right__info-list");
const homeWorldList = document.querySelector(".right__info-list-bottom");

const baseUrl = "https://swapi.dev/api/";

const fetchApi = async (endpoint) => {
  try {
    const res = await fetch(baseUrl + endpoint);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(`Error fetching data for ${endpoint}: ${err}`);
  }
};

let character = "";
let characterInfo = "";


const renderCharacters = async () => {
  const people = await fetchApi("people/");
  people.forEach((person) => {
    character += `<li>${person.name}</li>`;
    console.log(person.homeworld);
  });

  characterList.innerHTML = character;
};

renderCharacters();

const renderInfo = async (cName) => {
  // Clear previous content
  infoList.innerHTML = "";

  const info = await fetchApi(`people/?search=${cName}`);
  info.forEach((el) => {
    const characterInfo = `
      <li>Height: ${el.height}</li>
      <li>Mass: ${el.mass}</li>
      <li>Hair Color: ${el.hair_color}</li>
      <li>Skin Color: ${el.skin_color}</li>
      <li>Eye Color: ${el.eye_color}</li>
      <li>Birth Year: ${el.birth_year}</li>
      <li>Species: ${el.species}</li>
      <li>Gender: ${el.gender}</li>
    `;

    infoList.innerHTML += characterInfo;
  });
};

characterList.addEventListener("click", (e) => {
  if (characterList.contains(e.target) && e.target.tagName === "LI") {
    const characterName = e.target.innerText;
    renderInfo(characterName);
    renderHomeworld(characterName);
  }
});

const renderHomeworld = async (cName) => {
  const people = await fetchApi(`people/?search=${cName}`);

  people.forEach(async (person) => {
    console.log(person.homeworld, "Hey Boss");
    const response = await fetch(person.homeworld);
    const homeworldData = await response.json();
    console.log(homeworldData);
    
  });
};
renderHomeworld();
