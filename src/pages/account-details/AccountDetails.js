import styles from './AccountDetails.module.scss'

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
	IonFooter,
	IonTitle,
	IonCard
} from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

import { MemberBillsApi } from '../../request/api'

const AccountDetails = () => {
	const { t, i18n } = useTranslation('lang')
	const current = new Date()
	const date = `${current.getFullYear()}-${
		current.getMonth() + 1
	}-${current.getDate()} ${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()}`

	const [dataArr, setDataArr] = useState([])

	useEffect(() => {
		MemberBillsApi().then(res => {
			console.log(res)
			if (res.code === 200) {
				setDataArr(res.data)
			}
		})
	}, [])

	return (
		<IonPage className={styles.accountDetailsPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('account-details.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid className="ion-no-padding">
					<p>{t('account-details.title')}</p>
					{dataArr.map((item, index) => {
						return (
							<IonCard className="ion-no-margin ion-padding main-radius" key={index}>
								<IonRow className="ion-justify-content-between ion-align-items-center">
									<span className={styles.date}>{item.createTime}</span>
								</IonRow>
								<IonRow className="ion-justify-content-between ion-align-items-center ion-margin-top">
									<span className={styles.statusBadge}>{t('account-details.status-commission')}</span>
									<span className={`main-number ${styles.totalAmount}`}>$ {item.amount}</span>
								</IonRow>
							</IonCard>
						)
					})}
				</IonGrid>
			</IonContent>
			<IonFooter>
				<IonRow className="ion-justify-content-center ion-padding-bottom">
					<div className={styles.footerLine}></div>
				</IonRow>
			</IonFooter>
		</IonPage>
	)
}

export default AccountDetails
