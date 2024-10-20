import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'


function App() {

  return (
    <Provider store={appStore}>
   <BrowserRouter basename='/'>
   <Routes>
      <Route path="/"  element={<Body />}>
        <Route path="/login" element={<Login />} />
      </Route>
   </Routes>
   </BrowserRouter>
   </Provider>
  )
}

export default App
