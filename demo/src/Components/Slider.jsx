import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Slider() {
  return (
    <Carousel className='slider'>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://file.hstatic.net/200000420363/file/sli-nang-cap-ram-9k__1__476180a506a94f4ab38d2d9cee9ca1c6.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>

      <img
          className="d-block w-100"
          src="https://file.hstatic.net/200000420363/file/sli-he-ruc-chay_e1f40a85e4db47fa85f0025dcbcf2e52.jpg"
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://file.hstatic.net/200000420363/file/sli_fix_tiep-suc-mua-thi-z__1__2c9182b56c0d495ab4872bc9e117b136.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
export default Slider