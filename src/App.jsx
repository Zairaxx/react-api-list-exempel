import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [character,setCharacter] = useState(null);
  const [chosedEpisode, setChosenEpisode] = useState("");
  const [episode,setEpisode] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      const res = await fetch("https://rickandmortyapi.com/api/character/1");
      const data = await res.json();
      console.log(data);
      setCharacter(data);
    };

    getCharacter();
  },[])


  useEffect(() => {
    console.log(chosedEpisode);
  },[chosedEpisode])

  const getEpisode = async () => {
    let res = await fetch(chosedEpisode);
    let episodeData = await res.json();
    setEpisode(episodeData);
 
  }

  return (
    <>
    <h1>Rick and Morty API</h1>
    {character && <div>
      <p><strong>Namn:</strong> {character.name}</p>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>

      <select onChange={(e) => setChosenEpisode(e.target.value)}>
        <option value="">Avsnitt {character.name} förekommer</option>
        {character.episode.map((ep) => <option value={ep}>Avsnitt {ep[ep.length-2] + ep[ep.length-1]}</option>)}
      </select>
      <button onClick={getEpisode}>Hämta info om avsnitt</button>
      </div>}

      {episode && <div>
        <p><strong>Episode #:</strong>{episode.id}</p>
        <p><strong>Episode name:</strong>{episode.name}</p>
        <p><strong>Episode air date:</strong>{episode.air_date}</p>
        </div>}
    </>
  )
}

export default App
