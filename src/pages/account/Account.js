import {
	IonTitle,
	IonCard,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonPage,
	IonRouterLink,
	IonRow,
	IonToolbar,
	IonGrid,
	IonButton,
	useIonAlert,
	useIonRouter
} from '@ionic/react'
import styles from './Account.module.scss'

import { chatboxEllipsesOutline, chevronForwardOutline } from 'ionicons/icons'

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { LogoutApi, InfoApi } from '../../request/api'

const Account = () => {
	const router = useIonRouter()
	const { t, i18n } = useTranslation('lang')
	const [present] = useIonAlert()
	const [assets, setAssets] = useState({})
	const [member, setMember] = useState({})

	useEffect(() => {
		InfoApi().then(res => {
			console.log(res)
			if (res.code === 200) {
				const { member, assets } = res.data
				setMember(member)
				setAssets(assets)
			}
		})
	}, [])
	return (
		<IonPage className={styles.accountPage}>
			<IonHeader>
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center">
						<IonCol size="2"></IonCol>
						<IonCol size="8">
							<h4 className="main-title ion-text-center ion-no-margin">{t('account.title')}</h4>
						</IonCol>
						<IonCol size="2">
							<IonRouterLink routerLink="/app/home">
								<IonIcon icon={chatboxEllipsesOutline} />
							</IonRouterLink>
						</IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonCard className={`ion-padding main-radius ion-no-margin ${styles.accountHeading}`}>
					<IonRow className="ion-justify-content-between">
						<div className={`d-flex ion-align-items-center ${styles.userInfo}`} style={{ display: 'flex' }}>
							<IonImg
								src={member.avatar ? member.avatar : '/assets/images/personal/avatar.png'}
								className={styles.userAvatar}
								alt="avatar"
							/>
							<div>
								<h5 className="text-white">{member.memberName}</h5>
								<div className="d-flex ion-align-items-center" style={{ display: 'flex' }}>
									<div>{t('account.invite-code')} &nbsp;</div>
									<div className="main-number" style={{ transform: 'translateY(2px)' }}>
										{member.inviteCode}
									</div>
									<IonRouterLink routerLink="/invite">
										<IonImg src="/assets/images/personal/3.png" className={styles.inviteImg} alt="invite" />
									</IonRouterLink>
								</div>
							</div>
						</div>
						<IonImg src="/assets/images/personal/badge.png" className={styles.usreBadge} alt="badge" />
					</IonRow>
					<IonRow className="ion-justify-content-between ion-margin-top">
						<div
							className="d-flex ion-align-items-center ion-justify-content-end"
							style={{ display: 'flex', flexDirection: 'column', paddingLeft: '30px' }}
						>
							<span className={`main-number ${styles.enableAmount}`} style={{ color: 'blue' }}>
								$ {assets.availableBalance}
							</span>
							<span className="text-white">{t('account.enable-amount')}</span>
						</div>
						<div
							className="d-flex ion-align-items-center ion-justify-content-end"
							style={{ display: 'flex', flexDirection: 'column', paddingRight: '30px' }}
						>
							<span className={`main-number ${styles.frozenAmount}`} style={{ color: 'red' }}>
								$ {assets.lockBalance}
							</span>
							<span className="text-white">{t('account.frozen-amount')}</span>
						</div>
					</IonRow>
				</IonCard>
				<IonGrid className={`ion-no-padding ion-margin-top main-radius ${styles.accountItemBox}`}>
					<IonRouterLink routerLink="/withdraw">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/提现金额@2x.png" />
									<span>{t('account.withdraw-amount')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/team-report">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/团队报表@2x.png" />
									<span>{t('account.t-report')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/my-account">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/交易账户@2x.png" />
									<span>{t('account.my-account')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/recharge-record">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/充值记录@2x.png" />
									<span>{t('account.recharge-record')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/withdraw-record">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/提现记录@2x.png" />
									<span>{t('account.withdraw-record')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/account-details">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/账户明细@2x.png" />
									<span>{t('account.acc-details')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					{/* <IonRouterLink routerLink="/notification">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/11@2x.png" />
									<span>{t('account.notification')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/shipping">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/6@2x.png" />
									<span>{t('account.shipping-address')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink> */}
					<IonRouterLink routerLink="/bank">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/绑定银行卡@2x.png" />
									<span>{t('account.bind-bank')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/info">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/修改资料@2x.png" />
									<span>{t('account.change-info')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/password-safe">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/修改安全密码@2x.png" />
									<span>{t('account.password-safe')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/password">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/修改密码@2x.png" />
									<span>{t('account.password')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRouterLink routerLink="/language">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/选择语言@2x.png" />
									<span>{t('account.language')}</span>
								</IonRow>
							</IonCol>
							<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
								<IonIcon icon={chevronForwardOutline} />
							</IonCol>
						</IonRow>
					</IonRouterLink>
					<IonRow
						onClick={() =>
							present({
								cssClass: 'my-custom-class',
								message: `${t('account.logout-tip')}`,
								buttons: [
									`${t('account.logout-cancel')}`,
									{
										text: `${t('account.logout-confirm')}`,
										handler: d => {
											LogoutApi().then(res => {
												localStorage.removeItem('Authorization')
												router.push('/login')
											})
										}
									}
								],
								onDidDismiss: e => console.log('did dismiss')
							})
						}
						className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab} ${styles.noBorder}`}
					>
						<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
							<IonRow>
								<IonImg src="/assets/images/personal/退出@2x.png" />
								<span>{t('account.logout')}</span>
							</IonRow>
						</IonCol>
						<IonCol size="3" className={`ion-text-right ${styles.accountLinkTabArrow}`}>
							<IonIcon icon={chevronForwardOutline} />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Account
