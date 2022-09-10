import {
	IonButtons,
	IonBackButton,
	IonCol,
	IonHeader,
	IonPage,
	IonRow,
	IonToolbar,
	IonContent,
	IonCard,
} from '@ionic/react'
import styles from './CompanyRules.module.scss'

import { chevronBackOutline } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'
import BottomLine from '../../components/bottom-line/BottomLine'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
const CompanyRules = () => {
	const { t, i18n } = useTranslation('lang')
	const history = useHistory()
	useEffect(() => {
		if (localStorage.getItem('Authorization') === null) history.push('/login')
	}, [])
	return (
		<IonPage className={styles.companyPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('home.introduction.rules-description')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard className='ion-padding main-radius ion-margin-start ion-margin-end'>
					<span>
						testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
					</span>
				</IonCard>
			</IonContent>
			<BottomLine />
		</IonPage>
	)
}

export default CompanyRules
