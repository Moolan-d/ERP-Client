import { client } from "./index"


export default {

    //获取所有类目
    getCat() {
     let query= `{
                categories{   
                        id,
                        name,
                }
            }`
            return client.query(query)
        },

    //创建类目
    createCat(categoryForm) {
       let query=`{
                category:createCatetory(name:"${categoryForm.cats}"){
                    id,
                    name
                    }
                }`
            return client.mutate(query)
        },

    //创建子类目
    createSubCat(subCategoryForm) {
       let query=`{
                subcategory:createCatetory(
                name:"${subCategoryForm.name}",
                parentId:${subCategoryForm.id}
                ){
                    id,
                    name
                    }
                }`
            return client.mutate(query)
        },

    //获取二级目录
    getSubCategories(parentId){
        let query = `{
            subCategories:categories(parentId:${parentId.parentId}){
                id,
                name
            }
        }`
        return client.query(query)
    },

    updateCatetory(updateForm) {
        let query=`{
                updateCatetory:updateCatetory(name:"${updateForm.name}",
                id:${updateForm.id}){
                    name,
                    id,
                    createdAt
                }
            }`
            return client.mutate(query)
        }



};