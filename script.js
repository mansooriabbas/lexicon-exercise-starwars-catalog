const characterList = document.querySelector(".left__character-list");
const infoList = document.querySelector(".right__info-list");
const homeWorldList = document.querySelector(".right__info-list-bottom");
const loader = document.querySelector(".loader");
const loaderR = document.querySelector(".loader-r");
loaderR.style.display = "none";
const baseUrl = "https://swapi.dev/api/";

let currentIndex = 0;

async function fetchApi(endpoint) {
  try {
    loader.style.display = "block";
    loaderR.style.display = "block";
    const res = await fetch(baseUrl + endpoint);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(`Error fetching data for ${endpoint}: ${err}`);
  }
}

let character = "";
let characterInfo = "";
let homeWorldInfo = "";

const renderCharacters = async () => {
  loader.style.display = "block";
  const people = await fetchApi("people/");
  people.forEach((person) => {
    character += `<li>${person.name}</li>`;
    console.log(person.homeworld);
  });

  characterList.innerHTML = character;

  if (people.length > 0) {
    const firstCharacterName = people[0].name;
    renderInfo(firstCharacterName);
    renderHomeworld(firstCharacterName);
  }

  // Add event listeners for arrow buttons
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.addEventListener("click", () => navigateCharacters(-1));
  nextButton.addEventListener("click", () => navigateCharacters(1));
};

const renderInfo = async (cName) => {
  try {
    infoList.innerHTML = "";
    const info = await fetchApi(`people/?search=${cName}`);
    info.forEach((el) => {
      const characterInfo = `
      <h4>${el.name}</h4>
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
  } catch (err) {
    console.log(err);
  } finally {
  }
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

    homeWorldInfo = `
    <h4>${homeworldData.name}</h4>
    <li>Rotation period: ${homeworldData.rotation_period} hours</li>
    <li>ORbital period: ${homeworldData.orbital_period} days</li>
    <li>Diameter ${homeworldData.diameter}</li>
    <li>Climate ${homeworldData.climate}</li>
    <li>Gravity: ${homeworldData.gravity}</li>
    <li>Terrain: ${homeworldData.terrain}</li>
    <li>Population ${homeworldData.population}</li>
    `;
    homeWorldList.innerHTML = homeWorldInfo;
  });
};

const navigateCharacters = (step) => {
  const characters = document.querySelectorAll(".left__character-list li");

  if (characters.length > 0) {
    if (currentIndex >= 0 && currentIndex < characters.length) {
      characters[currentIndex].classList.remove("selected-character");
    }

    currentIndex += step;

    if (currentIndex < 0) {
      currentIndex = characters.length - 1;
    } else if (currentIndex >= characters.length) {
      currentIndex = 0;
    }

    characters[currentIndex].classList.add("selected-character");

    const characterName = characters[currentIndex].innerText;
    renderInfo(characterName);
    renderHomeworld(characterName);
  }
};

renderCharacters();
