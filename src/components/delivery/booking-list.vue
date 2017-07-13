<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="待发货" name="first">
       
        <el-table :data="result.rows">
            <el-table-column label="下单时间" prop="booking.createdAt" width="200"></el-table-column>
            <el-table-column label="提交人">
                <template scope="scope">
                    <template v-if="scope.row.booking.owner">
                       {{ scope.row.booking.owner.displayName }}
                    </template>
                    <template v-else>
                        系统
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="实付" width="100">
                <template scope="scope">
                    ￥{{scope.row.booking.receiptFee.toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column label="来源" prop="booking.source"></el-table-column>
            <el-table-column label="收货人" prop="booking.receiverName" width="100"></el-table-column>
            <el-table-column label="收货人电话" prop="booking.receiverPhone" width="150"></el-table-column>
            <el-table-column label="收货人地址" prop="booking.receiverAddress" width="300"></el-table-column>
            <el-table-column label="交易号" prop="booking.tradeNumber" width="200"></el-table-column>
            <el-table-column label="外部交易号" prop="booking.outTradeNumber" width="200"></el-table-column>
            <el-table-column label="备注" prop="booking.memo" width="200"></el-table-column>            
            <el-table-column fixed="right" label="操作" width="180">
                <template scope="scope">
                    <a href="#/home/delivery/shipDetail"><el-button  type="text" size="small" @click="deliveryHandler(scope.row)">发货</el-button></a>
                </template>
            </el-table-column>
        </el-table>
   <!--  -->
    </el-tab-pane>


    <el-tab-pane label="已发货" name="second">
        <el-table :data="result.rows">
            <el-table-column label="下单时间" prop="booking.createdAt" width="200"></el-table-column>
            <el-table-column label="提交人">
                <template scope="scope">
                    <template v-if="scope.row.booking.owner">
                       {{ scope.row.booking.owner.displayName }}
                    </template>
                    <template v-else>
                        系统
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="实付" width="100">
                <template scope="scope">
                    ￥{{scope.row.booking.receiptFee.toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column label="来源" prop="booking.source"></el-table-column>
            <el-table-column label="收货人" prop="booking.receiverName" width="100"></el-table-column>
            <el-table-column label="收货人电话" prop="booking.receiverPhone" width="150"></el-table-column>
            <el-table-column label="收货人地址" prop="booking.receiverAddress" width="300"></el-table-column>
            <el-table-column label="交易号" prop="booking.tradeNumber" width="200"></el-table-column>
            <el-table-column label="外部交易号" prop="booking.outTradeNumber" width="200"></el-table-column>
            <el-table-column label="备注" prop="booking.memo" width="200"></el-table-column>            
            <el-table-column fixed="right" label="操作" width="180">
                <template scope="scope">
                    <a href="#/home/delivery/shipDetail"><el-button  type="text" size="small" @click="deliveryHandler(scope.row)">查看</el-button></a>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="部分发货" name="third">
         <el-table :data="result.rows">
            <el-table-column label="下单时间" prop="booking.createdAt" width="200"></el-table-column>
            <el-table-column label="提交人">
                <template scope="scope">
                    <template v-if="scope.row.booking.owner">
                       {{ scope.row.booking.owner.displayName }}
                    </template>
                    <template v-else>
                        系统
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="实付" width="100">
                <template scope="scope">
                    ￥{{scope.row.booking.receiptFee.toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column label="来源" prop="booking.source"></el-table-column>
            <el-table-column label="收货人" prop="booking.receiverName" width="100"></el-table-column>
            <el-table-column label="收货人电话" prop="booking.receiverPhone" width="150"></el-table-column>
            <el-table-column label="收货人地址" prop="booking.receiverAddress" width="300"></el-table-column>
            <el-table-column label="交易号" prop="booking.tradeNumber" width="200"></el-table-column>
            <el-table-column label="外部交易号" prop="booking.outTradeNumber" width="200"></el-table-column>
            <el-table-column label="备注" prop="booking.memo" width="200"></el-table-column>            
            <el-table-column fixed="right" label="操作" width="180">
                <template scope="scope">
                    <a href="#/home/delivery/shipDetail"><el-button  type="text" size="small" @click="deliveryHandler(scope.row)">发货</el-button></a>
                </template>
            </el-table-column>
        </el-table>

    </el-tab-pane>
  </el-tabs>
</template>


<script>
    

    export default {
        watch: {
            '$route': 'fetchData'
        },
        data() {
            return {
                result: {},
                showDeliveryDialog: false,
                currentRow: null,
                activeName2: 'first',
                status:"100",
                bookingStatus:"102",
                shipForm: {
                    name: "",
                    number: ""
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            shipHandler() {
                let that = this;
                this.$refs["shipForm"].validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    let outRepos = this.currentRow.outRepos.map(outRepo => {
                        return String(outRepo.id);
                    }).join(",");
                    this.$store.dispatch("shipBooking", {
                        data: {
                            name: this.shipForm.name,
                            number: this.shipForm.number,
                            outRepos: outRepos,
                            booking: this.currentRow.booking.id
                        },
                        fields: "id,status"
                    }).then(res => {
                        let indexRow = that.result.rows.find(row => {
                            return row.booking.id == res.booking.id
                        });
                        let index = that.result.rows.indexOf(indexRow);
                        that.result.rows.splice(index);
                    });
                });
            },
            deliveryHandler(row) {
                let that = this;
                this.showDeliveryDialog = true;
                this.$store.dispatch("filterOutRepos", {
                    fields: `
                        rows {
                            id,
                            quantity,
                            intoRepo {
                                id
                            },
                            order {
                                sku {
                                    unit,
                                    properties,
                                    product {
                                        name
                                    }
                                }
                            }
                        }
                    `,
                    filters: {
                        repoId: this.$route.query.repo,
                        bookingId: row.booking.id
                    }
                }).then(res => {
                    that.$store.state.currentRow = {
                        booking: row.booking,
                        outRepos: res.outRepos.rows
                    }
                    
                })
            },
            fetchData() {
                let that = this;
                let repoId = this.$route.query.repo;

                if (!repoId) return;
                this.$store.dispatch("filterOutRepos", {
                    fields: `
                        rows {
                            id,
                            repo {
                                name,
                                id
                            },
                            booking {
                                id,
                                status,
                                tradeNumber,
                                receiptFee,
                                source,
                                receiverName,
                                receiverAddress,
                                receiverPhone,
                                memo,
                                owner {
                                    displayName
                                },
                                tradeNumber,
                                outTradeNumber,
                                createdAt,
                                ships{
                                    name,
                                    number,
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
                                    },
                                    id,
                                }
                            }
                        }
                    `,
                    filters: {
                        repoId: repoId,
                        status:this.status
                    },
                    include: [{
                        model:"booking",
                        where: {
                            status: {
                                $in: [`${this.bookingStatus}`]
                            }
                        }
                    }],
                    group: ["bookingId"]
                }).then(res => {
                    
                    that.result = res.outRepos;

                })
            },

        handleClick(tab) {
            if (tab.index === '1') {
                this.status = '101'
                //已发货
                this.bookingStatus= '103'
                this.fetchData()
            } else if (tab.index === '0') {
                this.status = '100'
                //未发货
                this.bookingStatus= '102'
                this.fetchData()
            } else if (tab.index === '2') {
                this.status = '101'
                //部分发货
                this.bookingStatus = '104'
                this.fetchData()
            }
        }

    }
}

</script>