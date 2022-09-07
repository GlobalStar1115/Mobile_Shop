import {
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonImg,
	IonPage,
	IonRouterLink,
	IonRow,
	IonToolbar,
	IonToast,
	useIonRouter,
	IonInput
} from '@ionic/react'
import styles from './Login.module.scss'
import { globeOutline } from 'ionicons/icons'
// import LoginField from '../../components/login/LoginField'
import DialogSide from '../../components/dialog-side/DialogSide'
// import { useLoginFields } from '../../data/fields'
import { useEffect, useState } from 'react'
// import { validateForm } from '../../data/utils'
import { useParams } from 'react-router'

import { useTranslation } from 'react-i18next'

import { LoginApi, BaseImageApi, AreaCodeInfoApi } from '../../request/api'

import { hex_md5 } from '../../data/md5'
import styles_ from '../../components/signup/SignupField.module.scss'
import BottomLine from '../../components/bottom-line/BottomLine'

const Login = () => {
	const { t, i18n } = useTranslation('lang')

	const router = useIonRouter()
	const params = useParams()

	// const fields = useLoginFields()
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
	const [loginPassword, setLoginPassword] = useState('')

	const [showDialog, setShowDialog] = useState(false)

	const login = () => {
		// const errors = validateForm(fields)
		setErrors(errors)

		if (!errors.length) {
			let data = {
				loginType: '1',
				areaCode: codeData.areaCode,
				loginName: loginName,
				password: hex_md5(loginPassword),
				channelId: 0
			}
			LoginApi(data).then(res => {
				// console.log(res)
				if (res.code === 200) {
					localStorage.setItem('Authorization', res.data['token'])
					setShowToast(true)
					setTimeout(() => {
						router.push('/app/home')
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
			// console.log(res)
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
			// fields.forEach(field => field.input.state.reset(''))
			setLoginName('')
			setLoginPassword('')
			setErrors(false)
		}
	}, [params])

	return (
		<IonPage className={styles.loginPage}>
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
					<IonRow className="ion-justify-content-center ion-padding-top">
						<IonImg src={imgUrl} />
					</IonRow>

					<IonRow className="ion-margin-top ion-padding-top">
						<IonCol size="12" className="ion-margin-top ion-padding-top">
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
									style={{ width: '36px', background: 'transparent', border: 'none' }}
								></input>
							</IonInput>
							<IonInput
								className={`${styles_.customInput} ${styles.PasswordInput}`}
								value={loginPassword}
								placeholder={t('signup.password')}
								onIonChange={e => setLoginPassword(e.detail.value)}
								clearInput
								type='password'
							>
								{/* <img onClick={() => setShowDialog(true)} src={codeData.iconUrl || '/assets/country.png'} alt="" /> */}
								{/* <input
									value={codeData.areaCode}
									disabled
									className={styles.PhoneInput_}
									style={{ width: '36px', background: 'transparent', border: 'none' }}
								></input> */}
							</IonInput>
							{/* <LoginField className={styles.loginCustomInput} field={fields[0]} errors={errors} /> */}

							<IonRow
								className={`ion-padding-bottom ion-padding-start ion-padding-end ion-justify-content-between ${styles.loginCustomRow}`}
							></IonRow>

							<IonButton className="ion-margin-top ion-margin-bottom" expand="block" onClick={login}>
								{t('login.login')}
							</IonButton>

							<IonRow className="ion-justify-content-center">
								<IonRouterLink routerLink="/signup" className={styles.goToSignup}>
									<p>{t('login.register')}</p>
								</IonRouterLink>
							</IonRow>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
			<IonRouterLink routerLink='/app/support' className={styles.service1}>
				<img src="assets/images/service1.png" alt="" />
			</IonRouterLink>
			<IonRouterLink routerLink='/app/support' className={styles.service2}>
				<img src="assets/images/service2.png" alt="" />
			</IonRouterLink>

			<BottomLine />
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message="Login success"
				duration={1000}
				color="primary"
			/>
			<IonToast
				isOpen={showToast2}
				onDidDismiss={() => setShowToast2(false)}
				message={message}
				duration={1000}
				color="danger"
			/>
		</IonPage>
	)
}

export default Login
