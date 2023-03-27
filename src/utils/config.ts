require("dotenv").config();

const CONFIG = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT
}

export default CONFIG;