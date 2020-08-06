import React, { useState, useEffect, useReducer } from 'react';
import './RestAPI.css';
import axios from 'axios';

const RestAPI = () => {
    const [dataBuah, setDataBuah] = useState([])
    const [inputUser, setInputUser] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: '',
            price: '',
            weight: 0,
        }
    );

    useEffect(() => {
        axios.get('http://backendexample.sanbercloud.com/api/fruits')
            .then(res => {
                setDataBuah(res.data.map(e => {
                    return {
                        id: e.id,
                        nama: e.name,
                        harga: e.price,
                        berat: e.weight
                    }
                }))
            })
            .catch(err => (console.log(err)))
    })

    const handleInput = (event) => {
        const name = event.target.name
        const newValue = event.target.value
        setInputUser({ [name]: newValue })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const names = event.target.name
        const getData = inputUser
        let nama = getData.name
        let harga = getData.price
        let parseBerat = parseInt(getData.weight)
        let newInput = {
            name: nama,
            price: harga,
            weight: parseBerat
        }
        axios.post('http://backendexample.sanbercloud.com/api/fruits', { newInput })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        setInputUser({ [names]: '' })
    }

    const handleEdit = (data) => {
        const id = parseInt(data.target.value)
        const filterData = dataBuah.filter(elm => elm.id = id)
        console.log(filterData)
        setInputUser({
            name: filterData.nama,
            price: filterData.harga,
            weight: filterData.berat,
        })
    }

    const handleDelete = (event) => {
        const idBuah = parseInt(event.target.value)
        const newDataBuah = dataBuah.filter(idx => idBuah !== idx)
        axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        setDataBuah([...newDataBuah])
    }



    return (
        <>
            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                <table className="tableData">
                    <thead>
                        <tr>
                            <th>Nama Buah</th>
                            <th>Harga Buah</th>
                            <th>Berat Buah</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataBuah.map(el => {
                                return (

                                    <tr key={el.id}>
                                        <td>{el.nama}</td>
                                        <td>{el.harga}</td>
                                        <td>{el.berat}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button onClick={handleDelete} value={el.id}>Hapus</button>
                                            <button onClick={handleEdit} value={el.id}>Edit</button>
                                        </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="formInput">
                <h1>Form Input Data</h1>
                <form onSubmit={handleSubmit}>
                    <label>Nama Buah</label>
                    <input type="text" name="name" onChange={handleInput} value={inputUser.name}></input>
                    <br />
                    <label>Harga Buah</label>
                    <input type="text" name="price" onChange={handleInput} value={inputUser.price}></input>
                    <br />
                    <label>Berat Buah</label>
                    <input type="number" name="weight" onChange={handleInput} value={inputUser.weight}></input>
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}

export default RestAPI