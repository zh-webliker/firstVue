  |-- activeManage/index.vue
<template>
  <div class="activeManage ">
    <div class="app-container">
      <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
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

        <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              修改
            </el-button>
            <el-button v-if="row.state!=1" size="mini" type="success" @click="handleModifyStatus(row,1)">
              发布
            </el-button>
            <el-button v-if="row.state!=0" size="mini" @click="handleModifyStatus(row,0)">
              取消
            </el-button>
            <el-button  v-if="row.state!=0" type="success" @click="preview(row.id)" size="mini">
            预览
          </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="65%">
        <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
          <el-form-item label="id" prop="name" hidden>
            <el-input v-model="temp.id" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="标签" prop="label">
            <el-select v-model="temp.label" style="width:70%;" multiple placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <div style="margin-top:30px;">
              <el-tag v-for="item of temp.label" :key="item" style="margin-right:15px;">
                {{ item }}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="头图" prop="area">
            <el-upload
              action=""
              accept="image/jpeg,image/png"
              type="drag"
              drag
              :on-change="onUploadChange('topUrl')"
              :auto-upload="false"
              :show-file-list="false"
              style="float:left"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.area">
              <img slot="reference" :src="temp.area" class="img_box">
            </el-popover>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="temp.intro" />
          </el-form-item>
          <el-form-item label="介绍">
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
              style="float:left"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.addressImg">
              <img slot="reference" :src="temp.addressImg" class="img_box">
            </el-popover>
            <!-- <img :src="temp.addressImg" class="img_box"> -->
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
              style="float:left"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.enterTime">
              <img slot="reference" :src="temp.enterTime" class="img_box">
            </el-popover>
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
              style="float:left"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.outTime">
              <img slot="reference" :src="temp.outTime" class="img_box">
            </el-popover>
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
              style="float:left"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.listImg">
              <img slot="reference" :src="temp.listImg" class="img_box">
            </el-popover>
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
              style="float:left"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.recomImg">
              <img slot="reference" :src="temp.recomImg" class="img_box">
            </el-popover>
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
              style="float:left"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.moreImg">
              <img slot="reference" :src="temp.moreImg" class="img_box">
            </el-popover>
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
              style="float:left">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="temp.hotImg">
              <img slot="reference" :src="temp.hotImg" class="img_box">
            </el-popover>
          </el-form-item>
          <el-form-item label="热门名称" prop="hotName">
            <el-input v-model="temp.hotName" />
          </el-form-item>
        </el-form>
        <div class="filter-container">
          <div style="margin: 20px 0 0 50px;color:rgb(64,158,255)">房型须知列表</div>
          <el-button class="filter-item" style="margin: 5px 0 10px 50px" type="primary" icon="el-icon-edit" @click="addRoom">
            添加
          </el-button>
        </div>
        <el-table v-loading="listLoading" :data="roomList" border fit highlight-current-row style="width: 90%;margin-left:50px">
          <el-table-column prop="id" label="房间id"></el-table-column>
          <el-table-column prop="name" label="房间名字"></el-table-column>
          <el-table-column prop="size" label="床型"></el-table-column>
          <el-table-column prop="peopleNum" label="可住人数"></el-table-column>
          <el-table-column prop="wifi" label="有无wifi"></el-table-column>
          <el-table-column prop="amt" label="价格"></el-table-column>
          <el-table-column label="Actions" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="{row}" >
              <el-button type="primary" size="mini" @click="editRoom(row)">
                修改
              </el-button>
              <el-button v-if="row.state!=0" size="mini">
                取消
              </el-button>
              <el-button v-if="row.state!=2" size="mini" type="danger" @click="deleteInfos(row.id,'TABLE_Room')">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 图库 -->
        <div class="filter-container">
          <div style="margin: 20px 0 0 50px;color:rgb(64,158,255)">图库图片列表</div>
          <el-button class="filter-item" style="margin: 5px 0 10px 50px" type="primary" icon="el-icon-edit" @click="addImg">
            添加
          </el-button>
        </div>
        <el-table v-loading="listLoading" :data="imgList" border fit highlight-current-row style="width: 90%;margin-left:50px">
          <el-table-column prop="houseId" label="名宿id" width="80"></el-table-column>
          <el-table-column prop="id" label="房间id" width="80"></el-table-column>
          <el-table-column prop="name" label="name" width="80"></el-table-column>
          <el-table-column prop="sortno" label="排序" width="80"></el-table-column>
          <el-table-column prop="img" label="图片地址" width="80">
            <template  slot-scope="scope">            
              <img :src="scope.row.img"  height="50" />
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="{row}" >
              <el-button type="primary" size="mini" @click="editImg(row)">
                修改
              </el-button>
              <el-button v-if="row.state!=2" size="mini" type="danger" @click="deleteInfos(row.id,'TABLE_Img')">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"> -->
          <el-button type="primary" @click="submitForm(temp)">
            保存
          </el-button>
        </div>
      </el-dialog>

      <!-- 编辑名宿推荐 -->
      <el-dialog :visible.sync="roomFormVisible" width="80%">
        <el-form ref="dataForm" :model="room" :rules="roomRules" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
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
            <el-input v-model="room.RoomDescription" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="room.link" />
          </el-form-item>
          <el-form-item label="房间图片" prop="img" class="total_box">
             <el-upload
              action=""
              drag
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              :on-change="onUploadChange('houseUrl')"
              :auto-upload="false"
              :show-file-list="false"
              style="float:left">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="room.img">
              <img slot="reference" :src="room.img" class="img_box">
            </el-popover>
            <!-- <img :src="room.img" class="img_box"> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roomFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submitRoom(room)">
            保存
          </el-button>
        </div>
      </el-dialog>
      <el-dialog title="预览" :visible.sync="dialogIframeVisible" width="426px">
        <iframe width='375' height='812' frameborder='0' scrolling='auto' :src="iframeUrl"></iframe>
      </el-dialog>
      <!-- 编辑图库 -->
      <el-dialog :visible.sync="imgFormVisible" width="80%">
        <el-form ref="dataForm" :model="img" :rules="imgRules" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
          <el-form-item label="名宿id" prop="houseId" hidden>
            <el-input v-model="img.houseId" hidden/>
          </el-form-item>
          <el-form-item label="房间id" prop="id" hidden>
            <el-input v-model="img.id" hidden/>
          </el-form-item>
          <el-form-item label="name" prop="name">
            <el-input v-model="img.name" />
          </el-form-item>
          <el-form-item label="排序" prop="sortno">
            <el-input v-model="img.sortno" />
          </el-form-item>
          <el-form-item label="图片地址" prop="img" class="total_box">
            <el-upload
              action=""
              drag
              accept="image/jpeg,image/png,image/gif"
              type="drag"
              :on-change="onUploadChange('img')"
              :auto-upload="false"
              :show-file-list="false"
              style="float:left">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过2M</div>
            </el-upload>
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="img.img">
              <img slot="reference" :src="img.img" class="img_box">
            </el-popover>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submitImg(img)">
            保存
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { fetchList,modifyList,getRoomList,setRoom,deleteInfo,setImg } from '@/api/article'
import { create,fileToImage } from '@/utils/upload-chomoo'
const uploader = create('lodgeSaid1909')
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
      imgList:null,
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
        moreImg:''//查看更多图
      },
      room:{
        id: 2,
        houseId: 1,
        name: '',
        size: '',
        peopleNum: '',
        wifi: '',
        amt: '',
        img: '',
        roomType: '',
        layout: '',
        bedType: '',
        facility: '',
        RoomDescription: '',
        link: ''
      },
      img:{
        houseId:'',
        id:'',
        name:'',
        img:'',
        sortno:''
      },
      imgFormVisible:false,
      roomFormVisible:false,
      dialogFormVisible: false,
      dialogIframeVisible: false,
      iframeUrl: '',
      dialogPvVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新建'
      },
      value: [],
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
        value: '氧吧民宿',
        label: '氧吧民宿'
      }, {
        value: '百花人家',
        label: '百花人家'
      }, {
        value: '京西古道',
        label: '京西古道'
      }, {
        value: '民宿主故事',
        label: '民宿主故事'
      }, {
        value: '亲近自然',
        label: '亲近自然'
      }, {
        value: '惬意生活',
        label: '惬意生活'
      }, {
        value: '轰趴聚会',
        label: '轰趴聚会'
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
            { required: true, message: '请输入介绍', trigger: 'blur' }
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
        // facility: [
        //   { required: true, message: '请输入设施', trigger: 'blur' }
        // ],
        RoomDescription: [
          { required: true, message: '请输入房间描述', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入跳转的外链', trigger: 'blur' }
        ]
      },
      imgRules:{
        name: [
          { required: true, message: '请输入图片所属区域', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        sortno:[
          {required:true,message:'请填写排名',trigger:'blur'}
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
      this.imgList = data.imgList
      console.log(this.roomList)
    },
    handleUpdate (row) {
      console.log(this.temp,'temp')
      this.temp = Object.assign({}, row) // copy obj
      this.temp.label = (this.temp.label || "").split(',')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getRoom(row.id)
    },
    async handleModifyStatus (row, status) {
      const data = {
        'id':row.id,
        'state':status
        }
      const setRes = await modifyList(data)
      this.getList();
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
                  console.log(_res.link,'res')
                  that.room.img = _res.link
                })
              }
              else{
                that.messageText(_img.width)
              }
            }
            else if(value == 'img') {
              if(_img.width == 710){
                uploader.uploadFile(file.raw, name, function (_res) {
                  console.log(_res,'res')
                  that.img.img = _res.link
                })
              }
              else{
                that.messageText(_img.width)
              }
            }
        }) 
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
      for (const index in arrRules) {
        if(arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined){
          console.log(index,this.rules[index])
          this.$message.error(this.rules[index][0]["message"])
          return 0;
        }
      }
      console.log(temp,'temp')
      this.listLoading = true
      var loadgeSaid = temp
      loadgeSaid.label = temp.label.join(',')
      const data = await modifyList(loadgeSaid)
      this.listLoading = false
      this.dialogFormVisible = false
      this.getList();
    },
    //添加
    handleCreate () {
      this.resetTemp()
      this.value = []
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
        moreImg:''//查看更多图
      }
    },
    preview (id) {
      console.log(id,"preview")
      this.dialogIframeVisible = true
      this.iframeUrl = 'https://h5.qiaomukeji.com/201909/HomeMap/mapDome/v13/details_1.html?searchText='+id
    },
    //编辑roomList
    editRoom (row) {
      this.room = Object.assign({}, row)
      this.roomFormVisible = true
    },
    addRoom () {
      this.resetRoom()
      console.log(this.room)
      this.roomFormVisible = true
    },
    resetRoom () {
      this.room = {
        id: '',
        houseId: this.temp.id,
        name: '',
        size: '',
        peopleNum: '',
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
      this.roomList = ''
      this.imgList = ''
    },
    //提交表格
    async submitRoom (room) {
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
      this.listLoading = true
      const data = await setRoom(room)
      this.listLoading = false
      this.roomFormVisible = false
      this.getRoom(this.temp.id)
    },
    deleteInfos (id,tableValue) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(async () => {
        const data = {
          'id':id,
          'table':tableValue
        }
        const delRes = await deleteInfo(data)
        this.getRoom(this.temp.id)
          this.$message({
            type:'success',
            message:'成功'
        })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'取消'
        })
      })
      // const data = {
      //   'id':id,
      //   'table':tableValue
      // }
      // const delRes = await deleteInfo(data)
      // this.getRoom(this.temp.id)
    },
    //编辑图库
    editImg (row) {
      this.imgFormVisible = true
      this.img = Object.assign({}, row)
    },
    addImg () {
      this.reserImg()
      this.imgFormVisible = true
    },
    deleteImg () {
    },
    async submitImg (img) {
      console.log(img,'img')
      this.listLoading = true
      const data = await setImg(img)
      this.listLoading = false
      this.imgFormVisible = false
      this.getRoom(this.temp.id)
    },
    reserImg () {
      this.img = {
        houseId:this.temp.id,
        id:'',
        name:'',
        img:'',
        sortno:''
      }
    }
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
  height: 117px;
  padding-left: 20px;
}
.el-upload-dragger{
  width: 200px !important;
  height: 90px !important;
}
.upload_box {
  width: 100px !important;
  height: 90px !important;
}
</style>
