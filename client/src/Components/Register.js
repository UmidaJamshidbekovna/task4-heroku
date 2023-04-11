import {useState} from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {Link} from "react-router-dom";




function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        console.log(data); // do something with the response data
        toastr.success('Registered Successfully');
        setName('')
        setEmail('')
        setPassword('')
    };

    return(
        <div className={'container wrapper mt-5 bg-white'} style={{width:'700px', height:'400px',margin:"auto", borderRadius: '10px'}}>
            <h1 className={'text-center py-2 mb-3'}>Register</h1>

            <form className={'mx-5'}  action={'/register'} onSubmit={handleSubmit}>
                <input
                    className={'form-control mb-3'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    type="text"
                    name="fullname"
                    required
                />
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
                <button className={'btn btn-info text-white px-5 py-2 mb-3'} style={{marginLeft: '36%'}} >Register</button>
            </form>
            <p className={'text-center text-secondary'}> Have already an account?  <Link to="/login">Login Here</Link></p>

        </div>
    )
}
export default Register;