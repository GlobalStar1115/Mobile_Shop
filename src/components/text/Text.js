/** * 文字水平滚动 * 用法：<Marquee :lists="lists"/> */
import React, { PureComponent } from 'react'
import './Text.css'
let dataArr = []
let distanceArr = []

export default class Marquee extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			listsObj: {},
			listsArr: [
				'第一个第一个第一个第一个第一个第一个',
				'第二个第二个第二个第二个第二个第二个',
				'第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个第三个'
			]
		}
	}
	componentDidMount() {
		setTimeout(() => {
			let marqueeElementArr = document.getElementsByTagName('li')
			let listsLength = dataArr.length // 数组长度
			let listWidthArr = [] // 储存li宽度数组
			// 获取每个元素需要移动的距离
			for (var i = 0; i < listsLength; i++) {
				listWidthArr.push(marqueeElementArr[i].clientWidth) // 把每一个元素需要移动的距离都存起来
			}
			distanceArr = listWidthArr
			this.move()
		}, 1000)
	}
	componentWillReceiveProps(nextProps) {
		// 父祖件传过来的props发生改变
		// if (this.state.listsObj.length !== nextProps.lists.length) {
		// 	this.setState(
		// 		{
		// 			listsObj: nextProps.lists
		// 		},
		// 		() => {
		// 			this.exchangeDataType()
		// 		}
		// 	)
		// }
	}
	exchangeDataType = () => {
		// 转换数据类型
		// 这里因为后台传给我的数据是对象, 我需要把对象转换成数组, 如果后台本来传给你是数组就不用转换了
		let obj = this.state.listsObj
		for (var i = 0; i < obj.length; i++) {
			dataArr.push(obj[i].description)
		}
		this.setState({ listsArr: dataArr })
	}
	move = () => {
		let marquee = document.getElementById('marquee-box')
		let distance = 0 // 位移距离
		// 设置位移
		setInterval(() => {
			distance = distance - 1
			// 滚动距离超出第一个li的宽度(即第一个li播完了)
			if (-distance >= distanceArr[0]) {
				// 每次移动完一个元素的距离，就把这个元素的宽度放在数组最后
				distanceArr.push(distanceArr.shift())
				let arr = this.state.listsArr
				let copyArr = [...arr]
				// 把移动完的第一个元素剪切下来追加在数组最后
				let newArr = copyArr.concat(copyArr.shift())
				this.setState({ listsArr: newArr })
				// 滚动距离恢复为0
				distance = 0
			}
			// div向左偏移
			marquee.style.transform = 'translateX(' + distance + 'px)'
		}, 20)
	}
	render() {
		let { listsArr } = this.state
		return (
			<div className="wrap">
				<div id="box">
					<div id="marquee-box">
						{listsArr.map((item, index) => {
							return <div key={index}>&nbsp;{item}&nbsp;</div>
						})}
					</div>
				</div>
			</div>
		)
	}
}
