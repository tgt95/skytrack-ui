import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n,p as r}from"./iframe--KtBdRmh.js";import{a as i,o as a}from"./utils-_LRzY2K4.js";import{a as o,c as s,d as c,i as l,l as u,n as d,o as f,r as p,s as m,t as h,u as g}from"./code-block-Bcdv660g.js";import{r as _,t as v}from"./button-DiJ-gK1R.js";function y({code:e,title:t,lineNumbers:n=!1,startLine:r=1,size:i=`default`,language:a=`typescript`}){return(0,S.jsxs)(h,{className:`w-full max-w-3xl`,size:i,lineNumbers:n,startLine:r,children:[(0,S.jsxs)(f,{children:[(0,S.jsx)(u,{children:t}),(0,S.jsxs)(d,{children:[(0,S.jsx)(s,{}),(0,S.jsx)(l,{value:e})]})]}),(0,S.jsx)(p,{language:a,children:e})]})}function b(){let[e,t]=x.useState(!0),n=c(C,`typescript`);return(0,S.jsxs)(`div`,{className:`flex w-full max-w-3xl flex-col gap-3`,children:[(0,S.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,S.jsx)(v,{size:`xs`,variant:`outline`,onClick:()=>t(e=>!e),children:e?`Tắt line index (API prop)`:`Mở line index (API prop)`}),(0,S.jsxs)(`span`,{className:`font-mono text-xs text-muted-foreground`,children:[`lineNumbers=`,String(e)]})]}),(0,S.jsxs)(h,{lineNumbers:e,children:[(0,S.jsxs)(f,{children:[(0,S.jsx)(u,{children:`route-distance.ts`}),(0,S.jsxs)(d,{children:[(0,S.jsx)(s,{}),(0,S.jsx)(l,{value:C})]})]}),(0,S.jsx)(p,{children:n.map((e,t)=>(0,S.jsx)(m,{children:e},t))})]})]})}var x,S,C,w,T,E,D;function O(){return(O=t((()=>{x=e(r(),1),g(),_(),S=n(),C=`export function estimateRouteDistance(points: Point[]) {
  return points.reduce((total, point, index) => {
    if (index === 0) return total
    return total + distanceBetween(points[index - 1], point)
  }, 0)
}`,w=`$ npm run typecheck
> skytrack-ui@0.1.5 typecheck
> tsc -p tsconfig.json

✓ No type errors found`,T=`type Mission = {
  id: string
  status: 'planned' | 'active' | 'complete'
}

const isReady = (mission: Mission) => mission.status === 'planned'`,E=`from typing import Any, Iterator

def scenario(ctx: Any) -> Iterator[Any]:
    yield takeoff(alt_m=2.5)
    yield fly_to(north=12, east=3.5, alt_m=2.5)
    yield land()`,D={id:`code-block`,title:`Code Block`,description:`Display code, terminal output, and diffs with optional copy, line numbers, and syntax highlighting.`,group:`Data Display`,variants:[{name:`Default`,render:()=>(0,S.jsx)(y,{code:C,title:`route-distance.ts`})},{name:`Line numbers`,render:()=>(0,S.jsx)(y,{code:C,title:`route-distance.ts · lines 12–17`,lineNumbers:!0,startLine:12})},{name:`Toggle line numbers`,render:()=>(0,S.jsx)(b,{})},{name:`Diff`,render:()=>(0,S.jsxs)(h,{className:`w-full max-w-3xl`,children:[(0,S.jsxs)(f,{children:[(0,S.jsx)(u,{children:`mission-status.diff`}),(0,S.jsx)(d,{children:(0,S.jsx)(l,{value:`- status = "draft"
+ status = "planned"`})})]}),(0,S.jsxs)(p,{children:[(0,S.jsx)(m,{variant:`removed`,children:`status = "draft"`}),(0,S.jsx)(m,{variant:`added`,children:`status = "planned"`}),(0,S.jsx)(m,{variant:`highlighted`,children:` notify dispatch team`})]})]})},{name:`Small terminal output`,render:()=>(0,S.jsxs)(h,{size:`sm`,variant:`destructive`,className:`w-full max-w-3xl`,children:[(0,S.jsxs)(f,{children:[(0,S.jsx)(u,{children:`Terminal · command failed`}),(0,S.jsx)(d,{children:(0,S.jsx)(l,{value:w})})]}),(0,S.jsx)(p,{wrap:!0,className:`max-h-52 overflow-y-auto`,children:w.split(`
`).map((e,t)=>(0,S.jsx)(m,{children:e||`\xA0`},t))}),(0,S.jsx)(o,{className:`justify-end`,children:(0,S.jsx)(v,{size:`xs`,variant:`ghost`,children:`Retry command`})})]})},{name:`Syntax highlighting`,render:()=>(0,S.jsx)(y,{code:T,title:`mission.ts`,lineNumbers:!0})},{name:`Python syntax highlighting`,render:()=>(0,S.jsx)(y,{code:E,title:`script.py`,language:`python`,lineNumbers:!0})}]}})))()}var k,A,j,M,N,P,F,I,L,R;function z(){return(z=t((()=>{a(),O(),k=n(),A={title:`Data Display/Code Block`,parameters:{docs:{description:{component:`Display code, terminal output, and diffs with optional copy, line numbers, and syntax highlighting.`}}}},j={name:`Default`,render:()=>(0,k.jsx)(i,{name:`Default`,children:D.variants[0].render()})},M={name:`Line numbers`,render:()=>(0,k.jsx)(i,{name:`Line numbers`,children:D.variants[1].render()})},N={name:`Toggle line numbers`,render:()=>(0,k.jsx)(i,{name:`Toggle line numbers`,children:D.variants[2].render()})},P={name:`Diff`,render:()=>(0,k.jsx)(i,{name:`Diff`,children:D.variants[3].render()})},F={name:`Small terminal output`,render:()=>(0,k.jsx)(i,{name:`Small terminal output`,children:D.variants[4].render()})},I={name:`Syntax highlighting`,render:()=>(0,k.jsx)(i,{name:`Syntax highlighting`,children:D.variants[5].render()})},L={name:`Python syntax highlighting`,render:()=>(0,k.jsx)(i,{name:`Python syntax highlighting`,children:D.variants[6].render()})},R=[`Default`,`LineNumbers`,`ToggleLineNumbers`,`Diff`,`SmallTerminalOutput`,`SyntaxHighlighting`,`PythonSyntaxHighlighting`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  render: () => <VariantBlock name={'Default'}>{demo.variants[0].render()}</VariantBlock>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Line numbers',
  render: () => <VariantBlock name={'Line numbers'}>{demo.variants[1].render()}</VariantBlock>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Toggle line numbers',
  render: () => <VariantBlock name={'Toggle line numbers'}>{demo.variants[2].render()}</VariantBlock>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Diff',
  render: () => <VariantBlock name={'Diff'}>{demo.variants[3].render()}</VariantBlock>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Small terminal output',
  render: () => <VariantBlock name={'Small terminal output'}>{demo.variants[4].render()}</VariantBlock>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Syntax highlighting',
  render: () => <VariantBlock name={'Syntax highlighting'}>{demo.variants[5].render()}</VariantBlock>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Python syntax highlighting',
  render: () => <VariantBlock name={'Python syntax highlighting'}>{demo.variants[6].render()}</VariantBlock>
}`,...L.parameters?.docs?.source}}}})))()}z();export{j as Default,P as Diff,M as LineNumbers,L as PythonSyntaxHighlighting,F as SmallTerminalOutput,I as SyntaxHighlighting,N as ToggleLineNumbers,R as __namedExportsOrder,A as default};