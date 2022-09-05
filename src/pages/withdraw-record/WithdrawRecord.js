import styles from './WithdrawRecord.module.scss'

import {
	IonButtons,
	IonBackButton,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
	IonToolbar,
	IonTitle,
	IonCard
} from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import { CashRecordApi } from '../../request/api'
import BottomLine from '../../components/bottom-line/BottomLine'

const WithdrawRecord = () => {
	const { t, i18n } = useTranslation('lang')
	const current = new Date()
	const date = `${current.getFullYear()}-${current.getMonth() + 1
		}-${current.getDate()} ${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()}`

	const [dataArr, setDataArr] = useState([])

	useEffect(() => {
		const paramsData = `transactionType=2`
		CashRecordApi(paramsData).then(res => {
			console.log(res)
			if (res.code === 200) {
				const { data } = res
				setDataArr(data)
			}
		})
	}, [])

	return (
		<IonPage className={styles.withdrawRocordPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center  ion-no-margin">{t('withdraw-record.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid className="ion-padding-start ion-padding-end">
					<p className='text-white'>{t('withdraw-record.title')}</p>
					{dataArr.map((item, index) => {
						return (
							<IonCard className="ion-no-margin ion-padding main-radius" key={index}>
								<IonRow className="ion-justify-content-between ion-align-items-center">
									<span>
										{t('recharge-record.order-number')}: {item.orderSn}
									</span>
									<span className={`main-number ${styles.totalAmount}`}>$ {item.swapAmount}</span>
								</IonRow>
								<IonRow className="ion-justify-content-between ion-align-items-center ion-margin-top">
									<span className={styles.date}>
										{t('recharge-record.time')}: {item.createTime}
									</span>
									<span className={styles.statusBadge}>{t('recharge-record.seccessful')}</span>
								</IonRow>
							</IonCard>
						)
					})}
					{dataArr.length == 0 ? <h4 style={{ textAlign: 'center', color: 'white' }}>{t('common-text.no-data')}</h4> : null}
				</IonGrid>
			</IonContent>
			<BottomLine />
		</IonPage>
	)
}

export default WithdrawRecord
