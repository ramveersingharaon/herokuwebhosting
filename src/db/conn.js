const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mernproject').then(()=>{
    console.log('The connection is sucess')
}).catch((error)=>{
    console.log('The connnection is not sucess')
});