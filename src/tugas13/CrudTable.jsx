import React from 'react';
import './CrudTable.css';


class TableComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHargaBuah: [
                { nama: "Semangka", harga: 10000, berat: 1000 },
                { nama: "Anggur", harga: 40000, berat: 500 },
                { nama: "Strawberry", harga: 30000, berat: 400 },
                { nama: "Jeruk", harga: 30000, berat: 1000 },
                { nama: "Mangga", harga: 30000, berat: 500 }
            ],
            input: {
                nama: '',
                harga: '',
                berat: ''
            },
            indexOfForm: -1
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        const input = { ...this.state.input }
        input[event.target.name] = event.target.value
        this.setState({
            input
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let input = this.state.input
        if (input['nama'].replace(/\s/g, '') !== '' && String(input['harga']).replace(/\s/g, '') !== '' && String(input['berat']).replace(/\s/g, '') !== '') {
            // konversi dari string ke integer
            let parseHarga = parseInt(input.harga)
            let parseBerat = parseInt(input.berat)
            let newInput = {
                nama: input.nama,
                harga: parseHarga,
                berat: parseBerat
            }
            // ambil index & data buah
            let index = this.state.indexOfForm
            let newBuah = this.state.dataHargaBuah
            // cek tombol fungsi tambah data / edit data
            if (index === -1) {
                newBuah = [...newBuah, newInput]
            } else {
                newBuah[index] = newInput
            }
            this.setState({
                dataHargaBuah: newBuah,
                input: {
                    nama: '',
                    harga: '',
                    berat: ''
                },
                indexOfForm: -1
            })
        }
    }

    handleEdit(event) {
        let index = event.target.value
        let data = this.state.dataHargaBuah[index]
        this.setState({
            input: {
                nama: data.nama,
                harga: data.harga,
                berat: data.berat
            },
            indexOfForm: index
        })
    }

    handleDelete(event) {
        let index = event.target.value
        let newData = this.state.dataHargaBuah
        newData.splice(index, 1)
        this.setState({
            dataHargaBuah: newData
        })
    }


    render() {
        return (
            <>
                <h1>Table Harga Buah</h1>
                <table className="dataBuah">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Berat</th>
                            <th style={{ width: '15%' }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.dataHargaBuah.map((x, index) => {
                            return (
                                <tr key={index}>
                                    <td>{x.nama}</td>
                                    <td>{x.harga}</td>
                                    <td>{x.berat / 1000} kg</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button onClick={this.handleEdit} value={index}>Edit</button>
                                        <button onClick={this.handleDelete} value={index}>Hapus</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit}>
                    <h1>Tambah Data / Ubah Data</h1>
                    <table className="form">
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <label>Nama Buah</label>
                                </td>
                                <td>
                                    <input type="input" name="nama" onChange={this.handleChange} value={this.state.input.nama}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Harga</label>
                                </td>
                                <td>
                                    <input type="number" name="harga" onChange={this.handleChange} value={this.state.input.harga} placeholder="Harga Rupiah"></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Berat</label>
                                </td>
                                <td>
                                    <input type="number" name="berat" onChange={this.handleChange} value={this.state.input.berat} placeholder="dalam gram"></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button><strong>Submit</strong></button>
                </form>
            </>
        )
    }
}

export default TableComp