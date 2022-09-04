import {
	IonTitle,
	IonCard,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonPage,
	IonRouterLink,
	IonRow,
	IonToolbar,
	IonButton,
	IonToast
} from '@ionic/react'
import styles from './Order.module.scss'

import { chatboxEllipsesOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'
import OrderSlider from '../../components/slider/OrderSlider'
import Dialog from '../../components/dialog/Dialog'
import { useState, useEffect } from 'react'

import { GrabOrderApi, SubmitOrderApi } from '../../request/api'

import { setShowName } from '../../data/utils'

const Order = () => {
	const { t, i18n } = useTranslation('lang')
	const [slider, setSlider] = useState(false)

	const [showDialog, setShowDialog] = useState(false)
	const [animationList, setAnimationList] = useState([])
	const [orderData, setOrderData] = useState({})

	const [showToast, setShowToast] = useState(false)
	const [message, setMessage] = useState('')
	const [color, setColor] = useState('danger')

	const beginOrder = () => {
		GrabOrderApi().then(res => {
			console.log(res)
			if (res.code === 200) {
				const { animationDuration, goodsListByAnimation, toBeProcessedRecord, animationResult } = res.result
				goodsListByAnimation &&
					goodsListByAnimation.map(item => {
						return setShowName(item, 'title')
					})
				setOrderData(setShowName(animationResult || toBeProcessedRecord, 'goodsName'))
				setAnimationList(goodsListByAnimation || [])
				setTimeout(() => {
					setShowDialog(true)
				}, animationDuration)
			} else {
				setMessage(res.msg)
				setColor('danger')
				setShowToast(true)
			}
		})
	}

	const submitOrder = () => {
		SubmitOrderApi({ id: orderData.id }).then(res => {
			console.log(res)
			if (res.code === 200) {
				setShowDialog(false)
				setMessage(res.msg)
				setColor('primary')
				setShowToast(true)
			} else {
				setShowDialog(false)
				setMessage(res.msg)
				setColor('danger')
				setShowToast(true)
			}
		})
	}

	useEffect(() => {
		setTimeout(() => {
			setSlider(true)
		}, 100)
	}, [])

	return (
		<IonPage className={styles.orderPage}>
			{showDialog && (
				<Dialog hideDialog={() => setShowDialog(!showDialog)} hide={false}>
					<div style={{ padding: '10px' }}>
						<h3>订单提交</h3>
						<p>抢单时间:&nbsp;{orderData.createTime}</p>
						<p>订单号:&nbsp;{orderData.orderSn}</p>
						<div style={{ display: 'flex', backgroundColor: '#f2f2f2' }}>
							<img src={orderData.goodsPicUrl} style={{ width: '77px', height: '77px', padding: '10px' }} />
							<div style={{ padding: '10px', fontSize: '12px' }}>{orderData.showName}</div>
						</div>
						<IonRow style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div>订单总额</div>
							<div>{orderData.goodsPrice}</div>
						</IonRow>
						<IonRow style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div>佣金</div>
							<div>{orderData.commissionAmount}</div>
						</IonRow>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<button
								onClick={() => setShowDialog(false)}
								style={{ width: '60px', height: '40px', fontSize: '18px', marginRight: '10px', borderRadius: '30px' }}
							>
								取消
							</button>
							<button
								onClick={submitOrder}
								style={{
									width: '100px',
									height: '40px',
									fontSize: '18px',
									marginLeft: '10px',
									borderRadius: '30px',
									background: '#4397f6',
									color: '#fff'
								}}
							>
								提交订单
							</button>
						</div>
					</div>
				</Dialog>
			)}
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2"></IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('order.title')}</h4>
						</IonCol>
						<IonCol size="2">
							<IonRouterLink routerLink="/system-notice">
								<IonImg src="/assets/images/laba@2x.png" />
							</IonRouterLink>
						</IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonCard className={`${styles.orderCard}`}>
					<IonRow className="ion-justify-content-end">
						<IonImg src="/assets/images/what.png" alt="tooltip" />
					</IonRow>
					<IonRow className={`ion-justify-content-between ion-margin-bottom ${styles.cardDetail}`}>
						<IonImg src="/assets/images/home/01@2x.png" alt="badge" />
						<div>
							<span>{t('order.account-amount')}:</span>
							<h4 className="main-number ion-no-margin">$ 1223.123</h4>
							<IonRow className="ion-align-items-center">
								<span className="ion-margin-end">{t('order.ordinary-member')}:</span>
								<span>
									{t('order.commission')} 0.4% | 60 {t('order.order')}
								</span>
							</IonRow>
						</div>
						<IonRow
							className={`ion-justify-content-center ion-margin-bottom ion-align-items-center ion-margin-top ${styles.orderAmount}`}
						>
							<div className={`main-number ${styles.roundedNumber}`}>22</div>
							<span className="main-number"> / </span>
							<span className="main-number">60</span>
						</IonRow>
					</IonRow>
					{slider ? <OrderSlider list={animationList} /> : ''}
				</IonCard>
				<div className={`text-white ${styles.orderList}`}>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.get-commission')}</span>
						<span className="main-number">$ 56.23</span>
					</div>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.freeze-amount')}</span>
						<span className="main-number">$ 1256.23</span>
					</div>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.quantity-order')}</span>
						<span className="main-number">12</span>
					</div>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.enable-amount')}</span>
						<span className="main-number">$ 1256.23</span>
					</div>
				</div>
				<IonButton onClick={beginOrder} className="custom-button ion-padding-top ion-margin-bottom" expand="block">
					{t('order.start-order')}
				</IonButton>
			</IonContent>
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message={message}
				duration={2000}
				color={color}
			/>
		</IonPage>
	)
}

export default Order
