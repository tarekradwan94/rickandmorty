import './RMApp.css';
import RMBodyContainer from './components/containers/RMBodyContainer';
import RMFooterContainer from './components/containers/RMFooterContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RMApp() {
  return (
    <div className="RMApp">
      <ToastContainer></ToastContainer>
      <div className="RMBody">
        <RMBodyContainer></RMBodyContainer>
      </div>
      <div className="RMFooter">
        <RMFooterContainer></RMFooterContainer>
      </div>
    </div>
  );
}

export default RMApp;
