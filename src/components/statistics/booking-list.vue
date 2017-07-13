<template>
    <div class="content-wrap">


         <div title="选择仓储" style="margin: 10px;" v-model="showIntoRepoDialog">
            <h3>#库存信息</h3>
            <el-cascader
                :options="repos"
                @change="repoChange"
                :props="{children: 'children'}"
                placeholder="请选择仓库">
            </el-cascader>
            <el-table
                :data="dealIntoRepos"
                border
                style="width:100%;margin: 10px auto;"
                @row-click="intoRepoSelected"
                >
                <el-table-column label="商品名">
                    <template scope="scope">
                        {{scope.row.sku.product.name}}
                    </template>
                </el-table-column>

                <el-table-column label="批次">
                    <template scope="scope">
                        # {{scope.row.id}}
                    </template>
                </el-table-column>

                <el-table-column label="规格">
                    <template scope="scope">
                        {{scope.row.sku.properties}}
                    </template>
                </el-table-column>
                <el-table-column label="单价">
                    <template scope="scope">
                        ￥{{parseFloat(scope.row.unitPrice).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column label="库存">
                     <template scope="scope"  >
                      <span v-bind:class="{waring:scope.row.quantity<10}">{{scope.row.quantity}}</span>  
                    </template>
                </el-table-column>
                <el-table-column label="入库时间" width="200">
                     <template scope="scope">
                        {{scope.row.dealTime}}
                    </template>
                </el-table-column>
            </el-table>
        </div>



    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: mapGetters({
            bookings: 'bookings'
        }),
        data() {
            return {
                status: "100",
                selectedBooking: null,
                showOrdersDialog: false,
                showIntoRepoDialog: false,
                showOutRepoDialog: false,
                showShipInfoDialog: false,
                repos: [], //仓库列表
                dealIntoRepos: [], //当前选择商品以及仓库的入库列表,
                dealOrder: null, //当前操作的Order,
                dealOutRepos: [], //当前订单出库信息,
                dealShips: [], //当前订单物流信息
                productId:[]
            }
        },
        mounted(){
            var that = this;
            this.request();
            this.$store.dispatch("filterRepos", {
                fields: "rows {id, name}"
            }).then(res => {
                let repos = [];
                for(let repo of res.repos.rows){
                    repos.push({
                        label: repo.name,
                        value: repo.id
                    })
                }
                that.repos = [{
                    label: "华东地区",
                    value: "华东地区",
                    children: repos
                }];
            });
        },
        methods: {
            request() {
                let that = this;
                this.$store.dispatch('getBookings', {
                    filters: {
                        status: that.status
                    },
                    fields: `
                        id,
                        receiptFee,
                        source,
                        receiverName,
                        receiverAddress,
                        receiverPhone,
                        memo,
                        tradeNumber,
                        outTradeNumber,
                        createdAt,
                        status,
                        owner {
                            id,
                            displayName,
                            email
                        },
                        orders {
                            id,
                            sku {
                                id,
                                properties,
                                goodsNo,
                                product {
                                    name
                                }
                            },
                            quantity,
                            receiptFee
                        }
                    `
                });
            },
            tabClick(tab, event) {
                this.status = tab.name.replace("#", "");
                this.request();
            },
            statusHandler(status, booking) {
                let r = confirm("确定操作？");
                let that = this;
                if (r) {
                    this.$store.dispatch('updateBookingStatus', {
                        status: status,
                        id: booking.id
                    }).then(res => {
                        let index = that.bookings.rows.indexOf(booking);
                        that.bookings.rows.splice(index, 1);
                    });
                }
            },
            outRepoHandler(booking) {
                this.showOrdersDialog= true; 
                this.selectedBooking= booking;
            },
            repoChange(val) {
                let that = this;
                this.$store.dispatch("filterIntoRepos", {
                    fields: `
                        rows {
                            quantity,
                            unitPrice,
                            dealTime,
                            id,
                            sku {
                                properties
                                product{
                                    name
                                }
                            },
                            repo {
                                id,
                                name
                            }
                        }`,
                    filters: {
                        // skuId: this.dealOrder.sku.id,
                        repoId: val[1]
                    }
                }).then(res=>{
                    that.dealIntoRepos = res.intoRepos.rows;

                });
            },
            chooseIntoRepo(order) {
                this.showIntoRepoDialog = true;
                this.dealOrder = order;
                this.dealIntoRepos = [];
            },
            intoRepoSelected(row) {
                this.showIntoRepoDialog = false;
                let orders = this.selectedBooking.orders;
                let index = orders.indexOf(this.dealOrder);
                this.dealOrder.intoRepo = row;
                this.$set(orders, index, this.dealOrder);
            },
            submitOutRepo() {
                let that = this;
                let outRepos = [];
                let booking = this.selectedBooking;
                for(let order of booking.orders) {
                    outRepos.push({
                        quantity: order.quantity,
                        order: order.id,
                        intoRepo: order.intoRepo.id,
                        sku: order.sku.id
                    })
                }
                this.$store.dispatch("deliverBooking", {
                    booking: booking.id,
                    outRepos: outRepos
                }).then(res => {
                    let index = that.bookings.rows.indexOf(booking);
                    that.bookings.rows.splice(index, 1);
                    that.showOrdersDialog = false;
                    that.$message({
                        message: "配仓成功",
                        type: "success"
                    })
                })
            },
            showShipInfoHandler(booking) {
                let that = this;
                this.selectedBooking = booking;
                this.showShipInfoDialog = true;
                this.$store.dispatch("getBooking", {
                    id: this.selectedBooking.id,
                    fields: `
                        id, 
                        ships {
                            id, 
                            name, 
                            number
                        }
                    `
                }).then(res => {
                    that.dealShips = [];
                    for(let ship of res.booking.ships) {
                        let isExist = that.dealShips.find(cship => {
                            let uniqueStr = cship.name + cship.number;
                            return uniqueStr == (ship.name + cship.number);
                        });
                        if (!isExist) {
                            that.dealShips.push(ship);
                        }
                    }
                });
            },
            showOutRepoHandler(booking) {
                let that = this;
                this.selectedBooking = booking;
                this.showOutRepoDialog = true;
                let orders = booking.orders.map(order => {
                    return order.id;
                });

                this.$store.dispatch("filterOutRepos", {
                    filters: {
                        bookingOrderId: {
                            $in: orders
                        }
                    },
                    fields: `
                        rows {
                            id, quantity, 
                            operationer {
                                displayName
                            },
                            intoRepo {
                                id,
                                repo {
                                    name
                                },
                                sku {
                                    properties
                                }
                            }
                        }
                    `
                }).then(res => {
                    console.log(res.outRepos)
                    that.dealOutRepos = res.outRepos;
                });
            }
        }
    }
</script>

<style>
    .waring{
        color: red
    }
</style>