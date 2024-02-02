import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';

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
                <p>{country == item.pais ? item.populacao : ""}</p>
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
