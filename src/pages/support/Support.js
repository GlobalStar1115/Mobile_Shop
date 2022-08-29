import {
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
	IonGrid
} from '@ionic/react'
import styles from './Support.module.scss'

import { chatboxEllipsesOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ServiceApi } from '../../request/api'

const Support = () => {
	const { t, i18n } = useTranslation('lang')
	const current = new Date()
	const date = `${current.getFullYear()}-${
		current.getMonth() + 1
	}-${current.getDate()} ${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()}`

	const [serviceList, setServiceList] = useState([])

	useEffect(() => {
		ServiceApi().then(res => {
			console.log(res)
			if (res.code === 200) {
				const { data } = res
				let lang = localStorage.getItem('language-id')
				if (!lang) lang = 'en'
				data.map(item => {
					let serviceName = item.serviceName.replace(/\\/g, '').replace(/\{/g, '').replace(/\}/g, '').split(',')
					serviceName = serviceName.filter(item => {
						return item.indexOf(lang) == 1
					})
					serviceName = serviceName.join('').split(':')[1].replace(/\"/g, '')
					item.serviceName = serviceName
					return item
				})
				setServiceList(res.data)
			}
		})
	}, [])

	return (
		<IonPage className={styles.recordPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2"></IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('support.title')}</h4>
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
				<IonGrid className="ion-no-padding">
					<p>{t('support.tip')}</p>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
						{serviceList.map((item, index) => {
							return (
								<IonCard
									className="ion-no-margin ion-padding main-radius"
									style={{ margin: '10px' }}
									key={index}
									onClick={() => {
										window.open(`${item.hrefUrl}`, '_blank')
									}}
								>
									<IonRow className="ion-justify-content-between ion-align-items-center">
										<span>{item.serviceName}</span>
										<img src={item.iconUrl} alt="" />
										<span className={`main-number ${styles.totalAmount}`}>Work time</span>
									</IonRow>
									<IonRow>
										<span>
											{item.workBeginTime?.split(' ')[1]}-{item.workEndTime?.split(' ')[1]}
										</span>
									</IonRow>
								</IonCard>
							)
						})}
					</div>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Support
