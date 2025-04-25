import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupAdmin from './pages/SignupAdmin';
import AddBlog from './pages/AddBlog';
import SingleBlogPage from './pages/SingleBlogPage';
import Navbar from './components/Navbar'; 
import AdminDashboard from './pages/AdminDashboard';

function App() {
	return (
		<Router> 
			<Navbar /> 
			<div className="content-container">
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/admin/signup' element={<SignupAdmin />} />
				<Route path='/add-blog' element={<AddBlog />} />
				<Route path='/blog/:id' element={<SingleBlogPage />} />
				<Route path='/admin/dashboard' element={<AdminDashboard />} />
			</Routes>
			</div>
		</Router>
	);
}

export default App;
