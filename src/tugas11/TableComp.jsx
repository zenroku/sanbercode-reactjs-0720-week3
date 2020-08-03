import React from 'react';
import './TableComp.css';

let dataHargaBuah = [
    { nama: "Semangka", harga: 10000, berat: 1000 },
    { nama: "Anggur", harga: 40000, berat: 500 },
    { nama: "Strawberry", harga: 30000, berat: 400 },
    { nama: "Jeruk", harga: 30000, berat: 1000 },
    { nama: "Mangga", harga: 30000, berat: 500 }
]

class TableComp extends React.Component {
    render() {
        return (
            <>
                <h1>Table Harga Buah</h1>
                <table>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Berat</th>
                    </tr>{
                        dataHargaBuah.map(x => {
                            return <tr>
                                <td>{x.nama}</td>
                                <td>{x.harga}</td>
                                <td>{x.berat / 1000} kg</td>
                            </tr>
                        })

                    }
                </table>
            </>
        )
    }
}

export default TableComp