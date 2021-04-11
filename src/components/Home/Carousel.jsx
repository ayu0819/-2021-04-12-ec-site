import React from 'react';
import ReactIdSwiperCustom from 'react-id-swiper/lib/ReactIdSwiper.custom';
import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm';
import 'swiper/css/swiper.css';
import styled from 'styled-components';
import banner1 from '../../assets/img/banner-1.jpg';
import banner2 from '../../assets/img/banner-2.jpg';
import banner3 from '../../assets/img/banner-3.jpg';

const Image = styled.div`
  position: relative;
    overflow: hidden;
    width: 300px;
    height: 300px;
    margin: 0 1em;
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
    width: 300px;
    height: 300px;
    object-fit: cover;
    }
`;

    const Carousel = (props) => {
        const params = {
            // Provide Swiper class as props
            Swiper,
            // Add modules you need
            modules: [Navigation, Pagination],
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            spaceBetween: '1em',
            loop: true
          }

        return (
            <div className="common__item">
            <div className="common__center">
            <ReactIdSwiperCustom {...params}>
            <Image><img src={banner1} /></Image>
            <Image><img src={banner2} /></Image>
            <Image><img src={banner3} /></Image>
          </ReactIdSwiperCustom>
          </div>
          </div>
        )
}

export default Carousel;