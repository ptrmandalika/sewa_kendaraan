// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sewa_kendaraan"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// end-point akses data penyewa ---------------------------------------------------------------------------
app.get("/sewa", (req, res) => {
    // create sql query
    let sql = "select * from penyewa"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                penyewa: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data penyewa berdasarkan id_penyewa tertentu
app.get("/sewa/:id", (req, res) => {
    let data = {
        id_penyewa: req.params.id
    }
    // create sql query
    let sql = "select * from penyewa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                penyewa: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data penyewa
app.post("/sewa", (req, res) => {

    // prepare data
    let data = {
        id_penyewa: req.body.id_penyewa,
        nama: req.body.nama,
        alamat: req.body.alamat,
        nik: req.body.nik
    }

    // create sql query insert
    let sql = "insert into penyewa set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data penyewa
app.put("/sewa", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            id_penyewa: req.body.id_penyewa,
            nama: req.body.nama,
            alamat: req.body.alamat,
            nik: req.body.nik
        },

        // parameter (primary key)
        {
            id_penyewa: req.body.id_penyewa
        }
    ]

    // create sql query update
    let sql = "update sewa set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data penyewa berdasarkan id_penyewa
app.delete("/sewa/:id", (req, res) => {
    // prepare data
    let data = {
        id_penyewa: req.body.id
    }

    // create query sql delete
    let sql = "delete from penyewa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})




// end-point akses data admin ---------------------------------------------------------------------------
app.get("/admin", (req, res) => {
    // create sql query
    let sql = "select * from admin"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data admin berdasarkan id_admin tertentu
app.get("/admin/:id", (req, res) => {
    let data = {
        id_admin: req.params.id
    }
    // create sql query
    let sql = "select * from admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                penyewa: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data admin
app.post("/admin", (req, res) => {

    // prepare data
    let data = {
        id_admin: req.body.id_admin,
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin,
        keterangan: req.body.keterangan
    }

    // create sql query insert
    let sql = "insert into admin set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data admin
app.put("/admin", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            id_admin: req.body.id_admin,
            nama_admin: req.body.nama_admin,
            status_admin: req.body.status_admin,
            keterangan: req.body.keterangan
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]

    // create sql query update
    let sql = "update admin set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data penyewa berdasarkan id_penyewa
app.delete("/admin/:id", (req, res) => {
    // prepare data
    let data = {
        id_admin: req.body.id
    }

    // create query sql delete
    let sql = "delete from admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})





// end-point akses kendaraan  ---------------------------------------------------------------------------
app.get("/kendaraan", (req, res) => {
    // create sql query
    let sql = "select * from kendaraan"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                penyewa: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data admin berdasarkan id_admin tertentu
app.get("/kendaraan/:id", (req, res) => {
    let data = {
        id_kendaraan: req.params.id
    }
    // create sql query
    let sql = "select * from kendaraan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                penyewa: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data admin
app.post("/kendaraan", (req, res) => {

    // prepare data
    let data = {
        id_kendaraan: req.body.id_kendaraan,
        nopol: req.body.nopol,
        warna: req.body.warna,
        kondisi_kendaraan: req.body.kondisi_kendaraan
    }

    // create sql query insert
    let sql = "insert into kendaraan set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data kendaraan
app.put("/kendaraan", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            id_kendaraan: req.body.id_kendaraan,
            nopol: req.body.nopol,
            warna: req.body.warna,
            kondisi_kendaraan: req.body.kondisi_kendaraan
        },

        // parameter (primary key)
        {
            id_kendaraan: req.body.id_kendaraan
        }
    ]

    // create sql query update
    let sql = "update kendaraan set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data kendaraan berdasarkan id_kendaraan
app.delete("/kendaraan/:id", (req, res) => {
    // prepare data
    let data = {
        id_kendaraan: req.body.id
    }

    // create query sql delete
    let sql = "delete from kendaraan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})



app.listen(8000, () => {
    console.log("Run on port 8000")
})                                                                                                                                        