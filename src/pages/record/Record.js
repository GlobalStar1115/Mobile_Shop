import {
	IonTitle,
	IonCard,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonPage,
	useIonLoading,
	IonRouterLink,
	IonRow,
	IonToolbar,
	IonToast,
	IonGrid
} from '@ionic/react'
import styles from './Record.module.scss'

import { useTranslation } from 'react-i18next'

import { GetGrabOrderApi, SubmitOrderApi, InfoApi } from '../../request/api'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
const Record = () => {
	const { t, i18n } = useTranslation('lang')
	const [orderArr, setOrderArr] = useState([])
	const [assets, setAssets] = useState({})
	const [showToast, setShowToast] = useState(false)
	const [present, dismiss] = useIonLoading();
	const [color, setColor] = useState('primary')
	const history = useHistory()
	useEffect(() => {
		if (localStorage.getItem('Authorization') === null) history.push('/login')

		present({
			message: 'Loading...',
			duration: 1000,
			spinner: 'bubbles'
		})

		InfoApi().then(res => {
			if (res.code === 200) {
				setAssets(res.data.assets)
			}
		})
		const paramsData = `status=0`
		getGrabOrderApi(paramsData)
	}, [])

	const radioChange = status => {
		getGrabOrderApi(`status=${status}`)
	}

	const getGrabOrderApi = status => {
		GetGrabOrderApi(status).then(res => {
			// console.log(status, res.data)
			if (res.code === 200) {
				const { data } = res
				data.map(item => {
					const lang = localStorage.getItem('language-id') || 'en'
					let nameList = item.goodsName.replace(/\{/g, '').replace(/\}/g, '').substring(1)
					nameList = nameList.substring(0, nameList.length - 1).split('","')
					const showName = nameList.filter(item => {
						return item.indexOf(lang) !== -1
					})
					item.showName = showName.join('').split(':')[1].replace(/\'/g, '').replace(/\"/g, '')
					return item
				})
				setOrderArr(res.data)
			}
		})
	}

	const loadingData = () => {
		present({
			message: 'Loading...',
			duration: 1000,
			spinner: 'bubbles'
		})
	}

	const submitOrder = id => {
		SubmitOrderApi({ id }).then(res => {
			if (res.code === 200) {
				setTimeout(() => {
					loadingData()
				}, 0)
				setShowToast(true)
				setColor('primary')
				setTimeout(() => {
					window.location.reload(false);
				}, 1000)
			}
		})
	}

	return (
		<IonPage className={styles.recordPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2"></IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('record.title')}</h4>
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
				<div className={styles.wrapperContent}>
					<div className={styles.tabBox}>
						<div className={styles.tabPart}>
							<input
								type="radio"
								name="css-tabs"
								id="tab-1"
								onChange={() => {
									radioChange('0')
								}}
								defaultChecked
								className={styles.tabSwitch}
							/>
							<label htmlFor="tab-1" className={styles.tabLabel} onClick={() => {
								present({
									message: 'Loading...',
									duration: 2000,
									cssClass: 'bubbles'
								})
							}}>
								{t('record.status-processing')}
							</label>
							<div className={styles.tabContent}>
								<IonGrid>
									<span>{t('record.account-amount')}:</span>
									<h2 className="main-number">$ {typeof assets.availableBalance === 'number' ? assets.availableBalance.toFixed(2) : assets.availableBalance}</h2>
								</IonGrid>
								{orderArr.map((item, index) => {
									return (
										<IonCard className="main-radius ion-no-margin ion-padding" key={index}>
											<IonRow className="ion-justify-content-between">
												<span>{item.createTime}</span>
												<span className={styles.recordStatus}>{t('record.status-processing')}</span>
											</IonRow>
											<IonRow className={`ion-align-items-center ${styles.productInfo}`}>
												<IonCol size="3">
													<IonImg src={item.goodsPicUrl} alt="product" />
												</IonCol>
												<IonCol size="9">
													<h6 className="">{item.showName}</h6>
												</IonCol>
											</IonRow>
											<IonRow >
												<span className={styles.cardInfoItem}>{t('record.order-amount')}</span>
												<span className="main-number">$ {item.goodsPrice.toFixed(2)}</span>
											</IonRow>
											<IonRow >
												<span className={styles.cardInfoItem}>{t('record.commission')}</span>
												<span className="main-number">$ {item.commissionAmount.toFixed(2)}</span>
											</IonRow>
											<IonRow>
												<span className={styles.cardInfoItem}>{t('record.returned-amount')}</span>
												<span className="main-number">$ {item.tradeAmount.toFixed(2)}</span>
											</IonRow>
											<div
												onClick={() => submitOrder(item.id)}
												className="ion-margin-top ion-margin-bottom"
												expand="block"
											>
												{t('order.submit-order')}
											</div>
										</IonCard>
									)
								})}
								{orderArr.length == 0 ? <h4 style={{ textAlign: 'center', color: 'white' }}>{t('common-text.no-data')}</h4> : null}
							</div>
						</div>
						<div className={styles.tabPart}>
							<input
								type="radio"
								name="css-tabs"
								id="tab-2"
								className={styles.tabSwitch}
								onChange={() => {
									radioChange('2')
								}}
							/>
							<label htmlFor="tab-2" className={styles.tabLabel} onClick={() => {
								present({
									message: 'Loading...',
									duration: 3000,
									cssClass: 'bubbles'
								})
							}}>
								{t('record.status-completed')}
							</label>
							<div className={styles.tabContent}>
								<IonGrid>
									<span>{t('record.account-amount')}:</span>
									<h2 className="main-number">$ {typeof assets.availableBalance === 'number' ? assets.availableBalance.toFixed(2) : assets.availableBalance}</h2>
								</IonGrid>
								{orderArr.map((item, index) => {
									return (
										<IonCard className="main-radius ion-no-margin ion-padding" key={index}>
											<IonRow className="ion-justify-content-between">
												<span>{item.createTime}</span>
												<span className={styles.recordStatus}>{t('record.status-completed')}</span>
											</IonRow>
											<IonRow className={`ion-align-items-center ${styles.productInfo}`}>
												<IonCol size="3">
													<IonImg src={item.goodsPicUrl} alt="product" />
												</IonCol>
												<IonCol size="9">
													<h6 className="">{item.showName}</h6>
												</IonCol>
											</IonRow>
											<IonRow >
												<span className={styles.cardInfoItem}>{t('record.order-amount')}</span>
												<span className="main-number">$ {item.goodsPrice.toFixed(2)}</span>
											</IonRow>
											<IonRow >
												<span className={styles.cardInfoItem}>{t('record.commission')}</span>
												<span className="main-number">$ {item.commissionAmount.toFixed(2)}</span>
											</IonRow>
											<IonRow>
												<span className={styles.cardInfoItem}>{t('record.returned-amount')}</span>
												<span className="main-number">$ {item.tradeAmount.toFixed(2)}</span>
											</IonRow>
										</IonCard>
									)
								})}
								{orderArr.length == 0 ? <h4 style={{ textAlign: 'center', color: 'white' }}>{t('common-text.no-data')}</h4> : null}
							</div>
						</div>
						<div className={styles.tabPart}>
							<input
								type="radio"
								name="css-tabs"
								id="tab-3"
								className={styles.tabSwitch}
								onChange={() => {
									radioChange('1')
								}}
							/>
							<label htmlFor="tab-3" className={styles.tabLabel} onClick={() => {
								present({
									message: 'Loading...',
									duration: 2000,
									cssClass: 'bubbles'
								})
							}}>
								{t('record.status-freezing')}
							</label>
							<div className={styles.tabContent}>
								<IonGrid>
									<span>{t('record.account-amount')}:</span>
									<h2 className="main-number">$ {typeof assets.availableBalance === 'number' ? assets.availableBalance.toFixed(2) : assets.availableBalance}</h2>
								</IonGrid>
								{orderArr.map((item, index) => {
									return (
										<IonCard className="main-radius ion-no-margin ion-padding" key={index}>
											<IonRow className="ion-justify-content-between">
												<span>{item.createTime}</span>
												<span className={styles.recordStatus}>{t('record.status-freezing')}</span>
											</IonRow>
											<IonRow className={`ion-align-items-center ${styles.productInfo}`}>
												<IonCol size="3">
													<IonImg src={item.goodsPicUrl} alt="product" />
												</IonCol>
												<IonCol size="9">
													<h6 className="">{item.showName}</h6>
												</IonCol>
											</IonRow>
											<IonRow >
												<span className={styles.cardInfoItem}>{t('record.order-amount')}</span>
												<span className="main-number">$ {item.goodsPrice.toFixed(2)}</span>
											</IonRow>
											<IonRow >
												<span className={styles.cardInfoItem}>{t('record.commission')}</span>
												<span className="main-number">$ {item.commissionAmount.toFixed(2)}</span>
											</IonRow>
											<IonRow>
												<span className={styles.cardInfoItem}>{t('record.returned-amount')}</span>
												<span className="main-number">$ {item.tradeAmount.toFixed(2)}</span>
											</IonRow>
										</IonCard>
									)
								})}
								{orderArr.length == 0 ? <h4 style={{ textAlign: 'center', color: 'white' }}>{t('common-text.no-data')}</h4> : null}
							</div>
						</div>
					</div>
				</div>
			</IonContent>
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message="Successed submit"
				duration={2000}
				color={color}
			/>
		</IonPage>
	)
}

export default Record
