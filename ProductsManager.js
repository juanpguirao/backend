const fs = require('fs/promises')
const { existsSync } = require('fs');

class ProductsManager {
    constructor(path){
        this.path = path
    }

    async addProduct(product) {
        try{
            const savedProducts = await this.getProducts()
            const duplicatedProduct = savedProducts.find(item => item.code == product.code)
            if (duplicatedProduct){
                throw new Error(`El producto: ${product.code} ya existe`)
            }
            if (Object.keys(product).length < 6) {
                throw new Error(`Debe rellenar todos los campos`)
            }
            const newId = savedProducts.length > 0 ? savedProducts[savedProducts.length -1 ].id + 1 : 1
            const newProduct = {
                id: newId, 
                ...product
            }
            savedProducts.push(newProduct)
            const productListString = JSON.stringify(savedProducts, null, '\t')
            await fs.writeFile(this.path, productListString)
            console.log(`${product.title} añadido`)
        }
        catch(error){
            console.log(error.message)
        }
    }
    
    async getProducts() {
        try{
            if (existsSync(this.path)){
                const products = await fs.readFile(this.path, 'utf-8')
                if(products.length > 0){
                    const parsedProducts = JSON.parse(products)
                    return parsedProducts
                }
                else return []
            }
            else return []
        }
        catch(error){
            console.log(error.message)
        }
    }

    async getProductById(id) {
        try{
            const savedProducts = await this.getProducts();
            const selectedProduct = savedProducts.find(prod => prod.id === id)
            if(!selectedProduct){
                throw new Error('No se encontro ningun producto')
            }
            return selectedProduct
        }
        catch(error){
            console.log(error.message)
        }
    }

    async updateProduct(id, product) {
        try{
            const savedProducts = await this.getProducts()
            const targetProduct = await this.getProductById(id)
            if(targetProduct){
                const updatedProduct = {...targetProduct, ...product}
                const updatedList = savedProducts.map(prod =>{
                    if(prod.id === id){
                        return updatedProduct
                    }else{
                        return prod
                    }
                })
                const productListString = JSON.stringify(updatedList, null, '\t')
                await fs.writeFile(this.path, productListString)
                console.log('Producto modificado')
            }
        }
        catch(error){
            console.log(error.message)
        }
    }

    async deleteProduct(id) {
        try{
            const savedProducts = await this.getProducts();
            const targetProduct = await this.getProductById(id)
            const filteredList = savedProducts.filter(prod => prod.id !== id)
            if(!targetProduct){
                throw new Error('no se encontro ningun producto')
            }
            else{
                const productListString = JSON.stringify(filteredList, null, '\t')
                await fs.writeFile(this.path, productListString)
                console.log(`${targetProduct.title} eliminado`)
            }
        }
        catch(error){
            console.log(error.message)
        }
    }
}

const myProductManager = new ProductsManager();
console.log(myProductManager.getProducts());
console.log(myProductManager.addProduct( 'Prueba','Este es un producto prueba', 200, 'Sin imagen', 25,1));
console.log(myProductManager.addProduct('Prueba', 'Este es un producto prueba', 200, 'Sin imagen', 25,2));
console.log(myProductManager.addProduct( 'Producto prueba', 200, 'Sin imagen', 25,1));
console.log(myProductManager.getProducts());
console.log(myProductManager.getProductById(1));


