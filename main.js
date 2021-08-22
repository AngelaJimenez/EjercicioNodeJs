  
const dataClientes = require("./clientes.json");
const dataProveedores = require("./proveedores.json");
const axios = require("axios");
const fs = require("fs");
const http = require("http");
const path = require("path");
module.exports ={
    buildPathHtmlProveedores: path.resolve("./proveedores.html"),
    buildPathHtmlClientes: path.resolve("./clientes.html"),
  };

http.createServer((req,res)=>{
    if(req.url ==="/api/proveedores")
    {
        fs.readFile("proveedores.json",(err,data) =>{
            if(err){
                console.log(err);
            }
            let json = JSON.parse(data);
            var rta = "";
            for (var i = 0; i < json.length; i++) {
                var obj= json[i]
                rta+=createEachProveedores(obj);
              }
              const html = createHtmlProveedores(rta)
              res.write(html);
        });
    }
    if(req.url==="/api/clientes")
    {
        fs.readFile("clientes.json",(err,data) =>{
            if(err){
                console.log(err);
            }
            let json = JSON.parse(data);
            var rta = "";
            for (var i = 0; i < json.length; i++) {
                var obj= json[i]
                rta+=createEachCliente(obj);
              }
              const html = createHtmlCliente(rta)
              res.write(html);
        });
    }
}).listen(8081);

const createHtmlCliente = (finaltable) => `
  <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>
    <h1 style="text-align:center">Lista Clientes</h1>
    <table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
        </tr>
    </thead>
    ${finaltable}
    </table>
    </body>
  </html>
`;

const createEachCliente = (clientt) => `
    <tbody>
        <tr>
            <td> <b>${clientt.idCliente}</b></td>
            <td>${clientt.NombreCompania}</td>
            <td>${clientt.NombreContacto}</td>
        </tr>
    </tbody>
`;




const createHtmlProveedores = (finaltable) => `
  <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>
    <h1 style="text-align:center">Lista Proveedores</h1>
    <table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
        </tr>
    </thead>
    ${finaltable}
    </table>
    </body>
  </html>
`;

const createEachProveedores = (clientt) => `
    <tbody>
        <tr>
            <td><b>${clientt.idproveedor}</b></td>
            <td>${clientt.nombrecompania}</td>
            <td>${clientt.nombrecontacto}</td>
        </tr>
    </tbody>
`;
