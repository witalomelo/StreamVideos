import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAddress() {
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          setAddress(data.logradouro || "");
          setCity(data.localidade || "");
          setNeighborhood(data.bairro || "");
          setState(data.uf || "");
        } catch (error) {
          console.error("Erro ao buscar endereço via CEP:", error);
        }
      }
    }

    fetchAddress();
  }, [cep]);

  async function handleRegister(e) {
    e.preventDefault();

    if (
      email !== "" &&
      password !== "" &&
      cep !== "" &&
      address !== "" &&
      number !== "" &&
      city !== "" &&
      neighborhood !== "" &&
      state !== ""
    ) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home", { replace: true });
        })
        .catch(() => {
          console.log("erro ao fazer o cadastro");
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta!</span>

      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          value={email}
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="*************"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={cep}
          placeholder="CEP"
          onChange={(e) => setCep(e.target.value)}
        />
        <input
          type="text"
          value={address}
          placeholder="Endereço"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          value={number}
          placeholder="Numero"
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="text"
          value={city}
          placeholder="Cidade"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          value={neighborhood}
          placeholder="Bairro"
          onChange={(e) => setNeighborhood(e.target.value)}
        />
        <input
          type="text"
          value={state}
          placeholder="Estado"
          onChange={(e) => setState(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <Link className="button-link" to="/login">
        Já possui uma conta? Faça o login!
      </Link>
    </div>
  );
}
