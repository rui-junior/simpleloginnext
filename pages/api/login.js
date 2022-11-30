
import connect from '../../database/connection'
import schema from '../../database/schema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next';

const login = async (req, res) => {

    const { usuario, senha } = req.body
    
    if (req.method === 'POST') {
        
        await connect()
        const dadosBD = await schema.findOne({ usuario: usuario })

        if(dadosBD) {

            if (bcrypt.compareSync(senha, dadosBD.senha)) {

                const token = await jwt.sign(

                    { "id": dadosBD._id },
                    'secret',
                    { expiresIn: 500 }

                )

                // setCookie('token', token)
                setCookie('token', token, { req, res, maxAge: 500 });

                res.status(202).send({ 
                    'login': true,
                    'id': dadosBD._id
                 })

                return

            }

            res.send({ 'login': false })
            return

        }

        res.send({ 'login': false })

    }

}

export default login