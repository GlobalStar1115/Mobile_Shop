import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

/* Pages */
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Password from './pages/password/Password'
import PasswordSafe from './pages/password-safe/PasswordSafe'
import Language from './pages/language/Language'
import RechargeRecord from './pages/recharge-record/RechargeRecord'
import WithdrawRecord from './pages/withdraw-record/WithdrawRecord'
import Notification from './pages/notification/Notification'
import AccountDetails from './pages/account-details/AccountDetails'
import Tabs from './pages/tabs/Tabs'
import Invite from './pages/invite/Invite'
import Shipping from './pages/shipping/Shipping'
import Withdraw from './pages/withdraw/Withdraw'
import TeamReport from './pages/team-report/TeamReport'
import Bank from './pages/bank/Bank'
import Info from './pages/change-info/Info'
import CompanyProfile from './pages/company-profile/CompanyProfile'
import MyAccount from './pages/my-account/MyAccount'
import CompanyRules from './pages/company-rules/CompanyRules'
import CompanyPersonal from './pages/company-personal/CompanyPersonal'
import CompanyAgency from './pages/company-agency/CompanyAgency'
import CompanyQualification from './pages/company-qualification/CompanyQualification'
import SystemNotice from './pages/system-notice/SystemNotice'
import Support from './pages/support/Support'
const App = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path="/signup">
					<Signup />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/info">
					<Info />
				</Route>
				<Route exact path="/company-profile">
					<CompanyProfile />
				</Route>
				<Route exact path="/company-rules">
					<CompanyRules />
				</Route>
				<Route exact path="/company-personal">
					<CompanyPersonal />
				</Route>
				<Route exact path="/company-agency">
					<CompanyAgency />
				</Route>
				<Route exact path="/company-qualification">
					<CompanyQualification />
				</Route>
				<Route exact path="/password">
					<Password />
				</Route>
				<Route exact path="/support">
					<Support />
				</Route>
				<Route exact path="/password-safe">
					<PasswordSafe />
				</Route>
				<Route exact path="/language">
					<Language />
				</Route>
				<Route exact path="/system-notice">
					<SystemNotice />
				</Route>
				<Route exact path="/recharge-record">
					<RechargeRecord />
				</Route>
				<Route exact path="/withdraw-record">
					<WithdrawRecord />
				</Route>
				<Route exact path="/notification">
					<Notification />
				</Route>
				<Route exact path="/invite">
					<Invite />
				</Route>
				<Route exact path="/account-details">
					<AccountDetails />
				</Route>
				<Route exact path="/shipping">
					<Shipping />
				</Route>
				<Route exact path="/withdraw">
					<Withdraw />
				</Route>
				<Route exact path="/team-report">
					<TeamReport />
				</Route>
				<Route exact path="/my-account">
					<MyAccount />
				</Route>
				<Route exact path="/bank">
					<Bank />
				</Route>
				<Route exact path="/">
					<Redirect to="/signup" />
				</Route>
				<Route path="/app" render={() => <Tabs />} />
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
)

export default App
