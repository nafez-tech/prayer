import { useEffect, useState } from "react";

function Prayer({title, time}){
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const updateRemaining = () => {
      if (!time) return;

      // الوقت الحالي
      const now = new Date();

      // وقت الصلاة
      let [hour, minute] = time.split(":").map(Number);
      let prayerTime = new Date();
      prayerTime.setHours(hour, minute, 0, 0);

      // لو الوقت عدى → نخليها لليوم التاني
      if (prayerTime < now) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }

      // الفرق بالثواني
      const diff = Math.floor((prayerTime - now) / 1000);
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      setRemaining(`${h} س ${m} د ${s} ث`);
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [time]);

  function formatTime(time) {
  if (!time) return "";

  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  
  if (hour === 0) {
    return `12:${minute} صباحًا`;
  } else if (hour < 12) {
    return `${hour}:${minute} صباحًا`;
  } else if (hour === 12) {
    return `12:${minute} مساءً`;
  } else {
    return `${hour - 12}:${minute} مساءً`;
  }
}

    return(
        <div className="prayer">
          <h6>{title}</h6>
          <p>يتبقى ({remaining})</p>
          <p>{formatTime(time)}</p>
        </div>
    )
}
export default Prayer;