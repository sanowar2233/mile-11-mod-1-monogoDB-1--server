const express=require('express');
const cors=require('cors')
const app=express()
const port =process.env.PORT || 5000;


app.use(cors())
app.use(express.json())



const users=[
    {
        id:1, name:'sabana', email: 'sabana@gmail.com'
    },
    {
        id:2, name:'sabana2', email: 'sabana2@gmail.com'
    },
    {
        id:3, name:'sabana3', email: 'sabana3@gmail.com'
    }
];




const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dbuser1:uN2GDkop10b8aXnH@cluster0.ykwnqlz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('database connected')
  client.close();
});



app.get('/users',(req,res)=>{
   if(req.query.name){
    const search= req.query.name
    const filtered=users.filter(usr=>usr.name.toLowerCase().indexOf(search) >= 0)
    res.send(filtered)

   }else{
    res.send(users)

   }
   
})

app.post('/users',(req,res)=>{
    console.log('post api called')
    const user=req.body;
    user.id=users.length + 1;
    users.push(user)
    console.log(user)
    res.send(user)
})

app.listen(port, ()=>{
    console.log(`simple  server ${port}`)
})