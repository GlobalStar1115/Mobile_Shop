import {
	IonButton,
	IonCard,
	IonDatetime,
	IonButtons,
	IonTitle,
	IonBackButton,
	IonImg,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonPage,
	IonRouterLink,
	IonRow,
	IonToolbar,
	IonFooter
} from '@ionic/react'
import styles from './TeamReport.module.scss'

import { chevronBackOutline, calendarOutline } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'
import { TeamInfoApi } from '../../request/api'
import { useEffect, useState, useCallback } from 'react'

function getNowFormatDate(day) {
	const date = new Date()
	if (day) {
		date.setTime(date.getTime() + 24 * day * 60 * 60 * 1000)
	}
	const seperator1 = '-'
	const year = date.getFullYear()
	let month = date.getMonth() + 1
	let strDate = date.getDate()
	if (month >= 1 && month <= 9) {
		month = '0' + month
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = '0' + strDate
	}
	const currentdate = year + seperator1 + month + seperator1 + strDate
	return currentdate
}

const TeamReport = () => {
	const { t, i18n } = useTranslation('lang')
	const [timeActive, setTimeActive] = useState(0)
	const [levelActive, setLevelActive] = useState(0)
	const [start, setStart] = useState(getNowFormatDate())
	const [end, setEnd] = useState(getNowFormatDate())
	const [list, setList] = useState([])

	useEffect(() => {
		getTeamInfo()
	}, [levelActive, start, end])

	const getTeamInfo = useCallback(() => {
		let data = `level=${levelActive}&beginTime=${start}&endTime=${end}`
		TeamInfoApi(data).then(res => {
			console.log(res)
			if (res.code === 200) {
				console.log(res.data)
				setList(res.data)
			}
		})
	}, [levelActive, start, end])

	const changeLevel = val => {
		console.log('val', val)
		setLevelActive(val)
	}

	const changeTime = val => {
		switch (val) {
			case 0:
				setTimeActive(val)
				setStart('2022-01-01')
				setEnd(getNowFormatDate())
				getTeamInfo()
				break
			case 1:
				setTimeActive(val)
				setStart(getNowFormatDate())
				setEnd(getNowFormatDate())
				getTeamInfo()
				break
			case 2:
				setTimeActive(val)
				setStart(getNowFormatDate(-1))
				setEnd(getNowFormatDate(-1))
				getTeamInfo()
				break
			case 3:
				setTimeActive(val)
				setStart(getNowFormatDate(-6))
				setEnd(getNowFormatDate())
				getTeamInfo()
				break
			default:
				break
		}
	}

	return (
		<IonPage className={styles.teamReportPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2">
							<IonButtons>
								<IonBackButton icon={chevronBackOutline} text="" className="custom-back ion-no-padding ion-no-margin" />
							</IonButtons>
						</IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('team-report.title')}</h4>
						</IonCol>
						<IonCol size="2"></IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid>
					<IonRow className={`ion-justify-content-center ${styles.tabBox2}`}>
						<span
							onClick={() => {
								changeLevel(0)
							}}
							className={`${levelActive == 0 ? `${styles.active}` : 'null'}`}
						>
							全部
						</span>

						<span
							onClick={() => {
								changeLevel(1)
							}}
							className={`${levelActive == 1 ? `${styles.active}` : 'null'}`}
						>
							一级
						</span>
						<span
							onClick={() => {
								changeLevel(2)
							}}
							className={`${levelActive == 2 ? `${styles.active}` : 'null'}`}
						>
							二级
						</span>
						<span
							onClick={() => {
								changeLevel(3)
							}}
							className={`${levelActive == 3 ? `${styles.active}` : 'null'}`}
						>
							三级
						</span>
					</IonRow>
					<IonRow className={`ion-justify-content-center ${styles.tabBox1}`}>
						<span
							onClick={() => {
								changeTime(0)
							}}
							className={`${timeActive == 0 ? `${styles.active}` : 'null'}`}
						>
							{t('team-report.all')}
						</span>
						<span
							onClick={() => {
								changeTime(1)
							}}
							className={`${timeActive == 1 ? `${styles.active}` : 'null'}`}
						>
							{t('team-report.today')}
						</span>
						<span
							onClick={() => {
								changeTime(2)
							}}
							className={`${timeActive == 2 ? `${styles.active}` : 'null'}`}
						>
							{t('team-report.yesterday')}
						</span>
						<span
							onClick={() => {
								changeTime(3)
							}}
							className={`${timeActive == 3 ? `${styles.active}` : 'null'}`}
						>
							{t('team-report.this-week')}
						</span>
					</IonRow>

					<IonRow
						className={`ion-align-items-center ion-justify-content-around main-radius ion-margin ${styles.diplayRange}`}
					>
						<IonIcon icon={calendarOutline} />
						<IonDatetime value={start} displayFormat="YYYY-MM-DD"></IonDatetime>
						<p></p>
						<IonDatetime value={end} displayFormat="YYYY-MM-DD"></IonDatetime>
					</IonRow>
					<IonCard className="ion-padding main-radius ion-no-margin">
						<div className="d-flex ion-justify-content-between ion-margin-bottom">
							<span>{t('team-report.all-data')}</span>
							<span className="main-number">$ 12345.123</span>
						</div>
						<p>
							{t('team-report.team-size')}: {list.numberOfMembers}
						</p>
						<p>
							{t('team-report.team-commission')}: {list.totalRebateAmount}
						</p>
					</IonCard>
					<IonGrid className={styles.itemBody}>
						{list.memberList &&
							list.memberList.map((item, index) => {
								return (
									<div
										className={`d-flex ion-align-items-center ${styles.dataItem}`}
										key={index}
										style={{ display: 'flex' }}
									>
										<IonCol size="2" style={{ marginLeft: '10px' }}>
											<IonImg src="/assets/images/personal/avatar.png" alt="avatar" />
										</IonCol>
										<div>
											<p className={styles.userName}>
												{t('team-report.user-name')}: {item.memberName}
											</p>
											<p>
												{t('team-report.user-level')}: {item.memberLevelId}
											</p>
										</div>
										<div>
											<p>
												{t('team-report.phone')}: {item.phoneNumber}
											</p>
											<p>
												{t('team-report.register-time')}: {item.createTime}
											</p>
										</div>
									</div>
								)
							})}
						{list.memberList?.length == 0 ? <h4 style={{ textAlign: 'center' }}>暂无数据</h4> : null}
					</IonGrid>
				</IonGrid>
			</IonContent>
			<IonFooter>
				<IonRow className="ion-justify-content-center ion-padding-bottom">
					<div className={styles.footerLine}></div>
				</IonRow>
			</IonFooter>
		</IonPage>
	)
}

export default TeamReport
