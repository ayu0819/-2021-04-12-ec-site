import React from 'react';
import NoImage from '../../assets/img/no_image.png';
import styled from 'styled-components';

const Image = styled.div`
  position: relative;
    overflow: hidden;
    width: 500px;
    height: 500px;
    ::before {
    content: "";
    display: block;
    padding-top: 100%;
    }
    img {
        position: absolute;
    object-fit: cover;
    object-position: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 500px;
    object-fit: cover;
    }
`;

    const UserImage = (props) => {
        const images = props.images;
        return (
        <>
             {images.length === 0 ? (
                <Image>
                     <img src={NoImage} alt="no image" />
                </Image>
            ) : (
                images.map(image => (
                    <Image>
                       <img src={image.path} alt="商品画像" />
                    </Image>
            ))
            )}
        </>
        )
}

export default UserImage;