import React, { useEffect } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { EffectCards } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../actions/itemActions';
import { useNavigate } from 'react-router-dom';
import {
  HiStar,
  HiCheckBadge,
  HiAcademicCap,
  HiCake,
  HiHome,
  HiMiniPhone
} from 'react-icons/hi2';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function PageSelectMentor() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item);
  const swiper = useSwiper();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getItem());
  }, []);

  // render star rating based on number 1 to 5
  function renderRating(rating) {
    return (
      <div className='flex'>
        <HiStar
          className={rating >= 1 ? 'text-yellow-500' : 'text-slate-500'}
        />
        <HiStar
          className={rating >= 2 ? 'text-yellow-500' : 'text-slate-500'}
        />
        <HiStar
          className={rating >= 3 ? 'text-yellow-500' : 'text-slate-500'}
        />
        <HiStar
          className={rating >= 4 ? 'text-yellow-500' : 'text-slate-500'}
        />
        <HiStar
          className={rating >= 5 ? 'text-yellow-500' : 'text-slate-500'}
        />
      </div>
    );
  }

  return (
    <div className='container p-4 mx-auto'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Pagination, Navigation]}
        navigation={true}
        pagination={{ clickable: true }}
        className='w-[800px] h-[400px]'
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        activeSlideKey={1}>
        {items.items.map((item, i) => (
          <SwiperSlide
            key={i}
            onClick={() => navigate(`./${item._id}/checkout`)}>
            <div className='p-4 bg-white rounded-md shadow-md'>
              <div>
                <div className='flex items-start justify-between'>
                  <h1 className='text-3xl font-bold text-slate-800'>
                    {item.mentorName}
                  </h1>
                  <div className='flex items-center gap-2'>
                    {renderRating(item.rating)}
                  </div>
                </div>
                <div className='flex flex-wrap items-center'>
                  <div className='flex items-center w-1/2 gap-2 font-normal'>
                    <HiCheckBadge className='text-dark' />
                    <span className='text-slate-500'>Verified Mentor</span>
                  </div>
                  <div className='flex items-center w-1/2 gap-2 font-normal'>
                    <HiAcademicCap className='text-dark' />
                    <span className='text-slate-500'>
                      Computer Science, Klabat University, GPA 3.97
                    </span>
                  </div>
                  <div className='flex items-center w-1/2 gap-2 font-normal'>
                    <HiCake className='text-dark' />
                    <span className='text-slate-500'>21 Years Old</span>
                  </div>
                  <div className='flex items-center w-1/2 gap-2 font-normal'>
                    <HiHome className='text-dark' />
                    <span className='text-slate-500'>Airmadidi</span>
                  </div>
                  <div className='flex items-center w-1/2 gap-2 font-normal'>
                    <HiMiniPhone className='text-dark' />
                    <span className='text-slate-500'>+6281278276034</span>
                  </div>
                </div>
              </div>
              <h2 className='m-0 mt-4 text-sm font-bold leading-none text-dark'>
                Description
              </h2>
              <p className='text-slate-500'>{item.description}</p>
              <div className='flex justify-end'>
                <div className='flex flex-col items-end justify-end'>
                  <span>Price</span>
                  <h1 className='font-bold leading-none'>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(item.price)}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
