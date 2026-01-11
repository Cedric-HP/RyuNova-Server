const express = require('express');
const cors = require("cors")
const app = express();
const router = require("./routes/routes")
const routerImage = require("./routes/routeImage")
const sequelize = require("./db")
const payload = { name: 'RyuNova Server', version: '1.0.0' }
const PORT = process.env.PORT || 3000;
require("dotenv").config();
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
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

const { rateLimit } = require('express-rate-limit');
const { multerErrorHandler } = require('./utilitises/multer/multerErrorHandler');

const apiLimiter = rateLimit({ 
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS), 
    max: parseInt(process.env.RATE_LIMIT_MAX), 
    message: "Too many request, try again later." 
});

app.use('/image/upload', apiLimiter, routerImage)

app.use('/api', express.static('api'))

app.use(express.json());

app.use('/', apiLimiter, router);

app.get("/", (req, res) => {
  res.status(200).json(payload);
});

// app.use(multerErrorHandler);

app.use((err, req, res, next) => {
    const error = { code: 500 , message: "Something Broke!!"};
    console.log(err)
    res.status(500).json({error: error });
});

app.use((req, res)=>{
    const error = { code: 404 , message: "Page not found" };
    res.status(404).json({error:  error });
})

app.listen(PORT, () => console.log({serverState: true, message: `Listening on http://localhost:${PORT}`}));     
