import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HomePage from './Home';
import TimerPage from '../components/ui/PageTimer';

const HomeCarousel = () => (
  <div className="h-screen">
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      className="h-full"
    >
      {/* TimerPage: Non-scrollable */}
      <SwiperSlide>
        <div className="h-full overflow-hidden">
          <TimerPage />
        </div>
      </SwiperSlide>

      {/* HomePage: Scrollable */}
      <SwiperSlide>
        <div className="h-full overflow-y-auto">
          <HomePage />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
);

export default HomeCarousel;
