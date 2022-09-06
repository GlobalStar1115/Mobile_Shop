import request from './request'

/*
 * Member module
 */
export const RegisterApi = params => request.post('/app/member/register', params)

export const LoginApi = params => request.post('/app/member/login', params)

export const InfoApi = () => request.get('/app/member/info')

export const LogoutApi = () => request.post('/app/member/logout')

export const MessageApi = () => request.get('/app/member/message')

export const AccountListApi = () => request.get('/app/member/account/list')

export const AccountInfoApi = params => request.get(`/app/member/account/info?${params}`)

export const ModifyPasswordApi = params => request.post('/app/member/login/password/modify', params)

export const ModifySafePasswordApi = params => request.post('/app/member/safe/password/modify', params)

export const ModifyAvatarApi = params => request.post('/app/member/avatar/modify', params)

export const InfoModifyApi = params => request.post('/app/member/modify', params)

export const AddAccountApi = params => request.post('/app/member/account/add', params)

export const ModifyAccountApi = params => request.post('/app/member/account/modify', params)

export const WithdrawtApi = params => request.post('/app/member/withdraw', params)

/*
 * Resource module
 */

export const CarouselImageApi = () => request.get('/app/common/manage/image/carousel')

export const LinksImageApi = () => request.get('/app/common/manage/image/links')

export const BaseImageApi = () => request.get('/app/common/manage/image/base')

export const HomeIntroduceApi = () => request.get('/app/common/manage/graphic/home')

export const BusinessBankApi = () => request.get('/app/common/bank/business')

export const LangApi = () => request.get('/app/common/support/lang')

export const AreaCodeApi = () => request.get('/app/common/area/code')

export const AreaCodeInfoApi = params => request.get(`/app/common/area/code/info?${params}`)

export const ServiceApi = () => request.get('/app/common/customer/service')

export const NoticeApi = () => request.get('/app/common/global/notice')

export const LevelApi = () => request.get('/app/common/member/level/config')

export const displayIncomeApi = () => request.get('/app/common/income/display')

/*
 * Order module
 */
export const GrabOrderApi = () => request.post('/app/member/order/grab')

export const SubmitOrderApi = params => request.post('/app/member/order/submit', params)

export const PresetOrderApi = () => request.get(`/app/member/order/goods/preset`)


/*
 * Record module
 */

export const CashRecordApi = params => request.get(`/app/record/cash?${params}`)

export const MemberBillsApi = () => request.get('/app/report/member/bills')

export const GetGrabOrderApi = params => request.get(`/app/record/order/grab?${params}`)

export const TeamInfoApi = params => request.get(`/app/agent/team/info?${params}`)
