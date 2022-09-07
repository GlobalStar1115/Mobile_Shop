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

import { GrabOrderApi, SubmitOrderApi, InfoApi, PresetOrderApi } from '../../request/api'

import { setShowName } from '../../data/utils'

const Order = () => {
	const { t, i18n } = useTranslation('lang')
	const [slider, setSlider] = useState(false)

	const [showDialog, setShowDialog] = useState(false)
	const [animationList, setAnimationList] = useState([])
	const [orderData, setOrderData] = useState({})
	const [assets, setAssets] = useState({})
	const [presetArr, setPresetArr] = useState([])

	const [showToast, setShowToast] = useState(false)
	const [message, setMessage] = useState('')
	const [color, setColor] = useState('danger')

	const beginOrder = () => {
		GrabOrderApi().then(res => {
			// console.log(res)
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
				// setColor('danger')
				// setShowToast(true)
			}
		})
	}

	PresetOrderApi().then(res => {
		// console.log(res)
		if (res.code === 200) {
			let lang = localStorage.getItem('language-id')
			if (lang == "") lang = "en"
			res.goodsList.map((item, index) => {
				res.goodsList[index].title = JSON.parse(item.title)[lang]
			})
			// console.log(res.goodsList)
			setPresetArr(res.goodsList)
			// console.log(lang)
		}
	})

	const submitOrder = () => {
		SubmitOrderApi({ id: orderData.id }).then(res => {
			// console.log(res)
			if (res.code === 200) {
				setShowDialog(false)
				setMessage(res.msg)
				setColor('primary')
				setShowToast(true)
			} else {
				setShowDialog(false)
				setMessage(res.msg)
				// setColor('danger')
				// setShowToast(true)
			}
		})
	}

	useEffect(() => {
		InfoApi().then(res => {
			// console.log(res)
			if (res.code === 200) {
				const { member, assets } = res.data
				// setMember(member)
				setAssets(assets)
			}
		})
		setTimeout(() => {
			setSlider(true)
		}, 100)
	}, [])

	return (
		<IonPage className={styles.orderPage}>
			{showDialog && (
				<Dialog hideDialog={() => setShowDialog(!showDialog)} hide={false}>
					<div style={{ padding: '10px' }}>
						<h3>{t('order.order-submission')}</h3>
						<p>{t('order.order-time')}:&nbsp;{orderData.createTime}</p>
						<p>{t('order.order-number')}:&nbsp;{orderData.orderSn}</p>
						<div style={{ display: 'flex', backgroundColor: '#2a353e' }}>
							<img src={orderData.goodsPicUrl} style={{ width: '77px', height: '77px', padding: '10px' }} />
							<div style={{ padding: '10px', fontSize: '12px' }}>{orderData.showName}</div>
						</div>
						<IonRow style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '10px' }}>
							<div>{t('order.total-order')}</div>
							<div>{orderData.goodsPrice}</div>
						</IonRow>
						<IonRow style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
							<div>{t('order.commission')}</div>
							<div>{orderData.commissionAmount}</div>
						</IonRow>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
							<button
								onClick={() => setShowDialog(false)}
								style={{ padding: '8px 15px', fontSize: '18px', marginRight: '10px', borderRadius: '30px' }}
							>
								{t('order.cancel')}
							</button>
							<button
								onClick={submitOrder}
								style={{
									padding: '8px 15px',
									fontSize: '18px',
									marginLeft: '10px',
									borderRadius: '30px',
									background: '#4397f6',
									color: '#fff'
								}}
							>
								{t('order.submit-order')}
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
							<h4 className="main-number ion-no-margin">$ {typeof assets.availableBalance === 'number' ? assets.availableBalance.toFixed(2) : assets.availableBalance
							}</h4>
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
							<div className={`main-number ${styles.roundedNumber}`}>{assets.grabOrderNumber}</div>
							<span className="main-number"> / </span>
							<span className="main-number">60</span>
						</IonRow>
					</IonRow>
					{slider ? <OrderSlider list={animationList} arr={presetArr} /> : ''}
				</IonCard>
				<div className={`text-white ${styles.orderList}`}>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.get-commission')}</span>
						<span className="main-number">$ {typeof assets.commissionAmountByToday === 'number' ? assets.commissionAmountByToday.toFixed(2) : assets.commissionAmountByToday}</span>
					</div>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.freeze-amount')}</span>
						<span className="main-number">$ {typeof assets.lockBalance === 'number' ? assets.lockBalance.toFixed(2) : assets.lockBalance}</span>
					</div>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.quantity-order')}</span>
						<span className="main-number">{assets.grabOrderNumber}</span>
					</div>
					<div className="d-flex ion-justify-content-between ion-align-items-center" style={{ display: 'flex' }}>
						<span>{t('order.enable-amount')}</span>
						<span className="main-number">$ {typeof assets.availableBalance === 'number' ? assets.availableBalance.toFixed(2) : assets.availableBalance}</span>
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
