import styled from "@emotion/styled";
import theme from "../../styles/theme";

interface TitlePops {
  title: string;
  text?: string;
}

const Title = ({ title, text }: TitlePops) => {
  return (
    <TitleWrapper>
      <h2>
        {title}
        <span />
      </h2>
      {text && <p>{text}</p>}
    </TitleWrapper>
  );
};

export default Title;

const TitleWrapper = styled("div")`
  margin-bottom: 2rem;
  h2 {
    display: inline-block;
    position: relative;
    font-size: 2.8rem;

    span {
      display: block;
      position: absolute;
      top: 0.8rem;
      right: -0.6rem;
      width: 100%;
      height: 2.2rem;
      background-color: ${theme.color.primary};
      opacity: 0.3;
      z-index: -1;
    }
  }
  p {
    margin-top: 1.2rem;
  }
`;