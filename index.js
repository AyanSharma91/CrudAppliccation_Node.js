const mysql = require('mysql');
const express = require('express');
var app= express();
const bodyparser = require('body-parser');
const PORT = process.env.PORT||8000;
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
      host: 'localhost',
      user:  'root',
      password: 'ayan',
      database : 'tasks_to_do'
});


mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded');
    else
    console.log('DB connection failed \n Error : '+JSON.stringify(err,undefined,2) );
});




app.listen(PORT, ()=>console.log('Server started '));



//Get all the tasks
app.get('/getAllItems',(req,res)=>{

    mysqlConnection.query('Select * FROM tasks',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


//Get a specific task
app.get('/get_task/:id',(req,res)=>{
    mysqlConnection.query('Select * FROM tasks  WHERE task_no = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);

})});

//Delete  a specific task
app.delete('/delete_task/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM tasks WHERE task_no = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send("The task is successfully removed");
        else
        console.log(err);

})});

//INsert a task in database
app.post('/insert_task', function(req, res){
    var username=req.body.task_description;
    mysqlConnection.query("INSERT INTO tasks (task_description) VALUES (?)", username, function(err, result){
        if(err) throw err;
            console.log("1 record inserted");
        });
    res.send("Task inserted");
});

//Update a specific task
app.put('/update_task/:id',(req,res)=>{

    let task_no =req.params.id;
    let task_description = req.body.task_description;
    
    mysqlConnection.query('UPDATE tasks SET task_description = ? WHERE task_no = ?',[task_description,task_no],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);

})});

