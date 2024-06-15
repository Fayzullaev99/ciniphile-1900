import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Movies from './pages/movies'
import Series from './pages/series'
import Search from './pages/search'
import NotFound from './pages/notfound'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Detail from './components/detail'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/series' element={<Series />} />
        <Route path='/search' element={<Search />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App