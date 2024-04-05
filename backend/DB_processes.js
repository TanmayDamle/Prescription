// const { nanoid } = await import('nanoid');
const fs = require('fs');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const path = require('path');
const url = 'mongodb://127.0.0.1:27017/Prescription_db';

// autoIncrement.initialize(mongoose.connection);

const user_data_schema = new mongoose.Schema({
    username: String ,
    password: String,
    })

const patient_data = new mongoose.Schema({
    patient_id: {
        type: Number,
        unique: true,
        required: true,
        index: true
      },
    patient_name: String,
    patient_age: Number,
    patient_gender: String,
    patient_mob_no: Number,
    patient_address: String,
    patient_opd_status: String
})

async function getDBconnection(){
    console.log('inside getdbconnection')
    await mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology:true}).then(() => console.log('database connected'))
}

async function closeDBconnection(){
    await mongoose.connection.close()
}

User = mongoose.model('User', user_data_schema);
Patient = mongoose.model('Patient', patient_data);

async function insertUser(username, password) {
    const user = new User({
      username,
      password,
    });
    await user.save();
    console.log('User inserted:', user);
  }

async function insertPatient(patient_id,patient_name,patient_age,patient_gender,patient_mob_no,patient_address,patient_opd_status){
    const patient = new Patient({
        patient_id,
        patient_name,
        patient_age,
        patient_gender,
        patient_mob_no,
        patient_address,
        patient_opd_status
});
    await patient.save();
    console.log('Patient inserted:',patient);
}

module.exports = {
    getDBconnection,
    closeDBconnection,
    insertUser,
    insertPatient,
    User,
    Patient
}