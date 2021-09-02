import './RMApp.css';
import RMBodyContainer from './components/containers/RMBodyContainer';
import RMFooterContainer from './components/containers/RMFooterContainer';

function RMApp() {
  return (
    <div className="RMApp">
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
