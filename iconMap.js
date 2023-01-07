export const ICON_MAP = new Map()

function appMappingValue(values , icon){
    values.forEach(value => {
        ICON_MAP.set(value , icon) 
    });
    
}

appMappingValue([0,1],"sun")
appMappingValue([95,96,99],"cloud-bolt")
appMappingValue([2],"cloud-sun")
appMappingValue([51, 53, 55,61, 63, 65,80, 81, 82],"cloud-showers-heavy")
appMappingValue([3],"cloud")
appMappingValue([45,48],"smog")
appMappingValue([56, 57,66, 67,71, 73, 75,77,85, 86],"snowflake")
