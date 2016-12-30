/*路径配置*/
var version = '20160914',
    versionJS = '20160914',

    basicPath = '../js/script',
    utilPath = '../js/script/util';

 

versionJS = versionJS === '' ? version : versionJS;
seajs.config({
  alias: {
    'basic': basicPath + '/common/basic.js',
    'common': basicPath + '/common/common.js',
    'request': basicPath + '/lib/RequestDefine.js',
    'jquery': utilPath + '/jquery/jquery.js'
  }
});
