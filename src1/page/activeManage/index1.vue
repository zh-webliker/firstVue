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
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}" >
            <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
            <el-button v-if="row.state!=1" size="mini" type="success" @click="handleModifyStatus(row,'published')">发布</el-button>
            <el-button v-if="row.state!=0" size="mini" @click="handleModifyStatus(row,'draft')">取消</el-button>
            <el-button v-if="row.state!=2" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
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
          <el-form-item label="头图" prop="area" class="total_box">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('topUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为750*502px</div>
            </el-upload>
            <img :src="temp.area" class="img_box">
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
              drag
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('addressUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为673*367px</div>
            </el-upload>
            <img :src="temp.addressImg" class="img_box">
          </el-form-item>
          <el-form-item label="订房须知" prop="enterTime">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('enterTimeUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且宽为628px</div>
            </el-upload>
            <img :src="temp.enterTime" class="img_box">
          </el-form-item>
          <el-form-item label="酒店设施" prop="outTime">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('outTimeUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且宽为610px</div>
            </el-upload>
            <img :src="temp.enterTime" class="img_box">
          </el-form-item>
          <el-form-item label="排名" prop="sortno">
            <el-input v-model="temp.sortno" />
          </el-form-item>
          <el-form-item label="列表图片" prop="listImg">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              ref="1"
              :on-change="onUploadChange('listImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为701*364px</div>
            </el-upload>
            <img :src="temp.listImg" class="img_box">
          </el-form-item>
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
              drag
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              ref="1"
              :on-change="onUploadChange('recomImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为250*216px</div>
            </el-upload>
            <img :src="temp.recomImg" class="img_box">
          </el-form-item>
          <el-form-item label="查看更多图片" prop="moreImg">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              ref="1"
              :on-change="onUploadChange('moreImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为701*364px</div>
            </el-upload>
            <img :src="temp.moreImg" class="img_box">
          </el-form-item>
          <!-- 热门 -->
          <el-form-item label="热门排行" prop="hotSortno">
            <el-input v-model="temp.hotSortno" />
          </el-form-item>
          <el-form-item label="热门图片" prop="hotImg">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              :on-change="onUploadChange('hotImgUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且尺寸为701*300px</div>
            </el-upload>
            <img :src="temp.hotImg" class="img_box">
          </el-form-item>
          <el-form-item label="热门名称" prop="hotName">
            <el-input v-model="temp.hotName" />
          </el-form-item>
        </el-form>

        <div class="filter-container">
          <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-edit" @click="addRoom">
            添加
          </el-button>
        </div>
        <el-table v-loading="listLoading" :data="roomList" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="id" label="房间id"></el-table-column>
          <el-table-column prop="name" label="房间名字"></el-table-column>
          <el-table-column prop="size" label="床型"></el-table-column>
          <el-table-column prop="peopleNum" label="可住人数"></el-table-column>
          <el-table-column prop="wifi" label="有无wifi"></el-table-column>
          <el-table-column prop="amt" label="价格"></el-table-column>
          <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}" >
              <el-button type="primary" size="mini" @click="editRoom(row)">修改</el-button>
              <el-button v-if="row.state!=0" size="mini">取消</el-button>
              <el-button v-if="row.state!=2" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="submitForm(temp)">
            Confirm
          </el-button>
        </div>
      </el-dialog>

      <!-- 编辑名宿推荐 -->
      <el-dialog :visible.sync="roomFormVisible" width="80%">
        <el-form ref="dataForm" :model="room" :rules="roomRules" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="名称" prop="name">
            <el-input v-model="room.name" />
          </el-form-item>
          <el-form-item label="床型" prop="size">
            <el-input v-model="room.size" />
          </el-form-item>
          <el-form-item label="入住人数" prop="peopleNum">
            <el-input v-model="room.peopleNum" />
          </el-form-item>
          <el-form-item label="是否有wifi" prop="wifi">
            <el-input v-model="room.wifi" />
          </el-form-item>
          <el-form-item label="价格" prop="amt">
            <el-input v-model="room.amt" />
          </el-form-item>
          <el-form-item label="房型" prop="roomType">
            <el-input v-model="room.roomType" />
          </el-form-item>
          <el-form-item label="布局" prop="layout">
            <el-input v-model="room.layout" />
          </el-form-item>
          <el-form-item label="床型" prop="bedType">
            <el-input v-model="room.bedType" />
          </el-form-item>
          <el-form-item label="设施" prop="facility">
            <el-input v-model="room.facility" />
          </el-form-item>
          <el-form-item label="房型描述" prop="RoomDescription">
            <el-input v-model="room.RoomDescription" />
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="room.link" />
          </el-form-item>
          <el-form-item label="房间图片" prop="img" class="total_box">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png"
              type="drag"
              :on-change="onUploadChange('houseUrl')"
              :auto-upload="false"
              :show-file-list="false"
              class="upload_box"
            >
              <i class="el-icon-upload icon"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且尺寸为150*112px</div>
            </el-upload>
            <img :src="room.img" class="img_box">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roomFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submitRoomForm(room)">
            确定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { fetchList } from '@/api/article'
import { modifyList, getRoomList} from '@/api/article';
import { create,fileToImage } from '@/utils/upload-chomoo'
const uploader = create('ladgeSaid')
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
      roomList:null,
      url:'',
      ids:[1,2,3,4,5],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
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
      room:{
        id: 2,
        houseId: 1,
        name: "",
        size: "",
        peopleNum: '',
        breakfast: '',
        wifi: '',
        amt: '',
        img: "",
        roomType: "",
        layout: "",
        bedType: "",
        facility: "",
        RoomDescription: "",
        link: "",
      },
      roomFormVisible:false,
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
      },
      roomRules:{
        name: [
          { required: true, message: '请输入房间名称', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请输入床型', trigger: 'blur' }
        ],
        peopleNum: [
          { required: true, message: '请输入入住人数', trigger: 'blur' }
        ],
        wifi: [
          { required: true, message: '请选择有无WiFi', trigger: 'blur' }
        ],
        amt: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        roomType: [
          { required: true, message: '请输入房型', trigger: 'blur' }
        ],
        layout: [
          { required: true, message: '请输入布局', trigger: 'blur' }
        ],
        bedType: [
          { required: true, message: '请输入床型', trigger: 'blur' }
        ],
        facility: [
          { required: true, message: '请输入设施', trigger: 'blur' }
        ],
        RoomDescription: [
          { required: true, message: '请输入房间描述', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入跳转的外链', trigger: 'blur' }
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
    //获取房间列表
    async getRoom (id) {
      const data = await getRoomList(id)
      console.log(data,'getRoomList')
      this.roomList = data.roomList
      console.log(this.roomList)
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
      this.getRoom(row.id)
      console.log(this.temp,'temp')
      this.temp = Object.assign({}, row) // copy obj
      this.value = (this.temp.label || "").split(',')
      console.log(this.value,'value')
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
            else if(value == 'houseUrl') {
              if(_img.width == 150 && _img.height == 112){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.room.img = _res.link
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
        "amt":temp.amt,

      }
      console.log(temp)
      for (const index in arrRules) {
        if(arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined){
          console.log(index,this.rules[index])
          this.$message.error(this.rules[index][0]["message"])
          return 0;
        }
      }
      console.log(temp,'temp')
      console.log(this.value,'value')
      this.listLoading = true
      var loadgeSaid = temp
      // loadgeSaid.lable = temp.lable.join(',')
      loadgeSaid.lable = this.value.join(',')
      console.log(loadgeSaid,'loadgeSaid')
      var myJsonString = JSON.stringify(loadgeSaid);
      const data = await modifyList(myJsonString)
      console.log(data,'data')
      this.listLoading = false
      this.dialogFormVisible = false
      this.getList();
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
    //编辑roomList
    editRoom (row) {
      this.room = Object.assign({}, row)
      this.roomFormVisible = true
    },
    addRoom () {
      this.resetRoom()
      this.roomFormVisible = true
    },
    resetRoom () {
      this.room = {
        id: '',
        houseId: '',
        name: '',
        size: '',
        peopleNum: '',
        breakfast: '',
        wifi: '',
        amt: '',
        img: '',
        roomType: '',
        layout: '',
        bedType: '',
        facility: '',
        RoomDescription: '',
        link: ''
      }
    },
    async submitRoomForm (room) {
      console.log(room,'romm')
      const arrRules = {
        "name":room.name,
        "size":room.size,
        "peopleNum":room.peopleNum,
        "wifi":room.wifi,
        "amt":room.amt,
        "img":room.img,
        "roomType":room.roomType,
        "layout":room.layout,
        "bedType":room.bedType,
        "facility":room.facility,
        "RoomDescription":room.RoomDescription,
        "link":room.link
      }
      for (const index in arrRules) {
        if (arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined) {
          console.log(index,this.roomRules[index])
          this.$message.error(this.roomRules[index][0]["message"])
          return
        }
      }
    }
  },
}
</script>

<style>
/* .edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.img_box{
  height: 100px;
}
.el-upload-dragger{
  width: 200px !important;
  height: 90px !important;
}
.icon{
  margin: 20px 0px 10px 0 !important;
  line-height: 0px !important;
} */
</style>
