import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import "./main.css";
function App() {
  const [dados, setDados] = useState([]);
  const [country, setCountry] = useState("Dinamarca");

  useEffect(()=>{
      const fetchData = async ()=>{
        const response = await axios.get("http://localhost:8080/");
        setDados(response.data);
      }
      fetchData();
  }, [])

  return (
    <div className="App">
      <div className="header">
        <input type="text" placeholder="Escreva uma nação" onChange={(e) => setCountry(e.target.value)}></input>
      </div>
        <div className="main">
          <div className="countryimg">
            {dados.map((item, index) =>{
              return(
                <div key={index}>
                  {country == item.pais ? <img src={item.bandeira} alt="bandeira"></img> : ""}
                </div>
              )
            })}
          </div>
          <div className="countryinfo">
          {dados.map((item, index)=>{
              return(
                <div key={index}>
                <p>{country == item.pais ? item.pais : ""}</p>
                <div className="countrypopgraph">
                  <div className="countryprogress"><p>{country == item.pais ? item.populacao : ""}</p>
                  </div>
                </div>
                <p>{country == item.pais ? item.pib : ""}</p>
                <p>{country == item.pais ? item.idh : ""}</p>
              </div>
              )
            })}
          </div>
        </div>
    </div>
  );
}

export default App;
