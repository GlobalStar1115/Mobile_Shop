import { useFormInput, useFormInputBank } from './utils'
import { useTranslation } from 'react-i18next'

export const useSignupFields = () => {
	const { t, i18n } = useTranslation('lang')

	return [
		{
			id: 'username',
			label: '',
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('signup.username')
				},
				state: useFormInput('')
			}
		},
		{
			id: 'create-password',
			label: '',
			required: true,
			input: {
				props: {
					type: 'password',
					placeholder: t('signup.password')
				},
				state: useFormInput('')
			}
		},
		{
			id: 'confirm-password',
			label: '',
			required: true,
			input: {
				props: {
					type: 'password',
					placeholder: t('signup.cpassword')
				},
				state: useFormInput('')
			}
		},
		{
			id: 'invite-code',
			label: '',
			required: false,
			input: {
				props: {
					type: 'text',
					placeholder: t('signup.invitation')
				},
				state: useFormInput('')
			}
		}
	]
}

export const useLoginFields = () => {
	const { t, i18n } = useTranslation('lang')

	return [
		// {
		// 	id: 'telephone',
		// 	label: '',
		// 	required: true,
		// 	input: {
		// 		props: {
		// 			type: 'tel',
		// 			placeholder: t('login.account'),
		// 			pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}'
		// 		},
		// 		state: useFormInput('')
		// 	}
		// },
		// {
		// 	id: 'password',
		// 	label: '',
		// 	required: true,
		// 	input: {
		// 		props: {
		// 			type: 'password',
		// 			placeholder: t('signup.password')
		// 		},
		// 		state: useFormInput('')
		// 	}
		// }
	]
}

export const useConfirmFields = () => {
	const { t, i18n } = useTranslation('lang')

	return [
		{
			id: 'old-passowrd',
			label: '',
			required: true,
			input: {
				props: {
					type: 'password',
					placeholder: t('forgot.oldpwd')
				},
				state: useFormInput('')
			}
		},
		{
			id: 'new-password',
			label: '',
			required: true,
			input: {
				props: {
					type: 'password',
					placeholder: t('forgot.newpwd')
				},
				state: useFormInput('')
			}
		},
		{
			id: 'confirm-password',
			label: '',
			required: true,
			input: {
				props: {
					type: 'password',
					placeholder: t('forgot.confirmpwd')
				},
				state: useFormInput('')
			}
		}
	]
}

export const ShippingAddress = () => {
	const { t, i18n } = useTranslation('lang')

	return [
		{
			id: t('shipping.actual-name'),
			label: t('shipping.id-info'),
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('shipping.actual-name')
				},
				state: useFormInput('')
			}
		},
		{
			id: t('shipping.contact-details'),
			label: '',
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('shipping.contact-details')
				},
				state: useFormInput('')
			}
		},
		{
			id: t('shipping.area'),
			label: t('shipping.add-info'),
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('shipping.area')
				},
				state: useFormInput('')
			}
		},
		{
			id: t('shipping.address'),
			label: '',
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('shipping.address')
				},
				state: useFormInput('')
			}
		}
	]
}

export const BindBank = () => {
	const { t, i18n } = useTranslation('lang')

	return [
		{
			id: t('bank.actual-name'),
			label: t('bank.id-info'),
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('bank.actual-name')
				},
				state: useFormInputBank('')
			}
		},
		{
			id: t('bank.contact-details'),
			label: '',
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('bank.contact-details')
				},
				state: useFormInput('')
			}
		},
		{
			id: t('bank.bank-name'),
			label: t('bank.card-info'),
			name: 'BankCard',
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('bank.bank-name')
				},
				state: useFormInput('')
			}
		},
		{
			id: 'Wallet address',
			label: t('bank.address-info'),
			name: 'WalletAddress',
			required: true,
			input: {
				props: {
					type: 'text',
					placeholder: t('bank.wallet-address')
				},
				state: useFormInput('')
			}
		}
	]
}

export const WithdrawField = () => {
	const { t, i18n } = useTranslation('lang')

	return [
		{
			id: 'withdraw amount',
			label: t('withdraw.withdraw-amount'),
			required: true,
			input: {
				props: {
					type: 'number',
					placeholder: t('withdraw.input')
				},
				state: useFormInput('')
			}
		},
		{
			id: 'withdraw password',
			label: t('withdraw.withdraw-password'),
			required: true,
			input: {
				props: {
					type: 'password',
					placeholder: t('withdraw.input-password')
				},
				state: useFormInput('')
			}
		}
	]
}

export const useLanguageBox = () => {
	const url = '/assets/flags/'

	return [
		{
			id: 'en',
			label: 'English',
			img: {
				props: {
					src: url + 'us.png'
				}
			}
		},
		{
			id: 'ch',
			label: '????????????',
			img: {
				props: {
					src: url + 'china.png'
				}
			}
		},
		{
			id: 'id',
			label: 'Bhs Indonesia',
			img: {
				props: {
					src: url + 'indo.png'
				}
			}
		},
		{
			id: 'kh',
			label: '???????????????',
			img: {
				props: {
					src: url + 'khmer.png'
				}
			}
		},
		{
			id: 'tw',
			label: 'Ti???ng Vi???t',
			img: {
				props: {
					src: url + 'taiwan.png'
				}
			}
		},
		{
			id: 'jp',
			label: '?????????',
			img: {
				props: {
					src: url + 'japan.png'
				}
			}
		}
	]
}
