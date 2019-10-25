/* eslint-disable camelcase */
import axios from 'axios'
var COS = require('cos-js-sdk-v5')
var config = {
  Bucket: 'qiaomuh5-1252942291',
  Region: 'ap-shanghai',
  host: 'https://res3.qiaomukeji.com/'
}
let model = null
let UploaderModel = null
export function create (_proId) {
  if (!model) {
    model = new UploaderModel(_proId)
  }
  return model
};

(function () {
  function Uploader (_proId) {
    this.m_proId = _proId
  }

  var p = Uploader.prototype

  p.onProgress = function (progressData) {
    if (this.m_onProgress) this.m_onProgress(progressData)
  }

  p.onComplete = function (err, data) {
    if (err) {
      console.log('upload complete: ', err)
    } else {
      data.link = config.host + data.Key
      console.log('upload success link: ', data.link)
      // data.requestId = this.m_requestId;
    }

    if (this.m_onComplete) this.m_onComplete(err || data)
  }

  p.uploadFile = function (file, _fileName, onComplete, onProgress) {
    if (!file) return
    this.m_onProgress = onProgress
    this.m_onComplete = onComplete

    var ext = file.name.substring(file.name.lastIndexOf('.'))
    var key = getKey(ext, this.m_proId, _fileName)
    var cos = new COS({
      getAuthorization: getAuthorization
    })

    var t_params = {}
    t_params['Bucket'] = config.Bucket
    t_params['Region'] = config.Region
    t_params['Key'] = key
    t_params['Body'] = file
    t_params['onProgress'] = bind(this, this.onProgress)
    t_params['TaskReady'] = function (tid) {
      console.log('TaskReady ', tid)
    }
    t_params['onHashProgress'] = function (progressData) {
      console.log('onHashProgress ', progressData)
    }

    cos.sliceUploadFile(t_params, bind(this, this.onComplete))
  }

  UploaderModel = Uploader
}())

function getAuthorization (options, callback) {
  axios.get('https://ws.qiaomukeji.com/upload/auth')
    .then(function (response) {
      response = response.data
      if (response['code'] !== 0) {
        alert(response['err'])
        return
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback({
        TmpSecretId: response['data']['credentials'].tmpSecretId,
        TmpSecretKey: response['data']['credentials'].tmpSecretKey,
        XCosSecurityToken: response['data']['credentials'].sessionToken,
        ExpiredTime: response['data'].expiredTime
      })
    })
    .catch(function (error) {
      console.log(error)
    })
//   $.get('https://ws.qiaomukeji.com/upload/auth', function (_res) {
//     if (_res['code'] !== 0) {
//       alert(_res['err'])
//       return
//     }

//     // eslint-disable-next-line standard/no-callback-literal
//     callback({
//       TmpSecretId: _res['data']['credentials'].tmpSecretId,
//       TmpSecretKey: _res['data']['credentials'].tmpSecretKey,
//       XCosSecurityToken: _res['data']['credentials'].sessionToken,
//       ExpiredTime: _res['data'].expiredTime
//     })
//   })
}

function bind (_target, _func) {
  return function () {
    return _func.apply(_target, arguments)
  }
}

function getKey (ext, _proId, _fileName) {
  var t_path = 'upload/' + _proId + '/' + ext + '/'
  if (_fileName) t_path += _fileName + ext
  else t_path += Date.now() + Math.floor(Math.random() * 999999) + ext
  return t_path
}
export function fileToImage (file, _callback) {
  var reader = new FileReader()
  reader.onload = function (e) {
    var data = e.target.result
    // 加载图片获取图片真实宽度和高度
    var image = new Image()
    image.onload = function () {
      _callback(image)
    }
    image.src = data
  }
  reader.readAsDataURL(file)
}
