import greenEmpty from '@/assets/wish/stamps/star-green-empty.svg';
import greenFilled from '@/assets/wish/stamps/star-green-filled.svg';
import cyanEmpty from '@/assets/wish/stamps/star-cyan-empty.svg';
import cyanFilled from '@/assets/wish/stamps/star-cyan-filled.svg';
import pinkEmpty from '@/assets/wish/stamps/star-pink-empty.svg';
import pinkFilled from '@/assets/wish/stamps/star-pink-filled.svg';
import yellowEmpty from '@/assets/wish/stamps/star-yellow-empty.svg';
import yellowFilled from '@/assets/wish/stamps/star-yellow-filled.svg';
import purpleEmpty from '@/assets/wish/stamps/star-purple-empty.svg';
import purpleFilled from '@/assets/wish/stamps/star-purple-filled.svg';
import whiteEmpty from '@/assets/wish/stamps/star-white-empty.svg';
import whiteFilled from '@/assets/wish/stamps/star-white-filled.svg';
import connectionOne from '@/assets/wish/stamps/connection-1.svg';
import connectionTwo from '@/assets/wish/stamps/connection-2.svg';
import connectionThree from '@/assets/wish/stamps/connection-3.svg';
import connectionFour from '@/assets/wish/stamps/connection-4.svg';
import connectionFive from '@/assets/wish/stamps/connection-5.svg';
/** Figma 원본을 내보낸 SVG. 빈 별은 점선의 꼭짓점 배치를 보존하도록 윤곽으로 내보냈다. */
export const STAMP_STARS = [
    {
        empty: greenEmpty,
        filled: greenFilled,
        x: 29.1104,
        y: 274.4346,
        emptyGeometry: { x: 25.1025, y: 263.2588, width: 133, height: 125 },
        left: 39,
        top: 285,
        tooltipX: 109,
        tooltipY: 386,
    },
    {
        empty: cyanEmpty,
        filled: cyanFilled,
        x: 241.1104,
        y: 235.4346,
        emptyGeometry: { x: 237.1025, y: 224.2588, width: 133, height: 125 },
        left: 251,
        top: 246,
        tooltipX: 323,
        tooltipY: 342,
    },
    {
        empty: pinkEmpty,
        filled: pinkFilled,
        x: 129.1104,
        y: 427.4346,
        emptyGeometry: { x: 125.1025, y: 416.2588, width: 133, height: 125 },
        left: 139,
        top: 438,
        tooltipX: 211,
        tooltipY: 536,
    },
    {
        empty: yellowEmpty,
        filled: yellowFilled,
        x: 273.1104,
        y: 505.4346,
        emptyGeometry: { x: 269.1025, y: 494.2588, width: 133, height: 125 },
        left: 283,
        top: 516,
        tooltipX: 305,
        tooltipY: 619,
    },
    {
        empty: purpleEmpty,
        filled: purpleFilled,
        x: 2.1104,
        y: 561.4346,
        emptyGeometry: { x: -1.8975, y: 550.2588, width: 133, height: 125 },
        left: 12,
        top: 572,
        tooltipX: 86,
        tooltipY: 671,
    },
    {
        empty: whiteEmpty,
        filled: whiteFilled,
        x: 187.7715,
        y: 668.459,
        emptyGeometry: { x: 183.1016, y: 656.2598, width: 139, height: 131 },
        left: 198,
        top: 679,
        tooltipX: 249,
        tooltipY: 786,
    },
];
export const STAMP_CONNECTIONS = [
    { src: connectionOne, x: 122, y: 298, width: 137.001, height: 28.0005 },
    { src: connectionTwo, x: 221, y: 328.5, width: 70.5005, height: 121.501 },
    { src: connectionThree, x: 230, y: 500.5, width: 74.5004, height: 46.5004 },
    { src: connectionFour, x: 91.5, y: 500.5, width: 77, height: 83.5 },
    {
        src: connectionFive,
        x: -1.5,
        y: -1.5,
        width: 11.2139,
        height: 115.2,
        transform: 'matrix(-0.7540582 -0.6568076 0.6568076 -0.7540582 255.5 692)',
    },
];
/** Figma의 393px 폭을 반응형 컨테이너 단위로 환산한다. */
export function cqw(value) {
    return `${(value / 393) * 100}cqw`;
}
