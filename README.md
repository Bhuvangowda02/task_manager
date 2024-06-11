# Task Manager Application

## Overview

This repository contains a Task Manager application built using the following technologies:
- *Node.js* and *npm* for server-side logic and package management.
- *MySQL* for storing tasks.
- *Elastic.js* for running the pages in the backend.
- *HTML, **CSS, and **JavaScript* for the frontend.

The application provides a simple interface to manage tasks with full CRUD (Create, Retrieve, Update, Delete) functionalities.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [MySQL](https://www.mysql.com/)

## Installation

1. Clone the repository to your local machine:
    sh
    git clone https://github.com/your-username/task_manager.git
    
2. Navigate to the project directory:
    sh
    cd task_manager
    
3. Install the required npm packages:
    sh
    npm install
    

## Setup MySQL Database

1. Change the DB_USER, DB_PASSWORD values inside the file ".env" to your respective mysql setup

## Running the Application

1. To start the application, run the following command in the project directory:
    sh
    npm run dev
    
   This command will run the script using nodemon which automatically restarts the server on file changes.

2. After the server starts, open your browser and navigate to:
    
    http://localhost:3000
    

## Features

The Task Manager application provides the following features:
- *Create*: Add new tasks.
- *Retrieve*: View all tasks.
- *Update*: Edit existing tasks.
- *Delete*: Remove tasks.


Thank you for using the Task Manager application!
