class ProductManager{
    static codeGenerator = 0;
    constructor () {
        this.products = [];
    }
    addProduct (title, description, price, thumbnail, stock){
        ProductManager.codeGenerator++;
        const newProduct={
            title,
            description,
            price,
            thumbnail,
            stock,
            code:ProductManager.codeGenerator,
        }
        
        const productEnable = Object.values(newProduct);
        const validarValores = productEnable.filter( e=> e !== undefined);
        const code = this.products.find(c => c.code === productEnable.code);
        if(validarValores.length < 6){
          console.error('Faltan Campos que completar');
          return;
        }
        if(code){
            console.error('Producto Existente');
            return;
    }
        return this.products.push(newProduct);
        
    }
    getProducts (){
        return this.products;
    }
    getProductsById(idP){
        const search = this.products.findIndex(e => e.code === idP);
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
console.log(myProductManager.addProduct( 'Prueba','Este es un producto prueba', 200, 'Sin imagen', 25));
console.log(myProductManager.addProduct('Prueba', 'Este es un producto prueba', 200, 'Sin imagen', 25));
console.log(myProductManager.addProduct( 'Producto prueba', 200, 'Sin imagen', 25));
console.log(myProductManager.getProducts());
console.log(myProductManager.getProductsById(1));