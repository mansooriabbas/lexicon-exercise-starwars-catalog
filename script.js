const characterList = document.querySelector(".left__character-list");
const infoList = document.querySelector(".right__info-list");

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

const renderCharacters = async () => {
  const people = await fetchApi("people/");
  people.forEach((person) => {
    character += `<li>${person.name}</li>`;
    console.log(person);
  });

  characterList.innerHTML = character;
};

renderCharacters();

const renderInfo = async (cName) => {
const info = await(fetchApi(`people/?search=${cName}`))
info.forEach((el) => {
  console.log(`Character: ${el.name}, Gender: ${el.gender}`);
})
};

characterList.addEventListener("click", (e) => {
  if (characterList.contains(e.target) && e.target.tagName === "LI") {
    const characterName = e.target.textContent;
    renderInfo(characterName);
  }
});