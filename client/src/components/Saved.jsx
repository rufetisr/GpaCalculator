import React, { useEffect, useState } from 'react';
import './Saved.css'
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import calc from '../utils/calc';


const Saved = () => {

    let token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('Are you sure to delete this item ?');
    const [deleteIndex, setDeleteIndex] = useState(null); // Track the index to delete

    const server_url = import.meta.env.VITE_SERVER_URL;

    const handleClose = () => {
        setShowModal(false);
        setDeleteIndex(null); // Reset delete index
    }

    const handleOpen = (index) => {
        setDeleteIndex(index); // Set the index of the item to delete
        setShowModal(true);
    }

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const res = await fetch(`${server_url}/get-datatable`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })

            const data = await res.json();

            setData(data?.data);
        } catch (error) {

        }

    }

    const handleDelete = async () => {
        if (deleteIndex === null) return; // No index selected


        try {
            const res = await fetch(`${server_url}/delete/${deleteIndex}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })

            const resData = await res.json();

            const updatedData = data.filter((item, i) => {
                return i != deleteIndex
            })
            setData(updatedData)
            handleClose();

        } catch (error) {

        }
    };
    return (

        <div className='saved'>
            <h4>Saved Information</h4>
            {token ?

                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Subject</th>
                            <th>Point</th>
                            <th>Credit</th>
                            <th>GPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            JSON.stringify(data)
                        } */}
                        {
                            data?.length != 0 ? data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {item.subject.map((subj, i) => (
                                            <div key={i}>{subj}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {item.point.map((point, i) => (
                                            <div key={i}>{point}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {item.credit.map((credit, i) => (
                                            <div key={i}>{credit}</div>
                                        ))}
                                    </td>
                                    <td>{calc(item.point, item.credit)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleOpen(index)}
                                            style={{ color: 'white', backgroundColor: 'red', border: 'none', cursor: 'pointer', padding: '2px 7px', fontSize: 'medium', display: 'flex', alignItems: 'center', borderRadius: '10px' }}
                                        >
                                            Delete
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            )) :
                                <>
                                    <br></br>
                                    <p style={{ color: 'red' }}>No information</p>
                                </>
                        }
                    </tbody>
                </table>

                : <p style={{ color: "red" }}>
                    <Link to={'/login'}>You need to login to save information</Link>
                </p>
            }
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Saved;
