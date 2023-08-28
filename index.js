import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); 
app.use(express.static("public"));

const API_URL = "http://shibe.online/api";

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/images", async (req, res) => {
    const type = req.query.type;
    const count = req.query.count || '1';

    try {
        const result = await axios.get(API_URL + `/${type}?count=${count}`);
        res.render("index", { url: result.data });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
