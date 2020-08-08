import React from 'react'
import { ContextProvider } from './ContextProvider'
import RestAPI from './tugas14/RestAPI'

const ContextConsumer = () => {
    return (
        <>
            <ContextProvider>
                <RestAPI />
            </ContextProvider>
        </>
    )
}

export default ContextConsumer