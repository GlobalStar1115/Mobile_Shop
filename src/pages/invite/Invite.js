import styles from './Invite.module.scss';

import { IonButtons, IonIcon, IonBackButton, IonToast, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { chevronBackOutline, linkOutline } from "ionicons/icons";

import { useTranslation } from "react-i18next";
import BottomLine from '../../components/bottom-line/BottomLine';
import { useEffect, useState } from 'react'
import { InfoApi } from '../../request/api'
import { useHistory } from 'react-router';
const Invite = () => {
    const { t, i18n } = useTranslation('lang');
    const [member, setMember] = useState({})
    const [message, setMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [showToast2, setShowToast2] = useState(false)

    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('Authorization') === null) history.push('/login')
    }, [])
    // const copyLink = () => {
    //     navigator.clipboard.writeText(window.location.protocol + window.location.hostname + '/siginup/' + member.inviteCode).then(() => {
    //         setShowToast(true)
    //     }, () => {
    //         setShowToast2(true)
    //     });
    // }

    const unsecuredCopyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea); textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy')
        } catch (err) {
            console.error('Unable to copy to clipboard', err)
        } document.body.removeChild(textArea)
    };

    const copyToClipboard = (content) => {
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(content);
        } else {
            unsecuredCopyToClipboard(content);
        }
    };
    const buttonPress = () => {
        copyToClipboard(window.location.protocol + window.location.hostname + '/siginup/' + member.inviteCode);
        setShowToast(true)
    };
    useEffect(() => {
        InfoApi().then(res => {
            // console.log(res)
            if (res.code === 200) {
                const { member } = res.data
                setMember(member)
            }
        })
    }, [])
    return (
        <IonPage className={styles.invitePage}>
            <IonHeader>
                <IonToolbar>
                    <IonRow className='ion-justify-content-between ion-align-items-center'>
                        <IonCol size='2'>
                            <IonButtons>
                                <IonBackButton icon={chevronBackOutline} text="" className="ion-no-padding ion-no-margin" />
                            </IonButtons>
                        </IonCol>
                        <IonCol size='8'>
                            <h4 className='main-title ion-text-center ion-no-margin'>{t('invite.title')}</h4>
                        </IonCol>
                        <IonCol size='2'>

                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-padding'>
                <IonGrid className="ion-padding">
                    <span className='text-white ion-text-justify'>{t('invite.content')}</span>
                    <p className='ion-text-center text-white main-number ion-padding-top'>{t('invite.invite-code')}: {member.inviteCode}</p>
                    {/* <IonButton expand="block" onClick={copyLink}><IonIcon icon={linkOutline} />{t('invite.button-text')}</IonButton> */}
                    <IonButton expand="block" onClick={buttonPress}><IonIcon icon={linkOutline} />{t('invite.button-text')}</IonButton>
                </IonGrid>
            </IonContent>
            <BottomLine />
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Copied invitation link"
                duration={1000}
                color="primary"
            />
            <IonToast
                isOpen={showToast2}
                onDidDismiss={() => setShowToast2(false)}
                message="There are some issues"
                duration={1000}
                color="danger"
            />
        </IonPage >
    );
};

export default Invite;