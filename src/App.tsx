import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';
/* Theme variables */
import './theme/variables.css';
import LoginPage from "./pages/auth/login";
import BerandaPage from "./pages/beranda/beranda";
import PatroliCheckpointPage from "./pages/patroli/checkpoint";
import CheckpointHistoryPage from "./pages/patroli/riwayat-checkpoint";
import ProfilPage from "./pages/profil/profil";
import UpdatePasswordPage from "./pages/profil/update-password";
import UpdateProfilPage from "./pages/profil/update-profil";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login"><LoginPage /></Route>
        <Route exact path="/profil"><ProfilPage /></Route>
        <Route exact path="/profil/update-password"><UpdatePasswordPage /></Route>
        <Route exact path="/profil/update-profil"><UpdateProfilPage /></Route>
        <Route exact path="/beranda"><BerandaPage /></Route>
        <Route exact path="/patroli/checkpoint"><PatroliCheckpointPage /></Route>
        <Route exact path="/patroli/checkpoint/history"><CheckpointHistoryPage /></Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
