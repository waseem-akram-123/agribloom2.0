import { NextRequest, NextResponse } from 'next/server';

function generateFarmerAlert(temp: number, humidity: number, rain: number): string[] {
  const alerts = [];
  if (temp > 30) alerts.push("High temperature alert: Consider irrigation.");
  if (humidity > 80) alerts.push("High humidity alert: Monitor for diseases.");
  if (rain > 10) alerts.push("Heavy rain alert: Check drainage.");
  return alerts.length > 0 ? alerts : ["Weather conditions are favorable."];
}

export async function POST(request: NextRequest) {
  try {
    const { lat, lon, location } = await request.json();
    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Weather API key is not configured" },
        { status: 500 }
      );
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error("Weather API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Weather API request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const weather = {
      weather: {
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        rain: data.rain?.["1h"] || 0,
        condition: data.weather[0].description
      },
      alert: generateFarmerAlert(
        Math.round(data.main.temp),
        data.main.humidity,
        data.rain?.["1h"] || 0
      ).join(" "),
      location: data.name || location || "Unknown Location"
    };

    return NextResponse.json(weather);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
