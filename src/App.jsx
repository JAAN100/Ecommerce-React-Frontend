import HomePage  from './Pages/Home';
import CheckoutPage from './Pages/checkout/Checkout-page.jsx';
import Orders from "./Pages/Orders.jsx";
import Tracking from './Pages/Tracking.jsx';
import NotFound from './Pages/404Page.jsx';
import { Routes , Route} from 'react-router'
import './App.css';
function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='orders' element={<Orders />} />
      <Route path='tracking' element={<Tracking />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
