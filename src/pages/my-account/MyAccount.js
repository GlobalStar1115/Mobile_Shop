import styles from './MyAccount.module.scss'
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
	IonRouterLink,
	useIonRouter
} from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AccountListApi } from '../../request/api'

const RechargeRecord = () => {
	const router = useIonRouter()
	const { t, i18n } = useTranslation('lang')
	const [accountArr, setAccountArr] = useState([])

	useEffect(() => {
		AccountListApi().then(res => {
			console.log(res)
			if (res.code === 200) {
				let lang = localStorage.getItem('language-id')
				if (!lang) lang = 'en'
				const { data } = res
				data.map(item => {
					if (item.accountType == 1) {
						let name = item.bankName.replace(/\\/g, '').replace(/\{/g, '').replace(/\}/g, '').split(',')
						name = name.filter(item => {
							return item.indexOf(lang) == 1
						})
						name = name.join('').split(':')[1].replace(/\"/g, '')
						item.showName = name
					}
					return item
				})
				setAccountArr(res.data)
			}
		})
	}, [])

	return (
		<IonPage className={styles.rechargeRocordPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('my-account.title')}</h4>
						</IonCol>
						<IonCol size="2">
							<IonRouterLink routerLink="/bank">
								<h4>{t('my-account.add')}</h4>
							</IonRouterLink>
						</IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid className="ion-no-padding">
					{/* <p>{t('recharge-record.title')}</p> */}
					{accountArr.map((item, index) => {
						return (
							<IonCard
								style={{ backgroundColor: '#6cbff6' }}
								key={index}
								className="ion-no-margin ion-padding main-radius"
							>
								<IonRow className="ion-justify-content-between ion-align-items-center">
									<span style={{ fontSize: '20px', color: '#fff' }}>
										{item.accountType == 1 ? 'Bank Account' : 'Bkash Account'}
									</span>
									<span>
										<h4
											onClick={() => {
												router.push(`/bank?${item.id}`)
											}}
										>
											{t('my-account.edit')}
										</h4>
									</span>
								</IonRow>
								<IonRow className="ion-justify-content-between ion-align-items-center" style={{ marginTop: '8px' }}>
									<span style={{ fontSize: '16px', color: '#fff' }}>
										{item.accountType == 1 ? item.pix : item.address}
									</span>
								</IonRow>
								<IonRow className="ion-justify-content-between ion-align-items-center" style={{ marginTop: '20px' }}>
									<span style={{ fontSize: '14px', color: '#fff' }}>
										{item.accountType == 1 ? item.showName : 'Bkash Account'}
									</span>
								</IonRow>
							</IonCard>
						)
					})}
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default RechargeRecord
