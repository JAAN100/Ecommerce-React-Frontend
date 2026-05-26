import Header from '../Components/Header.jsx' 
import './404Page.css';
function NotFound(){
  return (
    <>
      <Header />
      <div className='container-not-found'>
        <p className='not-found'>404 Page not Found</p>
      </div>
    </>
  )
}
export default NotFound;