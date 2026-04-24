import "./App.css";
import ChatBox from "./components/ChatBox/ChatBox.jsx";
import fontrowConfig from "./chatbots/clients/fontrow.js";

export default function App() {
  return (
    <div className="App">
      <ChatBox config={fontrowConfig} />
    </div>
  );
}