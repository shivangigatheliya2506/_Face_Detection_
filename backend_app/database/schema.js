const mongoose = require("mongoose")

exports.connect = () => {

    mongoose
    .connect("mongodb+srv://lishugupta652:mongodc652@firstcluster.76qkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to database")
    })
    .catch((error) => {
        console.log("Database connection failed. Exiting now...")
        console.error(error)
        process.exit(1)
    })
}