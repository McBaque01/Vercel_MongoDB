import express  from "express"; // nodejs framework
import cors from "cors";//middleware for security / to received request only to set sites/origin. 
import helmet from 'helmet'//middleware for security from attacks

const app = express();
const port: number = 8080;
app.use(express.json());
app.use(helmet());

import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const uri: string = process.env.MONGODB_URI || "mongodb+srv://vercel-admin-user:hBojOvCZeapjKL4j@cluster0.npib522.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


let db: Db;

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      db = client.db("Portfolio");
      
      await db.command({ ping: 1 });
  
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      startServer();
  
    } catch (error) {
      await client.close();
      console.error('Error connecting to MongoDB:', error);
    }
  
  }


function startServer(){

    const users = db.collection('Users');

    app.post('/signup', async (req: any, res: any) => {
        console.log("Hi there");
        const {firstname, lastname, name, email, password} = req.body;

        const newuser = {firstname, lastname, name, email, password}

            try {
              const result = await users.insertOne(newuser);
              console.log('Inserted document:', result.insertedId);
              res.json({response:{message: 'User created successfully', result: result}});
              
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal Server Error' });
            } 
    
    
      });

      app.listen(port, () => {
        console.log(`Server is running on ${port}`)
      });



}

run().catch(console.dir);


export default app;