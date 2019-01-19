var express = require('express');
var Crud = require('./database/Crud');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/api/home', function(req, res){
    getData = async () => {
        const results = await Crud.Select_products();
        res.send(results);
    }
    getData();
});

app.post('/api/add', function(req, res){
    res.send(req.body);
    let data = {produto: req.body.produto, preco: req.body.preco};
    getData = async () => {
        const result = await Crud.Insert_products(data);
        res.send({message: "Sucesso ao inserir"});
    }
    getData();
});

app.get('/api/del/:id', function(req, res){
    getData = async () => {
        const result = await Crud.Delete_products(req.params.id);
        res.send(result);
    }
    getData();
});

app.listen(5000, () => console.log('Escutando na porta 5000'));