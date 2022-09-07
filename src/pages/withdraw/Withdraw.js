import {
	IonButton,
	IonButtons,
	IonTitle,
	IonBackButton,
	IonCard,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonPage,
	IonRouterLink,
	IonRow,
	IonToolbar,
	IonList,
	IonRadioGroup,
	IonListHeader,
	IonLabel,
	IonItem,
	IonRadio,
	IonToast,
	IonSelect,
	IonSelectOption,
	useIonRouter
} from '@ionic/react'
import styles from './Withdraw.module.scss'

import SignupField from '../../components/old-signup/SignupField'
import { chevronBackOutline } from 'ionicons/icons'
import { WithdrawField } from '../../data/fields'
import { useEffect, useState } from 'react'
import { validateForm } from '../../data/utils'
import { useParams } from 'react-router'

import { useTranslation } from 'react-i18next'

import { AccountListApi, WithdrawtApi, InfoApi } from '../../request/api'

import { hex_md5 } from '../../data/md5'
import BottomLine from '../../components/bottom-line/BottomLine'

const Withdraw = () => {
	const { t, i18n } = useTranslation('lang')
	const router = useIonRouter()
	const params = useParams()
	const fields = WithdrawField()
	const [errors, setErrors] = useState(false)

	const [assets, setAssets] = useState({})
	const [member, setMember] = useState({})
	const [accountArr, setAccountArr] = useState([])
	const [AccountSelected, setAccountSelected] = useState('brown')
	const withdrawAction = () => {
		const errors = validateForm(fields)
		setErrors(errors)

		if (!errors.length) {
			let data = {
				amount: fields[0].input.state.value,
				memberAccountId: AccountSelected,
				tradePassword: hex_md5(fields[1].input.state.value),
				channelId: 0
			}
			WithdrawtApi(data).then(res => {
				// console.log(res)
				if (res.code === 200) {
				}
			})
			// router.push('/login')
		}
	}

	useEffect(() => {
		InfoApi().then(res => {
			// console.log(res)
			if (res.code === 200) {
				const { member, assets } = res.data
				setMember(member)
				setAssets(assets)
			}
		})
		AccountListApi().then(res => {
			// console.log(res)
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

	useEffect(() => {
		return () => {
			fields.forEach(field => field.input.state.reset(''))
			setErrors(false)
		}
	}, [params])

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
							<h4 className="main-title ion-text-center ion-no-margin">{t('withdraw.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonCard className="ion-padding main-radius">
					<span className="text-white" style={{ color: '#000' }}>
						{t('withdraw.avaliable-amount')}:
					</span>
					<h2 className="ion-text-center main-number text-white" style={{ color: '#000' }}>
						$ {typeof assets.availableBalance === 'number' ? assets.availableBalance.toFixed(2) : assets.availableBalance
						}
					</h2>
					<p className="text-white" style={{ color: '#000' }}>
						<span>{t('withdraw.acc-name')}: </span>
						<span>{member.memberName}</span>
					</p>
					<p className="text-white" style={{ color: '#000' }}>
						<span>{t('withdraw.phone')}: </span>
						<span>{member.phoneNumber}</span>
					</p>
					<p>* {t('withdraw.comment')}</p>
				</IonCard>
				<IonGrid className="ion-padding">
					<IonRow>
						<IonCol size="12" className={styles.fieldGroup}>
							{fields.map((field, index) => {
								return <SignupField field={field} errors={errors} key={index} />
							})}
							<IonItem className={styles.selectItem}>
								<IonLabel>{t('bank.choose-bank')}</IonLabel>
								<IonSelect
									value={AccountSelected}
									mode="ios"
									okText="Okay"
									cancelText="Dismiss"
									onIonChange={e => {
										setAccountSelected(e.detail.value)
									}}
								>
									{accountArr.map((item, index) => {
										return (
											<IonSelectOption value={item.id} key={index}>
												{item.accountType == 1 ? item.showName : item.address}
											</IonSelectOption>
										)
									})}
								</IonSelect>
							</IonItem>
							<IonButton
								className="custom-button ion-padding-top ion-margin-bottom"
								expand="block"
								onClick={withdrawAction}
							>
								{t('withdraw.title')}
							</IonButton>
						</IonCol>
						<IonCol></IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
			<BottomLine />
		</IonPage>
	)
}

export default Withdraw
