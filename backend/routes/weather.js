//This page associates the actions for server routing.
import {Router} from "express" ;

import {get_weather_forecast} from "../controllers/weather.js" ;

const router=Router();
router.get('/weather',get_weather_forecast);


export default router;