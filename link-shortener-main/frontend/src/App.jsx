import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useAppLogic } from './AppLogic.jsx'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Toast from './components/Toast/Toast.jsx'
import LogModal from './components/LogModal/LogModal.jsx'

function App() {
  const {
    confirmAdvice,
    message,
    icon,
    classIcon,
    userSession,
    userInfoSettings,
    guestId,
    feedToast,
    toggleLogModal,
    isLogModalOpen,
    logoutSession,
  } = useAppLogic()

  return (
    <div className="app-container">
      <Navbar onOpenModal={toggleLogModal} logoutSession={logoutSession} />

      <Routes>
        {/* Rutas de la app */}
        <Route
          path="/"
          element={<Home feedToast={feedToast} guestId={guestId} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              feedToast={feedToast}
              userSession={userSession}
              userInfoSettings={userInfoSettings}
            />
          }
        />
      </Routes>

      <LogModal isVisible={isLogModalOpen} feedToast={feedToast} />

      {confirmAdvice && (
        <Toast
          message={message}
          icon={icon}
          classIcon={classIcon}
          confirmAdvice={confirmAdvice}
        />
      )}
      <footer id="footer">
        <p>BeruzDev</p>
      </footer>
    </div>
  )
}

export default App
