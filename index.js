
const express = require('express')
// dotenv file require
const dotenv =  require('dotenv')
// mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
// call the dotenv config
dotenv.config() 

const app = express()
const PORT = process.env.PORT || 5000 ;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.dir(error);
  }
  // ⚠️ finally এবং client.close() ফেলে দেওয়া হয়েছে যাতে কানেকশন বন্ধ না হয়
}
run().catch(console.dir);

app.get('/' , (req,res) => {
  res.send("server is running fine!")
})

// run port
app.listen(PORT,() => {
  console.log(`server running on Port ${PORT}`)
})
