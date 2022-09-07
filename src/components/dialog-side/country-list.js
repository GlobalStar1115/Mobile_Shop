import React, { Component } from 'react'
import { IonSearchbar } from '@ionic/react'
import './style.css'
import { AreaCodeApi } from '../../request/api'
import { setShowName } from '../../data/utils'

// 头部搜索栏
class Pager extends Component {
	constructor() {
		super()
		this.state = {
			isTouching: false,
			lastChar: 'A',
			searchText: '',
			countries: []
		}
		this.charStr = '*ABCDEFGHIJKLMNOPQRSTUVWXYZ#'
		this.boxClientTop = 50
		this.touchStart = this.touchStart.bind(this)
		this.touchMove = this.touchMove.bind(this)
		this.touchEnd = this.touchEnd.bind(this)
		this.getChar = this.getChar.bind(this)
		this.gotoChar = this.gotoChar.bind(this)
	}
	componentDidMount() {
		AreaCodeApi().then(res => {
			if (res.code === 200) {
				const { data } = res
				data.map(item => {
					item.showName = setShowName(item, 'areaName').showName
					return item
				})
				this.setState({ countries: data })
				// console.log('data', data)
			}
		})
	}

	touchStart(e) {
		this.setState({ isTouching: true })
		const char = this.getChar(e.touches[0].clientY)
		this.gotoChar(char)
	}
	touchMove(e) {
		e.preventDefault()
		const char = this.getChar(e.touches[0].clientY)
		this.gotoChar(char)
	}
	touchEnd(e) {
		e.preventDefault()
		this.setState({ isTouching: false })
	}
	getChar(clientY) {
		const charHeight = this.refs.charBar.offsetHeight / this.charStr.length
		const index = Math.floor((clientY - this.boxClientTop) / charHeight)
		return this.charStr[index]
	}
	gotoChar(char) {
		if (char === this.lastChar) {
			return false
		}
		this.setState({ lastChar: char })
		if (char === '*') {
			this.refs.countryList.scrollTop = 0
		} else if (char === '#') {
			this.refs.countryList.scrollTop = this.refs.countryList.scrollHeight
		}
		const target = document.querySelector('[data-shortname="' + char + '"]')
		target && target.scrollIntoView()
	}
	componentWillMount() {
		console.log(this.country)
	}
	render() {
		const { hideDialog } = this.props
		return (
			<div className="country-list">
				<IonSearchbar
					value={this.state.searchText}
					onIonChange={e => {
						this.setState({ searchText: e.target.value })
						// console.log('e.target.value', e.target.value)
					}}
				></IonSearchbar>
				<div className="country-border" ref="countryList">
					{this.state.countries.map((item, index) => {
						return (
							<div key={index}>
								{!item.first && <div data-shortname={item.shortName.slice(0, 1)}></div>}
								<div
									className="item"
									onClick={() => {
										hideDialog(item.areaCode)
									}}
								>
									<div>{item.showName}</div>
									<div>{item.areaCode}</div>
								</div>
							</div>
						)
					})}
					<div className="char-list-border">
						<ul
							className="char-list"
							ref="charBar"
							onTouchStart={this.touchStart}
							onTouchMove={this.touchMove}
							onTouchEnd={this.touchEnd}
						>
							{this.charStr.split('').map((char, index) => {
								return (
									<li className="char-item" key={index}>
										{char}
									</li>
								)
							})}
						</ul>
					</div>
					{this.state.isTouching && <div className="char-tip">{this.state.lastChar}</div>}
				</div>
			</div>
		)
	}
}

export default Pager
