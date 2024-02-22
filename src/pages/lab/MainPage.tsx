import BottomMenu from "@components/lab/bottomMenu";
import Header from "@components/lab/header";
import ItemList, { ImageContent } from "@components/lab/imageList";
import Layout from "@components/lab/layout/Layout";

const mainList: ImageContent[] = [
  {
    id: 1,
    title: "성수에 비밀스럽게 자리한 건축가들의 아지트",
    userName: "saamsoon",
    like: false,
    likeCount: 6,
    thumbnail:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/170280088986301961.jpg?w=512&h=684&c=c",
    bookMark: false,
    link: "/lab/detail",
  },
];

const MainPage = () => {
  return (
    <div>
      <Header />
      <Layout>
        <>
          <h2
            style={{
              marginBottom: "14px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            이 콘텐츠 좋아하실 것 같아요
          </h2>
          <ItemList lists={mainList} />
        </>
      </Layout>
      <BottomMenu />
    </div>
  );
};

export default MainPage;