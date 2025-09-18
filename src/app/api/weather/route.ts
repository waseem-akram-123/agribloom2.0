import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  if (!location) {
    return new Response(JSON.stringify({ error: "Location is required" }), {
      status: 400,
    });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY; // stored in .env.local
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const weatherData = {
      location: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainfall: data.rain ? data.rain["1h"] || data.rain["3h"] : 0,
      windSpeed: data.wind.speed,
      condition: data.weather[0].description,
    };

    return new Response(JSON.stringify(weatherData), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to fetch weather data" }),
      { status: 500 }
    );
  }
}
