import express from 'express';
const app = express();
import router from "./src/routes/api.js";




import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import {
    PORT, DATABASE, MAX_JSON_SIZE, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE
} from "./src/config/config.js";




// Default Midleware
// app.use(helmet());
// app.use(mongoSanitize());
// app.use(xss());
app.use(hpp());
app.use(cors());
app.use(cookieParser());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded(URL_ENCODE));
app.use("/api", router);




// App Use Limiter

const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER})
app.use(limiter);

app.use("/api/v1", router);

// Database Connection
mongoose.connect(DATABASE, {autoIndex: true}).then( () => {
    console.log("Database connected successfully");    
}).catch((err) => {
    console.log("Database connection error: " + err); 
});

// Cache
app.set("etag", WEB_CACHE);


app.listen(PORT, () => {
    console.log(`BACK-END STARTED`);
    
});