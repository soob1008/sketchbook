import BottomMenu from "@components/lab/bottomMenu";
import Header from "@components/lab/header";
import ItemList from "@components/lab/itemList";

const MainPage = () => {
  return (
    <>
      <Header />
      <main>
        <div style={{ paddingTop: "50px" }}>
          <div style={{ padding: "30px 12px" }}>
            <h2
              style={{
                marginBottom: "14px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              이 콘텐츠 좋아하실 것 같아요
            </h2>
            <ItemList />
          </div>
        </div>
      </main>
      <BottomMenu />
    </>
  );
};

export default MainPage;