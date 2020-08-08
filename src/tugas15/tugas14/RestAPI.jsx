import React, { useEffect, useContext } from 'react'
import './RestAPI.css'
import axios from 'axios'
import { Action } from '../Action'
import { Form } from '../Form'
import { DataContext } from '../ContextProvider'

const RestAPI = () => {
    const [dataBuah, setDataBuah] = useContext(DataContext)

    useEffect(() => {
        if (dataBuah === null) {
            axios.get('http://backendexample.sanbercloud.com/api/fruits')
                .then(res => {
                    setDataBuah(res.data.map(el => { return { id: el.id, name: el.name, price: el.price, weight: el.weight } }))
                })
        }
    })

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
                                            <Action id={el.id}></Action>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Form />
        </>
    )
}

export default RestAPI