
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// 
import Home1 from './components/Home/Home1.jsx';
import Header from './components/Header/Header.jsx';
import Rules from './components/Rules/Rules.jsx';
import Admin from './components/Administration/Admin.jsx';
import Login from './components/Administration/Login.jsx';
import SignUp from './components/Administration/SignUp.jsx';
import Leaderboard from './components/Leaderboard/Leaderboard.jsx';
import data from './components/data/data.json';
import Hints from './components/Hints/Hints.jsx';
import QuestionPage from './components/QuestionPage/QuestionPage.jsx';
import Countdown from './components/Countdown/Countdown.jsx';



function App() {
  return (
    <Router>
      <Header t={data.g} />
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route exact path="/Rules" element={<Rules />} />
          <Route exact path="/Account" element={<Admin />} />
          <Route exact path="/Leaderboard" element={<Leaderboard />} />
          <Route exact path="/Hints" element={<Hints />} />
          <Route exact path="/Countdown" element={<Countdown />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/QuestionPage" element={<QuestionPage />}/> 
        </Routes>
        
    </Router>
  );
}

export default App;









// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home1 from './components/Home/Home1';
// import Header from './components/Header/Header';
// import Rules from './components/Rules/Rules';
// import Admin from './components/Administration/Admin';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home1 />} />
//           <Route path='/about' element={<Rules />} />
//           <Route path='/Account' element={<Admin />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;