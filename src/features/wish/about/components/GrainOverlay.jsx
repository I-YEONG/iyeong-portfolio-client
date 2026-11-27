import grain from '@/assets/wish/about/grain.png';
/**
 * 화면 전체를 덮는 미세한 그레인(노이즈) 질감.
 *
 * Figma 디자인에는 배경 위에 노이즈가 깔려 있는데 MCP가 이 레이어를 내보내지 않는다.
 * Figma 렌더의 픽셀을 분석해 노이즈 세기가 밝기에 비례(σ ≈ 밝기의 3%)하므로 multiply 블렌드로 재현한다.
 */
export function GrainOverlay() {
    return (<div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ backgroundImage: `url(${grain})`, backgroundRepeat: 'repeat' }}/>);
}
