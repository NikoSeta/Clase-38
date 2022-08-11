const prodModel = require('../models/productosMongo');
const ContenedorMongoDB = require ('../contenedores/contenedorMongoDB');
const contenedor = new ContenedorMongoDB(prodModel);
const ProductosMock = require('../API/productos');
const newProd = new ProductosMock();


function productosPrincipal(req, res) {
    let newProducts = newProd.popular();
    res.render('product/prodMock',{ 
        newProducts:newProducts
    });
};

async function verProductos(req, res) {
    let products = await contenedor.getAll();
    res.render('product/productos',{
        products: products
    });  
};

function agregarProd (req, res){
    try {
        const newProducto = req.body
        contenedor.update(newProducto)
        res.redirect("/")
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }    
}

module.exports = {
    verProductos,
    productosPrincipal,
    agregarProd
};