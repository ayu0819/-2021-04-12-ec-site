import React from 'react';
import Swiper from 'react-id-swiper';
import NoImage from '../../assets/img/no_image.png';
import 'swiper/css/swiper.css';
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

    const ImageSwiper = (props) => {
        const [params] = React.useState({
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable : true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            loop: true
        })
   
        const images = props.images;
        return (
            <Swiper {...params}>
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
          </Swiper>
        )
}

export default ImageSwiper;