import styles from './Password.module.scss'

import {
	IonButton,
	IonButtons,
	IonBackButton,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
	IonToolbar,
	IonToast
} from '@ionic/react'
import SignupField from '../../components/signup/SignupField'
import { chevronBackOutline } from 'ionicons/icons'
import { useConfirmFields } from '../../data/fields'
import { useEffect, useState } from 'react'
import { validateForm } from '../../data/utils'
import { useParams, useHistory } from 'react-router'
import { useIonRouter } from '@ionic/react'

import { useTranslation } from 'react-i18next'

import { ModifyPasswordApi } from '../../request/api'

import { hex_md5 } from '../../data/md5'
import BottomLine from '../../components/bottom-line/BottomLine'

const Password = () => {
	const { t, i18n } = useTranslation('lang')
	const router = useIonRouter()
	const params = useParams()
	const fields = useConfirmFields()
	const [errors, setErrors] = useState(false)

	const [showToast, setShowToast] = useState(false)
	const [showToast2, setShowToast2] = useState(false)
	const [message, setMessage] = useState('')

	const history = useHistory()
	useEffect(() => {
		if (localStorage.getItem('Authorization') === null) history.push('/login')
	}, [])

	const confirmPassword = () => {
		const errors = validateForm(fields)
		setErrors(errors)
		const newPassword = fields[1].input.state.value
		const newPasswordConfirm = fields[2].input.state.value
		if (newPassword !== newPasswordConfirm) {
			setMessage('新密码与确认密码不一致')
			setShowToast2(true)
			return
		}

		if (!errors.length) {
			let data = {
				oldPassword: hex_md5(fields[0].input.state.value),
				newPassword: hex_md5(fields[1].input.state.value)
			}
			ModifyPasswordApi(data).then(res => {
				if (res.code === 200) {
					setShowToast(true)
					setTimeout(() => {
						router.push('/login')
					}, 1100)
				} else {
					setMessage(res.msg)
					setShowToast2(true)
				}
			})
		}
	}

	useEffect(() => {
		return () => {
			fields.forEach(field => field.input.state.reset(''))
			setErrors(false)
		}
	}, [params])

	return (
		<IonPage className={styles.forgotPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('forgot.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid className="ion-padding">
					<IonRow className="ion-margin-top ion-padding-top">
						<IonCol size="12">
							{fields.map((field, index) => {
								return <SignupField field={field} errors={errors} key={index} />
							})}
							<IonButton
								className="custom-button ion-padding-top ion-margin-bottom"
								expand="block"
								onClick={confirmPassword}
							>
								{t('forgot.button')}
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
			<BottomLine />
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message="Modify successfully"
				duration={1000}
				color="primary"
			/>
			<IonToast
				isOpen={showToast2}
				onDidDismiss={() => setShowToast2(false)}
				message={message}
				duration={2000}
				color="danger"
			/>
		</IonPage>
	)
}

export default Password
