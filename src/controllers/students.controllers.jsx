const pool = require('../db');

const getAllStudents = async (req, res, next) => {
    try {
        const allStudents = await pool.query(
            "select * from users where role=2"
        );
        res.json(allStudents.rows);
    } catch (error) {
        next(error);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const {id} = req.params;
        result = await pool.query("select * from users where id = ($1)",[id]);
        
        if(result.rowCount === 0) return res.status(404).json({
            message : 'Student not found'
        })

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createStudent = async (req, res, next) => {
    const {first_name,last_name,username,password,role,email}  = req.body
    let date = new Date().toJSON();

    try {
        const result = await pool.query("INSERT INTO users (first_name,last_name,username,password,role,email,created_on) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",[first_name,last_name,username,password,role,email,date]);

        res.json(result.rows[0]);
    } catch (error) {
        
        next(error);
    }    
};

const deleteStudent = async (req, res, next) => {
    try {
        const {id} = req.params;
        result = await pool.query("delete from users where id = $1 returning *",[id]);
        
        if(result.rows.length === 0) return res.status(404).json({
            message : 'Student not found'
        })

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { first_name,last_name,username,password,role,email } = req.body;

        const result = await pool.query("UPDATE users SET first_name = $1,last_name = $2,username = $3,password = $4,role = $5,email = $6 WHERE  id = $7 returning *",[first_name,last_name,username,password,role,email,id])
        
        if (result.rows.length === 0) return res.status(404).json({
            message: "Student not found",
        });

        res.json(result.rows[0]);
        } catch (error) {
            next(error);
    }
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}