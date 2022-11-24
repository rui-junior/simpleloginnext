import connect from '../../database/connection'
import schema from '../../database/schema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies';

const login = async (req, res) => {

    const { usuario, senha } = req.body

    if (req.method === 'POST') {

        await connect()
        const dadosBD = await schema.findOne({ usuario: usuario })

        if (dadosBD) {

            if (bcrypt.compareSync(senha, dadosBD.senha)) {

                const token = await jwt.sign(

                    { "id": dadosBD._id },
                    'secret',
                    { expiresIn: 300 }

                )

                const cookies = new Cookies(req, res)

                cookies.set('token', token, {
                    httpOnly: true,
                    maxAge: 2*60*1000
                })

                res.status(202).send({ 'login': true })

                return

            }

            res.send({ 'login': false })
            return

        }

        res.send({ 'login': false })

    }


}

export default login