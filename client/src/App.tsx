import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserRoutes from './routes/UserRoutes'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  
  return (
    <>
    <Provider store={store}>
    <Routes>
      <Route path='/*' element={<UserRoutes />}/>
    </Routes>
    </Provider>
    </>
  )
}

export default App
