export type SensorData = {
  id: number;
  name: string;
  location_x: number;
  location_y: number;
  aqius: number | null; // #AQI value based on US EPA standard
  city: string | null;
  main: "p2" | "p1" | "o3" | "n2" | "s2" | "co";
  pressure: number | null;
  temperature: number | null; // Celsius
  timestamp: string | null; // Datetime
  wind_dir: number | null; // wind direction, as an angle of 360° (N=0, E=90, S=180, W=270)
  wind_spd: number | null; // speed m/s
};

/**
  #main pollutant for AQI
    #"p2": "ugm3", //pm2.5
    #"p1": "ugm3", //pm10
    #"o3": "ppb", //Ozone O3
    #"n2": "ppb", //Nitrogen dioxide NO2 
    #"s2": "ppb", //Sulfur dioxide SO2 
    #"co": "ppm" //Carbon monoxide CO  
*/
export const PollutantMap: Record<SensorData["main"], string> = {
  co: "CO",
  n2: "NO2",
  o3: "O3",
  p1: "PM10",
  p2: "PM2.5",
  s2: "SO2",
};
