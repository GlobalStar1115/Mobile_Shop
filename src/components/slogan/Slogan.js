import React, { Component } from 'react'
import './Slogan.css'

export default class Slogan extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sloganList: [
				'滚动公告：手机电话费开始剪短发的时候'
			],
			sloganIndex: 0
		}
		this.sign = true //判断是否进行文字滚动动画
		this.textWidth = 0 //文字的宽度
		this.textLeft = 0
		this.offsetStep = 1 //每次移动的步长
	}

	componentDidMount() {
		let sloganContainer = this.container.clientWidth
		this.text.style.left = sloganContainer + 'px'
		this.timer = setInterval(() => {
			if (this.sign) {
				if (this.state.sloganList && this.state.sloganList.length) {
					this.showSlogan()
				} else {
					clearInterval(this.timer)
				}
			} else {
				this.timer = null
			}
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		const { sloganList, sloganIndex } = this.state
		return (
			<div ref={ref => (this.container = ref)} className="container">
				<span ref={ref => (this.text = ref)} className="slogan">
					{sloganList[sloganIndex]}
				</span>
			</div>
		)
	}

	showSlogan = () => {
		this.textWidth = this.text.clientWidth //文字宽度
		this.textLeft = parseInt(this.text.style.left) //相对父元素偏移距离
		if (this.textLeft >= -this.textWidth) this.sign = false
		if (this.textLeft > -this.textWidth) {
			this.text.style.left = this.textLeft - this.offsetStep + 'px'
			requestAnimationFrame(this.showSlogan)
		} else {
			let nextIndex = this.state.sloganIndex != this.state.sloganList.length - 1 ? ++this.state.sloganIndex : 0
			this.setState(
				{
					sloganIndex: nextIndex
				},
				() => {
					this.text.style.left = this.container.clientWidth + 'px'
					this.textWidth = this.text.clientWidth
					this.sign = true
				}
			)
		}
	}
}
