import { useEffect, useState } from 'react'

const lang = localStorage.getItem('language-id') || 'en'

export const useFormInput = (initialValue = '') => {
	const [value, setValue] = useState(initialValue)

	const handleChange = async e => {
		const tempValue = await e.currentTarget.value
		setValue(tempValue)
	}

	useEffect(() => {
		setValue(value)
	}, [value])

	return {
		value,
		reset: newValue => setValue(newValue),
		onIonChange: handleChange,
		onKeyUp: handleChange
	}
}
export const useFormInputBank = (initialValue = '') => {
	const [value, setValue] = useState(initialValue)

	const handleChange = async e => {
		const tempValue = await e.currentTarget.value
		setValue(tempValue)
	}

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	return {
		value,
		reset: newValue => setValue(newValue),
		onIonChange: handleChange,
		onKeyUp: handleChange
	}
}

export const validateForm = fields => {
	let errors = []

	fields.forEach(field => {
		if (field.required) {
			const fieldValue = field.input.state.value
			if (fieldValue === '') {
				const error = {
					id: field.id,
					message: `Please check your ${field.id}`
				}

				errors.push(error)
			}
		}
	})

	return errors
}

export const setShowName = (data, childrenName) => {
	let nameList = data[`${childrenName}`].replace(/\{/g, '').replace(/\}/g, '').substring(1).split('","')
	const showName = nameList.filter(item => {
		return item.indexOf(lang) !== -1
	})
	data.showName = showName.join('').split(':')[1].replace(/\'/g, '').replace(/\"/g, '')
	return data
}
