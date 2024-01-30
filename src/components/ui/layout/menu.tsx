import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const MainMenu = () => {
  return (
    <MenuWrapper>
      <div className="logo">
        <h1>
          <Link to="/">Sb.kim</Link>
        </h1>
      </div>
      <ul className="gnb">
        <li>
          <Link to="/">-</Link>
        </li>
        <li>
          game
          <ul className="lnb">
            <li>
              <Link to="/tetris1">테트리스</Link>
            </li>
            <li>
              <Link to="/tetris1">지뢰찾기</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/resume">resume</Link>
        </li>
      </ul>
    </MenuWrapper>
  );
};

export default MainMenu;

const MenuWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
  width: "30rem",
  paddingTop: "5rem",
  borderRight: "1px solid #e2e2e2",
  ".logo": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "3rem",
    color: theme.color.primary,
    fontFamily: "GmarketSansMedium",
  },
  ".gnb": {
    paddingLeft: "4rem",
    "& > li": {
      marginBottom: "1.6rem",
      fontSize: "1.6rem",
      fontFamily: "GmarketSansMedium",
      "&:last-of-type(1)": {
        marginBottom: 0,
      },
    },
  },
  ".lnb": {
    marginTop: "1rem",
    paddingLeft: "1rem",
    "& > li": {
      fontSize: "1.6rem",
      fontFamily: "Pretendard",
    },
  },
}));