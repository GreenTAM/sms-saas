const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const Smppinstance = require("./libs/smpp/index");
// const userRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
// const { response } = require("express");

dotenv.config();
let myvar = "holla"

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const FIGED_TOKEN = process.env.FIGED_TOKEN;

app.post("/api/send", async (req, res) => {
   //TODO: remove figed token
   const token = req.get("authorization")?.replace("Bearer ", "");

   if(!token || token !== FIGED_TOKEN) {
       return res.status(401).json({message: "Authentication failded"});
   }

   const { to_number, message, sender } = await req.body;
   //TODO: make validation of fields

   if(!sender) {
       return res.status(404).json({message: "The sender isn't found. Please retry."});
   }
   console.log(myvar)
   try {
       let data = await Smppinstance.sendMessage(to_number, message, sender);

       console.log("global variable", data);
       console.log("to: ", to_number, " msg: ", message);
       return res.status(200).json({message: "The SMS has been sent to " + to_number});
       
   } catch (error) {
       console.log("log ", error);
       return res.status(500).json({message: "An error occured."});
   }
});

// app.use("/api/users", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/posts", postRoute);


app.listen(3000, () => {
    console.log("Server launched");
    Smppinstance.init()
    console.log(Smppinstance)
})