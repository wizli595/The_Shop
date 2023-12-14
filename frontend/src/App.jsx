import { Container, } from "react-bootstrap"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"

function App() {
  return (<>
    <ToastContainer />
    <Header />
    <main className="py-3">
      <Container >
        <Outlet />
      </Container>
    </main>
    <Footer />
  </>
  )
}

export default App
