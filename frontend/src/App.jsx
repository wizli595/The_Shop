import { Container } from "react-bootstrap"
import Header from "./components/header"
import Footer from "./components/footer"

function App() {
  return (<>
    <Header />
    <main className="py-3">
      <Container>
        <h1> Shop</h1>
      </Container>
    </main>
    <Footer />
  </>
  )
}

export default App
