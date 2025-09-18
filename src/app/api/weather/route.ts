import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { lat, lon, location } = await request.json();

    if (!lat || !lon) {
      return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
    }

    // Using OpenWeatherMap API (free tier)
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    // For demo purposes, we'll use a mock response if no API key
    if (API_KEY === 'demo_key') {
      const mockWeather = {
        weather: {
          temp: Math.round(25 + Math.random() * 10),
          humidity: Math.round(60 + Math.random() * 30),
          rain: Math.round(Math.random() * 20),
          condition: ['Clear', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 4)]
        },
        alert: generateFarmerAlert(Math.round(25 + Math.random() * 10), Math.round(60 + Math.random() * 30), Math.round(Math.random() * 20))
      };
      
      return NextResponse.json(mockWeather);
    }

    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();
    
    const weather = {
      weather: {
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        rain: data.rain?.['1h'] || 0,
        condition: data.weather[0].description
      },
      alert: generateFarmerAlert(Math.round(data.main.temp), data.main.humidity, data.rain?.['1h'] || 0),
      location: data.name || location || 'Unknown Location'
    };

    return NextResponse.json(weather);

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Weather data fetch failed' }, 
      { status: 500 }
    );
  }
}

function generateFarmerAlert(temp: number, humidity: number, rain: number): string {
  const alerts = [];
  
  if (temp > 35) {
    alerts.push('⚠️ High temperature alert! Consider irrigation and shade for crops.');
  } else if (temp < 10) {
    alerts.push('⚠️ Low temperature warning! Protect sensitive crops from frost.');
  }
  
  if (humidity > 80) {
    alerts.push('⚠️ High humidity detected! Watch for fungal diseases.');
  } else if (humidity < 30) {
    alerts.push('⚠️ Low humidity! Increase irrigation frequency.');
  }
  
  if (rain > 15) {
    alerts.push('⚠️ Heavy rain alert! Check drainage and crop protection.');
  } else if (rain > 5) {
    alerts.push('💧 Good rainfall! Reduce irrigation for today.');
  }
  
  if (alerts.length === 0) {
    return '✅ Weather conditions are favorable for farming activities.';
  }
  
  return alerts.join(' ');
}