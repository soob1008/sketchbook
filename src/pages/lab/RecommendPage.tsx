import ImageList, { ImageContent } from "@components/lab/imageList";
import { useEffect, useState } from "react";
import Header from "@components/lab/header";
import Layout from "@components/lab/layout/Layout";

const RecommendPage = () => {
  const [contents, setContents] = useState<ImageContent[]>([]);

  useEffect(() => {
    (async () => {
      // FIXME: api 주소 변경
      const response = await fetch(
        "http://localhost:3000/sketchbook/data/ohouse.json",
      );
      const data = await response.json();
      setContents(data);
    })();
  }, []);

  return (
    <div>
      <Header />
      <Layout>
        <ImageList lists={contents} imageHeight={234} />
      </Layout>
    </div>
  );
};

export default RecommendPage;