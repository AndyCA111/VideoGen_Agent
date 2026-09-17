/* Recorded workflow player: task switching never triggers generation or a network API. */
(() => {
  'use strict';
  const root = document.querySelector('#trajectory-demo');
  const tasks = window.VIDEOGEN_DEMO;
  if (!root || !tasks?.length) return;
  const $ = s => root.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const media = document.querySelector('.teaser-media');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let taskIndex = 5, stepIndex = 0, elapsed = 0, playing = !reduced, visible = true, lastTick = performance.now();
  let stepDuration = 6500;
  const task = () => tasks[taskIndex];
  const active = () => playing && visible && !document.hidden && media.dataset.mode === 'dynamic';
  const videoHTML = (src, label) => `<video src="${esc(src)}" poster="${esc(window.VIDEOGEN_POSTERS?.[src] || '')}" aria-label="${esc(label)}" muted loop playsinline controls preload="metadata"></video>`;
  function syncMedia() {
    root.querySelectorAll('video').forEach(v => { if (active()) {v.muted = true;v.play().catch(() => {});} else v.pause(); });
    $('#demo-play').textContent = playing ? 'Ⅱ Pause' : '▶ Play';
    $('#demo-play').setAttribute('aria-label',playing ? 'Pause trajectory and videos' : 'Play trajectory and videos');
  }
  function bindVideos(scope) {
    scope.querySelectorAll('video').forEach(v => {
      v.addEventListener('error', () => {
        if(v.parentNode.querySelector('.demo-media-error')) return;
        const message=document.createElement('div');message.className='demo-media-error';message.textContent='Video could not load. Reload the page to retry.';v.parentNode.append(message);
      });
      v.addEventListener('loadedmetadata',()=>{if(scope.id==='demo-step-stage' && Number.isFinite(v.duration))stepDuration=Math.max(6500,v.duration*1000);});
    });
  }
  function renderStep(index) {
    $('#demo-step-stage').querySelectorAll('video').forEach(v=>v.pause());
    stepIndex=index;elapsed=0;stepDuration=6500;
    const s=task().steps[index];
    $('.demo-step-nav').innerHTML=task().steps.map((x,i)=>`<button type="button" data-step="${i}" ${i===index?'aria-current="step"':''} class="${i<index?'done':''}" title="${esc(x.title)}" aria-label="Step ${i+1}: ${esc(x.title)}">${String(i+1).padStart(2,'0')}${i===task().steps.length-1?' ✓':''}</button>`).join('');
    let artifact;
    if(s.video)artifact=videoHTML(s.video,s.title);
    else if(s.images.length)artifact=`<div class="demo-images">${s.images.slice(0,3).map((src,i)=>`<img src="${esc(src)}" alt="${esc(s.title)} — reference ${i+1}">`).join('')}</div>`;
    else artifact=`<pre class="demo-evidence"><span class="demo-evidence-label">${esc(s.tool)} / RETURNED EVIDENCE</span>${esc(s.result || s.reasoning)}</pre>`;
    $('#demo-step-stage').innerHTML=`<div class="demo-stage-inner"><div class="demo-step-heading"><h3>${esc(s.title)}</h3><span class="demo-tool">${esc(s.tool)}</span></div><p class="demo-step-description">${esc(s.description)}</p><div class="demo-artifact">${artifact}</div><details class="demo-trace"><summary>Inspect recorded reasoning & tool call</summary><p>${esc(s.reasoning)}</p>${s.args?`<pre>${esc(s.args)}</pre>`:''}${s.result?`<pre>${esc(s.result)}</pre>`:''}</details></div>`;
    // Reading the trace pauses playback so the open content does not disappear.
    $('.demo-trace').addEventListener('toggle',e=>{if(e.target.open){playing=false;syncMedia();}});
    bindVideos($('#demo-step-stage'));updateProgress();syncMedia();
  }
  function updateProgress(){
    const percent=100*(stepIndex+Math.min(elapsed/stepDuration,1))/task().steps.length;
    $('.demo-track span').style.width=`${percent}%`;
    $('.demo-track').setAttribute('aria-valuenow',String(Math.round(percent)));
    $('#demo-position').textContent=`${String(stepIndex+1).padStart(2,'0')} / ${String(task().steps.length).padStart(2,'0')}`;
  }
  function selectTask(index){
    root.querySelectorAll('video').forEach(v=>v.pause());taskIndex=index;
    root.style.setProperty('--accent',task().color);
    $('.demo-tabs').innerHTML=tasks.map((t,i)=>`<button type="button" data-task="${i}" aria-pressed="${i===index}" aria-controls="demo-step-stage"><b>${t.id}</b><span>${esc(t.name)}</span></button>`).join('');
    $('#demo-prompt-text').textContent=task().prompt;
    $('#demo-baseline-videos').innerHTML=task().baseline.map((src,i)=>`<figure><figcaption>SD${i+1}<span>${i===0?'Seedance 1 Pro Fast':'Seedance 2'}</span></figcaption>${src?videoHTML(src,`${task().id} — Seedance ${i+1} baseline`):'<div class="demo-missing"><strong>SD2</strong><span>Baseline clip coming soon</span></div>'}</figure>`).join('');
    $('#demo-critique').textContent=task().critique;
    bindVideos($('#demo-baseline-videos'));renderStep(0);
  }
  $('.demo-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-task]');if(b){selectTask(Number(b.dataset.task));$('.demo-tabs [aria-pressed=true]').focus({preventScroll:true});}});
  $('.demo-tabs').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?5:(taskIndex+(e.key==='ArrowRight'?1:5))%6;selectTask(i);$('.demo-tabs [aria-pressed=true]').focus({preventScroll:true});});
  $('.demo-step-nav').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(b){renderStep(Number(b.dataset.step));$('.demo-step-nav [aria-current]').focus({preventScroll:true});}});
  $('#demo-play').addEventListener('click',()=>{playing=!playing;if(playing&&elapsed>=stepDuration&&stepIndex===task().steps.length-1)renderStep(0);syncMedia();});
  $('#demo-replay').addEventListener('click',()=>{playing=true;root.querySelectorAll('video').forEach(v=>v.currentTime=0);renderStep(0);});
  document.querySelectorAll('[data-demo-mode]').forEach(b=>b.addEventListener('click',()=>{
    media.dataset.mode=b.dataset.demoMode;
    document.querySelectorAll('[data-demo-mode]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    syncMedia();
  }));
  document.addEventListener('visibilitychange',syncMedia);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncMedia();},{threshold:.05}).observe(root);
  selectTask(taskIndex);
  setInterval(()=>{
    const now=performance.now(),delta=Math.min(now-lastTick,300);lastTick=now;
    if(!active())return;
    elapsed+=delta;updateProgress();
    if(elapsed>=stepDuration){
      if(stepIndex<task().steps.length-1)renderStep(stepIndex+1);
      else{elapsed=stepDuration;playing=false;updateProgress();syncMedia();}
    }
  },100);
})();
