import{d as e,i as t,r as n,c as a,a as o,b as i,w as s,v as d,T as l,e as r,f as c,g as u,p,h as g,o as h,u as m,t as f,j as y,k as v,l as b,m as k,n as C,F as w,q as x,s as S,x as _,y as H,z as I,A,B,C as R}from"./vendor.ae59c86e.js";var T=e({name:"Aside",components:{},props:{width:{type:String,default:"300px"},titleBar:{type:String,default:"aside"}},setup(e,o){const i=t("isAside",n(!1)),s=t("updateIsAside");return{value:a({get:()=>i.value,set:e=>s(e)})}}});const $=u();p("data-v-c16d415e");const O=i("div",{style:{textAlign:"center"}},[i("h3",{style:{margin:"6px",fontSize:"18px"}}," Aside ")],-1);g();const F=$(((e,t,n,a,u,p)=>(h(),o(c,{to:"body"},[i(l,{name:"overlay"},{default:$((()=>[s(i("div",{class:"overlay",onClick:t[1]||(t[1]=t=>e.value=!1)},null,512),[[d,e.value]])])),_:1}),i(l,{name:"aside"},{default:$((()=>[s(i("aside",{style:{width:e.width}},[i("header",null,[r(e.$slots,"header",{},(()=>[O]),{})]),i("main",null,[r(e.$slots,"default",{},void 0,!0)])],4),[[d,e.value]])])),_:3})]))));T.render=F,T.__scopeId="data-v-c16d415e";const M=e({name:"Card",props:{position:{type:String,default:"static"},width:{type:String,default:"300px"},height:{type:String,default:"200px"},margin:{type:String,default:"0"},heading:{type:String,default:"none"},icon:{type:String,default:"none"},isOnlyHeading:{type:Boolean,default:!1}},setup:(e,t)=>({})}),z=()=>{m((e=>({"2633b0f2":e.position,cdc75ac6:e.width,"709f0730":e.height,"78f2fbb7":e.margin})))},E=M.setup;M.setup=E?(e,t)=>(z(),E(e,t)):z;const L=u();p("data-v-ceb52c8e");const q={class:"card"},W={key:0,class:"heading"},Y={key:0,class:"icon"},j={class:"material-icons"},D={class:"text"},X={key:1,class:"divider"},P={key:2,class:"content"};g();const G=L(((e,t,n,a,s,d)=>(h(),o("div",q,["none"!==e.heading?(h(),o("div",W,["none"!==e.icon?(h(),o("div",Y,[i("i",j,f(e.icon),1)])):y("",!0),i("div",D,f(e.heading),1),r(e.$slots,"heading",{},void 0,!0)])):y("",!0),e.isOnlyHeading||"none"===e.heading?y("",!0):(h(),o("div",X)),e.isOnlyHeading?y("",!0):(h(),o("div",P,[r(e.$slots,"default",{},void 0,!0)]))]))));M.render=G,M.__scopeId="data-v-ceb52c8e";var J=e({name:"App",components:{"my-aside":T,"my-card":M},setup:(e,t)=>{const a=n(!1),o=e=>{a.value=e};v("isAside",b(a)),v("updateIsAside",o);const i=k();return{handleTestClick:()=>{i.push("/"),o(!1)},handleRegExpClick:()=>{i.push("/Home"),o(!1)}}}});J.render=function(e,t,n,a,d,l){const r=x("router-view"),c=x("my-card"),u=x("my-aside"),p=S("ripple");return h(),o(w,null,[i(r),i(u,null,{default:C((()=>[s(i(c,{class:"aside-item",position:"relative",width:"auto",height:"40px",margin:"6px",heading:"Test",icon:"create",isOnlyHeading:!0,onClick:e.handleTestClick},null,8,["onClick"]),[[p,{backgroundColor:"black",opacity:"0.3"}]]),s(i(c,{class:"aside-item",position:"relative",width:"auto",height:"40px",margin:"6px",heading:"Home",icon:"home",isOnlyHeading:!0,onClick:e.handleRegExpClick},null,8,["onClick"]),[[p,{backgroundColor:"black",opacity:"0.3"}]]),s(i(c,{class:"aside-item",position:"relative",width:"auto",height:"40px",margin:"6px",heading:"Help",icon:"help_outline",isOnlyHeading:!0},null,512),[[p,{backgroundColor:"black",opacity:"0.3"}]])])),_:1})],64)};var K=e({name:"IconButton",props:{margin:{type:String,default:"0"},padding:{type:String,default:"0"},fontSize:{type:String,default:"24px"},theme:{type:String,default:"light"}},setup:(e,t)=>({iconButtonTheme:a((()=>{switch(e.theme){case"light":return"light-theme";case"dark":return"dark-theme";default:return"light-theme"}})),rippleConf:a((()=>{switch(e.theme){case"light":return{backgroundColor:"black",opacity:"0.3"};case"dark":return{backgroundColor:"white",opacity:"0.4"};default:return{backgroundColor:"black",opacity:"0.3"}}}))})});const N=u();p("data-v-348453e8");const Q={class:"material-icons"},U=_("help_outline");g();const V=N(((e,t,n,a,d,l)=>{const c=S("ripple");return s((h(),o("div",{class:["icon-button",[e.iconButtonTheme]],style:{width:(1.5*parseInt(e.fontSize)).toString()+"px",height:(1.5*parseInt(e.fontSize)).toString()+"px",margin:e.margin,padding:e.padding,fontSize:e.fontSize}},[i("i",Q,[r(e.$slots,"default",{},(()=>[U]),{})])],6)),[[c,e.rippleConf]])}));K.render=V,K.__scopeId="data-v-348453e8";var Z=e({name:"Header",components:{"my-icon-button":K},setup:(e,a)=>({isAside:t("isAside",n(!1)),updateIsAside:t("updateIsAside")})});const ee=u();p("data-v-02b2d8f0");const te=i("i",{class:"material-icons"},"menu",-1),ne={class:"slot"},ae=_(" title ");g();const oe=ee(((e,t,n,a,s,d)=>{const l=x("my-icon-button");return h(),o("header",null,[i(l,{theme:"dark",margin:"6px",onClick:t[1]||(t[1]=t=>e.updateIsAside(!0))},{default:ee((()=>[te])),_:1}),i("div",ne,[r(e.$slots,"default",{},(()=>[ae]),{})])])}));Z.render=oe,Z.__scopeId="data-v-02b2d8f0";var ie=e({name:"Main"});const se=u()(((e,t,n,a,i,s)=>(h(),o("main",null,[r(e.$slots,"default",{},void 0,!0)]))));ie.render=se,ie.__scopeId="data-v-abdbfb4a";const de=e({name:"Footer",setup:(e,t)=>({year:(new Date).getFullYear()})}),le=u()(((e,t,n,a,s,d)=>(h(),o("footer",null,[i("div",null,[r(e.$slots,"default",{},void 0,!0)]),i("span",null,"©"+f(e.year),1)]))));de.render=le,de.__scopeId="data-v-4aface8d";const re=e({name:"Button",props:{width:{type:String,default:"auto"},height:{type:String,default:"36px"},margin:{type:String,default:"8px"},padding:{type:String,default:"0 16px"},color:{type:String,default:"black"},backgroundColor:{type:String,default:"#F5F5F5"},rippleConf:{type:Object,default:()=>({backgroundColor:"black",opacity:"0.3"})},diameter:{type:String,default:"36px"},isRound:{type:Boolean,default:!1}},setup:(e,t)=>({getWidth:a((()=>e.isRound?e.diameter:e.width)),getHeight:a((()=>e.isRound?e.diameter:e.height)),getBorderRadius:a((()=>e.isRound?"50%":"4px"))})}),ce=()=>{m((e=>({"565a2a8d":e.getWidth,"5b1c2d40":e.getHeight,"1c38576b":e.margin,"08bea1f4":e.padding,"96b53d92":e.getBorderRadius,b4e89bf4:e.color,"4fffc9b8":e.backgroundColor})))},ue=re.setup;re.setup=ue?(e,t)=>(ce(),ue(e,t)):ce;const pe=u()(((e,t,n,a,i,d)=>{const l=S("ripple");return s((h(),o("button",null,[r(e.$slots,"default",{},void 0,!0)],512)),[[l,e.rippleConf]])}));re.render=pe,re.__scopeId="data-v-9d0071ac";var ge=e({name:"Test",components:{"my-header":Z,"my-main":ie,"my-footer":de,"my-card":M,"my-button":re},setup(e,t){const a=n(),o="说到高中生活就会想到玫瑰色，讲到玫瑰色就是高中生活，这两个词几乎可划上等号，我想这组对应释义被记载在《广辞苑》上的那一天应该不远了，虽然在西元两千年的今日还没动静就是。\n但是，这并不代表所有高中生都期待着玫瑰色的生活。好比说，有些人对课业、运动、恋爱等等全都兴趣缺缺，只喜欢灰色的生活，这种人就我所见也不少，却是相当寂寥的人生观。\n夕阳西下时，我在教室里对老朋友福部里志说起这些事，里志听了，脸上依旧挂着他一贯的微笑。\n「就是说啊，但我怎么不知道你有这种自虐倾向。」\n这话还真令人不悦。\n我抗议道：「你说我是灰色的？」\n「我也不知道该不该这样说……，可是课业啦，运动啦，还有什么来着？……恋爱吗？我不认为你对这些东西有多积极。」\n「我也没有很消极啊。」\n「说的也是。」里志的笑意更深了。「你只是在『节能』，是吧？」\n我闷哼一声表示同意。知道就好，我也不是真的排斥积极，只是觉得那既麻烦又浪费时间精力，所以对那些事不太感兴趣。珍惜地球资源的「节能」正是我的行事准则，以标语方式来表现就是——\n「没必要的事不做，必要的事尽快做。」\n我发表这句个人信条时，里志总是不置可否地耸耸肩说：\n「节能也好，厌世也罢，还不都一样？你知道什么是工具主义（注二）吗？」\n「不知道。」\n「简单说，你对什么都兴趣缺缺，进入神山高中这个社团活动多采多姿的宝殿却不参加社团，单就结果来看，确实是灰色的。」\n我打了个小小的呵欠。\n「照你这样以结果论，『杀人』和『业务过失致死』不就没两样了？」\n听到我的提问，里志毫不迟疑地回答：\n「从某个角度来看的确如此，反正结果一样是死。除非因别人业务过失而死的死者升天时，心里很清楚地认定『喔……，我会死是因为某人的业务过失啊』，那又另当别论。」\n「……」\n这家伙真是好辩。我重新打量眼前这个男生——福部里志，他是我的老朋友、好对手，也是敌人。里志在男生当中算是矮的，升上高中后体形依旧娇小，远远望去还会被人误认是女生，但他的内在却一点也不娇小。我很难解释他的特别之处，总之这家伙就是与众不同，好比他的眼睛和嘴角一向带着笑意，总是提着一只束口袋，特别是能言善辩这一点，几乎已经成了他的注册商标。他参加的社团是手工艺社，至于加入原因我就不清楚了。\n和这家伙辩论只是在浪费时间。我甩甩手表示想结束话题。\n「随便啦，你早点回家吧。」\n「也对，今天不太想去社团……，还是回家吧。」里志正要起身，突然诧异地望着我。「你会叫我回家？真稀奇呢。」\n「哪里稀奇？」\n「依你的习性，应该自个儿先走了才对啊？哪会留到现在叫我回家。你又没参加社团，莫非放学后还有事？」\n「是啊。」\n我皱着眉头，默默地从制服右口袋拿出一张宣纸。里志一看，登时睁大了眼。这形容一点都不夸张，虽然没什么好惊讶的，里志却真的瞪大了眼。他偶尔会冒出很夸张的反应，这也是他挺出名的一项特点。\n「这是……。怎么可能！？」「里志，你真没礼貌。」\n「天啊！这不是入社申请书吗？吓死我了！你到底是哪根筋不对劲？竟然会想参加社团活动！」\n这确实是入社申请书。里志看到「申请参加之社团」一栏便皱起眉头。\n「古籍研究社……？」\n「你听过啊？」\n「当然。可是你为什么挑古籍研究社？难道你突然对国学开窍了？」\n这下该怎么解释才好呢？我下意识地抓抓头，又从左侧口袋拿出另一张纸。那是一张信纸，上头写着与书写者本性截然不同的娟秀字体。我把信纸交给里志。\n「你看就知道了。」\n里志依书接过信纸看完，不出我所料地笑出声来。\n「哈哈！奉太郎，很伤脑筋吧？原来是姐姐的要求，难怪你拒绝不了。」\n瞧他乐成那副德性。相反地，我却是愁容满面。今天早上收到这封从印度寄来的国际邮件，逼得我不得不稍微修改一下自己的作风。老是这样，折木供惠的信总是让我的生活变调。\n奉太郎，去保护姐姐青春的舞台吧！去加入古籍研究社。\n今早我一拆开信封，看完这封简短的信，就被这自私任性的内容吓得傻眼。我并没有义务保护姐姐的回忆，可是……\n「你姐姐的专长是什么啊？柔道？」\n「是合气道和擒拿术，只要她决定下重手，绝对能让人痛不欲生。」\n没错，我那个光是跑遍日本还嫌不过瘾、进而跨足全球的姐姐，是个文武双全的超级大学生，一旦惹毛了她可是会吃不完兜着走的。\n当然我也可以坚守自己所剩不多的原则拒绝她，不过我的确没理由不帮她这个忙，姐姐那句「反正你也没有其他打算」精准地戳中要害。而且，我也觉得「回家社」的社员和只挂名不出现的幽灵社员没两样，所以仿佛是自己做出决定似地，我不带一丝犹豫地说：\n「我今天早上交出申请书了。」\n「员搞不懂你。」\n里志又看了看姐姐的信。\n我叹了口气。「虽然说也没什么好处啦。」\n「……不，我倒不这么想。」里志抬起视线，语气异常开朗。他拿起信纸轻拍掌心，「古籍研究社没有社员，这么一来你就能独占古籍研究社的社办啦。不错嘛，在校园里得到了一个私人空间。」\n私人空间？\n「……你的观点还员特别。」\n「你不想要吗？」\n这是什么奇怪的论调？简言之，里志的意思是我可以在校内玩秘密基地游戏？我完全没想到这点。私人空间啊……。我是不至于渴望到要极力争取，但如果是附带赠送，收下也无妨。我抽回里志手上的信纸。\n「嗯，听起来不错，就去社办看看好了。」\n「这样很好，先做再说吧。」\n先做再说？没有比这句更不适合我的话了。我苦笑地想着，一边拎起我的斜背包。\n看来，我对自己的信条也只有这么点忠诚度。\n敞开的窗外传来不知是田径社还是什么社的吆喝声。\n「……一、二！一、二！一、二……」\n这耗费大量能量的生活态度令我肃然起敬。常有人误会我，其实我并不觉得节能优于一切，所以从不认为那些很有活力的人是傻子。我听着他们的声音，一边走向古籍研究社社办。\n爬上三楼，在铺磁砖的走廊上前进。工友正搬着大型人字梯经过，我向他打听，得知古籍研究社社办位在专科大楼四楼，已挪为地科教室之用。\n神山高中无论从学生人数或是建地面积来看都不算大。\n学生总数应该不到千人，勉强算是这一带的升学学校，却看不出校方对升学倾注什么心力，嗯，反正就是所普通的高中，不过相较于学生人数的偏少，独特的社团却特别多（譬如水墨画社、人声音乐社，还有古籍研究社等等），每年文化祭的盛况在这一带非常有名，除此之外别无特色。\n至于空间规画，校区里共有三栋大型建筑，包括普通教室所在的普通大楼、专科教室所在的专科大楼，以及体育馆，这些都很普通，其他就是武术道场和体育器材室之类的，同样不值一提。古籍研究社社办所在的专科大楼四楼可说是位在神高最偏僻的地带。\n光要前往社办就很消耗能量啊。——我边想边穿过连接两栋大楼的通道，爬上四楼，很快便找到了地科教室。我立刻一拉横向滑门，门扉文风不动，这也是理所当然的，专科教室没人使用时通常是上锁的。我拿出为避免白跑一趟而借来的钥匙，插进钥匙孔一转。\n锁开了，我拉开门扉。空无一人的教室，透过面西的窗户看得见夕阳。\n空无一人？不，我错了。\n暮色笼罩的地科教室——也就是古籍研究社社办里，已经有人在。\n那人站在窗边看着我，是个女生。\n本来我一直无法拿捏「纤弱」、「清纯可人」等词汇的具体形象为何，但此刻我发觉，这些词汇完全可以用来形容这个女生。她黑发披肩，很适合穿水手服，在女生之中算满高的，说不定比里志还高。她既是女生又是高中生，当然该称之为女高中生，但是她那薄唇和细腻的气质让我很想用「女学生」这种古典的头衔来称呼。她还有一双不符合整体形象的大眼睛，只有这部分称不上清纯，给人相当活泼的印象。\n我不认识这个女生。\n她却看着我，脸上泛起微笑。\n「你好，折木同学。你也是古籍研究社的吗？」\n「……你是谁？」\n我直截了当地问。我确实不喜交际，但也".split("\n");return{testDiv:a,textArray:o,handlePageLeft:e=>{if(console.log("page left"),e.target){const t=e.target;t.scrollLeft-=t.getBoundingClientRect().width}},handlePageRight:e=>{if(console.log("page right"),e.target){const t=e.target;t.scrollLeft+=t.getBoundingClientRect().width}},handleTestClick:()=>{a.value&&console.log(`page counter: ${Math.round(a.value.scrollWidth/a.value.clientWidth)}`)}}}});const he=u();p("data-v-c86a5fa8");const me={class:"root"},fe=_(" this is a Card "),ye=_("test"),ve={class:"test",ref:"testDiv"};g();const be=he(((e,t,n,a,s,d)=>{const l=x("my-header"),r=x("my-card"),c=x("my-button"),u=x("my-main"),p=x("my-footer");return h(),o("div",me,[i(l),i(u,null,{default:he((()=>[i(r,{heading:"heading",icon:"help_outline"},{default:he((()=>[fe])),_:1}),i(c,null,{default:he((()=>[ye])),_:1}),i("div",ve,[(h(!0),o(w,null,H(e.textArray,((e,t)=>(h(),o("p",{key:t},f(e),1)))),128))],512),i("button",{onClick:t[1]||(t[1]=(...t)=>e.handleTestClick&&e.handleTestClick(...t))},"test")])),_:1}),i(p)])}));ge.render=be,ge.__scopeId="data-v-c86a5fa8";var ke=e({name:"Home",components:{Header:Z,Main:ie},setup:(e,t)=>({})});const Ce=u();p("data-v-f04fb03a");const we=_("Home");g();const xe=Ce(((e,t,n,a,s,d)=>{const l=x("Header"),r=x("Main");return h(),o("div",null,[i(l,null,{default:Ce((()=>[we])),_:1}),i(r)])}));ke.render=xe,ke.__scopeId="data-v-f04fb03a";const Se=[{path:"/",alias:"/Test",component:ge},{path:"/Home",component:ke}],_e=I({history:A(),routes:Se});const He={mounted(e,t){if(!t.value.backgroundColor||!t.value.opacity)throw Error("v-ripple指令的binding值出错！");const n=document.createElement("div");B.set(n,{position:"absolute",width:"20px",height:"20px",backgroundColor:t.value.backgroundColor,opacity:t.value.opacity,borderRadius:"50%",transform:"scale(0)"});let a="none",o="up";const i=()=>{B.to(n,{opacity:0,duration:.25,ease:"linear",onComplete:()=>{B.set(n,{transform:"scale(0)",opacity:t.value.opacity,onComplete:()=>{a="none"}})}})};e.addEventListener("mousedown",(t=>{o="down","none"===a&&(a="scale",(t=>{let s=0,d=0;t.target===e?(s=t.offsetX,d=t.offsetY):(s=t.pageX-window.scrollX-e.getBoundingClientRect().x,d=t.pageY-window.scrollY-e.getBoundingClientRect().y);const l=parseFloat(window.getComputedStyle(e).width),r=parseFloat(window.getComputedStyle(e).height);let c=0;c=s<=l/2?d<=r/2?Math.sqrt((l-s)**2+(r-d)**2)/10:Math.sqrt((l-s)**2+d**2)/10:d<=r/2?Math.sqrt(s**2+(r-d)**2)/10:Math.sqrt(s**2+d**2)/10,B.set(n,{left:String(s)+"px",top:String(d)+"px",x:"-50%",y:"-50%"}),B.to(n,{scale:c,duration:.5,ease:"power1.out",onComplete:()=>{a="fadeOut","up"!==o&&"leave"!==o||i()}})})(t))})),e.addEventListener("mouseup",(()=>{o="up","fadeOut"===a&&i()})),e.addEventListener("mouseleave",(()=>{"scale"===a?o="leave":i()})),e.appendChild(n)}},Ie=R(J);Ie.use(_e),Ie.directive("ripple",He),Ie.mount("#app");