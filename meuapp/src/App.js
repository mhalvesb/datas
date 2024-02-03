import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import "./main.css";
function App() {
  const [dados, setDados] = useState([]);
  const [country, setCountry] = useState("Brasil");
  const totalPop = 7888888888;
  const [pop, setPop] = useState(0);

  useEffect(()=>{
      const fetchData = async ()=>{
        const response = await axios.get("http://localhost:8080/");
        setDados(response.data);
      }
      fetchData();
  }, []);

  function Percent(value, total){
      
  }

  return (
    <div className="App">
      <div className="header">
        <input type="text" placeholder="Escreva uma nação" onChange={(e) => setCountry(e.target.value)}></input>
      </div>
      <div className="main-area">
        <div className="main">
          <div className="countryimg">
            {dados.map((item, index) =>{
              return(
                <div key={index}>
                  {country.toUpperCase() == item.pais.toUpperCase() ? <img src={item.bandeira} alt="bandeira"></img> : ""}
                </div>
              )
            })}
          </div>
          <div className="countryinfo">
          {dados.map((item, index)=>{
              return(
                <div key={index}>
                  
                <p>{country.toUpperCase() == item.pais.toUpperCase() ? item.pais : ""}</p>
                {country.toUpperCase() == item.pais.toUpperCase() ? `População: ${item.populacao}` : ""}
                {country.toUpperCase() == item.pais.toUpperCase() ? <div className="countrypopgraph">
                  <div className="countryprogress" style={{"--i": `${((item.populacao / totalPop) * 100).toFixed(2)}`}}>
                      <p>Representa {((item.populacao / totalPop) * 100).toFixed(2)}% da população mundial</p>
                  </div>
                </div> : ""}
                
                <p>{country.toUpperCase() == item.pais.toUpperCase() ? `PIB: ${item.pib}` : ""}</p>
                <p>{country.toUpperCase() == item.pais.toUpperCase() ? `IDH: ${item.idh}` : ""}</p>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
