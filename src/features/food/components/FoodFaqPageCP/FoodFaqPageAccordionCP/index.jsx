import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { foodAnswerStyle, foodAnswerWrapperStyle, foodContainerStyle, foodHeaderStyle, foodIconStyle, foodItemStyle, foodQuestionStyle } from "./style";

/**
 *
 * @param {{Array}} items 질문과 답변의 배열. 객체 배열로, 각 객체는 id, question, answer 속성을 가짐.
 * @returns SimpleAccordionCP는 질문을 클릭하면 답변이 드랍다운 형태로 나타나는 컴포넌트.
 */
function FoodSimpleAccordionCP({ items }) {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    if (openItem === id) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }
  };

  return (
    <div css={foodContainerStyle()}>
      {items.map((item) => {
        const isOpen = openItem === item.id;

        return (
          <div key={item.id} css={foodItemStyle()}>
            <button css={foodHeaderStyle()} onClick={() => toggleItem(item.id)}>
              <span css={foodQuestionStyle()}>{item.question}</span>
              <FontAwesomeIcon css={foodIconStyle(isOpen)} icon={faPlay} />
            </button>
            <div css={foodAnswerWrapperStyle(isOpen)}>
              <div css={foodAnswerStyle(isOpen)}>{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FoodSimpleAccordionCP;
