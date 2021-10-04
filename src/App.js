import logo from './logo.svg';
import './App.css';
import {onStartChatClick} from './start-chat-as-customer.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button style={{padding:'10PX',}} onClick={onStartChatClick}>Start chat</button>
      </header>
    </div>
  );
}

export default App;
