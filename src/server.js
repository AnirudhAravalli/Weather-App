import path from "path"
import { fileURLToPath } from "url"
import express from "express"
import weatherData from "../utils/weatherData.js"

const port = process.env.PORT || 4000
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
// const stylesPath = path.join(__dirname, "../public/styles")

app.set("view engine", "ejs")
app.set("views", viewsPath)
app.use(express.static(publicPath))

app.get("/", (req, res) => {
    res.render("index.ejs", { title: "Weather App", partialsPath: partialsPath })
})

app.get("/weather", async (req, res) => {
    if(!req.query.address)
        return res.send("Address is required")
    
    try {    
        const result = await weatherData(req.query.address)
        if (result.cod && result.cod === "404") 
            return res.status(404).send("Address not found");
        res.send(result)
    }
    catch(error) {
        console.log("Error!!")
        res.sendStatus(404)
    }
})

app.get("*", (req, res) => {
    res.render("404.ejs", {title: "Page not found", partialsPath: partialsPath})
})

app.listen(port, () => {
    console.log(`Listening to ${port}`)
})