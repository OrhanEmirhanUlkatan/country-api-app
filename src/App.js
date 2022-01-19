import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; //En yüksek seviyedeki componentten sarmaya başla


export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all") //axios ile hazır api dan veri çekme
      .then(response => setCountries(response.data))
      .catch(error => console.log({ error }));
  }, []);

  return ( //Tüm uygulamayı saracak şekilde <Router> yaz. Route <Router>'ın altına yazılacak.
    <Router> 
      <div className='App'>
        <h1>React Router Dom Deneme {" "}</h1>
        </div>
        <Route   
          path="/" //Rout yolu
          exact //alpha3Code ülkelerin 3 haneli kodu 
          render={() => //Call-back function
            countries.map((country, i) => ( // <Link to={`/country/${country.alpha3Code}`}> "Template literals (Template strings)"
              <div key={i} className="country">
                <Link to={`/country/${country.alpha3Code}`}> 
                  <h3>{country.name}</h3>
                </Link>
              </div>
            ))
          }
        />
        <Route
          path="/country/:code" // : dan sonrası değişken kısım path ler birbirine uyuşmayacak şekilde yaz yoksa url değişmez aynı sayfa da kalır. exact ile çözülebilir. 
          render={renderProps => { //
            const country = countries.find( //Country adında değişken oluştur countries içinden bul her bir ülkenin alpha3code una bak "renderProps.match.params.code" eşit olanını getir. Dizi içi arama gibi düşün.
              country => country.alpha3Code ===
                renderProps.match.params.code //Linkten/propstan gelen koda eşit olan ülkeyi gösterecek 
            );
            return <Country {...renderProps} country={country} />
          }}
        />
    </Router>
  );
}

const Country = props => {
  const {country} = props ;
  return ( // ülkenin adı, başkentin adı, eğer yoksa başkent yok yazdır. ülkenin bayrağını ve adını yazdır. 
    <div> 
      <h1>{country.name}</h1> 
      <p>Capital: {country.capital || "Başkent yok."}</p>
      <img
        src={country.flag}
        alt={country.name}
        style={{ width: 250 }}
      />
    </div>
  );
};