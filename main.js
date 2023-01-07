import * as weather from './weather.js' 
import { ICON_MAP } from './iconMap.js'





class Render{
  static renderWeather({current , daily , hourly}){
    Render.renderCurrentWeather(current)
    Render.renderDailyWeather(daily)
    Render.renderHourlyWeather(hourly)
    document.querySelector('body').classList.remove('blurred')
  }
  static renderCurrentWeather(current){
   document.querySelector("[data-current-icon]").src = Helpers.getIconUrl(current.iconCode) 
   Helpers.setValue("current-temp",current.currentTemp)
   Helpers.setValue("current-high",current.highTemp)
   Helpers.setValue("current-fl-high",current.highTempFeels)
   Helpers.setValue("current-low",current.lowTemp)
   Helpers.setValue("current-fl-low",current.lowTempFeels)
   Helpers.setValue("current-wind",current.windSpeed)
   Helpers.setValue("current-percip",current.percip)
  }
  static renderDailyWeather(daily){
    const dailySelection = document.querySelector("[data-day-section]")
    const DAY_FORMATTER = new Intl.DateTimeFormat(undefined,{weekday:"long"})
    const dayCardTemplate = document.getElementById("day-card-template");
    dailySelection.innerHTML = ""
    daily.forEach(day=>{
      const element = dayCardTemplate.content.cloneNode(true)
      Helpers.setValue("temp",day.temps,{parent : element})
      Helpers.setValue("date", DAY_FORMATTER.format(day.timeStamp),{parent : element})
      element.querySelector("[data-icon]").src = Helpers.getIconUrl(day.iconCode)
      dailySelection.append(element)
    })

  }

  static renderHourlyWeather(hourly){
    const HourlySelection = document.querySelector("[data-hour-section]")
    const DAY_FORMATTER = new Intl.DateTimeFormat(undefined,{weekday:"long"})
    const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined,{hour:"numeric"})
    const HourCardTemplate = document.getElementById("hour-row-template");
    HourlySelection.innerHTML = ""
    hourly.forEach(hour=>{
      const element = HourCardTemplate.content.cloneNode(true)
      Helpers.setValue("temp",hour.temp,{parent : element})
      Helpers.setValue("fl-temp",hour.feelTemps,{parent : element})
      Helpers.setValue("wind",hour.windSpeed,{parent : element})
      Helpers.setValue("percip",hour.percip,{parent : element})
      Helpers.setValue("day", DAY_FORMATTER.format(hour.timeStamp),{parent : element})
      Helpers.setValue("time",  HOUR_FORMATTER.format(hour.timeStamp),{parent : element})
      element.querySelector("[data-icon]").src = Helpers.getIconUrl(hour.iconCode)

        
      element.querySelector("[data-icon]").src = Helpers.getIconUrl(hour.iconCode)
      HourlySelection.append(element)
    })
  }

}
 


class Helpers{
 static setValue(selector , value , {parent = document}={}){
  parent.querySelector(`[data-${selector}]`).textContent = value
 }

 static getIconUrl(iconCode){
  return `./public/icons/${ICON_MAP.get(iconCode)}.svg`
 }

}


navigator.geolocation.getCurrentPosition(positionSuccess,positionFailure)

function positionSuccess({coords}){
  weather.getWeather( coords.latitude , coords.longitude ,Intl.DateTimeFormat().resolvedOptions().timeZone).then(Render.renderWeather).catch(error =>{
    console.error(error)
  })
}

function positionFailure() {
  alert("Couldn't find your Location")
}