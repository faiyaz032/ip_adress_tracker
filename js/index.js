'use strict';

//!selectors
const mapContainer = document.querySelector('#map');
const loader = document.querySelector('.loader');

let map;

const getIpAdress = async function (userInput = '') {
   try {
      let req;
      if (!userInput) {
         req = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_cfrCQY3XWlJdiNbSJOIQw7EKObqMh`);
      }
      if (userInput) {
         req = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_cfrCQY3XWlJdiNbSJOIQw7EKObqMh&ipAddress=${userInput}`);
      }
      if (!req.ok) throw new Error('There is a problem with the request');
      const data = await req.json();
      const { lat, lng } = data.location;
      displayMap(lat, lng);
      displayData(data);
   } catch (error) {
      console.error(error);
   }
};

const displayMap = function (lat, lng) {
   loader.style.display = 'none';
   mapContainer.style.display = 'block';

   map = L.map('map').setView([lng, lng], 18);

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
   }).addTo(map);

   L.marker([lat, lng]).addTo(map).bindPopup().openPopup();
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
