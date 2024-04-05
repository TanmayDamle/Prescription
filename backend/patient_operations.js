const db = require('./DB_processes')
async function add_new_patient(request,response){
    try{
    db.getDBconnection()
    const p_id = request.body.patient_id
    const p_name = request.body.name
    const p_age = request.body.age
    const p_sex = request.body.sex
    const p_mob_no = request.body.mobile
    const p_address = request.body.address
    const p_visit_type = request.body.visitType
    // console.log(p_visit_type);
    await db.insertPatient(p_id,p_name,p_age,p_sex,p_mob_no,p_address,p_visit_type).then(()=>{}).catch((error)=>{console.log("Error inserting patient",error)})
    return response.redirect('home')
    }
    catch(e){
        console.log(e);
        await db.closeDBconnection()
        return response.redirect('home')
    }
}

async function countpatients(req,res){
    try{
        db.getDBconnection()
        db.Patient.countDocuments({}).then((count)=>{res.json({ count: count });})
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
          }); 
    }
    catch(e){
        console.log(e);
        await db.closeDBconnection()
    }
}

async function searchPatient(request,response){
    try{
        db.getDBconnection()
        const p_name = request.body.searchInput
        console.log('Read input name:',p_name)
        db.Patient.find({patient_name:p_name})
    }
    catch(e){
        console.log(e);
        await db.closeDBconnection()
    }
}

module.exports = {
    add_new_patient,
    countpatients,
    searchPatient
}