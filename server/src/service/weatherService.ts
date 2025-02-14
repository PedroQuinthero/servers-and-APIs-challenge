import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  humidity: number;
  description: string;

  constructor(temperature: number, humidity: number, description: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.description = description;
  }

  displayWeather(): string {
    return `Temperature: ${this.temperature}°C, Humidity: ${this.humidity}%, Condition: ${this.description}`;
  }
}

// TODO: Complete the WeatherService class // TODO: Define the baseURL, API key, and city name properties
class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = "https://api.openweathermap.org/data/2.5";
    this.apiKey = process.env.OPENWEATHER_API_KEY || "dff37fb1960f48d480b8223ab5d449fd"; 
  }
  

  // TODO: Create fetchLocationData method
  private async fetchLocationData(): Promise<Coordinates> {
    return this.fetchLocationDataByQuery(this.city);
  }
  // private async fetchLocationData(query: string) {}
  private async fetchLocationDataByQuery(query: string): Promise<Coordinates> {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
      );

      if (response.data.length === 0) {
        throw new Error(`Location "${query}" not found.`);
      }

      return this.destructureLocationData(response.data[0]);
    } catch (error) {
      console.error("Error fetching location data:", error);
      throw error;
    }
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    try {
      const locationData = await this.fetchLocationData();
      return this.destructureLocationData(locationData);
    } catch (error) {
      console.error("Error fetching and destructuring location data:", error);
      throw error;
    }
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
