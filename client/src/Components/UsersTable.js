import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from "react";

function UsersTable() {

    const [data, setData] = useState([]);
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch('/status')
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        fetch('http://localhost:3000/table/')
            .then(response => response.json())
            .then(data => {setData(data);})
            .catch(error => {console.log(error);});
    }, []);
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/table/${id}`, { method: "DELETE" })
            .then(() => {
                setData(data.filter((item) => item.id !== id));
            })
            .catch((error) => console.log(error));
    };

    async function handleStatusChange(id, status) {
        try {
            const response = await fetch(`/status/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: !status })
            });
            const data = await response.json();
            // Update the status of the item in the React state
            // or re-fetch the data from the server to update the UI
        } catch (error) {
            console.error(error);
        }
    }



    return (
       <Table striped bordered hover className={'bg-white my-5'}>
            <thead>
            <tr>
                <th><input type="checkbox"   /></th>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Last-Login</th>
                <th>Reg-Login</th>
                <th>Status</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <tr key={item.id}>
                    <td><input type="checkbox" /></td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.last_login}</td>
                    <td>{item.registration_time}</td>
                    <td>{item.status ==0 ? <button className={'btn btn-danger'} onClick={() => handleStatusChange(item.id,0)}>Block</button> : <button className={'btn btn-success'} onClick={() => handleStatusChange(item.id, 1)}>Unblock</button> }</td>
                    <td><button className={'btn btn-danger'} onClick={() => handleDelete(item.id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
export default UsersTable;