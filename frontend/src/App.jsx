//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './components/Login'
import { Products } from './components/Products'
import { Register } from './components/Register'
import { NewProduct } from './components/NewProduct'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/newproduct' element={<NewProduct/>}></Route>
        <Route path='*' element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
