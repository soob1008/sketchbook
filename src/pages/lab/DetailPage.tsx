import Layout from "@components/lab/layout/Layout";

const DetailPage = () => {
  return (
    <Layout>
      <div className="transition-container">
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "yellow",
          }}
        ></div>
      </div>
    </Layout>
  );
};

export default DetailPage;