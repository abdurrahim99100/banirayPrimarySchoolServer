const express = require('express');
const cors = require('cors');
const requireEnv = require('dotenv')
requireEnv.config();
const app = express();
const port = process.env.PORT || 5000;
// use app;
app.use(express.json());
app.use(cors());
//--------------------------------------------------------------------------//
//============================//CODE START//================================//
//--------------------------------------------------------------------------//



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${"DUg3ihDRCJi7QvYM"}@cluster0.g3vskme.mongodb.net/?retryWrites=true&w=majority`;

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
        //================START==================//;
        // Get the database and collection on which to run the operation
        const teacherCollection = client.db("banirayPrimarySchool").collection("teachers");
        const classesCollection = client.db("banirayPrimarySchool").collection("classes");

        // TEACHER RELATED CODE;
        app.get('/teachers', async (req, res) => {
            const result = await teacherCollection.find().toArray();
            res.send(result);
        })



        // CLASS RELATED CODE;
        app.get('/classes', async (req, res) => {
            const result = await classesCollection.find().toArray();
            res.send(result);
        })





        //=================END=================//;
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("PINGED YOUR DEPLOYMENT. YOU SUCCESSFULLY CONNECTED TO MONGODB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



//--------------------------------------------------------------------------//
//============================//CODE END//==================================//
//--------------------------------------------------------------------------//
// by default get operation;
app.get('/', (req, res) => {
    res.send('SYSTEM IS RUNNING ON FIRE ');
});

app.listen(port, () => {
    console.log(`SYSTEM IS RUNNING ON PORT ${port}`);
});