import { client } from "./index"

export default {

    //获取所有品牌
    getBrands() {
        
           
        let query=  `{
             brands:brands(page:${0},limit:${100}){
                    rows{
                        id,
                        name,
                       additional
                    },
                }
            }`
        return client.query(query);  
    },
    getBrand(id){
        let query = `{
            brand(id:${id}){
                id,
                name,
                additional
            }
        }`
        return client.query(query)
    },

    updateBrand() {

    },
    //创建品牌
    createBrand(brandForm) {
       
        let query=`{
            brand:createBrand(name:"${brandForm.brand}",
            additional:"${brandForm.additional}"){
                id,
                name,
                additional
            }
        }`
        return client.mutate(query)   
    },
    update(updateForm) {

        let query=   `{
            updateBrand:updateBrand(name:"${updateForm.brand}",
            id:${updateForm.id},
            additional:"${updateForm.additional}"
            ){
                name,
                id,
                createdAt,
                additional
            }
        }`
      
        return client.mutate(query) 
    },
    upload(){
        let query = `{
            upload{
                fieldname,
                object
            }
        }`
      return client.mutate(query) 

    },
    urlAuthorization(uriObject){
         let query = `{
           urlAuthorization(object:"${uriObject.object}"){
                uri
            }
        }`
      return client.mutate(query) 
    }

};