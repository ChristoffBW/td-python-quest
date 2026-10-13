// Guards saved progress: it is keyed by position ("unitIndex-lessonIndex"),
// so existing units/lessons must never be reordered, renamed or removed.
// New content must only be APPENDED (new units at the end, new lessons at the end of a unit).
// Usage:  node tools/check-append-only.js          -> verify
//         node tools/check-append-only.js --update -> accept additions (appends only)
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const data=html.match(/\/\/ ==DATA==([\s\S]*)\/\/ ==\/DATA==/)[1];
const UNITS=new Function(data+';return UNITS')();
const now=UNITS.map(u=>({title:u.title,lessons:u.lessons.map(l=>l.title)}));
const lockPath=path.join(__dirname,'lessons.lock.json');
const lock=fs.existsSync(lockPath)?JSON.parse(fs.readFileSync(lockPath,'utf8')):null;
let bad=[];
if(lock){
  lock.forEach((u,ui)=>{
    if(!now[ui]) return bad.push(`unit ${ui+1} "${u.title}" was removed`);
    if(now[ui].title!==u.title) bad.push(`unit ${ui+1} renamed/reordered: "${u.title}" -> "${now[ui].title}"`);
    u.lessons.forEach((t,li)=>{
      if(now[ui].lessons[li]===undefined) bad.push(`lesson ${ui+1}.${li+1} "${t}" was removed`);
      else if(now[ui].lessons[li]!==t) bad.push(`lesson ${ui+1}.${li+1} renamed/reordered: "${t}" -> "${now[ui].lessons[li]}"`);
    });
  });
}
if(bad.length){console.error('NOT append-only — this would corrupt saved progress:\n - '+bad.join('\n - '));process.exit(1)}
const n=now.reduce((a,u)=>a+u.lessons.length,0);
if(!lock||process.argv.includes('--update')){fs.writeFileSync(lockPath,JSON.stringify(now,null,1));console.log('lock written:',now.length,'units,',n,'lessons')}
else console.log('OK: append-only check passed ('+now.length+' units, '+n+' lessons)');
