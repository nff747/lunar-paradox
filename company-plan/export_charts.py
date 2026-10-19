from pathlib import Path
import json,textwrap
from PIL import Image,ImageDraw,ImageFont
from xml.sax.saxutils import escape
P=Path(__file__).parent;D=json.loads((P/'plan.json').read_text());positions=[0,1,2,3,5,6,7,8]
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
for phase in ['current','future']:
 plan=D[phase];W,H=1350,1510;im=Image.new('RGB',(W,H),'#f6f6f3');draw=ImageDraw.Draw(im);svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="100%" height="100%" fill="#f6f6f3"/>']
 def text(x,y,label,size=17,weight=False,color='#252823',anchor='la'):
  f=ImageFont.truetype(bold if weight else font,size);draw.text((x,y),label,font=f,fill=color,anchor=anchor)
  svg.append(f'<text x="{x}" y="{y+size*.8}" font-family="DejaVu Sans,sans-serif" font-size="{size}" font-weight="{700 if weight else 400}" text-anchor="{"middle" if anchor=="ma" else "start"}" fill="{color}">{escape(label)}</text>')
 text(35,25,'LUNAR PARADOX / '+('CURRENT: NEXT 90 DAYS' if phase=='current' else 'FUTURE: EVIDENCE AND FUNDING GATES'),25,True)
 text(35,65,'18 October 2026 • Planning only: targets are proposed, not achieved or guaranteed.',17)
 text(35,95,'$0 available cash • $12,000/month combined baseline • Existing hardware and skills',17)
 tile=140;gap=5;startx=35;starty=145
 for b in range(9):
  bx=startx+(b%3)*(tile*3+gap);by=starty+(b//3)*(tile*3+gap)
  for c in range(9):
   x=bx+(c%3)*tile;y=by+(c//3)*tile;hub=b==4;center=c==4
   if hub:label=plan['title'] if center else plan['pillars'][positions.index(c)]['name']
   else:
    g=plan['pillars'][positions.index(b)];label=g['name'] if center else g['actions'][positions.index(c)]['title']
   fill='#344b34' if hub and center else '#e1e7d8' if hub or center else '#ffffff';color='#ffffff' if hub and center else '#252823';weight=hub or center
   draw.rectangle((x,y,x+tile,y+tile),fill=fill,outline='#aab2a3',width=1);svg.append(f'<rect x="{x}" y="{y}" width="{tile}" height="{tile}" fill="{fill}" stroke="#aab2a3"/>')
   measure_font=ImageFont.truetype(bold if weight else font,16 if weight else 15)
   lines=[];line=''
   for word in label.split():
    candidate=(line+' '+word).strip()
    if line and draw.textlength(candidate,font=measure_font)>tile-20:lines.append(line);line=word
    else:line=candidate
   if line:lines.append(line)
   lineheight=24;yy=y+(tile-len(lines)*lineheight)/2
   for line in lines:text(x+tile/2,yy,line,16 if weight else 15,weight,color,'ma');yy+=lineheight
 text(35,1440,'Read the interactive plan for how, evidence, timing and owner of each action.',17)
 text(35,1470,'Current: choose three priorities each week. Future: funding and delivery gates override dates.',16)
 svg.append('</svg>');im.save(P/(phase+'-mandala.png'));(P/(phase+'-mandala.svg')).write_text(''.join(svg))
