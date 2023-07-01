const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();
const port = 3001;
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const Student = require('./models').Student;


app.get('/students', async (req, res) => {
    try {
    const students = await Student.findAll();
    res.json(students);
    } catch (e) {
    console.error(e);

    res.status(500).json({message: e.message});
    }

});

app.post('/create', async (req, res) => {
    try {
    const name = req.body.name;
    const email = req.body.email;
    const gpa = req.body.gpa;
    const student = await Student.create({name, email, gpa});
    res.json(student);
    } catch (e) {
    console.error(e);
        
    res.status(500).json({message: e.message});
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    await student.destroy();
    res.json(student);
    } catch (e) {
    console.error(e);

    res.status(500).json({message: e.message});
    }
});


app.put('/update', async (req, res) => {
    try {
    const id = req.body.id;
    const student = await Student.findByPk(id);
    const name = req.body.name;
    const email = req.body.email;
    const gpa = req.body.gpa;
    await student.update({name, email, gpa});
    res.json(student);
    } catch (e) {
    console.error(e);
        
    res.status(500).json({message: e.message});
    }
});




Student.sequelize.sync({force: true}).then(() => {
    console.log("Synced Leo");
app.listen(port, () => console.log(`Listening on port: ${port}`));  

});

