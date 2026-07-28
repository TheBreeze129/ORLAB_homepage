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
import ssrcEncoreImage from "../../assets/ssrc-encore.png";

const navy = "#113275";
const soft = "#e6e6e6";
const dualTwinForkPageCode = "38fd35be31ec804f8fefc71bc74b3dae";
const batteryPageCode = "38fd35be31ec809d8c1dc0099da807ed";
const inodepPageCode = "1ced35be31ec8003a633f28976b412b5";
const ocrPageCode = "38fd35be31ec8040ab83fd4362120249";
const travutPageCode = "38fd35be31ec80f1a521f3a00a363316";
const ssrcPageCode = "390d35be31ec805a9f4fdaa561ed3384";

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
};

projectsByPageCode[travutPageCode] = {
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
};

projectsByPageCode[ssrcPageCode] = {
  title: "2026 학생창의자율과제 (SSRC)",
  organization: "SSRC",
  sections: [
    {
      title: "Project 1 : ENCORE: K-pop 안무 IP 확장을 위한 AI 기반 표준 무보 시스템",
      image: {
        src: ssrcEncoreImage,
        alt: "ENCORE AI-based standard choreography notation system",
      },
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
};

projectsByPageCode[inodepPageCode] = {
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
};

projectsByPageCode[ocrPageCode] = {
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
};

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
              <SectionTitle>{section.title}</SectionTitle>
              {section.kicker ? <SectionKicker>{section.kicker}</SectionKicker> : null}
              {section.paragraphs ? (
                <ParagraphGroup>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </ParagraphGroup>
              ) : null}
              {section.bullets ? (
                <BulletList>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </BulletList>
              ) : null}
              {section.figure ? (
                <FigureBlock>
                  <MainFigure src={section.figure.src} alt={section.figure.alt} />
                  <FigureCaption>{section.figure.caption}</FigureCaption>
                </FigureBlock>
              ) : null}
              {section.image ? (
                <ConferenceImage src={section.image.src} alt={section.image.alt} />
              ) : null}
              {section.images ? (
                <SupportingImageGrid>
                  {section.images.map((image) => (
                    <SupportingImage key={image.src} src={image.src} alt={image.alt} />
                  ))}
                </SupportingImageGrid>
              ) : null}
              {section.logo ? (
                <CollaboratorLogo
                  src={section.logo.src}
                  alt={section.logo.alt}
                  $width={section.logo.width}
                />
              ) : null}
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
  margin: 34px auto 0;
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
  margin: 36px auto 0;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  object-fit: contain;
`;

const SupportingImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin: 36px auto 0;
  max-width: 1000px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const SupportingImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  object-fit: contain;
`;

const CollaboratorLogo = styled.img`
  width: ${(props) => props.$width || "360px"};
  max-width: 100%;
  height: auto;
  display: block;
  margin: 58px auto 0;
  object-fit: contain;
`;

export default TestSubProject;
