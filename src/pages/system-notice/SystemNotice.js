import styles from './SystemNotice.module.scss'

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
	IonImg,
	IonCard
} from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

import { MemberBillsApi } from '../../request/api'
import BottomLine from '../../components/bottom-line/BottomLine'

const SystemNotice = () => {
	const { t, i18n } = useTranslation('lang')
	const current = new Date()
	const date = `${current.getFullYear()}-${current.getMonth() + 1
		}-${current.getDate()} ${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()}`

	const [dataArr, setDataArr] = useState([])

	useEffect(() => {
		MemberBillsApi().then(res => {
			// console.log(res)
			if (res.code === 200) {
				setDataArr(res.data)
			}
		})
	}, [])

	return (
		<IonPage className={styles.systemNoticePage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('system-info.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonCard className='main-radius ion-no-margin ion-padding'>
					<IonRow className='text-white ion-align-items-center'>
						<IonImg src="/assets/images/laba@2x.png" /> {t('system-info.notification')}
					</IonRow>
					<p className='ion-text-center text-white'>{t('system-info.noti-title')}</p>
					<p className='text-white'>{t('system-info.noti-content')}</p>
				</IonCard>
			</IonContent>
			<BottomLine />
		</IonPage>
	)
}

export default SystemNotice
