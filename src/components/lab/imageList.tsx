import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import SkeletonImage from "@ui//skeleton/SkeletonImage";
import { useState } from "react";

export type ImageContent = {
  id: number;
  title: string;
  thumbnail: string;
  userName?: string;
  like?: boolean;
  likeCount?: number;
  bookMark: boolean;
  link: string;
};

interface ImageListProps {
  lists: ImageContent[];
  imageHeight?: number;
}

const ImageList = ({ lists, imageHeight }: ImageListProps) => {
  const [isImageLoad, setIsImageLoad] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoad(true);
  };

  return (
    <Items>
      {lists.map((list) => (
        <Item key={list.id}>
          <Link to={list.link}>
            <span className="img">
              <img
                src={list.thumbnail}
                alt={list.title}
                onLoad={handleImageLoad}
                style={{
                  display: isImageLoad ? "block" : "none",
                }}
              />
              {!isImageLoad && <SkeletonImage />}
            </span>
            <span className="title">{list.title}</span>
          </Link>
        </Item>
      ))}
    </Items>
  );
};

export default ImageList;

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
    height: 234px;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;