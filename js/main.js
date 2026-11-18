const $=s=>document.querySelector(s);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let heroVis=true;
/* cinematic intro: count up, then the curtains part */
(function(){
  const b=$('#boot'),done=()=>{if(b.dataset.d)return;b.dataset.d=1;b.classList.add('open');document.body.classList.remove('lock');document.body.classList.add('ready');setTimeout(()=>b.remove(),1100)};
  if(reduce){done();return}
  const msgs=[[0,'Initializing the digital twin'],[40,'Loading 3D scenes'],[80,'Connecting the hardware'],[100,'Ready']];
  const t0=performance.now(),D=1900;
  (function tick(n){const p=Math.min(1,(n-t0)/D),e=p*p*(3-2*p),v=Math.round(e*100);
    $('#pct').textContent=v;$('#bar').style.width=v+'%';$('#bootMsg').textContent=msgs.filter(x=>v>=x[0]).pop()[1];
    p<1?requestAnimationFrame(tick):setTimeout(done,250)})(t0);
  b.onclick=done;
})();
/* scroll progress */
addEventListener('scroll',()=>{const d=document.documentElement;$('#prog').style.transform=`scaleX(${scrollY/(d.scrollHeight-innerHeight||1)})`},{passive:true});
new IntersectionObserver(e=>{heroVis=e[0].isIntersecting}).observe(document.querySelector('.hero'));

/* cursor spotlight */
addEventListener('pointermove',e=>{$('#spot').style.setProperty('--x',e.clientX+'px');$('#spot').style.setProperty('--y',e.clientY+'px')});

/* rotating verb */
let vi=0;if(!reduce)setInterval(()=>{vi=(vi+1)%VERBS.length;$('#verb').textContent=VERBS[vi]},2200);

/* hero: live wireframe terrain reacting to the cursor */
(function(){
  const c=$('#world'),x=c.getContext('2d');let W,H,m={x:.6,y:.4,on:0},t=0;
  const COLS=46,ROWS=30;
  const size=()=>{const d=devicePixelRatio||1;W=c.width=c.clientWidth*d;H=c.height=c.clientHeight*d};
  addEventListener('resize',size);size();
  c.parentElement.addEventListener('pointermove',e=>{m.x=e.clientX/innerWidth;m.y=e.clientY/innerHeight;m.on=1});
  function pt(i,j){
    const nx=i/COLS-.5,nz=j/ROWS;
    const d=Math.hypot(nx-(m.x-.5)*1.2,nz-(1-m.y)*1.1);
    let h=Math.sin(i*.35+t)*Math.cos(j*.3+t*.7)*.05+Math.sin(i*.12-t*.5)*.06;
    h+=Math.exp(-d*d*28)*.22*Math.sin(t*3-d*18)*m.on+Math.exp(-d*d*28)*.1*m.on;
    const z=nz*3+.35,s=1/z;
    return[W/2+nx*W*1.9*s*.55+(m.x-.5)*-60*s,H*.42+(.55-h*4)*H*.5*s,s]}
  function frame(){
    if(!heroVis){requestAnimationFrame(frame);return}
    x.clearRect(0,0,W,H);x.lineWidth=Math.max(1,W/1400);
    const P=[];for(let j=0;j<=ROWS;j++){P[j]=[];for(let i=0;i<=COLS;i++)P[j][i]=pt(i,j)}
    for(let j=0;j<=ROWS;j++){x.beginPath();for(let i=0;i<=COLS;i++){const p=P[j][i];i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])}
      x.strokeStyle=`rgba(116,212,226,${.04+.24*(1-j/ROWS)})`;x.stroke()}
    for(let i=0;i<=COLS;i+=2){x.beginPath();for(let j=0;j<=ROWS;j++){const p=P[j][i];j?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])}
      x.strokeStyle='rgba(242,180,90,.1)';x.stroke()}
    t+=.012;if(!reduce)requestAnimationFrame(frame)}
  frame();
})();

/* modal for simulations */
const modal=$('#modal');
function openSim(s){$('#mBody').className='modal-body';$('#mTitle').textContent=s.title;$('#mOpen').href=s.file;
  $('#mBody').innerHTML=`<iframe src="${s.file}" title="${s.title}"></iframe>`;modal.hidden=false;document.body.style.overflow='hidden';$('#mClose').focus()}
function openVideo(v){$('#mTitle').textContent=v.title||'Video';$('#mOpen').href='https://www.youtube.com/watch?v='+v.id;$('#mBody').className='modal-body video';
  $('#mBody').innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0" title="${v.title||'Video'}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;modal.hidden=false;document.body.style.overflow='hidden';$('#mClose').focus()}
function closeSim(){modal.hidden=true;$('#mBody').innerHTML='';document.body.style.overflow=''}
$('#mClose').onclick=closeSim;addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeSim()});

/* media tiles: every tile is the same 16:9 box */
function item(parent,{title,sub},tile,extra){
  const w=document.createElement('div');w.className='item';w.append(tile);
  if(title){const c=document.createElement('div');c.className='cap';c.innerHTML=`<span>${title}${sub?`<br><small>${sub}</small>`:''}</span>`;if(extra)c.append(extra);w.append(c)}
  parent.append(w)}
function ytTile(v){
  const b=document.createElement('button');b.className='vid';b.setAttribute('aria-label','Play '+(v.title||'video'));
  b.innerHTML=`<img loading="lazy" alt="${v.title||''}" src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg">`;b.onclick=()=>openVideo(v);return b}
function embedTile(g){
  const b=document.createElement('button');b.className='vid';b.setAttribute('aria-label','Play '+g.title);
  b.innerHTML=`<img loading="lazy" alt="${g.title}" src="${g.poster}">`;b.onclick=()=>openSim({title:g.title,file:g.file});return b}
GAMES.forEach(g=>item($('#gameGrid'),g,g.type==='video'?ytTile(g):embedTile(g)));
SIMS.forEach(s=>item($('#simGrid'),s.title?{title:s.title,sub:s.desc}:s,(()=>{const b=document.createElement('button');b.className='vid';b.setAttribute('aria-label','Open '+s.title);b.innerHTML=`<img loading="lazy" alt="${s.title}" src="${s.poster}">`;b.onclick=()=>openSim(s);return b})()));
SCENES.forEach(v=>item($('#reel'),{title:''},ytTile(v)));

/* CV content */
const li=a=>a.map(x=>Array.isArray(x)?`<li>${x[0]}<ul class="bl sub">${li(x[1])}</ul></li>`:`<li>${x}</li>`).join('');
$('#skills').innerHTML=Object.entries(SKILLS).map(([k,v])=>`<div><p class="small" style="margin:0 0 .5rem">${k}</p><div class="chips">${v.map(s=>`<span>${s}</span>`).join('')}</div></div>`).join('');
const teach=`<div class="teach"><h5>Teaching at HTU</h5><div class="two"><div><p class="small">Courses taught (5)</p><div class="chips">${COURSES_TAUGHT.map(s=>`<span>${s}</span>`).join('')}</div></div><div><p class="small">Laboratories taught (15)</p><div class="chips">${LABS_TAUGHT.map(s=>`<span>${s}</span>`).join('')}</div></div></div></div>`;
$('#jobs').innerHTML=JOBS.map(([d,r,o,p])=>`<div class="row"><small>${d}</small><div><h4>${r}<span class="org">${o}</span></h4><ul class="bl">${li(p)}</ul>${r==='Research and Teaching Assistant'?teach:''}</div></div>`).join('');
$('#nonTeach').innerHTML=NON_TEACH.map(([d,h,p])=>`<div class="row"><small>${d}</small><div><h4>${h}</h4><ul class="bl">${li(p)}</ul></div></div>`).join('');
const rowIO=new IntersectionObserver((en,ob)=>en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');ob.unobserve(x.target)}}),{threshold:.3});document.querySelectorAll('.row').forEach(r=>rowIO.observe(r));
$('#judging').innerHTML=li(JUDGING);$('#projects').innerHTML=li(PROJ);
$('#online').innerHTML=li(ONLINE);$('#papers').innerHTML=li(PAPERS);$('#edu').innerHTML=li(EDU);$('#courses').innerHTML=li(COURSES);
$('#yr').textContent=new Date().getFullYear();

/* hero digital twin: a wire that morphs between a knot, a coil, a lattice and a globe */
(function(){
  const c=$('#twin'),x=c.getContext('2d'),N=343;let W,H,mx=.5,my=.5,yaw=0,pit=0,k=0,t=0;
  const F=[u=>{const a=u*6.2832,r=Math.cos(3*a)+2;return[r*Math.cos(2*a)*.33,r*Math.sin(2*a)*.33,-Math.sin(3*a)*.4]},
   u=>{const a=u*50.27;return[Math.cos(a)*.55,(u-.5)*2.1,Math.sin(a)*.55]},
   (u,i)=>{const l=Math.floor(i/49),r=Math.floor(i%49/7);let q=i%49%7;if(r%2)q=6-q;return[(q-3)*.3,(r-3)*.3,(l-3)*.3]},
   u=>{const p=Math.acos(1-2*u),a=u*88;return[Math.sin(p)*Math.cos(a)*1.05,Math.cos(p)*1.05,Math.sin(p)*Math.sin(a)*1.05]}];
  const S=F.map(f=>Array.from({length:N},(_,i)=>f(i/(N-1),i)));let cur=S[0].map(p=>p.slice());
  const size=()=>{const d=devicePixelRatio||1;W=c.width=c.clientWidth*d;H=c.height=c.clientHeight*d};addEventListener('resize',size);size();
  const box=$('#twinBox');
  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth;my=e.clientY/innerHeight});
  box.onclick=()=>{k=(k+1)%S.length};if(!reduce)setInterval(()=>{k=(k+1)%S.length},6500);
  function frame(){
    if(heroVis){x.clearRect(0,0,W,H);
    for(let i=0;i<N;i++)for(let a=0;a<3;a++)cur[i][a]+=(S[k][i][a]-cur[i][a])*.06;
    yaw+=((mx-.5)*3+t*.4-yaw)*.05;pit+=((my-.5)*1.3-pit)*.05;
    const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit),sc=Math.min(W,H)*.42,P=[];
    for(const[px,py,pz]of cur){const x1=px*cy+pz*sy,z1=-px*sy+pz*cy,y1=py*cp-z1*sp,z2=py*sp+z1*cp,s=1/(2.1-z2);P.push([W/2+x1*s*sc*1.8,H/2+y1*s*sc*1.8,s])}
    const pulse=(t*70)%N;x.lineWidth=Math.max(2,W/260);
    for(let i=1;i<N;i++){const u=i/N,a=P[i-1],b=P[i];x.strokeStyle=`rgba(${242-126*u|0},${180+32*u|0},${90+136*u|0},${Math.min(1,b[2]*1.2)})`;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
    for(let i=0;i<N;i+=3){const p=P[i],d=Math.abs(i-pulse),g=Math.max(0,1-d/18);x.fillStyle=g>0?`rgba(255,240,200,${.4+g*.6})`:'rgba(239,232,218,.55)';x.beginPath();x.arc(p[0],p[1],(1.2+g*5)*p[2]*devicePixelRatio,0,6.3);x.fill()}
    t+=.012}
    if(!reduce)requestAnimationFrame(frame)}
  frame();
})();

/* hardware / 3D reveal slider */
(function(){
  const box=$('#split'),c=$('#splitC'),x=c.getContext('2d'),hd=$('#handle');let W,H,pos=0,target=.5,tr=[],chips=[],t=0,vis=false;
  const build=()=>{const d=devicePixelRatio||1;W=box.clientWidth;H=box.clientHeight;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);const g=26;tr=[];
    for(let n=0;n<40;n++){let px=Math.round(Math.random()*W/g)*g,py=Math.round(Math.random()*H/g)*g;const pts=[[px,py]];
      for(let s=0;s<6;s++){if(s%2)px+=(Math.random()<.5?-1:1)*g*(1+Math.floor(Math.random()*4));else py+=(Math.random()<.5?-1:1)*g*(1+Math.floor(Math.random()*3));pts.push([px,py])}tr.push({pts,o:Math.random()})}
    chips=[[.14,.34],[.3,.68],[.44,.24]].map(([a,b])=>[a*W,b*H]);if(!vis||reduce)draw()};
  const at=(pts,f)=>{const L=[];let T=0;for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(l);T+=l}let d=f*T;
    for(let i=0;i<L.length;i++){if(d<=L[i]||i==L.length-1){const r=L[i]?d/L[i]:0;return[pts[i][0]+(pts[i+1][0]-pts[i][0])*r,pts[i][1]+(pts[i+1][1]-pts[i][1])*r]}d-=L[i]}};
  function circuit(){x.fillStyle='#10202d';x.fillRect(0,0,W,H);x.lineWidth=1.5;
    tr.forEach(q=>{x.strokeStyle='rgba(242,180,90,.28)';x.beginPath();q.pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();
      const p=at(q.pts,(t*.18+q.o)%1);x.fillStyle='#ffd58a';x.shadowColor='#f2b45a';x.shadowBlur=10;x.beginPath();x.arc(p[0],p[1],2.6,0,6.3);x.fill();x.shadowBlur=0});
    chips.forEach(([a,b])=>{x.fillStyle='#0b1620';x.strokeStyle='#f2b45a';x.lineWidth=2;x.fillRect(a,b,84,52);x.strokeRect(a,b,84,52);for(let i=0;i<5;i++){x.fillStyle='#f2b45a';x.fillRect(a+8+i*16,b-6,4,6);x.fillRect(a+8+i*16,b+52,4,6)}})}
  function mesh(){const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#0c2a3a');g.addColorStop(1,'#07131c');x.fillStyle=g;x.fillRect(0,0,W,H);
    const cx=W*.72,cy=H*.52,R=Math.min(W*.2,H*.32),r=R*.42,a=t*.5,b=.55+Math.sin(t*.3)*.25,U=30,V=14,pt=(u,v)=>{const uu=u/U*6.283,vv=v/V*6.283,X=(R+r*Math.cos(vv))*Math.cos(uu),Y=(R+r*Math.cos(vv))*Math.sin(uu),Z=r*Math.sin(vv);
      const x1=X*Math.cos(a)-Z*Math.sin(a),z1=X*Math.sin(a)+Z*Math.cos(a),y1=Y*Math.cos(b)-z1*Math.sin(b),z2=Y*Math.sin(b)+z1*Math.cos(b),s=500/(500+z2);return[cx+x1*s,cy+y1*s,s]};
    x.lineWidth=1;for(let u=0;u<U;u++)for(let v=0;v<V;v++){const p=pt(u,v),q=pt(u+1,v),w=pt(u,v+1);x.strokeStyle=`rgba(116,212,226,${.25+.5*(p[2]-.7)})`;x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(q[0],q[1]);x.moveTo(p[0],p[1]);x.lineTo(w[0],w[1]);x.stroke()}}
  function draw(){circuit();x.save();x.beginPath();x.rect(pos*W,0,W,H);x.clip();mesh();x.restore();hd.style.left=pos*100+'%'}
  function loop(){pos+=(target-pos)*.08;t+=.016;draw();if(vis&&!reduce)requestAnimationFrame(loop)}
  const set=e=>{const r=box.getBoundingClientRect();target=Math.max(.02,Math.min(.98,(e.clientX-r.left)/r.width))};
  let down=false;box.addEventListener('pointerdown',e=>{down=true;set(e)});addEventListener('pointerup',()=>down=false);
  box.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||down)set(e)});
  box.tabIndex=0;box.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')target=Math.max(.02,target-.06);if(e.key==='ArrowRight')target=Math.min(.98,target+.06)});
  addEventListener('resize',build);build();
  new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!reduce)loop()}).observe(box);if(reduce){pos=target;draw()}
})();

/* tilt on tiles, magnetic buttons, cursor ring, lens flare */
(function(){
  let tl=null;
  addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||reduce)return;
    const el=e.target.closest&&e.target.closest('.vid,.card');if(tl&&tl!==el){tl.style.transform='';tl=null}
    if(el&&!el.querySelector('iframe')){tl=el;const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(800px) rotateY(${px*9}deg) rotateX(${-py*9}deg) translateY(-4px)`;el.style.setProperty('--gx',(px+.5)*100+'%');el.style.setProperty('--gy',(py+.5)*100+'%')}
    const bt=e.target.closest&&e.target.closest('.btn');document.querySelectorAll('.btn').forEach(b=>{if(b!==bt)b.style.translate=''});
    if(bt){const r=bt.getBoundingClientRect();bt.style.translate=`${(e.clientX-r.left-r.width/2)*.2}px ${(e.clientY-r.top-r.height/2)*.3}px`}});
  const h=$('.hero');h.addEventListener('pointermove',e=>{$('#flare').style.top=(e.clientY-h.getBoundingClientRect().top)+'px'});
  if(matchMedia('(pointer:fine)').matches&&!reduce){const r=$('#ring');document.body.classList.add('fine');let X=0,Y=0,tx=0,ty=0;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;r.classList.toggle('big',!!e.target.closest('a,button,.vid,.card,input,#split,#twinBox'))});
    (function l(){X+=(tx-X)*.18;Y+=(ty-Y)*.18;r.style.transform=`translate(${X}px,${Y}px) translate(-50%,-50%)`;requestAnimationFrame(l)})()}
})();
