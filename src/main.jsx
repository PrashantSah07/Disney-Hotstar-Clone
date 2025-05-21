import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import App from './App.jsx'
import Explore from './routes/Explore.jsx'
import Shows from './routes/Shows.jsx'
import Movies from './routes/Movies.jsx'
import Sports from './routes/Sports.jsx'
import Sparks from './routes/Creators.jsx'
import Categories from './routes/Categories.jsx'
import Mypage from './routes/Mypage.jsx'
import Browse from './routes/Browse.jsx'
import Multi from './routes/Multi.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/explore' element={<Explore />}></Route>
            <Route path='/shows' element={<Shows />}></Route>
            <Route path='/movies' element={<Movies />}></Route>
            <Route path='/sports' element={<Sports />}></Route>
            <Route path='/creators' element={<Sparks />}></Route>
            <Route path='/categories' element={<Categories />}></Route>
            <Route path='/mypage' element={<Mypage />}></Route>
            <Route path='/browse' element={<Browse />}></Route>
            <Route path='/multi/:name/:id' element={<Multi key={window.location.pathname} />}></Route>
        </Routes>
    </BrowserRouter>
)
