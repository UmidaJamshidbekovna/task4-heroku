import {useState} from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {Link} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Check if user exists in the MySQL table
            const response1 = await fetch(`/check-user?email=${email}`, {
                method: 'GET',
            });
            const data1 = await response1.json();
            if (!data1.exists) {
                toastr.error('Incorrect email or password')
                console.log('User does not exist in MySQL table');
                return;
            }

            // User exists, proceed with login
            const response2 = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data2 = await response2.json();
            localStorage.setItem('token', data2.token);
            window.location.href = '/table';
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className={'container wrapper mt-5 bg-white'}
             style={{width: '700px', height: '400px', margin: "auto", borderRadius: '10px'}}>

                    <h1 className={'text-center py-4 mb-3'}>Login</h1>
                    <form className={'mx-5'}  action={'/register'} onSubmit={handleSubmit}>

                        <input
                            className={'form-control mb-3'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            name="email"
                            required
                        />
                        <input
                            className={'form-control mb-3'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            name="password"
                            required                    />
                        <button className={'btn btn-info text-white px-5 py-2 mb-3'} style={{marginLeft: '36%'}} >Login</button>
                    </form>
                   <p className={'text-center text-secondary'}> Go To   <Link to="/">Register Page</Link></p>
        </div>
    )
}
export default Login;
