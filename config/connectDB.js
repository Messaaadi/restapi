const mongoose = require("mongoose")

const connectDB = async () => {

    try {
        await mongoose.set("strictQuery", false).connect(process.env.MONGO_URI)
        console.log("Database connected... and you air is fesfes")
    } catch (error) {
        console.log(`Cannot connect to database: ${error}`)
        
    }
}

module.exports = connectDB;