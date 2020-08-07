import React, { useState, useEffect } from 'react'
import './RestAPI.css'
import axios from 'axios'

const RestAPI = () => {
    const [dataBuah, setDataBuah] = useState(null)
    const [inputUser, setInputUser] = useState({ name: '', price: '', weight: '' })
    const [selectedId, setSelectedId] = useState(0)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        if (dataBuah === null) {
            axios.get('http://backendexample.sanbercloud.com/api/fruits')
                .then(res => {
                    setDataBuah(res.data.map(el => { return { id: el.id, name: el.name, price: el.price, weight: el.weight } }))
                })
        }
    }, [dataBuah])

    const handleInput = (event) => {
        const typeOfInput = event.target.name

        switch (typeOfInput) {
            case 'name':
                {
                    setInputUser({ ...inputUser, name: event.target.value });
                    break
                }
            case 'price':
                {
                    setInputUser({ ...inputUser, price: event.target.value });
                    break
                }
            case 'weight':
                {
                    setInputUser({ ...inputUser, weight: event.target.value });
                    break
                }
            default:
                { break; }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (isUpdate) {
            axios.put(`http://backendexample.sanbercloud.com/api/fruits/${selectedId}`, { name: inputUser.name, price: inputUser.price, weight: inputUser.weight })
                .then(() => {
                    let fruit = dataBuah.find(el => el.id === selectedId)
                    fruit.name = inputUser.name
                    fruit.price = inputUser.price
                    fruit.weight = inputUser.weight
                    setDataBuah([...dataBuah])

                })

        } else {
            axios.post('http://backendexample.sanbercloud.com/api/fruits', { name: inputUser.name, price: inputUser.price, weight: inputUser.weight })
                .then(res => {
                    setDataBuah([
                        ...dataBuah,
                        {
                            id: res.data.id,
                            name: res.data.name,
                            price: res.data.price,
                            weight: res.data.weight
                        }
                    ])
                })
                .catch(err => {
                    console.log(err)
                })
        }
        setIsUpdate(false)
        setSelectedId(0)
        setInputUser({ name: '', price: '', weight: '' })
    }


    const handleEdit = (event) => {
        const idDataBuah = parseInt(event.target.value)
        const filterData = dataBuah.find(elm => elm.id === idDataBuah)
        setInputUser({
            name: filterData.name,
            price: filterData.price,
            weight: filterData.weight,
        })
        setSelectedId(idDataBuah)
        setIsUpdate(true)
    }

    const handleDelete = (event) => {
        const idBuah = parseInt(event.target.value)
        const newDataBuah = dataBuah.filter(idx => idx !== idBuah)
        axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
            .then(res => {
                console.log(res)
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
                            dataBuah !== null && dataBuah.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{el.name}</td>
                                        <td>{el.price}</td>
                                        <td>{el.weight}</td>
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