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
								<div className="d-flex ion-align-items-center" style={{ display: 'flex', color: '#a1a8ae' }}>
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
					<IonRow className='ion-justify-content-between ion-margin-top ion-padding-top'>
						<div>
							<span>{t('record.account-amount')}:</span>
							<h3 className="main-number ion-no-margin">$ 1234.123</h3>
						</div>
						<div>
							<div
								className="d-flex ion-align-items-center ion-justify-content-end"
							>
								<span className="text-white ion-margin-end">{t('account.enable-amount')}:</span>
								<span className={`main-number ${styles.enableAmount}`} style={{ color: '#49c1fb' }}>
									$ {assets.availableBalance}
								</span>
							</div>
							<div
								className="d-flex ion-align-items-center ion-justify-content-end"
							>
								<span className="text-white ion-margin-end">{t('account.frozen-amount')}:</span>
								<span className={`main-number ${styles.frozenAmount}`} style={{ color: '#ff6565' }}>
									$ {assets.lockBalance}
								</span>
							</div>
						</div>
					</IonRow>
				</IonCard>
				<IonGrid className={`ion-no-padding ion-margin-top main-radius ${styles.accountItemBox}`}>
					<IonRouterLink routerLink="/withdraw">
						<IonRow className={`ion-justify-content-between ion-align-items-center ${styles.accountLinkTab}`}>
							<IonCol size="9" className={`ion-text-left ${styles.accountLinkTabTitle}`}>
								<IonRow>
									<IonImg src="/assets/images/personal/3@2x.png" />
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
									<IonImg src="/assets/images/personal/4@2x.png" />
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
									<IonImg src="/assets/images/personal/13@2x.png" />
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
									<IonImg src="/assets/images/personal/12@2x.png" />
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
									<IonImg src="/assets/images/personal/5@2x.png" />
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
									<IonImg src="/assets/images/personal/11@2x.png" />
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
									<IonImg src="/assets/images/personal/6@2x.png" />
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
									<IonImg src="/assets/images/personal/7@2x.png" />
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
									<IonImg src="/assets/images/personal/8@2x.png" />
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
									<IonImg src="/assets/images/personal/9@2x.png" />
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
								<IonImg src="/assets/images/personal/10@2x.png" />
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
