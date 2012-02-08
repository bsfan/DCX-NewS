var url = require('url');
var constants = require('./tools/constants.js')
var jsdom = require("jsdom");
var fs = require('fs');

var ContentExtraction = require('./tools/ce.js').ContentExtraction;
var ce = new ContentExtraction();

var url0 = 'http://tech.sina.com.cn/i/2011-10-02/18176138609_2.shtml';//OK (GBK)
var url1 = 'http://sports.163.com/11/1002/16/7FCGICSO00051CDG.html';//OK (GBK)
var url2 = 'http://www.qiushibaike.com/groups/2';                   //OK
var url3 = 'http://cnbeta.com/articles/157051.htm';                 //OK (GBK)
var url4 = 'http://www.laonanren.com/news/2011-10/43847.htm';       //fail-readbility failed. text is less to detect ,  picture website.
var url5 = 'http://news.qq.com/a/20111003/000027.htm';              //OK
var url6 = 'http://news.sohu.com/20111003/n321228696.shtml';        //OK (GBK)
var url7 = 'http://cn.engadget.com/2011/10/08/thinkpad-tablet-china-preorder-price/';//OK
var url8 = 'http://cn.engadget.com/2011/10/09/apple-iphone-4s-now-shipping-in-one-to-two-weeks-over-200-000/';//wrong html

ce.extractByUrl(url8, function(error, content, url){
    if(error){
        console.log('get error^');
        return;
    }

    fs.writeFile('unitest.html', content, function(error){
        if(error)
            console.log('file save error '+error);
        else
            console.log('unitest.html saved !');
    });

    console.log(content);
});


//var urlopen = require('./tools/urlopen.js');
//var meta = '<meta http-equiv="content-type" content="text/html; charset=GBK" />';
//var type = urlopen.detectContentType(meta,null);
//console.log('charset is '+ type.charset);
// end each item
//
//extractor.extract("",function(body){
//    var children = body.childNodes;
//    for(var i = 0 ; i < children.length; i++){
//        var child = children[i];
//        console.log('--->'+child.name);
//    }
//});

//dotodo();
//
//function dotodo(){
//    jsdom.env('<html xmlns=\"http://www.w3.org/1999/xhtml\">'+
//            '<body>'+
//		        '<div>'+
//			        '<p>'+
//			            '中国就轮胎特保案启动WTO,中国就轮胎特保案启动WTO	中国就轮胎特保案启动WTO	中国就轮胎特保案启动WTO'+
//			        '</p>'+
//		        '</div>'+
//	        '</body>'+
//            '</html>',
//        ['http://code.jquery.com/jquery-1.5.min.js'],
//        function(errors, window) {
//            //console.log("contents of a.the-link:", window.$("a.the-link").text());
//            var document = window.document;
//            var body = document.body;
//

            //printTAg(body);
          //  console.log(body.name);
//            var children = body.childNodes;
//            for(var i=0; i< children.length; i++){
//                var child = children[i];
//                console.log('--'+child.name);//div
//                for(var i= 0; i< child.childNodes.length; i++){
//                    var child = child.childNodes[i];
//                    console.log('----'+child.name)//p
//                    if(child.childNodes.length>0){
//                        console.log('------'+child.childNodes[0].text);
//                    }
//
//                }
//
//            }

//    var strings = [];
//    getStrings(body, strings);
//   // console.log(strings.join(""));
//
//
//    });
//}
//
//function printText(n){
//    var strings = [];
//    getStrings(n, strings);
//    return strings.join("");
//    function getStrings(n, strings){
//        if(n.nodeType == 3){
//            strings.push(n.data);
//
//        }else if(n.nodeType == 1){
//            for(var m = n.firstChild; m!= null; m = m.nextSibling){
//                getStrings(m, strings);
//            }
//        }
//    }
//}
//
// function getStrings(n, strings){
//        if(n.nodeType == 3){
//           // strings.push(n.data);
//            console.log(n.data);
//
//        }else if(n.nodeType == 1){
//            console.log(n.name);
//            for(var m = n.firstChild; m!= null; m = m.nextSibling){
//                getStrings(m, strings);
//            }
//        }
//  }
//
//function printTAg(node){
//
//    if(node.nodeType == Node.TEXT_NODE){
//        console.log(''+node.data);
//        return;
//    }
//    console.log(node.name);
//    if(node.hasChildNodes()){
//        var children = node.childNodes;
//        console.log('length :'+children.length);
//        for(var i=0; i< children.length; i++){
//            var child = children[i];
//             //console.log('----'+child.name)//p
//            printTAG(child);
//        }
//
//    }
//}
//var server = require('./server2.js')
//var op = url.parse('http://go.rss.sina.com.cn/redirect.php?url=http://news.sina.com.cn/w/2011-08-30/191323077069.shtml');

//for(var i=0; i< 10000; i++){
//    console.log(new Date().getTime());
//}
//server.filldb();
//test url parse
//console.log(op.href.substr(op.host.length+7));

//test extractor
//extractor.process(url6,
//    function(data){
//
//});

//
//    console.log('get error');
//
//var channel = {'name':'rss',
//    item:
//   [ { title: 'Fusion Garage Grid 4 通过 FCC，使用者手册透露更多 Grid OS 细节',
//       link: 'http://cn.engadget.com/2011/09/27/fusion-garage-grid-4-fcc-grid-os/',
//       'dc:creator': 'Stone IP',
//       pubDate: 'Tue Sep 27 2011' },
//     { title: '富士康山东厂房爆炸，不影响生产能力',
//       link: 'http://cn.engadget.com/2011/09/27/foxconn-shandong-explosion/',
//       'dc:creator': 'Stone IP',
//       pubDate: 'Tue Sep 27 2011' },
//     { title: '中兴 T98 平板，采用 Tegra 3 四核处理器，支持GSM/TD-SCDMA 制式（更新）',
//       link: 'http://cn.engadget.com/2011/09/27/zte-t98-tegra-3-td-scdma-tablet/',
//       'dc:creator': 'Bin Chen',
//       pubDate: 'Tue Sep 27 2011' }
//    ]};
//
//function deleteItem(){
//    items = channel.item;
//    for(var i = 0; i<items.length; i++){
//        var item = items[i];
//        delete items[i];
//
//    }
//    console.log(channel.item.length);
//    console.log(channel);
//}
//
//deleteItem();