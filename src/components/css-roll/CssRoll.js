import { Component } from 'react'
import './CssRoll.scss'
import { displayIncomeApi } from '../../request/api'

export default class Roll extends Component {
	state = {
		list: [],
		count: 0
	}

	// 页面挂载时开启定时器
	componentDidMount = () => {
		displayIncomeApi().then(res => {
			if (res.code === 200) {
				this.setState({
					list: res.data
				})
			}
		})
	}

	render() {
		return (
			<div className="list">
				<div className="cc rowup">
					{this.state.list.map((item, index) => {
						return (
							<div className="item" key={index}>
								<div className="itemLeft">
									<img src={item.avatar ? item.avatar : '/assets/images/home/avatar.png'} alt="avatar" />
									<span>{item.nickName}</span>
								</div>
								<div className="itemRight">
									<span>今日收益: </span>
									<div className="amount"> $ {item.amount === 'number' ? item.amount.toFixed(2) : item.amount}</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
