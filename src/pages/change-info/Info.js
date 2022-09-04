import {
	IonButton,
	IonButtons,
	IonBackButton,
	IonCol,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
	IonToolbar,
	IonImg,
	IonInput,
	IonList,
	IonToast,
	IonContent
} from '@ionic/react'
import styles from './Info.module.scss'

import SignupField from '../../components/old-signup/SignupField'
import { chevronBackOutline } from 'ionicons/icons'
import { WithdrawField } from '../../data/fields'
import { useEffect, useState, useRef } from 'react'
import { validateForm } from '../../data/utils'
import { useParams } from 'react-router'
import { useIonRouter } from '@ionic/react'

import { useTranslation } from 'react-i18next'

import { InfoApi, InfoModifyApi, ModifyAvatarApi } from '../../request/api'
import BottomLine from '../../components/bottom-line/BottomLine'

const Info = () => {
	const { t, i18n } = useTranslation('lang')
	const router = useIonRouter()
	const params = useParams()
	const fields = WithdrawField()
	const [errors, setErrors] = useState(false)
	const [id, setId] = useState('')
	const [username, setUsername] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [invitationCode, setInvitationCode] = useState('')
	const [nickName, setNickName] = useState('')
	const [email, setEmail] = useState('')
	const [imgUrl, setImgUrl] = useState('/assets/images/home/avatar.png')

	const [showToast, setShowToast] = useState(false)
	const [showToast2, setShowToast2] = useState(false)
	const [message, setMessage] = useState('')

	const changeInfoAction = () => {
		let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
		if (!reg.test(email)) {
			alert('邮箱错误！')
			return
		}
		let data = {
			nickName,
			email
		}
		InfoModifyApi(data).then(res => {
			if (res.code === 200) {
				setShowToast(true)
			} else {
				setMessage(res.msg)
				setShowToast2(true)
			}
		})
	}

	const uploadImg = () => {
		//处理图片
		const fd = new FormData()
		fd.set('file', document.getElementById('uploadFile').files[0])
		ModifyAvatarApi(fd).then(res => {
			console.log(res)
			if (res.code === 200) {
				setImgUrl(res.avatar)
			}
		})
	}

	useEffect(() => {
		InfoApi().then(res => {
			if (res.code === 200) {
				console.log('res.data.member', res.data.member)
				const { id, memberName, phoneNumber, inviteCode, nickName, email, avatar } = res.data.member
				setId(id)
				setUsername(memberName)
				setPhoneNumber(phoneNumber)
				setInvitationCode(inviteCode)
				setNickName(nickName)
				setEmail(email)
				if (avatar) {
					setImgUrl(avatar)
				}
				console.log(imgUrl)
			}
		})
	}, [])

	return (
		<IonPage className={styles.withdrawPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('change-info.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent>

				<div className={styles['out-avatar']}>
					<IonImg src={imgUrl} alt="avatar" className={styles.avatar} />
					<input type="file" id="uploadFile" onChange={uploadImg} styles={{ display: 'none' }}></input>
					{/* <img id="showUploadFile" src="" className="picture" styles={{ display: 'none' }}></img> */}
				</div>
				<IonList className={styles.list1}>
					<IonInput readonly value={id}>
						<div>ID</div>
					</IonInput>

					<IonInput readonly value={username}>
						<div>Username</div>
					</IonInput>

					<IonInput readonly value={phoneNumber}>
						<div>Phone Number</div>
					</IonInput>

					<IonInput readonly value={invitationCode}>
						<div>Invitation Code</div>
					</IonInput>
				</IonList>

				<IonList className={styles.list2}>
					<IonInput value={nickName} onIonChange={e => setNickName(e.detail.value)}>
						<div>Nickname</div>
					</IonInput>

					<IonInput value={email} onIonChange={e => setEmail(e.detail.value)}>
						<div>Email</div>
					</IonInput>
				</IonList>

				<div className="ion-padding d-flex ion-justify-content-center">
					<IonButton
						className="custom-button ion-padding-top ion-margin-bottom"
						expand="block"
						onClick={changeInfoAction}
					>
						{t('change-info.title')}
					</IonButton>
				</div>
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

export default Info
