import express from "express"
import mongoose from "mongoose"
import Cors from 'cors'
import Pusher from "pusher"
import dbModel from './dbModel.js'

//ap config
const app = express();
const port = process.env.PORT || 8080;


const pusher = new Pusher({
  appId: "1216927",
  key: "a5834645c1051e8bf72b",
  secret: "af066b9a2bbf7df7cc15",
  cluster: "ap2",
  useTLS: true
});

//middlewares
app.use(express.json());
app.use(Cors());

//DB config
//password:QyqvfbU5daQirCrO
const connection_url = "mongodb+srv://admin:QyqvfbU5daQirCrO@cluster0.oz593.mongodb.net/mapp3?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
mongoose.connection.once('open', ()=>{
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change)=>{
        console.log('change triggered on pusher...')
        console.log(change)
        console.log('end of change')

        if(change.operationType === 'insert'){
            console.log('Triggering Pusher ***IMG UPLOAD***')
            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image,
            })
        }
        else{
            console.log("Unknown trigger from pusher")
        }
    })

})

//api routes
app.get('/', (req, res)=>res.status(200).send('Hello World!!'));
app.post('/upload', (req, res)=>{
    const body = req.body;
    dbModel.create(body, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data);
        }
    })
});
app.get('/sync', (req, res)=>{
    dbModel.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data);
        }       
    })
})

//listen
app.listen(port, ()=>console.log(`listning on port:${port}`));
