import { BrowserRouter, Route, Routes} from 'react-router-dom'
import StudentForm from './components/students/StudentForm'
import StudentList from './components/students/StudentList'
import { Container} from '@mui/material';
import Navbar from './components/Navbar';
import LoginForm from './components/login/loginForm';
import BookList from './components/books/BooksList';
import BookForm from './components/books/BooksForm';


 const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path='/' element={<LoginForm/>} />
          <Route path='/home' element={<><StudentList/><BookList/></>} />
          <Route path='/students/list' element={<StudentList/>} />
          <Route path='/student/new' element={<StudentForm/>} />
          <Route path='/student/:id/edit' element={<StudentForm/>}></Route>
          <Route path='/books/list' element={<BookList/>} />
          <Route path='/books/new' element={<BookForm/>} />
          <Route path='/books/:id/edit' element={<BookForm/>}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  )
} 

export default App;