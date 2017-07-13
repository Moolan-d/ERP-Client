<template>
    <div class="shipdetail">
        
        <el-tag type="gray" style="margin:5px 0">订单信息</el-tag>
        <el-row  :span="20" style=" box-shadow:inset 0 0 10px #cCC;padding:10px" class="dealDetail">
            <el-row type="flex" justify="space-between">
                <el-col :span="3"><div class="grid-content"  align="right"> <span>下单　时间：</span></div></el-col>
                <el-col :span="20"><div class="grid-main">{{ currentRow.booking.createdAt }}</div></el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
                <el-col :span="3"><div class="grid-content" align="right"> <span>交　易　号：</span></div></el-col>
                <el-col :span="20">
                    <div class="grid-main">{{ currentRow.booking.tradeNumber }}</div>
                </el-col>
            </el-row>
            <template v-if="currentRow.booking.outTradeNumber">
                <el-row type="flex" justify="space-between">
                    <el-col :span="3"><div class="grid-content" align="right"> <span>外部交易号：</span></div></el-col>
                    <el-col :span="20">
                        <div class="grid-main">{{ currentRow.booking.outTradeNumber }}</div>
                    </el-col>
                </el-row>
            </template>
            <el-row type="flex" justify="space-between">
                <el-col :span="3"><div class="grid-content"  align="right"> <span>提　交　人：</span></div></el-col>
                <el-col :span="20">
                    <div class="grid-main">{{ currentRow.booking.owner.displayName }}</div>
                </el-col>
            </el-row>
            <el-row type="flex"  justify="space-between">
                <el-col :span="3"><div class="grid-content" align="right"> <span>来　　　源：</span></div></el-col>
                <el-col :span="20">
                    <div class="grid-main">{{ currentRow.booking.source }}</div>
                </el-col>
            </el-row>
            <el-row type="flex"  justify="space-between">
                <el-col :span="3"><div class="grid-content" align="right"> <span>收　货　人：</span></div></el-col>
                <el-col :span="20">
                    <div class="grid-main">{{ currentRow.booking.receiverName }}</div>
                </el-col>
            </el-row>
            <el-row type="flex"  justify="space-between">
                <el-col :span="3"><div class="grid-content" align="right"> <span>收货人电话：</span></div></el-col>
                <el-col :span="20">
                    <div class="grid-main">{{ currentRow.booking.receiverPhone }}</div>
                </el-col>
            </el-row>
            <el-row type="flex"  justify="space-between">
                <el-col :span="3"><div class="grid-content" align="right"> <span>收货人地址：</span></div></el-col>
                <el-col :span="20">
                    <div class="grid-main">{{ currentRow.booking.receiverAddress }}</div>
                </el-col>
            </el-row>
            <template  v-if="currentRow.booking.memo">
            <el-row type="flex"  justify="space-between">
                <el-col :span="3"><div class="grid-content" align="right"><span>备　　　注：</span></div></el-col>
                <el-col :span="20">
                    <div class="grid-main">{{ currentRow.booking.memo }}</div>
                </el-col>
            </el-row>
            </template>
        </el-row> 
        <el-tag type="success" style="margin:5px 0">已保存订单信息</el-tag>
       
        <el-row >
                <span v-if="bookingships.length===0" style="font-size:12px;color:#ccc">暂无发货信息</span>
                    <template>
                        <el-row  :key="ship" :span="24" v-for="ship in bookingships" >
                           <el-row type="flex" justify="space-between" style=" padding:3px 17px;border:1px solid #ccc ;background:#e5e6e8">
                              <el-col :span="10">
                                <span class="label">快递 :</span>
                                <span class="content">{{ship.name}}</span>
                            </el-col>
                            <el-col :span="10">
                                <div>
                                <span class="label">单号 :</span>
                                <span class="content">{{ship.number}}</span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div style="float:right">
                                 <el-button size="mini" type="danger" @click="shipDel(ship)">删除</el-button>
                                </div>
                            </el-col>
                            <el-col :span="2" v-if="shipStatus!=='103' ">
                                <div style="float:right" >
                                 <el-button size="mini" type="primary"  @click="openConfirm(ship)">发货</el-button>
                                </div>
                            </el-col>
                            </el-row>
                            <el-row :span="24" style="">
                                <el-table :key="ship.outRepos"  :data="ship.outRepos"  border tooltip-effect="dark" >
                                    
                                    <el-table-column label="商品名称" prop="order.sku.product.name">
                                    </el-table-column>
                                    <el-table-column label="属性" prop="order.sku.properties">
                                    </el-table-column>
                                    <el-table-column label="数量">
                                        <template scope="scope">
                                            {{scope.row.quantity}} / {{scope.row.order.sku.unit}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                      fixed="right"
                                      label="操作"
                                      width="100">
                                      <template scope="scope">
                                        <el-button  type="text" @click="popShipOutRepo(scope.$index, scope.row)" size="small">移除</el-button>
                                        
                                      </template>
                                    </el-table-column>
                                </el-table> 
                            </el-row>
                          
                        </el-row>
                       
                    </template>
                </el-row>

        <el-tag type="warning" style="margin:5px 0">未保存订单信息</el-tag>
          
            <el-table  :data="currentRow.outRepos"  border tooltip-effect="dark"  @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="商品名称" prop="order.sku.product.name">
                </el-table-column>
                <el-table-column label="属性" prop="order.sku.properties">
                </el-table-column>
                <el-table-column label="数量">
                    <template scope="scope">
                        {{scope.row.quantity}} / {{scope.row.order.sku.unit}}
                    </template>
                </el-table-column>
            </el-table>

        <el-tag type="gray" style="margin:5px 0">快递信息</el-tag>
        <h5></h5>
        <el-row > 
            <template>
                <el-row :span="24">
                    <el-col :span="12">
                    <div class="grid bg-purple-light">
                        <el-radio class="radio" v-model="deliveryWay" label="1">普通面单</el-radio>
                    </div>
                    </el-col>
                    <el-col  :span="12">
                    <div class="grid bg-purple-light">
                        <el-radio class="radio" v-model="deliveryWay" label="2">电子面单</el-radio>
                    </div>
                    </el-col>
                </el-row>

            </template>

                
            <el-row  :span="20">
                <div class="deliveryForm">
                    <el-form v-if="deliveryWay==='1' " ref="shipForm" :model="shipForm" label-width="100px">
                        <el-form-item 
                        label="快递公司"
                        prop="name"
                        :rules="[{ required: true, message: '快递名称不能为空'}]"
                        >
                            <el-input style="width: 300px;" v-model="shipForm.name"></el-input>
                        </el-form-item>
                        <el-form-item 
                        label="快递单号"
                        prop="number"
                        :rules="[{ required: true, message: '快递单号不能为空'}]"
                         >
                            <el-input style="width: 300px;" v-model="shipForm.number"></el-input>
                        </el-form-item>
                        <span class="save">
                            <el-button type="primary" @click="shipSave">保存</el-button>
                        </span>
                    </el-form>
                    <el-form v-if="deliveryWay==='2' " label-width="100px">
                        <el-form-item 
                        label="快递公司"
                        prop="number"
                        
                            >
                        <el-select style="width:300px;" v-model="shipRenderMsg" placeholder="请选择" >
                            <el-option

                              v-for="item in delieverGroup"
                              :key="item.id"
                              :label="item.name"
                              :value="item">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item 
                        label="快递单号"
                        prop="number"
                       
                        >
                        <el-input
                                style="width: 300px;"
                              placeholder="尚未生成快递单号"
                              v-model="logiscNum"
                              :disabled="true">
                        </el-input>
                        </el-form-item>
                        <span class="save">
                            <el-button type="primary" @click="logisticRender">生成</el-button>
                            <el-button type="primary" @click="shipSave2">保存</el-button>
                        </span>
                    </el-form>
                </div>

                </el-row>



            </el-row>




    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    data() {
            return {
                result: {},
                currentRow: null,
                deliveryWay:"",
                logiscNum:"",
                shipStatus:"",
                bookingships:[],
                shipRenderMsg:"",
                activeName2: 'first',
                template:"",
                shipForm: {
                    name: "",
                    number: ""
                },
                delieverGroup:[]
            }
        },
    

    created() {

        this.currentRow = this.$store.state.currentRow
        this.shipStatus = this.currentRow.booking.status

        this.$store.dispatch("getLogistics", {
            fields: `
            id,
            name,
            customerName,
            customerPwd,
            alias
            `
        }).then(res => {
            this.delieverGroup = res.logistics.rows

        })

    },
    mounted() {

        let currentRow = this.$store.state.currentRow
        this.bookingships = currentRow.booking.ships
        this.bookingships.forEach(function(value, index) {
            value.outRepos.forEach(it => {
                it["parentIndex"] = index
            })
        })

        //隐藏已保存订单信息
        let ships = currentRow.booking.ships
        let temp = this.currentRow.outRepos
        temp = temp.filter(function(it) {

            var boolean = true
            for (var i = 0; i < ships.length; i++) {
                if (ships[i].outRepos.length) {
                    let temp2 = ships[i].outRepos

                    for (var j = 0; j < temp2.length; j++) {
                        if (it.id == temp2[j].id) {
                            boolean = false
                        }

                    }
                }
            }
            return boolean
        })
        this.currentRow.outRepos = temp


    },
    computed: mapGetters({
        result: 'bookings'
    }),
  

    methods:{
        // deliveryHandler(row) {
        //     let that = this;
        //     this.showDeliveryDialog = true;
        //     this.$store.dispatch("filterOutRepos", {
        //         fields: `
        //             rows {
        //                 id,
        //                 quantity,
        //                 intoRepo {
        //                     id
        //                 },
        //                 order {
        //                     sku {
        //                         unit,
        //                         properties,
        //                         product {
        //                             name
        //                         }
        //                     }
        //                 }
        //             }
        //         `,
        //         filters: {
        //             repoId: this.$route.query.repo,
        //             bookingId: row.booking.id
        //         }
        //     }).then(res => {
        //         that.currentRow = {
        //             booking: row.booking,
        //             outRepos: res.outRepos.rows
        //         }
        //     })
        //     },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
      //普通面单 保存生成快递信息
        shipSave(){
            let bookingForm = {}
            let multipleSelection = this.multipleSelection
            bookingForm['outRepos'] = ''
            bookingForm['type'] = parseInt(this.deliveryWay)
            bookingForm['booking'] = this.currentRow.booking.id
            bookingForm['name'] = this.shipForm.name
            bookingForm['template'] = this.template
            bookingForm['number'] = this.shipForm.number
            if (multipleSelection) {
                var temp = []
                multipleSelection.forEach((it) => {

                    temp.push(it.id)

                })
                bookingForm['outRepos'] = temp.join(',')
            }
            this.$store.dispatch('renderShip',bookingForm)
                .then(res => {
                    window.history.back()
            })
            

            },

        //电单 保存生成快递信息
        shipSave2() {
            let bookingForm = {}
            let multipleSelection = this.multipleSelection
            bookingForm['outRepos'] = ''
            bookingForm['type'] = parseInt(this.deliveryWay)
            bookingForm['booking'] = this.currentRow.booking.id
            bookingForm['name'] = this.shipRenderMsg.name
            bookingForm['template'] = this.template
            bookingForm['number'] = this.logiscNum

            if (multipleSelection) {
                var temp = []
                multipleSelection.forEach((it) => {

                    temp.push(it.id)

                })
                bookingForm['outRepos'] = temp.join(',')
            }
            console.log(bookingForm)
            if (bookingForm.number) {
                this.$store.dispatch('renderShip', bookingForm)
                    .then(res => {
                        window.history.back()
                    })
            } else {
                alert("您还未生成单号")
            }



        },

        //生成电单号
        logisticRender() {
            let alias = this.shipRenderMsg.alias
            let customerName = this.shipRenderMsg.customerName
            let customerPwd = this.shipRenderMsg.customerPwd
            let bookingId = this.currentRow.booking.id
            let renderForm = {
                alias: alias,
                customerPwd: customerPwd,
                bookingId: bookingId,
                customerName: customerName
            }
            this.$store.dispatch('logisticRender', {
                renderForm
            }).then(res => {

                this.logiscNum = res.logisticRenderType.number
                this.template = res.logisticRenderType.template
                this.template = this.template.replace(/\"/g, " ' ")
            })
        },
     // 快递单移除出库关联
        popShipOutRepo(index, row) {
            let that = this
            let delData = {}
            let parentIndex = row.parentIndex
            delData.outRepo = row.id
            delData.bookingship = this.currentRow.booking.ships[parentIndex].id
            this.$store.dispatch('popShipOutRepo', {
                    delData
                })
                .then(res => {
                    if (res.OutRepo.outRepos.length === 0) {
                        let bookingshipId = delData.bookingship
                        this.$store.dispatch('deleteBookingShip', {
                            bookingshipId
                        })
                    }
                }).then(res => {

                    that.$message({
                        message: "操作成功",
                        type: "success"
                    })
                }).then(res => window.history.back())

        },
        //删除快递单
        shipDel(ship) {
            let index = this.bookingships.indexOf(ship)
            let bookingshipId = this.currentRow.booking.ships[index].id
            this.$store.dispatch('deleteBookingShip', {
                    bookingshipId
                })
                .then(res => {
                    window.history.back()
                })

        },
        //加回调

        openConfirm(ship){
            this.$confirm('此操作不可撤销, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.shipHandler(ship)
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '发货成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消发货'
                });
            });
      
        },



        //发货（更改发货status）
        shipHandler(ship) {

            let bookingId = this.currentRow.booking.id
            let index = this.bookingships.indexOf(ship)
            let bookingshipId = this.currentRow.booking.ships[index].id
            let shipBookingForm = {
                booking: bookingId,
                bookingship: bookingshipId
            }
            this.$store.dispatch('shipBooking', {
                shipBookingForm
            }).then(res => {
                window.history.back()
            })


        }
    }
}
</script>

<style>
.save{
    float: right;
    margin: 30px 10px 0 0
}
.deliveryForm{
    height: 250px;
    border: 1px dotted #ccc;
    padding: 30px 10px 0 10px;
    box-sizing: border-box;
}
.label{
    color: #aaa;
    font-size: 14px;
}
.content{
    color: #333;
    font-size: 14px;
}
.shipdetail{
    margin-top: -30px;
    margin-bottom: 50px
}
    h5{
    margin-top: 5px;
    margin-bottom: 5px
    }
    .dealDetail{
    font-size: 14px;
    font-family: "兰亭黑","微软雅黑";
    }
    .bg-purple-light {
    background: #e5e9f2;
    text-align: center;
  }
    .grid {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px
  }
  .grid-content span{
    color: #bbb;
    width: 100px;
  }
  .grid-main{
    color:#333;
    font-size: 0.9em;
    }
  .activeStyle:active a {
    color: red
  }
</style>