import React,{useState}  from 'react';

const ToggleButton = (props) => {
    const [power, setPower] = useState(null);
 return(
     <div>
      <h1>{ power ? 'テキスト' : ''} </h1>
      <button onClick={() => setPower(prevState => !prevState)}>もっと見る</button>
     </div>
 )
}

export default ToggleButton;