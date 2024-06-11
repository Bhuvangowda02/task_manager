require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Ensure environment variables are correctly loaded
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Authenticate database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Define Task model
const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    dueDate: {
        type: DataTypes.DATE
    }
});

// Sync database
sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Error creating database tables:', err));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    const tasks = await Task.findAll();
    res.render('index', { tasks });
});

app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        res.render('task', { task });
    } else {
        res.status(404).send('Task not found');
    }
});

app.post('/tasks', async (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = await Task.create({ title, description, dueDate });
    res.redirect('/');
});


app.post('/tasks/:id/delete', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.destroy();
        res.redirect('/');
    } else {
        res.status(404).send('Task not found');
    }
});

// Update a task
app.post('/tasks/:id/update', async (req, res) => {
    const { title, description, dueDate } = req.body;
    const taskId = req.params.id;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        await task.save();

        // Redirect to the task details page after updating
        res.redirect(`/tasks/${taskId}`);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Error updating task');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
