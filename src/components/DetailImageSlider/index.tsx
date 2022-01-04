import React, { FC } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import styled from 'styled-components';

import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

const DetailImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const DetailImageSlider: FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={25}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      scrollbar={{ draggable: true }}
      style={{ borderRadius: 15 }}
    >
      {imageUrls.map(
        (item, index) => (
          <SwiperSlide key={`detail-img-${index}`} style={{ textAlign: 'center' }}>
            <DetailImage src={item} />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};

export default DetailImageSlider;
