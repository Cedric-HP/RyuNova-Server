const express = require('express');
const cors = require("cors")
const app = express();
const router = require("./routes/routes")
const routerImage = require("./routes/routeImage")
const sequelize = require("./db")
const payload = { state: true, name: 'RyuNova Server', version: '1.0.0' }
const PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL
const CORS_RYUNOVA = process.env.CORS_RYUNOVA || "http://localhost:3000"
require("dotenv").config();
const { rateLimit } = require('express-rate-limit');
const { multerErrorHandler } = require('./utilitises/multer/multerErrorHandler');
const { User, Image, Tag, Comment, BlackListToken} = require('./models/index');

async function main() {
  try {
    await sequelize.authenticate();
    await User.sync();
    await Image.sync();
    await Comment.sync();
    await Tag.sync();
    await BlackListToken.sync();
    await sequelize.sync();
    console.log('Base synchronisée.');
  } catch (e) {
    console.error('Erreur d’initialisation :', e);
  }
}

main();

app.use(cors({
  origin: CORS_RYUNOVA,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

const apiLimiterMain = rateLimit({ 
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS), 
    max: parseInt(process.env.RATE_LIMIT_MAX_MAIN), 
    message: "Too many request, try again later." 
});
const apiLimiterImageAPI = rateLimit({ 
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS), 
    max: parseInt(process.env.RATE_LIMIT_MAX_IMAGE_API), 
    message: "Too many request, try again later." 
});
const apiLimiterImageUpload = rateLimit({ 
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS), 
    max: parseInt(process.env.RATE_LIMIT_MAX_IMAGE_UPLOAD), 
    message: "Too many request, try again later." 
});

app.use('/image/upload', apiLimiterImageUpload, routerImage)

app.use('/api', apiLimiterImageAPI, express.static('api'))

app.use(express.json());

app.use('/', apiLimiterMain, router);

app.get("/", (req, res) => {
  res.status(200).json(payload);
});

app.use(multerErrorHandler);

app.use((err, req, res, next) => {
    const error = { state: false , message: "Something Broke!!"};
    console.log(err)
    res.status(500).json({error: error });
});

app.use((req, res)=>{
    const error = { state: false , message: "Page not found" };
    res.status(404).json({error:  error });
})

app.listen(SERVER_URL || PORT, () => console.log({serverState: true, message: `Listening on ${SERVER_URL || `http://localhost:${PORT}`}`}));     
