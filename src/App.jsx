import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ChatBox from "./components/ChatBox/ChatBox.jsx";
import Survey from "./components/Survey/Survey";
import ToolsHome from "./components/ToolsHome/ToolsHome";
import SurveyHub from "./components/Survey/SurveyHub";

import webSmartAssistant from "./chatbots/clients/wsa.js";
import evergreenHeights from "./chatbots/clients/evergreenHeights";

function AppContent() {
  const location = useLocation();

  const isAssessmentPage = location.pathname.startsWith("/assessments");
  const isHowItWorksPage = location.pathname === "/how-it-works";

  const chatbotConfig = isHowItWorksPage
    ? evergreenHeights
    : webSmartAssistant;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToolsHome />} />

        <Route path="/how-it-works" element={<ToolsHome />} />

        <Route path="/assessments" element={<SurveyHub />} />

        <Route
          path="/assessments/:clientKey/:surveyKey"
          element={<Survey />}
        />

        <Route
          path="/assessments/:clientKey/:surveyKey/start"
          element={<Survey />}
        />

        <Route
          path="/assessments/:clientKey/:surveyKey/results"
          element={<Survey />}
        />
      </Routes>

      {!isAssessmentPage && <ChatBox config={chatbotConfig} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}