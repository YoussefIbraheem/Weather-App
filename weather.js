//

import axios from "axios";
export function getWeather(lon,lat,timezone) {
   return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`)
.then(({data})=>{
     return { current: ParseWeather.parseCurrentWeather(data),
              daily: ParseWeather.parseDailyWeather(data),
              hourly : ParseWeather.parseHourlyWeather(data)
            }
})
}

 class ParseWeather{
   static parseCurrentWeather({current_weather , daily}){
        const {
               temperature:currentTemp,
               time:currentTime,
               weathercode:iconCode,
               windspeed:windSpeed
              } = current_weather
        const {temperature_2m_max:[maxTemp],
               temperature_2m_min:[minTemp],
               apparent_temperature_max:[maxTempFeel],              apparent_temperature_min:[minTempFeel],
                precipitation_sum:[percip]} = daily
            
               return {
                currentTemp: Math.round(currentTemp),
                iconCode,
                currentTime: Math.round(currentTime),
                windSpeed: Math.round(windSpeed),
                highTemp: Math.round(maxTemp) ,
                lowTemp: Math.round(minTemp) ,
                highTempFeels: Math.round(maxTempFeel) ,
                lowTempFeels: Math.round(minTempFeel),
                percip: Math.round(percip * 100) / 100
               }
} 

static parseDailyWeather({daily}){
    return  daily.time.map((time , index)=>{ return {
        timeStamp : time*1000,
        temps : Math.round(daily.temperature_2m_max[index]),
        feelTemps : Math.round(daily.apparent_temperature_max[index]),
        iconCode : daily.weathercode[index],
    }})

}

static parseHourlyWeather({hourly, current_weather}){
    return hourly.time.map((time , index)=>{return {
            timeStamp : time*1000,
            iconCode : hourly.weathercode[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelTemps : Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            percip : Math.round(hourly.precipitation[index] * 100) / 100
        }
    }).filter(({timeStamp})=> timeStamp >= current_weather.time * 1000 )
}
}




