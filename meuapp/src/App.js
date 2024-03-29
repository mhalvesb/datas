import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import "./main.css";

import flag from "./src/assets/icons/flag.png";
import marker from "./src/assets/icons/marker.png";

function App() {

  const [dados, setDados] = useState([]);
  const [country, setCountry] = useState("");
  const filterCountry = dados.filter(data => data.pais.toUpperCase().startsWith(country.toUpperCase()));
  const [li, setLi] = useState([]);
  const totalPop = 7888888888;
  const totalPib = 101560901;
  const [pib, setPib] = useState(0);
  const [pop, setPop] = useState(0);

  useEffect(()=>{
      const fetchData = async ()=>{
        const response = await axios.get("https://datas-server.vercel.app/");
        setDados(response.data);
      }
      fetchData();
      addItem();
  }, []);

  const addItem = () =>{
    const updateItem = [...li];
    updateItem.push(dados);
    setLi(updateItem);
  } 

  return (
    <div className="App">
      <div className="header">
        <div className="divinput">
          <input type="text" name="texts" id="texts" value={country} required onChange={(e) => setCountry(e.target.value)}></input>
          <label htmlFor="texts" id="texts">Escreva o nome de um país</label>
          <div className="search">
            <ul>
             
              {country !== "" ? filterCountry.map((item, index)=>{
                return(
                  <div key={index}>
                    <li onMouseDown={(e) => setCountry(item.pais)}> <img src={item.bandeira} alt="bandeira"></img>  {item.pais}</li>
                  </div>
                )
              }) : ""}
            </ul>
          </div>
        </div>
      </div>
      <div className="main-area">
        <div className="main">
          <div className="countryimg">
            {dados.map((item, index) =>{
              return(
                <div key={index}>
                  <p className="countryxl">{country.toUpperCase() == item.pais.toUpperCase() ? `${item.pais}` : ""}</p>
                  {country.toUpperCase() == item.pais.toUpperCase() ? <img src={item.bandeira} alt="bandeira"></img> : ""}
                </div>
              )
            })}
          </div>
          <div className="countryinfo">
          {dados.map((item, index)=>{
              return(
                <div key={index}>

                
                <p className="countryl">{country.toUpperCase() == item.pais.toUpperCase() ? `${item.capital}` : ""}</p>
                
                {country.toUpperCase() == item.pais.toUpperCase() ? <div className="countrypopgraph">
                  <div className="graph1">
                      {country.toUpperCase() == item.pais.toUpperCase() ? `População: ${item.populacaotext}` : ""}
                      <div className="countryprogress" style={{"--i": `${((item.populacaonumber / totalPop) * 100).toFixed(2)}`}}>
                        <p>Representa {((item.populacaonumber / totalPop) * 100).toFixed(2)}% da população mundial</p>
                      </div>
                    </div>
                  
                  <div className="graph2">
                    {country.toUpperCase() == item.pais.toUpperCase() ? `PIB: ${item.pibtext}` : ""}
                    <div className="countryprogress" style={{"--i": `${((item.pibnumber / totalPib) * 100).toFixed(2)}`}}>
                      <p>Representa {((item.pibnumber / totalPib) * 100).toFixed(2)}% do PIB mundial</p>
                    </div>
                  </div>
                  
                </div> : ""}
                
                {country.toUpperCase() == item.pais.toUpperCase()? <div className="barcontainer">
                  <div className="skill-box">
                    <span className="title">IDH:</span>
                  </div>
                  <div className="skill-bar">
                      <span className="skill-per" style={{"--idh": `${(Number(item.idh) * 100)}%`, "--clr": `${Number(item.idh) * 100 > 95 ? "#003c00" : Number(item.idh) * 100 > 75 ? "#007f00" : Number(item.idh) * 100 > 50 ? "#ffa83c" : Number(item.idh) * 100 > 25 ? "#ff5b00" : "#a70000"}`}}>
                          
                          <span className="tooltip">{country.toUpperCase() == item.pais.toUpperCase() ? `${item.idh}` : ""}</span>
                      </span>
                  </div>
                </div> : ""}
                {country.toUpperCase() == item.pais.toUpperCase() ? 
                <div className="moreinfos">
                  <p>Estados: {item.estados}</p>
                  <p>Moeda: {item.moeda}</p>
                  <p>Cód. telef. {item.telef}</p>
                  <p>Língua: {item.lingua}</p>
                </div> : ""}
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
