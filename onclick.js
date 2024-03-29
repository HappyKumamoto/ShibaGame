//秒当てゲームの中心的Js
//gameオブジェクト
//音を追加

let el = document.createElement("script");//紙吹雪のkamiFu.jsを持ってくる
el.src = "kamiFu.js";

let sn = document.createElement("script");//絵文字が降るsnow.jsを持ってくる
sn.src = "snow.js";

let sp = document.createElement("script");//「おしい」のときのspecial.js
sp.src = "special.js";

//let yu = document.createElement("script"); //おしいのときにyuki.js 雪の結晶は停止 230702
//yu.src = "yuki.js";

const game = { //gameオブジェクトの宣言
    startTime: null,
    displayArea: document.getElementById('display-area'),
    onclickArea: document.getElementById('onclick-area'),

    bgm1:new Audio('bgm/hands.mp3'),   //紙吹雪の時の効果音
    bgm2:new Audio('bgm/tekkin.mp3'),  //絵文字が降る時
    bgm3:new Audio('bgm/bgm_chan.mp3')  //新「おしい」の音
//     bgm3:new Audio('bgm/oshii.mp3')    //「おしい」の時

};


let ss = [ 5 , 6 , 7 , 8 , 9 , 10 ]; //今回当てる秒数を5〜10の中からランダムで出す
let ssNo = Math.floor(Math.random() * ss.length); //ss[ssNo]はconfirmに表示させる


function start(){
    game.startTime = Date.now();      //上で用意した変数startTimeへ現在時刻のミリ秒を代入
    document.body.onclick = stop;
}

//onclick-areaの絵文字をランダムに出す
let emojis = [' 💡 ' ,  ' ☁️ '  , ' 🤍 ' , ' 🥚 ' , ' 🎾 ' ,' 🗿 ' , ' 🏟️ ' ,
' 🥛 ' ,  ' 🌕 '  ,  ' 🧰 ' , ' 📀 ' , ' ❄️ ' , ' 🌿 ' ,  ' 🦑 ' , ' 🏰 ' ,
 ' 🌶 ' , ' 🍊 ' , ' 🎰 ' ,  ' 🌵  ' , ' ⭐ ' , ' 🥞 ' , ' 🍦 ' ,' 🥨 ' , ' ⚽ ' ,
 ' 🎲 '  , ' 🥝 ' , ' 📱 ' , ' 🍩 ' ,' 🎂 ' , ' 🐙 ' ,' 🌴 ' ,' 🍔 ' ,
 ' 🍏 ' , ' 🏈 ' ,' 🍙 ' ,  ' 🍋 ' , ' 🧇 ' , ' 🍿 ' , ' 🏀 ' , ' 🌙 ' , ' 👑 ' ,
' 🔔 ' , ' 🏆 ' , ' 🏯 ' ,  ' 🍇 ' , ' 🎨 ' , ' 🍄 ' , ' 🍁 ' , ' 🦀 ' , ' 💠 ' ,
' 🍡🍡 ' ,' 🍱 ' ,' 🙈🙊🙉 ' , ' 🦩 '];

//候補' 🪙 ' , ' 🫑 '  ,' 🫖 ' , '🎍🎍' , ' 🧷 ' , ' 🧮 ' , ' 📷 ' , ' ☕ ' 
//' 🗝️ ' , ' 🗄️ ' , ' 🍐 ' , ' 🔋 ' ,  '🖱' ,  ' 📻 ' , ' 🔒 ' , 
// ' 🐚 ' , ' 🗑 ' ,' 🧂 ',' 📅 ' , <

let emojiNo = Math.floor( Math.random() * emojis.length);
console.log(emojis[emojiNo]);
document.getElementById('onclick-area').innerHTML = emojis[emojiNo];


function stop() {
    let currentTime = Date.now();
    let seconds = (currentTime - game.startTime) / 1000;
    let snow = sn.src; //⬇というエラーが出た為
          /*Uncaught ReferenceError: snow is not defined
          at HTMLBodyElement.stop */
    
    document.body.onclick = null;   //二回以上は押せないようにする
    
    if ( (ss[ssNo]) <= seconds && seconds < (ss[ssNo]+0.5) ) {
        //( 当てる秒数 + 0.5 )未満ならば 「おめでとう」と紙吹雪表示 + 効果音
        
        //game.bgm1.play();       //歓声と拍手//220630音停止中
        //game.bgm1.loop = true;//bgm繰り返し
        
        game.displayArea.innerText = `${seconds}秒でした！
        すごい〜!!
        ＼(╹◡╹)/
        ＼HAVE A NICE DAY SHIBA !!／`;  //追加230702
        //document.body.appendChild(el);  //kami.jsで紙吹雪を出す・・・休止中230702
        
        document.body.appendChild(sn);   //snow.jsで回転する絵文字を降らせる
        snow.innerText = emojis[emojiNo];
        
    }else if( (ss[ssNo]) <= seconds && seconds < (ss[ssNo]+1) ) {
        //( 当てる秒数 + 1 )未満ならば 「すばらしい」を表示 + 効果音
        
        //game.bgm2.play();        //鉄琴の音色//220630音停止中
        
        game.displayArea.innerText = `${seconds}秒でした！
        ＼すばらしい!／
        ＼HAVE A GOOD DAY SHIBA !!／`;  //BIRTHDAYから変更230702
        
        document.body.appendChild(sn);   //snow.jsで回転する絵文字を降らせる
        snow.innerText = emojis[emojiNo];
        
    }else{
        game.displayArea.innerText = `${seconds}秒でした！
        ＼ おしいです ／ `;
        //今回の絵文字が回転しながら透過度も変化しながら降りていく + 効果音
        
        //game.bgm3.play();    //(新 チャンチャン)(旧 残念な感じのジングル)//220630音停止中
        
        document.body.appendChild(sp);
        special.innerText = emojis[emojiNo];
        //appendScript(sp);
        
        //document.body.appendChild(yu);  //雪の結晶を降らせるのは停止230702
        //yuki.innerText = `❄️`;
    }
  //document.body.onclick = null; (二度目禁止「すばらしい」で効かなかった為上に移動)
}   

//コンファーム内の表示
if(confirm(`👉[[  OK  ]] を押した後
　　　　　　　　　　　　　　　　　　　　
⏳[[　　${ss[ssNo]} 秒　　]]⌛ 経ったと思ったら
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
動いている👉[[　❔Emoji❔　]]を押してください。 `)){

　　//[音が出ます. 🔉 音 量 ご 注 意 ]`)){ //220630音は停止中
　　　　　
  start();

  document.write(ss[ssNo]);  //今回、何秒を当てるのかを画面に表示
}
