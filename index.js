const express = require('express')
const app = express();    
const cors=require("cors");

const mongoose = require('mongoose')
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000;     
const Customer = require('./models/CustomerModel')

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions))

   


app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.get('/blog', (req, res) => {
  res.send('Hello Blog, My name is Dhana')
})

app.get('/customers', async(req, res) => {
  try {
      const customers = await Customer.find({});
      res.status(200).json(customers);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

app.get('/customers/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const customer = await Customer.findById(id);
      res.status(200).json(customer);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})
    

app.post('/customers', async(req, res) => {
  try {
      const customer = await Customer.create(req.body)
      res.status(200).json(customer);
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
  }
})

// update a customer
app.put('/customers/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const customer = await Customer.findByIdAndUpdate(id, req.body);
      // we cannot find any customer in database
      if(!customer){
          return res.status(404).json({message: `cannot find any customer with ID ${id}`})
      }
      const updatedCustomer = await Customer.findById(id);
      res.status(200).json(updatedCustomer);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// delete a customer

app.delete('/customers/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const customer = await Customer.findByIdAndDelete(id);
      if(!customer){
          return res.status(404).json({message: `cannot find any customer with ID ${id}`})
      }
      res.status(200).json(customer);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
//   console.log(`http://localhost:${port}/`);
// });


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://dhana01898:3Wsdhr0AKRLCTz40@customerapi.4mjtx.mongodb.net/?retryWrites=true&w=majority&appName=CustomerAPI')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(port, ()=> {
        console.log(`Node API app is running on port ${port}`)
    });
}).catch((error) => {
    console.log(error) 
})   
