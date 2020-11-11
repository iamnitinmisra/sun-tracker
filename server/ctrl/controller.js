require("dotenv").config();
const axios = require("axios");
const { ZIP_API_KEY } = process.env;

module.exports = {
  getTimesForToday: async (req, res) => {
    const { zip } = req.query;

    // If 451 error, take a look at zip api key details
    const response = await axios.get(
      `https://www.zipcodeapi.com/rest/${ZIP_API_KEY}/info.json/${zip}/degrees`
    );

    let { lat: latitude } = response.data;
    let { lng: longitude } = response.data;
    let timezone = response.data.timezone.timezone_abbr;

    // Times in UTC
    const times = await axios.get(
      `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
    );

    // Convert to Standard Time
    let sunrise = String(new Date(times.data.results.sunrise));
    sunrise = sunrise.split(' ')[4]
    let sunset = String (new Date(times.data.results.sunset));
    // sunset = sunset.split(' ')[4]
    sunsetHour = sunset.split(' ')[4].split(':')[0]
    console.log(sunsetHour - 12)
    sunsetMinutes = sunset.split(' ')[4].split(':')[1]
    sunsetSeconds = sunset.split(' ')[4].split(':')[2]
    sunset = `${sunsetHour - 12}:${sunsetMinutes}:${sunsetSeconds}`
      
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    let date = `${yyyy}-${mm}-${dd}`;

    // Put details together
    details = {
      date: date,
      sunrise: sunrise,
      sunset: sunset,
      timezone: timezone,
    };

    res.status(200).send(details);
  },
  getTimesByDate: async (req, res) => {}
};
