import { useState, useEffect } from "react";
import { db } from "../../firebaseConnection";
import { doc, setDoc, collection, addDoc, getDoc , getDocs, updateDoc, deleteDoc, onSnapshot} from "firebase/firestore";
import "./cadastrar.css";

function Cadastrar() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [posts, setPosts] = useState([]);

  //atualizando automaticamente
  useEffect(() => {
    async function loadPost(){
        const unsub = onSnapshot(collection(db, "post"), (snapshot) => {
            let listaPost = [];

            snapshot.forEach((doc) => {
                listaPost.push({
                    id: doc.id,
                    titulo: doc.data().titulo,
                    autor: doc.data().autor,
                })
            })
    
            setPosts(listaPost);

        })
    }

    loadPost();

  },[])

  async function handleAdd() {
     //POST DE FORMA ESTATICA:
  //  await setDoc(doc(db, "post", "12345"), {
  //   titulo: titulo,
  //   autor: autor,
  //  })
  //  .then(() => {
  //   console.log("DADOS RESGISTRADOS COM SUCESSO")
  //  })
  //  .catch((error) => {
  //   console.log("GEROU ERRO" + error)
  //  })
    await addDoc(collection(db, "post"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Cadastrado com sucesso");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("ERRO " + error);
      });
  }

  async function buscar() {
    // const postRef = doc(db, "post", "12345");
    // await getDoc(postRef)
    // .then((snapshot) => {
    //     setAutor(snapshot.data().autor)
    //     setTitulo(snapshot.data().titulo)
    // })
    // .catch(() => {
    //     console.log("ERRO AO BUSCAR")
    // })

    const postsRef = collection(db, "post");
    await getDocs(postsRef) 
    .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
            lista.push({
                id: doc.id,
                titulo: doc.data().titulo,
                autor: doc.data().autor,
            })
        })

        setPosts(lista);

    })
    .catch((error) => {
        console.log("ERRO AO REALIZAR A BUSCA")
    })
    
  }

  async function editarPost(){
    const docRef = doc(db, "post", idPost)
    
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("ATUALIZADO!")
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch((error) => {
      console.log(error)
    })
    
  }

  async function excluir(id) {
   const docRef = doc(db, "post", id)
   await deleteDoc(docRef)
   .then(() =>{
    alert("Filme deletado com sucesso")
   })
    
  }

  return (
    <div className="container">
      <h1>Cadastrar seu filme favorito:</h1>
      <br/>
        <label>ID do filme: </label>
        <input
        placeholder="Digite o id do filme"
        value={idPost}
        onChange={(e) => setIdPost(e.target.value)}
        />
        

      <label>Titulo:</label>
      <input
        type="text"
        placeholder="Digite o titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <label>Autor: </label>
      <input
        type="text"
        placeholder="Autor do post"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />
      <div>
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscar}>Buscar</button>
        <button onClick={editarPost}>Atualizar</button>
      </div>
    

      <ul className="lista">
        {posts.map((post) => {
            return(
                <li key={post.id}>
                    <strong>ID: {post.id}</strong> <br/>
                    <span>Titulo: {post.titulo}</span> <br/>
                    <span>Autor: {post.autor}</span> <br/>
                    <button onClick={() => excluir(post.id)}>Excluir</button>
                </li>
            )
        })}
      </ul>
    </div>
  );
}

export default Cadastrar;
