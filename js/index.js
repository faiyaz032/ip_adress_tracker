'use strict';
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
      const res = await req.json();
   } catch (error) {
      console.error(error);
   }
};
getIpAdress();
