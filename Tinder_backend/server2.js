import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'



// App Config
const app= express();
const port = process.env.PORT || 8000
const connection_url = "mongodb+srv://omkaranvekar009:omkar@cluster0.kmbahv8.mongodb.net/?retryWrites=true&w=majority";



// Middleware


app.use(express.json());
app.use(cors());


// DB Config
mongoose.connect(connection_url).
then(()=>console.log("Connected to MongoDB")).
catch((err)=>console.log(err));



const MessageModel = new mongoose.Schema({
    Name:
    {
        required: true,
        type: String,

    },
    Message:
    {
        required: true,
        type: String,

    },
    Profile:
    {
        required: true,
        type: String,

    },
    Time:
    {
        required: true,
        type: String,

    }
});

const db2 = mongoose.model('chats', MessageModel);

// ApI EndPoints

app.get('/',(req,res)=>
{
    res.status(200).send("Hello MEssages");
})

app.post('/chats',async (req,res)=>
{
    try
    {
        const chatdb=new db2({
            Name:req.body.Name,
            Message:req.body.Message,
            Profile:req.body.Profile,
            Time:req.body.Time
        });
        


        await chatdb.save();

        res.status(201).json(chatdb);

    }
    catch
    {
        
        res.status(500).send("Error");
    }

});


app.get('/chats',(req,res)=>
{
    db2.find().then(function(data) 
    {
        res.status(201).send(data)
        console.log(data);
    }).catch(function (err) {
        console.log(err);
    })
});

// Listener
app.listen(port,()=>console.log(`Running on ${port}`));