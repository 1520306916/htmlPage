var url = '';
// var url = 'http://10.106.11.55:8765';
var _uploadUrl = '/file/upload/v4'

function get(location, data) {
    var opts = {
        headers: {
            'Authorization': localStorage.getItem('user-token'),
        },
    }
    return fetch(url + location + urlCode(data), opts)
        .then(response => checkStatus(response))
        .then((res) => res.json())
}

function post(location, postData) {
    var opts = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('user-token'),
        },
        body: JSON.stringify(postData)
    }
    return fetch(url + location, opts)
        .then((res) => checkStatus(res))
        .then((res) => res.json())
}

function put(location, postData) {
    var opts = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('user-token'),
        },
        body: JSON.stringify(postData)
    }
    return fetch(url + location, opts)
        .then((res) => checkStatus(res))
        .then((res) => res.json())
}

function _upload(file) {
    var form = new FormData();
    form.append('upload_file', file);
    return fetch(_uploadUrl, {
        method: 'POST',
        body: form,
        headers: {
            appCode: 123,
        },
    }).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response);
            error.response = response;
            throw error;
        }
    }).then(function (resp) {
        return resp.json();
    }).catch(function (e) {
        console.log('文件上传失败', e);
    });
}


//  获取url传参
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

// url传参
var urlCode = function(data) {
    var urlEncode = function (param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
                paramStr += urlEncode(param[i], k, encode)
            }
        }
        return paramStr;
    }
    return urlEncode(data) && '?' + urlEncode(data).substr(1);
}

// status状态验证
function checkStatus(response) {
    if (response.status >= 400 && response.status < 500) {
        if (response.status === 401) {
            localStorage.clear();
            setTimeout(function() {
                // window.location.href="../login.html"
            }, 3000)
        }
    }
    return response;
}
