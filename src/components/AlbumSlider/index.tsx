import React, { FC } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import styled from 'styled-components';
import isEmpty from 'lodash/fp/isEmpty';

import { DEFAULT_IMAGE_URL } from './constants';

import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

const AlbumImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 480px;
  border-radius: 10px;
`;

const AlbumSlider: FC<{ album: string[] }> = ({ album }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={25}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      scrollbar={{ draggable: true }}
      style={{ borderRadius: 10 }}
    >
      {isEmpty(album) && (
        <SwiperSlide style={{ textAlign: 'center' }}>
          <AlbumImage src={DEFAULT_IMAGE_URL} />
        </SwiperSlide>
      )}
      {album.map((item, index) => (
        <SwiperSlide key={`detail-img-${index}`} style={{ textAlign: 'center' }}>
          <AlbumImage src={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AlbumSlider;
