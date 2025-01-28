const activitiesInput = document.querySelector('#activitiesText');
const activitiesForm = document.querySelector('#activitiesForm');
const activitiesList = document.querySelector('#activitiesList');
const restaurantsInput = document.querySelector('#restaurantsText');
const restaurantsForm = document.querySelector('#restaurantsForm');
const restaurantsList = document.querySelector('#restaurantsList');
const placesInput = document.querySelector('#placesText');
const placesForm = document.querySelector('#placesForm');
const placesList = document.querySelector('#placesList');
const budgetSection = document.querySelector('#budget');
const budgetForm = document.querySelector('#budgetForm');
const itemInput = document.querySelector('#item');
const priceInput = document.querySelector('#price');
const budgetList = document.querySelector('#budgetList');


let activities = [];
let restaurants = [];
let places = [];
let budget = [];
let total = 0;

if (localStorage.getItem('activities') != undefined){
    activities = JSON.parse(localStorage.getItem('activities'));
}

if (localStorage.getItem('restaurants') != undefined){
  restaurants = JSON.parse(localStorage.getItem('restaurants'));
}

if (localStorage.getItem('places') != undefined){
  places = JSON.parse(localStorage.getItem('places'));
}

if (localStorage.getItem('budget') != undefined){
  budget = JSON.parse(localStorage.getItem('budget'));
}

if (localStorage.getItem('total') != undefined){
  total = localStorage.getItem('total');
}

renderBudget();
renderActivities();
renderPlaces();
renderRestaurants();

activitiesForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const activitiesText = activitiesInput.value.trim();
    if (activitiesText === '') {
      return;
    }
    activities.push(activitiesText);
    localStorage.setItem('activities', JSON.stringify(activities));
    activitiesInput.value = '';

    renderActivities();
});

function renderActivities() {
    activitiesList.innerHTML = '';
  
    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];
  
      const li = document.createElement('li');
      li.textContent = activity;
      li.setAttribute('data-index', i);

      const button = document.createElement('button');
      button.textContent = 'Remove';

      li.appendChild(button);
      activitiesList.appendChild(li);
    }
}

activitiesList.addEventListener('click', function (event) {
  const element = event.target;
  if (element.matches('button') === true) {
    const index = element.parentElement.getAttribute('data-index');
    localStorage.setItem('activities', JSON.stringify(activities));
    activities.splice(index, 1);
    renderActivities();
  }
});

//Rest

restaurantsForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const restaurantsText = restaurantsInput.value.trim();
  if (restaurantsText === '') {
    return;
  }
  restaurants.push(restaurantsText);
  localStorage.setItem('restaurants', JSON.stringify(restaurants));
  restaurantsInput.value = '';

  renderRestaurants();
});

function renderRestaurants() {
  restaurantsList.innerHTML = '';

  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i];

    const li = document.createElement('li');
    li.textContent = restaurant;
    li.setAttribute('data-index', i);

    const button = document.createElement('button');
    button.textContent = 'Remove';

    li.appendChild(button);
    restaurantsList.appendChild(li);
  }
}

restaurantsList.addEventListener('click', function (event) {
const element = event.target;
if (element.matches('button') === true) {
  const index = element.parentElement.getAttribute('data-index');
  localStorage.setItem('restaurants', JSON.stringify(restaurants));
  restaurants.splice(index, 1);
  renderRestaurants();
}
});

//Places

placesForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const placesText = placesInput.value.trim();
  if (placesText === '') {
    return;
  }
  places.push(placesText);
  localStorage.setItem('places', JSON.stringify(places));
  placesInput.value = '';

  renderPlaces();
});

function renderPlaces() {
  placesList.innerHTML = '';

  for (let i = 0; i < places.length; i++) {
    const place = places[i];

    const li = document.createElement('li');
    li.textContent = place;
    li.setAttribute('data-index', i);

    const button = document.createElement('button');
    button.textContent = 'Remove';

    li.appendChild(button);
    placesList.appendChild(li);
  }
}

placesList.addEventListener('click', function (event) {
const element = event.target;
if (element.matches('button') === true) {
  const index = element.parentElement.getAttribute('data-index');
  localStorage.setItem('places', JSON.stringify(places));
  places.splice(index, 1);
  renderPlaces();
}
});

budgetForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const item = itemInput.value.trim();
  const price = priceInput.value.trim();
  if (price === '' || item === '') {
    return;
  }
  
  budget.push([item, price]);

  total = 0;
  for(i=0; i < budget.length; i++){
    total = Number(total) + Number(budget[i][1]);
    console.log(total)
  }

  localStorage.setItem('budget', JSON.stringify(budget));
  localStorage.setItem('total', JSON.stringify(total));
  itemInput.value = '';
  priceInput.value = '';
  renderBudget();
});

function renderBudget() {
  budgetList.innerHTML = '';

  for (let i = 0; i < budget.length; i++) {
    const item = budget[i][0];
    const price = budget[i][1];

    const li = document.createElement('li');
    li.textContent = `Item: ${item} Price: ${price}`;
    li.setAttribute('data-index', i);
    
    const button = document.createElement('button');
    button.textContent = 'Remove';

    li.appendChild(button);
    budgetList.appendChild(li);
  }

  if (document.querySelector("#Total") == undefined ){
    totalDiv = document.createElement("div");
    totalDiv.setAttribute("id",  "Total");
    totalDiv.innerText = `Total: ${total}`;
    budgetSection.appendChild(totalDiv);
  }else{
    totalDiv = document.querySelector("#Total");
    totalDiv.innerText = `Total: ${total}`;
  }

}
budgetList.addEventListener('click', function (event) {
  const element = event.target;
  if (element.matches('button') === true) {
    const index = element.parentElement.getAttribute('data-index');
    budget.splice(index, 1);
    total = 0;
    for(i=0; i < budget.length; i++){
      total = Number(total) + Number(budget[i][1]);
    }
    localStorage.setItem('budget', JSON.stringify(budget));
    localStorage.setItem('total', JSON.stringify(total));
    renderBudget();
  }
});