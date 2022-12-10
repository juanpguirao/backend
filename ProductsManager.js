class ProductManager{
    static codeGenerator = 0;
    constructor () {
        this.products = [];
    }
    addProduct (title, description, price, thumbnail, stock, code){
        ProductManager.codeGenerator++;
        const newProduct={
            id:ProductManager.codeGenerator,
            title,
            description,
            price,
            thumbnail,
            stock,
            code
        }

        if(this.products.find (e => e.code === newProduct.code)){
            console.log("Producto existente")
            return;
        }

        if (newProduct.title === (undefined)
            ||newProduct.description === (undefined)
            ||newProduct.price === (undefined)
            ||newProduct.thumbnail === (undefined)
            ||newProduct.stock === (undefined)
            ||newProduct.code === (undefined)           ){
            console.log( "Debe rellenar todos los campos")
            return;}

            this.products.push(newProduct);
            return newProduct;
    }
    getProducts (){
        return this.products;
    }
    getProductsById(idSearch){
        const search = this.products.findIndex(e => e.id === idSearch);
        if(search < 0){
            console.error('Not found');
            return;
        }
        const searchProduct = this.products[search];
        return searchProduct; 
    }
    };
const myProductManager = new ProductManager();
console.log(myProductManager.getProducts());
console.log(myProductManager.addProduct( 'Prueba','Este es un producto prueba', 200, 'Sin imagen', 25,1));
console.log(myProductManager.addProduct('Prueba', 'Este es un producto prueba', 200, 'Sin imagen', 25,2));
console.log(myProductManager.addProduct( 'Producto prueba', 200, 'Sin imagen', 25,1));
console.log(myProductManager.getProducts());
console.log(myProductManager.getProductsById(1));
console.log(myProductManager.getProductsById(1));