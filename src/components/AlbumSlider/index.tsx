import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { SwiperSlide } from 'swiper/react/swiper-react';
import isEmpty from 'lodash/fp/isEmpty';

import { DEFAULT_IMAGE_URL } from 'common/constants';

import { AlbumImage, CustomSwiper } from './styles';

import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

const AlbumSlider: React.FC<{ album: string[] }> = ({ album }) => {
  return (
    <CustomSwiper
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
    </CustomSwiper>
  );
};

export default AlbumSlider;
