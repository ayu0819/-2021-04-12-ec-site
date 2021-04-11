import React,{useState} from 'react';

const TimeText = (props) => {
    const [count, setCount] = useState(0);
    const [time,  setTime] = useState();
    // ナンバーの関数
    const handleClick = () => {
		// Hooksを用いているのでthisを使わなくてもstateを参照できる
    setCount(() => count + 1);
  };

  // Time
  const TimeText = () => {

  }
      


 return(
  <>
    {/* count */}
    {/* <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>+1</button>
    </div> */}

    {/* time */}
    <div>

    </div>

    
  </>
 )
}

export default TimeText;
