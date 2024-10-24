import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Note from './components/Note/index.jsx';

function App() {
  const [titulo, setTitulo] = useState('');
  const [audio, setAudio] = useState();
  const [notes, setNotes] = useState([]);


  const Salvar = (event) => {
    event.preventDefault();

    const formData = new FormData(); // A classe FormData é usada para criar objetos que representam dados de formulário, o que é necessário quando você deseja enviar arquivos.
    formData.append('title', titulo);
    formData.append('audio', audio);

    axios.post('http://127.0.0.1:8000/api/notes/', formData)
      .then(() => {
        loadNotes();
        setTitulo('');
        setAudio();
      })
      .catch(error => console.log(error))
    
  }

  const loadNotes = () => {
    axios.get('http://127.0.0.1:8000/api/notes/')
      .then(response => setNotes(response.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadNotes();
  }, [])

  
  return (
    <>
     <form onSubmit={Salvar}>
      <label htmlFor="titulo">Título: </label>
      <input 
        id="titulo"
        type="text" 
        name="titulo" 
        onChange={(e) => setTitulo(e.target.value)} 
        value={titulo}
      />

      <label htmlFor="audio">Áudio: </label>
      <input 
        id="audio"
        type="file" 
        name="audio" 
        onChange={(e) => setAudio(e.target.files[0])}
      />

      <button type="submit">Enviar</button>
     </form>

     <div>
        {notes.map(note => (
          <Note key={note.id} note={note} audio={`data:audio/mp3;base64,${note.audio_blob}`}/>
        ))}
     </div>
    </>
  )
}

export default App

