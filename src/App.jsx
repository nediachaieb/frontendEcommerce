import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import React from 'react'
import ListArticles from './components/admin/articles/ListArticles.JSX'
import InsertArticle from './components/admin/articles/insertArticle'
import EditArticle from './components/admin/articles/EditArticle.JSX'
import ListCategories from './components/admin/categories/ListCategories'
import InsertCategorie from './components/admin/categories/InsertCategorie'
import EditCategorie from './components/admin/categories/EditCategorie'
import ListScategorie from './components/admin/scategories/ListScategorie'
import InsertScategorie from './components/admin/scategories/InsertScategorie'
import EditScategorie from './components/admin/scategories/EditScategorie'
import Menu from './components/admin/Menu'
import Home from './components/admin/Home'

const App = () => {
  return (
    <Router>
      <Menu/>
      <Routes>
            <Route path='/' element={<Home/>}/> 
            <Route path='/articles' element={<ListArticles/>}/>
            <Route path='/articles/add' element={<InsertArticle/>}/>
            <Route path='/articles/edit/:id' element={<EditArticle/>}/>

            <Route path='/categories' element={<ListCategories/>}/>
            <Route path='/categories/add' element={<InsertCategorie/>}/>
            <Route path='/categories/edit/:id' element={<EditCategorie/>}/>

            <Route path='/scategories' element={<ListScategorie/>}/>
            <Route path='/scategories/add' element={<InsertScategorie/>}/>
            <Route path='/scategories/edit/:id' element={<EditScategorie/>}/>


            
      </Routes>


    </Router>
    
    
  
  )
}

export default App
