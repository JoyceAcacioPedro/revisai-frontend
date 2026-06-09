import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';

// IMPORTAÇÕES DAS TELAS PÚBLICAS
import Start from './login-signup/Start.jsx';
import SignUp from './login-signup/SignUp.jsx';
import Login from './login-signup/Login.jsx';

// IMPORTAÇÕES DO DASHBOARD (CADA COMPONENTE IMPORTADO APENAS UMA VEZ)
import Dashboard from './Dashboard/Dashboard.jsx';
import Revisions from './Dashboard/Revisions.jsx';
import AddRevisions from './Dashboard/AddRevisions.jsx';
import Progress from './Dashboard/Progress.jsx'; 
import Profile from './Dashboard/Profile.jsx';
import AddSubject from './Dashboard/AddSubject.jsx';
import AddTopic from './Dashboard/AddTopic.jsx';

import StudyPage from './Dashboard/StudyPage.jsx';

import ForgotPassword from './login-signup/ForgotPassword.jsx';
import ResetPassword from './login-signup/ResetPassword.jsx';
import Subjects from './Dashboard/Subjects.jsx';
function App() {
  return (
    <Routes>
      {/* ROTAS PÚBLICAS */}
      <Route path="/" element={<Start />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      
      {/* ROTAS INTERNAS PROTEGIDAS PELO LAYOUT */}
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/revisions" element={<Layout><Revisions /></Layout>} />
      <Route path="/progress" element={<Layout><Progress /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      

      <Route path="/study/:activityId" element={<Layout><StudyPage /></Layout>} />
      {/* FORMULÁRIOS DE ADIÇÃO */}
      <Route path="/addsubject" element={<Layout><AddSubject /></Layout>} />
      <Route path="/addtopic" element={<Layout><AddTopic /></Layout>} />
      <Route path="/addrevisions" element={<AddRevisions />} />
     
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/subjects" element={<Layout><Subjects /></Layout>} />

      
    </Routes>
  );
}

export default App;