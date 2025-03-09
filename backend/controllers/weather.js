import axios from 'axios';


export const get_weather_forecast=async(req,res)=>{
    const city=req.query.city;
    if(!city){
        res.status(400).json({title:"Error!",message:"City name is required"});
    }
    try{
        let response=await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=2&aqi=yes&alerts=yes`);
        if(!response)
            return  res.status(404).json({title:"Error!",message:"Can't get weather by city name"})
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({title:"Error!Can't get weather",message:message.error})

    }
}
