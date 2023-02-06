import './App.css';
import Auth from './pages/Auth/Auth';
import {Route, Routes, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import Home from './pages/Home/Home';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
      <div className='blur' ></div>
      <div className='blur' ></div>
      <Routes>
        <Route path='/' element={user? <Navigate to = 'home'/> : <Navigate to = 'auth'/>} />
        <Route path='/home' element={user? <Home/> : <Navigate to = '../auth'/> }/>
        <Route path='/auth' element={user? <Navigate to = '../home'/> : <Auth/> }/>
        <Route path='/profile/:id' element={user? <ProfilePage/> : <Navigate to = '../auth'/> } />
      </Routes>
    </div>
  );
}

export default App;
