import styles from './Home.module.scss'
import { IonCol, IonContent, IonCard, IonImg, IonGrid, IonPage, IonRow, useIonRouter, IonRouterLink } from '@ionic/react'
import { useTranslation } from 'react-i18next'
import HomeSlider1 from '../../components/home-slider/HomeSlider1'
import Slogan from '../../components/slogan/Slogan'
import DialogNotice from '../../components/dialog-notice/DialogNotice'
import Text from '../../components/text/Text'
import CssRoll from '../../components/css-roll/CssRoll'
import { useEffect, useState } from 'react'
import { InfoApi, LinksImageApi, HomeIntroduceApi, NoticeApi, LevelApi } from '../../request/api'

const Introduce = props => {
	return (
		<div
			style={{ backgroundImage: `url(${props.bgUrl})`, backgroundSize: 'cover', borderRadius: '5px', height: '180px' }}
		>
			<img style={{ width: '110px', height: '110px', marginTop: '20px' }} src={props.iconUrl}></img>
			<div style={{ color: '#000', fontSize: '14px', fontWeight: '600' }}>{props.graphicTitle}</div>
		</div>
	)
}

const Introduce_2 = props => {
	return (
		<div
			style={{ backgroundImage: `url(${props.bgUrl})`, backgroundSize: 'cover', borderRadius: '5px', height: '114px' }}
		>
			<img
				style={{ width: '75px', height: '75px', marginTop: '20px', transform: 'translateY(-6px)' }}
				src={props.iconUrl}
			></img>
			<div style={{ color: '#000', fontSize: '14px', fontWeight: '600', transform: 'translateY(-10px)' }}>
				{props.graphicTitle}
			</div>
		</div>
	)
}

const Home = () => {
	const { t, i18n } = useTranslation('lang')
	const router = useIonRouter()
	const [linksImage, setLinksImage] = useState([])
	const [introduceArr, setIntroduceArr] = useState([])
	const [homeTopText, setHomeTopText] = useState('')
	const [homeNotice, setHomeNotice] = useState('')
	const [assets, setAssets] = useState({})
	const [levelArr, setLevelArr] = useState([])

	const [showDialog, setShowDialog] = useState(false)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		InfoApi().then(res => {
			if (res.code === 200) {
				setAssets(res.data.assets)
			}
		})
		LinksImageApi().then(res => {
			if (res.code === 200) {
				let list = res.data[0].imgUrls.split(',')
				setLinksImage(list)
			}
		})
		HomeIntroduceApi().then(res => {
			if (res.code === 200) {
				// console.log(res)
				setIntroduceArr(res.data)
			}
		})
		NoticeApi().then(res => {
			if (res.code === 200) {
				const { data } = res
				// console.log(data)
				data.map(item => {
					if (item.noticeType == 3) {
						setHomeTopText(item.noticeContent.replace(/<[^>]+>/g, ''))
					} else if (item.noticeType == 2) {
						setHomeNotice(item.noticeContent.replace(/<[^>]+>/g, ''))
						setShowDialog(true)
					}
				})
			}
		})
		LevelApi().then(res => {
			// console.log('level', res.data)
			if (res.code === 200) {
				setLevelArr(res.data)
			}
		})
		// setShowDialog(!showDialog)
	}, [])

	// console.log(totalBalance)
	return (
		<IonPage className={styles.homePage}>
			{showDialog && (
				<DialogNotice hideDialog={() => setShowDialog(!showDialog)} hide={false}>
					<h3>{t('home.announcement')}</h3>
					<p>{homeNotice}</p>
					<div className='btn-body'>
						<button
							onClick={() => setShowDialog(!showDialog)}
						>
							{t('home.close')}
						</button>
					</div>
				</DialogNotice>
			)}
			{showModal && (
				<DialogNotice hideDialog={() => setShowModal(!showModal)} hide={false}>
					<h3>{t('home.promotion')}</h3>
					<p>Coming soon</p>
					<div className='btn-body'>
						<button
							onClick={() => setShowModal(!showModal)}
						>
							{t('home.close')}
						</button>
					</div>
				</DialogNotice>
			)}
			<IonContent fullscreen>
				<IonGrid className={`ion-no-padding ${styles.homeBrandBackground}`}>
					<IonGrid className={`ion-padding-bottom ${styles.homeBrand}`}>
						<IonRow className="ion-justify-content-center ion-align-items-center ion-padding">
							<h4 className="main-title ion-text-center  ion-no-margin">{t('home.title')}</h4>
						</IonRow>
						<IonRow style={{ marginTop: '20px' }}>
							<HomeSlider1 />
						</IonRow>
						<IonRow>
							<Slogan test={homeTopText} />
							{/* <Text /> */}
						</IonRow>
						<IonCard className={`ion-padding ${styles.brandCard}`}>
							<IonRow className="ion-justify-content-between ion-align-items-center ion-padding-start ion-padding-end">
								<IonCol size="6">
									<span>{t('home.mybalance')}:</span>
									<h2 className={`main-number ${styles.balanceAmount}`}>$ {typeof assets.availableBalance === 'number' ? assets.availableBalance.toFixed(2) : assets.availableBalance}</h2>
								</IonCol>
								<IonRouterLink routerLink='/support'>
									<IonImg src="/assets/images/home/14@2x.png" />
								</IonRouterLink>
							</IonRow>
						</IonCard>
						<IonRow
							className={`ion-justify-content-center ion-margin-top ion-padding-top ion-margin-bottom ${styles.imageText}`}
						>
							<div
								className="ion-text-center"
								onClick={() => {
									router.push('/support')
								}}
							>
								<IonImg src="/assets/images/home/10@2x.png" />
								<span>{t('home.coincharge')}</span>
							</div>
							<div
								onClick={() => {
									router.push('/withdraw')
								}}
							>
								<IonImg src="/assets/images/home/11@2x.png" />
								<span>{t('home.cashwithdraw')}</span>
							</div>
							<div onClick={() => setShowModal({ showModal: true })}
							>
								<IonImg src="/assets/images/home/13@2x.png" />
								<span>{t('home.promotion')}</span>
							</div>
							<div
								onClick={() => {
									router.push('/invite')
								}}
							>
								<IonImg src="/assets/images/home/12@2x.png" />
								<span>{t('home.invite')}</span>
							</div>
						</IonRow>
					</IonGrid>
				</IonGrid>
				<IonRow
					className={`main-padding ion-margin-top ion-margin-bottom ${styles.homeCardGroup}`}
					style={{ display: 'flex', justifyContent: 'space-around' }}
				>
					<div style={{ width: '45%' }}>
						<IonCard className="ion-text-center ion-padding ion-no-margin">
							<span>{t('home.commisiontoday')}</span>
							<h5 className="main-number">$ {typeof assets.investmentBalance === 'number' ? assets.investmentBalance.toFixed(2) : assets.investmentBalance
							}</h5>
						</IonCard>
					</div>
					<div style={{ width: '45%' }}>
						<IonCard class="ion-text-center ion-padding ion-no-margin">
							<span>{t('home.totalrevenue')}</span>
							<h5 className="main-number">$ {typeof assets.totalIncomeAmount === 'number' ? assets.totalIncomeAmount.toFixed(2) : assets.totalIncomeAmount
							}</h5>
						</IonCard>
					</div>
				</IonRow>
				<IonGrid className={`main-padding ${styles.membershipLevelSection}`}>
					<IonRow class={`ion-align-items-center ${styles.sectionTitle}`}>
						<div></div>
						<span className="main-padding">{t('home.membership-level.title')}</span>
					</IonRow>
					<IonGrid>
						<IonCard
							className={`ion-padding ion-no-margin ${styles.membershipCard}`}
						// style={{ backgroundImage: `url(${levelArr[0]?.bgUrl})` }}
						>
							<IonRow className="ion-justify-content-between ion-align-items-start">
								<IonCol size="9">
									<IonRow className="ion-align-items-center">
										{/* <IonImg src={levelArr[0]?.iconUrl ? levelArr[0].iconUrl : '/assets/images/home/01@2x.png'} /> */}
										<IonImg src={'/assets/images/home/01@2x.png'} />
										<div>
											<h4>{t('home.membership-level.ordinary-member')}</h4>
											<p>{t('home.membership-level.min-balance')} $ 200.00</p>
											<p>
												{/* {t('home.membership-level.commission')} 0.4 | {levelArr[0]?.maxOrderNumber} */}
												{t('home.membership-level.commission')} 0.4 | 60 {t('home.membership-level.orders')}
											</p>
										</div>
									</IonRow>
								</IonCol>
								<span>{t('home.membership-level.current-level')}</span>
							</IonRow>
						</IonCard>

						<IonCard className={`ion-padding ion-no-margin ${styles.membershipCard}`}>
							<IonRow className="ion-justify-content-between ion-align-items-start">
								<IonCol size="9">
									<IonRow className="ion-align-items-center">
										<IonImg src="/assets/images/home/02@2x.png" />
										<div>
											<h4>{t('home.membership-level.gold-member')}</h4>
											<p>{t('home.membership-level.min-balance')} $ 1000.00</p>
											<p>
												{t('home.membership-level.commission')} 0.5 | 80 {t('home.membership-level.orders')}
											</p>
										</div>
									</IonRow>
								</IonCol>
								<IonRouterLink routerLink='/support'>
									<span>{t('home.membership-level.join')}</span>
								</IonRouterLink>
							</IonRow>
						</IonCard>

						<IonCard className={`ion-padding ion-no-margin ${styles.membershipCard}`}>
							<IonRow className="ion-justify-content-between ion-align-items-start">
								<IonCol size="9">
									<IonRow className="ion-align-items-center">
										<IonImg src="/assets/images/home/03@2x.png" />
										<div>
											<h4>{t('home.membership-level.gold-member')}</h4>
											<p>{t('home.membership-level.min-balance')} $ 3000.00</p>
											<p>
												{t('home.membership-level.commission')} 0.6 | 100 {t('home.membership-level.orders')}
											</p>
										</div>
									</IonRow>
								</IonCol>
								<IonRouterLink routerLink='/support'>
									<span>{t('home.membership-level.join')}</span>
								</IonRouterLink>
							</IonRow>
						</IonCard>
						<IonCard className={`ion-padding ion-no-margin ${styles.membershipCard}`}>
							<IonRow className="ion-justify-content-between ion-align-items-start">
								<IonCol size="9">
									<IonRow className="ion-align-items-center">
										<IonImg src="/assets/images/home/04@2x.png" />
										<div>
											<h4>{t('home.membership-level.crown-member')}</h4>
											<p>{t('home.membership-level.min-balance')} $ 3000.00</p>
											<p>
												{t('home.membership-level.commission')} 0.6 | 120 {t('home.membership-level.orders')}
											</p>
										</div>
									</IonRow>
								</IonCol>
								<IonRouterLink routerLink='/support'>
									<span>{t('home.membership-level.join')}</span>
								</IonRouterLink>
							</IonRow>
						</IonCard>
					</IonGrid>
				</IonGrid>
				<IonGrid className={`main-padding ${styles.membershipIncommeSection}`}>
					<IonRow class={`ion-align-items-center ${styles.sectionTitle}`}>
						<div></div>
						<span className="main-padding">{t('home.membership-income.title')}</span>
					</IonRow>
					<IonGrid>
						<CssRoll />
					</IonGrid>
				</IonGrid>
				<IonGrid className={`ion-no-padding ion-margin-top ${styles.homeBottomBackground}`}>
					<IonGrid className={`ion-padding-top ${styles.homeIntroduction}`}>
						<IonGrid className={styles.accordionBox}>
							<IonRow class={`ion-align-items-center ion-padding-start ${styles.sectionTitle}`}>
								<div></div>
								<span className="main-padding">{t('home.introduction.title')}</span>
							</IonRow>
							{/* {introduceArr.length === 4 ? (
								<div className={`${styles.imgSection_1}`}>
									<div className={`${styles.outImg_1}`}>
										<Introduce
											bgUrl={introduceArr[0].bgUrl}
											graphicTitle={introduceArr[0].graphicTitle}
											iconUrl={introduceArr[0].iconUrl}
										></Introduce>
										<div style={{ marginTop: '20px' }}>
											<Introduce
												bgUrl={introduceArr[1].bgUrl}
												graphicTitle={introduceArr[1].graphicTitle}
												iconUrl={introduceArr[1].iconUrl}
											></Introduce>
										</div>
									</div>
									<div className={`${styles.outImg_2}`}>
										<Introduce
											bgUrl={introduceArr[2].bgUrl}
											graphicTitle={introduceArr[2].graphicTitle}
											iconUrl={introduceArr[2].iconUrl}
										></Introduce>
										<div style={{ marginTop: '20px' }}>
											<Introduce
												bgUrl={introduceArr[3].bgUrl}
												graphicTitle={introduceArr[3].graphicTitle}
												iconUrl={introduceArr[3].iconUrl}
											></Introduce>
										</div>
									</div>
								</div>
							) : introduceArr.length === 5 ? (
								<div className={`${styles.imgSection_2}`}>
									<div className={`${styles.outImg_1}`}>
										<Introduce
											bgUrl={introduceArr[0].bgUrl}
											graphicTitle={introduceArr[0].graphicTitle}
											iconUrl={introduceArr[0].iconUrl}
										></Introduce>
										<div style={{ marginTop: '20px' }}>
											<Introduce
												bgUrl={introduceArr[1].bgUrl}
												graphicTitle={introduceArr[1].graphicTitle}
												iconUrl={introduceArr[1].iconUrl}
											></Introduce>
										</div>
									</div>
									<div className={`${styles.outImg_2}`}>
										<Introduce_2
											bgUrl={introduceArr[2].bgUrl}
											graphicTitle={introduceArr[2].graphicTitle}
											iconUrl={introduceArr[2].iconUrl}
										></Introduce_2>
										<div style={{ marginTop: '19px' }}>
											<Introduce_2
												bgUrl={introduceArr[3].bgUrl}
												graphicTitle={introduceArr[3].graphicTitle}
												iconUrl={introduceArr[3].iconUrl}
											></Introduce_2>
										</div>
										<div style={{ marginTop: '19px' }}>
											<Introduce_2
												bgUrl={introduceArr[4].bgUrl}
												graphicTitle={introduceArr[4].graphicTitle}
												iconUrl={introduceArr[4].iconUrl}
											></Introduce_2>
										</div>
									</div>
								</div>
							) : null} */}
							<IonRow className={`ion-no-padding ${styles.companyInfoContainer}`}>
								<div className={`${styles.containerCol}`}>
									<IonRouterLink routerLink='/company-rules'>
										<div className={`${styles.contentItems}`}>
											<IonImg src={'/assets/images/home/company/rule2.png'} />
											<IonImg src={'/assets/images/home/company/rule1.png'} className={`${styles.lageImg}`} />
											<span>{t('home.introduction.rules-description')}</span>
										</div>
									</IonRouterLink>
									<IonRouterLink routerLink='/company-agency'>
										<div className={`${styles.contentItems}`}>
											<IonImg src={'/assets/images/home/company/agency2.png'} />
											<IonImg src={'/assets/images/home/company/agency1.png'} className={`${styles.lageImg}`} />
											<span>{t('home.introduction.agency-cooperation')}</span>
										</div>
									</IonRouterLink>
								</div>
								<div className={`${styles.containerCol}`}>
									<IonRouterLink routerLink='/company-profile'>
										<div className={`${styles.contentItems}`}>
											<IonImg src={'/assets/images/home/company/profile2.png'} />
											<IonImg src={'/assets/images/home/company/profile1.png'} className={`${styles.smallImg}`} />
											<span>{t('home.introduction.company-profile')}</span>
										</div>
									</IonRouterLink>
									<IonRouterLink routerLink='/company-qualification'>
										<div className={`${styles.contentItems}`}>
											<IonImg src={'/assets/images/home/company/qualification2.png'} />
											<IonImg src={'/assets/images/home/company/qualification1.png'} className={`${styles.smallImg}`} />
											<span>{t('home.introduction.company-qualification')}</span>
										</div>
									</IonRouterLink>
									<IonRouterLink routerLink='/company-personal'>
										<div className={`${styles.contentItems}`}>
											<IonImg src={'/assets/images/home/company/personal2.png'} />
											<IonImg src={'/assets/images/home/company/personal1.png'} className={`${styles.smallImg}`} />
											<span>{t('home.introduction.privacy-policy')}</span>
										</div>
									</IonRouterLink>
								</div>
							</IonRow>
						</IonGrid>
					</IonGrid>
					<IonGrid className={`ion-no-padding ion-no-margin ${styles.homeBottomBackground2}`}>
						<IonGrid className={`ion-padding-top ion-padding-bottom ${styles.homeIntroduction}`}>
							<IonGrid className={styles.homePatners}>
								<IonRow class={`ion-align-items-center ${styles.sectionTitle}`}>
									<div></div>
									<span className="main-padding">{t('home.partner')}</span>
								</IonRow>
								<IonRow className="ion-align-items-center">
									<IonCol size="4">
										<IonImg src={linksImage[0]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[1]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[2]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[3]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[4]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[5]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[6]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[7]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
									<IonCol size="4">
										<IonImg src={linksImage[8]} loading="lazy" alt="partner-img" style={{ transform: 'scale(.9)' }} />
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonGrid>
					</IonGrid>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Home
