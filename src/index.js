import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import lang_en from './translations/en/lang.json'
import lang_ch from './translations/ch/lang.json'
import lang_id from './translations/id/lang.json'

const value = localStorage.getItem('language-id')

i18next.init({
	interpolation: { escapeValue: false },
	lng: `${value ? value : 'en'}`,
	resources: {
		en: {
			lang: lang_en
		},
		'zh-Hans': {
			lang: lang_ch
		},
		vie: {
			lang: lang_en
		},
		ind: {
			lang: lang_en
		},
		'ko-kr': {
			lang: lang_en
		},
		jp: {
			lang: lang_en
		}
	}
})

ReactDOM.render(
	// <React.StrictMode>
	<I18nextProvider i18n={i18next}>
		<App />
	</I18nextProvider>,
	// </React.StrictMode>,
	document.getElementById('root')
)
