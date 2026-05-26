import HomePage  from './Pages/Home'
import CheckoutPage from './Pages/checkout/Checkout-page.jsx'
import Orders from "./Pages/Orders.jsx"
import Tracking from './Pages/Tracking.jsx'
import { Routes , Route} from 'react-router'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='orders' element={<Orders />} />
      <Route path='tracking' element={<Tracking />}/>
    </Routes>
  )
}

export default App
