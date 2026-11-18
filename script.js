(function(){
  var root=document.documentElement;
  try{ if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches) root.setAttribute("data-theme","light"); }catch(e){}
  document.getElementById("theme").onclick=function(){ root.setAttribute("data-theme", root.getAttribute("data-theme")==="light"?"dark":"light"); };

  var LABELS=["a national case comp win","₹2 lakh+ in sales","a founder’s office seat","a social media campaign","250k+ linkedin impressions","a mystery box turned 20×","32 participants onboarded","a campus ambassadorship","a gold medal in swimming","a power bi dashboard","a mckinsey forward badge","a runner-up finish"];
  var box=document.getElementById("luck"),bk=document.getElementById("bk"),bkl=document.getElementById("bkl"),cnt=document.getElementById("count"),wide=document.getElementById("wide");
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){ cnt.textContent="animation paused (reduced motion)"; return; }
  var W=box.clientWidth,H=box.clientHeight,bx=W/2,tx=W/2,bw=160,items=[],caught=0,spawn=0,last=performance.now(),lastInput=0,keys={},idx=0,t0=last;
  function measure(){W=box.clientWidth;H=box.clientHeight;}
  function width(){return 120+wide.value*3;}
  function pointer(x){tx=x-box.getBoundingClientRect().left;lastInput=performance.now();}
  box.addEventListener("mousemove",function(e){pointer(e.clientX);});
  box.addEventListener("touchmove",function(e){pointer(e.touches[0].clientX);},{passive:true});
  box.addEventListener("touchstart",function(e){pointer(e.touches[0].clientX);},{passive:true});
  window.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")keys.l=1;if(e.key==="ArrowRight")keys.r=1;lastInput=performance.now();});
  window.addEventListener("keyup",function(e){if(e.key==="ArrowLeft")keys.l=0;if(e.key==="ArrowRight")keys.r=0;});
  window.addEventListener("resize",measure);
  function make(){
    var el=document.createElement("span");el.className="fall";el.textContent=LABELS[idx++%LABELS.length];box.appendChild(el);
    var w=el.offsetWidth;items.push({el:el,w:w,x:16+Math.random()*Math.max(1,W-w-32),y:-24,v:50+Math.random()*40,got:false});
  }
  function frame(now){
    var dt=Math.min((now-last)/1000,0.05);last=now;
    if(!document.hidden){
      bw=width();
      if(keys.l)tx-=420*dt;if(keys.r)tx+=420*dt;
      if(now-lastInput>2500)tx=W/2+Math.sin((now-t0)/1400)*W*0.32;
      tx=Math.max(bw/2,Math.min(W-bw/2,tx));
      bx+=(tx-bx)*Math.min(1,dt*9);
      bk.style.width=bw+"px";bk.style.transform="translateX("+(bx-bw/2)+"px)";
      bkl.style.transform="translateX("+(bx-50)+"px)";
      spawn-=dt;if(spawn<=0&&items.length<7){make();spawn=0.9;}
      var top=H-58-26;
      for(var i=items.length-1;i>=0;i--){
        var f=items[i];
        if(f.got){f.life-=dt;f.el.style.opacity=Math.max(0,f.life/0.7);if(f.life<=0){f.el.remove();items.splice(i,1);}continue;}
        f.y+=f.v*dt;f.el.style.transform="translate("+f.x+"px,"+f.y+"px)";
        var cx=f.x+f.w/2;
        if(f.y>=top-8&&f.y<=top+8&&cx>bx-bw/2&&cx<bx+bw/2){f.got=true;f.life=0.7;f.el.classList.add("got");caught++;cnt.textContent="caught: "+caught;}
        else if(f.y>H){f.el.remove();items.splice(i,1);}
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

(function(){
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function ease(t){return 1-Math.pow(1-t,3);}
  function count(el,to,dur,fmt){
    if(reduce){el.textContent=fmt(to);return;}
    var s=performance.now();(function go(n){var t=Math.min((n-s)/dur,1);el.textContent=fmt(Math.round(to*ease(t)));if(t<1)requestAnimationFrame(go);})(s);
  }
  // stats count up
  var nums=document.getElementById("numbers"),done=false;
  function runNums(){if(done)return;done=true;nums.querySelectorAll("[data-to]").forEach(function(el){var pre=el.getAttribute("data-pre")||"",suf=el.getAttribute("data-suf")||"";count(el,+el.getAttribute("data-to"),1200,function(v){return pre+v+suf;});});}
  if("IntersectionObserver" in window){new IntersectionObserver(function(e,o){if(e[0].isIntersecting){runNums();o.disconnect();}},{threshold:.3}).observe(nums);}else{runNums();}
  // mystery box
  var box=document.getElementById("box"),amt=document.getElementById("amt"),note=document.getElementById("amtnote"),opened=false;
  box.onclick=function(){
    if(opened){opened=false;box.textContent="📦";amt.textContent="₹700";amt.classList.remove("win");note.textContent="my mystery box challenge. click the box to open it.";return;}
    opened=true;box.classList.remove("shake");void box.offsetWidth;box.classList.add("shake");
    setTimeout(function(){box.textContent="💰";amt.classList.add("win");note.textContent="₹700 estimated start into ₹14,000 in sales: 20×. click to reset.";
      count(amt,14000,1400,function(v){return "₹"+Math.max(v,700).toLocaleString("en-IN");});},520);
  };
  // hot chocolate scroll mug
  var fill=document.getElementById("fill"),mug=document.getElementById("mug"),tip=document.getElementById("tip");
  function onScroll(){
    var h=document.documentElement.scrollHeight-window.innerHeight,p=h>0?Math.min(1,window.scrollY/h):0;
    fill.style.height=Math.round(p*100)+"%";
    var full=p>0.97;mug.classList.toggle("full",full);tip.textContent=full?"cheers! let\u2019s talk":Math.round(p*100)+"%";
  }
  window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);onScroll();

  // typing helper
  var typers=new WeakMap();
  function typeInto(el,text){var id=(typers.get(el)||0)+1;typers.set(el,id);if(reduce){el.textContent=text;return;}var i=0;(function go(){if(typers.get(el)!==id)return;el.textContent=text.slice(0,i++);if(i<=text.length)setTimeout(go,16);})();}
  function wire(boxId,handler,startKey){
    var wrap=document.getElementById(boxId),btns=wrap.querySelectorAll(".chip");
    btns.forEach(function(b){b.onclick=function(){btns.forEach(function(x){x.classList.remove("on");});b.classList.add("on");handler(b.getAttribute("data-k"));};});
    if(startKey)handler(startKey);
  }

  // what do you need?
  var NEED={
    sales:{h:"i get a crowd interested and close the deal.",l:["<b>₹2 lakh+ in sales</b> at cozee co through direct selling, outreach and social media","<b>32 participants</b> onboarded one-on-one for iimun ranchi","<b>₹700 into ₹14,000</b> in the mystery box challenge by negotiating and deciding fast","<b>top campus ambassador</b> at iim ranchi and influencer partnerships with two creators (100k+ followers each)","a repeatable path: find people, start the conversation, make the offer, negotiate, close"]},
    ops:{h:"i work with founders on live priorities.",l:["founder’s office at <b>alfred scholar</b>: research, outreach, briefs and trackers","<b>cozee co</b>: sourcing, pricing, packaging and order fulfilment","won a <b>national-level case competition</b> at iim indore"]},
    social:{h:"i plan it, write it, measure it.",l:["<b>torq wars</b>: content calendar, captions, hooks, posts and reels","<b>250k+ linkedin impressions</b> through regular posting","community engagement through comments and DMs, with performance tracking","influencer partnerships: two creators (100k+ followers each) for <b>myfirstvote</b>","direct selling and social promotion that drove <b>₹2 lakh+</b> in cozee co sales"]},
    data:{h:"i turn messy data into decisions.",l:["<b>excel</b>: pivot tables, xlookup, power query, data cleaning","<b>sql</b> (select, join, group by) and <b>power bi</b> dashboards with dax basics","an <b>e-commerce sales analysis</b> from raw data to dashboard, plus python basics"]}
  };
  var np=document.getElementById("needpanel");
  wire("needchips",function(k){var d=NEED[k];np.innerHTML="<h3>"+d.h+"</h3><ul>"+d.l.map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul><div class=\"pills\"><a class=\"pill\" href=\"mailto:ayushburman2804@gmail.com?subject=Let%27s%20talk\">talk about this</a></div>";},"sales");

  // timeline
  var TL=[
    "cmhq science outreach: co-led a hands-on science session at local government schools (jun 2023 – jan 2024).",
    "iimun myfirstvote: onboarded 32 participants for iimun ranchi (mar – jul). started as house captain of leopard house. runner-up at carmel summit and infinity by cbcv.",
    "house captain at loyola high school, coordinating students across house events. finished school at loyola high school, jamshedpur (2012 – 2025).",
    "started the bba at iim bangalore and studies at mesa school of business. mystery box challenge. co-founded cozee co. interning at alfred scholar and torq wars."
  ];
  var YEARS=["2023","2024","2025","2026"],tlr=document.getElementById("tlr"),yr=document.getElementById("yr"),tt=document.getElementById("tltext"),tbs=document.querySelectorAll("#tlabels button");
  function showTl(i){yr.textContent=YEARS[i];tt.textContent=TL[i];tbs.forEach(function(b,j){b.classList.toggle("on",j===i);});}
  tlr.oninput=function(){showTl(+tlr.value);};
  tbs.forEach(function(b){b.onclick=function(){tlr.value=b.getAttribute("data-i");showTl(+tlr.value);};});
  showTl(3);

  // ask me anything
  var ASK={
    content:"i plan a content calendar, write hooks and captions, create posts and reels, engage in the comments and DMs, and track what performs to improve the next round. regular posting took my linkedin past 250k+ impressions.",
    hire:"how brands grow, how deals get closed and where the money goes. i like to pick one topic, learn it in a week, then test it on something real, like cozee co or my linkedin.",
    win:"winning a national-level case competition at iim indore. also close to my heart: turning an estimated ₹700 into ₹14,000 in the mystery box challenge.",
    learn:"data: excel, sql, power bi and python basics. and how a business really runs, by co-founding cozee co and working in a founder’s office.",
    next:"keep learning by doing: more real work in marketing, sales and finance, and more conversations with people who build things. say hi if that is you."
  };
  var ap=document.getElementById("askpanel");
  wire("askchips",function(k){typeInto(ap,ASK[k]);},null);

  // jump palette (press /)
  var pal=document.getElementById("pal"),pq=document.getElementById("palq"),pl=document.getElementById("pall"),sel=0,cur=[];
  var CMDS=[
    {t:"home",h:"#home"},{t:"what do you need?",h:"#need"},{t:"what i do",h:"#work"},{t:"marketing & content",h:"#marketing"},{t:"sales & outreach",h:"#sales"},{t:"learning sprints",h:"#learning"},{t:"timeline",h:"#timeline"},{t:"wins",h:"#wins"},{t:"side quests",h:"#quests"},{t:"ask me anything",h:"#ask"},{t:"contact",h:"#contact"},
    {t:"email ayush",h:"mailto:ayushburman2804@gmail.com"},{t:"open linkedin",h:"https://linkedin.com/in/ayush-burman-362874417",ext:1},{t:"toggle light / dark",fn:function(){document.getElementById("theme").click();}}
  ];
  function draw(){var q=pq.value.toLowerCase();cur=CMDS.filter(function(c){return c.t.indexOf(q)>-1;});sel=0;pl.innerHTML="";cur.forEach(function(c,i){var li=document.createElement("li");li.textContent=c.t;if(i===0)li.className="sel";li.onclick=function(){run(c);};pl.appendChild(li);});}
  function run(c){close();if(c.fn)c.fn();else if(c.ext)window.open(c.h,"_blank","noopener");else location.href=c.h;}
  function open(){pal.classList.remove("hidden");pq.value="";draw();pq.focus();}
  function close(){pal.classList.add("hidden");}
  function mark(){Array.prototype.forEach.call(pl.children,function(li,i){li.classList.toggle("sel",i===sel);});}
  window.addEventListener("keydown",function(e){
    var typing=/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||"");
    if(e.key==="/"&&!typing){e.preventDefault();open();return;}
    if(pal.classList.contains("hidden"))return;
    if(e.key==="Escape")close();
    else if(e.key==="ArrowDown"){e.preventDefault();sel=Math.min(sel+1,cur.length-1);mark();}
    else if(e.key==="ArrowUp"){e.preventDefault();sel=Math.max(sel-1,0);mark();}
    else if(e.key==="Enter"&&cur[sel])run(cur[sel]);
  });
  pq.oninput=draw;pal.addEventListener("click",function(e){if(e.target===pal)close();});

  // marketing funnel
  var FUN={
    attention:{h:"get seen.",l:["<b>250k+ linkedin impressions</b> through regular posting","posts and reels at <b>torq wars</b> planned on a content calendar","two influencers (100k+ followers each) for the <b>myfirstvote</b> campaign"]},
    interest:{h:"keep them interested.",l:["captions and <b>hooks</b> written for the brand’s voice","community engagement through <b>comments and DMs</b>","one-on-one <b>peer outreach</b> that turns curiosity into conversation"]},
    action:{h:"turn interest into action.",l:["<b>₹2 lakh+ in sales</b> at cozee co through direct selling, outreach and social media","<b>32 participants</b> onboarded for iimun ranchi","<b>₹700 into ₹14,000</b> in the mystery box challenge by negotiating and pricing"]},
    loyalty:{h:"bring them back.",l:["first-time buyers turned into <b>repeat customers</b> at cozee co","customer conversations alongside social-media promotion","tracking what works and refining the next round"]}
  };
  var fp=document.getElementById("funnelpanel");
  wire("funnel",function(k){var d=FUN[k];fp.innerHTML="<h3>"+d.h+"</h3><ul>"+d.l.map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul>";},"attention");

  // hook lab
  var HOOKS={
    mystery:{number:"₹700 into ₹14,000. a 20× return on a mystery box. here is what i did.",story:"my team got a mystery box of random items and one goal: sell it for the highest value. here is how it went.",lesson:"pricing, negotiation and fast decisions turned ₹700 into ₹14,000. here is what i would repeat."},
    cozee:{number:"₹2 lakh+ in sales from a hot chocolate brand i co-founded, built on direct selling, outreach and social media.",story:"i co-founded a hot chocolate brand. my job: product, pricing, customers and sales. here is what it taught me.",lesson:"getting a first-time buyer is the easy part. the real work is turning them into a repeat customer."},
    case:{number:"1 national-level case competition. 1 win. iim indore. here is how i approached it.",story:"i walked into a national-level case competition at iim indore and walked out as a winner. here is the story.",lesson:"what winning a national case competition at iim indore taught me about structuring a problem."},
    reach:{number:"250k+ impressions on linkedin by posting regularly. here is the routine.",story:"i started posting on linkedin as a college student. it grew past 250k+ impressions. here is what changed.",lesson:"showing up regularly is the part most people skip. it took my linkedin past 250k+ impressions."}
  };
  var hTopic="mystery",hFmt="number",hp=document.getElementById("hookpanel");
  function hook(){typeInto(hp,HOOKS[hTopic][hFmt]);}
  wire("hooktopics",function(k){hTopic=k;hook();},"mystery");
  wire("hookformats",function(k){hFmt=k;hook();},"number");
  var ch=document.getElementById("copyhook");
  ch.onclick=function(){var t=HOOKS[hTopic][hFmt];function ok(){ch.textContent="copied!";setTimeout(function(){ch.textContent="copy hook";},1500);}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,function(){});}};

  // sales & outreach
  var PIPE={
    lead:{h:"find the right people.",l:["peer outreach to find people who actually care: <b>32 participants</b> for iimun ranchi","<b>top campus ambassador</b> at iim ranchi","creators with <b>100k+ followers</b> as a reach channel for myfirstvote"]},
    talk:{h:"start the conversation.",l:["one-on-one messages, not blasts","comments and DMs at <b>torq wars</b>","relevance first, then one clear ask"]},
    offer:{h:"make the offer.",l:["<b>direct selling</b> at cozee co: product, price and packaging explained simply","social media promotion that points people to the offer"]},
    nego:{h:"negotiate.",l:["the <b>mystery box challenge</b>: pricing, negotiation and quick decisions under time pressure","<b>₹700 into ₹14,000</b> in sales (20×)"]},
    close:{h:"close and repeat.",l:["<b>₹2 lakh+</b> in cozee co sales","first-time buyers turned into <b>repeat customers</b>"]}
  };
  var pp=document.getElementById("pipepanel");
  wire("pipe",function(k){var d=PIPE[k];pp.innerHTML="<h3>"+d.h+"</h3><ul>"+d.l.map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul>";},"lead");

  var MA={student:"hi [name], i’m ayush, a bba student at iim bangalore. i noticed [something specific about their work or event].",
    founder:"hi [name], i’m ayush. i co-founded a hot chocolate brand and work in a founder’s office. i like what you are building at [company].",
    brand:"hi [name], i’m ayush. i run social media and outreach work, including for cozee co. i follow [brand] and noticed [a specific post or campaign].",
    customer:"hi [name]! i’m ayush from cozee co."};
  var MG={advice:"could i ask you one question about [topic]? it would take two minutes.",
    collab:"i have one idea that could bring you [result]: [one line]. open to a quick call this week?",
    offer:"i think you would like our [product] because [one benefit]. want me to send the details?"};
  var mA="student",mG="advice",mp=document.getElementById("msgpanel");
  function msg(){mp.textContent=MA[mA]+"\n\n"+MG[mG]+"\n\nthanks, ayush";}
  wire("msgaud",function(k){mA=k;msg();},"student");
  wire("msggoal",function(k){mG=k;msg();},"advice");
  var cm=document.getElementById("copymsg");
  cm.onclick=function(){function ok(){cm.textContent="copied!";setTimeout(function(){cm.textContent="copy message";},1500);}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(mp.textContent).then(ok,function(){});}};

  var OBJ={
    price:"ask what they are comparing it to, then show the value they get. do not drop the price first: trade something instead, like quantity or timing.",
    time:"ask what would make it the right time, and agree a date to follow up. a clear next step beats a vague maybe.",
    think:"ask what they are unsure about. often it is one thing you can answer right now.",
    who:"be brief and honest: who i am, why i am writing, and one proof point. for me: 32 participants onboarded, ₹2 lakh+ in sales.",
    have:"respect it, then ask what they wish it did better. i am not replacing it, i am looking for the gap."
  };
  var op=document.getElementById("objpanel");
  wire("objchips",function(k){typeInto(op,OBJ[k]);},"price");

  var cmE=document.getElementById("cm"),crE=document.getElementById("cr"),cdE=document.getElementById("cd"),co=document.getElementById("calcout");
  function calc(){
    var m=+cmE.value,r=+crE.value,d=+cdE.value,rep=m*r/100,deals=rep*d/100;
    document.getElementById("cmv").textContent=m;document.getElementById("crv").textContent=r+"%";document.getElementById("cdv").textContent=d+"%";
    co.textContent=m+" messages → "+(Math.round(rep*10)/10)+" replies → "+(Math.round(deals*10)/10)+" deals a week, about "+Math.round(deals*4.3)+" a month.";
  }
  cmE.oninput=crE.oninput=cdE.oninput=calc;calc();

  // one week, one skill
  var SPR={
    marketing:[
      ["positioning","who it is for, and why them over the alternatives.","a one-line positioning statement","my own linkedin profile"],
      ["customer research","talk to five real customers and note the words they use.","five insight notes","cozee co customers"],
      ["the funnel","attention, interest, action, loyalty: where do people drop off?","a funnel sketch with one metric per stage","a brand i like"],
      ["copy and hooks","headlines, hooks and calls to action that earn the next line.","ten hooks, then the best three","my next linkedin post"],
      ["channels","pick one channel and one number to move, and ignore the rest.","a one-page channel plan","linkedin"],
      ["experiments","a small a/b test of two hooks, tracking reach and replies.","a tiny test with a result","two linkedin posts"],
      ["review","what worked, what to repeat, what to drop.","a one-page learning note","the whole week"]
    ],
    sales:[
      ["the buyer","who exactly buys, what they care about and where to find them.","an ideal customer profile","cozee co"],
      ["outreach basics","a cold message with relevance, value and one clear ask.","five outreach messages","real people i would like to talk to"],
      ["discovery","ask before you pitch: problems, priorities and timing.","a list of ten good questions","a practice call"],
      ["objections","price, timing and trust: how to listen and respond.","a response to each common objection","a role-play"],
      ["price and negotiation","anchoring, trading and knowing your walk-away point.","negotiation notes","my mystery box challenge"],
      ["follow-ups and pipeline","stages, next steps and not letting deals go quiet.","a simple pipeline tracker","cozee co orders"],
      ["review and role-play","run the whole conversation start to finish.","one recorded practice pitch","a friend as the buyer"]
    ],
    finance:[
      ["read a p&l","revenue, costs and profit: where each line comes from.","one annotated p&l","a public company"],
      ["unit economics","price, cost per unit and margin on a single product.","a one-product margin sheet","cozee co"],
      ["break-even","how many sales cover the fixed costs.","a break-even calculation","a small brand"],
      ["cash vs profit","why a profitable business can still run out of cash.","a one-month cash flow","a small brand"],
      ["cac and ltv","what it costs to win a customer vs what they are worth.","a ratio with assumptions written down","a hot chocolate brand"],
      ["time value of money","why a rupee today beats a rupee tomorrow, and a first look at valuation.","three worked examples","a startup i follow"],
      ["review","tie it together into a model anyone can read.","a one-page model of a small brand","the whole week"]
    ]
  };
  var sTrack="marketing",sDay=0,dp=document.getElementById("daypanel");
  function sprint(){var d=SPR[sTrack][sDay];dp.innerHTML="<h3>day "+(sDay+1)+": "+d[0]+"</h3><ul><li><b>learn:</b> "+d[1]+"</li><li><b>build:</b> "+d[2]+"</li><li><b>apply to:</b> "+d[3]+"</li></ul>";}
  wire("trackchips",function(k){sTrack=k;sprint();},"marketing");
  wire("days",function(k){sDay=+k;sprint();},"0");

  // spotlight on cards
  document.querySelectorAll(".panel,.numbers div,.mbox,.loop div").forEach(function(el){
    el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect();el.style.setProperty("--mx",(e.clientX-r.left)+"px");el.style.setProperty("--my",(e.clientY-r.top)+"px");});
  });
})();
