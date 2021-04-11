import React from 'react';
import styled from 'styled-components';

const PreviewImg  = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 1em;
  object-fit: cover;
`;

const ImagePre = (props) => {
 return(
  <div>
  <PreviewImg onClick={() => props.delete(props.id)} src={props.path} alt="商品画像"/>
</div>
 )
}

export default ImagePre;