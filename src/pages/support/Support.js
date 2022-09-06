import {
	IonCard,
	IonCol,
	IonContent,
	IonHeader,
	IonImg,
	IonPage,
	IonRouterLink,
	IonRow,
	IonToolbar,
	IonGrid
} from '@ionic/react'
import styles from './Support.module.scss'

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ServiceApi } from '../../request/api'

const Support = () => {
	const { t, i18n } = useTranslation('lang')
	// const current = new Date()
	// const date = `${current.getFullYear()}-${current.getMonth() + 1
	// 	}-${current.getDate()} ${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()}`

	// const [serviceList, setServiceList] = useState([])

	// useEffect(() => {
	// 	ServiceApi().then(res => {
	// 		console.log(res)
	// 		if (res.code === 200) {
	// 			const { data } = res
	// 			let lang = localStorage.getItem('language-id')
	// 			if (!lang) lang = 'en'
	// 			data.map(item => {
	// 				let serviceName = item.serviceName.replace(/\\/g, '').replace(/\{/g, '').replace(/\}/g, '').split(',')
	// 				serviceName = serviceName.filter(item => {
	// 					return item.indexOf(lang) == 1
	// 				})
	// 				serviceName = serviceName.join('').split(':')[1].replace(/\"/g, '')
	// 				item.serviceName = serviceName
	// 				return item
	// 			})
	// 			setServiceList(res.data)
	// 		}
	// 	})
	// }, [])

	return (
		<IonPage className={styles.recordPage}>
			<IonContent fullscreen className="ion-no-padding">
				<IonGrid className="ion-padding-start ion-padding-end ion-padding-bottom">
					<h4 className="main-title ion-text-center ion-no-margin ion-margin">{t('support.title')}</h4>
					<IonImg src="/assets/images/service5.png" />
					<p className='text-white ion-padding-start'>{t('support.tip')}</p>
					{/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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
									<div className="ion-justify-content-between ion-align-items-center">
										<p>{item.serviceName}</p>
										<p >Work time</p>
										<img src={item.iconUrl} alt="" />
									</div>
								</IonCard>
							)
						})}
					</div> */}
					<IonRow className='ion-justify-content-around'>
						<IonCol size='6'>
							<IonRouterLink routerLink='/app/support'>
								<IonCard className='ion-no-margin ion-padding main-radius'>
									<p>{t('support.service-name')}</p>
									<p >Work time</p>
									<IonImg src='/assets/images/service1.png' alt="" />
								</IonCard>
							</IonRouterLink>
						</IonCol>
						<IonCol size='6'>
							<IonRouterLink routerLink='/app/support'>
								<IonCard className='ion-no-margin ion-padding main-radius'>
									<p>{t('support.service-name')}</p>
									<p >Work time</p>
									<IonImg src='/assets/images/service2.png' alt="" />
								</IonCard>
							</IonRouterLink>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Support
