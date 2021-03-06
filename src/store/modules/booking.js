import  * as req from '../../api/booking.js';
import  * as types from '../mutation-types.js';

let state = {
    bookings: [],
    currentRow:{},
    error: null,
    logistics:[]
};

let getters = {
    bookings: state => state.bookings,
    logistics: state => state.logistics
};

let actions = {

    createBooking({ commit }, formData) {

        return new Promise((resolve, reject) => {

            req.createBooking(formData)
                .then(res => {
                    resolve(res.booking);
                    commit(types.BOOKING_CREATE, {
                        booking: res.booking
                    })
                }).catch(error => {
                    commit(types.BOOKING_CREATE, {
                        error
                    })
                });

        });

    },

    filterBookingShips({ commit }, argv) {

        return new Promise((resolve, reject) => {

            req.getBookingShips(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.BOOKING_SHIP_LIST, {
                        error
                    });
                });

        });
    },

    filterBookings({ commit }, argv) {

        return new Promise((resolve, reject) => {

            req.getBookings(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.BOOKING_LIST, {
                        error
                    });
                });

        });

    },

    getBooking({ commit }, argv) {

        return new Promise((resolve, reject) => {

            req.getBooking(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.BOOKING_INFO, {
                        error
                    });
                });

        });

    },

    getBookings({ commit }, argv) {
        
        return new Promise((resolve, reject) => {

            req.getBookings(argv)
                .then(res => {
                    resolve(res.bookings);
                    commit(types.BOOKING_LIST, {
                        bookings: res.bookings
                    })
                }).catch(error => {
                    commit(types.BOOKING_LIST, {
                        error
                    })
                });

        });

    },

    updateBookingStatus({ commit }, args) {

        return new Promise((resolve, reject) => {

            req.updateBookingStatus(args)
                .then(res => {
                    resolve(res.booking);
                    commit(types.BOOKING_STATUS_UPDATE, {
                        booking: res.booking
                    })
                }).catch(error => {
                    commit(types.BOOKING_STATUS_UPDATE, {
                        error
                    })
                })

        });

    },

    deliverBooking({ commit }, argv) {

        let that = this;
        return new Promise((resolve, reject) => {
            req.deliverBooking(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.BOOKING_DELIVER, {
                        error
                    });
                });
        });

    },

    shipBooking({ commit }, argv) {

        let that = this;
        return new Promise((resolve, reject) => {

            req.shipBooking(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.BOOKING_SHIP, {
                        error
                    });
                });

        });
    },
    renderShip({ commit }, bookingForm){
        return new Promise((resolve,reject) => {
            req.renderShip(bookingForm)
                .then(res => {
                    resolve(res)
                }).catch(error => {
                    commit(types.RENDER_SHIP, {
                        error
                    });
                })
        })
    },

    getLogistics({ commit }, argv) {
        return new Promise ((resolve,reject)=>{
            req.getLogistics(argv)
                .then(res=>{
                    resolve(res)
                }).catch(error => {
                    commit(types.LOGISTICS_LIST,{
                        error
                    })
                })
        })
    },
    popShipOutRepo({commit},delData) {
        return new Promise((resolve,reject)=>{
            req.popShipOutRepo(delData)
                .then(res=>{
                    resolve(res)
                }).catch(error=>{
                    commit(types.OUTREPO_POP,{
                        error
                    })
                })
        })
    },
    deleteBookingShip({commit},bookingshipId) {
        return new Promise((resolve,reject)=>{
            req.deleteBookingShip({bookingshipId:bookingshipId})
                .then(res => {
                    resolve(res) 
                }).catch(error=>{
                    commit(types.BOOKINGSHIP_DELETE,{
                        error
                    })
                })
        })
    },
    shipBooking({commit},shipBookingForm) {
        return new Promise ((resolve,reject) => {
            req.shipBooking(shipBookingForm)
                .then(res => {
                    resolve(res)
                }).catch( error => {
                    commit(types.SHIPBOOKING,{
                        error
                    })
                })
        })
    },
    logisticRender({commit},renderForm) {
          return new Promise ((resolve,reject) => {
            req.logisticRender(renderForm)
                .then(res => {
                    resolve(res)
                }).catch( error => {
                    commit(types.LOGISTIC_RENDER,{
                        error
                    })
                })
        })
    }
};
    

let mutations = {

    [types.BOOKING_INFO](state, { error }) {
        if (error) {
            state.error = error;
        }
    },

    [types.BOOKING_DELIVER](state, {booking, error}) {
        if (error) {
            state.error = error;
        }
    },

    [types.BOOKING_CREATE](state,{ booking, error }){
        if (error) {
            state.error = error;
            return;
        }
    },

    [types.BOOKING_LIST](state,{ bookings, error }){
        if (error) {
            state.error = error;
            return;
        }
        state.bookings = bookings;
    },

    [types.BOOKING_STATUS_UPDATE](state,{ booking, error }){
        if (error) {
            state.error = error;
            return;
        }
    },

    [types.BOOKING_SHIP](state, { error }) {
        if (error) {
            state.error = error;
            return;
        }
    },

    [types.BOOKING_SHIP_LIST](state, { error }) {
        if (error) {
            state.error = error;
        }
    },
    [types.RENDER_SHIP](state, { error }) {
        if (error) {
            state.error = error
        }
    },
    [types.LOGISTICS_LIST](state,{res,error} ) {
        if (error) {
            state.error = error
           
        } else {
            state.logistics = res
        }
    },
    [types.OUTREPO_POP](state,{error} ) {
        if (error) {
            state.error = error
        }
    },
    [types.BOOKINGSHIP_DELETE](state,{error}){
         if (error) {
            state.error = error
        }
    },
    [types.SHIPBOOKING](state,{error}){
        if (error) {
            state.error = error
        }
    },
    [types.LOGISTIC_RENDER](state,{error}){
        if (error) {
            state.error = error
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};