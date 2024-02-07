import styled from "@emotion/styled";
import {
  Col,
  Row,
  Typography,
  Card,
  Space,
  Tag,
  Divider,
  Timeline,
  List,
} from "antd";

const { Title, Text } = Typography;

const myInfoList = [
  {
    title: "email",
    text: "1008sb354@gmail.com",
  },
  {
    title: "phone",
    text: "010.3249.2471",
  },
  {
    title: "github",
    text: "https://github.com/soob1008",
    link: "https://github.com/soob1008",
  },
  {
    title: "blog",
    text: "https://velog.io/@soob1008",
    link: "https://velog.io/@soob1008",
  },
];

const ResumePage = () => {
  return (
    <>
      <Title level={2}>-</Title>
      <ResumeSpace
        direction={"vertical"}
        size="middle"
        style={{ display: "flex" }}
      >
        <div className="list">
          <Title level={4}>subin.kim</Title>
          <Row>
            <Col lg={12} xs={24}>
              <Card>
                <List
                  dataSource={myInfoList}
                  renderItem={(item, index) => (
                    <List.Item key={`myInfo-${index}`}>
                      <Text strong>{item.title}</Text>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer">
                          {item.text}
                        </a>
                      ) : (
                        <Text>{item.text}</Text>
                      )}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div className="list">
          <Title level={4}>Skill</Title>
          <SkillList>
            <li>
              <Tag color="green">HTML</Tag>
              <Tag color="magenta">CSS</Tag>
              <Tag color="gold">JS</Tag>
            </li>
            <li>
              <Tag color="purple">React</Tag>
              <Tag color="blue">TypeScript</Tag>
            </li>
            <li>
              <Tag color="orange">ECS</Tag>
              <Tag color="geekblue">Docker</Tag>
            </li>
          </SkillList>
        </div>
        <div className="list">
          <Title level={4}>Work</Title>
          <Card>
            <Row>
              <Col lg={11} xs={24}>
                <Text strong>
                  handys <span>(1년 1개월)</span>
                </Text>
                <Text style={{ display: "block", marginBottom: "20px" }}>
                  2022.09 - 2023.10
                </Text>
              </Col>
              <Col lg={13} xs={24}>
                <Space direction="vertical">
                  <div>
                    <b>숙박 예약 관리 시스템(PMS) 개발 </b>
                    <ul>
                      <li>- 날짜별 객실 요금 설정 관리</li>
                      <li>- 어반스테이 앱 컨텐츠 관리</li>
                      <li>- 장기예약, 조식쿠폰, 부대시설 관리 시스템 개발</li>
                      <li>- 번들러 마이그레이션을 통한 빌드 환경 개선</li>
                      <li>- 컴포넌트 개선 및 UI 라이브러리 변경</li>
                    </ul>
                  </div>
                  <div>
                    <b>어반스테이 예약 어플리케이션 개발</b>
                    <ul>
                      <li>- 컴포넌트 구성 및 UI 작업</li>
                      <li>- 예약 날짜 선택 캘린더 구현</li>
                      <li>
                        <a
                          href="https://play.google.com/store/apps/details?id=kr.co.urbanstay"
                          target="_blank"
                        >
                          안드로이드 다운로드
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://apps.apple.com/kr/app/%EC%96%B4%EB%B0%98%EC%8A%A4%ED%85%8C%EC%9D%B4/id1664059073"
                          target="_blank"
                        >
                          ios 다운로드
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <b>프론트엔드 배포 담당</b>
                    <ul>
                      <li>- aws cloudfront, ECS 배포 환경 구축</li>
                      <li>- certbot ssl 인증서 관리, cron 자동갱신 설정</li>
                      <li>- 비트버킷 파이프라인 구축</li>
                    </ul>
                  </div>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Row style={{ marginTop: "20px" }}>
              <Col lg={11} xs={24}>
                <Text strong>
                  m-sync <span>(1년 10개월)</span>
                </Text>
                <Text style={{ display: "block", marginBottom: "20px" }}>
                  2020.07 - 2022.04
                </Text>
              </Col>
              <Col lg={13} xs={24}>
                <Space direction="vertical">
                  <div>
                    <b>미래엔 웹 리뉴얼</b>
                    <ul>
                      <li>UI 구현, 카카오 맵, 운영 이슈 처리</li>
                    </ul>
                  </div>
                  <div>
                    <b>시티넷 설문조사 기능 추가</b>
                    <ul>
                      <li>d3.js를 사용한 원형 차트 구현</li>
                    </ul>
                  </div>
                  <div>
                    <b>동원몰 앱 개발</b>
                    <ul>
                      <li>- UI, 애니메이션 구현</li>
                      <li>- 마이페이티 API 연동</li>
                      <li>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.dongwon.mall"
                          target="_blank"
                        >
                          안드로이드 다운로드
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://apps.apple.com/kr/app/%EB%8F%99%EC%9B%90%EB%AA%B0/id1026425800"
                          target="_blank"
                        >
                          ios 다운로드
                        </a>
                      </li>
                    </ul>
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        </div>
        <div className="list">
          <Title level={4}>Education</Title>
          <Row>
            <Timeline
              items={[
                {
                  children:
                    "2022.07 - 2022.08 원티트 프리온보딩 프론트엔드 과정",
                },
                {
                  children:
                    "2013.03 ~ 2017.02. 건국대학교 글로컬캠퍼스 컴퓨터 공학 전공",
                },
                {
                  children: "2016.07 정보처리기사",
                },
              ]}
              style={{
                marginBottom: 0,
              }}
            />
          </Row>
        </div>
        {/*<Card title="education"></Card>*/}
      </ResumeSpace>
    </>
  );
};

export default ResumePage;

const ResumeSpace = styled(Space)`
  .list {
    margin-bottom: 30px;
  }

  h4 {
    margin-bottom: 20px;
  }
`;

const SkillList = styled("ul")`
  li {
    margin-bottom: 8px;

    &:last-of-type(1) {
      margin-bottom: 0;
    }
  }
`;