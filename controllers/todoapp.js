const data = require('../config/connectDatabaseMySQL')

exports.getAllTask = (req, res, next) => {
    data.query('SELECT * FROM task', (err, rows, fields) => {
        if ( err ) {
            res.status(503).json({ message: "Server error", err })
        } else {
            res.status(200).json({ data: rows })
        }
    })
}

exports.addTask = (req, res, next) => {
    data.query('INSERT INTO task (taskName, status) value (?, ?)', [req.body.taskName, req.body.status], (err, rows, fields) => {
        if ( err ) {
            res.status(503).json({ message: "Server error" })
        } else {
            res.status(201).json({ message: "Created" })
        }
    })
}

exports.deleteTask = (req, res, next) => {
    data.query('DELETE FROM task WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if ( err ) {
            res.status(503).json({ message: "Server error" })
        } else {
            res.status(200).json({ message: "Deleted" })
        }
    })
}

exports.updateTask = (req, res, next) => {
    data.query('UPDATE task SET tasksName = ? Where id = ?', [req.body.taskName, req.params.id], (err, rows, fields) => {
        if ( err ) {
            res.status(503).json({ message: "Server error" })
        } else {
            res.status(200).json({ message: "Updated(tasl name)" })
        }
    })
}

exports.updateStatus = (req, res, next) => {
    data.query('UPDATE task SET status = > WHERE id = ?', [req.body.status, req.params.id], (err, rows, fields) => {
        if ( err ) {
            res.status(503).json({ message: "Server error" })
        } else {
            res.status(200).json({ message: "Update status"})
        }
    })
}