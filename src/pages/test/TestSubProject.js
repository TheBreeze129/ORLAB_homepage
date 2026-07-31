import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Footer from "./components/Footer.js";
import structureImage from "../../assets/dualtwinfork-structure.jpg";
import conferenceImage from "../../assets/dualtwinfork-conference.png";
import lgesLogo from "../../assets/dualtwinfork-lges.jpg";
import batteryEquipmentImage from "../../assets/battery-equipment.jpg";
import batteryScheduleImage from "../../assets/battery-schedule.jpg";
import batteryLgesLogo from "../../assets/battery-lges.jpg";
import inodepFrameworkImage from "../../assets/inodep-page1-image1.jpg";
import inodepGoalImage from "../../assets/inodep-page2-image1.jpg";
import inodepPaperRewardImage from "../../assets/inodep-page3-image1.jpg";
import inodepPaperAnomalyImage from "../../assets/inodep-page3-image2.jpg";
import inodepCollaboratorsLogo from "../../assets/inodep-page4-image1.png";
import ocrEmbeddingImage from "../../assets/ocr-page1-image1.jpg";
import ocrGmissionLogo from "../../assets/ocr-page3-image1.png";
import ocrDocumentAiImage from "../../assets/ocr-page3-image2.jpg";
import travutOverviewImage from "../../assets/travut-overview.png";
import ssrcEncoreMotionImage from "../../assets/ssrc-encore-motion.png";
import ssrcEncorePipelineImage from "../../assets/ssrc-encore-pipeline.png";
import skaxAgfOverviewImage from "../../assets/skax-agf-overview.png";
import skaxAgfFrameworkImage from "../../assets/skax-agf-framework.jpg";
import skaxAgfSyntheticDataImage from "../../assets/skax-agf-synthetic-data.jpg";
import skaxLogo from "../../assets/skax-logo.jpg";

import finishedPositioningDecisionSystemImage from "../../assets/finished-projects/finished-positioning-decision-system.png";
import finishedPositioningPortfolioSelectionImage from "../../assets/finished-projects/finished-positioning-portfolio-selection.png";
import finishedPositioningReviewMiningImage from "../../assets/finished-projects/finished-positioning-review-mining.png";
import finishedMedicalTreatmentRecommendationImage from "../../assets/finished-projects/finished-medical-treatment-recommendation.png";
import finishedHyundaiFirstConferenceImage from "../../assets/finished-projects/finished-hyundai-first-conference.png";
import finishedHyundaiSecondConferenceSessionImage from "../../assets/finished-projects/finished-hyundai-second-conference-session.png";
import finishedHyundaiSecondConferencePresentationImage from "../../assets/finished-projects/finished-hyundai-second-conference-presentation.png";
import finishedBackgroundMusicVideoKeywordImage from "../../assets/finished-projects/finished-background-music-video-keyword-recommendation.png";
import finishedBackgroundMusicMetricLearningImage from "../../assets/finished-projects/finished-background-music-metric-learning.png";
import finishedDualStockerSystemImage from "../../assets/finished-projects/finished-dual-stocker-system.png";
import finishedDualStockerPrioritySchedulingImage from "../../assets/finished-projects/finished-dual-stocker-priority-scheduling.png";
import finishedDualStockerRlArchitectureImage from "../../assets/finished-projects/finished-dual-stocker-rl-architecture.png";
import finishedOptimizationMachineLearningYearlyPlanImage from "../../assets/finished-projects/finished-optimization-machine-learning-yearly-plan.png";
import finishedLifterAssignmentOverviewImage from "../../assets/finished-projects/finished-lifter-assignment-overview.png";
import finishedLifterOperationProcedureImage from "../../assets/finished-projects/finished-lifter-operation-procedure.png";
import finishedWaferLotUnnecessaryDetourImage from "../../assets/finished-projects/finished-wafer-lot-unnecessary-detour.png";
import finishedMusicEmotionModelsImage from "../../assets/finished-projects/finished-music-emotion-recognition-models.png";
import finishedMusicEmotionClassificationVisualizationImage from "../../assets/finished-projects/finished-music-emotion-classification-visualization.png";
import finishedImageClassificationBackgroundProcessImage from "../../assets/finished-projects/finished-image-classification-background-process.png";
import finishedSsrc2025NavigationTtsImage from "../../assets/finished-projects/finished-ssrc-2025-navigation-tts.png";
import finishedSsrc2025NavigationSpeechPipelineImage from "../../assets/finished-projects/finished-ssrc-2025-navigation-speech-pipeline.png";
import finishedSsrc2025AccessibilityAssistantImage from "../../assets/finished-projects/finished-ssrc-2025-accessibility-assistant.png";
import finishedSsrc2025AccessibilityPipelineImage from "../../assets/finished-projects/finished-ssrc-2025-accessibility-pipeline.png";
import finishedSsrc2025DigitalAfterlifeServiceImage from "../../assets/finished-projects/finished-ssrc-2025-digital-afterlife-service.png";
import finishedConveyorSystemOverviewImage from "../../assets/finished-projects/finished-conveyor-system-overview.png";
import finishedConveyorSimulationOptimizationImage from "../../assets/finished-projects/finished-conveyor-simulation-optimization.png";

const navy = "#113275";
const soft = "#e6e6e6";
const dualTwinForkPageCode = "38fd35be31ec804f8fefc71bc74b3dae";
const batteryPageCode = "38fd35be31ec809d8c1dc0099da807ed";
const inodepPageCode = "1ced35be31ec8003a633f28976b412b5";
const ocrPageCode = "38fd35be31ec8040ab83fd4362120249";
const travutPageCode = "38fd35be31ec80f1a521f3a00a363316";
const ssrcPageCode = "390d35be31ec805a9f4fdaa561ed3384";
const skaxAgfSolutionPageCode = "3aed35be31ec80069308ccf684e024bc";
const finishedProductPositioningPageCode = "1aed35be31ec80aa975aee545dffe2dc";
const finishedMedicalRecommendationPageCode = "1aed35be31ec80fd845cd58c0ea37b89";
const finishedHyundaiClusterPageCode = "1aed35be31ec80728632d0477970ab2c";
const finishedBackgroundMusicPageCode = "1aed35be31ec8054b840fad9c7506671";
const finishedDualStockerPageCode = "1aed35be31ec80d2ba02ff3c8eabd048";
const finishedOptimizationMachineLearningPageCode = "1aed35be31ec804b9b08d37a266127c1";
const finishedLifterAssignmentPageCode = "1aed35be31ec807990bac380f34e8fe1";
const finishedWaferLotAssignmentPageCode = "1aed35be31ec8011acc4fad80abf9c6b";
const finishedMusicEmotionPageCode = "1acd35be31ec805d8cd0c147e3b87559";
const finishedImageClassificationPageCode = "1acd35be31ec80f7a29ee9c34fb25d43";
const finishedSsrc2025PageCode = "1d6d35be31ec8069af41f0a5a574df60";
const finishedConveyorFlowPageCode = "1d6d35be31ec80eb8053d7556ff42704";

const projectsByPageCode = {
  [dualTwinForkPageCode]: {
    title: "Dual Twin Fork Stocker Crane Scheduling Optimization",
    organization: "LG Energy Solution",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "본 연구는 반도체, 디스플레이, 배터리 등 첨단 제조라인에서 사용되는 stocker crane 시스템의 물류 이송 효율을 높이기 위한 scheduling 연구입니다.",
          "Twin-fork crane의 이중 적재 기능과 두 crane 간 상호작용을 함께 고려하여 job의 crane 할당, 작업 묶음, 수행 순서를 최적화하고, 전체 작업 완료시간인 makespan을 줄이는 것을 목표로 합니다.",
        ],
        figure: {
          src: structureImage,
          alt: "Dual Stocker Crane transport structure",
          caption: "<Dual Stocker Crane 이송 구조 모식도>",
        },
      },
      {
        title: "연구 목표",
        bullets: [
          "작업 묶음과 crane별 수행 순서를 동시에 고려하는 알고리즘 개발",
          "Crane 간 충돌 및 간섭을 반영한 simulator 기반 성능 평가",
          "Makespan 최소화를 통한 물류 이송 효율 개선",
        ],
      },
      {
        title: "연구 방법",
        bullets: [
          "작업 간 묶음 적합도를 정량화하는 Pairing cost 지표 개발",
          "개발한 지표를 활용해 효율적인 작업 조합을 탐색",
          "VNS(Variable Neighborhood Search) 메타휴리스틱 기반 반복 개선을 통해 crane scheduling 성능 향상",
        ],
      },
      {
        title: "연구 성과",
        bullets: [
          "2026년 한국경영과학회 춘계공동학술대회 발표",
          "Nearest-job rule 대비 평균 20.50% makespan 감소",
          "소규모 instance에서 optimal solution 대비 평균 4.05% 차이의 해 도출",
        ],
        image: {
          src: conferenceImage,
          alt: "Dual Twin-Fork Stocker Crane Scheduling conference presentation",
        },
      },
      {
        title: "산학 과제",
        logo: {
          src: lgesLogo,
          alt: "LG Energy Solution",
        },
      },
    ],
  },
  [batteryPageCode]: {
    title: "Battery Charging/Discharging Equipment Assignment Optimization",
    organization: "LG Energy Solution",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "본 연구는 자동차용 배터리, ESS, 소형 배터리 등 전반적인 배터리 제조 환경에서 활용되는 충방전기 장비의 운영 효율을 높이기 위한 채널 할당 및 스케줄링 연구입니다.",
          "수요별 시험 조건, 온도, 전류, 채널 유형, 요청 기간 및 우선순위 등 다양한 운영 제약을 고려하여, 유휴 챔버의 온도 설정과 수요의 충방전 채널 할당을 통합적으로 최적화합니다.",
          "이를 통해 배터리 수요의 처리율을 높이고 수요 대기시간을 단축하며, 제한된 충방전기 자원의 활용도를 극대화하는 것을 목표로 합니다.",
        ],
        figure: {
          src: batteryEquipmentImage,
          alt: "Battery charging and discharging equipment",
          caption: "<배터리 충방전기 장비 예시>",
        },
      },
      {
        title: "연구 방법",
        bullets: [
          "수요·장비의 적합 조건과 일정 제약을 반영한 수요-계층 구조 장비 할당 후보군 생성",
          "GRASP(Greedy Randomized Adaptive Search Procedure) 메타휴리스틱 기반 반복 탐색을 통해 우선순위, 채널 용량, 챔버 온도 및 부하율을 고려한 효율적 작업 조합 도출",
          "세부수요의 재배치·교환을 수행하는 다중 Neighborhood 기반 Local Search를 통해 선후 작업 연속성과 전체 할당 성능 개선",
        ],
        image: {
          src: batteryScheduleImage,
          alt: "GRASP-based equipment schedule generation process",
        },
      },
      {
        title: "연구 목표",
        bullets: [
          "유휴 챔버의 온도 설정과 수요의 할당을 동시에 고려하는 알고리즘 개발",
          "Hard Constraints 및 Soft Constraints에 대한 민감도 분석 및 성능 평가",
          "장비 가동률 및 수요 처리율 최대화를 통한 배터리 충방전 공정 효율 개선",
        ],
      },
      {
        title: "연구 성과",
        bullets: [
          "메타 휴리스틱 기반 초기 알고리즘 개발",
          "MILP가 풀 수 없는 Size의 Instance에 대해 제한시간 내 Solution 도출",
          "실제 기업과 활발한 미팅 및 정보 교류로 추가 사항을 실시간으로 고려 및 반영",
        ],
      },
      {
        title: "산학 과제",
        logo: {
          src: batteryLgesLogo,
          alt: "LG Energy Solution",
        },
      },
    ],
  },

  [travutPageCode]: {
  title: "Context-aware Business Email Agent for Travel Operations",
  organization: "TRAVUT",
  sections: [
    {
      title: "연구 개요",
      paragraphs: [
        "본 프로젝트는 여행·의전·비즈니스 운영 과정에서 반복적으로 발생하는 이메일 응대 업무를 지원하기 위한 AI Agent 시스템 개발 프로젝트입니다. 실제 업무 이메일은 여러 차례의 송수신을 통해 요구사항, 일정, 결제 조건, 예외 사항 등이 점진적으로 누적되기 때문에, 단순히 최근 메일만 참고해서는 정확한 답변을 생성하기 어렵습니다.",
        "TRAVUT은 이메일 스레드의 장기 맥락을 유지하고, 최근 대화와 과거 업무 이력을 함께 반영하여 비즈니스 상황에 적합한 답장 초안을 생성하는 것을 목표로 합니다. 이를 통해 반복적인 이메일 응대 부담을 줄이고, 업무 담당자가 중요한 의사결정과 고객 커뮤니케이션에 더 집중할 수 있도록 지원합니다.",
      ],
      image: {
        src: travutOverviewImage,
        alt: "Context-aware email agent workflow",
      },
    },
    {
      title: "연구 목표",
      bullets: [
        "이메일 스레드의 최근 대화와 장기 맥락을 함께 반영하는 Context-aware Reply Generation 구조 설계",
        "과거 유사 사례와 현재 요청사항을 연결하여 답변 근거를 구성하는 RAG 기반 이메일 응답 파이프라인 개발",
        "다중 메일 스레드에서 미해결 요청, 일정 변경, 조건 추가 등 업무상 중요한 정보를 추적하는 AI Agent 시스템 구현",
        "실제 업무 환경에서 활용 가능한 자동 답장 초안 생성 및 검토 지원 기능 개발",
      ],
    },
    {
      title: "연구 성과",
      bullets: [
        "Gmail 기반 이메일 수집 및 스레드 단위 관리 기능 구현",
        "최근 메일 원문, 장기 요약, 과거 유사 사례를 함께 활용하는 이메일 답장 생성 파이프라인 구축",
        "Inbox 동기화, 계정별 필터링, 스레드 상태 관리 등 실제 운영을 고려한 시스템 구조 개선",
        "여행·의전 업무 이메일 데이터를 활용한 초기 자동 응답 생성 실험 수행",
      ],
    },
  ],
  },

  [ssrcPageCode]: {
  title: "2026 학생창의자율과제 (SSRC)",
  organization: "SSRC",
  sections: [
    {
      title: "Project 1 : ENCORE: K-pop 안무 IP 확장을 위한 AI 기반 표준 무보 시스템",
    },
    {
      title: "연구 개요",
      paragraphs: [
        "본 연구는 AI 기반 K-pop 안무 무보 생성 및 안무 IP 활용 표준화 연구이다. K-pop 안무는 공연예술과 팬덤 문화의 핵심 자산으로 성장했지만, 기존 기록 방식은 영상, 사진/글, 전통 무보, 모션캡처에 의존해 왔다. 영상은 직관적이나 정량적 비교와 검색이 어렵고, 전통 무보는 해독 장벽이 높으며, 모션캡처는 전용 장비와 높은 비용이 필요하다는 한계가 있다.",
        "따라서 본 연구는 안무 영상을 포즈 좌표, 손동작, 의미 표현, 권리 정보로 구조화하여 고정 가능한 디지털 무보이자 산업 제작 도구와 호환되는 ENCORE 표준 파일로 변환하는 시스템을 제안한다. ENCORE는 65개 keypoint 기반 확장 스켈레톤, Laban Movement Analysis 기반 의미 트랙, 안무가·라이선스·UCI 등 권리 메타데이터를 결합하여 안무 등록, 유사도 검증, 게임·버추얼·교육 콘텐츠 활용을 함께 지원한다.",
      ],
    },
    {
      title: "연구 목표",
      bullets: [
        "영상에서 65개 keypoint 기반 스켈레톤 좌표와 손동작 정보를 추출하는 AI 무보 파이프라인 구축",
        "LMA/Effort 의미 트랙과 안무가·라이선스 등 권리 메타데이터를 결합한 ENCORE 표준 스키마 설계",
        "안무 유사도 분석 및 Blender·Unity 등 제작 도구와 연동 가능한 활용 프로토타입 개발",
      ],
    },
    {
      title: "연구 성과",
      bullets: [
        "안무 IP 고정·등록·수익화 문제와 기존 기록 방식의 한계 정리",
        "좌표 트랙, 의미 트랙, 권리 메타데이터로 구성된 3-layer ENCORE 구조 도출",
        "AI Hub K-pop 데이터 변환, 자동 어노테이션, 유사도 리포트, DCC 연동 MVP 설계 진행 중",
      ],
      images: [
        {
          src: ssrcEncoreMotionImage,
          alt: "ENCORE choreography skeleton extraction and Blender visualization",
          width: "620px",
        },
        {
          src: ssrcEncorePipelineImage,
          alt: "ENCORE standardization pipeline from video data to content applications",
          width: "920px",
        },
      ],
      imageLayout: "stacked",
    },
    {
      title: "Project 2 : E-Sports 중계 시청자의 시선 분산 패턴 기반 적응형 화면 구성 시스템",
      paragraphs: [
        "본 연구는 멀티모달 AI 기반 e스포츠 스폰서십 가치 측정 및 광고 패키지 설계 연구이다. 기존 e스포츠 광고 평가는 로고 노출 시간, 브랜드 언급 횟수, 조회수처럼 단순 지표에 의존해 왔다. 하지만 이러한 방식은 하이라이트 장면과의 연계성, 해설 언급의 맥락, 경기 흐름과 긴장감에 따른 주목도 차이를 충분히 반영하지 못한다.",
        "따라서 본 연구는 경기 영상, 로고 노출, 브랜드 언급, 화면 점유율, 하이라이트 장면, SNS 재활용 가능성 등을 함께 분석하여 단순 노출이 아니라 '기억되고 가치 있는 광고 노출'이 무엇인지 측정하는 AI 기반 광고 가치 평가 모델을 제안한다.",
      ],
    },
    {
      title: "연구 목표",
      bullets: [
        "기존 노출 시간 중심 광고 평가 방식의 한계를 보완하는 맥락 기반 광고 가치 평가 모델 개발",
        "경기 상황, 화면 점유율, 해설 언급, 하이라이트 연계 등을 반영한 멀티모달 AI 분석 모델 구축",
        "분석 결과를 활용한 브랜드 맞춤형 스폰서십 패키지 자동 추천 시스템 설계",
      ],
    },
    {
      title: "연구 성과",
      bullets: [
        "e스포츠 스폰서십 가치 측정을 위한 연구 프레임워크 및 문제 정의 완료",
        "광고 가치 산출을 위한 핵심 지표(노출 시간, 화면 점유율, 해설 언급, 하이라이트 연계, SNS 활용 가능성) 도출",
        "브랜드 목적별(노출형, 팬참여형, 하이라이트형, 현장 연동형, 숏폼 재가공형) 패키지 설계 방안 수립",
        "멀티모달 AI 기반 광고 가치 평가 모델 및 맞춤형 패키지 추천 시스템 설계 진행 중",
      ],
    },
    {
      title: "Project 3 : Korean Medical Sensemaking AI Service",
      paragraphs: [
        "본 연구는 환자와 가족이 진료실 밖에서 의료 정보를 자신의 상황에 맞게 이해하고, 실제 진료 준비와 의사결정에 활용할 수 있도록 지원하는 한국어 특화 Medical Sensemaking AI 서비스 개발 연구입니다. 일반적인 의료 정보 검색은 많은 정보를 제공할 수는 있지만, 검사 결과, 진단명, 처방, 커뮤니티 경험담 등을 사용자의 건강 상태와 생활 맥락에 맞게 해석하는 데에는 한계가 있습니다.",
        "본 연구는 의료진을 대체하거나 진단을 수행하는 시스템이 아니라, 환자가 흩어진 의료 정보와 경험 정보를 보다 신뢰성 있게 이해하고, 필요한 질문과 행동으로 연결할 수 있도록 돕는 AI 기반 정보 해석 지원 시스템을 목표로 합니다.",
      ],
    },
    {
      title: "연구 목표",
      bullets: [
        "한국 성인 환자가 진단·검사 결과와 의료 정보를 해석할 때 겪는 구체적 어려움 분석",
        "기존 생성형 AI 서비스가 의료 정보 탐색 과정에서 보이는 한계와 사용자 인식 파악",
        "환자 커뮤니티 정보와 공신력 있는 의료 정보를 함께 고려하는 Sensemaking AI 구조 설계",
        "건강보험 제도, 한국 진료 문화, 한국 식단 등 국내 의료 맥락을 반영한 서비스 기능 도출",
        "진료 전 질문 준비, 의료 용어 해석, 진료 필요 상황 안내를 지원하는 AI 기반 진료 준비 도구 개발",
      ],
    },
    {
      title: "연구 성과",
      bullets: [
        "의료 정보 이해 지원을 위한 Medical Sensemaking AI 서비스의 연구 방향 및 핵심 기능 정의",
        "동료 커뮤니티, 진료 준비 도구, 한국인 특화 맥락 반영을 중심으로 한 서비스 구성안 도출",
        "20~50대 성인 대상 심층 인터뷰 및 주제 분석 기반의 사용자 요구사항 분석 계획 수립",
        "AI Hub, K-의료데이터 중개 포털, 식품의약품안전처, 보건의료빅데이터개방시스템 등 공신력 있는 의료 지식 DB 구축 후보 자료원 정리",
        "향후 심층 인터뷰 결과를 기반으로 LLM 기반 의료 정보 이해 지원 서비스 프로토타입을 설계·개발할 계획 수립",
      ],
    },
  ],
  },

  [skaxAgfSolutionPageCode]: {
    title: "AGF Solution 고도화 과제",
    organization: "SK AX",
    sections: [
      {
        title: "1. 연구 개요",
        paragraphs: [
          "본 연구는 RGB Camera와 LiDAR를 함께 활용해 윙바디 화물 트럭의 적재 공간과 적재함 내 화물을 3D로 인지하는 Vision AI 연구입니다.",
          "RCS가 외부 고정형 센서에 의존하지 않고 작업 현장의 공간, 화물 위치, 크기 정보를 직접 판단할 수 있는 기반을 확보하는 것을 목표로 합니다.",
          "5톤·14톤 윙바디 트럭을 대상으로 화물칸 cube와 화물 cube의 꼭지점 좌표, W/H/D, 월드 좌표를 산출하고, 추론 결과를 Robot Control System으로 전달하여 상·하차 작업 생성과 AGF/로봇 할당에 활용합니다.",
        ],
        figure: {
          src: skaxAgfOverviewImage,
          alt: "Wing body cargo truck loading space and cargo recognition",
          caption: "<윙바디 화물 트럭의 적재 공간 및 화물 인지>",
        },
      },
      {
        title: "시나리오 예시",
        bullets: [
          "화물트럭 진입 → 상/하차 준비 → AGF 호출 → 트럭 화물칸/화물 인지 → 좌표 추출/실제 좌표 변환 → Robot Control System 전송 → 작업 생성 → AGF 할당",
        ],
      },
      {
        title: "2. 기존 기술의 한계",
        bullets: [
          "기존 자동화는 고정형 센서·설비가 설치된 표준 작업영역을 전제로 하며, 트럭·평치·단순 선반처럼 가변적인 공간에는 적용이 어려움",
          "화물 위치, 적재율, 가려짐, 조도·날씨·역광 변화에 따라 Camera 단독 또는 LiDAR 단독 인식의 안정성이 저하",
          "Camera-LiDAR 설치 위치와 화각, calibration, Image-World 좌표 변환 정밀도가 실제 성능을 좌우",
          "장폭 트럭과 다중 센서 구성에서는 Camera/LiDAR 동기화와 연동 복잡도가 증가",
          "새로운 현장 적용에는 synthetic-real domain gap 보정, Edge Device 최적화 등의 고난도 기술 구성이 필요",
        ],
      },
      {
        title: "3. 연구 목표",
        bullets: [
          "알고리듬 개발을 위한 Camera-LiDAR align 합성/현장/증강 데이터 확보",
          "Task 1: 트럭 적재함의 벽면·평면·기둥을 검출하고 적재 공간 Cube 꼭지점 좌표와 W/H/D를 월드 좌표계로 산출",
          "Task 2: 팔레트 위 박스형 화물을 중심으로 화물 Cube 꼭지점 좌표와 W/H/D를 월드 좌표계로 산출",
        ],
        images: [
          {
            src: skaxAgfFrameworkImage,
            alt: "AGF solution advancement task framework and robust recognition process",
            caption: "적재 공간 및 화물 인지 알고리듬 개발 흐름",
            width: "1000px",
          },
          {
            src: skaxAgfSyntheticDataImage,
            alt: "Synthetic data and camera LiDAR position configuration examples",
            caption: "Synthetic 데이터 및 Camera/LiDAR 위치 구성 예시",
            width: "1000px",
          },
        ],
        imageLayout: "stacked",
      },
      {
        title: "4. 기대 효과",
        bullets: [
          "자동화 설비 설치 난이도가 높은 트럭 적재 환경까지 AGF 적용 범위를 확장",
          "RCS가 공간과 화물 상태를 실시간으로 파악해 작업 생성, 이동 위치 결정, AGF 할당의 판단 품질을 개선",
          "Camera-LiDAR 융합과 실제 좌표 변환으로 다양한 조도·반실외 환경에서도 운영 가능한 인지 기반 확보",
          "데이터셋, 학습 모델, 소스코드, 캘리브레이션/설치 가이드로 후속 고도화 기반 마련",
        ],
      },
      {
        title: "5. 공동 연구 기관",
        logo: {
          src: skaxLogo,
          alt: "SK AX",
          width: "180px",
        },
      },
    ],
  },

  [inodepPageCode]: {
  title:
    "Zero-shot 지능형 선별관제 시스템을 위한 Multimodal 파운데이션 모델 학습 및 연구",
  organization: "INNODEP",
  sections: [
    {
      title: "1. 연구 개요",
      kicker: "Task Framework",
      bullets: [
        "자연어 Prompt 와 CCTV 영상을 함께 이해하는 VLM 기반 지능형 영상분석 기술을 연구",
        "관제사가 자연어로 지정한 객체와 상황에 해당하는 장면을 선별적으로 탐색하는 기술을 개발",
        "사전에 정의되지 않은 객체와 상황까지 인식할 수 있는 Zero-shot 지능형 선별관제 구현을 지향",
      ],
      image: {
        src: inodepFrameworkImage,
        alt: "Task framework for VLM-based intelligent video analysis",
      },
    },
    {
      title: "2. 기존 기술의 한계",
      bullets: [
        "기존 선별관제는 사전에 정의된 객체·상황과 Label 데이터에 의존적",
        "새로운 관제 대상을 추가할 때마다 데이터 구축과 모델 재학습이 필요해 확장성이 낮음",
        "기존 ViT 기반 VLM 은 세부 객체와 위치 등 지역적 정보(Local Information) 추출에 취약",
        "이로 인해 정밀한 객체 탐지와 실제 관제 환경 적용에 한계가 있음",
      ],
    },
    {
      title: "3. 연구 목표",
      kicker: "Auto Labeling, Reward Model, RLHF 의 목표",
      bullets: [
        "자연어 기반 Auto Labeling 을 통해 CCTV 영상 속 객체·상황·이벤트 정보를 자동으로 정제하고, 선별관제 환경에 특화된 멀티모달 학습 데이터를 확보",
        "Reward Model 을 활용해 모델 출력의 정확성, 자연어 질의와의 관련성 및 관제 목적 적합성을 평가하고, 이를 학습을 위한 보상 신호로 제공",
        "생성된 보상 신호를 기반으로 RLHF 를 적용하여, 새로운 객체·상황에 대한 Zero-shot 인식 능력과 자연어 기반 장면 검색 성능을 지속적으로 향상",
      ],
      image: {
        src: inodepGoalImage,
        alt: "Auto Labeling, Reward Model, and RLHF research goal diagram",
      },
    },
    {
      title: "4. 기대 효과",
      bullets: [
        "새로운 관제 기능 추가에 필요한 데이터 수집·Labeling·모델 재학습 부담을 절감",
        "자연어 질의만으로 필요한 객체와 상황을 신속하게 검색할 수 있어 관제 효율을 향상",
        "사전에 정의되지 않은 객체와 돌발 상황에도 유연하게 대응할 수 있어 시스템 확장성을 확보",
        "다양한 현장 요구에 빠르게 적용할 수 있는 Zero-shot 지능형 선별관제 기반을 마련",
      ],
    },
    {
      title: "5. 논문 성과",
      paragraphs: [
        "Jimyung Park, Minhyuk Jeong, Dongjun Kim, Hyunjun Yuh, Jeonghoon Mo*, “Fine-Grained Rewards for Visual CoT: Mitigating Hallucinations in Vision-Language Models”, IEEE/ICAIIC, 2026 (Excellent Paper)",
        'Dongjun Kim, Changjae Oh, Andrea Cavallaro, Jeonghoon Mo*, "Context-Structured Video Anomaly Detection with Large Vision-Language Models”, IEEE/AVSS, 2026',
      ],
      images: [
        {
          src: inodepPaperRewardImage,
          alt: "Fine-Grained Rewards for Visual CoT paper result",
        },
        {
          src: inodepPaperAnomalyImage,
          alt: "Context-structured video anomaly detection paper result",
        },
      ],
    },
    {
      title: "6. 특허 출원",
      bullets: [
        "[10-2025-0198618] Method for Hallucination Mitigation and Automatic Labeling of Visual Grounding Dataset",
        "[10-2025-0152446] Device and Method for Learning Vision-Language Model",
        "[10-2025-0142207] Method and Apparatus for Automatically Generating Learning Data for Referring Expression Comprehension using Multiple AI Models",
      ],
    },
    {
      title: "공동연구기관",
      logo: {
        src: inodepCollaboratorsLogo,
        alt: "INNODEP and collaborating institutions",
        width: "620px",
      },
    },
  ],
  },

  [ocrPageCode]: {
  title:
    "AI Document Intelligence: Manufacturing-Specific Embedding Models and Korean Handwriting Recognition",
  organization: "GMISSION",
  sections: [
    {
      title: "1. 제조 특화 임베딩 모델 개발",
      paragraphs: [
        "본 연구는 SBA(서울경제진흥원) 「AI Agent 기반 제조AX 지능형 품질관리 플랫폼 개발」 과제의 일환으로, 범용 임베딩 모델을 제조 현장 데이터에 특화되도록 파인튜닝하는 연구입니다. 제조 문서에는 공정 약어, 설비 코드, 수치·단위, LOT, Rev 등 전문적인 표현이 포함되어 있어 범용 임베딩 모델만으로는 엔지니어의 질의와 정확한 근거 문서를 연결하기 어렵습니다.",
        "실제 제조 현장의 질의와 정답 문서를 Positive Pair로 구성하고, 표현은 유사하지만 원인·설비·조치가 다른 문서를 Hard Negative로 학습합니다. 이를 통해 엔지니어의 자연어 질의에 적합한 품질 리포트, 설비 이력, 이상 보고서 및 공정 문서를 정확하게 검색하고, RAG 시스템이 신뢰할 수 있는 근거를 바탕으로 답변하도록 지원하는 제조 특화 임베딩 모델을 개발합니다.",
      ],
      image: {
        src: ocrEmbeddingImage,
        alt: "Manufacturing query-document pair construction and hard-negative tuning process",
      },
    },
    {
      title: "2. VLM 기반 한글 손글씨·필기체 인식",
      paragraphs: [
        "본 연구는 표·인쇄체·손글씨가 혼재된 문서양식에서 한글 손글씨와 필기체를 정확하게 인식하는 VLM 기반 OCR 기술을 연구합니다.",
        "전체 문서를 낮은 해상도로 축소할 때 작은 글자와 미세한 획 정보가 손실되는 문제를 해결하기 위해, 전체 페이지의 문서 구조와 고해상도 손글씨 영역을 함께 활용합니다. 손글씨 ROI에 집중한 동적 해상도 및 시각 토큰 배분, 전체 문서와 손글씨 영역의 이중 입력, 한글 손글씨 데이터 기반 Fine-tuning 기법을 적용하여 문서양식 내 인쇄체와 더불어 한국어 손글씨를 정확하게 인식하는 것을 목표로 합니다.",
      ],
      image: {
        src: ocrDocumentAiImage,
        alt: "Document AI concept for manufacturing documents and handwritten Korean OCR",
      },
    },
    {
      title: "3. 연구 목표",
      kicker: "제조 특화 임베딩 모델",
      bullets: [
        "제조 현장 질의-문서 Positive Pair와 실제 혼동 사례 기반 Hard Negative 학습데이터 구축",
        "Bi-encoder와 Ranking Loss를 활용해 수치·단위·설비 코드 및 제조 용어를 보존하는 임베딩 모델 파인튜닝",
        "구조 기반 Chunk/Passage 검색을 적용하여 범용 모델 대비 성능을 개선하고 Recall@3 >= 90% 달성",
      ],
    },
    {
      title: "4. VLM 기반 한글 필기인식 목표",
      bullets: [
        "전체 문서 문맥과 고해상도 손글씨 ROI를 활용한 전역-지역 이중 입력 및 동적 해상도 처리",
        "한국어 손글씨의 미세 획 특징과 문자 생성 능력 향상을 위한 Vision Encoder–Language Decoder 공동 Fine-tuning",
        "작성자·필체·문서양식 변화에 대한 일반화 성능을 검증하고 범용 VLM/OCR 대비 CER 개선",
      ],
    },
    {
      title: "5. 연구 성과 및 진행 현황",
      bullets: [
        "제조 특화 임베딩 모델 학습을 위한 질의 유형, Positive Pair 및 Hard Negative 구성 기준을 수립하고, 제조 RAG 연동을 위한 학습·평가 체계 구축",
        "SBA 과제를 통해 제조 특화 임베딩 모델의 검색 성능 평가 결과 확보",
        "한글 손글씨 특화 VLM LoRA 파인튜닝 파이프라인을 구축하고, 문서양식 내 한국어 인식 성능 향상",
        "문서 전체 페이지와 고해상도 손글씨 ROI를 함께 활용하는 방법과 시각 인코더 부분 Fine-tuning을 통해 미세한 한글 획 구분 성능을 높이는 연구 진행",
      ],
    },
    {
      title: "공동연구기관",
      logo: {
        src: ocrGmissionLogo,
        alt: "GMISSION",
      },
    },
  ],
  },
  // finished
  [finishedProductPositioningPageCode]: {
    title: "비정형의 빅데이터를 활용한 경쟁환경에서의 신제품 포지셔닝과\n다기간 제품 포트폴리오 선정에 도움을 줄 수 있는 전사적 의사결정 시스템 개발",
    organization: "Finished Project",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "기업의 신제품 포지셔닝 및 제품 포트폴리오 최적화 연구는 범위의 경제 구현, 수평적․수직적 차별화, 수요 불 확실성의 중립화, 경쟁기업에 대비한 시장선점 등의 효과를 발생시킴. 또한, 기술의 발전 속도가 빨라지고 다양 성이 증가함에 따라, 소비자의 기호가 매우 빠르게 변하고 있음. 제조기업이 생산패턴을 ‘소품종-대량생산’으로 부터 ‘다품종-소량생산’으로 전환하는 것은 소비자 기호의 불확실성을 해소하기 위한 진화론적 대응이며, 이에 따라 다품종을 생산하는 제조기업의 입장에서는 범위의 경제(economies of scope) 구현이 비용경쟁력 확보의 필요조건이 됨. 제품 포트폴리오 최적화의 학문적 기존 접근 방식은 특수성이 강해, 서로 다른 기업환경에 직접 적으로 적용시키기 어려운 한계점을 가짐. 현업에는 대비되는 제품 포트폴리오 전략들이 일정한 가이드라인 없 이 시장에 혼재하고 있는 상황임.",
        ],
      },
      {
        title: "연구 목표 및 내용",
        paragraphs: [
          "본 연구의 목표는 기존 연구가 갖고 있는 개별 학문적 연구의 한계를 넘어 인지과학, 경제학과 경영과학 세 학 문의 융합연구를 통해 무정형의 빅데이터를 활용하여 경쟁환경에서 사업자의 신제품 포지셔닝과 다기간 제품 포 트폴리오 선정에 도움을 줄 수 있는 전사적 의사결정 시스템을 개발하는 것임.",
        ],
        images: [
          {
            src: finishedPositioningDecisionSystemImage,
            alt: "Finished project figure",
          },
        ],
      },
      {
        title: "주요 연구 결과",
        blocks: [
          {
            type: "paragraphs",
            items: [
              "1. 전사적 제품 포트폴리오 최적화 시스템 개발",
              "소비자 리뷰를 이용한 제품 포트폴리오 최적화 시스템을 개발, 웹 어플리케이션으로 구현함. 1) 제품의 속성을 이용한 클러스터링, 2)소비자 리뷰를 이용한 중요 제품 속성 도출, 3)시장 데이터를 이용한 소비자 수요 분석, 4) 이산선택 모형을 이용한 최적 제품 포트폴리오 선정",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedPositioningPortfolioSelectionImage,
                alt: "Finished project figure",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "2. 딥러닝 기반 온라인 리뷰 감성 분류",
              "딥러닝 기법을 활용한 온라인 리뷰 문장의 긍정과 부정을 분류하는 연구를 진행함. 여러 딥러닝 모델과 다양 한 분야의 데이터에 대해 입력 인코딩 방식을 조절하여 온라인 리뷰가 어떤 감성 극성을 갖고 있는지 판단하는 알고리즘을 개발함.",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedPositioningReviewMiningImage,
                alt: "Finished project figure",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "3. 정보 획득(Information gain) 이론을 이용한 수요 효용 모델 개발",
              "온라인 소비자 리뷰의 공감 및 긍정/부정을 고려하여 수요 예측에 적합한 독립 변수를 파악, 판매량과 독립변수 들과의 관계를 Lasso 회귀 알고리즘을 적용, 다중선형회귀분석을 통해 규명함.",
              "[1] Jungju Park, Jeonghoon Mo, “An Efficient Method for Joint Product Line Selection and Pricing with Fixed Costs”, Optimization Letters, 2018.",
              "[2] Jungju Park, Ji Hyoun Lim and Jeonghoon Mo, “A Cover-based Product Line Selection to Manage, Product Line Size and Product Similarity”, International Journal of Industrial Engineering: Theory, Applications and Practice, 2018.",
              "[3] 김예진, 오상호, 황성범, 모정훈, “온라인 소비자 리뷰의 문맥정보 마이닝: 정보 이득과 제품 판매량의 상관 관계”, 대한산업공학회지, 2019.",
              "[4] 오상호, 김예진, 모정훈, “정보이론을 적용한 국내 자동차 시장 수요예측”, 대한산업공학회 추계학술대회, 2017.",
              "[5] 황성범, 모정훈, “온라인리뷰의 Information Gain 분석을 통한 판매예측”, 한국경영과학회 추계학술대회, 2016.",
            ],
          },
        ],
      },
    ],
  },

  [finishedMedicalRecommendationPageCode]: {
    title: "의료 빅데이터를 이용한 맞춤 의료행위 추천 시스템 개발",
    organization: "Finished Project",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "전자의무기록 (electronic health record, EHR)은 디지털 형태로 체계적으로 수집되어 전자적으로 저장된 환 자 및 인구의 건강정보. EHR은 인구통계학, 병력, 약물복용 및 알레르기, 예방접종 상태, 검사실 검사결과, 영상 의학 이미지, 생체징후, 나이와 성별 같은 개인적인 통계 그리고 청구정보를 포함하는 일정 범위의 데이터를 포 함할 수 있음.",
          "병원에서 환자의 진료기록을 데이터베이스화함으로써 의료분야의 데이터 기반 연구는 기존의 패러다임을 변화 시키고 있음. 의료분야에서 발생되는 많은 양의 데이터를 단순히 분류하고 정리하는 것에 그치지 않고 이를 이 용하여 환자들 간의 진료기록을 분석하고 진단에 따라 해당되는 모집단에 알맞은 의료행위 추천시스템의 현실적 인 이용가능성을 탐색할 필요가 있음.",
          "의료분야에서 강화학습은 다양한 응용가능성을 가지고 있지만 그 응용 수준이 아직 초기단계임(Schell et al., 2015; Choi et al., 2017). 특히 분야의 특성상 치료 행위에 따라 단계적으로 환자의 상태가 변할 수 있음을 고 려했을 때, 강화학습 모형을 이용하는 것이 적합하다고 판단됨.",
        ],
      },
      {
        title: "연구 목표",
        paragraphs: [
          "본 연구는 데이터베이스화된 의료 빅데이터를 바탕으로 당뇨 환자의 상태에 따른 약제처방의 영향을 파악하고, 이를 Markov decision process(MDP) 및 강화학습 기법들을 활용하여 최적의 약 처방을 추천하는 모델 개발을 연구함.",
        ],
      },
      {
        title: "연구 내용",
        blocks: [
          {
            type: "images",
            items: [
              {
                src: finishedMedicalTreatmentRecommendationImage,
                alt: "Finished project figure",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "[1] Sangho Oh, Jongyoul Park, Sujin Lee, Seungyeon Kang, Jeonghoon Mo, “Reinforcement learning-based expanded personalized diabetes treatment recommendation using South Korean electronic health records”, Expert system with Applications, 2022.",
              "[2] Sangho Oh, Sujin Kim, Juhwan Noh, Jeonghoon Mo, “Optimal treatment recommendations for diabetes patients using the Marcov decision process along with the South Korean electronic health records”, Scientific reports, 2021.",
              "[3] 오상호, Piao Liying, 모정훈 “의료데이터와 Markov Decision Process를 이용한 당뇨병 환자의 최적 약제 추천 모델” 대한산업공학회 춘계공동학술대회, 한국경영과학회 춘계공동학술대회, 2019.",
              "[4] 오상호, Piao Liying, 모정훈 “Markov Decision Process를 적용한 환자의 질병 예측 및 의료 행위 추천 모델: 의료 빅데이터를 중심으로” 대한산업공학회 추계학술대회 논문집, 2018.",
            ],
          },
        ],
      },
    ],
  },

  [finishedHyundaiClusterPageCode]: {
    title: "현대자동차 자율주행 관련 신기술 리서치 산학 클러스터",
    organization: "Hyundai Motor Group",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "신기술 리서치를 위한 산학 클러스터 세미나",
        paragraphs: [
          "(현대자동차그룹, 고려대학교, 서울대학교, 연세대학교, 이화여자대학교, 한국과학기술원)",
        ],
      },
      {
        title: "1차 컨퍼런스",
        bullets: [
          "일시 : 2020년 6월 26일(금)",
          "장소 : Online zoom meeting",
          "발표자 : 강승연 석사과정",
          "주제 : Patient similarity learning 연구 소개 및 현대자동차 연구 적용 방안 공유",
        ],
        images: [
          {
            src: finishedHyundaiFirstConferenceImage,
            alt: "Finished project figure",
          },
        ],
      },
      {
        title: "2차 컨퍼런스",
        blocks: [
          {
            type: "bullets",
            items: [
              "일시 : 2020년 10월 23일(금)",
              "장소 : 섬유센터 컨퍼런스홀",
              "발표자 : 오상호 박사과정",
              "주제 : 강화학습을 이용한 당뇨병 치료제 추천 시스템 개발",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedHyundaiSecondConferencePresentationImage,
                alt: "Finished project figure",
                width: "872px",
              },
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedHyundaiSecondConferenceSessionImage,
                alt: "Finished project figure",
              },
            ],
          },
        ],
      },
    ],
  },

  [finishedBackgroundMusicPageCode]: {
    title: "Background music recommendation model (SSRC)",
    organization: "SSRC",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "Background music recommendation model",
        paragraphs: [
          "In this study, we propose a multi-modal music recommendation model that recommends music using video and keywords. First, for the background music recommendation model, a study was conducted to build a space where an appropriate distance from video, music, and keywords can be obtained using machine learning. After that, when video and keywords are entered, a system is created to recommend music that is close to the distance.",
        ],
      },
      {
        title: "Background music recommendation using video and keyword",
        paragraphs: [
          "In this study, we propose a multi-modal music recommendation model that recommends music using video and keywords. First, for the background music recommendation model, a study was conducted to build a space where an appropriate distance from video, music, and keywords can be obtained using machine learning. After that, when video and keywords are entered, a system is created to recommend music that is close to the distance.",
        ],
        images: [
          {
            src: finishedBackgroundMusicVideoKeywordImage,
            alt: "Finished project figure",
            width: "539px",
          },
        ],
      },
      {
        title: "Multi-Modal Metric learning for background music recommendation",
        paragraphs: [
          "Video and music have very different characteristics of data, so we must map to an embedding space where we can find the distance between the two. In this study, the model was divided according to whether the existing association was used and whether keyword existed in the music DB. At this time, the embedding space is trained using metric learning, one of the machine learning techniques, and if not used, it uses a continuous emotion space, Valence-Arousal space",
        ],
        images: [
          {
            src: finishedBackgroundMusicMetricLearningImage,
            alt: "Finished project figure",
            width: "602px",
          },
        ],
      },
      {
        title: "Background music recommendation model using emotion space and keyword",
        paragraphs: [
          "Among the previously proposed models, the model using emotion space and keywords at the same time showed the best performance, and you can directly recommend background music at the link below.",
          "[1] 장도운, 모정훈, “배경음악 추천을 위한 영상과 키워드를 사용한 다중 양상 거리 학습 모델”, 한국경영과학회 춘계학술대회, 2022",
        ],
      },
    ],
  },

  [finishedDualStockerPageCode]: {
    title: "Dual stocker system scheduling problem with considering priority (LG Display)",
    organization: "LG Display",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 내용",
        hideTitle: true,
        blocks: [
          {
            type: "paragraphs",
            items: [
              "The stocker system is one of the Automated Material Handling System(AMHS) in manufacturing system. The stocker mainly consists of one or two rack masters (or cranes) moving along a single track to transport cassettes. Because the stocker system is the primary material handling system, the performance of stocker system directly affects the overall production performance.",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedDualStockerSystemImage,
                alt: "Fig 1. Dual stocker system (Source : Hwang(2018))",
                caption: "Fig 1. Dual stocker system (Source : Hwang(2018))",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "In practice, each jobs have different priorities. Various products, customer demands, delivery date and production environments make the different level of job priorities. Therefore, we should consider not only efficiency(makespan) but the priority. Besides, a fairness of the scheduling should be considered.",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedDualStockerPrioritySchedulingImage,
                alt: "Fig 2. Scheduling example with priority",
                caption: "Fig 2. Scheduling example with priority",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "Several mathematical optimization methods are used to solving many scheduling problems. Dynamic programming is an optimization approach that transforms a complex problem into a sequence of simpler problems. However, as the problem becomes more complex, it is difficult(or impossible) to find an optimal solution within an appropriate time(suffering from the curse of dimensionality). So, the (meta)-heuristic algorithm is applied to scheduling problem and has the advantage of giving a (near)-optimal solution in a relatively short time compared to the mathematical optimization methods. Tabu search, simulated annealing and genetic algorithm are representative heuristic algorithm that generate appropriate solutions in reasonable computation time.",
              "Recently, machine learning and deep learning approaches, which use the function approximation with neural network, have been widely studied to solve the scheduling problems. Especially reinforcement learning(RL) that learn a policy based on an action value function. In this work, we will study how to model the dual stocker system scheduling problem as a Markov decision process(MDP) and use the deep reinforcement learning to train a scheduler.(RL agent)",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedDualStockerRlArchitectureImage,
                alt: "Fig 3. Example of RL architecture in scheduling (Source : Luo(2020))",
                caption: "Fig 3. Example of RL architecture in scheduling (Source : Luo(2020))",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "[1] Minjoon Kim, Jeonghoon Mo, “An efficient prioritized scheduling heuristic algorithm for dual stocker systems”, 한국경영과학회 추계학술대회, 2021",
              "[2] Minjoon Kim, Jeonghoon Mo, “A comparison of heuristic and reinforcement learning approach to dual stocker scheduling considering priority”, 한국경영과학회 춘계학술대회, 2022",
            ],
          },
        ],
      },
    ],
  },

  [finishedOptimizationMachineLearningPageCode]: {
    title: "Optimization vs. Machine Learning: 장비 스케쥴링을 중심으로",
    organization: "Finished Project",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "2016년 알파고의 등장 이후 CNN(Convolutional Neural Network), RNN(Recurrent Neural Network), 강화학습 등을 사용한 머신러닝 방법론은 최적화 분야 등에서도 사용범위를 넓혀가고 있고 성능이 우수하다고 주장하고 있음. 최근 연구에서 좋은 성과를 보여주었다고 하지만 아직 초기단계로 기존의 최적화 방법론 대비 다음과 같은 한계점이 존재함. 1) 표현에 따라 성능이 민감함. 2) 학습에 많은 data와 시간/지원이 소모되며, 모델이 변화가 생기면 다시 학습해야 함. 3) 도출된 결과에 대한 원인 파악이 어려움(Black-box model)",
        ],
      },
      {
        title: "연구 목표",
        paragraphs: [
          "본 연구의 목표는 최적화 문제의 새로운 접근법인 머신러닝 기반 방법론을 전통적인 최적화 방법론과 비교/평가하고 머신러닝 방법론의 개선점을 연구하는 것임. 이를 위해 LG display 반도체/LCD 공장의 스케쥴링 문제를 이용하여 두 방법론을 비교하고, 이와 더불어 머신러닝 방법론의 표현 민감도 연구, 재학습 비용 연구, 설명가능성 연구를 수행할 것임.",
        ],
      },
      {
        title: "연구 내용",
        images: [
          {
            src: finishedOptimizationMachineLearningYearlyPlanImage,
            alt: "[그림 1] 연차별 연구내용",
            caption: "[그림 1] 연차별 연구내용",
          },
        ],
      },
      {
        title: "결과",
      },
      {
        title: "참고 문헌",
        paragraphs: [
          "[1] Luo, Shu., “Dynamic scheduling for flexible job shop with new job insertions by deep reinforcement learning.”, Applied Soft Computing, 2020.",
          "[2] Han, Bao-An, and Jian-Jun Yang., “Research on adaptive job shop scheduling problems based on dueling double DQN.”, IEEE Access, 2020.",
          "[3] Das, Arun, and Paul Rad, “Opportunities and challenges in explainable artificial intelligence (xai): A survey.”, arXiv, 2020.",
          "[4] Tallón-Ballesteros, A., and C. Chen., “Explainable AI: Using Shapley value to explain complex anomaly detection ML-based systems.”, Machine learning and artificial intelligence, 2020.",
          "[5] Hwang Seol., “강화 학습을 이용한 듀얼 크레인 스토커 스케쥴링”, 한국과학기술원, 2018.",
        ],
      },
    ],
  },

  [finishedLifterAssignmentPageCode]: {
    title: "Lifter Assignment problem in multi-floor FAB",
    organization: "Finished Project",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 내용",
        hideTitle: true,
        blocks: [
          {
            type: "paragraphs",
            items: [
              "As semiconductor manufacturing processes become complicated and require more production steps, a single-floor FAB is not sufficient to meet the increasing demand. Therefore, a multi-floor FAB was developed in recent years and the efficient operations of inter-line (inter-floor) lifter emerged as one of the important challenges in semiconductor manufacturing. Due to an increase in inter-line transfer, a bottleneck can occur in lifters, leading to production loss. Hence, it is crucial to assign lots to each lifter properly.",
              "Since traffic control is one of the significant challenges in an AMHS, the efficiency of inter-line delivery has emerged as an important issue. The number of lifters is limited and the increase in inter-line delivery leads to a bottleneck if an excessive number of FOUPs are assigned to a single lifter. Therefore, it is essential to assign interline TRs to lifters properly in order not to cause production loss.",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedLifterAssignmentOverviewImage,
                alt: "Finished project figure",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "Our project aims to design an algorithm that can be applied to a multi-floor FAB with heterogeneous lifters. In contrast to previous papers, in our approach, a lifter is assigned and scheduled simultaneously using reinforcement learning. However, if the cost function is calculated solely with the total delivery time, utilization of lifters becomes unbalanced and lifters that are nearby bottleneck machines will suffer from excessive loads. Therefore, we proposed a heterogeneous lifter assignment algorithm balancing utilization.",
            ],
          },
        ],
      },
      {
        title: "Lifter operation procedure",
        blocks: [
          {
            type: "images",
            items: [
              {
                src: finishedLifterOperationProcedureImage,
                alt: "Finished project figure",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "A lifter is composed of input and output ports including physical and virtual ports, a rack-master, and shelves. Once an inter-line transfer request is generated, a nearby vehicle moves to the machine (side-track-buffer) and delivers a FOUP from a source machine (side-track-buffer) to a lifter. The FOUP is assigned to an available lifter by the manufacturing execution system (MES) according to its policy and waits in an input port until the rack master is available. An ‘available lifter’ means that the number of scheduled lots is less than the maximum capacity of input ports. The FOUP is delivered to a different floor by a rack-master (transporting robot) and waits for a vehicle in an output port to be transported to the destination machine. If all the output ports are occupied, the FOUP is sent to a shelf. If all the lifters are occupied, a vehicle carrying the FOUP moves along the railway not to block other vehicles, which is called a “retrial’. If the assigned lifter is still unavailable after several retrials, the FOUP is reassigned to another lifter, which is called an alternative delivery.",
            ],
          },
        ],
      },
      {
        title: "Heterogeneous Lifter Assignment",
        paragraphs: [
          "In multi-floor FABs, while each floor is connected via lifters, heterogeneous lifters exist. Each lifter runs only on certain floors or in a certain direction. If lifter A only runs between the first and the second floor and lifter B runs between the second and fourth floor, a TR, which is scheduled to be transported from the first floor to the fourth floor, can be assigned to both lifter A and B in order. Using two different lifters increases net delivery time. However, if all other lifters are occupied or the waiting time of other lifters is longer, delivery via two different lifters should be considered.",
        ],
      },
      {
        title: "Benchmark Solution approaches",
        paragraphs: [
          "1) Round Robin rule",
          "Each lot is assigned equally to each lifter in a circular order. While the round robin rule can reduce a gap between utilization of lifters, the rule cannot guarantee transfer efficiency as it does not consider waiting time and distance from machine to lifter.",
          "2) Shortest Distance First",
          "A transfer request is assigned to the nearest lifter from the source machine. The rule reduces delivery time from the source machine to the lifter. However, as it does not consider the delivery time from the lifter to the destination machine, the rule cannot minimize the actual delivery time. Moreover, if excessive lots are waiting in the input ports of the assigned lifter, the sum of the delivery time and the waiting time increases.",
          "3) SEAT (Shortest Expected Arrival Time)",
          "Na et al. [1] proposed Shorted Expected Arrival Time (SEAT) rule and compared with four different rules to assign lifters. A transfer request is assigned to a lifter that minimize the expected arrival time derived from the following equation:",
          "4) MDP-based algorithm",
          "Shin et al. [2] designed a two-step algorithm for inter-line transports.: 1) an MDP-based algorithm for inter-line transports and 2) an algorithm using clustering, partitioning, and tournament methods to reduce the dimension of the problem. Using the Markov decision process, they considered future states as well as current states.",
        ],
      },
      {
        title: "참고문헌",
        paragraphs: [
          "[1] Na B, Woo JE, Lee J (2016) Lifter assignment problem for inter-line transfers in semiconductor manufacturing facilities. Int J Adv Manuf Technol 86:1615–26.",
          "[2] Shin, K., Jang, H. & Kim, H. (2022) An MDP-based lifter assignment algorithm for inter-floor transportation in semiconductor fabrication. Int J Adv Manuf Technol 119, 6583–6598",
        ],
      },
    ],
  },

  [finishedWaferLotAssignmentPageCode]: {
    title: "Lot assignment problem in wafer fabrication",
    organization: "Finished Project",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "Introduction",
        paragraphs: [
          "Wafer fabrication in display manufacturing is a highly complex and dynamic re-entrant process in which wafers go through hundreds of processing steps, entering the same processing group of machines several times. The success of display manufacturer is determined by its ability to provide the quantity and quality demanded by customers in an extremely competitive environment. For success of display manufacturing, they have to improve flow time, WIP level, throughput rate and equipment utilization. Assigning lots to the appropriate equipment can improve these performance measurement factors.",
        ],
      },
      {
        title: "Machine priority based lot assignment",
        paragraphs: [
          "There are several ways to assign lots to machine and one of them is the machine priority based lot assignment method. This method involves ranking machine in each machine group and assigning lots to the machine in order of priority. The priority of each machine is determined based on its current status such as idle, process etc.",
        ],
      },
      {
        title: "Issue in machine priority based lot assignment problem",
        paragraphs: [
          "Unnecessary detour can cause by applying priority to each machine. If we assume that the priority of the PTH1 machine is higher than that of the PTH2 machine, PHT1 will pick up the closer lot, AA03, and AA01 will be assigned to the PHT2 machine. It can cause unnecessary detour compared to when AA01 is assigned to the PHT1 machine and AA03 is assigned to the PH2 machine.",
        ],
        images: [
          {
            src: finishedWaferLotUnnecessaryDetourImage,
            alt: "Fig 1. Example of unnecessary detour",
            caption: "Fig 1. Example of unnecessary detour",
          },
        ],
      },
      {
        title: "Soultion approach",
        paragraphs: [
          "1. Heuristic algorithm",
          "The fisrst approach is to use heuristic algorithm. For example, assigning the lot closest in distance to a particular machine or the lot with the estimated earliest arrival time. Altough heuristic algorithms enable simple and fast computation, the solution obtained may not be the optimal solution.",
          "2. Mathematical model",
          "Using mathematical model is another solution to approach lot assignment problem. Objective function can be minimize distance, waiting time, transfer time or maximize machine utilization, total throughput. The approach using mathematical models can obtain the optimal solutionm, but it has the disadvantage of taking longer computation time and not considering dynamic situations.",
        ],
      },
      {
        title: "참고문헌",
        paragraphs: [
          "[1] M.Vimala Rani, “A state-of-art review and a simple meta-analysis on deterministic scheduling of diffusion furnaces in semiconductor manufacturing”, 2021",
          "[2] Juan Liu, et al., “Scenario-based multi-objective robust scheduling for a semiconductor production line”, 2019",
        ],
      },
    ],
  },

  [finishedMusicEmotionPageCode]: {
    title: "Music Emotion Recognition",
    organization: "Finished Project",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "Emotion Recognition은 음악, 표정, 스피치, 텍스트, 영상 등 여러 도메인에서 연구가 진행되고 있음. Music Emotion Recognition(MER)은 청취자가 음악을 들으며 느끼는 감정을 분류하는 연구로, Valence-Arousal(VA-SPACE) 좌표 에서 연속적인 감정 값을 표현하는 Dimensional approach, 특정 Emotion 카테고리로 분류하는 Categorical approach가 있음. 현재 MER 분야에서는 Audio data에 Lyrics, Symbolic(MIDI data), Image, Biological data 등을 추가적으로 사용, Multi-modal 방법으로 문제 해결을 시도하고 있음. MER 연구는 추천시스템, 작곡 자동화, 심리 치료, 음악 시각화 등으로 학계 및 산업계에 응용되어 적용될 수 있지만 한계점이 존재함. 1) Emotion의 주관성 및 음악에서 Emotion feature 나타내는 지표 부재 2) 양질의 대량 데이터 확보 어려움. 3) 낮은 Emotion 분류 정확도 (Music Information Retrieval Evaluation Exchange(MIREX), audio mood classification task, 69.8%)",
        ],
        images: [
          {
            src: finishedMusicEmotionModelsImage,
            alt: "Fig 1. (Left) A Circumplex Model of Affect, The V-A Model (Russell, 1980) Fig 2. (Right) Geneva Emotion Wheel Model (Scherer, 2005)",
            caption: "Fig 1. (Left) A Circumplex Model of Affect, The V-A Model (Russell, 1980) Fig 2. (Right) Geneva Emotion Wheel Model (Scherer, 2005)",
          },
        ],
      },
      {
        title: "연구 목표",
        paragraphs: [
          "음악에서 감정 분류 정확도를 높이는 것이 본 연구의 목표임. 스마트미디어 서비스 창의자율과제에 참여함. XGBoost 모델 기반 Music Emotion Classification을 진행. 음악 Beat detection하여 해당 감정 색상 시각화 모델 구현함. 선행 연구를 기반으로 감정 분류 정확도를 개선할 것임.",
        ],
        images: [
          {
            src: finishedMusicEmotionClassificationVisualizationImage,
            alt: "Fig 3. Music emotion classifcation & visualization model process",
            caption: "Fig 3. Music emotion classifcation & visualization model process",
          },
        ],
      },
      {
        title: "연구 내용",
        paragraphs: [
          "Spotify open api 통해 데이터 수집 진행. 머신 러닝 모델을 이용하여 음악에서 감정 분류 진행함. 음악이 진행되며 나타나는 감정의 심화 정도를 표현하기 위해 Lyrics, Danceability 지표로 각각 Valence, Arousal 값에 가중치 부여. 시각화 모델에서 감정 및 색상을 표현하였음. MER 정확도 개선을 위해 여러 도메인에서 Emotion Recognition 리서치 진행할 예정임. 딥러닝 모델 이용하여 MER 연구 진행.",
        ],
      },
      {
        title: "참고 문헌",
        paragraphs: [
          "[1] Posner, Jonathan, James A. Russell, and Bradley S. Peterson. “The circumplex model of affect: An integrative approach to affective neuroscience, cognitive development, and psychopathology.” Development and psychopathology 17.3 (2005): 715-734.",
          "[2] Vaswani, Ashish, et al. “Attention is all you need.” Advances in neural information processing systems 30 (2017).",
          "[3] Chen, Changfeng, and Qiang Li. “A multimodal music emotion classification method based on multifeature combined network classifier.” Mathematical Problems in Engineering 2020 (2020): 1-11.",
        ],
      },
    ],
  },

  [finishedImageClassificationPageCode]: {
    title: "배경 정보를 고려한 image classification",
    organization: "Finished Project",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "최근 이미지 분류 알고리즘은 많은 발전을 보이며 21,841개의 범주를 포함하고 있는 ImageNet 데이터셋에서도 90% 이상의 성능을 보이고 있다. 하지만 실제 공정에서 발생한 Image data에 대한 classification은 학습 데이터의 부족으로 적은 범주에서도 사용 가능한 인공지능을 개발하는데 한계가 있다. 또한 실제 제조 현장의 공정 데이터에서는 같은 Object가 다른 위치에 존재할 때 다른 범주로 정의 되는 경우(후속 조치가 달라져 다르게 분류)가 있어 인공지능 개발에 어려움이 있다.",
        ],
      },
      {
        title: "연구 목표",
        paragraphs: [
          "본 연구는 이미지 데이터에서 같은 Object가 다른 위치에 존재할 때 다른 범주로 분류하는 인공지능 모델에 대해 연구한다. 제안한 모델을 목표 데이터세트에서 최신 이미지 분류 모델과 비교 하고 95%이상의 성능을 목표로 한다.",
        ],
      },
      {
        title: "연구 방법",
        paragraphs: [
          "배경 정보를 보여주는 데이터 생성. 즉, 이미지 데이터에서 객체를 제거하여 배경만 남김.",
          "원본 이미지에서 feature를 추출하는 신경망과 배경만 남은 이미지에서 feature를 추출하는 신경망, 두 신경망으로 classifcation 모델 구성. 두 신경망에서 추출된 feature를 weighted combine하여 feature를 생성하고 image classification task 수행하도록 학습.",
        ],
        images: [
          {
            src: finishedImageClassificationBackgroundProcessImage,
            alt: "Fig 1. Classifcation task process",
            caption: "Fig 1. Classifcation task process",
          },
        ],
      },
      {
        title: "참고 문헌",
        paragraphs: [
          "[1] YANG, Yuting; MEI, Gang; PICCIALLI, Francesco. “A Deep Learning Approach Considering Image Background for Pneumonia Identification Using Explainable AI (XAI)” IEEE/ACM Transactions on Computational Biology and Bioinformatics, 2022",
        ],
      },
    ],
  },

  [finishedSsrc2025PageCode]: {
    title: "2025 학생창의-자율과제 (SSRC)",
    organization: "SSRC",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "Project 1 | 어르신 맞춤 AI 길 안내 비서",
      },
      {
        title: "연구 배경 :",
        paragraphs: [
          "고령층의 Smartphone Navigation App의 UI/UX가 복잡하여 사용이 어려움",
        ],
        bullets: [
          "ex) 길에서 학생에게 경로를 묻는 경우가 많음",
        ],
      },
      {
        title: "연구 목표",
        blocks: [
          {
            type: "paragraphs",
            items: [
              "음성으로 간단한 길을 안내해주는 AI Agent 개발",
            ],
          },
          {
            type: "bullets",
            items: [
              "Text-to-Speech",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedSsrc2025NavigationTtsImage,
                alt: "Finished project figure",
              },
            ],
          },
          {
            type: "bullets",
            items: [
              "Speech Recognition Pipeline: From Acoustic Signal to Text",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedSsrc2025NavigationSpeechPipelineImage,
                alt: "Finished project figure",
              },
            ],
          },
        ],
      },
      {
        title: "Project 2 | 사회적 소수자를 위한 디지털 접근성 개선방안",
      },
      {
        title: "연구배경",
        paragraphs: [
          "고령자, 장애인 등 사회적 소수자 계층은 디지털 기기의 조작에 큰 어려움을 겪고 있으며, 이는 일상생활의 자립성과 정보 접근에 장애가 됩니다. 본 프로젝트는 이러한 디지털 격차 문제를 해소하기 위해 최신 인공지능 기술을 활용한 접근성 강화 방안을 제안합니다.",
        ],
      },
      {
        title: "연구 목표",
        paragraphs: [
          "최근의 대형 언어 모델(LLM)은 사람처럼 문장을 이해하고 생성할 수 있으며, 시각-언어 모델(VLM)은 이미지와 언어를 함께 해석하여 맥락에 맞는 응답을 생성할 수 있습니다. 이 두 모델을 결합하면 사용자 의도를 자연스럽게 해석하고, 시각 정보를 바탕으로 앱 상의 요소까지 정확히 이해할 수 있습니다.",
        ],
        images: [
          {
            src: finishedSsrc2025AccessibilityAssistantImage,
            alt: "Finished project figure",
          },
        ],
      },
      {
        title: "파이프라인 구조",
        blocks: [
          {
            type: "images",
            items: [
              {
                src: finishedSsrc2025AccessibilityPipelineImage,
                alt: "Finished project figure",
              },
            ],
          },
          {
            type: "paragraphs",
            items: [
              "사용자가 스마트폰 카메라로 손글씨나 안내문을 촬영하면, 시스템은 해당 이미지를 분석하여 필요한 작업을 자동으로 수행합니다. 예를 들어, “홍길동에게 전화 걸어”라는 문장을 인식한 뒤, 실제로 전화 앱을 실행하고 연락을 연결하는 일련의 과정을 자동화할 수 있습니다.",
            ],
          },
        ],
      },
      {
        title: "Project 3 | 안전한 디지털 애프터라이프를 위한 ‘디지털 유산 관리 서비스’ 제안",
      },
      {
        title: "연구 배경",
        paragraphs: [
          "디지털 환경의 확산으로 사망 후에도 온라인에 남는 디지털 흔적(디지털 레거시)의 관리가 중요한 이슈가 되고 있다. 개인은 사망 후 자신의 정보가 유출되거나 악용될 위험에 노출되며, 사회적으로는 범죄 악용과 관리 비용 증가 문제가 발생한다. 기존 서비스들은 디지털 금고 형태로 정보를 유족에게 전달하지만, 민감 정보 삭제와 유산 구분에는 한계가 있다. 이에 본 연구는 디지털 유언장 기반의 보안성 있는 유산 관리 시스템을 제안한다.",
        ],
      },
      {
        title: "연구 내용",
        paragraphs: [
          "본 연구는 사망자의 디지털 자산을 AI가 자동으로 탐색·분류하여 유족이 불필요한 개인정보를 손쉽게 삭제하고, 보존할 가치는 유지할 수 있도록 지원하는 디지털 유산 관리 서비스를 개발하는 데 목적이 있다. 기존 서비스가 생전 데이터 보관에 초점을 두는 반면, 본 연구는 사망 후 AI가 이메일, SNS, 클라우드 등을 분석해 계정을 정리하고 삭제 요청을 지원하는 기능을 제공한다는 점에서 차별성을 갖는다.",
        ],
        bullets: [
          "서비스 구조",
        ],
        images: [
          {
            src: finishedSsrc2025DigitalAfterlifeServiceImage,
            alt: "Finished project figure",
          },
        ],
      },
    ],
  },

  [finishedConveyorFlowPageCode]: {
    title: "컨베이어 시스템을 위한 물류 흐름 최적화 (LG Energy Solution)",
    organization: "LG Energy Solution",
    date: "2025.01 ~ 2025.12",
    sections: [
      {
        title: "연구 개요",
        paragraphs: [
          "생산공장 와 물류시설의 자동화 및  무인화가 가속화됨에 따라, 그를 위한 최적화 기법 개발이 필요합니다.",
          "본 연구는 LG Energy Solution과 함께 진행하며, Simulation & Optimization 관점에서 물류 흐름을 위한 방안을 개발 및 검증합니다.",
          "기존 컨베이어 시스템과 달리, 본 연구의 대상은 다수의 단방향 Short-cut들을 포함하는 컨베이어 시스템이기에 더욱 정교하고 복잡한 상황에서도 구현 가능한 solution 도출을 목표로 합니다.",
        ],
        images: [
          {
            src: finishedConveyorSystemOverviewImage,
            alt: "Finished project figure",
          },
        ],
      },
      {
        title: "연구 목표",
        blocks: [
          {
            type: "bullets",
            items: [
              "Python 기반  시뮬레이션 환경 구축",
            ],
          },
          {
            type: "paragraphs",
            items: [
              "본 연구의 대상이 되는 컨베이어를 비롯한 실제 물류 시스템을 실험 가능한 시뮬레이션 환경으로 구축합니다.",
              "이를 다양한 물류 흐름 상황과 최적화 모델을 적용해보는 등의 지속적인 실험 및 효과 검증이 가능합니다.",
            ],
          },
          {
            type: "bullets",
            items: [
              "물류 흐름 최적화를 위한 수학적 모델링 및 검증",
            ],
          },
          {
            type: "paragraphs",
            items: [
              "실제 산업에서는 시시각각 변하는 물류 환경에 맞춰 사용이 가능한 연산 속도가 빠르고 구조가 복잡하지 않은 수학적 모델을 필요로 합니다.",
              "이를 위해 수리 최적화 방법을 사용하여 물류 시스템의 효율을 최대화하기 위한 Objective function, Decision variables, Constraints를 정의하고 실험합니다.",
              "마지막으로 시뮬레이션 환경을 통해 최적화 모델의 성능을 여러 상황에 대해 검증하고, 보완합니다.",
            ],
          },
          {
            type: "images",
            items: [
              {
                src: finishedConveyorSimulationOptimizationImage,
                alt: "Finished project figure",
              },
            ],
          },
        ],
      },
    ],
  },
};

function renderParagraphs(paragraphs) {
  return (
    <ParagraphGroup>
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{paragraph}</p>
      ))}
    </ParagraphGroup>
  );
}

function renderBullets(bullets) {
  return (
    <BulletList>
      {bullets.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </BulletList>
  );
}

function renderSupportingImages(images, imageLayout, flush = false) {
  return (
    <SupportingImageGrid
      $single={images.length === 1}
      $stacked={imageLayout === "stacked"}
      $flush={flush}
    >
      {images.map((image) => (
        <SupportingImageFigure key={image.src}>
          <SupportingImage
            src={image.src}
            alt={image.alt}
            $width={image.width}
          />
          {image.caption ? (
            <SupportingImageCaption>{image.caption}</SupportingImageCaption>
          ) : null}
        </SupportingImageFigure>
      ))}
    </SupportingImageGrid>
  );
}

function renderOrderedBlock(block, section, index) {
  const isMediaBlock =
    block.type === "images" ||
    block.type === "figure" ||
    block.type === "image" ||
    block.type === "logo";
  return (
    <OrderedContentBlock
      key={`${section.title}-${block.type}-${index}`}
      $isFirst={index === 0}
      $isMedia={isMediaBlock}
    >
      {block.type === "paragraphs" ? renderParagraphs(block.items) : null}
      {block.type === "bullets" ? renderBullets(block.items) : null}
      {block.type === "figure" ? (
        <FigureBlock $flush>
          <MainFigure src={block.figure.src} alt={block.figure.alt} />
          <FigureCaption>{block.figure.caption}</FigureCaption>
        </FigureBlock>
      ) : null}
      {block.type === "image" ? (
        <ConferenceImage src={block.image.src} alt={block.image.alt} $flush />
      ) : null}
      {block.type === "images"
        ? renderSupportingImages(
            block.items,
            block.imageLayout || section.imageLayout,
            true,
          )
        : null}
      {block.type === "logo" ? (
        <CollaboratorLogo
          src={block.logo.src}
          alt={block.logo.alt}
          $width={block.logo.width}
          $flush
        />
      ) : null}
    </OrderedContentBlock>
  );
}

const TestSubProject = () => {
  const [searchParams] = useSearchParams();
  const pageCode = searchParams.get("pagecode");
  const project =
    projectsByPageCode[pageCode] || projectsByPageCode[dualTwinForkPageCode];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageCode]);

  return (
    <PageShell>
      <ProjectFrame>
        <Header activeSection="research" activeResearch="project" />

        <Hero
          title={project.title}
          topGap={162}
          dividerGap={61}
          titleSize={35}
          titleLineHeight="1.25"
          meta={<OrganizationPill>{project.organization}</OrganizationPill>}
        />

        <ContentFrame data-pagecode={pageCode || dualTwinForkPageCode}>
          {project.sections.map((section) => (
            <ContentSection key={section.title}>
              {section.hideTitle ? null : <SectionTitle>{section.title}</SectionTitle>}
              {section.kicker ? <SectionKicker>{section.kicker}</SectionKicker> : null}
              {section.blocks
                ? section.blocks.map((block, index) =>
                    renderOrderedBlock(block, section, index),
                  )
                : (
                  <>
                    {section.paragraphs ? renderParagraphs(section.paragraphs) : null}
                    {section.bullets ? renderBullets(section.bullets) : null}
                    {section.figure ? (
                      <FigureBlock>
                        <MainFigure src={section.figure.src} alt={section.figure.alt} />
                        <FigureCaption>{section.figure.caption}</FigureCaption>
                      </FigureBlock>
                    ) : null}
                    {section.image ? (
                      <ConferenceImage src={section.image.src} alt={section.image.alt} />
                    ) : null}
                    {section.images
                      ? renderSupportingImages(section.images, section.imageLayout)
                      : null}
                    {section.logo ? (
                      <CollaboratorLogo
                        src={section.logo.src}
                        alt={section.logo.alt}
                        $width={section.logo.width}
                      />
                    ) : null}
                  </>
                )}
            </ContentSection>
          ))}
        </ContentFrame>
      </ProjectFrame>
      <Footer />
    </PageShell>
  );
};

const PageShell = styled.main`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  font-family: "Inter", "Pretendard", "Helvetica Neue", Arial, sans-serif;
`;

const ProjectFrame = styled.section`
  width: min(100%, 1442px);
  margin: 0 auto;
  padding-top: 0;
  padding-bottom: 118px;
  background: #ffffff;
  box-sizing: border-box;

  @media (max-width: 860px) {
    padding: 36px 24px 80px;
  }
`;

const OrganizationPill = styled.span`
  min-width: 145px;
  height: 42px;
  padding: 0 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: ${soft};
  color: #000000;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  box-sizing: border-box;
`;

const ContentFrame = styled.article`
  width: 1280px;
  margin: 0 auto;
  padding-top: 58px;
  box-sizing: border-box;

  @media (max-width: 860px) {
    width: 100%;
    padding-top: 42px;
  }
`;

const ContentSection = styled.section`
  padding: 0 47px 50px;
  border-bottom: 1px solid #d4d4d4;
  margin-bottom: 48px;

  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media (max-width: 860px) {
    padding: 0 0 42px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 24px;
  color: ${navy};
  font-size: 25px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0;
`;

const SectionKicker = styled.p`
  max-width: 1100px;
  margin: -10px 0 18px;
  color: #111111;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;

  @media (max-width: 860px) {
    font-size: 17px;
  }
`;

const OrderedContentBlock = styled.div`
  margin-top: ${(props) =>
    props.$isFirst ? "0" : props.$isMedia ? "36px" : "18px"};
`;

const ParagraphGroup = styled.div`
  max-width: 1100px;
  color: #111111;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: 0;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 4px;
  }

  @media (max-width: 860px) {
    font-size: 17px;
  }
`;

const BulletList = styled.ul`
  max-width: 1100px;
  margin: 0;
  padding-left: 23px;
  color: #111111;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;

  li + li {
    margin-top: 6px;
  }

  @media (max-width: 860px) {
    font-size: 17px;
  }
`;

const FigureBlock = styled.figure`
  width: 590px;
  margin: ${(props) => (props.$flush ? "0 auto" : "34px auto 0")};
  text-align: center;

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const MainFigure = styled.img`
  width: 590px;
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 6px;
`;

const FigureCaption = styled.figcaption`
  margin-top: 12px;
  color: #4f4f4f;
  font-size: 15px;
  font-weight: 500;
`;

const ConferenceImage = styled.img`
  width: 720px;
  max-width: 100%;
  height: auto;
  display: block;
  margin: ${(props) => (props.$flush ? "0 auto" : "36px auto 0")};
  border: 1px solid #eeeeee;
  border-radius: 6px;
  object-fit: contain;
`;

const SupportingImageGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$stacked || props.$single ? "1fr" : "repeat(2, minmax(0, 1fr))"};
  align-items: center;
  gap: ${(props) => (props.$stacked ? "20px" : "24px")};
  margin: ${(props) => (props.$flush ? "0 auto" : "36px auto 0")};
  max-width: 1000px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const SupportingImage = styled.img`
  width: ${(props) => props.$width || "100%"};
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  object-fit: contain;
`;

const SupportingImageFigure = styled.figure`
  width: 100%;
  margin: 0;
  justify-self: center;
`;

const SupportingImageCaption = styled.figcaption`
  margin-top: 10px;
  color: #4f4f4f;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
`;

const CollaboratorLogo = styled.img`
  width: ${(props) => props.$width || "360px"};
  max-width: 100%;
  height: auto;
  display: block;
  margin: ${(props) => (props.$flush ? "0 auto" : "58px auto 0")};
  object-fit: contain;
`;

export default TestSubProject;
