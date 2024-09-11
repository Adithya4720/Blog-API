import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup';


function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
