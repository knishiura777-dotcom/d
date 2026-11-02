/* PSYCHO ARCADE 2026 | Student-created games, exhibition wrapper.
   No analytics, trackers or external services. Progress is local to this browser. */
'use strict';

const games = [
  {id:'malatang',name:'麻辣湯マスター',original:'麻辣湯ゲーム',icon:'🍜',category:'thinking',tag:'記憶・判断',color:'coral',duration:'30秒',viewport:[960,680],input:'クリック / タップ',badge:'具材を見極めろ',desc:'注文にある具材だけを選んで、コンボをつなごう。',science:'注文に必要な情報を一時的に保ち、余分な選択肢を避ける活動です。ワーキングメモリと選択的注意のはたらきを考える入口になります。',steps:['辛さを選択して「ゲームスタート」。','表示された注文にある具材だけをクリック。','注文にない具材を選ばず高得点を目指そう。']},
  {id:'fruit-catch',name:'フルーツキャッチ',original:'フルーツキャッチゲーム',icon:'🍓',category:'action',tag:'追跡・協応',color:'pink',duration:'60秒',viewport:[930,650],input:'マウス移動',badge:'フルーツをキャッチ',desc:'落ちてくるフルーツを追いかけて、カゴで集めよう。',science:'動く対象の位置を追いながら手を動かします。視覚的追跡や目と手の協応について考えられます。',steps:['「スタート」でゲーム開始。','マウスを左右に動かしてカゴを操作。','フルーツを集め、爆弾を避けよう。']},
  {id:'space-war',name:'宇宙大戦争',original:'宇宙大戦争',icon:'🚀',category:'attention',tag:'視覚探索',color:'blue',duration:'30秒',viewport:[960,640],input:'マウス / クリック',badge:'狙え、宇宙の敵',desc:'宇宙に出現する敵を見つけて、狙って撃とう。',science:'次々に現れる標的を探して反応する体験です。視覚探索と注意の配分という観点から振り返れます。',steps:['EASY / NORMAL / HARDを選択。','マウスで照準を動かそう。','敵をクリックして得点を獲得しよう。']},
  {id:'brick-breaker',name:'ブロックブレイカー',original:'ブロック崩し',icon:'🧱',category:'action',tag:'予測・協応',color:'violet',duration:'ステージ制',viewport:[850,640],input:'マウス / クリック',badge:'はね返して壊せ',desc:'ボールを落とさず、ブロックをすべて崩そう。',science:'移動するボールの軌道を予測し、操作を調整します。予測と視覚運動協応を体験できます。',steps:['画面をクリックしてレベルを選ぼう。','マウスでパドルを左右に動かす。','クリックでスタート、ブロックを全部崩そう。']},
  {id:'marumaru',name:'まるまる進化',original:'まるまる進化',icon:'🔴',category:'thinking',tag:'空間・計画',color:'peach',duration:'じっくり',viewport:[840,730],input:'マウス / クリック',badge:'くっつけて進化',desc:'同じ色のまるを重ねて、どんどん大きくしよう。',science:'次に落とす位置を考え、結果を予測するゲームです。空間的な見通しや先を読む計画と結びつけて考えられます。',steps:['マウスを動かして落とす位置を決める。','クリックでまるを落とそう。','同じ色を合体させて高得点を目指そう。']},
  {id:'tetris',name:'落ちものパズル',original:'テトリス',icon:'🟦',category:'thinking',tag:'空間認知',color:'mint',duration:'100秒',viewport:[800,660],input:'キーボード ← → ↓ ↑',badge:'ブロックをそろえよう',desc:'形を見きわめ、すき間なくブロックを積み上げよう。',science:'落ちてくる図形の回転や位置をイメージしながら操作します。空間認知と先の見通しを考える手がかりになります。',steps:['「始める」を押そう。','← →で移動、↑で回転、↓で落下。','横一列をそろえて得点を伸ばそう。']},
  {id:'falling-click',name:'落下物クリック',original:'落下物クリックゲーム',icon:'🔵',category:'attention',tag:'選択的注意',color:'sky',duration:'30秒',viewport:[900,700],input:'クリック / タップ',badge:'青だけタップ',desc:'流れてくるアイテムの中から、青い丸だけ狙おう。',science:'狙ったものだけを選び、それ以外には反応しない課題です。選択的注意と反応抑制を体験できます。',steps:['「スタート」を押そう。','🔵をクリックして1点ゲット。','⭐は押さずに30秒間チャレンジ。']},
  {id:'quick-arrow',name:'矢印クイック',original:'早押しゲーム',icon:'↗️',category:'attention',tag:'選択反応',color:'yellow',duration:'10秒',viewport:[1050,700],input:'画面の矢印ボタン',badge:'10秒間の真剣勝負',desc:'表示された矢印と同じ向きを、すばやく選ぼう。',science:'目で見た記号を識別し、対応するボタンを選びます。刺激と反応の対応づけ、選択反応を考える体験です。',steps:['「スタート」で10秒チャレンジ。','中央に表示された矢印を確認。','同じ向きの矢印ボタンを押そう。間違えると終了！']},
  {id:'fishing',name:'フィッシングDX',original:'Fishing Adventure DX',icon:'🎣',category:'discovery',tag:'視覚追跡',color:'cyan',duration:'4ステージ',viewport:[950,660],input:'マウスでドラッグ',badge:'海の冒険へ',desc:'釣り針を操って、ステージごとの目標に挑戦。',science:'動く対象を追い、釣り針の位置を合わせます。視覚追跡と操作のタイミングに注目できます。',steps:['STARTを押して開始。','釣り針をマウスでドラッグ。','魚を釣って各ステージの目標を達成しよう。']},
  {id:'rock-jump',name:'岩ジャンプ',original:'岩ジャンプゲーム',icon:'⛰️',category:'action',tag:'タイミング',color:'olive',duration:'エンドレス',viewport:[960,680],input:'クリック / タップ',badge:'次の足場へ',desc:'タイミングよくジャンプして、岩から岩へ飛び移ろう。',science:'動く地形に合わせてジャンプするタイミングを判断します。時間的予測と運動調整を体験できます。',steps:['最初のクリックでゲーム開始。','次のクリックでジャンプ。空中でもう一度飛べる。','岩から落ちないように進もう。']},
  {id:'block-shooter',name:'ブロック撃破',original:'ブロック撃破ゲーム',icon:'💥',category:'action',tag:'予測・戦略',color:'orange',duration:'ステージ制',viewport:[1110,740],input:'マウス / クリック',badge:'狙いを定めろ',desc:'限られた弾数で、ステージのブロックを撃破！',science:'狙う方向と結果を予測し、使える弾数を考えます。見通しを立てる判断と試行錯誤に注目できます。',steps:['難易度（Easy〜Expert）を選択。','マウスで方向を定めてクリックで発射。','残り弾数に気をつけてクリアを目指そう。']},
  {id:'reaction',name:'反射神経チャレンジ',original:'反射神経ゲーム',icon:'🟢',category:'attention',tag:'反応・抑制',color:'lime',duration:'5回成功',viewport:[920,720],input:'クリック / タップ',badge:'緑だけに反応！',desc:'緑が現れたときだけ、すばやくクリックしよう。',science:'押すべき刺激と押してはいけない刺激を区別します。単純な「反射神経」だけでなく反応抑制も関わる課題です。',steps:['「スタート」を押そう。','🟢が出たら素早くクリック。','他の色では押さずに5回成功を目指そう。']},
  {id:'shopping',name:'お買い物チャレンジ',original:'お買い物チャレンジ',icon:'🛒',category:'thinking',tag:'計画・判断',color:'green',duration:'60秒 / 面',viewport:[1030,740],input:'クリック / タップ',badge:'予算内でお買い物',desc:'必要な商品をそろえて、予算内で買い物を成功させよう。',science:'必要な商品と価格を比較しながら選択する活動です。目標を保ちながら判断するワーキングメモリと計画の観点から考えられます。',steps:['ステージを選んでプレイ。','買い物リストにある商品を選ぼう。','予算を確認して「購入する」を押そう。']},
  {id:'dino',name:'ダイノアドベンチャー',original:'DINO ADVENTURE DX',icon:'🦖',category:'action',tag:'操作・予測',color:'purple',duration:'ステージ制',viewport:[960,670],input:'キーボード ← → / ↑・Space',badge:'恐竜と大冒険',desc:'障害物を越えて、タマゴを集めながらゴールを目指せ。',science:'移動中に周囲の変化を確認し、行動を調整します。視覚運動協応と連続的な意思決定を考える入口です。',steps:['← →で移動。↑ またはSpaceでジャンプ。','タマゴを集めて障害物や敵を避ける。','旗のあるゴールへ向かおう。']},
  {id:'whack-mole',name:'もぐらたたきDX',original:'もぐらたたきDX 完全版',icon:'🔨',category:'attention',tag:'注意・抑制',color:'gold',duration:'60秒',viewport:[870,880],input:'クリック / タップ',badge:'もぐらを見逃すな',desc:'出てくるもぐらを狙って、コンボで得点アップ！',science:'次々に現れる対象に注意を向けながら、爆弾への反応を避けます。注意の切り替えと反応抑制を体験できます。',steps:['「ゲームスタート」を押そう。','現れたもぐらをクリック。','💣を避けてコンボをつなごう。']},
  {id:'spot-difference',name:'10ステージ間違い探し',original:'10ステージ間違い探しゲーム',icon:'🔍',category:'discovery',tag:'視覚探索',color:'lavender',duration:'10ステージ',viewport:[1110,740],input:'クリック / タップ',badge:'違いを見つけろ',desc:'2つの絵を見比べて、隠れた違いを発見しよう。',science:'似た情報の中から違いを見つける活動です。視覚探索や注意の持続・比較の方法について考えられます。',steps:['左右の絵を見比べよう。','異なる場所を右側の絵からクリック。','困ったら「ヒント」を使ってみよう。']}
];

const groups={all:'すべて',attention:'反応・注意',thinking:'考える・選ぶ',discovery:'見つける',action:'アクション',favorites:'お気に入り'};
const storageKey='psycho-arcade-2026-v1';
function readStorage(){try{return JSON.parse(localStorage.getItem(storageKey)) || {}}catch(_){return {}}}
let saved=readStorage();
const state={filter:'all',query:'',favs:new Set(Array.isArray(saved.favs)?saved.favs:[]),played:new Set(Array.isArray(saved.played)?saved.played:[]),count:Number.isSafeInteger(saved.count)?saved.count:0,current:null,lastFocus:null,lastScroll:0};
const $=(s,root=document)=>root.querySelector(s);
function persist(){try{localStorage.setItem(storageKey,JSON.stringify({favs:[...state.favs],played:[...state.played],count:state.count}))}catch(_){}}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const categoryIcon={attention:'⚡',thinking:'◇',discovery:'◎',action:'✦'};

function makeCard(g,index){
  const favorite=state.favs.has(g.id);
  return `<article class="game-card accent-${g.color}" data-id="${g.id}" style="--card-index:${index}">
    <button type="button" class="card-main" data-open="${g.id}" aria-label="${escapeHTML(g.name)}をプレイ">
      <div class="card-art"><div class="art-grid"></div><span class="card-topline"><span>GAME ${String(games.indexOf(g)+1).padStart(2,'0')}</span><span class="online-dot">●&nbsp; PLAYABLE</span></span><span class="art-ghost">${String(games.indexOf(g)+1).padStart(2,'0')}</span><span class="art-symbol" aria-hidden="true">${g.icon}</span><span class="art-label">${escapeHTML(g.badge)}</span></div>
      <div class="card-body"><span class="card-tag">${categoryIcon[g.category]} ${escapeHTML(groups[g.category])} <span class="small-bullet">/</span> ${escapeHTML(g.duration)}</span><h3>${escapeHTML(g.name)}</h3><p>${escapeHTML(g.desc)}</p><span class="card-bottom"><span>PLAY GAME</span><span class="circle-arrow" aria-hidden="true">↗</span></span></div>
    </button><button type="button" class="fav-button ${favorite?'is-fav':''}" data-fav="${g.id}" aria-label="${escapeHTML(g.name)}を${favorite?'お気に入りから外す':'お気に入りに追加'}" aria-pressed="${favorite}" title="お気に入り">${favorite?'★':'☆'}</button>
    </article>`;
}
function render(){
  const shown=games.filter(g=>(state.filter==='all'||(state.filter==='favorites'?state.favs.has(g.id):state.filter===g.category)) && (!state.query || `${g.name} ${g.original} ${g.tag} ${g.desc} ${groups[g.category]}`.toLowerCase().includes(state.query)));
  $('#gameGrid').innerHTML=shown.map(makeCard).join('');
  $('#noResults').hidden=shown.length!==0;
  $('#matchCount').textContent=`${shown.length} / ${games.length} GAMES`;
  $('#playCount').textContent=String(state.count).padStart(2,'0');
  $('#discoveredCount').textContent=`${state.played.size} / ${games.length}`;
  document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===state.filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
}
function setFilter(value){if(!groups[value])return;state.filter=value;render()}
function goGame(id){ if(!games.some(g=>g.id===id))return; window.location.hash=`play/${id}`; route(); }
function updatePlayerInfo(g){
  $('#currentTitle').textContent=g.name;
  $('#currentOriginal').textContent=`学生制作作品 · ${g.tag}`;
  $('#currentNumber').textContent=`NO. ${String(games.indexOf(g)+1).padStart(2,'0')}`;
  $('#currentScience').textContent=g.science;
  $('#currentControls').textContent=g.input;
  $('#currentDuration').textContent=g.duration;
  $('#currentCategory').textContent=groups[g.category];
  $('#currentIcon').textContent=g.icon;
  const list=$('#currentSteps');list.replaceChildren();g.steps.forEach(step=>{const li=document.createElement('li');li.textContent=step;list.appendChild(li)});
  $('#playerFav').textContent=state.favs.has(g.id)?'★ お気に入り登録済み':'☆ お気に入りに追加';
  $('#playerFav').setAttribute('aria-pressed',String(state.favs.has(g.id)));
  $('#prevGame').disabled=games.length<2;
  $('#nextGame').disabled=games.length<2;
  $('#keyboardControls').hidden=!['tetris','dino'].includes(g.id);
  $('#keyboardControls').dataset.game=g.id;
  $('#mobileWarn').hidden=!['tetris','dino','fruit-catch','space-war','fishing','brick-breaker','block-shooter'].includes(g.id);
}
let resizeObserver=null;
function fitFrame(){
 const g=state.current;if(!g)return;
 const wrap=$('#gameFrameWrap');const iframe=$('#gameFrame');const [w,h]=g.viewport;
 const availableWidth=Math.max(1,wrap.clientWidth);
 const viewportHeight=window.innerHeight;
 // Scale down for kiosk and phones, preserving each student's native canvas coordinates.
 const fullscreen=Boolean(document.fullscreenElement);
 const room=fullscreen ? Math.max(300,viewportHeight-158) : Math.max(410,viewportHeight-270);
 const scale=Math.min(1,availableWidth/w,room/h);
 const realW=Math.round(w*scale),realH=Math.round(h*scale);
 iframe.style.width=`${w}px`;
 iframe.style.height=`${h}px`;
 iframe.style.transform=`scale(${scale})`;
 iframe.style.left=`${Math.max(0,Math.floor((availableWidth-realW)/2))}px`;
 wrap.style.height=`${realH}px`;
 $('#scaleLabel').textContent=`VIEW ${Math.round(scale*100)}%`;
}
function loadFrame(g){
 const frame=$('#gameFrame');const loading=$('#frameLoading');loading.hidden=false;
 frame.title=`${g.name} のゲーム画面`;
 frame.onload=()=>{loading.hidden=true};
 frame.src=`games/${g.id}.html`;
 fitFrame();
}
function showPlayer(g){
 const first=!state.current;
 if(state.current?.id===g.id && !$('#player').hidden)return;
 state.current=g;
 if(first){state.lastFocus=document.activeElement;state.lastScroll=window.scrollY;}
 state.count++;state.played.add(g.id);persist();render();updatePlayerInfo(g);
 const player=$('#player');player.hidden=false;document.body.classList.add('playing');
 if(first)window.scrollTo({top:0,behavior:'instant'});
 player.scrollTop=0;
 loadFrame(g);
 $('#closePlayer').focus({preventScroll:true});
 requestAnimationFrame(fitFrame);
}
function hidePlayer(){
 if($('#player').hidden)return;
 const player=$('#player');player.hidden=true;
 document.body.classList.remove('playing');
 window.scrollTo({top:state.lastScroll,behavior:'instant'});
 state.current=null;
 const frame=$('#gameFrame');frame.onload=null;frame.src='about:blank';
 if(document.fullscreenElement){document.exitFullscreen().catch(()=>{})}
 if(state.lastFocus && typeof state.lastFocus.focus==='function')state.lastFocus.focus({preventScroll:true});
}
function route(){
 const match=window.location.hash.match(/^#play\/([a-z-]+)$/);
 if(match){const g=games.find(x=>x.id===match[1]);if(g){showPlayer(g);return}}
 hidePlayer();
}
function closePlayer(){
 if(window.location.hash.startsWith('#play/')){
  history.replaceState(null,'','#games');
  route();
 }else hidePlayer();
}
function navigateGame(delta){
 const i=games.findIndex(g=>g.id===state.current?.id);if(i<0)return;
 goGame(games[(i+delta+games.length)%games.length].id);
}
function toggleFavorite(id){
 if(!games.some(g=>g.id===id))return;
 if(state.favs.has(id))state.favs.delete(id);else state.favs.add(id);
 persist();render();
 if(state.current?.id===id)updatePlayerInfo(state.current);
}
function sendKey(code,action){
 const frame=$('#gameFrame');if(!state.current||!frame.contentWindow)return;
 frame.contentWindow.postMessage({source:'psycho-arcade',type:'virtual-key',code,action},'*');
}
function init(){
 document.addEventListener('click',event=>{
  const favorite=event.target.closest('[data-fav]');if(favorite){toggleFavorite(favorite.dataset.fav);return}
  const opener=event.target.closest('[data-open]');if(opener){goGame(opener.dataset.open);return}
  const filter=event.target.closest('[data-filter]');if(filter){setFilter(filter.dataset.filter);return}
 });
 $('#searchGames').addEventListener('input',e=>{state.query=e.target.value.trim().toLocaleLowerCase('ja');render()});
 $('#clearSearch').addEventListener('click',()=>{$('#searchGames').value='';state.query='';state.filter='all';render();$('#searchGames').focus()});
 $('#surpriseBtn').addEventListener('click',()=>goGame(games[Math.floor(Math.random()*games.length)].id));
 $('#heroStart').addEventListener('click',()=>goGame('quick-arrow'));
 $('#closePlayer').addEventListener('click',closePlayer);
 $('#backGames').addEventListener('click',closePlayer);
 $('#restartGame').addEventListener('click',()=>{if(state.current)loadFrame(state.current)});
 $('#playerFav').addEventListener('click',()=>{if(state.current)toggleFavorite(state.current.id)});
 $('#prevGame').addEventListener('click',()=>navigateGame(-1));
 $('#nextGame').addEventListener('click',()=>navigateGame(1));
 $('#fullscreenGame').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('#player').requestFullscreen()}catch(_){/* Fullscreen may be restricted in previews */}fitFrame()});
 $('#player').addEventListener('click',e=>{if(e.target.id==='player')closePlayer()});
 document.addEventListener('keydown',e=>{
   if(e.key==='Escape'&&!$('#player').hidden){e.preventDefault();if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else closePlayer()}
   if(!$('#player').hidden && (e.target===document.body||e.target===document.documentElement) && (e.key==='ArrowLeft'||e.key==='ArrowRight')){
    // Leave game movement to the iframe, never change games via arrow keys.
   }
 });
 document.querySelectorAll('[data-key]').forEach(btn=>{
   const code=btn.dataset.key;
   btn.addEventListener('pointerdown',e=>{e.preventDefault();btn.setPointerCapture(e.pointerId);sendKey(code,'down');});
   for(const name of ['pointerup','pointercancel','lostpointercapture'])btn.addEventListener(name,()=>sendKey(code,'up'));
 });
 window.addEventListener('message',e=>{
   if(e.source!==$('#gameFrame').contentWindow || !e.data || e.data.source!=='psycho-arcade-game')return;
   if(e.data.type==='exit')closePlayer();
 });
 window.addEventListener('hashchange',route);
 window.addEventListener('popstate',route);
 window.addEventListener('resize',fitFrame);
 document.addEventListener('fullscreenchange',fitFrame);
 resizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(fitFrame):null;
 if(resizeObserver)resizeObserver.observe($('#gameFrameWrap'));
 render();route();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
