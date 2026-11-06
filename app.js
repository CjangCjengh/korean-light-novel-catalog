const $ = id => document.getElementById(id);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase().replace(/[\s\p{P}\p{S}]/gu,'');
const text = {
  ja:{title:'韓国ライトノベル一覧',search:'検索',placeholder:'書名、著者、イラスト担当、ISBN',scope:'検索対象',scopes:{all:'すべて',title:'書名',people:'著者・イラスト担当',synopsis:'作品紹介',isbn:'ISBN'},filters:'絞り込み',status:'刊行状況',statuses:{complete:'完結',stalled:'刊行中断',ongoing:'刊行中'},imprint:'レーベル',year:'第1巻の発売年',author:'著者',artist:'イラスト',volumes:'本編の巻数',extra:'その他の条件',extras:{web:'ウェブ版完結',cd:'ドラマCDあり',side:'番外編あり',saved:'お気に入り'},reset:'条件をクリア',sort:'並び順',sorts:{first:'第1巻の発売日・古い順',newest:'第1巻の発売日・新しい順',last:'最新巻の発売日・新しい順',title:'書名順',volumes:'巻数・多い順',shortest:'巻数・少ない順'},all:'すべて',from:'開始',to:'終了',minimum:'最小巻数',maximum:'最大巻数',results:(n,total)=>`全${total}作品中${n}作品`,open:'作品紹介・各巻の表紙',close:'閉じる',source:'出典',bookstore:'書店',link:'作品リンクをコピー',previous:'前へ',next:'次へ',page:'ページ',empty:'条件に合う作品がありません',loading:'読み込み中…',error:'一覧を読み込めませんでした。ページを再読み込みしてください。',saved:'お気に入りに追加',unsave:'お気に入りから削除',copied:'リンクをコピーしました',copyError:'リンクをコピーできませんでした',workFilter:'選択した作品',rangeError:'範囲の開始値が終了値を超えています',main:n=>`本編${n}巻`,side:n=>`番外編${n}巻`,cd:n=>`ドラマCD${n}枚`,volume:n=>`第${n}巻`,web:'ウェブ版完結',untitledVolume:'各巻の表紙'},
  ko:{title:'한국 창작 라이트노벨 목록',search:'검색',placeholder:'제목, 작가, 일러스트레이터, ISBN',scope:'검색 범위',scopes:{all:'전체',title:'작품명',people:'작가 · 일러스트',synopsis:'작품 소개',isbn:'ISBN'},filters:'필터',status:'출간 상태',statuses:{complete:'완결',stalled:'출간 중단',ongoing:'출간 중'},imprint:'출판 브랜드',year:'첫 권 출간 연도',author:'작가',artist:'일러스트',volumes:'본편 권수',extra:'추가 조건',extras:{web:'웹판 완결',cd:'드라마 CD 있음',side:'외전 있음',saved:'즐겨찾기'},reset:'필터 초기화',sort:'정렬',sorts:{first:'첫 권 · 오래된 순',newest:'첫 권 · 최신순',last:'마지막 출간 · 최신순',title:'작품명순',volumes:'권수 · 많은 순',shortest:'권수 · 적은 순'},all:'전체',from:'시작',to:'종료',minimum:'최소 권수',maximum:'최대 권수',results:(n,total)=>`${total}작품 중 ${n}작품`,open:'소개 · 권별 표지',close:'닫기',source:'출처',bookstore:'서점',link:'작품 링크 복사',previous:'이전',next:'다음',page:'페이지',empty:'조건에 맞는 작품이 없습니다',loading:'불러오는 중…',error:'목록을 불러오지 못했습니다. 새로고침해 주세요.',saved:'즐겨찾기에 저장',unsave:'즐겨찾기 해제',copied:'링크를 복사했습니다',copyError:'링크를 복사하지 못했습니다',workFilter:'선택한 작품',rangeError:'범위의 시작 값이 끝 값보다 큽니다',main:n=>`본편 ${n}권`,side:n=>`외전 ${n}권`,cd:n=>`드라마 CD ${n}종`,volume:n=>`${n}권`,web:'웹판 완결',untitledVolume:'권별 표지'},
  zh:{title:'韩国原创轻小说书目',search:'搜索',placeholder:'书名、作者、插画师、ISBN',scope:'搜索范围',scopes:{all:'全部',title:'书名',people:'作者 · 插画师',synopsis:'简介',isbn:'ISBN'},filters:'筛选',status:'出版状态',statuses:{complete:'完结',stalled:'太监',ongoing:'连载'},imprint:'出版品牌',year:'首卷出版年份',author:'作者',artist:'插画',volumes:'本篇卷数',extra:'其他条件',extras:{web:'web版已完结',cd:'有广播剧CD',side:'有番外',saved:'已收藏'},reset:'清除筛选',sort:'排序',sorts:{first:'首卷日期 · 从早到晚',newest:'首卷日期 · 从晚到早',last:'最近出书 · 从晚到早',title:'书名',volumes:'卷数 · 从多到少',shortest:'卷数 · 从少到多'},all:'全部',from:'起始',to:'结束',minimum:'最少卷数',maximum:'最多卷数',results:(n,total)=>`${n}部 / 共${total}部`,open:'简介 · 逐卷封面',close:'关闭',source:'来源',bookstore:'书店',link:'复制作品链接',previous:'上一页',next:'下一页',page:'页码',empty:'没有符合条件的作品',loading:'加载中…',error:'书目加载失败，请刷新页面',saved:'收藏',unsave:'取消收藏',copied:'链接已复制',copyError:'未能复制链接',workFilter:'指定作品',rangeError:'起始值不能大于结束值',main:n=>`本篇${n}卷`,side:n=>`番外${n}卷`,cd:n=>`${n}部广播剧CD`,volume:n=>`第${n}卷`,web:'web版已完结',untitledVolume:'逐卷封面'},
  en:{title:'Korean Original Light Novel Catalog',search:'Search',placeholder:'Title, author, illustrator, ISBN',scope:'Search in',scopes:{all:'All fields',title:'Titles',people:'Authors · Illustrators',synopsis:'Synopsis',isbn:'ISBN'},filters:'Filters',status:'Publication status',statuses:{complete:'Completed',stalled:'Stalled',ongoing:'Ongoing'},imprint:'Imprint',year:'First-volume year',author:'Author',artist:'Illustrator',volumes:'Main volumes',extra:'Other filters',extras:{web:'Web version completed',cd:'Drama CDs',side:'Side stories',saved:'Saved'},reset:'Clear filters',sort:'Sort',sorts:{first:'First volume · Oldest',newest:'First volume · Newest',last:'Latest publication',title:'Title',volumes:'Most volumes',shortest:'Fewest volumes'},all:'All',from:'From',to:'To',minimum:'Minimum volumes',maximum:'Maximum volumes',results:(n,total)=>`${n} of ${total} works`,open:'Synopsis · Volume covers',close:'Close',source:'Sources',bookstore:'Bookstore',link:'Copy work link',previous:'Previous',next:'Next',page:'Page',empty:'No works match these filters',loading:'Loading…',error:'The catalog could not be loaded. Please reload.',saved:'Save',unsave:'Unsave',copied:'Link copied',copyError:'Could not copy the link',workFilter:'Selected work',rangeError:'The start of the range is greater than the end',main:n=>`${n} main vol.`,side:n=>`${n} side-story vol.`,cd:n=>`${n} drama CD${n===1?'':'s'}`,volume:n=>`Vol. ${n}`,web:'Web version completed',untitledVolume:'Volume cover'}
};
const koreanImprints = {
  'Seed Novel':'시드노벨','Novel Engine':'노블엔진','Nabi Novel':'나비노블',
  'Extreme Novel':'익스트림노벨','V Novel':'브이노블','SeedBooks':'시드북스',
  'V+':'브이플러스','Novel Engine POP':'노블엔진 팝','Carnival Novel':'카니발 노벨',
  'Gems Novel':'젬스노벨','SOVEL':'소벨','Like Novel':'라이크노벨',
  'J Novel':'제이노블','Issue Novels':'이슈노벨즈','Archetype':'아키타입',
  'Root Novel':'루트 노벨','It Book':'잇북','Carnival Plus':'카니발 플러스',
  'Night Novel':'나이트노벨',
  'Night Novel Mini':'나이트노벨 미니'
};
const japaneseImprints = {
  'Seed Novel':'シードノベル','Novel Engine':'ノベルエンジン','Nabi Novel':'ナビノベル',
  'Extreme Novel':'エクストリームノベル','V Novel':'ブイノベル','SeedBooks':'シードブックス',
  'V+':'ブイプラス','Novel Engine POP':'ノベルエンジン・ポップ','Carnival Novel':'カーニバルノベル',
  'Gems Novel':'ジェムズノベル','SOVEL':'ソベル','Like Novel':'ライクノベル',
  'J Novel':'ジェイノベル','Issue Novels':'イシューノベルズ','Archetype':'アーキタイプ',
  'Root Novel':'ルートノベル','It Book':'イットブック','Carnival Plus':'カーニバルプラス',
  'Night Novel':'ナイトノベル','Night Novel Mini':'ナイトノベル・ミニ'
};
const imprintName = name => (lang==='ko' ? koreanImprints[name] : lang==='ja' ? japaneseImprints[name] : null) || name;
const PAGE_SIZE = 24;
let data, works=[], filtered=[], lang='ko', state, favorites=new Set(), coverWork, coverIndex=0, toastTimer, inputTimer;
const initial = () => ({q:'',scope:'all',status:[],imprint:[],from:'',to:'',author:'',artist:'',min:'',max:'',web:false,cd:false,side:false,saved:false,sort:'first',page:1,work:''});
try{favorites=new Set(JSON.parse(localStorage.getItem('kln-saved')||'[]'));}catch{}
function parseURL(){
  const p=new URLSearchParams(location.search);lang=Object.hasOwn(text,p.get('lang'))?p.get('lang'):'ko';state=initial();
  for(const k of ['q','scope','from','to','author','artist','min','max','sort','work']) if(p.has(k))state[k]=p.get(k);
  for(const k of ['status','imprint']) state[k]=p.getAll(k);
  for(const k of ['web','cd','side','saved']) state[k]=p.get(k)==='1';
  state.page=Math.max(1,parseInt(p.get('page'),10)||1);
  if(!Object.hasOwn(text.ko.scopes,state.scope))state.scope='all';
  if(!Object.hasOwn(text.ko.sorts,state.sort))state.sort='first';
  state.status=state.status.filter(s=>Object.hasOwn(text.ko.statuses,s));
  for(const k of ['from','to','min','max']) if(state[k] && !/^\d{1,4}$/.test(state[k]))state[k]='';
}
function stateURL(custom=state){
  const u=new URL(location.href);u.search='';u.hash='';u.searchParams.set('lang',lang);
  const defaults=initial();for(const [k,v] of Object.entries(custom)){
    if(Array.isArray(v)){for(const x of v)u.searchParams.append(k,x);}
    else if(typeof v==='boolean'){if(v)u.searchParams.set(k,'1');}
    else if(v!==defaults[k] && v!=='')u.searchParams.set(k,String(v));
  }return u;
}
function setOptions(id,obj,value){$(id).innerHTML=Object.entries(obj).map(([k,v])=>`<option value="${escapeHTML(k)}">${escapeHTML(v)}</option>`).join('');$(id).value=value;}
function localize(){
  const t=text[lang];document.documentElement.lang=lang==='zh'?'zh-Hans':lang;document.title=t.title;
  for(const [id,key] of Object.entries({'page-title':'title','search-label':'search','search-button':'search','scope-label':'scope','filters-label':'filters','status-label':'status','imprint-label':'imprint','year-label':'year','author-label':'author','artist-label':'artist','volumes-label':'volumes','extra-label':'extra','reset':'reset','sort-label':'sort','previous':'previous','next':'next','page-label':'page','cover-close':'close','cover-source':'bookstore'}))$(id).textContent=t[key];
  document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));
  $('search').placeholder=t.placeholder;setOptions('search-scope',t.scopes,state.scope);setOptions('sort',t.sorts,state.sort);
  const years=[...new Set(works.map(w=>w.first.slice(0,4)))].sort();
  for(const [id,key,label] of [['year-from','from','from'],['year-to','to','to']]){setOptions(id,{'':t.all,...Object.fromEntries(years.map(y=>[y,y]))},state[key]);$(id).setAttribute('aria-label',t.year+' '+t[label]);}
  $('volume-min').setAttribute('aria-label',t.minimum);$('volume-max').setAttribute('aria-label',t.maximum);
  $('authors').innerHTML=[...new Set(works.flatMap(w=>[...w.authors[lang],...w.authors.ko]))].sort().map(n=>`<option value="${escapeHTML(n)}"></option>`).join('');
  $('artists').innerHTML=[...new Set(works.flatMap(w=>w.artists))].sort().map(n=>`<option value="${escapeHTML(n)}"></option>`).join('');
  $('extra-options').innerHTML=Object.entries(t.extras).map(([k,v])=>`<label><input type="checkbox" data-extra="${k}" ${state[k]?'checked':''}><span>${escapeHTML(v)}</span></label>`).join('');
  $('cover-prev').setAttribute('aria-label',t.previous);$('cover-next').setAttribute('aria-label',t.next);
  syncInputs();
}
function syncInputs(){for(const [id,key] of Object.entries({'search':'q','author':'author','artist':'artist','volume-min':'min','volume-max':'max','year-from':'from','year-to':'to','search-scope':'scope','sort':'sort'}))$(id).value=state[key];}
function searchable(w){return {title:[...Object.values(w.title),...w.volumes.map(v=>v.title)].join(' '),people:[...Object.values(w.authors).flat(),...w.artists].join(' '),synopsis:Object.values(w.synopsis).join(' '),isbn:w.volumes.map(v=>v.isbn).join(' ')};}
function matches(w,skip=''){
  if(state.work && w.id!==state.work)return false;
  if(state.q){const hay=state.scope==='all'?w._search.all:w._search[state.scope];if(!state.q.trim().split(/\s+/).map(normalize).filter(Boolean).every(q=>hay.includes(q)))return false;}
  if(skip!=='status' && state.status.length && !state.status.includes(w.status))return false;
  if(skip!=='imprint' && state.imprint.length && !state.imprint.includes(w.imprint))return false;
  if(state.from && +w.first.slice(0,4)<+state.from)return false;
  if(state.to && +w.first.slice(0,4)>+state.to)return false;
  if(state.author && !normalize(Object.values(w.authors).flat().join(' ')).includes(normalize(state.author)))return false;
  if(state.artist && !normalize(w.artists.join(' ')).includes(normalize(state.artist)))return false;
  if(state.min!=='' && w.mainVolumes<+state.min)return false;
  if(state.max!=='' && w.mainVolumes>+state.max)return false;
  if(state.web && !w.webComplete)return false;if(state.cd && !w.dramaCDs)return false;if(state.side && !w.sideVolumes)return false;
  if(state.saved && !favorites.has(w.id))return false;return true;
}
function facets(){
  const t=text[lang];
  for(const kind of ['status','imprint']){
    const counts=new Map();for(const w of works.filter(w=>matches(w,kind)))counts.set(w[kind],(counts.get(w[kind])||0)+1);
    const values=kind==='status'?Object.keys(t.statuses):[...new Set(works.map(w=>w.imprint))].sort((a,b)=>works.filter(w=>w.imprint===b).length-works.filter(w=>w.imprint===a).length||a.localeCompare(b));
    $(kind+'-options').innerHTML=values.map(v=>`<label><input type="checkbox" data-facet="${kind}" value="${escapeHTML(v)}" ${state[kind].includes(v)?'checked':''}><span>${escapeHTML(kind==='status'?t.statuses[v]:imprintName(v))}</span><span class="option-count">${counts.get(v)||0}</span></label>`).join('');
  }
}
function counts(w){const t=text[lang];return [t.main(w.mainVolumes),w.sideVolumes?t.side(w.sideVolumes):'',w.dramaCDs?t.cd(w.dramaCDs):''].filter(Boolean).join(' · ');}
function coverAlt(w,v){return `${w.title[lang]} · ${v.title}`;}
function card(w){
  const t=text[lang], v=w.volumes[0],saved=favorites.has(w.id);
  const credit=(kind,items)=>`<span><span>${t[kind]}</span>${items.map(n=>`<a href="${escapeHTML(stateURL({...initial(),[kind]:n}))}" data-person="${kind}" data-name="${escapeHTML(n)}">${escapeHTML(n)}</a>`).join(' / ')}</span>`;
  return `<article class="work" id="work-${w.id}" data-id="${w.id}">
    <div class="work-top"><button class="cover-button" data-cover="0" aria-label="${escapeHTML(coverAlt(w,v))}"><img class="main-cover" src="${v.cover}" alt="${escapeHTML(coverAlt(w,v))}" width="100" height="148" loading="lazy" decoding="async"></button>
      <div><h2>${escapeHTML(w.title[lang])}</h2>${lang!=='ko'?`<p class="original-title" lang="ko">${escapeHTML(w.title.ko)}</p>`:''}
      <div class="metadata"><span class="date">${w.first.replaceAll('-','.')} ${w.first!==w.last?'– '+w.last.replaceAll('-','.'):''}</span><span class="tag ${w.status}">${t.statuses[w.status]}</span>${w.webComplete?`<span class="tag web">${t.web}</span>`:''}</div>
      <div class="credits">${credit('author',w.authors[lang])}${credit('artist',w.artists)}</div><div class="metadata"><a href="${escapeHTML(stateURL({...initial(),imprint:[w.imprint]}))}" data-brand="${escapeHTML(w.imprint)}">${escapeHTML(imprintName(w.imprint))}</a><span>${escapeHTML(counts(w))}</span></div></div>
      <button class="bookmark" aria-pressed="${saved}" aria-label="${saved?t.unsave:t.saved}" title="${saved?t.unsave:t.saved}">${saved?'★':'☆'}</button>
    </div><p class="snippet">${escapeHTML(w.synopsis[lang])}</p><details class="book-details"><summary>${t.open} (${w.volumes.length})</summary><div class="detail-content"></div></details>
  </article>`;
}
function detailHTML(w){const t=text[lang];return `<p class="synopsis">${escapeHTML(w.synopsis[lang])}</p><div class="cover-grid">${w.volumes.map((v,i)=>`<figure class="volume"><button class="cover-button" data-cover="${i}" aria-label="${escapeHTML(coverAlt(w,v))}"><img src="${v.cover}" alt="${escapeHTML(coverAlt(w,v))}" loading="lazy" decoding="async" width="130" height="185"></button><figcaption><span class="volume-title" title="${escapeHTML(v.title)}">${escapeHTML(v.label?.[lang]||v.title)}</span><time>${v.date.replaceAll('-','.')}</time>${v.isbn?`<br><span>ISBN ${escapeHTML(v.isbn)}</span>`:''}<br><a href="${escapeHTML(v.url)}" target="_blank" rel="noopener noreferrer">${t.bookstore}</a></figcaption></figure>`).join('')}</div><div class="sources"><span>${t.source}</span>${w.sources.map(s=>`<a href="${escapeHTML(s)}" target="_blank" rel="noopener noreferrer">${escapeHTML(new URL(s).hostname.replace(/^www\./,''))}</a>`).join('')}<button type="button" class="work-link">${t.link}</button></div>`;}
function render(){
  const t=text[lang];const anchor=document.querySelector('.work details[open]')?.closest('.work')?.dataset.id;
  filtered=works.filter(w=>matches(w));filtered.sort((a,b)=>{switch(state.sort){case'newest':return b.first.localeCompare(a.first);case'last':return b.last.localeCompare(a.last);case'title':return a.title[lang].localeCompare(b.title[lang],lang);case'volumes':return b.mainVolumes-a.mainVolumes||a.first.localeCompare(b.first);case'shortest':return a.mainVolumes-b.mainVolumes||a.first.localeCompare(b.first);default:return a.first.localeCompare(b.first);}});
  const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));state.page=Math.min(state.page,pages);
  $('result-count').textContent=t.results(filtered.length,works.length);facets();
  $('works').innerHTML=filtered.slice((state.page-1)*PAGE_SIZE,state.page*PAGE_SIZE).map(card).join('')||`<p class="empty">${(state.from&&state.to&&+state.from>+state.to)||(state.min!==''&&state.max!==''&&+state.min>+state.max)?t.rangeError:t.empty}</p>`;
  for(const d of document.querySelectorAll('.book-details'))d.addEventListener('toggle',()=>{if(d.open && !d.querySelector('.detail-content').hasChildNodes()){const w=works.find(w=>w.id===d.closest('.work').dataset.id);d.querySelector('.detail-content').innerHTML=detailHTML(w);}});
  const openId=state.work||anchor;if(openId){const d=$('work-'+openId)?.querySelector('details');if(d)d.open=true;}
  setOptions('page',Object.fromEntries(Array.from({length:pages},(_,i)=>[i+1,`${i+1} / ${pages}`])),state.page);
  $('previous').disabled=state.page<=1;$('next').disabled=state.page>=pages;
  const chips=[];const add=(key,label,value='')=>chips.push(`<button type="button" data-clear="${key}" data-value="${escapeHTML(value)}">${escapeHTML(label)} ×</button>`);
  if(state.work)add('work',t.workFilter);if(state.q)add('q',state.q);
  for(const k of ['status','imprint'])for(const v of state[k])add(k,k==='status'?t.statuses[v]:imprintName(v),v);
  if(state.from||state.to)add('years',`${t.year}: ${state.from||'…'}–${state.to||'…'}`);
  if(state.author)add('author',`${t.author}: ${state.author}`);if(state.artist)add('artist',`${t.artist}: ${state.artist}`);
  if(state.min!==''||state.max!=='')add('volumes',`${t.volumes}: ${state.min||'0'}–${state.max||'…'}`);
  for(const k of ['web','cd','side','saved'])if(state[k])add(k,t.extras[k]);
  $('active-filters').innerHTML=chips.join('');history.replaceState(null,'',stateURL());
}
function apply(){state.page=1;render();}
function notify(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').classList.add('visible');toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600);}
async function copyURL(url){try{await navigator.clipboard.writeText(String(url));notify(text[lang].copied);}catch{notify(text[lang].copyError);}}
function showCover(w,i){coverWork=w;coverIndex=i;const v=w.volumes[i];$('large-cover').src=v.cover;$('large-cover').alt=coverAlt(w,v);$('cover-caption').textContent=v.title+ (v.date?' · '+v.date.replaceAll('-','.'): '');$('cover-source').href=v.url;$('cover-prev').disabled=i===0;$('cover-next').disabled=i===w.volumes.length-1;if(!$('cover-dialog').open)$('cover-dialog').showModal();}
function events(){
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;localize();render();}));
  $('search-form').addEventListener('submit',e=>{e.preventDefault();clearTimeout(inputTimer);state.q=$('search').value;apply();});
  for(const [id,key]of Object.entries({'search':'q','author':'author','artist':'artist','volume-min':'min','volume-max':'max'}))$(id).addEventListener('input',()=>{state[key]=$(id).value;clearTimeout(inputTimer);inputTimer=setTimeout(apply,180);});
  for(const [id,key]of Object.entries({'search-scope':'scope','year-from':'from','year-to':'to','sort':'sort'}))$(id).addEventListener('change',()=>{state[key]=$(id).value;apply();});
  $('filters').addEventListener('change',e=>{const el=e.target;if(el.dataset.facet){const k=el.dataset.facet;state[k]=el.checked?[...state[k],el.value]:state[k].filter(x=>x!==el.value);apply();}else if(el.dataset.extra){state[el.dataset.extra]=el.checked;apply();}});
  $('reset').addEventListener('click',()=>{clearTimeout(inputTimer);state=initial();localize();render();});
  $('active-filters').addEventListener('click',e=>{const b=e.target.closest('[data-clear]');if(!b)return;const k=b.dataset.clear;if(k==='years'){state.from='';state.to='';}else if(k==='volumes'){state.min='';state.max='';}else if(Array.isArray(state[k]))state[k]=state[k].filter(x=>x!==b.dataset.value);else state[k]=initial()[k];localize();apply();});
  for(const [id,delta]of [['previous',-1],['next',1]])$(id).addEventListener('click',()=>{state.page+=delta;render();document.querySelector('.results').scrollIntoView({block:'start'});});
  $('page').addEventListener('change',()=>{state.page=+$('page').value;render();document.querySelector('.results').scrollIntoView({block:'start'});});
  $('works').addEventListener('click',e=>{const article=e.target.closest('.work');if(!article)return;const w=works.find(w=>w.id===article.dataset.id),b=e.target.closest('button'),a=e.target.closest('a');
    if(b?.classList.contains('bookmark')){favorites.has(w.id)?favorites.delete(w.id):favorites.add(w.id);try{localStorage.setItem('kln-saved',JSON.stringify([...favorites]));}catch{}render();}
    else if(b?.dataset.cover!==undefined)showCover(w,+b.dataset.cover);
    else if(b?.classList.contains('work-link'))copyURL(stateURL({...initial(),work:w.id}));
    else if(a?.dataset.person){e.preventDefault();state={...initial(),[a.dataset.person]:a.dataset.name};localize();render();document.querySelector('.results').scrollIntoView();}
    else if(a?.dataset.brand){e.preventDefault();state={...initial(),imprint:[a.dataset.brand]};localize();render();document.querySelector('.results').scrollIntoView();}
  });
  $('cover-close').addEventListener('click',()=>$('cover-dialog').close());$('cover-prev').addEventListener('click',()=>showCover(coverWork,coverIndex-1));$('cover-next').addEventListener('click',()=>showCover(coverWork,coverIndex+1));
  $('cover-dialog').addEventListener('click',e=>{if(e.target===$('cover-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
  $('cover-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'&&coverIndex>0){e.preventDefault();showCover(coverWork,coverIndex-1);}if(e.key==='ArrowRight'&&coverIndex<coverWork.volumes.length-1){e.preventDefault();showCover(coverWork,coverIndex+1);}});
  window.addEventListener('popstate',()=>{parseURL();localize();render();});
}
async function start(){parseURL();try{const r=await fetch('data/catalog.json');if(!r.ok)throw Error(r.status);data=await r.json();works=data.works;for(const w of works){const s=searchable(w);w._search=Object.fromEntries(Object.entries(s).map(([k,v])=>[k,normalize(v)]));w._search.all=normalize(Object.values(s).join(' ')+w.imprint+' '+(koreanImprints[w.imprint]||'')+' '+(japaneseImprints[w.imprint]||''));}localize();events();if(matchMedia('(max-width:650px)').matches)$('filters').open=false;render();}catch(e){$('error').hidden=false;$('error').textContent=text[lang].error;$('result-count').textContent='';console.error(e);}}
start();
