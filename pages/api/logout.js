
import { hasCookie, deleteCookie } from 'cookies-next';

const logout = async (req, res) => {

    const token = hasCookie('token', { req, res })
    
    if(token){

        deleteCookie('token', { req, res });

    }

    res.send({ 'redirect': true })

}

export default logout