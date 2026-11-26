import imgRectangle from '../assets/constellation-layer-1.png';
import imgVector from '../assets/constellation-layer-2.svg';
import imgVector1 from '../assets/constellation-layer-3.svg';
import imgVector2 from '../assets/constellation-layer-4.svg';
import imgVector3 from '../assets/constellation-layer-5.svg';
import imgVector4 from '../assets/constellation-layer-6.svg';
import imgVector5 from '../assets/constellation-layer-7.svg';
import imgVector6 from '../assets/constellation-layer-8.svg';
import imgVector7 from '../assets/constellation-layer-9.svg';
import imgVector8 from '../assets/constellation-layer-10.svg';
import imgVector9 from '../assets/constellation-layer-11.svg';
import imgVector10 from '../assets/constellation-layer-12.svg';
import imgRectangle1 from '../assets/constellation-layer-13.png';
import imgVector11 from '../assets/constellation-layer-14.svg';
import imgVector12 from '../assets/constellation-layer-15.svg';
import imgVector13 from '../assets/constellation-layer-16.svg';
import imgVector14 from '../assets/constellation-layer-17.svg';
import imgVector15 from '../assets/constellation-layer-18.svg';
import imgVector16 from '../assets/constellation-layer-19.svg';
import imgVector17 from '../assets/constellation-layer-20.svg';
import imgVector18 from '../assets/constellation-layer-21.svg';
import imgVector19 from '../assets/constellation-layer-22.svg';
import imgVector20 from '../assets/constellation-layer-23.svg';
import imgVector21 from '../assets/constellation-layer-24.svg';
import imgVector22 from '../assets/constellation-layer-25.svg';
import imgVector23 from '../assets/constellation-layer-26.svg';
import imgVector24 from '../assets/constellation-layer-27.svg';
import imgVector25 from '../assets/constellation-layer-28.svg';
import imgVector26 from '../assets/constellation-layer-29.svg';
import imgVector27 from '../assets/constellation-layer-30.svg';
import imgVector28 from '../assets/constellation-layer-31.svg';
// 장식 레이어의 위치/회전은 Figma 470:1750, 470:1763, 470:1780 원본 좌표다.
const layers = [
    { src: imgRectangle, inset: '-5.75% 57.61% 73.47% -6.62%', opacity: 0.23 },
    { src: imgVector, inset: '-3.72% 83.02% 102% 13.14%', opacity: 0.23 },
    { src: imgVector1, inset: '5.18% 80.1% 91.77% 13.25%', opacity: 0.23 },
    { src: imgVector2, inset: '1.84% 98.29% 96.36% -2.14%', opacity: 0.23 },
    { src: imgVector3, inset: '8.46% 62.05% 90.26% 35.19%', opacity: 0.23 },
    { src: imgVector4, inset: '15.48% 77.61% 82.93% 19%', opacity: 0.23 },
    { src: imgVector5, inset: '-1.66% 82.84% 94.87% 15.17%', opacity: 0.23 },
    { src: imgVector6, inset: '3.5% 88.27% 92.89% 0.88%', opacity: 0.23 },
    { src: imgVector7, inset: '22.66% 69.84% 75.55% 26.27%', opacity: 0.23 },
    { src: imgVector8, inset: '16.89% 71.56% 77.44% 23.32%', opacity: 0.23 },
    { src: imgVector9, inset: '8.1% 79.93% 85.14% 17.81%', opacity: 0.23 },
    { src: imgVector10, inset: '9.59% 64.57% 84.52% 22.43%', opacity: 0.23 },
    {
        src: imgRectangle1,
        inset: '3.52% -32.12% 52.94% 36.13%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(59.2301cqw,51.8577cqh)] rotate-[-49.27deg] w-[hypot(-40.7699cqw,48.1423cqh)]',
    },
    {
        src: imgVector11,
        inset: '26.8% 15.66% 68.26% 73.59%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(54.7071cqw,47.2452cqh)] rotate-[-49.27deg] w-[hypot(-45.2929cqw,52.7548cqh)]',
    },
    {
        src: imgVector12,
        inset: '38.91% 5.29% 58.49% 89.06%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(54.2282cqw,46.7642cqh)] rotate-[-49.27deg] w-[hypot(-45.7718cqw,53.2358cqh)]',
    },
    {
        src: imgVector13,
        inset: '18.04% 38.35% 79.99% 57.37%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(54.2348cqw,46.7708cqh)] rotate-[-49.27deg] w-[hypot(-45.7652cqw,53.2292cqh)]',
    },
    {
        src: imgVector14,
        inset: '14.8% 5.71% 82.02% 87.38%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(54.2829cqw,46.8191cqh)] rotate-[-49.27deg] w-[hypot(-45.7171cqw,53.1809cqh)]',
    },
    {
        src: imgVector15,
        inset: '30.37% 1.49% 61.1% 79.34%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(65.7291cqw,58.7127cqh)] rotate-[-49.27deg] w-[hypot(-34.2709cqw,41.2873cqh)]',
    },
    {
        src: imgVector16,
        inset: '18.33% 6.62% 72.8% 75.72%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(23.9835cqw,18.9582cqh)] rotate-[-49.27deg] w-[hypot(-76.0165cqw,81.0418cqh)]',
    },
    {
        src: imgVector17,
        inset: '11.79% 12.59% 76.19% 61.76%',
        opacity: 0.7,
        transform: '-scale-x-100 flex-none h-[hypot(48.5608cqw,41.1752cqh)] rotate-[-49.27deg] w-[hypot(-51.4392cqw,58.8248cqh)]',
    },
    {
        src: imgRectangle,
        inset: '69.84% -3.35% 0.69% 40.97%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-55.4582cqw,62.0849cqh)] rotate-[41.09deg] w-[hypot(44.5418cqw,37.9151cqh)]',
    },
    {
        src: imgVector18,
        inset: '75.5% 13.24% 22.66% 82.75%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-45.8247cqw,52.6613cqh)] rotate-[41.09deg] w-[hypot(54.1753cqw,47.3387cqh)]',
    },
    {
        src: imgVector19,
        inset: '80.57% 21.12% 16.19% 71.84%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-46.3884cqw,53.2264cqh)] rotate-[41.09deg] w-[hypot(53.6116cqw,46.7736cqh)]',
    },
    {
        src: imgVector20,
        inset: '75.16% 27.84% 22.94% 68.04%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-46.8972cqw,53.7351cqh)] rotate-[41.09deg] w-[hypot(53.1028cqw,46.2649cqh)]',
    },
    {
        src: imgVector21,
        inset: '87.43% 14.4% 11.21% 82.66%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-46.8378cqw,53.6758cqh)] rotate-[41.09deg] w-[hypot(53.1622cqw,46.3242cqh)]',
    },
    {
        src: imgVector22,
        inset: '87.72% 30.74% 10.61% 65.63%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-47.0083cqw,53.8459cqh)] rotate-[41.09deg] w-[hypot(52.9917cqw,46.1541cqh)]',
    },
    {
        src: imgVector23,
        inset: '77.12% 15.34% 18.57% 76.26%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-86.5632cqw,89.4432cqh)] rotate-[41.09deg] w-[hypot(13.4368cqw,10.5568cqh)]',
    },
    {
        src: imgVector24,
        inset: '76.79% 23.94% 18.69% 66.02%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-38.6656cqw,45.3278cqh)] rotate-[41.09deg] w-[hypot(61.3344cqw,54.6722cqh)]',
    },
    {
        src: imgVector25,
        inset: '93.44% 34.03% 4.65% 61.84%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-46.5335cqw,53.3717cqh)] rotate-[41.09deg] w-[hypot(53.4665cqw,46.6283cqh)]',
    },
    {
        src: imgVector26,
        inset: '89.5% 28.82% 6.11% 62.19%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-67.6909cqw,73.3716cqh)] rotate-[41.09deg] w-[hypot(32.3091cqw,26.6284cqh)]',
    },
    {
        src: imgVector27,
        inset: '83.26% 24.15% 12.39% 67.32%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-84.988cqw,88.1594cqh)] rotate-[41.09deg] w-[hypot(15.012cqw,11.8406cqh)]',
    },
    {
        src: imgVector28,
        inset: '85.16% 17.04% 8.53% 69.27%',
        opacity: 0.4,
        transform: 'flex-none h-[hypot(-46.1482cqw,52.9858cqh)] rotate-[41.09deg] w-[hypot(53.8518cqw,47.0142cqh)]',
    },
];
export function LoginConstellations() {
    return layers.map((layer) => (<div key={`${layer.src}:${layer.inset}`} className="absolute flex items-center justify-center" style={{ inset: layer.inset, containerType: 'size' }}>
      <div className={layer.transform ?? 'size-full'} style={{ opacity: layer.opacity }}>
        <img src={layer.src} alt="" className="block size-full max-w-none"/>
      </div>
    </div>));
}
