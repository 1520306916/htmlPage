loadcss('./lib/reset.css');
loadcss('./css/global/common.css');
loadcss('./css/global/header_global.css');
loadcss('./css/global/footer_global.css');


loadjs('./lib/jquery.min.js');
loadjs('./lib/jquery.page.js');
loadjs('./lib/moment.min.js');
loadjs('./lib/template.js');
loadjs('./lib/template-utils.js');
loadjs('./utils/request.js');
loadjs('./utils/common.js');


function loadjs(url){
  document.write('<script src="'+url+'"><\/script>');
}

function loadcss(url){
  document.write('<link rel="stylesheet" type="text/css" href="'+url+'"><\/link>');
}