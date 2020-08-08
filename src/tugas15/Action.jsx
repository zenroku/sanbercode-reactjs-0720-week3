import React, { useContext } from "react"
import { DataContext } from './ContextProvider'
import axios from 'axios'

export const Action = (id) => {
    const [dataBuah, setDataBuah, , setInputUser, , setSelectedId, , setIsUpdate] = useContext(DataContext)


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
            <button onClick={handleDelete} value={id}>Hapus</button>
            <button onClick={handleEdit} value={id}>Edit</button>
        </>
    )
}