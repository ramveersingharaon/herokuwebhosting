const mongoose= require('mongoose');
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    age:{
        type:Number,
        require:true
    },
    password:{
        type:Number,
        require:true
    },
    confirmpassword:{
        type:Number,
        require:true
    },

})
// now we need to create a collection

const Register = new mongoose.model('Register',employeeSchema )

module.exports= Register;