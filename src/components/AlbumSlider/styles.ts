import { Swiper } from 'swiper/react/swiper-react';
import styled from 'styled-components';

export const CustomSwiper = styled(Swiper)`
.swiper-button-prev,
.swiper-button-next {
  height: 24px;
  width: 24px;
  padding: 6px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);

  &::after {
    color: #e5e5e5;
    font-size: 1rem;
  }
}

.swiper-pagination {
  padding: 6px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.3);
}

.swiper-pagination-bullet.swiper-pagination-bullet-active-main {
  background: rgb(126, 197, 254);
}
`;

export const AlbumImage = styled.img`
display: block;
object-fit: cover;
width: 100%;
height: 480px;
border-radius: 10px;
`;
