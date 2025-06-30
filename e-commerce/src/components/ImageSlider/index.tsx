import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { Image } from 'antd'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IImageSlider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[]
  vertical: boolean
  verticalSwiping: boolean
  slidesToShow: number
  dots: boolean
  setCurrentProductImage: (value: string) => void
}
const ImageSlider: React.FC<IImageSlider> = ({images, vertical, verticalSwiping, slidesToShow, dots, setCurrentProductImage}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    dots: dots,
    infinite: false,
    speed: 300,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    vertical: vertical,
    verticalSwiping: verticalSwiping,
    arrows: false,
  }
  
  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };


  return (
    <div className="image-slider-container">
      <div className="thumbnail-slider">
        <div className="arrow-button-up" onClick={goToPrev}>
          <UpOutlined />
        </div>
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
          {images?.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedIndex === index ? "active" : ""}`}
              onClick={() => {
                  setSelectedIndex(index)
                  setCurrentProductImage(image)
                }
              }
            >
              <Image preview={false} src={image} className="thumbnail-image" />
            </div>
          ))}
        </Slider>
        <div className="arrow-button-down" onClick={goToNext}>
          <DownOutlined />
        </div>
      </div>
    </div>
  )
}

export default ImageSlider