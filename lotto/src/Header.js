// import React from "react";
import React,{useState, useEffect} from "react";
import axios from "axios";

const Header = () => {
  const [datatWeeks, setData] = useState([])
    useEffect(()=>{
      axios.get("https://lotto.c4ei.net/api/week")
      .then( 
        reponse => {
          setData(reponse.data);
          // console.log(reponse.data);
        }
      )
      .catch( err => console.log(err) );
  },[]);
// console.log(datatWeeks.map(dtweek => dtweek[0].yyyyw))
  return (
    <header>
      {/* {datatWeeks.map(dtweek => dtweek.yyyyw)} */}
      {datatWeeks && <h1> {
        JSON.stringify(datatWeeks, null, 2)
        // JSON.parse(JSON.stringify(datatWeeks, null, 2))[0]
      } 
      Lotto 6/45 </h1>}
    </header>
  );
};

export default Header;
