import { useEffect, useState } from "react";
import Prayer from "./components/Prayer";
import axios from "axios";
function App() {
  const [timings, setTimings] = useState([]);
  const [date, setDate] = useState();
  const [city, setCity] = useState("Cairo");
  const api =`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`
  useEffect(()=>{
    axios.get(api).then((res) => {
      setDate(res.data.data.date.gregorian.date);
      setTimings(res.data.data.timings);
    })
  },[city])
  console.log(timings);
  const prayerNames = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء"
};
  return (
  <section className="container">
    <div className="clander">
      <div className="top-clander"> 
        <div className="cities">
          <h3>المدينة</h3>
          <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          >
            <option value="Cairo">القاهرة</option>
            <option value="Tanta">طنطا</option>
            <option value="Alexandria">الإسكندرية</option>
            <option value="Giza">الجيزة</option>
            <option value="Aswan">أسوان</option>
          </select>
        </div> 
        <div className="date">
          <h3>التاريخ</h3>
          <p>{date}</p>
        </div>
      </div>
      <hr/>
      <div className="body-clander"> 
        {timings && Object.keys(prayerNames).map((prayer) =>(
        <Prayer 
        key={prayer}
        title={prayerNames[prayer]} time={timings[prayer]}/>
        ))}
      </div>
    </div>
  </section>
  
  );
}

export default App;
