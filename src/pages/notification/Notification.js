import styles from './Notification.module.scss'

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
	IonCard,
	IonIcon
} from '@ionic/react'
import { chevronBackOutline, volumeHighOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'

import { MessageApi } from '../../request/api'
import { useEffect, useState } from 'react'

const Notification = () => {
	const { t, i18n } = useTranslation('lang')

	const [messageList, setMessageList] = useState([])
	useEffect(() => {
		MessageApi().then(res => {
			// console.log(res)
			if (res.code === 200) {
				setMessageList(res.data)
			}
		})
	}, [])

	return (
		<IonPage className={styles.notificationPage}>
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
				<IonGrid className="ion-no-padding">
					<IonCard className="ion-no-margin ion-padding main-radius">
						<IonRow className="ion-align-items-center">
							<IonIcon icon={volumeHighOutline} />
							<span>{t('system-info.notification')}</span>
						</IonRow>
						<p className="ion-text-center">{t('system-info.noti-title')}</p>
						<span>{t('system-info.noti-content')}</span>
					</IonCard>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Notification
