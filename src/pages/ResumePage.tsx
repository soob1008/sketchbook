import styled from "@emotion/styled";
import { Col, Row } from "antd";

const ResumePage = () => {
  return (
    <>
      {/*<Title title="Resume" />*/}
      <div style={{ display: "none" }}>
        <SubTitle>김수빈</SubTitle>
        <Row>
          <Col span={12}>
            <img src="" alt="" />
          </Col>
          <Col span={12}>
            <ul>
              <li>gmail: 1008sb354@gmail.com</li>
              <li>phone: 010.3249.2471</li>
              <li>github: -</li>
              <li>blog: -</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p>제가 생각하는 개발자의 중요한 것은 아래와 같습니다.</p>
            <ul>
              <li>- 정확한 비즈니스 로직 파악</li>
              <li>- 협업 시 배려하는 자세</li>
              <li>- 모르는 것을 인정하고 배우는 자세</li>
            </ul>
          </Col>
        </Row>

        <div className="skill">
          <SubTitle>skill</SubTitle>
          <Row>
            <Col span={24}>
              <ul>
                <li>HTML, CSS, JS</li>
                <li>React, TypeScript, Next.js</li>
                <li>ECS, Docker</li>
              </ul>
            </Col>
          </Row>
        </div>

        <div className="works">
          <SubTitle>work</SubTitle>
          <Row>
            <Col span={12}>
              <div className="company">
                <h3>
                  handys <span>(1년 1개월)</span>
                </h3>
                <span>2022.09 - 2023.10</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="list">
                <b>숙박 예약 관리 시스템(PMS) 개발 </b>
                <ul>
                  <li>- 날짜별 객실 요금 설정 관리</li>
                  <li>- 어반스테이 앱 컨텐츠 관리</li>
                  <li>- 장기예약, 조식쿠폰, 부대시설 관리 시스템 개발</li>
                  <li>- 번들러 마이그레이션을 통한 빌드 환경 개선</li>
                  <li>- 컴포넌트 개선 및 UI 라이브러리 변경</li>
                </ul>
              </div>
              <div className="list">
                <b>어반스테이 예약 어플리케이션 개발</b>
                <ul>
                  <li>- 컴포넌트 구성 및 UI 작업</li>
                  <li>- 예약 날짜 선택 캘린더 구현</li>
                  <li>
                    <a href="https://play.google.com/store/apps/details?id=kr.co.urbanstay">
                      안드로이드 다운로드
                    </a>
                  </li>
                  <li>
                    <a href="https://apps.apple.com/kr/app/%EC%96%B4%EB%B0%98%EC%8A%A4%ED%85%8C%EC%9D%B4/id1664059073">
                      ios 다운로드
                    </a>
                  </li>
                </ul>
              </div>
              <div className="list">
                <b>프론트엔드 배포 담당</b>
                <ul>
                  <li>- aws cloudfront, ECS 배포 환경 구축</li>
                  <li>- certbot ssl 인증서 관리, cron 자동갱신 설정</li>
                  <li>- 비트버킷 파이프라인 구축</li>
                </ul>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <h3>
                m-sync <span>(1년 10개월)</span>
              </h3>
              <span>2022.09 - 2023.10</span>
            </Col>
            <Col span={12}>
              <div className="list">
                <b>미래엔 웹 리뉴얼</b>
                <ul>
                  <li>UI 구현, 카카오 맵, 운영 이슈 처리</li>
                </ul>
              </div>
              <div className="list">
                <b>시티넷 설문조사 기능 추가</b>
                <ul>
                  <li>d3.js를 사용한 원형 차트 구현</li>
                </ul>
              </div>
              <div className="list">
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
            </Col>
          </Row>
        </div>

        <div className="edu">
          <SubTitle>education</SubTitle>
          <Row>
            <Col span={24}>
              <dl>
                <dt>원티트 프리온보딩 프론트엔드 과정</dt>
                <dd>2022.07 - 2022.08</dd>
              </dl>
              <dl>
                <dt>건국대학교 글로컬캠퍼스 컴퓨터 공학 전공</dt>
                <dd>2013.03 ~ 2017.02.</dd>
              </dl>
              <dl>
                <dt>정보처리기사</dt>
                <dd>2016.07</dd>
              </dl>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ResumePage;

const SubTitle = styled("h2")(({ theme }) => ({
  marginBottom: "2.4rem",
  paddingBottom: "2rem",
  fontSize: "2.4rem",
  // borderBottom: `1px solid ${theme.color.borderGray0}`,
}));