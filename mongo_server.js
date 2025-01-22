
//modules
const express = require('express');
const app = express();
const path = require('path');
// const {patientData, ridersData, loginDetails } = require('./data')
const {patientDataa, riderDataa,userDetails } = require('./db')
const mongoose = require('mongoose')


//mongodb connections
const mongoUri = 'mongodb+srv://nimcare:1234@cluster0.igrjk.mongodb.net/NimCare_Pharmacy?retryWrites=true&w=majority&appName=Cluster0'
async function mongConnect () {
     try{
        await mongoose.connect(mongoUri)
        console.log('Connection Successful')
        app.listen(3000, () => {
            console.log('Server is running at http://localhost:3000');
        })
    }
    catch(error){
        console.log(error)
    }
} 

mongConnect ()




// middleware
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



//  API route

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index1.html'));
} )

app.post('/login', async (req, res) => {
    // console.log(`Request method: ${req.method}`);
    // console.log(`Request body: ${JSON.stringify(req.body)}`);
    
    const { Email: email, Password: password, 'remember-me': rememberMe }= req.body;


    if (!email || !password) {
        return res.status(400).json('Email and password are required.' );
    }

    try {
        
        const user = await userDetails.findOne({ Email: email, Password: password });
    
        if (user) {
            return res.status(200).json({ message: 'Login successful', rememberMe });
        } else {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
});


app.get('/patients', async  (req, res) =>{

    try {
        const patients = await patientDataa.find(); 
        res.json(patients); 
      } catch (error) {
        console.error('Error fetching patients:', error.message);
        res.status(500).json({ error: 'Failed to fetch patients data' });
      }
})


app.get('/riderdata', async (req, res) =>{
    try{
         const rider = await riderDataa.find({}, { _id: 0, __v: 0  });
         res.json(rider);
    }

    catch(error){
        console.log('Error fetching patients:', error.message)
    }
})