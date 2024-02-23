import styled from "@emotion/styled";

const SkeletonImage = () => {
  return <SkeletonWrapper></SkeletonWrapper>;
};

export default SkeletonImage;

const SkeletonWrapper = styled("div")`
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(100%);
    }
  }

  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  background-size: 200% 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: linear-gradient(-45deg, #f2f2f2 0%, #e2e2e2 50%, #f2f2f2 100%);
    animation: loading 1.5s infinite linear;
  }
`;