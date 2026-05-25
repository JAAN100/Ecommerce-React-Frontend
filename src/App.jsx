import HomePage  from './Pages/Home'
import CheckoutPage from './Pages/Checkout-page'
import { Routes , Route} from 'react-router'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
