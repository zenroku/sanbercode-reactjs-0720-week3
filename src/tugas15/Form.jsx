import React, { useContext } from 'react'
import axios from 'axios'
import { DataContext } from './ContextProvider'


export const Form = () => {
    const [dataBuah, setDataBuah, inputUser, setInputUser, selectedId, setSelectedId, isUpdate, setIsUpdate] = useContext(DataContext)


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

    return (
        <div className="formInput">
            <h1 style={{ textAlign: 'center' }}>Form Input Data</h1>
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
    )
}