import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ChatBox from "./components/ChatBox/ChatBox.jsx";
import RobinRun from "./chatbots/clients/robinRun.js";
import Survey from "./components/Survey/Survey";
import SurveyEmbed from "./components/SurveyEmbed/SurveyEmbed";
// import FontRow from "./chatbots/clients/fontrow.js";


function AppContent() {
  const location = useLocation();
  const isAssessmentPage = location.pathname.startsWith("/assessments/");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div />} />
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

      {!isAssessmentPage && <ChatBox config={RobinRun} />}
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