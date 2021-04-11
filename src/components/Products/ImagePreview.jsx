import React from 'react';
import styled from 'styled-components';

const PreviewImg  = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 1em;
  object-fit: cover; /* この一行を追加するだけ！ */
`;

const ImagePreview = (props) => {
  
 return(
  <div onClick={() => props.delete(props.id)}>
      <PreviewImg src={props.path} alt="商品画像"/>
  </div>
 )
}

export default ImagePreview;