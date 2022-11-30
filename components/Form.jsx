import { useRef, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

//components
import Card from "./Card";

//middlewares
import Axios from "axios";

//styles
import styleCard from "./css/card.module.css";
import styleInput from "./css/input.module.css";
import styleButton from "./css/button.module.css";
import styleMessage from "./css/message.module.css";

export default function Form() {

  const [message, setMessage] = useState("");
  const router = useRouter()

  const usuarioRef = useRef();
  const senhaRef = useRef();

  const handleSubmit = (e) => {

    e.preventDefault();

    let usuario = usuarioRef.current.value;
    let senha = senhaRef.current.value;

    if (usuario === "" || senha === "") {

      setMessage("Complete corretamente os campos");

    } else {

      Axios.post(
        "/api/login",
        {
          usuario: usuario,
          senha: senha,
        },
        {
          //Só funcionou com o parametro separado no frontend, erro do cors / TEM QUE SER SEPARADO DO DATA AXIOS
          withCredentials: true,
        }
      )

        .then((response) => {
          if (response.data.login) {

            // setMessage("Logado com sucesso");
            router.push(`/user/${response.data.id}`)

          } else {

            setMessage("Usuário ou senha incorretos");

          }
        })

        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

      setMessage("");
    }
  };

  return (
    <Card>

      <form className={styleCard.form} onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input
          type="text"
          name="usuario"
          className={styleInput.input}
          ref={usuarioRef}
        />

        <label>Password:</label>
        <input
          type="password"
          name="senha"
          className={styleInput.input}
          ref={senhaRef}
        />

        <button className={styleButton.register}>Login</button>
      </form>

      <label className={styleMessage.message}>{message}</label>

    </Card>
  );
}