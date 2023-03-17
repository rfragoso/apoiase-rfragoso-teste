import Footer from '../components/Footer';
import Header from '../components/Header';
import {Main} from '../components/style/sharedstyles'

export default function MainTemplate({ children }) {
    return (
      <>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </>
    )
  }