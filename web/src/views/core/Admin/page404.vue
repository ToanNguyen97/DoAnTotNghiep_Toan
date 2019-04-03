<template >
  <div style="background-color:#33cc99; height:100vh">
    <div class="c">
      <div class="_404">404</div>
      <hr>
      <div class="_1">THE PAGE</div>
      <div class="_2">WAS NOT FOUND</div>
      <a class="btn" href="/admin">BACK TO HOME</a>
    </div>
  </div>
</template>
<style scoped>

.c{
    text-align: center;
    display: block;
    position: relative;
    width:80%;
    margin:100px auto;
}
._404{
    margin-bottom:10px;
    color:#fff;
    font-size: 220px;
    position: relative;
    display: inline-block;
    z-index: 2;
    height: 250px;
    letter-spacing: 15px;
}
._1{
    margin-top:10px;
    color: #fff;
    text-align:center;
    display:block;
    position:relative;
    letter-spacing: 12px;
    font-size: 4em;
    line-height: 80%;
}
._2{
    margin-top:10px;
    color: #fff;
    text-align:center;
    display:block;
    position: relative;
    font-size: 20px;
}
.text{
    color:#fff;
    font-size: 70px;
    text-align: center;
    position: relative;
    display: inline-block;
    margin: 19px 0px 0px 0px;
    /* top: 256.301px; */
    z-index: 3;
    width: 100%;
    line-height: 1.2em;
    display: inline-block;
}


.btn{
    background-color: rgb( 255, 255, 255 );
    position: relative;
    display: inline-block;
    width: 358px;
    padding: 5px;
    z-index: 5;
    font-size: 25px;
    margin:0 auto;
    color:#33cc99;
    text-decoration: none;
    margin-right: 10px
}
.right{
    float:right;
    width:60%;
}

hr{
    padding: 0;
    border: none;
    border-top: 5px solid #fff;
    color: #fff;
    text-align: center;
    margin: 0px auto;
    width: 420px;
    height:10px;
    z-index: -10;
}

hr:after {
    content: "\2022";
    display: inline-block;
    position: relative;
    top: -0.75em;
    font-size: 2em;
    padding: 0 0.2em;
    background: #33cc99;
}
</style>