(() => {
  if (!['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
    document.querySelector('#showcase').textContent = 'This demonstration is available on a local development server only.';
    return;
  }
  const image = (width, height, color = '#dcdbdb', caption) => ({
    type: 'image', width, height, caption, alt: `${width} by ${height} layout fixture`,
    src: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" text-anchor="middle" font-size="24" fill="#333035">${width} × ${height}</text></svg>`)}`
  });
  const blocks = [];
  ['full-bleed', '0-column', '1-column'].forEach(margin => blocks.push({ type:'big', margin, label:`Big ${margin}`, media:image(1200, 400, '#dcdbdb', `Big: ${margin}`) }));
  ['full-bleed', '0-column', '1-column'].forEach(margin => ['left','center','right'].forEach(align => blocks.push({ type:'midsize', margin, align, span:4, label:`Midsize ${margin} ${align}`, media:image(600,400,'#f4bf9c', `Midsize: ${margin}, ${align}, 4 columns`) })));
  blocks.push({ type:'equal-grid', margin:'0-column', columns:3, gutter:20, aspectRatio:'4 / 3', items:[image(400,600),image(600,400),image(800,400),image(400,400),image(400,700)], label:'Equal grid with incomplete final row' });
  blocks.push({ type:'equal-grid', margin:'full-bleed', columns:4, gutter:0, aspectRatio:'1 / 1', fit:'cover', items:[image(400,600),image(600,400),image(400,400)], label:'Zero gutter cropped grid' });
  blocks.push({ type:'collage', margin:'1-column', columns:10, gutter:42, rows:[[{span:2,media:image(300,500)}, {span:5,media:image(600,400)}, {span:3,media:image(300,300)}], [{span:6,media:image(400,600)}, {span:4,stack:[image(400,200),image(400,300)],gutter:20}]], label:'Bottom aligned collage and nested stack' });
  blocks.push({ type:'collage', margin:'full-bleed', gutter:0, rows:[[{span:4,media:image(600,400)},{span:8,media:image(600,200)}]], label:'Zero gutter collage' });
  blocks.push({ type:'big', margin:'1-column', media:{ type:'video', src:'videos/safet/logo-animation.mp4', autoplay:true, loop:true, muted:true, controls:false, playsinline:true, aspectRatio:'16 / 9' }, label:'Looping video' });
  blocks.push({ type:'midsize', margin:'0-column', align:'right', span:8, media:{ type:'video', src:'videos/safet/explainer-video.mp4', controls:true, autoplay:false, muted:false, loop:false, playsinline:true, poster: image(800,450).src, aspectRatio:'16 / 9' }, label:'Controlled video with poster' });
  ProjectBlocks.render({ title:'Block system development showcase', page:{ hero:image(1600,400), description:['Local-only fixtures exercise every block type and layout option.','This page is not linked from the portfolio.'], blocks } }, document.querySelector('#showcase'));

  const close = (a,b) => Math.abs(a-b)<1;
  function inspect() {
    const results=[];
    const check=(name,pass)=>results.push({name,pass});
    const rect=node=>node.getBoundingClientRect();
    const root=document.querySelector('.pb-page');
    const css=getComputedStyle(root);
    const margin=parseFloat(css.getPropertyValue('--pb-margin'));
    check('Hero 4:1', close(rect(document.querySelector('.pb-hero')).width/rect(document.querySelector('.pb-hero')).height,4));
    check('Hero full bleed',close(rect(document.querySelector('.pb-hero')).left,0));
    check('No horizontal overflow',document.documentElement.scrollWidth<=innerWidth);
    check('Both paragraph elements',document.querySelectorAll('.pb-description p').length===2);
    check('Row early threshold',ProjectBlocks.nextRowStart(112)===175);
    check('Row late threshold',ProjectBlocks.nextRowStart(125)===244);
    check('Row boundary threshold',ProjectBlocks.nextRowStart(118.25)===175);
    const all=[...document.querySelectorAll('.pb-gallery > .pb-block')];
    all.forEach((node,index)=>{
      if(index) check(`Block ${index+1} row start`,close(rect(node).top+scrollY,ProjectBlocks.nextRowStart(rect(all[index-1]).bottom+scrollY)));
      if(node.dataset.margin==='0-column') check(`Block ${index+1} outer margin`,close(rect(node).left,margin));
      if(node.dataset.margin==='full-bleed') check(`Block ${index+1} full bleed`,close(rect(node).left,0));
    });
    document.querySelectorAll('.pb-equal-grid').forEach((grid,i)=>{
      const sizes=[...grid.querySelectorAll('.pb-media')].map(rect);
      check(`Equal grid ${i+1} dimensions`,sizes.every(r=>close(r.width,sizes[0].width)&&close(r.height,sizes[0].height)));
    });
    if(innerWidth>700) {
      document.querySelectorAll('.pb-collage-row').forEach((row,i)=>{
        const bottoms=[...row.children].map(child=>rect(child).bottom);
        check(`Collage ${i+1} baseline`,bottoms.every(b=>close(b,bottoms[0])));
      });
      document.querySelectorAll('.pb-midsize').forEach((node,i)=>{
        const area=rect(node), media=rect(node.firstChild);
        check(`Midsize ${i+1} alignment`,node.dataset.align==='left'?close(area.left,media.left):node.dataset.align==='right'?close(area.right,media.right):close((area.left+area.right)/2,(media.left+media.right)/2));
      });
    }
    const videos=[...document.querySelectorAll('video')];
    check('Video preload none',videos.every(v=>v.preload==='none'));
    check('Looping video options',videos[0].loop&&videos[0].muted&&!videos[0].controls&&videos[0].playsInline);
    check('Controlled video options',videos[1].controls&&!videos[1].loop&&Boolean(videos[1].poster));
    const failures=results.filter(r=>!r.pass);
    document.querySelector('#results').textContent=`${results.length-failures.length}/${results.length} checks passed at ${innerWidth}px${failures.length?'\n'+failures.map(r=>r.name).join('\n'):''}`;
    window.blockTestResults=results;
  }
  window.runBlockChecks=inspect;
  document.fonts.ready.then(()=>setTimeout(inspect,300));
  window.addEventListener('resize',()=>setTimeout(inspect,300));
})();
