import React, { useState, createContext } from 'react';

export const DataContext = createContext()

export const ContextProvider = props => {
    const [dataBuah, setDataBuah] = useState(null)
    const [inputUser, setInputUser] = useState({ name: '', price: '', weight: '' })
    const [selectedId, setSelectedId] = useState(0)
    const [isUpdate, setIsUpdate] = useState(false)

    return (
        <DataContext.Provider value={
            [
                dataBuah, setDataBuah,
                inputUser, setInputUser,
                selectedId, setSelectedId,
                isUpdate, setIsUpdate
            ]
        }>
            {props.children}
        </DataContext.Provider>
    )
}
