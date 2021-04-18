'use strict';

//!selectors
const mapContainer = document.querySelector('#map');
const loader = document.querySelector('.loader');

const searchButton = document.querySelector('.search--btn');

let map;

const getIpAdress = async function (userInput = ``) {
   try {
      let req;
      const regex = /https:|www|.com/gi;
      const result = userInput.search(regex);
      if (userInput && result >= 0) {
         req = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_cfrCQY3XWlJdiNbSJOIQw7EKObqMh&domain=${userInput}`);
      }
      if (userInput && result < 0) {
         req = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_cfrCQY3XWlJdiNbSJOIQw7EKObqMh&ipAddress=${userInput}`);
      }
      if (!userInput) {
         req = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_cfrCQY3XWlJdiNbSJOIQw7EKObqMh`);
      }
      if (!req.ok) throw new Error('There is a problem with the request');
      const data = await req.json();
      const { lat, lng } = data.location;
      if (!userInput) {
         displayMap(lat, lng);
      } else {
         createMarker(lat, lng);
         map.setView([lat, lng], 13, {
            animate: true,
            pan: {
               duration: 1,
            },
         });
      }

      displayData(data);
   } catch (error) {
      console.error(error);
   }
};

const displayMap = function (lat, lng) {
   loader.style.display = 'none';
   mapContainer.style.display = 'block';

   map = L.map('map').setView([lat, lng], 14);

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
   }).addTo(map);

   createMarker(lat, lng);
};

const createMarker = function (lat, lng) {
   L.marker([lat, lng]).addTo(map);
};
const removeInfoLoader = function () {
   document.querySelectorAll('.info--loader').forEach((el) => (el.style.display = 'none'));
   document.querySelectorAll('.user--info').forEach((el) => (el.style.display = 'block'));
};

const displayData = function (data) {
   const { city, country, timezone } = data.location;
   const location = `${city}, ${country}`;
   const ip = data.ip;
   const isp = data.isp;

   const infoArr = [ip, location, timezone, isp];

   document.querySelectorAll('.info').forEach((el, i) => {
      removeInfoLoader();
      el.innerText = infoArr[i];
   });
};

getIpAdress();
searchButton.addEventListener('click', function (e) {
   e.preventDefault();
   const inputValue = document.querySelector('.input--ip-address').value;
   getIpAdress(inputValue);
});
