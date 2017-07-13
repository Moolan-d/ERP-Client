import { client } from "./index"


export default {
    createSku(skuforms){
    let query= `{
                 sku: createSku(properties:"${skuforms.properStr}",
                
                    product:${skuforms.product},
                    
                    unit:"${skuforms.unit}",
                    additional:"${skuforms.additional}"
                    )  {
                        id,
                        properties,
                        goodsNo,
                        intoRepos { 
                          createdAt
                        }
                    }
                }`
    return client.mutate(query)
},


    update(updateForm) {
        let query=`{
                updateSku:updateSku(properties:"${updateForm.properStr}",
                    id:${updateForm.id},
                    additional:"${updateForm.additional}"
                    unit:"${updateForm.unit}"
                    ) {
                        properties,
                        id,
                        unit,
                        goodsNo      
                }
            }`
    return client.mutate(query)
    }

};
