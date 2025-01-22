
// modules 
require('dotenv').config();  
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const path = require("path")
const dbConnection = require('./mysql_data'); 
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json');
const bcrypt = require("bcrypt")


const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
const JWT_EXPIRATION = '3h'; 


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        req.user = decoded; // Attach decoded data to the request object
        next();
    });
};



// middleware
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




//  API route

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index1.html'));
} )



app.post('/login', async (req, res) => {
    const { Email: email, Password: password, 'remember-me': rememberMe } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const connection = await dbConnection.promise().getConnection();

        const query = `SELECT * FROM userdetails WHERE Email = ?`;
        const [rows] = await connection.query(query, [email]);

        connection.release();

        if (rows.length > 0) {
            const user = rows[0]; 

            const isPasswordValid = await bcrypt.compare(password, user.Password);

            if (isPasswordValid) {
                
                const token = jwt.sign(
                    { id: user.id, email: user.Email }, 
                    JWT_SECRET, 
                    { expiresIn: JWT_EXPIRATION } 
                );

                return res.status(200).json({
                    message: 'Login successful',
                    token: token, 
                    rememberMe,
                });
            } else {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
    }  catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
});



app.get('/patients', async  (req, res) =>{

    try {
        const connect = await dbConnection.promise().getConnection()
        const [patients] = await connect.query("Select * From Patientdata")
        res.json(patients); 
        connect.release()
        console.log("Patient Data Fetched")
      } catch (error) {
        console.error('Error fetching patients:', error.message);
        res.status(500).json({ error: 'Failed to fetch patients data' });
      }
})

app.get('/delivery', async  (req, res) =>{

    try {
        const connect = await dbConnection.promise().getConnection()
        const [patients] = await connect.query("Select * From Patientdata")
        res.json(patients); 
        connect.release()
        console.log("Patient Data Fetched")
      } catch (error) {
        console.error('Error fetching patients:', error.message);
        res.status(500).json({ error: 'Failed to fetch patients data' });
      }
})


app.post('/patientupdate', async  (req, res) => {
    const { hospitalId, firstName, lastName, gender, phoneNumber, email } = req.body;
    try{
        const connect =  await dbConnection.promise().getConnection() 
        const query = `
        UPDATE patientdata 
        SET \`First Name\` = ?, \`Last Name\` = ?, gender = ?, \`Phone Number\` = ?, email = ?
        WHERE \`Hospital ID\` = ?`;
        const values = [firstName, lastName, gender, phoneNumber, email, hospitalId];
        connect.query(query,values)
        connect.release()
        res.status(200).json({ message: 'Patient data updated successfully' });

    }
    catch(error){
        console.log('update failed', error)
        res.status(500).json({ message: 'Failed to update patient data' });

    }
})


app.get('/riderdata', async (req, res) =>{
    try{
         const connect = await dbConnection.promise().getConnection()
         const [rider] = await connect.query("Select `dispatch rider's name`, `delivery Area`, `Number of deliveries` From ridersdata ")
         res.json(rider);
         connect.release()
         console.log("Rider Data Sent")
    }
    catch(error){
        console.log('Error fetching rider data:', error.message)
    }
})



app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000')
        
});