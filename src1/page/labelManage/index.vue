
<template>
    <div class="labelManage">
        <div class="filter-container">
            <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-edit" @click="addLabel">
            添加
            </el-button>
        </div>
        <el-table  :data="labelList" border fit highlight-current-row style="width: 100%">
            <el-table-column prop="name" label="标题" width="140"></el-table-column>
            <!-- <el-table-column prop="labelId" label="名宿id" width="120"></el-table-column> -->
            <el-table-column prop="sortno" label="排序" width="80"></el-table-column>
            <el-table-column prop="img" label="头图" width="120">          
                <template  slot-scope="scope">            
                    <img :src="scope.row.img"  width="80" />
                </template>
            </el-table-column>
            <el-table-column align="center" class-name="status-col" label="状态" width="100px">
                <template slot-scope="{row}">
                    <el-tag :type="row.state | statusFilter">
                    {{ row.state | stateFilter }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间"></el-table-column>
            <el-table-column prop="updatedAt" label="更新时间"></el-table-column>
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="{row}" >
                <el-button type="primary" size="mini" @click="editLaleList(row)">
                修改
                </el-button>
                <!-- <el-button v-if="row.state!=2" size="mini" type="danger" @click="deleteInfos(row.id,'TABLE_Img')">
                删除
                </el-button> -->
                <el-button v-if="row.state!=1" size="mini" type="success" @click="handleModifyStatus(row,1)">
                发布
                </el-button>
                <el-button v-if="row.state!=0" size="mini" @click="handleModifyStatus(row,0)">
                取消
                </el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 编辑分类 -->
        <el-dialog :visible.sync="lableFormVisible" width="80%">
            <el-form ref="dataForm" :model="label" :rules="classRules" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="label.name"/>
                </el-form-item>
                <el-form-item label="排序" prop="sortno">
                    <el-input v-model="label.sortno" type="number" placeholder='请输入数字'/>
                </el-form-item>
                <el-form-item label="介绍" prop="intro">
                    <el-input v-model="label.intro" type="textarea"/>
                </el-form-item>
                <el-form-item label="上传头图" prop="img" class="total_box">
                    <el-upload
                    action=""
                    drag
                    accept="image/jpeg,image/png"
                    type="drag"
                    :on-change="onUploadChange('lableTop')"
                    :auto-upload="false"
                    :show-file-list="false"
                    style="float:left"
                    class="upload_box"
                    >
                    <i class="el-icon-upload icon"></i>
                    <div class="el-dragger__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为750*428px</div>
                    </el-upload>
                    <img :src="label.img" class="img_box">
                </el-form-item>
                <el-form-item label="选择关联名宿" prop="labelId">
                    <el-select v-model="chooseId" placeholder="请选择" multiple class="select" size='100%' style="width:100%" @change="getHouseList">
                        <el-option v-for='(item,index) in chooseList' :value="item.id" :key='index' :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-table :data="showList" border fit highlight-current-row style="width: 100%">
                <el-table-column prop="name" label="名宿名称" ></el-table-column>
                <el-table-column prop="listIntro" label="简介"></el-table-column>
                <el-table-column prop="labelName" label="标题"></el-table-column>
                <el-table-column prop="labelImgMIn" label="小图" width="80">
                    <template  slot-scope="scope">            
                        <img :src="scope.row.labelImgMIn"  width="50" />
                    </template> 
                </el-table-column>
                <el-table-column prop="labelImgMax" label="大图" width="80">
                    <template  slot-scope="scope">            
                        <img :src="scope.row.labelImgMax"  width="50" />
                    </template> 
                </el-table-column>
                <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
                    <template slot-scope="{row}" >
                        <el-button type="primary" size="mini" @click="editRelative(showList)">
                        修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="lableFormVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="submitLable(label)">
                    保存
                </el-button>
            </div>
        </el-dialog>
        <!-- 关联名宿的编辑 -->
        <el-dialog :visible.sync="relativeVisible" width="80%">
            <el-form ref="dataForm" :model="house" :rules="lableRules" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
                <el-form-item label="标题" prop="labelName">
                    <el-input v-model="house.labelName"/>
                </el-form-item>
                <el-form-item label="名宿描述" prop="labdescribe">
                    <el-input v-model="house.labdescribe" type="textarea"/>
                </el-form-item>
                <el-form-item label="上传大图" prop="labelImgMax" class="total_box">
                    <el-upload
                    action=""
                    drag
                    accept="image/jpeg,image/png"
                    type="drag"
                    :on-change="onUploadChange('labelImgMax')"
                    :auto-upload="false"
                    :show-file-list="false"
                    style="float:left"
                    class="upload_box"
                    >
                    <i class="el-icon-upload icon"></i>
                    <div class="el-dragger__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为676*307px</div>
                    </el-upload>
                    <img :src="house.labelImgMax" class="img_box">
                </el-form-item>
                <el-form-item label="上传小图" prop="labelImgMIn" class="total_box">
                    <el-upload
                    action=""
                    drag
                    accept="image/jpeg,image/png"
                    type="drag"
                    :on-change="onUploadChange('labelImgMIn')"
                    :auto-upload="false"
                    :show-file-list="false"
                    style="float:left"
                    class="upload_box"
                    >
                    <i class="el-icon-upload icon"></i>
                    <div class="el-dragger__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为275*153px</div>
                    </el-upload>
                    <img :src="house.labelImgMIn" class="img_box">
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="relativeVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="submitHouse(house)">
                    保存
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getLabelList, fetchList, getChooseList, modifyList, modifyHouse} from '@/api/article'
import {fileToImage, create} from '@/utils/upload-chomoo'

const uploader = create('lodgeSaid1909')

export default {
    filters: {
        statusFilter (state) {
            const statusMap = ['info', 'success', 'danger']
            return statusMap[state]
        },
        stateFilter (state) {
            const statusMap = ['未发布', '已发布', '删除']
            return statusMap[state]
        }
    },
    data () {
        return {
            lableFormVisible:false,
            relativeVisible:false,
            labelList: null,
            chooseList:[],
            chooseId:[],
            showList:null,
            id:'',
            house:{
                labelName:'',
                labdescribe:'',
                labelImgMax:'',
                labelImgMIn:'',
            },
            listLoading: true,
            label:{
                id:'',
                name:'',
                labelId:'',
                img:'',
                intro:'',
                sortno:'',
            },
            lableRules:{
                labelName: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                labdescribe: [
                    { required: true, message: '请输入名宿描述', trigger: 'blur' }
                ],
                labelImgMax: [
                    { required: true, message: '请上传大图', trigger: 'blur' }
                ],
                labelImgMIn: [
                    { required: true, message: '请上传小图', trigger: 'blur' }
                ],
            },
            classRules:{
                name: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                sortno: [
                    { required: true, message: '请输入排序且只能为数字', trigger: 'blur' }
                ],
                intro: [
                    { required: true, message: '请输入介绍', trigger: 'blur' }
                ],
                img: [
                    { required: true, message: '请上传头图', trigger: 'blur' }
                ],
                labelId: [
                    { required: true, message: '请选择名宿', trigger: 'blur' }
                ]
            },
            listQuery: {
                page: 1,
                limit: 10
            },
            houseValue:'',
            list:''
        }
    },
    methods: {
        async getList () {
            const data = await fetchList(this.listQuery)
            console.log(data,'data')
            const items = data.house
            let chooseArr = items.map(v => {
                this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                v.originalTitle = v.title //  will be used when user click the cancel botton
                return v
            })
            console.log(chooseArr)
            for(var i = 0; i < chooseArr.length; i++){
                if(chooseArr[i].state == 1) {
                    this.chooseList.push(chooseArr[i])
                }
            }
            console.log(this.chooseList)
        },
        async getClassifyList () {
           const data = await getLabelList()
           console.log(data,'getLabelList')
           this.labelList = data.label
        },
        //编辑列表
        editLaleList:function (row) {
            console.log(row,'labelList')
            this.lableFormVisible = true
            this.getList()
            this.label = Object.assign({},row)
            const chooseIds = row.labelId.split(',')
            for (let index = 0; index < chooseIds.length; index++) {
                this.chooseId[index] = Number(chooseIds[index])
            }
            console.log(this.chooseId,'chooseId')
            getChooseList(row.labelId).then(data => {
                this.showList = data.houseInfo
                console.log(this.showList)
            })
        },
        //删除
        deleteInfos:function () {

        },
        //提交
        async submitLable (label) {
            // let sumbit = label;
            // sumbit.labelId = this.id.join(',')
            const arrRules = {
                "name":label.name,
                "sortno":label.sortno,
                "intro":label.intro,
                "img":label.img,
                "labelId":this.id
            }
            for (const index in arrRules) {
                if (arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined) {
                console.log(index,this.classRules[index])
                this.$message.error(this.classRules[index][0]["message"])
                return
                }
            }
            let sumbit = label;
            sumbit.labelId = this.id.join(',')
            console.log(sumbit,'sumbit')
            const labelData = await modifyHouse(sumbit)
            this.lableFormVisible = false
            this.getClassifyList()
        },
        addLabel:function () {
            this.resertLable()
            this.lableFormVisible = true
            this.getList()
            this.chooseId = []//不能为''
            this.showList = null
        },
        resertLable () {
            this.label = {
                name:'',
                sortno:'',
                intro:'',
                img:'',
                labelId:''
            }
        },
        // reserImg () {
        //     this.img = {
        //         houseId:this.temp.id,
        //         id:'',
        //         name:'',
        //         img:'',
        //         sortno:''
        //     }
        // }
        onUploadChange (value) {
            return (file) => {
                const name = file.name;
                const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
                const isLt1M = file.size / 2048 / 2048 < 2
                if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
                return
                }
                const that = this
                fileToImage(file.raw,function (_img){
                console.log(_img.width,_img.height)
                    if(value == 'lableTop') {
                        if(_img.width == 750 && _img.height == 428){
                            uploader.uploadFile(file.raw, name, function (_res) {
                            console.log(_res,'res')
                            that.label.img = _res.link
                            })
                        }else{
                            that.messageText(750,428)
                        }
                    }
                    if(value == 'labelImgMax') {
                        if(_img.width == 676 && _img.height == 307){
                            uploader.uploadFile(file.raw, name, function (_res) {
                            console.log(_res,'res')
                            that.house.labelImgMax = _res.link
                            })
                        }else{
                            that.messageText(_img.width,_img.height)
                        }
                    }
                    if(value == 'labelImgMIn') {
                        if(_img.width == 275 && _img.height == 153){
                            uploader.uploadFile(file.raw, name, function (_res) {
                            console.log(_res,'res')
                            that.house.labelImgMIn = _res.link
                            })
                        }else{
                            that.messageText(_img.width,_img.height)
                        }
                    }
                }) 
            }
        },
        messageText(width,height) {
            if(width && height){
                this.$message.error(`请上传${width}px*${height}px的图片`)
            }else{
                this.$message.error(`请上传宽为${width}px的图片`)
            }
        },
        //编辑关联的名宿
        editRelative:function (showList) {
            this.relativeVisible = true
            console.log(showList,'editRelative')
            this.house = Object.assign({},showList[0])
        },
        getHouseList: function (id) {
            console.log(id,'id')
            this.id = id
            if(id.join(',')){
                let label = id.join(',')
                console.log(label)
                getChooseList(label).then(data => {
                    this.showList = data.houseInfo
                    console.log(this.showList)
                })
            }else{
                this.showList = null
            }
        },
        async submitHouse (data) {
            const arrRules = {
                "labelName":data.labelName,
                "labdescribe":data.labdescribe,
                "labelImgMax":data.labelImgMax,
                "labelImgMIn":data.labelImgMIn
            }
            for (const index in arrRules) {
                if (arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined) {
                console.log(index,this.lableRules[index])
                this.$message.error(this.lableRules[index][0]["message"])
                return
                }
            }
            console.log(data)
            var loadgeSaid = data
            console.log(loadgeSaid,'loadgeSaid')
            // loadgeSaid.label = temp.label.join(',')
            const house = await modifyList(loadgeSaid)
            this.relativeVisible = false
            this.getHouseList(this.id)
        },
        async handleModifyStatus (row,status) {
            console.log(row,status)
            const data = {
                'id':row.id,
                'state':status
            }
            const setRes = await modifyHouse(data)
            this.getClassifyList()
        }
    },
    mounted(){
      this.getClassifyList()
    },
}
</script>
<style scoped>
.img_box{
  height: 117px;
  padding-left: 20px;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.el-select{
    widows: 100% !important;
}
.el-select .el-input__inner {
  width: 100%;
}
</style>