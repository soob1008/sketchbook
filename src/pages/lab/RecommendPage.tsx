import ImageList, { ImageContent } from "@components/lab/imageList";
import { useEffect, useState } from "react";
import Header from "@components/lab/header";
import Layout from "@components/lab/layout/Layout";
import SkeletonImage from "@ui//skeleton/SkeletonImage";

const RecommendPage = () => {
  const [contents, setContents] = useState<ImageContent[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://soob1008.github.io/sketchbook/data/ohouse.json",
      );
      const data = await response.json();
      const updatedData = data.map((item: ImageContent) => ({
        ...item,
        thumbnail: "", // 이미지 URL에 delay=true를 추가하여 늦게 로드되도록 함
      }));

      setContents(updatedData);

      setTimeout(() => {
        setContents(data);
      }, 2000);
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