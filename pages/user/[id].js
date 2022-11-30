import Axios from 'axios'
import { useRouter } from 'next/router'


function id(){

    const router = useRouter()
    const id = router.query.id

    const Logout = () => {

        Axios.get("/api/logout", {
            withCredentials: true,
          })
          .then((response) => {
      
            response.data.redirect ? router.push('/') : ''
      
          });

    }

    return(

        <div>
            {id}
            <button onClick={Logout}>Logout</button>
        </div>

    )

}

export default id