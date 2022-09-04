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
	IonList,
	IonRadioGroup,
	IonListHeader,
	IonLabel,
	IonItem,
	IonRadio,
	IonToast,
	IonSelect,
	IonSelectOption
} from '@ionic/react'
import styles from './Bank.module.scss'

import SignupField from '../../components/old-signup/SignupField'
import { chevronBackOutline } from 'ionicons/icons'
import { BindBank } from '../../data/fields'
import { useEffect, useState } from 'react'
import { validateForm } from '../../data/utils'
import { useParams } from 'react-router'
import { useIonRouter } from '@ionic/react'

import { useTranslation } from 'react-i18next'

import { AddAccountApi, BusinessBankApi, AccountInfoApi, ModifyAccountApi } from '../../request/api'
import BottomLine from '../../components/bottom-line/BottomLine'

const Bank = () => {
	const url = window.location.search
	const { t, i18n } = useTranslation('lang')
	const router = useIonRouter()
	const params = useParams()
	const fields = BindBank()
	const [errors, setErrors] = useState(false)

	const [accountType, setAccountType] = useState('2')
	const [chainType, setChainType] = useState('TRC20')

	const [showToast, setShowToast] = useState(false)
	const [showToast2, setShowToast2] = useState(false)
	const [message, setMessage] = useState('')
	const [bankArr, setBankArr] = useState([])
	const [bankSelected, setBankSelected] = useState('brown')

	useEffect(() => {
		getBankArr()
		let id
		if (url) {
			id = url.split('?')[1]
			const data = `id=${id}&channelId=0`
			AccountInfoApi(data).then(res => {
				console.log(res)
				if (res.code === 200) {
					const { accountType, address, chainType, bankCode, phoneNumber, pix, realName } = res.data
					if (accountType == 2) {
						fields[3].input.state.reset(address)
						setChainType(chainType)
					} else if (accountType == 1) {
						fields[2].input.state.reset(pix)
						setBankSelected(bankCode)
					}
					fields[0].input.state.reset(realName)
					fields[1].input.state.reset(phoneNumber)
					setAccountType(accountType)
				}
			})
		} else {
			getBankArr()
		}
	}, [])

	const getBankArr = () => {
		BusinessBankApi().then(res => {
			if (res.code === 200) {
				const { data } = res
				const lang = localStorage.getItem('language-id') || 'en'
				data.map(item => {
					let name = item.bankName.replace(/\\/g, '').replace(/\{/g, '').replace(/\}/g, '').split(',')
					name = name.filter(item => {
						return item.indexOf(lang) !== -1
					})
					name = name.join('').split(':')[1].replace(/\"/g, '')
					item.showName = name
					return item
				})
				setBankArr(data)
			}
		})
	}

	const changeAddress = () => {
		const errors = validateForm(fields)
		setErrors(errors)
		if (!errors.length <= 1) {
			let data
			if (accountType === '2') {
				data = {
					accountType: '2',
					address: fields[3].input.state.value,
					chainType: chainType,
					realName: fields[0].input.state.value,
					phoneNumber: fields[1].input.state.value,
					channelId: 0
				}
			} else {
				let bankNameIndex = bankArr.findIndex(item => item.bankCode == bankSelected)
				let bankName = bankArr[bankNameIndex].bankName
				data = {
					accountType: '1',
					bankCode: bankSelected,
					bankName,
					pix: fields[2].input.state.value,
					realName: fields[0].input.state.value,
					phoneNumber: fields[1].input.state.value,
					channelId: 0
				}
			}
			addOrEditAccount(data)
		}
	}

	const addOrEditAccount = data => {
		if (url) {
			const reqData = { ...data, ...{ id: url.split('?')[1] } }
			ModifyAccountApi(reqData).then(res => {
				if (res.code === 200) {
					setShowToast(true)
					setTimeout(() => {
						router.push('/app/account')
					}, 1100)
				} else {
					setMessage(res.msg)
					setShowToast2(true)
				}
			})
		} else {
			AddAccountApi(data).then(res => {
				if (res.code === 200) {
					setShowToast(true)
					setTimeout(() => {
						router.push('/app/account')
					}, 1100)
				} else {
					setMessage(res.msg)
					setShowToast2(true)
				}
			})
		}
	}

	const changeAccountType = e => {
		let value = e.detail.value
		setAccountType(value)
	}

	const changeChainType = e => {
		let value = e.detail.value
		setChainType(value)
	}

	useEffect(() => {
		return () => {
			fields.forEach(field => field.input.state.reset(''))
			setErrors(false)
		}
	}, [params])

	return (
		<IonPage className={styles.bankPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin ion-no-margin">{t('bank.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid className="ion-padding">
					<IonRow>
						<IonCol size="12">
							<SignupField field={fields[0]} errors={errors} />
							<SignupField field={fields[1]} errors={errors} />
							{/* <IonList>
								<IonRadioGroup value={accountType} onIonChange={changeAccountType}>
									<IonListHeader className='ion-no-padding'>
										<div className={styles.type}>{t('bank.type')}</div>
									</IonListHeader>
									<IonItem
										color="light"
										style={{
											marginBottom: '10px',
											height: '50px',
											backgroundColor: '#424f5c',
											borderRadius: '30vw',
											border: 'none'
										}}
									>
										<IonLabel>{t('bank.WalletAddress')}</IonLabel>
										<IonRadio slot="start" value="2" />
									</IonItem>

									<IonItem
										color="light"
										style={{ height: '50px', backgroundColor: '#424f5c', borderRadius: '30vw', border: 'none' }}
									>
										<IonLabel>{t('bank.BankCard')}</IonLabel>
										<IonRadio slot="start" value="1" />
									</IonItem>
								</IonRadioGroup>
							</IonList> */}
							<p className={styles.selectTitle}>Choose</p>
							<IonItem className={styles.selectOptions}>
								<IonLabel>Options</IonLabel>
								<IonSelect
									mode="ios"
									okText="Okay"
									cancelText="Dismiss"
									value={accountType}
									onIonChange={changeAccountType}
								>
									<IonSelectOption value="2">
										{t('bank.WalletAddress')}
									</IonSelectOption>
									<IonSelectOption value="1">
										{t('bank.BankCard')}
									</IonSelectOption>
								</IonSelect>
							</IonItem>

							{accountType === '2' ? (
								<IonList>
									<IonRadioGroup value={chainType} onIonChange={changeChainType}>
										<IonListHeader className='ion-no-padding'>
											<div className={styles.type}>{t('bank.chain-type')}</div>
										</IonListHeader>
										<IonItem
											className={styles.selectItem}
											color="light"
											style={{
												marginBottom: '10px', backgroundColor: '#424f5c'
											}}
										>
											<IonLabel>{t('bank.chain-trc')}</IonLabel>
											<IonRadio slot="start" value="TRC20" />
										</IonItem>

										<IonItem className={styles.selectItem} color="light" style={{
											marginBottom: '10px', backgroundColor: '#424f5c'
										}}>
											<IonLabel>{t('bank.chain-erc')}</IonLabel>
											<IonRadio slot="start" value="ERC20" />
										</IonItem>
									</IonRadioGroup>
								</IonList>
							) : (
								<IonItem className={styles.radioItem} >
									<IonLabel>{t('bank.choose-bank')}</IonLabel>
									<IonSelect
										value={bankSelected}
										mode="ios"
										okText="Okay"
										cancelText="Dismiss"
										onIonChange={e => {
											setBankSelected(e.detail.value)
										}}
									>
										{bankArr.map((item, index) => {
											return (
												<IonSelectOption value={item.bankCode} key={index}>
													{item.showName}
												</IonSelectOption>
											)
										})}
									</IonSelect>
								</IonItem>
							)}
							<SignupField field={accountType !== '2' ? fields[2] : fields[3]} errors={errors} />
							<IonButton
								className="custom-button ion-padding-top ion-margin-bottom"
								expand="block"
								onClick={changeAddress}
							>
								{t('shipping.confirm')}
							</IonButton>
						</IonCol>
					</IonRow>
					<div className=" ion-padding-top">
						<p className='text-white'>{t('bank.tip')}:</p>
						<p className={styles.tipComment}>{t('bank.comment')}</p>
					</div>
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

export default Bank
