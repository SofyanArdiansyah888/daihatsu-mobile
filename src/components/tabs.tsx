import {IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonRouter} from "@ionic/react";
import {useLocation} from "react-router";
import {useAuth} from "../providers/auth-provider";
import {useEffect, useLayoutEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {ProtectedRoute} from "../route/protected-route";
import LoginPage from "../pages/auth/login";
import {App} from "@capacitor/app";
import BerandaPage from "../pages/beranda/beranda";
import "moment/locale/id";
import ProfilPage from "../pages/profil/profil";
import UpdatePasswordPage from "../pages/profil/update-password";
import UpdateProfilPage from "../pages/profil/update-profil";
import RiwayatPatroliPage from "../pages/patroli/riwayat-patroli";
import {HistoryOutlined, HomeOutlined, SafetyOutlined, SettingOutlined} from "@ant-design/icons";
import CheckpointPatroliPage from "../pages/patroli/checkpoint-patroli";
import PatroliSecurityPage from "../pages/patroli-security/patroli-security";
import PatroliWargaPage from "../pages/patroli-warga/patroli-warga";
import JadwalPage from "../pages/jadwal/jadwal";
import CheckpointPage from "../pages/checkpoint/checkpoint";
import CheckpointPatroliMap from "../pages/patroli/component/checkpoint-patroli-map";

const PagesWithoutNavBar = [
    "/login",
    "/update-password",
    "/update-profil",
    "/checkpoint-patroli",
    "/riwayat-patroli",
    "/checkpoint",
];

const MainTabs: React.FC = () => {
    const {user} = useAuth()
    const ionRouter = useIonRouter();
    const location = useLocation();
    const auth = useAuth();
    const pathname = location.pathname;

    useLayoutEffect(() => {
        const e = document.querySelector("ion-tab-bar");
        if (!e) return;
        const hideNavBar = PagesWithoutNavBar.includes(pathname);
        e.style.display = hideNavBar ? "none" : "flex";
    }, [pathname]);

    useEffect(() => {
        document.addEventListener("ionBackButton", (ev: any) => {
            ev.detail.register(-1, () => {
                if (!ionRouter.canGoBack()) {
                    App.exitApp();
                }
            });
        });
    }, [ionRouter]);

    const styles = {
        tabBar: ` bg-gray-100 rounded-xl mx-3 mb-3  `,
        tabButton: `bg-gray-100 space-y-1.5`, //`font-black text-black focus:text-red-700`,
        tabLabel: ` text-[10px] mt-1`,
    };

    return (
        <IonTabs>
            {/*TAB BUTTONS*/}
            <IonTabBar slot="bottom" className={styles.tabBar}>
                <IonTabButton
                    tab="beranda"
                    href="/beranda"
                    className={styles.tabButton}
                >
                    <HomeOutlined className={"text-lg"}/>
                    <IonLabel className={styles.tabLabel}>Beranda</IonLabel>
                </IonTabButton>

                {
                    user?.role !== 'warga' && <IonTabButton
                        tab="jadwal"
                        href="/jadwal"
                        className={styles.tabButton}
                    >
                        <HistoryOutlined className={"text-lg"}/>
                        <IonLabel className={styles.tabLabel}>Jadwal</IonLabel>
                    </IonTabButton>
                }


                <IonTabButton
                    tab="patroli-warga"
                    href="/patroli-warga"
                    className={styles.tabButton}
                >
                    <SafetyOutlined className={"text-lg"}/>
                    <IonLabel className={styles.tabLabel}>Warga</IonLabel>
                </IonTabButton>

                {
                    user?.role !== 'warga' &&
                    <IonTabButton tab="patroli-security" href="/patroli-security" className={styles.tabButton}>
                        <SafetyOutlined className={"text-lg"}/>
                        <IonLabel className={styles.tabLabel}>Security</IonLabel>
                    </IonTabButton>
                }

                <IonTabButton tab="profil" href="/profil" className={styles.tabButton}>
                    <SettingOutlined className={"text-lg"}/>
                    <IonLabel className={styles.tabLabel}>Pengaturan</IonLabel>
                </IonTabButton>
            </IonTabBar>

            {/*TAB ROUTE*/}
            <IonRouterOutlet>
                <Route exact path="/" render={() => <Redirect to="/beranda"/>}/>
                <Route
                    exact
                    path="/login"
                    render={() => (auth.user ? <Redirect to="/"/> : <LoginPage/>)}
                />

                <Route
                    path="/beranda"
                    render={() => (
                        <ProtectedRoute>
                            <BerandaPage/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/jadwal"
                    render={() => (
                        <ProtectedRoute>
                            <JadwalPage/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/checkpoint-patroli-map"
                    render={() => (
                        <ProtectedRoute>
                            <CheckpointPatroliMap/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/patroli-security"
                    render={() => (
                        <ProtectedRoute>
                            <PatroliSecurityPage/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/patroli-warga"
                    render={() => (
                        <ProtectedRoute>
                            <PatroliWargaPage/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/profil"
                    render={() => (
                        <ProtectedRoute>
                            <ProfilPage/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/update-password"
                    render={() => (
                        <ProtectedRoute>
                            <UpdatePasswordPage/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/checkpoint"
                    render={() => (
                        <ProtectedRoute>
                            <CheckpointPage/>
                        </ProtectedRoute>
                    )}
                />


                <Route
                    path="/update-profil"
                    render={() => (<ProtectedRoute>
                        <UpdateProfilPage/>
                    </ProtectedRoute>)}
                />

                <Route
                    path="/checkpoint-patroli"
                    render={() => (<ProtectedRoute>
                        <CheckpointPatroliPage/>
                    </ProtectedRoute>)}
                />

                <Route
                    path="/riwayat-patroli"
                    render={() => (<ProtectedRoute>
                        <RiwayatPatroliPage/>
                    </ProtectedRoute>)}
                />


            </IonRouterOutlet>

        </IonTabs>
    );
};

export default MainTabs