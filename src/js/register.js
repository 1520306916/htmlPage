function getFormData(formData) {
  var formArray = $("#form").serializeArray();
  for (var i = 0; i < formArray.length; i++) {
    var data = formArray[i];
    if (data.name == 'stuffList' && formData[data.name] != undefined) {
      var tempVal = formData[data.name];
      if (tempVal instanceof Array) {
        tempVal.push(data.value);
      } else {
        var array = [];
        array.push(formData[data.name]);
        array.push(data.value);
        formData[data.name] = array;
      }
    } else {
      formData[data.name] = data.value;
    }
  }
  return formData;
}

function my_validate(el) {
  var vali = $("#form").validate({
    errorPlacement: function (error, element) {
      if (
        element[0].name == "stuffList"
      ) {
        error.appendTo(element.parent().parent().parent());
      } else if (
        element[0].name == "idCardZM" ||
        element[0].name == "idCardFM" ||
        element[0].name == "bankCard" ||
        element[0].name == "sfzStartTime" ||
        element[0].name == "sfzEndTime" ||
        element[0].name == "yyzz" ||
        element[0].name == "khxk" ||
        element[0].name == "scxk" || 
        element[0].name == "dlysjy" || 
        element[0].name == "llhwys" ||
        element[0].name == "yyz" ||
        element[0].name == "xsz" ||
        element[0].name == "cyzgz" || 
        element[0].type == "file"
      ) {
        error.appendTo(element.parent().parent().parent().parent());
      } else if (
        element[0].name == "province" ||
        element[0].name == "city" ||
        element[0].name == "country"
      ) {
        error.appendTo(element.parent().parent());
      } else {
        error.appendTo(element.parent());
      }

    },
    rules: {
      name: {
        required: true,
        minlength: 2,

      },
      province: {
        required: true,
      },
      city: {
        required: true,
      },
      country: {
        required: true,
      },
      stuffList: {
        required: true,
      },
      userName: {
        required: true,
        stringCheck: true,
        byteRangeLength: [6, 15],
        remote: {
          url: "/api/supply_chain/frontend/anonymous/user/checkPhoneOrIdCardOrUserName",
          dataType: "json",
          data: {
            type: 1,
          }
        },
      },
      password: {
        required: true,
        minlength: 8,
      },
      rePassword: {
        required: true,
        equalTo: '#password',
      },
      legalName: {
        required: true,
      },
      legalPhone: {
        required: true,
        isPhone: true,
      },
      contact: {
        required: true,
      },
      contactPhone: {
        required: true,
      },
      contactIdCard: {
        required: true,
      },
      contactEmail: {
        required: true,
        email: true,
      },
      identifyNumber: {
        required: true,
      },

      idCardZM: {
        required: true,
      },
      idCardFM: {
        required: true,
      },
      bankCard: {
        required: true,
      },
      sfzStartTime: {
        required: true,
      },
      sfzEndTime: {
        required: true,
      },
      yyzz: {
        required: true,
      },
      yyzzStartTime: {
        required: true,
      },
      yyzzEndTime: {
        required: true,
      },
      khxk: {
        required: true,
      },
      scxk: {
        required: true,
      },
      dlysjy: {
        required: true,
      },
      dlysjyStartTime: {
        required: true,
      },
      dlysjyEndTime: {
        required: true,
      },
      llhwys: {
        required: true,
      },
      llhwysStartTime: {
        required: true,
      },
      llhwysEndTime: {
        required: true,
      },
      yyz: {
        required: true,
      },
      yyzStartTime: {
        required: true,
      },
      yyzEndTime: {
        required: true,
      },
      xsz: {
        required: true,
      },
      cyzgz: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "请输入名称",
      },
      province: {
        required: "请选择省份",
      },
      city: {
        required: "请选择城市",
      },
      country: {
        required: "请选择县区",
      },
      stuffList: {
        required: "请选择原料类别",
      },
      userName: {
        required: "请输入用户名",
        remote: "用户名已存在",
      },
      password: {
        required: "请输入密码",
      },
      rePassword: {
        required: "请再次输入密码",
        equalTo: '两次密码输入不一致',
      },
      legalName: {
        required: "请输入姓名",
      },
      legalPhone: {
        required: "请输入电话",
      },
      contact: {
        required: "请输入联系人名称",
      },
      contactPhone: {
        required: "请输入联系人电话",
      },
      contactIdCard: {
        required: "请输入联系人身份证",
      },
      contactEmail: {
        required: "请输入联系人邮箱",
      },
      identifyNumber: {
        required: "请输入证件号码",
      },
      idCardZM: {
        required: "请上传身份证正面照片",
      },
      idCardFM: {
        required: "请上传身份证反面照片",

      },
      bankCard: {
        required: "请上传银行卡照片",
      },
      sfzStartTime: {
        required: "请输入证件有效日期",
      },
      sfzEndTime: {
        required: "请输入证件有效日期",
      },
      yyzz: {
        required: "请上传营业执照照片",
      },
      yyzzStartTime: {
        required: "请输入证件有效日期",
      },
      yyzzEndTime: {
        required: "请输入证件有效日期",
      },
      khxk: {
        required: "请上传开户许可证照片",
      },
      scxk: {
        required: "请上传生产许可证照片",
      },
      dlysjy: {
        required: "请上传道路运输经营许可证",
      },
      dlysjyStartTime: {
        required: "请输入证件有效日期",
      },
      dlysjyEndTime: {
        required: "请输入证件有效日期",
      },
      llhwys: {
        required: "陆路货物运输保险单",
      },
      llhwysStartTime: {
        required: "请输入证件有效日期",
      },
      llhwysEndTime: {
        required: "请输入证件有效日期",
      },
      yyz: {
        required: "请上传营运证照片",
      },
      yyzStartTime: {
        required: "请输入证件有效日期",
      },
      yyzEndTime: {
        required: "请输入证件有效日期",
      },
      xsz: {
        required: "请上传行驶证照片",
      },
      cyzgz: {
        required: "请上传从业资格证照片",
      },
    }
  })
  if (el) {
    return vali.element(el);
  } else {
    return $("#form").valid();
  }
}

// 中文字两个字节       
jQuery.validator.addMethod("byteRangeLength", function (value, element, param) {
  var length = value.length;
  for (var i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 127) {
      length++;
    }
  }
  return this.optional(element) || (length >= param[0] && length <= param[1]);
}, "请确保输入的值在6-15个字节之间(一个中文字算2个字节)");

// 字符验证       
jQuery.validator.addMethod("stringCheck", function (value, element) {
  return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "只能包括中文字、英文字母、数字和下划线");

jQuery.validator.addMethod("isPhone", function (value, element) {
  var length = value.length;
  var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  var tel = /^\d{3,4}-?\d{7,9}$/;
  if (/-/.test(value)) {
    return this.optional(element) || tel.test(value);
  } else {
    return this.optional(element) || (length == 11 && mobile.test(value));
  }
}, "请输入正确的电话号码");

function submit(formData) {
  var userInfo = {
    username: formData.userName,
    password: formData.password,
    name: formData.contact,
    telPhone: formData.contactPhone,
    email: formData.contactEmail,
    sex: formData.contactSex,
    idCard: formData.contactIdCard,
  };
  // 供应物料类型
  var stuffList = formData.stuffList;
  if (stuffList != undefined) {
    if (stuffList instanceof Array) {
      var array = [];
      for (var i = 0; i < stuffList.length; i++) {
        array.push({
          typeId: stuffList[i],
          typeName: stuffList[i],
        });
      }
      stuffList = array;
    } else {
      stuffList = [{
        typeId: stuffList,
        typeName: stuffList,
      }];
    };
  }

  //证件信息
  var registerType = formData.type;
  var certList = [];
  if (registerType == 1) { //农户
    var zj0 = { // 身份证正面
      type: 0,
      startTime: formData.sfzStartTime,
      endTime: formData.sfzEndTime,
      attachements: [formData.idCardZM],
    };
    certList.push(zj0);
    var zj1 = { // 身份证反面
      type: 1,
      attachements: [formData.idCardFM],
    };
    certList.push(zj1);
    var yhk1 = { // 银行卡
      type: 2,
      attachements: [formData.bankCard],
    };
    certList.push(yhk1);
  } else if (registerType == 2) {
    var zj3 = { // 营业执照
      type: 3,
      startTime: formData.yyzzStartTime,
      endTime: formData.yyzzEndTime,
      attachements: [formData.yyzz],
    };
    certList.push(zj3);
    var zj4 = { // 开户许可
      type: 4,
      attachements: [formData.khxk],
    };
    certList.push(zj4);
    var zj5 = { // 生产许可
      type: 5,
      attachements: [formData.scxk],
    }
    certList.push(zj5);
  } else if (registerType == 3) {
    var zj3 = { // 营业执照
      type: 3,
      startTime: formData.yyzzStartTime,
      endTime: formData.yyzzEndTime,
      attachements: [formData.yyzz],
    };
    certList.push(zj3);
    var zj4 = { // 开户许可
      type: 4,
      attachements: [formData.khxk],
    };
    certList.push(zj4);
    var zj6 = { // 道路运输经营许可证
      type: 6,
      startTime: formData.dlysjyStartTime,
      endTime: formData.dlysjyEndTime,
      attachements: [formData.dlysjy],
    }
    certList.push(zj6);
    var zj7 = { // 陆路货物运输保险单
      type: 7,
      startTime: formData.llhwysStartTime,
      endTime: formData.llhwysEndTime,
      attachements: [formData.llhwys],
    }
    certList.push(zj7);
  } else if (registerType == 4) {
    var zj0 = { // 身份证正面
      type: 0,
      startTime: formData.sfzStartTime,
      endTime: formData.sfzEndTime,
      attachements: [formData.idCardZM],
    };
    certList.push(zj0);
    var zj1 = { // 身份证反面
      type: 1,
      attachements: [formData.idCardFM],
    };
    certList.push(zj1);
    var yhk1 = { // 银行卡
      type: 2,
      attachements: [formData.bankCard],
    };
    certList.push(yhk1);
    var zj8 = { // 营运证
      type: 8,
      startTime: formData.yyzStartTime,
      endTime: formData.yyzEndTime,
      attachements: [formData.yyz],
    };
    certList.push(zj8);
    var zj8 = { // 营运证
      type: 8,
      startTime: formData.yyzStartTime,
      endTime: formData.yyzEndTime,
      attachements: [formData.yyz],
    };
    certList.push(zj8);
    var zj9 = { // 行驶证
      type: 9,
      attachements: [formData.xxz],
    };
    certList.push(zj9);
    var zj10 = { // 从业资格证
      type: 10,
      attachements: [formData.cyzgz],
    };
    certList.push(zj10);
  };

  var submitData = {
    name: formData.name,
    identifyNumber: formData.identifyNumber || formData.contactIdCard,
    province: formData.province,
    city: formData.city,
    country: formData.country,
    type: formData.type,
    legalName: formData.legalName,
    legalPhone: formData.legalPhone,
    userInfoVo: userInfo,
    stuffList: stuffList,
    certificateList: certList,
    contact: formData.contact,
    contactSex: formData.contactSex,
    contactPhone: formData.contactPhone,
    contactIdCard: formData.contactIdCard,
    contactDepart: formData.contactDepart,
    contactJob: formData.contactJob,
    contactEmail: formData.contactEmail,
    recommendTel: formData.recommendTel,
    recommendName: formData.recommendName,
    recommendType: formData.recommendType,
  };
  return post('/api/supply_chain/frontend/anonymous/user/register', submitData);
}