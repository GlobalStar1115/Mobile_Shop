import React, { Component } from 'react'
import ReactDOM, { render, createPortal } from 'react-dom'
import List from './country-list'
import './DialogSide.scss'
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
		const { hideDialog, hide } = this.props
		let tem = hide ? 'hidden' : ''
		console.log('hide', tem)
		return createPortal(
			<div className="dialogSideBox" style={{ visibility: tem }}>
				<div className="dialog">
					<List hideDialog={hideDialog}></List>
				</div>
			</div>,
			this.node
		)
	}
}
