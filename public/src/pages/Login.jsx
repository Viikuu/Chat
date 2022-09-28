import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {loginRoute} from '../utils/APIRoutes';

export function Login() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		name: '',
	});

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark'
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user !== null) {
			navigate('/');
		}
	}, [navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(handleValidation()){
			const {name} = values;
			const {data} = await axios.post(loginRoute, JSON.stringify({
				name,
			}), {
				headers: {
					"Content-Type": "application/json",
				}
			});
			if(data.status === false) {
				toast.error(data.message,toastOptions);
			}
			if(data.status === true) {
				localStorage.setItem('user', JSON.stringify(name));
				navigate('/');
			}
		}

	};

	const handleValidation = () => {
		const {name} = values;
		if (name.length === "") {
			toast.error('name is required', toastOptions);
			return false;
		}
		else {
			return true;
		}
	};

	const handleChange = (event) => {
		setValues({...values, [event.target.name]: event.target.value});
	};

	return (
		<>
			<div className={"h-screen w-screen flex flex-col justify-center gap-1 items-center bg-gray-800"}>
				<form onSubmit={handleSubmit} className={"flex flex-col content-center gap-8 items-center bg-gray-900 py-12 px-20"}>
					<div className="flex justify-center gap-1 items-center">
						<h1 className={"text-white uppercase"}>Login</h1>
					</div>
					<input
						className={"bg-transparent p-4 border-2 border-purple-600 text-white rounded-2xl border-solid focus:border-2 focus:border-solid focus:border-purple-400 focus:outline-none"}
						type="text"
						placeholder="Name"
						name="name"
						onChange={(event) => handleChange(event)}
					/>
					<button type="submit" className={"bg-purple-600 text-white py-4 px-8 border-none font-bold cursor-pointer text-xl uppercase hover:bg-violet-900"}>Login</button>

				</form>
			</div>
			<ToastContainer/>
		</>
	)
}