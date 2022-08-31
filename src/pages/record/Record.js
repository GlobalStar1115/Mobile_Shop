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
	IonGrid
} from '@ionic/react'
import styles from './Record.module.scss'

import { chatboxEllipsesOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'

import { GetGrabOrderApi, SubmitOrderApi } from '../../request/api'
import { useEffect, useState } from 'react'

const Record = () => {
	const { t, i18n } = useTranslation('lang')
	const [orderArr, setOrderArr] = useState([])

	useEffect(() => {
		const paramsData = `status=0`
		getGrabOrderApi(paramsData)
	}, [])

	const radioChange = status => {
		getGrabOrderApi(`status=${status}`)
	}

	const getGrabOrderApi = status => {
		GetGrabOrderApi(status).then(res => {
			console.log(status, res.data)
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

	const submitOrder = id => {
		SubmitOrderApi({ id }).then(res => {
			if (res.code === 200) {
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
							<IonRouterLink routerLink="/app/home">
								<IonIcon icon={chatboxEllipsesOutline} />
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
							<label htmlFor="tab-1" className={styles.tabLabel}>
								{t('record.status-processing')}
							</label>
							<div className={styles.tabContent}>
								<IonGrid>
									<span>{t('record.account-amount')}:</span>
									<h2 className="main-number">$ 1234.123</h2>
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
											<IonRow className="ion-justify-content-between">
												<span>{t('record.order-amount')}</span>
												<span className="main-number">$ {item.goodsPrice}</span>
											</IonRow>
											<IonRow className="ion-justify-content-between">
												<span>{t('record.commission')}</span>
												<span className="main-number">$ {item.commissionAmount}</span>
											</IonRow>
											<IonRow className="ion-justify-content-between">
												<span>{t('record.returned-amount')}</span>
												<span className="main-number">$ {item.tradeAmount}</span>
											</IonRow>
											<IonButton
												onClick={() => submitOrder(item.id)}
												className="custom-button ion-padding-top ion-margin-bottom"
												expand="block"
											>
												提交订单
											</IonButton>
										</IonCard>
									)
								})}
								{orderArr.length == 0 ? <h4 style={{ textAlign: 'center', color: 'white' }}>暂无数据</h4> : null}
							</div>
						</div>
						<div className={styles.tabPart}>
							<input
								type="radio"
								name="css-tabs"
								id="tab-2"
								className={styles.tabSwitch}
								onChange={() => {
									radioChange('1')
								}}
							/>
							<label htmlFor="tab-2" className={styles.tabLabel}>
								{t('record.status-completed')}
							</label>
							<div className={styles.tabContent}>
								<IonGrid>
									<span>{t('record.account-amount')}:</span>
									<h2 className="main-number">$ 1234.123</h2>
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
											<IonRow className="ion-justify-content-between">
												<span>{t('record.order-amount')}</span>
												<span className="main-number">$ {item.goodsPrice}</span>
											</IonRow>
											<IonRow className="ion-justify-content-between">
												<span>{t('record.commission')}</span>
												<span className="main-number">$ {item.commissionAmount}</span>
											</IonRow>
											<IonRow className="ion-justify-content-between">
												<span>{t('record.returned-amount')}</span>
												<span className="main-number">$ {item.tradeAmount}</span>
											</IonRow>
										</IonCard>
									)
								})}
								{orderArr.length == 0 ? <h4 style={{ textAlign: 'center' }}>暂无数据</h4> : null}
							</div>
						</div>
						<div className={styles.tabPart}>
							<input
								type="radio"
								name="css-tabs"
								id="tab-3"
								className={styles.tabSwitch}
								onChange={() => {
									radioChange('2')
								}}
							/>
							<label htmlFor="tab-3" className={styles.tabLabel}>
								{t('record.status-freezing')}
							</label>
							<div className={styles.tabContent}>
								<IonGrid>
									<span>{t('record.account-amount')}:</span>
									<h2 className="main-number">$ 1234.123</h2>
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
											<IonRow className="ion-justify-content-between">
												<span>{t('record.order-amount')}</span>
												<span className="main-number">$ {item.goodsPrice}</span>
											</IonRow>
											<IonRow className="ion-justify-content-between">
												<span>{t('record.commission')}</span>
												<span className="main-number">$ {item.commissionAmount}</span>
											</IonRow>
											<IonRow className="ion-justify-content-between">
												<span>{t('record.returned-amount')}</span>
												<span className="main-number">$ {item.tradeAmount}</span>
											</IonRow>
										</IonCard>
									)
								})}
								{orderArr.length == 0 ? <h4 style={{ textAlign: 'center' }}>暂无数据</h4> : null}
							</div>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Record
