require("dotenv").config();

const CONFIG = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY
}

export default CONFIG;