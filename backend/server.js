//This is an Express.js server that handles weather-related API requests.
import express from 'express';
import cors from'cors';
import dotenv from'dotenv';

import weatherRoutes from'./routes/weather.js';

dotenv.config(); 
const app = express();


app.use(cors());


app.use('/api', weatherRoutes);

let port=process.env.PORT

app.listen(port, () => {
    console.log('Server running on port '+port);
});
