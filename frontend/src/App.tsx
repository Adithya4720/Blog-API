import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Singin'
import { Signup } from './pages/Signup';


function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
