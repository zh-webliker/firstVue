  |-- choManage/index.vue
<template>
  <div class="choManage">
    <div class="app-container">
      <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-edit" @click="addCho">
        新增
      </el-button>
      <el-table
        v-if="list"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
      
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
        <el-table-column align="center" label="intro">
          <template slot-scope="scope">
            <span>{{ scope.row.intro }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="listImg">
          <template slot-scope="scope">
             <img :src="scope.row.listImg" width="100" />
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
            <el-button type="primary" size="mini" @click="choUpdate(row)">修改</el-button>
            <el-button
              v-if="row.state!=1"
              size="mini"
              type="success"
              @click="handleModifyStatus(row,1)"
            >发布</el-button>
            <el-button v-if="row.state!=0" size="mini" @click="handleModifyStatus(row,0)">取消</el-button>
            <el-button v-if="row.state!=0" type="success" size="mini" @click="preview(row.id,row.houseId)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- cho表单 -->
      <el-dialog :visible.sync="choFormVisible" width="55%">
        <el-form
          ref="dataForm"
          :model="choInfo"
          :rules="choRules"
          label-position="left"
          label-width="100px"
          style="width: 80%; margin-left:50px;"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="choInfo.name" />
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="choInfo.intro" />
          </el-form-item>
          <el-form-item label="主页图片" prop="listImg">
            <el-upload action="" drag accept="image/jpeg,image/png,image/gif" type="drag" :on-change="onUploadChange('choListImg')" :auto-upload="false" :show-file-list="false" style="float:left">
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
              <img :src="choInfo.listImg">
              <img slot="reference" :src="choInfo.listImg" class="img_box">
            </el-popover>
            <!-- <img :src="choInfo.listImg" class="img_box"> -->
          </el-form-item>
          <el-form-item label="主页名称" prop="listName">
            <el-input v-model="choInfo.listName" />
          </el-form-item>
          <el-form-item label="排序" prop="sortno">
            <el-input v-model="choInfo.sortno" />
          </el-form-item>
          <el-form-item label="详细图片" prop="img">
            <el-upload action="" drag accept="image/jpeg,image/png,image/gif" type="drag" :on-change="onUploadChange('choImg')" :auto-upload="false" :show-file-list="false" style="float:left">
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
              <img :src="choInfo.img">
              <img slot="reference" :src="choInfo.img" class="img_box">
            </el-popover>
            <!-- <img :src="choInfo.img" class="img_box"> -->
          </el-form-item>
          <el-form-item label="住宿名称" prop="stayName">
            <el-input v-model="choInfo.stayName" />
          </el-form-item>
          <el-form-item label="住宿介绍" prop="stayIntro">
            <el-input v-model="choInfo.stayIntro" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="住宿图片" prop="stayImg">
            <el-upload action="" drag accept="image/jpeg,image/png,image/gif" type="drag" :on-change="onUploadChange('choStayImg')" :auto-upload="false" :show-file-list="false" style="float:left">
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
              <img :src="choInfo.stayImg">
              <img slot="reference" :src="choInfo.stayImg" class="img_box">
            </el-popover>
            <!-- <img :src="choInfo.stayImg" class="img_box"> -->
          </el-form-item>
          <el-form-item label="名宿" prop="houseId">
            <el-select v-model="choInfo.houseId" style="width:70%;" placeholder="请选择">
              <el-option v-for="item in houseList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <!-- <div style="margin-top:30px;">
              <el-tag v-for="item of temp.label" :key="item" style="margin-right:15px;">
                {{ item }}
              </el-tag>
            </div> -->
          </el-form-item>
        </el-form>
        <div style="margin: 20px 0 15px 50px;color:rgb(64,158,255)">路线列表</div>
        <el-button class="filter-item" style="margin-bottom: 10px;margin-left:50px" type="primary" icon="el-icon-edit" @click="addDay">
          新增
        </el-button>
        <el-table v-loading="dayLoading" :data="dayList" border fit highlight-current-row style="width: 90%;margin-left:50px">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="days" label="天数"></el-table-column>
          <el-table-column prop="name" label="name"></el-table-column>
          <el-table-column prop="amt" label="价格"></el-table-column>
          <el-table-column prop="catering" label="餐饮"></el-table-column>
          <el-table-column label="Actions" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="{row}" >
              <el-button type="primary" size="mini" @click="dayUpdate(row)">
                修改
              </el-button>
              <el-button size="mini" type="danger" @click="deleteInfos(row.id,'TABLE_Img')">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="choFormVisible = false">
            取消
          </el-button>
          <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"> -->
          <el-button type="primary" @click="submitFormCho(choInfo)">
            保存
          </el-button>
        </div>
      </el-dialog>
      <!-- day表单 -->
      <el-dialog :visible.sync="dayFormVisible">
        <el-form
          ref="dataForm"
          :model="dayInfo"
          :rules="dayRules"
          label-position="left"
          label-width="100px"
          style="width: 80%; margin-left:50px;"
        >
          <el-form-item label="天数" prop="days">
            <el-input v-model="dayInfo.days" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="dayInfo.name" />
          </el-form-item>
          <el-form-item label="价格" prop="amt">
            <el-input v-model="dayInfo.amt" />
          </el-form-item>
          <el-form-item label="路线" prop="line">
            <el-input v-model="dayInfo.line" />
          </el-form-item>
          <el-form-item label="公交路线" prop="busline">
            <el-input v-model="dayInfo.busline" />
          </el-form-item>
          <el-form-item label="餐饮" prop="catering">
            <el-input v-model="dayInfo.catering" />
          </el-form-item>
        </el-form>
        <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-edit" @click="addScenic">
          新增
        </el-button>
        <el-table v-loading="scenicLoading" :data="scenicList" border fit highlight-current-row style="width: 90%">
          
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          
          <el-table-column align="center" label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="100" />
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="{row}" >
              <el-button type="primary" size="mini" @click="scenicUpdate(row)">
                修改
              </el-button>
              <el-button size="mini" type="danger" @click="deleteInfos(row.id,'TABLE_Img')">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dayFormVisible = false">
            取消
          </el-button>
          <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"> -->
          <el-button type="primary" @click="submitFormDay(dayInfo)">
            保存
          </el-button>
        </div>
      </el-dialog>
      <!-- scenic表单 -->
      <el-dialog :visible.sync="scenicFormVisible">
        <el-form
          ref="dataForm"
          :model="scenicInfo"
          :rules="scenicRules"
          label-position="left"
          label-width="100px"
          style="width: 80%; margin-left:50px;"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="scenicInfo.name" />
          </el-form-item>
          <el-form-item label="介绍">
            <el-input v-model="scenicInfo.text" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <el-upload action="" drag accept="image/jpeg,image/png,image/gif" type="drag" :on-change="onUploadChange('scenicImg')" :auto-upload="false" :show-file-list="false" style="float:left">
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
              <img :src="scenicInfo.img">
              <img slot="reference" :src="scenicInfo.img" class="img_box">
            </el-popover>
            <!-- <img :src="scenicInfo.img" class="img_box"> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scenicFormVisible = false">
            取消
          </el-button>
          <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"> -->
          <el-button type="primary" @click="submitFormScenic(scenicInfo)">
            保存
          </el-button>
        </div>
      </el-dialog>
      <el-dialog title="预览" :visible.sync="dialogIframeVisible" width="426px">
        <iframe width='375' height='812' frameborder='0' scrolling='auto' :src="iframeUrl"></iframe>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ElDragSelect from "@/components/DragSelect"; // base on element-ui
import { choList,dayList,setDay,setCho,scenicList,setScenic,fetchList } from "@/api/article";
import { create,fileToImage } from '@/utils/upload-chomoo'
const uploader = create("lodgeSaid1909");

export default {
  name: "InlineEditTable",
  components: { ElDragSelect },
  filters: {
    statusFilter(state) {
      const statusMap = ["info", "success", "danger"];
      return statusMap[state];
    },
    stateFilter(state) {
      const statusMap = ["未发布", "已发布", "删除"];
      return statusMap[state];
    }
  },
  data() {
    return {
      list: null,
      dayList: null,
      scenicList: null,
      listLoading: true,
      dayLoading: false,
      scenicLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      choFormVisible: false,
      choStatus: '',
      choInfo: {
        id: null,
        name: '',
        intro: '',
        listImg: '',
        houseId: '',
        state: '',
        img: '',
        sortno: '',
        listName: '',
        stayName: '',
        stayIntro: '',
        stayImg: ''
      },
      choRules: {
        name: [
            { required: true, message: '请输入精选名称', trigger: 'blur' }
          ],
        intro: [
            { required: true, message: '请输入精选简介', trigger: 'blur' }
          ],
        listImg: [
            { required: true, message: '请输入精选首页图片', trigger: 'blur' }
          ],
        houseId: [
            { required: true, message: '请选择精选名宿', trigger: 'blur' }
          ],
        img: [
            { required: true, message: '请上传精选图片', trigger: 'blur' }
          ],
        sortno: [
            { required: true, message: '请输入精选排行', trigger: 'blur' }
          ],
        listName: [
            { required: true, message: '请输入精选首页名称', trigger: 'blur' }
          ],
        stayName: [
            { required: true, message: '请输入精选住宿名称', trigger: 'blur' }
          ],
        stayIntro: [
            { required: true, message: '请输入精选住宿介绍', trigger: 'blur' }
          ],
        stayImg: [
            { required: true, message: '请上传精选住宿图片', trigger: 'blur' }
          ],
      },
      dayFormVisible: false,
      dayStatus: '',
      dayInfo: {
        id: null,
        choId: '',
        days: '',
        name: '',
        amt: '',
        line: '',
        busline: '',
        catering: ''
      },
      dayRules: {
        name: [
            { required: true, message: '请输入精选每天名称', trigger: 'blur' }
          ],
        days: [
            { required: true, message: '请输入是第几天', trigger: 'blur' }
          ],
        amt: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
        line: [
            { required: true, message: '请输入自驾路线', trigger: 'blur' }
          ],
        catering: [
            { required: true, message: '请输入餐饮', trigger: 'blur' }
          ],
      },
      scenicFormVisible: false,
      scenicStatus: '',
      scenicInfo: {
        id: null,
        dayId: '',
        name: '',
        text: '',
        img: ''
      },
      scenicRules: {
        name: [
            { required: true, message: '请输入景点名称', trigger: 'blur' }
          ],
        text: [
            { required: true, message: '请输入景点描述', trigger: 'blur' }
          ],
        img: [
            { required: true, message: '请上传景点图片', trigger: 'blur' }
          ],
      },
      iframeUrl: '',
      dialogIframeVisible: false,
      houseList:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const data = await choList(this.listQuery);
      const items = data.label;
      this.list = items.map(v => {
        this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title; //  will be used when user click the cancel botton
        return v;
      });
      this.listLoading = false;
    },
    async choUpdate(row) {
      this.choInfo = Object.assign({}, row) // copy obj
      this.choStatus = "update"
      this.choFormVisible = true
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate()
      })
      const data = await dayList(row.id)
      this.dayList = data.day
      this.dayLoading = false
      this.getHouseList()
    },
    async dayUpdate(row) {
      this.dayInfo = Object.assign({}, row) // copy obj
      this.choStatus = "update"
      this.dayFormVisible = true
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate()
      })
      const data = await scenicList(row.id)
      this.scenicList = data.scenic
      this.scenicLoading = false
    },
    async scenicUpdate(row) {
      this.scenicInfo = Object.assign({}, row) // copy obj
      this.scenicFormVisible = true
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate()
      });
    },
    addCho () {
      this.resetCho()
      this.dayList = null
      this.choFormVisible = true
      this.getHouseList()
    },
    addDay () {
      this.resetDay()
      this.scenicList = null
      this.dayFormVisible = true
    },
    addScenic () {
      this.resetScenic()
      this.scenicFormVisible = true
    },
    resetCho () {
      this.choInfo = {
        id: null,
        name: '',
        intro: '',
        listImg: '',
        houseId: '',
        state: '',
        img: '',
        sortno: '',
        listName: '',
        stayName: '',
        stayIntro: '',
        stayImg: ''
      }
    },
    async submitFormCho(choInfo) {
      const arrRules = {
        "name":choInfo.name,
        "listImg":choInfo.listImg,
        "houseId":choInfo.houseId,
        "img":choInfo.img,
        "sortno":choInfo.sortno,
        "listName":choInfo.listName,
        "stayName":choInfo.stayName,
        "stayIntro":choInfo.stayIntro,
        "stayImg":choInfo.stayImg,
        "sortno":choInfo.sortno
      }
      for (const index in arrRules) {
        if(arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined){
          this.$message.error(this.choRules[index][0]["message"])
          return 0;
        }
      }
      this.listLoading = true
      const data = await setCho(choInfo)
      this.listLoading = false
      this.choFormVisible = false
      this.getList()
    },
    async submitFormDay(dayInfo) {
      const arrRules = {
        "days":dayInfo.days,
        "name":dayInfo.name,
        "amt":dayInfo.amt,
        "line":dayInfo.line,
        "catering":dayInfo.catering
      }
      for (const index in arrRules) {
        if(arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined){
          this.$message.error(this.dayRules[index][0]["message"])
          return 0;
        }
      }
      this.dayLoading = true
      const data = await setDay(dayInfo)
      this.dayLoading = false
      this.dayFormVisible = false
      this.choUpdate(this.choInfo);
    },
    async submitFormScenic(scenicInfo) {
      const arrRules = {
        "name":scenicInfo.name,
        "text":scenicInfo.text,
        "img":scenicInfo.img,
      }
      for (const index in arrRules) {
        if(arrRules[index] == '' || arrRules[index] == [] || arrRules[index] == null || arrRules[index] == undefined){
          this.$message.error(this.scenicRules[index][0]["message"])
          return 0;
        }
      }
      this.scenicLoading = true
      const data = await setScenic(scenicInfo)
      this.scenicLoading = false
      this.scenicFormVisible = false
      this.dayUpdate(this.dayInfo);
    },
    resetDay () {
      this.dayInfo = {
        id: null,
        choId: this.choInfo.id,
        days: '',
        name: '',
        amt: '',
        line: '',
        busline: '',
        catering: ''
      }
    },
    resetScenic () {
      this.scenicInfo = {
        id: null,
        dayId: this.dayInfo.id,
        name: '',
        text: '',
        img: ''
      }
    },
    async handleModifyStatus (row, status) {
      const data = {
        'id':row.id,
        'state':status
        }
      const setRes = await setCho(data)
      this.getList();
    },
    preview (id,houseId) {
      console.log(id,"preview")
      this.dialogIframeVisible = true
      this.iframeUrl = 'https://h5.qiaomukeji.com/201909/HomeMap/mapDome/v13/strategy.html?searchText='+id+'&houseId='+houseId
    },
    //图片提示
    messageText(width,height) {
        if(width && height){
          this.$message.error(`请上传${width}px*${height}px的图片`)
        }else{
          this.$message.error(`请上传宽为${width}px的图片`)
        }
    },
    async getHouseList() {
      const data = await fetchList(this.listQuery);
      for(let i = 0;i< data.house.length;i++){
        if(data.house[i]["state"]==1){
          this.houseList.push(data.house[i])
        }
      }
      console.log(this.houseList)
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
            if(value == 'choListImg') {
              if(_img.width == 703 && _img.height == 325){
                uploader.uploadFile(file.raw, name, function (_res) {
                  that.choInfo.listImg = _res.link
                })
              }else{
                that.messageText(_img.width,_img.height)
              }
            }
            if(value == 'choImg') {
              if(_img.width == 767 && _img.height == 414){
                uploader.uploadFile(file.raw, name, function (_res) {
                  that.choInfo.img = _res.link
                })
              }else{
                that.messageText(_img.width,_img.height)
              }
            }
            if(value == 'choStayImg') {
              if(_img.width == 672 && _img.height == 310){
                uploader.uploadFile(file.raw, name, function (_res) {
                  that.choInfo.stayImg = _res.link
                })
              }else{
                that.messageText(_img.width,_img.height)
              }
            }
            if(value == 'scenicImg') {
              if(_img.width == 672 && _img.height == 310){
                uploader.uploadFile(file.raw, name, function (_res) {
                  that.scenicInfo.img = _res.link
                })
              }else{
                that.messageText(_img.width,_img.height)
              }
            }
        }) 
      }
    }
  }
};
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
</style>
