import express from "express";
import cors from 'cors';
import {adminRouter} from "./Routes/AdminRoute.js";




const app = express();
const PORT = process.env.PORT || 3000;

//app.use(cors());
app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET','POST','PUT', 'DELETE'],
    credentials: true
}));



app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome to the API!');
})
app.use('/auth',adminRouter);
//app.use('/membership',membershipRouter);
app.use(express.static('Public'));


app.listen(PORT,()=>{
    console.log("server is running on http://localhost:3000");
}
);
 
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('Something broke!');
});