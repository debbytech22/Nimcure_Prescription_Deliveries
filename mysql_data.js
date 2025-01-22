require('dotenv').config();  
const { createPool } = require('mysql2');
const {patientData, ridersData, loginDetails } = require('./data')
const bcrypt = require("bcrypt")



const dbConnection = createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,  
    database: "nim_care",
    connectionLimit: 20
});

const connectDB = async () => {
    try {
        
        const connection = await dbConnection.promise().getConnection();
        console.log('Connected to MySQL ');
        connection.release(); 
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
};

connectDB();



    const PatientsData = ` CREATE TABLE IF NOT EXISTS patientData (
        \`Hospital ID\` VARCHAR(255) PRIMARY KEY,
        \`First Name\` VARCHAR(255) NOT NULL,
        \`Last Name\` VARCHAR(255) NOT NULL,
        \`Patient's Name\` VARCHAR(255) NOT NULL,
        \`Phone Number\` VARCHAR(255) NOT NULL,
        \`Next Delivery Date\` VARCHAR(255) NOT NULL,
        Location VARCHAR(255) NOT NULL,
        Gender VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL,
        \`Delvery Area\` VARCHAR(255) NOT NULL,
        \`Package Code\` VARCHAR(255) NOT NULL,
        \`Status\` VARCHAR(255) NOT NULL
    );`;


    const RiderData = `CREATE TABLE IF NOT EXISTS ridersData(
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`Dispatch Rider's Name\`    VARCHAR(255) NOT NULL,
        \`Delivery Area\`            VARCHAR(255) NOT NULL,
        \`Number of Deliveries\`     INT NOT NULL     
            
         )`;


    const userloginDetails = `CREATE TABLE IF NOT EXISTS userDetails(
        \`Email\`            VARCHAR(255) NOT NULL,
         \`Password\`           VARCHAR(255) NOT NULL
                
       )`;



    const insertPatientQuery = `
       INSERT INTO patientData (
           \`Hospital ID\`,
           \`First Name\`,
           \`Last Name\`,
           \`Patient's Name\`,
           \`Phone Number\`,
           \`Next Delivery Date\`,
           Location,
           Status,
           Gender,
           Email,
           \`Delvery Area\`,
           \`Package Code\`
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


     const insertRiderQuery = `INSERT INTO ridersData(
            \`Dispatch Rider's Name\`,
            \`Delivery Area\` ,
            \`Number of Deliveries\`) VALUES (?,?,?)`  


const createTables = async (tables) => {
    try {
        const connect = await dbConnection.promise().getConnection()
        await connect.query(tables)
        connect.release()
        // console.log(`table created successfully`)
    }

    catch(error){
        console.log("Table Not Created:", error.message)
    }
}


createTables(PatientsData)
createTables(RiderData)
createTables(userloginDetails)



const insertPatientData = async () => {

    try {
        for (const patient of patientData) {
            const connect = await dbConnection.promise().getConnection()
            await connect.query(insertPatientQuery, [
                patient["Hospital ID"],
                patient["First Name"],
                patient["Last Name"],
                patient["Patient's Name"],
                patient["Phone Number"],
                patient["Next Delivery Date"],
                patient.Location,
                patient.Status,
                patient.Gender,
                patient.Email,
                patient["Delvery Area"],
                patient["Package Code"]
            ]);
            connect.release()
        }

        // console.log('Patient data inserted successfully!');
    } catch (error) {
        console.error('Error inserting patient data:', error.message);
    } 
};

insertPatientData();



const insertRiderData = async () => {

    try {
        for (const rider of ridersData) {
            const connect = await dbConnection.promise().getConnection()
            await connect.query(insertRiderQuery, [
                rider["dispatch rider's name"],
                rider["delivery Area"],
                rider["Number of deliveries"]   
            ]);
            connect.release()
        }

        // console.log('Riders data inserted successfully!');
    } catch (error) {
        console.error('Error inserting riders data:', error.message);
    } 
};


insertRiderData()




const insertUserDetails = async () => {
    try {
        const connection = await dbConnection.promise().getConnection();

        const userInsertPromises = loginDetails.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.Password, 10); 
            return [ user.Email,hashedPassword ];
        });

        const usersData = await Promise.all(userInsertPromises);
        const insertUserDetailsQuery = `INSERT INTO userdetails (Email,Password ) VALUES ? `;
        await connection.query(insertUserDetailsQuery, [usersData]);

        // console.log('User data inserted successfully');
        connection.release();
    } catch (error) {
        console.error('Error inserting user data:', error.message);
    }
};



insertUserDetails()

module.exports = dbConnection