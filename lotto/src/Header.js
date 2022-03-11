import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
const Header = () => { 
	const [jsDt, setData] = useState('');
	useEffect(() => {axios.get('https://lotto.c4ei.net/api/week').then(res => setData(res))}, []);
 
  if(jsDt){
    return ( <h1> {jsDt.data[0].yyyyw} Lotto 6/45 </h1> );
  } else {
    return ( <h1> Lotto 6/45 </h1> );
  }
};
export default Header;
