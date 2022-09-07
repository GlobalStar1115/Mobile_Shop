import { IonImg } from '@ionic/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCards, Autoplay } from 'swiper'
import { useTranslation } from 'react-i18next'
import 'swiper/swiper.min.css'

import 'swiper/modules/effect-cards/effect-cards.scss'
import './Order.scss'
import { useEffect } from 'react'

export default props => {
	const { t, i18n } = useTranslation('lang')
	const { list } = props
	const { arr } = props
	SwiperCore.use([Autoplay])
	return (
		<Swiper
			effect={'cards'}
			// grabCursor={true}
			modules={[Autoplay, EffectCards]}
			loop={true}
			autoplay={{
				delay: 1300,
			}}
			className="orderSwiper"
		>
			{arr.length == 0 ? (
				<SwiperSlide>
					<IonImg src="/assets/images/product/1.png" alt="product" />
					<h4>{t('order.product-name')}</h4>
				</SwiperSlide>
			) : (
				arr.map((item, index) => {
					return (
						<SwiperSlide key={index}>
							<IonImg src={item.coverUrl} alt="product" />
							<div style={{ fontSize: '12px' }}>{item.title}</div>
						</SwiperSlide>
					)
				})
			)}
		</Swiper>
	)
}
