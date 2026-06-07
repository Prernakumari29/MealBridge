require("dotenv").config();
const app = require("./src/app");
const errorhandler = require("./src/middleware/errorMiddleware");


app.use(errorhandler);
port = process.env.PORT || 8000
app.listen(port , ()=>{
    console.log(`server is running on the port ${port}`)
})

