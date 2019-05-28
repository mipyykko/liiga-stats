import React from 'react'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import Slider from 'react-slick'
import { useStyles } from './styles'
import { Match } from './Match'

export const MatchSlider = React.memo(({ matches, selected, slider, setSlider, onMatchClick }) => (
  <Slider
      ref={t => setSlider(t)}
      {...sliderSettings(slider)}
  >
    {(matches || []).map(match => (
      <React.Fragment key={`${match.id}`}>
        <Match
          match={match}
          selected={match.id === selected}
          onClick={onMatchClick} 
        />
      </React.Fragment>
    ))}
  </Slider>
))

const SliderArrow = React.memo((props) => {
  const { currentSlide, slideCount, className, onClick, slider, direction } = props

  const slidesToShow = slider 
    ? ((slider.props.responsive.find(p => p.breakpoint === slider.state.breakpoint) || {}).settings || slider.props).slidesToShow 
    : null
  const disabled = direction === 'right' 
    ? slidesToShow 
      ? currentSlide + slidesToShow >= slideCount : false 
      : currentSlide === 0
  const classes = useStyles({ disabled })

  const Component = direction === 'right' ? ArrowRight : ArrowLeft

  return <Component className={`${className} ${classes.arrow}`} onClick={onClick} />
})

const sliderSettings = (slider) => ({
  slidesToShow: 6,
  slidesToScroll: 5,
  focusOnSelect: true,
  infinite: false,
  dots: false,
  nextArrow: <SliderArrow direction={'right'} slider={slider} />,
  prevArrow: <SliderArrow direction={'left'} slider={slider} />,
  swipeToSlide: true,
  //lazyLoad: 'progressive',
  centerPadding: '20px',
  rows: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2
      }
    }
  ]
})
