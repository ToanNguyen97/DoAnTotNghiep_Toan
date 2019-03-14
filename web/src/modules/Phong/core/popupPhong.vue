<template>
    <v-dialog :value="value" max-width="1000px">
      <v-btn  slot="activator" color="primary" dark class="mt-3 hidden-xs-only">Thêm Nhanh</v-btn>
      <v-btn  slot="activator" fab small  color="primary" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>add_circle_outline</v-icon></v-btn>
      <v-card>         
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout justify-center>
              <h1 class="mb-2 danhsachPT">Thông tin phòng trọ</h1>    
            </v-layout>     
            <v-form  ref="form" v-model="valid" lazy-validation>
              <v-layout row wrap justify-space-between>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="formData.tenPhong"  :rules="tenPhongRules" :counter="20" label="Tên Phòng Trọ"></v-text-field>
                </v-flex>   
                <v-flex xs12 sm6 md4 v-if="phongSelect && phongSelect._id">
                  <v-select
                    v-model="formData.khuPhongId"
                    :items="dsKhuPhong"
                    label="Khu Phòng"
                    item-text="tenKhuPhong"
                    item-value="_id"
                  ></v-select>
                </v-flex>   
                <v-flex xs12 sm6 md4 v-else>
                  <v-select
                    v-model="formData.khuPhongId"
                    :items="dsKhuPhong"
                    label="Khu Phòng"
                    item-text="tenKhuPhong"
                    item-value="_id"
                  ></v-select>
                </v-flex>   
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-model="formData.loaiPhongId"
                    :items="dsLoaiPhong"
                    label="Loại Phòng"
                    item-text="tenLoaiPhong"
                    item-value="_id"
                  ></v-select>
                </v-flex>   
              </v-layout>
              <v-layout row wrap justify-space-between>   
                <v-flex shrink  size="10px">
                  <div>
                    <input hidden type="file" style="display: none" ref="file" accept="image/*"  @change="choosedFile">
                    <v-btn  color="success"  @click="chooseFIle">Ảnh Chính</v-btn>
                  </div>
                  <div v-if="phongSelect && phongSelect._id">
                    <img :src="`//localhost:3003/image/${formData.anhChinh}`" height="144">
                  </div>
                  <div v-else>
                    <img :src="formData.anhChinh" height="144">
                  </div>
                </v-flex>
                <v-flex grow size="10px">
                  <div>
                    <input hidden type="file" style="display: none" ref="multifile" multiple accept="image/*"  @change="choosedFileMulti">
                    <v-btn color="success" @click="chooseFIleMulti">Ảnh Chi Tiết</v-btn>
                  </div>
                   <div v-if="phongSelect && phongSelect._id">
                    <img v-for="(item,index) in formData.anhChiTiet" :key="index" :src="`//localhost:3003/image/${item}`" height="144">
                  </div>
                  <div v-else>
                    <img v-for="(item,index) in formData.anhChiTiet" :key="index" style="padding-right:5px;" :src="item" height="144">
                  </div>
                </v-flex>       
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                  <v-textarea
                    height="70"
                    outline
                    label="mô tả phòng trọ"
                    v-model="formData.moTa"
                  ></v-textarea>
                </v-flex>                                                                                     
                <v-flex xs6 sm6 md2>
                    <v-text-field
                      height="70"
                      type="number"
                      readonly
                      label="Số điện"
                      v-model="formData.soDien"
                      outline
                    ></v-text-field>
                </v-flex>                                                                                     
                <v-flex xs6 sm6 md2>
                    <v-text-field
                      height="70"
                      readonly
                      type="number"
                      label="Số nước"
                      v-model="formData.soNuoc"
                      outline
                    ></v-text-field>
                </v-flex> 
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    height="70"
                    type="number"
                    label="Giá phòng"
                    v-model="formData.giaPhong"
                    outline
                  ></v-text-field>
                </v-flex>                                                                                        
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6 sm6 md2>
                  <v-checkbox
                    v-model="formData.dKMang"
                    label="Đăng ký mạng"
                    color="success"
                    :value="false"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs6 sm6 md2 shrink>
                  <v-checkbox
                    v-model="formData.homeFlag"
                    label="Đăng trang chủ"
                    color="success"
                    :value="false"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs6 sm6 md2>
                  <v-checkbox
                    v-model="formData.status"
                    label="Kích hoạt"
                    color="success"
                    :value="false"
                    hide-details
                  ></v-checkbox>
                </v-flex>
                <v-flex xs6 sm6 md2>
                  <v-checkbox
                    v-model="formData.hotFlag"
                    label="Phòng hot"
                    color="success"
                    :value="false"
                    hide-details
                  ></v-checkbox>
                </v-flex>
              </v-layout>                                                                          
            </v-form>                                                       
            <v-layout row wrap mt-2 >
                <v-flex xs12 sm12 md12 style="display: flex !important;justify-content: center !important;">                   
                  <v-btn color="blue darken-1" dark @click="ThemPhong" >Xác nhận</v-btn>
                  <v-btn color="yellow darken-1" dark @click="Huy"  >Hủy</v-btn>
                </v-flex>
            </v-layout>  
          </v-container>
        </v-card-text>          
      </v-card>
    </v-dialog>
</template>

<script>
import _ from 'lodash'

export default {
  props:{
    phongSelect: {
      type: Object
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: true,
      formData: {},
      // tenPhong: '',
      // khuPhongId: '',
      // loaiPhongId: '',
      // anhChinh: '',
      anhChiTiet: [],
      // moTa: '',
       anhChiTietName:[],
      // image: '',
      // soDien: 0,
      // soNuoc: 0,
      // giaPhong: 0,
      // dKMang: false,
      // status: false,
      // homeFlag: false,
      // hotFlag: false,
      tenPhongRules: [
        v => !!v || 'Không được để trống',
        v => (v && v.length <= 20) || 'Tên tối đa 20 ký tự'
      ],
      uploadingPhoto: false
    }
  },
  created() {
    this.$store.dispatch('getKhuPhongs')
    this.$store.dispatch('getLoaiPhongs')
    this.$store.dispatch('getTinhTrangPhongs')
  },
  computed: {
    dsKhuPhong () {
      return this.$store.state.phong.dsKhuPhong
    },
    dsLoaiPhong () {
      return this.$store.state.phong.dsLoaiPhong
    },
    dsTinhTrangPhong () {
      return this.$store.state.phong.dsTinhTrangPhong
    }
  },
  methods: {
    Huy () {
      this.$emit('input', false)
    },
    choosedFile () {
      const files = this.$refs['file'].files
      if(files[0].name.lastIndexOf('.') <=0) {
        return alert('Please add avalid file')
      }
      let fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
          this.formData.anhChinh = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0].name
    },
    chooseFIle () {
      this.$refs['file'].click()
    },
    chooseFIleMulti () {
      this.$refs['multifile'].click()
      console.log('chon multi file ne')
    },
    choosedFileMulti () {
       const files = this.$refs['multifile'].files
       if(!files && !files.length)
       {
         alert('Please choose file')
       }
       for(let i=0; i< files.length;i++){
          this.anhChiTietName.push(files[i].name)
       }
       for(let i=0; i < files.length; i++)
       {
          let fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
          this.anhChiTiet.push(fileReader.result)
          })
          fileReader.readAsDataURL(files[i])
       }
    },
    ThemPhong () {
      let anhChinh = {name: this.image, file64: this.formData.anhChinh}
      let anhChiTiet = {name: this.anhChiTietName, file64: this.anhChiTiet}
      this.formData.anhChinh = anhChinh
      this.formData.anhChiTiet = anhChiTiet
      this.formData.tinhTrangPhongID = "5c88669ffcd238559ca25d13"
      // let payload = {tenPhong: this.tenPhong, anhChinh: anhChinh, anhChiTiet: anhChiTiet, moTa: this.moTa, soDien: this.soDien, soNuoc: this.soNuoc, giaPhong: this.giaPhong, dKMang: this.dKMang,
      // status: this.status, homeFlag: this.homeFlag, hotFlag: this.hotFlag, tinhTrangPhongID: "5c88669ffcd238559ca25d13", khuPhongID: this.khuPhongId, loaiPhongID: this.loaiPhongId}
      this.$store.dispatch('themPhong', this.formData) 
    }
  },
  watch: {
    value (v) {
      if (v) {
        if (this.phongSelect && this.phongSelect._id) {
          this.formData = _.cloneDeep(this.phongSelect)
        }
        else
        {
          this.formData = {}
          console.log('rong: ', this.formData)
        }
      }
    }
  },
}
</script>

