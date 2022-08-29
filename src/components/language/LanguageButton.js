import { IonRow, IonLabel } from '@ionic/react'

import styles from './LanguageButton.module.scss'
import { useTranslation } from 'react-i18next'

const LanguageButton = ({ field, languageList, setLanguageList }) => {
	const { t, i18n } = useTranslation('lang')

	return (
		<div
			className={styles.languageBox}
			onClick={() => {
				console.log('field', field)
				i18n.changeLanguage(field.dictValue)
				localStorage.setItem('language-id', field.dictValue)
				window.history.go(-1)
			}}
		>
			<IonRow
				className="ion-align-items-center"
				style={{ paddingLeft: '20px', paddingRight: '10px', display: 'flex', justifyContent: 'space-between' }}
			>
				<IonLabel>{field.dictLabel}</IonLabel>
			</IonRow>
		</div>
	)
}

export default LanguageButton
