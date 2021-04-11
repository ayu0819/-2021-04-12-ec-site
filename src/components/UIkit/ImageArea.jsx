import React from 'react';
import NoImage from '../../assets/img/no_image.png';

const ImageArea = (props) => {
    const images = (props.images.length > 0) ? props.images : [{path:NoImage}]
 
 return(
     <div>
        <img
            src={images[0].path}
            alt=""
            />
     </div>
 )
}

export default ImageArea;
