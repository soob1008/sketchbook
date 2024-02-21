import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const ItemList = () => {
  return (
    <Items>
      <Item>
        <Link to="/lab/detail">
          <span className="img">
            <img
              src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/167151474871524331.JPG?w=512&h=512&c=c"
              alt=""
            />
          </span>
          <span className="title">취향에 맞는 공간에서 사는 기쁨</span>
        </Link>
      </Item>
      <Item>
        <Link to="/lab/detail">
          <span className="img">
            <img
              src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/164965165504198815.png?w=512&h=512&c=c"
              alt=""
            />
          </span>
          <span className="title">
            영화에 나올 것 같은 <br />
            부자집
          </span>
        </Link>
      </Item>
      <Item>
        <Link to="/lab/detail">
          <span className="img">
            <img
              src="https://image.ohou.se/i/bucketplace-v2-development/uploads/projects/cover_images/165580403756454453.png?w=512&h=512&c=c"
              alt=""
            />
          </span>
          <span className="title">깔끔한 오피스텔</span>
        </Link>
      </Item>
      <Item>
        <Link to="/lab/detail">
          <span className="img">
            <img
              src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/165389579606240336.jpg?w=512&h=512&c=c"
              alt=""
            />
          </span>
          <span className="title">집이 예쁘네요</span>
        </Link>
      </Item>
    </Items>
  );
};

export default ItemList;

const Items = styled("ul")`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled("li")`
  width: 48.5%;
  margin-right: 3%;
  margin-top: 8%;
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  &:nth-of-type(-n + 2) {
    margin-top: 0;
  }
  .title {
    display: block;
    margin-top: 10px;
    color: #222;
    font-size: 14px;
  }
  .img {
    overflow: hidden;
    display: block;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    img {
      max-width: 100%;
    }
  }
`;