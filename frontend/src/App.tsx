import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Singin'
import { Signup } from './pages/Signup';
import { Mainpage } from './pages/Mainpage';

function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Mainpage />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
