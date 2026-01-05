const express = require('express');
const app = express();
const router = require("./routes/routes")
const sequelize = require("./db")
const payload = { name: 'RyuNova Server', version: '1.0.0' }
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const { User, Image, Tag, Comment} = require('./models/index');
async function main() {
  try {
    await sequelize.authenticate();
    await User.sync();
    await Image.sync();
    await Comment.sync();
    await Tag.sync();
    await sequelize.sync();
    console.log('Base synchronisée.');
  } catch (e) {
    console.error('Erreur d’initialisation :', e);
  }
}

main();

app.use(express.json());

const { rateLimit } = require('express-rate-limit');

const apiLimiter = rateLimit({ 
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS), 
    max: parseInt(process.env.RATE_LIMIT_MAX), 
    message: "Too many request, try again later." 
});

app.use('/', apiLimiter, router);

app.get("/", (req, res) => {
  res.status(200).json(payload);
});

app.use((err, req, res, next) => {
    const error = { code: 500 , message: "Something Broke!!" };
    res.status(500).json({error: error });
});

app.use((req, res)=>{
    const error = { code: 404 , message: "Page not found" };
    res.status(404).json({error:  error });
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));     
