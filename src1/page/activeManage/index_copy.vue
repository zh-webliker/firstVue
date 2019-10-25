  |-- activeManage/index.vue
<template>
  <div class="activeManage ">
      <div class="app-container">
        <div class="filter-container">
          <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            添加
          </el-button>
        </div>
      <el-table  v-if="list" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="id" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="name">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="label">
          <template slot-scope="scope">
            <span>{{ scope.row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="intro">
          <template slot-scope="scope">
            <span>{{ scope.row.intro }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="status-col" label="State" width="100px">
          <template slot-scope="{row}">
            <el-tag :type="row.state | statusFilter">
              {{ row.state | stateFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="sortno" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.sortno }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column width="180px" align="center" label="Date">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="Author">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" label="Importance">
          <template slot-scope="scope">
            <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="300px" label="Title">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.title" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.title }}</span>
          </template>
        </el-table-column> -->

        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}" >
            <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
            <el-button v-if="row.state!=1" size="mini" type="success" @click="handleModifyStatus(row,'published')">发布</el-button>
            <el-button v-if="row.state!=0" size="mini" @click="handleModifyStatus(row,'draft')">取消</el-button>
            <el-button v-if="row.state!=2" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">删除</el-button>
            <!-- v-if="row.state==2" -->
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="id" prop="id" hidden>
            <el-input v-model="temp.id" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="标签" prop="label">
            <el-select v-model="value" style="width:500px;" multiple placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <div style="margin-top:30px;">
              <el-tag v-for="item of temp.lable" :key="item" style="margin-right:15px;">
                {{ item }}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="头图" prop="area">
            <el-upload
              action=""
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('topUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.area" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为750*502px</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="temp.intro" />
          </el-form-item>
          <el-form-item label="介绍" prop="introduce">
            <el-input v-model="temp.introduce" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="temp.address" />
          </el-form-item>
          <el-form-item label="地址图片" prop="addressImg">
            <el-upload
              action=""
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('addressUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.addressImg" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为673*367px</div>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item  prop="addressImg">
            <el-input v-model="addressUrl"  disabled/>
          </el-form-item> -->
          <el-form-item label="订房须知" prop="enterTime">
            <el-upload
              action=""
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('enterTimeUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.enterTime" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且宽为628px</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="酒店设施" prop="outTime">
            <el-upload
              action=""
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('outTimeUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.outTime" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且宽为610px</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="排名" prop="sortno">
            <el-input v-model="temp.sortno" />
          </el-form-item>
          <el-form-item label="列表图片" prop="listImg">
            <el-upload
              action=""
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              ref="1"
              :on-change="onUploadChange('listImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.listImg" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为701*364px</div>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item label="列表图片" prop="listImg">
            <el-input v-model="listImgUrl"  disabled/>
          </el-form-item> -->
          <el-form-item label="列表简介" prop="listIntro">
            <el-input v-model="temp.listIntro" />
          </el-form-item>
          <el-form-item label="价格" prop="amt">
            <el-input v-model="temp.amt" />
          </el-form-item>
          <el-form-item label="图库图片数量" prop="wash">
            <el-input v-model="temp.wash" />
          </el-form-item>
          <!-- 推荐 -->
          <el-form-item label="推荐图片" prop="recomImg">
            <el-upload
              action=""
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              ref="1"
              :on-change="onUploadChange('recomImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.recomImg" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为250*216px</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="查看更多图片" prop="moreImg">
            <el-upload
              action=""
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              ref="1"
              :on-change="onUploadChange('moreImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.moreImg" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为701*364px</div>
            </el-upload>
          </el-form-item>
          <!-- 热门 -->
          <el-form-item label="热门排行" prop="hotSortno">
            <el-input v-model="temp.hotSortno" />
          </el-form-item>
          <el-form-item label="热门图片" prop="hotImg">
            <el-upload
              action=""
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              :on-change="onUploadChange('hotImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="temp.hotImg" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为701*300px</div>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item  prop="hotImg">
            <el-input v-model="hotImgUrl"  disabled/>
          </el-form-item> -->
          <el-form-item label="热门名称" prop="hotName">
            <el-input v-model="temp.hotName" />
          </el-form-item>
          <!-- <el-form-item label="推荐排行" prop="recomSortno">
            <el-input v-model="temp.recomSortno" />
          </el-form-item>
          <!-- 三大分类 -->
          <!-- <el-form-item label="分类名称" prop="labelName">
            <el-input v-model="temp.labelName" />
          </el-form-item>
          <el-form-item label="分类大图" prop="labelImgMax">
            <el-upload
              action=""
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              :on-change="onUploadChange('labelImgMaxUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="labelImgMaxUrl" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
          </el-form-item>
          <el-form-item  prop="labelImgMax">
            <el-input v-model="labelImgMaxUrl"  disabled/>
          </el-form-item>
          <el-form-item label="分类小图" prop="labelImgMIn">
            <el-upload
              action=""
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              :on-change="onUploadChange('labelImgMInUrl')"
              :auto-upload="false"
              :show-file-list="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <img :src="labelImgMInUrl" class="img_box">
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
          </el-form-item>
          <el-form-item  prop="labelImgMIn">
            <el-input v-model="labelImgMInUrl"  disabled/>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"> -->
          <el-button type="primary" @click="submitForm(temp)">
            Confirm
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { fetchList } from '@/api/article'
import { modifyList } from '@/api/article';
import { create,fileToImage } from '@/utils/upload-chomoo'
const uploader = create('ladgeSaid')
const cityOptions = ['上海', '北京', '广州', '深圳']
const infrastructureInfo = ['1', '2', '3', '4','5', '6', '7', '8','9', '10']
const bathrooms = ['一','二','三','四']
const cookhouses = ['a','b','c','d']
export default {
  name: 'InlineEditTable',
  components: { ElDragSelect },
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
      file:'',
      list: null,
      url:'',
      ids:[1,2,3,4,5],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      checkedInfras:['1'],
      infrastructureInfo:infrastructureInfo,
      isCheckAllInfra:true,
      CheckAllInfra:false,
      isCheckAllBath:false,
      checkAllBath:false,
      checkedBaths:['一'],
      baths:bathrooms,
      isCheckAllCook:false,
      checkAllCook:false,
      checkedCooks:['a'],
      cooks:cookhouses,
      temp: {
        id: undefined,
        name: '',
        label: [],
        area: '',
        intro: '',
        introduce: '',
        address: '',
        addressImg: '',
        enterTime: '',
        outTime: '',
        sortno: [],
        listImg: '',
        listIntro: '',
        amt: '',
        hotSortno: '',
        hotImg: '',
        hotName: '',
        recomSortno: '',
        recomImg:'',//推荐图
        moreImg:'',//查看更多图
        wash:''
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      value: '',
      options: [{
        value: '古村落原生态',
        label: '古村落原生态'
      }, {
        value: '匠心设计',
        label: '匠心设计'
      }, {
        value: '网红乡居',
        label: '网红乡居'
      }, {
        value: '山水氧吧',
        label: '山水氧吧'
      }, {
        value: '百花人家',
        label: '百花人家'
      }, {
        value: '京西古道',
        label: '京西古道'
      }],
      rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          label: [
            { required: true, message: '请输入活动标签', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '请输入简介', trigger: 'blur' }
          ],
          introduce: [
            { required: true, message: '请输入地址介绍', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          addressImg: [
            { required: true, message: '上传图片', trigger: 'blur' }
          ],
          enterTime: [
            { required: true, message: '请上传订房须知图片', trigger: 'blur' }
          ],
          outTime: [
            { required: true, message: '请上传酒店设施图片', trigger: 'blur' }
          ],
          sortno: [
            { required: true, message: '请输入排名', trigger: 'blur' }
          ],
          listIntro: [
            { required: true, message: '请输入列表简介', trigger: 'blur' }
          ],
          amt: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '请上传头图', trigger: 'blur' }
          ],
          wash: [
            { required: true, message: '请输入图库图片数量', trigger: 'blur' }
          ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.listLoading = true
      const data = await fetchList(this.listQuery)
      console.log(data,'data')
      const items = data.house
      this.list = items.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    cancelEdit (row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit (row) {
      console.log(row, 'row')
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    handleUpdate (row) {
      console.log(this.temp,'temp')
      this.temp = Object.assign({}, row) // copy obj
      this.value = (this.temp.label || "").split(',')
      console.log(this.value,'value')
      console.log()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus (row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
      console.log(row,'row')
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    //基础设施
    handleCheckAllInfra (val) {
      console.log(val,'val')
      this.checkedInfras = val ? infrastructureInfo : []
      this.isCheckAllInfra = false;
    },
    handleCheckedInfraChange (value) {
      let checkedCount = value.length;
      this.CheckAllInfra = checkedCount === this.infrastructureInfo.length;
      this.isCheckAllInfra = checkedCount > 0 && checkedCount < this.infrastructureInfo.length;
    },
    // handleCheckAll (val, checkListOption, isIndeterminate ) {
    //   checkListOption = val ? cityOptions : []
    //   isIndeterminate = false
    // },
    // handeleCheckSingle (value, checkAllState, list, isIndeterminate) {
    //   let checkedCount = value.length;
    //   checkAllState = checkedCount === list.length;
    //   isIndeterminate = checkedCount > 0 && checkedCount < list.length;
    // },
    //卫浴设施
    handleCheckAllBath (val) {
      this.checkedBaths = val ? bathrooms : []
      this.isCheckAllBath = false
    },
    handleCheckedBathChange (value) {
      let checkedCount = value.length;
      this.checkAllBath = checkedCount === this.baths.length
      this.isCheckAllBath = checkedCount > 0 && checkedCount < this.baths.length
    },
    //厨卫
    handleCheckAllCook (val) {
      this.checkedCooks = val ? cookhouses : []
      this.isCheckAllCook = false
    },
    handleCheckedCookChange (value) {
      let checkedCount = value.length;
      this.checkAllCook = checkedCount === this.cooks.length;
      this.isCheckAllCook = checkedCount > 0 && checkedCount < this.cooks.length
    },
    // onUploadChange (file,fileList) {
    //   console.log(file,'file')
    //   console.log(fileList,'fileList')
    //   const name = file.name;
    //   const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
    //   const isLt1M = file.size / 2048 / 2048 < 2
    //   if (!isIMAGE) {
    //     this.$message.error('上传文件只能是图片格式!')
    //     return
    //   }
    //   if (!isLt1M) {
    //     this.$message.error('上传文件大小不能超过 2MB!')
    //     return
    //   }
    //   console.log(22222)
    //   const that = this
    //   uploader.uploadFile(file.raw, name, function (_res) {
    //     console.log(1111)
    //     var url = _res.link
    //     that.url = url
    //   })
    //   console.log(this.url)
    // },
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
            if(value == 'addressUrl') {
              if(_img.width == 673 && _img.height == 367){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.temp.addressImg = _res.link
                })
              }else{
                that.messageText(_img.width,_img.height)
              }
            }else if(value == 'listImgUrl') {
              if(_img.width == 701 && _img.height == 364){
                uploader.uploadFile(file.raw, name, function (_res) {
                  that.temp.listImg = _res.link
                })
              }
              else{
                that.messageText(_img.width,_img.height)
              }
            }
            else if(value == 'hotImgUrl') {
              if(_img.width == 701 && _img.height == 300){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.temp.hotImg = _res.link
                })
              }
              else{
                that.messageText(_img.width,_img.height)
              }
            }
            else if(value == 'topUrl') {
              if(_img.width == 750 && _img.height == 502){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.temp.area = _res.link
                })
              }
              else{
                that.messageText(_img.width,_img.height)
              }
            }
            else if(value == 'recomImgUrl') {
              if(_img.width == 250 && _img.height == 216){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.temp.recomImg= _res.link
                })
              }
              else{
                that.messageText(_img.width,_img.height)
              }
            }
            else if(value == 'moreImgUrl') {
              if(_img.width == 701 && _img.height == 364){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.temp.moreImg = _res.link
                })
              }
              else{
                that.messageText(_img.width,_img.height)
              }
            }
            else if(value == 'enterTimeUrl') {
              if(_img.width == 628){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.temp.enterTime = _res.link
                })
              }
              else{
                that.messageText(_img.width)
              }
            }
            else if(value == 'outTimeUrl') {
              if(_img.width == 610){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.temp.outTime = _res.link
                })
              }
              else{
                that.messageText(_img.width)
              }
            }
        }) 
        console.log(this.url)
      }
    },
    //图片提示
    messageText(width,height) {
        if(width && height){
          this.$message.error(`请上传${width}px*${height}px的图片`)
        }else{
          this.$message.error(`请上传宽为${width}px的图片`)
        }
    },
    //提交表格
    async submitForm (temp) {
      const arrRules = {
        "name":temp.name,
        "label":this.value,
        "area":temp.area,
        "intro":temp.intro,
        "introduce":temp.introduce,
        "address":temp.address,
        "addressImg":temp.addressImg,
        "enterTime":temp.enterTime,
        "outTime":temp.outTime,
        "sortno":temp.sortno,
        "listImg":temp.listImg,
        "listIntro":temp.listIntro,
        "amt":temp.amt
      }
      console.log(temp)
      for (const index in arrRules) {
        if(arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined){
          console.log(index,this.rules[index])
          this.$message.error(this.rules[index][0]["message"])
          return 0;
        }
      }
      // for(var i = 0; i < arrRules.length; i++){
      //   if(arrRules[i] == '' || arrRules[i] == [] || arrRules[i] == null || arrRules[i] == undefined){
      //     console.log(111)rules
      //     this.$message.error('请输入必填项')
      //     return
      //   }
      // }

      // console.log(temp,'temp')
      // console.log(this.value,'value')
      // this.listLoading = true
      // var loadgeSaid = temp
      // // loadgeSaid.lable = temp.lable.join(',')
      // loadgeSaid.lable = this.value.join(',')
      // console.log(loadgeSaid,'loadgeSaid')
      // var myJsonString = JSON.stringify(loadgeSaid);
      // const data = await modifyList(myJsonString)
      // console.log(data,'data')
      // this.listLoading = false
      // this.dialogFormVisible = false
      // this.getList();
    },
    //添加
    handleCreate () {
      this.resetTemp()
      this.value = ['匠心设计']
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        name: '',
        label: [],
        area: '',
        intro: '',
        introduce: '',
        address: '',
        addressImg: '',
        enterTime: '',
        outTime: '',
        sortno: '',
        listImg: '',
        listIntro: '',
        amt: '',
        hotSortno: '',
        hotImg: '',
        hotName: '',
        recomSortno: '',
        recomImg:'',//推荐图
        moreImg:'',//查看更多图
        wash:''
      }
    },
    // lableValueSelect (val) {
    //   console.log(val,'val')
    // }
  },
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.img_box{
  width: 50px;
  height: 50px;
}
</style>
