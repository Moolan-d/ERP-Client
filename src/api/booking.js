import { client } from "./index"

function createBooking(formData) {
        
    let query = `
    {
        booking:createBooking(
            receiptFee: ${formData.receiptFee}, 
            source: "${formData.source}", 
            receiverName: "${formData.receiverName}",
            receiverPhone: "${formData.receiverPhone}",
            receiverAddress: "${formData.receiverAddress}",
            memo: "${formData.memo}",
            orders: "${formData.orders}"
        ) {
            id,
            source
        }
    }
    `
    return client.mutate(query);

}

function getBooking({id, fields="id"}) {
    let query = `
    {
        booking:booking(id: ${id}) {
            ${fields}
        }
    }
    `
    return client.query(query);
}

function getBookings({ page = 1, limit = 15, order="createdAt DESC", filters={}, fields="id"}) {

    let query = `
    {
        bookings:bookings(
            page: ${page}, 
            limit: ${limit}, 
            order: "${order}", 
            filters: "${JSON.stringify(filters).replace(/"/g, '\\"')}"
        ) {
            rows {
                ${fields}
            },
            page,
            pages,
            limit
        }
    }
    `
    return client.query(query);
}

function updateBookingStatus({ status, id }) {

    let query = `
    {
        booking: updateBookingStatus(status: "${status}", id: ${id}) {
            id
        }
    }
    `
    return client.mutate(query);

}

function deliverBooking(data) {
    
    let query = `
    {
        booking: deliverBooking(
            booking: ${data.booking},
            outRepos: "${JSON.stringify(data.outRepos).replace(/"/g, '\\"')}"
        ) {
            id
        }
    }
    `
    return client.mutate(query);

}

// function shipBooking({data={}, fields="id" }) {
    
//     let query = `
//     {
//         booking: shipBooking(
//             name: "${data.name}",
//             number: "${data.number}",
//             outRepos: "${data.outRepos}",
//             booking: ${data.booking}
//         ) {
//             ${fields}
//         }
//     }
//     `
//     return client.mutate(query);
// }

function getBookingShips({fields="id", order="createdAt DESC", filters={}}) {
    let query = `
    {
        ships: ships(
            filters="${JSON.stringify(filters).replace(/"/g, '\\"')}", 
            order="${order}") {
                ${fields}
        }
    }
    `
    return client.query(query);
}

function renderShip(bookingForm){
    let query=`
    {
        ships:renderShip(
            name: "${bookingForm.name}",
            number: "${bookingForm.number}",
            type: "${bookingForm.type}",
            booking: ${bookingForm.booking},
            outRepos: "${bookingForm.outRepos}",
            template: "${bookingForm.template}"
        ){
            id,
            ships{
                name,
                number,
                id,
                outRepos{
                    id,
                   order{
                    sku{
                        properties,
                        product{
                            name
                        }
                    },
                    quantity,
                   }
                }
            },

        }
    }`
    return client.mutate(query)
}

function getLogistics({page=1, limit=15, order="createdAt DESC", filters={}, fields="id"}){
    let query = `
    {
    logistics:logistics (
        page: ${page}, 
        limit: ${limit}, 
        order: "${order}", 
        filters: "${JSON.stringify(filters).replace(/"/g, '\\"')}"
    ) {
        rows {
                id,
                name,
                alias,
                customerName,
                customerPwd
            },
          
    }
    }`
    return client.query(query)
}

function popShipOutRepo({delData}){
     console.log(delData)
    let query = `
    {
       OutRepo:popShipOutRepo(
            outRepo:${delData.outRepo},
            bookingShip:${delData.bookingship}

       ){
        id,
        outRepos{
            id
        }
       }
    }
    `
    return client.mutate(query)
}

function deleteBookingShip({bookingshipId}){
    let query = `
    {
        BookingShip:deleteBookingShip(
            id:${bookingshipId.bookingshipId}
            ){
                id
        }
    }`
    return client.mutate(query)
}
function shipBooking({shipBookingForm}) {
    let query = `
    {
        Booking:shipBooking(
            bookingShip:${shipBookingForm.bookingship},
            booking:${shipBookingForm.booking}
        ){
            id
        }
    }
    `
    return client.mutate(query)
}

function logisticRender({renderForm}){
    let query =    `
    {
        logisticRenderType:logisticRender(
            bookingId:${renderForm.bookingId},
            alias:"${renderForm.alias}",
            customerName:"${renderForm.customerName}",
            customerPwd:"${renderForm.customerPwd}"
        ) {
            number,
            template
        }
    }
    `
    return client.mutate(query)
}
export {
    getBooking,
    createBooking,
    getBookings,
    updateBookingStatus,
    deliverBooking,
    shipBooking,
    getBookingShips,
    renderShip,
    getLogistics,
    popShipOutRepo,
    deleteBookingShip,
    logisticRender

}