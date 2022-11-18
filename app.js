const express = require("express");
const app = express();
const port = 3000;
const https = require("node:https");

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b00de0214f05687be0f5ca36e0181506&units=metric";

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      //* below method is used when only one thing is there to send as res.send can only be there one time
      //* and res.write can be there multiple times
      //   res.send(
      //     `<h1>The weather in London is ${weatherDescription} and its ${temp} in temperatures.</h1>`
      //   );
      res.write(`<h1>The weather in London is ${weatherDescription}</h1>`);
      res.write(`<h2>the temperature is ${temp}</h2>`);
      //! double quotes are very important when mentioning src
      res.write(`<img src="${imageURL}"/>`);
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
