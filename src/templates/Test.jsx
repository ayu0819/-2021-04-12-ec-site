import React,{useState} from 'react';
// import {useDispatch} from 'react-redux';
import {DropDownNavbar} from '../components/common';
import {ImageUpload} from '../components/UIkit';
import {ProductOther,Loading,ImageUp} from '../components/UIkit';
import {Carousel} from '../components/Home';
import {TimeText,TestButtonModal,NotificationBar,TestNot,ColorChange} from '../components/User';


const Test = (props) => {
  // const dispatch = useDispatch();
  const [images, setImages] = useState("");

 return(
  <div>
    {/* <DropDownNavbar /> */}
    {/* <ImageUpload /> */}
    {/* <ProductOther /> */}
    {/* <Carousel /> */}
    {/* <TimeText> */}
    {/* <TestButtonModal /> */}
    {/* <NotificationBar /> */}
    {/* <TestNot/> */}
    {/* <ColorChange /> */}
    {/* <Loading /> */}


    <ImageUp images={images} setImages={setImages} />
  </div> 
 )
}

export default Test;



