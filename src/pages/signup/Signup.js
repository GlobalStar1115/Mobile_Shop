import {
	IonButton,
	IonButtons,
	IonImg,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonPage,
	IonRouterLink,
	IonRow,
	IonToolbar,
	useIonToast,
	IonToast,
	IonInput,
	IonLabel
} from '@ionic/react'
import styles from './Signup.module.scss'

import SignupField from '../../components/signup/SignupField'
import DialogSide from '../../components/dialog-side/DialogSide'
import { globeOutline } from 'ionicons/icons'
import { useSignupFields } from '../../data/fields'
import { useEffect, useState } from 'react'
import { validateForm } from '../../data/utils'
import { useParams } from 'react-router'
import { useIonRouter } from '@ionic/react'

import { useTranslation } from 'react-i18next'
import { RegisterApi, BaseImageApi, AreaCodeInfoApi } from '../../request/api'

import { hex_md5 } from '../../data/md5'
import styles_ from '../../components/signup/SignupField.module.scss'

const Signup = () => {
	const { t, i18n } = useTranslation('lang')
	const router = useIonRouter()
	const params = useParams()
	const fields = useSignupFields()
	const [errors, setErrors] = useState(false)

	const [showToast, setShowToast] = useState(false)
	const [showToast2, setShowToast2] = useState(false)
	const [message, setMessage] = useState('')

	const [imgUrl, setImgUrl] = useState('')
	const [codeData, setCodeData] = useState({
		areaCode: '376',
		iconUrl: ''
	})

	const [loginName, setLoginName] = useState('')

	const [showDialog, setShowDialog] = useState(false)

	const createAccount = () => {
		const errors = validateForm(fields)
		setErrors(errors)

		if (!errors.length) {
			let data = {
				memberName: fields[0].input.state.value,
				areaCode: codeData.areaCode,
				phoneNumber: loginName,
				password: hex_md5(fields[1].input.state.value),
				verifyPassword: hex_md5(fields[2].input.state.value),
				inviteCode: fields[3].input.state.value,
				channelId: 0
			}
			RegisterApi(data).then(res => {
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

	const hideDialog = val => {
		const queryData = `areaCode=${val}`
		AreaCodeInfoApi(queryData).then(res => {
			console.log(res)
			if (res.code === 200) {
				const { areaCode, iconUrl } = res.data
				setCodeData({ areaCode, iconUrl })
			}
		})
		setShowDialog(false)
	}

	useEffect(() => {
		BaseImageApi().then(res => {
			if (res.code === 200) {
				const imgUrl = res.data[0] && res.data[0].imgUrls
				setImgUrl(imgUrl)
			}
		})
	}, [])

	useEffect(() => {
		return () => {
			fields.forEach(field => field.input.state.reset(''))
			setErrors(false)
		}
	}, [params])

	return (
		<IonPage className={styles.signupPage}>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start"></IonButtons>
					<IonButtons slot="end">
						<IonRouterLink routerLink="/language">
							<IonButton>
								<IonIcon icon={globeOutline} />
							</IonButton>
						</IonRouterLink>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			{showDialog && <DialogSide hideDialog={hideDialog} hide={false}></DialogSide>}
			<IonContent fullscreen className="ion-padding">
				<IonGrid className="ion-padding">
					<IonRow className="ion-justify-content-center">
						<IonImg src={imgUrl} />
					</IonRow>
					<IonRow className="ion-margin-top ion-padding-top">
						<IonCol size="12">
							{/* {fields.map((field, index) => {
								return <SignupField field={field} errors={errors} key={index} />
							})} */}
							<SignupField field={fields[0]} errors={errors} />
							<IonInput
								className={`${styles_.customInput} ${styles.PhoneInput}`}
								value={loginName}
								placeholder={t('signup.phone')}
								onIonChange={e => setLoginName(e.detail.value)}
								clearInput
							>
								<img onClick={() => setShowDialog(true)} src={codeData.iconUrl || '/assets/country.png'} alt="" />
								<input
									value={codeData.areaCode}
									disabled
									className={styles.PhoneInput_}
									style={{ width: '40px', background: '#f1f2f2', border: 'none' }}
								></input>
							</IonInput>
							<SignupField field={fields[1]} errors={errors} />
							<SignupField field={fields[2]} errors={errors} />
							<SignupField field={fields[3]} errors={errors} />
							<IonButton
								className="custom-button ion-padding-top ion-margin-bottom"
								expand="block"
								onClick={createAccount}
							>
								{t('signup.register')}
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow className="ion-justify-content-center ion-padding-top">
						<IonRouterLink routerLink="/login">
							<p>{t('signup.login')}</p>
						</IonRouterLink>
					</IonRow>
					<IonRow className="ion-justify-content-center">
						<IonRouterLink routerLink="/login">
							<p className="ion-no-margin">{t('signup.app')}</p>
						</IonRouterLink>
					</IonRow>
				</IonGrid>
			</IonContent>

			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message="Registered successfully"
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

export default Signup
