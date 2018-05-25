<template>
    <div class="router">
      <div>我是父路由</div>
      <div>{{$route.name}}</div>
      <div>{{msg}}</div>
      <!--<router-link to="/routerHtml/childRouter">点击跳转到child子路由</router-link>-->
      <router-link :to="{name:'childRouter',params:{id:234}}">点击跳转到child子路由</router-link><!--params的参数在url中参数不会显示出来,除非在路由配置里加上 path:'/goods：id'-->
      <router-link tag="p" to="/routerHtml/test">点击跳转到test子路由</router-link><!-- tag="p" 指定该router-link为p标签 -->
      <router-view></router-view>

      <a href="#" download="https://wapruyitest.c-doctor.com/statics/receivables2018/02/01/1517471996.png">点击下载</a>

      <!--创建一个cavas  用来存放图片-->
      <canvas  id="cavasimg" width="607" height="367"  ></canvas>

      <!--        声明一个按钮  用来触发下载图片到本地-->
      <input type="button" id="btnsavaImg" value="保存图片到本地" @click="Download()"/>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'route',
    data() {
      return {
        msg:'hello world'
      }
    },
    methods:{
      Download(){
        //cavas 保存图片到本地  js 实现
        //------------------------------------------------------------------------
        //1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
        var type ='jpg';//你想要什么图片格式 就选什么吧
        var d=document.getElementById("cavasimg");
        var imgdata=d.toDataURL(type);
        //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
        var fixtype=function(type){
          type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
          var r=type.match(/png|jpeg|bmp|gif/)[0];
          return 'image/'+r;
        };
        imgdata=imgdata.replace(fixtype(type),'image/octet-stream');
        //3.0 将图片保存到本地
        var savaFile=function(data,filename)
        {
          var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href=data;
          save_link.download=filename;
          var event=document.createEvent('MouseEvents');
          event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
          save_link.dispatchEvent(event);
        };
        var filename=''+new Date().getSeconds()+'.'+type;
        //我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
        savaFile(imgdata,filename);
      }
    },
    mounted () {
      //$loading.hide()

      //canvas 绘制图片    支持手机端
//            var canvas = document.getElementById('cavasimg');
//            var ctx = canvas.getContext('2d');
//            ctx.fillRect(0, 0, canvas.width, canvas.height);
//            ctx.fillStyle = "red";
//            ctx.font = 'italic bold 30px Helvetica ';
//            ctx.fillText('楷体', 50, 50);
      // canvas 插入图片   手机端点击没反应
      //获取canvas元素
      var cvs = document.getElementById("cavasimg");
      //创建image对象
      var imgObj = new Image();
      imgObj.src = "http://10.20.11.202:7099/file/readImage?basePath=/sys/201803/8c7d8835de18452695fad2f328c0680efile.jpg";
      imgObj.setAttribute("crossOrigin",'Anonymous')
      //待图片加载完后，将其显示在canvas上
      imgObj.onload = function(){
        var ctx = cvs.getContext('2d');
        ctx.drawImage(this, 0, 0);//this即是imgObj,保持图片的原始大小：470*480
        //ctx.drawImage(this, 0, 0,1024,768);//改变图片的大小到1024*768
      }

    }
  }
</script>

<style lang="scss">

</style>
