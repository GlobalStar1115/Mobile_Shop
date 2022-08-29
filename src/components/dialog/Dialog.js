import React, { Component, Children } from 'react'
import { createPortal } from 'react-dom'
import './Dialog.scss'
export default class Dialog extends Component {
	constructor(props) {
		super(props)
		const doc = window.document
		this.node = doc.createElement('div')
		doc.body.appendChild(this.node)
	}
	componentWillUnmount() {
		window.document.body.removeChild(this.node)
	}
	render() {
		const { children, hideDialog, hide } = this.props
		let tem = hide ? 'hidden' : ''
		console.log('hide', tem)
		return createPortal(
			<div className="dialogBox" style={{ visibility: tem }}>
				<div className="dialog">
					{children}
					{/* <button onClick={hideDialog}>cancel</button>
					<button onClick={hideDialog}>confirm</button> */}
				</div>
			</div>,
			this.node
		)
	}
}
