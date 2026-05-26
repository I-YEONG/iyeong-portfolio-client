/**
 * @typedef {'text'
 *   |'black900'|'black800'|'black600'|'black400'|'black200'|'black100'
 *   |'green'|'deepGreen'|'orange'|'red'|'blue'
 *   |'deepGreenBG'|'greenBG'|'orangeBG'|'redBG'|'blueBG'
 *   |'darkBG'|'darkLine'|'lightLine'
 * } ColorKey
 */

/**
 * theme에서 색상값을 가져오는 헬퍼 함수
 * @param {ColorKey} color - 가져올 색상 키 (자동완성 지원)
 * @returns {(props: {theme: {colors: object}}) => string} theme 객체를 받아 해당 색상을 반환하는 함수
 *
 * 사용 예시:
 *   ${colors('black900')}
 *   ${colors('greenBG')}
 */
export const colors =
  (color) =>
  ({ theme }) =>
    theme.colors[color];

/**
 * @typedef {'titleXLg'|'titleLg'|'titleMd'|'titleSm'
 *   |'titleXLg_B'|'titleLg_B'|'titleMd_B'|'titleSm_B'
 *   |'textXLg'|'textLg'|'textMd'
 *   |'textXLg_B'|'textLg_B'|'textMd_B'
 *   |'textXLg_L'|'textLg_L'|'textMd_L'
 *   |'captionXl'|'captionLg'|'captionMd'|'captionSm'
 *   |'captionXl_B'|'captionLg_B'|'captionMd_B'|'captionSm_B'
 *   |'captionXl_L'|'captionLg_L'|'captionMd_L'|'captionSm_L'
 * } FontKey
 */

/**
 * theme에서 폰트 스타일을 가져오는 헬퍼 함수
 * @param {FontKey} variant - 가져올 폰트 스타일 키 (자동완성 지원)
 * @returns {(props: {theme: {fonts: object}}) => object} theme 객체를 받아 해당 폰트 스타일을 반환하는 함수
 *
 * 사용 예시:
 *   ${fonts('captionSm')}
 *   ${fonts('titleLg_B')}
 */
export const fonts =
  (variant) =>
  ({ theme }) =>
    theme.fonts[variant];

/**
 * @typedef {'center'|'lowCenter'|'colCenter'
 *   |'between'|'lowBetween'|'colBetween'
 *   |'around'|'lowAround'|'colAround'
 *   |'rowCenter'|'rowBetween'|'rowAround'
 *   |'flexEnd'|'flexStart'|'colStart'|'colEnd'
 * } FlexKey
 */

/**
 * theme에서 flex 스타일을 가져오는 헬퍼 함수
 * @param {FlexKey} variant - 가져올 flex 스타일 키 (자동완성 지원)
 * @returns {(props: {theme: {flex: object}}) => object} theme 객체를 받아 해당 flex 스타일을 반환하는 함수
 *
 * 사용 예시:
 *   ${flex('center')}
 *   ${flex('between')}
 */
export const flex =
  (variant) =>
  ({ theme }) =>
    theme.flex[variant];
