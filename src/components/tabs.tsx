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
import CheckpointHistoryPage from "../pages/patroli/riwayat-checkpoint";

const PagesWithoutNavBar = [
    "/login",
    "/ubah-password",
    "/informasi-dasar",
];

const MainTabs: React.FC = () => {
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
        tabBar: `p-2 bg-zinc-50 rounded-full my-2 mx-2  `,
        tabButton: `bg-zinc-50`, //`font-black text-black focus:text-red-700`,
        tabLabel: ` text-xs mt-1`,
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
                    {/*<HomeIcon strokeWidth={1} />*/}
                    <IonLabel className={styles.tabLabel}>Beranda</IonLabel>
                </IonTabButton>

                <IonTabButton
                    tab="absensi"
                    href="/absensi"
                    className={styles.tabButton}
                >
                    {/*<HistoryIcon strokeWidth={1} />*/}
                    <IonLabel className={styles.tabLabel}>Presensi</IonLabel>
                </IonTabButton>

                <IonTabButton
                    tab="aktifitas"
                    href="/aktifitas"
                    className={styles.tabButton}
                >
                    {/*<FileClockIcon strokeWidth={1} />*/}
                    <IonLabel className={styles.tabLabel}>Aktifitas</IonLabel>
                </IonTabButton>

                <IonTabButton tab="gaji" href="/gaji" className={styles.tabButton}>
                    {/*<BanknoteIcon strokeWidth={1} />*/}
                    <IonLabel className={styles.tabLabel}>Gaji</IonLabel>
                </IonTabButton>

                <IonTabButton tab="profil" href="/profil" className={styles.tabButton}>
                    {/*<ContactIcon strokeWidth={1} />*/}
                    <IonLabel className={styles.tabLabel}>Profil</IonLabel>
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
                    path="/profil"
                    render={() => (
                        <ProtectedRoute>
                            <ProfilPage/>
                        </ProtectedRoute>
                    )}
                />

                <Route
                    path="/profil/update-password"
                    render={() => (
                        <ProtectedRoute>
                            <UpdatePasswordPage/>
                        </ProtectedRoute>
                    )}
                />


                <Route
                    path="/profil/update-profil"
                    render={() => (<ProtectedRoute>
                        <UpdateProfilPage/>
                    </ProtectedRoute>)}
                />

                <Route
                    path="/patroli/checkpoint/history"
                    render={() => (<ProtectedRoute>
                        <CheckpointHistoryPage/>
                    </ProtectedRoute>)}
                />


            </IonRouterOutlet>

        </IonTabs>
    );
};

export default MainTabs