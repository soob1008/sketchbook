import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { ImageListItem } from "./type";
import { Skeleton } from "antd";
import { useState } from "react";

interface ImageListProps {
  lists: ImageListItem[];
}

const ImageList = ({ lists }: ImageListProps) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <ImageListWrapper>
        {lists.map((it: ImageListItem) => (
          <ListItem>
            {/*<Skeleton.Image active={true}></Skeleton.Image>*/}
            <Link to={it.route || ""}>
              <img src={it.imageUrl} alt="테스트이미지" />
              <h3>{it.title}</h3>
            </Link>
          </ListItem>
        ))}
      </ImageListWrapper>
    </>
  );
};

export default ImageList;

const ImageListWrapper = styled("ul")(() => ({
  display: "flex",
  flexWrap: "wrap",
}));

const ListItem = styled("li")(() => ({
  width: "22.7%",
  margin: "3% 3% 0 0",
  "&:nth-of-type(4n)": {
    marginRight: 0,
  },
  "&:nth-of-type(-4+3)": {
    marginTop: 0,
  },
  h3: {
    marginTop: "1rem",
    fontSize: "1.6rem",
  },
}));