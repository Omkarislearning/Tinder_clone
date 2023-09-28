import express from "express";
import mongoose from "mongoose";
import Cors from 'cors'


// App config
const app = express();
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://omkaranvekar009:omkar@cluster0.kmbahv8.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url)
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.log("Messages" + err));


const dbmodel = new mongoose.Schema({
    Name:
    {
        required: true,
        type: String,

    },
    imgUrl:
    {
        required: true,
        type: String,

    }
});

const db = mongoose.model('cards', dbmodel);


// API Endpoints
app.get("/", (_req, res) => {
    res.status(200).send("HEllO");
})

app.post('/tinder/cards', async (req, res) => {
    try {
        const newData = new db({
            Name: req.body.Name,
            imgUrl: req.body.imgUrl
        });

        await newData.save();

        res.status(201).json(newData);

    
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/tinder/cards', (req, res) => {
    db.find().then(function(data) 
    {
        res.status(201).send(data)
        console.log(data);
    }).catch(function (err) {
        console.log(err);
    })
});




// Listener
app.listen(port, () => console.log(`localhost:${port}`));

