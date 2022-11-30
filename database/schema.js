<<<<<<< HEAD
import mongoose from 'mongoose';

const Schema = new mongoose.Schema({

    usuario: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    
})

=======
import mongoose from 'mongoose';

const Schema = new mongoose.Schema({

    usuario: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    
})

>>>>>>> 51c1631c6f2e0388955155cbc6a872c29f415365
export default mongoose.models.loginusers || mongoose.model('loginusers', Schema)