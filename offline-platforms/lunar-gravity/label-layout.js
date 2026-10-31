// Arrange projected inspection callouts without letting their labels obscure one another.
// The bounds describe the scene itself, excluding navigation and telemetry rails.
export function layoutCallouts(items, bounds) {
  const placed = [];
  const positions = new Map();
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(Math.max(lo, hi), v));
  const overlap = (a,b) => Math.max(0, Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)) * Math.max(0, Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y));
  for (const item of items) {
    if (item.hidden) continue;
    const w=Math.min(item.width, Math.max(1,bounds.right-bounds.left));
    const h=item.height;
    // Prefer the upper right; alternate around the anchor when space is tight.
    const candidates=[[30,-34],[30,18],[-w-30,-34],[-w-30,18],[30,-62],[-w-30,-62],[30,46],[-w-30,46]];
    let best, bestScore=Infinity;
    candidates.forEach(([dx,dy],priority)=>{
      const rawX=item.x+dx,rawY=item.y+dy;
      const rect={x:clamp(rawX,bounds.left,bounds.right-w),y:clamp(rawY,bounds.top,bounds.bottom-h),width:w,height:h};
      const displacement=Math.abs(rect.x-rawX)+Math.abs(rect.y-rawY);
      const collisions=placed.reduce((sum,other)=>sum+overlap({x:rect.x-5,y:rect.y-4,width:w+10,height:h+8},other),0);
      const anchorCollision=item.x>=rect.x-8&&item.x<=rect.x+w+8&&item.y>=rect.y-8&&item.y<=rect.y+h+8?1000:0;
      const score=collisions*30+anchorCollision+displacement*2+priority*4;
      if(score<bestScore){best=rect;bestScore=score;}
    });
    positions.set(item.id,best);placed.push(best);
  }
  return positions;
}
