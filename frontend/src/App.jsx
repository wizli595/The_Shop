import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"

function App() {
  return (<>
    <Header />
    <main className="py-3">
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
  </>
  )
}

export default App
