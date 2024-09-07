import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

import Tempinfo from "./components/tempoInfo/Tempinfo";
import MapComponent from './components/Mapa/MapComponent';

import TempInfo5dias from './components/tempInfo5dias/TempInfo5dias'


function App() {
  const [tempo, setTempo] = useState(null);
  const [tempo5dias, setTempo5dias] = useState(null);
  const [location, setLocation] = useState(null);
  const inputPesquisar = useRef();

  async function buscarCidade() {

    const cidade = inputPesquisar.current.value;
    const keyApi = "5e6ab9342e87fc5a2634ab608987d7ff";
    const urlApi5dias = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${keyApi}&lang=pt_br&units=metric`;
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${keyApi}&lang=pt_br&units=metric`;

    const dadosApi = await axios.get(urlApi);
    const dadosApi5dias = await axios.get(urlApi5dias);

    setTempo5dias(dadosApi5dias.data);
    setTempo(dadosApi.data);
    setLocation({ coord: dadosApi.data.coord });
  }

  return (
    <div>
      <nav className="navbar">

        <div className="container">
          <div className="estatico">O Tempo Com Você</div>
        </div>
        <div className="menu">
          <input
            ref={inputPesquisar}
            type="text"
            placeholder="Digite o nome da sua cidade!"
            className="input"
          />
          <button className="btn" onClick={buscarCidade}>Pesquisar</button>

        </div>

      </nav>
      <section className="wrapper">
        <div id="stars"></div>
        <div id="stars2"></div>



        <div style={{ display: 'flex', justifyContent: 'center', justifyItems: '', alignItems: 'center', height: '45vh', }}>
          {tempo && <Tempinfo tempo={tempo} />}
        </div>

        <MapComponent location={location} />
        <div>
          {tempo5dias && <TempInfo5dias tempo5dias={tempo5dias} />}
        </div>
      </section>
    </div>

  );
}

export default App;
