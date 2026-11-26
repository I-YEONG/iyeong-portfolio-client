import comet from '../assets/background-comet.png';
import constellation3 from '../assets/background-constellation-03.svg';
import stars from '../assets/background-stars.svg';
import shade from '../assets/background-shade.png';
import styles from './login.module.css';
import { LoginConstellations } from './LoginConstellations';
/** Figma의 배경 장식만 사용한다. 카드·텍스트·입력 UI와 기기 상태바는 이미지에 포함하지 않는다. */
export function LoginBackground({ phase = 'done', generation = 0, }) {
    return (<div aria-hidden="true" className={styles.background}>
      <div className={styles.artwork}>
        <div key={generation} className={styles.comet} data-phase={phase}>
          <img src={comet} alt=""/>
        </div>
        <img src={stars} alt="" className={styles.stars}/>
        <LoginConstellations />
        <img src={constellation3} alt="" className={styles.constellation3}/>
        <img src={shade} alt="" className={styles.leftShade}/>
        <img src={shade} alt="" className={styles.rightShade}/>
        <div className={styles.topShade}/>
      </div>
    </div>);
}
