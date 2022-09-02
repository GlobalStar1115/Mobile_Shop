import React, { Component } from 'react'
import Slider from 'react-slick'
import { IonImg } from '@ionic/react'
import './homestyles1.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { CarouselImageApi } from '../../request/api'
export default class CenterMode extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imageArr: []
		}
	}

	componentDidMount() {
		CarouselImageApi().then(res => {
			if (res.code === 200) {
				this.setState({ imageArr: res.data })
			}
		})
	}

	render() {
		let { imageArr } = this.state
		const settings = {
			// className: 'center',
			// centerMode: true,
			infinite: true,
			slidesToShow: 1,
			// centerPadding: '60px',
			// dots: true,
			autoplay: true,
			speed: 1000,
			autoplaySpeed: 2500
		}
		return (
			<div className="slider-body">
				<Slider {...settings}>
					{imageArr.map((image, index) => {
						return (
							<div key={index} className="slider-item">
								<IonImg src={image.imgUrls} />
							</div>
						)
					})}
				</Slider>
			</div>
		)
	}
}
