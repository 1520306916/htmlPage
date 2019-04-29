/**
 * art-template.js模板引擎自定义函数
 */
$(function () {
  // 字符串分割
  template.defaults.imports.split = function(str,spliter) {
      return str.split(spliter);
  };
  // 数组或字符串包含
  template.defaults.imports.contains = function(val, parm){
    if(val instanceof Array){
      for (var i = 0; i < val.length; i++){
        if (val[i] == parm)//如果要求数据类型也一致，这里可使用恒等号===
            return true;
      }
      return false;
    }else if(typeof(val)=='string'){
      return val.indexOf(parm) > -1;
    }
    return false;
  };
  template.defaults.imports.formatDate = function(val, timeStyle) {
    var temp = timeStyle ? timeStyle : 'YYYY-MM-DD';
    return val ? moment(val).format(temp) : '';
  };

  template.defaults.imports.substring = function(val, length) {
    if(val.length>=length) {
      val = val.substring(0, length) + '...';
    }
    return val;
  };

  //公告类别处理
  template.defaults.imports.noticeType = function(code,key) {
    var noticeList = [
      {
        code: 'material',
        name: '原粮公告',
        url: './material-bidding.html'
      },
      {
        code: 'accessories',
        name: '辅料公告',
        url: './accessories-bidding.html'
      },
      {
        code: 'logist',
        name: '物流公告',
        url: './logistics-bidding.html'
      }];
      var obj = noticeList.find(p=>p.code==code);
    return obj && obj[key];
  };
  //公告类别详情处理
  template.defaults.imports.noticeItemType = function(code,key) {
    var mm = code.id;
    var noticeList = [
      {
        code: 'YL',
        name: '原粮公告',
        url: './material-bidding-details.html?id='+mm
      },
      {
        code: 'FL',
        name: '辅料公告',
        url: './accessories-bidding-details.html?id='+mm
      },
      {
        code: 'WL',
        name: '物流公告',
        url: './logistics-bidding-details.html?id='+mm
      }];
    var obj = noticeList.find(p=>p.code==code.bizNo.substring(0, 2));
    return obj && obj[key];
  };

  //竞价状态
  template.defaults.imports.biddingStatus = function(status) {
    var noticeList = [
      {
        code: 0,
        name: '未开始',
      },
      {
        code: 1,
        name: '竞价中',
      },
      {
        code: 2,
        name: '已结束',
      }];
      var obj = noticeList.find(p=>p.code==status);
    return obj && obj.name;
  };
});


