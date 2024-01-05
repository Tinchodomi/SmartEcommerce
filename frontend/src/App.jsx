//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './components/Login'
import { Products } from './components/Products'
import { Register } from './components/Register'
import { NewProduct } from './components/NewProduct'
import MercadoPago from './components/mercadoPago'




function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/newproduct' element={<NewProduct/>}></Route>
        <Route path='*' element={<Products/>}></Route>
        <Route path='/checkout' element={<MercadoPago/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
