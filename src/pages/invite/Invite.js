import styles from './Invite.module.scss';

import { IonButtons, IonIcon, IonBackButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { chevronBackOutline, linkOutline } from "ionicons/icons";


import { useTranslation } from "react-i18next";
import BottomLine from '../../components/bottom-line/BottomLine';
import { useEffect, useState } from 'react'
import { InfoApi } from '../../request/api'

const Invite = () => {
    const { t, i18n } = useTranslation('lang');
    const [member, setMember] = useState({})

    useEffect(() => {
        InfoApi().then(res => {
            console.log(res)
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
                    <IonButton expand="block" onClick={() => navigator.clipboard.writeText(`${window.location.protocol}//${window.location.hostname}/siginup/` + member.inviteCode)}><IonIcon icon={linkOutline} />{t('invite.button-text')}</IonButton>
                </IonGrid>
            </IonContent>
            <BottomLine />
        </IonPage>
    );
};

export default Invite;