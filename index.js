
const express = require('express')
// dotenv file require
const dotenv =  require('dotenv')
// cors origin to connect one to other server 
const cors = require('cors')
// mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
// call the dotenv config
dotenv.config() 

const app = express()
const PORT = process.env.PORT || 5000 ;
app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI;

// mongodb
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

   // create the database so that it connects with the client,
   //  and then the client’s data will be added to MongoDB.

   //start.......................
      const db = client.db('wonderlust')
  // create a collection to store the data.
    const destinationCollection = db.collection('destination')
    // create post api to connec client of front and
    //  collection data in to destination after store mongodb
    app.post('/destination', async(req,res) => {
      //req catch
      const destinationData = req.body ;
      console.log(destinationData,"destinationData has been received")
      const result = await destinationCollection.insertOne(destinationData)
      // res receive and store mongodb
      res.json(result)
      
    })
   // end............


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.dir(error);
  }
  // finally এবং client.close() ফেলে দেওয়া হয়েছে যাতে কানেকশন বন্ধ না হয়

}
run().catch(console.dir);

app.get('/' , (req,res) => {
  res.send("server is running fine!")
})

// run port
app.listen(PORT,() => {
  console.log(`server running on Port ${PORT}`)
})
